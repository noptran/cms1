import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { ClildFormService } from "../child-forms/child-forms.service";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { CaseTeamService } from "../case-team/case-team.service";
import swal from "sweetalert2";
import { FamilyMember } from "./family-member";
import { MessageService } from "primeng/api";
import { LocalValues } from "../local-values";
import { isNullOrUndefined } from "util";
import * as moment from "moment";

@Component({
  selector: "app-famil-member-form",
  templateUrl: "./famil-member-form.component.html",
  styleUrls: ["./famil-member-form.component.scss"],
  inputs: ["isComponent", "isEdit"],
  outputs: ["isFomrOpen"],
})
export class FamilMemberFormComponent implements OnInit {
  familMemberForm: FormGroup;
  // familMember: FamilyMember = new FamilyMember();
  familMember = new FamilyMember();
  selectedFamilmemberId: any;
  editBtnCntrl = false;
  cities = [];
  counties = [];
  zipcodes = [];
  filteredCities = [];
  filteredZipcodes = [];
  filteredCounties = [];
  selectedStateID = null;
  selectedCityID = null;
  title = "Family Member";
  status = "active";
  formStatus = "draft";
  breadcrumbs = [];
  metaData = [];
  mainTabs = [];
  formDisableCntrl = false;
  sIndex: number = null;
  section1 = [
    "firstName",
    "lastName",
    "acronym",
    "mi",
    "suffix",
    "conST",
    "genderID",
    "raceID",
    "deceased",
    "ethnicityID",
    "ssn",
    "dob",
  ];
  section2 = [
    "tribeID",
    "email",
    "cellPh",
    "fax",
    "workPh",
    "homePh",
    "ext",
    "address",
    "unknownAddress",
    "cityID",
    "stateID",
    "pager",
  ];
  // religion and length of employment
  section3 = [
    "contyID",
    "zipcodeID",
    "employer",
    "occupation",
    "employmentStatus",
    "primaryLanguage",
    "secondaryLanguage",
    "isUSCitizen",
    "citizenship",
  ];
  invalid = [];
  subtitle: any;
  opencards = [];
  iconurl =
    "https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/";
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  @Input() isComponent = false;
  @Input() isEdit = false;
  @Output() isFomrOpen = new EventEmitter();
  @Output() familyMemberCancel = new EventEmitter();

  constructor(
    public _local: LocalValues,
    public messageService: MessageService,
    public _fb: FormBuilder,
    public _router: Router,
    public _person: ClildFormService,
    public _caseTeam: CaseTeamService,
    public _localValues: LocalValues
  ) {}

  ngOnInit() {
    this.setIndex(0);
    if (this._router.url == "/reports/familyMember/details") {
      this.getCustomercarePersonDetails();
      this.onCheckBreadCrumbs();
    } else {
      if (
        this._localValues.personInitialDetailsFromPersonMasterCreation !==
          null &&
        this._localValues.personInitialDetailsFromPersonMasterCreation !==
          undefined
      ) {
        this.familMember.firstName = this._localValues.personInitialDetailsFromPersonMasterCreation.firstName;
        this.familMember.lastName = this._localValues.personInitialDetailsFromPersonMasterCreation.lastName;
        this.familMember.ssn = this._localValues.personInitialDetailsFromPersonMasterCreation.ssn;
      }
    }
    this.defineOpencards();
    this.formValidation();
    this.defineMainTabs();
    // this.breadcrumbs = [
    //   { label: 'List', href: "/reports/familyMember", active: '' },
    //   { label: 'Form', active: 'active' },
    // ]
  }

