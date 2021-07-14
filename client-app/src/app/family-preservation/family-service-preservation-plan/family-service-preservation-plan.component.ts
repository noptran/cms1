import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpFamilyServicePres } from './fp-family-service-pres';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-family-service-preservation-plan',
  templateUrl: './family-service-preservation-plan.component.html',
  styleUrls: ['./family-service-preservation-plan.component.scss', '../family-preservation.scss'],
  outputs: ['famSerPreOut']
})
export class FamilyServicePreservationPlanComponent implements OnInit {
  fpFamilyServicePreservation: FpFamilyServicePres = new FpFamilyServicePres();
  familyServicePreservationForm: FormGroup;
  isPrint = true;
  editControll = true;

  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  famSerPreOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
      this.familyServicePreservationForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/case-plan-goals/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpFamilyServicePreservation = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dob) ? formData.dob = new Date(formData.dob) : null;
    !isNullOrUndefined(formData.dob1) ? formData.dob1 = new Date(formData.dob1) : null;
    !isNullOrUndefined(formData.dob2) ? formData.dob2 = new Date(formData.dob2) : null;
    !isNullOrUndefined(formData.dob3) ? formData.dob3 = new Date(formData.dob3) : null;

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

    !isNullOrUndefined(formData.participantsDate) ? formData.participantsDate = new Date(formData.participantsDate) : null;
    !isNullOrUndefined(formData.participantsDate1) ? formData.participantsDate1 = new Date(formData.participantsDate1) : null;
    !isNullOrUndefined(formData.participantsDate2) ? formData.participantsDate2 = new Date(formData.participantsDate2) : null;
    !isNullOrUndefined(formData.participantsDate3) ? formData.participantsDate3 = new Date(formData.participantsDate3) : null;
    !isNullOrUndefined(formData.participantsDate4) ? formData.participantsDate4 = new Date(formData.participantsDate4) : null;
    !isNullOrUndefined(formData.participantsDate5) ? formData.participantsDate5 = new Date(formData.participantsDate5) : null;
    !isNullOrUndefined(formData.participantsDate6) ? formData.participantsDate6 = new Date(formData.participantsDate6) : null;
    !isNullOrUndefined(formData.participantsDate7) ? formData.participantsDate7 = new Date(formData.participantsDate7) : null;
    !isNullOrUndefined(formData.participantsDate8) ? formData.participantsDate8 = new Date(formData.participantsDate8) : null;
    !isNullOrUndefined(formData.participantsDate9) ? formData.participantsDate9 = new Date(formData.participantsDate9) : null;
    !isNullOrUndefined(formData.participantsDate10) ? formData.participantsDate10 = new Date(formData.participantsDate10) : null;
    this.fpFamilyServicePreservation = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpFamilyServicePreservation.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpFamilyServicePreservation.factsCase = (data.referral.facts);
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
    !isNullOrUndefined(source.dob) ? source.dob = Date.parse(source.dob) : null;
    !isNullOrUndefined(source.dob1) ? source.dob1 = Date.parse(source.dob1) : null;
    !isNullOrUndefined(source.dob2) ? source.dob2 = Date.parse(source.dob2) : null;
    !isNullOrUndefined(source.dob3) ? source.dob3 = Date.parse(source.dob3) : null;

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

    !isNullOrUndefined(source.participantsDate) ? source.participantsDate = Date.parse(source.participantsDate) : null;
    !isNullOrUndefined(source.participantsDate1) ? source.participantsDate1 = Date.parse(source.participantsDate1) : null;
    !isNullOrUndefined(source.participantsDate2) ? source.participantsDate2 = Date.parse(source.participantsDate2) : null;
    !isNullOrUndefined(source.participantsDate3) ? source.participantsDate3 = Date.parse(source.participantsDate3) : null;
    !isNullOrUndefined(source.participantsDate4) ? source.participantsDate4 = Date.parse(source.participantsDate4) : null;
    !isNullOrUndefined(source.participantsDate5) ? source.participantsDate5 = Date.parse(source.participantsDate5) : null;
    !isNullOrUndefined(source.participantsDate6) ? source.participantsDate6 = Date.parse(source.participantsDate6) : null;
    !isNullOrUndefined(source.participantsDate7) ? source.participantsDate7 = Date.parse(source.participantsDate7) : null;
    !isNullOrUndefined(source.participantsDate8) ? source.participantsDate8 = Date.parse(source.participantsDate8) : null;
    !isNullOrUndefined(source.participantsDate9) ? source.participantsDate9 = Date.parse(source.participantsDate9) : null;
    !isNullOrUndefined(source.participantsDate10) ? source.participantsDate10 = Date.parse(source.participantsDate10) : null;


    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.famSerPreOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.famSerPreOut.emit({ cmsData: {} });
  }
  editForm() {
    this.familyServicePreservationForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.familyServicePreservationForm = this._fb.group({
      isFamilyServices: [false],
      isFamilyPresrvationServices: [false],
      caseName: [null],
      factsCase: [null],
      co: [null],

      childName: [null],
      dob: [null],
      parentName: [null],

      childName1: [null],
      dob1: [null],
      parentName1: [null],

      childName2: [null],
      dob2: [null],
      other2: [null],

      childName3: [null],
      dob3: [null],
      other3: [null],

      localDcfOffice: [null],
      assignedDcfStaff: [null],

      localDcfOffice1: [null],
      assignedDcfStaff1: [null],

      provider: [null],
      assignedProviderStaff: [null],
      assignedProviderStaffTo: [null],
      reasonForAgency: [null],
      summary: [null],

      safetyConcerns: [null],

      riskConcerns: [null],
      individualStrengths: [null],
      maintenanceObjective: [null],

      behaviorChange: [null],

      //////////////////////////////
      avioralChange: [null],

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
      permanencyObjective: [null],
      ////////////////////////////////////
      printedName: [null],
      signature: [null],
      participationCode: [null],
      participantsDate: [null],

      printedName1: [null],
      signature1: [null],
      participationCode1: [null],
      participantsDate1: [null],

      printedName2: [null],
      signature2: [null],
      participationCode2: [null],
      participantsDate2: [null],

      printedName3: [null],
      signature3: [null],
      participationCode3: [null],
      participantsDate3: [null],

      printedName4: [null],
      signature4: [null],
      participationCode4: [null],
      participantsDate4: [null],

      printedName5: [null],
      signature5: [null],
      participationCode5: [null],
      participantsDate5: [null],

      printedName6: [null],
      signature6: [null],
      participationCode6: [null],
      participantsDate6: [null],

      printedName7: [null],
      signature7: [null],
      participationCode7: [null],
      participantsDate7: [null],

      printedName8: [null],
      signature8: [null],
      participationCode8: [null],
      participantsDate8: [null],

      printedName9: [null],
      signature9: [null],
      participationCode9: [null],
      participantsDate9: [null],

      printedName10: [null],
      signature10: [null],
      participationCode10: [null],
      participantsDate10: [null],

      otherParticipants1: [null],
      otherParticipants2: [null],
      otherParticipants3: [null],

      //////////////
      printedNameParent: [null],
      signatureParent: [null],
      participationCodeParent: [null],
      participantsDateParent: [null],

      printedNameParent1: [null],
      signatureParent1: [null],
      participationCodeParent1: [null],
      participantsDateParent1: [null],

      printedNameParent2: [null],
      signatureParent2: [null],
      participationCodeParent2: [null],
      participantsDateParent2: [null],

      printedNameParent3: [null],
      signatureParent3: [null],
      participationCodeParent3: [null],
      participantsDateParent3: [null],
      printedBy: [null],
      printedDate: [null],


    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.jsPdfOrientation = 'landscape';
    this._printPdf.printForm();
  }

}
