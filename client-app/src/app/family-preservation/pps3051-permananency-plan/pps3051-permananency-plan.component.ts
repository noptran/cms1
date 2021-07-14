import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { FpPermanencyPlan } from './fp-permanency-plan';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';

@Component({
  selector: 'app-pps3051-permananency-plan',
  templateUrl: './pps3051-permananency-plan.component.html',
  styleUrls: ['./pps3051-permananency-plan.component.scss', '../family-preservation.scss'],
  outputs: ['ppsPermOut']
})
export class Pps3051PermananencyPlanComponent implements OnInit {
    fpNPermananencyPlan: FpPermanencyPlan = new FpPermanencyPlan();
    PermananencyPlanForm: FormGroup;
    isPrint = true;
    editControll = true;
    printedBy: any;
    printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  ppsPermOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
      this.PermananencyPlanForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/case-plan-goals/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpNPermananencyPlan = json.cmsFormJson;
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

    !isNullOrUndefined(formData.dateChild) ? formData.receivedTimelyDate = new Date(formData.receivedTimelyDate) : null;

    !isNullOrUndefined(formData.dateParent) ? formData.dateParent = new Date(formData.dateParent) : null;
    !isNullOrUndefined(formData.dateParent1) ? formData.dateParent1 = new Date(formData.dateParent1) : null;
    !isNullOrUndefined(formData.dateParent2) ? formData.dateParent2 = new Date(formData.dateParent2) : null;
    !isNullOrUndefined(formData.dateParent3) ? formData.dateParent3 = new Date(formData.dateParent3) : null;

    !isNullOrUndefined(formData.dateOther) ? formData.dateOther = new Date(formData.dateOther) : null;
    !isNullOrUndefined(formData.dateOther1) ? formData.dateOther1 = new Date(formData.dateOther1) : null;
    !isNullOrUndefined(formData.dateOther2) ? formData.dateOther2 = new Date(formData.dateOther2) : null;
    !isNullOrUndefined(formData.dateOther3) ? formData.dateOther3 = new Date(formData.dateOther3) : null;
    !isNullOrUndefined(formData.receivedTimelyDate9) ? formData.receivedTimelyDate9 = new Date(formData.receivedTimelyDate9) : null;
    this.fpNPermananencyPlan = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpNPermananencyPlan.childName = data.person.firstName + ' ' + data.person.lastName;
        this.fpNPermananencyPlan.courtCase = data.person.kaecses;
        this.fpNPermananencyPlan.dob = new Date(data.person.dob);
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpNPermananencyPlan.factsCase = data.referral.facts;
        this.fpNPermananencyPlan.factsClientId = data.referral.caseID.clientID.clientID;

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

    !isNullOrUndefined(source.dateChild) ? source.receivedTimelyDate = Date.parse(source.receivedTimelyDate) : null;

    !isNullOrUndefined(source.dateParent) ? source.dateParent = Date.parse(source.dateParent) : null;
    !isNullOrUndefined(source.dateParent1) ? source.dateParent1 = Date.parse(source.dateParent1) : null;
    !isNullOrUndefined(source.dateParent2) ? source.dateParent2 = Date.parse(source.dateParent2) : null;
    !isNullOrUndefined(source.dateParent3) ? source.dateParent3 = Date.parse(source.dateParent3) : null;

