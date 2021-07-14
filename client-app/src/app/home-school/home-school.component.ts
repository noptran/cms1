import { Component, OnInit } from '@angular/core';
import { HomeSchool } from './home-school';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseTeamService } from '../case-team/case-team.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../local-values';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-school',
  templateUrl: './home-school.component.html',
  styleUrls: ['./home-school.component.scss']
})
export class HomeSchoolComponent implements OnInit {
  homeSchool: HomeSchool = new HomeSchool();
  isEdit = false;
  homeSchoolForm: FormGroup;
  quickMenu = "referrel";
  metaData = [];
  breadcrumbs = [];
  url: any;
  isAttachmentRequired = false;
  isSchoolVisible = false;
  req: any;
  referralTypeId: number;
  isAppHeader = true;
  isList = false;
  isForm = true;
  homeSchoolList = [];
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;


  constructor(public _fb: FormBuilder, public _router: Router, public _caseTeam: CaseTeamService
    , public _client: ClildFormService, public _opencard: OpencardsService, public _localValues: LocalValues, public _message: MessageService) { }

  ngOnInit() {
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this.formValidation();
    if (this._router.url == '/reintegration/referral/opencard/home-school/detail') {
      this.getbyId()
      this.isAttachmentRequired = true;
    }
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Home School List', href: '/reintegration/referral/opencard/home-school/view', active: '' },
      { label: 'Home School', active: 'active' },
    )
    if (this.referralTypeId === 11) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('homeSchool-NCMHR', this.breadcrumbs)
    }
    if (this.referralTypeId === 4) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('homeSchool-NCFCH', this.breadcrumbs)
    }
    if (this.referralTypeId === 17) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('homeSchool-JJFC', this.breadcrumbs)
    }
    if (this.referralTypeId === 14) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('homeSchool-PRTF', this.breadcrumbs)
    }
    this.getHomeSchoolList();
  }

  formValidation() {
    this.homeSchoolForm = this._fb.group({
      beginDate: [null],
      endDate: [null],
      schoolID: [null],
      changeReasonID: [null]
    })
  }

  formAction(source) {
    !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
    !isNullOrUndefined(source.changeReasonID) ? source.changeReasonID = source.changeReasonID.changeReasonID : null;
    !isNullOrUndefined(source.schoolID) ? source.schoolID = source.schoolID.schoolID : null;
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    !isNullOrUndefined(source.homeSchoolID) ? this.update(source) : this.save(source);

  }

  getMetaData(event, label) {
    let req, obj;
    switch (label) {
      case 'school':
        obj = 'schoolName';
        break;
      case 'change_reason':
        obj = 'changeReason';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data) => {
      this.metaData = data.dropDown;
    })
  }

  editForm() {
    this.homeSchoolForm.enable();
    this.isEdit = false;
  }

  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveHomeschool(source).then((data) => {
      loader.style.display = 'none';
      if (this.isAppHeader) {
        swal('Save', 'Record has been saved!', 'success');
        if (this._router.url == '/reintegration/referral/opencard/home-school/new') {
          return this._router.navigate(['/reintegration/referral/opencard/home-school/view'], { queryParamsHandling: "preserve" })
        } else {
          return;
        }
      } else {
        this.isForm = false;
        this.getHomeSchoolList();
        this.isList = true;
        this._message.add({ severity: 'success', summary: 'Saved!', detail: 'The record has been saved!' });
      }
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateHomeschool(source).then((data) => {
      loader.style.display = 'none';
      if (this.isAppHeader) {
        swal('Save', 'Record has been saved!', 'success');
        if (this._router.url == '/reintegration/referral/opencard/home-school/new') {
          return this._router.navigate(['/reintegration/referral/opencard/home-school/view'], { queryParamsHandling: "preserve" })
        } else {
          return;
        }
      } else {
        this.isForm = false;
        this.getHomeSchoolList();
        this.isList = true;
        this._message.add({ severity: 'success', summary: 'Updated!', detail: 'The record has been updated!' });
      }
    })
  }

  getbyId() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { homeSchoolID: this._client.getId() }
    this._opencard.getByIdHomeschool(this.req).then((data) => {
      this._localValues.medicationAllergiesDelelePRTF = true;
      if (data.homeSchool.schoolID) {
        this._client.storeId(data.homeSchool.schoolID.schoolID);
      }
      loader.style.display = 'none';
      !isNullOrUndefined(data.homeSchool.beginDate) ? data.homeSchool.beginDate = moment(data.homeSchool.beginDate).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.homeSchool.endDate) ? data.homeSchool.endDate = moment(data.homeSchool.endDate).format('MM/DD/YYYY HH:mm') : null;
      this.homeSchool = data.homeSchool;
      this.isEdit = true;
      this.homeSchoolForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.homeSchool.changedBy) ? data.homeSchool.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.homeSchool.changedDate) ? moment(data.homeSchool.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.homeSchool.enteredBy) ? data.homeSchool.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.homeSchool.enteredDate) ? moment(data.homeSchool.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/home-school/detail') {
      this.url = '/reports/attachment-document/rfc/home-school';
    }

    return this._router.navigate([this.url])
  }

  onViewSchoolSelect() {
    this.isSchoolVisible = true;
  }

  discard = () => {
    if (this.isAppHeader) {
      return window.history.back();
    } else {
      this.isForm = false;
      this.getHomeSchoolList();
      this.isList = true;
    }
  }

  async getHomeSchoolList() {
    let request = {
      referralID: parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey(),
      endPagination: 100,
      beginPagination: 1,
      sort: { "column": "homeSchoolID", "mode": "desc" }
    }
    let response = await this._opencard.listAllHomeschool(request);
    this.homeSchoolList = response.homeSchool;
    return;
  }

  public onAddForm() {
    this.isList = false;
    this.formValidation();
    this.isForm = true;
    this.isEdit = false;
    this.isAppHeader = false;
  }

  public onEditForm(event: any) {
    let request = { homeSchoolID: event.homeSchoolID };
    this.formValidation();
    this._opencard.getByIdHomeschool(request).then((data) => {
      if (data.homeSchool.schoolID) {
        this._client.storeId(data.homeSchool.schoolID.schoolID);
      }
      !isNullOrUndefined(data.homeSchool.beginDate) ? data.homeSchool.beginDate = moment(data.homeSchool.beginDate).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.homeSchool.endDate) ? data.homeSchool.endDate = moment(data.homeSchool.endDate).format('MM/DD/YYYY HH:mm') : null;
      this.homeSchool = data.homeSchool;
      this.isEdit = true;
      this.homeSchoolForm.disable();
      this.isList = false;
      this.isForm = true;
    })
  }

  ngOnDestroy() {
    this._localValues.medicationAllergiesDelelePRTF = null;
  }

}
