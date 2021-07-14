import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpAssessment } from './fp-assessment';
import html2pdf from 'html2pdf.js';
import swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Router } from '@angular/router';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-assessment-checklist',
  templateUrl: './assessment-checklist.component.html',
  styleUrls: ['./assessment-checklist.component.scss', '../family-preservation.scss'],
  outputs: ['assessCheckOut']
})
export class AssessmentChecklistComponent implements OnInit {

  fpAssessmentCheck: FpAssessment = new FpAssessment();
  assessmentCheckForm: FormGroup;
  editControll = true;
  isPrint = true;

  fileName = '';
  format = { name: '' };
  orientation = { name: '' };
  margin = 0;
  formatData = [];
  orientationData = [];
  marginData = [];
  orientationTypes = '';
  display = false;

  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  assessCheckOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/assessment/detail') {
      this.getCmsFormJson();
      this.assessmentCheckForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/assessment/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }

  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpAssessmentCheck = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.genogramDate) ? formData.genogramDate = new Date(formData.genogramDate) : null;
    !isNullOrUndefined(formData.ecoMapDate) ? formData.ecoMapDate = new Date(formData.ecoMapDate) : null;
    !isNullOrUndefined(formData.mentalHealthDate) ? formData.mentalHealthDate = new Date(formData.mentalHealthDate) : null;
    !isNullOrUndefined(formData.screeningToolDate) ? formData.screeningToolDate = new Date(formData.screeningToolDate) : null;
    !isNullOrUndefined(formData.uncopeDate) ? formData.uncopeDate = new Date(formData.uncopeDate) : null;
    // !isNullOrUndefined(formData.caseDate) ? formData.caseDate = new Date(formData.caseDate) : null;
    !isNullOrUndefined(formData.ncfasDate) ? formData.ncfasDate = new Date(formData.ncfasDate) : null;
    !isNullOrUndefined(formData.asqSeDate) ? formData.asqSeDate = new Date(formData.asqSeDate) : null;
    !isNullOrUndefined(formData.kinshipSupportsDate) ? formData.kinshipSupportsDate = new Date(formData.kinshipSupportsDate) : null;
    !isNullOrUndefined(formData.nonCustodiaDate) ? formData.nonCustodiaDate = new Date(formData.nonCustodiaDate) : null;
    // tslint:disable-next-line:max-line-length
    !isNullOrUndefined(formData.mentalHealthAssessmentDate) ? formData.mentalHealthAssessmentDate = new Date(formData.mentalHealthAssessmentDate) : null;
    this.fpAssessmentCheck = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpAssessmentCheck.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.fpAssessmentCheck.caseNumber = data.person.kaecses;
        this.fpAssessmentCheck.date = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpAssessmentCheck.dateOfReferral = new Date(data.referral.referralDate);
      });
      this._team.getUserName()
      .then((data) => {
        console.log('data in this._team.getUserName() is', data);
        this.printedBy = data.users.firstName + ' ' + data.users.lastName;

      });
  }

  saveForm( source) {
    console.log('source is', source);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';

    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.genogramDate) ? source.genogramDate = Date.parse(source.genogramDate) : null;
    !isNullOrUndefined(source.ecoMapDate) ? source.ecoMapDate = Date.parse(source.ecoMapDate) : null;
    !isNullOrUndefined(source.mentalHealthDate) ? source.mentalHealthDate = Date.parse(source.mentalHealthDate) : null;
    !isNullOrUndefined(source.screeningToolDate) ? source.screeningToolDate = Date.parse(source.screeningToolDate) : null;
    !isNullOrUndefined(source.uncopeDate) ? source.uncopeDate = Date.parse(source.uncopeDate) : null;
    // !isNullOrUndefined(source.caseDate) ? source.caseDate = Date.parse(source.caseDate) : null;
    !isNullOrUndefined(source.ncfasDate) ? source.ncfasDate = Date.parse(source.ncfasDate) : null;
    !isNullOrUndefined(source.asqSeDate) ? source.asqSeDate = Date.parse(source.asqSeDate) : null;
    !isNullOrUndefined(source.kinshipSupportsDate) ? source.kinshipSupportsDate = Date.parse(source.kinshipSupportsDate) : null;
    !isNullOrUndefined(source.nonCustodiaDate) ? source.nonCustodiaDate = Date.parse(source.nonCustodiaDate) : null;
    // tslint:disable-next-line:max-line-length
    !isNullOrUndefined(source.mentalHealthAssessmentDate) ? source.mentalHealthAssessmentDate = Date.parse(source.mentalHealthAssessmentDate) : null;
    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.assessCheckOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.assessCheckOut.emit({ cmsData: {} });
  }
  editForm() {
    this.assessmentCheckForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.assessmentCheckForm = this._fb.group({
      caseName: [null],
      caseNumber: [null],
      dateOfReferral: [null],
      date: [null],
      genogramDate: [null],
      ecoMapDate: [null],
      mentalHealthDate: [null],
      screeningToolDate: [null],
      uncopeDate: [null],
      ncfasDate: [null],
      asqSeDate: [null],
      kinshipSupportsDate: [null],
      nonCustodiaDate: [null],
      mentalHealthAssessmentDate: [null],
      printedBy: [null],
      printedDate: [null],

    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }


  reset() {
    this.display = false;
    this.fileName = '';
    this.format = { name: '' };
    this.orientation = { name: '' };
    this.margin = 0;
  }

  getMetaData() {
    this.formatData = [
      { name: 'a3' },
      { name: 'a4' }
    ];
    this.orientationData = [
      { name: 'portrait' },
      { name: 'landscape' }
    ];
    this.marginData = [
      { name: '0' },
      { name: '1' },
      { name: '2' },
      { name: '3' },
      { name: '4' },
      { name: '5' },
      { name: '6' },
      { name: '7' },
      { name: '8' },
      { name: '9' },
      { name: '10' }

    ];
  }

  printPreviewForm() {
    window.print();
  }

}
