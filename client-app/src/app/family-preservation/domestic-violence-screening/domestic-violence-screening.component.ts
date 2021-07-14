import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpDomesticViolence } from './fp-domestic-violence';
import html2pdf from 'html2pdf.js';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';

@Component({
  selector: 'app-domestic-violence-screening',
  templateUrl: './domestic-violence-screening.component.html',
  styleUrls: ['./domestic-violence-screening.component.scss', '../family-preservation.scss'],
  outputs: ['domVioOut']
})
export class DomesticViolenceScreeningComponent implements OnInit {
  fpDomesticViolence: FpDomesticViolence = new FpDomesticViolence();
  domesticViolenceForm: FormGroup;
  isPrint = true;
  editControll = true;

  printedBy: any;
  printedDate: any;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  domVioOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/assessment/detail') {
      this.getCmsFormJson();
      this.domesticViolenceForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/assessment/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpDomesticViolence = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.endDate) ? formData.endDate = new Date(formData.endDate) : null;
    this.fpDomesticViolence = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpDomesticViolence.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.fpDomesticViolence.caseNumber = data.person.kaecses;
        this.fpDomesticViolence.date = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpDomesticViolence.dateOfReferral = new Date(data.referral.referralDate);
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
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;

    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.domVioOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.domVioOut.emit({ cmsData: {} });
  }
  editForm() {
    this.domesticViolenceForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.domesticViolenceForm = this._fb.group({
      caseName: [null],
      caseNumber: [null],
      dateOfReferral: [null],
      date: [null],

      name: [null],
      safeContactInformation: [null],

      isPushedYes: [null],
      isPushedNo: [null],
      isKeptYouAwayYes: [null],
      isKeptYouAwayNo: [null],
      isPutYouDownYes: [null],
      isPutYouDownNo: [null],
      isKeptCheckYes: [null],
      isKeptCheckNo: [null],
      isThreatenedPetsYes: [null],
      isThreatenedPetsNo: [null],
      isThreatenedChildrenYes: [null],
      isThreatenedChildrenNo: [null],
      isWithheldFoodYes: [null],
      isWithheldFoodNo: [null],
      isCausedProblemsYes: [null],
      isCausedProblemsNo: [null],
      isHappeningCurrentlyYes: [null],
      isHappeningCurrentlyNo: [null],
      isAfraidYes: [null],
      isAfraidNo: [null],

      whoHurts: [null],

      isDangerYes: [null],
      isDangerNo: [null],
      isPfaYes: [null],
      isPfaNo: [null],
      isEmergencyShelterYes: [null],
      isEmergencyShelterNo: [null],

      signature: [null],
      endDate: [null],
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
