import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Waiver } from './waiver';
import { Router } from '@angular/router';
import { ClildFormService } from '../child-forms/child-forms.service';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../local-values';


@Component({
  selector: 'app-waiver',
  templateUrl: './waiver.component.html',
  styleUrls: ['./waiver.component.scss']
})
export class WaiverComponent implements OnInit {
  waiverForm: FormGroup;
  breadcrumbs = [];
  isEdit = false;
  quickMenu = "referrel";
  waiver: Waiver = new Waiver();
  discardTo = '/reintegration/referral/opencard/waiver/view';
  metaData = [];
  url: any;
  isAttachmentRequired = false;
  req: any;
  referralTypeId: number;
  isFormLog = false;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: ''
  }

  constructor(public _router: Router, public _fb: FormBuilder, public _client: ClildFormService,
    public _opencard: OpencardsService, public _caseTeam: CaseTeamService, public _localValues: LocalValues) { }

  ngOnInit() {
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this.formValidation();
    if (this._router.url == '/reintegration/referral/opencard/waiver/detail') {
      this.getById()
      this.isAttachmentRequired = true;
    }
    if (this.referralTypeId === 4) {
      this.breadcrumbs.push(
        { label: 'List', href: '/reports/client', active: '' },
        { label: 'Form', href: '/reports/client/details', active: '' },
        { label: 'Case Form', href: '/reports/nc-fch/detail', active: '' },
        { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
        { label: 'Waiver List', active: '', href: '/reintegration/referral/opencard/waiver/view' },
        { label: 'Waiver', active: 'active' }
      )
    } else {
      this.breadcrumbs.push(
        { label: 'List', href: '/reports/client', active: '' },
        { label: 'Form', href: '/reports/client/details', active: '' },
        { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
        { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
        { label: 'Waiver List', active: '', href: '/reintegration/referral/opencard/waiver/view' },
        { label: 'Waiver', active: 'active' }
      )
    }
  }
  formValidation() {
    this.waiverForm = this._fb.group({
      yesNoPendingID: [null, Validators.compose([Validators.required])],
      providerID: [null],
      tierLevelTypeID: [null],
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      notes: [null]
    })
    let currentTime = Date.now();
    this.waiver.beginDate = new Date();
  }
  formAction(source: any) {
    if (this.waiverForm.valid) {
      !isNullOrUndefined(source.yesNoPendingID) ? source.yesNoPendingID = source.yesNoPendingID.yesNoPendingID : null;
      !isNullOrUndefined(source.providerID) ? source.providerID = source.providerID.providerID : null;
      !isNullOrUndefined(source.tierLevelTypeID) ? source.tierLevelTypeID = source.tierLevelTypeID.tierLevelTypeID : null;
      source.beginDate = this._localValues.stringFormatDatetime(Date.parse(source.beginDate));
      source.endDate = this._localValues.stringFormatDatetime(Date.parse(source.endDate));
      source.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
      source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
      !isNullOrUndefined(source.waiverActivityID) ? this.update(source) : this.save(source);
    } else {
      swal('Warning', 'Please fill the mandatory fields', 'info');
    }
  }
  save(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveWaiver(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/waiver/view']);
    })
  }
  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateWaiver(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/waiver/view']);
    })
  }
  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'yesNoPending':
        obj = 'yesNoPending';
        break;
      case 'provider':
        obj = 'provider';
        break;
      case 'tierLevelType':
        obj = 'tierLevelType';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.metaData = data.dropDown;
    })

  }
  getById() {
    this.req = { waiverActivityID: this._client.getId() }
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.getByIdWaiver(this.req).then((data: any) => {
      loader.style.display = 'none';
      data.waiverActivity.beginDate = !isNullOrUndefined(data.waiverActivity.beginDate) ? new Date(data.waiverActivity.beginDate) : null;
      data.waiverActivity.endDate = !isNullOrUndefined(data.waiverActivity.endDate) ? new Date(data.waiverActivity.endDate) : null;
      this.waiver = data.waiverActivity;
      this.waiverForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.KIPP.changedBy) ? data.KIPP.changedBy : '------';
    this.formLogInfo.changedDate = !isNullOrUndefined(data.KIPP.changedDate) ? moment(data.KIPP.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
    this.formLogInfo.enteredBy = !isNullOrUndefined(data.KIPP.enteredBy) ? data.KIPP.enteredBy : '------';
    this.formLogInfo.enteredDate = !isNullOrUndefined(data.KIPP.enteredDate) ? moment(data.KIPP.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }
  editForm() {
    this.waiverForm.enable();
    this.isEdit = false;
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/waiver/detail') {
      this.url = '/reports/attachment-document/rfc/waiver';
    }

    return this._router.navigate([this.url])
  }

}
