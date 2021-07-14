import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpPps } from './fp-pps';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';

@Component({
  selector: 'app-pps5002',
  templateUrl: './pps5002.component.html',
  styleUrls: ['./pps5002.component.scss', '../family-preservation.scss'],
  outputs: ['ppsOut']
})
export class Pps5002Component implements OnInit {
  fpPps: FpPps = new FpPps();
  ppsForm: FormGroup;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  ppsOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/fp-referral/detail') {
      this.getCmsFormJson();
      this.ppsForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/fp-referral/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpPps = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfRequest) ? formData.dateOfRequest = new Date(formData.dateOfRequest) : null;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
    !isNullOrUndefined(formData.electronicSignatureDate) ? formData.electronicSignatureDate = new Date(formData.electronicSignatureDate) : null;
    !isNullOrUndefined(formData.dateRequestReceived) ? formData.dateRequestReceived = new Date(formData.dateRequestReceived) : null;
    !isNullOrUndefined(formData.electronicSignatureDate1) ? formData.electronicSignatureDate1 = new Date(formData.electronicSignatureDate1) : null;
    !isNullOrUndefined(formData.dateOfDecision) ? formData.dateOfDecision = new Date(formData.dateOfDecision) : null;
    this.fpPps = formData;
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpPps.dateOfRequest = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);

      });
      this._team.getUserName()
      .then((data) => {
        console.log('data in this._team.getUserName() is', data);
        this.printedBy = data.users.firstName + ' ' + data.users.lastName;

      });
  }

  editForm() {
    this.ppsForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    console.log('source is', source, 'label is', event);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.dateOfRequest) ? source.dateOfRequest = Date.parse(source.dateOfRequest) : null;
    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    !isNullOrUndefined(source.electronicSignatureDate) ? source.electronicSignatureDate = Date.parse(source.electronicSignatureDate) : null;
    !isNullOrUndefined(source.dateRequestReceived) ? source.dateRequestReceived = Date.parse(source.dateRequestReceived) : null;
    !isNullOrUndefined(source.electronicSignatureDate1) ? source.electronicSignatureDate1 = Date.parse(source.electronicSignatureDate1) : null;
    !isNullOrUndefined(source.dateOfDecision) ? source.dateOfDecision = Date.parse(source.dateOfDecision) : null;
    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.ppsOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.ppsOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.ppsForm = this._fb.group({
      dateOfRequest: [null],
      requestMade: [null],
      managementProvider: [null],
      phoneNumber: [null],
      dcfRegion: [null],
      managementWorker: [null],
      contractSpecialist: [null],
      caseHeadName: [null],
      facts: [null],
      dateOfReferral: [null],
      namesOfChildren: [null],
      namesOfAdults: [null],
      reasonForReferral: [null],
      rationaleForRequest: [null],
      stepsTaken: [null],
      electronicSignature: [null],
      electronicSignatureDate: [null],
      dateRequestReceived: [null],

      isSpecialistAgreeYes : [false],
      isSpecialistAgreeNo : [false],
      additionalComments: [null],

      isRequestApprovedYes : [false],
      isRequestApprovedNo : [false],
      dateOfDecision: [null],
      electronicSignature1: [null],
      electronicSignatureDate1: [null],
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
