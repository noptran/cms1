import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpInitialFamily } from './fp-initial-family';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';

import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-initial-family-assessment',
  templateUrl: './initial-family-assessment.component.html',
  styleUrls: ['./initial-family-assessment.component.scss', '../family-preservation.scss'],
  outputs: ['intiFamilyOut']
})

export class InitialFamilyAssessmentComponent implements OnInit {
  initialFamilyAssessmentForm: FormGroup;
  fpInitialFamily: FpInitialFamily = new FpInitialFamily();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;

  @Output()
  intiFamilyOut = new EventEmitter();


  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/assessment/detail') {
      this.getCmsFormJson();
      this.initialFamilyAssessmentForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/assessment/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/family-preservation/assessment/detail') { this.getDetails(); }
    // this.autoFetchDetails();

  }

  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpInitialFamily = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    if (formData) {
      !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
      !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
      !isNullOrUndefined(formData.contact24Date) ? formData.contact24Date = new Date(formData.contact24Date) : null;
      !isNullOrUndefined(formData.contact24Time) ? formData.contact24Time = new Date(formData.contact24Time) : null;
      !isNullOrUndefined(formData.contact48Date) ? formData.contact48Date = new Date(formData.contact48Date) : null;
      !isNullOrUndefined(formData.notifiedHearingDate) ? formData.notifiedHearingDate = new Date(formData.notifiedHearingDate) : null;
      !isNullOrUndefined(formData.appointmentMetDate) ? formData.appointmentMetDate = new Date(formData.appointmentMetDate) : null;
      !isNullOrUndefined(formData.signatureDate) ? formData.signatureDate = new Date(formData.signatureDate) : null;
      !isNullOrUndefined(formData.careGiver1Date) ? formData.careGiver1Date = new Date(formData.careGiver1Date) : null;
      !isNullOrUndefined(formData.careGiver2Date) ? formData.careGiver2Date = new Date(formData.careGiver2Date) : null;
      !isNullOrUndefined(formData.ncp1Date) ? formData.ncp1Date = new Date(formData.ncp1Date) : null;
      !isNullOrUndefined(formData.ncp1DeceasedDate) ? formData.ncp1DeceasedDate = new Date(formData.ncp1DeceasedDate) : null;
      !isNullOrUndefined(formData.ncp2Date) ? formData.ncp2Date = new Date(formData.ncp2Date) : null;
      !isNullOrUndefined(formData.ncp2DeceasedDate) ? formData.ncp2DeceasedDate = new Date(formData.ncp2DeceasedDate) : null;
      !isNullOrUndefined(formData.cIH1Dob) ? formData.cIH1Dob = new Date(formData.cIH1Dob) : null;
      !isNullOrUndefined(formData.cIH2Dob) ? formData.cIH2Dob = new Date(formData.cIH2Dob) : null;
      !isNullOrUndefined(formData.cIH3Dob) ? formData.cIH3Dob = new Date(formData.cIH3Dob) : null;
      !isNullOrUndefined(formData.cIH4Dob) ? formData.cIH4Dob = new Date(formData.cIH4Dob) : null;
      !isNullOrUndefined(formData.otherSiblingsDob) ? formData.otherSiblingsDob = new Date(formData.otherSiblingsDob) : null;
      !isNullOrUndefined(formData.childAssessmentDate) ? formData.childAssessmentDate = new Date(formData.childAssessmentDate) : null;
      !isNullOrUndefined(formData.dateMentalHealth) ? formData.dateMentalHealth = new Date(formData.dateMentalHealth) : null;
      !isNullOrUndefined(formData.dateUncope) ? formData.dateUncope = new Date(formData.dateUncope) : null;
      !isNullOrUndefined(formData.suicideRiskReferralDate) ? formData.suicideRiskReferralDate = new Date(formData.suicideRiskReferralDate) : null;
      !isNullOrUndefined(formData.suicidesafetyDOB) ? formData.suicidesafetyDOB = new Date(formData.suicidesafetyDOB) : null;
      !isNullOrUndefined(formData.suicidesafetyAssmntDate) ? formData.suicidesafetyAssmntDate = new Date(formData.suicidesafetyAssmntDate) : null;
      // tslint:disable-next-line:max-line-length
      !isNullOrUndefined(formData.suicideInterventionClientDate) ? formData.suicideInterventionClientDate = new Date(formData.suicideInterventionClientDate) : null;
      // tslint:disable-next-line:max-line-length
      !isNullOrUndefined(formData.suicideInterventionParentDate) ? formData.suicideInterventionParentDate = new Date(formData.suicideInterventionParentDate) : null;
      !isNullOrUndefined(formData.conductedRescreenDate) ? formData.conductedRescreenDate = new Date(formData.conductedRescreenDate) : null;

      !isNullOrUndefined(formData.childAssessmentDate1) ? formData.childAssessmentDate1 = new Date(formData.childAssessmentDate1) : null;
      !isNullOrUndefined(formData.childAssessmentDate2) ? formData.childAssessmentDate2 = new Date(formData.childAssessmentDate2) : null;
      !isNullOrUndefined(formData.childAssessmentDate3) ? formData.childAssessmentDate3 = new Date(formData.childAssessmentDate3) : null;
      !isNullOrUndefined(formData.childAssessmentDate4) ? formData.childAssessmentDate4 = new Date(formData.childAssessmentDate4) : null;
      !isNullOrUndefined(formData.childAssessmentDate5) ? formData.childAssessmentDate5 = new Date(formData.childAssessmentDate5) : null;
      !isNullOrUndefined(formData.childAssessmentDate6) ? formData.childAssessmentDate6 = new Date(formData.childAssessmentDate6) : null;
      !isNullOrUndefined(formData.childAssessmentDate7) ? formData.childAssessmentDate7 = new Date(formData.childAssessmentDate7) : null;
      !isNullOrUndefined(formData.childAssessmentDate8) ? formData.childAssessmentDate8 = new Date(formData.childAssessmentDate8) : null;
      !isNullOrUndefined(formData.childAssessmentDate9) ? formData.childAssessmentDate9 = new Date(formData.childAssessmentDate9) : null;
      !isNullOrUndefined(formData.childAssessmentDate) ? formData.childAssessmentDate = new Date(formData.childAssessmentDate) : null;

      this.fpInitialFamily = formData;
    }
  }
  autoFetchDetails() {
    const data = this._client.getPersonData();
    console.log('data in this._client.getByPersonData() is', data);
    this.fpInitialFamily.caseName = data.person.firstName + ' ' + data.person.lastName;
    this.fpInitialFamily.caseNumber = data.person.kaecses;
    this.fpInitialFamily.date = new Date();

    this.fpInitialFamily.suicideRiskCaseName = data.person.firstName + ' ' + data.person.lastName;
    this.fpInitialFamily.suicideRiskCaseNumber = data.person.kaecses;
    this.fpInitialFamily.suicideRiskDate = new Date();

    this.fpInitialFamily.suicidesafetyClientName = data.person.firstName + ' ' + data.person.lastName;
    this.fpInitialFamily.suicidesafetyDOB = new Date(data.person.dob);

    this.printedBy = localStorage.getItem('UserId') || 'Administrator';
    this.printedDate = new Date();

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpInitialFamily.dateOfReferral = new Date(data.referral.referralDate);

        this.fpInitialFamily.suicideRiskReferralDate = new Date(data.referral.referralDate);
      });

    this._team.getUserName()
      .then((data) => {
        console.log('data in this._team.getUserName() is', data);
        this.printedBy = data.users.firstName + ' ' + data.users.lastName;

      });


  }

  editForm() {
    this.initialFamilyAssessmentForm.enable();
    this.editControll = false;
  }
  saveForm(source) {
    console.log('save form called in initial family assessment form and source is,', source);

    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.contact24Date) ? source.contact24Date = Date.parse(source.contact24Date) : null;
    !isNullOrUndefined(source.contact24Time) ? source.contact24Time = Date.parse(source.contact24Time) : null;
    !isNullOrUndefined(source.contact48Date) ? source.contact48Date = Date.parse(source.contact48Date) : null;
    !isNullOrUndefined(source.notifiedHearingDate) ? source.notifiedHearingDate = Date.parse(source.notifiedHearingDate) : null;
    !isNullOrUndefined(source.appointmentMetDate) ? source.appointmentMetDate = Date.parse(source.appointmentMetDate) : null;
    !isNullOrUndefined(source.signatureDate) ? source.signatureDate = Date.parse(source.signatureDate) : null;
    !isNullOrUndefined(source.careGiver1Date) ? source.careGiver1Date = Date.parse(source.careGiver1Date) : null;
    !isNullOrUndefined(source.careGiver2Date) ? source.careGiver2Date = Date.parse(source.careGiver2Date) : null;
    !isNullOrUndefined(source.ncp1Date) ? source.ncp1Date = Date.parse(source.ncp1Date) : null;
    !isNullOrUndefined(source.ncp1DeceasedDate) ? source.ncp1DeceasedDate = Date.parse(source.ncp1DeceasedDate) : null;
    !isNullOrUndefined(source.ncp2Date) ? source.ncp2Date = Date.parse(source.ncp2Date) : null;
    !isNullOrUndefined(source.ncp2DeceasedDate) ? source.ncp2DeceasedDate = Date.parse(source.ncp2DeceasedDate) : null;
    !isNullOrUndefined(source.cIH1Dob) ? source.cIH1Dob = Date.parse(source.cIH1Dob) : null;
    !isNullOrUndefined(source.cIH2Dob) ? source.cIH2Dob = Date.parse(source.cIH2Dob) : null;
    !isNullOrUndefined(source.cIH3Dob) ? source.cIH3Dob = Date.parse(source.cIH3Dob) : null;
    !isNullOrUndefined(source.cIH4Dob) ? source.cIH4Dob = Date.parse(source.cIH4Dob) : null;
    !isNullOrUndefined(source.otherSiblingsDob) ? source.otherSiblingsDob = Date.parse(source.otherSiblingsDob) : null;
    !isNullOrUndefined(source.childAssessmentDate) ? source.childAssessmentDate = Date.parse(source.childAssessmentDate) : null;
    !isNullOrUndefined(source.dateMentalHealth) ? source.dateMentalHealth = Date.parse(source.dateMentalHealth) : null;
    !isNullOrUndefined(source.dateUncope) ? source.dateUncope = Date.parse(source.dateUncope) : null;
    !isNullOrUndefined(source.suicideRiskReferralDate) ? source.suicideRiskReferralDate = Date.parse(source.suicideRiskReferralDate) : null;
    !isNullOrUndefined(source.suicidesafetyDOB) ? source.suicidesafetyDOB = Date.parse(source.suicidesafetyDOB) : null;
    !isNullOrUndefined(source.suicidesafetyAssmntDate) ? source.suicidesafetyAssmntDate = Date.parse(source.suicidesafetyAssmntDate) : null;
    // tslint:disable-next-line:max-line-length
    !isNullOrUndefined(source.suicideInterventionClientDate) ? source.suicideInterventionClientDate = Date.parse(source.suicideInterventionClientDate) : null;
    // tslint:disable-next-line:max-line-length
    !isNullOrUndefined(source.suicideInterventionParentDate) ? source.suicideInterventionParentDate = Date.parse(source.suicideInterventionParentDate) : null;
    !isNullOrUndefined(source.conductedRescreenDate) ? source.conductedRescreenDate = Date.parse(source.conductedRescreenDate) : null;

    !isNullOrUndefined(source.caseManagementTd) ? source.caseManagementTd = Date.parse(source.caseManagementTd) : null;
    !isNullOrUndefined(source.otherSiblingsDob1) ? source.otherSiblingsDob1 = Date.parse(source.otherSiblingsDob1) : null;
    !isNullOrUndefined(source.contact48Time) ? source.contact48Time = Date.parse(source.contact48Time) : null;
    !isNullOrUndefined(source.otherSiblingsDob2) ? source.otherSiblingsDob2 = Date.parse(source.otherSiblingsDob2) : null;
    !isNullOrUndefined(source.suicideRiskDate) ? source.suicideRiskDate = Date.parse(source.suicideRiskDate) : null;
    !isNullOrUndefined(source.therapyTd) ? source.therapyTd = Date.parse(source.therapyTd) : null;
    !isNullOrUndefined(source.safetyPlanTd) ? source.safetyPlanTd = Date.parse(source.safetyPlanTd) : null;
    !isNullOrUndefined(source.continuousAssessmentsTd) ? source.continuousAssessmentsTd = Date.parse(source.continuousAssessmentsTd) : null;

    !isNullOrUndefined(source.otherSiblingsDob3) ? source.otherSiblingsDob3 = Date.parse(source.otherSiblingsDob3) : null;
    !isNullOrUndefined(source.otherSiblingsDob) ? source.otherSiblingsDob = Date.parse(source.otherSiblingsDob) : null;
    source.typeOfDod = 'assessment';
    this.intiFamilyOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);

  }
  discardForm() {
    this.intiFamilyOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.initialFamilyAssessmentForm = this._fb.group({
      'caseName': [null],
      'caseNumber': [null],
      'dateOfReferral': [null],
      'date': [null],
      'contact24Date': [null],
      'contact24Time': [null],
      'contact24Location': [null],
      'contact24Worker': [null],
      'contact48Date': [null],
      'contact48Time': [null],
      'contact48Location': [null],
      'contactWorker': [null],
      'presentDuringMeeting': [null],
      'isAnnualIncome': [null],
      'annualIncome': [null],
      'numberLiving': [null],
      'isSingleParent': [null],
      'isInformedConsent': [null],
      'isEmergencyPhone': [null],
      'isFullDisclosure': [null],
      'isAloneTimeRequirement': [null],
      'isFamiliesAreProvided': [null],
      'familyReasonReferral': [null],
      'strengths': [null],
      'isConcernsSfcs': [null],
      'concernsAboutSfcs': [null],
      'isConcernsYes': [null],
      'isConcernsNo': [null],
      'concernsAboutSfcs1': [null],
      'isConcernsYes1': [false],
      'isConcernsNo1': [false],
      'concernsAboutSfcs2': [null],
      'isConcernsYes2': [false],
      'isConcernsNo2': [false],

      'isBenefitsFatherInvolvement': [null],
      'isNotifiedOnHearing': [null],
      'notifiedHearingDate': [null],
      'isCasePlanningConference': [null],
      'isAppointmentMet': [null],
      'appointmentMetDate': [null],
      'listOfParentsOne': [null],
      'listOfParentsTwo': [null],
      'listOfParentsThree': [null],
      'addressParent': [null],
      'phoneParent': [null],
      'addressParent1': [null],
      'phoneParent1': [null],
      'addressParent2': [null],
      'phoneParent2': [null],
      'isInformationVerified': [null],
      'isFamilyMembersVerified': [null],
      'isInsuranceVerified': [null],
      'isReleasesExplained': [null],
      'isMilitaryAssessed': [null],
      'assessedMilitary': [null],
      'reasonForContactNotMade': [null],
      'continuousAssessmentsPr': [null],
      'safetyPlanPr': [null],
      'caseManagementPr': [null],
      'therapyPr': [null],
      'continuousAssessmentsTd': [null],
      'safetyPlanTd': [null],
      'caseManagementTd': [null],
      'therapyTd': [null],
      'caseManagementPlan': [null],
      'therapyPlan': [null],
      'isSafetyCreatedYes': [null],
      'isSafetyCreatedNo': [null],
      'dcfSocialWorker': [null],
      'therapist': [null],
      'signatureDate': [null],

      'signaturesOne': [null],
      'relationshipOne': [null],
      'signaturesTwo': [null],
      'relationshipTwo': [null],
      'careGiver1Name': [null],
      'careGiver1Date': [null],
      'careGiver1Occupation': [null],
      'careGiver1Address': [null],
      'careGiver1SsNo': [null],
      'careGiver1Ethnicity': [null],
      'careGiver1PrimaryLanguage': [null],
      'careGiver1Employer': [null],
      'careGiver1WorkPhone': [null],
      'careGiver1HomePhone': [null],
      'careGiver1CellPhone': [null],
      'isCareGiver1UsCitizenYes': [null],
      'isCareGiver1UsCitizenNo': [null],
      'careGiver1ReasonIfNoUs': [null],

      'careGiver2Name': [null],
      'careGiver2Date': [null],
      'careGiver2Occupation': [null],
      'careGiver2Address': [null],
      'careGiver2SsNo': [null],
      'careGiver2Ethnicity': [null],
      'careGiver2PrimaryLanguage': [null],
      'careGiver2Employer': [null],
      'careGiver2WorkPhone': [null],
      'careGiver2HomePhone': [null],
      'careGiver2CellPhone': [null],
      'isCareGiver2UsCitizenYes': [null],
      'isCareGiver2UsCitizenNo': [null],
      'careGiver2ReasonIfNoUs': [null],

      'ncp1Name': [null],
      'ncp1Date': [null],
      'ncp1Occupation': [null],
      'ncp1Address': [null],
      'ncp1SsNo': [null],
      'ncp1MilitaryStatus': [null],
      'ncp1Ethnicity': [null],
      'ncp1PrimaryLanguage': [null],
      'ncp1Employer': [null],
      'ncp1WorkPhone': [null],
      'ncp1HomePhone': [null],
      'ncp1CellPhone': [null],
      'isNcp1UsCitizenYes': [null],
      'isNcp1UsCitizenNo': [null],
      'ncp1ReasonIfNoUs': [null],
      'isNcp1PaternityYes': [null],
      'isNcp1PaternityNo': [null],
      'isNcp1PaternityNa': [null],
      'ncp1EffortsIfNo': [null],
      'isNcp1LocationYes': [null],
      'isNcp1LocationNo': [null],
      'isNcp1SupportContactedYes': [null],
      'isNcp1SupportContactedNo': [null],
      'isNcp1SameArea': [null],
      'isNcp1OutCountry': [null],
      'isNcp1Deceased': [null],
      'ncp1DeceasedDate': [null],
      'isNcp1OutState': [null],
      'isNcp1Jail': [null],
      'ncp1VisitationArrangement': [null],
      'isNcp1NotWantContact': [null],
      'ncp1ReasonNotContact': [null],
      'isNcp1AllegedYes': [null],
      'isNcp1AllegedNo': [null],
      'ncp1AllegedYesReason': [null],
      'isNcp1AlcoholAbuseYes': [null],
      'isNcp1AlcoholAbuseNo': [null],
      'ncp1AlcoholAbuseYesReason': [null],
      'isNcp1CriminalYes': [null],
      'isNcp1CriminalNo': [null],
      'ncp1CriminalYesReason': [null],

      'ncp2Name': [null],
      'ncp2Date': [null],
      'ncp2Occupation': [null],
      'ncp2Address': [null],
      'ncp2SsNo': [null],
      'ncp2MilitaryStatus': [null],
      'ncp2Ethnicity': [null],
      'ncp2PrimaryLanguage': [null],
      'ncp2Employer': [null],
      'ncp2WorkPhone': [null],
      'ncp2HomePhone': [null],
      'ncp2CellPhone': [null],
      'isNcp2UsCitizenYes': [null],
      'isNcp2UsCitizenNo': [null],
      'ncp2ReasonIfNoUs': [null],
      'isNcp2PaternityYes': [null],
      'isNcp2PaternityNo': [null],
      'isNcp2PaternityNa': [null],
      'isNcp2EffortsIfNo': [null],
      'isNcp2LocationYes': [null],
      'isNcp2LocationNo': [null],
      'isNcp2SupportContactedYes': [null],
      'isNcp2SupportContactedNo': [null],
      'isNcp2SameArea': [null],
      'isNcp2OutCountry': [null],
      'isNcp2Deceased': [null],
      'ncp2DeceasedDate': [null],
      'isNcp2OutState': [null],
      'isNcp2Jail': [null],
      'ncp2VisitationArrangement': [null],
      'isNcp2NotWantContact': [null],
      'ncp2ReasonNotContact': [null],
      'isNcp2AllegedYes': [null],
      'isNcp2AllegedNo': [null],
      'ncp2AllegedYesReason': [null],
      'isNcp2AlcoholAbuseYes': [null],
      'isNcp2AlcoholAbuseNo': [null],
      'ncp2AlcoholAbuseYesReason': [null],
      'isNcp2CriminalYes': [null],
      'isNcp2CriminalNo': [null],
      'ncp2CriminalYesReason': [null],

      'cIH1Name': [null],
      'cIH1Dob': [null],
      'cIH1Age': [null],
      'cIH1Ssn': [null],
      'cIH1Sex': [null],
      'cIH1Race': [null],
      'cIH1Ethnicity': [null],
      'cIH1PrimaryLanguage': [null],
      'cIH1SchoolAttends': [null],
      'isCIH1MosCompletedYes': [null],
      'isCIH1MosCompletedNo': [null],

      'cIH2Name': [null],
      'cIH2Dob': [null],
      'cIH2Age': [null],
      'cIH2Ssn': [null],
      'cIH2Sex': [null],
      'cIH2Race': [null],
      'cIH2Ethnicity': [null],
      'cIH2PrimaryLanguage': [null],
      'cIH2SchoolAttends': [null],
      'isCIH2MosCompletedYes': [null],
      'isCIH2MosCompletedNo': [null],

      'cIH3Name': [null],
      'cIH3Dob': [null],
      'cIH3Age': [null],
      'cIH3Ssn': [null],
      'cIH3Sex': [null],
      'cIH3Race': [null],
      'cIH3Ethnicity': [null],
      'cIH3PrimaryLanguage': [null],
      'cIH3SchoolAttends': [null],
      'isCIH3MosCompletedYes': [null],
      'isCIH3MosCompletedNo': [null],

      'cIH4Name': [null],
      'cIH4Dob': [null],
      'cIH4Age': [null],
      'cIH4Ssn': [null],
      'cIH4Sex': [null],
      'cIH4Race': [null],
      'cIH4Ethnicity': [null],
      'cIH4PrimaryLanguage': [null],
      'cIH4SchoolAttends': [null],
      'isCIH4MosCompletedYes': [null],
      'isCIH4MosCompletedNo': [null],
      'otherSiblingsName1': [null],
      'otherSiblingsDob1': [null],
      'otherSiblingsReside1': [null],
      'otherSiblingsName2': [null],
      'otherSiblingsDob2': [null],
      'otherSiblingsReside2': [null],
      otherSiblingsName3: [null],
      otherSiblingsDob3: [null],
      otherSiblingsReside3: [null],

      otherSiblingsName: [null],
      otherSiblingsDob: [null],
      otherSiblingsReside: [null],

      'dcfWorkerName': [null],
      'dcfWorkerPhone': [null],
      'dcfWorkerFax': [null],
      'dcfWorkerAddress': [null],
      'kinshipChildName': [null],
      'kinshipKinName': [null],
      'kinshipRelationship': [null],
      'kinshipAddress': [null],
      'kinshipPhone': [null],
      'isKinshipReleaseYes': [null],
      'isKinshipReleaseNo': [null],
      'isKinshipInviteYes': [null],
      'isKinshipInviteNo': [null],

      'kinshipChildName1': [null],
      'kinshipKinName1': [null],
      'kinshipRelationship1': [null],
      'kinshipAddress1': [null],
      'kinshipPhone1': [null],
      'isKinshipReleaseYes1': [null],
      'isKinshipReleaseNo1': [null],
      'isKinshipInviteYes1': [null],
      'isKinshipInviteNo1': [null],

      'kinshipChildName2': [null],
      'kinshipKinName2': [null],
      'kinshipRelationship2': [null],
      'kinshipAddress2': [null],
      'kinshipPhone2': [null],
      'isKinshipReleaseYes2': [false],
      'isKinshipReleaseNo2': [false],
      'isKinshipInviteYes2': [false],
      'isKinshipInviteNo2': [false],

      'kinshipChildName3': [null],
      'kinshipKinName3': [null],
      'kinshipRelationship3': [null],
      'kinshipAddress3': [null],
      'kinshipPhone3': [null],
      'isKinshipReleaseYes3': [false],
      'isKinshipReleaseNo3': [false],
      'isKinshipInviteYes3': [false],
      'isKinshipInviteNo3': [false],

      'kinshipChildName4': [null],
      'kinshipKinName4': [null],
      'kinshipRelationship4': [null],
      'kinshipAddress4': [null],
      'kinshipPhone4': [null],
      'isKinshipReleaseYes4': [false],
      'isKinshipReleaseNo4': [false],
      'isKinshipInviteYes4': [false],
      'isKinshipInviteNo4': [false],

      'kinshipChildName5': [null],
      'kinshipKinName5': [null],
      'kinshipRelationship5': [null],
      'kinshipAddress5': [null],
      'kinshipPhone5': [null],
      'isKinshipReleaseYes5': [false],
      'isKinshipReleaseNo5': [false],
      'isKinshipInviteYes5': [false],
      'isKinshipInviteNo5': [false],

      'genogram': [null],

      'socialWelfare': [null],
      'healthCare': [null],
      'cultureReligion': [null],
      'extendedFamily': [null],
      'extendedFamily2': [null],
      'work': [null],
      'recreation': [null],
      'school': [null],
      'friends': [null],
      'recreation2': [null],
      'familyOrHousehold': [null],

      'isNutritionChildrenScreenedNone': [null],
      'isNutritionChildrenScreenedListed': [null],
      'nutritionChildName1': [null],
      'nutritionItem1': [null],
      'nutritionNotes1': [null],
      'nutritionChildName2': [null],
      'nutritionItem2': [null],
      'nutritionNotes2': [null],
      nutritionChildName3: [null],
      nutritionItem3: [null],
      nutritionNotes3: [null],

      nutritionChildName: [null],
      nutritionItem: [null],
      nutritionNotes: [null],

      nutritionChildName4: [null],
      nutritionItem4: [null],
      nutritionNotes4: [null],

      'isPainScreenedNone': [null],
      'isPainScreenedListed': [null],
      'painChild1': [null],
      'painScreenPain1': [null],
      'painNotes1': [null],
      'painChild2': [null],
      'painScreenPain2': [null],
      'painNotes2': [null],
      painChild4: [null],
      painScreenPain4: [null],
      painNotes4: [null],

      painChild3: [null],
      painScreenPain3: [null],
      painNotes3: [null],

      painChild: [null],
      painScreenPain: [null],
      painNotes: [null],

      'childAssessmentChild1': [null],
      'childAssessmentDate1': [null],
      'isImmunizationsYes1': [null],
      'isImmunizationsNo1': [null],
      'childAssessmentNotes1': [null],
      'childAssessmentChild2': [null],
      'childAssessmentDate2': [null],
      'isImmunizationsYes2': [null],
      'isImmunizationsNo2': [null],
      'childAssessmentNotes2': [null],

      welfareChildName3: [null],
      welfareItem3: [null],
      welfareNotes3: [null],

      welfareChildName: [null],
      welfareItem: [null],
      welfareNotes: [null],

      childAssessmentChild: [null],
      childAssessmentDate: [null],
      isImmunizationsYes: [false],
      isImmunizationsNo: [false],
      childAssessmentNotes: [null],

      childAssessmentChild3: [null],
      childAssessmentDate3: [null],
      isImmunizationsYes3: [false],
      isImmunizationsNo3: [false],
      childAssessmentNotes3: [null],


      childAssessmentChild4: [null],
      childAssessmentDate4: [null],
      isImmunizationsYes4: [false],
      isImmunizationsNo4: [false],
      childAssessmentNotes4: [null],

      childAssessmentChild5: [null],
      childAssessmentDate5: [null],
      isImmunizationsYes5: [false],
      isImmunizationsNo5: [false],
      childAssessmentNotes5: [null],

      childAssessmentChild6: [null],
      childAssessmentDate6: [null],
      isImmunizationsYes6: [false],
      isImmunizationsNo6: [false],
      childAssessmentNotes6: [null],

      childAssessmentChild7: [null],
      childAssessmentDate7: [null],
      isImmunizationsYes7: [false],
      isImmunizationsNo7: [false],
      childAssessmentNotes7: [null],

      childAssessmentChild8: [null],
      childAssessmentDate8: [null],
      isImmunizationsYes8: [false],
      isImmunizationsNo8: [false],
      childAssessmentNotes8: [null],

      childAssessmentChild9: [null],
      childAssessmentDate9: [null],
      isImmunizationsYes9: [false],
      isImmunizationsNo9: [false],
      childAssessmentNotes9: [null],

      'isWelfareChildrenScreenedNone': [null],
      'isWelfareChildrenScreenedListed': [null],
      'welfareChildName1': [null],
      'welfareItem1': [null],
      'welfareNotes1': [null],
      'welfareChildName2': [null],
      'welfareItem2': [null],
      'welfareNotes2': [null],
      'isMental5YrsChildrenScreenedNone': [null],
      'isMental5YrsChildrenScreenedListed': [null],
      'mental5YrsChildName1': [null],
      'mental5YrsItem1': [null],
      'mental5YrsNotes1': [null],
      'mental5YrsChildName2': [null],
      'mental5YrsItem2': [null],
      'mental5YrsNotes2': [null],
      mental5YrsChildName: [null],
      mental5YrsItem: [null],
      mental5YrsNotes: [null],

      mental5YrsChildName3: [null],
      mental5YrsItem3: [null],
      mental5YrsNotes3: [null],
      'isMental6YrsChildrenScreenedNone': [null],
      'isMental6YrsChildrenScreenedListed': [null],
      'mental6YrsChildName1': [null],
      'mental6YrsItem1': [null],
      'mental6YrsNotes1': [null],
      'mental6YrsChildName2': [null],
      'mental6YrsItem2': [null],
      'mental6YrsNotes2': [null],
      'staffSignatureMentalHealth': [null],
      'dateMentalHealth': [null],

      clientName: [null],
      clientName1: [null],
      clientName2: [null],

      clientAge: [null],
      clientAge1: [null],
      clientAge2: [null],

      personName: [null],
      personName1: [null],
      personName2: [null],

      moreDrinking: [null],
      moreDrinking1: [null],
      moreDrinking2: [null],
      alcohols: [null],
      alcohols1: [null],
      alcohols2: [null],
      drug: [null],
      drug1: [null],
      drug2: [null],
      alcoholDrug: [null],
      alcoholDrug1: [null],
      alcoholDrug2: [null],
      preOccupied: [null],
      preOccupied1: [null],
      preOccupied2: [null],
      emotionalDiscomfort: [null],
      emotionalDiscomfort1: [null],
      emotionalDiscomfort2: [null],
      referralNeeded: [null],
      referralNeeded1: [null],
      referralNeeded2: [null],
      referralMade: [null],
      referralMade1: [null],
      referralMade2: [null],
      dateReferral: [null],
      dateReferral1: [null],
      dateReferral2: [null],

      'staffSignatureUncope': [null],
      'dateUncope': [null],

      'suicideRiskCaseName': [null],
      'suicideRiskCaseNumber': [null],
      'suicideRiskReferralDate': [null],
      'suicideRiskDate': [null],

      'suicideRiskAssessmentName': [null],
      'isSuicideRiskNoActionYes': [null],
      'isSuicideRiskNoActionNo': [null],
      'isDangerSelfClear': [null],
      'isDangerSelfPotentially': [null],
      'isDangerSelfAttempts': [null],
      'isDangerSelfHopelessness': [null],
      'isDangerSelfSubstance': [null],
      'isDangerSelfLoss': [null],
      'isDangerSelfIdeation': [null],
      'isDangerSelfHarm': [null],
      'isDangerSelfChronic': [null],
      'isDangerSelfNone': [null],
      'isDangerOthersClear': [null],
      'isDangerOthersPlan': [null],
      'isDangerOthersAttempts': [null],
      'isDangerOthersSubstance': [null],
      'isDangerOthersIdeation': [null],
      'isDangerOthersNone': [null],
      'isProtectiveNone': [null],
      'isProtectiveFamily': [null],
      'isProtectiveCommunity': [null],
      'isProtectiveReligious': [null],
      'isProtectiveTolerance': [null],
      'isProtectivePositive': [null],
      'isProtectiveCopeStress': [null],
      'isProtectiveCompliant': [null],
      'isProtectiveIntelligence': [null],
      'isProtectiveSafety': [null],
      'isRiskHigh': [null],
      'isRiskModerate': [null],
      'isRiskMild': [null],
      'isRiskLow': [null],

      isSuicideRiskNoActionYes1: [false],
      isSuicideRiskNoActionNo1: [false],
      isDangerSelfClear1: [false],
      isDangerSelfPotentially1: [false],
      isDangerSelfAttempts1: [false],
      isDangerSelfHopelessness1: [false],
      isDangerSelfSubstance1: [false],
      isDangerSelfLoss1: [false],
      isDangerSelfIdeation1: [false],
      isDangerSelfHarm1: [false],
      isDangerSelfChronic1: [false],
      isDangerSelfNone1: [false],
      isDangerOthersClear1: [false],
      isDangerOthersPlan1: [false],
      isDangerOthersAttempts1: [false],
      isDangerOthersSubstance1: [false],
      isDangerOthersIdeation1: [false],
      isDangerOthersNone1: [false],
      isProtectiveNone1: [false],
      isProtectiveFamily1: [false],
      isProtectiveCommunity1: [false],
      isProtectiveReligious1: [false],
      isProtectiveTolerance1: [false],
      isProtectivePositive1: [false],
      isProtectiveCopeStress1: [false],
      isProtectiveCompliant1: [false],
      isProtectiveIntelligence1: [false],
      isProtectiveSafety1: [false],
      isRiskHigh1: [false],
      isRiskModerate1: [false],
      isRiskMild1: [false],
      isRiskLow1: [false],

      isSuicideRiskNoActionYes2: [false],
      isSuicideRiskNoActionNo2: [false],
      isDangerSelfClear2: [false],
      isDangerSelfPotentially2: [false],
      isDangerSelfAttempts2: [false],
      isDangerSelfHopelessness2: [false],
      isDangerSelfSubstance2: [false],
      isDangerSelfLoss2: [false],
      isDangerSelfIdeation2: [false],
      isDangerSelfHarm2: [false],
      isDangerSelfChronic2: [false],
      isDangerSelfNone2: [false],
      isDangerOthersClear2: [false],
      isDangerOthersPlan2: [false],
      isDangerOthersAttempts2: [false],
      isDangerOthersSubstance2: [false],
      isDangerOthersIdeation2: [false],
      isDangerOthersNone2: [false],
      isProtectiveNone2: [false],
      isProtectiveFamily2: [false],
      isProtectiveCommunity2: [false],
      isProtectiveReligious2: [false],
      isProtectiveTolerance2: [false],
      isProtectivePositive2: [false],
      isProtectiveCopeStress2: [false],
      isProtectiveCompliant2: [false],
      isProtectiveIntelligence2: [false],
      isProtectiveSafety2: [false],
      isRiskHigh2: [false],
      isRiskModerate2: [false],
      isRiskMild2: [false],
      isRiskLow2: [false],

      isSuicideRiskNoActionYes3: [false],
      isSuicideRiskNoActionNo3: [false],
      isDangerSelfClear3: [false],
      isDangerSelfPotentially3: [false],
      isDangerSelfAttempts3: [false],
      isDangerSelfHopelessness3: [false],
      isDangerSelfSubstance3: [false],
      isDangerSelfLoss3: [false],
      isDangerSelfIdeation3: [false],
      isDangerSelfHarm3: [false],
      isDangerSelfChronic3: [false],
      isDangerSelfNone3: [false],
      isDangerOthersClear3: [false],
      isDangerOthersPlan3: [false],
      isDangerOthersAttempts3: [false],
      isDangerOthersSubstance3: [false],
      isDangerOthersIdeation3: [false],
      isDangerOthersNone3: [false],
      isProtectiveNone3: [false],
      isProtectiveFamily3: [false],
      isProtectiveCommunity3: [false],
      isProtectiveReligious3: [false],
      isProtectiveTolerance3: [false],
      isProtectivePositive3: [false],
      isProtectiveCopeStress3: [false],
      isProtectiveCompliant3: [false],
      isProtectiveIntelligence3: [false],
      isProtectiveSafety3: [false],
      isRiskHigh3: [false],
      isRiskModerate3: [false],
      isRiskMild3: [false],
      isRiskLow3: [false],

      isSuicideRiskNoActionYes4: [false],
      isSuicideRiskNoActionNo4: [false],
      isDangerSelfClear4: [false],
      isDangerSelfPotentially4: [false],
      isDangerSelfAttempts4: [false],
      isDangerSelfHopelessness4: [false],
      isDangerSelfSubstance4: [false],
      isDangerSelfLoss4: [false],
      isDangerSelfIdeation4: [false],
      isDangerSelfHarm4: [false],
      isDangerSelfChronic4: [false],
      isDangerSelfNone4: [false],
      isDangerOthersClear4: [false],
      isDangerOthersPlan4: [false],
      isDangerOthersAttempts4: [false],
      isDangerOthersSubstance4: [false],
      isDangerOthersIdeation4: [false],
      isDangerOthersNone4: [false],
      isProtectiveNone4: [false],
      isProtectiveFamily4: [false],
      isProtectiveCommunity4: [false],
      isProtectiveReligious4: [false],
      isProtectiveTolerance4: [false],
      isProtectivePositive4: [false],
      isProtectiveCopeStress4: [false],
      isProtectiveCompliant4: [false],
      isProtectiveIntelligence4: [false],
      isProtectiveSafety4: [false],
      isRiskHigh4: [false],
      isRiskModerate4: [false],
      isRiskMild4: [false],
      isRiskLow4: [false],

      'staffSignatureSuicideRisk': [null],
      'dateSuicideRisk': [null],
      'suicidesafetyClientName': [null],
      'suicidesafetyRecNo': [null],
      'suicidesafetyDOB': [null],
      'suicidesafetyAssmntDate': [null],

      'suicideSafetyPlan': [null],
      'isSuicideSafetyMildRisk': [null],
      'isSuicideSafetyModerateRisk': [null],
      'isSuicideSafetyHighRisk': [null],
      'suicideStaffMember': [null],
      'staffSignatureSuicidePrecaution': [null],
      'suicideRiskAssessmentCompleted': [null],
      'suicideReleaseOfInformation': [null],
      'lowModerateRisk': [null],
      'highRisk': [null],
      'suicideRiskTherapist': [null],

      'indicatorsDemonstratingSafety1': [null],
      'indicatorsDemonstratingSafety2': [null],
      'indicatorsDemonstratingSafety3': [null],
      'indicatorsDemonstratingSafety4': [null],

      'suicideInterventionClientSignature': [null],
      'suicideInterventionClientDate': [null],
      'suicideInterventionParentSignature': [null],
      'suicideInterventionParentDate': [null],
      'ceasingPrecaution': [null],
      'conductedRescreen': [null],
      'conductedRescreenDate': [null],
      'suicideRiskLpSignature': [null],
      'suicideRiskClientSignature': [null],
      printedBy: [null],
      printedDate: [null],
      mental6YrsChildName: [null],
      mental6YrsItem: [null],
      mental6YrsNotes: [null],
      mental6YrsChildName3: [null],
      mental6YrsItem3: [null],
      mental6YrsNotes3: [null],
      suicideRiskAssessmentName1: [null],
      suicideRiskAssessmentName2: [null],
      suicideRiskAssessmentName3: [null],
      suicideRiskAssessmentName4: [null]
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
      const assessmentId = localStorage.getItem('asssessmentId');
      const req = { assessmentID: assessmentId };
      this._opencard.getAssessmentRec(req).then((data) => {
        formData = !isNullOrUndefined(data.pdfForms) ? data.pdfForms.pdfForms : null;
        if (formData) {
          !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
          !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
          !isNullOrUndefined(formData.contact24Date) ? formData.contact24Date = new Date(formData.contact24Date) : null;
          !isNullOrUndefined(formData.contact24Time) ? formData.contact24Time = new Date(formData.contact24Time) : null;
          !isNullOrUndefined(formData.contact48Date) ? formData.contact48Date = new Date(formData.contact48Date) : null;
          !isNullOrUndefined(formData.notifiedHearingDate) ? formData.notifiedHearingDate = new Date(formData.notifiedHearingDate) : null;
          !isNullOrUndefined(formData.appointmentMetDate) ? formData.appointmentMetDate = new Date(formData.appointmentMetDate) : null;
          !isNullOrUndefined(formData.signatureDate) ? formData.signatureDate = new Date(formData.signatureDate) : null;
          !isNullOrUndefined(formData.careGiver1Date) ? formData.careGiver1Date = new Date(formData.careGiver1Date) : null;
          !isNullOrUndefined(formData.careGiver2Date) ? formData.careGiver2Date = new Date(formData.careGiver2Date) : null;
          !isNullOrUndefined(formData.ncp1Date) ? formData.ncp1Date = new Date(formData.ncp1Date) : null;
          !isNullOrUndefined(formData.ncp1DeceasedDate) ? formData.ncp1DeceasedDate = new Date(formData.ncp1DeceasedDate) : null;
          !isNullOrUndefined(formData.ncp2Date) ? formData.ncp2Date = new Date(formData.ncp2Date) : null;
          !isNullOrUndefined(formData.ncp2DeceasedDate) ? formData.ncp2DeceasedDate = new Date(formData.ncp2DeceasedDate) : null;
          !isNullOrUndefined(formData.cIH1Dob) ? formData.cIH1Dob = new Date(formData.cIH1Dob) : null;
          !isNullOrUndefined(formData.cIH2Dob) ? formData.cIH2Dob = new Date(formData.cIH2Dob) : null;
          !isNullOrUndefined(formData.cIH3Dob) ? formData.cIH3Dob = new Date(formData.cIH3Dob) : null;
          !isNullOrUndefined(formData.cIH4Dob) ? formData.cIH4Dob = new Date(formData.cIH4Dob) : null;
          !isNullOrUndefined(formData.otherSiblingsDob) ? formData.otherSiblingsDob = new Date(formData.otherSiblingsDob) : null;
          !isNullOrUndefined(formData.childAssessmentDate) ? formData.childAssessmentDate = new Date(formData.childAssessmentDate) : null;
          !isNullOrUndefined(formData.dateMentalHealth) ? formData.dateMentalHealth = new Date(formData.dateMentalHealth) : null;
          !isNullOrUndefined(formData.dateUncope) ? formData.dateUncope = new Date(formData.dateUncope) : null;
          !isNullOrUndefined(formData.suicideRiskReferralDate) ? formData.suicideRiskReferralDate = new Date(formData.suicideRiskReferralDate) : null;
          !isNullOrUndefined(formData.suicidesafetyDOB) ? formData.suicidesafetyDOB = new Date(formData.suicidesafetyDOB) : null;
          !isNullOrUndefined(formData.suicidesafetyAssmntDate) ? formData.suicidesafetyAssmntDate = new Date(formData.suicidesafetyAssmntDate) : null;
          // tslint:disable-next-line:max-line-length
          !isNullOrUndefined(formData.suicideInterventionClientDate) ? formData.suicideInterventionClientDate = new Date(formData.suicideInterventionClientDate) : null;
          // tslint:disable-next-line:max-line-length
          !isNullOrUndefined(formData.suicideInterventionParentDate) ? formData.suicideInterventionParentDate = new Date(formData.suicideInterventionParentDate) : null;
          !isNullOrUndefined(formData.conductedRescreenDate) ? formData.conductedRescreenDate = new Date(formData.conductedRescreenDate) : null;

          !isNullOrUndefined(formData.childAssessmentDate1) ? formData.childAssessmentDate1 = new Date(formData.childAssessmentDate1) : null;
          !isNullOrUndefined(formData.childAssessmentDate2) ? formData.childAssessmentDate2 = new Date(formData.childAssessmentDate2) : null;
          !isNullOrUndefined(formData.childAssessmentDate3) ? formData.childAssessmentDate3 = new Date(formData.childAssessmentDate3) : null;
          !isNullOrUndefined(formData.childAssessmentDate4) ? formData.childAssessmentDate4 = new Date(formData.childAssessmentDate4) : null;
          !isNullOrUndefined(formData.childAssessmentDate5) ? formData.childAssessmentDate5 = new Date(formData.childAssessmentDate5) : null;
          !isNullOrUndefined(formData.childAssessmentDate6) ? formData.childAssessmentDate6 = new Date(formData.childAssessmentDate6) : null;
          !isNullOrUndefined(formData.childAssessmentDate7) ? formData.childAssessmentDate7 = new Date(formData.childAssessmentDate7) : null;
          !isNullOrUndefined(formData.childAssessmentDate8) ? formData.childAssessmentDate8 = new Date(formData.childAssessmentDate8) : null;
          !isNullOrUndefined(formData.childAssessmentDate9) ? formData.childAssessmentDate9 = new Date(formData.childAssessmentDate9) : null;
          !isNullOrUndefined(formData.childAssessmentDate) ? formData.childAssessmentDate = new Date(formData.childAssessmentDate) : null;

          this.fpInitialFamily = formData;

        }
        loader.style.display = 'none';
        this.isEdit = true;
        // this.isPrint = true;
        this.initialFamilyAssessmentForm.disable();
      });
    }, 5000);
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }


}