    !isNullOrUndefined(source.dateOther) ? source.dateOther = Date.parse(source.dateOther) : null;
    !isNullOrUndefined(source.dateOther1) ? source.dateOther1 = Date.parse(source.dateOther1) : null;
    !isNullOrUndefined(source.dateOther2) ? source.dateOther2 = Date.parse(source.dateOther2) : null;
    !isNullOrUndefined(source.dateOther3) ? source.dateOther3 = Date.parse(source.dateOther3) : null;
    !isNullOrUndefined(source.receivedTimelyDate9) ? source.receivedTimelyDate9 = Date.parse(source.receivedTimelyDate9) : null;

    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.ppsPermOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.ppsPermOut.emit({ cmsData: {} });
  }
  editForm() {
    this.PermananencyPlanForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.PermananencyPlanForm = this._fb.group({
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
        conferenceDate: [null],
        summary: [null],
        strengths: [null],
        safetyConcerns: [null],
        riskConcerns: [null],
        permanencyGoal: [null],

        ////
        isMaintain : [false],
        isReintegration : [false],
        isAdoption : [false],
        isCustodianship : [false],
        isAppla : [false],
        isRelative : [false],
        isNonRelative : [false],

        isConcurrentAdoption : [false],
        isConcurrentReintegration : [false],
        isConcurrentCustodianship : [false],
        isConcurrentAppla : [false],


        ///////// table/////////
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

        isSafeYes : [false],
        isSafeNo : [false],

        isNeedsYes : [false],
        isNeedsNo : [false],

        isRestrictiveYes : [false],
        isRestrictiveNo : [false],

        isProximityParentsYes : [false],
        isProximityParentsNo : [false],

        isProximitySchoolYes : [false],
        isProximitySchoolNo : [false],

        isEducationalYes : [false],
        isEducationalNo : [false],

        ////


        ///
        placement1: [null],

        isSafeYes1 : [false],
        isSafeNo1 : [false],

        isNeedsYes1 : [false],
        isNeedsNo1 : [false],

        isRestrictiveYes1 : [false],
        isRestrictiveNo1 : [false],

        isProximityParentsYes1 : [false],
        isProximityParentsNo1 : [false],

        isProximitySchoolYes1 : [false],
        isProximitySchoolNo1 : [false],

        isEducationalYes1 : [false],
        isEducationalNo1 : [false],
        ////
        placement2: [null],

        isSafeYes2 : [false],
        isSafeNo2 : [false],

        isNeedsYes2 : [false],
        isNeedsNo2 : [false],

        isRestrictiveYes2 : [false],
        isRestrictiveNo2 : [false],

        isProximityParentsYes2 : [false],
        isProximityParentsNo2 : [false],

        isProximitySchoolYes2 : [false],
        isProximitySchoolNo2 : [false],

        isEducationalYes2 : [false],
        isEducationalNo2 : [false],
        ///
        placement3: [null],

        isSafeYes3 : [false],
        isSafeNo3 : [false],

        isNeedsYes3 : [false],
        isNeedsNo3 : [false],

        isRestrictiveYes3 : [false],
        isRestrictiveNo3 : [false],

        isProximityParentsYes3 : [false],
        isProximityParentsNo3 : [false],

        isProximitySchoolYes3 : [false],
        isProximitySchoolNo3 : [false],

        isEducationalYes3 : [false],
        isEducationalNo3 : [false],
        /////////

        placement4: [null],

        isSafeYes4 : [false],
        isSafeNo4 : [false],

        isNeedsYes4 : [false],
        isNeedsNo4 : [false],

        isRestrictiveYes4 : [false],
        isRestrictiveNo4 : [false],

        isProximityParentsYes4 : [false],
        isProximityParentsNo4 : [false],

        isProximitySchoolYes4 : [false],
        isProximitySchoolNo4 : [false],

        isEducationalYes4 : [false],
        isEducationalNo4 : [false],

        ////////////////////////


        ////////////////////////
        explanationNoAnswers: [null],
        reasonForMoves: [null],
        maternalPaternalRelatives: [null],
        childYouthWellBeing: [null],

        //////////////
        isMedicalYes : [false],
        isMedicalNo : [false],
        description: [null],
        response: [null],
        receivedTimelyDate: [null],

        //////////////
        isVisionYes1 : [false],
        isVisionNo1 : [false],
        description1: [null],
        response1: [null],
        receivedTimelyDate1: [null],
        ///////////
        isMentalHealthYes2 : [false],
        isMentalHealthNo2 : [false],
        description2: [null],
        response2: [null],
        receivedTimelyDate2: [null],

        isDentalYes9 : [false],
    isDentalNo9 : [false],
    description9:  [null],
    response9:  [null],
    receivedTimelyDate9:  [null],
        ///////////
        isDevelopmentalDisabilityYes3 : [false],
        isDevelopmentalDisabilityNo3 : [false],
        description3: [null],
        response3: [null],
        receivedTimelyDate3: [null],
        ///////////
        isDrugTreatmentYes4 : [false],
        isDrugTreatmentNo4 : [false],
        description4: [null],
        response4: [null],
        receivedTimelyDate4: [null],
        ////////////
        isSocialYes5 : [false],
        isSocialNo5 : [false],
        description5: [null],
        response5: [null],
        receivedTimelyDate5: [null],
        /////////////
        isEducationalNeedYes6 : [false],
        isEducationalNeedNo6 : [false],
        description6: [null],
        response6: [null],
        receivedTimelyDate6: [null],
        //////////
        isPlacementYes7 : [false],
        isPlacementNo7 : [false],
        description7: [null],
        response7: [null],
        receivedTimelyDate7: [null],
        ///////////
        isIcwaYes8 : [false],
        isIcwaNo8 : [false],
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
