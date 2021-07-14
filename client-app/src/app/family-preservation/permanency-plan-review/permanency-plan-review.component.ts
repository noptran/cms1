import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpPlanReview } from './fp-plan-review';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-permanency-plan-review',
  templateUrl: './permanency-plan-review.component.html',
  styleUrls: ['./permanency-plan-review.component.scss', '../family-preservation.scss'],
  outputs: ['permPlanRevOut']
})
export class PermanencyPlanReviewComponent implements OnInit {
  fpPermanencyPlan: FpPlanReview = new FpPlanReview();
  permanencyPlanForm: FormGroup;
  isPrint = true;
  editControll = true;

  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  permPlanRevOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
      this.permanencyPlanForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/case-plan-goals/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpPermanencyPlan = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.conferenceDate) ? formData.conferenceDate = new Date(formData.conferenceDate) : null;
    !isNullOrUndefined(formData.permanencyDate) ? formData.permanencyDate = new Date(formData.permanencyDate) : null;
    !isNullOrUndefined(formData.oohDate) ? formData.oohDate = new Date(formData.oohDate) : null;
    !isNullOrUndefined(formData.reviewReportDate) ? formData.reviewReportDate = new Date(formData.reviewReportDate) : null;
    !isNullOrUndefined(formData.parentDate) ? formData.parentDate = new Date(formData.parentDate) : null;
    !isNullOrUndefined(formData.personDate) ? formData.personDate = new Date(formData.personDate) : null;
    this.fpPermanencyPlan = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpPermanencyPlan.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.fpPermanencyPlan.conferenceDate = new Date();
        this.fpPermanencyPlan.permanencyDate = new Date();
        this.fpPermanencyPlan.oohDate = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpPermanencyPlan.factsCase = (data.referral.facts);
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
    !isNullOrUndefined(source.conferenceDate) ? source.conferenceDate = Date.parse(source.conferenceDate) : null;
    !isNullOrUndefined(source.permanencyDate) ? source.permanencyDate = Date.parse(source.permanencyDate) : null;
    !isNullOrUndefined(source.oohDate) ? source.oohDate = Date.parse(source.oohDate) : null;
    !isNullOrUndefined(source.reviewReportDate) ? source.reviewReportDate = Date.parse(source.reviewReportDate) : null;
    !isNullOrUndefined(source.parentDate) ? source.parentDate = Date.parse(source.parentDate) : null;
    !isNullOrUndefined(source.personDate) ? source.personDate = Date.parse(source.personDate) : null;

    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.permPlanRevOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.permPlanRevOut.emit({ cmsData: {} });
  }
  editForm() {
    this.permanencyPlanForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.permanencyPlanForm = this._fb.group({
      caseName: [null],
    page: [null],
    of: [null],
    factsCase: [null],
    conferenceDate: [null],
    permanencyDate: [null],
    oohDate: [null],
    narrative: [null],
    isMedicalReceived : [false],
    casePlanReview: [null],
    activities: [null],
    parentComments: [null],
    reviewReportDate: [null],
    signatureOfParent: [null],
    parentDate: [null],
    signatureOfPerson: [null],
    personDate: [null],
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
