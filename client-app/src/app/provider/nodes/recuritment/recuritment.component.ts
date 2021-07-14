import { Component, OnInit } from '@angular/core';
import { Recuritment, FollowUpActivity, recruitmentInquiryEvent } from './recuritment';
import { isNullOrUndefined } from 'util';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../../team-form/team-form.service';
import * as moment from 'moment';
import { ProviderService } from '../../provider.service';
import {LocalValues} from '../../../local-values';
import swal from 'sweetalert2';
@Component({
  selector: 'app-recuritment',
  templateUrl: './recuritment.component.html',
  styleUrls: ['./recuritment.component.scss']
})
export class RecuritmentComponent implements OnInit {
  recuritment: Recuritment = new Recuritment();
  followUp: FollowUpActivity = new FollowUpActivity();
  followUpActivity: recruitmentInquiryEvent = new recruitmentInquiryEvent();
  selectedIndex: number;
  followUpList = [];
  isActivityForm = false;
  showOpencard = true;
  btnLabel = 'Add';
  metaData = [];
  recruitmentOpencards = [];
  breadcrumbs = [];
  iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';
  recruitmentForm: FormGroup;
  mainTabs = [];
  sIndex = 0;
  followUp_72_hour: recruitmentInquiryEvent = new recruitmentInquiryEvent();
  followUp_30_day: recruitmentInquiryEvent = new recruitmentInquiryEvent();
  followUp_60_day: recruitmentInquiryEvent = new recruitmentInquiryEvent();
  providerId: number;
  staffName: string;
  staffID: number;
  currentDate: Date;
  currentRecruitmentInquiryID: number;
  isEdit = false;
  getByIDRequest: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _activatedRoute: ActivatedRoute, public _provider: ProviderService, public _team: TeamFormService,
    public _opencard: OpencardsService, public _fb: FormBuilder, public _router: Router, public _caseTeam: CaseTeamService,
    public _localValues: LocalValues) { }

  ngOnInit() {
    this.formValidation();
    this.initialDataFetch();
    this.setIndex(0);
    this.defineMainTabs();
    this.setRecruitmentOpencards();
    // this.recruitmentOpencards.sort((a, b) => { return a['title'].localeCompare(b['title']) })
    if (this._router.url === '/provider/dashboard/recruitment') {
      this.showRecruitment();
    }
    if (this._router.url === '/provider/opencard/recruitment/inquiry/event/new') {
      this.showInquiryEvent();
    }
    if (this._router.url === '/provider/opencard/recruitment/inquiry/date/new') {
      this.showInquiryDate();
    }
    if (this._router.url.includes('/new')) {
      this.breadcrumbs.push(
        { label: 'Person Types', href: "/reports/person/types", active: '' },
        { label: 'Provider List', href: "/reports/provider/view", active: '' },
        { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
        { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
        { label: 'Recruitment List', active: '', href: '/provider/opencard/recruitment/view' },
        { label: 'Recruitment', active: 'active', href: '/provider/dashboard/recruitment' }
      )
      if (this._router.url.includes('/provider/opencard/recruitment/inquiry/event/new')) {
        this.breadcrumbs[5] = { label: 'Recruitment', active: '', href: '/provider/opencard/recruitment/detail' }
        this.breadcrumbs[6] = { label: 'Inquiry Events List', active: '', href: '/provider/opencard/recruitment/inquiry/event/view' },
          this.breadcrumbs[7] = { label: 'Inquiry Events', active: 'active' }
      } else {
        this.breadcrumbs;
      }
      this.setFollowUpList();
      this.dueDateCalculation();
    }
    if (this._router.url.includes('/detail')) {
      this.currentRecruitmentInquiryID = parseInt(this._activatedRoute.snapshot.queryParamMap.get('ri_id'));
      localStorage.setItem('recuritmentInquiryID', this.currentRecruitmentInquiryID.toString())
      this.breadcrumbs.push(
        { label: 'Person Types', href: "/reports/person/types", active: '' },
        { label: 'Provider List', href: "/reports/provider/view", active: '' },
        { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
        { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
        { label: 'Recruitment List', active: '', href: '/provider/opencard/recruitment/view' },
        { label: 'Recruitment', active: 'active', href: '/provider/dashboard/recruitment' }
      )
      if (this._router.url.includes('/provider/opencard/recruitment/inquiry/event/detail')) {
        this.breadcrumbs[5] = { label: 'Recruitment', active: '', href: '/provider/opencard/recruitment/detail' }
        this.breadcrumbs[6] = { label: 'Inquiry Events List', active: '', href: '/provider/opencard/recruitment/inquiry/event/view' },
          this.breadcrumbs[7] = { label: 'Inquiry Events', active: 'active' }
      } else {
        this.breadcrumbs;
      }
      this.getRecByID();
    }

  }
  async initialDataFetch() {
    this.providerId = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
    this.staffID = parseInt(localStorage.getItem('UserId')) || 4620;
    this.currentDate = new Date();
    if (parseInt(localStorage.getItem('UserId'))) {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      await this._team.getUserById({ staffID: parseInt(localStorage.getItem('UserId')) })
        .then((data) => {
          this.staffName = `${data.users.firstName} ${data.users.lastName}`;
          loader.style.display = 'none';
        })
    }
    else {
      this.staffName = "";
    }
  }

  showRecruitment() {
    this.recruitmentOpencards = [
      { title: 'Inquiry Date', navigation: '/provider/opencard/recruitment/inquiry/date/new', icon: this.iconurl + '' },
      { title: 'Inquiry Events', navigation: '/provider/opencard/recruitment/inquiry/event/new', icon: this.iconurl + '' },
      { title: 'Referral', navigation: '', icon: this.iconurl + '' },
      { title: 'Recruitment Staff', navigation: '/provider/opencard/recruitment/staff/new', icon: this.iconurl + '' },
      { title: 'Recruitment Training', navigation: '', icon: this.iconurl + '' },
    ];
    this.breadcrumbs = [
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Provider List', href: "/reports/provider/view", active: '' },
      { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
      { label: 'Provider Opencards', href: '/provider/dashboard', active: '' },
      { label: 'Recruitment', active: 'active' },
    ]
  }
  showInquiryEvent() {
    this.showOpencard = false;
    this.breadcrumbs = [
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Provider List', href: "/reports/provider/view", active: '' },
      { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
      { label: 'Provider Opencards', href: '/provider/dashboard', active: '' },
      { label: 'Recruitment', href: "/provider/dashboard/recruitment", active: '' },
      { label: 'Inquiry Events', active: 'active' }
    ]
  }
  showInquiryDate() {
    this.showOpencard = false;
    this.breadcrumbs = [
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Provider List', href: "/reports/provider/view", active: '' },
      { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
      { label: 'Provider Opencards', href: '/provider/dashboard', active: '' },
      { label: 'Recruitment', href: "/provider/dashboard/recruitment", active: '' },
      { label: 'Inquiry Date', active: 'active' }
    ]
  }
  async navigateTo(label: any) {
    let url: any;
    switch (label) {
      case 'Inquiry Date':
        url = '/provider/opencard/recruitment/inquiry/date/new';
        break;
      case 'Inquiry Events':
        url = '/provider/opencard/recruitment/inquiry/event/view';
        break;
      case 'Referral':
        url = '/provider/opencard/recuritment-referral/view';
        break;
      case 'Recruitment Staff':
        url = '/provider/opencard/recruitment/staff/view';
        break;
      case 'Recruitment Training':
        // url = '/recruitment-training/view';
        url = '/recruitment-training/dashboard';
        break;
    }
    // if (label === 'Referral') {
    //   return window.open('http://10.0.49.153:5000/dashboard/documents/7KPVPZV57JCW50RY6V8432MAX5', '_blank')
    // } else {
    return this._router.navigate([url], {
      queryParams: {
        'action': 'list'
      },
      queryParamsHandling: 'merge'
    })
    // }

  }
  formAction(source: any) {
    !isNullOrUndefined(source.inquiryDate) ? source.inquiryDate = this._localValues.stringFormatDatetime(source.inquiryDate) : null;
    !isNullOrUndefined(source.recruitmentInquirySourceID) ? source.recruitmentInquirySourceID = source.recruitmentInquirySourceID.recruitmentInquirySourceID : null;
    !isNullOrUndefined(source.inquiryClosedDate) ? source.inquiryClosedDate = this._localValues.stringFormatDatetime(source.inquiryClosedDate) : null;
    !isNullOrUndefined(source.recruitmentRejectionReasonID) ? source.recruitmentRejectionReasonID = source.recruitmentRejectionReasonID.recruitmentRejectionReasonID : null;
    !isNullOrUndefined(source.infoPacketMailedDate) ? source.infoPacketMailedDate = this._localValues.stringFormatDatetime(source.infoPacketMailedDate) : null;

    source["providerID"] = this.providerId;
    source["changedBy"] = this.staffName;
    source["enteredBy"] = this.staffName;
    source["enteredBy"] = this.staffName;
    source["changedDate"] = this._localValues.stringFormatDatetime(this.currentDate.toDateString());
    source["enteredDate"] = this._localValues.stringFormatDatetime(this.currentDate.toDateString());

    this.followUp_72_hour['recruitmentInquiryEventTypeID'] = 1;
    this.followUp_30_day['recruitmentInquiryEventTypeID'] = 2;
    this.followUp_60_day['recruitmentInquiryEventTypeID'] = 3;

    !isNullOrUndefined(this.followUp_72_hour['completedDate']) ? this.followUp_72_hour['completedDate'] = this._localValues.stringFormatDatetime(this.followUp_72_hour['completedDate']) : null;
    !isNullOrUndefined(this.followUp_60_day['completedDate']) ? this.followUp_60_day['completedDate'] = this._localValues.stringFormatDatetime(this.followUp_60_day['completedDate']) : null;
    !isNullOrUndefined(this.followUp_30_day['completedDate']) ? this.followUp_30_day['completedDate'] = this._localValues.stringFormatDatetime(this.followUp_30_day['completedDate']) : null;

    this.followUp_72_hour['dueDate'] = this._localValues.stringFormatDatetime(new Date(this.recuritment.inquiryDate).getTime() + 2.592e+8);
    this.followUp_30_day['dueDate'] = this._localValues.stringFormatDatetime(new Date(this.recuritment.inquiryDate).getTime() + 2.592e+9);
    this.followUp_60_day['dueDate'] = this._localValues.stringFormatDatetime(new Date(this.recuritment.inquiryDate).getTime() + 5.184e+9);

    this.followUp_72_hour["changedBy"] = this.staffName;
    this.followUp_60_day["changedBy"] = this.staffName;
    this.followUp_30_day["changedBy"] = this.staffName;

    this.followUp_72_hour["enteredBy"] = this.staffName;
    this.followUp_60_day["enteredBy"] = this.staffName;
    this.followUp_30_day["enteredBy"] = this.staffName;

    this.followUp_72_hour["changedDate"] = this._localValues.stringFormatDatetime(this.currentDate);
    this.followUp_60_day["changedDate"] = this._localValues.stringFormatDatetime(this.currentDate);
    this.followUp_30_day["changedDate"] = this._localValues.stringFormatDatetime(this.currentDate);

    this.followUp_72_hour["enteredDate"] = this._localValues.stringFormatDatetime(this.currentDate);
    this.followUp_60_day["enteredDate"] = this._localValues.stringFormatDatetime(this.currentDate);
    this.followUp_30_day["enteredDate"] = this._localValues.stringFormatDatetime(this.currentDate);
    source['recruitmentInquiryEvent'] = [];
    source['recruitmentInquiryEvent'].push(this.followUp_72_hour, this.followUp_30_day, this.followUp_60_day,)


    !isNullOrUndefined(source.recruitmentInquiryID) ? this.update(source) : this.save(source);
  }
  save(source: Recuritment) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.saveRecruitmentInquiry(source).then((data) => {
      if (data.responseStatus) {
        loader.style.display = 'none';
        swal('Save', 'The record has been saved!', 'success');
        return this._router.navigate(['/provider/opencard/recruitment/view']);
      } else {
        loader.style.display = 'none';
        swal('Unable to save', data.responseMessage, 'warning');
        return this._router.navigate(['/provider/opencard/recruitment/view']);
      }
    });
  }

  update(source: Recuritment) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.updateRecruitmentInquiry(source).then((data) => {
      if (data.responseStatus) {
        loader.style.display = 'none';
        swal('Update', 'The record has been updated!', 'success');
        return this._router.navigate(['/provider/opencard/recruitment/view']);
      } else {
        loader.style.display = 'none';
        swal('Unable to update', data.responseMessage, 'warning');
        return this._router.navigate(['/provider/opencard/recruitment/view']);
      }
    });
  }

  dueDateCalculation() {
    if (this.recuritment.inquiryDate) {
      this.followUp_72_hour['dueDate'] = this._localValues.stringFormatDatetime(new Date(this.recuritment.inquiryDate).getTime() + 2.592e+8);
      this.followUp_60_day['dueDate'] = this._localValues.stringFormatDatetime(new Date(this.recuritment.inquiryDate).getTime() + 5.184e+9);
      this.followUp_30_day['dueDate'] = this._localValues.stringFormatDatetime(new Date(this.recuritment.inquiryDate).getTime() + 2.592e+9);
    }
  }

  getDueDate(catagory) {

    switch (catagory) {
      case '72 Hour':
        return moment(new Date(this.recuritment.inquiryDate).getTime() + 2.592e+8).format('MM/DD/YYYY HH:mm');

      case '30 Day':
        return moment(new Date(this.recuritment.inquiryDate).getTime() + 2.592e+9).format('MM/DD/YYYY HH:mm');

      case '60 Day':
        return moment(new Date(this.recuritment.inquiryDate).getTime() + 5.184e+9).format('MM/DD/YYYY HH:mm');
    }

  }

  followUpListAction(source: FollowUpActivity) {
    if (this.btnLabel === 'Update') {
      this.followUpList.splice(this.selectedIndex, 1);
      this.followUpList.push(source);
    } else {
      this.followUpList.push(source);
    }
    this.followUp = new FollowUpActivity();
    this.btnLabel = 'Add';
    this.followUpList.sort((a, b) => a['eventID'].localeCompare(b['eventID']))
  }

  openFollowUp(item: any, selectedIndex: number) {
    this.followUp = new FollowUpActivity();
    this.isActivityForm = true;
    this.selectedIndex = selectedIndex;
    this.followUp = item;
    this.btnLabel = 'Update';

  }

  activityFormAction() {
    this.followUp = new FollowUpActivity();
    return this.isActivityForm = !this.isActivityForm
  }

  removeItem() {
    this.followUp = new FollowUpActivity();
    this.btnLabel = 'Add';
    return this.followUpList.splice(this.selectedIndex, 1);
  }
  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'recruitmentInquirySourceType':
        obj = 'recruitmentInquirySourceType';
        break;
      case 'recruitmentRejectionReason':
        obj = 'recruitmentRejectionReason';
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.metaData = data.dropDown;
    })
  }

  formValidation(): void {
    this.recruitmentForm = this._fb.group({
      "inquiryDate": [null],
      "recruitmentInquirySourceID": [null],
      "inquiryClosedDate": [null],
      "recruitmentRejectionReasonID": [null],
      "infoPacketMailedDate": [null],
      "notes": [null],
      "providerID": [null],
      "changedBy": [null],
      "enteredBy": [null],
      "changedDate": [null],
      "enteredDate": [null],
      "referralCompletedDate": [null]
    })
  }

  setFollowUpList() {
    this.followUpList = [
      {
        recruitmentInquiryEventTypeID: { recruitmentInquiryEventType: "72 Hour Follow Up" },
        dueDate: new Date()
      },
      {
        recruitmentInquiryEventTypeID: { recruitmentInquiryEventType: "30 Day Follow Up" },
        dueDate: new Date()
      },
      {
        recruitmentInquiryEventTypeID: { recruitmentInquiryEventType: "60 Day Follow Up" },
        dueDate: new Date()
      }
    ]
  }

  getEvent(activity) {
    return (activity.recruitmentInquiryEventTypeID) ? activity.recruitmentInquiryEventTypeID.recruitmentInquiryEventType : null;
  }

  defineMainTabs() {
    return this.mainTabs = [
      { label: '72 Hour Follow Up', href: '#nav-sec1' },
      { label: '30 Day Follow Up', href: '#nav-sec2' },
      { label: '60 Day Follow Up', href: '#nav-sec3' },

    ]
  }

  setIndex(index: number) {
    this.sIndex = index;
  }

  getRecByID() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.getByIDRequest = { recruitmentInquiryID: this.currentRecruitmentInquiryID }
    this._provider.getByIdRecruitment(this.getByIDRequest).then((data: any) => {
      !isNullOrUndefined(data.recruitmentInquiry.inquiryDate) ? this.recuritment.inquiryDate = new Date(data.recruitmentInquiry.inquiryDate) : null;
      !isNullOrUndefined(data.recruitmentInquiry.recruitmentInquirySourceID) ? this.recuritment.recruitmentInquirySourceID = data.recruitmentInquiry.recruitmentInquirySourceID : null;
      !isNullOrUndefined(data.recruitmentInquiry.inquiryClosedDate) ? this.recuritment.inquiryClosedDate = new Date(data.recruitmentInquiry.inquiryClosedDate) : null;
      !isNullOrUndefined(data.recruitmentInquiry.recruitmentRejectionReasonID) ? this.recuritment.recruitmentRejectionReasonID = data.recruitmentInquiry.recruitmentRejectionReasonID : null;
      !isNullOrUndefined(data.recruitmentInquiry.infoPacketMailedDate) ? this.recuritment.infoPacketMailedDate = new Date(data.recruitmentInquiry.infoPacketMailedDate) : null;
      !isNullOrUndefined(data.recruitmentInquiry.notes) ? this.recuritment.notes = data.recruitmentInquiry.notes : null;
      !isNullOrUndefined(data.recruitmentInquiry.referralCompletedDate) ? this.recuritment.referralCompletedDate = new Date(data.recruitmentInquiry.referralCompletedDate) : null;


      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_72_hour['dueDate'] = new Date(data.recruitmentInquiryEventList[0].dueDate) : null;
      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_60_day['dueDate'] = new Date(data.recruitmentInquiryEventList[1].dueDate) : null;
      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_30_day['dueDate'] = new Date(data.recruitmentInquiryEventList[2].dueDate) : null;

      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_72_hour['completedDate'] = !isNullOrUndefined(data.recruitmentInquiryEventList[0].completedDate) ? new Date(data.recruitmentInquiryEventList[0].completedDate) : null : null;
      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_60_day['completedDate'] = !isNullOrUndefined(data.recruitmentInquiryEventList[1].completedDate) ? new Date(data.recruitmentInquiryEventList[1].completedDate) : null : null;
      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_30_day['completedDate'] = !isNullOrUndefined(data.recruitmentInquiryEventList[2].completedDate) ? new Date(data.recruitmentInquiryEventList[2].completedDate) : null : null;

      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_72_hour['completedBy'] = (data.recruitmentInquiryEventList[0].completedBy) : null;
      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_60_day['completedBy'] = (data.recruitmentInquiryEventList[1].completedBy) : null;
      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_30_day['completedBy'] = (data.recruitmentInquiryEventList[2].completedBy) : null;

      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_72_hour['notes'] = (data.recruitmentInquiryEventList[0].notes) : null;
      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_60_day['notes'] = (data.recruitmentInquiryEventList[1].notes) : null;
      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_30_day['notes'] = (data.recruitmentInquiryEventList[2].notes) : null;

      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_72_hour['recruitmentInquiryEventID'] = (data.recruitmentInquiryEventList[0].recruitmentInquiryEventID) : null;
      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_60_day['recruitmentInquiryEventID'] = (data.recruitmentInquiryEventList[1].recruitmentInquiryEventID) : null;
      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_30_day['recruitmentInquiryEventID'] = (data.recruitmentInquiryEventList[2].recruitmentInquiryEventID) : null;

      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_72_hour['recruitmentInquiryID'] = (data.recruitmentInquiryEventList[0].recruitmentInquiryID.recruitmentInquiryID) : null;
      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_60_day['recruitmentInquiryID'] = (data.recruitmentInquiryEventList[1].recruitmentInquiryID.recruitmentInquiryID) : null;
      (data.recruitmentInquiryEventList.length == 3) ? this.followUp_30_day['recruitmentInquiryID'] = (data.recruitmentInquiryEventList[2].recruitmentInquiryID.recruitmentInquiryID) : null;

      (data.recruitmentInquiry.recruitmentInquiryID) ? this.recuritment['recruitmentInquiryID'] = data.recruitmentInquiry.recruitmentInquiryID : null;
      loader.style.display = 'none';
      this.recruitmentForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.recruitmentInquiry.changedBy) ? data.recruitmentInquiry.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.recruitmentInquiry.changedDate) ? moment(data.recruitmentInquiry.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.recruitmentInquiry.enteredBy) ? data.recruitmentInquiry.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.recruitmentInquiry.enteredDate) ? moment(data.recruitmentInquiry.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


    })
  }

  editForm() {
    this.isEdit = true;
    this.recruitmentForm.enable();
  }

  setRecruitmentOpencards() {
    this.recruitmentOpencards = [
      { title: 'Inquiry Events', navigation: '/provider/opencard/recruitment/inquiry/event/view', icon: this.iconurl + '' },
      { title: 'Referral', icon: this.iconurl + '' },
      { title: 'Recruitment Staff', navigation: '/provider/opencard/recruitment/staff/view', icon: this.iconurl + '' },
      { title: 'Recruitment Training', icon: this.iconurl + '', navigation: "/recruitment-training/view" },
    ];
  }

  discardTo = () => window.history.back();

}
