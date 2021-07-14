import { Component, OnInit } from '@angular/core';
import { Status } from './status';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { ProviderService } from '../../provider.service';
import swal from 'sweetalert2';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import * as moment from 'moment';
import {LocalValues} from '../../../local-values';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  status: Status = new Status();
  breadcrumbs = [];
  metaData: any;
  statusForm: FormGroup;
  discardTo = '/provider/opencard/status/view';
  isEdit = false;
  isAttachmentRequired = false;
  url: any;
  req: any;
  isFooterVisible = false;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: '',
  };
  isFormLog = false;
  isNonActive = false;
  newForm = false;
  isEditForm = false;


  constructor(public _localValues: LocalValues, public _router: Router, public _fb: FormBuilder,
    public _caseTeam: CaseTeamService, public _provider: ProviderService,
    public _client: ClildFormService, public _openCard: OpencardsService) { }

  ngOnInit() {
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider List', href: '/reports/provider/view', active: '' },
      { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Demographics and supports', active: '', href: '/provider/dashboard/demographics-support' },
      { label: 'Provider Status List', active: '', href: '/provider/opencard/status/view' },
      { label: 'Provider Status', active: 'active', href: '' }
    );
    this.formValidation();
    if (this._router.url === '/provider/opencard/status/detail') {
      this.isEditForm = true;
      this.isAttachmentRequired = true;
      this.getRecById();
    }
    if (this._router.url.includes('new')) {
      this.isFooterVisible = true;
      this.newForm = true;
    }
  }

  formValidation() {
    this.statusForm = this._fb.group({
      'providerStatusTypeID': new FormControl('', Validators.compose([Validators.required])),
      'beginDate': new FormControl('', Validators.compose([Validators.required])),
      'endDate': [null],
      'notes': [null],
      'reasonOnHoldID': [null],
    });
  }

  formAction(source: Status) {
    if (this.statusForm.valid) {
    // !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
    // !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;

    !isNullOrUndefined(source.beginDate) ? source.beginDate = this._localValues.stringFormatDatetime(Date.parse(source.beginDate)) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = this._localValues.stringFormatDatetime(Date.parse(source.endDate)) : null;


    !isNullOrUndefined(source.providerStatusTypeID) ? source.providerStatusTypeID = source.providerStatusTypeID.providerStatusTypeID : null;
    !isNullOrUndefined(source.reasonOnHoldID) ? source.reasonOnHoldID = source.reasonOnHoldID.reasonOnHoldID : null;
    source.providerID = parseInt(localStorage.getItem('providerID')) - this._openCard.getHasKey();
    !isNullOrUndefined(source.providerStatusID) ? this.update(source) : this.save(source);
    } else {
      swal("Warning", "Please fill the mandatory fields", "info");
    }
  }

  save(source: Status) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._provider.saveProviderStatus(source).then((data) => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        swal('Success', 'Provider status has been created!', 'success');
        this._router.navigate(['/provider/opencard/status/view']);
      } else {
        swal('Info', `${data.responseMessage}`, 'info');
        this.status = new Status();
      }
    });
  }

  update(source: Status) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._provider.updateProviderStatus(source).then((data) => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        swal('Success', 'Provider status has been created!', 'success');
        this._router.navigate(['/provider/opencard/status/view']);
      } else {
        swal('Info', `${data.responseMessage}`, 'info');
      }
    });
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'status':
        obj = 'statusType';
        break;
      case 'reasonOnHold':
        obj = 'reasonOnHold';
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.metaData = data.dropDown;
    });
  }

  getStatusData(event: any, label: any) {
    switch (label) {
      case 'status':
        this._caseTeam.getProviderStatusType().then((data: any) => {
          this.metaData = data.statusTypes;
        });
        break;

    }
  }

  getRecById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const req = { providerStatusID: this._client.getId() };
    this.req = req;
    this.isFooterVisible = true;
    this._provider.getByIdProviderStatus(req).then((data: any) => {
      loader.style.display = 'none';
      !isNullOrUndefined(data.ProviderStatus.beginDate) ? data.ProviderStatus.beginDate = new Date(data.ProviderStatus.beginDate) : null;
      !isNullOrUndefined(data.ProviderStatus.endDate) ? data.ProviderStatus.endDate = new Date(data.ProviderStatus.endDate) : null;
      if (data.ProviderStatus.endDate === null) {
        this.isNonActive = true;
      } 
      this.status = data.ProviderStatus;
      this.statusForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.ProviderStatus.changedBy) ? data.ProviderStatus.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.ProviderStatus.changedDate) ? moment(data.ProviderStatus.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.ProviderStatus.enteredBy) ? data.ProviderStatus.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.ProviderStatus.enteredDate) ? moment(data.ProviderStatus.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    });
  }

  editForm() {
    this.statusForm.enable();
    this.isEdit = false;
  }

  navigateTo() {
    const currentURL = this._router.url;
    if (currentURL == '/provider/opencard/status/detail') {
      this.url = '/reports/attachment-document/providers/status';
    }
    return this._router.navigate([this.url]);
  }

}
