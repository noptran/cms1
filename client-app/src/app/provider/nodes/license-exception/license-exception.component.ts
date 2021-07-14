import { Component, OnInit } from '@angular/core';
import { LicenseException } from './license-exception';
import { isNullOrUndefined } from 'util';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { ProviderService } from '../../provider.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import {LocalValues} from '../../../local-values';
import * as moment from 'moment';


@Component({
  selector: 'app-license-exception',
  templateUrl: './license-exception.component.html',
  styleUrls: ['./license-exception.component.scss']
})
export class LicenseExceptionComponent implements OnInit {
  discardTo = '/provider/opencard/license-exception/view';
  licenseExcep: LicenseException = new LicenseException();
  providerLicenseException: FormGroup;
  breadcrumbs = [];
  metaData = [];
  isEdit = false;
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

  constructor(public _caseTeam: CaseTeamService, public _router: Router,
    public _provider: ProviderService, public _fb: FormBuilder, public _opencard: OpencardsService,
    public _localValues: LocalValues) { }

  ngOnInit() {
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider List', href: '/reports/provider/view', active: '' },
      { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'License and sponsorship ', active: '', href: '/provider/dashboard/license-sponsorship' },
      { label: 'License Exception List', active: '', href: '/provider/opencard/license-exception/view' },
      { label: 'License Exception', active: 'active' }
    );
    this.formValidation();
    if (this._router.url === '/provider/opencard/license-exception/detail') {
      this.isAttachmentRequired = true;
      this.getLicenseException();
    }
  }

  formAction(source: LicenseException) {
    this.save(source)
  }
  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'yesNoPending':
        obj = 'yesNoPending';
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.metaData = data.dropDown;
    });
  }
  save(source: LicenseException) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const req = {
      'beginDate': !isNullOrUndefined(source.beginDate) ? Date.parse(source.beginDate) : null,
      'endDate': !isNullOrUndefined(source.endDate) ? Date.parse(source.endDate) : null,
      'approval_YesNoPendingID': !isNullOrUndefined(source.approval_YesNoPendingID) ? source.approval_YesNoPendingID.yesNoPendingID : null,
      'childName': !isNullOrUndefined(source.childName) ? (source.childName) : null,
      'reason': !isNullOrUndefined(source.reason) ? (source.reason) : null,
      'sentToDCF': !isNullOrUndefined(source.sentToDCF) ? this._localValues.stringFormatDatetime(Date.parse(source.sentToDCF)) : null,
      'notes': !isNullOrUndefined(source.notes) ? (source.notes) : null,
      'statusTypeID': !isNullOrUndefined(source.statusTypeID) ? (source.statusTypeID.statusTypeID) : null,
      'DCFResponse': !isNullOrUndefined(source.DCFResponse) ? this._localValues.stringFormatDatetime(Date.parse(source.DCFResponse)) : null,
      'inactiveDate': !isNullOrUndefined(source.inactiveDate) ? Date.parse(source.inactiveDate) : null,
      'providerID': parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey()
    };
    if (this._router.url === '/provider/opencard/license-exception/detail') {
      req['providerLicenseExceptionID'] = parseInt(localStorage.getItem('providerLicenseExceptionID')) - this._opencard.getHasKey();
    }
    this._provider.saveProviderLicenseException(req).then((data) => {
      loader.style.display = 'none';
      this._router.navigate(['/provider/opencard/license-exception/view']);
    });
  }



  sfcsStatus(event) {
    const req = { 'value': event.query };
    this._provider.getSFCSStatus(req).then((data) => {
      this.metaData = data.dropDown;
    });
  }
  formValidation() {
    this.providerLicenseException = this._fb.group({
      beginDate: [null],
      endDate: [null],
      reason: [null],
      childName: [null],
      DCFResponse: [null],
      sentToDCF: [null],
      statusTypeID: [null],
      approval_YesNoPendingID: [null],
      inactiveDate: [null],
      notes: [null]
    });
  }
  getLicenseException() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.req = { 'providerLicenseExceptionID': parseInt(localStorage.getItem('providerLicenseExceptionID')) - this._opencard.getHasKey() };
    this._provider.getProviderLicenseException(this.req).then((data) => {
      !isNullOrUndefined(data.providerLicenseException.beginDate) ?
        data.providerLicenseException.beginDate = new Date(data.providerLicenseException.beginDate) : null;
      !isNullOrUndefined(data.providerLicenseException.endDate) ?
        data.providerLicenseException.endDate = new Date(data.providerLicenseException.endDate) : null;
      !isNullOrUndefined(data.providerLicenseException.sentToDCF) ?
        data.providerLicenseException.sentToDCF = new Date(data.providerLicenseException.sentToDCF) : null;
      !isNullOrUndefined(data.providerLicenseException.inactiveDate) ?
        data.providerLicenseException.inactiveDate = new Date(data.providerLicenseException.inactiveDate) : null;
      !isNullOrUndefined(data.providerLicenseException.dcfresponse) ?
        data.providerLicenseException.DCFResponse = new Date(data.providerLicenseException.dcfresponse) : null;
      this.licenseExcep = data.providerLicenseException;
      this.providerLicenseException.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.providerLicenseException.changedBy) ? data.providerLicenseException.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.providerLicenseException.changedDate) ? moment(data.providerLicenseException.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.providerLicenseException.enteredBy) ? data.providerLicenseException.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.providerLicenseException.enteredDate) ? moment(data.providerLicenseException.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      loader.style.display = 'none';
    });
  }
  editForm() {
    this.providerLicenseException.enable();
    this.isEdit = false;
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/provider/opencard/license-exception/detail') {
      this.url = '/reports/attachment-document/providers/license-exception';
    }
    return this._router.navigate([this.url])
  }
}