  /**
   * Validating form
   */
  formValidation() {
    this.familMemberForm = this._fb.group({
      lastName: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.maxLength(25)])
      ),
      firstName: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.maxLength(25)])
      ),
      cityID: new FormControl("", Validators.compose([Validators.required])),
      address: new FormControl("", Validators.compose([Validators.required])),
      notes: "",
      genderID: "",
      raceID: "",
      cellPh: "",
      workPh: "",
      suffix: "",
      homePh: "",
      zipcodeID: new FormControl("", Validators.compose([Validators.required])),
      pager: "",
      dob: "",
      stateID: new FormControl("", Validators.compose([Validators.required])),
      fax: "",
      mi: new FormControl("", Validators.maxLength(2)),
      email: "",
      countyID: new FormControl("", Validators.compose([Validators.required])),
      ssn: "",
      ext: "",
      contract_StateID: "",
      employer: "",
      occupation: "",
      employmentStatus: "",
      primaryLanguageID: "",
      secondaryLanguageID: "",
      isUSCitizen: "",
      citizenship: "",
      denomination: "",
      acronym: "",
      ethnicityID: "",
      deceasedDate: "",
      unknownAddress: "",
      tribeID: "",
      employmentStatusID: "",
      tenureID: "",
      educationLevelID: "",
      religionID: "",
    });
  }

  /**
   * Save the form details
   */
  save(data) {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    if (this.familMember.unknownAddress || this.familMemberForm.valid) {
      data.cityID = data.cityID ? data.cityID.cityID : null;
      data.countyID = data.countyID ? data.countyID.countyID : null;
      data.educationLevelID = data.educationLevelID
        ? data.educationLevelID.educationLevelID
        : null;
      data.employmentStatusID = data.employmentStatusID
        ? data.employmentStatusID.employmentStatusID
        : null;
      data.tenureID = data.tenureID
        ? data.tenureID.tenureID
        : null;
      data.ethnicityID = data.ethnicityID ? data.ethnicityID.ethnicityID : null;
      data.genderID = data.genderID ? data.genderID.genderID : null;
      data.primaryLanguageID = data.primaryLanguageID
        ? data.primaryLanguageID.languageID
        : null;
      data.raceID = data.raceID ? data.raceID.raceID : null;
      data.contract_StateID = data.contract_StateID
        ? data.contract_StateID.stateID
        : null;
      data.religionID = data.religionID ? data.religionID.religionID : null;
      data.secondaryLanguageID = data.secondaryLanguageID
        ? data.secondaryLanguageID.languageID
        : null;
      data.stateID = data.stateID ? data.stateID.stateID : null;
      data.tribeID = data.tribeID ? data.tribeID.tribeID : null;
      data.zipcodeID = data.zipcodeID ? data.zipcodeID.zipcodeID : null;
      data.dob ? (data.dob = this._local.stringFormatDatetime(data.dob)) : null;
      data.deceasedDate
        ? (data.deceasedDate = new Date(data.deceasedDate).getTime())
        : null;
      this.familMember.entity = "familyMember";
      this.familMember = data;
      console.log("data", data);
      // if (this.familMember.unknownAddress) {
      //   this.formValidationUnknownAddress();
      // }
      // else{
      //   this.formValidation();
      // }

      if (this.familMember.familyMemberID) {
        this._person
          .updateClient(this.familMember)
          .then((data) => {
            loader.style.display = "none";
            this.editBtnCntrl = true;

            if (this.isComponent) {
              this.isFomrOpen.emit({ isFormResponse: true, data: data });
              swal("Updated", "Family Member has been updated!", "success");
            } else {
              swal("Updated!", "Details are updated", "success");
              return this._router.navigate(["/reports/familyMember"]);
            }
          })
          .catch(() => {
            this.editBtnCntrl = false;
          });
      } else {
        this._person
          .saveClient(this.familMember)
          .then((data) => {
            loader.style.display = "none";
            this.editBtnCntrl = true;

            if (this.isComponent) {
              this.isFomrOpen.emit({ isFormResponse: true, data: data });
              swal("Saved", "Family Member has been saved!", "success");
            } else {
              swal("Saved!", "Details are saved", "success");
              return this._router.navigate(["/reports/familyMember"]);
            }
          })
          .catch(() => {
            this.editBtnCntrl = false;
          });
      }
    } else {
      swal("Fill the required fields!", "", "warning").then((data) => {
        if (data) {
          loader.style.display = "none";
        }
      });
    }
  }

  /***
   * Update the form details
   */
  update() {
    this.editBtnCntrl = false;
    this.familMemberForm.enable();
  }

  /**
   * discard form
   */
  discard() {
    if (this.isComponent) {
      console.log("Discard happening in component.");
      this.familyMemberCancel.emit({ exit: true });
      return;
    } else {
      return this._router.navigate(["/reports/familyMember"]);
    }
  }

  /**
   * Get the metadata for dropdowns
   */
  getMetaData(event, label) {
    let metaDataObj, metaDataReq;
    switch (label) {
      case "gender":
        metaDataObj = "gender";
        break;
      case "race":
        metaDataObj = "race";
        break;
      case "city":
        this.getCities(event);
        break;
      case "state":
        this.familMemberForm.controls["cityID"].disable();
        this.familMemberForm.controls["countyID"].disable();
        this.familMemberForm.controls["zipcodeID"].disable();
        metaDataObj = "state";
      case "zipcode":
        this.filterZIPCode(event);
        break;
      case "county":
        this.filterCounty(event);
        break;
      case "ethnicity":
        metaDataObj = "ethnicity";
        break;
      case "employmentStatus":
        metaDataObj = "employmentStatus";
        break;
      case "language":
        metaDataObj = "language";
        break;
      case "educationLevel":
        metaDataObj = "educationLevel";
        break;
      case "religion":
        metaDataObj = "religion";
        break;
      case "tribe":
        metaDataObj = "tribe";
        break;
      case "primary_ref_reason":
        metaDataObj = "tenure";
        break;
    }
    if (metaDataObj) {
      metaDataReq = { Object: metaDataObj, value: event.query };
      this._caseTeam.getSearchList(metaDataReq).then((data) => {
        this.metaData = data.dropDown;
      });
    }
  }

  /**
   * Get the cities and counties based on selected state
   * @param event keyboard event
   */
  generateCityFromSelectedSatate(event) {
    console.log("Selected state", event);
    let reqForCities;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.familMemberForm.controls["cityID"].enable();
    this.selectedStateID = event.stateID;
    reqForCities = { stateID: event.stateID };
    this._person.getCityFromState(reqForCities).then((data) => {
      loader.style.display = "none";
      this.cities = data.city;
      this.counties = data.county;
    });
  }

  /**
   * Get the filtered cities
   * @param event keyboard event
   */
  getCities(event) {
    this.filteredCities = [];
    this.cities.filter((data) => {
      if (data.city.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredCities.push(data);
      }
    });
  }

  /**
   * Get the zipcode and counties based on selected state id and selected city id
   */
  getZIPCode() {
    let reqForZIPCode;
    this.zipcodes = [];
    this.counties = [];
    reqForZIPCode = {
      stateID: this.selectedStateID,
      cityID: this.selectedCityID,
    };
    this._person.getZipcodeFromCityState(reqForZIPCode).then((data) => {
      this.zipcodes = data.zipcode;
      this.counties = data.county;
    });
  }

  /**
   * Get the filtered zipcodes
   * @param event keyboard event
   */
  filterZIPCode(event) {
    this.filteredZipcodes = [];
    this.zipcodes.filter((data) => {
      if (data.zipcode.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredZipcodes.push(data);
      }
    });
  }

  /**
   * Get the filtered counties
   * @param event keyboard event
   */
  filterCounty(event) {
    this.counties.filter((data) => {
      this.filteredCounties = [];
      if (data.countyName.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredCounties.push(data);
      }
    });
  }

  /**
   * Get the selected city ID
   * @param event keyboard event
   */
  selectedCity(event) {
    this.familMemberForm.controls["zipcodeID"].enable();
    this.familMemberForm.controls["countyID"].enable();
    this.selectedCityID = event.cityID;
    this.getZIPCode();
  }

  /**
   * Get the record details based on ID
   */
  getCustomercarePersonDetails(selectedFamilmemberId?: number) {
    this.editBtnCntrl = true;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.selectedFamilmemberId = parseInt(
      localStorage.getItem("FamilyMemberID")
    );
    let req = { familyMemberID: this.selectedFamilmemberId };
    if (selectedFamilmemberId) {
      console.log("test");
      req = { familyMemberID: selectedFamilmemberId };
    }
    this._person.getDetailsById(req).then((data) => {
      this.familMemberForm.disable();
      loader.style.display = "none";
      // data.person.dob ? new Date(data.person.dob) : null;
      // data.person.deceasedDate ? new Date(data.person.deceased) : null;
      this.familMember = data.person;
      this.familMember.dob = !isNullOrUndefined(data.person.dob)
        ? new Date(data.person.dob)
        : null;
      this.familMember.deceasedDate = !isNullOrUndefined(
        data.person.deceasedDate
      )
        ? new Date(data.person.deceasedDate)
        : null;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.person.changedBy)
        ? data.person.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(data.person.changedDate)
        ? moment(data.person.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.person.enteredBy)
        ? data.person.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.person.enteredDate)
        ? moment(data.person.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";

      this.subtitle =
        this.familMember.firstName + " " + this.familMember.lastName;
    });
  }

  /**
   * Define main tabs in the form section
   */
  defineMainTabs() {
    return (this.mainTabs = [
      { label: "Section 1", href: "#nav-1" },
      { label: "Section 2", href: "#nav-2" },
      { label: "Section 3", href: "#nav-3" },
      { label: "Section 4", href: "#nav-4" },
    ]);
  }

  /**
   *
   * @param index index value of tab
   */
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
    if (invalid.length > 0 && !this.isComponent) {
      console.log("%%%%%", invalid);
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
    const controls = this.familMemberForm.controls;
    for (const name in controls) {
      if (section.indexOf(name) !== -1) {
        if (controls[name].invalid) {
          this.invalid.push(name);
        }
      }
    }
    return this.invalid;
  }

  defineOpencards() {
    this.opencards = [
      {
        title: "Household Members",
        tip: "Household Members",
        navigation: "",
        icon: this.iconurl + "assessment icon.svg",
      },
      {
        title: "Extended Family",
        tip: "Extended Family",
        navigation: "",
        icon: this.iconurl + "assessment icon.svg",
      },
    ];
  }

  navigateTo(label: any) {
    let url: any;
    switch (label) {
      case "Household Members":
        url = "/reports/familyMember/household-member";
        break;

      case "Extended Family":
        url = "/reports/familyMember/extended-family";
        break;
    }
    this._router.navigate([url]);
  }

  formValidationUnknownAddress() {
    this.familMemberForm = this._fb.group({
      lastName: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.maxLength(25)])
      ),
      firstName: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.maxLength(25)])
      ),
      cityID: "",
      address: "",
      notes: "",
      genderID: "",
      raceID: "",
      cellPh: "",
      workPh: "",
      suffix: "",
      homePh: "",
      zipcodeID: "",
      pager: "",
      dob: "",
      stateID: "",
      fax: "",
      mi: new FormControl("", Validators.maxLength(2)),
      email: "",
      countyID: "",
      ssn: "",
      ext: "",
      contract_StateID: "",
      employer: "",
      occupation: "",
      employmentStatus: "",
      primaryLanguageID: "",
      secondaryLanguageID: "",
      isUSCitizen: "",
      citizenship: "",
      denomination: "",
      acronym: "",
      ethnicityID: "",
      deceasedDate: "",
      unknownAddress: "",
      tribeID: "",
      employmentStatusID: "",
      tenureID: "",
      educationLevelID: "",
      religionID: "",
    });
  }

  onCheckBreadCrumbs() {
    if (this._localValues.previousurl === "/reports/extended-family/detail") {
      this.breadcrumbs = [
        { label: "Extended-Family", href: "/reports/extended-family/detail" },
      ];
      console.log(
        "local storage value",
        localStorage.getItem("familyMemberId")
      );
      const familyMemberId = parseInt(localStorage.getItem("familyMemberId"));
      this.getCustomercarePersonDetails(familyMemberId);
    } else {
      this.breadcrumbs = [
        { label: "List", href: "/reports/familyMember", active: "" },
        { label: "Form", active: "active" },
      ];
    }
  }

  navigateToExtendedFamily() {
    this._router.navigate(["/reports/extended-family/detail"]);
  }
}
