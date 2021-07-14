import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FpServiceCode } from './fp-service-code';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';

@Component({
  selector: 'app-service-and-service-code',
  templateUrl: './service-and-service-code.component.html',
  styleUrls: ['./service-and-service-code.component.scss', '../family-preservation.scss'],
  outputs: ['serviceOut']
})
export class ServiceAndServiceCodeComponent implements OnInit {
  fpServiceAndServiceCode: FpServiceCode = new FpServiceCode();
  ServiceAndServiceForm: FormGroup;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  serviceOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
      this.ServiceAndServiceForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/case-plan-goals/new') {
      this.editControll = false;
    }

    this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpServiceAndServiceCode = json.cmsFormJson;


  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpServiceAndServiceCode.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.fpServiceAndServiceCode.caseNumber = data.person.kaecses;
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpServiceAndServiceCode.caseId = (data.referral.caseID.caseID);
      });
      this._team.getUserName()
      .then((data) => {
        console.log('data in this._team.getUserName() is', data);
        this.printedBy = data.users.firstName + ' ' + data.users.lastName;

      });
  }

  saveForm(event, source) {
    console.log('source is', source, 'label is', event);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.serviceOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.serviceOut.emit({ cmsData: {} });
  }
  editForm() {
    this.ServiceAndServiceForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.ServiceAndServiceForm = this._fb.group({
      caseName: [null],
      caseNumber: [null],
      caseId: [null],
      isIPatientTreatment: [false],
      isPhysicalExamination: [false],
      isWellnessMonitoring: [false],
      isSpeechTherapy: [false],
      isOutPatientTreatment: [false],
      isOccupationalTherapy: [false],
      isVocationalEducation: [false],
      isTutoring: [false],
      isDriverEducation: [false],
      isSpecialEducation: [false],
      isCollege: [false],
      isAdultBasic: [false],
      isEducationAdvocate: [false],
      isGedPreparation: [false],
      isAttendance: [false],
      isPartialDaySocial: [false],
      isPsychologicalTesting: [false],
      isMedicineManagement: [false],
      isIndividualTherapy: [false],
      isYouthMentorship: [false],
      isGroupTherapy: [false],
      isAttendantCare: [false],
      isFamilyTherapy: [false],
      isEarlyEd: [false],
      isCounseling: [false],
      isWaivers: [false],
      isResidenceAdaptation: [false],
      isEmergencyClothing: [false],
      isEmergencyUtilities: [false],
      isEmergencyHouseRepairs: [false],
      isEmergencyShelter: [false],
      isHouseholdFurniture: [false],
      isEmploymentPreparation: [false],
      isEmergencyShelterProtective: [false],
      isIntakeAndAssessment: [false],
      isRespiteCare: [false],
      isHomeFamily: [false],
      isSupportServices: [false],
      isFamilyPreservationReferral: [false],
      isFamilyServicesReferral: [false],
      isParentingEducation: [false],
      isBudgeting: [false],
      isChildSupport: [false],
      isAssistWithApplication: [false],
      isFamilyFinancial: [false],
      isSocialServiceCoordination: [false],
      isCaseManagement: [false],
      isVoid: [false],
      isBasicLivingSkills: [false],
      isMediationServices: [false],
      isAdoptiveFamilyAssessment: [false],
      isAdoptivePlacement: [false],
      isAdoptiveFamilyRecruitment: [false],
      isAdoptiveFamilyPreparation: [false],
      isAdoptionSubsidy: [false],
      isChildCareCenter: [false],
      isChildCareInOther: [false],
      isChildCareInOwn: [false],
      isHousingEducation: [false],
      isSpecialEducationVocational: [false],
      isHealthEducation: [false],
      isNeedsAssessment: [false],
      isMarriageEducation: [false],
      isAcademicSupports: [false],
      isMentoring: [false],
      isPostSecondary: [false],
      isSuperviseIndependent: [false],
      isCareerPreparation: [false],
      isRoomAndBoard: [false],
      isVocationalPrograms: [false],
      isEducationFinancialAssistance: [false],
      isBudgetAndFinancial: [false],
      isOtherFinancial: [false],
      isDrugAndAlcohol: [false],
      isClothingAllowance: [false],
      isInterpreterServices: [false],
      isNonMedicalTransportation: [false],
      isCourtesySupervision: [false],
      isMother: [false],
      isFather: [false],
      printedBy: [null],
      printedDate: [null],

    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
