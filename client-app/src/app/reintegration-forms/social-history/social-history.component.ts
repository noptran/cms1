import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { SocialHistory } from './social-history';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-social-history',
  templateUrl: './social-history.component.html',
  styleUrls: ['./social-history.component.scss','../../family-preservation/family-preservation.scss'],
  outputs: ['socHistOut']
})
export class SocialHistoryComponent implements OnInit {
  SocialHistoryForm: FormGroup;
  reSocialHistory: SocialHistory = new SocialHistory();
  isEdit= false;
  editControll = true;
  isPrint = true;

  @Output()
  socHistOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/social/history/detail') { this.getDetails(); }
    this.SocialHistoryForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reSocialHistory = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.CompiledByDate) ? formData.CompiledByDate = new Date(formData.CompiledByDate) : null;
    !isNullOrUndefined(formData.UpdatedByDate) ? formData.UpdatedByDate = new Date(formData.UpdatedByDate) : null;
    !isNullOrUndefined(formData.UpdatedByDate1) ? formData.UpdatedByDate1 = new Date(formData.UpdatedByDate1) : null;

    !isNullOrUndefined(formData.UpdatedByDate2) ? formData.UpdatedByDate2 = new Date(formData.UpdatedByDate2) : null;
    !isNullOrUndefined(formData.DateOfBirth) ? formData.DateOfBirth = new Date(formData.DateOfBirth) : null;
    !isNullOrUndefined(formData.CaseManagerDate) ? formData.CaseManagerDate = new Date(formData.CaseManagerDate) : null;
    !isNullOrUndefined(formData.SupervisorSignatureDate) ? formData.SupervisorSignatureDate = new Date(formData.SupervisorSignatureDate) : null;
    this.reSocialHistory = formData;
  }
  editForm() {
    this.SocialHistoryForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.CompiledByDate) ? source.CompiledByDate = Date.parse(source.CompiledByDate) : null;
    !isNullOrUndefined(source.UpdatedByDate) ? source.UpdatedByDate = Date.parse(source.UpdatedByDate) : null;
    !isNullOrUndefined(source.UpdatedByDate1) ? source.UpdatedByDate1 = Date.parse(source.UpdatedByDate1) : null;

    !isNullOrUndefined(source.UpdatedByDate2) ? source.UpdatedByDate2 = Date.parse(source.UpdatedByDate2) : null;
    !isNullOrUndefined(source.DateOfBirth) ? source.DateOfBirth = Date.parse(source.DateOfBirth) : null;
    !isNullOrUndefined(source.CaseManagerDate) ? source.CaseManagerDate = Date.parse(source.CaseManagerDate) : null;
    !isNullOrUndefined(source.SupervisorSignatureDate) ? source.SupervisorSignatureDate = Date.parse(source.SupervisorSignatureDate) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.socHistOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.socHistOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.SocialHistoryForm = this._fb.group({
      Agency:[null],
      CountyOfResidence:[null],
      CompiledBy:[null],
      CompiledByDate:[null],
  
      UpdatedBy:[null],
      UpdatedByDate:[null],
  
      UpdatedBy1:[null],
      UpdatedByDate1:[null],
  
      UpdatedBy2:[null],
      UpdatedByDate2:[null],
  
      ChildInformation:[null],
      Name:[null],
      Ssn:[null],
  
      DateOfBirth:[null],
      CurrentPlacementAddress:[null],
  
      PlaceOfBirth:[null],
      PreviousPlacementAddress:[null],
      Sex:[null],
      Race:[null],
      GradeInSchool:[null],
      Religion:[null],
      Informants:[null],
      Name1:[null],
      Telephone:[null],
  
      Address:[null],
      Comments:[null],
      ResponsiblePerson:[null],
      Name2:[null],
      Telephone1:[null],
      Address1:[null],
      GuardianAdLitem:[null],
      ReasonForReferral:[null],
  
      BirthFamilyInformation:[null],
      ResultsOfMaternal:[null],
      IndianChildWelfare:[null],
      Siblings:[null],
  
      SocialEmotional:[null],
      BirthFamilyFunctioning:[null],
      EarlyDevelopment:[null],
  
      MedicalInformation:[null],
      SexualDevelopment:[null],
  
      SchoolProgress:[null],
  
      Relationships:[null],
      RelationshipsOut:[null],
      AgencyEvaluation:[null],
  
      CaseManagerSignature:[null],
      CaseManagerDate:[null],
      SupervisorSignature:[null],
      SupervisorSignatureDate:[null]
     

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

      // !isNullOrUndefined(formData.CompiledByDate) ? formData.CompiledByDate = new Date(formData.CompiledByDate) : null;
      // !isNullOrUndefined(formData.UpdatedByDate) ? formData.UpdatedByDate = new Date(formData.UpdatedByDate) : null;
      // !isNullOrUndefined(formData.UpdatedByDate1) ? formData.UpdatedByDate1 = new Date(formData.UpdatedByDate1) : null;
  
      // !isNullOrUndefined(formData.UpdatedByDate2) ? formData.UpdatedByDate2 = new Date(formData.UpdatedByDate2) : null;
      // !isNullOrUndefined(formData.DateOfBirth) ? formData.DateOfBirth = new Date(formData.DateOfBirth) : null;
      // !isNullOrUndefined(formData.CaseManagerDate) ? formData.CaseManagerDate = new Date(formData.CaseManagerDate) : null;
      // !isNullOrUndefined(formData.SupervisorSignatureDate) ? formData.SupervisorSignatureDate = new Date(formData.SupervisorSignatureDate) : null;
  
      //  this.reSocialHistory = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.SocialHistoryForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
  
}
