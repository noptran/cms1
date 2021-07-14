import { Component, OnInit } from '@angular/core';
import { CreditTracking } from './credit-tracking';
import { Router } from '@angular/router';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../../../local-values';

@Component({
  selector: 'app-credit-tracking',
  templateUrl: './credit-tracking.component.html',
  styleUrls: ['./credit-tracking.component.scss']
})
export class CreditTrackingComponent implements OnInit {
  tracking: CreditTracking = new CreditTracking();
  isEdit = false;
  breadcrumbs = [];
  trackingForm: FormGroup;
  quickMenu = "referrel";
  discardTo = '/reintegration/referral/opencard/school/credit-tracking/view';
  url: any;
  isAttachmentRequired = false;
  req: any;
  referralTypeId: number;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _router: Router, public _client: ClildFormService, public _caseTeam: CaseTeamService,
    public _fb: FormBuilder, public _opencard: OpencardsService, public _localValues: LocalValues) { }

  ngOnInit() {
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral//detail", active: '' },
      { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
      { label: 'Credit Tracking List', active: '', href: '/reintegration/referral/opencard/school/credit-tracking/view' },
      { label: 'Credit Tracking', active: 'active' }
    )
    if (this._router.url === '/reintegration/referral/opencard/school/credit-tracking/detail') {
      this.getRecById()
      this.isAttachmentRequired = true;
    }
    if (this.referralTypeId == 17) { this._localValues.breadcrumbsChanges('creditTracking-JJFC', this.breadcrumbs) }
  }

  formValidation() {
    this.trackingForm = this._fb.group({
      creditTrackingId: [null],
      creditHours: [null],
      onTrackToGraduate: [null],
      beginDate: [null],
      endDate: [null],
      estimatedGraduationDate: [null],
      notes: [null],
    })
  }


  formAction(source: CreditTracking) {
    source.beginDate = this._localValues.stringFormatDatetime(Date.parse(source.beginDate));
    source.endDate = this._localValues.stringFormatDatetime(Date.parse(source.endDate));
    source.estimatedGraduationDate = this._localValues.stringFormatDatetime(Date.parse(source.estimatedGraduationDate));
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    !isNullOrUndefined(source.creditTrackingID) ? this.update(source) : this.save(source);

  }

  save(source: CreditTracking) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveCreditTracking(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/school/credit-tracking/view'], { queryParamsHandling: "preserve" });
    })
  }

  update(source: CreditTracking) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateCreditTracking(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/school/credit-tracking/view'], { queryParamsHandling: "preserve" });
    })
  }

  editForm() {
    this.trackingForm.enable();
    this.isEdit = false;
  }

  getRecById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { creditTrackingID: this._client.getId() }
    this._opencard.getByIdCreditTracking(this.req).then((data: any) => {
      const loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'none';
      if (data.creditTracking.isActive) {
        !isNullOrUndefined(data.creditTracking.beginDate) ? data.creditTracking.beginDate = new Date(data.creditTracking.beginDate) : null;
        !isNullOrUndefined(data.creditTracking.endDate) ? data.creditTracking.endDate = new Date(data.creditTracking.endDate) : null;
      } else {
        !isNullOrUndefined(data.creditTracking.beginDate) ? data.creditTracking.beginDate = moment.utc(data.creditTracking.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.creditTracking.endDate) ? data.creditTracking.endDate = moment.utc(data.creditTracking.endDate).format('MM/DD/YYYY HH:mm') : null;
      }

      !isNullOrUndefined(data.creditTracking.estimatedGraduationDate) ? data.creditTracking.estimatedGraduationDate = new Date(data.creditTracking.estimatedGraduationDate) : null;
      this.tracking = data.creditTracking;
      this.isEdit = true;
      this.trackingForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.creditTracking.changedBy) ? data.creditTracking.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.creditTracking.changedDate) ? moment(data.creditTracking.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.creditTracking.enteredBy) ? data.creditTracking.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.creditTracking.enteredDate) ? moment(data.creditTracking.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/school/credit-tracking/detail') {
      this.url = '/reports/attachment-document/rfc/credit-tracking';
    }

    return this._router.navigate([this.url])
  }


}
