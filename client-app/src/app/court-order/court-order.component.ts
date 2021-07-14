import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import swal from "sweetalert2";
import { isNullOrUndefined } from "util";
import { CaseTeamService } from "../case-team/case-team.service";
import { ClildFormService } from "../child-forms/child-forms.service";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { CourtOrder } from "./court-order";
import * as moment from "moment";
import { LocalValues } from "../local-values";
import { MessageService } from "primeng/api";
import { REFID } from "../../constants/AppConstants";

@Component({
  selector: "app-court-order",
  templateUrl: "./court-order.component.html",
  styleUrls: ["./court-order.component.scss"],
})
export class CourtOrderComponent implements OnInit {
  courtOrder: CourtOrder = new CourtOrder();
  courtOrderForm: FormGroup;
  isEdit = false;
  metaData: any;
  recordId: any;
  breadcrumbs = [];
  quickMenu = "referrel";
  referralTypeId: any;

  isCisDataStored = false;
  formCisArrayValue: any;
  cisFormJson: any;
  isCourtAppearanceLog = false;
  isViewAttachmentDisabled = true;
  attachmentOpencards = [];
  discardTo = "/reintegration/referral/opencard/court-order/view";
  url: any;
  isAttachmentRequired = false;
  req: any;

  isList = false;
  isForm = true;
  public courtOrderList: any[];
  isAppHeader = true;

  isFormLog = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isPopup = false;
  REF_ID = parseInt(this._activateRoute.snapshot.queryParamMap.get(REFID));

