import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { AdopIndividualRecruitment } from './adop-individual-recruitment';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-individual-recruitment-plan',
  templateUrl: './individual-recruitment-plan.component.html',
  styleUrls: ['./individual-recruitment-plan.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['indRecOut']
})
export class IndividualRecruitmentPlanComponent implements OnInit {
  individualRecruitmentForm: FormGroup;
  adopIndividualRecruitment: AdopIndividualRecruitment = new AdopIndividualRecruitment();
  isEdit = false;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;
  @Output()
  indRecOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/adoption-event/detail') {
      this.getCmsFormJson();
      this.individualRecruitmentForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/rfc/adoption-event/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/adoption/individual/recruitment/plan/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.individualRecruitmentForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.adopIndividualRecruitment = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.TodayDate) ? formData.TodayDate = new Date(formData.TodayDate) : null;
    !isNullOrUndefined(formData.DateForwarded) ? formData.DateForwarded = new Date(formData.DateForwarded) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
    this.adopIndividualRecruitment = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.adopIndividualRecruitment.ChildName = data.person.firstName + " " + data.person.lastName;
        this.adopIndividualRecruitment.Kaecses = data.person.kaecses;
        this.adopIndividualRecruitment.TodayDate = new Date();
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
    this.individualRecruitmentForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.TodayDate) ? source.TodayDate = Date.parse(source.TodayDate) : null;
    !isNullOrUndefined(source.DateForwarded) ? source.DateForwarded = Date.parse(source.DateForwarded) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.indRecOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/rfc/adoption"]);
  }
  discardForm() {
    this.indRecOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.individualRecruitmentForm = this._fb.group({
      ChildName: [null],
      Kaecses: [null],
      SocialSecurity: [null],
      Age: [null],
      Ethnicity: [null],
      TodayDate: [null],
      AgencyName: [null],
      PhoneNumber: [null],
      Address: [null],
      City: [null],
      ContactPerson: [null],
      PlacementAgency: [null],
      PhoneNumber1: [null],
      FosterParents: [null],
      PhoneNumber2: [null],
      Address1: [null],
      ChildPicture: [null],

      LikeMost: [null],
      SpecialTalents: [null],
      ShowAffection: [null],
      GetAlong: [null],
      PhysicalHealthCondition: [null],
      MentalHealthCondition: [null],
      ChildTherapy: [null],
      Medication: [null],
      BehavioralIssues: [null],
      FamilyPlacement: [null],
      SuccessfulEfforts: [null],
      PreparationAdoption: [null],
      ExpressedPreferences: [null],
      Challenges: [null],
      Strengths: [null],
      SiblingInformation: [null],
      TypeOfFamily: [null],
      RecruitmentPlan: [null],
      DateForwarded: [null],
      SocialWorkerSignature: [null],
      Date: [null],
      SupervisorSignature: [null],
      Date1: [null],
      isYes: [false],
      isNo: [false],
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
      // !isNullOrUndefined(formData.DateForwarded) ? formData.DateForwarded = new Date(formData.DateForwarded) : null;
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      // !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      //  this.adopIndividualRecruitment = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.individualRecruitmentForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.jsPdfOrientation = 'landscape';
    this._printPdf.printForm();
  }

}
