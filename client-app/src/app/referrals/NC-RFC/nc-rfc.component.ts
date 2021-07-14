import { Component, OnInit } from "@angular/core";
import { NCRFC } from "./nc-rfc";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { isNullOrUndefined } from "util";
import { CaseTeamService } from "../../case-team/case-team.service";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { ClildFormService } from "../../child-forms/child-forms.service";
import { TeamFormService } from "../../team-form/team-form.service";
import { LocalValues } from "../../local-values";
import * as moment from "moment";
import { CLIENTID, REFID, REFTYPEID } from "../../../constants/AppConstants";

@Component({
  templateUrl: "./nc-rfc.component.html",
  styleUrls: ["./nc-rfc.component.scss"],
  selector: "referral-nc-rfc",
})
export class NFCRFCComponent implements OnInit {
  breadcurmbs = [];
  ncrfc: NCRFC = new NCRFC();
  ncrfcForm: FormGroup;
  isEditMode = false;
  metaData: any;
  isEndDateDisable = true;
  procodesForReferral: any;
  isEdit: boolean;
  isAttachmentRequired = false;
  discardTo = "/reports/opencards/list/client/case";
  ncRfcOpencards = [];
  currentReferralID =
    parseInt(localStorage.getItem("referralId")) - this._opencard.getHasKey();
  staffName: string;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  REF_ID = parseInt(this._activateRoute.snapshot.queryParamMap.get(REFID));
  CLIENT_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(CLIENTID)
  );
  REF_TYPE_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(REFTYPEID)
  );
  getByIDRequest: any;

  constructor(
    public _team: TeamFormService,
    public _fb: FormBuilder,
    public _caseTeam: CaseTeamService,
    public _opencard: OpencardsService,
    public _router: Router,
    public _localValues: LocalValues,
    public _activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.formValidation();
    this.getStaffName();
    this.breadcurmbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case List",
        href: "/reports/opencards/list/client/case",
        active: "",
      },
      { label: "Case Form", active: "active" }
    );

    if (this._router.url.includes("/reports/nc-rfc/detail")) {
      this.isEditMode = true;
      this.isEndDateDisable = false;
      this.isAttachmentRequired = true;
      this.getRecById();
    }

    /**Auto fetch - Creating form */
    if (this._router.url.includes("/reports/nc-rfc/new")) {
      this.ncrfc.beginDate = new Date(Date.now());
    }

    this.getProcodes();

    this.ncRfcOpencards = [
      { title: "Appointments", tip: "Family", navigation: "", icon: "" },
      {
        title: "Billable Case Activity",
        tip: "Family",
        navigation: "",
        icon: "",
      },
      { title: "Case Activity", tip: "Family", navigation: "", icon: "" },
      { title: "Case File Activity", tip: "Family", navigation: "", icon: "" },
      {
        title: "Case Team",
        tip: "Assessments",
        navigation: "",
        icon: "assets/Nodesicon/case team.svg",
      },
      {
        title: "Court Orders",
        tip: "Assessments",
        navigation: "",
        icon: "assets/Nodesicon/case team.svg",
      },
      { title: "Home County", tip: "Family", navigation: "", icon: "" },
      { title: "Service Agreement", tip: "Family", navigation: "", icon: "" },
      { title: "Service Claims", tip: "Family", navigation: "", icon: "" },
      {
        title: "Siblings In Out-Of-Home",
        tip: "Family",
        navigation: "",
        icon: "",
      },
      { title: "SFCS Office", tip: "Family", navigation: "", icon: "" },
    ];
  }

  /** Drodown actions */
  getMetaData(label: string, event: any) {
    let req = { value: event.query };
    switch (label) {
      case "procode":
        this.filteredProcode(event);
        break;
      case "payor":
        req["Object"] = "payor";
        break;
      case "homeCounty":
        req["Object"] = "county";
        break;
    }
    if (label !== "procode") {
      this._caseTeam.getSearchList(req).then((data: any) => {
        if (label === "payor") {
          data.dropDown.filter((item: any) => {
            item["fullPayor"] = `${item.payorName} - ${item.alias}`;
          });
        }
        this.metaData = data.dropDown;
      });
    }
  }

  formValidation() {
    this.ncrfcForm = this._fb.group({
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      payorID: [null, Validators.compose([Validators.required])],
      notes: [null],
      procodeID: [null, Validators.compose([Validators.required])],
      units: [null, Validators.compose([Validators.required])],
      unitRate: [null, Validators.compose([Validators.required])],
      countyID: [null, Validators.compose([Validators.required])],
      facts: [null],
    });
  }

  formAction() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    if (!this.isEditMode) {
      /**Save mode */
      if (
        this.ncrfc.beginDate &&
        this.ncrfc.units &&
        this.ncrfc.unitRate &&
        this.ncrfc.procodeID &&
        this.ncrfc.payorID &&
        this.ncrfc.countyID
      ) {
        this.ncrfc.beginDate = this._localValues.stringFormatDatetime(
          Date.parse(this.ncrfc.beginDate)
        );
        !isNullOrUndefined(this.ncrfc.procodeID)
          ? (this.ncrfc.procodeID = this.ncrfc.procodeID.ProcodeID)
          : null;
        !isNullOrUndefined(this.ncrfc.payorID)
          ? (this.ncrfc.payorID = this.ncrfc.payorID.payorID)
          : null;
        !isNullOrUndefined(this.ncrfc.countyID)
          ? (this.ncrfc.countyID = this.ncrfc.countyID.countyID)
          : null;
        this.ncrfc.clientID = this.CLIENT_ID;
        this.ncrfc.referralTypeID = this.REF_TYPE_ID;

        this.updateSaveRequest();

        this._opencard.saveNCRFC(this.ncrfc).then((data: any) => {
          if (data.responseStatus) {
            swal("Success", "Referral program has been created!", "success");
            this._router.navigate(["/reports/opencards/list/client/case"], {
              queryParamsHandling: "preserve",
            });
          }
          loader.style.display = "none";
        });
      } else {
        swal("Info", "Mandatory fields are missing!", "info");
        loader.style.display = "none";
      }
    } else {
      /**Edit mode */
      this.ncrfc.beginDate = this._localValues.stringFormatDatetime(
        Date.parse(this.ncrfc.beginDate)
      );
      !isNullOrUndefined(this.ncrfc.procodeID)
        ? (this.ncrfc.procodeID = this.ncrfc.procodeID.ProcodeID)
        : null;
      !isNullOrUndefined(this.ncrfc.payorID)
        ? (this.ncrfc.payorID = this.ncrfc.payorID.payorID)
        : null;
      !isNullOrUndefined(this.ncrfc.homeCountyID)
        ? (this.ncrfc.homeCountyID = this.ncrfc.homeCountyID.countyID)
        : null;
      this.ncrfc.clientID = this.CLIENT_ID;
      this.ncrfc.referralTypeID = this.REF_TYPE_ID;
      this.ncrfc.referralID = this.REF_ID;
      this.ncrfc.endDate = this._localValues.stringFormatDatetime(
        this.ncrfc.endDate
      );
      if (
        (this.ncrfc.beginDate !== undefined || this.ncrfc.beginDate !== null) &&
        (this.ncrfc.payorID !== undefined || this.ncrfc.payorID !== null)
      ) {
        this._opencard.updateNCRFC(this.ncrfc).then((data: any) => {
          if (data.responseStatus) {
            swal("Success", "Referral program has been updated!", "success");
            this._router.navigate(["/reports/opencards/list/client/case"], {
              queryParamsHandling: "preserve",
            });
            loader.style.display = "none";
          }
        });
      } else {
        swal("Info", "Mandatory fields are missing!", "info");
        loader.style.display = "none";
      }
    }
  }

  /**Call in edit mode */
  getRecById() {
    let referralData: any,
      loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {
      referralID: this.REF_ID,
    };
    this.getByIDRequest = req;
    this._opencard.getByIDNCRFC(req).then((data: any) => {
      loader.style.display = "none";
      referralData = data.referral[0];
      !isNullOrUndefined(referralData.beginDate)
        ? (this.ncrfc.beginDate = new Date(referralData.beginDate))
        : null;
      !isNullOrUndefined(referralData.endDate)
        ? (this.ncrfc.endDate = new Date(referralData.endDate))
        : null;
      !isNullOrUndefined(referralData.UnitRate)
        ? (this.ncrfc.unitRate = referralData.UnitRate)
        : null;
      !isNullOrUndefined(referralData.Notes)
        ? (this.ncrfc.notes = referralData.Notes)
        : null;
      !isNullOrUndefined(referralData.facts)
        ? (this.ncrfc.facts = referralData.facts)
        : null;
      this.ncrfc.caseID = referralData.caseID;
      this.ncrfc.payorID = {
        fullPayor: `${data.referral[1].payorName} - ${data.referral[1].alias}`,
        payorID: data.referral[1].payorID,
      };
      this.ncrfcForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.referralData.changedBy
      )
        ? data.referralData.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.referralData.changedDate
      )
        ? moment(data.referralData.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.referralData.enteredBy
      )
        ? data.referralData.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.referralData.enteredDate
      )
        ? moment(data.referralData.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
    });
  }

  /**Edit button actions */
  onClickEditForm() {
    this.isEdit = false;
    this.ncrfcForm.enable();
  }

  getProcodes() {
    let req = { referralTypeID: this.REF_TYPE_ID };
    this._opencard.getProcodeBasedOnReferralType(req).then((data: any) => {
      this.procodesForReferral = data.procode;
    });
  }

  filteredProcode(event: any) {
    this.metaData = [];
    this.procodesForReferral.map((item: any) => {
      if (item.ProcodeName.toLowerCase().indexOf(event.query) !== -1) {
        this.metaData.push(item);
      }
    });
  }

  /**Attach document fuction */
  navigateTo() {
    let currentURL = this._router.url,
      navigateURL: string;
    if (currentURL == "/reports/nc-rfc/detail") {
      navigateURL = "/reports/attachment-document/nc-rfc-attachment";
    }
    return this._router.navigate([navigateURL], {
      queryParamsHandling: "preserve",
    });
  }

  /**Opencard Navigation */
  nodeNavigateTo(label: string) {
    let url: any;
    switch (label) {
      case "Appointments":
        url = "/reintegration/referral/opencard/appointments/view";
        break;
      case "Billable Case Activity":
        url = "/reports/fp-billable-case-activity/view";
        break;
      case "Case Activity":
        url = "/reports/referral/family-preservation/case-activity/view";
        break;
      case "Case File Activity":
        url = "/reintegration/referral/opencard/case-file-activity/view";
        break;
      case "Case Team":
        url = "/reports/referral/family-preservation/case-team/view";
        break;
      case "Court Orders":
        url = "/reports/referral/family-preservation/court-order/view";
        break;
      case "Home County":
        url = "/reports/referral/family-preservation/home-county/view";
        break;
      case "Service Agreement":
        url = "/reports/service-agreement/view";
        break;
      case "Service Claims":
        url = "/reintegration/referral/service";
        break;
      case "Siblings In Out-Of-Home":
        url = "/reports/siblings-in-out-home/view";
        break;
      case "SFCS Office":
        url = "/reports/referral/family-preservation/sfcs-office/view";
        break;
    }
    return this._router.navigate([url], { queryParamsHandling: "preserve" });
  }

  async getStaffName() {
    let staffName: string;
    if (parseInt(localStorage.getItem("UserId"))) {
      const loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      await this._team
        .getUserById({ staffID: parseInt(localStorage.getItem("UserId")) })
        .then((data) => {
          staffName = `${data.users.firstName} ${data.users.lastName}`;
          this.staffName = staffName;
          loader.style.display = "none";
        })
        .catch(() => {
          loader.style.display = "none";
        });
    }

    return staffName;
  }

  async updateSaveRequest() {
    let currentDate = new Date().toDateString();
    let enteredDate = this._localValues.stringFormatDatetime(currentDate);
    this.ncrfc["enteredBy"] = this.staffName;
    this.ncrfc["enteredDate"] = enteredDate;
    this.ncrfc["endDate"] = null;
    this.ncrfc["facts"] =
      this._localValues.referralValidationCheckValues.length !== -1
        ? this._localValues.referralValidationCheckValues.facts
        : null;
  }
}
