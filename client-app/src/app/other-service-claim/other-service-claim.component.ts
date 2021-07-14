import { Component, OnInit } from "@angular/core";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { otherService } from "./other-service";
import { CaseTeamService } from "../case-team/case-team.service";
import { TeamFormService } from "../team-form/team-form.service";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { isNullOrUndefined } from "util";
import * as moment from "moment";
import {LocalValues} from "../local-values";

@Component({
  selector: "app-other-service-claim",
  templateUrl: "./other-service-claim.component.html",
  styleUrls: ["./other-service-claim.component.scss"],
})
export class OtherServiceClaimComponent implements OnInit {
  constructor(
    public _openCards: OpencardsService,
    public _fb: FormBuilder,
    public _localValues: LocalValues,
    public _CaseTeamService: CaseTeamService,
    public _router: Router,
    public _team: TeamFormService
  ) {}
  title: any = "Authorization";
  status = "draft";
  breadcrumbs = [];
  formStatus?: any;
  otherService: otherService = new otherService();
  otherServiceValue: FormGroup;
  results = [];
  filteredClient = [];
  procodeValidateArray = [];
  metaData = [];
  filteredProcodes = [];
  showProvider: boolean;
  displayDialog: boolean;
  providerId: any;
  showProviderSponsor = false;
  isOverrideDate: boolean;
  clientId: any;
  unitTypeId: any = 1;
  payorId: any;
  authorizationStatusID: any = 3;
  procodeID: any;
  payeeId: any;
  authorizationExceptionReasonID: any;
  sponsorId: any;
  isSponsor = false;
  editControll: boolean;
  isChecked: boolean;
  showOpenCard = false;
  staffID: any;
  isHardgoods: boolean;
  footerHeight = false;
  isHardGoodProcode = false;
  isDisabled = false;
  showEdit = true;
  enteredBy: any;
  procodeUnits: any;
  procodeUnitType: any;
  url: any;
  isAttachmentRequired = false;
  quickMenu: any;
  isPrintEnabled = false;
  isPreviewOpen = false;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  currentClientId = null;
  referralTypeID: number;
  // validateEndDate() {
  //   let date = new Date(this.otherService.beginDate);
  //   if (this.otherService.unitType.unitType === 'Daily') {
  //     this.otherService.endDate = new Date(date.setDate(date.getDate() + this.otherService.units));
  //   } else if (this.otherService.unitType.unitType === 'Weekly') {
  //     this.otherService.endDate = new Date(date.setDate(date.getDate() + (this.otherService.units * 7)));
  //   } else if (this.otherService.unitType.unitType === 'Monthly') {
  //     this.otherService.endDate = new Date(date.setMonth(date.getMonth() + this.otherService.units));
  //   } else if (this.otherService.unitType.unitType === '1/2 Hour') {
  //     this.otherService.endDate = new Date(date.setTime(date.getTime() + (this.otherService.units * 30) * 60 * 1000));
  //   } else if (this.otherService.unitType.unitType === 'Hour') {
  //     this.otherService.endDate = new Date(date.setHours(date.getHours() + (this.otherService.units)));
  //   } else if (this.otherService.unitType.unitType === '1/4 Hour') {
  //     this.otherService.endDate = new Date(date.setTime(date.getTime() + (this.otherService.units * 15) * 60 * 1000));
  //   }
  // };
  findUnitsAuth: any;
  isPrintNavigation = true;
  public procodeResults = [];
  authorizationID: number;

