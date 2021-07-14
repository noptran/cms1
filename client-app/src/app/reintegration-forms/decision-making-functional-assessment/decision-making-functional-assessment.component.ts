import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReDecision } from './re-decision';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-decision-making-functional-assessment',
  templateUrl: './decision-making-functional-assessment.component.html',

  styleUrls: ['./decision-making-functional-assessment.component.scss','../../family-preservation/family-preservation.scss'],
  outputs: ['decMakFunOut']
})
export class DecisionMakingFunctionalAssessmentComponent implements OnInit {
  decisionMakingForm: FormGroup;
  reDecisionMaking: ReDecision = new ReDecision();
  isEdit = false;
  editControll = true;
  isPrint = true;

  @Output()
  decMakFunOut = new EventEmitter()

  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard:OpencardsService, public _router:Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if(this._router.url  == '/reports/referral/reintegration/assessments/decision/making/functional/assessment/detail') {     this.getDetails(); }
    this.decisionMakingForm.disable();
  }

  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reDecisionMaking = json.cmsFormJson
 

  }
  editForm() {
    this.decisionMakingForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    console.log('source is',source);
    //  source.typeOfDod = 'assessment';
    this.decMakFunOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.decMakFunOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.decisionMakingForm = this._fb.group({
      Communication: [null],
    Speak: [null],
    Write: [null],
    SignLanguage: [null],
    LanguageOther: [null],
    OtherSignals: [null],
    PersonSee: [null],
    PersonHear: [null],
    Ambulation: [null],
    PersonWalk: [null],
    PersonWalkWithAssistance: [null],
    WalkWithCane: [null],
    WheelchairForMobility: [null],
    LivingArea: [null],
    MedicalProblems: [null],
    ChronicAilments: [null],
    KnownMedicalProblems: [null],
    TerminalIllness: [null],
    PotentiallyReversible: [null],
    PerformSelfCare: [null],
    MakeDecisions: [null],
    SeverePain: [null],
    Medications: [null],
    LimitTheAbility: [null],
    Dementia: [null],
    NonPrescriptionMedications: [null],
    Caffeine: [null],
    ImproperMixture: [null],
    ImproperMixtureNonPrescribed: [null],
    ExcessiveMedication: [null],
    DoctorMakingPrescriptions: [null],
    UseOfTransportation: [null],
    AlcoholUsage: [null],
    LegalMedications: [null],
    CommunicateDecisions: [null],
    SelfSufficiency: [null],
    MentalImpairment: [null],
    OrientationToTime: [null],
    MemoryImpairment: [null],
    CognitiveDeficits: [null],
    NeurologicalDysfunction: [null],
    RecentMentalEvaluation: [null],
    PhysicianEvaluation: [null],
    CompleteAnEvaluation: [null],
    Prognosis: [null],
    KnowledgeAndSkills: [null],
    Nutrition: [null],
    ProperDiet: [null],
    PrepareFood: [null],
    AppropriateNutritionalNeeds: [null],
    CookingSkills: [null],
    CookWithoutInjury: [null],
    UnsanitaryCooking: [null],
    PersonalHygiene: [null],
    WashHimself: [null],
    CleanHimself: [null],
    EnvironmentClean: [null],
    CleaningWounds: [null],
    PersonalSafety: [null],
    RecognizePotentialDangers: [null],
    FoodSpoilage: [null],
    AvoidObstacles: [null],
    PersonalHealth: [null],
    MinorHealthProblems: [null],
    AlertOthers: [null],
    FollowRoutines: [null],
    CapableOfCleaningWound: [null],
    HealthCareProviders: [null],
    MoneyManagement: [null],
    CountChange: [null],
    ManageCheckbook: [null],
    PayBills: [null],
    AvoidExploitation: [null],
    FinancialResources: [null],
    Clothing: [null],
    DressWithoutAssistance: [null],
    AdequateForWeather: [null],
    ClothesClean: [null],
    SafeResidence: [null],
    ShelterProperlyHeated: [null],
    RunningWater: [null],
    PersonAvoidExploitation: [null],
    AvoidanceOfLife: [null],
    AvoidSafetyHazards: [null],
    HomeEmergency: [null],
    AssumeSafety: [null],
    ContactOthersAssistance: [null],
    GuardianConservator: [null],
    ValuesAndGoals: [null],
    DesireForGuardian: [null],
    PersonalDesires: [null],
    CommunicateANeed: [null],
    Ramifications: [null],
    LossOfPersonalAutonomy: [null],
    LifePerspective: [null],
    Future: [null],
    Perspective: [null],
    CurrentStatus: [null],
    PersonSatisfied: [null],
    LikeToLive: [null],
    Community: [null],
    AbilityToDetermine: [null],
    DetermineAlternatives: [null],

    PhysicalEnvironment: [null],
    neglectOfPerson: [null],

    PotentialAlternatives: [null],
    LackOfFamilySupport: [null],
    Overcrowding: [null],
    Isolation: [null],
    Marital: [null],
    EconomicPressure: [null],
    DesireInstitutionalization: [null],
    Disharmony: [null],
    HistoryOfAbuse: [null],
    PhysicallyEmotionally: [null],
    PoorEnvironmentalSurroundings: [null],
    SocialFamilySupport: [null],
    PersonLife: [null],
    RegularBasis: [null],
    HaveSocialSystems: [null],
    IndependentLiving: [null],
    DesireInstitutionalization1: [null],
    FamilySupportLegalAction: [null],
    SuitableSocialEnvironment: [null],
    SocialGroups: [null],
    Conservatorships: [null],
    CourtActionBeLimited: [null],
    LimitedSpecificAreas: [null],
    ShortTermCase: [null],
    TimeFrame: [null],
    RecentStressors: [null],
    LossOfSpouse: [null],
    MoveFromHome: [null],
    SeriousIllnessOrInjury: [null],
    ChangeInMedication: [null],
    VictimOfAbuse: [null],
    DeathOfAPet: [null],
    OtherStressors: [null],
    HistoricalLifestyle: [null],
    EmotionalLifeChange: [null],
    HistoryOfMental: [null],
    EmotionalImpairmentPerson: [null],
    AndEvaluateInformationEffectively: [null],
    LackTheCapacity: [null],
    SystemicVariables: [null],
    GuardianshipProcess: [null],
    EffectiveAdvocateToHelp: [null],
    ClinicalExamination: [null],
    LimitingAPotentialGuardianship: [null],
    AlternativesToGuardianship: [null],
    PowerOfAttorney: [null],
    LimitedSpecificWays: [null],
    ConservatorshipActionDelayed: [null],
    ConservatorIsAppointed: [null],
    PhysicalLifeOfThePerson: [null],
    Chronic: [null],
    RecentlyImmobilized: [null],
    StoppedNeededMedication: [null],
    PhysicalAbilities: [null],
    ResourcesWithSupervision: [null],
    Environment: [null],
    PresentLivingSituation: [null],
    AbusivePersons: [null],
    HazardousEnvironment: [null],
    NeglectOrExploitation: [null],
    Social: [null],
    SocialEnvironmentChanged: [null],
    shelterMaintenance :[null],
    potentialAlternatives:[null],
    neglectPerson:[null],
    shortTermCase1:[null]
    });
  }

  getDetails() {
    setTimeout(()=>{
      let formData;
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';      
  //     let assessmentId = localStorage.getItem('asssessmentId');
  //     let req = { assessmentID: assessmentId }
  //     this._opencard.getAssessmentRec(req).then((data) => {
  //       formData = data.pdfForms.pdfForms;
  //  this.reDecisionMaking = formData;
  //       loader.style.display = 'none';
  //       this.isEdit = true;
  //       // this.isPrint = true;
  //       this.decisionMakingForm.disable();
  //     })
   }, 5000)
}

printForm() {
  this._printPdf.fileName = 'CMSForm';
  this._printPdf.htmlElementToBePrinted = 'form-content';
  this._printPdf.printForm();
}

}
