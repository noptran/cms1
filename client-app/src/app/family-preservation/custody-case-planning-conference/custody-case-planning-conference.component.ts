import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { FpCustodyCase } from './fp-custody-case';
import html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-custody-case-planning-conference',
  templateUrl: './custody-case-planning-conference.component.html',
  styleUrls: ['./custody-case-planning-conference.component.scss', '../family-preservation.scss'],
  outputs: ['caseCusOut']
})
export class CustodyCasePlanningConferenceComponent implements OnInit {
  fpCustodyCase: FpCustodyCase = new FpCustodyCase();
  custodyCaseForm: FormGroup;
  editControll = true;
  isPrint = true;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  @Output()
  caseCusOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
      this.custodyCaseForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/case-plan-goals/new') {
      this.editControll = false;
    }

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpCustodyCase = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfconference) ? formData.dateOfconference = new Date(formData.dateOfconference) : null;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    this.fpCustodyCase = formData;

  }
  saveForm( source) {
    console.log('source is', source);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.dateOfconference) ? source.dateOfconference = Date.parse(source.dateOfconference) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    console.log('date is', source.date);
    console.log('source is', source);
    this.caseCusOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.caseCusOut.emit({ cmsData: {} });
  }
  editForm() {
    this.custodyCaseForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.custodyCaseForm = this._fb.group({
      date: [null],
      dcfOffice: [null],
      childName: [null],
      dateOfconference: [null],
      locationOfConference: [null],
      signature: [null],
      printedName: [null],
      address: [null],
      cityInfo: [null],
      address1: [null],
      cityInfo1: [null],

    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
