import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CisAsq12Mo } from './cis-asq-12-mo';
import { OpencardsService } from '../../opecards-list-view/opencards.service';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-asq-12-mo',
  templateUrl: './asq-12-mo.component.html',
  styleUrls: ['./asq-12-mo.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['asqTwelveOut', 'cancelOut'],
})
export class Asq12MoComponent implements OnInit {
  asqTwelveMoForm: FormGroup;
  unableToAccesForm: FormGroup;
  cisAsqTwelveMo: CisAsq12Mo = new CisAsq12Mo();


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
  asqTwelveOut = new EventEmitter();
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
    this.asqTwelveMoForm = this._fb.group({
      name: [null, Validators.compose([Validators.required])],
      program: [null, Validators.compose([Validators.required])],

      formName: [null, Validators.compose([Validators.required])],
      totalQuestions: [null, Validators.compose([Validators.required])],
      lowRiskValue: [null, Validators.compose([Validators.required])],
      monitorValue: [null, Validators.compose([Validators.required])],

      CaregiverName: [null, Validators.compose([Validators.required])],
      Relationship: [null, Validators.compose([Validators.required])],
      Question10: [null, Validators.compose([Validators.required])],
      Question9: [null, Validators.compose([Validators.required])],
      Question8: [null, Validators.compose([Validators.required])],
      Question7: [null, Validators.compose([Validators.required])],
      Question6: [null, Validators.compose([Validators.required])],
      Question5: [null, Validators.compose([Validators.required])],
      Question4: [null, Validators.compose([Validators.required])],
      Question3: [null, Validators.compose([Validators.required])],
      Question2: [null, Validators.compose([Validators.required])],
      Question1: [null, Validators.compose([Validators.required])],
      Question18: [null, Validators.compose([Validators.required])],
      Question17: [null, Validators.compose([Validators.required])],
      Question16: [null, Validators.compose([Validators.required])],
      Question15: [null, Validators.compose([Validators.required])],
      Question14: [null, Validators.compose([Validators.required])],
      Question13: [null, Validators.compose([Validators.required])],
      Question12: [null, Validators.compose([Validators.required])],
      Question11: [null, Validators.compose([Validators.required])],
      Question23: [null, Validators.compose([Validators.required])],
      Question22: [null, Validators.compose([Validators.required])],
      Question21: [null, Validators.compose([Validators.required])],
      Question20: [null, Validators.compose([Validators.required])],
      Question19: [null, Validators.compose([Validators.required])],
      Question24: [null, Validators.compose([Validators.required])],
      Question25: [null, Validators.compose([Validators.required])],
      Question26: [null, Validators.compose([Validators.required])],
      Question27: [null, Validators.compose([Validators.required])],
      Question1Concern: [null, Validators.compose([Validators.required])],
      Question2Concern: [null, Validators.compose([Validators.required])],
      Question3Concern: [null, Validators.compose([Validators.required])],
      Question4Concern: [null, Validators.compose([Validators.required])],
      Question5Concern: [null, Validators.compose([Validators.required])],
      Question6Concern: [null, Validators.compose([Validators.required])],
      Question7Concern: [null, Validators.compose([Validators.required])],
      Question8Concern: [null, Validators.compose([Validators.required])],
      Question9Concern: [null, Validators.compose([Validators.required])],
      Question10Concern: [null, Validators.compose([Validators.required])],
      Question11Concern: [null, Validators.compose([Validators.required])],
      Question12Concern: [null, Validators.compose([Validators.required])],
      Question13Concern: [null, Validators.compose([Validators.required])],
      Question14Concern: [null, Validators.compose([Validators.required])],
      Question15Concern: [null, Validators.compose([Validators.required])],
      Question16Concern: [null, Validators.compose([Validators.required])],
      Question17Concern: [null, Validators.compose([Validators.required])],
      Question18Concern: [null, Validators.compose([Validators.required])],
      Question19Concern: [null, Validators.compose([Validators.required])],
      Question20Concern: [null, Validators.compose([Validators.required])],
      Question21Concern: [null, Validators.compose([Validators.required])],
      Question22Concern: [null, Validators.compose([Validators.required])],
      Question23Concern: [null, Validators.compose([Validators.required])],
      Question24Concern: [null, Validators.compose([Validators.required])],
      Question25Concern: [null, Validators.compose([Validators.required])],
      Question26Concern: [null, Validators.compose([Validators.required])],
      Question27Concern: [null, Validators.compose([Validators.required])],
      Question14Or: [null, Validators.compose([Validators.required])],
      Question14Description: [null, Validators.compose([Validators.required])],
      Question27Description: [null, Validators.compose([Validators.required])],
      ConcernsSleep: [null, Validators.compose([Validators.required])],
      Worry: [null, Validators.compose([Validators.required])],
      Enjoy: [null, Validators.compose([Validators.required])],
      TotalScore: [null, Validators.compose([Validators.required])],
      OtherWorriesConcerns: [null, Validators.compose([Validators.required])],
      EatingSleepingConcerns: [null, Validators.compose([Validators.required])],
      Concerns1_16: [null, Validators.compose([Validators.required])],
      Question28Description: [null, Validators.compose([Validators.required])],
      Question29Description: [null, Validators.compose([Validators.required])],
      Question30Description: [null, Validators.compose([Validators.required])],
      ConcernsComments: [null, Validators.compose([Validators.required])],
      EatingSleepingComments: [null, Validators.compose([Validators.required])],
      WorriesComments: [null, Validators.compose([Validators.required])],

      premature: [null, Validators.compose([Validators.required])],
      babyTotalScore: [null, Validators.compose([Validators.required])],
      Question1Sum: [null, Validators.compose([Validators.required])],
      Question2Sum: [null, Validators.compose([Validators.required])],
      Question3Sum: [null, Validators.compose([Validators.required])],
      Question4Sum: [null, Validators.compose([Validators.required])],
      Question5Sum: [null, Validators.compose([Validators.required])],
      Question6Sum: [null, Validators.compose([Validators.required])],
      Question7Sum: [null, Validators.compose([Validators.required])],
      Question8Sum: [null, Validators.compose([Validators.required])],
      Question9Sum: [null, Validators.compose([Validators.required])],
      Question10Sum: [null, Validators.compose([Validators.required])],
      Question11Sum: [null, Validators.compose([Validators.required])],
      Question12Sum: [null, Validators.compose([Validators.required])],
      Question13Sum: [null, Validators.compose([Validators.required])],
      Question14Sum: [null, Validators.compose([Validators.required])],
      Question15Sum: [null, Validators.compose([Validators.required])],
      Question16Sum: [null, Validators.compose([Validators.required])],
      Question17Sum: [null, Validators.compose([Validators.required])],
      Question18Sum: [null, Validators.compose([Validators.required])],
      Question19Sum: [null, Validators.compose([Validators.required])],
      Question20Sum: [null, Validators.compose([Validators.required])],
      Question21Sum: [null, Validators.compose([Validators.required])],
      Question22Sum: [null, Validators.compose([Validators.required])],
      Question23Sum: [null, Validators.compose([Validators.required])],
      Question24Sum: [null, Validators.compose([Validators.required])],
      Question25Sum: [null, Validators.compose([Validators.required])],
      Question26Sum: [null, Validators.compose([Validators.required])],
      Question27Sum: [null, Validators.compose([Validators.required])],
      StaffName: [null, Validators.compose([Validators.required])],

      created: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      updated: [null, Validators.compose([Validators.required])],
      id: [null, Validators.compose([Validators.required])],
      _id: [null, Validators.compose([Validators.required])],
      _rev: [null, Validators.compose([Validators.required])],
      finalizedDate: [null, Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])],
      uploadFileDate: [null, Validators.compose([Validators.required])],
      staffId: [null, Validators.compose([Validators.required])],

