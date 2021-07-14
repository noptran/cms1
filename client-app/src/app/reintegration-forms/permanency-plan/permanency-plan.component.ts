import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { RePermanencyPlan } from './re-permanency-plan';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-permanency-plan',
  templateUrl: './permanency-plan.component.html',
  styleUrls: ['./permanency-plan.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['perPlanRfcOut']
})
export class PermanencyPlanComponent implements OnInit {
  permanencyPlanForm: FormGroup;
  rePermanencyPlan: RePermanencyPlan = new RePermanencyPlan();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;

  @Output()
  perPlanRfcOut = new EventEmitter()

  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
    }

    if (this._router.url == '/reports/referral/reintegration/caseplangoals/permanency/plan/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.permanencyPlanForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.rePermanencyPlan = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dob) ? formData.dob = new Date(formData.dob) : null;
    !isNullOrUndefined(formData.targetDatePermanency) ? formData.targetDatePermanency = new Date(formData.targetDatePermanency) : null;
    !isNullOrUndefined(formData.achievedDatePermanency) ? formData.achievedDatePermanency = new Date(formData.achievedDatePermanency) : null;
    !isNullOrUndefined(formData.targetDate1Permanency) ? formData.targetDate1Permanency = new Date(formData.targetDate1Permanency) : null;
    !isNullOrUndefined(formData.achievedDate1Permanency) ? formData.achievedDate1Permanency = new Date(formData.achievedDate1Permanency) : null;
    !isNullOrUndefined(formData.targetDate2Permanency) ? formData.targetDate2Permanency = new Date(formData.targetDate2Permanency) : null;
    !isNullOrUndefined(formData.achievedDate2Permanency) ? formData.achievedDate2Permanency = new Date(formData.achievedDate2Permanency) : null;
    !isNullOrUndefined(formData.targetDatePermanency1) ? formData.targetDatePermanency1 = new Date(formData.targetDatePermanency1) : null;
    !isNullOrUndefined(formData.achievedDatePermanency1) ? formData.achievedDatePermanency1 = new Date(formData.achievedDatePermanency1) : null;
    !isNullOrUndefined(formData.targetDate1Permanency1) ? formData.targetDate1Permanency1 = new Date(formData.targetDate1Permanency1) : null;
    !isNullOrUndefined(formData.achievedDate1Permanency1) ? formData.achievedDate1Permanency1 = new Date(formData.achievedDate1Permanency1) : null;
    !isNullOrUndefined(formData.targetDate2Permanency1) ? formData.targetDate2Permanency1 = new Date(formData.targetDate2Permanency1) : null;
    !isNullOrUndefined(formData.achievedDate2Permanency1) ? formData.achievedDate2Permanency1 = new Date(formData.achievedDate2Permanency1) : null;

    !isNullOrUndefined(formData.targetDatePermanency2) ? formData.targetDatePermanency2 = new Date(formData.targetDatePermanency2) : null;
    !isNullOrUndefined(formData.achievedDatePermanency2) ? formData.achievedDatePermanency2 = new Date(formData.achievedDatePermanency2) : null;
    !isNullOrUndefined(formData.targetDate1Permanency2) ? formData.targetDate1Permanency2 = new Date(formData.targetDate1Permanency2) : null;
    !isNullOrUndefined(formData.achievedDate1Permanency2) ? formData.achievedDate1Permanency2 = new Date(formData.achievedDate1Permanency2) : null;
    !isNullOrUndefined(formData.targetDate2Permanency2) ? formData.targetDate2Permanency2 = new Date(formData.targetDate2Permanency2) : null;
    !isNullOrUndefined(formData.achievedDate2Permanency2) ? formData.achievedDate2Permanency2 = new Date(formData.achievedDate2Permanency2) : null;

    !isNullOrUndefined(formData.receivedTimelyDate) ? formData.receivedTimelyDate = new Date(formData.receivedTimelyDate) : null;
    !isNullOrUndefined(formData.receivedTimelyDate1) ? formData.receivedTimelyDate1 = new Date(formData.receivedTimelyDate1) : null;
    !isNullOrUndefined(formData.receivedTimelyDate2) ? formData.receivedTimelyDate2 = new Date(formData.receivedTimelyDate2) : null;
    !isNullOrUndefined(formData.receivedTimelyDate3) ? formData.receivedTimelyDate3 = new Date(formData.receivedTimelyDate3) : null;
    !isNullOrUndefined(formData.receivedTimelyDate4) ? formData.receivedTimelyDate4 = new Date(formData.receivedTimelyDate4) : null;
    !isNullOrUndefined(formData.receivedTimelyDate5) ? formData.receivedTimelyDate5 = new Date(formData.receivedTimelyDate5) : null;
    !isNullOrUndefined(formData.receivedTimelyDate6) ? formData.receivedTimelyDate6 = new Date(formData.receivedTimelyDate6) : null;
    !isNullOrUndefined(formData.receivedTimelyDate7) ? formData.receivedTimelyDate7 = new Date(formData.receivedTimelyDate7) : null;
    !isNullOrUndefined(formData.receivedTimelyDate8) ? formData.receivedTimelyDate8 = new Date(formData.receivedTimelyDate8) : null;

    !isNullOrUndefined(formData.dateChild) ? formData.dateChild = new Date(formData.dateChild) : null;

    !isNullOrUndefined(formData.dateParent) ? formData.dateParent = new Date(formData.dateParent) : null;
    !isNullOrUndefined(formData.dateParent1) ? formData.dateParent1 = new Date(formData.dateParent1) : null;
    !isNullOrUndefined(formData.dateParent2) ? formData.dateParent2 = new Date(formData.dateParent2) : null;
    !isNullOrUndefined(formData.dateParent3) ? formData.dateParent3 = new Date(formData.dateParent3) : null;

    !isNullOrUndefined(formData.dateOther) ? formData.dateOther = new Date(formData.dateOther) : null;
    !isNullOrUndefined(formData.dateOther1) ? formData.dateOther1 = new Date(formData.dateOther1) : null;
    !isNullOrUndefined(formData.dateOther2) ? formData.dateOther2 = new Date(formData.dateOther2) : null;
    !isNullOrUndefined(formData.dateOther3) ? formData.dateOther3 = new Date(formData.dateOther3) : null;
    !isNullOrUndefined(formData.receivedTimelyDate9) ? formData.receivedTimelyDate9 = new Date(formData.receivedTimelyDate9) : null;

    ///////////////////
    !isNullOrUndefined(formData.conferenceDatesFro) ? formData.conferenceDatesFro = new Date(formData.conferenceDatesFro) : null;
    !isNullOrUndefined(formData.conferenceDatesTo) ? formData.conferenceDatesTo = new Date(formData.conferenceDatesTo) : null;
    !isNullOrUndefined(formData.effectiveDatesFrom) ? formData.effectiveDatesFrom = new Date(formData.effectiveDatesFrom) : null;
    !isNullOrUndefined(formData.effectiveDatesTo) ? formData.effectiveDatesTo = new Date(formData.effectiveDatesTo) : null;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.dateLastKbh) ? formData.dateLastKbh = new Date(formData.dateLastKbh) : null;
    !isNullOrUndefined(formData.dateDiagnosed) ? formData.dateDiagnosed = new Date(formData.dateDiagnosed) : null;
    //////////////////////
    !isNullOrUndefined(formData.EffectiveDate) ? formData.EffectiveDate = new Date(formData.EffectiveDate) : null;
    !isNullOrUndefined(formData.EffectiveDate1) ? formData.EffectiveDate1 = new Date(formData.EffectiveDate1) : null;

    /////////////////////////
    !isNullOrUndefined(formData.date1) ? formData.date1 = new Date(formData.date1) : null;
    !isNullOrUndefined(formData.workerParentEffectiveDate) ? formData.workerParentEffectiveDate = new Date(formData.workerParentEffectiveDate) : null;
    !isNullOrUndefined(formData.arrangementsEffectiveDate) ? formData.arrangementsEffectiveDate = new Date(formData.arrangementsEffectiveDate) : null;
    !isNullOrUndefined(formData.workerMandatoryEffectiveDate) ? formData.workerMandatoryEffectiveDate = new Date(formData.workerMandatoryEffectiveDate) : null;
    !isNullOrUndefined(formData.childSiblingEffectiveDate) ? formData.childSiblingEffectiveDate = new Date(formData.childSiblingEffectiveDate) : null;

    ///////////////////////
    !isNullOrUndefined(formData.conferenceDate) ? formData.conferenceDate = new Date(formData.conferenceDate) : null;
    !isNullOrUndefined(formData.conferenceDate1) ? formData.conferenceDate1 = new Date(formData.conferenceDate1) : null;

    !isNullOrUndefined(formData.permanencyDate) ? formData.permanencyDate = new Date(formData.permanencyDate) : null;
    !isNullOrUndefined(formData.oohDate) ? formData.oohDate = new Date(formData.oohDate) : null;
    !isNullOrUndefined(formData.reviewReportDate) ? formData.reviewReportDate = new Date(formData.reviewReportDate) : null;
    !isNullOrUndefined(formData.parentDate) ? formData.parentDate = new Date(formData.parentDate) : null;
    !isNullOrUndefined(formData.personDate) ? formData.personDate = new Date(formData.personDate) : null;

    !isNullOrUndefined(formData.DateConfidentiality) ? formData.DateConfidentiality = new Date(formData.DateConfidentiality) : null;

    !isNullOrUndefined(formData.DateConfidentiality1) ? formData.DateConfidentiality1 = new Date(formData.DateConfidentiality1) : null;
    !isNullOrUndefined(formData.DateConfidentiality2) ? formData.DateConfidentiality2 = new Date(formData.DateConfidentiality2) : null;
    !isNullOrUndefined(formData.DateConfidentiality3) ? formData.DateConfidentiality3 = new Date(formData.DateConfidentiality3) : null;
    !isNullOrUndefined(formData.DateConfidentiality4) ? formData.DateConfidentiality4 = new Date(formData.DateConfidentiality4) : null;
    !isNullOrUndefined(formData.DateConfidentiality5) ? formData.DateConfidentiality5 = new Date(formData.DateConfidentiality5) : null;
    !isNullOrUndefined(formData.DateConfidentiality6) ? formData.DateConfidentiality6 = new Date(formData.DateConfidentiality6) : null;
    !isNullOrUndefined(formData.DateConfidentiality7) ? formData.DateConfidentiality7 = new Date(formData.DateConfidentiality7) : null;
    !isNullOrUndefined(formData.DateConfidentiality8) ? formData.DateConfidentiality8 = new Date(formData.DateConfidentiality8) : null;
    !isNullOrUndefined(formData.DateConfidentiality9) ? formData.DateConfidentiality9 = new Date(formData.DateConfidentiality9) : null;
    !isNullOrUndefined(formData.DateConfidentiality10) ? formData.DateConfidentiality10 = new Date(formData.DateConfidentiality10) : null;
    !isNullOrUndefined(formData.DateConfidentiality11) ? formData.DateConfidentiality11 = new Date(formData.DateConfidentiality11) : null;
    !isNullOrUndefined(formData.DateConfidentiality12) ? formData.DateConfidentiality12 = new Date(formData.DateConfidentiality12) : null;
    !isNullOrUndefined(formData.DateConfidentiality13) ? formData.DateConfidentiality13 = new Date(formData.DateConfidentiality13) : null;
    !isNullOrUndefined(formData.DateConfidentiality14) ? formData.DateConfidentiality14 = new Date(formData.DateConfidentiality14) : null;
    !isNullOrUndefined(formData.DateConfidentiality15) ? formData.DateConfidentiality15 = new Date(formData.DateConfidentiality15) : null;
    !isNullOrUndefined(formData.DateConfidentiality16) ? formData.DateConfidentiality16 = new Date(formData.DateConfidentiality16) : null;
    !isNullOrUndefined(formData.DateConfidentiality17) ? formData.DateConfidentiality17 = new Date(formData.DateConfidentiality17) : null;

    this.rePermanencyPlan = formData;

  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.rePermanencyPlan.childName = data.person.firstName + " " + data.person.lastName;
        this.rePermanencyPlan.caseNumber = data.person.kaecses;
        this.rePermanencyPlan.dob = new Date(data.person.dob);
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.rePermanencyPlan.courtCase = (data.referral.caseID.caseID)
        this.rePermanencyPlan.factsCase = data.referral.facts;
        this.rePermanencyPlan.factsClientId = (data.referral.caseID.clientID.clientID)
      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }



  saveForm(event, source) {
    !isNullOrUndefined(source.dob) ? source.dob = Date.parse(source.dob) : null;
    !isNullOrUndefined(source.targetDatePermanency) ? source.targetDatePermanency = Date.parse(source.targetDatePermanency) : null;
    !isNullOrUndefined(source.achievedDatePermanency) ? source.achievedDatePermanency = Date.parse(source.achievedDatePermanency) : null;
    !isNullOrUndefined(source.targetDate1Permanency) ? source.targetDate1Permanency = Date.parse(source.targetDate1Permanency) : null;
    !isNullOrUndefined(source.achievedDate1Permanency) ? source.achievedDate1Permanency = Date.parse(source.achievedDate1Permanency) : null;
    !isNullOrUndefined(source.targetDate2Permanency) ? source.targetDate2Permanency = Date.parse(source.targetDate2Permanency) : null;
    !isNullOrUndefined(source.achievedDate2Permanency) ? source.achievedDate2Permanency = Date.parse(source.achievedDate2Permanency) : null;
    !isNullOrUndefined(source.targetDatePermanency1) ? source.targetDatePermanency1 = Date.parse(source.targetDatePermanency1) : null;
    !isNullOrUndefined(source.achievedDatePermanency1) ? source.achievedDatePermanency1 = Date.parse(source.achievedDatePermanency1) : null;
    !isNullOrUndefined(source.targetDate1Permanency1) ? source.targetDate1Permanency1 = Date.parse(source.targetDate1Permanency1) : null;
    !isNullOrUndefined(source.achievedDate1Permanency1) ? source.achievedDate1Permanency1 = Date.parse(source.achievedDate1Permanency1) : null;
    !isNullOrUndefined(source.targetDate2Permanency1) ? source.targetDate2Permanency1 = Date.parse(source.targetDate2Permanency1) : null;
    !isNullOrUndefined(source.achievedDate2Permanency1) ? source.achievedDate2Permanency1 = Date.parse(source.achievedDate2Permanency1) : null;

    !isNullOrUndefined(source.targetDatePermanency2) ? source.targetDatePermanency2 = Date.parse(source.targetDatePermanency2) : null;
    !isNullOrUndefined(source.achievedDatePermanency2) ? source.achievedDatePermanency2 = Date.parse(source.achievedDatePermanency2) : null;
    !isNullOrUndefined(source.targetDate1Permanency2) ? source.targetDate1Permanency2 = Date.parse(source.targetDate1Permanency2) : null;
    !isNullOrUndefined(source.achievedDate1Permanency2) ? source.achievedDate1Permanency2 = Date.parse(source.achievedDate1Permanency2) : null;
    !isNullOrUndefined(source.targetDate2Permanency2) ? source.targetDate2Permanency2 = Date.parse(source.targetDate2Permanency2) : null;
    !isNullOrUndefined(source.achievedDate2Permanency2) ? source.achievedDate2Permanency2 = Date.parse(source.achievedDate2Permanency2) : null;

    !isNullOrUndefined(source.receivedTimelyDate) ? source.receivedTimelyDate = Date.parse(source.receivedTimelyDate) : null;
    !isNullOrUndefined(source.receivedTimelyDate1) ? source.receivedTimelyDate1 = Date.parse(source.receivedTimelyDate1) : null;
    !isNullOrUndefined(source.receivedTimelyDate2) ? source.receivedTimelyDate2 = Date.parse(source.receivedTimelyDate2) : null;
    !isNullOrUndefined(source.receivedTimelyDate3) ? source.receivedTimelyDate3 = Date.parse(source.receivedTimelyDate3) : null;
    !isNullOrUndefined(source.receivedTimelyDate4) ? source.receivedTimelyDate4 = Date.parse(source.receivedTimelyDate4) : null;
    !isNullOrUndefined(source.receivedTimelyDate5) ? source.receivedTimelyDate5 = Date.parse(source.receivedTimelyDate5) : null;
    !isNullOrUndefined(source.receivedTimelyDate6) ? source.receivedTimelyDate6 = Date.parse(source.receivedTimelyDate6) : null;
    !isNullOrUndefined(source.receivedTimelyDate7) ? source.receivedTimelyDate7 = Date.parse(source.receivedTimelyDate7) : null;
    !isNullOrUndefined(source.receivedTimelyDate8) ? source.receivedTimelyDate8 = Date.parse(source.receivedTimelyDate8) : null;

    !isNullOrUndefined(source.dateChild) ? source.dateChild = Date.parse(source.dateChild) : null;

    !isNullOrUndefined(source.dateParent) ? source.dateParent = Date.parse(source.dateParent) : null;
    !isNullOrUndefined(source.dateParent1) ? source.dateParent1 = Date.parse(source.dateParent1) : null;
    !isNullOrUndefined(source.dateParent2) ? source.dateParent2 = Date.parse(source.dateParent2) : null;
    !isNullOrUndefined(source.dateParent3) ? source.dateParent3 = Date.parse(source.dateParent3) : null;

    !isNullOrUndefined(source.dateOther) ? source.dateOther = Date.parse(source.dateOther) : null;
    !isNullOrUndefined(source.dateOther1) ? source.dateOther1 = Date.parse(source.dateOther1) : null;
    !isNullOrUndefined(source.dateOther2) ? source.dateOther2 = Date.parse(source.dateOther2) : null;
    !isNullOrUndefined(source.dateOther3) ? source.dateOther3 = Date.parse(source.dateOther3) : null;
    !isNullOrUndefined(source.receivedTimelyDate9) ? source.receivedTimelyDate9 = Date.parse(source.receivedTimelyDate9) : null;

    ///////////////////
    !isNullOrUndefined(source.conferenceDatesFro) ? source.conferenceDatesFro = Date.parse(source.conferenceDatesFro) : null;
    !isNullOrUndefined(source.conferenceDatesTo) ? source.conferenceDatesTo = Date.parse(source.conferenceDatesTo) : null;
    !isNullOrUndefined(source.effectiveDatesFrom) ? source.effectiveDatesFrom = Date.parse(source.effectiveDatesFrom) : null;
    !isNullOrUndefined(source.effectiveDatesTo) ? source.effectiveDatesTo = Date.parse(source.effectiveDatesTo) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.dateLastKbh) ? source.dateLastKbh = Date.parse(source.dateLastKbh) : null;
    !isNullOrUndefined(source.dateDiagnosed) ? source.dateDiagnosed = Date.parse(source.dateDiagnosed) : null;
    //////////////////////
    !isNullOrUndefined(source.EffectiveDate) ? source.EffectiveDate = Date.parse(source.EffectiveDate) : null;
    !isNullOrUndefined(source.EffectiveDate1) ? source.EffectiveDate1 = Date.parse(source.EffectiveDate1) : null;

    /////////////////////////
    !isNullOrUndefined(source.date1) ? source.date1 = Date.parse(source.date1) : null;
    !isNullOrUndefined(source.workerParentEffectiveDate) ? source.workerParentEffectiveDate = Date.parse(source.workerParentEffectiveDate) : null;
    !isNullOrUndefined(source.arrangementsEffectiveDate) ? source.arrangementsEffectiveDate = Date.parse(source.arrangementsEffectiveDate) : null;
    !isNullOrUndefined(source.workerMandatoryEffectiveDate) ? source.workerMandatoryEffectiveDate = Date.parse(source.workerMandatoryEffectiveDate) : null;
    !isNullOrUndefined(source.childSiblingEffectiveDate) ? source.childSiblingEffectiveDate = Date.parse(source.childSiblingEffectiveDate) : null;

    ///////////////////////
    !isNullOrUndefined(source.conferenceDate) ? source.conferenceDate = Date.parse(source.conferenceDate) : null;
    !isNullOrUndefined(source.conferenceDate1) ? source.conferenceDate1 = Date.parse(source.conferenceDate1) : null;
    !isNullOrUndefined(source.permanencyDate) ? source.permanencyDate = Date.parse(source.permanencyDate) : null;
    !isNullOrUndefined(source.oohDate) ? source.oohDate = Date.parse(source.oohDate) : null;
    !isNullOrUndefined(source.reviewReportDate) ? source.reviewReportDate = Date.parse(source.reviewReportDate) : null;
    !isNullOrUndefined(source.parentDate) ? source.parentDate = Date.parse(source.parentDate) : null;
    !isNullOrUndefined(source.personDate) ? source.personDate = Date.parse(source.personDate) : null;

    ////////////////////////
    !isNullOrUndefined(source.DateConfidentiality) ? source.DateConfidentiality = Date.parse(source.DateConfidentiality) : null;
    !isNullOrUndefined(source.childAdjudicatedDate) ? source.childAdjudicatedDate = Date.parse(source.childAdjudicatedDate) : null;

    !isNullOrUndefined(source.DateConfidentiality1) ? source.DateConfidentiality1 = Date.parse(source.DateConfidentiality1) : null;
    !isNullOrUndefined(source.DateConfidentiality2) ? source.DateConfidentiality2 = Date.parse(source.DateConfidentiality2) : null;
    !isNullOrUndefined(source.DateConfidentiality3) ? source.DateConfidentiality3 = Date.parse(source.DateConfidentiality3) : null;
    !isNullOrUndefined(source.DateConfidentiality4) ? source.DateConfidentiality4 = Date.parse(source.DateConfidentiality4) : null;
    !isNullOrUndefined(source.DateConfidentiality5) ? source.DateConfidentiality5 = Date.parse(source.DateConfidentiality5) : null;
    !isNullOrUndefined(source.DateConfidentiality6) ? source.DateConfidentiality6 = Date.parse(source.DateConfidentiality6) : null;
    !isNullOrUndefined(source.DateConfidentiality7) ? source.DateConfidentiality7 = Date.parse(source.DateConfidentiality7) : null;
    !isNullOrUndefined(source.DateConfidentiality8) ? source.DateConfidentiality8 = Date.parse(source.DateConfidentiality8) : null;
    !isNullOrUndefined(source.DateConfidentiality9) ? source.DateConfidentiality9 = Date.parse(source.DateConfidentiality9) : null;
    !isNullOrUndefined(source.DateConfidentiality10) ? source.DateConfidentiality10 = Date.parse(source.DateConfidentiality10) : null;
    !isNullOrUndefined(source.DateConfidentiality11) ? source.DateConfidentiality11 = Date.parse(source.DateConfidentiality11) : null;
    !isNullOrUndefined(source.DateConfidentiality12) ? source.DateConfidentiality12 = Date.parse(source.DateConfidentiality12) : null;
    !isNullOrUndefined(source.DateConfidentiality13) ? source.DateConfidentiality13 = Date.parse(source.DateConfidentiality13) : null;
    !isNullOrUndefined(source.DateConfidentiality14) ? source.DateConfidentiality14 = Date.parse(source.DateConfidentiality14) : null;
    !isNullOrUndefined(source.DateConfidentiality15) ? source.DateConfidentiality15 = Date.parse(source.DateConfidentiality15) : null;
    !isNullOrUndefined(source.DateConfidentiality16) ? source.DateConfidentiality16 = Date.parse(source.DateConfidentiality16) : null;
    !isNullOrUndefined(source.DateConfidentiality17) ? source.DateConfidentiality17 = Date.parse(source.DateConfidentiality17) : null;

    !isNullOrUndefined(source.placement) ? source.placement = Date.parse(source.placement) : null;
    !isNullOrUndefined(source.placement1) ? source.placement1 = Date.parse(source.placement1) : null;
    !isNullOrUndefined(source.placement2) ? source.placement2 = Date.parse(source.placement2) : null;
    !isNullOrUndefined(source.placement3) ? source.placement3 = Date.parse(source.placement3) : null;
    !isNullOrUndefined(source.placement4) ? source.placement4 = Date.parse(source.placement4) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.perPlanRfcOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
 discardForm() {
    this.perPlanRfcOut.emit({ cmsData: {} });
  }
  editForm() {
    this.permanencyPlanForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.permanencyPlanForm = this._fb.group({
      childName: [null],
      dob: [null],
      courtCase: [null],
      co: [null],
      factsCase: [null],
      factsClientId: [null],
      motherName: [null],
      fatherName: [null],
      otherCaregiverName: [null],
      localDcfOffice: [null],
      assignedDcfStaff: [null],
      provider: [null],
      assignedProviderStaff: [null],
      // Duplicate///////////
      conferenceDate: [null],
      conferenceDate1: [null],
      /////////////////////////
      summary: [null],
      strengths: [null],
      safetyConcerns: [null],
      riskConcerns: [null],
      permanencyGoal: [null],

      ////
      isMaintain: [false],
      isReintegration: [false],
      isAdoption: [false],
      isCustodianship: [false],
      isAppla: [false],
      isRelative: [false],
      isNonRelative: [false],

      isConcurrentAdoption: [false],
      isConcurrentReintegration: [false],
      isConcurrentCustodianship: [false],
      isConcurrentAppla: [false],


      /////////table/////////
      permanencyObjective: [null],
      behavioralChange: [null],

      activityPermanency: [null],
      shortTermPermanency: [null],
      courtOrderedPermanency: [null],
      responsiblePersonPermanency: [null],
      targetDatePermanency: [null],
      progressPermanency: [null],
      achievedDatePermanency: [null],

      activity1Permanency: [null],
      shortTerm1Permanency: [null],
      courtOrdered1Permanency: [null],
      responsible1PersonPermanency: [null],
      targetDate1Permanency: [null],
      progress1Permanency: [null],
      achievedDate1Permanency: [null],

      activity2Permanency: [null],
      shortTerm2Permanency: [null],
      courtOrdered2Permanency: [null],
      responsible2PersonPermanency: [null],
      targetDate2Permanency: [null],
      progress2Permanency: [null],
      achievedDate2Permanency: [null],

      ////////////////////////////

      permanencyObjective1: [null],
      behavioralChange1: [null],

      activityPermanency1: [null],
      shortTermPermanency1: [null],
      courtOrderedPermanency1: [null],
      responsiblePersonPermanency1: [null],
      targetDatePermanency1: [null],
      progressPermanency1: [null],
      achievedDatePermanency1: [null],

      activity1Permanency1: [null],
      shortTerm1Permanency1: [null],
      courtOrdered1Permanency1: [null],
      responsible1PersonPermanency1: [null],
      targetDate1Permanency1: [null],
      progress1Permanency1: [null],
      achievedDate1Permanency1: [null],

      activity2Permanency1: [null],
      shortTerm2Permanency1: [null],
      courtOrdered2Permanency1: [null],
      responsible2PersonPermanency1: [null],
      targetDate2Permanency1: [null],
      progress2Permanency1: [null],
      achievedDate2Permanency1: [null],

      ////////////////////////

      permanencyObjective2: [null],
      behavioralChange2: [null],

      activityPermanency2: [null],
      shortTermPermanency2: [null],
      courtOrderedPermanency2: [null],
      responsiblePersonPermanency2: [null],
      targetDatePermanency2: [null],
      progressPermanency2: [null],
      achievedDatePermanency2: [null],

      activity1Permanency2: [null],
      shortTerm1Permanency2: [null],
      courtOrdered1Permanency2: [null],
      responsible1PersonPermanency2: [null],
      targetDate1Permanency2: [null],
      progress1Permanency2: [null],
      achievedDate1Permanency2: [null],

      activity2Permanency2: [null],
      shortTerm2Permanency2: [null],
      courtOrdered2Permanency2: [null],
      responsible2PersonPermanency2: [null],
      targetDate2Permanency2: [null],
      progress2Permanency2: [null],
      achievedDate2Permanency2: [null],

      /////////////////////

      placement: [null],

      isSafeYes: [false],
      isSafeNo: [false],

      isNeedsYes: [false],
      isNeedsNo: [false],

      isRestrictiveYes: [false],
      isRestrictiveNo: [false],

      isProximityParentsYes: [false],
      isProximityParentsNo: [false],

      isProximitySchoolYes: [false],
      isProximitySchoolNo: [false],

      isEducationalYes: [false],
      isEducationalNo: [false],

      ////


      ///
      placement1: [null],

      isSafeYes1: [false],
      isSafeNo1: [false],

      isNeedsYes1: [false],
      isNeedsNo1: [false],

      isRestrictiveYes1: [false],
      isRestrictiveNo1: [false],

      isProximityParentsYes1: [false],
      isProximityParentsNo1: [false],

      isProximitySchoolYes1: [false],
      isProximitySchoolNo1: [false],

      isEducationalYes1: [false],
      isEducationalNo1: [false],
      ////
      placement2: [null],

      isSafeYes2: [false],
      isSafeNo2: [false],

      isNeedsYes2: [false],
      isNeedsNo2: [false],

      isRestrictiveYes2: [false],
      isRestrictiveNo2: [false],

      isProximityParentsYes2: [false],
      isProximityParentsNo2: [false],

      isProximitySchoolYes2: [false],
      isProximitySchoolNo2: [false],

      isEducationalYes2: [false],
      isEducationalNo2: [false],
      ///
      placement3: [null],

      isSafeYes3: [false],
      isSafeNo3: [false],

      isNeedsYes3: [false],
      isNeedsNo3: [false],

      isRestrictiveYes3: [false],
      isRestrictiveNo3: [false],

      isProximityParentsYes3: [false],
      isProximityParentsNo3: [false],

      isProximitySchoolYes3: [false],
      isProximitySchoolNo3: [false],

      isEducationalYes3: [false],
      isEducationalNo3: [false],
      /////////

      placement4: [null],

      isSafeYes4: [false],
      isSafeNo4: [false],

      isNeedsYes4: [false],
      isNeedsNo4: [false],

      isRestrictiveYes4: [false],
      isRestrictiveNo4: [false],

      isProximityParentsYes4: [false],
      isProximityParentsNo4: [false],

      isProximitySchoolYes4: [false],
      isProximitySchoolNo4: [false],

      isEducationalYes4: [false],
      isEducationalNo4: [false],

      ////////////////////////


      ////////////////////////
      explanationNoAnswers: [null],
      reasonForMoves: [null],
      maternalPaternalRelatives: [null],
      childYouthWellBeing: [null],

      //////////////
      isMedicalYes: [false],
      isMedicalNo: [false],
      description: [null],
      response: [null],
      receivedTimelyDate: [null],

      isDentalYes9: [false],
      isDentalNo9: [false],
      description9: [null],
      response9: [null],
      receivedTimelyDate9: [null],

      //////////////
      isVisionYes1: [false],
      isVisionNo1: [false],
      description1: [null],
      response1: [null],
      receivedTimelyDate1: [null],
      ///////////
      isMentalHealthYes2: [false],
      isMentalHealthNo2: [false],
      description2: [null],
      response2: [null],
      receivedTimelyDate2: [null],
      ///////////
      isDevelopmentalDisabilityYes3: [false],
      isDevelopmentalDisabilityNo3: [false],
      description3: [null],
      response3: [null],
      receivedTimelyDate3: [null],
      ///////////
      isDrugTreatmentYes4: [false],
      isDrugTreatmentNo4: [false],
      description4: [null],
      response4: [null],
      receivedTimelyDate4: [null],
      ////////////
      isSocialYes5: [false],
      isSocialNo5: [false],
      description5: [null],
      response5: [null],
      receivedTimelyDate5: [null],
      /////////////
      isEducationalNeedYes6: [false],
      isEducationalNeedNo6: [false],
      description6: [null],
      response6: [null],
      receivedTimelyDate6: [null],
      //////////
      isPlacementYes7: [false],
      isPlacementNo7: [false],
      description7: [null],
      response7: [null],
      receivedTimelyDate7: [null],
      ///////////
      isIcwaYes8: [false],
      isIcwaNo8: [false],
      description8: [null],
      response8: [null],
      receivedTimelyDate8: [null],
      /////////////////////


      /////////////
      participantSignatures: [null],
      childInput: [null],

      printedNameChild: [null],
      signatureChild: [null],
      participationCodeChild: [null],
      dateChild: [null],

      potentialConsequences: [null],

      parentsInput: [null],

      printedNameParent: [null],
      signatureParent: [null],
      participationCodeParent: [null],
      dateParent: [null],

      printedNameParent1: [null],
      signatureParent1: [null],
      participationCodeParent1: [null],
      dateParent1: [null],

      printedNameParent2: [null],
      signatureParent2: [null],
      participationCodeParent2: [null],
      dateParent2: [null],

      printedNameParent3: [null],
      signatureParent3: [null],
      participationCodeParent3: [null],
      dateParent3: [null],



      printedNameOther: [null],
      signatureOther: [null],
      agencyOther: [null],
      titleOther: [null],
      dateOther: [null],
      participationCodeOther: [null],

      printedNameOther1: [null],
      signatureOther1: [null],
      agencyOther1: [null],
      titleOther1: [null],
      dateOther1: [null],
      participationCodeOther1: [null],

      printedNameOther2: [null],
      signatureOther2: [null],
      agencyOther2: [null],
      titleOther2: [null],
      dateOther2: [null],
      participationCodeOther2: [null],

      printedNameOther3: [null],
      signatureOther3: [null],
      agencyOther3: [null],
      titleOther3: [null],
      dateOther3: [null],
      participationCodeOther3: [null],
      isRestrictiveYe4s: [null],
      descriptio5: [null],
      //////////////////////////////////////////
      childName1: [null],
      factsCase1: [null],
      conferenceDatesFro: [null],
      conferenceDatesTo: [null],
      effectiveDatesFrom: [null],
      effectiveDatesTo: [null],
      stateReason: [null],
      listSiblings: [null],
      isCandidate: [false],
      isNonCandidate: [false],
      imminentRisk: [null],
      specialistSignature: [null],
      date: [null],
      date1: [null],
      isReferralYes: [false],
      isReferralNo: [false],
      documentedReason: [null],
      primaryHealth: [null],
      healthProviderAddress: [null],
      otherHealthProvider: [null],
      otherHealthProviderAddress: [null],
      dentist: [null],
      dentistAddress: [null],
      optometrist: [null],
      optometristAddress: [null],
      mentalHealth: [null],
      mentalHealthAddress: [null],
      educationalAdvocate: [null],
      educationalAdvocateAddress: [null],
      connectionForSuccess: [null],
      connectionAddress: [null],
      isCurrentYes: [false],
      isCurrentNo: [false],
      dateLastKbh: [null],
      isDiagnosisYes: [false],
      isDiagnosisNo: [false],
      dateDiagnosed: [null],
      types: [null],
      isHcbsYes: [false],
      isHcbsNo: [false],
      isHcbsNa: [false],

      isDd: [false],
      isSed: [false],
      isTbi: [false],
      isTa: [false],
      isAutism: [false],

      isDisabilityYes: [false],
      isDisabilityNo: [false],
      isDisabilityNa: [false],
      isWrittenHealthYes: [false],
      isWrittenHealthNo: [false],
      isWrittenHealthNa: [false],
      isReportRequestedYes: [false],
      isReportRequestedNo: [false],
      isReportRequestedNa: [false],
      isFatherIncarceratedYes: [false],
      isFatherIncarceratedNo: [false],
      isMotherIncarceratedYes: [false],
      isMotherIncarceratedNo: [false],
      isChildAdjudicatedYes: [false],
      isChildAdjudicatedNo: [false],
      childAdjudicatedDate: [false],
      highestGrade: [null],
      caseName: [null],
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      childName2: [null],
      Facts: [null],

      ParentName: [null],
      Frequency: [null],
      EffectiveDate: [null],
      IsSupervised: [false],
      IsUnSupervised: [false],
      IsOther: [false],
      Arrangements: [null],
      InteractionsNotOccurring: [null],
      MoveUnsupervised: [null],

      ParentName1: [null],
      Frequency1: [null],
      EffectiveDate1: [null],
      IsSupervised1: [false],
      IsUnSupervised1: [false],
      IsOther1: [false],
      Arrangements1: [null],
      InteractionsNotOccurring1: [null],
      MoveUnsupervised1: [null],

      other: [null],
      other1: [null],
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      childName3: [null],

      factsCase2: [null],
      isWorkerParentNotApplicable: [false],
      workerParentEffectiveDate: [null],
      workerParentVisitsPerMonth: [null],
      workerParentParticipants: [null],
      arrangements: [null],
      arrangementsEffectiveDate: [null],
      arrangementsVisitsPerMonth: [null],
      arrangmentsParticipants: [null],
      arrangements2: [null],

      workerMandatoryEffectiveDate: [null],
      workerMandatoryVisitsPerMonth: [null],
      workerMandatoryParticipants: [null],
      arrangments3: [null],

      isChildSiblingNotApplicable: [false],
      isChildSiblingPlaced: [false],

      childSiblingEffectiveDate: [null],
      childSiblingVisitsPerMonth: [null],
      childSiblingParticipants: [null],

      arrangments4: [null],
      explainWhy: [null],
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      caseName1: [null],
      page: [null],
      of: [null],
      factsCase3: [null],

      permanencyDate: [null],
      oohDate: [null],
      narrative: [null],
      isMedicalReceived: [false],
      casePlanReview: [null],
      activities: [null],
      parentComments: [null],
      reviewReportDate: [null],
      signatureOfParent: [null],
      parentDate: [null],
      signatureOfPerson: [null],
      personDate: [null],
      /////////////////////////////////////////////////////////////////////////////////////////////////////////
      // caseName2: [null],
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

      ///////////////////
      CaseNameConfidentiality: [null],
      Case: [null],

      SignatureOfParticipant: [null],
      DateConfidentiality: [null],

      SignatureOfParticipant1: [null],
      DateConfidentiality1: [null],

      SignatureOfParticipant2: [null],
      DateConfidentiality2: [null],

      SignatureOfParticipant3: [null],
      DateConfidentiality3: [null],

      SignatureOfParticipant4: [null],
      DateConfidentiality4: [null],

      SignatureOfParticipant5: [null],
      DateConfidentiality5: [null],

      SignatureOfParticipant6: [null],
      DateConfidentiality6: [null],

      SignatureOfParticipant7: [null],
      DateConfidentiality7: [null],

      SignatureOfParticipant8: [null],
      DateConfidentiality8: [null],

      SignatureOfParticipant9: [null],
      DateConfidentiality9: [null],

      SignatureOfParticipant10: [null],
      DateConfidentiality10: [null],

      SignatureOfParticipant11: [null],
      DateConfidentiality11: [null],

      SignatureOfParticipant12: [null],
      DateConfidentiality12: [null],

      SignatureOfParticipant13: [null],
      DateConfidentiality13: [null],

      SignatureOfParticipant14: [null],
      DateConfidentiality14: [null],

      SignatureOfParticipant15: [null],
      DateConfidentiality15: [null],

      SignatureOfParticipant16: [null],
      DateConfidentiality16: [null],

      SignatureOfParticipant17: [null],
      DateConfidentiality17: [null],

      SignatureOfParticipant18: [null],
      DateConfidentiality18: [null],
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


      // !isNullOrUndefined(formData.dob) ? formData.dob = new Date(formData.dob) : null;
      // !isNullOrUndefined(formData.targetDatePermanency) ? formData.targetDatePermanency = new Date(formData.targetDatePermanency) : null;
      // !isNullOrUndefined(formData.achievedDatePermanency) ? formData.achievedDatePermanency = new Date(formData.achievedDatePermanency) : null;
      // !isNullOrUndefined(formData.targetDate1Permanency) ? formData.targetDate1Permanency = new Date(formData.targetDate1Permanency) : null;
      // !isNullOrUndefined(formData.achievedDate1Permanency) ? formData.achievedDate1Permanency = new Date(formData.achievedDate1Permanency) : null;
      // !isNullOrUndefined(formData.targetDate2Permanency) ? formData.targetDate2Permanency = new Date(formData.targetDate2Permanency) : null;
      // !isNullOrUndefined(formData.achievedDate2Permanency) ? formData.achievedDate2Permanency = new Date(formData.achievedDate2Permanency) : null;
      // !isNullOrUndefined(formData.targetDatePermanency1) ? formData.targetDatePermanency1 = new Date(formData.targetDatePermanency1) : null;
      // !isNullOrUndefined(formData.achievedDatePermanency1) ? formData.achievedDatePermanency1 = new Date(formData.achievedDatePermanency1) : null;
      // !isNullOrUndefined(formData.targetDate1Permanency1) ? formData.targetDate1Permanency1 = new Date(formData.targetDate1Permanency1) : null;
      // !isNullOrUndefined(formData.achievedDate1Permanency1) ? formData.achievedDate1Permanency1 = new Date(formData.achievedDate1Permanency1) : null;
      // !isNullOrUndefined(formData.targetDate2Permanency1) ? formData.targetDate2Permanency1 = new Date(formData.targetDate2Permanency1) : null;
      // !isNullOrUndefined(formData.achievedDate2Permanency1) ? formData.achievedDate2Permanency1 = new Date(formData.achievedDate2Permanency1) : null;

      // !isNullOrUndefined(formData.targetDatePermanency2) ? formData.targetDatePermanency2 = new Date(formData.targetDatePermanency2) : null;
      // !isNullOrUndefined(formData.achievedDatePermanency2) ? formData.achievedDatePermanency2 = new Date(formData.achievedDatePermanency2) : null;
      // !isNullOrUndefined(formData.targetDate1Permanency2) ? formData.targetDate1Permanency2 = new Date(formData.targetDate1Permanency2) : null;
      // !isNullOrUndefined(formData.achievedDate1Permanency2) ? formData.achievedDate1Permanency2 = new Date(formData.achievedDate1Permanency2) : null;
      // !isNullOrUndefined(formData.targetDate2Permanency2) ? formData.targetDate2Permanency2 = new Date(formData.targetDate2Permanency2) : null;
      // !isNullOrUndefined(formData.achievedDate2Permanency2) ? formData.achievedDate2Permanency2 = new Date(formData.achievedDate2Permanency2) : null;

      // !isNullOrUndefined(formData.receivedTimelyDate) ? formData.receivedTimelyDate = new Date(formData.receivedTimelyDate) : null;
      // !isNullOrUndefined(formData.receivedTimelyDate1) ? formData.receivedTimelyDate1 = new Date(formData.receivedTimelyDate1) : null;
      // !isNullOrUndefined(formData.receivedTimelyDate2) ? formData.receivedTimelyDate2 = new Date(formData.receivedTimelyDate2) : null;
      // !isNullOrUndefined(formData.receivedTimelyDate3) ? formData.receivedTimelyDate3 = new Date(formData.receivedTimelyDate3) : null;
      // !isNullOrUndefined(formData.receivedTimelyDate4) ? formData.receivedTimelyDate4 = new Date(formData.receivedTimelyDate4) : null;
      // !isNullOrUndefined(formData.receivedTimelyDate5) ? formData.receivedTimelyDate5 = new Date(formData.receivedTimelyDate5) : null;
      // !isNullOrUndefined(formData.receivedTimelyDate6) ? formData.receivedTimelyDate6 = new Date(formData.receivedTimelyDate6) : null;
      // !isNullOrUndefined(formData.receivedTimelyDate7) ? formData.receivedTimelyDate7 = new Date(formData.receivedTimelyDate7) : null;
      // !isNullOrUndefined(formData.receivedTimelyDate8) ? formData.receivedTimelyDate8 = new Date(formData.receivedTimelyDate8) : null;

      // !isNullOrUndefined(formData.dateChild) ? formData.dateChild = new Date(formData.dateChild) : null;

      // !isNullOrUndefined(formData.dateParent) ? formData.dateParent = new Date(formData.dateParent) : null;
      // !isNullOrUndefined(formData.dateParent1) ? formData.dateParent1 = new Date(formData.dateParent1) : null;
      // !isNullOrUndefined(formData.dateParent2) ? formData.dateParent2 = new Date(formData.dateParent2) : null;
      // !isNullOrUndefined(formData.dateParent3) ? formData.dateParent3 = new Date(formData.dateParent3) : null;

      // !isNullOrUndefined(formData.dateOther) ? formData.dateOther = new Date(formData.dateOther) : null;
      // !isNullOrUndefined(formData.dateOther1) ? formData.dateOther1 = new Date(formData.dateOther1) : null;
      // !isNullOrUndefined(formData.dateOther2) ? formData.dateOther2 = new Date(formData.dateOther2) : null;
      // !isNullOrUndefined(formData.dateOther3) ? formData.dateOther3 = new Date(formData.dateOther3) : null;
      // !isNullOrUndefined(formData.receivedTimelyDate9) ? formData.receivedTimelyDate9 = new Date(formData.receivedTimelyDate9) : null;

      // ///////////////////
      // !isNullOrUndefined(formData.conferenceDatesFro) ? formData.conferenceDatesFro = new Date(formData.conferenceDatesFro) : null;
      // !isNullOrUndefined(formData.conferenceDatesTo) ? formData.conferenceDatesTo = new Date(formData.conferenceDatesTo) : null;
      // !isNullOrUndefined(formData.effectiveDatesFrom) ? formData.effectiveDatesFrom = new Date(formData.effectiveDatesFrom) : null;
      // !isNullOrUndefined(formData.effectiveDatesTo) ? formData.effectiveDatesTo = new Date(formData.effectiveDatesTo) : null;
      // !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
      // !isNullOrUndefined(formData.dateLastKbh) ? formData.dateLastKbh = new Date(formData.dateLastKbh) : null;
      // !isNullOrUndefined(formData.dateDiagnosed) ? formData.dateDiagnosed = new Date(formData.dateDiagnosed) : null;
      // //////////////////////
      // !isNullOrUndefined(formData.EffectiveDate) ? formData.EffectiveDate = new Date(formData.EffectiveDate) : null;
      // !isNullOrUndefined(formData.EffectiveDate1) ? formData.EffectiveDate1 = new Date(formData.EffectiveDate1) : null;

      // /////////////////////////
      // !isNullOrUndefined(formData.date1) ? formData.date1 = new Date(formData.date1) : null;
      // !isNullOrUndefined(formData.workerParentEffectiveDate) ? formData.workerParentEffectiveDate = new Date(formData.workerParentEffectiveDate) : null;
      // !isNullOrUndefined(formData.arrangementsEffectiveDate) ? formData.arrangementsEffectiveDate = new Date(formData.arrangementsEffectiveDate) : null;
      // !isNullOrUndefined(formData.workerMandatoryEffectiveDate) ? formData.workerMandatoryEffectiveDate = new Date(formData.workerMandatoryEffectiveDate) : null;
      // !isNullOrUndefined(formData.childSiblingEffectiveDate) ? formData.childSiblingEffectiveDate = new Date(formData.childSiblingEffectiveDate) : null;

      // ///////////////////////
      // !isNullOrUndefined(formData.conferenceDate) ? formData.conferenceDate = new Date(formData.conferenceDate) : null;
      // !isNullOrUndefined(formData.conferenceDate1) ? formData.conferenceDate1 = new Date(formData.conferenceDate1) : null;

      // !isNullOrUndefined(formData.permanencyDate) ? formData.permanencyDate = new Date(formData.permanencyDate) : null;
      // !isNullOrUndefined(formData.oohDate) ? formData.oohDate = new Date(formData.oohDate) : null;
      // !isNullOrUndefined(formData.reviewReportDate) ? formData.reviewReportDate = new Date(formData.reviewReportDate) : null;
      // !isNullOrUndefined(formData.parentDate) ? formData.parentDate = new Date(formData.parentDate) : null;
      // !isNullOrUndefined(formData.personDate) ? formData.personDate = new Date(formData.personDate) : null;

      // !isNullOrUndefined(formData.DateConfidentiality) ? formData.DateConfidentiality = new Date(formData.DateConfidentiality) : null;

      // !isNullOrUndefined(formData.DateConfidentiality1) ? formData.DateConfidentiality1 = new Date(formData.DateConfidentiality1) : null;
      // !isNullOrUndefined(formData.DateConfidentiality2) ? formData.DateConfidentiality2 = new Date(formData.DateConfidentiality2) : null;
      // !isNullOrUndefined(formData.DateConfidentiality3) ? formData.DateConfidentiality3 = new Date(formData.DateConfidentiality3) : null;
      // !isNullOrUndefined(formData.DateConfidentiality4) ? formData.DateConfidentiality4 = new Date(formData.DateConfidentiality4) : null;
      // !isNullOrUndefined(formData.DateConfidentiality5) ? formData.DateConfidentiality5 = new Date(formData.DateConfidentiality5) : null;
      // !isNullOrUndefined(formData.DateConfidentiality6) ? formData.DateConfidentiality6 = new Date(formData.DateConfidentiality6) : null;
      // !isNullOrUndefined(formData.DateConfidentiality7) ? formData.DateConfidentiality7 = new Date(formData.DateConfidentiality7) : null;
      // !isNullOrUndefined(formData.DateConfidentiality8) ? formData.DateConfidentiality8 = new Date(formData.DateConfidentiality8) : null;
      // !isNullOrUndefined(formData.DateConfidentiality9) ? formData.DateConfidentiality9 = new Date(formData.DateConfidentiality9) : null;
      // !isNullOrUndefined(formData.DateConfidentiality10) ? formData.DateConfidentiality10 = new Date(formData.DateConfidentiality10) : null;
      // !isNullOrUndefined(formData.DateConfidentiality11) ? formData.DateConfidentiality11 = new Date(formData.DateConfidentiality11) : null;
      // !isNullOrUndefined(formData.DateConfidentiality12) ? formData.DateConfidentiality12 = new Date(formData.DateConfidentiality12) : null;
      // !isNullOrUndefined(formData.DateConfidentiality13) ? formData.DateConfidentiality13 = new Date(formData.DateConfidentiality13) : null;
      // !isNullOrUndefined(formData.DateConfidentiality14) ? formData.DateConfidentiality14 = new Date(formData.DateConfidentiality14) : null;
      // !isNullOrUndefined(formData.DateConfidentiality15) ? formData.DateConfidentiality15 = new Date(formData.DateConfidentiality15) : null;
      // !isNullOrUndefined(formData.DateConfidentiality16) ? formData.DateConfidentiality16 = new Date(formData.DateConfidentiality16) : null;
      // !isNullOrUndefined(formData.DateConfidentiality17) ? formData.DateConfidentiality17 = new Date(formData.DateConfidentiality17) : null;

      //  this.rePermanencyPlan = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.permanencyPlanForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.jsPdfOrientation = 'landscape';
    this._printPdf.printForm();
  }


}
