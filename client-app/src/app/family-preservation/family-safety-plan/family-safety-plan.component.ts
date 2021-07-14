import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { FpFamilySafety } from './fp-family-safety';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';

@Component({
  selector: 'app-family-safety-plan',
  templateUrl: './family-safety-plan.component.html',
  styleUrls: ['./family-safety-plan.component.scss', '../family-preservation.scss'],
  outputs: ['famSafOut']
})
export class FamilySafetyPlanComponent implements OnInit {
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _router: Router, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService) { }
  fpFamilySafety: FpFamilySafety = new FpFamilySafety();
  familySafetyForm: FormGroup;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;

  @Output()
  famSafOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/family-safety/detail') {
      this.getCmsFormJson();
      this.familySafetyForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/family-safety/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }

  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpFamilySafety = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.dateInitiated) ? formData.dateInitiated = new Date(formData.dateInitiated) : null;
    !isNullOrUndefined(formData.dateInitiated1) ? formData.dateInitiated1 = new Date(formData.dateInitiated1) : null;
    !isNullOrUndefined(formData.dateInitiated2) ? formData.dateInitiated2 = new Date(formData.dateInitiated2) : null;
    !isNullOrUndefined(formData.dateInitiated3) ? formData.dateInitiated3 = new Date(formData.dateInitiated3) : null;
    !isNullOrUndefined(formData.dateInitiated4) ? formData.dateInitiated4 = new Date(formData.dateInitiated4) : null;
    // !isNullOrUndefined(formData.caseDate) ? formData.caseDate = new Date(formData.caseDate) : null;
    !isNullOrUndefined(formData.targetDate) ? formData.targetDate = new Date(formData.targetDate) : null;
    !isNullOrUndefined(formData.targetDate1) ? formData.targetDate1 = new Date(formData.targetDate1) : null;
    !isNullOrUndefined(formData.targetDate2) ? formData.targetDate2 = new Date(formData.targetDate2) : null;
    !isNullOrUndefined(formData.targetDate3) ? formData.targetDate3 = new Date(formData.targetDate3) : null;
    // tslint:disable-next-line:max-line-length
    !isNullOrUndefined(formData.targetDate4) ? formData.targetDate4 = new Date(formData.targetDate4) : null;
    !isNullOrUndefined(formData.dateCompleted) ? formData.dateCompleted = new Date(formData.dateCompleted) : null;
    !isNullOrUndefined(formData.dateCompleted1) ? formData.dateCompleted1 = new Date(formData.dateCompleted1) : null;
    !isNullOrUndefined(formData.dateCompleted2) ? formData.dateCompleted2 = new Date(formData.dateCompleted2) : null;
    !isNullOrUndefined(formData.dateCompleted3) ? formData.dateCompleted3 = new Date(formData.dateCompleted3) : null;
    !isNullOrUndefined(formData.dateCompleted4) ? formData.dateCompleted4 = new Date(formData.dateCompleted4) : null;
    this.fpFamilySafety = formData;
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpFamilySafety.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.fpFamilySafety.caseNumber = data.person.kaecses;
        this.fpFamilySafety.date = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpFamilySafety.dateOfReferral = new Date(data.referral.referralDate);
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
    !isNullOrUndefined(source.dateInitiated) ? source.dateInitiated = Date.parse(source.dateInitiated) : null;
    !isNullOrUndefined(source.dateInitiated1) ? source.dateInitiated1 = Date.parse(source.dateInitiated1) : null;
    !isNullOrUndefined(source.dateInitiated2) ? source.dateInitiated2 = Date.parse(source.dateInitiated2) : null;
    !isNullOrUndefined(source.dateInitiated3) ? source.dateInitiated3 = Date.parse(source.dateInitiated3) : null;
    !isNullOrUndefined(source.dateInitiated4) ? source.dateInitiated4 = Date.parse(source.dateInitiated4) : null;
    // !isNullOrUndefined(source.caseDate) ? source.caseDate = Date.parse(source.caseDate) : null;
    !isNullOrUndefined(source.targetDate) ? source.targetDate = Date.parse(source.targetDate) : null;
    !isNullOrUndefined(source.targetDate1) ? source.targetDate1 = Date.parse(source.targetDate1) : null;
    !isNullOrUndefined(source.targetDate2) ? source.targetDate2 = Date.parse(source.targetDate2) : null;
    !isNullOrUndefined(source.targetDate3) ? source.targetDate3 = Date.parse(source.targetDate3) : null;
    // tslint:disable-next-line:max-line-length
    !isNullOrUndefined(source.targetDate4) ? source.targetDate4 = Date.parse(source.targetDate4) : null;
    !isNullOrUndefined(source.dateCompleted) ? source.dateCompleted = Date.parse(source.dateCompleted) : null;
    !isNullOrUndefined(source.dateCompleted1) ? source.dateCompleted1 = Date.parse(source.dateCompleted1) : null;
    !isNullOrUndefined(source.dateCompleted2) ? source.dateCompleted2 = Date.parse(source.dateCompleted2) : null;
    !isNullOrUndefined(source.dateCompleted3) ? source.dateCompleted3 = Date.parse(source.dateCompleted3) : null;
    !isNullOrUndefined(source.dateCompleted4) ? source.dateCompleted4 = Date.parse(source.dateCompleted4) : null;
    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.famSafOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/family-safety"]);
  }
  discardForm() {
    this.famSafOut.emit({ cmsData: {} });
  }
  editForm() {
    this.familySafetyForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.familySafetyForm = this._fb.group({
      caseName: [null],
      caseNumber: [null],
      dateOfReferral: [null],
      date: [null],

      safetyConcerns: [null],
      objective: [null],

      immediateAction: [null],
      immediateAction1: [null],
      immediateAction2: [null],
      immediateAction3: [null],
      immediateAction4: [null],

      personResponsible: [null],
      personResponsible1: [null],
      personResponsible2: [null],
      personResponsible3: [null],
      personResponsible4: [null],

      dateInitiated: [null],
      dateInitiated1: [null],
      dateInitiated2: [null],
      dateInitiated3: [null],
      dateInitiated4: [null],

      targetDate: [null],
      targetDate1: [null],
      targetDate2: [null],
      targetDate3: [null],
      targetDate4: [null],

      dateCompleted: [null],
      dateCompleted1: [null],
      dateCompleted2: [null],
      dateCompleted3: [null],
      dateCompleted4: [null],

      expectedChange: [null],
      expectedChange1: [null],
      expectedChange2: [null],
      expectedChange3: [null],
      expectedChange4: [null],

      consequences: [null],

      type: [null],
      type1: [null],

      contactPerson: [null],
      contactPerson1: [null],

      phoneNumber: [null],
      phoneNumber1: [null],

      signatures: [null],
      signatures1: [null],
      signatures2: [null],
      signatures3: [null],
      signatures4: [null],
      signatures5: [null],
      printedBy: [null],
      printedDate: [null],

    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.jsPdfOrientation = 'landscape';
    this._printPdf.printForm();
  }

}
