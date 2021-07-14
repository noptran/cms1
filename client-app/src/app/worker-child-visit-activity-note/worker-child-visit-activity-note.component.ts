import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { workerChild } from './worker-child';

import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { MessageService } from 'primeng/api';
import html2pdf from 'html2pdf.js';
import { PrintService } from '../print-layout/service/print.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-worker-child-visit-activity-note',
  templateUrl: './worker-child-visit-activity-note.component.html',
  styleUrls: ['./worker-child-visit-activity-note.component.scss'],
  outputs: ['wcvnFormOut', 'cancelOut'],
  providers: [MessageService]
})
export class WorkerChildVisitActivityNoteComponent implements OnInit {

  workerChildVisit: FormGroup;
  workerChild: workerChild = new workerChild();
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


  @Output()
  wcvnFormOut = new EventEmitter();
  cancelOut = new EventEmitter();

  constructor(public printService: PrintService, public _fb: FormBuilder, public _openCards: OpencardsService, public _client: ClildFormService, public messageService: MessageService) { }


  ngOnInit() {
    this.formValidation();
    if (localStorage.getItem('isFinalized') === 'true') {
      this.isFinalize = false;
    }
    this.getJson();
  }

  formValidation() {
    this.workerChildVisit = this._fb.group({
      proCode: [null],
      ClientName: [null],
      caseNo: [null],
      multiClient: [null],
      CompletionDate: [null],
      FromTime: [null],
      ToTime: [null],
      Place: [null],
      presentAtVisit: [null],
      DidWorkerSpendTimeAloneWithChild: [null],
      PlacementSupportiveofMeeting: [null],
      DescriptionAndCommentsByChild: [null],
      casePlanGoal: [null],
      HomeIsFreeOfSafetyConcerns: [null],
      ChildsAppearanceIsHealthy: [null],
      HomeIsClean: [null],
      FreeFromUnusualMarksOrBruising: [null],
      homicidalThoughts: [null],
      suicidalThoughts: [null],
      caregiverProtectiveCapacity: [null],
      additionalSafetyConcerns: [null],
      placementEnvironment: [null],
      childAppearance: [null],
      interactionWithCaregiver: [null],
      safetyConcernsIndentified: [null],
      familySafetyMitigationStrengths: [null],
      safetyConcernsContributingFactors: [null],
      SafetyPlanReviewed: [null],
      Changeinplacementhousehold: [null],
      HeightandWeightappearnormal: [null],
      ChildHasAdequateSpace: [null],
      ChildisCleanNeatlyGroomed: [null],
      caregiverNaturalAndCommunitySupports: [null],
      ChildFeelsSafeAndTreatedWell: [null],
      caregiverDemonstratesAbilityToProvideCare: [null],
      displayedSelfHarmingBehavior: [null],
      displayedAgressiveBehavior: [null],
      additionalSafetyConcernsSinceLastVisit: [null],
      placementEnvironmentRiskSection: [null],
      childsAppearance: [null],
      interactionWithCaregiverRiskSection: [null],
      safetyConcernsSinceLastVisit: [null],
      serviceMitigateConcerns: [null],
      visitDetailsRiskSection: [null],
      HasInteractionsWithParents: [null],
      FeelsParentInteractionsAreGoingWell: [null],
      HasInteractionsWithSiblings: [null],
      FeelsSiblingInteractionsAreGoingWell: [null],
      MaintainingOtherImportantConnections: [null],
      AttendingSchoolRegularly: [null],
      AdjustingToSchoolSverageGrades: [null],
      AttendingMentalHealthAppointments: [null],
      TakingMedicationsAsPrescribed: [null],
      ReviewOfLifeSkillsTransitionPlan: [null],
      ReviewOfPermanencyPlanAfterCarePlanProgress: [null],
      LifeBookIsUpdated: [null],
      Participatesinextracurricular: [null],
      CaseTeamMember: [null],
      AdditionalRemarksPositivesOrConcerns: [null],
      Follow: [null],
      PersonResponsible: [null],
      TargetDate: [null],
      Medical: [null],
      Adequate: [null],
      medication: [null],
      appointments: [null],
      maintaining: [null],
      school: [null],
      information: [null],
      informationprovided: [null],
      Scheduled: [null],
      Signature: [null],
      Provided: [null],
      extracurricular: [null]
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
      this.workerChildVisit.disable();
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

        this.workerChild = await JSON.parse(data.cmsCisPdfDoc[this.currentCisVersion].pdfJsonData);
        if (this.cisFormJson.cmsCisPdfDoc[this.currentCisVersion].isFinalized) {
          this.editControll = false;

        }

        if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
          this.isFinalizeButton = true;


        }


        this.workerChild.CompletionDate.value = !isNullOrUndefined(this.workerChild.CompletionDate.value) ? this.workerChild.CompletionDate.value = new Date(this.workerChild.CompletionDate.value) : null;

        this.cmsCisPdfDocID = data.cmsCisPdfDoc[this.currentCisVersion].cmsCisPdfDocID;

        loader.style.display = 'none';
        this.workerChildVisit.disable();

      })

  }

  editForm() {
    if (parseInt(this.currentCisVersion) == this.cisFormJson.cmsCisPdfDoc.length - 1) {
      this.editControll = false;
      this.workerChildVisit.enable();

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
      this.workerChildVisit.disable();
    }



  }

  discardForm() {

    this.cancelOut.emit();

  }

  printForm() {

    const data = this.workerChild;

    this.printService.isPrinting = true;
    this.printService
      .printDocument('worker-child', data);
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
