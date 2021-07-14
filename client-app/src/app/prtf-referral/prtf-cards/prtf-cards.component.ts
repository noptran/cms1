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
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-prtf-cards",
  templateUrl: "./prtf-cards.component.html",
  styleUrls: ["./prtf-cards.component.scss"],
})
export class PrtfCardsComponent implements OnInit {
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
  isAttachments = false;
  defaultColDef: any;

  constructor(
    public _pageSize: PagesizeService,
    public _caseTeam: CaseTeamService,
    public _local: LocalValues,
    public _router: Router,
    public _opencard: OpencardsService,
    public _client: ClildFormService,
    public _fb: FormBuilder
  ) { }

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

    // HardCoded ONLY FOR TESTING PURPOSE---------
    // this.req[constants.API_INFO[this.cardName].primary_key] = 1;
    // ---------------------------------------------

    this.editControll = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";

    this._opencard
      .staffCardPostMethodAPI(
        this.req,
        constants.API_INFO[this.cardName].get_by_id
      )
      .then((data) => {

        switch (this.card) {
          case "HEALTH EXAM":
            this.isAttachments = true;
            break;
        }
        // this._local.deleteRequestKey = data.staffTeamLeader.staffTeamLeaderID;
        // this._local.deleteRequestNode = this.teamType;
        this._local.deleteRequestKey = data[constants.API_INFO[this.cardName].get_by_id_response_key][constants.API_INFO[this.cardName].primary_key];
        this._local.deleteRequestNode = this.cardName;
        this.isPopWindow = true;
        this.getByIdData =
          data[constants.API_INFO[this.cardName].get_by_id_response_key];
        constants.API_INFO[this.cardName].fields.forEach((element) => {
          if (element.fieldType == "DATE_PICKER") {
            this.staffModel[element.key] = this.getByIdData[element.key]
              ? new Date(this.getByIdData[element.key])
              : null;
          } else if (element.isDoubleGetByIdKey) {
            this.staffModel[element.key] = !isNullOrUndefined(
              this.getByIdData[element.key]
            )
              ? this.getByIdData[element.key][element.key]
              : null;
          } else {
            this.staffModel[element.key] = !isNullOrUndefined(
              this.getByIdData[element.key]
            )
              ? this.getByIdData[element.key]
              : null;
          }
        });
        console.log("staffModel in get by id is", this.staffModel);
        loader.style.display = "none";
      });
  }

  navigateToTeamMember() {
    this.isPopWindow = false;
    this.getAllListView(this.initial, this.end);
  }

  navigateTo(card) {
    if (this.getByIdData.staffID) {
      localStorage.setItem("staff_ID", this.getByIdData.staffID.staffID);
    }
    this.isPopWindow = false;
    this.isPopListWindow = false;
    this.jumpToTree.emit();
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
      this.end = 100;
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
      case "TREATMENT DECISION":
        listRequest["referralID"] =
          parseInt(localStorage.getItem("referralId")) -
          this._opencard.getHasKey();
        break;
      case "HEALTH EXAM":
        listRequest["referralID"] =
          parseInt(localStorage.getItem("referralId")) -
          this._opencard.getHasKey();
        listRequest["sort"] = { column: "healthExamID", mode: "desc" };
        break;
    }

    listRequest["beginPagination"] = 1;
    listRequest["endPagination"] = 100;

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
        test.push(data);
      });
      test.sort((a, b) => a["order"] - b["order"]);
      this.rawdata.push(test);
      this.columnDefs = this.rawdata[0];
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
    }
  }

  onRowSelected(event) {
    this.isPopWindow = false;
    this.editControll = true;
    this.getByIdkey = event.data[constants.API_INFO[this.cardName].primary_key];
    this.staffCardForm.disable();
    this.getById();
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
    this.listPromptHeader = this.card + " " + "LIST";
    this.formViewPromptHeader = this.card + " " + "FORM";
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
      case "TREATMENT DECISION":
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
          referralID:
            parseInt(localStorage.getItem("referralId")) -
            this._opencard.getHasKey(),
          personAssignmentTypeID: this.staffModel["personAssignmentTypeID"]
            ? this.staffModel["personAssignmentTypeID"].personAssignmentTypeID
            : null,
          notes: this.staffModel["notes"],
          personID: 393160,
        };
        break;
      case "HEALTH EXAM":
        request = {
          examDate: this.staffModel["examDate"]
            ? this._local.stringFormatDatetime(
              Date.parse(this.staffModel["examDate"])
            )
            : null,
          nextExamDue: this.staffModel["nextExamDue"]
            ? this._local.stringFormatDatetime(
              Date.parse(this.staffModel["nextExamDue"])
            )
            : null,
          referralID:
            parseInt(localStorage.getItem("referralId")) -
            this._opencard.getHasKey(),
          followUpRequired: this.staffModel["followUpRequired"],
          notes: this.staffModel["notes"],
          clientId:
            parseInt(localStorage.getItem("clientId")) -
            this._opencard.getHasKey(),
          healthExamTypeID: this.staffModel["healthExamTypeID"]
            ? this.staffModel["healthExamTypeID"].healthExamTypeID
            : null,
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
        case "referralTypeID":
          dropdownRequest["referralTypeID"] = 14;
          break;
        case "personAssignmentTypeID & referralID":
          dropdownRequest["referralID"] =
            parseInt(localStorage.getItem("referralId")) -
            this._opencard.getHasKey();
          dropdownRequest["personAssignmentTypeID"] = 4;
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
