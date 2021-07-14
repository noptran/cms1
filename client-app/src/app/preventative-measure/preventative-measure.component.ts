import { Component, OnInit } from '@angular/core';
import { PreventativeMeasurements } from './preventative-measurements';
import { CaseTeamService } from '../case-team/case-team.service';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClildFormService } from '../child-forms/child-forms.service';
import * as moment from 'moment';

@Component({
  selector: 'app-preventative-measure',
  templateUrl: './preventative-measure.component.html',
  styleUrls: ['./preventative-measure.component.scss']
})
export class PreventativeMeasureComponent implements OnInit {
  pm: PreventativeMeasurements = new PreventativeMeasurements();
  metaData: any;
  orgForm: FormGroup;
  quickMenu = "client";
  breadcurmbs = [];
  discardTo = '/reports/preventative-measurements/view';
  isEdit = false;
  url: any;
  isAttachmentRequired = false;
  req = {};
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _caseTeam: CaseTeamService, public _opencard: OpencardsService, public _router: Router, public formBuilder: FormBuilder, public _client: ClildFormService) { }

  ngOnInit() {
    this.formValidation();
    if (this._router.url == '/reports/preventative-measurements/detail') {
      this.getById();
      this.isAttachmentRequired = true;
    }
    this.breadcurmbs = [
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Preventative Measures List', href: '/reports/preventative-measurements/view', active: '' },
      { label: 'Preventative Measures', active: 'active' },
    ]
  }
  formActions(source: any) {
    if (this.orgForm.valid) {
      source.beginDate = !isNullOrUndefined(source.beginDate) ? Date.parse(source.beginDate) : null;
      source.endDate = !isNullOrUndefined(source.endDate) ? Date.parse(source.endDate) : null;
      source.preventativeMeasureID = !isNullOrUndefined(source.preventativeMeasureID) ? source.preventativeMeasureID.preventativeMeasureID : null;
      const encryptClientID = localStorage.getItem('clientId');
      const hasKey = this._opencard.getHasKey();
      let clientId = parseInt(encryptClientID) - hasKey;
      source.clientID = clientId;
      if (source.clientPreventativeMeasureID) {
        this.update(source)
      } else {
        this.save(source)
      }
    }
    else {
      swal('Warning', 'Please fill the mandatory fields', 'warning');
    }

  }

  save(source) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.savePm(source).then(() => {
      loader.style.display = 'none';
      swal('Save', 'Preventative Measurements Save!', 'success');
      this._router.navigate(['/reports/preventative-measurements/view']);
    })
  }
  update(source) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updatePm(source).then(() => {
      loader.style.display = 'none';
      swal('Update', 'Preventative Measurements Udpate!', 'success');
      this._router.navigate(['/reports/preventative-measurements/view']);
    })
  }

  getRecById() {
  }

  getMetaData(event, label) {
    let req, reqObject;
    switch (label) {
      case 'preventativeMeasure':
        reqObject = 'preventativeMeasure';
        break;
    }
    req = { Object: reqObject, value: event.query }
    this._caseTeam.getSearchList(req).then((data) => {
      this.metaData = data.dropDown;
    })
  }

  formValidation() {

    this.orgForm = this.formBuilder.group({
      'preventativeMeasureID': [null, Validators.compose([Validators.required])],
      'notes': [null, Validators.compose([Validators.required])],
      'beginDate': [null],
      'endDate': [null],
    });
  }

  getById() {
    console.log("getById called in pm");
    this.req = { clientPreventativeMeasureID: this._client.getId() }
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.getByIdPm(this.req).then((data) => {
      console.log("data in pm is", data);
      if (data.clientPreventativeMeasure.isActive) {
        !isNullOrUndefined(data.clientPreventativeMeasure.beginDate) ? data.clientPreventativeMeasure.beginDate = moment(data.clientPreventativeMeasure.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientPreventativeMeasure.endDate) ? data.clientPreventativeMeasure.endDate = moment(data.clientPreventativeMeasure.endDate).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.clientPreventativeMeasure.beginDate) ? data.clientPreventativeMeasure.beginDate = moment.utc(data.clientPreventativeMeasure.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientPreventativeMeasure.endDate) ? data.clientPreventativeMeasure.endDate = moment.utc(data.clientPreventativeMeasure.endDate).format('MM/DD/YYYY HH:mm') : null;
      }
      this.pm = data.clientPreventativeMeasure;
      console.log("this.pm in getby id is", this.pm);
      this.orgForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.clientPreventativeMeasure.changedBy) ? data.clientPreventativeMeasure.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.clientPreventativeMeasure.changedDate) ? moment(data.clientPreventativeMeasure.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.clientPreventativeMeasure.enteredBy) ? data.clientPreventativeMeasure.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.clientPreventativeMeasure.enteredDate) ? moment(data.clientPreventativeMeasure.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      loader.style.display = 'none'
    })
  }

  editForm() {
    this.isEdit = false;
    this.orgForm.enable();
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reports/preventative-measurements/detail') {
      this.url = '/reports/attachment-document/client/preventive-measurements';
    }
    else {
      this.url = '/reports/attachment-document/client/preventive-measurements';
    }
    return this._router.navigate([this.url])
  }

}
