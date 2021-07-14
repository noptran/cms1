import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Pecfas } from './pecfas';
import { OpencardsService } from '../../opecards-list-view/opencards.service';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { Router } from '@angular/router';


import { isNullOrUndefined } from 'util';
import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';
import * as moment from 'moment';


@Component({
  selector: 'app-pecfas',
  templateUrl: './pecfas.component.html',
  styleUrls: ['./pecfas.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['pecfasOut', 'cancelOut'],
  providers: [MessageService]
})
export class PecfasComponent implements OnInit {
  pecfasForm: FormGroup;
  unableToAccesForm: FormGroup;
  cisPecfas: Pecfas = new Pecfas();

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
      { label: 'PECFAS', active: 'active' }
    );

    this.getJson();
  }

  formValidation() {
    this.pecfasForm = this._fb.group({
      name: [null],
      program: [null],
      clientId: [null],
      formName: [null],
      validationFields: [null],
      disableValidationFields: [null],
      multiClient: [null],
      PEFASAdmin: [null],
      ContactPerson: [null],
      PhoneContact: [null],
      TextBox1: [null],
      TextBox2: [null],
      TextBox4: [null],
      TextBox5: [null],
      TextBox3: [null],
      TextBox6: [null],
      TextBox7: [null],
      Rater: [null],
      TimePeriod: [null],
      LivingArrangement: [null],
      OutOfHome: [null],
      Gender: [null],
      AdmissionDate: [null],
      DateOfBirth: [null],
      Age: [null],
      School: [null],
      ReviewofDocumentation: [null],
      School1: [null],
      School2: [null],
      School3: [null],
      School4: [null],
      School5: [null],
      School6: [null],
      School7: [null],
      School8: [null],
      School10: [null],
      School11: [null],
      School12: [null],
      School13: [null],
      School14: [null],
      School15: [null],
      School17: [null],
      School18: [null],
      School19: [null],
      School20: [null],
      School21: [null],
      School22: [null],
      School23: [null],
      School24: [null],
      School25: [null],
      School26: [null],
      School27: [null],
      School28: [null],
      Home31: [null],
      Home32: [null],
      Home33: [null],
      Home34: [null],
      Home35: [null],
      Home36: [null],
      Home37: [null],
      Home39: [null],
      Home40: [null],
      Home41: [null],
      Home42: [null],
      Home43: [null],
      Home44: [null],
      Home46: [null],
      Home47: [null],
      Home48: [null],
      Home49: [null],
      Home50: [null],
      Home51: [null],
      Home52: [null],
      Home54: [null],
      Home55: [null],
      Home56: [null],
      Community59: [null],
      Community60: [null],
      Community61: [null],
      Community62: [null],
      Community63: [null],
      Community64: [null],
      Community67: [null],
      Community68: [null],
      Community69: [null],
      Community70: [null],
      Community72: [null],
      Community73: [null],
      Community74: [null],
      Community76: [null],
      Community77: [null],
      Behavior80: [null],
      Behavior81: [null],
      Behavior82: [null],
      Behavior83: [null],
      Behavior84: [null],
      Behavior86: [null],
      Behavior87: [null],
      Behavior88: [null],
      Behavior89: [null],
      Behavior90: [null],
      Behavior91: [null],
      Behavior92: [null],
      Behavior93: [null],
      Behavior95: [null],
      Behavior96: [null],
      Behavior97: [null],
      Behavior98: [null],
      Behavior99: [null],
      Behavior100: [null],
      Behavior101: [null],
      Behavior102: [null],
      Behavior103: [null],
      Behavior104: [null],
      Behavior105: [null],
      Behavior106: [null],
      Behavior107: [null],
      Behavior109: [null],
      Behavior110: [null],
      Behavior111: [null],
      Moods114: [null],
      Moods115: [null],
      Moods116: [null],
      Moods117: [null],
      Moods118: [null],
      Moods119: [null],
      Moods120: [null],
      Moods121: [null],
      Moods123: [null],
      Moods124: [null],
      Moods125: [null],
      Moods126: [null],
      Moods127: [null],
      Moods128: [null],
      Moods129: [null],
      Moods131: [null],
      Moods132: [null],
      Moods133: [null],
      Moods134: [null],
      Moods135: [null],
      Moods136: [null],
      Moods137: [null],
      Moods138: [null],
      Moods139: [null],
      Moods140: [null],
      Moods142: [null],
      Moods143: [null],
      Moods144: [null],
      Moods145: [null],
      Moods146: [null],
      Moods147: [null],
      SelfHarm150: [null],
      SelfHarm151: [null],
      SelfHarm152: [null],
      SelfHarm154: [null],
      SelfHarm155: [null],
      SelfHarm159: [null],
      SelfHarm157: [null],
      Thinking162: [null],
      Thinking163: [null],
      Thinking164: [null],
      Thinking165: [null],
      Thinking166: [null],
      Thinking167: [null],
      Thinking168: [null],
      Thinking170: [null],
      Thinking171: [null],
      Thinking172: [null],
      Thinking173: [null],
      Thinking174: [null],
      Thinking175: [null],
      Thinking177: [null],
      Thinking178: [null],
      Thinking179: [null],
      Thinking180: [null],
      Thinking182: [null],
      PEC_TOTAL: [null],
      CompletionDate: [null],
      StaffName: [null],
      Comment1: [null],
      PEC_SCHOOL: [null],
      PEC_HOME: [null],
      PEC_COMMUNITY: [null],
      PEC_BEHAVIOR: [null],
      PEC_MOODS: [null],
      PEC_SELFHARM: [null],
      PEC_COMMUNICATION: [null],
      ClientName: [null],
    
      remarks: [null],
      staffName: [null],
      referralId: [null],
      created: [null],
      status: [null],
      updated: [null],
      _id: [null],
      _rev: [null],
      id: [null],
      remarksField: [null],
      file: [null],
      uploadFileDate: [null],
      finalizedDate: [null],
      staffId: [null],
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
     
        this.cisPecfas = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;
     
        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;

         
        }

  

        if (this.cisPecfas.CompletionDate.value !== "") {
          this.cisPecfas.CompletionDate.value = !isNullOrUndefined(this.cisPecfas.CompletionDate.value) ? this.cisPecfas.CompletionDate.value = new Date(this.cisPecfas.CompletionDate.value) : null;

        }
        if (this.cisPecfas.AdmissionDate.value !== "") {
          this.cisPecfas.AdmissionDate.value = !isNullOrUndefined(this.cisPecfas.AdmissionDate.value) ? this.cisPecfas.AdmissionDate.value = new Date(this.cisPecfas.AdmissionDate.value) : null;

        }
        if (this.cisPecfas.DateOfBirth.value !== "") {
          this.cisPecfas.DateOfBirth.value = !isNullOrUndefined(this.cisPecfas.DateOfBirth.value) ? this.cisPecfas.DateOfBirth.value = new Date(this.cisPecfas.DateOfBirth.value) : null;

        }
      
        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;
       
        loader.style.display = 'none';
        this.pecfasForm.disable();
        this.unableToAccesForm.disable();
        this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.pecfasForm.changedBy) ? data.pecfasForm.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.pecfasForm.changedDate) ? moment(data.pecfasForm.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.pecfasForm.enteredBy) ? data.pecfasForm.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.pecfasForm.enteredDate) ? moment(data.pecfasForm.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

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
      this.pecfasForm.disable();
    }
    else {

      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'Please Update the Latest Version' });
    }


  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1 && this.isUnableToAccess === false) {

     
      this.editControll = false;
      if (this.cisPecfas.disableValidate === true) {
        
        this.pecfasForm.disable();
        this.unableToAccesForm.enable();
      }
      else {
        
        this.pecfasForm.enable();
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
      this.pecfasForm.disable();
    }



  }

  disableValidation(isDisableValidated) {
    if (isDisableValidated) {
     
      this.pecfasForm.disable();
    }
    else {
    
      this.pecfasForm.enable();
    }
  }

  discardForm() {

    this.cancelOut.emit();

  }

  handleDataField(event) {
  
    if (event === true) {

      
      this.pecfasForm.reset();
      
      this.cisPecfas.disableValidate = true;
      this.pecfasForm.disable();
      
    }
    else {
      this.cisPecfas.disableValidate = false;
      this.cisPecfas.remarks = "";
      this.pecfasForm.enable();
    }
   
  }

  saveRemarks(remarks) {
    console.log("remarks in saveRemarks is", remarks);
   
  }

  calculate() {
   
    this.pecfasCalculation();
    
  }

  pecfasCalculation() {
    for (let i = 1; i <= 182; i++) {
      if (i === 29 || i === 30 || i === 57 || i === 58 || i === 78 || i === 79 || i === 112 || i === 113 || i === 148 || i === 149 || i === 160 || i === 161) {
        continue;
      }
      // school subscale performance
      if (i <= 8) {
        if (((this.cisPecfas["School" + i].fieldOptionIndex) === true) || (this.cisPecfas["School" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_SCHOOL.value = 30;
          i = 30;
        } else {
          this.cisPecfas.PEC_SCHOOL.value = "";
        }
      } else if (i >= 10 && i <= 15) {
        if (((this.cisPecfas["School" + i].fieldOptionIndex) === true) || (this.cisPecfas["School" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_SCHOOL.value = 20;
          i = 30;
        } else {
          this.cisPecfas.PEC_SCHOOL.value = "";
        }
      } else if (i >= 17 && i <= 21) {
        if (((this.cisPecfas["School" + i].fieldOptionIndex) === true) || (this.cisPecfas["School" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_SCHOOL.value = 10;
          i = 30;
        } else {
          this.cisPecfas.PEC_SCHOOL.value = "";
        }
      } else if (i >= 23 && i <= 28) {
        if (((this.cisPecfas["School" + i].fieldOptionIndex) === true) || (this.cisPecfas["School" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_SCHOOL.value = 0;
          i = 30;
        } else {
          this.cisPecfas.PEC_SCHOOL.value = "";
        }
      }
      // home subscale performance
      else if (i >= 31 && i <= 37) {
        if (((this.cisPecfas["Home" + i].fieldOptionIndex) === true) || (this.cisPecfas["Home" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_HOME.value = 30;
          i = 58;
        } else {
          this.cisPecfas.PEC_HOME.value = "";
        }
      }
      else if (i >= 39 && i <= 44) {
        if (((this.cisPecfas["Home" + i].fieldOptionIndex) === true) || (this.cisPecfas["Home" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_HOME.value = 20; i = 58;
        } else {
          this.cisPecfas.PEC_HOME.value = "";
        }
      }
      else if (i >= 46 && i <= 52) {
        if (((this.cisPecfas["Home" + i].fieldOptionIndex) === true) || (this.cisPecfas["Home" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_HOME.value = 10; i = 58;
        } else {
          this.cisPecfas.PEC_HOME.value = "";
        }
      }
      else if (i >= 54 && i <= 56) {
        if (((this.cisPecfas["Home" + i].fieldOptionIndex) === true) || (this.cisPecfas["Home" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_HOME.value = 0; i = 58;
        } else {
          this.cisPecfas.PEC_HOME.value = "";
        }
      }
      //community
      else if (i >= 59 && i <= 64) {
        if (((this.cisPecfas["Community" + i].fieldOptionIndex) === true) || (this.cisPecfas["Community" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_COMMUNITY.value = 30; i = 79;
        } else {
          this.cisPecfas.PEC_COMMUNITY.value = "";
        }
      }
      else if (i >= 67 && i <= 70) {
        if (((this.cisPecfas["Community" + i].fieldOptionIndex) === true) || (this.cisPecfas["Community" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_COMMUNITY.value = 20; i = 79;
        } else {
          this.cisPecfas.PEC_COMMUNITY.value = "";
        }
      }
      else if (i >= 72 && i <= 74) {
        if (((this.cisPecfas["Community" + i].fieldOptionIndex) === true) || (this.cisPecfas["Community" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_COMMUNITY.value = 10; i = 79;
        } else {
          this.cisPecfas.PEC_COMMUNITY.value = "";
        }
      }
      else if (i >= 76 && i <= 77) {
        if (((this.cisPecfas["Community" + i].fieldOptionIndex) === true) || (this.cisPecfas["Community" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_COMMUNITY.value = 0; i = 79;
        } else {
          this.cisPecfas.PEC_COMMUNITY.value = "";
        }
      }
      //behavior
      else if (i >= 80 && i <= 84) {
        if (((this.cisPecfas["Behavior" + i].fieldOptionIndex) === true) || (this.cisPecfas["Behavior" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_BEHAVIOR.value = 30; i = 113;
        } else {
          this.cisPecfas.PEC_BEHAVIOR.value = "";
        }
      }
      else if (i >= 86 && i <= 93) {
        if (((this.cisPecfas["Behavior" + i].fieldOptionIndex) === true) || (this.cisPecfas["Behavior" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_BEHAVIOR.value = 20; i = 113;
        } else {
          this.cisPecfas.PEC_BEHAVIOR.value = "";
        }
      }
      else if (i >= 95 && i <= 107) {
        if (((this.cisPecfas["Behavior" + i].fieldOptionIndex) === true) || (this.cisPecfas["Behavior" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_BEHAVIOR.value = 10; i = 113;
        } else {
          this.cisPecfas.PEC_BEHAVIOR.value = "";
        }
      }
      else if (i >= 109 && i <= 111) {
        if (((this.cisPecfas["Behavior" + i].fieldOptionIndex) === true) || (this.cisPecfas["Behavior" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_BEHAVIOR.value = 0; i = 113;
        } else {
          this.cisPecfas.PEC_BEHAVIOR.value = "";
        }
      }
      //moods/emotions
      else if (i >= 114 && i <= 121) {
        if (((this.cisPecfas["Moods" + i].fieldOptionIndex) === true) || (this.cisPecfas["Moods" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_MOODS.value = 30; i = 149;
        } else {
          this.cisPecfas.PEC_MOODS.value = "";
        }
      }
      else if (i >= 123 && i <= 129) {
        if (((this.cisPecfas["Moods" + i].fieldOptionIndex) === true) || (this.cisPecfas["Moods" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_MOODS.value = 20; i = 149;
        } else {
          this.cisPecfas.PEC_MOODS.value = "";
        }
      }
      else if (i >= 131 && i <= 140) {
        if (((this.cisPecfas["Moods" + i].fieldOptionIndex) === true) || (this.cisPecfas["Moods" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_MOODS.value = 10; i = 149;
        } else {
          this.cisPecfas.PEC_MOODS.value = "";
        }
      }
      else if (i >= 142 && i <= 147) {
        if (((this.cisPecfas["Moods" + i].fieldOptionIndex) === true) || (this.cisPecfas["Moods" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_MOODS.value = 0; i = 149;
        } else {
          this.cisPecfas.PEC_MOODS.value = "";
        }
      }
      //selfharmful
      else if (i >= 150 && i <= 152) {
        if (((this.cisPecfas["SelfHarm" + i].fieldOptionIndex) === true) || (this.cisPecfas["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_SELFHARM.value = 30; i = 161;
        } else {
          this.cisPecfas.PEC_SELFHARM.value = "";
        }
      }
      else if (i >= 154 && i <= 155) {
        if (((this.cisPecfas["SelfHarm" + i].fieldOptionIndex) === true) || (this.cisPecfas["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_SELFHARM.value = 20; i = 161;
        } else {
          this.cisPecfas.PEC_SELFHARM.value = "";
        }
      }
      else if (i === 157) {
        if (((this.cisPecfas["SelfHarm" + i].fieldOptionIndex) === true) || (this.cisPecfas["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_SELFHARM.value = 10; i = 161;
        } else {
          this.cisPecfas.PEC_SELFHARM.value = "";
        }
      }
      else if (i === 159) {
        if (((this.cisPecfas["SelfHarm" + i].fieldOptionIndex) === true) || (this.cisPecfas["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_SELFHARM.value = 0; i = 161;
        } else {
          this.cisPecfas.PEC_SELFHARM.value = "";
        }
      }
      //thinking
      else if (i >= 162 && i <= 168) {
        if (((this.cisPecfas["Thinking" + i].fieldOptionIndex) === true) || (this.cisPecfas["Thinking" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_COMMUNICATION.value = 30; i = 183;
        } else {
          this.cisPecfas.PEC_COMMUNICATION.value = "";
        }
      }
      else if (i >= 170 && i <= 175) {
        if (((this.cisPecfas["Thinking" + i].fieldOptionIndex) === true) || (this.cisPecfas["Thinking" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_COMMUNICATION.value = 20; i = 183;
        } else {
          this.cisPecfas.PEC_COMMUNICATION.value = "";
        }
      }
      else if (i >= 177 && i <= 180) {
        if (((this.cisPecfas["Thinking" + i].fieldOptionIndex) === true) || (this.cisPecfas["Thinking" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_COMMUNICATION.value = 10; i = 183;
        } else {
          this.cisPecfas.PEC_COMMUNICATION.value = "";
        }
      }
      else if (i === 182) {
        if (((this.cisPecfas["Thinking" + i].fieldOptionIndex) === true) || (this.cisPecfas["Thinking" + i].fieldOptionIndex) === '1') {
          this.cisPecfas.PEC_COMMUNICATION.value = 0; i = 183;
        } else {
          this.cisPecfas.PEC_COMMUNICATION.value = "";
        }
      }
    }
    for (let i = 1; i <= 182; i++) {
      if (i >= 1 && i <= 28) {
        if (i === 9 || i === 16 || i === 22) {
          continue;
        }
        else {
          if ((this.cisPecfas["School" + i].fieldOptionIndex) === true) {
            this.cisPecfas["School" + i].fieldOptionIndex = "1";
          }
          if ((this.cisPecfas["School" + i].fieldOptionIndex) === false) {
            this.cisPecfas["School" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 31 && i <= 56) {
        if (i === 38 || i === 45 || i === 53) {
          continue;
        }
        else {
          if ((this.cisPecfas["Home" + i].fieldOptionIndex) === true) {
            this.cisPecfas["Home" + i].fieldOptionIndex = "1";
          }
          if ((this.cisPecfas["Home" + i].fieldOptionIndex) === false) {
            this.cisPecfas["Home" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 59 && i <= 77) {
        if (i === 65 || i === 66 || i === 71 || i === 75) {
          continue;
        }
        else {
          if ((this.cisPecfas["Community" + i].fieldOptionIndex) === true) {
            this.cisPecfas["Community" + i].fieldOptionIndex = "1";
          }
          if ((this.cisPecfas["Community" + i].fieldOptionIndex) === false) {
            this.cisPecfas["Community" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 80 && i <= 111) {
        if (i === 85 || i === 94 || i === 108) {
          continue;
        }
        else {
          if ((this.cisPecfas["Behavior" + i].fieldOptionIndex) === true) {
            this.cisPecfas["Behavior" + i].fieldOptionIndex = "1";
          }
          if ((this.cisPecfas["Behavior" + i].fieldOptionIndex) === false) {
            this.cisPecfas["Behavior" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 114 && i <= 147) {
        if (i === 122 || i === 130 || i === 141) {
          continue;
        }
        else {
          if ((this.cisPecfas["Moods" + i].fieldOptionIndex) === true) {
            this.cisPecfas["Moods" + i].fieldOptionIndex = "1";
          }
          if ((this.cisPecfas["Moods" + i].fieldOptionIndex) === false) {
            this.cisPecfas["Moods" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 150 && i <= 159) {
        if (i === 153 || i === 156 || i === 158) {
          continue;
        }
        else {
          if ((this.cisPecfas["SelfHarm" + i].fieldOptionIndex) === true) {
            this.cisPecfas["SelfHarm" + i].fieldOptionIndex = "1";
          }
          if ((this.cisPecfas["SelfHarm" + i].fieldOptionIndex) === false) {
            this.cisPecfas["SelfHarm" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 162 && i <= 182) {
        if (i === 169 || i === 176 || i === 181) {
          continue;
        }
        else {
          if ((this.cisPecfas["Thinking" + i].fieldOptionIndex) === true) {
            this.cisPecfas["Thinking" + i].fieldOptionIndex = "1";
          }
          if ((this.cisPecfas["Thinking" + i].fieldOptionIndex) === false) {
            this.cisPecfas["Thinking" + i].fieldOptionIndex = "";
          }
        }
      }
    }
    this.cisPecfas.PEC_TOTAL.value = parseInt(this.cisPecfas.PEC_COMMUNICATION.value) + parseInt(this.cisPecfas.PEC_SELFHARM.value) + parseInt(this.cisPecfas.PEC_MOODS.value) + parseInt(this.cisPecfas.PEC_BEHAVIOR.value) + parseInt(this.cisPecfas.PEC_COMMUNITY.value) + parseInt(this.cisPecfas.PEC_HOME.value) + parseInt(this.cisPecfas.PEC_SCHOOL.value);
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
