import { Component, OnInit } from "@angular/core";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { DirectAuth } from "./direct-auth";
import { isNullOrUndefined } from "util";
import * as moment from "moment";
import { Router, ActivatedRoute } from "@angular/router";
import {LocalValues} from "../local-values";
import swal from "sweetalert2";
import { CaseTeamService } from "../case-team/case-team.service";
import { Subject, Observable, Subscription, of } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-direct-authorisation-form-view",
  templateUrl: "./direct-authorisation-form-view.component.html",
  styleUrls: ["./direct-authorisation-form-view.component.scss"],
})
export class DirectAuthorisationFormViewComponent implements OnInit {
  directAuth: DirectAuth = new DirectAuth();
  breadcrumbs = [];
  isPayee: boolean = false;
  isAttachmentRequired = false;
  req: any;
  isEdit = true;
  claimData: any;
  claimStatus: any;
  metaData: any = [];
  procodeValidateArray = [];
  filteredProcodesData = [];
  isClaimStatus = false;
  isPayeeView = true;
  claimStatusToRecoupNull = false;
  searchTerm$ = new Subject<string>();
  isFormLog = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  clientID: any;
  referralID: any;
  isClaimPayee = false;
  constructor(
    public _route: ActivatedRoute,
    public _router: Router,
    public _CaseTeamService: CaseTeamService,
    public _openCards: OpencardsService,
    public _localValues: LocalValues
  ) {}
  isSave = false;
  ngOnInit() {
    if (this._router.url === "/claims/list/cs-direct/form/view") {
      this.breadcrumbs.push(
        {
          label: "CS-Claim List",
          href: "/claims/list/cs-claim-list",
          active: "",
        },
        { label: "Direct Authorization", active: "active" }
      );
      this.req = {
        claimID:
          parseInt(localStorage.getItem("auth_claimID")) -
          this._openCards.getHasKey(),
      };
    } else if (this._router.url === "/claims/list/provider/cs-claim_provider_view/directAuth") {
      this.breadcrumbs.push(
        {
          label: "CS-Claim List",
          href: "/csClaimProvider",
          active: "",
        },
        { label: "Direct Authorization", active: "active" }
      );
      this.req = {
        claimID:
          parseInt(localStorage.getItem("auth_claimID")) -
          this._openCards.getHasKey(),
      };
    } else if (this._router.url === "/claims/list/csClaimPayee-form/directAuth") {
      this.breadcrumbs.push(
        {
          label: "CS-Claim Payee List",
          href: "/cs_claim_payee",
          active: "",
        },
        { label: "Direct Authorization", active: "active" }
      );
      this.req = {
        claimID:
          parseInt(localStorage.getItem("auth_claimID")) -
          this._openCards.getHasKey(),
      };
    } else if (
      this._router.url ===
      "/claims/list/payee/serviceClaim_otherService/directAuth/form/view"
    ) {
      this.breadcrumbs = [
        { label: "Payee List", href: "/reports/payee/view", active: "" },
        { label: "Payee Form", href: "/reports/payee/detail", active: "" },
        {
          label: "Payee (Service Claim) Direct Authorizations",
          href: "/payee/serviceClaim/directAuth",
          active: "",
        },
        {
          label: "Payee (Service Claim) Direct Authorizations Form",
          href: "",
          active: "active",
        },
      ];
      this.req = {
        claimID:
          parseInt(localStorage.getItem("auth_claimID")) -
          this._openCards.getHasKey(),
      };
      this.isPayeeView = false;
    } else if (
      this._router.url.includes(
        "/claims/list/dir_cs-payee/dir_csPayee-directAuth"
      )
    ) {
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        { label: "CS - Payee List", href: "/csPayee", active: "" },
        { label: "CS - Payee Form", href: "/csPayee/payeeform", active: "" },
        {
          label: "CS - Payee - Direct Authorization List",
          href: "/csPayee/payeeform/payee-DirectAuthList",
          active: "",
        },
        {
          label: "CS - Payee - Direct Authorization Form",
          href: "",
          active: "active",
        },
      ];
      this.req = {
        claimID:
          parseInt(localStorage.getItem("auth_claimID")) -
          this._openCards.getHasKey(),
      };
    } else if (
      this._router.url === "/claims/list/cs-payee/csPayee-directAuth/new"
    ) {
      this.isSave = true;
      this.isEdit = false;
      this.clientID =
        parseInt(localStorage.getItem("clientId")) -
        this._openCards.getHasKey();
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        { label: "CS - Payee List", href: "/csPayee", active: "" },
        { label: "CS - Payee Form", href: "/csPayee/payeeform", active: "" },
        {
          label: "CS - Payee - Direct Authorization List",
          href: "/csPayee/payeeform/payee-DirectAuthList",
          active: "",
        },
        {
          label: "CS - Payee - Direct Authorization Form",
          href: "",
          active: "active",
        },
      ];

