import { Component, OnInit } from '@angular/core';
import { ProviderPreferences } from './provider-preferences';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { ProviderService } from '../../provider.service';
import * as moment from 'moment';


@Component({
  selector: 'app-provider-preferences',
  templateUrl: './provider-preferences.component.html',
  styleUrls: ['./provider-preferences.component.scss']
})
export class ProviderPreferencesComponent implements OnInit {

  pref: ProviderPreferences = new ProviderPreferences();
  preference: FormGroup;
  isEdit = false;
  metaData = [];
  discardTo = '/provider/opencard/provider-preferences/view';
  breadcrumbs = [];
  isAttachmentRequired = false;
  url: any;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  

  constructor(public _router: Router, public _fb: FormBuilder, public _caseTeam: CaseTeamService,
    public _opencard: OpencardsService, public _provider: ProviderService, public _client: ClildFormService) { }

  ngOnInit() {
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider List', href: '/reports/provider/view', active: '' },
      { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Preferences List', active: '', href: '/provider/opencard/provider-preferences/view' },
      { label: 'Preference', active: 'active' }
    );
    this.formValidation();
    if (this._router.url === '/provider/opencard/provider-preferences/detail') {
      this.isAttachmentRequired = true;
      this.getProviderPreference();
    }
    this.pref.onHoldCapacity = 0;
  }

  save(source: ProviderPreferences) {
    const req = {
      'youngestAge': !isNullOrUndefined(source.youngestAge) ? (source.youngestAge) : null,
      'oldestAge': !isNullOrUndefined(source.oldestAge) ? (source.oldestAge) : null,
      'raceID': !isNullOrUndefined(source.raceID) ? (source.raceID.raceID) : null,
      'genderGroupID': !isNullOrUndefined(source.genderGroupID) ? (source.genderGroupID.genderGroupID) : null,
      'capacity': !isNullOrUndefined(source.capacity) ? (source.capacity) : null,
      'ageIsFlexible': !isNullOrUndefined(source.ageIsFlexible) ? (source.ageIsFlexible) : null,
      'genderIsFlexible': !isNullOrUndefined(source.genderIsFlexible) ? (source.genderIsFlexible) : null,
      'providerID': parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey(),
      'onHoldCapacity': !isNullOrUndefined(source.onHoldCapacity) ? (source.onHoldCapacity) : null,
      'willTakeRespite': !isNullOrUndefined(source.willTakeRespite) ? (source.willTakeRespite) : null,
      'raceIsFlexible': !isNullOrUndefined(source.raceIsFlexible) ? (source.raceIsFlexible) : null,
      'respiteOnly': !isNullOrUndefined(source.respiteOnly) ? (source.respiteOnly) : null,
      'notes': !isNullOrUndefined(source.notes) ? (source.notes) : null,
    };
    if (this._router.url === '/provider/opencard/provider-preferences/detail') {
      req['providerPreferenceID'] = parseInt(localStorage.getItem('providerPreferenceID')) - this._opencard.getHasKey();
    }
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._provider.saveProviderPreference(req).then((data) => {
      loader.style.display = 'none';
      this._router.navigate(['/provider/opencard/provider-preferences/view']);
    });
  }
  update(source: ProviderPreferences) {
    let req;
    if (this._router.url === '/provider/opencard/provider-preferences/detail') {
      req['providerPreferenceID'] = parseInt(localStorage.getItem('providerPreferenceID')) - this._opencard.getHasKey();
    }
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._provider.updateProviderPreference(req).then((data) => {
      loader.style.display = 'none';
      this._router.navigate(['/provider/opencard/provider-preferences/view']);
    });
  }

  editForm() {
    this.preference.enable();
    this.isEdit = false;
  }
  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'race':
        obj = 'race';
        break;
      case 'genderGroup':
        obj = 'genderGroup';
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.metaData = data.dropDown;
    });
  }
  formValidation() {
    this.preference = this._fb.group({
      youngestAge: [null],
      oldestAge: [null],
      raceID: [null],
      genderGroupID: [null],
      capacity: [null],
      ageIsFlexible: [null],
      raceIsFlexible: [null],
      genderIsFlexible: [null],
      respiteOnly: [null],
      willTakeRespite: [null],
      onHoldCapacity: [null],
      notes: [null],
    });
  }
  getProviderPreference() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const req = { 'providerPreferenceID': parseInt(localStorage.getItem('providerPreferenceID')) - this._opencard.getHasKey() };
    this.req = req;
    this._provider.providerPreferenceGetById(req).then((data) => {
      if (data.providerPreference.onHoldCapacity === null) {
        data.providerPreference.onHoldCapacity = 0;
      }
      this.pref = data.providerPreference;
      this.preference.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.providerPreference.changedBy) ? data.providerPreference.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.providerPreference.changedDate) ? moment(data.providerPreference.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.providerPreference.enteredBy) ? data.providerPreference.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.providerPreference.enteredDate) ? moment(data.providerPreference.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      loader.style.display = 'none';
    });
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/provider/opencard/provider-preferences/detail') {
      this.url = '/reports/attachment-document/providers/preference';
    }
    return this._router.navigate([this.url])
  }
}
