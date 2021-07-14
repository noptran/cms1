import { Component, OnInit } from "@angular/core";
import {
  placementAuthViewOnlyInfo,
  PlacementAuthTemp,
} from "./placement-auth-template";
import { Router, ActivatedRoute } from "@angular/router";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { LocalValues } from "../../local-values";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CaseTeamService } from "../../case-team/case-team.service";
import { isNullOrUndefined } from "util";
import { AuthorizationException } from "../living-arrange-ment/pl-living-arrangment";
import swal from "sweetalert2";
import * as moment from "moment";
import { PlacementService } from "../placement.service";
import { environment } from "../../../environments/environment";

@Component({
  templateUrl: "./placement-auth-template.component.html",
  styleUrls: ["./placement-auth-template.component.scss"],
  selector: "placement-auth-template",
})
export class PlacementAuthTempleteComponent implements OnInit {
  moduleName: string;
  selectedLivingArragementRecordId: number;
  viewOnlyInformations: placementAuthViewOnlyInfo;
  moduleViewName: string;
  placementAuth: PlacementAuthTemp = new PlacementAuthTemp();
  placementAuthForm: FormGroup;
  metaData = [];
  selectedAuthorizationID: number;
  breadcrumbs = [];
  authExcep: AuthorizationException = new AuthorizationException();
  isAuthExcepFormOpen = false;
  unitsRemaining: any;
  currentAuthorizationID: number;
  currentPlacementDetailID: number;
  existingAuthorizationsList = [];
  filteredExistAuthList = [];
  isEdit = false;
  isAttachmentRequired = false;
  claimList = [];
  isDeleteBtnDisable = false;
  userName: string;
  isPlacementEventAuth = false;
  discardTo = "/reintegration/referral/placement-authorizations/list";
  isVisibleDeleteAuthBtn = false;
  req: any;
  navigationOrigin: string;
  climlistURL: any;
  isPayeeCard = true;
  isFormLog = false;
  isCSpayee = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isNewPage = false;
  public showUnitRemaingLowInfo = false;
  public actualUnit: number;
  public actualUnitRemaning: number;
  public authorizationIDFormLocalstorage: number;
  public isOverrideAuthorization = false;
  public isOverrideAuthorizationDeleteConfirmation = false;
  public subModule: string;
  public isPlacementDateValidationOpen = false;
  public selectedProcodeObject: any;
  hideFooter: boolean = true;
  showHeader: boolean = false;

  constructor(
    public _placement: PlacementService,
    public _router: Router,
    public _activatedRoute: ActivatedRoute,
    public _opencard: OpencardsService,
    public _localValues: LocalValues,
    public _fb: FormBuilder,
    public _caseTeam: CaseTeamService
  ) {}

