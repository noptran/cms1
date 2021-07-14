import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { XtrmeKinship } from './xtrme-kinship';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-xtreme-kinship-recruitment',
  templateUrl: './xtreme-kinship-recruitment.component.html',
  styleUrls: ['./xtreme-kinship-recruitment.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['xtrKinOut']
})
export class XtremeKinshipRecruitmentComponent implements OnInit {
  xtremeKinshipForm: FormGroup;
  reXtremeKinship: XtrmeKinship = new XtrmeKinship();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  xtrKinOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/xtreme/kinship/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.xtremeKinshipForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reXtremeKinship = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.SpecialistSignatureDate) ? formData.SpecialistSignatureDate = new Date(formData.SpecialistSignatureDate) : null;
    !isNullOrUndefined(formData.SupervisorSignatureDate) ? formData.SupervisorSignatureDate = new Date(formData.SupervisorSignatureDate) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.datePlaced) ? formData.datePlaced = new Date(formData.datePlaced) : null;

    !isNullOrUndefined(formData.Age) ? formData.Age = new Date(formData.Age) : null;
    !isNullOrUndefined(formData.Age1) ? formData.Age1 = new Date(formData.Age1) : null;
    !isNullOrUndefined(formData.Age2) ? formData.Age2 = new Date(formData.Age2) : null;
    !isNullOrUndefined(formData.Age3) ? formData.Age3 = new Date(formData.Age3) : null;
    this.reXtremeKinship = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reXtremeKinship.ChildName = data.person.firstName + " " + data.person.lastName;
        this.reXtremeKinship.Kaecses = data.person.kaecses;
        this.reXtremeKinship.Date = new Date();
        this.reXtremeKinship.Dob = new Date(data.person.dob);
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
    this.xtremeKinshipForm.enable();
    this.editControll = false;
  }
  
  saveForm(event, source) {
    !isNullOrUndefined(source.SpecialistSignatureDate) ? source.SpecialistSignatureDate = Date.parse(source.SpecialistSignatureDate) : null;
    !isNullOrUndefined(source.SupervisorSignatureDate) ? source.SupervisorSignatureDate = Date.parse(source.SupervisorSignatureDate) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;

    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.datePlaced) ? source.datePlaced = Date.parse(source.datePlaced) : null;

    !isNullOrUndefined(source.Age) ? source.Age = Date.parse(source.Age) : null;
    !isNullOrUndefined(source.Age1) ? source.Age1 = Date.parse(source.Age1) : null;
    !isNullOrUndefined(source.Age2) ? source.Age2 = Date.parse(source.Age2) : null;
    !isNullOrUndefined(source.Age3) ? source.Age3 = Date.parse(source.Age3) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.xtrKinOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.xtrKinOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.xtremeKinshipForm = this._fb.group({
      Date: [null],
      ChildName: [null],
      IsMale: [false],
      IsFemale: [false],
      Kaecses: [null],
      PermanencySpecialist: [null],
      Fsw: [null],
      currentPlacementBegin: [null],
      datePlaced: [null],
      Dob: [null],
      ageBegin: [null],
      office: [null],
      Siblings: [null],
      Age: [null],
      Gender: [null],
      CurrentPlacement: [null],

      Siblings1: [null],
      Age1: [null],
      Gender1: [null],
      CurrentPlacement1: [null],

      Siblings2: [null],
      Age2: [null],
      Gender2: [null],
      CurrentPlacement2: [null],

      Siblings3: [null],
      Age3: [null],
      Gender3: [null],
      CurrentPlacement3: [null],

      ChildWasRemoved: [null],
      EmotionalStrengths: [null],
      KinExplored: [null],
      NotContacted: [null],
      SpecialistSignature: [null],
      SpecialistSignatureDate: [null],
      SupervisorSignature: [null],
      SupervisorSignatureDate: [null],

      IsGenogram: [false],
      IsEcomap: [false],
      IsRelativeForms: [false],
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
      //  !isNullOrUndefined(formData.SpecialistSignatureDate) ? formData.SpecialistSignatureDate = new Date(formData.SpecialistSignatureDate) : null;
      //  !isNullOrUndefined(formData.SupervisorSignatureDate) ? formData.SupervisorSignatureDate = new Date(formData.SupervisorSignatureDate) : null;
      //  !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      //  !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      //  !isNullOrUndefined(formData.datePlaced) ? formData.datePlaced = new Date(formData.datePlaced) : null;
      //  !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

      // !isNullOrUndefined(formData.Age) ? formData.Age = new Date(formData.Age) : null;
      // !isNullOrUndefined(formData.Age1) ? formData.Age1 = new Date(formData.Age1) : null;
      // !isNullOrUndefined(formData.Age2) ? formData.Age2 = new Date(formData.Age2) : null;
      // !isNullOrUndefined(formData.Age3) ? formData.Age3 = new Date(formData.Age3) : null;
      //  this.reXtremeKinship = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.xtremeKinshipForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
  
}
