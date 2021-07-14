import { Component, OnInit } from "@angular/core";
import { HomeCounty } from "./home-county";
import { Router } from "@angular/router";
import { CaseTeamService } from "./../case-team/case-team.service";
import { ReferralViewService } from "./../referral-view/referral-view.service";
import swal from "sweetalert2";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { isNullOrUndefined } from "util";
import { ClildFormService } from "../child-forms/child-forms.service";
import * as moment from "moment";
import {LocalValues} from "../local-values";

@Component({
  selector: "app-home-county",
  templateUrl: "./home-county.component.html",
  styleUrls: ["./home-county.component.scss"],
})
export class HomeCountyComponent implements OnInit {
  status = "draft";
  subtitle: any;
  formControl: any;
  editControll = false;
  homeCounty: HomeCounty = new HomeCounty();
  countyData = [];
  homeCountyId;
  newForm = true;
  title = "Home County";
  formStatus = "draft";
  breadcrumbs = [];
  results;
  edit;
  disableProperty = false;
  clientName: any;
  countyForm: FormGroup;
  referralTypeId: any;
  quickMenu: any;
  url: any;
  isAttachmentRequired = false;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(
    public router: Router,
    public _CaseTeamService: CaseTeamService,
    public _referralView: ReferralViewService,
    public _opencard: OpencardsService,
    public _client: ClildFormService,
    public _fb: FormBuilder,
    public _localValues: LocalValues
  ) {}

