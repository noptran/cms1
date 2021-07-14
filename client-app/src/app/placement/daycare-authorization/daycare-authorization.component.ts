import { Component, OnInit } from '@angular/core';
import {LocalValues} from '../../local-values';
import { CaseTeamService } from '../../case-team/case-team.service';
import { PlacementDaycareAuthorization } from './daycare-authorization';
import { AuthorizationException } from '../placement';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-daycare-authorization',
  templateUrl: './daycare-authorization.component.html',
  styleUrls: ['./daycare-authorization.component.scss', '../placement-auth-template/placement-auth-template.component.scss']
})
export class DaycareAuthorizationComponent implements OnInit {
  displayDialog: boolean;
  breadcrumbs = [];
  claimsList = [];
  metaData = [];
  auth: PlacementDaycareAuthorization = new PlacementDaycareAuthorization();
  authExc: AuthorizationException = new AuthorizationException();
  currentPlacementId: number;
  isOpenAuthExcep = false;
  daycareAuthForm: FormGroup;
  whoToPaysList = [
    { display: 'Provider', value: 'provider' },
    { display: 'Payee', value: 'payee' }
  ]
  filteredWhoToPayList: any[];
  isProvider = true;
  isPayee = false;
  whoToPay: any;
  currentRecId: number;
  editControll = false;
  isAttachment = false;
  userName: string;
  isDeleteBtnDisable = false;
  req = {};
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  isDisabled: any;

  constructor(public _localValues: LocalValues, public _caseTeam: CaseTeamService,
    public _activatedRoute: ActivatedRoute, public _openCard: OpencardsService,
    public _router: Router, public _fb: FormBuilder) { }

  ngOnInit() {
    this.currentPlacementId = parseInt(this._activatedRoute.snapshot.queryParamMap.get('p_id')); //Placement Id
    this.currentRecId = parseInt(this._activatedRoute.snapshot.queryParamMap.get('auth_id')); //Current authorization id
    (localStorage.getItem('UserEmail')) ? this.userName = localStorage.getItem('UserEmail').split('@')[0] : 'Admin';
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
      { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
      { label: 'Placements', active: '', href: '/reintegration/referral/opencard/placement/detail' },
      { label: 'Daycare Authorization', active: 'active' },
    )

    /**New form autofetch values */
    if (this._router.url.includes('/reintegration/referral/opencard/placement/daycare-authorization/new')) {
      this.auth.clientID = { clientName: localStorage.getItem('clientName'), clientID: parseInt(localStorage.getItem('clientId')) }
      this.auth.unitTypeID = { unitTypeID: 1, unitType: "Daily" }
      this.auth.beginDate = new Date(Date.now());
      this.auth.endDate = new Date(Date.now());
      this.auth.payorID = { fullPayor: "Saint Francis Reintegration - West Region -RFCA Region 3", payorID: 142 },
        this.auth.authorizationStatusID = { authorizationStatus: "Active", authorizationStatusID: 3 }
      this.whoToPay = { display: 'Provider', value: 'provider' };
      this.breadcrumbs[5] = { label: 'Daycare Authorization List', href: '/reintegration/referral/opencard/placement/daycare-authorization/view' }
    }

    if (this._router.url.includes('/reintegration/referral/opencard/placement/daycare-authorization/detail')) {
      this.getRecyId();
    }

    this.auth.unitsAuth = (moment(this.auth.endDate).diff(this.auth.beginDate)) + 1;


  }

  /**Showing time based on local browser time */
  showTime(timeStamp: number) {
    return this._localValues.getDateandTimeWithExt(timeStamp);
  }

  /**Handling dropdown data */
  getMetaData(label: string, event: any) {
    let req = { value: event.query }
    switch (label) {
      case 'unitType':
        req['Object'] = 'unitType';
        break;
      case 'payor':
        req['Object'] = 'payor';
        break;
      case 'authorizationStatus':
        req['Object'] = 'authorizationStatus';
        break;
      case 'authorizationExceptionReason':
        req['Object'] = 'authorizationExceptionReason';
        break;
      case 'staff':
        req['Object'] = 'staff';
        break;
      case 'provider':
        req['Object'] = 'provider';
        break;
      case 'payee':
        req['Object'] = 'payee';
        break;
      case 'procode':
        req['Object'] = 'procode';
        break;
      case 'sponsorName':
        req['Object'] = 'sponsorName';
        break;
    }
    this._caseTeam.getSearchList(req).then((data: any) => {
      if (label === 'payor') {
        data.dropDown.filter((item: any) => item['fullPayor'] = `${item.payorName} - ${item.alias}`)
      }
      if (label === 'staff') {
        data.dropDown.filter((item: any) => item['fullName'] = `${item.lastName} - ${item.firstName}`)
      }
      if (label === 'procode') {
        data.dropDown.filter((item: any) => item['fullProcode'] = `${item.procode} - ${item.categoryOfService}`)
      }
      this.metaData = data.dropDown;
    })
  }

