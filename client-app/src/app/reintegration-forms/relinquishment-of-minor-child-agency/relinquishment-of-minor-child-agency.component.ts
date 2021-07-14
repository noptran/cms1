import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReRelinquishAgency } from './re-relinquish-agency';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-relinquishment-of-minor-child-agency',
  templateUrl: './relinquishment-of-minor-child-agency.component.html',
  styleUrls: ['./relinquishment-of-minor-child-agency.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['relinquishOut']
})
export class RelinquishmentOfMinorChildAgencyComponent implements OnInit {
  relinquishmentMinorForm: FormGroup;
  reRelinquishmentMinor: ReRelinquishAgency = new ReRelinquishAgency();
  editControll = true;
  isEdit = false;
  isPrint = true;

  @Output()
  relinquishOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/court-orders/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/courtorder/relinquishment/minor/child/agency/detail') { this.getDetails(); }
    this.relinquishmentMinorForm.disable();
  }

  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reRelinquishmentMinor = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
    !isNullOrUndefined(formData.Dated) ? formData.Dated = new Date(formData.Dated) : null;
    !isNullOrUndefined(formData.PersonDated) ? formData.PersonDated = new Date(formData.PersonDated) : null;

    !isNullOrUndefined(formData.AgencyDate) ? formData.AgencyDate = new Date(formData.AgencyDate) : null;
    !isNullOrUndefined(formData.MinorParentDate) ? formData.MinorParentDate = new Date(formData.MinorParentDate) : null;
    !isNullOrUndefined(formData.PersonDated1) ? formData.PersonDated1 = new Date(formData.PersonDated1) : null;

    this.reRelinquishmentMinor = formData;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.Dated) ? source.Dated = Date.parse(source.Dated) : null;
    !isNullOrUndefined(source.PersonDated) ? source.PersonDated = Date.parse(source.PersonDated) : null;

    !isNullOrUndefined(source.AgencyDate) ? source.AgencyDate = Date.parse(source.AgencyDate) : null;
    !isNullOrUndefined(source.MinorParentDate) ? source.MinorParentDate = Date.parse(source.MinorParentDate) : null;
    !isNullOrUndefined(source.PersonDated1) ? source.PersonDated1 = Date.parse(source.PersonDated1) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.relinquishOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.relinquishOut.emit({ cmsData: {} });
  }
  editForm() {
    this.relinquishmentMinorForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.relinquishmentMinorForm = this._fb.group({

      LocoParentis: [null],
      Dob: [null],
      BirthPlace: [null],
      Location: [null],
      ResideAt: [null],
      County: [null],
      State: [null],
      Age: [null],
      Born: [null],
      Tribe: [null],
      Address: [null],
      ChildTribe: [null],
      ChildAddress: [null],
      AgencyName: [null],
      Dated: [null],
      At: [null],
      Signature: [null],
      StateOf: [null],
      Ss: [null],
      CountyOf: [null],
      Person: [null],
      PersonDated: [null],
      PersonAt: [null],
      PersonSignature: [null],
      TitleRank: [null],
      AppointmentExpires: [null],

      Agency: [null],
      AgencyName1: [null],
      AgencyCustody: [null],
      AgencyDate: [null],
      AgencySignature: [null],

      MinorParent: [null],
      MinorParentRelinquishment: [null],
      MinorParentDate: [null],
      MinorParentSignature: [null],

      JudgeOf: [null],
      certifiedBy: [null],

      StateOf1: [null],
      Ss1: [null],
      CountyOf1: [null],
      Person1: [null],

      PersonDated1: [null],
      PersonAt1: [null],
      PersonSignature1: [null],

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
      // !isNullOrUndefined(formData.Dated) ? formData.Dated = new Date(formData.Dated) : null;
      // !isNullOrUndefined(formData.PersonDated) ? formData.PersonDated = new Date(formData.PersonDated) : null;

      // !isNullOrUndefined(formData.AgencyDate) ? formData.AgencyDate = new Date(formData.AgencyDate) : null;
      // !isNullOrUndefined(formData.MinorParentDate) ? formData.MinorParentDate = new Date(formData.MinorParentDate) : null;
      // !isNullOrUndefined(formData.PersonDated1) ? formData.PersonDated1 = new Date(formData.PersonDated1) : null;

      //  this.reRelinquishmentMinor = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.relinquishmentMinorForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
