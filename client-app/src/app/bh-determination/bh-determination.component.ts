import { Component, OnInit } from '@angular/core';
import { BhDetermination } from './bh-determination';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CaseTeamService } from '../case-team/case-team.service';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ClildFormService } from '../child-forms/child-forms.service';
import * as moment from 'moment';
import {LocalValues} from '../local-values';

@Component({
  selector: 'app-bh-determination',
  templateUrl: './bh-determination.component.html',
  styleUrls: ['./bh-determination.component.scss']
})
export class BhDeterminationComponent implements OnInit {
  bh: BhDetermination = new BhDetermination();
  bhForm: FormGroup;
  metaData = [];
  isEdit = false;
  quickMenu = "referrel";
  breadcrumbs = [];
  discardTo = '/reintegration/referral/opencard/bh-determination/view';
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

  constructor(public _fb: FormBuilder, public _caseTeam: CaseTeamService,
    public _opencard: OpencardsService, public _router: Router,
    public _client: ClildFormService, public _localValues: LocalValues) { }

  ngOnInit() {
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this.formValidation();
    if (this._router.url == '/reintegration/referral/opencard/bh-determination/detail') {
      this.isAttachmentRequired = true;
      this.getRecById();
    }
    if (this.referralTypeId === 4) {
      this.breadcrumbs = [
        { label: 'List', href: "/reports/client", active: '' },
        { label: 'Form', href: "/reports/client/details", active: '' },
        { label: 'Case Form', href: "/reports/nc-fch/detail", active: '' },
        { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
        { label: 'BH Determination List', href: "/reintegration/referral/opencard/bh-determination/view", active: '' },
        { label: 'BH Determination', active: 'active' }
      ]
    } else {
      this.breadcrumbs = [
        { label: 'List', href: "/reports/client", active: '' },
        { label: 'Form', href: "/reports/client/details", active: '' },
        { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
        { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
        { label: 'BH Determination List', href: "/reintegration/referral/opencard/bh-determination/view", active: '' },
        { label: 'BH Determination', active: 'active' }
      ]
    }

  }

  formValidation() {
    this.bhForm = this._fb.group({
      BHDeterminationID: [null],
      BHDeterminationTypeID: [null, Validators.compose([Validators.required])],
      BHRequestTypeID: [null],
      determination_ProviderID: [null],
      clientID: [null],
      courtOrdered: [null],
      notes: [null],
      referralID: [null],
      determinationDate: [null],
      determinationReceivedByCC: [null],
      requestReceivedByCC: [null],
      requestSent: [null],
      servicesBeginDate: [null],
      servicesEndDate: [null],
      sedWaiver: [null],
    })
  }

  getMetaData(event, label) {
    let req: any, obj: any;
    switch (label) {
      case 'bhDetermination':
        obj = 'BHDeterminationType';
        break;
      case 'bhRequestType':
        obj = 'BHRequestType';
        break;
      case 'mental_health':
        obj = 'Provider';
        break
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data) => {
      this.metaData = data.dropDown;
    })

  }

  bhFormAction(source) {
    source.determinationDate = this._localValues.stringFormatDatetime(Date.parse(source.determinationDate));
    source.determinationReceivedByCC = this._localValues.stringFormatDatetime(Date.parse(source.determinationReceivedByCC));
    source.requestReceivedByCC = this._localValues.stringFormatDatetime(Date.parse(source.requestReceivedByCC));
    source.requestSent = this._localValues.stringFormatDatetime(Date.parse(source.requestSent));
    source.servicesBeginDate = this._localValues.stringFormatDatetime(Date.parse(source.servicesBeginDate));
    source.servicesEndDate = this._localValues.stringFormatDatetime(Date.parse(source.servicesEndDate));
    !isNullOrUndefined(source.BHDeterminationTypeID) ? source.BHDeterminationTypeID = source.BHDeterminationTypeID.bhdeterminationTypeID : null;
    !isNullOrUndefined(source.BHRequestTypeID) ? source.BHRequestTypeID = source.BHRequestTypeID.bhrequestTypeID : null;
    !isNullOrUndefined(source.determination_ProviderID) ? source.determination_ProviderID = source.determination_ProviderID.providerID : null;
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    source.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
    if (this.bhForm.valid) { !isNullOrUndefined(source.bhdeterminationID) ? this.update(source) : this.save(source) }
    else { swal('Warning', 'Kindly fill mandatory fields!', 'info') }
  }
  save(source) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveBhDetermination(source).then((data) => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      return this._router.navigate(['/reintegration/referral/opencard/bh-determination/view'])
    })
  }

  update(source) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateBhDetermination(source).then((data) => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      return this._router.navigate(['/reintegration/referral/opencard/bh-determination/view'])
    })
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = {
      BHDeterminationID: this._client.getId() !== null || this._client.getId() !== undefined ? this._client.getId() :
        parseInt(localStorage.getItem('BHDeterminationID')) - this._opencard.getHasKey()
    }
    this._opencard.getByIdDetermination(this.req).then((data) => {
      loader.style.display = 'none';
      data.BHDetermination.determinationDate = !isNullOrUndefined(data.BHDetermination.determinationDate) ? new Date(data.BHDetermination.determinationDate) : null;
      data.BHDetermination.determinationReceivedByCC = !isNullOrUndefined(data.BHDetermination.determinationReceivedByCC) ? new Date(data.BHDetermination.determinationReceivedByCC) : null;
      data.BHDetermination.requestReceivedByCC = !isNullOrUndefined(data.BHDetermination.requestReceivedByCC) ? new Date(data.BHDetermination.requestReceivedByCC) : null;
      data.BHDetermination.requestSent = !isNullOrUndefined(data.BHDetermination.requestSent) ? new Date(data.BHDetermination.requestSent) : null;
      data.BHDetermination.servicesBeginDate = !isNullOrUndefined(data.BHDetermination.servicesBeginDate) ? new Date(data.BHDetermination.servicesBeginDate) : null;
      data.BHDetermination.servicesEndDate = !isNullOrUndefined(data.BHDetermination.servicesEndDate) ? new Date(data.BHDetermination.servicesEndDate) : null;
      this.bh = data.BHDetermination;
      this.bhForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.BHDetermination.changedBy) ? data.BHDetermination.changedBy : '------';
    this.formLogInfo.changedDate = !isNullOrUndefined(data.BHDetermination.changedDate) ? moment(data.BHDetermination.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
    this.formLogInfo.enteredBy = !isNullOrUndefined(data.BHDetermination.enteredBy) ? data.BHDetermination.enteredBy : '------';
    this.formLogInfo.enteredDate = !isNullOrUndefined(data.BHDetermination.enteredDate) ? moment(data.BHDetermination.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.isEdit = false;
    this.bhForm.enable();
  }

  navigateToCMS() {
    let currentURL = this._router.url, navigateURL: any;
    if (currentURL == '/reintegration/referral/opencard/bh-determination/detail') {
      navigateURL = '/reports/attachment-document/rfc/bh-determination';
    }
    else {
      navigateURL = '/reports/attachment-document/bh-determination';
    }
    return this._router.navigate([navigateURL])
  }
}
