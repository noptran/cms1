import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CaseTeamService } from "./../case-team/case-team.service";
import { Router } from "@angular/router";
import { Ntff, NtffAttachment } from "./ntff";
import { isNullOrUndefined, isNull } from "util";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { ClildFormService } from "../child-forms/child-forms.service";
import swal from "sweetalert2";
import * as moment from "moment";
import { FpCaseActivity } from "../family-preservation-list/forms/case-activity-fp-form/fp-case-activity";
import {LocalValues} from "../local-values";
import html2pdf from "html2pdf.js";
import { ReferralViewService } from "../referral-view/referral-view.service";
import {PrintPdf} from "../print-pdf";
import { PrintService } from "../print-layout/service/print.service";

@Component({
  selector: "app-non-therapy-face-to-face",
  templateUrl: "./non-therapy-face-to-face.component.html",
  styleUrls: [
    "./non-therapy-face-to-face.component.scss",
    "../person-master/Client/client-form/client-form.component.scss",
  ],
  inputs: ["ntffLogData"],
})
export class NonTherapyFaceToFaceComponent implements OnInit {
  fillteredNTFFStatus: any[];
  subtitle: any;
  formControl: any;
  editControll: boolean;
  Data;
  ntffForm: FormGroup;
  showForm = false;
  mainTabs = [];
  sIndex: number = null;
  sortList = [{ name: "Yes" }, { name: "No" }, { name: "N/A" }];
  alone_ntff: any = {
    clientID: "",
    isAloneTime: "",
    isAloneTimeException: "",
    aloneTimeExceptionID: "",
    aloneTimeLength: "",
    aloneTimeNotes: "",
  };
  title = "Non Theraphy Face To Face";
  status = "draft";
  breadcrumbs = [];
  newForm;
  nonTherapyID;
  edit = false;
  formStatus = "draft";
  sortOrder: any;
  sortField: any;
  clientName = "";
  backLabel: any;
  isBackLabel: any;
  ntff: Ntff = new Ntff();
  metadata: any;
  discardTo =
    "/reports/referral/family-preservation/non-therapy-face-to-face/view";
  aloneIndexId: any;
  aloneIndexStatus: boolean;
  url: any;
  isAttachmentRequired = false;
  aloneTimeException: any;
  filteredAloneTimeExceptions = [];
  currentCaseActivityDetails: FpCaseActivity;
  alone_list = [];
  isAloneTimeUpdate = false;
  isPrint = false;
  isNTFTFPrintable = false;
  ntffPrintJson: NtffAttachment = new NtffAttachment();
  isConfirmationCheckBox = false;
  NTFFStatusListData = [];
  isClientNextAppointmentDesc = false;
  isFormValidationRequired = false;
  isSplit = false;
  FISMemberDetails = [];
  filteredFISMembers = [];
  nexAppointmentAlongWithDate: string;
  ntffDuration: string;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  // To be removed
  isCaseActivityLogCreated = false;

  @Input()
  ntffLogData: any;
  fetchCaseactivityID: any;
  fetchReferralID: any;
  fetchClientID: any;

  constructor(
    public printService: PrintService,
    public _referral: ReferralViewService,
    public _fb: FormBuilder,
    public _router: Router,
    public _CaseTeamService: CaseTeamService,
    public _opencard: OpencardsService,
    public _client: ClildFormService,
    public _localValues: LocalValues,
    public _printPdf: PrintPdf
  ) {}

  ngOnInit() {
    this.formControl = false;
    this.editControll = false;
    this.breadcurmnbsSelection();
    this.showForm = true;
    this.defineMainTabs();
    this.setIndex(0);
    this.formValidation();
    if (
      this._router.url ==
      "/reports/referral/family-preservation/non-therapy-face-to-face/detail"
    ) {
      this.getNtffRec();
      this.isAttachmentRequired = true;
      this.isPrint = true;
      this.autoFetchDetails();
    }
    this.getAloneTimeExceptions();
    if (this._router.url != "/reports/case-activity-log") {
      this.getCaseActivityInfo();
    }

    this.getNTFFStatusList();
    this.ntff.statusTypeID = { statusType: "Completed", statusTypeID: 4 };
    this.getFISMembers();

    // To be removed
    if (this._router.url == "/reports/case-activity-log") {
      this.isCaseActivityLogCreated = true;
      this.getNtffRec();
      this.autoFetchDetails();
    }
  }

