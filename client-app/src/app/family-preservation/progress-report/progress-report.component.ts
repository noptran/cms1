import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProgressReport } from './progress-report';
import { isNullOrUndefined } from 'util';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
import * as moment from 'moment';


@Component({
  selector: 'app-progress-report',
  templateUrl: './progress-report.component.html',
  inputs: ['prFormIn'],
  outputs: ['prFormOut', 'prFormOutInitial'],
  styleUrls: ['./progress-report.component.scss', '../family-preservation.scss']
})
export class ProgressReportComponent implements OnInit {
  progressReport: ProgressReport = new ProgressReport();
  isEdit = false;
  isPrint = true;
  progressReportForm: FormGroup;
  editControll = true;
  printedBy: any;
  printedDate: any;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: '',
  };
  isFormLog = false;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _router: Router, public _opencard: OpencardsService, public _client: ClildFormService, public _referral: ReferralViewService) { }
  @Input()
  prFormIn: any;
  @Output()
  prFormOut = new EventEmitter();
  prFormOutInitial = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/assessment/detail') {
      this.getCmsFormJson();
      this.progressReportForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/assessment/new') {
      this.editControll = false;
    }
    console.log(this._router.url);
    if (this._router.url == '/reports/referral/family-preservation/assessment/detail') {
       this.getDetail();
    }
    // this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.progressReport = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined (formData.referralDate) ? formData.referralDate = new Date(formData.referralDate) : null;
    !isNullOrUndefined (formData.signatureDate) ? formData.signatureDate = new Date(formData.signatureDate) : null;
    !isNullOrUndefined (formData.initialDate) ? formData.initialDate = new Date(formData.initialDate) : null;
    !isNullOrUndefined (formData.reportPeriodFrom) ? formData.reportPeriodFrom = new Date(formData.reportPeriodFrom) : null;
    !isNullOrUndefined (formData.reportPeriodTo) ? formData.reportPeriodTo = new Date(formData.reportPeriodTo) : null;
    !isNullOrUndefined (formData.expiresOn) ? formData.expiresOn = new Date(formData.expiresOn) : null;
    !isNullOrUndefined (formData.casePlanDevelopedOn) ? formData.casePlanDevelopedOn = new Date(formData.casePlanDevelopedOn) : null;
    this.progressReport = formData;
  }
  /***
   * @param source - progress report objects
   *
   */

  autoFetchDetails() {
    const data = this._client.getPersonData();
        console.log('data in this._client.getByPersonData() is', data);
        this.progressReport.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.progressReport.caseNumber = data.person.kaecses;
        this.progressReport.initialDate = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.progressReport.referralDate = new Date(data.referral.referralDate);
      });
      this._team.getUserName()
      .then((data) => {
        console.log('data in this._team.getUserName() is', data);
        this.printedBy = data.users.firstName + ' ' + data.users.lastName;

      });
  }

  saveForm(source) {
    !isNullOrUndefined (source.referralDate) ? source.referralDate = Date.parse(source.referralDate) : null;
    !isNullOrUndefined (source.signatureDate) ? source.signatureDate = Date.parse(source.signatureDate) : null;
    !isNullOrUndefined (source.initialDate) ? source.initialDate = Date.parse(source.initialDate) : null;
    !isNullOrUndefined (source.reportPeriodFrom) ? source.reportPeriodFrom = Date.parse(source.reportPeriodFrom) : null;
    !isNullOrUndefined (source.reportPeriodTo) ? source.reportPeriodTo = Date.parse(source.reportPeriodTo) : null;
    !isNullOrUndefined (source.expiresOn) ? source.expiresOn = Date.parse(source.expiresOn) : null;
    !isNullOrUndefined (source.casePlanDevelopedOn) ? source.casePlanDevelopedOn = Date.parse(source.casePlanDevelopedOn) : null;
    source.typeOfDod = 'progressReport';
    this.progressReport = source;
    this.prFormOut.emit({ cmsData: source });
    this.prFormOutInitial.emit({ prForm: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.prFormOut.emit({ cmsData: {} });
  }
  // resetForm(event) { }
  // discardForm(event) { }


  /**
   * Get existing form details
   */
  getExistingDetail() {
   this.prFormIn = new Date (this.prFormIn.date);
   this.progressReport = this.prFormIn;
  }



  formValidation() {
    console.log('progressReportForm called');
    this.progressReportForm = this._fb.group({
      'caseName': [null],
      'caseNumber': [null],
      'referralDate': [null],
      'initialDate': [null],
      'is90Day' : [null],
      'is180Day' : [null],
      'is270Day' : [null],
      'is365Day' : [null],
      'isOtherDay' : [null],
      'parentOrCaregivers_1': [null],
      'parentOrCaregivers_2': [null],
      'parentOrCaregivers_3': [null],
      'parentOrCaregivers_4': [null],
      'childeren_1': [null],
      'childeren_2': [null],
      'childeren_3': [null],
      'childeren_4': [null],
      'childeren_5': [null],
      'childeren_6': [null],
      'isGoalsMet': [null],
      'isMovedOut' : [null],
      'isCustody': [null],
      'isfamilyRefusedService': [null],
      'ischildRemovedFromHome': [null],
      'isEndOfReferralYear': [null],
      'isYesAssessment': [null],
      'isNoAssessment' : [null],
      'casePlanActitvites': [null],
      'courtOrders': [null],
      'FSW': [null],
      'servicesToNonCustodial': [null],
      'dischargeSummary': [null],
      'signatureDate': [null],
      'reportPeriodFrom': [null],
      'reportPeriodFTo' : [null],
      'casePlanDevelopedOn': [null],
      'expiresOn': [null],
      'initialReferralReason': [null],
      'signature': [null],
      'reportPeriodTo': [null],
      printedBy: [null],
      printedDate: [null],
    });
  }


  editForm() {
    this.progressReportForm.enable();
    this.editControll = false;
  }

  getDetail() {
    if (this.prFormIn) {
      let formData;
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      const assessmentId = parseInt(localStorage.getItem('asssessmentId')) ;
      const req = { assessmentID: assessmentId };
      if (assessmentId) {
        this._opencard.getAssessmentRec(req).then((data) => {
          formData = !isNullOrUndefined(data.pdfForms)  ? data.pdfForms.pdfForms : null;
          loader.style.display = 'none';
          !isNullOrUndefined (formData.referralDate) ? formData.referralDate = new Date(formData.referralDate) : null;
          !isNullOrUndefined (formData.signatureDate) ? formData.signatureDate = new Date(formData.signatureDate) : null;
          !isNullOrUndefined (formData.initialDate) ? formData.initialDate = new Date(formData.initialDate) : null;
          !isNullOrUndefined (formData.reportPeriodFrom) ? formData.reportPeriodFrom = new Date(formData.reportPeriodFrom) : null;
          !isNullOrUndefined (formData.reportPeriodTo) ? formData.reportPeriodTo = new Date(formData.reportPeriodTo) : null;
          !isNullOrUndefined (formData.expiresOn) ? formData.expiresOn = new Date(formData.expiresOn) : null;
          !isNullOrUndefined (formData.casePlanDevelopedOn) ? formData.casePlanDevelopedOn = new Date(formData.casePlanDevelopedOn) : null;
          this.progressReport = formData;
          this.isEdit = true;
          this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(formData.changedBy) ? formData.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(formData.changedDate) ? moment(formData.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(formData.enteredBy) ? formData.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(formData.enteredDate) ? moment(formData.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

          // this.isPrint = true;
          this.progressReportForm.disable();
        });
       }
   }
  }

  resetForm() { }



  // printForm() {
  //   window.print();
  // }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
