import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { FpCaseTransfer } from './fp-case-transfer';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-case-transfer-summary',
  templateUrl: './case-transfer-summary.component.html',
  styleUrls: ['./case-transfer-summary.component.scss', '../family-preservation.scss'],
  outputs: ['caseOut']
})
export class CaseTransferSummaryComponent implements OnInit {
  fpCaseTransfer: FpCaseTransfer = new FpCaseTransfer();
  caseTransferForm: FormGroup;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  caseOut = new EventEmitter();

  ngOnInit() {
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-activity/detail') {
      this.getCmsFormJson();
      this.caseTransferForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/case-activity/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }

  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpCaseTransfer = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.dateTime) ? formData.dateTime = new Date(formData.dateTime) : null;
    !isNullOrUndefined(formData.dateTime1) ? formData.dateTime1 = new Date(formData.dateTime1) : null;
    !isNullOrUndefined(formData.dateTime2) ? formData.dateTime2 = new Date(formData.dateTime2) : null;
    !isNullOrUndefined(formData.dateTime3) ? formData.dateTime3 = new Date(formData.dateTime3) : null;

    !isNullOrUndefined(formData.transferringSupervisorSignatureDate) ? formData.transferringSupervisorSignatureDate = new Date(formData.transferringSupervisorSignatureDate) : null;
    !isNullOrUndefined(formData.receivingSupervisorSignatureDate) ? formData.receivingSupervisorSignatureDate = new Date(formData.receivingSupervisorSignatureDate) : null;
    this.fpCaseTransfer = formData;

  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpCaseTransfer.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.fpCaseTransfer.factsCaseNumber = data.person.kaecses;
        this.fpCaseTransfer.date = new Date();
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

  saveForm( source) {
    console.log('source is', source);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';

    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.dateTime) ? source.dateTime = Date.parse(source.dateTime) : null;
    !isNullOrUndefined(source.dateTime1) ? source.dateTime1 = Date.parse(source.dateTime1) : null;
    !isNullOrUndefined(source.dateTime2) ? source.dateTime2 = Date.parse(source.dateTime2) : null;
    !isNullOrUndefined(source.dateTime3) ? source.dateTime3 = Date.parse(source.dateTime3) : null;

    !isNullOrUndefined(source.transferringSupervisorSignatureDate) ? source.transferringSupervisorSignatureDate = Date.parse(source.transferringSupervisorSignatureDate) : null;
    !isNullOrUndefined(source.receivingSupervisorSignatureDate) ? source.receivingSupervisorSignatureDate = Date.parse(source.receivingSupervisorSignatureDate) : null;


    console.log('date is', source.date);
    this.caseOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.caseOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.caseTransferForm = this._fb.group({

      caseName: [null],
      date: [null],
      factsCaseNumber: [null],

      dateTime: [null],
      fullName: [null],
      position: [null],
      relationship: [null],

      dateTime1: [null],
      fullName1: [null],
      position1: [null],
      relationship1: [null],

      dateTime2: [null],
      fullName2: [null],
      position2: [null],
      relationship2: [null],

      dateTime3: [null],
      fullName3: [null],
      position3: [null],
      relationship3: [null],

      currentService: [null],
      newLevel: [null],

      isNewWorker : [false],
      isNewSupervisor : [false],
      isFamilyMoved : [false],
      isChangeOfVenue : [false],
      isOther : [false],

      other: [null],

      rferral: [null],
      reviewOfCasePlan: [null],
      decisions: [null],
      generalFamilyInformation: [null],
      nonCustodialParent: [null],
      childrenSConnections: [null],
      decisions1: [null],
      safetyConcerns: [null],
      decisionsNextSteps: [null],
      riskConcernsIdentified: [null],
      decisionsNextSteps1: [null],
      icwa: [null],
      decisionsNextSteps2: [null],

      isReferralYes : [false],
      isReferralNo : [false],

      otherExplain: [null],
      decisionsNextSteps3: [null],

      transferringSupervisorSignature: [null],
      transferringSupervisorSignatureDate: [null],

      receivingSupervisorSignature: [null],
      receivingSupervisorSignatureDate: [null],
      printedBy: [null],
      printedDate: [null],


    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

  editForm() {
    this.caseTransferForm.enable();
    this.editControll = false;
  }
}
