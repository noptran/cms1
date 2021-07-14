import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CisAsq30 } from './cis-asq-30';
import { OpencardsService } from '../../opecards-list-view/opencards.service';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-asq-30-mo',
  templateUrl: './asq-30-mo.component.html',
  styleUrls: ['./asq-30-mo.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['asqThirtyOut', 'cancelOut'],
})
export class Asq30MoComponent implements OnInit {
  asqThirtyMoForm: FormGroup;
  unableToAccesForm: FormGroup;
  cisAsqThirtyMo: CisAsq30 = new CisAsq30();


  isPdfJsonID: any;
  update: any;
  editControll = true;
  isDisable = false;

  currentCisVersion: any;
  formJsonValue: any;
  cisFormJson: any;
  isCisJsonSaved = false;
  cisPdfJsonID: any;

  isFinalize = false;
  isFinalizeButton = false;
  cisPdfJsonIdFinalize: any;
  multiClientArr: any;
  isDisableFields = false;
  isUnableToAccess = false;

  @Output()
  asqThirtyOut = new EventEmitter();
  cancelOut = new EventEmitter();
  constructor(public _fb: FormBuilder, public _openCards: OpencardsService, public _router: Router, public _client: ClildFormService, public messageService: MessageService) { }

  ngOnInit() {
    this.formValidation();
    if (localStorage.getItem('isFinalized') === 'true') {
      this.isFinalize = false;
    }
    this.getJson();
  }

  formValidation() {
    this.asqThirtyMoForm = this._fb.group({
      name: [null],
      program: [null],

      formName: [null],
      totalQuestions: [null],
      lowRiskValue: [null],
      monitorValue: [null],

      CaregiverName: [null],
      Relationship: [null],
      Question10: [null],
      Question9: [null],
      Question8: [null],
      Question7: [null],
      Question6: [null],
      Question5: [null],
      Question4: [null],
      Question3: [null],
      Question2: [null],
      Question1: [null],
      Question18: [null],
      Question17: [null],
      Question16: [null],
      Question15: [null],
      Question14: [null],
      Question13: [null],
      Question12: [null],
      Question11: [null],
      Question23: [null],
      Question22: [null],
      Question21: [null],
      Question20: [null],
      Question19: [null],
      Question24: [null],
      Question25: [null],
      Question26: [null],
      Question27: [null],
      Question28: [null],
      Question29: [null],
      Question30: [null],
      Question31: [null],
      Question32: [null],
      Question33: [null],
      Question1Concern: [null],
      Question2Concern: [null],
      Question3Concern: [null],
      Question4Concern: [null],
      Question5Concern: [null],
      Question6Concern: [null],
      Question7Concern: [null],
      Question8Concern: [null],
      Question9Concern: [null],
      Question10Concern: [null],
      Question11Concern: [null],
      Question12Concern: [null],
      Question13Concern: [null],
      Question14Concern: [null],
      Question15Concern: [null],
      Question16Concern: [null],
      Question17Concern: [null],
      Question18Concern: [null],
      Question19Concern: [null],
      Question20Concern: [null],
      Question21Concern: [null],
      Question22Concern: [null],
      Question23Concern: [null],
      Question24Concern: [null],
      Question25Concern: [null],
      Question26Concern: [null],
      Question27Concern: [null],
      Question28Concern: [null],
      Question29Concern: [null],
      Question30Concern: [null],
      Question31Concern: [null],
      Question32Concern: [null],
      Question33Concern: [null],
      Question10Or: [null],
      Question10Description: [null],
      Question15Or: [null],
      Question15Description: [null],
      Question32Description: [null],
      Question33Description: [null],
      ConcernsSleep: [null],
      Worry: [null],
      Enjoy: [null],
      TotalScore: [null],
      OtherWorriesConcerns: [null],
      EatingSleepingConcerns: [null],
      Concerns1_16: [null],
      Question34Description: [null],
      Question35Description: [null],
      Question36Description: [null],
      ConcernsComments: [null],
      EatingSleepingComments: [null],
      WorriesComments: [null],

      premature: [null],
      babyTotalScore: [null],
      Question1Sum: [null],
      Question2Sum: [null],
      Question3Sum: [null],
      Question4Sum: [null],
      Question5Sum: [null],
      Question6Sum: [null],
      Question7Sum: [null],
      Question8Sum: [null],
      Question9Sum: [null],
      Question10Sum: [null],
      Question11Sum: [null],
      Question12Sum: [null],
      Question13Sum: [null],
      Question14Sum: [null],
      Question15Sum: [null],
      Question16Sum: [null],
      Question17Sum: [null],
      Question18Sum: [null],
      Question19Sum: [null],
      Question20Sum: [null],
      Question21Sum: [null],
      Question22Sum: [null],
      Question23Sum: [null],
      Question24Sum: [null],
      Question25Sum: [null],
      Question26Sum: [null],
      Question27Sum: [null],
      Question28Sum: [null],
      Question29Sum: [null],
      Question30Sum: [null],
      Question31Sum: [null],
      Question32Sum: [null],
      Question33Sum: [null],
      StaffName: [null],

      created: [null],
      status: [null],
      updated: [null],
      id: [null],
      _id: [null],
      _rev: [null],
      finalizedDate: [null],
      file: [null],
      uploadFileDate: [null],
      staffId: [null],

      remarks: [null]
    });
    this.unableToAccesForm = this._fb.group({
      disableValidate: [null]
    });
  }



