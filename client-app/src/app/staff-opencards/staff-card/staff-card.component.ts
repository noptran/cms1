import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {LocalValues} from "../../local-values";
import { Router } from "@angular/router";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { ClildFormService } from "../../child-forms/child-forms.service";
import swal from "sweetalert2";
import { CaseTeamService } from "../../case-team/case-team.service";
import { AgGridNg2 } from "ag-grid-angular";
import { PagesizeService } from "../../pagesize/pagesize.service";

import * as constants from "./constants";
import * as _ from "lodash";
import { HomeService } from "../../home/home.service";
import * as moment from "moment";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-staff-card",
  templateUrl: "./staff-card.component.html",
  styleUrls: ["./staff-card.component.scss"],
})
export class StaffCardComponent implements OnInit {
  staffCardForm: FormGroup;
  staffModel = {};

  editControll = false;
  isAttachmentRequired = false;
  req = {};
  metaData = [];
  isOpencards = false;

  isDeleteConfirmation = false;
  isDeleteEnabled = false;
  staffTeamLeaderID = null;
  getByIdData: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  isPopListWindow = true;
  isPopWindow = false;
  isPlesWait = false;
  rowData: any;
  totalCount: any;
  initial = 1;
  end = 100;
  headers = [];
  rawdata = [];
  columnDefs = [];

  @ViewChild("agGrid", { static: true }) agGrid: AgGridNg2;

  @Output() closeModel = new EventEmitter<string>();
  @Output() jumpToTree = new EventEmitter();

  @Input() card: any;

  getByIdkey: any;

  designData: any[];
  cardName: any;
  listPromptHeader: any;
  formViewPromptHeader: any;
  showAddButton = true;

  defaultColDef: any;

  constructor(
    public homeService: HomeService,
    public _pageSize: PagesizeService,
    public _caseTeam: CaseTeamService,
    public _local: LocalValues,
    public _router: Router,
    public _opencard: OpencardsService,
    public _client: ClildFormService,
    public _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.identifyStaffCard();
    this.getAllListView(this.initial, this.end);
    this.editControll = false;
  }

  saveForm(source: any) {
    console.log("staffModel in save form is", this.staffModel);
    console.log("staffCardForm in saveForm is", this.staffCardForm);
    console.log("source is", source);
    if (this.staffCardForm.valid) {
      let loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      let saveRequest = this.generateSaveRequest();
      console.log("saveRequest after generateSaveRequest is", saveRequest);
      let updateRequest = saveRequest;
      updateRequest[
        constants.API_INFO[this.cardName].primary_key
      ] = this.staffModel[constants.API_INFO[this.cardName].primary_key];
      console.log("updateRequest after generateSaveRequest is", updateRequest);
      if (this.staffModel[constants.API_INFO[this.cardName].primary_key]) {
        this._opencard
          .staffCardPostMethodAPI(
            updateRequest,
            constants.API_INFO[this.cardName].update
          )
          .then((data) => {
            this.isPopWindow = false;
            loader.style.display = "none";
            swal("Success", "Record has been updated!", "success");
            this.getAllListView(this.initial, this.end);
            this.initializeComponent();
          });
      } else {
        this._opencard
          .staffCardPostMethodAPI(
            saveRequest,
            constants.API_INFO[this.cardName].save
          )
          .then((data) => {
            this.isPopWindow = false;
            loader.style.display = "none";
            swal("Success", "Record has been saved!", "success");
            this.getAllListView(this.initial, this.end);
            this.initializeComponent();
          });
      }
    } else {
      swal("Warning", "Please fill the mandatoy fields", "info");
    }
  }
  initializeComponent() {
    this._local.deleteRequestKey = null;
    this._local.deleteRequestNode = null;
    this.ngOnInit();
  }

