import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Health } from './health';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ClildFormService } from '../child-forms/child-forms.service';
import {LocalValues} from '../local-values';

@Component({
  selector: 'app-health-bhok',
  templateUrl: './health-bhok.component.html',
  styleUrls: ['./health-bhok.component.scss']
})
export class HealthBhokComponent implements OnInit {
  breadcrumbs = [];
  healthForm: FormGroup;
  isEdit = false;
  discardTo = '/reintegration/referral/opencard/health/bhok/view';
  health: Health = new Health();
  healthRecordTypes = [];
  metaData = [];
  referralTypeId: number;
  req: any;

  constructor(public _client: ClildFormService, public _router: Router, public _opencard: OpencardsService, public _fb: FormBuilder, public _localValues: LocalValues) { }

  ngOnInit() {
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/bh-ok/detail", active: '' },
      { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
      { label: 'Health Record List', active: '', href: '/reintegration/referral/opencard/health/bhok/view' },
      { label: 'Health Record', active: 'active' }
    );
    if (this._router.url == '/reintegration/referral/opencard/health/bhok/detail') {
      this.getById();
    }
    if (this.referralTypeId === 17) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('healthRecord-JJFC', this.breadcrumbs)
    }
    this.getHealthRecordTypes();

  }

  formValidation() {
    this.healthForm = this._fb.group({
      "enterBy": [null],
      "clientID": [null],
      "examDate": [null],
      "followUpRequired": [null],
      "healthExamTypeID": [null],
      "notes": [null],
      "referralID": [null],
      "healthExamID": [null],
      "nextExamDue": [null]
    })
  }

  editForm() {
    this.isEdit = false;
    this.healthForm.enable();
  }

  formAction(source) {
    source.examDate = this._localValues.stringFormatDatetime(Date.parse(source.examDate));
    source.nextExamDue = this._localValues.stringFormatDatetime(Date.parse(source.nextExamDue));
    (source.healthExamTypeID) ? source.healthExamTypeID = source.healthExamTypeID.healthExamTypeID : null;
    source.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    (source.healthExamID) ? this.update(source) : this.save(source);
  }

  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveHealthRecord(source).then((data) => {
      loader.style.display = 'none';
      swal('Save', 'Record has been saved!', 'success');
      return this._router.navigate(['/reintegration/referral/opencard/health/bhok/view'])
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateHealthRecord(source).then((data) => {
      loader.style.display = 'none';
      swal('Upadate', 'Record has been updated!', 'success');
      return this._router.navigate(['/reintegration/referral/opencard/health/bhok/view'])
    })
  }

  getById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { healthExamID: this._client.getId() }
    this._opencard.getByIdHealthRecord(this.req).then((data) => {
      loader.style.display = 'none';
      if (data.healthExam.isActive) {
        (data.healthExam.examDate) ? data.healthExam.examDate = moment(data.healthExam.examDate).format('MM/DD/YYYY HH:mm') : null;
        (data.healthExam.nextExamDue) ? data.healthExam.nextExamDue = moment(data.healthExam.nextExamDue).format('MM/DD/YYYY HH:mm') : null;
      } else {
        (data.healthExam.examDate) ? data.healthExam.examDate = moment.utc(data.healthExam.examDate).format('MM/DD/YYYY HH:mm') : null;
        (data.healthExam.nextExamDue) ? data.healthExam.nextExamDue = moment.utc(data.healthExam.nextExamDue).format('MM/DD/YYYY HH:mm') : null;
      }

      this.health = data.healthExam;
      this.isEdit = true;
      this.healthForm.disable();
    })
  }

  getHealthRecordTypes() {
    this.healthRecordTypes = []
    let req = { referralTypeID: 1 }
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

  discard = () => { return window.history.back() }


}
