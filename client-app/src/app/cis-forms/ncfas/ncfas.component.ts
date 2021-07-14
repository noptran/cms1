import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Ncfas } from './ncfas';
import { OpencardsService } from '../../opecards-list-view/opencards.service';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { Router } from '@angular/router';


import { isNullOrUndefined } from 'util';
import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';
import * as moment from 'moment';


@Component({
  selector: 'app-ncfas',
  templateUrl: './ncfas.component.html',
  styleUrls: ['./ncfas.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['ncfasOut', 'cancelOut'],
  providers: [MessageService]
})
export class NcfasComponent implements OnInit {
  ncfasForm: FormGroup;
  unableToAccesForm: FormGroup;
  cisNcfas: Ncfas = new Ncfas();

  breadcrumbs = [];
  isPdfJsonID: any;
  update: any;
  editControll = true;
  isDisable = false;

  currentCisVersion: any;
  formJsonValue: any;
  cisFormJson: any;
  isCisJsonSaved = false;
  cisPdfJsonID: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  isFinalize = false;
  isUnableToAccess = false;
  cisPdfJsonIdFinalize: any;
  isFinalizeButton = false;
  tempRemarks = "";
  @Output()
  ncfasOut = new EventEmitter();
  cancelOut = new EventEmitter();

  constructor(public _fb: FormBuilder, public _openCards: OpencardsService, public _router: Router, public _client: ClildFormService, public messageService: MessageService) { }


  ngOnInit() {
    this.formValidation();

    if (localStorage.getItem('isFinalized') === 'true') {
      this.isFinalize = false;
    }

    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Behavioral Assessment', href: '/reintegration/referral/opencard/behavioral-assessment/dashboard', active: '' },
      { label: 'NCFAS', active: 'active' }
    );

    this.getJson();
  }

  formValidation() {
    this.ncfasForm = this._fb.group({
      Facts: [null],
      DateOfIntake: [null],
      DateOfCasePlan1: [null],
      DateOfCasePlan2: [null],
      DateOfReunification: [null],
      DateOfClosure: [null],
      CompletionDate: [null],
      StaffName: [null],
      AssessmentReason: [null],
      EnvironmentHousingStability: [null],
      EnvironmentSafety: [null],
      EnvironmentRisks: [null],
      EnvironmentHabitability: [null],
      EnvironmentHygiene: [null],
      EnvironmentLearning: [null],
      EnvironmentOverall: [null],
      EnvironmentComment: [null],
      ParentalCapabilitiesSupervision: [null],
      ParentalCapabilitiesDisciplinary: [null],
      ParentalCapabilitiesDevelopment: [null],
      ParentalCapabilitiesDrugs: [null],
      ParentalCapabilitiesEducation: [null],
      ParentalCapabilitiesMedia: [null],
      ParentalCapabilitiesLiteracy: [null],
      ParentalCapabilitiesOverall: [null],
      ParentalCapabilitiesComment: [null],
      FamilyInteractionsBonding: [null],
      FamilyInteractionsCommunication: [null],
      FamilyInteractionsExpectation: [null],
      FamilyInteractionsSupport: [null],
      FamilyInteractionsRelationshipCaregiver: [null],
      FamilyInteractionsRoutines: [null],
      FamilyInteractionsRecreation: [null],
      FamilyInteractionsOverall: [null],
      FamilyInteractionsComment: [null],
      FamilySafetyDomesticViolence: [null],
      FamilySafetyAbuse: [null],
      FamilySafetyConflict: [null],
      FamilySafetyEmotionalAbuse: [null],
      FamilySafetySexualAbuse: [null],
      FamilySafetyNeglect: [null],
      FamilySafetyWeapons: [null],
      ChildWellBeingBehavior: [null],
      ChildWellBeingSchool: [null],
      ChildWellBeingRelationshipParents: [null],
      ChildWellBeingSiblings: [null],
      ChildWellBeingPeers: [null],
      ChildWellBeingMaintainFamily: [null],
      ChildWellBeingOverall: [null],
      ChildWell: [null],
      SocialCommunityLifeSocial: [null],
      SocialCommunityLifeExtracurricular: [null],
      SocialCommunityLifeNeighborhood: [null],
      SocialCommunityLifeSpirtual: [null],
      SocialCommunityLifeHelp: [null],
      SocialCommunityLifeOverall: [null],
      SocialCommunityLifeComment: [null],
      SelfSuffciencyEmployment: [null],
      SelfSuffciencyIncome: [null],
      SelfSuffciencyManagement: [null],
      SelfSuffciencyFood: [null],
      SelfSuffciencyTransportation: [null],
      SelfSuffciencyOverall: [null],
      FamilyHealthParentsHealth: [null],
      FamilyHealthParentsDisabilaty: [null],
      FamilyHealthParentsMentalHealth: [null],
      FamilyHealthChildrensHealth: [null],
      FamilyHealthChildrensDisabilty: [null],
      FamilyHealthChildrensMentalHealth: [null],
      FamilyHealthAccessToMentalHealth: [null],
      FamilyHealthOverall: [null],
      FamilyHealthComment: [null],
      CaregiverChildAmbivalenceParentAmbivalenceChild: [null],
      CaregiverChildAmbivalenceChildAmbvialenceParent: [null],
      CaregiverChildAmbivalenceSubCareProvider: [null],
      CaregiverChildAmbivalenceDisruptedAttachment: [null],
      CaregiverChildAmbivalencePreUnificationVisits: [null],
      CaregiverChildAmbivalenceOverall: [null],
      CaregiverChildAmbivalenceComment: [null],
      ReadinessforReunificationCPS: [null],
      ReadinessforReunificationCompletion: [null],
      ReadinessforReunificationLegal: [null],
      ReadinessforReunificationTreatmentNeeds: [null],
      ReadinessforReunificationBackup: [null],
      ReadinessforReunificationOverall: [null],
      TextField2: [null],
      Signature: [null],
      title: [null],
      date: [null],
      FamilySafetyComment: [null],
      FamilySafetyOverall: [null],
      ParentName: [null],
      Self: [null],
      // disableValidate:[null]
    });
    this.unableToAccesForm = this._fb.group({
      disableValidate: [null]
    });
  }

  getJson() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const data = { 'baDocId': this._client.getId() };
    this.currentCisVersion = this._openCards.getCisJsonVersion();

    this.formJsonValue = this._openCards.getBehavioralCisJson(data)
      .then(async (data) => {


        this.cisFormJson = data;
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }
        this.isCisJsonSaved = true;

        this.cisNcfas = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);

        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;


        }
        this.cisNcfas.date.value = !isNullOrUndefined(this.cisNcfas.date.value) ? this.cisNcfas.date.value = new Date(this.cisNcfas.date.value) : null;


        this.cisPdfJsonID = data.cmsCisPdfDoc[this.currentCisVersion].cisPdfJsonID;

        loader.style.display = 'none';
        this.ncfasForm.disable();
        this.unableToAccesForm.disable();
        this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.ncfasForm.changedBy) ? data.ncfasForm.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.ncfasForm.changedDate) ? moment(data.ncfasForm.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.ncfasForm.enteredBy) ? data.ncfasForm.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.ncfasForm.enteredDate) ? moment(data.ncfasForm.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      })

  }

  async saveForm(source: any) {
    this.isDisable = true;

    if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {


      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'You cannot update the Finalized Form' });
    }
    else if (this.isUnableToAccess === true) {
      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'This form is under Unable To Access Mode' });
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
      this.update = await this._openCards.updateCisForm(saveCisFormJson)
        .then((data) => {

          this.cancelOut.emit();

          this.cisPdfJsonIdFinalize = data.cisPdfJsonID;


          if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
            this.isFinalize = true;

          }

          this.isDisable = false;

        })
      loader.style.display = 'none';
      this.ncfasForm.disable();
    }
    else {

      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'Please Update the Latest Version' });
    }


  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1 && this.isUnableToAccess === false) {


      this.editControll = false;
      if (this.cisNcfas.disableValidate === true) {

        this.ncfasForm.disable();
        this.unableToAccesForm.enable();
      }
      else {

        this.ncfasForm.enable();
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
    else if (this.isUnableToAccess === true) {
      this.messageService.add({ severity: 'info', summary: 'OOOPS !!!', detail: 'This form is under Unable To Access Mode' });
    }
    else {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';


      const saveCisFormJson = {
        "baDocID": this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].badocID.badocID,
        "isFinalized": true,
        "cisPdfJsonID": this.cisPdfJsonIdFinalize,
        "pdfJsonData": source,
        "version": this.cisFormJson.cmsCisPdfDoc.length,
        "staffID": localStorage.getItem('UserId')
      }
      this.update = await this._openCards.updateCisForm(saveCisFormJson)
        .then((data) => {
          this.cancelOut.emit();

        })
      loader.style.display = 'none';
      this.ncfasForm.disable();
    }



  }

  disableValidation(isDisableValidated) {
    if (isDisableValidated) {

      this.ncfasForm.disable();
    }
    else {

      this.ncfasForm.enable();
    }
  }

  discardForm() {

    this.cancelOut.emit();

  }

  handleDataField(event) {

    if (event === true) {


      this.ncfasForm.reset();

      this.cisNcfas.disableValidate = true;
      this.ncfasForm.disable();


    }
    else {
      this.cisNcfas.disableValidate = false;
      this.cisNcfas.remarks=this.tempRemarks;
      this.tempRemarks="";
      this.ncfasForm.enable();
    }

  }

  saveRemarks(remarks) {
    console.log("remarks in saveRemarks is", remarks);

  }

  rowMethod(event) {
    if (!isNullOrUndefined(event)) {
      let singleNewLineCount = this._openCards.search_word(event, "\n");
      let doubleNewLineCount = this._openCards.search_word(event, "\n\n");
      return Math.ceil((event.length / 145) + (singleNewLineCount - doubleNewLineCount));
    }
    else {
      return 3;
    }
  }

  printForm() {
    console.log('printForm');
  }

}
