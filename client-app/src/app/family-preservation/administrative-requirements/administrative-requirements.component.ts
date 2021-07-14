import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpAdminRequirements } from './fp-admin-requirements';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-administrative-requirements',
  templateUrl: './administrative-requirements.component.html',
  styleUrls: ['./administrative-requirements.component.scss', '../family-preservation.scss'],
  outputs: ['adminReqOut']
})
export class AdministrativeRequirementsComponent implements OnInit {
  fpAdministrativeRequirements: FpAdminRequirements = new FpAdminRequirements();
  administrativeRequirementsForm: FormGroup;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  adminReqOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
      this.administrativeRequirementsForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/case-plan-goals/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }

  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpAdministrativeRequirements = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.conferenceDatesFro) ? formData.conferenceDatesFro = new Date(formData.conferenceDatesFro) : null;
    !isNullOrUndefined(formData.conferenceDatesTo) ? formData.conferenceDatesTo = new Date(formData.conferenceDatesTo) : null;
    !isNullOrUndefined(formData.effectiveDatesFrom) ? formData.effectiveDatesFrom = new Date(formData.effectiveDatesFrom) : null;
    !isNullOrUndefined(formData.effectiveDatesTo) ? formData.effectiveDatesTo = new Date(formData.effectiveDatesTo) : null;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.dateLastKbh) ? formData.dateLastKbh = new Date(formData.dateLastKbh) : null;
    !isNullOrUndefined(formData.dateDiagnosed) ? formData.dateDiagnosed = new Date(formData.dateDiagnosed) : null;
    this.fpAdministrativeRequirements = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpAdministrativeRequirements.childName = data.person.firstName + ' ' + data.person.lastName;
        this.fpAdministrativeRequirements.factsCase = data.person.kaecses;
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);

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
    !isNullOrUndefined(source.conferenceDatesFro) ? source.conferenceDatesFro = Date.parse(source.conferenceDatesFro) : null;
    !isNullOrUndefined(source.conferenceDatesTo) ? source.conferenceDatesTo = Date.parse(source.conferenceDatesTo) : null;
    !isNullOrUndefined(source.effectiveDatesFrom) ? source.effectiveDatesFrom = Date.parse(source.effectiveDatesFrom) : null;
    !isNullOrUndefined(source.effectiveDatesTo) ? source.effectiveDatesTo = Date.parse(source.effectiveDatesTo) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.dateLastKbh) ? source.dateLastKbh = Date.parse(source.dateLastKbh) : null;
    !isNullOrUndefined(source.dateDiagnosed) ? source.dateDiagnosed = Date.parse(source.dateDiagnosed) : null;

    console.log('date is', source.date);
    // console.log('source is', source, 'label is', event);
    this.adminReqOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.adminReqOut.emit({ cmsData: {} });
  }
  editForm() {
    this.administrativeRequirementsForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.administrativeRequirementsForm = this._fb.group({

      childName: [null],
      factsCase: [null],
      conferenceDatesFro: [null],
      conferenceDatesTo: [null],
      effectiveDatesFrom: [null],
      effectiveDatesTo: [null],
      stateReason: [null],
      listSiblings: [null],
      isCandidate: [false],
      isNonCandidate: [false],
      imminentRisk: [null],
      specialistSignature: [null],
      date: [null],
      isReferralYes: [false],
      isReferralNo: [false],
      documentedReason: [null],
      primaryHealth: [null],
      healthProviderAddress: [null],
      dentist: [null],
      dentistAddress: [null],
      optometrist: [null],
      optometristAddress: [null],
      mentalHealth: [null],
      otherHealthProvider: [null],
      otherHealthProviderAddress: [null],
      mentalHealthAddress: [null],
      educationalAdvocate: [null],
      educationalAdvocateAddress: [null],
      connectionForSuccess: [null],
      connectionAddress: [null],
      isCurrentYes: [false],
      isCurrentNo: [false],
      dateLastKbh: [null],
      isDiagnosisYes: [false],
      isDiagnosisNo: [false],
      dateDiagnosed: [null],
      types: [null],
      isHcbsYes: [false],
      isHcbsNo: [false],
      isHcbsNa: [false],

      isDd: [false],
      isSed: [false],
      isTbi: [false],
      isTa: [false],
      isAutism: [false],

      isDisabilityYes: [false],
      isDisabilityNo: [false],
      isDisabilityNa: [false],
      isWrittenHealthYes: [false],
      isWrittenHealthNo: [false],
      isWrittenHealthNa: [false],
      isReportRequestedYes: [false],
      isReportRequestedNo: [false],
      isReportRequestedNa: [false],
      isFatherIncarceratedYes: [false],
      isFatherIncarceratedNo: [false],
      isMotherIncarceratedYes: [false],
      isMotherIncarceratedNo: [false],
      isChildAdjudicatedYes: [false],
      isChildAdjudicatedNo: [false],
      childAdjudicatedDate: [false],
      highestGrade: [null],
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
