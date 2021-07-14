import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { FpFinancialAsst } from './fp-financial-asst';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-financial-assistance-request',
  templateUrl: './financial-assistance-request.component.html',
  styleUrls: ['./financial-assistance-request.component.scss', '../family-preservation.scss'],
  outputs: ['finReqOut']
})
export class FinancialAssistanceRequestComponent implements OnInit {
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  fpFinancialAssistanceReq: FpFinancialAsst = new FpFinancialAsst();
  financialAssistanceForm: FormGroup;
  editControll = false;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  finReqOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/service-hardgoods/detail') {
      this.getCmsFormJson();
      this.financialAssistanceForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/service-hardgoods/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpFinancialAssistanceReq = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
    !isNullOrUndefined(formData.caseDate) ? formData.caseDate = new Date(formData.caseDate) : null;
    !isNullOrUndefined(formData.dateEndSign) ? formData.dateEndSign = new Date(formData.dateEndSign) : null;
    !isNullOrUndefined(formData.dateVerbalApproval) ? formData.dateVerbalApproval = new Date(formData.dateVerbalApproval) : null;
    this.fpFinancialAssistanceReq = formData;
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpFinancialAssistanceReq.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.fpFinancialAssistanceReq.caseNumber = data.person.kaecses;
        this.fpFinancialAssistanceReq.caseDate = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpFinancialAssistanceReq.dateOfReferral = new Date(data.referral.referralDate);
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
    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    !isNullOrUndefined(source.caseDate) ? source.caseDate = Date.parse(source.caseDate) : null;
    !isNullOrUndefined(source.dateEndSign) ? source.dateEndSign = Date.parse(source.dateEndSign) : null;
    !isNullOrUndefined(source.dateVerbalApproval) ? source.dateVerbalApproval = Date.parse(source.dateVerbalApproval) : null;
    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.finReqOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.finReqOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.financialAssistanceForm = this._fb.group({
      caseName: [null],
      caseNumber: [null],
      dateOfReferral: [null],
      caseDate: [null],
      priorAmount: [null],
      communityResources: [null],
      amountRequested: [null],
      reasonNeeded: [null],
      dateEndSign: [null],
      signatureOfStaff: [null],
      isApproved : [false],
      isNotApproved : [false],
      dateVerbalApproval: [null],
      verbalApproval: [null],
      printedBy: [null],
      printedDate: [null],

    });
  }

  editForm() {
    this.financialAssistanceForm.enable();
    this.editControll = false;
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
