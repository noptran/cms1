import { Component, OnInit } from '@angular/core';
import { Sponsor } from './sponsor';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { ProviderService } from '../../provider.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {
  sponsor: Sponsor = new Sponsor();
  providerSponsor: FormGroup;
  isEdit = false;
  metaData = [];
  breadcrumbs = [];
  discardTo = '/provider/opencard/sponsor/view';
  isAttachmentRequired = false;
  url: any;
  providerSponsorList = [];
  providerClosureReasonList = [];
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _client: ClildFormService, public _router: Router, public _opencard: OpencardsService,
    public _fb: FormBuilder, public _caseTeam: CaseTeamService, public _provider: ProviderService) { }

  ngOnInit() {
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider List', href: '/reports/provider/view', active: '' },
      { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'License and sponsorship ', active: '', href: '/provider/dashboard/license-sponsorship' },
      { label: 'Sponsor List', active: '', href: '/provider/opencard/sponsor/view' },
      { label: 'Sponsor', active: 'active' }
    );
    this.formValidation();
    if (this._router.url === '/provider/opencard/sponsor/detail') {
      this.isAttachmentRequired = true;
      this.getProviderSponsorDetails();
    }
    this.getProviderSponsorList();
    this.getProviderClosureList();
  }

  save(source: Sponsor) {
    if (this._router.url === '/provider/opencard/sponsor/new') {
    const req = {
      'beginDate': !isNullOrUndefined(source.beginDate) ? Date.parse(source.beginDate) : null,
      'endDate': !isNullOrUndefined(source.endDate) ? Date.parse(source.endDate) : null,
      'notes': !isNullOrUndefined(source.notes) ? source.notes : null,
      'closureReasonID': !isNullOrUndefined(source.closureReasonID) ? source.closureReasonID.closureReasonID : null,
      'sponsorID': !isNullOrUndefined(source.sponsorID) ? source.sponsorID.sponsorID : null,
      'providerID': parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey()
    };
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    if (this.providerSponsor.valid) {
      this._provider.saveProviderSponsor(req).then((data) => {
        loader.style.display = 'none';
        this._router.navigate(['/provider/opencard/sponsor/view']);
      });
    } else {
      swal('Invalid', 'Mandatory fields are missing', 'info')
      return loader.style.display = 'none';
    }
  }
    if (this._router.url === '/provider/opencard/sponsor/detail') {
      const req = {
        'beginDate': !isNullOrUndefined(source.beginDate) ? Date.parse(source.beginDate) : null,
        'endDate': !isNullOrUndefined(source.endDate) ? Date.parse(source.endDate) : null,
        'notes': !isNullOrUndefined(source.notes) ? source.notes : null,
        'closureReasonID': !isNullOrUndefined(source.closureReasonID) ? source.closureReasonID.closureReasonID : null,
        'sponsorID': !isNullOrUndefined(source.sponsorID) ? source.sponsorID.sponsorID : null,
        'providerID': parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey(),
        'providerSponsorID': parseInt(localStorage.getItem('providerSponsorID')) - this._opencard.getHasKey(),
      };
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
        this._provider.updateProviderSponsor(req).then((data) => {
          loader.style.display = 'none';
          this._router.navigate(['/provider/opencard/sponsor/view']);
        });
    }
  }

  getProviderSponsorDetails() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const req = { 'providerSponsorID': parseInt(localStorage.getItem('providerSponsorID')) - this._opencard.getHasKey() };
    this.req = req;
    this._provider.getProviderSponsor(req).then((data) => {
      !isNullOrUndefined(data.providerSponsor.beginDate) ? data.providerSponsor.beginDate = new Date(data.providerSponsor.beginDate) : null;
      !isNullOrUndefined(data.providerSponsor.endDate) ? data.providerSponsor.endDate = new Date(data.providerSponsor.endDate) : null;
      this.sponsor = data.providerSponsor;
      this.providerSponsor.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.providerSponsor.changedBy) ? data.providerSponsor.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.providerSponsor.changedDate) ? moment(data.providerSponsor.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.providerSponsor.enteredBy) ? data.providerSponsor.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.providerSponsor.enteredDate) ? moment(data.providerSponsor.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      loader.style.display = 'none';
    });
  }
  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'sponsor':
        obj = 'sponsorName';
        break;
      case 'closureReason':
        obj = 'closureReason';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.metaData = data.dropDown;
    });
  }
  formValidation() {
    this.providerSponsor = this._fb.group({
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      closureReasonID: [null],
      notes: [null],
      sponsorID: [null, Validators.compose([Validators.required])]
    });
  }
  editForm() {
    this.providerSponsor.enable();
    this.isEdit = false;
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/provider/opencard/sponsor/detail') {
      this.url = '/reports/attachment-document/providers/sponsor';
    }
    return this._router.navigate([this.url])
  }

  getProviderSponsorList() {
    let req = { value: '' }
    this._opencard.getProviderSponsorList(req).then((data: any) => { this.providerSponsorList = data.dropDown });
  }

  filteredProviderSponsor(event: any) {
    let req = { value: event.query }
    this._opencard.getProviderSponsorList(req).then((data: any) => {
      this.providerSponsorList = data.dropDown;
      this.metaData = this.providerSponsorList;
    });

    // this.metaData = this.providerSponsorList.filter((item: any) => { return item.sponsorName.toLowerCase().indexOf(event.query) !== -1 });
  }

  getProviderClosureList() {
    let req = { value: '' }
    this._opencard.getProviderponsorClosureReason(req).then((data: any) => { this.providerClosureReasonList = data.dropDown });
  }

  filteredProviderClosureList(event: any) {
    this.metaData = this.providerClosureReasonList.filter((item: any) => { return item.closureReason.toLowerCase().indexOf(event.query) !== -1 });
  }
}
