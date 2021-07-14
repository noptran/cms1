import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { KanBeHealthy } from './kan-be-healthy';
import { Router } from '@angular/router';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import {LocalValues} from '../local-values';
import * as moment from 'moment';



@Component({
  selector: 'app-kan-be-healthy',
  templateUrl: './kan-be-healthy.component.html',
  styleUrls: ['./kan-be-healthy.component.scss']
})
export class KanBeHealthyComponent implements OnInit {
  kanBeHealthyForm: FormGroup;
  kanBeHealthy: KanBeHealthy = new KanBeHealthy();
  breadcrumbs = [];
  quickMenu = "referrel";
  discardTo = '/reintegration/referral/opencard/kan-be-healthy/view';
  isEdit = false;
  healthTypes = [];
  filteredHelthTypes = [];
  isAttachmentRequired = false;
  req: any;
  referralTypeID: number;
  isFormLog = false;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: ''
  }

  constructor(public _router: Router, public _opencard: OpencardsService, public _fb: FormBuilder,
    public _client: ClildFormService, public _localValues: LocalValues) { }

  ngOnInit() {
    this.referralTypeID = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    if (this._router.url == '/reintegration/referral/opencard/kan-be-healthy/detail') {
      this.getById();
      this.isAttachmentRequired = true;
    }
    this.formValidation();
    this.getHealthTypes();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
      { label: 'Kan-Be-Healthy List', active: '', href: '/reintegration/referral/opencard/kan-be-healthy/view' },
      { label: 'Kan-Be-Healthy', active: 'active' },
    )
    if (this.referralTypeID === 17) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('kanBeHealthy-JJFC', this.breadcrumbs)
    }
  }

  formValidation() {
    this.kanBeHealthyForm = this._fb.group({
      KBHDate: [null],
      followUpRequired: [null],
      kanBeHealthyTypeID: [null],
      nextKBHDue: [null],
      notes: [null],
      height: [null],
      weight: [null],
    })
  }

  formAction(source: any) {
    source.kbhDate = this._localValues.stringFormatDatetime(Date.parse(source.kbhDate));
    source.nextKBHDue = this._localValues.stringFormatDatetime(Date.parse(source.nextKBHDue));
    !isNullOrUndefined(source.kanBeHealthyTypeID) ? source.kanBeHealthyTypeID = source.kanBeHealthyTypeID.kanBeHealthyTypeID : null;
    source.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    !isNullOrUndefined(source.kanBeHealthyID) ? this.update(source) : this.save(source);
  }

  save(source: any) {
    this._opencard.saveKanBeHealthy(source).then((data) => {
      swal('Save', 'Record has been saved!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/kan-be-healthy/view'])
    })
  }

  update(source: any) {
    this._opencard.updateKanBeHealthy(source).then((data) => {
      swal('Upadate', 'Record has been updated!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/kan-be-healthy/view'])
    })
  }

  getById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { kanBeHealthyID: this._client.getId() }
    this._opencard.getByIdKanBeHealthy(this.req).then((data) => {
      loader.style.display = 'none';
      data.kanBeHealthy.kbhDate = !isNullOrUndefined(data.kanBeHealthy.kbhDate) ? new Date(data.kanBeHealthy.kbhDate) : null;
      data.kanBeHealthy.nextKBHDue = !isNullOrUndefined(data.kanBeHealthy.nextKBHDue) ? new Date(data.kanBeHealthy.nextKBHDue) : null;
      this.kanBeHealthy = data.kanBeHealthy;
      this.kanBeHealthyForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.kanBeHealthy.changedBy) ? data.kanBeHealthy.changedBy : '------';
    this.formLogInfo.changedDate = !isNullOrUndefined(data.kanBeHealthy.changedDate) ? moment(data.kanBeHealthy.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
    this.formLogInfo.enteredBy = !isNullOrUndefined(data.kanBeHealthy.enteredBy) ? data.kanBeHealthy.enteredBy : '------';
    this.formLogInfo.enteredDate = !isNullOrUndefined(data.kanBeHealthy.enteredDate) ? moment(data.kanBeHealthy.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.kanBeHealthyForm.enable();
    this.isEdit = false;
  }

  getHealthTypes() {
    this.healthTypes = [];
    this._opencard.getKanBeHealthyTypes().then((data) => {
      this.healthTypes = data.kanBeHealthType;
    })
  }

  filteredHealthTypes(event) {
    this.filteredHelthTypes = [];
    this.healthTypes.filter((item) => {
      if (item.kanBeHealthyType.toLowerCase().indexOf(event.query) !== -1) {
        return this.filteredHelthTypes.push(item)
      }
    })
  }

  navigateToCMS() {
    let currentURL = this._router.url, navigateURL: any;
    if (currentURL == '/reintegration/referral/opencard/kan-be-healthy/detail') {
      navigateURL = '/reports/attachment-document/rfc/kan-be-healthy';
    }
    else {
      navigateURL = '/reports/attachment-document/kan-be-healthy';
    }
    return this._router.navigate([navigateURL])
  }

}
