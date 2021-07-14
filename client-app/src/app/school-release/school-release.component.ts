import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { Route, Router } from '@angular/router';
import { CaseTeamService } from '../case-team/case-team.service';
import { isNullOrUndefined } from 'util';
import { SchoolRelase } from './school-relase';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../local-values';

@Component({
  selector: 'app-school-release',
  templateUrl: './school-release.component.html',
  styleUrls: ['./school-release.component.scss']
})
export class SchoolReleaseComponent implements OnInit {
  schoolReleaseForm: FormGroup;
  isEdit = false;
  metaData = [];
  breadcrumbs = [];
  quickMenu = "referrel";
  schoolRelase: SchoolRelase = new SchoolRelase();
  discardTo = '/reintegration/referral/opencard/school-release/view';
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

  constructor(public _opencard: OpencardsService, public _client: ClildFormService, public _router: Router, public _caseTeam: CaseTeamService, public _fb: FormBuilder, public _localValues: LocalValues) { }

  ngOnInit() {
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this.formValidation();
    if (this._router.url == '/reintegration/referral/opencard/school-release/detail') {
      this.getRecById()
      this.isAttachmentRequired = true;
    }
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'School Release List', href: '/reintegration/referral/opencard/school-release/view', active: '' },
      { label: 'School Release', active: 'active' }
    )

    if (this.referralTypeId == 17) { this._localValues.breadcrumbsChanges('schoolRelease-JJFC', this.breadcrumbs) }
  }

  formValidation() {
    this.schoolReleaseForm = this._fb.group({
      schoolReleaseTypeID: [null],
      beginDate: [null],
      endDate: [null],
      notes: [null],
      referralID: [null]
    })
  }

  formAction(source: any) {
    !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
    !isNullOrUndefined(source.schoolReleaseTypeID) ? source.schoolReleaseTypeID = source.schoolReleaseTypeID.schoolReleaseTypeID : null;
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    !isNullOrUndefined(source.schoolReleaseID) ? this.update(source) : this.save(source);
  }

  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveSchoolRelease(source).then((data) => {
      loader.style.display = 'none';
      swal('Save', 'Record has been saved!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/school-release/view'], { queryParamsHandling: "preserve" })
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateSchoolRelase(source).then((data) => {
      loader.style.display = 'none';
      swal('Upadate', 'Record has been updated!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/school-release/view'], { queryParamsHandling: "preserve" })
    })
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'school_release':
        obj = 'schoolReleaseType';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data) => {
      this.metaData = data.dropDown;
    })
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { schoolReleaseID: this._client.getId() }
    this._opencard.getByIdSchoolRelease(this.req).then((data) => {
      loader.style.display = 'none';
      if (data.schoolRelease.isActive) {
        !isNullOrUndefined(data.schoolRelease.beginDate) ? data.schoolRelease.beginDate = moment(data.schoolRelease.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.schoolRelease.endDate) ? data.schoolRelease.endDate = moment(data.schoolRelease.endDate).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.schoolRelease.beginDate) ? data.schoolRelease.beginDate = moment.utc(data.schoolRelease.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.schoolRelease.endDate) ? data.schoolRelease.endDate = moment.utc(data.schoolRelease.endDate).format('MM/DD/YYYY HH:mm') : null;
      }
      this.schoolRelase = data.schoolRelease;
      this.isEdit = true;
      this.schoolReleaseForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.schoolRelease.changedBy) ? data.schoolRelease.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.schoolRelease.changedDate) ? moment(data.schoolRelease.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.schoolRelease.enteredBy) ? data.schoolRelease.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.schoolRelease.enteredDate) ? moment(data.schoolRelease.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


    })
  }

  editForm() {
    this.isEdit = false;
    this.schoolReleaseForm.enable();
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/school-release/detail') {
      this.url = '/reports/attachment-document/rfc/school-release';
    }
    return this._router.navigate([this.url])
  }

}
