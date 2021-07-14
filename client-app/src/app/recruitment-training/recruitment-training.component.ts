import { Component, OnInit } from '@angular/core';
import { RecruitmentTraining } from './rec-training';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClildFormService } from '../child-forms/child-forms.service';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {LocalValues} from '../local-values';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-recruitment-training',
  templateUrl: './recruitment-training.component.html',
  styleUrls: ['./recruitment-training.component.scss']
})
export class RecruitmentTrainingComponent implements OnInit {
  isLoading = false;
  recruitmentForm: FormGroup;
  recruitmentTraining: RecruitmentTraining = new RecruitmentTraining();
  editControll: boolean;
  isAttachmentRequired = false;
  breadcrumbs = [];
  req = {};
  metaData = [];
  referralSourceTypes = [];
  referralSourceCategoryID: any;
  discardTo = '/recruitment-training/view';
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
    this.getRecruitmentDetails();
    this.recruitmentForm.disable();

    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Provider List', href: "/reports/provider/view", active: '' },
      { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Recruitment List', active: '', href: '/provider/opencard/recruitment/view' },
      { label: 'Recruitment Training List', active: '', href: '/recruitment-training/view' },
      { label: 'Recruitment Training', active: 'active' },
    )
  }



  formValidation() {
    this.recruitmentForm = this._fb.group({
      "recruitmentTrainingID": [null],
      "recruitmentLicensingTypeID": [null],
      "staffID": [null],
      "sponsor": [null],
      "recruitmentKinshipAgencyApprovedID": [null],
      "typeOfHome": [null],
      "preferredAges": [null],
      "recruitmentTrainingTypeID": [null],
      "trainingStarted": [null],
      "trainingCompleted": [null],
      "referralSourceCategoryID": [null],
      "referralSourceTypeID": [null],
      "referralSourceComments": [null],
      "notes": [null],
      "providerID": [null],
      "recruitmentInquiryID": [null],
      "referralSourceProviderID": [null],
      "referralSourceStaffID": [null],
      "infoPacketMailedDate": [null]
    })
  }

  getRecruitmentDetails() {
    let recruitmentTrainingID = this._client.getId();
    let source;
    this.req = { recruitmentTrainingID: recruitmentTrainingID }
    this.isLoading = true;
    this.editControll = true;
    

    let loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.getByIdRecruitmentTraining(this.req).then(data => {
      source = data.recruitmentTraining;
      source.trainingStarted = (source.trainingStarted) ? new Date(source.trainingStarted) : null;
      source.trainingCompleted = (source.trainingCompleted) ? new Date(source.trainingCompleted) : null;
      source.recruitmentLicensingTypeID = source.recruitmentLicensingTypeID;

      if (source.staffID) {
        source.staffID["fullname"] = source.staffID.lastName + " " + source.staffID.firstName;
      }
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.recruitmentTraining.changedBy) ? data.recruitmentTraining.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.recruitmentTraining.changedDate) ? moment(data.recruitmentTraining.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.recruitmentTraining.enteredBy) ? data.recruitmentTraining.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.recruitmentTraining.enteredDate) ? moment(data.recruitmentTraining.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      this.isLoading = false;
      loader.style.display = 'none';
      this.recruitmentTraining = source;
    })
  }

  editForm() {
    this.editControll = false;
    this.recruitmentForm.enable();
    this.recruitmentForm.get('staffID').disable();
    this.recruitmentForm.get('sponsor').disable();
    this.recruitmentForm.get('recruitmentKinshipAgencyApprovedID').disable();
    this.recruitmentForm.get('typeOfHome').disable();
    this.recruitmentForm.get('preferredAges').disable();
  }

  saveForm(source: any) {
    console.log('source is', source);
    // if (this.recruitmentForm.valid) {
    this.isLoading = true;
    let loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    source.recruitmentLicensingTypeID = source.recruitmentLicensingTypeID ? source.recruitmentLicensingTypeID.recruitmentLicensingTypeID : null;
    source.staffID = source.staffID ? source.staffID.staffID : null;
    source.recruitmentKinshipAgencyApprovedID = source.recruitmentKinshipAgencyApprovedID ? source.recruitmentKinshipAgencyApprovedID.recruitmentKinshipAgencyApprovedID : null;
    source.recruitmentTrainingTypeID = source.recruitmentTrainingTypeID ? source.recruitmentTrainingTypeID.recruitmentTrainingTypeID : null;
    source.trainingStarted = source.trainingStarted ? this._local.stringFormatDatetime(Date.parse(source.trainingStarted)) : null;

    source.trainingCompleted = source.trainingCompleted ? this._local.stringFormatDatetime(Date.parse(source.trainingCompleted)) : null;
    source.referralSourceCategoryID = source.referralSourceCategoryID ? source.referralSourceCategoryID.referralSourceCategoryID : null;
    source.referralSourceTypeID = source.referralSourceTypeID ? source.referralSourceTypeID.referralSourceTypeID : null;
    source.providerID = source.providerID ? source.providerID.providerID : null;
    source.recruitmentInquiryID = source.recruitmentInquiryID ? source.recruitmentInquiryID.recruitmentInquiryID : null;
    source.referralSourceProviderID = source.referralSourceProviderID ? source.referralSourceProviderID.providerID : null;
    source.referralSourceStaffID = source.referralSourceStaffID ? source.referralSourceStaffID.staffID : null;
    console.log('source is', source);

    if (source.recruitmentTrainingID) {
      this._opencard.updateRecruitmentTraining(source).then(data => {
        this.isLoading = false;
        loader.style.display = 'none';
        swal('Success', 'Record has been updated!', 'success');
        this.recruitmentForm.disable();
        this._router.navigate(['/recruitment-training/view']);
      });
    }
    // } else {
    //   swal('Info', 'Please fill the mandatory fields', 'warning');
    // }



  }

  getMetaData(event, label) {
    let metaDataObj, metaDataReq
    switch (label) {
      case 'LicensingPath':
        this._opencard.getRecruitmentLicensingType().then(data => {
          this.metaData = data.recruitmentLicensingTypeList;
        })
        break;
      case 'RecruitmentTrainingType':
        this._opencard.getRecruitmentTrainingType().then(data => {
          this.metaData = data.recruitmentTrainingType;
        })
        break;
      case 'ReferralSourceCategory':
        this._opencard.getReferralSourceCategory().then(data => {
          this.metaData = data.referralSourceCategory;
        })
        break;
      case 'Types':
        // this._opencard.getRecruitmentLicensingType().then(data => {
        //   this.metaData = data.recruitmentLicensingTypeList;
        // })
        this.metaData = this.referralSourceTypes;
        break;

    }



  }

  onCatagorySelect(event) {
    this.referralSourceCategoryID = event.referralSourceCategoryID;
    let request = {
      "referralSourceCategoryID": event.referralSourceCategoryID,
      "beginPagination": 1,
      "endPagination": 50,
      "sort": {
        "column": "referralSourceTypeID",
        "mode": "asc"
      }
    }
    this._opencard.getReferralSourceType(request).then(data => {
      this.referralSourceTypes = [];
      this.referralSourceTypes = data.referralSourceType;
    })
  };

  getTypes() {
    let referralSourceTypes = this.referralSourceTypes;
    this.referralSourceTypes = [];
    this.referralSourceTypes = referralSourceTypes;
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
