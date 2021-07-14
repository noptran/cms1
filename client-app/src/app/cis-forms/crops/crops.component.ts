import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CisCrops } from './cis-crops';
import { OpencardsService } from '../../opecards-list-view/opencards.service';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';


@Component({
  selector: 'app-crops',
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['cropsOut', 'cancelOut'],
  providers: [MessageService]
})
export class CropsComponent implements OnInit {
  unableToAccesForm: FormGroup;
  cropsForm: FormGroup;
  cisCrops: CisCrops = new CisCrops();

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
  cropsOut = new EventEmitter();
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
      { label: 'CROPS', active: 'active' }
    );

    this.getJson();
  }

  calculate() {
    
    this.cropsCalculation();
    
  }

  cropsCalculation() {
    this.cisCrops.BTotal.value = 0;
    for (let i = 1; i <= 26; i++) {
      if (i === 24) continue;
      if (this.cisCrops["CROPS_Question" + i].fieldOptionIndex === "0") {
        this.cisCrops.BTotal.value += 0;
      }
      else if (this.cisCrops["CROPS_Question" + i].fieldOptionIndex === "1") {
        this.cisCrops.BTotal.value += 1;
      }
      else if (this.cisCrops["CROPS_Question" + i].fieldOptionIndex === "2") {
        this.cisCrops.BTotal.value += 2;
      }
    }
  }

  formValidation() {
    this.cropsForm = this._fb.group({
      CROPS_Question42: [null],
      CROPS_Question43: [null],
      program: [null],
      ClientName: [null],
      kaecses: [null],
      remarksField: [null],
      
      id: [null],
      validationFields: [null],
      CROPS_Question13: [null],
      CROPS_Question14: [null],
      CROPS_Question15: [null],
      CROPS_Question16: [null],
      CROPS_Question10: [null],
      CROPS_Question11: [null],
      referralId: [null],
      created: [null],
      CROPS_Question12: [null],
      StressfulEventID: [null],
      CROPS_Question17: [null],
      CROPS_Question18: [null],
      CROPS_Question19: [null],
      StaffName: [null],
      name: [null],
      _id: [null],
      updated: [null],
      uploadFileDate: [null],
      status: [null],
      CROPS_Question24: [null],
      CROPS_Question25: [null],
      CROPS_Question26: [null],
      CROPS_Question27: [null],
      finalizedDate: [null],
      CROPS_Question20: [null],
      CROPS_Question21: [null],
      StaffID: [null],
      CROPS_Question22: [null],
      disableValidationFields: [null],
      CROPS_Question23: [null],
      _rev: [null],
      CROPS_Question28: [null],
      CROPS_Question29: [null],
      BTotal: [null],
      file: [null],
      formName: [null],
      staffName: [null],
      CROPS_Question30: [null],
      CompletionDate: [null],
      Age: [null],
      CROPS_Question35: [null],
      CROPS_Question36: [null],
      CROPS_Question37: [null],
      clientId: [null],
      CROPS_Question38: [null],
      CROPS_Question31: [null],
      PDFDoc: [null],
      CROPS_Question32: [null],
      CROPS_Question33: [null],
      CROPS_Question1: [null],
      CROPS_Question34: [null],
      CTotal: [null],
      CROPS_Question39: [null],
      CROPS_Question2: [null],
      CROPS_Question3: [null],
      CROPS_Question4: [null],
      CROPS_Question40: [null],
      CROPS_Question5: [null],
      CROPS_Question6: [null],
      CROPS_Question7: [null],
      CROPS_Question8: [null],
      remarks: [null],
      staffId: [null],
      CROPS_Question9: [null],
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
     
        this.cisCrops = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
    
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;
   
        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;
         
        }
        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;
      
        loader.style.display = 'none';
        this.cropsForm.disable();
        this.unableToAccesForm.disable();
        this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.cropsForm.changedBy) ? data.cropsForm.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.cropsForm.changedDate) ? moment(data.cropsForm.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.cropsForm.enteredBy) ? data.cropsForm.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.cropsForm.enteredDate) ? moment(data.cropsForm.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

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
      this.cropsForm.disable();
      this.unableToAccesForm.disable();
    }
    else {

      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'Please Update the Latest Version' });
    }


  }

  editForm() {
      if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1 && this.isUnableToAccess === false) {

  
      this.editControll = false;
      if (this.cisCrops.disableValidate === true) {
       
        this.cropsForm.disable();
        this.unableToAccesForm.enable();
      }
      else {
     
        this.cropsForm.enable();
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
      this.cropsForm.disable();
    }



  }

  disableValidation(isDisableValidated) {
    if (isDisableValidated) {
     
      this.cropsForm.disable();
    }
    else {
     
      this.cropsForm.enable();
    }
  }

  discardForm() {
    
    this.cancelOut.emit();

  }

  handleDataField(event) {
   
    if (event === true) {

      
      this.cropsForm.reset();
      
      this.cisCrops.disableValidate = true;
      this.cropsForm.disable();
     

    }
    else {
      this.cisCrops.disableValidate = false;
      this.cisCrops.remarks = "";
      this.cropsForm.enable();
    }

  }

  saveRemarks(remarks) {
  
    // this.cisCrops.remarks.value = remarks.value;

  }

  rowMethod(event) {
    if (!isNullOrUndefined(event)) {
      let singleNewLineCount = this._openCards.search_word(event, "\n");
      let doubleNewLineCount = this._openCards.search_word(event, "\n\n");
      return Math.ceil((event.length / 145) + (singleNewLineCount - doubleNewLineCount));
      
    }
    else {
      return 3;
    }
  }

  printForm() {
    console.log('printForm');
  }


}
