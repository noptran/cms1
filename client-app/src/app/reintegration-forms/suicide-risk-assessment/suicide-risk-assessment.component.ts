import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReSuicideAss } from './re-suicide-ass';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-suicide-risk-assessment',
  templateUrl: './suicide-risk-assessment.component.html',
  styleUrls: ['./suicide-risk-assessment.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['suicideRiskOut']
})
export class SuicideRiskAssessmentComponent implements OnInit {
  suicideRiskAssessmentForm: FormGroup;
  reSuicideRiskAssessment: ReSuicideAss = new ReSuicideAss();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  suicideRiskOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/suicide/risk/assessment/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.suicideRiskAssessmentForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reSuicideRiskAssessment = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateSuicideRisk) ? formData.dateSuicideRisk = new Date(formData.dateSuicideRisk) : null;

    !isNullOrUndefined(formData.suicideRiskDate) ? formData.suicideRiskDate = new Date(formData.suicideRiskDate) : null;
  
    !isNullOrUndefined(formData.suicideRiskReferralDate) ? formData.suicideRiskReferralDate = new Date(formData.suicideRiskReferralDate) : null;
    !isNullOrUndefined(formData.suicidesafetyDOB) ? formData.suicidesafetyDOB = new Date(formData.suicidesafetyDOB) : null;
    !isNullOrUndefined(formData.suicidesafetyAssmntDate) ? formData.suicidesafetyAssmntDate = new Date(formData.suicidesafetyAssmntDate) : null;
    // tslint:disable-next-line:max-line-length
    !isNullOrUndefined(formData.suicideInterventionClientDate) ? formData.suicideInterventionClientDate = new Date(formData.suicideInterventionClientDate) : null;
    // tslint:disable-next-line:max-line-length
    !isNullOrUndefined(formData.suicideInterventionParentDate) ? formData.suicideInterventionParentDate = new Date(formData.suicideInterventionParentDate) : null;
    !isNullOrUndefined(formData.conductedRescreenDate) ? formData.conductedRescreenDate = new Date(formData.conductedRescreenDate) : null;
    this.reSuicideRiskAssessment = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reSuicideRiskAssessment.suicideRiskCaseName = data.person.firstName + " " + data.person.lastName;
        this.reSuicideRiskAssessment.suicideRiskCaseNumber = data.person.kaecses;
        this.reSuicideRiskAssessment.suicideRiskDate = new Date();

        this.reSuicideRiskAssessment.suicidesafetyClientName = data.person.firstName + " " + data.person.lastName;
        this.reSuicideRiskAssessment.suicidesafetyAssmntDate = new Date();
        this.reSuicideRiskAssessment.suicidesafetyDOB = new Date(data.person.dob);
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.reSuicideRiskAssessment.suicideRiskReferralDate = new Date(data.referral.referralDate)
      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }


  editForm() {
    this.suicideRiskAssessmentForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    
    !isNullOrUndefined(source.dateSuicideRisk) ? source.dateSuicideRisk = Date.parse(source.dateSuicideRisk) : null;

    !isNullOrUndefined(source.suicideRiskDate) ? source.suicideRiskDate = Date.parse(source.suicideRiskDate) : null;
  
    !isNullOrUndefined(source.suicideRiskReferralDate) ? source.suicideRiskReferralDate = Date.parse(source.suicideRiskReferralDate) : null;
    !isNullOrUndefined(source.suicidesafetyDOB) ? source.suicidesafetyDOB = Date.parse(source.suicidesafetyDOB) : null;
    !isNullOrUndefined(source.suicidesafetyAssmntDate) ? source.suicidesafetyAssmntDate = Date.parse(source.suicidesafetyAssmntDate) : null;
    // tslint:disable-next-line:max-line-length
    !isNullOrUndefined(source.suicideInterventionClientDate) ? source.suicideInterventionClientDate = Date.parse(source.suicideInterventionClientDate) : null;
    // tslint:disable-next-line:max-line-length
    !isNullOrUndefined(source.suicideInterventionParentDate) ? source.suicideInterventionParentDate = Date.parse(source.suicideInterventionParentDate) : null;
    !isNullOrUndefined(source.conductedRescreenDate) ? source.conductedRescreenDate = Date.parse(source.conductedRescreenDate) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.suicideRiskOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.suicideRiskOut.emit({ cmsData: {} });
  }

  formValidation() {
    this.suicideRiskAssessmentForm = this._fb.group({

      suicideRiskCaseName: [null],
      suicideRiskCaseNumber: [null],
      suicideRiskReferralDate: [null],
      suicideRiskDate: [null],

      suicideRiskAssessmentName: [null],
      isSuicideRiskNoActionYes: [null],
      isSuicideRiskNoActionNo: [null],
      isDangerSelfClear: [null],
      isDangerSelfPotentially: [null],
      isDangerSelfAttempts: [null],
      isDangerSelfHopelessness: [null],
      isDangerSelfSubstance: [null],
      isDangerSelfLoss: [null],
      isDangerSelfIdeation: [null],
      isDangerSelfHarm: [null],
      isDangerSelfChronic: [null],
      isDangerSelfNone: [null],
      isDangerOthersClear: [null],
      isDangerOthersPlan: [null],
      isDangerOthersAttempts: [null],
      isDangerOthersSubstance: [null],
      isDangerOthersIdeation: [null],
      isDangerOthersNone: [null],
      isProtectiveNone: [null],
      isProtectiveFamily: [null],
      isProtectiveCommunity: [null],
      isProtectiveReligious: [null],
      isProtectiveTolerance: [null],
      isProtectivePositive: [null],
      isProtectiveCopeStress: [null],
      isProtectiveCompliant: [null],
      isProtectiveIntelligence: [null],
      isProtectiveSafety: [null],
      isRiskHigh: [null],
      isRiskModerate: [null],
      isRiskMild: [null],
      isRiskLow: [null],

      suicideRiskAssessmentName1: [null],
      isSuicideRiskNoActionYes1: [null],
      isSuicideRiskNoActionNo1: [null],
      isDangerSelfClear1: [null],
      isDangerSelfPotentially1: [null],
      isDangerSelfAttempts1: [null],
      isDangerSelfHopelessness1: [null],
      isDangerSelfSubstance1: [null],
      isDangerSelfLoss1: [null],
      isDangerSelfIdeation1: [null],
      isDangerSelfHarm1: [null],
      isDangerSelfChronic1: [null],
      isDangerSelfNone1: [null],
      isDangerOthersClear1: [null],
      isDangerOthersPlan1: [null],
      isDangerOthersAttempts1: [null],
      isDangerOthersSubstance1: [null],
      isDangerOthersIdeation1: [null],
      isDangerOthersNone1: [null],
      isProtectiveNone1: [null],
      isProtectiveFamily1: [null],
      isProtectiveCommunity1: [null],
      isProtectiveReligious1: [null],
      isProtectiveTolerance1: [null],
      isProtectivePositive1: [null],
      isProtectiveCopeStress1: [null],
      isProtectiveCompliant1: [null],
      isProtectiveIntelligence1: [null],
      isProtectiveSafety1: [null],
      isRiskHigh1: [null],
      isRiskModerate1: [null],
      isRiskMild1: [null],
      isRiskLow1: [null],

      suicideRiskAssessmentName2: [null],
      isSuicideRiskNoActionYes2: [null],
      isSuicideRiskNoActionNo2: [null],
      isDangerSelfClear2: [null],
      isDangerSelfPotentially2: [null],
      isDangerSelfAttempts2: [null],
      isDangerSelfHopelessness2: [null],
      isDangerSelfSubstance2: [null],
      isDangerSelfLoss2: [null],
      isDangerSelfIdeation2: [null],
      isDangerSelfHarm2: [null],
      isDangerSelfChronic2: [null],
      isDangerSelfNone2: [null],
      isDangerOthersClear2: [null],
      isDangerOthersPlan2: [null],
      isDangerOthersAttempts2: [null],
      isDangerOthersSubstance2: [null],
      isDangerOthersIdeation2: [null],
      isDangerOthersNone2: [null],
      isProtectiveNone2: [null],
      isProtectiveFamily2: [null],
      isProtectiveCommunity2: [null],
      isProtectiveReligious2: [null],
      isProtectiveTolerance2: [null],
      isProtectivePositive2: [null],
      isProtectiveCopeStress2: [null],
      isProtectiveCompliant2: [null],
      isProtectiveIntelligence2: [null],
      isProtectiveSafety2: [null],
      isRiskHigh2: [null],
      isRiskModerate2: [null],
      isRiskMild2: [null],
      isRiskLow2: [null],

      staffSignatureSuicideRisk: [null],
      dateSuicideRisk: [null],
      suicidesafetyClientName: [null],
      suicidesafetyRecNo: [null],
      suicidesafetyDOB: [null],
      suicidesafetyAssmntDate: [null],

      suicideSafetyPlan: [null],
      isSuicideSafetyMildRisk: [null],
      isSuicideSafetyModerateRisk: [null],
      isSuicideSafetyHighRisk: [null],
      suicideStaffMember: [null],
      staffSignatureSuicidePrecaution: [null],
      suicideRiskAssessmentCompleted: [null],
      suicideReleaseOfInformation: [null],
      lowModerateRisk: [null],
      highRisk: [null],
      suicideRiskTherapist: [null],

      indicatorsDemonstratingSafety1: [null],
      indicatorsDemonstratingSafety2: [null],
      indicatorsDemonstratingSafety3: [null],
      indicatorsDemonstratingSafety4: [null],

      suicideInterventionClientSignature: [null],
      suicideInterventionClientDate: [null],
      suicideInterventionParentSignature: [null],
      suicideInterventionParentDate: [null],
      ceasingPrecaution: [null],
      conductedRescreen: [null],
      conductedRescreenDate: [null],
      suicideRiskLpSignature: [null],
      suicideRiskClientSignature: [null],
      printedBy: [null],
      printedDate: [null],

    });
  }

  /**
   * Get existing form details
   */
  getDetails() {
    setTimeout(() => {
      let formData;
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      // let assessmentId = localStorage.getItem('asssessmentId');
      // let req = { assessmentID: assessmentId }
      // this._opencard.getAssessmentRec(req).then((data) => {
      //   formData = data.pdfForms.pdfForms;
      //   !isNullOrUndefined(formData.suicideRiskReferralDate) ? formData.suicideRiskReferralDate = new Date(formData.suicideRiskReferralDate) : null;
      //   !isNullOrUndefined(formData.suicidesafetyDOB) ? formData.suicidesafetyDOB = new Date(formData.suicidesafetyDOB) : null;
      //   !isNullOrUndefined(formData.suicidesafetyAssmntDate) ? formData.suicidesafetyAssmntDate = new Date(formData.suicidesafetyAssmntDate) : null;
      //   // tslint:disable-next-line:max-line-length
      //   !isNullOrUndefined(formData.suicideInterventionClientDate) ? formData.suicideInterventionClientDate = new Date(formData.suicideInterventionClientDate) : null;
      //   // tslint:disable-next-line:max-line-length
      //   !isNullOrUndefined(formData.suicideInterventionParentDate) ? formData.suicideInterventionParentDate = new Date(formData.suicideInterventionParentDate) : null;
      //   !isNullOrUndefined(formData.conductedRescreenDate) ? formData.conductedRescreenDate = new Date(formData.conductedRescreenDate) : null;
      //   this.reSuicideRiskAssessment = formData;
      //   loader.style.display = 'none';
      //   this.isEdit = true;
      //   // this.isPrint = true;
      //   this.suicideRiskAssessmentForm.disable();
    // })
  }, 5000)
}

printForm() {
  this._printPdf.fileName = 'CMSForm';
  this._printPdf.htmlElementToBePrinted = 'form-content';
  this._printPdf.printForm();
}


}
