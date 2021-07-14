import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReInitialPlacement } from './re-initial-placement';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-initial-placement-screening-tool',
  templateUrl: './initial-placement-screening-tool.component.html',
  styleUrls: ['./initial-placement-screening-tool.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['iniPlaceScrOut']
})
export class InitialPlacementScreeningToolComponent implements OnInit {
  initialPlacementForm: FormGroup;
  reInitialPlacement: ReInitialPlacement = new ReInitialPlacement();
  isEdit= false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  iniPlaceScrOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {
  
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/initial/placement/screening/tool/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.initialPlacementForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reInitialPlacement = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    this.reInitialPlacement = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reInitialPlacement.ClientName = data.person.firstName + " " + data.person.lastName;
        this.reInitialPlacement.Kaecses = data.person.kaecses;
        this.reInitialPlacement.Dob = new Date(data.person.dob);
        this.reInitialPlacement.Date = new Date();
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

  editForm() {
    this.initialPlacementForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.iniPlaceScrOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.iniPlaceScrOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.initialPlacementForm = this._fb.group({

      ClientName: [null],
      Kaecses: [null],
      Dob: [null],
      PermanencySpecialist: [null],
      Office: [null],
      Date:[null],
      isKinshipExploredYes: [false],
      isKinshipExploredNo: [false],
      isMinimal: [false],
      isIep: [false],
      isAttendance: [false],
      isFrequent: [false],
      isAlternativeSchooling: [false],
      isSuspended: [false],

      isDevelopmentalNone: [false],
      isDevelopmentalNotAll: [false],
      isDevelopmentalDocumented: [false],

      isAggressiveDocumented: [false],
      isAggressivePeers: [false],
      isAggressiveAdults: [false],
      isAggressiveDamageToProperty: [false],
      isAggressiveAnimals: [false],
      isAggressivePersons: [false],
      isAggressiveExplain: [false],

      isSexualAbuseNone: [false],
      isSexualAbuseSuspected: [false],
      isSexualAbuseNotDocumented: [false],
      isSexualAbuseExperienced: [false],
      isSexualAbuseAnimals: [false],
      isSexualAbuseOffender: [false],
      isSexualAbuseOffender1: [false],

      isTotalScoreFamily: [false],
      isTotalScoreDiversion: [false],
      isTotalScoreSpecialized: [false],
      isTotalScoreTreatment: [false],
      isTotalScoreYrc: [false],
      isTotalScoreScreening: [false],

      isHealthConcernsNone: [false],
      isHealthConcernsDocumented: [false],
      isHealthConcernsSleepDisturbance: [false],
      isHealthConcernsAssessment: [false],
      isHealthConcernsMedicalNeeds: [false],

      isRunawayNoRunning: [false],
      isRunawayMultipleRuns: [false],
      isRunawayCourt: [false],

      isMentalHealthNo: [false],
      isMentalHealthTherapy: [false],
      isMentalHealthBehaviors: [false],
      isMentalHealthClientRefuses: [false],
      isMentalHealthDiagnosis: [false],
      isMentalHealthHospitalized: [false],
      isMentalHealthSuicide: [false],
      isMentalHealthSuicideAttempt: [false],

      isAlcoholNone: [false],
      isAlcoholSuspected: [false],
      isAlcoholExperimental: [false],
      isAlcoholHigh: [false],
      isAlcoholRefusing: [false],
      isAlcoholFrequent: [false],

      CompletedBy: [null],
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
       // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      //  !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      //  this.reInitialPlacement = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.initialPlacementForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
