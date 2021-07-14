import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { RiCaregiver } from './ri-caregiver';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-caregiver-response-tool',
  templateUrl: './caregiver-response-tool.component.html',
  styleUrls: ['./caregiver-response-tool.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['careGiveOut']
})
export class CaregiverResponseToolComponent implements OnInit {
  riCaregiverResponse: RiCaregiver = new RiCaregiver();
  caregiverResponseForm: FormGroup;
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  careGiveOut = new EventEmitter()

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/caregiver/response/tool/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.caregiverResponseForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.riCaregiverResponse = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    this.riCaregiverResponse = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.riCaregiverResponse.clientName = data.person.firstName + " " + data.person.lastName;
        this.riCaregiverResponse.date = new Date();
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);

      })
    this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }



  saveForm(event, source) {
    console.log('source is', source, 'label is', event);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    // source.typeOfDod = 'assessment';
    this.careGiveOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.careGiveOut.emit({ cmsData: {} });
  }
  editForm() {
    this.caregiverResponseForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.caregiverResponseForm = this._fb.group({
      clientName: [null],
      caregiverName: [null],
      sponsoringAgency: [null],
      homeWorker: [null],
      clientOffice: [null],
      date: [null],
      ////////
      isMinimal: [false],
      isAttendsIep: [false],
      isAddressesAttendance: [false],
      isMaintainsInvolvement: [false],
      isWorksWithSchool: [false],
      isFollowsUpDaily: [false],
      isFollowsUpMultiple: [false],
      isProvidesActivity: [false],

      providesActivityExplanation: [null],

      isRedirection: [false],

      isConstructivelyReinforces: [false],
      isConstructivelyReinforcesAdults: [false],
      isDisplaysEmpathy: [false],
      isProvidesRoutine: [false],
      isProvidesSupervision: [false],
      isParticipatesTraining: [false],
      isProvidesBeyondAge: [false],
      isProvidesDirectCare: [false],
      isEnsuresChild: [false],
      isProvidesDirectCareProvision: [false],

      isSupervision: [false],

      providesDirectCareProvisionExplanation: [null],
      isParticipatesTraining1: [false],
      isMonitorsChildEnvironment: [false],

      monitorsChildEnvironmentExplanation: [null],

      isNoExtraSupports: [false],
      isProvidesNurturing: [false],
      isArrangesAndTransports: [false],
      isConsultsMentalHealth: [false],
      isArrangesChildMedicine: [false],
      isParticipatesTrainingPathology: [false],
      isProvidesBeyondAge1: [false],
      isPreviouslyHospitalized: [false],
      isChildSelfHarms: [false],
      isChildAttemptsSuicide: [false],

      childAttemptsSuicideExplanation: [null],

      isSexuallyAbusedYes: [false],
      isSexuallyAbusedNo: [false],

      isSexuallyActYes: [false],
      isSexuallyActNo: [false],
      isNoExtraSupports1: [false],
      isProvidesNurturingCaring: [false],
      isEngagesChildConstructive: [false],
      isProvidesExtraGuidance: [false],
      isParticipatesTraining2: [false],
      isProvidesSupervisionChild: [false],
      isProvidesSupervisionStructure: [false],
      isFollowsTreatmentPlan: [false],
      isServicesProgramsImplemented: [false],

      servicesProgramsExplanation: [null],

      isChildHaveDocumentsYes: [false],
      isChildHaveDocumentsNo: [false],
      isDoesntSupportPlan: [false],
      isBehavioralEmotional: [false],
      isReinforceDangers: [false],
      isDangersOfDrug: [false],
      isRoutineDirectCare: [false],
      isDocumentedMedicalYes: [false],
      isDocumentedMedicalNo: [false],
      isParticipatesRoutineMedical: [false],
      isEstablishedMedicalProfessional: [false],
      isNighttimeSupervision: [false],
      isProvidesCleaning: [false],
      isParticipatesAdditionalVisits: [false],
      isProvidesSpecializedInterventions: [false],

      providesSpecializedExplanation: [null],

      isDevelopmentalDelaysYes: [false],
      isDevelopmentalDelaysNo: [false],
      isDevelopmentalNoSupports: [false],
      isWorksWithClient: [false],
      isDisabilities: [false],
      disabilitiesExplanation: [null],

      isRunawayNoSupports: [false],
      isOpenCommunication: [false],
      isMonitorsSpecialized: [false],
      isPlanToEnsureSafety: [false],
      planToEnsureSafetyExplanation: [null],

      isPartnershipYes: [false],
      isPartnershipNo: [false],

      isPartnershipLifeYes: [false],
      isPartnershipLifeNo: [false],

      specificInteractions: [null],
      completedBy: [null],
      printedBy: [null],
      printedDate: [null],

    });
  }

  getDetails() {
    setTimeout(() => {
      let formData;
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      // let assessmentId = localStorage.getItem('asssessmentId');
      // let req = { assessmentID: assessmentId }
      // this._opencard.getAssessmentRec(req).then((data) => {
      //   formData = data.pdfForms.pdfForms;
      //     !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
      //         this.riCaregiverResponse = formData;
      //   loader.style.display = 'none';
      //   this.isEdit = true;
      //   // this.isPrint = true;
      //   this.caregiverResponseForm.disable();
      // })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}

