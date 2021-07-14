import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpProgressNote } from './fp-progress-note';
import html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';
import { TeamFormService } from '../../team-form/team-form.service';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import * as moment from 'moment';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-progress-note',
  templateUrl: './progress-note.component.html',
  styleUrls: ['./progress-note.component.scss', '../family-preservation.scss'],
  outputs: ['progressOut']
})
export class ProgressNoteComponent implements OnInit {

  constructor(public _printPdf: PrintPdf, public _referral: ReferralViewService, public _client: ClildFormService, public _opencard: OpencardsService, public _team: TeamFormService, public _fb: FormBuilder, public _router: Router) { }
  fpProgressNote: FpProgressNote = new FpProgressNote();
  ProgressNoteForm: FormGroup;
  isPrint = true;
  editControll = true;
  formLogInfo: any;
  isFormLog: any;

  @Output()
  progressOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-activity/detail') {
      this.getCmsFormJson();
      this.ProgressNoteForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/case-activity/new') {
      this.editControll = false;
      this.autoFetchDetails();
    }

  }

  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpProgressNote = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = moment.utc(formData.dateOfReferral).format('MM/DD/YYYY') : null;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = moment.utc(formData.dateOfReferral).format('MM/DD/YYYY') : null;
    !isNullOrUndefined(formData.date) ? formData.date = moment.utc(formData.date).format('MM/DD/YYYY') : null;
    !isNullOrUndefined(formData.therapistDate) ? formData.therapistDate = moment.utc(formData.therapistDate).format('MM/DD/YYYY') : null;
    this.fpProgressNote = formData;

  }

  saveForm(event, source) {
    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.therapistDate) ? source.therapistDate = Date.parse(source.therapistDate) : null;
    this.progressOut.emit({ cmsData: source });
  }
  discardForm() {
    this.progressOut.emit({ cmsData: {} });
  }
  editForm() {
    this.ProgressNoteForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.ProgressNoteForm = this._fb.group({

      caseName: [null],
      caseNumber: [null],
      dateOfReferral: [null],
      date: [null],
      startTime: [null],
      endTime: [null],
      duration: [null],
      serviceProvider: [null],

      officeLocation: [null],
      clientLocation: [null],

      isIndividualTherapy: [false],
      isFamilyTherapy: [false],

      originatingSite: [null],
      distantSite: [null],

      isGroupTherapy: [false],
      isFamilyTherapyInClinic: [false],
      isInitialPsych: [false],
      isCaseConference: [false],

      diagnosis: [null],
      participant: [null],
      aloneTimeWithChild: [null],
      childExceptions: [null],
      objectivesAddressed: [null],

      communityResources: [null],
      clientFunctioning: [null],
      collaborativeChanges: [null],
      changesInDiagnosis: [null],

      isGood: [false],
      isFair: [false],
      isGuarded: [false],
      isPoorGaf: [false],

      poorGaf: [null],

      treatmentNeeded: [null],
      moodDisorder: [null],
      continuedImpairment: [null],
      interpersonal: [null],
      impairmentInSocial: [null],
      careCriteria: [null],
      servicesNecessary: [null],
      continuedNeed: [null],

      isSevere: [false],
      isEuthymic: [false],
      isNoImpairment: [false],
      isBlunted: [false],
      isNone: [false],
      isModerate: [false],
      isDepressed: [false],
      isDisorganized: [false],
      isRestricted: [false],
      isIdeation: [false],
      isMild: [false],
      isIrritable: [false],
      isPoorConcentration: [false],
      isIntense: [false],
      isPlan: [false],
      isMinimal: [false],
      isAnxious: [false],
      isImpairedAbstract: [false],
      isAppropriate: [false],
      isGestures: [false],
      isImpairmentNone: [false],
      isEuphoric: [false],
      isImpairedJudgment: [false],
      isFlat: [false],
      isOngoingConcern: [false],
      isImpairmentOther: [false],

      impairmentOther: [null],

      isDetached: [false],

      /////////////
      isSafetyConcernsYes: [false],
      isSafetyConcernsNo: [false],
      isSafetyConcernsNa: [false],

      isHomeCleanYes: [false],
      isHomeCleanNo: [false],
      isHomeCleanNa: [false],

      isHeightNormalYes: [false],
      isHeightNormalNo: [false],
      isHeightNormalNa: [false],

      isChildCleanYes: [false],
      isChildCleanNo: [false],
      isChildCleanNa: [false],

      isUnusualMarksYes: [false],
      isUnusualMarksNo: [false],
      isUnusualMarksNa: [false],

      isChildAppearanceYes: [false],
      isChildAppearanceNo: [false],
      isChildAppearanceNa: [false],

      nextAppointment: [null],
      planForClient: [null],

      therapistName: [null],
      therapistSignature: [null],
      therapistDate: [null],

      isCertified: [false]

      //////

    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        this.fpProgressNote.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.fpProgressNote.caseNumber = data.person.kaecses;
        this.fpProgressNote.date = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        this.fpProgressNote.dateOfReferral = moment.utc(data.referral.referralDate).format('MM/DD/YYYY');
      });

    this._team.getUserName()
      .then((data) => {
        // future additions
      });
  }

}
