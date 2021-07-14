import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { AdopExcChildStat } from './adop-exc-child-stat';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-adoption-exchange-child-status-update',
  templateUrl: './adoption-exchange-child-status-update.component.html',
  styleUrls: ['./adoption-exchange-child-status-update.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['adopExcOut']
})
export class AdoptionExchangeChildStatusUpdateComponent implements OnInit {
  adoptionExchangeChildForm: FormGroup;
  adopAdoptionExchangeChild: AdopExcChildStat = new AdopExcChildStat();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;

  @Output()
  adopExcOut = new EventEmitter();

  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {
    
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/adoption-event/detail') {
      this.getCmsFormJson();
      this.adoptionExchangeChildForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/rfc/adoption-event/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/adoption/adoption/exchange/child/status/update/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.adoptionExchangeChildForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.adopAdoptionExchangeChild = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.TodayDate) ? formData.TodayDate = new Date(formData.TodayDate) : null;
    !isNullOrUndefined(formData.DateChangeOfVenue) ? formData.DateChangeOfVenue = new Date(formData.DateChangeOfVenue) : null;
    !isNullOrUndefined(formData.BestInterestStaffingDate) ? formData.BestInterestStaffingDate = new Date(formData.BestInterestStaffingDate) : null;
    !isNullOrUndefined(formData.DateSigned) ? formData.DateSigned = new Date(formData.DateSigned) : null;

    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
    !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;
    !isNullOrUndefined(formData.Date3) ? formData.Date3 = new Date(formData.Date3) : null;

    !isNullOrUndefined(formData.Date4) ? formData.Date4 = new Date(formData.Date4) : null;
    !isNullOrUndefined(formData.Date5) ? formData.Date5 = new Date(formData.Date5) : null;
    !isNullOrUndefined(formData.Date6) ? formData.Date6 = new Date(formData.Date6) : null;
    !isNullOrUndefined(formData.Date7) ? formData.Date7 = new Date(formData.Date7) : null;
    this.adopAdoptionExchangeChild = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.adopAdoptionExchangeChild.TodayDate = new Date();
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
    this.adoptionExchangeChildForm.enable();
    this.editControll = false;
  }

  saveForm(source) {
    !isNullOrUndefined(source.TodayDate) ? source.TodayDate = Date.parse(source.TodayDate) : null;
    !isNullOrUndefined(source.DateChangeOfVenue) ? source.DateChangeOfVenue = Date.parse(source.DateChangeOfVenue) : null;
    !isNullOrUndefined(source.BestInterestStaffingDate) ? source.BestInterestStaffingDate = Date.parse(source.BestInterestStaffingDate) : null;
    !isNullOrUndefined(source.DateSigned) ? source.DateSigned = Date.parse(source.DateSigned) : null;

    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;
    !isNullOrUndefined(source.Date2) ? source.Date2 = Date.parse(source.Date2) : null;
    !isNullOrUndefined(source.Date3) ? source.Date3 = Date.parse(source.Date3) : null;

    !isNullOrUndefined(source.Date4) ? source.Date4 = Date.parse(source.Date4) : null;
    !isNullOrUndefined(source.Date5) ? source.Date5 = Date.parse(source.Date5) : null;
    !isNullOrUndefined(source.Date6) ? source.Date6 = Date.parse(source.Date6) : null;
    !isNullOrUndefined(source.Date7) ? source.Date7 = Date.parse(source.Date7) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.adopExcOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/rfc/adoption"]);
  }
  discardForm() {
    this.adopExcOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.adoptionExchangeChildForm = this._fb.group({

      TodayDate: [null],
      NameOfPerson: [null],
      AgencyName: [null],
      PhoneNumber: [null],
      EmailAddress: [null],
      ChildName: [null],
      MatchId: [null],
      FactsClientId: [null],
      IsSiblingGroupYes: [false],
      IsSiblingGroupNo: [false],
      IsPrivateSite: [false],
      IsPublicSite: [false],
      IsChangeOfVenue: [false],
      NewContractor: [null],
      DateChangeOfVenue: [null],
      IsChildOnHold: [false],
      IsIdentifiedResource: [false],
      NameOfFamily: [null],
      IsFamilySelected: [false],
      BestInterestStaffingDate: [null],
      FamilySelectedName: [null],
      IsRecruitmentNeeded: [false],
      IsSiblingSplitPending: [false],

      IsOther: [false],
      Other: [null],

      IsChildCaseClosed: [false],
      IsCasePlanGoalChanged: [false],

      IsAgreementSigned: [false],
      DateSigned: [null],
      NameOfFamily1: [null],

      IsAdoptionFinalized: [false],
      Date: [null],
      FamilyName: [null],

      IsLegalRiskSigned: [false],
      Date1: [null],
      NameOfFamily2: [null],

      IsReleasedFromCustody: [false],
      Date2: [null],

      IsGuardianshipSigned: [false],
      Date3: [null],
      NameOfFamily3: [null],
      IsOther1: [false],
      Other1: [null],

      IsReActivated: [false],
      IsResourceBackedOut: [false],
      Date4: [null],

      IsAdoptionDisrupted: [false],
      Date5: [null],

      IsAdoptionDissolution: [false],
      Date6: [null],

      IsSiblingSplitApproved: [false],
      Date7: [null],

      IsReturnedFromAwol: [false],
      IsReadyToResume: [false],
      IsOther2: [false],
      Other2: [null],

      IsChildRemoved: [false],
      IsChildAdded: [false],

      IsCommunityAwarenessStarted: [false],
      IsCommunityAwarenessCeased: [false],

      CommunityProfileRequestSection: [null],

      IsTelevisionProfile: [false],
      IsTelevisionFeature: [false],
      IsNewspaperFeature: [false],
      IsPublicService: [false],
      IsRadioProfile: [false],
      IsNewspaperProfile: [false],
      IsChurchBulletinInserts: [false],
      IsKidsView: [false],

      IsBillboard: [false],
      IsKlicksForKids: [false],

      AreaOfStateAvoided: [null],
      AreaOfStateDesired: [null],

      Comments: [null],
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

      //   !isNullOrUndefined(formData.TodayDate) ? formData.TodayDate = new Date(formData.TodayDate) : null;
      // !isNullOrUndefined(formData.DateChangeOfVenue) ? formData.DateChangeOfVenue = new Date(formData.DateChangeOfVenue) : null;
      // !isNullOrUndefined(formData.BestInterestStaffingDate) ? formData.BestInterestStaffingDate = new Date(formData.BestInterestStaffingDate) : null;
      // !isNullOrUndefined(formData.DateSigned) ? formData.DateSigned = new Date(formData.DateSigned) : null;

      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      // !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      // !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;
      // !isNullOrUndefined(formData.Date3) ? formData.Date3 = new Date(formData.Date3) : null;

      // !isNullOrUndefined(formData.Date4) ? formData.Date4 = new Date(formData.Date4) : null;
      // !isNullOrUndefined(formData.Date5) ? formData.Date5 = new Date(formData.Date5) : null;
      // !isNullOrUndefined(formData.Date6) ? formData.Date6 = new Date(formData.Date6) : null;
      // !isNullOrUndefined(formData.Date7) ? formData.Date7 = new Date(formData.Date7) : null;
      //  this.adopAdoptionExchangeChild = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.adoptionExchangeChildForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }


}
