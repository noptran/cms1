import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { FpLackOfContact } from './fp-lack-of-contact';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import html2pdf from 'html2pdf.js';
import swal from 'sweetalert2';
import { TeamFormService } from '../../team-form/team-form.service';
import * as moment from 'moment';
import {PrintPdf} from '../../print-pdf';

@Component({
  selector: 'app-lack-of-contact-notification',
  templateUrl: './lack-of-contact-notification.component.html',
  styleUrls: ['./lack-of-contact-notification.component.scss', '../family-preservation.scss'],
  outputs: ['locFromOut']

})
export class LackOfContactNotificationComponent implements OnInit {
  fpLackOfContact: FpLackOfContact = new FpLackOfContact();
  lackOfContactForm: FormGroup;

  editControll = true;
  isPrint = true;
  jsonData: any;
  isEmail = true;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: '',
  };
  isFormLog = false;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }


  @Output()
  locFromOut = new EventEmitter();


  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-activity/detail') {
      this.getCmsFormJson();
      this.lackOfContactForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/case-activity/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/family-preservation/case-activity/detail') { this.getDetails(); }

    if (this._router.url == '/reports/lack-of-contact/new') {
      this.editControll = false;
    }

    if (this._router.url == '/reports/lack-of-contact/detail') {
      this.getJsonDetails();
    }



  }

  async getJsonDetails() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const scannedDocId = localStorage.getItem('ScannedDocumentID');
    const data = { 'scannedDocumentId': scannedDocId };
    await this._opencard.getCisFormJson(data)
      .then(async (data) => {
        if (data.cmsCisPdfDoc) {
          const response = await JSON.parse(data.cmsCisPdfDoc[data.cmsCisPdfDoc.length - 1].pdfJsonData);
          const formData = (response.cmsFormJson);
          !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = moment.utc(formData.dateOfReferral) : null;
          !isNullOrUndefined(formData.dateFamily) ? formData.dateFamily = moment.utc(formData.dateFamily) : null;
          !isNullOrUndefined(formData.date) ? formData.date = moment.utc(formData.date) : null;
          this.fpLackOfContact = formData;
          this.lackOfContactForm.disable();
          this.editControll = true;
        }
        loader.style.display = 'none';
      });
  }

  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpLackOfContact = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = moment.utc(formData.dateOfReferral) : null;
    !isNullOrUndefined(formData.dateFamily) ? formData.dateFamily = moment.utc(formData.dateFamily) : null;
    !isNullOrUndefined(formData.date) ? formData.date = moment.utc(formData.date) : null;
    this.fpLackOfContact = formData;
  }

  saveForm(source) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    !isNullOrUndefined(source.dateFamily) ? source.dateFamily = Date.parse(source.dateFamily) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    source.typeOfDoc = 'loc';
    ////////////////////////////////////////////////////////////////////////
    this.locFromOut.emit({ cmsData: source });

    if (this._router.url === '/reports/referral/family-preservation/case-activity/new') {
      const element = document.getElementById('form-content');
      const opt = {
        margin: 1,
        filename: 'lackOfContact.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' }
      };

      const pdf = html2pdf().from(element).set(opt).output('blob');
      pdf.then((data: any) => {
        const req = {
          'clientID': parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey(),
          'staffID': localStorage.getItem('UserId') || 4621,
          'formName': 'Lack of Contact',
          'staffName': 'Admin',
          'caseActivityID': this._opencard.getLackOfContCaseActId(),
          'sfcsNotes': '',
          'description': '',
          'cmsFormJson': source,
          'documentType': 'Worker/Child',


          // "clientID": parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey(),
          // "referralID": parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey(),
          // "staffID": 4621,
          // "formName": " FCH Acknowledgement Form",
          // "staffName": "Krishnakumar S",
          // "printAck": true,
          // "subject": "asd",
          // "dcfWorkerMail": "alershnan@squashapps.com",
          // "region": "West",
          // "otherMail": ["alershnan@squashapps.com", "alershnan@squashapps.com"],
          // "staffSubject": "asdf",
          // "documentType": "Worker/Child",
          // "cmsFormJson": source,
          // "caseActivityID": this._opencard.getLackOfContCaseActId(),
        };

        const mailFormData: FormData = new FormData();
        mailFormData.append('uploadfile', data);
        mailFormData.append('pdfFormJson', JSON.stringify(req));

        this._opencard.saveAttachment(mailFormData).then(async (data) => {
          // loader.style.display = 'none';
          swal('Success', 'Lack of Contact has been saved!', 'success');
          this._router.navigate(['/reports/lack-of-contact/view']);

        });
      });
    }
    if (this._router.url == '/reports/lack-of-contact/detail') {
      const req = {
        'scannedDocumentID': localStorage.getItem('ScannedDocumentID'),
        'caseActivityID': parseInt(localStorage.getItem('caseActivityID')) - this._opencard.getHasKey(),
        'isFinalized': false,
        // "cmsCisPdfDocID": this.formCisArrayValue[this.currentVersion].cmsCisPdfDocID,
        'pdfJsonData': { cmsFormJson: source },
        // "version": this.currentVersion + 1,
        'staffID': parseInt(localStorage.getItem('UserId')) || 4621
      };
      this._opencard.updateCisForm(req).then(async (data) => {
        // loader.style.display = 'none';
        swal('Success', 'Lack of Contact has been updated!', 'success');
        this._router.navigate(['/reports/lack-of-contact/view']);

      });
    }


  }
  discardForm() {
    this.locFromOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.lackOfContactForm = this._fb.group({
      socialWorker: [null],
      staffName: [null],
      date: [null],
      caseHead: [null],
      factsNo: [null],
      dateOfReferral: [null],
      isIntensivePhase: [false],
      isNonIntensivePhase: [false],
      dateFamily: [null],
      summaryOfAttempts: [null],
      isSafetyConcernsYes: [false],
      isSafetyConcernsNo: [false],
      describe: [null],
      signatureProviderStaff: [null],
      signatureProviderSupervisor: [null],

    });
  }


  editForm() {
    this.lackOfContactForm.enable();
    this.editControll = false;
  }
  getDetails() {
    setTimeout(() => {
      let formData: any;
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      const req = { caseActivityID: parseInt(localStorage.getItem('caseActivityID')) - this._opencard.getHasKey() };
      this._opencard.getCaseActivityById(req).then((data) => {
        loader.style.display = 'none';
        if (data.pdfForms) {
          formData = data.pdfForms.pdfForms;
          if (formData.isActive) {
            !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = moment(formData.dateOfReferral).format('MM/DD/YYYY') : null;
            !isNullOrUndefined(formData.dateFamily) ? formData.dateFamily = moment(formData.dateFamily).format('MM/DD/YYYY') : null;
            !isNullOrUndefined(formData.date) ? formData.date = moment(formData.date).format('MM/DD/YYYY') : null;
          } else {
            !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = moment.utc(formData.dateOfReferral).format('MM/DD/YYYY') : null;
            !isNullOrUndefined(formData.dateFamily) ? formData.dateFamily = moment.utc(formData.dateFamily).format('MM/DD/YYYY') : null;
            !isNullOrUndefined(formData.date) ? formData.date = moment.utc(formData.date).format('MM/DD/YYYY') : null;
          }
          this.fpLackOfContact = formData;
          this.lackOfContactForm.disable();
          this.editControll = true;
          this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(formData.changedBy) ? formData.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(formData.changedDate) ? moment(formData.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(formData.enteredBy) ? formData.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(formData.enteredDate) ? moment(formData.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

        }
      });
    }, 5000);

  }

  printForm() {
    this._printPdf.fileName = 'lackOfContact';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
}
