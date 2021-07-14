import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CaseTeamService } from './../case-team/case-team.service'
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { SfcsOffice } from './sfcs-office';
import { ClildFormService } from '../child-forms/child-forms.service';
import * as  moment from 'moment';
import {LocalValues} from '../local-values';

@Component({
  selector: 'app-sfcs-officer',
  templateUrl: './sfcs-officer.component.html',
  styleUrls: ['./sfcs-officer.component.scss', '../case-team/case-team.component.scss']
})
export class SfcsOfficerComponent implements OnInit {
  subtitle: any;
  formControl: any;
  editControll: boolean;
  Data;
  orgForm: FormGroup;
  quickMenu = "referrel";
  SfcsOfficer = [];
  SfcsOfficerType = [];
  showForm = false;
  caseTeamId;
  newForm = false;
  sfaofficeActivityID;
  SfaofficeData = [];
  SfaofficeTypeData = [];
  title = 'SFCS Office Activity';
  status = 'draft';
  breadcrumbs = [];
  results;
  edit;
  formStatus = 'draft';
  sfcs: SfcsOffice = new SfcsOffice();
  referralTypeId: any;
  discardTo = '/reintegration/referral/opencard/sfcs-office/view';
  url: any;
  isAttachmentRequired = false;
  req: any;
  isFormLog = false;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: ''
  }


  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public _CaseTeam: CaseTeamService,
    public _opencard: OpencardsService,
    public _client: ClildFormService,
    public _localValues: LocalValues) { }

  ngOnInit() {
    this.formControl = false;
    this.editControll = false;
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reports/referral/family-preservation/detail", active: '' },
      { label: 'SFM Office List', href: "/reports/referral/family-preservation/sfcs-office/view", active: '' },
      { label: 'SFM Office Form', active: 'active' },
    );
    if (this.router.url.includes('sfcs-office/detail')) {
      this.getSfcsOfficerById();
      this.isAttachmentRequired = true;
    }
    let referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this._opencard.breadcurmbsDetermination('sfcs-office', referralTypeId, this.breadcrumbs);
    if (referralTypeId === 4) {
      this._localValues.breadcrumbsChanges('sfcsOffice-NCFCH', this.breadcrumbs)
    }
    if (referralTypeId === 7) {
      this._localValues.breadcrumbsChanges('sfcsOffice-NCRFC', this.breadcrumbs)
    }
    if (referralTypeId === 8) {
      this._localValues.breadcrumbsChanges('sfcsOffice-NCHS', this.breadcrumbs)
    }
    if (referralTypeId === 15) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
    }
    if (referralTypeId === 17) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('sfaOffice-JJFC', this.breadcrumbs)
    }
    if (referralTypeId === 11) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('sfcsOffice-NCMHR', this.breadcrumbs)
    }
    if (referralTypeId === 1) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('sfcsOffice-RFC', this.breadcrumbs)
    }
  }



  formValidation() {

    this.orgForm = this.formBuilder.group({
      'sfaofficeID': [null, Validators.compose([Validators.required])],
      'sfaofficeTypeID': [null, Validators.compose([Validators.required])],
      'beginDate': [null, Validators.compose([Validators.required])],
      'endDate': [null],
    });
  }

  getSfaoffice(event) {
    let req = {
      "Object": "sfcsOffice",
      "value": event.query
    }
    this._CaseTeam.getSearchList(req).then(data => {
      this.SfaofficeData = data.dropDown;
      this.results = data.dropDown;
    })
  }

  getSfaofficeType(event) {
    let req = {
      "Object": "sfcsOfficeType",
      "value": event.query
    }
    this._CaseTeam.getSearchList(req).then(data => {
      this.SfaofficeTypeData = data.dropDown;
      this.results = data.dropDown;
    })
  }

  goBack() {
    this.router.navigateByUrl('/reports/sfcsOfficer');
  }

  addPost(source) {
    if (this.orgForm.valid) {
      let referralId;
      referralId = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
      !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
      !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
      !isNullOrUndefined(source.sfaofficeTypeID) ? source.sfaofficeTypeID = source.sfaofficeTypeID.sfaofficeTypeID : null;
      !isNullOrUndefined(source.sfaofficeID) ? source.sfaofficeID = source.sfaofficeID.sfaOfficeID : null;
      source.referralID = referralId;
      this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();

      if (source.sfaofficeActivityID) {
        this.updateSfcsOfficer(source);
      } else {
        this.saveSfcsOfficer(source);
      }
    } else {
      swal('Warning', 'Please fill the mandatory fields', 'info')
    }

  }

  saveSfcsOfficer(post) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._CaseTeam.saveSfcsOfficer(post).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        this.sfcs = data.sfcsOfficeActivity
        swal('Success', 'Sfcs Office saved successfully', 'success')
        this.edit = true;
        this.editControll = true;
        this.orgForm.disable();
        return this.router.navigate(['/reintegration/referral/opencard/sfcs-office/view']);
      } else {
        swal('Info', `${data.responseMessage}`, 'info');
        this.sfcs = new SfcsOffice();
      }
    })
  }

  updateSfcsOfficer(post) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    loader.style.display = 'none';
    this._CaseTeam.updateSfcsOfficer(post).then(data => {
      if (data.responseStatus) {
        this.sfcs = data.sfcsOfficeActivity
        swal('Success', 'Sfcs Office saved successfully', 'success')
        loader.style.display = 'none';
        this.edit = true;
        this.orgForm.disable();
        return this.router.navigate(['/reintegration/referral/opencard/sfcs-office/view']);
      } else {
        swal('Info', `${data.responseMessage}`, 'info');
        this.sfcs = new SfcsOffice();
      }
    })
  }

  getSfcsOfficerById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { "sfaofficeActivityID": this._client.getId() };
    this._CaseTeam.getSfcsOfficerById(this.req).then(data => {
      if (data.sfcsOfficeActivity.isActive) {
        !isNullOrUndefined(data.sfcsOfficeActivity.beginDate) ? data.sfcsOfficeActivity.beginDate = moment(data.sfcsOfficeActivity.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.sfcsOfficeActivity.endDate) ? data.sfcsOfficeActivity.endDate = moment(data.sfcsOfficeActivity.endDate).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.sfcsOfficeActivity.beginDate) ? data.sfcsOfficeActivity.beginDate = moment.utc(data.sfcsOfficeActivity.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.sfcsOfficeActivity.endDate) ? data.sfcsOfficeActivity.endDate = moment.utc(data.sfcsOfficeActivity.endDate).format('MM/DD/YYYY HH:mm') : null;
      }
      loader.style.display = 'none';
      this.sfcs = data.sfcsOfficeActivity;
      this.editControll = true;
      this.orgForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.sfcsOfficeActivity.changedBy) ? data.sfcsOfficeActivity.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.sfcsOfficeActivity.changedDate) ? moment(data.sfcsOfficeActivity.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.sfcsOfficeActivity.enteredBy) ? data.sfcsOfficeActivity.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.sfcsOfficeActivity.enteredDate) ? moment(data.sfcsOfficeActivity.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.orgForm.enable();
    this.editControll = false;
  }

  /**
  * Get the metadata for dropdowns
  */
  getMetaData(event, label) {
    let metaDataObj, metaDataReq
    switch (label) {
      case 'office':
        metaDataObj = "sfcsOffice";
        break;
      case 'officeType':
        metaDataObj = "sfcsOfficeType";
        break;
    }
    if (metaDataObj) {
      metaDataReq = { Object: metaDataObj, value: event.query };
      if (label == 'office') {
        metaDataReq = { Object: metaDataObj, value: event.query, referralID: parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey() };
      }
      this._CaseTeam.getSearchList(metaDataReq).then(data => {
        this.results = data.dropDown;
      })
    }
  }

  navigateTo() {

    let currentURL = this.router.url;
    if (currentURL == '/reintegration/referral/opencard/sfcs-office/new' || currentURL == '/reintegration/referral/opencard/sfcs-office/detail') {
      this.url = '/reports/attachment-document/rfc/sfcs-office';
    }
    else {
      this.url = '/reports/attachment-document/sfcs-office';
    }
    return this.router.navigate([this.url])
  }

}
