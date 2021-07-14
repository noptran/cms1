import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid';
import { ClildFormService } from '../child-forms/child-forms.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { addClaim } from './add-claim';
import swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { isNullOrUndefined } from 'util';
import { TeamFormService } from '../team-form/team-form.service';
import { Hotkeys } from './hotkeys.service';
import * as moment from 'moment';
import { LocalValues } from '../local-values';
declare var $: any;

@Component({
  selector: 'app-add-claims',
  templateUrl: './add-claims.component.html',
  styleUrls: ['./add-claims.component.scss']
})
export class AddClaimsComponent implements OnInit {
  discardTo = '/claims/list/view';
  title: any = 'Claims';
  status = 'draft';
  breadcrumbs = [];
  formStatus?: any;
  showValidate = false;
  current_Date = moment(Date.now()).format('MM-DD-YYYY');
  addClaimValues: addClaim = new addClaim();
  addClaimForm: FormGroup;
  isRestart = true;
  isSubmit = true;
  isSave = true;
  isValidate = true;
  isReport = false;
  isDisabled = true;
  editControll = true;
  isSaveandCountinue = true;
  displayDialog: boolean;
  displayClaim: boolean;
  claimDetails: any;
  results = [];
  defaultColDef;
  clientId: any;
  referralID: any;
  providerID: any;
  referral: any;
  getClaimIdDetails: any;
  client = [];
  clientName: any;
  filteredClient = [];
  claimListDetails: any[];
  rowData: any;
  updatedRowData = [];
  claimRowData = [];
  provider: any;
  receivedDate: any;
  currentDate: any;
  payType: any = { name: 'Payee', code: '0' };
  payee: any;
  isReadOnly: boolean;
  isReadOnlyClient: boolean;
  isAuth: boolean = false;
  payment: any;
  isUnique: boolean;
  uniqueId: any;
  procodeId: any;
  showError: boolean;
  errMsg: string;
  paymentTypeId: any;
  payeeId: any;
  isPayee: boolean;
  referralBeginDate = null;
  referralEndDate = null;
  authStatus: any;
  claimId: any;
  payeeClient: any;
  providerClient: any;
  isProvider: boolean;
  authRate: any = null;
  enteredBy: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  showAddClaim = true;
  showInfo = false;
  showInfoInc = 0;
  claimsByClientlength = 0;
  columnDefs: ColDef[] = [
    { headerName: "Client", field: "Client" },
    { headerName: "Referral", field: "Referral" },
    { headerName: "Payment type", field: "PaymentType" },
    { headerName: "Authorization ID", field: "authorizationID" },
    { headerName: "Begin date", field: "beginDate" },
    { headerName: "End date", field: "endDate" },
    { headerName: "Procode", field: "procode" },
    { headerName: "Notes", field: "notes" },
    { headerName: "Payment notes", field: "paymentNotes" },
    { headerName: "Units", field: "units" },
    { headerName: "Rate", field: "rate" },
    { headerName: "Extension", field: "extension" },
  ];
  gridOptions: GridOptions;
  newCount = 0;
  whoToPay = [
    { name: 'Payee', code: '0' },
    { name: 'Provider', code: '1' },
  ];

  cancel() {
    this.displayDialog = false;
    this.addClaimValues.beginDate = "";
    this.addClaimValues.endDate = "";
  }

  authLists = [];
  getAuthorizationId(event) {
    if (this.payType.code == '1') {
      let req;
      req = { "referralID": this.referralID, "clientID": parseInt(this.clientId), "providerID": this.providerID }
      return this._CaseTeamService.getAuthorizationId(req).then((data) => {
        if (data.authorization.length <= 0) {
          this.addClaimValues.authorizationID = { 'Desc': '' };
          this.isAuth = true;
        }
        data.authorization.map((item) => {
          item['Desc'] = item.Desc;
        })
        this.authLists = data.authorization;
      })
    } else if (this.payType.code == '0') {
      let req;
      req = { "referralID": this.referralID, "clientID": parseInt(this.clientId), "providerID": this.payeeId, "payee": true }
      return this._CaseTeamService.getAuthorizationId(req).then((data) => {
        if (data.authorization.length <= 0) {
          this.addClaimValues.authorizationID = { 'Desc': '' };
          this.isAuth = true;
        }
        data.authorization.map((item) => {
          item['Desc'] = item.Desc;
        })
        this.authLists = data.authorization;
      })
    }
  };
  referralresults = [];
  getReferralForClient(event) {
    let req;
    req = { clientID: this.clientId, value: event.query }
    return this._CaseTeamService.getClaimReferralByCleintId(req).then((data) => {
      data.dropDown.map((item) => {
        if (item.EndDate === null) {
          item['display'] = item.ReferralType + ' ' + moment(item.BeginDate).format('MM/DD/YYYY') + ' , ' + item.referralID;
        } else if (item.EndDate) {
          item['display'] = item.ReferralType + ' ' + moment(item.BeginDate).format('MM/DD/YYYY') + ' TO ' + moment(item.EndDate).format('MM/DD/YYYY') + ' , ' + item.referralID;
        }
      })
      this.referralresults = data.dropDown;
    })
  };
  ReferralType: any;
  getReferralId(event) {
    this.referralID = event.referralID;
    this.referralBeginDate = new Date(event.BeginDate);
    if (event.EndDate === null) {
      this.referralEndDate = new Date();
    } else {
      this.referralEndDate = new Date(event.EndDate);
    }
    this.ReferralType = event.ReferralType;

  }
  getPaymentType(event) {
    if (this.payType.code == '1') {
      this.getAutoFetchPaymentType();
    } else {
      let req;
      req = { "Object": "paymentType", "value": event.query }
      return this._CaseTeamService.getSearchList(req).then((data) => {
        this.results = data.dropDown;
      })
    }
  }
  getPaymentInfo(event) {
    this.paymentTypeId = event.paymentTypeID;
  }
  getPayment(event) {
    this.paymentTypeId = event.paymentTypeID;
  }

