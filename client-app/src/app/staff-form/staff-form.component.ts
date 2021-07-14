import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ClildFormService } from "../child-forms/child-forms.service";
import swal from "sweetalert2";
import { Router, ParamMap, ActivatedRoute } from "@angular/router";
import { TeamFormService } from "../team-form/team-form.service";
import { CaseTeamService } from "./../case-team/case-team.service";
import { isObject, isNullOrUndefined } from "util";
import { MessageService } from "primeng/api";
import { LocalValues } from "../local-values";
import { StaffFamilyChangeComponent } from "../Shared/Components/Family change/family-change.component";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { StaffForm } from "./staff-form";
import * as moment from "moment";
import * as _ from "lodash";

@Component({
  selector: "app-staff-form",
  templateUrl: "./staff-form.component.html",
  styleUrls: ["../person-master/Client/client-form/client-form.component.scss"],
  inputs: ["isComponent", "isEdit"],
  outputs: ["isFomrOpen"],
})
export class StaffFormComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public _CaseTeamService: CaseTeamService,
    public router: Router,
    public _team: TeamFormService,
    public clildFormService: ClildFormService,
    public messageService: MessageService,
    public _openCards: OpencardsService,
    public _localVlaues: LocalValues,
    public _activatedRoute: ActivatedRoute
  ) {}

  @Input()
  Sidenav: boolean;
  orgForm: FormGroup;
  reportsViewList;
  formStatus: any;
  Data;
  settings = {
    actions: false,
    pager: {},
    selectMode: "",
    custom: [],
    columns: [],
    button: {},
  };
  button: {};
  showForm = false;
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
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  endPagination: any = 100;
  loaderController = false;
  personData: any;
  updateUser = false;
  countyData = [];
  raceData = [];
  genderData = [
    { id: 0, itemName: "Male" },
    { id: 1, itemName: "Female" },
  ];
  clientId;
  Race = [];
  CountyName = [];
  Gender = [];
  viewOnly: boolean;
  addOption = null;
  userDetails;
  ReportSettings = {
    singleSelection: true,
    text: "Select",
    selectAllText: "Select All ",
    unSelectAllText: "UnSelect All",
    enableSearchFilter: true,
    classes: "myclass custom-class",
    badgeShowLimit: 1,
  };
  head = [];
  mainTabs = [];
  sIndex;
  isEditForm;
  results;
  status = "draft";
  title = "Staff";
  section1 = [
    "firstName",
    "lastName",
    "acronym",
    "mi",
    "suffix",
    "credentials",
    "KHSProviderNum",
    "email",
    "cellPh",
    "genderID",
    "raceID",
    "pager",
  ];
  section2 = [
    "extension",
    "separationDate",
    "cellPhoneOverOfficePhone",
    "homeCountyOverOfficeCounty",
    "homeCounty_CountyID",
    "beginDateForAll",
    "homePh",
    "workPh",
    "sfcsOfficeID",
    "teamLeaderID",
  ];
  invalid = [];
  opencards = [];
  iconurl =
    "https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/";

  @ViewChild(StaffFamilyChangeComponent, { static: true })
  familyChangeComponent: StaffFamilyChangeComponent;
  teamType: string;
  cardName: string;

  @Input() isComponent = false;
  @Input() isEdit = false;
  @Output() isFomrOpen = new EventEmitter();
  staffId;
  staff = new StaffForm();
  breadcrumbs = [];
  subtitle: any;

  isSeprationDateRemoved = false;
  showPro = false;
  teamLeaders = [];
  allTeamLeasdes = [];

  showPosition = false;
  showTeamLeader = false;
  showComplianceTech = false;
  showOffice = false;
  showFamilyChangeApproval = false;
  showStaffCard = false;
  showNotificationTransfer = false;
  staffRefreash = 0;
  caseTeamPersonJumptoTree = false;
  routeStaffId: any;

  dialogList = [];
  lastDialogId = 0;

  ngOnInit() {
    // this is to get staffid from route url
    this._activatedRoute.queryParams.subscribe((params) => {
      if (params && params.staffId) {
        this.routeStaffId = parseInt(params.staffId);
      }
    });

    this.caseTeamPersonJumptoTree = this._localVlaues.caseTeamPersonJumptoTree;
    this.subscribeRoute();
    this.setIndex(0);
    this.getUserById();
    // if (!this.isComponent) {
    //   this.getId();
    // }
    this.getId();

    this.defineMainTabs();
    this.getTeamLeaderDropdown();
    this.breadcrumbs = [
      { label: "List", href: "/reports/staff", active: "" },
      { label: "Form", active: "active" },
    ];
    // this.getUserById();
    this.defineOpencards();

    if (this.router.url === "/reports/staff/new" || this.isComponent) {
      const dublicateData = {
        firstName:
          this._localVlaues.personInitialDetailsFromPersonMasterCreation
            .firstName,
        lastName:
          this._localVlaues.personInitialDetailsFromPersonMasterCreation
            .lastName,
      };
      this.staff["firstName"] = dublicateData.firstName;
      this.staff["lastName"] = dublicateData.lastName;
      this.orgForm = this.formBuilder.group({
        cellPh: [],
        cellPhoneOverOfficePhone: [],
        email: [],
        extension: [],
        firstName: [
          this.staff.firstName,
          Validators.compose([
            Validators.required,
            Validators.maxLength(25),
            Validators.pattern("^[a-zA-Z_-]*$"),
          ]),
        ],
        genderID: [],
        homePh: [],
        lastName: [
          this.staff.lastName,
          Validators.compose([
            Validators.required,
            Validators.maxLength(25),
            Validators.pattern("^[a-zA-Z_-]*$"),
          ]),
        ],
        mi: [],
        notes: [],
        raceID: [],
        separationDate: [],
        suffix: [],
        homeCounty_CountyID: [],
        acronym: [],
        credentials: [],
        KHSProviderNum: [],
        pager: [],
        homeCountyOverOfficeCounty: [],
        beginDateForAll: [],
        sfcsOfficeID: [],
        teamLeaderID: [],
        personTypeID: [],
      });
    }
  }

  getId() {
    // this.staffId = this.clildFormService.getId();
    this.staffId =
      this.routeStaffId || parseInt(localStorage.getItem("staff_ID"));
    this.getData();
  }

  getData() {
    if (this.router.url == "/reports/staff/new") {
      this.add();
    } else {
      // this.getStaffById();
    }
  }

  defineMainTabs() {
    return (this.mainTabs = [
      { label: "Section 1", href: "#nav-1" },
      { label: "Section 2", href: "#nav-2" },
      { label: "Section 3", href: "#nav-3" },
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
      console.log("getUserById", data);
      this.userDetails = data.users;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.users.changedBy)
        ? data.users.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(data.users.changedDate)
        ? moment(data.users.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.users.enteredBy)
        ? data.users.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.users.enteredDate)
        ? moment(data.users.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
    });
  }

  editForm() {
    this.orgForm.enable();
    this.isEditForm = false;
  }

  loadInitialForm() {
    this.orgForm = this.formBuilder.group({
      cellPh: [null],
      cellPhoneOverOfficePhone: [false],
      email: [null, Validators.compose([Validators.required])],
      lastName: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern("^[a-zA-Z_-]*$"),
        ]),
      ],
      extension: [null, Validators.compose([Validators.maxLength(25)])],
      firstName: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern("^[a-zA-Z_-]*$"),
        ]),
      ],
      genderID: [null],
      homePh: [null],
      // 'legacy_ACK_FC': [false],
      // 'legacy_ACK_FI': [false],
      // 'legacy_ACK_FO': [false],
      // 'legacy_IsMailSupervisor': [false],
      // 'legacy_PSA': [false],
      // 'legacy_StaffID': [null, Validators.compose([ Validators.maxLength(25), Validators.pattern('^[0-9-+]+$')])],
      mi: [
        null,
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(2),
          Validators.pattern("^[a-zA-Z_-]*$"),
        ]),
      ],
      notes: [null, Validators.compose([Validators.maxLength(25)])],
      // 'programTypeID': [null, Validators.compose([ Validators.maxLength(25), Validators.pattern('^[0-9-+]+$')])],
      raceID: [null],
      separationDate: [null],
      uITrainingCompletedDate: [null],
      suffix: [
        null,
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(3),
          Validators.pattern("^[a-zA-Z_-]*$"),
        ]),
      ],
      homeCounty_CountyID: [null],
      acronym: [false],
      credentials: [null],
      KHSProviderNum: [],
      pager: [],
      homeCountyOverOfficeCounty: [],
      beginDateForAll: [null, Validators.compose([Validators.required])],
      sfcsOfficeID: [null, Validators.compose([Validators.required])],
      teamLeaderID: [null, Validators.compose([Validators.required])],
      personTypeID: [null, Validators.compose([Validators.required])],
    });
  }
  loadUpdatedForm() {
    let teamLeadID;
    if (this.staff.teamLeaderID === null) {
      teamLeadID = null;
    } else {
      teamLeadID = this.teamLeaders.find(
        (x) => x.StaffID === this.staff.teamLeaderID.staffID
      );
    }
    console.log("teamLeadID>>", teamLeadID);
    this.orgForm = this.formBuilder.group({
      cellPh: [this.staff.cellPh],
      cellPhoneOverOfficePhone: [this.staff.cellPhoneOverOfficePhone],
      // 'changedBy': [this.staff.changedBy],
      // 'changedDate': [this.staff.changedDate],
      email: [this.staff.email, Validators.compose([Validators.required])],
      // 'enteredBy': [this.staff.enteredBy],
      // 'enteredDate': [this.staff.enteredDate],
      extension: [
        this.staff.extension,
        Validators.compose([Validators.maxLength(25)]),
      ],
      firstName: [
        this.staff.firstName,
        Validators.compose([
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern("^[a-zA-Z_-]*$"),
        ]),
      ],
      genderID: [this.staff.genderID],
      homePh: [this.staff.homePh],
      lastName: [
        this.staff.lastName,
        Validators.compose([
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern("^[a-zA-Z_-]*$"),
        ]),
      ],
      // 'legacy_ACK_FC': [this.staff.legacy_ACK_FC],
      // 'legacy_ACK_FI': [this.staff.legacy_ACK_FI],
      // 'legacy_ACK_FO': [this.staff.legacy_ACK_FO],
      // 'legacy_IsMailSupervisor': [this.staff.legacy_IsMailSupervisor],
      // 'legacy_PSA': [this.staff.legacy_PSA],
      // 'legacy_StaffID': [this.staff.legacy_StaffID, Validators.compose([ Validators.maxLength(25), Validators.pattern('^[0-9-+]+$')])],
      mi: [
        this.staff.mi,
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(2),
          Validators.pattern("^[a-zA-Z_-]*$"),
        ]),
      ],
      notes: [this.staff.notes, Validators.compose([Validators.maxLength(25)])],
      // 'programTypeID': [this.staff.programTypeID, Validators.compose([Validators.maxLength(25), Validators.pattern('^[0-9-+]+$')])],
      raceID: [this.staff.raceID],
      separationDate: [
        isNullOrUndefined(this.staff.separationDate)
          ? ""
          : new Date(this.staff.separationDate),
      ],
      suffix: [
        this.staff.suffix,
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(3),
          Validators.pattern("^[a-zA-Z_-]*$"),
        ]),
      ],
      homeCounty_CountyID: [
        isNullOrUndefined(this.staff.homeCounty_CountyID)
          ? null
          : this.staff.homeCounty_CountyID["countyID"],
      ],
      acronym: [this.staff.acronym],
      credentials: [this.staff.credentials],
      KHSProviderNum: [this.staff.khsproviderNum],
      pager: [this.staff.pager],
      homeCountyOverOfficeCounty: [this.staff.homeCountyOverOfficeCounty],
      beginDateForAll: [new Date(this.staff.beginDateForAll)],
      sfcsOfficeID: [this.staff.sfcsOfficeID],
      teamLeaderID: [teamLeadID],
      personTypeID: [this.staff.personTypeID],
      uITrainingCompletedDate: [
        isNullOrUndefined(this.staff.uITrainingCompletedDate)
          ? ""
          : new Date(this.staff.uITrainingCompletedDate),
      ],
    });
    this.showForm = true;
    this.orgForm.disable();
    if (this.staff.separationDate) {
      this.isSeprationDateRemoved = true;
    }
  }
  getStaffById(selectedStaffId?: number) {
    this.showPro = false;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.updateUser = true;
    if (this.isComponent) {
      this.updateUser = false;
    }
    let req = { staffID: this.staffId };
    if (selectedStaffId) {
      req = { staffID: selectedStaffId };
    }
    this.clildFormService.getDetailsById(req).then((data) => {
      if (data.responseStatus == true) {
        console.log("dataaa", data);
        this.clientId = data.staff.staffID;
        localStorage.setItem("staff_ID", data.staff.staffID);
        loader.style.display = "none";
        localStorage.setItem("staffIdPerson", data.staff.staffID);
        this.staff = data.staff;
        this.subtitle = this.staff.firstName + " " + this.staff.lastName;
        this.viewOnly = true;
        this.isEditForm = true;
        // this.updateDropdown();
        this.loadUpdatedForm();
        this.showPro = true;
      } else {
        console.log(data.responseStatus);
      }
    });
  }

  // discardForm() {
  //   this.router.navigate(['reports/client'])
  // }
  discardForm() {
    if (this.isComponent) {
      return;
    } else {
      return this.router.navigate(["/reports/staff"]);
    }
  }

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

  getCounty(event) {
    const req = {
      Object: "county",
      value: event.query,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.countyData = data.dropDown;
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
  getTeamLeaderDropdown() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._openCards.getPRTFStaff().then((data) => {
      this.teamLeaders = data;
      loader.style.display = "none";
      if (this.router.url == "/reports/staff/new" || this.isComponent) {
      } else {
        this.getStaffById();
      }
    });
  }
  getsearcTeamLeadr(ev) {
    const filtered: any[] = [];
    for (let i = 0; i < this.teamLeaders.length; i++) {
      const leadName = this.teamLeaders[i];
      if (
        leadName.StaffName.toLowerCase().indexOf(ev.query.toLowerCase()) == 0
      ) {
        filtered.push(leadName);
      }
    }
    this.allTeamLeasdes = filtered;
  }
  // getGender(ev) {
  //   let filtered: any[] = [];
  //   for (let i = 0; i < this.genderData.length; i++) {
  //     let country = this.genderData[i];
  //     if (country.itemName.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
  //       filtered.push(country);
  //     }
  //   }
  //   this.results = filtered;
  // }

  updateCounty() {
    const req = {
      Object: "county",
      value: this.staff.countyName,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.countyData = data.dropDown;
      this.results = data.dropDown;
      this.staff.countyName = data.dropDown[0];
      // this.orgForm.controls['countyName'].setValue(data.dropDown[0]);
    });
  }

  updateRace() {
    const req = {
      Object: "race",
      value: this.staff.race,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.raceData = data.dropDown;
      this.results = data.dropDown;
      this.staff.race = data.dropDown[0];
      // this.orgForm.controls['race'].setValue(data.dropDown[0]);
    });
  }

  updateGender() {
    const filtered: any[] = [];
    for (let i = 0; i < this.genderData.length; i++) {
      const country = this.genderData[i];
      if (
        country.itemName
          .toLowerCase()
          .indexOf(this.staff.gender.toLowerCase()) == 0
      ) {
        filtered.push(country);
      }
    }
    this.results = filtered;
    this.staff.gender = filtered[0];
    // this.orgForm.controls['gender'].setValue(filtered[0]);
  }

  updateDropdown() {
    // this.staff.countyName ? this.updateCounty() : null;
    // this.staff.race ? this.updateRace() : null;
    // this.staff.gender ? this.updateGender() : null;
    // setTimeout(()=>{
    //   this.loadUpdatedForm();
    // },3000)
  }

  assignDropdownValue(post) {
    post.separationDate = new Date(post.separationDate).getTime();
    // post.gender = post.gender ? post.gender.itemName : null;
    // post.race = post.race ? post.race.race : null;
    // post.countyName = post.countyName ? post.countyName.countyName : null;
  }

  checkObjects(post) {
    if (!isObject(post.genderID)) {
      return true;
    } else if (!isObject(post.raceID)) {
      return true;
    } else if (!isObject(post.homeCounty_CountyID)) {
      return true;
    } else {
      return false;
    }
  }

  saveStaff(post) {
    console.log("Save>>>", post);
    console.log("uITrainingCompletedDate>>>", post.uITrainingCompletedDate);
    console.log("SasfcsOfficeIDve>>>", post.sfcsOfficeID);

    let validationResult =
      post.teamLeaderID === null ||
      post.email === null ||
      post.beginDateForAll === null ||
      post.sfcsOfficeID === null ||
      post.personTypeID === null ||
      post.teamLeaderID === null;

    if (this.updateUser && !this.isComponent) {
      validationResult = false;
    }
    if (this.isComponent) {
      validationResult = post.email === null;
    }
    if (validationResult) {
      swal("Warning", "Please select the Mandatory fields", "warning");
    } else {
      post.homeCounty_CountyID = post.homeCounty_CountyID
        ? post.homeCounty_CountyID.countyID
        : null;
      post.sfcsOfficeID = post.sfcsOfficeID
        ? post.sfcsOfficeID.sfaofficeID
        : null;
      // post.sfcsOfficeID = post.sfcsOfficeID.sfaofficeID;
      post.personTypeID = post.personTypeID
        ? post.personTypeID.personTypeID
        : null;
      post.genderID = post.genderID ? post.genderID.genderID : null;
      post.raceID = post.raceID ? post.raceID.raceID : null;
      post.teamLeaderID = post.teamLeaderID ? post.teamLeaderID.StaffID : null;
      // let objFieldCheck = this.checkObjects(post);
      // if (this.orgForm.invalid) {
      //   this.isEditForm = true;
      //   swal('Warning', 'Please select the dropdown fields', 'warning').then(data => {
      //     if (data) {
      //       this.isEditForm = false;
      //     }
      //   })
      // } else {

      const req = {
        entity: "Staff",
        firstName: post.firstName,
        lastName: post.lastName,
        acronym: post.acronym,
        mi: post.mi,
        suffix: post.suffix,
        genderID: post.genderID,
        raceID: post.raceID,
        credentials: post.credentials,
        KHSProviderNum: post.KHSProviderNum,
        email: post.email,
        cellPh: post.cellPh,
        pager: post.pager,
        homePh: post.homePh,
        extension: post.extension,
        separationDate: post.separationDate,
        uITrainingCompletedDate: post.uITrainingCompletedDate,
        cellPhoneOverOfficePhone: post.cellPhoneOverOfficePhone,
        homeCountyOverOfficeCounty: post.homeCountyOverOfficeCounty,
        homeCounty_CountyID: post.homeCounty_CountyID,
        beginDateForAll: post.beginDateForAll,
        sfcsOfficeID: post.sfcsOfficeID,
        personTypeID: post.personTypeID,
        teamLeaderID: post.teamLeaderID,
        notes: post.notes,
      };
      this.assignDropdownValue(req);
      console.log("out>>>", post.separationDate);
      this.showForm = false;
      if (this.updateUser && !this.isComponent) {
        if (this.isSeprationDateRemoved) {
          if (post.separationDate === null) {
            swal("Warning", "Since the Separation Date was removed", "warning");
          }
        }
        console.log("IFOUT>>>>>", post.separationDate);
        this.update(req);
      } else {
        this.save(req);
        // }
      }
    }
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
      const newDate = myDate2[0] + "/" + myDate2[1] + "/" + myDate2[2];
      todayDate = new Date(newDate).getTime();
    }
    return todayDate;
  }

  save(post) {
    console.log("post in staff", post);

    console.log("Staff save", post, JSON.stringify(post));
    // post.enteredBy = this.userDetails.firstName;
    // post.enteredDate = this.getTodayDate();
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.clildFormService.saveClient(post).then((data) => {
      loader.style.display = "none";
      // if (data.responseStatus) {
      // swal('Success', 'Staff saved successfully', 'success');
      // this.router.navigate(['/reports/staff']);

      if (this.isComponent) {
        this.isFomrOpen.emit({ isFormResponse: true, data: data });
        this.messageService.add({
          severity: "info",
          summary: "Saved!",
          detail: "Staff has been created!",
        });
      } else {
        swal("Success", "Staff saved successfully", "success");
        this.router.navigate(["/reports/staff"]);
      }
    });
  }

  update(post) {
    post.changedBy = this.userDetails.firstName;
    post.changedDate = this.getTodayDate();
    post.staffID = this.clientId;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.clildFormService.updateClient(post).then((data) => {
      loader.style.display = "none";
      if (data.responseStatus) {
        // swal('Success', 'Staff saved successfully', 'success')
        // this.router.navigate(['/reports/staff']);
        if (this.isComponent) {
          this.isFomrOpen.emit({ isFormResponse: true, data: data });
          this.messageService.add({
            severity: "info",
            summary: "Saved!",
            detail: "Staff has been updated!",
          });
        } else {
          swal("Success", "Staff saved successfully", "success");
          this.router.navigate(["/reports/staff"]);
        }
      } else {
        swal("Oops!", "Staff not saved", "warning");
      }
    });
  }

  addPost(post) {
    this.addOption = null;
    this.saveStaff(post);
  }

  goBack() {
    this.addOption = null;
    this.showForm = false;
  }

  add() {
    this.viewOnly = false;
    this.loadInitialForm();
    this.updateUser = false;
    this.showForm = true;
  }

  formBack() {
    return this.router.navigate(["/reports/staff"]);
  }

  getPersonType(event) {
    const req = {
      Object: "personType",
      value: event.query,
    };
    this._CaseTeamService.getPersonTypesforStaff().then((data) => {
      this.results = data.persontypes;
    });
  }

  getSFCSOffice(event) {
    const req = {
      Object: "sfcsOffice",
      value: event.query,
    };
    this._CaseTeamService.getSearchList(req).then((data) => {
      this.results = data.dropDown;
    });
  }

  defineOpencards() {
    this.opencards = [
      {
        title: "Position",
        tip: "Position",
        navigation: "",
        icon: this.iconurl + "assessment icon.svg",
      },
      {
        title: "Cases",
        tip: "Cases",
        navigation: "/reports/staff/caseList",
        icon: this.iconurl + "assessment icon.svg",
      },
      {
        title: "Provider",
        tip: "Provider",
        navigation: "/reports/staff/staffProvider",
        icon: this.iconurl + "assessment icon.svg",
      },
      {
        title: "Team Leader",
        tip: "Team Leader",
        navigation: "",
        icon: this.iconurl + "assessment icon.svg",
      },
      {
        title: "Team Member",
        tip: "Team Member",
        navigation: "",
        icon: this.iconurl + "case activity.svg",
      },
      {
        title: "Compliance Tech",
        tip: "Compliance Tech",
        navigation: "",
        icon: this.iconurl + "case activity.svg",
      },
      {
        title: "Recruitment Provider",
        tip: "Recruitment Provider",
        navigation: "",
        icon: this.iconurl + "assessment icon.svg",
      },
      {
        title: "SFM Office",
        tip: "SFM Office",
        navigation: "",
        icon: this.iconurl + "assessment icon.svg",
      },
      {
        title: "Family Change",
        tip: "Family Change",
        navigation: "",
        icon: this.iconurl + "assessment icon.svg",
      },
      {
        title: "Notification transfer",
        tip: "Notification transfer",
        navigation: "",
        icon: this.iconurl + "assessment icon.svg",
      },
      // { title: 'Family Change Approval', tip: 'Family Change Approval', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      {
        title: "Transportation",
        tip: "Transportation",
        navigation: "",
        icon: this.iconurl + "assessment icon.svg",
      },
      // { title: 'Training', tip: 'Training', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
    ];
    const request = {
      staffID: this.routeStaffId || parseInt(localStorage.getItem("staff_ID")),
    };
    this._openCards.getStaffType(request).then((data) => {
      if (data.staffType) {
        if (data.staffType.PersonTypeID) {
          if (
            data.staffType.PersonTypeID == 14 ||
            data.staffType.PersonTypeID == 63 ||
            data.staffType.PersonTypeID == 60 ||
            data.staffType.PersonTypeID == 69 ||
            data.staffType.PersonTypeID == 20 ||
            data.staffType.PersonTypeID == 66 ||
            data.staffType.PersonTypeID == 81 ||
            data.staffType.PersonTypeID == 200
          ) {
            this.opencards = [
              {
                title: "Position",
                tip: "Position",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Cases",
                tip: "Cases",
                navigation: "/reports/staff/caseList",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Provider",
                tip: "Provider",
                navigation: "/reports/staff/staffProvider",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Team Leader",
                tip: "Team Leader",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Team Member",
                tip: "Team Member",
                navigation: "",
                icon: this.iconurl + "case activity.svg",
              },
              {
                title: "Compliance Tech",
                tip: "Compliance Tech",
                navigation: "",
                icon: this.iconurl + "case activity.svg",
              },
              {
                title: "Recruitment Provider",
                tip: "Recruitment Provider",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "SFM Office",
                tip: "SFM Office",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Family Change",
                tip: "Family Change",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Notification transfer",
                tip: "Notification transfer",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Family Change Approval",
                tip: "Family Change Approval",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Transportation",
                tip: "Transportation",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              // { title: 'Training', tip: 'Training', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
            ];
          } else {
            this.opencards = [
              {
                title: "Position",
                tip: "Position",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Cases",
                tip: "Cases",
                navigation: "/reports/staff/caseList",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Provider",
                tip: "Provider",
                navigation: "/reports/staff/staffProvider",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Team Leader",
                tip: "Team Leader",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Team Member",
                tip: "Team Member",
                navigation: "",
                icon: this.iconurl + "case activity.svg",
              },
              {
                title: "Compliance Tech",
                tip: "Compliance Tech",
                navigation: "",
                icon: this.iconurl + "case activity.svg",
              },
              {
                title: "Recruitment Provider",
                tip: "Recruitment Provider",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "SFM Office",
                tip: "SFM Office",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Family Change",
                tip: "Family Change",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              {
                title: "Notification transfer",
                tip: "Notification transfer",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              // { title: 'Family Change Approval', tip: 'Family Change Approval', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
              {
                title: "Transportation",
                tip: "Transportation",
                navigation: "",
                icon: this.iconurl + "assessment icon.svg",
              },
              // { title: 'Training', tip: 'Training', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
            ];
          }
        }
      } else {
        this.opencards = [
          {
            title: "Position",
            tip: "Position",
            navigation: "",
            icon: this.iconurl + "assessment icon.svg",
          },
          {
            title: "Cases",
            tip: "Cases",
            navigation: "/reports/staff/caseList",
            icon: this.iconurl + "assessment icon.svg",
          },
          {
            title: "Provider",
            tip: "Provider",
            navigation: "/reports/staff/staffProvider",
            icon: this.iconurl + "assessment icon.svg",
          },
          {
            title: "Team Leader",
            tip: "Team Leader",
            navigation: "",
            icon: this.iconurl + "assessment icon.svg",
          },
          {
            title: "Team Member",
            tip: "Team Member",
            navigation: "",
            icon: this.iconurl + "case activity.svg",
          },
          {
            title: "Compliance Tech",
            tip: "Compliance Tech",
            navigation: "",
            icon: this.iconurl + "case activity.svg",
          },
          {
            title: "Recruitment Provider",
            tip: "Recruitment Provider",
            navigation: "",
            icon: this.iconurl + "assessment icon.svg",
          },
          {
            title: "SFM Office",
            tip: "SFM Office",
            navigation: "",
            icon: this.iconurl + "assessment icon.svg",
          },
          {
            title: "Family Change",
            tip: "Family Change",
            navigation: "",
            icon: this.iconurl + "assessment icon.svg",
          },
          {
            title: "Notification transfer",
            tip: "Notification transfer",
            navigation: "",
            icon: this.iconurl + "assessment icon.svg",
          },
          // { title: 'Family Change Approval', tip: 'Family Change Approval', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
          {
            title: "Transportation",
            tip: "Transportation",
            navigation: "",
            icon: this.iconurl + "assessment icon.svg",
          },
          // { title: 'Training', tip: 'Training', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
        ];
      }
    });
  }

  navigateTo(label: any) {
    let url: any;
    switch (label) {
      case "Team Leader":
        this.showNode("Team Leader");
        break;
      case "Team Member":
        this.showNode("Team Member");
        break;
      case "Compliance Tech":
        this.showNode("Compliance Tech");
        break;
      case "Cases":
        this.router.navigate(["/reports/staff/caseList"]);
        break;
      case "Provider":
        this.router.navigate(["/reports/staff/staffProvider"]);
        break;
      case "Position":
        this.showNode("Position");
        break;
      case "Family Change":
        this.familyChangeComponent.toggle();
        break;
      case "Recruitment Provider":
        url = "/staff-opencards/recruitment-provider/view";
        this.router.navigate([url]);
        break;
      case "SFM Office":
        this.showNode("Office");
        break;
      case "Family Change Approval":
        this.showNode("Family Change Approval");
        break;
      case "Transportation":
        this.showNode("Staff Card");
        break;
      case "Training":
        this.showNode("Training");
        break;
      case "Notification transfer":
        this.showNode("Notification transfer");
        break;
    }
  }

  showNode(pram) {
    if (pram === "Position") {
      this.showPosition = true;
    }
    if (pram === "Team Leader") {
      this.showTeamLeader = true;
      this.dialogList.push({
        title: "Team Leader",
        height: 500,
        width: 1000,
        id: this.lastDialogId,
      });
      // increment the dialog Id
      this.lastDialogId += 1;
      this.teamType = "Team Leader";
    }
    if (pram === "Team Member") {
      this.showTeamLeader = true;
      this.dialogList.push({
        title: "Team Member",
        height: 500,
        width: 1000,
        id: this.lastDialogId,
      });
      // increment the dialog Id
      this.lastDialogId += 1;
      this.teamType = "Team Member";
    }
    if (pram === "Compliance Tech") {
      this.showComplianceTech = true;
      this.teamType = "Compliance Tech";
    }
    if (pram === "Office") {
      this.showOffice = true;
      this.teamType = "Office";
    }
    if (pram === "Family Change Approval") {
      this.showFamilyChangeApproval = true;
    }
    if (pram === "Staff Card") {
      this.showStaffCard = true;
      this.cardName = "TRANSPORTATION";
    }
    if (pram === "Training") {
      this.showStaffCard = true;
      this.cardName = "TRAINING";
    }

    if (pram === "Notification transfer") {
      this.showNotificationTransfer = true;
    }
  }

  closeModelComp(event, type) {
    console.log("event>>>>>>>", event);
    if (type === "Position") {
      this.showPosition = false;
    }
    if (type === "TeamLeader") {
      this.showTeamLeader = false;
    }
    if (type === "Compliance") {
      this.showComplianceTech = false;
    }
    if (type === "Office") {
      this.showOffice = false;
    }
    if (type === "Family Change Approval") {
      this.showFamilyChangeApproval = false;
    }
    if (type === "Staff Card") {
      this.showStaffCard = false;
    }
    if (type === "Notification transfer") {
      this.showNotificationTransfer = false;
    }
  }

  closeDraggableDialog(data) {
    const index = this.dialogList.findIndex((value) => value.id === data.id);
    this.dialogList.splice(index, 1);
  }

  intialize() {
    if ((this.cardName = "TRANSPORTATION")) {
      // this.router.navigate(['/reports/person/types']);
    }
    this.ngOnInit();
  }
  subscribeRoute() {
    this._activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      const refresh = paramMap.get("refresh");
      if (refresh) {
        this.staffId =
          this.routeStaffId || parseInt(localStorage.getItem("staff_ID"));
        this.getStaffById();
      }
    });
  }

  ngOnDestroy() {
    this._localVlaues.caseTeamPersonJumptoTree = false;
  }

  onClickJumptoPlacement() {
    let currentClientId = parseInt(this._localVlaues.caseTeamClientId);
    let clientID = currentClientId + this._openCards.getHasKey();
    localStorage.setItem("clientId", clientID.toString());
    this.router.navigate(["/reports/client/details"]);
  }

  public async getStaffRecById(staffID: number) {
    let request = { staffID: staffID };
    let response = await this.clildFormService.getDetailsById(request);
    console.log("Selected staff response", response);
  }
}
