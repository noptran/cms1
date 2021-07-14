import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { HealthRecord } from './health-record';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../local-values';


@Component({
  selector: 'app-health-record',
  templateUrl: './health-record.component.html',
  styleUrls: ['./health-record.component.scss']
})
export class HealthRecordComponent implements OnInit {
  healthForm: FormGroup;
  isEdit = false;
  metaData = [];
  quickMenu = "referrel";
  breadcrumbs = [];
  health: HealthRecord = new HealthRecord();
  healthRecordTypes = [];
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

  constructor(public _fb: FormBuilder, public _opencard: OpencardsService, public _local: LocalValues, public _client: ClildFormService, public _router: Router) { }

  ngOnInit() {
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this.formValidation();
    if (this._router.url == '/reintegration/referral/opencard/health-record/detail') {
      this.isAttachmentRequired = true;
      this.getById();
    }
    this.getHealthRecordTypes();
    this.breadcrumbs.push(
      this.breadcrumbs.push(
        { label: 'List', href: "/reports/client", active: '' },
        { label: 'Form', href: "/reports/client/details", active: '' },
        { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
        { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
        { label: 'Health Record List', active: '', href: '/reintegration/referral/opencard/health-record/view' },
        { label: 'Health Record', active: 'active' }
      )
    )

    if (this.referralTypeId === 17) {
      this.breadcrumbs = this._local.breadcrumbsChanges('healthRecord-JJFC', this.breadcrumbs)
    }
    if (this.referralTypeId === 4) {
      this.breadcrumbs = this._local.breadcrumbsChanges('healthRecord-NCFCH', this.breadcrumbs)
    }
  }

  formValidation() {
    this.healthForm = this._fb.group({
      clientID: [null],
      examDate: [null],
      followUpRequired: [null],
      healthExamTypeID: [null],
      nextExamDue: [null],
      notes: [null]
    })
  }

  formAction(source) {
    source.examDate = this._local.stringFormatDatetime(Date.parse(source.examDate));
    source.nextExamDue = this._local.stringFormatDatetime(Date.parse(source.nextExamDue));
    !isNullOrUndefined(source.healthExamTypeID) ? source.healthExamTypeID = source.healthExamTypeID.healthExamTypeID : null;
    source.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    !isNullOrUndefined(source.healthExamID) ? this.update(source) : this.save(source);
  }

  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveHealthRecord(source).then((data) => {
      loader.style.display = 'none';
      swal('Save', 'Record has been saved!', 'success');
      return this._router.navigate(['/reintegration/referral/opencard/health-record/view'])
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateHealthRecord(source).then((data) => {
      loader.style.display = 'none';
      swal('Upadate', 'Record has been updated!', 'success');
      return this._router.navigate(['/reintegration/referral/opencard/health-record/view'])
    })
  }

  getById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { healthExamID: this._client.getId() }
    this._opencard.getByIdHealthRecord(this.req).then((data) => {
      loader.style.display = 'none';
      if (data.healthExam.isActive) {
        !isNullOrUndefined(data.healthExam.examDate) ? data.healthExam.examDate = moment(data.healthExam.examDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.healthExam.nextExamDue) ? data.healthExam.nextExamDue = moment(data.healthExam.nextExamDue).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.healthExam.examDate) ? data.healthExam.examDate = moment.utc(data.healthExam.examDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.healthExam.nextExamDue) ? data.healthExam.nextExamDue = moment.utc(data.healthExam.nextExamDue).format('MM/DD/YYYY HH:mm') : null;
      }

      this.health = data.healthExam;
      this.isEdit = true;
      this.healthForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.healthExam.changedBy) ? data.healthExam.changedBy : '------';
    this.formLogInfo.changedDate = !isNullOrUndefined(data.healthExam.changedDate) ? moment(data.healthExam.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
    this.formLogInfo.enteredBy = !isNullOrUndefined(data.healthExam.enteredBy) ? data.healthExam.enteredBy : '------';
    this.formLogInfo.enteredDate = !isNullOrUndefined(data.healthExam.enteredDate) ? moment(data.healthExam.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.isEdit = false;
    this.healthForm.enable();
  }

  getHealthRecordTypes() {
    this.healthRecordTypes = []
    let req = { referralTypeID: parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey() }
    this._opencard.getHealthRecordType(req).then((data) => {
      this.healthRecordTypes = data.healthExamType;
    })
  }

  filteredHealthRecords(event: any) {
    this.metaData = [];
    this.healthRecordTypes.filter((item) => {
      if (item.healthExamType.toLowerCase().indexOf(event.query) !== -1) {
        this.metaData.push(item)
      }
    })
  }

  navigateToCMS() {
    let currentURL = this._router.url, navigateURL: any;
    if (currentURL == '/reintegration/referral/opencard/health-record/detail') {
      navigateURL = '/reports/attachment-document/rfc/health-record';
    }
    else {
      navigateURL = '/reports/attachment-document/health-record';
    }
    return this._router.navigate([navigateURL])
  }

  discard = () => { return window.history.back() }


}
