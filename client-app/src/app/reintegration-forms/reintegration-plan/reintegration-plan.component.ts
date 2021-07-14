import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReReintegrationPlan } from './re-reintegration-plan';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-reintegration-plan',
  templateUrl: './reintegration-plan.component.html',
  styleUrls: ['./reintegration-plan.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['reintPlanOut']

})
export class ReintegrationPlanComponent implements OnInit {
  reintegrationPlanForm: FormGroup;
  reReintegrationPlan: ReReintegrationPlan = new ReReintegrationPlan();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;

  @Output()
  reintPlanOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/court-orders/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/courtorder/reintegration/plan/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.reintegrationPlanForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reReintegrationPlan = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.ParentDob) ? formData.ParentDob = new Date(formData.ParentDob) : null;
    !isNullOrUndefined(formData.ChildDob) ? formData.ChildDob = new Date(formData.ChildDob) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

    !isNullOrUndefined(formData.OtherChildDob) ? formData.OtherChildDob = new Date(formData.OtherChildDob) : null;
    !isNullOrUndefined(formData.TentativeDate) ? formData.TentativeDate = new Date(formData.TentativeDate) : null;
    !isNullOrUndefined(formData.DateAfterCar) ? formData.DateAfterCar = new Date(formData.DateAfterCar) : null;
    !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
    !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;
    !isNullOrUndefined(formData.Date3) ? formData.Date3 = new Date(formData.Date3) : null;
    !isNullOrUndefined(formData.Date4) ? formData.Date4 = new Date(formData.Date4) : null;
    !isNullOrUndefined(formData.Date5) ? formData.Date5 = new Date(formData.Date5) : null;
    this.reReintegrationPlan = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reReintegrationPlan.ParentDob = new Date(data.person.dob);
        this.reReintegrationPlan.Date = new Date();
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
    this.reintegrationPlanForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.ParentDob) ? source.ParentDob = Date.parse(source.ParentDob) : null;
    !isNullOrUndefined(source.ChildDob) ? source.ChildDob = Date.parse(source.ChildDob) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;

    !isNullOrUndefined(source.OtherChildDob) ? source.OtherChildDob = Date.parse(source.OtherChildDob) : null;
    !isNullOrUndefined(source.TentativeDate) ? source.TentativeDate = Date.parse(source.TentativeDate) : null;
    !isNullOrUndefined(source.DateAfterCar) ? source.DateAfterCar = Date.parse(source.DateAfterCar) : null;
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;
    !isNullOrUndefined(source.Date2) ? source.Date2 = Date.parse(source.Date2) : null;
    !isNullOrUndefined(source.Date3) ? source.Date3 = Date.parse(source.Date3) : null;
    !isNullOrUndefined(source.Date4) ? source.Date4 = Date.parse(source.Date4) : null;
    !isNullOrUndefined(source.Date5) ? source.Date5 = Date.parse(source.Date5) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.reintPlanOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.reintPlanOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.reintegrationPlanForm = this._fb.group({

      Date: [null],
      CaseNumber: [null],
      Parent: [null],
      ParentDob: [null],
      ParentRelationship: [null],
      ChildName: [null],
      ChildDob: [null],
      OtherChildName: [null],
      OtherChildDob: [null],
      ReasonForCustody: [null],
      Completed: [null],
      NotCompleted: [null],
      Safety: [null],
      VisitationProgression: [null],
      TentativeDate: [null],

      Frequency: [null],
      Services: [null],
      MedicalCardApplication: [null],
      NaturalSupports: [null],
      DateAfterCar: [null],

      Parent1: [null],
      Date1: [null],

      Parent2: [null],
      Date2: [null],

      SocialWorker: [null],
      Date3: [null],

      FamilySupportWorker: [null],
      Date4: [null],

      ReintegrationSupervisor: [null],
      Date5: [null],
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


      //   !isNullOrUndefined(formData.ParentDob) ? formData.ParentDob = new Date(formData.ParentDob) : null;
      // !isNullOrUndefined(formData.ChildDob) ? formData.ChildDob = new Date(formData.ChildDob) : null;
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

      // !isNullOrUndefined(formData.OtherChildDob) ? formData.OtherChildDob = new Date(formData.OtherChildDob) : null;
      // !isNullOrUndefined(formData.TentativeDate) ? formData.TentativeDate = new Date(formData.TentativeDate) : null;
      // !isNullOrUndefined(formData.DateAfterCar) ? formData.DateAfterCar = new Date(formData.DateAfterCar) : null;
      // !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      // !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;
      // !isNullOrUndefined(formData.Date3) ? formData.Date3 = new Date(formData.Date3) : null;
      // !isNullOrUndefined(formData.Date4) ? formData.Date4 = new Date(formData.Date4) : null;
      // !isNullOrUndefined(formData.Date5) ? formData.Date5 = new Date(formData.Date5) : null;
      //  this.reReintegrationPlan = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.reintegrationPlanForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
