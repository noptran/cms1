import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { isNullOrUndefined } from 'util';
import { Plan, Autofetch, PlanOfAction, OtherPlacementParticipants } from './plan';
import { ClientStrength } from '../../client-strength-form/client-strength';


import { RfcReferralService } from '../../reintegration/rfc-referral/rfc-referral.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CaseTeamService } from '../../case-team/case-team.service';
import { ClientStrengthService } from '../../client-strength/client-strength.service';
import {LocalValues} from '../../local-values';
import * as moment from 'moment';
import { MedicationAllergiesService } from '../../medication-allergies/medication-allergies.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlacementService } from "../placement.service";
import { TeamFormService } from "../../team-form/team-form.service";
import { MedicationAllergies } from '../../medication-allergies-form/medication-allergies';
import { PreventativeMeasurements } from '../../preventative-measure/preventative-measurements';
@Component({
  selector: "app-placement-plan",
  templateUrl: "./placement-plan.component.html",
  styleUrls: ["./placement-plan.component.scss", "../../placement-referral/placement-referral.component.scss"]
})
export class PlacementPlanComponent implements OnInit {
  sIndex: number;
  medicine_IndexStatus: any;
  medicine_IndexId: any;
  client_IndexId: any;
  client_IndexStatus: any;
  res_family_IndexStatus: boolean;
  res_IndexId: any;
  res_family_IndexId: any;
  client_pro_IndexStatus: boolean;
  client_pro_IndexId: any;
  preventive_IndexId: any;
  preventive_IndexStatus: boolean;
  plan_active_IndexId: any;
  plan_active_IndexStatus: boolean;
  res_auth_IndexId: any;
  res_auth_IndexStatus: boolean;
  oth_place_IndexId: any;
  oth_place_IndexStatus: boolean;
  breadcrumbs = [];
  isPrintNavigation = true;
  plan: Plan = new Plan();
  autofetchInfo: Autofetch = new Autofetch();
  placementPlanForm: FormGroup;
  staffName: string;
  currentURL: string;
  discardTo = '/reintegration/referral/opencard/placement/placementPlan/view'

