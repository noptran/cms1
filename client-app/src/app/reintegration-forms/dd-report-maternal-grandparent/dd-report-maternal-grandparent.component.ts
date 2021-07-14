import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReDdMaternalGp } from './re-dd-maternal-gp';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-dd-report-maternal-grandparent',
  templateUrl: './dd-report-maternal-grandparent.component.html',
  styleUrls: ['./dd-report-maternal-grandparent.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['ddMaternalOut']
})
export class DdReportMaternalGrandparentComponent implements OnInit {
  ddMaternalGpForm: FormGroup;
  reDdMaternalGp: ReDdMaternalGp = new ReDdMaternalGp();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  ddMaternalOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/court-orders/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/courtorder/dd/report/maternal/grandparent/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.ddMaternalGpForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reDdMaternalGp = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DatePrepared) ? formData.DatePrepared = new Date(formData.DatePrepared) : null;
    !isNullOrUndefined(formData.DateDue) ? formData.DateDue = new Date(formData.DateDue) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
    this.reDdMaternalGp = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reDdMaternalGp.ChildName = data.person.firstName + " " + data.person.lastName;
        this.reDdMaternalGp.DatePrepared = new Date();
        this.reDdMaternalGp.DateDue = new Date();
        this.reDdMaternalGp.DatePrepared = new Date();
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.reDdMaternalGp.CourtCase = (data.referral.caseID.caseID)
      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }

  editForm() {
    this.ddMaternalGpForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.DatePrepared) ? source.DatePrepared = Date.parse(source.DatePrepared) : null;
    !isNullOrUndefined(source.DateDue) ? source.DateDue = Date.parse(source.DateDue) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.ddMaternalOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.ddMaternalOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.ddMaternalGpForm = this._fb.group({
      ChildName: [null],
      CourtCase: [null],
      Attorney: [null],
      Cso: [null],
      PreparedBy: [null],
      Contractor: [null],
      DatePrepared: [null],
      DateDue: [null],
      IsFatherLocatedYes: [false],
      IsFatherLocatedNo: [false],
      ConfirmedAddress: [null],
      isDeathConfirmationYes: [false],
      isDeathConfirmationNo: [false],
      EffortsName: [null],
      MotherReport: [null],
      ChildReport: [null],
      fatherReport: [null],
      ExtendedFamilyMembers: [null],
      Cse: [null],
      CseDocumentation: [null],
      Ees: [null],
      TelephoneServices: [null],
      Cso1: [null],
      EnforcementAuthorities: [null],
      KansasDepartment: [null],
      DepartmentOfCorrections: [null],
      MunicipalProbation: [null],
      DistrictCourtProbation: [null],

      Result: [null],
      Searches: [null],
      RegularMailResult: [null],
      RegularMailAddresses: [null],

      CertifiedMailResult: [null],
      CertifiedMailAddresses: [null],

      DcfSocialWorker: [null],
      CustodianAddress: [null],

      DiligenceInquiryAddress: [null],

      IsPublicationNoticeNecessary: [false],
      IsPublicationNoticeNotNecessary: [false],

      Signature: [null],
      Date: [null],
      Signature1: [null],
      Date1: [null],
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
      //  !isNullOrUndefined(formData.DatePrepared) ? formData.DatePrepared = new Date(formData.DatePrepared) : null;
      //  !isNullOrUndefined(formData.DateDue) ? formData.DateDue = new Date(formData.DateDue) : null;
      //  !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      //  !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      //  this.reDdMaternalGp = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.ddMaternalGpForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
