import { Component, OnInit } from "@angular/core";
import { Client } from "../person-master/Client/client-form/client";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { RfcReferralService } from "../reintegration/rfc-referral/rfc-referral.service";
import { RfcReferral } from "../reintegration/rfc-referral/rfc-referral";
import {
  PlacementReferral,
  PlacementReferralAutoFecth,
} from "./placement.referral";
import { isNullOrUndefined } from "util";
import { ClientStrength } from "../client-strength-form/client-strength";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CaseTeamService } from "../case-team/case-team.service";
import swal from "sweetalert2";
import { ClientStrengthService } from "../client-strength/client-strength.service";
import { FpExtendedFamily } from "../family-preservation-list/forms/extended-family-fp-form/fp-extended-family";
import { LocalValues } from "../local-values";
import { ClientProfile } from "../client-profile-form/client-profile";
import { PreventativeMeasurements } from "../preventative-measure/preventative-measurements";
import * as moment from "moment";
import { FpAssessments } from "../family-preservation-list/forms/assessment-fp-form/fp-assessments";
import { Appointments } from "../appointments/appointments";
import { MedicationAllergies } from "../medication-allergies-form/medication-allergies";
import { MedicationAllergiesService } from "../medication-allergies/medication-allergies.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ClildFormService } from "../child-forms/child-forms.service";

@Component({
  selector: "app-placement-referral",
  templateUrl: "./placement-referral.component.html",
  styleUrls: ["./placement-referral.component.scss"],
})
export class PlacementReferralComponent implements OnInit {
  clientInfo: Client = new Client();
  caseInfo: RfcReferral = new RfcReferral();
  breadcrumbs = [];
  placementRef: PlacementReferral = new PlacementReferral();
  metaData = [];
  listOfPlacementCareLevel = [];
  listOfCasePlanGoals = [];
  isCareLevelOtherDesc = true;
  listOfDirectors = [];
  listOfDirectorsLevelOfCare = [];
  authorizedRate: any;
  isPrintNavigation = true;
  isClientStrengthForm = false;
  isSiblingsFormOOH = false;
  isFamilyMemberForm = false;
  isPlacementHistoryForm = false;
  isClientProfileForm = false;
  isPreventativeMeasurementForm = false;
  isAssessmentForm = false;
  isAppointmentsForm = false;
  isAppointmentsMedicalForm = false;
  isMedicationForm = false;
  clientName = localStorage.getItem("clientName");
  clientStrengthsList = [];
  clientStrengthList = [];
  clientsSiblingsOohPlacementList = [];
  clientsSiblingsOohPlacementsList = [];
  familyMemberList = [];
  placementHistoryList = [];
  clientsProfileList = [];
  clientsProfileLists = [];
  preventativeMeasuresList = [];
  preventativeMeasuresLists = [];
  assessmentsList = [];
  assessmentsLists = [];
  medicationsList = [];
  medicationsLists = [];
  appointmentsMedicalLists = [];
  appointmentsListsMental = [];
  sibilingsInOOHPlacementList = [];
  appointmentsListsMedical = [];
  currentClientID: number;
  currentReferralID: number;
  strength: ClientStrength = new ClientStrength();
  clientStrengthForm: FormGroup;
  fpExtendedFamily: FpExtendedFamily = new FpExtendedFamily();
  extendedFamilyForm: FormGroup;
  clientProfile: ClientProfile = new ClientProfile();
  clientProfileForm: FormGroup;
  pm: PreventativeMeasurements = new PreventativeMeasurements();
  preventativeMeasurementsForm: FormGroup;
  assessmentType = [];
  mentalAppointment = [];
  filteredAssessmentType = [];
  fpassess: FpAssessments = new FpAssessments();
  assessmentForm: FormGroup;
  appointmentmedicalForm: FormGroup;
  appointmentmentalForm: FormGroup;
  appointmentMental: Appointments = new Appointments();
  appointmentMedical: Appointments = new Appointments();
  medicationForm: FormGroup;
  medication: MedicationAllergies = new MedicationAllergies();
  autoFetch: PlacementReferralAutoFecth = new PlacementReferralAutoFecth();
  currentPlacementReferral: number;
  placementReferralForm: FormGroup;
  selectedStateID: any;
  isEditControl: boolean;
  isCommunityServiceHours = true;
  isPendingCharges = false;
  userName: string;
  userID: number;
  listOfAuthLength = [];
  isDraft: string;
  sibilingsInOOHPlacement = [];
  discardTo = "/reintegration/referral/opencard/placement-referral/view";
  isTabCollapsed = true;
  accordionTabLabel = "Collapse";
  clientAllergies = "";
  clientAllergiesID = null;
  isTierLevelDisabled = true;
  mrddwaiver = "false";
  originalHeight: any;
  isDateIEPdisabled = true;
  isWithdrawDisable = false;
  isDraftDisabled = false;
  isWithDrawal: string;
  isExportsPrompt = false;
  exportFileName: string;
  exportReq = {};
  isExportTextShow = false;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  visitationsList: any;
  placementHistoriesList: any;
  mentalAppointmentsList: any;
  sibInOOHLists = [];
  isEditForm: boolean;
  NewForm: boolean;
  clientStrengthID: any;
  familyReferralID: any;
  clientProfileID: any;
  preventativeID: any;
  assessmentID: any;
  medicationID: any;
  medicalID: any;
  mentalID: any;
  deleteClientStrengthID: any;
  deleteFamilyMemberID: any;
  deleteClientProfileID: any;
  deletemedicationID: any;
  deleteAssessmentID: any;
  deletemedicalApppointmentID: any;
  deleteMentalAppointmentID: any;
  deletePreventativeMeasureID: any;
  isDraftForm = false;
  draftForm = false;

