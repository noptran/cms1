import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { AdopCourtRepTemp } from './adop-court-rep-temp';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';

import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-adoption-court-report-template',
  templateUrl: './adoption-court-report-template.component.html',
  styleUrls: ['./adoption-court-report-template.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['adopCourtOut']
})
export class AdoptionCourtReportTemplateComponent implements OnInit {
  adoptionCourtReportTempForm: FormGroup;
  adopCourtReportTemp: AdopCourtRepTemp = new AdopCourtRepTemp();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  adopCourtOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/adoption-event/detail') {
      this.getCmsFormJson();
      this.adoptionCourtReportTempForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/rfc/adoption-event/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/adoption/adoption/court/report/template/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.adoptionCourtReportTempForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.adopCourtReportTemp = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.CourtDate) ? formData.CourtDate = new Date(formData.CourtDate) : null;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;

    !isNullOrUndefined(formData.DateFor14Age) ? formData.DateFor14Age = new Date(formData.DateFor14Age) : null;
    !isNullOrUndefined(formData.Na) ? formData.Na = new Date(formData.Na) : null;

    !isNullOrUndefined(formData.DatePrepared) ? formData.DatePrepared = new Date(formData.DatePrepared) : null;
    !isNullOrUndefined(formData.DatePlaced) ? formData.DatePlaced = new Date(formData.DatePlaced) : null;

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
    this.adopCourtReportTemp = formData;
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.adopCourtReportTemp.CaseName = data.person.firstName + " " + data.person.lastName;
        this.adopCourtReportTemp.CourtCase = data.person.kaecses;
        this.adopCourtReportTemp.Dob = new Date(data.person.dob);
        this.adopCourtReportTemp.DatePrepared = new Date();
        this.printedBy = "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);

      })

    this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + data.users.lastName;

      })
  }

  editForm() {
    this.adoptionCourtReportTempForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.CourtDate) ? source.CourtDate = Date.parse(source.CourtDate) : null;
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;

    !isNullOrUndefined(source.DateFor14Age) ? source.DateFor14Age = Date.parse(source.DateFor14Age) : null;
    !isNullOrUndefined(source.Na) ? source.Na = Date.parse(source.Na) : null;

    !isNullOrUndefined(source.DatePrepared) ? source.DatePrepared = Date.parse(source.DatePrepared) : null;
    !isNullOrUndefined(source.DatePlaced) ? source.DatePlaced = Date.parse(source.DatePlaced) : null;

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

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.adopCourtOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/rfc/adoption"]);
  }
  discardForm() {
    this.adopCourtOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.adoptionCourtReportTempForm = this._fb.group({
      Hearing: [null],
      For: [null],
      CourtDate: [null],
      CaseName: [null],
      Dob: [null],
      NameEachChild: [null],
      DateFor14Age: [null],
      Na: [null],
      DatePrepared: [null],
      CourtCase: [null],
      Caretaker: [null],
      Relationship: [null],

      Name: [null],
      Location: [null],
      DatePlaced: [null],

      IsHeritageYes: [false],
      IsHeritageNo: [false],

      ProfessionalsName: [null],
      ProfessionalsAgency: [null],
      ProfessionalsTitle: [null],

      Name1: [null],
      Diagnosis: [null],

      Dates: [null],
      Placement: [null],
      City: [null],

      Dates1: [null],
      Placement1: [null],
      City1: [null],

      InitiatedDate: [null],
      Task: [null],
      CourtOrdered: [null],
      ResponsiblePerson: [null],
      TargetDate: [null],
      AchievedDate: [null],

      InitiatedDate1: [null],
      Task1: [null],
      CourtOrdered1: [null],
      ResponsiblePerson1: [null],
      TargetDate1: [null],
      AchievedDate1: [null],

      InitiatedDate2: [null],
      Task2: [null],
      CourtOrdered2: [null],
      ResponsiblePerson2: [null],
      TargetDate2: [null],
      AchievedDate2: [null],

      InitiatedDate3: [null],
      Task3: [null],
      CourtOrdered3: [null],
      ResponsiblePerson3: [null],
      TargetDate3: [null],
      AchievedDate3: [null],

      ApprovedBy: [null],
      AdoptionSocialWorker: [null],
      AdoptionSupervisor: [null],
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

      // !isNullOrUndefined(formData.CourtDate) ? formData.CourtDate = new Date(formData.CourtDate) : null;
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;

      // !isNullOrUndefined(formData.DateFor14Age) ? formData.DateFor14Age = new Date(formData.DateFor14Age) : null;
      // !isNullOrUndefined(formData.Na) ? formData.Na = new Date(formData.Na) : null;

      // !isNullOrUndefined(formData.DatePrepared) ? formData.DatePrepared = new Date(formData.DatePrepared) : null;
      // !isNullOrUndefined(formData.DatePlaced) ? formData.DatePlaced = new Date(formData.DatePlaced) : null;

      // !isNullOrUndefined(formData.Dates) ? formData.Dates = new Date(formData.Dates) : null;
      // !isNullOrUndefined(formData.Dates1) ? formData.Dates1 = new Date(formData.Dates1) : null;

      // !isNullOrUndefined(formData.InitiatedDate) ? formData.InitiatedDate = new Date(formData.InitiatedDate) : null;
      // !isNullOrUndefined(formData.TargetDate) ? formData.TargetDate = new Date(formData.TargetDate) : null;

      // !isNullOrUndefined(formData.AchievedDate) ? formData.AchievedDate = new Date(formData.AchievedDate) : null;

      // !isNullOrUndefined(formData.InitiatedDate1) ? formData.InitiatedDate1 = new Date(formData.InitiatedDate1) : null;
      // !isNullOrUndefined(formData.TargetDate1) ? formData.TargetDate1 = new Date(formData.TargetDate1) : null;

      // !isNullOrUndefined(formData.AchievedDate1) ? formData.AchievedDate1 = new Date(formData.AchievedDate1) : null;

      // !isNullOrUndefined(formData.InitiatedDate2) ? formData.InitiatedDate2 = new Date(formData.InitiatedDate2) : null;
      // !isNullOrUndefined(formData.TargetDate2) ? formData.TargetDate2 = new Date(formData.TargetDate2) : null;

      // !isNullOrUndefined(formData.AchievedDate2) ? formData.AchievedDate2 = new Date(formData.AchievedDate2) : null;

      // !isNullOrUndefined(formData.InitiatedDate3) ? formData.InitiatedDate3 = new Date(formData.InitiatedDate3) : null;
      // !isNullOrUndefined(formData.TargetDate3) ? formData.TargetDate3 = new Date(formData.TargetDate3) : null;

      // !isNullOrUndefined(formData.AchievedDate3) ? formData.AchievedDate3 = new Date(formData.AchievedDate3) : null;

      //  this.adopCourtReportTemp = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.adoptionCourtReportTempForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
