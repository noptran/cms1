import { Component, OnInit } from "@angular/core";
import { PersonTypesProfileService } from "./../components/person-types-profile-info-module/person-types-profile.service";
import { ProviderInfoService } from "./../components/provider-info-module/provider-info.service";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { isNullOrUndefined } from "util";
import { Router } from "@angular/router";
import { LocalValues } from "../local-values";
import swal from "sweetalert2";
import { CaseTeamService } from "../case-team/case-team.service";
import { DirectAuth } from "../direct-authorisation-form-view/direct-auth";
import * as moment from 'moment';
import { PagesizeService } from "../pagesize/pagesize.service";

@Component({
  selector: "app-cs-client-profile",
  templateUrl: "./cs-client-profile.component.html",
  styleUrls: ["./cs-client-profile.component.scss"],
})
export class CsClientProfileComponent implements OnInit {
  showMoreProfileData: any;
  showMoreProviderProfile: any;
  breadcrumbs = [];
  isClient = false;
  isProvider = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  constructor(
    private _CaseTeamService: CaseTeamService,
    private _localValues: LocalValues,
    private _router: Router,
    private _service: PersonTypesProfileService,
    private _opencards: OpencardsService,
    private _providerservice: ProviderInfoService,
    public _pageSize: PagesizeService,
  ) { }
  selectedPay = [];
  public isPopUp = false;

  defaultColDef: any;

