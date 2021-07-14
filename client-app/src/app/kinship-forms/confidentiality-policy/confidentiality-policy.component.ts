import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { KinConfidPolicy } from './kin-confid-policy';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-confidentiality-policy',
  templateUrl: './confidentiality-policy.component.html',
  styleUrls: ['./confidentiality-policy.component.scss', '../../family-preservation/family-preservation.scss']
})
export class ConfidentialityPolicyComponent implements OnInit {
  confidentialityPolicyForm: FormGroup;
  kinConfidentialityPolicy: KinConfidPolicy = new KinConfidPolicy();
  isEdit = false;
  isPrint = true;

  @Output()
  ifaFormOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/referral/kinship/confidentiality/policy/detail') { this.getDetails(); }

  }

  editForm() {
    this.isEdit = false;
    this.confidentialityPolicyForm.enable();
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;
    !isNullOrUndefined(source.Date2) ? source.Date2 = Date.parse(source.Date2) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.ifaFormOut.emit({ prForm: source })
  }

  formValidation() {
    this.confidentialityPolicyForm = this._fb.group({
      Signature1: [null],
      Signature2: [null],
      Date1: [null],
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
      //  !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;
      //  !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      //  this.kinConfidentialityPolicy = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.confidentialityPolicyForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
