import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpTreatmentPlan } from './fp-treatment-plan';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';

@Component({
  selector: 'app-treatment-plan-update',
  templateUrl: './treatment-plan-update.component.html',
  styleUrls: ['./treatment-plan-update.component.scss', '../family-preservation.scss'],
  outputs: ['treatPlanOut']
})
export class TreatmentPlanUpdateComponent implements OnInit {
  fpTreatmentPlan: FpTreatmentPlan = new FpTreatmentPlan();
  treatmentPlanForm: FormGroup;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  treatPlanOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/assessment/detail') {
      this.getCmsFormJson();
      this.treatmentPlanForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/assessment/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpTreatmentPlan = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfBirth) ? formData.dateOfBirth = new Date(formData.dateOfBirth) : null;
    !isNullOrUndefined(formData.mhaDate) ? formData.mhaDate = new Date(formData.mhaDate) : null;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;


    !isNullOrUndefined(formData.goalIStartDate) ? formData.goalIStartDate = new Date(formData.goalIStartDate) : null;
    !isNullOrUndefined(formData.goalITargetDate) ? formData.goalITargetDate = new Date(formData.goalITargetDate) : null;
    // !isNullOrUndefined(formData.goalITargetDate) ? formData.goalITargetDate = new Date(formData.goalITargetDate) : null;

    !isNullOrUndefined(formData.goalIStartDate1) ? formData.goalIStartDate1 = new Date(formData.goalIStartDate1) : null;
    !isNullOrUndefined(formData.goalITargetDate1) ? formData.goalITargetDate1 = new Date(formData.goalITargetDate1) : null;
    // !isNullOrUndefined(formData.goalITargetDate1) ? formData.goalITargetDate1 = new Date(formData.goalITargetDate1) : null;

    !isNullOrUndefined(formData.goalIStartDate2) ? formData.goalIStartDate2 = new Date(formData.goalIStartDate2) : null;
    !isNullOrUndefined(formData.goalITargetDate2) ? formData.goalITargetDate2 = new Date(formData.goalITargetDate2) : null;
    // !isNullOrUndefined(formData.goalITargetDate2) ? formData.goalITargetDate2 = new Date(formData.goalITargetDate2) : null;

    !isNullOrUndefined(formData.goalIStartDate3) ? formData.goalIStartDate3 = new Date(formData.goalIStartDate3) : null;
    !isNullOrUndefined(formData.goalITargetDate3) ? formData.goalITargetDate3 = new Date(formData.goalITargetDate3) : null;
    // !isNullOrUndefined(formData.goalITargetDate3) ? formData.goalITargetDate3 = new Date(formData.goalITargetDate3) : null;

    !isNullOrUndefined(formData.goalIStartDate4) ? formData.goalIStartDate4 = new Date(formData.goalIStartDate4) : null;
    !isNullOrUndefined(formData.goalITargetDate4) ? formData.goalITargetDate4 = new Date(formData.goalITargetDate4) : null;
    // !isNullOrUndefined(formData.goalITargetDate4) ? formData.goalITargetDate4 = new Date(formData.goalITargetDate4) : null;

    //////////////////////

    !isNullOrUndefined(formData.goalIIStartDate) ? formData.goalIIStartDate = new Date(formData.goalIIStartDate) : null;
    !isNullOrUndefined(formData.goalIITargetDate) ? formData.goalIITargetDate = new Date(formData.goalIITargetDate) : null;
    // !isNullOrUndefined(formData.goalIITargetDate) ? formData.goalIITargetDate = new Date(formData.goalIITargetDate) : null;

    !isNullOrUndefined(formData.goalIIStartDate1) ? formData.goalIIStartDate1 = new Date(formData.goalIIStartDate1) : null;
    !isNullOrUndefined(formData.goalIITargetDate1) ? formData.goalIITargetDate1 = new Date(formData.goalIITargetDate1) : null;
    // !isNullOrUndefined(formData.goalIITargetDate1) ? formData.goalIITargetDate1 = new Date(formData.goalIITargetDate1) : null;

    !isNullOrUndefined(formData.goalIIStartDate2) ? formData.goalIIStartDate2 = new Date(formData.goalIIStartDate2) : null;
    !isNullOrUndefined(formData.goalIITargetDate2) ? formData.goalIITargetDate2 = new Date(formData.goalIITargetDate2) : null;
    // !isNullOrUndefined(formData.goalIITargetDate2) ? formData.goalIITargetDate2 = new Date(formData.goalIITargetDate2) : null;

    !isNullOrUndefined(formData.goalIIStartDate3) ? formData.goalIIStartDate3 = new Date(formData.goalIIStartDate3) : null;
    !isNullOrUndefined(formData.goalIITargetDate3) ? formData.goalIITargetDate3 = new Date(formData.goalIITargetDate3) : null;
    // !isNullOrUndefined(formData.goalIITargetDate3) ? formData.goalIITargetDate3 = new Date(formData.goalIITargetDate3) : null;

    !isNullOrUndefined(formData.goalIIStartDate4) ? formData.goalIIStartDate4 = new Date(formData.goalIIStartDate4) : null;
    !isNullOrUndefined(formData.goalIITargetDate4) ? formData.goalIITargetDate4 = new Date(formData.goalIITargetDate4) : null;
    // !isNullOrUndefined(formData.goalIITargetDate4) ? formData.goalIITargetDate4 = new Date(formData.goalIITargetDate4) : null;

    ////////////////////

    !isNullOrUndefined(formData.goalIIIStartDate) ? formData.goalIIIStartDate = new Date(formData.goalIIIStartDate) : null;
    !isNullOrUndefined(formData.goalIIITargetDate) ? formData.goalIIITargetDate = new Date(formData.goalIIITargetDate) : null;
    // !isNullOrUndefined(formData.goalIIITargetDate) ? formData.goalIIITargetDate = new Date(formData.goalIIITargetDate) : null;

    !isNullOrUndefined(formData.goalIIIStartDate1) ? formData.goalIIIStartDate1 = new Date(formData.goalIIIStartDate1) : null;
    !isNullOrUndefined(formData.goalIIITargetDate1) ? formData.goalIIITargetDate1 = new Date(formData.goalIIITargetDate1) : null;
    // !isNullOrUndefined(formData.goalIIITargetDate1) ? formData.goalIIITargetDate1 = new Date(formData.goalIIITargetDate1) : null;

    !isNullOrUndefined(formData.goalIIIStartDate2) ? formData.goalIIIStartDate2 = new Date(formData.goalIIIStartDate2) : null;
    !isNullOrUndefined(formData.goalIIITargetDate2) ? formData.goalIIITargetDate2 = new Date(formData.goalIIITargetDate2) : null;
    // !isNullOrUndefined(formData.goalIIITargetDate2) ? formData.goalIIITargetDate2 = new Date(formData.goalIIITargetDate2) : null;

    !isNullOrUndefined(formData.goalIIIStartDate3) ? formData.goalIIIStartDate3 = new Date(formData.goalIIIStartDate3) : null;
    !isNullOrUndefined(formData.goalIIITargetDate3) ? formData.goalIIITargetDate3 = new Date(formData.goalIIITargetDate3) : null;
    // !isNullOrUndefined(formData.goalIIITargetDate3) ? formData.goalIIITargetDate3 = new Date(formData.goalIIITargetDate3) : null;

    !isNullOrUndefined(formData.goalIIIStartDate4) ? formData.goalIIIStartDate4 = new Date(formData.goalIIIStartDate4) : null;
    !isNullOrUndefined(formData.goalIIITargetDate4) ? formData.goalIIITargetDate4 = new Date(formData.goalIIITargetDate4) : null;
    // !isNullOrUndefined(formData.goalIIITargetDate4) ? formData.goalIIITargetDate4 = new Date(formData.goalIIITargetDate4) : null;

    ////////////////////////////////////////////////////////////////

    !isNullOrUndefined(formData.longGoalStartDate) ? formData.longGoalStartDate = new Date(formData.longGoalStartDate) : null;
    !isNullOrUndefined(formData.longGoalTargetDate) ? formData.longGoalTargetDate = new Date(formData.longGoalTargetDate) : null;
    // !isNullOrUndefined(formData.longGoalTargetDate) ? formData.longGoalTargetDate = new Date(formData.longGoalTargetDate) : null;

    !isNullOrUndefined(formData.longGoalStartDate1) ? formData.longGoalStartDate1 = new Date(formData.longGoalStartDate1) : null;
    !isNullOrUndefined(formData.longGoalTargetDate1) ? formData.longGoalTargetDate1 = new Date(formData.longGoalTargetDate1) : null;
    // !isNullOrUndefined(formData.longGoalTargetDate1) ? formData.longGoalTargetDate1 = new Date(formData.longGoalTargetDate1) : null;

    !isNullOrUndefined(formData.longGoalStartDate2) ? formData.longGoalStartDate2 = new Date(formData.longGoalStartDate2) : null;
    !isNullOrUndefined(formData.longGoalTargetDate2) ? formData.longGoalTargetDate2 = new Date(formData.longGoalTargetDate2) : null;
    // !isNullOrUndefined(formData.longGoalTargetDate2) ? formData.longGoalTargetDate2 = new Date(formData.longGoalTargetDate2) : null;

    !isNullOrUndefined(formData.longGoalStartDate3) ? formData.longGoalStartDate3 = new Date(formData.longGoalStartDate3) : null;
    !isNullOrUndefined(formData.longGoalTargetDate3) ? formData.longGoalTargetDate3 = new Date(formData.longGoalTargetDate3) : null;
    // !isNullOrUndefined(formData.longGoalTargetDate3) ? formData.longGoalTargetDate3 = new Date(formData.longGoalTargetDate3) : null;

    !isNullOrUndefined(formData.longGoalStartDate4) ? formData.longGoalStartDate4 = new Date(formData.longGoalStartDate4) : null;
    !isNullOrUndefined(formData.longGoalTargetDate4) ? formData.longGoalTargetDate4 = new Date(formData.longGoalTargetDate4) : null;
    this.fpTreatmentPlan = formData;
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpTreatmentPlan.clientName = data.person.firstName + ' ' + data.person.lastName;
        this.fpTreatmentPlan.date = new Date();
        this.fpTreatmentPlan.dateOfBirth = new Date(data.person.dob);
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpTreatmentPlan.factsNumber = (data.referral.facts);
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
    !isNullOrUndefined(source.dateOfBirth) ? source.dateOfBirth = Date.parse(source.dateOfBirth) : null;
    !isNullOrUndefined(source.mhaDate) ? source.mhaDate = Date.parse(source.mhaDate) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;


    !isNullOrUndefined(source.goalIStartDate) ? source.goalIStartDate = Date.parse(source.goalIStartDate) : null;
    !isNullOrUndefined(source.goalITargetDate) ? source.goalITargetDate = Date.parse(source.goalITargetDate) : null;
    // !isNullOrUndefined(source.goalITargetDate) ? source.goalITargetDate = Date.parse(source.goalITargetDate) : null;

    !isNullOrUndefined(source.goalIStartDate1) ? source.goalIStartDate1 = Date.parse(source.goalIStartDate1) : null;
    !isNullOrUndefined(source.goalITargetDate1) ? source.goalITargetDate1 = Date.parse(source.goalITargetDate1) : null;
    // !isNullOrUndefined(source.goalITargetDate1) ? source.goalITargetDate1 = Date.parse(source.goalITargetDate1) : null;

    !isNullOrUndefined(source.goalIStartDate2) ? source.goalIStartDate2 = Date.parse(source.goalIStartDate2) : null;
    !isNullOrUndefined(source.goalITargetDate2) ? source.goalITargetDate2 = Date.parse(source.goalITargetDate2) : null;
    // !isNullOrUndefined(source.goalITargetDate2) ? source.goalITargetDate2 = Date.parse(source.goalITargetDate2) : null;

    !isNullOrUndefined(source.goalIStartDate3) ? source.goalIStartDate3 = Date.parse(source.goalIStartDate3) : null;
    !isNullOrUndefined(source.goalITargetDate3) ? source.goalITargetDate3 = Date.parse(source.goalITargetDate3) : null;
    // !isNullOrUndefined(source.goalITargetDate3) ? source.goalITargetDate3 = Date.parse(source.goalITargetDate3) : null;

    !isNullOrUndefined(source.goalIStartDate4) ? source.goalIStartDate4 = Date.parse(source.goalIStartDate4) : null;
    !isNullOrUndefined(source.goalITargetDate4) ? source.goalITargetDate4 = Date.parse(source.goalITargetDate4) : null;
    // !isNullOrUndefined(source.goalITargetDate4) ? source.goalITargetDate4 = Date.parse(source.goalITargetDate4) : null;

    //////////////////////

    !isNullOrUndefined(source.goalIIStartDate) ? source.goalIIStartDate = Date.parse(source.goalIIStartDate) : null;
    !isNullOrUndefined(source.goalIITargetDate) ? source.goalIITargetDate = Date.parse(source.goalIITargetDate) : null;
    // !isNullOrUndefined(source.goalIITargetDate) ? source.goalIITargetDate = Date.parse(source.goalIITargetDate) : null;

    !isNullOrUndefined(source.goalIIStartDate1) ? source.goalIIStartDate1 = Date.parse(source.goalIIStartDate1) : null;
    !isNullOrUndefined(source.goalIITargetDate1) ? source.goalIITargetDate1 = Date.parse(source.goalIITargetDate1) : null;
    // !isNullOrUndefined(source.goalIITargetDate1) ? source.goalIITargetDate1 = Date.parse(source.goalIITargetDate1) : null;

    !isNullOrUndefined(source.goalIIStartDate2) ? source.goalIIStartDate2 = Date.parse(source.goalIIStartDate2) : null;
    !isNullOrUndefined(source.goalIITargetDate2) ? source.goalIITargetDate2 = Date.parse(source.goalIITargetDate2) : null;
    // !isNullOrUndefined(source.goalIITargetDate2) ? source.goalIITargetDate2 = Date.parse(source.goalIITargetDate2) : null;

    !isNullOrUndefined(source.goalIIStartDate3) ? source.goalIIStartDate3 = Date.parse(source.goalIIStartDate3) : null;
    !isNullOrUndefined(source.goalIITargetDate3) ? source.goalIITargetDate3 = Date.parse(source.goalIITargetDate3) : null;
    // !isNullOrUndefined(source.goalIITargetDate3) ? source.goalIITargetDate3 = Date.parse(source.goalIITargetDate3) : null;

    !isNullOrUndefined(source.goalIIStartDate4) ? source.goalIIStartDate4 = Date.parse(source.goalIIStartDate4) : null;
    !isNullOrUndefined(source.goalIITargetDate4) ? source.goalIITargetDate4 = Date.parse(source.goalIITargetDate4) : null;
    // !isNullOrUndefined(source.goalIITargetDate4) ? source.goalIITargetDate4 = Date.parse(source.goalIITargetDate4) : null;

    ////////////////////

    !isNullOrUndefined(source.goalIIIStartDate) ? source.goalIIIStartDate = Date.parse(source.goalIIIStartDate) : null;
    !isNullOrUndefined(source.goalIIITargetDate) ? source.goalIIITargetDate = Date.parse(source.goalIIITargetDate) : null;
    // !isNullOrUndefined(source.goalIIITargetDate) ? source.goalIIITargetDate = Date.parse(source.goalIIITargetDate) : null;

    !isNullOrUndefined(source.goalIIIStartDate1) ? source.goalIIIStartDate1 = Date.parse(source.goalIIIStartDate1) : null;
    !isNullOrUndefined(source.goalIIITargetDate1) ? source.goalIIITargetDate1 = Date.parse(source.goalIIITargetDate1) : null;
    // !isNullOrUndefined(source.goalIIITargetDate1) ? source.goalIIITargetDate1 = Date.parse(source.goalIIITargetDate1) : null;

    !isNullOrUndefined(source.goalIIIStartDate2) ? source.goalIIIStartDate2 = Date.parse(source.goalIIIStartDate2) : null;
    !isNullOrUndefined(source.goalIIITargetDate2) ? source.goalIIITargetDate2 = Date.parse(source.goalIIITargetDate2) : null;
    // !isNullOrUndefined(source.goalIIITargetDate2) ? source.goalIIITargetDate2 = Date.parse(source.goalIIITargetDate2) : null;

    !isNullOrUndefined(source.goalIIIStartDate3) ? source.goalIIIStartDate3 = Date.parse(source.goalIIIStartDate3) : null;
    !isNullOrUndefined(source.goalIIITargetDate3) ? source.goalIIITargetDate3 = Date.parse(source.goalIIITargetDate3) : null;
    // !isNullOrUndefined(source.goalIIITargetDate3) ? source.goalIIITargetDate3 = Date.parse(source.goalIIITargetDate3) : null;

    !isNullOrUndefined(source.goalIIIStartDate4) ? source.goalIIIStartDate4 = Date.parse(source.goalIIIStartDate4) : null;
    !isNullOrUndefined(source.goalIIITargetDate4) ? source.goalIIITargetDate4 = Date.parse(source.goalIIITargetDate4) : null;
    // !isNullOrUndefined(source.goalIIITargetDate4) ? source.goalIIITargetDate4 = Date.parse(source.goalIIITargetDate4) : null;

    ////////////////////////////////////////////////////////////////

    !isNullOrUndefined(source.longGoalStartDate) ? source.longGoalStartDate = Date.parse(source.longGoalStartDate) : null;
    !isNullOrUndefined(source.longGoalTargetDate) ? source.longGoalTargetDate = Date.parse(source.longGoalTargetDate) : null;
    // !isNullOrUndefined(source.longGoalTargetDate) ? source.longGoalTargetDate = Date.parse(source.longGoalTargetDate) : null;

    !isNullOrUndefined(source.longGoalStartDate1) ? source.longGoalStartDate1 = Date.parse(source.longGoalStartDate1) : null;
    !isNullOrUndefined(source.longGoalTargetDate1) ? source.longGoalTargetDate1 = Date.parse(source.longGoalTargetDate1) : null;
    // !isNullOrUndefined(source.longGoalTargetDate1) ? source.longGoalTargetDate1 = Date.parse(source.longGoalTargetDate1) : null;

    !isNullOrUndefined(source.longGoalStartDate2) ? source.longGoalStartDate2 = Date.parse(source.longGoalStartDate2) : null;
    !isNullOrUndefined(source.longGoalTargetDate2) ? source.longGoalTargetDate2 = Date.parse(source.longGoalTargetDate2) : null;
    // !isNullOrUndefined(source.longGoalTargetDate2) ? source.longGoalTargetDate2 = Date.parse(source.longGoalTargetDate2) : null;

    !isNullOrUndefined(source.longGoalStartDate3) ? source.longGoalStartDate3 = Date.parse(source.longGoalStartDate3) : null;
    !isNullOrUndefined(source.longGoalTargetDate3) ? source.longGoalTargetDate3 = Date.parse(source.longGoalTargetDate3) : null;
    // !isNullOrUndefined(source.longGoalTargetDate3) ? source.longGoalTargetDate3 = Date.parse(source.longGoalTargetDate3) : null;

    !isNullOrUndefined(source.longGoalStartDate4) ? source.longGoalStartDate4 = Date.parse(source.longGoalStartDate4) : null;
    !isNullOrUndefined(source.longGoalTargetDate4) ? source.longGoalTargetDate4 = Date.parse(source.longGoalTargetDate4) : null;
    // !isNullOrUndefined(source.longGoalTargetDate4) ? source.longGoalTargetDate4 = Date.parse(source.longGoalTargetDate4) : null;

    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.treatPlanOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.treatPlanOut.emit({ cmsData: {} });
  }
  editForm() {
    this.treatmentPlanForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.treatmentPlanForm = this._fb.group({
      clientName: [null],
      factsNumber: [null],
      dateOfBirth: [null],
      mhaDate: [null],
      date: [null],
      coversFrom: [null],
      toEnd: [null],
      therapist: [null],
      presentingProblem: [null],
      clinicalSymptoms: [null],

      code: [null],
      principalFirst: [null],

      code1: [null],
      principalFirst1: [null],

      code2: [null],
      principalFirst2: [null],

      code3: [null],
      principalFirst3: [null],

      code4: [null],
      principalFirst4: [null],

      code5: [null],
      principalFirst5: [null],

      code6: [null],
      principalFirst6: [null],

      code7: [null],
      principalFirst7: [null],

      code8: [null],
      principalFirst8: [null],

      principalFirst9: [null],

      ///////////
      codeUpdated: [null],
      principalFirstUpdated: [null],

      code1Updated: [null],
      principalFirst1Updated: [null],

      code2Updated: [null],
      principalFirst2Updated: [null],

      code3Updated: [null],
      principalFirst3Updated: [null],

      code4Updated: [null],
      principalFirst4Updated: [null],

      code5Updated: [null],
      principalFirst5Updated: [null],

      code6Updated: [null],
      principalFirst6Updated: [null],

      code7Updated: [null],
      principalFirst7Updated: [null],

      code8Updated: [null],
      principalFirst8Updated: [null],

      principalFirst9Updated: [null],

      isNoShcn: [false],
      isSpmi: [false],
      isMentalIllness: [false],
      isIdd: [false],
      isPregnant: [false],
      isIntravenousDrugs: [false],
      isBarriers: [null],
      isStrengths: [null],
      isDischargeCriteria: [null],
      isOther: [false],
      ///////////////////////////////////////////////////////////////////////
      goalI: [null],

      goalIObj: [null],
      goalIObjectives: [null],
      goalIServiceModality: [null],
      goalIFrequency: [null],
      goalIDuration: [null],
      goalIStartDate: [null],
      goalITargetDate: [null],
      goalIReviewScore: [null],

      goalI1: [null],

      goalIObj1: [null],
      goalIObjectives1: [null],
      goalIServiceModality1: [null],
      goalIFrequency1: [null],
      goalIDuration1: [null],
      goalIStartDate1: [null],
      goalITargetDate1: [null],
      goalIReviewScore1: [null],

      goalI2: [null],

      goalIObj2: [null],
      goalIObjectives2: [null],
      goalIServiceModality2: [null],
      goalIFrequency2: [null],
      goalIDuration2: [null],
      goalIStartDate2: [null],
      goalITargetDate2: [null],
      goalIReviewScore2: [null],

      goalI3: [null],

      goalIObj3: [null],
      goalIObjectives3: [null],
      goalIServiceModality3: [null],
      goalIFrequency3: [null],
      goalIDuration3: [null],
      goalIStartDate3: [null],
      goalITargetDate3: [null],
      goalIReviewScore3: [null],

      goalI4: [null],

      goalIObj4: [null],
      goalIObjectives4: [null],
      goalIServiceModality4: [null],
      goalIFrequency4: [null],
      goalIDuration4: [null],
      goalIStartDate4: [null],
      goalITargetDate4: [null],
      goalIReviewScore4: [null],

      ////////////////////////////////////////////////////////////////////////

      goalII: [null],

      goalIIObj: [null],
      goalIIObjectives: [null],
      goalIIServiceModality: [null],
      goalIIFrequency: [null],
      goalIIDuration: [null],
      goalIIStartDate: [null],
      goalIITargetDate: [null],
      goalIIReviewScore: [null],

      goalII1: [null],

      goalIIObj1: [null],
      goalIIObjectives1: [null],
      goalIIServiceModality1: [null],
      goalIIFrequency1: [null],
      goalIIDuration1: [null],
      goalIIStartDate1: [null],
      goalIITargetDate1: [null],
      goalIIReviewScore1: [null],

      goalII2: [null],

      goalIIObj2: [null],
      goalIIObjectives2: [null],
      goalIIServiceModality2: [null],
      goalIIFrequency2: [null],
      goalIIDuration2: [null],
      goalIIStartDate2: [null],
      goalIITargetDate2: [null],
      goalIIReviewScore2: [null],

      goalII3: [null],

      goalIIObj3: [null],
      goalIIObjectives3: [null],
      goalIIServiceModality3: [null],
      goalIIFrequency3: [null],
      goalIIDuration3: [null],
      goalIIStartDate3: [null],
      goalIITargetDate3: [null],
      goalIIReviewScore3: [null],

      goalII4: [null],

      goalIIObj4: [null],
      goalIIObjectives4: [null],
      goalIIServiceModality4: [null],
      goalIIFrequency4: [null],
      goalIIDuration4: [null],
      goalIIStartDate4: [null],
      goalIITargetDate4: [null],
      goalIIReviewScore4: [null],

      ////////////////////////////////////////////////////////////////////////////////////////////////////


      goalIII: [null],

      goalIIIObj: [null],
      goalIIIObjectives: [null],
      goalIIIServiceModality: [null],
      goalIIIFrequency: [null],
      goalIIIDuration: [null],
      goalIIIStartDate: [null],
      goalIIITargetDate: [null],
      goalIIIReviewScore: [null],

      goalIII1: [null],

      goalIIIObj1: [null],
      goalIIIObjectives1: [null],
      goalIIIServiceModality1: [null],
      goalIIIFrequency1: [null],
      goalIIIDuration1: [null],
      goalIIIStartDate1: [null],
      goalIIITargetDate1: [null],
      goalIIIReviewScore1: [null],

      goalIII2: [null],

      goalIIIObj2: [null],
      goalIIIObjectives2: [null],
      goalIIIServiceModality2: [null],
      goalIIIFrequency2: [null],
      goalIIIDuration2: [null],
      goalIIIStartDate2: [null],
      goalIIITargetDate2: [null],
      goalIIIReviewScore2: [null],

      goalIII3: [null],

      goalIIIObj3: [null],
      goalIIIObjectives3: [null],
      goalIIIServiceModality3: [null],
      goalIIIFrequency3: [null],
      goalIIIDuration3: [null],
      goalIIIStartDate3: [null],
      goalIIITargetDate3: [null],
      goalIIIReviewScore3: [null],

      goalIII4: [null],

      goalIIIObj4: [null],
      goalIIIObjectives4: [null],
      goalIIIServiceModality4: [null],
      goalIIIFrequency4: [null],
      goalIIIDuration4: [null],
      goalIIIStartDate4: [null],
      goalIIITargetDate4: [null],
      goalIIIReviewScore4: [null],

      //////////////////////////////////////////////////
      longGoal: [null],

      longGoalObj: [null],
      longGoalObjectives: [null],
      longGoalServiceModality: [null],
      longGoalFrequency: [null],
      longGoalDuration: [null],
      longGoalStartDate: [null],
      longGoalTargetDate: [null],
      longGoalReviewScore: [null],

      longGoal1: [null],

      longGoalObj1: [null],
      longGoalObjectives1: [null],
      longGoalServiceModality1: [null],
      longGoalFrequency1: [null],
      longGoalDuration1: [null],
      longGoalStartDate1: [null],
      longGoalTargetDate1: [null],
      longGoalReviewScore1: [null],

      longGoal2: [null],

      longGoalObj2: [null],
      longGoalObjectives2: [null],
      longGoalServiceModality2: [null],
      longGoalFrequency2: [null],
      longGoalDuration2: [null],
      longGoalStartDate2: [null],
      longGoalTargetDate2: [null],
      longGoalReviewScore2: [null],

      longGoal3: [null],

      longGoalObj3: [null],
      longGoalObjectives3: [null],
      longGoalServiceModality3: [null],
      longGoalFrequency3: [null],
      longGoalDuration3: [null],
      longGoalStartDate3: [null],
      longGoalTargetDate3: [null],
      longGoalReviewScore3: [null],

      longGoal4: [null],

      longGoalObj4: [null],
      longGoalObjectives4: [null],
      longGoalServiceModality4: [null],
      longGoalFrequency4: [null],
      longGoalDuration4: [null],
      longGoalStartDate4: [null],
      longGoalTargetDate4: [null],
      longGoalReviewScore4: [null],

      ////////////////////////////////////////

      isGood: [false],
      isFair: [false],
      isGuarded: [false],


      justification: [null],
      consumer: [null],
      consumerDate: [null],
      parent: [null],
      parentDate: [null],
      therapistSignature: [null],
      therapistDate: [null],

      participantSignatures: [null],
      participantSignatures1: [null],
      participantSignatures2: [null],
      participantSignatures3: [null],
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
