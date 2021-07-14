import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpFamilyRelapse } from './fp-family-relapse';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-family-relapse-prevention-non-intensive',
  templateUrl: './family-relapse-prevention-non-intensive.component.html',
  styleUrls: ['./family-relapse-prevention-non-intensive.component.scss'],
  outputs: ['famRelOut']
})
export class FamilyRelapsePreventionNonIntensiveComponent implements OnInit {
  familyRelapsePrevention: FpFamilyRelapse = new FpFamilyRelapse();
  familyRelapsePreventionForm: FormGroup;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  famRelOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    this.autoFetchDetails();
    this.familyRelapsePreventionForm.disable();
  }

  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.familyRelapsePrevention.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.familyRelapsePrevention.caseNumber = data.person.kaecses;
        this.familyRelapsePrevention.date = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.familyRelapsePrevention.dateOfReferral = new Date(data.referral.referralDate);
      });
      this._team.getUserName()
      .then((data) => {
        console.log('data in this._team.getUserName() is', data);
        this.printedBy = data.users.firstName + ' ' + data.users.lastName;

      });
  }

  saveForm(event, source) {
    console.log('source is', source, 'label is', event);
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    !isNullOrUndefined(source.date) ? source.caseDate = Date.parse(source.date) : null;
    !isNullOrUndefined(source.startDate) ? source.startDate = Date.parse(source.startDate) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
    !isNullOrUndefined(source.duration) ? source.duration = Date.parse(source.duration) : null;

    !isNullOrUndefined(source.startDate1) ? source.startDate1 = Date.parse(source.startDate1) : null;
    !isNullOrUndefined(source.endDate1) ? source.endDate1 = Date.parse(source.endDate1) : null;
    !isNullOrUndefined(source.duration1) ? source.duration1 = Date.parse(source.duration1) : null;

    !isNullOrUndefined(source.startDate2) ? source.startDate2 = Date.parse(source.startDate2) : null;
    !isNullOrUndefined(source.endDate2) ? source.endDate2 = Date.parse(source.endDate2) : null;
    !isNullOrUndefined(source.duration2) ? source.duration2 = Date.parse(source.duration2) : null;

    !isNullOrUndefined(source.startDate3) ? source.startDate3 = Date.parse(source.startDate3) : null;
    !isNullOrUndefined(source.endDate3) ? source.endDate3 = Date.parse(source.endDate3) : null;
    !isNullOrUndefined(source.duration3) ? source.duration3 = Date.parse(source.duration3) : null;

    !isNullOrUndefined(source.startDate4) ? source.startDate4 = Date.parse(source.startDate4) : null;
    !isNullOrUndefined(source.endDate4) ? source.endDate4 = Date.parse(source.endDate4) : null;
    !isNullOrUndefined(source.duration4) ? source.duration4 = Date.parse(source.duration4) : null;

    !isNullOrUndefined(source.startDate5) ? source.startDate5 = Date.parse(source.startDate5) : null;
    !isNullOrUndefined(source.endDate5) ? source.endDate5 = Date.parse(source.endDate5) : null;
    !isNullOrUndefined(source.duration5) ? source.duration5 = Date.parse(source.duration5) : null;

    !isNullOrUndefined(source.startDate6) ? source.startDate6 = Date.parse(source.startDate6) : null;
    !isNullOrUndefined(source.endDate6) ? source.endDate6 = Date.parse(source.endDate6) : null;
    !isNullOrUndefined(source.duration6) ? source.duration6 = Date.parse(source.duration6) : null;

    !isNullOrUndefined(source.startDate7) ? source.startDate7 = Date.parse(source.startDate7) : null;
    !isNullOrUndefined(source.endDate7) ? source.endDate7 = Date.parse(source.endDate7) : null;
    !isNullOrUndefined(source.duration7) ? source.duration7 = Date.parse(source.duration7) : null;

    !isNullOrUndefined(source.dateEndSign) ? source.date = Date.parse(source.dateEndSign) : null;
    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.famRelOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/phase"]);
  }
  discardForm() {
    this.famRelOut.emit({ cmsData: {} });
  }
  editForm() {
    this.familyRelapsePreventionForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.familyRelapsePreventionForm = this._fb.group({

      caseName: [null],
      caseNumber: [null],
      dateOfReferral: [null],
      date: [null],

      maintenanceObjective: [null],
      warningSignals: [null],
      preventionPlanTask: [null],
      personResponsible: [null],
      duration: [null],
      startDate: [null],
      endDate: [null],

      warningSignals1: [null],
      warningSignals2: [null],
      warningSignals3: [null],
      warningSignals4: [null],
      warningSignals5: [null],
      warningSignals6: [null],
      warningSignals7: [null],

      preventionPlanTask1: [null],
      personResponsible1: [null],
      duration1: [null],
      startDate1: [null],
      endDate1: [null],

      preventionPlanTask2: [null],
      personResponsible2: [null],
      duration2: [null],
      startDate2: [null],
      endDate2: [null],

      preventionPlanTask3: [null],
      personResponsible3: [null],
      duration3: [null],
      startDate3: [null],
      endDate3: [null],

      preventionPlanTask4: [null],
      personResponsible4: [null],
      duration4: [null],
      startDate4: [null],
      endDate4: [null],

      preventionPlanTask5: [null],
      personResponsible5: [null],
      duration5: [null],
      startDate5: [null],
      endDate5: [null],

      preventionPlanTask6: [null],
      personResponsible6: [null],
      duration6: [null],
      startDate6: [null],
      endDate6: [null],

      preventionPlanTask7: [null],
      personResponsible7: [null],
      duration7: [null],
      startDate7: [null],
      endDate7: [null],

      sfcsStaff: [null],
      familyMember1: [null],
      familyMember2: [null],
      other1: [null],
      other2: [null],
      dateEndSign: [null],
      printedBy: [null],
      printedDate: [null],

    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.jsPdfOrientation = 'landscape';
    this._printPdf.printForm();
  }

}
