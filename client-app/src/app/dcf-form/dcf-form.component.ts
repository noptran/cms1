import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { ClildFormService } from "../child-forms/child-forms.service";
import { Router } from "@angular/router";
import { CaseTeamService } from "../case-team/case-team.service";
import { Dcf } from "./dcf";
import { MessageService } from "primeng/api";
import swal from "sweetalert2";
import { LocalValues } from "../local-values";
import { isNullOrUndefined } from "util";
import * as moment from "moment";
import { OpencardsService } from "../opecards-list-view/opencards.service";

@Component({
  selector: "app-dcf-form",
  templateUrl: "./dcf-form.component.html",
  styleUrls: ["./dcf-form.component.scss"],
  inputs: ["isComponent", "isEdit"],
  outputs: ["isFomrOpen"],
})
export class DcfFormComponent implements OnInit {
  title = "DCF";
  status = "active";
  formStatus = "draft";
  breadcrumbs = [];
  metaData = [];
  mainTabs = [];
  formDisableCntrl = false;
  sIndex: number = null;
  editBtnCntrl = false;
  dcfForm: FormGroup;
  dcf: Dcf = new Dcf();
  section1 = [
    "firstName",
    "lastName",
    "acronym",
    "mi",
    "suffix",
    "ssn",
    "conST",
    "genderID",
    "deceased",
    "ethnicityID",
    "tribeID",
    "email",
  ];
  section2 = [
    "workPh",
    "cellPh",
    "fax",
    "pager",
    "ext",
    "address",
    "cityID",
    "stateID",
  ];
  invalid = [];
  selectedCustomerID: any;
  subtitle: any;
  opencards = [];
  iconurl =
    "https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/";
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  caseTeamPersonJumptoTree = false;

  @Input() isComponent = false;
  @Input() isEdit = false;
  @Output() isFomrOpen = new EventEmitter();

  constructor(
    public messageService: MessageService,
    public _person: ClildFormService,
    public _router: Router,
    public _fb: FormBuilder,
    public _caseTeam: CaseTeamService,
    public _client: ClildFormService,
    public _localValues: LocalValues,
    public _openCards: OpencardsService
  ) {}

  ngOnInit() {
    this.caseTeamPersonJumptoTree = this._localValues.caseTeamPersonJumptoTree;
    this.defineOpencards();
    this.formValidation();
    this.defineMainTabs();
    this.setIndex(0);
    if (this._router.url == "/reports/dcf/details") {
      this.getDCFDetails();
    }
    this.breadcrumbs = [
      { label: "List", href: "/reports/dcf", active: "" },
      { label: "Form", active: "active" },
    ];
  }

