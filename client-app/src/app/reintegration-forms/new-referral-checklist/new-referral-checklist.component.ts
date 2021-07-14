import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReintNewRefCheck } from './reint-new-ref-check';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
@Component({
  selector: 'app-new-referral-checklist',
  templateUrl: './new-referral-checklist.component.html',
  styleUrls: ['./new-referral-checklist.component.scss', '../../family-preservation/family-preservation.scss']
})
export class NewReferralChecklistComponent implements OnInit {
  newReferralChecklistForm: FormGroup;
  reintNewReferralChecklist: ReintNewRefCheck = new ReintNewRefCheck();
  isEdit = false;

  @Output()
  ifaFormOut = new EventEmitter()
  constructor(public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/referral/reintegration/new/referral/checklist/detail') { this.getDetails(); }

  }

  editForm() {
    this.isEdit = false;
    this.newReferralChecklistForm.enable();
  }

  saveForm(event, source) {

    !isNullOrUndefined(source.DateOfReferral) ? source.DateOfReferral = Date.parse(source.DateOfReferral) : null;
    !isNullOrUndefined(source.TimeOfReferral) ? source.TimeOfReferral = Date.parse(source.TimeOfReferral) : null;

    !isNullOrUndefined(source.DateDue) ? source.DateDue = Date.parse(source.DateDue) : null;
    !isNullOrUndefined(source.DateCompleted) ? source.DateCompleted = Date.parse(source.DateCompleted) : null;
    !isNullOrUndefined(source.DateDue1) ? source.DateDue1 = Date.parse(source.DateDue1) : null;
    !isNullOrUndefined(source.DateCompleted1) ? source.DateCompleted1 = Date.parse(source.DateCompleted1) : null;
    !isNullOrUndefined(source.DateDue2) ? source.DateDue2 = Date.parse(source.DateDue2) : null;
    !isNullOrUndefined(source.DateCompleted2) ? source.DateCompleted2 = Date.parse(source.DateCompleted2) : null;
    !isNullOrUndefined(source.DateDue3) ? source.DateDue3 = Date.parse(source.DateDue3) : null;
    !isNullOrUndefined(source.DateCompleted3) ? source.DateCompleted3 = Date.parse(source.DateCompleted3) : null;
    !isNullOrUndefined(source.DateDue4) ? source.DateDue4 = Date.parse(source.DateDue4) : null;
    !isNullOrUndefined(source.DateCompleted4) ? source.DateCompleted4 = Date.parse(source.DateCompleted4) : null;
    !isNullOrUndefined(source.DateDue5) ? source.DateDue5 = Date.parse(source.DateDue5) : null;
    !isNullOrUndefined(source.DateCompleted5) ? source.DateCompleted5 = Date.parse(source.DateCompleted5) : null;
    !isNullOrUndefined(source.DateDue6) ? source.DateDue6 = Date.parse(source.DateDue6) : null;
    !isNullOrUndefined(source.DateCompleted6) ? source.DateCompleted6 = Date.parse(source.DateCompleted6) : null;
    !isNullOrUndefined(source.DateDue7) ? source.DateDue7 = Date.parse(source.DateDue7) : null;
    !isNullOrUndefined(source.DateCompleted7) ? source.DateCompleted7 = Date.parse(source.DateCompleted7) : null;
    !isNullOrUndefined(source.DateDue8) ? source.DateDue8 = Date.parse(source.DateDue8) : null;
    !isNullOrUndefined(source.DateCompleted8) ? source.DateCompleted8 = Date.parse(source.DateCompleted8) : null;
    !isNullOrUndefined(source.DateDue9) ? source.DateDue9 = Date.parse(source.DateDue9) : null;
    !isNullOrUndefined(source.DateCompleted9) ? source.DateCompleted9 = Date.parse(source.DateCompleted9) : null;
    !isNullOrUndefined(source.DateDue10) ? source.DateDue10 = Date.parse(source.DateDue) : null;
    !isNullOrUndefined(source.DateCompleted10) ? source.DateCompleted10 = Date.parse(source.DateCompleted10) : null;
    !isNullOrUndefined(source.DateDue11) ? source.DateDue11 = Date.parse(source.DateDue11) : null;
    !isNullOrUndefined(source.DateCompleted11) ? source.DateCompleted11 = Date.parse(source.DateCompleted11) : null;
    !isNullOrUndefined(source.DateDue12) ? source.DateDue12 = Date.parse(source.DateDue12) : null;
    !isNullOrUndefined(source.DateCompleted12) ? source.DateCompleted12 = Date.parse(source.DateCompleted12) : null;
    !isNullOrUndefined(source.DateDue13) ? source.DateDue13 = Date.parse(source.DateDue13) : null;
    !isNullOrUndefined(source.DateCompleted13) ? source.DateCompleted13 = Date.parse(source.DateCompleted13) : null;
    !isNullOrUndefined(source.DateDue14) ? source.DateDue14 = Date.parse(source.DateDue14) : null;
    !isNullOrUndefined(source.DateCompleted14) ? source.DateCompleted14 = Date.parse(source.DateCompleted14) : null;
    !isNullOrUndefined(source.DateDue15) ? source.DateDue15 = Date.parse(source.DateDue15) : null;
    !isNullOrUndefined(source.DateCompleted15) ? source.DateCompleted15 = Date.parse(source.DateCompleted15) : null;
    !isNullOrUndefined(source.DateDue16) ? source.DateDue16 = Date.parse(source.DateDue16) : null;
    !isNullOrUndefined(source.DateCompleted16) ? source.DateCompleted16 = Date.parse(source.DateCompleted16) : null;
    !isNullOrUndefined(source.DateDue17) ? source.DateDue17 = Date.parse(source.DateDue17) : null;
    !isNullOrUndefined(source.DateCompleted17) ? source.DateCompleted17 = Date.parse(source.DateCompleted17) : null;
    !isNullOrUndefined(source.DateDue18) ? source.DateDue18 = Date.parse(source.DateDue18) : null;
    !isNullOrUndefined(source.DateCompleted18) ? source.DateCompleted18 = Date.parse(source.DateCompleted18) : null;
    !isNullOrUndefined(source.DateDue19) ? source.DateDue19 = Date.parse(source.DateDue19) : null;
    !isNullOrUndefined(source.DateCompleted19) ? source.DateCompleted19 = Date.parse(source.DateCompleted19) : null;
    !isNullOrUndefined(source.DateDue20) ? source.DateDue20 = Date.parse(source.DateDue20) : null;
    !isNullOrUndefined(source.DateCompleted20) ? source.DateCompleted20 = Date.parse(source.DateCompleted20) : null;
    !isNullOrUndefined(source.DateDue21) ? source.DateDue21 = Date.parse(source.DateDue21) : null;
    !isNullOrUndefined(source.DateCompleted21) ? source.DateCompleted21 = Date.parse(source.DateCompleted21) : null;
    !isNullOrUndefined(source.DateDue22) ? source.DateDue22 = Date.parse(source.DateDue22) : null;
    !isNullOrUndefined(source.DateCompleted22) ? source.DateCompleted22 = Date.parse(source.DateCompleted22) : null;
    !isNullOrUndefined(source.DateDue23) ? source.DateDue23 = Date.parse(source.DateDue23) : null;
    !isNullOrUndefined(source.DateCompleted23) ? source.DateCompleted23 = Date.parse(source.DateCompleted23) : null;
    !isNullOrUndefined(source.DateDue24) ? source.DateDue24 = Date.parse(source.DateDue24) : null;
    !isNullOrUndefined(source.DateCompleted24) ? source.DateCompleted24 = Date.parse(source.DateCompleted24) : null;
    !isNullOrUndefined(source.DateDue25) ? source.DateDue25 = Date.parse(source.DateDue25) : null;
    !isNullOrUndefined(source.DateCompleted25) ? source.DateCompleted25 = Date.parse(source.DateCompleted25) : null;
    !isNullOrUndefined(source.DateDue26) ? source.DateDue26 = Date.parse(source.DateDue26) : null;
    !isNullOrUndefined(source.DateCompleted26) ? source.DateCompleted26 = Date.parse(source.DateCompleted26) : null;
    !isNullOrUndefined(source.DateDue27) ? source.DateDue27 = Date.parse(source.DateDue27) : null;
    !isNullOrUndefined(source.DateCompleted27) ? source.DateCompleted27 = Date.parse(source.DateCompleted27) : null;
    !isNullOrUndefined(source.DateDue28) ? source.DateDue28 = Date.parse(source.DateDue28) : null;
    !isNullOrUndefined(source.DateCompleted28) ? source.DateCompleted28 = Date.parse(source.DateCompleted28) : null;
    !isNullOrUndefined(source.DateDue29) ? source.DateDue29 = Date.parse(source.DateDue29) : null;
    !isNullOrUndefined(source.DateCompleted29) ? source.DateCompleted29 = Date.parse(source.DateCompleted29) : null;
    !isNullOrUndefined(source.DateDue30) ? source.DateDue30 = Date.parse(source.DateDue30) : null;
    !isNullOrUndefined(source.DateCompleted30) ? source.DateCompleted30 = Date.parse(source.DateCompleted30) : null;
    !isNullOrUndefined(source.DateDue31) ? source.DateDue31 = Date.parse(source.DateDue31) : null;
    !isNullOrUndefined(source.DateCompleted31) ? source.DateCompleted31 = Date.parse(source.DateCompleted31) : null;
    !isNullOrUndefined(source.DateDue32) ? source.DateDue32 = Date.parse(source.DateDue32) : null;
    !isNullOrUndefined(source.DateCompleted32) ? source.DateCompleted32 = Date.parse(source.DateCompleted32) : null;
    !isNullOrUndefined(source.DateDue33) ? source.DateDue33 = Date.parse(source.DateDue33) : null;
    !isNullOrUndefined(source.DateCompleted33) ? source.DateCompleted33 = Date.parse(source.DateCompleted33) : null;
    !isNullOrUndefined(source.DateDue34) ? source.DateDue34 = Date.parse(source.DateDue34) : null;
    !isNullOrUndefined(source.DateCompleted34) ? source.DateCompleted34 = Date.parse(source.DateCompleted34) : null;
    !isNullOrUndefined(source.DateDue35) ? source.DateDue35 = Date.parse(source.DateDue35) : null;
    !isNullOrUndefined(source.DateCompleted35) ? source.DateCompleted35 = Date.parse(source.DateCompleted35) : null;
    !isNullOrUndefined(source.DateDue36) ? source.DateDue36 = Date.parse(source.DateDue36) : null;
    !isNullOrUndefined(source.DateCompleted36) ? source.DateCompleted36 = Date.parse(source.DateCompleted36) : null;
    !isNullOrUndefined(source.DateDue37) ? source.DateDue37 = Date.parse(source.DateDue37) : null;
    !isNullOrUndefined(source.DateCompleted37) ? source.DateCompleted37 = Date.parse(source.DateCompleted37) : null;
    !isNullOrUndefined(source.DateDue38) ? source.DateDue38 = Date.parse(source.DateDue38) : null;
    !isNullOrUndefined(source.DateCompleted38) ? source.DateCompleted38 = Date.parse(source.DateCompleted38) : null;
    !isNullOrUndefined(source.DateDue39) ? source.DateDue39 = Date.parse(source.DateDue39) : null;
    !isNullOrUndefined(source.DateCompleted39) ? source.DateCompleted39 = Date.parse(source.DateCompleted39) : null;
    !isNullOrUndefined(source.DateDue40) ? source.DateDue40 = Date.parse(source.DateDue40) : null;
    !isNullOrUndefined(source.DateCompleted40) ? source.DateCompleted40 = Date.parse(source.DateCompleted40) : null;
    !isNullOrUndefined(source.DateDue41) ? source.DateDue41 = Date.parse(source.DateDue41) : null;
    !isNullOrUndefined(source.DateCompleted41) ? source.DateCompleted41 = Date.parse(source.DateCompleted41) : null;
    !isNullOrUndefined(source.DateDue42) ? source.DateDue42 = Date.parse(source.DateDue42) : null;
    !isNullOrUndefined(source.DateCompleted42) ? source.DateCompleted42 = Date.parse(source.DateCompleted42) : null;
    !isNullOrUndefined(source.DateDue43) ? source.DateDue43 = Date.parse(source.DateDue43) : null;
    !isNullOrUndefined(source.DateCompleted43) ? source.DateCompleted43 = Date.parse(source.DateCompleted43) : null;





    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.ifaFormOut.emit({ prForm: source })
  }



