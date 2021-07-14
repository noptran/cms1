import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { AdopReqSchBestInt } from './adop-req-sch-best-int';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-request-to-schedule-best-interest-staffing',
  templateUrl: './request-to-schedule-best-interest-staffing.component.html',
  styleUrls: ['./request-to-schedule-best-interest-staffing.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['reqSceOut']
})
export class RequestToScheduleBestInterestStaffingComponent implements OnInit {
  requestToScheduleBestForm: FormGroup;
  adopRequestToScheduleBest: AdopReqSchBestInt = new AdopReqSchBestInt();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;

  @Output()
  reqSceOut = new EventEmitter();

  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/adoption-event/detail') {
      this.getCmsFormJson();
      this.requestToScheduleBestForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/rfc/bis/detail') {
      this.getCmsFormJson();
      this.requestToScheduleBestForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/rfc/adoption-event/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/attachment-document/rfc/bis/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/adoption/request/to/schedule/best/interest/staffing/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.requestToScheduleBestForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.adopRequestToScheduleBest = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.TodayDate) ? formData.TodayDate = new Date(formData.TodayDate) : null;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.Dob1) ? formData.DateOfConDob1viction2 = new Date(formData.Dob1) : null;
    !isNullOrUndefined(formData.Dob2) ? formData.Dob2 = new Date(formData.Dob2) : null;

    this.adopRequestToScheduleBest = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.adopRequestToScheduleBest.TodayDate = new Date();
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
    this.requestToScheduleBestForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.TodayDate) ? source.TodayDate = Date.parse(source.TodayDate) : null;
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.Dob1) ? source.Dob1 = Date.parse(source.Dob1) : null;
    !isNullOrUndefined(source.Dob2) ? source.Dob2 = Date.parse(source.Dob2) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.reqSceOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/rfc/adoption"]);
  }
  discardForm() {
    this.reqSceOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.requestToScheduleBestForm = this._fb.group({
      TodayDate: [null],

      Children: [null],
      Dob: [null],

      Children1: [null],
      Dob1: [null],

      Children2: [null],
      Dob2: [null],

      FamilyConsidered: [null],
      HomeAssessmentWriter: [null],

      FamilyConsidered1: [null],
      HomeAssessmentWriter1: [null],

      FamilyConsidered2: [null],
      HomeAssessmentWriter2: [null],

      Recruiter: [null],
      Fsw: [null],
      Cm: [null],
      Supervisor: [null],

      Gal: [null],
      EmailAddress1: [null],

      CourtServiceOfficer: [null],
      EmailAddress2: [null],

      Therapist: [null],
      EmailAddress3: [null],

      Educator: [null],
      EmailAddress4: [null],

      Casa: [null],
      EmailAddress5: [null],

      IcwaRep: [null],
      EmailAddress6: [null],

      DcfLiaison: [null],
      Placement: [null],

      FosterCareWorker: [null],
      FamilySupportWorker: [null],
      CaseManager: [null],
      Signature: [null],
      AdoptionSupervisor: [null],
      Signature1: [null],
      email1: [null],
      email2: [null],
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
      // !isNullOrUndefined(formData.TodayDate) ? formData.TodayDate = new Date(formData.TodayDate) : null;
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      // !isNullOrUndefined(formData.Dob1) ? formData.DateOfConDob1viction2 = new Date(formData.Dob1) : null;
      // !isNullOrUndefined(formData.Dob2) ? formData.Dob2 = new Date(formData.Dob2) : null;

      //  this.adopRequestToScheduleBest = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.requestToScheduleBestForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
