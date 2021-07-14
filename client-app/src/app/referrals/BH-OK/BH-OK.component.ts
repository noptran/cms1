import { OnInit, Component } from "@angular/core";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import {LocalValues} from "../../local-values";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BHOK } from './bh-ok'
import { Router } from "@angular/router";
import swal from 'sweetalert2';
import { TeamFormService } from "../../team-form/team-form.service";
import * as moment from 'moment';

@Component({
  templateUrl: './BH-OK.component.html',
  styleUrls: ['./BH-OK.component.scss'],
  selector: 'app-bh-ok'
})
export class BHOKComponent implements OnInit {
  breadcrumbs = [];
  discardTo = '/reports/opencards/list/client/case';
  isOfficeSectionEnabled = true;
  bhokForm: FormGroup;
  bhOk: BHOK = new BHOK();
  editControll = false;
  metaData = [];
  bhokOpencards = []
  iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';
  isOpenCardsEnabled = false;
  isDetailsPage = false;
  isAttachment = false;
  currentNode = 'referral';
  isUploadModal = false;
  caseActivityAttachmentsList: any = [];
  sfcsNotes: string;
  isDownloadBtnDisable = false;
  uploadedFiles: any[] = [];
  filteredCaseActivityDocs = [];
  caseActivityDocumenTypes = [];
  isReasonForDeclingSelected = false;

  constructor(public _team: TeamFormService, public _router: Router, public _fb: FormBuilder, public _opencard: OpencardsService, public _localValues: LocalValues) { }

  ngOnInit() {
    this.formValidation();
    this.defineOpencards();
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Client', href: '/reports/client/details', active: '' },
      { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
      { label: 'BH-OK Referral', href: '', active: 'active' }
    )
    if (this._router.url == '/bh-ok/detail') {
      this._localValues.currentReferralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
      this.editControll = true;
      this.isOfficeSectionEnabled = false;
      this.isOpenCardsEnabled = true;
      this.isDetailsPage = true;
      this.getById();
    }
    if (this._router.url == '/bh-ok/new') {
      this.bhOk.initialReferralDate = new Date();
      this.bhOk.beginDate = new Date();
    }
  }

  formValidation() {
    this.bhokForm = this._fb.group({
      clientID: [null],
      countyID: [null, Validators.compose([Validators.required])],
      referralTypeID: [null],
      kk: [null],
      beginDate: [null],
      endDate: [null],
      enterBy: [null],
      initialReferralDate: [null],
      notes: [null],
      reasonForDeclineID: [null],
      dhsTrackingNumber: [null],
      dhsNotifiedDate: [null],
      placementEstablishedDate: [null],
      minutesSpent: [null],
      sfaOfficeID: [null],
      sfcsOfficeCoordinatorID: [null],
      sfcsWorkerID: [null],
      otherAgencyStaffID: [null],
      dHSStaffID: [null]
    })

  }

  getById() {
    let request = {
      referralID: parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey()
    }
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';

    this._opencard.getByIdBHOKreferral(request)
      .then((data) => {
        this.isAttachment = true;
        if (data.referral && data.referral.length > 0) {
          let bhokData = data.referral[0];
          (bhokData.initialReferralDate) ? bhokData.initialReferralDate = moment(bhokData.initialReferralDate).format('MM/DD/YYYY HH:mm') : bhokData.initialReferralDate = null;
          (bhokData.reasonForDeclineID) ? bhokData.reasonForDeclineID = { reasonForDeclineID: bhokData.reasonForDeclineID, ReasonForDecline: bhokData.reasonForDecline } : bhokData.reasonForDecline = null;
          (bhokData.dhsTrackingNumber) ? bhokData["dhsTrackingNumber"] = bhokData.dhsTrackingNumber : bhokData["dhsTrackingNumber"] = null;
          (bhokData.dhsNotifiedDate) ? bhokData["dhsNotifiedDate"] = moment(bhokData.dhsNotifiedDate).format('MM/DD/YYYY HH:mm') : bhokData["dhsNotifiedDate"] = null;
          (bhokData.countyID) ? bhokData.countyID = { countyID: bhokData.countyID, countyName: bhokData.countyName } : bhokData.countyID = null;
          (bhokData.kk) ? bhokData["kk"] = bhokData.kk : bhokData["kk"] = null;
          (bhokData.notes) ? bhokData["notes"] = bhokData.notes : bhokData["notes"] = null;
          (bhokData.beginDate) ? bhokData.beginDate = moment(bhokData.beginDate).format('MM/DD/YYYY HH:mm') : bhokData.beginDate = null;
          (bhokData.endDate) ? bhokData.endDate = moment(bhokData.endDate).format('MM/DD/YYYY HH:mm') : bhokData.endDate = null;
          (bhokData.placementEstablishedDate) ? bhokData.placementEstablishedDate = moment(bhokData.placementEstablishedDate).format('MM/DD/YYYY HH:mm') : bhokData.placementEstablishedDate = null;


          this.bhOk = bhokData;
        }

        this.bhokForm.disable();
        loader.style.display = 'none';
      })
      .catch((error) => {
        console.log("error in catch is", error)
        loader.style.display = 'none';
      })
  }