  formValidation() {
    this.newReferralChecklistForm = this._fb.group({
      Name: [null],
      DateOfReferral: [null],
      TimeOfReferral: [null],
      Agency: [null],
      DateDue: [null],
      DateCompleted: [null],
      DateDue1: [null],
      DateCompleted1: [null],
      DateDue2: [null],
      DateCompleted2: [null],
      DateDue3: [null],
      DateCompleted3: [null],
      DateDue4: [null],
      DateCompleted4: [null],
      DateDue5: [null],
      DateCompleted5: [null],
      DateDue6: [null],
      DateCompleted6: [null],
      DateDue7: [null],
      DateCompleted7: [null],
      DateDue8: [null],
      DateCompleted8: [null],
      DateDue9: [null],
      DateCompleted9: [null],
      DateDue10: [null],
      DateCompleted10: [null],
      DateDue11: [null],
      DateCompleted11: [null],
      DateDue12: [null],
      DateCompleted12: [null],
      DateDue13: [null],
      DateCompleted13: [null],
      DateDue14: [null],
      DateCompleted14: [null],
      DateDue15: [null],
      DateCompleted15: [null],
      DateDue16: [null],
      DateCompleted16: [null],
      DateDue17: [null],
      DateCompleted17: [null],
      DateDue18: [null],
      DateCompleted18: [null],
      DateDue19: [null],
      DateCompleted19: [null],
      DateDue20: [null],
      DateCompleted20: [null],
      DateDue21: [null],
      DateCompleted21: [null],
      DateDue22: [null],
      DateCompleted22: [null],
      DateDue23: [null],
      DateCompleted23: [null],
      DateDue24: [null],
      DateCompleted24: [null],
      DateDue25: [null],
      DateCompleted25: [null],
      DateDue26: [null],
      DateCompleted26: [null],
      DateDue27: [null],
      DateCompleted27: [null],
      DateDue28: [null],
      DateCompleted28: [null],
      DateDue29: [null],
      DateCompleted29: [null],
      DateDue30: [null],
      DateCompleted30: [null],
      DateDue31: [null],
      DateCompleted31: [null],
      DateDue32: [null],
      DateCompleted32: [null],
      DateDue33: [null],
      DateCompleted33: [null],
      DateDue34: [null],
      DateCompleted34: [null],
      DateDue35: [null],
      DateCompleted35: [null],
      DateDue36: [null],
      DateCompleted36: [null],
      DateDue37: [null],
      DateCompleted37: [null],
      DateDue38: [null],
      DateCompleted38: [null],
      DateDue39: [null],
      DateCompleted39: [null],
      DateDue40: [null],
      DateCompleted40: [null],
      DateDue41: [null],
      DateCompleted41: [null],
      DateDue42: [null],
      DateCompleted42: [null],
      DateDue43: [null],
      DateCompleted43: [null],
    });
  }

