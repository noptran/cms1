import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { workerParent } from './worker-parent';

import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';
import { PrintService } from '../print-layout/service/print.service';
@Component({
  selector: 'app-worker-parent-visit-activity',
  templateUrl: './worker-parent-visit-activity.component.html',
  styleUrls: ['./worker-parent-visit-activity.component.scss'],
  outputs: ['wpvaForm', 'cancelOut'],
  providers: [MessageService]
})
export class WorkerParentVisitActivityComponent implements OnInit {
  workerParentVisit: FormGroup;
  workerParent: workerParent = new workerParent();
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
  wpvaForm = new EventEmitter();
  cancelOut = new EventEmitter();

  ngOnInit() {
    this.formValidation();
    if (localStorage.getItem('isFinalized') === 'true') {
      this.isFinalize = false;
    }
    this.getJson();
  }
  formValidation() {
    this.workerParentVisit = this._fb.group({
      parentName: [null],
      ClientName: [null],
      fact: [null],
      CompletionDate: [null],
      FromTime: [null],
      ToTime: [null],
      proCode: [null],
      LocationOfVisit: [null],
      ListThosePresentAtVisit: [null],
      ChildrenLivingInTheRemovalHome: [null],
      OthersLivingInHome: [null],
      CasePlanGoals: [null],
      casePlanLimit: [null],
      progress: [null],
      Tasksparentnextvisit: [null],
      duedate1: [null],
      Tasksworker: [null],
      duedate2: [null],
      multiClient: [null],
      WhatFamilyMembersKinHaveaConnectionToTheChildAndProvideSupportToTheFamily: [null],
      WereAnySafetyRiskConcernsObservedOrDiscussedDuringThisMeeting: [null],
      WereAnySafetyRiskConcernsObservedOrDiscussedDuringThisMeetingDescription: [null],
      HowWereSafetyRiskConcernsAddressed: [null],
      contributingfactors: [null],
      safetyplandevelopedorreviewed: [null],
      reviewprogressfollow: [null],
      additionalriskconcernidentified: [null],
      risk_concern_identified: [null],
      family_mitigate_risk: [null],
      service_mitigate_concern: [null],
      service_plan_reviewed: [null],
      CasePlanTasks: [null],
      NarrativeSummary: [null],
      TasksForSFCSBeforeNextVisit: [null],
      parent_Signature1: [null],
      date1: [null],
      parent_Signature2: [null],
      date2: [null],
      Worker_Signature: [null],
      date3: [null],
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
      this.workerParentVisit.disable();
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

        this.workerParent = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;

        }


        this.workerParent.CompletionDate.value = !isNullOrUndefined(this.workerParent.CompletionDate.value) ? this.workerParent.CompletionDate.value = new Date(this.workerParent.CompletionDate.value) : null;
        this.workerParent.duedate1.value = !isNullOrUndefined(this.workerParent.duedate1.value) ? this.workerParent.duedate1.value = new Date(this.workerParent.duedate1.value) : null;
        this.workerParent.duedate2.value = !isNullOrUndefined(this.workerParent.duedate2.value) ? this.workerParent.duedate2.value = new Date(this.workerParent.duedate2.value) : null;
        this.workerParent.date1.value = !isNullOrUndefined(this.workerParent.date1.value) ? this.workerParent.date1.value = new Date(this.workerParent.date1.value) : null;
        this.workerParent.date2.value = !isNullOrUndefined(this.workerParent.date2.value) ? this.workerParent.date2.value = new Date(this.workerParent.date2.value) : null;
        this.workerParent.date3.value = !isNullOrUndefined(this.workerParent.date3.value) ? this.workerParent.date3.value = new Date(this.workerParent.date3.value) : null;

        this.cmsCisPdfDocID = data.cmsCisPdfDoc[this.currentCisVersion].cmsCisPdfDocID;

        loader.style.display = 'none';
        this.workerParentVisit.disable();

      })

  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      this.editControll = false;
      this.workerParentVisit.enable();

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
      this.workerParentVisit.disable();
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
    // const pdf = html2pdf().from(element).set(opt).save();

    const data = this.workerParent;

    this.printService.isPrinting = true;
    this.printService
      .printDocument('worker-parent', data);

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
