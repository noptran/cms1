import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReIntDepChecklist } from './re-int-dep-checklist';
import html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-departure-checklist',
  templateUrl: './departure-checklist.component.html',
  styleUrls: ['./departure-checklist.component.scss','../../family-preservation/family-preservation.scss'],
  outputs: ['deptCheckOut']
})
export class DepartureChecklistComponent implements OnInit {
  RiDepartureChecklist: ReIntDepChecklist = new ReIntDepChecklist();
  departureChecklistForm: FormGroup;
  editControll = true;
  isPrint = true;

  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _opencard: OpencardsService,public _fb: FormBuilder, public _router: Router) { }

  @Output()
  deptCheckOut = new EventEmitter();

  ngOnInit() {
    
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    this.departureChecklistForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.RiDepartureChecklist = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.reformDataParentDate) ? formData.reformDataParentDate = new Date(formData.reformDataParentDate) : null;
    !isNullOrUndefined(formData.transportingAdultDate) ? formData.transportingAdultDate = new Date(formData.transportingAdultDate) : null;
    this.RiDepartureChecklist = formData;
  }
  saveForm(event, source) {
    console.log('source is', source, 'label is', event);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.resourceParentDate) ? source.resourceParentDate = Date.parse(source.resourceParentDate) : null;
    !isNullOrUndefined(source.transportingAdultDate) ? source.transportingAdultDate = Date.parse(source.transportingAdultDate) : null;
    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.deptCheckOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.deptCheckOut.emit({ cmsData: {} });
  }
  editForm() {
    this.departureChecklistForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.departureChecklistForm = this._fb.group({
      isPossessionsBought:[false],
      isSavingsAccompanied:[false],
      isUseableThingsAccompanied:[false],
      isChildLifeBookAccompanied:[false],
      explanationNotSend:[null],
      resourceParent:[null],
      resourceParentDate:[null],
      transportingAdult:[null],
      transportingAdultDate:[null]

    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