      let me_Req = {
        clientID: parseInt(localStorage.getItem("payeeID")),
      };
      this._openCards.getReferralRec(me_Req).then((data) => {
        this.referralID = data["recentContract"].ReferralID;
      });
    } else {
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
          label: "Direct Authorization List",
          href: "/claims/list/direct/auth/list",
          active: ''
        },
        {
          label: 'Direct Authorization Form',
          href: "/claims/list/direct/form/view",
          active: ''
        },
      );
      this.req = { claimID: parseInt(localStorage.getItem("claimId")) };
    }
    // this.allClaims();
    if (!this.isSave) {
      this.getAuthDetails();
      this.isAttachmentRequired = true;
      this.setSearchSubject();
    }
    this.getProcodeBasedOnReferralType("event");
    if (this._router.url.includes("/claims/list/csClaimPayee-form/directAuth")) {
      this.isClaimPayee = true;
    }
  }
  claimStatusID: any;
  restrictDropdownForm: any;
  paymentDueDate: any;
  getAuthDetails() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    console.log(
      "localStorage.getItem('claimId')>>>>><<<<",
      localStorage.getItem("claimId")
    );

    this._openCards.getClaimIDDetails(this.req).then((data) => {
      localStorage.setItem(
        "clientId",
        data.claim.clientID.clientID + this._openCards.getHasKey()
      );
      this.appendRouteParam(data.claim.clientID.clientID);
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.claim.changedBy)
        ? data.claim.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(data.claim.changedDate)
        ? moment(data.claim.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.claim.enteredBy)
        ? data.claim.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.claim.enteredDate)
        ? moment(data.claim.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";

      // this.isClaimStatus = true;
      if (data) {
        if (data.claim.providerID !== null) {
          this.isPayee = false;
        } else if (data.claim.payeeID !== null) {
          this.isPayee = true;
        }
        this.directAuth = data.claim;
        this.directAuth.payorRate = this.directAuth.providerRate;
        this.claimData = data.claim;
        this.claimStatus = data.claim.claimStatusID;
        this.isUpdate = true;

        this.restrictDropdownForm = {
          ClaimStatusID: data.claim.claimStatusID.claimStatusID,
          Recoup_ClaimID: data.claim.recoup_ClaimID,
          PaymentTypeID: data.claim.paymentTypeID
            ? data.claim.paymentTypeID.paymentTypeID
            : null,
        };
        this.allClaims();
        !isNullOrUndefined(data.claim.beginDate)
          ? (this.directAuth.beginDate = new Date(data.claim.beginDate))
          : null;
        !isNullOrUndefined(data.claim.endDate)
          ? (this.directAuth.endDate = new Date(data.claim.endDate))
          : null;
        !isNullOrUndefined(data.claim.receivedDate)
          ? (this.directAuth.receivedDate = new Date(data.claim.receivedDate))
          : null;
        !isNullOrUndefined(data.claim.unitTypeID)
          ? (this.directAuth.unitType = data.claim.unitTypeID)
          : null;
        !isNullOrUndefined(data.claim.procodeID)
          ? (this.directAuth.procode = data.claim.procodeID)
          : null;
        if (this.directAuth.procode) {
          this.directAuth.procode[
            "procode"
          ] = `${this.directAuth.procode["procode"]}:${this.directAuth.procode["categoryOfService"]}`;
        }
        !isNullOrUndefined(data.claim.paymentTypeID)
          ? (this.directAuth.paymentType = data.claim.paymentTypeID)
          : null;
        !isNullOrUndefined(data.claim.payeeID)
          ? (this.directAuth.payeeName = data.claim.payeeID)
          : null;
        !isNullOrUndefined(data.claim.dateOverride)
          ? (this.directAuth.dateOverride = data.claim.dateOverride)
          : null;
        !isNullOrUndefined(data.claim.providerRate)
          ? (this.directAuth.providerRate = data.claim.providerRate)
          : null;
        !isNullOrUndefined(data.claim.providerID)
          ? (this.directAuth.providerName = data.claim.providerID)
          : null;
        !isNullOrUndefined(data.claim.payorRate)
          ? (this.directAuth.payorRate = data.claim.payorRate)
          : null;
        !isNullOrUndefined(data.claim.paymentDueDate)
          ? (this.paymentDueDate = new Date(data.claim.paymentDueDate))
          : null;
        !isNullOrUndefined(data.claim.units)
          ? (this.directAuth.units = data.claim.units.toFixed(2))
          : null;
        loader.style.display = "none";
      } else {
        loader.style.display = "none";
      }
    });
  }

  getMetaData(event, label) {
    let reqObj: any,
      request: any;
    switch (label) {
      case "procode":
        this.filteredProcodes(event);
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

  /**Attachment docs navigations */
  navigateTo() {
    let currentURL: string = this._router.url,
      navigateURL: string;

    let directAuthorizationUrl = "/claims/list/direct/form/view";

    if (currentURL.includes(directAuthorizationUrl)) {
      navigateURL = "/reports/attachment-document/rfc/rfc-claims";
    }
    return this._router.navigate([navigateURL], {
      queryParamsHandling: "preserve",
    });
  }

  // async getClaimsStatus() {
  //   this.metaData = await this._openCards.getClaimsStatus();
  // }
  claimStatusList = [];
  claimStatusDisable = false;
  disableEXPdate = true;
  isDisabled = false;
  isUpdate = false;
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
            this.claimStatusToRecoupNull = true;
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
            // this.claimStatusDisable = true;
            this.disableEXPdate = true;
          } else if (this.restrictDropdownForm.ClaimStatusID === 3) {
            // this.claimStatusDisable = true;
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
            // this.claimStatusDisable = true;
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
    console.log("this.restrictDropdownForm>>>>>", this.restrictDropdownForm);
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
  showDateOverlap = false;
  showValidateClaim() {
    var client_ID;
    var authorizationID;
    var procodeID;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    if (this.isSave) {
      client_ID = null;
      authorizationID = null;
      procodeID = this.directAuth.procode.ProcodeID;
    } else {
      procodeID = this.directAuth.procode.procodeID;
      authorizationID = this.claimData.authorizationID;
      client_ID = !isNullOrUndefined(this.claimData.clientID)
        ? this.claimData.clientID.clientID
        : null;
    }
    var req = {
      clientID: client_ID,
      authorizationID: authorizationID,
      beginDate: this.directAuth.beginDate,
      endDate: this.directAuth.endDate,
      procodeID: procodeID,
      units: parseFloat(this.directAuth.units),
    };
    this._openCards.getAuthValidate(req).then((data) => {
      loader.style.display = "none";
      console.log("data>>>>>>>>>>", JSON.stringify(data.dateValidation));
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
              this.claimsStatusUpdate();
            } else {
              this.showDateOverlap = false;
            }
          });
        } else {
          this.claimsStatusUpdate();
        }
      } else {
        this.claimsStatusUpdate();
      }
    });
  }

  claimsStatusUpdate() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    // let request = {
    //   claimID: parseInt(localStorage.getItem('claimId')),
    //   staffID: parseInt(localStorage.getItem('clientId')) - this._openCards.getHasKey(),
    //   referralID: parseInt(localStorage.getItem('referralId')) - this._openCards.getHasKey(),
    //   beginDate: this._localValues.stringFormatDatetime(Date.parse(this.claimData.beginDate)),
    //   endDate: this._localValues.stringFormatDatetime(Date.parse(this.claimData.endDate)),
    //   procodeID: this.claimData.procodeID.procodeID,
    //   clientID: parseInt(localStorage.getItem('referralId')) - this._openCards.getHasKey(),
    //   claimStatusID: this.claimStatus.claimStatusID
    // };
    let request_claim = {
      // "claimID": this.req.claimID,
      staffID: isNullOrUndefined(localStorage.getItem("UserId"))
        ? 4620
        : localStorage.getItem("UserId"),
      // "providerID": !isNullOrUndefined(this.claimData.providerID) ? this.claimData.providerID.providerID : null,
      // "payeeID": !isNullOrUndefined(this.claimData.payeeID) ? this.claimData.payeeID.payeeID : null,
      // "referralID": !isNullOrUndefined(this.claimData.referralID) ? this.claimData.referralID.referralID : null,
      beginDate: this.directAuth.beginDate,
      endDate: this.directAuth.endDate,
      procodeID: this.directAuth.procode.procodeID,
      claimStatusID: this.claimStatus.claimStatusID,
      // "clientID": !isNullOrUndefined(this.claimData.clientID) ? this.claimData.clientID.clientID : null,
      dateOverride: this.directAuth.dateOverride,
      // "doNotPay": this.claimData.doNotPay,
      notes: this.directAuth.notes,
      paymentTypeID: this.directAuth.paymentType.paymentTypeID,
      // "paymentDueDate": this.claimData.paymentDueDate,
      paymentNotes: this.directAuth.paymentNotes,
      payorRate: this.directAuth.payorRate,
      providerRate: this.directAuth.providerRate,
      receivedDate: this.directAuth.receivedDate,
      // "totalPayorRate": (this.directAuth.units) * this.directAuth.payorRate,
      totalProviderRate: this.directAuth.units * this.directAuth.providerRate,
      // "totalPayorRate": this.claimData.totalPayorRate,
      // "totalProviderRate": this.claimData.totalProviderRate,
      units: parseFloat(this.directAuth.units),
      unitTypeID: this.directAuth.unitType.unitTypeID,
      // "authorizationID": this.claimData.authorizationID,
      // "glKey": this.claimData.glKey,
      // "sfaOfficeID": this.claimData.sfaOfficeID
    };
    if (this.isSave) {
      request_claim["payeeID"] = parseInt(localStorage.getItem("payeeID"));
      request_claim["providerID"] = null;
      request_claim["clientID"] = this.clientID;
      request_claim["claimID"] = null;
      request_claim["referralID"] = this.referralID;
      request_claim["doNotPay"] = null;
      request_claim["paymentDueDate"] = null;
      request_claim["totalPayorRate"] = null;
      request_claim["glKey"] = null;
      request_claim["sfaOfficeID"] = null;
      request_claim["authorizationID"] = null;
    } else {
      request_claim["providerID"] = !isNullOrUndefined(
        this.claimData.providerID
      )
        ? this.claimData.providerID.providerID
        : null;
      request_claim["payeeID"] = !isNullOrUndefined(this.claimData.payeeID)
        ? this.claimData.payeeID.payeeID
        : null;
      request_claim["clientID"] = !isNullOrUndefined(this.claimData.clientID)
        ? this.claimData.clientID.clientID
        : null;
      request_claim["claimID"] = this.req.claimID;
      request_claim["referralID"] = !isNullOrUndefined(
        this.claimData.referralID
      )
        ? this.claimData.referralID.referralID
        : null;
      request_claim["doNotPay"] = this.claimData.doNotPay;
      request_claim["paymentDueDate"] = this.claimData.paymentDueDate;
      request_claim["totalPayorRate"] =
        this.directAuth.units * this.directAuth.payorRate;
      request_claim["glKey"] = this.claimData.glKey;
      request_claim["sfaOfficeID"] = this.claimData.sfaOfficeID;
      request_claim["authorizationID"] = this.claimData.authorizationID;
    }
    // request['payeeID'] = !isNullOrUndefined(this.claimData.payeeID) ? this.claimData.payeeID.payeeID : null;
    // request['providerID'] = !isNullOrUndefined(this.claimData.providerID) ? this.claimData.providerID.providerID : null;
    this._openCards.updateClaims(request_claim).then((data: any) => {
      if (data.responseStatus) {
        loader.style.display = "none";
        swal("Success", "Claims status successfully updated!", "success");
        if (this._router.url === "/claims/list/cs-direct/form/view") {
          this._router.navigate(["/claims/list/cs-claim-list"]);
        } else if (this._router.url.includes("/claims/list/provider/cs-claim_provider_view/directAuth")) {
          this._router.navigate(["/csClaimProvider"]);
        } else if (this._router.url.includes("/claims/list/csClaimPayee-form/directAuth")) {
          this._router.navigate(['/cs_claim_payee']);
        } else {
          window.history.back();
        }
      } else {
        loader.style.display = "none";
        swal("Info", data.responseMessage, "warning");
      }
    });
  }

  editForm() {
    this.isEdit = false;
    this.payorAndProviderRateControlBasedOnClaims();
    if (this.claimStatus.claimStatusID == 2) {
      // this.isClaimStatus = false;
      this.claimStatusToRecoupNull = false;
    } else if (
      this.restrictDropdownForm.ClaimStatusID === 2 &&
      this.restrictDropdownForm.Recoup_ClaimID === null
    ) {
      this.claimStatusToRecoupNull = true;
    } else {
      this.claimStatusToRecoupNull = true;
      // this.isClaimStatus = true;
    }
  }
  allunitTypes = [];
  getUnitType(event) {
    let req;
    req = { Object: "unitType", value: event.query };
    return this._CaseTeamService.getSearchList(req).then((data) => {
      this.allunitTypes = data.dropDown;
    });
  }
  discard = () => {
    window.history.back();
  };
  payLists = [];
  payeeLists = [];
  providerLists = [];
  getPaymentType(event) {
    let req;
    req = { Object: "paymentType", value: event.query };
    return this._CaseTeamService.getSearchList(req).then((data) => {
      this.payLists = data.dropDown;
    });
  }
  getPayeeList(event) {
    let req;
    req = { Object: "payee", value: event.query };
    return this._CaseTeamService.getSearchList(req).then((data) => {
      this.payeeLists = data.dropDown;
    });
  }
  getProviderList(event) {
    let req;
    req = { Object: "provider", value: event.query };
    return this._CaseTeamService.getSearchList(req).then((data) => {
      this.providerLists = data.dropDown;
    });
  }
  getSelectStatus(event) {
    if (event.claimStatusID == 2) {
      // this.isClaimStatus = false;
    } else {
      // this.isClaimStatus = false;
    }
  }
  allProcodes = [];
  getProcode(event) {
    let req;
    req = { Object: "procode", value: event.query };
    return this._CaseTeamService.getSearchList(req).then((data) => {
      data.dropDown.map((data) => {
        data["fullName"] = data.procode + " - " + data.categoryOfService;
      });
      this.allProcodes = data.dropDown;
    });
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

  procodeList: any;
  getProcodeBasedOnReferralType(event) {
    const referralTypeID =
      this.directAuth["referralID"] &&
      this.directAuth["referralID"].referralTypeID &&
      this.directAuth["referralID"].referralTypeID.referralTypeID;
    const request = {
      referralTypeID: referralTypeID || 4,
      beginDate: Date.parse(this.directAuth.beginDate || "2020-01-01 00:00:00"),
    };
    this._openCards.getClaimProcodeBasedOnReferralType(request).then((data) => {
      data.procode.forEach((element) => {
        element["procodeID"] = element.ProcodeID;
        element["procode"] = element.ProcodeName;
      });
      if (event.query != "") {
        setTimeout(
          data.procode.filter((element) => {
            return element.ProcodeName.includes(event.query);
          }),
          2000
        );
      }
      this.allProcodes = data.procode;
    });
  }

  filteredProcodes(event) {
    this.filteredProcodesData = [];
    this.allProcodes.filter((item) => {
      if (item.procode.indexOf(event.query) !== -1) {
        this.filteredProcodesData.push(item);
      }
    });
  }
  setSearchSubject() {
    this.subscribeSearch(this.searchTerm$).subscribe((results) => { });
  }

  subscribeSearch(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term) => this.search(term))
    );
  }

  search(event): any {
    const referralTypeID =
      this.directAuth["referralID"] &&
      this.directAuth["referralID"].referralTypeID &&
      this.directAuth["referralID"].referralTypeID.referralTypeID;
    const request = {
      referralTypeID: referralTypeID || 4,
      beginDate: Date.parse(this.directAuth.beginDate || "2020-01-01 00:00:00"),
    };

    this._openCards.getClaimProcodeBasedOnReferralType(request).then((data) => {
      data.procode.forEach((element) => {
        element["procodeID"] = element.ProcodeID;
        element["procode"] = element.ProcodeName;
      });
      if (event.query == "") {
        this.allProcodes = data.procode;
      } else {
        let procodes = [];
        procodes = data.procode.filter((element) => {
          element.ProcodeName = element.ProcodeName.toLowerCase();
          return element.ProcodeName.includes(event.query.toLowerCase());
        });
        this.allProcodes = procodes;
      }

      return of(data.procode);
    });
  }
  viewClientInfo() {
    this._router.navigate(["/csPayeeInfoClient"]);
  }
  currentJumpToTree() {
    if (this.isPayee) {
      this._router.navigate(["/csClaimInfo/PayeeForm"]);
    } else {
      this._router.navigate(["/csClaimInfo/ProviderForm"]);
    }
  }
  getUnitsRate() {
    this.directAuth.units = this.directAuth.units.toFixed(2);
  }
  getPayorRate() {
    this.directAuth.payorRate = this.directAuth.payorRate.toFixed(2);
  }
  getProviderRate() {
    this.directAuth.providerRate = this.directAuth.providerRate.toFixed(2);
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
      this.isClaimStatus = true;
    } else {
      this.isClaimStatus = false;
    }
  }
}
