import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReReviewHearing } from './re-review-hearing';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-review-hearing-exhibit',
  templateUrl: './review-hearing-exhibit.component.html',
  styleUrls: ['./review-hearing-exhibit.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['revHearOut']
})
export class ReviewHearingExhibitComponent implements OnInit {

  reviewHearingForm: FormGroup;
  reReviewHearing: ReReviewHearing = new ReReviewHearing();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  revHearOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/court-orders/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/courtorder/review/hearing/exhibit/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.reviewHearingForm.disable();
  }

  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reReviewHearing = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.HearingDate) ? formData.HearingDate = new Date(formData.HearingDate) : null;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    this.reReviewHearing = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reReviewHearing.CaseName = data.person.firstName + " " + data.person.lastName;
        this.reReviewHearing.CaseNumber = data.person.kaecses;
        this.reReviewHearing.HearingDate = new Date();
        this.reReviewHearing.Dob = new Date(data.person.dob);
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
    this.reviewHearingForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.HearingDate) ? source.HearingDate = Date.parse(source.HearingDate) : null;
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.revHearOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.revHearOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.reviewHearingForm = this._fb.group({

      CaseName: [null],
      CaseNumber: [null],
      HearingDate: [null],
      Judge: [null],
      Child: [null],
      Dob: [null],
      Age: [null],
      CaseNumber1: [null],
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
      //  !isNullOrUndefined(formData.HearingDate) ? formData.HearingDate = new Date(formData.HearingDate) : null;
      //  !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      //  this.reReviewHearing = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.reviewHearingForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
