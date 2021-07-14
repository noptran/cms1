import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { CisIniFamily } from './cis-ini-family';

import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-initial-family',
  templateUrl: './initial-family.component.html',
  styleUrls: ['./initial-family.component.scss', '../../../family-preservation/family-preservation.scss'],
  outputs: ['initialFamilyOut', 'cancelOut'],
  providers: [MessageService]
})
export class InitialFamilyComponent implements OnInit {
  initialFamilyForm: FormGroup;
  cisInitialFamily: CisIniFamily = new CisIniFamily();

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
  initialFamilyOut = new EventEmitter();
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
    this.initialFamilyForm = this._fb.group({
      careServiceGuardian: [null],
      clientRightGuardian: [null],
      mandatedGuardian: [null],
      program: [null],
      NumberlivingHousehold: [null],
      ParentsCaregiversNotes: [null],
      privacyClient: [null],
      NextCourtHearingTime: [null],
      authorized: [null],
      photographsSFCSstaffGuardian: [null],
      questionsComments: [null],
      id: [null],
      NextVisitTime: [null],
      Signature3: [null],
      Signature2: [null],
      Signature1: [null],
      customerCareClient: [null],
      appointments: [null],
      dcfSignature1: [null],
      ServicePlan: [null],
      dcfSignature2: [null],
      immunizationClient: [null],
      dcfSignature3: [null],
      notauthorized: [null],
      photographsSFCSNonstaffClient: [null],
      NextVisitDate: [null],
      SafetyPlan: [null],
      photographsSFCSNonstaffGuardian: [null],
      SFCSSignature3: [null],
      ParentquestionsComments: [null],
      SFCSSignature2: [null],
      SFCSSignature1: [null],
      customerCareGuardian: [null],
      SFCSworker: [null],
      uploadFileDate: [null],
      status: [null],
      dateTime: [null],
      communicationSensoryImpairment: [null],
      privacyGuardian: [null],
      facts: [null],
      Riskconcerns: [null],
      immunizationGuardian: [null],
      SingleParent: [null],
      file: [null],
      formName: [null],
      staffName: [null],
      NextVisitNotes: [null],
      grievanceGuardian: [null],
      Communication: [null],
      Provision: [null],
      clientId: [null],
      ParentsCaregiversTime: [null],
      proficiencyClient: [null],
      PDFDoc: [null],
      communicationGuardian: [null],
      Rolesresponsiblities: [null],
      NextCourtHearingDate: [null],
      emailConsentGuardian: [null],
      ParentsCaregiversDate: [null],
      clientRightClient: [null],
      ClientName: [null],
      mandatedClient: [null],
      photographsSFCSstaffClient: [null],
      releasesSigned: [null],
      AnnualHousehold: [null],
      InitialCasePlanTime: [null],
      providerClient: [null],
      homeplacement: [null],
      emailConsentClient: [null],
      CaregiverSignature1: [null],
      CaregiverSignature3: [null],
      CaregiverSignature2: [null],
      InitialCasePlanDate: [null],
      referralId: [null],
      created: [null],
      proficiencyGuardian: [null],
      neededAssessments: [null],
      careServiceClient: [null],
      grievanceClient: [null],
      Introduction: [null],
      clientSensoryImpairment: [null],
      name: [null],
      _id: [null],
      updated: [null],
      ClientSignature: [null],
      providerGuardian: [null],
      finalizedDate: [null],
      safetyConcerns: [null],
      _rev: [null],
      InitialCasePlanNotes: [null],
      NextCourtHearingNotes: [null],
      PreferredLanguage: [null],
      communicationClient: [null],
      CaregiverSignature: [null],
      RelativeKinship: [null],
      familyStrengths: [null],
      AnnualHouseholdInput: [null],
      sensoryImpairment: [null],
      staffId: [null],
      Location: [null],
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

          this.cancelOut.emit();
          this.cisPdfJsonIdFinalize = data.cisPdfJsonID;
          this.isDisable = false;
        })
      loader.style.display = 'none';
      this.initialFamilyForm.disable();
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

        this.cisInitialFamily = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;


        }



        this.cisInitialFamily.InitialCasePlanDate.value = !isNullOrUndefined(this.cisInitialFamily.InitialCasePlanDate.value) ? this.cisInitialFamily.InitialCasePlanDate.value = new Date(this.cisInitialFamily.InitialCasePlanDate.value) : null;
        this.cisInitialFamily.NextCourtHearingDate.value = !isNullOrUndefined(this.cisInitialFamily.NextCourtHearingDate.value) ? this.cisInitialFamily.NextCourtHearingDate.value = new Date(this.cisInitialFamily.NextCourtHearingDate.value) : null;
        this.cisInitialFamily.NextVisitDate.value = !isNullOrUndefined(this.cisInitialFamily.NextVisitDate.value) ? this.cisInitialFamily.NextVisitDate.value = new Date(this.cisInitialFamily.NextVisitDate.value) : null;
        this.cisInitialFamily.ParentsCaregiversDate.value = !isNullOrUndefined(this.cisInitialFamily.ParentsCaregiversDate.value) ? this.cisInitialFamily.ParentsCaregiversDate.value = new Date(this.cisInitialFamily.ParentsCaregiversDate.value) : null;


        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;

        loader.style.display = 'none';
        this.initialFamilyForm.disable();

      })

  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      this.editControll = false;
      this.initialFamilyForm.enable();

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
      this.initialFamilyForm.disable();
    }



  }

  discardForm() {

    this.cancelOut.emit();

  }

  rowMethod(event) {
    if (!isNullOrUndefined(event)) {
      let singleNewLineCount = this._openCards.search_word(event, "\n");
      let doubleNewLineCount = this._openCards.search_word(event, "\n\n");
      return Math.ceil((event.length / 130) + (singleNewLineCount - doubleNewLineCount));
    }
    else {
      return 3;
    }
  }

  printForm() {
    console.log('printForm');
  }

}
