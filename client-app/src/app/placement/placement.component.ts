import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  Placement,
  authorization,
  respiteAuthorization,
  placementDetail,
  Disruption,
  PlacementEdit,
  PlacementBehavioursUpdate,
  ReferralDates,
  DisruptionUpdate,
  PlacementMoveEventUpdate,
  IdentifiedResourceUpdate,
  AuthorizationException,
} from "./placement";
import { CaseTeamService } from "../case-team/case-team.service";
import swal from "sweetalert2";
import { PlacementService } from "./placement.service";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { isNullOrUndefined } from "util";
import { AttendingSchool } from "../attending-school/attending-school";
import { HomeSchoolComponent } from "../home-school/home-school.component";
import { HomeSchool } from "../home-school/home-school";
import { AttendingSchoolComponent } from "../attending-school/attending-school.component";
import { ClildFormService } from "../child-forms/child-forms.service";
import { LocalValues } from "../local-values";
import * as moment from "moment";
import { PlacementPrintService } from "../placement-forms/placement-print.service";
import { PlacementEventComponent } from "./placement-event/placement-event.component";
import { ProviderComponent } from "../provider/provider.component";
import { MessageService } from "primeng/api";
import { AckOptionsComponent } from "../ack-options/ack-options.component";
import {
  CLIENTID,
  PLACEMENT_DETAIL_ID,
  PLACEMENT_ID,
  REFID,
  REFTYPEID,
} from "../../constants/AppConstants";

@Component({
  selector: "app-placement",
  templateUrl: "./placement.component.html",
  styleUrls: ["./placement.component.scss"],
})
export class PlacementComponent implements OnInit {
  mainTabs = [];
  sIndex = 0;
  breadcrumbs = [];
  url: any;
  isAttachmentRequired = false;
  placementForm: FormGroup;
  placement: Placement = new Placement();
  metaData = [];
  school_data: any = {
    from_school: "",
    to_school: "",
    placement: "",
    date: "",
  };
  sibs_data: any = {
    name: "",
    dob: "",
    client_id: "",
    eff_date: "",
    adds: "",
    remove: "",
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
  homeSchoolComp: HomeSchoolComponent = new HomeSchoolComponent(
    this._fb,
    this._router,
    this._caseTeam,
    this._clientService,
    this._openCard,
    this._localValues,
    this._message
  );
  homeSchool: HomeSchool = new HomeSchool();
  attendingSchoolComp: AttendingSchoolComponent = new AttendingSchoolComponent(
    this._fb,
    this._caseTeam,
    this._openCard,
    this._router,
    this._clientService,
    this._localValues,
    this._message
  );
  homeSchoolList = [];
  homeSchoolListHeaders = [];
  isHomeSchoolList = false;
  homeSchoolBtnLabel = "Save";
  attendinSchoolListHeaders = [];
  attendingSchoolList = [];
  attendingSchoolBtnLabel = "Save";
  isAttendingSchoolList: any;
  placementDetail: placementDetail = new placementDetail();
  clientSchoolPlacements = [];
  isAuthException = false;
  disruption: Disruption = new Disruption();
  isPlacementCreateForm = true;
  placementEdit: PlacementEdit = new PlacementEdit();
  editTabs = [];
  editForm: FormGroup;
  isReferralDateFieldsDiabled = false;
  selectedProviderDropdownField: string;
  isEdit = false;
  placementbehaviourUpdate: PlacementBehavioursUpdate =
    new PlacementBehavioursUpdate();
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
  previousPlacementProviderName: any;
  currentReferralId: number;
  disruptionForm: FormGroup;
  currentReferralTypeID: any;
  isRequestedByProviderEnable = false;
  requestedByType = [
    { view: "Provider", value: "provider" },
    { view: "Staff", value: "staff" },
  ];
  isDisruptionEnable = false;
  placementDates: any;
  behaviours: string; //common for notes tab and notification tab behaviour related textarea;
  printAckHeader = "Acknowledgement Options";
  isAckOptions = false;
  moduleName = "Placement";
  caseManagerList = [];
  caseManagerChangeReasonList = [];
  judgeList = [];
  schoolList = [];
  attendingHomeSchoolReasonList = [];
  reasonLateList = [];
  placementEventList: any;
  placementEventCount = 0;
  livingArrangementCount = 0;
  placementPlanCount = 0;
  daycareAuthorizationCount = 0;
  immmediateAssessmentCount = 0;
  newAuthEndDate: Date;
  placementList = [];
  clientSchoolPlacementsDropdown = [];
  clientSchoolPlacementsInfo = [];
  clientSchoolPlacementsData = [];
  isMoveFormSelected = false;
  placementProcodeList = [];
  placementReq: any;
  selectedProviderLocationID: number;
  isMandatorySymbolAllowed = true;
  isPlacementEvent = false;
  @ViewChild(PlacementEventComponent, { static: true })
  placementEventComponent: PlacementEventComponent;
  isProviderCreation = false;
  @ViewChild(ProviderComponent, { static: true })
  providerComponent: ProviderComponent;
  isDCFServiceCodeDisabled = true;
  newAttendingSchoolList = [];
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  formMode: string;
  paymentEndDateHistory = [];
  isOpenPaymentDates = false;

  dialogList = [];
  lastDialogId = 0;
  placementFormExitValidation: string;

  public selectedProcodeObject: any;
  public currentDateAndTime = Date.now();

  public placementSiblingsList = [];
  public isSection7EditFormOpen = false;
  public filteredSiblingsList = [];
  public isAtteningSchoolDeleteConfirmation = false;
  public selectedAttendingSchoolData: any;
  public isReasonForChangeMandatroy = false;

  @ViewChild(AckOptionsComponent, { static: true })
  ackOptionsComponent: AckOptionsComponent;

  isPlacementDateValidationOpen: any;
  placementDateValidationStatus = [];
  public REF_ID = parseInt(
    this._activatedRoute.snapshot.queryParamMap.get(REFID)
  );
  public CLI_ID = parseInt(
    this._activatedRoute.snapshot.queryParamMap.get(CLIENTID)
  );
  public PLACEMENT_ID = parseInt(
    this._activatedRoute.snapshot.queryParamMap.get(PLACEMENT_ID)
  );
  public PLACEMENT_DETAIL_ID = parseInt(
    this._activatedRoute.snapshot.queryParamMap.get(PLACEMENT_DETAIL_ID)
  );
  public REF_TYPE_ID = parseInt(
    this._activatedRoute.snapshot.queryParamMap.get(REFTYPEID)
  );

  constructor(
    public _placementPrint: PlacementPrintService,
    public _router: Router,
    public _fb: FormBuilder,
    public _caseTeam: CaseTeamService,
    public _placement: PlacementService,
    public _openCard: OpencardsService,
    public _localValues: LocalValues,
    public _activatedRoute: ActivatedRoute,
    public _message: MessageService,
    public _clientService: ClildFormService
  ) {}

  ngOnInit() {
    this.setIndex(0);
    this.getPlacementSiblingsList();
    this.disruptionFormValidation();
    this.listPlacements();
    this.disruptionForm.disable();
    this.disruptionForm.reset();
    this.formMode = this._activatedRoute.snapshot.queryParamMap.get("action");
    this.currentPlacementId = this.PLACEMENT_ID;
    this.currentPlacementDetailId = this.PLACEMENT_DETAIL_ID;
    this.currentReferralId = this.REF_ID;
    this.currentReferralTypeID = this.REF_TYPE_ID;
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case Form",
        href: "/reintegration/referral/detail",
        active: "",
      },
      {
        label: "Placements List",
        active: "",
        href: "/reintegration/referral/opencard/placement/view",
      },
      { label: "Placements", active: "active" }
    );
    this.formValidation();
    if (this._localValues.isPlacementNewValidationSet) {
      this.isMandatorySymbolAllowed = false;
    }

    this.makeReasonForChangeFieldMandatory();

