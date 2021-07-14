import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReFamilySafetyPlan } from './re-family-safety-plan';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-family-safety-plan-reintegration',
  templateUrl: './family-safety-plan-reintegration.component.html',
  styleUrls: ['./family-safety-plan-reintegration.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['famSafetyReintOut']
})
export class FamilySafetyPlanReintegrationComponent implements OnInit {
  familySafetyPlanReintegForm: FormGroup;
  reFamilySafetyPlanReinteg: ReFamilySafetyPlan = new ReFamilySafetyPlan();
  isEdit = false;
  editControll = true;
  isPrint = true;

  @Output()
  famSafetyReintOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/family/safety/plan/detail') { this.getDetails(); }
    this.familySafetyPlanReintegForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reFamilySafetyPlanReinteg = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DateOfBirth) ? formData.DateOfBirth = new Date(formData.DateOfBirth) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

    !isNullOrUndefined(formData.DateOfAction) ? formData.DateOfAction = new Date(formData.DateOfAction) : null;
    !isNullOrUndefined(formData.DateOfAction1) ? formData.DateOfAction1 = new Date(formData.DateOfAction1) : null;
    !isNullOrUndefined(formData.DateOfAction2) ? formData.DateOfAction2 = new Date(formData.DateOfAction2) : null;
    !isNullOrUndefined(formData.DateOfAction3) ? formData.DateOfAction3 = new Date(formData.DateOfAction3) : null;
    !isNullOrUndefined(formData.DateOfAction4) ? formData.DateOfAction4 = new Date(formData.DateOfAction4) : null;
    !isNullOrUndefined(formData.DateOfAction5) ? formData.DateOfAction5 = new Date(formData.DateOfAction5) : null;

    !isNullOrUndefined(formData.SignatureDate) ? formData.SignatureDate = new Date(formData.SignatureDate) : null;
    !isNullOrUndefined(formData.SignatureDate1) ? formData.SignatureDate1 = new Date(formData.SignatureDate1) : null;
    !isNullOrUndefined(formData.SignatureDate2) ? formData.SignatureDate2 = new Date(formData.SignatureDate2) : null;
    !isNullOrUndefined(formData.SignatureDate3) ? formData.SignatureDate3 = new Date(formData.SignatureDate3) : null;
    !isNullOrUndefined(formData.SignatureDate4) ? formData.SignatureDate4 = new Date(formData.SignatureDate4) : null;
    !isNullOrUndefined(formData.SignatureDate5) ? formData.SignatureDate5 = new Date(formData.SignatureDate5) : null;
    this.reFamilySafetyPlanReinteg = formData;
  }
  editForm() {
    this.familySafetyPlanReintegForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {

    !isNullOrUndefined(source.DateOfBirth) ? source.DateOfBirth = Date.parse(source.DateOfBirth) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;

    !isNullOrUndefined(source.DateOfAction) ? source.DateOfAction = Date.parse(source.DateOfAction) : null;
    !isNullOrUndefined(source.DateOfAction1) ? source.DateOfAction1 = Date.parse(source.DateOfAction1) : null;
    !isNullOrUndefined(source.DateOfAction2) ? source.DateOfAction2 = Date.parse(source.DateOfAction2) : null;
    !isNullOrUndefined(source.DateOfAction3) ? source.DateOfAction3 = Date.parse(source.DateOfAction3) : null;
    !isNullOrUndefined(source.DateOfAction4) ? source.DateOfAction4 = Date.parse(source.DateOfAction4) : null;
    !isNullOrUndefined(source.DateOfAction5) ? source.DateOfAction5 = Date.parse(source.DateOfAction5) : null;

    !isNullOrUndefined(source.SignatureDate) ? source.SignatureDate = Date.parse(source.SignatureDate) : null;
    !isNullOrUndefined(source.SignatureDate1) ? source.SignatureDate1 = Date.parse(source.SignatureDate1) : null;
    !isNullOrUndefined(source.SignatureDate2) ? source.SignatureDate2 = Date.parse(source.SignatureDate2) : null;
    !isNullOrUndefined(source.SignatureDate3) ? source.SignatureDate3 = Date.parse(source.SignatureDate3) : null;
    !isNullOrUndefined(source.SignatureDate4) ? source.SignatureDate4 = Date.parse(source.SignatureDate4) : null;
    !isNullOrUndefined(source.SignatureDate5) ? source.SignatureDate5 = Date.parse(source.SignatureDate5) : null;



    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.famSafetyReintOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.famSafetyReintOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.familySafetyPlanReintegForm = this._fb.group({

      ClientName: [null],
      Kaecses: [null],
      DateOfBirth: [null],
      Date: [null],
      IdentifiedSafety: [null],

      ActionPlan: [null],
      Responsible: [null],
      DateOfAction: [null],

      ActionPlan1: [null],
      Responsible1: [null],
      DateOfAction1: [null],

      ActionPlan2: [null],
      Responsible2: [null],
      DateOfAction2: [null],

      ActionPlan3: [null],
      Responsible3: [null],
      DateOfAction3: [null],

      ActionPlan4: [null],
      Responsible4: [null],
      DateOfAction4: [null],

      ActionPlan5: [null],
      Responsible5: [null],
      DateOfAction5: [null],

      NextSteps: [null],

      Signature: [null],
      SignatureDate: [null],

      Signature1: [null],
      SignatureDate1: [null],

      Signature2: [null],
      SignatureDate2: [null],

      Signature3: [null],
      SignatureDate3: [null],

      Signature4: [null],
      SignatureDate4: [null],

      Signature5: [null],
      SignatureDate5: [null],

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


      // !isNullOrUndefined(formData.DateOfBirth) ? formData.DateOfBirth = new Date(formData.DateOfBirth) : null;
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

      // !isNullOrUndefined(formData.DateOfAction) ? formData.DateOfAction = new Date(formData.DateOfAction) : null;
      // !isNullOrUndefined(formData.DateOfAction1) ? formData.DateOfAction1 = new Date(formData.DateOfAction1) : null;
      // !isNullOrUndefined(formData.DateOfAction2) ? formData.DateOfAction2 = new Date(formData.DateOfAction2) : null;
      // !isNullOrUndefined(formData.DateOfAction3) ? formData.DateOfAction3 = new Date(formData.DateOfAction3) : null;
      // !isNullOrUndefined(formData.DateOfAction4) ? formData.DateOfAction4 = new Date(formData.DateOfAction4) : null;
      // !isNullOrUndefined(formData.DateOfAction5) ? formData.DateOfAction5 = new Date(formData.DateOfAction5) : null;

      // !isNullOrUndefined(formData.SignatureDate) ? formData.SignatureDate = new Date(formData.SignatureDate) : null;
      // !isNullOrUndefined(formData.SignatureDate1) ? formData.SignatureDate1 = new Date(formData.SignatureDate1) : null;
      // !isNullOrUndefined(formData.SignatureDate2) ? formData.SignatureDate2 = new Date(formData.SignatureDate2) : null;
      // !isNullOrUndefined(formData.SignatureDate3) ? formData.SignatureDate3 = new Date(formData.SignatureDate3) : null;
      // !isNullOrUndefined(formData.SignatureDate4) ? formData.SignatureDate4 = new Date(formData.SignatureDate4) : null;
      // !isNullOrUndefined(formData.SignatureDate5) ? formData.SignatureDate5 = new Date(formData.SignatureDate5) : null;
      //  this.reFamilySafetyPlanReinteg = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.familySafetyPlanReintegForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
