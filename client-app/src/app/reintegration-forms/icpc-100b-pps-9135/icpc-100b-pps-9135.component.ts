import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReintIcpc } from './reint-icpc';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-icpc-100b-pps-9135',
  templateUrl: './icpc-100b-pps-9135.component.html',
  styleUrls: ['./icpc-100b-pps-9135.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['icpcPpsOut']

})
export class Icpc100bPps9135Component implements OnInit {
  icpcPpsForm: FormGroup;
  reintIcpcPps: ReintIcpc = new ReintIcpc();
  isEdit = false;
  editControll = true;
  isPrint = true;

  printedBy: any;
  printedDate: any;

  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  @Output()
  icpcPpsOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/case-activity/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/icpc/100b/pps9135/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.icpcPpsForm.disable();
  }

  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reintIcpcPps = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.To) ? formData.To = new Date(formData.To) : null;
    !isNullOrUndefined(formData.From) ? formData.From = new Date(formData.From) : null;

    !isNullOrUndefined(formData.Birthdate) ? formData.Birthdate = new Date(formData.Birthdate) : null;
    !isNullOrUndefined(formData.DateChildPlaced) ? formData.DateChildPlaced = new Date(formData.DateChildPlaced) : null;
    !isNullOrUndefined(formData.EffectiveDateOfChange) ? formData.EffectiveDateOfChange = new Date(formData.EffectiveDateOfChange) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
    !isNullOrUndefined(formData.DateOfTermination) ? formData.DateOfTermination = new Date(formData.DateOfTermination) : null;
    this.reintIcpcPps = formData;
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reintIcpcPps.ChildName = data.person.firstName + " " + data.person.lastName;
        this.reintIcpcPps.To = new Date();
        this.reintIcpcPps.From = new Date();
        this.reintIcpcPps.Birthdate = new Date(data.person.dob);
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);

      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }

  editForm() {
    this.editControll = false;
    this.icpcPpsForm.enable();
  }

  saveForm(source) {
    !isNullOrUndefined(source.To) ? source.To = Date.parse(source.To) : null;
    !isNullOrUndefined(source.From) ? source.From = Date.parse(source.From) : null;
    !isNullOrUndefined(source.Birthdate) ? source.Birthdate = Date.parse(source.Birthdate) : null;
    !isNullOrUndefined(source.DateChildPlaced) ? source.DateChildPlaced = Date.parse(source.DateChildPlaced) : null;
    !isNullOrUndefined(source.EffectiveDateOfChange) ? source.EffectiveDateOfChange = Date.parse(source.EffectiveDateOfChange) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;
    !isNullOrUndefined(source.DateOfTermination) ? source.DateOfTermination = Date.parse(source.DateOfTermination) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';

    this.icpcPpsOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/rfc/case-activity"]);
  }
  discardForm() {
    this.icpcPpsOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.icpcPpsForm = this._fb.group({
      To: [null],
      From: [null],
      ChildName: [null],
      Birthdate: [null],
      MotherName: [null],
      FatherName: [null],
      IsInitialPlacement: [false],
      DateChildPlaced: [null],
      NameOfResource: [null],
      Address: [null],
      TypeOfCare: [null],
      PlacementChange: [null],
      EffectiveDateOfChange: [null],
      NameOfResource1: [null],
      Address1: [null],
      TypeOfCare1: [null],

      IsAdoptionFinalized: [false],
      IsInSendingState: [false],
      IsReceivingState: [false],
      IsCourtOrderAttached: [false],
      IsLegallyEmancipated: [false],
      IsLegalCustodyReturned: [false],
      IsCourtOrderAttached1: [false],
      IsLegalCustodyGiven: [false],
      IsCourtOrderAttached2: [false],

      Name: [null],
      Relationship: [null],

      IsTreatmentCompleted: [false],
      IsJurisdictionTermination: [false],
      IsUnilateralTermination: [false],
      IsChildReturned: [false],
      IsChildHasMoved: [false],
      IsRequestWithdrawn: [false],
      IsApprovedResource: [false],
      IsOther: [false],
      DateOfTermination: [null],
      Agency: [null],
      Date: [null],

      CompactAdministrator: [null],
      Date1: [null],
      printedBy: [null],
      printedDate: [null],

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
      // !isNullOrUndefined(formData.To) ? formData.To = new Date(formData.To) : null;
      // !isNullOrUndefined(formData.From) ? formData.From = new Date(formData.From) : null;

      // !isNullOrUndefined(formData.Birthdate) ? formData.Birthdate = new Date(formData.Birthdate) : null;
      // !isNullOrUndefined(formData.DateChildPlaced) ? formData.DateChildPlaced = new Date(formData.DateChildPlaced) : null;
      // !isNullOrUndefined(formData.EffectiveDateOfChange) ? formData.EffectiveDateOfChange = new Date(formData.EffectiveDateOfChange) : null;
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      // !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      // !isNullOrUndefined(formData.DateOfTermination) ? formData.DateOfTermination = new Date(formData.DateOfTermination) : null;
      //  this.reintIcpcPps = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.icpcPpsForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }


}
