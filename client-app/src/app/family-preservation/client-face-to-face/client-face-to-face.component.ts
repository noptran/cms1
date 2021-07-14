import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { FpClientFtf } from './fp-client-ftf';
import html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-client-face-to-face',
  templateUrl: './client-face-to-face.component.html',
  styleUrls: ['./client-face-to-face.component.scss', '../family-preservation.scss'],
  outputs: ['formOut']
})
export class ClientFaceToFaceComponent implements OnInit {
  fpClientFTF: FpClientFtf = new FpClientFtf();
  clientFTFForm: FormGroup;
  editControll = true;
  isPrint = true;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _router: Router) { }

  @Output()
  formOut = new EventEmitter();

  ngOnInit() {
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-activity/detail') {
      this.getCmsFormJson();
      this.clientFTFForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/case-activity/new') {
      this.editControll = false;
    }
  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpClientFTF = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.date1) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.date2) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.date3) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.date4) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.date5) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.date6) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.date7) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.dateSubmitted) ? formData.dateSubmitted = new Date(formData.dateSubmitted) : null;
    !isNullOrUndefined(formData.keyedInDate) ? formData.keyedInDate = new Date(formData.keyedInDate) : null;
    this.fpClientFTF = formData;
  }
  editForm() {
    this.clientFTFForm.enable();
    this.editControll = false;
  }

  saveForm( source) {
    console.log('source is', source);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.date1) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.date2) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.date3) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.date4) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.date5) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.date6) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.date7) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.dateSubmitted) ? source.dateSubmitted = Date.parse(source.dateSubmitted) : null;
    !isNullOrUndefined(source.keyedInDate) ? source.keyedInDate = Date.parse(source.keyedInDate) : null;
    console.log('date is', source.date);

    this.formOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.formOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.clientFTFForm = this._fb.group({
      casehead: [null],
      facts: [null],
      familyMembersPresent: [null],
      date: [null],
      startTime: [null],
      stopTime: [null],
      proCode: [null],
      branchMileage: [null],

      casehead1: [null],
      facts1: [null],
      familyMembersPresent1: [null],
      date1: [null],
      startTime1: [null],
      stopTime1: [null],
      proCode1: [null],
      branchMileage1: [null],

      casehead2: [null],
      facts2: [null],
      familyMembersPresent2: [null],
      date2: [null],
      startTime2: [null],
      stopTime2: [null],
      proCode2: [null],
      branchMileage2: [null],

      casehead3: [null],
      facts3: [null],
      familyMembersPresent3: [null],
      date3: [null],
      startTime3: [null],
      stopTime3: [null],
      proCode3: [null],
      branchMileage3: [null],

      casehead4: [null],
      facts4: [null],
      familyMembersPresent4: [null],
      date4: [null],
      startTime4: [null],
      stopTime4: [null],
      proCode4: [null],
      branchMileage4: [null],

      casehead5: [null],
      facts5: [null],
      familyMembersPresent5: [null],
      date5: [null],
      startTime5: [null],
      stopTime5: [null],
      proCode5: [null],
      branchMileage5: [null],

      casehead6: [null],
      facts6: [null],
      familyMembersPresent6: [null],
      date6: [null],
      startTime6: [null],
      stopTime6: [null],
      proCode6: [null],
      branchMileage6: [null],

      casehead7: [null],
      facts7: [null],
      familyMembersPresent7: [null],
      date7: [null],
      startTime7: [null],
      stopTime7: [null],
      proCode7: [null],
      branchMileage7: [null],

      printedWorkerName: [null],
      dateSubmitted: [null],
      keyedInDate: [null],
      initial: [null]

    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.jsPdfOrientation = 'landscape';
    this._printPdf.printForm();
  }


}
