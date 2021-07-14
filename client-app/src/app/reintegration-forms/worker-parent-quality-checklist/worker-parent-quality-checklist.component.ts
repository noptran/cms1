import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReWokerParent } from './re-woker-parent';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-worker-parent-quality-checklist',
  templateUrl: './worker-parent-quality-checklist.component.html',
  styleUrls: ['./worker-parent-quality-checklist.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['workParOut']
})
export class WorkerParentQualityChecklistComponent implements OnInit {
  workerParentForm: FormGroup;
  reWorkerParent: ReWokerParent = new ReWokerParent();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  workParOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {
  
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/worker/parent/quality/checklist/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.workerParentForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reWorkerParent = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DateOfWP) ? formData.DateOfWP = new Date(formData.DateOfWP) : null;
    !isNullOrUndefined(formData.DateOfReview) ? formData.DateOfReview = new Date(formData.DateOfReview) : null;
    this.reWorkerParent = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reWorkerParent.ClientName = data.person.firstName + " " + data.person.lastName;
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
    this.workerParentForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.DateOfWP) ? source.DateOfWP = Date.parse(source.DateOfWP) : null;
    !isNullOrUndefined(source.DateOfReview) ? source.DateOfReview = Date.parse(source.DateOfReview) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.workParOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.workParOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.workerParentForm = this._fb.group({
      ClientName: [null],
      ParentName: [null],
      DateOfWP: [null],
      CompletedBy: [null],
      ReviewerName: [null],
      DateOfReview: [null],

      IsVisitFaceYes: [false],
      IsVisitFaceNo: [false],

      IsVisitOccurYes: [false],
      IsVisitOccurNo: [false],
      VisitOccur: [null],

      IsTasksReviewedYes: [false],
      IsTasksReviewedNo: [false],
      TasksReviewed: [null],

      IsWorkerDocumentYes: [false],
      IsWorkerDocumentNo: [false],
      WorkerDocument: [null],

      IsWorkerDocument1Yes: [false],
      IsWorkerDocument1No: [false],
      WorkerDocument1: [null],

      IsRelativesYes: [false],
      IsRelativesNo: [false],
      Relatives: [null],

      IsAssessForSafetyYes: [false],
      IsAssessForSafetyNo: [false],
      AssessForSafety: [null],

      IsAssessForRiskYes: [false],
      IsAssessForRiskNo: [false],
      AssessForRisk: [null],

      IsAddressSafetyYes: [false],
      IsAddressSafetyNo: [false],
      AddressSafety: [null],
      isAddressSafety:[false],
      IsProgressYes: [false],
      IsProgressNo: [false],
      Progress: [null],

      IsKeyIssuesYes: [false],
      IsKeyIssuesNo: [false],
      KeyIssues: [null],
      ////////////////////
      ChildName: [null],
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
      //  !isNullOrUndefined(formData.DateOfWP) ? formData.DateOfWP = new Date(formData.DateOfWP) : null;
      //  !isNullOrUndefined(formData.DateOfReview) ? formData.DateOfReview = new Date(formData.DateOfReview) : null;
      //  this.reWorkerParent = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.workerParentForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
  
}
