import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { ClildFormService } from "../../../child-forms/child-forms.service";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { TeamFormService } from "../../../team-form/team-form.service";
import { CaseTeamService } from "./../../../case-team/case-team.service";
import { ProviderMember, ProviderMemberStatus } from "./provider-member";
import { MessageService } from "primeng/api";
import {LocalValues} from "../../../local-values";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import * as moment from "moment";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-provider-member-form",
  templateUrl: "./provider-member-form.component.html",
  styleUrls: ["./provider-member-form.component.scss"],
  inputs: [
    "isAppHeader",
    "isEditMode",
    "isComponent",
    "predefinedData",
    "isProvider",
    "isProviderMember",
    "isAdult",
    "isChild",
  ],
})
export class ProviderMemberFormComponent implements OnInit {
  columnDefs = [];
  rowData = [];
  defaultColDef;
  orgForm: FormGroup;
  mainTabs = [];
  selectedproviderMemberID;
  providerMember: ProviderMember = new ProviderMember();
  status = "draft";
  breadcrumbs = [];
  editForm;
  updateUser: boolean = false;
  isStatusFormEdit = false;
  searchResults = [];
  userDetails;
  sIndex = 0;
  title = "Provider Member";
  section1 = [
    "firstName",
    "lastName",
    "acronym",
    "mi",
    "conST",
    "genderID",
    "deceased",
    "ethnicityID",
    "tribeID",
    "pager",
    "workPh",
    "ext",
  ];
  section2 = ["cellPh", "fax", "email", "address", "dob", "homePh", "raceID"];
  section3 = [
    "isChild",
    "employer",
    "occupation",
    "employmentStatus",
    "lengthOfEmployment",
    "primaryLanguage",
    "secondaryLanguage",
    "educationLevel",
    "isUSCitizen",
    "citizenship",
    "religion",
    "denomination",
  ];
  invalid = [];
  proivderMemberStatusForm: FormGroup;
  @Input()
  isAppHeader = true;
  isComponent: boolean;
  predefinedData: any;
  currentProviderId: number;
  isProvider: boolean;
  isAdult: boolean = false;
  isChild: boolean = false;
  isProviderMember: boolean;
  @Output()
  onSave = new EventEmitter();

  infoText: string;
  providerMemberStatus: ProviderMemberStatus = new ProviderMemberStatus();
  listOfProviderMeberStatus = [];
  isProviderMemberUpdateBtnVisible = false;
  isProviderMemberStatusValid = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(
    public formBuilder: FormBuilder,
    public _CaseTeamService: CaseTeamService,
    public clildFormService: ClildFormService,
    public router: Router,
    public _team: TeamFormService,
    public messageService: MessageService,
    public _localValues: LocalValues,
    public _opencard: OpencardsService
  ) {}

  ngOnInit() {
    this.setIndex(0);
    this.formValidation();
    this.provierMemberStatusFormValidation();
    this.defineMainTabs();
    if (this.isProvider) {
      if (this.predefinedData !== null && this.predefinedData !== undefined) {
        this.providerMember.firstName = this.predefinedData.firstName;
        this.providerMember.lastName = this.predefinedData.lastName;
        this.providerMember.ssn = this.predefinedData.ssn;
      }
    }
    if (this.isComponent) {
      this.getDhsStaffDetails();
      this.listOfProviderMeberStatus;
    }
    if (this.isAdult) {
      this.getDhsStaffDetails();
      this.isComponent = true;
    }
    if (this.isChild) {
      this.getDhsStaffDetails();
      this.isComponent = true;
    }
    if (
      this.router.url.includes("/reports/providerMember") ||
      this.router.url.includes("/reports/providerMember/new") ||
      this.router.url.includes("/reports/providerMember/detail")
    ) {
      this.isProviderMember = true;
    }

    if (
      this.router.url == "/reports/providerMember/details" ||
      this.isComponent == true
    ) {
      this.getDhsStaffDetails();
    } else {
      if (
        this._localValues.personInitialDetailsFromPersonMasterCreation !==
          null &&
        this._localValues.personInitialDetailsFromPersonMasterCreation !==
          undefined
      ) {
        this.providerMember.firstName = this._localValues.personInitialDetailsFromPersonMasterCreation.firstName;
        this.providerMember.lastName = this._localValues.personInitialDetailsFromPersonMasterCreation.lastName;
      }
    }
    this.breadcrumbs.push(
      { label: "List", href: "/reports/providerMember", active: "" },
      { label: "Form", active: "active" }
    );
    if (this.predefinedData) {
      this.providerMember.firstName = this.predefinedData.firstName;
      this.providerMember.lastName = this.predefinedData.lastName;
      this.providerMember.ssn = this.predefinedData.ssn;
    }
    this.currentProviderId =
      parseInt(localStorage.getItem("providerID")) - this._opencard.getHasKey();
  }

