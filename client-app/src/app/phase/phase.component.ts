import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CaseTeamService } from './../case-team/case-team.service'
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Phase } from './phase';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import * as moment from 'moment';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.scss', '../case-team/case-team.component.scss']
})
export class PhaseComponent implements OnInit {
  title: any = 'Phase';
  editControll: boolean;
  breadcrumbs = [];
  orgForm: FormGroup;
  newForm = true;
  metadata = [];
  phase: Phase = new Phase();
  discardTo = '/reports/referral/family-preservation/phase';
  isMail = false;
  display: any;
  isShowAck: any;
  caseTeamList: any;
  ackForm: any;
  url: any;
  isAttachmentRequired = false;
  quickMenu: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public _CaseTeamService: CaseTeamService,
    public _opencard: OpencardsService) { }

  ngOnInit() {
    this.editControll = false;
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reports/referral/family-preservation/detail", active: '' },
      { label: 'Phase List', href: "/reports/referral/family-preservation/phase", active: '' },
      { label: 'Phase', active: 'active' }
    );
    this.formValidation();
    if (this.router.url === '/reports/referral/family-preservation/phase/detail') {
      this.getPhaseById();
      this.getCaseTeam();
      this.isAttachmentRequired  = true;
    }

    this.ackForm = JSON.parse(localStorage.getItem('ackform'));
  }

  formValidation() {
    this.orgForm = this.formBuilder.group({
      'phaseTypeID': [null],
      'openByID': [null],
      'phaseClosureReasonID': [null],
      'beginDate': [null],
      'endDate': [null],
    });
  }

  resetForm() { }

  discardForm() { }

  editForm() {
    this.editControll = false;
    this.orgForm.enable();
  }


  addPost(post) {
    !isNullOrUndefined(post.beginDate) ? post.beginDate = Date.parse(post.beginDate) : null;
    !isNullOrUndefined(post.endDate) ? post.endDate = Date.parse(post.endDate) : null;
    !isNullOrUndefined(post.phaseTypeID) ? post.phaseTypeID = post.phaseTypeID.phaseTypeID : null;
    !isNullOrUndefined(post.phaseClosureReasonID) ? post.phaseClosureReasonID = post.phaseClosureReasonID.phaseClosureReasonID : null;
    !isNullOrUndefined(post.openByID) ? post.openByID = post.openByID.openByID : null;
    post.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    if (post.phaseID) {
      this.updatePhase(post);
    } else {
      this.savePhase(post);
    }
  }

  savePhase(post) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.savePhase(post).then(data => {
      loader.style.display = 'none';
      this.phase = data.phase;
      this.orgForm.disable();
      this.editControll = true;
      // this.navigateTOListView(this.phase.phaseTypeID)
      swal('Success', 'Phase saved successfully', 'success');
      this.router.navigate(['/reports/referral/family-preservation/phase']);
    })
  }

  updatePhase(post) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updatePhase(post).then(data => {
      loader.style.display = 'none';
      this.phase = data.phase;
      this.orgForm.disable();
      this.editControll = true;
      this.router.navigate(['/reports/referral/family-preservation/phase/new']);
      swal('Success', 'Phase saved successfully', 'success');
    })
  }

  getPhaseById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { phaseID: parseInt(localStorage.getItem('phaseId')) - this._opencard.getHasKey() };
    this._opencard.getByIdPhase(req).then(data => {
      if(data.phaseType.isActive) { 
        !isNullOrUndefined(data.phaseType.beginDate) ? data.phaseType.beginDate = new Date(data.phaseType.beginDate) : null;
        !isNullOrUndefined(data.phaseType.endDate) ? data.phaseType.endDate = new Date(data.phaseType.endDate) : null;
      } else {
        !isNullOrUndefined(data.phaseType.beginDate) ? data.phaseType.beginDate = moment.utc(data.phaseType.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.phaseType.endDate) ? data.phaseType.endDate = moment.utc(data.phaseType.endDate).format('MM/DD/YYYY HH:mm') : null;
      }
      this.phase = data.phaseType;
      loader.style.display = 'none';
      this.orgForm.disable();
      this.editControll = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.phaseType.changedBy) ? data.phaseType.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.phaseType.changedDate) ? moment(data.phaseType.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.phaseType.enteredBy) ? data.phaseType.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.phaseType.enteredDate) ? moment(data.phaseType.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      // this.formDefinition(this.phase.phaseTypeID)
    })
    this.isMail = true;
  }

  getMetaData(event, label) {
    let metaDataReqObj, metaDataReq;
    switch (label) {
      case 'phaseType':
        metaDataReqObj = 'phaseType';
        break;
      case 'openBy':
        metaDataReqObj = 'openBy'
        break;
      case 'closureReason':
        metaDataReqObj = 'phaseClosureReason'
        break;
    }
    metaDataReq = { Object: metaDataReqObj, value: event.query }
    this._CaseTeamService.getSearchList(metaDataReq).then((data) => {
      this.metadata = data.dropDown;
    })
  }

  navigateTOListView(phaseTypeObj) {
    phaseTypeObj.phaseTypeID == 2 ? this.router.navigate(['/reports/referral/family-preservation/phase/nonintensive-view']) : this.router.navigate(['/reports/referral/family-preservation/phase/intensive-view']);
  }

  formDefinition(event) {
    // return this.breadcrumbs.splice(3, 2, { label: event.phaseTypeID != 2 ? 'Intensive List' : 'Non - Intensive List', href: event.phaseTypeID != 2 ? "/reports/referral/family-preservation/phase/intensive-view" : "/reports/referral/family-preservation/phase/nonintensive-view", active: '' },
    //   { label: event.phaseTypeID != 2 ? 'Intensive' : 'Non - Intensive', href: '/reports/referral/family-preservation/phase/new', active: 'active' })

  }
  goToPhaseActivites() {
    let phaseType: any = this.phase.phaseTypeID;
    localStorage.setItem('phaseTypeId', phaseType.phaseTypeID + this._opencard.getHasKey())
    return this.router.navigate(['/reports/referral/family-preservation/phase-activity/view']);
  }

  navigateTo() {
    let currentURL = this.router.url;
    if (currentURL == '/reports/referral/family-preservation/phase/detail') {
      this.url = '/reports/attachment-document/phase';
    }
   
    return this.router.navigate([this.url])
  }

  showDialog() {
    this.ackForm.isPhase = true;
    this.ackForm.pwsChild = [];
    if (this.phase.phaseClosureReasonID['phaseClosureReasonID'] === 10) {
      this.ackForm.sub = 'ACK(PHASE,REOPEN)';
      this.ackForm.staffSub = `Closure of Initial Intensive Phase Has Been Reopened For Client ${this.ackForm.fullName}`;
      localStorage.setItem('reOpen', 'true');
      this.ackForm.isPhaseClosure = false;
      this.ackForm.isCaseClosureSectionfive = false;
      this.ackForm.message = 'Closure of Initial Intensive Phase Has Been Reopened';
    } else if (this.phase.phaseTypeID['phaseType'] === 'Intensive') {
      this.ackForm.phaseClosure = this.phase['phaseClosureReasonID']['phaseClosureReason'];
      this.ackForm.phaseEndDate = this.phase.endDate;
      this.ackForm.isPhaseClosure = true;
      this.ackForm.sub = 'ACK(PHASE)';
      this.ackForm.isCaseClosureSectionfive = false;
      this.ackForm.staffSub = `Closure of Initial Intensive Phase Has Been Entered For Client ${this.ackForm.fullName}`;
      this.ackForm.message = `Closure of Initial Intensive Phase for client ${this.ackForm.caseHead}
      ${this.ackForm.factsCase} on ${moment(Date.parse(this.ackForm.closureDate)).format('MM-DD-YYYY')}
       has been entered by ${this.ackForm.enteredBy}`;
      localStorage.setItem('reOpen', 'false');
    }

    this.display = true;
  }

  getCaseTeam() {
    let req = {
      'phaseID': parseInt(localStorage.getItem('phaseId')) - this._opencard.getHasKey()
    };
    this._CaseTeamService.getCaseManagerList(req).then(data => {
      this.caseTeamList = data.caseManagerList.filter((item) => {
        if (item.PersonType === 'Therapist - Case Manager'
          || item.PersonType === 'Supervisor' || item.PersonType === 'FP Case Manager' ||
          item.personType === 'Masters Student') {
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
}
