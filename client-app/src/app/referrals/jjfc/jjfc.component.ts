import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Jjfc } from './jjfc';
import { CaseTeamService } from '../../case-team/case-team.service';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { isNullOrUndefined, isNull } from 'util';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ClildFormService } from '../../child-forms/child-forms.service';
import {LocalValues} from '../../local-values';
import * as moment from 'moment';


@Component({
  selector: 'app-jjfc',
  templateUrl: './jjfc.component.html',
  styleUrls: ['./jjfc.component.scss']
})
export class JjfcComponent implements OnInit {

  mainTabs = [];
  jjfcrefrralform: FormGroup;
  jjfc: Jjfc = new Jjfc();
  breadcrumbs = [];
  metaData: any;
  sIndex = 0;
  req: any;
  discardTo = '/reports/opencards/list/client/case';
  jjfcOpenCards = [];
  isEdit = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;


  constructor(public _fb: FormBuilder, public _caseTeam: CaseTeamService,
    public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _localValues: LocalValues) { }

  ngOnInit() {
    this.opencards();
    this.defineMainTabs();
    this.formValidation();
    this.autoFecthDetails();
    this.getJJFCByRecID();
  }

  /**
     * Define main tabs
     */
  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Section 1', href: '#nav-sec1' },
      { label: 'Section 2', href: '#nav-sec2' },
    ]
  }

  /**
   * 
   * @param event clik event
   * @param label metadata type
   */
  getMetaData(label: string, event: any) {
    let req = { value: event.query }
    switch (label) {
      case 'payor':
        req['Object'] = 'payor'
        break;
      case 'homeCounty':
        req['Object'] = 'county';
        break;
    }
    this._caseTeam.getSearchList(req).then(data => this.metaData = data.dropDown)

  }

  /**
   * Form validation
   */
  formValidation() {
    this.jjfcrefrralform = this._fb.group({
      'dateOfNotification': '',
      'cso_notified': '',
      'cso_worker': '',
      'judicial_district': '',
      'placement_needed': '',
      'permanency_goal': '',
      'ad_placement': '',
      'reason_denial': '',
      'denial_explanation': '',
      'referral_date': '',
      'referral_discharge_date': '',
      'case_payor': '',
      'reason_for_discharge': '',
      'notes': '',
      'sfcs_office': [null, Validators.compose([Validators.required])],
      'sfcs_worker': '',
      'home_county': [null, Validators.compose([Validators.required])]
    })
  }

  async formActions() {
    if (this.jjfcrefrralform.valid) {
      console.log("Referral API initated")
      let response: any;
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      !isNullOrUndefined(this.jjfc.countyID) ? this.jjfc.countyID = this.jjfc.countyID.countyID : null;
      !isNullOrUndefined(this.jjfc.csoStaffID) ? this.jjfc.csoStaffID = this.jjfc.csoStaffID.csoStaffID : null;
      !isNullOrUndefined(this.jjfc.judicialDistrictID) ? this.jjfc.judicialDistrictID = this.jjfc.judicialDistrictID.judicialDistrictID : null;
      !isNullOrUndefined(this.jjfc.payorID) ? this.jjfc.payorID = this.jjfc.payorID.payorID : null;
      !isNullOrUndefined(this.jjfc.permanencyGoalID) ? this.jjfc.permanencyGoalID = this.jjfc.permanencyGoalID.permanencyGoalID : null;
      !isNullOrUndefined(this.jjfc.referralAcceptedID) ? this.jjfc.referralAcceptedID = this.jjfc.referralAcceptedID.referralAcceptedID : null;
      !isNullOrUndefined(this.jjfc.sfaOfficeID) ? this.jjfc.sfaOfficeID = this.jjfc.sfaOfficeID.SFAOfficeID : null;
      !isNullOrUndefined(this.jjfc.sfcsWorkerID) ? this.jjfc.sfcsWorkerID = this.jjfc.sfcsWorkerID.StaffID : null;
      !isNullOrUndefined(this.jjfc.reasonForDeclineID) ? this.jjfc.reasonForDeclineID = this.jjfc.reasonForDeclineID.reasonForDeclineID : null;
      this.jjfc.placementNeededDate = this._localValues.stringFormatDatetime(Date.parse(this.jjfc.placementNeededDate));
      this.jjfc.csoNotified = this._localValues.stringFormatDatetime(Date.parse(this.jjfc.placementNeededDate));
      this.jjfc.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
      this.jjfc.referralTypeID = 17;
      console.log("JJFC Req", this.jjfc);
      if (this.jjfc.referralID) {
        response = await this._opencard.updateJJFCReferral(this.jjfc)
        loader.style.display = 'none';
        swal('Update!', 'Referral has been updated successfully', 'success');
        return window.history.back();
      } else {
        response = await this._opencard.saveJJFCReferral(this.jjfc)
        loader.style.display = 'none';
        swal('Create!', 'Referral has been create successfully', 'success');
        return window.history.back();
      }
    } else {
      return swal('Validation Error', 'Mandatory fields are missing', 'info')
    }


  }

  autoFecthDetails() {
    if (this._router.url === '/jjfc/new') {
      this.jjfcrefrralform.get('reason_denial').disable();
      this.jjfcrefrralform.get('denial_explanation').disable();
      this.jjfc.payorID = { payorID: 161, payorName: 'Saint Francis Juvenile Justice Foster Care' };
      this.jjfcrefrralform.get('reason_for_discharge').disable();
      this.jjfc.beginDate = this.jjfc.dateOfNotification = new Date();
      this.jjfc.placementNeededDate = new Date();
    }
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Client', href: '/reports/client/details', active: '' },
      { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
      { label: 'JJFC', href: '', active: 'active' }
    )
  }

  async getAndFilterReasonForDenial(event: any) {
    let data = await this._opencard.getJJFCRefReasonForDenial();
    return this.metaData = data.filter(item => item.reasonForDecline.toLowerCase().indexOf(event.query) !== -1)
  }

  async getAndFilterAcceptOrDeclientReason(event: any) {
    let data = await this._opencard.getJJFCRefAcceptedOrDeclinedReason();
    return this.metaData = data.filter(item => item.referralAccepted.toLowerCase().indexOf(event.query) !== -1)
  }

  async getAndFilterPermanencyGoal(event: any) {
    let data = await this._opencard.getJJFCPermanencyGoal();
    return this.metaData = data.filter(item => item.permanencyGoal.toLowerCase().indexOf(event.query) !== -1)
  }

  async getAndFilterJudicialDistrict(event: any) {
    let data = await this._opencard.getJJFCJudicialDistrict();
    return this.metaData = data.filter(item => item.judicialDistrict.toLowerCase().indexOf(event.query) !== -1)
  }

  async getAndFilterCSOWorker(event: any) {
    let data = await this._opencard.getJJFCCSOWorker();
    return this.metaData = data.filter(item => item.staffName.toLowerCase().indexOf(event.query) !== -1)
  }

  async getAndFilterSFMStaff(event: any) {
    let data = await this._opencard.getJJFCSFMStaff();
    return this.metaData = data.filter(item => item.StaffName.toLowerCase().indexOf(event.query) !== -1)
  }

  async getAndFilterSFMOffice(event: any) {
    let data = await this._opencard.getJJFCSFMOffice();
    return this.metaData = data.filter(item => item.Name.toLowerCase().indexOf(event.query) !== -1)
  }

  async getJJFCByRecID(jjfcReferralID?: number) {
    let response: any;
    if (this._router.url.includes('/jjfc/detail')) {
      this.req = { referralID: jjfcReferralID || parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey(), clientID: parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey() }
      console.log("Get Req", this.req);
      response = await this._opencard.getJJFCById(this.req);
      delete response.referralDetails.payorID;
      this.jjfc = response.referralDetails;
      this.jjfc.payorID = response.payorDetails;
      !isNullOrUndefined(this.jjfc.beginDate) ? this.jjfc.beginDate = new Date(this.jjfc.beginDate) : null;
      !isNullOrUndefined(this.jjfc.placementNeededDate) ? this.jjfc.placementNeededDate = new Date(this.jjfc.placementNeededDate) : null;
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(response.referralDetails.changedBy) ?response.referralDetails.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(response.referralDetails.changedDate) ? moment(response.referralDetails.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(response.referralDetails.enteredBy) ? response.referralDetails.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(response.referralDetails.enteredDate) ? moment(response.referralDetails.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      return this._router.navigate(['/jjfc/detail']);
    }
  }

  onReferralAcceptOrDenyValidation(event: any) {
    if (event.referralAcceptedID === 3) {
      this.jjfcrefrralform.get('reason_denial').enable();
    } else {
      this.jjfcrefrralform.get('reason_denial').disable();
    }
  }

  onDenileReasonValidation(event: any) {
    (event.reasonForDeclineID === 12) ? this.jjfcrefrralform.get('denial_explanation').enable() : this.jjfcrefrralform.get('denial_explanation').disable()
  }

  onReferralDischargeDateValidation(event: any) {
    (event) ? this.jjfcrefrralform.get('reason_for_discharge').enable() : this.jjfcrefrralform.get('reason_for_discharge').disable();
  }

  opencards() {
    this.jjfcOpenCards.push(
      { title: 'Authorization Summary (View Only)', routerLink: '/reintegration/referral/service/authorization/summary' },
      { title: 'Case File Actitvity', routerLink: '/reintegration/referral/opencard/case-file-activity/view' },
      { title: 'Case Team', routerLink: '/reports/referral/family-preservation/case-team/view' },
      { title: 'Family', routerLink: '/reports/family/view' },
      { title: 'Home County', routerLink: '/reports/referral/family-preservation/home-county/view' },
      { title: 'Medical', routerLink: '/reintegration/referral/opencard/medical/dashboard' },
      // {title:'Placement History',routerLink:''},
      { title: 'Placements', routerLink: '/reintegration/referral/opencard/placement/view' },
      { title: 'Progress Notes', routerLink: '/reports/referral/family-preservation/progress-notes/view' },
      { title: 'Schools', routerLink: '/reintegration/referral/opencard/school/dashboard' },
      { title: 'SFM Office', routerLink: '/reports/referral/family-preservation/sfcs-office/view' },
    )
  }


}
