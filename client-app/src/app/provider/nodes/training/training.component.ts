import { Component, OnInit } from '@angular/core';
import { Training } from './training';
import { isNullOrUndefined } from 'util';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderService } from '../../provider.service';
import * as moment from 'moment';
import {LocalValues} from '../../../local-values';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  training: Training = new Training();
  providerTraining: FormGroup;
  metaData = [];
  discardTo = '/provider/opencard/training/view';
  breadcrumbs = [];
  isEdit = false;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  isEditView = false;
  constructor(public _caseTeam: CaseTeamService, public _opencard: OpencardsService, public _router: Router,
    public _fb: FormBuilder, public _provider: ProviderService, public _localValues: LocalValues, public _client: ClildFormService) { }

  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider List', href: '/reports/provider/view', active: '' },
      { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Training Dashboard', active: '', href: '/provider/dashboard/training' },
      { label: 'Training List', active: '', href: 'provider/opencard/training/view' },
      { label: 'Training', active: 'active' }
    );
    if (this._router.url === '/provider/opencard/training/detail') {
      this.providerMember();
      this.req = { providerTrainingID: parseInt(localStorage.getItem('providerTrainingID')) - this._opencard.getHasKey() };
      this.getByIdProvider();
      this.isEdit = true;
    };
    this.license();
  }

  editForm() {
    this.providerTraining.enable();
    this.isEdit = false;
    this.isEditView = false;
  }

  formAction(source: Training) {
    this.save(source)
  }

  save(source: Training) {
    const req = {
      'endDate': !isNullOrUndefined(source.endDate) ? this._localValues.stringFormatDatetime(source.endDate) : null,
      'SRSTrainingCategoryID': !isNullOrUndefined(source.srstrainingCategoryID) ? (source.srstrainingCategoryID.srstrainingCategoryID) : null,
      'trainingCategoryID': !isNullOrUndefined(source.trainingCategoryID) ? (source.trainingCategoryID.trainingCategoryID) : null,
      'sponsorID': !isNullOrUndefined(source.trainingSponserID) ? (source.trainingSponserID.sponsorID) : null,
      'trainingTypeID': !isNullOrUndefined(source.trainingTypeID) ? (source.trainingTypeID.trainingTypeID) : null,
      'units': !isNullOrUndefined(source.units) ? (source.units) : null,
      'notes': !isNullOrUndefined(source.notes) ? source.notes : null,
      'providerLicenseID': !isNullOrUndefined(source.providerLicenseID) ? source.providerLicenseID.providerLicenseID : null,
      'providerID': parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey(),
      'providerMemberID': null
    };

    if (req.providerLicenseID === null) {
      swal('Warning', 'Please fill the mandatoy fields', 'info');
    } else {
      console.log('source', source);
      if (this._router.url === '/provider/opencard/training/detail') {
        req.providerMemberID = !isNullOrUndefined(source.providerMemberID) ? source.providerMemberID.providerMemberID.providerMemberID : null
        req['providerTrainingID'] = parseInt(localStorage.getItem('providerTrainingID')) - this._opencard.getHasKey();
      } else {
        req.providerMemberID = !isNullOrUndefined(source.providerMemberID) ? source.providerMemberID.providerMember.providerMemberID : null
      }
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      this._provider.providerTrainingSave(req).then((data) => {
        loader.style.display = 'none';
        this._router.navigate(['/provider/opencard/training/view']);
      });
    }
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'trainingType':
        obj = 'trainingType';
        break;
      case 'trainingCategory':
        obj = 'trainingCategory';
        break;
      case 'dcfTrainingCategory':
        obj = 'SRSTrainingCategory';
        break;
      case 'license':
        obj = 'providerLicense';
        break;
      case 'sponsorName':
        obj = 'sponsorName';
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.metaData = data.dropDown;
    });
  };
  sponsorName(event) {
    const req = { 'value': event.query };
    this._provider.getsponsorName(req).then((data) => {
      this.metaData = data.dropDown;
    });
  }
  licesnceLists = [];
  licenceAllLists = [];
  license() {
    const req = { 'providerID': parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey() };
    this._provider.getProviderTrainingLicense(req).then((data) => {
      // data.dropDown.map((item) => {
      //   item['fullName'] = `${!isNullOrUndefined(item.licenseNo) ? item.licenseNo : null} ${!isNullOrUndefined(item.licenseTypeID) ? item.licenseTypeID.licenseType : null} - ${!isNullOrUndefined(item.licenseStatusID) ? item.licenseStatusID.licenseStatus : null} ${!isNullOrUndefined(item.beginDate) ? moment(item.beginDate).format('MM-DD-YYYY') : null} ${!isNullOrUndefined(item.endDate) ? moment(item.endDate).format('MM-DD-YYYY') : null}`;
      // });
      this.licenceAllLists = data.dropDown;
    });
  };
  filteredContactTypes(event: any) {
    this.licesnceLists = [];
    this.licenceAllLists.filter((item: any) => {
      if (item.licenseNo.toLowerCase().indexOf(event.query) !== -1) {
        this.licesnceLists.push(item)
      };
    });
  };
  formValidation() {
    this.providerTraining = this._fb.group({
      beginDate: [null],
      providerMemberID: [null],
      trainingTypeID: [null],
      trainingCategoryID: [null],
      srstrainingCategoryID: [null],
      providerLicenseID: [null],
      units: [null],
      trainingSponserID: [null],
      endDate: [null],
      notes: [null]
    });
  };
  allProMemberIds = []
  providerMember() {
    const id = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
    const req = { 'providerID': id };
    this._provider.getProviderLocation(req).then((data) => {
      data.providerMemberProviderID.map((item: any) => {
        item['fullName'] = `${!isNullOrUndefined(item.providerMember) ? `${item.providerMember.lastName},${item.providerMember.firstName}` : null}`;
      });
      this.allProMemberIds = data.providerMemberProviderID;
    });
  };
  getByIdProvider() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const id = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
    var req = { 'providerID': id };
    this._provider.getProviderLocation(req).then((data) => {
      data.providerMemberProviderID.map((item: any) => {
        item['fullName'] = `${!isNullOrUndefined(item.providerID) ? item.providerID.providerName : null}
        ${!isNullOrUndefined(item.beginDate) ? moment(item.beginDate).format('MM-DD-YYYY') : null}`;
      });
      this.allProMemberIds = data.providerMemberProviderID;
      this.isEditView = true;
      var req_data = { 'providerTrainingID': parseInt(localStorage.getItem('providerTrainingID')) - this._opencard.getHasKey() };
      this._provider.providerTrainingGetByID(req_data).then((data) => {
        data.providerTraining['fullName'] = `${data.providerTraining.providerMemberID.lastName},${data.providerTraining.providerMemberID.firstName}`;
        console.log("T Step 1", data.providerTraining);
        var provideMembe = data.providerTraining;
        var providerLicenseID = this.licenceAllLists.find(ele => ele.providerLicenseID == data.providerTraining.providerLicenseID.providerLicenseID)
        console.log("data.providerTraining.trainingCategoryID>>>>>>>>", data.providerTraining.trainingCategoryID);
        var formData = {
          providerTrainingID: data.providerTraining.providerTrainingID,
          providerMemberID: provideMembe,
          trainingTypeID: data.providerTraining.trainingTypeID,
          trainingCategoryID: data.providerTraining.trainingCategoryID,
          srstrainingCategoryID: data.providerTraining.srstrainingCategoryID,
          providerLicenseID: providerLicenseID,
          units: data.providerTraining.units,
          trainingSponserID: data.providerTraining.sponsorID,
          endDate: this.isNullDate(data.providerTraining.endDate),
          notes: data.providerTraining.notes
        }
        console.log("Form data", formData);
        this.training = formData;
        console.log("Form data training node", this.training);
        loader.style.display = 'none';
        this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.providerTraining.changedBy) ? data.providerTraining.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.providerTraining.changedDate) ? moment(data.providerTraining.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.providerTraining.enteredBy) ? data.providerTraining.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.providerTraining.enteredDate) ? moment(data.providerTraining.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      });
    });
  };
  isNullDate(data) {
    if (data) {
      return new Date(data);
    } else {
      return null;
    }
  }
}
