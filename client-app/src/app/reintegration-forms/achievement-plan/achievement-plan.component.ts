import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { RiAchievementPlan } from './ri-achievement-plan';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-achievement-plan',
  templateUrl: './achievement-plan.component.html',
  styleUrls: ['./achievement-plan.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['achPlanOut']
})
export class AchievementPlanComponent implements OnInit {
  riAchievementPlan: RiAchievementPlan = new RiAchievementPlan();
  achievementPlanForm: FormGroup;
  editControll = true;
  isEdit = false;
  isPrint = true;

  @Output()
  achPlanOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/court-orders/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/achievement/plan/detail') { this.getDetails(); }
    this.achievementPlanForm.disable();
  }

  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.riAchievementPlan = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.dateToAccomplished) ? formData.dateToAccomplished = new Date(formData.dateToAccomplished) : null;
    !isNullOrUndefined(formData.dateAccomplished) ? formData.dateAccomplished = new Date(formData.dateAccomplished) : null;

    !isNullOrUndefined(formData.dateToAccomplished1) ? formData.dateToAccomplished1 = new Date(formData.dateToAccomplished1) : null;
    !isNullOrUndefined(formData.dateAccomplished1) ? formData.dateAccomplished1 = new Date(formData.dateAccomplished1) : null;

    !isNullOrUndefined(formData.dateToAccomplished2) ? formData.dateToAccomplished2 = new Date(formData.dateToAccomplished2) : null;
    !isNullOrUndefined(formData.dateAccomplished2) ? formData.dateAccomplished2 = new Date(formData.dateAccomplished2) : null;

    !isNullOrUndefined(formData.dateToAccomplishedT1) ? formData.dateToAccomplishedT1 = new Date(formData.dateToAccomplishedT1) : null;
    !isNullOrUndefined(formData.dateAccomplishedT1) ? formData.dateAccomplishedT1 = new Date(formData.dateAccomplishedT1) : null;

    !isNullOrUndefined(formData.dateToAccomplished1T1) ? formData.dateToAccomplished1T1 = new Date(formData.dateToAccomplished1T1) : null;
    !isNullOrUndefined(formData.dateAccomplished1T1) ? formData.dateAccomplished1T1 = new Date(formData.dateAccomplished1T1) : null;

    !isNullOrUndefined(formData.dateToAccomplished2T1) ? formData.dateToAccomplished2T1 = new Date(formData.dateToAccomplished2T1) : null;
    !isNullOrUndefined(formData.dateAccomplished2T1) ? formData.dateAccomplished2T1 = new Date(formData.dateAccomplished2T1) : null;

    !isNullOrUndefined(formData.ParentSignatureDate) ? formData.ParentSignatureDate = new Date(formData.ParentSignatureDate) : null;
    !isNullOrUndefined(formData.ParentSignatureDate1) ? formData.ParentSignatureDate1 = new Date(formData.ParentSignatureDate1) : null;
    !isNullOrUndefined(formData.StaffSignatureDate) ? formData.StaffSignatureDate = new Date(formData.StaffSignatureDate) : null;
    !isNullOrUndefined(formData.StaffSignatureDate1) ? formData.StaffSignatureDate1 = new Date(formData.StaffSignatureDate1) : null;

    this.riAchievementPlan = formData;
  }

  saveForm(event, source) {
    console.log('source is', source, 'label is', event);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.dateToAccomplished) ? source.dateToAccomplished = Date.parse(source.dateToAccomplished) : null;
    !isNullOrUndefined(source.dateAccomplished) ? source.dateAccomplished = Date.parse(source.dateAccomplished) : null;

    !isNullOrUndefined(source.dateToAccomplished1) ? source.dateToAccomplished1 = Date.parse(source.dateToAccomplished1) : null;
    !isNullOrUndefined(source.dateAccomplished1) ? source.dateAccomplished1 = Date.parse(source.dateAccomplished1) : null;

    !isNullOrUndefined(source.dateToAccomplished2) ? source.dateToAccomplished2 = Date.parse(source.dateToAccomplished2) : null;
    !isNullOrUndefined(source.dateAccomplished2) ? source.dateAccomplished2 = Date.parse(source.dateAccomplished2) : null;

    !isNullOrUndefined(source.dateToAccomplishedT1) ? source.dateToAccomplishedT1 = Date.parse(source.dateToAccomplishedT1) : null;
    !isNullOrUndefined(source.dateAccomplishedT1) ? source.dateAccomplishedT1 = Date.parse(source.dateAccomplishedT1) : null;

    !isNullOrUndefined(source.dateToAccomplished1T1) ? source.dateToAccomplished1T1 = Date.parse(source.dateToAccomplished1T1) : null;
    !isNullOrUndefined(source.dateAccomplished1T1) ? source.dateAccomplished1T1 = Date.parse(source.dateAccomplished1T1) : null;

    !isNullOrUndefined(source.dateToAccomplished2T1) ? source.dateToAccomplished2T1 = Date.parse(source.dateToAccomplished2T1) : null;
    !isNullOrUndefined(source.dateAccomplished2T1) ? source.dateAccomplished2T1 = Date.parse(source.dateAccomplished2T1) : null;

    !isNullOrUndefined(source.ParentSignatureDate) ? source.ParentSignatureDate = Date.parse(source.ParentSignatureDate) : null;
    !isNullOrUndefined(source.ParentSignatureDate1) ? source.ParentSignatureDate1 = Date.parse(source.ParentSignatureDate1) : null;
    !isNullOrUndefined(source.StaffSignatureDate) ? source.StaffSignatureDate = Date.parse(source.StaffSignatureDate) : null;
    !isNullOrUndefined(source.StaffSignatureDate1) ? source.StaffSignatureDate1 = Date.parse(source.StaffSignatureDate1) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.achPlanOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.achPlanOut.emit({ cmsData: {} });
  }
  editForm() {
    this.achievementPlanForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.achievementPlanForm = this._fb.group({
      for: [null],
      worker: [null],
      date: [null],


      isMaintainAtHome: [false],
      isReturnHome: [false],
      isAdoption: [false],
      isIndependentLiving: [false],

      isPhysicalAbuse: [false],
      isSexualAbuse: [false],
      isEmotionalAbuse: [false],

      isPhysicalNeglect: [false],
      isSupervision: [false],
      isAbandonment: [false],

      isMedicalNeglect: [false],

      isStatusOffender: [false],
      isRunaway: [false],
      isTruancy: [false],
      isOutOfParent: [false],

      isFelony: [false],


      goals: [null],
      responsibility: [null],
      dateToAccomplished: [null],
      dateAccomplished: [null],
      comments: [null],

      goals1: [null],
      responsibility1: [null],
      dateToAccomplished1: [null],
      dateAccomplished1: [null],
      comments1: [null],

      goals2: [null],
      responsibility2: [null],
      dateToAccomplished2: [null],
      dateAccomplished2: [null],
      comments2: [null],


      goalsT1: [null],
      responsibilityT1: [null],
      dateToAccomplishedT1: [null],
      dateAccomplishedT1: [null],
      commentsT1: [null],

      goals1T1: [null],
      responsibility1T1: [null],
      dateToAccomplished1T1: [null],
      dateAccomplished1T1: [null],
      comments1T1: [null],

      goals2T1: [null],
      responsibility2T1: [null],
      dateToAccomplished2T1: [null],
      dateAccomplished2T1: [null],
      comments2T1: [null],


      ParentSignature: [null],
      ParentSignatureDate: [null],

      ParentSignature1: [null],
      ParentSignatureDate1: [null],

      StaffSignature: [null],
      StaffSignatureDate: [null],

      StaffSignature1: [null],
      StaffSignatureDate1: [null]


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


      //  !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
      //  !isNullOrUndefined(formData.dateToAccomplished) ? formData.dateToAccomplished = new Date(formData.dateToAccomplished) : null;
      //  !isNullOrUndefined(formData.dateAccomplished) ? formData.dateAccomplished = new Date(formData.dateAccomplished) : null;

      //  !isNullOrUndefined(formData.dateToAccomplished1) ? formData.dateToAccomplished1 = new Date(formData.dateToAccomplished1) : null;
      //  !isNullOrUndefined(formData.dateAccomplished1) ? formData.dateAccomplished1 = new Date(formData.dateAccomplished1) : null;

      //  !isNullOrUndefined(formData.dateToAccomplished2) ? formData.dateToAccomplished2 = new Date(formData.dateToAccomplished2) : null;
      //  !isNullOrUndefined(formData.dateAccomplished2) ? formData.dateAccomplished2 = new Date(formData.dateAccomplished2) : null;

      //  !isNullOrUndefined(formData.dateToAccomplishedT1) ? formData.dateToAccomplishedT1 = new Date(formData.dateToAccomplishedT1) : null;
      //  !isNullOrUndefined(formData.dateAccomplishedT1) ? formData.dateAccomplishedT1 = new Date(formData.dateAccomplishedT1) : null;

      //  !isNullOrUndefined(formData.dateToAccomplished1T1) ? formData.dateToAccomplished1T1 = new Date(formData.dateToAccomplished1T1) : null;
      //  !isNullOrUndefined(formData.dateAccomplished1T1) ? formData.dateAccomplished1T1 = new Date(formData.dateAccomplished1T1) : null;

      //  !isNullOrUndefined(formData.dateToAccomplished2T1) ? formData.dateToAccomplished2T1 = new Date(formData.dateToAccomplished2T1) : null;
      //  !isNullOrUndefined(formData.dateAccomplished2T1) ? formData.dateAccomplished2T1 = new Date(formData.dateAccomplished2T1) : null;

      //  !isNullOrUndefined(formData.ParentSignatureDate) ? formData.ParentSignatureDate = new Date(formData.ParentSignatureDate) : null;
      //  !isNullOrUndefined(formData.ParentSignatureDate1) ? formData.ParentSignatureDate1 = new Date(formData.ParentSignatureDate1) : null;
      //  !isNullOrUndefined(formData.StaffSignatureDate) ? formData.StaffSignatureDate = new Date(formData.StaffSignatureDate) : null;
      //  !isNullOrUndefined(formData.StaffSignatureDate1) ? formData.StaffSignatureDate1 = new Date(formData.StaffSignatureDate1) : null;

      //  this.riAchievementPlan = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.achievementPlanForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.jsPdfOrientation = 'landscape';
    this._printPdf.printForm();
  }


}
