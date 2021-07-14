import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { KinKinshipCodeEthics } from './kin-kinship-code-ethics';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-kinship-code-of-ethics',
  templateUrl: './kinship-code-of-ethics.component.html',
  styleUrls: ['./kinship-code-of-ethics.component.scss', '../../family-preservation/family-preservation.scss']
})
export class KinshipCodeOfEthicsComponent implements OnInit {
  kinshipCodeOfEthicsForm: FormGroup;
  reKinshipCodeOfEthics: KinKinshipCodeEthics = new KinKinshipCodeEthics();
  isEdit = false;
  isPrint = true;

  @Output()
  ifaFormOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/referral/kinship/kinship/code/of/ethics/detail') { this.getDetails(); }

  }

  editForm() {
    this.isEdit = false;
    this.kinshipCodeOfEthicsForm.enable();
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;
    !isNullOrUndefined(source.Date2) ? source.Date2 = Date.parse(source.Date2) : null;
    !isNullOrUndefined(source.Date3) ? source.Date3 = Date.parse(source.Date3) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.ifaFormOut.emit({ prForm: source })
  }

  formValidation() {
    this.kinshipCodeOfEthicsForm = this._fb.group({

      KinshipProvider1: [null],
      Date1: [null],
      KinshipProvider2: [null],
      Date2: [null],
      KinshipProvider3: [null],
      Date3: [null]
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
      //  !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      //  !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;
      //  !isNullOrUndefined(formData.Date3) ? formData.Date3 = new Date(formData.Date3) : null;
      //  this.reKinshipCodeOfEthics = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.kinshipCodeOfEthicsForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
