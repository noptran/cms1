import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CisMaternalPaternal } from './cis-maternal-paternal';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../../../print-pdf";

@Component({
  selector: 'app-maternal-paternal',
  templateUrl: './maternal-paternal.component.html',
  styleUrls: ['./maternal-paternal.component.scss', '../../../family-preservation/family-preservation.scss'],
  outputs: ['matPaternalOut', 'cancelOut'],
  providers: [MessageService]
})
export class MaternalPaternalComponent implements OnInit {
  matPaternalForm: FormGroup;
  cisMatPaternal: CisMaternalPaternal = new CisMaternalPaternal();

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

  @Output()
  matPaternalOut = new EventEmitter();
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
    this.matPaternalForm = this._fb.group({
      program: [null],
      showMultiClient: [null],
      id: [null],
      DateOfBirth: [null],
      Comment1: [null],
      Comment2: [null],
      Comment5: [null],
      Comment6: [null],
      Comment3: [null],
      Comment4: [null],
      Comment9: [null],
      Comment7: [null],
      Comment8: [null],
      StaffName: [null],
      uploadFileDate: [null],
      status: [null],
      facts: [null],
      InitialAssessment: [null],
      MaternalPaternal9: [null],
      file: [null],
      MaternalPaternal6: [null],
      MaternalPaternal5: [null],
      MaternalPaternal8: [null],
      formName: [null],
      MaternalPaternal7: [null],
      staffName: [null],
      CompletionDate: [null],
      Relation9: [null],
      Relation8: [null],
      Address10: [null],
      clientId: [null],
      Relation5: [null],
      PDFDoc: [null],
      Relation4: [null],
      Relation7: [null],
      Address11: [null],
      Relation6: [null],
      Relation1: [null],
      MaternalPaternal2: [null],
      MaternalPaternal1: [null],
      Relation3: [null],
      MaternalPaternal4: [null],
      Relation2: [null],
      MaternalPaternal3: [null],
      Facts: [null],
      LiveWithRelative11: [null],
      LiveWithRelative10: [null],
      ReviewDate: [null],
      phone6: [null],
      phone7: [null],
      phone8: [null],
      phone9: [null],
      phone2: [null],
      phone3: [null],
      phone4: [null],
      phone5: [null],
      phone10: [null],
      phone1: [null],
      phone11: [null],
      Name3: [null],
      Name4: [null],
      ClientName: [null],
      Name5: [null],
      Relation11: [null],
      Name6: [null],
      Relation10: [null],
      Name7: [null],
      Name8: [null],
      Name9: [null],
      Name1: [null],
      Name2: [null],
      LiveWithRelative7: [null],
      LiveWithRelative6: [null],
      LiveWithRelative9: [null],
      referralId: [null],
      created: [null],
      LiveWithRelative8: [null],
      Name11: [null],
      LiveWithRelative3: [null],
      Name10: [null],
      LiveWithRelative2: [null],
      LiveWithRelative5: [null],
      LiveWithRelative4: [null],
      LiveWithRelative1: [null],
      name: [null],
      updated: [null],
      finalizedDate: [null],
      Comment11: [null],
      Comment10: [null],
      MaternalPaternal10: [null],
      Address8: [null],
      MaternalPaternal11: [null],
      Address9: [null],
      Address6: [null],
      Address7: [null],
      Address4: [null],
      Address5: [null],
      Address2: [null],
      Address3: [null],
      Address1: [null],
      Kaecses: [null],
      staffId: [null],
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
        "assessmentID": this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].assessmentID.assessmentID,
        "isFinalized": false,
        "cmsCisPdfDocID": this.cisPdfJsonID,
        "pdfJsonData": source,
        "version": this.cisFormJson.cmsCisPdfDoc.length,
        "staffID": localStorage.getItem('UserId')

      }
      this.update = await this._openCards.updateCisForm(saveCisFormJson)
        .then((data) => {

          this.cancelOut.emit({});


          this.cisPdfJsonIdFinalize = data.cisPdfJsonID;

          this.isDisable = false;

        })
      loader.style.display = 'none';
      this.matPaternalForm.disable();
    }
    else {

      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'Please Update the Latest Version' });
    }
  }

  getJson() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';


    const data = { 'assessmentId': this._client.getId() };

    this.currentCisVersion = this._openCards.getCisJsonVersion();
    this.formJsonValue = this._openCards.getBehavioralCisJson(data)
      .then(async (data) => {
        this.cisFormJson = data;
        this.isCisJsonSaved = true;

        this.cisMatPaternal = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;


        }



        this.cisMatPaternal.ReviewDate.value = !isNullOrUndefined(this.cisMatPaternal.ReviewDate.value) ? this.cisMatPaternal.ReviewDate.value = new Date(this.cisMatPaternal.ReviewDate.value) : null;
        this.cisMatPaternal.CompletionDate.value = !isNullOrUndefined(this.cisMatPaternal.CompletionDate.value) ? this.cisMatPaternal.CompletionDate.value = new Date(this.cisMatPaternal.CompletionDate.value) : null;


        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;
        loader.style.display = 'none';
        this.matPaternalForm.disable();

      })

  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      this.editControll = false;
      this.matPaternalForm.enable();

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
        "assessmentID": this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].assessmentID.assessmentID,
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
      this.matPaternalForm.disable();
    }



  }

  discardForm() {

    this.cancelOut.emit();

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
