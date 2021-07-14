import { Component, OnInit, EventEmitter, ViewChild } from "@angular/core";
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
import { CaseTeamService } from "../../case-team/case-team.service";
import swal from "sweetalert2";
import { PlacementService } from "../placement.service";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { isNullOrUndefined } from "util";
import { AttendingSchool } from "../../attending-school/attending-school";
import { HomeSchoolComponent } from "../../home-school/home-school.component";
import { HomeSchool } from "../../home-school/home-school";
import { AttendingSchoolComponent } from "../../attending-school/attending-school.component";
import { ClildFormService } from "../../child-forms/child-forms.service";
import { LocalValues } from "../../local-values";
import * as moment from "moment";
import { PlacementPrintService } from "../../placement-forms/placement-print.service";
import { MessageService } from "primeng/api";
import { AckOptionsComponent } from "../../ack-options/ack-options.component";

@Component({
  selector: "app-placement-event",
  templateUrl: "./placement-event.component.html",
  styleUrls: ["./placement-event.component.scss"],
  outputs: ["placementEventOut"],
})
export class PlacementEventComponent implements OnInit {
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
  printAckHeader = "Acknowledgement Options";
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
  currentProviderId: any;
  isPopup = false;
  placementEditDates: any;
  placementEventOut = new EventEmitter();
  isDCFServiceCodeDisabled = true;
  placementEditMode: any;
  newAttendingSchoolList = [];
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  placementSiblingsList = [];
  public filteredSiblingsList = [];
  @ViewChild(AckOptionsComponent, { static: true })
  ackOptionsComponent: AckOptionsComponent;
  public isCorrectCopyConfirmationOpen = false;
  public isRequestedByProviderEnable = false;
  requestedByType = [
    { view: "Provider", value: "provider" },
    { view: "Staff", value: "staff" },
  ];
  public isReasonForChangeMandatroy = false;
  public isAtteningSchoolDeleteConfirmation = false;
  public selectedAttendingSchoolData: any;
  disruptionForm: FormGroup;
  isDisruptionEnable = false;
  disruptionCreateForm: FormGroup;
  public previuousPlacementID: any;
  public disruptionEditProviderType: any;
  public placementDetailCount: number;
  public placementBeginDate: any;
  public formMode: string;
  public isPlacementDateValidationOpen = false;
  public selectedProcodeObject: any;
  isOpenPaymentDates = false;
  paymentEndDateHistory = [];
  isClaimValidation = false;
  placementDateValidationStatus = [];

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
    this.editFormValidation();
    this.disruptionFormValidation();
    this.disruptionForm.disable();
    this.disruptionForm.reset();
    this.disruptionCreateFormValidation();
    this.disruptionCreateForm.disable();
    this.disruptionCreateForm.reset();
    this.formMode = this._activatedRoute.snapshot.queryParamMap.get("action");
    this.currentURL = this._router.url.includes("?")
      ? this._router.url.split("?")[0]
      : this._router.url;
    this.setIndex(0);
    this.listPlacements();
    this.currentPlacementId =
      parseInt(localStorage.getItem("placementID")) -
      this._openCard.getHasKey();
    this.currentPlacementDetailId = parseInt(
      localStorage.getItem("placementDetailId")
    );
    this._placement.storeSavedPlacementID(this.currentPlacementId);
    this._placement.storeSavedPlacementDetailID(this.currentPlacementDetailId);
    this.getPlacementSiblingsList();
    this.getSiblingsPlacementSibling();
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