  defineMainTabs() {
    return (this.mainTabs = [
      { label: "Section 1", href: "#nav-general" },
      { label: "Section 2", href: "#nav-contact" },
      { label: "Section 3", href: "#nav-other" },
      { label: "Section 4", href: "#nav-notes" },
    ]);
  }

  discardForm() {
    return window.history.back();
  }

  getDhsStaffDetails() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.updateUser = true;
    this.orgForm.disable();
    this.selectedproviderMemberID =
      parseInt(localStorage.getItem("providerMemberId")) -
      this._opencard.getHasKey();
    let req = {
      providerMemberID: this.selectedproviderMemberID,
      providerID:
        parseInt(localStorage.getItem("providerID")) -
        this._opencard.getHasKey(),
    };
    console.log(
      "localStorage.getItem('providerMemberId')>>>>",
      localStorage.getItem("providerMemberId")
    );
    console.log("lthis._opencard.getHasKey()>>>>", this._opencard.getHasKey());
    console.log(
      "parseInt(localStorage.getItem('providerMemberId')) - this._opencard.getHasKey()>>>>",
      parseInt(localStorage.getItem("providerMemberId")) -
        this._opencard.getHasKey()
    );
    this.clildFormService.getDetailsById(req).then((data) => {
      loader.style.display = "none";
      data.person.dob = data.person.dob ? new Date(data.person.dob) : null;
      if (this.isAdult || this.isChild || this.isComponent) {
        this.listOfProviderMeberStatus = data.providermemberstatus;
        this.listOfProviderMeberStatus.map((itm) => {
          var data = {
            personTypeID: itm.personTypeID,
            personType: itm.personType,
            allowFaxAck: null,
            caseActivity: null,
            caseActivity_BHOK: null,
            caseActivity_CareCenter: null,
            caseActivity_FCH: null,
            caseActivity_Mileage: null,
            caseActivity_NCBHOK: null,
            caseActivity_NCFCHNE: null,
            caseActivity_NCFCHOK: null,
            caseActivity_NCKIPP: null,
            caseActivity_NCOPS: null,
            caseTeam: null,
            caseTeamBridgeway: null,
            caseTeamEndDateBridgeway: null,
            caseTeamEndDateFC: null,
            caseTeamEndDateFP: null,
            caseTeamEndDateNE: null,
            caseTeamEndDateOK: null,
            caseTeamEndDatePRTF: null,
            caseTeamFP: null,
            caseTeamNE: null,
            caseTeamOK: null,
            caseTeamPRTF: null,
            child: null,
            clientReferral: true,
            createdDate: null,
            custCareRelationshipType: null,
            engage: null,
            familySafetyRelationshipType: null,
            fccaseActivityEndDate: null,
            isActive: null,
            isCaseActivity: null,
            isCaseActivity_BHOK: null,
            isCaseActivity_CareCenter: null,
            isCaseActivity_FCH: null,
            isCaseActivity_Mileage: null,
            isCaseActivity_NCBHOK: null,
            isCaseActivity_NCFCHNE: null,
            isCaseActivity_NCFCHOK: null,
            isCaseActivity_NCKIPP: null,
            isCaseActivity_NCOPS: null,
            isCaseTeam: null,
            isCaseTeamBridgeway: null,
            isCaseTeamFP: null,
            isCaseTeamNE: null,
            isCaseTeamOK: null,
            isCaseTeamPRTF: null,
            isChild: null,
            isClientReferral: true,
            isCustCareRelationshipType: null,
            isDeleted: null,
            isEngage: null,
            isFamilySafetyRelationshipType: null,
            isOtherAgency: null,
            isPR_DirectorAuthorization: null,
            isPlacementPlan: null,
            isPlanOfAction: null,
            isProviderContact: null,
            isProviderContact_BHOK: null,
            isProviderContact_NCFCHNE: null,
            isProviderContact_NCFCHOK: null,
            isProviderStaffKS: null,
            isProviderStaffNE: null,
            isProviderStaffOK: null,
            isRecruitmentStaff_KS: null,
            isRecruitmentStaff_NE: null,
            isRecruitmentStaff_OK: null,
            isRelative: null,
            isRelative_MoveForm: null,
            isStaff: null,
            isStaffPosition: null,
            isStaff_MoveForm: null,
            isTransportation: null,
            isWorkerChildVisitActivityLog: null,
            lastModifiedDate: null,
            otherAgency: null,
            placementPlan: null,
            planOfAction: null,
            pr_DirectorAuthorization: null,
            providerContact: null,
            providerContact_BHOK: null,
            providerContact_NCFCHNE: null,
            providerContact_NCFCHOK: null,
            providerStaffKS: null,
            providerStaffNE: null,
            providerStaffOK: null,
            recruitmentStaff_KS: null,
            recruitmentStaff_NE: null,
            recruitmentStaff_OK: null,
            relative: null,
            relative_MoveForm: null,
            staff: null,
            staffPosition: null,
            staff_MoveForm: null,
            transportation: null,
            treeBuilder2ID: null,
            updatedDate: null,
            workerChildVisitActivityLog: null,
          };
          itm.personTypeID = data;
        });
      }
      data.person.contract_StateID = null;
      this.providerMember = data.person;
      this.listOfProviderMeberStatus = data.providermemberstatus;
      this.providerMember["lengthOfEmployment"] = data.person.tenureID;
      this.orgForm.disable();
      this.editForm = true;
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
    });
  }

  formValidation() {
    this.orgForm = this.formBuilder.group({
      cellPh: "",
      email: [null],
      firstName: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.maxLength(25)])
      ),
      genderID: "",
      homePh: "",
      lastName: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.maxLength(25)])
      ),
      mi: new FormControl("", Validators.compose([Validators.maxLength(2)])),
      notes: new FormControl(
        "",
        Validators.compose([Validators.maxLength(225)])
      ),
      fax: "",
      pager: "",
      tribeID: "",
      ethnicityID: "",
      raceID: "",
      ext: "",
      workPh: "",
      acronym: "",
      deceased: "",
      // "contractState": '',
      suffix: "",
      ssn: "",
      address: "",
      dob: "",
      // "constractState": '',
      isChild: "",
      employer: "",
      occupation: "",
      employmentStatusID: "",
      lengthOfEmployment: "",
      primaryLanguageID: "",
      secondaryLanguageID: "",
      educationLevelID: "",
      isUSCitizen: "",
      citizenship: "",
      religionID: "",
      denomination: "",
    });
  }

  getMetaData(event, label) {
    let metaDataObj, metaDataReq;
    switch (label) {
      case "gender":
        metaDataObj = "gender";
        break;
      case "race":
        metaDataObj = "race";
        break;
      case "tribe":
        metaDataObj = "tribe";
        break;
      case "ethnicity":
        metaDataObj = "ethnicity";
        break;
      case "religion":
        metaDataObj = "religion";
        break;
      case "language":
        metaDataObj = "language";
        break;
      case "employmentStatus":
        metaDataObj = "employmentStatus";
        break;
      case "educationLevel":
        metaDataObj = "educationLevel";
        break;
      case "state":
        metaDataObj = "state";
        break;
      case "personType":
        metaDataObj = "personType";
        break;
      case "lengthOfEmployment":
        metaDataObj = "tenure";
        break;
    }
    if (metaDataObj) {
      metaDataReq = { Object: metaDataObj, value: event.query };
      this._CaseTeamService.getSearchList(metaDataReq).then((data) => {
        this.searchResults = data.dropDown;
      });
    }
  }

  // getGender(event) {
  //   let req = {
  //     "Object": "gender",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getEthnicity(event) {
  //   let req = {
  //     "Object": "ethnicity",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getTribe(event) {
  //   let req = {
  //     "Object": "tribe",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getRace(event) {
  //   let req = {
  //     "Object": "race",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getReligion(event) {
  //   let req = {
  //     "Object": "religion",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getLanguage(event) {
  //   let req = {
  //     "Object": "language",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getStatus(event) {
  //   let req = {
  //     "Object": "employmentStatus",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getLevel(event) {
  //   let req = {
  //     "Object": "educationLevel",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getState(event) {
  //   let req = {
  //     "Object": "state",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

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
    let section = this.sectionSelection();
    let invalid = this.findInvalidControls(section);
    if (invalid.length > 0) {
      this.messageService.add({
        severity: "info",
        summary: "Invalid",
        detail: "Invalid",
      });
    } else {
      let tabName = this.mainTabs[this.sIndex + 1].href.split("#")[1];
      let previoustabName = this.mainTabs[this.sIndex].href.split("#")[1];
      let nav1 = document.getElementById(tabName);
      let nav2 = document.getElementById(previoustabName);
      nav1.classList.add("active");
      nav1.classList.add("in");
      nav2.classList.remove("active");
      nav2.classList.remove("in");
      this.setIndex(this.sIndex + 1);
    }
  }

  goPrevious() {
    let tabName = this.mainTabs[this.sIndex - 1].href.split("#")[1];
    let previoustabName = this.mainTabs[this.sIndex].href.split("#")[1];
    let nav1 = document.getElementById(tabName);
    let nav2 = document.getElementById(previoustabName);
    nav1.classList.add("active");
    nav1.classList.add("in");
    nav2.classList.remove("active");
    nav2.classList.remove("in");
    this.setIndex(this.sIndex - 1);
  }

  findInvalidControls(section) {
    this.invalid = [];
    let controls = this.orgForm.controls;
    for (let name in controls) {
      if (section.indexOf(name) !== -1) {
        if (controls[name].invalid) {
          this.invalid.push(name);
        }
      }
    }
    return this.invalid;
  }

  getUserById() {
    //  let userId = '7';
    let userId = localStorage.getItem("UserId");
    this._team.getUserById({ staffID: parseInt(userId) }).then((data) => {
      console.log("getUserById", data);
      this.userDetails = data.users;
    });
  }

  edit() {
    this.orgForm.enable();
  }

  addPost(post) {
    post.tribeID = post.tribeID ? post.tribeID.tribeID : null;
    post.ethnicityID = post.ethnicityID ? post.ethnicityID.ethnicityID : null;
    post.genderID = post.genderID ? post.genderID.genderID : null;
    post.raceID = post.raceID ? post.raceID.raceID : null;
    post.religionID = post.religionID ? post.religionID.religionID : null;
    post.educationLevelID = post.educationLevelID
      ? post.educationLevelID.educationLevelID
      : null;
    post.secondaryLanguageID = post.secondaryLanguageID
      ? post.secondaryLanguageID.languageID
      : null;
    post.primaryLanguageID = post.primaryLanguageID
      ? post.primaryLanguageID.languageID
      : null;
    post.employmentStatusID = post.employmentStatusID
      ? post.employmentStatusID.employmentStatusID
      : null;
    post.dob = post.dob
      ? this._localValues.stringFormatDatetime(new Date(post.dob).getTime())
      : null;
    post["tenureID"] = post.lengthOfEmployment
      ? post.lengthOfEmployment.tenureID
      : null;
    post.providerID =
      parseInt(localStorage.getItem("providerID")) - this._opencard.getHasKey();
    if (!this.isProvider && !this.isProviderMember) {
      if (this.listOfProviderMeberStatus.length == 0 || this.isStatusFormEdit) {
        if (this.isProviderMemberStatusValid) {
          this.listOfProviderMeberStatus.map((item: ProviderMemberStatus) => {
            item.personTypeID = item.personTypeID.personTypeID;
            item.beginDate = item.beginDate
              ? this._localValues.stringFormatDatetime(item.beginDate)
              : null;
            item.endDate = item.endDate
              ? this._localValues.stringFormatDatetime(item.endDate)
              : null;
            item.providerID =
              parseInt(localStorage.getItem("providerID")) -
              this._opencard.getHasKey();
           });
        console.log(
          "Provider memeber status save",
          this.listOfProviderMeberStatus
        );
      } else {
        this.infoText = "Please save the provider member status form!";
        return;
      }
    }
  }

    post["providerMemberProvider"] = this.listOfProviderMeberStatus;
    // if (this.isAdult) {
    //   post.entity = 'ProviderMember';
    //   if (this.updateUser) {
    //     this.updateClient(post);
    //   } else {
    //     this.saveClient(post);
    //   }
    //}else{
    // if (this.orgForm.invalid) {
    //   this.infoText = 'Fill the mandatory fields';
    // } else {
    post.entity = "ProviderMember";
    if (this.updateUser) {
      this.updateClient(post);
    } else {
      this.saveClient(post);
    }
    //}
    //}
  }

  getTodayDate() {
    let todayDate;
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    if (date !== "" && date !== null && JSON.stringify(date).includes("-")) {
      let myDate2 = date.split("-");
      var newDate = myDate2[0] + "/" + myDate2[1] + "/" + myDate2[2];
      todayDate = new Date(newDate).getTime();
    }
    return todayDate;
  }

  saveClient(post) {
    // post.enteredBy = this.userDetails.firstName;
    // post.enteredDate = this.getTodayDate();
    //!this.isAdult ? (post.isChild = true) : (post.isChild = false);
    if (this.router.url.includes("/provider/opencard/In-home-family-members/adults/view")) {
    return this.saveAdult(post);
    } else if (this.router.url.includes("/provider/opencard/In-home-family-members/children/view")) {
    return this.saveChild(post);
    } else {
      this.saveProviderMember(post);
    }
  }

  saveProviderMember(post) {
    this.router.url.includes("In-home-family-members/adults/view")
    ? (post.isChild = false)
    : (post.isAdult = true);
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.clildFormService.saveClient(post).then((data) => {
    loader.style.display = "none";
      if (data.responseStatus) {
        this.infoText = "Provider Member saved successfully";
      if (this.isComponent || this.isProvider) {
        this.onSave.emit({ isProviderFormstatus: false });
        swal("Success", "Provider Member saved successfully", "success");
      } else {
        return this.router.navigate(["/reports/providerMember"]);
      }
      } else {
        this.infoText = "Provider Member not saved";
      }
    });
  }

  saveAdult(post) {
    this.router.url.includes("In-home-family-members/adults/view")
    ? (post.isChild = false)
    : (post.isAdult = true);
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.clildFormService.saveClient(post).then((data) => {
    loader.style.display = "none";
      if (data.responseStatus) {
        this.infoText = "Provider Member saved successfully";
      if (!this.isComponent || this.isProvider) {
        this.onSave.emit({ isProviderFormstatus: false });
      } else {
        return this.router.navigate(["/provider/opencard/In-home-family-members/adults/view"]);
      }
      } else {
        this.infoText = "Provider Member not saved";
      }
    });
  }
  saveChild(post)
  {
    this.router.url.includes("In-home-family-members/children/view")
    ? (post.isChild = true)
    : (post.isAdult = false);
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.clildFormService.saveClient(post).then((data) => {
    loader.style.display = "none";
      if (data.responseStatus) {
        this.infoText = "Provider Member saved successfully";
      if (!this.isComponent || this.isProvider) {
        this.onSave.emit({ isProviderFormstatus: false });
      } else {
        return this.router.navigate(["/provider/opencard/In-home-family-members/children/view"]);
      }
      } else {
        this.infoText = "Provider Member not saved";
      }
    });
  }

  updateClient(post) {
    // post.changedBy = this.userDetails.firstName;
    // post.changedDate = this.getTodayDate();
    //!this.isAdult ? (post.isChild = true) : (post.isChild = false);
    if (this.router.url.includes("/provider/opencard/In-home-family-members/adults/view")) {
    return this.updateAdult(post);
    } else if (this.router.url.includes("/provider/opencard/In-home-family-members/children/view")) {
    return this.updateChild(post);
    } else {
      return this.updateProviderMember(post);
    }
  }

  updateProviderMember(post)
  {
    this.router.url.includes("In-home-family-members/adults/view")
      ? (post.isChild = false)
      : (post.isAdult = true);
    post.providerMemberID = this.selectedproviderMemberID;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.clildFormService.updateClient(post).then((data) => {
      loader.style.display = "none";
      if (data.responseStatus) {
        this.infoText = "Provider Member saved successfully";
        if (this.isComponent || this.isProvider || this.isAdult) {
          this.onSave.emit({ isProviderFormstatus: false });
          swal("Success", "Provider Member updated successfully", "success");
        } else {
          return this.router.navigate(["/reports/providerMember"]);
        }
      } else {
        this.infoText = "Provider Member not saved";
      }
    });
  }

  updateAdult(post)
  {
    if(this.router.url.includes("/provider/opencard/In-home-family-members/adults/view")) {
    this.router.url.includes("In-home-family-members/adults/view")
      ? (post.isChild = false)
      : (post.isAdult = true);
    post.providerMemberID = this.selectedproviderMemberID;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.clildFormService.updateClient(post).then((data) => {
      loader.style.display = "none";
      if (data.responseStatus) {
        this.infoText = "Provider Member saved successfully";
        if (this.isComponent || this.isProvider || this.isAdult) {
          this.onSave.emit({ isProviderFormstatus: false });
        } else {
          return this.router.navigate(["/provider/opencard/In-home-family-members/adults/view"]);
        }
      } else {
        this.infoText = "Provider Member not saved";
      }
    });
  }
}

