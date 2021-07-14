import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReFamilyPres } from './re-family-pres';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-family-pres-service',
  templateUrl: './family-pres-service.component.html',
  styleUrls: ['./family-pres-service.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['famSerOut']
})
export class FamilyPresServiceComponent implements OnInit {
  familyPresServiceForm: FormGroup;
  reFamilyPresService: ReFamilyPres = new ReFamilyPres();
  isEdit = false;
  editControll = true;
  isPrint = true;

  @Output()
  famSerOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/family/pres/service/detail') { this.getDetails(); }
    this.familyPresServiceForm.disable();
  }

  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reFamilyPresService = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.CaseManagerDate) ? formData.CaseManagerDate = new Date(formData.CaseManagerDate) : null;
    !isNullOrUndefined(formData.TeamSupervisorDate) ? formData.TeamSupervisorDate = new Date(formData.TeamSupervisorDate) : null;
    !isNullOrUndefined(formData.CareCenterDate) ? formData.CareCenterDate = new Date(formData.CareCenterDate) : null;
    this.reFamilyPresService = formData;
  }
  editForm() {
    this.familyPresServiceForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.CaseManagerDate) ? source.CaseManagerDate = Date.parse(source.CaseManagerDate) : null;
    !isNullOrUndefined(source.TeamSupervisorDate) ? source.TeamSupervisorDate = Date.parse(source.TeamSupervisorDate) : null;
    !isNullOrUndefined(source.CareCenterDate) ? source.CareCenterDate = Date.parse(source.CareCenterDate) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.famSerOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.famSerOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.familyPresServiceForm = this._fb.group({
      Client: [null],
      Dob: [null],
      Kc: [null],
      Facts: [null],
      Ss: [null],
      ParentName: [null],
      HomePhone: [null],
      WorkPhone: [null],
      PhysicalAddress: [null],
      MailingAddress: [null],
      City: [null],
      State: [null],
      Zip: [null],
      CaseManager: [null],
      MainOffice: [null],
      OfficePhone: [null],
      CaseManagerCell: [null],
      CaseManagerSignature: [null],
      CaseManagerDate: [null],
      TeamSupervisorSignature: [null],
      TeamSupervisorDate: [null],
      CareCenterAuthorization: [null],
      CareCenterDate: [null],
      ServicesNeeded: [null],
      TasksToBeAddressed: [null],



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
      // !isNullOrUndefined(formData.CaseManagerDate) ? formData.CaseManagerDate = new Date(formData.CaseManagerDate) : null;
      // !isNullOrUndefined(formData.TeamSupervisorDate) ? formData.TeamSupervisorDate = new Date(formData.TeamSupervisorDate) : null;
      // !isNullOrUndefined(formData.CareCenterDate) ? formData.CareCenterDate = new Date(formData.CareCenterDate) : null;

      //  this.reFamilyPresService = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.familyPresServiceForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
