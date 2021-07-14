import { Component, OnInit } from '@angular/core';
import { IdentifyResource, IdentifyResourceUpdateData } from './identify-resource';
import { Router } from '@angular/router';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { isNullOrUndefined } from 'util';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import {LocalValues} from '../local-values';
import swal from 'sweetalert2';

@Component({
  selector: 'app-identify-resource',
  templateUrl: './identify-resource.component.html',
  styleUrls: ['./identify-resource.component.scss']
})
export class IdentifyResourceComponent implements OnInit {
  ir: IdentifyResource = new IdentifyResource();
  IRForm: FormGroup;
  isEdit = false;
  discardTo = '/reintegration/referral/opencard/identified-resource/view';
  breadcrumbs = [];
  req: any;
  irUpdate: IdentifyResourceUpdateData = new IdentifyResourceUpdateData();
  metaData = [];
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _router: Router, public _opencard: OpencardsService, public _fb: FormBuilder, public _localValues: LocalValues) { }

  ngOnInit() {
    if (this._router.url === '/reintegration/referral/opencard/identified-resource/detail') { this.getRecByAdoption() }
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Adoption Menu', href: '/reintegration/referral/opencard/adoption/dashboard', active: '' },
      { label: 'Identified Resource List', active: '', href: '/reintegration/referral/opencard/identified-resource/view' },
      { label: 'Identified Resource', active: 'active' },
    );
    this.formValidation();
  }

  formValidation() {
    this.IRForm = this._fb.group({
      beginDate: [null],
      closureReasonID: [null],
      consentSentDate: [null],
      consentSignedDate: [null],
      endDate: [null],
      fileRead: [null],
      identifiedResourceTypeID: [null],
      isTransitionPlan: [null],
      notes: [null],
      subsidyReferralDate: [null],
      transitionPlan: [null],
      apadate: [null],
      providerID: [null],
      attorneyPacket: [null]
    })
  }

  getRecByAdoption() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let adoptionID: any, referralId: any, providerID: any;
    adoptionID = parseInt(localStorage.getItem('adoptionId')) - this._opencard.getHasKey();
    referralId = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    providerID = parseInt(localStorage.getItem('identifiedResourceProviderID'));
    this.req = { adoptionID: adoptionID, referralID: referralId, providerID: providerID }
    this._opencard.getByIdIR(this.req).then((data: any) => {
      loader.style.display = 'none';
      !isNullOrUndefined(data.identifiedResource.apaDate) ? data.identifiedResource.apaDate = moment(data.identifiedResource.apaDate).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.identifiedResource.attorneyPacket) ? data.identifiedResource.attorneyPacket = moment(data.identifiedResource.attorneyPacket).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.identifiedResource.beginDate) ? data.identifiedResource.beginDate = moment(data.identifiedResource.beginDate).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.identifiedResource.endDate) ? data.identifiedResource.endDate = moment(data.identifiedResource.endDate).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.identifiedResource.consentSignedDate) ? data.identifiedResource.consentSignedDate = moment(data.identifiedResource.consentSignedDate).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.identifiedResource.enteredDate) ? data.identifiedResource.enteredDate = moment(data.identifiedResource.enteredDate).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.identifiedResource.fileRead) ? data.identifiedResource.fileRead = moment(data.identifiedResource.fileRead).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.identifiedResource.transitionPlan) ? data.identifiedResource.transitionPlan = moment(data.identifiedResource.transitionPlan).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.identifiedResource.subsidyReferralDate) ? data.identifiedResource.subsidyReferralDate = moment(data.identifiedResource.subsidyReferralDate).format('MM/DD/YYYY HH:mm') : null;
      // !isNullOrUndefined(data.identifiedResource.providerTypeID) ? data.identifiedResource.providerTypeID = moment(data.providerTypeID.providerName).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.identifiedResource.consentSentDate) ? data.identifiedResource.consentSentDate = moment(data.identifiedResource.consentSentDate).format('MM/DD/YYYY HH:mm') : null;

      this.ir = data.identifiedResource;
      this.IRForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.identifiedResource.changedBy) ? data.identifiedResource.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.identifiedResource.changedDate) ? moment(data.identifiedResource.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.identifiedResource.enteredBy) ? data.identifiedResource.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.identifiedResource.enteredDate) ? moment(data.identifiedResource.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  onEdit() {
    this.IRForm.enable();
    this.isEdit = false;
  }

  async onFormAction() {
    this.irUpdate.apaDate = !isNullOrUndefined(this.ir.apaDate) ? this._localValues.stringFormatDatetime(this.ir.apaDate) : null;
    this.irUpdate.attorneyPacket = !isNullOrUndefined(this.ir.attorneyPacket) ? this._localValues.stringFormatDatetime(this.ir.attorneyPacket) : null;
    this.irUpdate.beginDate = !isNullOrUndefined(this.ir.beginDate) ? this._localValues.stringFormatDatetime(this.ir.beginDate) : null;
    this.irUpdate.endDate = !isNullOrUndefined(this.ir.endDate) ? this._localValues.stringFormatDatetime(this.ir.endDate) : null;
    this.irUpdate.closureReasonID = !isNullOrUndefined(this.ir.closureReasonID) ? this.ir.closureReasonID.closureReasonID : null;
    this.irUpdate.consentSentDate = !isNullOrUndefined(this.ir.consentSentDate) ? this._localValues.stringFormatDatetime(this.ir.consentSentDate) : null;
    this.irUpdate.consentSignedDate = !isNullOrUndefined(this.ir.consentSignedDate) ? this._localValues.stringFormatDatetime(this.ir.consentSignedDate) : null;
    this.irUpdate.fileRead = !isNullOrUndefined(this.ir.fileRead) ? this._localValues.stringFormatDatetime(this.ir.fileRead) : null;
    this.irUpdate.identifiedResourceID = this.ir.identifiedResourceID;
    this.irUpdate.identifiedResourceTypeID = !isNullOrUndefined(this.ir.identifiedResourceTypeID) ? this.ir.identifiedResourceTypeID.identifiedResourceTypeID : null;
    this.irUpdate.isTransitionPlan = this.ir.isTransitionPlan;
    this.irUpdate.notes = this.ir.notes;
    this.irUpdate.providerID = !isNullOrUndefined(this.ir.providerID) ? this.ir.providerID.providerID : null;
    this.irUpdate.referralID = !isNullOrUndefined(this.ir.referralID) ? this.ir.referralID.referralID : null;
    this.irUpdate.subsidyReferralDate = !isNullOrUndefined(this.ir.subsidyReferralDate) ? this._localValues.stringFormatDatetime(this.ir.subsidyReferralDate) : null;
    this.irUpdate.transitionPlan = !isNullOrUndefined(this.ir.transitionPlan) ? this._localValues.stringFormatDatetime(this.ir.transitionPlan) : null;
    await this._opencard.clientIdentifyResourceUpdate(this.irUpdate);
    swal('Updated!', 'Record has been updated!', 'info');
    return window.history.back();
  }

  async onFilterClosureReason(event: any) {
    let response = await this._opencard.getIdentifyResourceClosureReason({ value: event.query });
    return this.metaData = response.filter((item: any) => { return item.closureReason.toLowerCase().indexOf(event.query) !== -1 });
  }

} 
