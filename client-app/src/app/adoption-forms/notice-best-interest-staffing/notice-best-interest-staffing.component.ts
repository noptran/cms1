import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { AdopBestIntStaff } from './adop-best-int-staff';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-notice-best-interest-staffing',
  templateUrl: './notice-best-interest-staffing.component.html',
  styleUrls: ['./notice-best-interest-staffing.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['bestIntOut']
})
export class NoticeBestInterestStaffingComponent implements OnInit {
  noticeBestInterestForm: FormGroup;
  adopNoticeBestInterest: AdopBestIntStaff = new AdopBestIntStaff();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;

  @Output()
  bestIntOut = new EventEmitter()

  constructor(public _printPdf: PrintPdf,public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/adoption-event/detail') {
      this.getCmsFormJson();
      this.noticeBestInterestForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/rfc/bis/detail') {
      this.getCmsFormJson();
      this.noticeBestInterestForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/rfc/adoption-event/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/attachment-document/rfc/bis/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/adoption/notice/of/best/interest/staffing/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.noticeBestInterestForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.adopNoticeBestInterest = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    this.adopNoticeBestInterest = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.adopNoticeBestInterest.Dob = new Date(data.person.dob);
        this.adopNoticeBestInterest.Date = new Date();
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
    this.noticeBestInterestForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.bestIntOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/rfc/adoption"]);
  }
  discardForm() {
    this.bestIntOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.noticeBestInterestForm = this._fb.group({
      Date: [null],
      Re: [null],
      Dob: [null],
      Name: [null],
      Title: [null],
      Address: [null],
      Phone: [null],
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
      //  !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      //  !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      //  this.adopNoticeBestInterest = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.noticeBestInterestForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
