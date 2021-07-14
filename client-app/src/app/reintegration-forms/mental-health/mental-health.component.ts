import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReMentalHealth } from './re-mental-health';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-mental-health',
  templateUrl: './mental-health.component.html',
  styleUrls: ['./mental-health.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['mentalHealthAssOut']
})
export class MentalHealthComponent implements OnInit {
  mentalHealthForm: FormGroup;
  reMentalHealth: ReMentalHealth = new ReMentalHealth();
  isEdit = false;
  editControll = true;
  isPrint = true;

  @Output()
  mentalHealthAssOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/mental/health/detail') { this.getDetails(); }
    this.mentalHealthForm.disable();
  }

  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reMentalHealth = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DateOfRequest) ? formData.DateOfRequest = new Date(formData.DateOfRequest) : null;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.NextCourtDate) ? formData.NextCourtDate = new Date(formData.NextCourtDate) : null;
    this.reMentalHealth = formData;
  }
  editForm() {
    this.mentalHealthForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.DateOfRequest) ? source.DateOfRequest = Date.parse(source.DateOfRequest) : null;
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.NextCourtDate) ? source.NextCourtDate = Date.parse(source.NextCourtDate) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.mentalHealthAssOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.mentalHealthAssOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.mentalHealthForm = this._fb.group({

      DateOfRequest: [null],
      RequestTo: [null],
      Dob: [null],
      NextCourtDate: [null],
      Therapist: [null],

      IsTreatment: [false],
      IsProgressNote: [false],
      IsIntakeSummary: [false],
      IsPsychologicalEvaluation: [false],
      IsProgressReportForCourt: [false],
      Name: [null],
      Title: [null],
      TherapistField: [null],
      CMHCField: [null],
      AddressField: [null],
      AttnField: [null],
      officeAddressField: [null],
      phoneField: [null],
      FaxField: [null],
      EmailField: [null]

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
      // !isNullOrUndefined(formData.DateOfRequest) ? formData.DateOfRequest = new Date(formData.DateOfRequest) : null;
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      // !isNullOrUndefined(formData.NextCourtDate) ? formData.NextCourtDate = new Date(formData.NextCourtDate) : null;
      //  this.reMentalHealth = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.mentalHealthForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