      {
        label: "Placements",
        active: "",
        href: "/reintegration/referral/opencard/placement/detail",
      },
      {
        label: "Placements Event List",
        active: "",
        href: "/reintegration/referral/opencard/placement/placementEvent/view",
      },
      { label: "Placements Event", active: "active" }
    );
    this.formValidation();

    /** Autofecth value for new form */
    if (
      this._router.url.includes(
        "/reintegration/referral/opencard/placement/placementEvent/new"
      )
    ) {
      this.authorizationInformationAutoFill();
      if (this._localValues.currentPlacementProviderInfo) {
        this.placement.providerID = {
          providerID: this._localValues.currentPlacementProviderInfo.providerID,
          providerName:
            this._localValues.currentPlacementProviderInfo.providerName,
        };
        this.auth.paySponsor =
          this._localValues.currentPlacementProviderInfo.paySponsor;
        this.placementDetail.providerLocationID =
          this._localValues.currentPlacementProviderInfo.providerLocationID;
      }

      this.placement.beginDate = new Date(
        this._localValues.stringFormatDatetime(Date.now())
      );
      this.placement.beginDate.setHours(0);
      this.placement.beginDate.setMinutes(0);
      this.placement.beginDate.setSeconds(0);

      this.getReferralDates();
      this.defineMainTabs();
      this.checkHasSiblinginOOHPlacement();
      this.unitsPerMonthValue();

      this.respite.beginDate = new Date(
        this._localValues.stringFormatDatetime(Date.now())
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
    }

    this.getMasterDetails();
    this.attendingSchoolFormValidation();
    this.homeSchoolValidation();
    this.getHomeSchoolList();
    this.getAttendingSchoolList();
    let referralTypeId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._openCard.getHasKey();
    if (referralTypeId === 4) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "placements-NCFCH",
        this.breadcrumbs
      );
    }
    if (
      this.currentURL ==
      "/reintegration/referral/opencard/placement/placementEvent/new"
    ) {
      this.getCountOfPlacementDetail();
    }
    /*** Edit form */
    if (
      this.currentURL.includes(
        "/reintegration/referral/opencard/placement/placementEvent/detail"
      )
    ) {
      this.isAttachmentRequired = true;
      this.isDetailsPage = true;
      this.isPlacementCreateForm = false;
      console.log("if detail page passed");
      console.log("this.isPlacementCreateForm is", this.isPlacementCreateForm);
      this.editFormValidation();
      this.defineEditTabs();
      this.getPlacementRecordById();
      this.getPlacementSiblingsList();
    } else {
      console.log("else new page passed");
      console.log(
        "this.isPlacementCreateForm new is",
        this.isPlacementCreateForm
      );
    }
    /**Placement print items configuration */
    this.placementPrintItems = [
      /** Eg: {label: 'Update', icon: 'pi pi-refresh', command: () => { this.update(); }},**/
      {
        label: "ACK - Acknowledgement",
        routerLink: ["/placement-acknowledgment"],
      },
      {
        label: "PS -  Placement Status",
        routerLink: ["/placement-event-status"],
      },
      {
        label: "PA -  Placement Agreement",
        routerLink: ["/placement-agreement"],
      },
      { label: "PSA Form", routerLink: ["/placement-psa"] },
    ];
    this.getMoveEvents();
    console.log("placement.beginDate is", this.placement.beginDate);
    let payorName = {
      payorName: "Saint Francis Reintegration - West Region - RFCA Region 3",
      payorID: 142,
    };
    this.auth.payorAuthorizationID = payorName;
    this.respite.payorID = payorName;
  }

  setIndex(index: number) {
    this.sIndex = index;
  }

  sortDates(a, b) {
    let aValue = moment(a.beginDate).format("MM/DD/YYYY");
    let bValue = moment(b.beginDate).format("MM/DD/YYYY");
    // return parseInt(aValue) - parseInt(bValue);
    return parseInt(bValue) - parseInt(aValue);
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
      // { label: "Sibs at Home", href: "#nav-sec9" },
      { label: "Sibs at Home", href: "#nav-sec10" },
    ]);
  }

  dCFPlanEndDate: any;
  editmodeData: any;
  authNotes: any;
  /*** API Request handler */
  async formAction(source?: any) {
    this.authNotes = this.auth.notes;
    console.log("placementEditMode is..", this.placementEditMode);
    let isEditMode = this.currentURL.includes("detail") ? true : false;
    if (isEditMode && this.placementEditMode) {
      // this.editmodeData = this.placementEditMode;
      this.editmodeData = Object.assign({}, this.placementEditMode);
    }
    this.dCFPlanEndDate = isEditMode
      ? this.placementEditDates.dCFPlanEndDate
      : this.placementDetail.dcfplanEndDate;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let validationResult =
      this.placementEdit.placementID ||
      (this.placement.beginDate !== null &&
        this.placement.beginDate !== undefined &&
        this.placement.providerID !== null &&
        this.placement.providerID !== undefined &&
        this.placementDetail.procodeID !== null &&
        this.placementDetail.procodeID !== undefined &&
        this.placement.reasonForMoveID !== null &&
        this.placement.reasonForMoveID !== undefined);

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
      if (isEditMode) {
        validationResult =
          this.placementEditMode.sRSServiceCodeID !== null &&
          this.placementEditMode.sRSServiceCodeID !== undefined
            ? true
            : false;
      } else {
        validationResult =
          this.placementDetail.sRSServiceCodeID !== null &&
          this.placementDetail.sRSServiceCodeID !== undefined
            ? true
            : false;
      }
    }
    if (isEditMode) {
      if (this.isReasonForChangeMandatroy) {
        validationResult =
          this.placementEdit.reasonForMoveID !== null &&
          this.placementEdit.reasonForMoveID !== undefined
            ? true
            : false;
      }
      // validationResult = true;
    } else {
      if (this.isReasonForChangeMandatroy) {
        validationResult =
          this.placement.reasonForMoveID !== null &&
          this.placement.reasonForMoveID !== undefined
            ? true
            : false;
      }
    }
    if (validationResult) {
      loader.style.display = "none";
      if (source.providerID) {
        this.currentProviderId = source.providerID.ProviderID;
      }

      if (isEditMode) {
        /** Placement event update */
        this.disruption["changedBy"] = this.disruption.enteredBy;
        this.disruption["changedDate"] = this.disruption.enteredDate;
        delete this.disruption.enteredBy;
        delete this.disruption.placementID;
        delete this.disruption.enteredDate;
        delete this.disruption.providerID;
        this.disruption.disruptionReasonID = !isNullOrUndefined(
          this.disruption.disruptionReasonID
        )
          ? this.disruption.disruptionReasonID.DisruptionReasonID
          : null;
        this.disruption.otherOptOffered = !isNullOrUndefined(
          this.disruption.otherOptOffered
        )
          ? this.disruption.otherOptOffered
          : null;
        this.auth["authorizationID"] = 1;
        this.auth["payorRate"] = 1;
        this.auth["providerRate"] = 1;
        this.placementEdit.placementDetail.dcfreleasedOfCustodyID =
          !isNullOrUndefined(this.placementEditMode.dcfreleasedOfCustodyID)
            ? this.placementEditMode.dcfreleasedOfCustodyID
                .DCFReleasedOfCustodyID
            : null;
        this.placementDetail["addInfo"] =
          this.placementEdit.placementDetail.addInfo;
        this.placementDetail["clarification"] =
          this.placementEdit.placementDetail.clarification;
        this.placementDetail["placementDetailID"] =
          this.placementEdit.placementDetail.placementDetailID;
        this.placementDetail["SFANotes"] =
          this.placementEdit.placementDetail.SFANotes;

        this.respite["changedBy"] = this.respite.enteredBy;
        this.respite["changedDate"] = this.respite.enteredDate;
        delete this.respite.enteredBy;
        delete this.respite.enteredDate;
        !this.respite.unitsPerMonth ? (this.respite.unitsPerMonth = 0) : null;
        source.placementID = this.currentPlacementId;

        this.placementEdit.placementDetail.sfanotes =
          this.placementEditMode["SFANotes"];
        this.placementEdit.placementDetail.sibsAffectedByMove =
          this.placementEditMode["sibsAffectedbyMove"];
        !isNullOrUndefined(
          this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideDate
        )
          ? (this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideDate =
              this._localValues.stringFormatDatetime(
                Date.parse(
                  this.placementEditMode.dcfreleasedOfCustodyOverrideDate
                )
              ))
          : null;
        !isNullOrUndefined(
          this.placementEdit.placementDetail.dcfreleasedOfCustodyDate
        )
          ? (this.placementEdit.placementDetail.dcfreleasedOfCustodyDate =
              this._localValues.stringFormatDatetime(
                this.placementEditMode.dcfreleasedOfCustodyDate
              ))
          : null;
        !isNullOrUndefined(
          this.placementEdit.placementDetail.dcfplanEndDateOverride
        )
          ? (this.placementEdit.placementDetail.dcfplanEndDateOverride =
              this._localValues.stringFormatDatetime(
                Date.parse(this.placementEditMode.dcfplanEndDateOverride)
              ))
          : null;
        !isNullOrUndefined(
          this.placementEdit.placementDetail.retHomeWCustodyDate
        )
          ? (this.placementEdit.placementDetail.retHomeWCustodyDate =
              this._localValues.stringFormatDatetime(
                Date.parse(this.placementEditMode.retHomeWCustodyDate)
              ))
          : null;
        !isNullOrUndefined(this.placementEdit.placementDetail.changeOfVenueDate)
          ? (this.placementEdit.placementDetail.changeOfVenueDate =
              this._localValues.stringFormatDatetime(
                Date.parse(this.placementEditMode.changeOfVenueDate)
              ))
          : null;
        !isNullOrUndefined(
          this.placementEdit.placementDetail.retHomeWOCustodyDate
        )
          ? (this.placementEdit.placementDetail.retHomeWOCustodyDate =
              this._localValues.stringFormatDatetime(
                Date.parse(this.placementEditMode.retHomeWOCustodyDate)
              ))
          : null;
        !isNullOrUndefined(this.placementEdit.placementDetail.formReceivedDate)
          ? (this.placementEdit.placementDetail.formReceivedDate =
              this._localValues.stringFormatDatetime(
                new Date(this.placementEditMode.formReceivedDate)
              ))
          : null;

        !isNullOrUndefined(this.placementEdit.endDate)
          ? (this.placementEdit.placementDetail.endDate =
              this._localValues.stringFormatDatetimeWithoutSeconds(
                new Date(this.placementEdit.endDate)
              ))
          : null;

        this.placementEdit.placementDetail.payorID = !isNullOrUndefined(
          this.placementEditMode.payorID
        )
          ? this.placementEditMode.payorID.payorID
          : null;
        this.placementEdit.placementDetail.procodeID = !isNullOrUndefined(
          this.placementEditMode.procodeID
        )
          ? this.placementEditMode.procodeID.procodeID
          : null;
        this.placementEdit.placementDetail.providerLocationID =
          !isNullOrUndefined(this.placementEditMode.providerLocationID)
            ? this.placementEditMode.providerLocationID.providerLocationID
            : null;
        this.placementEdit.placementDetail.sRSServiceCodeID =
          !isNullOrUndefined(this.placementEditMode.sRSServiceCodeID)
            ? this.placementEditMode.sRSServiceCodeID
            : null;
        this.placementEdit.placementDetail.jjaDate = !isNullOrUndefined(
          this.placementEdit.placementDetail.jjaDate
        )
          ? this._localValues.stringFormatDatetime(
              this.placementEdit.placementDetail.jjaDate
            )
          : null;
        this.placementEdit.placementDetail.SFANotes = !isNullOrUndefined(
          this.placementEdit.placementDetail.SFANotes
        )
          ? this.placementEdit.placementDetail.SFANotes
          : null;
        this.placementEdit.placementDetail.sibsAffectedbyMove =
          !isNullOrUndefined(
            this.placementEdit.placementDetail.sibsAffectedbyMove
          )
            ? this.placementEdit.placementDetail.sibsAffectedbyMove
            : null;

        this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID !==
          null &&
        this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID !==
          undefined
          ? (this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID =
              this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID.DCFReleasedOfCustodyOverrideID)
          : (this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID =
              null);

        this.placementEdit.placementDetail.dcfplanEndDateOverrideID !== null &&
        this.placementEdit.placementDetail.dcfplanEndDateOverrideID !==
          undefined
          ? (this.placementEdit.placementDetail.dcfplanEndDateOverrideID =
              this.placementEdit.placementDetail.dcfplanEndDateOverrideID.PlanEndDateOverrideID)
          : (this.placementEdit.placementDetail.dcfplanEndDateOverrideID =
              null);

        delete this.placementEdit.placementDetail.acomplete;
        delete this.placementEdit.placementDetail.acompleteDate;
        delete this.placementEdit.placementDetail.adopt;
        delete this.placementEdit.placementDetail.adoptDate;
        delete this.placementEdit.placementDetail.authorizationID;
        delete this.placementEdit.placementDetail.changedBy;
        delete this.placementEdit.placementDetail.createdDate;
        delete this.placementEdit.placementDetail.death;
        delete this.placementEdit.placementDetail.deathDate;
        delete this.placementEdit.placementDetail.enteredBy;
        delete this.placementEdit.placementDetail.enteredDate;
        delete this.placementEdit.placementDetail.fchadmissionID;
        delete this.placementEdit.placementDetail.fchadmissionID;
        delete this.placementEdit.placementDetail.guardAndNotReld;
        delete this.placementEdit.placementDetail.guardAndNotReldDate;
        delete this.placementEdit.placementDetail.guardAndReld;
        delete this.placementEdit.placementDetail.guardAndReldDate;
        delete this.placementEdit.placementDetail.ilp;
        delete this.placementEdit.placementDetail.ilpdate;
        delete this.placementEdit.placementDetail.inHome;
        delete this.placementEdit.placementDetail.isActive;
        delete this.placementEdit.placementDetail.isDeleted;
        delete this.placementEdit.placementDetail.isOOH;
        delete this.placementEdit.placementDetail.jjadate;
        delete this.placementEdit.placementDetail.kipp_ReunificationEmailed;
        delete this.placementEdit.placementDetail.lastModifiedDate;
        delete this.placementEdit.placementDetail.legacy_AncillaryServicesID;
        delete this.placementEdit.placementDetail.legacy_Behaviors;
        delete this.placementEdit.placementDetail.legacy_ClientID;
        delete this.placementEdit.placementDetail.legacy_DtResent;
        delete this.placementEdit.placementDetail.legacy_DtSentOrig;
        delete this.placementEdit.placementDetail.legacy_PayorID;
        delete this.placementEdit.placementDetail.legacy_PlacementID;
        delete this.placementEdit.placementDetail.legacy_PLOrder;
        delete this.placementEdit.placementDetail.legacy_PreAuthNo;
        delete this.placementEdit.placementDetail.legacy_ProcodeID;
        delete this.placementEdit.placementDetail.legacy_ProviderID;
        delete this.placementEdit.placementDetail.legacy_ProviderLocationID;
        delete this.placementEdit.placementDetail.legacy_ReferralID;
        delete this.placementEdit.placementDetail.legacy_Resend;
        delete this.placementEdit.placementDetail.legacy_SponsorID;
        delete this.placementEdit.placementDetail.legacy_SRSSvcCode;
        delete this.placementEdit.placementDetail.legacy_TFI_AuthorizationID;
        delete this.placementEdit.placementDetail.legacy_TFI_ClientID;
        delete this.placementEdit.placementDetail.legacy_TFI_PlacementDetailID;
        delete this.placementEdit.placementDetail.legacy_TFI_PlacementID;
        delete this.placementEdit.placementDetail.legacy_TFI_ProcodeID;
        delete this.placementEdit.placementDetail.legacy_TFI_ProviderID;
        delete this.placementEdit.placementDetail.legacy_TFI_ProviderLocationID;
        delete this.placementEdit.placementDetail.legacy_TFI_ReferralID;
        delete this.placementEdit.placementDetail.legacy_UMY_AuthorizationID;
        delete this.placementEdit.placementDetail.legacy_UMY_ClientID;
        delete this.placementEdit.placementDetail
          .legacy_UMY_PlacementDetailIDdelete;
        delete this.placementEdit.placementDetail.legacy_UMY_PlacementID;
        delete this.placementEdit.placementDetail.legacy_UMY_ProcodeID;
        delete this.placementEdit.placementDetail.legacy_UMY_ProviderID;
        delete this.placementEdit.placementDetail.legacy_UMY_ProviderLocationID;
        delete this.placementEdit.placementDetail.legacy_UMY_ReferralID;
        delete this.placementEdit.placementDetail.legacy_WhyNotSent;
        delete this.placementEdit.placementDetail.levelDown;
        delete this.placementEdit.placementDetail.medicalCard;
        delete this.placementEdit.placementDetail.otherRel;
        delete this.placementEdit.placementDetail.otherRelDate;
        delete this.placementEdit.placementDetail.paymentBeginDate;
        // delete this.placementEdit.placementDetail.placementDetailID;
        // delete this.placementEdit.placementDetail.reasonForMoveID;
        delete this.placementEdit.placementDetail.refToAdopt;
        delete this.placementEdit.placementDetail.refToAdoptDate;
        delete this.placementEdit.placementDetail
          .relationshipToChild_PersonTypeID;
        delete this.placementEdit.placementDetail.reprint;
        delete this.placementEdit.placementDetail.respite;
        delete this.placementEdit.placementDetail.respiteTypeID;
        // delete this.placementEdit.placementDetail.retHomeWCustody;
        // delete this.placementEdit.placementDetail.retHomeWCustodyDate;
        delete this.placementEdit.placementDetail.returnFromRespite;
        delete this.placementEdit.placementDetail.scriptsFlag;
        delete this.placementEdit.placementDetail.sixtyDay;
        delete this.placementEdit.placementDetail.sixtyDayDate;
        delete this.placementEdit.placementDetail.sponsorID;
        delete this.placementEdit.placementDetail.srsreldOfCustody;
        delete this.placementEdit.placementDetail.srsreldOfCustodyDate;
        delete this.placementEdit.placementDetail.swapPay;
        delete this.placementEdit.placementDetail.terminateReason;
        delete this.placementEdit.placementDetail.thirtyDay;
        delete this.placementEdit.placementDetail.tribalCourt;
        delete this.placementEdit.placementDetail.tribalCourtDate;
        delete this.placementEdit.placementDetail.updatedDate;
        delete this.placementEdit.placementDetail.legacy_UMY_PlacementDetailID;
        delete this.placementEdit.placementDetail.sfanotes;

        this.referralDates.referralDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.referralDates.referralDate)
          );
        this.referralDates.paymentEndDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.referralDates.paymentEndDate)
          );
        this.referralDates.retractedDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.referralDates.retractedDate)
          );
        this.referralDates.withDrawDate =
          this._localValues.stringFormatDatetime(
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
        this.referralDates.dCFBeginDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.referralDates.dCFBeginDate)
          );
        if (!this.editForm.pristine && !this.placementEditMode.correctedCopy) {
          return (this.isCorrectCopyConfirmationOpen = true);
        } else if (
          !this.attendingSchoolForm.pristine &&
          !this.placementEditMode.correctedCopy
        ) {
          return (this.isCorrectCopyConfirmationOpen = true);
        } else {
          return this.placementEventUpdate();
        }
      } else {
        /*** Placement Save */
        this.placement = source;

        let placementUpdate = {
          initiatedByStaffID: !isNullOrUndefined(source.initiatedByStaffID)
            ? source.initiatedByStaffID.staffID
            : null,
          reasonForMoveID: !isNullOrUndefined(source.reasonForMoveID)
            ? source.reasonForMoveID.reasonForMoveID
            : null,
          placementReferralID: 2,
          behaviors: !isNullOrUndefined(source.behaviors)
            ? source.behaviors
            : null,
          notes: !isNullOrUndefined(source.notes) ? source.notes : null,
          reasonForMove_PR: !isNullOrUndefined(source.reasonForMove_PR)
            ? source.reasonForMove_PR
            : null,
          reminderNote: !isNullOrUndefined(source.reminderNote)
            ? source.reminderNote
            : null,
          providerID: !isNullOrUndefined(source.providerID)
            ? source.providerID.providerID
            : null,
        };

        /** For authorization */

        this.auth.beginDate = !isNullOrUndefined(this.placement.beginDate)
          ? this._localValues.stringFormatDatetime(this.placement.beginDate)
          : null;
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
        this.auth.unitTypeID = 1;
        // this.auth.unitsAuth = null;
        this.auth.unitsRemaining = this.auth.unitsAuth;
        this.auth.doNotPay = null;
        this.auth.exception = null;
        this.auth.payorAuthorizationID = this.auth.payorID = !isNullOrUndefined(
          this.auth.payorAuthorizationID
        )
          ? this.auth.payorAuthorizationID.payorID
          : null;

        this.auth.notes = null;
        this.auth.payorRate = !isNullOrUndefined(this.auth.payorRate)
          ? this.auth.payorRate
          : null;
        this.auth.providerRate = !isNullOrUndefined(this.auth.providerRate)
          ? this.auth.providerRate
          : null;

        // this.auth.endDate = !isNullOrUndefined(this.placement.beginDate) ? this._localValues.stringFormatDatetime(this.placement.beginDate) : null;
        this.auth.endDate = this._localValues.stringFormatDatetime(
          Date.parse(this.auth.endDate)
        );

        /** For notes */

        this.placementDetail.reasonForMoveID = !isNullOrUndefined(
          this.placement.reasonForMoveID
        )
          ? this.placement.reasonForMoveID.ReasonForMoveID
          : null;
        /** For sibs in ooh */
        this.placementDetail.siblingReasonID = !isNullOrUndefined(
          this.placementDetail.siblingReasonID
        )
          ? this.placementDetail.siblingReasonID.siblingReasonID
          : null;

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
        // this.disruption.staffID = !isNullOrUndefined(this.disruption.staffID)
        //   ? this.disruption.staffID.StaffID
        //   : null;
        this.disruption.prev_PlacementID = 2;
        delete this.disruption.providerID;

        /**For placement behavior update */
        this.placementbehaviourUpdate.behavior = !isNullOrUndefined(
          this.placement.behaviors
        )
          ? this.placement.behaviors
          : null;
        this.placementbehaviourUpdate.changedBy = "Admin";
        this.placementbehaviourUpdate.changedDate =
          this._localValues.stringFormatDatetime(Date.parse(Date.toString()));

        /**For section 6 */
        this.placementDetail.dcfreleasedOfCustodyID = !isNullOrUndefined(
          this.placementDetail.dcfreleasedOfCustodyID
        )
          ? this.placementDetail.dcfreleasedOfCustodyID.DCFReleasedOfCustodyID
          : null;
        this.placementDetail.dcfreleasedOfCustodyDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.placementDetail.dcfreleasedOfCustodyDate)
          );
        this.placementDetail.retHomeWOCustodyDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.placementDetail.retHomeWOCustodyDate)
          );
        this.placementDetail.changeOfVenueDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.placementDetail.changeOfVenueDate)
          );
        this.placementDetail.dcfreleasedOfCustodyOverrideID =
          !isNullOrUndefined(
            this.placementDetail.dcfreleasedOfCustodyOverrideID
          )
            ? this.placementDetail.dcfreleasedOfCustodyOverrideID
                .DCFReleasedOfCustodyOverrideID
            : null;
        this.placementDetail.dcfreleasedOfCustodyOverrideDate =
          this.placementDetail.dcfreleasedOfCustodyOverrideDate;
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
        this.referralDates.referralDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.referralDates.referralDate)
          );
        this.referralDates.paymentEndDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.referralDates.paymentEndDate)
          );
        this.referralDates.retractedDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.referralDates.retractedDate)
          );
        this.referralDates.withDrawDate =
          this._localValues.stringFormatDatetime(
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
        this.referralDates.dCFBeginDate =
          this._localValues.stringFormatDatetime(
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
        this.referralDates.closureReasonNote = !isNullOrUndefined(
          this.referralDates.closureReasonNote
        )
          ? this.referralDates.closureReasonNote
          : null;
        this.referralDates.dCFPriorMoves = !isNullOrUndefined(
          this.referralDates.dCFPriorMoves
        )
          ? this.referralDates.dCFPriorMoves
          : null;
        this.referralDates.releaseReasonNote = !isNullOrUndefined(
          this.referralDates.releaseReasonNote
        )
          ? this.referralDates.releaseReasonNote
          : null;
        this.referralDates.retractedReasonNote = !isNullOrUndefined(
          this.referralDates.retractedReasonNote
        )
          ? this.referralDates.retractedReasonNote
          : null;
        this.referralDates.withDrawReasonNote = !isNullOrUndefined(
          this.referralDates.withDrawReasonNote
        )
          ? this.referralDates.withDrawReasonNote
          : null;

        /**For recidivistDateUpdate */
        let recidivistDateUpdateObj = {
          referralID:
            parseInt(localStorage.getItem("referralId")) -
            this._openCard.getHasKey(),
        };

        /**For disruption update */
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
          ? this.disruption.providerID.providerID
          : null;
        // this.disruptionUpdate.staffID = !isNullOrUndefined(
        //   this.disruption.staffID
        // )
        //   ? this.disruption.staffID
        //   : null;
        this.disruptionUpdate.changedBy = "Admin";
        this.disruptionUpdate.changedDate =
          this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.disruptionUpdate.prev_PlacementID = 2;

        /**For placementMoveEventUpdate */
        this.placementMoveEvent.moveEventID = !isNullOrUndefined(
          this.placementMoveEvent.moveEventID
        )
          ? this.placementMoveEvent.moveEventID.reasonForMoveID
          : null;

        /**For IdentifiedResourceUpdate */
        this.identifiedResource.beginDate = !isNullOrUndefined(
          this.placement.beginDate
        )
          ? this.placement.beginDate
          : null;
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
        this.identifiedResource.enteredBy = "Admin";
        this.identifiedResource.enteredDate =
          this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.identifiedResource.referralID =
          parseInt(localStorage.getItem("referralId")) -
          this._openCard.getHasKey();
        this.identifiedResource.placementID = this.currentPlacementId;

        /**For respiteAuthorization */
        this.respite.beginDate = this._localValues.stringFormatDatetime(
          Date.parse(this.respite.beginDate)
        );
        this.respite.endDate = this._localValues.stringFormatDatetime(
          Date.parse(this.respite.endDate)
        );
        this.respite.payorID = !isNullOrUndefined(this.respite.payorID)
          ? this.respite.payorID.payorID
          : null;
        this.respite.unitsPerMonth = !isNullOrUndefined(
          this.respite.unitsPerMonth
        )
          ? this.respite.unitsPerMonth
          : null;
        this.respite.notes = !isNullOrUndefined(this.respite.notes)
          ? this.respite.notes
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
        this.authException.exceptionPayorRate = !isNullOrUndefined(
          this.authException.exceptionPayorRate
        )
          ? this.authException.exceptionPayorRate
          : null;
        this.authException.exceptionProviderRate = !isNullOrUndefined(
          this.authException.exceptionProviderRate
        )
          ? this.authException.exceptionProviderRate
          : null;
        this.authException.explanationOfNeed = !isNullOrUndefined(
          this.authException.explanationOfNeed
        )
          ? this.authException.explanationOfNeed
          : null;
        this.authException.originalPayorRate = !isNullOrUndefined(
          this.authException.originalPayorRate
        )
          ? this.authException.originalPayorRate
          : null;
        this.authException.originalProviderRate = !isNullOrUndefined(
          this.authException.originalProviderRate
        )
          ? this.authException.originalProviderRate
          : null;

        /**For placement detail */
        this.placementDetail.beginDate = !isNullOrUndefined(
          this.placement.beginDate
        )
          ? this.placement.beginDate
          : null;
        this.placementDetail.changedBy = "Admin";
        this.placementDetail.changedDate =
          this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.placementDetail.clientID =
          parseInt(localStorage.getItem("clientId")) -
          this._openCard.getHasKey();
        this.placementDetail.createdDate =
          this._localValues.stringFormatDatetime(Date.parse(Date.toString()));

        console.log("Placement event provider", this.placement.providerID);

        this.placementDetail.providerID = !isNullOrUndefined(
          this.placement.providerID
        )
          ? this.placement.providerID.providerID
          : null;

        this.placementDetail.endDate =
          this.placement.endDate !== null &&
          this.placement.endDate !== undefined
            ? this._localValues.stringFormatDatetimeWithoutSeconds(
                this.placement.endDate
              )
            : null;

        this.placementDetail.enteredBy = "Admin";
        this.placementDetail.enteredDate =
          this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.placementDetail.lastModifiedDate =
          this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.placementDetail.paymentEndDate = !isNullOrUndefined(
          this.referralDates.paymentEndDate
        )
          ? this.referralDates.paymentEndDate
          : null;
        this.placementDetail.payorID = !isNullOrUndefined(
          this.auth.payorAuthorizationID
        )
          ? this.auth.payorAuthorizationID.payorID
          : null;
        this.placementDetail.procodeID = !isNullOrUndefined(this.auth.procodeID)
          ? this.auth.procodeID
          : null;

        this.placementDetail.referralID =
          parseInt(localStorage.getItem("referralId")) -
          this._openCard.getHasKey();
        this.placementDetail.updatedDate =
          this._localValues.stringFormatDatetime(Date.parse(Date.toString()));
        this.placementDetail.placementID = this.currentPlacementId;
        this.placementDetail.formReceivedDate =
          this._localValues.stringFormatDatetime(
            this.placementDetail.formReceivedDate
          );
        this.placementDetail.dcfreleasedOfCustodyOverrideDate =
          this._localValues.stringFormatDatetime(
            this.placementDetail.dcfreleasedOfCustodyOverrideDate
          );
        this.placementDetail.addInfo = !isNullOrUndefined(
          this.placementDetail.addInfo
        )
          ? this.placementDetail.addInfo
          : null;
        this.placementDetail.clarification = !isNullOrUndefined(
          this.placementDetail.clarification
        )
          ? this.placementDetail.clarification
          : null;
        this.placementDetail.jjaDate = !isNullOrUndefined(
          this.placementDetail.jjaDate
        )
          ? this._localValues.stringFormatDatetime(this.placementDetail.jjaDate)
          : null;
        this.placementDetail.SFANotes = !isNullOrUndefined(
          this.placementDetail.SFANotes
        )
          ? this.placementDetail.SFANotes
          : null;
        this.placementDetail.sibsAffectedByMove = !isNullOrUndefined(
          this.placementDetail.sibsAffectedByMove
        )
          ? this.placementDetail.sibsAffectedByMove
          : null;
        this.placementDetail.beginDate = !isNullOrUndefined(
          this.placementDetail.beginDate
        )
          ? this._localValues.stringFormatDatetime(
              this.placementDetail.beginDate
            )
          : null;
        this.placementDetail.retHomeWCustodyDate = !isNullOrUndefined(
          this.placementDetail.retHomeWCustodyDate
        )
          ? this._localValues.stringFormatDatetime(
              this.placementDetail.retHomeWCustodyDate
            )
          : null;
        delete this.placementDetail.AComplete;
        delete this.placementDetail.adopt;
        delete this.placementDetail.changedBy;
        delete this.placementDetail.changedDate;
        delete this.placementDetail.createdDate;
        delete this.placementDetail.death;
        delete this.placementDetail.enteredBy;
        delete this.placementDetail.enteredDate;
        delete this.placementDetail.guardAndNotReld;
        delete this.placementDetail.guardAndReld;
        delete this.placementDetail.ilp;
        delete this.placementDetail.inHome;
        delete this.placementDetail.isOOH;
        delete this.placementDetail.kipp_ReunificationEmailed;
        delete this.placementDetail.lastModifiedDate;
        delete this.placementDetail.legacy_Resend;
        delete this.placementDetail.medicalCard;
        delete this.placementDetail.otherRel;
        // delete this.placementDetail.reasonForMoveID;
        delete this.placementDetail.refToAdopt;
        delete this.placementDetail.respite;
        // delete this.placementDetail.retHomeWCustody;
        delete this.placementDetail.returnFromRespite;
        delete this.placementDetail.sixtyDay;
        delete this.placementDetail.srsreldOfCustody;
        delete this.placementDetail.swapPay;
        delete this.placementDetail.thirtyDay;
        delete this.placementDetail.tribalCourt;
        delete this.placementDetail.updatedDate;
        delete this.placementDetail.dcfplanEndDateOverride;
        delete this.placementDetail.dcfplanEndDate;
        source.placementID = this.currentPlacementId;
        this.placementDetail.providerID = this.currentProviderId;
        this.identifiedResource.providerID = this.currentProviderId;
        if (this.dCFPlanEndDate) {
          this.placementDetail.dcfplanEndDate =
            this._localValues.stringFormatDatetime(this.dCFPlanEndDate);
        }

        let req = {
          placementUpdate: placementUpdate,
          respiteAuthorization: this.respite,
          placementDetailInfo: this.placementDetail,
          authorization: this.auth,
          disruption: this.disruption,
          placementMoveEventUpdate: this.placementMoveEvent,
          authorizationException: this.authException,
          referralUpdate: this.referralDates,
          school: [],
        };
        if (!req.placementDetailInfo.providerID) {
          req.placementDetailInfo["providerID"] = this._localValues
            .currentPlacementProviderInfo
            ? this._localValues.currentPlacementProviderInfo.providerID
            : null;
        }
        if (this.authNotes) {
          req.authorization["notes"] = this.authNotes;
        }
        this._placement.savePlacementEvent(req).then(async (data: any) => {
          if (data.responseStatus) {
            swal("Save", "Placement Event has been created", "success");
            let savedPlacementId = data.placementID;
            let savedPlacementDetailId = data.placementDetailID;
            localStorage.setItem(
              "placementEventID",
              (savedPlacementId + this._openCard.getHasKey()).toString()
            );
            localStorage.setItem(
              "placementEventDetailID",
              savedPlacementDetailId.toString()
            );
            localStorage.setItem(
              "placementAuthorizationID",
              (data.authorizationID + this._openCard.getHasKey()).toString()
            );
            localStorage.setItem(
              "authorizationId",
              data.authorizationID + this._openCard.getHasKey()
            );
            let PSAPrintrequest = {
              authorizationID: data.authorizationID,
            };
            this._localValues.placementEventStatusValue =
              await this._openCard.getPSAPrintPreviewFormData(PSAPrintrequest);
            this._placement.storeSavedPlacementID(savedPlacementId);
            this._placement.storeSavedPlacementDetailID(savedPlacementDetailId);
            this._placementPrint.storeHistoryData();
            this.getPlacementAuthorizationId(data.placementDetailID);
            await this.saveAttendingSchoolForPlacement();
            this.placementSiblingsSave();
            this.ackOptionsComponent.getClientSchool();
            loader.style.display = "none";
            if (this.placementDateValidationStatus.includes(false)) {
              window.open(
                window.location.origin +
                  "/placement-date-validation/" +
                  window.location.search,
                "_blank",
                "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
              );
            } else {
              this.isAckOptions = true;
            }
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
          }
        });
      }
    } else {
      loader.style.display = "none";
      if (this.isPopup) {
        return this._message.add({
          severity: "Info",
          summary: "Please fill the mandatory fields!",
        });
      } else {
        return swal("Info", "Please fill the mandatory fields", "info");
      }
    }
  }

  navigateTo() {
    let currentURL = this._router.url.includes("?")
      ? this._router.url.split("?")[0]
      : this._router.url;
    if (
      currentURL ==
      "/reintegration/referral/opencard/placement/placementEvent/detail"
    ) {
      this.url = "/reports/attachment-document/rfc/placement-event";
    }

    return this._router.navigate([this.url]);
  }

  formValidation() {
    this.placementForm = this._fb.group({
      beginDate: [null],
    });
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case "procode":
        obj = "procode";
        break;
      case "provider":
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
      case "sRSServiceCode":
        obj = "sRSServiceCode";
        break;
      case "requestedBy":
        this.filteredRequestedType(event);
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      data.dropDown.map((item: any) => {
        item["procodeWithDesc"] = `${item.procode} - ${item.categoryOfService}`;
        item["fullName"] = `${item.lastName}, ${item.firstName}`;
      });
      this.metaData = data.dropDown;
    });
  }

  async generateUnitRate(event: any) {
    this.onSelectProcodeValidation(event);
    if (!event.requireSRSServiceCode) {
      this.isDCFServiceCodeDisabled = true;
    } else {
      this.isDCFServiceCodeDisabled = false;
    }
    let request = {
      procodeID: event.procodeID,
      isPlacement: true,
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._openCard.getHasKey(),
      beginDate: this.placement.beginDate,
      endDate: null,
    };
    // return this.auth.unitsPaidByPlacement = await this._openCard.getDefaultUnitsByProcode(request);
    this.auth.unitsPaidByPlacement =
      await this._openCard.getDefaultUnitsByProcode(request);
    this.newAuthEndDate = new Date(
      Date.parse(this.placement.beginDate) +
        this.auth.unitsPaidByPlacement * this._localValues.timeStampValueForDay
    );
    this.auth.endDate = this.newAuthEndDate;
    this.auth.unitsAuth = this.auth.unitsPaidByPlacement;
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
    console.log("aloneData" + id + "Index>>>", aloneData);
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
        placementID:
          parseInt(localStorage.getItem("placementID")) -
          this._openCard.getHasKey(),
        placementDetailID: parseInt(localStorage.getItem("placementDetailId")),
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
      console.log("Placement siblings update res", response);
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
        (this.sibs_data.remove !== "" || this.sibs_data.adds !== "") &&
        this.sibs_data.remove !== false &&
        this.sibs_data.adds !== false
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
    console.log("aloneData" + id + "Index>>>", aloneData);
    this.sibs_data = aloneData;
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
      referralID =
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
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
      if (
        this._router.url.includes(
          "/reintegration/referral/opencard/placement/placementEvent/new"
        )
      ) {
        if (this._localValues.currentPlacementProviderInfo) {
          this.placement.providerID = {
            providerID:
              this._localValues.currentPlacementProviderInfo.providerID,
            providerName:
              this._localValues.currentPlacementProviderInfo.providerName,
          };
        }
      }
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
    // this.placement.providerID = null;
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
        item["prBeginDate"] = `${new Date(item.PRBeginDate).toLocaleString()}`;
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
      if (item.ReasonForMove.toLowerCase().indexOf(event.query) !== -1) {
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
    this.filteredReleaseOfCustody = [];
    this.releaseOfcustody.filter((item: any) => {
      if (item.DCFReleasedOfCustody.indexOf(event.query) !== -1) {
        this.filteredReleaseOfCustody.push(item);
      }
    });
  }
  /** End: Dropdowns complete method */

  attendingSchoolFormValidation() {
    this.attendingSchoolForm = this._fb.group({
      clientSchoolID: [null],
      attendingSchoolBeginDate: [
        null,
        Validators.compose([Validators.required]),
      ],
      attendingSchoolEndDate: [null],
      schoolID: [null, Validators.compose([Validators.required])],
      attendingSchoolEnrolledBeginDate: [null],
      attendingSchoolenrolledEndDate: [null],
      attendingSchoolChangeReasonID: [
        null,
        Validators.compose([Validators.required]),
      ],
      notes: [null],
      referralID: [null],
    });
  }
  /*** Start: Get Attending and home school record list */
  addAttendingSchoolRecord() {
    if (this.attendingSchoolForm.valid) {
      !isNullOrUndefined(this.attendingSchool.schoolID)
        ? (this.attendingSchool.schoolID = Number(this.attendingSchool.schoolID)
            ? this.attendingSchool.schoolID
            : this.attendingSchool.schoolID.schoolID)
        : null;
      !isNullOrUndefined(this.attendingSchool.changeReasonID)
        ? (this.attendingSchool.changeReasonID = Number(
            this.attendingSchool.changeReasonID
          )
            ? this.attendingSchool.changeReasonID
            : this.attendingSchool.changeReasonID.changeReasonID)
        : null;
      this.attendingSchool.referralID =
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey();
      this.attendingSchool.clientID =
        parseInt(localStorage.getItem("clientId")) - this._openCard.getHasKey();
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
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
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

  getAttendingSchoolList() {
    this.attendingSchoolList = [];
    this.attendinSchoolListHeaders = [];
    let req = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
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
    this.isPlacementDateValidationOpen = false;
    let currentPlacmentID = this.currentPlacementId,
      currentReferralID =
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
      placementReferralReq = { referralID: currentReferralID },
      placementAuthReq = { placementDetailID: this.currentPlacementDetailId },
      placementDetailReq = { placementDetailID: this.currentPlacementDetailId },
      currentPlacementAuthID: number,
      loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.placementReq = { placementID: currentPlacmentID };
    this.placementEventReq = placementDetailReq;

    /** Get record from '/placement/getPlacement' API */
    this._placement
      .getPlacement(this.placementReq)
      .then((data: any) => {
        /** Date conversion for cms and ekidz data */
        this.placementEdit.providerID = data.placement
          ? data.placement.providerID
          : null;

        this.placementEdit.initiatedByStaffID =
          data.placement.initiatedByStaffID;
        this.placementEdit = data.placement;
        this.placementBeginDate = data.placement.beginDate;

        this.isPlacementEditFetched = true;

        this.disruptionDetail = data.disruptionDetails
          ? data.disruptionDetails
          : null;
        if (!this.disruptionDetail) {
          this.disruptionDetail = { otherOptOffered: "" };
        }

        this.setDisruptionInfo();
        this.beginDateBasedMasters(this.placementEdit.beginDate);
        this.behaviors = data.placement.behaviors;
      })

      /** Get record from  '/placement/getPlacementReferral' API */
      .then(() => {
        this._placement
          .getPlacementReferral(placementReferralReq)
          .then((data: any) => {
            this.placementEdit.placementReferral = data.placementReferral[0];
          });
      })

      /** Get record form '/placement/getReferralDates' API */
      .then(() => {
        this._placement
          .getReferralDates(placementReferralReq)
          .then((data: any) => {
            /** Need to valid isActive key */
            if (data.referralDates[0].IsActive) {
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
            } else {
              !isNullOrUndefined(data.referralDates[0].referralDate)
                ? (data.referralDates[0].referralDate = moment
                    .utc(data.referralDates[0].referralDate)
                    .format("MM/DD/YYYY HH:mm"))
                : null;
              !isNullOrUndefined(data.referralDates[0].paymentEndDate)
                ? (data.referralDates[0].paymentEndDate = moment
                    .utc(data.referralDates[0].paymentEndDate)
                    .format("MM/DD/YYYY HH:mm"))
                : null;
              !isNullOrUndefined(data.referralDates[0].retractedDate)
                ? (data.referralDates[0].retractedDate = moment
                    .utc(data.referralDates[0].retractedDate)
                    .format("MM/DD/YYYY HH:mm"))
                : null;
              !isNullOrUndefined(data.referralDates[0].withDrawDate)
                ? (data.referralDates[0].withDrawDate = moment
                    .utc(data.referralDates[0].withDrawDate)
                    .format("MM/DD/YYYY HH:mm"))
                : null;
              !isNullOrUndefined(data.referralDates[0].releaseDate)
                ? (data.referralDates[0].releaseDate = moment
                    .utc(data.referralDates[0].releaseDate)
                    .format("MM/DD/YYYY HH:mm"))
                : null;
              !isNullOrUndefined(data.referralDates[0].closureDate)
                ? (data.referralDates[0].closureDate = moment
                    .utc(data.referralDates[0].closureDate)
                    .format("MM/DD/YYYY HH:mm"))
                : null;
              !isNullOrUndefined(data.referralDates[0].dualAdj_BeginDate)
                ? (data.referralDates[0].dualAdj_BeginDate = moment
                    .utc(data.referralDates[0].dualAdj_BeginDate)
                    .format("MM/DD/YYYY HH:mm"))
                : null;
              !isNullOrUndefined(data.referralDates[0].dualAdj_EndDate)
                ? (data.referralDates[0].dualAdj_EndDate = moment
                    .utc(data.referralDates[0].dualAdj_EndDate)
                    .format("MM/DD/YYYY HH:mm"))
                : null;
              !isNullOrUndefined(data.referralDates[0].dCFPlanEndDate)
                ? (data.referralDates[0].dCFPlanEndDate = moment
                    .utc(data.referralDates[0].dCFBeginDate)
                    .format("MM/DD/YYYY HH:mm"))
                : null;
              !isNullOrUndefined(data.referralDates[0].dCFBeginDate)
                ? (data.referralDates[0].dCFBeginDate = moment
                    .utc(data.referralDates[0].dCFBeginDate)
                    .format("MM/DD/YYYY HH:mm"))
                : null;
              !isNullOrUndefined(data.referralDates[0].recidivistDate)
                ? (data.referralDates[0].recidivistDate = moment
                    .utc(data.referralDates[0].recidivistDate)
                    .format("MM/DD/YYYY HH:mm"))
                : null;
              !isNullOrUndefined(data.referralDates[0].recidivistDateOverride)
                ? (data.referralDates[0].recidivistDateOverride = moment
                    .utc(data.referralDates[0].recidivistDateOverride)
                    .format("MM/DD/YYYY HH:mm"))
                : null;
            }
            this.placementEdit.referralDates = data.referralDates[0];
            this.placementEditDates = this.placementEdit.referralDates;
            this.placementEditDates.referralDate = !isNullOrUndefined(
              this.placementEditDates.referralDate
            )
              ? new Date(this.placementEditDates.referralDate)
              : null;
            this.placementEditDates.paymentEndDate = !isNullOrUndefined(
              this.placementEditDates.paymentEndDate
            )
              ? new Date(this.placementEditDates.paymentEndDate)
              : null;
            this.placementEditDates.retractedDate = !isNullOrUndefined(
              this.placementEditDates.retractedDate
            )
              ? new Date(this.placementEditDates.retractedDate)
              : null;
            this.placementEditDates.withDrawDate = !isNullOrUndefined(
              this.placementEditDates.withDrawDate
            )
              ? new Date(this.placementEditDates.withDrawDate)
              : null;
            this.placementEditDates.releaseDate = !isNullOrUndefined(
              this.placementEditDates.releaseDate
            )
              ? new Date(this.placementEditDates.releaseDate)
              : null;
            this.placementEditDates.closureDate = !isNullOrUndefined(
              this.placementEditDates.closureDate
            )
              ? new Date(this.placementEditDates.closureDate)
              : null;
            this.placementEditDates.dualAdj_BeginDate = !isNullOrUndefined(
              this.placementEditDates.dualAdj_BeginDate
            )
              ? new Date(this.placementEditDates.dualAdj_BeginDate)
              : null;
            this.placementEditDates.dualAdj_EndDate = !isNullOrUndefined(
              this.placementEditDates.dualAdj_EndDate
            )
              ? new Date(this.placementEditDates.dualAdj_EndDate)
              : null;

            this.placementEditDates.dCFBeginDate = !isNullOrUndefined(
              this.placementEditDates.dCFBeginDate
            )
              ? new Date(this.placementEditDates.dCFBeginDate)
              : null;
            this.placementEditDates.dCFPriorMoves = !isNullOrUndefined(
              this.placementEditDates.dCFPriorMoves
            )
              ? this.placementEditDates.dCFPriorMoves
              : null;
            this.placementEditDates.recidivistDate = !isNullOrUndefined(
              this.placementEditDates.recidivistDate
            )
              ? new Date(this.placementEditDates.recidivistDate)
              : null;
            this.placementEditDates.recidivistDateOverride = !isNullOrUndefined(
              this.placementEditDates.recidivistDateOverride
            )
              ? new Date(this.placementEditDates.recidivistDateOverride)
              : null;
            this.isReferralDatesFetched = true;
          });
      })

      /** Get record from '/placement/getReminder' API */
      .then(() => {
        this._placement.getRemainder(this.placementReq).then((data: any) => {
          this.placementEdit.reminderNote = data.reminder[0].ReminderNotes;
        });
      })

      /** Get record from '/placement/getRespiteAuthorization' API  */
      .then(() => {
        this._placement
          .getRespiteAuthorization(this.placementReq)
          .then((data: any) => {
            data.respiteAuthorization.filter((item: any) => {
              item.beginDate = this._localValues.stringFormatDatetime(
                item.beginDate
              );
              item.endDate = this._localValues.stringFormatDatetime(
                item.endDate
              );
              item.enteredDate = this._localValues.stringFormatDatetime(
                item.enteredDate
              );
              item.changedDate = this._localValues.stringFormatDatetime(
                item.changedDate
              );
              this.placementEdit.respiteAuthorization = item;
            });
          });
      })

      /** Get record from '/placement/getPlacementAuthorization' API */
      .then(() => {
        this._placement
          .getPlacementAuthorization(placementAuthReq)
          .then((data: any) => {
            this.placementEdit.placementAuthorization =
              data.placementAuthorization;
            if (this.placementEdit.placementAuthorization.length > 0) {
              currentPlacementAuthID =
                this.placementEdit.placementAuthorization[0].authorizationID;
              this.placementEdit.placementAuthorization =
                data.placementAuthorization.sort(this.sortDates).reverse();
            }
          })

          /** Get record from '' API */
          .then(() => {
            if (this.placementEdit.placementAuthorization.length > 0) {
              this._placement
                .getPlacementClaim({ authorizationID: currentPlacementAuthID })
                .then((data: any) => {
                  this.placementEdit.placementClaims = data.placementClaim;
                });
            }
          });
      })

      /** Get record from  '/placementDetail/getById' API */
      .then(() => {
        this._placement
          .getPlacementDetailInfo(placementDetailReq)
          .then(async (data: any) => {
            localStorage.setItem(
              "authorizationId",
              data.placementDetail.authorizationID + this._openCard.getHasKey()
            );
            localStorage.setItem(
              "placementID",
              data.placementDetail.placementID.placementID +
                this._openCard.getHasKey()
            );
            localStorage.setItem(
              "placementDetailID",
              data.placementDetail.placementDetailID
            );

            let providerName = data.placementDetail.providerID
              ? data.placementDetail.providerID.providerName
              : "";
            loader.style.display = "none";
            // this.placementEditMode.siblingReasonID =
            //   data.placementDetail.siblingReasonID;
            this.isEdit = true;
            this.isReferralDateFieldsDiabled = true;
            this.editForm.disable();
            this.isDataFetchCompleted = true;
            this.getPlacementSiblingsList();
            let PSAPrintrequest = {
              authorizationID: data.placementDetail.authorizationID,
            };
            this._localValues.placementEventStatusValue =
              await this._openCard.getPSAPrintPreviewFormData(PSAPrintrequest);
            /** Function For function */
            this.placementEdit.placementDetail = data.placementDetail;
            this._localValues.placementEventInfo = data.placementDetail;

            this.isFormLog = true;
            this.formLogInfo.changedBy = !isNullOrUndefined(
              data.placementDetail.changedBy
            )
              ? data.placementDetail.changedBy
              : "------";
            this.formLogInfo.changedDate = !isNullOrUndefined(
              data.placementDetail.changedDate
            )
              ? moment(data.placementDetail.changedDate).format(
                  "MM/DD/YYYY hh:mm:ss A"
                )
              : "--:--:-- --";
            this.formLogInfo.enteredBy = !isNullOrUndefined(
              data.placementDetail.enteredBy
            )
              ? data.placementDetail.enteredBy
              : "------";
            this.formLogInfo.enteredDate = !isNullOrUndefined(
              data.placementDetail.enteredDate
            )
              ? moment(data.placementDetail.enteredDate).format(
                  "MM/DD/YYYY hh:mm:ss A"
                )
              : "--:--:-- --";

            this.isPlacementDetailFetched = true;
            localStorage.setItem(
              "placementAuthorizationID",
              (
                data.placementDetail.authorizationID +
                this._openCard.getHasKey()
              ).toString()
            );
            this.validateDcfCustodyInfo();
            console.log(
              " this.placementEdit =====>>>>>>> is",
              this.placementEdit
            );
            this.placementEdit.reasonForMoveID =
              this.placementEdit.placementDetail.reasonForMoveID;
            this.placementEditMode = this.placementEdit.placementDetail;
            this.placementEdit.placementDetail["sRSServiceCodeID"] = this
              .placementEdit.placementDetail.sRSServiceCodeID
              ? this.placementEdit.placementDetail.sRSServiceCodeID
              : null;
            // if (this.placementEdit.reasonForMoveID) {
            //   this.placementEdit.reasonForMoveID[
            //     "reasonForMove"
            //   ] = this.placementEdit.reasonForMoveID.reasonForMove;
            // } else {
            //   this.placementEdit["reasonForMoveID"] = null;
            // }

            this.placementEdit.beginDate = !isNullOrUndefined(
              data.placementDetail.beginDate
            )
              ? new Date(data.placementDetail.beginDate)
              : null;
            this.placementEdit.endDate = !isNullOrUndefined(
              data.placementDetail.endDate
            )
              ? new Date(data.placementDetail.endDate)
              : null;

            if (this.placementEdit.placementDetail.sfanotes) {
              this.placementEdit.placementDetail["SFANotes"] =
                this.placementEdit.placementDetail.sfanotes;
            }

            if (this.placementEdit.placementDetail.sibsAffectedByMove) {
              this.placementEdit.placementDetail["sibsAffectedbyMove"] =
                this.placementEdit.placementDetail.sibsAffectedByMove;
            }

            // (this.placementDetail.dcfplanEndDate !== null || this.placementDetail.dcfplanEndDate !== undefined) ? this.placementDetail.dcfplanEndDate =  this._localValues.stringFormatDatetime(
            //   Date.parse(this.placementDetail.dcfplanEndDate)) : this.placementDetail.dcfplanEndDate =  null;
            if (
              this.placementEdit.placementDetail
                .dcfreleasedOfCustodyOverrideDate
            ) {
              this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideDate =
                new Date(
                  this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideDate
                );
            }

            if (this.placementEdit.placementDetail.dcfreleasedOfCustodyDate) {
              this.placementEdit.placementDetail.dcfreleasedOfCustodyDate =
                new Date(
                  this.placementEdit.placementDetail.dcfreleasedOfCustodyDate
                );
            }
            if (this.placementEdit.placementDetail.dcfplanEndDateOverride) {
              this.placementEdit.placementDetail.dcfplanEndDateOverride =
                new Date(
                  this.placementEdit.placementDetail.dcfplanEndDateOverride
                );
            }

            if (this.placementEdit.placementDetail.retHomeWCustodyDate) {
              this.placementEdit.placementDetail.retHomeWCustodyDate = new Date(
                this.placementEdit.placementDetail.retHomeWCustodyDate
              );
            }

            if (this.placementEdit.placementDetail.jjadate) {
              this.placementEditMode["jjaDate"] = this.placementEdit
                .placementDetail.jjadate
                ? new Date(this.placementEdit.placementDetail.jjadate)
                : null;
            }

            if (this.placementEdit.placementDetail.dcfplanEndDate) {
              this.placementEditDates["dCFPlanEndDate"] = this.placementEdit
                .placementDetail.dcfplanEndDate
                ? new Date(this.placementEdit.placementDetail.dcfplanEndDate)
                : null;
            } else {
              this.placementEditDates["dCFPlanEndDate"] = null;
            }

            if (this.placementEdit.placementDetail.dcfplanEndDateOverride) {
              this.placementEditMode["dcfplanEndDateOverride"] = this
                .placementEdit.placementDetail.dcfplanEndDateOverride
                ? new Date(
                    this.placementEdit.placementDetail.dcfplanEndDateOverride
                  )
                : null;
            }

            if (this.placementEdit.placementDetail.changeOfVenueDate) {
              this.placementEdit.placementDetail.changeOfVenueDate = new Date(
                this.placementEdit.placementDetail.changeOfVenueDate
              );
            }
            if (this.placementEdit.placementDetail.retHomeWOCustodyDate) {
              this.placementEdit.placementDetail.retHomeWOCustodyDate =
                new Date(
                  this.placementEdit.placementDetail.retHomeWOCustodyDate
                );
            }

            if (this.placementEdit.placementDetail.formReceivedDate) {
              this.placementEdit.placementDetail.formReceivedDate =
                !isNullOrUndefined(
                  this.placementEdit.placementDetail.formReceivedDate
                )
                  ? new Date(
                      this.placementEdit.placementDetail.formReceivedDate
                    )
                  : null;
            }

            this.placementEdit.placementDetail.clientID =
              this.placementEdit.placementDetail.clientID.clientID;
            this.placementEdit.placementDetail.placementID =
              this.placementEdit.placementDetail.placementID.placementID;
            this.placementEdit.placementDetail.providerID =
              this.placementEdit.placementDetail.providerID.providerID;
            this.placementEdit.placementDetail["referralID"] = this
              .placementEdit.placementDetail.referralID
              ? this.placementEdit.placementDetail.referralID.referralID
              : null;

            this.placementEditMode = this.placementEdit.placementDetail;
            console.log("this.placementEditMode is", this.placementEditMode);
            this.makeReasonForChangeFieldsMandatoryInEditMode();
            // if (data.placementDetail.providerID) {
            //   if (data.placementDetail.providerID) {
            //     let providerLocationRequest = {
            //       providerID: data.placementDetail.providerID,
            //     };
            //     this._placement
            //       .getProviderLocationInfo(providerLocationRequest)
            //       .then((data: any) => {
            //         const loader = document.getElementById(
            //           "loading-overlay"
            //         ) as HTMLElement;
            //         loader.style.display = "block";
            //         if (data.providerolcation.length > 0) {
            //           let providerAddress,
            //             providerPhone,
            //             providerCity,
            //             providerZipCode,
            //             providerState;
            //           const providerLengthIndex =
            //             data.providerolcation.length - 1;

            //           !isNullOrUndefined(
            //             data.providerolcation[providerLengthIndex].address1
            //           )
            //             ? (providerAddress =
            //                 data.providerolcation[providerLengthIndex].address1)
            //             : null;
            //           !isNullOrUndefined(
            //             data.providerolcation[providerLengthIndex].phone
            //           )
            //             ? (providerPhone =
            //                 data.providerolcation[providerLengthIndex].phone)
            //             : null;
            //           !isNullOrUndefined(
            //             data.providerolcation[providerLengthIndex].city
            //           )
            //             ? (providerCity =
            //                 data.providerolcation[providerLengthIndex].city)
            //             : null;
            //           !isNullOrUndefined(
            //             data.providerolcation[providerLengthIndex].zipCode
            //           )
            //             ? (providerZipCode =
            //                 data.providerolcation[providerLengthIndex].zipCode)
            //             : null;
            //           !isNullOrUndefined(
            //             data.providerolcation[providerLengthIndex].abbreviation
            //           )
            //             ? (providerState =
            //                 data.providerolcation[0].abbreviation)
            //             : null;

            //           this.providerFullAddress =
            //             providerAddress +
            //             ", " +
            //             providerCity +
            //             providerState +
            //             ", " +
            //             providerZipCode;
            //           this._localValues.currentPlacementProviderLocation = this.providerFullAddress;
            //           loader.style.display = "none";
            //         }
            //       });
            //   }
            // }

            //

            const request = {
              beginDate: data.placementDetail.beginDate,
              referralTypeID:
                parseInt(localStorage.getItem("referralTypeId")) -
                this._openCard.getHasKey(),
              beginPagination: 1,
              endPagination: 100,
              value: providerName || "",
            };
            const response = await this._openCard.placementProviders(request);
            if (response.length > 0) {
              this.providerFullAddress = response[0].address;
              this._localValues.currentPlacementProviderLocation =
                this.providerFullAddress;
            }

            loader.style.display = "none";
          })
          .catch(() => {
            loader.style.display = "none";
          });
      });
    this.autoFetchPaymentEndDate(
      this.placementEdit.beginDate,
      this.placementDetail.procodeID
    );
  }
  getPreviousPlacementProviderName() {
    let req = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
      placementID:
        this.currentPlacementId || this._placement.getSavedPlacementId(),
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._openCard.getHasKey(),
      beginDate: this.placementEdit.beginDate || this.placement.beginDate,
    };
    this._openCard.getPreviousPlacementProvider(req).then((data: any) => {
      if (data.previousPlacementProvider) {
        this.previousPlacementProviderName =
          data.previousPlacementProvider[0].providerName;
        this.previuousPlacementID =
          data.previousPlacementProvider[0].placementID;
      } else {
        this.previousPlacementProviderName = "";
        this.previuousPlacementID = null;
      }
    });
  }

  setDisruptionInfo() {
    console.log("disruptionDetail is", this.disruptionDetail);
    if (this.disruptionDetail) {
      // this.placementEditMode.disruption = false;
      this.disruptionForm.enable();
      if (this.disruptionDetail.prev_PlacementID) {
        this.disruptionInfoprev_PlacementID = this.disruptionDetail
          .prev_PlacementID.providerID
          ? this.disruptionDetail.prev_PlacementID.providerID.providerName
          : null;
      }
      this.isDisruptionEnable = true;
      this.getPreviousPlacementProviderName();

      this.disruptionInfoOtherOptionsOffered =
        this.disruptionDetail.otherOptOffered;
      this.disruptionInfoDisruptionReason =
        this.disruptionDetail.disruptionReasonID;
      this.disruptionInfoDisruptionType =
        this.disruptionDetail.disruptionTypeID;
      this.disruptionInfoRequestedType = this.disruptionDetail.providerID;
      this.disruption.staffID = this.disruptionDetail.staffID;
      this.disruptionEditProviderType = this.disruptionDetail.providerID;
      if (this.disruptionDetail.staffID) {
        this.isRequestedByProviderEnable = false;
        this.disruptionInfoRequestedType = { view: "Staff", value: "staff" };
      } else {
        this.isRequestedByProviderEnable = true;
        this.disruptionInfoRequestedType = {
          view: "Provider",
          value: "provider",
        };
      }
    } else {
      this.disruptionInfoprev_PlacementID = null;
      this.disruptionInfoOtherOptionsOffered = null;
      this.disruptionInfoDisruptionReason = null;
      this.disruptionInfoDisruptionType = null;
      this.disruptionInfoRequestedType = null;
      this.disruptionInfoRequestedStaff = null;
      this.disruptionEditProviderType = null;
    }

    console.log(
      "disruptionInfoRequestedStaff is",
      this.disruptionInfoRequestedStaff
    );
  }

  defineEditTabs() {
    return (this.editTabs = [
      { label: "Notes", href: "#nav-edit1" },
      { label: "Sibs In OOH", href: "#nav-edit5" },
      { label: "School", href: "#nav-edit6" },
      { label: "Notification Type", href: "#nav-edit7" },
      { label: "Section 6", href: "#nav-edit8" },
      { label: "Referral Dates", href: "#nav-edit2" },
      { label: "Sibs at Home", href: "#nav-edit9" },
    ]);
  }

  editFormValidation() {
    this.editForm = this._fb.group({
      editBeginDate: [null],
      editEndDate: [null],
      placementReferral: [null],
      reasonForMoveID: [null],
      initiatedByStaffID: [null],
      behaviors: [null],
      reasonForMove_PR: [null],
      notes: [null],
      reminderNote: [null],
      receivedFormDate: [null],
      placementLocation: [null],
      editProcedureCode: [null],
      editDCFServiceCode: [null],
      editProvider: [null],
      editReasonForChange: [null],
      editFormClarification: [null],
      editAdditionalInformation: [null],
      editSFCSNotes: [null],
      editReferralDate: [null],
      editPayementEndDate: [null],
      editReferralRetractedDate: [null],
      editRetractedReason: [null],
      editReferralWithdrawDate: [null],
      editWithdrawReason: [null],
      editReferralReleaseDate: [null],
      editReleaseReason: [null],
      editReferralClosureDate: [null],
      editReferralClosureReason: [null],
      editDuallyADJBeginDate: [null],
      editDuallyAJEndDate: [null],
      editPlanEndDate: [null],
      editDCFBeginDate: [null],
      editDCFPriorMoves: [null],
      editRecidivistDate: [null],
      editRecidivistOverride: [null],
      editHasSiblingInOOHPlacement: [null],
      editPlacedWithAtleastOneSiblings: [null],
      editReasonNotPlacedTogether: [null],
      editSiblingAffectedByThisMove: [null],
      editReinstatement: [null],
      editInitial: [null],
      editFormControlName: [null],
      editCorrectedCopy: [null],
      editAwol: [null],
      editTrialHomePlacement: [null],
      editPlannedMove: [null],
      editOther: [null],
      editDisruption: [null],
      editPreviousPlacementProviderName: [null],
      editBehaviorsPR: [null],
      editSectionSixPlanEndDate: [null],
      editNewDCFReferral: [null],
      editOverrideROCReason: [null],
      editOverrideROC: [null],
      editOverridePEDReason: [null],
      editOverridePED: [null],
      editReleasedOfCustody: [null],
      editReleasedOfCustodyDate: [null],
      editReturnedHome: [null],
      editReturnedHomeNotReleased: [null],
      editTransferToJJA: [null],
      editTransferToJJADate: [null],
      editVenueChange: [null],
      editVenueChangeDate: [null],
      editSectionSevenName: [null],
      editSectionSevenDOB: [null],
      editSectionSevenClientId: [null],
      editSectionSevenEffectiveDate: [null],
      editSectionSevenAdds: [null],
      editSectionSevenRemoves: [null],
      requestedByType: [null],
      requestedByStaff: [null],
      requestedByProvider: [null],
    });
  }

  editReleaseMode() {
    this.isEdit = false;
    this.editForm.enable();
  }

  getMoveEvents() {
    let req = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
      unassignedOnly: true,
    };
    this._placement.getMoveEvent(req).then((data: any) => {
      this.moveEvents = data.moveEvent;
    });
  }

  filteredMoveEvents(event: any) {
    this.filteredMoveEventsData = [];
    this.moveEvents.filter((item: any) => {
      if (item.providerName.indexOf(event.query) !== -1) {
        this.filteredMoveEventsData.push(item);
      }
    });
  }

  /** Get the referral dates wizard data in save mode */

  getReferralDates() {
    let referralDateReq = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._openCard.getHasKey(),
      },
      convertedDates;
    this._placement.getReferralDates(referralDateReq).then((data: any) => {
      this.referralDates.closureDate = !isNullOrUndefined(
        data.referralDates[0].closureDate
      )
        ? new Date(data.referralDates[0].closureDate)
        : null;
      this.referralDates.dCFBeginDate = !isNullOrUndefined(
        data.referralDates[0].dCFBeginDate
      )
        ? new Date(data.referralDates[0].dCFBeginDate)
        : null;
      this.referralDates.dCFPlanEndDate = !isNullOrUndefined(
        data.referralDates[0].dCFPlanEndDate
      )
        ? new Date(data.referralDates[0].dCFPlanEndDate)
        : null;
      this.referralDates.dualAdjBeginDate = !isNullOrUndefined(
        data.referralDates[0].dualAdj_BeginDate
      )
        ? new Date(data.referralDates[0].dualAdj_BeginDate)
        : null;
      this.referralDates.dualAdjEndDate = !isNullOrUndefined(
        data.referralDates[0].dualAdj_EndDate
      )
        ? new Date(data.referralDates[0].dualAdj_EndDate)
        : null;
      this.referralDates.paymentEndDate = !isNullOrUndefined(
        data.referralDates[0].paymentEndDate
      )
        ? new Date(data.referralDates[0].paymentEndDate)
        : null;
      this.referralDates.recidivistDate = !isNullOrUndefined(
        data.referralDates[0].recidivistDate
      )
        ? new Date(data.referralDates[0].recidivistDate)
        : null;
      this.referralDates.recidivistDateOverride = !isNullOrUndefined(
        data.referralDates[0].recidivistDateOverride
      )
        ? new Date(data.referralDates[0].recidivistDateOverride)
        : null;
      this.referralDates.referralDate = !isNullOrUndefined(
        data.referralDates[0].referralDate
      )
        ? new Date(data.referralDates[0].referralDate)
        : null;
      this.referralDates.releaseDate = !isNullOrUndefined(
        data.referralDates[0].releaseDate
      )
        ? new Date(data.referralDates[0].releaseDate)
        : null;
      this.referralDates.retractedDate = !isNullOrUndefined(
        data.referralDates[0].retractedDate
      )
        ? new Date(data.referralDates[0].retractedDate)
        : null;
      this.referralDates.withDrawDate = !isNullOrUndefined(
        data.referralDates[0].withDrawDate
      )
        ? new Date(data.referralDates[0].withDrawDate)
        : null;
    });
  }

  onChangeExceptionRateAutofecth() {
    this.authException.exceptionPayorRate =
      this.authException.originalPayorRate;
    this.authException.exceptionProviderRate =
      this.authException.originalProviderRate;
  }

  deleteRecord() {
    console.log("delete record called");
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {
      placementDetailID: this.currentPlacementDetailId,
    };
    this._placement.deletePlacementEvent(req).then((data: any) => {
      if (data.responseStatus) {
        swal("Delete", "Placement Event has been deleted", "success");
        this._router.navigate([
          "/reintegration/referral/opencard/placement/placementEvent/view",
        ]);
      }
      loader.style.display = "none";
    });
  }

  /**Data for ackowledgement option window */
  async getAcknowledgementDetails(authID: any) {
    let referralBasedReq = {},
      authorizationReq = {},
      result: any;
    referralBasedReq = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
    };
    authorizationReq = { authorizationID: authID };
    if (authID) {
      await this._openCard
        .getCaseManagerList(authorizationReq)
        .then((data: any) => {
          this.caseManagerList = data.caseManagerList;
        });
    }

    await this._openCard.getCaseManagerChangeReasonList().then((data: any) => {
      this.caseManagerChangeReasonList = data.changeReasonList;
    });
    if (authID) {
      await this._openCard.getJudgeList(authorizationReq).then((data: any) => {
        this.judgeList = data.judgeList;
      });
    }

    await this._openCard
      .getOpenSchoolList(referralBasedReq)
      .then((data: any) => {
        this.schoolList = data.schoolList;
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
  }

  disableAck() {
    this.isAckOptions = false;
  }

  async getPlacementAuthorizationId(placementDetailID) {
    let req = {
      placementDetailID: placementDetailID,
    };
    await this._placement.getPlacementAuthorization(req).then((data: any) => {
      if (data.placementAuthorization) {
        this.authId =
          data.placementAuthorization.length > 0
            ? data.placementAuthorization[0].authorizationID
            : null;
      } else {
        this.authId = null;
      }
      if (this.authId) {
        this.getAcknowledgementDetails(this.authId).then((data: any) => {});
      }
    });
  }

  validateDcfCustodyInfo() {
    if (
      this.placementEdit.placementDetail &&
      this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID
    ) {
      this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID == 1
        ? (this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID = {
            DCFReleasedOfCustodyOverride: "Ignore ROC Date",
          })
        : null;
      this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID == 2
        ? (this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID = {
            DCFReleasedOfCustodyOverride: "6 Month Rule",
          })
        : null;
    }
    if (
      this.placementEdit.placementDetail &&
      this.placementEdit.placementDetail.dcfplanEndDateOverrideID
    ) {
      this.placementEdit.placementDetail.dcfplanEndDateOverrideID
        ? (this.placementEdit.placementDetail.dcfplanEndDateOverrideID = {
            PlanEndDateOverride: "Ignore PED Date",
          })
        : null;
    }
  }

  getPlacementProcodes(event: any, label: any) {
    let req = {
      beginDate: this.placementEdit.beginDate,
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._openCard.getHasKey(),
      beginPagination: 1,
      endPagination: 100,
      sort: {
        column: "procode",
        mode: "ASC",
      },
      value: event.query,
    };
    this._openCard.getPlacementProcodes(req).then((data: any) => {
      this.metaData = data.procodeList;
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
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
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

  async filterPlacemetProviders(event: any) {
    let request = {
      beginDate: this.placement.beginDate,
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._openCard.getHasKey(),
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
    let referralId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._openCard.getHasKey();
    if (referralId === 12) {
      return (this.respite.unitsPerMonth = 1);
    } else {
      return (this.respite.unitsPerMonth = 2);
    }
  }

  async checkHasSiblinginOOHPlacement() {
    let response: any;
    let request = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
      clientID:
        parseInt(localStorage.getItem("clientId")) - this._openCard.getHasKey(),
      beginDate: this.placement.beginDate,
    };
    response = await this._openCard.placementHasSiblinginOOHPlacement(request);
    if (response.NUM_OOH > 0 && response.NUM_OOH !== null) {
      return (this.placementDetail.isSibOOH = true);
    } else {
      return (this.placementDetail.isSibOOH = false);
    }
  }

  async onFilteredPlacementProcode(event: any) {
    let request = {
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._openCard.getHasKey(),
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

  onProviderSelect(event: any) {
    this.auth.sponsorID = event.SponsorID;
    event.PaySponsor
      ? (this.auth.paySponsor = true)
      : (this.auth.paySponsor = false);
    return (this.placementDetail.providerLocationID = event.ProviderLocationID);
  }

  discardTo() {
    return this._router.navigate([this._localValues.previousurl]);
  }
  getCountOfPlacementDetail() {
    let req = {
      placementID:
        parseInt(localStorage.getItem("placementID")) -
        this._openCard.getHasKey(),
    };
    this._openCard.getPlacementDetailCount(req);
  }

  async saveAttendingSchoolForPlacement() {
    let clientSchoolsObj = [];
    console.log("New Attending school list", this.newAttendingSchoolList);
    this.newAttendingSchoolList.filter((item: any) => {
      let schoolObj = {
        beginDate: !isNullOrUndefined(item.beginDate)
          ? this._localValues.stringFormatDatetime(item.beginDate)
          : null,
        endDate: !isNullOrUndefined(item.endDate)
          ? this._localValues.stringFormatDatetime(item.endDate)
          : null,
        schoolID: item.schoolID,
        enrolledBeginDate: !isNullOrUndefined(item.enrolledBeginDate)
          ? this._localValues.stringFormatDatetime(item.enrolledBeginDate)
          : null,
        enrolledEndDate: !isNullOrUndefined(item.enrolledEndDate)
          ? this._localValues.stringFormatDatetime(item.enrolledEndDate)
          : null,
        changeReasonID:
          item.changeReasonID !== null && item.changeReasonID !== undefined
            ? item.changeReasonID
            : null,
        notes: item.notes,
        clientSchoolID: item.clientSchoolID,
      };
      clientSchoolsObj.push(schoolObj);
    });
    let clientSchoolReq = {
      clientSchools: clientSchoolsObj,
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
      clientID:
        parseInt(localStorage.getItem("clientId")) - this._openCard.getHasKey(),
      placementID:
        parseInt(localStorage.getItem("placementID")) -
        this._openCard.getHasKey(),
      dateOfChange: this._localValues.stringFormatDatetime(
        new Date().getTime()
      ),
    };
    let response = await this._openCard.savePlacementClientSchool(
      clientSchoolReq
    );
    swal("Info", response, "info");
  }

  newAuthEndDate: Date;
  onAuthorizationUnitsChanged() {
    this.newAuthEndDate = new Date(
      Date.parse(this.placement.beginDate) +
        this.auth.unitsPaidByPlacement * this._localValues.timeStampValueForDay
    );
    this.auth.endDate = this.newAuthEndDate;
    this.auth.unitsAuth = this.auth.unitsPaidByPlacement;
    this.auth.unitsPaidByPlacement = this.auth.unitsPaidByPlacement.toFixed(2);
  }

  async getPlacementSiblingsList() {
    let request = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
      clientID:
        parseInt(localStorage.getItem("clientId")) - this._openCard.getHasKey(),
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
      placementID:
        parseInt(localStorage.getItem("placementID")) -
        this._openCard.getHasKey(),
      placementDetailID: parseInt(localStorage.getItem("placementDetailId")),
      sibsInHomeList: sibsList,
    };
    console.log("Placement sibilings save req", request);
    let response = await this._openCard.savePlacementSiblingsSave(request);
    console.log("Placement sibling ssave response", response);
  }

  async getSiblingsPlacementSibling() {
    this.sibis_list = [];
    let request = {
      placementID:
        parseInt(localStorage.getItem("placementID")) -
        this._openCard.getHasKey(),
      placementDetailID: parseInt(localStorage.getItem("placementDetailId")),
      beginPagination: 1,
      endPagination: 100,
    };
    let response = await this._openCard.getPlacementSiblingsList(request);
    console.log("Siblings Response", response);
    if (response.placementSiblings.length < 0) {
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
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
      procodeID: event.procodeID,
    };
    let response = await this._openCard.procodeValidation(request);
    if (!response.responseStatus) {
      swal("Info", `${response.responseMessage}`, "info");
      delete this.placementDetail.procodeID;
    }
    this.basedChildDeathProcodeReferralDateUpdate(event);
  }

  getClaimsList(currentPlacementAuthID) {
    this._placement
      .getPlacementClaim({ authorizationID: currentPlacementAuthID })
      .then((data: any) => {
        this.placementEdit.placementClaims = data.placementClaim;
      });
  }

  /**
   *
   *
   */
  public async onClickPlacementUpdateValidation() {
    return this.placementEventUpdate();
  }

  public async placementEventUpdate() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    await this.placementClaimValidation();
    loader.style.display = "block";
    /** Placement event update */
    this.disruption["changedBy"] = this.disruption.enteredBy;
    this.disruption["changedDate"] = this.disruption.enteredDate;
    // delete this.disruption.enteredBy;
    // delete this.disruption.placementID;
    // delete this.disruption.enteredDate;
    // delete this.disruption.providerID;
    /** For disruption  */
    this.disruption.disruptionReasonID = !isNullOrUndefined(
      this.disruptionInfoDisruptionReason
    )
      ? this.disruptionInfoDisruptionReason.DisruptionReasonID
      : null;
    this.disruption.disruptionTypeID = !isNullOrUndefined(
      this.disruptionInfoDisruptionType
    )
      ? this.disruptionInfoDisruptionType.DisruptionTypeID
      : null;
    this.disruption.providerID = !isNullOrUndefined(this.disruption.providerID)
      ? this.disruption.providerID.providerID
      : null;
    // this.disruption.staffID = !isNullOrUndefined(this.disruption.staffID)
    //   ? this.disruption.staffID.StaffID
    //   : null;
    this.disruption.enteredBy = localStorage.getItem("UserEmail")
      ? localStorage.getItem("UserEmail").split("@"[0])
      : "Admin";
    this.disruption.enteredDate = this._localValues.stringFormatDatetime(
      Date.now()
    );
    this.disruption.prev_PlacementID = 2;
    this.auth["authorizationID"] = 1;
    this.auth["payorRate"] = 1;
    this.auth["providerRate"] = 1;
    this.placementEdit.placementDetail.dcfreleasedOfCustodyID =
      !isNullOrUndefined(this.placementEditMode.dcfreleasedOfCustodyID)
        ? this.placementEditMode.dcfreleasedOfCustodyID.DCFReleasedOfCustodyID
        : null;
    this.placementDetail["addInfo"] =
      this.placementEdit.placementDetail.addInfo;
    this.placementDetail["clarification"] =
      this.placementEdit.placementDetail.clarification;
    this.placementDetail["placementDetailID"] =
      this.placementEdit.placementDetail.placementDetailID;
    this.placementDetail["SFANotes"] =
      this.placementEdit.placementDetail.SFANotes;

    this.respite["changedBy"] = this.respite.enteredBy;
    this.respite["changedDate"] = this.respite.enteredDate;
    delete this.respite.enteredBy;
    delete this.respite.enteredDate;
    !this.respite.unitsPerMonth ? (this.respite.unitsPerMonth = 0) : null;
    // source.placementID = this.currentPlacementId;
    !isNullOrUndefined(this.placementEdit.reasonForMoveID)
      ? (this.placementEdit.reasonForMoveID.reasonForMove =
          this.placementEdit.reasonForMoveID["reasonForMove"])
      : null;

    !isNullOrUndefined(this.placementEdit.placementDetail)
      ? (this.placementEdit.placementDetail.sfanotes =
          this.placementEditMode["SFANotes"])
      : null;

    !isNullOrUndefined(this.placementEdit.placementDetail)
      ? (this.placementEdit.placementDetail.sibsAffectedByMove =
          this.placementEditMode["sibsAffectedbyMove"])
      : null;
    // !isNullOrUndefined(this.placementEdit.placementDetail.dcfplanEndDate)
    //   ? (this.placementEdit.placementDetail.dcfplanEndDate = this._localValues.stringFormatDatetime(
    //       Date.parse(this.placementEditMode.dcfplanEndDate)
    //     ))
    //   : null;
    !isNullOrUndefined(
      this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideDate
    )
      ? (this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.placementEditMode.dcfreleasedOfCustodyOverrideDate)
          ))
      : null;
    !isNullOrUndefined(
      this.placementEdit.placementDetail.dcfreleasedOfCustodyDate
    )
      ? (this.placementEdit.placementDetail.dcfreleasedOfCustodyDate =
          this._localValues.stringFormatDatetime(
            this.placementEditMode.dcfreleasedOfCustodyDate
          ))
      : null;
    !isNullOrUndefined(
      this.placementEdit.placementDetail.dcfplanEndDateOverride
    )
      ? (this.placementEdit.placementDetail.dcfplanEndDateOverride =
          this._localValues.stringFormatDatetime(
            Date.parse(this.placementEditMode.dcfplanEndDateOverride)
          ))
      : null;
    !isNullOrUndefined(this.placementEdit.placementDetail.retHomeWCustodyDate)
      ? (this.placementEdit.placementDetail.retHomeWCustodyDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.placementEditMode.retHomeWCustodyDate)
          ))
      : null;
    !isNullOrUndefined(this.placementEdit.placementDetail.changeOfVenueDate)
      ? (this.placementEdit.placementDetail.changeOfVenueDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.placementEditMode.changeOfVenueDate)
          ))
      : null;
    !isNullOrUndefined(this.placementEdit.placementDetail.retHomeWOCustodyDate)
      ? (this.placementEdit.placementDetail.retHomeWOCustodyDate =
          this._localValues.stringFormatDatetime(
            Date.parse(this.placementEditMode.retHomeWOCustodyDate)
          ))
      : null;
    !isNullOrUndefined(this.placementEdit.placementDetail.formReceivedDate)
      ? (this.placementEdit.placementDetail.formReceivedDate =
          this._localValues.stringFormatDatetime(
            new Date(this.placementEditMode.formReceivedDate)
          ))
      : null;

    !isNullOrUndefined(this.placementEdit.endDate)
      ? (this.placementEdit.placementDetail.endDate =
          this._localValues.stringFormatDatetimeWithoutSeconds(
            new Date(this.placementEdit.endDate)
          ))
      : null;

    !isNullOrUndefined(this.placementEdit.beginDate)
      ? (this.placementEdit.placementDetail.beginDate =
          this._localValues.stringFormatDatetime(
            new Date(this.placementEdit.beginDate)
          ))
      : null;

    this.placementEdit.placementDetail.payorID = !isNullOrUndefined(
      this.placementEditMode.payorID
    )
      ? this.placementEditMode.payorID.payorID
      : null;
    this.placementEdit.placementDetail.procodeID = !isNullOrUndefined(
      this.placementEditMode.procodeID
    )
      ? this.placementEditMode.procodeID
      : null;
    this.placementEdit.placementDetail.providerLocationID = !isNullOrUndefined(
      this.placementEditMode.providerLocationID
    )
      ? this.placementEditMode.providerLocationID.providerLocationID
      : null;
    if (this.placementEditMode.sRSServiceCodeID === null) {
      this.placementEditMode.sRSServiceCodeID = [];
    }
    this.placementEdit.placementDetail.sRSServiceCodeID = this.placementEditMode
      .sRSServiceCodeID
      ? this.placementEditMode.sRSServiceCodeID.sRSServiceCodeID
      : this.placementEditMode.sRSServiceCodeID;
    this.placementEdit.placementDetail.jjaDate = !isNullOrUndefined(
      this.placementEdit.placementDetail.jjaDate
    )
      ? this._localValues.stringFormatDatetime(
          this.placementEdit.placementDetail.jjaDate
        )
      : null;
    this.placementEdit.placementDetail.SFANotes = !isNullOrUndefined(
      this.placementEdit.placementDetail.SFANotes
    )
      ? this.placementEdit.placementDetail.SFANotes
      : null;
    this.placementEdit.placementDetail.sibsAffectedbyMove = !isNullOrUndefined(
      this.placementEdit.placementDetail.sibsAffectedbyMove
    )
      ? this.placementEdit.placementDetail.sibsAffectedbyMove
      : null;

    this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID !==
      null &&
    this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID !==
      undefined
      ? (this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID =
          this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID.DCFReleasedOfCustodyOverrideID)
      : (this.placementEdit.placementDetail.dcfreleasedOfCustodyOverrideID =
          null);

    this.placementEdit.placementDetail.dcfplanEndDateOverrideID !== null &&
    this.placementEdit.placementDetail.dcfplanEndDateOverrideID !== undefined
      ? (this.placementEdit.placementDetail.dcfplanEndDateOverrideID =
          this.placementEdit.placementDetail.dcfplanEndDateOverrideID.PlanEndDateOverrideID)
      : (this.placementEdit.placementDetail.dcfplanEndDateOverrideID = null);

    delete this.placementEdit.placementDetail.acomplete;
    delete this.placementEdit.placementDetail.acompleteDate;
    delete this.placementEdit.placementDetail.adopt;
    delete this.placementEdit.placementDetail.adoptDate;
    delete this.placementEdit.placementDetail.authorizationID;
    delete this.placementEdit.placementDetail.changedBy;
    delete this.placementEdit.placementDetail.createdDate;
    delete this.placementEdit.placementDetail.death;
    delete this.placementEdit.placementDetail.deathDate;
    delete this.placementEdit.placementDetail.enteredBy;
    delete this.placementEdit.placementDetail.enteredDate;
    delete this.placementEdit.placementDetail.fchadmissionID;
    delete this.placementEdit.placementDetail.fchadmissionID;
    delete this.placementEdit.placementDetail.guardAndNotReld;
    delete this.placementEdit.placementDetail.guardAndNotReldDate;
    delete this.placementEdit.placementDetail.guardAndReld;
    delete this.placementEdit.placementDetail.guardAndReldDate;
    delete this.placementEdit.placementDetail.ilp;
    delete this.placementEdit.placementDetail.ilpdate;
    delete this.placementEdit.placementDetail.inHome;
    delete this.placementEdit.placementDetail.isActive;
    delete this.placementEdit.placementDetail.isDeleted;
    delete this.placementEdit.placementDetail.isOOH;
    delete this.placementEdit.placementDetail.jjadate;
    delete this.placementEdit.placementDetail.kipp_ReunificationEmailed;
    delete this.placementEdit.placementDetail.lastModifiedDate;
    delete this.placementEdit.placementDetail.legacy_AncillaryServicesID;
    delete this.placementEdit.placementDetail.legacy_Behaviors;
    delete this.placementEdit.placementDetail.legacy_ClientID;
    delete this.placementEdit.placementDetail.legacy_DtResent;
    delete this.placementEdit.placementDetail.legacy_DtSentOrig;
    delete this.placementEdit.placementDetail.legacy_PayorID;
    delete this.placementEdit.placementDetail.legacy_PlacementID;
    delete this.placementEdit.placementDetail.legacy_PLOrder;
    delete this.placementEdit.placementDetail.legacy_PreAuthNo;
    delete this.placementEdit.placementDetail.legacy_ProcodeID;
    delete this.placementEdit.placementDetail.legacy_ProviderID;
    delete this.placementEdit.placementDetail.legacy_ProviderLocationID;
    delete this.placementEdit.placementDetail.legacy_ReferralID;
    delete this.placementEdit.placementDetail.legacy_Resend;
    delete this.placementEdit.placementDetail.legacy_SponsorID;
    delete this.placementEdit.placementDetail.legacy_SRSSvcCode;
    delete this.placementEdit.placementDetail.legacy_TFI_AuthorizationID;
    delete this.placementEdit.placementDetail.legacy_TFI_ClientID;
    delete this.placementEdit.placementDetail.legacy_TFI_PlacementDetailID;
    delete this.placementEdit.placementDetail.legacy_TFI_PlacementID;
    delete this.placementEdit.placementDetail.legacy_TFI_ProcodeID;
    delete this.placementEdit.placementDetail.legacy_TFI_ProviderID;
    delete this.placementEdit.placementDetail.legacy_TFI_ProviderLocationID;
    delete this.placementEdit.placementDetail.legacy_TFI_ReferralID;
    delete this.placementEdit.placementDetail.legacy_UMY_AuthorizationID;
    delete this.placementEdit.placementDetail.legacy_UMY_ClientID;
    delete this.placementEdit.placementDetail
      .legacy_UMY_PlacementDetailIDdelete;
    delete this.placementEdit.placementDetail.legacy_UMY_PlacementID;
    delete this.placementEdit.placementDetail.legacy_UMY_ProcodeID;
    delete this.placementEdit.placementDetail.legacy_UMY_ProviderID;
    delete this.placementEdit.placementDetail.legacy_UMY_ProviderLocationID;
    delete this.placementEdit.placementDetail.legacy_UMY_ReferralID;
    delete this.placementEdit.placementDetail.legacy_WhyNotSent;
    delete this.placementEdit.placementDetail.levelDown;
    delete this.placementEdit.placementDetail.medicalCard;
    delete this.placementEdit.placementDetail.otherRel;
    delete this.placementEdit.placementDetail.otherRelDate;
    delete this.placementEdit.placementDetail.paymentBeginDate;
    // delete this.placementEdit.placementDetail.placementDetailID;
    // delete this.placementEdit.placementDetail.reasonForMoveID;
    delete this.placementEdit.placementDetail.refToAdopt;
    delete this.placementEdit.placementDetail.refToAdoptDate;
    delete this.placementEdit.placementDetail.relationshipToChild_PersonTypeID;
    delete this.placementEdit.placementDetail.reprint;
    delete this.placementEdit.placementDetail.respite;
    delete this.placementEdit.placementDetail.respiteTypeID;
    // delete this.placementEdit.placementDetail.retHomeWCustody;
    // delete this.placementEdit.placementDetail.retHomeWCustodyDate;
    delete this.placementEdit.placementDetail.returnFromRespite;
    delete this.placementEdit.placementDetail.scriptsFlag;
    delete this.placementEdit.placementDetail.sixtyDay;
    delete this.placementEdit.placementDetail.sixtyDayDate;
    delete this.placementEdit.placementDetail.sponsorID;
    delete this.placementEdit.placementDetail.srsreldOfCustody;
    delete this.placementEdit.placementDetail.srsreldOfCustodyDate;
    delete this.placementEdit.placementDetail.swapPay;
    delete this.placementEdit.placementDetail.terminateReason;
    delete this.placementEdit.placementDetail.thirtyDay;
    delete this.placementEdit.placementDetail.tribalCourt;
    delete this.placementEdit.placementDetail.tribalCourtDate;
    delete this.placementEdit.placementDetail.updatedDate;
    delete this.placementEdit.placementDetail.legacy_UMY_PlacementDetailID;
    delete this.placementEdit.placementDetail.sfanotes;

    this.referralDates.referralDate = this._localValues.stringFormatDatetime(
      Date.parse(this.placementEditDates.referralDate)
    );
    this.referralDates.paymentEndDate = this._localValues.stringFormatDatetime(
      Date.parse(this.placementEditDates.paymentEndDate)
    );
    this.referralDates.retractedDate = this._localValues.stringFormatDatetime(
      Date.parse(this.placementEditDates.retractedDate)
    );
    this.referralDates.withDrawDate = this._localValues.stringFormatDatetime(
      Date.parse(this.placementEditDates.withDrawDate)
    );
    this.referralDates.closureDate = this._localValues.stringFormatDatetime(
      Date.parse(this.placementEditDates.closureDate)
    );
    this.referralDates.dualAdjBeginDate =
      this._localValues.stringFormatDatetime(
        Date.parse(this.placementEditDates.dualAdj_BeginDate)
      );
    this.referralDates.dualAdjEndDate = this._localValues.stringFormatDatetime(
      Date.parse(this.placementEditDates.dualAdj_EndDate)
    );
    this.referralDates.dCFPlanEndDate = this._localValues.stringFormatDatetime(
      Date.parse(this.placementEditDates.dCFPlanEndDate)
    );
    this.referralDates.dCFBeginDate = this._localValues.stringFormatDatetime(
      Date.parse(this.placementEditDates.dCFBeginDate)
    );
    this.referralDates.recidivistDate = this._localValues.stringFormatDatetime(
      Date.parse(this.placementEditDates.recidivistDate)
    );
    this.referralDates.recidivistDateOverride =
      this._localValues.stringFormatDatetime(
        Date.parse(this.placementEditDates.recidivistDateOverride)
      );
    this.referralDates.releaseDate = this._localValues.stringFormatDatetime(
      Date.parse(this.placementEditDates.releaseDate)
    );
    this.referralDates.closureReasonNote = !isNullOrUndefined(
      this.placementEditDates.closureReasonNote
    )
      ? this.placementEditDates.closureReasonNote
      : null;
    this.referralDates.dCFPriorMoves = !isNullOrUndefined(
      this.placementEditDates.dCFPriorMoves
    )
      ? this.referralDates.dCFPriorMoves
      : null;
    this.referralDates.releaseReasonNote = !isNullOrUndefined(
      this.placementEditDates.releaseReasonNote
    )
      ? this.placementEditDates.releaseReasonNote
      : null;
    this.referralDates.retractedReasonNote = !isNullOrUndefined(
      this.placementEditDates.retractedReasonNote
    )
      ? this.placementEditDates.retractedReasonNote
      : null;
    this.referralDates.withDrawReasonNote = !isNullOrUndefined(
      this.placementEditDates.withDrawReasonNote
    )
      ? this.placementEditDates.withDrawReasonNote
      : null;
    this.referralDates.dCFPriorMoves = this.placementEditDates.dCFPriorMoves;
    delete this.referralDates.changedBy;
    delete this.referralDates.changedDate;
    delete this.referralDates.referralID;

    if (this.placementEdit.respiteAuthorization) {
      delete this.placementEdit.respiteAuthorization["changedBy"];
      delete this.placementEdit.respiteAuthorization["changedDate"];
      delete this.placementEdit.respiteAuthorization["enteredBy"];
      delete this.placementEdit.respiteAuthorization["enteredDate"];
      delete this.placementEdit.respiteAuthorization["payor"];
      delete this.placementEdit.respiteAuthorization["respiteAuthorizationID"];
    }

    this.placementEdit.placementDetail["dcfplanEndDate"] =
      this._localValues.stringFormatDatetime(Date.parse(this.dCFPlanEndDate));

    this.placementEdit.placementDetail.referralID =
      parseInt(localStorage.getItem("referralId")) - this._openCard.getHasKey();
    this.placementEdit.placementDetail.placementDetailID = parseInt(
      localStorage.getItem("placementDetailId")
    );
    this.placementEdit.placementDetail.reasonForMoveID = !isNullOrUndefined(
      this.placementEdit.reasonForMoveID
    )
      ? this.placementEdit.reasonForMoveID.ReasonForMoveID
      : null;
    this.placementEdit.placementDetail.siblingReasonID = !isNullOrUndefined(
      this.placementEditMode.siblingReasonID
    )
      ? this.placementEditMode.siblingReasonID.siblingReasonID
      : null;

    this.placementEdit.placementDetail["dcfreleasedOfCustodyOverrideID"] = this
      .editmodeData["dcfreleasedOfCustodyOverrideID"]
      ? this.editmodeData["dcfreleasedOfCustodyOverrideID"][
          "DCFReleasedOfCustodyOverrideID"
        ]
      : null;
    this.placementEdit.placementDetail["jjaDate"] = this.editmodeData["jjaDate"]
      ? this._localValues.stringFormatDatetime(
          Date.parse(this.editmodeData["jjaDate"])
        )
      : null;
    this.placementEdit.placementDetail["dcfreleasedOfCustodyOverrideID"] = this
      .editmodeData["dcfreleasedOfCustodyOverrideID"]
      ? this.editmodeData["dcfreleasedOfCustodyOverrideID"][
          "DCFReleasedOfCustodyOverrideID"
        ]
      : null;
    this.placementEdit.placementDetail["dcfplanEndDateOverrideID"] = this
      .editmodeData["dcfplanEndDateOverrideID"]
      ? this.editmodeData["dcfplanEndDateOverrideID"]["PlanEndDateOverrideID"]
      : null;
    this.placementEdit.placementDetail["dcfreleasedOfCustodyDate"] = this
      .editmodeData["dcfreleasedOfCustodyDate"]
      ? this._localValues.stringFormatDatetime(
          Date.parse(this.editmodeData["dcfreleasedOfCustodyDate"])
        )
      : null;
    this.placementEdit.placementDetail["dcfreleasedOfCustodyID"] = this
      .editmodeData["dcfreleasedOfCustodyID"]
      ? this.editmodeData["dcfreleasedOfCustodyID"]["DCFReleasedOfCustodyID"]
      : null;

    this.placementEdit.placementDetail["retHomeWCustodyDate"] = this
      .editmodeData["retHomeWCustodyDate"]
      ? this._localValues.stringFormatDatetime(
          Date.parse(this.editmodeData["retHomeWCustodyDate"])
        )
      : null;
    this.placementEdit.placementDetail["retHomeWCustody"] = this.editmodeData[
      "retHomeWCustody"
    ]
      ? this.editmodeData["retHomeWCustody"]
      : false;
    let disruptionUpdate = {
      disruptionID: this.disruptionDetail.disruptionID,
      otherOptOffered: this.disruptionDetail.otherOptOffered,
      disruptionTypeID: this.disruptionInfoDisruptionType
        ? this.disruptionInfoDisruptionType.DisruptionTypeID
        : null,
      disruptionReasonID: this.disruptionInfoDisruptionReason
        ? this.disruptionInfoDisruptionReason.DisruptionReasonID
        : null,
      providerID: this.disruptionEditProviderType
        ? this.disruptionEditProviderType.providerID
        : null,
      staffID: this.disruption.staffID ? this.disruption.staffID.StaffID : null,
      prev_PlacementID: this.previuousPlacementID
        ? this.previuousPlacementID
        : null,
      behaviors: this.behaviors,
    };

    let updateReq = {
      respiteAuthorization: this.placementEdit.respiteAuthorization,
      placementDetailInfo: this.placementEdit.placementDetail,
      referralUpdate: this.referralDates,
      school: null,
      disruptionUpdate: disruptionUpdate,
    };
    this._placement.updatePlacementEvent(updateReq).then(async (data: any) => {
      if (data.responseStatus) {
        loader.style.display = "none";
        this.isCorrectCopyConfirmationOpen = false;
        localStorage.setItem(
          "placementEventID",
          (data.placementID + this._openCard.getHasKey()).toString()
        );
        localStorage.setItem(
          "placementEventDetailID",
          data.placementDetailID.toString()
        );
        if (this.isPopup) {
          this.placementEventOut.emit("close");
          return this._message.add({
            severity: "success",
            summary: "Updated!",
            detail: "The record has been updated!",
          });
        } else {
          this._placementPrint.storeHistoryData();
          this.getPlacementAuthorizationId(data.placementDetailID);
          await this.saveAttendingSchoolForPlacement();
          this.placementSiblingsSave();
          if (this.placementDateValidationStatus.includes(false)) {
            window.open(
              window.location.origin +
                "/placement-date-validation/" +
                window.location.search,
              "_blank",
              "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
            );
          } else {
            swal("Update", "Placement Event has been updated", "success");
            // if (window.history.length > 0) {
            //   window.close();
            // } else {
            this._router.navigate(
              [
                "/reintegration/referral/opencard/placement/placementEvent/view",
              ],
              { queryParamsHandling: "preserve" }
            );
            // }
          }
        }
      }
      if (!data.responseStatus) {
        loader.style.display = "none";
        return this._message.add({
          severity: "Info",
          summary: "Not able to update!",
          detail: "Please contact your administrator!",
        });
      }
      this._router.navigate(
        ["/reintegration/referral/opencard/placement/placementEvent/view"],
        { queryParamsHandling: "preserve" }
      );
    });
  }
  onChangePayorRate() {
    this.auth.payorRate = this.auth.payorRate.toFixed(2);
  }
  onChangeProviderRate() {
    this.auth.providerRate = this.auth.providerRate.toFixed(2);
  }
  onSelectRequestedBy(event: any) {
    event.value === "provider"
      ? (this.isRequestedByProviderEnable = true)
      : (this.isRequestedByProviderEnable = false);
  }

  filteredRequestedType(event: any) {
    this.metaData = [];
    this.metaData = this.requestedByType.filter((item: any) => {
      return item.value.indexOf(event.query) !== -1;
    });
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

  onClearReasonForChangeInEdit(event: any) {
    console.log("on clear placement evet", event);
  }

  public async onSelectProcode(begindate?: any, selectedProcode?: any) {
    await this.generateUnitRate(selectedProcode);
    this.changingDatesBasedOnProcodes(selectedProcode);
    this.autoFetchPaymentEndDate(begindate, selectedProcode);
    this.basedChildDeathProcodeReferralDateUpdate(selectedProcode);
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
        ? (this.placementEditDates.releaseDate =
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
    this.placementDetail.dcfplanEndDate = new Date(
      new Date(this.placement.beginDate).setMonth(placementBeginDateMonth + 6)
    );
  }

  public async makeReasonForChangeFieldMandatory() {
    this.placementDetailCount = null;
    let placementDetailCountReq = {
      placementID: this.currentPlacementId,
    };
    this.placementDetailCount = await this._openCard.getCountOfPlacementDetail(
      placementDetailCountReq
    );
    // if (this.placementDetailCount !== undefined && this.placementDetailCount !== null) {
    //   if (this.placementDetailCount < 2) {
    //     return (this.isReasonForChangeMandatroy = true);
    //   } else {
    //     return (this.isReasonForChangeMandatroy = false);
    //   }
    // }
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

  public authorizationInformationAutoFill() {
    this.auth.payorRate = 0.0;
    this.auth.providerRate = 0.0;
  }

  endDateCleared(event) {
    console.log("event is", event);
    if (this.placementEditMode) {
      this.placementEditMode.endDate = null;
    }

    if (this.placement && this.placement.endDate) {
      this.placement.endDate = null;
    }
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

  public disruptionFormValidation() {
    this.disruptionForm = this._fb.group({
      editOtherOptionOffered: [null],
      editDisruptionReason: [null],
      editDisruptionType: [null],
      editRequestedByType: [null],
      requestedByProvider: [null],
      editRequestedByStaff: [null],
      editBehaviorsPR: [null],
    });
  }

  public disruptionCreateFormValidation() {
    this.disruptionCreateForm = this._fb.group({
      otherOptOffered: [null],
      disruptionReasonID: [null],
      disruptionTypeID: [null],
      requestedByType: [null],
      requestedByProvider: [null],
      requestedByStaff: [null],
      behavior: [null],
    });
  }

  onChangeDisruptionCreate(event: any) {
    if (event) {
      this.disruptionCreateForm.enable();
      this.isDisruptionEnable = true;
      this.getPreviousPlacementProviderName();
    } else {
      this.disruptionCreateForm.disable();
      this.disruptionCreateForm.reset();
      this.isDisruptionEnable = false;
    }
  }

  public autoFillAttendingSchoolDates() {
    this.attendingSchool.beginDate = new Date(
      this._localValues.stringFormatDatetime(Date.now())
    );
    this.attendingSchool.beginDate.setHours(0);
    this.attendingSchool.beginDate.setMinutes(0);
    this.attendingSchool.beginDate.setSeconds(0);
  }

  public async makeReasonForChangeFieldsMandatoryInEditMode() {
    await this.makeReasonForChangeFieldMandatory();
    let referralTypeId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._openCard.getHasKey();
    if (
      this.placementDetailCount > 1 &&
      this.placementEdit.reasonForMoveID !== null &&
      this.placementEdit.reasonForMoveID !== undefined &&
      new Date(this.placementBeginDate).getTime() !==
        new Date(this.placementEdit.beginDate).getTime() &&
      referralTypeId !== 10 &&
      referralTypeId !== 15 &&
      referralTypeId !== 16 &&
      referralTypeId !== 17
    ) {
      this.isReasonForChangeMandatroy = true;
    } else {
      this.isReasonForChangeMandatroy = false;
    }
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

  public async autoFetchPaymentEndDate(beginDate?: any, procode?: any) {
    let paymentEndDateRequest = {
      beginDate:
        beginDate !== null && beginDate !== undefined ? beginDate : null,
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
      isPlacement: this._router.url.includes("placement-event") ? false : true,
      procodeID:
        procode !== null && procode !== undefined ? procode.procodeID : null,
      placementID:
        parseInt(localStorage.getItem("placementID")) -
        this._openCard.getHasKey(),
    };
    let payementEndDateResponse = await this._openCard.getPaymentEndDate(
      paymentEndDateRequest
    );
    if (this._router.url.includes("detail")) {
      this.placementEditDates.paymentEndDate =
        payementEndDateResponse.paymentEndDate !== undefined &&
        payementEndDateResponse.paymentEndDate !== null
          ? new Date(payementEndDateResponse.paymentEndDate)
          : null;
    } else {
      this.referralDates.paymentEndDate = new Date(
        payementEndDateResponse.paymentEndDate
      );
    }
  }

  public placementDateValidationCheck() {
    let referralTypeID =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._openCard.getHasKey();
    let validationResult = false;
    this.selectedProcodeObject =
      this.placementDetail.procodeID || this.placementEditMode.procodeID;
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

  public placementEventDateValidationExitOut(event: any) {
    if (event.resultOut === "Yes") {
      this.isPlacementDateValidationOpen = false;
      this.isAckOptions = true;
    }
  }

  public basedChildDeathProcodeReferralDateUpdate(selectedProcode: any) {
    if (selectedProcode.procodeID === 180) {
      if (this._router.url.includes("/new")) {
        return (this.referralDates.closureDate = this.placement.beginDate);
      } else {
        return (this.placementEditDates.closureDate =
          this.placementEdit.beginDate);
      }
    } else {
      return;
    }
  }

  onRemoveReleaseOfCustody(formMode: any) {
    if (formMode === "edit") {
      this.placementEditMode.dcfreleasedOfCustodyID = null;
      return delete this.placementEditMode.dcfreleasedOfCustodyID;
    } else {
      this.placementDetail.dcfreleasedOfCustodyID = null;
      return delete this.placementDetail.dcfreleasedOfCustodyID;
    }
  }

  public async onClickGetPaymentEndDateHistory() {
    this.isOpenPaymentDates = true;
    let historyReq = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._openCard.getHasKey(),
    };
    let historyRes = await this._openCard.getPlacementEndDateHistory(
      historyReq
    );
    this.paymentEndDateHistory = historyRes.paymentEndDateHistory;
  }

  public async placementClaimValidation() {
    let validationReq = {
      authorizationID:
        parseInt(localStorage.getItem("authorizationId")) -
        this._openCard.getHasKey(),
    };
    let validationRes = await this._openCard.placementClaimValidation(
      validationReq
    );
    if (validationRes.placementClaim.length !== 0) {
      return (this.isClaimValidation = true);
    } else {
      return (this.isClaimValidation = false);
    }
  }

  public onclickNoInClaimValidation() {
    this.isEdit = true;
    this.isClaimValidation = false;
    this.getPlacementRecordById();
  }

  placementOverallValidationStatus(event: any) {
    this.placementDateValidationStatus = Object.values(event);
  }
}
