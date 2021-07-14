import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReintAppendixIcpc } from './reint-appendix-icpc';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-appendix-9h-icpc-checklist',
  templateUrl: './appendix-9h-icpc-checklist.component.html',
  styleUrls: ['./appendix-9h-icpc-checklist.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['icpcOut']
})
export class Appendix9hIcpcChecklistComponent implements OnInit {
  reintAppendixIcpcForm: FormGroup;
  reintAppendixIcpc: ReintAppendixIcpc = new ReintAppendixIcpc();
  isEdit = false;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;

  @Output()
  icpcOut = new EventEmitter();

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/case-activity/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/appendix/9h/icpc/checklist/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.reintAppendixIcpcForm.disable();
  }

  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reintAppendixIcpc = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

    this.reintAppendixIcpc = formData;
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
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
    this.reintAppendixIcpcForm.enable();
    this.editControll = false;
  }
  saveForm(source) {
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';

    this.icpcOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/rfc/case-activity"]);
  }
  discardForm() {
    this.icpcOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.reintAppendixIcpcForm = this._fb.group({

      isForm: [false],
      isCoverLetter: [false],
      isCaseManagerStatement: [false],
      isChildSocialHistory: [false],
      isJournalEntry: [false],
      isCurrentCasePlan: [false],
      isMedicalPlan: [false],
      isSchoolReports: [false],
      isBirthCertificate: [false],
      isSocialSecurityCard: [false],
      isBasicDocumentationListed: [false],
      isFamilyHomeStudy: [false],
      isForm1: [false],
      isCourtOrder: [false],
      isIcpcForm: [false],
      isCourtOrderTerminating: [false],
      isGeneticInformation: [false],
      isIcwaStatement: [false],
      isSpecificToProceeding: [false],
      LiaisonSignature: [null],
      Date: [null],
      isBasicListAbove: [false],
      isBasicListAbove1: [false],
      isBasicListAbove2: [false],
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
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

      //  this.reintAppendixIcpc = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.reintAppendixIcpcForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