  ngOnInit() {
    this.formControl = false;
    if (this.router.url.includes("/home-county/detail")) {
      this.getHomeCountyById();
      this.isAttachmentRequired = true;
    }
    // this._referralView.clientDetails().then(data => {
    //   this.clientName = data[0].clientName !== undefined ? data[0].clientName : 'Client'
    //   this.breadcrumbs.push(
    //     { label: 'List', href: "/reports/client", active: '' },
    //     { label: 'Form', href: "/reports/client/details", active: '' },
    //     { label: 'Case Form', href: "/reports/referral/family-preservation/detail", active: '' },
    //     { label: 'Home County List', href: "/reports/referral/family-preservation/home-county/view", active: '' },
    //     { label: 'Home County Form', active: 'active' },
    //   )
    // });
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case Form",
        href: "/reports/referral/family-preservation/detail",
        active: "",
      },
      {
        label: "Home County List",
        href: "/reports/referral/family-preservation/home-county/view",
        active: "",
      },
      { label: "Home County Form", active: "active" }
    );
    this.formValidation();
    let referralTypeId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._opencard.getHasKey();
    this._opencard.breadcurmbsDetermination(
      "home-county",
      referralTypeId,
      this.breadcrumbs
    );
    if (referralTypeId === 4) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "homecounty-NCFCH",
        this.breadcrumbs
      );
    }
    if (referralTypeId === 7) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "homecounty-NCRFC",
        this.breadcrumbs
      );
    }
    if (referralTypeId === 15) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseForm-BHOK",
        this.breadcrumbs
      );
    }
    if (referralTypeId === 17) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "homecounty-JJFC",
        this.breadcrumbs
      );
    }
    if (referralTypeId === 11) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "homecounty-NCMHR",
        this.breadcrumbs
      );
    }
  }

  addPost() {
    if (this.countyForm.valid) {
      let beginDate, endDate, referralId;
      referralId =
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey();
      beginDate = new Date(this.homeCounty.beginDate).getTime();
      if (this.homeCounty.endDate) {
        endDate = new Date(this.homeCounty.endDate).getTime();
      }
      this.homeCounty.beginDate = beginDate;
      this.homeCounty.endDate = endDate;
      this.homeCounty.referralID = referralId;
      this.homeCounty.countyID = this.homeCounty.countyID
        ? this.homeCounty.countyID.countyID
        : null;
      this.referralTypeId =
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencard.getHasKey();
      this.homeCounty.homeCountyID
        ? this.updateHomeCounty()
        : this.saveHomeCounty();
    } else {
      swal("Warning", "Please fill the mandatory fields", "info");
    }
  }

  saveHomeCounty() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._CaseTeamService.saveHomeCounty(this.homeCounty).then(() => {
      loader.style.display = "none";
      swal("Success", "Home county saved successfully", "success");
      this.edit = true;
      this.disableProperty = true;
      this.countyForm.disable();
      this.editControll = true;
      return this.router.navigate([
        "/reports/referral/family-preservation/home-county/view",
      ]);
    });
  }

  updateHomeCounty() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.homeCounty.homeCountyID = this._client.getId();
    this._CaseTeamService.updateHomeCounty(this.homeCounty).then(() => {
      loader.style.display = "none";
      swal("Success", "Home county saved successfully", "success");
      this.edit = true;
      this.disableProperty = true;
      this.countyForm.disable();
      this.editControll = true;
      return this.router.navigate([
        "/reports/referral/family-preservation/home-county/view",
      ]);
    });
  }

  getId() {
    this.homeCountyId = this._CaseTeamService.getId();
    this.getData();
  }

  getData() {
    if (this.homeCountyId == "true" || this.homeCountyId == undefined) {
      this.newForm = true;
    } else {
      this.newForm = false;
      this.getHomeCountyById();
    }
  }

  getHomeCountyById() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.req = { homeCountyID: this._client.getId() };
    this._CaseTeamService.getHomeCountyById(this.req).then((data) => {
      loader.style.display = "none";
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.homeCounty.changedBy)
        ? data.homeCounty.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.homeCounty.changedDate
      )
        ? moment(data.homeCounty.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.homeCounty.enteredBy)
        ? data.homeCounty.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.homeCounty.enteredDate
      )
        ? moment(data.homeCounty.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      !isNullOrUndefined(data.homeCounty.beginDate)
        ? (data.homeCounty.beginDate = new Date(data.homeCounty.beginDate))
        : null;
      !isNullOrUndefined(data.homeCounty.endDate)
        ? (data.homeCounty.endDate = new Date(data.homeCounty.endDate))
        : null;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.homeCounty.changedBy)
        ? data.homeCounty.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.homeCounty.changedDate
      )
        ? moment(data.homeCounty.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.homeCounty.enteredBy)
        ? data.homeCounty.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.homeCounty.enteredDate
      )
        ? moment(data.homeCounty.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.homeCounty = data.homeCounty;
      this.editControll = true;
      this.countyForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.homeCounty.changedBy) ? data.homeCounty.changedBy : '------';
    this.formLogInfo.changedDate = !isNullOrUndefined(data.homeCounty.changedDate) ? moment(data.homeCounty.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
    this.formLogInfo.enteredBy = !isNullOrUndefined(data.homeCounty.enteredBy) ? data.homeCounty.enteredBy : '------';
    this.formLogInfo.enteredDate = !isNullOrUndefined(data.homeCounty.enteredDate) ? moment(data.homeCounty.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    });
  }

  editForm() {
    this.disableProperty = false;
    this.editControll = false;
    this.countyForm.enable();
  }

  getCounty(event) {
    let req = {
      contract_StateID: "34",
      value: event.query,
    };
    // this._CaseTeamService.getSearchList(req).then(data => {
    //   this.countyData = data.dropDown;
    //   this.results = data.dropDown;
    // })
    this._CaseTeamService.getHomeCountiesList(req).then((data) => {
      this.countyData = data.county;
      this.results = data.county;
    });
  }

  formValidation() {
    this.countyForm = this._fb.group({
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      homeCounty: [null, Validators.compose([Validators.required])],
    });
    let currentTime = Date.now();
    this.homeCounty.beginDate = moment.utc(currentTime).format("MM/DD/YYYY");
  }

  goBack() {
    this.router.navigateByUrl("/reports/homeCounty");
  }

  resetForm() {
    this.router.navigateByUrl("/reports/homeCounty");
  }

  navigateTo() {
    let currentURL = this.router.url;
    if (
      currentURL == "/reports/referral/family-preservation/home-county/detail"
    ) {
      this.url = "/reports/attachment-document/home-county";
    } else if (
      currentURL == "/reintegration/referral/opencard/home-county/detail"
    ) {
      this.url = "/reports/attachment-document/rfc/home-county";
    }
    return this.router.navigate([this.url]);
  }

  discard = () => {
    return window.history.back();
  };
}
