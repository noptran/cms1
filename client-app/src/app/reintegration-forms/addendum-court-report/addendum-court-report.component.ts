import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReAddendum } from './re-addendum';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-addendum-court-report',
  templateUrl: './addendum-court-report.component.html',
  styleUrls: ['./addendum-court-report.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['addentumOut']
})
export class AddendumCourtReportComponent implements OnInit {
  addendumCourtForm: FormGroup;
  reAddendumCourt: ReAddendum = new ReAddendum();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  addentumOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/court-orders/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/courtorder/addendum/court/report/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.addendumCourtForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reAddendumCourt = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DateTime) ? formData.DateTime = new Date(formData.DateTime) : null;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.DatePrepared) ? formData.DatePrepared = new Date(formData.DatePrepared) : null;
    !isNullOrUndefined(formData.DatePlaced) ? formData.DatePlaced = new Date(formData.DatePlaced) : null;
    this.reAddendumCourt = formData;
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reAddendumCourt.CaseName = data.person.firstName + " " + data.person.lastName;
        this.reAddendumCourt.Dob = new Date(data.person.dob);
        this.reAddendumCourt.DatePrepared = new Date();
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.reAddendumCourt.CourtCase = (data.referral.caseID.caseID)
      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }

  editForm() {
    this.addendumCourtForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.DateTime) ? source.DateTime = Date.parse(source.DateTime) : null;
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.DatePrepared) ? source.DatePrepared = Date.parse(source.DatePrepared) : null;
    !isNullOrUndefined(source.DatePlaced) ? source.DatePlaced = Date.parse(source.DatePlaced) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.addentumOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.addentumOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.addendumCourtForm = this._fb.group({
      Hearing: [null],
      For: [null],
      DateTime: [null],
      CaseName: [null],
      Dob: [null],
      DatePrepared: [null],
      CourtCase: [null],
      Parent: [null],
      Relationship: [null],
      Name: [null],
      Location: [null],
      DatePlaced: [null],
      Name1: [null],
      Agency: [null],
      Title: [null],
      ReasonForReferral: [null],
      NewInformation: [null],
      Recommendations: [null],

      SfcsSocialWorker: [null],
      SfcsSupervisor: [null],
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
      //  !isNullOrUndefined(formData.DateTime) ? formData.DateTime = new Date(formData.DateTime) : null;
      //  !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      //  !isNullOrUndefined(formData.DatePrepared) ? formData.DatePrepared = new Date(formData.DatePrepared) : null;
      //  !isNullOrUndefined(formData.DatePlaced) ? formData.DatePlaced = new Date(formData.DatePlaced) : null;
      //  this.reAddendumCourt = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.addendumCourtForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
