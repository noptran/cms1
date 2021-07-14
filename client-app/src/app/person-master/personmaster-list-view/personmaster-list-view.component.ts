import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { ClildFormService } from "../../child-forms/child-forms.service";
import { ExportService } from "../../prioritized-reports/export-service.service";
import { AgGridNg2 } from "ag-grid-angular";
import { Router, ActivatedRoute } from "@angular/router";
import { ReferralViewService } from "../../referral-view/referral-view.service";
import { PagesizeService } from "../../pagesize/pagesize.service";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { isNullOrUndefined } from "util";
import swal from "sweetalert2";
import { isUndefined } from "util";
import { ProviderService } from "../../provider/provider.service";
import { ClientStrengthService } from "../../client-strength/client-strength.service";
import { environment } from "../../../environments/environment";
import * as moment from "moment";
import { LocalValues } from "../../local-values";
import { ExportAllService } from "./export.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Client } from "../Client/client-form/client";
import { PRTFComponent } from "../../Shared/Components/PRTF/prtf.component";
import { ProviderMemberFormComponent } from "../Provider-member/provider-member-form/provider-member-form.component";
import { AppValuesService } from "../../../constants/AppValues.service";
import {
  CLIENTID,
  PLACEMENT_DETAIL_ID,
  PLACEMENT_ID,
  REFID,
} from "../../../constants/AppConstants";

@Component({
  selector: "app-personmaster-list-view",
  templateUrl: "./personmaster-list-view.component.html",
  styleUrls: [
    "./personmaster-list-view.component.scss",
    "../../prioritized-reports/prioritized-reports.component.scss",
  ],
  inputs: [
    "personName",
    "customizedArray",
    "columnToSorted",
    "tableArray",
    "filter",
    "addLink",
    "navigateTo",
    "requestObject",
    "master",
    "addtionData",
    "breadcrumbs",
    "numericColumns",
    "personData",
    "columnDropdownList",
    "isAddBtnDisable",
    "isSearchAny",
    "isTableBottomAction",
  ],
})
export class PersonmasterListViewComponent implements OnInit {
  @Input()
  personName: any;
  customizedArray: any;
  columnToSorted: any;
  tableArray: any;
  filter: any;
  addLink: any;
  navigateTo: any;
  initial = 1;
  end = 100;
  requestObject: any;
  master: any;
  addtionData: any;
  breadcrumbs: any;
  searchInput = "";
  selectedReferral: any;
  listOfReferral = [];
  clientId: any;
  asqName = "";
  isAsqFormed = false;
  isSearchAny = false;
  isTableBottomAction = false;
  isAttachmentList = false;
  showQuickMenu = false;
  isAdd: string;
  isRightClick = false;
  @Output()
  apply = new EventEmitter();
  resetFilter = new EventEmitter();
  billableCaseActivity = new EventEmitter();

  columnDefs = [];
  rowData = [];
  defaultColDef;
  fillField;
  columnDropdownList = [];
  sortcolumnDropdownList = [];
  filtered = [];
  sortingEnable = false;
  crumbs: any;

  @ViewChild("agGrid", { static: true }) agGrid: AgGridNg2;

  Sidenav: boolean;
  reportsViewList;
  button: {};
  showForm: boolean = false;
  hideLoader: boolean = true;
  headers = [];
  rawdata = [];
  totalCount: any;
  beginPagination: any = 1;
  endPagination: any = 100;
  loaderController: boolean = false;
  personData = {};
  sortcolumnDropdownL = [];
  numericColumns = [];
  numericHeaders = [];
  sortColumn;
  sortOrder = "desc";
  sortList = [{ name: "asc" }, { name: "desc" }, { name: "no sort" }];
  selectedClientId: any;
  hideTable: any;
  sortingList = false;
  selectedQuery: any;
  isListAddAction = false;
  isListAdd = true;
  isAddBtnDisable = false;
  isBillable = false;
  billableDate: any;
  isBillablePanel = false;
  isSearchLoader = false;
  // showQuickMenu: boolean;
  quickMenu: string;
  billableLimits = [];
  selectedBillableLimit: any;
  exportQuery: any;
  clientBulKUpdateForm: FormGroup;
  clientBulkUpdateSelectedClients = [];
  client: Client = new Client();
  isUpdateLoading = false;
  isQuickUpdate = false;
  multiDelete: boolean;
  attach_module_name: string;
  attachementStatus = false;
  queryParam: any;
  queryParam_2: any;
  queryParam_3: any;
  currentRecId: number;
  currentPlacementID: number;
  currentAuthorizationID: number;
  eventPlacementDetailId: any;
  planPlacementDetailId: any;
  isMoreOptions = false;
  selectedRowId: any;
  isLoadText: boolean;
  selectedClientName: string;
  /***** Cleint opencards list */
  casesList = [];
  medicationsList = [];
  allergiesList = [];
  profileList = [];
  strengthList = [];
  courtCaseList = [];
  liabilityList = [];
  preventativeMeasurementList = [];
  attachedDocsList = [];
  unusualIncidentList = [];
  unusualIncidentRMList = [];
  customerCareList = [];
  /**** Referral opencards list  ******/
  assessmentList = [];
  billableCaseActivityList = [];
  caseActivityList = [];
  caseEvaluationsList = [];
  caseFileActivityList = [];
  casePlanGoalList = [];
  caseTeamList = [];
  courtOrdersList = [];
  homeCountyList = [];
  kippPMTOList = [];
  lackOfContactList = [];
  ntffList = [];
  progressNoteList = [];
  progressNoteDiagnosisList = [];
  referralEventsList = [];
  sfaOfficeList = [];
  supervisoryStaffingList = [];
  phaseList: any;
  selectedCaseId: number;
  selectedReferralType: string;
  customQueryParams: any;
  subModule: string;
  isOpenDeleteAuthListWindow = false;
  currentReferralID: number;
  deletedAuthList: any;
  closureDate: any;
  isPlacementListView = false;
  currentPersonType: any;
  personTypesUrl = [
    "/reports/casaOfficer",
    "/reports/client",
    "/reports/communityMember",
    "/reports/court/service/officer",
    "/reports/crbOfficer",
    "/reports/csoStaff",
    "/reports/dcf",
    "/reports/dhhsStaff",
    "/reports/dhsStaff",
    "/reports/familyMember",
    "/reports/guardianAdl",
    "/reports/judge",
    "/reports/otherAgencyStaf",
    "/reports/payee/view",
    "/reports/payor/view",
    "/reports/providerMember",
    "/reports/provider-sponser/view",
    "/reports/staff",
    "/reports/customer-care/list",
    "/reports/kansas/view",
    "/csPayee/payeeform/payee-AuthList",
    "/reports/oklahoma/view",
    "/reports/nebraska/view",
  ];
  isSSNValidationDisable = false;
  isKaecsesValidationDisable = false;
  searchTypeSuggestions = [];
  searchType = {
    searchTypeID: null,
    searchType: null,
    searchForId: null,
  };
  searchDataTypeInfo: {
    integerValue: boolean;
    strValue: boolean;
    dateValue: boolean;
  };
  searchForID: number;
  searchLabel = "Type here to search, Format: (Firstname Lastname)";
  searchValidationMessage: string;
  isPlacementExportEnabled = true;
  isPersontypeContractEnabled = true;
  isPersonMasterWizardOpen = false;
  personType: string;
  currentPrimaryValue: Number;
  isInfoBox = true;
  isCaseActivityModal = false;
  isSelectedBillableCaseactivityIdsCaseactivityID: number;
  deleteAuthFormsList = [];
  isDeleteAuthFormActionsList = false;
  isPSAPrompt = false;
  isPersonMasterValidation = false;
  selectedModule = { display: "Provider Member", value: "ProviderMember" };
  isNonContractVisible = false;
  isSSNVisbile = true;
  isKaecsesDisable = true;
  isKaecsesMandatory = false;
  isProviderMemberCreation = false;
  isProviderMemberAdult = false;
  isAppHeader = false;
  isComponent = true;
  providerMemberPredefinedData: any;
  isPRTF = false;
  isPlacementAgreementFCH = false;
  isPlacementAgreementKinship = false;
  isPlacementAgreementKinshipNonPaid = false;
  isPlacementAckReturn = false;
  isPlacementAck = false;
  isAdult = false;

  @ViewChild(PRTFComponent, { static: true }) prtfComponent: PRTFComponent;

  @ViewChild(ProviderMemberFormComponent, { static: false })
  providerMemberFormComponent: ProviderMemberFormComponent;

  isViewInit = false;
  clientInfo: any;
  public selectedPlacementDetailID: number;
  public isEmailCheckboxView = false;
  public isStaffEmail = false;
  public isStaffDCF = false;
  public isCaseTeamEmail = false;
  public authDeleteOtherEmail: string;
  public deletedPDFDocID: any;
  public deleteAckFormHeader: string;
  public mailStatusIndication: string;
  isPlacementDateValidationOpen = false;
  isAddBtnVisible = "true";
  staffCreationUsers = [5133, 5134, 5937, 5130, 14757]; // development purpose
  public CLIENT_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(CLIENTID)
  );
  public REF_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(REFID)
  );
  public PLACEMENT_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(PLACEMENT_ID)
  );
  public PLACEMENT_DETAIL_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(PLACEMENT_DETAIL_ID)
  );

  constructor(
    public clildFormService: ClildFormService,
    public router: Router,
    public exportService: ExportService,
    public _referralView: ReferralViewService,
    public _pageSize: PagesizeService,
    public _opencards: OpencardsService,
    public _provider: ProviderService,
    public _localValues: LocalValues,
    public exportAllService: ExportAllService,
    public _formBuilder: FormBuilder,
    public _activateRoute: ActivatedRoute,
    public appValues: AppValuesService
  ) {}

  ngOnInit() {
    this.addBtnControlForStaffMaster();
    this.assignPersonMasters();
    this.showProviderProfile();
    this.getStaffProfileInfo();
    this.getStaffNameProfileInfo();
    this.getSchoolProfileInfo();
    this.checkPlacementExportValidation();
    this.currentReferralID =
      parseInt(localStorage.getItem("referralId")) -
      this._opencards.getHasKey();
    this.queryParam = this._activateRoute.snapshot.queryParamMap.get("module");
    this.queryParam_2 = this._activateRoute.snapshot.queryParamMap.get("li_id");
    this.queryParam_3 =
      this._activateRoute.snapshot.queryParamMap.get("subRecId");
    this.currentRecId = parseInt(
      this._activateRoute.snapshot.queryParamMap.get("current_recId")
    );
    this.currentPlacementID =
      parseInt(localStorage.getItem("placementID")) -
      this._opencards.getHasKey();
    this.currentAuthorizationID =
      parseInt(localStorage.getItem("authorizationId")) -
      this._opencards.getHasKey();
    this.subModule = this._activateRoute.snapshot.queryParamMap.get("sub");
    this.selectedClientName = localStorage.getItem("clientName");
    console.log("acitvate routes", this.queryParam, this.master);
    var get_attachment_url = this.router.url.split("/");
    console.log("get_attachment_url>>>>>", get_attachment_url);
    let attacmetState = get_attachment_url.find(
      (x) => x === "attachment-document"
    );
    if (attacmetState) {
      this.attachementStatus = true;
    }
    if (this.master === "placement") {
      this.isPlacementListView = true;
    } else {
      this.isPlacementListView = false;
    }
    this.getClientDetails();
    this.crumbs = this.breadcrumbs;
    if (this.router.url.includes("/reports/client")) {
      this.isSearchAny = true;
      this.master = "client";
    }
    this.listOfReferral.push(
      { ReferralType: "FP", display: "Family Preservation" },
      { ReferralType: "RI", display: "Reintegration" },
      { ReferralType: "NC-OPS", display: "Non contract outpatient services" },
      {
        ReferralType: "NC-FI",
        display: "Non contract family preservation (In-Home)",
      },
      {
        ReferralType: "NC-FCH",
        display: "Non contract Foster care homes referral program",
      },
      {
        ReferralType: "NC-RFC",
        display: "Non contract reintegration foster care (NC-RFC)",
      },
      {
        ReferralType: "NC-HS",
        display: "Non contract Home Study/FCH Services (NC-HS)",
      },
      { ReferralType: "BH-OK", display: "Bridge Home Oklahoma (BH OK)" },
      { ReferralType: "JJFC", display: "Juvenile Justice Foster Care (JJFC)" },
      { ReferralType: "NC-MHR", display: "NC Mental Health Respites (NC-MHR)" },
      {
        ReferralType: "SUB-RFC",
        display: "Sub-Contract Reintegration Foster Care(SUB-RFC)",
      }

      // { ReferralType: 'PRTF', display: "Psychiatric Residential Treatment Theraphy (PRTF)" }
    );
    if (
      this.router.url.includes("/reports/fp-billable-case-activity/view") ||
      this.router.url.includes("/reports/client") ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/case-activity"
      ) ||
      this.router.url.includes("/reports/attachment-document/case-activity") ||
      this.router.url.includes("/reports/attachment-document/rfc/assessment") ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/court-orders"
      ) ||
      this.router.url.includes("/reports/attachment-document/assessment") ||
      this.router.url.includes("/reports/attachment-document/court-orders") ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/monthly-reports"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/case-plan-goals"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/case-plan-goals"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/credit-tracking"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/general-education"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/special-education"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/attending-school"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/grade-level"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/school-release"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/home-school"
      ) ||
      this.router.url.includes("/reports/client/documents") ||
      this.attachementStatus
    ) {
      this.defaultColDef = {
        width: 220,
        headerCheckboxSelection: this.isFirstColumn,
        checkboxSelection: this.isFirstColumn,
      };
    }
    if (
      this.router.url.includes("/reports/attachment-document/rfc/case-activity")
    ) {
      this.defaultColDef = {
        width: 220,
        headerCheckboxSelection: this.isFirstColumn,
        checkboxSelection: this.isFirstColumn,
      };
    }
    if (this.router.url.includes("/reports/provider/view")) {
      this.searchLabel = "Type here to search, Format: (Last, Firstname)";
    }
    if (this.router.url.includes("/csProviderList")) {
      this.searchLabel = "Search the Provider Name";
    }
    if (
      this.router.url.includes("/reports/client/documents") ||
      this.router.url.includes("/reports/thirdparty/liability/view") ||
      this.router.url.includes("/reports/client-strength/view") ||
      this.router.url.includes("/reports/client/profile") ||
      this.router.url.includes("/reports/opencards/list/client/case") ||
      this.router.url.includes("/reports/medication-allergies/view") ||
      this.router.url.includes("/reports/allergies/view") ||
      this.router.url.includes("reports/preventative-measurements/view")
    ) {
      this.showQuickMenu = true;
      this.quickMenu = "client";
    } else if (
      this.router.url.includes(
        "/reports/referral/family-preservation/court-order/view"
      ) ||
      this.router.url.includes(
        "/reports/referral/family-preservation/progress-note-diagnosis/view"
      ) ||
      this.router.url.includes(
        "/reports/referral/family-preservation/referral-events/view"
      ) ||
      this.router.url.includes(
        "/reports/referral/family-preservation/case-plan-goals/view"
      ) ||
      this.router.url.includes(
        "/reports/referral/family-preservation/head-of-household/view"
      ) ||
      this.router.url.includes("/reports/family-safety/view") ||
      this.router.url.includes(
        "/reports/referral/family-pre servation/fis-members/view"
      ) ||
      this.router.url.includes("/reports/extended-family/view") ||
      this.router.url.includes("/claims/list/direct/auth/list") ||
      this.router.url.includes("/claims/list/hardgoods/list") ||
      this.router.url.includes("/claims/list/other/service/list")
    ) {
      this.showQuickMenu = true;
    } else if (
      this.router.url.includes("/reports/supervisory-staffing-form/view") ||
      this.router.url.includes(
        "/reintegration/referral/opencard/sfcs-office/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/home-county/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/case-team/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/case-evaluations/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/appointments/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/placement/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/independent-living/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/social-security-income/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/case-file-activity/view"
      ) ||
      this.router.url.includes("/reintegration/referral/opencard/kipp/view") ||
      this.router.url.includes(
        "/reintegration/referral/service/authorization/summary"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/assessments/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/case-activity/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/behavioral-assessment/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/case-plan-goals/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/court-order/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/home-county/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/adoption/view"
      ) ||
      this.router.url.includes(
        "/reports/supervisory-staffing-for-superviosrs/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/monthly-reports/view"
      ) ||
      this.router.url.includes("/reports/court/case/view") ||
      this.router.url.includes(
        "/reintegration/referral/opencard/school/credit-tracking/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/school/eeispf/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/school/general-education/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/school/special-education/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/attending-school/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/grade-level/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/school-release/view"
      ) ||
      this.router.url.includes("/reports/siblings-in-out-home/view") ||
      this.router.url.includes("/reports/siblings-in-out-home/view") ||
      this.router.url.includes(
        "/reintegration/referral/opencard/bh-determination/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/health-record/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/immunization/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/kan-be-healthy/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/waiver/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/move-permanency/move-form/view"
      ) ||
      this.router.url.includes(
        "/reintegration/referral/opencard/move-permanency/permanency-form/view"
      )
    ) {
      this.showQuickMenu = true;
      this.quickMenu = "referrel";
    }
    this.billableLimits.push(
      { label: "All Case Activity", value: "all" },
      { label: "New Case Activity Only", value: "new" },
      { label: "Billable Only", value: "billable" },
      { label: "Billable, But Not Billed", value: "billable_not_billed" },
      { label: "Billable and Billed", value: "billable_and_billed" }
    );
    this.clientUpdateFormValidation();
    this.currentPersonType = this.getPersonTypeFormCurrentUrl();
    this.deleteAuthFormsList.push(
      { label: "ACK (Void) - Acknowledgement", value: "ackVoid" },
      {
        label: "ACKR (Void) - Acknowledgement (Return)",
        value: "ackVoidReturn",
      },
      { label: `NOCL (Void)- Notice Of Child's Location`, value: "noclVoid" },
      { label: "PSA (Void) - Provider Service Agreement", value: "psaVoid" },
      {
        label:
          "PA (Void) - Placement Agreement (Foster Care Homes/Kinship Non-Relative)",
        value: "paVoidFCH",
      },
      {
        label: "PA (Void) - Placement Agreement (Kinship/Agency Approved)",
        value: "paVoidAA",
      },
      {
        label: "PA (Void) - Placement Agreement (Kinship Non-Paid)",
        value: "paKN",
      },
      // { label: 'PA (Void) - Placement Agreement', value: 'paPAI' },
      // { label: 'PA (Void) - Placement Agreement', value: 'paPAII' },
      { label: "PDF - Old PDF files", value: "PDFOld" }
    );
    if (
      this.router.url.includes("/reports/staff/caseList") ||
      this.router.url.includes("/reports/staff/staffProvider")
    ) {
      this.isListAdd = false;
    } else {
      this.isRightClick = false;
    }
    if (this.router.url.includes("/provider_Authorization")) {
      localStorage.removeItem("providerID");
    }
  }
  isClientBulkUpdateDisplay = false;

  showClientBulkUpdateDialog() {
    this.isClientBulkUpdateDisplay = true;
  }
  /**
   * Get the client details
   */
  getClientDetails() {
    this.selectedClientId =
      this._activateRoute.snapshot.queryParamMap.get("clientId");
    this.getPerson(this.initial, this.end);
  }

  isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }
  // onChangeReferrel(event) {
  //   console.log("event>>>>>>>>", event.ReferralType);
  //   if (event.ReferralType == "BG") {
  //     this.router.navigate([
  //       "/referral/family-preservation/new/referral/bridge/homes"
  //     ]);
  //   }
  // }
  onChangeReferrel(event) {
    console.log("event>>>>>>>>", event);
    if (event.ReferralType == "BG") {
      this.router.navigate(
        ["/referral/family-preservation/new/referral/bridge/homes"],
        { queryParamsHandling: "preserve" }
      );
      let closeBtn = document.getElementById("closeBtn") as HTMLElement;
      closeBtn.click();
    } else if (event.ReferralType == "NC") {
      this.router.navigate(
        ["/referral/family-preservation/new/referral/nonContract"],
        { queryParamsHandling: "preserve" }
      );
      let closeBtn = document.getElementById("closeBtn") as HTMLElement;
      closeBtn.click();
    }
  }
  // add() {
  //   this.router.navigate(['/reports/client/new']);
  // }

  // goToMenu() {
  //   this.router.navigate(['/reports/person/types']);
  // }
  gridOptions = {};
  generateListView(data) {
    console.log("************", this.master);
    console.log("data in generateListView is", data);
    this.exportQuery = data.query;
    let rowData = [];
    this.hideLoader = true;
    this.totalCount = data.totalCount;
    this.selectedQuery = data.query;
    this.reportsViewList = data.childList;
    this.numericColumns = data.dataTypes;
    this.agGrid.api.sizeColumnsToFit();
    if (this.master === "cases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (!params.data.closureDate) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "placement" || this.master === "placementEvent") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        this.closureDate = this._localValues.closureDate;
        console.log(this._localValues.closureDate, "closuredate2");

        if (this.closureDate !== null) {
          color = "black";
        } else if (
          this.closureDate === null &&
          params.data.foreColor === "Permanency"
        ) {
          color = "green";
        } else if (
          this.closureDate === null &&
          params.data.foreColor !== "Permanency" &&
          params.data.endDate === null
        ) {
          color = "purple";
        }
        return { color: color };
      };
    }

    if (this.master === "placementEventAuthorizationTempList") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.AuthorizationStatus === "Active") {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "providerLicense") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (!params.data.endDate) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "client") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (
          params.data.ClientNameLastFirst === params.data.ClientNameLastFirst
        ) {
          if (params.data.DCFRegion === "NO REGION") {
            color = "gray";
          }
        }
        console.log("dcf region", params.data.DCFRegion);
        return { color: color };
      };
    }
    if (this.master === "staff-caseList") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "judgeCases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "dcfStaffCases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "casaOfficerCases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "communityMemberCases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "courtServiceOfficerCases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "crbCases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "csoStaffCases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "fmHouseholdCases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "galCases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "dhhsStaffCases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "dhsStaffCases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "providerSponserCases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }
    if (this.master === "payorCases") {
      this.gridOptions["getRowStyle"] = (params) => {
        let color = "black";
        if (params.data.endDate == null && params.data.closureDate == null) {
          color = "purple";
        }
        return { color: color };
      };
    }

    if (
      this.router.url.includes(
        "/reports/referral/family-preservation/progress-notes/view"
      )
    ) {
      this.numericColumns.push(
        { COLUMN_NAME: "StartTime", DATA_TYPE: "datetime" },
        { COLUMN_NAME: "EndTime", DATA_TYPE: "datetime" }
      );
    }
    if (this.attachementStatus) {
      let module_nme = data.dataTypes.find(
        (x) => x.COLUMN_NAME === "cmsCisPdfDocID"
      );
      if (module_nme) {
        this.attach_module_name = "CMSCISPdfDoc";
      } else {
        this.attach_module_name = "ScannedDocument";
      }
    }
    if (this.router.url.includes("/reports/client/documents")) {
      this.attach_module_name = "ScannedDocument";
    }
    this.rowData = data[this.tableArray]
      ? data[this.tableArray]
      : data[this.customizedArray] ||
        data["searchResult"] ||
        data["dynamicSearch"];
    if (
      this.router.url.includes(
        "/reintegration/referral/opencard/monthly-reports/view"
      )
    ) {
      // this.rowData.map((itm) => {
      //   itm.monthReported = new Date(itm.monthReported);
      // });
      // this.rowData.sort(function (a, b) {
      //   return b.monthReported - a.monthReported;
      // });
    }
    let vendorNameArr = this.rowData;
    if (vendorNameArr) {
      vendorNameArr.map((data) => {
        if (data.payeeName === null) {
          data.vendorName = data.providerName;
          data.vendorType = "Provider";
        } else if (data.providerName === null) {
          data.vendorName = data.payeeName;
          data.vendorType = "Payee";
        }
      });
    }
    console.log("This row data", this.rowData);

    this.rowData.map((data) => {
      data;
      //   data['Actions'] = "Click here";
      if (data.isActive) {
        if (
          this.router.url.includes(
            "/reports/referral/family-preservation/progress-notes/view"
          )
        ) {
          if (data.BeginDate) {
            data["StartTime"] = moment(data.BeginDate).format("HH:mm");
          } else {
            data["StartTime"] = moment(data.beginDate).format("HH:mm");
          }
          if (data.Enddate) {
            data["EndTime"] = moment(data.Enddate).format("HH:mm");
          } else {
            data["EndTime"] = moment(data.endDate).format("HH:mm");
          }
        }

        !isNullOrUndefined(data.DOB)
          ? (data.DOB = moment(data.DOB).format("MM/DD/YYYY"))
          : null;
        data.NotificationDate !== null && data.NotificationDate !== undefined
          ? (data.NotificationDate = moment(data.NotificationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        data.DiscoveryDate !== null && data.DiscoveryDate !== undefined
          ? (data.DiscoveryDate = moment(data.DiscoveryDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        data.IncidentDate !== null && data.IncidentDate !== undefined
          ? (data.IncidentDate = moment(data.IncidentDate).format("MM/DD/YYYY"))
          : null;
        data.FollowUpCompletedDate !== null &&
        data.FollowUpCompletedDate !== undefined
          ? (data.FollowUpCompletedDate = moment(
              data.FollowUpCompletedDate
            ).format("MM/DD/YYYY"))
          : null;
        data.IncidentTime !== null && data.IncidentTime !== undefined
          ? (data.IncidentTime = moment(data.IncidentTime).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.completedDate)
          ? (data.completedDate = moment(data.completedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.dateSentToSRS)
          ? (data.dateSentToSRS = moment(data.dateSentToSRS).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.dueDate)
          ? (data.dueDate = moment(data.dueDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = moment(data.beginDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.endDate) &&
        data.endDate !== 0 &&
        data.endDate !== ""
          ? (data.endDate = moment(data.endDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.evaluationDate)
          ? (data.evaluationDate = moment(data.evaluationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.dob)
          ? (data.dob = moment(data.dob).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.jeDate)
          ? (data.jeDate = moment(data.jeDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.JEReceivedDate)
          ? (data.JEReceivedDate = moment(data.JEReceivedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.orderDate)
          ? (data.orderDate = moment(data.orderDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.receivedDate)
          ? (data.receivedDate = moment(data.receivedDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.determinationDate)
          ? (data.determinationDate = moment(data.determinationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.determinationReceivedByCC)
          ? (data.determinationReceivedByCC = moment(
              data.determinationReceivedByCC
            ).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.requestReceivedByCC)
          ? (data.requestReceivedByCC = moment(data.requestReceivedByCC).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.requestSent)
          ? (data.requestSent = moment(data.requestSent).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.servicesBeginDate)
          ? (data.servicesBeginDate = moment(data.servicesBeginDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.servicesEndDate)
          ? (data.servicesEndDate = moment(data.servicesEndDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.when)
          ? (data.when = moment(data.when).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnrolledEndDate)
          ? (data.EnrolledEndDate = moment(data.EnrolledEndDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.EnrolledBeginDate)
          ? (data.EnrolledBeginDate = moment(data.EnrolledBeginDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.examDate)
          ? (data.examDate = moment(data.examDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.nextExamDue)
          ? (data.nextExamDue = moment(data.nextExamDue).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dateApplicationSubmitted)
          ? (data.dateApplicationSubmitted = moment(
              data.dateApplicationSubmitted
            ).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.KBHDate)
          ? (data.KBHDate = moment(data.KBHDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.nextKBHDue)
          ? (data.nextKBHDue = moment(data.nextKBHDue).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.CompletedDate)
          ? (data.CompletedDate = moment(data.CompletedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.LastOccurrence)
          ? (data.LastOccurrence = moment(data.LastOccurrence).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.completed)
          ? (data.completed = moment(data.completed).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.requested)
          ? (data.requested = moment(data.requested).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.legallyAvailable)
          ? (data.legallyAvailable = moment(data.legallyAvailable).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.APADate)
          ? (data.APADate = moment(data.APADate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ConsentSignedDate)
          ? (data.ConsentSignedDate = moment(data.ConsentSignedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.ConsentSentDate)
          ? (data.ConsentSentDate = moment(data.ConsentSentDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.requestedDate)
          ? (data.requestedDate = moment(data.requestedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.StatusDate)
          ? (data.StatusDate = moment(data.StatusDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateOfPermanencyOrRelease)
          ? (data.DateOfPermanencyOrRelease = moment(
              data.DateOfPermanencyOrRelease
            ).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.nextDueDate)
          ? (data.nextDueDate = moment(data.nextDueDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.closureDate)
          ? (data.closureDate = moment(data.closureDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.enteredDate)
          ? (data.enteredDate = moment(data.enteredDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Enddate)
          ? (data.Enddate = moment(data.Enddate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.date)
          ? (data.date = moment(data.date).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnteredDate)
          ? (data.EnteredDate = moment(data.EnteredDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.LastModifiedDate)
          ? (data.LastModifiedDate = moment(data.LastModifiedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.NotificationDate)
          ? (data.NotificationDate = moment(data.NotificationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.UpdatedDate)
          ? (data.UpdatedDate = moment(data.UpdatedDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ChangedDate)
          ? (data.ChangedDate = moment(data.ChangedDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.eventDate)
          ? (data.eventDate = moment(data.eventDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.BilledDate)
          ? (data.BilledDate = moment(data.BilledDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.findingDate)
          ? (data.findingDate = moment(data.findingDate).format("MM/DD/YYYY"))
          : null;

        !isNullOrUndefined(data.ProjectedDate)
          ? (data.ProjectedDate = moment(data.ProjectedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.When)
          ? (data.When = moment(data.When).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DueDate)
          ? (data.DueDate = moment(data.DueDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Completed)
          ? (data.Completed = moment(data.Completed).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DeterminationDate)
          ? (data.DeterminationDate = moment(data.DeterminationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.RequestSent)
          ? (data.RequestSent = moment(data.RequestSent).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Legacy_DtResent)
          ? (data.Legacy_DtResent = moment(data.Legacy_DtResent).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.Legacy_DtSentOrig)
          ? (data.Legacy_DtSentOrig = moment(data.Legacy_DtSentOrig).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.JEDate)
          ? (data.JEDate = moment(data.JEDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.OrderDate)
          ? (data.OrderDate = moment(data.OrderDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnteredDate)
          ? (data.EnteredDate = moment(data.EnteredDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ExamDate)
          ? (data.ExamDate = moment(data.ExamDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextExamDue)
          ? (data.NextExamDue = moment(data.NextExamDue).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.RevisitEndDate)
          ? (data.RevisitEndDate = moment(data.RevisitEndDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.MonthReported)
          ? (data.MonthReported = moment(data.MonthReported).format(
              "MMMM, YYYY"
            ))
          : null;
        !isNullOrUndefined(data.DateSent)
          ? (data.DateSent = moment(data.DateSent).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextAppointmentDate)
          ? (data.NextAppointmentDate = moment(data.NextAppointmentDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.cc_ChangedDate)
          ? (data.cc_ChangedDate = moment(data.cc_ChangedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.cc_EnteredDate)
          ? (data.cc_EnteredDate = moment(data.cc_EnteredDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.cm_ChangedDate)
          ? (data.cm_ChangedDate = moment(data.cm_ChangedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.DateOfLastIEP)
          ? (data.DateOfLastIEP = moment(data.DateOfLastIEP).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.Director_DateAuthorized)
          ? (data.Director_DateAuthorized = moment(
              data.Director_DateAuthorized
            ).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.PlacementNeeded)
          ? (data.PlacementNeeded = moment(data.PlacementNeeded).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.Date)
          ? (data.Date = moment(data.Date).format("MM/DD/YYYY"))
          : null;

        !isNullOrUndefined(data.EvaluationDate)
          ? (data.EvaluationDate = moment(data.EvaluationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.EventDate)
          ? (data.EventDate = moment(data.EventDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateSentToDCF)
          ? (data.DateSentToDCF = moment(data.DateSentToDCF).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.NextDueDate)
          ? (data.NextDueDate = moment(data.NextDueDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.cm_EnteredDate)
          ? (data.cm_EnteredDate = moment(data.cm_EnteredDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.EstimatedGraduationDate)
          ? (data.cm_EnteredDate = moment(data.EstimatedGraduationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.reportDate)
          ? (data.reportDate = moment(data.reportDate).format("MM/DD/YYYY"))
          : null;
        // !isNullOrUndefined(data.monthReported)
        //   ? (data.monthReported = moment(data.monthReported).format(
        //     "MMMM, YYYY"
        //   ))
        //   : null;
        !isNullOrUndefined(data.CreatedDate)
          ? (data.CreatedDate = moment(data.CreatedDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.UpdatedDate)
          ? (data.UpdatedDate = moment(data.UpdatedDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.UploadDate)
          ? (data.UploadDate = moment(data.UploadDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.changedDate)
          ? (data.changedDate = moment(data.changedDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DCFResponse)
          ? (data.DCFResponse = moment(data.DCFResponse).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.inactiveDate)
          ? (data.inactiveDate = moment(data.inactiveDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.sentToDCF)
          ? (data.sentToDCF = moment(data.sentToDCF).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dateSent)
          ? (data.dateSent = moment(data.dateSent).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.createdDate)
          ? (data.createdDate = moment(data.createdDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.adoptionPacketCompleted)
          ? (data.adoptionPacketCompleted = moment(
              data.adoptionPacketCompleted
            ).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.adoptionPacketSent)
          ? (data.adoptionPacketSent = moment(data.adoptionPacketSent).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.assessmentCompleted)
          ? (data.assessmentCompleted = moment(data.assessmentCompleted).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.Held)
          ? (data.Held = moment(data.Held).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DCFAuthorized)
          ? (data.DCFAuthorized = moment(data.DCFAuthorized).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.FamilyNotified)
          ? (data.FamilyNotified = moment(data.FamilyNotified).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.Requested)
          ? (data.Requested = moment(data.Requested).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DCFAuthRequested)
          ? (data.DCFAuthRequested = moment(data.DCFAuthRequested).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.DateSentSRS)
          ? (data.DateSentSRS = moment(data.DateSentSRS).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateReceivedDCFApproval)
          ? (data.DateReceivedDCFApproval = moment(
              data.DateReceivedDCFApproval
            ).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateDueToDCF)
          ? (data.DateDueToDCF = moment(data.DateDueToDCF).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextDueDate)
          ? (data.NextDueDate = moment(data.NextDueDate).format("MM/DD/YYYY"))
          : null;
        data.BeginDate !== null && data.BeginDate !== undefined
          ? (data.BeginDate = moment(data.BeginDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EndDate)
          ? (data.EndDate = moment(data.EndDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.endDate) &&
        data.endDate !== 0 &&
        data.endDate !== ""
          ? (data.endDate = moment(data.endDate).format("MM/DD/YYYY"))
          : null;
      } else {
        if (
          this.router.url.includes(
            "/reports/referral/family-preservation/progress-notes/view"
          )
        ) {
          if (data.BeginDate) {
            data["StartTime"] = moment(data.BeginDate).format("HH:mm");
          } else {
            data["StartTime"] = moment(data.beginDate).format("HH:mm");
          }
          if (data.Enddate) {
            data["EndTime"] = moment(data.Enddate).format("HH:mm");
          } else {
            data["EndTime"] = moment(data.endDate).format("HH:mm");
          }
        }

        !isNullOrUndefined(data.DOB)
          ? (data.DOB = moment.utc(data.DOB).format("MM/DD/YYYY"))
          : null;
        data.NotificationDate !== null && data.NotificationDate !== undefined
          ? (data.NotificationDate = moment
              .utc(data.NotificationDate)
              .format("MM/DD/YYYY"))
          : null;
        data.BeginDate !== null && data.BeginDate !== undefined
          ? (data.BeginDate = moment(data.BeginDate).format("MM/DD/YYYY"))
          : null;
        data.DiscoveryDate !== null && data.DiscoveryDate !== undefined
          ? (data.DiscoveryDate = moment
              .utc(data.DiscoveryDate)
              .format("MM/DD/YYYY"))
          : null;
        data.IncidentDate !== null && data.IncidentDate !== undefined
          ? (data.IncidentDate = moment
              .utc(data.IncidentDate)
              .format("MM/DD/YYYY"))
          : null;
        data.FollowUpCompletedDate !== null &&
        data.FollowUpCompletedDate !== undefined
          ? (data.FollowUpCompletedDate = moment
              .utc(data.FollowUpCompletedDate)
              .format("MM/DD/YYYY"))
          : null;
        data.IncidentTime !== null && data.IncidentTime !== undefined
          ? (data.IncidentTime = moment
              .utc(data.IncidentTime)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.completedDate)
          ? (data.completedDate = moment
              .utc(data.completedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dateSentToSRS)
          ? (data.dateSentToSRS = moment
              .utc(data.dateSentToSRS)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dueDate)
          ? (data.dueDate = moment.utc(data.dueDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = moment.utc(data.beginDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.evaluationDate)
          ? (data.evaluationDate = moment
              .utc(data.evaluationDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dob)
          ? (data.dob = moment.utc(data.dob).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.jeDate)
          ? (data.jeDate = moment.utc(data.jeDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.JEReceivedDate)
          ? (data.JEReceivedDate = moment
              .utc(data.JEReceivedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.orderDate)
          ? (data.orderDate = moment.utc(data.orderDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.receivedDate)
          ? (data.receivedDate = moment
              .utc(data.receivedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.determinationDate)
          ? (data.determinationDate = moment
              .utc(data.determinationDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.determinationReceivedByCC)
          ? (data.determinationReceivedByCC = moment
              .utc(data.determinationReceivedByCC)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.requestReceivedByCC)
          ? (data.requestReceivedByCC = moment
              .utc(data.requestReceivedByCC)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.requestSent)
          ? (data.requestSent = moment
              .utc(data.requestSent)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.servicesBeginDate)
          ? (data.servicesBeginDate = moment
              .utc(data.servicesBeginDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.servicesEndDate)
          ? (data.servicesEndDate = moment
              .utc(data.servicesEndDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.when)
          ? (data.when = moment.utc(data.when).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnrolledEndDate)
          ? (data.EnrolledEndDate = moment
              .utc(data.EnrolledEndDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnrolledBeginDate)
          ? (data.EnrolledBeginDate = moment
              .utc(data.EnrolledBeginDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.examDate)
          ? (data.examDate = moment.utc(data.examDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.nextExamDue)
          ? (data.nextExamDue = moment
              .utc(data.nextExamDue)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dateApplicationSubmitted)
          ? (data.dateApplicationSubmitted = moment
              .utc(data.dateApplicationSubmitted)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.KBHDate)
          ? (data.KBHDate = moment.utc(data.KBHDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.nextKBHDue)
          ? (data.nextKBHDue = moment.utc(data.nextKBHDue).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.CompletedDate)
          ? (data.CompletedDate = moment
              .utc(data.CompletedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.LastOccurrence)
          ? (data.LastOccurrence = moment
              .utc(data.LastOccurrence)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.completed)
          ? (data.completed = moment.utc(data.completed).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.requested)
          ? (data.requested = moment.utc(data.requested).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.legallyAvailable)
          ? (data.legallyAvailable = moment
              .utc(data.legallyAvailable)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.APADate)
          ? (data.APADate = moment.utc(data.APADate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ConsentSignedDate)
          ? (data.ConsentSignedDate = moment
              .utc(data.ConsentSignedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ConsentSentDate)
          ? (data.ConsentSentDate = moment
              .utc(data.ConsentSentDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.requestedDate)
          ? (data.requestedDate = moment
              .utc(data.requestedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.StatusDate)
          ? (data.StatusDate = moment.utc(data.StatusDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateOfPermanencyOrRelease)
          ? (data.DateOfPermanencyOrRelease = moment
              .utc(data.DateOfPermanencyOrRelease)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.nextDueDate)
          ? (data.nextDueDate = moment
              .utc(data.nextDueDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.closureDate)
          ? (data.closureDate = moment(data.closureDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.enteredDate)
          ? (data.enteredDate = moment
              .utc(data.enteredDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Enddate)
          ? (data.Enddate = moment.utc(data.Enddate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.date)
          ? (data.date = moment.utc(data.date).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnteredDate)
          ? (data.EnteredDate = moment
              .utc(data.EnteredDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.LastModifiedDate)
          ? (data.LastModifiedDate = moment
              .utc(data.LastModifiedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NotificationDate)
          ? (data.NotificationDate = moment
              .utc(data.NotificationDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.UpdatedDate)
          ? (data.UpdatedDate = moment
              .utc(data.UpdatedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ChangedDate)
          ? (data.ChangedDate = moment
              .utc(data.ChangedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.eventDate)
          ? (data.eventDate = moment.utc(data.eventDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.BilledDate)
          ? (data.BilledDate = moment.utc(data.BilledDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.findingDate)
          ? (data.findingDate = moment
              .utc(data.findingDate)
              .format("MM/DD/YYYY"))
          : null;

        !isNullOrUndefined(data.ProjectedDate)
          ? (data.ProjectedDate = moment
              .utc(data.ProjectedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.When)
          ? (data.When = moment.utc(data.When).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DueDate)
          ? (data.DueDate = moment.utc(data.DueDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Completed)
          ? (data.Completed = moment.utc(data.Completed).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DeterminationDate)
          ? (data.DeterminationDate = moment
              .utc(data.DeterminationDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.RequestSent)
          ? (data.RequestSent = moment
              .utc(data.RequestSent)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Legacy_DtResent)
          ? (data.Legacy_DtResent = moment
              .utc(data.Legacy_DtResent)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Legacy_DtSentOrig)
          ? (data.Legacy_DtSentOrig = moment
              .utc(data.Legacy_DtSentOrig)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.JEDate)
          ? (data.JEDate = moment.utc(data.JEDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.OrderDate)
          ? (data.OrderDate = moment.utc(data.OrderDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnteredDate)
          ? (data.EnteredDate = moment
              .utc(data.EnteredDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ExamDate)
          ? (data.ExamDate = moment.utc(data.ExamDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextExamDue)
          ? (data.NextExamDue = moment
              .utc(data.NextExamDue)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.RevisitEndDate)
          ? (data.RevisitEndDate = moment
              .utc(data.RevisitEndDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.MonthReported)
          ? (data.MonthReported = moment
              .utc(data.MonthReported)
              .format("MMMM, YYYY"))
          : null;
        !isNullOrUndefined(data.DateSent)
          ? (data.DateSent = moment.utc(data.DateSent).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextAppointmentDate)
          ? (data.NextAppointmentDate = moment
              .utc(data.NextAppointmentDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.cc_ChangedDate)
          ? (data.cc_ChangedDate = moment
              .utc(data.cc_ChangedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.cc_EnteredDate)
          ? (data.cc_EnteredDate = moment
              .utc(data.cc_EnteredDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.cm_ChangedDate)
          ? (data.cm_ChangedDate = moment
              .utc(data.cm_ChangedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateOfLastIEP)
          ? (data.DateOfLastIEP = moment
              .utc(data.DateOfLastIEP)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Director_DateAuthorized)
          ? (data.Director_DateAuthorized = moment
              .utc(data.Director_DateAuthorized)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.PlacementNeeded)
          ? (data.PlacementNeeded = moment
              .utc(data.PlacementNeeded)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Date)
          ? (data.Date = moment.utc(data.Date).format("MM/DD/YYYY"))
          : null;

        !isNullOrUndefined(data.EvaluationDate)
          ? (data.EvaluationDate = moment
              .utc(data.EvaluationDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EventDate)
          ? (data.EventDate = moment.utc(data.EventDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateSentToDCF)
          ? (data.DateSentToDCF = moment
              .utc(data.DateSentToDCF)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextDueDate)
          ? (data.NextDueDate = moment
              .utc(data.NextDueDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.cm_EnteredDate)
          ? (data.cm_EnteredDate = moment
              .utc(data.cm_EnteredDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EstimatedGraduationDate)
          ? (data.cm_EnteredDate = moment
              .utc(data.EstimatedGraduationDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.reportDate)
          ? (data.reportDate = moment.utc(data.reportDate).format("MM/DD/YYYY"))
          : null;
        // !isNullOrUndefined(data.monthReported)
        //   ? (data.monthReported = moment
        //     .utc(data.monthReported)
        //     .format("MMMM, YYYY"))
        //   : null;
        !isNullOrUndefined(data.CreatedDate)
          ? (data.CreatedDate = moment
              .utc(data.CreatedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.UpdatedDate)
          ? (data.UpdatedDate = moment
              .utc(data.UpdatedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.UploadDate)
          ? (data.UploadDate = moment.utc(data.UploadDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.changedDate)
          ? (data.changedDate = moment
              .utc(data.changedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DCFResponse)
          ? (data.DCFResponse = moment
              .utc(data.DCFResponse)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.inactiveDate)
          ? (data.inactiveDate = moment
              .utc(data.inactiveDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.sentToDCF)
          ? (data.sentToDCF = moment.utc(data.sentToDCF).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dateSent)
          ? (data.dateSent = moment.utc(data.dateSent).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.createdDate)
          ? (data.createdDate = moment
              .utc(data.createdDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.adoptionPacketCompleted)
          ? (data.adoptionPacketCompleted = moment
              .utc(data.adoptionPacketCompleted)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.adoptionPacketSent)
          ? (data.adoptionPacketSent = moment
              .utc(data.adoptionPacketSent)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.assessmentCompleted)
          ? (data.assessmentCompleted = moment
              .utc(data.assessmentCompleted)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Held)
          ? (data.Held = moment.utc(data.Held).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DCFAuthorized)
          ? (data.DCFAuthorized = moment
              .utc(data.DCFAuthorized)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.FamilyNotified)
          ? (data.FamilyNotified = moment
              .utc(data.FamilyNotified)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Requested)
          ? (data.Requested = moment.utc(data.Requested).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DCFAuthRequested)
          ? (data.DCFAuthRequested = moment
              .utc(data.DCFAuthRequested)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateSentSRS)
          ? (data.DateSentSRS = moment
              .utc(data.DateSentSRS)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateReceivedDCFApproval)
          ? (data.DateReceivedDCFApproval = moment
              .utc(data.DateReceivedDCFApproval)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateDueToDCF)
          ? (data.DateDueToDCF = moment
              .utc(data.DateDueToDCF)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextDueDate)
          ? (data.NextDueDate = moment
              .utc(data.NextDueDate)
              .format("MM/DD/YYYY"))
          : null;
      }
      data.BeginDate !== null && data.BeginDate !== undefined
        ? (data.BeginDate = moment(data.BeginDate).format("MM/DD/YYYY"))
        : null;
      !isNullOrUndefined(data.EndDate)
        ? (data.EndDate = moment(data.EndDate).format("MM/DD/YYYY"))
        : null;
      !isNullOrUndefined(data.endDate) &&
      data.endDate !== 0 &&
      data.endDate !== ""
        ? (data.endDate = moment(data.endDate).format("MM/DD/YYYY"))
        : null;

      !isNullOrUndefined(data.Licensed_EnteredDate)
        ? (data.Licensed_EnteredDate = moment(data.Licensed_EnteredDate).format(
            "MM/DD/YYYY"
          ))
        : null;
      !isNullOrUndefined(data.Unlicensed_EnteredDate)
        ? (data.Unlicensed_EnteredDate = moment(
            data.Unlicensed_EnteredDate
          ).format("MM/DD/YYYY"))
        : null;
      rowData.push(data);
    });

    if (this.rowData.length > 0) {
      let arrangments = [];
      this.headers.push(Object.keys(this.rowData[0]));
      this.headers[0].map((data) => {
        this.sortcolumnDropdownList.push({ label: data, value: data });
        this.columnDropdownList.push({ label: data, value: data });
        console.log("This new master", this.master);
        if (this.master == "caseactivity") {
          switch (data) {
            case "caseActivityID":
              arrangments.push({ data: data, order: 5 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 6 });
              break;
            case "units":
              arrangments.push({ data: data, order: 7 });
              break;
            case "procode":
              arrangments.push({ data: data, order: 3 });
              break;
            case "staffName":
              arrangments.push({ data: data, order: 4 });
              break;
            case "contactType":
              arrangments.push({ data: data, order: 2 });
              break;
          }
        } else if (this.master === "monthlyReports") {
          switch (data) {
            case "monthReported":
              arrangments.push({ data: data, order: 1 });
              break;
            case "monthlyReportType":
              arrangments.push({ data: data, order: 2 });
              break;
            case "sponsorName":
              arrangments.push({ data: data, order: 3 });
              break;
            case "staffName":
              arrangments.push({ data: data, order: 4 });
              break;
            case "dateSent":
              arrangments.push({ data: data, order: 5 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 6 });
              break;
            case "isEmailed":
              arrangments.push({ data: data, order: 7 });
              break;
            case "emailedNotes":
              arrangments.push({ data: data, order: 8 });
              break;
            // case 'isEducationProgress':
            //   arrangments.push({ data: data, order: 9 })
            //   break;
            // case 'isMedicationSideEffects':
            //   arrangments.push({ data: data, order: 10 })
            //   break;
            case "monthlyReportID":
              arrangments.push({ data: data, order: 9 });
              break;
            case "referralID":
              arrangments.push({ data: data, order: 10 });
              break;
          }
        } else if (this.master === "assessments") {
          switch (data) {
            case "assessmentID":
              arrangments.push({ data: data, order: 12 });
              break;
            case "assessmentValue":
              arrangments.push({ data: data, order: 5 });
              break;
            case "completedDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "dueDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "dateSentToSRS":
              arrangments.push({ data: data, order: 6 });
              break;
            case "isOnTime":
              arrangments.push({ data: data, order: 7 });
              break;
            case "isAccurate":
              arrangments.push({ data: data, order: 8 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 9 });
              break;
            case "isNA":
              arrangments.push({ data: data, order: 10 });
              break;
            case "attachedDocuments":
              arrangments.push({ data: data, order: 11 });
              break;
            case "assessmentType":
              arrangments.push({ data: data, order: 1 });
              break;
            case "assessmentCategory":
              arrangments.push({ data: data, order: 2 });
              break;
          }
        } else if (this.master === "opencardByClientMedication") {
          switch (data) {
            case "RationaleForChanges":
              arrangments.push({ data: data, order: 10 });
              break;
            case "ClientName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "Medication":
              arrangments.push({ data: data, order: 2 });
              break;
            case "Dosage":
              arrangments.push({ data: data, order: 3 });
              break;
            case "DosageType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 5 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 6 });
              break;
            case "FrequencyType":
              arrangments.push({ data: data, order: 7 });
              break;
            case "FrequencyNotes":
              arrangments.push({ data: data, order: 8 });
              break;
            case "PrescribedFor":
              arrangments.push({ data: data, order: 9 });
              break;
            case "PrescribedBy":
              arrangments.push({ data: data, order: 11 });
              break;
            case "SourceOfInfo":
              arrangments.push({ data: data, order: 12 });
              break;
            case "clientMedicationID":
              arrangments.push({ data: data, order: 13 });
              break;
          }
        } else if (this.master === "cases") {
          switch (data) {
            case "FirstName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "LastName":
              arrangments.push({ data: data, order: 2 });
              break;
            case "PayorName":
              arrangments.push({ data: data, order: 3 });
              break;
            case "ReferralType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "Description":
              arrangments.push({ data: data, order: 5 });
              break;
            case "serviceType":
              arrangments.push({ data: data, order: 6 });
              break;
            case "Facts":
              arrangments.push({ data: data, order: 7 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 8 });
              break;
            case "closureDate":
              arrangments.push({ data: data, order: 9 });
              break;
            case "referralID":
              arrangments.push({ data: data, order: 10 });
              break;
          }
        } else if (this.master === "opencardByClientProfile") {
          switch (data) {
            case "ClientName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "Condition":
              arrangments.push({ data: data, order: 4 });
              break;
            case "FrequencyType":
              arrangments.push({ data: data, order: 5 });
              break;
            case "Risk":
              arrangments.push({ data: data, order: 6 });
              break;
            case "LastOccurrence":
              arrangments.push({ data: data, order: 7 });
              break;
            case "NotificationDate":
              arrangments.push({ data: data, order: 8 });
              break;
            case "NoteAnyInjuries":
              arrangments.push({ data: data, order: 9 });
              break;
            case "Notes":
              arrangments.push({ data: data, order: 10 });
              break;
            case "Triggers":
              arrangments.push({ data: data, order: 11 });
              break;
            case "WhoNeedsToBeProtected":
              arrangments.push({ data: data, order: 12 });
              break;
            case "clientProfileID":
              arrangments.push({ data: data, order: 13 });
              break;
          }
        } else if (this.master === "opencardByClientStrength") {
          switch (data) {
            case "ClientName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "Strength":
              arrangments.push({ data: data, order: 2 });
              break;
            case "StrengthInformationSource":
              arrangments.push({ data: data, order: 3 });
              break;
            case "Current":
              arrangments.push({ data: data, order: 4 });
              break;
            case "Explanation":
              arrangments.push({ data: data, order: 5 });
              break;
            case "clientStrengthID":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        } else if (this.master === "courtCase") {
          switch (data) {
            case "ClientName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "ReferralType":
              arrangments.push({ data: data, order: 2 });
              break;
            case "Description":
              arrangments.push({ data: data, order: 3 });
              break;
            case "CourtCaseNo":
              arrangments.push({ data: data, order: 4 });
              break;
            case "CountyName":
              arrangments.push({ data: data, order: 5 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 6 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 7 });
              break;
            case "CaseType":
              arrangments.push({ data: data, order: 8 });
              break;
            case "courtCaseID":
              arrangments.push({ data: data, order: 9 });
              break;
          }
        } else if (this.master === "TPL") {
          switch (data) {
            case "beginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "Company":
              arrangments.push({ data: data, order: 3 });
              break;
            case "clientTPLID":
              arrangments.push({ data: data, order: 4 });
              break;
          }
        } else if (this.master === "preventativeMeasurements") {
          switch (data) {
            case "ClientName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "PreventativeMeasure":
              arrangments.push({ data: data, order: 2 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "Notes":
              arrangments.push({ data: data, order: 5 });
              break;
            case "clientPreventativeMeasureID":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        } else if (
          this.master === "ciritical-incident" ||
          this.master === "ciritical-incident-provider" ||
          this.master === "ciritical-incident-allinvolve" ||
          this.master === "ciritical-incident-RM"
        ) {
          switch (data) {
            case "ReportID":
              arrangments.push({ data: data, order: 1 });
              break;
            case "DiscoveryDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "IncidentDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "IncidentType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "UnusualIncidentID":
            case "unusualIncidentID":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "customerCare") {
          switch (data) {
            case "reportDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "reportID":
              arrangments.push({ data: data, order: 2 });
              break;
            case "custCareReportID":
              arrangments.push({ data: data, order: 3 });
              break;
          }
        } else if (this.master === "caseTeam") {
          switch (data) {
            case "beginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "personType":
              arrangments.push({ data: data, order: 3 });
              break;
            case "name":
              arrangments.push({ data: data, order: 4 });
              break;
            case "mentor":
              arrangments.push({ data: data, order: 5 });
              break;
            case "mailACK":
              arrangments.push({ data: data, order: 6 });
              break;
            case "faxACK":
              arrangments.push({ data: data, order: 7 });
              break;
            case "emailACK":
              arrangments.push({ data: data, order: 8 });
              break;
            // case 'referralID':
            //   arrangments.push({ data: data, order: 5 })
            //   break;
            case "caseTeamID":
              arrangments.push({ data: data, order: 9 });
              break;
          }
        } else if (this.master === "extendedFamily") {
          switch (data) {
            case "familyMember":
              arrangments.push({ data: data, order: 1 });
              break;
            case "personType":
              arrangments.push({ data: data, order: 2 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "phoneNumber":
              arrangments.push({ data: data, order: 5 });
              break;
            case "address":
              arrangments.push({ data: data, order: 6 });
              break;
            case "state":
              arrangments.push({ data: data, order: 7 });
              break;
            case "city":
              arrangments.push({ data: data, order: 8 });
              break;
            case "zipcode":
              arrangments.push({ data: data, order: 9 });
              break;
            case "isCourtOrderedRestriction":
              arrangments.push({ data: data, order: 10 });
              break;
            case "frequencyType":
              arrangments.push({ data: data, order: 11 });
              break;
            case "dob":
              arrangments.push({ data: data, order: 12 });
              break;
            case "RestrictionType":
              arrangments.push({ data: data, order: 13 });
              break;
            case "Gender":
              arrangments.push({ data: data, order: 14 });
              break;
            case "race":
              arrangments.push({ data: data, order: 15 });
              break;
            case "familyMemberReferralID":
              arrangments.push({ data: data, order: 16 });
              break;
          }
        } else if (this.master === "familySafety") {
          switch (data) {
            case "eventNumber":
              arrangments.push({ data: data, order: 1 });
              break;
            case "eventDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "Notes":
              arrangments.push({ data: data, order: 3 });
              break;
            case "familySafetyID":
              arrangments.push({ data: data, order: 4 });
              break;
          }
        } else if (this.master === "FIS") {
          switch (data) {
            case "clientName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "personType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "kaecses":
              arrangments.push({ data: data, order: 5 });
              break;
            case "dob":
              arrangments.push({ data: data, order: 6 });
              break;
            case "isCaseHead":
              arrangments.push({ data: data, order: 7 });
              break;
            case "clientReferralID":
              arrangments.push({ data: data, order: 8 });
              break;
            case "clientID":
              arrangments.push({ data: data, order: 9 });
              break;
          }
        } else if (this.master === "HoH") {
          switch (data) {
            case "clientName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "personType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "clientID":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "homeCounty") {
          switch (data) {
            case "countyName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "homeCountyID":
              arrangments.push({ data: data, order: 4 });
              break;
          }
        } else if (this.master === "casePlanGoals") {
          switch (data) {
            case "completedDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "CasePlanType":
              arrangments.push({ data: data, order: 2 });
              break;
            case "CasePlanGoal":
              arrangments.push({ data: data, order: 3 });
              break;
            case "Secondary_CasePlanGoal":
              arrangments.push({ data: data, order: 4 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 5 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 6 });
              break;
            case "DateDueToDCF":
              arrangments.push({ data: data, order: 7 });
              break;
            case "DateReceivedDCFApproval":
              arrangments.push({ data: data, order: 8 });
              break;
            case "DueDate":
              arrangments.push({ data: data, order: 9 });
              break;
            case "casePlanID":
              arrangments.push({ data: data, order: 10 });
              break;
          }
        } else if (this.master === "sfcsOffice") {
          switch (data) {
            case "BeginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "sfmOffice":
              arrangments.push({ data: data, order: 3 });
              break;
            case "sfmOfficeType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "sfaOfficeActivityID":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "sfcsOffice") {
          switch (data) {
            case "clientName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "location":
              arrangments.push({ data: data, order: 4 });
              break;
            case "procode":
              arrangments.push({ data: data, order: 5 });
              break;
            case "NonTherapyFaceToFaceID":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        } else if (this.master === "phase") {
          switch (data) {
            case "PhaseType":
              arrangments.push({ data: data, order: 1 });
              break;
            case "OpenBy":
              arrangments.push({ data: data, order: 2 });
              break;
            case "PhaseClosureReason":
              arrangments.push({ data: data, order: 3 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 5 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 6 });
              break;
            case "referralID":
              arrangments.push({ data: data, order: 7 });
              break;
            case "phaseID":
              arrangments.push({ data: data, order: 8 });
              break;
          }
        } else if (this.master === "progressNote") {
          switch (data) {
            case "clientName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "Enddate":
              arrangments.push({ data: data, order: 3 });
              break;
            // case 'StartTime':
            //   arrangments.push({ data: data, order: 4 })
            //   break;
            // case 'EndTime':
            //   arrangments.push({ data: data, order: 5 })
            //   break;
            case "therapistName":
              arrangments.push({ data: data, order: 4 });
              break;
            case "StatusType":
              arrangments.push({ data: data, order: 5 });
              break;
            // case 'diagnosisCode':
            //   arrangments.push({ data: data, order: 8 })
            //   break;
            case "progressNoteID":
              arrangments.push({ data: data, order: 6 });
              break;
            case "caseActivityID":
              arrangments.push({ data: data, order: 7 });
              break;
          }
        } else if (this.master === "caseEval") {
          switch (data) {
            case "evaluationDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "totalScore":
              arrangments.push({ data: data, order: 2 });
              break;
            case "correctedScore":
              arrangments.push({ data: data, order: 3 });
              break;
            case "evaluationType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "evaluationID":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "pnDiagnosisEntry") {
          switch (data) {
            case "clientName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "Enddate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "DiagnosisCode":
              arrangments.push({ data: data, order: 4 });
              break;
            case "dob":
              arrangments.push({ data: data, order: 5 });
              break;
            case "clarification":
              arrangments.push({ data: data, order: 6 });
              break;
            case "IsPrimary":
              arrangments.push({ data: data, order: 7 });
              break;
            case "progressNoteDiagnosisID":
              arrangments.push({ data: data, order: 8 });
              break;
          }
        } else if (this.master === "referralEvents") {
          switch (data) {
            case "payorName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "Enddate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "procode":
              arrangments.push({ data: data, order: 4 });
              break;
            case "ReferralEventType":
              arrangments.push({ data: data, order: 5 });
              break;
            case "units":
              arrangments.push({ data: data, order: 6 });
              break;
            case "unitRate":
              arrangments.push({ data: data, order: 7 });
              break;
            case "referralEventID":
              arrangments.push({ data: data, order: 8 });
              break;
            case "referralID":
              arrangments.push({ data: data, order: 9 });
              break;
          }
        } else if (this.master === "courtOrder") {
          switch (data) {
            case "orderDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "courtOrder":
              arrangments.push({ data: data, order: 2 });
              break;
            case "jeDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "JEReceivedDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "judge":
              arrangments.push({ data: data, order: 5 });
              break;
            case "courtOrderedID":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        } else if (this.master === "KIPP/PMTO") {
          switch (data) {
            case "BeginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "kippID":
              arrangments.push({ data: data, order: 3 });
              break;
          }
        } else if (this.master === "directAuthList") {
          switch (data) {
            case "firstName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "lastName":
              arrangments.push({ data: data, order: 2 });
              break;
            case "vendorName":
              arrangments.push({ data: data, order: 3 });
              break;
            case "vendorType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "paymentType":
              arrangments.push({ data: data, order: 5 });
              break;
            case "receivedDate":
              arrangments.push({ data: data, order: 6 });
              break;
            case "Kaecses":
              arrangments.push({ data: data, order: 7 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 8 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 9 });
              break;
            case "procode":
              arrangments.push({ data: data, order: 10 });
              break;
            case "totalPayorRate":
              arrangments.push({ data: data, order: 11 });
              break;
            case "totalProviderRate":
              arrangments.push({ data: data, order: 12 });
              break;
            case "units":
              arrangments.push({ data: data, order: 13 });
              break;
            case "GLKey":
              arrangments.push({ data: data, order: 14 });
              break;
            case "paymentNotes":
              arrangments.push({ data: data, order: 15 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 16 });
              break;
            case "status":
              arrangments.push({ data: data, order: 17 });
              break;
            case "claimID":
              arrangments.push({ data: data, order: 18 });
              break;
            case "referralID":
              arrangments.push({ data: data, order: 19 });
              break;
          }
        } else if (this.master === "hardGoods") {
          switch (data) {
            case "vendorName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "vendorType":
              arrangments.push({ data: data, order: 2 });
              break;
            case "payorRate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "unitsAuth":
              arrangments.push({ data: data, order: 4 });
              break;
            case "PayorRate":
              arrangments.push({ data: data, order: 5 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 6 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 7 });
              break;
            case "authorizationStatus":
              arrangments.push({ data: data, order: 8 });
              break;
            case "procode":
              arrangments.push({ data: data, order: 8 });
              break;
            case "authorizationID":
              arrangments.push({ data: data, order: 9 });
              break;
            case "ReferralID":
              arrangments.push({ data: data, order: 10 });
              break;
          }
        } else if (this.master === "otherServices") {
          switch (data) {
            case "vendorName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "vendorType":
              arrangments.push({ data: data, order: 2 });
              break;
            case "UnitsAuth":
              arrangments.push({ data: data, order: 3 });
              break;
            case "PayorRate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 5 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 6 });
              break;
            case "authorizationStatus":
              arrangments.push({ data: data, order: 7 });
              break;
            case "payorRate":
              arrangments.push({ data: data, order: 8 });
              break;
            case "procode":
              arrangments.push({ data: data, order: 9 });
              break;
            case "authorizationID":
              arrangments.push({ data: data, order: 10 });
              break;
            case "ReferralID":
              arrangments.push({ data: data, order: 11 });
              break;
          }
        } else if (this.master === "authorizationSummary") {
          switch (data) {
            case "payeeName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "providerName":
              arrangments.push({ data: data, order: 2 });
              break;
            case "vendorName":
              arrangments.push({ data: data, order: 3 });
              break;
            case "vendorType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "authorizationStatus":
              arrangments.push({ data: data, order: 5 });
              break;
            case "payorRate":
              arrangments.push({ data: data, order: 6 });
              break;
            case "unitsAuth":
              arrangments.push({ data: data, order: 7 });
              break;
            case "procode":
              arrangments.push({ data: data, order: 8 });
              break;
            case "AuthorizationID":
              arrangments.push({ data: data, order: 9 });
              break;
            case "ReferralID":
              arrangments.push({ data: data, order: 10 });
              break;
          }
        } else if (this.master === "lackOfContact") {
          switch (data) {
            case "enteredDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "ScannedDocumentID":
              arrangments.push({ data: data, order: 2 });
              break;
            case "caseActivityID":
              arrangments.push({ data: data, order: 3 });
              break;
          }
        } else if (this.master === "adoption") {
          switch (data) {
            case "legallyAvailable":
              arrangments.push({ data: data, order: 1 });
              break;
            case "adoptionID":
              arrangments.push({ data: data, order: 2 });
              break;
            case "referralID":
              arrangments.push({ data: data, order: 3 });
              break;
          }
        } else if (this.master === "appointments") {
          switch (data) {
            case "appointmentType":
              arrangments.push({ data: data, order: 1 });
              break;

            case "notes":
              arrangments.push({ data: data, order: 2 });
              break;
            case "when":
              arrangments.push({ data: data, order: 3 });
              break;
            case "where":
              arrangments.push({ data: data, order: 4 });
              break;
            case "withWhom":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "clientSSI") {
          switch (data) {
            case "ssiType":
              arrangments.push({ data: data, order: 1 });
              break;
            case "dateApplicationSubmitted":
              arrangments.push({ data: data, order: 2 });
              break;
            case "determinationType":
              arrangments.push({ data: data, order: 3 });
              break;
            case "clientSSIID":
              arrangments.push({ data: data, order: 4 });
              break;
            case "clientID":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "sfcsOffice") {
          switch (data) {
            case "BeginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "OfficeName":
              arrangments.push({ data: data, order: 3 });
              break;
            case "SFAOfficeType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "sfaOfficeActivityID":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "creditTracking") {
          switch (data) {
            case "BeginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "creditHours":
              arrangments.push({ data: data, order: 3 });
              break;
            case "creditTrackingID":
              arrangments.push({ data: data, order: 4 });
              break;
          }
        } else if (this.master === "educationEnrollment") {
          switch (data) {
            case "Name":
              arrangments.push({ data: data, order: 1 });
              break;
            case "DocStatus":
              arrangments.push({ data: data, order: 2 });
              break;
            case "enteredDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "pdfdocID":
              arrangments.push({ data: data, order: 4 });
              break;
            case "referralID":
              arrangments.push({ data: data, order: 5 });
              break;
            case "sfaOfficeActivityID":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        } else if (this.master === "generalSchool") {
          switch (data) {
            case "CompletedDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "GeneralEducationType":
              arrangments.push({ data: data, order: 2 });
              break;
            case "generalEducationID":
              arrangments.push({ data: data, order: 3 });
              break;
          }
        } else if (this.master === "specialEducation") {
          switch (data) {
            case "BeginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "primaryExceptionalityType":
              arrangments.push({ data: data, order: 3 });
              break;
            case "specialEducationID":
              arrangments.push({ data: data, order: 4 });
              break;
          }
        } else if (this.master === "attendingSchool") {
          switch (data) {
            case "BeginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "EnrolledBeginDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "EnrolledEndDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "schoolName":
              arrangments.push({ data: data, order: 5 });
              break;
            case "changeReason":
              arrangments.push({ data: data, order: 6 });
              break;
            case "clientSchoolID":
              arrangments.push({ data: data, order: 7 });
              break;
          }
        } else if (this.master === "gradeLevel") {
          switch (data) {
            case "beginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "IsComplete":
              arrangments.push({ data: data, order: 3 });
              break;
            case "grade":
              arrangments.push({ data: data, order: 4 });
              break;
            case "clientGradeID":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "schoolRelease") {
          switch (data) {
            case "beginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "SchoolReleaseType":
              arrangments.push({ data: data, order: 3 });
              break;
            case "schoolReleaseID":
              arrangments.push({ data: data, order: 4 });
              break;
          }
        } else if (this.master === "homeSchool") {
          switch (data) {
            case "beginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "schoolName":
              arrangments.push({ data: data, order: 2 });
              break;
            case "homeSchoolID":
              arrangments.push({ data: data, order: 3 });
              break;
          }
        } else if (this.master === "monthlyReports") {
          switch (data) {
            case "staffName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "dateSent":
              arrangments.push({ data: data, order: 2 });
              break;
            case "emailedNotes":
              arrangments.push({ data: data, order: 3 });
              break;
            case "monthlyReportType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "isEducationProgress":
              arrangments.push({ data: data, order: 5 });
              break;
            case "isEmailed":
              arrangments.push({ data: data, order: 6 });
              break;
            case "isMedicationSideEffects":
              arrangments.push({ data: data, order: 7 });
              break;
            case "monthReported":
              arrangments.push({ data: data, order: 8 });
              break;
            case "sponsorName":
              arrangments.push({ data: data, order: 9 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 10 });
              break;
            case "monthlyReportID":
              arrangments.push({ data: data, order: 11 });
              break;
            case "referralID":
              arrangments.push({ data: data, order: 12 });
              break;
          }
        } else if (this.master === "bhDetermination") {
          switch (data) {
            case "firstName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "lastName":
              arrangments.push({ data: data, order: 2 });
              break;
            case "mentalHealthProvider":
              arrangments.push({ data: data, order: 3 });
              break;
            case "BHDeterminationType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "requestSent":
              arrangments.push({ data: data, order: 5 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 6 });
              break;
            case "determinationReceivedByCC":
              arrangments.push({ data: data, order: 7 });
              break;
            case "requestReceivedByCC":
              arrangments.push({ data: data, order: 8 });
              break;
            case "servicesBeginDate":
              arrangments.push({ data: data, order: 9 });
              break;
            case "servicesEndDate":
              arrangments.push({ data: data, order: 10 });
              break;
            case "BHRequestType":
              arrangments.push({ data: data, order: 11 });
              break;
            case "courtOrdered":
              arrangments.push({ data: data, order: 12 });
              break;
            case "sedWaiver":
              arrangments.push({ data: data, order: 13 });
              break;
            case "determinationDate":
              arrangments.push({ data: data, order: 14 });
              break;
            case "referralID":
              arrangments.push({ data: data, order: 15 });
              break;
            case "clientID":
              arrangments.push({ data: data, order: 16 });
              break;
            case "BHDeterminationID":
              arrangments.push({ data: data, order: 17 });
              break;
          }
        } else if (this.master === "healthRecord") {
          switch (data) {
            case "examDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "healthExamType":
              arrangments.push({ data: data, order: 2 });
              break;
            case "followUpRequired":
              arrangments.push({ data: data, order: 3 });
              break;
            case "nextExamDue":
              arrangments.push({ data: data, order: 4 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 5 });
              break;
            case "isEmailed":
              arrangments.push({ data: data, order: 6 });
              break;
            case "healthExamID":
              arrangments.push({ data: data, order: 7 });
              break;
            case "referralID":
              arrangments.push({ data: data, order: 8 });
              break;
            case "clientID":
              arrangments.push({ data: data, order: 9 });
              break;
          }
        } else if (this.master === "immunization") {
          switch (data) {
            case "ageGroupType_Month":
              arrangments.push({ data: data, order: 1 });
              break;
            case "completedDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "nextDueDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "immunizationID":
              arrangments.push({ data: data, order: 4 });
              break;
          }
        } else if (this.master === "kan-be-healthy") {
          switch (data) {
            case "height":
              arrangments.push({ data: data, order: 1 });
              break;
            case "weight":
              arrangments.push({ data: data, order: 2 });
              break;
            case "kanBeHealthyType":
              arrangments.push({ data: data, order: 3 });
              break;
            case "followUpRequired":
              arrangments.push({ data: data, order: 4 });
              break;
            case "KBHDate":
              arrangments.push({ data: data, order: 5 });
              break;
            case "nextKBHDue":
              arrangments.push({ data: data, order: 6 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 7 });
              break;
            case "kanBeHealthyID":
              arrangments.push({ data: data, order: 8 });
              break;
            case "referralID":
              arrangments.push({ data: data, order: 9 });
              break;
            case "clientID":
              arrangments.push({ data: data, order: 10 });
              break;
          }
        } else if (this.master === "waiver") {
          switch (data) {
            case "BeginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "tierLevelType":
              arrangments.push({ data: data, order: 3 });
              break;
            case "MRDDResidentialServices":
              arrangments.push({ data: data, order: 4 });
              break;
            case "waiverActivityID":
              arrangments.push({ data: data, order: 5 });
              break;
            case "ReferralID":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        } else if (this.master === "kipp") {
          switch (data) {
            case "BeginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "kippServiceType":
              arrangments.push({ data: data, order: 3 });
              break;
            case "kippID":
              arrangments.push({ data: data, order: 4 });
              break;
          }
        } else if (this.master === "independentLiving") {
          switch (data) {
            case "CompletedDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "IndependentLivingType":
              arrangments.push({ data: data, order: 2 });
              break;
            case "independentLivingID":
              arrangments.push({ data: data, order: 3 });
              break;
          }
        } else if (this.master === "homeCounty") {
          switch (data) {
            case "beginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "countyName":
              arrangments.push({ data: data, order: 3 });
              break;
            case "homeCountyID":
              arrangments.push({ data: data, order: 4 });
              break;
          }
        } else if (this.master === "provider") {
          switch (data) {
            case "providerName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "providerType":
              arrangments.push({ data: data, order: 2 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "status":
              arrangments.push({ data: data, order: 5 });
              break;
            case "address1":
              arrangments.push({ data: data, order: 6 });
              break;
            case "address2":
              arrangments.push({ data: data, order: 7 });
              break;
            case "city":
              arrangments.push({ data: data, order: 8 });
              break;
            case "state":
              arrangments.push({ data: data, order: 9 });
              break;
            case "countyName":
              arrangments.push({ data: data, order: 10 });
              break;
            case "email":
              arrangments.push({ data: data, order: 11 });
              break;
            case "providerID":
              arrangments.push({ data: data, order: 12 });
              break;
          }
        } else if (this.master === "providerLocation") {
          switch (data) {
            case "Location Type":
              arrangments.push({ data: data, order: 1 });
              break;
            case "Address1":
              arrangments.push({ data: data, order: 2 });
              break;
            case "Address2":
              arrangments.push({ data: data, order: 3 });
              break;
            case "State":
              arrangments.push({ data: data, order: 4 });
              break;
            case "City":
              arrangments.push({ data: data, order: 5 });
              break;
            case "County":
              arrangments.push({ data: data, order: 6 });
              break;
            case "Zip Code":
              arrangments.push({ data: data, order: 7 });
              break;
            case "Phone":
              arrangments.push({ data: data, order: 8 });
              break;
            case "Fax":
              arrangments.push({ data: data, order: 9 });
              break;
            case "Begin Date":
              arrangments.push({ data: data, order: 10 });
              break;
            case "End Date":
              arrangments.push({ data: data, order: 11 });
              break;
            case "Location Header":
              arrangments.push({ data: data, order: 12 });
              break;
            case "Notes":
              arrangments.push({ data: data, order: 13 });
              break;
            case "EnteredBy":
              arrangments.push({ data: data, order: 14 });
              break;
            case "EnteredDate":
              arrangments.push({ data: data, order: 15 });
              break;
            case "ChangedBy":
              arrangments.push({ data: data, order: 16 });
              break;
            case "ChangedDate":
              arrangments.push({ data: data, order: 17 });
              break;
            case "ProviderID":
              arrangments.push({ data: data, order: 18 });
              break;
            case "ProviderLocationID":
              arrangments.push({ data: data, order: 19 });
              break;
          }
        } else if (this.master === "providerOffice") {
          switch (data) {
            case "BeginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "OfficeName":
              arrangments.push({ data: data, order: 3 });
              break;
            case "SFAOfficeType":
              arrangments.push({ data: data, order: 3 });
              break;
          }
        } else if (
          this.master === "providerOtherAgencyStaff" ||
          this.master === "providerStaff"
        ) {
          switch (data) {
            case "begindate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "staffName":
              arrangments.push({ data: data, order: 3 });
              break;
            case "personType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "providerID":
              arrangments.push({ data: data, order: 5 });
              break;
            case "providerOtherAgencyStaffID":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        }
        // else if (this.master === 'providerSponsor') {
        //   switch (data) {
        //     case 'BeginDate':
        //       arrangments.push({ data: data, order: 1 })
        //       break;
        //     case 'EndDate':
        //       arrangments.push({ data: data, order: 2 })
        //       break;
        //     case 'ProviderContactID':
        //       arrangments.push({ data: data, order: 3 })
        //       break;
        //     case 'SFAOfficeType':
        //       arrangments.push({ data: data, order: 4 })
        //       break;
        //     case 'sfaOfficeActivityID':
        //       arrangments.push({ data: data, order: 5 })
        //       break;
        //   }
        // }
        else if (this.master === "staff") {
          switch (data) {
            case "FirstName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "LastName":
              arrangments.push({ data: data, order: 2 });
              break;
            case "Email":
              arrangments.push({ data: data, order: 3 });
              break;
            case "CellPh":
              arrangments.push({ data: data, order: 4 });
              break;
            case "HomePh":
              arrangments.push({ data: data, order: 5 });
              break;
            case "StaffID":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        } else if (this.master === "providerStatus") {
          switch (data) {
            case "statusType":
              arrangments.push({ data: data, order: 1 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "reasonOnHold":
              arrangments.push({ data: data, order: 4 });
              break;
            case "providerStatusType":
              arrangments.push({ data: data, order: 5 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        } else if (this.master === "providerMember") {
          switch (data) {
            case "providerMemberName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "gender":
              arrangments.push({ data: data, order: 2 });
              break;
            case "dob":
              arrangments.push({ data: data, order: 3 });
              break;
            case "ext":
              arrangments.push({ data: data, order: 4 });
              break;
            case "workPh":
              arrangments.push({ data: data, order: 5 });
              break;
            case "homePh":
              arrangments.push({ data: data, order: 6 });
              break;
            case "email":
              arrangments.push({ data: data, order: 7 });
              break;
            case "pager":
              arrangments.push({ data: data, order: 8 });
              break;
            case "tenure":
              arrangments.push({ data: data, order: 9 });
              break;
            case "providerMemberID":
              arrangments.push({ data: data, order: 10 });
              break;
          }
        } else if (this.master === "providerSchool") {
          switch (data) {
            case "beginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "schoolName":
              arrangments.push({ data: data, order: 3 });
              break;
            case "address":
              arrangments.push({ data: data, order: 4 });
              break;
            case "providerSchoolID":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "providerLicense") {
          switch (data) {
            case "licenseType":
              arrangments.push({ data: data, order: 1 });
              break;
            case "licenseStatus":
              arrangments.push({ data: data, order: 2 });
              break;
            case "licenseNo":
              arrangments.push({ data: data, order: 3 });
              break;
            case "licenseCapacity":
              arrangments.push({ data: data, order: 4 });
              break;
            case "youngestLicensed":
              arrangments.push({ data: data, order: 5 });
              break;
            case "oldestLicensed":
              arrangments.push({ data: data, order: 6 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 7 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 8 });
              break;
            case "enteredBy":
              arrangments.push({ data: data, order: 9 });
              break;
            case "enteredDate":
              arrangments.push({ data: data, order: 10 });
              break;
            case "changedBy":
              arrangments.push({ data: data, order: 11 });
              break;
            case "changedDate":
              arrangments.push({ data: data, order: 12 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 13 });
              break;
            case "providerLicenseID":
              arrangments.push({ data: data, order: 14 });
              break;
            case "providerID":
              arrangments.push({ data: data, order: 15 });
              break;
            case "providerLocationID":
              arrangments.push({ data: data, order: 16 });
              break;
          }
        } else if (this.master === "providerLicenseException") {
          switch (data) {
            case "beginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "reason":
              arrangments.push({ data: data, order: 3 });
              break;
            case "childName":
              arrangments.push({ data: data, order: 4 });
              break;
            case "sentToDCF":
              arrangments.push({ data: data, order: 5 });
              break;
            case "homePh":
              arrangments.push({ data: data, order: 6 });
              break;
            case "DCFResponse":
              arrangments.push({ data: data, order: 7 });
              break;
            case "inactiveDate":
              arrangments.push({ data: data, order: 8 });
              break;
            case "statusType":
              arrangments.push({ data: data, order: 9 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 10 });
              break;
            case "approval_YesNoPendingID":
              arrangments.push({ data: data, order: 11 });
              break;
            case "providerLicenseExceptionID":
              arrangments.push({ data: data, order: 12 });
              break;
            case "providerID":
              arrangments.push({ data: data, order: 13 });
              break;
          }
        } else if (this.master === "providerPreference") {
          switch (data) {
            case "youngestAge":
              arrangments.push({ data: data, order: 1 });
              break;
            case "oldestAge":
              arrangments.push({ data: data, order: 2 });
              break;
            case "capacity":
              arrangments.push({ data: data, order: 3 });
              break;
            case "ageIsFlexible":
              arrangments.push({ data: data, order: 4 });
              break;
            case "raceIsFlexible":
              arrangments.push({ data: data, order: 5 });
              break;
            case "genderIsFlexible":
              arrangments.push({ data: data, order: 6 });
              break;
            case "respiteOnly":
              arrangments.push({ data: data, order: 7 });
              break;
            case "onHoldCapacity":
              arrangments.push({ data: data, order: 8 });
              break;
            case "willTakeRespite":
              arrangments.push({ data: data, order: 9 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 10 });
              break;
            case "providerID":
              arrangments.push({ data: data, order: 11 });
              break;
            case "genderGroupID":
              arrangments.push({ data: data, order: 12 });
              break;
            case "providerPreferenceID":
              arrangments.push({ data: data, order: 13 });
              break;
          }
        } else if (this.master === "providerSponsor") {
          switch (data) {
            case "beginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "closureReason":
              arrangments.push({ data: data, order: 3 });
              break;
            case "sponsorName":
              arrangments.push({ data: data, order: 4 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 5 });
              break;
            case "providerSponsorID":
              arrangments.push({ data: data, order: 6 });
              break;
            case "providerID":
              arrangments.push({ data: data, order: 7 });
              break;
          }
        } else if (this.master === "providerTraining") {
          switch (data) {
            // providerMember

            case "providerMember":
              arrangments.push({ data: data, order: 1 });
              break;
            case "trainingType":
              arrangments.push({ data: data, order: 2 });
              break;
            case "licenseNo":
              arrangments.push({ data: data, order: 3 });
              break;
            case "enddate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "units":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "rolesList") {
          switch (data) {
            case "roleType":
              arrangments.push({ data: data, order: 1 });
              break;
            case "description":
              arrangments.push({ data: data, order: 2 });
              break;
            case "createdDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "roleID":
              arrangments.push({ data: data, order: 4 });
              break;
          }
        } else if (this.master === "providerAdoption") {
          switch (data) {
            case "adoptionPacketCompleted":
              arrangments.push({ data: data, order: 1 });
              break;
            case "adoptionPacketSent":
              arrangments.push({ data: data, order: 2 });
              break;
            case "assessmentCompleted":
              arrangments.push({ data: data, order: 3 });
              break;
            case "changedBy":
              arrangments.push({ data: data, order: 4 });
              break;
            case "changedDate":
              arrangments.push({ data: data, order: 5 });
              break;
            case "enteredBy":
              arrangments.push({ data: data, order: 6 });
              break;
            case "enteredDate":
              arrangments.push({ data: data, order: 7 });
              break;
            case "notes":
              arrangments.push({ data: data, order: 8 });
              break;
            case "providerID":
              arrangments.push({ data: data, order: 9 });
              break;
            case "providerAdoptionID":
              arrangments.push({ data: data, order: 10 });
              break;
          }
        } else if (this.isAttachmentList) {
          switch (data) {
            case "FileName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "Description":
              arrangments.push({ data: data, order: 2 });
              break;
            case "UploadDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "UploadBy":
              arrangments.push({ data: data, order: 4 });
              break;
            case "ReUploadDate":
              arrangments.push({ data: data, order: 5 });
              break;
            case "ReUploadBy":
              arrangments.push({ data: data, order: 6 });
              break;
            case "Filesize":
              arrangments.push({ data: data, order: 7 });
              break;
            case "ScannedDocumentID":
              arrangments.push({ data: data, order: 8 });
              break;
          }
        } else if (this.master == "placement") {
          switch (data) {
            case "providerName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "providerType":
              arrangments.push({ data: data, order: 2 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "providerPhone":
              arrangments.push({ data: data, order: 5 });
              break;
            case "serviceAddress":
              arrangments.push({ data: data, order: 6 });
              break;
            case "providerCity":
              arrangments.push({ data: data, order: 7 });
              break;
            case "providerZipcode":
              arrangments.push({ data: data, order: 8 });
              break;
            case "placementID":
              arrangments.push({ data: data, order: 9 });
              break;
          }
        } else if (this.master === "IdentifyResource") {
          switch (data) {
            case "clientName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "EndDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "identifiedResourceType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "Notes":
              arrangments.push({ data: data, order: 5 });
              break;
            case "referralID":
              arrangments.push({ data: data, order: 6 });
              break;
            case "ProviderID":
              arrangments.push({ data: data, order: 7 });
              break;
            case "IdentifiedResourceID":
              arrangments.push({ data: data, order: 8 });
              break;
          }
        } else if (this.master === "BISByProvider") {
          switch (data) {
            case "client":
              arrangments.push({ data: data, order: 1 });
              break;
            case "Selected":
              arrangments.push({ data: data, order: 2 });
              break;
            case "Held":
              arrangments.push({ data: data, order: 3 });
              break;
            case "DCFAuthorized":
              arrangments.push({ data: data, order: 4 });
              break;
            case "DCFNotApproved":
              arrangments.push({ data: data, order: 5 });
              break;
            case "FamilyNotified":
              arrangments.push({ data: data, order: 6 });
              break;
            case "Requested":
              arrangments.push({ data: data, order: 7 });
              break;
            case "DCFAuthRequested":
              arrangments.push({ data: data, order: 8 });
              break;
            case "ICPC":
              arrangments.push({ data: data, order: 9 });
              break;
            case "Appealed":
              arrangments.push({ data: data, order: 10 });
              break;
            case "AppealResults":
              arrangments.push({ data: data, order: 11 });
              break;
            case "EnteredBy":
              arrangments.push({ data: data, order: 12 });
              break;
            case "EnteredDate":
              arrangments.push({ data: data, order: 13 });
              break;
            case "ChangedBy":
              arrangments.push({ data: data, order: 14 });
              break;
            case "ChangedDate":
              arrangments.push({ data: data, order: 15 });
              break;
            case "Notes":
              arrangments.push({ data: data, order: 16 });
              break;
            case "ProviderID":
              arrangments.push({ data: data, order: 17 });
              break;
            case "BestInterestStaffingID":
              arrangments.push({ data: data, order: 18 });
              break;
          }
        } else if (this.master === "ntff") {
          switch (data) {
            case "beginDate":
              arrangments.push({ data: data, order: 1 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "staffName":
              arrangments.push({ data: data, order: 3 });
              break;
            case "statusType":
              arrangments.push({ data: data, order: 4 });
              break;
            case "NonTherapyFaceToFaceID":
              arrangments.push({ data: data, order: 5 });
              break;
            case "caseActivityID":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        }
        //
        else if (this.master === "permanencyForm") {
          switch (data) {
            case "DateOfPermanencyOrRelease":
              arrangments.push({ data: data, order: 1 });
              break;
            case "staffName":
              arrangments.push({ data: data, order: 2 });
              break;
            case "officeName":
              arrangments.push({ data: data, order: 3 });
              break;
          }
        }
        //
        else if (this.master === "livingArrangement") {
          switch (data) {
            case "providerName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "procode":
              arrangments.push({ data: data, order: 2 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "sponsorName":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "placement-referral") {
          switch (data) {
            case "statusType":
              arrangments.push({ data: data, order: 6 });
              break;
            case "fieldStaff":
              arrangments.push({ data: data, order: 1 });
              break;
            case "careCenter":
              arrangments.push({ data: data, order: 2 });
              break;
            case "cm_EnteredDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "cc_EnteredDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "placementReferralID":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "placementEvent") {
          switch (data) {
            case "providerName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "procode":
              arrangments.push({ data: data, order: 4 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "sponsorName":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "client") {
          switch (data) {
            case "FirstName":
              arrangments.push({ data: data, order: 1 });
              break;
            case "LastName":
              arrangments.push({ data: data, order: 2 });
              break;
            case "mi":
              arrangments.push({ data: data, order: 3 });
              break;
            case "DOB":
              arrangments.push({ data: data, order: 4 });
              break;
            case "Age":
              arrangments.push({ data: data, order: 5 });
              break;
            case "Gender":
              arrangments.push({ data: data, order: 6 });
              break;
            case "Kaecses":
              arrangments.push({ data: data, order: 7 });
              break;
            case "PastName":
              arrangments.push({ data: data, order: 8 });
              break;
            // case 'ClientNameLastFirst':
            //   arrangments.push({ data: data, order: 6 });
            //   break;
            // case 'ClientNameFirstLast':
            //   arrangments.push({ data: data, order: 7 });
            //   break;
            // case 'ClientNameLF':
            //   arrangments.push({ data: data, order: 8 });
            //   break;
            // case 'isActive':
            //   arrangments.push({ data: data, order: 9 });
            //   break;
            case "DCFRegion":
              arrangments.push({ data: data, order: 9 });
              break;
            case "caseMgmtOffice":
              arrangments.push({ data: data, order: 10 });
              break;
            case "ClientID":
              arrangments.push({ data: data, order: 11 });
              break;
            case "Active":
              arrangments.push({ data: data, order: 12 });
              break;
          }
        } else if (this.master === "providerFchLevel") {
          switch (data) {
            case "fCHLevelOfCare":
              arrangments.push({ data: data, order: 1 });
              break;
          }
        } else if (this.master === "providerStrength") {
          switch (data) {
            case "strength":
              arrangments.push({ data: data, order: 1 });
              break;
          }
        } else if (this.master === "providerUnacceptableConditions") {
          switch (data) {
            case "condition":
              arrangments.push({ data: data, order: 1 });
              break;
          }
        } else if (this.master === "AuthorizationTempList") {
          switch (data) {
            case "unitsAuth":
              arrangments.push({ data: data, order: 1 });
              break;
            case "payorRate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "paySponsor":
              arrangments.push({ data: data, order: 3 });
              break;
            case "payPlacement":
              arrangments.push({ data: data, order: 4 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 5 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 6 });
              break;
            case "authorizationID":
              arrangments.push({ data: data, order: 7 });
              break;
          }
        } else if (this.master === "placementEventAuthorizationTempList") {
          switch (data) {
            case "unitsAuth":
              arrangments.push({ data: data, order: 1 });
              break;
            case "payorRate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "authorizationID":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "personTypeCardSchool") {
          switch (data) {
            case "name":
              arrangments.push({ data: data, order: 1 });
              break;
            case "usd":
              arrangments.push({ data: data, order: 2 });
              break;
            case "beginDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "endDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "pointOfContact":
              arrangments.push({ data: data, order: 5 });
              break;
            case "address":
              arrangments.push({ data: data, order: 6 });
              break;
            case "city":
              arrangments.push({ data: data, order: 7 });
              break;
            case "state":
              arrangments.push({ data: data, order: 8 });
              break;
            case "countyName":
              arrangments.push({ data: data, order: 9 });
              break;
            case "email":
              arrangments.push({ data: data, order: 10 });
              break;
            case "schoolID":
              arrangments.push({ data: data, order: 11 });
              break;
          }
        } else if (this.master === "prtfHealthExam") {
          switch (data) {
            case "healthExamType":
              arrangments.push({ data: data, order: 1 });
              break;
            case "examDate":
              arrangments.push({ data: data, order: 2 });
              break;
            case "nextExamDue":
              arrangments.push({ data: data, order: 3 });
              break;
          }
        }
        // providerRecruitmentTraining
        else if (this.master === "providerRecruitmentTraining") {
          switch (data) {
            case "recruitmentTrainingType":
              arrangments.push({ data: data, order: 1 });
              break;

            case "trainingStarted":
              arrangments.push({ data: data, order: 2 });
              break;

            case "trainingCompleted":
              arrangments.push({ data: data, order: 3 });
              break;

            case "recruitmentLicensingType":
              arrangments.push({ data: data, order: 4 });
              break;
          }
        } else if (this.master === "providerRecruitmentLicensing") {
          switch (data) {
            case "eventName":
              arrangments.push({ data: data, order: 1 });
              break;

            case "dueDate":
              arrangments.push({ data: data, order: 2 });
              break;

            case "dateCompleted":
              arrangments.push({ data: data, order: 3 });
              break;

            case "assignedTo":
              arrangments.push({ data: data, order: 4 });
              break;

            case "notes":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "recruitment-referral") {
          switch (data) {
            case "documentID":
              arrangments.push({ data: data, order: 1 });
              break;
            case "docStatus":
              arrangments.push({ data: data, order: 2 });
              break;
            case "enteredDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "enteredBy":
              arrangments.push({ data: data, order: 4 });
              break;
          }
        } else if (this.master === "providerPets") {
          switch (data) {
            case "pet":
              arrangments.push({ data: data, order: 1 });
              break;
            case "quantity":
              arrangments.push({ data: data, order: 2 });
              break;
          }
        } else if (this.master === "kansas") {
          switch (data) {
            case "Procode":
              arrangments.push({ data: data, order: 1 });
              break;
            case "SRSProcode":
              arrangments.push({ data: data, order: 2 });
              break;
            case "ProcodeID":
              arrangments.push({ data: data, order: 3 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "CategoryOfService":
              arrangments.push({ data: data, order: 5 });
              break;
            case "BBGLKey":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        } else if (this.master === "oklahoma") {
          switch (data) {
            case "Procode":
              arrangments.push({ data: data, order: 1 });
              break;
            case "ProcodeID":
              arrangments.push({ data: data, order: 2 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "CategoryOfService":
              arrangments.push({ data: data, order: 4 });
              break;
            case "BBGLKey":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "nebraska") {
          switch (data) {
            case "Procode":
              arrangments.push({ data: data, order: 1 });
              break;
            case "ProcodeID":
              arrangments.push({ data: data, order: 2 });
              break;
            case "BeginDate":
              arrangments.push({ data: data, order: 3 });
              break;
            case "CategoryOfService":
              arrangments.push({ data: data, order: 4 });
              break;
            case "BBGLKey":
              arrangments.push({ data: data, order: 5 });
              break;
          }
        } else if (this.master === "evaluationType") {
          switch (data) {
            case "evaluationTypeID":
              arrangments.push({ data: data, order: 1 });
              break;
            case "evaluationType":
              arrangments.push({ data: data, order: 2 });
              break;
            case "isOOH":
              arrangments.push({ data: data, order: 3 });
              break;
            case "isInHome":
              arrangments.push({ data: data, order: 4 });
              break;
            case "isOOH_OK":
              arrangments.push({ data: data, order: 5 });
              break;
            case "isProvider_OK":
              arrangments.push({ data: data, order: 6 });
              break;
            case "isPRTF":
              arrangments.push({ data: data, order: 7 });
              break;
            case "enteredBy":
              arrangments.push({ data: data, order: 8 });
              break;
            case "enteredDate":
              arrangments.push({ data: data, order: 9 });
              break;
            case "changedBy":
              arrangments.push({ data: data, order: 10 });
              break;
            case "changedDate":
              arrangments.push({ data: data, order: 11 });
              break;
          }
        } else if (this.master === "evaluationCreation") {
          switch (data) {
            case "order":
              arrangments.push({ data: data, order: 1 });
              break;
            case "question":
              arrangments.push({ data: data, order: 2 });
              break;
            case "begin Date":
              arrangments.push({ data: data, order: 3 });
              break;
            case "end Date":
              arrangments.push({ data: data, order: 4 });
              break;
            case "clarification":
              arrangments.push({ data: data, order: 5 });
              break;
            case "evaluationQuestionID":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        } else if (this.master === "versionCreation") {
          switch (data) {
            case "evaluationVersionID":
              arrangments.push({ data: data, order: 1 });
              break;
            case "version":
              arrangments.push({ data: data, order: 2 });
              break;
            case "begin Date":
              arrangments.push({ data: data, order: 3 });
              break;
            case "end Date":
              arrangments.push({ data: data, order: 4 });
              break;
            case "min Value":
              arrangments.push({ data: data, order: 5 });
              break;
            case "max Value":
              arrangments.push({ data: data, order: 6 });
              break;
            case "step":
              arrangments.push({ data: data, order: 4 });
              break;
            case "isOOH":
              arrangments.push({ data: data, order: 7 });
              break;
            case "isInHome":
              arrangments.push({ data: data, order: 8 });
              break;
            case "isOOH_OK":
              arrangments.push({ data: data, order: 9 });
              break;
            case "isProvider_OK":
              arrangments.push({ data: data, order: 6 });
              break;
            case "isPRTF":
              arrangments.push({ data: data, order: 10 });
              break;
            case "directions":
              arrangments.push({ data: data, order: 11 });
              break;
            case "enteredBy":
              arrangments.push({ data: data, order: 12 });
              break;
            case "enteredDate":
              arrangments.push({ data: data, order: 13 });
              break;
            case "changedBy":
              arrangments.push({ data: data, order: 14 });
              break;
            case "changedDate":
              arrangments.push({ data: data, order: 15 });
              break;
          }
        } else if (this.master === "evaluationScale") {
          switch (data) {
            case "scale":
              arrangments.push({ data: data, order: 1 });
              break;
            case "scaleID":
              arrangments.push({ data: data, order: 2 });
              break;
            case "enteredBy":
              arrangments.push({ data: data, order: 3 });
              break;
            case "enteredDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "changedBy":
              arrangments.push({ data: data, order: 5 });
              break;
            case "changedDate":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        } else if (this.master === "evaluationQuestion") {
          switch (data) {
            case "questionID":
              arrangments.push({ data: data, order: 1 });
              break;
            case "groupID":
              arrangments.push({ data: data, order: 2 });
              break;
            case "group":
              arrangments.push({ data: data, order: 3 });
              break;
            case "question":
              arrangments.push({ data: data, order: 4 });
              break;
            case "clarification":
              arrangments.push({ data: data, order: 5 });
              break;
            case "enteredBy":
              arrangments.push({ data: data, order: 6 });
              break;
            case "enteredDate":
              arrangments.push({ data: data, order: 7 });
              break;
            case "changedBy":
              arrangments.push({ data: data, order: 8 });
              break;
            case "changedDate":
              arrangments.push({ data: data, order: 9 });
              break;
          }
        } else if (this.master === "questionGroupCreation") {
          switch (data) {
            case "group":
              arrangments.push({ data: data, order: 1 });
              break;
            case "questionGroupID":
              arrangments.push({ data: data, order: 2 });
              break;
            case "enteredBy":
              arrangments.push({ data: data, order: 3 });
              break;
            case "enteredDate":
              arrangments.push({ data: data, order: 4 });
              break;
            case "changedBy":
              arrangments.push({ data: data, order: 5 });
              break;
            case "changedDate":
              arrangments.push({ data: data, order: 6 });
              break;
          }
        } else if (this.master === "evaluationAllowedGroup") {
          switch (data) {
            case "evaluationAllowedGroupID":
              arrangments.push({ data: data, order: 1 });
              break;
            case "evaluationVersionID":
              arrangments.push({ data: data, order: 2 });
              break;
            case "person TypeID":
              arrangments.push({ data: data, order: 3 });
              break;
            case "person Type":
              arrangments.push({ data: data, order: 4 });
              break;
            case "begin Date":
              arrangments.push({ data: data, order: 5 });
              break;
            case "end Date":
              arrangments.push({ data: data, order: 6 });
              break;
            case "enteredBy":
              arrangments.push({ data: data, order: 7 });
              break;
            case "enteredDate":
              arrangments.push({ data: data, order: 8 });
              break;
            case "changedBy":
              arrangments.push({ data: data, order: 9 });
              break;
            case "changedDate":
              arrangments.push({ data: data, order: 10 });
              break;
          }
        }
      });
      this.headers = arrangments.length > 0 ? arrangments : this.headers;
      let test = [];
      console.log("this.headers is>>>", this.headers);
      console.log("this.master is>>>", this.master);

      if (arrangments.length > 0) {
        if (this.master === "siblings") {
          this.headers.push({ data: "Jump to tree" });
        }
        // this.headers.push({ data: "Actions" });
        this.headers.map(function (result) {
          let data = {
            headerName: result.data
              .replace(/\b\w/g, (l) => l.toUpperCase())
              .replace(/([A-Z])/g, " $1")
              .trim(),
            field: result.data,
            order: result.order,
          };
          test.push(data);
        });
      } else {
        // this.headers[0].push("Actions");
        if (this.master === "siblings") {
          this.headers[0].push("Jump to tree");
        }
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
      }
      console.log("test is***********************8", test);
      if (this.master == "moveForm") {
        test[2].headerName = "Move Action";
      }
      test.sort((a, b) => a["order"] - b["order"]);
      test;
      this.rawdata.push(test);
      this.columnDefs = this.rawdata[0];
      this.agGrid.api.startEditingCell({
        rowIndex: 0,
        colKey: "Billable",
      });
      let editingCellDetails = this.agGrid.api.getEditingCells();
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
    }
  }

  generateSearchView(data) {
    if (this.router.url.includes("/reports/all/authorizations")) {
      if (data.authorization) {
        delete data.authorization;
      }
    }
    let rowData = [];
    this.hideLoader = true;
    this.totalCount = data.totalCount;
    this.reportsViewList = data.childList;
    this.numericColumns = data.dataTypes;
    this.rowData = data[this.tableArray]
      ? data[this.tableArray]
      : data[this.customizedArray] ||
        data["searchResult"] ||
        data["dynamicSearch"];
    let vendorNameArr = this.rowData;
    if (vendorNameArr) {
      vendorNameArr.map((data) => {
        if (data.payeeName === null) {
          data.vendorName = data.providerName;
          data.vendorType = "Provider";
        } else if (data.providerName === null) {
          data.vendorName = data.payeeName;
          data.vendorType = "Payee";
        }
        delete data["payeeName"];
      });
    }
    console.log("this.rowData is", this.rowData);

    this.rowData.map((data) => {
      console.log("data in list view is", data);

      data;
      //   data['Actions'] = "Click here";

      if (data.isActive) {
        !isNullOrUndefined(data.DOB)
          ? (data.DOB = moment(data.DOB).format("MM/DD/YYYY"))
          : null;
        data.NotificationDate !== null && data.NotificationDate !== undefined
          ? (data.NotificationDate = moment(data.NotificationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        data.BeginDate !== null && data.BeginDate !== undefined
          ? (data.BeginDate = moment(data.BeginDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EndDate)
          ? (data.EndDate = new Date(data.EndDate).toLocaleDateString())
          : null;
        data.DiscoveryDate !== null && data.DiscoveryDate !== undefined
          ? (data.DiscoveryDate = moment(data.DiscoveryDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        data.IncidentDate !== null && data.IncidentDate !== undefined
          ? (data.IncidentDate = moment(data.IncidentDate).format("MM/DD/YYYY"))
          : null;
        data.FollowUpCompletedDate !== null &&
        data.FollowUpCompletedDate !== undefined
          ? (data.FollowUpCompletedDate = moment(
              data.FollowUpCompletedDate
            ).format("MM/DD/YYYY"))
          : null;
        data.IncidentTime !== null && data.IncidentTime !== undefined
          ? (data.IncidentTime = moment(data.IncidentTime).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.completedDate)
          ? (data.completedDate = moment(data.completedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.dateSentToSRS)
          ? (data.dateSentToSRS = moment(data.dateSentToSRS).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.dueDate)
          ? (data.dueDate = moment(data.dueDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = moment(data.beginDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.endDate) &&
        data.endDate !== 0 &&
        data.endDate !== ""
          ? (data.endDate = moment(data.endDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.evaluationDate)
          ? (data.evaluationDate = moment(data.evaluationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.dob)
          ? (data.dob = moment(data.dob).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.jeDate)
          ? (data.jeDate = moment(data.jeDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.JEReceivedDate)
          ? (data.JEReceivedDate = moment(data.JEReceivedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.orderDate)
          ? (data.orderDate = moment(data.orderDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.receivedDate)
          ? (data.receivedDate = moment(data.receivedDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.determinationDate)
          ? (data.determinationDate = moment(data.determinationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.determinationReceivedByCC)
          ? (data.determinationReceivedByCC = moment(
              data.determinationReceivedByCC
            ).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.requestReceivedByCC)
          ? (data.requestReceivedByCC = moment(data.requestReceivedByCC).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.requestSent)
          ? (data.requestSent = moment(data.requestSent).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.servicesBeginDate)
          ? (data.servicesBeginDate = moment(data.servicesBeginDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.servicesEndDate)
          ? (data.servicesEndDate = moment(data.servicesEndDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.when)
          ? (data.when = moment(data.when).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnrolledEndDate)
          ? (data.EnrolledEndDate = moment(data.EnrolledEndDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.EnrolledBeginDate)
          ? (data.EnrolledBeginDate = moment(data.EnrolledBeginDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.examDate)
          ? (data.examDate = moment(data.examDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.nextExamDue)
          ? (data.nextExamDue = moment(data.nextExamDue).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dateApplicationSubmitted)
          ? (data.dateApplicationSubmitted = moment(
              data.dateApplicationSubmitted
            ).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.KBHDate)
          ? (data.KBHDate = moment(data.KBHDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.nextKBHDue)
          ? (data.nextKBHDue = moment(data.nextKBHDue).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.CompletedDate)
          ? (data.CompletedDate = moment(data.CompletedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.LastOccurrence)
          ? (data.LastOccurrence = moment(data.LastOccurrence).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.completed)
          ? (data.completed = moment(data.completed).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.requested)
          ? (data.requested = moment(data.requested).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.legallyAvailable)
          ? (data.legallyAvailable = moment(data.legallyAvailable).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.APADate)
          ? (data.APADate = moment(data.APADate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ConsentSignedDate)
          ? (data.ConsentSignedDate = moment(data.ConsentSignedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.ConsentSentDate)
          ? (data.ConsentSentDate = moment(data.ConsentSentDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.requestedDate)
          ? (data.requestedDate = moment(data.requestedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.StatusDate)
          ? (data.StatusDate = moment(data.StatusDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateOfPermanencyOrRelease)
          ? (data.DateOfPermanencyOrRelease = moment(
              data.DateOfPermanencyOrRelease
            ).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.nextDueDate)
          ? (data.nextDueDate = moment(data.nextDueDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.closureDate)
          ? (data.closureDate = moment(data.closureDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.enteredDate)
          ? (data.enteredDate = moment(data.enteredDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Enddate)
          ? (data.Enddate = moment(data.Enddate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.date)
          ? (data.date = moment(data.date).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnteredDate)
          ? (data.EnteredDate = moment(data.EnteredDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.LastModifiedDate)
          ? (data.LastModifiedDate = moment(data.LastModifiedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.NotificationDate)
          ? (data.NotificationDate = moment(data.NotificationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.UpdatedDate)
          ? (data.UpdatedDate = moment(data.UpdatedDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ChangedDate)
          ? (data.ChangedDate = moment(data.ChangedDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.eventDate)
          ? (data.eventDate = moment(data.eventDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.BilledDate)
          ? (data.BilledDate = moment(data.BilledDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.findingDate)
          ? (data.findingDate = moment(data.findingDate).format("MM/DD/YYYY"))
          : null;

        !isNullOrUndefined(data.ProjectedDate)
          ? (data.ProjectedDate = moment(data.ProjectedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.When)
          ? (data.When = moment(data.When).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DueDate)
          ? (data.DueDate = moment(data.DueDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Completed)
          ? (data.Completed = moment(data.Completed).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DeterminationDate)
          ? (data.DeterminationDate = moment(data.DeterminationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.RequestSent)
          ? (data.RequestSent = moment(data.RequestSent).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Legacy_DtResent)
          ? (data.Legacy_DtResent = moment(data.Legacy_DtResent).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.Legacy_DtSentOrig)
          ? (data.Legacy_DtSentOrig = moment(data.Legacy_DtSentOrig).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.JEDate)
          ? (data.JEDate = moment(data.JEDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.OrderDate)
          ? (data.OrderDate = moment(data.OrderDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnteredDate)
          ? (data.EnteredDate = moment(data.EnteredDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ExamDate)
          ? (data.ExamDate = moment(data.ExamDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextExamDue)
          ? (data.NextExamDue = moment(data.NextExamDue).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.RevisitEndDate)
          ? (data.RevisitEndDate = moment(data.RevisitEndDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.MonthReported)
          ? (data.MonthReported = moment(data.MonthReported).format(
              "MMMM, YYYY"
            ))
          : null;
        !isNullOrUndefined(data.DateSent)
          ? (data.DateSent = moment(data.DateSent).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextAppointmentDate)
          ? (data.NextAppointmentDate = moment(data.NextAppointmentDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.cc_ChangedDate)
          ? (data.cc_ChangedDate = moment(data.cc_ChangedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.cc_EnteredDate)
          ? (data.cc_EnteredDate = moment(data.cc_EnteredDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.cm_ChangedDate)
          ? (data.cm_ChangedDate = moment(data.cm_ChangedDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.DateOfLastIEP)
          ? (data.DateOfLastIEP = moment(data.DateOfLastIEP).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.Director_DateAuthorized)
          ? (data.Director_DateAuthorized = moment(
              data.Director_DateAuthorized
            ).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.PlacementNeeded)
          ? (data.PlacementNeeded = moment(data.PlacementNeeded).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.Date)
          ? (data.Date = moment(data.Date).format("MM/DD/YYYY"))
          : null;

        !isNullOrUndefined(data.EvaluationDate)
          ? (data.EvaluationDate = moment(data.EvaluationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.EventDate)
          ? (data.EventDate = moment(data.EventDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateSentToDCF)
          ? (data.DateSentToDCF = moment(data.DateSentToDCF).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.NextDueDate)
          ? (data.NextDueDate = moment(data.NextDueDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.cm_EnteredDate)
          ? (data.cm_EnteredDate = moment(data.cm_EnteredDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.EstimatedGraduationDate)
          ? (data.cm_EnteredDate = moment(data.EstimatedGraduationDate).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.reportDate)
          ? (data.reportDate = moment(data.reportDate).format("MM/DD/YYYY"))
          : null;
        // !isNullOrUndefined(data.monthReported)
        //   ? (data.monthReported = moment(data.monthReported).format(
        //     "MMMM, YYYY"
        //   ))
        //   : null;
        !isNullOrUndefined(data.CreatedDate)
          ? (data.CreatedDate = moment(data.CreatedDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.UpdatedDate)
          ? (data.UpdatedDate = moment(data.UpdatedDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.UploadDate)
          ? (data.UploadDate = moment(data.UploadDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.changedDate)
          ? (data.changedDate = moment(data.changedDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DCFResponse)
          ? (data.DCFResponse = moment(data.DCFResponse).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.inactiveDate)
          ? (data.inactiveDate = moment(data.inactiveDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.sentToDCF)
          ? (data.sentToDCF = moment(data.sentToDCF).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dateSent)
          ? (data.dateSent = moment(data.dateSent).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.createdDate)
          ? (data.createdDate = moment(data.createdDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.adoptionPacketCompleted)
          ? (data.adoptionPacketCompleted = moment(
              data.adoptionPacketCompleted
            ).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.adoptionPacketSent)
          ? (data.adoptionPacketSent = moment(data.adoptionPacketSent).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.assessmentCompleted)
          ? (data.assessmentCompleted = moment(data.assessmentCompleted).format(
              "MM/DD/YYYY"
            ))
          : null;
        !isNullOrUndefined(data.DateSentDCF)
          ? (data.DateSentDCF = moment(data.DateSentDCF).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateReceivedDCFApproval)
          ? (data.DateReceivedDCFApproval = moment(
              data.DateReceivedDCFApproval
            ).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateDueToDCF)
          ? (data.DateDueToDCF = moment(data.DateDueToDCF).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextDueDate)
          ? (data.NextDueDate = moment(data.NextDueDate).format("MM/DD/YYYY"))
          : null;
      } else {
        !isNullOrUndefined(data.DOB)
          ? (data.DOB = moment.utc(data.DOB).format("MM/DD/YYYY"))
          : null;
        data.NotificationDate !== null && data.NotificationDate !== undefined
          ? (data.NotificationDate = moment
              .utc(data.NotificationDate)
              .format("MM/DD/YYYY"))
          : null;
        data.BeginDate !== null && data.BeginDate !== undefined
          ? (data.BeginDate = moment(data.BeginDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EndDate)
          ? (data.EndDate = new Date(data.EndDate).toLocaleDateString())
          : null;
        data.DiscoveryDate !== null && data.DiscoveryDate !== undefined
          ? (data.DiscoveryDate = moment
              .utc(data.DiscoveryDate)
              .format("MM/DD/YYYY"))
          : null;
        data.IncidentDate !== null && data.IncidentDate !== undefined
          ? (data.IncidentDate = moment
              .utc(data.IncidentDate)
              .format("MM/DD/YYYY"))
          : null;
        data.FollowUpCompletedDate !== null &&
        data.FollowUpCompletedDate !== undefined
          ? (data.FollowUpCompletedDate = moment
              .utc(data.FollowUpCompletedDate)
              .format("MM/DD/YYYY"))
          : null;
        data.IncidentTime !== null && data.IncidentTime !== undefined
          ? (data.IncidentTime = moment
              .utc(data.IncidentTime)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.completedDate)
          ? (data.completedDate = moment
              .utc(data.completedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dateSentToSRS)
          ? (data.dateSentToSRS = moment
              .utc(data.dateSentToSRS)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dueDate)
          ? (data.dueDate = moment.utc(data.dueDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.beginDate)
          ? (data.beginDate = moment.utc(data.beginDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.endDate) &&
        data.endDate !== 0 &&
        data.endDate !== ""
          ? (data.endDate = moment.utc(data.endDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.evaluationDate)
          ? (data.evaluationDate = moment
              .utc(data.evaluationDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dob)
          ? (data.dob = moment.utc(data.dob).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.jeDate)
          ? (data.jeDate = moment.utc(data.jeDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.JEReceivedDate)
          ? (data.JEReceivedDate = moment
              .utc(data.JEReceivedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.orderDate)
          ? (data.orderDate = moment.utc(data.orderDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.receivedDate)
          ? (data.receivedDate = moment
              .utc(data.receivedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.determinationDate)
          ? (data.determinationDate = moment
              .utc(data.determinationDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.determinationReceivedByCC)
          ? (data.determinationReceivedByCC = moment
              .utc(data.determinationReceivedByCC)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.requestReceivedByCC)
          ? (data.requestReceivedByCC = moment
              .utc(data.requestReceivedByCC)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.requestSent)
          ? (data.requestSent = moment
              .utc(data.requestSent)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.servicesBeginDate)
          ? (data.servicesBeginDate = moment
              .utc(data.servicesBeginDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.servicesEndDate)
          ? (data.servicesEndDate = moment
              .utc(data.servicesEndDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.when)
          ? (data.when = moment.utc(data.when).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnrolledEndDate)
          ? (data.EnrolledEndDate = moment
              .utc(data.EnrolledEndDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnrolledBeginDate)
          ? (data.EnrolledBeginDate = moment
              .utc(data.EnrolledBeginDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.examDate)
          ? (data.examDate = moment.utc(data.examDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.nextExamDue)
          ? (data.nextExamDue = moment
              .utc(data.nextExamDue)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dateApplicationSubmitted)
          ? (data.dateApplicationSubmitted = moment
              .utc(data.dateApplicationSubmitted)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.KBHDate)
          ? (data.KBHDate = moment.utc(data.KBHDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.nextKBHDue)
          ? (data.nextKBHDue = moment.utc(data.nextKBHDue).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.CompletedDate)
          ? (data.CompletedDate = moment
              .utc(data.CompletedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.LastOccurrence)
          ? (data.LastOccurrence = moment
              .utc(data.LastOccurrence)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.completed)
          ? (data.completed = moment.utc(data.completed).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.requested)
          ? (data.requested = moment.utc(data.requested).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.legallyAvailable)
          ? (data.legallyAvailable = moment
              .utc(data.legallyAvailable)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.APADate)
          ? (data.APADate = moment.utc(data.APADate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ConsentSignedDate)
          ? (data.ConsentSignedDate = moment
              .utc(data.ConsentSignedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ConsentSentDate)
          ? (data.ConsentSentDate = moment
              .utc(data.ConsentSentDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.requestedDate)
          ? (data.requestedDate = moment
              .utc(data.requestedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.StatusDate)
          ? (data.StatusDate = moment.utc(data.StatusDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateOfPermanencyOrRelease)
          ? (data.DateOfPermanencyOrRelease = moment
              .utc(data.DateOfPermanencyOrRelease)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.nextDueDate)
          ? (data.nextDueDate = moment
              .utc(data.nextDueDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.closureDate)
          ? (data.closureDate = moment(data.closureDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.enteredDate)
          ? (data.enteredDate = moment
              .utc(data.enteredDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Enddate)
          ? (data.Enddate = moment.utc(data.Enddate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.date)
          ? (data.date = moment.utc(data.date).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnteredDate)
          ? (data.EnteredDate = moment
              .utc(data.EnteredDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.LastModifiedDate)
          ? (data.LastModifiedDate = moment
              .utc(data.LastModifiedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NotificationDate)
          ? (data.NotificationDate = moment
              .utc(data.NotificationDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.UpdatedDate)
          ? (data.UpdatedDate = moment
              .utc(data.UpdatedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ChangedDate)
          ? (data.ChangedDate = moment
              .utc(data.ChangedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.eventDate)
          ? (data.eventDate = moment.utc(data.eventDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.BilledDate)
          ? (data.BilledDate = moment.utc(data.BilledDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.findingDate)
          ? (data.findingDate = moment
              .utc(data.findingDate)
              .format("MM/DD/YYYY"))
          : null;

        !isNullOrUndefined(data.ProjectedDate)
          ? (data.ProjectedDate = moment
              .utc(data.ProjectedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.When)
          ? (data.When = moment.utc(data.When).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DueDate)
          ? (data.DueDate = moment.utc(data.DueDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Completed)
          ? (data.Completed = moment.utc(data.Completed).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DeterminationDate)
          ? (data.DeterminationDate = moment
              .utc(data.DeterminationDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.RequestSent)
          ? (data.RequestSent = moment
              .utc(data.RequestSent)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Legacy_DtResent)
          ? (data.Legacy_DtResent = moment
              .utc(data.Legacy_DtResent)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Legacy_DtSentOrig)
          ? (data.Legacy_DtSentOrig = moment
              .utc(data.Legacy_DtSentOrig)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.JEDate)
          ? (data.JEDate = moment.utc(data.JEDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.OrderDate)
          ? (data.OrderDate = moment.utc(data.OrderDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EnteredDate)
          ? (data.EnteredDate = moment
              .utc(data.EnteredDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.ExamDate)
          ? (data.ExamDate = moment.utc(data.ExamDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextExamDue)
          ? (data.NextExamDue = moment
              .utc(data.NextExamDue)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.RevisitEndDate)
          ? (data.RevisitEndDate = moment
              .utc(data.RevisitEndDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.MonthReported)
          ? (data.MonthReported = moment
              .utc(data.MonthReported)
              .format("MMMM, YYYY"))
          : null;
        !isNullOrUndefined(data.DateSent)
          ? (data.DateSent = moment.utc(data.DateSent).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextAppointmentDate)
          ? (data.NextAppointmentDate = moment
              .utc(data.NextAppointmentDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.cc_ChangedDate)
          ? (data.cc_ChangedDate = moment
              .utc(data.cc_ChangedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.cc_EnteredDate)
          ? (data.cc_EnteredDate = moment
              .utc(data.cc_EnteredDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.cm_ChangedDate)
          ? (data.cm_ChangedDate = moment
              .utc(data.cm_ChangedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateOfLastIEP)
          ? (data.DateOfLastIEP = moment
              .utc(data.DateOfLastIEP)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Director_DateAuthorized)
          ? (data.Director_DateAuthorized = moment
              .utc(data.Director_DateAuthorized)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.PlacementNeeded)
          ? (data.PlacementNeeded = moment
              .utc(data.PlacementNeeded)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.Date)
          ? (data.Date = moment.utc(data.Date).format("MM/DD/YYYY"))
          : null;

        !isNullOrUndefined(data.EvaluationDate)
          ? (data.EvaluationDate = moment
              .utc(data.EvaluationDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EventDate)
          ? (data.EventDate = moment.utc(data.EventDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateSentToDCF)
          ? (data.DateSentToDCF = moment
              .utc(data.DateSentToDCF)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextDueDate)
          ? (data.NextDueDate = moment
              .utc(data.NextDueDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.cm_EnteredDate)
          ? (data.cm_EnteredDate = moment
              .utc(data.cm_EnteredDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.EstimatedGraduationDate)
          ? (data.cm_EnteredDate = moment
              .utc(data.EstimatedGraduationDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.reportDate)
          ? (data.reportDate = moment.utc(data.reportDate).format("MM/DD/YYYY"))
          : null;
        // !isNullOrUndefined(data.monthReported)
        //   ? (data.monthReported = moment
        //     .utc(data.monthReported)
        //     .format("MMMM, YYYY"))
        //   : null;
        !isNullOrUndefined(data.CreatedDate)
          ? (data.CreatedDate = moment
              .utc(data.CreatedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.UpdatedDate)
          ? (data.UpdatedDate = moment
              .utc(data.UpdatedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.UploadDate)
          ? (data.UploadDate = moment.utc(data.UploadDate).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.changedDate)
          ? (data.changedDate = moment
              .utc(data.changedDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DCFResponse)
          ? (data.DCFResponse = moment
              .utc(data.DCFResponse)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.inactiveDate)
          ? (data.inactiveDate = moment
              .utc(data.inactiveDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.sentToDCF)
          ? (data.sentToDCF = moment.utc(data.sentToDCF).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.dateSent)
          ? (data.dateSent = moment.utc(data.dateSent).format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.createdDate)
          ? (data.createdDate = moment
              .utc(data.createdDate)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.adoptionPacketCompleted)
          ? (data.adoptionPacketCompleted = moment
              .utc(data.adoptionPacketCompleted)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.adoptionPacketSent)
          ? (data.adoptionPacketSent = moment
              .utc(data.adoptionPacketSent)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.assessmentCompleted)
          ? (data.assessmentCompleted = moment
              .utc(data.assessmentCompleted)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateSentDCF)
          ? (data.DateSentDCF = moment
              .utc(data.DateSentDCF)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateReceivedDCFApproval)
          ? (data.DateReceivedDCFApproval = moment
              .utc(data.DateReceivedDCFApproval)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.DateDueToDCF)
          ? (data.DateDueToDCF = moment
              .utc(data.DateDueToDCF)
              .format("MM/DD/YYYY"))
          : null;
        !isNullOrUndefined(data.NextDueDate)
          ? (data.NextDueDate = moment
              .utc(data.NextDueDate)
              .format("MM/DD/YYYY"))
          : null;
      }
      rowData.push(data);
    });

    if (this.rowData.length > 0) {
      this.headers.push(Object.keys(this.rowData[0]));
      this.headers[0].map((data) => {
        if (this.sortcolumnDropdownList.length === 0) {
          this.sortcolumnDropdownList.push({ label: data, value: data });
          this.columnDropdownList.push({ label: data, value: data });
        }
      });
      let test = [];
      this.headers[0].forEach(function (result) {
        let data = {
          headerName: result
            .replace(/\b\w/g, (l) => l.toUpperCase())
            .replace(/([A-Z])/g, " $1")
            .trim(),
          field: result,
        };
        test.push(data);
      });
      this.rawdata.push(test);
      this.columnDefs = this.rawdata[0];
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
    }
  }

  getPerson(initial: any, end: any) {
    console.log("this.master is", this.master);
    let reqOfOpencards: any;
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.headers = [];
    this.rawdata = [];
    this.hideLoader = false;
    this.personData["filter"] = this.filter;
    this.personData["group by"] = "All";
    this.personData["beginPagination"] = initial;
    this.personData["endPagination"] = end;
    this.personData["sort"]
      ? this.personData["sort"]
      : (this.personData["sort"] = {
          column: this.columnToSorted,
          mode: this.sortOrder,
        });
    if (this.searchType.searchType) {
      this.personData["searchType"] = this.searchType.searchType;
    }
    if (this.searchInput) {
      this.personData["strValue"] = this.searchInput;
    }

    reqOfOpencards = {
      openCard: this.requestObject,
      beginPagination: initial,
      endPagination: end,
      sort: {
        column: this.columnToSorted,
        mode: "desc",
      },
    };
    let providerID =
      parseInt(localStorage.getItem("providerID")) -
      this._opencards.getHasKey();
    switch (this.master) {
      case "client":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.clildFormService.getPerson(this.personData).then((data) => {
          // this.clientInfo = data;
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "opencards":
        this._opencards.listViewOfOpencards(reqOfOpencards).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "opencardByClientMedication":
        this.isSearchAny = true;
        this._opencards
          .listViewOfOpencardsByClient(reqOfOpencards, this.selectedClientId)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "opencardByClientProfile":
        this.isSearchAny = true;
        this._opencards
          .listViewOfOpencardsByClient(reqOfOpencards, this.selectedClientId)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "opencardByClient":
        this.isSearchAny = true;
        this._opencards
          .listViewOfOpencardsByClient(reqOfOpencards, this.selectedClientId)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "cases":
        this.isListAddAction = true;
        this.isListAdd = false;
        this.isAddBtnDisable = false;
        let routerClientID;
        routerClientID =
          this._activateRoute.snapshot.queryParamMap.get("clientId");

        // this.isSearchAny = true;
        reqOfOpencards["userId"] =
          parseInt(localStorage.getItem("UserId")) || 4620;
        this._opencards
          .listViewOfOpencardsByClient(reqOfOpencards, routerClientID)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "TPL":
        this.isSearchAny = true;
        this.requestObject = {
          clientID: this.selectedClientId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.getClientTLPById(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "assessments":
        this.isSearchAny = true;
        let referrald: any, clientId;
        referrald = this.REF_ID;
        clientId = this.CLIENT_ID;
        this.requestObject = {
          referralID: referrald,
          clientID: clientId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getAssessementsByClient(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "caseactivity":
        this.isSearchAny = true;
        let casereferrald: any, caseclientId;
        casereferrald = this.REF_ID;
        caseclientId = this.CLIENT_ID;
        this.requestObject = {
          referralID: casereferrald,
          clientID: caseclientId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: "beginDate", mode: "desc" },
        };
        this._opencards.getCaseActivityList(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "lackOfContact":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let locReferrald =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: locReferrald,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getlackOfContactList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      // , sort: { column: this.columnToSorted, mode: "desc" }
      /////////////////////////////
      case "caseActivityAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          caseActivityID: parseInt(localStorage.getItem("CisCaseActivityId")),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            // this.isAttachmentList = true;
            // this.attachmentNode=this.master;
            this.generateListView(data);
          });
        break;

      // case 'casePlanGoalsAttachment':
      //   this.requestObject = {
      //     caseActivityID: parseInt(localStorage.getItem("CisCaseActivityId")),
      //     beginPagination: initial,
      //     endPagination: end,
      //     sort: { column: this.columnToSorted, mode: "desc" }
      //   };
      //   this._opencards
      //     .getCaseActivityAttachmentList(this.requestObject)
      //     .then(data => {
      //       loader.style.display = "none";
      //       this.isAttachmentList = true;
      //       this.generateListView(data);
      //     });
      //   break;

      case "casePlanGoalsAttachment":
        this.isAttachmentList = true;
        this.showQuickMenu = true;
        this.isSearchAny = true;
        this.requestObject = {
          casePlanID:
            parseInt(localStorage.getItem("casePlanID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "assessmentAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          assessmentID:
            parseInt(localStorage.getItem("assessmentID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "familySafetyAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          familySafetyID:
            parseInt(localStorage.getItem("familySafteyId")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "referralAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          referralID:
            parseInt(localStorage.getItem("referralId")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "independentLivingAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          independentLivingID:
            parseInt(localStorage.getItem("independentLivingID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      ////////////Front End Doubts to be cleared regarding claim id fetch logic
      case "authAttachment":
        this.isSearchAny = true;
        this.requestObject = {
          authorizationID: localStorage.getItem("authId"),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "claimsDAAttachment":
        this.isSearchAny = true;
        this.requestObject = {
          claimID: localStorage.getItem("claimId"),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "referralEventsAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          referralEventID:
            parseInt(localStorage.getItem("referralEventID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "adoptionAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          adoptionID:
            parseInt(localStorage.getItem("adoptionId")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      ////BackEnd Dependency (Could not create a record to test)
      // case 'placementAttachment':
      //   this.isSearchAny = true;
      //   this.requestObject = { placementID: this._client.getId(), beginPagination: initial, endPagination: end, sort: { column: this.columnToSorted, mode: "desc" } }
      //   this._opencards.getCaseActivityAttachmentList(this.requestObject).then((data) => {
      //     loader.style.display = 'none';
      //     this.generateListView(data);
      //   })
      //   break;

      case "permanencyAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          permanencyEventID:
            parseInt(localStorage.getItem("permanencyEventID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "courtOrderAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          courtOrderedID:
            parseInt(localStorage.getItem("courtOrderedID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "bisAttachment":
        console.log("BisAttachment passed");
        this.isSearchAny = true;
        this.isAttachmentList = true;
        this.requestObject = {
          bestInterestStaffingID:
            parseInt(localStorage.getItem("bestInterestingStaffId")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            console.log(
              "data in getCaseActivityAttachmentList in BIS *** is",
              data
            );
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "monthlyReportsAttachment":
        // this.isSearchAny = true;
        // loader.style.display = "none";

        //
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          // monthlyReportId:
          monthlyReportID:
            parseInt(localStorage.getItem("monthlyReportsId")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        //
        break;

      case "medicationsAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          clientMedicationID:
            parseInt(localStorage.getItem("clientMedicationID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });

        break;

      case "clientProfilesAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          clientProfileID:
            parseInt(localStorage.getItem("clientProfileID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "courtCaseAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          courtCaseID:
            parseInt(localStorage.getItem("courtCaseID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "clientStrengthAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        loader.style.display = "none";
        break;

      case "thirdPartyLiabilityAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          clientTPLID:
            parseInt(localStorage.getItem("tplId")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "preventiveMeasurementsAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          clientPreventativeMeasureID:
            parseInt(localStorage.getItem("clientPreventativeMeasureID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "unusualIncidentAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          unusualIncidentID:
            parseInt(localStorage.getItem("unusualIncidentID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "documentAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          clientID:
            parseInt(localStorage.getItem("clientId")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "caseTeamAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          caseTeamID:
            parseInt(localStorage.getItem("caseTeamID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "extendedFamilyAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          familyMemberReferralID:
            parseInt(localStorage.getItem("familyMemberReferralID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "homeCountyAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          homeCountyID:
            parseInt(localStorage.getItem("homeCountyID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "sfmAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          SFAOfficeActivityID:
            parseInt(localStorage.getItem("SFAOfficeActivityID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "nonTherapyAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          nonTherapyFaceToFaceID:
            parseInt(localStorage.getItem("nonTherapyFaceToFaceID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "phaseAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          phaseID:
            parseInt(localStorage.getItem("phaseId")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "progressNotesAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          progressNoteID:
            parseInt(localStorage.getItem("progressNoteID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "caseEvaluationAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          evaluationID:
            parseInt(localStorage.getItem("evaluationID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "progressNotesDiagnosisAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          progressNoteDiagnosisID:
            parseInt(localStorage.getItem("progressNoteDiagnosisID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "rfcReferralAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          referralID:
            parseInt(localStorage.getItem("referralId")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "siblingsInOutHome":
        this.isSearchAny = true;
        this.requestObject = {
          sibilingsInoutHomeID:
            parseInt(localStorage.getItem("sibilingsInoutHomeID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "bhDeterminationAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          BHDeterminationID:
            parseInt(localStorage.getItem("BHDeterminationID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "healthRecordAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          healthExamID:
            parseInt(localStorage.getItem("healthExamID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "immunizationAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          immunizationID:
            parseInt(localStorage.getItem("immunizationID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      /////
      case "staff-caseList":
        this.isAttachmentList = false;
        this.isSearchAny = false;
        this.isListAddAction = false;
        console.log("CasesList>>>>>", this.master);
        this.requestObject = {
          staffID: parseInt(localStorage.getItem("staff_ID")),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.getCaseByPerson(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      //////
      case "staff-provider":
        this.isAttachmentList = false;
        this.isSearchAny = false;
        this.isListAddAction = false;
        console.log("CasesList>>>>>", this.master);
        this.requestObject = {
          staffID: parseInt(localStorage.getItem("staff_ID")),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.getProviderByPerson(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      //////
      case "kanbeHealthyAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          kanBeHealthyID:
            parseInt(localStorage.getItem("kanBeHealthyID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "kippPmtoAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          kippID:
            parseInt(localStorage.getItem("kippID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "supervisorStaffingAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          supervisoryStaffingID:
            parseInt(localStorage.getItem("supervisoryStaffingID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "appointmentAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          appointmentID:
            parseInt(localStorage.getItem("appointmentID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "caseFileActivityAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          caseFileActivityID:
            parseInt(localStorage.getItem("caseFileActivityID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "kippAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          kippID:
            parseInt(localStorage.getItem("kippID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "waiverAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          waiverActivityID:
            parseInt(localStorage.getItem("waiverActivityID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "socialSecurityIncomeAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          clientSSIID:
            parseInt(localStorage.getItem("clientSSIID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "behavioralAssessmentAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          assessmentID:
            parseInt(localStorage.getItem("assessmentID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "authorizationSummaryAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          authorizationID: parseInt(localStorage.getItem("authId")),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "creditTrackingAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          creditTrackingID:
            parseInt(localStorage.getItem("creditTrackingID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "educationEnrollmentAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          schoolID:
            parseInt(localStorage.getItem("schoolID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "generalEducationAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          generalEducationID:
            parseInt(localStorage.getItem("generalEducationID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "specialEducationAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          specialEducationID:
            parseInt(localStorage.getItem("specialEducationID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "attendingSchoolAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          clientSchoolID:
            parseInt(localStorage.getItem("clientSchoolID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "gradeLevelAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          clientGradeID:
            parseInt(localStorage.getItem("clientGradeID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "schoolReleaseAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          schoolReleaseID:
            parseInt(localStorage.getItem("schoolReleaseID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "homeSchoolAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          homeSchoolID:
            parseInt(localStorage.getItem("homeSchoolID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "fisMembersAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          clientReferralID:
            parseInt(localStorage.getItem("clientReferralID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "locationAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          providerLocationID:
            parseInt(localStorage.getItem("providerLocationID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "petsAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          providerPetID:
            parseInt(localStorage.getItem("providerPetID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "licenseAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          providerLicenseID:
            parseInt(localStorage.getItem("providerLicenseID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "licenseExceptionAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          providerLicenseExceptionID:
            parseInt(localStorage.getItem("providerLicenseExceptionID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "sponsorAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          providerSponsorID:
            parseInt(localStorage.getItem("providerSponsorID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "statusAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          providerStatusID:
            parseInt(localStorage.getItem("providerStatusID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "sfmOfficeAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          SFAOfficeActivityID:
            parseInt(localStorage.getItem("SFAOfficeActivityID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "sfmStaffAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          providerSFAStaffID:
            parseInt(localStorage.getItem("providerSFAStaffID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "preferenceAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          providerPreferenceID:
            parseInt(localStorage.getItem("providerPreferenceID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "otherAgencyStaffAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          otherAgencyStaffID:
            parseInt(localStorage.getItem("otherAgencyStaffID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "schoolAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          providerSchoolID:
            parseInt(localStorage.getItem("providerSchoolID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "claimsAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          claimID: parseInt(localStorage.getItem("claimId")),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      ////////////////////

      case "FIS":
        this.isSearchAny = true;
        let fisRferrald: any, fisclientId;
        fisRferrald =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        fisclientId =
          parseInt(localStorage.getItem("clientId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: fisRferrald,
          clientID: fisclientId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.getFISMemberList(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "HoH":
        this.isSearchAny = true;
        let hohRferrald: any;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        hohRferrald =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: hohRferrald,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.getListOfHoH(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "homeCounty":
        this.isSearchAny = true;
        let homeCountyRferrald: any;
        homeCountyRferrald = this.REF_ID;
        this.requestObject = {
          referralID: homeCountyRferrald,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.getHomeCountyList(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "casePlanGoals":
        this.isSearchAny = true;
        let casePlanRferrald: any;
        casePlanRferrald =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: casePlanRferrald,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCasePlanGoalsList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "sfcsOffice":
        this.isSearchAny = true;
        let sfcsOfficeRferrald: any;
        sfcsOfficeRferrald = this.REF_ID;
        this.requestObject = {
          referralID: sfcsOfficeRferrald,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.getSFCSOfficeList(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "extendedFamily":
        this.isSearchAny = true;
        let exFamilyPlanRferrald: any;
        exFamilyPlanRferrald =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: exFamilyPlanRferrald,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getExtendedFamilyList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "participantsTherpy":
        this.isSearchAny = true;
        // let exFamilyPlanRferrald: any;
        // exFamilyPlanRferrald =
        //   parseInt(localStorage.getItem("referralId")) -
        //   this._opencards.getHasKey();
        this.requestObject = {
          referralID:
            parseInt(localStorage.getItem("referralId")) -
            this._opencards.getHasKey(),
          // beginPagination: initial,
          // endPagination: end,
          // sort: { column: this.columnToSorted, mode: "desc" }
        };
        this._opencards.getPartcipantsList(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "caseTeam":
        this.isSearchAny = true;
        let caseTeamRferrald: any;
        caseTeamRferrald = this.REF_ID;
        this.requestObject = {
          referralID: caseTeamRferrald,
          beginPagination: initial,
          endPagination: end,
        };
        if (this.sortColumn) {
          this.requestObject = {
            referralID: caseTeamRferrald,
            beginPagination: initial,
            endPagination: end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
        }
        this._opencards.listCaseTeam(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "intensivePhase":
        this.isSearchAny = true;
        let referraIRferrald: any;
        referraIRferrald =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: referraIRferrald,
          phaseType: "Intensive",
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.getAllPhaseList(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "phase":
        this.isSearchAny = true;
        let referraNIRferrald: any;
        referraNIRferrald =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: referraNIRferrald,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.getAllPhaseList(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "referralEvents":
        this.isSearchAny = true;
        let referralEventsRferrald: any;
        referralEventsRferrald =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: referralEventsRferrald,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .listALLReferralEvents(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "caseEval":
        this.isSearchAny = true;
        let caseEvalRferrald: any;
        caseEvalRferrald =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: caseEvalRferrald,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getcaseEvolutionList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "ntff":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let ntffRferrald: any;
        ntffRferrald =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: ntffRferrald,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.getNTFFList(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "phaseActivity":
        this.isSearchAny = true;
        let phaseId: any, phaseReferralId: any;
        phaseReferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        phaseId =
          parseInt(localStorage.getItem("phaseId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: phaseReferralId,
          phaseID: phaseId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getPhaseActivityList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "pnDiagnosisEntry":
        this.isSearchAny = true;
        let referralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: referralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listALLPNDiagnosis(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "courtOrder":
        this.isSearchAny = true;
        let coReferralId = this.REF_ID;
        this.requestObject = {
          referralID: coReferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listAllCourtOrder(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "payor":
        this.isSearchAny = true;
        this.requestObject = {
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listPayor(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "claimList":
        this.isSearchAny = true;
        let req = {
          beginPagination: initial,
          endPagination: end,
          sort: { column: "claimID", mode: "desc" },
        };
        this._opencards.claimListView(req).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "csClaimList":
        this.isSearchAny = true;
        this.isListAdd = false;
        let claim_req = {
          beginPagination: initial,
          endPagination: end,
          sort: { column: "claimID", mode: "desc" },
        };
        this._opencards.claimListView(claim_req).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "claim-provider":
        this.isSearchAny = true;
        this.isListAdd = false;
        let proclaimReq = {
          beginPagination: initial,
          endPagination: end,
          sort: { column: "claimID", mode: "desc" },
        };
        this._opencards.claimListView(proclaimReq).then((data) => {
          data.claim.map((ele) => {
            delete ele.payeeName;
          });
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "directAuthList":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let directreferralId = this.REF_ID;
        let request = {
          referralID: directreferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: "claimID", mode: "desc" },
        };
        this._opencards.directAuthListView(request).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "payee":
        this.isSearchAny = true;
        this.requestObject = {
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        if (this.searchType.searchType) {
          this.requestObject["searchType"] = this.searchType.searchType;
          switch (this.searchType.searchType) {
            case "VendorID":
              this.requestObject["searchType"] = "VenderID";
              break;

            case "Payee Name":
              this.requestObject["searchType"] = "PayeeName";
              break;
          }
          this.requestObject["strValue"] = this.searchInput;
        }
        if (this.isPageSize) {
          this.requestObject = {
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          if (this.searchType.searchType) {
            this.requestObject["searchType"] = this.searchType.searchType;
            this.requestObject["strValue"] = this.searchInput;

            switch (this.searchType.searchType) {
              case "VendorID":
                this.requestObject["searchType"] = "VenderID";
                break;

              case "Payee Name":
                this.requestObject["searchType"] = "PayeeName";
                break;
            }
          }
          //
          this.requestObject = {
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          this.requestObject["strValue"] = this.searchInput;
          this.requestObject["searchType"] = "PayeeName";
          this.requestObject["group by"] = "All";

          if (this.searchType.searchType) {
            this.requestObject = {
              beginPagination: this.initial,
              endPagination: this.end,
              sort: {
                column: this.sortingEnable
                  ? this.sortColumn
                  : this.columnToSorted,
                mode: this.sortOrder || "asc",
              },
              searchType: this.searchType.searchType,
              strValue: this.searchInput,
            };

            this.requestObject["strValue"] = this.searchInput;
            this.requestObject["searchType"] = this.searchType.searchType;
            this.requestObject["group by"] = "All";

            switch (this.searchType.searchType) {
              case "VendorID":
                this.requestObject["searchType"] = "VenderID";
                break;

              case "Payee Name":
                this.requestObject["searchType"] = "PayeeName";
                break;
            }
          }
        }
        this._opencards.listPayee(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "CS-Payee":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.requestObject = {
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards.listPayee(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "CS-PayeeDirectAuth":
        // this.isSearchAny = true;
        this.requestObject = {
          beginPagination: initial,
          endPagination: end,
          payeeID: parseInt(localStorage.getItem("payeeID")),
        };
        this._opencards
          .getPayeeDirectAuthList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "CS-PayeeAuth":
        // this.isSearchAny = true;

        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.requestObject = {
          beginPagination: initial,
          endPagination: end,
          payeeID: parseInt(localStorage.getItem("payeeID")),
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: "asc",
          },
        };
        if (this.isPageSize) {
          this.requestObject = {
            payeeID: parseInt(localStorage.getItem("payeeID")),
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
        }
        this._opencards.getPayee_AuthList(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "payeeLocation":
        let requestObject = {
          beginPagination: initial,
          endPagination: end,
          payeeID: parseInt(localStorage.getItem("payeeID")),
        };
        this._opencards.listPayeeLocation(requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "preventativeMeasurements":
        this.isSearchAny = true;
        let pclientId =
          parseInt(localStorage.getItem("clientId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          openCard: this.requestObject,
          endPagination: end,
          beginPagination: initial,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .listAllPreventaitveMeasurements(this.requestObject, pclientId)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "appointments":
        this.isSearchAny = true;
        let APPreferralId = this.REF_ID;
        this.requestObject = {
          referralID: APPreferralId,
          endPagination: end,
          beginPagination: initial,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listAllAppointments(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "bhDetermination":
        this.isSearchAny = true;
        let BHDreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: BHDreferralId,
          endPagination: end,
          beginPagination: initial,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .listAllBhDetermination(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "attendingSchool":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let ASLreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: ASLreferralId,
          endPagination: end,
          beginPagination: initial,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .listAllAttendingSchool(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "gradeLevel":
        this.isSearchAny = true;
        let GLreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: GLreferralId,
          endPagination: end,
          beginPagination: initial,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listAllGradeLevel(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "homeSchool":
        this.isSearchAny = true;
        let HSreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: HSreferralId,
          endPagination: end,
          beginPagination: initial,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listAllHomeschool(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "schoolRelease":
        this.isSearchAny = true;
        let SRreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: SRreferralId,
          endPagination: end,
          beginPagination: initial,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .listAllSchoolRelease(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "healthRecord":
        this.isSearchAny = true;
        let HRreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: HRreferralId,
          endPagination: end,
          beginPagination: initial,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listAllHealthRecord(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "adoptionEvent":
        this.isSearchAny = true;
        let AEreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: AEreferralId,
          endPagination: end,
          beginPagination: initial,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .listAllAdoptionEvent(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "kan-be-healthy":
        this.isSearchAny = true;
        let KBHreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: KBHreferralId,
          endPagination: end,
          beginPagination: initial,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listAllKanBeHealthy(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "monthlyReports":
        this.isSearchAny = true;
        let MRreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: MRreferralId,
          endPagination: end,
          beginPagination: initial,
        };
        this._opencards
          .listAllMonthlyReports(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "progressNote":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let PNreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: PNreferralId,
          endPagination: end,
          beginPagination: initial,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listAllProgressNote(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "clientSSI":
        this.isSearchAny = true;
        let SSIreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          referralID: SSIreferralId,
          endPagination: end,
          beginPagination: initial,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listAllSSI(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "provider":
        this.isSearchAny = true;
        this.requestObject = {
          endPagination: end,
          beginPagination: initial,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        if (this.searchType.searchType) {
          this.requestObject["searchType"] = this.searchType.searchType;
          this.requestObject["strValue"] = this.searchInput;
        }
        if (this.isPageSize) {
          this.requestObject = {
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder,
            },
          };
          if (this.searchType.searchType) {
            this.requestObject["searchType"] = this.searchType.searchType;
            this.requestObject["strValue"] = this.searchInput;
          }

          //
          this.requestObject = {
            beginPagination: this.initial,
            endPagination: this.end,
          };
          this.requestObject["strValue"] = this.searchInput;
          this.requestObject["searchType"] = "Provider Name";
          this.requestObject["group by"] = "All";

          if (this.searchType.searchType) {
            this.requestObject = {
              beginPagination: this.initial,
              endPagination: this.end,
              searchType: this.searchType.searchType,
              strValue: this.searchInput,
            };

            this.requestObject["strValue"] = this.searchInput;
            this.requestObject["searchType"] = this.searchType.searchType;
            this.requestObject["group by"] = "All";
          }
        }
        this._opencards.listProvider(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "caseFileActivity":
        this.isSearchAny = true;
        let CFAreferralId = this.REF_ID;
        this.requestObject = {
          endPagination: end,
          beginPagination: initial,
          referralID: CFAreferralId,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .listCaseFileActivity(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "independentLiving":
        this.isSearchAny = true;
        let ILreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          endPagination: end,
          beginPagination: initial,
          referralID: ILreferralId,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .listIndependentLiving(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "immunization":
        this.isSearchAny = true;
        let IZreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          endPagination: end,
          beginPagination: initial,
          referralID: IZreferralId,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listImmunization(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "bhokHealth":
        this.isSearchAny = true;
        let bhokHealthListrequest = {
          endPagination: end,
          beginPagination: initial,
          referralID:
            parseInt(localStorage.getItem("referralId")) -
            this._opencards.getHasKey(),
        };
        this._opencards
          .listBhokHealthList(bhokHealthListrequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "waiver":
        this.isSearchAny = true;
        let WaiverreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          endPagination: end,
          beginPagination: initial,
          referralID: WaiverreferralId,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listWaiver(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "KIPP/PMTO":
        this.isSearchAny = true;
        let PMTOreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          endPagination: end,
          beginPagination: initial,
          referralID: PMTOreferralId,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listKippPmto(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "kipp":
        this.isSearchAny = true;
        let KIPPreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.requestObject = {
          endPagination: end,
          beginPagination: initial,
          referralID: KIPPreferralId,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listKipp(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "customerCare":
        this.requestObject = {
          filter: "CustomerCarePerson",
          endPagination: end,
          beginPagination: initial,
          action: "NaN",
          sort: { column: "custCarePersonID", mode: "desc" },
        };
        this._opencards.listCustomerCare(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "placement":
        this.isSearchAny = true;
        let PlacementreferralId = this.REF_ID;
        this.requestObject = {
          endPagination: end,
          beginPagination: initial,
          referralID: PlacementreferralId,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listOfPlacements(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        this.customQueryParams = {
          module: "placement",
          action: "create",
          sub: "",
        };
        break;

      case "otherServices":
        this.isSearchAny = true;
        let OSreferralId = this.REF_ID;
        let otherServiceReq = {
          referralID: OSreferralId,
          beginPagination: initial,
          endPagination: end,
          isOtherService: "True",
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        if (this.sortColumn === "beginDate") {
          otherServiceReq["sort"] = {
            column: "AUTH.BeginDate",
            mode: this.sortOrder || "asc",
          };
        } else if (this.sortColumn === "endDate") {
          otherServiceReq["sort"] = {
            column: "AUTH.EndDate",
            mode: this.sortOrder || "asc",
          };
        } else if (this.sortColumn === "referralID") {
          otherServiceReq["sort"] = {
            column: "AUTH.ReferralID",
            mode: this.sortOrder || "asc",
          };
        } else if (this.sortColumn === "payorAuthorizationID") {
          otherServiceReq["sort"] = {
            column: "AUTH.PayorAuthorizationID",
            mode: this.sortOrder || "asc",
          };
        } else if (this.sortColumn === "authorizationID") {
          otherServiceReq["sort"] = {
            column: "AUTH.AuthorizationID",
            mode: this.sortOrder || "asc",
          };
        } else if (this.sortColumn === "authorizationStatus") {
          otherServiceReq["sort"] = {
            column: "AuthStatus.AuthorizationStatus",
            mode: this.sortOrder || "asc",
          };
        } else {
          otherServiceReq["sort"] = {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          };
        }
        this._opencards.otherServiceListView(otherServiceReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "hardGoods":
        this.isSearchAny = true;
        let HGreferralId = this.REF_ID;
        let hardGoodsReq = {
          referralID: HGreferralId,
          beginPagination: initial,
          endPagination: end,
          isHardgood: "True",
          sort: { column: "authorizationID", mode: "desc" },
        };
        this._opencards.otherServiceListView(hardGoodsReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "claimsList":
        this.isSearchAny = true;
        let claimsList = {
          authorizationID: parseInt(localStorage.getItem("authId")),
          beginPagination: initial,
          endPagination: end,
          sort: { column: "claimID", mode: "desc" },
        };
        let auth_id: any;
        auth_id = parseInt(localStorage.getItem("authId"));
        localStorage.setItem(
          "authorizationId",
          auth_id + this._opencards.getHasKey()
        );
        this._opencards.getClaimsAuthById(claimsList).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "ciritical-incident":
        this.isSearchAny = true;
        let CIclientId =
          parseInt(localStorage.getItem("clientId")) -
          this._opencards.getHasKey();
        const REQ = {
          openCard: "UnusualIncident",
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
          value: "",
        };
        this._opencards.listIncident(REQ, CIclientId).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "courtCase":
        this.isSearchAny = true;
        let courtCaseRferrald =
          parseInt(localStorage.getItem("clientId")) -
          this._opencards.getHasKey();
        const CCREQ = {
          openCard: "CourtCase",
          beginPagination: initial,
          endPagination: end,
          sort: { column: "courtCaseID", mode: "desc" },
        };
        this._opencards.listCourtCase(CCREQ, courtCaseRferrald).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "sibiling in-out":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        clientId =
          parseInt(localStorage.getItem("clientId")) -
          this._opencards.getHasKey();
        let SIOreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        const SIBREQ = { referralID: SIOreferralId, clientID: clientId };
        this._opencards.listSiblings(SIBREQ).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "authorizationSummary":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let ASreferralId = this.REF_ID;
        let authorizationSummary = {
          referralID: ASreferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: "beginDate", mode: "desc" },
        };
        this._opencards
          .otherServiceListView(authorizationSummary)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerSponser":
        this.isSearchAny = true;
        let providerSponsorListReq = {
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder,
          },
        };
        if (this.searchType.searchType) {
          providerSponsorListReq["searchType"] = this.searchType.searchType;
          providerSponsorListReq["strValue"] = this.searchInput;
        }

        if (this.isPageSize) {
          providerSponsorListReq = {
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder,
            },
          };

          //
          providerSponsorListReq = {
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder,
            },
          };

          if (this.searchType.searchType) {
            providerSponsorListReq["searchType"] = this.searchType.searchType;
            providerSponsorListReq["strValue"] = this.searchInput;
          }

          if (this.searchType.searchType) {
            providerSponsorListReq = {
              beginPagination: this.initial,
              endPagination: this.end,
              sort: {
                column: this.sortingEnable
                  ? this.sortColumn
                  : this.columnToSorted,
                mode: this.sortOrder,
              },
            };

            providerSponsorListReq["strValue"] = this.searchInput;
            providerSponsorListReq["searchType"] = this.searchType.searchType;
            providerSponsorListReq["group by"] = "All";
          }
        }
        this._opencards
          .providerSponsorList(providerSponsorListReq)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "adoption":
        this.isSearchAny = true;
        this.adoptionRuleCheck();
        let AdoptionreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        const ADOPTREQ = {
          referralID: AdoptionreferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listAdoption(ADOPTREQ).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "generalSchool":
        this.isSearchAny = true;
        let GSreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        const GSPTREQ = {
          referralID: GSreferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listGeneralEducation(GSPTREQ).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "creditTracking":
        this.isSearchAny = true;
        let CTreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        const CTREQ = {
          referralID: CTreferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listCreditTracking(CTREQ).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "specialEducation":
        this.isSearchAny = true;
        let SEreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        const SEREQ = {
          referralID: SEreferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listSpecialEducation(SEREQ).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "bis":
        let BISreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        const BISREQ = {
          referralID: BISreferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listBIS(BISREQ).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "ir":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let IRreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        const IRREQ = {
          referralID: IRreferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listIR(IRREQ).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "permanencyForm":
        this.isAddBtnDisable = true;
        this.isSearchAny = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let preferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        const PREMEQ = {
          referralID: preferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listPermanency(PREMEQ).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "moveForm":
        this.isSearchAny = true;
        let mreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        const MFRQ = {
          referralID: mreferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listMoveForm(MFRQ).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "claimsListSummary":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let claimsListSummary = {
          authorizationID: localStorage.getItem("authId"),
          beginPagination: initial,
          endPagination: end,
          sort: { column: "claimID", mode: "desc" },
        };
        this._opencards.getClaimsAuthById(claimsListSummary).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "educationEnrollment":
        let EEreferralId;
        this._activateRoute.queryParams.subscribe((params) => {
          if (params && params.ref_id) {
            EEreferralId = parseInt(params.ref_id);
          } else {
            EEreferralId =
              parseInt(localStorage.getItem("referralId")) -
              this._opencards.getHasKey();
          }
          console.log("this.EEreferralId>>>", EEreferralId);
        });

        this.isSearchAny = true;
        //  EEreferralId =
        //   parseInt(localStorage.getItem("referralId")) -
        //   this._opencards.getHasKey();
        const EEISPF = {
          referralID: EEreferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listEducationEnrollment(EEISPF).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "IEP":
        let IEP_referralId;
        this._activateRoute.queryParams.subscribe((params) => {
          if (params && params.ref_id) {
            IEP_referralId = parseInt(params.ref_id);
          } else {
            IEP_referralId =
              parseInt(localStorage.getItem("referralId")) -
              this._opencards.getHasKey();
          }
          console.log("this.IEP_referralId>>>", IEP_referralId);
        });

        this.isSearchAny = true;
        //  EEreferralId =
        //   parseInt(localStorage.getItem("referralId")) -
        //   this._opencards.getHasKey();
        const iep = {
          referralID: IEP_referralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.iep_Lists(iep).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "behavioralAssessment":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let BAreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        // clientId = parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey();
        let clientID =
          parseInt(localStorage.getItem("clientId")) -
          this._opencards.getHasKey();
        const bAssessment = {
          referralID: BAreferralId,
          beginPagination: initial,
          endPagination: end,
          clientID: clientID,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.getBehavioralList(bAssessment).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "siblings":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        if (
          parseInt(localStorage.getItem("referralTypeId")) -
            this._opencards.getHasKey() ===
          2
        ) {
          let sibilingReferralID = this.REF_ID;
          let siblingsClientID = this.CLIENT_ID;
          let sibReq = {
            referralID: sibilingReferralID,
            clientID: siblingsClientID,
          };
          this._opencards.listAllSibilings(sibReq).then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        } else {
          let sibilingReferralID =
            parseInt(localStorage.getItem("referralId")) -
            this._opencards.getHasKey();
          let siblingsClientID =
            parseInt(localStorage.getItem("clientId")) -
            this._opencards.getHasKey();
          let sibReq = {
            referralID: sibilingReferralID,
            clientID: siblingsClientID,
          };
          this._opencards.listAllSibilings(sibReq).then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        }
        break;
      case "supervisoryStaffingFormNode":
        this.isSearchAny = true;
        let ssReferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        const SSFNREQ = {
          referralID: ssReferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getListAllSupervisoryStaffingRfc(SSFNREQ)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "supervisoryStaffingFormRfcNode":
        this.isSearchAny = true;
        let ssRfcReferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        const SSFNREQRFC = {
          referralID: ssRfcReferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getListAllSupervisoryStaffingRfc(SSFNREQRFC)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "globalList":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let globalListReq = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        if (this.searchType.searchType) {
          globalListReq["searchType"] = this.searchType.searchType;
          globalListReq["strValue"] = this.searchInput;
        }

        if (this.isPageSize) {
          globalListReq = {
            tableName: this.tableArray,
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };

          //
          globalListReq = {
            tableName: this.tableArray,
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };

          if (this.searchType.searchType) {
            globalListReq["searchType"] = this.searchType.searchType;
            globalListReq["strValue"] = this.searchInput;
          }

          if (this.searchType.searchType) {
            globalListReq = {
              tableName: this.tableArray,
              beginPagination: this.initial,
              endPagination: this.end,
              sort: {
                column: this.sortingEnable
                  ? this.sortColumn
                  : this.columnToSorted,
                mode: this.sortOrder || "asc",
              },
            };

            globalListReq["strValue"] = this.searchInput;
            globalListReq["searchType"] = this.searchType.searchType;
            globalListReq["group by"] = "All";
          }
        }
        this._opencards.cardsGlobalList(globalListReq).then((data: any) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "familySafety":
        this.isSearchAny = true;
        let fsReferralID =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        const FSREQ = {
          referralID: fsReferralID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listFamilySafety(FSREQ).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "familySafetyActivity":
        this.isSearchAny = true;
        let familySafetyId =
          parseInt(localStorage.getItem("familySafteyId")) -
          this._opencards.getHasKey();
        const FSAREQ = {
          victimType: "All",
          familySafetyID: familySafetyId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.listFamilySafetyActivity(FSAREQ).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "fpBillableCaseActivity":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        this.isTableBottomAction = true;
        let fpReferralId = this.REF_ID;
        const FPREQ = {
          referralID: fpReferralId,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards.getListFPBillabelCaseActivity(FPREQ).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "providerPets":
        this.isSearchAny = true;
        let providerList = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider.getPetsList(providerList).then((data: any) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "providerLocation":
        this.isSearchAny = true;
        let providerLocationList = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider
          .getLocationList(providerLocationList)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerOffice":
        this.isSearchAny = true;
        let providerOfficeList = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider.getOfficeList(providerOfficeList).then((data: any) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "providerStaff":
        this.isSearchAny = true;
        let providerStaffList = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider.listStaff(providerStaffList).then((data: any) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "providerOtherAgencyStaff":
        this.isSearchAny = true;
        let providerOtherAgencyStaffList = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider
          .listOtherAgencyStaff(providerOtherAgencyStaffList)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerLicense":
        this.isSearchAny = true;
        let providerLicenseList = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider
          .listProviderLicense(providerLicenseList)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerLicenseException":
        this.isSearchAny = true;
        let providerLicenseExceptionList = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider
          .listProviderLicenseException(providerLicenseExceptionList)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerSponsor":
        this.isSearchAny = true;
        let providerSponsorList = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider
          .listProviderSponsor(providerSponsorList)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "familyContact":
        this.isSearchAny = true;
        let providerContact = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider.listFamilyContact(providerContact).then((data: any) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "staff":
        this.isSearchAny = true;
        let staffReq = {
          beginPagination: initial,
          endPagination: end,
          "group by": "All",
          filter: this.filter,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder,
          },
        };
        if (this.searchType.searchType) {
          staffReq["searchType"] = this.searchType.searchType;
          staffReq["strValue"] = this.searchInput;
        }

        if (this.isPageSize) {
          staffReq = {
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder,
            },
            "group by": null,
            filter: this.filter,
          };

          //
          staffReq = {
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder,
            },
            "group by": null,
            filter: this.filter,
          };

          if (this.searchType.searchType) {
            staffReq["searchType"] = this.searchType.searchType;
            staffReq["strValue"] = this.searchInput;
          }

          if (this.searchType.searchType) {
            staffReq = {
              beginPagination: this.initial,
              endPagination: this.end,
              sort: {
                column: this.sortingEnable
                  ? this.sortColumn
                  : this.columnToSorted,
                mode: this.sortOrder,
              },
              "group by": null,
              filter: this.filter,
            };

            staffReq["strValue"] = this.searchInput;
            staffReq["searchType"] = this.searchType.searchType;
            staffReq["group by"] = "All";
          }
        }
        this.clildFormService.getPerson(staffReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "providerStatus":
        this.isSearchAny = true;
        let providerStatus = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider.listProviderStatus(providerStatus).then((data: any) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "clientStrength":
        this.isSearchAny = true;
        this._opencards
          .listViewOfOpencardsByClient(reqOfOpencards, this.selectedClientId)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerSchool":
        this.isSearchAny = true;
        const providerSchool = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider.listProviderSchool(providerSchool).then((data: any) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "providerPreference":
        this.isSearchAny = true;
        let providerPreference = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider
          .listProviderPreference(providerPreference)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "providerTraining":
        this.isSearchAny = true;
        let providerTraining = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider
          .listProviderTraining(providerTraining)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "rolesList":
        this.isSearchAny = true;
        let rolesList = {
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this.clildFormService.getRolesList(rolesList).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "providerAdoption":
        this.isSearchAny = true;
        let providerAdoption = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider
          .listProviderAdoption(providerAdoption)
          .then((data: any) => {
            if (data.totalCount > 0) {
              this.isAddBtnDisable = true;
              this.isListAdd = false;
              this.isListAddAction = false;
            }
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "BISByProvider":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let BISByProvider = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider.listBIS(BISByProvider).then((data: any) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "IdentifyResource":
        this.isSearchAny = true;
        let IdentifyResource = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider
          .listIdentifyResource(IdentifyResource)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "livingArrangement":
        this.isSearchAny = true;
        this.requestObject = {
          placementID: this.PLACEMENT_ID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getLivingArrangementList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        this.customQueryParams = { action: "create" };
        break;
      case "ciritical-incident-allinvolve":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let providerReq;
        let providerId =
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey();
        providerReq = {
          openCard: "UnusualIncident",
          beginPagination: initial,
          endPagination: end,
          sort: { column: "UnusualIncidentID", mode: "desc" },
        };
        this._opencards
          .listProviderIncident(providerReq, providerId)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "ciritical-incident-RM":
        let loaderProviderRM = document.getElementById(
          "loading-overlay"
        ) as HTMLElement;
        loaderProviderRM.style.display = "block";
        this.isSearchAny = true;
        let providerReqRM, disableAddBtnRM;
        this.providerCriticalIncidentRuleCheck().then((data: any) => {
          loaderProviderRM.style.display = "none";
          disableAddBtnRM = data;
          if (disableAddBtnRM) {
            this.isAddBtnDisable = true;
            this.isListAdd = false;
            this.isListAddAction = false;
          }
        });
        let id =
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey();
        providerReqRM = {
          openCard: "UnusualIncident",
          beginPagination: initial,
          endPagination: end,
          sort: { column: "UnusualIncidentID", mode: "desc" },
        };
        this._opencards.listProviderIncident(providerReqRM, id).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "ciritical-incident-provider":
        let loaderProvider = document.getElementById(
          "loading-overlay"
        ) as HTMLElement;
        loaderProvider.style.display = "block";
        let disableAddBtn = false;
        this.isSearchAny = true;
        this.providerCriticalIncidentRuleCheck().then((data: any) => {
          disableAddBtn = data;
          if (disableAddBtn) {
            this.isAddBtnDisable = true;
            this.isListAdd = false;
            this.isListAddAction = false;
          }
          setTimeout(() => {
            loaderProvider.style.display = "none";
          }, 5000);
        });
        let providerRequest;
        let ID =
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey();
        providerRequest = {
          openCard: "UnusualIncident",
          beginPagination: initial,
          endPagination: end,
          sort: { column: "UnusualIncidentID", mode: "desc" },
        };
        this._opencards
          .listProviderIncident(providerRequest, ID)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "serviceAgreemnt":
        let loaderSerivceAgreement = document.getElementById(
          "loading-overlay"
        ) as HTMLElement;
        loaderSerivceAgreement.style.display = "block";
        this.isSearchAny = true;
        let serviceAgreemntReq = {
          referralID: this.REF_ID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };

        this._opencards
          .listServiceAgreement(serviceAgreemntReq)
          .then((data) => {
            loaderSerivceAgreement.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "placement-referral":
        let loaderPlacementReferral = document.getElementById(
          "loading-overlay"
        ) as HTMLElement;
        loaderPlacementReferral.style.display = "block";
        this.isSearchAny = true;
        let placementReferralreq = {
          referralID:
            parseInt(localStorage.getItem("referralId")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .getPlacementReferralList(placementReferralreq)
          .then((data) => {
            loaderPlacementReferral.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "AuthorizationTempList":
        let authorizationTempListReq = {};

        if (
          this.queryParam == "livingArrangment" ||
          this.queryParam == "livingArrangement"
        ) {
          /**Replace by living arrangment id authorizationTempListReq['livingArrangmentID'] */
          authorizationTempListReq["livingArrangementID"] = this.queryParam_2;
        }

        this._opencards
          .getLivingArrangementAuthorizations(authorizationTempListReq)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "AuthorizationTempClaimsList":
        let authorizationTempClaimListReq;
        if (
          this._activateRoute.snapshot.queryParamMap.get("origin") == "cards"
        ) {
          authorizationTempClaimListReq = {
            authorizationID:
              parseInt(localStorage.getItem("authorizationId")) -
              this._opencards.getHasKey(), // Authorization id
            beginPagination: initial,
            endPagination: end,
          };
        } else {
          authorizationTempClaimListReq = {
            authorizationID:
              parseInt(
                this._activateRoute.snapshot.queryParamMap.get("current_recId")
              ) ||
              parseInt(
                this._activateRoute.snapshot.queryParamMap.get("auth_id")
              ), // Authorization id
            beginPagination: initial,
            endPagination: end,
          };
        }
        this.isSearchAny = true;
        this._opencards
          .getCliamsByAuthorizationID(authorizationTempClaimListReq)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "livingArrangementAttachment":
        let livingArrangementIdFromUrl = parseInt(
          this._activateRoute.snapshot.queryParamMap.get("li_id")
        );
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          livingArrangementID:
            parseInt(localStorage.getItem("livingArrangementID")) -
              this._opencards.getHasKey() ||
            this.currentRecId ||
            livingArrangementIdFromUrl,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "placementAuthorizationsAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          authorizationID: this.currentRecId || this.currentAuthorizationID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerFchLevel":
        this.isSearchAny = true;
        let providerFchLevelList = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider
          .listFchLevelCare(providerFchLevelList)
          .then((data: any) => {
            this._provider.storeFchLevelListData(
              data.ProviderFCHLevelOfCareList
            );
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerStrength":
        this.isSearchAny = true;
        let providerStrengthList = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider
          .listProviderStrength(providerStrengthList)
          .then((data: any) => {
            this._provider.storeProviderStrengthListData(data.ProviderStrength);
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerUnacceptableConditions":
        this.isSearchAny = true;
        let unacceptableConditionList = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._provider
          .listUnacceptableCondition(unacceptableConditionList)
          .then((data: any) => {
            this._provider.storeUnacceptableConditionListData(
              data.ProviderUnacceptableConditionList
            );
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "authorizationSummaryProvider":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;

        let authorizationSummaryProvider = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };

        if (this.searchType.searchType) {
          authorizationSummaryProvider["searchType"] = "authorizationID";
          authorizationSummaryProvider["strValue"] = this.searchInput;
        }

        if (this.isPageSize) {
          authorizationSummaryProvider = {
            providerID: providerID,
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder,
            },
          };

          if (this.searchType.searchType) {
            authorizationSummaryProvider["searchType"] = "authorizationID";
            authorizationSummaryProvider["strValue"] = this.searchInput;
          }
        }

        this._opencards
          .providerAuthSummaryListView(authorizationSummaryProvider)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "livingArrangementProvider":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;

        let livingArrangementProvider = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: "livingArrangementID", mode: "desc" },
        };
        this._opencards
          .providerLivArrangementListView(livingArrangementProvider)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "daycareAuthorizations":
        this.isSearchAny = true;
        let dayCareAuthListReq = {
          placementID: this.PLACEMENT_ID,
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .listDayCareAuthorizations(dayCareAuthListReq)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        this.customQueryParams = {
          sub: "dayCareAuthorization",
          action: "create",
        };
        break;

      case "placementEvent":
        let PlacementEventreferralId =
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey();
        this.isSearchAny = true;
        this.requestObject = {
          placementID: this.PLACEMENT_ID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getPlacementEventList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        this.customQueryParams = { sub: "placementEvent", action: "create" };
        break;

      case "placeentEventAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          placementDetailID: parseInt(
            localStorage.getItem("placementDetailID")
          ),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "placementEventAuthorizationTempList":
        let placementEventAuthorizationTempListReq = {
          placementDetailID: parseInt(
            localStorage.getItem("placementDetailId")
          ),
          beginPagination: initial,
          endPagination: end,
          sort: { column: "authorizationID", mode: "desc" },
        };

        this._opencards
          .getPlacementEventAuthorizationList(
            placementEventAuthorizationTempListReq
          )
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "placementPlan":
        this.isSearchAny = true;
        this.requestObject = {
          placementID: this.PLACEMENT_ID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getPlacementPlanList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "placeentPlanAttachment":
        this.isAttachmentList = true;
        this.isSearchAny = true;
        this.requestObject = {
          placementPlanID: parseInt(
            localStorage.getItem("planPlacementDetailId")
          ),
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getCaseActivityAttachmentList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "recruitment":
        this.isSearchAny = true;

        let recruitmentProviderListRequest = {
          providerID: providerID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: "recruitmentInquiryID", mode: "desc" },
        };
        this._opencards
          .providerRecruitmentListView(recruitmentProviderListRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });

        this.customQueryParams = { module: "recruitment" };
        break;

      case "recruitmentInquiry":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let recruitmentInquiryProviderListRequest = {
          recruitmentInquiryID: parseInt(
            localStorage.getItem("recuritmentInquiryID")
          ),
        };
        this._opencards
          .providerRecruitmentInquiryListView(
            recruitmentInquiryProviderListRequest
          )
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });

        this.customQueryParams = { module: "recruitment" };
        break;

      case "recruitmentStaff":
        this.isSearchAny = true;
        let recruitmentStaffProviderListRequest = {
          recruitmentInquiryID: parseInt(
            localStorage.getItem("recuritmentInquiryID")
          ),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .providerRecruitmentStaffListView(recruitmentStaffProviderListRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });

        this.customQueryParams = { module: "recruitment" };
        break;

      case "casaOfficerCases":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let casaCasesListRequest = {
          casaOfficerID:
            parseInt(localStorage.getItem("casaOfficerID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: "caseTeamID", mode: "desc" },
        };
        this._opencards.getCaseByPerson(casaCasesListRequest).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });

        break;

      case "communityMemberCases":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let commMemberCasesListRequest = {
          communityMemberID:
            parseInt(localStorage.getItem("communityMemberID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: "personID", mode: "desc" },
        };
        this._opencards
          .getCaseByPerson(commMemberCasesListRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });

        break;

      case "personTypeCardSchool":
        this.isSearchAny = true;
        let personTypeCardSchoolListRequest = {
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder,
          },
        };
        if (this.searchType.searchType) {
          personTypeCardSchoolListRequest["searchType"] =
            this.searchType.searchType;
          personTypeCardSchoolListRequest["strValue"] = this.searchInput;
        }

        if (this.isPageSize) {
          personTypeCardSchoolListRequest = {
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder,
            },
          };

          //
          personTypeCardSchoolListRequest = {
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder,
            },
          };

          if (this.searchType.searchType) {
            personTypeCardSchoolListRequest["searchType"] =
              this.searchType.searchType;
            personTypeCardSchoolListRequest["strValue"] = this.searchInput;
          }

          if (this.searchType.searchType) {
            personTypeCardSchoolListRequest = {
              beginPagination: this.initial,
              endPagination: this.end,
              sort: {
                column: this.sortingEnable
                  ? this.sortColumn
                  : this.columnToSorted,
                mode: this.sortOrder,
              },
            };

            personTypeCardSchoolListRequest["strValue"] = this.searchInput;
            personTypeCardSchoolListRequest["searchType"] =
              this.searchType.searchType;
            personTypeCardSchoolListRequest["group by"] = "All";
          }
        }
        this._opencards
          .personTypeCardSchoolListView(personTypeCardSchoolListRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });

        break;

      case "personTypeCardAttendingSchool":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let personTypeCardAttendingSchoolListRequest = {
          schoolID:
            parseInt(localStorage.getItem("personTypeSchoolID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        this._opencards
          .personTypeCardAttendingSchoolListView(
            personTypeCardAttendingSchoolListRequest
          )
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });

        break;

      case "clientAttendingSchool":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let clientAttendingSchoolListRequest = {
          schoolID: this.clildFormService.getId(),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .personTypeCardAttendingSchoolListView(
            clientAttendingSchoolListRequest
          )
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });

        break;

      case "personTypeCardHomeSchool":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let personTypeCardHomeSchoolListRequest = {
          schoolID:
            parseInt(localStorage.getItem("personTypeSchoolID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        this._opencards
          .personTypeCardHomeSchoolListView(personTypeCardHomeSchoolListRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });

        break;

      case "clientHomeSchool":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let clientHomeSchoolListRequest = {
          schoolID: this.clildFormService.getId(),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .personTypeCardHomeSchoolListView(clientHomeSchoolListRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });

        break;

      case "providerMembersProviders":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let providersMembersProviderReq = {
          providerMemberID: this.clildFormService.getId(),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "beginDate",
            mode: "desc",
          },
        };
        this._opencards
          .getProviderMembersProviderList(providersMembersProviderReq)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "otherAgencyStaffproviders":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let otherAgencyStaffReq = {
          otherAgencyStaffID: this.clildFormService.getId(),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "providerName",
            mode: "desc",
          },
        };
        this._opencards
          .getOtherAgencyStaffProviderList(otherAgencyStaffReq)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "payorCases":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let payorCaseReq = {
          payorID: this.clildFormService.getId(),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards.getPayorsCases(payorCaseReq).then((data: any) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "payorAuthorizations":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let payorAuthReq = {
          payorID: this.clildFormService.getId(),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .getPayorsPlacementAuth(payorAuthReq)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerSponserCases":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let providerSponsorCasesReq = {
          sponsorID:
            parseInt(localStorage.getItem("sponsorID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "clientName",
            mode: "desc",
          },
        };
        this._opencards
          .getProviderSponsorCaseList(providerSponsorCasesReq)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerSponserSfcsContract":
        this.isSearchAny = true;
        let providerSponsorSfcsContractReq = {
          sponsorID:
            parseInt(localStorage.getItem("sponsorID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .getProviderSponsorSfcsContractList(providerSponsorSfcsContractReq)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerSponserPlacementAuthorization":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let providerSponsorPlaAuthReq = {
          sponsorID:
            parseInt(localStorage.getItem("sponsorID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .getProviderSponsorPlaAuthorizationList(providerSponsorPlaAuthReq)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "personTypeDhsOffice":
        this.isSearchAny = true;
        let dhsOfficeReq = {
          value: "",
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "dhsOfficeID",
            mode: "desc",
          },
        };
        this._opencards.getDhsOfficeList(dhsOfficeReq).then((data: any) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "personTypeDhsOfficeStaff":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let dhsStaffReq = {
          dhsOfficeID:
            parseInt(localStorage.getItem("personTypeDhsOfficeID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "dhsStaffID",
            mode: "desc",
          },
        };

        this._opencards.getDhsOfficeStaffList(dhsStaffReq).then((data: any) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "personTypeDhsOfficeCases":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let dhsStaffCasesReq = {
          dhsStaffID:
            parseInt(localStorage.getItem("personTypeDhsStaffID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "clientName",
            mode: "desc",
          },
        };
        this._opencards
          .getDhsOfficeCasesList(dhsStaffCasesReq)
          .then((data: any) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerSponserClaims":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let providerSponsorClaimsList = {
          authorizationID: localStorage.getItem("authId"),
          beginPagination: initial,
          endPagination: end,
          sort: { column: "claimID", mode: "desc" },
        };
        this._opencards
          .getClaimsAuthById(providerSponsorClaimsList)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "dhsStaffCases":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let dhsStaffCaseReq = {
          dhsStaffID: parseInt(localStorage.getItem("personTypeDhsStaffid")),
          beginPagination: initial,
          endPagination: end,
          sort: { column: "beginDate", mode: "desc" },
        };
        this._opencards.getDHSStaffCase(dhsStaffCaseReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "dhsStaffOffice":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let dhsStaffOfficeReq = {
          dhsStaffID: parseInt(localStorage.getItem("personTypeDhsStaffid")),
          beginPagination: initial,
          endPagination: end,
          sort: { column: "officeName", mode: "desc" },
        };
        this._opencards.getDHSStaffOffice(dhsStaffOfficeReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "dhsStaffCounties":
        let dhsStaffCountiesReq = {
          dhsStaffID: this.clildFormService.getId(),
          beginPagination: initial,
          endPagination: end,
          sort: { column: "countyName", mode: "desc" },
        };
        this._opencards.getDHSStaffCounty(dhsStaffCountiesReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "judgeCases":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let judgeCasesReq = {
          judgeID: localStorage.getItem("judgeID"),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "beginDate",
            mode: "asc",
          },
        };
        this._opencards.getCaseByPerson(judgeCasesReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "galCases":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let galCasesReq = {
          galID: localStorage.getItem("galID"),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "beginDate",
            mode: "asc",
          },
        };
        this._opencards.getCaseByPerson(galCasesReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "fmHouseholdCases":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let fmHouseholdCasesReq = {
          householdMembers: true,
          familyMemberID: parseInt(localStorage.getItem("FamilyMemberID")),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "beginDate",
            mode: "asc",
          },
        };
        this._opencards.getCaseByPerson(fmHouseholdCasesReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "fmExtendedFamilyCases":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let fmExtendedFamilyCasesReq = {
          extendedFamily: true,
          familyMemberID: parseInt(localStorage.getItem("FamilyMemberID")),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "beginDate",
            mode: "asc",
          },
        };
        this._opencards
          .getCaseByPerson(fmExtendedFamilyCasesReq)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "crbCases":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let crbCasesReq = {
          cRBCoordinatorID: parseInt(localStorage.getItem("cRBCoordinatorID")),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "beginDate",
            mode: "asc",
          },
        };
        this._opencards.getCaseByPerson(crbCasesReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "personTypeCustomerCarePerson":
        this.isSearchAny = true;
        let custCareReq = {
          filter: "CustomerCarePerson",
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards.customerCarePersonList(custCareReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "dcfStaffCases":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let dcfCasesReq = {
          dcfstaffID: parseInt(localStorage.getItem("dcfStaffID")),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "CL.ClientID",
            mode: "asc",
          },
        };
        this._opencards.getCaseByPerson(dcfCasesReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "dcfStaffOffice":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let dcfOfficeReq = {
          srsstaffID: parseInt(localStorage.getItem("dcfStaffID")),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "SRSStaff.srsOfficeID",
            mode: "asc",
          },
        };
        this._opencards.getDcfStaffOffices(dcfOfficeReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "authorizations-all":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let authorizationAllReq = {
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .getListOfAuthorizations(authorizationAllReq)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "provider-authorizations":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        var authorization_provider_Req = {
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .getListOfAuthorizations_provider(authorization_provider_Req)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "payee-authorizations":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        var authorization_payee_Req = {
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .getListOfAuthorizations_payee(authorization_payee_Req)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "provider_autho_claim":
        this.isAddBtnDisable = false;
        this.isListAdd = true;
        this.isListAddAction = false;
        this.isSearchAny = true;
        var authorization_provider_Req_claim = {
          beginPagination: initial,
          endPagination: end,
          authorizationID:
            parseInt(localStorage.getItem("authorizationId")) -
            this._opencards.getHasKey(),
        };
        this._opencards
          .getListOfAuthorizations_provider_claim(
            authorization_provider_Req_claim
          )
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "payee_autho_claim":
        this.isAddBtnDisable = false;
        this.isListAdd = true;
        this.isListAddAction = false;
        this.isSearchAny = true;
        var authorization_provider_Req_claim = {
          beginPagination: initial,
          endPagination: end,
          authorizationID:
            parseInt(localStorage.getItem("authorizationId")) -
            this._opencards.getHasKey(),
        };
        this._opencards
          .getListOfAuthorizations_provider_claim(
            authorization_provider_Req_claim
          )
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "csClaim-payee":
        this.isSearchAny = true;
        this.isListAdd = false;
        let csClaimPayeeReq = {
          beginPagination: initial,
          endPagination: end,
          sort: { column: "claimID", mode: "desc" },
        };
        this._opencards.claimListView(csClaimPayeeReq).then((data) => {
          data.claim.map((ele) => {
            delete ele.payeeName;
          });
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "cs-provider":
        this.isAddBtnDisable = false;
        this.isListAdd = true;
        this.isListAddAction = false;
        this.isSearchAny = true;
        this.isSearchAny = true;
        this.requestObject = {
          endPagination: end,
          beginPagination: initial,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        if (this.searchType.searchType) {
          this.requestObject["searchType"] = this.searchType.searchType;
          this.requestObject["strValue"] = this.searchInput;
        }
        if (this.isPageSize) {
          this.requestObject = {
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder,
            },
          };
          if (this.searchType.searchType) {
            this.requestObject["searchType"] = this.searchType.searchType;
            this.requestObject["strValue"] = this.searchInput;
          }
          this.requestObject = {
            beginPagination: this.initial,
            endPagination: this.end,
          };
          if (
            this.searchType.searchType === "AuthorizationID" ||
            this.searchType.searchType === "ClaimID"
          ) {
            this.requestObject["integerValue"] = this.searchInput;
            this.requestObject["searchType"] = this.searchType.searchType;
          } else if (this.searchType.searchType === null) {
            this.requestObject["searchType"] = "Provider Name";
            this.requestObject["strValue"] = this.searchInput;
          } else {
            this.requestObject["searchType"] = this.searchType.searchType;
            this.requestObject["strValue"] = this.searchInput;
          }
        }
        this._opencards.getCSProviderList(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "provider-adults":
        this.isSearchAny = true;
        let providerAdultReq = {
          providerID:
            parseInt(localStorage.getItem("providerID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "lastName",
            mode: "desc",
          },
        };
        this._opencards.getProviderAdultList(providerAdultReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "provider-child":
        this.isSearchAny = true;
        let providerChild = {
          providerID:
            parseInt(localStorage.getItem("providerID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "lastName",
            mode: "desc",
          },
        };
        this._opencards.getProviderChildList(providerChild).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "courtServiceOfficerCases":
        this.isSearchAny = true;
        let courtServiceOfficerCasesReq = {
          csvid: parseInt(localStorage.getItem("CisCaseActivityId")),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "personID",
            mode: "desc",
          },
        };
        this._opencards
          .getCaseByPerson(courtServiceOfficerCasesReq)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "csoStaffCases":
        this.isSearchAny = true;
        let csoStaffCasesReq = {
          CSOStaffID: parseInt(localStorage.getItem("CSOStaffID")),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "personID",
            mode: "desc",
          },
        };
        this._opencards.getCaseByPerson(csoStaffCasesReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "dhhsStaffCases":
        this.isSearchAny = true;
        let dhhsStaffCasesReq = {
          dhhsstaffID: parseInt(localStorage.getItem("DhhsStaffId")),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "personID",
            mode: "desc",
          },
        };
        this._opencards.getCaseByPerson(dhhsStaffCasesReq).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "medical_assesment":
        this.isSearchAny = true;
        this.isListAdd = true;
        let me_Req = {
          referralID:
            parseInt(localStorage.getItem("referralId")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards.getMedicalAssessment(me_Req).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "recruitment-referral":
        this.isSearchAny = true;

        let recruitmentReferralRequest = {
          recruitmentInquiryID: parseInt(
            localStorage.getItem("recuritmentInquiryID")
          ),
          // recruitmentInquiryID: 8446,
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .listOfRecuritmentReferrals(recruitmentReferralRequest)
          .then((data) => {
            if (data.totalCount > 0) {
              this.isAddBtnDisable = true;
              this.isListAdd = false;
              this.isListAddAction = false;
            }
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerRecruitmentTraining":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let recruitmentTrainingRequest = {
          recruitmentInquiryID: parseInt(
            localStorage.getItem("recuritmentInquiryID")
          ),
          // recruitmentInquiryID: 23,
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "RecruitmentTrainingID",
            mode: "asc",
          },
        };
        this._opencards
          .listOfRecuritmentTraining(recruitmentTrainingRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "providerRecruitmentLicensing":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let recruitmentLicensingRequest = {
          recruitmentInquiryID: parseInt(
            localStorage.getItem("recuritmentInquiryID")
          ),
          // recruitmentInquiryID: 23,
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "recruitmentLicensingEventID",
            mode: "asc",
          },
        };
        this._opencards
          .listOfRecuritmentLicensing(recruitmentLicensingRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "staffTeamLeader":
        this.isSearchAny = true;
        let staffTeamLeaderRequest = {
          staffID: parseInt(localStorage.getItem("staffIdPerson")),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .listOfStaffTeamLeader(staffTeamLeaderRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "staffTeamMember":
        this.isSearchAny = true;
        let staffTeamMemberRequest = {
          staffID: parseInt(localStorage.getItem("staffIdPerson")),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .listOfStaffTeamMember(staffTeamMemberRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "staffComplianceTech":
        this.isSearchAny = true;
        let staffComplianceTechRequest = {
          staffID: parseInt(localStorage.getItem("staffIdPerson")),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .listOfStaffComplianceTech(staffComplianceTechRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "staffAssignedComplianceTech":
        this.isSearchAny = true;
        let staffAssignedComplianceTechRequest = {
          staffID: parseInt(localStorage.getItem("staffIdPerson")),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .listOfStaffAssignedComplianceTech(staffAssignedComplianceTechRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "staffRecruitmentProvider":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        if (this.sortingList === true) {
          let staffRecruitmentProviderRequest = {
            staffID: parseInt(localStorage.getItem("staffIdPerson")),
            beginPagination: initial,
            endPagination: end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          this._opencards
            .listOfStaffRecruitmentProvider(staffRecruitmentProviderRequest)
            .then((data) => {
              loader.style.display = "none";
              this.generateListView(data);
            });
        } else {
          let staffRecruitmentProviderRequest = {
            staffID: parseInt(localStorage.getItem("staffIdPerson")),
            beginPagination: initial,
            endPagination: end,
          };
          this._opencards
            .listOfStaffRecruitmentProvider(staffRecruitmentProviderRequest)
            .then((data) => {
              loader.style.display = "none";
              this.generateListView(data);
            });
        }
        break;

      case "staffPrimaryOffice":
        this.isSearchAny = true;
        let staffPrimaryOfficeRequest = {
          staffID: parseInt(localStorage.getItem("staffIdPerson")),
          beginPagination: initial,
          endPagination: end,
          staffSFAOfficeTypeID: 1,
        };
        this._opencards
          .listOfStaffPrimaryOffice(staffPrimaryOfficeRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "staffSecondaryOffice":
        this.isSearchAny = true;
        let staffSecondaryOfficeRequest = {
          staffID: parseInt(localStorage.getItem("staffIdPerson")),
          beginPagination: initial,
          endPagination: end,
          staffSFAOfficeTypeID: 2,
        };
        this._opencards
          .listOfStaffPrimaryOffice(staffSecondaryOfficeRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "staffSubTeamMember":
        this.isSearchAny = true;
        let staffSubTeamMemberRequest = {
          staffID: parseInt(localStorage.getItem("staffIdSubTeamMember")),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .listOfStaffTeamMember(staffSubTeamMemberRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      case "PayeeAuthorizationsSummary":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let payee_Req = {
          payeeID: parseInt(localStorage.getItem("payeeID")),
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };

        if (this.searchType.searchType) {
          payee_Req["searchType"] = "authorizationID";
          payee_Req["strValue"] = this.searchInput;
        }

        if (this.isPageSize) {
          payee_Req = {
            payeeID: parseInt(localStorage.getItem("payeeID")),
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder,
            },
          };

          if (this.searchType.searchType) {
            payee_Req["searchType"] = "authorizationID";
            payee_Req["strValue"] = this.searchInput;
          }
        }

        this._opencards.getPayeeAuthList(payee_Req).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;

      case "PayeeServiceClaimHardGoods":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let serHardReq = {
          payeeID: parseInt(localStorage.getItem("payeeID")),
          isHardgood: "True",
          endDate: "01/01/1899",
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: "PayeeID",
            mode: "asc",
          },
        };
        this._opencards
          .getPayeeserviceHardAuthList(serHardReq)
          .subscribe((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "PayeeServiceClaimOtherService":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let serOtherReq = {
          payeeID: parseInt(localStorage.getItem("payeeID")),
          isOtherService: true,
          endDate: "01/01/1899",
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        this._opencards
          .getPayeeserviceHardAuthList(serOtherReq)
          .subscribe((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "PayeeAuthorizationClaimsList":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let payeeClaim_Req = {
          authorizationID:
            parseInt(localStorage.getItem("authorizationId")) -
            this._opencards.getHasKey(), // Authorization id
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .getCliamsByAuthorizationID(payeeClaim_Req)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "PayeeServiceHardAuthorizationClaimsList":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let payeeServiceClaim_Req = {
          authorizationID:
            parseInt(localStorage.getItem("authorizationId")) -
            this._opencards.getHasKey(), // Authorization id
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .getCliamsByAuthorizationID(payeeServiceClaim_Req)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "payeeSeciceClaimDirectAuthList":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        let serviceClaimrequest = {
          payeeID: parseInt(localStorage.getItem("payeeID")),
          endDate: "01/01/1899",
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .payeeServiceDirectAuthListView(serviceClaimrequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "cs-client":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        var csClintReq = {
          filter: "client",
          "group by": "All",
          beginPagination: initial,
          endPagination: end,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        if (this.searchType.searchType) {
          csClintReq["searchType"] = this.searchType.searchType;
          csClintReq["strValue"] = this.searchInput;
        }

        if (this.isPageSize) {
          csClintReq = {
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder,
            },
            "group by": null,
            filter: "client",
          };

          //
          csClintReq = {
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
            "group by": null,
            filter: "client",
          };

          if (this.searchType.searchType) {
            csClintReq["searchType"] = this.searchType.searchType;
            csClintReq["strValue"] = this.searchInput;
          }

          if (this.searchType.searchType) {
            csClintReq = {
              beginPagination: this.initial,
              endPagination: this.end,
              sort: {
                column: this.sortingEnable
                  ? this.sortColumn
                  : this.columnToSorted,
                mode: this.sortOrder || "asc",
              },
              "group by": null,
              filter: "client",
            };

            csClintReq["strValue"] = this.searchInput;
            csClintReq["searchType"] = this.searchType.searchType;
            csClintReq["group by"] = "All";
          }
        }

        this.clildFormService.getPerson(csClintReq).then((data) => {
          // this.clientInfo = data;
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "PayeeServiceOtherServiceAuthorizationClaimsList":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let payeeServiceOther_Req = {
          authorizationID:
            parseInt(localStorage.getItem("authorizationId")) -
            this._opencards.getHasKey(), // Authorization id
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .getCliamsByAuthorizationID(payeeServiceOther_Req)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "placementHistory":
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.isSearchAny = true;
        let placementHistoryRequest = {
          providerID:
            parseInt(localStorage.getItem("providerID")) -
            this._opencards.getHasKey(),
          beginPagination: initial,
          endPagination: end,
        };
        this._opencards
          .getPlacementHistoryList(placementHistoryRequest)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "kansas":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.requestObject = {
          state: "kansas",
          endPagination: end,
          beginPagination: initial,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: "asc",
          },
        };
        if (this.searchType.searchType) {
          this.requestObject["searchType"] = this.searchType.searchType;
          this.requestObject["value"] = this.searchInput;
        }
        if (this.isPageSize) {
          this.requestObject = {
            state: "kansas",
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: "asc",
            },
          };
          if (this.searchType.searchType) {
            this.requestObject["searchType"] = this.searchType.searchType;
            this.requestObject["value"] = this.searchInput;
          }
          this.requestObject = {
            state: "kansas",
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: "asc",
            },
            searchType: this.searchType.searchType,
            //     value: this.searchDataTypeInfo.strValue || this.searchDataTypeInfo.integerValue ? this.searchInput : null
          };
          if (this.searchType.searchType) {
            this.requestObject = {
              state: "kansas",
              beginPagination: this.initial,
              endPagination: this.end,
              sort: {
                column: this.sortingEnable
                  ? this.sortColumn
                  : this.columnToSorted,
                mode: "asc",
              },
              searchType: this.searchType.searchType,
              value:
                this.searchDataTypeInfo.strValue ||
                this.searchDataTypeInfo.integerValue
                  ? this.searchInput
                  : null,
            };
            this.requestObject["value"] = this.searchInput;
            this.requestObject["searchType"] = this.searchType.searchType;
            this.requestObject["group by"] = "All";
          }
        }
        this._opencards.getKansas(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "nebraska":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.requestObject = {
          state: "nebraska",
          endPagination: end,
          beginPagination: initial,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: "asc",
          },
        };
        if (this.searchType.searchType) {
          this.requestObject["searchType"] = this.searchType.searchType;
          this.requestObject["value"] = this.searchInput;
        }
        if (this.isPageSize) {
          this.requestObject = {
            state: "nebraska",
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: "asc",
            },
          };
          if (this.searchType.searchType) {
            this.requestObject["searchType"] = this.searchType.searchType;
            this.requestObject["value"] = this.searchInput;
          }
          this.requestObject = {
            state: "nebraska",
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: "asc",
            },
            searchType: this.searchType.searchType,
            value:
              this.searchDataTypeInfo.strValue ||
              this.searchDataTypeInfo.integerValue
                ? this.searchInput
                : null,
          };
          if (this.searchType.searchType) {
            this.requestObject = {
              state: "nebraska",
              beginPagination: this.initial,
              endPagination: this.end,
              sort: {
                column: this.sortingEnable
                  ? this.sortColumn
                  : this.columnToSorted,
                mode: "asc",
              },
              searchType: this.searchType.searchType,
              value:
                this.searchDataTypeInfo.strValue ||
                this.searchDataTypeInfo.integerValue
                  ? this.searchInput
                  : null,
            };
            this.requestObject["value"] = this.searchInput;
            this.requestObject["searchType"] = this.searchType.searchType;
            this.requestObject["group by"] = "All";
          }
        }
        this._opencards.getNebraska(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "oklahoma":
        this.isSearchAny = true;
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
        this.requestObject = {
          state: "oklahoma",
          endPagination: end,
          beginPagination: initial,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: "asc",
          },
        };
        if (this.searchType.searchType) {
          this.requestObject["searchType"] = this.searchType.searchType;
          this.requestObject["value"] = this.searchInput;
        }
        if (this.isPageSize) {
          this.requestObject = {
            state: "oklahoma",
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: "asc",
            },
          };
          if (this.searchType.searchType) {
            this.requestObject["searchType"] = this.searchType.searchType;
            this.requestObject["value"] = this.searchInput;
          }
          this.requestObject = {
            state: "oklahoma",
            beginPagination: this.initial,
            endPagination: this.end,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: "asc",
            },
            searchType: this.searchType.searchType,
            value:
              this.searchDataTypeInfo.strValue ||
              this.searchDataTypeInfo.integerValue
                ? this.searchInput
                : null,
          };

          if (this.searchType.searchType) {
            this.requestObject = {
              state: "oklahoma",
              beginPagination: this.initial,
              endPagination: this.end,
              sort: {
                column: this.sortingEnable
                  ? this.sortColumn
                  : this.columnToSorted,
                mode: "asc",
              },
              searchType: this.searchType.searchType,
              value:
                this.searchDataTypeInfo.strValue ||
                this.searchDataTypeInfo.integerValue
                  ? this.searchInput
                  : null,
            };

            this.requestObject["value"] = this.searchInput;
            this.requestObject["searchType"] = this.searchType.searchType;
            this.requestObject["group by"] = "All";
          }
        }
        this._opencards.getOklahoma(this.requestObject).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
        break;
      case "evaluationType":
        this.isSearchAny = true;
        let evaluationTypeID =
          parseInt(localStorage.getItem("evaluationTypeID")) -
          this._opencards.getHasKey();
        this.requestObject = {
          evaluationTypeID: evaluationTypeID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getEvaluationTypeList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "evaluationScale":
        this.isSearchAny = true;
        let evaluationScaleID =
          parseInt(localStorage.getItem("scaleID")) -
          this._opencards.getHasKey();
        this.requestObject = {
          scaleID: evaluationScaleID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getEvaluationScaleList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "versionCreation":
        this.isSearchAny = true;
        let evaluationVersionID =
          parseInt(localStorage.getItem("evaluationVersionID")) -
          this._opencards.getHasKey();
        this.requestObject = {
          evaluationVersionID: evaluationVersionID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getVersionCreationList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "questionCreation":
        this.isSearchAny = true;
        let questionID =
          parseInt(localStorage.getItem("questionID")) -
          this._opencards.getHasKey();
        this.requestObject = {
          questionID: questionID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getQuestionCreationList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "questionGroupCreation":
        this.isSearchAny = true;
        let questionGroupID =
          parseInt(localStorage.getItem("questionGroupID")) -
          this._opencards.getHasKey();
        this.requestObject = {
          questionGroupID: questionGroupID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getQuestionGroupCreationList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;
      case "evaluationAllowedGroup":
        this.isSearchAny = true;
        let evaluationAllowedGroupID =
          parseInt(localStorage.getItem("evaluationAllowedGroupID")) -
          this._opencards.getHasKey();
        this.requestObject = {
          evaluationAllowedGroupID: evaluationAllowedGroupID,
          beginPagination: initial,
          endPagination: end,
          sort: { column: this.columnToSorted, mode: "desc" },
        };
        this._opencards
          .getEvaluationAllowedGroupList(this.requestObject)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
          });
        break;

      // case "providerMember":
      //   this.isSearchAny = true;
      //   this.clildFormService.getPerson(this.personData).then(data => {
      //     loader.style.display = "none";
      //     this.generateListView(data);
      //   });
      //   break;

      default:
        this.clildFormService.getPerson(this.personData).then((data) => {
          loader.style.display = "none";
          this.generateListView(data);
        });
    }
  }

  getSortColumns(ev) {
    let filtered: any[] = [];
    for (let i = 0; i < this.sortcolumnDropdownList.length; i++) {
      let country = this.sortcolumnDropdownList[i].label;
      if (country.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filtered = filtered;
  }

  SortChanged(sortOrder) {
    this.sortingList = true;
    this.sortingEnable = true;
    this.sortOrder = sortOrder;
    if (
      this.sortColumn !== null &&
      this.sortColumn !== undefined &&
      this.sortOrder !== null
    ) {
      if (this.sortOrder !== "no sort") {
        this.personData["sort"] = {
          column: this.sortColumn,
          mode: this.sortOrder,
        };
        this.getPerson(this.initial, this.end);
      } else if (this.sortOrder == "no sort") {
        this.sortColumn = null;
        this.sortOrder = null;
        delete this.personData["sort"];
        this.getPerson(this.initial, this.end);
      }
    }
  }

  applyFilter(event) {
    this.personData = event;
    this.getPerson(1, 100);
  }

  reset(event) {
    this.personData = event;
    this.getPerson(1, 100);
  }

  /** Based on the referral type the referral form view will be determined */
  onRowSelected(event) {
    // if (event.data.isAllow === false) {
    //   swal("Info", "You are not authorized to access. Please contact your administrator.", "info")
    // }

    // else
    if (
      this.router.url.includes("/reports/school/attending-school") ||
      this.router.url.includes("/reports/school/home-school")
    ) {
      return window.open(
        window.location.origin +
          "/reports/client/details?clientId=" +
          event.data.clientID,
        "_blank",
        "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
      );
    }
    if (
      this.router.url.includes(
        "/provider/opencard/In-home-family-members/adults/view"
      )
    ) {
      this.isComponent = true; // Open for existing provider adult/child records
    }
    if (
      this.router.url.includes(
        "/provider/opencard/In-home-family-members/children/view"
      )
    ) {
      this.isComponent = true;
    }
    {
      console.log("Master", this.master, this.navigateTo);
      if (this.master == "placementHistory" && event.data) {
        this._localValues.placementHistoryListSelectData = event.data;
      }
      this._localValues.previousClientId = localStorage.getItem("clientId");
      if (this.master == "fpBillableCaseActivity") {
        this.isSelectedBillableCaseactivityIdsCaseactivityID =
          this.agGrid.api.getSelectedRows()[0][this.columnToSorted];
        this.isCaseActivityModal = true;
      }
      if (this.master === "recruitment-referral") {
        // this._opencards.getRecuritmentReferralId({ CMSPDFDocID: event.data[this.columnToSorted] });
        return window.open(
          `${environment.uri}:8081/loadDocument/${
            event.data[this.columnToSorted]
          }`,
          "popup",
          "width=900,height=900,toolbar=no,titlebar=no"
        );
      }
      if (this.agGrid.api.getFocusedCell().column.getColId() == "Actions") {
        this.selectedRowId =
          this.agGrid.api.getSelectedRows()[0][this.columnToSorted];
        this.getListViewInfomation();
        return (this.isMoreOptions = true);
      } else if (
        this.agGrid.api.getFocusedCell().column.getColId() == "Jump to tree"
      ) {
        console.log(
          "Selected columns",
          (this.selectedRowId = this.agGrid.api.getSelectedRows())
        );
        this.selectedClientId =
          this._activateRoute.snapshot.queryParamMap.get("clientId");
        const loader = document.getElementById(
          "loading-overlay"
        ) as HTMLElement;
        let reqOfOpencards = {
          openCard: "cases",
          beginPagination: this.initial,
          endPagination: this.end,
          sort: {
            column: this.columnToSorted,
            mode: "desc",
          },
        };
        this._opencards
          .listViewOfOpencardsByClient(reqOfOpencards, this.selectedClientId)
          .then((data) => {
            loader.style.display = "none";
            this.generateListView(data);
            localStorage.setItem(
              "clientId",
              this._localValues.previousClientId
            );
          });
        return this.router.navigate(["/reports/opencards/list/client/case"], {
          queryParamsHandling: "preserve",
        });
      } else {
        this.isMoreOptions = false;
      }
      let clientID,
        encryptKey = this._opencards.getHasKey(),
        encryptedData: any,
        url: any;
      let currentURLCheck = this.router.url,
        currentURL: string;
      if (currentURLCheck.includes("?")) {
        currentURL = this.router.url.split("?")[0];
      } else {
        currentURL = this.router.url;
      }
      clientID = event.data[this.columnToSorted];
      encryptedData = clientID + encryptKey;
      switch (currentURL) {
        case "/reintegration/referral/opencard/placement/view":
          localStorage.setItem(
            "placementID",
            event.data["placementID"] + this._opencards.getHasKey()
          );
          localStorage.setItem(
            "placementDetailId",
            event.data["placementDetailID"]
          );
          return this.router.navigate(
            ["/reintegration/referral/opencard/placement/detail"],
            {
              queryParams: {
                p_id: event.data["placementID"],
                pd_id: event.data["placementDetailID"],
              },
              queryParamsHandling: "merge",
            }
          );
          break;
        case "/reports/client":
          this.clientInfo = event.data["ClientNameLastFirst"];
          this._localValues.ClientNameLastFirst =
            event.data["ClientNameLastFirst"];
          this._localValues.clientChanges = true;
          localStorage.setItem("clientId", encryptedData);
          localStorage.setItem(
            "clientName",
            event.data["LastName"] + " " + event.data["FirstName"]
          );
          this.clildFormService.storeId(clientID);
          break;
        case "/csClientList":
          console.log();
          localStorage.setItem("clientId", encryptedData);
          break;
        case "/cs_claim_payee":
          localStorage.setItem("clientID", encryptedData);
          break;
        case "/reports/providerMember":
          localStorage.setItem("providerMemberId", encryptedData);
          localStorage.setItem(
            "providerID",
            event.data["providerID"] + this._opencards.getHasKey()
          );
          break;
        case "/reports/opencards/list/client/case":
          localStorage.setItem(
            "referralId",
            event.data["referralID"] + this._opencards.getHasKey()
          );
          if (
            event.data["ReferralType"] == "NC-FCH" ||
            event.data["ReferralType"] == "NC-MHR"
          ) {
            this._localValues.isPlacementNewValidationSet = true;
          } else {
            this._localValues.isPlacementNewValidationSet = false;
          }
          // this.clientInfo = event.data['LastName'] + ', ' + event.data['FirstName'];

          this._opencards.getHasKey();
          if (event.data["ReferralType"] == "NC-OPS") {
            let id = 9 + encryptKey;
            localStorage.setItem("referralTypeId", id.toString());
            this._opencards.setOtherRefDetails({
              referralName: "NC-OPS",
            });
          }
          if (event.data["ReferralType"] == "FI") {
            let id = 2 + encryptKey;
            localStorage.setItem("referralTypeId", id.toString());
            this._opencards.setOtherRefDetails({
              referralName: "FI",
            });
          }
          if (event.data["ReferralType"] == "NC-FI") {
            let id = 5 + encryptKey;
            localStorage.setItem("referralTypeId", id.toString());
          }
          if (event.data["ReferralType"] == "NC-RFC") {
            let id = 7 + encryptKey;
            localStorage.setItem("referralTypeId", id.toString());
            return this.router.navigate(["/reports/nc-rfc/detail"], {
              queryParams: {
                ref_id: event.data[this.columnToSorted],
                ref_type: 7,
              },
              queryParamsHandling: "merge",
            });
          }

          if (event.data["ReferralType"] == "BH OK") {
            let id = 15 + encryptKey;
            localStorage.setItem("referralTypeId", id.toString());
            localStorage.setItem("referralId", encryptedData);
            return this.router.navigate(["/bh-ok/detail"], {
              queryParamsHandling: "preserve",
            });
          }
          if (event.data["ReferralType"] == "NC-MHR") {
            let id = 11 + encryptKey;
            localStorage.setItem("referralTypeId", id.toString());
            localStorage.setItem("referralId", encryptedData);
            this.clildFormService.storeId(event.data[this.columnToSorted]);
            return this.router.navigate(["/nc-mhr/detail"], {
              queryParamsHandling: "preserve",
            });
          }
          if (event.data["ReferralType"] == "NC-HS") {
            let id = 8 + encryptKey;
            localStorage.setItem("referralTypeId", id.toString());
            localStorage.setItem("referralId", encryptedData);
            this.clildFormService.storeId(event.data[this.columnToSorted]);
            return this.router.navigate(["/nc-hs/detail"], {
              queryParamsHandling: "preserve",
            });
          }
          if (event.data["ReferralType"] == "SUB-RFC") {
            let id = 20 + encryptKey;
            localStorage.setItem("referralTypeId", id.toString());
            localStorage.setItem("referralId", encryptedData);
            this.clildFormService.storeId(event.data[this.columnToSorted]);
            return this.router.navigate(["/sub-rfc/detail"], {
              queryParamsHandling: "preserve",
            });
          }
          if (event.data["ReferralType"] == "PRTF") {
            let id = 14 + encryptKey;
            localStorage.setItem("referralTypeId", id.toString());
            this._opencards.setOtherRefDetails({
              referralName: "PRTF",
            });
            this.isPRTF = true;
            console.log("From prtf comp", this.prtfComponent.isEditClient);
            this.prtfComponent.onGetReferralByID(event.data);
            return;
          }

          localStorage.setItem("facts", event.data["Facts"]);
        case "/reports/all/case":
          localStorage.setItem("referralId", encryptedData);
          localStorage.setItem("referralbeginDate", event.data["BeginDate"]);

          if (
            event.data["ReferralType"] == "NC-FCH" ||
            event.data["ReferralType"] == "NC-MHR"
          ) {
            this._localValues.isPlacementNewValidationSet = true;
          } else {
            this._localValues.isPlacementNewValidationSet = false;
          }

          if (event.data["ReferralType"] == "FC") {
            let id = 1 + encryptKey; // 2 is referral type id
            localStorage.setItem("referralTypeId", id.toString());
            this._opencards.setOtherRefDetails({
              isFpReferral: false,
              referralName: "FC",
            });
            return this.router.navigate(["/reintegration/referral/detail"], {
              queryParams: {
                ref_id: event.data[this.columnToSorted],
                ref_type: 1,
              },
              queryParamsHandling: "merge",
            });
          }
          if (event.data["ReferralType"] == "NC-OPS") {
            this._opencards.setOtherRefDetails({
              isFpReferral: false,
              referralName: "NC-OPS",
            });
            return this.router.navigate(["/reports/referral/nc-ops/detail"], {
              queryParams: {
                ref_id: event.data[this.columnToSorted],
                ref_type: 9,
              },
              queryParamsHandling: "merge",
            });
          }
          if (event.data["ReferralType"] == "FI") {
            this._opencards.setOtherRefDetails({
              isFpReferral: true,
              referralName: "FI",
            });
          }
          if (event.data["ReferralType"] == "JJFC") {
            let id = 17 + encryptKey; // 2 is referral type id
            localStorage.setItem("referralTypeId", id.toString());
            this._opencards.setOtherRefDetails({
              isFpReferral: false,
              referralName: "JJFC",
            });
          }
          if (event.data["ReferralType"] == "NC-FI") {
            this._opencards.setOtherRefDetails({
              isFpReferral: false,
              referralName: "NC-FI",
            });
          }
          if (event.data["ReferralType"] == "NC-FCH") {
            let id = 4 + encryptKey; // 2 is referral type id
            localStorage.setItem("referralTypeId", id.toString());
            this._opencards.setOtherRefDetails({
              isFpReferral: false,
              referralName: "NC-FCH",
            });
            return this.router.navigate(["/reports/nc-fch/detail"], {
              queryParams: {
                ref_id: event.data[this.columnToSorted],
                ref_type: 4,
              },
              queryParamsHandling: "merge",
            });
          }
          if (event.data["ReferralType"] == "NC-RFC") {
            this._opencards.setOtherRefDetails({
              isFpReferral: false,
              referralName: "NC-RFC",
            });
          }

          break;
        case "/reports/medication-allergies/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("clientMedicationID", encryptedData);
          break;
        case "/reports/all/medication":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("medicationId", encryptedData);
          break;
        case "/reports/allergies/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("allergiesId", encryptedData);
          break;
        case "/reports/client-strength/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("strengthId", encryptedData);
          break;
        case "/reports/thirdparty/liability/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("tplId", encryptedData);
          break;
        case "/reports/referral/family-preservation/phase":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("phaseId", encryptedData);
          break;
        case "/claims/list/view":
          var client_Id = this.agGrid.api.getSelectedRows()[0]["clientID"];
          localStorage.setItem(
            "clientId",
            client_Id + this._opencards.getHasKey()
          );
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("claimId", event.data.claimID);
          break;
        case "/claims/list/direct/auth/list":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("claimId", event.data.claimID);
          break;
        case "/claims/list/other/service/list":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("authId", event.data.authorizationID);
          break;
        case "/claims/list/hardgoods/list":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("authId", event.data.authorizationID);
          break;
        case "/claims/list/opencard/claim":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("authId", event.data.authorizationID);
          break;
        case "/reintegration/referral/service/opencard/claim":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem(
            "claimID",
            event.data.claimID + this._opencards.getHasKey()
          );
          break;
        case "/reintegration/referral/service/other/service/detail":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("authId", event.data.authorizationID);
          break;
        case "/reintegration/referral/service/authorization/summary":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("authId", event.data.AuthorizationID);
          break;
        case "/reintegration/referral/opencard/adoption/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("adoptionId", encryptedData);
          break;
        case "/reintegration/referral/service/opencard/claim/authorizationSummary":
          localStorage.setItem("claimId", event.data.claimID);
          localStorage.setItem(
            "authorizationId",
            event.data.authorizationID + this._opencards.getHasKey()
          );
          localStorage.setItem(
            "claimID",
            event.data.claimID + this._opencards.getHasKey()
          );
          break;
        case "/reintegration/referral/opencard/school/eeispf/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          this.clildFormService.setEsispfFormStatus(event.data.Name);
          break;
        case "/reports/siblings-in-out-home/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("sibilingsInoutHomeID", encryptedData);
          this._opencards.setSiblingName(event.data["Name"]);
          break;
        case "/reports/family-safety/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("familySafteyId", encryptedData);
          break;
        case "/reports/supervisory-staffing-form/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("ScannedDocumentID", encryptedData);
          break;
        case "/reports/referral/family-preservation/case-plan-goals/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("casePlanID", encryptedData);
          break;
        case "/reintegration/referral/opencard/case-plan-goals/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("casePlanID", encryptedData);
          break;
        case "/reports/referral/family-preservation/referral-events/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("referralEventID", encryptedData);
          break;
        case "/reintegration/referral/opencard/independent-living/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("independentLivingID", encryptedData);
          break;
        case "/reintegration/referral/opencard/assessments/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("assessmentID", encryptedData);
          break;
        case "/reports/referral/family-preservation/assessment/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("assessmentID", encryptedData);
          break;
        case "/reintegration/referral/opencard/move-permanency/permanency-form/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("permanencyEventID", encryptedData);
          break;
        case "/reintegration/referral/opencard/court-order/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("courtOrderedID", encryptedData);
          break;
        case "/reports/kansas/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("procodeID", event.data["procodeID"]);
          break;
        case "/reports/oklahoma/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("procodeID", event.data["procodeID"]);
          break;
        case "/reports/nebraska/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("procodeID", event.data["procodeID"]);
          break;
        case "/reports/provider/view":
        case "/reports/otherAgencyStaff/details/providers":
        case "/staff-opencards/recruitment-provider/view":
          localStorage.setItem(
            "providerID",
            event.data[this.columnToSorted] + encryptKey
          );
          this._localValues.currentProviderID = event.data[this.columnToSorted];
          break;
        case "/reintegration/referral/opencard/bis/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("bestInterestingStaffId", encryptedData);
          break;

        case "/reintegration/referral/opencard/monthly-reports/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("monthlyReportsId", encryptedData);
          break;

        case "/provider/opencard/family/contact/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem(
            "providerContactID",
            event.data[this.columnToSorted] + encryptKey
          );
          localStorage.setItem("familyProviderContactID", encryptedData);
          break;
        case "/provider/opencard/school/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem(
            "providerSchoolID",
            event.data[this.columnToSorted] + encryptKey
          );
          localStorage.setItem("providerSchoolId", encryptedData);

          break;

        case "/reports/client/profile":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("clientProfileID", encryptedData);
          break;

        case "/reports/court/case/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("courtCaseID", encryptedData);
          break;

        // case "/reports/thirdparty/liability/view":
        //   localStorage.setItem("clientTPLID", encryptedData);
        //   break;

        case "/reports/preventative-measurements/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("clientPreventativeMeasureID", encryptedData);
          break;

        case "/reports/opencards/list/client/critical-significant-unusual-incident/view":
        case "/reports/opencards/list/client/critical-significant-unusual-incident-RM/view":
        case "/provider/opencard/critical-incidents/view":
        case "/provider/opencard/critical-incidents-allinvolve/view":
        case "/provider/opencard/critical-incidents-rm/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("unusualIncidentID", encryptedData);
          break;

        case "/reports/referral/family-preservation/case-team/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("caseTeamID", encryptedData);
          break;

        case "/reports/extended-family/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("familyMemberReferralID", encryptedData);
          break;

        case "/reports/participants-therpy/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("therapyParticipantsID", encryptedData);
          break;

        case "/provider/opencard/license/view":
          this.clildFormService.storeId(event.data["providerLicenseID"]);
          localStorage.setItem(
            "providerLicenseID",
            event.data["providerLicenseID"] + encryptKey
          );
          break;

        case "/provider/opencard/license-exception/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem(
            "providerLicenseExceptionID",
            event.data[this.columnToSorted] + encryptKey
          );
          break;
        case "/provider/opencard/sponsor/view":
          localStorage.setItem(
            "providerSponsorID",
            event.data[this.columnToSorted] + encryptKey
          );
          break;
        case "/provider/opencard/provider-preferences/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem(
            "providerPreferenceID",
            event.data[this.columnToSorted] + encryptKey
          );
          break;
        case "/provider/opencard/training/view":
          localStorage.setItem(
            "providerTrainingID",
            event.data[this.columnToSorted] + encryptKey
          );
          break;

        case "/reports/referral/family-preservation/home-county/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("homeCountyID", encryptedData);
          break;

        case "/reports/referral/family-preservation/sfcs-office/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("SFAOfficeActivityID", encryptedData);
          break;

        case "/reports/referral/family-preservation/non-therapy-face-to-face/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          event.data["caseActivityID"] !== null
            ? (this._localValues.caseAcitivityID = event.data["caseActivityID"])
            : this.exit();
          localStorage.setItem("nonTherapyFaceToFaceID", encryptedData);
          break;

        case "/reports/referral/family-preservation/progress-notes/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("progressNoteID", encryptedData);
          break;

        case "/reports/referral/family-preservation/case-evaluations/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("evaluationID", encryptedData);
          break;

        case "/reports/referral/family-preservation/progress-note-diagnosis/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("progressNoteDiagnosisID", encryptedData);
          break;

        case "/reintegration/referral/opencard/bh-determination/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("BHDeterminationID", encryptedData);
          break;

        case "/reintegration/referral/opencard/health-record/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("healthExamID", encryptedData);
          break;

        case "/reintegration/referral/opencard/immunization/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("immunizationID", encryptedData);
          break;

        case "/reintegration/referral/opencard/kan-be-healthy/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("kanBeHealthyID", encryptedData);
          break;

        case "/reports/referral/family-preservation/kipp-pmto/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("kippID", encryptedData);
          break;

        // case "/reports/supervisory-staffing-form/view":
        //   this.clildFormService.storeId(event.data[this.columnToSorted]);
        //   localStorage.setItem("supervisoryStaffingID", encryptedData);
        //   break;

        case "/reintegration/referral/opencard/appointments/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("appointmentID", encryptedData);
          break;

        case "/reintegration/referral/opencard/case-evaluations/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("evaluationID", encryptedData);
          break;

        case "/reintegration/referral/opencard/case-file-activity/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("caseFileActivityID", encryptedData);
          break;

        case "/reintegration/referral/opencard/case-team/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("caseTeamID", encryptedData);
          break;

        case "/reintegration/referral/opencard/home-county/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("homeCountyID", encryptedData);
          break;

        case "/reintegration/referral/opencard/kipp/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("kippID", encryptedData);
          break;

        case "/reintegration/referral/opencard/waiver/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("waiverActivityID", encryptedData);
          break;

        case "/reintegration/referral/opencard/social-security-income/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("clientSSIID", encryptedData);
          break;

        case "/reintegration/referral/opencard/school/credit-tracking/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("creditTrackingID", encryptedData);
          break;

        case "/reintegration/referral/opencard/school/general-education/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("generalEducationID", encryptedData);
          break;

        case "/reintegration/referral/opencard/school/special-education/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("specialEducationID", encryptedData);
          break;

        case "/reintegration/referral/opencard/attending-school/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("clientSchoolID", encryptedData);
          break;

        case "/reintegration/referral/opencard/grade-level/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("clientGradeID", encryptedData);
          break;

        case "/reintegration/referral/opencard/school-release/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("schoolReleaseID", encryptedData);
          break;

        case "/reintegration/referral/opencard/home-school/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("homeSchoolID", encryptedData);
          break;
        case "/accessrights/view-role":
          localStorage.setItem(
            "roleID",
            event.data[this.columnToSorted] + encryptKey
          );
          break;
        case "/reports/referral/family-preservation/fis-members/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("clientReferralID", encryptedData);
          break;

        case "/reports/rfc-supervisory-staffing-form/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("supervisoryStaffingID", encryptedData);
          break;

        case "/provider/opencard/adoption/view":
          localStorage.setItem(
            "providerAdoptionID",
            event.data[this.columnToSorted] + encryptKey
          );
          localStorage.setItem(
            "providerAdoptionSpecialistID",
            event.data[this.columnToSorted] + encryptKey
          );
          break;

        case "/provider/opencard/adoption/identifierResource/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem(
            "identifiedResourceID",
            event.data[this.columnToSorted]
          );
          localStorage.setItem(
            "identifiedResourceReferralID",
            event.data["referralID"]
          );
          localStorage.setItem(
            "identifiedResourceProviderID",
            event.data["providerID"]
          );
          break;

        case "/provider/opencard/adoption/BIS/view":
          localStorage.setItem(
            "BestInterestStaffingID",
            event.data[this.columnToSorted] + encryptKey
          );
          break;

        case "/reintegration/referral/opencard/placement/view":
          localStorage.setItem(
            "placementID",
            event.data[this.columnToSorted] + encryptKey
          );
          this._localValues.currentPlacementDetailID =
            event.data["placementDetailID"];
          localStorage.setItem(
            "placementDetailId",
            event.data["placementDetailID"]
          );
          break;

        case "/reports/referral/family-preservation/case-activity/view":
        case "/reintegration/referral/opencard/case-activity/view":
          this._localValues.caseAcitivityID = event.data[this.columnToSorted];
          break;

        case "/provider/opencard/location/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("providerLocationID", encryptedData);
          break;

        case "/provider/opencard/In-home-family-members/pets/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("providerPetID", encryptedData);
          break;

        case "/provider/opencard/status/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("providerStatusID", encryptedData);
          break;

        case "/provider/opencard/office/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("SFAOfficeActivityID", encryptedData);
          break;

        case "/provider/opencard/staff/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("providerSFAStaffID", encryptedData);
          break;

        case "/provider/opencard/other-agency-staff/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("otherAgencyStaffID", encryptedData);
          break;

        case "/reintegration/referral/opencard/NC-FI-appointments/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("appointmentID", encryptedData);
          break;

        case "/reintegration/referral/opencard/placement/living-arrangement/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("livingArrangementID", encryptedData);
          break;

        case "/provider/opencard/authorization-summary/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("authId", event.data.authorizationID);
          break;

        case "/provider/opencard/living-arrangement/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("livingArrangementID", encryptedData);
          this._localValues.currentClientID = event.data.clientID;
          break;

        case "/reports/casaOfficer":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("casaOfficerID", encryptedData);
          break;

        case "/reports/communityMember":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("communityMemberID", encryptedData);
          break;

        case "/reports/school/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("personTypeSchoolID", encryptedData);
          break;

        case "/reports/provider-sponser/sfcs-contract/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          break;

        case "/reports/provider-sponser/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("sponsorID", encryptedData);
          break;
        case "/reports/dhsOffice/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("personTypeDhsOfficeID", encryptedData);
          break;

        case "/reports/dhsOffice/dhs-staff":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("personTypeDhsStaffID", encryptedData);
          break;

        case "/reports/dhsStaff":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem(
            "personTypeDhsStaffid",
            event.data["dhsStaffID"]
          );
          break;

        case "/reports/provider-sponser/placement-authorization/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("authId", event.data.authorizationID);
          break;

        case "/reports/provider-sponser/placement-authorization/claim/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("claimId", event.data.claimID);
          break;

        case "/reports/judge":
          this.clildFormService.storeId(event.data.judgeID);
          localStorage.setItem("judgeID", event.data.judgeID);
          break;

        case "/reports/guardianAdl":
          this.clildFormService.storeId(event.data.galID);
          localStorage.setItem("galID", event.data.galID);
          break;

        case "/reports/crbOfficer":
          this.clildFormService.storeId(event.data["cRBCoordinatorID"]);
          localStorage.setItem(
            "cRBCoordinatorID",
            event.data["cRBCoordinatorID"]
          );
          break;

        case "/reports/dcf":
          this.clildFormService.storeId(event.data["srsstaffID"]);
          localStorage.setItem("dcfStaffID", event.data["srsstaffID"]);
          break;

        case "/reports/customer-care/view":
          this.clildFormService.storeId(event.data["custCarePersonID"]);
          break;
        case "/reports/csoStaff":
          localStorage.setItem("CSOStaffID", event.data["CSOStaffID"]);
          this.clildFormService.storeId(event.data["CSOStaffID"]);
          break;
        case "/reports/dhhsStaff":
          localStorage.setItem("DhhsStaffId", event.data["dhhsstaffID"]);
          this.clildFormService.storeId(event.data["dhhsstaffID"]);
          break;
        case "/reports/familyMember":
          localStorage.setItem("FamilyMemberID", event.data["familyMemberID"]);
          this.clildFormService.storeId(event.data["familyMemberID"]);
          break;
        case "/reintegration/referral/opencard/identified-resource/view":
          localStorage.setItem(
            "identifiedResourceProviderID",
            event.data["providerID"]
          );
          break;
        case "/team-leader/view":
          localStorage.setItem(
            "staffTeamLeaderID",
            event.data["staffTeamLeaderID"]
          );
          this.clildFormService.storeId(event.data["staffTeamLeaderID"]);
          break;
        case "/compliance-tech/view":
          this.clildFormService.storeId(event.data["staffComplianceTechID"]);
          break;
        case "/reports/staff":
          localStorage.setItem("staff_ID", event.data["StaffID"]);
          localStorage.setItem("StaffFormID", event.data["StaffID"]);
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          this.clildFormService.storeId(event.data["staffComplianceTechID"]);
        case "/staff-opencards/sfm-office/primary-office/view":
        case "/staff-opencards/sfm-office/secondary-office/view":
          this.clildFormService.storeId(event.data["staffSFAOfficeID"]);
          break;
        case "/reports/payee/view":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("payeeID", event.data["payeeID"]);
          break;
        case "/csPayee":
          this.clildFormService.storeId(event.data[this.columnToSorted]);
          localStorage.setItem("payeeID", event.data["payeeID"]);
          break;
        case "/claims/list/cs-claim-list":
          let clientId = this.agGrid.api.getSelectedRows()[0]["clientID"];
          this.selectedClientId = clientId;
          localStorage.setItem(
            "clientId",
            clientId + this._opencards.getHasKey()
          );
          break;
        case "/reports/opencards/list/client/case":
          localStorage.setItem(
            "referralId",
            event.data["referralID"] + this._opencards.getHasKey()
          );
          break;
        default:
          this._referralView.getClientReferralRelatedDetails(
            event.data[this.columnToSorted],
            event.data.FirstName + " " + event.data.LastName
          );
          this.clildFormService.storeId(event.data[this.columnToSorted]);
      }
      if (this.master === "client") {
        return this.router.navigate(["/reports/client/details"], {
          queryParams: { clientId: event.data["ClientID"] },
          queryParamsHandling: "merge",
        });
      }
      if (this.master === "provider_autho_claim") {
        localStorage.setItem(
          "claimID",
          this.agGrid.api.getSelectedRows()[0]["claimID"] +
            this._opencards.getHasKey()
        );
        this.router.navigate(["/provider/provider_AuthorizationClaim"], {
          queryParamsHandling: "preserve",
        });
      }
      if (this.master === "payee_autho_claim") {
        localStorage.setItem(
          "claimID",
          this.agGrid.api.getSelectedRows()[0]["claimID"] +
            this._opencards.getHasKey()
        );
        this.router.navigate(["/payee/payee_AuthorizationClaim"], {
          queryParamsHandling: "preserve",
        });
      }
      if (
        currentURL.includes(
          "reintegration/referral/opencard/placement/placementEvent/view"
        )
      ) {
        localStorage.setItem(
          "placementDetailId",
          event.data["placementDetailID"]
        );
      }
      if (
        this.router.url.includes(
          "/reintegration/referral/opencard/move-permanency/move-form/view"
        )
      ) {
        localStorage.setItem("moveEventID", event.data["moveEventID"]);
      }
      localStorage.setItem("contactType", event.data.contactType);

      if (event.data.scannedDocumentID) {
        localStorage.setItem("ScannedDocumentID", event.data.scannedDocumentID);
      }
      if (event.data.ScannedDocumentID) {
        localStorage.setItem("ScannedDocumentID", event.data.ScannedDocumentID);
      }
      if (event.data.formName) {
        this.setCaseActivityName(event.data.formName);
      }
      if (event.data.name) {
        localStorage.setItem("behaviorFormName", event.data.name);
        // let behaviorForm = localStorage.getItem('behaviorFormName');
        // this.setAsqName(event.data.name);
      }
      if (
        event.data.ReferralType === "NC-OPS" &&
        !this.router.url.includes("/reports/court/case/view")
      ) {
        this.clildFormService.storeId(event.data[this.columnToSorted]);
        this.router.navigate(["/reports/referral/nc-ops/detail"], {
          queryParamsHandling: "preserve",
        });
      }
      if (event.data.ReferralType === "NC-RFC") {
        this.clildFormService.storeId(event.data[this.columnToSorted]);
        return this.router.navigate(["/reports/nc-rfc/detail"], {
          queryParamsHandling: "preserve",
        });
      }

      if (
        this.master === "personTypeCardAttendingSchool" ||
        this.master === "personTypeCardHomeSchool"
      ) {
        this.clildFormService.storeId(
          parseInt(localStorage.getItem("personTypeSchoolID")) -
            this._opencards.getHasKey()
        );
      }

      if (this.master === "provider-adults") {
        this.isProviderMemberAdult = true;
        localStorage.setItem("providerMemberId", encryptedData);
      }
      if (this.master === "provider-child") {
        this.isProviderMemberChildren = true;
        localStorage.setItem("providerMemberId", encryptedData);
      }

      /**Living arrangement authorizations flow */
      if (this.master === "AuthorizationTempList") {
        return this.router.navigate(
          ["/reintegration/referral/placement-authorizations/detail"],
          {
            queryParams: {
              module: this.queryParam,
              sub: "authorization",
              current_recId: event.data[this.columnToSorted],
              action: "edit",
            },
            queryParamsHandling: "merge",
          }
        );
      }
      /** Add placement detail id into params
       * 'p_id' defines placement id
       * 'pd_id' defines placement detail id*/
      if (this.master === "placement") {
        return this.router.navigate(
          ["/reintegration/referral/opencard/placement/detail"],
          {
            queryParams: {
              p_id: event.data[this.columnToSorted],
              pd_id: event.data["placementDetailID"],
              action: "edit",
              module: "placement",
              sub: "",
            },
            queryParamsHandling: "merge",
          }
        );
      }
      /**Living arrangement navigations */
      if (this.master === "livingArrangement") {
        return this.router.navigate(
          [
            "/reintegration/referral/opencard/placement/living-arrangement/detail",
          ],
          {
            queryParams: {
              li_id: event.data[this.columnToSorted],
              action: "edit",
            },
            queryParamsHandling: "merge",
          }
        );
      }

      /**Placement Event navigations */
      if (this.master === "placementEvent") {
        this.eventPlacementDetailId = event.data["placementDetailID"];
        localStorage.setItem("placementDetailID", this.eventPlacementDetailId);
        return this.router.navigate(
          ["/reintegration/referral/opencard/placement/placementEvent/detail"],
          {
            queryParams: {
              pd_id: event.data["placementDetailID"],
              sub: "placement-event",
            },
            queryParamsHandling: "merge",
          }
        );
      }
      if (this.master === "IEP") {
        return this.router.navigate(["/school_IEP_mod/details"], {
          queryParams: {
            eduInfoID: event.data["educationalInformationID"],
          },
          queryParamsHandling: "merge",
        });
      }
      if (this.master === "AuthorizationTempClaimsList") {
        // localStorage.setItem('clientId', this.agGrid.api.getSelectedRows()[0]['clientID'] + this._opencards.getHasKey());
        localStorage.setItem(
          "authorizationId",
          this.agGrid.api.getSelectedRows()[0]["authorizationID"] +
            this._opencards.getHasKey()
        );
        this.router.navigate(["/auth-claim/detail"], {
          queryParams: { origin: "cards" },
          queryParamsHandling: "merge",
        });
      }
      /**Dayacre authorization navigations */
      if (this.master === "daycareAuthorizations") {
        return this.router.navigate(
          [
            "/reintegration/referral/opencard/placement/daycare-authorization/detail",
          ],
          {
            queryParams: { auth_id: event.data[this.columnToSorted] },
            queryParamsHandling: "merge",
          }
        );
      }
      /**Placement Referral */
      if (this.master === "placement-referral") {
        return this.router.navigate(
          ["/reintegration/referral/opencard/placement-referral/detail"],
          {
            queryParams: { pl_ref_id: event.data[this.columnToSorted] },
            queryParamsHandling: "merge",
          }
        );
      } else {
        if (this.master === "AuthorizationTempClaimsList") {
          // localStorage.setItem('clientId', this.agGrid.api.getSelectedRows()[0]['clientID'] + this._opencards.getHasKey());
          console.log(
            "this.agGrid.api.getSelectedRows()[0]['claimID']>>>>>>>",
            this.agGrid.api.getSelectedRows()[0]["claimID"]
          );
          localStorage.setItem(
            "claimID",
            this.agGrid.api.getSelectedRows()[0]["claimID"] +
              this._opencards.getHasKey()
          );
          this.router.navigate(["/auth-claim/details"], {
            queryParams: { origin: "cards" },
            queryParamsHandling: "merge",
          });
        } else {
          if (this.master === "staff-caseList") {
          } else {
            this.router.navigate([this.navigateTo], {
              queryParamsHandling: "preserve",
            });
          }
        }
      }

      if (this.master === "placementEventAuthorizationTempList") {
        return this.router.navigate(
          ["/reintegration/referral/placement-event-authorizations/detail"],
          {
            queryParams: {
              module: this.queryParam,
              base_recId: this.queryParam_2,
              pre_recId: this.queryParam_3,
              current_recId: event.data[this.columnToSorted],
            },
            queryParamsHandling: "merge",
          }
        );
      }

      /**Placement Plan navigations */
      if (this.master === "placementPlan") {
        this.planPlacementDetailId = event.data["PlacementPlanID"];

        localStorage.setItem(
          "planPlacementDetailId",
          this.planPlacementDetailId
        );
        return this.router.navigate(
          ["/reintegration/referral/opencard/placement/placementPlan/detail"],
          {
            queryParams: { pp_id: event.data["PlacementPlanID"] },
            queryParamsHandling: "merge",
          }
        );
      }

      /** Move form */
      if (this.master === "moveForm") {
        return this.router.navigate(
          ["/reintegration/referral/opencard/move-permanency/move-form/detail"],
          { queryParams: { module: "move-form" }, queryParamsHandling: "merge" }
        );
      }

      /** Recruitment */
      if (this.master === "recruitment") {
        return this.router.navigate(["/provider/opencard/recruitment/detail"], {
          queryParams: {
            module: "recruitment",
            ri_id: event.data[this.columnToSorted],
            action: "edit",
          },
          queryParamsHandling: "merge",
        });
      }

      /** Recruitment Inquiry*/
      if (this.master === "recruitmentInquiry") {
        localStorage.setItem(
          "recuritmentReferralId",
          event.data[this.columnToSorted]
        );
        return this.router.navigate(
          ["/provider/opencard/recruitment/inquiry/event/detail"],
          {
            queryParams: {
              module: "recruitment",
              ri_id: event.data[this.columnToSorted],
              action: "edit",
            },
            queryParamsHandling: "merge",
          }
        );
      }

      if (
        event.data.ReferralType === "NC-HS" &&
        !this.router.url.includes("/reports/court/case/view")
      ) {
        this.clildFormService.storeId(event.data[this.columnToSorted]);
        localStorage.setItem(
          "referralId",
          event.data[this.columnToSorted] + this._opencards.getHasKey()
        );
        this.router.navigate(["/nc-hs/detail"], {
          queryParamsHandling: "preserve",
        });
      }

      if (
        event.data.ReferralType === "JJFC" &&
        !this.router.url.includes("/reports/court/case/view")
      ) {
        this.clildFormService.storeId(event.data[this.columnToSorted]);
        localStorage.setItem(
          "referralId",
          event.data[this.columnToSorted] + this._opencards.getHasKey()
        );
        this.router.navigate(["/jjfc/detail"], {
          queryParamsHandling: "preserve",
        });
      }

      if (
        event.data.ReferralType === "NC-MHR" &&
        !this.router.url.includes("/reports/court/case/view")
      ) {
        this.clildFormService.storeId(event.data[this.columnToSorted]);
        localStorage.setItem(
          "referralId",
          event.data[this.columnToSorted] + this._opencards.getHasKey()
        );
        this.router.navigate(["/nc-mhr/detail"], {
          queryParamsHandling: "preserve",
        });
      }

      if (this.master === "authorizations-all") {
        localStorage.setItem(
          "clientId",
          this.agGrid.api.getSelectedRows()[0]["clientID"] +
            this._opencards.getHasKey()
        );
        localStorage.setItem(
          "authorizationId",
          this.agGrid.api.getSelectedRows()[0]["authorizationID"] +
            this._opencards.getHasKey()
        );
        this.router.navigate(
          ["/reintegration/referral/placement-event-authorizations/detail"],
          { queryParams: { origin: "cards" }, queryParamsHandling: "merge" }
        );
      }

      if (this.master === "provider-authorizations") {
        localStorage.setItem(
          "authorizationId",
          this.agGrid.api.getSelectedRows()[0]["authorizationID"] +
            this._opencards.getHasKey()
        );
        this.router.navigate(
          ["/reintegration/provider/providerAuthorization_detail"],
          { queryParamsHandling: "preserve" }
        );
      }
      if (this.master === "payee-authorizations") {
        localStorage.setItem(
          "authorizationId",
          this.agGrid.api.getSelectedRows()[0]["authorizationID"] +
            this._opencards.getHasKey()
        );
        this.router.navigate(
          ["/reintegration/payee/payeeAuthorization_detail"],
          { queryParamsHandling: "preserve" }
        );
      }
      if (this.master === "csClaim-payee") {
        localStorage.setItem(
          "auth_claimID",
          this.agGrid.api.getSelectedRows()[0]["claimID"] +
            this._opencards.getHasKey()
        );
        this.router.navigate(["/cs_claim_payee/claimDetail"], {
          queryParamsHandling: "preserve",
        });
      }
      if (this.master === "cs-provider") {
        localStorage.setItem(
          "providerID",
          this.agGrid.api.getSelectedRows()[0]["providerID"] +
            this._opencards.getHasKey()
        );
        this.router.navigate(["/csProvider/csProviderForm"], {
          queryParamsHandling: "preserve",
        });
      }
      if (this.master === "csClaimList") {
        localStorage.setItem(
          "auth_claimID",
          this.agGrid.api.getSelectedRows()[0]["claimID"] +
            this._opencards.getHasKey()
        );
        this.router.navigate(["/authinfo/claimList"], {
          queryParamsHandling: "preserve",
        });
      }
      if (this.master === "claim-provider") {
        localStorage.setItem(
          "auth_claimID",
          this.agGrid.api.getSelectedRows()[0]["claimID"] +
            this._opencards.getHasKey()
        );
        this.router.navigate(["/provider/claimProvider_claimList"], {
          queryParamsHandling: "preserve",
        });
      }

      if (this.master === "payeeSeciceClaimDirectAuthList") {
        localStorage.setItem(
          "auth_claimID",
          this.agGrid.api.getSelectedRows()[0]["claimID"] +
            this._opencards.getHasKey()
        );
      }
      if (this.master === "CS-PayeeDirectAuth") {
        localStorage.setItem(
          "auth_claimID",
          this.agGrid.api.getSelectedRows()[0]["claimID"] +
            this._opencards.getHasKey()
        );
        localStorage.setItem(
          "clientId",
          this.agGrid.api.getSelectedRows()[0]["clientID"] +
            this._opencards.getHasKey()
        );
      }
      if (this.master === "PayeeAuthorizationsSummary") {
        localStorage.setItem(
          "authorizationId",
          this.agGrid.api.getSelectedRows()[0]["authorizationID"] +
            this._opencards.getHasKey()
        );
      }
      if (this.master === "PayeeAuthorizationClaimsList") {
        localStorage.setItem(
          "claimID",
          this.agGrid.api.getSelectedRows()[0]["claimID"] +
            this._opencards.getHasKey()
        );
      }
      if (this.master === "PayeeServiceClaimHardGoods") {
        localStorage.setItem(
          "authorizationId",
          this.agGrid.api.getSelectedRows()[0]["authorizationID"] +
            this._opencards.getHasKey()
        );
      }
      if (this.master === "CS-PayeeAuth") {
        localStorage.setItem(
          "authorizationId",
          this.agGrid.api.getSelectedRows()[0]["authorizationID"] +
            this._opencards.getHasKey()
        );
      }
      if (this.master === "PayeeServiceClaimOtherService") {
        localStorage.setItem(
          "authorizationId",
          this.agGrid.api.getSelectedRows()[0]["authorizationID"] +
            this._opencards.getHasKey()
        );
      }
      if (this.master === "PayeeServiceHardAuthorizationClaimsList") {
        localStorage.setItem(
          "claimID",
          this.agGrid.api.getSelectedRows()[0]["claimID"] +
            this._opencards.getHasKey()
        );
      }
      if (this.master === "PayeeServiceOtherServiceAuthorizationClaimsList") {
        localStorage.setItem(
          "claimID",
          this.agGrid.api.getSelectedRows()[0]["claimID"] +
            this._opencards.getHasKey()
        );
      }
      if (this.master === "staff-provider") {
        localStorage.setItem(
          "providerID",
          event.data[this.columnToSorted] + encryptKey
        );
      }
    }
    //navigate alongwith query parameter
    return this.navigateFormViewWithQueryParams(event.data);
  }

  exportToExcel() {
    this.exportService.exportAsExcelFile(this.reportsViewList, "Client");
  }

  exportAsCsv() {
    this.exportService.exportAsCSVFile(this.reportsViewList, "Client", true);
  }

  exportAll(ex: any) {
    let reportName;
    if (this.router.url.includes("/reports/client")) {
      reportName = "Manage Exports - Client Table";
      console.log("reportName", reportName);
      this.exportAllService.getExportAll(
        this.exportQuery,
        isNullOrUndefined(localStorage.getItem("UserId"))
          ? 5130
          : localStorage.getItem("UserId"),
        reportName,
        ex
      );
    } else if (
      this.router.url.includes("/reports/fp-billable-case-activity/view")
    ) {
      let selectedRows = this.agGrid.api.getSelectedRows();
      let listOfCaseactivities = [];
      selectedRows.filter((item: any) => {
        listOfCaseactivities.push(item.CaseActivityID);
      });

      if (listOfCaseactivities.length === 0) {
        var exportReq = {
          referralID: this.REF_ID,
          isExport: true,
          fileName:
            "Billable Case Activity - " +
            moment(Date.now()).format("MM-DD-YYYY"),
          caseActivityID: null,
        };
        this._opencards
          .getListFPBillabelCaseActivity(exportReq)
          .then((data) => {
            if (data.filePath) {
              window.location.href = data.filePath;
            }
          });
      } else {
        var export_Req = {
          referralID: null,
          isExport: true,
          caseActivityID: listOfCaseactivities.join(),
          fileName:
            "Billable Case Activity - " +
            moment(Date.now()).format("MM-DD-YYYY"),
        };
        this._opencards
          .getListFPBillabelCaseActivity(export_Req)
          .then((data) => {
            if (data.filePath) {
              window.location.href = data.filePath;
            }
          });
      }
    } else if (this.router.url.includes("/reports/staff/caseList")) {
      this.requestObject = {
        staffID: parseInt(localStorage.getItem("staff_ID")),
        isExport: true,
        fileName: "Staff Case - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getCaseByPerson(this.requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/reports/staff/staffProvider")) {
      let requestObject = {
        staffID: parseInt(localStorage.getItem("staff_ID")),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Staff Provider - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getProviderByPerson(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/staff-opencards/recruitment-provider/view")
    ) {
      let requestObject = {
        staffID: parseInt(localStorage.getItem("staff_ID")),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Staff Recruitment Provider - " +
          moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards
        .listOfStaffRecruitmentProvider(requestObject)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (this.router.url.includes("/provider/opencard/training/view")) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        fileName:
          "Provider Training- " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.exportProviderTraining(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/reintegration/referral/opencard/adoption/view")
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Adoption - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAdoption(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/appointments/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Appointment - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllAppointments(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/assessments/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        clientID: this.CLIENT_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Assessment - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getAssessementsByClient(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/behavioral-assessment/view"
      )
    ) {
      let requestObject = {
        assessmentID: parseInt(localStorage.getItem("assessmentID")),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Behavioral Assessment - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getBehavioralList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/case-evaluations/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Case Evaluation - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getcaseEvolutionList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/case-activity/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        clientID: this.CLIENT_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Case Activity - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getCaseActivityList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/case-file-activity/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Case File Activity - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listCaseFileActivity(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/case-plan-goals/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Case Plan Goals - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getCasePlanGoalsList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/case-team/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Case Team - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listCaseTeam(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/court-order/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Court Order - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllCourtOrder(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/home-county/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Home Country - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getHomeCountyList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/independent-living/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Independent Living - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listIndependentLiving(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/reintegration/referral/opencard/kipp/view")
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Kipp - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listKipp(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reports/attachment-document/rfc/monthly-reports"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Monthly Reports - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllMonthlyReports(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/placement-referral/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Placement Referral  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getPlacementReferralList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/placement/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Placement  " + moment(Date.now()).format("DD-MM-YYYY"),
      };
      this._opencards.listOfPlacements(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/sfcs-office/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "SFCS Office  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getSFCSOfficeList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/social-security-income/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Social Security Income - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllSSI(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/reports/supervisory-staffing-form/view")
    ) {
      let requestObject = {
        supervisoryStaffingID: parseInt(
          localStorage.getItem("supervisoryStaffingID")
        ),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Supervisory Staffing - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards
        .getListAllSupervisoryStaffing(requestObject)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (
      this.router.url.includes("/reintegration/referral/opencard/adoption/view")
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Adoption Event - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllAdoptionEvent(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/reintegration/referral/opencard/bis/view")
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Best Interest Staffing  - " +
          moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listBIS(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/identified-resource/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Identified Resource  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listIR(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/reports/extended-family/view")) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Extended Family  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getExtendedFamilyList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/reports/siblings-in-out-home/view")) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Siblings In Out Home  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getExtendedFamilyList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/bh-determination/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "BH Determination  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllBhDetermination(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/health-record/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Health Record  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllHealthRecord(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/immunization/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Immunization  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listImmunization(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/kan-be-healthy/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Kan Be Healthy  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllKanBeHealthy(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/reintegration/referral/opencard/waiver/view")
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Waiver  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listWaiver(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/move-permanency/move-form/view"
      )
    ) {
      let requestObject = {
        referralID: parseInt(localStorage.getItem("mreferralId")),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Move Form  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listMoveForm(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/move-permanency/permanency-form/view"
      )
    ) {
      let requestObject = {
        permanencyEventID: parseInt(localStorage.getItem("permanencyEventID")),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Permanency Form  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listPermanency(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/placement/placementEvent/view"
      )
    ) {
      let requestObject = {
        placementID: this.currentPlacementID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Placement Event  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getPlacementEventList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/placement/living-arrangement/view"
      )
    ) {
      let requestObject = {
        placementID: this.PLACEMENT_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Living Arrangement  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getLivingArrangementList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/placement/placementPlan/detail"
      )
    ) {
      let requestObject = {
        placementID: this.currentPlacementID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Placement Plan  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getPlacementPlanList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/placement/daycare-authorization/detail"
      )
    ) {
      let requestObject = {
        placementID: this.currentPlacementID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "DayCare Authorization  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listDayCareAuthorizations(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/school/attending-school/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Attending school  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards
        .personTypeCardAttendingSchoolListView(requestObject)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/school/credit-tracking/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Credit Tracking  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listCreditTracking(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/school/eeispf/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Education Enrollment  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listEducationEnrollment(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/school/general-education/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "General Education  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listGeneralEducation(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/grade-level/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Client Grade  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllGradeLevel(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/home-county/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Home Country  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getHomeCountyList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/school-release/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "School Release  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllSchoolRelease(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/school/special-education/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Special Education  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listSpecialEducation(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/claims/list/direct/auth/list")) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Direct Authorization  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.directAuthListView(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/claims/list/other/service/list")) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Other services  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.otherServiceListView(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/claims/list/hardgoods/list")) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Hard Goods  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.otherServiceListView(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/reports/all/authorizations")) {
      let requestObject = {
        authorizationID: parseInt(localStorage.getItem("authId")),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Authorization  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getListOfAuthorizations(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/claims/list/view")) {
      let requestObject = {
        claimID: parseInt(localStorage.getItem("claimId")),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Claims  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.claimListView(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reports/referral/family-preservation/progress-notes/view"
      )
    ) {
      let requestObject = {
        progressNoteID: parseInt(localStorage.getItem("progressNoteID")),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Progress Note  - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllProgressNote(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reports/referral/family-preservation/progress-note-diagnosis/view"
      )
    ) {
      let requestObject = {
        progressNoteDiagnosisID: parseInt(
          localStorage.getItem("progressNoteDiagnosisID")
        ),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Progress Note Diagnosis - " +
          moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listALLPNDiagnosis(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/reports/kansas/view")) {
      let requestObject = {
        procodeID: parseInt(localStorage.getItem("procodeID")),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        state: "kansas",
        fileName: "Kansas - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getKansas(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/reports/oklahoma/view")) {
      let requestObject = {
        procodeID: parseInt(localStorage.getItem("procodeID")),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        state: "oklahoma",
        fileName: "Oklahoma - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getOklahoma(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/reports/nebraska/view")) {
      let requestObject = {
        procodeID: parseInt(localStorage.getItem("procodeID")),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        state: "nebraska",
        fileName: "Nebraska - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getNebraska(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("provider/opencard/family/contact/view")
    ) {
      let request = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        isExport: true,
        fileName: `${moment().format("MM-DD-YYYY")} Family conacts`,
      };
      this._opencards
        .providerFamilyContactExport(request)
        .then((data) =>
          data.filePath ? (window.location.href = data.filePath) : null
        );
    } else if (
      this.router.url.includes("/reports/opencards/list/client/case")
    ) {
      let requestObject = {
        openCard: "cases",
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Cases - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      requestObject["userId"] =
        parseInt(localStorage.getItem("UserId")) || 4620;
      this._opencards
        .listViewOfOpencardsByClient(requestObject, this.selectedClientId)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (
      this.router.url.includes("/provider/opencard/placement-history/view")
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Placement History " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getPlacementHistoryList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/adoption-event/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Adoption Event - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllAdoptionEvent(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/csClientList")) {
      let requestObject = {
        beginPagination: 1,
        endPagination: 100,
        filter: "client",
        "group by": "All",
        isExport: true,
        fileName: "CS Client - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this.clildFormService.getPerson(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/service/authorization/summary"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Authorization Summary - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.otherServiceListView(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/monthly-reports/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Monthly Report - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllMonthlyReports(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/move-permanency/move-form/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Move Form - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listMoveForm(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/move-permanency/permanency-form/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Move Permanency - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listPermanency(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/reintegration/referral/opencard/home-school/view"
      )
    ) {
      let requestObject = {
        referralID: this.REF_ID,
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Home School - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listAllHomeschool(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/reports/rfc-supervisory-staffing-form/view")
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Supervisory Staffing - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards
        .getListAllSupervisoryStaffingRfc(requestObject)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (
      this.router.url.includes(
        "/reports/supervisory-staffing-for-superviosrs/view"
      )
    ) {
      let requestObject = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Supervisory Staffing for Supervisors - " +
          moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards
        .getListAllSupervisoryStaffingRfc(requestObject)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (this.router.url.includes("/provider/opencard/adoption/view")) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Provider Adoption - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listProviderAdoption(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/provider/opencard/adoption/BIS/view")
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Best Interest Staffing - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.listBIS(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/provider/opencard/adoption/identifierResource/view"
      )
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Identified Resource - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listIdentifyResource(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/provider/opencard/In-home-family-members/adults/view"
      )
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Adults - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getProviderAdultList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/provider/opencard/In-home-family-members/children/view"
      )
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Children - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getProviderChildList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/provider/opencard/location/view")) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Provider Location - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.getLocationList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/provider/opencard/In-home-family-members/pets/view"
      )
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Provider Pets - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.getPetsList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/provider/opencard/office/view")) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "SFM Office - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.getOfficeList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/provider/opencard/other-agency-staff/view")
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Other Agency Staff - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listOtherAgencyStaff(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/provider/opencard/staff/view")) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Staff - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listStaff(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/provider/opencard/status/view")) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Provider Status - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listProviderStatus(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/provider/opencard/family/contact/view")
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Family Contact - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listFamilyContact(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/provider/opencard/license/view")) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Provider License - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listProviderLicense(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/provider/opencard/license-exception/view")
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Provider License Exception - " +
          moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider
        .listProviderLicenseException(requestObject)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (this.router.url.includes("/provider/opencard/sponsor/view")) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Provider Sponsor - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listProviderSponsor(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/provider/opencard/fch-level-care/view")
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "FCH Level Care - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listFchLevelCare(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/provider/opencard/provider-preferences/view")
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Provider Preferences - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listProviderPreference(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/provider/opencard/provider-strength/view")
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Provider Strength - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listProviderStrength(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/provider/opencard/school/view")) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Provider School - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listProviderSchool(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes(
        "/provider/opencard/unacceptable-conditions/view"
      )
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Unacceptable conditions - " +
          moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listUnacceptableCondition(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/provider/opencard/living-arrangement/view")
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Living Arrangement - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards
        .providerLivArrangementListView(requestObject)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (
      this.router.url.includes("/provider/opencard/authorization-summary/view")
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Authorization Summary - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards
        .providerAuthSummaryListView(requestObject)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (
      this.router.url.includes("/provider/opencard/recruitment/view")
    ) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Provider Recruitment - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards
        .providerRecruitmentListView(requestObject)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (this.router.url.includes("/provider/opencard/training/view")) {
      let requestObject = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Provider Training - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._provider.listProviderTraining(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/reports/medication-allergies/view")) {
      let requestObject = {
        openCard: "ClientMedication",
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Client Medication " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards
        .listViewOfOpencardsByClient(requestObject, this.selectedRowId)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (this.router.url.includes("/reports/court/case/view")) {
      let requestObject = {
        openCard: "CourtCase",
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Court Case " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards
        .listViewOfOpencardsByClient(requestObject, this.selectedRowId)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (this.router.url.includes("/reports/thirdparty/liability/view")) {
      let requestObject = {
        clientID:
          parseInt(localStorage.getItem("clientId")) -
          this._opencards.getHasKey(),
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Third Party Liabilites " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getClientTLPById(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (
      this.router.url.includes("/reports/preventative-measurements/view")
    ) {
      let requestObject = {
        openCard: "ClientPreventativeMeasure",
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName:
          "Client Preventative Measure " +
          moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards
        .listViewOfOpencardsByClient(requestObject, this.selectedRowId)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (this.router.url.includes("/reports/customer-care/view")) {
      let requestObject = {
        filter: "CustomerCarePerson",
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Customer Care " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.customerCarePersonList(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    } else if (this.router.url.includes("/reports/client/profile")) {
      let requestObject = {
        openCard: "ClientProfile",
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Client Profile " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards
        .listViewOfOpencardsByClient(requestObject, this.selectedRowId)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else if (this.router.url.includes("/reports/client-strength/view")) {
      let requestObject = {
        openCard: "ClientStrength",
        beginPagination: 1,
        endPagination: 100,
        isExport: true,
        fileName: "Client Strength " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards
        .listViewOfOpencardsByClient(requestObject, this.selectedRowId)
        .then((data) => {
          if (data["filePath"]) {
            window.location.href = data["filePath"];
          }
        });
    } else {
      reportName = this.master;
      console.log("reportName", reportName);
      this.exportAllService.getExportAll(
        this.exportQuery,
        isNullOrUndefined(localStorage.getItem("UserId"))
          ? 5130
          : localStorage.getItem("UserId"),
        reportName,
        ex
      );
    }
  }
  /***
   * Jumb to page, Enter the page value and navigate to the particular page
   * @returns get list of person masters
   * @event keyboard event
   */
  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getPerson(this.initial, this.end);
    }
  }

  /**
   * Navigation button actions
   * @param event mouseclick event
   * @returns respective page as per the naigation button actions
   */
  isPageSize = false;
  pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      this.isPageSize = true;
      return this.getPerson(this.initial, this.end);
    }
  }

  referralDecision() {
    let url, req;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    swal({
      title: "Select Referral Program",
      input: "select",
      inputOptions: {
        fp: "Family Preservation",
        rfc: "Reintegration",
        nc: "Non-contract FI",
      },
    }).then((data) => {
      if (data.value) {
        req = {
          clientID:
            parseInt(localStorage.getItem("clientId")) -
            this._opencards.getHasKey(),
        };
        this.clildFormService.checkReintegration(req).then((item) => {
          if (item.responseMessage == "Open Cases Found") {
            swal(
              "Open cases found!",
              "Kindly close the existing referral programs",
              "info"
            );
            loader.style.display = "none";
          } else {
            if (data.value !== "rfc") {
              url = "/reports/referral/family-preservation/new";
            } else {
              url = "/reintegration/referral/new";
            }
            loader.style.display = "none";
            return this.router.navigate([url], {
              queryParamsHandling: "merge",
            });
          }
        });
      } else {
        loader.style.display = "none";
      }
    });
  }
  search(event: any) {
    if (this.isSearchValidationPassed()) {
      let searchInput = this.searchInput.replace(/'/g, "''");
      let personTypeSearchRequest: any;
      personTypeSearchRequest = {
        searchTypeID: this.searchType.searchTypeID,
        beginPagination: this.beginPagination,
        endPagination: this.endPagination,
        integerValue: this.searchDataTypeInfo.integerValue
          ? parseInt(searchInput)
          : null,
        strValue: this.searchDataTypeInfo.strValue ? searchInput : null,
        dateValue: this.searchDataTypeInfo.dateValue ? searchInput : null,
      };
      if (this.isAssessmentSearch) {
        personTypeSearchRequest = {
          searchTypeID: this.searchType.searchTypeID,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          integerValue: this.searchDataTypeInfo.integerValue
            ? parseInt(searchInput)
            : null,
          strValue: this.searchDataTypeInfo.strValue ? searchInput : null,
          dateValue: this.searchDataTypeInfo.dateValue ? searchInput : null,
          referralID:
            parseInt(localStorage.getItem("referralId")) -
            this._opencards.getHasKey(),
          clientID:
            parseInt(localStorage.getItem("clientId")) -
            this._opencards.getHasKey(),
        };
      }

      let searchText: any;
      this.searchType.searchType == "FirstName And LastName"
        ? (searchText = searchInput.split(" "))
        : null;
      this.searchType.searchType == "Last, FirstName"
        ? (searchText = searchInput.split(","))
        : null;

      if (searchText) {
        personTypeSearchRequest.integerValue = null;
        personTypeSearchRequest.dateValue = null;
        personTypeSearchRequest.strValue = null;
        personTypeSearchRequest["firstName"] = searchText[0];
        personTypeSearchRequest["lastName"] =
          searchText.length >= 2 ? searchText[1] : "";
      }

      if (this.searchType.searchType == "Last, FirstName") {
        personTypeSearchRequest["lastName"] = searchText[0];
        personTypeSearchRequest["firstName"] =
          searchText.length >= 2 ? searchText[1] : "";
      }

      if (event.keyCode === 13) {
        let req: any;
        this.isSearchLoader = true;
        let clientId =
          parseInt(localStorage.getItem("clientId")) -
          this._opencards.getHasKey();
        let query = this.selectedQuery;

        let url = this.router.url;
        switch (url) {
          case "/reports/medication-allergies/view":
            req = {
              value: searchInput,
              query: query,
              beginPagination: this.beginPagination,
              endPagination: this.endPagination,
              openCard: "ClientMedication",
              clientID: clientId,
            };
            break;
          case "/reports/opencards/list/client/case":
            req = {
              value: searchInput,
              query: query,
              beginPagination: this.beginPagination,
              endPagination: this.endPagination,
              openCard: "cases",
              clientID: clientId,
            };
            break;
          case "/reports/client/profile":
            req = {
              value: searchInput,
              query: query,
              beginPagination: this.beginPagination,
              endPagination: this.endPagination,
              openCard: "ClientProfile",
              clientID: clientId,
            };
            break;
          case "/reports/client-strength/view":
            req = {
              value: searchInput,
              query: query,
              beginPagination: this.beginPagination,
              endPagination: this.endPagination,
              openCard: "ClientStrength",
              clientID: clientId,
            };
            break;
          case "/reports/court/case/view":
            req = {
              value: searchInput,
              query: query,
              beginPagination: this.beginPagination,
              endPagination: this.endPagination,
              openCard: "CourtCase",
              clientID: clientId,
            };
            break;
          case "/reports/thirdparty/liability/view":
            req = {
              value: searchInput,
              query: query,
              beginPagination: this.beginPagination,
              endPagination: this.endPagination,
              openCard: "",
              clientID: clientId,
            };
            break;
          case "/reports/preventative-measurements/view":
            req = {
              value: searchInput,
              query: query,
              beginPagination: this.beginPagination,
              endPagination: this.endPagination,
              openCard: "ClientPreventativeMeasure",
              clientID: clientId,
            };
            break;
          case "/reports/allergies/view":
            req = {
              value: searchInput,
              query: query,
              beginPagination: this.beginPagination,
              endPagination: this.endPagination,
              openCard: "ClientAllergies",
              clientID: clientId,
            };
            break;
          case "/reports/opencards/list/client/critical-significant-unusual-incident/view":
          case "/reports/opencards/list/client/critical-significant-unusual-incident-RM/view":
            req = {
              value: searchInput,
              // query: query,
              beginPagination: this.beginPagination,
              endPagination: this.endPagination,
              openCard: "UnusualIncident",
              sort: {
                column: "UnusualIncidentID",
                mode: "desc",
              },
              // clientID: clientId
            };
            break;

          case "/reports/school/view":
          case "/reports/casaOfficer":
          case "/reports/client":
          case "/reports/communityMember":
          case "/reports/crbOfficer":
          case "/reports/csoStaff":
          case "/reports/dcf":
          case "/reports/familyMember":
          case "/reports/guardianAdl":
          case "/reports/judge":
          case "/reports/otherAgencyStaff":
          case "/reports/payee/view":
          case "/reports/providerMember":
          case "/reports/provider-sponser/view":
          case "/reports/staff":
          case "/reports/dhsOffice/view":
          case "/reports/provider/view":
          case "/csPayee/payeeform/payee-AuthList":
          case "/reports/kansas/view":
          case "/reports/oklahoma/view":
          case "/reports/nebraska/view":
          case "/csProviderList":
            req = personTypeSearchRequest;
            break;
          case "/claims/list/cs-claim-list":
          case "/claims/list/view":
          case "/csClaimProvider":
            req = {
              searchTypeID: 229,
              strValue: null,
              integerValue: this.searchInput,
              dateValue: null,
              firstName: null,
              lastName: null,
              beginPagination: 1,
              endPagination: 100,
            };
            break;
          case "/cs_claim_payee":
            req = {
              searchTypeID: 243,
              strValue: null,
              integerValue: this.searchInput,
              dateValue: null,
              firstName: null,
              lastName: null,
              beginPagination: 1,
              endPagination: 100,
            };
          default:
            req = {
              value: searchInput,
              query: query,
              beginPagination: this.beginPagination,
              endPagination: this.endPagination,
            };
        }
        // if (this.router.url.includes('/claims/list/cs-claim-list')) {

        //   var reqClaim={
        //     "searchTypeID":229,
        //     "strValue":null,
        //     "integerValue":this.searchInput,
        //     "dateValue":null,
        //     "firstName":null,
        //     "lastName":null,
        //     "beginPagination":1,
        //     "endPagination":100
        //   }
        //   this._opencards.listSearch(reqClaim).then(data => {
        //     this.isSearchLoader = false;
        //     this.generateSearchView(data);
        //   });

        // }
        if (
          url ===
            "/reports/opencards/list/client/critical-significant-unusual-incident/view" ||
          url ===
            "/reports/opencards/list/client/critical-significant-unusual-incident-RM/view"
        ) {
          return this._opencards
            .listViewOfClientOpencards(clientId, req)
            .then((data) => {
              this.isSearchLoader = false;
              this.generateSearchView(data);
            });
        } else {
          if (this.searchType.searchType === "Past Name") {
            req["pastName"] = this.searchInput;
            req["dateValue"] = null;
            req["integerValue"] = null;
            req["strValue"] = null;
          } else {
            req["pastName"] = null;
            console.log("1111111111ddddd11111111>>>>>>>>>");
          }
          this._opencards.listSearch(req).then((data) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
        }
      }
    } else if (event.keyCode === 13) {
      swal("Info", this.searchValidationMessage, "info");
    }
  }
  search_btn() {
    if (
      this.router.url.includes("/provider_Authorization") ||
      this.router.url.includes("/payee_Authorization")
    ) {
      console.log("this.searchType>>>>>>>", this.searchType);
      var authREQ;
      if (this.searchType.searchType === "Legacy PreAuthID") {
        authREQ = {
          beginPagination: 1,
          endPagination: 100,
          legacyPreAuthID: parseInt(this.searchInput),
        };
      } else {
        authREQ = {
          beginPagination: 1,
          endPagination: 100,
          authorizationID: parseInt(this.searchInput),
        };
      }
      this._opencards.getListOfAuthorizations_provider(authREQ).then((data) => {
        if (this.router.url.includes("/payee_Authorization")) {
          data.dynamicSearch.map((ele) => {
            ele.providerPayeeName = ele.ProviderName;
          });
        }

        this.generateListView(data);
      });
    } else {
      if (!this.searchInput) {
        this.searchInput = "";
      }
      let searchInput = this.searchInput.replace(/'/g, "''");
      let personTypeSearchRequest: any;
      if (this.searchType.searchTypeID === null) {
        if (this.router.url.includes("/reports/provider/view")) {
          personTypeSearchRequest = {
            searchTypeID: 1,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            integerValue: null,
            strValue: this.searchInput,
            dateValue: null,
            firstName: null,
            lastName: null,
          };
        } else if (this.router.url.includes("/csProviderList")) {
          personTypeSearchRequest = {
            searchTypeID: 1,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            integerValue: null,
            strValue: this.searchInput,
            dateValue: null,
            firstName: null,
            lastName: null,
          };
        } else if (this.router.url.includes("/reports/provider-sponser/view")) {
          personTypeSearchRequest = {
            searchTypeID: 68,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            integerValue: null,
            strValue: this.searchInput,
            dateValue: null,
            firstName: null,
            lastName: null,
          };
        } else if (this.router.url.includes("/reports/staff")) {
          personTypeSearchRequest = {
            searchTypeID: 28,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            integerValue: null,
            strValue: this.searchInput,
            dateValue: null,
            firstName: null,
            lastName: null,
          };
        } else if (this.router.url.includes("/reports/familyMember")) {
          personTypeSearchRequest = {
            searchTypeID: 32,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            integerValue: null,
            strValue: this.searchInput,
            dateValue: null,
            firstName: null,
            lastName: null,
          };
        } else if (this.router.url.includes("/reports/school/view")) {
          personTypeSearchRequest = {
            searchTypeID: 61,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            integerValue: null,
            strValue: this.searchInput,
            dateValue: null,
            firstName: null,
            lastName: null,
          };
        } else {
          personTypeSearchRequest = {
            searchTypeID: 83,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            integerValue: null,
            strValue: null,
            dateValue: null,
            firstName: searchInput.split(" ")[0],
            lastName: searchInput.split(" ")[1],
          };
        }
      } else if (this.router.url.includes("/reports/kansas/view")) {
        personTypeSearchRequest = {
          searchTypeID: this.searchType.searchTypeID,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          value: this.searchDataTypeInfo.strValue ? searchInput : null,
          state: "kansas",
        };
      } else if (this.router.url.includes("/reports/oklahoma/view")) {
        personTypeSearchRequest = {
          searchTypeID: this.searchType.searchTypeID,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          value: this.searchDataTypeInfo.integerValue ? searchInput : null,
          state: "oklahoma",
        };
      } else if (this.router.url.includes("/reports/nebraska/view")) {
        personTypeSearchRequest = {
          searchTypeID: this.searchType.searchTypeID,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          value: this.searchDataTypeInfo.integerValue ? searchInput : null,
        };
      } else if (
        this.router.url.includes("/reports/evaluation-creation/view")
      ) {
        personTypeSearchRequest = {
          searchTypeID: this.searchType.searchTypeID,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          value: this.searchDataTypeInfo.integerValue ? searchInput : null,
          state: "nebraska",
        };
      } else if (this.router.url.includes("/reports/evaluation-type/view")) {
        personTypeSearchRequest = {
          searchTypeID: this.searchType.searchTypeID,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          value: this.searchDataTypeInfo.integerValue ? searchInput : null,
        };
      } else if (this.router.url.includes("/reports/evaluation-scale/view")) {
        personTypeSearchRequest = {
          searchTypeID: this.searchType.searchTypeID,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          value: this.searchDataTypeInfo.integerValue ? searchInput : null,
        };
      } else if (this.router.url.includes("/reports/version-creation/view")) {
        personTypeSearchRequest = {
          searchTypeID: this.searchType.searchTypeID,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          value: this.searchDataTypeInfo.integerValue ? searchInput : null,
          state: "nebraska",
        };
      } else if (
        this.router.url.includes("/reports/evaluation-question/view")
      ) {
        personTypeSearchRequest = {
          searchTypeID: this.searchType.searchTypeID,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          value: this.searchDataTypeInfo.integerValue ? searchInput : null,
          state: "nebraska",
        };
      } else if (
        this.router.url.includes("/reports/evaluation-question-group/view")
      ) {
        personTypeSearchRequest = {
          searchTypeID: this.searchType.searchTypeID,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          value: this.searchDataTypeInfo.integerValue ? searchInput : null,
          state: "nebraska",
        };
      } else {
        personTypeSearchRequest = {
          searchTypeID: this.searchType.searchTypeID,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          integerValue: this.searchDataTypeInfo.integerValue
            ? parseInt(searchInput)
            : null,
          strValue: this.searchDataTypeInfo.strValue ? searchInput : null,
          dateValue: this.searchDataTypeInfo.dateValue ? searchInput : null,
        };
      }

      let searchText: any;
      this.searchType.searchType == "FirstName And LastName"
        ? (searchText = searchInput.split(" "))
        : null;
      this.searchType.searchType == "Last, FirstName"
        ? (searchText = searchInput.split(","))
        : null;

      if (searchText) {
        personTypeSearchRequest.integerValue = null;
        personTypeSearchRequest.dateValue = null;
        personTypeSearchRequest.strValue = null;
        personTypeSearchRequest["firstName"] = searchText[0];
        personTypeSearchRequest["lastName"] =
          searchText.length >= 2 ? searchText[1] : "";
      }

      if (this.searchType.searchType == "Last, FirstName") {
        personTypeSearchRequest["lastName"] = searchText[0];
        personTypeSearchRequest["firstName"] =
          searchText.length >= 2 ? searchText[1] : "";
      }

      let req: any;
      this.isSearchLoader = true;
      let clientId =
        parseInt(localStorage.getItem("clientId")) -
        this._opencards.getHasKey();
      let query = this.selectedQuery;
      let url = this.router.url;
      switch (url) {
        case "/reports/medication-allergies/view":
          req = {
            value: searchInput,
            query: query,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            openCard: "ClientMedication",
            clientID: clientId,
          };
          break;
        case "/reports/opencards/list/client/case":
          req = {
            value: searchInput,
            query: query,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            openCard: "cases",
            clientID: clientId,
          };
          break;
        case "/reports/client/profile":
          req = {
            value: searchInput,
            query: query,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            openCard: "ClientProfile",
            clientID: clientId,
          };
          break;
        case "/reports/client-strength/view":
          req = {
            value: searchInput,
            query: query,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            openCard: "ClientStrength",
            clientID: clientId,
          };
          break;
        case "/reports/court/case/view":
          req = {
            value: searchInput,
            query: query,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            openCard: "CourtCase",
            clientID: clientId,
          };
          break;
        case "/reports/thirdparty/liability/view":
          req = {
            value: searchInput,
            query: query,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            openCard: "",
            clientID: clientId,
          };
          break;
        case "/reports/preventative-measurements/view":
          req = {
            value: searchInput,
            query: query,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            openCard: "ClientPreventativeMeasure",
            clientID: clientId,
          };
          break;
        case "/reports/allergies/view":
          req = {
            value: searchInput,
            query: query,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            openCard: "ClientAllergies",
            clientID: clientId,
          };
          break;
        case "/reports/opencards/list/client/critical-significant-unusual-incident/view":
        case "/reports/opencards/list/client/critical-significant-unusual-incident-RM":
          req = {
            value: searchInput,
            // query: query,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            openCard: "UnusualIncident",
            sort: {
              column: "UnusualIncidentID",
              mode: "desc",
            },
            // clientID: clientId
          };
          break;

        case "/reports/school/view":
        case "/reports/casaOfficer":
        case "/reports/client":
        case "/reports/communityMember":
        case "/reports/crbOfficer":
        case "/reports/csoStaff":
        case "/reports/dcf":
        case "/csPayee/payeeform/payee-AuthList":
        case "/reports/familyMember":
        case "/reports/guardianAdl":
        case "/reports/judge":
        case "/reports/otherAgencyStaff":
        case "/reports/payee/view":
        case "/reports/providerMember":
        case "/reports/provider-sponser/view":
        case "/reports/staff":
        case "/reports/dhsOffice/view":
        case "/reports/provider/view":
        case "/reports/kansas/view":
        case "/reports/oklahoma/view":
        case "/reports/nebraska/view":
        case "/csProviderList":
          req = personTypeSearchRequest;
          break;
        case "/reports/all/authorizations":
        case "/provider/opencard/authorization-summary/view":
        case "/payee/auth_list":
        case "/csPayee/payeeform/payee-AuthList":
          req = {
            searchTypeID: 228,
            strValue: null,
            integerValue: parseInt(searchInput),
            dateValue: null,
            firstName: null,
            lastName: null,
            beginPagination: 1,
            endPagination: 100,
          };
          break;
          break;
        case "/claims/list/cs-claim-list":
        case "/claims/list/view":
        case "/csClaimProvider":
          req = {
            searchTypeID: 229,
            strValue: null,
            integerValue: this.searchInput,
            dateValue: null,
            firstName: null,
            lastName: null,
            beginPagination: 1,
            endPagination: 100,
          };
          break;
        case "/cs_claim_payee":
          req = {
            searchTypeID: 243,
            strValue: null,
            integerValue: this.searchInput,
            dateValue: null,
            firstName: null,
            lastName: null,
            beginPagination: 1,
            endPagination: 100,
          };
        default:
          req = {
            value: searchInput,
            query: query,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
          };
      }
      if (this.router.url.includes("/reports/client")) {
        req = personTypeSearchRequest;
      }
      if (
        url ===
          "/reports/opencards/list/client/critical-significant-unusual-incident/view" ||
        url ===
          "/reports/opencards/list/client/critical-significant-unusual-incident-RM/view"
      ) {
        return this._opencards
          .listViewOfClientOpencards(clientId, req)
          .then((data) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/authorizations") {
        this._opencards.listSearch(req).then((data) => {
          this.isSearchLoader = false;
          this.generateSearchView(data);
        });
      } else if (url === "/csClientList") {
        if (!this.searchInput) {
          this.searchInput = "";
        }
        let searchInputValue = this.searchInput.replace(/'/g, "''");
        console.log("this.searchType.searchTypeID>>>>,", this.searchType);
        console.log("this.searchInput>>>>,", this.searchInput);
        var serREQ = {
          searchTypeID: this.searchType.searchTypeID,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          integerValue: null,
          strValue: null,
          dateValue: null,
          firstName: null,
          lastName: null,
          pastName: null,
        };
        if (this.searchType.searchType === "FirstName And LastName") {
          serREQ["firstName"] = searchInputValue.split(" ")[0];
          serREQ["lastName"] = searchInputValue.split(" ")[1];
        } else if (this.searchType.searchType === "Last, FirstName") {
          serREQ["firstName"] = searchInputValue.split(" ")[0];
          serREQ["lastName"] = searchInputValue.split(" ")[1];
        } else if (this.searchType.searchType === "Kaecses") {
          serREQ["strValue"] = this.searchInput;
        } else if (this.searchType.searchType === "Last Name") {
          serREQ["strValue"] = this.searchInput;
        } else if (this.searchType.searchType === "Authorization ID") {
          serREQ["integerValue"] = parseInt(this.searchInput);
        } else if (this.searchType.searchType === "Claim ID") {
          serREQ["integerValue"] = parseInt(this.searchInput);
        }
        let searchSortRequest = {
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          filter: "client",
          "group by": "All",
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };

        if (this.searchType.searchType) {
          searchSortRequest = {
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            "group by": "All",
            filter: "client",
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          searchSortRequest["integerValue"] = parseInt(this.searchInput);
          searchSortRequest["strValue"] = this.searchInput;
          searchSortRequest["searchType"] = this.searchType.searchType;
        }

        this._opencards.listCustomerCare(searchSortRequest).then((data) => {
          this.isSearchLoader = false;
          this.generateSearchView(data);
        });
      } else if (url === "/reports/provider/view") {
        let providerSortRequest = {
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
        };
        providerSortRequest["searchType"] = this.searchType.searchType;
        if (this.searchType.searchType === "ProviderID") {
          providerSortRequest["integerValue"] = this.searchInput;
        } else {
          providerSortRequest["strValue"] = this.searchInput;
        }

        if (this.searchType.searchType) {
          let providerSortRequest = {
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          if (this.searchType.searchType === "ProviderID") {
            providerSortRequest["integerValue"] = this.searchInput;
            providerSortRequest["searchType"] = this.searchType.searchType;
            providerSortRequest["group by"] = "All";
          } else {
            providerSortRequest["integerValue"] = parseInt(this.searchInput);
            providerSortRequest["strValue"] = this.searchInput;
            providerSortRequest["searchType"] = this.searchType.searchType;
            providerSortRequest["group by"] = "All";
          }
        }
        if (this.searchType.searchType === null) {
          providerSortRequest = {
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
          };
          providerSortRequest["strValue"] = this.searchInput || "";
          providerSortRequest["searchType"] = "Last, First Name";
        }
        this._opencards.listProvider(providerSortRequest).then((data) => {
          this.isSearchLoader = false;
          this.generateSearchView(data);
        });
      } else if (url === "/csProviderList") {
        let cs_providerSortRequest = {
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
        };
        cs_providerSortRequest["searchType"] = this.searchType.searchType;
        if (
          this.searchType.searchType === "AuthorizationID" ||
          this.searchType.searchType === "ClaimID"
        ) {
          cs_providerSortRequest["integerValue"] = this.searchInput;
        } else {
          cs_providerSortRequest["strValue"] = this.searchInput;
        }

        if (this.searchType.searchType) {
          let cs_providerSortRequest = {
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
          };
          if (
            this.searchType.searchType === "AuthorizationID" ||
            this.searchType.searchType === "ClaimID"
          ) {
            cs_providerSortRequest["integerValue"] = this.searchInput;
            cs_providerSortRequest["searchType"] = this.searchType.searchType;
          } else {
            cs_providerSortRequest["strValue"] = this.searchInput;
            cs_providerSortRequest["searchType"] = this.searchType.searchType;
          }
        }
        if (this.searchType.searchType === null) {
          cs_providerSortRequest = {
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
          };
          cs_providerSortRequest["strValue"] = this.searchInput || "";
          cs_providerSortRequest["searchType"] = "Provider Name";
        }
        this._opencards.listProvider(cs_providerSortRequest).then((data) => {
          this.isSearchLoader = false;
          this.generateSearchView(data);
        });
      } else if (url === "/reports/staff") {
        let searchText: any;
        let staffSortRequest = {
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          "group by": null,
          filter: this.filter,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        if (this.searchType.searchType === null) {
          staffSortRequest["searchType"] = "First and Last Name";
          searchText = searchInput.split(" ");
          staffSortRequest["lastName"] = searchText[1];
          staffSortRequest["firstName"] =
            searchText.length >= 2 ? searchText[0] : "";
        } else {
          staffSortRequest["searchType"] = this.searchType.searchType;
          staffSortRequest["strValue"] = this.searchInput;
        }
        staffSortRequest["group by"] = "All";
        staffSortRequest["filter"] = this.filter;
        this.clildFormService.getPerson(staffSortRequest).then((data) => {
          this.isSearchLoader = false;
          this.generateSearchView(data);
        });
      } else if (url === "/reports/familyMember") {
        let searchText: any;
        let familyMemberSortRequest = {
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          "group by": null,
          filter: this.filter,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        if (this.searchType.searchType === null) {
          familyMemberSortRequest["searchType"] = "First and Last Name";
          searchText = searchInput.split(" ");
          familyMemberSortRequest["lastName"] = searchText[1];
          familyMemberSortRequest["firstName"] =
            searchText.length >= 2 ? searchText[0] : "";
        } else if (this.searchType.searchType === "First and Last Name") {
          familyMemberSortRequest["searchType"] = this.searchType.searchType;
          searchText = searchInput.split(" ");
          familyMemberSortRequest["lastName"] = searchText[1];
          familyMemberSortRequest["firstName"] =
            searchText.length >= 2 ? searchText[0] : "";
        } else {
          familyMemberSortRequest["searchType"] = this.searchType.searchType;
          familyMemberSortRequest["strValue"] = this.searchInput;
        }
        familyMemberSortRequest["group by"] = "All";
        familyMemberSortRequest["filter"] = this.filter;
        this.clildFormService
          .getPerson(familyMemberSortRequest)
          .then((data) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/provider-sponser/view") {
        let providerSponsorSortRequest = {
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        if (this.searchType.searchType === null) {
          providerSponsorSortRequest["searchType"] = "Provider sponsor Name";
        } else {
          providerSponsorSortRequest["searchType"] = this.searchType.searchType;
        }
        providerSponsorSortRequest["integerValue"] = parseInt(this.searchInput);
        providerSponsorSortRequest["strValue"] = this.searchInput;
        providerSponsorSortRequest["group by"] = "All";
        providerSponsorSortRequest["filter"] = this.filter;
        this._opencards
          .providerSponsorList(providerSponsorSortRequest)
          .then((data) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/school/view") {
        let schoolSortRequest = {
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder,
          },
        };
        if (this.searchType.searchType === null) {
          schoolSortRequest["searchType"] = "School Name";
        } else {
          schoolSortRequest["searchType"] = this.searchType.searchType;
        }
        schoolSortRequest["strValue"] = this.searchInput || "";
        this._opencards
          .personTypeCardSchoolListView(schoolSortRequest)
          .then((data) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/adoption-event") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/appointments") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["strValue"] = this.searchInput || "";
        globalListSortRequest["searchType"] = this.searchType.searchType;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/assessments") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["strValue"] = this.searchInput || "";
        globalListSortRequest["searchType"] = this.searchType.searchType;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/bh-determination") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["strValue"] = this.searchInput || "";
        globalListSortRequest["searchType"] = this.searchType.searchType;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/case-activity") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/case-file-activity") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/case-plan-goals") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/case-team") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/court-orders") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/credit-tracking") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/family-safety") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/general-education") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/home-county") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/home-school") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/immunization") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/independent-living") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/intensive-phase") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/kan-be-healthy") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/kipp") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/kipp-pmto") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/monthly-reports") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/progress-note-diagnosis") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/referral-events") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/school-release") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/waiver") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/sfcs-office") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/special-education") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/social-securtiy-income") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/non-intensive-phase") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/preventative-measurements") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/third-party-liability") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/medication") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/court-case") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/client-strength") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/reports/all/client-profile") {
        let globalListSortRequest = {
          tableName: this.tableArray,
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        globalListSortRequest["searchType"] = this.searchType.searchType;
        globalListSortRequest["strValue"] = this.searchInput;
        if (this.searchType.searchType) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = this.searchType.searchType;
          globalListSortRequest["filter"] = this.filter;
        }
        if (this.searchType.searchType === null) {
          let globalListSortRequest = {
            tableName: this.tableArray,
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };
          globalListSortRequest["integerValue"] = parseInt(this.searchInput);
          globalListSortRequest["strValue"] = this.searchInput;
          globalListSortRequest["searchType"] = "First Name";
          globalListSortRequest["filter"] = this.filter;
        }
        this._opencards
          .cardsGlobalList(globalListSortRequest)
          .then((data: any) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (
        url === "/reports/payee/view" ||
        this.router.url.includes("/csPayee")
      ) {
        let payeeSortRequest = {
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        payeeSortRequest["strValue"] = this.searchInput || "";
        payeeSortRequest["searchType"] = "PayeeName";

        if (this.searchType.searchType) {
          payeeSortRequest = {
            beginPagination: this.beginPagination,
            endPagination: this.endPagination,
            sort: {
              column: this.sortingEnable
                ? this.sortColumn
                : this.columnToSorted,
              mode: this.sortOrder || "asc",
            },
          };

          payeeSortRequest["integerValue"] = parseInt(this.searchInput);
          payeeSortRequest["strValue"] = this.searchInput;
          payeeSortRequest["searchType"] = this.searchType.searchType;
          payeeSortRequest["group by"] = "All";

          switch (this.searchType.searchType) {
            case "VendorID":
              payeeSortRequest["searchType"] = "VenderID";
              break;

            case "Payee Name":
              payeeSortRequest["searchType"] = "PayeeName";
              break;
          }
        }
        this._opencards.listPayee(payeeSortRequest).then((data) => {
          this.isSearchLoader = false;
          this.generateSearchView(data);
        });
      } else if (url === "/provider/opencard/authorization-summary/view") {
        let authorizationSummaryProvider = {
          providerID:
            parseInt(localStorage.getItem("providerID")) -
            this._opencards.getHasKey(),
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        if (this.searchType.searchType) {
          authorizationSummaryProvider["strValue"] = this.searchInput;
          authorizationSummaryProvider["searchType"] = "authorizationID";
        }
        this._opencards
          .providerAuthSummaryListView(authorizationSummaryProvider)
          .then((data) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/payee/auth_list") {
        let authorizationSummaryPayee = {
          payeeID: parseInt(localStorage.getItem("payeeID")),
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        if (this.searchType.searchType) {
          authorizationSummaryPayee["strValue"] = this.searchInput;
          authorizationSummaryPayee["searchType"] = "authorizationID";
        }
        this._opencards
          .getPayeeAuthList(authorizationSummaryPayee)
          .then((data) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else if (url === "/csPayee/payeeform/payee-AuthList") {
        let csPayeeList = {
          payeeID: parseInt(localStorage.getItem("payeeID")),
          beginPagination: this.beginPagination,
          endPagination: this.endPagination,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        this._opencards.getPayee_AuthList(csPayeeList).then((data) => {
          this.isSearchLoader = false;
          this.generateSearchView(data);
        });
      } else if (url === "/payee/serviceClaim_otherService/auth_list") {
        let payeeServiceClaimList = {
          payeeID: parseInt(localStorage.getItem("payeeID")),
          isOtherService: true,
          endDate: "01/01/1899",
          beginPagination: this.initial,
          endPagination: this.end,
          sort: {
            column: this.sortingEnable ? this.sortColumn : this.columnToSorted,
            mode: this.sortOrder || "asc",
          },
        };
        this._opencards
          .getPayeeserviceHardAuthList(payeeServiceClaimList)
          .subscribe((data) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
      } else {
        if (this.searchType.searchType === "Past Name") {
          req["pastName"] = this.searchInput;
          req["dateValue"] = null;
          req["integerValue"] = null;
          req["strValue"] = null;
        } else {
          if (this.isAssessmentSearch) {
            req = {};
            req = {
              searchTypeID: this.searchType.searchTypeID,
              beginPagination: this.beginPagination,
              endPagination: this.endPagination,
              integerValue: this.searchDataTypeInfo.integerValue
                ? parseInt(searchInput)
                : null,
              strValue: this.searchDataTypeInfo.strValue ? searchInput : null,
              dateValue: this.searchDataTypeInfo.dateValue ? searchInput : null,
              referralID:
                parseInt(localStorage.getItem("referralId")) -
                this._opencards.getHasKey(),
              clientID:
                parseInt(localStorage.getItem("clientId")) -
                this._opencards.getHasKey(),
            };
          } else {
            req["pastName"] = null;
          }
        }

        if (
          this.router.url.includes("/claims/list/cs-claim-list") ||
          this.router.url.includes("/claims/list/view") ||
          this.router.url.includes("/csClaimProvider")
        ) {
          var reqClaim = {
            searchTypeID: 229,
            strValue: null,
            integerValue: parseInt(this.searchInput),
            dateValue: null,
            firstName: null,
            lastName: null,
            beginPagination: 1,
            endPagination: 100,
          };
          this._opencards.listSearch(reqClaim).then((data) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
        } else if (this.router.url.includes("/cs_claim_payee")) {
          var reqClaimPayee = {
            searchTypeID: 243,
            strValue: null,
            integerValue: parseInt(this.searchInput),
            dateValue: null,
            firstName: null,
            lastName: null,
            beginPagination: 1,
            endPagination: 100,
          };
          this._opencards.listSearch(reqClaimPayee).then((data) => {
            this.isSearchLoader = false;
            this.generateSearchView(data);
          });
        } else {
          if (this.router.url.includes("/csPayee")) {
            var reqPayee = {
              beginPagination: 1,
              endPagination: 100,
              searchTypeID: this.searchType.searchTypeID,
              strValue: null,
              integerValue: null,
            };
            if (this.searchType.searchType === "PayeeName") {
              reqPayee.strValue = this.searchInput;
            } else {
              reqPayee.integerValue = this.searchInput;
            }
            this._opencards.listSearch(reqPayee).then((data) => {
              this.isSearchLoader = false;
              this.generateSearchView(data);
            });
          } else {
            this._opencards.listSearch(req).then((data) => {
              this.isSearchLoader = false;
              this.generateSearchView(data);
            });
          }
        }
      }
    }
  }

  clearEvent() {
    this.searchInput = "";
    this.getPerson(1, 100);
  }

  createReferral(referral) {
    let url;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    let closeBtn = document.getElementById("closeBtn") as HTMLElement;
    loader.style.display = "block";
    if (
      referral.display === "Psychiatric Residential Treatment Theraphy (PRTF)"
    ) {
      this.isPRTF = true;
      this._opencards.setOtherRefDetails({
        isFpReferral: false,
        referralName: "PRTF",
      });
      loader.style.display = "none";
      closeBtn.click();
      this.prtfComponent.initialTriggerForReferralCreation();
      return;
    }
    switch (referral.display) {
      case "Reintegration":
        url = "/reintegration/referral/new";
        this._opencards.setOtherRefDetails({
          isFpReferral: false,
          referralName: "FC",
        });
        break;
      case "Non contract outpatient services":
        url = "/reports/referral/nc-ops/new";
        this._opencards.setOtherRefDetails({
          isFpReferral: false,
          referralName: "NC-OPS",
        });
        break;
      case "Family Preservation":
        url = "/reports/referral/family-preservation/new";
        this._opencards.setOtherRefDetails({
          isFpReferral: true,
          referralName: "FI",
        });
        break;
      case "Non contract family preservation (In-Home)":
        url = "/reports/referral/family-preservation/new";
        this._opencards.setOtherRefDetails({
          isFpReferral: false,
          referralName: "NC-FI",
        });
        break;
      case "Non contract Foster care homes referral program":
        url = "/reports/nc-fch/new";
        this._opencards.setOtherRefDetails({
          isFpReferral: false,
          referralName: "NC-FCH",
        });
        break;
      case "Non contract reintegration foster care (NC-RFC)":
        url = "/reports/nc-rfc/new";
        this._opencards.setOtherRefDetails({
          isFpReferral: false,
          referralName: "NC-RFC",
        });
        break;
      case "Non contract Home Study/FCH Services (NC-HS)":
        url = "/nc-hs/new";
        this._opencards.setOtherRefDetails({
          isFpReferral: false,
          referralName: "NC-RFC",
        });
        break;
      case "Bridge Home Oklahoma (BH OK)":
        url = "/bh-ok/new";
        this._opencards.setOtherRefDetails({
          isFpReferral: false,
          referralName: "BH-OK",
        });
        break;
      case "Juvenile Justice Foster Care (JJFC)":
        url = "jjfc/new";
        this._opencards.setOtherRefDetails({
          isFpReferral: false,
          referralName: "JJFC",
        });
        break;
      case "NC Mental Health Respites (NC-MHR)":
        url = "nc-mhr/new";
        this._opencards.setOtherRefDetails({
          isFpReferral: false,
          referralName: "NC-MHR",
        });
        break;
      case "Sub-Contract Reintegration Foster Care(SUB-RFC)":
        url = "sub-rfc/new";
        this._opencards.setOtherRefDetails({
          isFpReferral: false,
          referralName: "SUB-RFC",
        });
        break;
    }
    closeBtn.click();
    loader.style.display = "none";
    if (
      referral.display == "Family Preservation" ||
      referral.display == "Non contract family preservation (In-Home)"
    ) {
      return this.router.navigate([url], {
        queryParamsHandling: "preserve",
      });
    } else {
      this.referralValidation(referral.display, url);
    }

    // if (referral.display == 'Reintegration' ||
    //   referral.display == 'Non contract Foster care homes referral program'
    // ) {
    //   this.referralValidation(referral.display, url);
    // }
    // else {
    //   return this.router.navigate([url]);
    // }
  }

  referralValidationHeader = "";
  isReferralValidationVisible = false;
  referralUrl = "";
  currentClientId: any;
  openCaseMessage = null;
  isReferralPassed = false;
  openReferralList = [];
  isReferralAlert = false;
  currentReferralTypeID = null;
  isKkshown = false;
  kkNumber = null;
  opencaseReferralTypes = "open";
  referralValidationObject = {
    client: "",
    kk: null,
    facts: null,
  };
  referralValidation(referral, url) {
    this.referralValidationObject["client"] =
      this._localValues.ClientNameLastFirst;

    this.isKkshown = false;
    this.kkNumber = null;
    this.currentClientId = parseInt(
      this._activateRoute.snapshot.queryParamMap.get("clientId")
    );
    switch (referral) {
      case "Reintegration":
        this.referralValidationHeader = "FC - Referral Wizard - Step 1";
        this.currentReferralTypeID = 1;
        break;
      // FC
      case "Non contract Foster care homes referral program":
        this.referralValidationHeader = "NC-FCH - Referral Wizard - Step 1";
        this.currentReferralTypeID = 4;
        break;
      // NC-FCH
      case "Non contract outpatient services":
        this.referralValidationHeader = "NC-OPS - Referral Wizard - Step 1";
        this.currentReferralTypeID = 9;
        break;
      // NC-OPS
      case "Family Preservation":
        this.referralValidationHeader = "FI - Referral Wizard - Step 1";
        this.currentReferralTypeID = 2;
        break;
      // FI
      case "Non contract family preservation (In-Home)":
        this.referralValidationHeader = "NC-FI - Referral Wizard - Step 1";
        this.currentReferralTypeID = 5;
        break;
      // NC-FI
      case "Non contract reintegration foster care (NC-RFC)":
        this.referralValidationHeader = "NC-RFC - Referral Wizard - Step 1";
        this.currentReferralTypeID = 7;
        break;
      // NC-RFC
      case "Non contract Home Study/FCH Services (NC-HS)":
        this.referralValidationHeader = "NC-HS - Referral Wizard - Step 1";
        this.currentReferralTypeID = 8;
        break;
      // NC-HS
      case "Bridge Home Oklahoma (BH OK)":
        this.isKkshown = true;
        this.kkNumber = this.referralValidationObject.kk;
        this.referralValidationHeader = "BH OK - Referral Wizard - Step 1";
        this.currentReferralTypeID = 15;
        break;
      // BH OK
      case "Juvenile Justice Foster Care (JJFC)":
        this.referralValidationHeader = "JJFC - Referral Wizard - Step 1";
        this.currentReferralTypeID = 17;
        break;
      // JJFC
      case "NC Mental Health Respites (NC-MHR)":
        this.referralValidationHeader = "NC-MHR - Referral Wizard - Step 1";
        this.currentReferralTypeID = 11;
        break;
      // NC-MHR
      case "Psychiatric Residential Treatment Theraphy (PRTF)":
        this.referralValidationHeader = "PRTF - Referral Wizard - Step 1";
        this.currentReferralTypeID = 14;
        break;
      // PRTF
      case "Sub-Contract Reintegration Foster Care(SUB-RFC)":
        this.referralValidationHeader = "SUB-RFC - Referral Wizard - Step 1";
        this.currentReferralTypeID = 20;
        break;
    }
    this.referralValidationObject["client"] =
      this._localValues.ClientNameLastFirst;
    this.referralUrl = url;
    this.isReferralValidationVisible = true;
  }

  nextStepValidation() {
    if (this.isReferralPassed) {
      this._localValues.referralValidationCheckValues =
        this.referralValidationObject;
      return this.router.navigate([this.referralUrl], {
        queryParams: { ref_type: this.currentReferralTypeID },
        queryParamsHandling: "merge",
      });
    } else {
      this.isReferralAlert = true;
    }
    if (this.currentReferralTypeID == 9) {
      this.isReferralPassed = true;
      this._localValues.referralValidationCheckValues =
        this.referralValidationObject;
      return this.router.navigate([this.referralUrl], {
        queryParams: { ref_type: this.currentReferralTypeID },
        queryParamsHandling: "merge",
      });
    }
  }

  closeTabValidation() {
    this.openReferralList = [];
    this.referralValidationObject = {
      client: "",
      kk: null,
      facts: null,
    };
    this.isReferralValidationVisible = false;
  }

  checkValidation() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let request = {
      clientID: [this.currentClientId],
      referralTypeID: this.currentReferralTypeID,
      kk: this.referralValidationObject.kk,
    };
    this.clildFormService.checkReferralValidation(request).then((data) => {
      this.openReferralList = data.openReferralList;
      loader.style.display = "none";
      if (data.openReferralList.length == 0) {
        this.openCaseMessage = "No Open Cases Found";
        this.isReferralPassed = true;
      } else {
        this.openReferralList.forEach((item, index) => {
          let type = item.referralType;
          if (index == 0) {
            this.opencaseReferralTypes = type;
          } else {
            this.opencaseReferralTypes =
              this.opencaseReferralTypes + ", " + type;
          }
        });
        this.openCaseMessage = "Open Cases Found";
        this.isReferralPassed = false;
      }
    });
  }

  onReferralValidationClose() {
    this.isReferralPassed = false;
    this.openReferralList = [];
    this.referralValidationObject = {
      client: "",
      kk: null,
      facts: null,
    };
  }

  /** Rule : Adoption should have only one record for the referral, Disable the add button in the adoption list view, if equal to one */
  adoptionRuleCheck(): Promise<any> {
    let req: any,
      referralId: any,
      beginPagination = 1,
      endPagination = 10,
      listData = [];
    referralId =
      parseInt(localStorage.getItem("referralId")) -
      this._opencards.getHasKey();
    req = {
      referralID: referralId,
      beginPagination: beginPagination,
      endPagination: endPagination,
    };
    return this._opencards.listAdoption(req).then((data: any) => {
      listData = data.adoption;
      if (listData.length >= 1) {
        this.isAddBtnDisable = true;
        this.isListAdd = false;
        this.isListAddAction = false;
      }
    });
  }

  // setAsqName(asqName) {
  //   console.log("asqName in person master switch is", asqName);
  //   switch (asqName) {
  //     case "ASQ 2 Months":
  //       this.asqName = "asq-two";
  //       this.isAsqFormed = true;
  //       break;
  //     case "ASQ 6 Months":
  //       this.asqName = "asq-six";
  //       this.isAsqFormed = true;
  //       break;
  //     case "ASQ 12 Months":
  //       this.asqName = "asq-twelve";
  //       this.isAsqFormed = true;
  //       break;
  //     case "ASQ 18 Months":
  //       this.asqName = "asq-eighteen";
  //       this.isAsqFormed = true;
  //       break;
  //     case "ASQ 24 Months":
  //       this.asqName = "asq-twentyFour";
  //       this.isAsqFormed = true;
  //       break;
  //     case "ASQ 30 Months":
  //       this.asqName = "asq-twirty";
  //       this.isAsqFormed = true;
  //       break;
  //     case "ASQ 36 Months":
  //       this.asqName = "asq-thirtySix";
  //       this.isAsqFormed = true;
  //       break;
  //     case "ASQ 48 Months":
  //       this.asqName = "asq-fourtyEight";
  //       this.isAsqFormed = true;
  //       break;
  //     case "ASQ 60 Months":
  //       this.asqName = "asq-sixty";
  //       this.isAsqFormed = true;
  //       break;
  //     case "CAFAS":
  //       this.asqName = "CAFAS";
  //       this.isAsqFormed = true;
  //       break;
  //     case "PSI":
  //       this.asqName = "PSI";
  //       this.isAsqFormed = true;
  //       break;
  //     case "CROPS":
  //       this.asqName = "CROPS";
  //       this.isAsqFormed = true;
  //       break;
  //     case "CSDC":
  //       this.asqName = "CSDC";
  //       this.isAsqFormed = true;
  //       break;
  //     case "PECFAS":
  //       this.asqName = "PECFAS";
  //       this.isAsqFormed = true;
  //       break;
  //     case "NCFAS":
  //       this.asqName = "NCFAS";
  //       this.isAsqFormed = true;
  //       break;
  //     default:
  //       this.isAsqFormed = false;
  //   }
  //   console.log(
  //     "this.asqName is in person master switch after is",
  //     this.asqName
  //   );
  //   this.navigateTo = '/reintegration/referral/opencard/behavioral-assessment/' + this.asqName + '/detail';

  //   this._opencards.setAsqData(this.asqName, this.isAsqFormed);
  // }
  billableActivity() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req: any;
    let selectedRows = this.agGrid.api.getSelectedRows();
    let listOfCaseactivities = [];
    selectedRows.filter((item: any) => {
      listOfCaseactivities.push(item.CaseActivityID);
    });
    let preReq = {
      caseActivity: listOfCaseactivities,
    };
    req = {
      billableCaseActivity: preReq,
      isBillable: this.isBillable,
      billedDate: this._localValues.stringFormatDatetime(
        Date.parse(this.billableDate)
      ),
    };
    this._opencards.updateFPBillableCaseActivity(req).then(() => {
      swal("Success", "Record has been updated!", "success");
      let fpReferralId = this.REF_ID;
      const FPREQ = {
        referralID: fpReferralId,
        beginPagination: 1,
        endPagination: 100,
        sort: { column: this.columnToSorted, mode: "desc" },
      };
      this._opencards.getListFPBillabelCaseActivity(FPREQ).then((data) => {
        this.isBillable = false;
        this.billableDate = "";
        loader.style.display = "none";
        this.generateListView(data);
      });
    });
  }

  billableCancel() {
    this.router.navigate(["/reports/referral/family-preservation/detail"], {
      queryParamsHandling: "preserve",
    });
  }

  billabelPanelAction() {
    this.isBillablePanel = !this.isBillablePanel;
  }

  setCaseActivityName(formName) {
    this._opencards.setCaseActivityData(formName);
  }
  onCheckBoxSelect(event: any) {
    if (
      this.router.url.includes(
        "/reports/attachment-document/rfc/case-activity"
      ) ||
      this.router.url.includes("/reports/attachment-document/case-activity") ||
      this.router.url.includes("/reports/attachment-document/rfc/assessment") ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/court-orders"
      ) ||
      this.router.url.includes("/reports/attachment-document/assessment") ||
      this.router.url.includes("/reports/attachment-document/court-orders") ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/monthly-reports"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/case-plan-goals"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/case-plan-goals"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/credit-tracking"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/general-education"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/special-education"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/attending-school"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/grade-level"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/school-release"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/home-school"
      ) ||
      this.router.url.includes("/reports/client/documents") ||
      this.attachementStatus
    ) {
      this.clientBulkUpdate(event);
      if (this.clientBulkUpdateSelectedClients.length > 0) {
        this.multiDelete = true;
      } else {
        this.multiDelete = false;
      }
      return event;
    } else {
      this.clientBulkUpdate(event);
      if (this.clientBulkUpdateSelectedClients.length > 0) {
        this.isQuickUpdate = true;
      } else {
        this.isQuickUpdate = false;
      }
      return event;
    }
  }
  dis_step_1 = false;

  navigateToFormView(addLink: any) {
    // this is to set previousurl before navigation
    this._localValues.previousurl = this.router.url.split("?")[0];
    // this.isPersonMasterWizardOpen = false;
    // if (this.personTypesUrl.includes(this.router.url)) {
    //   localStorage.removeItem("dublicate_client_datas");
    //   this.isPersonMasterWizardOpen = true;
    //   console.log("Triggered navigato form", this.isPersonMasterWizardOpen);
    // }
    // if (this.queryParam == 'livingArrangment') {
    //   return this.router.navigate([addLink],
    //     { queryParams: { module: 'livingArrangment', 'action': 'create' }, queryParamsHandling: 'merge' })
    // }
    // else {
    //   return this.router.navigate([addLink], { queryParams: this.customQueryParams, queryParamsHandling: 'merge' });
    // }
    if (this.master === "provider-adults" || this.master === "provider-child") {
      return (this.isPersonMasterValidation = true);
    }
    if (this.master === "recruitment-referral") {
      let loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      let request = {
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
        recruitmentInquiryID: parseInt(
          localStorage.getItem("recuritmentInquiryID")
        ),
        // recruitmentInquiryID: 8446,
        staffID: parseInt(localStorage.getItem("UserId")),
        // staffID: 4620
      };
      this._opencards
        .createNewRecuritmentReferral(request)
        .then((data: any) => {
          loader.style.display = "none";
          if (data.responseStatus) {
            window.open(
              `${environment.uri}:8081/loadDocument/${data.pdfDocId}`,
              "popup",
              "width=600,height=600,toolbar=no,titlebar=no"
            );
            return;
          } else {
            return swal("Unable to open!", `${data.responseMessage}`, "info");
          }
        });
    }if(addLink==="/claims/list/add"){
      window.open(
        addLink,
        "_blank",
        "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
      );
    }else{
      return this.router.navigate([addLink], {
        queryParams: this.customQueryParams,
        queryParamsHandling: "merge",
      });
    }   
  }

  billableLimitFilter(event: any) {
    // switch(event.value) {
    //   case 'all':
    //       this.rowData;
    //   break;
    //   case 'new':
    //       this.rowData;
    //   break;
    //   case 'billable':

    //   break;
    //   case 'billable_not_billed':
    //       this.rowData;
    //   break;
    //   case 'billable_and_billed':
    //       this.rowData;
    //   break;
    // }
    if (event.value == "billable") {
      this.rowData = this.rowData.filter((item: any) => {
        if (item.Billable) {
          return item;
        }
      });
    } else if (event.value == "billable_not_billed") {
      this.rowData = this.rowData.filter((item: any) => {
        if (item.Billable && !item.BilledDate) {
          return item;
        }
      });
    } else {
      return this.getPerson(this.initial, this.end);
    }
  }

  updateClient() {
    this.isUpdateLoading = true;
    let clientIds: any, updatedDetails: any, req: any;
    if (this.client.address !== undefined && this.client.cellPh !== undefined) {
      clientIds = this.clientBulkUpdateSelectedClients;
      !isNullOrUndefined(this.client.address)
        ? (this.client.address = this.client.address)
        : null;
      !isNullOrUndefined(this.client.cellPh)
        ? (this.client.cellPh = this.client.cellPh)
        : null;
      if (this.client.address !== undefined) {
        this.client.address;
      } else {
        this.client.address = null;
      }
      if (this.client.cellPh !== undefined) {
        this.client.cellPh;
      } else {
        this.client.cellPh = null;
      }
      updatedDetails = this.client;
      req = {
        multiClient: {
          clientID: clientIds,
        },
        updateDetails: updatedDetails,
      };
      this._opencards
        .clientBulkRecUpdate(req)
        .then(() => {
          this.isUpdateLoading = false;
          swal("Updated!", "Client information has been updated", "success");
        })
        .then(() => {
          this.client = new Client();
          this.isClientBulkUpdateDisplay = false;
        });
    } else {
      this.isUpdateLoading = false;
      swal("Info", "Please enter the value", "warning");
    }
  }

  exit() {
    return swal(
      "Record not found!",
      "For this record the parent record detils is not found!",
      "info"
    );
  }

  clientBulkUpdate(event: any) {
    if (
      this.router.url.includes(
        "/reports/attachment-document/rfc/case-activity"
      ) ||
      this.router.url.includes("/reports/attachment-document/case-activity") ||
      this.router.url.includes("/reports/attachment-document/rfc/assessment") ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/court-orders"
      ) ||
      this.router.url.includes("/reports/attachment-document/assessment") ||
      this.router.url.includes("/reports/attachment-document/court-orders") ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/monthly-reports"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/case-plan-goals"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/case-plan-goals"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/credit-tracking"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/general-education"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/special-education"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/attending-school"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/grade-level"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/school-release"
      ) ||
      this.router.url.includes(
        "/reports/attachment-document/rfc/home-school"
      ) ||
      this.router.url.includes("/reports/client/documents") ||
      this.attachementStatus
    ) {
      if (event.node.selected) {
        if (event.data.cmsCisPdfDocID && event.data.scannedDocumentID) {
          this.clientBulkUpdateSelectedClients.push(event.data.cmsCisPdfDocID);
        } else if (event.data.scannedDocumentID) {
          this.clientBulkUpdateSelectedClients.push(
            event.data.scannedDocumentID
          );
        } else if (event.data.ScannedDocumentID) {
          this.clientBulkUpdateSelectedClients.push(
            event.data.ScannedDocumentID
          );
        }
      } else {
        this.clientBulkUpdateSelectedClients.map((item: any) => {
          if (item == event.data.ScannedDocumentID) {
            this.clientBulkUpdateSelectedClients.splice(
              this.clientBulkUpdateSelectedClients.indexOf(item),
              1
            );
          } else if (item == event.data.scannedDocumentID) {
            this.clientBulkUpdateSelectedClients.splice(
              this.clientBulkUpdateSelectedClients.indexOf(item),
              1
            );
          } else if (item == event.data.cmsCisPdfDocID) {
            this.clientBulkUpdateSelectedClients.splice(
              this.clientBulkUpdateSelectedClients.indexOf(item),
              1
            );
          }
        });
      }
      return this.clientBulkUpdateSelectedClients;
    } else {
      if (event.node.selected) {
        this.clientBulkUpdateSelectedClients.push(event.data.ClientID);
      } else {
        this.clientBulkUpdateSelectedClients.map((item: any) => {
          if (item == event.data.ClientID) {
            this.clientBulkUpdateSelectedClients.splice(
              this.clientBulkUpdateSelectedClients.indexOf(item),
              1
            );
          }
        });
      }
      return this.clientBulkUpdateSelectedClients;
    }
  }

  clientUpdateFormValidation() {
    this.clientBulKUpdateForm = this._formBuilder.group({
      address: [null, Validators.compose([Validators.minLength(3)])],
      cellPh: [null, Validators.compose([Validators.minLength(10)])],
    });
  }
  deleteFile() {
    var requestObject = {
      module: this.attach_module_name,
      moduleID: this.clientBulkUpdateSelectedClients,
      staffID: isNullOrUndefined(localStorage.getItem("UserId"))
        ? 5130
        : localStorage.getItem("UserId"),
    };
    this._opencards.file_Delete(requestObject).then((data) => {
      this.clientBulkUpdateSelectedClients = [];
      this.getPerson(this.initial, this.end);
    });
  }

  /**Rule: If provider has end date the add option will disable in the critical incidents list view */
  async providerCriticalIncidentRuleCheck() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {},
      selectedProviderID: number,
      isProviderEnd = false;
    selectedProviderID =
      parseInt(localStorage.getItem("providerID")) -
      this._opencards.getHasKey();
    req = { providerID: selectedProviderID };
    let result = this._opencards.getByIdProvider(req).then((data: any) => {
      loader.style.display = "none";
      if (data.Provider.endDate !== null) {
        return (isProviderEnd = true);
      } else {
        return (isProviderEnd = false);
      }
    });
    isProviderEnd = await result;

    return isProviderEnd;
  }

  getListViewInfomation() {
    this.isLoadText = true;
    /**********************************Based on client********************************************************** */
    this._opencards
      .listViewOfOpencardsByClient(
        { openCard: "cases", beginPagination: 1, endPagination: 100 },
        this.selectedRowId
      )
      .then((data: any) => {
        this.isLoadText = false;
        this.casesList = data.openCardList;
      });

    this._opencards
      .listViewOfOpencardsByClient(
        {
          openCard: "ClientMedication",
          beginPagination: 1,
          endPagination: 100,
        },
        this.selectedRowId
      )
      .then((data: any) => {
        this.isLoadText = false;
        this.medicationsList = data.openCardList;
      });

    this._opencards
      .listViewOfOpencardsByClient(
        { openCard: "ClientAllergies", beginPagination: 1, endPagination: 100 },
        this.selectedRowId
      )
      .then((data: any) => {
        this.isLoadText = false;
        this.allergiesList = data.openCardList;
      });

    this._opencards
      .listViewOfOpencardsByClient(
        { openCard: "ClientProfile", beginPagination: 1, endPagination: 100 },
        this.selectedRowId
      )
      .then((data: any) => {
        this.isLoadText = false;
        this.profileList = data.openCardList;
      });

    this._opencards
      .listViewOfOpencardsByClient(
        { openCard: "ClientStrength", beginPagination: 1, endPagination: 100 },
        this.selectedRowId
      )
      .then((data: any) => {
        this.isLoadText = false;
        this.strengthList = data.openCardList;
      });

    this._opencards
      .listViewOfOpencardsByClient(
        { openCard: "CourtCase", beginPagination: 1, endPagination: 100 },
        this.selectedRowId
      )
      .then((data: any) => {
        this.isLoadText = false;
        this.courtCaseList = data.openCardList;
      });

    this._opencards
      .listViewOfOpencardsByClient(
        {
          openCard: "ClientPreventativeMeasure",
          beginPagination: 1,
          endPagination: 100,
        },
        this.selectedRowId
      )
      .then((data: any) => {
        this.isLoadText = false;
        this.preventativeMeasurementList = data.openCardList;
      });

    this._opencards
      .listViewOfOpencardsByClient(
        {
          openCard: "UnusualIncident",
          beginPagination: 1,
          endPagination: 100,
          value: "",
          sort: { column: "UnusualIncidentID", mode: "desc" },
        },
        this.selectedRowId
      )
      .then((data: any) => {
        this.isLoadText = false;
        this.unusualIncidentList = data.openCardList;
        this.unusualIncidentRMList = data.openCardList;
      });

    this._opencards
      .getClientTLPById({
        clientID: this.selectedRowId,
        beginPagination: 1,
        endPagination: 100,
        sort: { column: "clientTPLID", mode: "desc" },
      })
      .then((data: any) => {
        this.isLoadText = false;
        this.liabilityList = data.ClientTPL;
      });

    this._opencards
      .getCaseActivityAttachmentList({
        clientID: this.selectedRowId,
        beginPagination: 1,
        endPagination: 100,
        sort: { column: "ScannedDocumentID", mode: "desc" },
      })
      .then((data: any) => {
        this.isLoadText = false;
        this.attachedDocsList = data.attachDocList;
      });

    this._opencards
      .listCustomerCare({
        clientID: this.selectedRowId,
        beginPagination: 1,
        endPagination: 100,
        sort: { column: "custCareReportID", mode: "desc" },
      })
      .then((data: any) => {
        this.isLoadText = false;
        this.customerCareList = data.custCareReport;
      });

    /**********************************Based on client and referral********************************************************** */
  }

  getSelectedCaseInfo(selectedObj: any, node: string) {
    this.selectedCaseId = selectedObj.referralID;
    this.selectedReferralType = selectedObj.ReferralType;
    console.log(
      "selected primary keys",
      selectedObj.referralID,
      this.selectedRowId
    );
    if (node == "assessment") {
      this._opencards
        .getAssessementsByClient({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "assessmentID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.assessmentList = data.assessment;
        });
    }
    if (node == "caseActivity") {
      this._opencards
        .getCaseActivityList({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "beginDate", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.caseActivityList = data.CaseActivity;
        });
    }
    if (node == "caseEvaluation") {
      this._opencards
        .getcaseEvolutionList({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "evaluationID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.caseEvaluationsList = data.evaluation;
        });
    }
    if (node == "casePlanGoal") {
      this._opencards
        .getCasePlanGoalsList({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "casePlanID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.casePlanGoalList = data.casePlan;
        });
    }
    if (node == "caseTeam") {
      this._opencards
        .listCaseTeam({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "caseTeamID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.caseTeamList = data.casePlan;
        });
    }
    if (node == "courtOrder") {
      this._opencards
        .listAllCourtOrder({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "courtOrderedID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.courtOrdersList = data.casePlan;
        });
    }
    if (node == "homeCounty") {
      this._opencards
        .getHomeCountyList({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "homeCountyID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.homeCountyList = data.homeCounty;
        });
    }
    if (node == "kipp") {
      this._opencards
        .listKippPmto({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "kippID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.kippPMTOList = data.KIPP;
        });
    }
    if (node == "lackOfContact") {
      this._opencards
        .getlackOfContactList({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "ScannedDocumentID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.lackOfContactList = data.lackOfContactCaseActivity;
        });
    }
    if (node == "ntff") {
      this._opencards
        .getNTFFList({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "NonTherapyFaceToFaceID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.ntffList = data.nonTherapyFaceToFace;
        });
    }
    if (node == "phase") {
      this._opencards
        .getAllPhaseList({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "phaseID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.phaseList = data.Phase;
        });
    }
    if (node == "progressNote") {
      this._opencards
        .listAllProgressNote({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "progressNoteID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.progressNoteList = data.progressNote;
        });
    }
    if (node == "progressNoteDiagnosis") {
      this._opencards
        .listALLPNDiagnosis({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "progressNoteDiagnosisID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.progressNoteDiagnosisList = data.ProgressNoteDiagnosis;
        });
    }
    if (node == "referralEvents") {
      this._opencards
        .listALLReferralEvents({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "referralEventID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.referralEventsList = data.referralEvent;
        });
    }
    if (node == "sfcsOffice") {
      this._opencards
        .getSFCSOfficeList({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "sfaOfficeActivityID", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.sfaOfficeList = data.SFAOfficeActivity;
        });
    }
    if (node == "supervisoryStaffing") {
      this._opencards
        .getListAllSupervisoryStaffing({
          referralID: selectedObj.referralID,
          clientID: this.selectedRowId,
          beginPagination: 1,
          endPagination: 100,
          sort: { column: "beginDate", mode: "desc" },
        })
        .then((data: any) => {
          this.isLoadText = false;
          this.supervisoryStaffingList = data.supervisoryStaffingCaseActivity;
        });
    }
    // this._opencards.getListFPBillabelCaseActivity({referralID:selectedObj.referralID,clientID:this.selectedRowId,beginPagination:1,endPagination:100,sort:{column:"CaseActivityID",mode:"desc"}})
    // .then((data: any)=>{this.isLoadText = false; this.billableCaseActivityList = data.billableCaseActivity})
  }

  showTime(timeStamp: number) {
    return this._localValues.getDateandTimeWithExt(timeStamp);
  }

  endDateCheck(timeStamp: number) {
    return timeStamp!
      ? `To ${this._localValues.getDateandTimeWithExt(timeStamp)}`
      : "";
  }

  openRecord(nodeCode: string, primaryKeyId: number) {
    console.log("navigate to", nodeCode, primaryKeyId);
    if (nodeCode == "caseActivity") {
      return this.router.navigate(
        ["/reports/referral/family-preservation/case-activity/detail"],
        {
          queryParams: {
            clientId: this.selectedRowId,
            "ref-id": this.selectedCaseId,
            "case-activity": primaryKeyId,
            "ref-type": this.selectedReferralType,
          },
          queryParamsHandling: "merge",
        }
      );
    }
  }
  cities = [
    { name: "NE", code: "NY" },
    { name: "KS", code: "RM" },
    { name: "FS", code: "LDN" },
  ];
  selectedCity: any;

  dis_step_2 = false;
  allDublicatesDatas = [];
  dublicateDatas = {
    person: "client",
    firstName: "",
    lastName: "",
    kaecses: null,
    ssn: null,
    nonContratClient: false,
  };
  selectedRow: Number;
  selectedValue: any;
  num_of_matc: any;
  selectPerson: any;
  updateRadio = false;
  nextDisStep() {
    if (
      this.dublicateDatas.firstName === "" &&
      this.dublicateDatas.lastName === ""
    ) {
      swal("Info", "Please enter the mandatory fields", "warning");
    } else {
      localStorage.setItem(
        "dublicate_client_datas",
        JSON.stringify(this.dublicateDatas)
      );
      var Req = {
        person: this.currentPersonType.value,
        firstName: this.dublicateDatas.firstName,
        lastName: this.dublicateDatas.lastName,
        kaecses: this.dublicateDatas.kaecses,
      };
      this._opencards.getPersonDublicates(Req).then((data: any) => {
        var personsWithSameFirstNameAndLastName =
          data.personsWithSameFirstNameAndLastName;
        if (data.personsWithSamekaecsesNumber) {
          var personsWithSamekaecsesNumber = data.personsWithSamekaecsesNumber;
          this.allDublicatesDatas = personsWithSameFirstNameAndLastName.concat(
            personsWithSamekaecsesNumber
          );
        } else {
          this.allDublicatesDatas = personsWithSameFirstNameAndLastName;
        }
        this.allDublicatesDatas.filter((ele) => {
          if ("DOB" in ele) {
            return (ele["DOB"] = moment(ele.DOB).format("MM/DD/YYYY"));
          } else {
            return;
          }
        });
        this.num_of_matc = this.allDublicatesDatas.length;
        if (this.allDublicatesDatas.length === 0) {
          this.updateRadio = true;
          this.selectedValue = "dontCreate";
        } else {
          this.updateRadio = false;
        }
        this.dis_step_1 = false;
        this.dis_step_2 = true;
      });
    }
  }

  setClickedRow(data, i) {
    this.selectPerson = data.ClientNameFirstLast;
    this.selectedRow = i;
    let clientID,
      encryptKey = this._opencards.getHasKey(),
      encryptedData: any,
      url: any;
    url = this.router.url;
    clientID = data.ClientID;
    encryptedData = clientID + encryptKey;
    this._localValues.clientChanges = true;
    localStorage.setItem("clientId", encryptedData);
  }
  nextStepDis() {
    let otherPersonUrl = this.personTypesValidation();
    if (otherPersonUrl) {
      this.router.navigate([otherPersonUrl], {
        queryParamsHandling: "preserve",
      });
    } else {
      if (this.selectedValue === "alreadyCreated") {
        localStorage.removeItem("dublicate_client_datas");
        this.router.navigate(["/reports/client/details"], {
          queryParamsHandling: "preserve",
        });
      } else {
        this.router.navigate(["/reports/client/new"], {
          queryParamsHandling: "preserve",
        });
      }
    }
  }
  backDis() {
    this.dis_step_1 = true;
    this.dis_step_2 = false;
  }
  closeTAb() {
    this.dis_step_1 = false;
  }

  openDeletedAuthorization() {
    console.log("Deleted authorizations", this.currentReferralID);
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencards
      .viewDeletePlacementAuthorization({ referralID: this.currentReferralID })
      .then((data: any) => {
        loader.style.display = "none";
        this.deletedAuthList = data.authorizationDeletedList;
        this.isOpenDeleteAuthListWindow = true;
      });
    // this.getDeletedAuthorizationPDFForms();
  }

  getPersonTypeFormCurrentUrl() {
    let currentPersonType = {};
    this.isKaecsesValidationDisable = false;
    this.isSSNValidationDisable = false;
    let listViewURL = this.router.url.includes("?")
      ? this.router.url.split("?")[0]
      : this.router.url;
    switch (listViewURL) {
      case "/reports/casaOfficer":
        this.isKaecsesValidationDisable = true;
        this.isPersontypeContractEnabled = false;
        currentPersonType = { view: "CASA Officer", value: "CasaOfficer" };
        this.searchForID = 9;
        break;
      case "/reports/client":
        currentPersonType = { view: "Client", value: "client" };
        this.searchForID = 1;
        break;
      case "/csClientList":
      case "/claims/list/view":
        currentPersonType = { view: "Client", value: "client" };
        this.searchForID = 18;
        break;
      case "/reports/communityMember":
        this.isKaecsesValidationDisable = true;
        this.isPersontypeContractEnabled = false;
        currentPersonType = {
          view: "Community Member",
          value: "CommunityMember",
        };
        this.searchForID = 11;
        break;
      case "/reports/court/service/officer":
        this.isKaecsesValidationDisable = true;
        break;
      case "/reports/crbOfficer":
        this.isKaecsesValidationDisable = true;
        this.isPersontypeContractEnabled = false;
        currentPersonType = { view: "CRB Officer", value: "CRBCoordinator" };
        this.searchForID = 10;
        break;
      case "/reports/csoStaff":
        this.isKaecsesValidationDisable = true;
        currentPersonType = { view: "CSO Staff", value: "CSOStaff" };
        this.searchForID = 41;
        break;
      case "/reports/dcf":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.isPersontypeContractEnabled = false;
        currentPersonType = { view: "DCF", value: "dcfStaff" };
        this.searchForID = 6;
        break;
      case "/reports/dhhsStaff":
        this.isKaecsesValidationDisable = true;
        break;
      case "/reports/dhsStaff":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        currentPersonType = { view: "DHS Staff", value: "DHSStaff" };
        this.searchForID = 32;
        break;
      case "/reports/familyMember":
        this.isKaecsesValidationDisable = true;
        this.isPersontypeContractEnabled = false;
        currentPersonType = { view: "Family Member", value: "FamilyMember" };
        this.searchForID = 3;
        break;
      case "/reports/guardianAdl":
        this.isKaecsesValidationDisable = true;
        this.isPersontypeContractEnabled = false;
        currentPersonType = { view: "Guardian Ad Litem", value: "GAL" };
        this.searchForID = 8;
        break;
      case "/reports/judge":
        this.isKaecsesValidationDisable = true;
        this.isPersontypeContractEnabled = false;
        currentPersonType = { view: "Judge", value: "Judge" };
        this.searchForID = 5;
        break;
      case "/reports/otherAgencyStaff":
        this.isKaecsesValidationDisable = true;
        currentPersonType = {
          view: "Other Agency Staff:",
          value: "OtherAgencyStaff",
        };
        this.searchForID = 40;
        break;
      case "/reports/payee/view":
        currentPersonType = { view: "Payee:" };
        this.searchForID = 25;
        break;
      case "/csPayee":
        currentPersonType = { view: "CS-Payee:" };
        this.searchForID = 26;
        break;
      case "/reports/payor/view":
        break;
      case "/reports/provider/view":
        currentPersonType = { view: "Provider" };
        this.searchForID = 13;
        break;
      case "/reports/providerMember":
        this.isSearchAny = true;
        this.isKaecsesValidationDisable = true;
        currentPersonType = {
          view: "Provider Member",
          value: "ProviderMember",
        };
        this.searchForID = 4;
        break;
      case "/reports/provider-sponser/view":
        currentPersonType = { view: "Provider Sponsor" };
        this.searchLabel = "Type here to search";
        this.searchForID = 16;
        break;
      case "/reports/staff":
        this.isKaecsesValidationDisable = true;
        currentPersonType = { view: "Staff", value: "Staff" };
        this.searchForID = 2;
        break;
      case "/reports/school/view":
        this.isKaecsesValidationDisable = true;
        currentPersonType = { view: "School", value: "School" };
        this.searchLabel = "Type here to search";
        this.searchForID = 12;
        break;
      case "/reports/dhsOffice/view":
        currentPersonType = { view: "DHS Office" };
        this.searchForID = 34;
        break;
      case "/reports/customer-care/list":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        currentPersonType = {
          view: "Customer Care Person",
          value: "CustomerCarePerson",
        };
        break;
      case "/reports/all/authorizations":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 20;
        currentPersonType = { view: "Authorization", value: "Authorization" };
        break;
      case "/reintegration/referral/opencard/assessments/view":
      case "/reports/referral/family-preservation/assessment/view":
        currentPersonType = { view: "Asssessment" };
        this.searchForID = 46;
        this.isAssessmentSearch = true;
        break;
      case "/reports/kansas/view":
        this.searchForID = 88;
        currentPersonType = {
          view: "Kansas",
          value: "Kansas",
        };
        break;
      case "/reports/oklahoma/view":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 88;
        currentPersonType = {
          view: "Oklahoma",
          value: "Oklahoma",
        };
        break;
      case "/reports/nebraska/view":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 88;
        currentPersonType = {
          view: "Nebraska",
          value: "Nebraska",
        };
        break;
      case "/reports/evaluation-creation/view":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 89;
        currentPersonType = {
          view: "Evaluation Type",
          value: "Evaluation Type",
        };
        break;
      case "/reports/version-creation/view":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 91;
        currentPersonType = {
          view: "Version Creation",
          value: "Version Creation",
        };
        break;
      case "/reports/evaluation-scale/view":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 94;
        currentPersonType = {
          view: "Evaluation Scale",
          value: "Evaluation Scale",
        };
        break;
      case "/reports/evaluation-question/view":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 92;
        currentPersonType = {
          view: "Evaluation Question",
          value: "Evaluation Question",
        };
        break;
      case "/reports/evaluation-question-group/view":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 88;
        currentPersonType = {
          view: "Evaluation Question Group",
          value: "Evaluation Question Group",
        };
        break;
      case "/reports/all/adoption-event":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 97;
        currentPersonType = {
          view: "Adoption Event",
          value: "Adoption Event",
        };
        break;
      case "/reports/all/appointments":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 98;
        currentPersonType = {
          view: "Appointment",
          value: "Appointment",
        };
        break;
      case "/reports/all/assessments":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 46;
        currentPersonType = {
          view: "Assessment",
          value: "Assessment",
        };
        break;
      case "/reports/all/bh-determination":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 99;
        currentPersonType = {
          view: "BH Determination",
          value: "BH Determination",
        };
        break;
      case "/reports/all/case-activity":
      case "/reports/referral/family-preservation/case-activity/view":
      case "/reintegration/referral/opencard/case-activity/view":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 43;
        currentPersonType = {
          view: "Case Activity",
          value: "Case Activity",
        };
        break;
      case "/reports/all/case-file-activity":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 100;
        currentPersonType = {
          view: "Case File Activity",
          value: "Case File Activity",
        };
        break;
      case "/reports/all/case-plan-goals":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 101;
        currentPersonType = {
          view: "Case Plan Goals",
          value: "Case Plan Goals",
        };
        break;
      case "/reports/all/case-team":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 45;
        currentPersonType = {
          view: "Case Team",
          value: "Case Team",
        };
        break;
      case "/reports/all/court-orders":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 80;
        currentPersonType = {
          view: "Court Order",
          value: "Court Order",
        };
        break;
      case "/reports/all/credit-tracking":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 102;
        currentPersonType = {
          view: "Credit Tracking",
          value: "Credit Tracking",
        };
        break;
      case "/reports/all/family-safety":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 84;
        currentPersonType = {
          view: "Family Safety",
          value: "Family Safety",
        };
        break;
      case "/reports/all/general-education":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 103;
        currentPersonType = {
          view: "General Education",
          value: "General Education",
        };
        break;
      case "/reports/all/home-county":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 87;
        currentPersonType = {
          view: "Home Country",
          value: "Home Country",
        };
        break;
      case "/reports/all/home-school":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 48;
        currentPersonType = {
          view: "Home School",
          value: "Home School",
        };
        break;
      case "/reports/all/immunization":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 104;
        currentPersonType = {
          view: "Immunization",
          value: "Immunization",
        };
        break;
      case "/reports/all/independent-living":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 105;
        currentPersonType = {
          view: "Independent Living",
          value: "Independent Living",
        };
        break;
      case "/reports/all/intensive-phase":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 106;
        currentPersonType = {
          view: "Intensive Phase",
          value: "Intensive Phase",
        };
        break;
      case "/reports/all/kan-be-healthy":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 107;
        currentPersonType = {
          view: "Kan Be Healthy",
          value: "Kan Be Healthy",
        };
        break;
      case "/reports/all/kipp":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 108;
        currentPersonType = {
          view: "Kipp",
          value: "Kipp",
        };
        break;
      case "/reports/all/kipp-pmto":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 108;
        currentPersonType = {
          view: "Kipp PMTO",
          value: "Kipp PMTO",
        };
        break;
      case "/reports/all/monthly-reports":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 44;
        currentPersonType = {
          view: "Monthly Reports",
          value: "Monthly Reports",
        };
        break;
      case "/reports/all/progress-note-diagnosis":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 109;
        currentPersonType = {
          view: "Progress Note Diagnosis",
          value: "Progress Note Diagnosis",
        };
        break;
      case "/reports/all/referral-events":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 110;
        currentPersonType = {
          view: "Referral Event",
          value: "Referral Event",
        };
        break;
      case "/reports/all/school-release":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 111;
        currentPersonType = {
          view: "School Release",
          value: "School Release",
        };
        break;
      case "/reports/all/waiver":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 113;
        currentPersonType = {
          view: "Waiver",
          value: "Waiver",
        };
        break;
      case "/reports/all/sfcs-office":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 14;
        currentPersonType = {
          view: "SFCS Office",
          value: "SFCS Office",
        };
        break;
      case "/reports/all/special-education":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 112;
        currentPersonType = {
          view: "Special Education",
          value: "Special Education",
        };
        break;
      case "/reports/all/social-securtiy-income":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 110;
        currentPersonType = {
          view: "Social Security Income",
          value: "Social Security Income",
        };
        break;
      case "/reports/all/non-intensive-phase":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 106;
        currentPersonType = {
          view: "Non Intensive Phase",
          value: "Non Intensive Phase",
        };
      case "/reports/all/third-party-liability":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 114;
        currentPersonType = {
          view: "Third Party Liability",
          value: "Third Party Liability",
        };
        break;
      case "/reports/all/preventative-measurements":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 67;
        currentPersonType = {
          view: "Preventative Measures",
          value: "Preventative Measures",
        };
        break;
      case "/reports/all/medication":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 68;
        currentPersonType = {
          view: "Medication",
          value: "Medication",
        };
        break;
      case "/reports/all/court-case":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 65;
        currentPersonType = {
          view: "Court Case",
          value: "Court Case",
        };
        break;
      case "/reports/all/client-strength":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 70;
        currentPersonType = {
          view: "Client Strength",
          value: "Client Strength",
        };
        break;
      case "/reports/all/client-profile":
        this.isKaecsesValidationDisable = true;
        this.isSSNValidationDisable = true;
        this.searchForID = 66;
        currentPersonType = {
          view: "Client Profile",
          value: "Client Profile",
        };
        break;
      case "/cs_claim_payee":
        currentPersonType = { view: "CS:Claim Payee", value: "CS:Claim Payee" };
        this.searchLabel = "Type here to search";
        this.searchForID = 28;
        break;
      case "/csProviderList":
        currentPersonType = { view: "Provider" };
        this.searchForID = 19;
        break;
    }
    if (
      this.router.url.includes("/provider_Authorization") ||
      this.router.url.includes("/payee_Authorization")
    ) {
      currentPersonType = {
        view: "Authorization ID",
        value: "AuthorizationID",
      };
      this.searchForID = 22;
      this.searchLabel = "Type here to search";
    }
    if (this.router.url.includes("/reports/client")) {
      currentPersonType = { view: "Client", value: "client" };
      this.searchForID = 1;
    }
    if (
      this.router.url.includes("/claims/list/cs-claim-list") ||
      this.router.url.includes("/claims/list/view") ||
      this.router.url.includes("/csClaimProvider")
    ) {
      currentPersonType = { view: "Claim", value: "claim" };
      this.searchLabel = "Type here to search";
      this.searchForID = 21;
    }
    return currentPersonType;
  }

  onSearchTypeSearch() {
    let request = {
      searchForID: this.searchForID,
      beginPagination: 1,
      endPagination: 25,
    };
    if (this.searchForID) {
      this.clildFormService.getSearchTypes(request).then((data) => {
        this.searchTypeSuggestions = data.dropDown;
      });
    } else {
      this.searchTypeSuggestions = [];
    }
  }

  // IF the searchType
  //  --->belongs to {DOB}, set dateValue flag in metaData as 'TRUE'
  //  --->belongs to {PayeeId,ClientID,Staff id}, set integerValue flag in metaData as 'TRUE'
  //  ELSE ---> set integerValue flag in metaData as 'TRUE'
  isAssessmentSearch = false;
  onSearchTypeSelection() {
    let metaData: any;
    this.searchInput = "";
    switch (this.searchType.searchType) {
      case "DOB":
      case "Completed date":
      case "Due date":
        this.searchLabel = "Type the date in 'mm-dd-yyyy' format";
        metaData = {
          integerValue: false,
          strValue: false,
          dateValue: true,
        };
        break;

      // case 'Completed date':
      //   this.searchLabel = "Type the date in 'yyyy-mm-dd' format"
      //   metaData = {
      //     integerValue: false,
      //     strValue: false,
      //     dateValue: true,
      //     "referralID": 63991,
      //     "clientID": 83763
      //   }
      //   break;

      case "PayeeId":
      case "ClientID":
      case "Staff id":
      case "ProviderID":
      case "ProcodeID":
      case "AuthorizationID":
        this.searchLabel = `Type a number to search`;
        metaData = {
          integerValue: true,
          strValue: false,
          dateValue: false,
        };
        break;

      default:
        this.searchLabel = "Type here to search";
        if (this.searchType.searchType == "Last, FirstName") {
          this.searchLabel = `${this.searchType.searchType}: Format: (Lastname,Firstname)`;
        } else if (this.searchType.searchType === "FirstName And LastName") {
          this.searchLabel =
            "Type here to search, Format: (Firstname Lastname)";
        }
        metaData = {
          integerValue: false,
          strValue: true,
          dateValue: false,
        };
    }

    this.searchDataTypeInfo = metaData;
  }

  isSearchValidationPassed() {
    let isSearchValidationPassed = true;
    if (this.searchDataTypeInfo) {
      let isDateSearched = this.searchDataTypeInfo.dateValue;
      let isIntegerSearched = this.searchDataTypeInfo.integerValue;

      if (isDateSearched) {
        isSearchValidationPassed = this.searchValidationResult("date");
      } else if (isIntegerSearched) {
        isSearchValidationPassed = this.searchValidationResult("integer");
      }
      return isSearchValidationPassed;
    }
  }

  searchValidationResult(dataToBeValidated) {
    let searchText = this.searchInput.replace(/'/g, "''");
    let regexPosition: number;
    let searchValidationMessage: string;
    let regex: RegExp;

    switch (dataToBeValidated) {
      case "date":
        regex =
          /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/g; /*date format yy/mm/dd */
        searchValidationMessage = "Please enter a valid date";
        regexPosition = searchText.search(regex);
        break;
      case "integer":
        regex = /^[-+]?\d+$/; /*integers */
        searchValidationMessage = "Please enter a valid number";
        regexPosition = searchText.search(regex);
        break;
    }
    regexPosition == -1
      ? (this.searchValidationMessage = searchValidationMessage)
      : null;

    return regexPosition == -1 ? false : true;
  }

  checkPlacementExportValidation() {
    let currentURLCheck = this.router.url;
    if (
      currentURLCheck.includes(
        "/reintegration/referral/opencard/placement/view"
      )
    ) {
      this.isPlacementExportEnabled = false;
    }
  }

  personTypesValidation() {
    let url: string;
    switch (this.currentPersonType.view) {
      case "DHS Staff":
        url = "/reports/dhsStaff/new";
        break;

      case "Customer Care Person":
        url = "/reports/customer-care/person/new";
        break;

      case "CASA Officer":
        url = "/reports/casaOfficer/new";
        break;

      case "Community Member":
        url = "/reports/communityMember/new";
        break;

      case "Guardian Ad Litem":
        url = "/reports/guardianAdl/new";
        break;

      case "CRB Officer":
        url = "/reports/crbOfficer/new";
        break;

      case "Judge":
        url = "/reports/judge/new";
        break;

      case "Family Member":
        url = "/reports/familyMember/new";
        break;

      case "DCF":
        url = "/reports/dcf/new";
        break;
    }
    return url;
  }

  assignPersonMasters() {
    let currentURL = this.router.url;
    if (
      currentURL === "/reports/client" ||
      currentURL.includes("/reports/provider/") ||
      currentURL.includes("/provider/") ||
      currentURL == "/claims/list/view" ||
      currentURL.includes("/reports/all") ||
      currentURL.includes("/claims/list/cs-claim-list") ||
      currentURL.includes("casaOfficer") ||
      currentURL.includes("communityMember") ||
      currentURL.includes("court/service/officer/") ||
      currentURL.includes("crbOfficer") ||
      currentURL.includes("csoStaff") ||
      currentURL.includes("customer-care") ||
      currentURL.includes("reports/dcf") ||
      currentURL.includes("dhhsStaff") ||
      currentURL.includes("dhsStaff") ||
      currentURL.includes("judge") ||
      currentURL.includes("otherAgencyStaff") ||
      currentURL.includes("providerMember") ||
      currentURL.includes("staff") ||
      currentURL.includes("familyMember") ||
      currentURL.includes("guardianAdl") ||
      currentURL.includes("payee") ||
      currentURL.includes("dhsOffice") ||
      currentURL.includes("payor") ||
      currentURL.includes("provider-sponser") ||
      currentURL.includes("guardianAdl") ||
      currentURL === "/reports/providerMember" ||
      currentURL === "/reports/otherAgencyStaff/details/providers" ||
      currentURL === "/reports/kansas/view" ||
      currentURL === "/reports/oklahoma/view" ||
      currentURL === "/reports/nebraska/view" ||
      currentURL === "/csPayee/payeeform/payee-AuthList"
    ) {
      return (this.isInfoBox = false);
    } else {
      if (
        currentURL.includes("/client") ||
        currentURL.includes("/reintegration") ||
        currentURL.includes("/medication") ||
        currentURL.includes("/reports") ||
        currentURL.includes("/claims")
      ) {
        if (
          this.router.url.includes("/claims/list/csClaimPayee-form/directAuth")
        ) {
          this.personType = "client";
          return (this.currentPrimaryValue =
            parseInt(localStorage.getItem("clientID")) -
            this._opencards.getHasKey());
        } else {
          this.personType = "client";
          return (this.currentPrimaryValue =
            parseInt(localStorage.getItem("clientId")) -
            this._opencards.getHasKey());
        }
      } else {
        this.personType = "provider";
        return (this.currentPrimaryValue =
          parseInt(localStorage.getItem("providerId")) -
          this._opencards.getHasKey());
      }
    }
  }
  isProviderInfoView = false;
  isWaitForProviderRes = false;
  providerData: any;
  showProviderProfile() {
    let currentURL = this.router.url;
    if (currentURL.includes("provider")) {
      if (
        currentURL === "/reports/provider/view" ||
        currentURL === "/reports/providerMember" ||
        currentURL.includes("provider-sponser") ||
        currentURL.includes("staff")
      ) {
        this.isProviderInfoView = false;
      } else {
        this.isInfoBox = false;
        this.isShowStaffInfoView = false;
        this.isWaitForProviderRes = true;
        let req = {},
          selctedProviderID: number;
        selctedProviderID =
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey();
        req["providerID"] = selctedProviderID;
        this._opencards.getProviderProfileInfo(req).then((data: any) => {
          this.providerData = data.profile[0];
          this.isProviderInfoView = true;
          this.isInfoBox = false;
          this.isWaitForProviderRes = false;
          console.log("this.providerData>>>>>", this.providerData);
        });
      }
    } else if (
      this.router.url.includes("/licensing-recruitment/view") ||
      this.router.url.includes("/recruitment-training/view") ||
      this.router.url.includes("/csProviderList") ||
      this.router.url.includes("/csProvider/csProviderForm")
    ) {
      this.isWaitForProviderRes = true;
      this.isInfoBox = false;
      this.isShowStaffInfoView = false;
      let req = {},
        selctedProviderID: number;
      selctedProviderID =
        parseInt(localStorage.getItem("providerID")) -
        this._opencards.getHasKey();
      req["providerID"] = selctedProviderID;
      this._opencards.getProviderProfileInfo(req).then((data: any) => {
        this.providerData = data.profile[0];
        this.isProviderInfoView = true;
        this.isWaitForProviderRes = false;
        console.log("this.providerData>>>>>", this.providerData);
      });
    } else {
      this.isProviderInfoView = false;
    }
  }
  isShowStaffInfoView = false;
  staffData: any;
  getStaffProfileInfo() {
    if (
      this.router.url.includes("/reports/staff/details") ||
      this.router.url.includes("/reports/staff/staffProvider") ||
      this.router.url.includes("/staff-opencards/recruitment-provider/view") ||
      this.router.url.includes("/reports/staff/caseList") ||
      this.router.url.includes("/reports/staff/staffProvider")
    ) {
      this.isWaitForProviderRes = true;
      this.isProviderInfoView = false;
      this.isInfoBox = false;
      var req = {
        staffID: parseInt(localStorage.getItem("staff_ID")),
      };
      this._opencards.getStaffInfo(req).then((data: any) => {
        this.staffData = data.profile;
        this.isShowStaffInfoView = true;
        this.isWaitForProviderRes = false;
      });
    } else {
      this.isShowStaffInfoView = false;
    }
  }
  staffNameData: any;
  getStaffNameProfileInfo() {
    if (
      this.router.url.includes("/reports/staff/details") ||
      this.router.url.includes("/reports/staff/staffProvider") ||
      this.router.url.includes("/staff-opencards/recruitment-provider/view") ||
      this.router.url.includes("/reports/staff/caseList") ||
      this.router.url.includes("/reports/staff/staffProvider")
    ) {
      this.isWaitForProviderRes = true;
      this.isProviderInfoView = false;
      this.isInfoBox = false;
      var req = {
        staffID: parseInt(localStorage.getItem("staff_ID")),
      };
      this._opencards.getStaffNameInfo(req).then((data: any) => {
        this.staffNameData = data.staffName;
        this.isShowStaffInfoView = true;
        this.isWaitForProviderRes = false;
      });
    } else {
      this.isShowStaffInfoView = false;
    }
  }
  isShowSchoolProfile = false;
  schoolData: any;
  getSchoolProfileInfo() {
    if (
      this.router.url.includes("/reports/school/attending-school") ||
      this.router.url.includes("/reports/school/home-school")
    ) {
      this.isWaitForProviderRes = true;
      this.isProviderInfoView = false;
      this.isInfoBox = false;
      this.isShowStaffInfoView = false;
      var req = {
        schoolID: this.clildFormService.getId(),
      };
      this._opencards.getByIdPersonTypeSchool(req).then((data: any) => {
        this.schoolData = data.school;
        this.isShowSchoolProfile = true;
        this.isWaitForProviderRes = false;
      });
    } else {
      this.isShowSchoolProfile = false;
    }
  }
  getSharedCaseActivityComponentStatus(event: any) {
    if (event == "close") this.isCaseActivityModal = false;
  }

  onDeleteAuthFormActionsClick(formValue: any) {
    switch (formValue) {
      case "ackVoid":
        this.isPlacementAck = true;
        break;
      case "ackVoidReturn":
        this.isPlacementAckReturn = true;
        break;
      case "noclVoid":
        break;
      case "psaVoid":
        this.isPSAPrompt = true;
        break;
      case "paVoidFCH":
        this.isPlacementAgreementFCH = true;
        break;
      case "paVoidAA":
        this.isPlacementAgreementKinship = true;
        break;
      case "paKN":
        this.isPlacementAgreementKinshipNonPaid = true;
        break;
      case "paPAI":
        break;
      case "paPAII":
        break;
      case "PDFOld":
        break;
    }
  }

  personMasterValidationWizardOut(event) {
    console.log("person master validation out", event);
    this.providerMemberFormComponent.setAutoFetchValues(event);
    if (event.isSelection == "createNew") {
      this.providerMemberFormComponent.isComponent = false;
      this.isComponent = false;
      if (this.master === "provider-adults") {
        this.isAdult = true;
        this.isProviderMemberAdult = true;
      } else if (this.master === "provider-child") {
        this.isAdult = false;
        this.isProviderMemberChildren = true;
      } else {
        this.isAdult = false;
        this.isProviderMemberCreation = true;
      }
      this.isPersonMasterValidation = false;
    } else if (event.isSelection == "continue") {
      this.providerMemberFormComponent.setAutoFetchValues(event);
      if (this.master === "provider-adults") {
        this.isAdult = true;
        this.isProviderMemberAdult = true;
      } else if (this.master === "provider-child") {
        this.isAdult = false;
        this.isProviderMemberChildren = true;
      } else {
        this.isAdult = false;
        this.isProviderMemberCreation = true;
      }
      this.isPersonMasterValidation = false;
    } else {
      return;
    }
  }
  isProviderMemberChildren = false;
  onProviderMemeberComSave(event: any) {
    console.log("Provider memebr save", event);
    if (!event.isProviderFormstatus) {
      this.isProviderMemberCreation = false;
      this.isProviderMemberAdult = false;
      this.isProviderMemberChildren = false;
      this.getPerson(1, 100);
    }
  }

  onEventPRTFSave(event: any) {
    if (event.isSave) {
      this.getPerson(1, 100);
    }
  }

  onEventPRTFUpdate(event: any) {
    if (event.isUpdate) {
      this.getPerson(1, 100);
    }
  }

  onEnterSearch(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      return this.search_btn();
    } else {
      return;
    }
  }
  goToClientForm(eve) {
    console.log(">>>eve<<<", eve);
    if (this.router.url.includes("/reports/staff/caseList")) {
      var encryptKey = this._opencards.getHasKey();
      var encryptedData = eve.data.clientID + encryptKey;
      localStorage.setItem("clientId", encryptedData);
      this.router.navigate(["/reports/staff/client/details"], {
        queryParamsHandling: "merge",
      });
    }
  }

  public async onClickDeleteAuthExport(selectedDeleteAuth: any, event) {
    setTimeout(() => {
      event.path[2].firstChild.removeAttribute("disabled");
    }, 7000);
    switch (selectedDeleteAuth) {
      case "ACK (Void) - Acknowledgement":
        this.deletedPDFDocID =
          this._localValues.referralNotificationOfMovePlacementChangeVoidDocID;
        window.open(
          `${environment.uri}:8081/loadDocument/${this._localValues.referralNotificationOfMovePlacementChangeVoidDocID}`,
          "popup",
          "width=600,height=600,toolbar=no,titlebar=no"
        );
        break;
      case "ACKR (Void) - Acknowledgement (Return)":
        this.deletedPDFDocID =
          this._localValues.referralNotificationOfMovePlacementChangeDocIDReturn;
        window.open(
          `${environment.uri}:8081/loadDocument/${this._localValues.referralNotificationOfMovePlacementChangeDocIDReturn}`,
          "popup",
          "width=600,height=600,toolbar=no,titlebar=no"
        );
        break;
      // case `NOCL (Void)- Notice Of Child's Location`:
      //   break;
      case "PSA (Void) - Provider Service Agreement":
        this.deletedPDFDocID =
          this._localValues.providerServiceAgreementDocIDVoid;
        window.open(
          `${environment.uri}:8081/loadDocument/${this._localValues.providerServiceAgreementDocIDVoid}`,
          "popup",
          "width=600,height=600,toolbar=no,titlebar=no"
        );
        break;
      // case 'PA (Void) - Placement Agreement (Foster Care Homes/Kinship Non-Relative)':
      //   break;
      // case 'PA (Void) - Placement Agreement (Kinship/Agency Approved)':
      //   break;
      // case 'PA (Void) - Placement Agreement (Kinship Non-Paid)':
      //   break;
      // case 'PDF - Old PDF files':
      //   break;
    }
    return;
  }

  public async getDeletedAuthorizationPDFForms(
    selectedAuthorizationID: number,
    selectedPlacementDetailID: number
  ) {
    let request = {
      authorizationID: selectedAuthorizationID,
    };
    let response = await this._opencards.getDeleteAuthorizationPDFForms(
      request
    );
    this.selectedPlacementDetailID = selectedPlacementDetailID;
    this.isDeleteAuthFormActionsList = !this.isDeleteAuthFormActionsList;
    this._localValues.referralNotificationOfMovePlacementChangeDocIDReturn =
      response.ReferralNotificationOfMovePlacementChangeRespiteReturnVoid.pdfDocID;

    this._localValues.referralNotificationOfMovePlacementChangeVoidDocID =
      response.referralNotificationOfMovePlacementChangeVoid.pdfDocID;

    this._localValues.providerServiceAgreementDocIDVoid =
      response.providerServiceAgreementVoid.pdfDocID;

    // return (this._localValues.providerServiceAgreementDocID =
    //   response.providerServiceAgreement.pdfDocID);
  }

  public async onClickSendDeleteAuthorizationEmail(
    selectedDeleteAuthLabel: string
  ) {
    await this.getDeletedAuthEmailRecepits();
    this.isEmailCheckboxView = true;
    this.getDeletedAuthPDFDocID(selectedDeleteAuthLabel);
  }

  public async getDeletedAuthEmailRecepits() {
    this.authDeleteOtherEmail = "";
    this.mailStatusIndication = "";
    let request = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencards.getHasKey(),
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencards.getHasKey(),
      placementDetailID: this.selectedPlacementDetailID,
      isFlowChart: false,
    };
    let response = await this._opencards.getEmailRequest(request);
    if (response.responseStatus) {
      this.isStaffEmail = response.isstaff;
      this.isStaffDCF = response.isstaff;
      this.isCaseTeamEmail = response.iscaseteam;
    } else {
      swal("Info", "Unable to fetch the email recepients!", "info");
    }
  }

  public getDeletedAuthPDFDocID(selectedDeleteAuthLabel: string) {
    this.deleteAckFormHeader = "Send Email - " + selectedDeleteAuthLabel;
    switch (selectedDeleteAuthLabel) {
      case "ACK (Void) - Acknowledgement":
        this.deletedPDFDocID =
          this._localValues.referralNotificationOfMovePlacementChangeVoidDocID;
        break;
      case "ACKR (Void) - Acknowledgement (Return)":
        this.deletedPDFDocID =
          this._localValues.referralNotificationOfMovePlacementChangeDocIDReturn;
        break;
      // case `NOCL (Void)- Notice Of Child's Location`:
      //   break;
      case "PSA (Void) - Provider Service Agreement":
        this.deletedPDFDocID =
          this._localValues.providerServiceAgreementDocIDVoid;
        break;
      // case 'PA (Void) - Placement Agreement (Foster Care Homes/Kinship Non-Relative)':
      //   break;
      // case 'PA (Void) - Placement Agreement (Kinship/Agency Approved)':
      //   break;
      // case 'PA (Void) - Placement Agreement (Kinship Non-Paid)':
      //   break;
      // case 'PDF - Old PDF files':
      //   break;
    }
  }

  public async sendAnEmailForDeleteAuth() {
    let request = {
      pdfDocId: this.deletedPDFDocID,
      isStaff: this.isStaffEmail,
      isDCF: this.isStaffDCF,
      clientID:
        parseInt(localStorage.getItem("clientId")) -
        this._opencards.getHasKey(),
      staffID: parseInt(localStorage.getItem("UserId")) || 14781,
      Others: [this.authDeleteOtherEmail],
    };
    this.mailStatusIndication = "Sending...";
    let response = await this._opencards.sendEmailPlacementPrintForms(request);
    if (response.responseStatus) {
      this.mailStatusIndication = "";
      swal("Sent", "The email has been sent successfully!", "success");
      this.isEmailCheckboxView = false;
    } else {
      this.mailStatusIndication = "";
      swal(
        "Failed",
        "Unable to procees your request, Please contact administrator!",
        "error"
      );
    }
  }

  placementDateValidationExitOut(event) {
    if (event) {
      this.isPlacementDateValidationOpen = false;
    }
  }

  addBtnControlForStaffMaster() {
    let currentLoginUserID = document.cookie.match(
      new RegExp("userId" + "=([^;]+)")
    )
      ? parseInt(document.cookie.match(new RegExp("userId" + "=([^;]+)"))[1])
      : 4620;
    if (this.router.url.includes("reports/staff")) {
      if (this.staffCreationUsers.includes(currentLoginUserID)) {
        this.isAddBtnVisible = "true";
      } else {
        this.isAddBtnVisible = "false";
      }
    } else {
      this.isAddBtnVisible = "true";
    }
  }

  public navigateFormViewWithQueryParams(rowData: any): Promise<any> {
    if (this.master === "caseactivity") {
      return this.router.navigate(
        ["/reintegration/referral/opencard/case-activity/detail"],
        {
          queryParams: { caid: rowData[this.columnToSorted] },
          queryParamsHandling: "merge",
        }
      );
    }
  }
}
