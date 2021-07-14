import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  placementAuthViewOnlyInfo,
  PlacementAuthTemp,
} from "../placement/placement-auth-template/placement-auth-template";
import { Router, ActivatedRoute } from "@angular/router";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import {LocalValues} from "../local-values";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CaseTeamService } from "../case-team/case-team.service";
import { isNullOrUndefined } from "util";
import { AuthorizationException } from "../placement/living-arrange-ment/pl-living-arrangment";
import swal from "sweetalert2";
import { Location } from "@angular/common";
import * as moment from "moment";
import { PlacementService } from "../placement/placement.service";
import { AuthorizationForm } from "../authorization-claim/authorization-claim";
import { TeamFormService } from "../team-form/team-form.service";

@Component({
  selector: "app-cs-client-authorization-form-view",
  templateUrl: "./cs-client-authorization-form-view.component.html",
  styleUrls: ["./cs-client-authorization-form-view.component.scss"],
})
export class CsClientAuthorizationFormViewComponent implements OnInit {
  @Input() get_authID: any;
  @Output() closeModel = new EventEmitter<string>();
  isPopListWindow = true;

  public isPopUp = true;
  pay_claim_Name: any;
  claimProviderRate: any;
  claimPayorRate: any;
  isProvider = false;
  isPayee = false;
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
  selectedAuthorizationIDForView: number;
  selectedClaimIDForView: number;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  close() {
    var closeEV = "false";
    this.closeModel.emit(closeEV);
  }

  moduleName: string;
  selectedLivingArragementRecordId: number;
  viewOnlyInformations: placementAuthViewOnlyInfo;
  moduleViewName: string;
  placementAuth: PlacementAuthTemp = new PlacementAuthTemp();
  placementAuthForm: FormGroup;
  metaData = [];
  selectedAuthorizationID: number;
  authExcep: AuthorizationException = new AuthorizationException();
  isAuthExcepFormOpen = false;
  unitsRemaining: any;
  currentAuthorizationID: number;
  currentPlacementDetailID: number;
  existingAuthorizationsList = [];
  filteredExistAuthList = [];
  isPlesWait = false;
  claimList = [];
  isDeleteBtnDisable = false;
  userName: string;
  isVisibleDeleteAuthBtn = false;
  req: any;
  navigationOrigin: string;
  climlistURL: any;
  isPayeeCard = true;

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

  isPlacementEventAuth: any;
  providerSponcer: any;
  defaultColDef: any;
  resourceName: any;
  address: any;
  address2: any;
  expactedPaymentDate: any;
  chck_state: any;

  constructor(
    public _team: TeamFormService,
    public _placement: PlacementService,
    public _router: Router,
    public _activatedRoute: ActivatedRoute,
    public _opencard: OpencardsService,
    public _localValues: LocalValues,
    public _fb: FormBuilder,
    public _caseTeam: CaseTeamService,
    public _location: Location
  ) {}

