import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReMaternalPaternal } from './re-maternal-paternal';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-maternal-paternal-relative',
  templateUrl: './maternal-paternal-relative.component.html',
  styleUrls: ['./maternal-paternal-relative.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['matPatRelOut']
})
export class MaternalPaternalRelativeComponent implements OnInit {
  maternalPaternalForm: FormGroup;
  reMaternalPaternal: ReMaternalPaternal = new ReMaternalPaternal();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  matPatRelOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/maternal/paternal/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.maternalPaternalForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reMaternalPaternal = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.ReviewDate) ? formData.ReviewDate = new Date(formData.ReviewDate) : null;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    this.reMaternalPaternal = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reMaternalPaternal.Client = data.person.firstName + " " + data.person.lastName;
        this.reMaternalPaternal.Kaecses = data.person.kaecses;
        this.reMaternalPaternal.Dob = new Date(data.person.dob);
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.reMaternalPaternal.Facts = (data.referral.facts)
      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }


  editForm() {
    this.maternalPaternalForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.ReviewDate) ? source.ReviewDate = Date.parse(source.ReviewDate) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.matPatRelOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.matPatRelOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.maternalPaternalForm = this._fb.group({

      Client: [null],
      Facts: [null],
      Kaecses: [null],
      Dob: [null],
      InitialAssessment: [null],
      ReviewDate: [null],

      ////////
      Relationship: [null],
      Relationship1: [null],
      Relationship2: [null],
      Relationship3: [null],
      Relationship4: [null],
      Relationship5: [null],
      Relationship6: [null],
      Relationship7: [null],
      Relationship8: [null],


      Name: [null],
      Name1: [null],
      Name2: [null],
      Name3: [null],
      Name4: [null],
      Name5: [null],
      Name6: [null],
      Name7: [null],
      Name8: [null],


      Address: [null],
      Address1: [null],
      Address2: [null],
      Address3: [null],
      Address4: [null],
      Address5: [null],
      Address6: [null],
      Address7: [null],
      Address8: [null],

      Phone: [null],
      Phone1: [null],
      Phone2: [null],
      Phone3: [null],
      Phone4: [null],
      Phone5: [null],
      Phone6: [null],
      Phone7: [null],
      Phone8: [null],

      IsAbleRelativeYes: [false],
      IsAbleRelativeYes1: [false],
      IsAbleRelativeYes2: [false],
      IsAbleRelativeYes3: [false],
      IsAbleRelativeYes4: [false],
      IsAbleRelativeYes5: [false],
      IsAbleRelativeYes6: [false],
      IsAbleRelativeYes7: [false],
      IsAbleRelativeYes8: [false],


      IsAbleRelativeNo: [false],
      IsAbleRelativeNo1: [false],
      IsAbleRelativeNo2: [false],
      IsAbleRelativeNo3: [false],
      IsAbleRelativeNo4: [false],
      IsAbleRelativeNo5: [false],
      IsAbleRelativeNo6: [false],
      IsAbleRelativeNo7: [false],
      IsAbleRelativeNo8: [false],


      Efforts: [null],
      Efforts1: [null],
      Efforts2: [null],
      Efforts3: [null],
      Efforts4: [null],
      Efforts5: [null],
      Efforts6: [null],
      Efforts7: [null],
      Efforts8: [null],

      CompletedBy: [null],
      Date: [null],
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
      //  !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      //  !isNullOrUndefined(formData.ReviewDate) ? formData.ReviewDate = new Date(formData.ReviewDate) : null;
      //  !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      //  this.reMaternalPaternal = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.maternalPaternalForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.jsPdfOrientation = 'landscape';
    this._printPdf.printForm();
  }


}
