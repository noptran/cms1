import { Component, OnInit } from '@angular/core';
import { ProviderSchool } from './provider-school';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-provider-school',
  templateUrl: './provider-school.component.html',
  styleUrls: ['./provider-school.component.scss']
})
export class ProviderSchoolComponent implements OnInit {

  school: ProviderSchool = new ProviderSchool();
  providerSchool: FormGroup;
  breadcrumbs = [];
  results = [];
  discardTo = '/provider/opencard/school/view';
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

  constructor(public _router: Router, public _caseTeam: CaseTeamService,
    public _opencard: OpencardsService, public _fb: FormBuilder) { }

  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider List', href: '/reports/provider/view', active: '' },
      { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'School List', active: '', href: '/provider/opencard/school/view' },
      { label: 'School', active: 'active' }
    );
    if (this._router.url === '/provider/opencard/school/detail') {
      this.isAttachmentRequired = true;
      this.getProviderSchool();
    }
  }

  formAction(source: ProviderSchool) {
    if (this._router.url === '/provider/opencard/school/detail') {
      source.providerSchoolID = parseInt(localStorage.getItem('providerSchoolID')) - this._opencard.getHasKey();
      this.save(source);
    } else {
      this.save(source);
    }
  }

  save(source: ProviderSchool) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
    !isNullOrUndefined(source.schoolID) ? source.schoolID = source.schoolID.schoolID : null;
    source.providerID = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
    this._caseTeam.saveProviderSchool(source).then((data: any) => {
      loader.style.display = 'none';
      this._router.navigate(['/provider/opencard/school/view']);
    });
  }


  getProviderSchool() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const id = parseInt(localStorage.getItem('providerSchoolID')) - this._opencard.getHasKey();
    const req = { 'providerSchoolID': id };
    this.req = req; 
    this._caseTeam.getProviderSchoolDetails(req).then((data: any) => {
      !isNullOrUndefined(data.providerSchool.beginDate) ? data.providerSchool.beginDate = new Date(data.providerSchool.beginDate) : null;
      !isNullOrUndefined(data.providerSchool.endDate) ? data.providerSchool.endDate = new Date(data.providerSchool.endDate) : null;
      this.school = data.providerSchool;
      this.providerSchool.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.providerSchool.changedBy) ? data.providerSchool.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.providerSchool.changedDate) ? moment(data.providerSchool.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.providerSchool.enteredBy) ? data.providerSchool.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.providerSchool.enteredDate) ? moment(data.providerSchool.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      loader.style.display = 'none';
    });
  }
  getSchoolName(event) {
    let req;
    req = { 'Object': 'schoolName', 'value': event.query };
    return this._caseTeam.getSearchList(req).then((data) => {
      this.results = data.dropDown;
    });
  }
  formValidation() {
    this.providerSchool = this._fb.group({
      beginDate: [null],
      endDate: [null],
      notes: [null],
      schoolID: [null]
    });
  }
  editForm() {
    this.providerSchool.enable();
    this.isEdit = false;
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/provider/opencard/school/detail') {
      this.url = '/reports/attachment-document/providers/school';
    }
    return this._router.navigate([this.url])
  }
}
