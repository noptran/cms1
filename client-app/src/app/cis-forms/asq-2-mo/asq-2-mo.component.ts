import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CisAsq2Mo } from './cis-asq-2-mo';
import { OpencardsService } from '../../opecards-list-view/opencards.service';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-asq-2-mo',
  templateUrl: './asq-2-mo.component.html',
  styleUrls: ['./asq-2-mo.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['asqTwoOut', 'cancelOut'],
  providers: [MessageService]
})
export class Asq2MoComponent implements OnInit {
  unableToAccesForm: FormGroup;
  asqTwoMoForm: FormGroup;
  cisAsqTwoMo: CisAsq2Mo = new CisAsq2Mo();
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

  isFinalize = false;
  isFinalizeButton = false;
  cisPdfJsonIdFinalize: any;
  multiClientArr: any;
  isDisableFields = false;
  isUnableToAccess = false;

  @Output()
  asqTwoOut = new EventEmitter();
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
      { label: 'ASQ Two', active: 'active' }
    );

    this.getJson();


  }

  formValidation() {
    this.asqTwoMoForm = this._fb.group({
      name: [null],
      program: [null],
      
      formName: [null],
      totalQuestions: [null],
      lowRiskValue: [null],
      monitorValue: [null],
   
      Relationship: [null],
      Question1: [null],
      Question10: [null],
      Question9: [null],
      Question8: [null],
      Question7: [null],
      Question6: [null],
      Question5: [null],
      Question4: [null],
      Question3: [null],
      Question2: [null],
      Question16: [null],
      Question15: [null],
      Question14: [null],
      Question13: [null],
      Question12: [null],
      Question11: [null],
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
     
      WeeksPremature: [null],
      CaregiverName: [null],
      Question13Or: [null],
      Question13Description: [null],
      Question16Description: [null],
      Question17Description: [null],
      Question18Description: [null],
      Question19Description: [null],
      Concerns1_16: [null],
      EatingSleepingConcerns: [null],
      OtherWorriesConcerns: [null],
      TotalScore: [null],
      ConcernsComments: [null],
      EatingSleepingComments: [null],
      WorriesComments: [null],
      ConcernsSleep: [null],
      Worry: [null],
      Enjoy: [null],
      babyTotalScore: [null],
      StaffName: [null],
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
      this.update = await this._openCards.updateCisForm(saveCisFormJson)
        .then((data) => {
          this.cancelOut.emit();
          this.cisPdfJsonIdFinalize = data.cisPdfJsonID;
          this.isDisable = false;

        })
      loader.style.display = 'none';
      this.asqTwoMoForm.disable();
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

        this.cisAsqTwoMo = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }
       
        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;
          

        }



   


        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;

        loader.style.display = 'none';
        this.asqTwoMoForm.disable();
        this.unableToAccesForm.disable();
      })

  }

  calculate() {

    this.cisAsqTwoMo.TotalScore.value = 0;
    this.asqTotalScoreCalculation();
    this.asqScoreChartCalculation();

  }

  asqTotalScoreCalculation() {

    for (let i = 1; i <= this.cisAsqTwoMo.totalQuestions; i++) {
      this.cisAsqTwoMo["Question" + i + "Sum"].value = 0;
      if (this.cisAsqTwoMo["Question" + i].fieldOptionIndex === "0") {
        this.cisAsqTwoMo["Question" + i + "Sum"].value = 0
      }
      if (this.cisAsqTwoMo["Question" + i].fieldOptionIndex === "1") {
        this.cisAsqTwoMo["Question" + i + "Sum"].value = 5
      }
      if (this.cisAsqTwoMo["Question" + i].fieldOptionIndex === "2") {
        this.cisAsqTwoMo["Question" + i + "Sum"].value = 10
      }
      if ((this.cisAsqTwoMo["Question" + i + "Concern"].fieldOptionIndex === true) || this.cisAsqTwoMo["Question" + i + "Concern"].fieldOptionIndex === "1") {
        this.cisAsqTwoMo["Question" + i + "Concern"].fieldOptionIndex = "1";
        this.cisAsqTwoMo["Question" + i + "Sum"].value += 5;
      }
      this.cisAsqTwoMo.TotalScore.value = parseInt(this.cisAsqTwoMo.TotalScore.value) + this.cisAsqTwoMo["Question" + i + "Sum"].value;
    }
  }

  asqScoreChartCalculation() {
    if (this.cisAsqTwoMo.TotalScore.value < this.cisAsqTwoMo.lowRiskValue) {
      this.cisAsqTwoMo.babyTotalScore.fieldOptionIndex = "0";
    } else if ((this.cisAsqTwoMo.TotalScore.value > this.cisAsqTwoMo.lowRiskValue) && (this.cisAsqTwoMo.TotalScore.value < this.cisAsqTwoMo.monitorValue)) {
      this.cisAsqTwoMo.babyTotalScore.fieldOptionIndex = "1";
    } else if (this.cisAsqTwoMo.TotalScore.value > this.cisAsqTwoMo.lowRiskValue) {
      this.cisAsqTwoMo.babyTotalScore.fieldOptionIndex = "2";
    }
  }

  editForm() {

    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      this.editControll = false;

      if (this.cisAsqTwoMo.disableValidate === true) {

        this.asqTwoMoForm.disable();
        this.unableToAccesForm.enable();
      }
      else {

        this.asqTwoMoForm.enable();
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
      this.asqTwoMoForm.disable();
    }



  }

  discardForm() {
    this.cancelOut.emit();
  }

  disableValidation(isDisableValidated) {
    if (isDisableValidated) {
      this.asqTwoMoForm.disable();
    }
    else {
      this.asqTwoMoForm.enable();
    }
  }


  handleDataField(event) {

    if (event === true) {
      this.asqTwoMoForm.reset();
      this.cisAsqTwoMo.disableValidate = true;
      this.asqTwoMoForm.disable();


    }
    else {
      this.cisAsqTwoMo.disableValidate = false;
      this.cisAsqTwoMo.remarks = "";
      this.asqTwoMoForm.enable();
    }

  }

  saveRemarks(remarks) {
    // this.cisAsqTwoMo.remarks.value = remarks.value;
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
