import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CisCsdc } from './cis-csdc';
import { OpencardsService } from '../../opecards-list-view/opencards.service';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';
import { isNullOrUndefined } from 'util';
import {PrintPdf} from "../../print-pdf";
import * as moment from 'moment';


@Component({
  selector: 'app-csdc',
  templateUrl: './csdc.component.html',
  styleUrls: ['./csdc.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['csdcOut', 'cancelOut'],
  providers: [MessageService]
})
export class CsdcComponent implements OnInit {
  unableToAccesForm: FormGroup;
  csdcForm: FormGroup;
  cisCsdc: CisCsdc = new CisCsdc();

  breadcrumbs = [];
  isPdfJsonID: any;
  update: any;
  editControll = true;
  isDisable = false;

  currentCisVersion: any;
  formJsonValue: any;
  cisFormJson: any;
  isCisJsonSaved = false;
  cisPdfJsonID: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  isFinalize = false;
  isUnableToAccess = false;
  cisPdfJsonIdFinalize: any;
  isFinalizeButton = false;

  csdcOut = new EventEmitter();
  cancelOut = new EventEmitter();

  constructor(public _printPdf: PrintPdf,public _fb: FormBuilder, public _openCards: OpencardsService, public _router: Router, public _client: ClildFormService, public messageService: MessageService) { }


  ngOnInit() {
    this.formValidation();

    if (localStorage.getItem('isFinalized') === 'true') {
      this.isFinalize = false;
    }

    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Behavioral Assessment', href: '/reintegration/referral/opencard/behavioral-assessment/dashboard', active: '' },
      { label: 'CSDC', active: 'active' }
    );

    this.getJson();
  }

  formValidation() {
    this.csdcForm = this._fb.group({

      CSDC_KS_Question2_CheckBox_Client3: [null],
      CSDC_KS_Question2_CheckBox_Client4: [null],
      CSDC_KS_Question2_CheckBox_Client1: [null],
      CSDC_KS_Question2_CheckBox_Client2: [null],
      CSDC_KS_Question11_CheckBox_Client2: [null],
      CSDC_KS_Question11_CheckBox_Client1: [null],
      CSDC_KS_Question11_CheckBox_Client4: [null],
      CSDC_KS_Question11_CheckBox_Client3: [null],
      CSDC_KS_PartD_Question1_Client3: [null],
      CSDC_KS_PartD_Question1_Client2: [null],
      CSDC_KS_PartD_Question1_Client1: [null],
      CSDC_KS_PartD_Question9_Client2: [null],
      CSDC_KS_PartD_Question9_Client3: [null],
      CSDC_KS_PartD_Question9_Client1: [null],
      CSDC_KS_PartD_Question17_Client3: [null],
      CSDC_KS_PartD_Question17_Client4: [null],
      CSDC_KS_PartD_Question9_Client4: [null],
      CSDC_KS_PartD_Question17_Client1: [null],
      CSDC_KS_PartD_Question17_Client2: [null],
      CSDC_KS_PartD_Question23_Client4: [null],
      CSDC_KS_PartD_Question23_Client2: [null],
      CSDC_KS_PartD_Question23_Client3: [null],
      CSDC_KS_PartD_Question23_Client1: [null],
      StaffName: [null],
      CSDC_KS_PartD_Question1_Client4: [null],
      CSDC_KS_PartC_Question1_Client1: [null],
      CSDC_KS_PartC_Question1_Client2: [null],
      CSDC_KS_PartC_Question1_Client3: [null],
      CSDC_KS_PartC_Question1_Client4: [null],
      uploadFileDate: [null],
      CSDC_KS_PartD_Question14_Client4: [null],
      CSDC_KS_Question7_CheckBox_Client1: [null],
      disableValidationFields: [null],
      CSDC_KS_PartD_Question6_Client2: [null],
      CSDC_KS_PartD_Question6_Client1: [null],
      CSDC_KS_PartD_Question6_Client4: [null],
      CSDC_KS_PartD_Question14_Client1: [null],
      CSDC_KS_PartD_Question6_Client3: [null],
      facts: [null],
      CSDC_KS_PartD_Question14_Client3: [null],
      CSDC_KS_PartD_Question14_Client2: [null],
      CSDC_KS_PartC_Question4_Client4: [null],
      CSDC_KS_PartC_Question4_Client2: [null],
      CSDC_KS_PartC_Question4_Client3: [null],
      staffName: [null],
      clientId: [null],
      CSDC_KS_PartC_Question4_Client1: [null],
      CSDC_KS_Question10_CheckBox_Client1: [null],
      CSDC_KS_Question10_CheckBox_Client2: [null],
      CSDC_KS_Question10_CheckBox_Client3: [null],
      CSDC_KS_Question7_CheckBox_Client2: [null],
      CSDC_KS_Question7_CheckBox_Client3: [null],
      CSDC_KS_Question7_CheckBox_Client4: [null],
      CSDC_KS_Question10_CheckBox_Client4: [null],
      CSDC_KS_PartD_Question7_Client3: [null],
      CSDC_KS_PartD_Question7_Client2: [null],
      CSDC_KS_PartD_Question7_Client4: [null],
      CSDC_KS_PartD_Question7_Client1: [null],
      CSDC_KS_PartD_Question19_Client4: [null],
      CSDC_KS_PartD_Question19_Client3: [null],
      CSDC_KS_PartD_Question19_Client2: [null],
      remarksField: [null],
      CSDC_KS_Question1_CheckBox_Client1: [null],
      CSDC_KS_PartD_Question19_Client1: [null],
      CSDC_KS_Question1_CheckBox_Client2: [null],
      CSDC_KS_Question1_CheckBox_Client3: [null],
      CSDC_KS_Question1_CheckBox_Client4: [null],
      RelationToClientOther: [null],
      referralId: [null],
      Client3ReferralID: [null],
      CSDC_KS_Question3_CheckBox_Client2: [null],
      CSDC_KS_Question14_CheckBox_Client3: [null],
      CSDC_KS_PartD_Question25_Client3: [null],
      CSDC_KS_Question3_CheckBox_Client3: [null],
      CSDC_KS_Question14_CheckBox_Client2: [null],
      CSDC_KS_PartD_Question25_Client2: [null],
      CSDC_KS_Question3_CheckBox_Client4: [null],
      CSDC_KS_Question14_CheckBox_Client1: [null],
      CSDC_KS_PartD_Question25_Client1: [null],
      CSDC_KS_Question3_CheckBox_Client1: [null],
      CSDC_KS_Question14_CheckBox_Client4: [null],
      name: [null],
      CSDC_KS_PartD_Question11_Client2: [null],
      CSDC_KS_PartD_Question11_Client1: [null],
      updated: [null],
      CSDC_KS_PartD_Question11_Client4: [null],
      CSDC_KS_PartD_Question11_Client3: [null],
      CSDC_KS_PartD_Question25_Client4: [null],
      CSDC_KS_PartD_Question4_Client1: [null],
      CSDC_KS_PartD_Question4_Client2: [null],
      CSDC_KS_PartD_Question4_Client3: [null],
      CSDC_KS_PartD_Question4_Client4: [null],
      finalizedDate: [null],
      CSDC_KS_Question6_CheckBox_Client3: [null],
      CSDC_KS_Question6_CheckBox_Client4: [null],
      CSDC_KS_Question6_CheckBox_Client1: [null],
      CSDC_KS_Question6_CheckBox_Client2: [null],
      Client4ReferralID: [null],
      CSDC_KS_PartC_Question2_Client4: [null],
      CSDC_KS_PartD_Question16_Client1: [null],
      CSDC_KS_PartD_Question16_Client4: [null],
      CSDC_KS_PartD_Question16_Client2: [null],
      CSDC_KS_PartD_Question16_Client3: [null],
      CSDC_KS_PartD_Question20_Client1: [null],
      CSDC_KS_PartD_Question20_Client2: [null],
      CSDC_KS_PartD_Question20_Client3: [null],
      CSDC_KS_PartD_Question20_Client4: [null],
      CSDC_KS_PartC_Question2_Client1: [null],
      CSDC_KS_PartC_Question2_Client3: [null],
      CSDC_KS_PartC_Question2_Client2: [null],
      staffId: [null],
      CSDC_KS_PartD_Question5_Client4: [null],
      CSDC_KS_PartD_Question13_Client1: [null],
      CSDC_KS_PartD_Question13_Client2: [null],
      CSDC_KS_PartD_Question13_Client3: [null],
      CSDC_KS_PartD_Question13_Client4: [null],
      CSDC_KS_PartD_Question5_Client1: [null],
      CSDC_KS_PartD_Question5_Client2: [null],
      CSDC_KS_PartD_Question5_Client3: [null],
      program: [null],
      showMultiClient: [null],
      id: [null],
      CSDC_KS_Question9_CheckBox_Client4: [null],
      CSDC_KS_Question9_CheckBox_Client3: [null],
      CSDC_KS_Question9_CheckBox_Client2: [null],
      CSDC_KS_Question9_CheckBox_Client1: [null],
      status: [null],
      CSDC_KS_PartD_Question2_Client2: [null],
      CSDC_KS_PartD_Question2_Client1: [null],
      CTotal_Client1: [null],
      CSDC_KS_PartD_Question18_Client3: [null],
      CTotal_Client2: [null],
      CSDC_KS_PartD_Question18_Client2: [null],
      CTotal_Client3: [null],
      CSDC_KS_PartD_Question18_Client1: [null],
      CTotal_Client4: [null],
      file: [null],
      formName: [null],
      CSDC_KS_PartD_Question18_Client4: [null],
      ClientID1: [null],
      CompletionDate: [null],
      ClientID4: [null],
      ClientID3: [null],
      ClientID2: [null],
      CSDC_KS_Question4_CheckBox_Client3: [null],
      CSDC_KS_Question13_CheckBox_Client2: [null],
      CSDC_KS_Question4_CheckBox_Client4: [null],
      CSDC_KS_Question13_CheckBox_Client1: [null],
      CSDC_KS_Question4_CheckBox_Client1: [null],
      CSDC_KS_Question13_CheckBox_Client4: [null],
      PDFDoc: [null],
      CSDC_KS_Question4_CheckBox_Client2: [null],
      CSDC_KS_Question13_CheckBox_Client3: [null],
      CSDC_KS_PartD_Question22_Client2: [null],
      CSDC_KS_PartD_Question22_Client1: [null],
      CSDC_KS_PartD_Question22_Client4: [null],
      CSDC_KS_PartD_Question22_Client3: [null],
      CSDC_KS_PartD_Question10_Client4: [null],
      CSDC_KS_PartD_Question10_Client3: [null],
      CSDC_KS_PartD_Question10_Client2: [null],
      CSDC_KS_PartD_Question2_Client4: [null],
      CSDC_KS_PartD_Question10_Client1: [null],
      CSDC_KS_PartD_Question2_Client3: [null],
      Client2ReferralID: [null],
      CSDC_KS_PartD_Question3_Client1: [null],
      CSDC_KS_PartD_Question15_Client4: [null],
      CSDC_KS_PartD_Question15_Client3: [null],
      CSDC_KS_PartD_Question15_Client2: [null],
      CSDC_KS_PartD_Question15_Client1: [null],
      CSDC_KS_PartC_Question3_Client4: [null],
      CSDC_KS_PartC_Question3_Client3: [null],
      ClientName: [null],
      CSDC_KS_Question12_CheckBox_Client4: [null],
      CSDC_KS_Question12_CheckBox_Client3: [null],
     
      CSDC_KS_Question12_CheckBox_Client2: [null],
      CSDC_KS_Question12_CheckBox_Client1: [null],
      validationFields: [null],
      CSDC_KS_PartD_Question21_Client4: [null],
      Client1ReferralID: [null],
      CSDC_KS_PartD_Question21_Client1: [null],
      CSDC_KS_PartD_Question21_Client3: [null],
      created: [null],
      CSDC_KS_PartD_Question21_Client2: [null],
      CSDC_KS_Question8_CheckBox_Client3: [null],
      CSDC_KS_PartC_Question3_Client2: [null],
      CSDC_KS_Question8_CheckBox_Client4: [null],
      CSDC_KS_PartC_Question3_Client1: [null],
      _id: [null],
      CSDC_KS_PartD_Question3_Client2: [null],
      CSDC_KS_PartD_Question3_Client3: [null],
      CSDC_KS_PartD_Question3_Client4: [null],
      CSDC_KS_ClientName2: [null],
      CSDC_KS_ClientName1: [null],
      CSDC_KS_ClientName4: [null],
      CSDC_KS_ClientName3: [null],
      CSDC_KS_PartD_Question12_Client1: [null],
      CSDC_KS_PartD_Question12_Client2: [null],
      StaffID: [null],
      CSDC_KS_PartD_Question12_Client3: [null],
      CSDC_KS_PartD_Question12_Client4: [null],
      _rev: [null],
      CSDC_KS_Question8_CheckBox_Client1: [null],
      CSDC_KS_Question8_CheckBox_Client2: [null],
      CSDC_KS_PartD_Question8_Client3: [null],
      CSDC_KS_PartD_Question8_Client4: [null],
      CSDC_KS_PartD_Question8_Client1: [null],
      CSDC_KS_PartD_Question8_Client2: [null],
      D2Total_Client1: [null],
      Sub_Total_Client3: [null],
      CSDC_KS_Question5_CheckBox_Client1: [null],
      Sub_Total_Client4: [null],
      CSDC_KS_Question5_CheckBox_Client2: [null],
      D2Total_Client3: [null],
      Sub_Total_Client1: [null],
      CSDC_KS_Question5_CheckBox_Client3: [null],
      D2Total_Client2: [null],
      Sub_Total_Client2: [null],
      CSDC_KS_Question5_CheckBox_Client4: [null],
      CSDC_KS_NoneOfAbove_CheckBox: [null],
      CareGiverName: [null],
      Total_Client2: [null],
      Total_Client3: [null],
      Total_Client4: [null],
      D2Total_Client4: [null],
      Total_Client1: [null],
      CareGiverRelationToClient: [null],
      CSDC_KS_PartD_Question24_Client3: [null],
      CSDC_KS_PartD_Question24_Client4: [null],
      CSDC_KS_PartD_Question24_Client1: [null],
      Age_Client2: [null],
      CSDC_KS_PartD_Question24_Client2: [null],
      Age_Client1: [null],
      Age_Client4: [null],
      Age_Client3: [null],
      remarks: [null],
    });
    this.unableToAccesForm = this._fb.group({
      disableValidate: [null]
    });
  }

  getJson() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const data = { 'baDocId': this._client.getId() };
    this.currentCisVersion = this._openCards.getCisJsonVersion();

    this.formJsonValue = this._openCards.getBehavioralCisJson(data)
      .then(async (data) => {
        

        this.cisFormJson = data;
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;
         
        }
        this.isCisJsonSaved = true;
    
        this.cisCsdc = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
       
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;
         
        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;

        }

      

        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;
       
        loader.style.display = 'none';
        this.csdcForm.disable();
        this.unableToAccesForm.disable();
        this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.csdcForm.changedBy) ? data.csdcForm.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.csdcForm.changedDate) ? moment(data.csdcForm.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.csdcForm.enteredBy) ? data.csdcForm.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.csdcForm.enteredDate) ? moment(data.csdcForm.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      })

  }

  async saveForm(source: any) {
    this.isDisable = true;
   
    if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {

     
      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'You cannot update the Finalized Form' });
    }
    else if (this.isUnableToAccess === true) {
      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'This form is under Unable To Access Mode' });
    }
    else if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {

      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
   

      const saveCisFormJson = {
        "baDocID": this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].badocID.badocID,
        "isFinalized": false,
        "cmsCisPdfDocID": this.cisPdfJsonID,
        "pdfJsonData": source,
        "version": this.cisFormJson.cmsCisPdfDoc.length,
        "staffID": localStorage.getItem('UserId')
      }
       this.update = await this._openCards.updateCisForm(saveCisFormJson)
        .then((data) => {

          this.cancelOut.emit();
         
          this.cisPdfJsonIdFinalize = data.cisPdfJsonID;
         

          if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
            this.isFinalize = true;
          
          }
         
          this.isDisable = false;
          
        })
      loader.style.display = 'none';
      this.csdcForm.disable();
    }
    else {

      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'Please Update the Latest Version' });
    }


  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1 && this.isUnableToAccess === false) {

      
      this.editControll = false;
      if (this.cisCsdc.disableValidate === true) {
      
        this.csdcForm.disable();
        this.unableToAccesForm.enable();
      }
      else {
     
        this.csdcForm.enable();
        this.unableToAccesForm.enable();
      }

    
    }
    else {
      
      this.editControll = true;
    }
 
  }

  async finalizeForm(source: any) {
   
    if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {

      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'You cannot Finalize the Finalized Form' });
    }
    else if (this.isUnableToAccess === true) {
      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'This form is under Unable To Access Mode' });
    }
    else {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
     

      const saveCisFormJson = {
        "baDocID": this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].badocID.badocID,
        "isFinalized": true,
        "cisPdfJsonID": this.cisPdfJsonIdFinalize,
        "pdfJsonData": source,
        "version": this.cisFormJson.cmsCisPdfDoc.length,
        "staffID": localStorage.getItem('UserId')
      }
      this.update = await this._openCards.updateCisForm(saveCisFormJson)
        .then((data) => {
          this.cancelOut.emit();
         

        })
      loader.style.display = 'none';
      this.csdcForm.disable();
    }



  }

  disableValidation(isDisableValidated) {
    if (isDisableValidated) {
   
      this.csdcForm.disable();
    }
    else {
     
      this.csdcForm.enable();
    }
  }

  discardForm() {
   
    this.cancelOut.emit();

  }

  handleDataField(event) {
   
    if (event === true) {

     
      this.csdcForm.reset();

      this.cisCsdc.disableValidate = true;
      this.csdcForm.disable();
      

    }
    else {
      this.cisCsdc.disableValidate = false;
      this.cisCsdc.remarks = "";
      this.csdcForm.enable();
    }
   
  }

  saveRemarks(remarks) {
    console.log("remarks in saveRemarks is", remarks);
  
  }

  calculate() {

    this.csdcCalculation();
  
  }

  csdcCalculation() {
    this.partCcsdcCalc();
    this.partDcsdcCalc();
    this.partD2csdcCalc();
    this.cisCsdc.Total_Client1.value = this.cisCsdc.Sub_Total_Client1.value + this.cisCsdc.D2Total_Client1.value;
    this.cisCsdc.Total_Client2.value = this.cisCsdc.Sub_Total_Client2.value + this.cisCsdc.D2Total_Client2.value;
    this.cisCsdc.Total_Client3.value = this.cisCsdc.Sub_Total_Client3.value + this.cisCsdc.D2Total_Client3.value;
    this.cisCsdc.Total_Client4.value = this.cisCsdc.Sub_Total_Client4.value + this.cisCsdc.D2Total_Client4.value;
  }

  partCcsdcCalc() {
    let que1 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question1_Client1.fieldOptionIndex) || 0;
    let que2 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question2_Client1.fieldOptionIndex) || 0;
    let que3 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question3_Client1.fieldOptionIndex) || 0;
    let que4 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question4_Client1.fieldOptionIndex) || 0;
    this.cisCsdc.CTotal_Client1.value = que1 + que2 + que3 + que4;
    let que5 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question1_Client2.fieldOptionIndex) || 0
    let que6 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question2_Client2.fieldOptionIndex) || 0
    let que7 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question3_Client2.fieldOptionIndex) || 0
    let que8 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question4_Client2.fieldOptionIndex) || 0
    this.cisCsdc.CTotal_Client2.value = que5 + que6 + que7 + que8;
    let que9 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question1_Client3.fieldOptionIndex) || 0
    let que10 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question2_Client3.fieldOptionIndex) || 0
    let que11 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question3_Client3.fieldOptionIndex) || 0;
    let que12 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question4_Client3.fieldOptionIndex) || 0;
    this.cisCsdc.CTotal_Client3.value = que9 + que10 + que11 + que12;
    let que13 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question1_Client4.fieldOptionIndex) || 0;
    let que14 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question2_Client4.fieldOptionIndex) || 0;
    let que15 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question3_Client4.fieldOptionIndex) || 0;
    let que16 = parseInt(this.cisCsdc.CSDC_KS_PartC_Question4_Client4.fieldOptionIndex) || 0;
    this.cisCsdc.CTotal_Client4.value = que13 + que14 + que15 + que16;
  }
  partDcsdcCalc() {
    let que1 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question1_Client1.fieldOptionIndex) || 0;
    let que2 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question2_Client1.fieldOptionIndex) || 0;
    let que3 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question3_Client1.fieldOptionIndex) || 0;
    let que4 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question4_Client1.fieldOptionIndex) || 0;
    let que5 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question5_Client1.fieldOptionIndex) || 0;
    let que6 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question6_Client1.fieldOptionIndex) || 0;
    let que7 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question7_Client1.fieldOptionIndex) || 0;
    let que8 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question8_Client1.fieldOptionIndex) || 0;
    let que9 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question9_Client1.fieldOptionIndex) || 0;
    let que10 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question10_Client1.fieldOptionIndex) || 0;
    let que11 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question11_Client1.fieldOptionIndex) || 0;
    let que12 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question12_Client1.fieldOptionIndex) || 0;
    let que13 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question13_Client1.fieldOptionIndex) || 0;
    let que14 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question14_Client1.fieldOptionIndex) || 0;
    this.cisCsdc.D2Total_Client1.value = que1 + que2 + que3 + que4 + que5 + que6 + que7 + que8 + que9 + que10 + que11 + que12 + que13 + que14;

    let que15 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question1_Client2.fieldOptionIndex) || 0;
    let que16 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question2_Client2.fieldOptionIndex) || 0;
    let que17 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question3_Client2.fieldOptionIndex) || 0;
    let que18 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question4_Client2.fieldOptionIndex) || 0;
    let que19 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question5_Client2.fieldOptionIndex) || 0;
    let que20 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question6_Client2.fieldOptionIndex) || 0;
    let que21 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question7_Client2.fieldOptionIndex) || 0;
    let que22 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question8_Client2.fieldOptionIndex) || 0;
    let que23 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question9_Client2.fieldOptionIndex) || 0;
    let que24 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question10_Client2.fieldOptionIndex) || 0;
    let que25 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question11_Client2.fieldOptionIndex) || 0;
    let que26 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question12_Client2.fieldOptionIndex) || 0;
    let que27 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question13_Client2.fieldOptionIndex) || 0;
    let que28 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question14_Client2.fieldOptionIndex) || 0;
    this.cisCsdc.D2Total_Client2.value = que15 + que16 + que17 + que18 + que19 + que20 + que21 + que22 + que23 + que24 + que25 + que26 + que27 + que28;

    let que29 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question1_Client3.fieldOptionIndex) || 0;
    let que30 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question2_Client3.fieldOptionIndex) || 0;
    let que31 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question3_Client3.fieldOptionIndex) || 0;
    let que32 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question4_Client3.fieldOptionIndex) || 0;
    let que33 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question5_Client3.fieldOptionIndex) || 0;
    let que34 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question6_Client3.fieldOptionIndex) || 0;
    let que35 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question7_Client3.fieldOptionIndex) || 0;
    let que36 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question8_Client3.fieldOptionIndex) || 0;
    let que37 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question9_Client3.fieldOptionIndex) || 0;
    let que38 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question10_Client3.fieldOptionIndex) || 0;
    let que39 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question11_Client3.fieldOptionIndex) || 0;
    let que40 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question12_Client3.fieldOptionIndex) || 0;
    let que41 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question13_Client3.fieldOptionIndex) || 0;
    let que42 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question14_Client3.fieldOptionIndex) || 0;
    this.cisCsdc.D2Total_Client3.value = que29 + que30 + que31 + que32 + que33 + que34 + que35 + que36 + que37 + que38 + que39 + que40 + que41 + que42;

    let que43 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question1_Client4.fieldOptionIndex) || 0;
    let que44 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question2_Client4.fieldOptionIndex) || 0;
    let que45 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question3_Client4.fieldOptionIndex) || 0;
    let que46 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question4_Client4.fieldOptionIndex) || 0;
    let que47 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question5_Client4.fieldOptionIndex) || 0;
    let que48 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question6_Client4.fieldOptionIndex) || 0;
    let que49 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question7_Client4.fieldOptionIndex) || 0;
    let que50 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question8_Client4.fieldOptionIndex) || 0;
    let que51 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question9_Client4.fieldOptionIndex) || 0;
    let que52 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question10_Client4.fieldOptionIndex) || 0;
    let que53 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question11_Client4.fieldOptionIndex) || 0;
    let que54 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question12_Client4.fieldOptionIndex) || 0;
    let que55 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question13_Client4.fieldOptionIndex) || 0;
    let que56 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question14_Client4.fieldOptionIndex) || 0;
    this.cisCsdc.D2Total_Client4.value = que43 + que44 + que45 + que46 + que47 + que48 + que49 + que50 + que51 + que52 + que53 + que54 + que55 + que56;
  }
  partD2csdcCalc() {
    let que1 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question15_Client1.fieldOptionIndex) || 0;
    let que2 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question16_Client1.fieldOptionIndex) || 0;
    let que3 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question17_Client1.fieldOptionIndex) || 0;
    let que4 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question18_Client1.fieldOptionIndex) || 0;
    let que5 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question19_Client1.fieldOptionIndex) || 0;
    let que6 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question20_Client1.fieldOptionIndex) || 0;
    let que7 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question21_Client1.fieldOptionIndex) || 0;
    let que8 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question22_Client1.fieldOptionIndex) || 0;
    let que9 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question23_Client1.fieldOptionIndex) || 0;
    let que10 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question24_Client1.fieldOptionIndex) || 0;
    let que11 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question25_Client1.fieldOptionIndex) || 0;
    this.cisCsdc.Sub_Total_Client1.value = que1 + que2 + que3 + que4 + que5 + que6 + que7 + que8 + que9 + que10 + que11;

    let que15 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question15_Client2.fieldOptionIndex) || 0;
    let que16 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question16_Client2.fieldOptionIndex) || 0;
    let que17 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question17_Client2.fieldOptionIndex) || 0;
    let que18 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question18_Client2.fieldOptionIndex) || 0;
    let que19 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question19_Client2.fieldOptionIndex) || 0;
    let que20 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question20_Client2.fieldOptionIndex) || 0;
    let que21 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question21_Client2.fieldOptionIndex) || 0;
    let que22 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question22_Client2.fieldOptionIndex) || 0;
    let que23 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question23_Client2.fieldOptionIndex) || 0;
    let que24 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question24_Client2.fieldOptionIndex) || 0;
    let que25 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question25_Client2.fieldOptionIndex) || 0;

    this.cisCsdc.Sub_Total_Client2.value = que15 + que16 + que17 + que18 + que19 + que20 + que21 + que22 + que23 + que24 + que25;

    let que29 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question15_Client3.fieldOptionIndex) || 0;
    let que30 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question16_Client3.fieldOptionIndex) || 0;
    let que31 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question17_Client3.fieldOptionIndex) || 0;
    let que32 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question18_Client3.fieldOptionIndex) || 0;
    let que33 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question19_Client3.fieldOptionIndex) || 0;
    let que34 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question20_Client3.fieldOptionIndex) || 0;
    let que35 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question21_Client3.fieldOptionIndex) || 0;
    let que36 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question22_Client3.fieldOptionIndex) || 0;
    let que37 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question23_Client3.fieldOptionIndex) || 0;
    let que38 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question24_Client3.fieldOptionIndex) || 0;
    let que39 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question25_Client3.fieldOptionIndex) || 0;
    this.cisCsdc.Sub_Total_Client3.value = que29 + que30 + que31 + que32 + que33 + que34 + que35 + que36 + que37 + que38 + que39;

    let que43 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question15_Client4.fieldOptionIndex) || 0;
    let que44 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question16_Client4.fieldOptionIndex) || 0;
    let que45 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question17_Client4.fieldOptionIndex) || 0;
    let que46 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question18_Client4.fieldOptionIndex) || 0;
    let que47 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question19_Client4.fieldOptionIndex) || 0;
    let que48 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question20_Client4.fieldOptionIndex) || 0;
    let que49 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question21_Client4.fieldOptionIndex) || 0;
    let que50 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question22_Client4.fieldOptionIndex) || 0;
    let que51 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question23_Client4.fieldOptionIndex) || 0;
    let que52 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question24_Client4.fieldOptionIndex) || 0;
    let que53 = parseInt(this.cisCsdc.CSDC_KS_PartD_Question25_Client4.fieldOptionIndex) || 0;
    this.cisCsdc.Sub_Total_Client4.value = que43 + que44 + que45 + que46 + que47 + que48 + que49 + que50 + que51 + que52 + que53;
  }

  printForm() {
    let element = document.getElementById('print-form-content');
    let opt = {
      margin: 1,
      filename: localStorage.getItem('CisCaseActivityId'),
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all', before: '#page2el' }
    };
    const pdf = html2pdf().from(element).set(opt).save();
  }

  rowMethod(event) {
    if (!isNullOrUndefined(event)) {
      let singleNewLineCount = this._openCards.search_word(event, "\n");
      let doubleNewLineCount = this._openCards.search_word(event, "\n\n");
      return Math.ceil((event.length / 160) + (singleNewLineCount - doubleNewLineCount));
      
    }
    else {
      return 3;
    }
  }


}
