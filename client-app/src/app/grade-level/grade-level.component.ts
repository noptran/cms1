import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { Router } from '@angular/router';
import { GradeLevel } from './grade-level';
import { CaseTeamService } from '../case-team/case-team.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../local-values';


@Component({
  selector: 'app-grade-level',
  templateUrl: './grade-level.component.html',
  styleUrls: ['./grade-level.component.scss']
})
export class GradeLevelComponent implements OnInit {
  gradeLevelForm: FormGroup;
  metaData = [];
  isEdit = false;
  quickMenu = "referrel";
  grade: GradeLevel = new GradeLevel();
  breadcurmbs = [];
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

  constructor(public _fb: FormBuilder, public _opencard: OpencardsService,
    public _client: ClildFormService, public _router: Router,
    public _caseTeam: CaseTeamService, public _localValues: LocalValues) { }

  ngOnInit() {
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this.formValidation();
    this.breadcurmbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Grade Level List', href: '/reintegration/referral/opencard/grade-level/view', active: '' },
      { label: 'Grade Level', active: 'active' },
    )
    if (this.referralTypeId === 17) {
      this.breadcurmbs = this._localValues.breadcrumbsChanges('gradeLevel-JJFC', this.breadcurmbs)
    }
    if (this.referralTypeId === 4) {
      this.breadcurmbs = this._localValues.breadcrumbsChanges('gradeLevel-NCFCH', this.breadcurmbs)
    }
    if (this._router.url == '/reintegration/referral/opencard/grade-level/detail') {
      this.getRecById()
      this.isAttachmentRequired = true;
    }
  }

  getMetaData(event: any, label: any) {
    let req, obj;
    switch (label) {
      case 'grade':
        obj = 'grade';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data) => {
      this.metaData = data.dropDown;
    })
  }

  formValidation() {
    this.gradeLevelForm = this._fb.group({
      gradeID: [null, Validators.compose([Validators.required])],
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      isComplete: [null],
      notes: [null],
      referralID: [null],
    })
  }

  formAction(source: any) {
    !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
    !isNullOrUndefined(source.gradeID) ? source.gradeID = source.gradeID.gradeID : null;
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    if (this.gradeLevelForm.valid) { !isNullOrUndefined(source.clientGradeID) ? this.udapte(source) : this.save(source) }
    else { swal('Warning', 'Kindly fill the mandatory fields', 'info') }
  }

  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveGradeLevel(source).then((data) => {
      loader.style.display = 'none';
      swal('Save', 'Record has been saved!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/grade-level/view'], { queryParamsHandling: "preserve" })
    })
  }

  udapte(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateGradeLevel(source).then((data) => {
      loader.style.display = 'none';
      swal('Upadate', 'Record has been updated!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/grade-level/view'], { queryParamsHandling: "preserve" })
    })
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { clientGradeID: this._client.getId() }
    this._opencard.getByIdGradeLevel(this.req).then((data) => {
      loader.style.display = 'none';
      if (data.clientGrade.isActive) {
        !isNullOrUndefined(data.clientGrade.beginDate) ? data.clientGrade.beginDate = moment(data.clientGrade.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientGrade.endDate) ? data.clientGrade.endDate = moment(data.clientGrade.endDate).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.clientGrade.beginDate) ? data.clientGrade.beginDate = moment.utc(data.clientGrade.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientGrade.endDate) ? data.clientGrade.endDate = moment.utc(data.clientGrade.endDate).format('MM/DD/YYYY HH:mm') : null;
      }
      this.grade = data.clientGrade;
      this.isEdit = true;
      this.gradeLevelForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.clientGrade.changedBy) ? data.clientGrade.changedBy : '------';
    this.formLogInfo.changedDate = !isNullOrUndefined(data.clientGrade.changedDate) ? moment(data.clientGrade.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
    this.formLogInfo.enteredBy = !isNullOrUndefined(data.clientGrade.enteredBy) ? data.clientGrade.enteredBy : '------';
    this.formLogInfo.enteredDate = !isNullOrUndefined(data.clientGrade.enteredDate) ? moment(data.clientGrade.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.isEdit = false;
    this.gradeLevelForm.enable();
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/grade-level/detail') {
      this.url = '/reports/attachment-document/rfc/grade-level';
    }
    return this._router.navigate([this.url])
  }

  discard = () => { return window.history.back() }


}
