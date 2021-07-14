import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReRespiteReq } from './re-respite-req';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-respite-request',
  templateUrl: './respite-request.component.html',
  styleUrls: ['./respite-request.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['resNotOut']
})
export class RespiteRequestComponent implements OnInit {
  respiteRequestForm: FormGroup;
  reRespiteRequest: ReRespiteReq = new ReRespiteReq();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  resNotOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/permanency/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/moveandpermanency/sfcs/employee/resource/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.respiteRequestForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reRespiteRequest = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

    !isNullOrUndefined(formData.RespiteAdmissionDate) ? formData.RespiteAdmissionDate = new Date(formData.RespiteAdmissionDate) : null;
    !isNullOrUndefined(formData.RespiteDischargeDate) ? formData.RespiteDischargeDate = new Date(formData.RespiteDischargeDate) : null;
    !isNullOrUndefined(formData.TimingIn) ? formData.TimingIn = new Date(formData.TimingIn) : null;
    !isNullOrUndefined(formData.TimingOut) ? formData.TimingOut = new Date(formData.TimingOut) : null;
    !isNullOrUndefined(formData.ContactDate) ? formData.ContactDate = new Date(formData.ContactDate) : null;
    this.reRespiteRequest = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reRespiteRequest.NameChild = data.person.firstName + " " + data.person.lastName;
        this.reRespiteRequest.KaecsesId = data.person.kaecses;
        this.reRespiteRequest.Dob = new Date(data.person.dob);
        this.reRespiteRequest.Date = new Date();
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
    this.respiteRequestForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;

    !isNullOrUndefined(source.RespiteAdmissionDate) ? source.RespiteAdmissionDate = Date.parse(source.RespiteAdmissionDate) : null;
    !isNullOrUndefined(source.RespiteDischargeDate) ? source.RespiteDischargeDate = Date.parse(source.RespiteDischargeDate) : null;
    !isNullOrUndefined(source.TimingIn) ? source.TimingIn = Date.parse(source.TimingIn) : null;
    !isNullOrUndefined(source.TimingOut) ? source.TimingOut = Date.parse(source.TimingOut) : null;
    !isNullOrUndefined(source.ContactDate) ? source.ContactDate = Date.parse(source.ContactDate) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.resNotOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/rfc/permanency"]);
  }
  discardForm() {
    this.resNotOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.respiteRequestForm = this._fb.group({
      Date: [null],
      NameChild: [null],
      Dob: [null],
      KaecsesId: [null],
      ContractorStaff: [null],
      PhoneNumber: [null],
      PlacingAgency: [null],
      RequestingRespite: [null],
      FaxNumber: [null],
      Signature: [null],
      Date1: [null],
      PhoneNumber1: [null],
      Sponsor: [null],
      PlacementName: [null],
      LevelOfCare: [null],
      PlacementAddress: [null],
      PlacementSponsor: [null],
      PlacementPhoneNumber: [null],
      RespiteAdmissionDate: [null],
      RespiteDischargeDate: [null],
      IsPpvYes: [false],
      IsPpvNo: [false],
      IsDayRespiteYes: [false],
      IsDayRespiteNo: [false],
      TimingIn: [null],
      TimingOut: [null],
      RespitePlacementName: [null],
      RespitePlacementSponsor: [null],
      Address: [null],
      RespitePhoneNum: [null],
      RespiteWorkerSignature: [null],

      IsHouseRespite: [false],
      IsPayCurrent: [false],
      IsPaidRespite: [false],
      IsPayRespitePlacement: [false],
      IsIhp: [false],
      Ihp: [null],
      IsEkidz: [false],
      IsMhRespite: [false],
      MhRespite: [null],
      FhRate: [null],

      PersonApprovingRespite: [null],
      ContactDate: [null],
      AckSent1: [null],
      AckSent2: [null],
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

      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      // !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

      // !isNullOrUndefined(formData.RespiteAdmissionDate) ? formData.RespiteAdmissionDate = new Date(formData.RespiteAdmissionDate) : null;
      // !isNullOrUndefined(formData.RespiteDischargeDate) ? formData.RespiteDischargeDate = new Date(formData.RespiteDischargeDate) : null;
      // !isNullOrUndefined(formData.TimingIn) ? formData.TimingIn = new Date(formData.TimingIn) : null;
      // !isNullOrUndefined(formData.TimingOut) ? formData.TimingOut = new Date(formData.TimingOut) : null;
      // !isNullOrUndefined(formData.ContactDate) ? formData.ContactDate = new Date(formData.ContactDate) : null;
      //  this.reRespiteRequest = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.respiteRequestForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
