import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReKyac } from './re-kyac';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-kyac',
  templateUrl: './kyac.component.html',
  styleUrls: ['./kyac.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['kyacOut']
})
export class KYACComponent implements OnInit {
  KYACForm: FormGroup;
  reKYAC: ReKyac = new ReKyac();
  isEdit = false;
  editControll = true;
  isPrint = true;

  @Output()
  kyacOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/caseplangoals/kyac/detail') { this.getDetails(); }
    this.KYACForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reKYAC = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.VisitDate) ? formData.VisitDate = new Date(formData.VisitDate) : null;
    !isNullOrUndefined(formData.StartedTime) ? formData.StartedTime = new Date(formData.StartedTime) : null;
    !isNullOrUndefined(formData.EndedTime) ? formData.EndedTime = new Date(formData.EndedTime) : null;
    this.reKYAC = formData;
  }
  editForm() {
    this.KYACForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.VisitDate) ? source.VisitDate = Date.parse(source.VisitDate) : null;
    !isNullOrUndefined(source.StartedTime) ? source.StartedTime = Date.parse(source.StartedTime) : null;
    !isNullOrUndefined(source.EndedTime) ? source.EndedTime = Date.parse(source.EndedTime) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.kyacOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.kyacOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.KYACForm = this._fb.group({
      MyName: [null],
      AgencyName: [null],
      VisitDate: [null],
      IsVisitKnowYes: [false],
      IsVisitKnowNo: [false],

      StartedTime: [null],
      EndedTime: [null],

      IsLastVisitProblemYes: [false],
      IsLastVisitProblemNo: [false],
      LastVisitProblem: [null],

      IsWorkerHelpYes: [false],
      IsWorkerHelpNo: [false],
      WorkerHelp: [null],
      isConflicts: [false],
      isBirthCertificate: [false],
      isSocialSecurityCard: [false],
      isHealthInsuranceCard: [false],
      isImmunizationRecord: [false],
      isSchoolGradeCard: [false],
      isDiploma: [false],
      isDriversLicense: [false],
      isStateIdCaryd: [false],
      isMedicalRecords: [false],
      isDentalRecords: [false],
      isMentalHealthInfo: [false],
      isServiceCard: [false],
      isHistoryOfAddresses: [false],
      isBankAccountInfo: [false],
      isContactInformation: [false],
      isSchoolHistory: [false],
      isOther: [false],

      other: [null],

      isFeelSafe: [false],
      isGetAlong: [false],
      isOwnBed: [false],
      isSpeakNicely: [false],
      isRespectsPrivacy: [false],
      isAttitudeGood: [false],
      isSupervisionGood: [false],
      isIssuesResolved: [false],
      isDisciplineFair: [false],
      isTreatedFairly: [false],
      isVoiceConsequences: [false],
      isLikeLiving: [false],
      isMailUnopened: [false],

      isHelpAndAdvice: [false],
      isSchool: [false],
      isEmotionalSupport: [false],
      isWork: [false],
      isRespite: [false],
      isVisits: [false],
      isFeelings: [false],
      isCourt: [false],
      isTransportation: [false],
      isCar: [false],
      isCarIssues: [false],
      isCarInsurance: [false],
      isInsuranceIssues: [false],

      isConcernsSchool: [false],
      isHealthConcern: [false],
      isFamilyConcern: [false],
      isAffectSuccess: [false],
      isTakingMedication: [false],
      isCareGiversHelp: [false],
      isTutoringNeeds: [false],
      isOkayWithMedication: [false],
      isVisitsRestricted: [false],
      isIssuesAfterSchool: [false],
      isDentalConcerns: [false],
      isImportantDates: [false],
      isHappyWithSchool: [false],
      isTherapyConcerns: [false],
      isMissingSchool: [false],
      isAttendTherapy: [false],
      isNextAppointments: [false],

      isNextCourtDate: [false],
      isTransitionPlan: [false],
      isContactWorker: [false],
      isAttorney: [false],
      isCopyCasePlan: [false],
      isPhoneAndEmail: [false],
      isLetterToJudge: [false],
      isCurrentlyWorking: [false],
      isContactWorkers: [false],
      isLetterToJudge1: [false],
      isCurrentlyWorking1: [false],
      isWorkersSupervisor: [false],
      isPreferContacted: [false],

      phone1: [null],
      phone2: [null],
      isMissSchool: [false],
      isConcernsWithTasks: [false],
      email1: [null],
      email2: [null],

      cell1: [null],
      cell2: [null],

      isConcernsAboutCourt: [false],
      isNextCasePlan: [false],
      isListenedJudge: [false],
      isNeedTransportation: [false],
      isVoiceHeard: [false],
      isLifeSkills: [false],
      IsSpeakingPrivateYes: [false],
      IsSpeakingPrivateNo: [false],
      IsCareSatisfiedYes: [false],
      IsCareSatisfiedMostly: [false],
      IsCareSatisfiedNo: [false],

      SatisfiedCare: [null],
      Signature: [null],
      Worker: [null],
      DeclinedSign: [null],
      CopyForm: [null],
      CaseWorker: [null],
      CaseWorkerSupervisor: [null],
      IlWorker: [null],
      Gal: [null],
      Casa: [null],
      ResourceHomeWorker: [null],
      FosterParents: [null],
      Other1: [null],



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
      //  !isNullOrUndefined(formData.VisitDate) ? formData.VisitDate = new Date(formData.VisitDate) : null;
      //  !isNullOrUndefined(formData.StartedTime) ? formData.StartedTime = new Date(formData.StartedTime) : null;
      //  !isNullOrUndefined(formData.EndedTime) ? formData.EndedTime = new Date(formData.EndedTime) : null;
      //  this.reKYAC = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.KYACForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