  ngOnInit() {
    this.getRecById();
    this.getAuthListView(1, 100);
    this.formValidation();
    this.getViewOnlyInforamtion();
    this.selectedPay = [
      { name: "Provider", code: "provider" },
      { name: "Payee", code: "Payee" },
    ];
  }

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
        });
        break;

      case "placementEvent":
      case "authorization":
        this.moduleViewName = "Placement Event";
        this.isVisibleDeleteAuthBtn = false;
        let placementDetailReq = {
          placementDetailID: this.currentPlacementDetailID,
        };
        this._placement
          .getPlacementDetailInfo(placementDetailReq)
          .then((data: any) => {
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
    });
  }

  /**Auto fill fields based on units
   * Units paid by placement
   * Units remaining
   * For authorization exception also
   */
  onChangeAuthoInfoUnits() {
    this.placementAuth.unitsPaidByPlacement = this.placementAuth.unitsAuth;
    this.unitsRemaining = this.placementAuth.unitsAuth;
    this.authExcep.exceptionPayorRate = this.placementAuth.payorRate;
    this.authExcep.exceptionProviderRate = this.placementAuth.providerRate;
  }

  getPlacementEventAuthReq(request): any {
    request.authorization["unitsRemaining"] = this.unitsRemaining;
    request.authorization["holdBedPayorID"] = null;
    request.authorization["holdBedUnits"] = null;
    request.authorization["placementDetailID"] = this.currentPlacementDetailID;
    request.authorization["livingArrangementID"] = null;
    return request;
  }

  pay_name: any;
  pay: any;
  payorName: any;
  sponsorName: any;
  procode: any;
  getRecById() {
    /**Replace with actual authorization id */
    this.isPlesWait = true;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    // let authorizationIDFormLocalstorage = parseInt(localStorage.getItem('authorizationId')) - this._opencard.getHasKey();
    this.req = { authorizationID: this.get_authID };
    this._opencard.getAuthById(this.req).then((data: any) => {
      this.isPlesWait = false;
      console.log("add authorization>>>>", data.authorization.addInfo);
      this.selectedAuthorizationIDForView = data.authorization.authorizationID;
      /////
      if (data.authorization.payorID === null) {
        this.payorName = "";
      } else {
        this.payorName = data.authorization.payorID.payorName;
      }

      this.unitsRemaining = data.authorization.unitsRemaining;
      // this.sponsorName = data.authorization.sponsorID.sponsorName;
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
      ////
      this.placementAuth.frequency = data.authorization.frequency;
      this.placementAuth.addInfo = data.authorization.addInfo;
      console.log(
        ">>><<placementAuth.frequency<<>>",
        this.placementAuth.frequency,
        ">>this.placementAuth.addInfo>>",
        this.placementAuth.addInfo
      );
      if (data.authorization.isActive) {
        !isNullOrUndefined(data.authorization.beginDate)
          ? (data.authorization.beginDate = new Date(
              data.authorization.beginDate
            ))
          : null;
        !isNullOrUndefined(data.authorization.endDate)
          ? (data.authorization.endDate = new Date(data.authorization.endDate))
          : null;
      } else {
        !isNullOrUndefined(data.authorization.beginDate)
          ? (data.authorization.beginDate = moment
              .utc(data.authorization.beginDate)
              .format("MM/DD/YYYY HH:mm"))
          : null;
        !isNullOrUndefined(data.authorization.endDate)
          ? (data.authorization.endDate = moment
              .utc(data.authorization.endDate)
              .format("MM/DD/YYYY HH:mm"))
          : null;
      }
      this.placementAuth = data.authorization;
      /***************************** Testing purpose ************************************************/
      this.placementAuth.unitsRemaining = 5;
      /********************************************************************************************* */
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
      if (this._activatedRoute.snapshot.queryParamMap.get("navigateFrom")) {
        this.isEdit = false;
      } else {
        this.isEdit = true;
      }
      this.isAttachmentRequired = true;
      this.claimList = data.claimID;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.authorization.changedBy) ? data.authorization.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.authorization.changedDate) ? moment(data.authorization.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.authorization.enteredBy) ? data.authorization.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.authorization.enteredDate) ? moment(data.authorization.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      loader.style.display = "none";
      this.placementAuthForm.disable();
    });
    this.selectedAuthorizationID = this.currentAuthorizationID;
  }

  isPopClimasListWindow = false;
  showClaimsPopUP() {
    this.isPopClimasListWindow = true;
  }
  rowData: any;
  totalCount: any;
  initial = 1;
  end = 100;
  headers = [];
  rawdata = [];
  columnDefs = [];
  getAuthListView(initial, end) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.isPlesWait = true;
    let me_Req = {
      authorizationID: this.get_authID,
      beginPagination: initial,
      endPagination: end,
    };
    this._opencard.getCsClientClaimList(me_Req).then((data) => {
      this.isPlesWait = false;
      this.generateListView(data["totalCount"], data["authorizationClaimList"]);
      loader.style.display = "none";
    });
  }
  generateListView(totalCount, data) {
    let test = [];
    this.totalCount = totalCount;
    this.rowData = data;
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
  isWin = false;
  onRowSelected(event) {
    console.log("event>>>>", event);
    this.selectedClaimIDForView = event.data.claimID;
    this.getAuthClaimDetails(event.data.claimID);
    this.isPopClimasFormWindow = true;
    this.isDetail = true;
    this.isUpdate = true;
    this.isWin = true;
  }
  isPopClimasFormWindow = false;
  showCliamForm() {
    this.isPopClimasFormWindow = true;
    this.getAuthRecById();
  }

  getAuthRecById() {
    this.isPlesWait = true;
    /**Replace with actual authorization id */
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = { authorizationID: this.get_authID };
    this._opencard.getAuthById(req).then((data: any) => {
      this.isPlesWait = false;
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
          // this.authFormDetail.providerName = data.authorization.payeeID.payeeName;
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
          this.pay_claim_Name = data.authorization.providerID;
          this.payName = data.authorization.providerID.providerName;
        } else if (data.authorization.providerID === null) {
          pay = "Payee";
          this.isProvider = false;
          this.isPayee = true;
          this.claim_pay = { name: "Payee", code: "Payee" };
          this.payee_ID = data.authorization.payeeID.payeeID;
          this.pay_claim_Name = data.authorization.payeeID;
          // this.authFormDetail.providerName = data.authorization.payeeID.payeeName;
          this.payName = data.authorization.payeeID.payeeName;
          this.provider_ID = null;
        }
      }

      var authDatas = {
        receivedDate: new Date(),
        beginDate: new Date(data.authorization.beginDate),
        endDate: new Date(data.authorization.endDate),
        claim_beginDate: new Date(data.authorization.beginDate),
        claim_endDate: new Date(data.authorization.beginDate),
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
        date_claimOverride: data.authorization.dateOverride,
        claim_units: this.nullOrUndefined_rate(data.authorization.units),
      };
      this.unit_remaining = data.authorization.unitsRemaining;
      this.glKey = data.authorization.glKey;
      this.referralID = data.authorization.referralID.referralID;
      this.clientID = data.authorization.clientID.clientID;
      this.doNotPay = data.authorization.doNotPay;
      if (this.isWin) {
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
  updateReq: any;
  saveClaim() {
    console.log("this.notes>>>", this.notes);
    this.isPlesWait = true;
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
            claimID: this.currentClaimID,
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
            dateOverride: this.authFormDetail.dateOverride,
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
            authorizationID: this.get_authID,
            glKey: this.glKey,
            sfaOfficeID: null,
            requestedBy_StaffID: this.requestedBy_StaffID,
          };
          this._opencard
            .updateClaims(this.updateReq)
            .then((data: any) => {
              loader.style.display = "none";
              this.isPlesWait = false;
              swal("Save", "Successfully Saved!", "success");
              // this._router.navigate(['/reintegration/referral/placement-event-authorizations/detail'], { queryParams: { 'origin': 'cards' }, queryParamsHandling: 'merge' })
              this.isPopClimasFormWindow = false;
              this.getAuthListView(1, 100);
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
              dateOverride: this.authFormDetail.dateOverride,
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
              authorizationID: this.get_authID,
              glKey: this.glKey,
              sfaOfficeID: null,
              requestedBy_StaffID: this.requestedBy_StaffID,
            };
            this._opencard
              .saveClaim(savereq)
              .then((data: any) => {
                this.isPlesWait = false;
                loader.style.display = "none";
                swal("Save", "Successfully Saved!", "success");
                this.getAuthListView(1, 100);
                this.isPopClimasFormWindow = false;
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
  restrictDropdownForm: any;
  isDisabled = false;
  currentClaimID: any;
  getAuthClaimDetails(claimID) {
    this.isPlesWait = true;
    this.currentClaimID = claimID;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.req = { claimID: claimID };
    this._opencard.getClaimIDDetails(this.req).then((data) => {
      this.isPlesWait = false;
      loader.style.display = "none";
      if (data.claim.recoup_ClaimID != null) {
        this.isDisabled = true;
      }
      this.getAuthRecById();
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

        if (data.claim.payeeID === null) {
          this.claim_pay = { name: "Provider", code: "provider" };
          this.isProvider = true;
          this.isPayee = false;
          !isNullOrUndefined(data.claim.providerID)
            ? (this.pay_claim_Name = data.claim.providerID)
            : null;
        } else if (data.claim.providerID === null) {
          this.claim_pay = { name: "Payee", code: "Payee" };
          this.isProvider = false;
          this.isPayee = true;
          !isNullOrUndefined(data.claim.payeeID)
            ? (this.pay_claim_Name = data.claim.payeeID)
            : null;
        }

        !isNullOrUndefined(data.claim.dateOverride)
          ? (this.authFormDetail.date_claimOverride = data.claim.dateOverride)
          : null;
        !isNullOrUndefined(data.claim.providerRate)
          ? (this.claimProviderRate = data.claim.providerRate)
          : null;
        // !isNullOrUndefined(data.claim.providerID) ? this.payName= data.claim.providerID : null;
        !isNullOrUndefined(data.claim.payorRate)
          ? (this.claimPayorRate = data.claim.payorRate)
          : null;
        !isNullOrUndefined(data.claim.units)
          ? (this.claimUnits = data.claim.units.toFixed(2))
          : null;
      } else {
        loader.style.display = "none";
      }
    });
  }
  isEdit = true;
  discard = () => {
    this.isPopClimasFormWindow = false;
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
    this._opencard.getClaimsStatus().then((data) => {
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

  getMetaData(event, data) {
    // getMetaData($event, 'payor')
  }

  filteredExistingAuthList(event) {
    // filteredExistingAuthList
  }

  onSelectExistingAuthorization() {
    // onSelectExistingAuthorization
  }

}
