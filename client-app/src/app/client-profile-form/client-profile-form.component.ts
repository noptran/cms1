import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CaseTeamService } from './../case-team/case-team.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ReferralViewService } from '../referral-view/referral-view.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { ClientProfile } from './client-profile';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import * as moment from 'moment';
import {LocalValues} from '../local-values';
@Component({
  selector: 'app-client-profile-form',
  templateUrl: './client-profile-form.component.html',
  styleUrls: ['./client-profile-form.component.scss']
})
export class ClientProfileFormComponent implements OnInit {

  orgForm: FormGroup;
  title = 'Client Profile';
  status = 'New';
  breadcrumbs = [];
  results;
  clientId: any;
  subtitle: any;
  clientName;
  formStatus: any;
  openCards: any;
  quickMenu = 'client';
  edit: any;
  clientProfile: ClientProfile = new ClientProfile();
  metadata = [];
  editCntrl = false;
  discardTo = '/reports/client/profile';
  url: any;
  isAttachmentRequired = false;
  req = {};
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: '',
  };
  isFormLog = false;

  constructor(public formBuilder: FormBuilder,
    public _router: Router,
    public _CaseTeamService: CaseTeamService,
    public _client: ClildFormService,
    public _opencard: OpencardsService,
    public _localValues: LocalValues) { }

  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Client', href: '/reports/client/details', active: '' },
      { label: 'Client Profile List', href: '/reports/client/profile', active: '' },
      { label: 'Client Profile', active: 'active' }
    );
    if (this._router.url == '/reports/client/profile/details') {
      this.getClientProfileDetails();
      this.isAttachmentRequired = true;
    }
  }

  /***
   * Validating the form fields
   */
  formValidation() {
    this.orgForm = this.formBuilder.group({
      'condition': [null, Validators.compose([Validators.required])],
      'beginDate': [null, Validators.compose([Validators.required])],
      'endDate': [null],
      'lastOccurrence': [null],
      'frequency_type': [null, Validators.compose([Validators.required])],
      'risk': [null, Validators.compose([Validators.required])],
      'note_any_injuries': [null],
      'be_protected': [null],
      'triggers': [null],
      'notificationDate': [null],
      'notes': [null, Validators.compose([Validators.required])]
    });
  }

  /**
   * Handling save and update request
   * @param post client profile records
   *
   */
  saveForm(post) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    if (this.orgForm.valid) {
      post.beginDate !== null && post.beginDate !== undefined ? post.beginDate = Date.parse(post.beginDate) : null;
      post.endDate !== null && post.endDate !== undefined ? post.endDate = Date.parse(post.endDate) : null;
      post.lastOccurrence = this._localValues.stringFormatDatetime(Date.parse(post.lastOccurrence));
      post.notificationDate = this._localValues.stringFormatDatetime(Date.parse(post.notificationDate));
      post.conditionID !== null && post.conditionID !== undefined ? post.conditionID = post.conditionID.conditionID : null;
      post.frequencyTypeID !== null && post.frequencyTypeID !== undefined ? post.frequencyTypeID = post.frequencyTypeID.frequencyTypeID : null;
      post.riskID !== null && post.riskID !== undefined ? post.riskID = post.riskID.riskID : null;
      post.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
      loader.style.display = 'block';
      if (post.clientProfileID) {
        this._CaseTeamService.updateClientProfile(post).then((data => {
          loader.style.display = 'none';
          if (data.responseStatus) {
            swal('Updated', 'Client profile updated!', 'success');
            this.editCntrl = true;
            this.orgForm.disable();
            this._router.navigate(['/reports/client/profile']);
          }
        }));

      } else {
        this._CaseTeamService.saveClientProfile(post).then(data => {
          loader.style.display = 'none';
          if (data.responseStatus) {
            swal('Saved', 'Client profile created!', 'success');
            this.editCntrl = true;
            this.orgForm.disable();
            this._router.navigate(['/reports/client/profile']);
          }
        });
      }
    } else {
      loader.style.display = 'none';
      return swal('Warning', 'Please fill the mandatory fields', 'warning');
    }

  }

  /**
   *
   * @param event Edit btn control
   */
  editForm() {
    this.orgForm.enable();
    this.editCntrl = false;
  }

  /**
   *
   * @param event autocomplete box event
   * @param label identification of the request object
   */
  getMetaData(event, label) {
    let reqObj: any, request: any;
    switch (label) {
      case 'condition':
        reqObj = 'condition';
        break;
      case 'frequency_type':
        reqObj = 'frequencyType';
        break;
      case 'risk':
        reqObj = 'risk';
        break;
    }
    request = { Object: reqObj, value: event.query };
    this._CaseTeamService.getSearchList(request).then((data) => {
      this.metadata = data.dropDown;
    });
  }

  /**
   * Get client record by id
   */
  getClientProfileDetails() {
    let clientData;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const recId = this._client.getId();
    this.req = { clientProfileID: recId };
    this._opencard.getClientProfileById(this.req).then((data) => {
      loader.style.display = 'none';
      this.orgForm.disable();
      this.editCntrl = true;

      if (data.clientProfile.isActive) {
        data.clientProfile.beginDate !== null && data.clientProfile.beginDate !== undefined ? data.clientProfile.beginDate = moment(data.clientProfile.beginDate).format('MM/DD/YYYY') : null;
        data.clientProfile.endDate !== null && data.clientProfile.endDate !== undefined ? data.clientProfile.endDate = moment(data.clientProfile.endDate).format('MM/DD/YYYY') : null;
        data.clientProfile.lastOccurrence !== null && data.clientProfile.lastOccurrence !== undefined ? data.clientProfile.lastOccurrence = moment(data.clientProfile.lastOccurrence).format('MM/DD/YYYY') : null;
        data.clientProfile.notificationDate !== null && data.clientProfile.notificationDate !== undefined ? data.clientProfile.notificationDate = moment(data.clientProfile.notificationDate).format('MM/DD/YYYY') : null;
      } else {
        data.clientProfile.beginDate !== null && data.clientProfile.beginDate !== undefined ? data.clientProfile.beginDate = moment.utc(data.clientProfile.beginDate).format('MM/DD/YYYY') : null;
        data.clientProfile.endDate !== null && data.clientProfile.endDate !== undefined ? data.clientProfile.endDate = moment.utc(data.clientProfile.endDate).format('MM/DD/YYYY') : null;
        data.clientProfile.lastOccurrence !== null && data.clientProfile.lastOccurrence !== undefined ? data.clientProfile.lastOccurrence = moment.utc(data.clientProfile.lastOccurrence).format('MM/DD/YYYY') : null;
        data.clientProfile.notificationDate !== null && data.clientProfile.notificationDate !== undefined ? data.clientProfile.notificationDate = moment.utc(data.clientProfile.notificationDate).format('MM/DD/YYYY') : null;
      }



      this.clientProfile = data.clientProfile;
      clientData = this.clientProfile.clientID;
      this.clientName = clientData.lastName + ' ' + clientData.firstName;
      this.subtitle = this.clientName;
      this.isFormLog = true;
      this.formLogInfo.changedBy = (data.clientProfile.changedBy) ? data.clientProfile.changedBy : '------';
      this.formLogInfo.changedDate = (data.clientProfile.changedDate) ? moment(data.clientProfile.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = (data.clientProfile.enteredBy) ? data.clientProfile.enteredBy : '------';
      this.formLogInfo.enteredDate = (data.clientProfile.enteredDate) ? moment(data.clientProfile.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    });

  }

  navigateTo() {
    const currentURL = this._router.url;
    if (currentURL == '/reports/client/profile/details') {
      this.url = '/reports/attachment-document/client/client-profiles';
    } else {
      this.url = '/reports/attachment-document/client/client-profiles';
    }
    return this._router.navigate([this.url]);
  }

}

