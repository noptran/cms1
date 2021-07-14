import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { IndSelfSuffPlan } from './ind-self-suff-plan';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-self-sufficiency-plan',
  templateUrl: './self-sufficiency-plan.component.html',
  styleUrls: ['./self-sufficiency-plan.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['selfSuffOut']
})
export class SelfSufficiencyPlanComponent implements OnInit {
  selfSufficiencyPlanForm: FormGroup;
  indSelfSufficiencyPlan: IndSelfSuffPlan = new IndSelfSuffPlan();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  selfSuffOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/independent-living/detail') {
      this.getCmsFormJson();
      this.selfSufficiencyPlanForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/rfc/independent-living/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/independent-living/self/sufficiency/plan/detail') { this.getDetails(); }
    this.autoFetchDetails();
    
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.indSelfSufficiencyPlan = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.PlanningConferenceDate) ? formData.PlanningConferenceDate = new Date(formData.PlanningConferenceDate) : null;
    !isNullOrUndefined(formData.PlanningConferenceFrom) ? formData.PlanningConferenceFrom = new Date(formData.PlanningConferenceFrom) : null;
    !isNullOrUndefined(formData.PlanningConferenceTo) ? formData.PlanningConferenceTo = new Date(formData.PlanningConferenceTo) : null;

    !isNullOrUndefined(formData.EffectiveFrom) ? formData.EffectiveFrom = new Date(formData.EffectiveFrom) : null;
    !isNullOrUndefined(formData.EffectiveTo) ? formData.EffectiveTo = new Date(formData.EffectiveTo) : null;
    !isNullOrUndefined(formData.DateLastCompleted) ? formData.DateLastCompleted = new Date(formData.DateLastCompleted) : null;

    !isNullOrUndefined(formData.YesDate) ? formData.YesDate = new Date(formData.YesDate) : null;
    !isNullOrUndefined(formData.GedDate) ? formData.GedDate = new Date(formData.GedDate) : null;
    !isNullOrUndefined(formData.TargetDate) ? formData.TargetDate = new Date(formData.TargetDate) : null;
    !isNullOrUndefined(formData.TargetDate1) ? formData.TargetDate1 = new Date(formData.TargetDate1) : null;
    !isNullOrUndefined(formData.TargetDate2) ? formData.TargetDate2 = new Date(formData.TargetDate2) : null;
    !isNullOrUndefined(formData.TargetDate3) ? formData.TargetDate3 = new Date(formData.TargetDate3) : null;
    !isNullOrUndefined(formData.AdultDate) ? formData.AdultDate = new Date(formData.AdultDate) : null;
    !isNullOrUndefined(formData.IlSupervisorDate) ? formData.IlSupervisorDate = new Date(formData.IlSupervisorDate) : null;
    !isNullOrUndefined(formData.IlCoordinatorDate) ? formData.IlCoordinatorDate = new Date(formData.IlCoordinatorDate) : null;
    !isNullOrUndefined(formData.MentorDate) ? formData.MentorDate = new Date(formData.MentorDate) : null;
    !isNullOrUndefined(formData.OtherParticipantDate) ? formData.OtherParticipantDate = new Date(formData.OtherParticipantDate) : null;
    this.indSelfSufficiencyPlan = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.indSelfSufficiencyPlan.CaseName = data.person.firstName + " " + data.person.lastName;
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.indSelfSufficiencyPlan.FactsCase = (data.referral.facts)
      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }


  editForm() {
    this.selfSufficiencyPlanForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.PlanningConferenceDate) ? source.PlanningConferenceDate = Date.parse(source.PlanningConferenceDate) : null;
    !isNullOrUndefined(source.PlanningConferenceFrom) ? source.PlanningConferenceFrom = Date.parse(source.PlanningConferenceFrom) : null;
    !isNullOrUndefined(source.PlanningConferenceTo) ? source.PlanningConferenceTo = Date.parse(source.PlanningConferenceTo) : null;

    !isNullOrUndefined(source.EffectiveFrom) ? source.EffectiveFrom = Date.parse(source.EffectiveFrom) : null;
    !isNullOrUndefined(source.EffectiveTo) ? source.EffectiveTo = Date.parse(source.EffectiveTo) : null;
    !isNullOrUndefined(source.DateLastCompleted) ? source.DateLastCompleted = Date.parse(source.DateLastCompleted) : null;

    !isNullOrUndefined(source.YesDate) ? source.YesDate = Date.parse(source.YesDate) : null;
    !isNullOrUndefined(source.GedDate) ? source.GedDate = Date.parse(source.GedDate) : null;
    !isNullOrUndefined(source.TargetDate) ? source.TargetDate = Date.parse(source.TargetDate) : null;
    !isNullOrUndefined(source.TargetDate1) ? source.TargetDate1 = Date.parse(source.TargetDate1) : null;
    !isNullOrUndefined(source.TargetDate2) ? source.TargetDate2 = Date.parse(source.TargetDate2) : null;
    !isNullOrUndefined(source.TargetDate3) ? source.TargetDate3 = Date.parse(source.TargetDate3) : null;
    !isNullOrUndefined(source.AdultDate) ? source.AdultDate = Date.parse(source.AdultDate) : null;
    !isNullOrUndefined(source.IlSupervisorDate) ? source.IlSupervisorDate = Date.parse(source.IlSupervisorDate) : null;
    !isNullOrUndefined(source.IlCoordinatorDate) ? source.IlCoordinatorDate = Date.parse(source.IlCoordinatorDate) : null;
    !isNullOrUndefined(source.MentorDate) ? source.MentorDate = Date.parse(source.MentorDate) : null;
    !isNullOrUndefined(source.OtherParticipantDate) ? source.OtherParticipantDate = Date.parse(source.OtherParticipantDate) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.selfSuffOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
    // this._router.navigate(["/reports/attachment-document/case-plan-goals"]);
  }
  discardForm() {
    this.selfSuffOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.selfSufficiencyPlanForm = this._fb.group({
      CaseName: [null],
      FactsCase: [null],
      Roommates: [null],
      LocalDcfOffice: [null],
      DcfIlCoordinator: [null],
      PlanningConferenceDate: [null],
      PlanningConferenceFrom: [null],
      PlanningConferenceTo: [null],
      EffectiveFrom: [null],
      EffectiveTo: [null],
      DateLastCompleted: [null],
      CurrentSummary: [null],
      AdultStrengths: [null],

      IsJurisdictionAdjudicatedYes: [false],
      IsJurisdictionAdjudicatedNo: [false],
      YesDate: [null],

      HighestGrade: [null],
      GedDate: [null],

      IsSelfSufficiencyGoal: [false],
      IsSubsidy: [false],
      IsEtv: [false],
      IsBasicChafee: [false],
      IsTuitionWaiver: [false],
      IsFosterFamily: [false],

      SelfSufficiencyObjective: [null],

      IsHousingEducation: [false],
      IsSpecialEducation: [false],

      IsRiskPrevention: [false],
      IsNeedsAssessment: [false],
      IsFamilySupport: [false],
      IsAcademicSupports: [false],
      IsMentoring: [false],
      IsEducationSupport: [false],
      IsSuperviseIndependent: [false],
      IsCareerPreparation: [false],
      IsRoomBoard: [false],
      IsVocational: [false],
      IsEducationFinancial: [false],
      IsBudgetManagement: [false],
      IsOtherFinancial: [false],


      Task: [null],
      ShortTermTasks: [null],
      ResponsiblePerson: [null],
      TargetDate: [null],

      Task1: [null],
      ShortTermTasks1: [null],
      ResponsiblePerson1: [null],
      TargetDate1: [null],

      Task2: [null],
      ShortTermTasks2: [null],
      ResponsiblePerson2: [null],
      TargetDate2: [null],

      Task3: [null],
      ShortTermTasks3: [null],
      ResponsiblePerson3: [null],
      TargetDate3: [null],

      IsEtvPlanYes: [false],
      IsEtvPlanNo: [false],
      AdultSignature: [null],
      AdultDate: [null],
      IlSupervisorDate: [null],
      IlCoordinatorDate: [null],
      MentorDate: [null],
      OtherParticipantDate: [null],
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
      // !isNullOrUndefined(formData.PlanningConferenceDate) ? formData.PlanningConferenceDate = new Date(formData.PlanningConferenceDate) : null;
      // !isNullOrUndefined(formData.PlanningConferenceFrom) ? formData.PlanningConferenceFrom = new Date(formData.PlanningConferenceFrom) : null;
      // !isNullOrUndefined(formData.PlanningConferenceTo) ? formData.PlanningConferenceTo = new Date(formData.PlanningConferenceTo) : null;

      // !isNullOrUndefined(formData.EffectiveFrom) ? formData.EffectiveFrom = new Date(formData.EffectiveFrom) : null;
      // !isNullOrUndefined(formData.EffectiveTo) ? formData.EffectiveTo = new Date(formData.EffectiveTo) : null;
      // !isNullOrUndefined(formData.DateLastCompleted) ? formData.DateLastCompleted = new Date(formData.DateLastCompleted) : null;

      // !isNullOrUndefined(formData.YesDate) ? formData.YesDate = new Date(formData.YesDate) : null;
      // !isNullOrUndefined(formData.GedDate) ? formData.GedDate = new Date(formData.GedDate) : null;
      // !isNullOrUndefined(formData.TargetDate) ? formData.TargetDate = new Date(formData.TargetDate) : null;
      // !isNullOrUndefined(formData.TargetDate1) ? formData.TargetDate1 = new Date(formData.TargetDate1) : null;
      // !isNullOrUndefined(formData.TargetDate2) ? formData.TargetDate2 = new Date(formData.TargetDate2) : null;
      // !isNullOrUndefined(formData.TargetDate3) ? formData.TargetDate3 = new Date(formData.TargetDate3) : null;
      // !isNullOrUndefined(formData.AdultDate) ? formData.AdultDate = new Date(formData.AdultDate) : null;
      // !isNullOrUndefined(formData.IlSupervisorDate) ? formData.IlSupervisorDate = new Date(formData.IlSupervisorDate) : null;
      // !isNullOrUndefined(formData.IlCoordinatorDate) ? formData.IlCoordinatorDate = new Date(formData.IlCoordinatorDate) : null;
      // !isNullOrUndefined(formData.MentorDate) ? formData.MentorDate = new Date(formData.MentorDate) : null;
      // !isNullOrUndefined(formData.OtherParticipantDate) ? formData.OtherParticipantDate = new Date(formData.OtherParticipantDate) : null;

      //  this.indSelfSufficiencyPlan = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.selfSufficiencyPlanForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
