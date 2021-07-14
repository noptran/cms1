import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReRehabilationService } from './re-rehabilation-service';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-rehabilation-service-referral',
  templateUrl: './rehabilation-service-referral.component.html',
  styleUrls: ['./rehabilation-service-referral.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['rehServOut']
})
export class RehabilationServiceReferralComponent implements OnInit {
  rehabilationServiceForm: FormGroup;
  reRehabilationService: ReRehabilationService = new ReRehabilationService();
  isEdit = false;
  editControll = true;
  isPrint = true;

  @Output()
  rehServOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/initial/screening/tool/detail') { this.getDetails(); }
    this.rehabilationServiceForm.disable();
  }

  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reRehabilationService = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.ReferralDate) ? formData.ReferralDate = new Date(formData.ReferralDate) : null;
    this.reRehabilationService = formData;
  }
  editForm() {
    this.rehabilationServiceForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.ReferralDate) ? source.ReferralDate = Date.parse(source.ReferralDate) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.rehServOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.rehServOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.rehabilationServiceForm = this._fb.group({
      Name: [null],
      ReferralDate: [null],
      Ssn: [null],
      PhysicalAddres: [null],
      CurrentMailingAddress: [null],
      County: [null],
      Phone: [null],
      Contact: [null],
      PermanencySpecialist: [null],
      PhoneNumber: [null],
      Email: [null],
      IsTransitionYes: [false],
      IsTransitionNo: [false],
      ExpectedGraduation: [null],
      Explanation: [null],
      NameReferralSource: [null],
      ExplainTheDisability: [null],
      PursuingEmployment: [null],
      FunctionalLimitations: [null],


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
      //  !isNullOrUndefined(formData.ReferralDate) ? formData.ReferralDate = new Date(formData.ReferralDate) : null;
      //  this.reRehabilationService = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.rehabilationServiceForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }



}
