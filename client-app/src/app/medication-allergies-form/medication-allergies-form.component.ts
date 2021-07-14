// import { Component, OnInit } from '@angular/core';
import { MedicationAllergies } from "./medication-allergies";
import { MedicationAllergiesService } from "../medication-allergies//medication-allergies.service";
import { ReferralViewService } from "../referral-view/referral-view.service";
import { HomeService } from "../home/home.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { CaseTeamService } from "../case-team/case-team.service";
import { ClildFormService } from "../child-forms/child-forms.service";
import { isNullOrUndefined } from "util";
import swal from "sweetalert2";
import * as moment from "moment";
import { LocalValues } from "../local-values";

//
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
} from "@angular/core";
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import LocalValues from '../../local-values';
// import { Router } from '@angular/router';
// import { OpencardsService } from '../../opecards-list-view/opencards.service';
// import { ClildFormService } from '../../child-forms/child-forms.service';
// import swal from 'sweetalert2';
// import { CaseTeamService } from '../../case-team/case-team.service';
import { AgGridNg2 } from "ag-grid-angular";

import * as constants from "./constants";
import { PagesizeService } from "../pagesize/pagesize.service";

@Component({
  selector: "app-medication-allergies-form",
  templateUrl: "./medication-allergies-form.component.html",
  styleUrls: ["./medication-allergies-form.component.scss"],
})
export class MedicationAllergiesFormComponent implements OnInit {
  title: any = "Medications";
  status = "draft";
  breadcrumbs = [];
  formStatus?: any;
  editControll: boolean;
  medication: MedicationAllergies = new MedicationAllergies();
  metadata = [];
  medicationID: any;
  formControl: any;
  formNavigation = false;
  clientName: any;
  openCards = [];
  quickMenu = "client";
  disabled: any;
  medicationForm: FormGroup;
  subtitle: any;
  clientID: any;
  allergiesCount = 0;
  discardTo = "/reports/medication-allergies/view";
  isAttachmentRequired = false;
  url: any;
  req = {};
  isAllergiesPrompt = false;

  //
  staffCardForm: FormGroup;
  staffModel = {};

  allergiesEditControll = false;
  // isAttachmentRequired = false;
  // req = {};
  metaData = [];
  isOpencards = false;

  isDeleteConfirmation = false;
  isDeleteEnabled = false;
  staffTeamLeaderID = null;
  getByIdData: any;

  isPopListWindow = false;
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

  card = "ALLERGIES";

  getByIdkey: any;

  designData: any[];
  cardName: any;
  listPromptHeader: any;
  formViewPromptHeader: any;

