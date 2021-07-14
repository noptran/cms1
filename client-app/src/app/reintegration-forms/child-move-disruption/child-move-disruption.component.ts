import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReChildDisruption } from './re-child-disruption';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-child-move-disruption',
  templateUrl: './child-move-disruption.component.html',
  styleUrls: ['./child-move-disruption.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['childDisOut']
})
export class ChildMoveDisruptionComponent implements OnInit {
  childMoveDisruptionForm: FormGroup;
  reChildMoveDisruption: ReChildDisruption = new ReChildDisruption();
  editControll = true;
  isEdit = false;
  isPrint = true;

  printedBy: any;
  printedDate: any;
  @Output()
  childDisOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/permanency/detail') {
      this.getCmsFormJson();
    }

    if (this._router.url == '/reports/referral/reintegration/child/move/form/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.childMoveDisruptionForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reChildMoveDisruption = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DepartureDate) ? formData.DepartureDate = new Date(formData.DepartureDate) : null;
    !isNullOrUndefined(formData.DepartureTime) ? formData.DepartureTime = new Date(formData.DepartureTime) : null;
    !isNullOrUndefined(formData.ChildEnteredArrivalDate) ? formData.ChildEnteredArrivalDate = new Date(formData.ChildEnteredArrivalDate) : null;
    !isNullOrUndefined(formData.ChildEnteredArrivalTime) ? formData.ChildEnteredArrivalTime = new Date(formData.ChildEnteredArrivalTime) : null;
    this.reChildMoveDisruption = formData;
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reChildMoveDisruption.ChildFullName = data.person.firstName + " " + data.person.lastName;
        this.reChildMoveDisruption.Kaecses = data.person.kaecses;
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.reChildMoveDisruption.CourtCase = (data.referral.caseID.caseID)
      })
    this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }

  editForm() {
    this.childMoveDisruptionForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.DepartureDate) ? source.DepartureDate = Date.parse(source.DepartureDate) : null;
    !isNullOrUndefined(source.DepartureTime) ? source.DepartureTime = Date.parse(source.DepartureTime) : null;
    !isNullOrUndefined(source.ChildEnteredArrivalDate) ? source.ChildEnteredArrivalDate = Date.parse(source.ChildEnteredArrivalDate) : null;
    !isNullOrUndefined(source.ChildEnteredArrivalTime) ? source.ChildEnteredArrivalTime = Date.parse(source.ChildEnteredArrivalTime) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.childDisOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/rfc/permanency"]);
  }
  discardForm() {
    this.childDisOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.childMoveDisruptionForm = this._fb.group({
      ChildFullName: [null],
      Kaecses: [null],
      Office: [null],
      CourtCase: [null],
      NameHome: [null],
      DepartureDate: [null],
      Address: [null],
      DepartureTime: [null],
      PhoneNumber: [null],
      FacilityStaffSignature: [null],
      DriverSignature: [null],
      NameSchool: [null],
      SchoolDistrict: [null],
      ReasonForLeaving: [null],
      ScheduledAppointments: [null],
      Medications: [null],
      DisruptionReason: [null],
      ChildBehaviors: [null],

      ChildEnteredName: [null],
      ChildEnteredPhone: [null],
      ChildEnteredAddress: [null],
      ChildEnteredFamilySponsor: [null],
      ChildEnteredTypeRelative: [null],
      ChildEnteredSchool: [null],
      ChildEnteredArrivalDate: [null],
      ChildEnteredSchoolDistrict: [null],
      ChildEnteredArrivalTime: [null],

      IsPossessionMedications: [false],

      FacilityStaffSignature1: [null],
      Transporter: [null],
      ElectronicSignature: [null],
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
      //  !isNullOrUndefined(formData.DepartureDate) ? formData.DepartureDate = new Date(formData.DepartureDate) : null;
      //  !isNullOrUndefined(formData.DepartureTime) ? formData.DepartureTime = new Date(formData.DepartureTime) : null;
      //  !isNullOrUndefined(formData.ChildEnteredArrivalDate) ? formData.ChildEnteredArrivalDate = new Date(formData.ChildEnteredArrivalDate) : null;
      //  !isNullOrUndefined(formData.ChildEnteredArrivalTime) ? formData.ChildEnteredArrivalTime = new Date(formData.ChildEnteredArrivalTime) : null;
      //  this.reChildMoveDisruption = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.childMoveDisruptionForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