  editForm() {
    this.editControll = false;
    this.bhokForm.enable();
    this.bhokForm.controls['placementEstablishedDate'].disable();
    this.bhokForm.controls['beginDate'].disable();
    this.bhokForm.controls['endDate'].disable();
    this.bhokForm.controls['countyID'].disable();
  }

  async formAction(source: any) {
    let updateRequest: BHOK = new BHOK();
    if (this.bhokForm.valid) {
      let enteredBy = await this.getStaffName();
      if (source.referralID) {
        updateRequest["clientID"] = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey() || null;
        updateRequest["referralTypeID"] = 15;
        updateRequest["changedBy"] = enteredBy || null;
        updateRequest["kk"] = source.kk || null;
        (source.initialReferralDate) ? updateRequest["initialReferralDate"] = Date.parse(source.initialReferralDate) : updateRequest["initialReferralDate"] = null;
        updateRequest["notes"] = source.notes || null;
        (source.reasonForDeclineID) ? updateRequest["reasonForDeclineID"] = source.reasonForDeclineID.ReasonForDeclineID : updateRequest["reasonForDeclineID"] = null;
        updateRequest["dhsTrackingNumber"] = source.dhsTrackingNumber || null;
        (source.dhsNotifiedDate) ? updateRequest["dhsNotifiedDate"] = Date.parse(source.dhsNotifiedDate) : updateRequest["dhsNotifiedDate"] = null;
        updateRequest["referralID"] = source.referralID;
      }
      else {
        source.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey() || null;
        source.referralTypeID = 15;
        source.enterBy = enteredBy || null;
        (source.initialReferralDate) ? source.initialReferralDate = Date.parse(source.initialReferralDate) : source.initialReferralDate = null;
        (source.reasonForDeclineID) ? source.reasonForDeclineID = source.reasonForDeclineID.ReasonForDeclineID : source.reasonForDeclineID = null;
        (source.countyID) ? source.countyID = source.countyID.countyID : source.countyID = null;
        (source.dhsNotifiedDate) ? source.dhsNotifiedDate = Date.parse(source.dhsNotifiedDate) : source.dhsNotifiedDate = null;
        (source.placementEstablishedDate) ? source.placementEstablishedDate = Date.parse(source.placementEstablishedDate) : source.placementEstablishedDate = null;
        (source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : source.beginDate = null;
        (source.endDate) ? source.endDate = Date.parse(source.endDate) : source.endDate = null;
        (source.sfaOfficeID) ? source.sfaOfficeID = source.sfaOfficeID.SFAOfficeID : source.sfaOfficeID = null;
        (source.sfcsWorkerID) ? source.sfcsWorkerID = source.sfcsWorkerID.StaffID : source.sfcsWorkerID = null;
        (source.sfcsOfficeCoordinatorID) ? source.sfcsOfficeCoordinatorID = source.sfcsOfficeCoordinatorID.StaffID : source.sfcsOfficeCoordinatorID = null;
        (source.otherAgencyStaffID) ? source.otherAgencyStaffID = source.otherAgencyStaffID.otherAgencyStaffID : source.otherAgencyStaffID = null;
        (source.dHSStaffID) ? source.dHSStaffID = source.dHSStaffID.dHSStaffID : source.dHSStaffID = null;

      }

      (source.referralID) ? this.update(updateRequest) : this.save(source);
    }
    else {
      swal('Warning', 'Please fill the mandatoy fields', 'info');
    }

  }

  save(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.saveBhOkReferral(source).then((data) => {
      swal('Success', 'Referral has been saved!', 'success');
      loader.style.display = 'none';
      this._router.navigate(['/reports/opencards/list/client/case']);
    });
  }

  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.updateBhOkReferral(source).then((data) => {
      swal('Success', 'Referral has been updated!', 'success');
      loader.style.display = 'none';
      this._router.navigate(['/reports/opencards/list/client/case']);
    });
  }

  async getStaffName() {
    let staffName: string;
    if (parseInt(localStorage.getItem('UserId'))) {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      await this._team.getUserById({ staffID: parseInt(localStorage.getItem('UserId')) })
        .then((data) => {
          staffName = `${data.users.firstName} ${data.users.lastName}`;
          loader.style.display = 'none';
        })
        .catch(() => {
          loader.style.display = 'none';
        })
    }

    return staffName;

  }

