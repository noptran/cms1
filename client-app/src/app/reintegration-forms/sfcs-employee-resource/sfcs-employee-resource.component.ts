import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReSfcsEmpRes } from './re-sfcs-emp-res';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-sfcs-employee-resource',
  templateUrl: './sfcs-employee-resource.component.html',
  styleUrls: ['./sfcs-employee-resource.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['sfcsEmplOut']
})
export class SfcsEmployeeResourceComponent implements OnInit {
  sfcsEmployeeResourceForm: FormGroup;
  reSfcsEmployeeResource: ReSfcsEmpRes = new ReSfcsEmpRes();
  editControll = true;
  isEdit = false;
  isPrint = true;
  printedBy: any;
  printedDate: any;

  @Output()
  sfcsEmplOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/placement/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/placements/sfcs/employee/resource/detail') { this.getDetails(); }
    this.autoFetchDetails();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reSfcsEmployeeResource = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.StartEndDates) ? formData.StartEndDates = new Date(formData.StartEndDates) : null;
    !isNullOrUndefined(formData.DateCompleted) ? formData.DateCompleted = new Date(formData.DateCompleted) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    !isNullOrUndefined(formData.DateReviewed) ? formData.DateReviewed = new Date(formData.DateReviewed) : null;
    this.reSfcsEmployeeResource = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);

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
    this.isEdit = false;
    this.sfcsEmployeeResourceForm.enable();
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.StartEndDates) ? source.StartEndDates = Date.parse(source.StartEndDates) : null;
    !isNullOrUndefined(source.DateCompleted) ? source.DateCompleted = Date.parse(source.DateCompleted) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.DateReviewed) ? source.DateReviewed = Date.parse(source.DateReviewed) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.sfcsEmplOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.sfcsEmplOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.sfcsEmployeeResourceForm = this._fb.group({
      EmployeeName: [null],
      CurrentPosition: [null],
      SponsoringAgency: [null],
      ChildName: [null],
      ChildOffice: [null],
      StartEndDates: [null],
      SummaryPlacement: [null],
      DualRelationshipConcerns: [null],
      MinimizeRiskSteps: [null],
      OtherInformation: [null],

      SignatureStaffComplete: [null],
      DateCompleted: [null],
      SignatureSupervisor: [null],
      Date: [null],

      IsDecisionApproved: [false],
      IsDecisionDenied: [false],

      Decision: [null],

      ChildCaseAvp: [null],
      EmployeeResourceParentAvp: [null],
      ClinicalDirector: [null],
      EmployeeResourceParentVp: [null],
      ChildCaseVp: [null],
      DateReviewed: [null],
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

      // !isNullOrUndefined(source.StartEndDates) ? source.StartEndDates = Date.parse(source.StartEndDates) : null;
      // !isNullOrUndefined(source.DateCompleted) ? source.DateCompleted = Date.parse(source.DateCompleted) : null;
      // !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
      // !isNullOrUndefined(source.DateReviewed) ? source.DateReviewed = Date.parse(source.DateReviewed) : null;
      //  this.reSfcsEmployeeResource = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.sfcsEmployeeResourceForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }


}
