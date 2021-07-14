import { Component, OnInit } from '@angular/core';
import { OtherAgencyStaff } from './other-agency-staff';
import { isNullOrUndefined } from 'util';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { Router } from '@angular/router';
import { ProviderService } from '../../provider.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import * as moment from 'moment';


@Component({
  selector: 'app-other-agency-staff',
  templateUrl: './other-agency-staff.component.html',
  styleUrls: ['./other-agency-staff.component.scss']
})
export class OtherAgencyStaffComponent implements OnInit {
  oaStaff: OtherAgencyStaff = new OtherAgencyStaff();
  metaData = [];
  oaStaffForm: FormGroup;
  isNodeOpened = false;
  breadcrumbs = [];
  discardTo = '/provider/opencard/other-agency-staff/view';
  isEdit = false;
  isAttachmentRequired = false;
  url: any;
  selectedPersonType: string;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _router: Router, public _caseTeam: CaseTeamService,
    public _provider: ProviderService, public _fb: FormBuilder, public _opencard: OpencardsService, public _client: ClildFormService) { }

  ngOnInit() {
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Provider List', href: "/reports/provider/view", active: '' },
      { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Demographics and supports', active: '', href: '/provider/dashboard/demographics-support' },
      { label: 'Other Agency Staff List', active: '', href: '/provider/opencard/other-agency-staff/view' },
      { label: 'Satff', active: 'active' }
    )
    this.formValidation()
    if (this._router.url === '/provider/opencard/other-agency-staff/detail') {
      this.isAttachmentRequired = true;
      this.getRecByID();
    }
  }

  formAction(source: any) {

    !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
    !isNullOrUndefined(source.personTypeID) ? source.personTypeID = source.personTypeID.personTypeID : null;
    !isNullOrUndefined(source.staffID) ? source.staffID = source.staffID.otherAgencyStaffID : null;
    source.providerID = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
    !isNullOrUndefined(source.providerOtherAgencyStaffID) ? this.update(source) : this.save(source);
  }


  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.saveOtherAgencyStaff(source).then(() => {
      loader.style.display = 'none';
      this._router.navigate(['/provider/opencard/other-agency-staff/view']);
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.updateOtherAgencyStaff(source).then(() => {
      loader.style.display = 'none';
      this._router.navigate(['/provider/opencard/other-agency-staff/view']);
    })
  }

  editForm() {
    this.isEdit = true;
    this.oaStaffForm.enable();
  }

  formValidation() {
    this.oaStaffForm = this._fb.group({
      personType: [null],
      staff: [null],
      beginDate: [null],
      endDate: [null],
      notes: [null]
    })
  }

  getRecByID() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { providerOtherAgencyStaffID: this._client.getId() };
    this.req = req;
    this._provider.getByIdOtherAgencyStaff(req).then((data: any) => {
      loader.style.display = 'none';
      this.oaStaffForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.ProviderOtherAgencyStaff.changedBy) ? data.ProviderOtherAgencyStaff.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.ProviderOtherAgencyStaff.changedDate) ? moment(data.ProviderOtherAgencyStaff.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.ProviderOtherAgencyStaff.enteredBy) ? data.ProviderOtherAgencyStaff.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.ProviderOtherAgencyStaff.enteredDate) ? moment(data.ProviderOtherAgencyStaff.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


      !isNullOrUndefined(data.ProviderOtherAgencyStaff.staffID) ? this.oaStaff.staffID = {
        staffName: `${data.ProviderOtherAgencyStaff.staffID.lastName} ${data.ProviderOtherAgencyStaff.staffID.firstName}
     ( ${!isNullOrUndefined(data.ProviderOtherAgencyStaff.staffID.email) ? data.ProviderOtherAgencyStaff.staffID.email : 'Not provided!'})`
      } : null;
      !isNullOrUndefined(data.ProviderOtherAgencyStaff.beginDate) ? this.oaStaff.beginDate = new Date(data.ProviderOtherAgencyStaff.beginDate) : null;
      !isNullOrUndefined(data.ProviderOtherAgencyStaff.endDate) ? this.oaStaff.endDate = new Date(data.ProviderOtherAgencyStaff.endDate) : null;
      !isNullOrUndefined(data.ProviderOtherAgencyStaff.personTypeID) ? this.oaStaff.personTypeID = data.ProviderOtherAgencyStaff.personTypeID : null;
      !isNullOrUndefined(data.ProviderOtherAgencyStaff.providerOtherAgencyStaffID) ? this.oaStaff.providerOtherAgencyStaffID = data.ProviderOtherAgencyStaff.providerOtherAgencyStaffID : null;
      !isNullOrUndefined(data.ProviderOtherAgencyStaff.notes) ? this.oaStaff.notes = data.ProviderOtherAgencyStaff.notes : null;
    })
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/provider/opencard/other-agency-staff/detail') {
      this.url = '/reports/attachment-document/providers/other-agency-staff';
    }
    return this._router.navigate([this.url])
  }

  onSelectPerosnType(event) {
    switch (event.personTypeID) {
      case 110:
        this.selectedPersonType = 'otherAgencyStaff';
    }
  }

  async filterOtherAgencyStaffPersonType(event: any) {
    let response = await this._opencard.getOtherAgencyStaffPersonType();
    this.metaData = response.filter(item => item.personType.toLowerCase().indexOf(event.query) !== -1);
  }

  async filterOtherAgencyStaff(event: any) {
    let response = await this._opencard.getOtherAgencyStaffStaff();
    this.metaData = response.filter(item => item.staffName.toLowerCase().indexOf(event.query) !== -1)
  }
}