  getProvider(event) {
    this.clientName = { 'fullName': null };
    this.payee = { 'payee': null };

    let req;
    req = { "Object": "provider", "value": event.query }
    return this._CaseTeamService.getSearchList(req).then((data) => {
      data.dropDown.map((item) => {
        item['provider'] = item.providerName + ' ,' + item.providerTypeID.providerType + ' , ' + item.fedTaxNo;
      })
      this.results = data.dropDown;
    })
  }
  getPayee(event) {
    this.clientName = { 'fullName': null };
    this.provider = { 'provider': null };
    let req;
    req = { "Object": "payee", "value": event.query }
    return this._CaseTeamService.getSearchList(req).then((data) => {
      data.dropDown.map((item) => {
        item['payee'] = item.payeeName + ' ,' + item.payeeID;
      })
      this.results = data.dropDown;
    })
  }
  authorization_id: any;
  generateAuthorization(event) {
    this.authorization_id = event.AuthorizationID;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.addClaimForm.disable();
    let desc = (event.Desc) ? event.Desc.split('; ') : null;
    let descOne = (desc) ? desc[0].split(' (') : null;
    this.addClaimValues.authorizationID = { 'Desc': (descOne) ? parseInt(descOne[0]) : null };
    this.addClaimValues.validBeginDate = (descOne) ? new Date(descOne[1]) : null;
    this.addClaimValues.validEndDate = (desc) ? new Date(desc[1]) : null;
    let descRate = (desc) ? desc[2].split(')') : null;
    this.authRate = (descRate) ? descRate[0] : null;
    this.addClaimValues.rate = (descRate) ? descRate[0] : null;
    this.addClaimValues.procode = { 'ProcodeName': event.Procode };
    this.addClaimValues.authEnteredBy = event.EnteredBy;
    this.procodeId = event.ProcodeID;
    this.authStatus = event.AuthorizationStatus;
    this.addClaimValues.unitsRemainingSample = event.UnitsRemaining;
    this.addClaimValues.units = 0;
    if (event.Procode) {
      this.isAuth = false;
    } else {
      this.isAuth = true;
    }
    let req;
    req = { "clientID": this.clientId, "procodeID": event.ProcodeID }
    this._CaseTeamService.getClaimsByClient(req).then((data) => {
      this.addClaimValues.claimsByClient = data;
      loader.style.display = 'none';
      this.addClaimForm.enable();
    })
  }
  generateExtension(pro_data, index) {
    console.log("index>>>", index);
    this.updatedRowData[index].extension = pro_data.units * pro_data.rate;
  }
  getRate(pro_data, index) {
    console.log("index>>>", index);
    if (pro_data.units) {
      this.updatedRowData[index].extension = pro_data.units * pro_data.rate;
    }
  }
  getAutoFetchPaymentType() {
    let req;
    req = { "Object": "paymentType", "value": 'Accounts Payable' }
    return this._CaseTeamService.getSearchList(req).then((data) => {
      this.results = data.dropDown;
      this.paymentTypeId = this.results[0].paymentTypeID;
      // this.payment = { 'paymentType': this.results[0] };
    })
  }
  isNoclients = false;
  filterClient(event) {
    console.log("event>>>", event);
    let beginDate = new Date(this.receivedDate);
    beginDate.setFullYear(beginDate.getFullYear() - 1);
    let newDate: any;
    newDate = beginDate;
    if (this.payType.code == '1') {
      this.isProvider = true;
      // this.isReadOnly = true;
      this.filteredClient = [];
      // this.getAutoFetchPaymentType();
      this.isPayee = false;
      if (this.providerClient.length > 0) {
        this.providerClient.filter((data: any) => {
          if (data.ClientName.toLowerCase().indexOf(event.query) !== -1) {
            this.filteredClient.push(data);
          }
        })
      }
    } else if (this.payType.code == '0') {
      this.isProvider = false;
      this.isReadOnly = false;
      this.filteredClient = [];
      // this.payment = { 'paymentType': null };
      this.isPayee = true;
      if (this.payeeClient.length > 0) {
        this.payeeClient.filter((data: any) => {
          if (data.ClientName.toLowerCase().indexOf(event.query) !== -1) {
            this.filteredClient.push(data);
          }
        })
      }
    };
    if (this.filteredClient.length === 0) {
      this.isNoclients = true;
    }
    setTimeout(() => {
      this.isNoclients = false;
    }, 3000);
  }
  getProcode(event) {
    let req;
    req = { 'Object': 'procode', 'value': event.query }
    return this._CaseTeamService.getSearchList(req).then((data) => {
      data.dropDown.map((data) => {
        data['fullName'] = data.procode + ' - ' + data.categoryOfService;
      })
      this.results = data.dropDown;
    })
    // let procodelist = this.procodeList;
    // this.results = procodelist.map((procode) => {
    // procode['fullName'] = procode.ProcodeName;
    // procode['procodeID'] = procode.ProcodeID;
    // return procode;
    // else {
    //   let req;
    //   req = { 'Object': 'procode', 'value': event.query }
    //   return this._CaseTeamService.getSearchList(req).then((data) => {
    //     data.dropDown.map((data) => {
    //       data['fullName'] = data.procode + ' - ' + data.categoryOfService;
    //     })
    //     this.results = data.dropDown;
    //   })
    // }
  }
  getProcodeInfo(event) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.addClaimForm.disable();
    this.procodeId = event.procodeID;
    this.addClaimValues.unitMax = event.unitMax;
    this.procodeId = event.ProcodeID;
    let req;
    req = { "clientID": this.clientId, "procodeID": event.ProcodeID }
    this._CaseTeamService.getClaimsByClient(req).then((data) => {
      this.addClaimValues.claimsByClient = data;
      loader.style.display = 'none';
      this.addClaimForm.enable();
    })
  }
  getClient(event) {
    console.log(event);
    this.clientId = event.ClientID;
    this.getReferralForClient({ query: "" })
    // localStorage.setItem('clientId', event.ClientID)
  }
  getProviderId(event) {
    this.providerID = event.providerID;
    this.getClientsOnReceivedDate(event);
  }
  getPayeeId(event) {
    this.payeeId = event.payeeID;
    console.log("this.payeeId>>>>", this.payeeId);
    this.getClientsOnReceivedDate(event);
  }

  getClientsOnReceivedDate(event) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let beginDate = new Date(this.receivedDate);
    beginDate.setFullYear(beginDate.getFullYear() - 1);
    let newDate: any;
    newDate = beginDate;

    if (this.payType.code == '1') {
      let providerClientReq = { "providerID": this.providerID, "beginDate": Date.parse(newDate) }
      return this._CaseTeamService.getProviderClient(providerClientReq).then((data) => {
        data.providerClient.map((item) => {
          // item['fullName'] =  item.ClientName;
          item['fullName'] = item.ClientID + ' ; ' + item.ClientName + ' ; ' + item.SSN + ' ; ' + item.Kaecses + ' ; DOB : ' + item.DOB;

        })
        this.providerClient = data.providerClient;
        loader.style.display = 'none';
        this.getPaymentType({ query: "" })
      })
    } else if (this.payType.code == '0') {
      let req = { "isPayee": 'true', 'providerID': this.payeeId, "beginDate": Date.parse(newDate) }
      return this._CaseTeamService.getPayeeClient(req).then((data) => {
        data.payeeClient.map((item) => {
          // item['fullName'] = item.ClientName;
          item['fullName'] = item.ClientID + ' ; ' + item.ClientName + ' ; ' + item.SSN + ' ; ' + item.Kaecses + ' ; DOB : ' + item.DOB;
        })
        this.payeeClient = data.payeeClient;
        loader.style.display = 'none';
        this.getPaymentType({ query: "" })
      })
    }

  }
  addClaim() {
    this.isUpdate = false;
    this.showError = false;
    this.showValidate = false;
    this.addClaimValues = new addClaim();
    this.addClaimValues.extension = 0;
    this.addClaimValues.rate = 0;
    //this.addClaimValues.beginDate = new Date(this.currentDate);
    !isNullOrUndefined(this.payment) ? this.addClaimValues.paymentType = { 'paymentType': this.payment.paymentType } : null
    this.addClaimValues.clientName = { 'fullName': this.clientName.fullName };
    if (this.clientName.fullName === null || this.payment.paymentType === null || this.payment.paymentType === undefined || this.clientName.fullName === null || this.clientName.fullName === undefined) {
      swal('Warning', 'please fill both payment type and client', 'info');
    } else {
      this.displayDialog = true;
    }
  }

  isUpdate = false;
  isDraft_is = false;

  keyPressed = ''
  constructor(private hotkeys: Hotkeys, public _openCards: OpencardsService, public _person: ClildFormService,
    public _CaseTeamService: CaseTeamService, public _router: Router, public _fb: FormBuilder, public _team: TeamFormService, public _localValues: LocalValues) {
    this.gridOptions = <GridOptions>{};

    hotkeys.addShortcut({ keys: 'meta.z', description: 'Open Settings' }).subscribe(() => {
      console.log;

      this.keyPressed = 'meta.z';
      alert(this.keyPressed);
    });
    hotkeys.addShortcut({ keys: 'meta.j', description: 'Open Settings' }).subscribe(() => {
      console.log;
      this.keyPressed = 'meta.j';
      alert(this.keyPressed);
    });

    hotkeys.addShortcut({ keys: 'control.alt.z', description: 'Open Settings' }).subscribe(() => {
      console.log;
      this.keyPressed = 'control.alt.z';
      alert(this.keyPressed);
    });

    hotkeys.addShortcut({ keys: 'control.a', description: 'Open Settings' }).subscribe(() => {
      console.log;

      alert(this.keyPressed);
    });

    hotkeys.addShortcut({ keys: 'meta.alt.j', description: 'Open Settings' }).subscribe(() => {


    });
    hotkeys.addShortcut({ keys: 'meta.a', description: 'Open Calender' }).subscribe(() => {
      this.add_claim('newClaim');
    });

    hotkeys.addShortcut({ keys: 'meta.shift.d' }).subscribe(() => {
      this.isDraftIsDeleteThere = true;
    });
  }
  log($event) {
    console.log($event)
  }
  submitClaim(source) {
    console.log("claim data before save", this.addClaimValues);
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    var all_requs = []
    source.map((data) => {
      console.log(data);
      data.beginDate = this.getNullValue(this._localValues.stringFormatDatetime(Date.parse(data.beginDate)));
      data.endDate = this.getNullValue(this._localValues.stringFormatDatetime(Date.parse(data.endDate)));
      data.dateOverride = null
      data.paymentDueDate = null
      data.receivedDate = this.getNullValue(this._localValues.stringFormatDatetime(Date.parse(data.receivedDate)));
      data.isFromTools = true
      data.staffID = isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId');
      data.providerID = this.getNullValue(data.providerID);
      data.payeeID = this.getNullValue(data.payeeID);
      data.Referral_ID = this.getNullValue(data.referralID.referralID);
      data.procode_ID = this.getNullValue(data.procodeID.ProcodeID);
      data.claimStatusID = 2;
      data.client_ID = parseInt(this.getNullValue(data.Client.ClientID));
      data.doNotPay = false;
      data.notes = this.getNullValue(data.notes)
      data.paymentType_ID = this.getNullValue(data.PaymentType.paymentTypeID);
      data.paymentNotes = this.getNullValue(data.paymentNotes);
      data.payorRate = this.getNullValue(data.payorRate);
      data.providerRate = this.getNullValue(data.providerRate);
      data.totalPayorRate = this.getNullValue(data.totalPayorRate);
      data.totalProviderRate = this.getNullValue(data.totalProviderRate);
      data.units = this.getNullValue(data.units);
      data.unitTypeID = 10
      data.authorization_ID = isNullOrUndefined(data.authorizationID) ? null : data.authorizationID.AuthorizationID;
      if (data.paymentTypeID === 7 || data.paymentTypeID === 2 || data.paymentTypeID === 3 || data.paymentTypeID === 5) {
        data.claimStatusID = 1;
      }
    });
    source.forEach(ele => {
      var dataPush = {
        beginDate: this.getNullValue(this._localValues.stringFormatDatetime(Date.parse(ele.beginDate))),
        endDate: this.getNullValue(this._localValues.stringFormatDatetime(Date.parse(ele.endDate))),
        dateOverride: null,
        paymentDueDate: null,
        receivedDate: this.getNullValue(this._localValues.stringFormatDatetime(Date.parse(ele.receivedDate))),
        isFromTools: true,
        staffID: isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'),
        providerID: this.getNullValue(ele.providerID),
        payeeID: this.getNullValue(ele.payeeID),
        referralID: this.getNullValue(ele.Referral_ID),
        procodeID: this.getNullValue(ele.procode_ID),
        claimStatusID: ele.claimStatusID,
        clientID: parseInt(this.getNullValue(ele.client_ID)),
        doNotPay: false,
        notes: this.getNullValue(ele.notes),
        paymentTypeID: this.getNullValue(ele.paymentType_ID),
        paymentNotes: this.getNullValue(ele.paymentNotes),
        payorRate: this.getNullValue(ele.payorRate),
        providerRate: this.getNullValue(ele.providerRate),
        totalPayorRate: this.getNullValue(ele.extension),
        totalProviderRate: this.getNullValue(ele.extension),
        rate: parseInt(ele.rate),
        units: this.getNullValue(ele.units),
        extension: ele.extension,
        unitTypeID: 10,
        authorizationID: ele.authorization_ID,

      };
      all_requs.push(dataPush);
    });
    var req = {
      "isFromTools": true,
      "claimsList": all_requs,
      "claimBatchID": this.claimBatchID,
    }
    this._openCards.saveClaim(req).then((data) => {
      loader.style.display = 'none';
      if (data.responseStatus === true) {

        data.claim.beginDate = data.claim.beginDate;
        data.claim.endDate = data.claim.endDate;
        data.claim.receivedDate = data.claim.receivedDate;
        this.claimRowData = data.spreadSheetReport;
        this.isSubmit = false;
        this.isValidate = false;
        this.addClaimForm.disable();
        this.isReport = true;
        this.isDisabled = true;
        this.isRestart = false;
        this.displayClaim = true;
      }
    })
  }
  saveClaim(source) {
    let loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    var all_requs = [];
    source.map((data) => {
      data.beginDate = this.getNullValue(this._localValues.stringFormatDatetime(Date.parse(data.beginDate)));
      data.endDate = this.getNullValue(this._localValues.stringFormatDatetime(Date.parse(data.endDate)));
      data.dateOverride = null
      data.paymentDueDate = null
      data.receivedDate = this.getNullValue(this._localValues.stringFormatDatetime(Date.parse(data.receivedDate)));
      data.isFromTools = true
      data.staffID = isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId');
      data.providerID = this.getNullValue(data.providerID);
      data.payeeID = this.getNullValue(data.payeeID);
      data.Referral_ID = this.getNullValue(data.referralID.referralID);
      data.procode_ID = this.getNullValue(data.procodeID.ProcodeID);
      data.claimStatusID = 7;
      data.client_ID = parseInt(this.getNullValue(data.Client.ClientID));
      data.doNotPay = false;
      data.notes = this.getNullValue(data.notes)
      data.paymentType_ID = this.getNullValue(data.PaymentType.paymentTypeID);
      data.paymentNotes = this.getNullValue(data.paymentNotes);
      data.payorRate = this.getNullValue(data.payorRate);
      data.providerRate = this.getNullValue(data.providerRate);
      data.totalPayorRate = this.getNullValue(data.totalPayorRate);
      data.totalProviderRate = this.getNullValue(data.totalProviderRate);
      data.units = this.getNullValue(data.units);
      data.unitTypeID = 10;
      // data.authorizationID = this.getNullValue(data.authorizationID);
      data.authorization_ID = isNullOrUndefined(data.authorizationID) ? null : data.authorizationID.AuthorizationID;

    });
    source.forEach(ele => {
      var dataPush = {
        beginDate: this.getNullValue(this._localValues.stringFormatDatetime(Date.parse(ele.beginDate))),
        endDate: this.getNullValue(this._localValues.stringFormatDatetime(Date.parse(ele.endDate))),
        dateOverride: null,
        paymentDueDate: null,
        receivedDate: this.getNullValue(this._localValues.stringFormatDatetime(ele.receivedDate)),
        isFromTools: true,
        staffID: isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId'),
        providerID: this.getNullValue(ele.providerID),
        payeeID: this.getNullValue(ele.payeeID),
        referralID: this.getNullValue(ele.Referral_ID),
        procodeID: this.getNullValue(ele.procode_ID),
        claimStatusID: 7,
        clientID: parseInt(this.getNullValue(ele.client_ID)),
        doNotPay: false,
        notes: this.getNullValue(ele.notes),
        paymentTypeID: this.getNullValue(ele.paymentType_ID),
        paymentNotes: this.getNullValue(ele.paymentNotes),
        payorRate: this.getNullValue(ele.payorRate),
        providerRate: this.getNullValue(ele.providerRate),
        totalPayorRate: this.getNullValue(ele.extension),
        totalProviderRate: this.getNullValue(ele.extension),
        rate: parseInt(ele.rate),
        units: this.getNullValue(ele.units),
        extension: ele.extension,
        unitTypeID: 10,
        authorizationID: ele.authorization_ID,

      };
      all_requs.push(dataPush);
    });
    var req = {
      "isFromTools": true,
      "claimsList": all_requs,
      "claimBatchID": this.claimBatchID,
    };
    this._openCards.saveClaim(req).then((data) => {
      loader.style.display = 'none';
      if (data.responseStatus === true) {
        this.claimId = data.claim.claimID;
        this.claimBatchID = data.spreadSheetReport[0].ClaimBatchID;
        this.isDisabled = true;
        this.isRestart = false;
        swal('Save', 'Saved as draft', 'info');
      }
    });
  }
  getNullValue(data) {
    if (data) {
      return data;
    } else {
      return null;
    }
  };


  restartClaim() {
    this.payee = '';
    this.updatedRowData = [];
    this.provider = '';
    this.receivedDate = new Date();
    this.clientName = '';
    this.payment = '';
    this.payType.code = '0';
    this.showAddClaim = true;
    this.isValidate = true;
  }
  reportClaim() {
    // this.displayClaim = true;
  }

  getStaffDetails() {
    let staffId = parseInt(localStorage.getItem('UserId')) || 4620;
    this._team.getUserById({ staffID: staffId }).then(data => {
      this.enteredBy = data.users.firstName + data.users.lastName;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.users.changedBy) ? data.users.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.users.changedDate) ? moment(data.users.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.users.enteredBy) ? data.users.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.users.enteredDate) ? moment(data.users.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }
  ngOnInit() {
    document.getElementById("firstInput").focus();
    $('#focusguard-2').on('focus', function () {
      $('#firstInput').focus();
    });

    $('#focusguard-1').on('focus', function () {
      $('#lastInput').focus();
    });
    localStorage.removeItem('clientName');
    this.receivedDate = new Date();
    this.currentDate = this._localValues.stringFormatDatetime(new Date());

    this.formValidation();
    this.dynamicUrl();
    this.getStaffDetails();
    this.draftRecord();
    this.isSubmit = true;
    // this.addClaimForm.controls['cityID'].disable();

    var divs = document.getElementsByClassName('tab');
    console.log("divs>>", divs.length);
    for (var i = 0, len = divs.length; i < len; i++) {
      divs[i].setAttribute('tabindex', '0');
    }

  }
  dynamicUrl() {
    if (this._router.url === '/claims/list/add') {
      this.breadcrumbs.push(
        { label: 'List', href: "/claims/list/view", active: '' },
        { label: 'Form', href: "/claims/list/add", active: 'active' }
      );
    }
  }
  formValidation() {
    this.addClaimForm = this._fb.group({
      notes: [null],
      clientName: [null],
      paymentType: [null],
      referral: [null],
      authorizationID: [null],
      beginDate: [null],
      endDate: [null],
      procode: [null],
      rate: [null],
      paymentNotes: [null],
      units: [null],
      extension: [null],
    });
  };
  export_claim(batchID) {
    var Req = {
      "ClaimBatchID": batchID,
      "fileName": "Claims " + this.current_Date
    }
    this._openCards.exportClaim(Req).then((data) => {
      if (data.filePath) {
        window.location.href = data.filePath;
      };
    }).catch(err => {

    })
  };

  procodeList: any;
  getProcodes(beginDate) {
    switch (this.ReferralType) {
      case 'FC':
        this.ReferralType = 1;
        break;

      case 'NC-FCH':
        this.ReferralType = 4;
        break;

      case 'NC-OPS':
        this.ReferralType = 9;
        break;

      case 'FI':
        this.ReferralType = 2;
        break;

      case 'NC-FI':
        this.ReferralType = 5;
        break;

      case 'NC-RFC':
        this.ReferralType = 7;
        break;

      case 'NC-HS':
        this.ReferralType = 8;
        break;

      case 'BH OK':
        this.ReferralType = 15;
        break;

      case 'JJFC':
        this.ReferralType = 17;
        break;

      case 'NC-MHR':
        this.ReferralType = 11;
        break;

      case 'PRTF':
        this.ReferralType = 14;
        break;

    }
    const request = {
      "referralTypeID": this.ReferralType,
      "beginDate": Date.parse(beginDate)
    }
    this._openCards.getClaimProcodeBasedOnReferralType(request).then((data) => {
      this.procodeList = data.procode;
    })

  }

  //     })
  // };

  deleteRow(index) {
    for (let i = 0; i < this.updatedRowData.length; i++) {
      if (i === index) {
        this.updatedRowData.splice(i, 1);
        this.extensionCalc(this.updatedRowData);
      }
    };
    this.lastIndexFind();
  }
  allDrafts = [];
  isDraftIsThere = false;
  isDraftList = false;
  draftRecord() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    var req = {
      "staffID": isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId')
    };
    this._openCards.getDraftClaim(req).then((data) => {
      this.allDrafts = data.userDrafts;
      loader.style.display = 'none';
      if (this.allDrafts.length !== 0) {
        this.isDraftIsThere = true;
      }
    })
  };
  cancelDraftthere() {
    this.isDraftIsThere = false;
  };
  showDraftList() {
    this.isDraftList = true;
    this.isDraftIsThere = false;
  };
  cancelDraftList() {
    this.isDraftList = false;
  };
  claimBatchID = null;
  isDraft_is_btn = false;
  showRespectiveClaim(claimBatchID) {
    this.claimBatchID = claimBatchID.ClaimBatchID;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.isDraftList = false;
    var req = {
      "ClaimBatchID": claimBatchID.ClaimBatchID
    };
    this._openCards.getRespectiveClaim(req).then((data) => {
      this.isDraft_is_btn = true;
      this.updatedRowData = data.userDrafts;
      this.paymentTypeId = data.paymentTypeID.paymentTypeID;
      this.payment = { 'paymentType': data.paymentTypeID.paymentType };
      this.clientName = { 'ClientName': this.updatedRowData[0].clientID.ClientName };
      console.log("this.updatedRowData[0].clientID>>", this.updatedRowData[0].clientID);
      this.clientId = this.updatedRowData[0].clientID.ClientID;
      this.payment.paymentType = data.paymentTypeID.paymentType;
      this.clientName.fullName = this.updatedRowData[0].clientID.ClientName;
      this.addClaimValues.authorizationID = { 'Desc': '' };
      loader.style.display = 'none';
      if (this.updatedRowData[0].payeeID == null) {
        this.provider = { 'provider': data.providerID.providerName + ',' + data.providerID.providerID };
        this.isPayee = false;
        this.payType = { name: 'Provider', code: '1' };
        this.providerID = data.providerID.providerID;
        this.payeeId = null;
      } else {
        this.payee = { 'payee': data.payeeID.payeeName + ',' + data.payeeID.payeeID };
        this.payeeId = data.payeeID.payeeID;
        this.isPayee = true;
        this.payType = { name: 'Payee', code: '0' };
        this.providerID = null;
      }
      this.getClientsOnReceivedDate(this.payType);
      this.updatedRowData.map(itm => {
        itm.claimsByClient = {
          "claimList": [],
          "responseStatus": true
        }
        itm.isValid = true;
        itm.isValidate = true;
        itm.isDraft = true;

        itm.extension = itm.totalProviderRate;

        itm.beginDate = new Date(itm.beginDate);
        itm.endDate = new Date(itm.endDate);

        itm.PaymentType = itm.paymentType;
        // itm.Client = itm.clientID.ClientID + ' ; ' + itm.clientID.ClientName + ' ; ' + itm.clientID.SSN + ' ; ' + itm.clientID.Kaecses + ' ; DOB : ' + itm.clientID.DOB;
        itm.Client = itm.clientID;
        itm.procode = itm.procodeID;
        // itm.procode = itm.procodeID.ProcodeName;
        // itm.Referral = itm.referralID.ReferralType + " " + itm.referralID.BeginDate + " to " + itm.referralID.EndDate + " , " + itm.referralID.referralID;
        // itm.Referral = itm.referralID;
        // itm.clientID = itm.clientID.ClientID;
        itm.clientID = itm.clientID;
        // itm.procodeID = itm.procodeID.ProcodeID;
        itm.procodeID = itm.procodeID;
        // itm.referralID = itm.referralID.referralID;
        itm.referralID['display'] = itm.referralID.ReferralType + " " + itm.referralID.BeginDate + " to " + itm.referralID.EndDate + " , " + itm.referralID.referralID;
        itm.referralID = itm.referralID;
        // itm.paymentTypeID = itm.paymentTypeID.paymentTypeID;
        itm.PaymentType = itm.paymentTypeID;
        itm.providerID = itm.providerID;
        if (itm.providerID == null) {
          itm.rate = itm.payorRate;
        } else {
          itm.rate = itm.providerRate;
        }
        itm.payeeID = itm.payeeID;
        itm.receivedDate = new Date(itm.receivedDate);
        if (itm.authorizationID !== null) {
          // itm.authorizationID = itm.authorizationID.AuthorizationID;
          itm.authorizationID = itm.authorizationID;
        }

      });
      this.extensionCalc(this.updatedRowData);
      this.lastIndexFind();
      console.log("this.updatedRowData>>>>>>", this.updatedRowData);
    })

  };
  totalExtension = 0;
  extensionCalc(updatedRowData) {
    var extension = []
    updatedRowData.forEach(element => {
      extension.push(element.extension)
    });
    this.totalExtension = 0;
    for (var s in extension) {
      this.totalExtension += extension[s];
    }
  };
  isDraftIsDeleteThere = false;
  deleteAllShowBox() {
    this.isDraftIsDeleteThere = true;
  };

  DeleteAllClaims() {
    this.updatedRowData = [];
    this.isDraftIsDeleteThere = false;
  };;

  cancelDeleteBox() {
    this.isDraftIsDeleteThere = false;
  };

  proLista = [];
  getProcodeSearch(event) {
    this.proLista = [];
    if (this.procodeList.length > 0) {
      this.procodeList.filter((data: any) => {
        if (data.ProcodeName.toLowerCase().indexOf(event.query) !== -1) {
          this.proLista.push(data);
        }
      })
    }
  }

  // onEnterAddClaim(event: KeyboardEvent) {
  //   if (event.keyCode === 13) {
  //     return this.addClaim();
  //   } else {
  //     return;
  //   }
  // };
  add_claim(claimState) {
    console.log("this.clientName====", JSON.stringify(this.clientName));
    console.log("this.payment====", this.payment);

    this.addClaimValues.extension = 0;
    this.addClaimValues.rate = 0;
    console.log("this.updatedRowData>>>>>>", this.updatedRowData);

    if (this.updatedRowData.length === 0) {
      if (this.clientName === undefined || this.payment === undefined || this.clientName.fullName === null) {
        swal('Warning', 'please fill mandatory field', 'info');
      } else {
        this.addExtraClaim();
      }
      console.log("this.updatedRowData>>>>>>", this.updatedRowData);
    } else {
      let validateIndex = this.updatedRowData.length - 1;
      let validateData = this.updatedRowData[validateIndex];
      if (validateData.providerID === null) {
        this.updatedRowData[validateIndex].payorRate = validateData.rate;
        this.updatedRowData[validateIndex].totalPayorRate = validateData.extension;
      } else {
        this.updatedRowData[validateIndex].providerRate = validateData.rate;
        this.updatedRowData[validateIndex].totalProviderRate = validateData.extension;
      }
      if (this.updatedRowData[validateIndex].referralID === null || this.updatedRowData[validateIndex].referralID === undefined || this.updatedRowData[validateIndex].referralID === '') {
        this.updatedRowData[validateIndex]['errMsg_selectReferral'] = 'Please select Referral';
        this.updatedRowData[validateIndex]['referralValidEmptyError'] = true;
        // setTimeout(() => {
        //   this.updatedRowData[validateIndex]['errMsg_selectReferral'] = '';
        //   this.updatedRowData[validateIndex]['referralValidEmptyError'] = false;
        // }, 5000);
      } else if (validateData.beginDate === null || validateData.beginDate === undefined || validateData.beginDate === '') {
        this.updatedRowData[validateIndex].errMsg_beginDate_null = 'Please select begin date';
        this.updatedRowData[validateIndex]['beginDateError'] = true;
        setTimeout(() => {
          this.updatedRowData[validateIndex].errMsg_beginDate_null = '';
          this.updatedRowData[validateIndex]['beginDateError'] = false;
        }, 5000);
      } else if (validateData.endDate === null || validateData.endDate === undefined || validateData.endDate === '') {
        this.updatedRowData[validateIndex].errMsg_endDate_null = 'Please select End date';
        this.updatedRowData[validateIndex]['endDateError'] = true;
        setTimeout(() => {
          this.updatedRowData[validateIndex].errMsg_endDate_null = '';
          this.updatedRowData[validateIndex]['endDateError'] = false;
        }, 5000);
      } else if (this.updatedRowData[validateIndex].Client === null || this.updatedRowData[validateIndex].Client === undefined || this.updatedRowData[validateIndex].Client === "") {
        this.updatedRowData[validateIndex]['errMsg_selectClient'] = 'Please select Client';
        this.updatedRowData[validateIndex]['is_errMsgClient'] = true;
        setTimeout(() => {
          this.updatedRowData[validateIndex]['errMsg_selectClient'] = '';
          this.updatedRowData[validateIndex]['is_errMsgClient'] = false;
        }, 5000);
      } else if (this.updatedRowData[validateIndex].procodeID === null || this.updatedRowData[validateIndex].procodeID === undefined || JSON.stringify(this.updatedRowData[validateIndex].procodeID) === JSON.stringify({}) || this.updatedRowData[validateIndex].procodeID === "") {
        this.updatedRowData[validateIndex]['is_errMsgprocode'] = true;
        this.updatedRowData[validateIndex]['errMsg_select_procode'] = 'Please select procode';
        setTimeout(() => {
          this.updatedRowData[validateIndex]['errMsg_select_procode'] = '';
          this.updatedRowData[validateIndex]['is_errMsgprocode'] = false;
        }, 5000);
      } else if (this.updatedRowData[validateIndex].PaymentType === null || this.updatedRowData[validateIndex].PaymentType === undefined) {
        this.updatedRowData[validateIndex]['is_errMsg_payment_type'] = true;
        this.updatedRowData[validateIndex]['errMsg_select_payment_type'] = 'Please select Payment Type';
        setTimeout(() => {
          this.updatedRowData[validateIndex]['errMsg_select_payment_type'] = '';
          this.updatedRowData[validateIndex]['is_errMsg_payment_type'] = false;
        }, 5000);
      } else if (this.updatedRowData[validateIndex].rate === null || this.updatedRowData[validateIndex].rate === undefined || this.updatedRowData[validateIndex].rate === 0 || this.updatedRowData[validateIndex].rate === "") {
        this.updatedRowData[validateIndex]['is_errMsg_rate'] = true;
        this.updatedRowData[validateIndex]['errMsg_select_rate'] = 'Please select rate';
        setTimeout(() => {
          this.updatedRowData[validateIndex]['is_errMsg_rate'] = false;
          this.updatedRowData[validateIndex]['errMsg_select_rate'] = '';
        }, 5000);
      } else if (this.updatedRowData[validateIndex].units === null || this.updatedRowData[validateIndex].units === undefined || this.updatedRowData[validateIndex].units === 0 || this.updatedRowData[validateIndex].units === '') {
        this.updatedRowData[validateIndex]['is_errMsg_units'] = true;
        this.updatedRowData[validateIndex]['errMsg_select_units'] = 'Please select units';
        setTimeout(() => {
          this.updatedRowData[validateIndex]['is_errMsg_units'] = false;
          this.updatedRowData[validateIndex]['errMsg_select_units'] = '';
        }, 5000);
      } else if ((this.updatedRowData[validateIndex].beginDate != null && this.updatedRowData[validateIndex].endDate != null) && (this.updatedRowData[validateIndex].endDate) < (this.updatedRowData[validateIndex].beginDate)) {
        this.updatedRowData[validateIndex].errMsg_endDate_null = 'begin date should not be greater than end date';
        this.updatedRowData[validateIndex]['endDateError'] = true;
        this.updatedRowData[validateIndex].errMsg_beginDate_null = 'begin date should not be greater than end date';
        this.updatedRowData[validateIndex]['beginDateError'] = true;
        this.updatedRowData[validateIndex].beginDate = null;
        this.updatedRowData[validateIndex]['endDate'] = null;
        setTimeout(() => {
          this.updatedRowData[validateIndex].errMsg_endDate_null = '';
          this.updatedRowData[validateIndex]['endDateError'] = false;
          this.updatedRowData[validateIndex].errMsg_beginDate_null = '';
          this.updatedRowData[validateIndex]['beginDateError'] = false;
        }, 5000);
      } else if (Date.parse(this.updatedRowData[validateIndex].beginDate) > Date.parse(this.currentDate)) {
        this.updatedRowData[validateIndex].errMsg_beginDate_null = 'Begin Date cannot be greater than Today';
        this.updatedRowData[validateIndex]['beginDateError'] = true;
        setTimeout(() => {
          this.updatedRowData[validateIndex].errMsg_beginDate_null = '';
          this.updatedRowData[validateIndex]['beginDateError'] = false;
        }, 5000);
      } else if (Date.parse(this.updatedRowData[validateIndex].endDate) > Date.parse(this.currentDate)) {
        this.updatedRowData[validateIndex]['errMsg_endDate_null'] = 'End Date cannot be greater than Today';
        this.updatedRowData[validateIndex]['endDateError'] = true;
        setTimeout(() => {
          this.updatedRowData[validateIndex].errMsg_endDate_null = '';
          this.updatedRowData[validateIndex]['endDateError'] = false;
        }, 5000);
      }
      else {
        this.showValidate_Claim(this.updatedRowData[validateIndex], claimState);
        // this.addExtraClaim();
      }

    }


    //this.addClaimValues.beginDate = new Date(this.currentDate);
    // !isNullOrUndefined(this.payment) ? this.addClaimValues.paymentType = { 'paymentType': this.payment.paymentType } : null
    // this.addClaimValues.clientName = { 'fullName': this.clientName.fullName };

  };
  addExtraClaim() {
    let resData = {
      Client: this.clientName,
      PaymentType: this.payment,
      Referral: "",
      authRate: "",
      authorizationID: "",
      beginDate: "",
      claimsByClient: "",
      clientID: "",
      endDate: "",
      enteredBy: "",
      errMsg_Authorization: "",
      errMsg_Bdate_greter_today: "",
      errMsg_Edate_greter_today: "",
      errMsg_authorization_hold: "",
      errMsg_beginDate_greater_endDate: "",
      errMsg_beginDate_null: "",
      errMsg_date_referral_date: "",
      errMsg_date_same: "",
      errMsg_date_validdate: "",
      errMsg_endDate_null: "",
      errMsg_rate_grater_zero: "",
      errMsg_rate_lessEqual_authRate: "",
      errMsg_selectClient: "",
      errMsg_select_payment_type: "",
      errMsg_select_procode: "",
      errMsg_select_rate: "",
      errMsg_select_units: "",
      errMsg_unit_grater_zero: "",
      errMsg_units_less_unitMax: "",
      extension: 0,
      notes: "",
      payeeID: this.payeeId,
      providerID: this.providerID,
      paymentNotes: null,
      paymentTypeID: {},
      payorRate: "",
      procode: "",
      procodeID: {},
      providerRate: "",
      rate: 0,
      receivedDate: this.receivedDate,
      referralBeginDate: "",
      referralEndDate: "",
      referralID: "",
      totalPayorRate: "",
      totalProviderRate: "",
      unitMax: "",
      units: "",
      unitsRemainingSample: "",
      validBeginDate: "",
      validEndDate: "",
    };
    this.updatedRowData.push(resData);
    this.lastIndexFind();
  }
  begindateEnddateValidation(i, clData) {
    var claim_beginDate = new Date(clData.beginDate);
    var claimBeginDate = claim_beginDate.getMonth();
    var claim_endDate = new Date(clData.endDate);
    var claimEndDate = claim_endDate.getMonth();

    if ((clData.beginDate != null && clData.endDate != null) && (clData.endDate) < (clData.beginDate)) {
      this.updatedRowData[i].errMsg_endDate_null = 'begin date should not be greater than end date';
      this.updatedRowData[i]['endDateError'] = true;
      this.updatedRowData[i].errMsg_beginDate_null = 'begin date should not be greater than end date';
      this.updatedRowData[i]['beginDateError'] = true;
      this.updatedRowData[i].beginDate = null;
      this.updatedRowData[i]['endDate'] = null;
      setTimeout(() => {
        this.updatedRowData[i].errMsg_endDate_null = '';
        this.updatedRowData[i]['endDateError'] = false;
        this.updatedRowData[i].errMsg_beginDate_null = '';
        this.updatedRowData[i]['beginDateError'] = false;
      }, 5000);
    }
    if (Date.parse(clData.beginDate) > Date.parse(this.currentDate)) {
      this.updatedRowData[i].errMsg_beginDate_null = 'Begin Date cannot be greater than Today';
      this.updatedRowData[i]['beginDateError'] = true;
      setTimeout(() => {
        this.updatedRowData[i].errMsg_beginDate_null = '';
        this.updatedRowData[i]['beginDateError'] = false;
      }, 5000);
    } if (Date.parse(clData.endDate) > Date.parse(this.currentDate)) {
      this.updatedRowData[i]['errMsg_endDate_null'] = 'End Date cannot be greater than Today';
      this.updatedRowData[i]['endDateError'] = true;
      setTimeout(() => {
        this.updatedRowData[i].errMsg_endDate_null = '';
        this.updatedRowData[i]['endDateError'] = false;
      }, 5000);
    } if (claimBeginDate != claimEndDate) {
      this.updatedRowData[i].errMsg_endDate_null = 'BeginDate and EndDate must be within the same month';
      this.updatedRowData[i]['endDateError'] = true;
      this.updatedRowData[i].errMsg_beginDate_null = 'BeginDate and EndDate must be within the same month';
      this.updatedRowData[i]['beginDateError'] = true;
      this.updatedRowData[i].beginDate = null;
      this.updatedRowData[i]['endDate'] = null;
      setTimeout(() => {
        this.updatedRowData[i].errMsg_endDate_null = '';
        this.updatedRowData[i]['endDateError'] = false;
        this.updatedRowData[i].errMsg_beginDate_null = '';
        this.updatedRowData[i]['beginDateError'] = false;
      }, 5000);
    }

  }
  onMenuKeydown(event, claimState) {
    if (event.code === 'Enter') {
      this.add_claim(claimState);
    }
  };
  lastIndexFind() {
    this.updatedRowData.map(itm => {
      itm.isLastIndex = false;
    });
    let validateIndex = this.updatedRowData.length - 1;
    this.updatedRowData[validateIndex]['isLastIndex'] = true;
    console.log("this.updatedRowData>>>>", this.updatedRowData);
  };


  multipleAdd(data, validateIndex) {
    let validateData = this.updatedRowData[validateIndex];
    if (this.updatedRowData[validateIndex].referralID === null || this.updatedRowData[validateIndex].referralID === undefined || this.updatedRowData[validateIndex].referralID === '') {
      this.updatedRowData[validateIndex]['errMsg_selectReferral'] = 'Please select Referral';
      this.updatedRowData[validateIndex]['referralValidEmptyError'] = true;
      setTimeout(() => {
        this.updatedRowData[validateIndex]['errMsg_selectReferral'] = '';
        this.updatedRowData[validateIndex]['referralValidEmptyError'] = false;
      }, 5000);
    } else if (validateData.beginDate === null || validateData.beginDate === undefined || validateData.beginDate === '') {
      this.updatedRowData[validateIndex].errMsg_beginDate_null = 'Please select begin date';
      this.updatedRowData[validateIndex]['beginDateError'] = true;
      setTimeout(() => {
        this.updatedRowData[validateIndex].errMsg_beginDate_null = '';
        this.updatedRowData[validateIndex]['beginDateError'] = false;
      }, 5000);
    } else if (validateData.endDate === null || validateData.endDate === undefined || validateData.endDate === '') {
      this.updatedRowData[validateIndex].errMsg_endDate_null = 'Please select End date';
      this.updatedRowData[validateIndex]['endDateError'] = true;
      setTimeout(() => {
        this.updatedRowData[validateIndex].errMsg_endDate_null = '';
        this.updatedRowData[validateIndex]['endDateError'] = false;
      }, 5000);
    } else if (this.updatedRowData[validateIndex].Client === null || this.updatedRowData[validateIndex].Client === undefined || this.updatedRowData[validateIndex].Client === "") {
      this.updatedRowData[validateIndex]['errMsg_selectClient'] = 'Please select Client';
      this.updatedRowData[validateIndex]['is_errMsgClient'] = true;
      setTimeout(() => {
        this.updatedRowData[validateIndex]['errMsg_selectClient'] = '';
        this.updatedRowData[validateIndex]['is_errMsgClient'] = false;
      }, 5000);
    } else if (this.updatedRowData[validateIndex].procodeID === null || this.updatedRowData[validateIndex].procodeID === undefined || JSON.stringify(this.updatedRowData[validateIndex].procodeID) === JSON.stringify({}) || this.updatedRowData[validateIndex].procodeID === "") {
      this.updatedRowData[validateIndex]['is_errMsgprocode'] = true;
      this.updatedRowData[validateIndex]['errMsg_select_procode'] = 'Please select procode';
      setTimeout(() => {
        this.updatedRowData[validateIndex]['errMsg_select_procode'] = '';
        this.updatedRowData[validateIndex]['is_errMsgprocode'] = false;
      }, 5000);
    } else if (this.updatedRowData[validateIndex].PaymentType === null || this.updatedRowData[validateIndex].PaymentType === undefined) {
      this.updatedRowData[validateIndex]['is_errMsg_payment_type'] = true;
      this.updatedRowData[validateIndex]['errMsg_select_payment_type'] = 'Please select Payment Type';
      setTimeout(() => {
        this.updatedRowData[validateIndex]['errMsg_select_payment_type'] = '';
        this.updatedRowData[validateIndex]['is_errMsg_payment_type'] = false;
      }, 5000);
    } else if (this.updatedRowData[validateIndex].rate === null || this.updatedRowData[validateIndex].rate === undefined || this.updatedRowData[validateIndex].rate === 0 || this.updatedRowData[validateIndex].rate === "") {
      this.updatedRowData[validateIndex]['is_errMsg_rate'] = true;
      this.updatedRowData[validateIndex]['errMsg_select_rate'] = 'Please select rate';
      setTimeout(() => {
        this.updatedRowData[validateIndex]['is_errMsg_rate'] = false;
        this.updatedRowData[validateIndex]['errMsg_select_rate'] = '';
      }, 5000);
    } else if (this.updatedRowData[validateIndex].rate <= 0) {
      this.updatedRowData[validateIndex]['is_errMsg_rate'] = true;
      this.updatedRowData[validateIndex]['errMsg_select_rate'] = 'Rate must be greater than 0';
      setTimeout(() => {
        this.updatedRowData[validateIndex]['is_errMsg_rate'] = false;
        this.updatedRowData[validateIndex]['errMsg_select_rate'] = '';
      }, 5000);
    } else if (this.updatedRowData[validateIndex].units === null || this.updatedRowData[validateIndex].units === undefined || this.updatedRowData[validateIndex].units === 0 || this.updatedRowData[validateIndex].units === '') {
      this.updatedRowData[validateIndex]['is_errMsg_units'] = true;
      this.updatedRowData[validateIndex]['errMsg_select_units'] = 'Please select units';
      setTimeout(() => {
        this.updatedRowData[validateIndex]['is_errMsg_units'] = false;
        this.updatedRowData[validateIndex]['errMsg_select_units'] = '';
      }, 5000);
    } else if (this.updatedRowData[validateIndex].units <= 0) {
      this.updatedRowData[validateIndex]['is_errMsg_units'] = true;
      this.updatedRowData[validateIndex]['errMsg_select_units'] = 'Unit must be greater than 0';
      setTimeout(() => {
        this.updatedRowData[validateIndex]['is_errMsg_units'] = false;
        this.updatedRowData[validateIndex]['errMsg_select_units'] = '';
      }, 5000);
    } else if ((this.updatedRowData[validateIndex].beginDate != null && this.updatedRowData[validateIndex].endDate != null) && (this.updatedRowData[validateIndex].endDate) < (this.updatedRowData[validateIndex].beginDate)) {
      this.updatedRowData[validateIndex].errMsg_endDate_null = 'begin date should not be greater than end date';
      this.updatedRowData[validateIndex]['endDateError'] = true;
      this.updatedRowData[validateIndex].errMsg_beginDate_null = 'begin date should not be greater than end date';
      this.updatedRowData[validateIndex]['beginDateError'] = true;
      this.updatedRowData[validateIndex].beginDate = null;
      this.updatedRowData[validateIndex]['endDate'] = null;
      setTimeout(() => {
        this.updatedRowData[validateIndex].errMsg_endDate_null = '';
        this.updatedRowData[validateIndex]['endDateError'] = false;
        this.updatedRowData[validateIndex].errMsg_beginDate_null = '';
        this.updatedRowData[validateIndex]['beginDateError'] = false;
      }, 5000);
    } else if (Date.parse(this.updatedRowData[validateIndex].beginDate) > Date.parse(this.currentDate)) {
      this.updatedRowData[validateIndex].errMsg_beginDate_null = 'Begin Date cannot be greater than Today';
      this.updatedRowData[validateIndex]['beginDateError'] = true;
      setTimeout(() => {
        this.updatedRowData[validateIndex].errMsg_beginDate_null = '';
        this.updatedRowData[validateIndex]['beginDateError'] = false;
      }, 5000);
    } else if (Date.parse(this.updatedRowData[validateIndex].endDate) > Date.parse(this.currentDate)) {
      this.updatedRowData[validateIndex]['errMsg_endDate_null'] = 'End Date cannot be greater than Today';
      this.updatedRowData[validateIndex]['endDateError'] = true;
      setTimeout(() => {
        this.updatedRowData[validateIndex].errMsg_endDate_null = '';
        this.updatedRowData[validateIndex]['endDateError'] = false;
      }, 5000);
    }
    else {
      this.showValidate_Claim(this.updatedRowData[validateIndex], 'multiclaiamAdd');
    }


  };


  showValidate_Claim(saveData, claimState) {
    console.log("saveData>>>>", saveData);
    var isOverLapAccept = true;
    let loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    isNullOrUndefined(localStorage.getItem('UserId')) ? 4620 : localStorage.getItem('UserId');
    var req = {
      "referralID": saveData.referralID.referralID,
      "clientID": saveData.Client.ClientID,
      "authorizationID": isNullOrUndefined(saveData.authorizationID) ? null : saveData.authorizationID.AuthorizationID,
      "beginDate": this._localValues.stringFormatDatetime(saveData.beginDate),
      "endDate": this._localValues.stringFormatDatetime(saveData.endDate),
      "procodeID": saveData.procodeID.ProcodeID,
      "units": saveData.units,
      "providerID": this.providerID || null,
      "payeeID": this.payeeId || null
    }

    this._openCards.getAuthValidate(req).then((data) => {
      loader.style.display = 'none';
      console.log('data>>>>>>>>>>', JSON.stringify(data.dateValidation));
      if (JSON.stringify(data.dateValidation) === JSON.stringify({})) {
        data.dateValidation.responseMessage = "Verified";
        data.dateValidation.responseStatus = true;
      }
      if (JSON.stringify(data.procodeValidation) === JSON.stringify({})) {
        data.procodeValidation.responseMessage = "Verified";
        data.procodeValidation.responseStatus = true;
      }
      if (JSON.stringify(data.referralDateValidation) === JSON.stringify({})) {
        data.referralDateValidation.responseMessage = "Verified";
        data.referralDateValidation.responseStatus = true;
      }
      if (!data.dateValidation.responseStatus || !data.procodeValidation.responseStatus || !data.referralDateValidation.responseStatus) {
        if (!data.dateValidation.responseStatus) {
          // swal('Warning', data.dateValidation.responseMessage, 'info');
          Swal.fire({
            title: data.dateValidation.responseMessage,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((res) => {
            console.log('res', res);
            if (res.value === true) {
              isOverLapAccept = true;
            } else {
              isOverLapAccept = false;
            }
          });
        } else {
          isOverLapAccept = true;
        }
        if (!data.procodeValidation.responseStatus) {
          swal('Warning', data.procodeValidation.responseMessage, 'info');
        } else {

        }
        if (!data.referralDateValidation.responseStatus) {
          swal('Warning', data.referralDateValidation.responseMessage, 'info');
        } else {

        }
      } else {
        if (claimState === 'multiclaiamAdd') {
          let resData = {
            Client: saveData.Client,
            PaymentType: saveData.PaymentType,
            Referral: saveData.Referral,
            authRate: saveData.authRate,
            authorizationID: saveData.authorizationID,
            beginDate: saveData.beginDate,
            claimsByClient: saveData.claimsByClient,
            clientID: saveData.clientID,
            endDate: saveData.endDate,
            enteredBy: saveData.enteredBy,
            errMsg_Authorization: "",
            errMsg_Bdate_greter_today: "",
            errMsg_Edate_greter_today: "",
            errMsg_authorization_hold: "",
            errMsg_beginDate_greater_endDate: "",
            errMsg_beginDate_null: "",
            errMsg_date_referral_date: "",
            errMsg_date_same: "",
            errMsg_date_validdate: "",
            errMsg_endDate_null: "",
            errMsg_rate_grater_zero: "",
            errMsg_rate_lessEqual_authRate: "",
            errMsg_selectClient: "",
            errMsg_select_payment_type: "",
            errMsg_select_procode: "",
            errMsg_select_rate: "",
            errMsg_select_units: "",
            errMsg_unit_grater_zero: "",
            errMsg_units_less_unitMax: "",
            extension: null,
            id: data.id,
            isNotValidate: true,
            isValidate: false,
            notes: null,
            payeeID: saveData.payeeID,
            providerID: saveData.providerID,
            paymentNotes: null,
            paymentTypeID: saveData.paymentTypeID,
            payorRate: saveData.payorRate,
            procode: saveData.procode,
            procodeID: saveData.procodeID,
            providerRate: saveData.providerRate,
            rate: saveData.rate,
            receivedDate: saveData.receivedDate,
            referralBeginDate: saveData.referralBeginDate,
            referralEndDate: saveData.referralEndDate,
            referralID: saveData.referralID,
            totalPayorRate: saveData.totalPayorRate,
            totalProviderRate: saveData.totalProviderRate,
            unitMax: saveData.unitMax,
            units: null,
            unitsRemainingSample: saveData.unitsRemainingSample,
            validBeginDate: saveData.validBeginDate,
            validEndDate: saveData.validEndDate,
          };
          this.updatedRowData.push(resData);
          this.lastIndexFind();
        } else if (claimState === 'submitClaim') {
          this.submitClaim(this.updatedRowData);
        } else if (claimState === 'saveClaim') {
          this.saveClaim(this.updatedRowData);
        } else {
          if (isOverLapAccept) {
            this.addExtraClaim();
          }
        }

      };
    })
  };
}
