import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClaimDetails } from './claim-details';
import { ClildFormService } from '../child-forms/child-forms.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { ColDef, GridOptions } from 'ag-grid';
import swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { TeamFormService } from '../team-form/team-form.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as moment from 'moment';
@Component({
  selector: 'app-claims-list-details',
  templateUrl: './claims-list-details.component.html',
  styleUrls: ['./claims-list-details.component.scss']
})
export class ClaimsListDetailsComponent implements OnInit {
  title: any = 'Claims';
  status = 'draft';
  breadcrumbs = [];
  formStatus?: any;
  isRestart = true;
  isSubmit = false;
  isValidate = true;
  isReport = false;
  showAddClaim: boolean = true;
  defaultColDef;
  claimDetails: ClaimDetails = new ClaimDetails();
  claim: FormGroup;
  getClaimIdDetails: any;
  claimListDetails: any[];
  displayDialog: boolean;
  filteredClient = [];
  client = [];
  results = [];
  clientId: any;
  referralID: any;
  providerID: any;
  authorizationID: any;
  referral: any;
  payType = '1';
  receivedDate: any;
  payee: any;
  provider: any;
  defClient: any;
  defPaymentType: any;
  rowData = [];
  Client: any;
  Referral: any;
  isUnique: boolean;
  uniqueId: any;
  newCount = 0;
  procodeId: any;
  isPayee: boolean;
  payeeId: any;
  isAuth: boolean = false;
  paymentTypeId: any;
  validBeginDate: any;
  validEndDate: any;
  showError: boolean;
  errMsg: any;
  displayClaim: boolean;
  claimRowData = [];
  authorizationStatus: any;
  unitsRemaining: any;
  isDisabled = true;
  unitMax: any;
  referralBeginDate: any;
  referralEndDate: any;
  currentDate: any;
  claimId: any;
  authStatus: any;
  authRate: any;
  enteredBy: any;
  showInfo = false;
  showInfoInc = 0;
  claimsByClientlength = 0;
  columnDefs: ColDef[] = [
    { headerName: 'Client', field: 'Client' },
    { headerName: 'Referral', field: 'Referral' },
    { headerName: 'Payment type', field: 'PaymentType' },
    { headerName: 'Authorization ID', field: 'authorizationID' },
    { headerName: 'Begin date', field: 'beginDate' },
    { headerName: 'End date', field: 'endDate' },
    { headerName: 'Procode', field: 'procode' },
    { headerName: 'Notes', field: 'notes' },
    { headerName: 'Payment notes', field: 'paymentNotes' },
    { headerName: 'Units', field: 'units' },
    { headerName: 'Rate', field: 'rate' },
    { headerName: 'Extension', field: 'extension' },
  ];
  gridOptions: GridOptions;
  isAttachmentRequired = false;
  url: any;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _openCards: OpencardsService,
    public formBuilder: FormBuilder, public _person: ClildFormService,
    public _CaseTeamService: CaseTeamService, public _router: Router, public _team: TeamFormService) {
    this.gridOptions = <GridOptions>{};
  }

  ngOnInit() {
    localStorage.removeItem('clientName');
    this.currentDate = new Date();
    this.formValidation();
    this.getClaimDetails();
    this.dynamicUrl();
    this.getStaffDetails();
  }
  getStaffDetails() {
    let staffId = localStorage.getItem('UserId') || '14802';
    this._team.getUserById({ staffID: parseInt(staffId) }).then(data => {
      this.enteredBy = data.users.firstName + data.users.lastName;
    })
  }
  dynamicUrl() {
    if (this._router.url == '/claims/list/authorizationSummary/details') {
      this.claim.disable();
      this.breadcrumbs.push(
        { label: 'List', href: "/reports/client", active: '' },
        { label: 'Form', href: "/reports/client/details", active: '' },
        { label: 'Case', href: "/reports/opencards/list/client/case", active: '' },
        { label: 'Authorization Summary', href: "/reintegration/referral/service/authorization/summary", active: '' },
        { label: 'Form View', href: "/reintegration/referral/service/authorization/summary/detail", active: '' },
        { label: 'List View', href: "/reintegration/referral/service/opencard/claim/authorizationSummary", active: '' },
        { label: 'View', href: "/claims/list/authorizationSummary/details", active: 'active' },
      );
    }
    if (this._router.url == '/claims/list/details') {
      this.isAttachmentRequired = true;
      this.breadcrumbs.push(
        { label: 'List', href: "/claims/list/view", active: '' },
        { label: 'Form', href: "/claims/list/details", active: 'active' }
      );
    }
  }
  formValidation() {
    this.claim = this.formBuilder.group({
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
      extension: [null]
    })
  }

  getPayee(event) {
    this.provider = { 'provider': null };

    let req;
    req = { 'Object': 'payee', 'value': event.query }
    return this._CaseTeamService.getSearchList(req).then((data) => {
      data.dropDown.map((item) => {
        item['payee'] = item.payeeName + ' ,' + item.payeeID;
      })
      this.results = data.dropDown;
    })
  }
  getPayeeId(event) {
    this.payeeId = event.payeeID;
  }
  getClaimDetails() {
    let claimArr = [];
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { 'claimID': localStorage.getItem('claimId') };
    this.getClaimIdDetails = this._openCards.getClaimIDDetails(this.req)
      .then((data) => {
        if (data) {
          if (data.claim.providerID !== null) {
            this.payType = '1';
            this.isPayee = false;
          } else {
            this.payType = '0';
            this.isPayee = true;
          }
          if ((data.claim.status === 'posted') || (data.claim.status === 'Posted')) {
            this.showAddClaim = false;
            this.isRestart = false;
            this.isSubmit = false;
            this.isValidate = false;
            this.isDisabled = true;
          }
          this.getClientDetails(data.claim.clientID.clientID);
          this.updateDefClaim(data);
          !isNullOrUndefined(data.claim.clientID) ? this.clientId = data.claim.clientID.clientID : null;
          !isNullOrUndefined(data.claim.providerID) ? this.providerID = data.claim.providerID.providerID : null;
          !isNullOrUndefined(data.claim.referralID) ? this.referralID = data.claim.referralID.referralID : null;
          !isNullOrUndefined(data.claim.notes) ? this.claimDetails.notes = data.claim.notes : null;
          !isNullOrUndefined(data.claim.paymentNotes) ? this.claimDetails.paymentNotes = data.claim.paymentNotes : null;
          !isNullOrUndefined(data.claim.paymentTypeID) ? this.claimDetails.paymentType = data.claim.paymentTypeID.paymentType : null;
          !isNullOrUndefined(data.claim.receivedDate) ? this.receivedDate = new Date(data.claim.receivedDate) : null;


          var providerType = !isNullOrUndefined(data.claim.providerID.providerTypeID) ? data.claim.providerID.providerTypeID.providerType : null;

          !isNullOrUndefined(data.claim.providerID) ? this.provider = data.claim.providerID.providerName + ' ,' + providerType + ' , ' + data.claim.fedTaxNo : null;
          !isNullOrUndefined(data.claim.clientID) ? this.defClient = data.claim.clientID.clientID + ' , ' + data.claim.clientID.lastName + ' ' + data.claim.clientID.firstName + ' , ' + data.claim.clientID.ssn + ' , ' + data.claim.clientID.kaecses : null;
          !isNullOrUndefined(data.claim.paymentTypeID) ? this.defPaymentType = data.claim.paymentTypeID.paymentType : null;
          !isNullOrUndefined(this.defClient) ? this.claimDetails.clientName = this.defClient : null;
          !isNullOrUndefined(data.claim.beginDate) ? this.claimDetails.beginDate =
            moment.utc(data.claim.beginDate).format('MM/DD/YYYY HH:mm') : null;
          !isNullOrUndefined(data.claim.endDate) ? this.claimDetails.endDate =
            moment.utc(data.claim.endDate).format('MM/DD/YYYY HH:mm') : null;
          !isNullOrUndefined(data.claim.payeeID) ? this.payeeId = data.claim.payeeID.payeeID : null;
          !isNullOrUndefined(data.claim.payeeID) ? this.payee = { 'payee': data.claim.payeeID.payeeName } : null;

          data.claim.clientName = localStorage.getItem('clientName');
          delete data.claim['claimStatusID'];
          data.claim.providerID = this.providerID;
          data.claim.clientID = this.clientId;
          data.claim.referralID = this.referralID;
          data.claim.paymentTypeID = data.claim.paymentTypeID.paymentTypeID;
          data.claim.procodeID = data.claim.procodeID.procodeID;
          data.claim.id = 0;
          claimArr.push(data.claim);
        } else {
          loader.style.display = 'none';
        }
      })
      .then((data) => {
        this.claimListDetails = claimArr;
        loader.style.display = 'none';
      })
  }
  updateDefClaim(data) {
    data.claim.Client = localStorage.getItem('clientName');

    // data.claim.Referral = data.claim.referralID.caseID.referralTypeID.referralType + ' ' + new Date(data.claim.referralID.caseID.referralTypeID.beginDate).toLocaleDateString() + ' TO ' + new Date(data.claim.referralID.caseID.referralTypeID.endDate).toLocaleDateString() + ' , ' + data.claim.referralID.referralID;
    data.claim.Referral = !isNullOrUndefined(data.claim.referralID.caseID) ? data.claim.referralID.caseID.referralTypeID.referralType + ' ' + new Date(data.claim.referralID.caseID.referralTypeID.beginDate).toLocaleDateString() + ' TO ' + new Date(data.claim.referralID.caseID.referralTypeID.endDate).toLocaleDateString() + ' , ' + data.claim.referralID.referralID : null;
    data.claim.PaymentType = data.claim.paymentTypeID.paymentType;
    data.claim.procode = data.claim.procodeID.procode;
    data.claim.beginDate = !isNullOrUndefined(data.claim.beginDate) ? this.claimDetails.beginDate =
      moment.utc(data.claim.beginDate).format('MM/DD/YYYY HH:mm') : null;
    data.claim.endDate = !isNullOrUndefined(data.claim.endDate) ? this.claimDetails.endDate =
      moment.utc(data.claim.endDate).format('MM/DD/YYYY HH:mm') : null;
    if (this.payType === '1') {
      data.claim.rate = data.claim.totalProviderRate;
    } else {
      data.claim.rate = data.claim.totalPayorRate;
    }
    data.claim.extension = data.claim.totalProviderRate * data.claim.units;
  }
  getClientDetails(clientId) {
    let req = { 'clientID': clientId }
    this._person.getDetailsById(req).then(data => {
      this.client = data.person;
      localStorage.setItem('clientName', data.person.lastName + ' ' + data.person.firstName + ' , ' + data.person.ssn + ' , ' + data.person.kaecses);
      this.claimDetails.clientName = localStorage.getItem('clientName');
    });
  }

  getReferralForClient(event) {
    let req;
    req = { clientID: this.clientId, value: event.query }
    return this._CaseTeamService.getClaimReferralByCleintId(req).then((data) => {
      data.dropDown.map((item) => {
        if (item.EndDate === null) {
          item['display'] = item.ReferralType + ' ' + new Date(item.BeginDate).toLocaleDateString() + ' , ' + item.referralID;
        } else if (item.EndDate) {
          item['display'] = item.ReferralType + ' ' + new Date(item.BeginDate).toLocaleDateString() + ' TO ' + new Date(item.EndDate).toLocaleDateString() + ' , ' + item.referralID;
        }
      })
      this.results = data.dropDown;
    })
  }
  getReferralId(event) {
    this.referralID = event.referralID;
    this.referralBeginDate = event.BeginDate;
    this.referralEndDate = event.EndDate;
  }
  getPaymentType(event) {
    let req;
    req = { 'Object': 'paymentType', 'value': event.query }
    return this._CaseTeamService.getSearchList(req).then((data) => {
      data.dropDown.map((item) => {
        item['paymentType'] = item.paymentType;
      })
      this.results = data.dropDown;
    })
  }
  getPaymentInfo(event) {
    this.paymentTypeId = event.paymentTypeID;
  }
  getAuthorizationId(event) {
    let req;
    req = { 'referralID': this.referralID, 'clientID': localStorage.getItem('clientId'), 'providerID': this.providerID }
    return this._CaseTeamService.getAuthorizationId(req).then((data) => {
      if (data.authorization.length <= 0) {
        this.claimDetails.authorizationID = { 'Desc': '' };
        this.isAuth = true;
      }
      data.authorization.map((item) => {
        item['Desc'] = item.Desc;
      })
      this.results = data.authorization;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.authorization.changedBy) ? data.authorization.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.authorization.changedDate) ? moment(data.authorization.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.authorization.enteredBy) ? data.authorization.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.authorization.enteredDate) ? moment(data.authorization.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  generateAuthorization(event) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.claim.disable();
    let desc = event.Desc.split('; ');
    let descOne = desc[0].split(' (');
    this.claimDetails.authorizationID = { 'Desc': parseInt(descOne[0]) };
    this.claimDetails.validBeginDate = new Date(descOne[1]);
    this.claimDetails.validEndDate = new Date(desc[1]);
    let descRate = desc[2].split(')');
    this.authRate = descRate[0];
    this.claimDetails.rate = descRate[0];
    this.claimDetails.procode = { 'fullName': event.Procode };
    this.procodeId = event.ProcodeID;
    this.authStatus = event.AuthorizationStatus;
    this.claimDetails.unitsRemainingSample = event.UnitsRemaining;
    this.claimDetails.units = 0;
    this.claimDetails.authEnteredBy = event.EnteredBy;
    if (event.Procode) {
      this.isAuth = false;
    } else {
      this.isAuth = true;
    }
    this.authorizationStatus = event.AuthorizationStatus;
    this.unitsRemaining = event.UnitsRemaining;
    let req;
    req = { "clientID": localStorage.getItem('clientId'), "procodeID": event.ProcodeID }
    this._CaseTeamService.getClaimsByClient(req).then((data) => {
      this.claimDetails.claimsByClient = data;
      loader.style.display = 'none';
      this.claim.enable();
    })
  }
  getProcode(event) {
    let req;
    req = { 'Object': 'procode', 'value': event.query }
    return this._CaseTeamService.getSearchList(req).then((data) => {
      data.dropDown.map((data) => {
        data['fullName'] = data.procode + ' , ' + data.categoryOfService;
      })
      this.results = data.dropDown;
    })
  }
  getProcodeInfo(event) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.claim.disable();
    this.claimDetails.beginDate = '';
    this.claimDetails.endDate = '';
    this.procodeId = event.procodeID;
    let req;
    req = { "clientID": localStorage.getItem('clientId'), "procodeID": event.procodeID }
    this._CaseTeamService.getClaimsByClient(req).then((data) => {
      this.claimDetails.claimsByClient = data;
      loader.style.display = 'none';
      this.claim.enable();
    })
  }
  filterClient(event) {
    let beginDate = new Date(this.receivedDate);
    beginDate.setFullYear(beginDate.getFullYear() - 1);
    let newDate: any;
    newDate = beginDate;
    if (this.payType == '1') {
      this.isPayee = false;
      let req;
      req = { "providerID": this.providerID, "beginDate": Date.parse(newDate) }
      return this._CaseTeamService.getProviderClient(req).then((data) => {
        data.providerClient.map((item) => {
          item['fullName'] = item.ClientID + ' , ' + item.ClientName + ' , ' + item.SSN + ' , ' + item.Kaecses + ' , ' + new Date(item.DOB).toLocaleDateString();
        })
        this.filteredClient = data.providerClient;
      })
    } else if (this.payType == '0') {
      this.isPayee = true;
      let req;
      req = { "isPayee": 'true', 'providerID': this.payeeId, "beginDate": Date.parse(newDate) }
      return this._CaseTeamService.getPayeeClient(req).then((data) => {
        data.payeeClient.map((item) => {
          item['fullName'] = item.ClientID + ' , ' + item.ClientName + ' , ' + item.SSN + ' , ' + item.Kaecses;
        })
        this.filteredClient = data.payeeClient;
      })
    }
  }
  generateExtension(event) {
    this.claimDetails.extension = this.claimDetails.units * this.claimDetails.rate;
  }
  getRate(event) {
    if (this.claimDetails.units) {
      this.claimDetails.extension = this.claimDetails.units * event;
    }
  }
  getClient(event) {
    localStorage.setItem('clientId', event.ClientID)
  }
  addClaim() {
    this.showError = false;
    this.claimDetails = new ClaimDetails();
    this.claimDetails.extension = 0;
    this.claimDetails.rate = 0;
    this.claimDetails.clientName = { 'fullName': this.defClient.fullName };
    this.claimDetails.paymentType = { 'paymentType': this.defPaymentType.paymentType };
    this.displayDialog = true;
  }
  onRowSelected(event) {
    this.isUnique = true;
    this.uniqueId = event.rowIndex;
    this.claimDetails = new ClaimDetails();
    this.claimDetails.clientName = { 'fullName': event.data.Client };
    this.claimDetails.paymentType = { 'paymentType': event.data.PaymentType };
    this.claimDetails.referral = { 'display': event.data.Referral };
    this.claimDetails.authorizationID = { 'Desc': event.data.authorizationID };
    this.claimDetails.beginDate = event.data.beginDate;
    this.claimDetails.endDate = event.data.endDate;
    this.claimDetails.notes = event.data.notes;
    this.claimDetails.rate = event.data.rate;
    this.claimDetails.procode = { 'fullName': event.data.procode };
    this.claimDetails.paymentNotes = event.data.paymentNotes;
    this.claimDetails.units = event.data.units;
    this.claimDetails.extension = event.data.extension;
    this.claimDetails.unitsRemainingSample = event.data.unitsRemainingSample;
    this.claimDetails.claimsByClient = event.data.claimsByClient
    this.displayDialog = true;
  }
  cancel() {
    this.displayDialog = false;
  }
  save() {
    console.log('rowdata', this.rowData);
    if (this.isPayee === false) {
      this.rowData.push({
        'Client': !isNullOrUndefined(this.claimDetails.clientName) ? this.claimDetails.clientName.fullName = this.claimDetails.clientName.fullName : null, 'Referral': !isNullOrUndefined(this.claimDetails.referral) ? this.claimDetails.referral.display = this.claimDetails.referral.display : null, 'PaymentType': this.claimDetails.paymentType.paymentType,
        'beginDate': this.claimDetails.beginDate, 'endDate': this.claimDetails.endDate,
        'notes': this.claimDetails.notes, 'paymentNotes': this.claimDetails.paymentNotes, 'procode': !isNullOrUndefined(this.claimDetails.procode) ? this.claimDetails.procode.fullName = this.claimDetails.procode.fullName : null, 'units': this.claimDetails.units,
        'rate': this.claimDetails.rate, 'extension': this.claimDetails.extension, 'referralID': this.referralID, 'clientID': localStorage.getItem('clientId'),
        'paymentTypeID': this.paymentTypeId, 'authorizationID': !isNullOrUndefined(this.claimDetails.authorizationID) ? this.claimDetails.authorizationID.Desc = this.claimDetails.authorizationID.Desc : null, 'procodeID': this.procodeId, 'providerRate': this.claimDetails.rate,
        'totalProviderRate': this.claimDetails.extension, 'receivedDate': new Date(this.receivedDate).getTime(),
        'providerID': this.providerID, 'id': this.newCount, 'validBeginDate': this.claimDetails.validBeginDate, 'validEndDate': this.claimDetails.validEndDate,
        'referralBeginDate': this.referralBeginDate, 'referralEndDate': this.referralEndDate, 'payorRate': this.claimDetails.rate,
        'totalPayorRate': this.claimDetails.extension, 'enteredBy': this.claimDetails.authEnteredBy, 'authRate': this.authRate, 'unitsRemainingSample': this.claimDetails.unitsRemainingSample,
        'unitMax': this.claimDetails.unitMax, 'claimsByClient': this.claimDetails.claimsByClient
      });
    } else if (this.isPayee === true) {
      this.rowData.push({
        'Client': this.claimDetails.clientName.fullName, 'Referral': !isNullOrUndefined(this.claimDetails.referral) ? this.claimDetails.referral.display = this.claimDetails.referral.display : null, 'PaymentType': this.claimDetails.paymentType.paymentType,
        'beginDate': this.claimDetails.beginDate, 'endDate': this.claimDetails.endDate,
        'notes': this.claimDetails.notes, 'paymentNotes': this.claimDetails.paymentNotes, 'procode': !isNullOrUndefined(this.claimDetails.procode) ? this.claimDetails.procode.fullName = this.claimDetails.procode.fullName : null, 'units': this.claimDetails.units,
        'rate': this.claimDetails.rate, 'extension': this.claimDetails.extension, 'referralID': this.referralID, 'clientID': localStorage.getItem('clientId'),
        'paymentTypeID': this.paymentTypeId, 'authorizationID': !isNullOrUndefined(this.claimDetails.authorizationID) ? this.claimDetails.authorizationID.Desc = this.claimDetails.authorizationID.Desc : null, 'procodeID': this.procodeId, 'payorRate': this.claimDetails.rate,
        'totalPayorRate': this.claimDetails.extension, 'receivedDate': new Date(this.receivedDate).getTime(),
        'payeeID': this.payeeId, 'id': this.newCount, 'validBeginDate': this.claimDetails.validBeginDate, 'validEndDate': this.claimDetails.validEndDate, 'referralBeginDate': this.referralBeginDate,
        'referralEndDate': this.referralEndDate, 'totalProviderRate': this.claimDetails.extension, 'providerRate': this.claimDetails.rate, 'enteredBy': this.claimDetails.authEnteredBy, 'authRate': this.authRate,
        'unitsRemainingSample': this.claimDetails.unitsRemainingSample, 'unitMax': this.claimDetails.unitMax, 'claimsByClient': this.claimDetails.claimsByClient
      });
    }
    console.log('row data', this.rowData);
    if (this.uniqueId != null) {
      this.claimListDetails.splice(this.uniqueId, 1);
      this.claimListDetails.push(this.rowData[0]);
      this.isUnique = false;
    } else {
      this.claimListDetails.push(this.rowData[0]);
      this.newCount++;
    }
    this.displayDialog = false;
    this.gridOptions.api.setRowData(this.claimListDetails);
    this.rowData = [];
  }
  submitClaim(source) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    if (source.length > 1) {
      source.splice(0, 1)
    }
    let sourceArr = [];
    sourceArr = source;
    sourceArr.map((data) => {
      data.beginDate = new Date(data.beginDate).getTime();
      data.endDate = new Date(data.endDate).getTime();
      data.status = 'posted';
      data.claimID = this.claimId;

      if (data.authorizationID === '') {
        delete data["authorizationID"];
      }
      this._openCards.saveClaim(data).then((item: any) => {
        loader.style.display = 'none';
        if (item.responseStatus === true) {
          item.claim.beginDate = new Date(item.claim.beginDate).toLocaleDateString();
          item.claim.endDate = new Date(item.claim.endDate).toLocaleDateString();
          item.claim.receivedDate = new Date(item.claim.receivedDate).toLocaleDateString();
          this.claimRowData.push(item.claim)
          this.isSubmit = false;
          this.claim.disable();
          this.isReport = true;
          this.isValidate = false;
          this.isDisabled = true;
          this.displayClaim = false;
          this.isRestart = false;
        }
      })
    })
  }
  saveClaim(source) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    if (source.length > 1) {
      source.splice(0, 1)
    }
    const sourceArr = [];
    sourceArr.push(source);
    sourceArr[0].map((data) => {
      data.beginDate = new Date(data.beginDate).getTime();
      data.endDate = new Date(data.endDate).getTime();
      data.status = 'draft';
      if (data.authorizationID === '') {
        delete data["authorizationID"];
      }
      this._openCards.saveClaim(data).then((item: any) => {
        loader.style.display = 'none';
        if (item.responseStatus === true) {
          this.claimId = data.claim.claimID;
          this.isDisabled = true;
          this.isRestart = false;
          swal('Success', 'Saved as draft', 'success');
        }
      })
    })
  }

  discardClaim() {
    this._router.navigate(['/claims/list/view'])
  }
  restartClaim() {
    this.claimListDetails = [];
    this.provider = '';
    this.payee = '';
    this.receivedDate = new Date();
    this.defClient = '';
    this.defPaymentType = '';
    this.payType = '0';
  }
  reportClaim() {

  }
  validateClaim(updatedRowData) {
    let i, count, unitSample, withoutAuth, withoutReferral;
    let UR;
    let unique = [];
    unique = [...new Set(updatedRowData.map(item => UR = { 'authID': item.authorizationID, 'units': item.unitsRemainingSample }))];
    let result = unique.reduce((unique, o) => {
      if (!unique.some(obj => obj.authID === o.authID && obj.units === o.units)) {
        unique.push(o);
      }
      return unique;
    }, []);
    if (updatedRowData.length > 0) {
      for (let k = 0; k < updatedRowData.length; k++) {
        i = 0, withoutAuth = 0, withoutReferral = 0; count = k, this.showInfoInc = 0; this.claimsByClientlength = 0;
        result.filter((arr) => {
          if (updatedRowData[k].authorizationID === arr.authID) {
            unitSample = arr.units;
          }
        });

        if (updatedRowData[k].enteredBy) {
          if (this.enteredBy === updatedRowData[k].enteredBy) {
            this.errMsg = 'You are not allowed to enter a Claim on an Authorization that you created';
            this.onValidateData(updatedRowData[k]);
            this.displayDialog = true;
            this.showError = true;
            break;
          } else {
            i++; withoutAuth++; withoutReferral++;
            this.showError = false;
          }
        } else {
          withoutAuth++;
          withoutReferral++;
        }

        if (updatedRowData[k].beginDate === null || updatedRowData[k].beginDate === undefined) {
          this.errMsg = 'Please select begin date';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          break;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }
        if (updatedRowData[k].endDate === null || updatedRowData[k].endDate === undefined) {
          this.errMsg = 'Please select end date';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          break;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }

        if (updatedRowData[k].Referral === null || updatedRowData[k].Referral === undefined) {
          this.errMsg = 'Please select Referral';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          break;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }
        if (updatedRowData[k].Client === null || updatedRowData[k].Client === undefined) {
          this.errMsg = 'Please select Client';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          break;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }
        if (updatedRowData[k].procode === null || updatedRowData[k].procode === undefined) {
          this.errMsg = 'Please select procode';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          break;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }
        if (updatedRowData[k].PaymentType === null || updatedRowData[k].PaymentType === undefined) {
          this.errMsg = 'Please select Payment Type';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          return;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }
        if (updatedRowData[k].rate === null || updatedRowData[k].rate === undefined) {
          this.errMsg = 'Please select rate';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          return;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }
        if (updatedRowData[k].units === null || updatedRowData[k].units === undefined) {
          this.errMsg = 'Please select units';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          return;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }
        if (Date.parse(updatedRowData[k].beginDate) > Date.parse(updatedRowData[k].endDate)) {
          this.errMsg = 'begin date should not be greater than end date';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          return;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }

        if (updatedRowData[k].rate <= 0) {
          this.errMsg = 'Rate must be greater than 0';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          return;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }

        if (updatedRowData[k].units <= 0) {
          this.errMsg = 'Unit must be greater than 0';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          return;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }

        if (parseInt(updatedRowData[k].rate) > parseInt(updatedRowData[k].authRate)) {
          this.errMsg = `The Rate must be less than or equal to ${this.authRate}`;
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          return;
        } else {
          i++;
          this.showError = false;
        }
        if (updatedRowData[k].unitMax !== null) {
          if (updatedRowData[k].units > updatedRowData[k].unitMax) {
            this.errMsg = `Units must be less than or equal to UnitMax ${updatedRowData[k].unitMax}`;
            this.onValidateData(updatedRowData[k]);
            this.displayDialog = true;
            this.showError = true;
            return;
          } else {
            i++; withoutReferral++; withoutAuth++;
            this.showError = false;
          }
        } else {
          withoutReferral++; withoutAuth++;
        }

        if (updatedRowData[k].validEndDate !== null) {
          if ((Date.parse(updatedRowData[k].beginDate) < (updatedRowData[k].validBeginDate)) || (Date.parse(updatedRowData[k].endDate) > (updatedRowData[k].validEndDate))) {
            this.errMsg = `begin and end date should be between the range of ${new Date(updatedRowData[k].validBeginDate).toLocaleDateString()} and ${new Date(updatedRowData[k].validEndDate).toLocaleDateString()}`;
            this.onValidateData(updatedRowData[k]);
            this.displayDialog = true;
            this.showError = true;
            return;
          } else {
            i++;
            this.showError = false;
          }
        }

        if (updatedRowData[k].referralEndDate !== null) {
          if ((Date.parse(updatedRowData[k].beginDate) < (updatedRowData[k].referralBeginDate)) || (Date.parse(updatedRowData[k].endDate) > (updatedRowData[k].referralEndDate))) {
            this.errMsg = `begin and end date should be between the range of ${new Date(updatedRowData[k].referralBeginDate).toLocaleDateString()} and ${new Date(updatedRowData[k].referralEndDate).toLocaleDateString()}`;
            this.onValidateData(updatedRowData[k]);
            this.displayDialog = true;
            this.showError = true;
            return;
          } else {
            i++; withoutAuth++;
            this.showError = false;
          }
        } else {
          withoutReferral++;
        }
        if (((new Date(updatedRowData[k].beginDate).getMonth() + 1) != (new Date(updatedRowData[k].endDate).getMonth() + 1)) || ((new Date(updatedRowData[k].beginDate).getFullYear()) != (new Date(updatedRowData[k].endDate).getFullYear()))) {
          this.errMsg = 'BeginDate and EndDate must be within the same month';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          return;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }

        if (Date.parse(updatedRowData[k].beginDate) > Date.parse(this.currentDate)) {
          this.errMsg = 'Begin Date cannot be greater than Today';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          return;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }
        if (Date.parse(updatedRowData[k].endDate) > Date.parse(this.currentDate)) {
          this.errMsg = 'End Date cannot be greater than Today';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          return;
        } else {
          i++; withoutAuth++; withoutReferral++;
          this.showError = false;
        }
        if (this.authStatus === 'hold' || this.authStatus === 'Hold') {
          this.errMsg = 'This Authorization is on Hold. A Claim can not be made against it.';
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          return;
        } else {
          i++;
          this.showError = false;
        }
        if (updatedRowData[k].Client !== null || updatedRowData[k].Client !== undefined || updatedRowData[k].procode !== null || updatedRowData[k].procode !== undefined) {
          this.claimsByClientlength = updatedRowData[k].claimsByClient.claimList.length;
          for (let item = 0; item < updatedRowData[k].claimsByClient.claimList.length; item++) {
            if (((updatedRowData[k].claimsByClient.claimList[item].beginDate <= Date.parse(updatedRowData[k].beginDate)) && (updatedRowData[k].claimsByClient.claimList[item].endDate >= Date.parse(updatedRowData[k].beginDate))) || ((updatedRowData[k].claimsByClient.claimList[item].beginDate >= Date.parse(updatedRowData[k].beginDate)) && (updatedRowData[k].claimsByClient.claimList[item].beginDate <= Date.parse(updatedRowData[k].endDate)))) {
              Swal.fire({
                title: 'A Claim exists on this spreadsheet that overlaps the Begin Date and End Date. Do you want to add this anyway?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((res) => {
                console.log('res', res);
                if (res.value === true) {
                  this.showInfo = true;
                } else {
                  this.showInfo = false;
                }
              });
            } else {
              this.showInfoInc++;
            }
          }
          console.log('showInfoInc', this.showInfoInc);
        }
        if (updatedRowData[k].claimsByClient.claimList.length <= 0) {
          this.showInfo = true;
        }
        if (updatedRowData[k].units > unitSample) {
          this.errMsg = `Units must be less than or equal to Unit Remaining ${unitSample}`;
          this.onValidateData(updatedRowData[k]);
          this.displayDialog = true;
          this.showError = true;
          return;
        } else {
          result.filter((arr) => {
            if (updatedRowData[k].authorizationID === arr.authID) {
              arr.units = unitSample - updatedRowData[k].units;
              return updatedRowData[k].unitsRemaining = arr.units;
            }
          });
          i++;
          this.showError = false;
        }
      }
    }
    if ((this.showInfo === true) || (this.showInfoInc === this.claimsByClientlength)) {
      console.log('before ifff', i, withoutAuth, withoutReferral, this.showInfo);
      if (((i === 21) && (count === updatedRowData.length - 1)) || ((withoutAuth === 17) && (count === updatedRowData.length - 1)) || ((withoutReferral === 17) && (count === updatedRowData.length - 1))) {
        console.log('completed', i, withoutAuth, withoutReferral);
        swal('Success', 'Validated', 'success');
        this.isDisabled = false;
        this.isSubmit = true;
        this.showError = false;
        this.showAddClaim = false;
      }
    }
  }
  onValidateData(data) {
    this.isUnique = true;
    this.uniqueId = data.id;
    this.claimDetails = new ClaimDetails();
    this.claimDetails.clientName = { 'fullName': data.Client };
    this.claimDetails.paymentType = { 'paymentType': data.PaymentType };
    this.claimDetails.referral = { 'display': data.Referral };
    this.claimDetails.authorizationID = { 'Desc': data.authorizationID };
    this.claimDetails.beginDate = data.beginDate;
    this.claimDetails.endDate = data.endDate;
    this.claimDetails.notes = data.notes;
    this.claimDetails.rate = data.rate;
    this.claimDetails.procode = { 'fullName': data.procode };
    this.claimDetails.paymentNotes = data.paymentNotes;
    this.claimDetails.units = data.units;
    this.claimDetails.extension = data.extension;
    this.claimDetails.unitsRemainingSample = data.unitsRemainingSample;
    this.claimDetails.claimsByClient = data.claimsByClient
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/claims/list/details') {
      this.url = '/reports/attachment-document/claims';
    }
    return this._router.navigate([this.url])
  }

  getClaimReferralByCleintId(event) {
    // getClaimReferralByCleintId
  }
}
