import { Component, OnInit } from '@angular/core';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import { ClildFormService } from '../child-forms/child-forms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { CaseTeamService } from '../case-team/case-team.service';
import { isNullOrUndefined, log } from 'util';
import html2pdf from 'html2pdf.js';
import { SupervisoryStaffingNode } from '../supervisory-staffing-form-node/supervisory-staffing-node';
import * as moment from 'moment';
import { PersonTypesProfileService } from '../components/person-types-profile-info-module/person-types-profile.service';

@Component({
  selector: 'app-supervisory-staffing-form-for-supervisors',
  templateUrl: './supervisory-staffing-form-for-supervisors.component.html',
  styleUrls: ['./supervisory-staffing-form-for-supervisors.component.scss']
})
export class SupervisoryStaffingFormForSupervisorsComponent implements OnInit {
  ssf: SupervisoryStaffingNode = new SupervisoryStaffingNode();
  ssfForm: FormGroup;
  breadcrumbs = [];
  metaData = [];
  isEdit = false;
  discardTo = '/reports/supervisory-staffing-for-superviosrs/view';
  previousClientInfo: any;
  isPrint = true;
  clientDetails: any;
  clientKaecsesId = localStorage.getItem('kaecses');
  supervisoryStaffingHistoryList = [];

  safetyConcernsIdentified: any;
  familyStrengthsMitigatingSafetyConcerns: any;
  contributingFactorsSafetyConcerns: any;
  riskConcernsIdentified: any;
  familyStrengthsMitigatingRisks: any;
  servicesNeededMitigateConcerns: any;
  courtUpdate: any;
  progressTowardsAchievingPermanency: any;
  reviewOfNCFAS: any;
  toBeCompleted: any;
  transitionPlan: any;
  visitationUpdate: any;
  kinship: any;
  preRec: any;
  quickMenu: any;
  req: any;
  reasonForReferral = null;
  supervisoryStaffingId = null;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _service: PersonTypesProfileService, public _opencards: OpencardsService, public _router: Router, public _client: ClildFormService,
    public _fb: FormBuilder, public _caseTeam: CaseTeamService) { }

  ngOnInit() {
    this.formValidation();
    this.fetchingPreviousRecInformation();
    this.getClientDetails();
    if (this._router.url.includes('/reports/supervisory-staffing-for-superviosrs/detail')) {
      this.getRecById();
    }
    this.getReferralReason();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case List', href: "/reports/opencards/list/client/case", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      // { label: 'Supervisory Staffing For Supervisor List', active: '', href: '/reports/supervisory-staffing-for-superviosrs/view' },
      { label: 'Supervisory Staffing For Supervisor List', active: '', href: '/reports/supervisory-staffing-for-superviosrs/view' },
      { label: 'Supervisory Staffing For Supervisor Form', active: 'active' }
    );
  }

  formValidation() {
    this.ssfForm = this._fb.group({
      additionalRiskConcerns: [null],
      additionalSafetyConcerns: [null],
      contributingFactorsSafetyConcerns: [null],
      copiedFlag: [null],
      courtUpdate: [null],
      date: [null, Validators.compose([Validators.required])],
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
      staffID: [null, Validators.compose([Validators.required])],
      supervisoryStaffingLinkedID: [null],
      threeMonthStaffing: [null],
      toBeCompleted: [null],
      transitionPlan: [null],
      visitationUpdate: [null],
      clientID: [null],
      contributingFactors: [null],
      familyStrengths: [null],
    })
    this.ssf.date = new Date(Date.now());
  }

  formAction(req: SupervisoryStaffingNode) {
    if (this.ssfForm.valid) {
      let referralId: any, referalTypeId: any;
      referralId = parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey();
      referalTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
      req.referralID = referralId;
      req.referralTypeID = referalTypeId;
      !isNullOrUndefined(req.staffID) ? req.staffID = req.staffID.staffID : null;
      !isNullOrUndefined(req.clientID) ? req.clientID = req.clientID.clientID : null;
      !isNullOrUndefined(req.date) ? req.date = Date.parse(req.date) : null;
      !isNullOrUndefined(req.additionalSafetyConcerns === 'true') ? req.additionalSafetyConcerns = true : false;
      !isNullOrUndefined(req.safetyPlanDeveloped === 'true') ? req.safetyPlanDeveloped = true : false;
      !isNullOrUndefined(req.servicePlanDeveloped === 'true') ? req.servicePlanDeveloped = true : false;
      !isNullOrUndefined(req.additionalRiskConcerns === 'true') ? req.additionalRiskConcerns = true : false;
      if (req.supervisoryStaffingID) {
        this.save(req);
      } else {
        this.save(req);
      }
    } else {
      swal('Warning', 'Please fill the mandatoy fields', 'info');
    }

  }

  save(req: SupervisoryStaffingNode) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencards.saveSupervisoryStaffing(req).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been retained!', 'success');
      this._router.navigate(['/reports/supervisory-staffing-for-superviosrs/view']);
    })
  }

  update(req: SupervisoryStaffingNode) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencards.updateSupervisoryStaffing(req).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this._router.navigate(['/reports/supervisory-staffing-for-superviosrs/view']);
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
    this.req = { supervisoryStaffingID: this._client.getId() };
    this.supervisoryStaffingId = this._client.getId();
    this._opencards.getByIdSupervisoryStaffing(this.req).then((data: any) => {
      !isNullOrUndefined(data.supervisoryStaffing.date) ? data.supervisoryStaffing.date = moment.utc(data.supervisoryStaffing.date).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.supervisoryStaffing.staffID) ? data.supervisoryStaffing.staffID['fullName'] = data.supervisoryStaffing.staffID.lastName +
        ' ' + data.supervisoryStaffing.staffID.firstName + ' ( ' + data.supervisoryStaffing.staffID.email + ' )' : null;
      !isNullOrUndefined(data.supervisoryStaffing.clientID) ? data.supervisoryStaffing.clientID['clientName'] = data.supervisoryStaffing.clientID.lastName + ',' + data.supervisoryStaffing.clientID.firstName : null;
      !isNullOrUndefined(data.supervisoryStaffing.additionalSafetyConcerns === true) ? data.supervisoryStaffing.additionalSafetyConcern = 'true' : 'false';
      !isNullOrUndefined(data.supervisoryStaffing.safetyPlanDeveloped === true) ? data.supervisoryStaffing.safetyPlanDeveloped = 'true' : 'false';
      !isNullOrUndefined(data.supervisoryStaffing.servicePlanDeveloped === true) ? data.supervisoryStaffing.servicePlanDeveloped = 'true' : 'false';
      !isNullOrUndefined(data.supervisoryStaffing.additionalRiskConcerns === true) ? data.supervisoryStaffing.additionalRiskConcerns = 'true' : 'false';
      loader.style.display = 'none';
      this.ssf = data.supervisoryStaffing;
      // this.getClientInfo('CLIENT');
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
    let req = {
      referralID: parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey(),
      beginPagination: 1,
      endPagination: 3,
      sort: { column: "supervisoryStaffingID", mode: "desc" }
    }
    this._opencards.getListAllSupervisoryStaffingRfc(req).then((data: any) => {
      if (data.supervisoryStaffingList.length > 0) {
        this.preRec = data.supervisoryStaffingList.shift();
        loader.style.display = 'none';
        this.getExistingSupervisorStaffingForSupervisorList(this.preRec);
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
      let element = document.getElementById('pdf-supervisor');
      return html2pdf().from(element).set(opt).save().then(() => {
        loader.style.display = 'none';
      });
    }, 1000)



  }

  getClientDetails() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let referralDate = parseInt(localStorage.getItem('referralRFCBeginDate')), selectedReferralDetailRec: any;
    let req = {
      clientID: parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey(),
      referralID: parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey()
    }
    this._opencards.getClientAndReferralDetails(req).then((data: any) => {
      loader.style.display = 'none';
      data.clientReferral.filter((item: any) => {
        if (moment.utc(parseInt(item.ReferralDate)).format('MM/DD/YYYY HH:mm') == moment.utc(referralDate).format('MM/DD/YYYY HH:mm')) {
          selectedReferralDetailRec = item;
          this.clientDetails = selectedReferralDetailRec;

        }
      })
      this.getClientInfo('FACTS');
      this.getClientInfo('CLIENT');
    })
  }

  getExistingSupervisorStaffingForSupervisorList(preRec: any) {
    let req = { supervisoryStaffingID: preRec.supervisoryStaffingID, referralID: parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey() }
    this._opencards.getExistingListRecForSupervisor(req).then((data: any) => {
      this.previousClientInfo = true;
      this.safetyConcernsIdentified = data.supervisoryStaffingHistoryList[0].SafetyConcernsIdentified;
      this.familyStrengthsMitigatingSafetyConcerns = data.supervisoryStaffingHistoryList[0].FamilyStrengthsMitigatingSafetyConcerns;
      this.contributingFactorsSafetyConcerns = data.supervisoryStaffingHistoryList[0].ContributingFactorsSafetyConcerns;
      this.riskConcernsIdentified = data.supervisoryStaffingHistoryList[0].RiskConcernsIdentified;
      this.familyStrengthsMitigatingRisks = data.supervisoryStaffingHistoryList[0].FamilyStrengthsMitigatingRisks;
      this.servicesNeededMitigateConcerns = data.supervisoryStaffingHistoryList[0].ServicesNeededMitigateConcerns;
      this.courtUpdate = data.supervisoryStaffingHistoryList[0].CourtUpdate;
      this.progressTowardsAchievingPermanency = data.supervisoryStaffingHistoryList[0].ProgressTowardsAchievingPermanency;
      this.reviewOfNCFAS = data.supervisoryStaffingHistoryList[0].ReviewOfNCFAS;
      this.toBeCompleted = data.supervisoryStaffingHistoryList[0].ToBeCompleted;
      this.transitionPlan = data.supervisoryStaffingHistoryList[0].TransitionPlan;
      this.visitationUpdate = data.supervisoryStaffingHistoryList[0].VisitationUpdate;
      this.kinship = data.supervisoryStaffingHistoryList[0].Kinship;

    })
  }

  // getStaticProfileInfo() {
  //   let req = {};
  //   return new Promise((resolve) => {
  //     req['clientID'] = parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey();
  //     this._service.getPersonDetails(req).then(data => resolve(data.person))
  //   })
  // }

  getClientInfo(param) {

    const req = {
      clientID: parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey(),
    }
    this._opencards.getClientBasicInfo(req).then((data: any) => {
      if (data.clientProfile.length > 0 && data.clientProfile[0].FACTS || data.clientProfile[0].FACTS == "") {
        if (param == 'FACTS') {
          if (!this.clientDetails) {
            this.clientDetails = {};
          }
          this.clientDetails['Facts'] = data.clientProfile[0].FACTS;

        }
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