  ngOnInit() {
    if (this._router.url.includes("/csClient/csClientProfile")) {
      this.getShowMoreProfileInfo();
      this.isClient = true;
      this.breadcrumbs.push(
        { label: "CS-Client List", href: "/csClientList", active: "" },
        { label: "CS-Client Profile", href: "", active: "active" },
      );
    } else if (this._router.url.includes("/csProvider/csProviderForm")) {
      this.getProviderProfileInfo();
      this.isProvider = true;
      this.breadcrumbs.push(
        { label: "CS-Provider List", href: "/csProviderList", active: "" },
        { label: "CS-Provider Profile", href: "", active: "active" },
      );
    }
    this.selectedPay = [
      { name: "Provider", code: "provider" },
      { name: "Payee", code: "Payee" },
    ];
    this.defFormValues();
  }
  getShowMoreProfileInfo() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {
      clientID:
        parseInt(localStorage.getItem("clientId")) -
        this._opencards.getHasKey(),
    };
    this._service.getClientProfileInfo(req).then((data) => {
      this.showMoreProfileData = data;
      loader.style.display = "none";
    });
  }

  getProviderProfileInfo() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {
      providerID: parseInt(localStorage.getItem("providerID")) -
        this._opencards.getHasKey()
    };
    this._providerservice.getProviderInfo(req).then((data) => {
      this.showMoreProviderProfile = data;
      loader.style.display = "none";
    });
  }

  isPopDirectAuthListWindow = false;
  authHeader: any;
  rowData: any;
  totalCount: any;
  initial = 1;
  end = 100;
  headers = [];
  rawdata = [];
  columnDefs = [];
  authInfoLablel: any;
  isPlesWait = false;
  selectedClaimID: number;
  showDirectAuthList(authInfo) {
    this.authInfoLablel = authInfo;
    this.rowData = [];
    this.initial = 1;
    this.end = 100;
    this.headers = [];
    this.rawdata = [];
    this.columnDefs = [];
    this.authHeader = authInfo;
    this.isPopDirectAuthListWindow = true;
    if (this.isClient) {
      if (authInfo === "Direct Authorization") {
        this.getAllListView(1, 100);
      } else {
        this.getAuthListView(1, 100);
      }
    } else {
      if (authInfo === "Direct Authorization") {
        this.getAllDirectListView(1, 100);
      } else {
        this.getProviderAuthListView(1, 100);
      }
    }
  }

  getAllListView(initial, end) {
    this.isPlesWait = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      clientID:
        parseInt(localStorage.getItem("clientId")) -
        this._opencards.getHasKey(),
      beginPagination: initial,
      endPagination: end,
    };
    this.getReferalID();
    this._opencards.getCsClientDirectList(me_Req).then((data) => {
      this.isPlesWait = false;
      this.generateListView(
        data["totalCount"],
        data["directAuthorizationList"]
      );
      loader.style.display = "none";
    });
  }
  getAuthListView(initial, end) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.isPlesWait = true;
    let me_Req = {
      clientID:
        parseInt(localStorage.getItem("clientId")) -
        this._opencards.getHasKey(),
      beginPagination: initial,
      endPagination: end,
    };
    this._opencards.getCsClientAuthList(me_Req).then((data) => {
      this.isPlesWait = false;
      this.generateListView(data["totalCount"], data["authorizationList"]);
      loader.style.display = "none";
    });
  }
  getAllDirectListView(initial, end) {
    this.isPlesWait = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      providerID:
        parseInt(localStorage.getItem("providerID")) -
        this._opencards.getHasKey(),
      beginPagination: initial,
      endPagination: end,
    };
    this.getReferalID();
    this._opencards.getCSProviderDirectAuthList(me_Req).then((data) => {
      this.isPlesWait = false;
      this.generateListView(
        data["totalCount"],
        data["directAuthorizationList"]
      );
      loader.style.display = "none";
    });
  }
  getProviderAuthListView(initial, end) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.isPlesWait = true;
    let me_Req = {
      providerID:
        parseInt(localStorage.getItem("providerID")) -
        this._opencards.getHasKey(),
      beginPagination: initial,
      endPagination: end,
    };
    this._opencards.getCSProviderAuthList(me_Req).then((data) => {
      this.isPlesWait = false;
      this.generateListView(data["totalCount"], data["authorizationList"]);
      loader.style.display = "none";
    });
  }
  gridOptions = {};
  generateListView(totalCount, data) {
    let test = [];
    this.totalCount = totalCount;
    this.rowData = data;
    this.gridOptions["getRowStyle"] = (params) => {
      let color = "black";
      if (params.data.status == "LOWPRIORITY") {
        color = "gray";
      }
      return { color: color };
    };
    if (this.rowData.length > 0) {
      this.headers.push(Object.keys(this.rowData[0]));
      this.headers[0].map(function (result) {
        let data = {
          headerName: result
            .replace(/\b\w/g, (l) => l.toUpperCase())
            .replace(/([A-Z])/g, " $1")
            .trim(),
          field: result,
        };
        test.push(data);
      });
      test.sort((a, b) => a["order"] - b["order"]);
      this.rawdata.push(test);
      this.columnDefs = this.rawdata[0];
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
    }
  }

  showAuthorizationFormView = false;
  isPopDirectAuthFormWindow = false;
  onRowSelected(event) {
    if (this.authInfoLablel === "Direct Authorization") {
      console.log("Direct Authorization..event>>>>", event);
      this.selectedClaimID = event.data.claimID;
      this.directAuth = {
        beginDate: "",
        dateOverride: "",
        endDate: "",
        units: "",
        unitType: "",
        payorRate: "",
        providerRate: "",
        procode: "",
        paymentType: "",
        payeeName: "",
        receivedDate: "",
        paymentNotes: "",
        notes: "",
        status: "",
        enteredBy: "",
        glkey: "",
        providerName: "",
        claimID: "",
      };
      this.isPopDirectAuthFormWindow = true;
      this.getAuthDetails(event.data.claimID);
    } else {
      this.get_authID = event.data.authorizationID;
      this.showAuthorizationFormView = true;
    }
  }
  get_authID: any;
  closeModelComp(event, type) {
    console.log("event>>>>>>>", event);
    this.showAuthorizationFormView = false;
  }

  ////direct Authorization form view////

  directAuth: DirectAuth = new DirectAuth();
  isPayee: boolean = false;
  isAttachmentRequired = false;
  req: any;
  isEdit = false;
  claimData: any;
  claimStatus: any;
  metaData: any = [];
  isClaimStatus = false;
  isPayeeView = true;
  claimStatusToRecoupNull = false;
  claimStatusID: any;
  restrictDropdownForm: any;
  claim_pay: any;
  getAuthDetails(claimID) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.req = { claimID: claimID };
    this.isPlesWait = true;
    this._opencards.getClaimIDDetails(this.req).then((data) => {
      this.isPlesWait = false;
      this.isEdit = true;
      this.isClaimStatus = true;
      if (data) {
        if (data.claim.providerID !== null) {
          this.isPayee = false;
          this.claim_pay = { name: "Provider", code: "provider" };
        } else if (data.claim.payeeID !== null) {
          this.claim_pay = { name: "Payee", code: "Payee" };
          this.isPayee = true;
        }
        this.directAuth = data.claim;
        this.directAuth.payorRate = this.directAuth.providerRate;
        this.claimData = data.claim;
        this.isFormLog = true;
        this.claimStatus = data.claim.claimStatusID;
        this.isUpdate = true;
        this.formLogInfo.changedBy = !isNullOrUndefined(data.claim.changedBy) ? data.claim.changedBy : '------';
        this.formLogInfo.changedDate = !isNullOrUndefined(data.claim.changedDate) ? moment(data.claim.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
        this.formLogInfo.enteredBy = !isNullOrUndefined(data.claim.enteredBy) ? data.claim.enteredBy : '------';
        this.formLogInfo.enteredDate = !isNullOrUndefined(data.claim.enteredDate) ? moment(data.claim.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
        this.restrictDropdownForm = {
          ClaimStatusID: data.claim.claimStatusID.claimStatusID,
          Recoup_ClaimID: data.claim.recoup_ClaimID,
          PaymentTypeID: data.claim.paymentTypeID.paymentTypeID,
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

        !isNullOrUndefined(data.claim.units)
          ? (this.directAuth.units = data.claim.units.toFixed(2))
          : null;
        loader.style.display = "none";
        this.isAttachmentRequired = true;
        this.isPopUp = true;
      } else {
        loader.style.display = "none";
      }
    });
  }
  getSelectPay(event) {
    console.log("event>>>>>", event.value);
    if (event.value.name === "Payee") {
      this.isPayee = true;
    } else {
      this.isPayee = false;
    }
  }
  /**Attachment docs navigations */

  // async getClaimsStatus() {
  //   this.metaData = await this._opencards.getClaimsStatus();
  // }
  claimStatusList = [];
  claimStatusDisable = false;
  disableEXPdate = true;
  isDisabled = false;
  isUpdate = false;
  allClaims() {
    var claimStasList = [];
    this._opencards.getClaimsStatus().then((data) => {
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
            this.claimStatus = itm;
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

  claimsStatusUpdate() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.isPlesWait = true;
    // let request = {
    //   claimID: parseInt(localStorage.getItem('claimId')),
    //   staffID: parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey(),
    //   referralID: parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey(),
    //   beginDate: this._localValues.stringFormatDatetime(Date.parse(this.claimData.beginDate)),
    //   endDate: this._localValues.stringFormatDatetime(Date.parse(this.claimData.endDate)),
    //   procodeID: this.claimData.procodeID.procodeID,
    //   clientID: parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey(),
    //   claimStatusID: this.claimStatus.claimStatusID
    // };
    let request_claim = {
      staffID: isNullOrUndefined(localStorage.getItem("UserId"))
        ? 4620
        : localStorage.getItem("UserId"),
      providerID: !isNullOrUndefined(this.directAuth.providerName)
        ? this.directAuth.providerName.providerID
        : null,
      payeeID: !isNullOrUndefined(this.directAuth.payeeName)
        ? this.directAuth.payeeName.payeeID
        : null,
      // "referralID": !isNullOrUndefined(this.claimData.referralID) ? this.claimData.referralID.referralID : null,
      beginDate: this.directAuth.beginDate,
      endDate: this.directAuth.endDate,
      procodeID: this.directAuth.procode.procodeID,
      claimStatusID: this.claimStatus.claimStatusID,
      clientID:
        parseInt(localStorage.getItem("clientId")) -
        this._opencards.getHasKey(),
      dateOverride: this.directAuth.dateOverride,
      // "doNotPay": this.claimData.doNotPay,
      notes: this.directAuth.notes,
      paymentTypeID: this.directAuth.paymentType.paymentTypeID,
      // "paymentDueDate": this.claimData.paymentDueDate,
      paymentNotes: this.directAuth.paymentNotes,
      payorRate: this.directAuth.payorRate,
      providerRate: this.directAuth.providerRate,
      receivedDate: this.directAuth.receivedDate,
      // "totalPayorRate": this.claimData.totalPayorRate,
      // "totalProviderRate": this.claimData.totalProviderRate,
      totalProviderRate: this.directAuth.units * this.directAuth.providerRate,
      units: this.directAuth.units,
      // "unitTypeID": this.directAuth.unitType.unitTypeID,
      // "authorizationID": this.claimData.authorizationID,
      // "glKey": this.claimData.glKey,
      // "sfaOfficeID": this.claimData.sfaOfficeID
    };
    // request['payeeID'] = !isNullOrUndefined(this.claimData.payeeID) ? this.claimData.payeeID.payeeID : null;
    // request['providerID'] = !isNullOrUndefined(this.claimData.providerID) ? this.claimData.providerID.providerID : null;
    if (this.isUpdate) {
      request_claim["claimID"] = this.req.claimID;
      (request_claim["referralID"] = this.referralID),
        (request_claim["doNotPay"] = this.claimData.doNotPay);
      request_claim["paymentDueDate"] = this.claimData.paymentDueDate;
      request_claim["totalPayorRate"] = this.claimData.totalPayorRate;
      request_claim["glKey"] = this.claimData.glKey;
      request_claim["sfaOfficeID"] = this.claimData.sfaOfficeID;
      request_claim["authorizationID"] = this.claimData.authorizationID;
      // request_claim["totalProviderRate"] = this.claimData.totalProviderRate;
    } else {
      request_claim["claimID"] = null;
      (request_claim["referralID"] = this.referralID),
        (request_claim["doNotPay"] = null);
      request_claim["paymentDueDate"] = null;
      request_claim["totalPayorRate"] = null;
      request_claim["glKey"] = null;
      request_claim["sfaOfficeID"] = null;
      request_claim["authorizationID"] = null;
      // request_claim["totalProviderRate"] = null;
    }
    this._opencards.updateClaims(request_claim).then((data: any) => {
      this.isPlesWait = false;
      if (data.responseStatus) {
        loader.style.display = "none";
        swal("Success", "Claims status successfully updated!", "success");
        this.getAllListView(1, 100);
        this.isPopDirectAuthFormWindow = false;
      } else {
        loader.style.display = "none";
        swal("Warning", data.responseMessage, "info");
        this.isPopDirectAuthFormWindow = false;
      }
    });
  }

  editForm() {
    this.isEdit = false;
    if (this.claimStatus.claimStatusID == 2) {
      this.isClaimStatus = false;
      this.claimStatusToRecoupNull = false;
    } else if (
      this.restrictDropdownForm.ClaimStatusID === 2 &&
      this.restrictDropdownForm.Recoup_ClaimID === null
    ) {
      this.claimStatusToRecoupNull = true;
    } else {
      this.claimStatusToRecoupNull = true;
      this.isClaimStatus = true;
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
    this.isPopDirectAuthFormWindow = false;
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
      this.isClaimStatus = false;
    } else {
      this.isClaimStatus = false;
    }
  }
  allProcodes = [];
  referralID: any;
  getReferalID() {
    let me_Req = {
      clientID:
        parseInt(localStorage.getItem("clientId")) -
        this._opencards.getHasKey(),
    };
    this._opencards.getReferralRec(me_Req).then((data) => {
      this.referralID = data["recentContract"].ReferralID;
    });
  }
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
  showCliamForm() {
    this.isEdit = false;
    this.isClaimStatus = false;
    this.isPopDirectAuthFormWindow = true;
    this.isUpdate = false;
    this.claimStatus = {};

    this.directAuth = {
      beginDate: "",
      dateOverride: "",
      endDate: "",
      units: "",
      unitType: "",
      payorRate: "",
      providerRate: "",
      procode: "",
      paymentType: "",
      payeeName: "",
      receivedDate: "",
      paymentNotes: "",
      notes: "",
      status: "",
      enteredBy: "",
      glkey: "",
      providerName: "",
      claimID: "",
    };

    this.directAuth.beginDate = new Date();
    this.directAuth.endDate = new Date();
    this.directAuth.units = 0.0;
    this.directAuth.payorRate = 0.0;
    this.directAuth.providerRate = 0.0;
  }

  defFormValues() {
    this.directAuth.beginDate = new Date();
    this.directAuth.endDate = new Date();
    this.directAuth.units = 0.0;
    this.directAuth.payorRate = 0.0;
    this.directAuth.providerRate = 0.0;
  }

  validateEndDate() {
    // if (!this.directAuth.dateOverride) {
    if (this.directAuth.unitType.unitType === "Daily") {
      var beginDate = new Date(
        new Date(this.directAuth.beginDate).setHours(0, 0, 0, 0)
      );
      var endDate = new Date(
        new Date(this.directAuth.endDate).setHours(0, 0, 0, 0)
      );
      var Difference_In_Time = endDate.getTime() - beginDate.getTime();
      var Difference_In_Days = (
        Difference_In_Time /
        (1000 * 3600 * 24)
      ).toString();
      var calcUnits = Difference_In_Days.split(".");
      this.directAuth.units = parseInt(calcUnits[0]).toFixed(2);
    } else if (this.directAuth.unitType.unitType === "Monthly") {
      var beginDate = new Date(this.directAuth.beginDate);
      var endDate = new Date(this.directAuth.endDate);
      this.directAuth.units =
        (endDate.getFullYear() - beginDate.getFullYear()) * 12 +
        (endDate.getMonth() - beginDate.getMonth());
    } else if (this.directAuth.unitType.unitType === "Hour") {
      var beginDate = new Date(this.directAuth.beginDate);
      var endDate = new Date(this.directAuth.endDate);
      this.directAuth.units = Math.round(
        Math.abs(beginDate.getTime() - endDate.getTime()) / 36e5
      ).toFixed(2);
    } else if (this.directAuth.unitType.unitType === "1/2 Hour") {
      var beginDate = new Date(this.directAuth.beginDate);
      var endDate = new Date(this.directAuth.endDate);
      var min30Calsc = Math.round(
        Math.abs(endDate.getTime() - beginDate.getTime()) / 1800000
      );
      this.directAuth.units = min30Calsc.toFixed(2);
    } else if (this.directAuth.unitType.unitType === "1/4 Hour") {
      var beginDate = new Date(this.directAuth.beginDate);
      var endDate = new Date(this.directAuth.endDate);
      var min30Calsc = Math.round(
        Math.abs(endDate.getTime() - beginDate.getTime()) / 900000
      );
      this.directAuth.units = min30Calsc.toFixed(2);
    } else if (this.directAuth.unitType.unitType === "Weekly") {
      var beginDate = new Date(
        new Date(this.directAuth.beginDate).setHours(0, 0, 0, 0)
      );
      var endDate = new Date(
        new Date(this.directAuth.endDate).setHours(0, 0, 0, 0)
      );
      var Difference_In_Time = endDate.getTime() - beginDate.getTime();
      var Difference_In_Days_count = Math.round(
        Difference_In_Time / (1000 * 3600 * 24) / 7
      ).toFixed(2);
      this.directAuth.units = Difference_In_Days_count;
    }

    // }
  }

  getUnitValue() {
    if (this.directAuth.units === "0.00") {
      this.directAuth.units = 0;
    }
    if (!this.directAuth.dateOverride) {
      if (this.directAuth.unitType.unitType === "Daily") {
        var date = new Date(this.directAuth.beginDate);
        this.directAuth.endDate = new Date(
          date.setDate(date.getDate() + parseInt(this.directAuth.units))
        );
      } else if (this.directAuth.unitType.unitType === "Monthly") {
        var d = new Date(this.directAuth.beginDate);
        this.directAuth.endDate = new Date(
          d.setMonth(d.getMonth() + parseInt(this.directAuth.units))
        );
      } else if (this.directAuth.unitType.unitType === "Hour") {
        var date = new Date(this.directAuth.beginDate);
        this.directAuth.endDate = new Date(
          date.setHours(date.getHours() + parseInt(this.directAuth.units))
        );
      } else if (this.directAuth.unitType.unitType === "1/2 Hour") {
        var date = new Date(this.directAuth.beginDate);
        this.directAuth.endDate = new Date(
          date.setTime(
            date.getTime() + parseInt(this.directAuth.units) * 30 * 60 * 1000
          )
        );
      } else if (this.directAuth.unitType.unitType === "1/4 Hour") {
        var date = new Date(this.directAuth.beginDate);
        this.directAuth.endDate = new Date(
          date.setTime(
            date.getTime() + parseInt(this.directAuth.units) * 15 * 60 * 1000
          )
        );
      } else if (this.directAuth.unitType.unitType === "Weekly") {
        var date = new Date(this.directAuth.beginDate);
        this.directAuth.endDate = new Date(
          date.setDate(date.getDate() + parseInt(this.directAuth.units) * 7)
        );
      }
    }
  }

  getUnitTypeValue(event) {
    let date = new Date(this.directAuth.beginDate);
    // this.directAuth.dateOverride = true;
    if (!this.directAuth.dateOverride) {
      if (event.unitType === "Daily") {
        this.directAuth.endDate = new Date(
          date.setDate(date.getDate() + parseInt(this.directAuth.units))
        );
      } else if (event.unitType === "Weekly") {
        this.directAuth.endDate = new Date(
          date.setDate(date.getDate() + parseInt(this.directAuth.units) * 7)
        );
      } else if (event.unitType === "Monthly") {
        this.directAuth.endDate = new Date(
          date.setMonth(date.getMonth() + parseInt(this.directAuth.units))
        );
      } else if (event.unitType === "1/2 Hour") {
        this.directAuth.endDate = new Date(
          date.setTime(
            date.getTime() + parseInt(this.directAuth.units) * 30 * 60 * 1000
          )
        );
      } else if (event.unitType === "Hour") {
        this.directAuth.endDate = new Date(
          date.setHours(date.getHours() + parseInt(this.directAuth.units))
        );
      } else if (event.unitType === "1/4 Hour") {
        this.directAuth.endDate = new Date(
          date.setTime(
            date.getTime() + parseInt(this.directAuth.units) * 15 * 60 * 1000
          )
        );
      }
    }
  }

  getPayorRate(event) {
    this.directAuth.providerRate = this.directAuth.payorRate;
  };
  pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getAuthListView(this.initial, this.end);
    }
  }
}
