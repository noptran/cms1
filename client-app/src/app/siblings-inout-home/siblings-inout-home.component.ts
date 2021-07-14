import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import swal from "sweetalert2";
import { ClildFormService } from "../child-forms/child-forms.service";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Sioh } from "./sioh";
import { isNullOrUndefined } from "util";
import * as moment from "moment";
import { LocalValues } from "../local-values";
import { CLIENTID, REFID } from "../../constants/AppConstants";

@Component({
  selector: "app-siblings-inout-home",
  templateUrl: "./siblings-inout-home.component.html",
  styleUrls: ["./siblings-inout-home.component.scss"],
})
export class SiblingsInoutHomeComponent implements OnInit {
  discardTo = "/reports/siblings-in-out-home/view";
  editControll = false;
  siblingsForm: FormGroup;
  sioh: Sioh = new Sioh();
  breadcrumbs = [];
  quickMenu = "referrel";
  isAttachmentRequired = false;
  referralTypeId: number;

  isList = false;
  isForm = true;
  public siblingFamilyList: any[];
  isAppHeader = true;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  public REF_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(REFID)
  );
  public CLIENT_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(CLIENTID)
  );

  constructor(
    public _fb: FormBuilder,
    public _client: ClildFormService,
    public _opencard: OpencardsService,
    public _router: Router,
    public _localValues: LocalValues,
    public _activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.formValiadtion();
    if (this._router.url == "/reports/siblings-in-out-home/detail") {
      this.isAttachmentRequired = true;
      this.getSiblingsDetailById();
    }
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case Form",
        href: "/reintegration/referral/detail",
        active: "",
      },
      { label: "Family", href: "/reports/family/view", active: "" },
      {
        label: "Extended Family",
        href: "/reports/extended-family/view",
        active: "",
      },
      { label: "Extended Family Form", active: "active" }
    );
    this.referralTypeId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._opencard.getHasKey();
    if (this.referralTypeId === 4) {
      this._localValues.breadcrumbsChanges(
        "siblingsInOutHome_NCFCH",
        this.breadcrumbs
      );
    }
    if (this.referralTypeId === 11) {
      this._localValues.breadcrumbsChanges(
        "siblingsInOutHome-NCMHR",
        this.breadcrumbs
      );
    }
    this.getsiblingFamilyList();
  }

  addPost() {
    if (this.siblingsForm.valid) {
    } else {
      swal("Warning", "Please fill the mandatory fields", "warning");
    }
  }

  editForm() {}

  formValiadtion() {
    this.siblingsForm = this._fb.group({
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      clientNamePlaced: [null],
      causeOfSplit: [null, Validators.compose([Validators.required])],
      siblingsReason: [null, Validators.compose([Validators.required])],
      siblingsSubReason: [null],
      notes: [null],
    });
  }

  getSiblingsDetailById() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {
      clientSiblingID: this._client.getId(),
      clientID:
        parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey(),
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
    };
    this._opencard.getByIdSibilings(req).then((data: any) => {
      loader.style.display = "none";
      !isNullOrUndefined(data.sibOOHCTPT[0].BeginDate)
        ? (data.sibOOHCTPT[0].BeginDate = moment
            .utc(data.sibOOHCTPT[0].BeginDate)
            .format("MM/DD/YYYY HH:mm"))
        : null;
      !isNullOrUndefined(data.sibOOHCTPT[0].EndDate)
        ? (data.sibOOHCTPT[0].EndDate = moment
            .utc(data.sibOOHCTPT[0].EndDate)
            .format("MM/DD/YYYY HH:mm"))
        : null;
      if (data.sibOOHCTPT[0].SiblingSplitCause === "Client") {
        data.sibOOHCTPT[0].SiblingSplitCause =
          localStorage.getItem("clientName");
      } else if (data.sibOOHCTPT[0].SiblingSplitCause === "Sibling") {
        data.sibOOHCTPT[0].SiblingSplitCause = this._opencard.getSiblingName();
      } else {
        data.sibOOHCTPT[0].SiblingSplitCause =
          data.sibOOHCTPT[0].SiblingSplitCause;
      }
      !isNullOrUndefined(data.sibOOHCTPT[0].SiblingSplitCause)
        ? (data.sibOOHCTPT[0].EndDate = moment
            .utc(data.sibOOHCTPT[0].EndDate)
            .format("MM/DD/YYYY HH:mm"))
        : null;
      this.sioh = data.sibOOHCTPT[0];
      this.siblingsForm.disable();
      this.editControll = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.sibOOHCTPT[0].changedBy
      )
        ? data.sibOOHCTPT[0].changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.sibOOHCTPT[0].changedDate
      )
        ? moment(data.sibOOHCTPT[0].changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.sibOOHCTPT[0].enteredBy
      )
        ? data.sibOOHCTPT[0].enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.sibOOHCTPT[0].enteredDate
      )
        ? moment(data.sibOOHCTPT[0].enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
    });
  }

  navigateToCMS() {
    let currentURL = this._router.url,
      navigateURL: any;
    if (currentURL == "/reports/siblings-in-out-home/detail") {
      navigateURL = "/reports/attachment-document/rfc/sibilings-in-out-home";
    } else {
      navigateURL = "/reports/attachment-document/court-orders";
    }
    return this._router.navigate([navigateURL]);
  }

  async getsiblingFamilyList() {
    let request = {
      referralID: this.REF_ID,
      clientID: this.CLIENT_ID,
    };
    let response = await this._opencard.siblingInOutFamilyList(request);
    return (this.siblingFamilyList = response.sibOOH);
  }

  discardForm() {
    if (this.isAppHeader) {
      return window.history.back();
    } else {
      this.isForm = false;
      this.getsiblingFamilyList();
      this.editControll = false;
      return (this.isList = true);
    }
  }
}
