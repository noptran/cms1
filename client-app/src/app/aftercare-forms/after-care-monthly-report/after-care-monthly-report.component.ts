import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { AftCareMonthlyRep } from './aft-care-monthly-rep';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-after-care-monthly-report',
  templateUrl: './after-care-monthly-report.component.html',
  styleUrls: ['./after-care-monthly-report.component.scss', '../../family-preservation/family-preservation.scss']
})
export class AfterCareMonthlyReportComponent implements OnInit {
  afterCareMonthlyReportForm: FormGroup;
  reAfterCareMonthlyReport: AftCareMonthlyRep = new AftCareMonthlyRep();
  isEdit = false;
  isPrint = true;

  @Output()
  ifaFormOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/referral/aftercare/aftercare/monthly/report/detail') { this.getDetails(); }

  }

  editForm() {
    this.isEdit = false;
    this.afterCareMonthlyReportForm.enable();
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.Dob1) ? source.Dob1 = Date.parse(source.Dob1) : null;
    !isNullOrUndefined(source.Dob2) ? source.Dob2 = Date.parse(source.Dob2) : null;
    !isNullOrUndefined(source.Dob3) ? source.Dob3 = Date.parse(source.Dob3) : null;
    !isNullOrUndefined(source.AgreementDate) ? source.AgreementDate = Date.parse(source.AgreementDate) : null;
    !isNullOrUndefined(source.MonthlyReportDate) ? source.MonthlyReportDate = Date.parse(source.MonthlyReportDate) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.ifaFormOut.emit({ prForm: source })
  }

  formValidation() {
    this.afterCareMonthlyReportForm = this._fb.group({
      ParentName: [null],
      FactsCase: [null],
      ChildName1: [null],
      Dob1: [null],
      ChildName2: [null],
      Dob2: [null],
      ChildName3: [null],
      Dob3: [null],
      AgreementDate: [null],
      MonthlyReportDate: [null],
      ReintegrationNotes: [null],
      Signature: [null],
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
      //       !isNullOrUndefined(formData.Dob1) ? formData.Dob1 = new Date(formData.Dob1) : null;
      // !isNullOrUndefined(formData.Dob2) ? formData.Dob2 = new Date(formData.Dob2) : null;
      // !isNullOrUndefined(formData.Dob3) ? formData.Dob3 = new Date(formData.Dob3) : null;
      // !isNullOrUndefined(formData.AgreementDate) ? formData.AgreementDate = new Date(formData.AgreementDate) : null;
      // !isNullOrUndefined(formData.MonthlyReportDate) ? formData.MonthlyReportDate = new Date(formData.MonthlyReportDate) : null;
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.afterCareMonthlyReportForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
