

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Placement, authorization, respiteAuthorization, placementDetail, Disruption, PlacementEdit, PlacementBehavioursUpdate, ReferralDates, DisruptionUpdate, PlacementMoveEventUpdate, IdentifiedResourceUpdate, AuthorizationException } from './placement';
import { CaseTeamService } from '../../../case-team/case-team.service';
import swal from "sweetalert2";
import { PlacementService } from '../../../placement/placement.service';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { isNullOrUndefined } from 'util';
import { AttendingSchool } from '../../../attending-school/attending-school';
import { HomeSchoolComponent } from '../../../home-school/home-school.component';
import { HomeSchool } from '../../../home-school/home-school';
import { AttendingSchoolComponent } from '../../../attending-school/attending-school.component';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import {LocalValues} from '../../../local-values';
import * as moment from 'moment';
import { PlacementPrintService } from '../../../placement-forms/placement-print.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-placement-history',
  templateUrl: './placement-history.component.html',
  styleUrls: ['./placement-history.component.scss']
})
export class PlacementHistoryComponent implements OnInit {

  mainTabs = [];
  sIndex = 0;
  breadcrumbs = [];
  url: any;
  isAttachmentRequired = false;
  placementForm: FormGroup;
  placement: Placement = new Placement();
  metaData = [];
  school_data: any = { from_school: "", to_school: "", placement: "", date: "" };
  sibs_data: any = {
    name: "",
    dob: "",
    client_id: "",
    eff_date: "",
    adds: "",
    remove: ""
  };
  school_IndexId: any;
  school_IndexStatus: boolean;
  sibs_IndexId: any;
  sibs_IndexStatus: boolean;
  dcfDisable: boolean;
  jjaDisable: boolean;
  valueDisable: boolean;
  masterData = [];
  placementReferrals = [];
  filteredPlacementReferrals = [];
  reasonForMoves = [];
  filteredReasonForMoves = [];
  reasonForChanges = [];
  filteredReasonForChanges = [];
  reasonForNotPlacedTogether = [];
  filteredReasonForNotPlacedTogether = [];
  disruptionTypes = [];
  filtereddisruptionTypes = [];
  disruptionReason = [];
  filtereddisruptionReasons = [];
  overrideROC = [];
  filteredOverrideROC = [];
  overridePED = [];
  filteredOverridePED = [];
  releaseOfcustody = [];
  filteredReleaseOfCustody = [];
  auth: authorization = new authorization();
  respite: respiteAuthorization = new respiteAuthorization();
  attendingSchool: AttendingSchool = new AttendingSchool();
  attendingSchoolForm: FormGroup;
  homeSchoolForm: FormGroup;
  isAttendingSchool = false;
  isHomeSchool = false;
  _clientService: ClildFormService;
  homeSchoolComp: HomeSchoolComponent = new HomeSchoolComponent(this._fb, this._router, this._caseTeam, this._clientService, this._openCard, this._localValues, this._message);
  homeSchool: HomeSchool = new HomeSchool();
  attendingSchoolComp: AttendingSchoolComponent = new AttendingSchoolComponent(this._fb, this._caseTeam, this._openCard, this._router, this._clientService, this._localValues, this._message)
  homeSchoolList = [];
  homeSchoolListHeaders = [];
  isHomeSchoolList = false;
  homeSchoolBtnLabel = 'Save';
  attendinSchoolListHeaders = [];
  attendingSchoolList = [];
  attendingSchoolBtnLabel = 'Save';
  isAttendingSchoolList: any;
  placementDetail: placementDetail = new placementDetail();
  clientSchoolPlacements = []
  isAuthException = false;
  disruption: Disruption = new Disruption();
  isPlacementCreateForm = true;
  placementEdit: PlacementEdit = new PlacementEdit();
  editTabs = [];
  editForm: FormGroup;
  isReferralDateFieldsDiabled = false;
  isEdit = false;
  placementbehaviourUpdate: PlacementBehavioursUpdate = new PlacementBehavioursUpdate();
  referralDates: ReferralDates = new ReferralDates();
  disruptionUpdate: DisruptionUpdate = new DisruptionUpdate();
  placementMoveEvent: PlacementMoveEventUpdate = new PlacementMoveEventUpdate();
  identifiedResource: IdentifiedResourceUpdate = new IdentifiedResourceUpdate();
  authException: AuthorizationException = new AuthorizationException();
  placementPrintItems = [];
  moveEvents = [];
  filteredMoveEventsData = [];
  isReasonNotPlacedTogetherEnable = false;
  currentPlacementId: number;
  currentPlacementDetailId: number;
  currentURL: string;
  isPlacementDetailFetched = false;
  isReferralDatesFetched = false;
  isDetailsPage = false;
  isPlacementEditFetched = false;
  isDataFetchCompleted = false;
  isPrintNavigation = true;
  disruptionDetail: any;
  disruptionInfoprev_PlacementID: any;
  disruptionInfoDisruptionReason: any;
  disruptionInfoDisruptionType: any;
  disruptionInfoOtherOptionsOffered: any;
  disruptionInfoRequestedType: any;
  disruptionInfoRequestedStaff: any;
  behaviors: any;
  providerFullAddress = "";
  previousPlacementProviderName = "";

