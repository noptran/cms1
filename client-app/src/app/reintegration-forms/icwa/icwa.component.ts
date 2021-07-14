import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReIcwa } from './re-icwa';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-icwa',
  templateUrl: './icwa.component.html',
  styleUrls: ['./icwa.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['icwaOut']
})
export class ICWAComponent implements OnInit {
  ICWAForm: FormGroup;
  reICWA: ReIcwa = new ReIcwa();
  editControll = true;
  isEdit = false;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  icwaOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {
    
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/icwa/detail') { this.getDetails(); }
    this.printedBy = localStorage.getItem('UserId') || "Administrator";
    this.printedDate = new Date();
    this.ICWAForm.disable();
  }

  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reICWA = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.MotherDob) ? formData.MotherDob = new Date(formData.MotherDob) : null;
    !isNullOrUndefined(formData.MotherDobDeceased) ? formData.MotherDobDeceased = new Date(formData.MotherDobDeceased) : null;
    !isNullOrUndefined(formData.FatherDob) ? formData.FatherDob = new Date(formData.FatherDob) : null;
    !isNullOrUndefined(formData.FatherDobDeceased) ? formData.FatherDobDeceased = new Date(formData.FatherDobDeceased) : null;
    !isNullOrUndefined(formData.MaternalGrandmotherDob) ? formData.MaternalGrandmotherDob = new Date(formData.MaternalGrandmotherDob) : null;
    !isNullOrUndefined(formData.MaternalGrandmotherDobDeceased) ? formData.MaternalGrandmotherDobDeceased = new Date(formData.MaternalGrandmotherDobDeceased) : null;
    !isNullOrUndefined(formData.MaternalGrandfatherDob) ? formData.MaternalGrandfatherDob = new Date(formData.MaternalGrandfatherDob) : null;
    !isNullOrUndefined(formData.MaternalGrandfatherDobDeceased) ? formData.MaternalGrandfatherDobDeceased = new Date(formData.MaternalGrandfatherDobDeceased) : null;
    !isNullOrUndefined(formData.PaternalGrandmotherDob) ? formData.PaternalGrandmotherDob = new Date(formData.PaternalGrandmotherDob) : null;
    !isNullOrUndefined(formData.PaternalGrandmotherDobDeceased) ? formData.PaternalGrandmotherDobDeceased = new Date(formData.PaternalGrandmotherDobDeceased) : null;
    
    !isNullOrUndefined(formData.PaternalGrandmotherDob1) ? formData.PaternalGrandmotherDob1 = new Date(formData.PaternalGrandmotherDob1) : null;
    !isNullOrUndefined(formData.PaternalGrandmotherDobDeceased1) ? formData.PaternalGrandmotherDobDeceased1 = new Date(formData.PaternalGrandmotherDobDeceased1) : null;
 
    
    !isNullOrUndefined(formData.PaternalGrandfatherDob) ? formData.PaternalGrandfatherDob = new Date(formData.PaternalGrandfatherDob) : null;
    !isNullOrUndefined(formData.PaternalGrandfatherDobDeceased) ? formData.PaternalGrandfatherDobDeceased = new Date(formData.PaternalGrandfatherDobDeceased) : null;
    !isNullOrUndefined(formData.MaternalGreatGrandmotherDob) ? formData.MaternalGreatGrandmotherDob = new Date(formData.MaternalGreatGrandmotherDob) : null;
    !isNullOrUndefined(formData.MaternalGreatGrandmotherDobDeceased) ? formData.MaternalGreatGrandmotherDobDeceased = new Date(formData.MaternalGreatGrandmotherDobDeceased) : null;
    !isNullOrUndefined(formData.MaternalGreatGrandfatherDob) ? formData.MaternalGreatGrandfatherDob = new Date(formData.MaternalGreatGrandfatherDob) : null;
    !isNullOrUndefined(formData.MaternalGreatGrandfatherDobDeceased) ? formData.MaternalGreatGrandfatherDobDeceased = new Date(formData.MaternalGreatGrandfatherDobDeceased) : null;
    !isNullOrUndefined(formData.MaternalGreatGrandmotherDob1) ? formData.MaternalGreatGrandmotherDob1 = new Date(formData.MaternalGreatGrandmotherDob1) : null;
    !isNullOrUndefined(formData.MaternalGreatGrandmotherDobDeceased1) ? formData.MaternalGreatGrandmotherDobDeceased1 = new Date(formData.MaternalGreatGrandmotherDobDeceased1) : null;

    !isNullOrUndefined(formData.MaternalGreatGrandfatherDob1) ? formData.MaternalGreatGrandfatherDob1 = new Date(formData.MaternalGreatGrandfatherDob1) : null;
    !isNullOrUndefined(formData.MaternalGreatGrandfatherDobDeceased1) ? formData.MaternalGreatGrandfatherDobDeceased1 = new Date(formData.MaternalGreatGrandfatherDobDeceased1) : null;
    !isNullOrUndefined(formData.PaternalGreatGrandmotherDob) ? formData.PaternalGreatGrandmotherDob = new Date(formData.PaternalGreatGrandmotherDob) : null;
    !isNullOrUndefined(formData.PaternalGreatGrandmotherDobDeceased) ? formData.PaternalGreatGrandmotherDobDeceased = new Date(formData.PaternalGreatGrandmotherDobDeceased) : null;
    !isNullOrUndefined(formData.PaternalGreatGrandfatherDob) ? formData.PaternalGreatGrandfatherDob = new Date(formData.PaternalGreatGrandfatherDob) : null;
    !isNullOrUndefined(formData.PaternalGreatGrandfatherDobDeceased) ? formData.PaternalGreatGrandfatherDobDeceased = new Date(formData.PaternalGreatGrandfatherDobDeceased) : null;
    !isNullOrUndefined(formData.PaternalGreatGrandmotherDob1) ? formData.PaternalGreatGrandmotherDob1 = new Date(formData.PaternalGreatGrandmotherDob1) : null;
    !isNullOrUndefined(formData.PaternalGreatGrandmotherDobDeceased1) ? formData.PaternalGreatGrandmotherDobDeceased1 = new Date(formData.PaternalGreatGrandmotherDobDeceased1) : null;
    !isNullOrUndefined(formData.PaternalGreatGrandfatherDob1) ? formData.PaternalGreatGrandfatherDob1 = new Date(formData.PaternalGreatGrandfatherDob1) : null;
    !isNullOrUndefined(formData.PaternalGreatGrandfatherDobDeceased1) ? formData.PaternalGreatGrandfatherDobDeceased1 = new Date(formData.PaternalGreatGrandfatherDobDeceased1) : null;
    this.reICWA = formData;
  }

  saveForm(event, source) {

    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.MotherDob) ? source.MotherDob = Date.parse(source.MotherDob) : null;
    !isNullOrUndefined(source.MotherDobDeceased) ? source.MotherDobDeceased = Date.parse(source.MotherDobDeceased) : null;
    !isNullOrUndefined(source.FatherDob) ? source.FatherDob = Date.parse(source.FatherDob) : null;
    !isNullOrUndefined(source.FatherDobDeceased) ? source.FatherDobDeceased = Date.parse(source.FatherDobDeceased) : null;
    !isNullOrUndefined(source.MaternalGrandmotherDob) ? source.MaternalGrandmotherDob = Date.parse(source.MaternalGrandmotherDob) : null;
    !isNullOrUndefined(source.MaternalGrandmotherDobDeceased) ? source.MaternalGrandmotherDobDeceased = Date.parse(source.MaternalGrandmotherDobDeceased) : null;
    !isNullOrUndefined(source.MaternalGrandfatherDob) ? source.MaternalGrandfatherDob = Date.parse(source.MaternalGrandfatherDob) : null;
    !isNullOrUndefined(source.MaternalGrandfatherDobDeceased) ? source.MaternalGrandfatherDobDeceased = Date.parse(source.MaternalGrandfatherDobDeceased) : null;
    !isNullOrUndefined(source.PaternalGrandmotherDob) ? source.PaternalGrandmotherDob = Date.parse(source.PaternalGrandmotherDob) : null;
    !isNullOrUndefined(source.PaternalGrandmotherDobDeceased) ? source.PaternalGrandmotherDobDeceased = Date.parse(source.PaternalGrandmotherDobDeceased) : null;
    
    !isNullOrUndefined(source.PaternalGrandmotherDob1) ? source.PaternalGrandmotherDob1 = Date.parse(source.PaternalGrandmotherDob1) : null;
    !isNullOrUndefined(source.PaternalGrandmotherDobDeceased1) ? source.PaternalGrandmotherDobDeceased1 = Date.parse(source.PaternalGrandmotherDobDeceased1) : null;
 
    
    !isNullOrUndefined(source.PaternalGrandfatherDob) ? source.PaternalGrandfatherDob = Date.parse(source.PaternalGrandfatherDob) : null;
    !isNullOrUndefined(source.PaternalGrandfatherDobDeceased) ? source.PaternalGrandfatherDobDeceased = Date.parse(source.PaternalGrandfatherDobDeceased) : null;
    !isNullOrUndefined(source.MaternalGreatGrandmotherDob) ? source.MaternalGreatGrandmotherDob = Date.parse(source.MaternalGreatGrandmotherDob) : null;
    !isNullOrUndefined(source.MaternalGreatGrandmotherDobDeceased) ? source.MaternalGreatGrandmotherDobDeceased = Date.parse(source.MaternalGreatGrandmotherDobDeceased) : null;
    !isNullOrUndefined(source.MaternalGreatGrandfatherDob) ? source.MaternalGreatGrandfatherDob = Date.parse(source.MaternalGreatGrandfatherDob) : null;
    !isNullOrUndefined(source.MaternalGreatGrandfatherDobDeceased) ? source.MaternalGreatGrandfatherDobDeceased = Date.parse(source.MaternalGreatGrandfatherDobDeceased) : null;
    !isNullOrUndefined(source.MaternalGreatGrandmotherDob1) ? source.MaternalGreatGrandmotherDob1 = Date.parse(source.MaternalGreatGrandmotherDob1) : null;
    !isNullOrUndefined(source.MaternalGreatGrandmotherDobDeceased1) ? source.MaternalGreatGrandmotherDobDeceased1 = Date.parse(source.MaternalGreatGrandmotherDobDeceased1) : null;

    !isNullOrUndefined(source.MaternalGreatGrandfatherDob1) ? source.MaternalGreatGrandfatherDob1 = Date.parse(source.MaternalGreatGrandfatherDob1) : null;
    !isNullOrUndefined(source.MaternalGreatGrandfatherDobDeceased1) ? source.MaternalGreatGrandfatherDobDeceased1 = Date.parse(source.MaternalGreatGrandfatherDobDeceased1) : null;
    !isNullOrUndefined(source.PaternalGreatGrandmotherDob) ? source.PaternalGreatGrandmotherDob = Date.parse(source.PaternalGreatGrandmotherDob) : null;
    !isNullOrUndefined(source.PaternalGreatGrandmotherDobDeceased) ? source.PaternalGreatGrandmotherDobDeceased = Date.parse(source.PaternalGreatGrandmotherDobDeceased) : null;
    !isNullOrUndefined(source.PaternalGreatGrandfatherDob) ? source.PaternalGreatGrandfatherDob = Date.parse(source.PaternalGreatGrandfatherDob) : null;
    !isNullOrUndefined(source.PaternalGreatGrandfatherDobDeceased) ? source.PaternalGreatGrandfatherDobDeceased = Date.parse(source.PaternalGreatGrandfatherDobDeceased) : null;
    !isNullOrUndefined(source.PaternalGreatGrandmotherDob1) ? source.PaternalGreatGrandmotherDob1 = Date.parse(source.PaternalGreatGrandmotherDob1) : null;
    !isNullOrUndefined(source.PaternalGreatGrandmotherDobDeceased1) ? source.PaternalGreatGrandmotherDobDeceased1 = Date.parse(source.PaternalGreatGrandmotherDobDeceased1) : null;
    !isNullOrUndefined(source.PaternalGreatGrandfatherDob1) ? source.PaternalGreatGrandfatherDob1 = Date.parse(source.PaternalGreatGrandfatherDob1) : null;
    !isNullOrUndefined(source.PaternalGreatGrandfatherDobDeceased1) ? source.PaternalGreatGrandfatherDobDeceased1 = Date.parse(source.PaternalGreatGrandfatherDobDeceased1) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.icwaOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
 discardForm() {
    this.icwaOut.emit({ cmsData: {} });
  }
  editForm() {
    this.ICWAForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.ICWAForm = this._fb.group({
      Person: [null],
      Date: [null],
      FullName: [null],
      Dob: [null],
      CaseNumber: [null],
      ChildSibling: [null],
      IndianTribe: [null],
      IndianReservation: [null],
      IndianSchool: [null],
      MedicalTreatment: [null],
      ReceivedServices: [null],
      isLivedReservation: [false],
      isIndianSchool: [false],
      isMedicalTreatment: [false],
      isReceivedServices: [false],

      MotherName: [null],
      MotherPaternity: [null],
      MotherCurrentAddress: [null],
      MotherFormerAddresses: [null],
      MotherDob: [null],
      MotherDobDeceased: [null],
      MotherMembership: [null],
      MotherMembershipNumber: [null],
      MotherInformation: [null],

      FatherName: [null],
      FatherPaternity: [null],
      FatherCurrentAddress: [null],
      FatherFormerAddresses: [null],
      FatherDob: [null],
      FatherDobDeceased: [null],
      FatherMembership: [null],
      FatherMembershipNumber: [null],
      FatherInformation: [null],

      MaternalGrandmotherName: [null],
      MaternalGrandmotherPaternity: [null],
      MaternalGrandmotherCurrentAddress: [null],
      MaternalGrandmotherFormerAddresses: [null],
      MaternalGrandmotherDob: [null],
      MaternalGrandmotherDobDeceased: [null],
      MaternalGrandmotherMembership: [null],
      MaternalGrandmotherMembershipNumber: [null],
      MaternalGrandmotherInformation: [null],

      MaternalGrandfatherName: [null],
      MaternalGrandfatherPaternity: [null],
      MaternalGrandfatherCurrentAddress: [null],
      MaternalGrandfatherFormerAddresses: [null],
      MaternalGrandfatherDob: [null],
      MaternalGrandfatherDobDeceased: [null],
      MaternalGrandfatherMembership: [null],
      MaternalGrandfatherMembershipNumber: [null],
      MaternalGrandfatherInformation: [null],

      PaternalGrandmotherName: [null],
      PaternalGrandmotherPaternity: [null],
      PaternalGrandmotherCurrentAddress: [null],
      PaternalGrandmotherFormerAddresses: [null],
      PaternalGrandmotherDob: [null],
      PaternalGrandmotherDobDeceased: [null],
      PaternalGrandmotherMembership: [null],
      PaternalGrandmotherMembershipNumber: [null],
      PaternalGrandmotherInformation: [null],

      PaternalGrandmotherName1:[null],
      PaternalGrandmotherPaternity1:[null],
      PaternalGrandmotherCurrentAddress1:[null],
      PaternalGrandmotherFormerAddresses1:[null],
      PaternalGrandmotherDob1: [null],
      PaternalGrandmotherDobDeceased1: [null],
      PaternalGrandmotherMembership1:[null],
      PaternalGrandmotherMembershipNumber1:[null],
      PaternalGrandmotherInformation1:[null],

      PaternalGrandfatherName: [null],
      PaternalGrandfatherPaternity: [null],
      PaternalGrandfatherCurrentAddress: [null],
      PaternalGrandfatherFormerAddresses: [null],
      PaternalGrandfatherDob: [null],
      PaternalGrandfatherDobDeceased: [null],
      PaternalGrandfatherMembership: [null],
      PaternalGrandfatherMembershipNumber: [null],
      PaternalGrandfatherInformation: [null],

      MaternalGreatGrandmotherName: [null],
      MaternalGreatGrandmotherPaternity: [null],
      MaternalGreatGrandmotherCurrentAddress: [null],
      MaternalGreatGrandmotherFormerAddresses: [null],
      MaternalGreatGrandmotherDob: [null],
      MaternalGreatGrandmotherDobDeceased: [null],
      MaternalGreatGrandmotherMembership: [null],
      MaternalGreatGrandmotherMembershipNumber: [null],
      MaternalGreatGrandmotherInformation: [null],

      MaternalGreatGrandfatherName: [null],
      MaternalGreatGrandfatherPaternity: [null],
      MaternalGreatGrandfatherCurrentAddress: [null],
      MaternalGreatGrandfatherFormerAddresses: [null],
      MaternalGreatGrandfatherDob: [null],
      MaternalGreatGrandfatherDobDeceased: [null],
      MaternalGreatGrandfatherMembership: [null],
      MaternalGreatGrandfatherMembershipNumber: [null],
      MaternalGreatGrandfatherInformation: [null],

      MaternalGreatGrandmotherName1: [null],
      MaternalGreatGrandmotherPaternity1: [null],
      MaternalGreatGrandmotherCurrentAddress1: [null],
      MaternalGreatGrandmotherFormerAddresses1: [null],
      MaternalGreatGrandmotherDob1: [null],
      MaternalGreatGrandmotherDobDeceased1: [null],
      MaternalGreatGrandmotherMembership1: [null],
      MaternalGreatGrandmotherMembershipNumber1: [null],
      MaternalGreatGrandmotherInformation1: [null],

      MaternalGreatGrandfatherName1: [null],
      MaternalGreatGrandfatherPaternity1: [null],
      MaternalGreatGrandfatherCurrentAddress1: [null],
      MaternalGreatGrandfatherFormerAddresses1: [null],
      MaternalGreatGrandfatherDob1: [null],
      MaternalGreatGrandfatherDobDeceased1: [null],
      MaternalGreatGrandfatherMembership1: [null],
      MaternalGreatGrandfatherMembershipNumber1: [null],
      MaternalGreatGrandfatherInformation1: [null],

      PaternalGreatGrandmotherName: [null],
      PaternalGreatGrandmotherPaternity: [null],
      PaternalGreatGrandmotherCurrentAddress: [null],
      PaternalGreatGrandmotherFormerAddresses: [null],
      PaternalGreatGrandmotherDob: [null],
      PaternalGreatGrandmotherDobDeceased: [null],
      PaternalGreatGrandmotherMembership: [null],
      PaternalGreatGrandmotherMembershipNumber: [null],
      PaternalGreatGrandmotherInformation: [null],

      PaternalGreatGrandfatherName: [null],
      PaternalGreatGrandfatherPaternity: [null],
      PaternalGreatGrandfatherCurrentAddress: [null],
      PaternalGreatGrandfatherFormerAddresses: [null],
      PaternalGreatGrandfatherDob: [null],
      PaternalGreatGrandfatherDobDeceased: [null],
      PaternalGreatGrandfatherMembership: [null],
      PaternalGreatGrandfatherMembershipNumber: [null],
      PaternalGreatGrandfatherInformation: [null],

      PaternalGreatGrandmotherName1: [null],
      PaternalGreatGrandmotherPaternity1: [null],
      PaternalGreatGrandmotherCurrentAddress1: [null],
      PaternalGreatGrandmotherFormerAddresses1: [null],
      PaternalGreatGrandmotherDob1: [null],
      PaternalGreatGrandmotherDobDeceased1: [null],
      PaternalGreatGrandmotherMembership1: [null],
      PaternalGreatGrandmotherMembershipNumber1: [null],
      PaternalGreatGrandmotherInformation1: [null],

      PaternalGreatGrandfatherName1: [null],
      InformationPertaining: [null],
      PaternalGreatGrandfatherPaternity1: [null],
      PaternalGreatGrandfatherCurrentAddress1: [null],
      PaternalGreatGrandfatherFormerAddresses1: [null],
      PaternalGreatGrandfatherDob1: [null],
      PaternalGreatGrandfatherDobDeceased1: [null],
      PaternalGreatGrandfatherMembership1: [null],
      PaternalGreatGrandfatherMembershipNumber1: [null],
      PaternalGreatGrandfatherInformation1: [null],
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
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      // !isNullOrUndefined(formData.MotherDob) ? formData.MotherDob = new Date(formData.MotherDob) : null;
      // !isNullOrUndefined(formData.MotherDobDeceased) ? formData.MotherDobDeceased = new Date(formData.MotherDobDeceased) : null;
      // !isNullOrUndefined(formData.FatherDob) ? formData.FatherDob = new Date(formData.FatherDob) : null;
      // !isNullOrUndefined(formData.FatherDobDeceased) ? formData.FatherDobDeceased = new Date(formData.FatherDobDeceased) : null;
      // !isNullOrUndefined(formData.MaternalGrandmotherDob) ? formData.MaternalGrandmotherDob = new Date(formData.MaternalGrandmotherDob) : null;
      // !isNullOrUndefined(formData.MaternalGrandmotherDobDeceased) ? formData.MaternalGrandmotherDobDeceased = new Date(formData.MaternalGrandmotherDobDeceased) : null;
      // !isNullOrUndefined(formData.MaternalGrandfatherDob) ? formData.MaternalGrandfatherDob = new Date(formData.MaternalGrandfatherDob) : null;
      // !isNullOrUndefined(formData.MaternalGrandfatherDobDeceased) ? formData.MaternalGrandfatherDobDeceased = new Date(formData.MaternalGrandfatherDobDeceased) : null;
      // !isNullOrUndefined(formData.PaternalGrandmotherDob) ? formData.PaternalGrandmotherDob = new Date(formData.PaternalGrandmotherDob) : null;
      // !isNullOrUndefined(formData.PaternalGrandmotherDobDeceased) ? formData.PaternalGrandmotherDobDeceased = new Date(formData.PaternalGrandmotherDobDeceased) : null;
          // !isNullOrUndefined(formData.PaternalGrandmotherDob1) ? formData.PaternalGrandmotherDob1 = new Date(formData.PaternalGrandmotherDob1) : null;
      // !isNullOrUndefined(formData.PaternalGrandmotherDobDeceased1) ? formData.PaternalGrandmotherDobDeceased1 = new Date(formData.PaternalGrandmotherDobDeceased1) : null;
  
      // !isNullOrUndefined(formData.PaternalGrandfatherDob) ? formData.PaternalGrandfatherDob = new Date(formData.PaternalGrandfatherDob) : null;
      // !isNullOrUndefined(formData.PaternalGrandfatherDobDeceased) ? formData.PaternalGrandfatherDobDeceased = new Date(formData.PaternalGrandfatherDobDeceased) : null;
      // !isNullOrUndefined(formData.MaternalGreatGrandmotherDob) ? formData.MaternalGreatGrandmotherDob = new Date(formData.MaternalGreatGrandmotherDob) : null;
      // !isNullOrUndefined(formData.MaternalGreatGrandmotherDobDeceased) ? formData.MaternalGreatGrandmotherDobDeceased = new Date(formData.MaternalGreatGrandmotherDobDeceased) : null;
      // !isNullOrUndefined(formData.MaternalGreatGrandfatherDob) ? formData.MaternalGreatGrandfatherDob = new Date(formData.MaternalGreatGrandfatherDob) : null;
      // !isNullOrUndefined(formData.MaternalGreatGrandfatherDobDeceased) ? formData.MaternalGreatGrandfatherDobDeceased = new Date(formData.MaternalGreatGrandfatherDobDeceased) : null;
      // !isNullOrUndefined(formData.MaternalGreatGrandmotherDob1) ? formData.MaternalGreatGrandmotherDob1 = new Date(formData.MaternalGreatGrandmotherDob1) : null;
      // !isNullOrUndefined(formData.MaternalGreatGrandmotherDobDeceased1) ? formData.MaternalGreatGrandmotherDobDeceased1 = new Date(formData.MaternalGreatGrandmotherDobDeceased1) : null;

      // !isNullOrUndefined(formData.MaternalGreatGrandfatherDob1) ? formData.MaternalGreatGrandfatherDob1 = new Date(formData.MaternalGreatGrandfatherDob1) : null;
      // !isNullOrUndefined(formData.MaternalGreatGrandfatherDobDeceased1) ? formData.MaternalGreatGrandfatherDobDeceased1 = new Date(formData.MaternalGreatGrandfatherDobDeceased1) : null;
      // !isNullOrUndefined(formData.PaternalGreatGrandmotherDob) ? formData.PaternalGreatGrandmotherDob = new Date(formData.PaternalGreatGrandmotherDob) : null;
      // !isNullOrUndefined(formData.PaternalGreatGrandmotherDobDeceased) ? formData.PaternalGreatGrandmotherDobDeceased = new Date(formData.PaternalGreatGrandmotherDobDeceased) : null;
      // !isNullOrUndefined(formData.PaternalGreatGrandfatherDob) ? formData.PaternalGreatGrandfatherDob = new Date(formData.PaternalGreatGrandfatherDob) : null;
      // !isNullOrUndefined(formData.PaternalGreatGrandfatherDobDeceased) ? formData.PaternalGreatGrandfatherDobDeceased = new Date(formData.PaternalGreatGrandfatherDobDeceased) : null;
      // !isNullOrUndefined(formData.PaternalGreatGrandmotherDob1) ? formData.PaternalGreatGrandmotherDob1 = new Date(formData.PaternalGreatGrandmotherDob1) : null;
      // !isNullOrUndefined(formData.PaternalGreatGrandmotherDobDeceased1) ? formData.PaternalGreatGrandmotherDobDeceased1 = new Date(formData.PaternalGreatGrandmotherDobDeceased1) : null;
      // !isNullOrUndefined(formData.PaternalGreatGrandfatherDob1) ? formData.PaternalGreatGrandfatherDob1 = new Date(formData.PaternalGreatGrandfatherDob1) : null;
      // !isNullOrUndefined(formData.PaternalGreatGrandfatherDobDeceased1) ? formData.PaternalGreatGrandfatherDobDeceased1 = new Date(formData.PaternalGreatGrandfatherDobDeceased1) : null;

      //  this.reICWA = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.ICWAForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
  
}
