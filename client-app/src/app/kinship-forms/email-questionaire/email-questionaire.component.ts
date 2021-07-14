import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { KinEmailQues } from './kin-email-ques';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-email-questionaire',
  templateUrl: './email-questionaire.component.html',
  styleUrls: ['./email-questionaire.component.scss', '../../family-preservation/family-preservation.scss']
})
export class EmailQuestionaireComponent implements OnInit {
  emailQuestionaireForm: FormGroup;
  kinEmailQuestionaire: KinEmailQues = new KinEmailQues();
  isEdit = false;
  isPrint = true;

  @Output()
  ifaFormOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/referral/kinship/email/questionaire/detail') { this.getDetails(); }

  }

  editForm() {
    this.isEdit = false;
    this.emailQuestionaireForm.enable();
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.ifaFormOut.emit({ prForm: source })
  }

  formValidation() {
    this.emailQuestionaireForm = this._fb.group({
      ApplicantName: [null],
      ReferenceName: [null],
      KnownTheApplicant: [null],
      IsRelative: [false],
      IsFriend: [false],
      IsEmployer: [false],
      IsOther: [false],
      Explain: [null],
      ApplicantInteract: [null],
      StabilityOfMarriage: [null],
      ObservedFamily: [null],
      TypeOfDiscipline: [null],
      FosterReaction: [null],
      IsLiveIncomeYes: [false],
      IsLiveIncomeNo: [false],
      IsMaintainPropertyYes: [false],
      IsMaintainPropertyNo: [false],
      IsWillingnessYes: [false],
      IsWillingnessNo: [false],
      IsAlcoholProblemsYes: [false],
      IsAlcoholProblemsNo: [false],
      AlcoholProblems: [null],

      IsHealthIssuesYes: [false],
      IsHealthIssuesNo: [false],
      HealthIssues: [null],

      Concerns: [null],

      MotivationToAdopt: [null],
      OtherComments: [null],

      YourName: [null],
      Date: [null]
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
      //  !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

      //  this.kinEmailQuestionaire = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.emailQuestionaireForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
