import { Component, OnInit } from "@angular/core";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { AuthorizationForm } from "./authorization-claim";
import { CaseTeamService } from "../case-team/case-team.service";
import { TeamFormService } from "../team-form/team-form.service";
import { LocalValues } from "../local-values";
import swal from "sweetalert2";
import * as moment from "moment";
import { Router, ActivatedRoute } from "@angular/router";
import { isNullOrUndefined } from "util";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-authorization-claim",
  templateUrl: "./authorization-claim.component.html",
  styleUrls: ["./authorization-claim.component.scss"],
})
export class AuthorizationClaimComponent implements OnInit {
  pay_claim_Name: any;
  claimProviderRate: any;
  claimPayorRate: any;
  isProvider = false;
  isPayee = false;

  constructor(
    public _route: ActivatedRoute,
    public _openCards: OpencardsService,
    public _team: TeamFormService,
    public _router: Router,
    public _localValues: LocalValues,
    public _opencard: OpencardsService,
    public _caseTeam: CaseTeamService
  ) { }
  authFormDetail: AuthorizationForm = new AuthorizationForm();
  requestedBy_StaffID: any;
  requestedBy_Staff: any;
  breadcrumbs = [];
  payment: any;
  isDetail = false;
  isAttachmentRequired = false;
  isUpdate = false;
  payemntTypeDisable = true;
  selectedPay: any = [];
  claimID = null;
  isFormLog = false;
  isNotFCHWeb = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };

  procode: any;
  address: any;
  chck_state: any;

  currentSponsorID: number;
  claimProviderLabel: string;
  ngOnInit() {
    this.requestedBy_StaffID = parseInt(localStorage.getItem("UserId")) || 4620;
    this.payment = {
      paymentTypeID: 1,
      isPayee: true,
      isProvider: true,
      paymentType: "Accounts Payable",
    };

    this.isAttachmentRequired = true;
    const staffId = parseInt(localStorage.getItem("UserId")) || 4620;
    this._team.getUserById({ staffID: staffId }).then((data) => {
      data.users["fullName"] =
        data.users.firstName +
        " " +
        data.users.lastName +
        " ( " +
        data.users.email +
        " )";
      this.requestedBy_Staff = data.users;
    });
    if (this._router.url.includes("/auth-claim/details?origin=cards")) {
      this.getAuthDetails();
      this.isDetail = true;
      this.isUpdate = true;
      this.breadcrumbs.push(
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        {
          label: "Authorizations",
          href: "/reports/all/authorizations",
          active: "",
        },
        {
          label: "Authorization Form",
          href: "/reintegration/referral/placement-event-authorizations/detail",
          active: "",
        },
        {
          label: "Claims List",
          href: "/reintegration/referral/placement-authorizations/claims",
          active: "",
        },
        { label: "Claims", active: "active" }
      );
    } else if (this._router.url.includes("/auth-claim/details?clientId")) {
      this.getAuthDetails();
      this.isDetail = true;
      this.isUpdate = true;
      this.breadcrumbs.push(
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        {
          label: "Authorizations",
          href: "/reports/all/authorizations",
          active: "",
        },
        {
          label: "Authorization Form",
          href: "/reintegration/referral/placement-event-authorizations/detail",
          active: "",
        },
        {
          label: "Claims List",
          href: "/reintegration/referral/placement-authorizations/claims",
          active: "",
        },
        { label: "Claims", active: "active" }
      );
    } else if (this._router.url === "/cs/auth-claim/details") {
      this.getAuthDetails();

      this.isDetail = true;
      this.isUpdate = true;
      this.breadcrumbs.push(
        {
          label: "CS-Claim List",
          href: "/claims/list/cs-claim-list",
          active: "",
        },
        { label: "Claim Info", href: "/authinfo/claimList", active: "" },
        { label: "Claims", active: "active" }
      );
    } else if (this._router.url === "/cs/auth-claim/new") {
      this.getRecById();
      this.isDetail = false;
      this.payemntTypeDisable = false;
      this.isUpdate = false;
      this.breadcrumbs.push(
        {
          label: "CS-Claim List",
          href: "/claims/list/cs-claim-list",
          active: "",
        },
        { label: "Claim Info", href: "/authinfo/claimList", active: "" },
        { label: "Claims", active: "active" }
      );
    } else if (this._router.url === "/cs_claim_payee/auth/new") {
      this.getRecById();
      this.isDetail = false;
      this.payemntTypeDisable = false;
      this.isUpdate = false;
      this.breadcrumbs.push(
        {
          label: "CS-Claim Payee List",
          href: "/cs_claim_payee",
          active: "",
        },
        { label: "Claim Info", href: "/cs_claim_payee/claimDetail", active: "" },
        { label: "Claims", active: "active" }
      );
    } else if (this._router.url === "/cs_claim_payee/auth/detail") {
      this.getAuthDetails();

      this.isDetail = true;
      this.isUpdate = true;
      this.breadcrumbs.push(
        {
          label: "CS-Claim Payee List",
          href: "/cs_claim_payee",
          active: "",
        },
        { label: "Claim Info", href: "/cs_claim_payee/claimDetail", active: "" },
        { label: "Claims", active: "active" }
      );
    } else if ((this._router.url === "/otherService-direct/form/view")) {
      this.breadcrumbs.push(
        { label: "List", href: "/reports/client", active: "" },
        { label: "Form", href: "/reports/client/details", active: "" },
        {
          label: "Case",
          href: "/reports/opencards/list/client/case",
          active: "",
        },
        {
          label: "Service Claims List",
          href: "/claims/list/other/service/list",
          active: "",
        },
        {
          label: "Service Claims",
          href: "/reintegration/referral/service/other/service/detail",
          active: "",
        },
        {
          label: "Claim List",
          href: "/reintegration/referral/service/opencard/claim",
        },
        { label: "Claim Form", active: "active" }
      );
      this.getAuthDetails();

      this.isDetail = true;
      this.isUpdate = true;
    } else if (this._router.url.includes("/otherService-direct/form/view?clientId")) {
      this.breadcrumbs.push(
        { label: "List", href: "/reports/client", active: "" },
        { label: "Form", href: "/reports/client/details", active: "" },
        {
          label: "Case",
          href: "/reports/opencards/list/client/case",
          active: "",
        },
        {
          label: "Service Claims List",
          href: "/claims/list/other/service/list",
          active: "",
        },
        {
          label: "Service Claims",
          href: "/reintegration/referral/service/other/service/detail",
          active: "",
        },
        {
          label: "Claim List",
          href: "/reintegration/referral/service/opencard/claim",
        },
        { label: "Claim Form", active: "active" }
      );
      this.getAuthDetails();

      this.isDetail = true;
      this.isUpdate = true;
    } else if (this._router.url === "/otherService-direct/form/new") {
      this.breadcrumbs.push(
        { label: "List", href: "/reports/client", active: "" },
        { label: "Form", href: "/reports/client/details", active: "" },
        {
          label: "Case",
          href: "/reports/opencards/list/client/case",
          active: "",
        },
        {
          label: "Service Claims List",
          href: "/claims/list/other/service/list",
          active: "",
        },
        {
          label: "Service Claims",
          href: "/reintegration/referral/service/other/service/detail",
          active: "",
        },
        {
          label: "Claim List",
          href: "/reintegration/referral/service/opencard/claim",
        },
        { label: "Form", active: "active" }
      );
      this.isDetail = false;
      this.getRecById();
      this.isUpdate = false;
      this.claimStatus = { claimStatus: "Hold", claimStatusID: 2 };
      this.payemntTypeDisable = false;
    } else if (this._router.url.includes("sub=placement-event")) {
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
          acthrefive: "/reintegration/referral/opencard/placement/detail",
        },
        {
          label: "Placement Event List",
          active: "",
          href:
            "/reintegration/referral/opencard/placement/placementEvent/view",
        },
        {
          label: "Placement Event Form",
          active: "",
          href:
            "/reintegration/referral/opencard/placement/placementEvent/detail",
        },
        {
          label: "Authorization List",
          active: "",
          href: "/reintegration/referral/placement-event-authorizations/list",
        },
        {
          label: "Authorization Form",
          active: "",
          href: "/reintegration/referral/placement-event-authorizations/detail",
        },
        { label: "Form", active: "active" }
      );
      var claimId = localStorage.getItem("claimID");
      if (claimId === "null" || claimId === null) {
        this.isDetail = false;
        this.getRecById();
        this.isUpdate = false;
        this.claimStatus = { claimStatus: "Hold", claimStatusID: 2 };
        this.payemntTypeDisable = false;
      } else {
        this.getAuthDetails();
        this.isDetail = true;
        this.isUpdate = true;
      }
    } else if (this._router.url.includes("module=livingArrangment")) {
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
          acthrefive: "/reintegration/referral/opencard/placement/detail",
        },
        {
          label: "Living Arrangement List",
          active: "",
          href:
            "/reintegration/referral/opencard/placement/living-arrangement/view",
        },
        {
          label: "Living Arrangement Form",
          active: "",
          href:
            "/reintegration/referral/opencard/placement/living-arrangement/detail",
        },
        {
          label: "Authorization List",
          active: "",
          href: "/reintegration/referral/placement-authorizations/list",
        },
        {
          label: "Authorization Form",
          active: "",
          href: "/reintegration/referral/placement-authorizations/detail",
        },
        { label: "Form", active: "active" }
      );
      this.getAuthDetails();

      this.isDetail = true;
      this.isUpdate = true;
    } else if (this._router.url === "/payee/authClaim/details") {
      this.getAuthDetails();
      this.isDetail = true;
      this.isUpdate = true;
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
          href: "/reintegration/payee/Auth-detail",
          active: "",
        },
        {
          label: "Payee - Claim List",
          href: "/payee/auth_list/claim-list",
          active: "",
        },
        { label: "Payee - Claim Form", href: "", active: "active" },
      ];
    } else if (
      this._router.url === "/payee/serviceClaim_hardgoods/auth-claim/details"
    ) {
      this.getAuthDetails();
      this.isDetail = true;
      this.isUpdate = true;
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
          href: "/reintegration/payee/serviceClaim_hardgoods/Auth-detail",
          active: "",
        },
        {
          label: "Payee - (Service Claim - Hard Goods) Claim List",
          href: "payee/serviceClaim_hardgoods/auth_list/claim-list",
          active: "",
        },
        {
          label: "Payee - (Service Claim - Hard Goods) Claim Form",
          href: "",
          active: "active",
        },
      ];
    } else if (
      this._router.url === "/payee/serviceClaim_otherService/auth-claim/details"
    ) {
      this.getAuthDetails();
      this.isDetail = true;
      this.isUpdate = true;
      this.breadcrumbs = [
        { label: "Payee List", href: "/reports/payee/view", active: "" },
        { label: "Payee Form", href: "/reports/payee/detail", active: "" },
        {
          label: "Payee - Service Claim - Other Services",
          href: "/payee/serviceClaim_hardgoods/auth_list",
          active: "",
        },
        {
          label: "Payee - (Service Claim - Other Services) Authorizations Form",
          href: "/reintegration/payee/serviceClaim_otherService/Auth-detail",
          active: "",
        },
        {
          label: "Payee - (Service Claim - Other Services) Claim List",
          href: "payee/serviceClaim_otherService/auth_list/claim-list",
          active: "",
        },
        {
          label: "Payee - (Service Claim - Other Services) Claim Form",
          href: "",
          active: "active",
        },
      ];
    } else if (this._router.url === "/CSpayee/payeeform/authClaim/new") {
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        { label: "CS - Payee List", href: "/csPayee", active: "" },
        { label: "CS - Payee Form", href: "/csPayee/payeeform", active: "" },
        {
          label: "CS Payee - Authorization List",
          href: "/csPayee/payeeform/payee-AuthList",
          active: "",
        },
        {
          label: "CS Payee - Authorization Form",
          href: "/reintegration/cs-payee/csPayeeAuthDetail",
          active: "",
        },
        { label: "CS Payee - Claim Form", active: "active" },
      ];
      this.isDetail = false;
      this.getRecById();
      this.isUpdate = false;
      this.claimStatus = { claimStatus: "Hold", claimStatusID: 2 };
      this.payemntTypeDisable = false;
    } else if (this._router.url === "/provider/auth-claim_new") {
      this.breadcrumbs = [{ label: 'CS-Claim List', href: '/csClaimProvider', active: '' },
      { label: 'Provider Claim Info', active: '', href: '/provider/claimProvider_claimList' },
      { label: "Claim Form", active: "active" }];
      this.isDetail = false;
      this.getRecById();
      this.isUpdate = false;
      this.claimStatus = { claimStatus: "Hold", claimStatusID: 2 };
      this.payemntTypeDisable = false;
    } else if (
      this._router.url === "/provider/auth-claim_detail"
    ) {
      this.getAuthDetails();
      this.isDetail = true;
      this.isUpdate = true;
      this.breadcrumbs = [{ label: 'CS-Claim List', href: '/csClaimProvider', active: '' },
      { label: 'Provider Claim Info', active: '', href: '/provider/claimProvider_claimList' },
      { label: "Claim Form", active: "active" }];
    } else if (this._router.url === "/cs_claim_payee/auth/detail") {
      this.getAuthDetails();
      this.isDetail = true;
      this.isUpdate = true;
      this.breadcrumbs = [{ label: 'CS-Claim Payee List', href: '/cs_claim_payee', active: '' },
      { label: 'Payee Claim Info', href: '/cs_claim_payee/claimDetail', active: 'active' },
      { label: "Claim Form", active: "active" }];
    } else if (
      this._router.url === "/provider/provider_AuthorizationClaimNew"
    ) {
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        {
          label: "Provider Authorization",
          href: "/provider_Authorization",
          active: "",
        },
        {
          label: "Authorization Information",
          href: "/reintegration/provider/providerAuthorization_detail",
          active: "",
        },
        {
          label: "Claims List",
          href: "/provider_Authorization_claim",
          active: "",
        },
        { label: "Claim Form", active: "active" },
      ];
      this.isDetail = false;
      this.getRecById();
      this.isUpdate = false;
      this.claimStatus = { claimStatus: "Hold", claimStatusID: 2 };
      this.payemntTypeDisable = false;
    } else if (
      this._router.url === "/payee/payee_AuthorizationClaimNew"
    ) {
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        {
          label: "Payee Authorization",
          href: "/payee_Authorization",
          active: "",
        },
        {
          label: "Authorization Information",
          href: "/reintegration/payee/payeeAuthorization_detail",
          active: "",
        },
        {
          label: "Claims List",
          href: "/payee_Authorization_claim",
          active: "",
        },
        { label: "Claim Form", active: "active" },
      ];
      this.isDetail = false;
      this.getRecById();
      this.isUpdate = false;
      this.claimStatus = { claimStatus: "Hold", claimStatusID: 2 };
      this.payemntTypeDisable = false;
    } else if (this._router.url === "/CSpayee/payeeform/authClaim/details") {
      this.getAuthDetails();
      this.isDetail = true;
      this.isUpdate = true;
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        { label: "CS - Payee List", href: "/csPayee", active: "" },
        { label: "CS - Payee Form", href: "/csPayee/payeeform", active: "" },
        {
          label: "CS Payee - Authorization List",
          href: "/csPayee/payeeform/payee-AuthList",
          active: "",
        },
        {
          label: "CS Payee - Authorization Form",
          href: "/reintegration/cs-payee/csPayeeAuthDetail",
          active: "",
        },
        { label: "CS Payee - Claim Form", active: "active" },
      ];
    } else if (this._router.url === "/provider/provider_AuthorizationClaim") {
      this.getAuthDetails();
      this.isDetail = true;
      this.isUpdate = true;
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        {
          label: "Provider Authorization",
          href: "/provider_Authorization",
          active: "",
        },
        {
          label: "Authorization Information",
          href: "/reintegration/provider/providerAuthorization_detail",
          active: "",
        },
        {
          label: "Claims List",
          href: "/provider_Authorization_claim",
          active: "",
        },
        { label: "Claim Form", active: "active" },
      ];
    } else if (this._router.url === "/payee/payee_AuthorizationClaim") {
      this.getAuthDetails();
      this.isDetail = true;
      this.isUpdate = true;
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        {
          label: "Payee Authorization",
          href: "/payee_Authorization",
          active: "",
        },
        {
          label: "Authorization Information",
          href: "/reintegration/provider/providerAuthorization_detail",
          active: "",
        },
        {
          label: "Claims List",
          href: "/payee_Authorization_claim",
          active: "",
        },
        { label: "Claim Form", active: "active" },
      ];
    } else if (
      this._router.url === "/csPayee/cs_claim_payeeClaimNew"
    ) {
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        {
          label: "CS:Claim Payee",
          href: "/cs_claim_payee",
          active: "",
        },
        {
          label: "Claim Payee",
          href: "/cs_claim_payee/claimDetail",
          active: "",
        },
        {
          label: "Claims List",
          href: "/cs_claim_payeeClaim",
          active: "",
        },
        { label: "Claim Form", active: "active" },
      ];
      this.isDetail = false;
      this.getRecById();
      this.isUpdate = false;
      this.claimStatus = { claimStatus: "Hold", claimStatusID: 2 };
      this.payemntTypeDisable = false;
    } else if (this._router.url.includes("/provider/auth-claim/Claimdetail")) {
      this.getAuthDetails();
      this.isDetail = true;
      this.isUpdate = true;
      this.breadcrumbs = [
        { label: "Person Types", href: "/reports/person/types", active: "" },
        { label: "Provider List", href: "/reports/provider/view", active: "" },
        {
          label: "Provider Form",
          href: "/reports/provider/detail",
          active: "",
        },
        {
          label: "Provider Opencards",
          active: "",
          href: "/provider/dashboard",
        },
        {
          label: "Authorization Summary List",
          active: "",
          href: "/provider/opencard/authorization-summary/view",
        },
        {
          label: "Authorization Summary",
          active: "",
          href: "/provider/opencard/authorization-summary/detail",
        },
        {
          label: "Claim List",
          href:
            "/reintegration/referral/service/opencard/claim/authorizationSummary",
          active: "",
        },
        {
          label: "Form",
          href: "/provider/auth-claim/Claimdetail",
          active: "",
        },
      ];
    } else {
      this.breadcrumbs.push(
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        {
          label: "Authorizations",
          href: "/reports/all/authorizations",
          active: "",
        },
        {
          label: "Authorization Form",
          href: "/reintegration/referral/placement-event-authorizations/detail",
          active: "",
        },
        {
          label: "Claims List",
          href: "/reintegration/referral/placement-authorizations/claims",
          active: "",
        },
        { label: "Claims", active: "active" }
      );
      this.isDetail = false;
      this.getRecById();
      this.isUpdate = false;
      this.claimStatus = { claimStatus: "Hold", claimStatusID: 2 };
      this.payemntTypeDisable = false;
      this.allClaims();
    }
    this.selectedPay = [
      { name: "Provider", code: "provider" },
      { name: "Payee", code: "Payee" },
    ];
  }
  payee_ID: any;
  provider_ID: any;
  referralID: any;
  clientID: any;
  doNotPay: any;
  claimStatus = { claimStatus: "Hold", claimStatusID: 2 };
  unit_remaining: any;
  claim_provider_rate: any;
  glKey: any;
  claimAllDetail = [];
  listViewClaimHeaders = [];
  listclaimTest = [];
  columnClaimDefs = [];
  authID: any;
  payName: any;
  addressDetail: any;
  isUnitRemaining = false;
  unit_remain: number;
  authorizationIDForDisplay: number;
  getRecById() {
    /**Replace with actual authorization id */
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.authorizationIDForDisplay =
      parseInt(localStorage.getItem("authorizationId")) -
      this._opencard.getHasKey();
    let req = {
      authorizationID:
        parseInt(localStorage.getItem("authorizationId")) -
        this._opencard.getHasKey(),
    };
    this._opencard.getAuthById(req).then((data: any) => {
      this.currentSponsorID =
        data.authorization.sponsorID !== null &&
          data.authorization.sponsorID !== undefined
          ? data.authorization.sponsorID.sponsorID
          : null;
      if (data.authorization.unitsRemaining === 0) {
        this.isUnitRemaining = true;
        this.unit_remain = data.authorization.unitsRemaining;
        // swal('Info', "There are no more units available, A Claim cannot be created", 'warning');
      } else {
        this.isUnitRemaining = false;
      }
      let pay;
      this.addressDetail = data.authorization.clientID;
      data.authorization.procodeID.fullName =
        data.authorization.procodeID.procode +
        " - " +
        data.authorization.procodeID.categoryOfService;
      if (data.authorization.payeeID === null) {
        pay = 'Provider'
      } else {
        pay = 'Payee'
      }
      var authDatas = {
        receivedDate: new Date(),
        beginDate: new Date(data.authorization.beginDate),
        endDate: new Date(data.authorization.endDate),
        claim_beginDate: this.authFormDetail.claim_beginDate,
        claim_endDate: this.authFormDetail.claim_endDate,
        procodeID: data.authorization.procodeID.procodeID,
        procode:
          data.authorization.procodeID.procode +
          " - " +
          data.authorization.procodeID.categoryOfService,
        providerID: this.getvalue("providerID", data.authorization.providerID),
        providerName: this.getvalue(
          "providerName",
          data.authorization.providerID
        ),
        unitTypeID: isNullOrUndefined(data.authorization.unitTypeID)
          ? null
          : data.authorization.unitTypeID.unitTypeID,
        // data.authorization.unitTypeID.unitTypeID,
        unitType: isNullOrUndefined(data.authorization.unitTypeID)
          ? null
          : data.authorization.unitTypeID.unitType,
        // data.authorization.unitTypeID.unitType,
        unitsRemaining: data.authorization.unitsRemaining,
        unitsAuth: this.nullOrUndefined_rate(data.authorization.unitsAuth),
        payorRate: this.nullOrUndefined_rate(data.authorization.payorRate),
        providerRate: this.nullOrUndefined_rate(
          data.authorization.providerRate
        ),
        paySponsor: data.authorization.paySponsor,
        payPlacement: data.authorization.payPlacement,
        dateOverride: data.authorization.dateOverride,
        claimPayorRate: this.nullOrUndefined_rate(data.authorization.payorRate),
        claimProviderRate: this.nullOrUndefined_rate(
          data.authorization.providerRate
        ),
        units: 0,
        pay: pay,
        Claim_unitType: data.authorization.unitTypeID,
        claim_procode:
          data.authorization.procodeID.procode +
          " - " +
          data.authorization.procodeID.categoryOfService,
        date_claimOverride: this.authFormDetail.date_claimOverride,
        claim_units: this.nullOrUndefined_rate(data.authorization.units),
      };
      this.unit_remaining = data.authorization.unitsRemaining;
      this.glKey = data.authorization.glKey;
      this.referralID = data.authorization.referralID.referralID;
      this.clientID = data.authorization.clientID.clientID;
      this.doNotPay = data.authorization.doNotPay;
      if (this.dateChange) {
        authDatas.claim_beginDate = this.authFormDetail.claim_beginDate;
        authDatas.claim_endDate = this.authFormDetail.claim_endDate;
      }
      this.authFormDetail = authDatas;
      this.claim_provider_rate = data.authorization.providerRate;
      this.claimProcode = data.authorization.procodeID;
      this.ClaimUnitType = data.authorization.unitTypeID;

      // this.claim_payment = data.authorization.paymentTypeID

      if (this.isUpdate === false) {
        this.claim_provider_rate = data.authorization.providerRate;
        this.claimPayorRate = data.authorization.providerRate;
        this.claimProviderRate = data.authorization.providerRate;
      }
      // this.claimPayorRate = data.authorization.providerRate;
      data.claimID.map((itm) => {
        if (itm.payeeID === null) {
          itm["payeeOrProvide"] = itm.providerID.providerName;
        } else if (itm.providerID === null) {
          itm["payeeOrProvide"] = itm.payeeID.payeeName;
        }
      });
      var allClaims = data.claimID;
      allClaims.forEach((data) => {
        var claimDeta = {
          ClaimID: data.claimID,
          ProviderName: data.payeeOrProvide,
          ClaimStatus: isNullOrUndefined(data.claimStatusID)
            ? null
            : data.claimStatusID.claimStatus,
          Units: data.units,
          PayorRate: data.payorRate,
          TotalPayorRate: data.totalPayorRate,
          ProviderRate: data.providerRate,
          TotalProviderRate: data.totalProviderRate,
          BeginDate: data.beginDate,
          EndDate: data.endDate,
          ExpactedPaymentDate: data.paymentDueDate,
          PostedDate: data.postedDate,
          GLKey: data.glkey,
        };
        this.claimAllDetail.push(claimDeta);
      });

      loader.style.display = "none";

      if (this._router.url.includes("/auth-claim/details")) {
        if (data.authorization.payeeID === null) {
          this.claim_pay = { name: "Provider", code: "provider" };
          pay = "provider";
          this.isProvider = true;
          this.isPayee = false;
          this.payee_ID = null;
          this.provider_ID = data.authorization.providerID.providerID;
          this.payName = data.authorization.providerID.providerName;
        } else if (data.authorization.providerID === null) {
          pay = "Payee";
          this.isProvider = false;
          this.isPayee = true;
          this.claim_pay = { name: "Payee", code: "Payee" };
          this.payee_ID = data.authorization.payeeID.payeeID;
          this.authFormDetail.providerName =
            data.authorization.payeeID.payeeName;
          this.payName = data.authorization.payeeID.payeeName;
          this.provider_ID = null;
        }
      } else {
        if (data.authorization.payeeID === null) {
          this.claim_pay = { name: "Provider", code: "provider" };
          pay = "provider";
          this.isProvider = true;
          this.isPayee = false;
          this.payee_ID = null;
          this.provider_ID = data.authorization.providerID.providerID;
          // this.pay_claim_Name = data.authorization.providerID;
          this.setClaimAuthorizationProvider(data.authorization, "provider");
          this.setLabelNameForClaimProvider();
          this.payName = data.authorization.providerID.providerName;
        } else if (data.authorization.providerID === null) {
          pay = "Payee";
          this.isProvider = false;
          this.isPayee = true;
          this.claim_pay = { name: "Payee", code: "Payee" };
          this.payee_ID = data.authorization.payeeID.payeeID;
          // this.pay_claim_Name = data.authorization.payeeID;
          this.setClaimAuthorizationProvider(data.authorization, "payee");
          this.setLabelNameForClaimProvider();
          this.authFormDetail.providerName =
            data.authorization.payeeID.payeeName;
          this.payName = data.authorization.payeeID.payeeName;
          this.provider_ID = null;
        }
      }
    });
  }
  getClaimandAuth() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {
      authorizationID:
        parseInt(localStorage.getItem("authorizationId")) -
        this._opencard.getHasKey(),
    };
    this._opencard.getAuthById(req).then((data: any) => {
      const claimDetail = data.claimID.find(
        (element) =>
          element.claimID ==
          parseInt(localStorage.getItem("claimID")) - this._opencard.getHasKey()
      );
      let pay;
      this.addressDetail = claimDetail.clientID;

      if (claimDetail.payeeID === null) {
        pay = "provider";
        this.payee_ID = null;
        this.provider_ID = claimDetail.providerID.providerID;
        this.payName = claimDetail.providerID.providerName;
      } else if (claimDetail.providerID === null) {
        pay = "Payee";
        this.payee_ID = claimDetail.payeeID.payeeID;
        this.authFormDetail.providerName = claimDetail.payeeID.payeeName;
        this.payName = claimDetail.payeeID.payeeName;
        this.provider_ID = null;
      }

      var authDatas = {
        receivedDate: new Date(),
        beginDate: new Date(claimDetail.beginDate),
        endDate: new Date(claimDetail.endDate),
        claim_beginDate: new Date(claimDetail.beginDate),
        claim_endDate: new Date(claimDetail.beginDate),
        procodeID: claimDetail.procodeID.procodeID,
        procode:
          claimDetail.procodeID.procode +
          " - " +
          claimDetail.procodeID.categoryOfService,
        providerID: this.getvalue("providerID", claimDetail.providerID),
        providerName: this.getvalue("providerName", claimDetail.providerID),
        unitTypeID: claimDetail.unitTypeID.unitTypeID,
        unitType: claimDetail.unitTypeID.unitType,
        unitsRemaining: data.authorization.unitsRemaining,
        unitsAuth: this.nullOrUndefined_rate(data.authorization.unitsAuth),
        payorRate: this.nullOrUndefined_rate(claimDetail.payorRate),
        providerRate: this.nullOrUndefined_rate(claimDetail.providerRate),
        paySponsor: claimDetail.paySponsor,
        payPlacement: claimDetail.payPlacement,
        dateOverride: claimDetail.dateOverride,
        claimPayorRate: this.nullOrUndefined_rate(claimDetail.payorRate),
        claimProviderRate: this.nullOrUndefined_rate(claimDetail.providerRate),
        units: this.nullOrUndefined_rate(claimDetail.units),
        pay: pay,
        Claim_unitType: claimDetail.unitTypeID.unitType,
        claim_procode:
          claimDetail.procodeID.procode +
          " - " +
          claimDetail.procodeID.categoryOfService,
        date_claimOverride: claimDetail.dateOverride,
        claim_units: this.nullOrUndefined_rate(claimDetail.units),
      };
      this.notes = claimDetail.notes;
      this.paymentNotes = claimDetail.paymentNotes;
      this.unit_remaining = claimDetail.unitsRemaining;
      this.glKey = claimDetail.glKey;
      this.referralID = claimDetail.referralID.referralID;
      this.clientID = claimDetail.clientID.clientID;
      this.doNotPay = claimDetail.doNotPay;
      this.authFormDetail = authDatas;
      this.claim_provider_rate = claimDetail.providerRate;
      data.claimID.map((itm) => {
        if (itm.payeeID === null) {
          itm["payeeOrProvide"] = itm.providerID.providerName;
        } else if (itm.providerID === null) {
          itm["payeeOrProvide"] = itm.payeeID.payeeName;
        }
      });
      var allClaims = data.claimID;
      allClaims.forEach((data) => {
        var claimDeta = {
          ClaimID: data.claimID,
          ProviderName: data.payeeOrProvide,
          ClaimStatus: isNullOrUndefined(data.claimStatusID)
            ? null
            : data.claimStatusID.claimStatus,
          Units: data.units,
          PayorRate: data.payorRate,
          TotalPayorRate: data.totalPayorRate,
          ProviderRate: data.providerRate,
          TotalProviderRate: data.totalProviderRate,
          BeginDate: data.beginDate,
          EndDate: data.endDate,
          ExpactedPaymentDate: data.paymentDueDate,
          PostedDate: data.postedDate,
          GLKey: data.glkey,
        };
        this.claimAllDetail.push(claimDeta);
      });
      loader.style.display = "none";
    });
  }
  getvalue(provid, data) {
    if (data == null) {
      return "";
    } else {
      if (provid === "providerID") {
        return data.providerID;
      } else if (provid === "providerName") {
        return data.providerName;
      }
    }
  }
  notes: any;
  payLists = [];
  paymentNotes: any;
  paymentTypeID = 1;
  getPaymentType(event) {
    let req;
    let paymentPush = [];
    req = { Object: "paymentType", value: event.query };
    return this._caseTeam.getSearchList(req).then((data) => {
      if (this.isUpdate) {
        if (
          this.restrictDropdownForm.ClaimStatusID === 3 &&
          this.restrictDropdownForm.PaymentTypeID !== null
        ) {
          data.dropDown.map((itm) => {
            if (itm.paymentTypeID !== 1) {
              paymentPush.push(itm);
            }
          });
        } else if (
          this.restrictDropdownForm.ClaimStatusID === 4 &&
          this.restrictDropdownForm.PaymentTypeID !== null
        ) {
          data.dropDown.map((itm) => {
            if (itm.paymentTypeID === 1) {
              paymentPush.push(itm);
            }
          });
        } else {
          paymentPush = data.dropDown;
        }
      } else {
        paymentPush = data.dropDown;
      }
      this.payLists = paymentPush;
    });
  }
  showDateOverlap = false;
  showValidateClaim() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    var req = {
      clientID: this.clientID,
      authorizationID:
        parseInt(localStorage.getItem("authorizationId")) -
        this._opencard.getHasKey(),
      beginDate: this._localValues.report_begin_dateAndTime(
        this.authFormDetail.claim_beginDate
      ),
      endDate: this._localValues.report_end_dateAndTime(
        this.authFormDetail.claim_endDate
      ),
      procodeID: this.claimProcode.procodeID,
      units: parseFloat(this.claimUnits),
    };
    this._openCards.getAuthValidate(req).then((data) => {
      loader.style.display = "none";
      if (JSON.stringify(data.dateValidation) === JSON.stringify({})) {
        data.dateValidation.responseMessage = "Verified";
        data.dateValidation.responseStatus = true;
      }
      if (
        !data.dateValidation.responseStatus ||
        !data.procodeValidation.responseStatus
      ) {
        if (!data.procodeValidation.responseStatus) {
          swal("Info", data.procodeValidation.responseMessage, "warning");
        } else if (!data.dateValidation.responseStatus) {
          Swal.fire({
            title: data.dateValidation.responseMessage,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((res) => {
            console.log("res", res);
            if (res.value === true) {
              this.saveClaim();
            } else {
              this.showDateOverlap = false;
            }
          });
        } else {
          this.saveClaim();
        }
      } else {
        this.saveClaim();
      }
    });
  }
  updateReq: any;
  saveClaim() {
    console.log("this.notes>>>", this.notes);
    if (this.authFormDetail.unitsRemaining < 0) {
      swal(
        "Info",
        ' "Unit Remaining" Negative Value is not allowed',
        "warning"
      );
    } else {
      if (
        this.claimUnits == 0 ||
        this.claimUnits == undefined ||
        this.claimUnits == null
      ) {
        swal("Info", "You must enter units for this procode", "warning");
      } else if (
        this.claim_payment == {} ||
        this.claim_payment == undefined ||
        this.claim_payment == ""
      ) {
        swal("Info", "Please Select Payment Type", "warning");
      } else if (this.claimStatus.claimStatusID === 4 && this.notes == "") {
        swal("Info", "Please Enter the Notes", "warning");
      } else if (
        this.claimStatus.claimStatusID === 4 &&
        this.notes == undefined
      ) {
        swal("Info", "Please Enter the Notes", "warning");
      } else {
        if (this.isUpdate) {
          const loader = document.getElementById(
            "loading-overlay"
          ) as HTMLElement;
          loader.style.display = "block";
          this.updateReq = {
            claimID:
              parseInt(localStorage.getItem("claimID")) -
              this._opencard.getHasKey(),
            isFromTools: false,
            staffID: parseInt(localStorage.getItem("UserId")) || 4620,
            providerID: this.itsNull(this.pay_claim_Name.providerID),
            payeeID: this.itsNull(this.pay_claim_Name.payeeID),
            referralID: this.referralID,
            beginDate: this._localValues.report_begin_dateAndTime(
              this.authFormDetail.claim_beginDate
            ),
            endDate: this._localValues.report_end_dateAndTime(
              this.authFormDetail.claim_endDate
            ),
            procodeID: this.claimProcode.procodeID,
            claimStatusID: this.claimStatus.claimStatusID,
            clientID: this.clientID,
            unitsRemaining: this.authFormDetail.unitsRemaining,
            doNotPay: this.doNotPay,
            notes: this.notes,
            paymentTypeID: this.claim_payment.paymentTypeID,
            paymentDueDate: null,
            paymentNotes: this.paymentNotes,
            payorRate: this.claimPayorRate,
            providerRate: this.claimProviderRate,
            receivedDate: this._localValues.report_begin_dateAndTime(
              this.authFormDetail.receivedDate
            ),
            totalPayorRate: this.claimUnits * this.claimPayorRate,
            totalProviderRate: this.claimUnits * this.claimProviderRate,
            units: parseFloat(this.claimUnits),
            unitTypeID: this.ClaimUnitType.unitTypeID,
            authorizationID:
              parseInt(localStorage.getItem("authorizationId")) -
              this._opencard.getHasKey(),
            glKey: this.glKey,
            sfaOfficeID: null,
            requestedBy_StaffID: this.requestedBy_StaffID,
            isNotFCHWeb: this.isNotFCHWeb,
          };
          console.log("this.updateReq>>>", this.updateReq);
          this.updateReq[
            "dateOverride"
          ] = this.authFormDetail.date_claimOverride;
          console.log(
            "this.updateReq['dateOverride']>>>",
            this.updateReq["dateOverride"]
          );
          this._opencard
            .updateClaims(this.updateReq)
            .then((data: any) => {
              loader.style.display = "none";
              swal("Save", "Successfully Saved!", "success");
              if (
                this._router.url === "/cs/auth-claim/details" ||
                this._router.url === "/cs/auth-claim/new"
              ) {
                this._router.navigate(["/authinfo/claimList"]);
              } else if (
                this._router.url === "/cs_claim_payee/auth/detail" ||
                this._router.url === "/cs_claim_payee/auth/new"
              ) {
                this._router.navigate(["/cs_claim_payee/claimDetail"]);
              } else if (
                this._router.url.includes("/CSpayee/payeeform/authClaim/new") ||
                this._router.url.includes(
                  "/CSpayee/payeeform/authClaim/details"
                )
              ) {
                this._router.navigate([
                  "/reintegration/cs-payee/csPayeeAuthDetail",
                ]);
              } else if (
                this._router.url.includes("/provider/auth-claim/Claimdetail")
              ) {
                this._router.navigate([
                  "/reintegration/referral/service/opencard/claim/authorizationSummary",
                ]);
              } else if (
                this._router.url.includes("/provider/provider_AuthorizationClaim")) {
                this._router.navigate([
                  "provider_Authorization_claim",
                ]);
              } else if (
                this._router.url.includes("/payee/payee_AuthorizationClaim")) {
                this._router.navigate([
                  "payee_Authorization_claim",
                ]);
              } else if (this._router.url.includes("/provider/auth-claim_detail")) {
                this._router.navigate(["/provider/claimProvider_claimList"]);
              } else if (this._router.url.includes("/cs_claim_payee/auth/detail")) {
                this._router.navigate(['/cs_claim_payee/claimDetail']);
              } else {  
                localStorage.setItem(
                  "authorizationId",
                  data.claim.authorizationID + this._opencard.getHasKey()
                );
                this._router.navigate(
                  ["/reintegration/referral/placement-authorizations/claims"],
                  {
                    queryParams: { origin: "cards" },
                    queryParamsHandling: "merge",
                  }
                );
              }
              // this._router.navigate(['/reintegration/referral/placement-event-authorizations/detail'], { queryParams: { 'origin': 'cards' }, queryParamsHandling: 'merge' })
            })
            .catch((error) => {
              loader.style.display = "none";
            });
        } else {
          if (this.isUnitRemaining || this.unit_remain === 0) {
            swal(
              "Info",
              "There are no more units available, A Claim cannot be created",
              "warning"
            );
          } else {
            const loader = document.getElementById(
              "loading-overlay"
            ) as HTMLElement;
            loader.style.display = "block";
            var savereq = {
              isFromTools: false,
              staffID: parseInt(localStorage.getItem("UserId")) || 4620,
              providerID: this.itsNull(this.pay_claim_Name.providerID),
              payeeID: this.itsNull(this.pay_claim_Name.payeeID),
              referralID: this.referralID,
              beginDate: this._localValues.report_begin_dateAndTime(
                this.authFormDetail.claim_beginDate
              ),
              endDate: this._localValues.report_end_dateAndTime(
                this.authFormDetail.claim_endDate
              ),
              procodeID: this.claimProcode.procodeID,
              claimStatusID: this.claimStatus.claimStatusID,
              clientID: this.clientID,
              dateOverride: this.authFormDetail.date_claimOverride,
              unitsRemaining: this.authFormDetail.unitsRemaining,
              doNotPay: this.doNotPay,
              notes: this.notes,
              paymentTypeID: this.claim_payment.paymentTypeID,
              paymentDueDate: null,
              paymentNotes: this.paymentNotes,
              // "payorRate": this.authFormDetail.claimPayorRate,
              // "providerRate": this.authFormDetail.claimProviderRate,
              payorRate: this.claimPayorRate,
              providerRate: this.claimProviderRate,
              receivedDate: this._localValues.report_begin_dateAndTime(
                this.authFormDetail.receivedDate
              ),
              // "totalPayorRate": this.authFormDetail.payorRate,
              // "totalProviderRate": this.authFormDetail.providerRate,
              // "units": parseInt(this.claimUnits),
              totalPayorRate: this.claimUnits * this.claimPayorRate,
              totalProviderRate: this.claimUnits * this.claimProviderRate,
              units: parseFloat(this.claimUnits),
              // isNullOrUndefined(this.ClaimUnitType.unitTypeID) ? null : this.ClaimUnitType.unitTypeID,
              unitTypeID: this.ClaimUnitType.unitTypeID,
              //
              authorizationID:
                parseInt(localStorage.getItem("authorizationId")) -
                this._opencard.getHasKey(),
              glKey: this.glKey,
              sfaOfficeID: null,
              requestedBy_StaffID: this.requestedBy_StaffID,
              isNotFCHWeb: this.isNotFCHWeb,
            };
            this._opencard
              .saveClaim(savereq)
              .then((data: any) => {
                loader.style.display = "none";
                if (data.responseStatus) {
                  swal("Save", "Successfully Saved!", "success");

                  if (
                    this._router.url === "/cs/auth-claim/details" ||
                    this._router.url === "/cs/auth-claim/new"
                  ) {
                    this._router.navigate(["/authinfo/claimList"]);
                  } else if (
                    this._router.url === "/cs_claim_payee/auth/detail" ||
                    this._router.url === "/cs_claim_payee/auth/new"
                  ) {
                    this._router.navigate(["/cs_claim_payee/claimDetail"]);
                  } else if (
                    this._router.url === "/otherService-direct/form/view" ||
                    this._router.url === "/otherService-direct/form/new"
                  ) {
                    this._router.navigate([
                      "/reintegration/referral/service/opencard/claim",
                    ]);
                  } else if (
                    this._router.url === "/CSpayee/payeeform/authClaim/new" ||
                    this._router.url === "/CSpayee/payeeform/authClaim/details"
                  ) {
                    this._router.navigate([
                      "/reintegration/cs-payee/csPayeeAuthDetail",
                    ]);
                  } else if (
                    this._router.url === "/payee/payee_AuthorizationClaimNew"
                  ) {
                    this._router.navigate([
                      "payee_Authorization_claim",
                    ]);
                  } else if (
                    this._router.url === "/provider/provider_AuthorizationClaimNew"
                  ) {
                    this._router.navigate([
                      "provider_Authorization_claim",
                    ]);
                  } else if (this._router.url.includes("/provider/auth-claim_new")) {
                    this._router.navigate(["/provider/claimProvider_claimList"]);
                  } else {
                    localStorage.setItem(
                      "authorizationId",
                      data.claim.authorizationID + this._opencard.getHasKey()
                    );
                    this._router.navigate(
                      [
                        "/reintegration/referral/placement-authorizations/claims",
                      ],
                      {
                        queryParams: { origin: "cards" },
                        queryParamsHandling: "merge",
                      }
                    );
                  }
                } else {
                  swal("Info", data.responseMessage, "warning");
                }

                // this._router.navigate(['/reintegration/referral/placement-event-authorizations/detail'], { queryParams: { 'origin': 'cards' }, queryParamsHandling: 'merge' })
              })
              .catch((error) => {
                loader.style.display = "none";
              });
          }
        }
      }
    }
  }
  metaData = [];
  itsNull(data) {
    if (data) {
      return data;
    } else {
      return null;
    }
  }
  getStaffDetails(event) {
    const req = { Object: "staff", value: event.query };
    this._caseTeam.getSearchList(req).then((data) => {
      data.dropDown.map((item) => {
        delete data["genderID"];
        item["fullName"] =
          item.firstName + " " + item.lastName + " ( " + item.email + " )";
      });
      this.metaData = data.dropDown;
    });
  }

  reduceTotalRemaining(unitData) {
    if (this.claimUnits < 0) {
      swal("Info", "Negative Value is not allowed", "warning");
      this.claimUnits = "";
    } else {
      if (this.authFormDetail.unitsRemaining === 0) {
        swal(
          "Info",
          "There are no more units available, A Claim cannot be created",
          "warning"
        );
      } else {
        this.authFormDetail.unitsRemaining =
          this.unit_remaining - this.claimUnits;
      }
      console.log(
        "this.authFormDetail.unitsRemaining-unitData>>>>",
        this.authFormDetail.unitsRemaining
      );
      // this.claimUnits = (unitData);
    }
  }

  onChangeAuthoInfoRates(rate) {
    if (this.claimPayorRate >= this.authFormDetail.claimPayorRate) {
      this.claimPayorRate = this.authFormDetail.claimPayorRate;
      swal(
        "Info",
        "'Payor Rate Cannot be greater then the 'Authorization Payor Rate' Resetting back to the 'Authorization Payor Rate'",
        "warning"
      );
    }
  }
  onChangeAuthoProviderRates() {
    if (this.claimProviderRate >= this.authFormDetail.claimProviderRate) {
      this.claimProviderRate = this.authFormDetail.claimProviderRate;
      swal(
        "Info",
        "'Payor Rate Cannot be greater then the 'Authorization Provider Rate' Resetting back to the 'Authorization Provider Rate'",
        "warning"
      );
    }
  }
  triggerStaffView(even) {
    console.log("even>>>", even.staffID);
    this.requestedBy_StaffID = even.staffID;
  }
  getPayment(event) {
    this.paymentTypeID = event.paymentTypeID;
  }
  onChangeClaimBeginDate() {
    var claim_beginDate = new Date(this.authFormDetail.claim_beginDate);
    var claimBeginDate = claim_beginDate.getMonth();
    var claim_endDate = new Date(this.authFormDetail.claim_endDate);
    var claimEndDate = claim_endDate.getMonth();
    if (claimBeginDate != claimEndDate) {
      swal(
        "Info",
        "BeginDate and EndDate must be within the same month",
        "warning"
      );
    } else if (
      claim_beginDate != null &&
      claim_endDate != null &&
      claim_endDate < claim_beginDate
    ) {
      swal("Info", "End date should be grater then Begin date.", "warning");
    }
  }
  nullOrUndefined_rate(data) {
    if (data) {
      return data;
    } else if (data == null) {
      return 0.0;
    }
  }
  claim_payment: any;
  claimStatusID: any;
  claim_pay: any;
  claimProcode: any;
  ClaimUnitType: any;
  claimUnits: any;
  req: any;
  isPayeeCard = true;
  restrictDropdownForm: any;
  isDisabled = false;
  paymentDueDate: any;
  dateChange = false;
  getAuthDetails() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.req = {
      claimID:
        parseInt(localStorage.getItem("claimID")) - this._opencard.getHasKey(),
    };
    this._opencard.getClaimIDDetails(this.req).then((data) => {
      this.claimID = data.claim.claimID;
      this.currentSponsorID =
        data.claim.sponsorID !== null && data.claim.sponsorID !== undefined
          ? data.claim.sponsorID.sponsorID
          : null;
      this.appendRouteParam(data.claim.clientID.clientID);
      loader.style.display = "none";
      if (data.claim.recoup_ClaimID != null) {
        this.isDisabled = true;
      }
      this.dateChange = true;
      this.getRecById();
      if (
        this._router.url === "/payee/authClaim/details" ||
        this._router.url ===
        "/payee/serviceClaim_hardgoods/auth-claim/details" ||
        this._router.url ===
        "/payee/serviceClaim_otherService/auth-claim/details"
      ) {
        this.isUpdate = false;
        this.isPayeeCard = false;
      } else {
        this.isPayeeCard = true;
      }
      if (data) {
        this.restrictDropdownForm = {
          ClaimStatusID: data.claim.claimStatusID.claimStatusID,
          Recoup_ClaimID: data.claim.recoup_ClaimID,
          PaymentTypeID: data.claim.paymentTypeID.paymentTypeID,
        };
        if (
          this.restrictDropdownForm.ClaimStatusID === 3 ||
          (this.restrictDropdownForm.ClaimStatusID === 4 &&
            this.restrictDropdownForm.PaymentTypeID !== null)
        ) {
          this.payemntTypeDisable = false;
        } else if (
          this.restrictDropdownForm.ClaimStatusID === 2 &&
          this.restrictDropdownForm.Recoup_ClaimID !== null
        ) {
          this.payemntTypeDisable = false;
        } else {
          this.payemntTypeDisable = true;
        }
        this.allClaims();
        data.claim.procodeID.fullName =
          data.claim.procodeID.procode +
          " - " +
          data.claim.procodeID.categoryOfService;
        this.claimStatusID = data.claim.claimStatusID.claimStatusID;
        this.claimStatus = data.claim.claimStatusID;
        this.isNotFCHWeb = data.claim.isNotFCHWeb;

        !isNullOrUndefined(data.claim.beginDate)
          ? (this.authFormDetail.claim_beginDate = new Date(
            data.claim.beginDate
          ))
          : null;
        !isNullOrUndefined(data.claim.endDate)
          ? (this.authFormDetail.claim_endDate = new Date(data.claim.endDate))
          : null;
        !isNullOrUndefined(data.claim.receivedDate)
          ? (this.authFormDetail.receivedDate = new Date(
            data.claim.receivedDate
          ))
          : null;
        !isNullOrUndefined(data.claim.unitTypeID)
          ? (this.ClaimUnitType = data.claim.unitTypeID)
          : null;
        !isNullOrUndefined(data.claim.procodeID)
          ? (this.claimProcode = data.claim.procodeID)
          : null;
        !isNullOrUndefined(data.claim.paymentTypeID)
          ? (this.claim_payment = data.claim.paymentTypeID)
          : null;
        !isNullOrUndefined(data.claim.paymentDueDate)
          ? (this.paymentDueDate = new Date(data.claim.paymentDueDate))
          : null;

        if (data.claim.payeeID === null) {
          this.claim_pay = { name: "Provider", code: "provider" };
          this.isProvider = true;
          this.isPayee = false;
          // !isNullOrUndefined(data.claim.providerID)
          //   ? (this.pay_claim_Name = data.claim.providerID)
          //   : null;
          this.setClaimAuthorizationProvider(data.claim, "provider");
          this.setLabelNameForClaimProvider();
        } else if (data.claim.providerID === null) {
          this.claim_pay = { name: "Payee", code: "Payee" };
          this.isProvider = false;
          this.isPayee = true;
          // !isNullOrUndefined(data.claim.payeeID)
          //   ? (this.pay_claim_Name = data.claim.payeeID)
          //   : null;
          this.setClaimAuthorizationProvider(data.claim, "payee");
          this.setLabelNameForClaimProvider();
        }

        !isNullOrUndefined(data.claim.dateOverride)
          ? (this.authFormDetail.date_claimOverride = data.claim.dateOverride)
          : null;
        !isNullOrUndefined(data.claim.providerRate)
          ? (this.claimProviderRate = data.claim.providerRate)
          : null;
        !isNullOrUndefined(data.claim.providerID)
          ? (this.payName = data.claim.providerID)
          : null;
        !isNullOrUndefined(data.claim.payorRate)
          ? (this.claimPayorRate = data.claim.payorRate)
          : null;

        !isNullOrUndefined(data.claim.units)
          ? (this.claimUnits = data.claim.units.toFixed(2))
          : null;
        this.isFormLog = true;
        this.formLogInfo.changedBy = !isNullOrUndefined(data.claim.changedBy)
          ? data.claim.changedBy
          : "------";
        this.formLogInfo.changedDate = !isNullOrUndefined(
          data.claim.changedDate
        )
          ? moment(data.claim.changedDate).format("MM/DD/YYYY hh:mm:ss A")
          : "--:--:-- --";
        this.formLogInfo.enteredBy = !isNullOrUndefined(data.claim.enteredBy)
          ? data.claim.enteredBy
          : "------";
        this.formLogInfo.enteredDate = !isNullOrUndefined(
          data.claim.enteredDate
        )
          ? moment(data.claim.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
          : "--:--:-- --";
      } else {
        loader.style.display = "none";
      }
    });
  }
  isEdit = true;
  discard = () => {


    if (this._router.url.includes("/provider/provider_AuthorizationClaim")) {
      this._router.navigate(["/provider_Authorization_claim"]);
    } else if (this._router.url.includes("/payee/payee_AuthorizationClaim")) {
      this._router.navigate(["/payee_Authorization_claim"]);
    } else if (this._router.url.includes("/provider/auth-claim_detail")) {
      this._router.navigate(["/provider/claimProvider_claimList"]);
    } else if (this._router.url.includes("/cs_claim_payee/auth/detail")) {
      this._router.navigate(['/cs_claim_payee/claimDetail']);
    } else {
      this._router.navigate(
        ["reintegration/referral/service/opencard/claim/authorizationSummary"]
        // { queryParams: { origin: "cards" }, queryParamsHandling: "merge" }
      );
    }



  };
  editForm() {
    this.isEdit = false;
    if (this.claimStatusID == 2) {
      this.isDetail = false;
    } else {
      this.isDetail = true;
    }
  }
  payeeLists = [];
  getPayeeList(event) {
    let req;
    req = { Object: "payee", value: event.query };
    return this._caseTeam.getSearchList(req).then((data) => {
      this.payeeLists = data.dropDown;
    });
  }
  providerLists = [];
  getProviderList(event) {
    let req;
    req = { Object: "provider", value: event.query };
    return this._caseTeam.getSearchList(req).then((data) => {
      this.providerLists = data.dropDown;
    });
  }
  isMandatory = false;
  getSelectStatus(event) {
    if (this._router.url.includes("/auth-claim/details")) {
      if (event.claimStatusID == 2) {
        this.isDetail = false;
      } else {
        this.isDetail = true;
      }
    }
    if (event.claimStatusID == 4) {
      this.isMandatory = true;
    } else {
      this.isMandatory = false;
    }
  }
  allProcodes = [];
  getProcode(event) {
    let req;
    req = { Object: "procode", value: event.query };
    return this._caseTeam.getSearchList(req).then((data) => {
      data.dropDown.map((data) => {
        data["fullName"] = data.procode + " - " + data.categoryOfService;
      });
      this.allProcodes = data.dropDown;
    });
  }
  allunitTypes = [];
  getUnitType(event) {
    let req;
    req = { Object: "unitType", value: event.query };
    return this._caseTeam.getSearchList(req).then((data) => {
      this.allunitTypes = data.dropDown;
    });
  }
  claimStatusList = [];
  claimStatusDisable = false;
  disableEXPdate = true;
  allClaims() {
    var claimStasList = [];
    this._openCards.getClaimsStatus().then((data) => {
      data.map((itm) => {
        if (this.isUpdate) {
          if (
            this.restrictDropdownForm.ClaimStatusID === 1 &&
            this.restrictDropdownForm.Recoup_ClaimID === null &&
            this.restrictDropdownForm.PaymentTypeID === null
          ) {
            if (itm.claimStatusID === 1 && itm.claimStatusID === 3) {
              claimStasList.push(itm);
            }
          } else if (
            this.restrictDropdownForm.ClaimStatusID === 1 &&
            this.restrictDropdownForm.Recoup_ClaimID === null &&
            this.restrictDropdownForm.PaymentTypeID === null
          ) {
            if (
              itm.claimStatusID === 1 ||
              itm.claimStatusID === 3 ||
              itm.claimStatusID === 4
            ) {
              claimStasList.push(itm);
            }
          } else if (
            this.restrictDropdownForm.ClaimStatusID === 2 &&
            this.restrictDropdownForm.Recoup_ClaimID === null
          ) {
            if (
              itm.claimStatusID === 3 ||
              itm.claimStatusID === 2 ||
              itm.claimStatusID === 5
            ) {
              claimStasList.push(itm);
            }
          } else if (
            this.restrictDropdownForm.ClaimStatusID === 1 &&
            this.restrictDropdownForm.Recoup_ClaimID === null &&
            this.restrictDropdownForm.PaymentTypeID === 1
          ) {
            if (itm.claimStatusID === 1 || itm.claimStatusID === 4) {
              claimStasList.push(itm);
            }
          } else if (
            this.restrictDropdownForm.ClaimStatusID === 1 &&
            this.restrictDropdownForm.Recoup_ClaimID !== null
          ) {
            if (
              itm.claimStatusID === 1 ||
              itm.claimStatusID === 3 ||
              itm.claimStatusID === 2
            ) {
              claimStasList.push(itm);
            }
          } else if (
            this.restrictDropdownForm.ClaimStatusID === 2 &&
            this.restrictDropdownForm.Recoup_ClaimID !== null
          ) {
            if (itm.claimStatusID === 3 || itm.claimStatusID === 2) {
              claimStasList.push(itm);
            }
          } else if (
            this.restrictDropdownForm.ClaimStatusID === 1 &&
            this.restrictDropdownForm.Recoup_ClaimID === null &&
            this.restrictDropdownForm.PaymentTypeID !== 1
          ) {
            if (
              itm.claimStatusID === 1 ||
              itm.claimStatusID === 3 ||
              itm.claimStatusID === 2
            ) {
              claimStasList.push(itm);
            }
            this.claimStatusDisable = true;
            this.disableEXPdate = true;
          } else if (this.restrictDropdownForm.ClaimStatusID === 3) {
            this.claimStatusDisable = true;
          } else if (this.restrictDropdownForm.ClaimStatusID === 4) {
            if (itm.claimStatusID === 3 || itm.claimStatusID === 4) {
              claimStasList.push(itm);
            }
          } else if (this.restrictDropdownForm.ClaimStatusID === 5) {
            if (itm.claimStatusID === 2 || itm.claimStatusID === 5) {
              claimStasList.push(itm);
            }
          } else if (this.restrictDropdownForm.ClaimStatusID === 6) {
            if (
              itm.claimStatusID === 2 ||
              itm.claimStatusID === 5 ||
              itm.claimStatusID === 3 ||
              itm.claimStatusID === 6
            ) {
              claimStasList.push(itm);
            }
          } else if (this.restrictDropdownForm.ClaimStatusID === 7) {
            this.claimStatusDisable = true;
            this.isDisabled = true;
          } else if (this.restrictDropdownForm.ClaimStatusID === 2) {
            if (
              itm.claimStatusID === 3 ||
              itm.claimStatusID === 2 ||
              itm.claimStatusID === 5
            ) {
              claimStasList.push(itm);
            }
          } else {
            claimStasList.push(itm);
          }
        } else {
          if (itm.claimStatusID === 2) {
            claimStasList.push(itm);
          }
        }
      });
      this.claimStatusList = claimStasList;
      this.getClaimsStatus();
    });
  }

  getClaimsStatus() {
    this.metaData = this.claimStatusList;
    if (this.isUpdate) {
    } else {
      this.claimStatus = this.metaData[0];
    }

    //[{"claimStatus":"Approved","claimStatusID":6},
    //{"claimStatus":"Denied","claimStatusID":5},
    //{"claimStatus":"Draft","claimStatusID":7},
    //{"claimStatus":"Hold","claimStatusID":2},
    //{"claimStatus":"Posted","claimStatusID":1},
    //{"claimStatus":"Recoup","claimStatusID":4},
    //{"claimStatus":"Void","claimStatusID":3}]
  }
  appendRouteParam(id) {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        clientId: id,
      },
      queryParamsHandling: "merge",
      skipLocationChange: true,
    });
  }
  ngOnDestroy() {
    localStorage.setItem("claimID", null);
  }

  async getClaimProvider() {
    let claimProviderReq = {
      beginDate: this._localValues.stringFormatDatetime(
        this.authFormDetail.claim_beginDate
      ),
      sponsorID: this.currentSponsorID,
    };

    let claimProviderRes = await this._openCards.getSponsorProviders(
      claimProviderReq
    );
    this.pay_claim_Name = claimProviderRes.dropDown[0];
  }

  setClaimAuthorizationProvider(authClaim?: any, payType?: string) {
    if (authClaim.paySponsor) {
      this.getClaimProvider();
    } else {
      if (payType === "provider") {
        this.pay_claim_Name = authClaim.providerID;
      } else {
        this.pay_claim_Name = authClaim.payeeID;
      }
    }
  }

  async setLabelNameForClaimProvider() {
    let lableReq = {
      authorizationID:
        parseInt(localStorage.getItem("authorizationId")) -
        this._openCards.getHasKey(),
      sponsorID: this.currentSponsorID,
    };
    let labelRes = await this._openCards.getLabelNameForClaimProider(lableReq);
    this.claimProviderLabel = labelRes.labelName;
  }
}
