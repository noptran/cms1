import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReInformalCare } from './re-informal-care';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-informal-care-referral',
  templateUrl: './informal-care-referral.component.html',
  styleUrls: ['./informal-care-referral.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['inforCareOut']
})
export class InformalCareReferralComponent implements OnInit {
  informalCareReferralForm: FormGroup;
  reInformalCareReferral: ReInformalCare = new ReInformalCare();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;

  @Output()
  inforCareOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/initial/placement/screening/tool/detail') { this.getDetails(); }
    this.printedBy = localStorage.getItem('UserId') || "Administrator";
    this.printedDate = new Date();
    this.reInformalCareReferral.Date = new Date();
    this.informalCareReferralForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reInformalCareReferral = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    this.reInformalCareReferral = formData;
    console.log("this.reInformalCareReferral is", this.reInformalCareReferral)
  }

  editForm() {
    this.informalCareReferralForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.inforCareOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.inforCareOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.informalCareReferralForm = this._fb.group({

      Date: [null],
      NameDob: [null],
      Address: [null],
      HomePhone: [null],
      WorkPhone: [null],
      Email: [null],
      AgesSex: [null],
      Household: [null],
      Employer: [null],
      EmployerHours: [null],
      SpouseEmployer: [null],
      SpouseEmployerHours: [null],
      SourceOfIncome: [null],
      Motivation: [null],
      Relationship: [null],
      Interested: [null],
      MonthlyIncome: [null],
      KansasResident: [null],
      CurrentEmployer: [null],
      Married: [null],
      ConvictedCrime: [null],
      Bedrooms: [null],

      isDoorYes: [false],
      isDoorNo: [false],

      isWindowYes: [false],
      isWindowNo: [false],

      isSlantedCeilingsYes: [false],
      isSlantedCeilingsNo: [false],

      isCeilingHeightsYes: [false],
      isCeilingHeightsNo: [false],

      isWalkThruYes: [false],
      isWalkThruNo: [false],

      isWantingPlacedYes: [false],
      isWantingPlacedNo: [false],

      ObtainBeds: [null],

      isBasementYes: [false],
      isBasementNo: [false],

      isBedroomsBasementYes: [false],
      isBedroomsBasementNo: [false],

      BasementSleep: [null],

      isExitsYes: [false],
      isExitsNo: [false],

      FireEscape: [null],

      isRailingYes: [false],
      isRailingNo: [false],



      isMobileHomeYes: [false],
      isMobileHomeNo: [false],


      StairsAndHandRailings: [null],

      isFarmYes: [false],
      isFarmNo: [false],

      isSharpToolsYes: [false],
      isSharpToolsNo: [false],

      isLivestockYes: [false],
      isLivestockNo: [false],

      Property: [null],

      isTrampolineYes: [false],
      isTrampolineNo: [false],

      isGiveUpYes: [false],
      isGiveUpNo: [false],

      isSwimmingPoolYes: [false],
      isSwimmingPoolNo: [false],

      FencedLocked: [null],

      isPetsYes: [false],
      isPetsNo: [false],

      PitBullsProhibited: [null],
      PetsInside: [null],
      ImmunizationRecords: [null],
      AdditionalInformation: [null],
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
      //  this.reInformalCareReferral = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.informalCareReferralForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