  formAction() {
    if (this.daycareAuthForm.valid) {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      !isNullOrUndefined(this.auth.clientID) ? this.auth.clientID = this.auth.clientID.clientID : null;
      !isNullOrUndefined(this.auth.beginDate) ? this.auth.beginDate = Date.parse(this.auth.beginDate) : null;
      !isNullOrUndefined(this.auth.endDate) ? this.auth.endDate = Date.parse(this.auth.endDate) : null;
      !isNullOrUndefined(this.auth.payeeID) ? this.auth.payeeID = this.auth.payeeID.payeeID : null;
      !isNullOrUndefined(this.auth.procodeID) ? this.auth.procodeID = this.auth.procodeID.procodeID : null;
      !isNullOrUndefined(this.auth.payorID) ? this.auth.payorID = this.auth.payorID.payorID : null;
      !isNullOrUndefined(this.auth.unitTypeID) ? this.auth.unitTypeID = this.auth.unitTypeID.unitTypeID : null;
      !isNullOrUndefined(this.auth.providerID) ? this.auth.providerID = this.auth.providerID.providerID : null;
      !isNullOrUndefined(this.auth.sponsorID) ? this.auth.sponsorID = this.auth.sponsorID.sponsorID : null;
      !isNullOrUndefined(this.auth.authorizationStatusID) ? this.auth.authorizationStatusID = this.auth.authorizationStatusID.authorizationStatusID : null;
      !isNullOrUndefined(this.authExc.approvedBy_StaffID) ? this.authExc.approvedBy_StaffID = this.authExc.approvedBy_StaffID.staffID : null;
      !isNullOrUndefined(this.authExc.authorizationExceptionReasonID) ? this.authExc.authorizationExceptionReasonID = this.authExc.authorizationExceptionReasonID.authorizationExceptionReasonID : null;

      this.auth.authorizationExceptionID = [this.authExc];
      this.auth.placementID = this.currentPlacementId
      this.auth.clientID = parseInt(localStorage.getItem('clientId')) - this._openCard.getHasKey();
      this.auth.referralID = parseInt(localStorage.getItem('referralId')) - this._openCard.getHasKey();
      if (this.auth.authorizationID) {
        this._openCard.updateDaycareAuthorizations(this.auth).then((data: any) => {
          if (data.responseStatus) {
            swal('Update', 'Daycare authorization has been updated!', 'success');
            this._router.navigate(['/reintegration/referral/opencard/placement/daycare-authorization/detail'],
              {
                queryParams: { auth_id: data.authorization.authorizationID },
                queryParamsHandling: 'merge'
              });
            this.getRecyId();
          }
          loader.style.display = 'none';
        })
      } else {
        this._openCard.saveDaycareAuthorizations(this.auth).then((data: any) => {
          if (data.responseStatus) {
            swal('Save', 'Daycare authorization has been created!', 'success');
            this._localValues.isLivingArrangment = true; // Declaring the this node under the placement subnode
            this._router.navigate(['/placement-psa'], { queryParams: { sub: 'dayCareAuthorization', auth_id: data.authorization.authorizationID }, queryParamsHandling: 'merge' })
          }
          loader.style.display = 'none';
        })
      }
    } else {
      swal('Info', 'Please fill the mandatory fields', 'info');
    }

  }

  onChangeValues() {
    this.auth.unitsRemaining = this.auth.unitsAuth;
    this.auth.providerRate = this.auth.payorRate;
    this.authExc.exceptionPayorRate = this.auth.payorRate;
    this.authExc.exceptionProviderRate = this.auth.providerRate;
    /**Check for unit type of override date */
    if (!this.auth.dateOverride) {
      this.auth.endDate = new Date(Date.parse(this.auth.beginDate) + (this._localValues.timeStampValueForDay * this.auth.unitsAuth))
    } else {
      return;
    }

  }

  formValidation() {
    this.daycareAuthForm = this._fb.group({
      beginDate: [null],
      dateOverride: [null],
      endDate: [null],
      clientID: [null],
      unitTypeID: [null, Validators.compose([Validators.required])],
      unitsAuth: [null, Validators.compose([Validators.required])],
      unitsRemaining: [null],
      frequency: [null],
      payorRate: [null],
      providerRate: [null],
      payorID: [null],
      procodeID: [null, Validators.compose([Validators.required])],
      providerID: [null],
      payeeID: [null],
      sponsorID: [null],
      paySponsor: [null],
      notes: [null],
      addInfo: [null],
      authorizationStatusID: [null],
      whoToPay: [null]
    })
  }

  filteredWhoToPay(event: any) {
    this.filteredWhoToPayList = [];
    this.whoToPaysList.filter((item: any) => {
      if (item.display.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredWhoToPayList.push(item);
      }
    })
  }

  onSelectWhoToPay() {
    if (this.whoToPay.value == 'provider') {
      this.isProvider = true;
      this.isPayee = false;
      this.daycareAuthForm.get('providerID').setValidators([Validators.required]);
    } else {
      this.isProvider = false;
      this.isPayee = true;
      this.daycareAuthForm.get('payeeID').setValidators([Validators.required]);
    }
  }

