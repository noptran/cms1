import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReSiblingSep } from './re-sibling-sep';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-sibling-separation-staffing',
  templateUrl: './sibling-separation-staffing.component.html',
  styleUrls: ['./sibling-separation-staffing.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['sibSepOut']
})
export class SiblingSeparationStaffingComponent implements OnInit {
  siblingSeparationForm: FormGroup;
  reSiblingSeparation: ReSiblingSep = new ReSiblingSep();
  isEdit = false;
  editControll = true;
  isPrint = true;

  @Output()
  sibSepOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/sibling/separation/staffing/detail') { this.getDetails(); }
    this.siblingSeparationForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reSiblingSeparation = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DateOfReview) ? formData.DateOfReview = new Date(formData.DateOfReview) : null;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.ReferralDate) ? formData.ReferralDate = new Date(formData.ReferralDate) : null;

    !isNullOrUndefined(formData.Dob1) ? formData.Dob1 = new Date(formData.Dob1) : null;
    !isNullOrUndefined(formData.ReferralDate1) ? formData.ReferralDate1 = new Date(formData.ReferralDate1) : null;
    !isNullOrUndefined(formData.Dob2) ? formData.Dob2 = new Date(formData.Dob2) : null;
    !isNullOrUndefined(formData.ReferralDate2) ? formData.ReferralDate2 = new Date(formData.ReferralDate2) : null;
    !isNullOrUndefined(formData.Dob3) ? formData.Dob3 = new Date(formData.Dob3) : null;
    !isNullOrUndefined(formData.ReferralDate3) ? formData.ReferralDate3 = new Date(formData.ReferralDate3) : null;
    !isNullOrUndefined(formData.Dob4) ? formData.Dob4 = new Date(formData.Dob4) : null;
    !isNullOrUndefined(formData.ReferralDate4) ? formData.ReferralDate4 = new Date(formData.ReferralDate4) : null;
    !isNullOrUndefined(formData.Dob5) ? formData.Dob5 = new Date(formData.Dob5) : null;
    !isNullOrUndefined(formData.ReferralDate5) ? formData.ReferralDate5 = new Date(formData.ReferralDate5) : null;

    !isNullOrUndefined(formData.CaseManagerDate) ? formData.CaseManagerDate = new Date(formData.CaseManagerDate) : null;
    !isNullOrUndefined(formData.SupervisorDate) ? formData.SupervisorDate = new Date(formData.SupervisorDate) : null;
    this.reSiblingSeparation = formData;

  }

  editForm() {
    this.siblingSeparationForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.DateOfReview) ? source.DateOfReview = Date.parse(source.DateOfReview) : null;
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.ReferralDate) ? source.ReferralDate = Date.parse(source.ReferralDate) : null;

    !isNullOrUndefined(source.Dob1) ? source.Dob1 = Date.parse(source.Dob1) : null;
    !isNullOrUndefined(source.ReferralDate1) ? source.ReferralDate1 = Date.parse(source.ReferralDate1) : null;
    !isNullOrUndefined(source.Dob2) ? source.Dob2 = Date.parse(source.Dob2) : null;
    !isNullOrUndefined(source.ReferralDate2) ? source.ReferralDate2 = Date.parse(source.ReferralDate2) : null;
    !isNullOrUndefined(source.Dob3) ? source.Dob3 = Date.parse(source.Dob3) : null;
    !isNullOrUndefined(source.ReferralDate3) ? source.ReferralDate3 = Date.parse(source.ReferralDate3) : null;
    !isNullOrUndefined(source.Dob4) ? source.Dob4 = Date.parse(source.Dob4) : null;
    !isNullOrUndefined(source.ReferralDate4) ? source.ReferralDate4 = Date.parse(source.ReferralDate4) : null;
    !isNullOrUndefined(source.Dob5) ? source.Dob5 = Date.parse(source.Dob5) : null;
    !isNullOrUndefined(source.ReferralDate5) ? source.ReferralDate5 = Date.parse(source.ReferralDate5) : null;

    !isNullOrUndefined(source.CaseManagerDate) ? source.CaseManagerDate = Date.parse(source.CaseManagerDate) : null;
    !isNullOrUndefined(source.SupervisorDate) ? source.SupervisorDate = Date.parse(source.SupervisorDate) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.sibSepOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.sibSepOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.siblingSeparationForm = this._fb.group({
      DateOfReview: [null],
      Facts: [null],
      /////////////////////
      Siblings: [null],
      Dob: [null],
      ReferralDate: [null],
      CurrentPlacement: [null],

      Siblings1: [null],
      Dob1: [null],
      ReferralDate1: [null],
      CurrentPlacement1: [null],

      Siblings2: [null],
      Dob2: [null],
      ReferralDate2: [null],
      CurrentPlacement2: [null],

      Siblings3: [null],
      Dob3: [null],
      ReferralDate3: [null],
      CurrentPlacement3: [null],

      Siblings4: [null],
      Dob4: [null],
      ReferralDate4: [null],
      CurrentPlacement4: [null],

      Siblings5: [null],
      Dob5: [null],
      ReferralDate5: [null],
      CurrentPlacement5: [null],
      /////////////////////////
      Section: [null],
      Section1: [null],
      Section2: [null],
      Section3: [null],
      Section4: [null],
      Section5: [null],

      CaseManagerSignature: [null],
      CaseManagerDate: [null],
      SupervisorSignature: [null],
      SupervisorDate: [null],



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

      // !isNullOrUndefined(formData.DateOfReview) ? formData.DateOfReview = new Date(formData.DateOfReview) : null;
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      // !isNullOrUndefined(formData.ReferralDate) ? formData.ReferralDate = new Date(formData.ReferralDate) : null;

      // !isNullOrUndefined(formData.Dob1) ? formData.Dob1 = new Date(formData.Dob1) : null;
      // !isNullOrUndefined(formData.ReferralDate1) ? formData.ReferralDate1 = new Date(formData.ReferralDate1) : null;
      // !isNullOrUndefined(formData.Dob2) ? formData.Dob2 = new Date(formData.Dob2) : null;
      // !isNullOrUndefined(formData.ReferralDate2) ? formData.ReferralDate2 = new Date(formData.ReferralDate2) : null;
      // !isNullOrUndefined(formData.Dob3) ? formData.Dob3 = new Date(formData.Dob3) : null;
      // !isNullOrUndefined(formData.ReferralDate3) ? formData.ReferralDate3 = new Date(formData.ReferralDate3) : null;
      // !isNullOrUndefined(formData.Dob4) ? formData.Dob4 = new Date(formData.Dob4) : null;
      // !isNullOrUndefined(formData.ReferralDate4) ? formData.ReferralDate4 = new Date(formData.ReferralDate4) : null;
      // !isNullOrUndefined(formData.Dob5) ? formData.Dob5 = new Date(formData.Dob5) : null;
      // !isNullOrUndefined(formData.ReferralDate5) ? formData.ReferralDate5 = new Date(formData.ReferralDate5) : null;

      // !isNullOrUndefined(formData.CaseManagerDate) ? formData.CaseManagerDate = new Date(formData.CaseManagerDate) : null;
      // !isNullOrUndefined(formData.SupervisorDate) ? formData.SupervisorDate = new Date(formData.SupervisorDate) : null;
      //  this.reSiblingSeparation = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.siblingSeparationForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }


}
