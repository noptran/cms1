import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReKinshipVisitation } from './re-kinship-visitation';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-kinship-visitation-plan',
  templateUrl: './kinship-visitation-plan.component.html',
  styleUrls: ['./kinship-visitation-plan.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['kinVisPlanOut']
})
export class KinshipVisitationPlanComponent implements OnInit {
  kinshipVisitationForm: FormGroup;
  reKinshipVisitation: ReKinshipVisitation = new ReKinshipVisitation();
  isEdit = false;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;
  @Output()
  kinVisPlanOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/kinship/visitation/plan/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.kinshipVisitationForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reKinshipVisitation = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.EffectiveDate) ? formData.EffectiveDate = new Date(formData.EffectiveDate) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
    !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;
    !isNullOrUndefined(formData.Date3) ? formData.Date3 = new Date(formData.Date3) : null;
    !isNullOrUndefined(formData.Date4) ? formData.Date4 = new Date(formData.Date4) : null;
    !isNullOrUndefined(formData.Date5) ? formData.Date5 = new Date(formData.Date5) : null;
    this.reKinshipVisitation = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reKinshipVisitation.ChildName = data.person.firstName + " " + data.person.lastName;
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.reKinshipVisitation.Facts = (data.referral.facts)
      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }

  editForm() {
    this.kinshipVisitationForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.EffectiveDate) ? source.EffectiveDate = Date.parse(source.EffectiveDate) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;
    !isNullOrUndefined(source.Date2) ? source.Date2 = Date.parse(source.Date2) : null;
    !isNullOrUndefined(source.Date3) ? source.Date3 = Date.parse(source.Date3) : null;
    !isNullOrUndefined(source.Date4) ? source.Date4 = Date.parse(source.Date4) : null;
    !isNullOrUndefined(source.Date5) ? source.Date5 = Date.parse(source.Date5) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.kinVisPlanOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.kinVisPlanOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.kinshipVisitationForm = this._fb.group({
      ChildName: [null],
      Facts: [null],
      Supervised: [null],
      Monitored: [null],
      Unsupervised: [null],

      isPhoneAllowed: [false],
      isPhoneSupervised: [false],
      isPhoneSfcs: [false],
      isPhoneKin: [false],
      isPhoneMonitored: [false],
      isPhoneSfcs1: [false],
      isPhoneKin1: [false],
      isPhoneNotAllowed: [false],

      EffectiveDate: [null],
      ParticipantsIncluded: [null],
      PersonArrangeVisits: [null],
      PersonTransport: [null],
      LocationOfVisits: [null],
      TimeOfVisits: [null],
      DurationOfVisits: [null],
      FrequencyOfVisits: [null],
      VisitationRestrictions: [null],

      KinshipParent: [null],
      Date: [null],
      KinshipParent1: [null],
      Date1: [null],

      PermanencySpecialis: [null],
      Date2: [null],
      FamilySupportWorker: [null],
      Date3: [null],

      KinshipSupportWorker: [null],
      Date4: [null],

      ReintegrationSuperviso: [null],
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

      // !isNullOrUndefined(formData.EffectiveDate) ? formData.EffectiveDate = new Date(formData.EffectiveDate) : null;
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      // !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      // !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;
      // !isNullOrUndefined(formData.Date3) ? formData.Date3 = new Date(formData.Date3) : null;
      // !isNullOrUndefined(formData.Date4) ? formData.Date4 = new Date(formData.Date4) : null;
      // !isNullOrUndefined(formData.Date5) ? formData.Date5 = new Date(formData.Date5) : null;
      //  this.reKinshipVisitation = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.kinshipVisitationForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
