import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReNoticeChild } from './re-notice-child';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-notice-child-custody-caseplan',
  templateUrl: './notice-child-custody-caseplan.component.html',
  styleUrls: ['./notice-child-custody-caseplan.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['noticeCaseOut']
})
export class NoticeChildCustodyCaseplanComponent implements OnInit {
  noticeChildForm: FormGroup;
  reNoticeChild: ReNoticeChild = new ReNoticeChild();
  isEdit = false;
  editControll = true;
  isPrint = true;

  @Output()
  noticeCaseOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/case-plan-goals/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/caseplangoals/notice/child/custody/caseplan/detail') { this.getDetails(); }
    this.noticeChildForm.disable();
  }

  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reNoticeChild = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DateOfInvitation) ? formData.DateOfInvitation = new Date(formData.DateOfInvitation) : null;
    !isNullOrUndefined(formData.TimeOfConference) ? formData.TimeOfConference = new Date(formData.TimeOfConference) : null;
    this.reNoticeChild = formData;
  }
  editForm() {
    this.noticeChildForm.enable();
    this.editControll = false;
  }

  saveForm(source) {
    !isNullOrUndefined(source.DateOfInvitation) ? source.DateOfInvitation = Date.parse(source.DateOfInvitation) : null;
    !isNullOrUndefined(source.TimeOfConference) ? source.TimeOfConference = Date.parse(source.TimeOfConference) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.noticeCaseOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.noticeCaseOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.noticeChildForm = this._fb.group({
      DateOfInvitation: [null],
      TimeOfConference: [null],
      Goal: [null],
      LocationOfConference: [null],
      Child: [null],
      Mother: [null],
      Father: [null],
      Gal: [null],
      Casa: [null],
      Party: [null],
      DcfSocialWorker: [null],
      DcfIlCoordinator: [null],
      PermanencySpecialist: [null],
      FamilySupportWorker: [null],
      Placement: [null],
      PlacementWorker: [null],
      Supervisor: [null],
      OtherApplicables: [null],
      DesigneeName: [null],
      Designee: [null],

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
      //  !isNullOrUndefined(formData.DateOfInvitation) ? formData.DateOfInvitation = new Date(formData.DateOfInvitation) : null;
      //  !isNullOrUndefined(formData.TimeOfConference) ? formData.TimeOfConference = new Date(formData.TimeOfConference) : null;
      //  this.reNoticeChild = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.noticeChildForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