  ngOnInit() {
    if (this._router.url.includes("new")) {
      this.isNewPage = true;
      this.placementAuth["paySponsor"] =
        this._localValues.currentPlacementProviderInfo.paySponsor;
    }
    this.userName = localStorage.getItem("UserEmail")
      ? localStorage.getItem("UserEmail").split("@")[0]
      : "Admin";
    console.log("Previous url", document.referrer);
    console.log("History length", window.history.length);
    this.moduleName = this._activatedRoute.snapshot.queryParamMap.get("module");
    this.selectedLivingArragementRecordId = parseInt(
      this._activatedRoute.snapshot.queryParamMap.get("li_id")
    ); // Living Arragements Id
    this.subModule = this._activatedRoute.snapshot.queryParamMap.get("sub");
    this.currentAuthorizationID = parseInt(
      this._activatedRoute.snapshot.queryParamMap.get("current_recId")
    ); //Authorization id
    this.currentPlacementDetailID = parseInt(
      this._activatedRoute.snapshot.queryParamMap.get("pd_id")
    ); //placement detail id
    this.navigationOrigin =
      this._activatedRoute.snapshot.queryParamMap.get("origin");
    if (this._activatedRoute.snapshot.queryParamMap.get("navigateFrom")) {
      this._activatedRoute.snapshot.queryParamMap
        .get("navigateFrom")
        .includes("livingArragementDetail");
      this.discardTo =
        "/reintegration/referral/opencard/placement/living-arrangement/detail";
    }
    if (
      this._router.url.includes(
        "/reintegration/referral/placement-event-authorizations"
      )
    ) {
      this.discardTo =
        "reintegration/referral/placement-event-authorizations/list";
      this._localValues.previousurl =
        "reintegration/referral/placement-event-authorizations/list";
      // this.moduleName = this.moduleName ? null : "authorization";
    }
    this.formValidation();
    this.fetchPlacementEventAuthInfo();
    this.getViewOnlyInforamtion();

    if (
      this._router.url.includes(
        "/reintegration/referral/placement-authorizations/new"
      )
    ) {
      let payorName = {
          fullPayor:
            "Saint Francis Reintegration - West Region - RFCA Region 3",
          payorID: 142,
        },
        authorizationStatus = {
          authorizationStatus: "Active",
          authorizationStatusID: 3,
        };
      this.placementAuth.payorID = payorName;
      this.placementAuth.holdBedPayorID = payorName;
      this.placementAuth.authorizationStatusID = authorizationStatus;
      this.placementAuth.beginDate = new Date(Date.now());
      this.placementAuth.endDate = new Date(Date.now());
    }
    if (this._router.url === "/reintegration/payee/Auth-detail") {
      this.breadcrumbs = [
        { label: "Payee List", href: "/reports/payee/view", active: "" },
        { label: "Payee Form", href: "/reports/client/details", active: "" },
        {
          label: "Payee - Authorizations Summary",
          href: "/payee/auth_list",
          active: "",
        },
        {
          label: "Payee - Authorizations Summary Form",
          href: "",
          active: "active",
        },
      ];
      this.climlistURL = "/payee/auth_list/claim-list";
      this.getRecById();
    } else if (this._router.url === "/cs_payee_claim/payee/Auth-detail") {
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        { label: "CS:Claim Payee", href: "/cs_claim_payee", active: "" },
        {
          label: "Claim Payee",
          href: "/cs_claim_payee/claimDetail",
          active: "",
        },
        {
          label: "Claims List",
          href: "/cs_claim_payeeClaim",
          active: "active",
        },
      ];
      this.climlistURL = "/cs_claim_payeeClaim";
      this.getRecById();
    } else if (
      this._router.url ===
      "/reintegration/payee/serviceClaim_hardgoods/Auth-detail"
    ) {
      this.breadcrumbs = [
        { label: "Payee List", href: "/reports/payee/view", active: "" },
        { label: "Payee Form", href: "/reports/payee/detail", active: "" },
        {
          label: "Payee - Service Claim - Hard Goods",
          href: "/payee/serviceClaim_hardgoods/auth_list",
          active: "",
        },
        {
          label: "Payee - (Service Claim - Hard Goods) Authorizations Form",
          href: "",
          active: "active",
        },
      ];
      this.climlistURL = "/payee/serviceClaim_hardgoods/auth_list/claim-list";
      this.getRecById();
    } else if (
      this._router.url ===
      "/reintegration/payee/serviceClaim_otherService/Auth-detail"
    ) {
      this.breadcrumbs = [
        { label: "Payee List", href: "/reports/payee/view", active: "" },
        { label: "Payee Form", href: "/reports/payee/detail", active: "" },
        {
          label: "Payee - Service Claim - Other Services",
          href: "/payee/serviceClaim_otherService/auth_list",
          active: "",
        },
        {
          label: "Payee - (Service Claim - Other Services) Authorizations Form",
          href: "",
          active: "active",
        },
      ];
      this.climlistURL =
        "/payee/serviceClaim_otherService/auth_list/claim-list";
      this.getRecById();
    } else if (
      this._router.url === "/reintegration/cs-payee/csPayeeAuthDetail"
    ) {
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        { label: "CS - Payee List", href: "/csPayee", active: "" },
        { label: "CS - Payee Form", href: "/csPayee/payeeform", active: "" },
        {
          label: "CS Payee - Authorization List",
          href: "/csPayee/payeeform/payee-AuthList",
          active: "",
        },
        { label: "CS Payee - Authorization Form", active: "active" },
      ];
      this.getRecById();
      this.isCSpayee = true;
    } else if (
      this._router.url.includes(
        "/reintegration/provider/providerAuthorization_detail"
      )
    ) {
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        {
          label: "Provider Authorization",
          href: "/provider_Authorization",
          active: "",
        },
        { label: "Authorization Information", active: "active" },
      ];
    } else if (
      this._router.url.includes(
        "/reintegration/payee/payeeAuthorization_detail"
      )
    ) {
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        {
          label: "Payee Authorization",
          href: "/payee_Authorization",
          active: "",
        },
        { label: "Authorization Information", active: "active" },
      ];
    }
    if (this._router.url.includes("detail")) {
      this.getRecById();
    }

    this.getExistingAuthorizationList();

    if (this.isNewPage) {
      // this.placementAuth.beginDate = new Date().setHours(0, 0, 0, 0);
      // this.placementAuth.endDate = new Date().setHours(0, 0, 0, 0);
    }

    if (
      this._router.url ===
        "/reintegration/provider/providerAuthorization_detail" ||
      this._router.url === "/reintegration/payee/payeeAuthorization_detail"
    ) {
      this.hideFooter = false;
    }
  }

  fetchPlacementEventAuthInfo() {
    if (this.moduleName == "livingArrangment") {
      this.breadcrumbs.push(
        { label: "List", href: "/reports/client", active: "" },
        { label: "Form", href: "/reports/client/details", active: "" },
        {
          label: "Case Form",
          href: "/reintegration/referral/detail",
          active: "",
        },
        {
          label: "Placements List",
          active: "",
          href: "/reintegration/referral/opencard/placement/view",
        },
        {
          label: "Placements",
          active: "reintegration/referral/opencard/placement/detail",
        },
        {
          label: "Living Arrangement List",
          active: "",
          href: "/reintegration/referral/opencard/placement/living-arrangement/view",
        },
        {
          label: "Living Arrangement Form",
          active: "",
          href: "/reintegration/referral/opencard/placement/living-arrangement/detail",
        },
        {
          label: "Authorization List",
          active: "",
          href: "/reintegration/referral/placement-authorizations/list",
        },
        { label: "Authorization Form", active: "active" }
      );
    }
    const detailPage =
      "/reintegration/referral/placement-event-authorizations/detail";
    if (this.navigationOrigin === "cards") {
      this.breadcrumbs.push(
        { label: "List", href: "/reports/client", active: "" },
        { label: "Form", href: "/reports/client/details", active: "" },
        {
          label: "Case Form",
          href: "/reintegration/referral/detail",
          active: "",
        },
        {
          label: "Placements List",
          active: "",
          href: "/reintegration/referral/opencard/placement/view",
        },
        {
          label: "Placements",
          active: "reintegration/referral/opencard/placement/detail",
        },
        {
          label: "Placement Event List",
          active: "",
          href: "/reintegration/referral/opencard/placement/placementEvent/view",
        },
        {
          label: "Placement Event Form",
          active: "",
          href: "/reintegration/referral/opencard/placement/placementEvent/detail",
        },
        {
          label: "Authorization List",
          active: "",
          href: "/reintegration/referral/placement-event-authorizations/list",
        },
        { label: "Authorization Form", active: "active" }
      );
    } else if (
      this._router.url.includes(
        "/reintegration/referral/placement-event-authorizations/new"
      )
    ) {
      this.currentAuthorizationID = null;
      this.isPlacementEventAuth = true;
      this.placementAuth["paySponsor"] =
        this._localValues.currentPlacementProviderInfo.paySponsor;
      this.breadcrumbs.length = 0;
      this.breadcrumbs.push(
        { label: "List", href: "/reports/client", active: "" },
        { label: "Form", href: "/reports/client/details", active: "" },
        {
          label: "Case Form",
          href: "/reintegration/referral/detail",
          active: "",
        },
        {
          label: "Placements List",
          active: "",
          href: "/reintegration/referral/opencard/placement/view",
        },
        {
          label: "Placements",
          active: "reintegration/referral/opencard/placement/detail",
        },
        {
          label: "Placement Event List",
          active: "",
          href: "/reintegration/referral/opencard/placement/placementEvent/view",
        },
        {
          label: "Placement Event Form",
          active: "",
          href: "/reintegration/referral/opencard/placement/placementEvent/detail",
        },
        {
          label: "Authorization List",
          active: "",
          href: "/reintegration/referral/placement-event-authorizations/list",
        },
        { label: "Authorization Form", active: "active" }
      );
    } else if (
      this._router.url.includes(
        "/reintegration/referral/placement-event-authorizations/detail"
      )
    ) {
      this.isPlacementEventAuth = true;
      this.breadcrumbs.length = 0;
      this.breadcrumbs.push(
        { label: "List", href: "/reports/client", active: "" },
        { label: "Form", href: "/reports/client/details", active: "" },
        {
          label: "Case Form",
          href: "/reintegration/referral/detail",
          active: "",
        },
        {
          label: "Placements List",
          active: "",
          href: "/reintegration/referral/opencard/placement/view",
        },
        {
          label: "Placements",
          active: "reintegration/referral/opencard/placement/detail",
        },
        {
          label: "Placement Event List",
          active: "",
          href: "/reintegration/referral/opencard/placement/placementEvent/view",
        },
        {
          label: "Placement Event Form",
          active: "",
          href: "/reintegration/referral/opencard/placement/placementEvent/detail",
        },
        {
          label: "Authorization List",
          active: "",
          href: "/reintegration/referral/placement-event-authorizations/list",
        },
        { label: "Authorization Form", active: "active" }
      );
    } else if (this._router.url.includes(detailPage)) {
      this.isPlacementEventAuth = true;
      this.getRecById();
    } else {
      if (this.moduleName == "placementEvent") {
        this.breadcrumbs.push(
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          {
            label: "Case Form",
            href: "/reintegration/referral/detail",
            active: "",
          },
          {
            label: "Placements List",
            active: "",
            href: "/reintegration/referral/opencard/placement/view",
          },
          {
            label: "Placements",
            active: "/reintegration/referral/opencard/placement/detail",
          },
          {
            label: "Placement Event List",
            active: "",
            href: "/reintegration/referral/opencard/placement/placementEvent/view",
          },
          {
            label: "Placement Event Form",
            active: "",
            href: "/reintegration/referral/opencard/placement/placementEvent/detail",
          },
          {
            label: "Authorization List",
            active: "",
            href: "/reintegration/referral/placement-event-authorizations/list",
          },
          { label: "Authorization Form", active: "active" }
        );
      }
    }
  }

  providerNameAuth: any;
  placementInfo: any;
  placementBeginDate: any;
  placementEndDate: any;

  getViewOnlyInforamtion() {
    let req = {};
    this.viewOnlyInformations = new placementAuthViewOnlyInfo();
    switch (this.moduleName) {
      case "livingArrangment":
        this.moduleViewName = "Living Arrangement";
        this.isVisibleDeleteAuthBtn = true;
        req = { livingArrangementID: this.selectedLivingArragementRecordId };
        console.log("Living arrangement req", req);
        this._opencard.getLivingArrangementById(req).then((data: any) => {
          this.viewOnlyInformations = data.livingArrangement[0];
          this.viewOnlyInformations.providerInfo =
            data.livingArrangement[0].providerName;
          if (this.isNewPage) {
            this.procode = this.viewOnlyInformations.procodeName;
            this.payorName = this.viewOnlyInformations.payorName;
            this.providerNameAuth = this.viewOnlyInformations["providerName"];
            this.sponsorName = this.viewOnlyInformations.sponsorName;
            this.placementAuth.beginDate = new Date(
              new Date().setHours(0, 0, 0, 0)
            );
            this.placementAuth.endDate = new Date(
              new Date().setHours(0, 0, 0, 0)
            );
          }
        });
        break;

      case "placementEvent":
      case "authorization":
        this.moduleViewName = "Placement Event";
        this.isVisibleDeleteAuthBtn = false;
        let loader = this.loaderDeclaration();
        loader.style.display = "block";
        let placementDetailReq = {
          placementDetailID: this.currentPlacementDetailID,
        };
        this._placement
          .getPlacementDetailInfo(placementDetailReq)
          .then((data: any) => {
            this.placementBeginDate = data.placementDetail.beginDate;
            this.placementEndDate = data.placementDetail.endDate;
            loader.style.display = "none";
            if (this.isNewPage) {
              this.placementAuth = new PlacementAuthTemp();
              this.placementAuth["paySponsor"] = this._localValues
                .currentPlacementProviderInfo
                ? this._localValues.currentPlacementProviderInfo.paySponsor
                : "";
              this.placementAuth["beginDate"] = !isNullOrUndefined(
                data.placementDetail.beginDate
              )
                ? new Date(data.placementDetail.beginDate)
                : null;
              this.placementAuth["endDate"] = !isNullOrUndefined(
                data.placementDetail.endDate
              )
                ? new Date(data.placementDetail.endDate)
                : null;
            }
            this.placementInfo = data;
            this.placementAuth.unitTypeID = {
              unitTypeID: 1,
              unitType: "Daily",
            };
            this.placementAuth.payorID = {
              fullPayor:
                "Saint Francis Reintegration - West Region - RFCA Region 3",
              payorID: 142,
            };
            if (data.placementDetail.payorID) {
              this.placementAuth.payorID = {
                payorID: data.placementDetail.payorID.payorID,
                fullPayor: data.placementDetail.payorID.payorName,
              };
            }
            this.procode = data.placementDetail.procodeID
              ? `${data.placementDetail.procodeID.procode} ${data.placementDetail.procodeID.categoryOfService}`
              : null;
            this.payorName = data.placementDetail.payorID
              ? data.placementDetail.payorID.payorName
              : null;
            this.providerNameAuth = data.placementDetail.providerID
              ? data.placementDetail.providerID.providerName
              : null;
            if (this._localValues.currentPlacementProviderLocation) {
              this.providerNameAuth =
                this.providerNameAuth +
                " Address: " +
                this._localValues.currentPlacementProviderLocation;
            }
            this.sponsorName = data.placementDetail.sponsorID
              ? data.placementDetail.sponsorID.sponsorName
              : null;
            this.placementAuth.authorizationStatusID = {
              authorizationStatus: "Active",
              authorizationStatusID: 3,
            };
            this.viewOnlyInformations = {
              beginDate: data.placementDetail.beginDate,
              endDate: data.placementDetail.endDate,
              procodeName: data.placementDetail.procodeID
                ? data.placementDetail.procodeID.procode
                : null,
              payorName: data.placementDetail.payorID
                ? data.placementDetail.payorID.payorName
                : null,
              providerInfo: data.placementDetail.providerID
                ? data.placementDetail.providerID.providerName
                : null,
              sponsorName: data.placementDetail.sponsorID
                ? data.placementDetail.sponsorID
                : null,
            };
          });
        break;
    }
  }

  /**Show the time value in Local format */
  showDateAndTime(timeStampValue: number) {
    return this._localValues.getDateandTimeWithExt(timeStampValue);
  }

  formValidation() {
    this.placementAuthForm = this._fb.group({
      authorizationStatusID: [null],
      unitsAuth: [null, Validators.compose([null, Validators.required])],
      unitsPaidByPlacement: [null],
      unitsRemaining: [null],
      payorRate: [null],
      providerRate: [null],
      beginDate: [null],
      endDate: [null],
      notes: [null],
      frequency: [null],
      addInfo: [null],
      payorID: [null],
      holdBedPayorID: [null],
      overrideExistingAuth: [null],
      isPayPlacement: [null],
      paySponsor: [null],
      dateOverride: [null],
      holdBedUnits: [null],
      unitType: [null],
    });
  }

  /**Auto fill fields based on units
   * Units paid by placement
   * Units remaining
   * For authorization exception also
   */
  onChangeAuthoInfoUnits() {
    this.placementAuth.unitsPaidByPlacement = this.placementAuth.unitsAuth;
    this.authExcep.exceptionPayorRate = this.placementAuth.payorRate;
    this.authExcep.exceptionProviderRate = this.placementAuth.providerRate;
    var date = new Date(this.placementAuth.beginDate);
    this.placementAuth.endDate = new Date(
      date.setDate(date.getDate() + parseInt(this.placementAuth.unitsAuth))
    );
    this.unitsRemainingCalculation();
  }

  validateEndDate() {
    var beginDate = new Date(
      new Date(this.placementAuth.beginDate).setHours(0, 0, 0, 0)
    );
    var endDate = new Date(
      new Date(this.placementAuth.endDate).setHours(0, 0, 0, 0)
    );
    var Difference_In_Time = endDate.getTime() - beginDate.getTime();
    var Difference_In_Days = (
      Difference_In_Time /
      (1000 * 3600 * 24)
    ).toString();
    var calcUnits = Difference_In_Days.split(".");
    if (this.placementAuth.beginDate && this.placementAuth.endDate) {
      this.placementAuth.unitsAuth = parseInt(calcUnits[0]).toFixed(2);
    }
    this.unitsRemaining = this.placementAuth.unitsAuth;
  }

  validateDates() {
    if (this.placementBeginDate) {
      if (
        new Date(this.placementBeginDate).getTime() <=
          new Date(this.placementAuth.beginDate).getTime() &&
        new Date(this.placementBeginDate).getTime() <=
          new Date(this.placementAuth.endDate).getTime()
      ) {
        if (this.placementEndDate) {
          if (
            new Date(this.placementEndDate).getTime() >=
              new Date(this.placementAuth.beginDate).getTime() &&
            new Date(this.placementEndDate).getTime() >=
              new Date(this.placementAuth.endDate).getTime()
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  formAction() {
    if (!this.validateDates()) {
      swal("Info", "Please fill the valid begin and end dates", "info");
    } else {
      if (this.placementAuthForm.valid) {
        if (this.unitsRemaining < 0) {
          return (this.showUnitRemaingLowInfo = true);
        } else {
          this.formAPICalls();
        }
      } else {
        swal("Info", "Please fill the mandatory fields", "info");
      }
    }
  }

  getPlacementEventAuthReq(request): any {
    request.authorization["unitsRemaining"] = this.unitsRemaining;
    request.authorization["holdBedPayorID"] = null;
    request.authorization["holdBedUnits"] = null;
    request.authorization["placementDetailID"] = this.currentPlacementDetailID;
    request.authorization["livingArrangementID"] = null;
    return request;
  }

  getMetaData(event: any, label: string) {
    let req = { value: event.query };
    switch (label) {
      case "payor":
        req["Object"] = "payor";
        break;
      case "authorizationStatus":
        req["Object"] = "authorizationStatus";
        break;
      case "staff":
        req["Object"] = "staff";
        break;
      case "authorizationExceptionReason":
        req["Object"] = "authorizationExceptionReason";
        break;
    }
    this._caseTeam.getSearchList(req).then((data: any) => {
      if (label === "payor") {
        data.dropDown.filter(
          (item: any) =>
            (item["fullPayor"] = `${item.payorName} - ${item.alias}`)
        );
      }
      if (label === "staff") {
        data.dropDown.filter(
          (item: any) =>
            (item["fullName"] = `${item.lastName} - ${item.firstName}`)
        );
      }
      this.metaData = data.dropDown;
    });
  }

  /**call this function in detai mode */
  getClaimsBasedOnAuthorization() {}
  pay_name: any;
  pay: any;
  payorName: any;
  sponsorName: any;
  procode: any;
  placementDetailIdReportsAll: any;
  clientName: any;
  getRecById() {
    /**Replace with actual authorization id */
    this.isPlacementDateValidationOpen = false;
    const loader = this.loaderDeclaration();
    loader.style.display = "block";
    this.authorizationIDFormLocalstorage =
      parseInt(localStorage.getItem("authorizationId")) -
      this._opencard.getHasKey();
    this.req = {
      authorizationID:
        this.currentAuthorizationID || this.authorizationIDFormLocalstorage,
    };
    this._opencard.getAuthById(this.req).then((data: any) => {
      this.clientName = data.authorization.clientID.clientNameLastFirst;
      this.actualUnit = data.authorization.unitsAuth;
      this.actualUnitRemaning = data.authorization.unitsRemaining;
      this.unitsRemaining = data.authorization.unitsRemaining;
      this.placementAuth = data.authorization;
      this.placementAuth.beginDate = this.placementAuth.beginDate
        ? new Date(this.placementAuth.beginDate)
        : null;
      this.placementAuth.endDate = this.placementAuth.endDate
        ? new Date(this.placementAuth.endDate)
        : null;
      this.isEdit = true;
      this.formLog(data);
      this.isAttachmentRequired = true;
      loader.style.display = "none";
      this.placementAuthForm.disable();
      localStorage.setItem(
        "clientId",
        data.authorization.clientID.clientID + this._opencard.getHasKey()
      );
      this.claimList = data.claimID;
      if (data.authorization.payorID === null) {
        this.payorName = "";
      } else {
        this.payorName = data.authorization.payorID.payorName;
      }
      if (
        this._router.url === "/reintegration/payee/Auth-detail" ||
        this._router.url ===
          "/reintegration/payee/serviceClaim_hardgoods/Auth-detail" ||
        this._router.url ===
          "/reintegration/payee/serviceClaim_otherService/Auth-detail" ||
        this._router.url === "/cs_payee_claim/payee/Auth-detail"
      ) {
        this.isPayeeCard = false;
      } else {
        this.isPayeeCard = true;
      }
      if (data.authorization.sponsorID) {
        this.sponsorName = data.authorization.sponsorID.sponsorName;
      } else {
        this.sponsorName = "";
      }
      this.procode =
        data.authorization.procodeID.procode +
        " - " +
        data.authorization.procodeID.categoryOfService;
      if (data.authorization.payeeID === null) {
        this.pay = "provider";
        this.pay_name = data.authorization.providerID.providerName;
        localStorage.setItem(
          "providerID",
          data.authorization.providerID.providerID + this._opencard.getHasKey()
        );
        this.showHeader = true;
      } else if (data.authorization.providerID === null) {
        this.pay = "Payee";
        this.pay_name = data.authorization.payeeID.payeeName;
        this.showHeader = true;
      }
      this.placementAuth.frequency = data.authorization.frequency;
      this.placementAuth.addInfo = data.authorization.addInfo;

      this.placementAuth.payorID = !isNullOrUndefined(
        data.authorization.payorID
      )
        ? {
            payorID: data.authorization.payorID.payorID,
            fullPayor: `${data.authorization.payorID.payorName} - ${data.authorization.payorID.alias}`,
          }
        : null;
      this.placementAuth.holdBedPayorID = !isNullOrUndefined(
        data.authorization.holdBedPayorID
      )
        ? {
            payorID: data.authorization.holdBedPayorID.payorID,
            fullPayor: `${data.authorization.holdBedPayorID.payorName} - ${data.authorization.holdBedPayorID.alias}`,
          }
        : null;
      if (data.authorizationExceptionID.length > 0) {
        this.authExcep = data.authorizationExceptionID[0];
        if (
          data.authorizationExceptionID.length > 0 &&
          this.authExcep.approvedBy_StaffID !== null
        ) {
          this.authExcep.approvedBy_StaffID = {
            staffID:
              data.authorizationExceptionID[0].approvedBy_StaffID.staffID,
            fullName: `${data.authorizationExceptionID[0].approvedBy_StaffID.lastName} - ${data.authorizationExceptionID[0].approvedBy_StaffID.firstName}`,
          };
        }
      }
    });
    this.selectedAuthorizationID = this.currentAuthorizationID;
  }

  getAuthExceptionValues() {
    this.isAuthExcepFormOpen = false;
  }

  /** Overiding existing authorizations list based on placement detail id */
  getOverridingExisingAuthorizationsList() {
    let req = { placementDetailID: this.currentPlacementDetailID };
    // let req = { placementDetailID: 166952 };
    if (this.currentPlacementDetailID) {
      this._opencard
        .getOverridingExistingAuthorizationList(req)
        .then((data: any) => {
          this.existingAuthorizationsList = data.authList;
        });
    }
  }

  filteredExistingAuthList(event: any) {
    this.filteredExistAuthList = [];
    this.existingAuthorizationsList.filter((item: any) => {
      if (item.authorizationID.toString().indexOf(event.query) !== -1) {
        this.filteredExistAuthList.push(item);
      }
    });
  }

  onSelectExistingAuthorization(selectedAuth: any) {
    const loader = this.loaderDeclaration();
    loader.style.display = "block";
    this.currentAuthorizationID = selectedAuth.authorizationID;
    this.getExistingAuthData(selectedAuth.authorizationID);
    this.isOverrideAuthorization = true;
    loader.style.display = "none";

    // let req = {
    //   existing_authorizationID: this.placementAuth.overrideExistingAuth
    //     .authorizationID,
    //   deletedBy: "",
    //   deletedDate: Date.now(),
    // };
    // this._opencard.deleteExistingAuthorizaion(req).then((data: any) => {
    //   if (data.responseStatus) {
    //     swal("Info", "Record has been removed successfully!", "success");
    //   }
    //   loader.style.display = "none";
    // });
  }

  editForm() {
    this.placementAuthForm.enable();
    this.defaultReadonlyFields();
    this.isEdit = false;
  }

  /**Attachment docs navigations */
  navigateTo() {
    let currentURL: string = this._router.url,
      navigateURL: string;

    let placementAuthorizationUrl =
      "/reintegration/referral/placement-authorizations/detail";
    let placementEventUrl =
      "/reintegration/referral/placement-event-authorizations/detail";

    if (currentURL.includes(placementAuthorizationUrl)) {
      navigateURL = "/reports/attachment-document/placement-auth-attachment";
    }
    if (currentURL.includes(placementEventUrl)) {
      navigateURL = "/reports/attachment-document/placement-auth-attachment";
    }
    return this._router.navigate([navigateURL], {
      queryParamsHandling: "preserve",
    });
  }

  /**Showing time based on local browser time */
  showTime(timeStamp: number) {
    return this._localValues.getDateandTimeWithExt(timeStamp);
  }

  // getLabelByModuleName(): string {
  //   switch (this.moduleName) {
  //     case 'livingArrangment':
  //       return 'Living Arrangement';

  //     case 'placementEvent':
  //       return 'Placement Event';
  //   }
  // }

  deletedAuthorization() {
    let authReq = {
        livingArrangementID: this.selectedLivingArragementRecordId,
      },
      deleteAuthReq = {
        existing_authorizationID: this.currentAuthorizationID,
        deletedBy: this.userName || "Admin",
        deletedDate: Date.now(),
      };
    /**Check for the length of authorization */
    this._opencard
      .getLivingArrangementAuthorizations(authReq)
      .then((data: any) => {
        if (data.authorizationList.length <= 1) {
          swal(
            "Not able to delete!",
            "This authorization cannot be deleted because it is the only authorization. If this authorization needs deleted it should be overwritten during the creation of a new authorization",
            "info"
          );
          return (this.isDeleteBtnDisable = true);
        } else {
          this.isDeleteBtnDisable = false;
          swal(
            "Delete Authorization!",
            "This will delete this" +
              this.moduleViewName +
              "Authorization. If there are any claims the authorization will be emailed to Contact service to Handle. Are you sure you want to continue with delete ?",
            "info"
          ).then((value) => {
            if (value) {
              this._opencard
                .deleteExistingAuthorizaion(deleteAuthReq)
                .then((data: any) => {
                  if (data.responseStatus) {
                    this._router.navigate(["/placement-psa"], {
                      queryParams: { action: "delete" },
                      queryParamsHandling: "merge",
                    });
                  }
                });
            } else {
              return;
            }
          });
          /** Form open psa(void)- provider envelope */
          /** Return to placement auth detail, show delete confirmation */
          /** Return form */
        }
      });
  }
  navigateToClaim() {
    this._router.navigate([this.climlistURL]);
  }
  navigateTo_Claim() {
    if (
      this._router.url ===
      "/reintegration/provider/providerAuthorization_detail"
    ) {
      this._router.navigate(["/provider_Authorization_claim"]);
    } else if (
      this._router.url === "/reintegration/payee/payeeAuthorization_detail"
    ) {
      this._router.navigate(["/payee_Authorization_claim"]);
    } else {
      this._router.navigate(
        ["/reintegration/referral/placement-authorizations/claims"],
        {
          queryParamsHandling: "merge",
        }
      );
    }
  }
  viewClientInfo() {
    this._router.navigate(["/csPayeeAuthInfoClient"]);
  }
  gotoAuthClaimdetail(claimData) {
    localStorage.setItem(
      "claimID",
      claimData.claimID + this._opencard.getHasKey()
    );
    this._router.navigate(["/CSpayee/payeeform/authClaim/details"]);
  }
  beginDateChange() {
    // this.placementAuth.beginDate.setHours(0);
    // this.placementAuth.beginDate.setMinutes(0);
    // this.placementAuth.beginDate.setSeconds(0);
    if (
      this.placementAuth.beginDate &&
      this.placementAuth.beginDate.getHours() === 12 &&
      this.placementAuth.beginDate.getMinutes() === 0 &&
      this.placementAuth.beginDate.getSeconds() === 0
    ) {
      this.placementAuth.beginDate.setHours(0);
      this.placementAuth.beginDate.setMinutes(0);
      this.placementAuth.beginDate.setSeconds(0);
    }
  }

  async endDateChange() {
    this.placementAuth.endDate.setHours(0);
    this.placementAuth.endDate.setMinutes(0);
    this.placementAuth.endDate.setSeconds(0);
    await this.unitsCalculationFromEndDate();
    this.unitsRemainingCalculation();
  }

  /**
   * API calls for save and update
   */
  public formAPICalls() {
    this.showUnitRemaingLowInfo = false;
    const loader = this.loaderDeclaration();
    loader.style.display = "block";
    this.placementAuth.placementDetailID = this.currentPlacementDetailID;
    this.placementAuth.beginDate = !isNullOrUndefined(
      this.placementAuth.beginDate
    )
      ? this._localValues.stringFormatDatetime(this.placementAuth.beginDate)
      : null;
    this.placementAuth.endDate = !isNullOrUndefined(this.placementAuth.endDate)
      ? this._localValues.stringFormatDatetime(this.placementAuth.endDate)
      : null;
    this.placementAuth.authorizationStatusID = !isNullOrUndefined(
      this.placementAuth.authorizationStatusID
    )
      ? this.placementAuth.authorizationStatusID.authorizationStatusID
      : null;
    this.placementAuth.holdBedPayorID = !isNullOrUndefined(
      this.placementAuth.holdBedPayorID
    )
      ? this.placementAuth.holdBedPayorID.payorID
      : null;
    this.placementAuth.payorID = !isNullOrUndefined(this.placementAuth.payorID)
      ? this.placementAuth.payorID.payorID
      : 0;
    this.placementAuth.providerRate = !isNullOrUndefined(
      this.placementAuth.providerRate
    )
      ? this.placementAuth.providerRate
      : 0;
    this.placementAuth.payorRate = !isNullOrUndefined(
      this.placementAuth.payorRate
    )
      ? this.placementAuth.payorRate
      : 0;
    this.placementAuth.livingArrangementID =
      this.selectedLivingArragementRecordId;
    this.authExcep.approvedBy_StaffID = !isNullOrUndefined(
      this.authExcep.approvedBy_StaffID
    )
      ? this.authExcep.approvedBy_StaffID.staffID
      : null;
    this.authExcep.authorizationExceptionReasonID = !isNullOrUndefined(
      this.authExcep.authorizationExceptionReasonID
    )
      ? this.authExcep.authorizationExceptionReasonID
          .authorizationExceptionReasonID
      : null;
    this.placementAuth.authorizationExceptionID = [this.authExcep];
    this.placementAuth.unitTypeID = 1;
    /***************************** Testing purpose ************************************************/
    this.placementAuth.unitsRemaining = this.unitsRemaining;
    /********************************************************************************************* */
    this.placementAuth.clientID =
      parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey();
    this.placementAuth.referralID =
      parseInt(localStorage.getItem("referralId")) - this._opencard.getHasKey();

    let req = { authorization: this.placementAuth };
    if (this.placementAuth.authorizationID && !this.isOverrideAuthorization) {
      if (this.moduleName == "authorization") {
        let request = this.getPlacementEventAuthReq(req);
        request.authorization["authorizationID"] =
          this.currentAuthorizationID || this.authorizationIDFormLocalstorage;

        request.authorization["placementDetailID"] =
          this.currentPlacementDetailID;
        if (this.navigationOrigin === "cards") {
          request.authorization["placementDetailID"] = this
            .placementDetailIdReportsAll
            ? this.placementDetailIdReportsAll
            : null;
        }
        this._opencard
          .placementEventAuthorizationUpdate(request)
          .then((data: any) => {
            if (data.responseStatus) {
              // let label = this.getLabelByModuleName()
              let successMessage = "Authorization has been updated!";
              swal("Success", successMessage, "success");
              if (data.authorizationID) {
                localStorage.setItem(
                  "authorizationId",
                  data.authorizationID + this._opencard.getHasKey()
                );
              }
              loader.style.display = "none";
              return this._router.navigate(["/placement-psa"], {
                queryParamsHandling: "preserve",
              });
            }
          });
      } else {
        this._opencard.placementAuthorizationUpdate(req).then((data: any) => {
          if (data.responseStatus) {
            // let label = this.getLabelByModuleName()
            let successMessage = "Authorization has been updated!";
            swal("Success", successMessage, "success");
            if (data.authorizationID) {
              localStorage.setItem(
                "authorizationId",
                data.authorizationID + this._opencard.getHasKey()
              );
            }
            return this._router.navigate(["/placement-psa"], {
              queryParamsHandling: "preserve",
            });
          }
          loader.style.display = "none";
        });
      }
    } else {
      if (this.moduleName == "authorization") {
        if (this.isOverrideAuthorization) {
          this.isOverrideAuthorizationDeleteConfirmation = true;
        } else {
          this.placementAuthorizationSave(req);
        }
        loader.style.display = "none";
      } else {
        if (this.isOverrideAuthorization) {
          this.isOverrideAuthorizationDeleteConfirmation = true;
        } else {
          this.placementAuthorizationSave(req);
        }
      }
    }
  }

  public async unitsRemainingCalculation() {
    let claimsListRequest = {
      authorizationID: this.currentAuthorizationID,
      beginPagination: 1,
      endPagination: 100,
    };
    let claimsRecordCount = await this._opencard.getClaimsAuthById(
      claimsListRequest
    );
    if (
      claimsRecordCount.totalCount === 0 ||
      this._router.url.includes("/new")
    ) {
      this.unitsRemaining = this.placementAuth.unitsAuth;
    } else {
      if (
        this.placementAuth.unitsAuth > this.actualUnit ||
        this.placementAuth.unitsAuth < this.actualUnit
      ) {
        let acutalDifference = this.actualUnit - this.placementAuth.unitsAuth;
        this.unitsRemaining = this.actualUnitRemaning - acutalDifference;
      } else {
        this.unitsRemaining = this.actualUnitRemaning;
      }
    }
  }

  public async defaultReadonlyFields() {
    let claimsListRequest = {
      authorizationID: this.currentAuthorizationID,
      beginPagination: 1,
      endPagination: 100,
    };
    let claimsRecordCount = await this._opencard.getClaimsAuthById(
      claimsListRequest
    );
    if (claimsRecordCount.totalCount > 0) {
      this.placementAuthForm.controls["beginDate"].disable();
      this.placementAuthForm.controls["endDate"].disable();
      this.placementAuthForm.controls["payorRate"].disable();
      this.placementAuthForm.controls["providerRate"].disable();
      this.placementAuthForm.controls["unitType"].disable();
      this.placementAuthForm.controls["payorID"].disable();
      this.placementAuthForm.controls["unitsRemaining"].disable();
    } else {
      this.placementAuthForm.controls["beginDate"].enable();
      this.placementAuthForm.controls["endDate"].enable();
      this.placementAuthForm.controls["payorRate"].enable();
      this.placementAuthForm.controls["providerRate"].enable();
      this.placementAuthForm.controls["unitType"].enable();
      this.placementAuthForm.controls["unitsRemaining"].disable();
    }
  }

  public onChangeAuthorizationStatus(status: any) {
    return status;
  }

  public getExisitingAuthorizationForLivingArrangement() {
    let req = { livingArrangementID: this.selectedLivingArragementRecordId };
    // let req = { livingArrangementID: 53786 };
    if (this.currentPlacementDetailID) {
      this._opencard
        .getOverridingExistingAuthorizationList(req)
        .then((data: any) => {
          this.existingAuthorizationsList = data.authList;
        });
    }
  }

  public getExistingAuthorizationList() {
    if (this._router.url.includes("placement-event-authorizations")) {
      return this.getOverridingExisingAuthorizationsList();
    } else if (this._router.url.includes("module=livingArrangment")) {
      return this.getExisitingAuthorizationForLivingArrangement();
    } else {
      return;
    }
  }

  public getExistingAuthData(selectedAuthID: number) {
    let request = { authorizationID: selectedAuthID };
    this._opencard.getAuthById(request).then((data: any) => {
      this.actualUnit = data.authorization.unitsAuth;
      this.actualUnitRemaning = data.authorization.unitsRemaining;
      this.unitsRemaining = data.authorization.unitsRemaining;
      this.placementAuth = data.authorization;
      this.placementAuth.beginDate = this.placementAuth.beginDate
        ? new Date(this.placementAuth.beginDate)
        : null;
      this.placementAuth.endDate = this.placementAuth.endDate
        ? new Date(this.placementAuth.endDate)
        : null;
      // this.isEdit = true;
      this.formLog(data);
      this.isAttachmentRequired = true;
      // this.placementAuthForm.disable();
      localStorage.setItem(
        "clientId",
        data.authorization.clientID.clientID + this._opencard.getHasKey()
      );
      this.claimList = data.claimID;
      if (data.authorization.payorID === null) {
        this.payorName = "";
      } else {
        this.payorName = data.authorization.payorID.payorName;
      }
      if (
        this._router.url === "/reintegration/payee/Auth-detail" ||
        this._router.url ===
          "/reintegration/payee/serviceClaim_hardgoods/Auth-detail" ||
        this._router.url ===
          "/reintegration/payee/serviceClaim_otherService/Auth-detail" ||
        this._router.url === "/cs_payee_claim/payee/Auth-detail"
      ) {
        this.isPayeeCard = false;
      } else {
        this.isPayeeCard = true;
      }
      if (data.authorization.sponsorID) {
        this.sponsorName = data.authorization.sponsorID.sponsorName;
      } else {
        this.sponsorName = "";
      }
      this.procode =
        data.authorization.procodeID.procode +
        " - " +
        data.authorization.procodeID.categoryOfService;
      if (data.authorization.payeeID === null) {
        this.pay = "provider";
        this.pay_name = data.authorization.providerID.providerName;
      } else if (data.authorization.providerID === null) {
        this.pay = "Payee";
        this.pay_name = data.authorization.payeeID.payeeName;
      }
      this.placementAuth.frequency = data.authorization.frequency;
      this.placementAuth.addInfo = data.authorization.addInfo;

      this.placementAuth.payorID = !isNullOrUndefined(
        data.authorization.payorID
      )
        ? {
            payorID: data.authorization.payorID.payorID,
            fullPayor: `${data.authorization.payorID.payorName} - ${data.authorization.payorID.alias}`,
          }
        : null;
      this.placementAuth.holdBedPayorID = !isNullOrUndefined(
        data.authorization.holdBedPayorID
      )
        ? {
            payorID: data.authorization.holdBedPayorID.payorID,
            fullPayor: `${data.authorization.holdBedPayorID.payorName} - ${data.authorization.holdBedPayorID.alias}`,
          }
        : null;
      if (data.authorizationExceptionID.length > 0) {
        this.authExcep = data.authorizationExceptionID[0];
        if (
          data.authorizationExceptionID.length > 0 &&
          this.authExcep.approvedBy_StaffID !== null
        ) {
          this.authExcep.approvedBy_StaffID = {
            staffID:
              data.authorizationExceptionID[0].approvedBy_StaffID.staffID,
            fullName: `${data.authorizationExceptionID[0].approvedBy_StaffID.lastName} - ${data.authorizationExceptionID[0].approvedBy_StaffID.firstName}`,
          };
        }
      }
    });
    this.selectedAuthorizationID = this.currentAuthorizationID;
  }

  public async placementAuthorizationSave(req: any) {
    const loader = this.loaderDeclaration();
    loader.style.display = "block";
    let response: any;
    if (this.subModule === "placement-event") {
      response = await this._opencard.placementEventAuthorizationUpdate(req);
    } else {
      response = await this._opencard.placementAuthorizationSave(req);
    }
    if (response.responseStatus) {
      localStorage.setItem(
        "authorizationId",
        response.authorizationID + this._opencard.getHasKey()
      );

      let successMessage = "Authorization has been created!";
      swal("Success", successMessage, "success");
      loader.style.display = "none";
      return this._router.navigate(["/placement-psa"], {
        queryParamsHandling: "preserve",
      });
    }
  }

  public loaderDeclaration() {
    const loader = document.getElementById("loading-overlay");
    return loader;
  }

  public async onClickOverrideAuthConfirmationYes() {
    await this.generateVoidACKPSPDFKitForm();
    await this.deleteOverrideAuthorization();
    delete this.placementAuth.authorizationID;
    this.placementAuth.unitsRemaining = this.placementAuth.unitsAuth;
    let req = { authorization: this.placementAuth };
    this.placementAuthorizationSave(req);
  }

  public async deleteOverrideAuthorization() {
    let deleteRequest = {
      authorizationID: this.currentAuthorizationID,
      isOverrideAuthorization: true,
    };
    await this._opencard.deleteExistingAuthorization(deleteRequest);
  }

  public async generateVoidACKPSPDFKitForm() {
    let voidRequest = {
      staffID: parseInt(localStorage.getItem("UserId")) || 4620,
      form: "ProviderServiceAgreementVoid",
      authorizationID: this.currentAuthorizationID,
    };
    let voidDocID = await this._opencard.getPSDPDFKITVoidForm(voidRequest);
    return window.open(`${environment.uri}:8081/loadDocument/${voidDocID}`);
  }

  public formLog(data: any) {
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
  }

  public async unitsCalculationFromEndDate() {
    let claimsListRequest = {
      authorizationID: this.currentAuthorizationID,
      beginPagination: 1,
      endPagination: 100,
    };
    let claimsRecordCount = await this._opencard.getClaimsAuthById(
      claimsListRequest
    );

    if (
      claimsRecordCount.totalCount === 0 ||
      this._router.url.includes("/new")
    ) {
      this.placementAuth.unitsAuth = moment(this.placementAuth.endDate).diff(
        this.placementAuth.beginDate,
        "days"
      );
    }
  }

  public onSelectAuthorizationStatus(selectedStatus: any) {
    if (selectedStatus.authorizationStatusID) {
      this.placementAuthForm.controls["unitsAuth"].enable();
    }
  }

  public placementDateValidationCheck() {
    let referralTypeID =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._opencard.getHasKey();
    let validationResult = false;
    if (
      referralTypeID !== 11 &&
      referralTypeID !== 12 &&
      referralTypeID !== 16
    ) {
      // Call the validation check
      this.isPlacementDateValidationOpen = true;
    } else {
      // Not call the validation check
      this.isPlacementDateValidationOpen = false;
    }
    return validationResult;
  }
}
