import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { FpMissingChild } from './fp-missing-child';
import html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-missing-child-questionaire',
  templateUrl: './missing-child-questionaire.component.html',
  styleUrls: ['./missing-child-questionaire.component.scss', '../family-preservation.scss'],
  outputs: ['missingChildOut']
})
export class MissingChildQuestionaireComponent implements OnInit {
  fpMissingChild: FpMissingChild = new FpMissingChild();
  missingChildForm: FormGroup;
  editControll = true;
  isPrint = true;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _router: Router) { }

  @Output()
  missingChildOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/assessment/detail') {
      this.getCmsFormJson();
      this.missingChildForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/assessment/new') {
      this.editControll = false;
    }
  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpMissingChild = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
    !isNullOrUndefined(formData.signatureDate) ? formData.signatureDate = new Date(formData.signatureDate) : null;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    this.fpMissingChild = formData;
  }
  saveForm(event, source) {
    console.log('source is', source, 'label is', event);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    !isNullOrUndefined(source.signatureDate) ? source.signatureDate = Date.parse(source.signatureDate) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.missingChildOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {

    this.missingChildOut.emit({ cmsData: {} });
  }
  editForm() {
    this.missingChildForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.missingChildForm = this._fb.group({
      caseName: [null],
      caseNumber: [null],
      dateOfReferral: [null],
      date: [null],

      isPhysicalDescription : [false],
      physicalDescription: [null],

      isClothing : [false],
      clothing: [null],

      isMissingItems : [false],
      missingItems: [null],

      isSuggestedLocation : [false],
      suggestedLocation: [null],

      isContactInformation : [false],
      contactInformation: [null],

      isPossibleRisks : [false],
      possibleRisks: [null],

      isMedicalConditions : [false],
      medicalConditions: [null],

      signature: [null],
      signatureDate: [null],

    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
