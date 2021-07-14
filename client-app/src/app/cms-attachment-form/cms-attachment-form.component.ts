// angular utilities
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import * as moment from "moment";

// classes
import { CmsAttachment } from "./cms-attachment";

// services
import { ClildFormService } from "../child-forms/child-forms.service";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { TeamFormService } from "../team-form/team-form.service";
import { ClientReferralEventService } from "../client-referral-event-form/client-referral-event.service";
import { CaseTeamService } from "../case-team/case-team.service";
import { environment } from "../../environments/environment";
import { DonationService } from "../donation-master/donation.service";

// other utilities
import html2pdf from "html2pdf.js";
import swal from "sweetalert2";
import { LocalValues } from "../local-values";
import { CASEACTIVITYID, CLIENTID } from "../../constants/AppConstants";

@Component({
  selector: "app-cms-attachment-form",
  templateUrl: "./cms-attachment-form.component.html",
  styleUrls: ["./cms-attachment-form.component.scss"],
})
export class CmsAttachmentFormComponent implements OnInit {
  cmsAttachment: CmsAttachment = new CmsAttachment();
  cmsForm: FormGroup;
  metaData = [];
  cmsFormJson: any;
  formCisArrayValue: any;
  currentVersion: number;
  breadcrumbs = [];
  listViewUrl: any;
  discardTo: string;
  referralName: string;
  initiator = 0;
  openFormInitiator = 0;
  isEventAttachment = false;
  fileStream: any;
  isFileCreated = false;
  isUploadEnabled = false;
  isUploadViewEnabled = false;
  uploadFileUrl: any;
  fileType = "pdf";
  // isDownloadEnabled = false;
  isExistingDoc = false;
  isFileAdded = false;
  isDocumentTypeSelected = false;
  isFormsSelected = false;
  isFileUploadSelected = false;
  documentTypesArray = [];
  formsMetaData = [];
  searchValue = "";
  documentTypeSelection = "file upload selected";
  isFileSelected = false;
  isExistingRecordFound = false;
  staffName: any;
  docType: any;
  isUnusualIncident = false;
  env = environment;
  fileStorageToken = environment.SAS;
  filename: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  isNodeOpened = false;
  ////////////////////////////////////////////////////////////////////////
  isNtftfNode = false;
  isLackOfContact = false;
  isSupervisorStaff = false;
  isCftfContact = false;
  isCaseTransfer = false;
  isIcpcPps = false;
  isIcpc = false;
  isPps = false;

  ///////////////////Adoption
  isReqForCon = false;
  isAdopExcng = false;
  isIndRec = false;
  isReqSchBest = false;
  isBestStaff = false;
  isAdopCourt = false;

  ///////Move and Permanency
  isChildDisrupt = false;
  isPermanencyRel = false;
  isPlannedChg = false;
  isRespiteNot = false;
  isWaiver = false;

  ////Phase
  isFamilyRel = false;
  nonTrans = false;

  ///Family SAfety
  isFamSafety = false;

  //Supervisr staffing
  isSuperrCaseTrans = false;

  ///Supervisr Staff RFC
  isCaseTransferRFC = false;

  // Progress Notes
  isProgressNote = false;

  //Service Claims
  isFinanReq = false;

  //Referral Events
  isTherDisc = false;

  //Placement
  isSfcsEmp = false;

  //Independent Living
  isSelfSuff = false;
  isLifeSkill = false;
  isSelfMatric = false;

  //SFCS Office
  isDisabCons = false;

  //FP referral
  isPpsFp = false;

  // Case Plan Goals FP
  caseCustody = false;
  isIntroParent = false;
  isPpsPerman = false;
  isAdminReq = false;
  isVisitationScl = false;
  isPermPlanRev = false;
  isServices = false;
  isPerPlanCheck = false;
  familyPreServ = false;

  //case plan goals RFC
  isPerPlanCasePlan = false;
  isCasePlanNeed = false;
  isNoticeCasePlan = false;
  isVisitSceRfc = false;
  isParentChildInt = false;
  isFamSafetyReint = false;
  isKinVisPlan = false;
  isKyac = false;

  //Court Order FP
  isCourteRepCorr = false;
  isCourtRepFp = false;

  //Court Order RFC
  isAchPlan = false;
  isAddentum = false;
  isCourtRepRfc = false;
  isDDContact = false;
  isAllegedFather = false;
  isFatherUnknown = false;
  isFatherSedwick = false;
  isMatenalGrand = false;
  isMother = false;
  isPaternalGrand = false;
  isPointsOfServerance = false;
  isReintPlan = false;
  isRelinquish = false;
  isReviewHear = false;
  isVisitCourt = false;

  //Assessment FP
  initialFam = false;
  isMentalHealth = false;
  isProgRep = false;
  isFamSafetyPlan = false;
  isPlanOfSafe = false;
  isDomesticVio = false;
  isNonCus = false;
  isNonCusIced = false;
  isTreatPlan = false;
  isChangeOfStat = false;
  isProgrRepAssess = false;
  isAssessCheck = false;
  isEpds = false;
  isMissingChild = false;
  isTheDisAssess = false;
  isTreatPlanAssess = false;

  //Assessment RFC
  isDeptCheck = false;
  isCareGiveResp = false;
  isChildFam = false;
  isDecMakFuncAss = false;
  isHumanTrack = false;
  isIcwa = false;
  isInformCare = false;
  isInitPlacScreen = false;
  isIniScreenTool = false;
  isMatPatRel = false;
  isMedGenInfo = false;
  isMedFragTool = false;
  isRehService = false;
  isFamPreService = false;
  isKinAssess = false;
  isMentalHealthAssRfc = false;
  isSibSep = false;
  isSociHist = false;
  isSociEmoTol = false;
  isSuiRiskAssess = false;
  isWorkChild = false;
  isWorkParent = false;
  isXtremKin = false;
  isNewPacket = false;
  isPermPlanDeskRev = false;

  cmsFormName: string;
  cmsNode: string;
  isDetailsPage = false;
  isUploadView = false;
  referralTypeId =
    parseInt(localStorage.getItem("referralTypeId")) -
    this._openCards.getHasKey();
  currentRecordId: number;
  currentAuthorizationID: number;

  constructor(
    public DonationService: DonationService,
    public _caseTeam: CaseTeamService,
    public _team: TeamFormService,
    public _client: ClildFormService,
    public _referralEvent: ClientReferralEventService,
    public _fb: FormBuilder,
    public _router: Router,
    public _openCards: OpencardsService,
    public _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentRecordId = parseInt(
      this._activatedRoute.snapshot.queryParamMap.get("current_recId")
    ); //Current record id
    this.currentAuthorizationID = parseInt(
      this._activatedRoute.snapshot.queryParamMap.get("auth_id")
    ); //Current record id
    this.formValidation();
    this.UserInfoValidation();
    this.getMetaData("");
    this.fetchDocumentTypes("");
  }

  formValidation() {
    this.cmsForm = this._fb.group({
      documentType: [null],
      description: [null],
      sfcsNotes: [null],
      enteredBy: [null],
      changedBy: [null],
      documentTypeCatagory: [null],
    });
  }

