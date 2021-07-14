import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { CaseTeamService } from '../../case-team/case-team.service';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { HealthRecord } from './health-record';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../../local-values';
import * as _ from 'lodash';

@Component({
  selector: 'app-health-exam-prtf',
  templateUrl: './health-exam-prtf.component.html',
  styleUrls: ['./health-exam-prtf.component.scss'],
  inputs: ['isPopUpWindow'],

})
export class HealthExamPrtfComponent implements OnInit {
  @Input() isPopUpWindow = false;
  @Output() closeModel = new EventEmitter();

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

  isLoading = false;
  isListView = false;
  isFormView = false;

  tableRows: any;
  tableHeaders: any;
  healthExamID: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;


  constructor(public _fb: FormBuilder, public _opencard: OpencardsService, public _local: LocalValues, public _client: ClildFormService, public _router: Router) { }

  ngOnInit() {
    this.fetchListViewInfo();
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this.formValidation();
    if (this._router.url.includes('/prtf/referral/opencard/medical/health-exam/detail')) {
      this.isAttachmentRequired = true;
      this.getById();
    }
    this.getHealthRecordTypes();

  }


  formValidation() {
    this.healthForm = this._fb.group({
      clientID: [null],
      examDate: [null],
      followUpRequired: [null],
      healthExamTypeID: [null, Validators.compose([Validators.required])],
      nextExamDue: [null],
      notes: [null]
    })
  }

  formAction(source) {
    if (this.healthForm.valid) {
      source = this.nextExamDateValidations(source);
      source.examDate = this._local.stringFormatDatetime(Date.parse(source.examDate));
      source.nextExamDue = this._local.stringFormatDatetime(Date.parse(source.nextExamDue));
      !isNullOrUndefined(source.healthExamTypeID) ? source.healthExamTypeID = source.healthExamTypeID.healthExamTypeID : null;
      source.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
      // source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
      source.referralID = 55819;
      !isNullOrUndefined(source.healthExamID) ? this.update(source) : this.save(source);
    }
    else {
      swal('Warning', 'Please select Health Exam type', 'info')
    }

  }

  save(source: any) {
    this.isFormView = false;
    this.isLoading = true;
    this._opencard.saveHealthRecord(source).then((data) => {
      this.isLoading = false;
      swal('Save', 'Record has been saved!', 'success');
      this.health = new HealthRecord();
      this.isEdit = false;
      this.healthForm.enable();
      this.fetchListViewInfo();
    })
  }

  update(source: any) {
    this.isFormView = false;
    this.isLoading = true;
    this._opencard.updateHealthRecord(source).then((data) => {
      this.isLoading = false;
      swal('Upadate', 'Record has been updated!', 'success');
      this.health = new HealthRecord();
      this.isEdit = false;
      this.healthForm.enable();
      this.fetchListViewInfo();
    })
  }

  getById() {
    this.isListView = false;
    this.isLoading = true;
    this.req = { healthExamID: this.healthExamID }
    this._opencard.getByIdHealthRecord(this.req).then((data) => {
      this.isLoading = false;
      this.isFormView = true;
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
    if (currentURL == '/prtf/referral/opencard/medical/health-exam/detail') {
      navigateURL = '/reports/attachment-document/rfc/health-record';
    }
    else {
      navigateURL = '/reports/attachment-document/health-record';
    }
    return this._router.navigate([navigateURL])
  }

  discard() {
    this.health = new HealthRecord();
    this.isEdit = false;
    this.healthForm.enable();
    this.fetchListViewInfo();
    this.isFormView = false;
  }

  nextExamDateValidations(source) {
    let monthsToBeAdded = 0;
    switch (source.healthExamTypeID.healthExamTypeID) {
      case 2:
        monthsToBeAdded = 6;
        break;
      case 3:
        monthsToBeAdded = 12;
        break;
    }
    if (!source.nextExamDue && source.examDate) {
      let sourceCopy = _.cloneDeep(source)
      let date = sourceCopy.examDate;
      source.nextExamDue = new Date(date.setMonth(date.getMonth() + monthsToBeAdded));
    }
    return source;
  }

  fetchListViewInfo() {
    this.isLoading = true;
    let HRreferralId =
      parseInt(localStorage.getItem("referralId")) -
      this._opencard.getHasKey();
    let requestObject = {

      referralID: 55819,
      endPagination: 100,
      beginPagination: 1,
      sort: { column: 'healthExamID', mode: "desc" }
    };
    this._opencard.listAllHealthRecord(requestObject).then(data => {
      this.isLoading = false;
      this.tableRows = data.healthExam;
      this.tableHeaders = [
        {
          label: "Health Exam Type",
          key: "healthExamType"
        },
        {
          label: "Exam Completed Date",
          key: "examDate"
        },
        {
          label: "Next Due Date",
          key: "nextExamDue"
        }
      ];
      this.health = new HealthRecord();
      this.healthForm.enable();
      this.isEdit = false;
      this.isListView = true;

    });
  }

  createRecord() {
    this.health = new HealthRecord();
    this.isEdit = false;
    this.isFormView = true;
    this.isListView = false;
  }

  onRowSelected(rowData) {
    this.isAttachmentRequired = true;
    this.healthExamID = rowData['rowData'].healthExamID;
    this.getById();
  }



}
