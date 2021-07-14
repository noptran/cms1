import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { FpNonTransition } from './fp-non-transition';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Router } from '@angular/router';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from '../../print-pdf';
@Component({
  selector: 'app-non-intensive-transition',
  templateUrl: './non-intensive-transition.component.html',
  styleUrls: ['./non-intensive-transition.component.scss', '../family-preservation.scss'],
  outputs: ['nonIntOut']
})
export class NonIntensiveTransitionComponent implements OnInit {
  fpNonIntensiveTransition: FpNonTransition = new FpNonTransition();
  NonIntensiveTransitionForm: FormGroup;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;
  constructor(public _printPdf: PrintPdf, public _team: TeamFormService, public _fb: FormBuilder, public _client: ClildFormService, public _referral: ReferralViewService, public _router: Router) { }

  @Output()
  nonIntOut = new EventEmitter();

  ngOnInit() {

    this.formValidation();
    this.autoFetchDetails();
    this.NonIntensiveTransitionForm.disable();
  }


  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log('data in this._client.getByPersonData() is', data);
        this.fpNonIntensiveTransition.caseName = data.person.firstName + ' ' + data.person.lastName;
        this.fpNonIntensiveTransition.caseNumber = data.person.kaecses;
        this.fpNonIntensiveTransition.date = new Date();
        this.printedBy = localStorage.getItem('UserId') || 'Administrator';
        this.printedDate = new Date();
      });

    this._referral.getReferralData()
      .then((data) => {
        console.log('data in  this._referral.getReferralData() in assessment checklist is', data);
        this.fpNonIntensiveTransition.dateOfReferral = new Date(data.referral.referralDate);
      });
      this._team.getUserName()
      .then((data) => {
        console.log('data in this._team.getUserName() is', data);
        this.printedBy = data.users.firstName + ' ' + data.users.lastName;

      });
  }

  editForm() {
    this.NonIntensiveTransitionForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    console.log('source is', source, 'label is', event);
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    !isNullOrUndefined(source.dateOfReferral) ? source.dateOfReferral = Date.parse(source.dateOfReferral) : null;
    !isNullOrUndefined(source.date) ? source.date = Date.parse(source.date) : null;
    !isNullOrUndefined(source.approvalToDcfDate) ? source.approvalToDcfDate = Date.parse(source.approvalToDcfDate) : null;
    !isNullOrUndefined(source.approvedByDcfDate) ? source.approvedByDcfDate = Date.parse(source.approvedByDcfDate) : null;
    !isNullOrUndefined(source.dateAndType) ? source.dateAndType = Date.parse(source.dateAndType) : null;
    !isNullOrUndefined(source.nextScheduledDate) ? source.nextScheduledDate = Date.parse(source.nextScheduledDate) : null;
    !isNullOrUndefined(source.signaturedate) ? source.signaturedate = Date.parse(source.signaturedate) : null;

    console.log('date is', source.date);
    console.log('source is', source, 'label is', event);
    this.nonIntOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.nonIntOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.NonIntensiveTransitionForm = this._fb.group({
      caseName: [null],
      caseNumber: [null],
      dateOfReferral: [null],
      date: [null],

      dateToTransition: [null],

      goalsMet: [null],
      unableToLocate: [null],
      approvalToDcfDate: [null],
      familyRefused: [null],
      childMoved: [null],
      approvedByDcfDate: [null],
      progress: [null],
      isOutcomesGoalsYes : [false],
      isOutcomesGoalsNo : [false],
      outcomesGoals: [null],
      continueToWork: [null],
      continueToWork1: [null],
      initials: [null],
      communityResources: [null],
      isAttached : [false],
      isReferCasePlan : [false],
      providedByStaff: [null],
      dateAndType: [null],
      followingAppointments: [null],
      isDcfCustody : [false],
      isInformalSupervision : [false],
      isOther : [false],
      other: [null],
      nextScheduledDate: [null],
      typeOfHearing: [null],
      currentCasePlan: [null],
      isAchievementDates : [false],
      isAsqSePost : [false],
      isNcfasG : [false],
      sfcsStaff: [null],
      familyMember: [null],
      familyMember1: [null],
      otherend1: [null],
      otherend2: [null],
      signaturedate: [null],
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
