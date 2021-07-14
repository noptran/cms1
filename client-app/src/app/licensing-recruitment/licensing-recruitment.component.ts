import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalValues} from '../local-values';
import { Router } from '@angular/router';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { Licensing } from './licensing';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';



@Component({
  selector: 'app-licensing-recruitment',
  templateUrl: './licensing-recruitment.component.html',
  styleUrls: ['./licensing-recruitment.component.scss']
})
export class LicensingRecruitmentComponent implements OnInit {
  breadcrumbs = [];
  licensingForm: FormGroup;
  recruitmentLicensing: Licensing = new Licensing();
  assignedTo: any;
  eventName: any;
  dueDate: any;
  // -----
  editControll: boolean;
  isAttachmentRequired = false;
  req = {};
  metaData = [];
  discardTo = '/licensing-recruitment/view';
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;


  constructor(public _local: LocalValues, public _router: Router, public _opencard: OpencardsService, public _client: ClildFormService, public _fb: FormBuilder) { }

  ngOnInit() {
    this.formValidation();
    this.editControll = false;

    this.isAttachmentRequired = true;
    this.getLicensingDetails();
    this.licensingForm.disable();

    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Provider List', href: "/reports/provider/view", active: '' },
      { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Recruitment List', active: '', href: '/provider/opencard/recruitment/view' },
      { label: 'Licensing List', active: '', href: '/licensing-recruitment/view' },
      { label: 'Licensing', active: 'active' },
    )
  }

  formValidation() {
    this.licensingForm = this._fb.group({
      "recruitmentLicensingEventID": [null],
      "dateCompleted": [null],
      "dueDate": [null],
      "notes": [null],
      "recruitmentInquiryID": [null],
      "recruitmentLicensingEventTypeID": [null],
      "assignedTo": [null],
      "recruitmentLicensingEventType": [null],

    })
  }

  getLicensingDetails() {
    let recruitmentLicensingEventID = this._client.getId();
    let source;
    this.req = { recruitmentLicensingEventID: recruitmentLicensingEventID }
    this.editControll = true;
    let loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.getByIdRecruitmentLicensing(this.req).then(data => {
      source = data.recruitmentLicensingEvent;
      source.dueDate = (source.dueDate) ? new Date(source.dueDate) : null;
      source.dateCompleted = (source.dateCompleted) ? new Date(source.dateCompleted) : null;
      source.recruitmentLicensingEventType = source.recruitmentLicensingEventTypeID.recruitmentLicensingEventType;
      this.assignedTo = source.eventAssignedTo_PersonTypeID.personType

      loader.style.display = 'none';
      this.recruitmentLicensing = source;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(source.changedBy) ? source.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(source.changedDate) ? moment(source.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(source.enteredBy) ? source.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(source.enteredDate) ? moment(source.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.editControll = false;
    this.licensingForm.enable();
    this.licensingForm.get('recruitmentLicensingEventType').disable();
    this.licensingForm.get('dueDate').disable();
    this.licensingForm.get('assignedTo').disable();
  }

  saveForm(source: any) {
    console.log('source is', source);
    if (this.licensingForm.valid) {
      let loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      let saveRequest = {
        recruitmentLicensingEventID: source.recruitmentLicensingEventID,
        dateCompleted: source.dateCompleted ? this._local.stringFormatDatetime(Date.parse(source.dateCompleted)) : null,
        dueDate: source.dueDate ? this._local.stringFormatDatetime(Date.parse(source.dueDate)) : null,
        notes: source.notes,
        recruitmentInquiryID: (source.recruitmentInquiryID) ? source.recruitmentInquiryID.recruitmentInquiryID : null,
        recruitmentLicensingEventTypeID: (source.recruitmentLicensingEventTypeID) ? source.recruitmentLicensingEventTypeID.recruitmentLicensingEventTypeID : null
      }

      console.log('source is', source);

      if (source.recruitmentLicensingEventID) {
        this._opencard.updateRecruitmentLicensing(saveRequest).then(data => {

          loader.style.display = 'none';
          swal('Success', 'Record has been updated!', 'success');
          this.licensingForm.disable();
          this._router.navigate(['/licensing-recruitment/view']);
        });
      }
    } else {
      swal('Info', 'Please fill the mandatory fields', 'warning');
    }



  }

  navigateTo() {
    // navigateTo
  }

  resetForm() {
    // resetForm
  }

  discardForm() {
    // discardForm
  }

}