  constructor(
    public _client: ClildFormService,
    public _opencard: OpencardsService,
    public _fb: FormBuilder,
    public _rfc: RfcReferralService,
    public _caseTeam: CaseTeamService,
    public _clientStrength: ClientStrengthService,
    public _localValues: LocalValues,
    public _medications: MedicationAllergiesService,
    public _router: Router,
    public _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentClientID =
      parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey();
    this.currentReferralID =
      parseInt(localStorage.getItem("referralId")) - this._opencard.getHasKey();
    this.currentPlacementReferral = parseInt(
      this._activatedRoute.snapshot.queryParamMap.get("pl_ref_id")
    );
    this.userName = localStorage.getItem("UserEmail")
      ? localStorage.getItem("UserEmail").split("@")[0]
      : "Invalid User";
      if (
        this._router.url.includes(
          "/reintegration/referral/opencard/placement-referral/detail"
        )
      ) {
        this.isEditForm = true;      
        this.isWithdrawDisable = false;
        this.getRecById();
        setTimeout(() => {
          this.draftFormValidation();
        }, 5000);    
    }
      if (
        this._router.url.includes(
          "/reintegration/referral/opencard/placement-referral/new"
        )
      ) {
        this.NewForm = true;
        this.getClientStrengthsList();
        this.getSiblingsInOohList();
        this.getFamilyMemberList();
        this.getPlacementHistoryList();
        this.getClientProfileList();
        this.getPreventativeMeasuresList();
        this.getAssessmentsList();
        this.getAppointmentsMentalList();
        this.getAppointmentsMedicalList();
        this.getMedicationsList();
        this.getPlacementOOHList();
        this.isEditForm = false;
        this.getPlacementReferralNew();
        this.isWithdrawDisable = true;
        this.placementRef.director_StaffID = {
          staffName: "Williams, Rachel",
          staffID: 308,
        };
      } else {
        this.otherInformationValidation(true);
      }  
    this.userID = parseInt(localStorage.getItem("UserId")) || 0;
    this.getCaseInfo();
    this.getAutofecthInfomration();
    this.getPlacementCareLevel();
    this.getCasePlanGoals();
    this.getDirectors();
    this.getDirectorLevelOfCare();
    this.getPlacementAuth();

    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case Form",
        href: "/reintegration/referral/detail",
        active: "",
      },
      {
        label: "Placement Referral List",
        active: "",
        href: "/reintegration/referral/opencard/placement-referral/view",
      },
      { label: "Placement Referral", active: "active" }
    );

    this.clientSubnodeFormValidation();

    this.formValidation();
  }

  draftFormValidation() {
    if (this.isDraftForm) {
      this.getClientStrengthsList();
      this.getSiblingsInOohList();
      this.getFamilyMemberList();
      this.getPlacementHistoryList();
      this.getClientProfileList();
      this.getPreventativeMeasuresList();
      this.getAssessmentsList();
      this.getAppointmentsMentalList();
      this.getAppointmentsMedicalList();
      this.getMedicationsList();
      this.getPlacementOOHList();
      this.getPlacementReferralNew();
    } else {
      this.getClientStrengthsSaveList();
      this.getFamilyMemberSaveList();
      this.getClientProfileSaveList();
      this.getPreventativeMeasuresSaveList();
      this.getAssessmentsSaveList();
      this.getMedicationsSaveList();
      this.getAppointmentsMentalSaveList();
      this.getAppointmentsMedicalSaveList();
      this.getPlacementOOHList();
      this.getPlacementReferral();
    }
  }

  otherInformationValidation(isNewPage) {
    if (isNewPage) {
      // this.isWithdrawDisable = true;
      this.isDraftDisabled = false;
      this.isWithDrawal = "";
    } else {
      if (this.placementRef.statusTypeID) {
        if (this.placementRef.statusTypeID.statusTypeID == 4) {
          // this.isWithdrawDisable = false;
          this.isDraftDisabled = true;
          this.isDraft = "";
          this.isWithDrawal = "No";
        } else if (this.placementRef.statusTypeID.statusTypeID == 13) {
          // this.isWithdrawDisable = true;
          this.isDraftDisabled = false;
        }
      } else {
      }
    }
  }

  getPlacementReferral() {
    let req = {
      placementReferralID:
        this.currentPlacementReferral || this._client.getId(),
      clientID:
        parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey(),
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
        isLinked: true
    };
    this._opencard.getPlacementReferralPrint(req).then((data: any) => {
      this.clientStrengthsList = data.clientStrengthList;
      this.visitationsList = data.visitationList;
      this.clientsProfileList = data.clientProfileList;
      this.preventativeMeasuresList = data.clientPreventativeMeasureList;
      this.assessmentsList = data.assessmentsList;
      this.medicationsList = data.clientMedicationList;
      this.appointmentsMedicalLists = data.appointmentsMedicalList;
      this.sibInOOHLists = data.sibsInOOHList;
      this.placementHistoriesList = data.placementHistoryList;
      this.mentalAppointmentsList = data.appointmentsMentalList;
    });
  }

  getPlacementReferralNew() {
    let req = {
      placementReferralID: 0,
      clientID:
        parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey(),
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
        isLinked: false
    };
    this._opencard.getPlacementReferralPrint(req).then((data: any) => {
      this.placementHistoriesList = data.placementHistoryList;
      this.sibInOOHLists = data.sibsInOOHList;
      data.placementHistoryList.map((history: any) => {
        if (this.placementRef.hasOwnProperty("placementReferralPlacement")) {
          this.placementRef.placementReferralPlacement.push({
            placementID: history.placementID
          }); 
        } else {
          this.placementRef["placementReferralPlacement"] = [];
          this.placementRef["placementReferralPlacement"].push({
            placementID: history.placementID
          });
        }
      })
      data.sibsInOOHList.map((sib: any) => {
        if (this.placementRef.hasOwnProperty("placementReferralSibling")) {
          this.placementRef.placementReferralSibling.push({
            clientSiblingID: sib.clientSiblingID
          }); 
        } else {
          this.placementRef["placementReferralSibling"] = [];
          this.placementRef["placementReferralSibling"].push({
            clientSiblingID: sib.clientSiblingID
          });
        }  
      })
    });
  }

  getCaseInfo() {
    // const loader = document.getElementById('loading-overlay') as HTMLElement
    // loader.style.display = 'block';
    const req = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
    };
    this._rfc.getByIdReferral(req).then((data: any) => {
      // loader.style.display = 'none';
      this.caseInfo = data.referral.caseID;
      this.clientInfo = data.referral.caseID.clientID;
    });
  }

  /**Get autofetch information */

  getAutofecthInfomration() {
    let req = { referralID: this.currentReferralID },
      autofetchData: any;
    this._opencard.getAutoFecthInfoForPlacementRef(req).then((data: any) => {
      autofetchData = data.autofetchDetails[0];
      autofetchData.sEDwithCBS = autofetchData.sEDwithCBS ? "true" : "false";
      autofetchData.diagnosedMRDD = autofetchData.diagnosedMRDD
        ? "true"
        : "false";
      autofetchData.mRDDWaiver = autofetchData.mRDDWaiver ? "true" : "false";
      this.autoFetch = autofetchData;
      if (data.autofetchDetails.length > 0) {
        this.clientAllergies = data.autofetchDetails[0].clientAllergies;
        this.clientAllergiesID = data.autofetchDetails[0].clientAllergiesID;
        this.clientAllergiesID == 0 ? (this.clientAllergiesID = false) : null;
      }

      this._opencard.storePlacementReferralInfo(
        this.placementRef,
        this.autoFetch
      );
    });
  }

  getMetaData(event: any, label: string) {
    let req = { value: event.query };
    switch (label) {
      case "desiredCareLevel":
        this.filterPlacementCareLevel(event);
        break;
      case "casePlanGoal":
        this.filterCasePlanGoals(event);
        break;
      case "director":
        this.filterDirectors(event);
        break;
      case "director_LevelOfCareAuthorizedID":
        this.filterDirectorsLevelOfCare(event);
        break;
      case "state":
        this.getState(event);
        break;
      case "city":
        this.getCityFromSelectedState(event);
        break;
      case "director_AuthorizationLengthID":
        this.filterPlacementReferalAuth(event);
        break;
      case "gradeID":
        req["Object"] = "grade";
        break;
      case "specialEducationTypeID":
        req["Object"] = "specialEducationType";
        break;
      case "strength":
        req["Object"] = "strength";
        break;
      case "source":
        req["Object"] = "strengthInformationSource";
        break;
      case "familyMember":
        req["Object"] = "familyMember";
        break;
      case "relationship":
        req["Object"] = "personType";
        break;
      case "memberType":
        req["Object"] = "familyMemberType";
        break;
      case "restrictionType":
        req["Object"] = "restrictionType";
        break;
      case "frequency":
        req["Object"] = "frequencyType";
        break;
      case "condition":
        req["Object"] = "condition";
        break;
      case "frequency_type":
        req["Object"] = "frequencyType";
        break;
      case "risk":
        req["Object"] = "risk";
        break;
      case "preventativeMeasure":
        req["Object"] = "preventativeMeasure";
        break;
      case "asssessCat":
        req["Object"] = "assessmentGroup";
        break;
      case "frequency_type":
        req["Object"] = "frequencyType";
        break;
      case "risk":
        req["Object"] = "risk";
        break;
      case 'appointmentType':
        req['Object'] = 'appointmentType';
        req['isMedical'] = false;
        req['isMental'] = true;
        break;
      case 'appointmentMedicalType':
        req['Object'] = 'appointmentType';
        req['isMedical'] = true;
        req['isMental'] = false;
        break;
      case "dosage":
        req["Object"] = "dosageType";
        break;
      case "frequency":
        req["Object"] = "frequencyType";
        break;
      case "tierLevelType":
        req["Object"] = "tierLevelType";
        break;
    }
    if ("Object" in req) {
      this._caseTeam.getSearchList(req).then((data: any) => {
        this.metaData = data.dropDown;
      });
    }
  }

  getMentalAppointmentType(event: any) {
    let req = { value: event.query,  'isMedical': false, 'isMental': true };
    this.metaData = [];
    this._opencard.getMentalAppointementDropdown(req).then((data) => {
      this.metaData = data.dropDown;
    });
  }

  getMedicalAppointmentType(event: any) {
    let req = { value: event.query,  'isMedical': true, 'isMental': false };
    this.metaData = [];
    this._opencard.getMentalAppointementDropdown(req).then((data) => {
      this.metaData = data.dropDown;
    });
  }

  savetableFormAction() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";

    if (this.mrddwaiver == "true") {
      this.placementRef.MRDDWaiver = true;
    } else {
      this.placementRef.MRDDWaiver = false;
    }

    this.heightCalculation();

    !isNullOrUndefined(this.placementRef.tierLevelID)
      ? (this.placementRef.tierLevelID = this.placementRef.tierLevelID.tierLevelTypeID)
      : null;
    /**Specific placement requirements (1) */
    !isNullOrUndefined(this.placementRef.careLevelID)
      ? (this.placementRef.careLevelID = this.placementRef.careLevelID.careLevelID)
      : null;
    !isNullOrUndefined(this.placementRef.casePlanGoalID)
      ? (this.placementRef.casePlanGoalID = this.placementRef.casePlanGoalID.casePlanGoalID)
      : null;
    this.placementRef.placementNeeded = this._localValues.stringFormatDatetime(
      Date.parse(this.placementRef.placementNeeded)
    );
    this.placementRef.kinship === "true"
      ? (this.placementRef.kinship = true)
      : false;

    /**Directors authorizations */
    !isNullOrUndefined(this.placementRef.director_StaffID)
      ? (this.placementRef.director_StaffID = this.placementRef.director_StaffID.staffID)
      : null;
    !isNullOrUndefined(this.placementRef.director_LevelOfCareAuthorizedID)
      ? (this.placementRef.director_LevelOfCareAuthorizedID = this.placementRef.director_LevelOfCareAuthorizedID.levelOfCareAuthorizedID)
      : null;
    !isNullOrUndefined(this.placementRef.director_DateAuthorized)
      ? (this.placementRef.director_DateAuthorized = Date.parse(
          this.placementRef.director_DateAuthorized
        ))
      : null;
    !isNullOrUndefined(this.placementRef.dateOfLastIEP)
      ? (this.placementRef.dateOfLastIEP = Date.parse(
          this.placementRef.dateOfLastIEP
        ))
      : null;
    !isNullOrUndefined(this.placementRef.director_AuthorizationLengthID)
      ? (this.placementRef.director_AuthorizationLengthID = this.placementRef.director_AuthorizationLengthID.authorizationLengthID)
      : null;

    /** */
    this.placementRef.anyPendingCharges === "true"
      ? (this.placementRef.anyPendingCharges = true)
      : false;
    this.placementRef.diagnosedMRDD === "true"
      ? (this.placementRef.diagnosedMRDD = true)
      : false;
    this.placementRef.sEDwithCBS === "true"
      ? (this.placementRef.sEDwithCBS = true)
      : false;
    this.placementRef.hasSafetyPlan === "true"
      ? (this.placementRef.hasSafetyPlan = true)
      : false;
    this.placementRef.isInitial === "true"
      ? (this.placementRef.isInitial = true)
      : false;
    this.placementRef.needsCommunityService === "true"
      ? (this.placementRef.needsCommunityService = true)
      : false;
    this.placementRef.needsSafetyPlan === "true"
      ? (this.placementRef.needsSafetyPlan = true)
      : false;
    this.placementRef.no_Run_Order === "true"
      ? (this.placementRef.no_Run_Order = true)
      : false;
    this.placementRef.qualifyMRDD === "true"
      ? (this.placementRef.qualifyMRDD = true)
      : false;
    this.placementRef.reviewedForAccuracy === "true"
      ? (this.placementRef.reviewedForAccuracy = true)
      : false;
    this.placementRef.reviewedForAccuracy === "true"
      ? (this.placementRef.reviewedForAccuracy = true)
      : false;
    this.placementRef.needsGED === "true"
      ? (this.placementRef.needsGED = true)
      : false;
    this.placementRef.isPrivate === "true"
      ? (this.placementRef.isPrivate = true)
      : false;
    this.placementRef.referralID = this.currentReferralID;
    this.placementRef.clientID = this.currentClientID;
    this.autoFetch.cc_ChangedBy = this.userName;
    this.autoFetch.cc_EnteredBy = this.userName;
    this.autoFetch.cc_EnteredBy_StaffID = this.userID;
    this.autoFetch.cc_EnteredBy_StaffName = this.userName;
    this.autoFetch.cc_EnteredDate = Date.now();
    this.autoFetch.cm_EnteredBy = this.userName;
    this.autoFetch.cm_EnteredBy_StaffID = this.userID;
    this.autoFetch.cm_EnteredBy_StaffName = this.userName;
    this.autoFetch.cm_EnteredDate = Date.now();

    !isNullOrUndefined(this.placementRef.doctor_StateID)
      ? (this.placementRef.doctor_StateID = this.placementRef.doctor_StateID.stateID)
      : null;
    !isNullOrUndefined(this.placementRef.dentist_StateID)
      ? (this.placementRef.dentist_StateID = this.placementRef.dentist_StateID.stateID)
      : null;
    !isNullOrUndefined(this.placementRef.eyeDoctor_StateID)
      ? (this.placementRef.eyeDoctor_StateID = this.placementRef.eyeDoctor_StateID.stateID)
      : null;
    !isNullOrUndefined(this.placementRef.psychiatrist_StateID)
      ? (this.placementRef.psychiatrist_StateID = this.placementRef.psychiatrist_StateID.stateID)
      : null;
    !isNullOrUndefined(this.placementRef.doctor_CityID)
      ? (this.placementRef.doctor_CityID = this.placementRef.doctor_CityID.cityID)
      : null;
    !isNullOrUndefined(this.placementRef.dentist_CityID)
      ? (this.placementRef.dentist_CityID = this.placementRef.dentist_CityID.cityID)
      : null;
    !isNullOrUndefined(this.placementRef.eyeDoctor_CityID)
      ? (this.placementRef.eyeDoctor_CityID = this.placementRef.eyeDoctor_CityID.cityID)
      : null;
    !isNullOrUndefined(this.placementRef.psychiatrist_CityID)
      ? (this.placementRef.psychiatrist_CityID = this.placementRef.psychiatrist_CityID.cityID)
      : null;
    !isNullOrUndefined(this.placementRef.gradeID)
      ? (this.placementRef.gradeID = this.placementRef.gradeID.gradeID)
      : null;
    !isNullOrUndefined(this.placementRef.specialEducationTypeID)
      ? (this.placementRef.specialEducationTypeID = this.placementRef.specialEducationTypeID.specialEducationTypeID)
      : null;
    this.placementRef.statusTypeID = this.determineStatusType();
    // delete this.placementRef.medicalDiagnosis;
    let req = Object.assign({}, this.placementRef, this.autoFetch); // combine the placemen referral and autofetch
    req.tierLevelID = this.placementRef.tierLevelID;
    req.clientAllergiesID == 0 ? (req.clientAllergiesID = null) : null;
    delete req.clientAllergies;

    req["isInitial"] = this.placementRef.isInitial === true
       ? true
       : false;
    req["isPrivate"] = this.placementRef.isPrivate === true
       ? true
       : false;
         req["newPlacementShouldHave"] = this.placementRef.newPlacementShouldHave;
         req["newPlacementShouldNotHave"] = this.placementRef.newPlacementShouldNotHave;
         req["childWantsNewPlacementToHave"] = this.placementRef.childWantsNewPlacementToHave;
         req["hobbiesInterests"] = this.placementRef.hobbiesInterests;
         req["interventions"] = this.placementRef.interventions;
         req["strengthsBasedDescriptionOfChild"] = this.placementRef.strengthsBasedDescriptionOfChild;
         req["medicalDiagnosis"] = this.placementRef.medicalDiagnosis;
         req["mentalDiagnosis"] = this.placementRef.mentalDiagnosis;
    if (this.clientAllergiesID) {
      req["clientAllergies"] = {
        clientAllergiesID: this.clientAllergiesID,
        allergies: this.clientAllergies,
        notificationDate: null,
        client: this.currentClientID,
      };
    } else {
      req["clientAllergies"] = {
        allergies: this.clientAllergies,
        notificationDate: null,
        client: this.currentClientID,
      };
    }
      this._opencard.savePlacementReferral(req).then((data: any) => {
        if (data.responseStatus) {
          this._opencard.storePlacementReferralInfo(
            data.placementReferral,
            this.autoFetch
          );
          this._client.storeId(data.placementReferral.placementReferralID);
          loader.style.display = "none";
        }
      });
    } 

  formAction() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";

    if (this.mrddwaiver == "true") {
      this.placementRef.MRDDWaiver = true;
    } else {
      this.placementRef.MRDDWaiver = false;
    }

    this.heightCalculation();

    !isNullOrUndefined(this.placementRef.tierLevelID)
      ? (this.placementRef.tierLevelID = this.placementRef.tierLevelID.tierLevelTypeID)
      : null;
    /**Specific placement requirements (1) */
    !isNullOrUndefined(this.placementRef.careLevelID)
      ? (this.placementRef.careLevelID = this.placementRef.careLevelID.careLevelID)
      : null;
    !isNullOrUndefined(this.placementRef.casePlanGoalID)
      ? (this.placementRef.casePlanGoalID = this.placementRef.casePlanGoalID.casePlanGoalID)
      : null;
    this.placementRef.placementNeeded = this._localValues.stringFormatDatetime(
      Date.parse(this.placementRef.placementNeeded)
    );
    this.placementRef.kinship === "true"
      ? (this.placementRef.kinship = true)
      : false;

    /**Directors authorizations */
    !isNullOrUndefined(this.placementRef.director_StaffID)
      ? (this.placementRef.director_StaffID = this.placementRef.director_StaffID.staffID)
      : null;
    !isNullOrUndefined(this.placementRef.director_LevelOfCareAuthorizedID)
      ? (this.placementRef.director_LevelOfCareAuthorizedID = this.placementRef.director_LevelOfCareAuthorizedID.levelOfCareAuthorizedID)
      : null;
    !isNullOrUndefined(this.placementRef.director_DateAuthorized)
      ? (this.placementRef.director_DateAuthorized = Date.parse(
          this.placementRef.director_DateAuthorized
        ))
      : null;
    !isNullOrUndefined(this.placementRef.dateOfLastIEP)
      ? (this.placementRef.dateOfLastIEP = Date.parse(
          this.placementRef.dateOfLastIEP
        ))
      : null;
    !isNullOrUndefined(this.placementRef.director_AuthorizationLengthID)
      ? (this.placementRef.director_AuthorizationLengthID = this.placementRef.director_AuthorizationLengthID.authorizationLengthID)
      : null;

    /** */
    this.placementRef.anyPendingCharges === "true"
      ? (this.placementRef.anyPendingCharges = true)
      : false;
    this.placementRef.diagnosedMRDD === "true"
      ? (this.placementRef.diagnosedMRDD = true)
      : false;
    this.placementRef.sEDwithCBS === "true"
      ? (this.placementRef.sEDwithCBS = true)
      : false;
    this.placementRef.hasSafetyPlan === "true"
      ? (this.placementRef.hasSafetyPlan = true)
      : false;
    this.placementRef.isInitial === "true"
      ? (this.placementRef.isInitial = true)
      : false;
    this.placementRef.needsCommunityService === "true"
      ? (this.placementRef.needsCommunityService = true)
      : false;
    this.placementRef.needsSafetyPlan === "true"
      ? (this.placementRef.needsSafetyPlan = true)
      : false;
    this.placementRef.no_Run_Order === "true"
      ? (this.placementRef.no_Run_Order = true)
      : false;
    this.placementRef.qualifyMRDD === "true"
      ? (this.placementRef.qualifyMRDD = true)
      : false;
    this.placementRef.reviewedForAccuracy === "true"
      ? (this.placementRef.reviewedForAccuracy = true)
      : false;
    this.placementRef.reviewedForAccuracy === "true"
      ? (this.placementRef.reviewedForAccuracy = true)
      : false;
    this.placementRef.needsGED === "true"
      ? (this.placementRef.needsGED = true)
      : false;
    this.placementRef.isPrivate === "true"
      ? (this.placementRef.isPrivate = true)
      : false;
    this.placementRef.referralID = this.currentReferralID;
    this.placementRef.clientID = this.currentClientID;
    this.autoFetch.cc_ChangedBy = this.userName;
    this.autoFetch.cc_EnteredBy = this.userName;
    this.autoFetch.cc_EnteredBy_StaffID = this.userID;
    this.autoFetch.cc_EnteredBy_StaffName = this.userName;
    this.autoFetch.cc_EnteredDate = Date.now();
    this.autoFetch.cm_EnteredBy = this.userName;
    this.autoFetch.cm_EnteredBy_StaffID = this.userID;
    this.autoFetch.cm_EnteredBy_StaffName = this.userName;
    this.autoFetch.cm_EnteredDate = Date.now();

    !isNullOrUndefined(this.placementRef.doctor_StateID)
      ? (this.placementRef.doctor_StateID = this.placementRef.doctor_StateID.stateID)
      : null;
    !isNullOrUndefined(this.placementRef.dentist_StateID)
      ? (this.placementRef.dentist_StateID = this.placementRef.dentist_StateID.stateID)
      : null;
    !isNullOrUndefined(this.placementRef.eyeDoctor_StateID)
      ? (this.placementRef.eyeDoctor_StateID = this.placementRef.eyeDoctor_StateID.stateID)
      : null;
    !isNullOrUndefined(this.placementRef.psychiatrist_StateID)
      ? (this.placementRef.psychiatrist_StateID = this.placementRef.psychiatrist_StateID.stateID)
      : null;
    !isNullOrUndefined(this.placementRef.doctor_CityID)
      ? (this.placementRef.doctor_CityID = this.placementRef.doctor_CityID.cityID)
      : null;
    !isNullOrUndefined(this.placementRef.dentist_CityID)
      ? (this.placementRef.dentist_CityID = this.placementRef.dentist_CityID.cityID)
      : null;
    !isNullOrUndefined(this.placementRef.eyeDoctor_CityID)
      ? (this.placementRef.eyeDoctor_CityID = this.placementRef.eyeDoctor_CityID.cityID)
      : null;
    !isNullOrUndefined(this.placementRef.psychiatrist_CityID)
      ? (this.placementRef.psychiatrist_CityID = this.placementRef.psychiatrist_CityID.cityID)
      : null;
    !isNullOrUndefined(this.placementRef.gradeID)
      ? (this.placementRef.gradeID = this.placementRef.gradeID.gradeID)
      : null;
    !isNullOrUndefined(this.placementRef.specialEducationTypeID)
      ? (this.placementRef.specialEducationTypeID = this.placementRef.specialEducationTypeID.specialEducationTypeID)
      : null;
    this.placementRef.statusTypeID = this.determineStatusType();
    // delete this.placementRef.medicalDiagnosis;
    let req = Object.assign({}, this.placementRef, this.autoFetch); // combine the placemen referral and autofetch
    req.tierLevelID = this.placementRef.tierLevelID;
    req.clientAllergiesID == 0 ? (req.clientAllergiesID = null) : null;
    delete req.clientAllergies;
    req["sEDwithCBS"] = this.placementRef.sEDwithCBS === true
       ? true
       : false;
    req["diagnosedMRDD"] = this.placementRef.diagnosedMRDD === true
       ? true
       : false;
    req["isInitial"] = this.placementRef.isInitial === true
       ? true
       : false;
    req["isPrivate"] = this.placementRef.isPrivate === true
       ? true
       : false;
       if (this.isEditForm) {
         req["newPlacementShouldHave"] = this.placementRef.newPlacementShouldHave;
         req["newPlacementShouldNotHave"] = this.placementRef.newPlacementShouldNotHave;
         req["childWantsNewPlacementToHave"] = this.placementRef.childWantsNewPlacementToHave;
         req["hobbiesInterests"] = this.placementRef.hobbiesInterests;
         req["interventions"] = this.placementRef.interventions;
         req["strengthsBasedDescriptionOfChild"] = this.placementRef.strengthsBasedDescriptionOfChild;
         req["medicalDiagnosis"] = this.placementRef.medicalDiagnosis;
         req["mentalDiagnosis"] = this.placementRef.mentalDiagnosis;
       } else {
        req["newPlacementShouldHave"] = this.autoFetch.newPlacementShouldHave;
        req["newPlacementShouldNotHave"] = this.autoFetch.newPlacementShouldNotHave;
        req["childWantsNewPlacementToHave"] = this.autoFetch.childWantsNewPlacementToHave;
        req["hobbiesInterests"] = this.autoFetch.hobbiesInterests;
        req["interventions"] = this.autoFetch.interventions;
        req["strengthsBasedDescriptionOfChild"] = this.autoFetch.strengthsBasedDescriptionOfChild;
        req["medicalDiagnosis"] = this.autoFetch.medicalDiagnosis;
        req["mentalDiagnosis"] = this.autoFetch.mentalDiagnosis;
       }
       if (this.NewForm && this.placementRef.statusTypeID === 13) {
         this.draftForm = true;
       } 
       if (this.isEditForm && (this.placementRef.statusTypeID === 13 || (this.placementRef.statusTypeID !== 4 && this.isDraftForm == true))) {
         this.draftForm = true;
       }
       if (this.draftForm == true) {
        delete req.placementReferralClientStrength;
        delete req.placementReferralVisitation;
        delete req.placementReferralSibling;
        delete req.placementReferralClientProfile;
        delete req.placementReferralPreventativeMeasure;
        delete req.placementReferralAssessment;
        delete req.placementReferralMedication;
        delete req.placementReferralAppointment;
        delete req.placementReferralPlacement;
      }
    if (this.clientAllergiesID) {
      req["clientAllergies"] = {
        clientAllergiesID: this.clientAllergiesID,
        allergies: this.clientAllergies,
        notificationDate: null,
        client: this.currentClientID,
      };
    } else {
      req["clientAllergies"] = {
        allergies: this.clientAllergies,
        notificationDate: null,
        client: this.currentClientID,
      };
    }

    if (this.placementRef.placementReferralID) {
      this._opencard.savePlacementReferral(req).then((data: any) => {
        if (data.responseStatus) {
          this._opencard.storePlacementReferralInfo(
            data.placementReferral,
            this.autoFetch
          );
          this._client.storeId(data.placementReferral.placementReferralID);
          swal("Update", "Placement referral has been updated!", "success");
          loader.style.display = "none";
          this._router.navigate([
            "/reintegration/referral/opencard/placement-referral/view",
          ], { queryParamsHandling: "preserve" });
        }
      });
    } else {
      this._opencard.savePlacementReferral(req).then((data: any) => {
        if (data.responseStatus) {
          this._opencard.storePlacementReferralInfo(
            data.placementReferral,
            this.autoFetch
          );
          this._client.storeId(data.placementReferral.placementReferralID);
          swal("Save", "Placement referral has been created!", "success");
          loader.style.display = "none";
          this._router.navigate([
            "/reintegration/referral/opencard/placement-referral/view",
          ], { queryParamsHandling: "preserve" });
        }
      });
    }

    // } else {
    //   swal('Info', 'Please fill the mandatory fields', 'info');
    // }
  }

  /** Get metadata */
  getPlacementCareLevel() {
    this._opencard.getPlacementLevel().then((data: any) => {
      this.listOfPlacementCareLevel = data.careLevel;
    });
  }

  getCasePlanGoals() {
    this._opencard.getPlacementReferralCasePlanGoals().then((data: any) => {
      this.listOfCasePlanGoals = data.casePlanGoals;
    });
  }

  getDirectors() {
    this._opencard.getPlacementReferralDirectors().then((data: any) => {
      this.listOfDirectors = data.directorAuthorizationStaff;
    });
  }

  getDirectorLevelOfCare() {
    this._opencard
      .getPlacementReferralDirectorsLevelOfCare()
      .then((data: any) => {
        this.listOfDirectorsLevelOfCare = data.levelOfCareAuthorized;
      });
  }

  getPlacementAuth() {
    this._opencard.getPlacementReferralAuthLength().then((data: any) => {
      this.listOfAuthLength = data.authorizationLength;
    });
  }

  /** Filtered the metadata list */
  filterPlacementCareLevel(event: any) {
    this.metaData = [];
    this.listOfPlacementCareLevel.filter((item: any) => {
      if (item.careLevel.indexOf(event.query) !== -1) {
        this.metaData.push(item);
      }
    });
  }

  filterCasePlanGoals(event: any) {
    this.metaData = [];
    this.listOfCasePlanGoals.filter((item: any) => {
      if (item.casePlanGoal.indexOf(event.query) !== -1) {
        this.metaData.push(item);
      }
    });
  }

  filterDirectors(event: any) {
    this.metaData = [];
    this.listOfDirectors.filter((item: any) => {
      if (item.staffName.indexOf(event.query) !== -1) {
        this.metaData.push(item);
      }
    });
  }

  filterDirectorsLevelOfCare(event: any) {
    this.metaData = [];
    this.listOfDirectorsLevelOfCare.filter((item: any) => {
      if (item.levelOfCareAuthorized.indexOf(event.query) !== -1) {
        if (
          item.levelOfCareAuthorizedID !== 1 &&
          item.levelOfCareAuthorizedID !== 2 &&
          item.levelOfCareAuthorizedID !== 3 &&
          item.levelOfCareAuthorizedID !== 4
        ) {
          this.metaData.push(item);
        }
      }
    });
  }

  filterPlacementReferalAuth(event: any) {
    this.metaData = [];
    this.listOfAuthLength.filter((item: any) => {
      if (item.authorizationLength.indexOf(event.query) !== -1) {
        this.metaData.push(item);
      }
    });
  }

  /**Get modal nodes list */

  getClientStrengthsList() {
    let list;
    const clientStrengthReq = { openCard: "ClientStrength", beginPagination: 1, endPagination: 100 }
    this._opencard.listViewOfClientOpencards(this.currentClientID, clientStrengthReq)
      .then((data: any) => { 
        this.clientStrengthList = data.openCardList;
        this.placementRef.placementReferralClientStrength = [...new Set(data.openCardList.map(item => list = { 'clientStrengthID': item.clientStrengthID }))];
          this.placementRef.placementReferralClientStrength.reduce((unique, i) => {
            if (unique.some(strength => strength.clientStrengthID === i.clientStrengthID )) {
              unique.push(i);
            } else {
              unique.push(i);
            }
            return unique;
          }, []);
    });
  }
  getClientStrengthsSaveList() {
    let list;
    const clientStrengthReq = { openCard: "ClientStrength", beginPagination: 1, endPagination: 100 }
    this._opencard.listViewOfClientOpencards(this.currentClientID, clientStrengthReq)
      .then((data: any) => { 
        this.clientStrengthList = data.openCardList;
    });
  }

  getSiblingsInOohList() {}

  getFamilyMemberList() {
    let list;
    const familyMemberReq = {
      referralID: this.currentReferralID,
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "familyMemberReferralID", mode: "desc" },
    };
    this._opencard.getExtendedFamilyList(familyMemberReq).then((data: any) => {
      this.clientsSiblingsOohPlacementsList = data.FamilyMemberReferral;
      this.placementRef.placementReferralVisitation = [...new Set(data.FamilyMemberReferral.map(item => list = { 'familyMemberReferralID': item.familyMemberReferralID }))];
          this.placementRef.placementReferralVisitation.reduce((unique, i) => {
            if (unique.some(family => family.familyMemberReferralID === i.familyMemberReferralID )) {
              unique.push(i);
            } else {
              unique.push(i);
            }
            return unique;
          }, []);
    });
  }
  getFamilyMemberSaveList() {
    let list;
    const familyMemberReq = {
      referralID: this.currentReferralID,
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "familyMemberReferralID", mode: "desc" },
    };
    this._opencard.getExtendedFamilyList(familyMemberReq).then((data: any) => {
      this.clientsSiblingsOohPlacementsList = data.FamilyMemberReferral;
    });
  }

  getPlacementHistoryList() {}

  getClientProfileList() {
    let list;
    const clientProfileReq = {
      openCard: "ClientProfile",
      beginPagination: 1,
      endPagination: 100,
    };
    this._opencard
      .listViewOfClientOpencards(this.currentClientID, clientProfileReq)
      .then((data: any) => {
        this.clientsProfileLists = data.openCardList;
        this.placementRef.placementReferralClientProfile = [...new Set(data.openCardList.map(item => list = { 'clientProfileID': item.clientProfileID }))];
          this.placementRef.placementReferralClientProfile.reduce((unique, i) => {
            if (unique.some(profile => profile.clientProfileID === i.clientProfileID )) {
              unique.push(i);
            } else {
              unique.push(i);
            }
            return unique;
          }, []);
        });
  }
  getClientProfileSaveList() {
    const clientProfileReq = {
      openCard: "ClientProfile",
      beginPagination: 1,
      endPagination: 100,
    };
    this._opencard
      .listViewOfClientOpencards(this.currentClientID, clientProfileReq)
      .then((data: any) => {
        this.clientsProfileLists = data.openCardList;
      });
  }

  getPreventativeMeasuresList() {
    let list;
    const preventativeMeasuresList = {
      openCard: "ClientPreventativeMeasure",
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "clientPreventativeMeasureID", mode: "desc" },
    };
    this._opencard
      .listViewOfClientOpencards(this.currentClientID, preventativeMeasuresList)
      .then((data: any) => {
        this.preventativeMeasuresLists = data.openCardList;
        this.placementRef.placementReferralPreventativeMeasure = [...new Set(data.openCardList.map(item => list = { 'clientPreventativeMeasureID': item.clientPreventativeMeasureID }))];
          this.placementRef.placementReferralPreventativeMeasure.reduce((unique, i) => {
            if (unique.some(pm => pm.clientPreventativeMeasureID === i.clientPreventativeMeasureID )) {
              unique.push(i);
            } else {
              unique.push(i);
            }
            return unique;
          }, []);
      });
  }

  getPreventativeMeasuresSaveList() {
    const preventativeMeasuresList = {
      openCard: "ClientPreventativeMeasure",
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "clientPreventativeMeasureID", mode: "desc" },
    };
    this._opencard
      .listViewOfClientOpencards(this.currentClientID, preventativeMeasuresList)
      .then((data: any) => {
        this.preventativeMeasuresLists = data.openCardList;
      });
  }

  getAssessmentsList() {
    let list;
    const assessmentsListReq = {
      referralID: this.currentReferralID,
      clientID: this.currentClientID,
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "assessmentID", mode: "desc" },
    };
    this._opencard
      .getAssessementsByClient(assessmentsListReq)
      .then((data: any) => {
        this.assessmentsLists = data.assessment;
        this.placementRef.placementReferralAssessment = [...new Set(data.assessment.map(item => list = { 'assessmentID': item.assessmentID }))];
          this.placementRef.placementReferralAssessment.reduce((unique, i) => {
            if (unique.some(assessment => assessment.assessmentID === i.assessmentID )) {
              unique.push(i);
            } else {
              unique.push(i);
            }
            return unique;
          }, []);
      });
  }

  getAssessmentsSaveList() {
    const assessmentsListReq = {
      referralID: this.currentReferralID,
      clientID: this.currentClientID,
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "assessmentID", mode: "desc" },
    };
    this._opencard
      .getAssessementsByClient(assessmentsListReq)
      .then((data: any) => {
        this.assessmentsLists = data.assessment;
      });
  }

  getMedicationsList() {
    let list;
    const medicationsList = {
      openCard: "ClientMedication",
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "ClientMedicationID", mode: "desc" },
    };
    this._opencard
      .listViewOfClientOpencards(this.currentClientID, medicationsList)
      .then((data: any) => {
        this.medicationsLists = data.openCardList;
        this.placementRef.placementReferralMedication = [...new Set(data.openCardList.map(item => list = { 'clientMedicationID': item.clientMedicationID }))];
          this.placementRef.placementReferralMedication.reduce((unique, i) => {
            if (unique.some(medication => medication.clientMedicationID === i.clientMedicationID )) {
              unique.push(i);
            } else {
              unique.push(i);
            }
            return unique;
          }, []);
      });
  }

  getMedicationsSaveList() {
    const medicationsList = {
      openCard: "ClientMedication",
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "ClientMedicationID", mode: "desc" },
    };
    this._opencard
      .listViewOfClientOpencards(this.currentClientID, medicationsList)
      .then((data: any) => {
        this.medicationsLists = data.openCardList;
      });
  }

  getAppointmentsMedicalList() {
    let list;
    const appointmentsReq =
      { referralID: this.currentReferralID, beginPagination: 1, endPagination: 100, sort: { "column": "appointmentID", "mode": "desc" }, 'isMedical': true,
      'isMental': false }
    this._opencard.listAllAppointments(appointmentsReq)
      .then((data: any) => { 
        this.appointmentsListsMedical = data.appointment;
        // this.placementRef.placementReferralAppointment = [...new Set(data.appointment.map(item => list = { 'appointmentID': item.appointmentID }))];
        //   this.placementRef.placementReferralAppointment.reduce((unique, i) => {
        //     if (unique.some(medicalAppointment => medicalAppointment.appointmentID === i.appointmentID )) {
        //       unique.push(i);
        //     } else {
        //       unique.push(i);
        //     }
        //     return unique;
        //   }, []);
        data.appointment.map((appointment: any) => {
          if (this.placementRef.hasOwnProperty("placementReferralAppointment")) {
            this.placementRef["placementReferralAppointment"].push({
              appointmentID: appointment.appointmentID,
            }); 
            } else {
              this.placementRef["placementReferralAppointment"] = [];
              this.placementRef["placementReferralAppointment"].push({
                appointmentID: appointment.appointmentID,
              }); 
            }   
        });
      })
  }

  getAppointmentsMedicalSaveList () {
    const appointmentsReq =
    { referralID: this.currentReferralID, beginPagination: 1, endPagination: 100, sort: { "column": "appointmentID", "mode": "desc" }, 'isMedical': true,
    'isMental': false }
  this._opencard.listAllAppointments(appointmentsReq)
    .then((data: any) => { 
      this.appointmentsListsMedical = data.appointment;
    });
  }

  getAppointmentsMentalList() {
    let list;
    const appointmentsReq =
      { referralID: this.currentReferralID, beginPagination: 1, endPagination: 100, sort: { "column": "appointmentID", "mode": "desc" }, 'isMedical': false,
      'isMental': true }
    this._opencard.listAllAppointments(appointmentsReq)
      .then((data: any) => { 
        this.appointmentsListsMental = data.appointment; 
        data.appointment.map((appointment: any) => {
          if (this.placementRef.hasOwnProperty("placementReferralAppointment")) {
            this.placementRef["placementReferralAppointment"].push({
              appointmentID: appointment.appointmentID,
            }); 
            } else {
              this.placementRef["placementReferralAppointment"] = [];
              this.placementRef["placementReferralAppointment"].push({
                appointmentID: appointment.appointmentID,
              }); 
            }   
        });
      })
  }

  getAppointmentsMentalSaveList() {
    const appointmentsReq =
      { referralID: this.currentReferralID, beginPagination: 1, endPagination: 100, sort: { "column": "appointmentID", "mode": "desc" }, 'isMedical': false,
      'isMental': true }
    this._opencard.listAllAppointments(appointmentsReq)
      .then((data: any) => { 
        this.appointmentsListsMental = data.appointment; 
      })
  }


  getPlacementOOHList() {
    const placementOOHList = {
      referralID: this.currentReferralID,
      clientID: this.currentClientID,
    };
    this._opencard.listAllSibilings(placementOOHList).then((data: any) => {
       this.sibilingsInOOHPlacement = data.sibOOH;
    });
  }

  /**Subnode actions */

  onSubnodeRowclick(node: string, data: any) {
    this.subnodeGetById(node, data);
  }

  subNodeFormAction(node: string, data: any) {
    if (node === "client_strength") {
      // this.placementRef.placementReferralClientStrength.push({ clientStrengthID: data.strengthID.strengthID });
      if (this.clientStrengthForm.valid) {
        data.clientStrengthID
          ? this.subnodeUpdate(node, data)
          : this.subnodeSave(node, data);
        this.isClientStrengthForm = false;
      } else {
        this.warning();
      }
    }

    if (node === "extended_familymember") {
      // this.placementRef.placementReferralVisitation.push({ familyMemberReferralID: data.familyMemberID.familyMemberID });
      if (this.extendedFamilyForm.valid) {
        data.familyMemberReferralID
          ? this.subnodeUpdate(node, data)
          : this.subnodeSave(node, data);
        this.isFamilyMemberForm = false;
      } else {
        this.warning();
      }
    }

    if (node === "client_profile") {
      // this.placementRef.placementReferralClientProfile.push({
      //   clientProfileID: data.clientProfileID.clientProfileID,
      // });
      if (this.clientProfileForm.valid) {
        data.clientProfileID
          ? this.subnodeUpdate(node, data)
          : this.subnodeSave(node, data);
        this.isClientProfileForm = false;
      } else {
        this.warning();
      }
    }

    if (node === "preventative_measurements") {
      // this.placementRef.placementReferralPreventativeMeasure.push({ clientProfileID: data.clientProfileID.clientProfileID });
      if (this.preventativeMeasurementsForm.valid) {
        data.clientPreventativeMeasureID
          ? this.subnodeUpdate(node, data)
          : this.subnodeSave(node, data);
        this.isPreventativeMeasurementForm = false;
      } else {
        this.warning();
      }
    }

    if (node === "assesments") {
      // this.placementRef.placementReferralPreventativeMeasure.push({ clientProfileID: data.clientProfileID.clientProfileID });
      if (this.assessmentForm.valid) {
        data.assessmentID
          ? this.subnodeUpdate(node, data)
          : this.subnodeSave(node, data);
        this.isAssessmentForm = false;
      } else {
        this.warning();
      }
    }

    if (node === "mental") {
      // this.placementRef.placementReferralPreventativeMeasure.push({ clientProfileID: data.clientProfileID.clientProfileID });
      if (this.appointmentmentalForm.valid) {
        data.appointmentID
          ? this.subnodeUpdate(node, data)
          : this.subnodeSave(node, data);
        this.isAppointmentsForm = false;
      } else {
        this.warning();
      }
    }

    if (node === 'medical') {
      // this.placementRef.placementReferralPreventativeMeasure.push({ clientProfileID: data.clientProfileID.clientProfileID });
      if (this.appointmentmedicalForm.valid) {
        data.appointmentID ? this.subnodeUpdate(node, data) : this.subnodeSave(node, data);
        this.isAppointmentsMedicalForm = false;
      }
      else {
        this.warning();
      }
    }

    if (node === 'medications') {
      // this.placementRef.placementReferralPreventativeMeasure.push({ clientProfileID: data.clientProfileID.clientProfileID });
      if (this.medicationForm.valid) {
        data.clientMedicationID
          ? this.subnodeUpdate(node, data)
          : this.subnodeSave(node, data);
        this.isMedicationForm = false;
      } else {
        this.warning();
      }
    }
  }

  /**Subnode form validation */

  clientSubnodeFormValidation() {
    /**Client strength form */
    this.clientStrengthForm = this._fb.group({
      StrengthID: [null, Validators.compose([Validators.required])],
      strengthInformationSourceID: [
        null,
        Validators.compose([Validators.required]),
      ],
      current: [null],
      explanation: [null, Validators.compose([Validators.required])],
    });
    /**Extended family form (Visitations) */
    this.extendedFamilyForm = this._fb.group({
      familyMemberID: [null, Validators.compose([Validators.required])],
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      personTypeID: [null, Validators.compose([Validators.required])],
      familyMemberTypeID: [null, Validators.compose([Validators.required])],
      restrictionTypeID: [null, Validators.compose([Validators.required])],
      IsCourtOrderedRestriction: [null],
      frequencyTypeID: [null, Validators.compose([Validators.required])],
      isCourtOrderedFrequency: [null],
      notes: [null],
      referralID: [null],
      isRemovalParent: [null],
      annualHouseholdIncome: [null],
      numberLivingInHousehold: [null],
      isSingleParentHousehold: [null],
      familyRefused: [null],
    });

    /**Client profile form  */

    this.clientProfileForm = this._fb.group({
      condition: [null, Validators.compose([Validators.required])],
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      lastOccurrence: [null],
      frequency_type: [null, Validators.compose([Validators.required])],
      risk: [null, Validators.compose([Validators.required])],
      note_any_injuries: [null],
      be_protected: [null],
      triggers: [null],
      notificationDate: [null],
      notes: [null, Validators.compose([Validators.required])],
    });

    /**Preventative measurements form */

    this.preventativeMeasurementsForm = this._fb.group({
      preventativeMeasureID: [null, Validators.compose([Validators.required])],
      notes: [null, Validators.compose([Validators.required])],
      beginDate: [null],
      endDate: [null],
    });

    /**Assessments form */

    this.assessmentForm = this._fb.group({
      assessmentCategory: [null],
      assessmentTypeID: [null],
      dueDate: [null],
      completedDate: [null],
      dateSentToSRS: [null],
      assessmentValue: [null],
      isOnTime: [null],
      isAccurate: [null],
      isNA: [null],
      notes: [null],
    });

    /**Appointments form */

    this.appointmentmedicalForm = this._fb.group({
      appointmentTypeID: [null, Validators.compose([Validators.required])],
      fromReferral: [null],
      notes: [null],
      when: [null, Validators.compose([Validators.required])],
      where: [null, Validators.compose([Validators.required])],
      withWhom: [null],
      yesNoPendingID: [null],
    });

    this.appointmentmentalForm = this._fb.group({
      appointmentTypeID: [null, Validators.compose([Validators.required])],
      fromReferral: [null],
      notes: [null],
      when: [null, Validators.compose([Validators.required])],
      where: [null, Validators.compose([Validators.required])],
      withWhom: [null],
      yesNoPendingID: [null],
    });

    /**Medication form */
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

  /**Subnode crud actions */
  subnodeSave(node: string, data: any) {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    switch (node) {
      case "client_strength":
        if (this.isEditForm && !this.isDraftForm) {
          !isNullOrUndefined(data.strengthID)
        ? (data.strengthID = data.strengthID.strengthID)
        : null;
      !isNullOrUndefined(data.strengthInformationSourceID)
        ? (data.strengthInformationSourceID =
            data.strengthInformationSourceID.strengthInformationSourceID)
        : null;
      data.clientID = this.currentClientID;
        this._clientStrength.saveClientStrength(data).then((data: any) => {
          if (data.responseStatus) {
            this.clientStrengthID = data.clientStrength.clientStrengthID
            this.placementRef["placementReferralClientStrength"] = [];
            this.placementRef["placementReferralClientStrength"].push({
              clientStrengthID: this.clientStrengthID
            });
            loader.style.display = "none";
            this.strength = new ClientStrength();
            this.savetableFormAction();
            setTimeout(() => {
              this.getPlacementReferral();
            }, 5000);
          }
          this.placementRef["placementReferralClientStrength"] = [];
        });
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.strengthID)
        ? (data.strengthID = data.strengthID.strengthID)
        : null;
      !isNullOrUndefined(data.strengthInformationSourceID)
        ? (data.strengthInformationSourceID =
            data.strengthInformationSourceID.strengthInformationSourceID)
        : null;
      data.clientID = this.currentClientID;
        this._clientStrength.saveClientStrength(data).then((data: any) => {
          if (data.responseStatus) {
            this.placementRef["placementReferralClientStrength"] = [];
            this.placementRef["placementReferralClientStrength"].push({
              clientStrengthID: data.clientStrength.clientStrengthID,
            });
            loader.style.display = "none";
            this.strength = new ClientStrength();
            this.getClientStrengthsList();
          }
        });
      }
        break;

      case "extended_familymember":
        if (this.isEditForm && !this.isDraftForm) {
          !isNullOrUndefined(data.familyMemberID)
          ? (data.familyMemberID = data.familyMemberID.familyMemberID)
          : null;
        !isNullOrUndefined(data.familyMemberTypeID)
          ? (data.familyMemberTypeID =
              data.familyMemberTypeID.familyMemberTypeID)
          : null;
        !isNullOrUndefined(data.frequencyTypeID)
          ? (data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID)
          : null;
        !isNullOrUndefined(data.personTypeID)
          ? (data.personTypeID = data.personTypeID.personTypeID)
          : null;
        !isNullOrUndefined(data.restrictionTypeID)
          ? (data.restrictionTypeID = data.restrictionTypeID.restrictionTypeID)
          : null;
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = Date.parse(data.beginDate))
          : null;
        !isNullOrUndefined(data.endDate)
          ? (data.endDate = Date.parse(data.endDate))
          : null;
        data.referralID = this.currentReferralID;
        this._opencard.saveExtendedFamily(data).then((data: any) => {
          if (data.responseStatus) {
            this.familyReferralID = data.FamilyMemberReferral.familyMemberReferralID;
            this.placementRef["placementReferralVisitation"] = [];
            this.placementRef["placementReferralVisitation"].push({
              familyMemberReferralID: this.familyReferralID
            });    
            loader.style.display = "none";
            this.fpExtendedFamily = new FpExtendedFamily();
            this.savetableFormAction();
            setTimeout(() => {
              this.getPlacementReferral();
            }, 5000);
          }
          this.placementRef["placementReferralVisitation"] = [];
        });
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
          !isNullOrUndefined(data.familyMemberID)
          ? (data.familyMemberID = data.familyMemberID.familyMemberID)
          : null;
        !isNullOrUndefined(data.familyMemberTypeID)
          ? (data.familyMemberTypeID =
              data.familyMemberTypeID.familyMemberTypeID)
          : null;
        !isNullOrUndefined(data.frequencyTypeID)
          ? (data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID)
          : null;
        !isNullOrUndefined(data.personTypeID)
          ? (data.personTypeID = data.personTypeID.personTypeID)
          : null;
        !isNullOrUndefined(data.restrictionTypeID)
          ? (data.restrictionTypeID = data.restrictionTypeID.restrictionTypeID)
          : null;
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = Date.parse(data.beginDate))
          : null;
        !isNullOrUndefined(data.endDate)
          ? (data.endDate = Date.parse(data.endDate))
          : null;
        data.referralID = this.currentReferralID;
        this._opencard.saveExtendedFamily(data).then((data: any) => {
          if (data.responseStatus) {
            this.placementRef["placementReferralVisitation"] = [];
            this.placementRef["placementReferralVisitation"].push({
              familyMemberReferralID:
                data.FamilyMemberReferral.familyMemberReferralID,
            });    
            loader.style.display = "none";
            this.fpExtendedFamily = new FpExtendedFamily();
            this.getFamilyMemberList();
          }
        });
        }
        break;

      case "client_profile":
        if (this.isEditForm && !this.isDraftForm) {
          !isNullOrUndefined(data.beginDate) ? data.beginDate = Date.parse(data.beginDate) : null;
        !isNullOrUndefined(data.endDate) ? data.endDate = Date.parse(data.endDate) : null;
        data.lastOccurrence = this._localValues.stringFormatDatetime(data.lastOccurrence);
        !isNullOrUndefined(data.notificationDate) ? data.notificationDate = Date.parse(data.notificationDate) : null;
        !isNullOrUndefined(data.conditionID) ? data.conditionID = data.conditionID.conditionID : null;
        !isNullOrUndefined(data.frequencyTypeID) ? data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID : null;
        !isNullOrUndefined(data.riskID) ? data.riskID = data.riskID.riskID : null;
        data.clientID = this.currentClientID;
        this._caseTeam.saveClientProfile(data).then((data: any) => {
          if (data.responseStatus) {
            this.clientProfileID = data.clientProfile.clientProfileID;
            this.placementRef["placementReferralClientProfile"] = [];
            this.placementRef["placementReferralClientProfile"].push({
              clientProfileID: this.clientProfileID
            }); 
            loader.style.display = "none";
            this.clientProfile = new ClientProfile();
            this.savetableFormAction();
            setTimeout(() => {
              this.getPlacementReferral();
            }, 5000);
          }
          this.placementRef["placementReferralClientProfile"] = [];
        });
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.beginDate) ? data.beginDate = Date.parse(data.beginDate) : null;
        !isNullOrUndefined(data.endDate) ? data.endDate = Date.parse(data.endDate) : null;
        data.lastOccurrence = this._localValues.stringFormatDatetime(data.lastOccurrence);
        !isNullOrUndefined(data.notificationDate) ? data.notificationDate = Date.parse(data.notificationDate) : null;
        !isNullOrUndefined(data.conditionID) ? data.conditionID = data.conditionID.conditionID : null;
        !isNullOrUndefined(data.frequencyTypeID) ? data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID : null;
        !isNullOrUndefined(data.riskID) ? data.riskID = data.riskID.riskID : null;
        data.clientID = this.currentClientID;
        this._caseTeam.saveClientProfile(data).then((data: any) => {
          if (data.responseStatus) {
            this.placementRef["placementReferralClientProfile"] = [];
            this.placementRef["placementReferralClientProfile"].push({
              clientProfileID: data.clientProfile.clientProfileID,
            }); 
            loader.style.display = "none";
            this.clientProfile = new ClientProfile();
            this.getClientProfileList();
          }
        });
      }
        break;

      case "preventative_measurements":
        if (this.isEditForm && !this.isDraftForm) {
          !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = Date.parse(data.beginDate))
          : null;
        !isNullOrUndefined(data.endDate)
          ? (data.endDate = Date.parse(data.endDate))
          : null;
        !isNullOrUndefined(data.preventativeMeasureID)
          ? (data.preventativeMeasureID =
              data.preventativeMeasureID.preventativeMeasureID)
          : null;
        data.clientID = this.currentClientID;
        this._opencard.savePm(data).then((data: any) => {
          if (data.responseStatus) {
            this.preventativeID = data.clientPreventativeMeasure.clientPreventativeMeasureID;
            this.placementRef["placementReferralPreventativeMeasure"] = [];
            this.placementRef["placementReferralPreventativeMeasure"].push({
              clientPreventativeMeasureID: this.preventativeID
            }); 
            loader.style.display = "none";
            this.pm = new PreventativeMeasurements();
            this.savetableFormAction();
            setTimeout(() => {
              this.getPlacementReferral();
            }, 5000);
          }
          this.placementRef["placementReferralPreventativeMeasure"] = [];
        });
        }
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = Date.parse(data.beginDate))
          : null;
        !isNullOrUndefined(data.endDate)
          ? (data.endDate = Date.parse(data.endDate))
          : null;
        !isNullOrUndefined(data.preventativeMeasureID)
          ? (data.preventativeMeasureID =
              data.preventativeMeasureID.preventativeMeasureID)
          : null;
        data.clientID = this.currentClientID;
        this._opencard.savePm(data).then((data: any) => {
          if (data.responseStatus) {
            this.placementRef["placementReferralPreventativeMeasure"] = [];
            this.placementRef["placementReferralPreventativeMeasure"].push({
              clientPreventativeMeasureID:
                data.clientPreventativeMeasure.clientPreventativeMeasureID,
            }); 
            loader.style.display = "none";
            this.pm = new PreventativeMeasurements();
            this.getPreventativeMeasuresList();
          }
        });
      }
        break;

      case "assesments":
        if (this.isEditForm && !this.isDraftForm) {
          !isNullOrUndefined(data.assessmentTypeID)
          ? (data.assessmentTypeID = data.assessmentTypeID.assessmentTypeID)
          : null;
        !isNullOrUndefined(data.completedDate)
          ? (data.completedDate = Date.parse(data.completedDate))
          : null;
        !isNullOrUndefined(data.dateSentToSRS)
          ? (data.dateSentToSRS = Date.parse(data.dateSentToSRS))
          : null;
        !isNullOrUndefined(data.dueDate)
          ? (data.dueDate = Date.parse(data.dueDate))
          : null;
        data.clientID = this.currentClientID;
        data.referralID = this.currentReferralID;
          this._opencard.saveAsssessments(data).then((data: any) => {
            if (data.responseStatus) {
              this.assessmentID = data.assessment.assessmentID;
              this.placementRef["placementReferralAssessment"] = [];
              this.placementRef["placementReferralAssessment"].push({
                assessmentID: this.assessmentID
              }); 
              loader.style.display = "none";
              this.fpassess = new FpAssessments();
              this.savetableFormAction();
            setTimeout(() => {
              this.getPlacementReferral();
            }, 5000);
            }
            this.placementRef["placementReferralAssessment"] = [];
          });
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.assessmentTypeID)
        ? (data.assessmentTypeID = data.assessmentTypeID.assessmentTypeID)
        : null;
      !isNullOrUndefined(data.completedDate)
        ? (data.completedDate = Date.parse(data.completedDate))
        : null;
      !isNullOrUndefined(data.dateSentToSRS)
        ? (data.dateSentToSRS = Date.parse(data.dateSentToSRS))
        : null;
      !isNullOrUndefined(data.dueDate)
        ? (data.dueDate = Date.parse(data.dueDate))
        : null;
      data.clientID = this.currentClientID;
      data.referralID = this.currentReferralID;
        this._opencard.saveAsssessments(data).then((data: any) => {
          if (data.responseStatus) {
            this.placementRef["placementReferralAssessment"] = [];
            this.placementRef["placementReferralAssessment"].push({
              assessmentID: data.assessment.assessmentID,
            }); 
            loader.style.display = "none";
            this.fpassess = new FpAssessments();
            this.getAssessmentsList();
          }
        });
      }
        break;

      case 'mental':
        if (this.isEditForm && !this.isDraftForm) {
          this.getAppointmentsMentalSaveList();
        !isNullOrUndefined(data.when)
        ? (data.when = Date.parse(data.when))
        : null;
      !isNullOrUndefined(data.appointmentTypeID)
        ? (data.appointmentTypeID = data.appointmentTypeID.appointmentTypeID)
        : null;
      data.referralID = this.currentReferralID;
        this._opencard.saveAppointments(data).then((data: any) => {
          if (data.responseStatus) {
            this.mentalID = data.appointment.appointmentID;
            if (this.placementRef.hasOwnProperty("placementReferralAppointment")) {
            this.placementRef.placementReferralAppointment.push({
              appointmentID: this.mentalID
            }); 
          } else {
            this.placementRef["placementReferralAppointment"] = [];
            this.placementRef["placementReferralAppointment"].push({
              appointmentID: this.mentalID
            }); 
          }
            loader.style.display = 'none';
            this.appointmentMental = new Appointments();
            this.savetableFormAction();
            setTimeout(() => {
              this.getPlacementReferral();
            }, 5000);
          }
          this.placementRef["placementReferralAppointment"] = [];
        })
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.when)
        ? (data.when = Date.parse(data.when))
        : null;
      !isNullOrUndefined(data.appointmentTypeID)
        ? (data.appointmentTypeID = data.appointmentTypeID.appointmentTypeID)
        : null;
      data.referralID = this.currentReferralID;
        this._opencard.saveAppointments(data).then((data: any) => {
          if (this.placementRef.hasOwnProperty("placementReferralAppointment")) {
            this.placementRef.placementReferralAppointment.push({
              appointmentID: data.appointment.appointmentID
            }); 
          } else {
            this.placementRef["placementReferralAppointment"] = [];
            this.placementRef["placementReferralAppointment"].push({
              appointmentID: data.appointment.appointmentID
            }); 
          }    
            loader.style.display = 'none';
            this.appointmentMental = new Appointments();
            this.getAppointmentsMentalSaveList();
        })
      }
        break;

      case 'medical':
        if (this.isEditForm && !this.isDraftForm) {
          this.getAppointmentsMedicalSaveList();
          !isNullOrUndefined(data.when)
          ? (data.when = Date.parse(data.when))
          : null;
        !isNullOrUndefined(data.appointmentTypeID)
          ? (data.appointmentTypeID = data.appointmentTypeID.appointmentTypeID)
          : null;
        data.referralID = this.currentReferralID;
        this._opencard.saveAppointments(data).then((data: any) => {
          if (data.responseStatus) {
            this.medicalID = data.appointment.appointmentID;
            if (this.placementRef.hasOwnProperty("placementReferralAppointment")) {
            this.placementRef["placementReferralAppointment"].push({
              appointmentID: this.medicalID
            }); 
            } else {
              this.placementRef["placementReferralAppointment"] = [];
              this.placementRef["placementReferralAppointment"].push({
                appointmentID: this.medicalID
              }); 
            }          
            loader.style.display = 'none';
            this.appointmentMedical = new Appointments();
            this.savetableFormAction();
            setTimeout(() => {
              this.getPlacementReferral();
            }, 5000);
          }
          this.placementRef["placementReferralAppointment"] = [];
        });
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.when)
          ? (data.when = Date.parse(data.when))
          : null;
        !isNullOrUndefined(data.appointmentTypeID)
          ? (data.appointmentTypeID = data.appointmentTypeID.appointmentTypeID)
          : null;
        data.referralID = this.currentReferralID;
        this._opencard.saveAppointments(data).then((data: any) => {
          if (this.placementRef.hasOwnProperty("placementReferralAppointment")) {
            this.placementRef.placementReferralAppointment.push({
              appointmentID: data.appointment.appointmentID
            }); 
          } else {
            this.placementRef["placementReferralAppointment"] = [];
            this.placementRef["placementReferralAppointment"].push({
              appointmentID: data.appointment.appointmentID
            }); 
          }            
            loader.style.display = 'none';
            this.appointmentMedical = new Appointments();
            this.getAppointmentsMedicalSaveList();
         });
        }
        break;

      case "medications":
        if (this.isEditForm && !this.isDraftForm) {
          !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = Date.parse(data.beginDate))
          : null;
        !isNullOrUndefined(data.endDate)
          ? (data.endDate = Date.parse(data.endDate))
          : null;
        !isNullOrUndefined(data.dosageTypeID)
          ? (data.dosageTypeID = data.dosageTypeID =
              data.dosageTypeID.dosageTypeID)
          : null;
        !isNullOrUndefined(data.frequencyTypeID)
          ? (data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID)
          : null;
        data.client = this.currentClientID;
          this._medications.saveMedication(data).then((data: any) => {
            if (data.responseStatus) {
              this.medicationID = data.clientMedication.clientMedicationID;
              this.placementRef["placementReferralMedication"] = [];
              this.placementRef["placementReferralMedication"].push({
                clientMedicationID: this.medicationID
              });
              loader.style.display = "none";
             this.medication = new MedicationAllergies();
             this.savetableFormAction();
             setTimeout(() => {
               this.getPlacementReferral();
             }, 5000);
            }
            this.placementRef["placementReferralMedication"] = [];
          });
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.beginDate)
        ? (data.beginDate = Date.parse(data.beginDate))
        : null;
      !isNullOrUndefined(data.endDate)
        ? (data.endDate = Date.parse(data.endDate))
        : null;
      !isNullOrUndefined(data.dosageTypeID)
        ? (data.dosageTypeID = data.dosageTypeID =
            data.dosageTypeID.dosageTypeID)
        : null;
      !isNullOrUndefined(data.frequencyTypeID)
        ? (data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID)
        : null;
      data.client = this.currentClientID;
        this._medications.saveMedication(data).then((data: any) => {
          if (data.responseStatus) {
            this.placementRef["placementReferralMedication"] = [];
            this.placementRef["placementReferralMedication"].push({
              clientMedicationID: data.clientMedication.clientMedicationID,
            });
            loader.style.display = "none";
           this.medication = new MedicationAllergies();
            this.getMedicationsList();
          }
        });
      }
        break;
    }
  }

  subnodeUpdate(node: string, data: any) {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    switch (node) {
      case "client_strength":
        if (this.isEditForm && !this.isDraftForm) {
        !isNullOrUndefined(data.strengthID)
          ? (data.strengthID = data.strengthID.strengthID)
          : null;
        !isNullOrUndefined(data.strengthInformationSourceID)
          ? (data.strengthInformationSourceID =
              data.strengthInformationSourceID.strengthInformationSourceID)
          : null;
        this._clientStrength.updateClientStrength(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = "none";
            this.strength = new ClientStrength();
            this.getPlacementReferral();
          }
        });
      } 
      if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.strengthID)
          ? (data.strengthID = data.strengthID.strengthID)
          : null;
        !isNullOrUndefined(data.strengthInformationSourceID)
          ? (data.strengthInformationSourceID =
              data.strengthInformationSourceID.strengthInformationSourceID)
          : null;
        this._clientStrength.updateClientStrength(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = "none";
            this.strength = new ClientStrength();
            this.getClientStrengthsSaveList();
          }
        });
      }
        break;

      case "extended_familymember":
        if (this.isEditForm && !this.isDraftForm) {
        !isNullOrUndefined(data.familyMemberID)
          ? (data.familyMemberID = data.familyMemberID.familyMemberID)
          : null;
        !isNullOrUndefined(data.familyMemberTypeID)
          ? (data.familyMemberTypeID =
              data.familyMemberTypeID.familyMemberTypeID)
          : null;
        !isNullOrUndefined(data.frequencyTypeID)
          ? (data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID)
          : null;
        !isNullOrUndefined(data.personTypeID)
          ? (data.personTypeID = data.personTypeID.personTypeID)
          : null;
        !isNullOrUndefined(data.restrictionTypeID)
          ? (data.restrictionTypeID = data.restrictionTypeID.restrictionTypeID)
          : null;
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = Date.parse(data.beginDate))
          : null;
        !isNullOrUndefined(data.endDate)
          ? (data.endDate = Date.parse(data.endDate))
          : null;
        data.referralID = this.currentReferralID;
        this._opencard.saveExtendedFamily(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = "none";
            this.fpExtendedFamily = new FpExtendedFamily();
            this.getPlacementReferral();
          }
        });
      } 
      if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.familyMemberID)
          ? (data.familyMemberID = data.familyMemberID.familyMemberID)
          : null;
        !isNullOrUndefined(data.familyMemberTypeID)
          ? (data.familyMemberTypeID =
              data.familyMemberTypeID.familyMemberTypeID)
          : null;
        !isNullOrUndefined(data.frequencyTypeID)
          ? (data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID)
          : null;
        !isNullOrUndefined(data.personTypeID)
          ? (data.personTypeID = data.personTypeID.personTypeID)
          : null;
        !isNullOrUndefined(data.restrictionTypeID)
          ? (data.restrictionTypeID = data.restrictionTypeID.restrictionTypeID)
          : null;
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = Date.parse(data.beginDate))
          : null;
        !isNullOrUndefined(data.endDate)
          ? (data.endDate = Date.parse(data.endDate))
          : null;
        data.referralID = this.currentReferralID;
        this._opencard.saveExtendedFamily(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = "none";
            this.fpExtendedFamily = new FpExtendedFamily();
            this.getFamilyMemberSaveList();
          }
        });
      }
        break;

      case "client_profile":
        if (this.isEditForm && !this.isDraftForm) {
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = Date.parse(data.beginDate))
          : null;
        !isNullOrUndefined(data.endDate)
          ? (data.endDate = Date.parse(data.endDate))
          : null;
        data.lastOccurrence = this._localValues.stringFormatDatetime(data.lastOccurrence);
        !isNullOrUndefined(data.notificationDate)
          ? (data.notificationDate = Date.parse(data.notificationDate))
          : null;
        !isNullOrUndefined(data.conditionID)
          ? (data.conditionID = data.conditionID.conditionID)
          : null;
        !isNullOrUndefined(data.frequencyTypeID)
          ? (data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID)
          : null;
        !isNullOrUndefined(data.riskID)
          ? (data.riskID = data.riskID.riskID)
          : null;
        data.clientID = this.currentClientID;
        this._caseTeam.updateClientProfile(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = "none";
            this.clientProfile = new ClientProfile();
            this.getPlacementReferral();
          }
        });
      } 
      if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = Date.parse(data.beginDate))
          : null;
        !isNullOrUndefined(data.endDate)
          ? (data.endDate = Date.parse(data.endDate))
          : null;
        data.lastOccurrence = this._localValues.stringFormatDatetime(data.lastOccurrence);
        !isNullOrUndefined(data.notificationDate)
          ? (data.notificationDate = Date.parse(data.notificationDate))
          : null;
        !isNullOrUndefined(data.conditionID)
          ? (data.conditionID = data.conditionID.conditionID)
          : null;
        !isNullOrUndefined(data.frequencyTypeID)
          ? (data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID)
          : null;
        !isNullOrUndefined(data.riskID)
          ? (data.riskID = data.riskID.riskID)
          : null;
        data.clientID = this.currentClientID;
        this._caseTeam.updateClientProfile(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = "none";
            this.clientProfile = new ClientProfile();
            this.getClientProfileSaveList();
          }
        });
      }
        break;

      case "preventative_measurements":
        if (this.isEditForm && !this.isDraftForm) {
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = Date.parse(data.beginDate))
          : null;
        !isNullOrUndefined(data.endDate)
          ? (data.endDate = Date.parse(data.endDate))
          : null;
        !isNullOrUndefined(data.preventativeMeasureID)
          ? (data.preventativeMeasureID =
              data.preventativeMeasureID.preventativeMeasureID)
          : null;
        data.clientID = this.currentClientID;
        this._opencard.updatePm(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = "none";
            this.pm = new PreventativeMeasurements();
            this.getPlacementReferral();
          }
        });
      } 
      if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = Date.parse(data.beginDate))
          : null;
        !isNullOrUndefined(data.endDate)
          ? (data.endDate = Date.parse(data.endDate))
          : null;
        !isNullOrUndefined(data.preventativeMeasureID)
          ? (data.preventativeMeasureID =
              data.preventativeMeasureID.preventativeMeasureID)
          : null;
        data.clientID = this.currentClientID;
        this._opencard.updatePm(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = "none";
            this.pm = new PreventativeMeasurements();
            this.getPreventativeMeasuresSaveList();
          }
        });
      }
        break;

      case "assesments":
        if (this.isEditForm && !this.isDraftForm) {
        !isNullOrUndefined(data.assessmentTypeID)
          ? (data.assessmentTypeID = data.assessmentTypeID.assessmentTypeID)
          : null;
        !isNullOrUndefined(data.completedDate)
          ? (data.completedDate = Date.parse(data.completedDate))
          : null;
        !isNullOrUndefined(data.dateSentToSRS)
          ? (data.dateSentToSRS = Date.parse(data.dateSentToSRS))
          : null;
        !isNullOrUndefined(data.dueDate)
          ? (data.dueDate = Date.parse(data.dueDate))
          : null;
        data.clientID = this.currentClientID;
        data.referralID = this.currentReferralID;
        this._opencard.updateAssessments(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = "none";
            this.fpassess = new FpAssessments();
            this.getPlacementReferral();
          }
        });
      } 
      if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.assessmentTypeID)
          ? (data.assessmentTypeID = data.assessmentTypeID.assessmentTypeID)
          : null;
        !isNullOrUndefined(data.completedDate)
          ? (data.completedDate = Date.parse(data.completedDate))
          : null;
        !isNullOrUndefined(data.dateSentToSRS)
          ? (data.dateSentToSRS = Date.parse(data.dateSentToSRS))
          : null;
        !isNullOrUndefined(data.dueDate)
          ? (data.dueDate = Date.parse(data.dueDate))
          : null;
        data.clientID = this.currentClientID;
        data.referralID = this.currentReferralID;
        this._opencard.updateAssessments(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = "none";
            this.fpassess = new FpAssessments();
            this.getAssessmentsSaveList();
          }
        });
      }
        break;

      case "mental":
        if (this.isEditForm && !this.isDraftForm) {
        !isNullOrUndefined(data.when)
          ? (data.when = Date.parse(data.when))
          : null;
        !isNullOrUndefined(data.appointmentTypeID)
          ? (data.appointmentTypeID = data.appointmentTypeID.appointmentTypeID)
          : null;
        data.referralID = this.currentReferralID;
        this._opencard.updateAppointments(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = 'none';
            this.appointmentMental = new Appointments();
            this.getPlacementReferral();
          }
        })
      } 
      if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.when)
          ? (data.when = Date.parse(data.when))
          : null;
        !isNullOrUndefined(data.appointmentTypeID)
          ? (data.appointmentTypeID = data.appointmentTypeID.appointmentTypeID)
          : null;
        data.referralID = this.currentReferralID;
        this._opencard.updateAppointments(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = 'none';
            this.appointmentMental = new Appointments();
            this.getAppointmentsMentalSaveList();
          }
        })
      }
        break;

      case 'medical':
        if (this.isEditForm && !this.isDraftForm) {
        !isNullOrUndefined(data.when) ? data.when = Date.parse(data.when) : null;
        !isNullOrUndefined(data.appointmentTypeID) ? data.appointmentTypeID = data.appointmentTypeID.appointmentTypeID : null;
        data.referralID = this.currentReferralID;
        this._opencard.updateAppointments(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = 'none';
            this.appointmentMedical = new Appointments();
            this.getPlacementReferral();
          }
        });
      } 
      if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.when) ? data.when = Date.parse(data.when) : null;
        !isNullOrUndefined(data.appointmentTypeID) ? data.appointmentTypeID = data.appointmentTypeID.appointmentTypeID : null;
        data.referralID = this.currentReferralID;
        this._opencard.updateAppointments(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = 'none';
            this.appointmentMedical = new Appointments();
            this.getAppointmentsMedicalSaveList();
          }
        });
      }
        break;

      case "medications":
        if (this.isEditForm && !this.isDraftForm) {
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = Date.parse(data.beginDate))
          : null;
        !isNullOrUndefined(data.endDate)
          ? (data.endDate = Date.parse(data.endDate))
          : null;
        !isNullOrUndefined(data.dosageTypeID)
          ? (data.dosageTypeID = data.dosageTypeID =
              data.dosageTypeID.dosageTypeID)
          : null;
        !isNullOrUndefined(data.frequencyTypeID)
          ? (data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID)
          : null;
        data.client = this.currentClientID;
        this._medications.updateMedication(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = "none";
           this.medication = new MedicationAllergies();
            this.getPlacementReferral();
          }
        });
      } 
      if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = Date.parse(data.beginDate))
          : null;
        !isNullOrUndefined(data.endDate)
          ? (data.endDate = Date.parse(data.endDate))
          : null;
        !isNullOrUndefined(data.dosageTypeID)
          ? (data.dosageTypeID = data.dosageTypeID =
              data.dosageTypeID.dosageTypeID)
          : null;
        !isNullOrUndefined(data.frequencyTypeID)
          ? (data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID)
          : null;
        data.client = this.currentClientID;
        this._medications.updateMedication(data).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = "none";
           this.medication = new MedicationAllergies();
            this.getMedicationsSaveList();
          }
        });
      }
        break;
    }
  }

  onSubnodeRowdelete(node: string, data: any) {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {};
    switch (node) {
      case "client_strength":
        if (this.isEditForm && !this.isDraftForm) {
          this.deleteClientStrengthID = data.clientStrengthID;
          let req = { 
            clientStrengthID: data.clientStrengthID,
            placementReferralID:
            this.currentPlacementReferral || this._client.getId(),
          };
          this._opencard.placementReferralDelete(req).then((data: any) => {
          if (data.responseStatus) {
            loader.style.display = "none";
            setTimeout(() => {
              this.clientStrengthDelete()
            }, 1000);
            setTimeout(() => {
              this.getPlacementReferral();
            }, 2000);
          }
        });
      } 
      if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
        req = { clientStrengthID: data.clientStrengthID };
        this._opencard.deleteClientStrength(req).then((data: any) => {
          if (data.responseStatus) {
            this.getClientStrengthsSaveList();
          loader.style.display = "none";
          }
        });
      }
        break;
      case "extended_familymember":
        if (this.isEditForm && !this.isDraftForm) {
          this.deleteFamilyMemberID = data.familyMemberReferralID;
          req = { 
            familyMemberReferralID: data.familyMemberReferralID,
            placementReferralID:
            this.currentPlacementReferral || this._client.getId(),
          };
          this._opencard.placementReferralDelete(req).then((data: any) => {
            if (data.responseStatus) {
              loader.style.display = "none";
              setTimeout(() => {
                this.familyMemberDelete()
              }, 1000);
              setTimeout(() => {
                this.getPlacementReferral();
              }, 2000);
            }
          });
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
          req = { familyMemberReferralID: data.familyMemberReferralID };
          this._opencard.deleteExtendedFamily(req).then((data: any) => {
            if (data.responseStatus) {
              this.getFamilyMemberSaveList();
              loader.style.display = "none";
            }
          });
        }
        break;
      case "client_profile":
        if (this.isEditForm && !this.isDraftForm) {
          this.deleteClientProfileID = data.clientProfileID;
          req = { 
            clientProfileID: data.clientProfileID,
            placementReferralID:
            this.currentPlacementReferral || this._client.getId(),
          };
          this._opencard.placementReferralDelete(req).then((data: any) => {
            if (data.responseStatus) {
              loader.style.display = "none";
              setTimeout(() => {
                this.clientProfileDelete()
              }, 1000);
              setTimeout(() => {
                this.getPlacementReferral();
              }, 2000);
            }
          });
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
          req = { clientProfileID: data.clientProfileID };
          this._opencard.deleteClientProfile(req).then((data: any) => {
            if (data.responseStatus) {
              this.getClientProfileSaveList();
              loader.style.display = "none";
            }
          });
        }
        break;
      case "preventative_measurements":
        if (this.isEditForm && !this.isDraftForm) {
          this.deletePreventativeMeasureID = data.clientPreventativeMeasureID;
          req = { 
            clientPreventativeMeasureID: data.clientPreventativeMeasureID,
            placementReferralID:
            this.currentPlacementReferral || this._client.getId(),
          };
          this._opencard.placementReferralDelete(req).then((data: any) => {
            if (data.responseStatus) {
              loader.style.display = "none";
              setTimeout(() => {
                this.preventativeMeasureDelete()
              }, 1000);
              setTimeout(() => {
                this.getPlacementReferral();
              }, 2000);
            }
          });
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
          req = { clientPreventativeMeasureID: data.clientPreventativeMeasureID };
          this._opencard.deletePreventativeMeasures(req).then((data: any) => {
            if (data.responseStatus) {
              this.getPreventativeMeasuresSaveList();
              loader.style.display = "none";
            }
          });
        }
        break;  
      case "assesments":
        if (this.isEditForm && !this.isDraftForm) {
          this.deleteAssessmentID = data.assessmentID;
          req = { 
            assessmentID: data.assessmentID,
            placementReferralID:
            this.currentPlacementReferral || this._client.getId(),
          };
          this._opencard.placementReferralDelete(req).then((data: any) => {
            if (data.responseStatus) {
              loader.style.display = "none";
              setTimeout(() => {
                this.assessmentDelete()
              }, 1000);
              setTimeout(() => {
                this.getPlacementReferral();
              }, 2000);
            }
          });
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
          req = { assessmentID: data.assessmentID };
          this._opencard.deleteAssessment(req).then((data: any) => {
            if (data.responseStatus) {
              this.getAssessmentsSaveList();
              loader.style.display = "none";
            }
          });
        }
        break; 
      case "medical":
        if (this.isEditForm && !this.isDraftForm) {
          this.deletemedicalApppointmentID = data.appointmentID;
          req = { 
          appointmentID: data.appointmentID,
          placementReferralID:
          this.currentPlacementReferral || this._client.getId(),
        };
        this._opencard.placementReferralDelete(req).then((data: any) => {
            if (data.responseStatus) {
              loader.style.display = "none";
              setTimeout(() => {
                this.medicalAppointmentDelete()
              }, 1000);
              setTimeout(() => {
                this.getPlacementReferral();
              }, 2000);
            }
          });
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
          req = { appointmentID: data.appointmentID };
          this._opencard.deleteAppointment(req).then((data: any) => {
            if (data.responseStatus) {
              this.getAppointmentsMedicalSaveList();
            loader.style.display = "none";
            }
          });
        }
        break;  
      case "mental":
        if (this.isEditForm && !this.isDraftForm) {
          this.deleteMentalAppointmentID = data.appointmentID;
          req = { 
            appointmentID: data.appointmentID,
            placementReferralID:
            this.currentPlacementReferral || this._client.getId(),
          };
          this._opencard.placementReferralDelete(req).then((data: any) => {
            if (data.responseStatus) {
              loader.style.display = "none";
              setTimeout(() => {
                this.mentalAppointmentDelete()
              }, 1000);
              setTimeout(() => {
                this.getPlacementReferral();
              }, 2000);
            }
          });
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
          req = { appointmentID: data.appointmentID };
          this._opencard.deleteAppointment(req).then((data: any) => {
            if (data.responseStatus) {
              this.getAppointmentsMentalSaveList();
              loader.style.display = "none";
            }
          });
        }
        break;  
      case "medications":
        if (this.isEditForm && !this.isDraftForm) {
          this.deletemedicationID = data.clientMedicationID;
          let req = { 
            clientMedicationID: data.clientMedicationID,
            placementReferralID:
            this.currentPlacementReferral || this._client.getId(),
          };
          this._opencard.placementReferralDelete(req).then((data: any) => {
            if (data.responseStatus) {
              loader.style.display = "none";
              setTimeout(() => {
                this.medicationDelete()
              }, 1000);
              setTimeout(() => {
                this.getPlacementReferral();
              }, 2000);
            }
          });
        } 
        if (this.NewForm || (this.isEditForm && this.isDraftForm)) {
          req = { clientMedicationID: data.clientMedicationID };
          this._opencard.deleteClientMedication(req).then((data: any) => {
            if (data.responseStatus) {
              this.getMedicationsSaveList();
              loader.style.display = "none";
            }
          });
        }
        break;  
    }
  }

  subnodeGetById(node: string, data: any) {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {};
    switch (node) {
      case "client_strength":
        /**conversions,assign the result sets, validate and open window */
        this._clientStrength
          .getClientStrengthRecord(data.clientStrengthID)
          .then((data: any) => {
            if (data.responseStatus) {
              this.strength = data.clientStrength;
              this.isClientStrengthForm = true;
              loader.style.display = "none";
            }
          });
        break;

      case "extended_familymember":
        req = { familyMemberReferralID: data.familyMemberReferralID };
        this._opencard.getExtendedFamilyById(req).then((data: any) => {
          if (data.responseStatus) {
            !isNullOrUndefined(data.FamilyMemberReferral.beginDate)
              ? (data.FamilyMemberReferral.beginDate = new Date(
                  data.FamilyMemberReferral.beginDate
                ))
              : null;
            !isNullOrUndefined(data.FamilyMemberReferral.endDate)
              ? (data.FamilyMemberReferral.endDate = new Date(
                  data.FamilyMemberReferral.endDate
                ))
              : null;
            !isNullOrUndefined(data.FamilyMemberReferral.familyMemberID)
              ? (data.FamilyMemberReferral.familyMemberID = {
                  name: `${data.FamilyMemberReferral.familyMemberID.lastName},${data.FamilyMemberReferral.familyMemberID.firstName}`,
                })
              : null;
            this.fpExtendedFamily = data.FamilyMemberReferral;
            this.isFamilyMemberForm = true;
            loader.style.display = "none";
          }
        });
        break;

      case "client_profile":
       req = { clientProfileID: data.clientProfileID };
        this._caseTeam.getClientProfileById(req).then((data: any) => {
          if (data.responseStatus) {
            !isNullOrUndefined(data.clientProfile.beginDate)
              ? (data.clientProfile.beginDate = new Date(
                  data.clientProfile.beginDate
                ))
              : null;
            !isNullOrUndefined(data.clientProfile.endDate)
              ? (data.clientProfile.endDate = new Date(
                  data.clientProfile.endDate
                ))
              : null;
            !isNullOrUndefined(data.clientProfile.lastOccurrence)
              ? (data.clientProfile.lastOccurrence = new Date(
                  data.clientProfile.lastOccurrence
                ))
              : null;
            !isNullOrUndefined(data.clientProfile.notificationDate)
              ? (data.clientProfile.notificationDate = new Date(
                  data.clientProfile.notificationDate
                ))
              : null;
            this.clientProfile = data.clientProfile;
            this.isClientProfileForm = true;
            loader.style.display = "none";
          }
        });
        break;

      case "preventative_measurements":
        req = { clientPreventativeMeasureID: data.clientPreventativeMeasureID };
        this._opencard.getByIdPm(req).then((data: any) => {
          if (data.responseStatus) {
            !isNullOrUndefined(data.clientPreventativeMeasure.beginDate)
              ? (data.clientPreventativeMeasure.beginDate = new Date(
                  data.clientPreventativeMeasure.beginDate
                ))
              : null;
            !isNullOrUndefined(data.clientPreventativeMeasure.endDate)
              ? (data.clientPreventativeMeasure.endDate = new Date(
                  data.clientPreventativeMeasure.endDate
                ))
              : null;
            this.pm = data.clientPreventativeMeasure;
            this.isPreventativeMeasurementForm = true;
            loader.style.display = "none";
          }
        });
        break;

      case "assesments":
        let assessmentGroup;
        req = { assessmentID: data.assessmentID };
        this._opencard.getAssessmentRec(req).then((data: any) => {
          if (data.responseStatus) {
            !isNullOrUndefined(data.assessment.completedDate)
              ? (data.assessment.completedDate = new Date(
                  data.assessment.completedDate
                ))
              : null;
            !isNullOrUndefined(data.assessment.dateSentToSRS)
              ? (data.assessment.dateSentToSRS = new Date(
                  data.assessment.dateSentToSRS
                ))
              : null;
            !isNullOrUndefined(data.assessment.dueDate)
              ? (data.assessment.dueDate = new Date(
                  data.assessment.dueDate
                ))
              : null;
            !isNullOrUndefined(data.assessment.assessmentTypeID)
              ? (this.fpassess.assessmentCat = data.assessment.assessmentTypeID)
              : null;
            this.fpassess = data.assessment;
            assessmentGroup = this.fpassess.assessmentTypeID;
              !isNullOrUndefined(assessmentGroup)
                ? (this.fpassess.assessmentCat = assessmentGroup.assessmentGroupID)
                : null;
            this.isAssessmentForm = true;
            loader.style.display = "none";
          }
        });
        break;

        case 'medical':
        req = { appointmentID: data.appointmentID }
        this._opencard.getByIdAppointments(req)
          .then((data: any) => {
            if (data.responseStatus) {
              !isNullOrUndefined(data.appointment.when) ? data.appointment.when = new Date(data.appointment.when) : null;
              this.appointmentMedical = data.appointment;
              this.isAppointmentsMedicalForm = true;
              loader.style.display = 'none';
            }
          })
        break;

      case 'mental':
        req = { appointmentID: data.appointmentID }
        this._opencard.getByIdAppointments(req)
          .then((data: any) => {
            if (data.responseStatus) {
              !isNullOrUndefined(data.appointment.when) ? data.appointment.when = new Date(data.appointment.when) : null;
              this.appointmentMental = data.appointment;
              this.isAppointmentsForm = true;
              loader.style.display = 'none';
            }
          })
        break;

      case "medications":
        req = { clientMedicationID: data.clientMedicationID };
        this._medications.getMedicationById(req).then((data: any) => {
          if (data.responseStatus) {
            !isNullOrUndefined(data.clientMedication.beginDate)
              ? (data.clientMedication.beginDate = new Date(
                  data.clientMedication.beginDate
                ))
              : null;
            !isNullOrUndefined(data.clientMedication.endDate)
              ? (data.clientMedication.endDate = new Date(
                  data.clientMedication.endDate
                ))
              : null;
            this.medication = data.clientMedication;
            this.isMedicationForm = true;
            loader.style.display = "none";
          }
        });
        break;
    }
  }

  clientStrengthDelete() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = { clientStrengthID: this.deleteClientStrengthID };
    this._opencard.deleteClientStrength(req).then((data: any) => {
    loader.style.display = "none";
    });
  }
  familyMemberDelete() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
      let req = { familyMemberReferralID: this.deleteFamilyMemberID };
      this._opencard.deleteExtendedFamily(req).then((data: any) => {
          loader.style.display = "none";
        });
  }
  clientProfileDelete() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
      let req = { clientProfileID: this.deleteClientProfileID };
      this._opencard.deleteClientProfile(req).then((data: any) => {
          loader.style.display = "none";
        });
  }
  preventativeMeasureDelete() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
      let req = { clientPreventativeMeasureID: this.deletePreventativeMeasureID };
      this._opencard.deletePreventativeMeasures(req).then((data: any) => {
          loader.style.display = "none";
        });
  }
  assessmentDelete() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
      let req = { assessmentID: this.deleteAssessmentID };
      this._opencard.deleteAssessment(req).then((data: any) => {
          loader.style.display = "none";
        });
  }
  medicalAppointmentDelete() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
      let req = { appointmentID: this.deletemedicalApppointmentID };
      this._opencard.deleteAppointment(req).then((data: any) => {
          loader.style.display = "none";
        });
  }
  mentalAppointmentDelete() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
      let req = { appointmentID: this.deleteMentalAppointmentID };
      this._opencard.deleteAppointment(req).then((data: any) => {
          loader.style.display = "none";
        });
  }
  medicationDelete() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = { clientMedicationID: this.deletemedicationID };
    this._opencard.deleteClientMedication(req).then((data: any) => {
    loader.style.display = "none";
    });
  }

  /**Utilites */

  warning() {
    return swal("Info", "Please check the mandatory fields", "info");
  }

  showTime(timeStamp: number) {
    return this._localValues.getDateWithExt(timeStamp);
  }

  /**
   * @param event autocomplete event
   */
  generateAssessmentType(event) {
    let req;
    this.assessmentType = [];
    req = { assessmentGroupID: event.assessmentGroupID };
    this._opencard.getAssessmentType(req).then((data) => {
      this.assessmentType = data.assessmentTypeList;
    });
  }

  /**
   *
   * @param event keyboard event
   */
  searchAssessmentType(event) {
    this.filteredAssessmentType = [];
    this.assessmentType.filter((item) => {
      if (item.assessmentType.indexOf(event.query) !== -1) {
        this.filteredAssessmentType.push(item);
      }
    });
  }

  /***
   * @param event  -  autocomplete event
   */
  dueDateCalculation(event) {
    let daysDueFromReferral: any, referralDate: any, dueDate: any;
    daysDueFromReferral = event.daysDueFromReferral;
    referralDate =
      this.currentReferralID == 1
        ? localStorage.getItem("referralRFCBeginDate")
        : localStorage.getItem("referralbeginDate");
    dueDate =
      this.currentReferralID == 1
        ? parseInt(referralDate) + daysDueFromReferral
        : new Date(referralDate).getTime() + daysDueFromReferral * 86400000;
    this.fpassess.dueDate = moment.utc(dueDate).format("MM/DD/YYYY HH:mm");
  }

  /** Get record by id */

  getRecById() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.req = {
      placementReferralID:
        this.currentPlacementReferral || this._client.getId(),
    };
    this._opencard.getByIdPlacementReferral(this.req).then((data: any) => {
      if (data.placementReferral.mrddwaiver == true) {
        this.isTierLevelDisabled = false;
        this.mrddwaiver = "true";
      } else {
        this.isTierLevelDisabled = true;
        this.mrddwaiver = "false";
      }

      data.placementReferral.kinship = data.placementReferral.kinship
        ? "true"
        : "false";
      this.placementRef.sEDwithCBS = data.placementReferral.sedwithCBS
        ? "true"
        : "false";
      !isNullOrUndefined(data.placementReferral.placementNeeded)
        ? (data.placementReferral.placementNeeded = new Date(
            data.placementReferral.placementNeeded
          ))
        : null;
      !isNullOrUndefined(data.placementReferral.director_StaffID)
        ? (data.placementReferral.director_StaffID = {
            staffName: `${data.placementReferral.director_StaffID.lastName},${data.placementReferral.director_StaffID.firstName}`,
          })
        : null;
      !isNullOrUndefined(
        data.placementReferral.director_LevelOfCareAuthorizedID
      )
        ? (data.placementReferral.director_LevelOfCareAuthorizedID = {
            levelOfCareAuthorized: `${data.placementReferral.director_LevelOfCareAuthorizedID.levelOfCareAuthorized}`,
          })
        : null;
      !isNullOrUndefined(data.placementReferral.director_DateAuthorized)
        ? (data.placementReferral.director_DateAuthorized = new Date(
            data.placementReferral.director_DateAuthorized
          ))
        : null;
      data.placementReferral.anyPendingCharges = data.placementReferral
        .anyPendingCharges
        ? "true"
        : "false";
      data.placementReferral.diagnosedMRDD = data.placementReferral.diagnosedMRDD
        ? "true"
        : "false";
      data.placementReferral.hasSafetyPlan = data.placementReferral
        .hasSafetyPlan
        ? "true"
        : "false";
      data.placementReferral.isInitial = data.placementReferral.isInitial
        ? "true"
        : "false";
      data.placementReferral.needsCommunityService = data.placementReferral
        .needsCommunityService
        ? "true"
        : "false";
      data.placementReferral.needsSafetyPlan = data.placementReferral
        .needsSafetyPlan
        ? "true"
        : "false";
      data.placementReferral.no_Run_Order = data.placementReferral.no_Run_Order
        ? "true"
        : "false";
      data.placementReferral.qualifyMRDD = data.placementReferral.qualifyMRDD
        ? "true"
        : "false";
      data.placementReferral.reviewedForAccuracy = data.placementReferral
        .reviewedForAccuracy
        ? "true"
        : "false";
      data.placementReferral.receiveSSFunding = data.placementReferral
        .receiveSSFunding
        ? "true"
        : "false";
      data.placementReferral.needsGED = data.placementReferral.needsGED
        ? "true"
        : "false";
      data.placementReferral.isPrivate = data.placementReferral.isPrivate
        ? "true"
        : "false";

      !isNullOrUndefined(data.placementReferral.dateOfLastIEP)
        ? (data.placementReferral.dateOfLastIEP = new Date(
          data.placementReferral.dateOfLastIEP
          ))
        : null;

      if (data.placementReferral.dateOfLastIEP === null) {
        this.isDateIEPdisabled = false;
      } else {
        this.isDateIEPdisabled = true;
      } 

      data.placementReferral.statusTypeID
        ? data.placementReferral.statusTypeID.statusTypeID == 13
          ? (this.isDraftForm = true)
          : (this.isDraftForm = false)
        : null;  
      // data.placementReferral.statusTypeID
      //   ? data.placementReferral.statusTypeID.statusTypeID == 13
      //     ? (this.isDraft = "Yes")
      //     : (this.isDraft = "No")
      //   : null;

      this.placementRef = data.placementReferral;
      this.otherInformationValidation(false);
      this.heightCalculationForDataFetch();
      this.placementRef.sEDwithCBS = data.placementReferral.sedwithCBS
        ? "true"
        : "false";
      this.placementRef.anyPendingCharges == "true"
        ? (this.isPendingCharges = true)
        : null;
      this._opencard.storePlacementReferralInfo(
        this.placementRef,
        this.autoFetch
      );
      loader.style.display = "none";
      this.isEditControl = true;
      this.placementReferralForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.placementReferral.cc_ChangedBy
      )
        ? data.placementReferral.cc_ChangedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.placementReferral.changedDate
      )
        ? moment(data.placementReferral.changedDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.placementReferral.enteredBy
      )
        ? data.placementReferral.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.placementReferral.enteredDate
      )
        ? moment(data.placementReferral.enteredDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
    });
  }

  formValidation() {
    this.placementReferralForm = this._fb.group({
      anyPendingCharges: [null, Validators.compose([Validators.required])],
      appointments: [null],
      careLevelID: [null, Validators.compose([Validators.required])],
      careLevelOther: [null],
      caseManager_StaffID: [null],
      casePlanGoalID: [null, Validators.compose([Validators.required])],
      cc_ChangedBy: [null],
      cc_EnteredBy: [null],
      childWantsNewPlacementToHave: [
        null,
        Validators.compose([Validators.required]),
      ],
      clientID: [null],
      clientName: [null],
      communityServiceHours: [null],
      courtOrdersSpecificToPlacement: [null],
      current_SchoolID: [null],
      currentDentist: [null],
      currentDoctor: [null],
      currentEyeDoctor: [null],
      currentPsychiatrist: [null],
      dateOfLastIEP: [null],
      dentist_CityID: [null],
      doctor_CityID: [null],
      eyeDoctor_CityID: [null],
      psychiatrist_CityID: [null],
      dentist_StateID: [null],
      doctor_StateID: [null],
      eyeDoctor_StateID: [null],
      psychiatrist_StateID: [null],
      diagnosedMRDD: [null],
      director_AuthorizationLengthID: [
        null,
        Validators.compose([Validators.required]),
      ],
      director_DateAuthorized: [
        null,
        Validators.compose([Validators.required]),
      ],
      director_LevelOfCareAuthorizedID: [null],
      director_StaffID: [null, Validators.compose([Validators.required])],
      dob: [null],
      enteredDate: [null],
      enteredBy: [null],
      facts: [null],
      genderID: [null],
      geographicalPreference: [null],
      gradeID: [null],
      hasSafetyPlan: [null, Validators.compose([Validators.required])],
      height: [null, Validators.compose([Validators.required])],
      hobbiesInterests: [null, Validators.compose([Validators.required])],
      interventions: [null, Validators.compose([Validators.required])],
      isInitial: [null],
      isDraft: [null],
      isPrivate: [null],
      kaecses: [null],
      kinship: [null, Validators.compose([Validators.required])],
      lengthOfStay: [null],
      medicalDiagnosis: [null],
      needsCommunityService: [null, Validators.compose([Validators.required])],
      needsGED: [null, Validators.compose([Validators.required])],
      needsSafetyPlan: [null, Validators.compose([Validators.required])],
      newPlacementShouldHave: [null, Validators.compose([Validators.required])],
      no_Run_Order: [null, Validators.compose([Validators.required])],
      pendingCharges: [null],
      placementNeeded: [null, Validators.compose([Validators.required])],
      providerPreference: [null],
      qualifyMRDD: [null, Validators.compose([Validators.required])],
      raceID: [null],
      reasonForCustody: [null],
      reasonForMove: [null, Validators.compose([Validators.required])],
      receiveSSFunding: [null],
      referralID: [null],
      reviewedForAccuracy: [null, Validators.compose([Validators.required])],
      schoolBehaviorProblems: [null],
      sEDwithCBS: [null, Validators.compose([Validators.required])],
      SFAOfficeID: [null],
      specialEducationTypeID: [null],
      ssn: [null],
      statusTypeID: [null],
      strengths: [null],
      strengthsBasedDescriptionOfChild: [
        null,
        Validators.compose([Validators.required]),
      ],
      therapist: [null],
      therapistAgency: [null],
      therapistAppointmentTimes: [null],
      tierLevelID: [null],
      weight: [null, Validators.compose([Validators.required])],
      newPlacementShouldNotHave: [null],
      mrddwaiver: [null],
      MRDDWaiver: [null],
    });
  }

  /**Get State */
  getState(event: any) {
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    let req = {
      value: event.query,
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "abbreviation", mode: "ASC" },
    };
    this.metaData = [];
    this._opencard.getState(req).then((data: any) => {
      // loader.style.display = 'none';
      this.metaData = data.stateList;
    });
  }

  onSelectState(event: any) {
    this.selectedStateID = event.stateID;
  }

  /**Get State from city */
  getCityFromSelectedState(event: any) {
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    let req = {
      value: event.query,
      beginPagination: 1,
      endPagination: 100,
      stateID: this.selectedStateID,
      sort: { column: "city", mode: "desc" },
    };
    this.metaData = [];
    this._opencard.getStateFromCity(req).then((data: any) => {
      // loader.style.display = 'none';
      this.metaData = data.cityList;
    });
  }

  editForm() {
    this.placementReferralForm.enable();
    this.isEditControl = false;
  }

  onRadioButtonChanges(event: any, field: string) {
    /**
     * pendingCharges
     * communityServiceHours
     *
     */
    this.placementRef.anyPendingCharges === "true" && field === "pendingCharges"
      ? (this.isPendingCharges = true)
      : null;
    this.placementRef.anyPendingCharges === "false" &&
    field === "pendingCharges"
      ? (this.isPendingCharges = false)
      : null;
    this.placementRef.needsCommunityService === "true" &&
    field === "communtiyServiceHours"
      ? (this.isCommunityServiceHours = false)
      : (this.isCommunityServiceHours = true);
  }

  /***
  Determine the status type id based on the selections in other information section
  boolean values
  4     -Completed
  9     -Pending
  10    -Requested
  11    -Withdrawal
  12    -Initial
  13    -Draft

  Withdrawal  true  - 11
  Draft  true       - 13
  isCareCentre true - 4
  initial true      - 12
  others            - 9
  */
  determineStatusType() {
    //
    let statusTypeID: any;
    delete this.autoFetch.statusTypeID;
    if (this.NewForm) {
      if (this.isDraft == "Yes") {
        statusTypeID = 13;
      } else if (this.isDraft == "No") {
        statusTypeID = 4;
      } else {
        statusTypeID = 13;
      }
    }
    if (this.isDraft == "Yes") {
      statusTypeID = 13;
    } else if (this.isDraft == "No") {
      statusTypeID = 4;
    }

    if (this.isWithDrawal == "Yes") {
      statusTypeID = 11;
    } else if (this.isWithDrawal == "No") {
      statusTypeID = 4;
    }

    return statusTypeID;
  }

  expandCollapseCall() {
    this.isTabCollapsed = !this.isTabCollapsed;
    this.isTabCollapsed
      ? (this.accordionTabLabel = "Collapse")
      : (this.accordionTabLabel = "Expand");
  }

  onWaiverSelect() {
    setTimeout(() => {
      this.waiverAction();
    }, 500);
  }

  waiverAction() {
    if (this.mrddwaiver == "true") {
      this.isTierLevelDisabled = false;
    } else {
      this.isTierLevelDisabled = true;
    }
  }

  heightCalculation() {
    // get the whole number of height
    let heightInFeet = Math.floor(this.placementRef.height);

    // convert the height number into string and find the index of '.' position
    let radixPosition = String(this.placementRef.height).indexOf(".");

    // convert the height number into string and get the inches value from the decimal
    let inches = String(this.placementRef.height).slice(radixPosition);

    // calculate the height in inches----
    // ------> 1 feet = 12 inches
    // ------> height in inches = height in feet + height in inches
    let heightInInches = heightInFeet * 12 + parseInt(inches.substr(1));
    this.originalHeight = this.placementRef.height;
    if (Number.isInteger(this.placementRef.height)) {
      this.placementRef.height = this.placementRef.height * 12;
    } else {
      this.placementRef.height = heightInInches;
    }
  }

  heightCalculationForDataFetch() {
    let heightInFeet = Math.floor(this.placementRef.height / 12);
    let heightInInches = this.placementRef.height % 12;
    if (heightInInches != 0) {
      this.placementRef.height = parseFloat(
        heightInFeet + "." + heightInInches
      ).toFixed(1);
    } else {
      this.placementRef.height = heightInFeet;
    }
  }

  onDateLastIEMSelect(event) {
    if (event) {
      this.isDateIEPdisabled = false;
      this.placementRef.dateOfLastIEP = new Date();
    } else {
      this.isDateIEPdisabled = true;
      this.placementRef.dateOfLastIEP = null;
    }
  }

  onExportFile() {
    this.exportReq["fileName"] = this.exportFileName;
    this.isExportTextShow = true;
    this._opencard
      .exportPlacementRefSubnodeListView(this.exportReq)
      .then((data: any) => {
        window.open(data.filePath);
        this.exportFileName = "";
        this.isExportsPrompt = false;
        this.isExportTextShow = false;
      });
  }

  onExportPromptOpen(tableName: string) {
    this.isExportsPrompt = true;
    this.exportReq = {
      isLinked: false,
      placementReferralID: this.currentPlacementReferral || 0,
      fileName: "",
    };
    switch (tableName) {
      case "Client Strength":
        this.exportReq["clientID"] = this.currentClientID;
        this.exportFileName = "Placement Referral - Client Strength";
        this.exportReq["export"] = "clientStrength";
        break;
      case "Client Profile":
        this.exportReq["clientID"] = this.currentClientID;
        this.exportFileName = "Placement Referral - Client Profile";
        this.exportReq["export"] = "clientProfile";
        break;
      case "Family Member":
        this.exportReq["referralID"] = this.currentReferralID;
        this.exportFileName = "Placement Referral - Family Member";
        this.exportReq["export"] = "familyMember";
        break;
      case "sibInOOH":
        this.exportReq["clientID"] = this.currentClientID;
        this.exportFileName = "Placement Referral - Siblings In OOH";
        this.exportReq["export"] = "sibInOOH";
        break;
      case "placementHistory":
        this.exportReq["clientID"] = this.currentClientID;
        this.exportFileName = "Placement Referral - Placement History";
        this.exportReq["export"] = "placementHistory";
        break;
      case "assessment":
        this.exportReq["clientID"] = this.currentClientID;
        this.exportFileName = "Placement Referral - Assessment";
        this.exportReq["export"] = "assessment";
        break;
      case "preventative-measurements":
        this.exportReq["clientID"] = this.currentClientID;
        this.exportFileName = "Placement Referral - Preventative Measurements";
        this.exportReq["export"] = "clientPreventativeMeasure";
        break;
      case "medications":
        this.exportReq["clientID"] = this.currentClientID;
        this.exportFileName = "Placement Referral - Client Medications";
        this.exportReq["export"] = "clientMedication";
        break;
      case "appointments":
        this.exportReq["clientID"] = this.currentClientID;
        this.exportFileName = "Placement Referral - Appointments";
        this.exportReq["export"] = "appointments";
        (this.exportReq["referralID"] = this.currentReferralID),
          (this.exportReq["isMedical"] = true);
        this.exportReq["isMendal"] = false;
        this.exportReq["currentDate"] = Date.now();
        break;
    }
  }

  ngOnDestroy() {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { pl_ref_id: null },
      queryParamsHandling: "merge",
    });
  }

  generatePersonTypes(beginDate) {
    // generatePersonTypes
  }
}
