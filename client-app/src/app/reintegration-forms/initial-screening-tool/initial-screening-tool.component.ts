import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReInitialTool } from './re-initial-tool';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-initial-screening-tool',
  templateUrl: './initial-screening-tool.component.html',
  styleUrls: ['./initial-screening-tool.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['iniScreenOut']
})
export class InitialScreeningToolComponent implements OnInit {
  initialScreeningForm: FormGroup;
  reInitialScreening: ReInitialTool = new ReInitialTool();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  iniScreenOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {
   
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/initial/screening/tool/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.initialScreeningForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reInitialScreening = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.ScreeningDate) ? formData.ScreeningDate = new Date(formData.ScreeningDate) : null;
    !isNullOrUndefined(formData.DateOfDiagnosis) ? formData.DateOfDiagnosis = new Date(formData.DateOfDiagnosis) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    this.reInitialScreening = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reInitialScreening.ChildName = data.person.firstName + " " + data.person.lastName;
        this.reInitialScreening.ScreeningDate = new Date();
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.reInitialScreening.Facts = (data.referral.facts)
      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }


  editForm() {
    this.initialScreeningForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.ScreeningDate) ? source.ScreeningDate = Date.parse(source.ScreeningDate) : null;
    !isNullOrUndefined(source.DateOfDiagnosis) ? source.DateOfDiagnosis = Date.parse(source.DateOfDiagnosis) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.iniScreenOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.iniScreenOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.initialScreeningForm = this._fb.group({
      ChildName: [null],
      Facts: [null],
      SfcsWorker: [null],
      ScreeningDate: [null],

      isCbsY: [false],
      isCbsN: [false],
      isCbsS: [false],
      isCbsU: [false],

      isSedY: [false],
      isSedN: [false],
      isSedS: [false],
      isSedU: [false],


      isPrtfY: [false],
      isPrtfN: [false],
      isPrtfS: [false],
      isPrtfU: [false],


      isDisorderY: [false],
      isDisorderN: [false],
      isDisorderS: [false],
      isDisorderU: [false],

      isSubscaleY: [false],
      isSubscaleN: [false],
      isSubscaleS: [false],
      isSubscaleU: [false],

      isCommunityY: [false],
      isCommunityN: [false],
      isCommunityS: [false],
      isCommunityU: [false],

      isMentalHealthY: [false],
      isMentalHealthN: [false],
      isMentalHealthS: [false],
      isMentalHealthU: [false],

      isEmotionalDisorderY: [false],
      isEmotionalDisorderN: [false],
      isEmotionalDisorderS: [false],
      isEmotionalDisorderU: [false],

      isSpecializedServicesY: [false],
      isSpecializedServicesN: [false],
      isSpecializedServicesS: [false],
      isSpecializedServicesU: [false],

      isPsychotropicY: [false],
      isPsychotropicN: [false],
      isPsychotropicS: [false],
      isPsychotropicU: [false],

      isImpairmentY: [false],
      isImpairmentN: [false],
      isImpairmentS: [false],
      isImpairmentU: [false],

      isSchoolDomainY: [false],
      isSchoolDomainN: [false],
      isSchoolDomainS: [false],
      isSchoolDomainU: [false],

      isCommunityDomainY: [false],
      isCommunityDomainN: [false],
      isCommunityDomainS: [false],
      isCommunityDomainU: [false],

      isReferralNeeded: [false],
      isQualifySed: [false],
      isQualifySpecialServices: [false],

      isHeight: [false],
      isUnusualFacial: [false],
      isSizeOfHead: [false],
      isMentalRetardation: [false],
      isBehavioralConcerns: [false],
      isSleeping: [false],
      isImpulsive: [false],
      isDisability: [false],
      isLanguageDelays: [false],
      isJudgment: [false],
      isSameAge: [false],
      isFasd: [false],
      isNegativeForRisk: [false],
      isPreviousDiagnosis: [false],

      SourceOfInformation: [null],
      DateOfDiagnosis: [null],
      DiagnosticClinic: [null],

      isDrugsY: [false],
      isDrugsN: [false],
      isDrugsS: [false],
      isDrugsU: [false],

      isExperimentedDrugsY: [false],
      isExperimentedDrugsN: [false],
      isExperimentedDrugsS: [false],
      isExperimentedDrugsU: [false],

      isAlcoholProblemY: [false],
      isAlcoholProblemN: [false],
      isAlcoholProblemS: [false],
      isAlcoholProblemU: [false],

      isPositiveUaY: [false],
      isPositiveUaN: [false],
      isPositiveUaS: [false],
      isPositiveUaU: [false],

      isAlcoholAssessmentY: [false],
      isAlcoholAssessmentN: [false],
      isAlcoholAssessmentS: [false],
      isAlcoholAssessmentU: [false],

      isAlcoholTreatmentY: [false],
      isAlcoholTreatmentN: [false],
      isAlcoholTreatmentS: [false],
      isAlcoholTreatmentU: [false],

      isDrugOfChoiceY: [false],
      isDrugOfChoiceN: [false],
      isDrugOfChoiceS: [false],
      isDrugOfChoiceU: [false],

      isFrequencyY: [false],
      isFrequencyN: [false],
      isFrequencyS: [false],
      isFrequencyU: [false],

      isHistoryY: [false],
      isHistoryN: [false],
      isHistoryS: [false],
      isHistoryU: [false],

      AlcoholComments: [null],

      isDdY: [false],
      isDdN: [false],

      isDisabilityY: [false],
      isDisabilityN: [false],

      isEducationAuthorityY: [false],
      isEducationAuthorityN: [false],

      isMentalRetardationY: [false],
      isMentalRetardationN: [false],

      isSustainLifeY: [false],
      isSustainLifeN: [false],

      IntellectualComments: [null],
      Signature: [null],
      Date: [null],

      comments: [null],
      isAlcoholMisuse: [false],
      isAlcoholMisuse1: [false],
      isAlcoholMisuse2: [false],
      isAlcoholMisuse3: [false],
      isAlcoholMisuse4: [false],
      isAlcoholMisuse5: [false],
      PositiveRiskChild: [null],

      mentalHealthTreatmentY: [false],
      mentalHealthTreatmentN: [false],
      mentalHealthTreatmentS: [false],
      mentalHealthTreatmentU: [false],
      printedBy: [null],
      printedDate: [null],
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
