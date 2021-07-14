import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReVisitationCourtReport } from './re-visitation-court-report';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-visitation-court-report',
  templateUrl: './visitation-court-report.component.html',
  styleUrls: ['./visitation-court-report.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['visitCourtOut']
})
export class VisitationCourtReportComponent implements OnInit {
  visitationCourtReportForm: FormGroup;
  reVisitationCourtReport: ReVisitationCourtReport = new ReVisitationCourtReport();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  visitCourtOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/court-orders/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/courtorder/visitation/court/report/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.visitationCourtReportForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reVisitationCourtReport = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DatePrepared) ? formData.DatePrepared = new Date(formData.DatePrepared) : null;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.ChildDob) ? formData.ChildDob = new Date(formData.ChildDob) : null;
    !isNullOrUndefined(formData.InclusiveDates) ? formData.InclusiveDates = new Date(formData.InclusiveDates) : null;
    this.reVisitationCourtReport = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reVisitationCourtReport.CaseName = data.person.firstName + " " + data.person.lastName;
        this.reVisitationCourtReport.DatePrepared = new Date();
        this.reVisitationCourtReport.DatePrepared = new Date(data.person.dob);
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.reVisitationCourtReport.CourtCaseNumber = (data.referral.caseID.caseID)
      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }


  editForm() {
    this.visitationCourtReportForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.DatePrepared) ? source.DatePrepared = Date.parse(source.DatePrepared) : null;
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.ChildDob) ? source.ChildDob = Date.parse(source.ChildDob) : null;
    !isNullOrUndefined(source.InclusiveDates) ? source.InclusiveDates = Date.parse(source.InclusiveDates) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.visitCourtOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.visitCourtOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.visitationCourtReportForm = this._fb.group({

      CaseName: [null],
      DatePrepared: [null],
      CourtCaseNumber: [null],
      PreparedBy: [null],
      InclusiveDates: [null],
      Parent: [null],
      Dob: [null],
      Relationship: [null],
      ChildName: [null],
      ChildDob: [null],
      SfcsName: [null],
      CaseSummary: [null],
      Visitation: [null],
      SfcsWorker: [null],
      TeamSupervisor: [null],
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
      //  !isNullOrUndefined(formData.DatePrepared) ? formData.DatePrepared = new Date(formData.DatePrepared) : null;
      //  !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      //  !isNullOrUndefined(formData.ChildDob) ? formData.ChildDob = new Date(formData.ChildDob) : null;
      //  !isNullOrUndefined(formData.InclusiveDates) ? formData.InclusiveDates = new Date(formData.InclusiveDates) : null;
      //  this.reVisitationCourtReport = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.visitationCourtReportForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