  async getMetaData(label:string, event: any) {
    switch (label) {
      case 'SFM_Office':
        let sfmOfficeData = await this._opencard.getBHOKsfcsOfficeDropdown();
        this.metaData = sfmOfficeData.filter((item: any) => { return item.Name.toLowerCase().indexOf(event.query)!==-1});
        break;
      case 'SFM_Worker':
        let sfmWorkerData = await this._opencard.getBHOKsfcsWorkerDropdown();
        this.metaData = sfmWorkerData.filter((item: any) => { return item.StaffName.toLowerCase().indexOf(event.query)!==-1});
        break;
      case 'DHS_Staff':
        let dhsStafData = await this._opencard.getBHOKdhsStaffDropdown();
        this.metaData = dhsStafData.filter((item: any) => { return item.StaffName.toLowerCase().indexOf(event.query)!==-1});
        break;

      case 'other_Agency_Staff':
        let otherAgencyStaffData = await this._opencard.getBHOKotherAgencyStaffDropdown();
        this.metaData = otherAgencyStaffData.filter((item: any) => { return item.StaffName.toLowerCase().indexOf(event.query)!==-1});
        break;

      case 'Decline_Reason':
        let declineReasonData = await this._opencard.getBHOKreasonDeclineDropdown();
        this.metaData = declineReasonData.filter((item: any) => { return item.ReasonForDecline.toLowerCase().indexOf(event.query)!==-1});
        break;

      case 'home_county':
        let request = {"beginPagination": 1,"endPagination": 100}, homeCountyData: any;
        homeCountyData = await this._opencard.getBHOKhomeCountyDropdown(request);
        console.log("Home county data",homeCountyData)
        this.metaData = homeCountyData.filter((item: any) => { return item.countyName.toLowerCase().indexOf(event.query)!==-1});
        break;
    }

  }

  defineOpencards() {
    this.bhokOpencards = [
      { title: 'Appointments', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
      { title: 'Assessments', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Authorization Summary', tip: 'Authorization Summary', navigation: '', icon: this.iconurl + '' },
      { title: 'Case Activity', tip: 'Case Activity', navigation: 'reintegration/referral/opencard/case-activity/view', count: '0', icon: this.iconurl + 'case activity.svg' },
      { title: 'Case File Activity', tip: 'Family', navigation: '', icon: this.iconurl + '' },
      { title: 'Case Team', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
      { title: 'Family', tip: 'Family', navigation: '', icon: this.iconurl + '' },
      { title: 'Home County', tip: 'Assessments', navigation: '', icon: this.iconurl + 'home.svg' },
      { title: 'Medical', tip: 'Medical', navigation: '', icon: this.iconurl + '' },
      { title: 'Placements', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
      { title: 'School', tip: 'School', navigation: '', icon: this.iconurl + '' },
      { title: 'SFCS Office', tip: 'Assessments', navigation: '', icon: this.iconurl + '' }

    ];


  }

  navigateTo(label: any) {
    let url: any;
    switch (label) {
      case 'Appointments':
        url = '/reintegration/referral/opencard/appointments/view';
        break;
      case 'Assessments':
        url = '/reintegration/referral/opencard/assessments/view';
        break;
      case 'Authorization Summary':
        url = '/reintegration/referral/service/authorization/summary';
        break;
      case 'Case Activity':
        url = '/reintegration/referral/opencard/case-activity/view';
        break;
      case 'Case File Activity':
        url = '/reintegration/referral/opencard/case-file-activity/view';
        break;
      case 'Case Team':
        url = '/reintegration/referral/opencard/case-team/view';
        break;
      case 'Family':
        url = '/reports/family/view';
        break;
      case 'Home County':
        url = '/reintegration/referral/opencard/home-county/view';
        break;
      case 'Medical':
        url = '/reintegration/referral/opencard/medical/dashboard';
        break;
      case 'Placements':
        url = '/reintegration/referral/opencard/placement/view';
        break;
      case 'School':
        url = '/reintegration/referral/opencard/school/dashboard';
        break;
      case 'SFCS Office':
        url = '/reintegration/referral/opencard/sfcs-office/view';
        break;
    }

    return this._router.navigate([url]);

  }

  onSelectReasonForDeclining(event: any) { 
    if(event) {
      this.bhOk.beginDate = '';
      this.bhOk.placementEstablishedDate = ''; 
      this.isReasonForDeclingSelected = true;
    }
  }

  navigateToAttachment(event) {
    // navigateToAttachment
  }

}
