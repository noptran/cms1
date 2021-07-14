import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReParentChild } from './re-parent-child';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-parent-child-interaction',
  templateUrl: './parent-child-interaction.component.html',
  styleUrls: ['./parent-child-interaction.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['parChildIntOut']
})
export class ParentChildInteractionComponent implements OnInit {
  parentChildInteractForm: FormGroup;
  reParentChildInteract: ReParentChild = new ReParentChild();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  parChildIntOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/caseplangoals/parent/child/interaction/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.parentChildInteractForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reParentChildInteract = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.EffectiveDate) ? formData.EffectiveDate = new Date(formData.EffectiveDate) : null;
    !isNullOrUndefined(formData.EffectiveDate1) ? formData.EffectiveDate1 = new Date(formData.EffectiveDate1) : null;
    this.reParentChildInteract = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reParentChildInteract.ChildName = data.person.firstName + " " + data.person.lastName;
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.reParentChildInteract.Facts = (data.referral.facts)
      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }

  editForm() {
    this.parentChildInteractForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.EffectiveDate) ? source.EffectiveDate = Date.parse(source.EffectiveDate) : null;
    !isNullOrUndefined(source.EffectiveDate1) ? source.EffectiveDate1 = Date.parse(source.EffectiveDate1) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.parChildIntOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.parChildIntOut.emit({ cmsData: {} });
  }

  formValidation() {
    this.parentChildInteractForm = this._fb.group({
      ChildName: [null],
      Facts: [null],

      ParentName: [null],
      Frequency: [null],
      EffectiveDate: [null],
      IsSupervised: [false],
      IsUnSupervised: [false],
      IsOther: [false],
      Arrangements: [null],
      InteractionsNotOccurring: [null],
      MoveUnsupervised: [null],
      other: [null],
      other1: [null],
      ParentName1: [null],
      Frequency1: [null],
      EffectiveDate1: [null],
      IsSupervised1: [false],
      IsUnSupervised1: [false],
      IsOther1: [false],
      Arrangements1: [null],
      InteractionsNotOccurring1: [null],
      MoveUnsupervised1: [null],
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
      //  !isNullOrUndefined(formData.EffectiveDate) ? formData.EffectiveDate = new Date(formData.EffectiveDate) : null;
      //  !isNullOrUndefined(formData.EffectiveDate1) ? formData.EffectiveDate1 = new Date(formData.EffectiveDate1) : null;
      //  this.reParentChildInteract = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.parentChildInteractForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
