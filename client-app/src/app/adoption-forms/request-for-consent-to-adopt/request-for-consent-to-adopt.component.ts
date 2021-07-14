import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { AdopReqForConsent } from './adop-req-for-consent';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-request-for-consent-to-adopt',
  templateUrl: './request-for-consent-to-adopt.component.html',
  styleUrls: ['./request-for-consent-to-adopt.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['reqConOut']
})
export class RequestForConsentToAdoptComponent implements OnInit {
  requestForConsentForm: FormGroup;
  reRequestForConsent: AdopReqForConsent = new AdopReqForConsent();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;

  @Output()
  reqConOut = new EventEmitter();

  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/adoption-event/detail') {
      this.getCmsFormJson();
      this.requestForConsentForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/rfc/adoption-event/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/adoption/request/for/consent/to/adopt/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.requestForConsentForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    console.log("data is",data);
    
    let json = JSON.parse(data.pdfJsonData);
    this.reRequestForConsent = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;
    !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
    this.reRequestForConsent = formData;
    console.log("this.reRequestForConsent in getCmsFormJson is",this.reRequestForConsent)
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reRequestForConsent.ChildName = data.person.firstName + " " + data.person.lastName;
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
    this.requestForConsentForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;
    !isNullOrUndefined(source.Date2) ? source.Date2 = Date.parse(source.Date2) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.reqConOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/rfc/adoption"]);
  }
  discardForm() {
    this.reqConOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.requestForConsentForm = this._fb.group({
      ChildName: [null],
      FamilyName: [null],
      ChildProgress: [null],
      PreparationFinalization: [null],
      ChangesFamilyLife: [null],
      Services: [null],
      NameAndRelationship1: [null],
      NameAndRelationship2: [null],
      NameAndRelationship3: [null],
      NameAndRelationship4: [null],
      NameAndRelationship5: [null],
      CaseManagerSignature: [null],
      Date1: [null],
      SupervisorSignature: [null],
      Date2: [null],
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
      //  !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;
      //  !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      //  this.reRequestForConsent = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.requestForConsentForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
