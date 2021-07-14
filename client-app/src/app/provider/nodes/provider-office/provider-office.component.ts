import { Component, OnInit } from '@angular/core';
import { ProviderOffice } from './provider-office';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { ProviderService } from '../../provider.service';
import swal from 'sweetalert2';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import * as moment from 'moment';


@Component({
  selector: 'app-provider-office',
  templateUrl: './provider-office.component.html',
  styleUrls: ['./provider-office.component.scss']
})
export class ProviderOfficeComponent implements OnInit {
  office: ProviderOffice = new ProviderOffice();
  isContinueForm = true;
  breadcrumbs = [];
  officeList = [];
  isNodeOpened = false;
  discardTo = '/provider/opencard/office/view';
  officeForm: FormGroup;
  isEdit = false;
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

  constructor(public _router: Router, public _caseTeam: CaseTeamService, public _provider: ProviderService,
    public _client: ClildFormService, public _fb: FormBuilder, public _openCard: OpencardsService) { }

  ngOnInit() {
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Provider List', href: "/reports/provider/view", active: '' },
      { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Demographics and supports', active: '', href: '/provider/dashboard/demographics-support' },
      { label: 'Office List', active: '', href: '/provider/opencard/office/view' },
      { label: 'Office', active: 'active' },
    )
    if (this._router.url === '/provider/opencard/office/detail') {
      this.isAttachmentRequired = true;
      this.getRecById();
    }
    this.formValidation();
  }

  formAction(source: any) {
    !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
    !isNullOrUndefined(source.sfaofficeID) ? source.sfaofficeID = source.sfaofficeID.sfaofficeID : null;
    source.providerID = parseInt(localStorage.getItem('providerID')) - this._openCard.getHasKey();
    !isNullOrUndefined(source.sfaofficeActivityID) ? this.update(source) : this.save(source);
  }

  save(source: ProviderOffice) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.saveOffice(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/provider/opencard/office/view'])
    })
  }

  update(source: ProviderOffice) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.updateOffice(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this._router.navigate(['/provider/opencard/office/view'])
    })
  }

  getSFMOffice(event: any) {
    let req = { Object: 'sfcsOffice', value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.officeList = data.dropDown;
    })
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { sfaofficeActivityID: this._client.getId() };
    this.req = req;
    this._provider.getByIdOffice(req).then((data: any) => {
      loader.style.display = 'none';
      !isNullOrUndefined(data.sfcsOfficeActivity.beginDate) ? data.sfcsOfficeActivity.beginDate = new Date(data.sfcsOfficeActivity.beginDate) : null;
      !isNullOrUndefined(data.sfcsOfficeActivity.endDate) ? data.sfcsOfficeActivity.endDate = new Date(data.sfcsOfficeActivity.endDate) : null;
      this.officeForm.disable();
      this.isEdit = true;
      this.office = data.sfcsOfficeActivity;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.sfcsOfficeActivity.changedBy) ? data.sfcsOfficeActivity.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.sfcsOfficeActivity.changedDate) ? moment(data.sfcsOfficeActivity.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.sfcsOfficeActivity.enteredBy) ? data.sfcsOfficeActivity.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.sfcsOfficeActivity.enteredDate) ? moment(data.sfcsOfficeActivity.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  formValidation() {
    this.officeForm = this._fb.group({
      sfmOffice: [null, Validators.compose([Validators.required])],
      beginDate: [null],
      endDate: [null],
      notes: [null]
    })
  }

  editForm() {
    this.isEdit = false;
    this.officeForm.enable();
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/provider/opencard/office/detail') {
      this.url = '/reports/attachment-document/providers/office';
    }
    return this._router.navigate([this.url])
  }

}
