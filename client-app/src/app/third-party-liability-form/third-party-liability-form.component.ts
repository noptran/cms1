import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tpl } from './tpl';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import { ClientReferralEventService } from '../client-referral-event-form/client-referral-event.service';
import { isNull, isUndefined } from 'util';
import { CaseTeamService } from '../case-team/case-team.service';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-third-party-liability-form',
  templateUrl: './third-party-liability-form.component.html',
  styleUrls: ['./third-party-liability-form.component.scss']
})
export class ThirdPartyLiabilityFormComponent implements OnInit {
  title: any = 'Third Party Liability';
  status = 'draft';
  quickMenu = "client";
  formStatus?: any;
  subtitle: any;
  formControl: any;
  editControll: boolean;
  mainTabs = [];
  sIndex;
  tplForm: FormGroup;
  tpl: Tpl = new Tpl();
  clientId: any
  metadata = [];
  isEditForm = false;
  breadcrumbs = [];
  discardTo = '/reports/thirdparty/liability/view';
  url: any;
  isAttachmentRequired = false;
  req = {};
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _fb: FormBuilder, public _opencards: OpencardsService,
    public _router: Router, public _referralEvent: ClientReferralEventService,
    public _caseTeam: CaseTeamService) { }

  ngOnInit() {
    this.formControl = false;
    this.editControll = false;
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Client', href: "/reports/client/details", active: '' },
      { label: 'TLP List', active: '', href: '/reports/thirdparty/liability/view' },
      { label: 'TLP', active: 'active' },
    )
    this.defineMainTabs();
    this.setIndex(0);
    this.formValidation();
    if (this._router.url == '/reports/thirdparty/liability/details') {
      this.isAttachmentRequired = true;
      this.getTPLDetails();
    }
    this.getClientDetails();
  }

  /**
   * Get the client id
   */
  getClientDetails() {
    let localStorageId
    localStorageId = localStorage.getItem('clientId');
    this.clientId = localStorageId - this._opencards.getHasKey();
  }

  /***
   * Get the TLP record by id
   */
  getTPLDetails() {
    let localStorageId, tplId;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    localStorageId = localStorage.getItem('tplId');
    tplId = localStorageId - this._opencards.getHasKey();
    this.req = { clientTPLID: tplId }
    this._caseTeam.getTPLByRecID(this.req).then((data) => {
      loader.style.display = 'none';
      if (data.clientTPL.isActive) {
        !isNull(data.clientTPL.beginDate) && !isUndefined(data.clientTPL.beginDate) ? data.clientTPL.beginDate = moment.utc(data.clientTPL.beginDate).format('MM/DD/YYYY') : null;
        !isNull(data.clientTPL.endDate) && !isUndefined(data.clientTPL.endDate) ? data.clientTPL.endDate = moment.utc(data.clientTPL.endDate).format('MM/DD/YYYY') : null;
      } else {
        !isNull(data.clientTPL.beginDate) && !isUndefined(data.clientTPL.beginDate) ? data.clientTPL.beginDate = moment.utc(data.clientTPL.beginDate).format('MM/DD/YYYY') : null;
        !isNull(data.clientTPL.endDate) && !isUndefined(data.clientTPL.endDate) ? data.clientTPL.endDate = moment.utc(data.clientTPL.endDate).format('MM/DD/YYYY') : null;
      }
      this.tpl = data.clientTPL;
      this.tplForm.disable();
      this.isEditForm = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNull(data.clientTPL.changedBy) ? data.clientTPL.changedBy : '------';
      this.formLogInfo.changedDate = !isNull(data.clientTPL.changedDate) ? moment(data.clientTPL.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNull(data.clientTPL.enteredBy) ? data.clientTPL.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNull(data.clientTPL.enteredDate) ? moment(data.clientTPL.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  /**
   * @returns main tab
   */
  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Section 1', href: '#nav-1' },
      { label: 'Section 2', href: '#nav-2' },
    ]
  }

  resetForm() { }

  discardForm() { }

  setIndex(index: number) {
    this.sIndex = index;
  }

  /***
   * Form validation
   */
  formValidation() {
    this.tplForm = this._fb.group({
      "insurance": [null, Validators.compose([Validators.required])],
      "groupNo": [null],
      "policyNo": [null],
      "beginDate": [null, Validators.compose([Validators.required])],
      "endDate": [null],
      "contact_FirstName": [null],
      "contact_LastName": [null],
      "contact_MI": [null],
      "phone": [null],
      "subscriber_FirstName": [null],
      "subscriber_LastName": [null],
      "subscriber_mi": [null],
      "ssn": [null],
      "terminateReason": [null],
      "notes": [null]
    })
  }

  /***
   * @param source - TPL data
   */
  save(source) {
    if (this.tplForm.valid) {
      let loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      source.beginDate !== undefined && source.beginDate !== null ? source.beginDate = Date.parse(source.beginDate) : null;
      source.endDate !== undefined && source.endDate !== null ? source.endDate = Date.parse(source.endDate) : null;
      !isNull(source.tplid) && !isUndefined(source.tplid) ? source.tplid = source.tplid.tplid : null;
      source.clientID = this.clientId
      if (source.clientTPLID) {
        this._caseTeam.updateTPL(source).then((data) => {
          this.tpl = data.clientTPL;
          loader.style.display = 'none';
          swal('Updated!', 'Record updated successfully', 'success');
          this.isEditForm = true;
          this.tplForm.disable();
          this._router.navigate(['/reports/thirdparty/liability/view'])
        })
      } else {
        this._caseTeam.saveTPL(source).then(() => {
          loader.style.display = 'none';
          swal('Saved!', 'Record saved  successfully', 'success');
          this.isEditForm = true;
          this.tplForm.disable();
          this._router.navigate(['/reports/thirdparty/liability/view'])
        })
      }
    } else {
      swal('Warning', 'Please fill the mandatory fields', 'warning');
    }


  }
  /**
    * 
    * @param event event
    * @param label metadata name
    */
  getMetadata(event, label) {
    let req, object;
    switch (label) {
      case 'insurance':
        object = 'tpl';
        break;
    }
    req = { Object: object, value: event.query }
    this._referralEvent.getReferralEventMetaData(req).then((data) => {
      this.metadata = data.dropDown;
    })
  }

  editForm() {
    this.isEditForm = false;
    this.tplForm.enable();
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reports/thirdparty/liability/detail') {
      this.url = '/reports/attachment-document/client/third-party-liability';
    }
    else {
      this.url = '/reports/attachment-document/client/third-party-liability';
    }
    return this._router.navigate([this.url])
  }


}
