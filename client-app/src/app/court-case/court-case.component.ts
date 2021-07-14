import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CaseTeamService } from './../case-team/case-team.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { CourtCase } from './court-case';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { isNull, isUndefined, isNullOrUndefined } from 'util';
import { ClildFormService } from '../child-forms/child-forms.service';
import * as moment from 'moment';


@Component({
  selector: 'app-court-case',
  templateUrl: './court-case.component.html',
  styleUrls: ['./court-case.component.scss', '../case-team/case-team.component.scss']
})
export class CourtCaseComponent implements OnInit {

  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public _CaseTeamService: CaseTeamService, public _opencards: OpencardsService, public _client: ClildFormService) { }

  Data;
  orgForm: FormGroup;
  caseTypeData = [];
  countyData = [];
  showForm = false;
  caseTeamId;
  newForm = false;
  quickMenu = 'client';
  courtCaseID;
  title = 'Court Case Number';
  status: any;
  breadcrumbs = [];
  formStatus: any;
  formNavigation = false;
  subtitle: any;
  courtCase: CourtCase = new CourtCase();
  results = [];
  clientId: any;
  isEditForm = false;
  discardTo = '/reports/court/case/view';
  referralTypeId: any;
  url: any;
  isAttachmentRequired = false;
  req = {};
  availableKSCounties = [];

  isFormLog = false;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: ''
  };

  referralTypeSelected = 1;

  ngOnInit() {
    this.loadDefaultFormInitial();
    this.getClientDetails();
    this.showForm = true;
    this.getHomeCounty();
    this.getCaseType();
    this.formValidation();
    // this.getKSCounties();
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Court Case List', active: '', href: '/reports/court/case/view' },
      { label: 'Court Case', active: 'active' },
    );
    if (this.router.url === '/reports/court/case/details') {
      this.getCourtCaseById();
      this.isAttachmentRequired = true;
    }

  }


  loadDefaultForm() {
    // this.updateDropdown();
    this.orgForm = this.formBuilder.group({
      'courtCaseNo': [this.Data.courtCaseNo],
      'caseTypeID': [this.Data.caseTypeID],
      'countyID': [this.Data.caseTypeID],
      'beginDate': [this.Data.beginDate],
      'endDate': [this.Data.endDate],
    });
  }

  loadDefaultFormInitial() {

    this.orgForm = this.formBuilder.group({
      'courtCaseNo': [null],
      'caseTypeID': [null],
      'countyID': [null],
      'beginDate': [null],
      'endDate': [null],
      // "enteredBy":"sham",
      // "changedBy":"Anusha",
    });
  }

  getCaseType() {
    const req = {
      'Object': 'caseType',
      'value': 'j'
    };
    this._CaseTeamService.getSearchList(req).then(data => {
      this.caseTypeData = data.dropDown;
    });
  }

  getHomeCounty() {
    const req = {
      'Object': 'county',
      'value': 'an'
    };
    this._CaseTeamService.getSearchList(req).then(data => {
      this.countyData = data.dropDown;
    });
  }

  goBack() {
    this.router.navigateByUrl('/reports/courtCase');
  }

  addPost(post: any) {
    if (this.orgForm.valid) {
      post.client = parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey();
      !isNull(post.caseTypeID) && !isUndefined(post.caseTypeID) ? post.caseTypeID = post.caseTypeID.caseTypeID : null;
      !isNull(post.countyID) && !isUndefined(post.countyID) ? post.countyID = post.countyID.countyID : null;
      !isNull(post.referralID) && !isUndefined(post.referralID) ? post.referralID = post.referralID.ReferralID : null;
      !isNull(post.beginDate) && !isUndefined(post.beginDate) ? post.beginDate = Date.parse(post.beginDate) : null;
      !isNull(post.endDate) && !isUndefined(post.endDate) ? post.endDate = Date.parse(post.endDate) : null;
      if (post.courtCaseID) {
        this.updateCourtCase(post);
      } else {
        this.saveCourtCase(post);
      }
    } else {
      swal('Warning', 'Please fill the mandatory fields', 'warning');
    }

  }

  editForm() {
    this.orgForm.enable();
    this.isEditForm = false;
  }

  // getPhaseId() {
  //   this.phaseID = this._CaseTeamService.getId();
  //   this.getPhaseById();
  // }

  saveCourtCase(post) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._CaseTeamService.saveCourtCase(post).then(() => {
      swal('Success', 'Record has been saved!', 'success');
      loader.style.display = 'none';
      this.router.navigate(['/reports/court/case/view']);
    });
  }

  updateCourtCase(post) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._CaseTeamService.updateCourtCase(post).then(data => {
      this.courtCase = data.courtCase;
      swal('Success', 'Record has been updated!', 'success');
      loader.style.display = 'none';
      this.router.navigate(['/reports/court/case/view']);
    });
  }



  getId() {
    this.courtCaseID = this._CaseTeamService.getId();
    this.getData();
  }

  getData() {
    if (this.courtCaseID == 'true' || this.courtCaseID == undefined) {
      this.newForm = true;
      this.loadDefaultFormInitial();
      this.showForm = true;
    } else {
      this.newForm = false;
      this.getCourtCaseById();
    }
  }

  goToActivity() {
    this.router.navigateByUrl('/reports/courtCase');
  }

  getCourtCaseById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.req = { 'courtCaseID': this._client.getId() };
    this._CaseTeamService.getCourtCaseById(this.req).then(data => {

      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.courtCase.changedBy) ? data.courtCase.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.courtCase.changedDate) ? moment(data.courtCase.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.courtCase.enteredBy) ? data.courtCase.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.courtCase.enteredDate) ? moment(data.courtCase.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


      loader.style.display = 'none';
      if (data.courtCase.referralID && data.courtCase.referralID.referralTypeID) {
        this.referralTypeSelected = data.courtCase.referralID.referralTypeID.referralTypeID;
      }

      if (data.courtCase.isActive) {
        !isNullOrUndefined(data.courtCase.beginDate) ? data.courtCase.beginDate = moment(data.courtCase.beginDate).format('MM/DD/YYYY') : null;
        !isNullOrUndefined(data.courtCase.endDate) ? data.courtCase.endDate = moment(data.courtCase.endDate).format('MM/DD/YYYY') : null;
        if ((data.courtCase.referralID)) {
          data.courtCase.referralID['display'] = data.courtCase.referralID.referralTypeID.referralType + ' ' + moment(data.courtCase.referralID.caseID.beginDate).format('MM/DD/YYYY') + ' TO '
            + moment(data.courtCase.referralID.caseID.endDate).format('MM/DD/YYYY') + ' ( ' + data.courtCase.referralID.caseID.caseID + ' ) ';
        }
      } else {
        !isNullOrUndefined(data.courtCase.beginDate) ? data.courtCase.beginDate = moment.utc(data.courtCase.beginDate).format('MM/DD/YYYY') : null;
        !isNullOrUndefined(data.courtCase.endDate) ? data.courtCase.endDate = moment.utc(data.courtCase.endDate).format('MM/DD/YYYY') : null;
        if ((data.courtCase.referralID)) {
          data.courtCase.referralID['display'] = data.courtCase.referralID.referralTypeID.referralType + ' ' + moment.utc(data.courtCase.referralID.caseID.beginDate).format('MM/DD/YYYY') + ' TO '
            + moment.utc(data.courtCase.referralID.caseID.endDate).format('MM/DD/YYYY') + ' ( ' + data.courtCase.referralID.caseID.caseID + ' ) ';
        }
      }

      if ((data.courtCase.referralID)) {
        data.courtCase.referralID['display'] = data.courtCase.referralID.referralTypeID.referralType + ' ' + moment.utc(data.courtCase.referralID.caseID.beginDate).format('MM/DD/YYYY') + ' TO '
          + moment.utc(data.courtCase.referralID.caseID.endDate).format('MM/DD/YYYY') + ' ( ' + data.courtCase.referralID.caseID.caseID + ' ) ';
      }
      this.courtCase = data.courtCase;
      this.orgForm.disable();
      this.isEditForm = true;
    });
  }

  formValidation() {
    this.orgForm = this.formBuilder.group({
      'beginDate': [null, Validators.compose([Validators.required])],
      'endDate': [null],
      'courtCaseNo': [null, Validators.compose([Validators.required])],
      'caseTypeID': [null],
      'countyID': [null, Validators.compose([Validators.required])],
      'referralID': [null, Validators.compose([Validators.required])]

    });
  }

  getCounty(event: any) {
  }

  getClientDetails() {
    let localstorageId;
    localstorageId = localStorage.getItem('clientId');
    this.clientId = localstorageId - this._opencards.getHasKey();
  }

  /***
   * @param searchKey - search string
   * @returns referral list by client id
   */
  getReferralForClient(searchKey) {
    let req: any;
    req = { clientID: this.clientId, value: searchKey };
    return this._CaseTeamService.getReferralByCleintId(req).then((data) => {
      data.dropDown.map((item: any) => {
        if (item.EndDate === null) {
          item.EndDate = '-Nill-';
        }
        if (item.EndDate !== '-Nill-') {
          item.EndDate = moment.utc(item.EndDate).format('MM/DD/YYYY');
        }
        // item['display'] =
        //   item.ReferralType + ' ( ' + item.ReferralID + ' ) ' + ' ' + moment.utc(item.BeginDate).format('MM/DD/YYYY') + ' TO ' + item.EndDate;
        item['display'] = item.Referral;
      });
      this.results = data.dropDown;
    });
  }

  getMetadata(event, label) {
    let metaDataReqObj, metaDataReq;
    switch (label) {
      case 'county':
        metaDataReqObj = 'county';
        break;
      case 'caseType':
        metaDataReqObj = 'caseType';
        break;
      case 'referral':
        this.getReferralForClient(event.query);
        break;
    }
    if (metaDataReqObj) {
      metaDataReq = { Object: metaDataReqObj, value: event.query };
      this._CaseTeamService.getSearchList(metaDataReq).then((data) => {
        this.results = data.dropDown;
      });
    }
  }

  navigateTo() {
    const currentURL = this.router.url;
    if (currentURL == '/reports/court/case/details') {
      this.url = '/reports/attachment-document/client/court-case';
    } else {
      this.url = '/reports/attachment-document/client/court-case';
    }
    return this.router.navigate([this.url]);
  }

  async getKSCounties() {
    this.availableKSCounties = await this._opencards.getKSCounties();
  }

  onFilterCounties(event: any) {
    if (event.query === '') {
      return this.results = this.availableKSCounties;
    } else {
      this.results = this.availableKSCounties.filter((item: any) => item.countyName.toString().toLowerCase().indexOf(event.query) !== -1);
    }
  }
  onReferralSelection(data) {
    this.referralTypeSelected = data.ReferralTypeID;
  }

  getCounties() {
    const request = {
      referralTypeID: this.referralTypeSelected
    };
    this._opencards
      .getKScountiesCourtCase(request)
      .then(data => {
        this.results = data.dropDown;

      });
  }


}
