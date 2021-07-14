import { Component, OnInit, ViewChild } from '@angular/core';
import { Kipp } from './kipp';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClildFormService } from '../child-forms/child-forms.service';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-kipp',
  templateUrl: './kipp.component.html',
  styleUrls: ['./kipp.component.scss']
})
export class KippComponent implements OnInit {
  kipp: Kipp = new Kipp();
  kippForm: FormGroup;
  isEdit = false;
  breadcrumbs = [];
  quickMenu = "referrel";
  metaData = [];
  discardTo = '/reintegration/referral/opencard/kipp/view';
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

  constructor(public _router: Router, public _fb: FormBuilder, public _client: ClildFormService,
    public _opencard: OpencardsService, public _caseTeam: CaseTeamService) { }

  ngOnInit() {
    if (this._router.url === '/reintegration/referral/opencard/kipp/detail') {
      this.getById()
      this.isAttachmentRequired = true;
    }
    this.breadcrumbs.push(
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
      { label: 'KIPP List', active: '', href: '/reintegration/referral/opencard/kipp/view' },
      { label: 'KIPP', active: 'active' }
    )
    this.formValidation();
  }
  formValidation() {
    this.kippForm = this._fb.group({
      kippServiceTypeID: [null, Validators.compose([Validators.required])],
      beginDate: [null, Validators.compose([Validators.required])],
      revisitEndDate: [null],
      endDate: [null],
      notes: [null],
    })
  }
  formAction(source: any) {
    if (this.kippForm.valid) {
      !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
      !isNullOrUndefined(source.revisitEndDate) ? source.revisitEndDate = Date.parse(source.revisitEndDate) : null;
      !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
      !isNullOrUndefined(source.kippServiceTypeID) ? source.kippServiceTypeID = source.kippServiceTypeID.kippServiceTypeID : null;
      source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
      !isNullOrUndefined(source.kippID) ? this.update(source) : this.save(source);
    } else {
      swal('Warning', 'Please fill the mandatory fields', 'info');
    }
  }
  save(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveKipp(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/kipp/view']);
    })
  }
  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateKipp(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/kipp/view']);
    })
  }
  getById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { kippID: this._client.getId() }
    this._opencard.getByIdKipp(this.req).then((data: any) => {
      loader.style.display = 'none';
      if (data.KIPP.isActive) {
        !isNullOrUndefined(data.KIPP.beginDate) ? data.KIPP.beginDate = moment(data.KIPP.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.KIPP.revisitEndDate) ? data.KIPP.revisitEndDate = moment(data.KIPP.revisitEndDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.KIPP.endDate) ? data.KIPP.endDate = moment(data.KIPP.endDate).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.KIPP.beginDate) ? data.KIPP.beginDate = moment.utc(data.KIPP.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.KIPP.revisitEndDate) ? data.KIPP.revisitEndDate = moment.utc(data.KIPP.revisitEndDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.KIPP.endDate) ? data.KIPP.endDate = moment.utc(data.KIPP.endDate).format('MM/DD/YYYY HH:mm') : null;
      }

      this.kipp = data.KIPP;
      this.kippForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.KIPP.changedBy) ? data.KIPP.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.KIPP.changedDate) ? moment(data.KIPP.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.KIPP.enteredBy) ? data.KIPP.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.KIPP.enteredDate) ? moment(data.KIPP.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


    })

  }
  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'kippServiceType':
        obj = 'kippServiceType';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.metaData = data.dropDown;
    })
  }
  editForm() {
    this.kippForm.enable();
    this.isEdit = false;
    
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/kipp/detail') {
      this.url = '/reports/attachment-document/rfc/kipp-pmto';
    }

    return this._router.navigate([this.url])
  }

}