  getMetaData(event) {
    let currentUrlCheck: string = this._router.url,
      currentURL: any;
    if (currentUrlCheck.includes("?")) {
      currentURL = this._router.url.split("?")[0];
    } else {
      currentURL = this._router.url;
    }
    if (!event.query) {
      event = {
        query: "",
      };
    }
    switch (currentURL) {
      case "/reports/attachment-document/assessment/new":
        this.formsMetaData = [
          { form: "Initial Family Assessment" },
          {
            form: "Mental Health Assessment completed by Therapist and Family",
          },
          { form: "Family Preservation Progress Report" },
          { form: "Family Safety Plan" },
          { form: "PPS2007 Plan of Safe Care" },
          { form: "Domestic Violence Screening Form" },
          { form: "Non-Custodial Parent Assessment" },
          { form: "NonCustodial Parent ICED Worksheet" },
          { form: "Treatment Plan Update" },
          { form: "Change of Status Form" },
          { form: "Progress Report" },
          { form: "Assessment Checklist Form" },
          { form: "Edinburgh Postnatal Depression Scale" },
          { form: "Missing Child Questionaire" },
          { form: "Therapy Discharge" },
          { form: "Treatment Plan Update - typed version" },
        ];
        console.log("after userinfo validation test assessment node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Assessment";
        this.discardTo = "/reports/attachment-document/assessment";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/assessment/detail":
        console.log("assessment node passed");
        this.cmsNode = "Assessment";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/assessment";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/case-plan-goals/new":
        this.formsMetaData = [
          { form: "Case Planning Documents:  Custody" },
          { form: "PPS3049 Introduction and Parent_s Guide" },
          { form: "PPS3051 Permanency Plan" },
          { form: "PPS3052 Administrative Requirements" },
          { form: "PPS3054 Visitation Schedule" },
          { form: "PPS3055 _Permanency Plan Review" },
          { form: "PPS3057 Service and Service Codes" },
          { form: "PPS3058 - Permanency Plan Checklist" },
          { form: "PPS3050 Family Service Preservation Plan" },
        ];
        console.log("case plan goals node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Case Plan Goals";
        this.discardTo = "/reports/attachment-document/case-plan-goals";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/case-plan-goals/detail":
        console.log("case plan goals node passed");
        this.cmsNode = "Case Plan Goals";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/case-plan-goals";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/family-safety/new":
        this.formsMetaData = [{ form: "Family Safety Plan Form" }];
        console.log("family-safety node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Family Safety";
        this.discardTo = "/reports/attachment-document/family-safety";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/family-safety/detail":
        console.log("family-safety node passed");
        this.cmsNode = "Family Safety";
        this.discardTo = "/reports/attachment-document/family-safety";
        this.referralName = "FP";
        this.getCmsJson();
        break;

      case "/reports/attachment-document/case-activity/new":
        this.formsMetaData = [
          { form: "Non-Therapy Face to Face Log" },
          { form: "Lack of Contact" },
          { form: "Family Presevation Supervisor Staffing" },
          { form: "Client Face to Face Contact Form" },
          { form: "PPS3005 Case Transfer Summary 7 1 17" },
          { form: "Progress Note" },
        ];
        console.log("case activity node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Case Activity";
        this.discardTo = "/reports/attachment-document/case-activity";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/case-activity/detail":
        console.log("case activity node detail passed");
        this.cmsNode = "Case Activity";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/case-activity";
        if (this.referralTypeId == 9) {
          this.referralName = "NC-OPS";
        }
        if (this.referralTypeId == 2) {
          this.referralName = "FP";
        }
        if (this.referralTypeId == 1) {
          this.referralName = "RFC";
        }
        if (this.referralTypeId == 7) {
          this.referralName = "NC-RFC";
        }

        break;

      case "/reports/attachment-document/supervisor-staffing/new":
        this.formsMetaData = [{ form: "Case Transfer Summary" }];
        console.log("supervisor staff node passed");
        this.dropdownValidation(event.query);
        this.discardTo = "/reports/attachment-document/supervisor-staffing";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/court-orders/new":
        this.formsMetaData = [
          { form: "Court Report" },
          { form: "Court Report Corespondence Cover Sheet" },
        ];
        console.log("court-orders node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Court Orders";
        this.discardTo = "/reports/attachment-document/court-orders";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/court-orders/detail":
        console.log("court-orders node passed");
        this.cmsNode = "Court Orders";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/court-orders";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/service-hardgoods/new":
        this.formsMetaData = [{ form: "Financial Assistance Request Form" }];
        console.log("service-hardgoods node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Service Hardgoods";
        this.discardTo = "/reports/attachment-document/service-hardgoods";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/service-hardgoods/detail":
        console.log("service-hardgoods node passed");
        this.cmsNode = "Service Hardgoods";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/service-hardgoods";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/rfc/rfc-authorizations/new":
        this.formsMetaData = [{ form: "Financial Assistance Request Form" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Auth";
        this.discardTo = "/reports/attachment-document/rfc/rfc-authorizations";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/rfc-authorizations/detail":
        this.cmsNode = "Auth";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/rfc-authorizations";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/rfc-claims/new":
        this.formsMetaData = [{ form: "Financial Assistance Request Form" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "DA Claims";
        this.discardTo = "/reports/attachment-document/rfc/rfc-claims";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/rfc-claims/detail":
        this.cmsNode = "DA Claims";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/rfc-claims";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/referral-events/new":
        this.formsMetaData = [{ form: "Therapy Discharge" }];
        console.log("referral events node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Referral Events";
        this.discardTo = "/reports/attachment-document/referral-events";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/referral-events/detail":
        console.log("referral events node passed");
        this.cmsNode = "Referral Events";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/referral-events";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/fp-referral/new":
        this.formsMetaData = [
          { form: "PPS5002" },
          { form: "2030-B – Safety Assessment – Abuse/Neglect Referral" },
          {
            form: "2030-C – Risk Assessment (short form) 2030-D – Risk Assessment – Abuse/Neglect Referral",
          },
          {
            form: "2030-E – CINC/NAN Assessment (Child in Need of Care – Non Abuse or Neglect)",
          },
          { form: "2030-F – Family Based Assessment Summary Report" },
          { form: "CFS 1000 – DCF Face Sheet, DCF History" },
          { form: "Due Date Reminder" },
          { form: "FACTS Information from DCF" },
          { form: "Initial Family Assessment" },
          { form: "PPS 5000 – Family Preservation Referral and Transmittal" },
          { form: "Referral Checklist, Email Correspondence" },
          { form: "Heads up OOH, PPS 5001 NCCP" },
          { form: "PPS 5002 Request for Retraction" },
          { form: "PPS 5110 – Initial Referral to Out of Home Placement" },
        ];
        console.log("Fp referral node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Referral";
        this.discardTo = "/reports/attachment-document/fp-referral";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/fp-referral/detail":
        console.log("Fp referral node passed");
        this.cmsNode = "Referral";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/fp-referral";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/case-team/new":
        console.log("case-team node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Case Team";
        this.discardTo = "/reports/attachment-document/case-team";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/case-team/detail":
        console.log("case-team node passed");
        this.cmsNode = "Case Team";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/case-team";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/extended-family/new":
        console.log("extended-family node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Extended Family";
        this.discardTo = "/reports/attachment-document/extended-family";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/extended-family/detail":
        console.log("extended-family node passed");
        this.cmsNode = "Extended Family";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/extended-family";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/home-county/new":
        console.log("home-county node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Home County";
        this.discardTo = "/reports/attachment-document/home-county";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/home-county/detail":
        console.log("home-county node passed");
        this.cmsNode = "Home County";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/home-county";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/sfcs-office/new":
        console.log("sfcs-office node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "SFM Office";
        this.discardTo = "/reports/attachment-document/sfcs-office";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/sfcs-office/detail":
        console.log("sfcs-office node passed");
        this.cmsNode = "SFM Office";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/sfcs-office";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/non-therapy/new":
        console.log("non-therapy node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Non Therapy";
        this.discardTo = "/reports/attachment-document/non-therapy";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/non-therapy/detail":
        console.log("non-therapy node passed");
        this.cmsNode = "Non Therapy";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/non-therapy";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/phase/new":
        console.log("phase node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Phase";
        this.discardTo = "/reports/attachment-document/phase";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/phase/detail":
        console.log("phase node passed");
        this.cmsNode = "Phase";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/phase";
        this.referralName = "FP";
        break;
      case "/reports/attachment-document/progress-notes/new":
        console.log("progress-notes node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Progress Notes";
        this.discardTo = "/reports/attachment-document/progress-notes";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/progress-notes/detail":
        console.log("progress-notes node passed");
        this.cmsNode = "Progress Notes";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/progress-notes";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/case-evaluation/new":
        console.log("case-evaluation node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Case Evaluation";
        this.discardTo = "/reports/attachment-document/case-evaluation";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/case-evaluation/detail":
        console.log("case-evaluation node passed");
        this.cmsNode = "Case Evaluation";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/case-evaluation";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/progress-notes-diagnosis/new":
        console.log("progress-notes-diagnosis node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Progress Notes Diagnosis";
        this.discardTo =
          "/reports/attachment-document/progress-notes-diagnosis";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/progress-notes-diagnosis/detail":
        console.log("progress-notes-diagnosis node passed");
        this.cmsNode = "Progress Notes Diagnosis";
        this.getCmsJson();
        this.discardTo =
          "/reports/attachment-document/progress-notes-diagnosis";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/kipp-pmto/new":
        console.log("kipp-pmto node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Kipp Pmto";
        this.discardTo = "/reports/attachment-document/kipp-pmto";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/kipp-pmto/detail":
        console.log("kipp-pmto node passed");
        this.cmsNode = "Kipp Pmto";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/kipp-pmto";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/fis-members/new":
        console.log("fis-members node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Fis Members";
        this.discardTo = "/reports/attachment-document/fis-members";
        this.referralName = "FP";
        break;

      case "/reports/attachment-document/fis-members/detail":
        console.log("fis-members node passed");
        this.cmsNode = "Fis Members";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/fis-members";
        this.referralName = "FP";
        break;

      ///////RFC Referral Nodes//////////
      case "/reports/attachment-document/rfc/case-plan-goals/new":
        this.formsMetaData = [
          { form: "Permanency Plan (Case Plan)" },
          { form: "Request for Case Plan Needing Scheduled" },
          { form: "Notice of Case Planning Conference" },
          { form: "Visitation Schedule" },
          { form: "Parent/Child Visitation Schedule" },
          { form: "Family Safety Plan" },
          { form: "Kinship Visitation Plan" },
          { form: "KYAC Monthly Individual Contact Form (PPS 3061)" },
        ];
        console.log("rfc case plan goals node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Case Plan Goals";
        this.discardTo = "/reports/attachment-document/rfc/case-plan-goals";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/case-plan-goals/detail":
        console.log("rfc case plan goals node passed");
        this.cmsNode = "Case Plan Goals";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/case-plan-goals";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/court-orders/new":
        this.formsMetaData = [
          { form: "Achievement Plan - Sedgwick County Only" },
          { form: "Addendum Court Report Template" },
          { form: "Court Report" },
          { form: "DD Contact Sheet 15 - Sedgwick County Only" },
          { form: "DD Report (Alleged Father) - Sedgwick County Only" },
          { form: "DD Report (Father Unknown) - Sedgwick County Only" },
          { form: "DD Report (Father) - Sedgwick County Only" },
          { form: "DD Report (Maternal Grandparent) - Sedgwick County Only" },
          { form: "DD Report (Mother) - Sedgwick County Only" },
          { form: "DD Report (Paternal Grandparent) - Sedgwick County Only" },
          { form: "Points of Severance" },
          { form: "Reintegration Plan-Sedgwick County" },
          { form: "Relinquishment of Minor Child to Agency Appendix 5J" },
          { form: "Review Hearing Exhibit List - Sedgwick County Only" },
          { form: "Visitation Court Report - Sedgwick County Only" },
        ];
        console.log("rfc court order node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Court Orders";
        this.discardTo = "/reports/attachment-document/rfc/court-orders";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/court-orders/detail":
        console.log("rfc court order node passed");
        this.cmsNode = "Court Orders";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/court-orders";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/supervisory-staffing/detail":
        console.log("rfc supervisor-staffing node passed");
        this.cmsNode = "Supervisory Staffing Attchment";
        this.getCmsJson();
        this.discardTo =
          "/reports/attachment-document/rfc/supervisory-staffing";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/supervisory-staffing/new":
        this.formsMetaData = [{ form: "Others" }];
        console.log("rfc supervisor staffing node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Supervisory Staffing Attchment";
        this.discardTo =
          "/reports/attachment-document/rfc/supervisory-staffing";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/placement/new":
        this.formsMetaData = [
          { form: "SFCS Employee as Resource Parent Administrative Review" },
        ];
        console.log("rfc placement node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Placement";
        this.discardTo = "/reports/attachment-document/rfc/placement";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/placement/detail":
        console.log("rfc placement node passed");
        this.cmsNode = "Placement";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/placement";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/assessment/new":
        this.formsMetaData = [
          { form: "Blue Book Departure Chklst" },
          { form: "Caregiver Response Tool" },
          { form: "Child and Family Profile (NCFAS)" },
          { form: "Decision Making and Functional Assessment" },
          { form: "Human Trafficking Child Welfare Initial Assessment" },
          { form: "ICWA_Genealogical_Information_Form_2015" },
          { form: "Informal Care Referral" },
          { form: "Initial Placement Screening Tool" },
          { form: "Initial Screening Tool" },
          { form: "Maternal and Paternal Kinship Form" },
          { form: "Medical and Genetic Info for Child (PPS 5340)" },
          { form: "Medically Fragile Screening Tool" },
          { form: "Rehabilitation Services Referral" },
          { form: "Request for Family Pres Services" },
          { form: "Request for Kinship Assessment Services" },
          { form: "Request for Mental Health Reports" },
          { form: "Sibling Seperation Staffing (PPS 5146)" },
          { form: "Social History" },
          { form: "Social-Emotional Screening Tool Appendix 3L" },
          { form: "Suicide Risk Assessment - Family with Precaution" },
          { form: "Worker-Child Quality Checklist" },
          { form: "Worker-Parent Quality Checklist" },
          { form: "Xtreme Kinship Recruitment Referral" },
          { form: "New Referral Check list 10.20.17" },
          { form: "PPS3056 Permanency PLan Desk Review" },
        ];
        console.log("rfc court aaaa node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Assessment";
        this.discardTo = "/reports/attachment-document/rfc/assessment";
        this.referralName = "RFC";
        break;
      // { form: "Lifebook" },
      case "/reports/attachment-document/rfc/assessment/detail":
        console.log("rfc court aaaa node passed");
        this.cmsNode = "Assessment";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/assessment";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/independent-living/new":
        this.formsMetaData = [
          { form: "Transition Plan For Successful Adulthood" },
          { form: "LifeSkill Assessment" },
          { form: "Self Sufficiency Matrix" },
        ];
        console.log("rfc assessment node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Independent Living";
        this.discardTo = "/reports/attachment-document/rfc/independent-living";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/independent-living/detail":
        console.log("rfc assessment node passed");
        this.cmsNode = "Independent Living";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/independent-living";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/adoption-event/new":
        this.formsMetaData = [
          { form: "Request For Consent To Adopt" },
          { form: "Adoption Exchange Child Status Update PPS 5315" },
          { form: "Individual Recruitment Plan" },
          { form: "Request to Schedule Best Interest Staffing" },
          { form: "Notice of Best Interest Staffing" },
        ];
        console.log("rfc adoption Event node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Adoption Event";
        this.discardTo = "/reports/attachment-document/rfc/adoption-event";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/adoption-event/detail":
        console.log("rfc adoption node passed");
        this.cmsNode = "Adoption Event";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/adoption-event";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/bis/new":
        this.formsMetaData = [
          { form: "Notice of Best Interest Staffing" },
          { form: "Request to Schedule Best Interest Staffing" },
        ];
        console.log("rfc bis node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "BIS";
        this.discardTo = "/reports/attachment-document/rfc/bis";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/bis/detail":
        console.log("rfc adoption node passed");
        this.cmsNode = "BIS";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/bis";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/permanency/new":
        this.formsMetaData = [
          { form: "Child Move Form with Disruption" },
          { form: "Permanency Release or Change of Status Form" },
          { form: "Planned Change of Placement Notice" },
          { form: "Respite Request" },
          { form: "Waiver of a 30 Day Notice of Planned Move" },
        ];
        console.log("rfc permancency node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Permanency";
        this.discardTo = "/reports/attachment-document/rfc/permanency";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/permanency/detail":
        console.log("rfc permancency node passed");
        this.cmsNode = "Permanency";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/permanency";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/case-activity/new":
        this.formsMetaData = [
          { form: "100 B PPS 9135 - ICPC" },
          { form: "ICPC Referral Check List" },
          { form: "PPS 9145" },
        ];
        console.log("rfc case activity node passed");
        this.dropdownValidation(event.query);
        this.cmsNode = "Case Activity";
        this.discardTo = "/reports/attachment-document/rfc/case-activity";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/case-activity/detail":
        console.log("rfc case activity node passed");
        this.cmsNode = "Case Activity";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/case-activity";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/monthly-reports/new":
        console.log("rfc monthly-reports node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Monthly Reports";
        // this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/monthly-reports";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/monthly-reports/detail":
        console.log("rfc monthly-reports node passed");
        this.cmsNode = "Monthly Reports";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/monthly-reports";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/referral/new":
        console.log("rfc/referral node passed");
        this.formsMetaData = [{ form: "Others" }, { form: "DCF History" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "RFC Referral";
        // this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/referral";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/referral/detail":
        console.log("rfc/referral node passed");
        this.cmsNode = "RFC Referral";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/referral";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/appointments/new":
        console.log("rfc/appointments node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Appointment";
        // this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/appointments";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/appointments/detail":
        console.log("rfc/appointments node passed");
        this.cmsNode = "Appointment";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/appointments";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/case-evaluation/new":
        console.log("rfc/case-evaluation node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Case Evaluation";
        // this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/case-evaluation";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/case-evaluation/detail":
        console.log("rfc/case-evaluation node passed");
        this.cmsNode = "Case Evaluation";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/case-evaluation";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/case-file-activity/new":
        console.log("rfc/case-file-activity node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Case File Activity";
        // this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/case-file-activity";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/case-file-activity/detail":
        console.log("rfc/case-file-activity node passed");
        this.cmsNode = "Case File Activity";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/case-file-activity";
        if (this.referralTypeId == 9) {
          this.referralName = "NC-OPS";
        }
        if (this.referralTypeId == 2) {
          this.referralName = "FP";
        }
        if (this.referralTypeId == 1) {
          this.referralName = "RFC";
        }
        if (this.referralTypeId == 7) {
          this.referralName = "NC-RFC";
        }
        break;

      case "/reports/attachment-document/rfc/case-team/new":
        console.log("case-team rfc node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Case Team";
        this.discardTo = "/reports/attachment-document/rfc/case-team";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/case-team/detail":
        console.log("case-team node passed");
        this.cmsNode = "Case Team";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/case-team";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/home-county/new":
        console.log("rfc home-county node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Home County";
        this.discardTo = "/reports/attachment-document/rfc/home-county";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/home-county/detail":
        console.log("rfc home-county node passed");
        this.cmsNode = "Home County";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/home-county";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/kipp-pmto/new":
        console.log("rfc Kipp node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Kipp Pmto";
        this.discardTo = "/reports/attachment-document/rfc/kipp-pmto";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/kipp-pmto/detail":
        console.log("rfc Kipp  node passed");
        this.cmsNode = "Kipp Pmto";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/kipp-pmto";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/waiver/new":
        console.log("rfc waiver node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Waiver";
        this.discardTo = "/reports/attachment-document/rfc/waiver";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/waiver/detail":
        console.log("rfc waiver  node passed");
        this.cmsNode = "Waiver";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/waiver";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/sfcs-office/new":
        console.log("rfc sfcs-office node passed");
        this.formsMetaData = [
          { form: "Others" },
          { form: "Disability Consultation IS-3122_KLS_Referral_Form_11-09" },
        ];
        this.dropdownValidation(event.query);
        this.cmsNode = "SFM Office";
        this.discardTo = "/reports/attachment-document/rfc/sfcs-office";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/sfcs-office/detail":
        console.log("rfc sfcs-office  node passed");
        this.cmsNode = "SFM Office";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/sfcs-office";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/social-security-income/new":
        console.log("rfc social-security-income node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Social Security Income";
        this.discardTo =
          "/reports/attachment-document/rfc/social-security-income";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/social-security-income/detail":
        console.log("rfc social-security-income  node passed");
        this.cmsNode = "Social Security Income";
        this.getCmsJson();
        this.discardTo =
          "/reports/attachment-document/rfc/social-security-income";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/behavioral-assessment/new":
        console.log("rfc behavioral-assessment node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Behavioral Assessment";
        this.discardTo =
          "/reports/attachment-document/rfc/behavioral-assessment";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/behavioral-assessment/detail":
        console.log("rfc behavioral-assessment  node passed");
        this.cmsNode = "Behavioral Assessment";
        this.getCmsJson();
        this.discardTo =
          "/reports/attachment-document/rfc/behavioral-assessment";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/authorization-summary/new":
        console.log("rfc authorization-summary node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Authorization Summary";
        this.discardTo =
          "/reports/attachment-document/rfc/authorization-summary";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/authorization-summary/detail":
        console.log("rfc authorization-summary  node passed");
        this.cmsNode = "Authorization Summary";
        this.getCmsJson();
        this.discardTo =
          "/reports/attachment-document/rfc/authorization-summary";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/credit-tracking/new":
        console.log("rfc credit-tracking node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Credit Tracking";
        this.discardTo = "/reports/attachment-document/rfc/credit-tracking";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/credit-tracking/detail":
        console.log("rfc credit-tracking  node passed");
        this.cmsNode = "Credit Tracking";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/credit-tracking";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/education-enrollment/new":
        console.log("rfc education-enrollment node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Education Enrollment";
        this.discardTo =
          "/reports/attachment-document/rfc/education-enrollment";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/education-enrollment/detail":
        console.log("rfc education-enrollment  node passed");
        this.cmsNode = "Education Enrollment";
        this.getCmsJson();
        this.discardTo =
          "/reports/attachment-document/rfc/education-enrollment";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/general-education/new":
        console.log("rfc general-education node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "General Education";
        this.discardTo = "/reports/attachment-document/rfc/general-education";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/general-education/detail":
        console.log("rfc general-education  node passed");
        this.cmsNode = "General Education";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/general-education";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/special-education/new":
        console.log("rfc special-education node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Special Education";
        this.discardTo = "/reports/attachment-document/rfc/special-education";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/special-education/detail":
        console.log("rfc special-education  node passed");
        this.cmsNode = "Special Education";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/special-education";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/attending-school/new":
        console.log("rfc attending-school node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Attending School";
        this.discardTo = "/reports/attachment-document/rfc/attending-school";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/attending-school/detail":
        console.log("rfc attending-school  node passed");
        this.cmsNode = "Attending School";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/attending-school";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/grade-level/new":
        console.log("rfc grade-level node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Grade Level";
        this.discardTo = "/reports/attachment-document/rfc/grade-level";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/grade-level/detail":
        console.log("rfc grade-level node passed");
        this.cmsNode = "Grade Level";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/grade-level";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/school-release/new":
        console.log("rfc school-release node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "School Release";
        this.discardTo = "/reports/attachment-document/rfc/school-release";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/school-release/detail":
        console.log("rfc school-release node passed");
        this.cmsNode = "School Release";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/school-release";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/home-school/new":
        console.log("rfc home-school node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Home School";
        this.discardTo = "/reports/attachment-document/rfc/home-school";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/home-school/detail":
        console.log("rfc home-school node passed");
        this.cmsNode = "Home School";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/home-school";
        this.referralName = "RFC";
        break;

      // client nodes

      case "/reports/attachment-document/client/medication/new":
        console.log("rfc medication node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Medication";
        this.discardTo = "/reports/attachment-document/client/medication";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/client/medication/detail":
        console.log("rfc medication node passed");
        this.cmsNode = "Medication";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/client/medication";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/client/client-profiles/new":
        console.log("rfc client-profiles node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Client Profiles";
        this.discardTo = "/reports/attachment-document/client/client-profiles";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/client/client-profiles/detail":
        console.log("rfc client-profiles node passed");
        this.cmsNode = "Client Profiles";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/client/client-profiles";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/client/court-case/new":
        console.log("rfc court-case node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Client Court Case";
        this.discardTo = "/reports/attachment-document/client/court-case";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/client/court-case/detail":
        console.log("court-case node passed");
        this.cmsNode = "Client Court Case";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/client/court-case";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/client/third-party-liability/new":
        console.log("rfc third-party-liability node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Third Party Liability";
        this.discardTo =
          "/reports/attachment-document/client/third-party-liability";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/client/third-party-liability/detail":
        console.log("third-party-liability node passed");
        this.cmsNode = "Third Party Liability";
        this.getCmsJson();
        this.discardTo =
          "/reports/attachment-document/client/third-party-liability";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/client/preventive-measurements/new":
        console.log("rfc preventive-measurements node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Preventive Measurements";
        this.discardTo =
          "/reports/attachment-document/client/preventive-measurements";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/client/preventive-measurements/detail":
        console.log("preventive-measurements node passed");
        this.cmsNode = "Preventive Measurements";
        this.getCmsJson();
        this.discardTo =
          "/reports/attachment-document/client/preventive-measurements";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/client/unusual-incident/new":
        console.log("rfc Unusual Incident node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Unusual Incident";
        this.discardTo = "/reports/attachment-document/client/unusual-incident";
        this.referralName = "RFC";
        this.isUnusualIncident = true;
        break;

      case "/reports/attachment-document/client/unusual-incident/detail":
        console.log("Unusual Incident node passed");
        this.cmsNode = "Unusual Incident";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/client/unusual-incident";
        this.referralName = "RFC";
        break;

      case "/reports/client/documents/new":
        console.log("client document node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Attached Documents";
        this.discardTo = "/reports/client/documents";
        this.referralName = "RFC";
        break;

      case "/reports/client/documents/detail":
        console.log("client document node passed");
        this.cmsNode = "Attached Documents";
        this.getCmsJson();
        this.discardTo = "/reports/client/documents";
        // this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/sibilings-in-out-home/new":
        console.log("client document node passed");
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Siblings In Out Home";
        this.discardTo = "/reports/client/documents";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/sibilings-in-out-home/detail":
        console.log("client document node passed");
        this.cmsNode = "Siblings In Out Home";
        this.getCmsJson();
        this.discardTo = "/reports/client/documents";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/bh-determination/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "BH Determination";
        this.getCmsJson();
        this.discardTo = "/reports/client/documents";
        this.referralName = "RFC";
        this.breadcrumbs.splice(2, 2, [
          {
            label: "BH Determination Form",
            href: "/reintegration/referral/opencard/bh-determination/detail",
          },
        ]);
        break;

      case "/reports/attachment-document/rfc/bh-determination/new":
        this.metaData = [{ form: "Others" }];
        this.cmsNode = "BH Determination";
        this.discardTo = "/reports/client/documents";
        this.referralName = "RFC";
        // this.breadcrumbs.splice(2,2,{ label: 'BH Determination Form', href: '/reintegration/referral/opencard/bh-determination/detail'});
        break;

      case "/reports/attachment-document/rfc/bh-determination/detail":
        this.cmsNode = "BH Determination";
        this.getCmsJson();
        this.discardTo = "/reports/client/documents";
        this.referralName = "RFC";
        // this.breadcrumbs.splice(2,2,[{ label: 'BH Determination Form', href: '/reintegration/referral/opencard/bh-determination/detail'}]);
        break;

      case "/reports/attachment-document/rfc/health-record/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Health Record";
        this.discardTo = "/reports/client/documents";
        this.referralName = "RFC";
        // this.breadcrumbs.splice(2,2,{ label: 'BH Determination Form', href: '/reintegration/referral/opencard/bh-determination/detail'});
        break;

      case "/reports/attachment-document/rfc/health-record/detail":
        this.cmsNode = "Health Record";
        this.getCmsJson();
        this.discardTo = "/reports/client/documents";
        this.referralName = "RFC";
        // this.breadcrumbs.splice(2,2,[{ label: 'BH Determination Form', href: '/reintegration/referral/opencard/bh-determination/detail'}]);
        break;

      case "/reports/attachment-document/rfc/immunization/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Immunization";
        this.discardTo = "/reports/client/documents";
        this.referralName = "RFC";
        // this.breadcrumbs.splice(2,2,{ label: 'BH Determination Form', href: '/reintegration/referral/opencard/bh-determination/detail'});
        break;

      case "/reports/attachment-document/rfc/immunization/detail":
        this.cmsNode = "Immunization";
        this.getCmsJson();
        this.discardTo = "/reports/client/documents";
        this.referralName = "RFC";
        // this.breadcrumbs.splice(2,2,[{ label: 'BH Determination Form', href: '/reintegration/referral/opencard/bh-determination/detail'}]);
        break;

      case "/reports/attachment-document/rfc/kan-be-healthy/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "kan-be-healthy";
        this.discardTo = "/reports/client/documents";
        this.referralName = "RFC";
        // this.breadcrumbs.splice(2,2,{ label: 'BH Determination Form', href: '/reintegration/referral/opencard/bh-determination/detail'});
        break;

      case "/reports/attachment-document/rfc/kan-be-healthy/detail":
        this.cmsNode = "kan-be-healthy";
        this.getCmsJson();
        this.discardTo = "/reports/client/documents";
        this.referralName = "RFC";
        // this.breadcrumbs.splice(2,2,[{ label: 'BH Determination Form', href: '/reintegration/referral/opencard/bh-determination/detail'}]);
        break;

      // Providers

      case "/reports/attachment-document/nc-ops/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Referral NC-OPS";
        this.discardTo = "/reports/attachment-document/providers/school";
        this.referralName = "NC-OPS";
        break;

      case "/reports/attachment-document/nc-ops/detail":
        this.cmsNode = "Referral NC-OPS";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/providers/school";
        this.referralName = "NC-OPS";
        break;

      case "/reports/attachment-document/providers/location/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Location";
        this.discardTo = "/reports/attachment-document/providers/location";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/location/detail":
        this.cmsNode = "Location";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/providers/location";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/pets/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Pets";
        this.discardTo = "/reports/attachment-document/providers/pets";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/pets/detail":
        this.cmsNode = "Pets";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/providers/pets";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/license/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "License";
        this.discardTo = "/reports/attachment-document/providers/license";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/license/detail":
        this.cmsNode = "License";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/providers/license";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/license-exception/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "License Exception";
        this.discardTo =
          "/reports/attachment-document/providers/license-exception";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/license-exception/detail":
        this.cmsNode = "License Exception";
        this.getCmsJson();
        this.discardTo =
          "/reports/attachment-document/providers/license-exception";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/sponsor/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Sponsor";
        this.discardTo = "/reports/attachment-document/providers/sponsor";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/sponsor/detail":
        this.cmsNode = "Sponsor";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/providers/sponsor";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/status/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Status";
        this.discardTo = "/reports/attachment-document/providers/status";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/status/detail":
        this.cmsNode = "Status";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/providers/status";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/office/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Provider SFM Office";
        this.discardTo = "/reports/attachment-document/providers/office";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/office/detail":
        this.cmsNode = "Provider SFM Office";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/providers/office";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/sfm-staff/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Provider SFM Staff";
        this.discardTo = "/reports/attachment-document/providers/sfm-staff";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/sfm-staff/detail":
        this.cmsNode = "Provider SFM Staff";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/providers/sfm-staff";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/preference/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Preference";
        this.discardTo = "/reports/attachment-document/providers/preference";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/preference/detail":
        this.cmsNode = "Preference";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/providers/preference";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/other-agency-staff/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Other Agency Staff";
        this.discardTo =
          "/reports/attachment-document/providers/other-agency-staff";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/other-agency-staff/detail":
        this.cmsNode = "Other Agency Staff";
        this.getCmsJson();
        this.discardTo =
          "/reports/attachment-document/providers/other-agency-staff";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/school/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Provider School";
        this.discardTo = "/reports/attachment-document/providers/school";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/school/detail":
        this.cmsNode = "Provider School";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/providers/school";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/nc-fch/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Referral NC-FCH";
        this.discardTo = "/reports/referral/nc-ops/detail";
        this.referralName = "NC-OPS";
        break;

      case "/reports/attachment-document/nc-fch/detail":
        this.cmsNode = "Referral NC-FCH";
        this.getCmsJson();
        this.discardTo = "/reports/nc-fch/detail";
        this.referralName = "NC-OPS";
        break;

      case "/reports/attachment-document/providers/unusual-incident/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Unusual Incident";
        this.discardTo =
          "/reports/attachment-document/providers/unusual-incident";
        this.referralName = "PROVIDERS";
        break;

      case "/reports/attachment-document/providers/unusual-incident/detail":
        this.cmsNode = "Unusual Incident";
        this.getCmsJson();
        this.discardTo =
          "/reports/attachment-document/providers/unusual-incident";
        this.referralName = "PROVIDERS";
        break;
      //
      case "/reports/attachment-document/claims/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Claims";
        this.discardTo = "/reports/attachment-document/claims";
        this.referralName = "CLAIMS";
        break;

      case "/reports/attachment-document/claims/detail":
        this.cmsNode = "Claims";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/claims";
        this.referralName = "CLAIMS";
        break;

      case "/reports/attachment-document/nc-rfc-attachment/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Referral NC-RFC";
        this.discardTo = "/reports/nc-rfc/detail";
        this.referralName = "NC-RFC";
        break;

      case "/reports/attachment-document/nc-rfc-attachment/detail":
        this.cmsNode = "Referral NC-RFC";
        this.getCmsJson();
        this.discardTo = "/reports/nc-rfc/detail";
        this.referralName = "NC-RFC";
        break;

      case "/reports/attachment-document/living-arrangement-attachment/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Living Arrangement";
        this.discardTo =
          "/reintegration/referral/opencard/placement/living-arrangement/detail";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/living-arrangement-attachment/detail":
        this.cmsNode = "Living Arrangement";
        this.getCmsJson();
        this.discardTo =
          "/reintegration/referral/opencard/placement/living-arrangement/detail";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/placement-auth-attachment/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Placement Authorizations Attachment";
        this.discardTo =
          "/reintegration/referral/placement-authorizations/detail";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/placement-auth-attachment/detail":
        this.cmsNode = "Placement Authorizations Attachment";
        this.getCmsJson();
        this.discardTo =
          "/reintegration/referral/placement-authorizations/detail";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/placement-event/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Placement Event";
        this.discardTo = "/reports/attachment-document/rfc/placement-event";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/placement-event/detail":
        this.cmsNode = "Placement Event";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/placement-event";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/placement-plan/new":
        this.formsMetaData = [{ form: "Others" }];
        this.dropdownValidation(event.query);
        this.cmsNode = "Placement Plan";
        this.discardTo = "/reports/attachment-document/rfc/placement-plan";
        this.referralName = "RFC";
        break;

      case "/reports/attachment-document/rfc/placement-plan/detail":
        this.cmsNode = "Placement Plan";
        this.getCmsJson();
        this.discardTo = "/reports/attachment-document/rfc/placement-plan";
        this.referralName = "RFC";
        break;

      default:
        this.metaData = [];
    }

    if (this.initiator === 0) {
      this.initiator = this.initiator + 1;
      if (this.referralName == "RFC") {
        this.breadcrumbs.push(
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          {
            label: "Case Form",
            href: "/reintegration/referral/detail",
            active: "",
          }
        );
        this.checkCmsNodesForBreadcrums();
      } else if (this.referralName == "FP") {
        this.breadcrumbs.push(
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          {
            label: "Case Form",
            href: "/reports/referral/family-preservation/detail",
            active: "",
          }
        );
        this.checkCmsNodesForBreadcrums();
      } else if (this.referralName == "NC-OPS") {
        this.breadcrumbs.push(
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          {
            label: "Case Form",
            href: "/reports/referral/nc-ops/detail",
            active: "",
          }
        );
        this.checkCmsNodesForBreadcrums();
      } else if (this.referralName == "PROVIDERS") {
        this.breadcrumbs.push(
          {
            label: "Provider List",
            href: "/reports/provider/view",
            active: "",
          },
          {
            label: "Provider Form",
            href: "/reports/provider/detail",
            active: "",
          }
        );
        this.checkCmsNodesForBreadcrums();
      } else if (this.referralName == "NC-RFC") {
        this.breadcrumbs.push(
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          { label: "Case Form", href: "/reports/nc-rfc/detail", active: "" }
        );
        this.checkCmsNodesForBreadcrums();
      } else {
        this.breadcrumbs.push(
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          { label: "Attachment Document", active: "active" }
        );
      }
    }
  }

  openAssessment(formName) {
    this.cmsAttachment.description = formName.form;
    this.cmsFormName = formName.form;
    let url: any;
    this.breadcrumbs.pop();

    if (this.openFormInitiator > 0 && this.isEventAttachment == false) {
      this.breadcrumbs.pop();
    }

    this.breadcrumbs.push(
      { label: "Attachment Document", href: "attachment", active: "" },
      { label: this.cmsFormName, active: "active" }
    );

    this.openFormInitiator = this.openFormInitiator + 1;

    if (this.isFileUploadSelected) {
      this.isUploadEnabled = true;
    }
    switch (formName.form) {
      //////////Assessment Node////////
      case "Initial Family Assessment":
        // url = '/reports/referral/family-preservation/initial/family/assessment';
        this.initialFam = true;
        this.isNodeOpened = true;

        break;
      case "Mental Health Assessment completed by Therapist and Family":
        // url = '/reports/referral/family-preservation/mental/health/assessment/therapist';
        this.isMentalHealth = true;
        this.isNodeOpened = true;

        break;

      case "Mental Health Assessment completed by Therapist and Family- Exceptions":
        url = "aaaaaa";
        break;

      case "Family Preservation Progress Report":
        // url = '/reports/referral/family-preservation/progress/report';
        this.isProgRep = true;
        this.isNodeOpened = true;

        break;

      case "Uncope":
        url = "aaaaaa";
        break;

      case "Family Safety Plan":
        // url = '/reports/referral/family-preservation/family/safety/plan';
        this.isFamSafetyPlan = true;
        this.isNodeOpened = true;
        break;

      case "PPS2007 Plan of Safe Care":
        // url = '/reports/referral/family-preservation/plan/of/safe/care';
        this.isPlanOfSafe = true;
        this.isNodeOpened = true;

        break;

      case "Domestic Violence Screening Form":
        // url = '/reports/referral/family-preservation/domestic/violence/screening';
        this.isDomesticVio = true;
        this.isNodeOpened = true;

        break;

      case "Non-Custodial Parent Assessment":
        // url = '/reports/referral/family-preservation/non/custodial/parent/assessment';
        this.isNonCus = true;
        this.isNodeOpened = true;

        break;

      case "NonCustodial Parent ICED Worksheet":
        // url = '/reports/referral/family-preservation/non/custodial/parent/iced/worksheet';
        this.isNonCusIced = true;
        this.isNodeOpened = true;

        break;

      case "Treatment Plan Update":
        // url = '/reports/referral/family-preservation/treatment/plan/update';
        this.isTreatPlan = true;
        this.isNodeOpened = true;

        break;

      case "Change of Status Form":
        // url = '/reports/referral/family-preservation/change/of/status';
        this.isChangeOfStat = true;
        this.isNodeOpened = true;

        break;

      case "Family Preservation Assessment Checklist":
        url = "aaaaaa";
        break;

      case "Progress Report":
        // url = '/reports/referral/family-preservation/progress/report';
        this.isProgrRepAssess = true;
        this.isNodeOpened = true;

        break;

      case "Suicide Risk Assessment-Family with Precaution Intervention":
        url = "aaaaaa";
        break;

      case "Suicide Risk Assessment-Precaution Intervention":
        url = "aaaaaa";
        break;

      case "Assessment Checklist Form":
        // url = '/reports/referral/family-preservation/assessment/checklist';
        this.isAssessCheck = true;
        this.isNodeOpened = true;

        break;

      case "Edinburgh Postnatal Depression Scale":
        // url = '/reports/referral/family-preservation/epds';
        this.isEpds = true;
        this.isNodeOpened = true;

        break;

      case "Missing Child Questionaire":
        // url = '/reports/referral/family-preservation/missing/child/questionaire';
        this.isMissingChild = true;
        this.isNodeOpened = true;

        break;

      case "Therapy Discharge":
        // url = '/reports/referral/family-preservation/therapy/discharge';
        this.isTheDisAssess = true;
        this.isNodeOpened = true;

        break;

      case "Treatment Plan Update - typed version":
        // url = '/reports/referral/family-preservation/treatment/plan/update';
        this.isTreatPlanAssess = true;
        this.isNodeOpened = true;

        break;

      /////////////Case Plan Goals Node//////////

      case "Case Planning Documents:  Custody":
        // url = '/reports/referral/family-preservation/custody/caseplan/conference';
        this.caseCustody = true;
        this.isNodeOpened = true;
        break;

      case "Case Planing Documents:  Non-Custody":
        url = "aaaaaa";
        break;

      case "PPS3049 Introduction and Parent_s Guide":
        // url = '/reports/referral/family-preservation/intro/and/parents/guide';
        this.isIntroParent = true;
        this.isNodeOpened = true;

        break;

      case "PPS3051 Permanency Plan":
        // url = '/reports/referral/family-preservation/permananency/plan';
        this.isPpsPerman = true;
        this.isNodeOpened = true;

        break;

      case "PPS3052 Administrative Requirements":
        // url = '/reports/referral/family-preservation/adminstrative/requirements';
        this.isAdminReq = true;
        this.isNodeOpened = true;

        break;

      case "PPS3054 Visitation Schedule":
        // url = '/reports/referral/family-preservation/visitation/schedule';
        this.isVisitationScl = true;
        this.isNodeOpened = true;

        break;

      case "PPS3055 _Permanency Plan Review":
        // url = '/reports/referral/family-preservation/permanency/plan/review';
        this.isPermPlanRev = true;
        this.isNodeOpened = true;
        break;

      case "PPS3057 Service and Service Codes":
        // url = '/reports/referral/family-preservation/service/and/service/code';
        this.isServices = true;
        this.isNodeOpened = true;
        break;

      case "PPS3058 - Permanency Plan Checklist":
        // url = '/reports/referral/family-preservation/permanency/plan/checklist';
        this.isPerPlanCheck = true;
        this.isNodeOpened = true;

        break;

      case "PPS 3049A Intro and Parent Guide to case planning":
        url =
          "/reports/referral/family-preservation/pps3049A/intro/and/parent/guide";
        break;

      case "PPS3050 Family Service Preservation Plan":
        // url = '/reports/referral/family-preservation/family/service/preservation/plan';
        this.familyPreServ = true;
        this.isNodeOpened = true;

        break;

      //////Phase/////////
      case "Family Relapse Prevention/Non-Intensive Plan":
        // url = '/reports/referral/family-preservation/family/relapse/prevention/non/intensive/plan';
        this.isFamilyRel = true;
        this.isNodeOpened = true;

        break;

      case "Non Intensive Transition":
        // url = '/reports/referral/family-preservation/non/intensive/transition';/
        this.nonTrans = true;
        this.isNodeOpened = true;

        break;

      //////Family (family safety) Node////////
      case "Family Safety Plan Form":
        // url = '/reports/referral/family-preservation/family/safety/plan';
        this.isFamSafety = true;
        this.isNodeOpened = true;
        break;

      //////Case Activity Node////////
      case "Non-Therapy Face to Face Log":
        // url = '/reports/referral/family-preservation/nontherapy/face/to/face';
        this.isNtftfNode = true;
        this.isNodeOpened = true;
        break;

      case "Lack of Contact":
        // url = '/reports/referral/family-preservation/lack/contact/notification';
        this.isLackOfContact = true;
        this.isNodeOpened = true;
        break;

      case "Family Presevation Supervisor Staffing":
        // url = '/reports/referral/family-preservation/supervisory/staffing';
        this.isSupervisorStaff = true;
        this.isNodeOpened = true;
        break;

      case "Client Face to Face Contact Form":
        // url = '/reports/referral/family-preservation/client/face/to/face';
        this.isCftfContact = true;
        this.isNodeOpened = true;
        break;

      case "PPS3005 Case Transfer Summary 7 1 17":
        // url = '/reports/referral/family-preservation/case/transfer/summary';
        this.isCaseTransfer = true;
        this.isNodeOpened = true;
        break;

      //////Supervisor Staffing////////

      case "Case Transfer Summary":
        // url = '/reports/referral/family-preservation/case/transfer/summary';
        this.isSuperrCaseTrans = true;
        this.isNodeOpened = true;

        break;

      //////Progress Notes//////
      case "Progress Note":
        // url = '/reports/referral/family-preservation/progress/note';
        this.isProgressNote = true;
        this.isNodeOpened = true;
        break;

      ////////Court Orders (FP)//////////
      case "Court Report":
        // url = '/reports/referral/reintegration/courtorder/court/report/template';
        this.isCourtRepFp = true;
        this.isNodeOpened = true;
        break;

      case "Court Report Corespondence Cover Sheet":
        // url = '/reports/referral/family-preservation/court/report/correspondence';
        this.isCourteRepCorr = true;
        this.isNodeOpened = true;
        break;

      ////////////Service Claims///////////

      case "Financial Assistance Request Form":
        // url = '/reports/referral/family-preservation/financial/assistance/request';
        this.isFinanReq = true;
        this.isNodeOpened = true;
        break;

      /////////////referral-events////////

      case "Therapy Discharge":
        // url = '/reports/referral/family-preservation/therapy/discharge';
        this.isTherDisc = true;
        this.isNodeOpened = true;
        break;

      ///////////FP referral Node/////////////
      case "PPS5002":
        // url = '/reports/referral/family-preservation/pps5002';
        this.isPpsFp = true;
        this.isNodeOpened = true;
        break;

      ////////RFC Referral....../////////////////////////////////////////////////////////////
      ////////Court Orders (RFC)//////////
      case "Achievement Plan - Sedgwick County Only":
        // url = '/reports/referral/reintegration/achievement/plan';
        this.isAchPlan = true;
        this.isNodeOpened = true;
        break;

      case "Addendum Court Report Template":
        // url = '/reports/referral/reintegration/courtorder/addendum/court/report';
        this.isAddentum = true;
        this.isNodeOpened = true;

        break;

      case "Court Report":
        // url = '/reports/referral/reintegration/courtorder/court/report/template';
        this.isCourtRepRfc = true;
        this.isNodeOpened = true;

        break;

      case "DD Contact Sheet 15 - Sedgwick County Only":
        // url = '/reports/referral/reintegration/courtorder/dd/contact/sheet';
        this.isDDContact = true;
        this.isNodeOpened = true;

        break;

      case "DD Report (Alleged Father) - Sedgwick County Only":
        // url = '/reports/referral/reintegration/courtorder/dd/report/alleged/father';
        this.isAllegedFather = true;
        this.isNodeOpened = true;

        break;

      case "DD Report (Father Unknown) - Sedgwick County Only":
        // url = '/reports/referral/reintegration/courtorder/dd/report/father/unknown';
        this.isFatherUnknown = true;
        this.isNodeOpened = true;
        break;

      case "DD Report (Father) - Sedgwick County Only":
        // url = '/reports/referral/reintegration/courtorder/dd/report/father';
        this.isFatherSedwick = true;
        this.isNodeOpened = true;
        break;

      case "DD Report (Maternal Grandparent) - Sedgwick County Only":
        // url = '/reports/referral/reintegration/courtorder/dd/report/maternal/grandparent';
        this.isMatenalGrand = true;
        this.isNodeOpened = true;
        break;

      case "DD Report (Mother) - Sedgwick County Only":
        // url = '/reports/referral/reintegration/courtorder/dd/report/mother';
        this.isMother = true;
        this.isNodeOpened = true;

        break;

      case "DD Report (Paternal Grandparent) - Sedgwick County Only":
        // url = '/reports/referral/reintegration/courtorder/dd/report/paternal/grandparent';
        this.isPaternalGrand = true;
        this.isNodeOpened = true;

        break;

      case "Reintegration Plan-Sedgwick County":
        // url = '/reports/referral/reintegration/courtorder/reintegration/plan';
        this.isReintPlan = true;
        this.isNodeOpened = true;

        break;

      case "Relinquishment of Minor Child to Agency Appendix 5J":
        // url = '/reports/referral/reintegration/courtorder/relinquishment/minor/child/agency';
        this.isRelinquish = true;
        this.isNodeOpened = true;
        break;

      case "Review Hearing Exhibit List - Sedgwick County Only":
        // url = '/reports/referral/reintegration/courtorder/review/hearing/exhibit';
        this.isReviewHear = true;
        this.isNodeOpened = true;
        break;

      case "Visitation Court Report - Sedgwick County Only":
        // url = '/reports/referral/reintegration/courtorder/visitation/court/report';
        this.isVisitCourt = true;
        this.isNodeOpened = true;
        break;

      case "Points of Severance":
        // url = '/reports/referral/reintegration/courtorder/points/of/serverance';
        this.isPointsOfServerance = true;
        this.isNodeOpened = true;
        break;

      ////Case plan goals (RFC)///////
      case "Permanency Plan (Case Plan)":
        // url = '/reports/referral/reintegration/caseplangoals/permanency/plan';
        this.isPerPlanCasePlan = true;
        this.isNodeOpened = true;
        break;

      case "Request for Case Plan Needing Scheduled":
        // url = '/reports/referral/reintegration/caseplangoals/caseplan/needing/scheduled';
        this.isCasePlanNeed = true;
        this.isNodeOpened = true;
        break;

      case "Notice of Case Planning Conference":
        // url = '/reports/referral/reintegration/caseplangoals/notice/child/custody/caseplan';
        this.isNoticeCasePlan = true;
        this.isNodeOpened = true;

        break;

      case "Visitation Schedule":
        // url = '/reports/referral/family-preservation/visitation/schedule';
        this.isVisitSceRfc = true;
        this.isNodeOpened = true;

        break;

      case "Parent/Child Visitation Schedule":
        // url = '/reports/referral/reintegration/caseplangoals/parent/child/interaction';
        this.isParentChildInt = true;
        this.isNodeOpened = true;

        break;

      case "Family Safety Plan":
        // url = '/reports/referral/reintegration/family/safety/plan';
        this.isFamSafetyReint = true;
        this.isNodeOpened = true;
        break;

      case "Kinship Visitation Plan":
        // url = '/reports/referral/reintegration/kinship/visitation/plan';
        this.isKinVisPlan = true;
        this.isNodeOpened = true;
        break;

      case "KYAC Monthly Individual Contact Form (PPS 3061)":
        // url = '/reports/referral/reintegration/caseplangoals/kyac';
        this.isKyac = true;
        this.isNodeOpened = true;
        break;

      ////////Supervisor staffing RFC/////////
      case "Case Transfer Summary":
        // url = '/reports/referral/reintegration/supervisor-staffing/case/transfer/summary';
        this.isCaseTransferRFC = true;
        this.isNodeOpened = true;
        break;

      ////////placement RFC/////////
      case "SFCS Employee as Resource Parent Administrative Review":
        // url = '/reports/referral/reintegration/placements/sfcs/employee/resource';
        this.isSfcsEmp = true;
        this.isNodeOpened = true;
        break;

      ////////Move and permanency RFC/////////
      case "Child Move Form with Disruption":
        // url = '/reports/referral/reintegration/child/move/form';
        this.isChildDisrupt = true;
        this.isNodeOpened = true;

        break;

      case "Permanency Release or Change of Status Form":
        // url = '/reports/referral/reintegration/moveandpermanency/permanency/release/change/status';
        this.isPermanencyRel = true;
        this.isNodeOpened = true;

        break;

      case "Planned Change of Placement Notice":
        // url = '/reports/referral/reintegration/moveandpermanency/planned/change/placement';
        this.isPlannedChg = true;
        this.isNodeOpened = true;

        break;

      case "Respite Request":
        // url = '/reports/referral/reintegration/moveandpermanency/sfcs/employee/resource';
        this.isRespiteNot = true;
        this.isNodeOpened = true;

        break;

      case "30 Day Notice of Planned Move":
        url = "aaaaaa";
        break;

      case "Waiver of a 30 Day Notice of Planned Move":
        // url = '/reports/referral/reintegration/moveandpermanency/planned/move/waiver/guide';
        this.isWaiver = true;
        this.isNodeOpened = true;

        break;

      ////////Assessment RFC/////////
      case "Blue Book Departure Chklst":
        // url = '/reports/referral/reintegration/assessments/departure/checklist';
        this.isDeptCheck = true;
        this.isNodeOpened = true;

        break;

      case "Caregiver Response Tool":
        // url = '/reports/referral/reintegration/assessments/caregiver/response/tool';
        this.isCareGiveResp = true;
        this.isNodeOpened = true;

        break;

      case "Child and Family Profile (NCFAS)":
        // url = '/reports/referral/reintegration/assessments/child/family/profile';
        this.isChildFam = true;
        this.isNodeOpened = true;

        break;

      case "Decision Making and Functional Assessment":
        // url = '/reports/referral/reintegration/assessments/decision/making/functional/assessment';
        this.isDecMakFuncAss = true;
        this.isNodeOpened = true;

        break;

      case "Human Trafficking Child Welfare Initial Assessment":
        // url = '/reports/referral/reintegration/assessments/human/trafficking';
        this.isHumanTrack = true;
        this.isNodeOpened = true;

        break;

      case "ICWA_Genealogical_Information_Form_2015":
        // url = '/reports/referral/reintegration/assessments/icwa';
        this.isIcwa = true;
        this.isNodeOpened = true;
        break;

      case "Informal Care Referral":
        // url = '/reports/referral/reintegration/assessments/informal/care/referral';
        this.isInformCare = true;
        this.isNodeOpened = true;

        break;

      case "Initial Placement Screening Tool":
        // url = '/reports/referral/reintegration/assessments/initial/placement/screening/tool';
        this.isInitPlacScreen = true;
        this.isNodeOpened = true;

        break;

      case "Initial Screening Tool":
        // url = '/reports/referral/reintegration/assessments/initial/screening/tool';
        this.isIniScreenTool = true;
        this.isNodeOpened = true;

        break;

      case "Lifebook":
        url = "aaaaaa";
        break;

      case "Maternal and Paternal Kinship Form":
        // url = '/reports/referral/reintegration/assessments/maternal/paternal';
        this.isMatPatRel = true;
        this.isNodeOpened = true;

        break;

      case "Medical and Genetic Info for Child (PPS 5340)":
        // url = '/reports/referral/reintegration/assessments/medical/genetic/info';
        this.isMedGenInfo = true;
        this.isNodeOpened = true;

        break;

      case "Medically Fragile Screening Tool":
        // url = '/reports/referral/reintegration/assessments/medically/fragile/scoring/tool';
        this.isMedFragTool = true;
        this.isNodeOpened = true;

        break;

      case "Rehabilitation Services Referral":
        // url = '/reports/referral/reintegration/assessments/rehabilation/service/referral';
        this.isRehService = true;
        this.isNodeOpened = true;

        break;

      case "Request for Family Pres Services":
        // url = '/reports/referral/reintegration/assessments/family/pres/service';
        this.isFamPreService = true;
        this.isNodeOpened = true;

        break;

      case "Request for Kinship Assessment Services":
        // url = '/reports/referral/reintegration/assessments/kinship/assessment/service';
        this.isKinAssess = true;
        this.isNodeOpened = true;

        break;

      case "Request for Mental Health Reports":
        // url = '/reports/referral/reintegration/assessments/mental/health';
        this.isMentalHealthAssRfc = true;
        this.isNodeOpened = true;

        break;

      case "Sibling Seperation Staffing (PPS 5146)":
        // url = '/reports/referral/reintegration/assessments/sibling/separation/staffing';
        this.isSibSep = true;
        this.isNodeOpened = true;

        break;

      case "Social History":
        // url = '/reports/referral/reintegration/assessments/social/history';
        this.isSociHist = true;
        this.isNodeOpened = true;

        break;

      case "Social-Emotional Screening Tool Appendix 3L":
        // url = '/reports/referral/reintegration/assessments/social/emotional/screening/tool';
        this.isSociEmoTol = true;
        this.isNodeOpened = true;

        break;

      case "Suicide Risk Assessment - Family with Precaution":
        // url = '/reports/referral/reintegration/assessments/suicide/risk/assessment';
        this.isSuiRiskAssess = true;
        this.isNodeOpened = true;

        break;

      case "Worker-Child Quality Checklist":
        // url = '/reports/referral/reintegration/assessments/worker/child/quality/checklist';
        this.isWorkChild = true;
        this.isNodeOpened = true;

        break;

      case "Worker-Parent Quality Checklist":
        // url = '/reports/referral/reintegration/assessments/worker/parent/quality/checklist';
        this.isWorkParent = true;
        this.isNodeOpened = true;

        break;

      case "Xtreme Kinship Recruitment Referral":
        // url = '/reports/referral/reintegration/assessments/xtreme/kinship';
        this.isXtremKin = true;
        this.isNodeOpened = true;

        break;

      case "New Referral Check list 10.20.17":
        // url = '/reports/referral/reintegration/new/referral/packet';
        this.isNewPacket = true;
        this.isNodeOpened = true;

        break;

      case "PPS3056 Permanency PLan Desk Review":
        // url = '/reports/referral/reintegration/assessments/permanency/plandesk/review';
        this.isPermPlanDeskRev = true;
        this.isNodeOpened = true;

        break;

      ////Independent Living (RFC)///////
      case "Transition Plan For Successful Adulthood":
        // url = '/reports/referral/independent-living/self/sufficiency/plan';
        this.isSelfSuff = true;
        this.isNodeOpened = true;

        break;
      case "LifeSkill Assessment":
        // url = '/reports/referral/independent-living/casey/assessment';
        this.isLifeSkill = true;
        this.isNodeOpened = true;
        break;
      case "Self Sufficiency Matrix":
        // url = '/reports/referral/independent-living/self/sufficiency/matrix';
        this.isSelfMatric = true;
        this.isNodeOpened = true;
        break;

      ////Adoption (RFC)///////
      case "Family Assessment and Preparation Study PPS 5318":
        url = "bbbbbb";
        break;

      case "Request For Consent To Adopt":
        // url = '/reports/referral/adoption/request/for/consent/to/adopt';
        this.isReqForCon = true;
        this.isNodeOpened = true;
        break;

      case "Adoption Exchange Child Status Update PPS 5315":
        // url = '/reports/referral/adoption/adoption/exchange/child/status/update';
        this.isAdopExcng = true;
        this.isNodeOpened = true;
        break;

      case "Individual Recruitment Plan":
        // url = '/reports/referral/adoption/individual/recruitment/plan';
        this.isIndRec = true;
        this.isNodeOpened = true;

        break;

      case "Sibling Split Request PPS 5147":
        url = "bbbbbb";
        break;

      case "Request to Schedule Best Interest Staffing":
        // url = '/reports/referral/adoption/request/to/schedule/best/interest/staffing';
        this.isReqSchBest = true;
        this.isNodeOpened = true;

        break;

      case "Notice of Best Interest Staffing":
        // url = '/reports/referral/adoption/notice/of/best/interest/staffing';
        this.isBestStaff = true;
        this.isNodeOpened = true;
        break;

      case "Adoption Court Report":
        // url = '/reports/referral/adoption/adoption/court/report/template';
        this.isAdopCourt = true;
        this.isNodeOpened = true;

        break;

      ////////////SFCS Office////////
      case "Disability Consultation IS-3122_KLS_Referral_Form_11-09":
        // url = '/reports/referral/reintegration/disability/consultation/referral/form';
        this.isDisabCons = true;
        this.isNodeOpened = true;
        break;

      ///////////Case Activity (RFC)///////////
      case "100 B PPS 9135 - ICPC":
        // url = '/reports/referral/reintegration/icpc/100b/pps9135';
        this.isIcpcPps = true;
        this.isNodeOpened = true;
        break;

      case "ICPC Referral Check List":
        // url = '/reports/referral/reintegration/appendix/9h/icpc/checklist';
        this.isIcpc = true;
        this.isNodeOpened = true;
        break;

      case "PPS 9145":
        // url = '/reports/referral/reintegration/pps/91451/reg';
        this.isPps = true;
        this.isNodeOpened = true;

        break;

      case "Other":
        this.isUploadEnabled = true;
        break;

      case "DCF History":
        this.isUploadEnabled = true;
        break;

      case "Back to main dropdown":
        this.cmsAttachment.documentType = "";
        this.isDocumentTypeSelected = false;
        this.isUploadEnabled = false;
        this.getMetaData("");
        break;
    }
  }

  saveForm(source: any) {
    if (this.documentTypeSelection === "forms selected") {
      this.docType = "Others";
    } else {
      this.docType = this.cmsAttachment.documentType.form;
    }

    let canSaveForm = true;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    if (this.isDetailsPage == true) {
      if (this.isExistingRecordFound === true) {
        loader.style.display = "none";
        this._router.navigate([this.discardTo], {
          queryParamsHandling: "preserve",
        });
      } else if (this.currentVersion == this.formCisArrayValue.length - 1) {
        let updateCmsReq: any;
        ///
        switch (this.cmsNode) {
          case "Case Activity":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              caseActivityID:
                parseInt(localStorage.getItem("caseActivityID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;
          //////////////////////////////////////////////////////////
          case "Case Activity":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              caseActivityID:
                parseInt(localStorage.getItem("caseActivityID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Case Plan Goals":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              casePlanID:
                parseInt(localStorage.getItem("casePlanID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Family Safety":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              familySafetyID:
                parseInt(localStorage.getItem("familySafteyId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          //////////test
          case "Service Hardgoods":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              claimID: parseInt(localStorage.getItem("claimId")),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Auth":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              authorizationID: parseInt(localStorage.getItem("authId")),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "DA Claims":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              claimID: parseInt(localStorage.getItem("claimId")),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Referral Events":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              referralEventID:
                parseInt(localStorage.getItem("referralEventID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Referral":
          case "Referral NC-OPS":
          case "Referral NC-FCH":
          case "Referral NC-RFC":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              referralID:
                parseInt(localStorage.getItem("referralId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Independent Living":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              independentLivingID:
                parseInt(localStorage.getItem("independentLivingID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Assessment":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              assessmentID:
                parseInt(localStorage.getItem("assessmentID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Adoption Event":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              adoptionID:
                parseInt(localStorage.getItem("adoptionId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;
          //////////test
          case "Placement":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              placementID: this._client.getId(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          //////////test
          case "Permanency":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              permanencyEventID:
                parseInt(localStorage.getItem("permanencyEventID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Court Orders":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              courtOrderedID:
                parseInt(localStorage.getItem("courtOrderedID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "BIS":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              bestInterestStaffingID:
                parseInt(localStorage.getItem("bestInterestingStaffId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          //
          case "Monthly Reports":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              monthlyReportID:
                parseInt(localStorage.getItem("monthlyReportsId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Medication":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              clientMedicationID:
                parseInt(localStorage.getItem("clientMedicationID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Client Profiles":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              clientProfileID:
                parseInt(localStorage.getItem("clientProfileID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Client Court Case":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              courtCaseID:
                parseInt(localStorage.getItem("courtCaseID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Third Party Liability":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              clientTPLID:
                parseInt(localStorage.getItem("tplId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Preventive Measurements":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              clientPreventativeMeasureID:
                parseInt(localStorage.getItem("clientPreventativeMeasureID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Unusual Incident":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              unusualIncidentID:
                parseInt(localStorage.getItem("unusualIncidentID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Case Team":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              caseTeamID:
                parseInt(localStorage.getItem("caseTeamID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Extended Family":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              familyMemberReferralID:
                parseInt(localStorage.getItem("familyMemberReferralID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Attached Documents":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Home County":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              homeCountyID:
                parseInt(localStorage.getItem("homeCountyID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "SFM Office":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              SFAOfficeActivityID:
                parseInt(localStorage.getItem("SFAOfficeActivityID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Non Therapy":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              nonTherapyFaceToFaceID:
                parseInt(localStorage.getItem("nonTherapyFaceToFaceID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Phase":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              phaseID:
                parseInt(localStorage.getItem("phaseId")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Progress Notes":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              progressNoteID:
                parseInt(localStorage.getItem("progressNoteID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Case Evaluation":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              evaluationID:
                parseInt(localStorage.getItem("evaluationID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Progress Notes Diagnosis":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              progressNoteDiagnosisID:
                parseInt(localStorage.getItem("progressNoteDiagnosisID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "RFC Referral":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              referralID:
                parseInt(localStorage.getItem("referralId")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Siblings In Out Home":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              referralID:
                parseInt(localStorage.getItem("referralId")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Kipp Pmto":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              kippID:
                parseInt(localStorage.getItem("kippID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "BH Determination":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              BHDeterminationID:
                parseInt(localStorage.getItem("BHDeterminationID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Health Record":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              healthExamID:
                parseInt(localStorage.getItem("healthExamID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Immunization":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              immunizationID:
                parseInt(localStorage.getItem("immunizationID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "kan-be-healthy":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              kanBeHealthyID:
                parseInt(localStorage.getItem("kanBeHealthyID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Appointment":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              appointmentID:
                parseInt(localStorage.getItem("appointmentID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Case File Activity":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              caseFileActivityID:
                parseInt(localStorage.getItem("caseFileActivityID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Waiver":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              waiverActivityID:
                parseInt(localStorage.getItem("waiverActivityID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Social Security Income":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              clientSSIID:
                parseInt(localStorage.getItem("clientSSIID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Behavioral Assessment":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              assessmentID:
                parseInt(localStorage.getItem("assessmentID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Authorization Summary":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              authorizationID: parseInt(localStorage.getItem("authId")),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Credit Tracking":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              creditTrackingID:
                parseInt(localStorage.getItem("creditTrackingID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Education Enrollment":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              schoolID:
                parseInt(localStorage.getItem("schoolID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "General Education":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              generalEducationID:
                parseInt(localStorage.getItem("generalEducationID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Special Education":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              specialEducationID:
                parseInt(localStorage.getItem("specialEducationID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Attending School":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              clientSchoolID:
                parseInt(localStorage.getItem("clientSchoolID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Grade Level":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              clientGradeID:
                parseInt(localStorage.getItem("clientGradeID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "School Release":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              schoolReleaseID:
                parseInt(localStorage.getItem("schoolReleaseID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Home School":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              homeSchoolID:
                parseInt(localStorage.getItem("homeSchoolID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Fis Members":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              clientReferralID:
                parseInt(localStorage.getItem("clientReferralID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Supervisory Staffing Attchment":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              supervisoryStaffingID:
                parseInt(localStorage.getItem("supervisoryStaffingID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "License":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              providerLicenseID:
                parseInt(localStorage.getItem("providerLicenseID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "License Exception":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              providerLicenseExceptionID:
                parseInt(localStorage.getItem("providerLicenseExceptionID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Sponsor":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              providerSponsorID:
                parseInt(localStorage.getItem("providerSponsorID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Provider School":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              providerSchoolID:
                parseInt(localStorage.getItem("providerSchoolID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Location":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              providerLocationID:
                parseInt(localStorage.getItem("providerLocationID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Pets":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              providerPetID:
                parseInt(localStorage.getItem("providerPetID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Status":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              providerStatusID:
                parseInt(localStorage.getItem("providerStatusID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Provider SFM Office":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              SFAOfficeActivityID:
                parseInt(localStorage.getItem("SFAOfficeActivityID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Provider SFM Staff":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              providerSFAStaffID:
                parseInt(localStorage.getItem("providerSFAStaffID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Preference":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              providerPreferenceID:
                parseInt(localStorage.getItem("providerPreferenceID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Other Agency Staff":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              otherAgencyStaffID:
                parseInt(localStorage.getItem("otherAgencyStaffID")) -
                this._openCards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Claims":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              claimID: parseInt(localStorage.getItem("claimId")),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Living Arrangement":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              livingArrangementID:
                parseInt(localStorage.getItem("livingArrangementID")) -
                  this._openCards.getHasKey() ||
                this.currentRecordId ||
                parseInt(
                  this._activatedRoute.snapshot.queryParamMap.get("li_id")
                ),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Placement Authorizations Attachment":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              authorizationID:
                this.currentRecordId || this.currentAuthorizationID,
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Placement Event":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              placementDetailID: parseInt(
                localStorage.getItem("placementDetailID")
              ),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          case "Placement Plan":
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              placementPlanID: parseInt(
                localStorage.getItem("planPlacementDetailId")
              ),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
            break;

          //
          ////////////////////////////////////////////////////

          default:
            swal("Warning", "Wrong Information", "info");
            updateCmsReq = {
              scannedDocumentID: parseInt(
                localStorage.getItem("CisCaseActivityId")
              ),
              caseActivityID:
                parseInt(localStorage.getItem("caseActivityID")) -
                this._openCards.getHasKey(),
              isFinalized: false,
              cmsCisPdfDocID:
                this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
              pdfJsonData: { cmsFormJson: this.cmsFormJson },
              version: this.currentVersion + 1,
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
            };
        }
        //

        this._openCards.updateCisForm(updateCmsReq).then(async (data) => {
          swal("Success", "Attachment has been updated!", "success");
          await this.getCmsJson();
          loader.style.display = "none";
        });
      } else {
        loader.style.display = "none";
        swal("Warning", "Please Update the latest version", "info");
      }
    } else {
      var element = document.getElementById("form");
      var opt = {
        margin: 1,
        filename: "cms.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
      };

      let pdf = html2pdf().from(element).set(opt).output("blob");
      pdf.then((data: any) => {
        let req: any;
        switch (this.cmsNode) {
          case "Case Activity":
            if (this.referralName === "RFC") {
              this.listViewUrl =
                "/reports/attachment-document/rfc/case-activity";
            } else if (this.referralName === "FP") {
              this.listViewUrl = "/reports/attachment-document/case-activity";
            }

            req = {
              clientID: parseInt(
                this._activatedRoute.snapshot.queryParamMap.get(CLIENTID)
              ),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              caseActivityID: parseInt(
                this._activatedRoute.snapshot.queryParamMap.get(CASEACTIVITYID)
              ),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Case Plan Goals":
            if (this.referralName === "RFC") {
              this.listViewUrl =
                "/reports/attachment-document/rfc/case-plan-goals";
            } else if (this.referralName === "FP") {
              this.listViewUrl = "/reports/attachment-document/case-plan-goals";
            }

            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              casePlanID:
                parseInt(localStorage.getItem("casePlanID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Family Safety":
            this.listViewUrl = "/reports/attachment-document/family-safety";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              familySafetyID:
                parseInt(localStorage.getItem("familySafteyId")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Service Hardgoods":
            this.listViewUrl = "/reports/attachment-document/service-hardgoods";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              claimID: parseInt(localStorage.getItem("claimId")),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Auth":
            this.listViewUrl =
              "/reports/attachment-document/rfc/rfc-authorizations";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              authorizationID: parseInt(localStorage.getItem("authId")),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "DA Claims":
            this.listViewUrl = "/reports/attachment-document/rfc/rfc-claims";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              claimID: parseInt(localStorage.getItem("claimId")),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Referral Events":
            this.listViewUrl = "/reports/attachment-document/referral-events";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              referralEventID:
                parseInt(localStorage.getItem("referralEventID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Referral":
          case "Referral NC-OPS":
          case "Referral NC-FCH":
          case "Referral NC-RFC":
            if (this.cmsNode === "Referral NC-OPS") {
              this.listViewUrl = "/reports/referral/nc-ops/detail";
            } else if (this.cmsNode === "Referral NC-FCH") {
              this.listViewUrl = "/reports/nc-fch/detail";
            } else if (this.cmsNode === "Referral NC-RFC") {
              this.listViewUrl = "/reports/nc-rfc/detail";
            } else {
              this.listViewUrl = "reports/attachment-document/fp-referral";
            }
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              referralID:
                parseInt(localStorage.getItem("referralId")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Independent Living":
            this.listViewUrl =
              "/reports/attachment-document/rfc/independent-living";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              independentLivingID:
                parseInt(localStorage.getItem("independentLivingID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Assessment":
            if (this.referralName === "RFC") {
              this.listViewUrl = "/reports/attachment-document/rfc/assessment";
            } else if (this.referralName === "FP") {
              this.listViewUrl = "/reports/attachment-document/assessment";
            }

            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              assessmentID:
                parseInt(localStorage.getItem("assessmentID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Adoption Event":
            this.listViewUrl =
              "/reports/attachment-document/rfc/adoption-event";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              adoptionID:
                parseInt(localStorage.getItem("adoptionId")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Placement":
            this.listViewUrl = "/reports/attachment-document/case-activity";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              placementID: this._client.getId(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Permanency":
            this.listViewUrl = "/reports/attachment-document/rfc/permanency";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              permanencyEventID: this._client.getId(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Court Orders":
            if (this.referralName === "RFC") {
              this.listViewUrl =
                "/reports/attachment-document/rfc/court-orders";
            } else if (this.referralName === "FP") {
              this.listViewUrl = "/reports/attachment-document/court-orders";
            }

            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              courtOrderedID:
                parseInt(localStorage.getItem("courtOrderedID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "BIS":
            this.listViewUrl = "/reports/attachment-document/rfc/bis";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              bestInterestStaffingID:
                parseInt(localStorage.getItem("bestInterestingStaffId")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Monthly Reports":
            this.listViewUrl =
              "/reports/attachment-document/rfc/monthly-reports";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              monthlyReportID:
                parseInt(localStorage.getItem("monthlyReportsId")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Medication":
            this.listViewUrl = "/reports/attachment-document/client/medication";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              clientMedicationID:
                parseInt(localStorage.getItem("clientMedicationID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Client Profiles":
            this.listViewUrl =
              "/reports/attachment-document/client/client-profiles";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              clientProfileID:
                parseInt(localStorage.getItem("clientProfileID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Client Court Case":
            this.listViewUrl = "/reports/attachment-document/client/court-case";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              courtCaseID:
                parseInt(localStorage.getItem("courtCaseID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Third Party Liability":
            this.listViewUrl =
              "/reports/attachment-document/client/third-party-liability";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              clientTPLID:
                parseInt(localStorage.getItem("tplId")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Preventive Measurements":
            this.listViewUrl =
              "/reports/attachment-document/client/preventive-measurements";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              clientPreventativeMeasureID:
                parseInt(localStorage.getItem("clientPreventativeMeasureID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Unusual Incident":
            if (this.referralName === "PROVIDERS") {
              this.listViewUrl =
                "/reports/attachment-document/providers/unusual-incident";
            } else {
              this.listViewUrl =
                "/reports/attachment-document/client/unusual-incident";
            }

            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              unusualIncidentID:
                parseInt(localStorage.getItem("unusualIncidentID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Case Team":
            if (this.referralName === "RFC") {
              this.listViewUrl = "/reports/attachment-document/rfc/case-team";
            } else if (this.referralName === "FP") {
              this.listViewUrl = "/reports/attachment-document/case-team";
            }

            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              caseTeamID:
                parseInt(localStorage.getItem("caseTeamID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Extended Family":
            this.listViewUrl = "/reports/attachment-document/extended-family";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              familyMemberReferralID:
                parseInt(localStorage.getItem("familyMemberReferralID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Attached Documents":
            this.listViewUrl = "/reports/client/documents";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Home County":
            if (this.referralName === "RFC") {
              this.listViewUrl = "/reports/attachment-document/rfc/home-county";
            } else if (this.referralName === "FP") {
              this.listViewUrl = "/reports/attachment-document/home-county";
            }

            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              homeCountyID:
                parseInt(localStorage.getItem("homeCountyID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "SFM Office":
            if (this.referralName === "RFC") {
              this.listViewUrl = "/reports/attachment-document/rfc/sfcs-office";
            } else if (this.referralName === "FP") {
              this.listViewUrl = "/reports/attachment-document/sfcs-office";
            }

            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              SFAOfficeActivityID:
                parseInt(localStorage.getItem("SFAOfficeActivityID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Non Therapy":
            this.listViewUrl = "/reports/attachment-document/non-therapy";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              nonTherapyFaceToFaceID:
                parseInt(localStorage.getItem("nonTherapyFaceToFaceID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Phase":
            this.listViewUrl = "/reports/attachment-document/phase";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              phaseID:
                parseInt(localStorage.getItem("phaseId")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Progress Notes":
            this.listViewUrl = "/reports/attachment-document/progress-notes";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              progressNoteID:
                parseInt(localStorage.getItem("progressNoteID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Case Evaluation":
            if (this.referralName === "RFC") {
              this.listViewUrl =
                "/reports/attachment-document/rfc/case-evaluation";
            } else if (this.referralName === "FP") {
              this.listViewUrl = "/reports/attachment-document/case-evaluation";
            }

            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              evaluationID:
                parseInt(localStorage.getItem("evaluationID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Progress Notes Diagnosis":
            this.listViewUrl =
              "/reports/attachment-document/progress-notes-diagnosis";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              progressNoteDiagnosisID:
                parseInt(localStorage.getItem("progressNoteDiagnosisID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "RFC Referral":
            this.listViewUrl = "/reports/attachment-document/rfc/referral";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              referralID:
                parseInt(localStorage.getItem("referralId")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          // case 'Siblings In Out Home':
          //   this.listViewUrl = '/reports/attachment-document/rfc/sibilings-in-out-home';

          case "Kipp Pmto":
            if (this.referralName === "RFC") {
              this.listViewUrl = "/reports/attachment-document/rfc/kipp-pmto";
            } else if (this.referralName === "FP") {
              this.listViewUrl = "/reports/attachment-document/kipp-pmto";
            }
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              kippID:
                parseInt(localStorage.getItem("kippID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "BH Determination":
            this.listViewUrl =
              "/reports/attachment-document/rfc/bh-determination";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              BHDeterminationID:
                parseInt(localStorage.getItem("BHDeterminationID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Health Record":
            this.listViewUrl = "/reports/attachment-document/rfc/health-record";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              healthExamID:
                parseInt(localStorage.getItem("healthExamID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Immunization":
            this.listViewUrl = "/reports/attachment-document/rfc/immunization";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              immunizationID:
                parseInt(localStorage.getItem("immunizationID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "kan-be-healthy":
            this.listViewUrl =
              "/reports/attachment-document/rfc/kan-be-healthy";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              kanBeHealthyID:
                parseInt(localStorage.getItem("kanBeHealthyID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;
          case "Appointment":
            this.listViewUrl = "/reports/attachment-document/rfc/appointments";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              appointmentID:
                parseInt(localStorage.getItem("appointmentID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Case File Activity":
            this.listViewUrl =
              "/reports/attachment-document/rfc/case-file-activity";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              caseFileActivityID:
                parseInt(localStorage.getItem("caseFileActivityID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Waiver":
            this.listViewUrl = "/reports/attachment-document/rfc/waiver";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              waiverActivityID:
                parseInt(localStorage.getItem("waiverActivityID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Social Security Income":
            this.listViewUrl =
              "/reports/attachment-document/rfc/social-security-income";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              clientSSIID:
                parseInt(localStorage.getItem("clientSSIID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Behavioral Assessment":
            this.listViewUrl =
              "/reports/attachment-document/rfc/behavioral-assessment";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              assessmentID:
                parseInt(localStorage.getItem("assessmentID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Authorization Summary":
            this.listViewUrl =
              "/reports/attachment-document/rfc/authorization-summary";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              authorizationID: parseInt(localStorage.getItem("authId")),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Credit Tracking":
            this.listViewUrl =
              "/reports/attachment-document/rfc/credit-tracking";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              creditTrackingID:
                parseInt(localStorage.getItem("creditTrackingID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Education Enrollment":
            this.listViewUrl =
              "/reports/attachment-document/rfc/education-enrollment";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              schoolID:
                parseInt(localStorage.getItem("schoolID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "General Education":
            this.listViewUrl =
              "/reports/attachment-document/rfc/general-education";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              generalEducationID:
                parseInt(localStorage.getItem("generalEducationID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Special Education":
            this.listViewUrl =
              "/reports/attachment-document/rfc/special-education";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              specialEducationID:
                parseInt(localStorage.getItem("specialEducationID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Attending School":
            this.listViewUrl =
              "/reports/attachment-document/rfc/attending-school";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              clientSchoolID:
                parseInt(localStorage.getItem("clientSchoolID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Grade Level":
            this.listViewUrl = "/reports/attachment-document/rfc/grade-level";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              clientGradeID:
                parseInt(localStorage.getItem("clientGradeID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "School Release":
            this.listViewUrl =
              "/reports/attachment-document/rfc/school-release";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              schoolReleaseID:
                parseInt(localStorage.getItem("schoolReleaseID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Home School":
            this.listViewUrl = "/reports/attachment-document/rfc/home-school";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              homeSchoolID:
                parseInt(localStorage.getItem("homeSchoolID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Fis Members":
            this.listViewUrl = "/reports/attachment-document/fis-members";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              clientReferralID:
                parseInt(localStorage.getItem("clientReferralID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Supervisory Staffing Attchment":
            this.listViewUrl =
              "/reports/attachment-document/rfc/supervisory-staffing";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              supervisoryStaffingID:
                parseInt(localStorage.getItem("supervisoryStaffingID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "License":
            this.listViewUrl = "/reports/attachment-document/providers/license";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              providerLicenseID:
                parseInt(localStorage.getItem("providerLicenseID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "License Exception":
            this.listViewUrl =
              "/reports/attachment-document/providers/license-exception";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              providerLicenseExceptionID:
                parseInt(localStorage.getItem("providerLicenseExceptionID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Sponsor":
            this.listViewUrl = "/reports/attachment-document/providers/sponsor";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              providerSponsorID:
                parseInt(localStorage.getItem("providerSponsorID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Provider School":
            this.listViewUrl = "/reports/attachment-document/providers/school";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              providerSchoolID:
                parseInt(localStorage.getItem("providerSchoolID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Provider SFM Office":
            this.listViewUrl = "/reports/attachment-document/providers/office";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              SFAOfficeActivityID:
                parseInt(localStorage.getItem("SFAOfficeActivityID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Location":
            this.listViewUrl =
              "/reports/attachment-document/providers/location";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              providerLocationID:
                parseInt(localStorage.getItem("providerLocationID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Pets":
            this.listViewUrl = "/reports/attachment-document/providers/pets";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              providerPetID:
                parseInt(localStorage.getItem("providerPetID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Status":
            this.listViewUrl = "/reports/attachment-document/providers/status";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              providerStatusID:
                parseInt(localStorage.getItem("providerStatusID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Provider SFM Office":
            this.listViewUrl = "/reports/attachment-document/providers/office";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              SFAOfficeActivityID:
                parseInt(localStorage.getItem("SFAOfficeActivityID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Provider SFM Staff":
            this.listViewUrl =
              "/reports/attachment-document/providers/sfm-staff";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              providerSFAStaffID:
                parseInt(localStorage.getItem("providerSFAStaffID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Preference":
            this.listViewUrl =
              "/reports/attachment-document/providers/preference";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              providerPreferenceID:
                parseInt(localStorage.getItem("providerPreferenceID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Other Agency Staff":
            this.listViewUrl =
              "/reports/attachment-document/providers/other-agency-staff";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              otherAgencyStaffID:
                parseInt(localStorage.getItem("otherAgencyStaffID")) -
                this._openCards.getHasKey(),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Claims":
            this.listViewUrl = "/reports/attachment-document/claims";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              claimID: parseInt(localStorage.getItem("claimId")),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Living Arrangement":
            this.listViewUrl =
              "/reintegration/referral/opencard/placement/living-arrangement/detail";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              livingArrangementID:
                parseInt(localStorage.getItem("livingArrangementID")) -
                  this._openCards.getHasKey() ||
                this.currentRecordId ||
                parseInt(
                  this._activatedRoute.snapshot.queryParamMap.get("li_id")
                ),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Placement Authorizations Attachment":
            if (this._router.url.includes("auth_id")) {
              this.listViewUrl =
                "/reintegration/referral/opencard/placement/daycare-authorization/detail";
            } else {
              if (
                this._activatedRoute.snapshot.queryParamMap.get("sub") ==
                "placement-event"
              ) {
                this.listViewUrl =
                  "/reintegration/referral/placement-event-authorizations/detail";
              } else {
                this.listViewUrl =
                  "/reintegration/referral/placement-authorizations/detail";
              }
            }
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              authorizationID:
                this.currentRecordId || this.currentAuthorizationID,
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Placement Event":
            this.listViewUrl =
              "/reports/attachment-document/rfc/placement-event";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              placementDetailID: parseInt(
                localStorage.getItem("placementDetailID")
              ),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          case "Placement Plan":
            this.listViewUrl =
              "/reports/attachment-document/rfc/placement-plan";
            req = {
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._openCards.getHasKey(),
              staffID: parseInt(localStorage.getItem("UserId")) || 4621,
              formName: this.cmsFormName,
              staffName: this.staffName || "Admin",
              placementPlanID: parseInt(
                localStorage.getItem("planPlacementDetailId")
              ),
              sfcsNotes: source.sfcsNotes,
              description: source.description,
              cmsFormJson: this.cmsFormJson,
              documentType: this.cmsAttachment.documentType.form,
              fileExtension: "." + this.fileType,
            };
            break;

          default:
            this.listViewUrl = "/reports/client/details";
            this.discardTo = "/reports/client/details";
            loader.style.display = "none";
            canSaveForm = false;
            swal("Info", "Your Request is in progress...", "info");
            this._router.navigate([this.listViewUrl], {
              queryParamsHandling: "preserve",
            });
        }

        let mailFormData: FormData = new FormData();
        if (this.isFileCreated) {
          mailFormData.append("uploadfile", this.fileStream);
          console.log("Mail form data", mailFormData);
        } else {
          let dataStream = this._openCards.getDigitalFormStream();
          if (dataStream) {
            mailFormData.append("uploadfile", dataStream);
          } else {
            mailFormData.append("uploadfile", data);
          }
        }

        mailFormData.append("pdfFormJson", JSON.stringify(req));
        if (canSaveForm) {
          if (this.isUploadEnabled) {
            if (this.isFileAdded) {
              this._openCards
                .saveAttachment(mailFormData)
                .then(async (data) => {
                  loader.style.display = "none";
                  swal("Success", "Attachment has been saved!", "success");
                  this._router.navigate([this.listViewUrl], {
                    queryParamsHandling: "preserve",
                  });
                });
            } else {
              loader.style.display = "none";
              swal("Info", "Please click upload button again to add", "info");
            }
          } else {
            this._openCards.saveAttachment(mailFormData).then(async (data) => {
              loader.style.display = "none";
              swal("Success", "Attachment has been saved!", "success");
              this._router.navigate([this.listViewUrl], {
                queryParamsHandling: "preserve",
              });
            });
          }
        }
      });
    }
  }

  getCmsData(event: any) {
    if (event) {
      if (event.isUpload === true) {
        this.cmsFormJson = { isUpload: true };
      } else {
        this.cmsFormJson = event.cmsData;
      }
    }
    if (event == "attachmentClose" && this.isNodeOpened === true) {
      this.breadcrumbs.pop();
      this.isEventAttachment = true;
    } else {
      this.isEventAttachment = false;
    }

    this.isNodeOpened = false;
    ////////////////////////////////////////////////////////////////////////
    this.isNtftfNode = false;
    this.isLackOfContact = false;
    this.isSupervisorStaff = false;
    this.isCftfContact = false;
    this.isCaseTransfer = false;
    this.isIcpcPps = false;
    this.isIcpc = false;
    this.isPps = false;

    this.isReqForCon = false;
    this.isAdopExcng = false;
    this.isIndRec = false;
    this.isReqSchBest = false;
    this.isBestStaff = false;
    this.isAdopCourt = false;

    /////Move and Permancnecy
    this.isChildDisrupt = false;
    this.isPermanencyRel = false;
    this.isPlannedChg = false;
    this.isRespiteNot = false;
    this.isWaiver = false;

    /////Phase
    this.isFamilyRel = false;
    this.nonTrans = false;
    this.isFamSafety = false;

    ////Supervisory Staffing
    this.isSuperrCaseTrans = false;
    ///Supervisor staffing RFC
    this.isCaseTransferRFC = false;

    // Progress Notes
    this.isProgressNote = false;

    //Service Claims
    this.isFinanReq = false;

    //Referral Events
    this.isTherDisc = false;

    //Placement
    this.isSfcsEmp = false;

    ///Independent Living
    this.isSelfSuff = false;
    this.isLifeSkill = false;
    this.isSelfMatric = false;

    //SFCS office RFC
    this.isDisabCons = false;

    ///FP Referral
    this.isPpsFp = false;

    ////Case Plan Goals FP
    this.caseCustody = false;
    this.isIntroParent = false;
    this.isPpsPerman = false;
    this.isAdminReq = false;
    this.isVisitationScl = false;
    this.isPermPlanRev = false;
    this.isServices = false;
    this.isPerPlanCheck = false;
    this.familyPreServ = false;

    ////Case Plan Goals RFC
    this.isPerPlanCasePlan = false;
    this.isCasePlanNeed = false;
    this.isNoticeCasePlan = false;
    this.isVisitSceRfc = false;
    this.isParentChildInt = false;
    this.isFamSafetyReint = false;
    this.isKinVisPlan = false;
    this.isKyac = false;

    //Court Orders FP
    this.isCourteRepCorr = false;
    this.isCourtRepFp = false;

    //Court Orders RFC
    this.isAchPlan = false;
    this.isAddentum = false;
    this.isCourtRepRfc = false;
    this.isDDContact = false;
    this.isAllegedFather = false;
    this.isFatherUnknown = false;
    this.isFatherSedwick = false;
    this.isMatenalGrand = false;
    this.isMother = false;
    this.isPaternalGrand = false;
    this.isPointsOfServerance = false;
    this.isReintPlan = false;
    this.isRelinquish = false;
    this.isReviewHear = false;
    this.isVisitCourt = false;

    //Assessment FP
    this.initialFam = false;
    this.isMentalHealth = false;
    this.isProgRep = false;
    this.isFamSafetyPlan = false;
    this.isPlanOfSafe = false;
    this.isDomesticVio = false;
    this.isNonCus = false;
    this.isNonCusIced = false;
    this.isTreatPlan = false;
    this.isChangeOfStat = false;
    this.isProgrRepAssess = false;
    this.isAssessCheck = false;
    this.isEpds = false;
    this.isMissingChild = false;
    this.isTheDisAssess = false;
    this.isTreatPlanAssess = false;

    ///Assessment RFC
    this.isDeptCheck = false;
    this.isCareGiveResp = false;
    this.isChildFam = false;
    this.isDecMakFuncAss = false;
    this.isHumanTrack = false;
    this.isIcwa = false;
    this.isInformCare = false;
    this.isInitPlacScreen = false;
    this.isIniScreenTool = false;
    this.isMatPatRel = false;
    this.isMedGenInfo = false;
    this.isMedFragTool = false;
    this.isRehService = false;
    this.isFamPreService = false;
    this.isKinAssess = false;
    this.isMentalHealthAssRfc = false;
    this.isSibSep = false;
    this.isSociHist = false;
    this.isSociEmoTol = false;
    this.isSuiRiskAssess = false;
    this.isWorkChild = false;
    this.isWorkParent = false;
    this.isXtremKin = false;
    this.isNewPacket = false;
    this.isPermPlanDeskRev = false;
  }

  async getCmsJson() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let scannedDocId = localStorage.getItem("ScannedDocumentID");

    const data = { scannedDocumentId: scannedDocId };
    await this._openCards.getCisFormJson(data).then(async (data) => {
      if (data.cmsCisPdfDoc) {
        this.formCisArrayValue = data.cmsCisPdfDoc;
        let reqPdfJson = await JSON.parse(
          data.cmsCisPdfDoc ? data.cmsCisPdfDoc[0].pdfJsonData : null
        );
        if (reqPdfJson) {
          if (
            reqPdfJson.cmsFormJson &&
            reqPdfJson.cmsFormJson.isUpload === true
          ) {
            let url: any;
            this.filename = data.cmsCisPdfDoc[0].scannedDocumentID.fileName;
            // if (
            //   this.env.localUrl ===
            //   "https://child-welfare.st-francis.org/tomcat/"
            // ) {
            //   url =
            //     "https://sfcsblobstorageeastus2.file.core.windows.net/stg-scanneddocumentfs/" +
            //     data.cmsCisPdfDoc[0].scannedDocumentID.fileName +
            //     this.fileStorageToken;
            // } else {
            //   url =
            //     "https://sfcsblobstorageeastus2.file.core.windows.net/scanneddocumentfs/" +
            //     data.cmsCisPdfDoc[0].scannedDocumentID.fileName +
            //     this.fileStorageToken;
            // }
            url =
              environment.blob +
              data.cmsCisPdfDoc[0].scannedDocumentID.fileName +
              this.fileStorageToken;
            this.uploadFileUrl = url;
            this.isUploadViewEnabled = true;
          }
        }

        this.cmsAttachment.sfcsNotes = reqPdfJson.sfcsNotes;
        this.cmsAttachment.description = reqPdfJson.description;
        this.cmsAttachment.documentType = await data.cmsCisPdfDoc[0].formName;

        this.cmsAttachment.enteredBy =
          data.cmsCisPdfDoc[0].staffID.firstName +
          " " +
          data.cmsCisPdfDoc[0].staffID.lastName;
        this.cmsAttachment.changedBy =
          data.cmsCisPdfDoc[data.cmsCisPdfDoc.length - 1].staffID.firstName +
          " " +
          data.cmsCisPdfDoc[data.cmsCisPdfDoc.length - 1].staffID.lastName;
      } else if (data.scannedDocument) {
        let url: any;
        this.filename = data.scannedDocument.fileName;
        if (
          this.env.localUrl === "https://child-welfare.st-francis.org/tomcat/"
        ) {
          url =
            "https://sfcsblobstorageeastus2.file.core.windows.net/stg-scanneddocumentfs/" +
            data.scannedDocument.fileName +
            this.fileStorageToken;
        } else {
          url =
            "https://sfcsblobstorageeastus2.file.core.windows.net/scanneddocumentfs/" +
            data.scannedDocument.fileName +
            this.fileStorageToken;
        }

        this.uploadFileUrl = url;
        this.isUploadViewEnabled = true;
        this.isExistingRecordFound = true;
        this.cmsAttachment.sfcsNotes = data.scannedDocument.sfcsnotes;
        this.cmsAttachment.description = data.scannedDocument.description;
        // this.cmsAttachment.documentType = data.scannedDocument.scanDocumentTypeID.documentType;
        this.cmsAttachment.enteredBy = data.scannedDocument.enteredBy;
        this.cmsAttachment.changedBy = data.scannedDocument.changedBy;
        this.isExistingDoc = true;
        this.isUploadView = true;
        this.isFormLog = true;
        this.formLogInfo.changedBy = data.scannedDocument.changedBy
          ? data.scannedDocument.changedBy
          : "------";
        this.formLogInfo.changedDate = data.scannedDocument.changedDate
          ? moment(data.scannedDocument.changedDate).format(
              "MM/DD/YYYY hh:mm:ss A"
            )
          : "--:--:-- --";
        this.formLogInfo.enteredBy = data.scannedDocument.enteredBy
          ? data.scannedDocument.enteredBy
          : "------";
        this.formLogInfo.enteredDate = data.scannedDocument.enteredDate
          ? moment(data.scannedDocument.enteredDate).format(
              "MM/DD/YYYY hh:mm:ss A"
            )
          : "--:--:-- --";
      } else {
        this.isUploadView = true;
      }
      this.isDetailsPage = true;
      loader.style.display = "none";
    });
  }

  /**
   * @param versionStr - index of the array
   * @return
   */
  generateVersion(versionStr) {
    let versionTemp = versionStr + 10;
    let version = versionTemp.toString();
    return version.charAt(0) + "." + version.charAt(1);
  }

  cisVersionBasedView(version) {
    this.currentVersion = version;
    this._openCards.setCmsJson(this.formCisArrayValue, version);
    this.openAssessment({ form: this.cmsAttachment.documentType });
  }

  storeCmsFile(event) {
    this.getAttachmentFileType(event.files[0].type);
    this.fileStream = event.files[0];
    this.isFileCreated = true;
    this.isFileAdded = true;
    this.isFileSelected = false;
    this.getCmsData({ isUpload: true });
    swal("Success", "Attachment is been added!", "success");
  }

  printDocument() {
    return window.open(this.uploadFileUrl);
    // if (this.isExistingDoc) {
    //   // window.open(this.uploadFileUrl);
    //   this.DonationService.getPdfFile(this.uploadFileUrl).map(res => {
    //     return {
    //       filename: this.filename,
    //       data: res.blob()
    //     };
    //   }).subscribe(res => {
    //     var url = window.URL.createObjectURL(res.data);
    //     var a = document.createElement('a');
    //     document.body.appendChild(a);
    //     a.setAttribute('style', 'display: none');
    //     a.href = url;
    //     a.download = res.filename;
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //     a.remove(); // remove the element
    //   }, error => {
    //     console.log('download error:', JSON.stringify(error));
    //   }, () => {
    //     console.log('Completed file download.')
    //     swal('Success', 'File Downloaded', 'success');
    //   });

    // }
    // else {
    //   let currentDate = new Date();
    //   let uploadedDate = new Date(this.formCisArrayValue[0].createdDate);
    //   uploadedDate.setMinutes(uploadedDate.getMinutes() + 2);
    //   if (currentDate > uploadedDate) {
    //     // window.open(this.uploadFileUrl);
    //     let data = this.DonationService.getPdfFile(this.uploadFileUrl).map(res => {
    //       return {
    //         filename: this.filename,
    //         data: res.blob()
    //       };
    //     }).subscribe(res => {
    //       var url = window.URL.createObjectURL(res.data);
    //       var a = document.createElement('a');
    //       document.body.appendChild(a);
    //       a.setAttribute('style', 'display: none');
    //       a.href = url;
    //       a.download = res.filename;
    //       a.click();
    //       window.URL.revokeObjectURL(url);
    //       a.remove(); // remove the element
    //     }, error => {
    //       console.log('download error:', JSON.stringify(error));
    //     }, () => {
    //       console.log('Completed file download.')
    //       swal('Success', 'File Downloaded', 'success');
    //     });

    //   }
    //   else {
    //     swal('Uploading in Progress...', 'Please Try after a minute', 'info');
    //   }
    // }
  }

  displayWaitMessage() {
    swal("Uploading in Progress...", "Please Try after a minute", "info");
  }

  getAttachmentFileType(type) {
    switch (type) {
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        this.fileType = "xlsx";
        break;

      case "image/jpeg":
        this.fileType = "jpg";
        break;

      case "image/png":
        this.fileType = "png";
        break;

      case "application/pdf":
        this.fileType = "pdf";
        break;

      case "text/plain":
        this.fileType = "txt";
        break;

      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        this.fileType = "docx";
        break;

      case "application/vnd.ms-excel":
        this.fileType = "csv";
        break;

      case "image/svg+xml":
        this.fileType = "svg";
        break;

      case "application/vnd.oasis.opendocument.text":
        this.fileType = "odt";
        break;

      case "application/msword":
        this.fileType = "doc";
        break;

      default:
    }
  }

  documentTypeSelected(formName) {
    this.isDocumentTypeSelected = true;
    this.openAssessment(formName);
    this.getMetaData("");
  }

  async fetchDocumentTypes(event) {
    const req = { Object: "documentType", value: event };
    await this._caseTeam.getSearchList(req).then((data) => {
      this.documentTypesArray = data.dropDown.map((item) => {
        return { form: item.documentType };
      });
      this.documentTypesArray.unshift({ form: "Others" });
      this.metaData = this.documentTypesArray;
      this.searchValue = "";
    });
  }

  dropdownValidation(event) {
    if (this.documentTypeSelection === "forms selected") {
      this.metaData = this.formsMetaData;
      this.isFileUploadSelected = false;
      this.isUploadEnabled = false;
      this.isFileSelected = false;
    } else if (this.documentTypeSelection === "file upload selected") {
      this.fetchDocumentTypes(event);
      this.isFileUploadSelected = true;
    }
  }

  UserInfoValidation() {
    if (this._router.url.slice(-4) === "/new") {
      if (parseInt(localStorage.getItem("UserId"))) {
        const loader = document.getElementById(
          "loading-overlay"
        ) as HTMLElement;
        loader.style.display = "block";
        this._team
          .getUserById({ staffID: parseInt(localStorage.getItem("UserId")) })
          .then((data) => {
            this.cmsAttachment.enteredBy =
              `${data.users.firstName} ${data.users.lastName}` || null;
            this.cmsAttachment.changedBy =
              `${data.users.firstName} ${data.users.lastName}` || null;
            this.staffName = `${data.users.firstName} ${data.users.lastName}`;
            loader.style.display = "none";
          });
      }
    }
  }

  checkCmsNodesForBreadcrums() {
    switch (this.cmsNode) {
      case "Case Activity":
        this._client.storeId(
          parseInt(localStorage.getItem("caseActivityID")) -
            this._openCards.getHasKey()
        );

        if (this.referralName == "FP") {
          this.breadcrumbs.push(
            {
              label: "Case Activity List",
              href: "/reports/referral/family-preservation/case-activity/view",
              active: "",
            },
            {
              label: "Case Activity",
              href: "/reports/referral/family-preservation/case-activity/detail",
              active: "",
            }
          );
        } else if (this.referralName == "RFC") {
          this.breadcrumbs.push(
            {
              label: "Case Activity List",
              href: "/reintegration/referral/opencard/case-activity/view",
              active: "",
            },
            {
              label: "Case Activity",
              href: "/reintegration/referral/opencard/case-activity/detail",
              active: "",
            }
          );
        } else if (this.referralName == "NC-OPS") {
          this.breadcrumbs.push(
            {
              label: "Case Activity List",
              href: "/reintegration/referral/opencard/case-activity/view",
              active: "",
            },
            {
              label: "Case Activity",
              href: "/reintegration/referral/opencard/case-activity/detail",
              active: "",
            }
          );
        } else if (this.referralName == "NC-RFC") {
          this.breadcrumbs.push(
            {
              label: "Case Activity List",
              href: "/reintegration/referral/opencard/case-activity/view",
              active: "",
            },
            {
              label: "Case Activity",
              href: "/reintegration/referral/opencard/case-activity/detail",
              active: "",
            }
          );
        }

        break;
      /////////////// **Switch Break** ///////////////

      case "Assessment":
        this._client.storeId(
          parseInt(localStorage.getItem("assessmentID")) -
            this._openCards.getHasKey()
        );
        if (this.referralName == "FP") {
          this.breadcrumbs.push(
            {
              label: "Assessment List",
              href: "/reports/referral/family-preservation/assessment/view",
              active: "",
            },
            {
              label: "Assessment",
              href: "/reports/referral/family-preservation/assessment/detail",
              active: "",
            }
          );
        } else if (this.referralName == "RFC") {
          this.breadcrumbs.push(
            {
              label: "Assessment List",
              href: "/reintegration/referral/opencard/assessments/view",
              active: "",
            },
            {
              label: "Assessment",
              href: "/reintegration/referral/opencard/assessments/detail",
              active: "",
            }
          );
        }

        break;
      /////////////// **Switch Break** ///////////////

      case "Court Orders":
        this._client.storeId(
          parseInt(localStorage.getItem("courtOrderedID")) -
            this._openCards.getHasKey()
        );
        if (this.referralName == "FP") {
          this.breadcrumbs.push(
            {
              label: "Court Order List",
              href: "/reports/referral/family-preservation/court-order/view",
              active: "",
            },
            {
              label: "Court Order",
              href: "/reports/referral/family-preservation/court-order/detail",
              active: "",
            }
          );
        } else if (this.referralName == "RFC") {
          this.breadcrumbs.push(
            {
              label: "Court Order List",
              href: "/reintegration/referral/opencard/court-order/view",
              active: "",
            },
            {
              label: "Court Order",
              href: "/reintegration/referral/opencard/court-order/detail",
              active: "",
            }
          );
        }

        break;
      case "Case File Activity":
        this._client.storeId(
          parseInt(localStorage.getItem("courtOrderedID")) -
            this._openCards.getHasKey()
        );
        if (this.referralName == "FP") {
          this.breadcrumbs.push(
            {
              label: "Court File Activity List",
              href: "/reports/attachment-document/rfc/case-file-activity",
              active: "",
            },
            { label: "Court File Activity", active: "active" }
          );
        } else if (this.referralName == "RFC") {
          this.breadcrumbs.push(
            {
              label: "Court File Activity List",
              href: "/reports/attachment-document/rfc/case-file-activity",
              active: "",
            },
            { label: "Court File Activity", active: "active" }
          );
        } else if (this.referralName == "NC-OPS") {
          this.breadcrumbs.push(
            {
              label: "Court File Activity List",
              href: "/reports/attachment-document/rfc/case-file-activity",
              active: "",
            },
            { label: "Court File Activity", active: "active" }
          );
        } else if (this.referralName == "NC-RFC") {
          this.breadcrumbs.push(
            {
              label: "Court File Activity List",
              href: "/reports/attachment-document/rfc/case-file-activity",
              active: "",
            },
            { label: "Court File Activity", active: "active" }
          );
        }

        break;
      /////////////// **Switch Break** ///////////////

      default:
        console.log("default passed in attachment navigation");
    }
    this.breadcrumbs.push({ label: "Attachment Document", active: "active" });
  }
  setDocumentTypeCatagory() {
    if (this.documentTypeSelection === "file upload selected") {
      this.documentTypeSelection = "forms selected";
    } else if (this.documentTypeSelection === "forms selected") {
      this.documentTypeSelection = "file upload selected";
    }
  }

  afterFileSelection() {
    this.isFileSelected = true;
  }
}
