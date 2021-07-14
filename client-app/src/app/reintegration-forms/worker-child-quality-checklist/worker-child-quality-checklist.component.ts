import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReWorkerChild } from './re-worker-child';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-worker-child-quality-checklist',
  templateUrl: './worker-child-quality-checklist.component.html',
  styleUrls: ['./worker-child-quality-checklist.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['workChildOut']
})
export class WorkerChildQualityChecklistComponent implements OnInit {
  WorkerChildQualityForm: FormGroup;
  reIWorkerChildQuality: ReWorkerChild = new ReWorkerChild();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  workChildOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/worker/child/quality/checklist/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.WorkerChildQualityForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reIWorkerChildQuality = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DateOfDocumentation) ? formData.DateOfDocumentation =new Date(formData.DateOfDocumentation) : null;
    !isNullOrUndefined(formData.DateReview) ? formData.DateReview =new Date(formData.DateReview) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date =new Date(formData.Date) : null;
    this.reIWorkerChildQuality = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reIWorkerChildQuality.ClientName = data.person.firstName + " " + data.person.lastName;
        this.reIWorkerChildQuality.Date = new Date();
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
       
      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }


  editForm() {
    this.WorkerChildQualityForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.DateOfDocumentation) ? source.DateOfDocumentation = Date.parse(source.DateOfDocumentation) : null;
    !isNullOrUndefined(source.DateReview) ? source.DateReview = Date.parse(source.DateReview) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.workChildOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.workChildOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.WorkerChildQualityForm = this._fb.group({
      ClientName: [null],
      Age: [null],
      Date: [null],
      CompletedBy: [null],
      ReviewerName: [null],
      DateReview: [null],
      DateOfDocumentation: [null],

      IsVisitOccurYes: [false],
      IsVisitOccurNo: [false],
      VisitOccur: [null],

      IsAloneTimeYes: [false],
      IsAloneTimeNo: [false],
      AloneTime: [null],

      IsAssessForSafetyYes: [false],
      IsAssessForSafetyNo: [false],
      AssessForSafety: [null],

      AddressConcernsSafety: [null],

      IsAssessForRiskYes: [false],
      IsAssessForRiskNo: [false],
      AssessForRisk: [null],

      AddressConcernsRisk: [null],

      IsMedicationsYes: [false],
      IsMedicationsNo: [false],
      Medications: [null],



      IsAppointmentsYes: [false],
      IsAppointmentsNo: [false],
      Appointments: [null],

      AddressConcernsAppointments: [null],

      IsMonthlyContactYes: [false],
      IsMonthlyContactNo: [false],
      VisitOccur1: [null],



      IsSummaryYes: [false],
      IsSummaryNo: [false],
      Summary: [null],

      AddressConcernsSummary: [null],

      IsTasksReviewedYes: [false],
      IsTasksReviewedNo: [false],
      TasksReviewed: [null],



      IsNarrativeYes: [false],
      IsNarrativeNo: [false],
      Narrative: [null],

      AddressConcernsNarrative: [null],
      AddressConcerns4: [null],
      AddressConcerns5: [null],
      Total: [null],
      Total1: [null],
      printedBy: [null],
      printedDate: [null],



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
      //  !isNullOrUndefined(formData.DateOfDocumentation) ? formData.DateOfDocumentation = new Date(formData.DateOfDocumentation) : null;
      //  !isNullOrUndefined(formData.DateReview) ? formData.DateReview = new Date(formData.DateReview) : null;
      //  !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      //  this.reIWorkerChildQuality = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.WorkerChildQualityForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
