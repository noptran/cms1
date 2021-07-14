import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Immunization } from './immunization';
import { Router } from '@angular/router';
import { ClildFormService } from '../child-forms/child-forms.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';
import {LocalValues} from '../local-values';

@Component({
  selector: 'app-immunization',
  templateUrl: './immunization.component.html',
  styleUrls: ['./immunization.component.scss']
})
export class ImmunizationComponent implements OnInit {
  immunizationForm: FormGroup;
  immunization: Immunization = new Immunization();
  breadcrumbs = [];
  isEdit = false;
  quickMenu = "referrel";
  metaData = [];
  discardTo = '/reintegration/referral/opencard/immunization/view';
  isAttachmentRequired = false;
  req: any;
  referralID: number;
  isFormLog = false;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: ''
  }

  constructor(public _router: Router, public _caseTeam: CaseTeamService, public _client: ClildFormService,
    public _opencard: OpencardsService, public _fb: FormBuilder, public _localValues: LocalValues) { }

  ngOnInit() {
    this.referralID = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    if (this._router.url === '/reintegration/referral/opencard/immunization/detail') {
      this.getById();
      this.isAttachmentRequired = true;
    }
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
      { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
      { label: 'Immunization List', active: '', href: '/reintegration/referral/opencard/immunization/view' },
      { label: 'Immunization', active: 'active' },

    );
    if (this.referralID === 17) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('healthRecord-JJFC', this.breadcrumbs)
    }
  }

  formValidation() {
    this.immunizationForm = this._fb.group({
      ageGroupType_MonthID: [null, Validators.compose([Validators.required])],
      completedDate: [null],
      nextDueDate: [null],
      followUpRequired: [null],
      notes: [null],
    });
    this.immunization.completedDate = new Date();
    this.immunization.nextDueDate = new Date();
  }

  formAction(source: any) {
    if (this.immunizationForm.valid) {
      !isNullOrUndefined(source.ageGroupType_MonthID) ? source.ageGroupType_MonthID = source.ageGroupType_MonthID.ageGroupType_MonthID : null;
      source.completedDate = this._localValues.stringFormatDatetime(Date.parse(source.completedDate))
      source.nextDueDate = this._localValues.stringFormatDatetime(Date.parse(source.nextDueDate))
      source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
      source.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
      !isNullOrUndefined(source.immunizationID) ? this.update(source) : this.save(source);
    } else {
      swal('Warning', 'Please fill the mandatory fields', 'warning');
    }
  }
  save(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.saveImmunization(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/immunization/view']);
    });
  }
  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.updateImmunization(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/immunization/view']);
    });
  }
  getById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.req = { immunizationID: this._client.getId() };
    this._opencard.getByIdImmunization(this.req).then((data: any) => {
      loader.style.display = 'none';
      if (data.immunization.isActive) {
        !isNullOrUndefined(data.immunization.completedDate) ? data.immunization.completedDate = moment(data.immunization.completedDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.immunization.nextDueDate) ? data.immunization.nextDueDate = moment(data.immunization.nextDueDate).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.immunization.completedDate) ? data.immunization.completedDate = moment.utc(data.immunization.completedDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.immunization.nextDueDate) ? data.immunization.nextDueDate = moment.utc(data.immunization.nextDueDate).format('MM/DD/YYYY HH:mm') : null;
      }

      this.immunization = data.immunization;
      this.immunizationForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.immunization.changedBy) ? data.immunization.changedBy : '------';
    this.formLogInfo.changedDate = !isNullOrUndefined(data.immunization.changedDate) ? moment(data.immunization.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
    this.formLogInfo.enteredBy = !isNullOrUndefined(data.immunization.enteredBy) ? data.immunization.enteredBy : '------';
    this.formLogInfo.enteredDate = !isNullOrUndefined(data.immunization.enteredDate) ? moment(data.immunization.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    });
  }
  editForm() {
    this.immunizationForm.enable();
    this.isEdit = false;
  }
  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'ageGroupType':
        obj = 'ageGroupType';
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.metaData = data.dropDown;
    });
  }

  navigateToCMS() {
    let currentURL = this._router.url, navigateURL: any;
    if (currentURL == '/reintegration/referral/opencard/immunization/detail') {
      navigateURL = '/reports/attachment-document/rfc/immunization';
    }
    else {
      navigateURL = '/reports/attachment-document/immunization';
    }
    return this._router.navigate([navigateURL])
  }

}
