import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpSupervisoryStaff } from './fp-supervisory-staff';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import swal from 'sweetalert2';
import {PrintPdf} from '../../print-pdf';
import * as moment from 'moment';

@Component({
  selector: 'app-supervisory-staffing',
  templateUrl: './supervisory-staffing.component.html',
  styleUrls: ['./supervisory-staffing.component.scss', '../family-preservation.scss'],
  outputs: ['supervisoryStaffOut']
})
export class SupervisoryStaffingComponent implements OnInit {
  fpSupervisoryStaffing: FpSupervisoryStaff = new FpSupervisoryStaff();
  supervisoryStaffingForm: FormGroup;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  url: any;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: '',
  };
  isFormLog = false;
  isAttachmentRequired = false;
  isSupervisoryDetailPage = false;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }
  @Output()
  supervisoryStaffOut = new EventEmitter();

  ngOnInit() {
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-activity/detail') {
      this.getCmsFormJson();
      this.supervisoryStaffingForm.disable();
    }

    if (this._router.url == '/reports/attachment-document/case-activity/new') {
      this.editControll = false;
    }

    if (this._router.url == '/reports/referral/family-preservation/case-activity/detail') { this.getDetails(); }
    this.autoFetchDetails();

    if (this._router.url == '/reports/supervisory-staffing-form/new') {
      this.editControll = false;
    }

    if (this._router.url == '/reports/supervisory-staffing-form/detail') {
      this.getJsonDetails();
      this.isAttachmentRequired = true;
      this.isSupervisoryDetailPage = true;
    }


  }
  async getJsonDetails() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const scannedDocId = localStorage.getItem('ScannedDocumentID');
    const data = { 'scannedDocumentId': scannedDocId };
    await this._opencard.getCisFormJson(data)
      .then(async (data) => {
        const response = await JSON.parse(data.cmsCisPdfDoc[data.cmsCisPdfDoc.length - 1].pdfJsonData);
        const formData = (response.cmsFormJson);
        !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
        !isNullOrUndefined(formData.caseDate) ? formData.caseDate = new Date(formData.caseDate) : null;
        !isNullOrUndefined(formData.casePlanBeginDate) ? formData.casePlanBeginDate = new Date(formData.casePlanBeginDate) : null;
        !isNullOrUndefined(formData.casePlanEndDate) ? formData.casePlanEndDate = new Date(formData.casePlanEndDate) : null;
        !isNullOrUndefined(formData.safetyPlanBeginDate) ? formData.safetyPlanBeginDate = new Date(formData.safetyPlanBeginDate) : null;
        !isNullOrUndefined(formData.safetyPlanTargetDate) ? formData.safetyPlanTargetDate = new Date(formData.safetyPlanTargetDate) : null;
        !isNullOrUndefined(formData.caseActivityStaffingDate) ? formData.caseActivityStaffingDate = new Date(formData.caseActivityStaffingDate) : null;
        !isNullOrUndefined(formData.dateEndSign) ? formData.dateEndSign = new Date(formData.dateEndSign) : null;
        !isNullOrUndefined(formData.caseActivityStaffingTime) ? formData.caseActivityStaffingTime = new Date(formData.caseActivityStaffingTime) : null;

        this.fpSupervisoryStaffing = formData;
        this.supervisoryStaffingForm.disable();
        this.editControll = true;
        this.isFormLog = true;
        this.formLogInfo.changedBy = !isNullOrUndefined(formData.changedBy) ? formData.changedBy : '------';
        this.formLogInfo.changedDate = !isNullOrUndefined(formData.changedDate) ? moment(formData.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
        this.formLogInfo.enteredBy = !isNullOrUndefined(formData.enteredBy) ? formData.enteredBy : '------';
        this.formLogInfo.enteredDate = !isNullOrUndefined(formData.enteredDate) ? moment(formData.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

        loader.style.display = 'none';

      });
  }


  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpSupervisoryStaffing = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
    !isNullOrUndefined(formData.caseDate) ? formData.caseDate = new Date(formData.caseDate) : null;
    !isNullOrUndefined(formData.casePlanBeginDate) ? formData.casePlanBeginDate = new Date(formData.casePlanBeginDate) : null;
    !isNullOrUndefined(formData.casePlanEndDate) ? formData.casePlanEndDate = new Date(formData.casePlanEndDate) : null;
    !isNullOrUndefined(formData.safetyPlanBeginDate) ? formData.safetyPlanBeginDate = new Date(formData.safetyPlanBeginDate) : null;
    !isNullOrUndefined(formData.safetyPlanTargetDate) ? formData.safetyPlanTargetDate = new Date(formData.safetyPlanTargetDate) : null;
    !isNullOrUndefined(formData.caseActivityStaffingDate) ? formData.caseActivityStaffingDate = new Date(formData.caseActivityStaffingDate) : null;
    !isNullOrUndefined(formData.dateEndSign) ? formData.dateEndSign = new Date(formData.dateEndSign) : null;
    !isNullOrUndefined(formData.caseActivityStaffingTime) ? formData.caseActivityStaffingTime = new Date(formData.caseActivityStaffingTime) : null;
    this.fpSupervisoryStaffing = formData;
  }

  autoFetchDetails() {

    if (parseInt(localStorage.getItem('clientId'))) {
      if (this._client.getPersonData()) {
        this._client.getPersonData()
          .then((data: any) => {
            this.fpSupervisoryStaffing.caseName = data.person.firstName + ' ' + data.person.lastName;
            this.fpSupervisoryStaffing.caseNumber = data.person.kaecses;
            this.fpSupervisoryStaffing.caseDate = new Date();
            this.printedDate = new Date();
          });
      }
    }

    if (localStorage.getItem('referralId')) {
      if (this._referral.getReferralData()) {
        this._referral.getReferralData()
          .then((data) => {
            this.fpSupervisoryStaffing.dateOfReferral = new Date(data.referral.referralDate);
            const fisMembers = this.fisMemberGeneration(data.fis);
            this.fpSupervisoryStaffing.listOfFis = '';
            if (fisMembers.length !== 0) {
              fisMembers.map(data => {
                this.fpSupervisoryStaffing.listOfFis = this.fpSupervisoryStaffing.listOfFis + '- ' + data;
              });
            }

            this.fpSupervisoryStaffing.reasonForReferral = data.referral.referralReasonID.referralReason;
          });
      }

    }
    if (localStorage.getItem('UserId')) {
      this._team.getUserName()
        .then((data) => {
          this.printedBy = data.users.firstName + ' ' + data.users.lastName;
        });
    }

  }

  fisMemberGeneration(fisArr) {
    return fisArr.map(data => {
      return data.clientName;
    });
  }

  saveForm(source) {
    console.log('source in SUPERVISORY STAFF IS', source);
    console.log('this._router.url is', this._router.url);

    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    !isNullOrUndefined(source.caseDate) ? source.caseDate = Date.parse(source.caseDate) : null;
    !isNullOrUndefined(source.casePlanBeginDate) ? source.casePlanBeginDate = Date.parse(source.casePlanBeginDate) : null;
    !isNullOrUndefined(source.casePlanEndDate) ? source.casePlanEndDate = Date.parse(source.casePlanEndDate) : null;
    !isNullOrUndefined(source.safetyPlanBeginDate) ? source.safetyPlanBeginDate = Date.parse(source.safetyPlanBeginDate) : null;
    !isNullOrUndefined(source.safetyPlanTargetDate) ? source.safetyPlanTargetDate = Date.parse(source.safetyPlanTargetDate) : null;
    !isNullOrUndefined(source.caseActivityStaffingDate) ? source.caseActivityStaffingDate = Date.parse(source.caseActivityStaffingDate) : null;
    !isNullOrUndefined(source.dateEndSign) ? source.dateEndSign = Date.parse(source.dateEndSign) : null;
    source.typeOfDoc = 'supervisoryStaff';
    this.supervisoryStaffOut.emit({ cmsData: source });

    // /reports/referral/family-preservation/case-activity/new
    if (this._router.url === '/reports/supervisory-staffing-form/new') {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      const element = document.getElementById('form-content');
      const opt = {
        margin: 1,
        filename: 'supervisoryStaff.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' }
      };

      const pdf = html2pdf().from(element).set(opt).output('blob');
      pdf.then((data: any) => {
        const req = {
          'clientID': parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey(),
          'staffID': localStorage.getItem('UserId') || 4621,
          'formName': 'Supervisory Staffing',
          'staffName': 'Admin',
          'caseActivityID': this._opencard.getLackOfContCaseActId(),
          'sfcsNotes': '',
          'description': '',
          'cmsFormJson': source,
          'documentType': 'Supervisory Staffing (PPS5004)'

        };
        const mailFormData: FormData = new FormData();
        mailFormData.append('uploadfile', data);
        mailFormData.append('pdfFormJson', JSON.stringify(req));

        this._opencard.saveAttachment(mailFormData).then(async (data) => {
          loader.style.display = 'none';
          swal('Success', 'Supervisory Staffing has been saved!', 'success');
          this._router.navigate(['/reports/supervisory-staffing-form/view']);

        });
      });
    }
    if (this._router.url == '/reports/supervisory-staffing-form/detail') {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      const req = {
        'scannedDocumentID': localStorage.getItem('ScannedDocumentID'),
        'caseActivityID': parseInt(localStorage.getItem('caseActivityID')) - this._opencard.getHasKey(),
        'isFinalized': false,
        'pdfJsonData': { cmsFormJson: source },
        'staffID': parseInt(localStorage.getItem('UserId')) || 4621
      };
      this._opencard.updateCisForm(req).then(async (data) => {
        loader.style.display = 'none';
        swal('Success', 'Supervisory Staffing has been updated!', 'success');
        this._router.navigate(['/reports/supervisory-staffing-form/view']);

      });
    }

  }
  discardForm() {
    let currentURL = this._router.url, navigateTo: any;
    if (currentURL == '/reports/referral/family-preservation/case-activity/new') {
      navigateTo = '/reports/referral/family-preservation/case-activity/view';
    } else {
      navigateTo = '/reports/supervisory-staffing-form/view';
    }
    return this._router.navigate([navigateTo]);
  }
  formValidation() {
    this.supervisoryStaffingForm = this._fb.group({
      caseName: [null],
      caseNumber: [null],
      dateOfReferral: [null],
      caseDate: [null],

      listOfFis: [null],
      extendedFamily: [null],
      casePlanBeginDate: [null],
      casePlanEndDate: [null],
      safetyPlanBeginDate: [null],
      safetyPlanTargetDate: [null],
      caseActivityStaffingDate: [null],
      caseActivityStaffingTime: [null],
      reasonForReferral: [null],
      previousSupervisoryStaffingDate: [null],

      director: [null],
      supervisor: [null],
      caseManager: [null],
      fpCaseManager: [null],
      familySupportWorker: [null],
      other: [null],

      isMonthlySupervisory: [false],
      isNewSafetyConcern: [false],
      isIntensiveNonIntensive: [false],
      isCaseClosure: [false],
      isOtherSpecify: [false],
      isNewIntake: [false],

      familyStrengths: [null],
      nonCustodialParent: [null],
      narrative: [null],


      isSafetyConcernsYes: [false],
      isSafetyConcernsNo: [false],

      isNewSafetyConcernsYes: [false],
      isNewSafetyConcernsNo: [false],
      isNewSafetyConcernsNa: [false],

      isRiskConcernsYes: [false],
      isRiskConcernsNo: [false],


      isAddressRiskYes: [false],
      isAddressRiskNo: [false],
      isAddressRiskNa: [false],

      additionalRiskConcerns: [null],

      nextSteps: [null],

      fpSupervisor: [null],
      dateEndSign: [null],
      printedBy: [null],
      printedDate: [null],
      safetyConcerns: [null]
    });
  }

  getDetails() {
    setTimeout(() => {
      let formData: any;
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      const req = { caseActivityID: parseInt(localStorage.getItem('caseActivityID')) - this._opencard.getHasKey() };
      this._opencard.getCaseActivityById(req).then((data) => {
        loader.style.display = 'none';
        formData = data.pdfForms.pdfForms;
        if (formData.isActive) {
          !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
          !isNullOrUndefined(formData.caseDate) ? formData.caseDate = new Date(formData.caseDate) : null;
          !isNullOrUndefined(formData.casePlanBeginDate) ? formData.casePlanBeginDate = new Date(formData.casePlanBeginDate) : null;
          !isNullOrUndefined(formData.casePlanEndDate) ? formData.casePlanEndDate = new Date(formData.casePlanEndDate) : null;
          !isNullOrUndefined(formData.safetyPlanBeginDate) ? formData.safetyPlanBeginDate = new Date(formData.safetyPlanBeginDate) : null;
          !isNullOrUndefined(formData.safetyPlanTargetDate) ? formData.safetyPlanTargetDate = new Date(formData.safetyPlanTargetDate) : null;
          !isNullOrUndefined(formData.caseActivityStaffingDate) ? formData.caseActivityStaffingDate = new Date(formData.caseActivityStaffingDate) : null;
          !isNullOrUndefined(formData.dateEndSign) ? formData.dateEndSign = new Date(formData.dateEndSign) : null;
        } else {
          !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = moment.utc(formData.dateOfReferral).format('MM/DD/YYYY') : null;
          !isNullOrUndefined(formData.caseDate) ? formData.caseDate = moment.utc(formData.caseDate).format('MM/DD/YYYY') : null;
          !isNullOrUndefined(formData.casePlanBeginDate) ? formData.casePlanBeginDate = moment.utc(formData.casePlanBeginDate).format('MM/DD/YYYY') : null;
          !isNullOrUndefined(formData.casePlanEndDate) ? formData.casePlanEndDate = moment.utc(formData.casePlanEndDate).format('MM/DD/YYYY') : null;
          !isNullOrUndefined(formData.safetyPlanBeginDate) ? formData.safetyPlanBeginDate = moment.utc(formData.safetyPlanBeginDate).format('MM/DD/YYYY') : null;
          !isNullOrUndefined(formData.safetyPlanTargetDate) ? formData.safetyPlanTargetDate = moment.utc(formData.safetyPlanTargetDate).format('MM/DD/YYYY') : null;
          !isNullOrUndefined(formData.caseActivityStaffingDate) ? formData.caseActivityStaffingDate = moment.utc(formData.caseActivityStaffingDate).format('MM/DD/YYYY') : null;
          !isNullOrUndefined(formData.dateEndSign) ? formData.dateEndSign = moment.utc(formData.dateEndSign).format('MM/DD/YYYY') : null;
        }
        this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(formData.changedBy) ? formData.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(formData.changedDate) ? moment(formData.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(formData.enteredBy) ? formData.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(formData.enteredDate) ? moment(formData.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


        this.fpSupervisoryStaffing = formData;
        this.supervisoryStaffingForm.disable();
        this.editControll = true;
      });
    }, 5000);

  }

  printForm() {
    this._printPdf.fileName = 'supervisoryStaffingForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

  editForm() {
    this.supervisoryStaffingForm.enable();
    this.editControll = false;
  }

  uploadFile(event) {

  }

  navigateTo() {
    const currentURL = this._router.url;
    if (currentURL == '/reports/supervisory-staffing-form/detail') {
      this.url = '/reports/attachment-document/supervisor-staffing';
    }
    return this._router.navigate([this.url]);
  }

}
