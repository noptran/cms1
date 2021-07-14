import { Component, OnInit } from '@angular/core';
import { ProviderStaff } from './provider-staff';
import { isNullOrUndefined } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { ProviderService } from '../../provider.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { TeamFormService } from '../../../team-form/team-form.service';
import {LocalValues} from '../../../local-values';
import * as moment from 'moment';


@Component({
  selector: 'app-provider-staff',
  templateUrl: './provider-staff.component.html',
  styleUrls: ['./provider-staff.component.scss']
})
export class ProviderStaffComponent implements OnInit {
  staff: ProviderStaff = new ProviderStaff;
  isEdit = false;
  breadcrumbs = [];
  isNodeOpened = false;
  isContinueForm = true;
  metaData = [];
  staffForm: FormGroup;
  discardTo;
  isAttachmentRequired = false;
  url: any;
  providerId: number;
  staffID: number;
  currentDate: Date;
  staffName: string;
  recruitmentInquiryID: number;
  getRequest: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _localValues: LocalValues, public _activatedRoute: ActivatedRoute, public _team: TeamFormService, public _router: Router, public _caseTeam: CaseTeamService,
    public _provider: ProviderService, public _fb: FormBuilder, public _opencard: OpencardsService,
    public _client: ClildFormService) { }

  ngOnInit() {
    if (this._router.url.includes('/provider/opencard/recruitment/staff/new')) {
      this.breadcrumbs.push(
        { label: 'Person Types', href: "/reports/person/types", active: '' },
        { label: 'Provider List', href: "/reports/provider/view", active: '' },
        { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
        { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
        { label: 'Recruitment', active: '', href: '/provider/opencard/recruitment/detail' },
        { label: 'Recruitment-staff List', active: '', href: '/provider/opencard/recruitment/staff/view' },
        { label: 'Recruitment-staff', active: 'active' }
      )
      this.isNodeOpened = true;
      this.discardTo = '/provider/opencard/recruitment/staff/view';
    }
    else if (this._router.url.includes('/provider/opencard/recruitment/staff/detail')) {
      this.getRecruitmentStaffRecByID();
      this.breadcrumbs.push(
        { label: 'Person Types', href: "/reports/person/types", active: '' },
        { label: 'Provider List', href: "/reports/provider/view", active: '' },
        { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
        { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
        { label: 'Recruitment', active: '', href: '/provider/opencard/recruitment/detail' },
        { label: 'Recruitment-staff List', active: '', href: '/provider/opencard/recruitment/staff/view' },
        { label: 'Recruitment-staff', active: 'active' }
      )
      this.isNodeOpened = true;
      this.discardTo = '/provider/opencard/recruitment/staff/view';
    }
    else {
      this.breadcrumbs.push(
        { label: 'Person Types', href: "/reports/person/types", active: '' },
        { label: 'Provider List', href: "/reports/provider/view", active: '' },
        { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
        { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
        { label: 'Demographics and supports', active: '', href: '/provider/dashboard/demographics-support' },
        { label: 'Staff List', active: '', href: '/provider/opencard/staff/view' },
        { label: 'Staff', active: 'active' }
      )
      this.discardTo = '/provider/opencard/staff/view';
    }
    this.initialDataFetch();
    this.formValidation()
    if (this._router.url === '/provider/opencard/staff/detail') {
      this.isAttachmentRequired = true;
      this.getRecByID();
    }


  }

  formAction(source: any) {
    if (this._router.url.includes('/provider/opencard/recruitment/staff/new') || this._router.url.includes('/provider/opencard/recruitment/staff/detail')) {
      this.recruitmentFormAction(source);
    }
    else {
      !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
      !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
      !isNullOrUndefined(source.personTypeID) ? source.personTypeID = source.personTypeID.personTypeID : null;
      !isNullOrUndefined(source.staffID) ? source.staffID = source.staffID.staffID : null;
      source.providerID = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
      !isNullOrUndefined(source.providerSFAStaffID) ? this.update(source) : this.save(source);
    }

  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'personType':
        obj = 'personType';
        break;
      case 'staff':
        obj = 'staff';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      data.dropDown.map((item: any) => {
        item['fullName'] = `${item.lastName} ${item.firstName}
        ( ${!isNullOrUndefined(item.email) ? item.email : 'Not provided!'})`;
      })
      this.metaData = data.dropDown;
    })
  }

  save(source: ProviderStaff) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.saveStaff(source).then(() => {
      loader.style.display = 'none';
      this._router.navigate(['/provider/opencard/staff/view']);
    })
  }

  update(source: ProviderStaff) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.saveStaff(source).then(() => {
      loader.style.display = 'none';
      this._router.navigate(['/provider/opencard/staff/view']);
    })
  }

  formValidation() {
    this.staffForm = this._fb.group({
      personType: [null],
      staff: [null],
      beginDate: [null],
      endDate: [null],
      notes: [null]
    })
  }

  getRecByID() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { providerSFAStaffID: this._client.getId() }
    this.getRequest = req;
    this._provider.getByIdStaff(req).then((data: any) => {
      loader.style.display = 'none';
      this.staffForm.disable();
      this.isEdit = true;
      
      !isNullOrUndefined(data.ProviderSFAStaff.staffID) ? this.staff.staffID = {
        staffID: data.ProviderSFAStaff.staffID.StaffID,
        StaffName: `${data.ProviderSFAStaff.staffID.lastName} ${data.ProviderSFAStaff.staffID.firstName}
     ( ${!isNullOrUndefined(data.ProviderSFAStaff.staffID.email) ? data.ProviderSFAStaff.staffID.email : 'Not provided!'})`
      } : null;
      !isNullOrUndefined(data.ProviderSFAStaff.beginDate) ? this.staff.beginDate = new Date(data.ProviderSFAStaff.beginDate) : null;
      !isNullOrUndefined(data.ProviderSFAStaff.endDate) ? this.staff.endDate = new Date(data.ProviderSFAStaff.endDate) : null;
      !isNullOrUndefined(data.ProviderSFAStaff.notes) ? this.staff.notes = data.ProviderSFAStaff.notes : null;
      !isNullOrUndefined(data.ProviderSFAStaff.personTypeID) ? this.staff.personTypeID = data.ProviderSFAStaff.personTypeID : null;
      !isNullOrUndefined(data.ProviderSFAStaff.providerID) ? this.staff.providerID = data.ProviderSFAStaff.providerID : null;
      !isNullOrUndefined(data.ProviderSFAStaff.providerSFAStaffID) ? this.staff.providerSFAStaffID = data.ProviderSFAStaff.providerSFAStaffID : null;

      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.ProviderSFAStaff.changedBy) ? data.ProviderSFAStaff.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.ProviderSFAStaff.changedDate) ? moment(data.ProviderSFAStaff.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.ProviderSFAStaff.enteredBy) ? data.ProviderSFAStaff.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.ProviderSFAStaff.enteredDate) ? moment(data.ProviderSFAStaff.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.isEdit = true;
    this.staffForm.enable();
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/provider/opencard/staff/detail') {
      this.url = '/reports/attachment-document/providers/sfm-staff';
    }
    return this._router.navigate([this.url])
  }

  recruitmentFormAction(source) {
    !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
    !isNullOrUndefined(source.personTypeID) ? source.personTypeID = source.personTypeID.personTypeID : null;
    !isNullOrUndefined(source.staffID) ? source.staffID = source.staffID.staffID : null;

    source['recruitmentInquiryID'] = this.recruitmentInquiryID;
    source["changedBy"] = this.staffName;
    source["enteredBy"] = this.staffName;
    source["changedDate"] = Date.parse(this.currentDate.toDateString());
    source["enteredDate"] = Date.parse(this.currentDate.toDateString());

    !isNullOrUndefined(source.recruitmentStaffID) ? this.updateRecruitmentStaff(source) : this.saveRecruitmentStaff(source);

  }

  saveRecruitmentStaff(source: ProviderStaff) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.saveRecruitmentStaff(source).then(() => {
      loader.style.display = 'none';
      this._router.navigate(['/provider/opencard/recruitment/staff/view'], {
        queryParams: {
          'action': 'list'
        },
        queryParamsHandling: 'merge'
      });
    })
  }

  updateRecruitmentStaff(source: ProviderStaff) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.updateRecruitmentStaff(source).then(() => {
      loader.style.display = 'none';
      this._router.navigate(['/provider/opencard/recruitment/staff/view'], {
        queryParams: {
          'action': 'list'
        },
        queryParamsHandling: 'merge'
      });
    })
  }

  getRecruitmentStaffRecByID() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.getRequest = { recruitmentStaffID: this._client.getId() }
    this._provider.getByIdRecruitmentStaff(this.getRequest).then((data: any) => {
      loader.style.display = 'none';
      this.staffForm.disable();
      this.isEdit = true;
      !isNullOrUndefined(data.recruitmentStaff.staffID) ? this.staff.staffID = {
        staffID: data.recruitmentStaff.staffID.staffID,
        StaffName: `${data.recruitmentStaff.staffID.lastName} ${data.recruitmentStaff.staffID.firstName}
     ( ${!isNullOrUndefined(data.recruitmentStaff.staffID.email) ? data.recruitmentStaff.staffID.email : 'Not provided!'})`
      } : null;
      !isNullOrUndefined(data.recruitmentStaff.beginDate) ? this.staff.beginDate = new Date(data.recruitmentStaff.beginDate) : null;
      !isNullOrUndefined(data.recruitmentStaff.endDate) ? this.staff.endDate = new Date(data.recruitmentStaff.endDate) : null;
      !isNullOrUndefined(data.recruitmentStaff.notes) ? this.staff.notes = data.recruitmentStaff.notes : null;
      !isNullOrUndefined(data.recruitmentStaff.personTypeID) ? this.staff.personTypeID = data.recruitmentStaff.personTypeID : null;
      !isNullOrUndefined(data.recruitmentStaff.recruitmentStaffID) ? this.staff.recruitmentStaffID = data.recruitmentStaff.recruitmentStaffID : null;

    })
  }

  async initialDataFetch() {
    this.providerId = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
    this.staffID = parseInt(localStorage.getItem('UserId')) || 4620;
    this.recruitmentInquiryID = parseInt(this._activatedRoute.snapshot.queryParamMap.get('ri_id'));
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

  async filterProviderPersonType(event: any) {
    let request = {};

    if (this._router.url.includes('/provider/opencard/recruitment/staff')) {
      switch (this._localValues.providerContractStateId) {
        case 33:
          request['isRecruitmentStaff_NE'] = true;
          break;

        case 34:
          request['isRecruitmentStaff_KS'] = true;
          break;

        case 35:
          request['isRecruitmentStaff_OK'] = true;
          break;

        default:
          request['isRecruitmentStaff_KS'] = true;

      }
    }
    else {
      switch (this._localValues.providerContractStateId) {
        case 33:
          // request['isRecruitmentStaff_NE'] = true;
          request['IsProviderStaffNE'] = true;
          break;

        case 34:
          // request['isRecruitmentStaff_KS'] = true;
          request['isProviderStaffKS'] = true;
          break;

        case 35:
          // request['isRecruitmentStaff_OK'] = true;
          request['isProviderStaffOK'] = true;
          break;

        // default:
        //   request['isRecruitmentStaff_KS'] = true;


      }
    }

    this._caseTeam.getPersonTypeListCS(request).then((data: any) => {
      this.metaData = data.personType.filter(item => item.personType.toLowerCase().indexOf(event.query) !== -1);
    })

  }

  async filterProviderStaff(event: any) {
    // let response = await this._opencard.getSFAStaff();
    let req = {
      "Object": "staff",
      "value": event.query
    }
    let response = await this._opencard.getStaffLists(req);

    response.dropDown.map((item: any) => {
      item['StaffName'] = `${item.lastName} ${item.firstName}
      ( ${!isNullOrUndefined(item.email) ? item.email : 'Not provided!'})`;
    })
    this.metaData = response.dropDown;

    // this.metaData = response.dropDown.filter(item => item.StaffName.toLowerCase().indexOf(event.query) !== -1);
  }

}
