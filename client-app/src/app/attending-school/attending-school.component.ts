import { Component, OnInit } from '@angular/core';
import { AttendingSchool } from './attending-school';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CaseTeamService } from '../case-team/case-team.service';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import { ClildFormService } from '../child-forms/child-forms.service';
import swal from 'sweetalert2';
import {LocalValues} from '../local-values';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';



@Component({
  selector: 'app-attending-school',
  templateUrl: './attending-school.component.html',
  styleUrls: ['./attending-school.component.scss']
})
export class AttendingSchoolComponent implements OnInit {
  school: AttendingSchool = new AttendingSchool();
  schoolForm: FormGroup;
  quickMenu = "referrel";
  isEdit = false;
  metaData = [];
  breadcrumbs = [];
  discardTo = '/reintegration/referral/opencard/attending-school/view';
  url: any;
  isAttachmentRequired = false;
  isSchoolVisible = false;
  currentNodeValue: any;
  req: any;
  referralTypeId: number;
  isFooterDisable = true;
  isAppHeader = true;
  isList = false;
  isForm = true;
  attendingSchoolList = [];
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _fb: FormBuilder, public _caseTeam: CaseTeamService, public _opencard: OpencardsService,
    public _router: Router, public _client: ClildFormService, public _localValues: LocalValues, public _message: MessageService) { }

  ngOnInit() {
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Attending School List', href: '/reintegration/referral/opencard/attending-school/view', active: '' },
      { label: 'Attending School Form', active: 'active' },
    )
    if (this.referralTypeId === 11) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('attendingSchool-NCMHR', this.breadcrumbs);
    }
    if (this.referralTypeId === 4) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('attendingSchool-NCFCH', this.breadcrumbs);
    }
    if (this.referralTypeId === 17) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('attendingSchool-JJFC', this.breadcrumbs);
    }
    if (this.referralTypeId === 14) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('attendingSchool-PRTF', this.breadcrumbs);
    }
    if (this._router.url == '/reintegration/referral/opencard/attending-school/detail') {
      this.getRecById()
      this.isAttachmentRequired = true;
    }
    this.getAttendingSchoolList();
  }

  formValidation() {
    this.schoolForm = this._fb.group({
      clientSchoolID: [null],
      beginDate: [null],
      endDate: [null],
      schoolID: [null],
      enrolledBeginDate: [null],
      enrolledEndDate: [null],
      changeReasonID: [null],
      notes: [null],
      referralID: [null]
    })
  }

  schoolFormAction(source: any) {
    source.beginDate = this._localValues.stringFormatDatetime(Date.parse(source.beginDate));
    source.endDate = this._localValues.stringFormatDatetime(Date.parse(source.endDate));
    source.enrolledBeginDate = this._localValues.stringFormatDatetime(Date.parse(source.enrolledBeginDate));
    source.enrolledEndDate = this._localValues.stringFormatDatetime(Date.parse(source.enrolledEndDate));
    !isNullOrUndefined(source.schoolID) ? source.schoolID = source.schoolID.schoolID : null;
    !isNullOrUndefined(source.changeReasonID) ? source.changeReasonID = source.changeReasonID.changeReasonID : null;
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    source.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();

    !isNullOrUndefined(source.clientSchoolID) ? this.update(source) : this.save(source)
  }

  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveAttendingSchool(source).then((data) => {
      loader.style.display = 'none';
      if (this.isAppHeader) {
        swal('Save', 'Record has been saved!', 'success');
        this._router.navigate(['/reintegration/referral/opencard/attending-school/view'], { queryParamsHandling: "preserve" });
      } else {
        this._message.add({ severity: 'success', summary: 'Saved!', detail: 'The record has been saved!' });
        this.isForm = false;
        this.getAttendingSchoolList();
        this.isList = true;
      }
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateAttendingSchool(source).then((data) => {
      loader.style.display = 'none';
      if (this.isAppHeader) {
        swal('Update', 'Record has been updated!', 'success');
        this._router.navigate(['/reintegration/referral/opencard/attending-school/view'], { queryParamsHandling: "preserve" });
      } else {
        this._message.add({ severity: 'success', summary: 'Saved!', detail: 'The record has been updated!' });
        this.isForm = false;
        this.getAttendingSchoolList();
        this.isList = true;
      }
    })
  }

  editForm() {
    this.isEdit = false;
    this.schoolForm.enable();
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
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

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { clientSchoolID: this._client.getId() }
    this._opencard.getByRecAttendingSchool(this.req).then((data) => {
      loader.style.display = 'none';
      this.isFooterDisable = false;
      this._localValues.medicationAllergiesDelelePRTF = true;
      if (data.clientSchool.schoolID) {
        this._client.storeId(data.clientSchool.schoolID.schoolID);
      }
      data.clientSchool.beginDate = !isNullOrUndefined(data.clientSchool.beginDate) ? new Date(data.clientSchool.beginDate) : null;
      data.clientSchool.endDate = !isNullOrUndefined(data.clientSchool.endDate) ? new Date(data.clientSchool.endDate) : null;
      data.clientSchool.enrolledBeginDate = !isNullOrUndefined(data.clientSchool.enrolledBeginDate) ? new Date(data.clientSchool.enrolledBeginDate) : null;
      data.clientSchool.enrolledEndDate = !isNullOrUndefined(data.clientSchool.enrolledEndDate) ? new Date(data.clientSchool.enrolledEndDate) : null;
      this.school = data.clientSchool; data.clientSchool;
      this.isEdit = true;
      this.schoolForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.clientSchool.changedBy) ? data.clientSchool.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.clientSchool.changedDate) ? moment(data.clientSchool.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.clientSchool.enteredBy) ? data.clientSchool.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.clientSchool.enteredDate) ? moment(data.clientSchool.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/attending-school/detail') {
      this.url = '/reports/attachment-document/rfc/attending-school';
    }

    return this._router.navigate([this.url])
  }

  onViewSchoolSelect() {
    this.isSchoolVisible = true;
  }

  discard = () => { return window.history.back() }

  onClickDiscardForm() {
    if (this.isAppHeader) {
      return this._router.navigate(['/reintegration/referral/opencard/attending-school/view']);
    } else {
      this.isForm = false;
      this.isEdit = false;
      this.isList = true;
    }
  }

  async getAttendingSchoolList() {
    let request = {
      referralID: parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey(),
      endPagination: 100,
      beginPagination: 1,
      sort: { "column": "clientSchoolID", "mode": "desc" }
    }
    let response = await this._opencard.listAllAttendingSchool(request);
    this.attendingSchoolList = response.clientSchool;
    return;
  }

  public onAddForm() {
    this.isList = false;
    this.school = new AttendingSchool();
    this.formValidation();
    this.isEdit = false;
    this.isForm = true;
    this.isAppHeader = false;
  }

  public onEditForm(event: any) {
    let request = { clientSchoolID: event.clientSchoolID };
    this.formValidation();
    this._opencard.getByRecAttendingSchool(request).then((data) => {
      this.isFooterDisable = false;
      if (data.clientSchool.schoolID) {
        this._client.storeId(data.clientSchool.schoolID.schoolID);
      }
      data.clientSchool.beginDate = !isNullOrUndefined(data.clientSchool.beginDate) ? new Date(data.clientSchool.beginDate) : null;
      data.clientSchool.endDate = !isNullOrUndefined(data.clientSchool.endDate) ? new Date(data.clientSchool.endDate) : null;
      data.clientSchool.enrolledBeginDate = !isNullOrUndefined(data.clientSchool.enrolledBeginDate) ? new Date(data.clientSchool.enrolledBeginDate) : null;
      data.clientSchool.enrolledEndDate = !isNullOrUndefined(data.clientSchool.enrolledEndDate) ? new Date(data.clientSchool.enrolledEndDate) : null;
      this.school = data.clientSchool; data.clientSchool;
      this.isEdit = true;
      this._localValues.medicationAllergiesDelelePRTF = true;
      this.isFooterDisable = true;
      this.schoolForm.disable();
      this.isForm = true;
      this.isList = false;
      this.isAppHeader = false;
    })
  }

  ngOnDestroy() {
    this._localValues.medicationAllergiesDelelePRTF = null;
  }

}
