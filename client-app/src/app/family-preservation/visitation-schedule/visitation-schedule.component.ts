import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { FpVisitation } from './fp-visitation';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';

@Component({
  selector: 'app-visitation-schedule',
  templateUrl: './visitation-schedule.component.html',
  styleUrls: ['./visitation-schedule.component.scss', '../family-preservation.scss'],
  outputs: ['visiSchOut']
})
export class VisitationScheduleComponent implements OnInit {
  fpVisitationSchedule: FpVisitation = new FpVisitation();
  VisitationScheduleForm: FormGroup;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  visiSchOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
      this.VisitationScheduleForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/case-plan-goals/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();
    this.VisitationScheduleForm.disable();
  }

  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpVisitationSchedule = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.workerParentEffectiveDate) ? formData.workerParentEffectiveDate = new Date(formData.workerParentEffectiveDate) : null;
    !isNullOrUndefined(formData.arrangementsEffectiveDate) ? formData.arrangementsEffectiveDate = new Date(formData.arrangementsEffectiveDate) : null;
    !isNullOrUndefined(formData.workerMandatoryEffectiveDate) ? formData.workerMandatoryEffectiveDate = new Date(formData.workerMandatoryEffectiveDate) : null;
    !isNullOrUndefined(formData.childSiblingEffectiveDate) ? formData.childSiblingEffectiveDate = new Date(formData.childSiblingEffectiveDate) : null;
    this.fpVisitationSchedule = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpVisitationSchedule.childName = data.person.firstName + ' ' + data.person.lastName;
        this.fpVisitationSchedule.date = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpVisitationSchedule.factsCase = (data.referral.facts);
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
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.workerParentEffectiveDate) ? source.workerParentEffectiveDate = Date.parse(source.workerParentEffectiveDate) : null;
    !isNullOrUndefined(source.arrangementsEffectiveDate) ? source.arrangementsEffectiveDate = Date.parse(source.arrangementsEffectiveDate) : null;
    !isNullOrUndefined(source.workerMandatoryEffectiveDate) ? source.workerMandatoryEffectiveDate = Date.parse(source.workerMandatoryEffectiveDate) : null;
    !isNullOrUndefined(source.childSiblingEffectiveDate) ? source.childSiblingEffectiveDate = Date.parse(source.childSiblingEffectiveDate) : null;

    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.visiSchOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.visiSchOut.emit({ cmsData: {} });
  }
  editForm() {
    this.VisitationScheduleForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.VisitationScheduleForm = this._fb.group({

      childName: [null],
      date: [null],
      factsCase: [null],
      isWorkerParentNotApplicable: [false],
      workerParentEffectiveDate: [null],
      workerParentVisitsPerMonth: [null],
      workerParentParticipants: [null],
      arrangements: [null],
      arrangementsEffectiveDate: [null],
      arrangementsVisitsPerMonth: [null],
      arrangmentsParticipants: [null],
      arrangements2: [null],

      workerMandatoryEffectiveDate: [null],
      workerMandatoryVisitsPerMonth: [null],
      workerMandatoryParticipants: [null],
      arrangments3: [null],

      isChildSiblingNotApplicable: [false],
      isChildSiblingPlaced: [false],

      childSiblingEffectiveDate: [null],
      childSiblingVisitsPerMonth: [null],
      childSiblingParticipants: [null],

      arrangments4: [null],
      explainWhy: [null],
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
