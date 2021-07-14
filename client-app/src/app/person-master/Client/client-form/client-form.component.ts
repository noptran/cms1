import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { MessageService } from "primeng/api";
import swal from "sweetalert2";
import { isNullOrUndefined, isObject, isUndefined } from "util";
import { ClildFormService } from "../../../child-forms/child-forms.service";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import { ReferralViewService } from "../../../referral-view/referral-view.service";
import { TeamFormService } from "../../../team-form/team-form.service";
import { CaseTeamService } from "./../../../case-team/case-team.service";
import { Client } from "./client";
import { ClientOpencards } from "./client-opencards";
import * as moment from "moment";
import { ProviderService } from "../../../provider/provider.service";
import { LocalValues } from "../../../local-values";
import { ManualAttachmentDoc } from "../../../cms-attachment-form/manual-attachment-doc-types";
import { PRTFComponent } from "../../../Shared/Components/PRTF/prtf.component";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { CLIENTID } from "../../../../constants/AppConstants";

@Component({
  selector: "app-client-form",
  templateUrl: "./client-form.component.html",
  styleUrls: ["./client-form.component.scss"],
})
export class ClientFormComponent implements OnInit {
  constructor(
    public _activateRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public clildFormService: ClildFormService,
    public _CaseTeamService: CaseTeamService,
    public _team: TeamFormService,
    public router: Router,
    public _referralView: ReferralViewService,
    public messageService: MessageService,
    public _openCard: OpencardsService,
    public ssn_number_activity: ProviderService,
    public _localValues: LocalValues
  ) {}

  @Input()
  formStatus?: any;
  Sidenav: boolean;
  orgForm: FormGroup;
  reportsViewList;
  Data;
  button: {};
  quickMenu = "client";
  groupByKeys = [];
  tableArray = [];
  showGroupByTable = false;
  filterSelected;
  groupedData = {};
  hideLoader = true;
  headers = [];
  rawdata = [];
  totalCount: any;
  beginPagination: any = 1;
  endPagination: any = 100;
  loaderController = false;
  personData: any;
  updateUser = false;
  clientId = null;
  clientName: any;
  insuranceType = [];
  raceData = [];
  ethnicity = [];
  tribe = [];
  zipcodeData = [];
  stateData = [];
  cityData = [];
  countyData = [];
  client_firstname_lastname: any;
  selectedReferral: any;
  userDetails;
  viewOnly: boolean;
  addOption = null;
  ssn_view_access = true;
  genderData = [
    { id: 0, itemName: "Male" },
    { id: 1, itemName: "Female" },
  ];

  ReportSettings = {
    singleSelection: true,
    text: "Select",
    selectAllText: "Select All ",
    unSelectAllText: "UnSelect All",
    enableSearchFilter: true,
    classes: "myclass custom-class",
    badgeShowLimit: 1,
  };
  listOfReferral = [];
  openCards = [];
  menuItems = [];
  results;
  showCity = true;
  stateID;
  title = "Client";
  status = "draft";
  breadcrumbs = [];
  isEditForm;
  mainTabs = [];
  sIndex;
  moreActions = [];
  form_navigation = false;
  subtitle: any;
  section3 = [
    "address",
    "cityID",
    "stateID",
    "zipcodeID",
    "countyID",
    "notes",
    "nonContractClient",
    "medicalID",
  ];
  section1 = [
    "firstName",
    "lastName",
    "acronym",
    "mi",
    "suffix",
    "dob",
    "notLiveBirth",
    "ssn",
    "conST",
    "kaecses",
    "genderID",
    "raceID",
  ];
  section2 = [
    "ethnicityID",
    "tribeID",
    "insuranceTypeID",
    "kees",
    "alternateID",
    "email",
    "homePh",
    "workPh",
    "cellPh",
    "fax",
    "kanCareMCO_ProviderID",
    "medicaid",
  ];
  invalid = [];
  opencard: ClientOpencards = new ClientOpencards();
  isZipcode = true;
  isCounty = true;
  client: Client = new Client();
  isSelectedReferralEmpty = false;
  listOfProviders = [];
  req: any;
  isAllowedUser = false;
  isEmail = true;
  show_ssn = false;
  display = false;
  client_ssn: any;
  isClientAttachments = false;
  uploadDocTypes = new ManualAttachmentDoc(
    this._openCard,
    this._localValues,
    this.router,
    this._activateRoute
  );
  scannedDocumentList: unknown;
  attachmentInfoText: string;
  isPRTF: boolean;
  // isKaecsesRequired = false;
  isDeleteAllConfirmation = false;
  isDeleteAllConfirmationDisable = false;
  selectedScanDocumentIdForDelete: any;
  attachmentDeleteBtnLabel = "Confirm";
  Kaecses = "Kaecses";
  @ViewChild(PRTFComponent, { static: true }) prtfComponent: PRTFComponent;
  isFormLog = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  showClientAlias = false;
  currentJumpToTreeID = null;
  currentJumpToTreeNode = null;

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
  clientInfo = null;
  opencaseReferralTypes = "open";
  referralValidationObject = {
    client: "",
    kk: null,
  };