  /**
   * Validating form
   */
  formValidation() {
    this.dcfForm = this._fb.group({
      lastName: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.maxLength(25)])
      ),
      firstName: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.maxLength(25)])
      ),
      cityID: new FormControl("", Validators.compose([Validators.required])),
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
      srsofficeID: "",
      ethnicityID: "",
      tribeID: "",
      ext: "",
    });
  }

  /**
   * Save the form details
   */
  save(data) {
    console.log("DCF Form data", data);
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    // data.dob ? data.dob = new Date(data.dob).getTime() : null;
    data.entity = "DcfStaff";
    data.genderID = data.genderID ? data.genderID.genderID : null;
    data.tribeID = data.tribeID ? data.tribeID.tribeID : null;
    data.ethnicityID = data.ethnicityID ? data.ethnicityID.ethnicityID : null;
    data.srsofficeID = data.srsofficeID ? data.srsofficeID.srsofficeID : null;
    data.contract_StateID = data.contract_StateID
      ? data.contract_StateID.stateID
      : null;
    // this.customerCare.entity = 'CustomerCarePerson';
    // this.customerCare = data;
    if (this.dcf.srsstaffID) {
      this._person
        .updateClient(this.dcf)
        .then((data) => {
          loader.style.display = "none";
          this.dcf = data.person;
          if (this.isComponent) {
            this.isFomrOpen.emit({ isFormResponse: true, data: data });
            this.messageService.add({
              severity: "info",
              summary: "Updated!",
              detail: "DCF staff has been updated!",
            });
          } else {
            swal("Updated!", "Details are updated", "success");
            this._router.navigate(["/reports/dcf/details"]);
          }
        })
        .catch(() => {
          this.editBtnCntrl = false;
        });
    } else {
      this._person
        .saveClient(this.dcf)
        .then((data) => {
          loader.style.display = "none";
          this.editBtnCntrl = true;
          if (this.isComponent) {
            this.isFomrOpen.emit({ isFormResponse: true, data: data });
            this.messageService.add({
              severity: "info",
              summary: "Saved!",
              detail: "DCF staff has been created!",
            });
          } else {
            swal("Saved!", "Details are saved", "success");
            return this._router.navigate(["/reports/dcf/"]);
          }
        })
        .catch(() => {
          this.editBtnCntrl = false;
        });
    }
    // } else {
    //   swal('Fill the required fields!', '', 'warning').then(data => {
    //     if (data) {
    //       loader.style.display = 'none';
    //     }
    //   })
    // }
  }

  /***
   * Update the form details
   */
  update() {
    this.editBtnCntrl = false;
    this.dcfForm.enable();
  }

  /**
   * discard form
   */
  discard() {
    if (this.isComponent) {
      return;
    } else {
      return this._router.navigate(["/reports/dcf"]);
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
      case "tribe":
        metaDataObj = "tribe";
        break;
      case "ethnicity":
        metaDataObj = "ethnicity";
        break;
      case "srsOffice":
        metaDataObj = "srsOffice";
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
   * Define main tabs in the form section
   */
  defineMainTabs() {
    return (this.mainTabs = [
      { label: "Section 1", href: "#nav-sec1" },
      { label: "Section 2", href: "#nav-sec2" },
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
    }
  }

  goNext() {
    const section = this.sectionSelection();
    const invalid = this.findInvalidControls(section);
    if (invalid.length > 0) {
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
    const controls = this.dcfForm.controls;
    for (const name in controls) {
      if (section.indexOf(name) !== -1) {
        if (controls[name].invalid) {
          this.invalid.push(name);
        }
      }
    }
    return this.invalid;
  }

  /**
   * Get the record details based on ID
   */
  getDCFDetails(selectedDCFStaffID?: number) {
    this.editBtnCntrl = true;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.selectedCustomerID = this._client.getId();
    this._localValues.selectedDCFID = this.selectedCustomerID;
    console.log("DCF Request", this.selectedCustomerID);
    this.req = { srsstaffID: selectedDCFStaffID };
    this._person.getDetailsById(this.req).then((data) => {
      this.dcfForm.disable();
      loader.style.display = "none";
      data.person.dob = new Date(data.person.dob);
      this.dcf = data.person;
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

      this.subtitle = this.dcf.firstName + " " + this.dcf.lastName;
    });
  }

  navigateTo(label: any) {
    let url: any;
    switch (label) {
      case "Cases":
        url = "/reports/dcf/cases";
        break;

      case "DCF Office":
        url = "/reports/dcf/office";
        break;

      case "Counties":
        url = "/reports/dcf/details/counties";
        break;
    }
    this._router.navigate([url]);
  }

  defineOpencards() {
    this.opencards = [
      {
        title: "Cases",
        tip: "Cases",
        navigation: "",
        icon: this.iconurl + "assessment icon.svg",
      },
      {
        title: "DCF Office",
        tip: "DCF Office",
        navigation: "",
        icon: this.iconurl + "assessment icon.svg",
      },
      {
        title: "Counties",
        tip: "DCF Staff County",
        navigation: "",
        icon: this.iconurl + "assessment icon.svg",
      },
    ];
  }
  ngOnDestroy() {
    this._localValues.caseTeamPersonJumptoTree = false;
  }

  onClickJumptoPlacement() {
    let currentClientId = parseInt(this._localValues.caseTeamClientId);
    let clientID = currentClientId + this._openCards.getHasKey();
    localStorage.setItem("clientId", clientID.toString());
    this._router.navigate(["/reports/client/details"]);
  }
}
