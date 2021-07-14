import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { parentChild } from './parent-child';

import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';
import { PrintService } from '../print-layout/service/print.service';

@Component({
  selector: 'app-parent-child-visitaion',
  templateUrl: './parent-child-visitaion.component.html',
  styleUrls: ['./parent-child-visitaion.component.scss'],
  outputs: ['pcvFormOut', 'cancelOut'],
  providers: [MessageService]
})
export class ParentChildVisitaionComponent implements OnInit {
  parentChildForm: FormGroup;
  parentChild: parentChild = new parentChild();
  isPdfJsonID: any;
  update: any;
  editControll = true;
  isDisable = false;

  currentCisVersion: any;
  formJsonValue: any;
  cisFormJson: any;
  isCisJsonSaved = false;
  cmsCisPdfDocID: any;

  isFinalize = false;
  isFinalizeButton = false;
  cmsCisPdfDocIdFinalize: any;
  multiClientArr: any;
  isDisableFields = false;
  isPrint = true;

  constructor(public printService: PrintService, public _fb: FormBuilder, public _openCards: OpencardsService, public _client: ClildFormService, public messageService: MessageService) { }

  @Output()
  pcvFormOut = new EventEmitter();
  cancelOut = new EventEmitter();

  ngOnInit() {
    this.formValidation();
    if (localStorage.getItem('isFinalized') === 'true') {
      this.isFinalize = false;
    }
    this.getJson();
  }

  formValidation() {
    this.parentChildForm = this._fb.group({
      ClientName: [null],
      Kaecses: [null],
      CompletionDate: [null],
      FromTime: [null],
      ToTime: [null],
      VisitType: [null],
      presentAtVisit: [null],
      Location: [null],
      LocationVisit: [null],
      ParentsHome: [null],
      ParentsEnvironment: [null],
      AdultsVisit: [null],
      adjustment: [null],
      AdjustmentTime: [null],
      reason: [null],
      MonitoredVisitation: [null],
      ContributingFactors: [null],
      safetyplan: [null],
      SafetyPlanYesNo: [null],
      SafetyPlan: [null],
      SafetyConcerns: [null],
      SafetyConcernsYesNo: [null],
      AddressedVisit: [null],
      SupervisedVisitation: [null],
      serviceplan: [null],
      ServicePlanYesNo: [null],
      mitigate: [null],
      SafetyPlans: [null],
      ChildAcceptedLimits: [null],
      InteractionYesNo: [null],
      FeelingsYesNo: [null],
      RelationshipYesNo: [null],
      SocialRewardsYesNo: [null],
      PhysicalContactYesorNo: [null],
      InteractionsYesNo: [null],
      SupportChildYesNo: [null],
      PositiveYesNo: [null],
      WellbeingYesNo: [null],
      ListenedYesNo: [null],
      InterestYesNo: [null],
      AppropriateYesNo: [null],
      HarshYesNo: [null],
      ActivityYesNo: [null],
      SuppliesVisitYesNo: [null],
      summary1: [null],
      Signature: [null],
      Date: [null]
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
        "caseActivityID": parseInt(localStorage.getItem('CisCaseActivityId')),
        "isFinalized": false,
        "cmsCisPdfDocID": this.cmsCisPdfDocID,
        "pdfJsonData": source,
        "version": this.cisFormJson.cmsCisPdfDoc.length,
        "staffID": localStorage.getItem('UserId')

      }
      this.update = await this._openCards.updateCisForm(saveCisFormJson)
        .then((data) => {

          this.cancelOut.emit();

          this.cmsCisPdfDocIdFinalize = data.cmsCisPdfDocID;

          this.isDisable = false;

        })
      loader.style.display = 'none';
      this.parentChildForm.disable();
    }
    else {

      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'Please Update the Latest Version' });
    }
  }

  getJson() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const data = { 'caseActivityId': parseInt(localStorage.getItem('CisCaseActivityId')) };
    this.currentCisVersion = this._openCards.getCisJsonVersion();
    this.formJsonValue = this._openCards.getCisFormJson(data)
      .then(async (data) => {
        this.cisFormJson = data;
        this.isCisJsonSaved = true;

        this.parentChild = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;



        }

        this.parentChild.CompletionDate.value = !isNullOrUndefined(this.parentChild.CompletionDate.value) ? this.parentChild.CompletionDate.value = new Date(this.parentChild.CompletionDate.value) : null;

        this.parentChild.Date.value = !isNullOrUndefined(this.parentChild.Date.value) ? this.parentChild.Date.value = new Date(this.parentChild.Date.value) : null;

        this.cmsCisPdfDocID = data.cmsCisPdfDoc[this.currentCisVersion].cmsCisPdfDocID;

        loader.style.display = 'none';
        this.parentChildForm.disable();

      })

  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      this.editControll = false;
      this.parentChildForm.enable();

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
        "caseActivityID": parseInt(localStorage.getItem('CisCaseActivityId')),
        "isFinalized": true,
        "cmsCisPdfDocID": this.cmsCisPdfDocIdFinalize,
        "pdfJsonData": source,
        "version": this.cisFormJson.cmsCisPdfDoc.length,
        "staffID": localStorage.getItem('UserId')

      }
      this.update = await this._openCards.updateCisForm(saveCisFormJson)
        .then((data) => {
          this.cancelOut.emit({});


        })
      loader.style.display = 'none';
      this.parentChildForm.disable();
    }



  }

  discardForm() {

    this.cancelOut.emit();

  }

  printForm() {
    // let element = document.getElementById('print-form-content');
    // let opt = {
    //   margin: 1,
    //   filename: localStorage.getItem('CisCaseActivityId'),
    //   image: { type: 'jpeg', quality: 1 },
    //   html2canvas: { scale: 1 },
    //   jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' },
    //   pagebreak: { mode: 'avoid-all', before: '#page2el' }
    // };
    // var pdf = html2pdf().from(element).set(opt).save();

    const data = this.parentChild;

    this.printService.isPrinting = true;
    this.printService
      .printDocument('parent-child', data);
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
}
