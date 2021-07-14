import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { CisPermanency } from './cis-permanency';

import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-permanency-release',
  templateUrl: './permanency-release.component.html',
  styleUrls: ['./permanency-release.component.scss', '../../../family-preservation/family-preservation.scss'],
  outputs: ['permanencyOut', 'cancelOut'],
  providers: [MessageService]
})
export class PermanencyReleaseComponent implements OnInit {
  permanencyForm: FormGroup;
  cisPermanency: CisPermanency = new CisPermanency();

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
  permanencyOut = new EventEmitter();
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
    this.permanencyForm = this._fb.group({
      CustodialParent: [null],
      program: [null],
      NewCourtCaseNo: [null],
      ClientName: [null],
      NonCustodialParent: [null],
      PreviousPlacementAddress: [null],
      REUNI: [null],
      id: [null],
      PermanencyPlacementName: [null],
      SocialWorker: [null],
      Relative: [null],
      Released: [null],
      HighestGradeCompleted: [null],
      referralId: [null],
      created: [null],
      DateCountAcceptedVenue: [null],
      InitiatedDCF: [null],
      StaffName: [null],
      NonRelatives: [null],
      InitiatedSFCS: [null],
      ReturnedHome: [null],
      PreviousPlacementName: [null],
      name: [null],
      ChangeOfVenu: [null],
      nonCustodial_Parent: [null],
      AfterCareCompleted: [null],
      PreviousPlacementLevelOfCare: [null],
      PreviousPlacementSchool: [null],
      updated: [null],
      uploadFileDate: [null],
      Judge: [null],
      status: [null],
      Office: [null],
      finalizedDate: [null],
      DateOfRelease: [null],
      ChangeOfVenueTo: [null],
      AdoptivePlacement: [null],
      ChildDeath: [null],
      KDOC: [null],
      Custodianship: [null],
      NewDCFWorker: [null],
      file: [null],
      formName: [null],
      staffName: [null],
      validationCheckboxFields: [null],
      CompletionDate: [null],
      email: [null],
      AgedOut: [null],
      clientId: [null],
      APASigned: [null],
      custodial_Parent: [null],
      PDFDoc: [null],
      PermanencyPlacementSchool: [null],
      PermanencyPlacementPhone: [null],
      DirectPlacement: [null],
      Facts: [null],
      PermanencyPlacementAddress: [null],
      DCFRetraction: [null],
      AfterCareLivingOutOfState: [null],
      Kaecses: [null],
      InitiatedCourt: [null],
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
        "permanencyEventID": this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].permanencyEventID.permanencyEventID,
        "isFinalized": false,
        "cmsCisPdfDocID": this.cisPdfJsonID,
        "pdfJsonData": source,
        "version": this.cisFormJson.cmsCisPdfDoc.length,
        "staffID": localStorage.getItem('UserId')

      }
      console.log("courtId in saveCisFormJson is", this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].permanencyEventID.permanencyEventID)
      this.update = await this._openCards.updateCisForm(saveCisFormJson)
        .then((data) => {

          this.cancelOut.emit();

          this.cisPdfJsonIdFinalize = data.cisPdfJsonID;

          this.isDisable = false;

        })
      loader.style.display = 'none';
      this.permanencyForm.disable();
    }
    else {

      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'Please Update the Latest Version' });
    }
  }

  getJson() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const data = { 'permanencyEventId': this._client.getId() };
    this.currentCisVersion = this._openCards.getCisJsonVersion();
    this.formJsonValue = this._openCards.getBehavioralCisJson(data)
      .then(async (data) => {
        this.cisFormJson = data;
        this.isCisJsonSaved = true;

        this.cisPermanency = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;


        }


        this.cisPermanency.DateOfRelease.value = !isNullOrUndefined(this.cisPermanency.DateOfRelease.value) ? this.cisPermanency.DateOfRelease.value = new Date(this.cisPermanency.DateOfRelease.value) : null;
        this.cisPermanency.CompletionDate.value = !isNullOrUndefined(this.cisPermanency.CompletionDate.value) ? this.cisPermanency.CompletionDate.value = new Date(this.cisPermanency.CompletionDate.value) : null;

        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;


        loader.style.display = 'none';
        this.permanencyForm.disable();

      })
  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      this.editControll = false;
      this.permanencyForm.enable();

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
        "permanencyEventID": this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].permanencyEventID.permanencyEventID,
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
      this.permanencyForm.disable();
    }



  }

  discardForm() {

    this.cancelOut.emit();

  }

  rowMethod(event) {
    if (!isNullOrUndefined(event)) {
      let singleNewLineCount = this._openCards.search_word(event, "\n");
      let doubleNewLineCount = this._openCards.search_word(event, "\n\n");
      return Math.ceil((event.length / 150) + (singleNewLineCount - doubleNewLineCount));
      
    }
    else {
      return 3;
    }
  }

  printForm() {
    console.log('printForm');
  }

}
