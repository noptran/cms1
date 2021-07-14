import { Component, OnInit } from '@angular/core';
import { SpecialEducation } from './special-education';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { LocalValues } from '../../../local-values';


@Component({
  selector: 'app-special-education',
  templateUrl: './special-education.component.html',
  styleUrls: ['./special-education.component.scss']
})
export class SpecialEducationComponent implements OnInit {
  education: SpecialEducation = new SpecialEducation();
  isEdit = false;
  breadcrumbs = [];
  metaData = [];
  quickMenu = "referrel";
  specialEducationForm: FormGroup;
  discardTo = '/reintegration/referral/opencard/school/special-education/view';
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

  constructor(public _router: Router, public _fb: FormBuilder, public _client: ClildFormService,
    public _caseTeam: CaseTeamService, public _opencard: OpencardsService, public _localValues: LocalValues) { }

  ngOnInit() {
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this.formValidtion();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral//detail", active: '' },
      { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
      { label: 'Special Education List', active: '', href: '/reintegration/referral/opencard/school/special-education/view' },
      { label: 'Special Education', active: 'active' }
    )
    if (this._router.url === '/reintegration/referral/opencard/school/special-education/detail') {
      this.getRecById()
      this.isAttachmentRequired = true;
    }
    if (this.referralTypeId === 17) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('specialEducation-JJFC', this.breadcrumbs)
    }
  }

  formValidtion() {
    this.specialEducationForm = this._fb.group({
      beginDate: [null],
      endDate: [null],
      primaryExceptionalityTypeID: [null],
      secondaryExceptionalityTypeID: [null],
      notes: [null],
      iEP: [null]
    })
  }

  formAction(source: SpecialEducation) {
    console.log("source>>>", source);
    !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
    !isNullOrUndefined(source.primaryExceptionalityTypeID) ? source.primaryExceptionalityTypeID = source.primaryExceptionalityTypeID.specialEducationTypeID : null;
    !isNullOrUndefined(source.secondaryExceptionalityTypeID) ? source.secondaryExceptionalityTypeID = source.secondaryExceptionalityTypeID.specialEducationTypeID : null;
    !isNullOrUndefined(source.iEP) ? source.iEP = source.iEP.yesNoPendingID : null;
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    !isNullOrUndefined(source.specialEducationID) ? this.update(source) : this.save(source);
  }

  save(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    console.log("source>>>", source);
    this._opencard.saveSpecialEducation(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/school/special-education/view'], { queryParamsHandling: "preserve" });
    })
  }

  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateSpecialEducation(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/school/special-education/view'], { queryParamsHandling: "preserve" });
    })
  }

  getMetaData(event: any, label: any) {
    let obj: any, req: any;
    switch (label) {
      case 'primaryExceptionality':
        obj = 'specialEducationType';
        break;
      case 'secondaryExceptionality':
        obj = 'specialEducationType';
        break;
      case 'yesNoUnknown_IsSpecialEducation':
        obj = 'yesNoUnknown_IsSpecialEducation';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.metaData = data.dropDown;
    })
  }

  getRecById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { specialEducationID: this._client.getId() }
    this._opencard.getByIdSpecialEducation(this.req).then((data: any) => {
      loader.style.display = 'none';
      if (data.specialEducation.isActive) {
        !isNullOrUndefined(data.specialEducation.beginDate) ? data.specialEducation.beginDate = moment(data.specialEducation.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.specialEducation.endDate) ? data.specialEducation.endDate = moment(data.specialEducation.endDate).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.specialEducation.beginDate) ? data.specialEducation.beginDate = moment.utc(data.specialEducation.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.specialEducation.endDate) ? data.specialEducation.endDate = moment.utc(data.specialEducation.endDate).format('MM/DD/YYYY HH:mm') : null;
      }
      this.education = data.specialEducation;
      this.isEdit = true;
      this.specialEducationForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.specialEducation.changedBy) ? data.specialEducation.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.specialEducation.changedDate) ? moment(data.specialEducation.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.specialEducation.enteredBy) ? data.specialEducation.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.specialEducation.enteredDate) ? moment(data.specialEducation.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.isEdit = false;
    this.specialEducationForm.enable();
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/school/special-education/detail') {
      this.url = '/reports/attachment-document/rfc/special-education';
    }
    return this._router.navigate([this.url])
  }


}
