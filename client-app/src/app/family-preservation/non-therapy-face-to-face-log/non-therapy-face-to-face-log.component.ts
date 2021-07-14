import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { FpNonTherapyFtfForm } from './fp-non-therapy-ftf-form';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-non-therapy-face-to-face-log',
  templateUrl: './non-therapy-face-to-face-log.component.html',
  styleUrls: ['./non-therapy-face-to-face-log.component.scss', '../family-preservation.scss'],
  outputs: ['ntffFormOut']
})
export class NonTherapyFaceToFaceLogComponent implements OnInit {

  fpNonTherapyFTF: FpNonTherapyFtfForm = new FpNonTherapyFtfForm();
  nonTherapyForm: FormGroup;
  editControll = true;
  discardTo: string;
  // discardTo = '/reports/referral/family-preservation/non-therapy-face-to-face/view';
  isPrint = true;

  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  @Output()
  ntffFormOut = new EventEmitter();

  ngOnInit() {
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-activity/detail') {
      this.getCmsFormJson();
      this.nonTherapyForm.disable();

    } else if (this._router.url == '/reports/attachment-document/case-activity/new') {

    } else {
      this.discardTo = '/reports/referral/family-preservation/non-therapy-face-to-face/view';
    }
    if (this._router.url == '/reports/attachment-document/case-activity/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/family-preservation/case-activity/detail') { this.getDetails(); }
    this.autoFetchDetails();

  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpNonTherapyFTF.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.fpNonTherapyFTF.caseNumber = data.person.kaecses;
        this.fpNonTherapyFTF.caseDate = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    if (this._referral.getReferralData()) {
      this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpNonTherapyFTF.dateOfReferral = new Date(data.referral.referralDate);
      });
    }


      if (this._team.getUserName()) {
        this._team.getUserName()
          .then((data) => {
            this.printedBy = data.users.firstName + ' ' + data.users.lastName;
          });
      }

  }

  saveForm(source) {
    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    !isNullOrUndefined(source.caseDate) ? source.caseDate = Date.parse(source.caseDate) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.endTime) ? source.endTime = Date.parse(source.endTime) : null;
    !isNullOrUndefined(source.startTime) ? source.startTime = Date.parse(source.startTime) : null;
    !isNullOrUndefined(source.duration) ? source.duration = Date.parse(source.duration) : null;
    source.formName = 'ntffLog';
    this.ntffFormOut.emit({ cmsData: source });
    console.log('source in non therapy form is', source);
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.ntffFormOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.nonTherapyForm = this._fb.group({
      caseName: [null],
      caseNumber: [null],
      dateOfReferral: [null],
      caseDate: [null],
      endTime: [null],
      startTime: [null],
      duration: [null],
      location: [null],
      isCaseSupervised: [null],
      isFamilySupported: [null],
      presentFamilyMembers: [null],
      timeWithChild: [null],
      timeWithChildExceptions: [null],
      interactionsFamilyMembers: [null],
      planTaskRelateTo: [null],
      communityResourcesUpdate: [null],
      reviewPlanProgress: [null],
      additionalComments: [null],
      nextAppointment: [null],
      fpStaffName: [null],
      fpStaffSignature: [null],
      isCertified: [null],
      date: [null],
      isHomeFreeYes: [null],
      isHomeFreeNo: [null],
      isHomeFreeNa: [null],
      isHomeCleanYes: [null],
      isHomeCleanNo: [null],
      isHomeCleanNa: [null],
      isChildCleanYes: [null],
      isChildCleanNo: [null],
      isChildCleanNa: [null],
      isChildHealthyYes: [null],
      isChildHealthyNo: [null],
      isChildHealthyNa: [null],
      isHeightNormalYes: [null],
      isHeightNormalNo: [null],
      isHeightNormalNa: [null],
      isUnusualMarksYes: [null],
      isUnusualMarksNo: [null],
      isUnusualMarksNa: [null],
      printedBy: [null],
      printedDate: [null],

    });
  }

  getDetails() {
    setTimeout(() => {

      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      const req = { caseActivityID: parseInt(localStorage.getItem('caseActivityID')) - this._opencard.getHasKey() };
      this._opencard.getCaseActivityById(req).then((data) => {
        loader.style.display = 'none';
        if (data.pdfForms) {
          this.fpNonTherapyFTF = data.pdfForms.pdfForms;
          this.nonTherapyForm.disable();
          this.editControll = true;
        }
      });
    }, 5000);

  }

  editForm() {
    this.editControll = false;
    this.nonTherapyForm.enable();
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpNonTherapyFTF = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
    !isNullOrUndefined(formData.caseDate) ? formData.caseDate = new Date(formData.caseDate) : null;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.endTime) ? formData.endTime = new Date(formData.endTime) : null;
    !isNullOrUndefined(formData.startTime) ? formData.startTime = new Date(formData.startTime) : null;
    !isNullOrUndefined(formData.duration) ? formData.duration = new Date(formData.duration) : null;
    this.fpNonTherapyFTF = formData;
  }
}
