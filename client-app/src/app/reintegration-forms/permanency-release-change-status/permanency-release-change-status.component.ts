import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { RePermanencyReleaseChange } from './re-permanency-release-change';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-permanency-release-change-status',
  templateUrl: './permanency-release-change-status.component.html',
  styleUrls: ['./permanency-release-change-status.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['perRelOut']
})
export class PermanencyReleaseChangeStatusComponent implements OnInit {
  permanencyReleaseChangeForm: FormGroup;
  rePermanencyReleaseChange: RePermanencyReleaseChange = new RePermanencyReleaseChange();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  perRelOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/permanency/detail') {
      this.getCmsFormJson();
    }

    if (this._router.url == '/reports/referral/reintegration/assessments/moveandpermanency/permanency/release/change/status/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.permanencyReleaseChangeForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.rePermanencyReleaseChange = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DateOfPermanency) ? formData.DateOfPermanency = new Date(formData.DateOfPermanency) : null;

    !isNullOrUndefined(formData.EffectiveDate) ? formData.EffectiveDate = new Date(formData.EffectiveDate) : null;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.EffectiveDate1) ? formData.EffectiveDate1 = new Date(formData.EffectiveDate1) : null;
    !isNullOrUndefined(formData.Dob1) ? formData.Dob1 = new Date(formData.Dob1) : null;
    !isNullOrUndefined(formData.EffectiveDate2) ? formData.EffectiveDate2 = new Date(formData.EffectiveDate2) : null;
    !isNullOrUndefined(formData.Dob2) ? formData.Dob2 = new Date(formData.Dob2) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    this.rePermanencyReleaseChange = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.rePermanencyReleaseChange.Name = data.person.firstName + " " + data.person.lastName;
        this.rePermanencyReleaseChange.Kaecses = data.person.kaecses;
        this.rePermanencyReleaseChange.DateOfPermanency = new Date();
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.rePermanencyReleaseChange.Facts = (data.referral.facts)
      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }

  editForm() {
    this.permanencyReleaseChangeForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.DateOfPermanency) ? source.DateOfPermanency = Date.parse(source.DateOfPermanency) : null;

    !isNullOrUndefined(source.EffectiveDate) ? source.EffectiveDate = Date.parse(source.EffectiveDate) : null;
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.EffectiveDate1) ? source.EffectiveDate1 = Date.parse(source.EffectiveDate1) : null;
    !isNullOrUndefined(source.Dob1) ? source.Dob1 = Date.parse(source.Dob1) : null;
    !isNullOrUndefined(source.EffectiveDate2) ? source.EffectiveDate2 = Date.parse(source.EffectiveDate2) : null;
    !isNullOrUndefined(source.Dob2) ? source.Dob2 = Date.parse(source.Dob2) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.perRelOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/rfc/permanency"]);
  }
  discardForm() {
    this.perRelOut.emit({ cmsData: {} });
  }

  formValidation() {
    this.permanencyReleaseChangeForm = this._fb.group({
      Name: [null],
      Kaecses: [null],
      Facts: [null],
      Office: [null],
      SocialWorker: [null],
      DateOfPermanency: [null],
      PreviousPlacementName: [null],
      Address: [null],
      SchoolLeaving: [null],
      LevelOfCare: [null],
      PermanencyPlacementName: [null],
      PermanencyPlacementAddress: [null],
      PermanencyPlacement: [null],
      PermanencyPlacementSchoolEntering: [null],

      isReturnedHome: [false],
      isApaSigned: [false],
      isCustodialParent: [false],
      isNonCustodialParent: [false],
      isAdopt: [false],
      isDcfReleased: [false],
      isYouthAged: [false],
      isDirectPlacement: [false],
      isRelative: [false],
      isNonRelatives: [false],

      HighestGradeCompleted: [null],

      isReturnedHome1: [false],
      isKdoc: [false],

      isCustodialParent1: [false],
      isNonCustodialParent2: [false],
      isChildDeath: [false],
      isCustodianship: [false],
      isDcfRetraction: [false],
      isAfterCareCompleted1: [false],
      isAfterCareCompleted2: [false],
      isChangeOfVenue: [false],

      To: [null],

      isDateCountyAccepted: [false],
      isNewCourtCase: [false],

      NewCourtCase: [null],

      isNewDcfWorker: [false],

      NewDcfWorker: [null],

      Dcf: [false],
      SaintFrancis: [false],
      Court: [false],

      Judge: [null],

      NameOfSibling: [null],
      Dob: [null],
      ClientId: [null],
      Add: [false],
      Remove: [false],
      EffectiveDate: [null],

      NameOfSibling1: [null],
      Dob1: [null],
      ClientId1: [null],
      Add1: [false],
      Remove1: [false],
      EffectiveDate1: [null],

      NameOfSibling2: [null],
      Dob2: [null],
      ClientId2: [null],
      Add2: [false],
      Remove2: [false],
      EffectiveDate2: [null],

      PersonFilling: [null],
      Date: [null],
      dateCountyAccepted: [null],
      isHighestGradeCompleted: [false],
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

      !isNullOrUndefined(formData.DateOfPermanency) ? formData.DateOfPermanency = new Date(formData.DateOfPermanency) : null;

      !isNullOrUndefined(formData.EffectiveDate) ? formData.EffectiveDate = new Date(formData.EffectiveDate) : null;
      !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      !isNullOrUndefined(formData.EffectiveDate1) ? formData.EffectiveDate1 = new Date(formData.EffectiveDate1) : null;
      !isNullOrUndefined(formData.Dob1) ? formData.Dob1 = new Date(formData.Dob1) : null;
      !isNullOrUndefined(formData.EffectiveDate2) ? formData.EffectiveDate2 = new Date(formData.EffectiveDate2) : null;
      !isNullOrUndefined(formData.Dob2) ? formData.Dob2 = new Date(formData.Dob2) : null;
      !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      //  this.rePermanencyReleaseChange = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.permanencyReleaseChangeForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