      remarks: [null, Validators.compose([Validators.required])]
    });
    this.unableToAccesForm = this._fb.group({
      disableValidate: [null]
    });
  }

  calculate() {

    this.cisAsqTwelveMo.TotalScore.value = 0;
    this.asqTotalScoreCalculation();
    this.asqScoreChartCalculation();

  }

  asqTotalScoreCalculation() {

    for (let i = 1; i <= this.cisAsqTwelveMo.totalQuestions; i++) {
      this.cisAsqTwelveMo["Question" + i + "Sum"].value = 0;
      if (this.cisAsqTwelveMo["Question" + i].fieldOptionIndex === "0") {
        this.cisAsqTwelveMo["Question" + i + "Sum"].value = 0
      }
      if (this.cisAsqTwelveMo["Question" + i].fieldOptionIndex === "1") {
        this.cisAsqTwelveMo["Question" + i + "Sum"].value = 5
      }
      if (this.cisAsqTwelveMo["Question" + i].fieldOptionIndex === "2") {
        this.cisAsqTwelveMo["Question" + i + "Sum"].value = 10
      }
      if ((this.cisAsqTwelveMo["Question" + i + "Concern"].fieldOptionIndex === true) || this.cisAsqTwelveMo["Question" + i + "Concern"].fieldOptionIndex === "1") {
        this.cisAsqTwelveMo["Question" + i + "Concern"].fieldOptionIndex = "1";
        this.cisAsqTwelveMo["Question" + i + "Sum"].value += 5;
      }
      this.cisAsqTwelveMo.TotalScore.value = parseInt(this.cisAsqTwelveMo.TotalScore.value) + this.cisAsqTwelveMo["Question" + i + "Sum"].value;
    }
  }

  asqScoreChartCalculation() {
    if (this.cisAsqTwelveMo.TotalScore.value < this.cisAsqTwelveMo.lowRiskValue) {
      this.cisAsqTwelveMo.babyTotalScore.fieldOptionIndex = "0";
    } else if ((this.cisAsqTwelveMo.TotalScore.value > this.cisAsqTwelveMo.lowRiskValue) && (this.cisAsqTwelveMo.TotalScore.value < this.cisAsqTwelveMo.monitorValue)) {
      this.cisAsqTwelveMo.babyTotalScore.fieldOptionIndex = "1";
    } else if (this.cisAsqTwelveMo.TotalScore.value > this.cisAsqTwelveMo.lowRiskValue) {
      this.cisAsqTwelveMo.babyTotalScore.fieldOptionIndex = "2";
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
      this.asqTwelveMoForm.disable();
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

        this.cisAsqTwelveMo = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;


        }




        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;
        loader.style.display = 'none';
        this.asqTwelveMoForm.disable();
        this.unableToAccesForm.disable();
      })
  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      this.editControll = false;

      if (this.cisAsqTwelveMo.disableValidate === true) {
       
        this.asqTwelveMoForm.disable();
        this.unableToAccesForm.enable();
      }
      else {
      
        this.asqTwelveMoForm.enable();
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
      this.asqTwelveMoForm.disable();
    }



  }

  discardForm() {
   
    this.cancelOut.emit();

  }


  handleDataField(event) {
    
    if (event === true) {

     
      this.asqTwelveMoForm.reset();
     
      this.cisAsqTwelveMo.disableValidate = true;
      this.asqTwelveMoForm.disable();
    

    }
    else {
      this.cisAsqTwelveMo.disableValidate = false;
      this.cisAsqTwelveMo.remarks = "";
      this.asqTwelveMoForm.enable();
    }
    
  }

  saveRemarks(remarks) {
   // this.cisAsqTwelveMo.remarks.value = remarks.value;
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
