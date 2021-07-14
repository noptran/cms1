import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


import { CisAdoption } from './cis-adoption';

import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { MessageService } from 'primeng/api';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-adoptive-resource-inquiry',
  templateUrl: './adoptive-resource-inquiry.component.html',
  styleUrls: ['./adoptive-resource-inquiry.component.scss', '../../../family-preservation/family-preservation.scss'],
  outputs: ['adoptionOut', 'cancelOut'],
  providers: [MessageService]
})
export class AdoptiveResourceInquiryComponent implements OnInit {
  adoptionForm: FormGroup;
  cisAdoption: CisAdoption = new CisAdoption();

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
  motivation = "motivation"
  AwareOfChild = "AwareOfChild"
  Relationship = "Relationship"
  concerns = "concerns"

  @Output()
  adoptionOut = new EventEmitter();
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
    this.adoptionForm = this._fb.group({
      ps: [null],
      ChildrenInTheHomeAGe3: [null],
      program: [null],
      FamilyEmail: [null],
      FamilyAddress: [null],
      AssessmentCompleted: [null],
      ClientName: [null],
      ChildrenInTheHomeAge2: [null],
      KinshipPlacement: [null],
      Motivation: [null],
      ChildrenInTheHomeAge1: [null],
      id: [null],
      DateOfBirth: [null],
      OtherIndividuals5: [null],
      OtherIndividuals4: [null],
      OtherIndividuals3: [null],
      OtherIndividuals2: [null],
      PastState: [null],
      referralId: [null],
      created: [null],
      SiblingsOutOfHomeCaseplangoal5: [null],
      ChildrenInTheHomeAge5: [null],
      SiblingsOutOfHomeCaseplangoal6: [null],
      ChildrenInTheHomeAge4: [null],
      SiblingsOutOfHomeCaseplangoal3: [null],
      SiblingsOutOfHomeCaseplangoal4: [null],
      OtherIndividuals1: [null],
      SiblingsOutOfHomeCaseplangoal1: [null],
      SiblingsOutOfHomeCaseplangoal2: [null],
      ChildrenInTheHome3: [null],
      AnotherState: [null],
      ChildrenInTheHome2: [null],
      ChildrenInTheHome1: [null],
      childWorker: [null],
      name: [null],
      ChildrenInTheHome5: [null],
      ChildrenInTheHome4: [null],
      updated: [null],
      uploadFileDate: [null],
      status: [null],
      finalizedDate: [null],
      FamilyName: [null],
      FamilyPhone: [null],
      ClientPhone1: [null],
      ClientPhone2: [null],
      file: [null],
      OtherIndividualsAge5: [null],
      formName: [null],
      staffName: [null],
      CompletionDate: [null],
      SiblingsOutOfHomeAge1: [null],
      SiblingsOutOfHomeAge3: [null],
      clientId: [null],
      licensed: [null],
      SiblingsOutOfHomeAge2: [null],
      PDFDoc: [null],
      OtherIndividualsAge3: [null],
      OtherIndividualsAge4: [null],
      ResourceForSiblings: [null],
      OtherIndividualsAge1: [null],
      OtherIndividualsAge2: [null],
      SponsoringAgency: [null],
      concerns: [null],
      SiblingsOutOfHomeAge5: [null],
      Inquiry: [null],
      SiblingsOutOfHomeAge4: [null],
      AwareOfChild: [null],
      SiblingsOutOfHomeAge6: [null],
      SiblingsOutOfHomeName3: [null],
      SiblingsOutOfHomeName2: [null],
      SiblingsOutOfHomeName5: [null],
      SiblingsOutOfHomeName4: [null],
      ApprovedSplit: [null],
      SiblingsOutOfHomeName1: [null],
      Relationship: [null],
      Kaecses: [null],
      ResourceForSibling: [null],
      SiblingsOutOfHomeName6: [null],
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
        "adoptionID": this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].adoptionID.adoptionID,
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
      this.adoptionForm.disable();
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'Please Update the Latest Version' });
    }
  }

  getJson() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';

    const data = { 'adoptionId': this._client.getId() };


    this.currentCisVersion = this._openCards.getCisJsonVersion();
    this.formJsonValue = this._openCards.getBehavioralCisJson(data)
      .then(async (data) => {
        this.cisFormJson = data;
        this.isCisJsonSaved = true;

        this.cisAdoption = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }
        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;


        }



        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;

        loader.style.display = 'none';
        this.adoptionForm.disable();

      })

  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      this.editControll = false;
      this.adoptionForm.enable();

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
        "adoptionID": this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].adoptionID.adoptionID,
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
      this.adoptionForm.disable();
    }

  }

  discardForm() {

    this.cancelOut.emit();
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
    console.log('printForm');
  }


}
