import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { CisCaseActivity } from './cis-case-activity';

import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-case-activity-reint',
  templateUrl: './case-activity-reint.component.html',
  styleUrls: ['./case-activity-reint.component.scss'],
  outputs: ['caFormOut', 'cancelOut'],
  providers: [MessageService]
})
export class CaseActivityReintComponent implements OnInit {
  caseActivityForm: FormGroup;
  cisCaseActive: CisCaseActivity = new CisCaseActivity();
  results = [];
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
  personTypeId: any;
  procodeIdList = [];
  filteredProcodeList = [];
  referralKey = [];

  // text area names
  staffNotes = "staffNotes";

  @Output()
  caFormOut = new EventEmitter();
  cancelOut = new EventEmitter();

  constructor(public _fb: FormBuilder, public _openCards: OpencardsService, public _client: ClildFormService, public messageService: MessageService) { }

  ngOnInit() {
    this.formValidation();
    if (localStorage.getItem('isFinalized') === 'true') {
      this.isFinalize = false;
    }
    this.getJson();
  }

  formValidation() {
    this.caseActivityForm = this._fb.group({
      begindate: [null],
      finalizedDate: [null],
      proCode: [null],
      endDate: [null],
      contactType: [null],
      program: [null],
      facts: [null],
      showMultiClient: [null],
      ClientName: [null],
      procodeTypeField: [null],
      file: [null],
      personTypeField: [null],
      formName: [null],
      staffName: [null],
      multiClientValue: [null],
      multiClient: [null],
      staffNotes: [null],
      id: [null],
      personType: [null],
      referralTypeID: [null],
      contactTypeField: [null],
      clientId: [null],
      PDFDoc: [null],
      referralId: [null],
      created: [null],
      beginDate: [null],
      enddate: [null],
      Signature: [null],
      name: [null],
      Kaecses: [null],
      updated: [null],
      uploadFileDate: [null],
      staffId: [null],
      procodeIdList: [null],
      status: [null],
      contact: [null],
      person: [null],
      procodeType: [null]
    });
  }
  getProcodeByReferralTypeId() {
    switch (this.cisCaseActive.referralTypeID) {
      case 1 || 6 || 20:
        this.referralKey = ['isFCCaseActivity', 'isReintegration'];
        break;
      case 2:
        this.referralKey = ['isFamilyPres', 'isFPCaseActivity'];
        break;
      case 4:
        this.referralKey = ['isNCFCH'];
        break;
      case 5:
        this.referralKey = ['isNCFICaseActivity', 'isNCFI'];
        break;
      case 7:
        this.referralKey = ['isNCRFC', 'isNCRFCCaseActivity'];
        break;
      case 8:
        this.referralKey = ['isNCHS'];
        break;
      case 9:
        this.referralKey = ['isNCOPS'];
        break;
      case 10:
        this.referralKey = ['isNCFCHOK', 'isNCFCHOKCaseActivity'];
        break;
      case 11:
        this.referralKey = ['isNCMHR'];
        break;
      case 12:
        this.referralKey = ['isNCFCHNE', 'isNCFCHNECaseActivity'];
        break;
      case 13:
        this.referralKey = ['isNCKIPP'];
        break;
      case 15:
        this.referralKey = ['isBHOK', 'isBHOKCaseActivity'];
        break;
      case 16:
        this.referralKey = ['isNCBHOK', 'isNCBHOKCaseActivity'];
        break;
      default:
        console.log('default');
        break;
    }
  }
  getPersonType(event) {
    let req;
    req = { 'isCaseActivity': "true" };
    this._openCards.getPersonList(req).then((data) => {
      this.results = data.personType;
    })
  }
  getContactType(event) {
    this._openCards.getContactList().then((data) => {
      this.results = data.contactType;
    })
  }
  getProcodeFinalValue() {
    let procodeID = [];
    return this.getPersonTypeID().then(() => {
      this._openCards.getPersonTypeProcodeList().then((data) => {
        data.personTypeProcode.filter((obj) => {
          if (obj.personTypeID === this.personTypeId) {
            procodeID.push(obj.procodeID);
          }
        })
      })
      this.procodeIdList = procodeID;
      this.cisCaseActive.procodeIdList = this.procodeIdList;
    })

  }
  getPersonTypeID() {
    let req;
    req = { 'isCaseActivity': "true" };
    return this._openCards.getPersonList(req).then((item) => {

      item.personType.filter((data: any) => {
        if (data.personType.toLowerCase() === this.cisCaseActive.person.personType.toLowerCase()) {
          this.personTypeId = data.personTypeID;
        }
      })
    })
  }
  getProcode() {
    this.getProcodeFinalValue().then(() => {
      this.getProcodeByReferralTypeId();
    }).then(() => {
      this._openCards.getProcodeList().then((data) => {
        this.cisCaseActive.procodeIdList.map((procodeList) => {
          data.procode.filter((filteredData) => {
            if (this.referralKey.length === 1) {
              if ((filteredData.procodeID === procodeList) && (filteredData[this.referralKey[0]] === true)) {
                if ((filteredData.beginDate <= new Date(this.cisCaseActive.begindate.value)) && ((filteredData.endDate >= new Date(this.cisCaseActive.enddate.value)) || (filteredData.endDate === null))) {
                  this.filteredProcodeList.push(filteredData);
                }
              }
            } else if (this.referralKey.length === 2) {
              if ((filteredData.procodeID === procodeList) && (filteredData[this.referralKey[0]] === true) && (filteredData[this.referralKey[1]] === true)) {
                if ((filteredData.beginDate <= new Date(this.cisCaseActive.begindate.value)) && ((filteredData.endDate >= new Date(this.cisCaseActive.enddate.value)) || (filteredData.endDate === null))) {
                  this.filteredProcodeList.push(filteredData);
                }
              }
            }
          })
        })
      })
    })

    let procodeList = [];
    this.filteredProcodeList.map(data => {
      procodeList.push({ 'procodeTypeField': data.procode + " - " + data.categoryOfService })
    })
    this.results = procodeList.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });
    this.cisCaseActive.contactType = this.cisCaseActive.contact.contactType;
    this.cisCaseActive.personType = this.cisCaseActive.person.personType;
  }

  printForm() {
    console.log('printForm');
  }

  async saveForm(source: any) {
    this.isDisable = true;
    source.begindate.value = !isNullOrUndefined(source.begindate.value) ? this.cisCaseActive.begindate.value = new Date(this.cisCaseActive.begindate.value) : null;
    source.enddate.value = !isNullOrUndefined(source.enddate.value) ? this.cisCaseActive.enddate.value = new Date(this.cisCaseActive.enddate.value) : null;
    source.personType = !isNullOrUndefined(source.person) ? this.cisCaseActive.personType = this.cisCaseActive.person.personType : null;
    source.contactType = !isNullOrUndefined(source.contact) ? this.cisCaseActive.contactType = this.cisCaseActive.contact.contactType : null;
    source.contactTypeField.value = !isNullOrUndefined(source.contactTypeField.value) ? this.cisCaseActive.contactTypeField.value = this.cisCaseActive.contact.contactType : null;
    source.personTypeField.value = !isNullOrUndefined(source.personTypeField.value) ? this.cisCaseActive.personTypeField.value = this.cisCaseActive.person.personType : null;
    source.procodeTypeField.value = !isNullOrUndefined(source.procodeTypeField.value) ? this.cisCaseActive.procodeTypeField.value = this.cisCaseActive.procodeType.procodeTypeField : null;

    if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'You cannot update the Finalized Form' });
    }
    else if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';

      const saveCisFormJson = {
        "caseActivityID": parseInt(localStorage.getItem('CisCaseActivityId')),
        "isFinalized": false,
        // "cmsCisPdfDocID": this.cmsCisPdfDocID,
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
      this.caseActivityForm.disable();
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

        this.cisCaseActive = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        this.cisCaseActive.person = { 'personType': this.cisCaseActive.personTypeField.value };
        this.cisCaseActive.contact = { 'contactType': this.cisCaseActive.contactTypeField.value };
        this.cisCaseActive.procodeType = { 'procodeTypeField': this.cisCaseActive.procodeTypeField.value };

        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;


        }


        this.cisCaseActive.beginDate = !isNullOrUndefined(this.cisCaseActive.beginDate) ? this.cisCaseActive.beginDate = new Date(this.cisCaseActive.beginDate) : null;
        this.cisCaseActive.endDate = !isNullOrUndefined(this.cisCaseActive.endDate) ? this.cisCaseActive.endDate = new Date(this.cisCaseActive.endDate) : null;

        this.cmsCisPdfDocID = data.cmsCisPdfDoc[this.currentCisVersion].cmsCisPdfDocID;

        this.multiClientArr = this.cisCaseActive.multiClient;

        loader.style.display = 'none';
        this.caseActivityForm.disable();

      })
  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      this.editControll = false;
      this.caseActivityForm.enable();

    }
    else {
      this.editControll = true;
    }

  }



  async finalizeForm(source: any) {

    source.begindate.value = !isNullOrUndefined(source.begindate.value) ? this.cisCaseActive.begindate.value = new Date(this.cisCaseActive.begindate.value) : null;
    source.enddate.value = !isNullOrUndefined(source.enddate.value) ? this.cisCaseActive.enddate.value = new Date(this.cisCaseActive.enddate.value) : null;

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
      this.caseActivityForm.disable();
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


}
