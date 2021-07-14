import { Component, OnInit } from '@angular/core';
import { AdoptionEvent } from './adoption-event';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import { ClildFormService } from '../child-forms/child-forms.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../local-values';

@Component({
  selector: 'app-adoption-event',
  templateUrl: './adoption-event.component.html',
  styleUrls: ['./adoption-event.component.scss']
})
export class AdoptionEventComponent implements OnInit {
  adoptionEventForm: FormGroup;
  adoption: AdoptionEvent = new AdoptionEvent();
  metaData = [];
  isEdit = false;
  breadcrumbs = [];
  discardTo = '/reintegration/referral/opencard/adoption-event/view';
  url: any;
  isAttachmentRequired = false;
  req: any;
  constructor(public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _caseTeam: CaseTeamService, public _fb: FormBuilder, public _localValues: LocalValues) { }

  ngOnInit() {
    this.formValidation();
    if (this._router.url == '/reintegration/referral/opencard/adoption-event/detail') {
      this.getRecById();
      this.isAttachmentRequired = true;
    }
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Adoption Event List', href: '/reintegration/referral/opencard/adoption-event/view', active: '' },
      { label: 'Adoption Event', active: 'active' },
    )
  }

  formValidation() {
    this.adoptionEventForm = this._fb.group({
      adoptionEventTypeID: [null],
      completedDate: [null],
      dueDate: [null],
      projectedDate: [null],
      notes: [null]
    })
  }

  formAction(source: any) {
    !isNullOrUndefined(source.adoptionEventTypeID) ? source.adoptionEventTypeID = source.adoptionEventTypeID.adoptionEventTypeID : null;
    source.completedDate = this._localValues.stringFormatDatetime(source.completedDate);
    source.dueDate = this._localValues.stringFormatDatetime(source.dueDate);
    source.projectedDate = this._localValues.stringFormatDatetime(source.projectedDate);
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    source.adoptionID = parseInt(localStorage.getItem('adoptionId')) - this._opencard.getHasKey();
    !isNullOrUndefined(source.adoptionEventID) ? this.update(source) : this.save(source);
  }

  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveAdoptionEvent(source).then((data) => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      return this._router.navigate(['/reintegration/referral/opencard/adoption-event/view'])
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateAdoptionEvent(source).then((data) => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      return this._router.navigate(['/reintegration/referral/opencard/adoption-event/view'])
    })

  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'adoptionEventType':
        obj = 'adoptionEventType';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data) => {
      this.metaData = data.dropDown;
    })
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { adoptionEventID: this._client.getId() }
    this._opencard.getByIdAdoptionEvent(this.req).then((data) => {
      loader.style.display = 'none';
      !isNullOrUndefined(data.adoptionEvent.completedDate) ? data.adoptionEvent.completedDate = new Date(data.adoptionEvent.completedDate) : null;
      !isNullOrUndefined(data.adoptionEvent.dueDate) ? data.adoptionEvent.dueDate = new Date(data.adoptionEvent.dueDate) : null;
      !isNullOrUndefined(data.adoptionEvent.projectedDate) ? data.adoptionEvent.projectedDate = new Date(data.adoptionEvent.projectedDate) : null;
      this.adoption = data.adoptionEvent;
      this.isEdit = true;
      this.adoptionEventForm.disable();
    })
  }

  editForm() {
    this.isEdit = false;
    this.adoptionEventForm.enable();
  }

  navigateTo() {

    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/adoption-event/new' || currentURL == '/reintegration/referral/opencard/adoption-event/detail') {
      this.url = '/reports/attachment-document/rfc/adoption-event';
    }
    else {
      this.url = '/reports/attachment-document/adoption-event';
    }
    return this._router.navigate([this.url])
  }

}
