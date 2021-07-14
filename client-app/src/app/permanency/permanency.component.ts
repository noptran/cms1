import { Component, OnInit } from '@angular/core';
import { Permanency } from './permanency';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import { ClildFormService } from '../child-forms/child-forms.service';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';

@Component({
  selector: 'app-permanency',
  templateUrl: './permanency.component.html',
  styleUrls: ['./permanency.component.scss']
})
export class PermanencyComponent implements OnInit {
  permanency: Permanency = new Permanency();
  permanencyForm: FormGroup;
  discardTo = '/reintegration/referral/opencard/move-permanency/permanency-form/view';
  breadcrumbs = [];
  isEdit = false;
  quickMenu = "referrel";
  isViewAttachmentDisabled = false;
  url: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  isAttachmentRequired = false;
  constructor(public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _fb: FormBuilder) { }

  ngOnInit() {
    if (this._router.url === '/reintegration/referral/opencard/move-permanency/permanency-form/detail') {
      this.isAttachmentRequired = true;
      this.getRecById()
    }
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Move and Permanency Menu', href: '/reintegration/referral/opencard/move-permanency/dashboard', active: '' },
      { label: 'Permanency List', active: '', href: '/reintegration/referral/opencard/move-permanency/permanency-form/view' },
      { label: 'Permanency ', active: 'active' }
    );
    this.isEdit = false;
  }

  getRecById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { permanencyEventID: this._client.getId() }
    this._opencard.getByIdPermanency(req).then((data: any) => {
      loader.style.display = 'none';
      data.permanancy.dateOfPermanencyOrRelease = moment.utc(data.permanancy.dateOfPermanencyOrRelease).format("MM/DD/YYYY")
      this.permanency = data.permanancy;
      this.permanencyForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.permanancy.changedBy) ? data.permanancy.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.permanancy.changedDate) ? moment(data.permanancy.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.permanancy.enteredBy) ? data.permanancy.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.permanancy.enteredDate) ? moment(data.permanancy.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  formValidation() {
    this.permanencyForm = this._fb.group({
      dateOfPermanencyOrRelease: [null],
    })
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/move-permanency/permanency-form/detail' || currentURL == '/reintegration/referral/opencard/move-permanency/permanency-form/new') {
      this.url = '/reports/attachment-document/rfc/permanency';
    }
    else {
      this.url = '/reports/attachment-document/permanency';
    }
    return this._router.navigate([this.url])
  }

  openUploadDocument() {
    let currentUrl = this._router.url;
    switch (currentUrl) {
      case '/reintegration/referral/opencard/move-permanency/permanency-form/detail':
        this._router.navigate(['/reports/attachment-document/rfc/permanency/new'])
        break;
    }

  }

  discardBtn() {
    return !isNullOrUndefined(this.discardTo) ? this._router.navigate([this.discardTo]) : null;
  }

}
