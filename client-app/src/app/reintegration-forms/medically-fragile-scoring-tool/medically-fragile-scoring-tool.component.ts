import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReMediFragile } from './re-medi-fragile';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-medically-fragile-scoring-tool',
  templateUrl: './medically-fragile-scoring-tool.component.html',
  styleUrls: ['./medically-fragile-scoring-tool.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['medFragOut']
})
export class MedicallyFragileScoringToolComponent implements OnInit {
  medicallyFragileScoringForm: FormGroup;
  reMedicallyFragileScoring: ReMediFragile = new ReMediFragile();
  isEdit = false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  medFragOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {
    
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/medically/fragile/scoring/tool/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.medicallyFragileScoringForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reMedicallyFragileScoring = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Dob) ? formData.Dob =new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.DateFormCompleted) ? formData.DateFormCompleted =new Date(formData.DateFormCompleted) : null;
    this.reMedicallyFragileScoring = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reMedicallyFragileScoring.ChilName = data.person.firstName + " " + data.person.lastName;
        this.reMedicallyFragileScoring.DateFormCompleted = new Date( );
        this.reMedicallyFragileScoring.Dob = new Date( data.person.Dob);
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
    this.medicallyFragileScoringForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.DateFormCompleted) ? source.DateFormCompleted = Date.parse(source.DateFormCompleted) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.medFragOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.medFragOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.medicallyFragileScoringForm = this._fb.group({
      ChilName: [null],
      Dob: [null],
      SfcsOffice: [null],
      CompletedBy: [null],
      DateFormCompleted: [null],



      Score: [null],
      Notes: [null],

      NotesCompulsory: [null],

      Score1: [null],
      Notes1: [null],

      Score2: [null],
      Notes2: [null],

      Score3: [null],
      Notes3: [null],

      Score4: [null],
      Notes4: [null],

      Score5: [null],
      Notes5: [null],

      Score6: [null],
      Notes6: [null],

      Score7: [null],
      Notes7: [null],

      Score8: [null],
      Notes8: [null],

      Score9: [null],
      Notes9: [null],

      Score10: [null],
      Notes10: [null],

      Score11: [null],
      Notes11: [null],

      Score12: [null],
      Notes12: [null],

      Score13: [null],
      Notes13: [null],

      Score14: [null],
      Notes14: [null],

      Score15: [null],
      Notes15: [null],

      Score16: [null],
      Notes16: [null],

      NotesCompulsory1: [null],

      Score17: [null],
      Notes17: [null],

      Score18: [null],
      Notes18: [null],

      Score19: [null],
      Notes19: [null],

      Score20: [null],
      Notes20: [null],

      Score21: [null],
      Notes21: [null],

      Score22: [null],
      Notes22: [null],

      Score23: [null],
      Notes23: [null],

      Score24: [null],
      Notes24: [null],

      Score25: [null],
      Notes25: [null],

      Score26: [null],
      Notes26: [null],
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
      //  !isNullOrUndefined(formData.ScreeningDate) ? formData.ScreeningDate = new Date(formData.ScreeningDate) : null;
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      // !isNullOrUndefined(formData.DateFormCompleted) ? formData.DateFormCompleted = new Date(formData.DateFormCompleted) : null;

      //  this.reMedicallyFragileScoring = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.medicallyFragileScoringForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
  
}
