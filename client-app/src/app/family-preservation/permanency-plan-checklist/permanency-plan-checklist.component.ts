import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpPlanChecklist } from './fp-plan-checklist';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-permanency-plan-checklist',
  templateUrl: './permanency-plan-checklist.component.html',
  styleUrls: ['./permanency-plan-checklist.component.scss', '../family-preservation.scss'],
  outputs: ['perPlanCheckOut']
})
export class PermanencyPlanChecklistComponent implements OnInit {
  fpPermanencyPlanChecklist: FpPlanChecklist = new FpPlanChecklist();
  permanencyPlanChecklistForm: FormGroup;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  perPlanCheckOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();

    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
      this.permanencyPlanChecklistForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/case-plan-goals/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }

  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpPermanencyPlanChecklist = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.casePlanDate) ? formData.casePlanDate = new Date(formData.casePlanDate) : null;
    !isNullOrUndefined(formData.dateDcf) ? formData.dateDcf = new Date(formData.dateDcf) : null;
    !isNullOrUndefined(formData.dateDcfReturned) ? formData.dateDcfReturned = new Date(formData.dateDcfReturned) : null;
    !isNullOrUndefined(formData.dateOfApproval) ? formData.dateOfApproval = new Date(formData.dateOfApproval) : null;
    this.fpPermanencyPlanChecklist = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpPermanencyPlanChecklist.childName = data.person.firstName + ' ' + data.person.lastName;
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpPermanencyPlanChecklist.factsClientId = (data.referral.facts);
      });
      this._team.getUserName()
      .then((data) => {
        console.log('data in this._team.getUserName() is', data);
        this.printedBy = data.users.firstName + ' ' + data.users.lastName;

      });
  }

  saveForm(event, source) {
    console.log('source is', source, 'label is', event);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.casePlanDate) ? source.casePlanDate = Date.parse(source.casePlanDate) : null;
    !isNullOrUndefined(source.dateDcf) ? source.dateDcf = Date.parse(source.dateDcf) : null;
    !isNullOrUndefined(source.dateDcfReturned) ? source.dateDcfReturned = Date.parse(source.dateDcfReturned) : null;
    !isNullOrUndefined(source.dateOfApproval) ? source.dateOfApproval = Date.parse(source.dateOfApproval) : null;

    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.perPlanCheckOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.perPlanCheckOut.emit({ cmsData: {} });
  }
  editForm() {
    this.permanencyPlanChecklistForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.permanencyPlanChecklistForm = this._fb.group({
      childName: [null],
      factsClientId: [null],
      caseManagement: [null],
      caseManager: [null],
      dcfRegion: [null],
      dcfCps: [null],
      casePlanDate: [null],
      dateDcf: [null],
      dateDcfReturned: [null],

      isChildPermanencyYes: [false],
      isChildPermanencyNo: [false],
      // isChildPermanencyNa: [false],

      isChildProtectionYes: [false],
      isChildProtectionNo: [false],
      // isChildProtectionNa: [false],

      isSafetyConcernsYes: [false],
      isSafetyConcernsNo: [false],
      isSafetyConcernsNa: [false],

      isRiskConcernsYes: [false],
      isRiskConcernsNo: [false],
      isRiskConcernsNa: [false],

      isChildYouthYes: [false],
      isChildYouthNo: [false],
      isChildYouthNa: [false],

      isProgressTowardYes: [false],
      isProgressTowardNo: [false],
      // isProgressTowardNa: [false],

      isExplanationYes: [false],
      isExplanationNo: [false],
      isExplanationNa: [false],

      isServicesToAddressYes: [false],
      isServicesToAddressNo: [false],
      // isServicesToAddressNa: [false],

      isChildInOohYes: [false],
      isChildInOohNo: [false],
      isChildInOohNa: [false],

      isChildNotInOohYes: [false],
      isChildNotInOohNo: [false],
      isChildNotInOohNa: [false],

      isChildrenAge15Yes: [false],
      isChildrenAge15No: [false],
      isChildrenAge15Na: [false],

      isYouthAge16Yes: [false],
      isYouthAge16No: [false],
      isYouthAge16Na: [false],

      isYouthAge17Yes: [false],
      isYouthAge17No: [false],
      isYouthAge17Na: [false],

      isIncludesPrintedYes: [false],
      isIncludesPrintedNo: [false],
      // isIncludesPrintedNa: [false],



      comments: [null],
      dcfCpsSpecialist: [null],
      dateOfApproval: [null],
      printedBy: [null],
      printedDate: [null],

    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