  getDetails() {
    setTimeout(() => {
      let formData;
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      //     let assessmentId = localStorage.getItem('asssessmentId');
      //     let req = { assessmentID: assessmentId }
      //     this._opencard.getAssessmentRec(req).then((data) => {
      //       formData = data.pdfForms.pdfForms;


      // !isNullOrUndefined(formData.DateOfReferral) ? formData.DateOfReferral = new Date(formData.DateOfReferral) : null;
      // !isNullOrUndefined(formData.TimeOfReferral) ? formData.TimeOfReferral = new Date(formData.TimeOfReferral) : null;

      // !isNullOrUndefined(formData.DateDue) ? formData.DateDue = new Date(formData.DateDue) : null;
      // !isNullOrUndefined(formData.DateCompleted) ? formData.DateCompleted = new Date(formData.DateCompleted) : null;
      // !isNullOrUndefined(formData.DateDue1) ? formData.DateDue1 = new Date(formData.DateDue1) : null;
      // !isNullOrUndefined(formData.DateCompleted1) ? formData.DateCompleted1 = new Date(formData.DateCompleted1) : null;
      // !isNullOrUndefined(formData.DateDue2) ? formData.DateDue2 = new Date(formData.DateDue2) : null;
      // !isNullOrUndefined(formData.DateCompleted2) ? formData.DateCompleted2 = new Date(formData.DateCompleted2) : null;
      // !isNullOrUndefined(formData.DateDue3) ? formData.DateDue3 = new Date(formData.DateDue3) : null;
      // !isNullOrUndefined(formData.DateCompleted3) ? formData.DateCompleted3 = new Date(formData.DateCompleted3) : null;
      // !isNullOrUndefined(formData.DateDue4) ? formData.DateDue4 = new Date(formData.DateDue4) : null;
      // !isNullOrUndefined(formData.DateCompleted4) ? formData.DateCompleted4 = new Date(formData.DateCompleted4) : null;
      // !isNullOrUndefined(formData.DateDue5) ? formData.DateDue5 = new Date(formData.DateDue5) : null;
      // !isNullOrUndefined(formData.DateCompleted5) ? formData.DateCompleted5 = new Date(formData.DateCompleted5) : null;
      // !isNullOrUndefined(formData.DateDue6) ? formData.DateDue6 = new Date(formData.DateDue6) : null;
      // !isNullOrUndefined(formData.DateCompleted6) ? formData.DateCompleted6 = new Date(formData.DateCompleted6) : null;
      // !isNullOrUndefined(formData.DateDue7) ? formData.DateDue7 = new Date(formData.DateDue7) : null;
      // !isNullOrUndefined(formData.DateCompleted7) ? formData.DateCompleted7 = new Date(formData.DateCompleted7) : null;
      // !isNullOrUndefined(formData.DateDue8) ? formData.DateDue8 = new Date(formData.DateDue8) : null;
      // !isNullOrUndefined(formData.DateCompleted8) ? formData.DateCompleted8 = new Date(formData.DateCompleted8) : null;
      // !isNullOrUndefined(formData.DateDue9) ? formData.DateDue9 = new Date(formData.DateDue9) : null;
      // !isNullOrUndefined(formData.DateCompleted) ? formData.DateCompleted = new Date(formData.DateCompleted10) : null;
      // !isNullOrUndefined(formData.DateDue10) ? formData.DateDue10 = new Date(formData.DateDue) : null;
      // !isNullOrUndefined(formData.DateCompleted10) ? formData.DateCompleted10 = new Date(formData.DateCompleted10) : null;
      // !isNullOrUndefined(formData.DateDue11) ? formData.DateDue11 = new Date(formData.DateDue11) : null;
      // !isNullOrUndefined(formData.DateCompleted11) ? formData.DateCompleted11 = new Date(formData.DateCompleted11) : null;
      // !isNullOrUndefined(formData.DateDue12) ? formData.DateDue12 = new Date(formData.DateDue12) : null;
      // !isNullOrUndefined(formData.DateCompleted12) ? formData.DateCompleted12 = new Date(formData.DateCompleted12) : null;
      // !isNullOrUndefined(formData.DateDue13) ? formData.DateDue13 = new Date(formData.DateDue13) : null;
      // !isNullOrUndefined(formData.DateCompleted13) ? formData.DateCompleted13 = new Date(formData.DateCompleted13) : null;
      // !isNullOrUndefined(formData.DateDue14) ? formData.DateDue14 = new Date(formData.DateDue14) : null;
      // !isNullOrUndefined(formData.DateCompleted14) ? formData.DateCompleted14 = new Date(formData.DateCompleted14) : null;
      // !isNullOrUndefined(formData.DateDue15) ? formData.DateDue15 = new Date(formData.DateDue15) : null;
      // !isNullOrUndefined(formData.DateCompleted15) ? formData.DateCompleted15 = new Date(formData.DateCompleted15) : null;
      // !isNullOrUndefined(formData.DateDue16) ? formData.DateDue16 = new Date(formData.DateDue16) : null;
      // !isNullOrUndefined(formData.DateCompleted16) ? formData.DateCompleted16 = new Date(formData.DateCompleted16) : null;
      // !isNullOrUndefined(formData.DateDue17) ? formData.DateDue17 = new Date(formData.DateDue17) : null;
      // !isNullOrUndefined(formData.DateCompleted17) ? formData.DateCompleted17 = new Date(formData.DateCompleted17) : null;
      // !isNullOrUndefined(formData.DateDue18) ? formData.DateDue18 = new Date(formData.DateDue18) : null;
      // !isNullOrUndefined(formData.DateCompleted18) ? formData.DateCompleted18 = new Date(formData.DateCompleted18) : null;
      // !isNullOrUndefined(formData.DateDue19) ? formData.DateDue19 = new Date(formData.DateDue19) : null;
      // !isNullOrUndefined(formData.DateCompleted19) ? formData.DateCompleted19 = new Date(formData.DateCompleted19) : null;
      // !isNullOrUndefined(formData.DateDue20) ? formData.DateDue20 = new Date(formData.DateDue20) : null;
      // !isNullOrUndefined(formData.DateCompleted20) ? formData.DateCompleted20 = new Date(formData.DateCompleted20) : null;
      // !isNullOrUndefined(formData.DateDue21) ? formData.DateDue21 = new Date(formData.DateDue21) : null;
      // !isNullOrUndefined(formData.DateCompleted21) ? formData.DateCompleted21 = new Date(formData.DateCompleted21) : null;
      // !isNullOrUndefined(formData.DateDue22) ? formData.DateDue22 = new Date(formData.DateDue22) : null;
      // !isNullOrUndefined(formData.DateCompleted22) ? formData.DateCompleted22 = new Date(formData.DateCompleted22) : null;
      // !isNullOrUndefined(formData.DateDue23) ? formData.DateDue23 = new Date(formData.DateDue23) : null;
      // !isNullOrUndefined(formData.DateCompleted23) ? formData.DateCompleted23 = new Date(formData.DateCompleted23) : null;
      // !isNullOrUndefined(formData.DateDue24) ? formData.DateDue24 = new Date(formData.DateDue24) : null;
      // !isNullOrUndefined(formData.DateCompleted24) ? formData.DateCompleted24 = new Date(formData.DateCompleted24) : null;
      // !isNullOrUndefined(formData.DateDue25) ? formData.DateDue25 = new Date(formData.DateDue25) : null;
      // !isNullOrUndefined(formData.DateCompleted25) ? formData.DateCompleted25 = new Date(formData.DateCompleted25) : null;
      // !isNullOrUndefined(formData.DateDue26) ? formData.DateDue26 = new Date(formData.DateDue26) : null;
      // !isNullOrUndefined(formData.DateCompleted26) ? formData.DateCompleted26 = new Date(formData.DateCompleted26) : null;
      // !isNullOrUndefined(formData.DateDue27) ? formData.DateDue27 = new Date(formData.DateDue27) : null;
      // !isNullOrUndefined(formData.DateCompleted27) ? formData.DateCompleted27 = new Date(formData.DateCompleted27) : null;
      // !isNullOrUndefined(formData.DateDue28) ? formData.DateDue28 = new Date(formData.DateDue28) : null;
      // !isNullOrUndefined(formData.DateCompleted28) ? formData.DateCompleted28 = new Date(formData.DateCompleted28) : null;
      // !isNullOrUndefined(formData.DateDue29) ? formData.DateDue29 = new Date(formData.DateDue29) : null;
      // !isNullOrUndefined(formData.DateCompleted29) ? formData.DateCompleted29 = new Date(formData.DateCompleted29) : null;
      // !isNullOrUndefined(formData.DateDue30) ? formData.DateDue30 = new Date(formData.DateDue30) : null;
      // !isNullOrUndefined(formData.DateCompleted30) ? formData.DateCompleted30 = new Date(formData.DateCompleted30) : null;
      // !isNullOrUndefined(formData.DateDue31) ? formData.DateDue31 = new Date(formData.DateDue31) : null;
      // !isNullOrUndefined(formData.DateCompleted31) ? formData.DateCompleted31 = new Date(formData.DateCompleted31) : null;
      // !isNullOrUndefined(formData.DateDue32) ? formData.DateDue32 = new Date(formData.DateDue32) : null;
      // !isNullOrUndefined(formData.DateCompleted32) ? formData.DateCompleted32 = new Date(formData.DateCompleted32) : null;
      // !isNullOrUndefined(formData.DateDue33) ? formData.DateDue33 = new Date(formData.DateDue33) : null;
      // !isNullOrUndefined(formData.DateCompleted33) ? formData.DateCompleted33 = new Date(formData.DateCompleted33) : null;
      // !isNullOrUndefined(formData.DateDue34) ? formData.DateDue34 = new Date(formData.DateDue34) : null;
      // !isNullOrUndefined(formData.DateCompleted34) ? formData.DateCompleted34 = new Date(formData.DateCompleted34) : null;
      // !isNullOrUndefined(formData.DateDue35) ? formData.DateDue35 = new Date(formData.DateDue35) : null;
      // !isNullOrUndefined(formData.DateCompleted35) ? formData.DateCompleted35 = new Date(formData.DateCompleted35) : null;
      // !isNullOrUndefined(formData.DateDue36) ? formData.DateDue36 = new Date(formData.DateDue36) : null;
      // !isNullOrUndefined(formData.DateCompleted36) ? formData.DateCompleted36 = new Date(formData.DateCompleted36) : null;
      // !isNullOrUndefined(formData.DateDue37) ? formData.DateDue37 = new Date(formData.DateDue37) : null;
      // !isNullOrUndefined(formData.DateCompleted37) ? formData.DateCompleted37 = new Date(formData.DateCompleted37) : null;
      // !isNullOrUndefined(formData.DateDue38) ? formData.DateDue38 = new Date(formData.DateDue38) : null;
      // !isNullOrUndefined(formData.DateCompleted38) ? formData.DateCompleted38 = new Date(formData.DateCompleted38) : null;
      // !isNullOrUndefined(formData.DateDue39) ? formData.DateDue39 = new Date(formData.DateDue39) : null;
      // !isNullOrUndefined(formData.DateCompleted39) ? formData.DateCompleted39 = new Date(formData.DateCompleted39) : null;
      // !isNullOrUndefined(formData.DateDue40) ? formData.DateDue40 = new Date(formData.DateDue40) : null;
      // !isNullOrUndefined(formData.DateCompleted40) ? formData.DateCompleted40 = new Date(formData.DateCompleted40) : null;
      // !isNullOrUndefined(formData.DateDue41) ? formData.DateDue41 = new Date(formData.DateDue41) : null;
      // !isNullOrUndefined(formData.DateCompleted41) ? formData.DateCompleted41 = new Date(formData.DateCompleted41) : null;
      // !isNullOrUndefined(formData.DateDue42) ? formData.DateDue42 = new Date(formData.DateDue42) : null;
      // !isNullOrUndefined(formData.DateCompleted42) ? formData.DateCompleted42 = new Date(formData.DateCompleted42) : null;
      // !isNullOrUndefined(formData.DateDue43) ? formData.DateDue43 = new Date(formData.DateDue43) : null;
      // !isNullOrUndefined(formData.DateCompleted43) ? formData.DateCompleted43 = new Date(formData.DateCompleted43) : null;


      //  this.reintNewReferralChecklist = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.newReferralChecklistForm.disable();
      //     })
    }, 5000)
  }

}
