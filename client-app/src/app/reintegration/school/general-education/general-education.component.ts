import { Component, OnInit } from '@angular/core';
import { GeneralEducation } from './general-education';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../../../local-values';


@Component({
  selector: 'app-general-education',
  templateUrl: './general-education.component.html',
  styleUrls: ['./general-education.component.scss']
})
export class GeneralEducationComponent implements OnInit {

  gEducation: GeneralEducation = new GeneralEducation();
  isEdit = false;
  breadcrumbs = [];
  quickMenu = "referrel";
  metaData = [];
  generalEducationForm: FormGroup;
  discardTo = '/reintegration/referral/opencard/school/general-education/view'
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

  constructor(public _router: Router, public _fb: FormBuilder, public _opencard: OpencardsService,
    public _caseTeam: CaseTeamService, public _client: ClildFormService, public _localValues: LocalValues) { }

  ngOnInit() {
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral//detail", active: '' },
      { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
      { label: 'General Education List', active: '', href: '/reintegration/referral/opencard/school/general-education/view' },
      { label: 'General Education', active: 'active' }
    )
    if (this._router.url === '/reintegration/referral/opencard/school/general-education/detail') {
      this.getRecById()
      this.isAttachmentRequired = true;
    }
    this.formValidation();

    if(this.referralTypeId == 17) { this._localValues.breadcrumbsChanges('generalEducation-JJFC',this.breadcrumbs)}
  }

  formValidation() {
    this.generalEducationForm = this._fb.group({
      completedDate: [null],
      generalEducationTypeID: [null],
      notes: [null],
    })
  }

  formAction(source: GeneralEducation) {
    source.completedDate = this._localValues.stringFormatDatetime(source.completedDate);
    !isNullOrUndefined(source.generalEducationTypeID) ? source.generalEducationTypeID = source.generalEducationTypeID.generalEducationTypeID : null;
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    !isNullOrUndefined(source.generalEducationID) ? this.update(source) : this.save(source);

  }

  save(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveGeneralEducation(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/school/general-education/view'], { queryParamsHandling: "preserve" })
    })
  }

  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateGeneralEducationn(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/school/general-education/view'], { queryParamsHandling: "preserve" })
    })
  }

  getMetaData(event: any, label: any) {
    let obj: any, req: any;
    switch (label) {
      case 'educationType':
        obj = 'generalEducationType';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data) => {
      this.metaData = data.dropDown;
    })
  }

  getRecById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { generalEducationID: this._client.getId() }
    this._opencard.getByIdGeneralEducation(this.req).then((data: any) => {
      if (data.generalEducation.isActive) {
        !isNullOrUndefined(data.generalEducation.completedDate) ? data.generalEducation.completedDate = moment(data.generalEducation.completedDate).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.generalEducation.completedDate) ? data.generalEducation.completedDate = moment.utc(data.generalEducation.completedDate).format('MM/DD/YYYY HH:mm') : null;
      }

      loader.style.display = 'none';
      this.gEducation = data.generalEducation;
      this.isEdit = true;
      this.generalEducationForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.generalEducation.changedBy) ? data.generalEducation.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.generalEducation.changedDate) ? moment(data.generalEducation.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.generalEducation.enteredBy) ? data.generalEducation.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.generalEducation.enteredDate) ? moment(data.generalEducation.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }


  editForm() {
    this.isEdit = false;
    this.generalEducationForm.enable();
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/school/general-education/detail') {
      this.url = '/reports/attachment-document/rfc/general-education';
    }

    return this._router.navigate([this.url])
  }

}
