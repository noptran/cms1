import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { RePermananency } from './re-permananency';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-permanency-plan-desk-review',
  templateUrl: './permanency-plan-desk-review.component.html',
  styleUrls: ['./permanency-plan-desk-review.component.scss','../../family-preservation/family-preservation.scss'],
  outputs: ['perPlanDeskRevOut']
})
export class PermanencyPlanDeskReviewComponent implements OnInit {
  permanencyPlanDeskForm: FormGroup;
  rePermanencyPlanDesk: RePermananency = new RePermananency();
  editControll = true;
  isEdit= false;
  isPrint = true;

  @Output()
  perPlanDeskRevOut = new EventEmitter()

  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/permanency/plandesk/review/detail') { this.getDetails(); }
    this.permanencyPlanDeskForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.rePermanencyPlanDesk = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DateOfInitial) ? formData.DateOfInitial = new Date(formData.DateOfInitial) : null;
    !isNullOrUndefined(formData.DateOfDesk) ? formData.DateOfDesk = new Date(formData.DateOfDesk) : null;
    !isNullOrUndefined(formData.DateLastPermanency) ? formData.DateLastPermanency = new Date(formData.DateLastPermanency) : null;
    !isNullOrUndefined(formData.DateLastPermanencyAdoption) ? formData.DateLastPermanencyAdoption = new Date(formData.DateLastPermanencyAdoption) : null;
    !isNullOrUndefined(formData.DateParentalRights) ? formData.DateParentalRights = new Date(formData.DateParentalRights) : null;
    !isNullOrUndefined(formData.DateMotionCustodianship) ? formData.DateMotionCustodianship = new Date(formData.DateMotionCustodianship) : null;
    !isNullOrUndefined(formData.DateLastPermanencyAppla) ? formData.DateLastPermanencyAppla = new Date(formData.DateLastPermanencyAppla) : null;
    !isNullOrUndefined(formData.SignaturePersonDate) ? formData.SignaturePersonDate = new Date(formData.SignaturePersonDate) : null;
    !isNullOrUndefined(formData.SignatureSupervisorDate) ? formData.SignatureSupervisorDate = new Date(formData.SignatureSupervisorDate) : null;
    !isNullOrUndefined(formData.LiaisonDate) ? formData.LiaisonDate = new Date(formData.LiaisonDate) : null;
    !isNullOrUndefined(formData.AttorneyDate) ? formData.AttorneyDate = new Date(formData.AttorneyDate) : null;
    !isNullOrUndefined(formData.DateMotionCustodianship1) ? formData.DateMotionCustodianship1 = new Date(formData.DateMotionCustodianship1) : null;
    this.rePermanencyPlanDesk = formData;
  }

  editForm() {
    this.permanencyPlanDeskForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.DateOfInitial) ? source.DateOfInitial = Date.parse(source.DateOfInitial) : null;
    !isNullOrUndefined(source.DateOfDesk) ? source.DateOfDesk = Date.parse(source.DateOfDesk) : null;
    !isNullOrUndefined(source.DateLastPermanency) ? source.DateLastPermanency = Date.parse(source.DateLastPermanency) : null;
    !isNullOrUndefined(source.DateLastPermanencyAdoption) ? source.DateLastPermanencyAdoption = Date.parse(source.DateLastPermanencyAdoption) : null;
    !isNullOrUndefined(source.DateParentalRights) ? source.DateParentalRights = Date.parse(source.DateParentalRights) : null;
    !isNullOrUndefined(source.DateMotionCustodianship) ? source.DateMotionCustodianship = Date.parse(source.DateMotionCustodianship) : null;
    !isNullOrUndefined(source.DateLastPermanencyAppla) ? source.DateLastPermanencyAppla = Date.parse(source.DateLastPermanencyAppla) : null;
    !isNullOrUndefined(source.SignaturePersonDate) ? source.SignaturePersonDate = Date.parse(source.SignaturePersonDate) : null;
    !isNullOrUndefined(source.SignatureSupervisorDate) ? source.SignatureSupervisorDate = Date.parse(source.SignatureSupervisorDate) : null;
    !isNullOrUndefined(source.LiaisonDate) ? source.LiaisonDate = Date.parse(source.LiaisonDate) : null;
    !isNullOrUndefined(source.AttorneyDate) ? source.AttorneyDate = Date.parse(source.AttorneyDate) : null;
    !isNullOrUndefined(source.DateMotionCustodianship1) ? source.DateMotionCustodianship1 = Date.parse(source.DateMotionCustodianship1) : null;
   
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.perPlanDeskRevOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.perPlanDeskRevOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.permanencyPlanDeskForm = this._fb.group({
      CaseName: [null],
      DateOfInitial: [null],
      DcfOffice: [null],
      ManagementProvider: [null],
      DateOfDesk: [null],
      AssignedCase: [null],
      DateLastPermanency: [null],
      IsStablePlacementYes :[false],
      IsStablePlacementNo :[false],
      ReasonDocumented: [null],
      DateLastPermanencyAdoption: [null],
      DateParentalRights: [null],
      DateMotionCustodianship1: [null],
      DateMotionCustodianship: [null],
      CompellingReason: [null],
      DateLastPermanencyAppla: [null],
      IsStableApplaYes :[false],
      IsStableApplaNo :[false],
      CompellingReasonAppla: [null],
      CompellingReasonDocumentedAppla: [null],
      SignaturePerson: [null],
      SignaturePersonDate: [null],
      SignatureSupervisor: [null],
      SignatureSupervisorDate: [null],
      LiaisonDate: [null],
      AttorneyDate: [null],
     

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
      //  !isNullOrUndefined(formData.DateOfInitial) ? formData.DateOfInitial = new Date(formData.DateOfInitial) : null;
      //  !isNullOrUndefined(formData.DateOfDesk) ? formData.DateOfDesk = new Date(formData.DateOfDesk) : null;
      //  !isNullOrUndefined(formData.DateLastPermanency) ? formData.DateLastPermanency = new Date(formData.DateLastPermanency) : null;
      //  !isNullOrUndefined(formData.DateLastPermanencyAdoption) ? formData.DateLastPermanencyAdoption = new Date(formData.DateLastPermanencyAdoption) : null;
      //  !isNullOrUndefined(formData.DateParentalRights) ? formData.DateParentalRights = new Date(formData.DateParentalRights) : null;
      //  !isNullOrUndefined(formData.DateMotionCustodianship) ? formData.DateMotionCustodianship = new Date(formData.DateMotionCustodianship) : null;
      //  !isNullOrUndefined(formData.DateLastPermanencyAppla) ? formData.DateLastPermanencyAppla = new Date(formData.DateLastPermanencyAppla) : null;
      //  !isNullOrUndefined(formData.SignaturePersonDate) ? formData.SignaturePersonDate = new Date(formData.SignaturePersonDate) : null;
      //  !isNullOrUndefined(formData.SignatureSupervisorDate) ? formData.SignatureSupervisorDate = new Date(formData.SignatureSupervisorDate) : null;
      //  !isNullOrUndefined(formData.LiaisonDate) ? formData.LiaisonDate = new Date(formData.LiaisonDate) : null;
      //  !isNullOrUndefined(formData.AttorneyDate) ? formData.AttorneyDate = new Date(formData.AttorneyDate) : null;
      //  !isNullOrUndefined(formData.DateMotionCustodianship1) ? formData.DateMotionCustodianship1 = new Date(formData.DateMotionCustodianship1) : null;
      //  this.rePermanencyPlanDesk = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.permanencyPlanDeskForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
  
}
