import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReCourtReport } from './re-court-report';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-court-report',
  templateUrl: './court-report.component.html',
  styleUrls: ['./court-report.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['courtRepFpOut']
})
export class CourtReportComponent implements OnInit {
  courtReportForm: FormGroup;
  reCourtReport: ReCourtReport = new ReCourtReport();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;

  @Output()
  courtRepFpOut = new EventEmitter()


  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/court-orders/detail') {
      this.getCmsFormJson();
      this.courtReportForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/rfc/court-orders/detail') {
      this.getCmsFormJson();
      this.courtReportForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/court-orders/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/attachment-document/rfc/court-orders/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/reintegration/courtorder/court/report/template/detail') { this.getDetails(); }
    this.autoFetchDetails();

  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reCourtReport = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.CourtDate) ? formData.CourtDate = new Date(formData.CourtDate) : null;
    !isNullOrUndefined(formData.DatePrepared) ? formData.DatePrepared = new Date(formData.DatePrepared) : null;
    !isNullOrUndefined(formData.youthAge) ? formData.youthAge = new Date(formData.youthAge) : null;
    !isNullOrUndefined(formData.ChildDob) ? formData.ChildDob = new Date(formData.ChildDob) : null;
    !isNullOrUndefined(formData.OtherChildDob) ? formData.OtherChildDob = new Date(formData.OtherChildDob) : null;
    !isNullOrUndefined(formData.Dates) ? formData.Dates = new Date(formData.Dates) : null;
    !isNullOrUndefined(formData.Dates1) ? formData.Dates1 = new Date(formData.Dates1) : null;

    !isNullOrUndefined(formData.InitiatedDate) ? formData.InitiatedDate = new Date(formData.InitiatedDate) : null;
    !isNullOrUndefined(formData.TargetDate) ? formData.TargetDate = new Date(formData.TargetDate) : null;
    !isNullOrUndefined(formData.AchievedDate) ? formData.AchievedDate = new Date(formData.AchievedDate) : null;

    !isNullOrUndefined(formData.InitiatedDate1) ? formData.InitiatedDate1 = new Date(formData.InitiatedDate1) : null;
    !isNullOrUndefined(formData.TargetDate1) ? formData.TargetDate1 = new Date(formData.TargetDate1) : null;
    !isNullOrUndefined(formData.AchievedDate1) ? formData.AchievedDate1 = new Date(formData.AchievedDate1) : null;

    !isNullOrUndefined(formData.InitiatedDate2) ? formData.InitiatedDate2 = new Date(formData.InitiatedDate2) : null;
    !isNullOrUndefined(formData.TargetDate2) ? formData.TargetDate2 = new Date(formData.TargetDate2) : null;
    !isNullOrUndefined(formData.AchievedDate2) ? formData.AchievedDate2 = new Date(formData.AchievedDate2) : null;

    !isNullOrUndefined(formData.InitiatedDate3) ? formData.InitiatedDate3 = new Date(formData.InitiatedDate3) : null;
    !isNullOrUndefined(formData.TargetDate3) ? formData.TargetDate3 = new Date(formData.TargetDate3) : null;
    !isNullOrUndefined(formData.AchievedDate3) ? formData.AchievedDate3 = new Date(formData.AchievedDate3) : null;

    !isNullOrUndefined(formData.InitiatedDate4) ? formData.InitiatedDate4 = new Date(formData.InitiatedDate4) : null;
    !isNullOrUndefined(formData.TargetDate4) ? formData.TargetDate4 = new Date(formData.TargetDate4) : null;
    !isNullOrUndefined(formData.AchievedDate4) ? formData.AchievedDate4 = new Date(formData.AchievedDate4) : null;

    !isNullOrUndefined(formData.prtDate) ? formData.prtDate = new Date(formData.prtDate) : null;
    !isNullOrUndefined(formData.prtDate1) ? formData.prtDate1 = new Date(formData.prtDate1) : null;
    !isNullOrUndefined(formData.prtDate2) ? formData.prtDate2 = new Date(formData.prtDate2) : null;

    !isNullOrUndefined(formData.parentRightDate) ? formData.parentRightDate = new Date(formData.parentRightDate) : null;

    !isNullOrUndefined(formData.childInvolveDate) ? formData.childInvolveDate = new Date(formData.childInvolveDate) : null;
      !isNullOrUndefined(formData.childInvolveDatePlaced) ? formData.childInvolveDatePlaced = new Date(formData.childInvolveDatePlaced) : null;

      !isNullOrUndefined(formData.childInvolveDate1) ? formData.childInvolveDate1 = new Date(formData.childInvolveDate1) : null;
      !isNullOrUndefined(formData.childInvolveDatePlaced1) ? formData.childInvolveDatePlaced1 = new Date(formData.childInvolveDatePlaced1) : null;

      !isNullOrUndefined(formData.childInvolveDate2) ? formData.childInvolveDate2 = new Date(formData.childInvolveDate2) : null;
      !isNullOrUndefined(formData.childInvolveDatePlaced2) ? formData.childInvolveDatePlaced2 = new Date(formData.childInvolveDatePlaced2) : null;

    
      !isNullOrUndefined(formData.childInvolveDate3) ? formData.childInvolveDate3 = new Date(formData.childInvolveDate3) : null;
      !isNullOrUndefined(formData.childInvolveDatePlaced3) ? formData.childInvolveDatePlaced3 = new Date(formData.childInvolveDatePlaced3) : null;

      !isNullOrUndefined(formData.childInvolveDate4) ? formData.childInvolveDate4 = new Date(formData.childInvolveDate4) : null;
      !isNullOrUndefined(formData.childInvolveDatePlaced4) ? formData.childInvolveDatePlaced4 = new Date(formData.childInvolveDatePlaced4) : null;

      !isNullOrUndefined(formData.InitiatedDate5) ? formData.InitiatedDate5 = new Date(formData.InitiatedDate5) : null;
      !isNullOrUndefined(formData.TargetDate5) ? formData.TargetDate5 = new Date(formData.TargetDate5) : null;
      !isNullOrUndefined(formData.AchievedDate5) ? formData.AchievedDate5 = new Date(formData.AchievedDate5) : null;

      !isNullOrUndefined(formData.InitiatedDate6) ? formData.InitiatedDate6 = new Date(formData.InitiatedDate6) : null;
      !isNullOrUndefined(formData.TargetDate6) ? formData.TargetDate6 = new Date(formData.TargetDate6) : null;
      !isNullOrUndefined(formData.AchievedDate6) ? formData.AchievedDate6 = new Date(formData.AchievedDate6) : null;

      !isNullOrUndefined(formData.dateApproved) ? formData.dateApproved = new Date(formData.dateApproved) : null;

      
    this.reCourtReport = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reCourtReport.CaseName = data.person.firstName + " " + data.person.lastName;
        this.reCourtReport.HearingDate = data.person.kaecses;
        this.reCourtReport.DatePrepared = new Date();
        this.reCourtReport.CourtDate = new Date();
        // this.reCourtReport.youthAge = new Date();
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
    this.courtReportForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.CourtDate) ? source.CourtDate = Date.parse(source.CourtDate) : null;
    !isNullOrUndefined(source.DatePrepared) ? source.DatePrepared = Date.parse(source.DatePrepared) : null;
    !isNullOrUndefined(source.youthAge) ? source.youthAge = Date.parse(source.youthAge) : null;
    !isNullOrUndefined(source.ChildDob) ? source.ChildDob = Date.parse(source.ChildDob) : null;
    !isNullOrUndefined(source.OtherChildDob) ? source.OtherChildDob = Date.parse(source.OtherChildDob) : null;
    !isNullOrUndefined(source.Dates) ? source.Dates = Date.parse(source.Dates) : null;
    !isNullOrUndefined(source.Dates1) ? source.Dates1 = Date.parse(source.Dates1) : null;

    !isNullOrUndefined(source.InitiatedDate) ? source.InitiatedDate = Date.parse(source.InitiatedDate) : null;
    !isNullOrUndefined(source.TargetDate) ? source.TargetDate = Date.parse(source.TargetDate) : null;
    !isNullOrUndefined(source.AchievedDate) ? source.AchievedDate = Date.parse(source.AchievedDate) : null;

    !isNullOrUndefined(source.InitiatedDate1) ? source.InitiatedDate1 = Date.parse(source.InitiatedDate1) : null;
    !isNullOrUndefined(source.TargetDate1) ? source.TargetDate1 = Date.parse(source.TargetDate1) : null;
    !isNullOrUndefined(source.AchievedDate1) ? source.AchievedDate1 = Date.parse(source.AchievedDate1) : null;

    !isNullOrUndefined(source.InitiatedDate2) ? source.InitiatedDate2 = Date.parse(source.InitiatedDate2) : null;
    !isNullOrUndefined(source.TargetDate2) ? source.TargetDate2 = Date.parse(source.TargetDate2) : null;
    !isNullOrUndefined(source.AchievedDate2) ? source.AchievedDate2 = Date.parse(source.AchievedDate2) : null;

    !isNullOrUndefined(source.InitiatedDate3) ? source.InitiatedDate3 = Date.parse(source.InitiatedDate3) : null;
    !isNullOrUndefined(source.TargetDate3) ? source.TargetDate3 = Date.parse(source.TargetDate3) : null;
    !isNullOrUndefined(source.AchievedDate3) ? source.AchievedDate3 = Date.parse(source.AchievedDate3) : null;

    !isNullOrUndefined(source.InitiatedDate4) ? source.InitiatedDate4 = Date.parse(source.InitiatedDate4) : null;
    !isNullOrUndefined(source.TargetDate4) ? source.TargetDate4 = Date.parse(source.TargetDate4) : null;
    !isNullOrUndefined(source.AchievedDate4) ? source.AchievedDate4 = Date.parse(source.AchievedDate4) : null;

    !isNullOrUndefined(source.prtDate) ? source.prtDate = new Date(source.prtDate) : null;
    !isNullOrUndefined(source.prtDate1) ? source.prtDate1 = new Date(source.prtDate1) : null;
    !isNullOrUndefined(source.prtDate2) ? source.prtDate2 = new Date(source.prtDate2) : null;
    !isNullOrUndefined(source.parentRightDate) ? source.parentRightDate = new Date(source.parentRightDate) : null;

    !isNullOrUndefined(source.childInvolveDate) ? source.childInvolveDate = new Date(source.childInvolveDate) : null;
      !isNullOrUndefined(source.childInvolveDatePlaced) ? source.childInvolveDatePlaced = new Date(source.childInvolveDatePlaced) : null;

      !isNullOrUndefined(source.childInvolveDate1) ? source.childInvolveDate1 = new Date(source.childInvolveDate1) : null;
      !isNullOrUndefined(source.childInvolveDatePlaced1) ? source.childInvolveDatePlaced1 = new Date(source.childInvolveDatePlaced1) : null;

      !isNullOrUndefined(source.childInvolveDate2) ? source.childInvolveDate2 = new Date(source.childInvolveDate2) : null;
      !isNullOrUndefined(source.childInvolveDatePlaced2) ? source.childInvolveDatePlaced2 = new Date(source.childInvolveDatePlaced2) : null;

    
      !isNullOrUndefined(source.childInvolveDate3) ? source.childInvolveDate3 = new Date(source.childInvolveDate3) : null;
      !isNullOrUndefined(source.childInvolveDatePlaced3) ? source.childInvolveDatePlaced3 = new Date(source.childInvolveDatePlaced3) : null;

      !isNullOrUndefined(source.childInvolveDate4) ? source.childInvolveDate4 = new Date(source.childInvolveDate4) : null;
      !isNullOrUndefined(source.childInvolveDatePlaced4) ? source.childInvolveDatePlaced4 = new Date(source.childInvolveDatePlaced4) : null;

      !isNullOrUndefined(source.InitiatedDate5) ? source.InitiatedDate5 = new Date(source.InitiatedDate5) : null;
      !isNullOrUndefined(source.TargetDate5) ? source.TargetDate5 = new Date(source.TargetDate5) : null;
      !isNullOrUndefined(source.AchievedDate5) ? source.AchievedDate5 = new Date(source.AchievedDate5) : null;

      !isNullOrUndefined(source.InitiatedDate6) ? source.InitiatedDate6 = new Date(source.InitiatedDate6) : null;
      !isNullOrUndefined(source.TargetDate6) ? source.TargetDate6 = new Date(source.TargetDate6) : null;
      !isNullOrUndefined(source.AchievedDate6) ? source.AchievedDate6 = new Date(source.AchievedDate6) : null;

      !isNullOrUndefined(source.dateApproved) ? source.dateApproved = new Date(source.dateApproved) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.courtRepFpOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.courtRepFpOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.courtReportForm = this._fb.group({
      Hearing: [null],
      For: [null],
      CourtDate: [null],
      DatePrepared: [null],
      CaseName: [null],
      youthAge: [null],
      HearingDate: [null],
      Parent: [null],
      Relationship: [null],
      ChildName: [null],
      ChildDob: [null],
      OtherChildName: [null],
      OtherChildDob: [null],
      IsIndianHeritageYes: [false],
      IsIndianHeritageNo: [false],
      ProfessionalsName: [null],
      ProfessionalsAgency: [null],
      ProfessionalsService: [null],
      ReasonForReferral: [null],

      AttentionName: [null],
      AttentionDiagnosis: [null],
      MentalHealth: [null],

      Dates: [null],
      Placement: [null],
      City: [null],

      Dates1: [null],
      Placement1: [null],
      City1: [null],

      AttemptsToIdentify: [null],
      StatusOfChild: [null],
      ReasonableAndPrudent: [null],
      SchoolProgress: [null],
      StatusOfParents: [null],
      SummaryOfVisitation: [null],

      InitiatedDate: [null],
      Activity: [null],
      CourtOrdered: [null],
      ResponsiblePerson: [null],
      TargetDate: [null],
      AchievedDate: [null],

      InitiatedDate1: [null],
      Activity1: [null],
      CourtOrdered1: [null],
      ResponsiblePerson1: [null],
      TargetDate1: [null],
      AchievedDate1: [null],

      InitiatedDate2: [null],
      Activity2: [null],
      CourtOrdered2: [null],
      ResponsiblePerson2: [null],
      TargetDate2: [null],
      AchievedDate2: [null],

      InitiatedDate3: [null],
      Activity3: [null],
      CourtOrdered3: [null],
      ResponsiblePerson3: [null],
      TargetDate3: [null],
      AchievedDate3: [null],

      InitiatedDate4: [null],
      Activity4: [null],
      CourtOrdered4: [null],
      ResponsiblePerson4: [null],
      TargetDate4: [null],
      AchievedDate4: [null],

      SummaryOfProgress: [null],
      Conclusion: [null],
      PermanencySpecialist: [null],
      SfcsSupervisor: [null],
      printedBy: [null],
      printedDate: [null],
      parent:[null],
      relationship:[null],
      prtDate:[null],
  
      parent1:[null],
      relationship1:[null],
      prtDate1:[null],
  
      parent2:[null],
      relationship2:[null],
      prtDate2:[null],
  
      parentalRights:[null],
      parentRightDate:[null],
  
      childInvolveName:[null],
      childInvolveDate:[null],
      childInvolveCase:[null],
      childInvolveLocation:[null],
      childInvolveDatePlaced:[null],
  
      childInvolveName1:[null],
      childInvolveDate1:[null],
      childInvolveCase1:[null],
      childInvolveLocation1:[null],
      childInvolveDatePlaced1:[null],
  
      childInvolveName2:[null],
      childInvolveDate2:[null],
      childInvolveCase2:[null],
      childInvolveLocation2:[null],
      childInvolveDatePlaced2:[null],
  
      childInvolveName3:[null],
      childInvolveDate3:[null],
      childInvolveCase3:[null],
      childInvolveLocation3:[null],
      childInvolveDatePlaced3:[null],
  
      childInvolveName4:[null],
      childInvolveDate4:[null],
      childInvolveCase4:[null],
      childInvolveLocation4:[null],
      childInvolveDatePlaced4:[null],
  
      eligibilityStatus:[null],
  
      professionalName:[null],
      professionalName1:[null],
      professionalName2:[null],
      professionalName3:[null],
      professionalName4:[null],
      professionalName5:[null],
      professionalName6:[null],
      professionalName7:[null],
      professionalName8:[null],
      professionalName9:[null],
      professionalName10:[null],
  
      totalNumber:[null],
      ssiStatus:[null],
  
      statusMother:[null],
      statusFather:[null],
  
      maternalGrandmother:[null],
      maternalGrandfather:[null],
      paternalGrandmother:[null],
      paternalGrandfather:[null],
      otherRelatives:[null],
  
      InitiatedDate5: [null],
      Activity5: [null],
      CourtOrdered5: [null],
      ResponsiblePerson5: [null],
      TargetDate5: [null],
      AchievedDate5: [null],
  
      InitiatedDate6: [null],
      Activity6: [null],
      CourtOrdered6: [null],
      ResponsiblePerson6: [null],
      TargetDate6: [null],
      AchievedDate6: [null],
  
      adoptionLiasion:[null],
      sfSupervisor:[null],
      sfDirector:[null],
  
      dateApproved:[null]

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

      !isNullOrUndefined(formData.CourtDate) ? formData.CourtDate = new Date(formData.CourtDate) : null;
      !isNullOrUndefined(formData.DatePrepared) ? formData.DatePrepared = new Date(formData.DatePrepared) : null;
      !isNullOrUndefined(formData.youthAge) ? formData.youthAge = new Date(formData.youthAge) : null;
      !isNullOrUndefined(formData.ChildDob) ? formData.ChildDob = new Date(formData.ChildDob) : null;
      !isNullOrUndefined(formData.OtherChildDob) ? formData.OtherChildDob = new Date(formData.OtherChildDob) : null;
      !isNullOrUndefined(formData.Dates) ? formData.Dates = new Date(formData.Dates) : null;
      !isNullOrUndefined(formData.Dates1) ? formData.Dates1 = new Date(formData.Dates1) : null;

      !isNullOrUndefined(formData.InitiatedDate) ? formData.InitiatedDate = new Date(formData.InitiatedDate) : null;
      !isNullOrUndefined(formData.TargetDate) ? formData.TargetDate = new Date(formData.TargetDate) : null;
      !isNullOrUndefined(formData.AchievedDate) ? formData.AchievedDate = new Date(formData.AchievedDate) : null;

      !isNullOrUndefined(formData.InitiatedDate1) ? formData.InitiatedDate1 = new Date(formData.InitiatedDate1) : null;
      !isNullOrUndefined(formData.TargetDate1) ? formData.TargetDate1 = new Date(formData.TargetDate1) : null;
      !isNullOrUndefined(formData.AchievedDate1) ? formData.AchievedDate1 = new Date(formData.AchievedDate1) : null;

      !isNullOrUndefined(formData.InitiatedDate2) ? formData.InitiatedDate2 = new Date(formData.InitiatedDate2) : null;
      !isNullOrUndefined(formData.TargetDate2) ? formData.TargetDate2 = new Date(formData.TargetDate2) : null;
      !isNullOrUndefined(formData.AchievedDate2) ? formData.AchievedDate2 = new Date(formData.AchievedDate2) : null;

      !isNullOrUndefined(formData.InitiatedDate3) ? formData.InitiatedDate3 = new Date(formData.InitiatedDate3) : null;
      !isNullOrUndefined(formData.TargetDate3) ? formData.TargetDate3 = new Date(formData.TargetDate3) : null;
      !isNullOrUndefined(formData.AchievedDate3) ? formData.AchievedDate3 = new Date(formData.AchievedDate3) : null;

      !isNullOrUndefined(formData.InitiatedDate4) ? formData.InitiatedDate4 = new Date(formData.InitiatedDate4) : null;
      !isNullOrUndefined(formData.TargetDate4) ? formData.TargetDate4 = new Date(formData.TargetDate4) : null;
      !isNullOrUndefined(formData.AchievedDate4) ? formData.AchievedDate4 = new Date(formData.AchievedDate4) : null;
      
      !isNullOrUndefined(formData.prtDate) ? formData.prtDate = new Date(formData.prtDate) : null;
      !isNullOrUndefined(formData.prtDate1) ? formData.prtDate1 = new Date(formData.prtDate1) : null;
      !isNullOrUndefined(formData.prtDate2) ? formData.prtDate2 = new Date(formData.prtDate2) : null;
      
      !isNullOrUndefined(formData.parentRightDate) ? formData.parentRightDate = new Date(formData.parentRightDate) : null;

      !isNullOrUndefined(formData.childInvolveDate) ? formData.childInvolveDate = new Date(formData.childInvolveDate) : null;
      !isNullOrUndefined(formData.childInvolveDatePlaced) ? formData.childInvolveDatePlaced = new Date(formData.childInvolveDatePlaced) : null;

      !isNullOrUndefined(formData.childInvolveDate1) ? formData.childInvolveDate1 = new Date(formData.childInvolveDate1) : null;
      !isNullOrUndefined(formData.childInvolveDatePlaced1) ? formData.childInvolveDatePlaced1 = new Date(formData.childInvolveDatePlaced1) : null;

      !isNullOrUndefined(formData.childInvolveDate2) ? formData.childInvolveDate2 = new Date(formData.childInvolveDate2) : null;
      !isNullOrUndefined(formData.childInvolveDatePlaced2) ? formData.childInvolveDatePlaced2 = new Date(formData.childInvolveDatePlaced2) : null;

    
      !isNullOrUndefined(formData.childInvolveDate3) ? formData.childInvolveDate3 = new Date(formData.childInvolveDate3) : null;
      !isNullOrUndefined(formData.childInvolveDatePlaced3) ? formData.childInvolveDatePlaced3 = new Date(formData.childInvolveDatePlaced3) : null;

      !isNullOrUndefined(formData.childInvolveDate4) ? formData.childInvolveDate4 = new Date(formData.childInvolveDate4) : null;
      !isNullOrUndefined(formData.childInvolveDatePlaced4) ? formData.childInvolveDatePlaced4 = new Date(formData.childInvolveDatePlaced4) : null;

      !isNullOrUndefined(formData.InitiatedDate5) ? formData.InitiatedDate5 = new Date(formData.InitiatedDate5) : null;
      !isNullOrUndefined(formData.TargetDate5) ? formData.TargetDate5 = new Date(formData.TargetDate5) : null;
      !isNullOrUndefined(formData.AchievedDate5) ? formData.AchievedDate5 = new Date(formData.AchievedDate5) : null;

      !isNullOrUndefined(formData.InitiatedDate6) ? formData.InitiatedDate6 = new Date(formData.InitiatedDate6) : null;
      !isNullOrUndefined(formData.TargetDate6) ? formData.TargetDate6 = new Date(formData.TargetDate6) : null;
      !isNullOrUndefined(formData.AchievedDate6) ? formData.AchievedDate6 = new Date(formData.AchievedDate6) : null;

      !isNullOrUndefined(formData.dateApproved) ? formData.dateApproved = new Date(formData.dateApproved) : null;

      //  this.initialScreeningForm = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.initialScreeningForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
