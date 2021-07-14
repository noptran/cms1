import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientSsi } from './client-ssi';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import { CaseTeamService } from '../case-team/case-team.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import * as  moment from 'moment';


@Component({
  selector: 'app-social-securtiy-income',
  templateUrl: './social-securtiy-income.component.html',
  styleUrls: ['./social-securtiy-income.component.scss']
})
export class SocialSecurtiyIncomeComponent implements OnInit {
  clientSSIForm: FormGroup;
  ssi: ClientSsi = new ClientSsi();
  isEdit = false;
  discardTo = '/reintegration/referral/opencard/social-security-income/view';
  breadcurmbs = [];
  metaData = [];
  url: any;
  isAttachmentRequired = false;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _opencard: OpencardsService, public _router: Router, public _caseTeam: CaseTeamService, public _client: ClildFormService, public _fb: FormBuilder) { }

  ngOnInit() {
    this.formValidation();
    if (this._router.url.includes('/reintegration/referral/opencard/social-security-income/detail')) {
      this.getById()
      this.isAttachmentRequired = true;
    }
    this.breadcurmbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Social Security Income List', active: '', href: '/reintegration/referral/opencard/social-security-income/view' },
      { label: 'Social Security Income', active: 'active' }
    )
  }

  formValidation() {
    this.clientSSIForm = this._fb.group({
      dateApplicationSubmitted: [null],
      dateOfDetermination: [null],
      determinationTypeID: [null],
      notes: [null],
      ssiTypeID: [null]
    })
  }

  formAction(source: any) {
    !isNullOrUndefined(source.dateApplicationSubmitted) ? source.dateApplicationSubmitted = Date.parse(source.dateApplicationSubmitted) : null;
    !isNullOrUndefined(source.dateOfDetermination) ? source.dateOfDetermination = Date.parse(source.dateOfDetermination) : null;
    !isNullOrUndefined(source.ssiTypeID) ? source.ssiTypeID = source.ssiTypeID.ssiTypeID : null
    !isNullOrUndefined(source.determinationTypeID) ? source.determinationTypeID = source.determinationTypeID.zSSIDeterminationTypeID : null;
    source.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    !isNullOrUndefined(source.clientSSIID) ? this.update(source) : this.save(source);
  }

  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveSSI(source).then((data) => {
      swal('Success', 'Record has been saved!', 'success');
      loader.style.display = 'none';
      return this._router.navigate(['/reintegration/referral/opencard/social-security-income/view'])
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateSSI(source).then((data) => {
      swal('Success', 'Record has been updated!', 'success');
      loader.style.display = 'none';
      return this._router.navigate(['/reintegration/referral/opencard/social-security-income/view'])
    })
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'ssiDeterminationType':
        obj = 'ssiDeterminationType';
        break;
      case 'ssiType':
        obj = 'ssiType';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data) => {
      this.metaData = data.dropDown;
    })
  }

  getById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { clientSSIID: this._client.getId() }
    this._opencard.getByIdSSI(this.req).then((data) => {
      if (data.clientSSI.isActive) {
        !isNullOrUndefined(data.clientSSI.dateApplicationSubmitted) ? data.clientSSI.dateApplicationSubmitted = moment(data.clientSSI.dateApplicationSubmitted).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientSSI.dateOfDetermination) ? data.clientSSI.dateOfDetermination = moment(data.clientSSI.dateOfDetermination).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.clientSSI.dateApplicationSubmitted) ? data.clientSSI.dateApplicationSubmitted = moment.utc(data.clientSSI.dateApplicationSubmitted).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientSSI.dateOfDetermination) ? data.clientSSI.dateOfDetermination = moment.utc(data.clientSSI.dateOfDetermination).format('MM/DD/YYYY HH:mm') : null;
      }

      this.ssi = data.clientSSI;
      loader.style.display = 'none';
      this.isEdit = true;
      this.clientSSIForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.clientSSI.changedBy) ? data.clientSSI.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.clientSSI.changedDate) ? moment(data.clientSSI.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.clientSSI.enteredBy) ? data.clientSSI.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.clientSSI.enteredDate) ? moment(data.clientSSI.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.clientSSIForm.enable();
    this.isEdit = false;
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/social-security-income/detail') {
      this.url = '/reports/attachment-document/rfc/social-security-income';
    }

    return this._router.navigate([this.url])
  }






}
