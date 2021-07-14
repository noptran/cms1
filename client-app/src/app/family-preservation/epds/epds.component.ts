import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpEpds } from './fp-epds';
import html2pdf from 'html2pdf.js';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-epds',
  templateUrl: './epds.component.html',
  styleUrls: ['./epds.component.scss', '../family-preservation.scss'],
  outputs: ['epdsOut']
})
export class EPDSComponent implements OnInit {
  fpEpds: FpEpds = new FpEpds();
  epdsForm: FormGroup;
  editControll = true;
  checked = true;
  isPrint = true;

  printedBy: any;
  printedDate: any;

  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  epdsOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/assessment/detail') {
      this.getCmsFormJson();
      this.epdsForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/assessment/new') {
      this.editControll = false;
    }
    this.autoFetchDetails();

  }
  getCmsFormJson() {
    const data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    const json = JSON.parse(data.pdfJsonData);
    this.fpEpds = json.cmsFormJson;
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.dob) ? formData.dob = new Date(formData.dob) : null;
    !isNullOrUndefined(formData.babyDob) ? formData.babyDob = new Date(formData.babyDob) : null;
    !isNullOrUndefined(formData.date) ? formData.date = new Date(formData.date) : null;
    this.fpEpds = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpEpds.name = data.person.firstName + ' ' + data.person.lastName;
        this.fpEpds.dob = new Date(data.person.dob);
        this.fpEpds.address = data.person.address;
        this.fpEpds.phone = data.person.homePh;
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);

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

    !isNullOrUndefined(source.dob) ? source.dob = Date.parse(source.dob) : null;
    !isNullOrUndefined(source.babyDob) ? source.babyDob = Date.parse(source.babyDob) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.epdsOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.epdsOut.emit({ cmsData: {} });
  }
  editForm() {
    this.epdsForm.enable();
    this.editControll = false;
  }

  formValidation() {
    this.epdsForm = this._fb.group({
      name: [null],
      address: [null],
      dob: [null],
      babyDob: [null],
      phone: [null],

      ///////////////

      isHappyAllYes: [false],
      isHappyMostYes: [false],
      isHappyOftenNo: [false],
      isHappyNeverNo: [false],


      isLaughAlways: [false],
      isLaughNotQuite: [false],
      isLaughDefinitely: [false],
      isLaughNever: [false],

      isEnjoymentMuch: [false],
      isEnjoymentLess: [false],
      isEnjoymentDefinitelyLess: [false],
      isEnjoymentHardly: [false],

      isBlamedMostYes: [false],
      isBlamedSomeYes: [false],
      isBlamedOftenNo: [false],
      isBlamedNeverNo: [false],


      isWorriedNever: [false],
      isWorriedHardly: [false],
      isWorriedSometimes: [false],
      isWorriedOften: [false],

      isScaredLotYes: [false],
      isScaredSometimesYes: [false],
      isScaredNotMuch: [false],
      isScaredNeverNo: [false],

      isgettingMostYes: [false],
      isgettingSometimesYes: [false],
      isgettingOftenNo: [false],
      isgettingNeverNo: [false],

      isUnhappyMostYes: [false],
      isUnhappySometimesYes: [false],
      isUnhappyOftenNo: [false],
      isUnhappyNeverNo: [false],

      isMiserableMostYes: [false],
      isMiserableSometimesYes: [false],
      isMiserableOftenNo: [false],
      isMiserableNeverNo: [false],


      isCryingMostYes: [false],
      isCryingSometimesYes: [false],
      isCryingOftenNo: [false],
      isCryingNeverNo: [false],

      isHarmingMostYes: [false],
      isHarmingSometimesYes: [false],
      isHarmingHardly: [false],
      isHarmingNeverNo: [false],

      administered: [null],
      date: [null],
      printedBy: [null],
      printedDate: [null],

    });
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
