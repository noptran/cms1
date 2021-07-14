import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReNeedingScheduled } from './re-needing-scheduled';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-caseplan-needing-scheduled',
  templateUrl: './caseplan-needing-scheduled.component.html',
  styleUrls: ['./caseplan-needing-scheduled.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['casePlanNeedOut']
})
export class CaseplanNeedingScheduledComponent implements OnInit {
  caseplanNeedingForm: FormGroup;
  reCaseplanNeeding: ReNeedingScheduled = new ReNeedingScheduled();
  isEdit = false;
  editControll = true;
  isPrint = true;

  @Output()
  casePlanNeedOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/caseplangoals/caseplan/needing/scheduled/detail') { this.getDetails(); }
    this.caseplanNeedingForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reCaseplanNeeding = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DateTyped) ? formData.DateTyped = new Date(formData.DateTyped) : null;
    !isNullOrUndefined(formData.DateTime) ? formData.DateTime = new Date(formData.DateTime) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    this.reCaseplanNeeding = formData;
  }
  editForm() {
    this.caseplanNeedingForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.DateTyped) ? source.DateTyped = Date.parse(source.DateTyped) : null;
    !isNullOrUndefined(source.DateTime) ? source.DateTime = Date.parse(source.DateTime) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.casePlanNeedOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.casePlanNeedOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.caseplanNeedingForm = this._fb.group({
      Name: [null],
      Date: [null],
      PermanencyGoal: [null],
      Participants: [null],
      Father: [null],
      Mother: [null],
      ThirdParty: [null],
      PermanencySpecialist: [null],
      PermanencySupervisor: [null],
      InterestedParties: [null],
      Gal: [null],
      Casa: [null],
      Liaison: [null],
      IsDiscussedDcfYes: [false],
      IsDiscussedDcfNo: [false],
      Designee: [null],
      ResourceFamily: [null],
      FamilySupportWorker: [null],
      FosterCareWorker: [null],
      OtherParticipants: [null],
      IndianTribe: [null],
      Comments: [null],
      PermanencySpecialist1: [null],
      PermanencySpecialistSignature: [null],
      DateTime: [null],
      StaffCompletingRequest: [null],
      StaffCompletingSignature: [null],
      DateTyped: [null],

    });
  }

  getDetails() {
    setTimeout(() => {
      let formData;
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      //     let assessmentId = localStorage.getItem('asssessmentId');
      //     let req = { assessmentID: assessmentId }
      //     this._opencard.getAssessmentRec(req).then((data) => {
      //       formData = data.pdfForms.pdfForms;
      //  !isNullOrUndefined(formData.DateTyped) ? formData.DateTyped = new Date(formData.DateTyped) : null;
      //  !isNullOrUndefined(formData.DateTime) ? formData.DateTime = new Date(formData.DateTime) : null;
      //  !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      //  this.reCaseplanNeeding = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.caseplanNeedingForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
