import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { AftCareContactAgrmt } from './aft-care-contact-agrmt';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-after-care-contact-agreement',
  templateUrl: './after-care-contact-agreement.component.html',
  styleUrls: ['./after-care-contact-agreement.component.scss', '../../family-preservation/family-preservation.scss']
})
export class AfterCareContactAgreementComponent implements OnInit {
  afterCareContactAgreementForm: FormGroup;
  aftCareAfterCareContactAgreement: AftCareContactAgrmt = new AftCareContactAgrmt();
  isEdit = false;
  isPrint = true;


  @Output()
  ifaFormOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/referral/aftercare/aftercare/contact/agreement/detail') { this.getDetails(); }

  }

  editForm() {
    this.isEdit = false;
    this.afterCareContactAgreementForm.enable();
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.Dob1) ? source.Dob1 = Date.parse(source.Dob1) : null;
    !isNullOrUndefined(source.Dob2) ? source.Dob2 = Date.parse(source.Dob2) : null;
    !isNullOrUndefined(source.Dob3) ? source.Dob3 = Date.parse(source.Dob3) : null;

    !isNullOrUndefined(source.DateAftercareStarted) ? source.DateAftercareStarted = Date.parse(source.DateAftercareStarted) : null;

    !isNullOrUndefined(source.AgreementFrom) ? source.AgreementFrom = Date.parse(source.AgreementFrom) : null;
    !isNullOrUndefined(source.AgreementTo) ? source.AgreementTo = Date.parse(source.AgreementTo) : null;
    !isNullOrUndefined(source.TargetDate) ? source.TargetDate = Date.parse(source.TargetDate) : null;
    !isNullOrUndefined(source.AchievedDate) ? source.AchievedDate = Date.parse(source.AchievedDate) : null;
    !isNullOrUndefined(source.TargetDate1) ? source.TargetDate1 = Date.parse(source.TargetDate1) : null;
    !isNullOrUndefined(source.AchievedDate1) ? source.AchievedDate1 = Date.parse(source.AchievedDate1) : null;
    !isNullOrUndefined(source.TargetDate2) ? source.TargetDate2 = Date.parse(source.TargetDate2) : null;
    !isNullOrUndefined(source.AchievedDate2) ? source.AchievedDate2 = Date.parse(source.AchievedDate2) : null;

    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;
    !isNullOrUndefined(source.Date2) ? source.Date2 = Date.parse(source.Date2) : null;
    !isNullOrUndefined(source.Date3) ? source.Date3 = Date.parse(source.Date3) : null;
    !isNullOrUndefined(source.Date4) ? source.Date4 = Date.parse(source.Date4) : null;
    !isNullOrUndefined(source.Date5) ? source.Date5 = Date.parse(source.Date5) : null;
    
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.ifaFormOut.emit({ prForm: source })
  }

  formValidation() {
    this.afterCareContactAgreementForm = this._fb.group({

      CaseName: [null],
      FactsCase: [null],
      Co: [null],
      ChildName: [null],
      Dob: [null],
      ParentName: [null],

      ChildName1: [null],
      Dob1: [null],
      ParentName1: [null],

      ChildName2: [null],
      Dob2: [null],
      ParentOther2: [null],

      ChildName3: [null],
      Dob3: [null],
      ParentOther3: [null],

      LocalDcf: [null],
      AssignedDcfStaff: [null],
      Provider: [null],
      AssignedProviderStaff: [null],

      Phone: [null],
      Email: [null],

      DateAftercareStarted: [null],

      AgreementFrom: [null],
      AgreementTo: [null],

      IsReintegration: [false],
      IsAdoption: [false],
      IsPermanentCustodianship: [false],

      IndividualStrengths: [null],
      Services1: [null],
      Services2: [null],

      Frequency: [null],
      MaintenanceObjective: [null],

      Task: [null],
      ShortTermTasks: [null],
      ResponsiblePerson: [null],
      TargetDate: [null],
      AchievedDate: [null],

      Task1: [null],
      ShortTermTasks1: [null],
      ResponsiblePerson1: [null],
      TargetDate1: [null],
      AchievedDate1: [null],

      Task2: [null],
      ShortTermTasks2: [null],
      ResponsiblePerson2: [null],
      TargetDate2: [null],
      AchievedDate2: [null],

      CriteriaForSuccess: [null],

      ParentSignature: [null],
      Date: [null],

      ChildSignature: [null],
      Date1: [null],

      ParentSignature1: [null],
      Date2: [null],

      ChildSignature1: [null],
      Date3: [null],

      CaseManagerSignature: [null],
      Date4: [null],

      ChildSignature5: [null],
      Date5: [null]
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
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      // !isNullOrUndefined(formData.Dob1) ? formData.Dob1 = new Date(formData.Dob1) : null;
      // !isNullOrUndefined(formData.Dob2) ? formData.Dob2 = new Date(formData.Dob2) : null;
      // !isNullOrUndefined(formData.Dob3) ? formData.Dob3 = new Date(formData.Dob3) : null;

      // !isNullOrUndefined(formData.DateAftercareStarted) ? formData.DateAftercareStarted = new Date(formData.DateAftercareStarted) : null;

      // !isNullOrUndefined(formData.AgreementFrom) ? formData.AgreementFrom = new Date(formData.AgreementFrom) : null;
      // !isNullOrUndefined(formData.AgreementTo) ? formData.AgreementTo = new Date(formData.AgreementTo) : null;
      // !isNullOrUndefined(formData.TargetDate) ? formData.TargetDate = new Date(formData.TargetDate) : null;
      // !isNullOrUndefined(formData.AchievedDate) ? formData.AchievedDate = new Date(formData.AchievedDate) : null;
      // !isNullOrUndefined(formData.TargetDate1) ? formData.TargetDate1 = new Date(formData.TargetDate1) : null;
      // !isNullOrUndefined(formData.AchievedDate1) ? formData.AchievedDate1 = new Date(formData.AchievedDate1) : null;
      // !isNullOrUndefined(formData.TargetDate2) ? formData.TargetDate2 = new Date(formData.TargetDate2) : null;
      // !isNullOrUndefined(formData.AchievedDate2) ? formData.AchievedDate2 = new Date(formData.AchievedDate2) : null;

      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      // !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      // !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;
      // !isNullOrUndefined(formData.Date3) ? formData.Date3 = new Date(formData.Date3) : null;
      // !isNullOrUndefined(formData.Date4) ? formData.Date4 = new Date(formData.Date4) : null;
      // !isNullOrUndefined(formData.Date5) ? formData.Date5 = new Date(formData.Date5) : null;
      
      //  this.aftCareAfterCareContactAgreement = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.afterCareContactAgreementForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
