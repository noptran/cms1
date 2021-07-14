import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { RePointsOfServerance } from './re-points-of-serverance';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-points-of-serverance',
  templateUrl: './points-of-serverance.component.html',
  styleUrls: ['./points-of-serverance.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['pointsServOut']
})
export class PointsOfServeranceComponent implements OnInit {
  pointsOfServeranceForm: FormGroup;
  rePointsOfServerance: RePointsOfServerance = new RePointsOfServerance();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  pointsServOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/court-orders/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/courtorder/points/of/serverance/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.pointsOfServeranceForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.rePointsOfServerance = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
     !isNullOrUndefined(formData.PermanencySpecialistDate) ? formData.PermanencySpecialistDate = new Date(formData.PermanencySpecialistDate) : null;
     !isNullOrUndefined(formData.SfcsSupervisorDate) ? formData.SfcsSupervisorDate = new Date(formData.SfcsSupervisorDate) : null;   
     this.rePointsOfServerance = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.rePointsOfServerance.CaseName = data.person.firstName + " " + data.person.lastName;
        this.rePointsOfServerance.CaseNumber = data.person.kaecses;

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
    this.pointsOfServeranceForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.PermanencySpecialistDate) ? source.PermanencySpecialistDate = Date.parse(source.PermanencySpecialistDate) : null;
    !isNullOrUndefined(source.SfcsSupervisorDate) ? source.SfcsSupervisorDate = Date.parse(source.SfcsSupervisorDate) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.pointsServOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.pointsServOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.pointsOfServeranceForm = this._fb.group({
      CaseName: [null],
      CaseNumber: [null],
      Name: [null],
      RelationshipToCase: [null],
      CurrentAddress: [null],
      CurrentPhone: [null],
      PermanencySpecialistName: [null],
      PermanencySpecialistDate: [null],
      SfcsSupervisorName: [null],
      SfcsSupervisorDate: [null],
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
      //  !isNullOrUndefined(formData.PermanencySpecialistDate) ? formData.PermanencySpecialistDate = new Date(formData.PermanencySpecialistDate) : null;
      //  !isNullOrUndefined(formData.SfcsSupervisorDate) ? formData.SfcsSupervisorDate = new Date(formData.SfcsSupervisorDate) : null;   
      //  this.rePointsOfServerance = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.pointsOfServeranceForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
