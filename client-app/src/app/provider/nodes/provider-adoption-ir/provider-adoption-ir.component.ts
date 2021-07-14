import { Component, OnInit } from '@angular/core';
import { IdentifierResource } from './identifierResource';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ProviderService } from '../../provider.service';
import swal from 'sweetalert2';
import { ClildFormService } from '../../../child-forms/child-forms.service';

@Component({
  selector: 'app-provider-adoption-ir',
  templateUrl: './provider-adoption-ir.component.html',
  styleUrls: ['./provider-adoption-ir.component.scss']
})
export class ProviderAdoptionIRComponent implements OnInit {

  IR: IdentifierResource = new IdentifierResource();
  identifierResource: FormGroup;
  breadcrumbs = [];
  results = [];
  discardTo = '/provider/opencard/adoption/identifierResource/view';
  isEdit = false;
  url: any;
  isDisabled = true;
  referralID: any;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  constructor(public _router: Router, public _caseTeam: CaseTeamService,
    public _opencard: OpencardsService, public _fb: FormBuilder,
    public _provider: ProviderService, public _client: ClildFormService) { }

  ngOnInit() {
    this.formValidation();
    this.getIdentifiedResourceType();
    this.breadcrumbs.push(
      { label: 'Provider List', href: '/reports/provider/view', active: '' },
      { label: 'provider Form', href: '/reports/provider/detail', active: '' },
      { label: 'Provider Dashboard', href: '/provider/dashboard', active: '' },
      { label: 'Adoption List', href: '/provider/opencard/adoption/view', active: '' },
      { label: 'Adoption Form', href: '/provider/opencard/adoption/detail', active: '' },
      { label: 'Adoption Menu', href: '/provider/dashboard/adoption/subnode', active: '' },
      { label: 'Identified Resource List', href: '/provider/opencard/adoption/identifierResource/view', active: '' },
      { label: 'Identified Resource', active: 'active' }
    );
    if (this._router.url === '/provider/opencard/adoption/IR/detail') {
      this.getIdentifierResource();
    }
  }

  formAction(source: IdentifierResource) {
    if (this.identifierResource.valid) {
      const req = {
        'referralID': !isNullOrUndefined(source.clientID) ?
          source.clientID.referralID : null,
        'providerID': parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey(),
        'beginDate': !isNullOrUndefined(source.beginDate) ? Date.parse(source.beginDate) : null,
        'endDate': !isNullOrUndefined(source.endDate) ? Date.parse(source.endDate) : null,
        'identifiedResourceTypeID': !isNullOrUndefined(source.identifiedResourceTypeID) ?
          source.identifiedResourceTypeID.identifiedResourceTypeID : null,
        'notes': !isNullOrUndefined(source.notes) ? source.notes : null,
      };
      if (this._router.url === '/provider/opencard/adoption/IR/detail') {
        req['identifiedResourceID'] = parseInt(localStorage.getItem('identifiedResourceID'));
        req['referralID'] = parseInt(localStorage.getItem('identifiedResourceReferralID'));
        this.save(req);
      } else {
        this.save(req);
      }
    } else {
      swal('Warning', 'Required fields are missing!', 'info')
    }
  }

  save(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._provider.saveProviderIR(source).then(() => {
      loader.style.display = 'none';
      this._router.navigate(['/provider/opencard/adoption/identifierResource/view']);
    });
  }

  getIdentifierResource() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const id = parseInt(this._client.getId());
    this.req = { identifiedResourceID: id };
    this._provider.getProviderIR(this.req).then((data: any) => {
      !isNullOrUndefined(data.identifiedResource.beginDate) ? data.identifiedResource.beginDate =
        moment.utc(data.identifiedResource.beginDate).format('MM/DD/YYYY') : null;
      !isNullOrUndefined(data.identifiedResource.endDate) ? data.identifiedResource.endDate =
        moment.utc(data.identifiedResource.endDate).format('MM/DD/YYYY') : null;
      !isNullOrUndefined(data.identifiedResource.referralID) ?
        !isNullOrUndefined(data.identifiedResource.referralID.caseID) ?
          data.identifiedResource.clientID = { 'clientName': data.identifiedResource.referralID.caseID.clientID.clientNameLastFirst }
          : null : null;
      this.IR = data.identifiedResource;
      this.identifierResource.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.identifiedResource.changedBy) ? data.identifiedResource.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.identifiedResource.changedDate) ? moment(data.identifiedResource.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.identifiedResource.enteredBy) ? data.identifiedResource.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.identifiedResource.enteredDate) ? moment(data.identifiedResource.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      loader.style.display = 'none';
    });
  }
  getIdentifiedResourceType() {
    let req;
    req = { 'Object': 'identifiedResourceType', 'value': '' };
    return this._caseTeam.getSearchList(req).then((data) => {
      data.dropDown.map((item) => {
        if (item.identifiedResourceTypeID === 2) {
          this.IR.identifiedResourceTypeID = item;
        }
      });
      this.results = data.dropDown;
    });
  }
  getClient(event) {
    let req;
    req = { 'Object': 'clientIdentifiedResource', 'value': event.query };
    return this._caseTeam.getSearchList(req).then((data) => {
      this.results = data.dropDown;
    });
  }
  formValidation() {
    this.identifierResource = this._fb.group({
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      notes: [null],
      clientID: [null, Validators.compose([Validators.required])],
      identifiedResourceTypeID: [{ disabled: true }]
    });
  }
  editForm() {
    this.identifierResource.enable();
    this.isEdit = false;
    this.identifierResource.get('identifiedResourceTypeID').disable({ onlySelf: true });
  }
  getReferralId(event) {
    if (!isNullOrUndefined(event.referralID)) {
      this.referralID = event.referralID;
    }
  }

  async filteredClients(event: any) {
    let request = { value: event.query, beginPagination: 1, endPagination: 50, sort: { column: "ClientName", mode: "asc" } }
    let response = await this._opencard.getProivderIRClientList(request);
    this.results = response.filter((item: any) => { return item.clientName.toLowerCase().indexOf(event.query) !== -1 })
  }
}