  isAckOptions = false;
  printAckHeader = 'Acknowledgement Options';
  moduleName = "PlacementEvent";
  caseManagerList = [];
  caseManagerChangeReasonList = [];
  judgeList = [];
  schoolList = [];
  attendingHomeSchoolReasonList = [];
  reasonLateList = [];
  authId: any;
  placementList = [];
  clientSchoolPlacementsDropdown = [];
  clientSchoolPlacementsInfo = [];
  clientSchoolPlacementsData = [];
  placementReq: any;
  placementEventReq: any;
  isMandatorySymbolAllowed = true;
  currentProviderId: any;
  isPopup = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _placementPrint: PlacementPrintService, public _router: Router, public _fb: FormBuilder, public _caseTeam: CaseTeamService,
    public _placement: PlacementService, public _openCard: OpencardsService,
    public _localValues: LocalValues, public _activatedRoute: ActivatedRoute, public _message: MessageService) { }

  ngOnInit() {
    // selectedReferralId = null;
    // selectedClientId = null;
    this.getListViewData();
    this.currentURL = this._router.url.includes('?') ? this._router.url.split('?')[0] : this._router.url;
    this.setIndex(0);
    this.listPlacements();

    // this.currentPlacementId = parseInt(this._activatedRoute.snapshot.queryParamMap.get('p_id'));
    // this.currentPlacementDetailId = parseInt(this._activatedRoute.snapshot.queryParamMap.get('pd_id'));
    this._placement.storeSavedPlacementID(this.currentPlacementId);
    this._placement.storeSavedPlacementDetailID(this.currentPlacementDetailId);
    // this.breadcrumbs.push(
    //   { label: 'List', href: '/reports/client', active: '' },
    //   { label: 'Form', href: '/reports/client/details', active: '' },
    //   { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
    //   { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },

    //   { label: 'Placements', active: '', href: '/reintegration/referral/opencard/placement/detail' },
    //   { label: 'Placements Event List', active: '', href: '/reintegration/referral/opencard/placement/placementEvent/view' },
    //   { label: 'Placements Event', active: 'active' }
    // );
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider List', href: '/reports/provider/view', active: '' },
      { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Placement Payments', active: '', href: '/provider/dashboard/placements-payments' },
      { label: 'Placement History List', active: '', href: '/provider/opencard/placement-history/view' },
      { label: 'Placement History', active: 'active', href: '/provider/opencard/placement-history/view' },
    );
    this.formValidation();

    if (this._localValues.isPlacementNewValidationSet) {
      this.isMandatorySymbolAllowed = false;
    }

    /** Autofecth value for new form */
    if (this._router.url.includes('/reintegration/referral/opencard/placement/placementEvent/new')) {
      if (this._localValues.currentPlacementProviderInfo) {
        this.placement.providerID = {
          providerID: this._localValues.currentPlacementProviderInfo.providerID,
          ProviderName: this._localValues.currentPlacementProviderInfo.providerName,
        };
      }

      this.placement.beginDate = new Date(this._localValues.stringFormatDatetime(Date.now()));
      this.placement.beginDate.setHours(0);
      this.placement.beginDate.setMinutes(0);
      this.placement.beginDate.setSeconds(0);

      this.getReferralDates()
      this.defineMainTabs();
      this.checkHasSiblinginOOHPlacement();
      this.unitsPerMonthValue();

      // this.respite.beginDate = new Date();
      this.respite.beginDate = new Date(this._localValues.stringFormatDatetime(Date.now()));
      this.respite.beginDate.setHours(0);
      this.respite.beginDate.setMinutes(0);
      this.respite.beginDate.setSeconds(0);
      this.auth.authorizationStatusID = {
        authorizationStatus: "Active",
        authorizationStatusID: 3,
        createdDate: null,
        isActive: null,
        isDeleted: null,
        lastModifiedDate: null,
        pdatedDate: null
      };
      this.beginDateBasedMasters(new Date())
    }


    this.getMasterDetails();
    this.attendingSchoolFormValidation();
    this.homeSchoolValidation();
    this.getHomeSchoolList();
    this.getAttendingSchoolList();
    let referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._openCard.getHasKey();
    if (referralTypeId === 4) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('placements-NCFCH', this.breadcrumbs)
    }
    /*** Edit form */
    if (this.currentURL == '/provider/opencard/placement-history/detail') {
      this.isAttachmentRequired = true;
      this.isDetailsPage = true;
      this.isPlacementCreateForm = false;
      console.log("if detail page passed");
      console.log("this.isPlacementCreateForm is", this.isPlacementCreateForm);
      this.editFormValidation();
      this.defineEditTabs();
      this.getPlacementRecordById();
    }
    else {

      console.log("else new page passed");
      console.log("this.isPlacementCreateForm new is", this.isPlacementCreateForm);
    }
    /**Placement print items configuration */
    this.placementPrintItems = [
      /** Eg: {label: 'Update', icon: 'pi pi-refresh', command: () => { this.update(); }},**/
      { label: 'ACK - Acknowledgement', routerLink: ['/placement-acknowledgment'] },
      { label: 'PS -  Placement Status', routerLink: ['/placement-event-status'] },
      { label: 'PA -  Placement Agreement', routerLink: ['/placement-agreement'] },
      { label: 'PSA Form', routerLink: ['/placement-psa'] },

    ]
    this.getMoveEvents()
    console.log("placement.beginDate is", this.placement.beginDate)
  }


  setIndex(index: number) {
    this.sIndex = index;
  }

  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Notes', href: '#nav-sec1' },
      { label: 'Sibs In OOH', href: '#nav-sec2' },
      { label: 'School', href: '#nav-sec3' },
      { label: 'Notification Type', href: '#nav-sec4' },
      { label: 'Section 6', href: '#nav-sec5' },
      { label: 'Referral Dates', href: '#nav-sec6' },
      { label: 'Reminder', href: '#nav-sec7' },
      { label: 'Respite Authorization', href: '#nav-sec8' },
      { label: 'Sibs at Home ', href: '#nav-sec9' },
    ]
  }

  /*** API Request handler */
  formAction(source?: Placement) {
    console.log("Source", source, "placement obj", this.placementEdit, "Respite", this.respite);

    // currentProviderId

    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';

    let validationResult = (this.placementEdit.placementID ||
      (this.placement.initiatedByStaffID !== null && this.placement.initiatedByStaffID !== undefined) &&
      (this.placement.beginDate !== null && this.placement.beginDate !== undefined) &&
      (this.placement.providerID !== null && this.placement.providerID !== undefined) &&
      (this.placementDetail.procodeID !== null && this.placementDetail.procodeID !== undefined)
    )

    if (this._localValues.isPlacementNewValidationSet) {
      validationResult = (this.placementEdit.placementID ||
        (this.placement.beginDate !== null && this.placement.beginDate !== undefined) &&
        (this.placement.providerID !== null && this.placement.providerID !== undefined) &&
        (this.placementDetail.procodeID !== null && this.placementDetail.procodeID !== undefined)
      )
    }


    if (validationResult) {
      if (source.providerID) {
        this.currentProviderId = source.providerID.ProviderID
      }

      if (this.placementEdit.placementDetail && this.placementEdit.placementDetail.placementDetailID) {
        /**For referral dates */
        this.referralDates.referralID = this.selectedReferralId;
        this.referralDates.changedBy = 'Admin',
          this.referralDates.changedDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        // this.referralDates.referralDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.referralDate));
        // this.referralDates.paymentEndDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.paymentEndDate));
        // this.referralDates.retractedDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.retractedDate));
        // this.referralDates.withDrawDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.withDrawDate));
        // this.referralDates.closureDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.closureDate));
        // this.referralDates.dualAdjBeginDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.dualAdjBeginDate));
        // this.referralDates.dualAdjEndDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.dualAdjEndDate));
        // this.referralDates.dCFPlanEndDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.dCFPlanEndDate));
        // this.referralDates.dCFBeginDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.dCFBeginDate));
        // this.referralDates.recidivistDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.recidivistDate));
        // this.referralDates.recidivistDateOverride = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.recidivistDateOverride));
        // this.referralDates.releaseDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.releaseDate));
        /**For recidivistDateUpdate */
        let recidivistDateUpdateObj = { referralID: this.selectedReferralId }
        /**For disruption update */
        this.disruptionUpdate.disruptionID;
        this.disruptionUpdate.disruptionReasonID = !isNullOrUndefined(this.disruption.disruptionReasonID) ? this.disruption.disruptionReasonID : null;
        this.disruptionUpdate.disruptionTypeID = !isNullOrUndefined(this.disruption.disruptionTypeID) ? this.disruption.disruptionTypeID : null;
        this.disruptionUpdate.providerID = !isNullOrUndefined(this.disruption.providerID) ? this.disruption.providerID : null;
        this.disruptionUpdate.staffID = !isNullOrUndefined(this.disruption.staffID) ? this.disruption.staffID : null;
        this.disruptionUpdate.changedBy = 'Admin';
        this.disruptionUpdate.changedDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.disruptionUpdate.prev_PlacementID = 2;
        /**For placementMoveEventUpdate */
        this.placementMoveEvent.moveEventID = !isNullOrUndefined(this.placementMoveEvent.moveEventID) ? this.placementMoveEvent.moveEventID.ReasonForMoveID : null;
        this.placementMoveEvent.isDeletePlacement = false;
        this.placementMoveEvent.changedBy = 'Admin';
        this.placementMoveEvent.changedDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.placementMoveEvent.placementID = this.currentPlacementId;

        /**For IdentifiedResourceUpdate */
        this.identifiedResource.beginDate = !isNullOrUndefined(this.placementEdit.beginDate) ? this.placementEdit.beginDate : null;
        this.identifiedResource.endDate = !isNullOrUndefined(this.placementEdit.endDate) ? this.placementEdit.endDate : null;
        this.identifiedResource.procodeID = !isNullOrUndefined(this.auth.procodeID) ? this.auth.procodeID : null;
        this.identifiedResource.providerID = !isNullOrUndefined(this.placement.providerID) ? this.placement.providerID.ProviderID : null;
        this.identifiedResource.enteredBy = 'Admin',
          this.identifiedResource.enteredDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.identifiedResource.referralID = this.selectedReferralId;
        this.identifiedResource.placementID = this.currentPlacementId;
        /**For respiteAuthorization */
        // this.placementEdit.respiteAuthorization
        // this.respite.beginDate = this._localValues.stringFormatDatetime(this.placementEdit.respiteAuthorization.beginDate);
        // this.respite.endDate = this._localValues.stringFormatDatetime(Date.parse(this.respite.endDate));
        // this.respite.payorID = !isNullOrUndefined(this.respite.payorID) ? this.respite.payorID.payorID : null;
        // this.respite.reminderNote = !isNullOrUndefined(this.placement.reminderNote) ? this.placement.reminderNote : null;
        // this.respite.placementID = this.currentPlacementId;
        // this.respite.unitsPerMonth = !isNullOrUndefined(this.respite.unitsPerMonth) ? this.respite.unitsPerMonth : null;
        // this.respite.notes = !isNullOrUndefined(this.respite.notes) ? this.respite.notes : null;

        /**For AuthorizationException */
        this.authException.authorizationID;
        this.authException.approvedBy_StaffID = !isNullOrUndefined(this.authException.approvedBy_StaffID) ? this.authException.approvedBy_StaffID.staffID : null;
        this.authException.authorizationExceptionReasonID = !isNullOrUndefined(this.authException.authorizationExceptionReasonID) ? this.authException.authorizationExceptionReasonID.authorizationExceptionReasonID : null;
        this.authException.requestedBy = 'Admin'

        /** For disruption  */
        this.disruption.disruptionReasonID = !isNullOrUndefined(this.disruption.disruptionReasonID) ? this.disruption.disruptionReasonID.DisruptionReasonID : null;
        this.disruption.disruptionTypeID = !isNullOrUndefined(this.disruption.disruptionTypeID) ? this.disruption.disruptionTypeID.DisruptionTypeID : null;
        this.disruption.providerID = !isNullOrUndefined(this.disruption.providerID) ? this.disruption.providerID.providerID : null;
        this.disruption.staffID = !isNullOrUndefined(this.disruption.staffID) ? this.disruption.staffID.staffID : null;
        this.disruption.enteredBy = 'Admin';
        this.disruption.enteredDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        if (this.disruptionDetail) {
          this.disruption.prev_PlacementID = !isNullOrUndefined(this.disruptionDetail.prev_PlacementID) ? this.disruptionDetail.prev_PlacementID.placementID : null;
          this.disruption.otherOptOffered = this.disruptionDetail.otherOptOffered;
          this.disruption.disruptionID = this.disruptionDetail.disruptionID;
        }
        else {
          this.disruption['prev_PlacementID'] = null;
          this.disruption['otherOptOffered'] = null;
          this.disruption['disruptionID'] = null;
        }


        /**For placement behavior update */
        this.placementbehaviourUpdate.behavior = !isNullOrUndefined(this.placement.behaviors) ? this.placement.behaviors : '';
        this.placementbehaviourUpdate.changedBy = 'Admin',
          this.placementbehaviourUpdate.changedDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));

        this.respite.enteredBy = 'Admin';
        this.respite.enteredDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.respite;
        this.disruption.enteredBy = 'Admin';
        this.disruption.enteredDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.disruption.placementID = this.currentPlacementId;
        /** For placement */
        source.beginDate = this.placementEdit.beginDate;
        source.endDate = this.placementEdit.endDate;
        !isNullOrUndefined(source.placementReferralID) ? source.placementReferralID = source.placementReferralID.PlacementReferralID : null;
        source.enteredBy = 'Admin';
        source.enteredDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        source.clientID = this.selectedClientId;
        source.referralID = this.selectedReferralId;
        source.initiatedByStaffID = !isNullOrUndefined(source.initiatedByStaffID) ? source.initiatedByStaffID.staffID : null;
        source.reasonForMoveID = !isNullOrUndefined(source.reasonForMoveID) ? source.reasonForMoveID.ReasonForMoveID : null;
        source.providerID = !isNullOrUndefined(source.providerID) ? source.providerID.providerID : null;
        source.placementReferralID = 2;
        /** For authorization */
        this.auth.clientID = this.selectedClientId;
        this.auth.providerID = !isNullOrUndefined(this.placement.providerID) ? this.placement.providerID.providerID : null;
        this.auth.referralID = this.selectedReferralId;
        this.auth.beginDate = !isNullOrUndefined(this.placement.beginDate) ? this.placement.beginDate : null;
        this.auth.endDate = !isNullOrUndefined(this.placement.endDate) ? this.placement.endDate : null;
        this.auth.livingArrangementID = null;
        this.auth.providerLocationID = null;
        this.auth.payorID = !isNullOrUndefined(this.auth.payorID) ? this.auth.payorID.payorID : null;
        this.auth.sponsorID = null;
        this.auth.procodeID = !isNullOrUndefined(this.placementDetail.procodeID) ? this.placementDetail.procodeID.procodeID : null;
        this.auth.authorizationStatusID = !isNullOrUndefined(this.auth.authorizationStatusID) ? this.auth.authorizationStatusID.authorizationStatusID : null;
        this.auth.unitTypeID = null;
        this.auth.unitsAuth = null;
        this.auth.unitsRemaining = null;
        this.auth.unitsPaidByPlacement = null;
        this.auth.doNotPay = null;
        this.auth.paySponsor = null;
        this.auth.exception = null;
        this.auth.payorAuthorizationID = !isNullOrUndefined(this.auth.payorAuthorizationID) ? this.auth.payorAuthorizationID.payorID : null;
        this.auth.notes = null;
        this.auth.holdBedPayorID = null;
        this.auth.holdBedUnits = null;
        this.auth.enteredBy = 'Admin'
        this.auth.enteredDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.auth.providerID = !isNullOrUndefined(source.providerID) ? source.providerID : null;


      }
      else {
        this.respite.enteredBy = 'Admin';
        this.respite.enteredDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.respite;
        this.disruption.enteredBy = 'Admin';
        this.disruption.enteredDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.disruption.placementID = this.currentPlacementId;
        /** For placement */
        source.beginDate = this._localValues.stringFormatDatetime(Date.parse(source.beginDate));
        source.endDate = this._localValues.stringFormatDatetime(Date.parse(source.endDate));
        !isNullOrUndefined(source.placementReferralID) ? source.placementReferralID = source.placementReferralID.PlacementReferralID : null;
        source.enteredBy = 'Admin';
        source.enteredDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        source.clientID = this.selectedClientId;
        source.referralID = this.selectedReferralId;
        source.initiatedByStaffID = !isNullOrUndefined(source.initiatedByStaffID) ? source.initiatedByStaffID.staffID : null;
        source.reasonForMoveID = !isNullOrUndefined(source.reasonForMoveID) ? source.reasonForMoveID.ReasonForMoveID : null;
        source.providerID = !isNullOrUndefined(source.providerID) ? source.providerID.providerID : null;
        source.placementReferralID = 2;
        /** For authorization */
        this.auth.clientID = this.selectedClientId;
        this.auth.providerID = !isNullOrUndefined(this.placement.providerID) ? this.placement.providerID.providerID : null;
        this.auth.referralID = this.selectedReferralId;
        this.auth.beginDate = !isNullOrUndefined(this.placement.beginDate) ? this.placement.beginDate : null;
        this.auth.endDate = !isNullOrUndefined(this.placement.endDate) ? this.placement.endDate : null;
        this.auth.livingArrangementID = null;
        this.auth.providerLocationID = null;
        this.auth.payorID = !isNullOrUndefined(this.auth.payorID) ? this.auth.payorID.payorID : null;
        this.auth.sponsorID = null;
        this.auth.procodeID = !isNullOrUndefined(this.placementDetail.procodeID) ? this.placementDetail.procodeID.procodeID : null;
        this.auth.authorizationStatusID = !isNullOrUndefined(this.auth.authorizationStatusID) ? this.auth.authorizationStatusID.authorizationStatusID : null;
        this.auth.unitTypeID = null;
        this.auth.unitsAuth = null;
        this.auth.unitsRemaining = null;
        // this.auth.unitsPaidByPlacement = null;
        this.auth.doNotPay = null;
        // this.auth.paySponsor = null;
        this.auth.exception = null;
        this.auth.payorAuthorizationID = !isNullOrUndefined(this.auth.payorAuthorizationID) ? this.auth.payorAuthorizationID.payorID : null;
        this.auth.notes = null;
        this.auth.holdBedPayorID = null;
        this.auth.holdBedUnits = null;
        this.auth.enteredBy = 'Admin'
        this.auth.enteredDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.auth.providerID = !isNullOrUndefined(source.providerID) ? source.providerID : null;
        /** For notes */
        this.placementDetail.reasonForMoveID = this.placement.reasonForMoveID;
        /** For sibs in ooh */
        this.placementDetail.siblingReasonID = !isNullOrUndefined(this.placementDetail.siblingReasonID) ? this.placementDetail.siblingReasonID.SiblingReasonID : null;
        /** For disruption  */
        this.disruption.disruptionReasonID = !isNullOrUndefined(this.disruption.disruptionReasonID) ? this.disruption.disruptionReasonID.DisruptionReasonID : null;
        this.disruption.disruptionTypeID = !isNullOrUndefined(this.disruption.disruptionTypeID) ? this.disruption.disruptionTypeID.DisruptionTypeID : null;
        this.disruption.providerID = !isNullOrUndefined(this.disruption.providerID) ? this.disruption.providerID.providerID : null;
        this.disruption.staffID = !isNullOrUndefined(this.disruption.staffID) ? this.disruption.staffID.staffID : null;
        this.disruption.enteredBy = 'Admin';
        this.disruption.enteredDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.disruption.prev_PlacementID = 2;
        if (this._localValues.currentPlacementDisruptionID) {
          this.disruption.disruptionID = this._localValues.currentPlacementDisruptionID;
        }
        else {
          this.disruption.disruptionID = null;
        }
        /**For placement behavior update */
        this.placementbehaviourUpdate.behavior = !isNullOrUndefined(this.placement.behaviors) ? this.placement.behaviors : null;
        this.placementbehaviourUpdate.changedBy = 'Admin',
          this.placementbehaviourUpdate.changedDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        /**For school */
        /**For section 6 */
        this.placementDetail.dcfreleasedOfCustodyID = !isNullOrUndefined(this.placementDetail.dcfreleasedOfCustodyID) ? this.placementDetail.dcfreleasedOfCustodyID.DCFReleasedOfCustodyID : null;
        this.placementDetail.dcfreleasedOfCustodyDate = this._localValues.stringFormatDatetime(Date.parse(this.placementDetail.dcfreleasedOfCustodyDate));
        this.placementDetail.retHomeWOCustodyDate = this._localValues.stringFormatDatetime(Date.parse(this.placementDetail.retHomeWOCustodyDate));
        this.placementDetail.changeOfVenueDate = this._localValues.stringFormatDatetime(Date.parse(this.placementDetail.changeOfVenueDate));
        this.placementDetail.dcfreleasedOfCustodyOverrideID = !isNullOrUndefined(this.placementDetail.dcfreleasedOfCustodyOverrideID) ? this.placementDetail.dcfreleasedOfCustodyOverrideID.DCFReleasedOfCustodyOverrideID : null;
        this.placementDetail.dcfreleasedOfCustodyOverrideDate = this.placementDetail.dcfreleasedOfCustodyOverrideDate;
        this.placementDetail.dcfplanEndDateOverride = this._localValues.stringFormatDatetime(Date.parse(this.placementDetail.dcfplanEndDateOverride));
        this.placementDetail.dcfplanEndDate = this._localValues.stringFormatDatetime(Date.parse(this.placementDetail.dcfplanEndDate));
        this.placementDetail.dcfplanEndDateOverrideID = !isNullOrUndefined(this.placementDetail.dcfplanEndDateOverrideID) ? this.placementDetail.dcfplanEndDateOverrideID.PlanEndDateOverrideID : null;
        /**For referral dates */
        this.referralDates.referralID = this.selectedReferralId;
        this.referralDates.changedBy = 'Admin',
          this.referralDates.changedDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.referralDates.referralDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.referralDate));
        this.referralDates.paymentEndDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.paymentEndDate));
        this.referralDates.retractedDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.retractedDate));
        this.referralDates.withDrawDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.withDrawDate));
        this.referralDates.closureDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.closureDate));
        this.referralDates.dualAdjBeginDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.dualAdjBeginDate));
        this.referralDates.dualAdjEndDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.dualAdjEndDate));
        this.referralDates.dCFPlanEndDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.dCFPlanEndDate));
        this.referralDates.dCFBeginDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.dCFBeginDate));
        this.referralDates.recidivistDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.recidivistDate));
        this.referralDates.recidivistDateOverride = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.recidivistDateOverride));
        this.referralDates.releaseDate = this._localValues.stringFormatDatetime(Date.parse(this.referralDates.releaseDate));
        /**For recidivistDateUpdate */
        let recidivistDateUpdateObj = { referralID: this.selectedReferralId }
        /**For disruption update */
        this.disruptionUpdate.disruptionID;
        this.disruptionUpdate.disruptionReasonID = !isNullOrUndefined(this.disruption.disruptionReasonID) ? this.disruption.disruptionReasonID : null;
        this.disruptionUpdate.disruptionTypeID = !isNullOrUndefined(this.disruption.disruptionTypeID) ? this.disruption.disruptionTypeID : null;
        this.disruptionUpdate.providerID = !isNullOrUndefined(this.disruption.providerID) ? this.disruption.providerID : null;
        this.disruptionUpdate.staffID = !isNullOrUndefined(this.disruption.staffID) ? this.disruption.staffID : null;
        this.disruptionUpdate.changedBy = 'Admin';
        this.disruptionUpdate.changedDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.disruptionUpdate.prev_PlacementID = 2;

        /**For placementMoveEventUpdate */
        this.placementMoveEvent.moveEventID = !isNullOrUndefined(this.placementMoveEvent.moveEventID) ? this.placementMoveEvent.moveEventID.ReasonForMoveID : null;
        this.placementMoveEvent.isDeletePlacement = false;
        this.placementMoveEvent.changedBy = 'Admin';
        this.placementMoveEvent.changedDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.placementMoveEvent.placementID = this.currentPlacementId;

        /**For IdentifiedResourceUpdate */
        this.identifiedResource.beginDate = !isNullOrUndefined(this.placement.beginDate) ? this.placement.beginDate : null;
        this.identifiedResource.endDate = !isNullOrUndefined(this.placement.endDate) ? this.placement.endDate : null;
        this.identifiedResource.procodeID = !isNullOrUndefined(this.auth.procodeID) ? this.auth.procodeID : null;
        this.identifiedResource.providerID = !isNullOrUndefined(this.placement.providerID) ? this.placement.providerID : null;
        this.identifiedResource.enteredBy = 'Admin',
          this.identifiedResource.enteredDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.identifiedResource.referralID = this.selectedReferralId;
        this.identifiedResource.placementID = this.currentPlacementId;
        /**For respiteAuthorization */
        this.respite.beginDate = this._localValues.stringFormatDatetime(Date.parse(this.respite.beginDate));
        this.respite.endDate = this._localValues.stringFormatDatetime(Date.parse(this.respite.endDate));
        this.respite.payorID = !isNullOrUndefined(this.respite.payorID) ? this.respite.payorID.payorID : null;
        this.respite.reminderNote = !isNullOrUndefined(this.placement.reminderNote) ? this.placement.reminderNote : null;
        this.respite.placementID = this.currentPlacementId;
        this.respite.unitsPerMonth = !isNullOrUndefined(this.respite.unitsPerMonth) ? this.respite.unitsPerMonth : null;
        this.respite.notes = !isNullOrUndefined(this.respite.notes) ? this.respite.notes : null;

        /**For AuthorizationException */
        this.authException.authorizationID;
        this.authException.approvedBy_StaffID = !isNullOrUndefined(this.authException.approvedBy_StaffID) ? this.authException.approvedBy_StaffID.staffID : null;
        this.authException.authorizationExceptionReasonID = !isNullOrUndefined(this.authException.authorizationExceptionReasonID) ? this.authException.authorizationExceptionReasonID.authorizationExceptionReasonID : null;
        this.authException.requestedBy = 'Admin'
        /**For placement detail */
        this.placementDetail.beginDate = !isNullOrUndefined(this.placement.beginDate) ? this.placement.beginDate : null;
        this.placementDetail.changedBy = 'Admin';
        this.placementDetail.changedDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.placementDetail.clientID = this.selectedClientId;
        this.placementDetail.createdDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.placementDetail.endDate = !isNullOrUndefined(this.placement.endDate) ? this.placement.endDate : null;
        this.placementDetail.enteredBy = 'Admin';
        this.placementDetail.enteredDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.placementDetail.lastModifiedDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.placementDetail.paymentEndDate = !isNullOrUndefined(this.referralDates.paymentEndDate) ? this.referralDates.paymentEndDate : null;
        this.placementDetail.payorID = !isNullOrUndefined(this.auth.payorID) ? this.auth.payorID.payorID : null;
        this.placementDetail.procodeID = !isNullOrUndefined(this.auth.procodeID) ? this.auth.procodeID : null;
        this.placementDetail.providerID = !isNullOrUndefined(this.placement.providerID) ? this.placement.providerID : null;
        this.placementDetail.referralID = this.selectedReferralId;

        this.placementDetail.updatedDate = this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.placementDetail.placementID = this.currentPlacementId;
        this.placementDetail.formReceivedDate = this._localValues.stringFormatDatetime(this.placementDetail.formReceivedDate);
        this.placementDetail.dcfreleasedOfCustodyOverrideDate = this._localValues.stringFormatDatetime(this.placementDetail.dcfreleasedOfCustodyOverrideDate);

      }

      if (this.placementEdit.placementDetail && this.placementEdit.placementDetail.placementDetailID) {
        this.disruption['changedBy'] = this.disruption.enteredBy;
        this.disruption['changedDate'] = this.disruption.enteredDate;
        delete this.disruption.enteredBy;
        delete this.disruption.placementID;
        delete this.disruption.enteredDate;
        this.auth['authorizationID'] = 1;
        this.auth['payorRate'] = 1;
        this.auth['providerRate'] = 1;
        this.placementDetail['addInfo'] = this.placementEdit.placementDetail.addInfo;
        this.placementDetail['clarification'] = this.placementEdit.placementDetail.clarification
        this.placementDetail['placementDetailID'] = this.placementEdit.placementDetail.placementDetailID
        this.placementDetail['SFANotes'] = this.placementEdit.placementDetail.SFANotes;

        this.respite['changedBy'] = this.respite.enteredBy;
        this.respite['changedDate'] = this.respite.enteredDate;
        delete this.respite.enteredBy;
        delete this.respite.enteredDate;
        (!this.respite.unitsPerMonth) ? this.respite.unitsPerMonth = 0 : null;
        source.placementID = this.currentPlacementId;

        this.placementEdit.reasonForMoveID.reasonForMove = this.placementEdit.reasonForMoveID['ReasonForMove']
        this.placementEdit.placementDetail.sfanotes = this.placementEdit.placementDetail['SFANotes']
        this.placementEdit.placementDetail.sibsAffectedByMove = this.placementEdit.placementDetail['sibsAffectedbyMove']
        this.placementEdit.placementDetail.dcfplanEndDate = this._localValues.stringFormatDatetime(Date.parse(this.placementEdit.placementDetail.dcfplanEndDate))
        this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideDate = this._localValues.stringFormatDatetime(Date.parse(this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideDate))
        this.placementEdit.placementDetail.dcfreleasedOfCustodyDate = this._localValues.stringFormatDatetime(this.placementEdit.placementDetail.dcfreleasedOfCustodyDate);
        this.placementEdit.placementDetail.dcfplanEndDateOverride = this._localValues.stringFormatDatetime(Date.parse(this.placementEdit.placementDetail.dcfplanEndDateOverride))
        this.placementEdit.placementDetail.retHomeWCustodyDate = this._localValues.stringFormatDatetime(Date.parse(this.placementEdit.placementDetail.retHomeWCustodyDate))
        this.placementEdit.placementDetail.changeOfVenueDate = this._localValues.stringFormatDatetime(this.placementEdit.placementDetail.changeOfVenueDate);
        this.placementEdit.placementDetail.retHomeWOCustodyDate = this._localValues.stringFormatDatetime(this.placementEdit.placementDetail.retHomeWOCustodyDate);
        this.placementEdit.placementDetail.formReceivedDate = this._localValues.stringFormatDatetime(this.placementEdit.placementDetail.formReceivedDate);
        let req = {
          placementUpdate: source,
          respiteAuthorization: this.placementEdit.respiteAuthorization,
          placementDetailInfo: this.placementEdit.placementDetail,
          authorization: this.auth,
          disruption: this.disruption,
          identifiedResourceUpdate: this.identifiedResource,
          authorizationException: this.authException,
          referralUpdate: this.referralDates,
          school: null
        }
        /**Mandatory check */
        console.log("Request in update Placement Event is=====>", req);
        req;

        this._placement.updatePlacementEvent(req).then((data: any) => {
          if (data.responseStatus) {
            // loader.style.display = 'none';
            if (!this.isPopup) {
              return this._message.add({ severity: 'success', summary: 'Updated!', detail: 'The record has been updated!' });
            } else {
              swal('Save', 'Placement Event has been updated', 'success')
              this._router.navigate(['/reintegration/referral/opencard/placement/placementEvent/view'], { queryParamsHandling: 'preserve' })
            }
          }
          if (!data.responseStatus) {
            // loader.style.display = 'none';
            return this._message.add({ severity: 'Info', summary: 'Not able to update!', detail: 'Please contact your administrator!' });
          }
        })
      }
      else {
        source.placementID = this.currentPlacementId;

        this.placementDetail.providerID = this.currentProviderId;
        this.auth.providerID = this.currentProviderId;
        this.disruption.providerID = this.currentProviderId;
        this.identifiedResource.providerID = this.currentProviderId;
        let req = {
          placementUpdate: source,
          respiteAuthorization: this.respite,
          placementDetailInfo: this.placementDetail,
          authorization: this.auth,
          disruption: this.disruption,
          placementMoveEventUpdate: this.placementMoveEvent,
          identifiedResourceUpdate: this.identifiedResource,
          authorizationException: this.authException,
          referralUpdate: this.referralDates,
        }
        /**Mandatory check */
        console.log("Request in Placement Event is=====>", req);
        req;
        if (!req.placementDetailInfo.providerID) {
          req.placementDetailInfo['providerID'] = this._localValues.currentPlacementProviderInfo.providerID;
        }
        this._placement.savePlacementEvent(req).then((data: any) => {
          if (data.responseStatus) {
            swal('Save', 'Placement Event has been created', 'success')

            let savedPlacementId = this.currentPlacementId;
            let savedPlacementDetailId = data.placementDetailID;
            this._placement.storeSavedPlacementID(savedPlacementId)
            this._placement.storeSavedPlacementDetailID(savedPlacementDetailId)

            this._placementPrint.storeHistoryData();

            this.getPlacementAuthorizationId(data.placementDetailID);

          }

          // loader.style.display = 'none';
        })
      }

    } else {
      // loader.style.display = 'none';
      if (!this.isPopup) {
        return this._message.add({ severity: 'Info', summary: 'Please fill the mandatory fields!' });
      } else {
        return swal('Info', 'Please fill the mandatory fields', 'info');
      }
    }

  }

  navigateTo() {

    let currentURL = this._router.url.includes('?') ? this._router.url.split('?')[0] : this._router.url;
    if (currentURL == '/provider/opencard/placement-history/detail') {
      this.url = '/reports/attachment-document/rfc/placement-event';
    }

    return this._router.navigate([this.url])
  }

  formValidation() {
    this.placementForm = this._fb.group({
      beginDate: [null]
    })
    // this.placement.beginDate = Date.now;
    // this.placement.beginDate = new Date(this._localValues.stringFormatDatetime(Date.now()));
    // this.placement.beginDate.setHours(0);
    // this.placement.beginDate.setMinutes(0);
    // this.placement.beginDate.setSeconds(0);
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'procode':
        obj = 'procode'
        break;
      case 'provider':
        obj = 'provider';
        break;
      case 'status':
        obj = 'authorizationStatus';
        break;
      case 'payor':
        obj = 'payor';
        break;
      case 'staff':
        obj = 'staff';
        break;
      case 'school':
        obj = 'schoolName';
        break;
      case 'change_reason':
        obj = 'changeReason';
        break;
      case 'expectionReason':
        obj = 'authorizationExceptionReason';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      data.dropDown.map((item: any) => {
        item['procodeWithDesc'] = `${item.procode} - ${item.categoryOfService}`;
        item['fullName'] = `${item.lastName}, ${item.firstName}`;
      })
      this.metaData = data.dropDown;
    })
  }


  async generateUnitRate(event: any) {
    let request = {
      procodeID: event.procodeID,
      isPlacement: true,
      referralTypeID: parseInt(localStorage.getItem('referralTypeId')) - this._openCard.getHasKey(),
      beginDate: this.placement.beginDate,
      endDate: null
    }
    return this.auth.unitsPaidByPlacement = await this._openCard.getDefaultUnitsByProcode(request);
  };

  school_list = [];

  /** School line item functionality */
  addSchoolData() {
    if (this.school_IndexStatus) {
      this.school_list[this.school_IndexId] = this.school_data;
      this.school_data = {
        from_school: "",
        to_school: "",
        placement: "",
        date: "",
      };
      this.school_IndexStatus = false;
      swal("Success", "", "success");
    } else {
      this.school_list.push(this.school_data);
      swal("Success", "", "success");
      this.school_data = {
        from_school: "",
        to_school: "",
        placement: "",
        date: "",
      };
    }
  };

  viewSchoolData(aloneData, id) {
    console.log("aloneData" + id + "Index>>>", aloneData);
    this.school_data = aloneData;
    this.school_IndexId = id;
    this.school_IndexStatus = true;
  };
  deleteSchoolDet(id) {
    this.school_list.splice(id, 1)
  };

  /** Start : Siblings line item functionality */
  sibis_list = [];
  addSibisData() {
    if (this.sibs_IndexStatus) {
      this.sibis_list[this.sibs_IndexId] = this.sibs_data;
      this.sibs_data = {
        name: "",
        dob: "",
        client_id: "",
        eff_date: "",
        adds: "",
        remove: ""
      };
      this.sibs_IndexStatus = false;
      swal("Success", "", "success");
    } else {
      this.sibis_list.push(this.sibs_data);
      swal("Success", "", "success");
      this.sibs_data = {
        name: "",
        dob: "",
        client_id: "",
        eff_date: "",
        adds: "",
        remove: ""
      };
    }
  };

  viewSibisData(aloneData, id) {
    console.log("aloneData" + id + "Index>>>", aloneData);
    this.sibs_data = aloneData;
    this.sibs_IndexId = id;
    this.sibs_IndexStatus = true;
  };
  deleteSibsDet(id) {
    this.sibis_list.splice(id, 1)
  };
  dcfCustody() {
    this.dcfDisable = !this.dcfDisable;
  };
  jjaStatus() {
    this.jjaDisable = !this.jjaDisable;
  }
  valueChangeStatus() {
    this.valueDisable = !this.valueDisable;
  }
  /** End: Siblings line item functionality */

  /** Dropdown values form the masters*/
  getMasterDetails() {
    let req: any, referralID = this.selectedReferralId, beginDate = this.placement.beginDate;
    req = { referralID }
    beginDate = { beginDate }

    this._placement.getPlacementReferral(req).then((data: any) => {
      this.placementReferrals = data.placementReferral;
    });

    this._placement.getReasonForNotPlacedTogether().then((data: any) => {
      this.reasonForNotPlacedTogether = data.reasonNotPlacedTogether;
    });

    this._placement.getdisruptionTypes().then((data: any) => {
      this.disruptionTypes = data.disruptionType;
    });

    this._placement.getdisruptionReason().then((data: any) => {
      this.disruptionReason = data.disruptionReason;
    });

    this._placement.getReleasedOfCustodyOverride().then((data: any) => {
      this.overrideROC = data.releasedOfCustodyOverride;
    });

    this._placement.getPlanEndDateOverride().then((data: any) => {
      this.overridePED = data.planEndDateOverride;
    });

    this._placement.getReleasedOfCustody().then((data: any) => {
      this.releaseOfcustody = data.releasedOfCustody;
    });

    this._placement.getClientSchoolplacement(req).then((data: any) => {
      this.clientSchoolPlacements = data.clientSchoolPlacement;
      this.clientSchoolPlacementsDropdown = data.clientSchoolPlacement;
      this.clientSchoolPlacementsInfo = data.clientSchoolPlacement;
      this.clientSchoolPlacementsData = data.clientSchoolPlacement;
      if (this._router.url.includes('/reintegration/referral/opencard/placement/placementEvent/new')) {
        if (this._localValues.currentPlacementProviderInfo) {
          this.placement.providerID = {
            providerID: this._localValues.currentPlacementProviderInfo.providerID,
            ProviderName: this._localValues.currentPlacementProviderInfo.providerName,
          }

        }
      }
    })
  }

  /**
      * @param source - begin date
      */
  beginDateBasedMasters(source: any) {
    let req = { beginDate: this._localValues.stringFormatDatetime(Date.parse(source)) };
    this._placement.getReasonForMove(req).then((data: any) => {
      this.reasonForMoves = data.reasonForMove;
    })
    this._placement.getReasonForChange(req).then((data: any) => {
      this.reasonForChanges = data.reasonForChange;
    })
  }

  /** Start: Dropdowns complete method */

  filteredReferrals(event: any) {
    this.filteredPlacementReferrals = [];
    this.placementReferrals.filter((item: any) => {
      if (item.StatusType.toLowerCase().indexOf(event.query.toLowerCase()) !== -1) {
        item['prBeginDate'] = `${new Date(item.PRBeginDate).toLocaleString()}`
        this.filteredPlacementReferrals.push(item);
      }
    })
  }

  filteredMoves(event: any) {
    this.filteredReasonForMoves = [];
    this.reasonForMoves.filter((item: any) => {
      if (item.ReasonForMove.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredReasonForMoves.push(item);
      }
    })
  }

  filteredChanges(event: any) {
    this.filteredReasonForChanges = [];
    this.reasonForChanges.filter((item: any) => {
      if (item.ReasonForMove.indexOf(event.query) !== -1) {
        this.filteredReasonForChanges.push(item);
      }
    })
  }

  filteredNotPlacedTogether(event: any) {
    this.filteredReasonForNotPlacedTogether = [];
    this.reasonForNotPlacedTogether.filter((item: any) => {
      if (item.SiblingReason.indexOf(event.query) !== -1) {
        this.filteredReasonForNotPlacedTogether.push(item);
      }
    })
  }

  filterddisruptionTypes(event: any) {
    this.filtereddisruptionTypes = [];
    this.disruptionTypes.filter((item: any) => {
      if (item.DisruptionType.indexOf(event.query) !== -1) {
        this.filtereddisruptionTypes.push(item);
      }
    })
  }

  filterddisruptionReasons(event: any) {
    this.filtereddisruptionReasons = [];
    this.disruptionReason.filter((item: any) => {
      if (item.DisruptionReason.indexOf(event.query) !== -1) {
        this.filtereddisruptionReasons.push(item);
      }
    })
  }

  filterdOverrideROC(event: any) {
    this.filteredOverrideROC = [];
    this.overrideROC.filter((item: any) => {
      if (item.DCFReleasedOfCustodyOverride.indexOf(event.query) !== -1) {
        this.filteredOverrideROC.push(item);
      }
    })
  }

  filterdOverridePED(event: any) {
    this.filteredOverridePED = [];
    this.overridePED.filter((item: any) => {
      if (item.PlanEndDateOverride.indexOf(event.query) !== -1) {
        this.filteredOverridePED.push(item);
      }
    })
  }

  filterdReleaseOfCustody(event: any) {
    this.filteredReleaseOfCustody = [];
    this.releaseOfcustody.filter((item: any) => {
      if (item.DCFReleasedOfCustody.indexOf(event.query) !== -1) {
        this.filteredReleaseOfCustody.push(item);
      }
    })
  }
  /** End: Dropdowns complete method */

  attendingSchoolFormValidation() {
    this.attendingSchoolForm = this._fb.group({
      clientSchoolID: [null],
      beginDate: [null],
      endDate: [null],
      schoolID: [null],
      enrolledBeginDate: [null],
      enrolledEndDate: [null],
      changeReasonID: [null],
      notes: [null],
      referralID: [null]
    })
  }
  /*** Start: Get Attending and home school record list */
  addAttendingSchoolRecord() {
    this.attendingSchoolComp.schoolFormAction(this.attendingSchool);
    this.isAttendingSchool = false;
    this.isAttendingSchoolList = false;
    this.getAttendingSchoolList();
  }

  addHomeSchoolRecord() {
    this.homeSchoolComp.formAction(this.homeSchool)
    this.isHomeSchool = false;
    this.isHomeSchoolList = false;
    this.getHomeSchoolList();
  }

  getHomeSchoolList() {
    this.homeSchoolListHeaders = [];
    this.homeSchoolList = [];
    let req = {
      referralID: this.selectedReferralId,
      endPagination: 100,
      beginPagination: 1,
      sort: { column: 'homeSchoolID', mode: "desc" }
    }
    this._openCard.listAllHomeschool(req).then((data: any) => {
      data.dataTypes.filter((item: any) => {
        this.homeSchoolListHeaders.push(item.COLUMN_NAME)
      })
      this.homeSchoolList = data.homeSchool;
    })
  }

  getAttendingSchoolList() {
    this.attendingSchoolList = [];
    this.attendinSchoolListHeaders = [];
    let req = {
      referralID: this.selectedReferralId,
      endPagination: 100,
      beginPagination: 1,
      sort: { column: 'clientSchoolID', mode: "desc" }
    }
    this._openCard.listAllAttendingSchool(req).then((data: any) => {
      data.dataTypes.filter((item: any) => {
        this.attendinSchoolListHeaders.push(item.COLUMN_NAME)
      })
      this.attendingSchoolList = data.clientSchool;
    })
  }

  /*** End: Get Attending and home school record list */

  homeSchoolValidation() {
    this.homeSchoolForm = this._fb.group({
      beginDate: [null],
      endDate: [null],
      schoolID: [null],
      changeReasonID: [null]
    })
  }

  getUTCDateStringFormate(timeStamp: any) {
    return this._localValues.getUTCDateStringFormate(timeStamp);
  }

  homeSchoolEditMode(selectedData: any) {
    this.isHomeSchool = true;
    let req = { homeSchoolID: selectedData.homeSchoolID }
    this._openCard.getByIdHomeschool(req).then((data: any) => {
      !isNullOrUndefined(data.homeSchool.beginDate) ? data.homeSchool.beginDate = this._localValues.getUTCDateStringFormate(data.homeSchool.beginDate) : null;
      !isNullOrUndefined(data.homeSchool.endDate) ? data.homeSchool.endDate = this._localValues.getUTCDateStringFormate(data.homeSchool.endDate) : null;
      this.homeSchoolBtnLabel = 'Update';
      this.homeSchool = data.homeSchool;
    })
  }

  restWizards(wizard: string) {
    switch (wizard) {
      case 'attendingSchool':
        this.attendingSchool = new AttendingSchool();
        break;
      case 'homeSchool':
        this.homeSchool = new HomeSchool();
        break;
    }
  }

  schoolListViewWizardActions(wizard: string) {
    switch (wizard) {
      case 'homeSchool':
        this.isHomeSchool = true;
        this.homeSchool = new HomeSchool();
        this.homeSchoolBtnLabel = 'Save';
        break;
      case 'attendingSchool':
        this.isAttendingSchool = true;
        this.attendingSchool = new AttendingSchool();
        this.attendingSchoolBtnLabel = 'Save';
        break;
    }
  }

  attendingSchoolEditMode(selectedData: any) {
    this.isAttendingSchool = true;
    let req = { clientSchoolID: selectedData.clientSchoolID }
    this._openCard.getByRecAttendingSchool(req).then((data: any) => {
      !isNullOrUndefined(data.clientSchool.beginDate) ? data.clientSchool.beginDate = this._localValues.getUTCDateStringFormate(data.clientSchool.beginDate) : null;
      !isNullOrUndefined(data.clientSchool.endDate) ? data.clientSchool.endDate = this._localValues.getUTCDateStringFormate(data.clientSchool.endDate) : null;
      !isNullOrUndefined(data.clientSchool.enrolledBeginDate) ? data.clientSchool.enrolledBeginDate = this._localValues.getUTCDateStringFormate(data.clientSchool.enrolledBeginDate) : null;
      !isNullOrUndefined(data.clientSchool.enrolledEndDate) ? data.clientSchool.enrolledEndDate = this._localValues.getUTCDateStringFormate(data.clientSchool.enrolledEndDate) : null;
      this.attendingSchoolBtnLabel = 'Update';
      this.attendingSchool = data.clientSchool;
    })
  }
  currentClientId = null;
  getPlacementRecordById() {
    let currentPlacmentID = this.currentPlacementId,
      currentReferralID = this.selectedReferralId,
      placementReferralReq = { referralID: currentReferralID },
      placementAuthReq = { placementDetailID: this.currentPlacementDetailId },
      placementDetailReq = { placementDetailID: this.currentPlacementDetailId },
      currentPlacementAuthID: number,
      loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    
    this.placementReq = { placementID: currentPlacmentID }
    this.placementEventReq = placementDetailReq;
    /** Get record from '/placement/getPlacement' API */
    this._placement.getPlacement(this.placementReq).then((data: any) => {
      // CURRENT CLIENT ID
      if (data.placement && data.placement.clientID) {
        this.currentClientId = data.placement.clientID.clientID;
      }

      /** Date conversion for cms and ekidz data */
      this.placementEdit.providerID = data.placement.providerID;
      this.placementEdit.initiatedByStaffID = data.placement.initiatedByStaffID;
      this.placementEdit = data.placement;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.placement.changedBy) ? data.placement.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.placement.changedDate) ? moment(data.placement.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.placement.enteredBy) ? data.placement.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.placement.enteredDate) ? moment(data.placement.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      this.placementEdit.beginDate = !isNullOrUndefined(this.placementEdit.beginDate) ? new Date(this.placementEdit.beginDate) : null;
      this.placementEdit.endDate = !isNullOrUndefined(this.placementEdit.endDate) ? new Date(this.placementEdit.endDate) : null;
      this.isPlacementEditFetched = true; 
      this.disruptionDetail = (data.disruptionDetails) ? data.disruptionDetails : null
      if (!this.disruptionDetail) {
        this.disruptionDetail = { otherOptOffered: '' }
      }

      this.setDisruptionInfo();
      this.beginDateBasedMasters(this.placementEdit.beginDate)
      this.behaviors = data.placement.behaviors;
      
    })

      /** Get record from  '/placement/getPlacementReferral' API */
      .then(() => {
        this._placement.getPlacementReferral(placementReferralReq).then((data: any) => {
          this.placementEdit.placementReferral = data.placementReferral[0];
        })

      })

      /** Get record form '/placement/getReferralDates' API */
      .then(() => {
        this._placement.getReferralDates(placementReferralReq).then((data: any) => {
          /** Need to valid isActive key */
          if (data.referralDates[0].IsActive) {
            !isNullOrUndefined(data.referralDates[0].referralDate) ? data.referralDates[0].referralDate = new Date(data.referralDates[0].referralDate) : null;
            !isNullOrUndefined(data.referralDates[0].paymentEndDate) ? data.referralDates[0].paymentEndDate = new Date(data.referralDates[0].paymentEndDate) : null;
            !isNullOrUndefined(data.referralDates[0].retractedDate) ? data.referralDates[0].retractedDate = new Date(data.referralDates[0].retractedDate) : null;
            !isNullOrUndefined(data.referralDates[0].withDrawDate) ? data.referralDates[0].withDrawDate = new Date(data.referralDates[0].withDrawDate) : null;
            !isNullOrUndefined(data.referralDates[0].releaseDate) ? data.referralDates[0].releaseDate = new Date(data.referralDates[0].releaseDate) : null;
            !isNullOrUndefined(data.referralDates[0].closureDate) ? data.referralDates[0].closureDate = new Date(data.referralDates[0].closureDate) : null;
            !isNullOrUndefined(data.referralDates[0].dualAdj_BeginDate) ? data.referralDates[0].dualAdj_BeginDate = new Date(data.referralDates[0].dualAdj_BeginDate) : null;
            !isNullOrUndefined(data.referralDates[0].dualAdj_EndDate) ? data.referralDates[0].dualAdj_EndDate = new Date(data.referralDates[0].dualAdj_EndDate) : null;
            !isNullOrUndefined(data.referralDates[0].dCFPlanEndDate) ? data.referralDates[0].dCFPlanEndDate = new Date(data.referralDates[0].dCFBeginDate) : null;
            !isNullOrUndefined(data.referralDates[0].dCFBeginDate) ? data.referralDates[0].dCFBeginDate = new Date(data.referralDates[0].dCFBeginDate) : null;
            !isNullOrUndefined(data.referralDates[0].recidivistDate) ? data.referralDates[0].recidivistDate = new Date(data.referralDates[0].recidivistDate) : null;
            !isNullOrUndefined(data.referralDates[0].recidivistDateOverride) ? data.referralDates[0].recidivistDateOverride = new Date(data.referralDates[0].recidivistDateOverride) : null;
          } else {
            !isNullOrUndefined(data.referralDates[0].referralDate) ? data.referralDates[0].referralDate = moment.utc(data.referralDates[0].referralDate).format('MM/DD/YYYY HH:mm') : null;
            !isNullOrUndefined(data.referralDates[0].paymentEndDate) ? data.referralDates[0].paymentEndDate = moment.utc(data.referralDates[0].paymentEndDate).format('MM/DD/YYYY HH:mm') : null;
            !isNullOrUndefined(data.referralDates[0].retractedDate) ? data.referralDates[0].retractedDate = moment.utc(data.referralDates[0].retractedDate).format('MM/DD/YYYY HH:mm') : null;
            !isNullOrUndefined(data.referralDates[0].withDrawDate) ? data.referralDates[0].withDrawDate = moment.utc(data.referralDates[0].withDrawDate).format('MM/DD/YYYY HH:mm') : null;
            !isNullOrUndefined(data.referralDates[0].releaseDate) ? data.referralDates[0].releaseDate = moment.utc(data.referralDates[0].releaseDate).format('MM/DD/YYYY HH:mm') : null;
            !isNullOrUndefined(data.referralDates[0].closureDate) ? data.referralDates[0].closureDate = moment.utc(data.referralDates[0].closureDate).format('MM/DD/YYYY HH:mm') : null;
            !isNullOrUndefined(data.referralDates[0].dualAdj_BeginDate) ? data.referralDates[0].dualAdj_BeginDate = moment.utc(data.referralDates[0].dualAdj_BeginDate).format('MM/DD/YYYY HH:mm') : null;
            !isNullOrUndefined(data.referralDates[0].dualAdj_EndDate) ? data.referralDates[0].dualAdj_EndDate = moment.utc(data.referralDates[0].dualAdj_EndDate).format('MM/DD/YYYY HH:mm') : null;
            !isNullOrUndefined(data.referralDates[0].dCFPlanEndDate) ? data.referralDates[0].dCFPlanEndDate = moment.utc(data.referralDates[0].dCFBeginDate).format('MM/DD/YYYY HH:mm') : null;
            !isNullOrUndefined(data.referralDates[0].dCFBeginDate) ? data.referralDates[0].dCFBeginDate = moment.utc(data.referralDates[0].dCFBeginDate).format('MM/DD/YYYY HH:mm') : null;
            !isNullOrUndefined(data.referralDates[0].recidivistDate) ? data.referralDates[0].recidivistDate = moment.utc(data.referralDates[0].recidivistDate).format('MM/DD/YYYY HH:mm') : null;
            !isNullOrUndefined(data.referralDates[0].recidivistDateOverride) ? data.referralDates[0].recidivistDateOverride = moment.utc(data.referralDates[0].recidivistDateOverride).format('MM/DD/YYYY HH:mm') : null;
          }
          this.placementEdit.referralDates = data.referralDates[0];
          this.isReferralDatesFetched = true;
        })
      })

      /** Get record from '/placement/getReminder' API */
      .then(() => {
        this._placement.getRemainder(this.placementReq).then((data: any) => {
          this.placementEdit.reminderNote = data.reminder[0].ReminderNotes;
        })
      })

      /** Get record from '/placement/getRespiteAuthorization' API  */
      .then(() => {
        this._placement.getRespiteAuthorization(this.placementReq).then((data: any) => {
          data.respiteAuthorization.filter((item: any) => {
            item.beginDate = this._localValues.stringFormatDatetime(item.beginDate);
            item.endDate = this._localValues.stringFormatDatetime(item.endDate);
            item.enteredDate = this._localValues.stringFormatDatetime(item.enteredDate);
            item.changedDate = this._localValues.stringFormatDatetime(item.changedDate);
            this.placementEdit.respiteAuthorization = item;
          });
        });
      })

      /** Get record from '/placement/getPlacementAuthorization' API */
      .then(() => {
        this._placement.getPlacementAuthorization(placementAuthReq).then((data: any) => {
          this.placementEdit.placementAuthorization = data.placementAuthorization;
          if (this.placementEdit.placementAuthorization.length > 0) {
            currentPlacementAuthID = this.placementEdit.placementAuthorization[0].authorizationID;
          }

        })

          /** Get record from '' API */
          .then(() => {
            if (this.placementEdit.placementAuthorization.length > 0) {
              this._placement.getPlacementClaim({ authorizationID: currentPlacementAuthID }).then((data: any) => {
                this.placementEdit.placementClaims = data.placementClaim;
              })
            }

          })


      })

      /** Get record from  '/placementDetail/getById' API */
      .then(() => {
        this._placement.getPlacementDetailInfo(placementDetailReq).then((data: any) => {
          this.placementEdit.placementDetail = data.placementDetail;
          this.isPlacementDetailFetched = true;
          this.validateDcfCustodyInfo();
          console.log(" this.placementEdit =====>>>>>>> is", this.placementEdit);
          this.placementEdit.reasonForMoveID['ReasonForMove'] = this.placementEdit.reasonForMoveID.reasonForMove;
          if (this.placementEdit.placementDetail.sfanotes) {
            this.placementEdit.placementDetail['SFANotes'] = this.placementEdit.placementDetail.sfanotes
          }

          if (this.placementEdit.placementDetail.sibsAffectedByMove) {
            this.placementEdit.placementDetail['sibsAffectedbyMove'] = this.placementEdit.placementDetail.sibsAffectedByMove
          }


          if (this.placementEdit.placementDetail.dcfplanEndDate) {
            this.placementEdit.placementDetail.dcfplanEndDate = new Date(this.placementEdit.placementDetail.dcfplanEndDate)
          }
          if (this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideDate) {
            this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideDate = new Date(this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideDate)
          }

          if (this.placementEdit.placementDetail.dcfreleasedOfCustodyDate) {
            this.placementEdit.placementDetail.dcfreleasedOfCustodyDate = new Date(this.placementEdit.placementDetail.dcfreleasedOfCustodyDate)
          }
          if (this.placementEdit.placementDetail.dcfplanEndDateOverride) {
            this.placementEdit.placementDetail.dcfplanEndDateOverride = new Date(this.placementEdit.placementDetail.dcfplanEndDateOverride)
          }

          if (this.placementEdit.placementDetail.retHomeWCustodyDate) {
            this.placementEdit.placementDetail.retHomeWCustodyDate = new Date(this.placementEdit.placementDetail.retHomeWCustodyDate)
          }

          if (this.placementEdit.placementDetail.jjadate) {
            this.placementEdit.placementDetail.jjaDate = (this.placementEdit.placementDetail.jjadate) ? this._localValues.stringFormatDatetime(this.placementEdit.placementDetail.jjadate) : null;
          }

          if (this.placementEdit.placementDetail.changeOfVenueDate) {
            this.placementEdit.placementDetail.changeOfVenueDate = new Date(this.placementEdit.placementDetail.changeOfVenueDate)
          }
          if (this.placementEdit.placementDetail.retHomeWOCustodyDate) {
            this.placementEdit.placementDetail.retHomeWOCustodyDate = new Date(this.placementEdit.placementDetail.retHomeWOCustodyDate)
          }


          this.placementEdit.placementDetail.clientID = this.placementEdit.placementDetail.clientID.clientID
          this.placementEdit.placementDetail.placementID = this.placementEdit.placementDetail.placementID.placementID
          this.placementEdit.placementDetail.providerID = this.placementEdit.placementDetail.providerID.providerID
          this.placementEdit.placementDetail.referralID = this.placementEdit.placementDetail.referralID.referralID
          this.placementEdit.placementDetail.referralID

          if (data.placementDetail.providerID) {
            if (data.placementDetail.providerID) {
              let providerLocationRequest = {
                providerID: data.placementDetail.providerID
              }
              this._placement.getProviderLocationInfo(providerLocationRequest).then((data: any) => {
                // const loader = document.getElementById('loading-overlay') as HTMLElement;
                // loader.style.display = 'block';
                if (data.providerolcation.length > 0) {

                  let providerAddress, providerPhone, providerCity, providerZipCode, providerState;

                  !isNullOrUndefined(data.providerolcation[0].address1) ? providerAddress = data.providerolcation[0].address1 : null;
                  !isNullOrUndefined(data.providerolcation[0].phone) ? providerPhone = data.providerolcation[0].phone : null;
                  !isNullOrUndefined(data.providerolcation[0].city) ? providerCity = data.providerolcation[0].city : null;
                  !isNullOrUndefined(data.providerolcation[0].zipCode) ? providerZipCode = data.providerolcation[0].zipCode : null;
                  !isNullOrUndefined(data.providerolcation[0].abbreviation) ? providerState = data.providerolcation[0].abbreviation : null;

                  this.providerFullAddress = providerAddress + ", " + providerCity + providerState + ", " + providerZipCode;
                  // loader.style.display = 'none';
                }

              })
            }
          }

          // loader.style.display = "none";


        })
          .catch(() => {
            loader.style.display = "none";
          })

      })

      .finally(() => {
        loader.style.display = "none";
        this.isEdit = true;
        this.isReferralDateFieldsDiabled = true;
        this.editForm.disable();
        this.isDataFetchCompleted = true;
      })


  }
  getPreviousPlacementProviderName() {
    let req = { referralID: this.selectedReferralId, placementID: this.currentPlacementId || this._placement.getSavedPlacementId() }
    this._openCard.getPreviousPlacementProvider(req)
      .then((data: any) => {
        this.previousPlacementProviderName = (data.previousPlacementProvider.length > 0) ? data.previousPlacementProvider[0].ProviderName : '';

      })
  }

  setDisruptionInfo() {
    console.log("disruptionDetail is", this.disruptionDetail);
    if (this.disruptionDetail) {
      if (this.disruptionDetail.prev_PlacementID) {
        this.disruptionInfoprev_PlacementID = (this.disruptionDetail.prev_PlacementID.providerID) ? this.disruptionDetail.prev_PlacementID.providerID.providerName : null;
      }
      this.getPreviousPlacementProviderName();

      this.disruptionInfoOtherOptionsOffered = this.disruptionDetail.otherOptOffered;
      this.disruptionInfoDisruptionReason = this.disruptionDetail.disruptionReasonID;
      this.disruptionInfoDisruptionType = this.disruptionDetail.disruptionTypeID;
      this.disruptionInfoRequestedType = this.disruptionDetail.providerID
      if (this.disruptionDetail.staffID) {
        this.disruptionInfoRequestedStaff = { fullName: this.disruptionDetail.staffID.firstName + " " + this.disruptionDetail.staffID.lastName };
      }
    }
    else {
      this.disruptionInfoprev_PlacementID = null;
      this.disruptionInfoOtherOptionsOffered = null;
      this.disruptionInfoDisruptionReason = null;
      this.disruptionInfoDisruptionType = null;
      this.disruptionInfoRequestedType = null;
      this.disruptionInfoRequestedStaff = null;
    }

    console.log("disruptionInfoRequestedStaff is", this.disruptionInfoRequestedStaff);

  }


  defineEditTabs() {
    return this.editTabs = [
      { label: 'Notes', href: '#nav-edit1' },
      { label: 'Sibs In OOH', href: '#nav-edit5' },
      { label: 'School', href: '#nav-edit6' },
      { label: 'Notification Type', href: '#nav-edit7' },
      { label: 'Section 6', href: '#nav-edit8' },
      { label: 'Referral Dates', href: '#nav-edit2' },

    ]
  }

  editFormValidation() {
    this.editForm = this._fb.group({
      beginDate: [null],
      endDate: [null],
      providerID: [null],
      placementReferral: [null],
      reasonForMoveID: [null],
      initiatedByStaffID: [null],
      behaviors: [null],
      reasonForMove_PR: [null],
      notes: [null],
      reminderNote: [null]
    })
  }

  editReleaseMode() {
    this.isEdit = false;
    this.editForm.enable();
  }

  getMoveEvents() {
    let req = {
      referralID: this.selectedReferralId,
      unassignedOnly: true
    }
    this._placement.getMoveEvent(req).then((data: any) => {
      this.moveEvents = data.moveEvent;
    })
  }

  filteredMoveEvents(event: any) {
    this.filteredMoveEventsData = [];
    this.moveEvents.filter((item: any) => {
      if (item.providerName.indexOf(event.query) !== -1) {
        this.filteredMoveEventsData.push(item);
      }
    })
  }

  /** Get the referral dates wizard data in save mode */

  getReferralDates() {
    let referralDateReq = { referralID: this.selectedReferralId }, convertedDates;
    this._placement.getReferralDates(referralDateReq).then((data: any) => {
      this.referralDates.closureDate = !isNullOrUndefined(data.referralDates[0].closureDate) ? new Date(data.referralDates[0].closureDate) : null
      this.referralDates.dCFBeginDate = !isNullOrUndefined(data.referralDates[0].dCFBeginDate) ? new Date(data.referralDates[0].dCFBeginDate) : null;
      this.referralDates.dCFPlanEndDate = !isNullOrUndefined(data.referralDates[0].dCFPlanEndDate) ? new Date(data.referralDates[0].dCFPlanEndDate) : null;
      this.referralDates.dualAdjBeginDate = !isNullOrUndefined(data.referralDates[0].dualAdj_BeginDate) ? new Date(data.referralDates[0].dualAdj_BeginDate) : null;
      this.referralDates.dualAdjEndDate = !isNullOrUndefined(data.referralDates[0].dualAdj_EndDate) ? new Date(data.referralDates[0].dualAdj_EndDate) : null;
      this.referralDates.paymentEndDate = !isNullOrUndefined(data.referralDates[0].paymentEndDate) ? new Date(data.referralDates[0].paymentEndDate) : null;
      this.referralDates.recidivistDate = !isNullOrUndefined(data.referralDates[0].recidivistDate) ? new Date(data.referralDates[0].recidivistDate) : null;
      this.referralDates.recidivistDateOverride = !isNullOrUndefined(data.referralDates[0].recidivistDateOverride) ? new Date(data.referralDates[0].recidivistDateOverride) : null;
      this.referralDates.referralDate = !isNullOrUndefined(data.referralDates[0].referralDate) ? new Date(data.referralDates[0].referralDate) : null;
      this.referralDates.releaseDate = !isNullOrUndefined(data.referralDates[0].releaseDate) ? new Date(data.referralDates[0].releaseDate) : null
      this.referralDates.retractedDate = !isNullOrUndefined(data.referralDates[0].retractedDate) ? new Date(data.referralDates[0].retractedDate) : null
      this.referralDates.withDrawDate = !isNullOrUndefined(data.referralDates[0].withDrawDate) ? new Date(data.referralDates[0].withDrawDate) : null

    })

  }

  onChangeExceptionRateAutofecth() {
    this.authException.exceptionPayorRate = this.authException.originalPayorRate;
    this.authException.exceptionProviderRate = this.authException.originalProviderRate;
  }

  deleteRecord() {
    console.log("delete record called");
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    let req = {
      placementDetailID: this.currentPlacementDetailId
    }
    this._placement.deletePlacementEvent(req).then((data: any) => {
      if (data.responseStatus) {
        swal('Delete', 'Placement Event has been deleted', 'success')
        this._router.navigate(['/reintegration/referral/opencard/placement/placementEvent/view'])

      }
      // loader.style.display = 'none';
    })
  }


  /**Data for ackowledgement option window */
  async getAcknowledgementDetails(authID: any) {
    let referralBasedReq = {}, authorizationReq = {}, result: any;
    referralBasedReq = { referralID: this.selectedReferralId };
    authorizationReq = { authorizationID: authID };
    if (authID) {
      await this._openCard.getCaseManagerList(authorizationReq).then((data: any) => {
        this.caseManagerList = data.caseManagerList;
      })
    }

    await this._openCard.getCaseManagerChangeReasonList().then((data: any) => {
      this.caseManagerChangeReasonList = data.changeReasonList;
    })
    if (authID) {
      await this._openCard.getJudgeList(authorizationReq).then((data: any) => {
        this.judgeList = data.judgeList;
      })
    }

    await this._openCard.getOpenSchoolList(referralBasedReq).then((data: any) => {
      this.schoolList = data.schoolList;
    })
    await this._openCard.getAttendingSameSchoolReason().then((data: any) => {
      this.attendingHomeSchoolReasonList = data.schoolReasonList;
    })
    await this._openCard.getReasonLate().then((data: any) => {
      this.reasonLateList = data.reasonLateList;
    })
    this.isAckOptions = true;
  }

  disableAck() {
    this.isAckOptions = false;
  }

  async getPlacementAuthorizationId(placementDetailID) {

    let req = {
      placementDetailID: placementDetailID
    }
    await this._placement.getPlacementAuthorization(req)
      .then((data: any) => {
        if (data.placementAuthorization) {
          this.authId = (data.placementAuthorization.length > 0) ? data.placementAuthorization[0].authorizationID : null
        }

        else {
          this.authId = null;
        }
        if (this.authId) {
          this.getAcknowledgementDetails(this.authId).then((data: any) => {

          })

        }
      })

  }

  validateDcfCustodyInfo() {

    if (this.placementEdit.placementDetail && this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID) {
      (this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID == 1) ? this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID = { DCFReleasedOfCustodyOverride: "Ignore ROC Date" } : null;
      (this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID == 2) ? this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID = { DCFReleasedOfCustodyOverride: "6 Month Rule" } : null;

    }
    if (this.placementEdit.placementDetail && this.placementEdit.placementDetail.dcfplanEndDateOverrideID) {
      (this.placementEdit.placementDetail.dcfplanEndDateOverrideID) ? this.placementEdit.placementDetail.dcfplanEndDateOverrideID = { PlanEndDateOverride: "Ignore PED Date" } : null;

    }

  }

  getPlacementProcodes(event: any, label: any) {
    let req = {
      beginDate: this.placementEdit.beginDate,
      referralTypeID: parseInt(localStorage.getItem('referralTypeId')) - this._openCard.getHasKey(),
      "beginPagination": 1,
      "endPagination": 100,
      "sort": {
        "column": "procodeID",
        "mode": "ASC"
      },
      "value": ""
    }
    this._openCard.getPlacementProcodes(req).then((data: any) => {
      // data.procodeList.map((item: any) => {
      //   item['procode'] = `${item.procodeName}`;
      // })
      this.metaData = data.procodeList;
    })

  }

  getClientSchoolList(event: any, label: any) {
    this.metaData = [];
    this.clientSchoolPlacementsDropdown.map((item) => {
      this.metaData.push(item);
    })
  }

  async listPlacements() {
    let req = {
      "endPagination": 100,
      "beginPagination": 1,
      "referralID": this.selectedReferralId,
      "sort": {
        "column": "placementID",
        "mode": "desc"
      }
    };
    await this._openCard.listOfPlacements(req).then((data: any) => {
      this.placementList = data;
    })
  }

  getPlacementDropdown() {
    this.metaData = [];
    this.placementList['placementList'].map((item) => {

      let value = {
        placement: item.providerName,
        placementID: item.placementID
      }
      this.metaData.push(value);
    })
  }

  addSchool(event, i, type) {

    switch (type) {
      case 'fromSchool':
        this.clientSchoolPlacements.map((data, index) => {
          if (index == i) {
            this.clientSchoolPlacementsData[index]['from_SchoolID'] = event.from_SchoolID;
            this.clientSchoolPlacementsData[index]['clientSchoolPlacementID'] = event.clientSchoolPlacementID;
          }
        })

        break;

      case 'placement':
        this.clientSchoolPlacements.map((data, index) => {
          if (index == i) {
            this.clientSchoolPlacementsData[index]['placement'] = event.placement;
            this.clientSchoolPlacementsData[index]['placementID'] = event.placementID || 0;
          }
        })

        break;

    }

  }

  updatePlacementSchool() {
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';

    this.getData().then(data => {
      // loader.style.display = "none";
    })
  }

  async getData() {
    return Promise.all(this.clientSchoolPlacements.map((item, index) => this.updatePlacementSchoolApiCall(item, index)))
  }

  updatePlacementSchoolApiCall(item, index) {
    let req = {
      "clientSchoolPlacementID": this.clientSchoolPlacementsData[index].clientSchoolPlacementID,
      "from_ClientSchoolID": this.clientSchoolPlacementsData[index].from_SchoolID,
      "to_ClientSchoolID": this.clientSchoolPlacementsData[index].to_SchoolID,
      "placementID": this.clientSchoolPlacementsInfo[index].placementID,
      "dateOfChange": this.clientSchoolPlacements[index].dateOfChange,
    }

    return this._openCard.updatePlacementSchool(req);

  }

  async filterPlacemetProviders(event: any) {
    let request = {
      beginDate: this.placement.beginDate,
      referralTypeID: parseInt(localStorage.getItem('referralTypeId')) - this._openCard.getHasKey(),
      beginPagination: 1,
      endPagination: 100,
      value: event.query
    }
    let response = await this._openCard.placementProviders(request);
    return this.metaData = response.filter((provider: any) => { return provider.ProviderName.toLowerCase().indexOf(event.query) !== -1 });
  }

  unitsPerMonthValue() {
    let referralId = parseInt(localStorage.getItem('referralTypeId')) - this._openCard.getHasKey();
    if (referralId === 12) {
      return this.respite.unitsPerMonth = 1;
    } else {
      return this.respite.unitsPerMonth = 2;
    }
  }

  async checkHasSiblinginOOHPlacement() {
    let response: any;
    let request = {
      referralID: this.selectedReferralId,
      clientID: this.selectedClientId,
      beginDate: this.placement.beginDate
    }
    response = await this._openCard.placementHasSiblinginOOHPlacement(request);
    if (response.NUM_OOH > 0 && response.NUM_OOH !== null) {
      return this.placementDetail.isSibOOH = true;
    } else {
      return this.placementDetail.isSibOOH = false;
    }
  }

  async onFilteredPlacementProcode(event: any) {
    let request = {
      referralTypeID: parseInt(localStorage.getItem('referralTypeId')) - this._openCard.getHasKey(),
      beginDate: this.placement.beginDate,
      beginPagination: 1,
      endPagination: 100,
      sort: {
        column: "procodeID",
        mode: "ASC"
      },
      value: event.query
    }
    let response = await this._openCard.placementProcode(request)
    return this.metaData = response.filter((item: any) => { return item.procode.toLowerCase().indexOf(event.query) !== -1 })
  }

  selectedReferralId = null;
  selectedClientId = null;

  getListViewData() {
    this.currentPlacementId = this._localValues.placementHistoryListSelectData.placementID;
    this.currentPlacementDetailId = this._localValues.placementHistoryListSelectData.placementDetailID;
    this.selectedClientId = this._localValues.placementHistoryListSelectData.clientID;
    this.selectedReferralId = this._localValues.placementHistoryListSelectData.referralID;
  }

  onClickJumptoClient() {
    let currentClientId = parseInt(this.currentClientId);
    let clientID = currentClientId + this._openCard.getHasKey();
    localStorage.setItem('clientId', clientID.toString());
    return this._router.navigate(['/reports/client/details'], { queryParams: { clientID: this.currentClientId, currentNode: 'placement_history' } });
  }

}