  getById() {
    this.req = {};
    this.req[constants.API_INFO[this.cardName].primary_key] = this.getByIdkey;
    this.editControll = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";

    this._opencard
      .staffCardPostMethodAPI(
        this.req,
        constants.API_INFO[this.cardName].get_by_id
      )
      .then((data) => {
        this.isPopWindow = true;
        this._local.deleteRequestKey =
          data[constants.API_INFO[this.cardName].get_by_id_response_key][
            constants.API_INFO[this.cardName].primary_key
          ];
        this._local.deleteRequestNode = this.cardName;
        this.getByIdData =
          data[constants.API_INFO[this.cardName].get_by_id_response_key];
        constants.API_INFO[this.cardName].fields.forEach((element) => {
          if (element.fieldType == "DATE_PICKER") {
            this.staffModel[element.key] = this.getByIdData[element.key]
              ? new Date(this.getByIdData[element.key])
              : null;
          } else if (element.isDoubleGetByIdKey) {
            this.staffModel[element.key] = this.getByIdData[element.key][
              element.key
            ];
          } else if (
            element.key == "staffID" &&
            element.fieldType == "DROPDOWN"
          ) {
            this.staffModel[element.key] = this.getByIdData[element.key]
              ? {
                  staffID: this.getByIdData[element.key].staffID,
                  staffName:
                    this.getByIdData[element.key]["lastName"] +
                    ", " +
                    this.getByIdData[element.key]["firstName"],
                }
              : null;
          } else {
            this.staffModel[element.key] = this.getByIdData[element.key];
          }
        });
        console.log("staffModel in get by id is", this.staffModel);
        loader.style.display = "none";
        this.isFormLog = true;
        this.formLogInfo.changedBy = !isNullOrUndefined(
          data.staffModel.changedBy
        )
          ? data.staffModel.changedBy
          : "------";
        this.formLogInfo.changedDate = !isNullOrUndefined(
          data.staffModel.changedDate
        )
          ? moment(data.staffModel.changedDate).format("MM/DD/YYYY hh:mm:ss A")
          : "--:--:-- --";
        this.formLogInfo.enteredBy = !isNullOrUndefined(
          data.staffModel.enteredBy
        )
          ? data.staffModel.enteredBy
          : "------";
        this.formLogInfo.enteredDate = !isNullOrUndefined(
          data.staffModel.enteredDate
        )
          ? moment(data.staffModel.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
          : "--:--:-- --";
      });
  }

  navigateToTeamMember() {
    this.isPopWindow = false;
    this.getAllListView(this.initial, this.end);
  }

  navigateTo() {
    if (this.getByIdData.staffID) {
      localStorage.setItem("staff_ID", this.getByIdData.staffID.staffID);
    }
    this.isPopWindow = false;
    this.isPopListWindow = false;
    if (
      this._router.url.includes("/reports/staff/details") &&
      this.card == "TRANSPORTATION"
    ) {
      if (this.getByIdData.sfaOfficeID) {
        this.homeService.triggerSfmTransportJPT(
          this.getByIdData.sfaOfficeID.sfaofficeID
        ); // comment added : SFM Office Jump To Tree
      }
    } else {
      this.jumpToTree.emit(this.card);
    }
  }

  onDeleteSelect() {
    this.isDeleteConfirmation = true;
  }

  editForm() {
    this.staffCardForm.enable();
  }

  ngOnDestroy() {
    this._local.deleteRequestKey = null;
    this._local.deleteRequestNode = null;
  }

  close() {
    let closeEV = "false";
    this.closeModel.emit(closeEV);
  }

  showSaveModel() {
    this.isPopWindow = true;
    this.editControll = false;
    this.staffModel = {};
    this.staffCardForm.enable();
  }

  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
    }
  }

  pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getAllListView(this.initial, this.end);
    }
  }

  getAllListView(initial, end) {
    this.isPlesWait = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let cardName = this.card;
    let listRequest = {};
    switch (this.card) {
      case "TRANSPORTATION":
        listRequest["staffID"] = parseInt(
          localStorage.getItem("staffIdPerson")
        );
        break;
      case "TRAINING":
        listRequest["staffID"] = parseInt(
          localStorage.getItem("staffIdPerson")
        );
        break;
      case "TRANSPORTATION (SFM OFFICE)":
        listRequest["sfaOfficeID"] = this._local.sfmOfficeID;
        break;
      case "CASES":
        this.showAddButton = false;
        listRequest["sfaOfficeID"] = this._local.sfmOfficeID;
        listRequest["sort"] = {
          column: "clientID",
          mode: "desc",
        };
        break;
      case "STAFF":
        this.showAddButton = false;
        listRequest["sfaOfficeID"] = this._local.sfmOfficeID;
        break;
    }
    listRequest["beginPagination"] = initial;
    listRequest["endPagination"] = end;

    this._opencard
      .staffCardPostMethodAPI(listRequest, constants.API_INFO[cardName].list)
      .then((data) => {
        this.isPlesWait = false;
        this.generateListView(data);
        loader.style.display = "none";
      });
  }

  generateListView(data) {
    let rowData = [];
    let test = [];
    let responseKey: any;
    this.totalCount = data.totalCount;

    responseKey = constants.API_INFO[this.card].get_by_id_response_key;

    this.rowData = data[responseKey];

    if (this.card == "CASES" || this.card == "STAFF") {
      this.rowData.forEach((element) => {
        element["Jump To Tree"] = this.card;
      });
    }
    if (this.rowData.length > 0) {
      this.headers.push(Object.keys(this.rowData[0]));
      this.headers[0].map(function (result) {
        let data = {
          headerName: result
            .replace(/\b\w/g, (l) => l.toUpperCase())
            .replace(/([A-Z])/g, " $1")
            .trim(),
          field: result,
        };
        if (result == "clusureDate") {
          data = {
            headerName: "closureDate"
              .replace(/\b\w/g, (l) => l.toUpperCase())
              .replace(/([A-Z])/g, " $1")
              .trim(),
            field: result,
          };
        }
        test.push(data);
      });
      test.sort((a, b) => a["order"] - b["order"]);
      this.rawdata.push(test);
      this.columnDefs = this.rawdata[0];
      // if (this.totalCount < 100) {
      //   this.end = this.totalCount;
      // }
    }
  }

  count = 0;
  onRowSelected(event) {
    if (this.agGrid.api.getFocusedCell().column.getColId() == "Jump To Tree") {
      this.isPopWindow = false;
      this.isPopListWindow = false;
      this.jumpToTree.emit(this.card);
      switch (this.card) {
        case "CASES":
          let currentClientId = parseInt(event.data.clientID);
          let clientID = currentClientId + this._opencard.getHasKey();
          localStorage.setItem("clientId", clientID.toString());
          return this._router.navigate(["reports/client/details"], {
            queryParams: { refresh: new Date().getTime() },
          });

        case "STAFF":
          localStorage.setItem("staff_ID", event.data.staffID.toString());
          return this._router.navigate(["/reports/staff/details"], {
            queryParams: { refresh: new Date().getTime() },
          });
      }
    }

    if (this.card != "CASES" && this.card != "STAFF") {
      this.isPopWindow = false;
      this.editControll = true;
      this.getByIdkey =
        event.data[constants.API_INFO[this.cardName].primary_key];
      this.staffCardForm.disable();
      this.getById();
    }
  }

  discardForm() {
    this.isPopWindow = false;
  }

  afterDelete() {
    this.isPopWindow = false;
    this.getAllListView(this.initial, this.end);
    this.initializeComponent();
  }

  identifyStaffCard() {
    this.listPromptHeader = _.startCase(_.toLower(this.card)) + " " + "List";
    this.formViewPromptHeader =
      _.startCase(_.toLower(this.card)) + " " + "Form";
    this.staffModel = {};
    this.cardName = this.card;

    constants.API_INFO[this.cardName].fields.forEach((element) => {
      this.staffModel[element.key] = null;
    });
    console.log("this.staffModel in identifyStaffCard is", this.staffModel);
    this.designData = [];
    this.designData = constants.API_INFO[this.cardName].fields.filter(
      (element) => {
        return element.label;
      }
    );
    console.log("this.designData is", this.designData);

    let formObject = {};
    this.designData.forEach((element) => {
      if (element.isMandatory) {
        formObject[element.key] = [
          null,
          Validators.compose([Validators.required]),
        ];
      } else {
        formObject[element.key] = [null];
      }
    });
    this.staffCardForm = this._fb.group(formObject);
  }

  generateSaveRequest() {
    let request: any;
    switch (this.card) {
      case "TRANSPORTATION":
        request = {
          beginDate: this.staffModel["beginDate"]
            ? this._local.stringFormatDatetime(
                Date.parse(this.staffModel["beginDate"])
              )
            : null,
          endDate: this.staffModel["endDate"]
            ? this._local.stringFormatDatetime(
                Date.parse(this.staffModel["endDate"])
              )
            : null,
          staffID: parseInt(localStorage.getItem("staffIdPerson")),
          personTypeID: this.staffModel["personTypeID"]
            ? this.staffModel["personTypeID"].personTypeID
            : null,
          sfaOfficeID: this.staffModel["sfaOfficeID"]
            ? this.staffModel["sfaOfficeID"].SFAOfficeID
            : null,
        };
        break;
      case "TRAINING":
        request = {
          endDate: this.staffModel["endDate"]
            ? this._local.stringFormatDatetime(
                Date.parse(this.staffModel["endDate"])
              )
            : null,
          staffID: parseInt(localStorage.getItem("staffIdPerson")),
          trainingTypeID: this.staffModel["trainingTypeID"]
            ? this.staffModel["trainingTypeID"].trainingTypeID
            : null,
          trainingCategoryID: this.staffModel["trainingCategoryID"]
            ? this.staffModel["trainingCategoryID"].trainingCategoryID
            : null,
          sponsorID: this.staffModel["sponsorID"]
            ? this.staffModel["sponsorID"].sponsorID
            : null,
          units: this.staffModel["units"],
        };
        break;
      case "TRANSPORTATION (SFM OFFICE)":
        request = {
          beginDate: this.staffModel["beginDate"]
            ? this._local.stringFormatDatetime(
                Date.parse(this.staffModel["beginDate"])
              )
            : null,
          endDate: this.staffModel["endDate"]
            ? this._local.stringFormatDatetime(
                Date.parse(this.staffModel["endDate"])
              )
            : null,
          staffID: this.staffModel["staffID"]
            ? this.staffModel["staffID"]["staffID"]
            : null,
          personTypeID: this.staffModel["personTypeID"]
            ? this.staffModel["personTypeID"].personTypeID
            : null,
          // "sfaOfficeID": this.staffModel['sfaOfficeID'] ? this.staffModel['sfaOfficeID'].SFAOfficeID : null,
          sfaOfficeID: this._local.sfmOfficeID,
        };
        break;
    }
    return request;
  }

  getDropdownMetaData(event: any, dropdownInfo: any) {
    if (dropdownInfo.method == "get") {
      this._opencard.staffCardGetMethodAPI(dropdownInfo.api).then((data) => {
        this.metaData = data[dropdownInfo.responseKey];
      });
    } else if (dropdownInfo.method == "post") {
      let dropdownRequest = {};
      switch (dropdownInfo.requestType) {
        case "DROPDOWN_CONTAINS":
          dropdownRequest["Object"] = dropdownInfo.fieldName;
          dropdownRequest["value"] = event.query;
          break;
        case "STAFF_TRAINING_SPONSOR":
          dropdownRequest["staffID"] = parseInt(
            localStorage.getItem("staffIdPerson")
          );
          break;
        case "STAFF":
          dropdownRequest["sfaOfficeID"] = this._local.sfmOfficeID;
          break;
      }
      this._opencard
        .staffCardPostMethodAPI(dropdownRequest, dropdownInfo.api)
        .then((data) => {
          this.metaData = data[dropdownInfo.responseKey];
        });
    }
  }
}