  ngOnInit() {
    this.referralTypeID =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._openCards.getHasKey();
    this.getAutoFetchUnitType();
    this.defFormValues();
    this.formValidation();
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      { label: "Case", href: "/reports/opencards/list/client/case", active: "" }
    );
    if (this._localValues.placementProviderMode == "providers") {
      this.breadcrumbs = [];
      // this.breadcrumbs.push(
      //   { label: "Person Types", href: "/reports/person/types", active: "" },
      //   { label: "Provider List", href: "/reports/provider/view", active: "" },
      //   {
      //     label: "Provider Form",
      //     href: "/reports/provider/detail",
      //     active: "",
      //   },
      //   {
      //     label: "Placement and Payments",
      //     active: "",
      //     href: "/provider/dashboard/placements-payments",
      //   },
      //   {
      //     label: "Provider Opencards",
      //     active: "",
      //     href: "/provider/dashboard",
      //   },
      //   {
      //     label: "Authorization Summary List",
      //     active: "",
      //     href: "/provider/opencard/authorization-summary/view",
      //   },
      //   { label: "Authorization Summary", active: "active" }
      // );
    }
    this.dynamicUrl();
    this.getStaffDetails();
    this.getProcode();
  }
  getMetaData(event, label) {
    let reqObj: any, request: any;
    switch (label) {
      case "procode":
        this.generateFilteredProcodes(event);
        break;
    }
    request = { Object: reqObj, value: event.query };
    if (reqObj) {
      this._CaseTeamService.getSearchList(request).then((data) => {
        if (reqObj == "procode") {
          data.dropDown.map((item) => {
            if (item.procode.startsWith("9")) {
              this.procodeValidateArray.push(item.procodeID);
            }
          });
        }
        this.metaData = data.dropDown;
      });
    }
  }

  dynamicUrl() {
    if (
      this._router.url.includes(
        "/reintegration/referral/service/other/service/detail"
      )
    ) {
      this.isAttachmentRequired = true;
      this.footerHeight = true;
      this.isPrintEnabled = true;
      this.getOtherServiceDetailsById();
      this.breadcrumbs.push(
        { label: "List", href: "/reports/client", active: "" },
        { label: "Form", href: "/reports/client/details", active: "" },
        {
          label: "Case",
          href: "/reports/opencards/list/client/case",
          active: "",
        },
        {
          label: "Service Claim",
          href: "/reintegration/referral/service",
          active: "",
        },
        {
          label: "Other Services List",
          href: "/claims/list/other/service/list",
          active: "",
        },
        {
          label: "Other Services Form",
          href: "/reintegration/referral/service/other/service/detail",
          active: "",
        }
      );
    }
    if (this._router.url == "/reintegration/referral/service/other/service") {
      this.breadcrumbs.push(
        { label: "List", href: "/reports/client", active: "" },
        { label: "Form", href: "/reports/client/details", active: "" },
        {
          label: "Case",
          href: "/reports/opencards/list/client/case",
          active: "",
        },
        {
          label: "Service Claim",
          href: "/reintegration/referral/service",
          active: "",
        },
        {
          label: "Other Services List",
          href: "/claims/list/other/service/list",
          active: "",
        },
        {
          label: "Other Services Form",
          href: "/reintegration/referral/service/other/service/detail",
          active: "",
        }
      );
      if (this.referralTypeID === 7) {
        this.getAuthorizationPayorFromReferral();
      } else {
        this.otherService.authorizationPayor = {
          fullName: "Saint Francis Reintegration - West Region - RFCA Region 3",
          payorID: 142,
        };
      }
    }
    if (
      this._router.url.includes(
        "/reintegration/referral/service/hardgoods/detail"
      )
    ) {
      this.isAttachmentRequired = true;
      this.footerHeight = true;
      this.isHardgoods = true;
      this.isPrintEnabled = true;
      this.getOtherServiceDetailsById();
    }
    if (
      this._router.url.includes("/reintegration/referral/service/hardgoods")
    ) {
      this.isHardgoods = true;
    }

    // if (this._router.url == "/reintegration/referral/service/hardgoods") {
    //   this.isHardgoods = true;
    //   this.otherService.authorizationPayor = {
    //     fullName: "Saint Francis Reintegration - West Region - RFCA Region 3",
    //     payorID: 142,
    //   };
    // }

    if (
      this._router.url == "/reintegration/referral/service/hardgoods" ||
      this._router.url == "/reintegration/referral/service/hardgoods/detail"
    ) {
      this.isHardGoodProcode = true;
      this.breadcrumbs.push(
        { label: "List", href: "/reports/client", active: "" },
        { label: "Form", href: "/reports/client/details", active: "" },
        {
          label: "Case",
          href: "/reports/opencards/list/client/case",
          active: "",
        },
        {
          label: "Service Claim",
          href: "/reintegration/referral/service",
          active: "",
        },
        {
          label: "Hard Goods List",
          href: "/claims/list/hardgoods/list",
          active: "",
        },
        {
          label: "Hard Goods Form",
          href: "/reintegration/referral/service/hardgoods/detail",
          active: "",
        }
      );
      if (this.referralTypeID === 7) {
        this.getAuthorizationPayorFromReferral();
      } else {
        this.isHardgoods = true;
        this.otherService.authorizationPayor = {
          fullName: "Saint Francis Reintegration - West Region - RFCA Region 3",
          payorID: 142,
        };
      }
    }

    if (
      this._router.url.includes(
        "/reintegration/referral/service/authorization/summary/detail"
      )
    ) {
      this.getOtherServiceDetailsById();
      this.breadcrumbs.push(
        {
          label: "Authorization Summary",
          href: "/reintegration/referral/service/authorization/summary",
          active: "",
        },
        { label: "Form", active: "active" }
      );
      this.isDisabled = true;
      this.showEdit = false;
    }

    if (
      this._router.url.includes(
        "/provider/opencard/authorization-summary/detail"
      )
    ) {
      this.getOtherServiceDetailsById();
      this.breadcrumbs = [];
      this.breadcrumbs.push(
        { label: "Person Types", href: "/reports/person/types", active: "" },
        { label: "Provider List", href: "/reports/provider/view", active: "" },
        {
          label: "Provider Form",
          href: "/reports/provider/detail",
          active: "",
        },
        {
          label: "Placement and Payments",
          active: "",
          href: "/provider/dashboard/placements-payments",
        },
        {
          label: "Provider Opencards",
          active: "",
          href: "/provider/dashboard",
        },
        {
          label: "Authorization Summary List",
          href: "/provider/opencard/authorization-summary/view",
          active: "",
        },
        { label: "Authorization Summanry", active: "active" }
      );
      this.isDisabled = true;
      this.showEdit = false;
    }
  }
  defFormValues() {
    this.sponsorId = null;
    this.otherService.paySponsor = false;
    this.otherService.overrideDate = false;
    this.otherService.beginDate = new Date();
    this.otherService.endDate = new Date();
    this.otherService.authorizationStatus = { authorizationStatus: "Active" };
    this.otherService.whoToPay = { whoToPay: "Payee" };
    this.otherService.units = 0;
    this.otherService.payorRate = 0.0;
    this.otherService.originalPayorRate = 0.0;
    this.clientId =
      parseInt(localStorage.getItem("clientId")) - this._openCards.getHasKey();
    this.otherService.clientName = {
      fullName:
        parseInt(localStorage.getItem("clientId")) -
        this._openCards.getHasKey() +
        " , " +
        localStorage.getItem("kaecses") +
        " , " +
        localStorage.getItem("clientName"),
    };
  }
  getAuthid() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    const authId = {
      authorizationID: parseInt(localStorage.getItem("authId")),
    };
    this.authorizationID = parseInt(localStorage.getItem("authId"));
    this.req = authId;
    this._openCards.getAuthById(authId).then((data) => {
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.authorization.changedBy
      )
        ? data.authorization.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.authorization.changedDate
      )
        ? moment(data.authorization.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.authorization.enteredBy
      )
        ? data.authorization.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.authorization.enteredDate
      )
        ? moment(data.authorization.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      !isNullOrUndefined(data.authorization.beginDate)
        ? (data.authorization.beginDate = new Date(
            data.authorization.beginDate
          ))
        : null;
      !isNullOrUndefined(data.authorization.endDate)
        ? (data.authorization.endDate = new Date(data.authorization.endDate))
        : null;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.authorization.changedBy
      )
        ? data.authorization.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.authorization.changedDate
      )
        ? moment(data.authorization.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.authorization.enteredBy
      )
        ? data.authorization.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.authorization.enteredDate
      )
        ? moment(data.authorization.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      // CURRENT CLIENT ID
      if (data.authorization && data.authorization.clientID) {
        this.currentClientId = data.authorization.clientID.clientID;
      }
      this.editControll = true;
      !isNullOrUndefined(data.authorization.beginDate)
        ? (this.otherService.beginDate = new Date(data.authorization.beginDate))
        : null;
      !isNullOrUndefined(data.authorization.endDate)
        ? (this.otherService.endDate = new Date(data.authorization.endDate))
        : null;
      !isNullOrUndefined(data.authorization.clientID)
        ? (this.otherService.clientName = {
            fullName:
              data.authorization.clientID.clientID +
              " , " +
              data.authorization.clientID.kaecses +
              " , " +
              data.authorization.clientID.lastName +
              " , " +
              data.authorization.clientID.firstName,
          })
        : null;
      !isNullOrUndefined(data.authorization.addInfo)
        ? (this.otherService.additionalInfo = data.authorization.addInfo)
        : null;
      !isNullOrUndefined(data.authorization.authorizationStatusID)
        ? (this.authorizationStatusID =
            data.authorization.authorizationStatusID.authorizationStatusID)
        : null;
      !isNullOrUndefined(data.authorization.authorizationStatusID)
        ? (this.otherService.authorizationStatus = {
            authorizationStatus:
              data.authorization.authorizationStatusID.authorizationStatus,
          })
        : null;
      !isNullOrUndefined(data.authorization.clientID)
        ? (this.clientId = data.authorization.clientID.clientID)
        : null;
      !isNullOrUndefined(data.authorization.unitTypeID)
        ? (this.unitTypeId = data.authorization.unitTypeID.unitTypeID)
        : null;
      !isNullOrUndefined(data.authorization.unitTypeID)
        ? (this.otherService.unitType = {
            unitType: data.authorization.unitTypeID.unitType,
          })
        : null;
      !isNullOrUndefined(data.authorization.dateOverride)
        ? (this.otherService.overrideDate = data.authorization.dateOverride)
        : null;
      !isNullOrUndefined(data.authorization.unitsAuth)
        ? (this.otherService.units = data.authorization.unitsAuth.toFixed(2))
        : null;
      this.otherService.units = data.authorization.unitsAuth.toFixed(2);
      !isNullOrUndefined(data.authorization.unitsRemaining)
        ? (this.otherService.unitsRemaining = data.authorization.unitsRemaining.toFixed(
            2
          ))
        : null;
      !isNullOrUndefined(data.authorization.frequency)
        ? (this.otherService.frequency = data.authorization.frequency)
        : null;
      !isNullOrUndefined(data.authorization.payorRate)
        ? (this.otherService.payorRate = data.authorization.payorRate)
        : null;
      !isNullOrUndefined(data.authorization.providerRate)
        ? (this.otherService.providerRate = data.authorization.providerRate)
        : null;
      !isNullOrUndefined(data.authorization.payorID)
        ? (this.payorId = data.authorization.payorID.payorID)
        : null;
      !isNullOrUndefined(data.authorization.payorID)
        ? (this.otherService.authorizationPayor = {
            fullName:
              data.authorization.payorID.payorName +
              " , " +
              data.authorization.payorID.phone +
              " , " +
              data.authorization.payorID.fax +
              " , " +
              data.authorization.payorID.address1,
          })
        : null;
      !isNullOrUndefined(data.authorization.procodeID)
        ? (this.procodeID = data.authorization.procodeID.procodeID)
        : null;
      !isNullOrUndefined(data.authorization.procodeID)
        ? (this.otherService.procode = {
            procodeDescription: data.authorization.procodeID.procode,
          })
        : null;
      !isNullOrUndefined(data.authorization.providerID)
        ? (this.providerId = data.authorization.providerID.providerID)
        : null;
      !isNullOrUndefined(data.authorization.providerID)
        ? (this.otherService.provider = {
            provider: data.authorization.providerID.providerName,
          })
        : null;
      !isNullOrUndefined(data.authorization.sponsorID)
        ? (this.sponsorId = data.authorization.sponsorID.sponsorID)
        : null;
      !isNullOrUndefined(data.authorization.sponsorID)
        ? (this.otherService.providerSponsor = {
            sponsorName: data.authorization.sponsorID.sponsorName,
          })
        : null;
      !isNullOrUndefined(data.authorization.providerID)
        ? (this.otherService.whoToPay = { whoToPay: "Provider" })
        : { whoToPay: "Payee" };
      !isNullOrUndefined(data.authorization.notes)
        ? (this.otherService.note = data.authorization.notes)
        : null;
      !isNullOrUndefined(data.authorization.paySponsor)
        ? (this.otherService.paySponsor = data.authorization.paySponsor)
        : null;
      !isNullOrUndefined(data.authorization.payeeID)
        ? (this.otherService.payee = {
            payee: data.authorization.payeeID.payeeName,
          })
        : null;

      if (data.authorizationExceptionID.length > 0) {
        !isNullOrUndefined(data.authorizationExceptionID[0].originalPayorRate)
          ? (this.otherService.originalPayorRate =
              data.authorizationExceptionID[0].originalPayorRate)
          : null;
        !isNullOrUndefined(
          data.authorizationExceptionID[0].originalProviderRate
        )
          ? (this.otherService.originalProviderRate =
              data.authorizationExceptionID[0].originalProviderRate)
          : null;
        !isNullOrUndefined(data.authorizationExceptionID[0].exceptionPayorRate)
          ? (this.otherService.exceptionPayorRate =
              data.authorizationExceptionID[0].exceptionPayorRate)
          : null;
        !isNullOrUndefined(
          data.authorizationExceptionID[0].exceptionProviderRate
        )
          ? (this.otherService.exceptionProviderRate =
              data.authorizationExceptionID[0].exceptionProviderRate)
          : null;
        !isNullOrUndefined(
          data.authorizationExceptionID[0].authorizationExceptionReasonID
        )
          ? (this.otherService.exceptionReason = {
              authorizationExceptionReason:
                data.authorizationExceptionID[0].authorizationExceptionReasonID
                  .authorizationExceptionReason,
            })
          : null;
        !isNullOrUndefined(
          data.authorizationExceptionID[0].authorizationExceptionReasonID
        )
          ? (this.authorizationExceptionReasonID =
              data.authorizationExceptionID[0].authorizationExceptionReasonID.authorizationExceptionReasonID)
          : null;
        !isNullOrUndefined(data.authorizationExceptionID[0].explanationOfNeed)
          ? (this.otherService.explanationOfNeed =
              data.authorizationExceptionID[0].explanationOfNeed)
          : null;
        !isNullOrUndefined(data.authorizationExceptionID[0].approvedBy_StaffID)
          ? (this.otherService.approvedBy = {
              staffInfo:
                data.authorizationExceptionID[0].approvedBy_StaffID.lastName +
                " , " +
                data.authorizationExceptionID[0].approvedBy_StaffID.firstName +
                " , " +
                data.authorizationExceptionID[0].approvedBy_StaffID.cellPh,
            })
          : null;
        !isNullOrUndefined(data.authorizationExceptionID[0].requestedBy)
          ? (this.otherService.requestedBy =
              data.authorizationExceptionID[0].requestedBy)
          : null;
      }
      // this.getUnitValue();
      if (this.otherService.whoToPay.whoToPay === "Provider") {
        this.showProvider = true;
      } else if (this.otherService.whoToPay.whoToPay === "Payee") {
        this.showProvider = false;
      }
      if (
        this.otherService.whoToPay.whoToPay === "Provider" &&
        this.otherService.paySponsor === true
      ) {
        this.showProviderSponsor = true;
      }
      this.showOpenCard = true;
      loader.style.display = "none";
    });
  }
  getAutoFetchUnitType() {
    let req;
    req = { Object: "unitType", value: "Daily" };
    return this._CaseTeamService.getSearchList(req).then((data) => {
      this.results = data.dropDown;
      this.otherService.unitType = { unitType: this.results[0].unitType };
      this.unitTypeId = this.results[0].unitTypeID;
      this.getUnitValue();
    });
  }

  getPayorRate(event) {
    this.otherService.payorRate = this.otherService.payorRate.toFixed(2);
    this.otherService.providerRate = this.otherService.payorRate;
    this.otherService.exceptionPayorRate = this.otherService.payorRate;
    this.otherService.exceptionProviderRate = this.otherService.payorRate;
  }
  getOriginalPayorRate(event) {
    this.otherService.originalProviderRate = this.otherService.originalPayorRate;
  }
  getFisClient(event) {
    let req, referralId;
    referralId =
      parseInt(localStorage.getItem("referralId")) -
      this._openCards.getHasKey();
    req = { referralID: referralId, beginPagination: 1, endPagination: 10 };
    return this._openCards.getFISClientByreferralId(req).then((data) => {
      data.ClientReferral.map((item) => {
        item["fullName"] =
          item.clientID + " , " + item.kaecses + " , " + item.clientName;
      });
      this.results = data.ClientReferral;
    });
  }
  getClientId(event) {
    this.clientId = event.clientID;
  }
  getAuthorizationPayor(event) {
    let req;
    req = { Object: "payor", value: event.query };
    return this._CaseTeamService.getSearchList(req).then((data) => {
      data.dropDown.map((item) => {
        item["fullName"] =
          item.payorName +
          " , " +
          item.address1 +
          " , " +
          item.phone +
          " , " +
          item.fax;
      });
      this.results = data.dropDown;
    });
  }
  getExceptionReason(event) {
    let req;
    req = { Object: "authorizationExceptionReason", value: event.query };
    return this._CaseTeamService.getSearchList(req).then((data) => {
      this.results = data.dropDown;
    });
  }
  getUnitType(event) {
    let req;
    req = { Object: "unitType", value: event.query };
    return this._CaseTeamService.getSearchList(req).then((data) => {
      this.results = data.dropDown;
    });
  }
  getAuthorizationStatus(event) {
    let req;
    req = { Object: "authorizationStatus", value: event.query };
    return this._CaseTeamService.getSearchList(req).then((data) => {
      this.results = data.dropDown;
    });
  }
  getProcode() {
    let req;
    if (this.isHardGoodProcode === false) {
      req = {
        beginDate: Date.parse(this.otherService.beginDate),
        endDate: Date.parse(this.otherService.endDate),
        referralTypeID: 1,
        isHardGood: false,
        isOtherService: true,
      };
    } else if (this.isHardGoodProcode === true) {
      req = {
        beginDate: Date.parse(this.otherService.beginDate),
        endDate: Date.parse(this.otherService.endDate),
        referralTypeID: 1,
        isHardGood: true,
        isOtherService: false,
      };
    }
    return this._CaseTeamService.getProcodeAuthorization(req).then((data) => {
      data.authProcode.map((item) => {
        item["procodeDescription"] = item.ProcodeFinal + " , " + item.ProcodeID;
      });
      this.procodeResults = data.authProcode;
    });
  }
  generateFilteredProcodes(event) {
    this.filteredProcodes = [];
    this.procodeResults.filter((item) => {
      if (
        item.procodeDescription
          .toString()
          .toLowerCase()
          .indexOf(event.query) !== -1
      ) {
        this.filteredProcodes.push(item);
      }
    });
  }

  getStaffID(event) {
    let req;
    req = { Object: "staff", value: event.query };
    return this._CaseTeamService.getSearchList(req).then((data) => {
      data.dropDown.map((item) => {
        item["staffInfo"] =
          item.lastName + " , " + item.firstName + " , " + item.cellPh;
      });
      this.results = data.dropDown;
    });
  }
  getApprovedStaffID(event) {
    this.staffID = event.staffID;
  }
  getSponsorId(event) {
    // this.sponsorId = event.sponsorID.sponsorID;
    this.isSponsor = event.providerID.isSponsor;
  }
  getPayorId(event) {
    this.payorId = event.payorID;
  }
  getProcodeId(event) {
    this.procodeID = event.ProcodeID;
    this.procodeUnits = event.SRSMaxUnits;
    this.procodeUnitType = event.UnitType;
  }
  getWhoToPay(event) {
    this.results = [{ whoToPay: "Payee" }, { whoToPay: "Provider" }];
  }
  whoToPay(event) {
    if (event.whoToPay === "Provider") {
      this.showProvider = true;
      this.payeeId = null;
      this.providerId = null;
      this.otherService.provider = null;
      this.otherService.payee = null;
    } else if (event.whoToPay === "Payee") {
      this.showProvider = false;
      this.payeeId = null;
      this.providerId = null;
      this.otherService.provider = null;
      this.otherService.payee = null;
    }
    if (
      event.whoToPay === "Provider" &&
      this.otherService.paySponsor === "true"
    ) {
      this.showProviderSponsor = true;
    }
  }
  getPaySponsor(event) {
    if (event === true && this.showProvider === true) {
      this.showProviderSponsor = true;
    }
  }
  getProvider(event) {
    // let req;
    // req = { Object: "provider", value: event.query };
    // return this._CaseTeamService.getSearchList(req).then((data) => {
    //   data.dropDown.map((item) => {
    //     item["provider"] =
    //       item.providerName + " ," + item.providerTypeID.providerType;
    //   });
    //   this.results = data.dropDown;
    // });
    let req;
    req = {
      beginDate: this.otherService.beginDate,
      value: event.query,
      beginPagination: 1,
      endPagination: 100,
    };
    return this._CaseTeamService.getProviderList(req).then((data) => {
      data.providerList.map((item) => {
        item["provider"] = item.providerName + " ," + item.providerType;
      });
      this.results = data.providerList;
    });
  }
  getOverrideDate(event) {
    if (event === true) {
      this.isOverrideDate = false;
    } else if (event === false) {
      this.isOverrideDate = true;
      // this.onChangeOverRide(event);
    }
  }
  getUnitTypeValue(event) {
    this.unitTypeId = event.unitTypeID;
    const date = new Date(this.otherService.beginDate);
    this.otherService.overrideDate = true;
    if (!this.otherService.overrideDate) {
      if (event.unitType === "Daily") {
        this.otherService.endDate = new Date(
          date.setDate(date.getDate() + parseInt(this.otherService.units))
        );
      } else if (event.unitType === "Weekly") {
        this.otherService.endDate = new Date(
          date.setDate(date.getDate() + parseInt(this.otherService.units) * 7)
        );
      } else if (event.unitType === "Monthly") {
        this.otherService.endDate = new Date(
          date.setMonth(date.getMonth() + parseInt(this.otherService.units))
        );
      } else if (event.unitType === "1/2 Hour") {
        this.otherService.endDate = new Date(
          date.setTime(
            date.getTime() + parseInt(this.otherService.units) * 30 * 60 * 1000
          )
        );
      } else if (event.unitType === "Hour") {
        this.otherService.endDate = new Date(
          date.setHours(date.getHours() + parseInt(this.otherService.units))
        );
      } else if (event.unitType === "1/4 Hour") {
        this.otherService.endDate = new Date(
          date.setTime(
            date.getTime() + parseInt(this.otherService.units) * 15 * 60 * 1000
          )
        );
      }
    }
  }
  validateEndDate() {
    if (!this.editControll) {
      if (!this.otherService.overrideDate && this.otherService.unitType) {
        if (this.otherService.unitType.unitType === "Daily") {
          let beginDate = new Date(
            new Date(this.otherService.beginDate).setHours(0, 0, 0, 0)
          );
          let endDate = new Date(
            new Date(this.otherService.endDate).setHours(0, 0, 0, 0)
          );
          let Difference_In_Time = endDate.getTime() - beginDate.getTime();
          let Difference_In_Days = (
            Difference_In_Time /
            (1000 * 3600 * 24)
          ).toString();
          let calcUnits = Difference_In_Days.split(".");
          this.otherService.units = parseInt(calcUnits[0]).toFixed(2);
        } else if (this.otherService.unitType.unitType === "Monthly") {
          let beginDate = new Date(this.otherService.beginDate);
          let endDate = new Date(this.otherService.endDate);
          this.otherService.units =
            (endDate.getFullYear() - beginDate.getFullYear()) * 12 +
            (endDate.getMonth() - beginDate.getMonth());
        } else if (this.otherService.unitType.unitType === "Hour") {
          let beginDate = new Date(this.otherService.beginDate);
          let endDate = new Date(this.otherService.endDate);
          this.otherService.units = Math.round(
            Math.abs(beginDate.getTime() - endDate.getTime()) / 36e5
          ).toFixed(2);
        } else if (this.otherService.unitType.unitType === "1/2 Hour") {
          let beginDate = new Date(this.otherService.beginDate);
          let endDate = new Date(this.otherService.endDate);
          let min30Calsc = Math.round(
            Math.abs(endDate.getTime() - beginDate.getTime()) / 1800000
          );
          this.otherService.units = min30Calsc.toFixed(2);
        } else if (this.otherService.unitType.unitType === "1/4 Hour") {
          let beginDate = new Date(this.otherService.beginDate);
          let endDate = new Date(this.otherService.endDate);
          let min30Calsc = Math.round(
            Math.abs(endDate.getTime() - beginDate.getTime()) / 900000
          );
          this.otherService.units = min30Calsc.toFixed(2);
        } else if (this.otherService.unitType.unitType === "Weekly") {
          let beginDate = new Date(
            new Date(this.otherService.beginDate).setHours(0, 0, 0, 0)
          );
          let endDate = new Date(
            new Date(this.otherService.endDate).setHours(0, 0, 0, 0)
          );
          let Difference_In_Time = endDate.getTime() - beginDate.getTime();
          let Difference_In_Days_count = Math.round(
            Difference_In_Time / (1000 * 3600 * 24) / 7
          ).toFixed(2);
          this.otherService.units = Difference_In_Days_count;
        }
        this.findUnitsAuth = this.otherService.units;
      }
      var floatUnits = this.otherService.units.split(".");
      if (floatUnits.length === 1) {
        this.otherService.unitsRemaining = this.otherService.units.toFixed(2);
      } else {
        if ((floatUnits[1] = "00")) {
          this.otherService.unitsRemaining = this.otherService.units;
        } else {
          this.otherService.units = this.otherService.units.toFixed(2);
          this.otherService.unitsRemaining = this.otherService.units;
        }
      }
    }
  }

  getUnitValue() {
    // console.log('this.otherService.endDate>>>', this.otherService.endDate);
    // console.log('this.otherService.beginDate>>>', this.otherService.beginDate);
    // console.log('this.otherService.units>>>', this.otherService.units);
    // console.log(
    //   'this.otherService.unitType.unitType>>>',
    //   this.otherService.unitType.unitType
    // );
    if (!this.editControll) {
      if (this.otherService.units === "0.00") {
        this.otherService.units = 0;
      }
      if (!this.otherService.overrideDate && this.otherService.unitType) {
        if (this.otherService.unitType.unitType === "Daily") {
          let date = new Date(this.otherService.beginDate);
          this.otherService.endDate = new Date(
            date.setDate(date.getDate() + parseInt(this.otherService.units))
          );
          // if (this.findUnitsAuth > this.otherService.units) {
          //   this.otherService.endDate = new Date(Date.parse(this.otherService.beginDate) - (this.otherService.units * this._localValues.timeStampValueForDay));
          // } else if (this.findUnitsAuth < this.otherService.units) {
          //   this.otherService.endDate = new Date(Date.parse(this.otherService.beginDate) + (this.otherService.units * this._localValues.timeStampValueForDay));
          // } else {
          //   this.otherService.units = this.findUnitsAuth;
          // }
        } else if (this.otherService.unitType.unitType === "Monthly") {
          let d = new Date(this.otherService.beginDate);
          this.otherService.endDate = new Date(
            d.setMonth(d.getMonth() + parseInt(this.otherService.units))
          );
        } else if (this.otherService.unitType.unitType === "Hour") {
          let date = new Date(this.otherService.beginDate);
          this.otherService.endDate = new Date(
            date.setHours(date.getHours() + parseInt(this.otherService.units))
          );
        } else if (this.otherService.unitType.unitType === "1/2 Hour") {
          let date = new Date(this.otherService.beginDate);
          this.otherService.endDate = new Date(
            date.setTime(
              date.getTime() +
                parseInt(this.otherService.units) * 30 * 60 * 1000
            )
          );
        } else if (this.otherService.unitType.unitType === "1/4 Hour") {
          let date = new Date(this.otherService.beginDate);
          this.otherService.endDate = new Date(
            date.setTime(
              date.getTime() +
                parseInt(this.otherService.units) * 15 * 60 * 1000
            )
          );
        } else if (this.otherService.unitType.unitType === "Weekly") {
          let date = new Date(this.otherService.beginDate);
          this.otherService.endDate = new Date(
            date.setDate(date.getDate() + parseInt(this.otherService.units) * 7)
          );
        }
      }
      console.log("this.otherService.unitse>>>", this.otherService.units);
      this.otherService.units = this.otherService.units.toFixed(2);
      this.otherService.unitsRemaining = this.otherService.units;
    }
  }
  onChangeOverRide(event: any) {
    if (event) {
      this.otherService.overrideDate = event;
    } else {
      this.getUnitValue();
    }
  }
  providerInfo(event) {
    this.providerId = event.providerID;
    this.sponsorId = event.sponsorID;
    if (event.paySponsor === true) {
      this.otherService.paySponsor = true;
      this.isChecked = true;
    } else {
      this.otherService.paySponsor = false;
      this.isChecked = false;
    }
  }
  save() {
    this.displayDialog = false;
  }
  editForm() {
    this.editControll = false;
    this.otherServiceValue.enable();
    this.payorAndProviderRateControlBasedOnClaims();
  }
  getPayee(event) {
    // let req;
    // req = { Object: "payee", value: event.query };
    // return this._CaseTeamService.getSearchList(req).then((data) => {
    //   data.dropDown.map((item) => {
    //     item["payee"] = item.payeeName + " ," + item.payeeID;
    //   });
    //   this.results = data.dropDown;
    // });
    let req;
    req = {
      beginDate: this.otherService.beginDate,
      value: event.query,
      beginPagination: 1,
      endPagination: 100,
    };
    return this._CaseTeamService.getPayeeList(req).then((data) => {
      data.payeeList.map((item) => {
        item["payee"] = item.payeeName + " ," + item.payeeID;
      });
      this.results = data.payeeList;
    });
  }
  getProviderSponsor(event) {
    let req;
    req = { providerID: this.providerId };
    return this._CaseTeamService.getProviderSponsor(req).then((data) => {
      data.ProviderSponsor.map((item) => {
        item["sponsorName"] = item.sponsorID.sponsorName;
      });
      this.results = data.ProviderSponsor;
    });
  }
  getAuthorizationId(event) {
    this.authorizationStatusID = event.authorizationStatusID;
  }
  getStaffDetails() {
    let staffId: any;
    staffId = parseInt(localStorage.getItem("UserId")) || 4620;
    this._team.getUserById({ staffID: parseInt(staffId) }).then((data) => {
      this.enteredBy = data.users.firstName + data.users.lastName;
    });
  }
  saveAuth(otherServiceValue) {
    console.log("otherServiceValue", otherServiceValue);
    if (otherServiceValue.value.units === 0) {
      swal("Warning", "You must enter units for this procode", "warning");
      return;
    }
    // if (this.procodeUnitType !== null) {
    //   if (this.procodeUnitType !== otherServiceValue.value.unitType.unitType) {
    //     swal('Warning', 'Unit Type must be equal to the procode Unit Type  ', 'warning');
    //     return;
    //   }
    // }
    if (this.procodeUnits !== null) {
      if (otherServiceValue.value.units > this.procodeUnits) {
        swal("Warning", `Units cannot exceed ${this.procodeUnits}`, "warning");
        return;
      }
    }
    if (this.otherServiceValue.valid) {
      if (this.otherService.whoToPay.whoToPay === "Payee") {
        if (
          this.otherService.payee === null ||
          this.otherService.payee === undefined
        ) {
          return swal("Warning", "Please fill the mandatory fields", "warning");
        }
      } else if (this.otherService.whoToPay.whoToPay === "Provider") {
        if (
          this.otherService.provider === null ||
          this.otherService.provider === undefined
        ) {
          return swal("Warning", "Please fill the mandatory fields", "warning");
        }
      }
      const loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      let req;
      req = {
        clientID: this.clientId,
        unitTypeID: this.unitTypeId,
        dateOverride: this.otherService.overrideDate,
        beginDate: Date.parse(otherServiceValue.value.beginDate),
        endDate: Date.parse(otherServiceValue.value.endDate),
        unitsAuth: otherServiceValue.value.units,
        unitsRemaining: otherServiceValue.value.unitsRemaining,
        frequency: otherServiceValue.value.frequency,
        payorRate: otherServiceValue.value.payorRate,
        providerRate: otherServiceValue.value.providerRate,
        payorID: this.otherService.authorizationPayor
          ? this.otherService.authorizationPayor.payorID
          : this.payorId,
        authorizationStatusID: this.authorizationStatusID,
        procodeID: this.procodeID,
        providerID: this.providerId,
        sponsorID: !isNullOrUndefined(this.sponsorId) ? this.sponsorId : null,
        paySponsor: this.otherService.paySponsor,
        notes: otherServiceValue.value.note,
        addInfo: otherServiceValue.value.additionalInfo,
        payeeID: this.payeeId,
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._openCards.getHasKey(),
        enteredBy: this.enteredBy,
        authorizationExceptionID: [
          {
            authorizationExceptionReasonID: this.authorizationExceptionReasonID,
            originalPayorRate: otherServiceValue.value.originalPayorRate,
            originalProviderRate: otherServiceValue.value.originalProviderRate,
            exceptionPayorRate: otherServiceValue.value.exceptionPayorRate,
            exceptionProviderRate:
              otherServiceValue.value.exceptionProviderRate,
            approvedBy_StaffID: this.staffID,
            requestedBy: otherServiceValue.value.requestedBy,
            explanationOfNeed: otherServiceValue.value.explanationOfNeed,
          },
        ],
      };

      if (
        this._router.url ==
        "/reintegration/referral/service/other/service/detail"
      ) {
        console.log("localStorage.getItem(", localStorage.getItem("authId"));
        req.authorizationID = localStorage.getItem("authId");
        return this._CaseTeamService.updateOtherService(req).then((data) => {
          if (data.responseStatus === true) {
            loader.style.display = "none";
            swal("Updated", "Updated", "success");
            if (this.isHardgoods === true) {
              this._router.navigate(["/claims/list/hardgoods/list"]);
            } else {
              this._router.navigate(["/claims/list/other/service/list"]);
            }
          } else {
            loader.style.display = "none";
          }
        });
      } else if (
        this._router.url == "/reintegration/referral/service/hardgoods/detail"
      ) {
        console.log("localStorage.getItem(", localStorage.getItem("authId"));
        req.authorizationID = localStorage.getItem("authId");
        return this._CaseTeamService.updateOtherService(req).then((data) => {
          if (data.responseStatus === true) {
            loader.style.display = "none";
            swal("Updated", "Updated", "success");
            if (this.isHardgoods === true) {
              this._router.navigate(["/claims/list/hardgoods/list"]);
            } else {
              this._router.navigate(["/claims/list/other/service/list"]);
            }
          } else {
            loader.style.display = "none";
          }
        });
      } else {
        return this._CaseTeamService.saveOtherService(req).then((data) => {
          if (data.responseStatus === true) {
            this.isDisabled = true;
            loader.style.display = "none";
            swal("Success", "Submitted", "success");
            if (this.isHardgoods === true) {
              localStorage.setItem(
                "authorizationId",
                data.authorization.authorizationID + this._openCards.getHasKey()
              );
              this._router.navigate(["/placement-psa"], {
                queryParams: { module: "other-service-hard-goods" },
              });
            } else {
              localStorage.setItem(
                "authorizationId",
                data.authorization.authorizationID + this._openCards.getHasKey()
              );
              this._router.navigate(["/placement-psa"], {
                queryParams: { module: "other-service-claims" },
              });
            }
          } else {
            loader.style.display = "none";
          }
        });
      }
    } else {
      swal("Warning", "Please fill the mandatory fields", "warning");
    }
  }
  getPayeeId(event) {
    this.payeeId = event.payeeID;
    this.sponsorId = null;
  }
  getExceptionReasonId(event) {
    this.authorizationExceptionReasonID = event.authorizationExceptionReasonID;
  }
  authException() {
    this.displayDialog = true;
  }
  getOtherServiceDetailsById() {
    this.getAuthid();
    this.otherServiceValue.disable();
    var req = {
      staffID: parseInt(localStorage.getItem("UserId")) || 14802,
      form: "ProviderServiceAgreementVoid",
      authorizationID: parseInt(localStorage.getItem("authId")),
    };
    this._openCards.getPSDPDFKITVoidForm(req).then((data) => {
      console.log("data>>>", data);
      localStorage.setItem("hardGoods_pdfDocID", data);
    });
  }
  formValidation() {
    this.otherServiceValue = this._fb.group({
      clientName: [null],
      unitType: [null],
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null, Validators.compose([Validators.required])],
      units: [null, Validators.compose([Validators.required])],
      unitsRemaining: [null],
      frequency: [null],
      payorRate: [null],
      providerRate: [null],
      authorizationPayor: [null, Validators.compose([Validators.required])],
      authorizationStatus: [null],
      procode: [null, Validators.compose([Validators.required])],
      whoToPay: [null],
      note: [null],
      additionalInfo: [null],
      payee: [null],
      originalPayorRate: [null],
      originalProviderRate: [null],
      exceptionPayorRate: [null],
      exceptionProviderRate: [null],
      exceptionReason: [null],
      explanationOfNeed: [null],
      overrideDate: [null],
      paySponsor: [null],
      providerSponsor: [null],
      provider: [null],
      requestedBy: [null],
      approvedBy: [null],
    });
  }
  discardClaim() {
    if (
      this._router.url ===
        "/reintegration/referral/service/other/service/detail" ||
      this._router.url === "/reintegration/referral/service/other/service"
    ) {
      this._router.navigate(["/claims/list/other/service/list"]);
    }
    if (
      this._router.url === "/reintegration/referral/service/hardgoods/detail" ||
      this._router.url === "/reintegration/referral/service/hardgoods"
    ) {
      this._router.navigate(["/claims/list/hardgoods/list"]);
    }
  }

  // navigateTo() {
  //   let currentURL = this._router.url;
  //   if (currentURL == '/reintegration/referral/service/hardgoods') {
  //     this.url = '/reports/attachment-document/service-hardgoods';
  //   }
  //   else {
  //     this.url = '/reports/attachment-document/rfc/service-hardgoods';
  //   }
  //   return this._router.navigate([this.url])
  // }

  /**Attachment docs navigations */
  navigateTo() {
    let currentURL: string = this._router.url,
      navigateURL: string;

    const otherServicesUrl =
      "/reintegration/referral/service/other/service/detail";
    const hardgoodsUrl = "/reintegration/referral/service/hardgoods/detail";

    if (currentURL.includes(otherServicesUrl)) {
      navigateURL = "/reports/attachment-document/rfc/rfc-authorizations";
    }
    if (currentURL.includes(hardgoodsUrl)) {
      navigateURL = "/reports/attachment-document/rfc/rfc-authorizations";
    }
    return this._router.navigate([navigateURL], {
      queryParamsHandling: "preserve",
    });
  }

  printPreview() {
    this.isPreviewOpen = true;
  }

  sendMail() {
    console.log("mail functionality called");
    // Mail Functionality
  }

  onClickJumptoClient() {
    let currentNode: any;
    const currentClientId = parseInt(this.currentClientId);
    const clientID = currentClientId + this._openCards.getHasKey();
    localStorage.setItem("clientId", clientID.toString());
    if (
      this._router.url.includes(
        "/reintegration/referral/service/other/service/detail"
      )
    ) {
      currentNode = "other_services";
    } else {
      currentNode = "hard_goods";
    }
    // localStorage.setItem('clientId', this.currentClientId+ this._openCards.getHasKey());
    return this._router.navigate(["/reports/client/details"], {
      queryParams: {
        clientID: this.currentClientId,
        currentNode: currentNode,
      },
    });
  }

  public async payorAndProviderRateControlBasedOnClaims() {
    let getCountOfClaimsReq = {
      authorizationID: parseInt(localStorage.getItem("authId")),
      beginPagination: 1,
      endPagination: 100,
    };
    let claimsRecordCount = await this._openCards.getClaimsAuthById(
      getCountOfClaimsReq
    );
    if (claimsRecordCount.totalCount === 0) {
      this.otherServiceValue.controls["payorRate"].enable();
      this.otherServiceValue.controls["providerRate"].enable();
    } else {
      this.otherServiceValue.controls["payorRate"].disable();
      this.otherServiceValue.controls["providerRate"].disable();
    }
  }

  public async getAuthorizationPayorFromReferral() {
    let request = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._openCards.getHasKey(),
    };
    let response = await this._openCards.getByIDNCRFC(request);
    this.otherService.authorizationPayor = {
      fullName: `${response.referral[1].payorName} - ${response.referral[1].alias}`,
      payorID: response.referral[1].payorID,
    };
  }
}