    /** Autofecth value for new form */
    if (
      this._router.url.includes(
        "/reintegration/referral/opencard/placement/new"
      )
    ) {
      // this.hasSiblingsInoutHomeValidation();
      this.authorizationInformationAutoFill();
      setTimeout(() => {
        this.getReferralDates();
      }, 3000);
      this.defineMainTabs();
      this.placement.beginDate = new Date(
        this._localValues.stringFormatDatetime(this.currentDateAndTime)
      );
      this.placement.beginDate.setHours(0);
      this.placement.beginDate.setMinutes(0);
      this.placement.beginDate.setSeconds(0);
      this.respite.beginDate = new Date(
        this._localValues.stringFormatDatetime(this.currentDateAndTime)
      );
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
        pdatedDate: null,
      };
      this.beginDateBasedMasters(new Date());
      this.checkHasSiblinginOOHPlacement();
      this.unitsPerMonthValue();
      let payorName = {
        payorName: "Saint Francis Reintegration - West Region - RFCA Region 3",
        payorID: 142,
      };
      this.auth.payorAuthorizationID = payorName;
      this.respite.payorID = payorName;
    }
    /*** Edit form */
    if (
      this._router.url.includes(
        "/reintegration/referral/opencard/placement/detail"
      )
    ) {
      this.getSubnodeCounts();
      this.getPreviousPlacementProviderName();
      this.editFormValidation();
      this.defineEditTabs();
      this.getPlacementRecordById();
      this.getPlacementEventList();
      this.getPlacementSiblingsList();
    }
    this.attendingSchoolFormValidation();
    this.getMasterDetails();
    this.homeSchoolValidation();
    this.getHomeSchoolList();
    this.getAttendingSchoolList();
    let referralTypeId = this.REF_TYPE_ID;
    if (referralTypeId === 4) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "placements-NCFCH",
        this.breadcrumbs
      );
    }
    if (referralTypeId === 15) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseForm-BHOK",
        this.breadcrumbs
      );
    }
    if (referralTypeId === 11) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "placements-NCMHR",
        this.breadcrumbs
      );
    }
    if (referralTypeId === 17) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "placements-JJFC",
        this.breadcrumbs
      );
    }
    /**Placement print items configuration */
    this.placementPrintItems = [
      /** Eg: {label: 'Update', icon: 'pi pi-refresh', command: () => { this.update(); }},**/
      {
        label: "ACK - Acknowledgement",
        routerLink: ["/placement-acknowledgment"],
      },
      // {label:'PSA - Provider Service Agreement', routerLink:['/reintegration/referral/opencard/placement/view']},
      {
        label: "PS -  Placement Status",
        routerLink: ["/placement-event-status"],
      },
      {
        label: "PA -  Placement Agreement",
        routerLink: ["/placement-agreement"],
      },
      { label: "PSA Form", routerLink: ["/placement-psa"] },

      // {label:'PA -  Placement Agreement (Foster Care Home / Kinship Non-Relative)', routerLink:['/reintegration/referral/opencard/placement/view']},
      // {label:'PA - Placement Agreement (Kinship / Agency Approved)', routerLink:['/reintegration/referral/opencard/placement/view']},
      // {label:'PA - Placement Agreement (Kinship Non Paid)', routerLink:['/reintegration/referral/opencard/placement/view']},
      // {label:'FC - Flow Chart ( Continuum Of Care Flow Chart)', routerLink:['/reintegration/referral/opencard/placement/view']},
      // {label:'Provider Envelope', routerLink:['/reintegration/referral/opencard/placement/view']},
      // {label:'Fax List', routerLink:['/reintegration/referral/opencard/placement/view']},
      // {label:'View History', routerLink:['/reintegration/referral/opencard/placement/view']},
    ];
    this.getMoveEvents();
    this.getPlacementProcodes();
  }

  openDraggableDialog(title, path) {
    this.dialogList.push({
      title: title,
      height: 500,
      width: 1000,
      id: this.lastDialogId,
      path: path,
    });
    // increment the dialog Id
    this.lastDialogId += 1;
  }

  closeDraggableDialog(data) {
    const index = this.dialogList.findIndex((value) => value.id === data.id);
    this.dialogList.splice(index, 1);
  }

  setIndex(index: number) {
    this.sIndex = index;
  }

  defineMainTabs() {
    return (this.mainTabs = [
      { label: "Notes", href: "#nav-sec1" },
      { label: "Sibs In OOH", href: "#nav-sec2" },
      { label: "School", href: "#nav-sec3" },
      { label: "Notification Type", href: "#nav-sec4" },
      { label: "Section 6", href: "#nav-sec5" },
      { label: "Referral Dates", href: "#nav-sec6" },
      { label: "Reminder", href: "#nav-sec7" },
      { label: "Respite Authorization", href: "#nav-sec8" },
      { label: "Sibs at Home ", href: "#nav-sec9" },
    ]);
  }
  dcfplanEndDate: any;
  /*** API Request handler */
  async formAction(source: Placement) {
    if (this.placementDetail.dcfplanEndDate) {
      this.dcfplanEndDate = this.placementDetail.dcfplanEndDate;
    }
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let validationResult =
      this.placementEdit.placementID ||
      (this.placement.beginDate !== null &&
        this.placement.beginDate !== undefined &&
        this.placement.providerID !== null &&
        this.placement.providerID !== undefined &&
        this.placement.reasonForMoveID !== null &&
        this.placement.reasonForMoveID !== undefined &&
        (!this.isMoveFormSelected ||
          (this.placement.initiatedByStaffID !== null &&
            this.placement.initiatedByStaffID !== undefined)) &&
        this.placement.reasonForMove_PR !== null &&
        this.placement.reasonForMove_PR !== undefined &&
        this.placementDetail.procodeID !== null &&
        this.placementDetail.procodeID !== undefined);

    if (this._localValues.isPlacementNewValidationSet) {
      validationResult =
        this.placementEdit.placementID ||
        (this.placement.beginDate !== null &&
          this.placement.beginDate !== undefined &&
          this.placement.providerID !== null &&
          this.placement.providerID !== undefined &&
          this.placementDetail.procodeID !== null &&
          this.placementDetail.procodeID !== undefined);
    }

    if (!this.isDCFServiceCodeDisabled) {
      validationResult =
        this.placementDetail.sRSServiceCodeID !== null &&
        this.placementDetail.sRSServiceCodeID !== undefined
          ? true
          : false;
    }

    // if (this.isReasonForChangeMandatroy) {
    //   validationResult =
    //     this.placement.reasonForMoveID !== null &&
    //     this.placement.reasonForMoveID !== undefined
    //       ? true
    //       : false;
    // }

    if (validationResult) {
      this.selectedProcodeObject = this.placement.procodeID;
      this.respite.enteredBy = "Admin";
      this.respite.enteredDate = this._localValues.stringFormatDatetime(
        this.currentDateAndTime
      );
      this.disruption.enteredBy = "Admin";
      this.disruption.enteredDate = this._localValues.stringFormatDatetime(
        this.currentDateAndTime
      );
      /** For placement */
      source.beginDate = this._localValues.stringFormatDatetime(
        Date.parse(this.placement.beginDate)
      );
      source.endDate = this._localValues.stringFormatDatetimeWithoutSeconds(
        Date.parse(source.endDate)
      );
      !isNullOrUndefined(source.placementReferralID)
        ? (source.placementReferralID =
            source.placementReferralID.PlacementReferralID)
        : (source.placementReferralID = null);
      source.enteredBy = "Admin";
      source.enteredDate = this._localValues.stringFormatDatetime(
        this.currentDateAndTime
      );
      source.clientID = this.CLI_ID;
      source.referralID = this.REF_ID;
      source.initiatedByStaffID = !isNullOrUndefined(source.initiatedByStaffID)
        ? source.initiatedByStaffID.staffID
        : null;
      source.reasonForMoveID = !isNullOrUndefined(source.reasonForMoveID)
        ? source.reasonForMoveID.reasonForMoveID
        : null;
      source.providerID = !isNullOrUndefined(source.providerID)
        ? source.providerID.providerID
        : null;
      /** For authorization */
      this.auth.providerLocationID = this.selectedProviderLocationID;
      this.auth.clientID = this.CLI_ID;
      this.auth.providerID = !isNullOrUndefined(this.placement.providerID)
        ? this.placement.providerID.providerID
        : null;
      this.auth.referralID = this.REF_ID;
      this.auth.beginDate = this._localValues.stringFormatDatetime(
        Date.parse(this.placement.beginDate)
      );
      this.auth.endDate = this._localValues.stringFormatDatetime(
        Date.parse(this.auth.endDate)
      );
      this.auth.livingArrangementID = null;
      this.auth.payorID = !isNullOrUndefined(this.auth.payorAuthorizationID)
        ? this.auth.payorAuthorizationID.payorID
        : null;
      this.auth.procodeID = !isNullOrUndefined(this.placementDetail.procodeID)
        ? this.placementDetail.procodeID.procodeID
        : null;
      this.auth.authorizationStatusID = !isNullOrUndefined(
        this.auth.authorizationStatusID
      )
        ? this.auth.authorizationStatusID.authorizationStatusID
        : null;
      this.auth.unitTypeID = null;
      this.auth.unitsRemaining = this.auth.unitsAuth;
      this.auth.unitsPaidByPlacement = null;
      this.auth.doNotPay = null;
      this.auth.paySponsor = null;
      this.auth.exception = null;
      this.auth.payorAuthorizationID = !isNullOrUndefined(
        this.auth.payorAuthorizationID
      )
        ? this.auth.payorAuthorizationID.payorID
        : null;
      this.auth.notes = null;
      this.auth.holdBedPayorID = null;
      this.auth.holdBedUnits = null;
      this.auth.enteredBy = "Admin";
      this.auth.enteredDate = this._localValues.stringFormatDatetime(
        this.currentDateAndTime
      );
      this.auth.providerID = !isNullOrUndefined(source.providerID)
        ? source.providerID
        : null;
      /** For notes */
      this.placementDetail.reasonForMoveID = !isNullOrUndefined(
        this.placement.reasonForMoveID
      )
        ? this.placement.reasonForMoveID.reasonForMoveID
        : null;
      /** For sibs in ooh */
      // !isNullOrUndefined(this.placementDetail.siblingReasonID) ? this.placementDetail.siblingReasonID = this.placementDetail.siblingReasonID.SiblingReasonID : null;
      /** For disruption  */
      this.disruption.disruptionReasonID = !isNullOrUndefined(
        this.disruption.disruptionReasonID
      )
        ? this.disruption.disruptionReasonID.DisruptionReasonID
        : null;
      this.disruption.disruptionTypeID = !isNullOrUndefined(
        this.disruption.disruptionTypeID
      )
        ? this.disruption.disruptionTypeID.DisruptionTypeID
        : null;
      this.disruption.providerID = !isNullOrUndefined(
        this.disruption.providerID
      )
        ? this.disruption.providerID.providerID
        : null;
      this.disruption.staffID = !isNullOrUndefined(this.disruption.staffID)
        ? this.disruption.staffID.StaffID
        : null;
      this.disruption.enteredBy = "Admin";
      this.disruption.enteredDate = this._localValues.stringFormatDatetime(
        this.currentDateAndTime
      );
      this.disruption.prev_PlacementID = 2;
      /**For placement behavior update */
      this.placementbehaviourUpdate.behavior = !isNullOrUndefined(
        this.placement.behaviors
      )
        ? this.placement.behaviors
        : null;

      this.placementbehaviourUpdate.changedBy = "Admin";
      this.placementbehaviourUpdate.changedDate =
        this._localValues.stringFormatDatetime(this.currentDateAndTime);

      this.placement.behaviors = this.behaviours || null;
      /**For school */
      this.placementDetail.dcfreleasedOfCustodyID = !isNullOrUndefined(
        this.placementDetail.dcfreleasedOfCustodyID
      )
        ? this.placementDetail.dcfreleasedOfCustodyID.DCFReleasedOfCustodyID
        : null;
      this.placementDetail.dcfreleasedOfCustodyDate =
        this._localValues.stringFormatDatetime(
          Date.parse(this.placementDetail.dcfreleasedOfCustodyDate)
        );
      this.placementDetail.retHomeWCustodyDate =
        this._localValues.stringFormatDatetime(
          Date.parse(this.placementDetail.retHomeWCustodyDate)
        );
      this.placementDetail.jjaDate = this._localValues.stringFormatDatetime(
        Date.parse(this.placementDetail.jjaDate)
      );
      this.placementDetail.changeOfVenueDate =
        this._localValues.stringFormatDatetime(
          Date.parse(this.placementDetail.changeOfVenueDate)
        );
      this.placementDetail.dcfreleasedOfCustodyOverrideID = !isNullOrUndefined(
        this.placementDetail.dcfreleasedOfCustodyOverrideID
      )
        ? this.placementDetail.dcfreleasedOfCustodyOverrideID
            .DCFReleasedOfCustodyOverrideID
        : null;
      this.placementDetail.dcfreleasedOfCustodyOverrideDate =
        this._localValues.stringFormatDatetime(
          Date.parse(this.placementDetail.dcfreleasedOfCustodyOverrideDate)
        );
      this.placementDetail.dcfplanEndDateOverride =
        this._localValues.stringFormatDatetime(
          Date.parse(this.placementDetail.dcfplanEndDateOverride)
        );

      this.placementDetail.dcfplanEndDateOverrideID = !isNullOrUndefined(
        this.placementDetail.dcfplanEndDateOverrideID
      )
        ? this.placementDetail.dcfplanEndDateOverrideID.PlanEndDateOverrideID
        : null;
      this.placementDetail.sRSServiceCodeID = !isNullOrUndefined(
        this.placementDetail.sRSServiceCodeID
      )
        ? this.placementDetail.sRSServiceCodeID.sRSServiceCodeID
        : null;
      /**For referral dates */
      this.referralDates.referralID = this.REF_ID;
      this.referralDates.changedBy = "Admin";
      this.referralDates.changedDate = this._localValues.stringFormatDatetime(
        this.currentDateAndTime
      );
      this.referralDates.referralDate = this._localValues.stringFormatDatetime(
        Date.parse(this.referralDates.referralDate)
      );
      this.referralDates.paymentEndDate =
        this._localValues.stringFormatDatetime(
          Date.parse(this.referralDates.paymentEndDate)
        );
      this.referralDates.retractedDate = this._localValues.stringFormatDatetime(
        Date.parse(this.referralDates.retractedDate)
      );
      this.referralDates.withDrawDate = this._localValues.stringFormatDatetime(
        Date.parse(this.referralDates.withDrawDate)
      );
      this.referralDates.closureDate = this._localValues.stringFormatDatetime(
        Date.parse(this.referralDates.closureDate)
      );
      this.referralDates.dualAdjBeginDate =
        this._localValues.stringFormatDatetime(
          Date.parse(this.referralDates.dualAdjBeginDate)
        );
      this.referralDates.dualAdjEndDate =
        this._localValues.stringFormatDatetime(
          Date.parse(this.referralDates.dualAdjEndDate)
        );
      this.referralDates.dCFPlanEndDate =
        this._localValues.stringFormatDatetime(
          Date.parse(this.referralDates.dCFPlanEndDate)
        );
      this.referralDates.dCFBeginDate = this._localValues.stringFormatDatetime(
        Date.parse(this.referralDates.dCFBeginDate)
      );
      this.referralDates.recidivistDate =
        this._localValues.stringFormatDatetime(
          Date.parse(this.referralDates.recidivistDate)
        );
      this.referralDates.recidivistDateOverride =
        this._localValues.stringFormatDatetime(
          Date.parse(this.referralDates.recidivistDateOverride)
        );
      this.referralDates.releaseDate = this._localValues.stringFormatDatetime(
        Date.parse(this.referralDates.releaseDate)
      );
      /**For recidivistDateUpdate */
      let recidivistDateUpdateObj = {
        referralID: this.REF_ID,
      };
      /**For disruption update */
      this.disruptionUpdate.disruptionID;
      this.disruptionUpdate.disruptionReasonID = !isNullOrUndefined(
        this.disruption.disruptionReasonID
      )
        ? this.disruption.disruptionReasonID
        : null;
      this.disruptionUpdate.disruptionTypeID = !isNullOrUndefined(
        this.disruption.disruptionTypeID
      )
        ? this.disruption.disruptionTypeID
        : null;
      this.disruptionUpdate.providerID = !isNullOrUndefined(
        this.disruption.providerID
      )
        ? this.disruption.providerID
        : null;
      this.disruptionUpdate.staffID = !isNullOrUndefined(
        this.disruption.staffID
      )
        ? this.disruption.staffID
        : null;
      this.disruptionUpdate.changedBy = "Admin";
      this.disruptionUpdate.changedDate =
        this._localValues.stringFormatDatetime(this.currentDateAndTime);
      this.disruptionUpdate.prev_PlacementID = 2;
      /**For placementMoveEventUpdate */
      this.placementMoveEvent.moveEventID = !isNullOrUndefined(
        this.placementMoveEvent.moveEventID
      )
        ? this.placementMoveEvent.moveEventID.moveEventID
        : null;
      this.placementMoveEvent.isDeletePlacement = false;
      this.placementMoveEvent.changedBy = "Admin";
      this.placementMoveEvent.changedDate =
        this._localValues.stringFormatDatetime(this.currentDateAndTime);
      /**For IdentifiedResourceUpdate */
      this.identifiedResource.beginDate =
        this._localValues.stringFormatDatetime(
          Date.parse(this.placement.beginDate)
        );
      this.identifiedResource.endDate = !isNullOrUndefined(
        this.placement.endDate
      )
        ? this.placement.endDate
        : null;
      this.identifiedResource.procodeID = !isNullOrUndefined(
        this.auth.procodeID
      )
        ? this.auth.procodeID
        : null;
      this.identifiedResource.providerID = !isNullOrUndefined(
        this.placement.providerID
      )
        ? this.placement.providerID
        : null;
      (this.identifiedResource.enteredBy = "Admin"),
        (this.identifiedResource.enteredDate =
          this._localValues.stringFormatDatetime(this.currentDateAndTime));
      this.identifiedResource.referralID = this.REF_ID;
      /**For respiteAuthorization */
      this.respite.beginDate = this._localValues.stringFormatDatetime(
        Date.parse(this.placement.beginDate)
      );
      this.respite.endDate = this._localValues.stringFormatDatetime(
        Date.parse(this.respite.endDate)
      );
      this.respite.payorID = !isNullOrUndefined(this.respite.payorID)
        ? this.respite.payorID.payorID
        : null;
      this.respite.reminderNote = !isNullOrUndefined(
        this.placement.reminderNote
      )
        ? this.placement.reminderNote
        : null;
      /**For AuthorizationException */
      this.authException.authorizationID;
      this.authException.approvedBy_StaffID = !isNullOrUndefined(
        this.authException.approvedBy_StaffID
      )
        ? this.authException.approvedBy_StaffID.staffID
        : null;
      this.authException.authorizationExceptionReasonID = !isNullOrUndefined(
        this.authException.authorizationExceptionReasonID
      )
        ? this.authException.authorizationExceptionReasonID
            .authorizationExceptionReasonID
        : null;
      this.authException.requestedBy = "Admin";
      /**For placement detail */
      this.placementDetail.providerLocationID = this.selectedProviderLocationID;
      this.placementDetail.beginDate = this._localValues.stringFormatDatetime(
        Date.parse(this.placement.beginDate)
      );
      this.placementDetail.changedBy = "Admin";
      this.placementDetail.changedDate = this._localValues.stringFormatDatetime(
        this.currentDateAndTime
      );
      this.placementDetail.clientID = this.CLI_ID;
      this.placementDetail.createdDate = this._localValues.stringFormatDatetime(
        this.currentDateAndTime
      );
      this.placementDetail.endDate =
        this.placement.endDate !== undefined && this.placement.endDate !== null
          ? this._localValues.stringFormatDatetimeWithoutSeconds(
              new Date(this.placement.endDate).getTime()
            )
          : null;
      this.placementDetail.enteredBy = "Admin";
      this.placementDetail.enteredDate = this._localValues.stringFormatDatetime(
        this.currentDateAndTime
      );
      this.placementDetail.formReceivedDate =
        this._localValues.stringFormatDatetime(
          Date.parse(this.placementDetail.formReceivedDate)
        );
      this.placementDetail.lastModifiedDate =
        this._localValues.stringFormatDatetime(this.currentDateAndTime);
      this.placementDetail.paymentEndDate =
        this._localValues.stringFormatDatetime(
          Date.parse(this.referralDates.paymentEndDate)
        );
      this.placementDetail.payorID = !isNullOrUndefined(this.auth.payorID)
        ? this.auth.payorID.payorID
        : null;
      this.placementDetail.procodeID = !isNullOrUndefined(this.auth.procodeID)
        ? this.auth.procodeID
        : null;
      this.placementDetail.providerID = !isNullOrUndefined(
        this.placement.providerID
      )
        ? this.placement.providerID
        : null;
      this.placementDetail.referralID = this.REF_ID;
      this.placementDetail.siblingReasonID = !isNullOrUndefined(
        this.placementDetail.siblingReasonID
      )
        ? this.placementDetail.siblingReasonID.SiblingReasonID
        : null;
      // this.placementDetail.sRSServiceCodeID = !isNullOrUndefined(this.placementDetail.sRSServiceCodeID) ? this.placementDetail.sRSServiceCodeID.sRSServiceCodeID : null;
      // this.placementDetail.sponsorID = !isNullOrUndefined(this.placementDetail.sponsorID) ? this.placementDetail.sponsorID.sponsorID : null;
      this.placementDetail.updatedDate = this._localValues.stringFormatDatetime(
        this.currentDateAndTime
      );
      this.placement.behaviors = this.behaviours || null;
      this.placementbehaviourUpdate.behavior = this.behaviours || null;
      let req: any;
      if (this.placementEdit.placementID) {
        req = this.placementEdit;
      } else {
        req = {
          placement: source,
          respiteAuthorization: this.respite,
          // school: this.clientSchoolPlacements,
          placementDetail: this.placementDetail,
          authorization: this.auth,
          disruption: this.disruption,
          disruptionUpdate: this.disruptionUpdate,
          placementBehavioursUpdate: this.placementbehaviourUpdate,
          planEndDateReleaseOfCustodyUpdate: {
            referralID: this.REF_ID,
          },
          placementMoveEventUpdate: this.placementMoveEvent,
          identifiedResourceUpdate: this.identifiedResource,
          recidivistDateUpdate: recidivistDateUpdateObj,
          authorizationException: this.authException,
          referralUpdate: this.referralDates,
        };
      }

      /**Mandatory check */
      req;
      // if (
      //   (this.placement.beginDate !== null && this.placement.beginDate !== undefined) &&
      //   (this.placement.providerID !== null && this.placement.providerID !== undefined) &&
      //   (this.placement.placementReferralID !== null && this.placement.placementReferralID !== undefined) &&
      //   (this.placement.reasonForMoveID !== null && this.placement.reasonForMoveID !== undefined) &&
      //   (this.placement.initiatedByStaffID !== null && this.placement.initiatedByStaffID !== undefined) &&
      //   (this.placement.behaviors !== null && this.placement.behaviors !== undefined) &&
      //   (this.placement.reasonForMove_PR !== null && this.placement.reasonForMove_PR !== undefined) &&
      //   (this.placement.notes !== null && this.placement.notes !== undefined) &&
      //   (this.placementDetail.procodeID !== null && this.placementDetail.procodeID !== undefined) &&
      //   (this.respite.payorID !== null && this.respite.payorID !== undefined)
      // ) {
      let reasonForMoveID = this.placementEdit.reasonForMoveID
        ? this.placementEdit.reasonForMoveID.reasonForMoveID
        : null;
      let providerID = this.placementEdit.providerID
        ? this.placementEdit.providerID.providerID
        : null;
      let placementReferralID = this.placementEdit.placementReferral
        ? this.placementEdit.placementReferral.PlacementReferralID
        : null;
      let initiatedByStaffID = this.placementEdit.initiatedByStaffID
        ? this.placementEdit.initiatedByStaffID.staffID
        : null;
      // placementDates

      if (this.placementEdit.placementID) {
        this.placementDates.referralID = this.REF_ID;
        this.placementDates.changedBy = "";
        this.placementDates.changedDate =
          this._localValues.stringFormatDatetime(this.currentDateAndTime);
        this.placementDates.referralDate = this.placementDates.referralDate
          ? this._localValues.stringFormatDatetime(
              new Date(this.placementDates.referralDate)
            )
          : null;
        this.placementDates.paymentEndDate = this.placementDates.paymentEndDate
          ? this._localValues.stringFormatDatetime(
              new Date(this.placementDates.paymentEndDate)
            )
          : null;
        this.placementDates.retractedDate = this.placementDates.retractedDate
          ? this._localValues.stringFormatDatetime(
              new Date(this.placementDates.retractedDate)
            )
          : null;
        this.placementDates.withDrawDate = this.placementDates.withDrawDate
          ? this._localValues.stringFormatDatetime(
              new Date(this.placementDates.withDrawDate)
            )
          : null;
        this.placementDates.closureDate = this.placementDates.closureDate
          ? this._localValues.stringFormatDatetime(
              new Date(this.placementDates.closureDate)
            )
          : null;
        this.placementDates.dualAdjBeginDate = this.placementDates
          .dualAdjBeginDate
          ? this._localValues.stringFormatDatetime(
              new Date(this.placementDates.dualAdjBeginDate)
            )
          : null;
        this.placementDates.dualAdjEndDate = this.placementDates.dualAdjEndDate
          ? this._localValues.stringFormatDatetime(
              new Date(this.placementDates.dualAdjEndDate)
            )
          : null;
        this.placementDates.dCFPlanEndDate = this.placementDates.dCFPlanEndDate
          ? this._localValues.stringFormatDatetime(
              new Date(this.placementDates.dCFPlanEndDate)
            )
          : null;
        this.placementDates.dCFBeginDate = this.placementDates.dCFBeginDate
          ? this._localValues.stringFormatDatetime(
              new Date(this.placementDates.dCFBeginDate)
            )
          : null;
        this.placementDates.recidivistDate = this.placementDates.recidivistDate
          ? this._localValues.stringFormatDatetime(
              new Date(this.placementDates.recidivistDate)
            )
          : null;
        this.placementDates.recidivistDateOverride = this.placementDates
          .recidivistDateOverride
          ? this._localValues.stringFormatDatetime(
              new Date(this.placementDates.recidivistDateOverride)
            )
          : null;
        this.placementDates.releaseDate = this.placementDates.releaseDate
          ? this._localValues.stringFormatDatetime(
              new Date(this.placementDates.releaseDate)
            )
          : null;
        this.placementEdit["placementUpdate"] = {
          placementID: this.placementEdit.placementID,
          providerID: providerID,
          placementReferralID: placementReferralID,
          beginDate: this._localValues.stringFormatDatetime(
            Date.parse(req.beginDate)
          ),
          endDate: this._localValues.stringFormatDatetimeWithoutSeconds(
            Date.parse(req.endDate)
          ),
          behaviors: this.placementEdit.behaviors,
          reasonForMove_PR: this.placementEdit.reasonForMove_PR,
          initiatedByStaffID: initiatedByStaffID,
          changedBy: !isNullOrUndefined(localStorage.getItem("UserEmail"))
            ? localStorage.getItem("UserEmail").split("@")
            : "",
          changedDate: this._localValues.stringFormatDatetime(
            Date.parse(new Date().toDateString())
          ),
          notes: this.placementEdit.notes,
          referralID: this.REF_ID,
          reasonForMoveID: this.placementEdit.reasonForMoveID
            ? this.placementEdit.reasonForMoveID.reasonForMoveID
            : null,
        };
        req.beginDate = this._localValues.stringFormatDatetime(
          Date.parse(req.beginDate)
        );
        req.endDate = this._localValues.stringFormatDatetimeWithoutSeconds(
          Date.parse(req.endDate)
        );
        if (
          req.placementAuthorization &&
          req.placementAuthorization.length > 0
        ) {
          req.placementAuthorization[0].beginDate =
            this._localValues.stringFormatDatetime(
              Date.parse(req.placementAuthorization[0].beginDate)
            );
          req.placementAuthorization[0].enteredDate =
            this._localValues.stringFormatDatetime(
              Date.parse(req.placementAuthorization[0].enteredDate)
            );
          req.placementAuthorization[0].changedDate =
            this._localValues.stringFormatDatetime(
              Date.parse(req.placementAuthorization[0].changedDate)
            );
          // req.respiteAuthorization[0].beginDate = this._localValues.stringFormatDatetime(Date.parse(req.respiteAuthorization[0].beginDate));
          // req.respiteAuthorization[0].enteredDate = this._localValues.stringFormatDatetime(Date.parse(req.respiteAuthorization[0].enteredDate));
        } else {
          req.placementAuthorization = null;
        }

        req["referralID"].closureDate = this._localValues.stringFormatDatetime(
          Date.parse(this.placementDates.closureDate)
        );
        // req['referralDatesUpdate'] = {
        //   "referralID": parseInt(localStorage.getItem('referralId')) - this._openCard.getHasKey(),
        //   "referralDate": this.referralDates.referralDate,
        //   "closureDate": this._localValues.stringFormatDatetime(Date.parse(this.placementDates.closureDate)),
        //   paymentEndDate: '',
        //   retractedDate: '',
        //   withDrawDate: '',
        //   dualAdjBeginDate: '',
        //   dualAdjEndDate: '',
        //   dCFPlanEndDate: '',
        //   dCFBeginDate: '',
        // }
        let updateReq = {
          placementUpdate: this.placementEdit["placementUpdate"],
          referralDatesUpdate: this.placementDates,
        };
        this.placementEdit["referralDatesUpdate"] = this.placementDates;
        this._placement.updatePlacement(updateReq).then(async (data: any) => {
          if (data.responseStatus) {
            swal("Save", "Placement has been updated", "success");
            localStorage.setItem(
              "placementDetailId",
              data.placementDetailID.toString()
            );
            localStorage.setItem(
              "placementID",
              data.placement.placementID + this._openCard.getHasKey()
            );
            localStorage.setItem(
              "authorizationId",
              data.authorizationID + this._openCard.getHasKey()
            );

            this._placement.storeSavedPlacementID(this.PLACEMENT_ID);
            this._placement.storeSavedPlacementDetailID(
              this.PLACEMENT_DETAIL_ID
            );
            let PSAPrintrequest = {
              authorizationID:
                parseInt(localStorage.getItem("authorizationId")) -
                this._openCard.getHasKey(),
            };
            this._localValues.placementEventStatusValue =
              await this._openCard.getPSAPrintPreviewFormData(PSAPrintrequest);
            let placementAgreementRequest = {
              authorizationID:
                parseInt(localStorage.getItem("authorizationId")) -
                this._openCard.getHasKey(),
              elecSignPlacementAgreementID: null,
              void: 0,
              restartProcess: 0,
              staffID: parseInt(localStorage.getItem("UserId")) || 4620,
            };
            this._localValues.placementAgreementValue =
              await this._openCard.getPlacementAgreementPrintAckData(
                placementAgreementRequest
              );
            if (window.history.length > 0) {
              window.close();
            } else {
              this._router.navigate([], { queryParams: { sub: null } });
            }
            this._placementPrint.storeHistoryData();
            this.placementSiblingsSave();
          }
          this.getAcknowledgementDetails(data.authorizationID).then(
            (data: any) => {}
          );
          loader.style.display = "none";
          this._router.navigate(
            ["/reintegration/referral/opencard/placement/view"],
            {
              queryParams: { pauth_id: data.authorizationID },
              queryParamsHandling: "merge",
            }
          );
        });
      } else {
        if (this.dcfplanEndDate) {
          req.placementDetail["dcfplanEndDate"] =
            this._localValues.stringFormatDatetime(this.dcfplanEndDate);
        }

        this._placement.savePlacement(req).then(async (data: any) => {
          this.placement.beginDate = new Date(this.placement.beginDate);
          this.placementDetail.formReceivedDate = new Date(
            this.placementDetail.formReceivedDate
          );
          if (data.responseStatus) {
            swal("Save", "Placement has been created", "success");
            localStorage.setItem(
              "placementDetailId",
              data.placementDetailID.toString()
            );
            localStorage.setItem(
              "placementID",
              data.placementID + this._openCard.getHasKey()
            );
            let savedPlacementId = data.placementID;
            let savedPlacementDetailId = data.placementDetailID;
            this._placement.storeSavedPlacementID(savedPlacementId);
            this._placement.storeSavedPlacementDetailID(savedPlacementDetailId);
            this._placementPrint.storeHistoryData();
            this.placementSiblingsSave();
            localStorage.setItem(
              "authorizationId",
              data.authorizationID + this._openCard.getHasKey()
            );

            let isAuth =
              data.authorizationID !== undefined ||
              data.authorizationID !== null
                ? true
                : false;

            this._router.navigate([], {
              queryParams: {
                sub: "Placement",
                authorization: isAuth,
                p_id: data.placementID,
                pd_id: data.placementDetailID,
                pauth_id: data.authorizationID,
              },
              queryParamsHandling: "merge",
            });

            let PSAPrintrequest = {
              authorizationID:
                parseInt(localStorage.getItem("authorizationId")) -
                this._openCard.getHasKey(),
            };
            this._localValues.placementEventStatusValue =
              await this._openCard.getPSAPrintPreviewFormData(PSAPrintrequest);

            let placementAgreementRequest = {
              authorizationID:
                parseInt(localStorage.getItem("authorizationId")) -
                this._openCard.getHasKey(),
              elecSignPlacementAgreementID: null,
              void: 0,
              restartProcess: 0,
              staffID: parseInt(localStorage.getItem("UserId")) || 4620,
            };
            this._localValues.placementAgreementValue =
              await this._openCard.getPlacementAgreementPrintAckData(
                placementAgreementRequest
              );

            await this.saveAttendingSchoolForPlacement();

            loader.style.display = "none";
            this.getAcknowledgementDetails(data.authorizationID).then(
              (data: any) => {}
            );
            // this.ackOptionsComponent.getClientSchool();
          } else {
            loader.style.display = "none";
            swal("Info", `${data.responseMessage}`, "info");
            let payorName = {
              payorName:
                "Saint Francis Reintegration - West Region - RFCA Region 3",
              payorID: 142,
            };
            this.auth.payorAuthorizationID = payorName;
            this.respite.payorID = payorName;
            // this.getAcknowledgementDetails(
            //   data.authorizationID
            // ).then((data: any) => {});
          }

          // this._router.navigate(['/reintegration/referral/opencard/placement/view'], { queryParamsHandling: 'preserve' })
        });
      }
    } else {
      swal("Info", "Please fill the mandatory fields", "info");
      loader.style.display = "none";
    }
  }

  /**Data for ackowledgement option window */
  async getAcknowledgementDetails(authID: any) {
    let referralBasedReq = {},
      authorizationReq = {},
      result: any;
    referralBasedReq = {
      referralID: this.REF_ID,
    };
    authorizationReq = { authorizationID: authID };
    await this._openCard
      .getCaseManagerList(authorizationReq)
      .then((data: any) => {
        this.caseManagerList = data.caseManagerList;
      });
    await this._openCard.getCaseManagerChangeReasonList().then((data: any) => {
      this.caseManagerChangeReasonList = data.changeReasonList;
    });
    if (authID) {
      await this._openCard.getJudgeList(authorizationReq).then((data: any) => {
        this.judgeList = data.judgeList;
      });
    }

    await this._openCard
      .placementAckClientSchoolDropdown(referralBasedReq)
      .then((data: any) => {
        this.schoolList = data;
      });
    await this._openCard.getAttendingSameSchoolReason().then((data: any) => {
      this.attendingHomeSchoolReasonList = data.schoolReasonList;
    });
    await this._openCard.getReasonLate().then((data: any) => {
      this.reasonLateList = data.reasonLateList;
    });
    this.placementDateValidationStatus.includes(false)
      ? window.open(
          window.location.origin +
            "/placement-date-validation/" +
            window.location.search,
          "_blank",
          "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
        )
      : (this.isAckOptions = true);
    return swal("Save", "Placement has been created", "success");
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (
      currentURL == "/reintegration/referral/opencard/placement/new" ||
      currentURL == "/reintegration/referral/opencard/placement/detail"
    ) {
      this.url = "/reports/attachment-document/rfc/placement";
    } else {
      this.url = "/reports/attachment-document/placement";
    }
    return this._router.navigate([this.url]);
  }

  formValidation() {
    this.placementForm = this._fb.group({
      beginDate: [null],
    });
    this.placement.beginDate = this._localValues.stringFormatDatetime(
      this._localValues.stringFormatDatetime(this.currentDateAndTime)
    );
  }

  getPlacementProcodes() {
    let req = {
      beginPagination: 1,
      endPagination: 100,
      referralTypeID: this.REF_TYPE_ID,
      beginDate: this.placement.beginDate,
      sort: {
        column: "procodeID",
        mode: "ASC",
      },
      value: "",
    };

    this._openCard.getPlacementProcodes(req).then((data: any) => {
      this.placementProcodeList = data.procodeList;
    });
  }

  async onFilteredPlacementProcode(event: any) {
    let request = {
      referralTypeID: this.REF_TYPE_ID,
      beginDate: this.placement.beginDate,
      beginPagination: 1,
      endPagination: 100,
      sort: {
        column: "procode",
        mode: "ASC",
      },
      value: event.query,
    };
    let response = await this._openCard.placementProcode(request);
    return (this.metaData = response.filter((item: any) => {
      return item.procode.toLowerCase().indexOf(event.query) !== -1;
    }));
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case "procode":
        obj = "procode";
        break;
      case "provider":
        // this.getProvider(event);
        obj = "provider";
        break;
      case "status":
        obj = "authorizationStatus";
        break;
      case "payor":
        obj = "payor";
        break;
      case "staff":
        obj = "staff";
        break;
      case "school":
        obj = "schoolName";
        break;
      case "change_reason":
        obj = "changeReason";
        break;
      case "expectionReason":
        obj = "authorizationExceptionReason";
        break;
      case "requestedBy":
        this.filteredRequestedType(event);
        break;
      case "sRSServiceCode":
        obj = "sRSServiceCode";
        break;
    }
    if (obj) {
      req = { Object: obj, value: event.query };
      this._caseTeam.getSearchList(req).then((data: any) => {
        data.dropDown.map((item: any) => {
          item[
            "procodeWithDesc"
          ] = `${item.procode} - ${item.categoryOfService}`;
          item["fullName"] = `${item.lastName}, ${item.firstName}`;
        });
        this.metaData = data.dropDown;
      });
    }
  }

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
  }

  viewSchoolData(aloneData, id) {
    this.school_data = aloneData;
    this.school_IndexId = id;
    this.school_IndexStatus = true;
  }
  deleteSchoolDet(id) {
    this.school_list.splice(id, 1);
  }

  /** Start : Siblings line item functionality */
  sibis_list = [];
  async addSibisData() {
    if (this.sibs_data.placementSiblingsID) {
      let request = {
        placementSiblingsID: this.sibs_data.placementSiblingsID,
        placementID: this.PLACEMENT_ID,
        placementDetailID: this.PLACEMENT_DETAIL_ID,
        clientID: this.sibs_data.client_id,
        effectiveDate: !isNullOrUndefined(this.sibs_data.eff_date)
          ? this._localValues.stringFormatDatetime(
              Date.parse(this.sibs_data.eff_date)
            )
          : null,
        add: this.sibs_data.adds,
        remove: this.sibs_data.remove,
      };
      let response = await this._openCard.updatePlacementSiblings(request);
      swal("Updated!", "", "success");
      this.sibs_data = {
        name: "",
        dob: "",
        client_id: "",
        eff_date: "",
        adds: "",
        remove: "",
      };
      this.getPlacementSiblingsList();
      this.sibs_IndexStatus = false;
    } else {
      if (
        (this.sibs_data.adds !== "" && this.sibs_data.adds !== false) ||
        (this.sibs_data.remove !== "" && this.sibs_data.remove !== false)
      ) {
        if (this.sibs_IndexStatus) {
          this.sibis_list[this.sibs_IndexId] = this.sibs_data;
          this.sibs_data = {
            name: "",
            dob: "",
            client_id: "",
            eff_date: "",
            adds: "",
            remove: "",
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
            remove: "",
          };
        }
      } else {
        swal(
          "Please check any one of check box 'Adds' or 'Removes!'",
          "",
          "warning"
        );
      }
    }
  }

  viewSibisData(aloneData, id) {
    this.sibs_data = aloneData;
    this.isSection7EditFormOpen = true;
    this.sibs_IndexId = id;
    this.sibs_IndexStatus = true;
  }

  async deleteSibsDet(id, alone?: any) {
    if (alone !== undefined) {
      let request = { placementSiblingsID: alone.placementSiblingsID };
      await this._openCard.deletePlacementSiblings(request);
      swal("Deleted!", "", "info");
      this.getSiblingsPlacementSibling();
    } else {
      this.sibis_list.splice(id, 1);
    }
  }
  dcfCustody() {
    this.dcfDisable = !this.dcfDisable;
  }
  jjaStatus() {
    this.jjaDisable = !this.jjaDisable;
  }
  valueChangeStatus() {
    this.valueDisable = !this.valueDisable;
  }
  /** End: Siblings line item functionality */

  /** Dropdown values form the masters*/
  getMasterDetails() {
    let req: any,
      referralID = this.REF_ID,
      beginDate = this.placement.beginDate;
    req = { referralID };
    beginDate = { beginDate };

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
    });
  }

  /**
   * @param source - begin date
   */
  beginDateBasedMasters(source: any) {
    let req = {
      beginDate: this._localValues.stringFormatDatetime(Date.parse(source)),
    };
    this._placement.getReasonForMove(req).then((data: any) => {
      this.reasonForMoves = data.reasonForMove;
    });
    this._placement.getReasonForChange(req).then((data: any) => {
      this.reasonForChanges = data.reasonForChange;
    });
    // if (
    //   this.placement.beginDate !== null &&
    //   this.placement.beginDate !== undefined
    // ) {
    //   this.placement.beginDate.setHours(0);
    //   this.placement.beginDate.setMinutes(0);
    //   this.placement.beginDate.setSeconds(0);
    // }

    if (
      this.placement.beginDate &&
      this.placement.beginDate.getHours() === 12 &&
      this.placement.beginDate.getMinutes() === 0 &&
      this.placement.beginDate.getSeconds() === 0
    ) {
      this.placement.beginDate.setHours(0);
      this.placement.beginDate.setMinutes(0);
      this.placement.beginDate.setSeconds(0);
    }
    this.placement.providerID = null;
    this.placementDetail.procodeID = null;
    this.autoFetchPaymentEndDate(this.placement.beginDate);
  }

  /** Start: Dropdowns complete method */

  filteredReferrals(event: any) {
    this.filteredPlacementReferrals = [];
    this.placementReferrals.filter((item: any) => {
      if (
        item.StatusType.toLowerCase().indexOf(event.query.toLowerCase()) !== -1
      ) {
        item["prBeginDate"] = this.getConvertedDate(item.PRBeginDate);
        this.filteredPlacementReferrals.push(item);
      }
    });
  }

  filteredMoves(event: any) {
    this.filteredReasonForMoves = [];
    this.reasonForMoves.filter((item: any) => {
      if (item.reasonForMove.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredReasonForMoves.push(item);
      }
    });
  }

  filteredChanges(event: any) {
    this.filteredReasonForChanges = [];
    this.reasonForChanges.filter((item: any) => {
      if (item.ReasonForMove.indexOf(event.query) !== -1) {
        this.filteredReasonForChanges.push(item);
      }
    });
  }

  filteredNotPlacedTogether(event: any) {
    this.filteredReasonForNotPlacedTogether = [];
    this.reasonForNotPlacedTogether.filter((item: any) => {
      if (item.siblingReason.indexOf(event.query) !== -1) {
        this.filteredReasonForNotPlacedTogether.push(item);
      }
    });
  }

  filterddisruptionTypes(event: any) {
    this.filtereddisruptionTypes = [];
    this.disruptionTypes.filter((item: any) => {
      if (item.DisruptionType.indexOf(event.query) !== -1) {
        this.filtereddisruptionTypes.push(item);
      }
    });
  }

  filterddisruptionReasons(event: any) {
    this.filtereddisruptionReasons = [];
    this.disruptionReason.filter((item: any) => {
      if (item.DisruptionReason.indexOf(event.query) !== -1) {
        this.filtereddisruptionReasons.push(item);
      }
    });
  }

  filterdOverrideROC(event: any) {
    this.filteredOverrideROC = [];
    this.overrideROC.filter((item: any) => {
      if (item.DCFReleasedOfCustodyOverride.indexOf(event.query) !== -1) {
        this.filteredOverrideROC.push(item);
      }
    });
  }

  filterdOverridePED(event: any) {
    this.filteredOverridePED = [];
    this.overridePED.filter((item: any) => {
      if (item.PlanEndDateOverride.indexOf(event.query) !== -1) {
        this.filteredOverridePED.push(item);
      }
    });
  }

  filterdReleaseOfCustody(event: any) {
    this.filteredReleaseOfCustody = this.releaseOfcustody.filter(
      (item: any) => {
        return (
          item.DCFReleasedOfCustody.toLowerCase().indexOf(event.query) !== -1
        );
      }
    );
  }
  /** End: Dropdowns complete method */

  attendingSchoolFormValidation() {
    this.attendingSchoolForm = this._fb.group({
      clientSchoolID: [null],
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      schoolID: [null, Validators.compose([Validators.required])],
      enrolledBeginDate: [null],
      enrolledEndDate: [null],
      changeReasonID: [null, Validators.compose([Validators.required])],
      notes: [null],
      referralID: [null],
    });
  }
  /*** Start: Get Attending and home school record list */
  addAttendingSchoolRecord() {
    if (this.attendingSchoolForm.valid) {
      !isNullOrUndefined(this.attendingSchool.schoolID)
        ? (this.attendingSchool.schoolID =
            this.attendingSchool.schoolID.schoolID)
        : null;
      !isNullOrUndefined(this.attendingSchool.changeReasonID)
        ? (this.attendingSchool.changeReasonID =
            this.attendingSchool.changeReasonID.changeReasonID)
        : null;
      this.attendingSchool.referralID = this.REF_ID;
      this.attendingSchool.clientID = this.CLI_ID;
      if (this.attendingSchool.clientSchoolID) {
        this._openCard
          .updateAttendingSchool(this.attendingSchool)
          .then(async () => {
            swal("Upadate", "Record has been updated!", "success");
            await this.getAttendingSchoolList();
            this.isAttendingSchoolList = true;
          });
      } else {
        // this._openCard
        //   .saveAttendingSchool(this.attendingSchool)
        //   .then(async () => {
        //     await this.getAttendingSchoolList();
        //     this.isAttendingSchoolList = true;
        //   });
        swal("Save", "Record has been saved!", "success");
        this.newAttendingSchoolList.push(this.attendingSchool);
      }
      this.isAttendingSchool = false;
      this.isAttendingSchoolList = false;
    } else {
      return swal("Invalid", "Please fill the mandatory fields", "info");
    }
  }

  addHomeSchoolRecord() {
    this.homeSchoolComp.formAction(this.homeSchool);
    this.isHomeSchool = false;
    this.isHomeSchoolList = false;
    this.getHomeSchoolList();
  }

  getHomeSchoolList() {
    this.homeSchoolListHeaders = [];
    this.homeSchoolList = [];
    let req = {
      referralID: this.REF_ID,
      endPagination: 100,
      beginPagination: 1,
      sort: { column: "homeSchoolID", mode: "desc" },
    };
    this._openCard.listAllHomeschool(req).then((data: any) => {
      data.dataTypes.filter((item: any) => {
        this.homeSchoolListHeaders.push(item.COLUMN_NAME);
      });
      this.homeSchoolList = data.homeSchool;
    });
  }

  async getAttendingSchoolList() {
    this.attendingSchoolList = [];
    this.attendinSchoolListHeaders = [];
    let req = {
      referralID: this.REF_ID,
      endPagination: 100,
      beginPagination: 1,
      sort: { column: "clientSchoolID", mode: "desc" },
    };
    this._openCard.listAllAttendingSchool(req).then((data: any) => {
      data.dataTypes.filter((item: any) => {
        this.attendinSchoolListHeaders.push(item.COLUMN_NAME);
      });
      this.attendingSchoolList = data.clientSchool;
    });
  }

  /*** End: Get Attending and home school record list */

  homeSchoolValidation() {
    this.homeSchoolForm = this._fb.group({
      beginDate: [null],
      endDate: [null],
      schoolID: [null],
      changeReasonID: [null],
    });
  }

  getUTCDateStringFormate(timeStamp: any) {
    return this._localValues.getDateandTimeWithExt(timeStamp);
  }

  homeSchoolEditMode(selectedData: any) {
    this.isHomeSchool = true;
    let req = { homeSchoolID: selectedData.homeSchoolID };
    this._openCard.getByIdHomeschool(req).then((data: any) => {
      !isNullOrUndefined(data.homeSchool.beginDate)
        ? (data.homeSchool.beginDate =
            this._localValues.getUTCDateStringFormate(
              data.homeSchool.beginDate
            ))
        : null;
      !isNullOrUndefined(data.homeSchool.endDate)
        ? (data.homeSchool.endDate = this._localValues.getUTCDateStringFormate(
            data.homeSchool.endDate
          ))
        : null;
      this.homeSchoolBtnLabel = "Update";
      this.homeSchool = data.homeSchool;
    });
  }

  restWizards(wizard: string) {
    switch (wizard) {
      case "attendingSchool":
        this.attendingSchool = new AttendingSchool();
        break;
      case "homeSchool":
        this.homeSchool = new HomeSchool();
        break;
    }
  }

  schoolListViewWizardActions(wizard: string) {
    switch (wizard) {
      case "homeSchool":
        this.isHomeSchool = true;
        this.homeSchool = new HomeSchool();
        this.homeSchoolBtnLabel = "Save";
        this.isHomeSchoolList = false;
        break;
      case "attendingSchool":
        this.isAttendingSchool = true;
        this.attendingSchool = new AttendingSchool();
        this.autoFillAttendingSchoolDates();
        this.attendingSchoolBtnLabel = "Save";
        this.isAttendingSchoolList = false;
        break;
    }
  }

  attendingSchoolEditMode(selectedData: any) {
    this.isAttendingSchool = true;
    let req = { clientSchoolID: selectedData.clientSchoolID };
    this._openCard.getByRecAttendingSchool(req).then((data: any) => {
      !isNullOrUndefined(data.clientSchool.beginDate)
        ? (data.clientSchool.beginDate = new Date(data.clientSchool.beginDate))
        : null;
      !isNullOrUndefined(data.clientSchool.endDate)
        ? (data.clientSchool.endDate = new Date(data.clientSchool.endDate))
        : null;
      !isNullOrUndefined(data.clientSchool.enrolledBeginDate)
        ? (data.clientSchool.enrolledBeginDate = new Date(
            data.clientSchool.enrolledBeginDate
          ))
        : null;
      !isNullOrUndefined(data.clientSchool.enrolledEndDate)
        ? (data.clientSchool.enrolledEndDate = new Date(
            data.clientSchool.enrolledEndDate
          ))
        : null;
      this.attendingSchoolBtnLabel = "Update";
      this.attendingSchool = data.clientSchool;
      this.isAttendingSchoolList = false;
    });
  }

  async getPlacementRecordById() {
    let placementReferralReq = { referralID: this.REF_ID },
      placementAuthReq = { placementDetailID: this.currentPlacementDetailId },
      currentPlacementAuthID: number,
      loader = document.getElementById("loading-overlay") as HTMLElement;
    (this.placementReq = { placementID: this.PLACEMENT_ID }),
      (loader.style.display = "block");

    /** Get record from '/placement/getPlacement' API */
    await this._placement
      .getReferralDates(placementReferralReq)
      .then((data: any) => {
        /** Need to valid isActive key */
        this.placementEdit.referralDates = data.referralDates[0];
        this.placementDates = this.placementEdit.referralDates;
        this.placementDates.referralDate = !isNullOrUndefined(
          this.placementDates.referralDate
        )
          ? new Date(this.placementDates.referralDate)
          : null;
        this.placementDates.paymentEndDate = !isNullOrUndefined(
          this.placementDates.paymentEndDate
        )
          ? new Date(this.placementDates.paymentEndDate)
          : null;
        this.placementDates.retractedDate = !isNullOrUndefined(
          this.placementDates.retractedDate
        )
          ? new Date(this.placementDates.retractedDate)
          : null;
        this.placementDates.withDrawDate = !isNullOrUndefined(
          this.placementDates.withDrawDate
        )
          ? new Date(this.placementDates.withDrawDate)
          : null;
        this.placementDates.releaseDate = !isNullOrUndefined(
          this.placementDates.releaseDate
        )
          ? new Date(this.placementDates.releaseDate)
          : null;
        this.placementDates.closureDate = !isNullOrUndefined(
          this.placementDates.closureDate
        )
          ? new Date(this.placementDates.closureDate)
          : null;
        this.placementDates.dualAdj_BeginDate = !isNullOrUndefined(
          this.placementDates.dualAdj_BeginDate
        )
          ? new Date(this.placementDates.dualAdj_BeginDate)
          : null;
        this.placementDates.dualAdj_EndDate = !isNullOrUndefined(
          this.placementDates.dualAdj_EndDate
        )
          ? new Date(this.placementDates.dualAdj_EndDate)
          : null;
        this.placementDates.dCFPlanEndDate = !isNullOrUndefined(
          this.placementDates.dCFPlanEndDate
        )
          ? new Date(this.placementDates.dCFPlanEndDate)
          : null;
        this.placementDates.dCFBeginDate = !isNullOrUndefined(
          this.placementDates.dCFBeginDate
        )
          ? new Date(this.placementDates.dCFBeginDate)
          : null;
      })

      /** Get record form '/placement/getReferralDates' API */
      .then(() => {
        this._placement.getPlacement(this.placementReq).then((data: any) => {
          this._localValues.currentPlacementProviderID =
            data.placement && data.placement.providerID
              ? data.placement.providerID.providerID
              : null;
          this._localValues.currentPlacementProviderInfo = {
            providerID:
              data.placement && data.placement.providerID
                ? data.placement.providerID.providerID
                : null,
            providerName:
              data.placement && data.placement.providerID
                ? data.placement.providerID.providerName
                : null,
            paySponsor:
              data.placement && data.placement.providerID
                ? data.placement.providerID.paySponsor
                : null,
            providerLocationID:
              data.placement && data.placement.providerID
                ? data.placement.providerID.providerLocationID
                : null,
          };

          if (data.disruptionDetails) {
            this._localValues.currentPlacementDisruptionID =
              data.disruptionDetails.disruptionID;
          }
          this._placement.setPlacementInfo(data);
          this.placementEdit.providerID = data.placement.providerID;
          this.placementEdit = data.placement;
          this.placementEdit.beginDate = !isNullOrUndefined(
            this.placementEdit.beginDate
          )
            ? new Date(this.placementEdit.beginDate)
            : null;
          this.placementEdit.endDate = !isNullOrUndefined(
            this.placementEdit.endDate
          )
            ? new Date(this.placementEdit.endDate)
            : null;
          !isNullOrUndefined(data.placement.initiatedByStaffID)
            ? (this.placementEdit.initiatedByStaffID[
                "fullName"
              ] = `${data.placement.initiatedByStaffID.lastName},${data.placement.initiatedByStaffID.firstName}`)
            : null;
          // this.placementEdit.initiatedByStaffID = { fullName: `${data.placement.initiatedByStaffID.lastName},${data.placement.initiatedByStaffID.firstName}` } : null;

          this.beginDateBasedMasters(this.placementEdit.beginDate);
        });
      });

    /** Get record form '/placement/getReferralDates' API */

    await this._placement.getPlacement(this.placementReq).then((data: any) => {
      this.getSiblingsPlacementSibling();
      // this.isGetPlacementApiCalled = true;

      this._placement.setPlacementInfo(data);
      this.placementEdit.providerID = data.placement.providerID;
      localStorage.setItem(
        "providerID",
        this.placementEdit.providerID.providerID + this._openCard.getHasKey()
      );

      this.placementEdit = data.placement;
      this.placementEdit.beginDate = !isNullOrUndefined(
        this.placementEdit.beginDate
      )
        ? new Date(this.placementEdit.beginDate)
        : null;
      this.placementEdit.endDate = !isNullOrUndefined(
        this.placementEdit.endDate
      )
        ? new Date(this.placementEdit.endDate)
        : null;
      !isNullOrUndefined(data.placement.initiatedByStaffID)
        ? (this.placementEdit.initiatedByStaffID[
            "fullName"
          ] = `${data.placement.initiatedByStaffID.lastName},${data.placement.initiatedByStaffID.firstName}`)
        : null;

      // this.beginDateBasedMasters(this.placementEdit.beginDate)
    });

    /** Get record from '/placement/getReminder' API */

    await this._placement.getRemainder(this.placementReq).then((data: any) => {
      this.placementEdit.reminderNote = data.reminder[0].ReminderNotes;
    });

    /** Get record from '/placement/getRespiteAuthorization' API  */

    await this._placement
      .getRespiteAuthorization(this.placementReq)
      .then((data: any) => {
        this.placementEdit.respiteAuthorization = data.respiteAuthorization;
      });

    /** Get record from '/placement/getPlacementAuthorization' API */

    await this._placement
      .getPlacementAuthorization(placementAuthReq)
      .then(async (data: any) => {
        this.placementEdit.placementAuthorization = data.placementAuthorization;
      });

    /** Get record from '' API */

    if (currentPlacementAuthID) {
      await this._placement
        .getPlacementClaim({ authorizationID: currentPlacementAuthID })
        .then((data: any) => {
          this.placementEdit.placementClaims = data.placementClaim;
        });
    }

    if (this.placementEdit.behaviors == "null") {
      this.placementEdit.behaviors = "";
    }
    this.isEdit = true;
    // this.isReferralDateFieldsDiabled = true;
    this.editForm.disable();
    // if (localStorage.getItem("authorizationId")) {
    //   let PSAPrintrequest = {
    //     authorizationID:
    //       parseInt(localStorage.getItem("authorizationId")) -
    //       this._openCard.getHasKey(),
    //   };
    //   this._localValues.placementEventStatusValue = await this._openCard.getPSAPrintPreviewFormData(
    //     PSAPrintrequest
    //   );
    //   let placementAgreementRequest = {
    //     authorizationID:
    //       parseInt(localStorage.getItem("authorizationId")) -
    //       this._openCard.getHasKey(),
    //     elecSignPlacementAgreementID: null,
    //     void: 0,
    //     restartProcess: 0,
    //     staffID: parseInt(localStorage.getItem("UserId")) || 4620,
    //   };
    //   this._localValues.placementAgreementValue = await this._openCard.getPlacementAgreementPrintAckData(
    //     placementAgreementRequest
    //   );
    // }
    this.autoFetchPaymentEndDate(
      this.placementEdit.beginDate,
      this.placementDetail.procodeID
    );
    loader.style.display = "none";
    this.isPlacementCreateForm = false;
  }

  defineEditTabs() {
    return (this.editTabs = [
      { label: "Notes", href: "#nav-edit1" },
      { label: "Referral Dates", href: "#nav-edit2" },
      { label: "Reminder", href: "#nav-edit3" },
      { label: "Respite Authorization", href: "#nav-edit4" },
      { label: "Sibs at Home ", href: "#nav-edit5" },
    ]);
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
      reminderNote: [null],
    });
  }

  editReleaseMode() {
    this.isEdit = false;
    this.editForm.enable();
  }

  getMoveEvents() {
    let req = {
      referralID: this.REF_ID,
      unassignedOnly: true,
    };
    this._placement.getMoveEvent(req).then((data: any) => {
      this.moveEvents = data.moveEvent;
    });
  }

  filteredMoveEvents(event: any) {
    this.filteredMoveEventsData = [];
    this.moveEvents.map((item: any) => {
      this.filteredMoveEventsData.push(item);
    });
  }

  /** Get the referral dates wizard data in save mode */

  getReferralDates() {
    let referralDateReq = {
      referralID: this.REF_ID,
    };
    this._placement.getReferralDates(referralDateReq).then((data: any) => {
      !isNullOrUndefined(data.referralDates[0].referralDate)
        ? (data.referralDates[0].referralDate = new Date(
            data.referralDates[0].referralDate
          ))
        : null;
      !isNullOrUndefined(data.referralDates[0].paymentEndDate)
        ? (data.referralDates[0].paymentEndDate = new Date(
            data.referralDates[0].paymentEndDate
          ))
        : null;
      !isNullOrUndefined(data.referralDates[0].retractedDate)
        ? (data.referralDates[0].retractedDate = new Date(
            data.referralDates[0].retractedDate
          ))
        : null;
      !isNullOrUndefined(data.referralDates[0].withDrawDate)
        ? (data.referralDates[0].withDrawDate = new Date(
            data.referralDates[0].withDrawDate
          ))
        : null;
      !isNullOrUndefined(data.referralDates[0].releaseDate)
        ? (data.referralDates[0].releaseDate = new Date(
            data.referralDates[0].releaseDate
          ))
        : null;
      !isNullOrUndefined(data.referralDates[0].closureDate)
        ? (data.referralDates[0].closureDate = new Date(
            data.referralDates[0].closureDate
          ))
        : null;
      !isNullOrUndefined(data.referralDates[0].dualAdj_BeginDate)
        ? (data.referralDates[0].dualAdj_BeginDate = new Date(
            data.referralDates[0].dualAdj_BeginDate
          ))
        : null;
      !isNullOrUndefined(data.referralDates[0].dualAdj_EndDate)
        ? (data.referralDates[0].dualAdj_EndDate = new Date(
            data.referralDates[0].dualAdj_EndDate
          ))
        : null;
      !isNullOrUndefined(data.referralDates[0].dCFPlanEndDate)
        ? (data.referralDates[0].dCFPlanEndDate = new Date(
            data.referralDates[0].dCFBeginDate
          ))
        : null;
      !isNullOrUndefined(data.referralDates[0].dCFBeginDate)
        ? (data.referralDates[0].dCFBeginDate = new Date(
            data.referralDates[0].dCFBeginDate
          ))
        : null;
      !isNullOrUndefined(data.referralDates[0].recidivistDate)
        ? (data.referralDates[0].recidivistDate = new Date(
            data.referralDates[0].recidivistDate
          ))
        : null;
      !isNullOrUndefined(data.referralDates[0].recidivistDateOverride)
        ? (data.referralDates[0].recidivistDateOverride = new Date(
            data.referralDates[0].recidivistDateOverride
          ))
        : null;
      this.referralDates = data.referralDates[0];
    });
  }

  onChangeExceptionRateAutofecth() {
    this.authException.exceptionPayorRate =
      this.authException.originalPayorRate;
    this.authException.exceptionProviderRate =
      this.authException.originalProviderRate;
  }

  async getPreviousPlacementProviderName() {
    let placementID: any;
    if (this._router.url.includes("/new")) {
      placementID = 0;
    } else {
      placementID = this.PLACEMENT_ID;
    }
    let req = {
      referralID: this.currentReferralId,
      placementID: placementID,
      beginDate: this.placement.beginDate,
      referralTypeID: this.REF_TYPE_ID,
    };
    this._openCard.getPreviousPlacementProvider(req).then((data: any) => {
      if (data.responseStatus) {
        this.previousPlacementProviderName =
          data.previousPlacementProvider.length > 0
            ? data.previousPlacementProvider[0].providerName
            : "No information provided!";
        this.disruption.providerID = data.dropDown;
      }
    });
  }

  disruptionFormValidation() {
    this.disruptionForm = this._fb.group({
      otherOptOffered: [null],
      disruptionReasonID: [null],
      disruptionTypeID: [null],
      providerID: [null],
      requestedByStaff: [null],
      placementbehaviourUpdate: [null],
      requestedByType: [null],
      requestedByProvider: [null],
    });
  }

  onChangeDisruption(event: any) {
    if (event) {
      this.disruptionForm.enable();
      this.isDisruptionEnable = true;
      this.getPreviousPlacementProviderName();
    } else {
      this.disruptionForm.disable();
      this.disruptionForm.reset();
      this.isDisruptionEnable = false;
    }
  }

  getProvider(event: any) {
    this.metaData = [];
    const req = {
      value: event.query,
      beginDate: this._localValues.stringFormatDatetime(
        this.currentDateAndTime
      ),
      referralTypeID: this.currentReferralTypeID,
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "providerName", mode: "asc" },
    };
    this._openCard.getProviderListWithSponsor(req).then((data: any) => {
      data.providerList.filter((item: any) => {
        if (item.providerName.toLowerCase().indexOf(event.query) !== -1) {
          return this.metaData.push(item);
        }
      });
    });
  }

  onProviderSelect(event: any) {
    this.auth.sponsorID = event.sponsorID;
    this.selectedProviderLocationID = event.providerLocationID;
    event.PaySponsor
      ? (this.auth.paySponsor = true)
      : (this.auth.paySponsor = false);
  }

  onReasonForMoveSelect(event: any) {
    this.placement.reasonForMove_PR = event.reasonForMove;
  }

  filteredRequestedType(event: any) {
    this.metaData = [];
    this.metaData = this.requestedByType.filter((item: any) => {
      return item.value.indexOf(event.query) !== -1;
    });
  }

  onSelectRequestedBy(event: any) {
    event.value === "provider"
      ? (this.isRequestedByProviderEnable = true)
      : (this.isRequestedByProviderEnable = false);
  }

  onKeyupBhaviourAtPreviousPlacement(event: any) {
    this.placement.behaviors = this.placementbehaviourUpdate.behavior;
    this.placementbehaviourUpdate.behavior = this.placement.behaviors;
  }

  onOpenCardClick(node) {
    switch (node) {
      case "AUTHORIZATION":
        this._router.navigate([
          "/reintegration/referral/opencard/placement-event-authorization/new",
        ]);
        break;

      case "PLACEMENT_EVENT":
        this._router.navigate(
          ["/reintegration/referral/opencard/placement/placementEvent/view"],
          {
            queryParams: {
              p_id: this.currentPlacementId,
              pd_id: this.currentPlacementDetailId,
            },
            queryParamsHandling: "merge",
          }
        );
        break;

      case "LIVING_ARRANGEMENT":
        this._router.navigate(
          [
            "/reintegration/referral/opencard/placement/living-arrangement/view",
          ],
          {
            queryParams: {
              p_id: this.currentPlacementId,
              pd_id: this.currentPlacementDetailId,
            },
            queryParamsHandling: "merge",
          }
        );
        break;

      case "DAYCAR_AUTHORIZATION":
        this._router.navigate(
          [
            "/reintegration/referral/opencard/placement/daycare-authorization/view",
          ],
          {
            queryParams: {
              p_id: this.currentPlacementId,
              pd_id: this.currentPlacementDetailId,
            },
            queryParamsHandling: "merge",
          }
        );
        break;

      case "PLACEMENT_PLAN":
        this._router.navigate(
          ["/reintegration/referral/opencard/placement/placementPlan/view"],
          {
            queryParams: {
              p_id: this.currentPlacementId,
              pd_id: this.currentPlacementDetailId,
            },
            queryParamsHandling: "merge",
          }
        );
        break;
    }
  }

  disableAck() {
    this.isAckOptions = false;
  }

  getPlacementEventList() {
    let placementReq = {
      placementID: this.currentPlacementId,
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "placementDetailID", mode: "desc" },
    };

    this._openCard.getPlacementEventList(placementReq).then((data: any) => {
      this.placementEventList = data.placementDetailList || null;
    });
  }

  getConvertedDate(dateInput: number) {
    return this._localValues.getUTCFormDate(dateInput);
  }

  getSubnodeCounts() {
    let placementEventReq,
      livingArrangementReq,
      placementPlanReq,
      daycareAuthReq;

    placementEventReq = {
      placementID: this.currentPlacementId,
      beginPagination: 1,
      endPagination: 100,
    };
    livingArrangementReq = {
      placementID: this.currentPlacementId,
      beginPagination: 1,
      endPagination: 100,
    };
    placementPlanReq = {
      placementID: this.currentPlacementId,
      beginPagination: 1,
      endPagination: 100,
    };
    daycareAuthReq = {
      placementID: this.currentPlacementId,
      beginPagination: 1,
      endPagination: 100,
    };

    this._openCard
      .getPlacementEventList(placementEventReq)
      .then((data: any) => {
        this.placementEventCount = data.totalCount;
      });

    this._openCard
      .getLivingArrangementList(livingArrangementReq)
      .then((data: any) => {
        this.livingArrangementCount = data.totalCount;
      });

    this._openCard.getPlacementPlanList(placementPlanReq).then((data: any) => {
      this.placementPlanCount = data.totalCount;
    });

    this._openCard
      .listDayCareAuthorizations(daycareAuthReq)
      .then((data: any) => {
        this.daycareAuthorizationCount = data.totalCount;
      });
  }

  onAuthorizationUnitsChanged() {
    this.newAuthEndDate = new Date(
      Date.parse(this.placement.beginDate) +
        this.auth.unitsAuth * this._localValues.timeStampValueForDay
    );
    this.auth.endDate = this.newAuthEndDate;
    this.auth.unitsAuth = this.auth.unitsAuth.toFixed(2);
  }

  onClickJumptoProvider() {
    // localStorage.setItem('providerID', this.placementEdit.providerID.ProviderID + this._openCard.getHasKey());
    // return this._router.navigate(['/reports/provider/detail']);
    return this._router.navigate(["/reports/provider/detail"], {
      queryParams: { placementID: this.currentPlacementId },
    });
  }

  getClientSchoolList(event: any, label: any) {
    this.metaData = [];
    this.clientSchoolPlacementsDropdown.map((item) => {
      this.metaData.push(item);
    });
  }

  async listPlacements() {
    let req = {
      endPagination: 100,
      beginPagination: 1,
      referralID: this.REF_ID,
      sort: {
        column: "placementID",
        mode: "desc",
      },
    };
    await this._openCard.listOfPlacements(req).then((data: any) => {
      this.placementList = data;
    });
  }

  getPlacementDropdown() {
    this.metaData = [];
    this.placementList["placementList"].map((item) => {
      let value = {
        placement: item.providerName,
        placementID: item.placementID,
      };
      this.metaData.push(value);
    });
  }

  addSchool(event, i, type) {
    switch (type) {
      case "fromSchool":
        this.clientSchoolPlacements.map((data, index) => {
          if (index == i) {
            this.clientSchoolPlacementsData[index]["from_SchoolID"] =
              event.from_SchoolID;
            this.clientSchoolPlacementsData[index]["clientSchoolPlacementID"] =
              event.clientSchoolPlacementID;
          }
        });

        break;

      case "placement":
        this.clientSchoolPlacements.map((data, index) => {
          if (index == i) {
            this.clientSchoolPlacementsData[index]["placement"] =
              event.placement;
            this.clientSchoolPlacementsData[index]["placementID"] =
              event.placementID || 0;
          }
        });

        break;
    }
  }

  updatePlacementSchool() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";

    this.getData().then((data) => {
      loader.style.display = "none";
    });
  }

  async getData() {
    return Promise.all(
      this.clientSchoolPlacements.map((item, index) =>
        this.updatePlacementSchoolApiCall(item, index)
      )
    );
  }

  updatePlacementSchoolApiCall(item, index) {
    let req = {
      clientSchoolPlacementID:
        this.clientSchoolPlacementsData[index].clientSchoolPlacementID,
      from_ClientSchoolID: this.clientSchoolPlacementsData[index].from_SchoolID,
      to_ClientSchoolID: this.clientSchoolPlacementsData[index].to_SchoolID,
      placementID: this.clientSchoolPlacementsInfo[index].placementID,
      dateOfChange: this.clientSchoolPlacements[index].dateOfChange,
    };

    return this._openCard.updatePlacementSchool(req);
  }

  onMoveFormSelect(event) {
    this.isMoveFormSelected = true;
  }

  // async hasSiblingsInoutHomeValidation() {
  //   let request = {
  //     clientID: parseInt(localStorage.getItem('clientId')) - this._openCard.getHasKey(),
  //     referralID: parseInt(localStorage.getItem('referralId')) - this._openCard.getHasKey(),
  //     beginDate: this._localValues.stringFormatDatetime(new Date().getTime())
  //   }
  //   let response: number = await this._openCard.checkPlacementSiblings(request);
  //   if (response > 0) {
  //     return this.placementDetail.isSibOOH = true;
  //   } else {
  //     return this.placementDetail.isSibOOH = false;
  //   }
  // }

  async generateUnitRate(event?: any) {
    this.onSelectProcodeValidation(event);

    if (!event.requireSRSServiceCode) {
      this.isDCFServiceCodeDisabled = true;
    } else {
      this.isDCFServiceCodeDisabled = false;
    }
    this.placement.procodeID = !isNullOrUndefined(event.procodeID)
      ? event.procodeID
      : this.placement.procodeID;
    let request = {
      procodeID: this.placement.procodeID,
      isPlacement: true,
      referralTypeID: this.REF_TYPE_ID,
      beginDate: this.placement.beginDate,
      endDate: this.placement.endDate,
    };
    return (this.auth.unitsAuth = await this._openCard.getDefaultUnitsByProcode(
      request
    ));
  }

  async checkHasSiblinginOOHPlacement() {
    let response: any;
    let request = {
      referralID: this.REF_ID,
      clientID: this.CLI_ID,
      beginDate: this.placement.beginDate,
    };
    response = await this._openCard.placementHasSiblinginOOHPlacement(request);
    if (response.NUM_OOH > 0 && response.NUM_OOH !== null) {
      return (this.placementDetail.isSibOOH = true);
    } else {
      return (this.placementDetail.isSibOOH = false);
    }
  }

  async filterPlacemetProviders(event: any) {
    let request = {
      beginDate: this.placement.beginDate || this.placementEdit.beginDate,
      referralTypeID: this.REF_TYPE_ID,
      beginPagination: 1,
      endPagination: 100,
      value: event.query,
    };
    let response = await this._openCard.placementProviders(request);
    return (this.metaData = response.filter((provider: any) => {
      return provider.providerName.toLowerCase().indexOf(event.query) !== -1;
    }));
  }

  unitsPerMonthValue() {
    let referralId = this.REF_TYPE_ID;
    if (referralId === 12) {
      return (this.respite.unitsPerMonth = 1);
    } else {
      return (this.respite.unitsPerMonth = 2);
    }
  }

  async getPlacementPrintFormsDocId(
    placementID: number,
    placementDetailID: number
  ) {
    let request = {
      placementID: !isNaN(this.currentPlacementId)
        ? this.currentPlacementId
        : placementID,
      referralID: this.REF_ID,
      clientID: this.CLI_ID,
      placementDetailID: !isNaN(this.currentPlacementDetailId)
        ? this.currentPlacementDetailId
        : placementDetailID,
      staffID: parseInt(localStorage.getItem("UserId")) || 4620,
    };
    let response = await this._openCard.getAllPlacementPrintForms(request);
    localStorage.setItem("esignPdFDocID", response.placementAgreement.pdfDocID);
    this._localValues.continuumofCareFlowChartDocID =
      response.ContinuumofCareFlowChart.pdfDocId;
    this._localValues.placementAgreementKinshipDocID =
      response.PlacementAgreementKinship.pdfDocId;
    this._localValues.placementAgreementKinshipAndAgencyApprovedDocID =
      response.PlacementAgreementKinshipAndAgencyApproved.pdfDocId;
    this._localValues.placementEventStatusDocID =
      response.PlacementEventStatus.pdfDocId;
    this._localValues.referralNotificationOfMovePlacementChangeDocID =
      response.ReferralNotificationOfMovePlacementChange.pdfDocId;
    // this._localValues.referralNotificationOfMovePlacementChangeVoidDocID = response.ReferralNotificationOfMovePlacementChangeVoid.pdfDocId;
    this._localValues.loadProviderEnvelopeDocID =
      response.loadProviderEnvelope.pdfDocId;
    this._localValues.providerServiceAgreementDocID =
      response.ProviderServiceAgreement.pdfDocId;
  }

  onClickEditPlacementEvent(event: any) {
    this.isPlacementEvent = true;
    this.placementEventComponent.isPopup = true;
    this.placementEventComponent.isAttachmentRequired = true;
    this.placementEventComponent.isDetailsPage = true;
    this.placementEventComponent.isPlacementCreateForm = false;
    this.placementEventComponent.editFormValidation();
    this.placementEventComponent.defineEditTabs();
    this.placementEventComponent.currentPlacementDetailId =
      event.placementDetailID;
    return this.placementEventComponent.getPlacementRecordById();
  }

  onClickProvider(selectedDCFField: string) {
    this.selectedProviderDropdownField = selectedDCFField;
    return (this.isProviderCreation = true);
  }

  onProviderOut(event: any) {
    //   this.isProviderCreation = false;
    //   let providerReq = { providerID: event.providerId };
    //   this._openCard.getByIdProvider(providerReq).then((data: any) => {
    //     this.placement.providerID = {
    //       ProviderName: data.Provider.providerName,
    //       ProviderID: data.Provider.providerID,
    //     };
    //   });
  }

  providerFormStatus(event: any) {
    if (event.isFormResponse) {
      this.isProviderCreation = false;
      if (this.selectedProviderDropdownField === "dcfLiaison") {
        (event.data.providerID.providerName["providerName"] =
          event.data.providerID.providerName.providerName),
          (this.placement.providerID = {
            providerID: event.data.providerID.ProviderID,
            providerName: event.data.providerID.providerName.providerName,
          });
      }
    }
  }

  onPlacementEventEditOut(event: any) {
    this.isPlacementEvent = false;
    this.getPlacementEventList();
  }

  async onPlacementEventEndDateClear() {
    let request = {
      procodeID: this.placement.procodeID,
      isPlacement: true,
      referralTypeID: this.REF_TYPE_ID,
      beginDate: this.placement.beginDate,
      endDate: null,
    };
    return (this.auth.unitsAuth = await this._openCard.getDefaultUnitsByProcode(
      request
    ));
  }

  async saveAttendingSchoolForPlacement() {
    let clientSchoolsObj = [];
    this.newAttendingSchoolList.filter((item: any) => {
      let schoolObj = {
        beginDate: !isNullOrUndefined(item.beginDate)
          ? this._localValues.stringFormatDatetime(item.beginDate)
          : null,
        endDate: !isNullOrUndefined(item.endDate)
          ? this._localValues.stringFormatDatetime(item.endDate)
          : null,
        schoolID: item.schoolID,
        enrolledBeginDate: !isNullOrUndefined(item.beginDate)
          ? this._localValues.stringFormatDatetime(item.enrolledBeginDate)
          : null,
        enrolledEndDate: !isNullOrUndefined(item.enrolledEndDate)
          ? this._localValues.stringFormatDatetime(item.enrolledEndDate)
          : null,
        changeReasonID: item.changeReasonID,
        clientSchoolID: item.clientSchoolID,
        notes: item.notes,
      };
      clientSchoolsObj.push(schoolObj);
    });
    let clientSchoolReq = {
      clientSchools: clientSchoolsObj,
      referralID: this.REF_ID,
      clientID: this.CLI_ID,
      placementID: this.PLACEMENT_ID,
      dateOfChange: this._localValues.stringFormatDatetime(
        new Date().getTime()
      ),
    };
    let response = await this._openCard.savePlacementClientSchool(
      clientSchoolReq
    );
    swal("Info", response, "info");
  }

  onSelectRespiteAuthBeginDate(event: any) {
    this.respite.beginDate.setHours(0);
    this.respite.beginDate.setMinutes(0);
    this.respite.beginDate.setSeconds(0);
  }

  onTypePlacementBeginDate() {
    this.placement.beginDate.setHours(0);
    this.placement.beginDate.setMinutes(0);
    this.placement.beginDate.setSeconds(0);
    this.autoFetchPaymentEndDate(this.placement.beginDate);
  }

  onTypeRespiteBeginDate() {
    this.respite.beginDate.setHours(0);
    this.respite.beginDate.setMinutes(0);
    this.respite.beginDate.setSeconds(0);
  }

  async getNotificationTypeStaffDropDownData(event: any) {
    let request = { stateID: 34, value: event.query };
    let response = await this._openCard.getStaffByStateID(request);
    if (event.query !== "") {
      this.metaData = response;
    } else {
      return (this.metaData = response.filter((item: any) => {
        return item.StaffName.toLowerCase().indexOf(event.query) !== -1;
      }));
    }
  }

  async getPlacementSiblingsList() {
    let request = {
      referralID: this.REF_ID,
      clientID: this.CLI_ID,
    };
    this.placementSiblingsList = await this._openCard.getPlacementSiblings(
      request
    );
  }

  onFilterPlacementSiblingsList(event: any) {
    return (this.filteredSiblingsList = this.placementSiblingsList.filter(
      (item: any) => {
        return item.clientName.toLowerCase().indexOf(event.query) !== -1;
      }
    ));
  }

  onSelectSiblings(event: any) {
    this.sibs_data.dob = new Date(event.dob);
    this.sibs_data.client_id = event.clientID;
  }

  async placementSiblingsSave() {
    let sibsList = [],
      sibsObject: any;
    this.sibis_list.map((item: any) => {
      sibsObject = {
        add: item.adds,
        remove: item.remove,
        clientID: item.client_id,
        effectiveDate:
          !isNullOrUndefined(item.eff_date) && item.eff_date !== ""
            ? this._localValues.stringFormatDatetime(item.eff_date)
            : null,
        placementSiblingsID: item.placementSiblingsID
          ? item.placementSiblingsID
          : null,
      };
      sibsList.push(sibsObject);
    });
    let request = {
      placementID: this.PLACEMENT_ID,
      placementDetailID: this.PLACEMENT_DETAIL_ID,
      sibsInHomeList: sibsList,
    };
    let response = await this._openCard.savePlacementSiblingsSave(request);
  }

  async getSiblingsPlacementSibling() {
    this.sibis_list = [];
    let request = {
      placementID: this.PLACEMENT_ID,
      placementDetailID: this.PLACEMENT_DETAIL_ID,
      beginPagination: 1,
      endPagination: 100,
    };
    let response = await this._openCard.getPlacementSiblingsList(request);
    if (response.placementSiblings.lenght < 0) {
      return (this.sibis_list = []);
    } else {
      return response.placementSiblings.filter((item: any) => {
        let sibsObject = {
          name: { clientName: item.clientName },
          dob: new Date(item.dob),
          client_id: item.clientID,
          eff_date: item.effectiveDate ? new Date(item.effectiveDate) : null,
          adds: item.add,
          remove: item.remove,
          placementSiblingsID: item.placementSiblingsID,
        };
        this.sibis_list.push(sibsObject);
      });
    }
  }

  async onSelectProcodeValidation(event: any) {
    let request = {
      referralID: this.REF_ID,
      procodeID: event.procodeID,
    };
    let response = await this._openCard.procodeValidation(request);
    if (!response.responseStatus) {
      swal("Info", `${response.responseMessage}`, "info");
      delete this.placementDetail.procodeID;
    }
  }
  getClaimsList(currentPlacementAuthID) {
    this._placement
      .getPlacementClaim({ authorizationID: currentPlacementAuthID })
      .then((data: any) => {
        this.placementEdit.placementClaims = data.placementClaim;
      });
  }
  onPayorRateChanged() {
    this.auth.payorRate = this.auth.payorRate.toFixed(2);
  }
  onProviderRateChanged() {
    this.auth.providerRate = this.auth.providerRate.toFixed(2);
  }
  public openingDeleteConfirmation(selectedAttendingSchool: any) {
    this.selectedAttendingSchoolData = selectedAttendingSchool;
    this.isAtteningSchoolDeleteConfirmation = true;
  }

  public async onClickAttendingSchoolDelete() {
    let attendingSchoolDeleteReq = {
      clientSchoolID: this.selectedAttendingSchoolData.clientSchoolID,
    };
    await this._openCard.deleteAttendingSchool(attendingSchoolDeleteReq);
    this.isAtteningSchoolDeleteConfirmation = false;
    this.isAttendingSchoolList = false;
    await this.getAttendingSchoolList();
    this.isAttendingSchoolList = true;
  }

  public async onSelectProcode(begindate?: any, selectedProcode?: any) {
    await this.generateUnitRate(selectedProcode);
    this.changingDatesBasedOnProcodes(selectedProcode);
    this.autoFetchPaymentEndDate(begindate, selectedProcode);
  }

  public changingDatesBasedOnProcodes(procode: any) {
    if (procode.isROC) {
      this.placementDetail.dcfreleasedOfCustodyDate =
        this.placementDetail.dcfplanEndDate = this.placement.beginDate;
      this.calculateReleasedDate();
    } else if (procode.requireOtherRel) {
      this.placementDetail.dcfreleasedOfCustodyDate = this.placement.beginDate;
    } else if (procode.isPED) {
      this.calculatePlanEndDate();
    }
  }

  public calculateReleasedDate() {
    if (this.placementDetail.dcfreleasedOfCustodyOverrideDate) {
      this.placementEdit.placementID
        ? (this.placementDates.releaseDate =
            this.placementDetail.dcfreleasedOfCustodyOverrideDate)
        : (this.referralDates.releaseDate =
            this.placementDetail.dcfreleasedOfCustodyOverrideDate);
    } else {
      this.placementEdit.placementID
        ? (this.referralDates.releaseDate = this.placement.beginDate)
        : (this.referralDates.releaseDate = this.placement.beginDate);
    }
  }

  public calculatePlanEndDate() {
    let placementBeginDateMonth = new Date(this.placement.beginDate).getMonth();
    this.referralDates.dCFPlanEndDate = this.placementDetail.dcfplanEndDate =
      new Date(
        new Date(this.placement.beginDate).setMonth(placementBeginDateMonth + 6)
      );
  }

  public async makeReasonForChangeFieldMandatory() {
    if (this._router.url.includes("/new")) {
      return (this.isReasonForChangeMandatroy = true);
    } else {
      let placementDetailCountReq = {
        placementID: this.currentPlacementId,
      };
      let placementDetailCount = await this._openCard.getCountOfPlacementDetail(
        placementDetailCountReq
      );
      if (placementDetailCount !== undefined && placementDetailCount !== null) {
        if (placementDetailCount < 2) {
          return (this.isReasonForChangeMandatroy = true);
        } else {
          return (this.isReasonForChangeMandatroy = false);
        }
      }
    }
  }

  public authorizationInformationAutoFill() {
    this.auth.payorRate = 0.0;
    this.auth.providerRate = 0.0;
  }

  endDateCleared(event) {
    if (this.placement && this.placement.endDate) {
      this.placement.endDate = null;
    }
    if (this.placementEdit && this.placementEdit.endDate) {
      this.placementEdit.endDate = null;
    }
  }
  sortDates(a, b) {
    let aValue = moment(a.beginDate).format("MM/DD/YYYY");
    let bValue = moment(b.beginDate).format("MM/DD/YYYY");
    // return parseInt(aValue) - parseInt(bValue);
    return parseInt(bValue) - parseInt(aValue);
  }

  public onChangeAttendingSchoolBeginDate() {
    if (
      this.attendingSchool.beginDate &&
      this.attendingSchool.beginDate.getHours() === 12 &&
      this.attendingSchool.beginDate.getMinutes() === 0 &&
      this.attendingSchool.beginDate.getSeconds() === 0
    ) {
      this.attendingSchool.beginDate.setHours(0);
      this.attendingSchool.beginDate.setMinutes(0);
      this.attendingSchool.beginDate.setSeconds(0);
    }
  }

  public autoFillAttendingSchoolDates() {
    this.attendingSchool.beginDate = new Date(
      this._localValues.stringFormatDatetime(this.currentDateAndTime)
    );
    this.attendingSchool.beginDate.setHours(0);
    this.attendingSchool.beginDate.setMinutes(0);
    this.attendingSchool.beginDate.setSeconds(0);
  }

  public async autoFetchPaymentEndDate(beginDate?: any, procode?: any) {
    this.placementEdit.beginDate.setHours(0);
    this.placementEdit.beginDate.setMinutes(0);
    this.placementEdit.beginDate.setSeconds(0);

    let paymentEndDateRequest = {
      beginDate:
        beginDate !== null && beginDate !== undefined ? beginDate : null,
      referralID: this.REF_ID,
      isPlacement: this._router.url.includes("placement-event") ? false : true,
      procodeID:
        procode !== null && procode !== undefined ? procode.procodeID : null,
      placementID: this.PLACEMENT_ID,
    };
    let payementEndDateResponse = await this._openCard.getPaymentEndDate(
      paymentEndDateRequest
    );
    if (this.formMode == "edit") {
      this.placementDates.paymentEndDate =
        payementEndDateResponse.paymentEndDate !== null &&
        payementEndDateResponse.paymentEndDate !== undefined
          ? new Date(payementEndDateResponse.paymentEndDate)
          : null;
    } else {
      this.referralDates.paymentEndDate = new Date(
        payementEndDateResponse.paymentEndDate
      );
    }
  }

  public placementDateValidationCheck() {
    let referralTypeID = this.REF_TYPE_ID;
    let validationResult = false;
    if (
      referralTypeID !== 11 &&
      referralTypeID !== 12 &&
      referralTypeID !== 16
    ) {
      if (!this.selectedProcodeObject.isRespiteAsPlacement) {
        // Call the validation check
        validationResult = true;
      }
    } else {
      // Not call the validation check
      this.isPlacementDateValidationOpen = false;
    }
    return validationResult;
  }

  public openInNewBrowserWindow(path: any) {
    window.open(
      window.location.origin + path + window.location.search,
      "_blank",
      "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
    );
  }

  public onRemoveReleaseOfCustody() {
    this.placementDetail.dcfreleasedOfCustodyID = null;
    return delete this.placementDetail.dcfreleasedOfCustodyID;
  }

  public async onClickGetPaymentEndDateHistory() {
    this.isOpenPaymentDates = true;
    let historyReq = {
      referralID: this.REF_ID,
    };
    let historyRes = await this._openCard.getPlacementEndDateHistory(
      historyReq
    );
    this.paymentEndDateHistory = historyRes.paymentEndDateHistory;
  }

  public placementDateValidationExitOut(event: any) {
    console.log("Placement validatio exit", event);
    if (event.resultOut === "Yes") {
      this.isPlacementDateValidationOpen = false;
      this.isAckOptions = true;
    } else {
      this.isPlacementDateValidationOpen = true;
      this.isAckOptions = false;
    }
  }

  placementOverallValidationStatus(event: any) {
    this.placementDateValidationStatus = Object.values(event);
  }

  public discardForm() {
    return this._router.navigate(
      ["/reintegration/referral/opencard/placement/view"],
      { queryParamsHandling: "preserve" }
    );
  }
}
