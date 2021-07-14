import { Component, OnInit } from '@angular/core';
import { ReferralEvents } from './referral-events';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import * as moment from 'moment';

@Component({
  selector: 'app-referral-events-fp-form',
  templateUrl: './referral-events-fp-form.component.html',
  styleUrls: ['./referral-events-fp-form.component.scss']
})
export class ReferralEventsFpFormComponent implements OnInit {
  referralEvents: ReferralEvents = new ReferralEvents();
  editControll = false;
  referralEventsForm: FormGroup;
  metadata: any;
  breadcrumbs = [];
  title = 'Referral Events';
  discardTo = '/reports/referral/family-preservation/referral-events/view';
  url: any;
  isAttachmentRequired = false;
  quickMenu: any;
  req: any;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: '',
  };
  isFormLog = false;


  constructor(public _fb: FormBuilder, public _caseTeam: CaseTeamService,
    public _opencards: OpencardsService, public _router: Router,
    public _client: ClildFormService) { }

  ngOnInit() {
    this.formValidation();
    if (this._router.url == '/reports/referral/family-preservation/referral-events/detail') {
      this.getReferralEventDetails();
      this.isAttachmentRequired = true;
    }
    this.breadcrumbs.push(
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
      { label: 'Referral Events List', href: '/reports/referral/family-preservation/referral-events/view' },
      { label: 'Referral Events Form', active: 'active' },

    );
  }

  /**
   *
   * @param source referral event objects
   */
  addForm(source) {
    !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;

    !isNullOrUndefined(source.referralEventTypeID) ? source.referralEventTypeID = source.referralEventTypeID.referralEventTypeID : null;
    !isNullOrUndefined(source.eventClosureReasonID) ? source.eventClosureReasonID = source.eventClosureReasonID.eventClosureReasonID : null;
    !isNullOrUndefined(source.payorID) ? source.payorID = source.payorID.payorID : null;
    !isNullOrUndefined(source.procodeID) ? source.procodeID = source.procodeID.procodeID : null;
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey();
    if (source.referralEventID) {
      this.update(source);
    } else {
      this.save(source);
    }

  }

  /***
   * @param data - referral event processed data
   */
  save(data) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencards.saveReferralEvents(data).then((data) => {
      loader.style.display = 'none';
      this.referralEvents = data.referralEvent;
      this.referralEventsForm.disable();
      this.editControll = true;
      this._router.navigate(['/reports/referral/family-preservation/referral-events/view']);
    });
  }

  /***
   * @param data - referral event processed data
  */
  update(data) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencards.updateReferralEvents(data).then((data) => {
      loader.style.display = 'none';
      this.referralEvents = data.referralEvent;
      this.referralEventsForm.disable();
      this.editControll = true;
      this._router.navigate(['/reports/referral/family-preservation/referral-events/view']);
    });
  }

  /***
   * @param event keyboard event
   */
  editForm() {
    this.editControll = true;
    this.referralEventsForm.enable();
  }

  /**
   *
   * @param event autocomplete event
   * @param label type of metadata
   */
  getMetaData(event, label) {
    let metaDataReqObj, metaDataReq;
    switch (label) {
      case 'referralEventType':
        metaDataReqObj = 'referralEventType';
        break;
      case 'closureReason':
        metaDataReqObj = 'eventClosureReason';
        break;
      case 'payor':
        metaDataReqObj = 'payor';
        break;
      case 'proCode':
        metaDataReqObj = 'procode';
        break;
    }
    if (metaDataReqObj) {
      metaDataReq = { Object: metaDataReqObj, value: event.query };
      this._caseTeam.getSearchList(metaDataReq).then((data) => {
        this.metadata = data.dropDown;
      });
    }
  }

  formValidation() {
    this.referralEventsForm = this._fb.group({
      'referralEventType': [null],
      'beginDate': [null],
      'endDate': [null],
      'closureReason': [null],
      'proCode': [null],
      'units': [null],
      'unitsRate': [null],
      'payor': [null],
      'notes': [null]
    });
  }

  getReferralEventDetails() {
    this.req = { referralEventID: this._client.getId() };
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencards.getByIdReferralEvents(this.req).then((data) => {
      if (data.referralEvent.isActive) {
        !isNullOrUndefined(data.referralEvent.beginDate) ? data.referralEvent.beginDate = new Date(data.referralEvent.beginDate) : null;
        !isNullOrUndefined(data.referralEvent.endDate) ? data.referralEvent.endDate = new Date(data.referralEvent.endDate) : null;
      } else {
        !isNullOrUndefined(data.referralEvent.beginDate) ? data.referralEvent.beginDate = moment.utc(data.referralEvent.beginDate).format('MM/DD/YYYY') : null;
        !isNullOrUndefined(data.referralEvent.endDate) ? data.referralEvent.endDate = moment.utc(data.referralEvent.endDate).format('MM/DD/YYYY') : null;
      }
      loader.style.display = 'none';
      this.referralEvents = data.referralEvent;


      this.referralEventsForm.disable();
      this.editControll = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.referralEvent.changedBy) ? data.referralEvent.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.referralEvent.changedDate) ? moment(data.referralEvent.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.referralEvent.enteredBy) ? data.referralEvent.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.referralEvent.enteredDate) ? moment(data.referralEvent.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


    });

  }

  navigateTo() {

    const currentURL = this._router.url;
    if (currentURL == '/reports/referral/family-preservation/referral-events/new' || currentURL == '/reports/referral/family-preservation/referral-events/detail') {
      this.url = '/reports/attachment-document/referral-events';
    } else {
      this.url = '/reports/attachment-document/rfc/referral-events';
    }
    return this._router.navigate([this.url]);
  }

}
