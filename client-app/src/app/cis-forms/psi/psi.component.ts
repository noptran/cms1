import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CisPsi } from './cis-psi';
import { OpencardsService } from '../../opecards-list-view/opencards.service';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { Router } from '@angular/router';


import { isNullOrUndefined } from 'util';
import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';
import * as moment from 'moment';


@Component({
  selector: 'app-psi',
  templateUrl: './psi.component.html',
  styleUrls: ['./psi.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['psiOut', 'cancelOut'],
  providers: [MessageService]
})
export class PsiComponent implements OnInit {
  psiForm: FormGroup;
  unableToAccesForm: FormGroup;
  cisPsi: CisPsi = new CisPsi();

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

  @Output()
  psiOut = new EventEmitter();
  cancelOut = new EventEmitter();

  constructor(public _fb: FormBuilder, public _openCards: OpencardsService, public _router: Router, public _client: ClildFormService, public messageService: MessageService) { }

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
      { label: 'PSI', active: 'active' }
    );

    this.getJson();
  }

  calculate() {

    this.psiCalculation();
   
  }

  psiCalculation() {
    this.cisPsi.totalStress.value = 0;
    this.cisPsi.ParentDomain.value = 0;
    this.cisPsi.ParentChild.value = 0;
    this.cisPsi.DifficultChild.value = 0;
    this.cisPsi.DefensiveResponding.value = 0;
    this.defensiveResponding();
    this.totalStress();
    this.parentDomain();
    this.parentChild();
    this.difficultChild();
  }
  //defensive responding 
  defensiveResponding() {
    for (let i = 1; i <= 11; i++) {
      if (i === 4 || i === 4 || i === 5 || i === 6 || i === 10) {
        continue;
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "0") {
        this.cisPsi.DefensiveResponding.value += 5
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "1") {
        this.cisPsi.DefensiveResponding.value += 4
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "2") {
        this.cisPsi.DefensiveResponding.value += 3
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "3") {
        this.cisPsi.DefensiveResponding.value += 2
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "4") {
        this.cisPsi.DefensiveResponding.value += 1
      }
    }
  }
  //total stress calculation
  totalStress() {
    for (let i = 1; i <= 36; i++) {
      if (i === 22 || i === 32 || i === 33) {
        if ((this.cisPsi["Question" + i].fieldOptionIndex === "1")) {
          this.cisPsi.totalStress.value += 1
        }
        else if ((this.cisPsi["Question" + i].fieldOptionIndex === "2")) {
          this.cisPsi.totalStress.value += 2
        }
        else if ((this.cisPsi["Question" + i].fieldOptionIndex === "3")) {
          this.cisPsi.totalStress.value += 3
        }
        else if ((this.cisPsi["Question" + i].fieldOptionIndex === "4")) {
          this.cisPsi.totalStress.value += 4
        }
        else if ((this.cisPsi["Question" + i].fieldOptionIndex === "5")) {
          this.cisPsi.totalStress.value += 5
        }
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "0") {
        this.cisPsi.totalStress.value += 5
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "1") {
        this.cisPsi.totalStress.value += 4
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "2") {
        this.cisPsi.totalStress.value += 3
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "3") {
        this.cisPsi.totalStress.value += 2
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "4") {
        this.cisPsi.totalStress.value += 1
      }
    }
  }
  //parent domain calculation
  parentDomain() {
    for (let i = 1; i <= 12; i++) {
      if (this.cisPsi["Question" + i].fieldOptionIndex === "0") {
        this.cisPsi.ParentDomain.value += 5
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "1") {
        this.cisPsi.ParentDomain.value += 4
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "2") {
        this.cisPsi.ParentDomain.value += 3
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "3") {
        this.cisPsi.ParentDomain.value += 2
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "4") {
        this.cisPsi.ParentDomain.value += 1
      }
    }
  }
  //parent-child calculation
  parentChild() {
    for (let i = 13; i <= 24; i++) {
      if (i === 22) {
        if ((this.cisPsi["Question" + i].fieldOptionIndex === "1")) {
          this.cisPsi.ParentChild.value += 1
        }
        else if ((this.cisPsi["Question" + i].fieldOptionIndex === "2")) {
          this.cisPsi.ParentChild.value += 2
        }
        else if ((this.cisPsi["Question" + i].fieldOptionIndex === "3")) {
          this.cisPsi.ParentChild.value += 3
        }
        else if ((this.cisPsi["Question" + i].fieldOptionIndex === "4")) {
          this.cisPsi.ParentChild.value += 4
        }
        else if ((this.cisPsi["Question" + i].fieldOptionIndex === "5")) {
          this.cisPsi.ParentChild.value += 5
        }
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "0") {
        this.cisPsi.ParentChild.value += 5
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "1") {
        this.cisPsi.ParentChild.value += 4
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "2") {
        this.cisPsi.ParentChild.value += 3
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "3") {
        this.cisPsi.ParentChild.value += 2
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "4") {
        this.cisPsi.ParentChild.value += 1
      }
    }
  }
  //Difficult Child calculation
  difficultChild() {
    for (let i = 25; i <= 36; i++) {
      if (i === 32 || i === 33) {
        if ((this.cisPsi["Question" + i].fieldOptionIndex === "1")) {
          this.cisPsi.DifficultChild.value += 1
        }
        else if ((this.cisPsi["Question" + i].fieldOptionIndex === "2")) {
          this.cisPsi.DifficultChild.value += 2
        }
        else if ((this.cisPsi["Question" + i].fieldOptionIndex === "3")) {
          this.cisPsi.DifficultChild.value += 3
        }
        else if ((this.cisPsi["Question" + i].fieldOptionIndex === "4")) {
          this.cisPsi.DifficultChild.value += 4
        }
        else if ((this.cisPsi["Question" + i].fieldOptionIndex === "5")) {
          this.cisPsi.DifficultChild.value += 5
        }
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "0") {
        this.cisPsi.DifficultChild.value += 5
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "1") {
        this.cisPsi.DifficultChild.value += 4
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "2") {
        this.cisPsi.DifficultChild.value += 3
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "3") {
        this.cisPsi.DifficultChild.value += 2
      }
      else if (this.cisPsi["Question" + i].fieldOptionIndex === "4") {
        this.cisPsi.DifficultChild.value += 1
      }
    }
  }

  formValidation() {
    this.psiForm = this._fb.group({
      date: [null],
      program: [null],
      Gender: [null],
      Question10: [null],
      showMultiClient: [null],
      Question11: [null],
      ClientName: [null],
      Question12: [null],
      remarksField: [null],
      ParentEthnicGroup: [null],
      Question17: [null],
      Question18: [null],
      Question19: [null],
      // disableValidate: [null],
      id: [null],
      Question13: [null],
      Question14: [null],
      Question15: [null],
      validationFields: [null],
      Question16: [null],
      DateOfBirth: [null],
      RelationToClientOther: [null],
      referralId: [null],
      created: [null],
      multiClientArr: [null],
      ParentChild: [null],
      totalStress: [null],
      MaritalStatus: [null],
      name: [null],
      _id: [null],
      DefensiveResponding: [null],
      updated: [null],
      uploadFileDate: [null],
      status: [null],
      finalizedDate: [null],
      Question9: [null],
      Question8: [null],
      Question7: [null],
      disableValidationFields: [null],
      Question6: [null],
      ClientName5: [null],
      _rev: [null],
      ClientName4: [null],
      ClientName3: [null],
      ClientName2: [null],
      ParentName: [null],
      facts: [null],
      Question31: [null],
      Question32: [null],
      Question33: [null],
      Question34: [null],
      file: [null],
      ParentDOB: [null],
      formName: [null],
      Question30: [null],
      Question5: [null],
      staffName: [null],
      Question4: [null],
      Question3: [null],
      multiClientValue: [null],
      multiClient: [null],
      Question2: [null],
      Question1: [null],
      Question35: [null],
      DifficultChild: [null],
      Question36: [null],
      ParentDomain: [null],
      clientId: [null],
      PDFDoc: [null],
      CareGiverRelationToClient: [null],
      AdditionalClients: [null],
      Question20: [null],
      Question21: [null],
      Question22: [null],
      Question23: [null],
      ClientName9: [null],
      ParentGender: [null],
      ClientName8: [null],
      AdditionalRefClients: [null],
      ClientName7: [null],
      ClientName6: [null],
      Question28: [null],
      Question29: [null],
      Question24: [null],
      Question25: [null],
      Question26: [null],
      remarks: [null],
      staffId: [null],
      Question27: [null]
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
      
        this.cisPsi = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;
        
        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;

        }



        if (this.cisPsi.ParentDOB.value !== "") {
          this.cisPsi.ParentDOB.value = !isNullOrUndefined(this.cisPsi.ParentDOB.value) ? this.cisPsi.ParentDOB.value = new Date(this.cisPsi.ParentDOB.value) : null;

        }
        if (this.cisPsi.date.value !== "") {
          this.cisPsi.date.value = !isNullOrUndefined(this.cisPsi.date.value) ? this.cisPsi.date.value = new Date(this.cisPsi.date.value) : null;

        }
    
        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;
        
        loader.style.display = 'none';
        this.psiForm.disable();
        this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.cisPsi.changedBy) ? data.cisPsi.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.cisPsi.changedDate) ? moment(data.cisPsi.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.cisPsi.enteredBy) ? data.cisPsi.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.cisPsi.enteredDate) ? moment(data.cisPsi.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


        this.unableToAccesForm.disable();
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
      this.psiForm.disable();
    }
    else {

      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'Please Update the Latest Version' });
    }


  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1 && this.isUnableToAccess === false) {

      
      this.editControll = false;
      if (this.cisPsi.disableValidate === true) {
       
        this.psiForm.disable();
        this.unableToAccesForm.enable();
      }
      else {
       
        this.psiForm.enable();
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
      this.psiForm.disable();
    }



  }

  disableValidation(isDisableValidated) {
    if (isDisableValidated) {
      
      this.psiForm.disable();
    }
    else {
      
      this.psiForm.enable();
    }
  }

  discardForm() {
   
    this.cancelOut.emit();

  }

  handleDataField(event) {
  
    if (event === true) {

   
      this.psiForm.reset();
     
      this.cisPsi.disableValidate = true;
      this.psiForm.disable();
     

    }
    else {
      this.cisPsi.disableValidate = false;
      this.cisPsi.remarks = "";
      this.psiForm.enable();
    }
   
  }

  saveRemarks(remarks) {
    console.log("remarks in saveRemarks is", remarks);
 
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

  printForm() {
    console.log('printForm');
  }

}
