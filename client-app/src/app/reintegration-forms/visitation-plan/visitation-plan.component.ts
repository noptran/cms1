import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReVisitationPlan } from './re-visitation-plan';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-visitation-plan',
  templateUrl: './visitation-plan.component.html',
  styleUrls: ['./visitation-plan.component.scss', '../../family-preservation/family-preservation.scss']
})
export class VisitationPlanComponent implements OnInit {
  visitationPlanForm: FormGroup;
  reVisitationPlan: ReVisitationPlan = new ReVisitationPlan();
  isEdit = false;
  isPrint = true;

  @Output()
  ifaFormOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/referral/reintegration/caseplangoals/visitation/plan/detail') { this.getDetails(); }

  }

  editForm() {
    this.isEdit = false;
    this.visitationPlanForm.enable();
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.ParentEffectiveDate) ? source.ParentEffectiveDate = Date.parse(source.ParentEffectiveDate) : null;
    !isNullOrUndefined(source.ParentEffectiveDate1) ? source.ParentEffectiveDate1 = Date.parse(source.ParentEffectiveDate1) : null;
    !isNullOrUndefined(source.ChildEffectiveDate) ? source.ChildEffectiveDate = Date.parse(source.ChildEffectiveDate) : null;
    !isNullOrUndefined(source.SiblingEffectiveDate) ? source.SiblingEffectiveDate = Date.parse(source.SiblingEffectiveDate) : null;
    !isNullOrUndefined(source.ChildSiblingEffectiveDate) ? source.ChildSiblingEffectiveDate = Date.parse(source.ChildSiblingEffectiveDate) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.ifaFormOut.emit({ prForm: source })
  }

  formValidation() {
    this.visitationPlanForm = this._fb.group({
      ChildName: [null],
      Date: [null],
      FactsCase: [null],
      placedTogether: [false],
      notApplicable: [false],
      notApplicable1: [false],
      ParentEffectiveDate: [null],
      ParentVisitsPerMonth: [null],
      ParentParticipants: [null],
      ParentArrangements: [null],

      ParentEffectiveDate1: [null],
      ParentVisitsPerMonth1: [null],
      ParentParticipants1: [null],
      ParentArrangements1: [null],

      ChildEffectiveDate: [null],
      ChildVisitsPerMonth: [null],
      ChildParticipants: [null],
      ChildArrangements: [null],

      SiblingEffectiveDate: [null],
      SiblingVisitsPerMonth: [null],
      SiblingParticipants: [null],
      SiblingArrangements: [null],

      ChildSiblingEffectiveDate: [null],
      ChildSiblingVisitsPerMonth: [null],
      ChildSiblingParticipants: [null],
      ChildSiblingArrangements: [null],

      interactions: [null]

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
      //  !isNullOrUndefined(formData.ScreeningDate) ? formData.ScreeningDate = new Date(formData.ScreeningDate) : null;
      //  !isNullOrUndefined(formData.DateOfDiagnosis) ? formData.DateOfDiagnosis = new Date(formData.DateOfDiagnosis) : null;
      //  !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

      //   !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      // !isNullOrUndefined(formData.ParentEffectiveDate) ? formData.ParentEffectiveDate = new Date(formData.ParentEffectiveDate) : null;
      // !isNullOrUndefined(formData.ParentEffectiveDate1) ? formData.ParentEffectiveDate1 = new Date(formData.ParentEffectiveDate1) : null;
      // !isNullOrUndefined(formData.ChildEffectiveDate) ? formData.ChildEffectiveDate = new Date(formData.ChildEffectiveDate) : null;
      // !isNullOrUndefined(formData.SiblingEffectiveDate) ? formData.SiblingEffectiveDate = new Date(formData.SiblingEffectiveDate) : null;
      // !isNullOrUndefined(formData.ChildSiblingEffectiveDate) ? formData.ChildSiblingEffectiveDate = new Date(formData.ChildSiblingEffectiveDate) : null;

      //  this.initialScreeningForm = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.initialScreeningForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
  
}
