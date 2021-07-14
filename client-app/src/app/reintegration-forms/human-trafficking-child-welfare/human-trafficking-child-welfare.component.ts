import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReHumanTraffic } from './re-human-traffic';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-human-trafficking-child-welfare',
  templateUrl: './human-trafficking-child-welfare.component.html',
  styleUrls: ['./human-trafficking-child-welfare.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['humanTrackOut']
})
export class HumanTraffickingChildWelfareComponent implements OnInit {
  humanTraffickingForm: FormGroup;
  reHumanTrafficking: ReHumanTraffic = new ReHumanTraffic();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  humanTrackOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/human/trafficking/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.humanTraffickingForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reHumanTrafficking = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.DateOfReferral) ? formData.DateOfReferral = new Date(formData.DateOfReferral) : null;
    !isNullOrUndefined(formData.DateAssessment) ? formData.DateAssessment = new Date(formData.DateAssessment) : null;
    !isNullOrUndefined(formData.TimeAssessment) ? formData.TimeAssessment = new Date(formData.TimeAssessment) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    !isNullOrUndefined(formData.TimeOfReferral) ? formData.TimeOfReferral = new Date(formData.TimeOfReferral) : null;
    !isNullOrUndefined(formData.Dob1) ? formData.Dob1 = new Date(formData.Dob1) : null;
    !isNullOrUndefined(formData.SafetyDob) ? formData.SafetyDob = new Date(formData.SafetyDob) : null;
    this.reHumanTrafficking = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reHumanTrafficking.ChildName = data.person.firstName + " " + data.person.lastName;
        this.reHumanTrafficking.Dob = new Date(data.person.dob);
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.reHumanTrafficking.DateOfReferral = new Date(data.referral.referralDate)
      })
    this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }

  editForm() {
    this.humanTraffickingForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.DateOfReferral) ? source.DateOfReferral = Date.parse(source.DateOfReferral) : null;
    !isNullOrUndefined(source.DateAssessment) ? source.DateAssessment = Date.parse(source.DateAssessment) : null;
    !isNullOrUndefined(source.TimeAssessment) ? source.TimeAssessment = Date.parse(source.TimeAssessment) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.TimeOfReferral) ? source.TimeOfReferral = Date.parse(source.TimeOfReferral) : null;
    !isNullOrUndefined(source.Dob1) ? source.Dob1 = Date.parse(source.Dob1) : null;
    !isNullOrUndefined(source.SafetyDob) ? source.SafetyDob = Date.parse(source.SafetyDob) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.humanTrackOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.humanTrackOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.humanTraffickingForm = this._fb.group({
      ChildName: [null],
      Dob: [null],
      IsMale: [false],
      IsFemale: [false],
      Race: [null],
      DateOfReferral: [null],
      Region: [null],
      TimeOfReferral: [null],
      County: [null],
      EnforcementLocated: [null],
      State: [null],
      DateAssessment: [null],
      TimeAssessment: [null],
      IsHtYes: [false],
      IsHtNo: [false],

      isStaffSecure: [false],
      isMhScreen: [false],
      isFamily: [false],
      isFoster: [false],
      isEmergency: [false],

      PlacementExplanation: [null],
      ServiceRecommendations: [null],
      PlacementOutcome: [null],
      ServiceOutcome: [null],
      AddressOfParent: [null],

      PrintedName: [null],
      Signature: [null],
      Date: [null],
      SignChildName: [null],
      Dob1: [null],
      SafeRight: [null],
      NotSafeRight: [null],
      RunAway: [null],
      Intimidation: [null],
      Pressure: [null],
      PaymentForDrugs: [null],
      SafetyChildName: [null],
      SafetyDob: [null],
      ForcedPhysically: [null],
      PhysicalAbuse: [null],
      Relationship: [null],
      KillYourself: [null],
      Servitude: [null],
      SexTrafficking: [null],
      SexTraffickingEngage: [null],
      SexTraffickingDrugs: [null],
      LaborTrafficking: [null],

      IsSelfReportedYes: [false],
      IsSelfReportedNo: [false],

      IsLawEnforcementYes: [false],
      IsLawEnforcementNo: [false],

      IsSexualEncounterYes: [false],
      IsSexualEncounterNo: [false],

      IsChildParticipatedYes: [false],
      IsChildParticipatedNo: [false],

      IsUnauthorizedTravelYes: [false],
      IsUnauthorizedTravelNo: [false],

      IsUnaccountedInjuriesYes: [false],
      IsUnaccountedInjuriesNo: [false],

      IsResponsesYes: [false],
      IsResponsesNo: [false],

      IsAwolsYes: [false],
      IsAwolsNo: [false],

      IsReportsYes: [false],
      IsReportsNo: [false],

      IsInternetPostingYes: [false],
      IsInternetPostingNo: [false],

      IsReportedHistoryYes: [false],
      IsReportedHistoryNo: [false],

      IsRomanticRelationshipYes: [false],
      IsRomanticRelationshipNo: [false],


      IsUnwillingYes: [false],
      IsUnwillingNo: [false],

      IsTransmittedDiseaseYes: [false],
      IsTransmittedDiseaseNo: [false],


      IsGangAffiliationYes: [false],
      IsGangAffiliationNo: [false],
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
      // !isNullOrUndefined(formData.DateOfReferral) ? formData.DateOfReferral = new Date(formData.DateOfReferral) : null;
      // !isNullOrUndefined(formData.DateAssessment) ? formData.DateAssessment = new Date(formData.DateAssessment) : null;
      // !isNullOrUndefined(formData.TimeAssessment) ? formData.TimeAssessment = new Date(formData.TimeAssessment) : null;
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      // !isNullOrUndefined(formData.TimeOfReferral) ? formData.TimeOfReferral = new Date(formData.TimeOfReferral) : null;
      // !isNullOrUndefined(formData.Dob1) ? formData.Dob1 = new Date(formData.Dob1) : null;

      // !isNullOrUndefined(formData.SafetyDob) ? formData.SafetyDob = new Date(formData.SafetyDob) : null;
      //  this.reHumanTrafficking = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.humanTraffickingForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