  constructor(
    public _meassgae: MessageService,
    public _fb: FormBuilder,
    public _opencard: OpencardsService,
    public _router: Router,
    public _client: ClildFormService,
    public _caseTeam: CaseTeamService,
    public _localValues: LocalValues,
    public _activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.formValidation();
    if (this._router.url.includes("/court-order/detail")) {
      this.isAttachmentRequired = true;
      this.getRecById();
    }
    this.breadcrumbs = [
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case Form",
        href: "/reports/referral/family-preservation/detail",
        active: "",
      },
      {
        label: "Court Order List",
        href: "/reports/referral/family-preservation/court-order/view",
        active: "",
      },
      { label: "Court Order Form", active: "active" },
    ];
    let referralTypeId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._opencard.getHasKey();
    if (referralTypeId === 7) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "courtOrder-NCRFC",
        this.breadcrumbs
      );
    } else if (referralTypeId === 14) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "courtOrders-PRTF",
        this.breadcrumbs
      );
    } else {
      this._opencard.breadcurmbsDetermination(
        "court-order",
        referralTypeId,
        this.breadcrumbs
      );
    }
    // this.getCisJson();
    this.attachmentOpencards.sort((a, b) => {
      return a["title"].localeCompare(b["title"]);
    });
    this.defineOpencards();
    this.getCourtOrderList();
  }

  formActions(source: any) {
    source.orderDate = !isNullOrUndefined(source.orderDate)
      ? Date.parse(source.orderDate)
      : null;
    source.jeReceivedDate = !isNullOrUndefined(source.jeReceivedDate)
      ? Date.parse(source.jeReceivedDate)
      : null;
    source.jedate = !isNullOrUndefined(source.jedate)
      ? Date.parse(source.jedate)
      : null;
    source.judgeID = !isNullOrUndefined(source.judgeID)
      ? source.judgeID.judgeID
      : null;
    source.hearingTypeID = !isNullOrUndefined(source.hearingTypeID)
      ? source.hearingTypeID.hearingTypeID
      : null;
    source.courtOutcomeID = !isNullOrUndefined(source.courtOutcomeID)
      ? source.courtOutcomeID.courtOutcomeID
      : null;
    source.referralID =
      parseInt(localStorage.getItem("referralId")) - this._opencard.getHasKey();
    this.referralTypeId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._opencard.getHasKey();
    if (this.courtOrderForm.valid) {
      source.courtOrderedID ? this.update(source) : this.save(source);
    } else {
      swal("Warning", "Please fill the mandatory fields", "warning");
    }
  }
  save(source) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.saveCourtOrder(source).then((data) => {
      loader.style.display = "none";
      this.courtOrder = data.CourtOrdered;
      this.recordId = this.courtOrder.courtOrderedID;
      if (this.isAppHeader) {
        swal("Save", "Court Order Saved!", "success");
        // window.history.back();
        this._router.navigate(
          ["/reintegration/referral/opencard/court-order/view"],
          { queryParamsHandling: "preserve" }
        );
      } else {
        this._meassgae.add({
          severity: "success",
          summary: "Saved!",
          detail: "The record has been saved!",
        });
        this.isForm = false;
        this.getCourtOrderList();
        this.isList = true;
      }
    });
  }
  update(source) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.updateCourtOrder(source).then((data) => {
      loader.style.display = "none";
      this.courtOrder = data.CourtOrdered;
      this.recordId = this.courtOrder.courtOrderedID;

      if (this.isAppHeader) {
        swal("Update", "Court Order Updated!", "success");
        // window.history.back();
        this._router.navigate(
          ["/reintegration/referral/opencard/court-order/view"],
          { queryParamsHandling: "preserve" }
        );
      } else {
        this._meassgae.add({
          severity: "success",
          summary: "Saved!",
          detail: "The record has been updated!",
        });
        this.isForm = false;
        this.getCourtOrderList();
        this.isList = true;
      }
    });
  }

  formValidation() {
    this.courtOrderForm = this._fb.group({
      jedate: [null],
      orderDate: [null, Validators.compose([Validators.required])],
      jeReceivedDate: [null],
      courtOrder: [null, Validators.compose([Validators.required])],
      judgeID: [null],
      notes: [null],
      hearingTypeID: [null],
      courtOutcomeID: [null],
    });
  }

  getRecById() {
    let recordId;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    recordId = this.recordId || this._client.getId();
    this.req = { courtOrderedID: recordId };
    this._opencard.getByIdCourtOrder(this.req).then((data) => {
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.CourtOrdered.changedBy
      )
        ? data.CourtOrdered.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.CourtOrdered.changedDate
      )
        ? moment(data.CourtOrdered.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.CourtOrdered.enteredBy
      )
        ? data.CourtOrdered.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.CourtOrdered.enteredDate
      )
        ? moment(data.CourtOrdered.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";

      loader.style.display = "none";
      !isNullOrUndefined(data.CourtOrdered.judgeID)
        ? (data.CourtOrdered.judgeID["fullName"] =
            data.CourtOrdered.judgeID.lastName +
            " " +
            data.CourtOrdered.judgeID.firstName +
            " ( " +
            data.CourtOrdered.judgeID.email +
            ")")
        : null;
      if (data.CourtOrdered.isActive) {
        // data.CourtOrdered.orderDate = !isNullOrUndefined(data.CourtOrdered.orderDate) ? moment(data.CourtOrdered.orderDate).format('MM/DD/YYYY HH:mm') : null;
        // data.CourtOrdered.jeReceivedDate = !isNullOrUndefined(data.CourtOrdered.jeReceivedDate) ? moment(data.CourtOrdered.jeReceivedDate).format('MM/DD/YYYY HH:mm') : null;
        // data.CourtOrdered.jedate = !isNullOrUndefined(data.CourtOrdered.jedate) ?moment(data.CourtOrdered.jedate).format('MM/DD/YYYY HH:mm'): null;
        data.CourtOrdered.jedate = !isNullOrUndefined(data.CourtOrdered.jedate)
          ? new Date(data.CourtOrdered.jedate)
          : null;
        data.CourtOrdered.orderDate = !isNullOrUndefined(
          data.CourtOrdered.orderDate
        )
          ? new Date(data.CourtOrdered.orderDate)
          : null;
        data.CourtOrdered.jeReceivedDate = !isNullOrUndefined(
          data.CourtOrdered.jereceivedDate
        )
          ? new Date(data.CourtOrdered.jereceivedDate)
          : null;
      } else {
        data.CourtOrdered.orderDate = !isNullOrUndefined(
          data.CourtOrdered.orderDate
        )
          ? moment.utc(data.CourtOrdered.orderDate).format("MM/DD/YYYY HH:mm")
          : null;
        data.CourtOrdered.jeReceivedDate = !isNullOrUndefined(
          data.CourtOrdered.jereceivedDate
        )
          ? moment
              .utc(data.CourtOrdered.jereceivedDate)
              .format("MM/DD/YYYY HH:mm")
          : null;
        data.CourtOrdered.jedate = !isNullOrUndefined(data.CourtOrdered.jedate)
          ? moment.utc(data.CourtOrdered.jedate).format("MM/DD/YYYY HH:mm")
          : null;
      }
      this._client.storeId(data.CourtOrdered.referralID.referralID);
      this.courtOrder = data.CourtOrdered;
      this.courtOrderForm.disable();
      this.isEdit = true;
    });
  }

  getMetaData(event, label) {
    let reqObj: any, request: any, email: any;
    switch (label) {
      case "hearing_type":
        reqObj = "hearingType";
        break;
      case "court_outcome":
        reqObj = "courtOutcome";
        break;
      case "judge":
        reqObj = "Judge";
        break;
    }
    request = { Object: reqObj, value: event.query };
    this._caseTeam.getSearchList(request).then((data) => {
      data.dropDown.map((item) => {
        if (Object.keys(item).includes("firstName")) {
          email = !isNullOrUndefined(item.email)
            ? item.email
            : "Email not provided!";
          item["fullName"] =
            item.firstName + " " + item.lastName + " ( " + email + " ) ";
        }
      });
      this.metaData = data.dropDown;
    });
  }

  discardForm() {
    if (this.isAppHeader) {
      return window.history.back();
    } else {
      this.isForm = false;
      this.getCourtOrderList();
      this.isEdit = false;
      return (this.isList = true);
    }
  }

  editForm() {
    this.courtOrderForm.enable();
    this.isEdit = false;
    this.isViewAttachmentDisabled = false;
  }

  navigateTo(label: any) {
    let url: any;
    switch (label) {
      case "Court Appearance Log":
        url =
          "/reintegration/referral/opencard/court-order/attachment/court-appeance";
        break;
    }
    return this._router.navigate([url]);
  }

  defineOpencards() {
    this.attachmentOpencards = [
      // { title: 'Assessments', tip: 'Assessments', navigation: '', count: '20', icon: this.iconurl + 'assessment icon.svg' },
      {
        title: "Court Appearance Log",
        view: "/reintegration/referral/opencard/court-order/attachment/court-appeance",
        count: "20",
      },
    ];
  }

  navigateToCMS() {
    let currentURL = this._router.url;
    if (currentURL == "/reintegration/referral/opencard/court-order/detail") {
      this.url = "/reports/attachment-document/rfc/court-orders";
    } else {
      this.url = "/reports/attachment-document/court-orders";
    }
    return this._router.navigate([this.url]);
  }

  async getCourtOrderList() {
    let request = {
      referralID: this.REF_ID,
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "courtOrderedID", mode: "desc" },
    };
    let response = await this._caseTeam.getCourtOrderList(request);
    return (this.courtOrderList = response.casePlan);
  }

  public onEdit(event: any) {
    this.isForm = true;
    this.isList = false;
    let req = { courtOrderedID: event.courtOrderedID };
    this.req = req;
    this.formValidation();
    this._opencard.getByIdCourtOrder(req).then((data) => {
      this.courtOrder = new CourtOrder();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.CourtOrdered.changedBy
      )
        ? data.CourtOrdered.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.CourtOrdered.changedDate
      )
        ? moment(data.CourtOrdered.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.CourtOrdered.enteredBy
      )
        ? data.CourtOrdered.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.CourtOrdered.enteredDate
      )
        ? moment(data.CourtOrdered.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      !isNullOrUndefined(data.CourtOrdered.judgeID)
        ? (data.CourtOrdered.judgeID["fullName"] =
            data.CourtOrdered.judgeID.lastName +
            " " +
            data.CourtOrdered.judgeID.firstName +
            " ( " +
            data.CourtOrdered.judgeID.email +
            ")")
        : null;
      if (data.CourtOrdered.isActive) {
        data.CourtOrdered.jedate = !isNullOrUndefined(data.CourtOrdered.jedate)
          ? new Date(data.CourtOrdered.jedate)
          : null;
        data.CourtOrdered.orderDate = !isNullOrUndefined(
          data.CourtOrdered.orderDate
        )
          ? new Date(data.CourtOrdered.orderDate)
          : null;
        data.CourtOrdered.jeReceivedDate = !isNullOrUndefined(
          data.CourtOrdered.jereceivedDate
        )
          ? new Date(data.CourtOrdered.jereceivedDate)
          : null;
      } else {
        data.CourtOrdered.orderDate = !isNullOrUndefined(
          data.CourtOrdered.orderDate
        )
          ? moment.utc(data.CourtOrdered.orderDate).format("MM/DD/YYYY HH:mm")
          : null;
        data.CourtOrdered.jeReceivedDate = !isNullOrUndefined(
          data.CourtOrdered.jereceivedDate
        )
          ? moment
              .utc(data.CourtOrdered.jereceivedDate)
              .format("MM/DD/YYYY HH:mm")
          : null;
        data.CourtOrdered.jedate = !isNullOrUndefined(data.CourtOrdered.jedate)
          ? moment.utc(data.CourtOrdered.jedate).format("MM/DD/YYYY HH:mm")
          : null;
      }
      this.courtOrder = data.CourtOrdered;
      this.courtOrderForm.disable();
      this.isEdit = true;
    });
  }

  public addForm() {
    this.courtOrder = new CourtOrder();
    this.formValidation();
    this.isEdit = false;
    this.isForm = true;
    this.isList = false;
  }

  async onDelete(event: any) {
    await event;
    this.isForm = false;
    this.getCourtOrderList();
    this.isList = true;
  }

  onDiscard = () => {
    this.isPopup
      ? ((this.isForm = false), (this.isList = true))
      : this._router.navigate([this.discardTo]);
  };
}
