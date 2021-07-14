import { Component, OnInit } from '@angular/core';
import { Adoption } from './adoption';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { Router } from '@angular/router';
import { isNullOrUndefined, isDate } from 'util';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../local-values';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.scss']
})
export class AdoptionComponent implements OnInit {
  adoption: Adoption = new Adoption();
  isEdit = false;
  metaData = [];
  breadcrumbs = [];
  parentalStatus = [];
  quickMenu = "referrel";
  adptionForm: FormGroup;
  discardTo = '/reintegration/referral/opencard/adoption/view';
  casePlanGoalList = [];
  casePlanGoalDate: any;
  selectedCasePlanGoalList = [];
  isViewAttachmentDisabled = true;
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

  constructor(public _opencard: OpencardsService, public _client: ClildFormService, public _caseTeam: CaseTeamService,
    public _router: Router, public _fb: FormBuilder, public _localValues: LocalValues) { }

  ngOnInit() {
    if (this._router.url.includes('/reintegration/referral/opencard/adoption/detail')) {
      this.isAttachmentRequired = true;
      this.getById();
    }
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Adoption Menu', href: '/reintegration/referral/opencard/adoption/dashboard', active: '' },
      { label: 'Adoption List', active: '', href: '/reintegration/referral/opencard/adoption/view' },
      { label: 'Adoption', active: 'active' }
    );
    this.listAllCasePlanGoals();
    let referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    if (referralTypeId === 4) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('adoption-NCFCH', this.breadcrumbs)
    }
  }

  formValidation() {
    this.adptionForm = this._fb.group({
      birthRecordsReceived: [null],
      birthRecordsRequested: [null],
      inquiryForm: [null],
      legallyAvailable: [null],
      legalReview: [null],
      motionFiled: [null],
      notes: [null],
      parentalStatusID_Father: [null],
      parentalStatusID_Father_Other: [null],
      parentalStatusID_Mother: [null],
      parentalStatusID_Mother_Other: [null],
      permanencyStaffing: [null],
      pointsToCourtDate: [null],
      referralID: [null],
      referred_To_Adopt_Cont: [null],
      reunificationNoLogerViable_CourtApproved: [null],
      reunificationNoLogerViable_SFCSRecommended: [null],
      socialHistory: [null],
      statusApprovedDate_Father: [null],
      statusApprovedDate_Father_Other: [null],
      statusApprovedDate_Mother: [null],
      statusApprovedDate_Mother_Other: [null],
      statusDate_Father: [null],
      statusDate_Father_Other: [null],
      statusDate_Mother: [null],
      statusDate_Mother_Other: [null],
      transferToAdoption: [null],
    })
  }

  timeStringConversion(source: any) {
    source.birthRecordsReceived = this._localValues.stringFormatDatetime(Date.parse(source.birthRecordsReceived));
    source.birthRecordsRequested = this._localValues.stringFormatDatetime(Date.parse(source.birthRecordsRequested));
    source.inquiryForm = this._localValues.stringFormatDatetime(Date.parse(source.inquiryForm));
    source.legallyAvailable = this._localValues.stringFormatDatetime(Date.parse(source.legallyAvailable));
    source.legalReview = this._localValues.stringFormatDatetime(Date.parse(source.legalReview));
    source.motionFiled = this._localValues.stringFormatDatetime(Date.parse(source.motionFiled));
    source.permanencyStaffing = this._localValues.stringFormatDatetime(Date.parse(source.permanencyStaffing));
    source.pointsToCourtDate = this._localValues.stringFormatDatetime(Date.parse(source.pointsToCourtDate));
    source.referred_To_Adopt_Cont = this._localValues.stringFormatDatetime(Date.parse(source.referred_To_Adopt_Cont));
    source.reunificationNoLogerViable_CourtApproved = this._localValues.stringFormatDatetime(Date.parse(source.reunificationNoLogerViable_CourtApproved));
    source.reunificationNoLogerViable_SFCSRecommended = this._localValues.stringFormatDatetime(Date.parse(source.reunificationNoLogerViable_SFCSRecommended));
    source.socialHistory = this._localValues.stringFormatDatetime(Date.parse(source.socialHistory));
    source.statusApprovedDate_Father = this._localValues.stringFormatDatetime(Date.parse(source.statusApprovedDate_Father));
    source.statusApprovedDate_Father_Other = this._localValues.stringFormatDatetime(Date.parse(source.statusApprovedDate_Father_Other));
    source.statusApprovedDate_Mother = this._localValues.stringFormatDatetime(Date.parse(source.statusApprovedDate_Mother));
    source.statusApprovedDate_Mother_Other = this._localValues.stringFormatDatetime(Date.parse(source.statusApprovedDate_Mother_Other));
    source.transferToAdoption = this._localValues.stringFormatDatetime(Date.parse(source.transferToAdoption));
    source.statusDate_Father = this._localValues.stringFormatDatetime(Date.parse(source.statusDate_Father));
    source.statusDate_Father_Other = this._localValues.stringFormatDatetime(Date.parse(source.statusDate_Father_Other));
    source.statusDate_Mother = this._localValues.stringFormatDatetime(Date.parse(source.statusDate_Mother));
    source.statusDate_Mother_Other = this._localValues.stringFormatDatetime(Date.parse(source.statusDate_Mother_Other));
  }



  formAction(source: any) {
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    !isNullOrUndefined(source.parentalStatusID_Mother_Other) ? source.parentalStatusID_Mother_Other = source.parentalStatusID_Mother_Other.parentalStatusID : null;
    !isNullOrUndefined(source.parentalStatusID_Father) ? source.parentalStatusID_Father = source.parentalStatusID_Father.parentalStatusID : null;
    !isNullOrUndefined(source.parentalStatusID_Mother) ? source.parentalStatusID_Mother = source.parentalStatusID_Mother.parentalStatusID : null;
    !isNullOrUndefined(source.parentalStatusID_Father_Other) ? source.parentalStatusID_Father_Other = source.parentalStatusID_Father_Other.parentalStatusID : null;
    this.timeStringConversion(source);
    !isNullOrUndefined(source.adoptionID) ? this.update(source) : this.save(source);
  }

  save(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveAdoption(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/adoption/view'], { queryParamsHandling: "preserve" });
    })
  }

  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateAdoption(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this._router.navigate(['/reintegration/referral/opencard/adoption/view'], { queryParamsHandling: "preserve" });
    })
  }

  getMetaData(event: any, label: any) {
    let obj: any, req: any;
    switch (label) {
      case 'parentalStatus':
        obj = 'parentalStatus';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.metaData = data.dropDown;
    })
  }

  getById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { adoptionID: parseInt(localStorage.getItem('adoptionId')) - this._opencard.getHasKey() }
    this._opencard.getByIdAdoption(this.req).then((data: any) => {
      loader.style.display = 'none';
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.adoption.changedBy) ? data.adoption.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.adoption.changedDate) ? moment(data.adoption.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.adoption.enteredBy) ? data.adoption.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.adoption.enteredDate) ? moment(data.adoption.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      if (data.adoption.isActive) {
        !isNullOrUndefined(data.adoption.birthRecordsReceived) ? data.adoption.birthRecordsReceived = moment(data.adoption.birthRecordsReceived).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.birthRecordsRequested) ? data.adoption.birthRecordsRequested = moment(data.adoption.birthRecordsRequested).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.inquiryForm) ? data.adoption.inquiryForm = moment(data.adoption.inquiryForm).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.legallyAvailable) ? data.adoption.legallyAvailable = moment(data.adoption.legallyAvailable).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.legalReview) ? data.adoption.legalReview = moment(data.adoption.legalReview).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.motionFiled) ? data.adoption.motionFiled = moment(data.adoption.motionFiled).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.permanencyStaffing) ? data.adoption.permanencyStaffing = moment(data.adoption.permanencyStaffing).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.pointsToCourtDate) ? data.adoption.pointsToCourtDate = moment(data.adoption.pointsToCourtDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.referred_To_Adopt_Cont) ? data.adoption.referred_To_Adopt_Cont = moment(data.adoption.referred_To_Adopt_Cont).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.reunificationNoLogerViable_CourtApproved) ? data.adoption.reunificationNoLogerViable_CourtApproved = moment(data.adoption.reunificationNoLogerViable_CourtApproved).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.reunificationNoLogerViable_SFCSRecommended) ? data.adoption.reunificationNoLogerViable_SFCSRecommended = moment(data.adoption.reunificationNoLogerViable_SFCSRecommended).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.socialHistory) ? data.adoption.socialHistory = moment(data.adoption.socialHistory).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusApprovedDate_Father) ? data.adoption.statusApprovedDate_Father = moment(data.adoption.statusApprovedDate_Father).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusApprovedDate_Father_Other) ? data.adoption.statusApprovedDate_Father_Other = moment(data.adoption.statusApprovedDate_Father_Other).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusApprovedDate_Mother) ? data.adoption.statusApprovedDate_Mother = moment(data.adoption.statusApprovedDate_Mother).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusApprovedDate_Mother_Other) ? data.adoption.statusApprovedDate_Mother_Other = moment(data.adoption.statusApprovedDate_Mother_Other).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.transferToAdoption) ? data.adoption.transferToAdoption = moment(data.adoption.transferToAdoption).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusDate_Father) ? data.adoption.statusDate_Father = moment(data.adoption.statusDate_Father).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusDate_Father_Other) ? data.adoption.statusDate_Father_Other = moment(data.adoption.statusDate_Father_Other).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusDate_Mother) ? data.adoption.statusDate_Mother = moment(data.adoption.statusDate_Mother).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusDate_Mother_Other) ? data.adoption.statusDate_Mother_Other = moment(data.adoption.statusDate_Mother_Other).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.adoption.birthRecordsReceived) ? data.adoption.birthRecordsReceived = moment.utc(data.adoption.birthRecordsReceived).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.birthRecordsRequested) ? data.adoption.birthRecordsRequested = moment.utc(data.adoption.birthRecordsRequested).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.inquiryForm) ? data.adoption.inquiryForm = moment.utc(data.adoption.inquiryForm).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.legallyAvailable) ? data.adoption.legallyAvailable = moment.utc(data.adoption.legallyAvailable).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.legalReview) ? data.adoption.legalReview = moment.utc(data.adoption.legalReview).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.motionFiled) ? data.adoption.motionFiled = moment.utc(data.adoption.motionFiled).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.permanencyStaffing) ? data.adoption.permanencyStaffing = moment.utc(data.adoption.permanencyStaffing).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.pointsToCourtDate) ? data.adoption.pointsToCourtDate = moment.utc(data.adoption.pointsToCourtDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.referred_To_Adopt_Cont) ? data.adoption.referred_To_Adopt_Cont = moment.utc(data.adoption.referred_To_Adopt_Cont).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.reunificationNoLogerViable_CourtApproved) ? data.adoption.reunificationNoLogerViable_CourtApproved = moment.utc(data.adoption.reunificationNoLogerViable_CourtApproved).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.reunificationNoLogerViable_SFCSRecommended) ? data.adoption.reunificationNoLogerViable_SFCSRecommended = moment.utc(data.adoption.reunificationNoLogerViable_SFCSRecommended).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.socialHistory) ? data.adoption.socialHistory = moment.utc(data.adoption.socialHistory).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusApprovedDate_Father) ? data.adoption.statusApprovedDate_Father = moment.utc(data.adoption.statusApprovedDate_Father).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusApprovedDate_Father_Other) ? data.adoption.statusApprovedDate_Father_Other = moment.utc(data.adoption.statusApprovedDate_Father_Other).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusApprovedDate_Mother) ? data.adoption.statusApprovedDate_Mother = moment.utc(data.adoption.statusApprovedDate_Mother).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusApprovedDate_Mother_Other) ? data.adoption.statusApprovedDate_Mother_Other = moment.utc(data.adoption.statusApprovedDate_Mother_Other).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.transferToAdoption) ? data.adoption.transferToAdoption = moment.utc(data.adoption.transferToAdoption).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusDate_Father) ? data.adoption.statusDate_Father = moment.utc(data.adoption.statusDate_Father).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusDate_Father_Other) ? data.adoption.statusDate_Father_Other = moment.utc(data.adoption.statusDate_Father_Other).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusDate_Mother) ? data.adoption.statusDate_Mother = moment.utc(data.adoption.statusDate_Mother).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.adoption.statusDate_Mother_Other) ? data.adoption.statusDate_Mother_Other = moment.utc(data.adoption.statusDate_Mother_Other).format('MM/DD/YYYY HH:mm') : null;
      }
      this.adoption = data.adoption;
      this.adptionForm.disable();
      this.isEdit = true;
    })
  }

  editForm() {
    this.adptionForm.enable();
    this.isEdit = false;
    this.isViewAttachmentDisabled = false;
  }

  listAllCasePlanGoals() {
    let req: any, referralId: any;
    referralId = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    req = { referralID: referralId, beginPagination: 1, endPagination: 10 }
    this._opencard.getCasePlanGoalsList(req).then(data => {
      this.casePlanGoalList = data.casePlan;
      this.getCasePlanGoal();
    })
  }

  /**Rule  : Get the case plan goal completed field, If caseplan type as 'review' and goal type as 'adoption for 'case plan goal' */
  getCasePlanGoal() {
    let listLength = this.casePlanGoalList.length;
    this.casePlanGoalList.filter((item, index) => {
      if (item.CasePlanType === 'Review' && item.CasePlanGoal === 'Adoption') {
        this.casePlanGoalDate = !isNullOrUndefined(item.completedDate) ? moment.utc(item.completedDate) : null;
        this.selectedCasePlanGoalList.push(item);
      }
    });
    this.determineCaseGoalPlanDate();
  }

  determineCaseGoalPlanDate() {
    return this.casePlanGoalDate = !isNullOrUndefined(this.selectedCasePlanGoalList[0].completedDate) ? moment.utc(this.selectedCasePlanGoalList[0].completedDate).format('MM/DD/YYYY HH:mm') : null;
  }

  navigateTo() {

    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/adoption/detail') {
      this.url = '/reports/attachment-document/rfc/adoption-event';
    }
    else {
      this.url = '/reports/attachment-document/adoption';
    }
    return this._router.navigate([this.url])
  }

}
