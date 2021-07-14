import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FpFisMembers } from './fp-fis-members';

import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { HomeService } from '../../../home/home.service';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { isNullOrUndefined } from 'util';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-fis-members-fp-form',
  templateUrl: './fis-members-fp-form.component.html',
  styleUrls: ['./fis-members-fp-form.component.scss']
})
export class FisMembersFpFormComponent implements OnInit {
  breadcrumbs = [];
  fisMemberForm: FormGroup;
  title: any = 'FIS Members';
  status = 'draft';
  formStatus?: any;
  subtitle: any;
  formControl: any;
  editControll: boolean;
  fpFisMember: FpFisMembers = new FpFisMembers();
  clientId: any;
  referralId: any;
  metaData: any;
  discardTo = '/reports/referral/family-preservation/fis-members/view';
  isMail = true;
  isSendMailDisabled = true;
  display: any;
  isShowAck: any;
  caseTeamList: any;
  ackForm: any;
  quickMenu: any;
  url: any;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: '',
  };
  isFormLog = false;
  isAttachmentRequired = false;
  // tslint:disable-next-line:max-line-length
  constructor(public _fb: FormBuilder, public _opencards: OpencardsService, public _home: HomeService,
    public _router: Router, public _CaseTeamService: CaseTeamService, public _client: ClildFormService) { }

  ngOnInit() {
    this.ackForm = JSON.parse(localStorage.getItem('ackform'));
    if (this._router.url == '/reports/referral/family-preservation/fis-members/detail') {
      this.getFISMemberRec();
      this.getCaseTeam();
      this.isAttachmentRequired = true;
    }
    this.formControl = false;
    this.editControll = false;
    this.formValidation();
    this.getClientDetails();
    this.breadcrumbs.push(
      { label: 'Client List', href: '/reports/client', active: '' },
      { label: 'Client Form', href: '/reports/client/details', active: '' },
      { label: 'Referral Form', href: '/reports/referral/family-preservation/detail', active: '' },
      { label: 'Family', href: '/reports/family/view', active: '' },
      { label: 'FIS Member', href: '/reports/referral/family-preservation/fis-members/view', active: '' },
      { label: 'Form', href: '', active: 'active' },
    );
  }

  resetForm() { }

  discardForm() { }

  editForm() {
    this.formControl = false;
    this.fisMemberForm.enable();
  }

  getClientDetails() {
    const encryptClientID = localStorage.getItem('clientId');
    const encryptReferralID = localStorage.getItem('referralId');
    const hasKey = this._opencards.getHasKey();
    this.clientId = parseInt(encryptClientID) - hasKey;
    this.referralId = parseInt(encryptReferralID) - hasKey;
  }

  formValidation() {
    this.fisMemberForm = this._fb.group({
      'clientReferralID': [null],
      'clientID': [null, Validators.compose([Validators.required])],
      'beginDate': [null, Validators.compose([Validators.required])],
      'endDate': [null],
      'personTypeID': [null, Validators.compose([Validators.required])],
      'isCaseHead': [null],
      'dueDate': [null],
      'drugTestDate': [null],
      'drugsPositive': [null],
      'releaseDateFP': [null],
      'oohDateFP': [null],
      'ooh_CountyID': [null],
      'drugTestResultsID': [null],
      'oohprimary_ReasonForRemovalID': [null],
      'oohsecondary_ReasonForRemovalID': [null],
      'referralID': [null],
      'clientName': [null],
      'isPWSChild': [null]
    });
  }

  getMetaData(event, label) {
    let reqObj: any, request: any, nameFields = ['firstName', 'lastName'], email: any;
    switch (label) {
      case 'client':
        reqObj = 'client';
        break;
      case 'personType':
        reqObj = 'personType';
        break;
      case 'durgTest':
        reqObj = 'drugTestResult';
        break;
      case 'county':
        reqObj = 'county';
        break;
      case 'county':
        reqObj = 'county';
        break;
      case 'primary_reason':
        reqObj = 'reasonForRemoval';
        break;
      case 'secondary_reason':
        reqObj = 'reasonForRemoval';
        break;

    }
    request = { Object: reqObj, value: event.query };
    if (reqObj) {
      this._CaseTeamService.getSearchList(request).then((data) => {
        data.dropDown.map((item) => {
          nameFields.map((check) => {
            if (Object.keys(item).includes(check)) {
              email = !isNullOrUndefined(item.email) ? item.email : 'Email not provided!';
              item['fullName'] = item.lastName + ' ' + item.firstName;
            }
          });
        });
        this.metaData = data.dropDown;
      });
    }

  }

  saveForm(source: any) {
    if (this.fisMemberForm.valid) {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      source.beginDate = source.beginDate ? Date.parse(source.beginDate) : null;
      source.endDate = source.endDate ? Date.parse(source.endDate) : null;
      source.dueDate = source.dueDate ? Date.parse(source.dueDate) : null;
      source.drugTestDate = source.drugTestDate ? Date.parse(source.drugTestDate) : null;
      source.releaseDateFP = source.releaseDateFP ? Date.parse(source.releaseDateFP) : null;
      source.oohDateFP = source.oohDateFP ? Date.parse(source.oohDateFP) : null;
      // source.clientID = this.clientId;
      source.referralID = this.referralId;
      !isNullOrUndefined(source.personTypeID) ? source.personTypeID = source.personTypeID.personTypeID : null;
      !isNullOrUndefined(source.ooh_CountyID) ? source.ooh_CountyID = source.ooh_CountyID.countyID : null;
      !isNullOrUndefined(source.drugTestResultsID) ? source.drugTestResultsID = source.drugTestResultsID.drugTestResultsID : null;
      !isNullOrUndefined(source.oohprimary_ReasonForRemovalID) ? source.oohprimary_ReasonForRemovalID = source.oohprimary_ReasonForRemovalID.reasonForRemovalID : null;
      !isNullOrUndefined(source.oohsecondary_ReasonForRemovalID) ? source.oohsecondary_ReasonForRemovalID = source.oohsecondary_ReasonForRemovalID.reasonForRemovalID : null;
      !isNullOrUndefined(source.clientID) ? source.clientID = source.clientID.clientID : null;

      if (source.clientReferralID) {
        this._opencards.updateFisMembers(source).then(data => {
          loader.style.display = 'none';
          swal('Success', 'Record has been updated!', 'success');
          this.fisMemberForm.disable();
          this._router.navigate(['/reports/referral/family-preservation/fis-members/view']);
        });
      } else {
        this._opencards.saveFisMembers(source).then(data => {
          loader.style.display = 'none';
          swal('Success', 'Record has been saved!', 'success');
          this.fisMemberForm.disable();
          this._router.navigate(['/reports/referral/family-preservation/fis-members/view']);
        });
      }
    } else {
      swal('Warning', 'Please fill the mandatory fields', 'warning');
    }

  }

  getFISMemberRec() {
    let req;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    req = { clientReferralID: this._client.getId() };
    this._opencards.getFISMemberRec(req).then((data) => {
      loader.style.display = 'none';
      if (data.clientReferral.isActive) {
        !isNullOrUndefined(data.clientReferral.beginDate) ? data.clientReferral.beginDate = moment(data.clientReferral.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientReferral.endDate) ? data.clientReferral.endDate = moment(data.clientReferral.endDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientReferral.drugTestDate) ? data.clientReferral.drugTestDate = moment(data.clientReferral.drugTestDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientReferral.dueDate) ? data.clientReferral.dueDate = moment(data.clientReferral.dueDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientReferral.releaseDateFP) ? data.clientReferral.releaseDateFP = moment(data.clientReferral.releaseDateFP).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientReferral.oohDateFP) ? data.clientReferral.oohDateFP = moment(data.clientReferral.oohDateFP).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.clientReferral.beginDate) ? data.clientReferral.beginDate = moment.utc(data.clientReferral.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientReferral.endDate) ? data.clientReferral.endDate = moment.utc(data.clientReferral.endDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientReferral.drugTestDate) ? data.clientReferral.drugTestDate = moment.utc(data.clientReferral.drugTestDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientReferral.dueDate) ? data.clientReferral.dueDate = moment.utc(data.clientReferral.dueDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientReferral.releaseDateFP) ? data.clientReferral.releaseDateFP = moment.utc(data.clientReferral.releaseDateFP).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.clientReferral.oohDateFP) ? data.clientReferral.oohDateFP = moment.utc(data.clientReferral.oohDateFP).format('MM/DD/YYYY HH:mm') : null;
      }
      this.fpFisMember = data.clientReferral;
      !isNullOrUndefined(this.fpFisMember.clientID) ? this.fpFisMember.clientID['clientName'] = data.clientReferral.clientID.firstName + ' ' + data.clientReferral.clientID.lastName : null;
      this.fisMemberForm.disable();
      this.editControll = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.clientReferral.changedBy) ? data.clientReferral.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.clientReferral.changedDate) ? moment(data.clientReferral.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.clientReferral.enteredBy) ? data.clientReferral.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.clientReferral.enteredDate) ? moment(data.clientReferral.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      if (!isNullOrUndefined(data.clientReferral.clientID)) {
        this.ackForm.pwsChild[0].clientName = data.clientReferral.clientID.lastName + ',' + data.clientReferral.clientID.firstName;
        this.ackForm.pwsChild[0].dob = data.clientReferral.clientID.dob;
        this.ackForm.pwsChild[0].notLiveBirth = !isNullOrUndefined(data.clientReferral.clientID.notLiveBirth) ?
          data.clientReferral.clientID.notLiveBirth : null;
        this.ackForm.pwsChild[0].raceID = !isNullOrUndefined(data.clientReferral.clientID.raceID) ?
          data.clientReferral.clientID.raceID : null;
          this.ackForm.pwsChild[0].genderID = !isNullOrUndefined(data.clientReferral.clientID.genderID) ?
          data.clientReferral.clientID.genderID : null;
        this.ackForm.pwsChild[0].tribeID = !isNullOrUndefined(data.clientReferral.clientID.tribeID) ?
          data.clientReferral.clientID.tribeID : null;
        this.ackForm.pwsChild[0].ethnicityID = !isNullOrUndefined(data.clientReferral.clientID.ethnicityID) ?
          data.clientReferral.clientID.ethnicityID.ethnicity : null;
        this.ackForm.pwsChild[0].drugTestDate = !isNullOrUndefined(data.clientReferral.drugTestDate) ? data.clientReferral.drugTestDate : null;
        this.ackForm.pwsChild[0].drugsPositive = !isNullOrUndefined(data.clientReferral.drugsPositive) ? data.clientReferral.drugsPositive : null;

      }
      if (!isNullOrUndefined(data.clientReferral.drugTestResultsID)) {
        this.ackForm.drugTestResults = !isNullOrUndefined(data.clientReferral.drugTestResultsID) ?
          data.clientReferral.drugTestResultsID.drugTestResults : null;
      }
      if (data.clientReferral.isPWSChild === true) {
        this.ackForm.isPWSChild = true;
      } else {
        this.ackForm.isPWSChild = false;
      }
      if (data.clientReferral.releaseDateFP !== null) {
        this.ackForm.initial = true;
        this.ackForm.initialVal = data.clientReferral.releaseDateFP;
        this.isSendMailDisabled = false;
      } else {
        this.ackForm.initial = false;
        // this.isSendMailDisabled = true;
      }
      if (data.clientReferral.isPWSChild === true || data.clientReferral.releaseDateFP !== null) {
        this.isSendMailDisabled = false;
      }
    });
  }

  showDialog() {
    this.display = true;
    localStorage.setItem('reOpen', 'false');
  }

  getCaseTeam() {
    const req = {
      'referralID': parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey()
    };
    this._CaseTeamService.getCaseManagerList(req).then(data => {
      this.caseTeamList = data.caseManagerList.filter((item) => {
        if (item.PersonType === 'Therapist - Case Manager' || item.PersonType === 'Supervisor' || item.PersonType === 'FP Case Manager' || item.personType === 'Masters Student') {
          return item;
        }
      });
    });
  }

  showAck(event) {
    this.isShowAck = true;
    this.display = false;
  }
  disableAck() {
    this.display = false;
  }
  hideAck() {
    this.isShowAck = false;
  }
  isPWSChild(event) {
    this.ackForm.message = '';
    if (event === true) {
      this.isSendMailDisabled = false;
      this.ackForm.isPWSChild = true;
      this.ackForm.sub = 'ACK(PHASE)';
    } else if (event === false) {
      this.isSendMailDisabled = true;
      this.ackForm.isPWSChild = false;
    }
  }
  DCFReleaseDate(event) {
    this.ackForm.message = '';
    if (event !== null) {
      this.isSendMailDisabled = false;
      this.ackForm.initial = true;
      this.ackForm.initialVal = event;
      this.ackForm.sub = 'ACK';
    } else {
      this.isSendMailDisabled = true;
      this.ackForm.initial = false;
    }
  }

  navigateTo() {
    const currentURL = this._router.url;
    if (currentURL == '/reports/referral/family-preservation/fis-members/detail') {
      this.url = '/reports/attachment-document/fis-members';
    }

    return this._router.navigate([this.url]);
  }
  getClientInfo(event) {
  }
}
