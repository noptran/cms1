import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CisCafas } from './cis-cafas';
import { OpencardsService } from '../../opecards-list-view/opencards.service';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { Router } from '@angular/router';


import { isNullOrUndefined } from 'util';
import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';
import * as moment from 'moment';


@Component({
  selector: 'app-cafas',
  templateUrl: './cafas.component.html',
  styleUrls: ['./cafas.component.scss'],
  outputs: ['cafasOut', 'cancelOut'],
  providers: [MessageService]
})

export class CafasComponent implements OnInit {
  model = {};
  unableToAccesForm: FormGroup;
  cafasForm: FormGroup;
  cisCafas: CisCafas = new CisCafas();

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
  cafasOut = new EventEmitter();
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
      { label: 'CAFAS', active: 'active' }
    );

    this.getJson();


  }

  formValidation() {
    this.cafasForm = this._fb.group({
      School20: [null],
      OtherReasonTextBox: [null],
      School24: [null],
      School25: [null],
      School22: [null],
      School23: [null],
      School28: [null],
      School29: [null],
      School26: [null],
      Gender: [null],
      Thinking198: [null],
      School31: [null],
      Comment1: [null],
      Community81: [null],
      School32: [null],
      Comment2: [null],
      Community82: [null],
      AdmissionDate: [null],
      School30: [null],
      Community80: [null],
      School35: [null],
      Community85: [null],
      Comment5: [null],
      School36: [null],
      CAF_HOME: [null],
      Comment6: [null],
      School33: [null],
      Comment3: [null],
      School34: [null],
      Community84: [null],
      Comment4: [null],
      CAF_TOTAL: [null],
      School37: [null],
      Comment7: [null],
      School38: [null],
      Comment8: [null],
      StaffName: [null],
      CAF_SELFHARM: [null],
      uploadFileDate: [null],
      Thinking182: [null],
      Thinking183: [null],
      Thinking184: [null],
      Thinking185: [null],

      staffName: [null],
      Thinking190: [null],
      School10: [null],
      Thinking191: [null],
      clientId: [null],
      Thinking193: [null],
      School13: [null],
      Thinking194: [null],
      School14: [null],
      Thinking195: [null],
      Thinking196: [null],
      School12: [null],
      School17: [null],
      School18: [null],
      School15: [null],
      School16: [null],
      School19: [null],
      SelfHarm151: [null],
      Thinking187: [null],
      Thinking188: [null],
      Thinking189: [null],
      CAF_COMMUNICATION: [null],
      Home41: [null],
      Home42: [null],
      Home43: [null],
      Home44: [null],
      remarksField: [null],
      Placement: [null],
      School2: [null],
      School3: [null],
      School1: [null],
      School6: [null],
      School7: [null],
      School4: [null],
      School5: [null],
      School8: [null],
      School9: [null],
      CAF_BEHAVIOR: [null],
      name: [null],
      updated: [null],
      Community70: [null],
      Community71: [null],
      finalizedDate: [null],
      Community74: [null],
      Community75: [null],
      Community73: [null],
      Community78: [null],
      Community76: [null],
      Community77: [null],
      Home57: [null],
      Home58: [null],
      Home59: [null],
      Home63: [null],
      Home60: [null],
      OtherTimePeriodTextBox: [null],
      Home62: [null],
      Age: [null],
      CAF_SCHOOL: [null],
      Home49: [null],
      Community67: [null],
      Community68: [null],
      Community66: [null],
      Home45: [null],
      Behavior98: [null],
      Home46: [null],
      Behavior97: [null],
      Home47: [null],
      Community69: [null],
      Home48: [null],
      Behavior99: [null],
      Home52: [null],
      Behavior94: [null],
      Home53: [null],
      Behavior93: [null],
      Home54: [null],
      Behavior96: [null],
      Home55: [null],
      Behavior95: [null],
      Behavior90: [null],
      Home51: [null],
      Behavior91: [null],
      staffId: [null],
      program: [null],
      Behavior89: [null],
      Behavior88: [null],
      Substance177: [null],
      Substance176: [null],
      Substance179: [null],
      Substance178: [null],
      id: [null],
      DateOfBirth: [null],
      TimePeriod: [null],
      Moods138: [null],
      Moods139: [null],
      Moods136: [null],
      Moods137: [null],
      Moods134: [null],
      Moods132: [null],
      Moods133: [null],
      Moods130: [null],
      Moods131: [null],
      status: [null],
      file: [null],
      formName: [null],
      CompletionDate: [null],
      PDFDoc: [null],
      CAF_MOODS: [null],
      SelfHarm147: [null],
      SelfHarm149: [null],
      SelfHarm144: [null],
      SelfHarm143: [null],
      SelfHarm146: [null],
      CAFASAdmin: [null],
      ClientName: [null],
      Behavior100: [null],
      SelfHarm142: [null],

      created: [null],
      _id: [null],
      CAF_SUBSTANCE_USE: [null],
      Substance162: [null],
      _rev: [null],
      Substance161: [null],
      Behavior113: [null],
      Behavior112: [null],
      Substance160: [null],
      Substance159: [null],
      Substance158: [null],
      Moods129: [null],
      Substance155: [null],
      Moods128: [null],
      Substance154: [null],
      Moods125: [null],
      Substance157: [null],
      Moods126: [null],
      Substance156: [null],
      Moods123: [null],
      Moods124: [null],
      Moods121: [null],
      Moods122: [null],
      Behavior109: [null],
      Behavior104: [null],
      Substance173: [null],
      Behavior103: [null],
      Substance172: [null],
      Behavior101: [null],
      Behavior108: [null],
      Behavior107: [null],
      Behavior106: [null],
      Behavior105: [null],
      Substance169: [null],
      Moods118: [null],
      Moods119: [null],
      Moods116: [null],
      Behavior111: [null],
      Substance166: [null],
      Moods117: [null],
      Substance165: [null],
      Substance168: [null],
      Substance167: [null],
      CAF_COMMUNITY: [null],

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

        this.cisCafas = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);

        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;

        }



        if (this.cisCafas.CompletionDate.value !== "") {
          this.cisCafas.CompletionDate.value = !isNullOrUndefined(this.cisCafas.CompletionDate.value) ? this.cisCafas.CompletionDate.value = new Date(this.cisCafas.CompletionDate.value) : null;

        }
        if (this.cisCafas.DateOfBirth.value !== "") {
          this.cisCafas.DateOfBirth.value = !isNullOrUndefined(this.cisCafas.DateOfBirth.value) ? this.cisCafas.DateOfBirth.value = new Date(this.cisCafas.DateOfBirth.value) : null;

        }
        if (this.cisCafas.AdmissionDate.value !== "") {
          this.cisCafas.AdmissionDate.value = !isNullOrUndefined(this.cisCafas.AdmissionDate.value) ? this.cisCafas.AdmissionDate.value = new Date(this.cisCafas.AdmissionDate.value) : null;

        }

        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;

        loader.style.display = 'none';
        this.cafasForm.disable();
        this.unableToAccesForm.disable();
        this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.cafasForm.changedBy) ? data.cafasForm.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.cafasForm.changedDate) ? moment(data.cafasForm.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.cafasForm.enteredBy) ? data.cafasForm.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.cafasForm.enteredDate) ? moment(data.cafasForm.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      })

  }

  calculate() {

    this.cafasCalculation();

  }

  cafasCalculation() {
    for (let i = 1; i <= 198; i++) {
      if (i === 197 || i === 192 || i === 39 || i === 40 || i === 64 || i === 65 || i === 86 || i === 87 || i === 114 || i === 115 || i === 140 || i === 141 || i === 152 || i === 153 || i === 180 || i === 181) {
        continue;
      }
      // school subscale performance
      if (i <= 10) {
        if (((this.cisCafas["School" + i].fieldOptionIndex) === true) || (this.cisCafas["School" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_SCHOOL.value = 30; i = 40;
        }
        else {
          this.cisCafas.CAF_SCHOOL.value = "";
        }
      } else if (i >= 12 && i <= 20) {
        if (((this.cisCafas["School" + i].fieldOptionIndex) === true) || (this.cisCafas["School" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_SCHOOL.value = 20; i = 40;
        }
        else {
          this.cisCafas.CAF_SCHOOL.value = "";
        }
      } else if (i >= 22 && i <= 26) {
        if (((this.cisCafas["School" + i].fieldOptionIndex) === true) || (this.cisCafas["School" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_SCHOOL.value = 10; i = 40;
        }
        else {
          this.cisCafas.CAF_SCHOOL.value = "";
        }
      } else if (i >= 28 && i <= 38) {
        if (((this.cisCafas["School" + i].fieldOptionIndex) === true) || (this.cisCafas["School" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_SCHOOL.value = 0; i = 40;
        }
        else {
          this.cisCafas.CAF_SCHOOL.value = "";
        }
      }
      // home subscale performance
      else if (i >= 41 && i <= 49) {
        if (((this.cisCafas["Home" + i].fieldOptionIndex) === true) || (this.cisCafas["Home" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_HOME.value = 30; i = 65;
        } else {
          this.cisCafas.CAF_HOME.value = "";
        }
      }
      else if (i >= 51 && i <= 55) {
        if (((this.cisCafas["Home" + i].fieldOptionIndex) === true) || (this.cisCafas["Home" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_HOME.value = 20; i = 65;
        } else {
          this.cisCafas.CAF_HOME.value = "";
        }
      }
      else if (i >= 57 && i <= 60) {
        if (((this.cisCafas["Home" + i].fieldOptionIndex) === true) || (this.cisCafas["Home" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_HOME.value = 10; i = 65;
        } else {
          this.cisCafas.CAF_HOME.value = "";
        }
      }
      else if (i >= 62 && i <= 63) {
        if (((this.cisCafas["Home" + i].fieldOptionIndex) === true) || (this.cisCafas["Home" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_HOME.value = 0; i = 65;
        } else {
          this.cisCafas.CAF_HOME.value = "";
        }
      }
      //community
      else if (i >= 66 && i <= 71) {
        if (((this.cisCafas["Community" + i].fieldOptionIndex) === true) || (this.cisCafas["Community" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_COMMUNITY.value = 30; i = 87;
        } else {
          this.cisCafas.CAF_COMMUNITY.value = "";
        }
      }
      else if (i >= 73 && i <= 78) {
        if (((this.cisCafas["Community" + i].fieldOptionIndex) === true) || (this.cisCafas["Community" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_COMMUNITY.value = 20; i = 87;
        } else {
          this.cisCafas.CAF_COMMUNITY.value = "";
        }
      }
      else if (i >= 80 && i <= 82) {
        if (((this.cisCafas["Community" + i].fieldOptionIndex) === true) || (this.cisCafas["Community" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_COMMUNITY.value = 10; i = 87;
        } else {
          this.cisCafas.CAF_COMMUNITY.value = "";
        }
      }
      else if (i >= 84 && i <= 85) {
        if (((this.cisCafas["Community" + i].fieldOptionIndex) === true) || (this.cisCafas["Community" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_COMMUNITY.value = 0; i = 87;
        } else {
          this.cisCafas.CAF_COMMUNITY.value = "";
        }
      }
      //behavior
      else if (i >= 88 && i <= 91) {
        if (((this.cisCafas["Behavior" + i].fieldOptionIndex) === true) || (this.cisCafas["Behavior" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_BEHAVIOR.value = 30; i = 115;
        } else {
          this.cisCafas.CAF_BEHAVIOR.value = "";
        }
      }
      else if (i >= 93 && i <= 101) {
        if (((this.cisCafas["Behavior" + i].fieldOptionIndex) === true) || (this.cisCafas["Behavior" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_BEHAVIOR.value = 20; i = 115;
        } else {
          this.cisCafas.CAF_BEHAVIOR.value = "";
        }
      }
      else if (i >= 103 && i <= 109) {
        if (((this.cisCafas["Behavior" + i].fieldOptionIndex) === true) || (this.cisCafas["Behavior" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_BEHAVIOR.value = 10; i = 115;
        } else {
          this.cisCafas.CAF_BEHAVIOR.value = "";
        }
      }
      else if (i >= 111 && i <= 113) {
        if (((this.cisCafas["Behavior" + i].fieldOptionIndex) === true) || (this.cisCafas["Behavior" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_BEHAVIOR.value = 0; i = 115;
        } else {
          this.cisCafas.CAF_BEHAVIOR.value = "";
        }
      }
      //moods/emotions
      else if (i >= 116 && i <= 119) {
        if (((this.cisCafas["Moods" + i].fieldOptionIndex) === true) || (this.cisCafas["Moods" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_MOODS.value = 30; i = 141;
        } else {
          this.cisCafas.CAF_MOODS.value = "";
        }
      }
      else if (i >= 121 && i <= 126) {
        if (((this.cisCafas["Moods" + i].fieldOptionIndex) === true) || (this.cisCafas["Moods" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_MOODS.value = 20; i = 141;
        } else {
          this.cisCafas.CAF_MOODS.value = "";
        }
      }
      else if (i >= 128 && i <= 134) {
        if (((this.cisCafas["Moods" + i].fieldOptionIndex) === true) || (this.cisCafas["Moods" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_MOODS.value = 10; i = 141;
        } else {
          this.cisCafas.CAF_MOODS.value = "";
        }
      }
      else if (i >= 136 && i <= 139) {
        if (((this.cisCafas["Moods" + i].fieldOptionIndex) === true) || (this.cisCafas["Moods" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_MOODS.value = 0; i = 141;
        } else {
          this.cisCafas.CAF_MOODS.value = "";
        }
      }
      //selfharmful
      else if (i >= 142 && i <= 144) {
        if (((this.cisCafas["SelfHarm" + i].fieldOptionIndex) === true) || (this.cisCafas["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_SELFHARM.value = 30; i = 153;
        } else {
          this.cisCafas.CAF_SELFHARM.value = "";
        }
      }
      else if (i >= 146 && i <= 147) {
        if (((this.cisCafas["SelfHarm" + i].fieldOptionIndex) === true) || (this.cisCafas["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_SELFHARM.value = 20; i = 153;
        } else {
          this.cisCafas.CAF_SELFHARM.value = "";
        }
      }
      else if (i === 149) {
        if (((this.cisCafas["SelfHarm" + i].fieldOptionIndex) === true) || (this.cisCafas["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_SELFHARM.value = 10; i = 153;
        } else {
          this.cisCafas.CAF_SELFHARM.value = "";
        }
      }
      else if (i === 151) {
        if (((this.cisCafas["SelfHarm" + i].fieldOptionIndex) === true) || (this.cisCafas["SelfHarm" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_SELFHARM.value = 0; i = 153;
        } else {
          this.cisCafas.CAF_SELFHARM.value = "";
        }
      }
      //substance
      else if (i >= 154 && i <= 162) {
        if (((this.cisCafas["Substance" + i].fieldOptionIndex) === true) || (this.cisCafas["Substance" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_SUBSTANCE_USE.value = 30; i = 181;
        } else {
          this.cisCafas.CAF_SUBSTANCE_USE.value = "";
        }
      }
      else if (i >= 165 && i <= 169) {
        if (((this.cisCafas["Substance" + i].fieldOptionIndex) === true) || (this.cisCafas["Substance" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_SUBSTANCE_USE.value = 20; i = 181;
        } else {
          this.cisCafas.CAF_SUBSTANCE_USE.value = "";
        }
      }
      else if (i >= 172 && i <= 173) {
        if (((this.cisCafas["Substance" + i].fieldOptionIndex) === true) || (this.cisCafas["Substance" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_SUBSTANCE_USE.value = 10; i = 181;
        } else {
          this.cisCafas.CAF_SUBSTANCE_USE.value = "";
        }
      }
      else if (i >= 176 && i <= 179) {
        if (((this.cisCafas["Substance" + i].fieldOptionIndex) === true) || (this.cisCafas["Substance" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_SUBSTANCE_USE.value = 0; i = 181;
        } else {
          this.cisCafas.CAF_SUBSTANCE_USE.value = "";
        }
      }
      //thinking
      else if (i >= 182 && i <= 185) {
        if (((this.cisCafas["Thinking" + i].fieldOptionIndex) === true) || (this.cisCafas["Thinking" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_COMMUNICATION.value = 30; i = 199;
        } else {
          this.cisCafas.CAF_COMMUNICATION.value = "";
        }
      }
      else if (i >= 187 && i <= 191) {
        if (((this.cisCafas["Thinking" + i].fieldOptionIndex) === true) || (this.cisCafas["Thinking" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_COMMUNICATION.value = 20; i = 199;
        } else {
          this.cisCafas.CAF_COMMUNICATION.value = "";
        }
      }
      else if (i >= 193 && i <= 196) {
        if (((this.cisCafas["Thinking" + i].fieldOptionIndex) === true) || (this.cisCafas["Thinking" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_COMMUNICATION.value = 10; i = 199;
        } else {
          this.cisCafas.CAF_COMMUNICATION.value = "";
        }
      }
      else if (i === 198) {
        if (((this.cisCafas["Thinking" + i].fieldOptionIndex) === true) || (this.cisCafas["Thinking" + i].fieldOptionIndex) === '1') {
          this.cisCafas.CAF_COMMUNICATION.value = 0; i = 199;
        } else {
          this.cisCafas.CAF_COMMUNICATION.value = "";
        }
      }
    }
    for (let i = 1; i <= 198; i++) {
      if (i >= 1 && i <= 38) {
        if (i === 11 || i === 21 || i === 27) {
          continue;
        }
        else {
          if ((this.cisCafas["School" + i].fieldOptionIndex) === true) {
            this.cisCafas["School" + i].fieldOptionIndex = "1";
          }
          if ((this.cisCafas["School" + i].fieldOptionIndex) === false) {
            this.cisCafas["School" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 41 && i <= 63) {
        if (i === 50 || i === 56 || i === 61) {
          continue;
        }
        else {

          if ((this.cisCafas["Home" + i].fieldOptionIndex) === true) {
            this.cisCafas["Home" + i].fieldOptionIndex = "1";
          }
          if ((this.cisCafas["Home" + i].fieldOptionIndex) === false) {
            this.cisCafas["Home" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 66 && i <= 85) {
        if (i === 72 || i === 79 || i === 83) {
          continue;
        }
        else {
          if ((this.cisCafas["Community" + i].fieldOptionIndex) === true) {
            this.cisCafas["Community" + i].fieldOptionIndex = "1";
          }
          if ((this.cisCafas["Community" + i].fieldOptionIndex) === false) {
            this.cisCafas["Community" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 88 && i <= 113) {
        if (i === 92 || i === 102 || i === 110) {
          continue;
        }
        else {
          if ((this.cisCafas["Behavior" + i].fieldOptionIndex) === true) {
            this.cisCafas["Behavior" + i].fieldOptionIndex = "1";
          }
          if ((this.cisCafas["Behavior" + i].fieldOptionIndex) === false) {
            this.cisCafas["Behavior" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 116 && i <= 139) {
        if (i === 120 || i === 127 || i === 135) {
          continue;
        }
        else {
          if ((this.cisCafas["Moods" + i].fieldOptionIndex) === true) {
            this.cisCafas["Moods" + i].fieldOptionIndex = "1";
          }
          if ((this.cisCafas["Moods" + i].fieldOptionIndex) === false) {
            this.cisCafas["Moods" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 142 && i <= 151) {
        if (i === 145 || i === 148 || i === 150) {
          continue;
        }
        else {
          if ((this.cisCafas["SelfHarm" + i].fieldOptionIndex) === true) {
            this.cisCafas["SelfHarm" + i].fieldOptionIndex = "1";
          }
          if ((this.cisCafas["SelfHarm" + i].fieldOptionIndex) === false) {
            this.cisCafas["SelfHarm" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 154 && i <= 179) {
        if (i === 163 || i === 170 || i === 171 || i === 174 || i === 175 || i === 164) {
          continue;
        }
        else {
          if ((this.cisCafas["Substance" + i].fieldOptionIndex) === true) {
            this.cisCafas["Substance" + i].fieldOptionIndex = "1";
          }
          if ((this.cisCafas["Substance" + i].fieldOptionIndex) === false) {
            this.cisCafas["Substance" + i].fieldOptionIndex = "";
          }
        }
      }
      else if (i >= 182 && i <= 198) {
        if (i === 186 || i === 192 || i === 197) {
          continue;
        }
        else {
          if ((this.cisCafas["Thinking" + i].fieldOptionIndex) === true) {
            this.cisCafas["Thinking" + i].fieldOptionIndex = "1";
          }
          if ((this.cisCafas["Thinking" + i].fieldOptionIndex) === false) {
            this.cisCafas["Thinking" + i].fieldOptionIndex = "";
          }
        }
      }
    }
    this.cisCafas.CAF_TOTAL.value = parseInt(this.cisCafas.CAF_SUBSTANCE_USE.value) + parseInt(this.cisCafas.CAF_COMMUNICATION.value) + parseInt(this.cisCafas.CAF_SELFHARM.value) + parseInt(this.cisCafas.CAF_MOODS.value) + parseInt(this.cisCafas.CAF_BEHAVIOR.value) + parseInt(this.cisCafas.CAF_COMMUNITY.value) + parseInt(this.cisCafas.CAF_HOME.value) + parseInt(this.cisCafas.CAF_SCHOOL.value);
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
      this.cafasForm.disable();
    }
    else {

      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'Please Update the Latest Version' });
    }


  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1 && this.isUnableToAccess === false) {

      this.editControll = false;

      if (this.cisCafas.disableValidate === true) {

        this.cafasForm.disable();
        this.unableToAccesForm.enable();
      }
      else {

        this.cafasForm.enable();
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
      this.cafasForm.disable();
    }



  }

  disableValidation(isDisableValidated) {
    if (isDisableValidated) {

      this.cafasForm.disable();
    }
    else {

      this.cafasForm.enable();
    }
  }

  discardForm() {

    this.cancelOut.emit();

  }

  handleDataField(event) {

    if (event === true) {

      this.cafasForm.disable();

      this.cafasForm.reset();

      this.cisCafas.disableValidate = true;

    }
    else {
      this.cafasForm.enable();
      this.cisCafas.remarks = "";
      this.cisCafas.disableValidate = false;
    }

  }

  rowMethod(event) {
    if (!isNullOrUndefined(event)) {
      let singleNewLineCount = this._openCards.search_word(event, "\n");
      let doubleNewLineCount = this._openCards.search_word(event, "\n\n");
      return Math.ceil((event.length / 135) + (singleNewLineCount - doubleNewLineCount));
      
    }
    else {
      return 3;
    }
  }

  printForm() {
    console.log('printForm');
  }


}
