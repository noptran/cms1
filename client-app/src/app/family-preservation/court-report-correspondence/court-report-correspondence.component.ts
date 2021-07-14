import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpCourtReport } from './fp-court-report';
import html2pdf from 'html2pdf.js';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-court-report-correspondence',
  templateUrl: './court-report-correspondence.component.html',
  styleUrls: ['./court-report-correspondence.component.scss', '../family-preservation.scss'],
  outputs: ['courtRepCorrOut']
})
export class CourtReportCorrespondenceComponent implements OnInit {
  fpCourtReport: FpCourtReport = new FpCourtReport();
  courtReportForm: FormGroup;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  courtRepCorrOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/court-orders/detail') {
      this.getCmsFormJson();
      this.courtReportForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/court-orders/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpCourtReport = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfBirth) ? formData.dateOfBirth = new Date(formData.dateOfBirth) : null;
    !isNullOrUndefined(formData.dateOfReport) ? formData.dateOfReport = new Date(formData.dateOfReport) : null;
    !isNullOrUndefined(formData.dateOfHearing) ? formData.dateOfHearing = new Date(formData.dateOfHearing) : null;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
    // !isNullOrUndefined(formData.dateOfDelivery) ? formData.dateOfDelivery = new Date(formData.dateOfDelivery) : null;
    this.fpCourtReport = formData;
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpCourtReport.children = data.person.firstName + ' ' + data.person.lastName;
        this.fpCourtReport.dateOfBirth = new Date(data.person.dob);
        this.fpCourtReport.dateOfReport = new Date();
        this.fpCourtReport.dateOfHearing = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();

      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpCourtReport.dateOfReferral = new Date(data.referral.referralDate);

      });
      this._team.getUserName()
      .then((data) => {
        console.log('data in this._team.getUserName() is', data);
        this.printedBy = data.users.firstName + ' ' + data.users.lastName;

      });
  }

  saveForm( source) {
    console.log('source is', source);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.dateOfBirth) ? source.dateOfBirth = Date.parse(source.dateOfBirth) : null;
    !isNullOrUndefined(source.dateOfReport) ? source.dateOfReport = Date.parse(source.dateOfReport) : null;
    !isNullOrUndefined(source.dateOfHearing) ? source.dateOfHearing = Date.parse(source.dateOfHearing) : null;
    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    // !isNullOrUndefined(source.dateOfDelivery) ? source.dateOfDelivery = Date.parse(source.dateOfDelivery) : null;

    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.courtRepCorrOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.courtRepCorrOut.emit({ cmsData: {} });
  }
  editForm() {
    this.courtReportForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.courtReportForm = this._fb.group({
      children: [null],
      dateOfBirth: [null],
      dateOfReport: [null],
      dateOfHearing: [null],
      dateOfReferral: [null],
      gal: [null],
      mother: [null],
      attorneyForMother: [null],
      motherCurrentAddress: [null],
      father: [null],
      attorneyForFather: [null],
      fatherCurrentAddress: [null],
      periodCoveredByReport: [null],
      periodCoveredByReportto: [null],
      therapist: [null],
      phone: [null],
      courtReport: [null],
      progressSummary: [null],
      other: [null],
      deliveredTo: [null],
      // dateOfDelivery: [null],

      isJudge : [false],
      isGal : [false],
      isMotherAttorney : [false],
      isFatherAttorney : [false],
      isCountyAttorney : [false],
      isOtherAttorney : [false],
      isOther : [false],
      isCasa : [false],

      judgeDate: [null],
      galDate: [null],
      motherAttorneyDate: [null],
      fatherAttorneyDate: [null],
      countyAttorneyDate: [null],
      otherAttorneyDate: [null],
      otherDate: [null],
      casaDate: [null],
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
