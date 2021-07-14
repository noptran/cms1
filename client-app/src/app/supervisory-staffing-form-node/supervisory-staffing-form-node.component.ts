import { Component, OnInit } from '@angular/core';
import { SupervisoryStaffingNode } from './supervisory-staffing-node';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import { ClildFormService } from '../child-forms/child-forms.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';
import { CaseTeamService } from '../case-team/case-team.service';
import { isNullOrUndefined } from 'util';
import html2pdf from 'html2pdf.js';
import * as moment from 'moment';

@Component({
  selector: 'app-supervisory-staffing-form-node',
  templateUrl: './supervisory-staffing-form-node.component.html',
  styleUrls: ['./supervisory-staffing-form-node.component.scss']
})
export class SupervisoryStaffingFormNodeComponent implements OnInit {
  ssf: SupervisoryStaffingNode = new SupervisoryStaffingNode();
  ssfForm: FormGroup;
  breadcrumbs = [];
  quickMenu = "referrel"
  metaData = [];
  isEdit = false;
  discardTo = '/reports/rfc-supervisory-staffing-form/view';
  previousClientInfo: any;
  isPrint = true;
  url: any;
  currentRecId: any;
  isAttachmentRequired = false;
  req: any;
  clientName = null;
  staffPerforming = null;
  reasonForReferral = null;
  supervisoryStaffingId = null;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _opencards: OpencardsService, public _router: Router, public _client: ClildFormService,
    public _fb: FormBuilder, public _caseTeam: CaseTeamService) { }

  ngOnInit() {
    this.formValidation();
    this.fetchingPreviousRecInformation();
    this.breadcrumbsSetup();
    this.getClientInfo('CLIENT');
    if (this._router.url.includes('/reports/rfc-supervisory-staffing-form/detail')) {
      this.getRecById();
      this.isAttachmentRequired = true;
    }
    this.getReferralReason();


  }

  formValidation() {
    this.ssfForm = this._fb.group({
      additionalRiskConcerns: [null],
      additionalSafetyConcerns: [null],
      contributingFactorsSafetyConcerns: [null],
      copiedFlag: [null],
      courtUpdate: [null],
      date: [null],
      familyStrengthsMitigatingRisks: [null],
      familyStrengthsMitigatingSafetyConcerns: [null],
      inProgress: [null],
      isConcatenated: [null],
      kinship: [null],
      newSupervisorStaffing: [null],
      newWorkerStaffing: [null],
      nineMonthStaffing: [null],
      progressTowardsAchievingPermanency: [null],
      reviewOfNCFAS: [null],
      riskConcernsIdentified: [null],
      safetyConcernsIdentified: [null],
      safetyPlanDeveloped: [null],
      servicePlanDeveloped: [null],
      servicesNeededMitigateConcerns: [null],
      sixMonthStaffing: [null],
      staffID: [null],
      supervisoryStaffingLinkedID: [null],
      threeMonthStaffing: [null],
      toBeCompleted: [null],
      transitionPlan: [null],
      visitationUpdate: [null],
      clientID: [null]
    })
    this.ssf.date = new Date(Date.now());
  }

  formAction(req: SupervisoryStaffingNode) {
    console.log(' this.ssf ', this.ssf)
    console.log('req is', req)
    let referralId: any, referalTypeId: any;
    referralId = parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey();
    referalTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
    req.referralID = referralId;
    req.referralTypeID = referalTypeId;
    !isNullOrUndefined(req.staffID) ? req.staffID = req.staffID.staffID : null;
    !isNullOrUndefined(req.clientID) ? req.clientID = req.clientID.clientID : null;
    !isNullOrUndefined(req.date) ? req.date = Date.parse(req.date) : null;
    if (req.supervisoryStaffingID) {
      this.save(req);
    } else {
      this.save(req);
    }
  }

  save(req: SupervisoryStaffingNode) {
    console.log(' this.ssf ', this.ssf)
    console.log('req is', req)
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencards.saveSupervisoryStaffing(req).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been retained!', 'success');
      this._router.navigate(['/reports/rfc-supervisory-staffing-form/view']);
    })
  }

  update(req: SupervisoryStaffingNode) {
    console.log(' this.ssf ', this.ssf)
    console.log('req is', req)
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencards.updateSupervisoryStaffing(req).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this._router.navigate(['/reports/rfc-supervisory-staffing-form/view']);
    })
  }

  getMetaData(event: any, label: any) {
    let obj: any, req: any
    switch (label) {
      case 'client':
        obj = 'client';
        break;
      case 'staff':
        obj = 'staff';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      data.dropDown.map((item: any) => {
        item['fullName'] = item.lastName + ', ' + item.firstName + '( ' + item.email + ' )';
      })
      this.metaData = data.dropDown;
    })
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { supervisoryStaffingID: this._client.getId() }
    this.supervisoryStaffingId = this._client.getId();
    this._opencards.getByIdSupervisoryStaffing(this.req).then((data: any) => {

      if (data.supervisoryStaffing.isActive) {
        !isNullOrUndefined(data.supervisoryStaffing.date) ? data.supervisoryStaffing.date = moment(data.supervisoryStaffing.date).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.supervisoryStaffing.date) ? data.supervisoryStaffing.date = moment.utc(data.supervisoryStaffing.date).format('MM/DD/YYYY HH:mm') : null;
      }
      !isNullOrUndefined(data.supervisoryStaffing.staffID) ? data.supervisoryStaffing.staffID['fullName'] = data.supervisoryStaffing.staffID.lastName +
        ' ' + data.supervisoryStaffing.staffID.firstName + ' ( ' + data.supervisoryStaffing.staffID.email + ' )' : null;
      !isNullOrUndefined(data.supervisoryStaffing.clientID) ? data.supervisoryStaffing.clientID['clientName'] = data.supervisoryStaffing.clientID.lastName + ',' + data.supervisoryStaffing.clientID.firstName : null;
      if (data.supervisoryStaffing.clientID) {
        this.clientName = data.supervisoryStaffing.clientID.clientName;
      }
      else {
        this.clientName = null;
      }
      if (data.supervisoryStaffing.staffID) {
        this.staffPerforming = data.supervisoryStaffing.staffID.fullName;
      }
      else {
        this.staffPerforming = null;
      }
      loader.style.display = 'none';
      this.ssf = data.supervisoryStaffing;
      this.isEdit = true;
      this.ssfForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.supervisoryStaffing.changedBy) ? data.supervisoryStaffing.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.supervisoryStaffing.changedDate) ? moment(data.supervisoryStaffing.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.supervisoryStaffing.enteredBy) ? data.supervisoryStaffing.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.supervisoryStaffing.enteredDate) ? moment(data.supervisoryStaffing.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.ssfForm.enable();
    this.isEdit = false;
  }

  fetchingPreviousRecInformation() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let lastRec: any;
    let req = {
      referralID: parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey(),
      beginPagination: 1,
      endPagination: 3,
      sort: { column: "supervisoryStaffingID", mode: "desc" }
      // sort: { column: "caseActivityID", mode: "desc" }

    }
    // this._opencards.getListAllSupervisoryStaffing(req).then((data: any) => {
    this._opencards.getListAllSupervisoryStaffingRfc(req).then((data: any) => {
      if (data.supervisoryStaffingList.length > 0) {
        let preRec = data.supervisoryStaffingList.shift();
        lastRec = data.supervisoryStaffingList.pop();
        if (this.currentRecId !== undefined) {
          if (this.currentRecId > preRec.supervisoryStaffingID) {
            this._opencards.getByIdSupervisoryStaffing({ supervisoryStaffingID: preRec.supervisoryStaffingID }).then((data: any) => {
              loader.style.display = 'none';
              this.previousClientInfo = data.supervisoryStaffing;
              this.ssf.courtUpdate = this.previousClientInfo.courtUpdate;
              this.ssf.visitationUpdate = this.previousClientInfo.visitationUpdate;
              this.ssf.kinship = this.previousClientInfo.kinship;
              this.ssf.reviewOfNCFAS = this.previousClientInfo.reviewOfNCFAS;
              this.ssf.transitionPlan = this.previousClientInfo.transitionPlan;
              this.ssf.toBeCompleted = this.previousClientInfo.toBeCompleted;
              this.ssf.progressTowardsAchievingPermanency = this.previousClientInfo.progressTowardsAchievingPermanency;
            })
          }
        } else {
          this._opencards.getByIdSupervisoryStaffing({ supervisoryStaffingID: preRec.supervisoryStaffingID }).then((data: any) => {
            loader.style.display = 'none';
            this.previousClientInfo = data.supervisoryStaffing;
            this.ssf.courtUpdate = this.previousClientInfo.courtUpdate;
            this.ssf.visitationUpdate = this.previousClientInfo.visitationUpdate;
            this.ssf.kinship = this.previousClientInfo.kinship;
            this.ssf.reviewOfNCFAS = this.previousClientInfo.reviewOfNCFAS;
            this.ssf.transitionPlan = this.previousClientInfo.transitionPlan;
            this.ssf.toBeCompleted = this.previousClientInfo.toBeCompleted;
            this.ssf.progressTowardsAchievingPermanency = this.previousClientInfo.progressTowardsAchievingPermanency;
          })
        }


      }
      else {
        loader.style.display = 'none';
      }

    })
  }
  isPrintEnabled = false;
  print() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.isPrintEnabled = true;
    setTimeout(() => {
      let opt = {
        margin: 0.3,
        filename: 'superviosry_staffing_form_' + this._client.getId() + '.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: 'avoid-all', before: '#page2el' }
      };
      let element = document.getElementById('pdf');
      return html2pdf().from(element).set(opt).save().then(() => {
        this.isPrintEnabled = false;
        loader.style.display = 'none';
      });
    }, 1000)

  }

  navigateToCMS() {

    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/supervisory-staffing-form/new' || currentURL == '/reintegration/referral/opencard/supervisory-staffing-form/detail') {
      this.url = '/reports/attachment-document/rfc/supervisor-staffing';
    }
    else {
      this.url = '/reports/attachment-document/supervisor-staffing';
    }
    return this._router.navigate([this.url])
  }

  breadcrumbsSetup() {
    let referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
    if (referralTypeId === 2) {
      this.breadcrumbs.push(
        { label: 'List', href: "/reports/client", active: '' },
        { label: 'Form', href: "/reports/client/details", active: '' },
        { label: 'Case List', href: "/reports/opencards/list/client/case", active: '' },
        { label: 'Case Form', href: "/reports/referral/family-preservation/detail", active: '' },
        { label: 'Supervisory Staffing List', active: '', href: '/reports/rfc-supervisory-staffing-form/view' },
        { label: 'Supervisory Staffing Form', active: 'active' }
      );
    } else {

      this.breadcrumbs.push(
        { label: 'List', href: "/reports/client", active: '' },
        { label: 'Form', href: "/reports/client/details", active: '' },
        { label: 'Case List', href: "/reports/opencards/list/client/case", active: '' },
        { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
        { label: 'Supervisory Staffing List', active: '', href: '/reports/rfc-supervisory-staffing-form/view' },
        { label: 'Supervisory Staffing Form', active: 'active' }
      );

    }
  }

  getClientInfo(param) {

    const req = {
      clientID: parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey(),
    }
    this._opencards.getClientBasicInfo(req).then((data: any) => {
      if (data.clientProfile.length > 0 && data.clientProfile[0].FACTS || data.clientProfile[0].FACTS == "") {
        if (param == 'CLIENT') {
          this.ssf['clientID'] = {
            clientName: `${data.clientProfile[0].LastName}, ${data.clientProfile[0].FirstName}`,
            clientID: parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey()
          }
        }
      }
    })

  }

  getReferralReason() {
    const req = {
      referralID: parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey(),
      supervisoryStaffingID: this.supervisoryStaffingId
    }
    this._opencards.getReferralReasonSupervisor(req).then((data: any) => {
      this.reasonForReferral = (data.referralReason) ? data.referralReason.ReferralReason : null;
    });
  }

}
