import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReSocialEmotional } from './re-social-emotional';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-social-emotional-screening-tool',
  templateUrl: './social-emotional-screening-tool.component.html',
  styleUrls: ['./social-emotional-screening-tool.component.scss','../../family-preservation/family-preservation.scss'],
  outputs: ['socEmoScrOut']
})
export class SocialEmotionalScreeningToolComponent implements OnInit {
  socialEmotionalForm: FormGroup;
  reSocialEmotional: ReSocialEmotional = new ReSocialEmotional();
  isEdit= false;
  editControll = true;
  isPrint = true;

  @Output()
  socEmoScrOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {
    
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/social/emotional/screening/tool/detail') { this.getDetails(); }
    this.socialEmotionalForm.disable();
  }

  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reSocialEmotional = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.SignatureDate) ? formData.SignatureDate = new Date(formData.SignatureDate) : null;
    !isNullOrUndefined(formData.DateOfBirth) ? formData.DateOfBirth = new Date(formData.DateOfBirth) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    this.reSocialEmotional = formData;
  }
  editForm() {
    this.socialEmotionalForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.SignatureDate) ? source.SignatureDate = Date.parse(source.SignatureDate) : null;
    !isNullOrUndefined(source.DateOfBirth) ? source.DateOfBirth = Date.parse(source.DateOfBirth) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.socEmoScrOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.socEmoScrOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.socialEmotionalForm = this._fb.group({
      Date: [null],
      PersonMakingReferral: [null],
      Fax: [null],
      SocialServicesOther: [null],
      ChildName: [null],
      DateOfBirth: [null],
      Ssn: [null],
      CurrentAddress: [null],
      CurrentTelephone: [null],
      Caregiver: [null],
      Respondent: [null],
      IsEnglish :[false],
      IsNonEnglish :[null],
      Signature: [null],
      SignatureDate: [null],
  
      IsHistoryYes :[false],
      IsHistoryNon :[false],
      IsHistoryUnknown :[false],
  
      IsUncontrollableYes :[false],
      IsUncontrollableNon :[false],
      IsUncontrollableUnknown :[false],
  
      IsCryingYes :[false],
      IsCryingNon :[false],
      IsCryingUnknown :[false],
  
      IsDangerousYes :[false],
      IsDangerousNon :[false],
      IsDangerousUnknown :[false],
  
      IsPreoccupationYes :[false],
      IsPreoccupationNon :[false],
      IsPreoccupationUnknown :[false],
  
      IsDepressedYes :[false],
      IsDepressedNon :[false],
      IsDepressedUnknown :[false],
  
      IsNotVocalizeYes :[false],
      IsNotVocalizeNon :[false],
      IsNotVocalizeUnknown :[false],
  
      IsUnawareYes :[false],
      IsUnawareNon :[false],
      IsUnawareUnknown :[false],
  
      IsUnintelligibleYes :[false],
      IsUnintelligibleNon :[false],
      IsUnintelligibleUnknown :[false],
  
      IsInabilityYes :[false],
      IsInabilityNon :[false],
      IsInabilityUnknown :[false],
  
      Comments: [null],     

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
      //  !isNullOrUndefined(formData.SignatureDate) ? formData.SignatureDate = new Date(formData.SignatureDate) : null;
      //  !isNullOrUndefined(formData.DateOfBirth) ? formData.DateOfBirth = new Date(formData.DateOfBirth) : null;
      //  !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      //  this.reSocialEmotional = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.socialEmotionalForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
  
}
