import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { CisCourtAppear } from './cis-court-appear';

import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-court-appearance-log',
  templateUrl: './court-appearance-log.component.html',
  styleUrls: ['./court-appearance-log.component.scss', '../../../family-preservation/family-preservation.scss'],
  outputs: ['courtAppearOut', 'cancelOut'],
  providers: [MessageService]
})
export class CourtAppearanceLogComponent implements OnInit {
  courtAppearanceForm: FormGroup;
  cisCourtAppearance: CisCourtAppear = new CisCourtAppear();

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

  // text area names
  NotesAndRecommendations = "NotesAndRecommendations";
  OtherOrders = "OtherOrders";

  @Output()
  courtAppearOut = new EventEmitter();
  cancelOut = new EventEmitter();

  constructor(public _fb: FormBuilder, public _openCards: OpencardsService, public _client: ClildFormService, public messageService: MessageService) { }

  ngOnInit() {
    this.formValidation();
    if (localStorage.getItem('isFinalized') === 'true') {
      this.isFinalize = false;
    }
    this.getJson();
    this.judgeTypeEventEmit();
  }

  formValidation() {
    this.courtAppearanceForm = this._fb.group({
      CASA: [null],
      CSO: [null],
      Children: [null],
      ClientName: [null],
      CompletionDate: [null],
      CountyAtty: [null],
      Custody: [null],
      DCF: [null],
      Father: [null],
      FatherAtty: [null],
      FromTime: [null],
      GAL: [null],
      Grandparents: [null],
      Judge1: [null],
      Kaecses: [null],
      Mother: [null],
      MothersAtty: [null],
      NextHearingDate: [null],
      NextHearingJudge: [null],
      NextHearingLocation: [null],
      NextHearingTime: [null],
      NextHearingType: [null],
      NotesAndRecommendations: [null],
      OtherOrders: [null],
      Others: [null],
      Placement: [null],
      RadioButtonList: [null],
      SFSCStaff: [null],
      Signature: [null],
      Visitation: [null],
      beginDate: [null],
      clientId: [null],
      courtLocation: [null],
      created: [null],
      disable: [false],
      disableAll: [false],
      endDate: [null],
      file: [null],
      finalizedDate: [null],
      formName: [null],
      hearing: [null],
      id: [null],
      length: [null],
      multiClient: [null],
      name: [null],
      placement: [null],
      program: [null],
      showMultiClient: [false],
      staffId: [null],
      staffName: [null],
      status: [null],
      updated: [null],
      uploadFileDate: [null]
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
        "courtID": this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].courtOrderedID.courtOrderedID,
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
      this.courtAppearanceForm.disable();
    }
    else {

      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'Please Update the Latest Version' });
    }
  }

  getJson() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const data = { 'courtId': this._client.getId() };
    this.currentCisVersion = this._openCards.getCisJsonVersion();
    this.formJsonValue = this._openCards.getBehavioralCisJson(data)
      .then(async (data) => {
        console.log("data in court appearance log is", data);
        this.cisFormJson = data;
        this.isCisJsonSaved = true;
        this.cisCourtAppearance = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;
        }
        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;
        }
        this.cisCourtAppearance.NextHearingDate.value = !isNullOrUndefined(this.cisCourtAppearance.NextHearingDate.value) ? this.cisCourtAppearance.NextHearingDate.value = new Date(this.cisCourtAppearance.NextHearingDate.value) : null;
        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;
        this.multiClientArr = this.cisCourtAppearance.multiClient;
        console.log("this.cisCourtAppearance in court appearance log is", this.cisCourtAppearance);
        loader.style.display = 'none';
        this.courtAppearanceForm.disable();

      })
  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      this.editControll = false;
      this.courtAppearanceForm.enable();
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
        "courtID": this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].courtOrderedID.courtOrderedID,
        "isFinalized": true,
        "cisPdfJsonID": this.cisPdfJsonIdFinalize,
        "pdfJsonData": source,
        "version": this.cisFormJson.cmsCisPdfDoc.length,
        "staffID": localStorage.getItem('UserId')
      }
      this.update = await this._openCards.updateCisForm(saveCisFormJson)
        .then((data) => {
          this.cancelOut.emit({});
        })
      loader.style.display = 'none';
      this.courtAppearanceForm.disable();
    }

  }

  discardForm() {
    this.cancelOut.emit();
  }

  isDisabled(judge, type) {
    if (judge === 'NA' || judge === 'Not Available' || judge === 'NIL' || type === 'NA' || type === 'Not Available' || type === 'NIL') {
      return true;
    }
    else {
      return false;
    }
  }

  handleDataField(event) {
    let tempData = {};
    if (event === true) {
      this.courtAppearanceForm.disable();
      this.cisCourtAppearance = new CisCourtAppear();
      this.resetFormModule();
    }
    else {
      this.courtAppearanceForm.enable();
    }

  }


  resetFormModule() {
    this.courtAppearanceForm.reset();
    this.cisCourtAppearance = new CisCourtAppear();
  }

  judgeTypeEventEmit() {
    let typeData = this.cisCourtAppearance.NextHearingType.value;
    let judgeData = this.cisCourtAppearance.NextHearingJudge.value;
    if ((typeData === "NIL" && judgeData === "NIL") || (typeData === "NA" && judgeData === "NA") || (typeData === "not available" && judgeData === "not available")) {
      this.cisCourtAppearance.NextHearingDate.value = null;
      this.cisCourtAppearance.NextHearingTime.value = null;
      this.cisCourtAppearance.NextHearingLocation.value = null;
      this.isDisableFields = true;
    }
    else {
      this.isDisableFields = false;
    }
  }

  rowMethod(event) {
    if (!isNullOrUndefined(event)) {
      let singleNewLineCount = this._openCards.search_word(event, "\n");
      let doubleNewLineCount = this._openCards.search_word(event, "\n\n");
      return Math.ceil((event.length / 126) + (singleNewLineCount - doubleNewLineCount));
    }
    else {
      return 3;
    }
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
    var pdf = html2pdf().from(element).set(opt).save();


  }

}
