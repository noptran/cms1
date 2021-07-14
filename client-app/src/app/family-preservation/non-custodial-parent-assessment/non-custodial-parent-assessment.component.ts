import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpNonCustodialAssessment } from './fp-non-custodial-assessment';
import html2pdf from 'html2pdf.js';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-non-custodial-parent-assessment',
  templateUrl: './non-custodial-parent-assessment.component.html',
  styleUrls: ['./non-custodial-parent-assessment.component.scss', '../family-preservation.scss'],
  outputs: ['nonCusOut']
})
export class NonCustodialParentAssessmentComponent implements OnInit {
  fpNonCustodialParentAssessment: FpNonCustodialAssessment = new FpNonCustodialAssessment();
  nonCustodialParentAssessmentForm: FormGroup;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  nonCusOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/assessment/detail') {
      this.getCmsFormJson();
      this.nonCustodialParentAssessmentForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/assessment/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpNonCustodialParentAssessment = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
    !isNullOrUndefined(formData.assessmentDate) ? formData.assessmentDate = new Date(formData.assessmentDate) : null;
    !isNullOrUndefined(formData.singaturedate) ? formData.singaturedate = new Date(formData.singaturedate) : null;
    this.fpNonCustodialParentAssessment = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpNonCustodialParentAssessment.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.fpNonCustodialParentAssessment.caseNumber = data.person.kaecses;
        this.fpNonCustodialParentAssessment.assessmentDate = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpNonCustodialParentAssessment.dateOfReferral = new Date(data.referral.referralDate);
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
    !isNullOrUndefined(source.singaturedate) ? source.singaturedate = Date.parse(source.singaturedate) : null;
    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.nonCusOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.nonCusOut.emit({ cmsData: {} });
  }
  editForm() {
    this.nonCustodialParentAssessmentForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.nonCustodialParentAssessmentForm = this._fb.group({
      caseName: [null],
      caseNumber: [null],
      dateOfReferral: [null],
      assessmentDate: [null],

      noncustodialParent: [null],
      listChild: [null],
      listChild1: [null],
      listChild2: [null],
      listChild3: [null],
      listChild4: [null],
      listOtherPeople: [null],
      allegedPerpetrator: [null],
      isAllegedPerpetratorYes: [false],
      isAllegedPerpetratorNo: [false],

      alcoholAbuse: [null],
      isAlcoholAbuseYes: [false],
      isAlcoholAbuseNo: [false],

      criminalHistory: [null],
      isCriminalHistoryYes: [false],
      isCriminalHistoryNo: [false],

      isVisitationYes: [false],
      isVisitationNo: [false],

      frequencyOfContact: [null],
      typeOfActivities: [null],

      isContactYes: [false],
      isContactNo: [false],

      kinshipFrequencyOfContact: [null],
      barriers: [null],

      isChildStays: [false],
      isBabySits: [false],
      isTakesChild: [false],
      isOther: [false],
      other: [null],

      disciplineTheChild: [null],

      isParentCommunicateYes: [false],
      isParentCommunicateNo: [false],
      typeOfInteraction: [null],

      isFinancialSupportYes: [false],
      isFinancialSupportNo: [false],

      isChildSupport: [false],
      isOccasionalChild: [false],
      isOccasionalGifts: [false],

      isParentInterestedYes: [false],
      isParentInterestedNo: [false],

      isSpecificRequirementsYes: [false],
      isSpecificRequirementsNo: [false],

      specificRequirementsExplain: [null],

      examplesOfWellBeing: [null],
      otherComments: [null],

      sfcsSignature: [null],

      singaturedate: [null],
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