updateChild(post)
  {
    if(this.router.url.includes("/provider/opencard/In-home-family-members/children/view")) {
    this.router.url.includes("In-home-family-members/children/view")
      ? (post.isChild = true)
      : (post.isAdult = false);
    post.providerMemberID = this.selectedproviderMemberID;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.clildFormService.updateClient(post).then((data) => {
      loader.style.display = "none";
      if (data.responseStatus) {
        this.infoText = "Provider Member saved successfully";
        if (this.isComponent || this.isProvider || this.isAdult) {
          this.onSave.emit({ isProviderFormstatus: false });
        } else {
          return this.router.navigate(["/provider/opencard/In-home-family-members/children/view"]);
        }
      } else {
        this.infoText = "Provider Member not saved";
      }
    });
  }
}

  onOpenProvider(url: string) {
    return this.router.navigate([url]);
  }

  provierMemberStatusFormValidation() {
    this.proivderMemberStatusForm = this.formBuilder.group({
      personType: [null, Validators.compose([Validators.required])],
      primaryContact: [null],
      beginDate: [null],
      endDate: [null],
      notes: [null],
    });
  }

  onProviderMemberStatusSave() {
    this.isStatusFormEdit = true;
    this.infoText = "";
    if (this.proivderMemberStatusForm.valid) {
      // var data = {
      //   personTypeID : this.providerMemberStatus.personTypeID,
      //   beginDate : (this.providerMemberStatus.beginDate) ? this._localValues.stringFormatDatetime(this.providerMemberStatus.beginDate) : null,
      //   endDate : (this.providerMemberStatus.endDate) ? this._localValues.stringFormatDatetime(this.providerMemberStatus.endDate) : null,
      //   providerID : parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey(),
      //   // providerMemberID: this.providerMemberStatus.providerMemberID ? this.providerMemberStatus.providerMemberID : null,
      //   // providerMemberProviderID: this.providerMemberStatus.providerMemberProviderID ? this.providerMemberStatus.providerMemberProviderID : null,
      //   notes: this.providerMemberStatus.notes ? this.providerMemberStatus.notes : null,
      //   primaryContact: this.providerMemberStatus.primaryContact,
      // }
      this.listOfProviderMeberStatus.push(this.providerMemberStatus);

      // this.listOfProviderMeberStatus.map((item: ProviderMemberStatus) => {
      //   item.personTypeID = item.personTypeID.personTypeID;
      //   item.beginDate = (item.beginDate) ? this._localValues.stringFormatDatetime(item.beginDate) : null;
      //   item.endDate = (item.endDate) ? this._localValues.stringFormatDatetime(item.endDate) : null;
      //   item.providerID = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
      // })
      return (this.providerMemberStatus = new ProviderMemberStatus());
    } else {
      return (this.infoText =
        "Mandatory fields are missing in prvovider member status form!");
    }
  }

  onPoviderMemeberStatusDelete(index: number, data: any) {
    this.isStatusFormEdit = true;
    console.log("data>>>>>>>", data);
    if (data.providerMemberProviderID) {
      let req = {
        providerMemberProviderIDs: [data.providerMemberProviderID],
      };
      this._CaseTeamService.deleteProviderMemberStatus(req).then((data) => {
        this.getDhsStaffDetails();
      });
    }
    if (data.providerMemberChildrenID) {
      let req = {
        providerMemberChildrenIDs: [data.providerMemberChildrenID],
      };
      this._CaseTeamService
        .deleteProviderMemberStatusChildren(req)
        .then((data) => {
          this.getDhsStaffDetails();
        });
    } else {
      if (this.listOfProviderMeberStatus.length > 0) {
        this.listOfProviderMeberStatus.splice(index, 1);
      } else {
        return (this.infoText = "Provider member status is empty!");
      }
    }
  }
  provideIndex: any;
  onProviderMemebrStatusEdit(index, selectedItem: any) {
    this.provideIndex = index;
    this.infoText = "";
    this.isProviderMemberUpdateBtnVisible = true;
    var data = {
      beginDate: selectedItem.beginDate
        ? new Date(selectedItem.beginDate)
        : null,
      endDate: selectedItem.endDate ? new Date(selectedItem.endDate) : null,
      notes: selectedItem.notes ? selectedItem.notes : null,
      primaryContact: selectedItem.primaryContact
        ? selectedItem.primaryContact
        : null,
      providerID: selectedItem.providerID ? selectedItem.providerID : null,
      personTypeID: selectedItem.personTypeID
        ? selectedItem.personTypeID
        : null,
      providerMemberID: selectedItem.providerMemberID
        ? selectedItem.providerMemberID
        : null,
      providerMemberChildrenID: selectedItem.providerMemberChildrenID
        ? selectedItem.providerMemberChildrenID
        : null,
      providerMemberProviderID: selectedItem.providerMemberProviderID
        ? selectedItem.providerMemberProviderID
        : null,
    };
    if (
      this.router.url ==
      "/provider/opencard/In-home-family-members/children/view"
    ) {
      delete data.providerMemberProviderID;
    } else if (
      this.router.url == "/provider/opencard/In-home-family-members/adults/view"
    ) {
      delete data.providerMemberChildrenID;
    }
    this.providerMemberStatus = data;
    // this.providerMemberStatus.beginDate = new Date(selectedItem.beginDate);
  }

  onProviderMemberStatusUpdate() {
    this.isStatusFormEdit = true;
    this.listOfProviderMeberStatus[
      this.provideIndex
    ] = this.providerMemberStatus;
    // this.listOfProviderMeberStatus.splice(this.listOfProviderMeberStatus.indexOf(this.providerMemberStatus), 1, this.providerMemberStatus);
    this.infoText = "The record has been updated!";
    this.providerMemberStatus = new ProviderMemberStatus();
    return (this.isProviderMemberUpdateBtnVisible = false);
  }

  checkProviderMemberStatusOpenRecord() {
    return Promise.all(
      this.listOfProviderMeberStatus.filter((item: ProviderMemberStatus) => {
        return item.endDate == null;
      })
    );
  }

  checkProviderMemberStatusPrimaryContactCheck() {
    return Promise.all(
      this.listOfProviderMeberStatus.filter((item: ProviderMemberStatus) => {
        return item.primaryContact;
      })
    );
  }

  async onProviderMemeberStatusValidate() {
    let providerMemeberStatusOpenRecord = await this.checkProviderMemberStatusOpenRecord();
    let providerMemberStatusPrimaryContactRes = await this.checkProviderMemberStatusPrimaryContactCheck();
    if (providerMemeberStatusOpenRecord.length > 1) {
      this.infoText = `There can only be one open record! You have ${providerMemeberStatusOpenRecord.length} open records.`;
      this.isProviderMemberStatusValid = false;
      return;
    } else if (providerMemberStatusPrimaryContactRes.length > 1) {
      this.infoText = `There is already primary contact entered.`;
      this.isProviderMemberStatusValid = false;
      return;
    } else {
      this.isProviderMemberStatusValid = true;
      return;
    }
  }

  setAutoFetchValues(autoFetchDetails: any) {
    console.log("Autofetch details for provider member", autoFetchDetails);
    if (autoFetchDetails.isSelection == "continue") {
      this.editForm = false;
      return this.getDhsStaffDetails();
    } else {
      this.editForm = false;
      this.providerMember = new ProviderMember();
      this.listOfProviderMeberStatus = [];
      this.providerMemberStatus = new ProviderMemberStatus();
      this.infoText = "";
      this.providerMember.firstName = autoFetchDetails.wizard.firstName;
      this.providerMember.lastName = autoFetchDetails.wizard.lastName;
    }
  }

  resetForm() {
    // resetForm
  }
}
