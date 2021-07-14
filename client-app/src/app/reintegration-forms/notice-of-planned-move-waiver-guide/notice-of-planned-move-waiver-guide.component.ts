import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReintNoticeWaiverGuide } from './reint-notice-waiver-guide';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-notice-of-planned-move-waiver-guide',
  templateUrl: './notice-of-planned-move-waiver-guide.component.html',
  styleUrls: ['./notice-of-planned-move-waiver-guide.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['waiverOut']
})
export class NoticeOfPlannedMoveWaiverGuideComponent implements OnInit {
  recipientName: string;
  childrenNames: string;
  relationshipToChild: string;
  localSfcsOffice: string;
  listOfReceipents: string;

  noticeOfPlannedMoveWaiverForm: FormGroup;
  reintNoticeOfPlannedMoveWaiver: ReintNoticeWaiverGuide = new ReintNoticeWaiverGuide();
  isEdit = false;
  isPrint = true;
  editControll = true;
  printedBy: any;
  printedDate: any;
  @Output()
  waiverOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }


  ngOnInit() {

    this.formDataInitialization();
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/permanency/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/moveandpermanency/planned/move/waiver/guide/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.noticeOfPlannedMoveWaiverForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reintNoticeOfPlannedMoveWaiver = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

    this.reintNoticeOfPlannedMoveWaiver = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);

        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);

      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }



  formDataInitialization() {
    this.recipientName = "RECEIPENT NAME";
    this.childrenNames = "CHILDREN NAMES";
    this.relationshipToChild = "RELATION TO CHILD";
    this.localSfcsOffice = "LOCAL SFCS OFFICE";
    this.listOfReceipents = "LIST OF RECEIPENTS";
  }


  editForm() {
    this.noticeOfPlannedMoveWaiverForm.enable();
    this.editControll = false;
  }

  saveForm(source) {
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.waiverOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/rfc/permanency"]);
  }
  discardForm() {
    this.waiverOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.noticeOfPlannedMoveWaiverForm = this._fb.group({
      Signature: [null],
      Date: [null],
      printedBy: [null],
      printedDate: [null],
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
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

      //  this.reintNoticeOfPlannedMoveWaiver = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.noticeOfPlannedMoveWaiverForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
