import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { KinDeclCriminal } from './kin-decl-criminal';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-declaration-of-criminal-offenses',
  templateUrl: './declaration-of-criminal-offenses.component.html',
  styleUrls: ['./declaration-of-criminal-offenses.component.scss', '../../family-preservation/family-preservation.scss']
})
export class DeclarationOfCriminalOffensesComponent implements OnInit {
  declarationOfCriminalForm: FormGroup;
  kinDeclarationOfCriminal: KinDeclCriminal = new KinDeclCriminal();
  isEdit = false;
  isPrint = true;

  @Output()
  ifaFormOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/referral/kinship/declaration/of/criminal/offsenses/detail') { this.getDetails(); }

  }

  editForm() {
    this.isEdit = false;
    this.declarationOfCriminalForm.enable();
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.DateOfConviction) ? source.DateOfConviction = Date.parse(source.DateOfConviction) : null;
    !isNullOrUndefined(source.DateOfConviction1) ? source.DateOfConviction1 = Date.parse(source.DateOfConviction1) : null;
    !isNullOrUndefined(source.DateOfConviction2) ? source.DateOfConviction2 = Date.parse(source.DateOfConviction2) : null;

    !isNullOrUndefined(source.DateOfConviction3) ? source.DateOfConviction3 = Date.parse(source.DateOfConviction3) : null;
    !isNullOrUndefined(source.DateOfConviction4) ? source.DateOfConviction4 = Date.parse(source.DateOfConviction4) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;


    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.ifaFormOut.emit({ prForm: source })
  }

  formValidation() {
    this.declarationOfCriminalForm = this._fb.group({
      Crime: [null],
      DateOfConviction: [null],
      CityState: [null],
      Expunged: [null],

      Crime1: [null],
      DateOfConviction1: [null],
      CityState1: [null],
      Expunged1: [null],

      Crime2: [null],
      DateOfConviction2: [null],
      CityState2: [null],
      Expunged2: [null],

      Crime3: [null],
      DateOfConviction3: [null],
      CityState3: [null],
      Expunged3: [null],

      Crime4: [null],
      DateOfConviction4: [null],
      CityState4: [null],
      Expunged4: [null],

      stateDescription: [null],
      print: [null],
      signature: [null],
      date: [null],
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
      // !isNullOrUndefined(formData.DateOfConviction) ? formData.DateOfConviction = new Date(formData.DateOfConviction) : null;
      // !isNullOrUndefined(formData.DateOfConviction1) ? formData.DateOfConviction1 = new Date(formData.DateOfConviction1) : null;
      // !isNullOrUndefined(formData.DateOfConviction2) ? formData.DateOfConviction2 = new Date(formData.DateOfConviction2) : null;

      // !isNullOrUndefined(formData.DateOfConviction3) ? formData.DateOfConviction3 = new Date(formData.DateOfConviction3) : null;
      // !isNullOrUndefined(formData.DateOfConviction4) ? formData.DateOfConviction4 = new Date(formData.DateOfConviction4) : null;
      // !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
      //  this.kinDeclarationOfCriminal = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.declarationOfCriminalForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }




}
