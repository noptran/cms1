import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpChangeOfStatus } from './fp-change-of-status';
import html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-change-of-status-form',
  templateUrl: './change-of-status-form.component.html',
  styleUrls: ['./change-of-status-form.component.scss', '../family-preservation.scss'],
  outputs: ['changeOfStatOut']
})
export class ChangeOfStatusFormComponent implements OnInit {

  fpChangeOfStatus: FpChangeOfStatus = new FpChangeOfStatus();
  changeOfStatusForm: FormGroup;
  editControll = true;
  isPrint = true;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _router: Router) { }


  @Output()
  changeOfStatOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/assessment/detail') {
      this.getCmsFormJson();
      this.changeOfStatusForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/assessment/new') {
      this.editControll = false;
    }

  }

  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpChangeOfStatus = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dateOfReferral) ? formData.dateOfReferral = new Date(formData.dateOfReferral) : null;
    !isNullOrUndefined(formData.resumptionDate) ? formData.resumptionDate = new Date(formData.resumptionDate) : null;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    this.fpChangeOfStatus = formData;
  }
  saveForm( source) {
    console.log('source is', source);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    !isNullOrUndefined(source.resumptionDate) ? source.resumptionDate = Date.parse(source.resumptionDate) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.changeOfStatOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.changeOfStatOut.emit({ cmsData: {} });
  }
  editForm() {
    this.changeOfStatusForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.changeOfStatusForm = this._fb.group({

      caseName: [null],
      caseNumber: [null],
      dateOfReferral: [null],
      date: [null],

      isChangeOF: [false],
      isCustodyStatus: [false],
      isCINC: [false],
      childrenName: [null],
      caseNumberChecked: [null],
      isPlacedDCF: [false],
      isReleasedDCF: [false],
      releasedDCF: [null],
      isPlacedInformal: [false],
      isReleasedInformal: [false],
      releasedInformal: [null],
      isPlacedDcfOOH: [false],
      placedDcfOOH: [null],
      isPlacedJJA: [false],
      placedJJA: [null],
      isPlacedJjaOOH: [false],
      placedJjaOOH: [null],
      isChangeTherapist: [false],
      isCaseManager: [false],
      isFamilySupportWorke: [false],
      isAssignedToCase: [false],
      current: [null],
      newChange: [null],
      cellNumber: [null],
      isChangeOfCaseHead: [false],
      changeOfCaseHead: [null],
      city: [null],
      country: [null],
      zip: [null],
      ischangeCaseHeadPhNo: [false],
      changeCaseHeadPhNo: [null],
      isResumption: [false],
      resumptionDate: [null],
      isDcfRequest: [false],
      isFamilyRequest: [false],
      isOther: [false],
      comments: [null],
      isOtherChange: [false],
      briefExplanation: [null],
      staffSignature: [null],
    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