  addPost(post) {
    !isNullOrUndefined(post.beginDate)
      ? (post.beginDate = this._localValues.stringFormatDatetime(
          post.beginDate
        ))
      : null;
    !isNullOrUndefined(post.endDate)
      ? (post.endDate = this._localValues.stringFormatDatetime(post.endDate))
      : null;
    !isNullOrUndefined(post.nextAppointmentDate)
      ? (post.nextAppointmentDate = this._localValues.stringFormatDatetime(
          post.nextAppointmentDate
        ))
      : null;
    !isNullOrUndefined(post.clientID)
      ? (post.clientID = post.clientID.clientID)
      : null;
    !isNullOrUndefined(post.staffID)
      ? (post.staffID = post.staffID.staffID)
      : null;
    !isNullOrUndefined(post.statusTypeID)
      ? (post.statusTypeID = post.statusTypeID.statusTypeID)
      : null;

    !isNullOrUndefined(post.childAppearsHealthy_YesNoPendingID)
      ? (post.childAppearsHealthy_YesNoPendingID = parseInt(
          post.childAppearsHealthy_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.childIsClean_YesNoPendingID)
      ? (post.childIsClean_YesNoPendingID = parseInt(
          post.childIsClean_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.heightWeight_YesNoPendingID)
      ? (post.heightWeight_YesNoPendingID = parseInt(
          post.heightWeight_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.homeIsClean_YesNoPendingID)
      ? (post.homeIsClean_YesNoPendingID = parseInt(
          post.homeIsClean_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.homeSafetyConcerns_YesNoPendingID)
      ? (post.homeSafetyConcerns_YesNoPendingID = parseInt(
          post.homeSafetyConcerns_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.unusualMarks_YesNoPendingID)
      ? (post.unusualMarks_YesNoPendingID = parseInt(
          post.unusualMarks_YesNoPendingID
        ))
      : null;

    !isNullOrUndefined(post.weaponsObserv_YesNoPendingID)
      ? (post.weaponsObserv_YesNoPendingID = parseInt(
          post.weaponsObserv_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.suicidalThoughts_YesNoPendingID)
      ? (post.suicidalThoughts_YesNoPendingID = parseInt(
          post.suicidalThoughts_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.violentThoughts_YesNoPendingID)
      ? (post.violentThoughts_YesNoPendingID = parseInt(
          post.violentThoughts_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.caregiver_YesNoPendingID)
      ? (post.caregiver_YesNoPendingID = parseInt(
          post.caregiver_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.shwsings_YesNoPendingID)
      ? (post.shwsings_YesNoPendingID = parseInt(post.shwsings_YesNoPendingID))
      : null;
    !isNullOrUndefined(post.safetyConcerns_YesNo)
      ? (post.safetyConcerns_YesNo = parseInt(post.safetyConcerns_YesNo))
      : null;

    !isNullOrUndefined(post.riskHouse_YesNo)
      ? (post.riskHouse_YesNo = parseInt(post.riskHouse_YesNo))
      : null;
    !isNullOrUndefined(post.heightWeight_YesNoPendingID)
      ? (post.heightWeight_YesNoPendingID = parseInt(
          post.heightWeight_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.riskCaregiver_YesNo)
      ? (post.riskCaregiver_YesNo = parseInt(post.riskCaregiver_YesNo))
      : null;
    !isNullOrUndefined(post.childHygieneAndDress_YesNoPendingID)
      ? (post.childHygieneAndDress_YesNoPendingID = parseInt(
          post.childHygieneAndDress_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.riskphysical_YesNo)
      ? (post.riskphysical_YesNo = parseInt(post.riskphysical_YesNo))
      : null;
    !isNullOrUndefined(post.riskChildSelfHarming_YesNo)
      ? (post.riskChildSelfHarming_YesNo = parseInt(
          post.riskChildSelfHarming_YesNo
        ))
      : null;
    !isNullOrUndefined(post.riskChildSpace_YesNo)
      ? (post.riskChildSpace_YesNo = parseInt(post.riskChildSpace_YesNo))
      : null;
    !isNullOrUndefined(post.riskChildAggressive_YesNo)
      ? (post.riskChildAggressive_YesNo = parseInt(
          post.riskChildAggressive_YesNo
        ))
      : null;

    !isNullOrUndefined(post.riskChildAggressive_YesNo)
      ? (post.riskChildAggressive_YesNo = parseInt(
          post.riskChildAggressive_YesNo
        ))
      : null;
    !isNullOrUndefined(post.riskChildAggressive_YesNo)
      ? (post.riskChildAggressive_YesNo = parseInt(
          post.riskChildAggressive_YesNo
        ))
      : null;
    !isNullOrUndefined(post.riskChildAggressive_YesNo)
      ? (post.riskChildAggressive_YesNo = parseInt(
          post.riskChildAggressive_YesNo
        ))
      : null;
    !isNullOrUndefined(post.riskChildAggressive_YesNo)
      ? (post.riskChildAggressive_YesNo = parseInt(
          post.riskChildAggressive_YesNo
        ))
      : null;

    !isNullOrUndefined(post.reviewCasePlan_YesNoPendingID)
      ? (post.reviewCasePlan_YesNoPendingID = parseInt(
          post.reviewCasePlan_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.nonIntense_YesNoPendingID)
      ? (post.nonIntense_YesNoPendingID = parseInt(
          post.nonIntense_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.developedOrReviewed_YesNoPendingID)
      ? (post.developedOrReviewed_YesNoPendingID = parseInt(
          post.developedOrReviewed_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.additionalRiskConcernVisited_YesNoPendingID)
      ? (post.additionalRiskConcernVisited_YesNoPendingID = parseInt(
          post.additionalRiskConcernVisited_YesNoPendingID
        ))
      : null;
    !isNullOrUndefined(post.riskIntenseplan_YesNo)
      ? (post.riskIntenseplan_YesNo = parseInt(post.riskIntenseplan_YesNo))
      : null;
    !isNullOrUndefined(post.heightWeightAppears_YesNoPendingID)
      ? (post.heightWeightAppears_YesNoPendingID = parseInt(
          post.heightWeightAppears_YesNoPendingID
        ))
      : null;
    post.caseActivityID = this.fetchCaseactivityID;
    post.referralID = this.fetchReferralID;
    post.clientID = this.fetchClientID;
    // post.referralID = parseInt(localStorage.getItem("referralId")) - this._opencard.getHasKey();
    // post.clientID = parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey();
    // post.caseActivityID = this._localValues.caseAcitivityID;
    post.isVerified = this.ntff.isVerified;
    this.additionalValidation();
    this.isSplit;
    if (this.isSplit) {
      this.alone_list.filter((item: any) => {
        if (
          item.clientID !== undefined &&
          item.aloneTimeExceptionID !== undefined
        ) {
          !isNullOrUndefined(item.clientID)
            ? (item.clientID = item.clientID.clientID)
            : null;
          item.isFaceToFace = true;
          item.caseActivityID = this._localValues.caseAcitivityID;
          return !isNullOrUndefined(item.aloneTimeExceptionID)
            ? (item.aloneTimeExceptionID =
                item.aloneTimeExceptionID.aloneTimeExceptionID)
            : null;
        }
      });
    }

    let ntffReq = {
      nonTherapyFaceToFace: post,
      caseActivityFaceToFace: this.alone_list,
    };

    if (this.ntff.nextAppointmentDate) {
      if (
        this.ntff.nextAppointmentDate == null ||
        this.ntff.nextAppointmentDate == undefined
      ) {
        swal(
          "Info",
          'Please fill the "Plan for client untill next appointment" field! ',
          "info"
        );
        this.getCaseActivityInfo();
        this.ntff.statusTypeID = { statusType: "Completed", statusTypeID: 4 };
        return;
      }
    } else {
      return this.checkBoxValidation(post, ntffReq);
    }

    if (this.ntff.isVerified) {
      if (this.ntffForm.valid) {
        if (post.nonTherapyFaceToFaceID) {
          this.updateForm(ntffReq);
        } else {
          this.saveForm(ntffReq);
        }
      } else {
        return swal("Info", "Please fill all the information", "info").then(
          () => {
            this.getCaseActivityInfo();
            this.ntff.nextAppointmentDate = null;
            this.ntff.statusTypeID = {
              statusType: "Completed",
              statusTypeID: 4,
            };
          }
        );
      }
    } else {
      return this.checkBoxValidation(post, ntffReq);
    }
  }

  /***
   * @param data  - ntff obj
   */
  saveForm(data) {
    console.log(
      "this._localValues.multyClientIDS>>>>>",
      this._localValues.multyClientIDS
    );
    data.MultiClientArray = this._localValues.multyClientIDS;

    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.saveNtff(data).then((data) => {
      loader.style.display = "none";
      swal("Success", "Record has been saved!", "success");
      if (
        this._router.url ==
        "/reports/referral/family-preservation/non-therapy-face-to-face/detail"
      ) {
        this._router.navigate([
          "/reports/referral/family-preservation/non-therapy-face-to-face/view",
        ]);
      } else {
        this.navigateToCaseActivity();
      }
    });
  }

  /***
   * @param data  - ntff obj
   */
  updateForm(data) {
    data.MultiClientArray = [];
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.updateNtff(data).then((data) => {
      loader.style.display = "none";
      swal("Success", "Record has been updated!", "success");
      if (
        this._router.url ==
        "/reports/referral/family-preservation/non-therapy-face-to-face/detail"
      ) {
        this._router.navigate([
          "/reports/referral/family-preservation/non-therapy-face-to-face/view",
        ]);
      } else {
        this.navigateToCaseActivity();
      }
    });
  }

  resetForm() {}

  discardForm() {}

  editForm() {
    this.ntffForm.enable();
    this.edit = false;
    // this.ntffForm.get('beginDate').disable();
    // this.ntffForm.get('endDate').disable();
    this.isConfirmationCheckBox = false;
  }

  setIndex(index: number) {
    this.sIndex = index;
  }

  defineMainTabs() {
    return (this.mainTabs = [
      { label: "General Information", href: "#nav-general" },
      { label: "Family Member", href: "#nav-family" },
      // { label: "Case Plan Task", href: "#nav-case" },
      { label: "Observation", href: "#nav-observation" },
      { label: "Review of Case Plan", href: "#nav-review" },
      { label: "Appointment", href: "#nav-appointment" },
    ]);
  }

  breadcurmnbsSelection() {
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case Form",
        href: "/reports/referral/family-preservation/detail",
        active: "",
      },
      {
        label: "NTFF",
        href:
          "/reports/referral/family-preservation/non-therapy-face-to-face/view",
        active: "",
      },
      { label: "NTFF Form", active: "active" }
    );
  }

  getMetaData(event, label) {
    let metaDataReqObj, metaDataReq;
    switch (label) {
      case "staff":
        metaDataReqObj = "staff";
        break;
      case "client":
        metaDataReqObj = "client";
        break;
      case "homeSafetyConcerns":
        metaDataReqObj = "yesNoPending";
        break;
      case "homeIsClean":
        metaDataReqObj = "yesNoPending";
        break;

      case "childClean":
        metaDataReqObj = "yesNoPending";
        break;
      case "childAppearsHealthy":
        metaDataReqObj = "yesNoPending";
        break;
      case "heightWeight":
        metaDataReqObj = "yesNoPending";
        break;
      case "unusualMarks":
        metaDataReqObj = "yesNoPending";
        break;
      case "statusType":
        metaDataReqObj = "statusType";
        break;
    }
    metaDataReq = { Object: metaDataReqObj, value: event.query };
    this._CaseTeamService.getSearchList(metaDataReq).then((data) => {
      data.dropDown.map((item) => {
        if (item.lastName) {
          item["fullName"] =
            item.lastName + " " + item.firstName + " ( " + item.email + " ) ";
        } else {
          item["clientName"] = item.clientName;
        }
      });
      if (metaDataReqObj == "yesNoPending") {
        data.dropDown.map((item) => {
          if (
            item.yesNoPendingID == 1 &&
            item.yesNoPendingID == 2 &&
            item.yesNoPendingID == 5
          ) {
            return item;
          }
        });
      }
      this.metadata = data.dropDown;
    });
  }

  formValidation() {
    let formValidation = (this.ntffForm = this._fb.group({
      nonTherapyFaceToFaceID: [null],
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null, Validators.compose([Validators.required])],
      location: [null, Validators.compose([Validators.required])],
      staffID: [null, Validators.compose([Validators.required])],
      clientsPresent: [null, Validators.compose([Validators.required])],
      interactions: [null, Validators.compose([Validators.required])],
      relatedTask: [null],
      review: [null],
      homeSafetyConcerns_YesNoPendingID: [
        null,
        Validators.compose([Validators.required]),
      ],
      homeIsClean_YesNoPendingID: [
        null,
        Validators.compose([Validators.required]),
      ],
      childIsClean_YesNoPendingID: [null],
      childAppearsHealthy_YesNoPendingID: [
        null,
        Validators.compose([Validators.required]),
      ],
      heightWeight_YesNoPendingID: [
        null,
        Validators.compose([Validators.required]),
      ],
      unusualMarks_YesNoPendingID: [
        null,
        Validators.compose([Validators.required]),
      ],
      additionalComments: [null],
      nextAppointmentDate: [null],
      planTillNextAppointment: [null],
      statusTypeID: [null, Validators.compose([Validators.required])],
      serviceSupport: [null],
      riskComments: [null],
      problemsConcerns: [null],
      followUp: [null],
      weaponsObserv_YesNoPendingID: [null],
      suicidalThoughts_YesNoPendingID: [null],
      violentThoughts_YesNoPendingID: [null],
      caregiver_YesNoPendingID: [null],
      shwsings_YesNoPendingID: [null],
      safetyConcerns_YesNo: [null],
      riskHouse_YesNo: [null],
      riskCaregiver_YesNo: [null],
      riskphysical_YesNo: [null],
      riskChildSpace_YesNo: [null],
      riskChildSelfHarming_YesNo: [null],
      riskChildAggressive_YesNo: [null],
      riskIntenseplan_YesNo: [null],
      reviewCasePlan_YesNoPendingID: [null],
      nonIntense_YesNoPendingID: [null],
      caseActivityID: [null],
      referralID: [null],
      clientID: [null],
      planactivityDuringTheSession: [null],
      familySafetyPlan: [null],
      safetyNeeds: [null],
      safetyComments: [null],
      childHygieneAndDress_YesNoPendingID: [null],
      reviewProgressPlanActivities: [null],
      familyStrengthsAndResources: [null],
      developedOrReviewed_YesNoPendingID: [null],
      additionalRiskConcernVisited_YesNoPendingID: [null],
      heightWeightAppears_YesNoPendingID: [null],
      reviewOfCasePlanProgress: [null],
    }));
    this.isFormValidationRequired
      ? (this.ntffForm = formValidation)
      : this._fb.group({
          nonTherapyFaceToFaceID: [null],
          beginDate: [null],
          endDate: [null],
          location: [null],
          staffID: [null],
          clientsPresent: [null],
          interactions: [null],
          relatedTask: [null],
          review: [null],
          homeSafetyConcerns_YesNoPendingID: [null],
          homeIsClean_YesNoPendingID: [null],
          childIsClean_YesNoPendingID: [null],
          childAppearsHealthy_YesNoPendingID: [null],
          heightWeight_YesNoPendingID: [null],
          unusualMarks_YesNoPendingID: [null],
          additionalComments: [null],
          nextAppointmentDate: [null],
          planTillNextAppointment: [null],
          statusTypeID: [null],
          serviceSupport: [null],
          riskComments: [null],
          problemsConcerns: [null],
          followUp: [null],
          weaponsObserv_YesNoPendingID: [null],
          suicidalThoughts_YesNoPendingID: [null],
          violentThoughts_YesNoPendingID: [null],
          caregiver_YesNoPendingID: [null],
          shwsings_YesNoPendingID: [null],
          safetyConcerns_YesNo: [null],
          riskHouse_YesNo: [null],
          riskCaregiver_YesNo: [null],
          riskphysical_YesNo: [null],
          riskChildSpace_YesNo: [null],
          riskChildSelfHarming_YesNo: [null],
          riskChildAggressive_YesNo: [null],
          riskIntenseplan_YesNo: [null],
          reviewCasePlan_YesNoPendingID: [null],
          nonIntense_YesNoPendingID: [null],
          caseActivityID: [null],
          referralID: [null],
          clientID: [null],
          planactivityDuringTheSession: [null],
          familySafetyPlan: [null],
          safetyNeeds: [null],
          safetyComments: [null],
          childHygieneAndDress_YesNoPendingID: [null],
          reviewProgressPlanActivities: [null],
          familyStrengthsAndResources: [null],
          developedOrReviewed_YesNoPendingID: [null],
          additionalRiskConcernVisited_YesNoPendingID: [null],
          heightWeightAppears_YesNoPendingID: [null],
          reviewOfCasePlanProgress: [null],
        });
  }

  getNtffRec() {
    this.isClientNextAppointmentDesc = false;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    // To be removed
    // this.isCaseActivityLogCreated = true;
    // this.isNTFTFPrintable = true;
    // let req = { nonTherapyFaceToFaceID: 1000541, caseActivityID: 10010078 };
    let req: any;
    if (this._router.url == "/reports/case-activity-log") {
      req = {
        nonTherapyFaceToFaceID: this.ntffLogData.nonTherapyFaceToFaceID,
        caseActivityID: this.ntffLogData.caseActivityID,
      };
    }
    // let req = { nonTherapyFaceToFaceID: 1000543, caseActivityID: 10010111 };
    else {
      req = {
        nonTherapyFaceToFaceID: this._client.getId(),
        caseActivityID: this._localValues.caseAcitivityID,
      };
    }
    // let req = { nonTherapyFaceToFaceID: this._client.getId(), caseActivityID: this._localValues.caseAcitivityID };
    this._opencard.getByIdNtff(req).then((data) => {
      loader.style.display = "none";
      this.edit = true;
      this.isConfirmationCheckBox = true;
      this.ntffForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.nontherapyFaceToFace.changedBy
      )
        ? data.nontherapyFaceToFace.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.nontherapyFaceToFace.changedDate
      )
        ? moment(data.nontherapyFaceToFace.changedDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.nontherapyFaceToFace.enteredBy
      )
        ? data.nontherapyFaceToFace.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.nontherapyFaceToFace.enteredDate
      )
        ? moment(data.nontherapyFaceToFace.enteredDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";

      if (
        data.nontherapyFaceToFace.nextAppointmentDate !== null ||
        data.nontherapyFaceToFace.nextAppointmentDate !== undefined
      ) {
        this.isClientNextAppointmentDesc = true;
      } else {
        this.isClientNextAppointmentDesc = false;
      }
      data.caseActivityFaceToFace.map((item: any) => {
        !isNullOrUndefined(item.clientID)
          ? (item.clientID[
              "clientName"
            ] = `${item.clientID.lastName}, ${item.clientID.firstName}`)
          : null;
      });
      this.alone_list = data.caseActivityFaceToFace;
      if (data.nontherapyFaceToFace.isActive) {
        !isNullOrUndefined(data.nontherapyFaceToFace.beginDate)
          ? (data.nontherapyFaceToFace.beginDate = new Date(
              Date.parse(data.ntffBeginDate)
            ))
          : null;
        !isNullOrUndefined(data.nontherapyFaceToFace.endDate)
          ? (data.nontherapyFaceToFace.endDate = new Date(
              Date.parse(data.ntffEndDate)
            ))
          : null;
        !isNullOrUndefined(data.nontherapyFaceToFace.nextAppointmentDate)
          ? (data.nontherapyFaceToFace.nextAppointmentDate = new Date(
              data.nontherapyFaceToFace.nextAppointmentDate
            ))
          : null;
      } else {
        !isNullOrUndefined(data.nontherapyFaceToFace.beginDate)
          ? (data.nontherapyFaceToFace.beginDate = moment
              .utc(data.nontherapyFaceToFace.beginDate)
              .format("MM/DD/YYYY HH:mm"))
          : null;
        !isNullOrUndefined(data.nontherapyFaceToFace.endDate)
          ? (data.nontherapyFaceToFace.endDate = moment
              .utc(data.nontherapyFaceToFace.endDate)
              .format("MM/DD/YYYY HH:mm"))
          : null;
        !isNullOrUndefined(data.nontherapyFaceToFace.nextAppointmentDate)
          ? (data.nontherapyFaceToFace.nextAppointmentDate = moment
              .utc(data.nontherapyFaceToFace.nextAppointmentDate)
              .format("MM/DD/YYYY HH:mm"))
          : null;
      }

      !isNullOrUndefined(data.nontherapyFaceToFace.clientID)
        ? (data.nontherapyFaceToFace.clientID["clientName"] =
            data.nontherapyFaceToFace.clientID.lastName +
            " " +
            data.nontherapyFaceToFace.clientID.firstName)
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.staffID)
        ? (data.nontherapyFaceToFace.staffID["fullName"] =
            data.nontherapyFaceToFace.staffID.lastName +
            " " +
            data.nontherapyFaceToFace.staffID.firstName +
            " ( " +
            data.nontherapyFaceToFace.staffID.email +
            " ) ")
        : null;
      !isNullOrUndefined(
        data.nontherapyFaceToFace.homeSafetyConcerns_YesNoPendingID
      )
        ? (data.nontherapyFaceToFace.homeSafetyConcerns_YesNoPendingID = data.nontherapyFaceToFace.homeSafetyConcerns_YesNoPendingID.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.homeIsClean_YesNoPendingID)
        ? (data.nontherapyFaceToFace.homeIsClean_YesNoPendingID = data.nontherapyFaceToFace.homeIsClean_YesNoPendingID.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.childIsClean_YesNoPendingID)
        ? (data.nontherapyFaceToFace.childIsClean_YesNoPendingID = data.nontherapyFaceToFace.childIsClean_YesNoPendingID.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(
        data.nontherapyFaceToFace.childAppearsHealthy_YesNoPendingID
      )
        ? (data.nontherapyFaceToFace.childAppearsHealthy_YesNoPendingID = data.nontherapyFaceToFace.childAppearsHealthy_YesNoPendingID.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.heightWeight_YesNoPendingID)
        ? (data.nontherapyFaceToFace.heightWeight_YesNoPendingID = data.nontherapyFaceToFace.heightWeight_YesNoPendingID.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.unusualMarks_YesNoPendingID)
        ? (data.nontherapyFaceToFace.unusualMarks_YesNoPendingID = data.nontherapyFaceToFace.unusualMarks_YesNoPendingID.yesNoPendingID.toString())
        : null;
      this.ntff = data.nontherapyFaceToFace;
      this.nexAppointmentAlongWithDate = `${
        !isNullOrUndefined(this.ntff.nextAppointmentDate)
          ? this._localValues.getDateandTimeWithExt(
              this.ntff.nextAppointmentDate
            )
          : " "
      } - ${this.ntff.planTillNextAppointment}`;

      !isNullOrUndefined(data.nontherapyFaceToFace.weaponsObserv_YesNoPendingID)
        ? (data.nontherapyFaceToFace.weaponsObserv_YesNoPendingID = data.nontherapyFaceToFace.weaponsObserv_YesNoPendingID.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(
        data.nontherapyFaceToFace.suicidalThoughts_YesNoPendingID
      )
        ? (data.nontherapyFaceToFace.suicidalThoughts_YesNoPendingID = data.nontherapyFaceToFace.suicidalThoughts_YesNoPendingID.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(
        data.nontherapyFaceToFace.violentThoughts_YesNoPendingID
      )
        ? (data.nontherapyFaceToFace.violentThoughts_YesNoPendingID = data.nontherapyFaceToFace.violentThoughts_YesNoPendingID.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.caregiver_YesNoPendingID)
        ? (data.nontherapyFaceToFace.caregiver_YesNoPendingID = data.nontherapyFaceToFace.caregiver_YesNoPendingID.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.shwsings_YesNoPendingID)
        ? (data.nontherapyFaceToFace.shwsings_YesNoPendingID = data.nontherapyFaceToFace.shwsings_YesNoPendingID.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.safetyConcerns_YesNo)
        ? (data.nontherapyFaceToFace.safetyConcerns_YesNo = data.nontherapyFaceToFace.safetyConcerns_YesNo.yesNoPendingID.toString())
        : null;

      !isNullOrUndefined(data.nontherapyFaceToFace.riskHouse_YesNo)
        ? (data.nontherapyFaceToFace.riskHouse_YesNo = data.nontherapyFaceToFace.riskHouse_YesNo.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.riskCaregiver_YesNo)
        ? (data.nontherapyFaceToFace.riskCaregiver_YesNo = data.nontherapyFaceToFace.riskCaregiver_YesNo.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(
        data.nontherapyFaceToFace.childHygieneAndDress_YesNoPendingID
      )
        ? (data.nontherapyFaceToFace.childHygieneAndDress_YesNoPendingID = data.nontherapyFaceToFace.childHygieneAndDress_YesNoPendingID.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.riskphysical_YesNo)
        ? (data.nontherapyFaceToFace.riskphysical_YesNo = data.nontherapyFaceToFace.riskphysical_YesNo.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.riskChildSelfHarming_YesNo)
        ? (data.nontherapyFaceToFace.riskChildSelfHarming_YesNo = data.nontherapyFaceToFace.riskChildSelfHarming_YesNo.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.riskChildSpace_YesNo)
        ? (data.nontherapyFaceToFace.riskChildSpace_YesNo = data.nontherapyFaceToFace.riskChildSpace_YesNo.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.riskChildAggressive_YesNo)
        ? (data.nontherapyFaceToFace.riskChildAggressive_YesNo = data.nontherapyFaceToFace.riskChildAggressive_YesNo.yesNoPendingID.toString())
        : null;

      !isNullOrUndefined(
        data.nontherapyFaceToFace.reviewCasePlan_YesNoPendingID
      )
        ? (data.nontherapyFaceToFace.reviewCasePlan_YesNoPendingID = data.nontherapyFaceToFace.reviewCasePlan_YesNoPendingID.yesNoPendingID.toString())
        : null;
      !isNullOrUndefined(data.nontherapyFaceToFace.nonIntense_YesNoPendingID)
        ? (data.nontherapyFaceToFace.nonIntense_YesNoPendingID = data.nontherapyFaceToFace.nonIntense_YesNoPendingID.yesNoPendingID.toString())
        : null;

      !isNullOrUndefined(
        data.nontherapyFaceToFace.developedOrReviewed_YesNoPendingID
      )
        ? (data.nontherapyFaceToFace.developedOrReviewed_YesNoPendingID = data.nontherapyFaceToFace.developedOrReviewed_YesNoPendingID.yesNoPendingID.toString())
        : null;

      !isNullOrUndefined(
        data.nontherapyFaceToFace.additionalRiskConcernVisited_YesNoPendingID
      )
        ? (data.nontherapyFaceToFace.additionalRiskConcernVisited_YesNoPendingID = data.nontherapyFaceToFace.additionalRiskConcernVisited_YesNoPendingID.yesNoPendingID.toString())
        : null;

      !isNullOrUndefined(data.nontherapyFaceToFace.riskIntenseplan_YesNo)
        ? (data.nontherapyFaceToFace.riskIntenseplan_YesNo = data.nontherapyFaceToFace.riskIntenseplan_YesNo.yesNoPendingID.toString())
        : null;

      !isNullOrUndefined(
        data.nontherapyFaceToFace.heightWeightAppears_YesNoPendingID
      )
        ? (data.nontherapyFaceToFace.heightWeightAppears_YesNoPendingID = data.nontherapyFaceToFace.heightWeightAppears_YesNoPendingID.yesNoPendingID.toString())
        : null;

      this.fetchValuesForPrint();
      this.fetchPrintData(data);
    });
  }

  addAloneTime() {
    if (this.alone_ntff.clientID.clientName == undefined) {
      swal("No Client Found", "Please Select the Client", "info");
    } else {
      let aloneName = this.alone_ntff.clientID.clientName;
      if (this.aloneIndexStatus) {
        this.alone_list[this.aloneIndexId] = this.alone_ntff;
        this.alone_ntff = {
          clientID: "",
          isAloneTime: "",
          isAloneTimeException: "",
          aloneTimeExceptionID: "",
          aloneTimeLength: "",
          aloneTimeNotes: "",
          caseActivityID:
            parseInt(localStorage.getItem("caseActivityID")) -
            this._opencard.getHasKey(),
        };
        this.aloneIndexStatus = false;
        swal("Success", "Client has been Updated!", "success").then(() => {
          this.isAloneTimeUpdate = false;
        });
      } else {
        let array1 = this.alone_list;
        let found = array1.find(function (element) {
          return element.clientID.clientName == aloneName;
        });
        if (found == undefined) {
          this.alone_list.push(this.alone_ntff);
          swal("Success", "Client has been Saved!", "success");
          this.alone_ntff = {
            clientID: "",
            isAloneTime: "",
            isAloneTimeException: "",
            aloneTimeExceptionID: "",
            aloneTimeLength: "",
            aloneTimeNotes: "",
          };
        } else {
          swal("Duplicate", "The Client Already in the list", "info");
        }
      }
    }
    this.alone_list;
    return;
  }
  viewAloneTime(aloneData, id) {
    this.alone_ntff = aloneData;
    this.aloneIndexId = id;
    this.aloneIndexStatus = true;
    this.isAloneTimeUpdate = true;
  }
  deleteAloneTime(id: any, caseActivityID: any) {
    let req = {
      caseActivityFaceToFace: { caseActivityFaceToFaceID: [caseActivityID] },
    };
    if (caseActivityID !== undefined) {
      this._opencard.deleteNTFFAloneTime(req).then((data: any) => {
        if (data.responseStatus) {
          swal("Removed!", "The item has been removed!", "info");
        } else {
          swal(
            "Please try again later!",
            "Something went wrong, Please try again later!",
            "error"
          );
        }
        this.alone_list.splice(id, 1);
      });
    } else {
      this.alone_list.splice(id, 1);
    }
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (
      currentURL ==
      "/reports/referral/family-preservation/non-therapy-face-to-face/detail"
    ) {
      this.url = "/reports/attachment-document/non-therapy";
    }

    return this._router.navigate([this.url]);
  }

  getAloneTimeExceptions() {
    let req = { Object: "aloneTimeException", value: "" };
    this._CaseTeamService.getSearchList(req).then((data: any) => {
      this.aloneTimeException = data.dropDown;
    });
  }

  filterAloneTimeExceptions(event: any) {
    this.filteredAloneTimeExceptions = [];
    this.aloneTimeException.filter((item: any) => {
      if (item.aloneTimeException.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredAloneTimeExceptions.push(item);
      }
    });
  }

  clearAloneTime() {
    this.alone_ntff = "";
  }

  getCaseActivityInfo() {
    let parsedBeginDate: any, parsedEndDate: any;
    let req;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    if (this._localValues.caseAcitivityID == null) {
      req = {
        caseActivityID:
          parseInt(localStorage.getItem("caseActivityID")) -
          this._opencard.getHasKey(),
      };
    } else {
      let caseActivityId = this._localValues.caseAcitivityID;
      req = { caseActivityID: caseActivityId };
    }
    // To be removed
    // let req = { caseActivityID: 10010078 }
    this._opencard
      .getCaseActivityById(req)
      .then((data: any) => {
        this.fetchCaseactivityID = data.caseActivity.caseActivityID;
        this.fetchReferralID = data.caseActivity.referralID.referralID;
        this.fetchClientID = data.caseActivity.clientID.clientID;
        this.currentCaseActivityDetails = data.caseActivity;
        this.ntff.staffID = data.caseActivity.staffID;
        data.caseActivity.staffID[
          "fullName"
        ] = `${data.caseActivity.staffID.lastName} ${data.caseActivity.staffID.firstName}`;
        this.ntffPrintJson.staffName = `${data.caseActivity.staffID.lastName}, ${data.caseActivity.staffID.firstName}`;
        !isNullOrUndefined(data.caseActivityBeginDate)
          ? (parsedBeginDate = Date.parse(data.caseActivityBeginDate))
          : null;
        !isNullOrUndefined(data.caseActivityEndDate)
          ? (parsedEndDate = Date.parse(data.caseActivityEndDate))
          : null;
        !isNullOrUndefined(parsedBeginDate)
          ? (this.ntff.beginDate = new Date(parsedBeginDate))
          : null;
        !isNullOrUndefined(parsedBeginDate)
          ? (this.ntff.endDate = new Date(parsedEndDate))
          : null;
        this._localValues.beginTime = this.ntff.beginDate;
        this._localValues.endTime = this.ntff.endDate;
        this._localValues.timeDifferenceFormat = "FMDH-M";
        this.ntffDuration = this._localValues.durationCalculation();
      })
      .catch(() => {
        swal(
          "Unable to proecess",
          "Parent record information missing!",
          "info"
        ).then(() => {
          this._router.navigate([
            "/reports/referral/family-preservation/non-therapy-face-to-face/view",
          ]);
        });
      })
      .finally(() => {
        loader.style.display = "none";
      });
  }

  printForm() {
    const data = {
      ntffPrintJson: this.ntffPrintJson,
      ntff: this.ntff,
      alone_list: this.alone_list,
      nexAppointmentAlongWithDate: this.nexAppointmentAlongWithDate,
    };
    this.printService.printDocument("ntff", data);

    // this.printService
    //   .printDocument('worker-child', 'data');
  }

  closeModalBox() {
    this.isNTFTFPrintable = false;
  }

  printPreview() {
    this.isNTFTFPrintable = true;
  }

  autoFetchDetails() {
    if (this._router.url == "/reports/case-activity-log") {
      let req = {
        clientID: this.ntffLogData.clientID,
      };

      this._client.getDetailsById(req).then((data) => {
        this.ntffPrintJson.caseName =
          data.person.lastName + ", " + data.person.firstName;
        this.ntffPrintJson.caseNumber = data.person.kaecses;
      });
    } else {
      this._client.getPersonData().then((data) => {
        this.ntffPrintJson.caseName =
          data.person.lastName + ", " + data.person.firstName;
        this.ntffPrintJson.caseNumber = data.person.kaecses;
      });

      this._referral.getReferralData().then((data) => {
        this.ntffPrintJson.dateOfReferral = this._localValues.getDateandTimeWithExt(
          data.referral.referralDate
        );
      });
    }
  }

  fetchValuesForPrint() {
    this.ntffPrintJson.isHomeSafetyConcernsYes =
      this.ntff.homeSafetyConcerns_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isHomeSafetyConcernsNo =
      this.ntff.homeSafetyConcerns_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isHomeSafetyConcernsNA =
      this.ntff.homeSafetyConcerns_YesNoPendingID === "5" ? true : false;

    this.ntffPrintJson.isHomeCleanYes =
      this.ntff.homeIsClean_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isHomeCleanNo =
      this.ntff.homeIsClean_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isHomeCleanNA =
      this.ntff.homeIsClean_YesNoPendingID === "5" ? true : false;

    this.ntffPrintJson.isChildAppearHealthyYes =
      this.ntff.childAppearsHealthy_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isChildAppearHealthyNo =
      this.ntff.childAppearsHealthy_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isChildAppearHealthyNA =
      this.ntff.childAppearsHealthy_YesNoPendingID === "5" ? true : false;

    this.ntffPrintJson.isHeighWeightNormalYes =
      this.ntff.heightWeight_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isHeighWeightNormalNo =
      this.ntff.heightWeight_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isHeighWeightNormalNA =
      this.ntff.heightWeight_YesNoPendingID === "5" ? true : false;

    this.ntffPrintJson.isUnusualMarksYes =
      this.ntff.unusualMarks_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isUnusualMarksNo =
      this.ntff.unusualMarks_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isUnusualMarksNA =
      this.ntff.unusualMarks_YesNoPendingID === "5" ? true : false;
    this.ntffPrintJson.isVerified = this.ntff.isVerified;

    this.ntffPrintJson.isWeaponsObservedYes =
      this.ntff.weaponsObserv_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isWeaponsObservedNo =
      this.ntff.weaponsObserv_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isWeaponsObservedNA =
      this.ntff.weaponsObserv_YesNoPendingID === "5" ? true : false;

    this.ntffPrintJson.isSuicidalThoughtsYes =
      this.ntff.suicidalThoughts_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isSuicidalThoughtsNo =
      this.ntff.suicidalThoughts_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isSuicidalThoughtsNA =
      this.ntff.suicidalThoughts_YesNoPendingID === "5" ? true : false;

    this.ntffPrintJson.isViolentThoughtsYes =
      this.ntff.violentThoughts_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isViolentThoughtsNo =
      this.ntff.violentThoughts_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isViolentThoughtsNA =
      this.ntff.violentThoughts_YesNoPendingID === "5" ? true : false;

    this.ntffPrintJson.isCaregiverYes =
      this.ntff.caregiver_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isCaregiverNo =
      this.ntff.caregiver_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isCaregiverNA =
      this.ntff.caregiver_YesNoPendingID === "5" ? true : false;

    this.ntffPrintJson.isSafetyConcernsYes =
      this.ntff.safetyConcerns_YesNo === "1" ? true : false;
    this.ntffPrintJson.isSafetyConcernsNo =
      this.ntff.safetyConcerns_YesNo === "2" ? true : false;

    this.ntffPrintJson.isRiskHouseYes =
      this.ntff.riskHouse_YesNo === "1" ? true : false;
    this.ntffPrintJson.isRiskHouseNo =
      this.ntff.riskHouse_YesNo === "2" ? true : false;
    this.ntffPrintJson.isRiskHouseNA =
      this.ntff.riskHouse_YesNo === "5" ? true : false;

    this.ntffPrintJson.isRiskCaregiverYes =
      this.ntff.riskCaregiver_YesNo === "1" ? true : false;
    this.ntffPrintJson.isRiskCaregiverNo =
      this.ntff.riskCaregiver_YesNo === "2" ? true : false;

    this.ntffPrintJson.isRiskPhysicalYes =
      this.ntff.riskphysical_YesNo === "1" ? true : false;
    this.ntffPrintJson.isRiskPhysicalNo =
      this.ntff.riskphysical_YesNo === "2" ? true : false;

    this.ntffPrintJson.isRiskChildSpaceYes =
      this.ntff.riskChildSpace_YesNo === "1" ? true : false;
    this.ntffPrintJson.isRiskChildSpaceNo =
      this.ntff.riskChildSpace_YesNo === "2" ? true : false;

    this.ntffPrintJson.isRiskChildSelfHarmYes =
      this.ntff.riskChildSelfHarming_YesNo === "1" ? true : false;
    this.ntffPrintJson.isRiskChildSelfHarmNo =
      this.ntff.riskChildSelfHarming_YesNo === "2" ? true : false;
    this.ntffPrintJson.isRiskChildSelfHarmNA =
      this.ntff.riskChildSelfHarming_YesNo === "5" ? true : false;

    this.ntffPrintJson.isRiskChildAggressiveYes =
      this.ntff.riskChildAggressive_YesNo === "1" ? true : false;
    this.ntffPrintJson.isRiskChildAggressiveNo =
      this.ntff.riskChildAggressive_YesNo === "2" ? true : false;

    this.ntffPrintJson.isRiskIntensePlanYes =
      this.ntff.riskIntenseplan_YesNo === "1" ? true : false;
    this.ntffPrintJson.isRiskIntensePlanNo =
      this.ntff.riskIntenseplan_YesNo === "2" ? true : false;

    this.ntffPrintJson.isReviewCasePlanYes =
      this.ntff.reviewCasePlan_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isReviewCasePlanNo =
      this.ntff.reviewCasePlan_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isReviewCasePlanNA =
      this.ntff.reviewCasePlan_YesNoPendingID === "5" ? true : false;
    this.ntffPrintJson.isNonIntenseYes =
      this.ntff.nonIntense_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isNonIntenseNo =
      this.ntff.nonIntense_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isNonIntenseNA =
      this.ntff.nonIntense_YesNoPendingID === "5" ? true : false;
    this.ntffPrintJson.followUp = this.ntff.followUp;
    this.ntffPrintJson.riskComments = this.ntff.riskComments;
    this.ntffPrintJson.safetyNeeds = this.ntff.safetyNeeds;
    this.ntffPrintJson.isDevelopedReviewedYes =
      this.ntff.developedOrReviewed_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isDevelopedReviewedNo =
      this.ntff.developedOrReviewed_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isDevelopedReviewedNA =
      this.ntff.developedOrReviewed_YesNoPendingID === "5" ? true : false;
    this.ntffPrintJson.isChildHygieneYes =
      this.ntff.childHygieneAndDress_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isChildHygieneNo =
      this.ntff.childHygieneAndDress_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isChildHygieneNA =
      this.ntff.childHygieneAndDress_YesNoPendingID === "5" ? true : false;
    this.ntffPrintJson.isAdditionalRiskConcernYes =
      this.ntff.additionalRiskConcernVisited_YesNoPendingID === "1"
        ? true
        : false;
    this.ntffPrintJson.isAdditionalRiskConcernNo =
      this.ntff.additionalRiskConcernVisited_YesNoPendingID === "2"
        ? true
        : false;
    this.ntffPrintJson.planactivityDuringTheSession = this.ntff.planactivityDuringTheSession;
    this.ntffPrintJson.familySafetyPlan = this.ntff.familySafetyPlan;
    this.ntffPrintJson.safetyComments = this.ntff.safetyComments;
    this.ntffPrintJson.familyStrengthsAndResources = this.ntff.familyStrengthsAndResources;
  }

  fetchPrintData(data) {
    this.ntffPrintJson.startTime = this._localValues.getTimeAlongWithFormat(
      Date.parse(data.ntffBeginDate)
    );
    this.ntffPrintJson.endTime = this._localValues.getTimeAlongWithFormat(
      Date.parse(data.ntffEndDate)
    );
    this.ntffPrintJson.date = moment(Date.parse(data.ntffBeginDate)).format(
      "MM/DD/YYYY"
    );
    this.ntffPrintJson.duration =
      data.nontherapyFaceToFace.caseActivityID.units;
    this.ntffPrintJson.procode =
      data.nontherapyFaceToFace.caseActivityID.procodeID.procodeID;
    if (this.ntffPrintJson.procode === 147) {
      this.ntffPrintJson.isProcodeCaseSupervision = true;
    } else if (
      this.ntffPrintJson.procode === 106 ||
      this.ntffPrintJson.procode === 599
    ) {
      this.ntffPrintJson.isProcodeFamilySupportService = true;
    }

    this.ntffPrintJson.isCaregiverShowingYes =
      data.nontherapyFaceToFace.shwsings_YesNoPendingID === "1" ? true : false;
    this.ntffPrintJson.isCaregiverShowingNo =
      data.nontherapyFaceToFace.shwsings_YesNoPendingID === "2" ? true : false;
    this.ntffPrintJson.isCaregiverShowingNA =
      data.nontherapyFaceToFace.shwsings_YesNoPendingID === "5" ? true : false;
  }

  confirmationCheckBoxController(event: any) {
    if (event.statusTypeID == 4) {
      this.isConfirmationCheckBox = false;
    } else {
      this.ntff.isVerified = false;
      this.isConfirmationCheckBox = true;
    }
  }

  rowMethod(event) {
    if (!isNullOrUndefined(event)) {
      let singleNewLineCount = this._opencard.search_word(event, "\n");
      let doubleNewLineCount = this._opencard.search_word(event, "\n\n");
      return Math.ceil(
        event.length / 130 + (singleNewLineCount - doubleNewLineCount)
      );
    } else {
      return 3;
    }
  }

  getNTFFStatusList() {
    let req = { Object: "statusType", value: "" };
    this._opencard.getNTFFStatusType(req).then((data: any) => {
      this.NTFFStatusListData = data.dropDown;
    });
  }

  NTFFStatusTypeFillter(event: any) {
    this.fillteredNTFFStatus = [];
    this.NTFFStatusListData.filter((item: any) => {
      if (item.statusType.toLowerCase().indexOf(event.query) !== -1) {
        this.fillteredNTFFStatus.push(item);
      }
    });
  }

  navigateToCaseActivity() {
    let navigateURL: string, referralTypeId: number;
    referralTypeId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._opencard.getHasKey();
    if (referralTypeId !== 1) {
      navigateURL =
        "/reports/referral/family-preservation/case-activity/detail";
    } else {
      navigateURL = "/reintegration/referral/opencard/case-activity/detail";
    }
    this._router.navigate([navigateURL]);
  }

  ackChanges(event: any) {
    if (event) {
      this.ntff.isVerified = true;
    } else {
      this.ntff.isVerified = false;
    }
  }

  checkController() {
    if (
      this._router.url ==
        "/reports/referral/family-preservation/non-therapy-face-to-face/new" ||
      this._router.url ==
        "/reports/referral/family-preservation/case-activity/new"
    ) {
      this.isClientNextAppointmentDesc = true;
    }
  }

  checkBoxValidation(post: any, ntffReq: any) {
    if (this.ntff.statusTypeID === 4 && !this.ntff.isVerified) {
      this.getCaseActivityInfo();
      this.ntff.statusTypeID = { statusType: "Completed", statusTypeID: 4 };
      this.ntff.nextAppointmentDate = null;
      swal("Info", "Please fill all the information", "info");
    } else {
      if (post.caseAcitivityID !== null) {
        if (post.nonTherapyFaceToFaceID) {
          this.updateForm(ntffReq);
        } else {
          this.saveForm(ntffReq);
        }
      } else {
        return swal(
          "Record not found!",
          "For this record the case activity record is not found!",
          "info"
        );
      }
    }
  }

  additionalValidation() {
    if (this.ntff.isVerified && this.ntff.statusTypeID === 4) {
      this.isSplit = true;
    } else if (!this.ntff.isVerified && this.ntff.statusTypeID !== 4) {
      this.isSplit = true;
    }
    return this.isSplit;
  }

  clearDateFields(event: any, label: string) {
    event;
    switch (label) {
      case "beginDate":
        this.ntff.beginDate = null;
        break;
      case "endDate":
        this.ntff.endDate = null;
        break;
      case "nextAppointment":
        this.ntff.nextAppointmentDate = null;
        break;
    }
  }

  getFISMembers() {
    let currentReferralId: number,
      currentClientId: number,
      req = {};
    currentClientId =
      parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey();
    currentReferralId =
      parseInt(localStorage.getItem("referralId")) - this._opencard.getHasKey();
    req = {
      referralID: currentReferralId,
      clientID: currentClientId,
      beginPagination: 1,
      endPagination: 100,
    };
    this._opencard.getFISClientByreferralId(req).then((data: any) => {
      this.FISMemberDetails = data.ClientReferral;
    });
  }

  filteredFISMember(event: any) {
    this.filteredFISMembers = [];
    this.FISMemberDetails.filter((item: any) => {
      if (item.clientName.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredFISMembers.push(item);
      }
    });
  }
}
