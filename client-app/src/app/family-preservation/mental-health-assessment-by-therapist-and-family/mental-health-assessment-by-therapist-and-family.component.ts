import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { FpMentalHealth } from './fp-mental-health';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-mental-health-assessment-by-therapist-and-family',
  templateUrl: './mental-health-assessment-by-therapist-and-family.component.html',
  styleUrls: ['./mental-health-assessment-by-therapist-and-family.component.scss', '../family-preservation.scss'],
  outputs: ['mhaFormOut']
})
export class MentalHealthAssessmentByTherapistAndFamilyComponent implements OnInit {
  MentalHealthAssessmentForm: FormGroup;
  fpMentalHealth: FpMentalHealth = new FpMentalHealth();
  isEdit = false;
  isPrint = true;
  editControll = true;

  printedBy: any;
  printedDate: any;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }
  @Output()
  mhaFormOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
      this.MentalHealthAssessmentForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/rfc/assessment/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/family-preservation/assessment/detail') { this.getDetail(); }
    // this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpMentalHealth = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dob) ? formData.dob = new Date(formData.dob) : null;
    !isNullOrUndefined(formData.casePlanDate) ? formData.casePlanDate = new Date(formData.casePlanDate) : null;
    !isNullOrUndefined(formData.mhaDate) ? formData.mhaDate = new Date(formData.mhaDate) : null;
    !isNullOrUndefined(formData.dateOfServiceOutpatient) ? formData.dateOfServiceOutpatient = new Date(formData.dateOfServiceOutpatient) : null;
    !isNullOrUndefined(formData.dateOfServiceInpatient) ? formData.dateOfServiceInpatient = new Date(formData.dateOfServiceInpatient) : null;
    !isNullOrUndefined(formData.startDate) ? formData.startDate = new Date(formData.startDate) : null;
    !isNullOrUndefined(formData.goalIStartDate) ? formData.goalIStartDate = new Date(formData.goalIStartDate) : null;
    !isNullOrUndefined(formData.goalITargetDate) ? formData.goalITargetDate = new Date(formData.goalITargetDate) : null;
    !isNullOrUndefined(formData.goalIiStartDate) ? formData.goalIiStartDate = new Date(formData.goalIiStartDate) : null;
    !isNullOrUndefined(formData.goalIiTargetDate) ? formData.goalIiTargetDate = new Date(formData.goalIiTargetDate) : null;
    !isNullOrUndefined(formData.longGoalStartDate) ? formData.longGoalStartDate = new Date(formData.longGoalStartDate) : null;
    !isNullOrUndefined(formData.longGoalTargetDate) ? formData.longGoalTargetDate = new Date(formData.longGoalTargetDate) : null;
    !isNullOrUndefined(formData.consumerDate) ? formData.consumerDate = new Date(formData.consumerDate) : null;
    !isNullOrUndefined(formData.parentDate) ? formData.parentDate = new Date(formData.parentDate) : null;
    !isNullOrUndefined(formData.therapistDate) ? formData.therapistDate = new Date(formData.therapistDate) : null;

    !isNullOrUndefined(formData.conferenceAbsenceNonPhysician) ? formData.conferenceAbsenceNonPhysician = new Date(formData.conferenceAbsenceNonPhysician) : null;
    !isNullOrUndefined(formData.conferenceAbsencePhysician) ? formData.conferenceAbsencePhysician = new Date(formData.conferenceAbsencePhysician) : null;
    !isNullOrUndefined(formData.conferenceNonPhysician) ? formData.conferenceNonPhysician = new Date(formData.conferenceNonPhysician) : null;
    !isNullOrUndefined(formData.familyPsychotherapy) ? formData.therapistDfamilyPsychotherapyate = new Date(formData.familyPsychotherapy) : null;
    !isNullOrUndefined(formData.familyPsychotherapyHome) ? formData.familyPsychotherapyHome = new Date(formData.familyPsychotherapyHome) : null;
    !isNullOrUndefined(formData.groupPsychotherapy) ? formData.groupPsychotherapy = new Date(formData.groupPsychotherapy) : null;
    !isNullOrUndefined(formData.noMedical) ? formData.noMedical = new Date(formData.noMedical) : null;
    !isNullOrUndefined(formData.outpatientTherapytime) ? formData.outpatientTherapytime = new Date(formData.outpatientTherapytime) : null;
    !isNullOrUndefined(formData.psychotherapy16Min) ? formData.psychotherapy16Min = new Date(formData.psychotherapy16Min) : null;
    !isNullOrUndefined(formData.psychotherapy38Min) ? formData.psychotherapy38Min = new Date(formData.psychotherapy38Min) : null;
    !isNullOrUndefined(formData.psychotherapy53Min) ? formData.psychotherapy53Min = new Date(formData.psychotherapy53Min) : null;
    !isNullOrUndefined(formData.psychotherapyNoPatient) ? formData.psychotherapyNoPatient = new Date(formData.psychotherapyNoPatient) : null;
    !isNullOrUndefined(formData.testingByComputer) ? formData.testingByComputer = new Date(formData.testingByComputer) : null;
    !isNullOrUndefined(formData.testingByPsychologist) ? formData.testingByPsychologist = new Date(formData.testingByPsychologist) : null;
    !isNullOrUndefined(formData.testingByTechnician) ? formData.testingByTechnician = new Date(formData.testingByTechnician) : null;
    !isNullOrUndefined(formData.withMedical) ? formData.withMedical = new Date(formData.withMedical) : null;
    !isNullOrUndefined(formData.familyPsychotherapy) ? formData.familyPsychotherapy = new Date(formData.familyPsychotherapy) : null;

    !isNullOrUndefined(formData.goalIReviewScore) ? formData.goalIReviewScore = new Date(formData.goalIReviewScore) : null;
    !isNullOrUndefined(formData.goalIiReviewScore) ? formData.goalIiReviewScore = new Date(formData.goalIiReviewScore) : null;
    !isNullOrUndefined(formData.longGoalReviewScore) ? formData.longGoalReviewScore = new Date(formData.longGoalReviewScore) : null;
    !isNullOrUndefined(formData.planSignatureParent) ? formData.planSignatureParent = new Date(formData.planSignatureParent) : null;
    !isNullOrUndefined(formData.stopTime) ? formData.stopTime = new Date(formData.stopTime) : null;
    !isNullOrUndefined(formData.totalTime) ? formData.totalTime = new Date(formData.totalTime) : null;
    this.fpMentalHealth = formData;
  }
  autoFetchDetails() {
    const data = this._client.getPersonData();
    console.log('data in this._client.getByPersonData() is', data);
    this.fpMentalHealth.clientName = data.person.firstName + ' ' + data.person.lastName;
    this.fpMentalHealth.dob = new Date(data.person.dob);
    this.printedBy = localStorage.getItem('UserId') || 'Administrator';
    this.printedDate = new Date();

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpMentalHealth.factsNumber = (data.referral.facts);
      });
    this._team.getUserName()
      .then((data) => {
        console.log('data in this._team.getUserName() is', data);
        this.printedBy = data.users.firstName + ' ' + data.users.lastName;

      });
  }


  saveForm(source) {
    !isNullOrUndefined(source.dob) ? source.dob = Date.parse(source.dob) : null;
    !isNullOrUndefined(source.casePlanDate) ? source.casePlanDate = Date.parse(source.casePlanDate) : null;
    !isNullOrUndefined(source.mhaDate) ? source.mhaDate = Date.parse(source.mhaDate) : null;
    !isNullOrUndefined(source.dateOfServiceOutpatient) ? source.dateOfServiceOutpatient = Date.parse(source.dateOfServiceOutpatient) : null;
    !isNullOrUndefined(source.dateOfServiceInpatient) ? source.dateOfServiceInpatient = Date.parse(source.dateOfServiceInpatient) : null;
    !isNullOrUndefined(source.startDate) ? source.startDate = Date.parse(source.startDate) : null;
    !isNullOrUndefined(source.goalIStartDate) ? source.goalIStartDate = Date.parse(source.goalIStartDate) : null;
    !isNullOrUndefined(source.goalITargetDate) ? source.goalITargetDate = Date.parse(source.goalITargetDate) : null;
    !isNullOrUndefined(source.goalIiStartDate) ? source.goalIiStartDate = Date.parse(source.goalIiStartDate) : null;
    !isNullOrUndefined(source.goalIiTargetDate) ? source.goalIiTargetDate = Date.parse(source.goalIiTargetDate) : null;
    !isNullOrUndefined(source.longGoalStartDate) ? source.longGoalStartDate = Date.parse(source.longGoalStartDate) : null;
    !isNullOrUndefined(source.longGoalTargetDate) ? source.longGoalTargetDate = Date.parse(source.longGoalTargetDate) : null;
    !isNullOrUndefined(source.consumerDate) ? source.consumerDate = Date.parse(source.consumerDate) : null;
    !isNullOrUndefined(source.parentDate) ? source.parentDate = Date.parse(source.parentDate) : null;
    !isNullOrUndefined(source.therapistDate) ? source.therapistDate = Date.parse(source.therapistDate) : null;

    !isNullOrUndefined(source.conferenceAbsenceNonPhysician) ? source.conferenceAbsenceNonPhysician = Date.parse(source.conferenceAbsenceNonPhysician) : null;
    !isNullOrUndefined(source.conferenceAbsencePhysician) ? source.conferenceAbsencePhysician = Date.parse(source.conferenceAbsencePhysician) : null;
    !isNullOrUndefined(source.conferenceNonPhysician) ? source.conferenceNonPhysician = Date.parse(source.conferenceNonPhysician) : null;
    !isNullOrUndefined(source.familyPsychotherapy) ? source.therapistDfamilyPsychotherapyate = Date.parse(source.familyPsychotherapy) : null;
    !isNullOrUndefined(source.familyPsychotherapyHome) ? source.familyPsychotherapyHome = Date.parse(source.familyPsychotherapyHome) : null;
    !isNullOrUndefined(source.groupPsychotherapy) ? source.groupPsychotherapy = Date.parse(source.groupPsychotherapy) : null;
    !isNullOrUndefined(source.noMedical) ? source.noMedical = Date.parse(source.noMedical) : null;
    !isNullOrUndefined(source.outpatientTherapytime) ? source.outpatientTherapytime = Date.parse(source.outpatientTherapytime) : null;
    !isNullOrUndefined(source.psychotherapy16Min) ? source.psychotherapy16Min = Date.parse(source.psychotherapy16Min) : null;
    !isNullOrUndefined(source.psychotherapy38Min) ? source.psychotherapy38Min = Date.parse(source.psychotherapy38Min) : null;
    !isNullOrUndefined(source.psychotherapy53Min) ? source.psychotherapy53Min = Date.parse(source.psychotherapy53Min) : null;
    !isNullOrUndefined(source.psychotherapyNoPatient) ? source.psychotherapyNoPatient = Date.parse(source.psychotherapyNoPatient) : null;
    !isNullOrUndefined(source.testingByComputer) ? source.testingByComputer = Date.parse(source.testingByComputer) : null;
    !isNullOrUndefined(source.testingByPsychologist) ? source.testingByPsychologist = Date.parse(source.testingByPsychologist) : null;
    !isNullOrUndefined(source.testingByTechnician) ? source.testingByTechnician = Date.parse(source.testingByTechnician) : null;
    !isNullOrUndefined(source.withMedical) ? source.withMedical = Date.parse(source.withMedical) : null;
    !isNullOrUndefined(source.familyPsychotherapy) ? source.familyPsychotherapy = Date.parse(source.familyPsychotherapy) : null;

    !isNullOrUndefined(source.goalIReviewScore) ? source.goalIReviewScore = Date.parse(source.goalIReviewScore) : null;
    !isNullOrUndefined(source.goalIiReviewScore) ? source.goalIiReviewScore = Date.parse(source.goalIiReviewScore) : null;
    !isNullOrUndefined(source.longGoalReviewScore) ? source.longGoalReviewScore = Date.parse(source.longGoalReviewScore) : null;
    !isNullOrUndefined(source.planSignatureParent) ? source.planSignatureParent = Date.parse(source.planSignatureParent) : null;
    !isNullOrUndefined(source.stopTime) ? source.stopTime = Date.parse(source.stopTime) : null;
    !isNullOrUndefined(source.totalTime) ? source.totalTime = Date.parse(source.totalTime) : null;
    source.typeOfDod = 'mentalHealthAssessment';
    console.log('Mental Health source', JSON.stringify(source));
    this.mhaFormOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);

  }
  discardForm() {
    this.mhaFormOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.MentalHealthAssessmentForm = this._fb.group({

      caseHeadName: [null],
      clientName: [null],
      factsNumber: [null],
      dob: [null],
      casePlanDate: [null],
      mhaDate: [null],
      locationOfAssessment: [null],

      faceToFace: [false],
      telemedicine: [false],
      interactiveComplexity: [false],

      noMedical: [null],
      withMedical: [null],
      psychotherapy16Min: [null],
      psychotherapy38Min: [null],
      psychotherapy53Min: [null],
      psychotherapyNoPatient: [null],
      familyPsychotherapy: [null],
      familyPsychotherapyHome: [null],
      groupPsychotherapy: [null],
      testingByPsychologist: [null],
      testingByTechnician: [null],
      testingByComputer: [null],
      conferenceNonPhysician: [null],
      conferenceAbsencePhysician: [null],
      conferenceAbsenceNonPhysician: [null],

      noMedicalUnits: [null],
      withMedicalUnits: [null],
      psychotherapy16MinUnits: [null],
      psychotherapy38MinUnits: [null],
      psychotherapy53MinUnits: [null],
      psychotherapyNoPatientUnits: [null],

      familyPsychotherapyUnits: [null],
      familyPsychotherapyHomeUnits: [null],
      groupPsychotherapyUnits: [null],
      testingByPsychologistUnits: [null],
      testingByTechnicianUnits: [null],
      testingByComputerUnits: [null],
      conferenceNonPhysicianUnits: [null],
      conferenceAbsencePhysicianUnits: [null],
      conferenceAbsenceNonPhysicianUnits: [null],

      cpt: [null],
      description: [null],
      unitValue: [null],
      outpatientTherapytime: [null],
      units: [null],
      charge: [null],

      diagnosisCode: [null],
      // principalFirst: [null],
      complexityDescription: [null],
      diagnosisCode1: [null],
      complexityDescription1: [null],
      diagnosisCode2: [null],
      complexityDescription2: [null],
      diagnosisCode3: [null],
      complexityDescription3: [null],
      diagnosisCode4: [null],
      complexityDescription4: [null],
      nameOfProvider: [null],
      chargeAmount: [null],
      startTime: [null],
      stopTime: [null],
      totalTime: [null],
      relationshipToClient: [null],
      presentingProblems: [null],
      pertinentHistory: [null],
      milestonesMet: [null],
      milestonesNotMet: [null],
      milestonesDescription: [null],

      isOutpatient: [false],
      agencyOutpatient: [null],
      dateOfServiceOutpatient: [null],
      reasonOutpatient: [null],
      interventionOutpatient: [null],
      responseOutpatient: [null],

      agencyOutpatient1: [null],
      dateOfServiceOutpatient1: [null],
      reasonOutpatient1: [null],
      interventionOutpatient1: [null],
      responseOutpatient1: [null],

      agencyOutpatient2: [null],
      dateOfServiceOutpatient2: [null],
      reasonOutpatient2: [null],
      interventionOutpatient2: [null],
      responseOutpatient2: [null],


      isInpatient: [false],
      agencyInpatient: [null],
      dateOfServiceInpatient: [null],
      reasonInpatient: [null],
      interventionInpatient: [null],
      responseInpatient: [null],

      agencyInpatient1: [null],
      dateOfServiceInpatient1: [null],
      reasonInpatient1: [null],
      interventionInpatient1: [null],
      responseInpatient1: [null],

      agencyInpatient2: [null],
      dateOfServiceInpatient2: [null],
      reasonInpatient2: [null],
      interventionInpatient2: [null],
      responseInpatient2: [null],

      isNotByClient: [false],
      isPerClient: [false],
      isPerMedical: [false],
      documentDiagnosis: [null],

      isNoneReported: [false],

      psychotropicMedications: [null],
      perClientReport: [null],
      psychotropicMedications1: [null],
      perClientReport1: [null],
      psychotropicMedications2: [null],
      perClientReport2: [null],
      psychotropicMedications3: [null],
      perClientReport3: [null],
      iscurrentMedication: [false],
      currentMedication: [null],
      prescribedBy: [null],
      startDate: [null],
      dosageFrequency: [null],
      reason: [null],
      isComplianceYes: [false],
      isComplianceNo: [false],
      isAdverseReaction: [false],
      isPerClientReport: [false],
      isPerMedicalRecord: [false],
      adverseReactions: [null],

      currentMedication1: [null],
      prescribedBy1: [null],
      startDate1: [null],
      dosageFrequency1: [null],
      reason1: [null],
      isComplianceYes1: [false],
      isComplianceNo1: [false],

      currentMedication2: [null],
      prescribedBy2: [null],
      startDate2: [null],
      dosageFrequency2: [null],
      reason2: [null],
      isComplianceYes2: [false],
      isComplianceNo2: [false],

      currentMedication3: [null],
      prescribedBy3: [null],
      startDate3: [null],
      dosageFrequenc3y: [null],
      reason3: [null],
      isComplianceYes3: [false],
      isComplianceNo3: [false],

      currentMedication4: [null],
      prescribedBy4: [null],
      startDate4: [null],
      dosageFrequency4: [null],
      dosageFrequency3: [null],
      reason4: [null],
      isComplianceYes4: [false],
      isComplianceNo4: [false],

      isDangerNone: [false],
      isDangerThreat: [false],
      isDangerIntent: [false],
      isDangerSuicidePrecaution: [false],
      isDangerIdeation: [false],
      isDangerRunaway: [false],
      isDangerIntentWithout: [false],
      isDangerPlan: [false],
      isDangerSelfCare: [false],
      isDangerGestures: [false],
      isDangerRisk: [false],

      dangerExplain: [null],

      isHistoryNone: [false],
      isHistoryThreat: [false],
      isHistoryIntent: [false],
      isHistorySuicidePrecaution: [false],
      isHistoryIdeation: [false],
      isHistoryRunaway: [false],
      isHistoryIntentWithout: [false],
      isHistoryPlan: [false],
      isHistorySelfCare: [false],
      isHistoryGestures: [false],
      isHistoryRisk: [false],

      historyExplain: [null],

      isCurrentDangerNone: [false],
      isCurrentDangerThreat: [false],
      isCurrentDangerIntent: [false],
      isCurrentDangerIdeation: [false],
      isCurrentDangerRunaway: [false],
      isCurrentDangerIntentWithout: [false],
      isCurrentDangerPlan: [false],
      isCurrentDangerSuicidePrecaution: [false],
      isCurrentDangerRisk: [false],

      currentDangerExplain: [null],

      isHistoryOthersNone: [false],
      isHistoryOthersThreat: [false],
      isHistoryOthersIntent: [false],
      isHistoryOthersIdeation: [false],
      isHistoryOthersRunaway: [false],
      isHistoryOthersIntentWithout: [false],
      isHistoryOthersPlan: [false],
      isHistoryOthersSuicidePrecaution: [false],
      isHistoryOthersRisk: [false],

      historyOthersExplain: [null],

      isCurrentPropertyYes: [false],
      isCurrentPropertyNo: [false],
      explainCurrentPropertyIfYes: [null],

      isHistoryPropertyYes: [false],
      isHistoryPropertyNo: [false],
      explainDestructionPropertyIfYes: [null],

      isNoDisorder: [false],
      isBorderline: [false],
      isMild: [false],
      isModerate: [false],
      isPronounced: [false],
      isSevere: [false],
      isExtreme: [false],

      isappearanceNormal: [false],
      isContentThoughtNormal: [false],
      isSensoriumNormal: [false],
      sad: [null],
      expressionless: [null],
      hostileFacialExpression: [null],
      worried: [null],
      avoidsGaze: [null],
      inappropriateGeneralAppearance: [null],
      isPhysicalAbnormality: [false],
      weightOver: [null],
      weightUnder: [null],
      heightTall: [null],
      heightShort: [null],
      blemishes: [null],
      poor: [null],
      disorganized: [null],
      seductiveClothingHygiene: [null],
      eccentric: [null],
      isInterviewNormal: [false],
      angryOutbursts: [null],
      irritable: [null],
      impulsive: [null],
      hostileInterviewBehaviour: [null],
      silly: [null],
      sensitive: [null],
      apathetic: [null],
      withdrawn: [null],
      evasive: [null],
      passive: [null],
      aggressive: [null],
      naive: [null],
      overlyDramatic: [null],
      manipulative: [null],
      dependent: [null],
      uncooperative: [null],
      demanding: [null],
      denial: [null],
      negativistic: [null],
      callous: [null],
      infantileInterviewBehaviour: [null],
      seductiveInterviewBehaviour: [null],
      isIntellectNormal: [false],
      intellectAboveNormal: [null],
      intellectBelowNormal: [null],
      additionalComments: [null],

      suicidalThoughts: [null],
      suicidalPlans: [null],
      suicideAttempts: [null],
      assaultiveIdeas: [null],
      homicidalIdeas: [null],
      homicidalPlans: [null],
      antisocialAttitude: [null],
      suspiciousness: [null],
      unsocialAttitude: [null],
      familyConcerns: [null],
      povertyOfContent: [null],
      phobias: [null],
      obsessions: [null],
      compulsions: [null],
      drugPreoccupation: [null],
      feelingsOfUnreality: [null],
      hallucinations: [null],
      delusions: [null],
      parents: [null],
      teachers: [null],
      peers: [null],
      others: [null],
      runningAway: [null],
      somaticComplaints: [null],
      guilt: [null],
      hopelessness: [null],
      worthlessness: [null],
      religiosity: [null],
      sexualPreoccupation: [null],
      sexualProblems: [null],
      isFlowThoughtNormal: [false],
      blocking: [null],
      circumstantial: [null],
      tangential: [null],
      confabulation: [null],
      perseveration: [null],
      flightOfIdeas: [null],
      looseAssociation: [null],
      indecisive: [null],
      isMoodAffectNormal: [false],
      anxious: [null],
      inappropriateMoodAffect: [null],
      flatAffect: [null],
      elevatedMood: [null],
      depression: [null],
      labileMood: [null],

      orientationImpairedtime: [null],
      place: [null],
      person: [null],
      poorRecent: [null],
      poorRemote: [null],
      amnesia: [null],
      troubleConcentrating: [null],
      isSpeechNormal: [false],
      excessiveAmount: [null],
      reducedAmount: [null],
      mute: [null],
      pressureOfSpeech: [null],
      slowed: [null],
      loud: [null],
      soft: [null],
      slurred: [null],
      articulationProblem: [null],
      infantileSpeech: [null],
      echolalia: [null],
      neologisms: [null],
      delayedDevT: [null],
      isMotorActivityNormal: [false],
      increasedAmount: [null],
      decreasedAmount: [null],
      agitation: [null],
      tics: [null],
      tremor: [null],
      peculiarPosturing: [null],
      repetitiveActs: [null],
      poorGrMtrCood: [null],
      poorFineMtrCood: [null],
      dominance: [null],
      isInsightNormal: [false],
      poorInsight: [null],
      poorJudgment: [null],
      unrealisticRegarding: [null],
      problems: [null],
      doesnTUnderstand: [null],
      whyHeSheIsThere: [null],
      unmotivatedFor: [null],
      treatment: [null],

      hxOfRunningAway: [null],
      peersProblems: [null],
      parentsProblems: [null],
      peachersProblems: [null],
      siblingsProblems: [null],
      othersProblems: [null],
      disruptiveInSchool: [null],
      withdrawnInSchool: [null],
      poorSchoolAchieve: [null],
      learningDisability: [null],
      lying: [null],
      stealing: [null],
      aggression: [null],
      irresponsible: [null],
      promiscuous: [null],
      sexualDeviation: [null],
      oppositionalAttitude: [null],
      homeProblems: [null],
      schoolProblems: [null],
      otherProblems: [null],
      unrealisticFears: [null],
      anxietyProblems: [null],
      tantrums: [null],
      enuresis: [null],
      encopresis: [null],
      moody: [null],
      criesFrequently: [null],
      isEnvironmentalStressors: [false],
      isDivorceSeparation: [false],
      isMaritalDiscord: [false],
      isFamilyFinancialProblems: [false],
      physicalIllness: [null],
      physicalDisability: [null],
      physicallyAbused: [null],
      sexuallyAbused: [null],
      physicalIllnessInFamilyMember: [null],
      mentalIllnessInFamilyMember: [null],

      code1: [null],
      code2: [null],
      dsmCode1: [null],
      dsmCode2: [null],
      code: [null],
      dsmCode: [null],

      code3: [null],
      dsmCode3: [null],

      code4: [null],
      dsmCode4: [null],

      code5: [null],
      dsmCode5: [null],

      code6: [null],
      dsmCode6: [null],

      code7: [null],
      dsmCode7: [null],

      dsmDescription: [null],
      dsmGaf: [null],
      diagnosticJustification: [null],

      isNoShcn: [false],
      isSpmi: [false],
      isMentalIllness: [false],
      isIdd: [false],
      isPregnant: [false],
      isIntravenousDrugs: [false],
      isSed: [false],
      isAgeYouth: [false],
      isDurationAndDiagnosis: [false],
      isFunctionalImpairment: [false],
      isInattentiveInClass: [false],
      isRiskHomePlacement: [false],
      isCommunity: [false],
      isCoordinationPcpYes: [false],
      isCoordinationPcpNo: [false],
      isDeclinedToReport: [false],
      isCoordinationPcpNotApplicable: [false],
      lastName: [null],
      firstName: [null],
      address: [null],

      isInitialTreatmentSentYes: [false],
      isInitialTreatmentSentNo: [false],

      isUseProvidersYes: [false],
      isUseProvidersNo: [false],
      isUseProvidersDeclinedReport: [false],
      isUseProvidersNotApplicable: [false],

      isOtherTreatersyes: [false],
      isOtherTreatersNo: [false],
      isOtherTreatersDeclinedReport: [false],
      isOtherTreatersNotApplicable: [false],
      otherTreatersIfYesReason: [null],
      isCourtOrderedYes: [false],
      isCourtOrderedNo: [false],
      courtOrderedIfYesReason: [null],

      isCompleteRestYes: [false],
      isRestOfTheProfileNo: [false],
      isServicesFollowingNo: [false],
      explainServicesFollowingIfYes: [null],
      treatmentPlanFrom: [null],
      treatmentPlanTo: [null],

      barriersToTreatment: [null],
      strengthsAssets: [null],
      treatmentPreferences: [null],
      dischargeCriteri: [null],
      closeCase: [null],

      goalI: [null],

      goalIObj: [null],
      goalIObjectives: [null],
      goalIServiceModality: [null],
      goalIFrequency: [null],
      goalIDuration: [null],
      goalIStartDate: [null],
      goalITargetDate: [null],
      goalIReviewScore: [null],

      goalIObj1: [null],
      goalIObjectives1: [null],
      goalIServiceModality1: [null],
      goalIFrequency1: [null],
      goalIDuration1: [null],
      goalIStartDate1: [null],
      goalITargetDate1: [null],
      goalIReviewScore1: [null],

      goalIObj2: [null],
      goalIObjectives2: [null],
      goalIServiceModality2: [null],
      goalIFrequency2: [null],
      goalIDuration2: [null],
      goalIStartDate2: [null],
      goalITargetDate2: [null],
      goalIReviewScore2: [null],

      goalIObj3: [null],
      goalIObjectives3: [null],
      goalIServiceModality3: [null],
      goalIFrequency3: [null],
      goalIDuration3: [null],
      goalIStartDate3: [null],
      goalITargetDate3: [null],
      goalIReviewScore3: [null],

      goalIObj4: [null],
      goalIObjectives4: [null],
      goalIServiceModality4: [null],
      goalIFrequency4: [null],
      goalIDuration4: [null],
      goalIStartDate4: [null],
      goalITargetDate4: [null],
      goalIReviewScore4: [null],

      goalIi: [null],

      goalIiObj: [null],
      goalIiObjectives: [null],
      goalIiServiceModality: [null],
      goalIiFrequency: [null],
      goalIiDuration: [null],
      goalIiStartDate: [null],
      goalIiTargetDate: [null],
      goalIiReviewScore: [null],

      goalIiObj1: [null],
      goalIiObjectives1: [null],
      goalIiServiceModality1: [null],
      goalIiFrequency1: [null],
      goalIiDuration1: [null],
      goalIiStartDate1: [null],
      goalIiTargetDate1: [null],
      goalIiReviewScore1: [null],

      goalIiObj2: [null],
      goalIiObjectives2: [null],
      goalIiServiceModality2: [null],
      goalIiFrequency2: [null],
      goalIiDuration2: [null],
      goalIiStartDate2: [null],
      goalIiTargetDate2: [null],
      goalIiReviewScore2: [null],

      goalIiObj3: [null],
      goalIiObjectives3: [null],
      goalIiServiceModality3: [null],
      goalIiFrequency3: [null],
      goalIiDuration3: [null],
      goalIiStartDate3: [null],
      goalIiTargetDate3: [null],
      goalIiReviewScore3: [null],

      goalIiObj4: [null],
      goalIiObjectives4: [null],
      goalIiServiceModality4: [null],
      goalIiFrequency4: [null],
      goalIiDuration4: [null],
      goalIiStartDate4: [null],
      goalIiTargetDate4: [null],
      goalIiReviewScore4: [null],


      longGoal: [null],
      longGoalObj: [null],
      longGoalObjectives: [null],
      longGoalServiceModality: [null],
      longGoalFrequency: [null],
      longGoalDuration: [null],
      longGoalStartDate: [null],
      longGoalTargetDate: [null],
      longGoalReviewScore: [null],

      longGoalObj1: [null],
      longGoalObjectives1: [null],
      longGoalServiceModality1: [null],
      longGoalFrequency1: [null],
      longGoalDuration1: [null],
      longGoalStartDate1: [null],
      longGoalTargetDate1: [null],
      longGoalReviewScore1: [null],

      longGoalObj2: [null],
      longGoalObjectives2: [null],
      longGoalServiceModality2: [null],
      longGoalFrequency2: [null],
      longGoalDuration2: [null],
      longGoalStartDate2: [null],
      longGoalTargetDate2: [null],
      longGoalReviewScore2: [null],

      longGoalObj3: [null],
      longGoalObjectives3: [null],
      longGoalServiceModality3: [null],
      longGoalFrequency3: [null],
      longGoalDuration3: [null],
      longGoalStartDate3: [null],
      longGoalTargetDate3: [null],
      longGoalReviewScore3: [null],

      longGoalObj4: [null],
      longGoalObjectives4: [null],
      longGoalServiceModality4: [null],
      longGoalFrequency4: [null],
      longGoalDuration4: [null],
      longGoalStartDate4: [null],
      longGoalTargetDate4: [null],
      longGoalReviewScore4: [null],

      isPrognosisGood: [false],
      isPrognosisFair: [false],
      isPrognosisGuarded: [false],

      justification: [null],

      planSignatureConsumer: [null],
      planSignatureParent: [null],
      planSignatureTherapist: [null],
      consumerDate: [null],
      parentDate: [null],
      therapistDate: [null],

      participantSignatures1: [null],
      participantSignatures2: [null],
      participantSignatures3: [null],
      participantSignatures4: [null],
      printedBy: [null],
      printedDate: [null],

    });
  }

  getDetail() {
    setTimeout(() => {
      let formData;
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      const assessmentId = localStorage.getItem('asssessmentId');
      const req = { assessmentID: assessmentId };
      this._opencard.getAssessmentRec(req).then((data) => {
        formData = !isNullOrUndefined(data.pdfForms) ? data.pdfForms.pdfForms : null;
        loader.style.display = 'none';
        if (formData) {
          !isNullOrUndefined(formData.dob) ? formData.dob = new Date(formData.dob) : null;
          !isNullOrUndefined(formData.casePlanDate) ? formData.casePlanDate = new Date(formData.casePlanDate) : null;
          !isNullOrUndefined(formData.mhaDate) ? formData.mhaDate = new Date(formData.mhaDate) : null;
          !isNullOrUndefined(formData.dateOfServiceOutpatient) ? formData.dateOfServiceOutpatient = new Date(formData.dateOfServiceOutpatient) : null;
          !isNullOrUndefined(formData.dateOfServiceOutpatient1) ? formData.dateOfServiceOutpatient1 = new Date(formData.dateOfServiceOutpatient1) : null;
          !isNullOrUndefined(formData.dateOfServiceOutpatient2) ? formData.dateOfServiceOutpatient2 = new Date(formData.dateOfServiceOutpatient2) : null;
          !isNullOrUndefined(formData.dateOfServiceInpatient) ? formData.dateOfServiceInpatient = new Date(formData.dateOfServiceInpatient) : null;
          !isNullOrUndefined(formData.dateOfServiceInpatient1) ? formData.dateOfServiceInpatient1 = new Date(formData.dateOfServiceInpatient1) : null;
          !isNullOrUndefined(formData.dateOfServiceInpatient2) ? formData.dateOfServiceInpatient2 = new Date(formData.dateOfServiceInpatient2) : null;
          !isNullOrUndefined(formData.startDate) ? formData.startDate = new Date(formData.startDate) : null;
          !isNullOrUndefined(formData.startDate1) ? formData.startDate1 = new Date(formData.startDate1) : null;
          !isNullOrUndefined(formData.startDate2) ? formData.startDate2 = new Date(formData.startDate2) : null;
          !isNullOrUndefined(formData.startDate3) ? formData.startDate3 = new Date(formData.startDate3) : null;
          !isNullOrUndefined(formData.startDate4) ? formData.startDate4 = new Date(formData.startDate4) : null;
          !isNullOrUndefined(formData.goalIStartDate) ? formData.goalIStartDate = new Date(formData.goalIStartDate) : null;
          !isNullOrUndefined(formData.goalITargetDate) ? formData.goalITargetDate = new Date(formData.goalITargetDate) : null;

          !isNullOrUndefined(formData.goalIStartDate1) ? formData.goalIStartDate1 = new Date(formData.goalIStartDate1) : null;
          !isNullOrUndefined(formData.goalITargetDate1) ? formData.goalITargetDate1 = new Date(formData.goalITargetDate1) : null;

          !isNullOrUndefined(formData.goalIStartDate2) ? formData.goalIStartDate2 = new Date(formData.goalIStartDate2) : null;
          !isNullOrUndefined(formData.goalITargetDate2) ? formData.goalITargetDate2 = new Date(formData.goalITargetDate2) : null;

          !isNullOrUndefined(formData.goalIStartDate3) ? formData.goalIStartDate3 = new Date(formData.goalIStartDate3) : null;
          !isNullOrUndefined(formData.goalITargetDate3) ? formData.goalITargetDate3 = new Date(formData.goalITargetDate3) : null;

          !isNullOrUndefined(formData.goalIStartDate4) ? formData.goalIStartDate4 = new Date(formData.goalIStartDate4) : null;
          !isNullOrUndefined(formData.goalITargetDate4) ? formData.goalITargetDate4 = new Date(formData.goalITargetDate4) : null;

          !isNullOrUndefined(formData.goalIiStartDate1) ? formData.goalIiStartDate1 = new Date(formData.goalIiStartDate1) : null;
          !isNullOrUndefined(formData.goalIiTargetDate1) ? formData.goalIiTargetDate1 = new Date(formData.goalIiTargetDate1) : null;

          !isNullOrUndefined(formData.goalIiStartDate2) ? formData.goalIiStartDate2 = new Date(formData.goalIiStartDate2) : null;
          !isNullOrUndefined(formData.goalIiTargetDate2) ? formData.goalIiTargetDate2 = new Date(formData.goalIiTargetDate2) : null;

          !isNullOrUndefined(formData.goalIiStartDate3) ? formData.goalIiStartDate3 = new Date(formData.goalIiStartDate3) : null;
          !isNullOrUndefined(formData.goalIiTargetDate3) ? formData.goalIiTargetDate3 = new Date(formData.goalIiTargetDate3) : null;

          !isNullOrUndefined(formData.goalIiStartDate4) ? formData.goalIiStartDate4 = new Date(formData.goalIiStartDate4) : null;
          !isNullOrUndefined(formData.goalIiTargetDate4) ? formData.goalIiTargetDate4 = new Date(formData.goalIiTargetDate4) : null;


          !isNullOrUndefined(formData.goalIiStartDate) ? formData.goalIiStartDate = new Date(formData.goalIiStartDate) : null;
          !isNullOrUndefined(formData.goalIiTargetDate) ? formData.goalIiTargetDate = new Date(formData.goalIiTargetDate) : null;
          !isNullOrUndefined(formData.longGoalStartDate) ? formData.longGoalStartDate = new Date(formData.longGoalStartDate) : null;
          !isNullOrUndefined(formData.longGoalTargetDate) ? formData.longGoalTargetDate = new Date(formData.longGoalTargetDate) : null;

          !isNullOrUndefined(formData.longGoalStartDate1) ? formData.longGoalStartDate1 = new Date(formData.longGoalStartDate1) : null;
          !isNullOrUndefined(formData.longGoalTargetDate1) ? formData.longGoalTargetDate1 = new Date(formData.longGoalTargetDate1) : null;

          !isNullOrUndefined(formData.longGoalStartDate2) ? formData.longGoalStartDate2 = new Date(formData.longGoalStartDate2) : null;
          !isNullOrUndefined(formData.longGoalTargetDate2) ? formData.longGoalTargetDate2 = new Date(formData.longGoalTargetDate2) : null;

          !isNullOrUndefined(formData.longGoalStartDate3) ? formData.longGoalStartDate3 = new Date(formData.longGoalStartDate3) : null;
          !isNullOrUndefined(formData.longGoalTargetDate3) ? formData.longGoalTargetDate3 = new Date(formData.longGoalTargetDate3) : null;

          !isNullOrUndefined(formData.longGoalStartDate4) ? formData.longGoalStartDate4 = new Date(formData.longGoalStartDate4) : null;
          !isNullOrUndefined(formData.longGoalTargetDate4) ? formData.longGoalTargetDate4 = new Date(formData.longGoalTargetDate4) : null;

          !isNullOrUndefined(formData.consumerDate) ? formData.consumerDate = new Date(formData.consumerDate) : null;
          !isNullOrUndefined(formData.parentDate) ? formData.parentDate = new Date(formData.parentDate) : null;
          !isNullOrUndefined(formData.therapistDate) ? formData.therapistDate = new Date(formData.therapistDate) : null;

          !isNullOrUndefined(formData.conferenceAbsenceNonPhysician) ? formData.conferenceAbsenceNonPhysician = new Date(formData.conferenceAbsenceNonPhysician) : null;
          !isNullOrUndefined(formData.conferenceAbsencePhysician) ? formData.conferenceAbsencePhysician = new Date(formData.conferenceAbsencePhysician) : null;
          !isNullOrUndefined(formData.conferenceNonPhysician) ? formData.conferenceNonPhysician = new Date(formData.conferenceNonPhysician) : null;
          !isNullOrUndefined(formData.familyPsychotherapy) ? formData.therapistDfamilyPsychotherapyate = new Date(formData.familyPsychotherapy) : null;
          !isNullOrUndefined(formData.familyPsychotherapyHome) ? formData.familyPsychotherapyHome = new Date(formData.familyPsychotherapyHome) : null;
          !isNullOrUndefined(formData.groupPsychotherapy) ? formData.groupPsychotherapy = new Date(formData.groupPsychotherapy) : null;
          !isNullOrUndefined(formData.noMedical) ? formData.noMedical = new Date(formData.noMedical) : null;
          !isNullOrUndefined(formData.outpatientTherapytime) ? formData.outpatientTherapytime = new Date(formData.outpatientTherapytime) : null;
          !isNullOrUndefined(formData.psychotherapy16Min) ? formData.psychotherapy16Min = new Date(formData.psychotherapy16Min) : null;
          !isNullOrUndefined(formData.psychotherapy38Min) ? formData.psychotherapy38Min = new Date(formData.psychotherapy38Min) : null;
          !isNullOrUndefined(formData.psychotherapy53Min) ? formData.psychotherapy53Min = new Date(formData.psychotherapy53Min) : null;
          !isNullOrUndefined(formData.psychotherapyNoPatient) ? formData.psychotherapyNoPatient = new Date(formData.psychotherapyNoPatient) : null;
          !isNullOrUndefined(formData.testingByComputer) ? formData.testingByComputer = new Date(formData.testingByComputer) : null;
          !isNullOrUndefined(formData.testingByPsychologist) ? formData.testingByPsychologist = new Date(formData.testingByPsychologist) : null;
          !isNullOrUndefined(formData.testingByTechnician) ? formData.testingByTechnician = new Date(formData.testingByTechnician) : null;
          !isNullOrUndefined(formData.withMedical) ? formData.withMedical = new Date(formData.withMedical) : null;
          !isNullOrUndefined(formData.familyPsychotherapy) ? formData.familyPsychotherapy = new Date(formData.familyPsychotherapy) : null;

          !isNullOrUndefined(formData.goalIReviewScore) ? formData.goalIReviewScore = new Date(formData.goalIReviewScore) : null;
          !isNullOrUndefined(formData.goalIiReviewScore) ? formData.goalIiReviewScore = new Date(formData.goalIiReviewScore) : null;
          !isNullOrUndefined(formData.longGoalReviewScore) ? formData.longGoalReviewScore = new Date(formData.longGoalReviewScore) : null;
          !isNullOrUndefined(formData.planSignatureParent) ? formData.planSignatureParent = new Date(formData.planSignatureParent) : null;
          !isNullOrUndefined(formData.stopTime) ? formData.stopTime = new Date(formData.stopTime) : null;
          !isNullOrUndefined(formData.totalTime) ? formData.totalTime = new Date(formData.totalTime) : null;
          this.fpMentalHealth = formData;

        }
        this.isEdit = true;
        // this.isPrint = true;
        this.MentalHealthAssessmentForm.disable();
      });
    }, 5000);
  }

  editForm() {
    this.MentalHealthAssessmentForm.enable();
    this.editControll = false;
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.jsPdfOrientation = 'landscape';
    this._printPdf.printForm();
  }

}
