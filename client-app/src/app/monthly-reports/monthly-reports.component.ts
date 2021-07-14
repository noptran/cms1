import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MonthlyReports } from './monthly-reports';
import { Router, ActivatedRoute } from '@angular/router';
import { ClildFormService } from '../child-forms/child-forms.service';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import { CaseTeamService } from '../case-team/case-team.service';
import * as moment from 'moment';
import {LocalValues} from '../local-values';
import { FormFooterComponent } from '../form-footer/form-footer.component'

@Component({
  selector: 'app-monthly-reports',
  templateUrl: './monthly-reports.component.html',
  styleUrls: ['./monthly-reports.component.scss']
})
export class MonthlyReportsComponent implements OnInit {
  monthlyReportsForm: FormGroup;
  reports: MonthlyReports = new MonthlyReports();
  isEdit = false;
  isShowFooter = false;
  discardTo = '/reintegration/referral/opencard/monthly-reports/view';
  metaData = [];
  breadcrumbs = [];
  quickMenu = "referrel";
  url: any;
  isAttachmentRequired = false;
  isEmail = false;
  request: any;
  mode = null;
  staffEmail: string;

  @ViewChild(FormFooterComponent, { static: false }) footerComponent: FormFooterComponent;
  isFormLog = false;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: ''
  }

  constructor(public _activateRoute: ActivatedRoute, public _router: Router, public _caseTeam: CaseTeamService, public _client: ClildFormService,
    public _opencard: OpencardsService, public _fb: FormBuilder, public _localValues: LocalValues) { }

  ngOnInit() {
    this.mode = (this._activateRoute.snapshot.queryParamMap.get('mode'));
    this.formValidation();
    this.getStaffDetail();
    if (this._router.url.includes('/monthly-reports/detail')) {
      this.getById()
      this.isAttachmentRequired = true;
      this.isEmail = true;
    } else {
      this.isShowFooter = true;
    }
    this.breadcrumbs = [
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Monthly Reports List', active: '', href: '/reintegration/referral/opencard/monthly-reports/view' },
      { label: 'Monthly Reports', active: 'active' },
    ]
    let referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    if (referralTypeId === 4) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('monthlyRepots-NCFCH', this.breadcrumbs)
    }
    if (referralTypeId === 8) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('monthlyRepots-NCHS', this.breadcrumbs)
    }
  }

  formValidation() {
    this.monthlyReportsForm = this._fb.group({
      referralID: [null],
      staffID: [null],
      dateSent: [null],
      emailedNotes: [null],
      monthlyReportTypeID: [null, Validators.compose([Validators.required])],
      isEducationProgress: [null],
      isEmailed: [null],
      isMedicationSideEffects: [null],
      monthReported: [null, Validators.compose([Validators.required])],
      sponsorID: [null, Validators.compose([Validators.required])],
      notes: [null]
    })
  }

  formAction(source: any) {
    !isNullOrUndefined(source.monthReported) ? source.monthReported = Date.parse(source.monthReported) : null;
    !isNullOrUndefined(source.monthlyReportTypeID) ? source.monthlyReportTypeID = source.monthlyReportTypeID.monthlyReportTypeID : null;
    !isNullOrUndefined(source.staffID) ? source.staffID = source.staffID.StaffID : null;
    !isNullOrUndefined(source.sponsorID) ? source.sponsorID = source.sponsorID.sponsorID : null;
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey()
    !isNullOrUndefined(source.monthlyReportID) ? this.update(source) : this.save(source);
  }

  save(source: any) {
    if (this.monthlyReportsForm.valid) {
      let loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      this._opencard.saveMonthlyReports(source).then((data) => {
        if (data) {
          loader.style.display = 'none';
          swal('Save', 'Record has been saved!', 'success');
          this._client.storeId(data.monthlyReport.monthlyReportID);
          return this._router.navigate(['/reintegration/referral/opencard/monthly-reports/detail'], { queryParamsHandling: "preserve" });
          // return this._router.navigate(['/reintegration/referral/opencard/monthly-reports/view'])
        } else {
          loader.style.display = 'none';
        }
      })
    } else {
      swal('Warning', 'Please fill the mandatory fields', 'warning');
    }
  }

  update(source: any) {
    if (this.monthlyReportsForm.valid) {
      let loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      this._opencard.updateMonthlyReports(source).then((data) => {
        if (data) {
          loader.style.display = 'none';
          swal('Upadate', 'Record has been updated!', 'success');
          return this._router.navigate(['/reintegration/referral/opencard/monthly-reports/view'], { queryParamsHandling: "preserve" })
        } else {
          loader.style.display = 'none';
        }
      })
    } else {
      swal('Warning', 'Please fill the mandatory fields', 'warning');
    }
  }
  emailSubjectContent = {
    subject: "",
    content: ""
  }

  getById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.request = { monthlyReportID: this._client.getId() }
    this._opencard.getByIdMonthlyReports(this.request).then((data) => {
      !isNullOrUndefined(data.MonthlyReport.staffID) ? this.staffEmail = data.MonthlyReport.staffID.email : '';
      if (data.MonthlyReport.isActive) {
        !isNullOrUndefined(data.MonthlyReport.monthReported) ? data.MonthlyReport.monthReported = moment(data.MonthlyReport.monthReported).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.MonthlyReport.monthReported) ? data.MonthlyReport.monthReported = moment.utc(data.MonthlyReport.monthReported).format('MM/DD/YYYY HH:mm') : null;
      }
      !isNullOrUndefined(data.MonthlyReport.staffID) ? data.MonthlyReport.staffID['fullName'] = data.MonthlyReport.staffID.lastName + ' ' + data.MonthlyReport.staffID.firstName + ' ( ' + data.MonthlyReport.staffID.email + ' ) ' : null;
      !isNullOrUndefined(data.MonthlyReport.sponsorID) ? data.MonthlyReport.sponsorID['fullName'] = data.MonthlyReport.sponsorID.lastName + ' ' + data.MonthlyReport.sponsorID.firstName + ' ( ' + data.MonthlyReport.sponsorID.email + ' ) ' : null;
      this.reports = data.MonthlyReport;
      this.monthlyReportsForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.MonthlyReport.changedBy) ? data.MonthlyReport.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.MonthlyReport.changedDate) ? moment(data.MonthlyReport.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.MonthlyReport.enteredBy) ? data.MonthlyReport.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.MonthlyReport.enteredDate) ? moment(data.MonthlyReport.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      loader.style.display = 'none';
      ////Email content
      const date = new Date(data.MonthlyReport.monthReported);
      const month = date.toLocaleString('default', { month: 'long' });
      var n = date.getFullYear();
      this.emailSubjectContent.subject = localStorage.getItem("clientName") + ' - ' + month + " " + n;
      this.emailSubjectContent.content = "The Client's monthly report is attached. Past and current monthly reports are available in CMS. They can be found in the Client's tree under the header Monthly Reports.";
      this.isShowFooter = true;
      if (this.mode) {
        this.footerComponent.onClickAttachments();
      }
    })
  }

  getMetaData(event: any, label: any) {
    let obj: any, req: any, email: any;
    switch (label) {
      case 'staff':
        obj = 'staff';
        break;
      case 'agency':
        obj = 'sponsorName';
        break;
      case 'monthlyReportType':
        obj = 'monthlyReportType';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data) => {
      if (label === 'staff') {
        data.dropDown.map((item) => {
          item['StaffID'] = item.staffID;
        })
      }
      data.dropDown.filter((item) => {
        email = !isNullOrUndefined(item.email) ? item.email : 'Email id not provided!';
        item['fullName'] = item.lastName + ' ' + item.firstName + ' ' + email;
      })
      this.metaData = data.dropDown
    })
  }

  editForm() {
    this.isEdit = false;
    this.monthlyReportsForm.enable();
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/monthly-reports/detail') {
      this.url = '/reports/attachment-document/rfc/monthly-reports';
    }
    else {
      this.url = '/reports/attachment-document/monthly-reports';
    }
    return this._router.navigate([this.url])
  }

  onSendEmailOptions() {
  }
  staffLists = [];
  getStaffDetail() {
    var req = { "referralID": parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey() }
    this._caseTeam.getReferralBaseStaff(req).then((data) => {
      data.staffList.map((item => {
        item['fullName'] = item.FirstName + ' ' + item.LastName + ' ( ' + item.Email + ' ) ';
      }))
      this.staffLists = data.staffList;
      this.reports.staffID = this.staffLists[0];
    });
  }

}
