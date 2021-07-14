import { OnInit, Component } from "@angular/core";
import { NCFCH } from "./NC-FCH";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ClildFormService } from "../../child-forms/child-forms.service";
import { CaseTeamService } from "../../case-team/case-team.service";
import { isNullOrUndefined } from "util";
import swal from "sweetalert2";
import * as moment from "moment";
import { LocalValues } from "../../local-values";
import { CLIENTID, REFID, REFTYPEID } from "../../../constants/AppConstants";

@Component({
  templateUrl: "./nc-fch.component.html",
  styleUrls: ["./nc-fch.component.scss"],
  selector: "app-nc-fch-component",
})
export class NCFCHComponent implements OnInit {
  constructor(
    public _fb: FormBuilder,
    public _opencard: OpencardsService,
    public _router: Router,
    public _caseTeam: CaseTeamService,
    public _localValues: LocalValues,
    public _activateRoute: ActivatedRoute
  ) {}

  attachmentControll = false;
  editControll = false;
  discardTo = "/reports/opencards/list/client/case";
  breadcrumbs = [];
  ncfch: NCFCH = new NCFCH();
  ncfchForm: FormGroup;
  metaData = [];
  isEndDateDisable = true;
  ncFchOpencards = [];
  iconurl =
    "https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/";
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

  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case List",
        href: "/reports/opencards/list/client/case",
        active: "",
      },
      { label: "Case Form", active: "active" }
    );
    if (this._router.url.includes("/reports/nc-fch/detail")) {
      this.getRecById();
      this.attachmentControll = true;
    }

    if (this._router.url.includes("/reports/nc-fch/new")) {
      this.ncfch.beginDate = new Date(Date.now());
      this.ncfch.beginDate.setHours(0);
      this.ncfch.beginDate.setMinutes(0);
      this.ncfch.beginDate.setSeconds(0);
      console.log(
        "NCFCH Values",
        this._localValues.referralValidationCheckValues
      );
      this.ncfch.facts =
        this._localValues.referralValidationCheckValues.length !== -1
          ? this._localValues.referralValidationCheckValues.facts
          : null;
    }

    this.ncFchOpencards = [
      {
        title: "Adoption",
        tip: "Family",
        navigation: "",
      },
      {
        title: "Appointments",
        tip: "Assessments",
        navigation: "",
      },
      {
        title: "Assessments",
        tip: "Family",
        navigation: "",
      },
      {
        title: "Authorization Summary (View Only)",
        tip: "Family",
        navigation: "",
      },
      {
        title: "Case File Activity",
        tip: "Family",
        navigation: "",
      },
      {
        title: "Case Team",
        tip: "Family",
        navigation: "",
      },
      {
        title: "Family",
        tip: "Family",
        navigation: "",
      },
      {
        title: "Home County",
        tip: "Family",
        navigation: "",
      },
      {
        title: "Medical",
        tip: "Family",
        navigation: "",
      },
      {
        title: "Monthly Reports",
        tip: "Family",
        navigation: "",
      },
      {
        title: "Placements",
        tip: "Family",
        navigation: "",
      },
      {
        title: "Schools",
        tip: "Family",
        navigation: "",
      },
      {
        title: "Service Claims",
        tip: "Family",
        navigation: "",
      },
      {
        title: "SFCS Office",
        tip: "Family",
        navigation: "",
      },
    ];
  }

  formAction() {
    if (this.ncfchForm.valid) {
      !isNullOrUndefined(this.ncfch.beginDate)
        ? (this.ncfch.beginDate = new Date(this.ncfch.beginDate).getTime())
        : null;
      !isNullOrUndefined(this.ncfch.endDate)
        ? (this.ncfch.endDate = new Date(this.ncfch.endDate).getTime())
        : null;
      !isNullOrUndefined(this.ncfch.payorID)
        ? (this.ncfch.payorID = this.ncfch.payorID.payorID)
        : null;
      this.ncfch.referralTypeID = this.REF_TYPE_ID;
      this.ncfch.clientID = this.CLIENT_ID;
      !isNullOrUndefined(this.ncfch.referralID) ? this.update() : this.save();
    } else {
      swal("Invalid!", "Mandatory fields are missing!", "info");
    }
  }

  formValidation() {
    this.ncfchForm = this._fb.group({
      payorID: [null, Validators.compose([Validators.required])],
      facts: [null],
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      notes: [null],
    });
  }

  getMetaData(label: string, event: any) {
    let req = {},
      reqObject: any;
    switch (label) {
      case "payor":
        reqObject = "payor";
        break;
    }
    req = { Object: reqObject, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      data.dropDown.map((item: any) => {
        item["payorDisPlay"] = `${item.payorName} - ${item.alias}`;
      });
      this.metaData = data.dropDown;
    });
  }

  save() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.saveNCFCH(this.ncfch).then((data: any) => {
      if (data.responseStatus) {
        loader.style.display = "none";
        swal("Save!", "The referral program has been saved!", "success");
        this._router.navigate(["/reports/opencards/list/client/case"], {
          queryParamsHandling: "preserve",
        });
      }
    });
  }

  update() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.updateNCFCH(this.ncfch).then(() => {
      loader.style.display = "none";
      swal("Update", "The referral program has been updated", "success");
      this._router.navigate(["/reports/opencards/list/client/case"], {
        queryParamsHandling: "preserve",
      });
    });
  }

  editForm() {
    this.editControll = false;
    this.isEndDateDisable = false;
    this.ncfchForm.enable();
  }

  getRecById() {
    let req = {
      referralID: this.REF_ID,
      clientID: this.CLIENT_ID,
    };
    this.getByIDRequest = { referralID: this.REF_ID };
    this._opencard.getRecByIdNCFCH(req).then((data: any) => {
      if (data.responseStatus) {
        this.ncfch = new NCFCH();
        this.ncfchForm.disable();
        this.editControll = true;
        this.isFormLog = true;
        this.formLogInfo.changedBy = !isNullOrUndefined(
          data.referralDetails.changedBy
        )
          ? data.referralDetails.changedBy
          : "------";
        this.formLogInfo.changedDate = !isNullOrUndefined(
          data.referralDetails.changedDate
        )
          ? moment(data.referralDetails.changedDate).format(
              "MM/DD/YYYY hh:mm:ss A"
            )
          : "--:--:-- --";
        this.formLogInfo.enteredBy = !isNullOrUndefined(
          data.referralDetails.enteredBy
        )
          ? data.referralDetails.enteredBy
          : "------";
        this.formLogInfo.enteredDate = !isNullOrUndefined(
          data.referralDetails.enteredDate
        )
          ? moment(data.referralDetails.enteredDate).format(
              "MM/DD/YYYY hh:mm:ss A"
            )
          : "--:--:-- --";

        this.isEndDateDisable = true;
        delete data.referralDetails.payorId;
        !isNullOrUndefined(data.referralDetails.beginDate)
          ? (data.referralDetails.beginDate = new Date(
              data.referralDetails.beginDate
            ))
          : null;
        !isNullOrUndefined(data.referralDetails.endDate)
          ? (data.referralDetails.endDate = new Date(
              data.referralDetails.endDate
            ))
          : null;
        // data.payorDetails.payorDisPlay = `${data.payorDetails.payorName} - ${data.payorDetails.alias}`;
        data.referralDetails["payorID"] = data.referralDetails.payorID;
        this.ncfch = data.referralDetails;
      } else {
        swal("Something went wrong!", "Please try again later!", "error");
      }
    });
  }

  nodeNavigateTo(label: any) {
    let url: any;
    switch (label) {
      case "Adoption":
        url = "/reintegration/referral/opencard/adoption/view";
        break;
      case "Appointments":
        url = "/reintegration/referral/opencard/appointments/view";
        break;
      case "Assessments":
        url = "/reports/referral/family-preservation/assessment/view";
        break;
      case "Authorization Summary (View Only)":
        url = "/reintegration/referral/service/authorization/summary";
        break;
      case "Case File Activity":
        url = "/reintegration/referral/opencard/case-file-activity/view";
        break;
      case "Home County":
        url = "/reports/referral/family-preservation/home-county/view";
        break;
      case "Case Team":
        url = "/reintegration/referral/opencard/case-team/view";
        break;
      case "Family":
        url = "/reports/family/view";
        break;
      case "Case File Activity":
        url = "/reintegration/referral/opencard/case-file-activity/view";
        break;
      case "Medical":
        url = "/reintegration/referral/opencard/medical/dashboard";
        break;
      case "Monthly Reports":
        url = "/reintegration/referral/opencard/monthly-reports/view";
        break;
      case "Schools":
        url = "/reintegration/referral/opencard/school/dashboard";
        break;
      case "Placements":
        url = "/reintegration/referral/opencard/placement/view";
        break;
      case "Service Claims":
        url = "/reintegration/referral/service";
        break;
      case "SFCS Office":
        url = "/reintegration/referral/opencard/sfcs-office/view";
        break;
    }
    return this._router.navigate([url], { queryParamsHandling: "preserve" });
  }

  navigateTo() {
    let currentURL = this._router.url,
      url;
    if (currentURL == "/reports/nc-fch/detail") {
      url = "/reports/attachment-document/nc-fch";
    }
    return this._router.navigate([url], { queryParamsHandling: "preserve" });
  }
}