  isFormLog = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };

  defaultColDef: any;

  // constructor(public _pageSize: PagesizeService, public _caseTeam: CaseTeamService, public _local: LocalValues, public _router: Router, public _opencard: OpencardsService, public _client: ClildFormService, public _fb: FormBuilder) { }

  constructor(
    public _pageSize: PagesizeService,
    public _medication: MedicationAllergiesService,
    public _referralView: ReferralViewService,
    public _client: ClildFormService,
    public _router: Router,
    public _fb: FormBuilder,
    public _caseTeam: CaseTeamService,
    public _opencard: OpencardsService,
    public _localValues: LocalValues,
    public _activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editControll = false;
    this.formControl = false;
    this.formValidation();
    if (this._router.url.includes("/reports/medication-allergies/details")) {
      this.getMedicationDetails();
      this.medicationForm.disable();
      this.isAttachmentRequired = true;
    }
    this.breadcrumbs.push(
      { label: "Person Types", href: "/reports/person/types", active: "" },
      { label: "Client", href: "/reports/client/details", active: "" },
      {
        label: "Medications List",
        active: "",
        href: "/reports/medication-allergies/view",
      },
      { label: "Medications", active: "active" }
    );

    this.medication.beginDate = new Date();

    this.openCards.push({ label: "Allergies", icon: "", count: "" });

    // ----------------
    this.identifyStaffCard();
    this.getAllListView(this.initial, this.end);
    this.allergiesEditControll = false;
  }

  saveForm(source: any) {
    if (this.medicationForm.valid) {
      this._referralView.clientDetails().then(() => {
        let loader = document.getElementById("loading-overlay") as HTMLElement;
        loader.style.display = "block";
        source.beginDate = source.beginDate
          ? Date.parse(source.beginDate)
          : null;
        source.endDate = source.endDate ? Date.parse(source.endDate) : null;
        source.dosageTypeID !== null && source.dosageTypeID !== undefined
          ? (source.dosageTypeID = source.dosageTypeID.dosageTypeID)
          : null;
        source.frequencyTypeID !== null && source.frequencyTypeID !== undefined
          ? (source.frequencyTypeID = source.frequencyTypeID.frequencyTypeID)
          : null;
        source.client = parseInt(
          this._activateRoute.snapshot.queryParamMap.get("clientId")
        );
        if (source.clientMedicationID) {
          this._medication.updateMedication(source).then((data) => {
            loader.style.display = "none";
            // this.editControll = false;
            swal("Success", "Record has been updated!", "success");
            this.medicationForm.disable();
            this._router.navigate(["/reports/medication-allergies/view"], {
              queryParamsHandling: "preserve",
            });
          });
        } else {
          this._medication.saveMedication(source).then((data) => {
            loader.style.display = "none";
            // this.editControll = false;
            swal("Success", "Record has been saved!", "success");
            this.medicationForm.disable();
            this.isAllergiesPrompt = true;
            // this._router.navigate(['/reports/medication-allergies/view']);
          });
        }
      });
    } else {
      swal("Info", "Please fill the mandatory fields", "warning");
    }
  }

  /**
   * Form edit
   * @param event event
   */
  editForm() {
    this.formControl = false;
    this.medicationForm.enable();
  }

  /**
   *
   * @param event trigger event
   * @param type type of metadata
   * @returns metadata list
   */
  getMetadata(event, type: any) {
    let object, req;
    switch (type) {
      case "dosage":
        object = "dosageType";
        break;
      case "frequency":
        object = "frequencyType";
        break;
    }
    req = { Object: object, value: event.query };
    this._medication.getMetadata(req).then((data) => {
      this.metadata = data.dropDown;
    });
  }

  /**
   * Get the record details
   */
  getMedicationDetails() {
    let medicationId = this._client.getId();
    let source;
    this.req = { clientMedicationID: medicationId };
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.editControll = true;
    this.formControl = true;
    this._medication.getMedicationById(this.req).then((data) => {
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.clientMedication.changedBy
      )
        ? data.clientMedication.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.clientMedication.changedDate
      )
        ? moment(data.clientMedication.changedDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.clientMedication.enteredBy
      )
        ? data.clientMedication.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.clientMedication.enteredDate
      )
        ? moment(data.clientMedication.enteredDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";

      source = data.clientMedication;
      source.beginDate = !isNullOrUndefined(source.beginDate)
        ? new Date(source.beginDate)
        : null;
      source.endDate = !isNullOrUndefined(source.endDate)
        ? new Date(source.endDate)
        : null;
      loader.style.display = "none";
      this.medication = source;
    });
  }

  resetForm() {}
  // discardForm() { }

  /**
   * @return respetive view.
   * @param event label of opencard
   */
  opencardNavigation(event) {
    let url;
    switch (event) {
      case "Allergies":
        url = "/reports/allergies/view";
        break;
    }
    return this._router.navigate([url]);
  }

  formValidation() {
    this.medicationForm = this._fb.group({
      medication: [null, Validators.compose([Validators.required])],
      dosage: [null, Validators.compose([Validators.required])],
      dosage_type: [null, Validators.compose([Validators.required])],
      frequency: [null, Validators.compose([Validators.required])],
      beignDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      prescribedFor: [null, Validators.compose([Validators.required])],
      prescribed_by: [null, Validators.compose([Validators.required])],
      source_info: [null],
      frequencyNotes: [null],
    });
  }

  /** Get the count for allergies (Opencard) */
  getOpencardsCount() {
    let req = { clientID: this.clientID };
    this._caseTeam.getTotalCountForOpencards(req).then((data) => {
      this.allergiesCount = data.ClientAllergies;
    });
  }

  // navigateTo() {
  //   let currentURL = this._router.url;
  //   if (currentURL == '/reports/medication-allergies/details') {
  //     this.url = '/reports/attachment-document/client/medication';
  //   }
  //   else {
  //     this.url = '/reports/attachment-document/client/medication';
  //   }
  //   return this._router.navigate([this.url])
  // }

  onAllergiesPromptClose() {
    this._router.navigate(["/reports/medication-allergies/view"], {
      queryParamsHandling: "preserve",
    });
  }

  navigation(field) {
    if (field == "list") {
      this._router.navigate(["/reports/medication-allergies/view"], {
        queryParamsHandling: "preserve",
      });
    } else if (field == "allergies") {
      this._localValues.isAllergiesPromptTrue = true;
      this._router.navigate(["/reports/allergies/new"], {
        queryParamsHandling: "preserve",
      });
    }
  }

  //
  // Name Change
  saveAllergiesForm(source: any) {
    if (this.staffCardForm.valid) {
      let loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      let saveRequest = this.generateSaveRequest();
      let updateRequest = saveRequest;
      updateRequest[constants.API_INFO[this.cardName].primary_key] =
        this.staffModel[constants.API_INFO[this.cardName].primary_key];
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
    this._localValues.deleteRequestKey = null;
    this._localValues.deleteRequestNode = null;
    // this.ngOnInit();
  }

  getById() {
    this.req = {};
    this.req[constants.API_INFO[this.cardName].primary_key] = this.getByIdkey;
    this.allergiesEditControll = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";

    this._opencard
      .staffCardPostMethodAPI(
        this.req,
        constants.API_INFO[this.cardName].get_by_id
      )
      .then((data) => {
        this.isPopWindow = true;
        this._localValues.deleteRequestKey =
          data[constants.API_INFO[this.cardName].get_by_id_response_key][
            constants.API_INFO[this.cardName].primary_key
          ];
        this._localValues.deleteRequestNode = this.cardName;
        this.getByIdData =
          data[constants.API_INFO[this.cardName].get_by_id_response_key];
        constants.API_INFO[this.cardName].fields.forEach((element) => {
          if (element.fieldType == "DATE_PICKER") {
            this.staffModel[element.key] = this.getByIdData[element.key]
              ? new Date(this.getByIdData[element.key])
              : null;
          } else if (element.isDoubleGetByIdKey) {
            this.staffModel[element.key] =
              this.getByIdData[element.key][element.key];
          } else {
            this.staffModel[element.key] = this.getByIdData[element.key];
          }
        });
        loader.style.display = "none";
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
    this.jumpToTree.emit();
  }

  onDeleteSelect() {
    this.isDeleteConfirmation = true;
  }

  // Name Change
  editAllergiesForm() {
    this.staffCardForm.enable();
  }

  ngOnDestroy() {
    this._localValues.deleteRequestKey = null;
    this._localValues.deleteRequestNode = null;
  }

  close() {
    let closeEV = "false";
    this.closeModel.emit(closeEV);
  }

  showSaveModel() {
    this.isPopWindow = true;
    this.allergiesEditControll = false;
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
      case "ALLERGIES":
        listRequest["openCard"] = "ClientAllergies";
        listRequest["sort"] = { column: "clientAllergiesID", mode: "desc" };
        break;
    }
    listRequest["beginPagination"] = 1;
    listRequest["endPagination"] = 100;
    let clientId = this._activateRoute.snapshot.queryParamMap.get("clientId");
    let api =
      constants.API_INFO[cardName].list_1 +
      clientId +
      constants.API_INFO[cardName].list_3;
    this._opencard.staffCardPostMethodAPI(listRequest, api).then((data) => {
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
    // switch (this.card) {
    //   case 'TRANSPORTATION':
    //     responseKey = 'staffTransportation';
    //     break;
    //   case 'TRAINING':
    //     responseKey = 'staffTraining';
    //     break;
    // }
    // responseKey = constants.API_INFO[this.card].get_by_id_response_key;
    responseKey = "openCardList";

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
    this.allergiesEditControll = true;
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

    // switch (this.card) {
    //   case 'TRANSPORTATION':
    //     this.cardName = 'TRANSPORTATION';
    //     break;
    //   case 'TRAINING':
    //     this.cardName = 'TRAINING';
    //     break;
    // }
    constants.API_INFO[this.cardName].fields.forEach((element) => {
      this.staffModel[element.key] = null;
    });
    this.designData = [];
    this.designData = constants.API_INFO[this.cardName].fields.filter(
      (element) => {
        return element.label;
      }
    );

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
            ? this._localValues.stringFormatDatetime(
                Date.parse(this.staffModel["beginDate"])
              )
            : null,
          endDate: this.staffModel["endDate"]
            ? this._localValues.stringFormatDatetime(
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
            ? this._localValues.stringFormatDatetime(
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
      case "ALLERGIES":
        request = {
          notificationDate: this.staffModel["notificationDate"]
            ? this._localValues.stringFormatDatetime(
                Date.parse(this.staffModel["notificationDate"])
              )
            : null,
          client: parseInt(
            this._activateRoute.snapshot.queryParamMap.get("clientId")
          ),
          allergies: this.staffModel["allergies"],
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
      }
      this._opencard
        .staffCardPostMethodAPI(dropdownRequest, dropdownInfo.api)
        .then((data) => {
          this.metaData = data[dropdownInfo.responseKey];
        });
    }
  }

  openAllergies() {
    this.isPopListWindow = true;
  }

  discardAllergiesForm() {
    this.isPopWindow = false;
  }

  navigateToList(url: string): Promise<any> {
    return this._router.navigate([url], { queryParamsHandling: "preserve" });
  }
}