  /** Get the record by authorization id */
  getRecyId() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.req = {
      authorizationID: this.currentRecId
    }
    this._openCard.getDayCareAuthorizationsGetbyById(this.req).then((data: any) => {
      loader.style.display = 'none';
      data.authorization.beginDate = !isNullOrUndefined(data.authorization.beginDate) ? new Date(data.authorization.beginDate) : null;
      data.authorization.endDate = !isNullOrUndefined(data.authorization.endDate) ? new Date(data.authorization.endDate) : null;
      data.authorization.payorID['fullPayor'] = `${data.authorization.payorID.payorName} - ${data.authorization.payorID.alias}`;
      data.authorization.procodeID['fullProcode'] = `${data.authorization.procodeID.procode} - ${data.authorization.procodeID.categoryOfService}`;
      data.authorization.clientID['clientName'] = `${data.authorization.clientID.lastName} - ${data.authorization.clientID.firstName}`;
      if (data.authorization.payeeID) {
        this.whoToPay = { display: 'Payee', value: 'payee' };
        this.isProvider = false;
        this.isPayee = true;
      } else {
        this.whoToPay = { display: 'Provider', value: 'provider' };
        this.isProvider = true;
        this.isPayee = false;
      }
      this.daycareAuthForm.disable();
      this.editControll = true;
      this.isAttachment = true;
      this.auth = data.authorization;
      if (data.authorizationExceptionID.length > 0) {
        data.authorizationExceptionID[0].approvedBy_StaffID = { fullName: `${data.authorizationExceptionID[0].approvedBy_StaffID.lastName} - ${data.authorizationExceptionID[0].approvedBy_StaffID.firstName}` };
        this.authExc = data.authorizationExceptionID[0];
      }
      this.breadcrumbs[5] = { label: 'Daycare Authorization List', href: '/reintegration/referral/opencard/placement/daycare-authorization/view' };
      this.claimsList = data.claimID;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.authorization.changedBy) ? data.authorization.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.authorization.changedDate) ? moment(data.authorization.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.authorization.enteredBy) ? data.authorization.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.authorization.enteredDate) ? moment(data.authorization.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


    })
  }

  editForm() {
    this.editControll = false;
    this.daycareAuthForm.enable();
  }
  /**For attachment control */
  navigateTo() {
    let currentURL: string = this._router.url, navigateURL: string;
    if (currentURL.includes('/reintegration/referral/opencard/placement/daycare-authorization/detail')) {
      navigateURL = '/reports/attachment-document/placement-auth-attachment';
    }
    return this._router.navigate([navigateURL], { queryParamsHandling: 'preserve' })
  }

  onEndDateChanges() {
    let diff = moment(this.auth.endDate).diff(this.auth.beginDate);
    if (!this.auth.dateOverride) {
      this.auth.unitsAuth = new Date(diff).getDate();
      this.auth.unitsRemaining = this.auth.unitsAuth;
    } else {
      this.auth.unitsRemaining = this.auth.unitsAuth;
      return;
    }

  }

  deletedAuthorization() {
    let authReq = { placementID: this.currentPlacementId, beginPagination: 1, endPagination: 100 },
      deleteAuthReq = {
        existing_authorizationID: this.currentRecId,
        deletedBy: this.userName || 'Admin',
        deletedDate: Date.now()
      }
    /**Check for the length of authorization */
    this._openCard.listDayCareAuthorizations(authReq).then((data: any) => {
      if (data.totalCount <= 1) {
        swal('Not able to delete!', 'This authorization cannot be deleted because it is the only authorization. If this authorization needs deleted it should be overwritten during the creation of a new authorization', 'info');
        return this.isDeleteBtnDisable = true;
      }
      else {
        this.isDeleteBtnDisable = false;
        swal('Delete Authorization!', 'This will delete this Daycare Authorization. If there are any claims the authorization will be emailed to Contact service to Handle. Are you sure you want to continue with delete ?', 'info')
          .then((value) => {
            if (value) {
              this._openCard.deleteExistingAuthorizaion(deleteAuthReq).then((data: any) => {
                if (data.responseStatus) {
                  this._router.navigate(['/placement-psa'], { queryParams: { isDeleteAuth: true }, queryParamsHandling: 'merge' });
                }
              })
            } else {
              return;
            }
          })
        /** Form open psa(void)- provider envelope */
        /** Return to placement auth detail, show delete confirmation */
        /** Return form */
      }
    })
  }
  discardClaim = () => { return window.history.back() }

  onProviderSelect(event: any) {
    event.paySponsor
      ? (this.auth.paySponsor = true)
      : (this.auth.paySponsor = false);
  }

  getFisClient(event) {
    // getFisClient
  }

  getClientId(event) {
    // getClientId
  }

  getSponsorId(event) {
    // getSponsorId
  }

}
