import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReintCaseTransfer } from './reint-case-transfer';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-case-transfer-summary-reinte',
  templateUrl: './case-transfer-summary-reinte.component.html',
  styleUrls: ['./case-transfer-summary-reinte.component.scss', '../../family-preservation/family-preservation.scss']
})
export class CaseTransferSummaryReinteComponent implements OnInit {
  caseTransferSummaryForm: FormGroup;
  reintCaseTransferSummary: ReintCaseTransfer = new ReintCaseTransfer();
  isEdit = false;
  isPrint = true;

  @Output()
  ifaFormOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/referral/reintegration/supervisor-staffing/case/transfer/summary/detail') { this.getDetails(); }

  }

  editForm() {
    this.isEdit = false;
    this.caseTransferSummaryForm.enable();
  }

  saveForm(source) {
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.Time) ? source.Time = Date.parse(source.Time) : null;
    !isNullOrUndefined(source.Time1) ? source.Time1 = Date.parse(source.Time1) : null;
    !isNullOrUndefined(source.Time2) ? source.Time2 = Date.parse(source.Time2) : null;
    !isNullOrUndefined(source.Time3) ? source.Time3 = Date.parse(source.Time3) : null;
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;
    !isNullOrUndefined(source.Date2) ? source.Date2 = Date.parse(source.Date2) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.ifaFormOut.emit({ prForm: source })
  }

  formValidation() {
    this.caseTransferSummaryForm = this._fb.group({

      CaseName: [null],
      Date: [null],
      FactsCaseNumber: [null],

      /////////////////////
      Time: [null],
      FullName: [null],
      Position: [null],
      RelationshipToCase: [null],

      Time1: [null],
      FullName1: [null],
      Position1: [null],
      RelationshipToCase1: [null],

      Time2: [null],
      FullName2: [null],
      Position2: [null],
      RelationshipToCase2: [null],

      Time3: [null],
      FullName3: [null],
      Position3: [null],
      RelationshipToCase3: [null],
      ///////////////////

      TransferLevelOfService: [null],
      CurrentService: [null],
      NewLevelService: [null],

      IsNewWorker: [false],
      IsNewSupervisor: [false],
      IsFamilyMoved: [false],
      IsChangeOfVenue: [false],
      IsOther: [false],

      Explain: [null],

      Referral: [null],
      ReviewOfCasePlan: [null],
      Decisions: [null],
      GeneralFamilyInformation: [null],
      NonCustodialParent: [null],
      ChildConnections: [null],
      Decisions1: [null],
      SafetyConcernsIdentified: [null],
      RiskConcernsIdentified: [null],
      Decisions2: [null],
      Icwa: [null],
      Decisions3: [null],
      KansasInfantToddler: [null],
      IsFollowUpYes: [false],
      IsFollowUpNo: [false],
      Other: [null],
      Decisions4: [null],
      TransferringSupervisorSignature: [null],
      Date1: [null],
      ReceivingSupervisorSignature: [null],
      Date2: [null]


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
     
    //   !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    // !isNullOrUndefined(formData.Time) ? formData.Time = new Date(formData.Time) : null;
    // !isNullOrUndefined(formData.Time1) ? formData.Time1 = new Date(formData.Time1) : null;
    // !isNullOrUndefined(formData.Time2) ? formData.Time2 = new Date(formData.Time2) : null;
    // !isNullOrUndefined(formData.Time3) ? formData.Time3 = new Date(formData.Time3) : null;
    // !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
    // !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;

      //  this.reintCaseTransferSummary = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.caseTransferSummaryForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
  
}