  placementPlanClientProfile: any[];
  placementPlanClientStrength: any[];
  placementPlanMedication: any[];
  placementPlanOtherPlacementPlanParticipants: any[];
  placementPlanPlanOfAction: any[];
  placementPlanPreventativeMeasure: any[];
  placementPlanProviderStrength: any[];
  placementPlanRespiteAuthorization: any[];
  //------------------------------
  clientInfo: any
  caseInfo: any
  placementRef: any
  metaData = [];
  listOfPlacementCareLevel = [];
  listOfCasePlanGoals = [];
  isCareLevelOtherDesc = true;
  listOfDirectors = [];
  listOfDirectorsLevelOfCare = [];
  authorizedRate: any;
  isClientStrengthForm = false;
  isSiblingsFormOOH = false;
  isFamilyMemberForm = false;
  isPlacementHistoryForm = false;
  isClientProfileForm = false;
  isPreventativeMeasurementForm = false;
  isAssessmentForm = false;
  isAppointmentsForm = false;
  isMedicationForm = false;
  clientName = localStorage.getItem('clientName');
  clientStrengthsList = [];
  clientsSiblingsOohPlacementList = [];
  familyMemberList = [];
  placementHistoryList = [];
  clientsProfileList = [];
  preventativeMeasuresList = [];
  assessmentsList = [];
  medicationsList = [];
  appointmentsList = [];
  currentClientID: number;
  currentReferralID: number;
  fpExtendedFamily: any
  extendedFamilyForm: any;
  pm: PreventativeMeasurements = new PreventativeMeasurements();
  assessmentType = [];
  filteredAssessmentType = [];
  fpassess: any
  assessmentForm: any;
  appointmentForm: any;
  appointment: any
  medication: MedicationAllergies = new MedicationAllergies();
  autoFetch: any
  currentPlacementReferral: number;
  placementReferralForm: any;
  selectedStateID: any;
  isEditControl: boolean;
  isCommunityServiceHours = true;
  isPendingCharges = false;
  userName: string;
  userID: number;
  listOfAuthLength = [];
  isDraft: string;
  // -------------------
  currentPlacementId: number;
  referralID: number;
  kinship_worker: any;
  strength: ClientStrength = new ClientStrength();
  currentPlacementPlanId: number;
  clientStrengthForm: FormGroup;
  medicationForm: FormGroup;
  isTabCollapsed = true;
  accordionTabLabel = 'Collapse';
  clientProfileForm: FormGroup;
  preventativeMeasurementsForm: FormGroup;
  isAttachmentRequired = false;
  url: string;
  isRespiteAuthFetched = false;
  respiteAuthorization: any;
  isDraftChecked: any;
  isParentGuardianDisabled = true;
  isPlanOfActionForm = false;
  planOfActionForm: FormGroup;
  planOfActionInfo: PlanOfAction = new PlanOfAction();
  filteredPersonTypes = [];
  personTypes = [];
  contactTypes = [];
  personSubTypeData = [];
  planOfActionSaveData = [];
  isOtherParticipantPlanForm = false;
  otherPlacementPlanForm: FormGroup;
  otherParticipantInfo: OtherPlacementParticipants = new OtherPlacementParticipants();
  otherParticipantSaveData = [];
  isExportsPrompt = false;
  exportFileName: string;
  exportReq = {};
  isExportTextShow = false;
  planOfActionListInfo = [];
  otherPlanParticipantsInfo = [];
  serviceSupports = [];
  providerStrengthList = [];
  isProviderStrengthForm = false;
  req = {};
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _openCard: OpencardsService, public _team: TeamFormService, public _placement: PlacementService, public _opencard: OpencardsService, public _fb: FormBuilder,
    public _rfc: RfcReferralService, public _caseTeam: CaseTeamService,
    public _clientStrength: ClientStrengthService, public _localValues: LocalValues,
    public _medications: MedicationAllergiesService, public _router: Router,
    public _activatedRoute: ActivatedRoute) { }

  mainTabs = [];
  strength_data: any = {
    strengthID: "",
    strengthInformationSourceID: "",
    current: "",
    explanation: ""
  };
  res_family_data: any = {
    strengthID: "",
    current: "",
    explanation: ""
  };
  clientProfile: any = {
    conditionID: "",
    beginDate: "",
    endDate: "",
    notifyDate: "",
    lastOccurrence: "",
    frequencyTypeID: ""
  };
  res_auth: any = {
    units_per_month: "",
    beginDate: "",
    endDate: "",
    res_payer: "",
    res_notes: ""
  };
  oth_place_Data: any = {
    name: "",
    relationship: "",
    phone: "",
    participatedBy: "",
    notes: ""
  };
  preve_data: any = {
    prev_Measure: "",
    beginDate: "",
    endDate: "",
    notes: ""
  };
  plan_act_data: any = {
    service_support: "",
    person_responsible: "",
    dateInitiated: "",
    notes: ""
  };
  medicationData: any = {
    medication: "",
    dosage: "",
    beginDate: "",
    frequency: "",
    endDate: "",
    prescribedBy: "",
    prescribedFor: ""
  };

  ngOnInit() {
    this.currentClientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
    this.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    this.currentPlacementId = parseInt(this._activatedRoute.snapshot.queryParamMap.get('p_id')) || (parseInt(localStorage.getItem('placementID')) - this._openCard.getHasKey());
    this.currentPlacementPlanId = parseInt(this._activatedRoute.snapshot.queryParamMap.get('pp_id'));
    this.currentURL = this._router.url.includes('?') ? this._router.url.split('?')[0] : this._router.url;
    this.setIndex(0);
    this.defineMainTabs();
    this.breadcrumbs.push(
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
      { label: 'Placements', active: '', href: '/reintegration/referral/opencard/placement/detail' },
      { label: 'Placement Plan List', active: '', href: '/reintegration/referral/opencard/placement/placementPlan/view' },
      { label: 'Placement Plan', active: 'active' },
    );
    this.clientSubnodeFormValidation();
    this.formValidation();

    this.getDefaultValues();
    this.autofetchInitialNewData();
    this.getClientStrengthsList();
    this.getMedicationsList();
    this.getClientProfileList();
    this.getPreventativeMeasuresList();
    this.getRespiteAuthorization();
    this.getResourceFamilyStrengthList();

    if (this.currentURL.includes('/reintegration/referral/opencard/placement/placementPlan/detail')) {
      this.isAttachmentRequired = true;
      this.getRecById();
      this.getPlanOfActionList();
      this.getOtherParticipants();
    }

  }

  autofetchInitialNewData() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { placementID: this.currentPlacementId }

    this._opencard.autofetchPlacementPlanInfo(req).then((data: any) => {
      this.plan.integererventions = data.autoFetchInfo.interventions;
      this.autofetchInfo = data.autoFetchInfo;
      this._opencard.storePlacementPlanInfo(this.plan, this.autofetchInfo)
      loader.style.display = 'none';
    })
  }

  autofetchOptions(data, name, fieldName = '') {
    switch (name) {
      case 'date_conversion':
        return (data) ? moment.utc(data).format('MM/DD/YYYY HH:mm') : 'Information not provided'

    }
  }

  /**Get modal nodes list */

  getClientStrengthsList() {
    const clientStrengthReq = { openCard: "ClientStrength", beginPagination: 1, endPagination: 100 }
    this._opencard.listViewOfClientOpencards(this.currentClientID, clientStrengthReq)
      .then((data: any) => { this.clientStrengthsList = data.openCardList })
  }

  getMedicationsList() {
    const medicationsList = { openCard: "ClientMedication", beginPagination: 1, endPagination: 100, sort: { "column": "ClientMedicationID", "mode": "desc" } }
    this._opencard.listViewOfClientOpencards(this.currentClientID, medicationsList)
      .then((data: any) => { this.medicationsList = data.openCardList })
  }

  getClientProfileList() {
    const familyMemberReq = { openCard: "ClientProfile", beginPagination: 1, endPagination: 100 }
    this._opencard.listViewOfClientOpencards(this.currentClientID, familyMemberReq)
      .then((data: any) => { this.clientsProfileList = data.openCardList })
  }

  getResourceFamilyStrengthList() {
    const familyStrengthReq = { providerID: this._localValues.currentPlacementProviderID }
    this._opencard.getProviderStrengthList(familyStrengthReq)
      .then((data: any) => { this.providerStrengthList = data.ProviderStrength })
  }


  getPreventativeMeasuresList() {
    const preventativeMeasuresList = { openCard: "ClientPreventativeMeasure", beginPagination: 1, endPagination: 100, sort: { "column": "clientPreventativeMeasureID", "mode": "desc" } }
    this._opencard.listViewOfClientOpencards(this.currentClientID, preventativeMeasuresList)
      .then((data: any) => { this.preventativeMeasuresList = data.openCardList })
  }

  getPlanOfActionList() {
    const planOfActionList = { placementPlanID: this.currentPlacementPlanId }
    this._opencard.listViewOfPlanOfAction(planOfActionList)
      .then((data: any) => { this.planOfActionListInfo = data.PlacementPlanPlanOfActions })
  }

  getOtherParticipants() {
    const otherParticipantsList = { placementPlanID: this.currentPlacementPlanId }
    this._opencard.listViewOfOtherParticipants(otherParticipantsList)
      .then((data: any) => { this.otherPlanParticipantsInfo = data.PlacementPlanOtherPlacementPlanParticipants })
  }


  getDefaultValues() {
    this.isDraftChecked = 9;
    if (parseInt(localStorage.getItem('UserId'))) {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      this._team.getUserById({ staffID: parseInt(localStorage.getItem('UserId')) })
        .then((data) => {

          this.staffName = `${data.users.firstName} ${data.users.lastName}`;
          loader.style.display = 'none';
        })
    }
  }



  setIndex(index: number) {
    this.sIndex = index;
  }
  defineMainTabs() {
    return (this.mainTabs = [
      { label: "Client Information", href: "#nav-sec1" },
      { label: "Resource Family Information", href: "#nav-sec2" },
      { label: "Other Information", href: "#nav-sec3" }
    ]);
  }
  medicin_list = [];

  addMedicianData() {
    if (this.medicine_IndexStatus) {
      this.medicin_list[this.medicine_IndexId] = this.medicationData;
      this.medicationData = {
        medication: "",
        dosage: "",
        beginDate: "",
        frequency: "",
        endDate: "",
        prescribedBy: "",
        prescribedFor: ""
      };
      this.medicine_IndexStatus = false;
      swal("Success", "", "success");
    } else {
      this.medicin_list.push(this.medicationData);
      swal("Success", "", "success");
      this.medicationData = {
        medication: "",
        dosage: "",
        beginDate: "",
        frequency: "",
        endDate: "",
        prescribedBy: "",
        prescribedFor: ""
      };
    }
  }

  viewMedicianData(aloneData, id) {
    this.medicationData = aloneData;
    this.medicine_IndexId = id;
    this.medicine_IndexStatus = true;
  }
  deleteMedicianDet(id) {
    this.medicin_list.splice(id, 1);
  }
  client_list = [];

  addClientData() {
    if (this.client_IndexStatus) {
      this.client_list[this.client_IndexId] = this.strength_data;
      this.strength_data = {
        strengthID: "",
        strengthInformationSourceID: "",
        current: "",
        explanation: ""
      };
      this.client_IndexStatus = false;
      swal("Success", "", "success");
    } else {
      this.client_list.push(this.strength_data);
      swal("Success", "", "success");
      this.strength_data = {
        strengthID: "",
        strengthInformationSourceID: "",
        current: "",
        explanation: ""
      };
    }
  }

  getPhoneTypeId(value) {
    if (value) {
      switch (value) {
        case 'work':
          return 1

        case 'cell':
          return 2

        case 'Cell':
          return 2

        case 'home':
          return 3

        default:
          return null;

      }

    }
    else {
      return null;
    }

  }
  onWorkerPhoneSelect(label) {
    setTimeout(() => {
      this.workerPhoneSelct(label)
    }, 1000)

  }

  workerPhoneSelct(label) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let phoneTypeID: number;
    switch (this.plan.resourceWorker_PhoneTypeID) {
      case 'work':
        phoneTypeID = 1;
        break;

      case 'cell':
        phoneTypeID = 2;
        break;

      default:



    }

    let staffId = parseInt(localStorage.getItem('UserId'));

    let req = {
      "phoneTypeID": phoneTypeID,
      "providerMemberID": null,
      "familyMemberID": null,
      "staffID": staffId
    }

    if (staffId) {
      this._opencard.getPlacementPlanPhoneNumbers(req).then((data: any) => {
        if (data.phone) {
          this.plan.resourceWorker_Phone = (data.phone.length > 0) ? data.phone[0].phone : "";
        }
        else {
          this.plan.resourceWorker_Phone = '';
        }

        loader.style.display = 'none';
      })
    }
    else {
      loader.style.display = 'none';
    }
  }

  onPhoneModeSelect(phoneTypeIdModal, phoneModal, memberIdModal) {
    setTimeout(() => {
      this.autofetchPhoneNumber(phoneTypeIdModal, phoneModal, memberIdModal)
    }, 1000)

  }

  autofetchPhoneNumber(phoneTypeIdModal, phoneModal, memberIdModal) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let phoneTypeID: number;
    switch (this.plan[phoneTypeIdModal]) {
      case 'work':
        phoneTypeID = 1;
        break;

      case 'cell':
        phoneTypeID = 2;
        break;

      case 'home':
        phoneTypeID = 3;
        break;

      default:

    }

    let providerMemberID: any;
    let familyMemberID: any;

    if (this.plan[memberIdModal]) {
      providerMemberID = (this.plan[memberIdModal].providerMemberID) ? this.plan[memberIdModal].providerMemberID : null;
      familyMemberID = (this.plan[memberIdModal].familyMemberID) ? this.plan[memberIdModal].familyMemberID : null;
    }
    else {
      providerMemberID = null;
      familyMemberID = null;
    }

    let staffId = parseInt(localStorage.getItem('UserId')) || 4620;

    if (phoneModal == 'caseManager_Phone') {
      staffId = (this.autofetchInfo.caseManager_StaffID == 0) ? null : this.autofetchInfo.caseManager_StaffID;
    }
    if (phoneModal == 'familySupportWorker_Phone') {
      staffId = (this.autofetchInfo.familySupportWorker_StaffID == 0) ? null : this.autofetchInfo.familySupportWorker_StaffID;
    }
    if (phoneModal === 'supervisor_Phone') {
      staffId = (this.autofetchInfo.supervisor_StaffID == 0) ? null : this.autofetchInfo.supervisor_StaffID;
    }

    let req = {
      "phoneTypeID": phoneTypeID,
      "providerMemberID": providerMemberID,
      "familyMemberID": familyMemberID,
      "staffID": staffId
    }
    if (staffId) {
      this._opencard.getPlacementPlanPhoneNumbers(req).then((data: any) => {
        if (data.phone) {
          this.plan[phoneModal] = (data.phone.length > 0) ? data.phone[0].phone : "";
        }
        else {
          this.plan[phoneModal] = '';
        }

        loader.style.display = 'none';
      })
    }
    else {
      loader.style.display = 'none';
    }


  }

  fetchInfo(value, key) {
    if (value) {
      return value[key]
    }
    else {
      ""
    }
  }

  checkStatusType() {
    if (this.isDraftChecked == '13') {
      return 13;
    }
    else if (this.isDraftChecked == '9') {
      return 9;
    }
  }

  formAction() {
    let date = new Date();
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.plan.admissionDate = this._localValues.stringFormatDatetime(Date.now());
    !isNullOrUndefined(this.plan.caseManager_Name) ? this.plan.caseManager_Name = this.plan.caseManager_Name.providerMember : null;
    this.plan.cc_ReviewedBy = this.staffName
    this.plan.cc_ReviewedBy_StaffName = this.staffName
    this.plan.clientName = this.staffName
    this.plan.enteredBy = this.staffName

    this.plan.licensed_ChangedBy = this.staffName
    this.plan.licensed_EnteredBy = this.staffName
    this.plan.licensed_EnteredBy_StaffName = this.staffName
    !isNullOrUndefined(this.plan.familySupportWorker_Name) ? this.plan.familySupportWorker_Name = this.plan.familySupportWorker_Name.providerMember : null;
    !isNullOrUndefined(this.plan.resourceWorker_Name) ? this.plan.resourceWorker_Name = this.plan.resourceWorker_Name.providerMember : null;
    this.plan.sup_ReviewedBy = this.staffName
    this.plan.sup_ReviewedBy_StaffName = this.staffName;
    !isNullOrUndefined(this.plan.supervisor_Name) ? this.plan.supervisor_Name = this.plan.supervisor_Name.providerMember : null;

    this.plan.unlicensed_ChangedBy = this.staffName
    this.plan.unlicensed_EnteredBy = this.staffName
    this.plan.unlicensed_EnteredBy_StaffName = this.staffName
    this.plan.cc_ReviewedDate = this._localValues.stringFormatDatetime(Date.now());
    if (typeof (this.plan.dateOfCompletion) == 'string') {
      this.plan.dateOfCompletion = new Date(this.plan.dateOfCompletion);
    }
    (this.plan.dateOfCompletion) ? this.plan.dateOfCompletion = this._localValues.stringFormatDatetime(Date.parse(this.plan.dateOfCompletion)) : this.plan.dateOfCompletion = null;
    this.plan.dob = this._localValues.stringFormatDatetime(Date.now());
    this.plan.enteredDate = this._localValues.stringFormatDatetime(Date.now());
    this.plan.licensed_ChangedDate = this._localValues.stringFormatDatetime(Date.now());
    this.plan.licensed_EnteredDate = this._localValues.stringFormatDatetime(Date.now());
    this.plan.sup_ReviewedDate = this._localValues.stringFormatDatetime(Date.now());
    this.plan.unlicensed_ChangedDate = this._localValues.stringFormatDatetime(Date.now());
    this.plan.unlicensed_EnteredDate = this._localValues.stringFormatDatetime(Date.now());

    this.plan.caseManager_PhoneTypeID = this.getPhoneTypeId(this.plan.caseManager_PhoneTypeID);
    this.plan.familySupportWorker_PhoneTypeID = this.getPhoneTypeId(this.plan.familySupportWorker_PhoneTypeID);
    this.plan.parentGuardian1_PhoneTypeID = this.getPhoneTypeId(this.plan.parentGuardian1_PhoneTypeID);
    this.plan.parentGuardian2_PhoneTypeID = this.getPhoneTypeId(this.plan.parentGuardian2_PhoneTypeID);
    this.plan.resourceWorker_PhoneTypeID = this.getPhoneTypeId(this.plan.resourceWorker_PhoneTypeID);

    this.plan.supervisor_PhoneTypeID = this.getPhoneTypeId(this.plan.supervisor_PhoneTypeID);
    this.plan.resourceParent1_PhoneTypeID = this.getPhoneTypeId(this.plan.resourceParent1_PhoneTypeID);
    this.plan.resourceParent2_PhoneTypeID = this.getPhoneTypeId(this.plan.resourceParent2_PhoneTypeID);

    this.plan.caseManager_StaffID = (this.autofetchInfo.caseManager_StaffID == 0) ? null : this.autofetchInfo.caseManager_StaffID;

    this.plan.familySupportWorker_StaffID = (this.autofetchInfo.familySupportWorker_StaffID == 0) ? null : this.autofetchInfo.familySupportWorker_StaffID;
    this.plan.licensed_EnteredBy_StaffID = parseInt(localStorage.getItem('UserId'))
    this.plan.resourceWorker_StaffID = (this.autofetchInfo.resourceWorker_StaffID == 0) ? null : this.autofetchInfo.resourceWorker_StaffID;
    this.plan.supervisor_StaffID = (this.autofetchInfo.supervisor_StaffID == 0) ? null : this.autofetchInfo.supervisor_StaffID;
    this.plan.unlicensed_EnteredBy_StaffID = parseInt(localStorage.getItem('UserId'))
    this.plan.caseManagerSignature_ContactTypeID = (this.plan.caseManagerSignature_ContactTypeID) ? parseInt(this.plan.caseManagerSignature_ContactTypeID) : null;

    this.plan.childSignature_ContactTypeID = (this.plan.childSignature_ContactTypeID) ? parseInt(this.plan.childSignature_ContactTypeID) : null;
    this.plan.parentGuardian1Signature_ContactTypeID = (this.plan.parentGuardian1Signature_ContactTypeID) ? parseInt(this.plan.parentGuardian1Signature_ContactTypeID) : null;
    this.plan.parentGuardian2Signature_ContactTypeID = (this.plan.parentGuardian2Signature_ContactTypeID) ? parseInt(this.plan.parentGuardian2Signature_ContactTypeID) : null;
    this.plan.resourceParent1Signature_ContactTypeID = (this.plan.resourceParent1Signature_ContactTypeID) ? parseInt(this.plan.resourceParent1Signature_ContactTypeID) : null;
    this.plan.resourceParent2Signature_ContactTypeID = (this.plan.resourceParent2Signature_ContactTypeID) ? parseInt(this.plan.resourceParent2Signature_ContactTypeID) : null;
    this.plan.resourceWorker_ContactTypeID = (this.plan.resourceWorker_ContactTypeID) ? parseInt(this.plan.resourceWorker_ContactTypeID) : null;
    this.plan.supervisorSignature_ContactTypeID = (this.plan.supervisorSignature_ContactTypeID) ? parseInt(this.plan.supervisorSignature_ContactTypeID) : null;

    this.plan.casePlanGoalID = (this.autofetchInfo.casePlanGoalID == 0) ? null : this.autofetchInfo.casePlanGoalID;

    this.plan.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();;

    (this.plan.parentGuardian1_FamilyMemberID) ? this.plan.parentGuardian1_FamilyMemberID = this.plan.parentGuardian1_FamilyMemberID.familyMemberID : this.plan.parentGuardian1_FamilyMemberID = null;
    (this.plan.parentGuardian2_FamilyMemberID) ? this.plan.parentGuardian2_FamilyMemberID = this.plan.parentGuardian2_FamilyMemberID.familyMemberID : this.plan.parentGuardian2_FamilyMemberID = null;
    this.plan.payorID = (this.autofetchInfo.payorID == 0) ? null : this.autofetchInfo.payorID;
    this.plan.placementID = this.currentPlacementId
    this.plan.procodeID = (this.autofetchInfo.procodeID == 0) ? null : this.autofetchInfo.procodeID;

    this.plan.provider_SponsorID = (this.autofetchInfo.provider_SponsorID == 0) ? null : this.autofetchInfo.provider_SponsorID;

    this.plan.providerID = (this.autofetchInfo.providerID == 0) ? null : this.autofetchInfo.providerID;
    this.plan.providerLocationID = 1;
    (this.plan.resourceParent2_ProviderMemberID) ? this.plan.resourceParent2_ProviderMemberID = this.plan.resourceParent2_ProviderMemberID.providerMemberID : this.plan.resourceParent2_ProviderMemberID = null;
    (this.plan.resourceParent1_ProviderMemberID) ? this.plan.resourceParent1_ProviderMemberID = this.plan.resourceParent1_ProviderMemberID.providerMemberID : this.plan.resourceParent1_ProviderMemberID = null;
    this.plan.SFAOfficeID = 11
    this.plan.cc_ReviewedBy_StaffID = parseInt(localStorage.getItem('UserId'))
    this.plan.sup_ReviewedBy_StaffID = parseInt(localStorage.getItem('UserId'))

    this.plan.isKinship = false
    this.plan.isMentalHealth = false
    this.plan.isResidential = false;
    (this.plan.mentalHealthServices == 1) ? this.plan.mentalHealthServices = true : this.plan.mentalHealthServices = false;
    (this.plan.parentGuardianParticipation == 1) ? this.plan.parentGuardianParticipation = true : this.plan.parentGuardianParticipation = false;

    this.plan.statusTypeID = this.checkStatusType();
    this.placementPlanClientProfile = []
    this.placementPlanClientStrength = []
    this.placementPlanMedication = []
    this.placementPlanOtherPlacementPlanParticipants = this.otherParticipantSaveData;
    this.placementPlanPlanOfAction = this.planOfActionSaveData;
    this.placementPlanPreventativeMeasure = []
    this.placementPlanProviderStrength = []
    this.placementPlanRespiteAuthorization = []

    let req: any;

    req = {
      placementPlanInfo: this.plan,
      placementPlanClientProfile: this.placementPlanClientProfile,
      placementPlanClientStrength: this.placementPlanClientStrength,
      placementPlanMedication: this.placementPlanMedication,
      placementPlanOtherPlacementPlanParticipants: this.placementPlanOtherPlacementPlanParticipants,
      placementPlanPlanOfAction: this.placementPlanPlanOfAction,
      placementPlanPreventativeMeasure: this.placementPlanPreventativeMeasure,
      placementPlanProviderStrength: this.placementPlanProviderStrength,
      placementPlanRespiteAuthorization: this.placementPlanRespiteAuthorization
    }
    if (this.plan.placementPlanID) {
      this._opencard.savePlacementPlan(req).then((data: any) => {
        if (data.responseStatus) {
          swal('Update', 'Placement Plan has been updated!', 'success');
          this._router.navigate(['/reintegration/referral/opencard/placement/placementPlan/view'], { queryParamsHandling: 'preserve' })
          loader.style.display = 'none';

        }
      })
    } else {
      this._opencard.savePlacementPlan(req).then((data: any) => {
        if (data.responseStatus) {
          swal('Save', 'Placement Plan has been created!', 'success');
          this._router.navigate(['/reintegration/referral/opencard/placement/placementPlan/view'], { queryParamsHandling: 'preserve' })
          loader.style.display = 'none';

        }
      })
    }




  }

  formValidation() {
    this.placementPlanForm = this._fb.group({

      admissionDate: [null],
      caseManager_Name: [null],
      caseManager_Phone: [null],
      cc_ReviewedBy: [null],
      cc_ReviewedBy_StaffName: [null],
      clientName: [null],
      enteredBy: [null],
      familySupportWorker_Name: [null],
      familySupportWorker_Phone: [null],
      familyTherapist_Name: [null],
      familyTherapist_Phone: [null],
      individualTherapist_Name: [null],
      individualTherapist_Phone: [null],
      integererventions: [null],
      kaecses: [null],
      licensed_ChangedBy: [null],
      licensed_EnteredBy: [null],
      licensed_EnteredBy_StaffName: [null],
      other1_Name: [null],
      other1_Phone: [null],
      other2_Name: [null],
      other2_Phone: [null],
      physician_Name: [null],
      physician_Phone: [null],
      psychiatrist_Name: [null],
      psychiatrist_Phone: [null],
      relevantHistory: [null],
      resourceWorker_Name: [null],
      resourceWorker_Phone: [null],
      sup_ReviewedBy: [null],
      sup_ReviewedBy_StaffName: [null],
      supervisor_Name: [null],
      supervisor_Phone: [null],
      unlicensed_ChangedBy: [null],
      unlicensed_EnteredBy: [null],
      unlicensed_EnteredBy_StaffName: [null],
      whyDidParentGuardianNotParticipate: [null],
      cc_ReviewedDate: [null],
      dateOfCompletion: [null],
      dob: [null],
      enteredDate: [null],
      licensed_ChangedDate: [null],
      licensed_EnteredDate: [null],
      sup_ReviewedDate: [null],
      unlicensed_ChangedDate: [null],
      unlicensed_EnteredDate: [null],
      caseManager_PhoneTypeID: [null],
      familySupportWorker_PhoneTypeID: [null],
      parentGuardian1_PhoneTypeID: [null],
      parentGuardian2_PhoneTypeID: [null],
      resourceParent1_PhoneTypeID: [null],
      resourceParent2_PhoneTypeID: [null],
      resourceWorker_PhoneTypeID: [null],
      supervisor_PhoneTypeID: [null],
      caseManager_StaffID: [null],
      familySupportWorker_StaffID: [null],
      licensed_EnteredBy_StaffID: [null],
      resourceWorker_StaffID: [null],
      supervisor_StaffID: [null],
      unlicensed_EnteredBy_StaffID: [null],
      caseManagerSignature_ContactTypeID: [null],
      childSignature_ContactTypeID: [null],
      parentGuardian1Signature_ContactTypeID: [null],
      parentGuardian2Signature_ContactTypeID: [null],
      resourceParent1Signature_ContactTypeID: [null],
      resourceParent2Signature_ContactTypeID: [null],
      resourceWorker_ContactTypeID: [null],
      supervisorSignature_ContactTypeID: [null],
      casePlanGoalID: [null],
      clientID: [null],
      parentGuardian1_FamilyMemberID: [null],
      parentGuardian2_FamilyMemberID: [null],
      payorID: [null],
      placementID: [null],
      procodeID: [null],
      provider_SponsorID: [null],
      providerID: [null],
      providerLocationID: [null],
      resourceParent1_ProviderMemberID: [null],
      resourceParent2_ProviderMemberID: [null],
      SFAOfficeID: [null],
      cc_ReviewedBy_StaffID: [null],
      sup_ReviewedBy_StaffID: [null],
      isKinship: [null],
      isMentalHealth: [null],
      isResidential: [null],
      mentalHealthServices: [null],
      parentGuardianParticipation: [null],

    })
  }

  getMetaData(event: any, label: string) {
    let req: any;
    switch (label) {
      case 'parent_guardian':
        this.getParentGuardianDropdown();
        break;

      case 'resource_parent':
        this.getResourceParent();
        break;

      case 'strength':
        req = { value: event.query };
        req['Object'] = 'strength';
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'source':
        req = { value: event.query };
        req['Object'] = 'strengthInformationSource';
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'gradeID':
        req = { value: event.query };
        req['Object'] = 'grade';
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'specialEducationTypeID':
        req = { value: event.query };
        req['Object'] = 'specialEducationType';
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'strength':
        req = { value: event.query };
        req['Object'] = 'strength';
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'familyMember':
        req = { value: event.query };
        req['Object'] = "familyMember";
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'relationship':
        req = { value: event.query };
        req['Object'] = "personType";
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'memberType':
        req = { value: event.query };
        req['Object'] = "familyMemberType";
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'restrictionType':
        req = { value: event.query };
        req['Object'] = "restrictionType";
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'frequency':
        req = { value: event.query };
        req['Object'] = "frequencyType";
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'condition':
        req = { value: event.query };
        req['Object'] = 'condition';
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'frequency_type':
        req = { value: event.query };
        req['Object'] = 'frequencyType';
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'risk':
        req = { value: event.query };
        req['Object'] = 'risk';
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'preventativeMeasure':
        req = { value: event.query };
        req['Object'] = 'preventativeMeasure'
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'asssessCat':
        req = { value: event.query };
        req['Object'] = 'assessmentGroup';
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'frequency_type':
        req = { value: event.query };
        req['Object'] = 'frequencyType';
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'risk':
        req = { value: event.query };
        req['Object'] = 'risk';
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'appointmentType':
        req = { value: event.query };
        req['Object'] = 'appointmentType';
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'dosage':
        req = { value: event.query };
        req['Object'] = "dosageType";
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      case 'frequency':
        req = { value: event.query };
        req['Object'] = "frequencyType";
        if ('Object' in req) { this._caseTeam.getSearchList(req).then((data: any) => { this.metaData = data.dropDown }) }
        break;

      default:

    }

  }

  getParentGuardianDropdown() {
    let req = {
      referralID: this.referralID
    }

    this._placement.getParentGuardian(req).then((data: any) => { this.metaData = data.familyMemberList })
  }

  getResourceParent() {
    let req = {
      placementID: this.currentPlacementId
    }

    this._placement.getResourceParent(req).then((data: any) => { this.metaData = data.providerMember })

  }
  // -----------------------------------------------


  /** Get metadata */
  getPlacementCareLevel() {
    this._opencard.getPlacementLevel()
      .then((data: any) => { this.listOfPlacementCareLevel = data.careLevel })
  }

  getCasePlanGoals() {
    this._opencard.getPlacementReferralCasePlanGoals()
      .then((data: any) => { this.listOfCasePlanGoals = data.casePlanGoals })
  }

  getDirectors() {
    this._opencard.getPlacementReferralDirectors()
      .then((data: any) => { this.listOfDirectors = data.directorAuthorizationStaff })
  }

  getDirectorLevelOfCare() {
    this._opencard.getPlacementReferralDirectorsLevelOfCare()
      .then((data: any) => { this.listOfDirectorsLevelOfCare = data.levelOfCareAuthorized })
  }

  getPlacementAuth() {
    this._opencard.getPlacementReferralAuthLength()
      .then((data: any) => { this.listOfAuthLength = data.authorizationLength })
  }

  /** Filtered the metadata list */
  filterPlacementCareLevel(event: any) {
    this.metaData = [];
    this.listOfPlacementCareLevel.filter((item: any) => {
      if (item.careLevel.indexOf(event.query) !== -1) { this.metaData.push(item); }
    })
  }

  filterCasePlanGoals(event: any) {
    this.metaData = [];
    this.listOfCasePlanGoals.filter((item: any) => {
      if (item.casePlanGoal.indexOf(event.query) !== -1) { this.metaData.push(item); }
    })
  }

  filterDirectors(event: any) {
    this.metaData = [];
    this.listOfDirectors.filter((item: any) => {
      if (item.staffName.indexOf(event.query) !== -1) { this.metaData.push(item); }
    })
  }

  filterDirectorsLevelOfCare(event: any) {
    this.metaData = [];
    this.listOfDirectorsLevelOfCare.filter((item: any) => {
      if (item.levelOfCareAuthorized.indexOf(event.query) !== -1) { this.metaData.push(item); }
    })
  }

  filterPlacementReferalAuth(event: any) {
    this.metaData = [];
    this.listOfAuthLength.filter((item: any) => {
      if (item.authorizationLength.indexOf(event.query) !== -1) { this.metaData.push(item); }
    })
  }


  getSiblingsInOohList() { }

  getFamilyMemberList() {
    const familyMemberReq = { referralID: this.currentReferralID, beginPagination: 1, endPagination: 100, sort: { "column": "familyMemberReferralID", "mode": "desc" } }
    this._opencard.getExtendedFamilyList(familyMemberReq)
      .then((data: any) => { this.clientsSiblingsOohPlacementList = data.FamilyMemberReferral })
  }

  getPlacementHistoryList() { }

  getAssessmentsList() {
    const assessmentsListReq =
      { referralID: this.currentReferralID, clientID: this.currentClientID, beginPagination: 1, endPagination: 100, sort: { "column": "assessmentID", "mode": "desc" } }
    this._opencard.getAssessementsByClient(assessmentsListReq)
      .then((data: any) => { this.assessmentsList = data.assessment })
  }

  getAppointmentsList() {
    const appointmentsReq =
      { referralID: this.currentReferralID, beginPagination: 1, endPagination: 100, sort: { "column": "appointmentID", "mode": "desc" } }
    this._opencard.listAllAppointments(appointmentsReq)
      .then((data: any) => { this.appointmentsList = data.appointment })
  }

  /**Subnode actions */

  onSubnodeRowclick(node: string, data: any) {
    this.subnodeGetById(node, data);
  }

  subNodeFormAction(node: string, data: any) {
    if (node === 'client_strength') {
      if (this.clientStrengthForm.valid) {
        data.clientStrengthID ? this.subnodeUpdate(node, data) : this.subnodeSave(node, data);
        this.isClientStrengthForm = false;
      }
      else {
        this.warning();
      }
    }

    if (node === 'extended_familymember') {
      if (this.extendedFamilyForm.valid) {
        data.familyMemberReferralID ? this.subnodeUpdate(node, data) : this.subnodeSave(node, data);
        this.isFamilyMemberForm = false;
      }
      else {
        this.warning();
      }
    }

    if (node === 'client_profile') {
      if (this.clientProfileForm.valid) {
        data.clientProfileID ? this.subnodeUpdate(node, data) : this.subnodeSave(node, data);
        this.isClientProfileForm = false;
      }
      else {
        this.warning();
      }
    }

    if (node === 'preventative_measurements') {
      if (this.preventativeMeasurementsForm.valid) {
        data.clientPreventativeMeasureID ? this.subnodeUpdate(node, data) : this.subnodeSave(node, data);
        this.isPreventativeMeasurementForm = false;
      }
      else {
        this.warning();
      }
    }

    if (node === 'assesments') {
      if (this.assessmentForm.valid) {
        data.assessmentID ? this.subnodeUpdate(node, data) : this.subnodeSave(node, data);
        this.isAssessmentForm = false;
      }
      else {
        this.warning();
      }
    }

    if (node === 'appointments') {
      if (this.appointmentForm.valid) {
        data.appointmentID ? this.subnodeUpdate(node, data) : this.subnodeSave(node, data);
        this.isAppointmentsForm = false;
      }
      else {
        this.warning();
      }
    }

    if (node === 'medications') {
      if (this.medicationForm.valid) {
        data.clientMedicationID ? this.subnodeUpdate(node, data) : this.subnodeSave(node, data);
        this.isMedicationForm = false;
      }
      else {
        this.warning();
      }
    }

    if (node === 'plan_of_action') {
      if (this.planOfActionForm.valid) {
        this.subnodeSave(node, data);
        this.isPlanOfActionForm = false;
        this.planOfActionInfo = new PlanOfAction();

      }
      else {
        this.warning();
      }
    }

    if (node === 'otherParticipantPlan') {
      if (this.otherPlacementPlanForm.valid) {
        this.subnodeSave(node, data);
        this.isOtherParticipantPlanForm = false;
        this.otherParticipantInfo = new OtherPlacementParticipants();
      }
      else {
        this.warning();
      }
    }


  }

  /**Subnode form validation */

  clientSubnodeFormValidation() {

    /**Client strength form */
    this.clientStrengthForm = this._fb.group({
      "StrengthID": [null, Validators.compose([Validators.required])],
      "strengthInformationSourceID": [null, Validators.compose([Validators.required])],
      "current": [null],
      "explanation": [null, Validators.compose([Validators.required])]
    })
    /**Extended family form (Visitations) */
    this.extendedFamilyForm = this._fb.group({
      'familyMemberID': [null, Validators.compose([Validators.required])],
      'beginDate': [null, Validators.compose([Validators.required])],
      'endDate': [null],
      'personTypeID': [null, Validators.compose([Validators.required])],
      'familyMemberTypeID': [null, Validators.compose([Validators.required])],
      'restrictionTypeID': [null, Validators.compose([Validators.required])],
      'IsCourtOrderedRestriction': [null],
      'frequencyTypeID': [null, Validators.compose([Validators.required])],
      'isCourtOrderedFrequency': [null],
      'notes': [null],
      'referralID': [null],
      'isRemovalParent': [null],
      'annualHouseholdIncome': [null],
      'numberLivingInHousehold': [null],
      'isSingleParentHousehold': [null],
      'familyRefused': [null],
    })

    /**Client profile form  */

    this.clientProfileForm = this._fb.group({
      "condition": [null, Validators.compose([Validators.required])],
      "beginDate": [null, Validators.compose([Validators.required])],
      "endDate": [null],
      "lastOccurrence": [null],
      "frequency_type": [null, Validators.compose([Validators.required])],
      "risk": [null, Validators.compose([Validators.required])],
      "note_any_injuries": [null],
      "be_protected": [null],
      "triggers": [null],
      "notificationDate": [null],
      "notes": [null, Validators.compose([Validators.required])]
    })

    /**Preventative measurements form */

    this.preventativeMeasurementsForm = this._fb.group({
      'preventativeMeasureID': [null, Validators.compose([Validators.required])],
      'notes': [null, Validators.compose([Validators.required])],
      'beginDate': [null],
      'endDate': [null],
    });

    /**Assessments form */

    this.assessmentForm = this._fb.group({
      'assessmentCategory': [null],
      'assessmentTypeID': [null],
      'dueDate': [null],
      'completedDate': [null],
      'dateSentToSRS': [null],
      'assessmentValue': [null],
      'isOnTime': [null],
      'isAccurate': [null],
      'isNA': [null],
      'notes': [null]

    });

    /**Appointments form */

    this.appointmentForm = this._fb.group({
      appointmentTypeID: [null, Validators.compose([Validators.required])],
      fromReferral: [null],
      notes: [null],
      when: [null, Validators.compose([Validators.required])],
      where: [null, Validators.compose([Validators.required])],
      withWhom: [null],
      yesNoPendingID: [null]
    })

    /**Medication form */
    this.medicationForm = this._fb.group({
      'medication': [null, Validators.compose([Validators.required])],
      'dosage': [null, Validators.compose([Validators.required])],
      'dosage_type': [null, Validators.compose([Validators.required])],
      'frequency': [null, Validators.compose([Validators.required])],
      'beignDate': [null, Validators.compose([Validators.required])],
      'endDate': [null],
      'prescribedFor': [null, Validators.compose([Validators.required])],
      'prescribed_by': [null, Validators.compose([Validators.required])],
      'source_info': [null],
      'frequencyNotes': [null]
    })

    this.planOfActionForm = this._fb.group({
      'servicesAndSupportID': [null],
      'personTypeID': [null],
      'dateInitiated': [null],
      'notes': [null]
    })
    this.otherPlacementPlanForm = this._fb.group({
      'personTypeID': [null],
      'contactTypeID': [null],
      'notes': [null],
      'name': [null],
      'phone': [null]
    })


  }

  /**Subnode crud actions */
  subnodeSave(node: string, data: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    switch (node) {
      case 'client_strength':
        !isNullOrUndefined(data.strengthID) ? data.strengthID = data.strengthID.strengthID : null;
        !isNullOrUndefined(data.strengthInformationSourceID) ? data.strengthInformationSourceID = data.strengthInformationSourceID.strengthInformationSourceID : null;
        data.clientID = this.currentClientID;
        this._clientStrength.saveClientStrength(data).then((data: any) => {
          if (data.responseStatus) {
            this.plan.placementReferralClientStrength.push({ clientStrengthID: data.clientStrength.clientStrengthID });
            loader.style.display = 'none';
            this.getClientStrengthsList();
          }
        })
        break;

      case 'extended_familymember':
        !isNullOrUndefined(data.familyMemberID) ? data.familyMemberID = data.familyMemberID.familyMemberID : null;
        !isNullOrUndefined(data.familyMemberTypeID) ? data.familyMemberTypeID = data.familyMemberTypeID.familyMemberTypeID : null;
        !isNullOrUndefined(data.frequencyTypeID) ? data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID : null;
        !isNullOrUndefined(data.personTypeID) ? data.personTypeID = data.personTypeID.personTypeID : null;
        !isNullOrUndefined(data.restrictionTypeID) ? data.restrictionTypeID = data.restrictionTypeID.restrictionTypeID : null;
        !isNullOrUndefined(data.beginDate) ? data.beginDate = Date.parse(data.beginDate) : null;
        !isNullOrUndefined(data.endDate) ? data.endDate = Date.parse(data.endDate) : null;
        data.referralID = this.currentReferralID;
        this._opencard.saveExtendedFamily(data).then((data: any) => {
          if (data.responseStatus) {
            this.plan.placementReferralVisitation.push({ familyMemberReferralID: data.FamilyMemberReferral.familyMemberReferralID });
            loader.style.display = 'none';
            this.getFamilyMemberList();
          }
        })
        break;

      case 'client_profile':
        !isNullOrUndefined(data.beginDate) ? data.beginDate = Date.parse(data.beginDate) : null;
        !isNullOrUndefined(data.endDate) ? data.endDate = Date.parse(data.endDate) : null;
        data.lastOccurrence = this._localValues.stringFormatDatetime(Date.parse(data.lastOccurrence));
        !isNullOrUndefined(data.notificationDate) ? data.notificationDate = Date.parse(data.notificationDate) : null;
        !isNullOrUndefined(data.conditionID) ? data.conditionID = data.conditionID.conditionID : null;
        !isNullOrUndefined(data.frequencyTypeID) ? data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID : null;
        !isNullOrUndefined(data.riskID) ? data.riskID = data.riskID.riskID : null;
        data.clientID = this.currentClientID;
        this._caseTeam.saveClientProfile(data).then((data: any) => {
          if (data.responseStatus) {
            this.plan.placementReferralClientProfile.push({ clientProfileID: data.clientProfile.clientProfileID });
            loader.style.display = 'none';
            this.getClientProfileList();
          }
        })
        break;

      case 'preventative_measurements':
        !isNullOrUndefined(data.beginDate) ? data.beginDate = Date.parse(data.beginDate) : null;
        !isNullOrUndefined(data.endDate) ? data.endDate = Date.parse(data.endDate) : null;
        !isNullOrUndefined(data.preventativeMeasureID) ? data.preventativeMeasureID = data.preventativeMeasureID.preventativeMeasureID : null;
        data.clientID = this.currentClientID;
        this._opencard.savePm(data).then((data: any) => {
          if (data.responseStatus) {
            this.plan.placementReferralPreventativeMeasure.push({ clientPreventativeMeasureID: data.clientPreventativeMeasure.clientPreventativeMeasureID });
            loader.style.display = 'none';
            this.getPreventativeMeasuresList();
          }
        })
        break;

      case 'assesments':
        !isNullOrUndefined(data.assessmentTypeID) ? data.assessmentTypeID = data.assessmentTypeID.assessmentTypeID : null;
        !isNullOrUndefined(data.completedDate) ? data.completedDate = Date.parse(data.completedDate) : null;
        !isNullOrUndefined(data.dateSentToSRS) ? data.dateSentToSRS = Date.parse(data.dateSentToSRS) : null;
        !isNullOrUndefined(data.dueDate) ? data.dueDate = Date.parse(data.dueDate) : null;
        data.clientID = this.currentClientID;
        data.referralID = this.currentReferralID;
        this._opencard.saveAsssessments(data).then((data: any) => {
          if (data.responseStatus) {
            this.plan.placementReferralAssessment.push({ assessmentID: data.assessment.assessmentID })
            loader.style.display = 'none';
            this.getAssessmentsList();
          }
        })
        break;

      case 'appointments':
        !isNullOrUndefined(data.when) ? data.when = Date.parse(data.when) : null;
        !isNullOrUndefined(data.appointmentTypeID) ? data.appointmentTypeID = data.appointmentTypeID.appointmentTypeID : null
        data.referralID = this.currentReferralID;
        this._opencard.saveAppointments(data).then((data: any) => {
          if (data.responseStatus) {
            this.plan.placementReferralAppointment.push({ appointmentID: data.appointment.appointmentID })
            loader.style.display = 'none';
            this.getAppointmentsList();
          }
        })
        break;

      case 'medications':
        !isNullOrUndefined(data.beginDate) ? data.beginDate = Date.parse(data.beginDate) : null;
        !isNullOrUndefined(data.endDate) ? data.endDate = Date.parse(data.endDate) : null;
        !isNullOrUndefined(data.dosageTypeID) ? data.dosageTypeID = data.dosageTypeID = data.dosageTypeID.dosageTypeID : null;
        !isNullOrUndefined(data.frequencyTypeID) ? data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID : null;
        data.client = this.currentClientID;
        this._medications.saveMedication(data).then((data: any) => {
          if (data.responseStatus) {
            this.plan.placementReferralMedication.push({ clientMedicationID: data.clientMedication.clientMedicationID })
            loader.style.display = 'none';
            this.getMedicationsList();
          }
        })
        break;

      case 'plan_of_action':
        this.planOfActionListInfo.push(data);
        (data.servicesAndSupportID) ? this.planOfActionListInfo[this.planOfActionListInfo.length - 1]['servicesAndSupport'] = data.servicesAndSupportID.servicesAndSupport : null;
        (data.personTypeID) ? this.planOfActionListInfo[this.planOfActionListInfo.length - 1]['personType'] = data.personTypeID.personType : null;
        data.dateInitiated = this._localValues.stringFormatDatetime(data.dateInitiated);
        !isNullOrUndefined(data.personTypeID) ? data.personTypeID = data.personTypeID.personTypeID : null;
        !isNullOrUndefined(data.servicesAndSupportID) ? data.servicesAndSupportID = data.servicesAndSupportID.servicesAndSupportID : null;

        this.planOfActionSaveData.push(data);
        loader.style.display = 'none';
        break;

      case 'otherParticipantPlan':
        this.otherPlanParticipantsInfo.push(data);
        (data.name) ? this.otherPlanParticipantsInfo[this.otherPlanParticipantsInfo.length - 1]['Name'] = data.name : null;
        (data.personTypeID) ? this.otherPlanParticipantsInfo[this.otherPlanParticipantsInfo.length - 1]['personType'] = data.personTypeID.personType : null;
        (data.contactTypeID) ? this.otherPlanParticipantsInfo[this.otherPlanParticipantsInfo.length - 1]['ContactType'] = data.contactTypeID.contactType : null;

        !isNullOrUndefined(data.contactTypeID) ? data.contactTypeID = data.contactTypeID = data.contactTypeID.contactTypeID : null;
        !isNullOrUndefined(data.personTypeID) ? data.personTypeID = data.personTypeID = data.personTypeID.personTypeID : null;
        this.otherParticipantSaveData.push(data);
        loader.style.display = 'none';
        break;
    }
  }

  subnodeUpdate(node: string, data: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    switch (node) {
      case 'client_strength':
        !isNullOrUndefined(data.strengthID) ? data.strengthID = data.strengthID.strengthID : null;
        !isNullOrUndefined(data.strengthInformationSourceID) ? data.strengthInformationSourceID = data.strengthInformationSourceID.strengthInformationSourceID : null;
        this._clientStrength.updateClientStrength(data).then((data: any) => { if (data.responseStatus) { this.getClientStrengthsList(); loader.style.display = 'none'; } })
        break;

      case 'extended_familymember':
        !isNullOrUndefined(data.familyMemberID) ? data.familyMemberID = data.familyMemberID.familyMemberID : null;
        !isNullOrUndefined(data.familyMemberTypeID) ? data.familyMemberTypeID = data.familyMemberTypeID.familyMemberTypeID : null;
        !isNullOrUndefined(data.frequencyTypeID) ? data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID : null;
        !isNullOrUndefined(data.personTypeID) ? data.personTypeID = data.personTypeID.personTypeID : null;
        !isNullOrUndefined(data.restrictionTypeID) ? data.restrictionTypeID = data.restrictionTypeID.restrictionTypeID : null;
        !isNullOrUndefined(data.beginDate) ? data.beginDate = Date.parse(data.beginDate) : null;
        !isNullOrUndefined(data.endDate) ? data.endDate = Date.parse(data.endDate) : null;
        data.referralID = this.currentReferralID;
        this._opencard.saveExtendedFamily(data).then((data: any) => { if (data.responseStatus) { this.getFamilyMemberList(); loader.style.display = 'none'; } })
        break;

      case 'client_profile':
        !isNullOrUndefined(data.beginDate) ? data.beginDate = Date.parse(data.beginDate) : null;
        !isNullOrUndefined(data.endDate) ? data.endDate = Date.parse(data.endDate) : null;
        !isNullOrUndefined(data.lastOccurrence) ? data.lastOccurrence = Date.parse(data.lastOccurrence) : null;
        !isNullOrUndefined(data.notificationDate) ? data.notificationDate = Date.parse(data.notificationDate) : null;
        !isNullOrUndefined(data.conditionID) ? data.conditionID = data.conditionID.conditionID : null;
        !isNullOrUndefined(data.frequencyTypeID) ? data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID : null;
        !isNullOrUndefined(data.riskID) ? data.riskID = data.riskID.riskID : null;
        data.clientID = this.currentClientID;
        this._caseTeam.updateClientProfile(data).then((data: any) => { if (data.responseStatus) { this.getClientProfileList(); loader.style.display = 'none'; } })
        break;

      case 'preventative_measurements':
        !isNullOrUndefined(data.beginDate) ? data.beginDate = Date.parse(data.beginDate) : null;
        !isNullOrUndefined(data.endDate) ? data.endDate = Date.parse(data.endDate) : null;
        !isNullOrUndefined(data.preventativeMeasureID) ? data.preventativeMeasureID = data.preventativeMeasureID.preventativeMeasureID : null;
        data.clientID = this.currentClientID;
        this._opencard.updatePm(data).then((data: any) => { if (data.responseStatus) { this.getPreventativeMeasuresList(); loader.style.display = 'none'; } })
        break;

      case 'assesments':
        !isNullOrUndefined(data.assessmentTypeID) ? data.assessmentTypeID = data.assessmentTypeID.assessmentTypeID : null;
        !isNullOrUndefined(data.completedDate) ? data.completedDate = Date.parse(data.completedDate) : null;
        !isNullOrUndefined(data.dateSentToSRS) ? data.dateSentToSRS = Date.parse(data.dateSentToSRS) : null;
        !isNullOrUndefined(data.dueDate) ? data.dueDate = Date.parse(data.dueDate) : null;
        data.clientID = this.currentClientID;
        data.referralID = this.currentReferralID;
        this._opencard.updateAssessments(data).then((data: any) => {
          if (data.responseStatus) {
            this.getAssessmentsList();
            loader.style.display = 'none';
          }
        })
        break;

      case 'appointments':
        !isNullOrUndefined(data.when) ? data.when = Date.parse(data.when) : null;
        !isNullOrUndefined(data.appointmentTypeID) ? data.appointmentTypeID = data.appointmentTypeID.appointmentTypeID : null;
        data.referralID = this.currentReferralID;
        this._opencard.updateAppointments(data).then((data: any) => {
          if (data.responseStatus) {
            this.getAppointmentsList();
            loader.style.display = 'none';
          }
        })
        break;

      case 'medications':
        !isNullOrUndefined(data.beginDate) ? data.beginDate = Date.parse(data.beginDate) : null;
        !isNullOrUndefined(data.endDate) ? data.endDate = Date.parse(data.endDate) : null;
        !isNullOrUndefined(data.dosageTypeID) ? data.dosageTypeID = data.dosageTypeID = data.dosageTypeID.dosageTypeID : null;
        !isNullOrUndefined(data.frequencyTypeID) ? data.frequencyTypeID = data.frequencyTypeID.frequencyTypeID : null;
        data.client = this.currentClientID;
        this._medications.updateMedication(data).then((data: any) => {
          if (data.responseStatus) {
            this.getMedicationsList();
            loader.style.display = 'none';
          }
        })
        break;
    }
  }

  subnodeGetById(node: string, data: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    let req = {}
    switch (node) {
      case 'client_strength':
        /**conversions,assign the result sets, validate and open window */
        this._clientStrength.getClientStrengthRecord(data.clientStrengthID)
          .then((data: any) => {
            if (data.responseStatus) {
              this.strength = data.clientStrength
              this.isClientStrengthForm = true;
              loader.style.display = 'none';
            }
          })
        break;

      case 'extended_familymember':
        req = { familyMemberReferralID: data.familyMemberReferralID }
        this._opencard.getExtendedFamilyById(req)
          .then((data: any) => {
            if (data.responseStatus) {
              !isNullOrUndefined(data.FamilyMemberReferral.beginDate) ? data.FamilyMemberReferral.beginDate = new Date(data.FamilyMemberReferral.beginDate) : null;
              !isNullOrUndefined(data.FamilyMemberReferral.endDate) ? data.FamilyMemberReferral.endDate = new Date(data.FamilyMemberReferral.endDate) : null;
              !isNullOrUndefined(data.FamilyMemberReferral.familyMemberID) ?
                data.FamilyMemberReferral.familyMemberID = { name: `${data.FamilyMemberReferral.familyMemberID.lastName},${data.FamilyMemberReferral.familyMemberID.firstName}` } : null;
              this.fpExtendedFamily = data.FamilyMemberReferral
              this.isFamilyMemberForm = true;
              loader.style.display = 'none';
            }
          })
        break;

      case 'client_profile':
        req = { clientProfileID: data.clientProfileID }
        this._caseTeam.getClientProfileById(req)
          .then((data: any) => {
            if (data.responseStatus) {
              !isNullOrUndefined(data.clientProfile.beginDate) ? data.clientProfile.beginDate = new Date(data.clientProfile.beginDate) : null;
              !isNullOrUndefined(data.clientProfile.endDate) ? data.clientProfile.endDate = new Date(data.clientProfile.endDate) : null;
              !isNullOrUndefined(data.clientProfile.lastOccurrence) ? data.clientProfile.lastOccurrence = new Date(data.clientProfile.lastOccurrence) : null;
              !isNullOrUndefined(data.clientProfile.notificationDate) ? data.clientProfile.notificationDate = new Date(data.clientProfile.notificationDate) : null;
              this.clientProfile = data.clientProfile
              this.isClientProfileForm = true;
              loader.style.display = 'none';
            }
          })
        break;

      case 'preventative_measurements':
        req = { clientPreventativeMeasureID: data.clientPreventativeMeasureID }
        this._opencard.getByIdPm(req)
          .then((data: any) => {
            if (data.responseStatus) {
              !isNullOrUndefined(data.clientPreventativeMeasure.beginDate) ? data.clientPreventativeMeasure.beginDate = new Date(data.clientPreventativeMeasure.beginDate) : null;
              !isNullOrUndefined(data.clientPreventativeMeasure.endDate) ? data.clientPreventativeMeasure.endDate = new Date(data.clientPreventativeMeasure.endDate) : null;
              this.pm = data.clientPreventativeMeasure;
              this.isPreventativeMeasurementForm = true;
              loader.style.display = 'none';
            }
          })
        break;

      case 'assesments':
        req = { assessmentID: data.assessmentID }
        this._opencard.getAssessmentRec(req)
          .then((data: any) => {
            if (data.responseStatus) {
              !isNullOrUndefined(data.assessment.completedDate) ? data.assessment.completedDate = new Date(data.assessment.completedDate) : null;
              !isNullOrUndefined(data.assessment.dateSentToSRS) ? data.assessment.dateSentToSRS = new Date(data.assessment.dateSentToSRS) : null;
              !isNullOrUndefined(data.assessment.completedDate) ? data.assessment.completedDate = new Date(data.assessment.completedDate) : null;
              !isNullOrUndefined(data.assessment.assessmentTypeID) ? this.fpassess.assessmentCat = data.assessment.assessmentTypeID.assessmentGroupID : null;
              this.fpassess = data.assessment;
              this.isAssessmentForm = true;
              loader.style.display = 'none';
            }
          })
        break;

      case 'appointments':
        req = { appointmentID: data.appointmentID }
        this._opencard.getByIdAppointments(req)
          .then((data: any) => {
            if (data.responseStatus) {
              !isNullOrUndefined(data.appointment.when) ? data.appointment.when = new Date(data.appointment.when) : null;
              this.appointment = data.appointment;
              this.isAppointmentsForm = true;
              loader.style.display = 'none';
            }
          })
        break;

      case 'medications':
        req = { clientMedicationID: data.clientMedicationID }
        this._medications.getMedicationById(req)
          .then((data: any) => {
            if (data.responseStatus) {
              !isNullOrUndefined(data.clientMedication.beginDate) ? data.clientMedication.beginDate = new Date(data.clientMedication.beginDate) : null;
              !isNullOrUndefined(data.clientMedication.endDate) ? data.clientMedication.endDate = new Date(data.clientMedication.endDate) : null;
              this.medication = data.clientMedication;
              this.isMedicationForm = true;
              loader.style.display = 'none';
            }
          })
        break;

      case 'plan_of_action':
        this.isPlanOfActionForm = true;
        loader.style.display = 'none';
        break;

      case 'otherParticipantPlan':
        this.isOtherParticipantPlanForm = true;
        loader.style.display = 'none';
        break;
    }

  }

  /**Utilites */

  warning() { return swal('Info', 'Please check the mandatory fields', 'info') }

  showTime(timeStamp: number) { return this._localValues.getDateWithExt(timeStamp) }

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
    let daysDueFromReferral: any, referralDate: any, dueDate: any
    daysDueFromReferral = event.daysDueFromReferral;
    referralDate = this.currentReferralID == 1 ? localStorage.getItem('referralRFCBeginDate') : localStorage.getItem('referralbeginDate');
    dueDate = this.currentReferralID == 1 ? parseInt(referralDate) + (daysDueFromReferral) : new Date(referralDate).getTime() + (daysDueFromReferral) * 86400000;
    this.fpassess.dueDate = moment.utc(dueDate).format('MM/DD/YYYY HH:mm');

  }

  setFamilyMember(modal, key) {
    modal[key] = modal.firstName + " " + modal.lastName;
    return modal;
  }

  /** Get record by id */

  getRecById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    loader.style.display = 'none';
    this.isEditControl = true;

    this.req = { placementPlanID: this.currentPlacementPlanId }
    this._opencard.getByIdPlacementPlan(this.req).then((data: any) => {
      if (data.placementPlanDetails) {
        (data.placementPlanDetails.mentalHealthServices) ? data.placementPlanDetails.mentalHealthServices = 1 : data.placementPlanDetails.mentalHealthServices = 2;
        (data.placementPlanDetails.parentGuardianParticipation) ? data.placementPlanDetails.parentGuardianParticipation = 1 : data.placementPlanDetails.parentGuardianParticipation = 2;
        if (data.placementPlanDetails.parentGuardian1_FamilyMemberID) {
          data.placementPlanDetails.parentGuardian1_FamilyMemberID = this.setFamilyMember(data.placementPlanDetails.parentGuardian1_FamilyMemberID, 'familyMember')
        }
        (data.placementPlanDetails.parentGuardian1_PhoneTypeID) ? data.placementPlanDetails.parentGuardian1_PhoneTypeID = data.placementPlanDetails.parentGuardian1_PhoneTypeID.phoneType.toLowerCase() : null;
        (data.placementPlanDetails.resourceWorker_PhoneTypeID) ? data.placementPlanDetails.resourceWorker_PhoneTypeID = data.placementPlanDetails.resourceWorker_PhoneTypeID.phoneType.toLowerCase() : null;


        if (data.placementPlanDetails.parentGuardian2_FamilyMemberID) {
          data.placementPlanDetails.parentGuardian2_FamilyMemberID = this.setFamilyMember(data.placementPlanDetails.parentGuardian2_FamilyMemberID, 'familyMember')
        }
        (data.placementPlanDetails.parentGuardian2_PhoneTypeID) ? data.placementPlanDetails.parentGuardian2_PhoneTypeID = data.placementPlanDetails.parentGuardian2_PhoneTypeID.phoneType.toLowerCase() : null;
        (data.placementPlanDetails.caseManager_PhoneTypeID) ? data.placementPlanDetails.caseManager_PhoneTypeID = data.placementPlanDetails.caseManager_PhoneTypeID.phoneType.toLowerCase() : null;
        (data.placementPlanDetails.familySupportWorker_PhoneTypeID) ? data.placementPlanDetails.familySupportWorker_PhoneTypeID = data.placementPlanDetails.familySupportWorker_PhoneTypeID.phoneType.toLowerCase() : null;
        (data.placementPlanDetails.supervisor_PhoneTypeID) ? data.placementPlanDetails.supervisor_PhoneTypeID = data.placementPlanDetails.supervisor_PhoneTypeID.phoneType.toLowerCase() : null;
        if (data.placementPlanDetails.resourceParent1_ProviderMemberID) {
          data.placementPlanDetails.resourceParent1_ProviderMemberID = this.setFamilyMember(data.placementPlanDetails.resourceParent1_ProviderMemberID, 'providerMember')
        }
        if (data.placementPlanDetails.resourceParent2_ProviderMemberID) {
          data.placementPlanDetails.resourceParent2_ProviderMemberID = this.setFamilyMember(data.placementPlanDetails.resourceParent2_ProviderMemberID, 'providerMember')
        }
        (data.placementPlanDetails.childSignature_ContactTypeID) ? data.placementPlanDetails.childSignature_ContactTypeID = data.placementPlanDetails.childSignature_ContactTypeID.contactTypeID : null;
        (data.placementPlanDetails.parentGuardian1Signature_ContactTypeID) ? data.placementPlanDetails.parentGuardian1Signature_ContactTypeID = data.placementPlanDetails.parentGuardian1Signature_ContactTypeID.contactTypeID : null;
        (data.placementPlanDetails.parentGuardian2Signature_ContactTypeID) ? data.placementPlanDetails.parentGuardian2Signature_ContactTypeID = data.placementPlanDetails.parentGuardian2Signature_ContactTypeID.contactTypeID : null;
        (data.placementPlanDetails.caseManagerSignature_ContactTypeID) ? data.placementPlanDetails.caseManagerSignature_ContactTypeID = data.placementPlanDetails.caseManagerSignature_ContactTypeID.contactTypeID : null;
        (data.placementPlanDetails.supervisorSignature_ContactTypeID) ? data.placementPlanDetails.supervisorSignature_ContactTypeID = data.placementPlanDetails.supervisorSignature_ContactTypeID.contactTypeID : null;
        (data.placementPlanDetails.resourceParent1Signature_ContactTypeID) ? data.placementPlanDetails.resourceParent1Signature_ContactTypeID = data.placementPlanDetails.resourceParent1Signature_ContactTypeID.contactTypeID : null;
        (data.placementPlanDetails.resourceParent2Signature_ContactTypeID) ? data.placementPlanDetails.resourceParent2Signature_ContactTypeID = data.placementPlanDetails.resourceParent2Signature_ContactTypeID.contactTypeID : null;

        (data.placementPlanDetails.resourceWorker_ContactTypeID) ? data.placementPlanDetails.resourceWorker_ContactTypeID = data.placementPlanDetails.resourceWorker_ContactTypeID.contactTypeID : null;



        (data.placementPlanDetails.resourceParent1_PhoneTypeID) ? data.placementPlanDetails.resourceParent1_PhoneTypeID = data.placementPlanDetails.resourceParent1_PhoneTypeID.phoneType.toLowerCase() : null;
        (data.placementPlanDetails.resourceParent2_PhoneTypeID) ? data.placementPlanDetails.resourceParent2_PhoneTypeID = data.placementPlanDetails.resourceParent2_PhoneTypeID.phoneType.toLowerCase() : null;

        if (data.placementPlanDetails.statusTypeID) {
          if (data.placementPlanDetails.statusTypeID.statusTypeID == 13) {
            this.isDraftChecked = 13
          }
          else {
            this.isDraftChecked = 9
          }

        }
        else {
          this.isDraftChecked = 9
        }
        (data.placementPlanDetails.dateOfCompletion) ? data.placementPlanDetails.dateOfCompletion = moment.utc(data.placementPlanDetails.dateOfCompletion).format('MM/DD/YYYY HH:mm') : null;
        this.plan = data.placementPlanDetails;
        this._opencard.storePlacementPlanInfo(this.plan, this.autofetchInfo)
      }

      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.placementPlanDetails.changedBy) ? data.placementPlanDetails.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.placementPlanDetails.changedDate) ? moment(data.placementPlanDetails.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.placementPlanDetails.enteredBy) ? data.placementPlanDetails.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.placementPlanDetails.enteredDate) ? moment(data.placementPlanDetails.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  /**Get State */
  getState(event: any) {

    let req = { value: event.query, beginPagination: 1, endPagination: 100, sort: { column: "Abbreviation", mode: "desc" } }
    this.metaData = [];
    this._opencard.getState(req)
      .then((data: any) => {
        this.metaData = data.stateList
      })
  }

  onSelectState(event: any) {
    this.selectedStateID = event.StateID;
  }

  /**Get State from city */
  getCityFromSelectedState(event: any) {

    let req = { value: event.query, beginPagination: 1, endPagination: 100, stateID: this.selectedStateID, sort: { column: "city", mode: "desc" } }
    this.metaData = [];
    this._opencard.getStateFromCity(req)
      .then((data: any) => {
        this.metaData = data.cityList
      })
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
    (event.target.textContent === 'Yes') && (field === 'pendingCharges') ? this.isPendingCharges = true : this.isPendingCharges = false;
    (event.target.textContent === 'Yes') && (field === 'communtiyServiceHours') ? this.isCommunityServiceHours = false : this.isCommunityServiceHours = true;
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
    let statusTypeID: any
    delete this.autoFetch.statusTypeID;
    if (this.placementRef.isInitial == 'yes') {
      statusTypeID = 12;
    } else if (this.isDraft == 'yes') {
      statusTypeID = 13;
    } else if (this.isDraft != 'yes') {
      statusTypeID = 4;
    } else {
      statusTypeID = 9;
    }
    return statusTypeID;
  }

  expandCollapseCall() {
    this.isTabCollapsed = !this.isTabCollapsed;
    (this.isTabCollapsed) ? this.accordionTabLabel = 'Collapse' : this.accordionTabLabel = 'Expand';
  }

  navigateTo() {

    let currentURL = this._router.url.includes('?') ? this._router.url.split('?')[0] : this._router.url;
    if (currentURL == '/reintegration/referral/opencard/placement/placementPlan/detail') {
      this.url = '/reports/attachment-document/rfc/placement-plan';
    }

    return this._router.navigate([this.url])
  }

  getRespiteAuthorization() {
    let placementReq = { placementID: this.currentPlacementId }
    this._placement.getRespiteAuthorization(placementReq).then((data: any) => {
      this.isRespiteAuthFetched = true;
      this.respiteAuthorization = data.respiteAuthorization;
    })
  }

  participateSelectionTrigger() {

    if (this.plan.parentGuardianParticipation == '1') {
      this.isParentGuardianDisabled = false;
    }
    else if (this.plan.parentGuardianParticipation == '2') {
      this.isParentGuardianDisabled = true;
    }
  }

  onParticipateSelection() {
    setTimeout(() => {
      this.participateSelectionTrigger()
    }, 1000)


  }

  generatePersonTypes() {
    let req, referralTypeId;
    let date = new Date();

    let selectedDate = Date.parse(date.toDateString())
    referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._openCard.getHasKey();
    req = { referralTypeID: referralTypeId, beginDate: selectedDate }
    this._openCard.getPeronTypeByReferralTypeId(req).then((data) => {

      this.personTypes = data.dropDown;

    })
  }

  getContactType() {
    this.contactTypes = [
      {
        contactType: 'In Person',
        contactTypeID: 76
      },
      {
        contactType: 'By Phone',
        contactTypeID: 2
      },
      {
        contactType: 'By Email',
        contactTypeID: 77
      },
    ]
  }

  onExportFile() {
    this.exportReq['fileName'] = this.exportFileName;
    this.isExportTextShow = true;
    this._opencard.exportPlacementPlanSubnodeListView(this.exportReq)
      .then((data: any) => {
        window.open(data.filePath);
        this.exportFileName = '';
        this.isExportsPrompt = false;
        this.isExportTextShow = false;
      })
  }

  onExportPromptOpen(tableName: string) {
    this.isExportsPrompt = true;
    this.exportReq = {
      "placementPlanID": this.currentPlacementPlanId || 0,
      "fileName": ""
    }
    switch (tableName) {
      case 'Client Strength':
        this.exportFileName = 'Placement Plan - Client Strength';
        this.exportReq['export'] = 'clientStrength';
        this.exportReq['clientID'] = this.currentClientID;
        this.exportReq['isLinked'] = false;
        break;
      case 'Client Profile':
        this.exportFileName = 'Placement Plan - Client Profile';
        this.exportReq['export'] = 'clientProfile';
        this.exportReq['clientID'] = this.currentClientID;
        this.exportReq['isLinked'] = false;
        break;
      case 'preventative-measurements':
        this.exportFileName = 'Placement Plan - Preventative Measurements';
        this.exportReq['export'] = 'clientPreventativeMeasure';
        this.exportReq['clientID'] = this.currentClientID;
        this.exportReq['isLinked'] = false;
        break;
      case 'respiteAuthorization':
        this.exportFileName = 'Placement Plan - Respite Authorization';
        this.exportReq['export'] = 'respiteAuthorization';
        this.exportReq['placementID'] = this.currentPlacementId;
        this.exportReq['isLinked'] = false;
        break;
      case 'medications':
        this.exportFileName = 'Placement Plan - Medications';
        this.exportReq['export'] = 'clientMedication';
        this.exportReq['clientID'] = this.currentClientID;
        this.exportReq['isLinked'] = false;
        break;
      case 'otherPlacementPlanParticipants':
        this.exportFileName = 'Placement Plan - Other Placement Plan Participants';
        this.exportReq['export'] = 'otherPlacementPlanParticipants';
        break;
      case 'planOfAction':
        this.exportFileName = 'Placement Plan - Plan Of Actions';
        this.exportReq['export'] = 'planOfAction';
        break;
      case 'providerStrength':
        this.exportFileName = 'Placement Plan - Resource Family Strength';
        this.exportReq['export'] = 'providerStrength';
        this.exportReq['isLinked'] = false;
        this.exportReq['providerID'] = this._localValues.currentPlacementProviderID;
        break;
    }
  }

  ngOnDestroy() {
    this._router.navigate(
      [],
      {
        relativeTo: this._activatedRoute,
        queryParams: { pp_id: null },
        queryParamsHandling: 'merge'
      });
  }

  generateSupportID() {
    this._openCard.getServiceAndSupport().then((data) => {

      this.serviceSupports = data.servicesAndSupport;

    })
  }




}
