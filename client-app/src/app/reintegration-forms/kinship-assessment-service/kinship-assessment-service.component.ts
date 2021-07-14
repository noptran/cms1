import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReKinship } from './re-kinship';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-kinship-assessment-service',
  templateUrl: './kinship-assessment-service.component.html',
  styleUrls: ['./kinship-assessment-service.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['kinsAssOut']
})
export class KinshipAssessmentServiceComponent implements OnInit {
  KinshipAssessmenForm: FormGroup;
  reKinshipAssessmen: ReKinship = new ReKinship();
  isEdit = false;
  editControll = true;
  isPrint = true;

  @Output()
  kinsAssOut = new EventEmitter()
  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/initial/screening/tool/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.KinshipAssessmenForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reKinshipAssessmen = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DatePlaced) ? formData.DatePlaced = new Date(formData.DatePlaced) : null;
    !isNullOrUndefined(formData.DobChild) ? formData.DobChild = new Date(formData.DobChild) : null;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.Dob1) ? formData.Dob1 = new Date(formData.Dob1) : null;
    !isNullOrUndefined(formData.Dob2) ? formData.Dob2 = new Date(formData.Dob2) : null;
    !isNullOrUndefined(formData.Dob3) ? formData.Dob3 = new Date(formData.Dob3) : null;
    !isNullOrUndefined(formData.SpecialistSignatureDate) ? formData.SpecialistSignatureDate = new Date(formData.SpecialistSignatureDate) : null;
    !isNullOrUndefined(formData.SupervisorSignatureDate) ? formData.SupervisorSignatureDate = new Date(formData.SupervisorSignatureDate) : null;
    this.reKinshipAssessmen = formData;
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reKinshipAssessmen.ChildSName = data.person.firstName + " " + data.person.lastName;
        this.reKinshipAssessmen.Kaecses = data.person.kaecses;
        this.reKinshipAssessmen.DatePlaced = new Date();
        this.reKinshipAssessmen.DobChild = new Date(data.person.dob);
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.reKinshipAssessmen.CourtCase = (data.referral.caseID.caseID)
      })
    this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }


  editForm() {
    this.KinshipAssessmenForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.DatePlaced) ? source.DatePlaced = Date.parse(source.DatePlaced) : null;
    !isNullOrUndefined(source.DobChild) ? source.DobChild = Date.parse(source.DobChild) : null;
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.Dob1) ? source.Dob1 = Date.parse(source.Dob1) : null;
    !isNullOrUndefined(source.Dob2) ? source.Dob2 = Date.parse(source.Dob2) : null;
    !isNullOrUndefined(source.Dob3) ? source.Dob3 = Date.parse(source.Dob3) : null;
    !isNullOrUndefined(source.SpecialistSignatureDate) ? source.SpecialistSignatureDate = Date.parse(source.SpecialistSignatureDate) : null;
    !isNullOrUndefined(source.SupervisorSignatureDate) ? source.SupervisorSignatureDate = Date.parse(source.SupervisorSignatureDate) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.kinsAssOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.kinsAssOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.KinshipAssessmenForm = this._fb.group({
      isInitial: [false],
      isExpedited: [false],
      isPlanned: [false],
      isChildPlacedNo: [false],
      isChildPlacedYes: [false],
      DatePlaced: [null],
      Facts: [null],
      Ss: [null],
      CourtCase: [null],
      Kaecses: [null],
      HomeCounty: [null],
      ChildSName: [null],
      IsMale: [false],
      IsFemale: [false],
      DobChild: [null],

      Siblings: [null],
      Dob: [null],
      Ssn: [null],
      Gender: [null],
      Court: [null],

      Siblings1: [null],
      Dob1: [null],
      Ssn1: [null],
      Gender1: [null],
      Court1: [null],

      Siblings2: [null],
      Dob2: [null],
      Ssn2: [null],
      Gender2: [null],
      Court2: [null],

      Siblings3: [null],
      Dob3: [null],
      Ssn3: [null],
      Gender3: [null],
      Court3: [null],


      ChildRemoved: [null],
      EmotionalStrengths: [null],
      VisitationSchedule: [null],
      KinshipName: [null],
      Relationship: [null],
      Address: [null],
      City: [null],
      St: [null],
      zip: [null],
      Directions: [null],
      Mail: [null],
      Home: [null],
      Work: [null],
      Cell: [null],
      BestTime: [null],
      Language: [null],
      Strengths: [null],
      PermanencySpecialist: [null],
      SpecialistSignature: [null],
      SpecialistSignatureDate: [null],
      Supervisor: [null],
      SupervisorSignature: [null],
      SupervisorSignatureDate: [null],
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

      // !isNullOrUndefined(formData.DatePlaced) ? formData.DatePlaced = new Date(formData.DatePlaced) : null;
      // !isNullOrUndefined(formData.DobChild) ? formData.DobChild = new Date(formData.DobChild) : null;
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      // !isNullOrUndefined(formData.Dob1) ? formData.Dob1 = new Date(formData.Dob1) : null;
      // !isNullOrUndefined(formData.Dob2) ? formData.Dob2 = new Date(formData.Dob2) : null;
      // !isNullOrUndefined(formData.Dob3) ? formData.Dob3 = new Date(formData.Dob3) : null;
      // !isNullOrUndefined(formData.SpecialistSignatureDate) ? formData.SpecialistSignatureDate = new Date(formData.SpecialistSignatureDate) : null;
      // !isNullOrUndefined(formData.SupervisorSignatureDate) ? formData.SupervisorSignatureDate = new Date(formData.SupervisorSignatureDate) : null;

      //  this.reKinshipAssessmen = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.KinshipAssessmenForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
