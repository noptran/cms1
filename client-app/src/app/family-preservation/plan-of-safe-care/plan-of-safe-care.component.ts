import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpPlanOfSafe } from './fp-plan-of-safe';
import html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-plan-of-safe-care',
  templateUrl: './plan-of-safe-care.component.html',
  styleUrls: ['./plan-of-safe-care.component.scss', '../family-preservation.scss'],
  outputs: ['planOfSafeOut']
})
export class PlanOfSafeCareComponent implements OnInit {
  fpPlanOfSafeCare: FpPlanOfSafe = new FpPlanOfSafe();
  planOfSafeCareForm: FormGroup;
  editControll = true;
  isPrint = true;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _router: Router) { }

  @Output()
  planOfSafeOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/assessment/detail') {
      this.getCmsFormJson();
      this.planOfSafeCareForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/assessment/new') {
      this.editControll = false;
    }
  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpPlanOfSafeCare = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateCompleted) ? formData.dateCompleted = new Date(formData.dateCompleted) : null;
    !isNullOrUndefined(formData.referralDate) ? formData.referralDate = new Date(formData.referralDate) : null;
    !isNullOrUndefined(formData.referralDate1) ? formData.referralDate1 = new Date(formData.referralDate1) : null;
    !isNullOrUndefined(formData.referralDate2) ? formData.referralDate2 = new Date(formData.referralDate2) : null;
    !isNullOrUndefined(formData.referralDate3) ? formData.referralDate3 = new Date(formData.referralDate3) : null;
    !isNullOrUndefined(formData.referralDate4) ? formData.referralDate4 = new Date(formData.referralDate4) : null;
    !isNullOrUndefined(formData.referralDate5) ? formData.referralDate5 = new Date(formData.referralDate5) : null;

    !isNullOrUndefined(formData.referralDateCare) ? formData.referralDateCare = new Date(formData.referralDateCare) : null;
    !isNullOrUndefined(formData.referralDateCare1) ? formData.referralDateCare1 = new Date(formData.referralDateCare1) : null;
    !isNullOrUndefined(formData.referralDateCare2) ? formData.referralDateCare2 = new Date(formData.referralDateCare2) : null;
    !isNullOrUndefined(formData.referralDateCare3) ? formData.referralDateCare3 = new Date(formData.referralDateCare3) : null;
    !isNullOrUndefined(formData.referralDateCare4) ? formData.referralDateCare4 = new Date(formData.referralDateCare4) : null;
    !isNullOrUndefined(formData.referralDateCare5) ? formData.referralDateCare5 = new Date(formData.referralDateCare5) : null;

    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    !isNullOrUndefined(formData.date1) ? formData.date1 = new Date(formData.date1) : null;
    !isNullOrUndefined(formData.date2) ? formData.date2 = new Date(formData.date2) : null;
    !isNullOrUndefined(formData.date3) ? formData.date3 = new Date(formData.date3) : null;
    !isNullOrUndefined(formData.date4) ? formData.date4 = new Date(formData.date4) : null;
    !isNullOrUndefined(formData.date5) ? formData.date5 = new Date(formData.date5) : null;
    this.fpPlanOfSafeCare = formData;
  }
  saveForm(event, source) {
    console.log('source is', source, 'label is', event);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.dateCompleted) ? source.dateCompleted = Date.parse(source.dateCompleted) : null;
    !isNullOrUndefined(source.referralDate) ? source.referralDate = Date.parse(source.referralDate) : null;
    !isNullOrUndefined(source.referralDate1) ? source.referralDate1 = Date.parse(source.referralDate1) : null;
    !isNullOrUndefined(source.referralDate2) ? source.referralDate2 = Date.parse(source.referralDate2) : null;
    !isNullOrUndefined(source.referralDate3) ? source.referralDate3 = Date.parse(source.referralDate3) : null;
    !isNullOrUndefined(source.referralDate4) ? source.referralDate4 = Date.parse(source.referralDate4) : null;
    !isNullOrUndefined(source.referralDate5) ? source.referralDate5 = Date.parse(source.referralDate5) : null;

    !isNullOrUndefined(source.referralDateCare) ? source.referralDateCare = Date.parse(source.referralDateCare) : null;
    !isNullOrUndefined(source.referralDateCare1) ? source.referralDateCare1 = Date.parse(source.referralDateCare1) : null;
    !isNullOrUndefined(source.referralDateCare2) ? source.referralDateCare2 = Date.parse(source.referralDateCare2) : null;
    !isNullOrUndefined(source.referralDateCare3) ? source.referralDateCare3 = Date.parse(source.referralDateCare3) : null;
    !isNullOrUndefined(source.referralDateCare4) ? source.referralDateCare4 = Date.parse(source.referralDateCare4) : null;
    !isNullOrUndefined(source.referralDateCare5) ? source.referralDateCare5 = Date.parse(source.referralDateCare5) : null;

    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.date1) ? source.date1 = Date.parse(source.date1) : null;
    !isNullOrUndefined(source.date2) ? source.date2 = Date.parse(source.date2) : null;
    !isNullOrUndefined(source.date3) ? source.date3 = Date.parse(source.date3) : null;
    !isNullOrUndefined(source.date4) ? source.date4 = Date.parse(source.date4) : null;
    !isNullOrUndefined(source.date5) ? source.date5 = Date.parse(source.date5) : null;

    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.planOfSafeOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.planOfSafeOut.emit({ cmsData: {} });
  }
  editForm() {
    this.planOfSafeCareForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.planOfSafeCareForm = this._fb.group({
      caseName: [null],
      case: [null],
      event: [null],
      infantName: [null],
      dateCompleted: [null],
      specialist: [null],
      caseManager: [null],
      isPlanSafeProvided: [false],

      infantNeeds: [null],
      service: [null],
      isAcceptedServiceYes: [false],
      isAcceptedServiceNo: [false],
      referralDate: [null],

      infantNeeds1: [null],
      service1: [null],
      isAcceptedServiceYes1: [false],
      isAcceptedServiceNo1: [false],
      referralDate1: [null],

      infantNeeds2: [null],
      service2: [null],
      isAcceptedServiceYes2: [false],
      isAcceptedServiceNo2: [false],
      referralDate2: [null],

      infantNeeds3: [null],
      service3: [null],
      isAcceptedServiceYes3: [false],
      isAcceptedServiceNo3: [false],
      referralDate3: [null],

      infantNeeds4: [null],
      service4: [null],
      isAcceptedServiceYes4: [false],
      isAcceptedServiceNo4: [false],
      referralDate4: [null],

      infantNeeds5: [null],
      service5: [null],
      isAcceptedServiceYes5: [false],
      isAcceptedServiceNo5: [false],
      referralDate5: [null],

      familyMemberCare: [null],
      needIdentifiedCare: [null],
      serviceCare: [null],
      isFamilyAcceptedCareYes: [false],
      isFamilyAcceptedCareNo: [false],
      referralDateCare: [null],


      familyMemberCare1: [null],
      needIdentifiedCare1: [null],
      serviceCare1: [null],
      isFamilyAcceptedCareYes1: [false],
      isFamilyAcceptedCareNo1: [false],
      referralDateCare1: [null],

      familyMemberCare2: [null],
      needIdentifiedCare2: [null],
      serviceCare2: [null],
      isFamilyAcceptedCareYes2: [false],
      isFamilyAcceptedCareNo2: [false],
      referralDateCare2: [null],

      familyMemberCare3: [null],
      needIdentifiedCare3: [null],
      serviceCare3: [null],
      isFamilyAcceptedCareYes3: [false],
      isFamilyAcceptedCareNo3: [false],
      referralDateCare3: [null],

      familyMemberCare4: [null],
      needIdentifiedCare4: [null],
      serviceCare4: [null],
      isFamilyAcceptedCareYes4: [false],
      isFamilyAcceptedCareNo4: [false],
      referralDateCare4: [null],

      familyMemberCare5: [null],
      needIdentifiedCare5: [null],
      serviceCare5: [null],
      isFamilyAcceptedCareYes5: [false],
      isFamilyAcceptedCareNo5: [false],
      referralDateCare5: [null],


      familyStrengths: [null],
      monitoringProviders: [null],

      participant: [null],
      role: [null],
      date: [null],

      participant1: [null],
      role1: [null],
      date1: [null],

      participant2: [null],
      role2: [null],
      date2: [null],

      participant3: [null],
      role3: [null],
      date3: [null],

      participant4: [null],
      role4: [null],
      date4: [null],

      participant5: [null],
      role5: [null],
      date5: [null],

    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
}
