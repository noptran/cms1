import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { IndSelfSuffMat } from './ind-self-suff-mat';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-self-sufficiency-matrix',
  templateUrl: './self-sufficiency-matrix.component.html',
  styleUrls: ['./self-sufficiency-matrix.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['selfMatrixOut']
})
export class SelfSufficiencyMatrixComponent implements OnInit {
  selfSufficiencyMatrixForm: FormGroup;
  indSelfSufficiencyMatrix: IndSelfSuffMat = new IndSelfSuffMat();
  isEdit = false;
  editControll = true;
  isPrint = true;

  @Output()
  selfMatrixOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {
    
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/independent-living/detail') {
      this.getCmsFormJson();
      this.selfSufficiencyMatrixForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/rfc/independent-living/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/independent-living/self/sufficiency/matrix/detail') { this.getDetails(); }
    
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.indSelfSufficiencyMatrix = json.cmsFormJson
    
  }
  editForm() {
    this.selfSufficiencyMatrixForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.selfMatrixOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.selfMatrixOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.selfSufficiencyMatrixForm = this._fb.group({
      score: [null],
      goalMet: [null],
      score1: [null],
      goalMet1: [null],
      score2: [null],
      goalMet2: [null],
      score3: [null],
      goalMet3: [null],
      score4: [null],
      goalMet4: [null],
      score5: [null],
      goalMet5: [null],
      score6: [null],
      goalMet6: [null],
      score7: [null],
      goalMet7: [null],
      score8: [null],
      goalMet8: [null],
      score9: [null],
      goalMet9: [null],
      score10: [null],
      goalMet10: [null],
      score11: [null],
      goalMet11: [null],
      score12: [null],
      goalMet12: [null],
      score13: [null],
      goalMet13: [null],
      score14: [null],
      goalMet14: [null],
      score15: [null],
      goalMet15: [null],
      score16: [null],
      goalMet16: [null],
      score17: [null],
      goalMet17: [null],

      totalMatrixScore: [null],
      totalMatrixGoalMet: [null]
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
      //  this.indSelfSufficiencyMatrix = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.selfSufficiencyMatrixForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
  
}