  calculate() {

    this.cisAsqThirtyMo.TotalScore.value = 0;
    this.asqTotalScoreCalculation();
    this.asqScoreChartCalculation();

  }

  asqTotalScoreCalculation() {

    for (let i = 1; i <= this.cisAsqThirtyMo.totalQuestions; i++) {
      this.cisAsqThirtyMo["Question" + i + "Sum"].value = 0;
      if (this.cisAsqThirtyMo["Question" + i].fieldOptionIndex === "0") {
        this.cisAsqThirtyMo["Question" + i + "Sum"].value = 0
      }
      if (this.cisAsqThirtyMo["Question" + i].fieldOptionIndex === "1") {
        this.cisAsqThirtyMo["Question" + i + "Sum"].value = 5
      }
      if (this.cisAsqThirtyMo["Question" + i].fieldOptionIndex === "2") {
        this.cisAsqThirtyMo["Question" + i + "Sum"].value = 10
      }
      if ((this.cisAsqThirtyMo["Question" + i + "Concern"].fieldOptionIndex === true) || this.cisAsqThirtyMo["Question" + i + "Concern"].fieldOptionIndex === "1") {
        this.cisAsqThirtyMo["Question" + i + "Concern"].fieldOptionIndex = "1";
        this.cisAsqThirtyMo["Question" + i + "Sum"].value += 5;
      }
      this.cisAsqThirtyMo.TotalScore.value = parseInt(this.cisAsqThirtyMo.TotalScore.value) + this.cisAsqThirtyMo["Question" + i + "Sum"].value;
    }
  }

  asqScoreChartCalculation() {
    if (this.cisAsqThirtyMo.TotalScore.value < this.cisAsqThirtyMo.lowRiskValue) {
      this.cisAsqThirtyMo.babyTotalScore.fieldOptionIndex = "0";
    } else if ((this.cisAsqThirtyMo.TotalScore.value > this.cisAsqThirtyMo.lowRiskValue) && (this.cisAsqThirtyMo.TotalScore.value < this.cisAsqThirtyMo.monitorValue)) {
      this.cisAsqThirtyMo.babyTotalScore.fieldOptionIndex = "1";
    } else if (this.cisAsqThirtyMo.TotalScore.value > this.cisAsqThirtyMo.lowRiskValue) {
      this.cisAsqThirtyMo.babyTotalScore.fieldOptionIndex = "2";
    }
  }
  async saveForm(source: any) {


    this.isDisable = true;
    if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'You cannot update the Finalized Form' });
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
      console.log("baDocID in saveCisFormJson is", this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].badocID.badocID)
      this.update = await this._openCards.updateCisForm(saveCisFormJson)
        .then((data) => {

          this.cancelOut.emit();

          this.cisPdfJsonIdFinalize = data.cisPdfJsonID;

          this.isDisable = false;

        })
      loader.style.display = 'none';
      this.asqThirtyMoForm.disable();
    }
    else {

      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'Please Update the Latest Version' });
    }
  }

  getJson() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const data = { 'baDocId': this._client.getId() };
    this.currentCisVersion = this._openCards.getCisJsonVersion();
    this.formJsonValue = this._openCards.getBehavioralCisJson(data)
      .then(async (data) => {
        this.cisFormJson = data;
        this.isCisJsonSaved = true;

        this.cisAsqThirtyMo = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;


        }



        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;

        loader.style.display = 'none';
        this.asqThirtyMoForm.disable();
        this.unableToAccesForm.disable();
      })

  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      this.editControll = false;

      if (this.cisAsqThirtyMo.disableValidate === true) {

        this.asqThirtyMoForm.disable();
        this.unableToAccesForm.enable();
      }
      else {

        this.asqThirtyMoForm.enable();
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
    else {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';

      const saveCisFormJson = {
        "baDocID": this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].badocID.badocID,
        "isFinalized": true,
        "cisPdfJsonID": this.cisPdfJsonID,
        "pdfJsonData": source,
        "version": this.cisFormJson.cmsCisPdfDoc.length - 1,
        "staffID": localStorage.getItem('UserId')

      }
      this.update = await this._openCards.updateCisForm(saveCisFormJson)
        .then((data) => {
          this.cancelOut.emit({});


        })
      loader.style.display = 'none';
      this.asqThirtyMoForm.disable();
    }



  }

  discardForm() {

    this.cancelOut.emit();

  }


  handleDataField(event) {

    if (event === true) {


      this.asqThirtyMoForm.reset();

      this.cisAsqThirtyMo.disableValidate = true;
      this.asqThirtyMoForm.disable();


    }
    else {
      this.cisAsqThirtyMo.disableValidate = false;
      this.cisAsqThirtyMo.remarks = "";
      this.asqThirtyMoForm.enable();
    }

  }

  saveRemarks(remarks) {
    // this.cisAsqThirtyMo.remarks.value = remarks.value;
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
