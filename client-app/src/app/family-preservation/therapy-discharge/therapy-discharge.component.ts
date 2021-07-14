import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpTherapyDischarge } from './fp-therapy-discharge';
import html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-therapy-discharge',
  templateUrl: './therapy-discharge.component.html',
  styleUrls: ['./therapy-discharge.component.scss', '../family-preservation.scss'],
  outputs: ['therDiscOut']
})
export class TherapyDischargeComponent implements OnInit {
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }
  fpTherapyDischarge: FpTherapyDischarge = new FpTherapyDischarge();
  therapyDischargeForm: FormGroup;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;
  @Output()
  therDiscOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/referral-events/detail') {
      this.getCmsFormJson();
      this.therapyDischargeForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/assessment/detail') {
      this.getCmsFormJson();
      this.therapyDischargeForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/referral-events/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/attachment-document/assessment/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpTherapyDischarge = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dischargeDate) ? formData.dischargeDate = new Date(formData.dischargeDate) : null;
    !isNullOrUndefined(formData.signatureDate) ? formData.signatureDate = new Date(formData.signatureDate) : null;
    this.fpTherapyDischarge = formData;
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpTherapyDischarge.name = data.person.firstName + ' ' + data.person.lastName;
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

  saveForm(event, source) {
    console.log('source is', source, 'label is', event);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';

    !isNullOrUndefined(source.dischargeDate) ? source.dischargeDate = Date.parse(source.dischargeDate) : null;
    !isNullOrUndefined(source.signatureDate) ? source.signatureDate = Date.parse(source.signatureDate) : null;
    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.therDiscOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.therDiscOut.emit({ cmsData: {} });
  }
  editForm() {
    this.therapyDischargeForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.therapyDischargeForm = this._fb.group({
      name: [null],
      recordNumber: [null],
      dischargeDate: [null],
      treatmentPeriod: [null],
      numberOfSessions: [null],
      problemArea: [null],

      isEvaluationCompleted : [false],
      isTreatmentCompleted : [false],
      isMemberMoved : [false],
      isTreatmentNotCompleted : [false],
      isMemberDischarged : [false],
      isTreatmentMemberNotCompleted : [false],
      isDeathOfMember : [false],
      isTransferToAlternative : [false],

      treatmentSummary: [null],
      dischargePlan: [null],

      code: [null],
      principalFirst: [null],

      code1: [null],
      principalFirst1: [null],

      code2: [null],
      principalFirst2: [null],

      code3: [null],
      principalFirst3: [null],

      code4: [null],
      principalFirst4: [null],

      code5: [null],
      principalFirst5: [null],

      code6: [null],
      principalFirst6: [null],

      code7: [null],
      principalFirst7: [null],

      code8: [null],
      principalFirst8: [null],

      principalFirst9: [null],

      isPrognosGood : [false],
      isPrognosFair : [false],
      isPrognosGuarded : [false],
      isPrognosJustification : [false],

      prognosisAtDischarge: [null],
      therapistPrintedName: [null],
      therapistSignature: [null],
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
