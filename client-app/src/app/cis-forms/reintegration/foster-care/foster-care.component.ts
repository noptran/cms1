import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FosterCare } from './foster-care';

import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../../../print-pdf";

@Component({
  selector: 'app-foster-care',
  templateUrl: './foster-care.component.html',
  styleUrls: ['./foster-care.component.scss', '../../../family-preservation/family-preservation.scss'],
  outputs: ['fosterOut', 'cancelOut'],
  providers: [MessageService]
})
export class FosterCareComponent implements OnInit {
  fosterCareForm: FormGroup;
  cisFosterCare: FosterCare = new FosterCare();

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

  // text area
  MedicationsNeedToBeFilled = "MedicationsNeedToBeFilled";
  SFCSAssistFirst7Days = "SFCSAssistFirst7Days";
  KPHAppointmentsScheduled = "KPHAppointmentsScheduled";
  DeescalationTatics = "DeescalationTatics";
  CommunityResources = "CommunityResources";
  InServiceDays = "InServiceDays";
  DayCareOutings = "DayCareOutings";

  @Output()
  fosterOut = new EventEmitter();
  cancelOut = new EventEmitter();

  constructor(public _printPdf: PrintPdf,public _fb: FormBuilder, public _openCards: OpencardsService, public _client: ClildFormService, public messageService: MessageService) { }


  ngOnInit() {
    this.formValidation();
    if (localStorage.getItem('isFinalized') === 'true') {
      this.isFinalize = false;
    }
    this.getJson();
  }

  formValidation() {
    this.fosterCareForm = this._fb.group({
      CaseManager: [null],
      DateOfPlacement: [null],
      CompletionDate: [null],
      FromTime: [null],
      ToTime: [null],
      ProviderID: [null],
      personTypeField: [null],
      personType: [null],
      FosterCareWorker: [null],
      StaffName: [null],
      KinshipWorker: [null],
      LicensedPermanencySpecialist: [null],
      FamilySupportWorker: [null],
      presentAtVisit: [null],
      MedicationsNeedToBeFilled: [null],
      SFCSAssistFirst7Days: [null],
      KPHAppointmentsScheduled: [null],
      DeescalationTatics: [null],
      AppointmentType1: [null],
      AppointmentChild1: [null],
      AppointmentTime1: [null],
      AppointmentLocation1: [null],
      AppointmentType2: [null],
      AppointmentChild2: [null],
      AppointmentTime2: [null],
      AppointmentLocation2: [null],
      AppointmentType3: [null],
      AppointmentChild3: [null],
      AppointmentTime3: [null],
      AppointmentLocation3: [null],
      AppointmentType4: [null],
      AppointmentChild4: [null],
      AppointmentTime4: [null],
      AppointmentLocation4: [null],
      PreferredCommunication: [null],
      PhoneNumber: [null],
      InServiceDays: [null],
      DayCareOutings: [null],
      CommunityResources: [null],
      ClientName: [null]
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
      this.fosterCareForm.disable();
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

        this.cisFosterCare = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;



        }


        this.cisFosterCare.CompletionDate.value = !isNullOrUndefined(this.cisFosterCare.CompletionDate.value) ? this.cisFosterCare.CompletionDate.value = new Date(this.cisFosterCare.CompletionDate.value) : null;
        this.cisFosterCare.DateOfPlacement.value = !isNullOrUndefined(this.cisFosterCare.DateOfPlacement.value) ? this.cisFosterCare.DateOfPlacement.value = new Date(this.cisFosterCare.DateOfPlacement.value) : null;

        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;
        loader.style.display = 'none';
        this.fosterCareForm.disable();

      })

  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      this.editControll = false;
      this.fosterCareForm.enable();

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
        "cisPdfJsonID": this.cisPdfJsonIdFinalize,
        "pdfJsonData": source,
        "version": this.cisFormJson.cmsCisPdfDoc.length,
        "staffID": localStorage.getItem('UserId')
        // "staffID": 4869
      }
      this.update = await this._openCards.updateCisForm(saveCisFormJson)
        .then((data) => {
          this.cancelOut.emit({});


        })
      loader.style.display = 'none';
      this.fosterCareForm.disable();
    }



  }

  discardForm() {

    this.cancelOut.emit();

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
    let element = document.getElementById('print-form-content');
    let opt = {
      margin: 1,
      filename: localStorage.getItem('CisCaseActivityId'),
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all', before: '#page2el' }
    };
    const pdf = html2pdf().from(element).set(opt).save();
  }
}
