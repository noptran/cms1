import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpNonCustodialIced } from './fp-non-custodial-iced';
import html2pdf from 'html2pdf.js';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-non-custodial-parent-iced-worksheet',
  templateUrl: './non-custodial-parent-iced-worksheet.component.html',
  styleUrls: ['./non-custodial-parent-iced-worksheet.component.scss', '../family-preservation.scss'],
  outputs: ['nonCusIcedOut']
})
export class NonCustodialParentIcedWorksheetComponent implements OnInit {
  fpNonCustodialParentIced: FpNonCustodialIced = new FpNonCustodialIced();
  nonCustodialParentIcedForm: FormGroup;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  nonCusIcedOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/assessment/detail') {
      this.getCmsFormJson();
      this.nonCustodialParentIcedForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/assessment/new') {
      this.getCmsFormJson();
      this.nonCustodialParentIcedForm.disable();
    }
    this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpNonCustodialParentIced = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
    !isNullOrUndefined(formData.assessmentDate) ? formData.assessmentDate = new Date(formData.assessmentDate) : null;
    !isNullOrUndefined(formData.dateOfCall) ? formData.dateOfCall = new Date(formData.dateOfCall) : null;
    !isNullOrUndefined(formData.dateOfFollow) ? formData.dateOfFollow = new Date(formData.dateOfFollow) : null;
    !isNullOrUndefined(formData.dateOfFaceToFace) ? formData.dateOfFaceToFace = new Date(formData.dateOfFaceToFace) : null;
    !isNullOrUndefined(formData.dateOfLetterSent) ? formData.dateOfLetterSent = new Date(formData.dateOfLetterSent) : null;
    !isNullOrUndefined(formData.dateNoncustodial) ? formData.dateNoncustodial = new Date(formData.dateNoncustodial) : null;
    !isNullOrUndefined(formData.signatureDate) ? formData.signatureDate = new Date(formData.signatureDate) : null;
    this.fpNonCustodialParentIced = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpNonCustodialParentIced.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.fpNonCustodialParentIced.caseNumber = data.person.kaecses;
        this.fpNonCustodialParentIced.assessmentDate = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpNonCustodialParentIced.dateOfReferral = new Date(data.referral.referralDate);
      });
      this._team.getUserName()
      .then((data) => {
        console.log('data in this._team.getUserName() is', data);
        this.printedBy = data.users.firstName + ' ' + data.users.lastName;

      });
  }

  saveForm(event, source) {
    console.log('source is', source, 'label is', event);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    !isNullOrUndefined(source.assessmentDate) ? source.assessmentDate = Date.parse(source.assessmentDate) : null;
    !isNullOrUndefined(source.dateOfCall) ? source.dateOfCall = Date.parse(source.dateOfCall) : null;
    !isNullOrUndefined(source.dateOfFollow) ? source.dateOfFollow = Date.parse(source.dateOfFollow) : null;
    !isNullOrUndefined(source.dateOfFaceToFace) ? source.dateOfFaceToFace = Date.parse(source.dateOfFaceToFace) : null;
    !isNullOrUndefined(source.dateOfLetterSent) ? source.dateOfLetterSent = Date.parse(source.dateOfLetterSent) : null;
    !isNullOrUndefined(source.dateNoncustodial) ? source.dateNoncustodial = Date.parse(source.dateNoncustodial) : null;
    !isNullOrUndefined(source.signatureDate) ? source.signatureDate = Date.parse(source.signatureDate) : null;

    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.nonCusIcedOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.nonCusIcedOut.emit({ cmsData: {} });
  }
  editForm() {
    this.nonCustodialParentIcedForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.nonCustodialParentIcedForm = this._fb.group({
      caseName: [null],
      caseNumber: [null],
      dateOfReferral: [null],
      assessmentDate: [null],

      parentName: [null],
      child: [null],
      parentName1: [null],
      child1: [null],
      custodialParent: [null],
      reasonsWhy: [null],
      therapeuticAssessment: [null],
      dcfAssessment: [null],
      contactingNoncustodial: [null],
      dcfAssessment1: [null],
      yesDocument: [null],
      noDocument: [null],
      dateStaffContacted: [null],
      resultsOfContact: [null],
      isChildSupportNo: [false],
      kansasChildSupport: [null],
      dateStaffDcf: [null],
      resultsOfContact1: [null],

      nullLink: [null],
      zabasearch: [null],
      veromi: [null],
      pipl: [null],

      switchboard: [null],
      peoplesearch: [null],
      usaPeopleSearch: [null],

      google: [null],
      findpeoplesearch: [null],

      spokeo: [null],
      yahoo: [null],

      truepeoplesearch: [null],
      spokeo1: [null],
      whitepages: [null],
      anywhoWhitepages: [null],

      completeWebSearch: [null],
      kasper: [null],
      vinelink: [null],

      dateOfCall: [null],

      outcomeOfCall: [null],
      isNoncustodialYes: [false],
      isNoncustodialNo: [false],
      noWhy: [null],
      dateOfFollow: [null],
      outcomeOfCall1: [null],
      dateOfFaceToFace: [null],

      outcomeOfMeeting: [null],
      dateOfLetterSent: [null],
      outcomeOfMeeting1: [null],
      dateNoncustodial: [null],
      informNoncustodial: [null],
      isNoncustodialParticipateYes: [false],
      isNoncustodialParticipateNo: [false],
      noReason: [null],

      isProvideInput: [false],
      isReviewCase: [false],
      isAttendCase: [false],
      isByPhone: [false],
      isAttendCasePlan: [false],
      isInPerson: [false],
      caseActivityReflect: [null],
      identifyServices: [null],
      frequencyOfServices: [null],
      isVisitsYes: [false],
      isVisitsNo: [false],
      moveToDocumentReason: [null],
      completedBy: [null],
      signatureDate: [null],
      printedBy: [null],
      printedDate: [null],
    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }



}
