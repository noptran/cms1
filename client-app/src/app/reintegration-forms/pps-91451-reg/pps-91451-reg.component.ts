import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReintPpsReg } from './reint-pps-reg';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-pps-91451-reg',
  templateUrl: './pps-91451-reg.component.html',
  styleUrls: ['./pps-91451-reg.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['ppsOut']
})
export class Pps91451RegComponent implements OnInit {
  PpsRegForm: FormGroup;
  reintPpsReg: ReintPpsReg = new ReintPpsReg();
  isEdit = false;
  editControll = true;
  isPrint = true;

  printedBy: any;
  printedDate: any;

  @Output()
  ppsOut = new EventEmitter();

  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/case-activity/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/pps/91451/reg/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.PpsRegForm.disable();
  }

  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reintPpsReg = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.DayToContactCaretaker) ? formData.DayToContactCaretaker = new Date(formData.DayToContactCaretaker) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;

    this.reintPpsReg = formData;
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reintPpsReg.ChildName = data.person.firstName + " " + data.person.lastName;
        this.reintPpsReg.Dob = new Date(data.person.dob);
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
    this.PpsRegForm.enable();
    this.editControll = false;
  }

  saveForm(source) {
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.DayToContactCaretaker) ? source.DayToContactCaretaker = Date.parse(source.DayToContactCaretaker) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';

    this.ppsOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/rfc/case-activity"]);
  }
  discardForm() {
    this.ppsOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.PpsRegForm = this._fb.group({

      isForm: [false],
      ChildName: [null],
      Dob: [null],
      EthnicGroup: [null],
      MotherName: [null],
      FatherName: [null],
      Name: [null],
      IsS: [false],
      IsM: [false],
      IsSep: [false],
      IsD: [false],
      IsW: [false],
      LivingWith: [null],
      StreetAddress: [null],
      City: [null],
      State: [null],
      Zip: [null],
      HomeTelephone: [null],
      WorkTelephone: [null],
      Ssn: [null],
      DayToContactCaretaker: [null],
      RelationshipToChild: [null],
      Employer: [null],
      AlternateContactName: [null],
      StreetAddress1: [null],
      City1: [null],
      State1: [null],
      Zip1: [null],
      HomeTelephone1: [null],
      WorkTelephone1: [null],
      IsCasePlanAttachedYes: [false],
      IsCasePlanAttachedNo: [false],
      IsPlanAttachedYes: [false],
      IsPlanAttachedNo: [false],
      SpecialNeeds: [null],
      Handicaps: [null],
      TreatmentsRequirements: [null],
      SchoolInformation: [null],
      IsPertinentInformationYes: [false],
      IsPertinentInformationNo: [false],
      Explain: [null],
      NameOfWorker: [null],
      WorkerTelephone: [null],
      WorkerSignature: [null],
      Date: [null],
      NameOfSupervisor: [null],
      SupervisorTelephone: [null],
      SupervisorSignature: [null],
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
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      // !isNullOrUndefined(formData.DayToContactCaretaker) ? formData.DayToContactCaretaker = new Date(formData.DayToContactCaretaker) : null;
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      // !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;

      //  this.reintPpsReg = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.PpsRegForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