  // onNonContractClientChange(event?: any, nonContractValue?: boolean) {
  //     if (event.checked || nonContractValue) {
  //         this.orgForm.addControl('kaecses', new FormControl('', [Validators.required]))
  //         this.isKaecsesRequired = true;
  //     } else {
  //         this.orgForm.removeControl('kaecses');
  //         this.isKaecsesRequired = false;
  //     }
  // }
  aliasData = {
    alias_FirstName: "",
    alias_LastName: "",
    alias_MI: "",
    alias_Suffix: "",
    beginDate: null,
    endDate: null,
    clientID: this.clientId,
  };
  allAliasList = [];
  clientAliasID: any;
  isDeleteConfirmation = false;
  alais_id: any;
  deleteConfirmationBtnLabel = "Confirm";
  isDeleteConfirmationDisable = false;
  infoText: string;
  public isSSNFormEditOptDisable = false;
  isClientDashboard = false;
  originalSSN: any;
  routeclientId: any;
  public CLIENT_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(CLIENTID)
  );

  ngOnInit() {
    // this is to get clientId from route url
    this._activateRoute.queryParams.subscribe((params) => {
      if (params && params.clientId) {
        this.routeclientId = parseInt(params.clientId);
      }
    });

    this.subscribeRoute();
    this.currentJumpToTreeNode =
      this._activateRoute.snapshot.queryParamMap.get("currentNode");
    this.currentJumpToTreeID = this._activateRoute.snapshot.queryParamMap.get(
      this.currentJumpToTreeNode
    );
    if (
      this._localValues.personInitialDetailsFromPersonMasterCreation &&
      this._localValues.personInitialDetailsFromPersonMasterCreation.conST
    ) {
      this.client.conST = {
        abbreviation:
          this._localValues.personInitialDetailsFromPersonMasterCreation.conST
            .abbreviation,
        stateID:
          this._localValues.personInitialDetailsFromPersonMasterCreation.conST
            .stateID,
      };
      if (
        this._localValues.personInitialDetailsFromPersonMasterCreation.conST
          .abbreviation == "OK"
      ) {
        this.Kaecses = "Oklahoma ID";
      }
    } else {
      this.client.conST = { abbreviation: "KS", stateID: 34 };
    }

    this.form_navigation = true;
    console.log(
      "Form person master validation",
      this._localValues.personInitialDetailsFromPersonMasterCreation
    );
    this.defineMainTabs();
    if (this.router.url.includes("client/details")) {
      this.getPersonById();
      this.showClientAlias = true;
      this.ssnNumberViewActivty();
    }
    if (this.router.url === "/reports/client/new") {
      !isNullOrUndefined(
        this._localValues.personInitialDetailsFromPersonMasterCreation.firstName
      )
        ? (this.client.firstName =
            this._localValues.personInitialDetailsFromPersonMasterCreation.firstName)
        : null;
      !isNullOrUndefined(
        this._localValues.personInitialDetailsFromPersonMasterCreation.lastName
      )
        ? (this.client.lastName =
            this._localValues.personInitialDetailsFromPersonMasterCreation.lastName)
        : null;
      !isNullOrUndefined(
        this._localValues.personInitialDetailsFromPersonMasterCreation.kaecses
      )
        ? (this.client.kaecses =
            this._localValues.personInitialDetailsFromPersonMasterCreation.kaecses)
        : null;
      !isNullOrUndefined(
        this._localValues.personInitialDetailsFromPersonMasterCreation
          .isNonContract
      )
        ? (this.client.nonContractClient =
            this._localValues.personInitialDetailsFromPersonMasterCreation.isNonContract)
        : null;
    }
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", active: "active" }
    );
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
        ReferralType: "PRTF",
        display: "Psychiatric Residential Treatment Theraphy (PRTF)",
      },
      {
        ReferralType: "SUB-RFC",
        display: "Sub-Contract Reintegration Foster Care(SUB-RFC)",
      }
    );
    this.openCards.push(
      { label: "Case(s)", icon: "", count: "", nav: "/reports/referral/view" },
      {
        label: "Court case number",
        icon: "",
        count: "",
        nav: "/reports/courtCase",
      },
      {
        label: "Non therapy face to face",
        icon: "",
        count: "",
        nav: "/reports/nonTherapyFaceToFace",
      },
      { label: "Client Profile", icon: "", count: "" },
      { label: "Medications and allergies", icon: "", count: "" },
      { label: "Client Strengths", icon: "", count: "" }
    );
    this.menuItems.push(
      { label: "Client" },
      { label: "Staff" },
      { label: "DHHS Staff" },
      { label: "DHS Staff" },
      { label: "CSO Staff" },
      { label: "CASA Officer" },
      { label: "Judge" },
      { label: "Provider Member" },
      { label: "Community Member" },
      { label: "Other Agency Staff" },
      { label: "CRB Officer" },
      { label: "Family Member" }
    );
    this.moreActions.push({
      tooltip: "click here to create a new referral",
      label: "Move to Referral",
    });
    this.setIndex(0);
    this.formValidation();
    this.riskMangamentUserRightsControl();

    if (this.router.url.includes("csPayeeInfoClient")) {
      this.getPersonById();
      this.showClientAlias = true;
      this.ssnNumberViewActivty();
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        { label: "CS - Payee List", href: "/csPayee", active: "" },
        { label: "CS - Payee Form", href: "/csPayee/payeeform", active: "" },
        {
          label: "CS - Payee - Direct Authorization List",
          href: "/csPayee/payeeform/payee-DirectAuthList",
          active: "",
        },
        {
          label: "CS - Payee - Direct Authorization Form",
          href: "/claims/list/dir_cs-payee/dir_csPayee-directAuth",
          active: "",
        },
        { label: "CS - Payee - Client Form", href: "", active: "active" },
      ];
      this.currentJumpToTreeNode = "direct_auth";
    }
    if (this.router.url.includes("csPayeeAuthInfoClient")) {
      this.getPersonById();
      this.showClientAlias = true;
      this.ssnNumberViewActivty();
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        { label: "CS - Payee List", href: "/csPayee", active: "" },
        { label: "CS - Payee Form", href: "/csPayee/payeeform", active: "" },
        {
          label: "CS Payee - Authorization List",
          href: "/csPayee/payeeform/payee-AuthList",
          active: "",
        },
        {
          label: "CS Payee - Authorization Form",
          href: "/reintegration/cs-payee/csPayeeAuthDetail",
          active: "",
        },
        { label: "CS - Payee - Client Form", active: "active" },
      ];
      this.currentJumpToTreeNode = "CS - Payee - Authorization - Client Form";
    }
  }
  onChangeReferrel(event) {
    const closeBtn = document.getElementById("closeBtn") as HTMLElement;
    if (event.ReferralType == "BG") {
      this.router.navigate([
        "/referral/family-preservation/new/referral/bridge/homes",
      ]);
      closeBtn.click();
    } else if (event.ReferralType == "NC") {
      this.router.navigate([
        "/referral/family-preservation/new/referral/nonContract",
      ]);
      closeBtn.click();
    }
  }
  defineMainTabs() {
    return (this.mainTabs = [
      { label: "Basic Information", href: "#nav-1" },
      { label: "Additional Information", href: "#nav-2" },
      // { label: 'Section 3', href: '#nav-3' },
      // { label: 'Section 4', href: '#nav-4' },
    ]);
  }

  setIndex(index: number) {
    this.sIndex = index;
  }

  sectionSelection() {
    switch (this.sIndex) {
      case 0:
        return this.section1;
      case 1:
        return this.section2;
      case 2:
        return this.section3;
    }
  }

  goNext() {
    const section = this.sectionSelection();
    const invalid = this.findInvalidControls(section);
    if (invalid.length > 0) {
      this.messageService.add({
        severity: "info",
        summary: "Invalid",
        detail: "Invalid",
      });
    } else {
      const tabName = this.mainTabs[this.sIndex + 1].href.split("#")[1];
      const previoustabName = this.mainTabs[this.sIndex].href.split("#")[1];
      const nav1 = document.getElementById(tabName);
      const nav2 = document.getElementById(previoustabName);
      nav1.classList.add("active");
      nav1.classList.add("in");
      nav2.classList.remove("active");
      nav2.classList.remove("in");
      this.setIndex(this.sIndex + 1);
    }
  }

  goPrevious() {
    const tabName = this.mainTabs[this.sIndex - 1].href.split("#")[1];
    const previoustabName = this.mainTabs[this.sIndex].href.split("#")[1];
    const nav1 = document.getElementById(tabName);
    const nav2 = document.getElementById(previoustabName);
    nav1.classList.add("active");
    nav1.classList.add("in");
    nav2.classList.remove("active");
    nav2.classList.remove("in");
    this.setIndex(this.sIndex - 1);
  }

  findInvalidControls(section) {
    this.invalid = [];
    const controls = this.orgForm.controls;
    for (const name in controls) {
      if (section.indexOf(name) !== -1) {
        if (controls[name].invalid) {
          this.invalid.push(name);
        }
      }
    }
    return this.invalid;
  }

  getUserById() {
    const userId = "7";
    // let userId = localStorage.getItem('UserId');
    this._team.getUserById({ staffID: parseInt(userId) }).then((data) => {
      if (data) {
        this.userDetails = data.users;
      }
    });
  }

  editForm() {
    this.orgForm.enable();
    this.form_navigation = false;
  }

  updateState() {
    const req = {
      Object: "state",
      value: this.Data.State,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.results = data.dropDown;
      // this.orgForm.controls['State'].setValue(data.dropDown[0]);
      this.Data.State = data.dropDown[0];
      this.updateSelectedState();
    });
  }

  updateGender() {
    const filtered: any[] = [];
    for (let i = 0; i < this.genderData.length; i++) {
      const gender = this.genderData[i];
      if (
        gender.itemName.toLowerCase().indexOf(this.Data.Gender.toLowerCase()) ==
        0
      ) {
        filtered.push(gender);
      }
    }
    this.results = filtered;
    this.Data.Gender = filtered[0];
  }

  updateSelectedState() {
    this.stateID = this.Data.State.stateID;
    const req = {
      stateID: this.Data.State.stateID,
    };
    this.clildFormService.getCityFromState(req).then((data) => {
      this.showCity = false;
      // this.orgForm.controls['City'].setValue(null);
      this.cityData = data.city;
      this.results = data.city;
      if (this.cityData.length > 0) {
        this.Data.City ? this.updatefilterCity() : null;
      }
    });
  }

  updatefilterCity() {
    const filtered: any[] = [];
    for (let i = 0; i < this.cityData.length; i++) {
      const country = this.cityData[i];
      if (
        country.city
          .toString()
          .toLowerCase()
          .indexOf(this.Data.City.toLowerCase()) == 0
      ) {
        filtered.push(country);
      }
    }
    this.results = filtered;
    this.Data.City = filtered[0];
    // this.orgForm.controls['City'].setValue(filtered[0]);
    console.log("@@@", this.Data.City);
    this.updateSelectedCity();
  }

  updateSelectedCity() {
    const req = {
      stateID: this.stateID,
      cityID: this.Data.City.cityID,
    };
    console.log("@@@", req);
    this.clildFormService.getZipcodeFromCityState(req).then((data) => {
      data.zipcode.length == 1
        ? this.orgForm.controls["zipcodeID"].setValue(data.zipcode[0])
        : this.updateZipcode();
      data.county.length == 1
        ? this.orgForm.controls["countyID"].setValue(data.county[0])
        : this.updateCounty();
    });
  }

  updateZipcode() {
    const filtered: any[] = [];
    for (let i = 0; i < this.zipcodeData.length; i++) {
      const country = this.zipcodeData[i];
      if (
        country.toLowerCase().indexOf(this.Data.zipcodeID.toLowerCase()) == 0
      ) {
        filtered.push(country);
      }
    }
    this.results = filtered;
    this.Data.zipcodeID = filtered[0];
    // this.orgForm.controls['Zipcode'].setValue(filtered[0]);
  }

  updateCounty() {
    const filtered: any[] = [];
    for (let i = 0; i < this.countyData.length; i++) {
      const country = this.countyData[i];
      if (
        country.toLowerCase().indexOf(this.Data.countyID.toLowerCase()) == 0
      ) {
        filtered.push(country);
      }
    }
    this.results = filtered;
    this.Data.countyID = filtered[0];
    // this.orgForm.controls['CountyName'].setValue(filtered[0]);
  }

  updateEthnicity() {
    const req = {
      Object: "ethnicity",
      value: this.Data.Ethnicity,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.ethnicity = data.dropDown;
      this.results = data.dropDown;
      this.Data.Ethnicity = data.dropDown[0];
    });
  }

  updateTribe() {
    const req = {
      Object: "tribe",
      value: this.Data.Tribe,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.tribe = data.dropDown;
      this.results = data.dropDown;
      this.Data.Tribe = data.dropDown[0];
    });
  }

  updateRace() {
    const req = {
      Object: "race",
      value: this.Data.Race,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.raceData = data.dropDown;
      this.results = data.dropDown;
      this.Data.Race = data.dropDown[0];
    });
  }

  updateInsuranceType() {
    const req = {
      Object: "insuranceType",
      value: this.Data.InsuranceType,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.raceData = data.dropDown;
      this.results = data.dropDown;
      this.Data.InsuranceType = data.dropDown[0];
    });
  }

  // loadDefaultForm() {
  //     this.updateDropdown();
  // }

  initializeFormWithData() {
    this.orgForm = this.formBuilder.group({
      firstName: [
        this.Data.firstName,
        Validators.compose([
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(25),
          // Validators.pattern("^[a-zA-Z_-]*$"),
        ]),
      ],
      lastName: [
        this.Data.lastName,
        Validators.compose([
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(25),
          // Validators.pattern("^[a-zA-Z_-]*$"),
        ]),
      ],
      dob: [this.Data.dob],
      genderID: [this.Data.genderID, Validators.compose([Validators.required])],
      raceID: [this.Data.raceID],
      address: [
        this.Data.address,
        Validators.compose([
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(75),
        ]),
      ],
      cityID: [this.Data.cityID, Validators.compose([Validators.required])],
      stateID: [this.Data.stateID, Validators.compose([Validators.required])],
      zipcodeID: [this.Data.zipcodeID],
      countyID: [this.Data.countyID],
      ssn: [this.Data.ssn, Validators.compose([Validators.required])],
      ethnicityID: [this.Data.ethnicityID],
      homePh: [this.Data.homePh],
      fax: [this.Data.fax],
      email: [this.Data.email, Validators.compose([Validators.required])],
      workPh: [this.Data.workPh],
      cellPh: [this.Data.cellPh],
      mi: [
        this.Data.mi,
        // Validators.compose([
        //   Validators.minLength(1),
        //   Validators.maxLength(2),
        //   Validators.pattern("^[a-zA-Z_-]*$"),
        // ]),
      ],
      suffix: [
        this.Data.suffix,
        // Validators.compose([
        //   Validators.minLength(1),
        //   Validators.maxLength(3),
        //   Validators.pattern("^[a-zA-Z_-]*$"),
        // ]),
      ],
      tribeID: [this.Data.tribeID],
      insuranceTypeID: [this.Data.insuranceTypeID],
      medicaid: [
        this.Data.medicaid,
        // Validators.compose([
        //   Validators.minLength(10),
        //   Validators.maxLength(10),
        //   Validators.pattern("^[0-9-+]+$"),
        // ]),
      ],
      isNotLiveBirth: [this.Data.isNotLiveBirth],
      kaecses: [
        this.Data.kaecses,
        // Validators.compose([
        //   Validators.minLength(10),
        //   Validators.maxLength(10),
        //   Validators.pattern("^[0-9-+]+$"),
        // ]),
      ],
      kees: [
        this.Data.kees,
        // Validators.compose([
        //   Validators.minLength(10),
        //   Validators.maxLength(10),
        //   Validators.pattern("^[0-9-+]+$"),
        // ]),
      ],
      alternateID: [
        this.Data.alternateID,
        // Validators.compose([
        //   Validators.minLength(10),
        //   Validators.maxLength(10),
        //   Validators.pattern("^[0-9-+]+$"),
        // ]),
      ],
      notes: [
        this.Data.notes,
        // Validators.compose([
        //   Validators.minLength(3),
        //   Validators.maxLength(225),
        // ]),
      ],
      acronym: [this.Data.acronym],
      nonContractClient: [this.Data.nonContractClient],
      conST: [this.Data.conST],
      medicalID: [this.Data.medicalID],
      kanCareMCO_ProviderID: [this.Data.kanCareMCO_ProviderID],
    });
    // this.orgForm.controls['City'].setValue(this.Data.City);
    this.orgForm.disable();
  }

  formValidation() {
    this.orgForm = this.formBuilder.group({
      firstName: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(25),
          // Validators.pattern("^[a-zA-Z_-]*$"),
        ]),
      ],
      lastName: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(25),
          // Validators.pattern("^[a-zA-Z_-]*$"),
        ]),
      ],
      dob: [null, Validators.compose([Validators.required])],
      genderID: [null, Validators.compose([Validators.required])],
      raceID: [null],
      address: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(75),
        ]),
      ],
      cityID: [null, Validators.compose([Validators.required])],
      stateID: [null, Validators.compose([Validators.required])],
      zipcodeID: [null],
      countyID: [null],
      ssn: [null],
      ethnicityID: [null],
      homePh: [null],
      fax: [null],
      email: [null],
      workPh: [null],
      cellPh: [null],
      mi: [null],
      suffix: [null],
      tribeID: [null],
      insuranceTypeID: [null],
      medicaid: [null],
      isNotLiveBirth: [false],
      kaecses: [null],
      kees: [null],
      alternateID: [null],
      notes: [null],
      acronym: [false],
      nonContractClient: [false],
      conST: [null, Validators.compose([Validators.required])],
      medicalID: [null],
      kanCareMCO_ProviderID: [null],
    });
  }

  assignDropdownValue(post) {
    post.dob = new Date(post.dob).getTime();
  }

  checkObjects(post) {
    if (post.genderID !== null && !isObject(post.genderID)) {
      return true;
    } else if (post.raceID !== null && !isObject(post.raceID)) {
      return true;
    } else if (post.cityID !== null && !isObject(post.cityID)) {
      return true;
    } else if (post.stateID !== null && !isObject(post.stateID)) {
      return true;
    } else if (post.zipcodeID !== null && !isObject(post.zipcodeID)) {
      return true;
    } else if (post.countyID !== null && !isObject(post.countyID)) {
      return true;
    } else if (post.tribeID !== null && !isObject(post.tribeID)) {
      return true;
    } else if (
      post.insuranceTypeID !== null &&
      !isObject(post.insuranceTypeID)
    ) {
      return true;
    } else if (post.ethnicityID !== null && !isObject(post.ethnicityID)) {
      return true;
    } else {
      return false;
    }
  }

  async addPost(post) {
    console.log("post>>>", post);
    if (this.client.nonContractClient) {
      this.addPostAfterValidation(post);
    } else {
      const loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      const req = {
        conST: {
          abbreviation: this.client.conST
            ? this.client.conST.abbreviation
            : "KS",
          stateID: this.client.conST ? this.client.conST.stateID : 34,
        },
        firstName: this.client.firstName,
        lastName: this.client.lastName,
        kaecses: parseInt(this.client.kaecses),
        person: "client",
      };
      if (this.client.clientID) {
        req["clientID"] = this.client.clientID;
      }
      if (this.router.url === "/reports/client/new") {
        req["clientID"] = 0;
      }

      if (this.client.kaecses == "00000000") {
        return swal("Warning", "You must enter a valid Kaecses", "info");
      }

      const validationResponse =
        await this._openCard.getKaeseDuplicationValidation(req);
      loader.style.display = "none";
      if (
        validationResponse.personsWithSameFirstNameAndLastName.length > 0 &&
        validationResponse.personsWithSameFirstNameAndLastName[
          validationResponse.personsWithSameFirstNameAndLastName.length - 1
        ].kaecses == post.kaecses
      ) {
        return this.addPostAfterValidation(post);
      }
      if (validationResponse.personsWithSameFirstNameAndLastName.length > 0) {
        const message = `Client Name: ${validationResponse.personsWithSameFirstNameAndLastName[0].firstName}, Client ID: ${validationResponse.personsWithSameFirstNameAndLastName[0].clientID}`;
        return Swal.fire(
          "Duplicate Kaeses Found on Clients:",
          message,
          "warning"
        );
      } else if (this.client.kaecses == "00000000") {
        return swal("Warning", "You must enter a valid Kaecses", "info");
      } else {
        return this.addPostAfterValidation(post);
      }
    }
  }

  async addPostAfterValidation(post: any) {
    console.log("this.orgForm is", this.orgForm);
    if (this.orgForm.valid) {
      // if (
      //   this._localValues.personInitialDetailsFromPersonMasterCreation
      //     .kaecsesValidation
      // ) {
      if (!this.duplicateKaeseValidation()) {
        this.formAction(post);
      }
      // } else {
      //   this.formAction(post);
      // }
    } else {
      swal("Warning", "Required fields are missing!", "info");
    }
  }

  goBack() {
    this.addOption = null;
  }

  discardForm() {
    this.router.navigate(["reports/client"]);
  }

  getState(event) {
    const req = {
      Object: "state",
      value: event.query,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.stateData = data.dropDown;
      this.results = data.dropDown;
    });
  }

  // getGender(ev) {
  //     let filtered: any[] = [];
  //     for (let i = 0; i < this.genderData.length; i++) {
  //         let gender = this.genderData[i];
  //         if (gender.itemName.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
  //             filtered.push(gender);
  //         }
  //     }
  //     this.results = filtered;
  // }

  getGender(event) {
    const req = {
      Object: "gender",
      value: event.query,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.genderData = data.dropDown;
      this.results = data.dropDown;
    });
  }

  handleDropdown() {}

  onClearing() {}

  onClearingState() {}

  getSelectedState(ev) {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.stateID = ev.stateID;
    const req = {
      stateID: ev.stateID,
    };
    this.clildFormService.getCityFromState(req).then((data) => {
      this.showCity = false;
      loader.style.display = "none";
      this.orgForm.controls["cityID"].setValue(null);
      this.orgForm.controls["zipcodeID"].setValue(null);
      this.orgForm.controls["countyID"].setValue(null);

      this.cityData = data.city;
      this.results = data.city;
    });
  }

  getSelectedCity(ev) {
    const req = {
      stateID: this.stateID,
      cityID: ev.cityID,
    };
    this.clildFormService.getZipcodeFromCityState(req).then((data) => {
      this.zipcodeData = data.zipcode;
      this.countyData = data.county;
      data.zipcode.length == 1
        ? this.orgForm.controls["zipcodeID"].setValue(data.zipcode[0])
        : (this.isZipcode = false);
      data.county.length == 1
        ? this.orgForm.controls["countyID"].setValue(data.county[0])
        : (this.isCounty = false);
    });
  }

  getZipcode(ev: any) {
    const filtered: any[] = [];
    this.zipcodeData.filter((data) => {
      if (data.zipcode.indexOf(ev.query) !== -1) {
        filtered.push(data);
      }
    });
    this.results = filtered;
  }

  getCounty(ev: any) {
    const filtered: any[] = [];
    this.countyData.filter((data) => {
      if (
        data.countyName.toLowerCase().indexOf(ev.query.toLowerCase()) !== -1
      ) {
        filtered.push(data);
      }
    });
    this.results = filtered;
  }

  filterCity(ev) {
    const filtered: any[] = [];
    for (let i = 0; i < this.cityData.length; i++) {
      const country = this.cityData[i];
      if (country.city.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.results = filtered;
  }

  getEthnicity(event) {
    const req = {
      Object: "ethnicity",
      value: event.query,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.ethnicity = data.dropDown;
      this.results = data.dropDown;
    });
  }

  getTribe(event) {
    const req = {
      Object: "tribe",
      value: event.query,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.tribe = data.dropDown;
      this.results = data.dropDown;
    });
  }

  getRace(event) {
    const req = {
      Object: "race",
      value: event.query,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.raceData = data.dropDown;
      this.results = data.dropDown;
    });
  }

  getInsuranceType(event) {
    const req = {
      Object: "insuranceType",
      value: event.query,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.insuranceType = data.dropDown;
      this.results = data.dropDown;
    });
  }

  getTodayDate() {
    let todayDate;
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    if (date !== "" && date !== null && JSON.stringify(date).includes("-")) {
      const myDate2 = date.split("-");
      let newDate = myDate2[0] + "/" + myDate2[1] + "/" + myDate2[2];
      todayDate = new Date(newDate).getTime();
    }
    return todayDate;
  }

  saveClient(post) {
    // post.enteredBy = this.userDetails.firstName;
    // post.enteredDate = this.getTodayDate();
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    post.dob == 0 ? (post.dob = null) : (post.dob = post.dob);
    console.log("Client details", post);
    this.clildFormService.saveClient(post).then((data) => {
      loader.style.display = "none";
      if (data.responseStatus) {
        swal("Success", "Client saved successfully", "success");
        this.router.navigate(["/reports/client"]);
      } else {
        swal("Oops!", "Client not saved", "warning").then((data) => {
          if (data) {
            this.isEditForm = false;
          }
        });
      }
    });
  }

  updateClient(post) {
    // post.changedBy = this.userDetails.firstName;
    // post.changedDate = this.getTodayDate();
    if (post.ssn !== null) {
      if (post.ssn.includes("X")) {
        post.ssn = this.originalSSN;
      }
    }
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.clildFormService.updateClient(post).then((data) => {
      loader.style.display = "none";
      if (data.responseStatus) {
        swal("Success", "Client updated successfully", "success");
        this.router.navigate(["/reports/client"]);
      } else {
        swal("Oops!", "Client not updated", "warning");
        this.router.navigate(["/reports/client/new"]);
      }
    });
  }

  add() {
    // this.loadDefaultFormInitial();
  }

  getPersonById() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.req = {
      clientID:
        this.routeclientId ||
        this.CLIENT_ID,
    };
    // this.settingSSNEditAccess();
    this.ssnNumberViewActivty();
    this.clildFormService.getDetailsById(this.req).then((data) => {
      this.originalSSN = data.person.ssn;
      localStorage.setItem("clientProfileData", JSON.stringify(data.person));
      this._localValues.clientProfileData = data.person;
      if (data.person) {
        this._localValues.ClientNameLastFirst =
          data.person.lastName + ", " + data.person.firstName;
      }

      if (data.responseStatus == true) {
        loader.style.display = "none";
        if (data.person && data.person.stateID) {
          this.getCitiesBasedOnSelectedState(data.person.stateID.stateID);
        }

        data.person.dob = new Date(data.person.dob);
        this.clientId = data.person.clientID;
        this.clientName = data.person.lastName + " " + data.person.firstName;
        this.client_firstname_lastname =
          data.person.firstName + "," + data.person.lastName;
        this.subtitle = this.clientName;
        this.client_ssn = data.person.ssn;
        this.allAlias();
        if (this.client_ssn == "") {
          this.ssn_view_access = true;
        }
        localStorage.setItem("kees", data.person.kees);
        localStorage.setItem("kaecses", data.person.kaecses);
        !isNullOrUndefined(data.person.ssn)
          ? (data.person.ssn = data.person.ssn.replace(/.(?=.{4})/g, "X"))
          : "Not provided!";
        // this.onNonContractClientChange('', data.person.nonContractClient);
        this.client = data.person;
        this.isEditForm = true;
        this.orgForm.disable();
        this.isFormLog = true;
        this.formLogInfo.changedBy = !isNullOrUndefined(data.person.changedBy)
          ? data.person.changedBy
          : "------";
        this.formLogInfo.changedDate = !isNullOrUndefined(
          data.person.changedDate
        )
          ? moment(data.person.changedDate).format("MM/DD/YYYY hh:mm:ss A")
          : "--:--:-- --";
        this.formLogInfo.enteredBy = !isNullOrUndefined(data.person.enteredBy)
          ? data.person.enteredBy
          : "------";
        this.formLogInfo.enteredDate = !isNullOrUndefined(
          data.person.enteredDate
        )
          ? moment(data.person.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
          : "--:--:-- --";
      }
    });
  }

  /**
   * check openreferral for the client
   * @return navigate to referral reintegration creation.
   */
  checkOpenReferrals(referralType: any) {
    let req;
    const closeBtn = document.getElementById("closeBtn") as HTMLElement;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    req = { clientID: this.clientId };
    loader.style.display = "block";
    return this.clildFormService.checkReintegration(req).then((data) => {
      loader.style.display = "none";
      if (data.responseStatus) {
        closeBtn.click();
        console.log("Comes under FP");
        if (data.responseMessage == "Open Cases Found") {
          swal(
            "Open cases found!",
            "Kindly close the existing referral programs",
            "info"
          );
        } else {
          switch (referralType) {
            case "FP":
              this.router.navigate([
                "reports/referral/family-preservation/new",
              ]);
              break;
            case "RI":
              this.router.navigate(["/reintegration/referral/new"]);
              break;
          }
        }
      } else {
        swal("Unable to process", data.responseMessage, "info");
      }
    });
  }

  /**
   * Pass the client id to the referral componet
   *
   * @returns Navigate to the client referralview
   *
   * @memberOf ClientFormComponent
   */
  createReferral(referral) {
    console.log("selected id", this.clientId, referral);
    let url;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    const closeBtn = document.getElementById("closeBtn") as HTMLElement;
    loader.style.display = "block";
    if (!isUndefined(referral)) {
      this._referralView.getClientReferralRelatedDetails(
        this.clientId,
        this.clientName
      );
      if (
        referral.display === "Psychiatric Residential Treatment Theraphy (PRTF)"
      ) {
        this.isPRTF = true;
        this._openCard.setOtherRefDetails({
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
          this._openCard.setOtherRefDetails({
            isFpReferral: false,
            referralName: "FC",
          });
          break;
        case "Non contract outpatient services":
          url = "/reports/referral/nc-ops/new";
          this._openCard.setOtherRefDetails({
            isFpReferral: false,
            referralName: "NC-OPS",
          });
          break;
        case "Family Preservation":
          url = "/reports/referral/family-preservation/new";
          this._openCard.setOtherRefDetails({
            isFpReferral: true,
            referralName: "FI",
          });
          break;
        case "Non contract family preservation (In-Home)":
          url = "/reports/referral/family-preservation/new";
          this._openCard.setOtherRefDetails({
            isFpReferral: false,
            referralName: "NC-FI",
          });
          break;
        case "Non contract Foster care homes referral program":
          url = "/reports/nc-fch/new";
          this._openCard.setOtherRefDetails({
            isFpReferral: false,
            referralName: "NC-FCH",
          });
          break;
        case "Non contract reintegration foster care (NC-RFC)":
          url = "/reports/nc-rfc/new";
          this._openCard.setOtherRefDetails({
            isFpReferral: false,
            referralName: "NC-RFC",
          });
          break;
        case "Non contract Home Study/FCH Services (NC-HS)":
          url = "/nc-hs/new";
          this._openCard.setOtherRefDetails({
            isFpReferral: false,
            referralName: "NC-HS",
          });
          break;
        case "Bridge Home Oklahoma (BH OK)":
          url = "/bh-ok/new";
          this._openCard.setOtherRefDetails({
            isFpReferral: false,
            referralName: "BH-OK",
          });
          break;
        case "NC Mental Health Respites (NC-MHR)":
          url = "nc-mhr/new";
          this._openCard.setOtherRefDetails({
            isFpReferral: false,
            referralName: "NC-MHR",
          });
          break;
        case "Sub-Contract Reintegration Foster Care(SUB-RFC)":
          url = "sub-rfc/new";
          this._openCard.setOtherRefDetails({
            isFpReferral: false,
            referralName: "SUB-RFC",
          });
          break;
      }
      closeBtn.click();
      loader.style.display = "none";
      // return this.router.navigate([url]);
      if (
        referral.display == "Family Preservation" ||
        referral.display == "Non contract family preservation (In-Home)"
      ) {
        return this.router.navigate([url], { queryParamsHandling: "preserve" });
      } else {
        this.referralValidation(referral.display, url);
      }
    } else {
      return swal("Error", "Select any referral program!", "error");
    }
  }
  referralValidation(referral, url) {
    this.referralValidationObject["client"] =
      this._localValues.ClientNameLastFirst;

    this.isKkshown = false;
    this.kkNumber = null;
    this.currentClientId =
      this.routeclientId ||
      parseInt(this._activateRoute.snapshot.queryParamMap.get("clientId"));
    switch (referral) {
      case "Reintegration":
        this.referralValidationHeader = "FC - Referral Wizard - Step 1";
        this.currentReferralTypeID = 1;
        break;

      case "Non contract Foster care homes referral program":
        this.referralValidationHeader = "NC-FCH - Referral Wizard - Step 1";
        this.currentReferralTypeID = 4;
        break;

      case "Non contract outpatient services":
        this.referralValidationHeader = "NC-OPS - Referral Wizard - Step 1";
        this.currentReferralTypeID = 9;
        break;
      case "Family Preservation":
        this.referralValidationHeader = "FI - Referral Wizard - Step 1";
        this.currentReferralTypeID = 2;
        break;
      case "Non contract family preservation (In-Home)":
        this.referralValidationHeader = "NC-FI - Referral Wizard - Step 1";
        this.currentReferralTypeID = 5;
        break;

      case "Non contract reintegration foster care (NC-RFC)":
        this.referralValidationHeader = "NC-RFC - Referral Wizard - Step 1";
        this.currentReferralTypeID = 7;
        break;
      case "Non contract Home Study/FCH Services (NC-HS)":
        this.referralValidationHeader = "NC-HS - Referral Wizard - Step 1";
        this.currentReferralTypeID = 8;
        break;
      case "Bridge Home Oklahoma (BH OK)":
        this.isKkshown = true;
        this.kkNumber = this.referralValidationObject.kk;
        this.referralValidationHeader = "BH OK - Referral Wizard - Step 1";
        this.currentReferralTypeID = 15;
        break;
      case "Juvenile Justice Foster Care (JJFC)":
        this.referralValidationHeader = "JJFC - Referral Wizard - Step 1";
        this.currentReferralTypeID = 17;
        break;
      case "NC Mental Health Respites (NC-MHR)":
        this.referralValidationHeader = "NC-MHR - Referral Wizard - Step 1";
        this.currentReferralTypeID = 11;
        break;
      case "Psychiatric Residential Treatment Theraphy (PRTF)":
        this.referralValidationHeader = "PRTF - Referral Wizard - Step 1";
        this.currentReferralTypeID = 14;
        break;
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
    };
    this.isReferralValidationVisible = false;
  }

  checkValidation() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    const request = {
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
          const type = item.referralType;
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
    };
  }

  /**
   * @param event from opencard component
   * referral details of the client
   * @returns navigate respective opencards details
   * @memberOf ClientFormComponent
   */
  referralDetails(event) {
    let url;
    this._referralView.getClientReferralRelatedDetails(
      this.clientId,
      this.clientName
    );
    switch (event) {
      case "Case(s)":
        url = "/reports/referral/view";
        break;
      case "Court case number":
        url = "/reports/courtCase";
        break;
      case "Non therapy face to face":
        url = "/reports/nonTherapyFaceToFace";
        break;
      case "Client Profile":
        url = "/reports/client/profile";
        break;
      case "Medication and allergies":
        url = "/reports/medication-allergies/view";
        break;
      case "Client Strengths":
        url = "/reports/client-strength/view";
        break;
    }
    return this.router.navigateByUrl(url);
  }

  /**
   * Referral decision,
   */
  // referralDecision() {
  //     swal({
  //         title: 'Referral Programs',
  //         input: 'select',
  //         inputOptions: {
  //             0: 'FC',
  //             1: 'FI',
  //             2: 'FO'
  //         },
  //         inputPlaceholder: 'Select Referral',
  //         showCancelButton: true,
  //     }).then(data => {
  //         if (data.value == "0") {
  //             this.checkOpenReferrals();
  //         } else {
  //             this.router.navigate(['/reports/referral/family-preservation-list/new'])
  //         }
  //     })
  // }

  formBack() {
    return this.router.navigate(["/reports/client"]);
  }

  // getOpecardCounts() {
  //     let loader = document.getElementById('loading-overlay') as HTMLElement
  //     loader.style.display = 'block';
  //     let req = { clientID: parseInt(localStorage.getItem('clientId')) - this._openCard.getHasKey() }
  //     this._CaseTeamService.getTotalCountForOpencards(req).then((data) => {
  //         this.opencard = data;
  //         loader.style.display = 'none';
  //     })
  // }

  closeReferral() {
    console.log("closeReferral called");
    this.selectedReferral = {};
    this.isSelectedReferralEmpty = true;
  }

  getProviderData(event: any) {
    const req = { Object: "provider", value: event.query };
    this._CaseTeamService.getSearchList(req).then((data: any) => {
      this.listOfProviders = data.dropDown;
    });
  }

  riskMangamentUserRightsControl() {
    const userId = isNullOrUndefined(localStorage.getItem("UserId"))
      ? 5130
      : localStorage.getItem("UserId");
    if (
      userId == "6" ||
      userId == "129" ||
      userId == "276" ||
      userId == "480" ||
      userId == "2385" ||
      userId == "3095" ||
      userId == "4620" ||
      userId == "4621" ||
      userId == "5129" ||
      userId == "5130"
    ) {
      this.isAllowedUser = true;
    }
  }
  showSSNnum() {
    this.show_ssn = true;
    this.ssn_view_access = true;
    this.timeOut();
    console.log(">>>", this.show_ssn);
  }
  timeOut() {
    this.save_ssn_numb_activitylog();
    setTimeout(() => {
      this.show_ssn = false;
      this.ssn_view_access = false;
    }, 10000);
  }
  showDialog(state) {
    this.display = state;
  }
  save_ssn_numb_activitylog() {
    let Request = {
      staffID: isNullOrUndefined(localStorage.getItem("UserId"))
        ? 4620
        : localStorage.getItem("UserId"),
      event: "Viewed SSN",
      module: "Client details",
      description: "Viewed the SSN - " + this.client_firstname_lastname,
    };
    this.ssn_number_activity
      .save_ssn_number_activity_log(Request)
      .then((data: any) => {});
  }
  ssnNumberViewActivty() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let request = {
      staffID: isNullOrUndefined(localStorage.getItem("UserId"))
        ? 5130
        : localStorage.getItem("UserId"),
    };
    this.ssn_number_activity.ssn_number_access_log(request).then((res: any) => {
      res.staffRoles.map((item) => {
        loader.style.display = "none";
        if (
          !isNullOrUndefined(
            JSON.parse(item.roles_RoleID.accessRights).accessRights
              .cmsUserRights
          )
        ) {
          JSON.parse(
            item.roles_RoleID.accessRights
          ).accessRights.cmsUserRights.find((element) => {
            if (element.viewSSN === true) {
              this.ssn_view_access = false;
            } else {
              // this.ssn_view_access = false;
            }
          });
        }
      });

      let selectedRole = res.staffRoles.filter((item: any, index: any) => {
        if (item.roles_RoleID.roleID === 14) {
          return index;
        }
      });
      // console.log("Role Index***", selectedRole[0].isAllowToEdit);
      return (this.isSSNFormEditOptDisable = selectedRole[0].isAllowToEdit
        ? false
        : true);
    });
  }
  aliasSave() {
    if (
      this.aliasData.alias_FirstName == "" ||
      this.aliasData.alias_LastName == "" ||
      this.aliasData.beginDate == "" ||
      this.aliasData.beginDate == null
    ) {
      swal(
        "Warning",
        "You Must Enter First Name & Last Name & Begin date!",
        "info"
      );
    } else {
      const loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";

      this.aliasData.clientID = this.clientId;
      if (this.clientAliasID) {
        if (this.aliasData.endDate === null) {
          this.aliasData.endDate = null;
        } else {
          this.aliasData.endDate = this._localValues.report_begin_dateAndTime(
            this.aliasData.endDate
          );
        }
        this.aliasData["clientAliasID"] = this.clientAliasID;
        this.aliasData.beginDate = this._localValues.report_begin_dateAndTime(
          this.aliasData.beginDate
        );

        this.ssn_number_activity
          .clientAliasUpdate(this.aliasData)
          .then((res: any) => {
            swal("Success", "Successfully Saved!", "success");
            loader.style.display = "none";
            this.clearAliasData();
            this.allAlias();
          })
          .catch((error) => {
            loader.style.display = "none";
          });
      } else {
        const loader = document.getElementById(
          "loading-overlay"
        ) as HTMLElement;
        loader.style.display = "block";
        this.aliasData.beginDate = this._localValues.report_begin_dateAndTime(
          this.aliasData.beginDate
        );
        this.aliasData.endDate = null;
        this.ssn_number_activity
          .clientAliasSave(this.aliasData)
          .then((res: any) => {
            let date = new Date(this.aliasData.beginDate);
            loader.style.display = "none";
            swal("Success", "Successfully Saved!", "success");
            this.allAlias();
            let endDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
            let aliasData = {
              alias_FirstName: null,
              alias_LastName: null,
              alias_MI: null,
              alias_Suffix: null,
              beginDate: null,
              endDate: this._localValues.report_end_dateAndTime(endDate),
              clientID: this.clientId,
              clientAliasID: this.allAliasList[0].clientAliasID,
            };
            this.clearAliasData();
            this.ssn_number_activity
              .clientAliasUpdate(aliasData)
              .then((res: any) => {
                loader.style.display = "none";
                this.allAlias();
                this.clearAliasData();
                this.getPersonById();
              })
              .catch((error) => {
                loader.style.display = "none";
              });
          })
          .catch((error) => {
            loader.style.display = "none";
          });
      }
    }
  }
  allAlias() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.ssn_number_activity
      .clientAlias_list({ clientID: this.clientId })
      .then((res: any) => {
        this.allAliasList = res.clientAlias.reverse();
        loader.style.display = "none";
      })
      .catch((error) => {
        loader.style.display = "none";
      });
  }
  getByIdAlias(id) {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.ssn_number_activity
      .clientAlias_get_byID({ clientAliasID: id })
      .then((res: any) => {
        // this.aliasData=res.clientAlias;
        this.clientAliasID = id;
        this.aliasData = {
          alias_FirstName: res.clientAlias.alias_FirstName,
          alias_LastName: res.clientAlias.alias_LastName,
          alias_MI: res.clientAlias.alias_MI,
          alias_Suffix: res.clientAlias.alias_Suffix,
          beginDate: new Date(res.clientAlias.beginDate),
          endDate: null,
          clientID: this.clientId,
        };
        if (res.clientAlias.endDate === null) {
          this.aliasData.endDate = null;
        } else {
          this.aliasData.endDate = new Date(res.clientAlias.endDate);
        }
        loader.style.display = "none";
      })
      .catch((error) => {
        loader.style.display = "none";
      });
  }
  clearAliasData() {
    this.aliasData = {
      alias_FirstName: "",
      alias_LastName: "",
      alias_MI: "",
      alias_Suffix: "",
      beginDate: null,
      endDate: null,
      clientID: this.clientId,
    };
    this.clientAliasID = "";
  }
  showDeletePromt(id) {
    this.isDeleteConfirmation = true;
    this.alais_id = id;
    this.deleteConfirmationBtnLabel = "Confirm";
  }

  deleteAlias() {
    this.deleteConfirmationBtnLabel = "Deleting...";
    const req = {};
    req["module"] = "ClientAlias";
    req["moduleID"] = [this.alais_id];
    req["staffID"] =
      parseInt(localStorage.getItem("staffId")) - this._openCard.getHasKey() ||
      4620;
    this._openCard.file_Delete(req).then((data: any) => {
      this.isDeleteConfirmation = false;
      swal("Success", "The record has been deleted successfully!", "success");
      this.allAlias();
    });
  }

  async getClientAttachmentsList() {
    this.scannedDocumentList = await this.uploadDocTypes.onGetAttachmentList(
      this.req
    );
    this.isClientAttachments = true;
  }

  onOpenDialogConfirmation = (scannedDocumentID: any) => {
    this.selectedScanDocumentIdForDelete = scannedDocumentID;
    return (this.isDeleteAllConfirmation = true);
  };

  async onAttachDocDelete() {
    this.attachmentDeleteBtnLabel = "Deleting...";
    this.isDeleteAllConfirmationDisable = true;
    await this.uploadDocTypes.deleteAttachment([
      this.selectedScanDocumentIdForDelete,
    ]);
    await this.getClientAttachmentsList();
    this.attachmentDeleteBtnLabel = "Confirm";
    this.isDeleteAllConfirmationDisable = false;
    this.isDeleteAllConfirmation = false;
  }

  getContractState(event: any) {
    const req = {
      Object: "contractState",
      value: "",
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.results = data.dropDown.filter(
        (item: any) =>
          item.abbreviation.toLowerCase().indexOf(event.query) !== -1
      );
    });
  }

  getCitiesBasedOnSelectedState(stateID) {
    this.stateID = stateID;
    const req = {
      stateID: stateID,
    };
    this.clildFormService.getCityFromState(req).then((data) => {
      this.showCity = false;
      this.cityData = data.city;
      this.results = data.city;
      if (this.cityData.length > 0) {
        this.Data.City ? this.updatefilterCity() : null;
      }
    });
  }

  async duplicateKaeseValidation() {
    console.log("<<<post>>>");
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    const req = {
      conST: {
        abbreviation: this.client.conST ? this.client.conST.abbreviation : "KS",
        stateID: this.client.conST ? this.client.conST.stateID : 34,
      },
      firstName: this.client.firstName,
      lastName: this.client.lastName,
      kaecses: this.client.kaecses,
      person: "client",
    };

    if (this.client.clientID) {
      req["clientID"] = this.client.clientID;
    }
    if (this.router.url === "/reports/client/new") {
      req["clientID"] = 0;
    }
    const validationResponse =
      await this._openCard.getKaeseDuplicationValidation(req);
    loader.style.display = "none";
    // let message = "";
    // validationResponse.personsWithSameFirstNameAndLastName.map((item) => {
    //   message = message + item.firstName + "\n";
    // });

    if (validationResponse.personsWithSameFirstNameAndLastName.length > 0) {
      let message = `Client Name: ${validationResponse.personsWithSameFirstNameAndLastName[0].firstName}, Client ID: ${validationResponse.personsWithSameFirstNameAndLastName[0].clientID}`;
      Swal.fire("Duplicate Kaeses Found on Clients:", message, "warning");
      return false;
    } else {
      return this.formAction(this.client);
    }
  }

  onClickJumptoTree() {
    switch (this.currentJumpToTreeNode) {
      case "placement_history":
        this.router.navigate(["/provider/opencard/placement-history/detail"]);
        break;

      case "authorization_summary":
        this.router.navigate([
          "/provider/opencard/authorization-summary/detail",
        ]);
        break;

      case "living_arrangement":
        this.router.navigate([
          "/reintegration/referral/opencard/placement/living-arrangement/detail",
        ]);
        break;

      case "CS - Payee - Direct Authorization - Client Form":
        this.router.navigate([
          "/claims/list/dir_cs-payee/dir_csPayee-directAuth",
        ]);
        break;

      case "CS - Payee - Authorization - Client Form":
        this.router.navigate(["/reintegration/cs-payee/csPayeeAuthDetail"]);
        break;

      case "other_services":
        this.router.navigate([
          "/reintegration/referral/service/other/service/detail",
        ]);
        break;

      case "hard_goods":
        this.router.navigate([
          "/reintegration/referral/service/hardgoods/detail",
        ]);
        break;

      case "direct_auth":
        this.router.navigate(["/claims/list/direct/form/view"]);
        break;
    }
  }
  subscribeRoute() {
    this._activateRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      const refresh = paramMap.get("refresh");
      if (refresh) {
        this.getPersonById();
      }
    });
  }

  public formAction(post: any) {
    post.entity = "Client";
    post.cityID = post.cityID ? post.cityID.cityID : null;
    post.conST = post.conST ? post.conST.stateID : null;
    post.countyID = post.countyID ? post.countyID.countyID : null;
    post.genderID = post.genderID ? post.genderID.genderID : null;
    post.insuranceTypeID = post.insuranceTypeID
      ? post.insuranceTypeID.insuranceTypeID
      : null;
    post.kanCareMCO_ProviderID = post.kanCareMCO_ProviderID
      ? post.kanCareMCO_ProviderID.providerID
      : null;
    post.raceID = post.raceID ? post.raceID.raceID : null;
    post.stateID = post.stateID ? post.stateID.stateID : null;
    post.zipcodeID = post.zipcodeID ? post.zipcodeID.zipcodeID : null;
    post.tribeID = post.tribeID ? post.tribeID.tribeID : null;
    post.ethnicityID = post.ethnicityID ? post.ethnicityID.ethnicityID : null;
    if (this.clientId) {
      post.ssn = this.client.ssn;
    }
    !isNullOrUndefined(post.dob)
      ? (post.dob = this._localValues.stringFormatDatetime(new Date(post.dob)))
      : null;
    !isNullOrUndefined(post.clientID)
      ? this.updateClient(post)
      : this.saveClient(post);
  }

  // public async settingSSNEditAccess() {
  //   let accessRequest = {
  //     staffID: parseInt(localStorage.getItem("UserId")) || 14785,
  //   };
  //   let accessResponse = await this._openCard.getStaffAccess(accessRequest);
  //   // let accessResponse = {
  //   //   staffRoles: [
  //   //     {
  //   //       isAllowToEdit: false,
  //   //       roles_RoleID: { roleID: 22 },
  //   //     },
  //   //     {
  //   //       isAllowToEdit: false,
  //   //       roles_RoleID: { roleID: 17 },
  //   //     },
  //   //     {
  //   //       isAllowToEdit: true,
  //   //       roles_RoleID: { roleID: 14 },
  //   //     },
  //   //     {
  //   //       isAllowToEdit: false,
  //   //       roles_RoleID: { roleID: 18 },
  //   //     },
  //   //   ],
  //   // };

  //   let selectedRole = accessResponse.staffRoles.filter(
  //     (item: any, index: any) => {
  //       if (item.roles_RoleID.roleID === 14) {
  //         return index;
  //       }
  //     }
  //   );
  //   // console.log("Role Index***", selectedRole[0].isAllowToEdit);
  //   return (this.isSSNFormEditOptDisable = selectedRole[0].isAllowToEdit
  //     ? false
  //     : true);
  // }

  public onSSNChange(event: any) {
    event.target.select();
  }

  public openInNewBrowserWindow(path: any) {
    window.open(
      window.location.origin + path + window.location.search,
      "_blank",
      "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
    );
  }

  basciEmail() {
    // TODO
  }
  goToCaseForm() {
    return this.router.navigate(["/reports/opencards/list/client/case"], {
      queryParamsHandling: "preserve",
    });
  }

  navigateToListView(url: string): Promise<any> {
    return this.router.navigate([url], { queryParamsHandling: "preserve" });
  }
}
