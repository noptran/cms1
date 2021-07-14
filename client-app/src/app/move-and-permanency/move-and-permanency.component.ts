import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import { ClildFormService } from '../child-forms/child-forms.service';
import { MoveForm, ChangeAddress, MoveAutoFillData, NewproviderAddress, NewProvider } from './move-form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { CaseTeamService } from '../case-team/case-team.service';
import { isNullOrUndefined, isNull } from 'util';
import * as moment from 'moment';
import {LocalValues} from '../local-values';
import { TeamFormService } from '../team-form/team-form.service';


@Component({
  selector: 'app-move-and-permanency',
  templateUrl: './move-and-permanency.component.html',
  styleUrls: ['./move-and-permanency.component.scss']
})
export class MoveAndPermanencyComponent implements OnInit {
  isPrint = false;
  mainTabs = [];
  sIndex = 0;
  quickMenu = 'referrel';
  moveAutoFillData: MoveAutoFillData = new MoveAutoFillData();
  moveForm: MoveForm = new MoveForm(this._opencard);
  breadcrumbs = [];
  isExistingProviderForm = false;
  existingProviderName: String;
  addressChangeForm: FormGroup;
  exisitingForm: ChangeAddress = new ChangeAddress();
  metaData: any = [];
  cities = [];
  zipcodes = [];
  selctedStateId: any;
  filteredCitites = [];
  filteredZipcodes = [];
  ruleObj = {};
  isExisingAddressChangeLink = true;
  moveEventForm: FormGroup;
  isEdit = false;
  selectedSchoolAddress: any;
  isExisitingFormUpdate = false;
  isEditBtnDisable = false;
  discardTo = '/reintegration/referral/opencard/move-permanency/move-form/view';
  isPersonTypeID_IfRelative = false;
  personTypesDropdown = [];
  isPrintNavigation = false;
  table_1_autofetchData: any
  table_2_autofetchData: any
  moveAutoFetch_sfcsOffice: any;
  relativeTypes = [];
  isAddressSelected = false;
  currentUser: string;
  currentDateAndTimeWithExt: any;
  isShowFinalizedBy = false;
  nearBySchools = [];
  isFinalize = false;
  isFinalizedStaff;
  isNewProviderWindowOpen = false;
  newProviderCities = [];
  newProviderZipCodes = [];
  newProviderRelativeTypes = [];
  newProviderAddress: any = new NewproviderAddress();
  isEditProvider = false;
  isProviderInformation = false;
  isPrimaryProvider = false;
  isSecondaryProvider = false;
  isNewProviderEdit = false;
  isNewProviderNotList = false;
  selectedProvider: any;
  newProvider: NewProvider = new NewProvider();
  newProviderInformationForm: FormGroup;
  newPrimaryProviderForm: FormGroup;
  newProviderValidationMsg: string;
  newProviderChildTabAddress = {
    name: '',
    address: '',
    city: '',
    state: '',
    zipcode: ''
  };
  pcSiteOtherProviderID_From: any;
  pcsiteOtherProviderID: any;
  newPlacementInfoProviderName: string;
  newPlacementInfoAddressLineOne: string;
  newPlacementInfoAddressLineTwo: string;
  childEnteredAutoFetchField = {
    relativeType: '', nameOfSchool: ''
  };
  newProviderAutoFetchData: any;
  isFormLog = false;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: ''
  }
  statusDate: any;

  isAttachmentRequired: any;

  constructor(public _team: TeamFormService, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService,
    public _fb: FormBuilder, public _caseTeam: CaseTeamService, public _localvalues: LocalValues) { }

  ngOnInit() {
    this.currentUser = (localStorage.getItem('UserEmail')) ? localStorage.getItem('UserEmail').split('@')[0] : 'Invalid User';
    this.currentDateAndTimeWithExt = new Date();
    this.setIndex(0);
    this.defineMainTabs();
    this.existingFormValidation();
    this.moveEeventFormValidation();
    this.getAllRelativeTypes();
    this.newProviderInfoFormValidation();
    this.newPrimaryProviderInfoValidation();
    if (this._router.url.includes('/reintegration/referral/opencard/move-permanency/move-form/detail')) {
      this.isPrintNavigation = true;
      this.getRecById();
    }
    if (this._router.url.includes('/reintegration/referral/opencard/move-permanency/move-form/new')) {
      this.statusDate = Date.parse(new Date().toString())
      this.initializeDataOnNewPageLoad();
      this.autofetchInitialNewData();
      this.moveForm.moveStatusID = { moveStatus: "Pending", moveStatusID: 1 };
    }
    this.breadcrumbs.push(
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
      { label: 'Move and Permanency Menu', href: '/reintegration/referral/opencard/move-permanency/dashboard', active: '' },
      { label: 'Move List', active: '', href: '/reintegration/referral/opencard/move-permanency/move-form/view' },
      { label: 'Move', active: 'active' },
    );

  }

  setIndex(index: number) {
    this.sIndex = index;
  }

  initializeDataOnNewPageLoad() {
    this.moveForm.moveNeededDate = new Date();
    this.moveEventForm.controls['moveNeededDate'].disable();
    this.moveEventForm.controls['departureDate'].disable();
    this.moveEventForm.controls['requestReasonID'].disable();
    this.moveEventForm.controls['clientLocationID'].disable();
  }

  onMoveActionSelection() {
    setTimeout(() => {
      this.moveForm.moveActionID = parseInt(this.moveForm.moveActionID)
      switch (this.moveForm.moveActionID) {
        case 1:
          this.moveEventForm.controls['departureDate'].enable();
          this.moveEventForm.controls['requestReasonID'].enable();
          this.moveEventForm.controls['clientLocationID'].enable();
          this.moveEventForm.controls['moveNeededDate'].enable();
          break;
        case 2:
          this.moveEventForm.controls['departureDate'].enable();
          this.moveEventForm.controls['requestReasonID'].disable();
          this.moveEventForm.controls['clientLocationID'].disable();
          this.moveEventForm.controls['moveNeededDate'].enable();
          break;
        case 3:
          this.moveEventForm.controls['departureDate'].enable();
          this.moveEventForm.controls['requestReasonID'].disable();
          this.moveEventForm.controls['clientLocationID'].disable();
          this.moveEventForm.controls['moveNeededDate'].disable();
          break;


      }
    }, 1000)


  }

  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Child Left', href: '#nav-sec1' },
      { label: 'New Placement Information', href: '#nav-sec2' },

    ]
  }

  async printBtn() {
    let element = document.getElementById('element-to-print');
    let opt = {
      margin: 0,
      filename: 'filea4Landscape.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    await html2pdf(element, opt);

  }

  getRecById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req: any, referralId: any, clientId: any, moveEventID: any;
    referralId = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    clientId = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
    req = { referralID: referralId, clientID: clientId, moveEventID: this._client.getId() }
    this._opencard.getByIdMoveForm(req).then(data => {
      loader.style.display = 'none';
      this.moveForm.moveActionDate = moment(Date.now());
      !isNullOrUndefined(data.MoveEvent.moveNeededDate) ? data.MoveEvent.moveNeededDate = moment.utc(data.MoveEvent.moveNeededDate).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.MoveEvent.arrivalDate) ? data.MoveEvent.arrivalDate = moment.utc(data.MoveEvent.arrivalDate).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.MoveEvent.statusDate) ? data.MoveEvent.statusDate = moment.utc(data.MoveEvent.statusDate).format('MM/DD/YYYY HH:mm') : null;
      this.statusDate = data.MoveEvent.statusDate;
      !isNullOrUndefined(data.MoveEvent.departureDate) ? data.MoveEvent.departureDate = moment.utc(data.MoveEvent.departureDate).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.MoveEvent.requestedDate) ? data.MoveEvent.requestedDate = moment.utc(data.MoveEvent.requestedDate).format('MM/DD/YYYY HH:mm') : null;
      !isNullOrUndefined(data.MoveEvent.staffID_MoveInitiatedBy) ? data.MoveEvent.staffID_MoveInitiatedBy['fullName'] = data.MoveEvent.staffID_MoveInitiatedBy.lastName + ' ' + data.MoveEvent.staffID_MoveInitiatedBy.firstName + ' ( ' + data.MoveEvent.staffID_MoveInitiatedBy.email + ' ) ' : null;
      !isNullOrUndefined(data.MoveEvent.personTypeID_MoveInitiatedBy) ? data.MoveEvent.personTypeID_MoveInitiatedBy['fullName'] = data.MoveEvent.personTypeID_MoveInitiatedBy.lastName + ' ' + data.MoveEvent.personTypeID_MoveInitiatedBy.firstName + ' ( ' + data.MoveEvent.personTypeID_MoveInitiatedBy.email + ' ) ' : null;
      !isNullOrUndefined(data.MoveEvent.moveActionID) ? data.MoveEvent.moveActionID = data.MoveEvent.moveActionID.moveActionID : null;
      if (data.MoveEvent.personTypeID_IfRelative) {
        data.MoveEvent.personTypeID_IfRelative['PersonType'] = data.MoveEvent.personTypeID_IfRelative.personType
      }
      this.getSlectedSchoolAddress(data.MoveEvent.schoolID_MoveTo)
      this.moveForm = data.MoveEvent;
      console.log('this.moveForm is', this.moveForm);
      this.isEdit = true;
      this.moveEventForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.MoveEvent.changedBy) ? data.MoveEvent.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.MoveEvent.changedDate) ? moment(data.MoveEvent.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.MoveEvent.enteredBy) ? data.MoveEvent.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.MoveEvent.enteredDate) ? moment(data.MoveEvent.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      this.moveAutoFillData = data.MoveEventAutoFill;
      this.newPlacementProviderInfo = {
        providerName: data.MoveEventAutoFill.FacilityName,
        address: data.MoveEventAutoFill.FacilityAddress,
        phone: data.MoveEventAutoFill.MoveToPhone
      };
      this._opencard.storeMovePrintData(this.moveForm, this.moveAutoFillData, this.moveAutoFetch_sfcsOffice, '');
      this.getExistingProviderName(this.moveAutoFillData);
      this.existingProviderRuleCheck(this.moveAutoFillData);
      this.autofetchInitialNewData(data.MoveEvent);

      this.moveForm.providerID_From = { providerName: data.MoveEvent.providerID_From.providerName, providerID: data.MoveEvent.providerID_From.providerID };
      this.moveForm.providerID_MoveTo['providerID'] = !isNullOrUndefined(data.MoveEvent.providerID_MoveTo) ? data.MoveEvent.providerID_MoveTo.providerID : null;


      this.onProviderFromSelect();
      this.onProvider_ToSelect();


      // !isNullOrUndefined(this.table_1_autofetchData.CurrentSchool) ? this.moveAutoFillData.SchoolName = this.table_1_autofetchData.CurrentSchool : null;

      this.moveAutoFillData.SchoolName = !isNullOrUndefined(data.MoveEvent.schoolID_From) ? data.MoveEvent.schoolID_From.schoolName : null;
      this.moveForm.schoolID_MoveTo = !isNullOrUndefined(data.MoveEvent.schoolID_MoveTo) ? data.MoveEvent.schoolID_MoveTo : null;

      this.moveAutoFillData.ProviderName = !isNullOrUndefined(data.MoveEvent.pcsiteOtherProviderID_From) ? data.MoveEvent.pcsiteOtherProviderID_From.otherProviderName : null;
      this.moveAutoFillData.FullAddress = !isNullOrUndefined(data.MoveEventAutoFill.FullAddress) ? data.MoveEventAutoFill.FullAddress : null;
      this.moveAutoFillData.Phone = !isNullOrUndefined(data.MoveEventAutoFill.Phone) ? data.MoveEventAutoFill.Phone : null;
      this.newPlacementInfoProviderName = !isNullOrUndefined(data.MoveEvent.pcsiteOtherProviderID) ? data.MoveEvent.pcsiteOtherProviderID.otherProviderName : null;
      this.newPlacementInfoAddressLineOne = !isNullOrUndefined(data.MoveEvent.pcsiteOtherProviderID) ? data.MoveEvent.pcsiteOtherProviderID.serviceAddress : null;
      this.newPlacementInfoAddressLineTwo = `${data.MoveEvent.pcsiteOtherProviderID.stateID.state},${data.MoveEvent.pcsiteOtherProviderID.cityID.city},${data.MoveEvent.pcsiteOtherProviderID.zipcodeID.zipcodeID}`;
      this.checkFinalizeStatus();
      if (this.moveForm.providerID_MoveTo) {
        this.getNearBySchools();
      }
      if (this.moveForm.moveStatusID) {
        this.viewModeCheck();
      }
    })

  }

  editMoveEventForm() {
    this.moveEventForm.enable();
  }

  openExistingProviderAddressChangeForm() {
    this.isExistingProviderForm = true;
  }

  getExistingProviderName(source: any) {
    console.log('getExistingProviderName method called...');

    let recId: any, req: any;

    if (source.PCSiteOtherProviderID === 0) {
      recId = source.ProviderLocid;
      req = { providerLocationID: recId }
    } else if (source.ProviderLocid === 0) {
      recId = source.PCSiteOtherProviderID;
      req = { pcSiteOtherProviderID: recId }
    } else {
      recId = 0;
    }
    console.log('req in getExistingProviderName is', req);
    this._opencard.getProviderNameMoveForm(req).then((data: any) => {
      console.log('data in getExistingProviderName is', data);
      this.existingProviderName = data.providerName;
      console.log('  this.existingProviderName in getExistingProviderName is', this.existingProviderName);
    });
  }

  existingFormValidation() {
    this.addressChangeForm = this._fb.group({
      serviceAddress: [null],
      cityID: [null, Validators.compose([Validators.required])],
      stateID: [null, Validators.compose([Validators.required])],
      zipcodeID: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])]
    });
    // this.addressChangeForm.controls['cityID'].disable();
    // this.addressChangeForm.controls['zipcodeID'].disable();
  }

  existingFormAction(source: any) {
    console.log('source in existingFormAction is', source);

    this.isExisitingFormUpdate = true;
    // if (this.addressChangeForm.valid) {
    let newObj = {};
    !isNullOrUndefined(source.cityID) ? source.cityID = source.cityID.cityID : null;
    !isNullOrUndefined(source.stateID) ? source.stateID = source.stateID.stateID : null;
    !isNullOrUndefined(source.zipcodeID) ? source.zipcodeID = source.zipcodeID.zipcodeID : null;
    newObj = Object.assign(source, this.ruleObj)
    newObj['pcSiteOtherProviderID'] = 1;
    this._opencard.updateExisitingAddress(newObj).then(() => {
      this.isExisitingFormUpdate = false;
      this.isExistingProviderForm = false;
      swal('Success', 'Updated!', 'info');
    });
    // }
    // else {
    //   swal('Warning', 'Please fill the mandatory fields', 'warning');
    //   this.isExisitingFormUpdate = false;
    // }
  }

  getRelativeTypes(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'relativeType':
        obj = 'isRelative';
        break;




    }
    req = { personType: obj }

    this._opencard.getMoveFormRelativeTypes(req).then((data: any) => {
      this.relativeTypes = data.personTypeList;
    })
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'state':
        obj = 'state';
        break;
      case 'staff':
        obj = 'staff';
        break;
      case 'school':
        obj = 'schoolName';
        break;
      case 'provider':
        obj = 'provider';
        break;
      case 'PlacementRequestReason':
        obj = 'PlacementRequestReason';
        break;
      case 'ClientLocation':
        obj = 'ClientLocation';
        break;
      case 'moveStatus':
        obj = 'zmoveStatus';
        break;
      case 'providerType':
        obj = 'providerType';
        break;
      case 'state':
        obj = 'state';
        break;
      case 'race':
        obj = 'race';
        break;
      case 'gender':
        obj = 'gender';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      data.dropDown.map((item: any) => {
        item['fullName'] = item.lastName + item.firstName + ' ( ' + item.email + ' ) ';
      })
      this.metaData = data.dropDown;
    })
  }

  generateCityBasedOnState(event: any) {
    let req = { stateID: event.stateID }
    this.selctedStateId = event.stateID;
    this.exisitingForm.cityID = '';
    this.exisitingForm.zipcodeID = '';
    this._client.getCityFromState(req).then((data: any) => {
      this.addressChangeForm.controls['cityID'].enable();
      this.cities = data.city;
    });
  }

  filterCities(event: any) {
    this.filteredCitites = [];
    this.cities.filter((item: any) => {
      if (item.city.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredCitites.push(item);
      }
    })
  }

  generateZipcodeBasedOncity(event: any) {
    let req: any;
    this.exisitingForm.zipcodeID = '';
    req = { stateID: this.selctedStateId, cityID: event.cityID }
    this._client.getZipcodeFromCityState(req).then((data: any) => {
      if (data.zipcode.length === 1) { this.exisitingForm.zipcodeID = data.zipcode[0] };
      this.addressChangeForm.controls['zipcodeID'].enable();
      this.zipcodes = data.zipcode;
    })
  }

  filterZipcodes(event: any) {
    this.filteredZipcodes = [];
    this.zipcodes.filter((item: any) => {
      if (item.zipcode.indexOf(event.query) !== -1) {
        this.filteredZipcodes.push(item);
      }
    })
  }

  existingProviderRuleCheck(source: any) {
    let recId: any;
    if (source.PCSiteOtherProviderID === 0) {
      recId = source.ProviderLocid;
      this.ruleObj = { providerLocationID: recId }
    } else if (source.ProviderLocid === 0) {
      recId = source.PCSiteOtherProviderID;
      this.ruleObj = { pcSiteOtherProviderID: recId }
    } else {
      this.isExisingAddressChangeLink = false;
    }
    return this.ruleObj;
  }

  resetExistingProviderForm() {
    this.exisitingForm = new ChangeAddress();
    this.isExistingProviderForm = false;
  }

  moveEeventFormValidation() {
    this.moveEventForm = this._fb.group({
      // requestedDate: [null],
      moveNeededDate: [null],
      departureDate: [null],
      reasonForMove_Notes: [null],
      medications_Notes: [null],
      schoolAppointments_Notes: [null],
      isInitiatedByCC: [null],
      isInitiatedByFieldStaff: [null],
      staffID_MoveInitiatedBy: [null],
      providerID_From: [null],
      moveActionID: [null],
      requestReasonID: [null],
      clientLocationID: [null],
      personTypeID_MoveInitiatedBy: [null],
      providerID_MoveTo: [null],
      arrivalDate: [null],
      personTypeID_IfRelative: [null],
      moveStatusID: [null],
      statusDate: [null],
      isPersonTypeID_IfRelative: [null],
      schoolID_MoveTo: [null],
      isProviderRelative: [null]
    })
  }
  newPlacementProviderInfo: any = {};

  async moveFormAction(autoFillData: any, userEnterData: any) {
    console.log('this.userEnterData>>>>>', userEnterData);
    (userEnterData.personTypeID_IfRelative) ? this.childEnteredAutoFetchField.relativeType = userEnterData.personTypeID_IfRelative.PersonType : null;
    (userEnterData.schoolID_MoveTo) ? this.childEnteredAutoFetchField.nameOfSchool = userEnterData.schoolID_MoveTo.schoolName : null;
    this.childEnteredAutoFetchField['newPlacementProviderInfo'] = this.newPlacementProviderInfo;
    console.log('this.childEnteredAutoFetchField>>>>>', this.childEnteredAutoFetchField);
    this._opencard.setMoveFormNewProviderInfo(this.childEnteredAutoFetchField);
    userEnterData.moveStatusID = (userEnterData.moveStatusID) ? userEnterData.moveStatusID.moveStatusID : null;
    userEnterData.statusDate = (userEnterData.statusDate) ? Date.parse(userEnterData.statusDate) : null;
    let currentDate = new Date();
    userEnterData.requestedDate = Date.parse(currentDate.toString());
    userEnterData.moveNeededDate = (userEnterData.moveNeededDate) ? Date.parse(userEnterData.moveNeededDate) : null;
    userEnterData.departureDate = (userEnterData.departureDate) ? Date.parse(userEnterData.departureDate) : null;
    userEnterData.requestReasonID = (userEnterData.requestReasonID) ? userEnterData.requestReasonID.pcsitePlacementRequestReasonID : null;
    userEnterData.clientLocationID = (userEnterData.clientLocationID) ? userEnterData.clientLocationID.pcsiteClientLocationID : null;
    userEnterData.personTypeID_MoveInitiatedBy = (userEnterData.personTypeID_MoveInitiatedBy) ? userEnterData.personTypeID_MoveInitiatedBy.personTypeID : null;
    userEnterData.staffID_MoveInitiatedBy = (userEnterData.staffID_MoveInitiatedBy) ? userEnterData.staffID_MoveInitiatedBy.staffID : null;
    userEnterData.providerID_From = (userEnterData.providerID_From) ? userEnterData.providerID_From.providerID : null;
    userEnterData.providerLocationID_From = this.fromLocationID;
    // userEnterData.providerID_MoveTo = this.movetoLocationID;
    userEnterData.providerID_MoveTo = (userEnterData.providerID_MoveTo) ? userEnterData.providerID_MoveTo.providerID : null;
    userEnterData.providerLocationID_MoveTo = this.toLocationID;
    userEnterData.schoolID_From = this.table_1_autofetchData.Current_SchoolID;
    (userEnterData.schoolID_From == 0) ? userEnterData.schoolID_From = null : null;
    userEnterData.placementID_From = this.table_1_autofetchData.PlacementID;
    userEnterData.placementID_MoveTo = null;
    userEnterData.placementDetailID_From = this.table_1_autofetchData.PlacementDetailID;
    userEnterData.placementDetailID_MoveTo = null;
    userEnterData.personTypeID_IfRelative = (userEnterData.personTypeID_IfRelative) ? userEnterData.personTypeID_IfRelative.PersonTypeID : null;
    userEnterData.newProvider_MoveTo = null;
    this.getSlectedSchoolAddress(userEnterData.schoolID_MoveTo)
    userEnterData.schoolID_MoveTo = (userEnterData.schoolID_MoveTo) ? userEnterData.schoolID_MoveTo.schoolID : null;
    userEnterData.pcSiteOtherProviderID_From = !isNull(this.pcSiteOtherProviderID_From) ? this.pcSiteOtherProviderID_From : null;
    userEnterData.pcsiteOtherProviderID = !isNull(this.pcsiteOtherProviderID) ? this.pcsiteOtherProviderID : null;

    if (parseInt(localStorage.getItem('UserId'))) {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      await this._team.getUserById({ staffID: parseInt(localStorage.getItem('UserId')) })
        .then((data) => {

          userEnterData.enteredBy = `${data.users.firstName} ${data.users.lastName}`;
          loader.style.display = 'none';
        })
    }
    else {
      userEnterData.enteredBy = null;
    }

    userEnterData.arrivalDate = (userEnterData.arrivalDate) ? Date.parse(userEnterData.arrivalDate) : null;
    userEnterData.enteredDate = Date.parse(currentDate.toString());

    // To be mapped correctly------only for test purpose----
    userEnterData.isProviderFromIncorrect = false;
    userEnterData.providerAddressChange = false;

    // ----------------------------------------------
    delete userEnterData._opencard;

    if (userEnterData.moveEventID) {
      userEnterData.clientID = (userEnterData.clientID) ? userEnterData.clientID.clientID : null;
      userEnterData.referralID = (userEnterData.referralID) ? userEnterData.referralID.referralID : null;
      userEnterData.moveRequestID = null;
      delete userEnterData.changedBy;
      delete userEnterData.changedDate;
      delete userEnterData.createdDate;
      delete userEnterData.ctemail;
      delete userEnterData.ctnotification;
      delete userEnterData.isActive;
      delete userEnterData.isDeleted;
      delete userEnterData.isPlacedByCC;
      delete userEnterData.isPlacedByFieldStaff;
      delete userEnterData.kinshipDOB;
      delete userEnterData.kinshipRate;
      delete userEnterData.kinshipSSN;
      delete userEnterData.lastModifiedDate;
      delete userEnterData.newProvider;
      delete userEnterData.notification;
      delete userEnterData.preferred_LevelOfCareID;
      delete userEnterData.reasonFromMoveID;
      delete userEnterData.signedBy;
      delete userEnterData.signedDate;
      delete userEnterData.updatedDate;
      delete userEnterData.staffID_MoveFormCompletedBy;

    }

    if (userEnterData.moveEventID) {
      if (this.isFinalize) {
        userEnterData['signedBy'] = userEnterData.enteredBy;
        userEnterData['signedDate'] = userEnterData.enteredDate;
        userEnterData.moveStatusID = 2;
      }
      userEnterData['referralID'] = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
      this._opencard.updateMoveForm(userEnterData).then((data) => {
        this._opencard.storeMovePrintData(this.moveForm, this.moveAutoFillData, this.moveAutoFetch_sfcsOffice, this.newProviderAutoFetchData);
        this._client.storeId(data.MoveEvent.moveEventID);
        localStorage.setItem(
          "moveEventID",
          data.MoveEvent.moveEventID
        );
        swal('Success', 'Record has been updated!', 'success');
        this._router.navigate(['/move-form'], { queryParams: { 'module': 'move-form', 'action': 'edit' }, queryParamsHandling: 'merge' });
      })
    }
    else {
      if (userEnterData.moveStatusID === 2) {
        userEnterData['signedBy'] = userEnterData.enteredBy;
        userEnterData['signedDate'] = userEnterData.enteredDate;
      }
      this._opencard.saveMoveForm(userEnterData).then((data) => {
        this._opencard.storeMovePrintData(this.moveForm, this.moveAutoFillData, this.moveAutoFetch_sfcsOffice, this.newProviderAutoFetchData);
        this._client.storeId(data.MoveEvent.moveEventID);
        localStorage.setItem(
          "moveEventID",
          data.MoveEvent.moveEventID
        );

        swal('Success', 'Record has been saved!', 'success');
        this._router.navigate(['/move-form'], { queryParams: { 'module': 'move-form', 'action': 'create' }, queryParamsHandling: 'merge' });
      })
    }

  }



  getSlectedSchoolAddress(event) {
    if (event) {
      this.isAddressSelected = true;
      this.selectedSchoolAddress = event;
      let city = (event.cityID) ? event.cityID.city : '';
      let state = (event.stateID) ? event.stateID.abbreviation : '';
      let usd = (event.usd) ? event.usd : '';

      this.selectedSchoolAddress['fullAddress'] = `${event.address}, ${city}, ${state}. USD: ${usd}`

    }
  }

  onEdit() {
    this.moveEventForm.enable();
  }

  /**
   * MovestatusID  = 2 -Finalized
   * MovestatusID  = 3 -Void
   * MovestatusID  = 1 -Pending
   */
  viewModeCheck() {
    if (this.moveForm.moveStatusID.moveStatusID === 2) {
      return this.isEditBtnDisable = true;
    } else if (this.moveForm.moveStatusID.moveStatusID === 3) {
      return this.isEditBtnDisable = true;
    } else {
      return this.isEditBtnDisable = false;
    }
  }


  getReferralTypeBasedPersonType(event) {

    let req = {
      isNCOPS: false,
      isContract: true,
      isNCFCHOK: false,
      isBHOK: false,
      isNCBHOK: false,
      isNCFCHNE: false,
      isNCKIPP: false
    }

    this._caseTeam.getPersonTypeByReferral(req).then((data) => {
      data.personType.map((item) => {
        item['personType'] = item.personType;
      });

      this.personTypesDropdown = data.personType;

    })


  }
  newSchool = '';
  autofetchInitialNewData(moveEvent?: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req: any, referralId: any, clientId: any, moveEventID: any;
    let currentDate = new Date();
    referralId = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    clientId = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();

    req = {
      referralID: referralId,
      clientID: clientId,
      moveEventID: (this.moveForm.moveEventID) ? this.moveForm.moveEventID : 0,
      statusDate: this.statusDate

    }

    // new autofetch API
    //
    this._opencard.getAutofetchInformationMoveForm(req).then(data => {
      // this._opencard.getAutofetchInfoMoveForm(req).then(data => {
      // this.table_1_autofetchData = data.autoFetchInfo.filter((item: any) => {

      //   return item.FromTable === '1' || item.FromTable === 1
      // })
      // this.table_2_autofetchData = data.autoFetchInfo.filter((item: any) => {

      //   return item.FromTable === '2' || item.FromTable === 2
      // })

      // if (this.table_1_autofetchData.length >= 1) {
      //   this.table_1_autofetchData = this.table_1_autofetchData[this.table_1_autofetchData.length - 1];
      // }

      // if (this.table_2_autofetchData.length >= 1) {
      //   this.table_2_autofetchData = this.table_2_autofetchData[this.table_2_autofetchData.length - 1];
      // }

      if (this._router.url.includes('/reintegration/referral/opencard/move-permanency/move-form/detail')) {
        let clientDetails = data.clientDetails;
        let placementdetails = data.placementdetails;
        this.fromLocationID = data.placementdetails.ProviderLocationID;
        let autofetchJsonObject = { ...clientDetails, ...placementdetails };
        this.table_1_autofetchData = autofetchJsonObject;
        if (this.table_1_autofetchData) {
          (this.table_1_autofetchData['Current School']) ? this.newSchool = this.table_1_autofetchData['Current School'] : null;
        }
      } else if (this._router.url.includes('/reintegration/referral/opencard/move-permanency/move-form/new')) {
        let clientDetails = data.clientDetails;
        let placementdetails = data.placementdetails;
        this.fromLocationID = data.placementdetails.ProviderLocationID;
        let autofetchJsonObject = { ...clientDetails, ...placementdetails };
        this.table_1_autofetchData = autofetchJsonObject;
        this.table_2_autofetchData = autofetchJsonObject;


        if (this.table_1_autofetchData) {
          !isNullOrUndefined(this.table_1_autofetchData.Kaecses) ? this.moveAutoFillData.kaecses = this.table_1_autofetchData.Kaecses : null;
          !isNullOrUndefined(this.table_1_autofetchData.SFAOffice) ? this.moveAutoFetch_sfcsOffice = this.table_1_autofetchData.SFAOffice : null;
          !isNullOrUndefined(this.table_1_autofetchData.CurrentSchool) ? this.moveAutoFillData.SchoolName = this.table_1_autofetchData.CurrentSchool : null;
          !isNullOrUndefined(this.table_1_autofetchData.USD) ? this.moveAutoFillData.USD = this.table_1_autofetchData.USD : null;
          (this.table_1_autofetchData['Current School']) ? this.newSchool = this.table_1_autofetchData['Current School'] : null;
        }
        else {
          this.moveAutoFillData.kaecses = '';
          this.moveAutoFetch_sfcsOffice = '';
          this.moveAutoFillData.SchoolName = '';
          this.moveAutoFillData.USD = '';

        }
        // Cannot read property 'LastName' of undefined
        this.moveAutoFillData.clientname = `${this.table_1_autofetchData.LastName} ${this.table_1_autofetchData.FirstName} ${this.table_1_autofetchData.MI}`;
        if (this.table_2_autofetchData) {
          !isNullOrUndefined(this.table_2_autofetchData.CourtCaseNo) ? this.moveAutoFillData.CourtCaseNo = this.table_2_autofetchData.CourtCaseNo : null;
          //   !isNullOrUndefined(this.table_2_autofetchData.ProviderName) ? this.moveAutoFillData.ProviderName = this.table_2_autofetchData.ProviderName : null;
          //   !isNullOrUndefined(this.table_2_autofetchData.Address) ? this.moveAutoFillData.FullAddress = this.table_2_autofetchData.Address : null; !isNullOrUndefined(this.table_2_autofetchData.Phone) ? this.moveAutoFillData.Phone = this.table_2_autofetchData.Phone : null;
          if (this.table_2_autofetchData.ProviderID) {
            this.moveForm.providerID_From = { providerName: this.table_2_autofetchData.ProviderName, providerID: this.table_2_autofetchData.ProviderID };
            this.onProviderFromSelect();
          }

        }
        else {
          this.moveAutoFillData.CourtCaseNo = '';
          this.moveAutoFillData.ProviderName = '';
          this.moveAutoFillData.FullAddress = '';
          this.moveAutoFillData.Phone = '';
        }
      }
      // this._opencard.storeMovePrintData(this.moveForm, this.moveAutoFillData, this.moveAutoFetch_sfcsOffice,'');
      loader.style.display = 'none';
    })
  }

  onProviderFromSelect() {

    let req = {
      providerID: this.moveForm.providerID_From.providerID
    }
    this._opencard.getProviderAddressMoveForm(req).then(data => {
      this.moveAutoFillData.ProviderName = data.providerInfo.providerName;
      this.moveAutoFillData.FullAddress = data.providerInfo.address;
      this.moveAutoFillData.Phone = data.providerInfo.phone;

    })
  }

  onProviderToSelect(event) {
    let req = {
      providerID: this.moveForm.providerID_MoveTo.providerID
    }
    this._opencard.getProviderAddressMoveForm(req).then(data => {
      this.newPlacementProviderInfo = data.providerInfo;
      this.moveAutoFillData.providerToAddress = data.providerInfo.address;

    })
    this.getNearBySchools();

  }
  onProvider_ToSelect() {
    let req = {
      providerID: this.moveForm.providerID_MoveTo.providerID
    }
    this._opencard.getProviderAddressMoveForm(req).then(data => {
      this.newPlacementProviderInfo = data.providerInfo;
      this.moveAutoFillData.providerToAddress = data.providerInfo.address;

    })
    this.getNearBySchools();

  }
  onMoveStatusChanged() {
    if (this.moveForm.moveStatusID === 2) { this.isShowFinalizedBy = true; }
    let req = { signedBy: this.currentUser, signedDate: Date.now(), moveStatusID: 2 }
    this._opencard.updateMoveForm(req).then(() => {
      swal('Success', 'Record has been updated!', 'success');
      // this._router.navigate(['/move-form'], { queryParamsHandling: 'preserve' });
    })
  }

  getNearBySchools() {
    let req = {
      providerID: this.moveForm.providerID_MoveTo.providerID
    }
    this._opencard.getNearBySchools(req).then(data => {
      this.nearBySchools = data.nearBySchools;

    })
  }

  finalize(moveAutoFillData, moveForm) {
    this.isFinalize = true;
    this.moveFormAction(moveAutoFillData, moveForm)
  }

  checkFinalizeStatus() {
    (this.moveForm.moveStatusID.moveStatusID == 2) ? this.isFinalizedStaff = true : this.isFinalizedStaff = false;
  }

  onSelectState(event: any) {
    this._opencard.getCityFromState({ stateID: event.stateID })
      .then((data: any) => this.newProviderCities = data.city);
  }

  onSelectCity(event: any) {
    this._opencard.getZipcodeFromCity({
      stateID: this.newProvider.stateID.stateID,
      cityID: event.cityID
    })
      .then((data: any) => this.newProviderZipCodes = data.zipcode);
  }

  filtereingCity(event: any) {
    this.metaData = this.newProviderCities.filter((item: any) => {
      return item.city.toLowerCase().indexOf(event.query) !== -1;
    });
  }

  filtereingZipcode(event: any) {
    this.metaData = this.newProviderZipCodes.filter((item: any) => {
      return item.zipcode.toLowerCase().indexOf(event.query) !== -1;
    });
  }

  getAllRelativeTypes() {
    this._opencard.getProviderRelativeTypes().then(data => this.newProviderRelativeTypes = data)
  }

  filtereingRelativeTypes(event: any) {
    this.metaData = this.newProviderRelativeTypes.filter((item: any) => {
      return item.relativeType.toLowerCase().indexOf(event.query) !== -1;
    })
  }

  async filteringProviderNames(event: any) {
    let providerNames = await this._opencard.getOtherProviders().then(data => { return data });
    this.metaData = providerNames.filter((item: any) => {
      return item.providerName.toLowerCase().indexOf(event.query) !== -1;
    })
  }

  async onSelectNewProvider(event: any) {
    this.newProviderAddress = await this._opencard.getProviderAddress({ pcSiteOtherProviderID: event.pCSiteOtherProviderID });
  }

  toggle(selectedCheckBox: string, event: any) {
    if (event) {
      if (selectedCheckBox === 'editProvider') {
        this.isEditProvider = true;
        this.isNewProviderNotList = false;
        this.isProviderInformation = true;
        this.isPrimaryProvider = false;
        this.isSecondaryProvider = false;
      } else {
        this.isProviderInformation = true;
        this.selectedProvider = '';
        this.isNewProviderEdit = false;
        this.isEditProvider = true;
        this.isPrimaryProvider = false;
        this.isSecondaryProvider = false;
        this.newProviderAddress = new NewproviderAddress();
      }
    } else {
      this.selectedProvider = '';
      this.isNewProviderEdit = false;
      this.isEditProvider = false;
      this.isProviderInformation = false;
      this.isPrimaryProvider = false;
      this.isSecondaryProvider = false;
      this.newProviderAddress = new NewproviderAddress();
    }
  }

  newProviderFormActions() {
    this.newProviderValidationMsg = 'Loading...';
    if (this.selectedProvider) {
      this.newProvider.pCSiteOtherProviderID = this.selectedProvider.pCSiteOtherProviderID;
      if (this.newProviderInformationForm.valid) {
        if (this.isPrimaryProvider) {
          if (this.newProviderInformationForm.valid && this.newPrimaryProviderForm.valid) {
            if (this.sIndex === 0) {
              this.isNewProviderWindowOpen = false;
              this.newProviderValidationMsg = '';
              this.moveAutoFillData.ProviderName = this.newProviderAddress.providerName;
              this.moveAutoFillData.FullAddress = this.newProviderAddress.address;
              this.moveAutoFillData.Phone = this.newProviderAddress.phone;
              this.newProviderInformationForm.reset();
              this.newPrimaryProviderForm.reset();

            } else {
              this.isNewProviderWindowOpen = false;
              this.newProviderValidationMsg = '';
              this.newProviderChildTabAddress.name = this.newProviderAddress.providerName;
              this.newProviderChildTabAddress.address = this.newProviderAddress.address;
              this.newProviderChildTabAddress.city = this.newProvider.cityID.city;
              this.newProviderChildTabAddress.state = this.newProvider.stateID.state;
              this.newProviderChildTabAddress.zipcode = this.newProvider.zipcodeID.zipcode;
              this.newProviderInformationForm.reset();
              this.newPrimaryProviderForm.reset();
            }
            this.newProvider.providerTypeID = !isNullOrUndefined(this.newProvider.providerTypeID) ? this.newProvider.providerTypeID.ProviderTypeID : null;
            this.newProvider.stateID = !isNullOrUndefined(this.newProvider.stateID) ? this.newProvider.stateID.stateID : null;
            this.newProvider.cityID = !isNullOrUndefined(this.newProvider.cityID) ? this.newProvider.cityID.cityID : null;
            this.newProvider.relativeTypeID = !isNullOrUndefined(this.newProvider.relativeTypeID) ? this.newProvider.relativeTypeID.relativeTypeID : null;
            this.newProvider.primaryRaceID = !isNullOrUndefined(this.newProvider.primaryRaceID) ? this.newProvider.primaryRaceID.raceID : null;
            this.newProvider.primaryGenderID = !isNullOrUndefined(this.newProvider.primaryGenderID) ? this.newProvider.primaryGenderID.genderID : null;
            this.newProvider.secondaryRaceID = !isNullOrUndefined(this.newProvider.secondaryRaceID) ? this.newProvider.secondaryRaceID.raceID : null;
            this.newProvider.secondaryGenderID = !isNullOrUndefined(this.newProvider.secondaryGenderID) ? this.newProvider.secondaryGenderID.genderID : null;
            this.newProvider.primaryDOB = !isNullOrUndefined(this.newProvider.primaryDOB) ? this._localvalues.stringFormatDatetime(this.newProvider.primaryDOB) : null;
            this.newProvider.secondaryDOB = !isNullOrUndefined(this.newProvider.secondaryDOB) ? this._localvalues.stringFormatDatetime(this.newProvider.secondaryDOB) : null;
            this.newProvider.zipcodeID = !isNullOrUndefined(this.newProvider.zipcodeID) ? this.newProvider.zipcodeID.zipcodeID : null;
            this.newProvider.otherProviderName = this.newProviderAddress.providerName;
            this.newProvider.phone = this.newProviderAddress.phone;
            this.newProvider.serviceAddress = this.newProviderAddress.address;
            this.newProvider.enteredBy = null;
            this.newProvider.changedBy = null;
            this._opencard.updateNewProvider(this.newProvider).then(data => {
              if (data.responseStatus) {
                swal('Success', 'Provider information updated', 'success');
                if (this.sIndex === 0) {
                  this.pcSiteOtherProviderID_From = data.pCSiteOtherProviderID;
                } else {
                  this.pcsiteOtherProviderID = data.pCSiteOtherProviderID;
                }
              }
            })
          } else {
            this.newProviderValidationMsg = 'Please fill the mandatory fields!';
          }
        }
        else {
          if (this.newProviderInformationForm.valid) {
            if (this.sIndex === 0) {
              this.isNewProviderWindowOpen = false;
              this.newProviderValidationMsg = '';
              this.moveAutoFillData.ProviderName = this.newProviderAddress.providerName;
              this.moveAutoFillData.FullAddress = this.newProviderAddress.address;
              this.moveAutoFillData.Phone = this.newProviderAddress.phone;
              this.newProviderInformationForm.reset();

            } else {
              this.isNewProviderWindowOpen = false;
              this.newProviderValidationMsg = '';
              this.newProviderChildTabAddress.name = this.newProviderAddress.providerName;
              this.newProviderChildTabAddress.address = this.newProviderAddress.address;
              this.newProviderChildTabAddress.city = this.newProvider.cityID.city;
              this.newProviderChildTabAddress.state = this.newProvider.stateID.state;
              this.newProviderChildTabAddress.zipcode = this.newProvider.zipcodeID.zipcode;
              this.newProviderInformationForm.reset();
            }
            this.newProvider.providerTypeID = !isNullOrUndefined(this.newProvider.providerTypeID) ? this.newProvider.providerTypeID.ProviderTypeID : null;
            this.newProvider.stateID = !isNullOrUndefined(this.newProvider.stateID) ? this.newProvider.stateID.stateID : null;
            this.newProvider.cityID = !isNullOrUndefined(this.newProvider.cityID) ? this.newProvider.cityID.cityID : null;
            this.newProvider.relativeTypeID = !isNullOrUndefined(this.newProvider.relativeTypeID) ? this.newProvider.relativeTypeID.relativeTypeID : null;
            this.newProvider.primaryRaceID = !isNullOrUndefined(this.newProvider.primaryRaceID) ? this.newProvider.primaryRaceID.raceID : null;
            this.newProvider.primaryGenderID = !isNullOrUndefined(this.newProvider.primaryGenderID) ? this.newProvider.primaryGenderID.genderID : null;
            this.newProvider.secondaryRaceID = !isNullOrUndefined(this.newProvider.secondaryRaceID) ? this.newProvider.secondaryRaceID.raceID : null;
            this.newProvider.secondaryGenderID = !isNullOrUndefined(this.newProvider.secondaryGenderID) ? this.newProvider.secondaryGenderID.genderID : null;
            this.newProvider.primaryDOB = !isNullOrUndefined(this.newProvider.primaryDOB) ? this._localvalues.stringFormatDatetime(this.newProvider.primaryDOB) : null;
            this.newProvider.secondaryDOB = !isNullOrUndefined(this.newProvider.secondaryDOB) ? this._localvalues.stringFormatDatetime(this.newProvider.secondaryDOB) : null;
            this.newProvider.zipcodeID = !isNullOrUndefined(this.newProvider.zipcodeID) ? this.newProvider.zipcodeID.zipcodeID : null;
            this.newProvider.otherProviderName = this.newProviderAddress.providerName;
            this.newProvider.phone = this.newProviderAddress.phone;
            this.newProvider.serviceAddress = this.newProviderAddress.address;
            this.newProvider.enteredBy = null;
            this.newProvider.changedBy = null;
            this._opencard.saveNewProvider(this.newProvider).then(data => {
              if (data.responseStatus) {
                swal('Success', 'Provider information saved', 'success');
              }
            })
          } else {
            this.newProviderValidationMsg = 'Please fill the mandatory fields!';
          }
        }
      } else {
        this.newProviderValidationMsg = 'Please fill the mandatory fields!';
      }
    } else {
      this.newProvider.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
      if (this.isPrimaryProvider) {
        if (this.newProviderInformationForm.valid && this.newPrimaryProviderForm.valid) {
          if (this.sIndex === 0) {
            this.isNewProviderWindowOpen = false;
            this.newProviderValidationMsg = '';
            this.moveAutoFillData.ProviderName = this.newProviderAddress.providerName;
            this.moveAutoFillData.FullAddress = this.newProviderAddress.address;
            this.moveAutoFillData.Phone = this.newProviderAddress.phone;
            this.newProviderInformationForm.reset();
            this.newPrimaryProviderForm.reset();

          } else {
            this.isNewProviderWindowOpen = false;
            this.newProviderValidationMsg = '';
            this.newProviderChildTabAddress.name = this.newProviderAddress.providerName;
            this.newProviderChildTabAddress.address = this.newProvider.serviceAddress;
            this.newProviderChildTabAddress.city = this.newProvider.cityID.city;
            this.newProviderChildTabAddress.state = this.newProvider.stateID.state;
            this.newProviderChildTabAddress.zipcode = this.newProvider.zipcodeID.zipcode;
            this.newProviderInformationForm.reset();
            this.newPrimaryProviderForm.reset();
          }
          this.newProvider.providerTypeID = !isNullOrUndefined(this.newProvider.providerTypeID) ? this.newProvider.providerTypeID.ProviderTypeID : null;
          this.newProvider.stateID = !isNullOrUndefined(this.newProvider.stateID) ? this.newProvider.stateID.stateID : null;
          this.newProvider.cityID = !isNullOrUndefined(this.newProvider.cityID) ? this.newProvider.cityID.cityID : null;
          this.newProvider.relativeTypeID = !isNullOrUndefined(this.newProvider.relativeTypeID) ? this.newProvider.relativeTypeID.relativeTypeID : null;
          this.newProvider.primaryRaceID = !isNullOrUndefined(this.newProvider.primaryRaceID) ? this.newProvider.primaryRaceID.raceID : null;
          this.newProvider.primaryGenderID = !isNullOrUndefined(this.newProvider.primaryGenderID) ? this.newProvider.primaryGenderID.genderID : null;
          this.newProvider.secondaryRaceID = !isNullOrUndefined(this.newProvider.secondaryRaceID) ? this.newProvider.secondaryRaceID.raceID : null;
          this.newProvider.secondaryGenderID = !isNullOrUndefined(this.newProvider.secondaryGenderID) ? this.newProvider.secondaryGenderID.genderID : null;
          this.newProvider.primaryDOB = !isNullOrUndefined(this.newProvider.primaryDOB) ? this._localvalues.stringFormatDatetime(this.newProvider.primaryDOB) : null;
          this.newProvider.secondaryDOB = !isNullOrUndefined(this.newProvider.secondaryDOB) ? this._localvalues.stringFormatDatetime(this.newProvider.secondaryDOB) : null;
          this.newProvider.zipcodeID = !isNullOrUndefined(this.newProvider.zipcodeID) ? this.newProvider.zipcodeID.zipcodeID : null;
          this.newProvider.otherProviderName = this.newProviderAddress.providerName;
          this.newProvider.phone = this.newProviderAddress.phone;
          this.newProvider.serviceAddress = this.newProviderAddress.address;
          this.newProvider.enteredBy = null;
          this.newProvider.changedBy = null;
          this._opencard.saveNewProvider(this.newProvider).then(data => {
            if (data.responseStatus) {
              swal('Success', 'Provider information saved', 'success');
              if (this.sIndex === 0) {
                this.pcSiteOtherProviderID_From = data.pCSiteOtherProviderID;
              } else {
                this.pcsiteOtherProviderID = data.pCSiteOtherProviderID;
              }
            }
          })
        } else {
          this.newProviderValidationMsg = 'Please fill the mandatory fields!';
        }
      } else {
        if (this.newProviderInformationForm.valid) {
          if (this.sIndex === 0) {
            this.isNewProviderWindowOpen = false;
            this.newProviderValidationMsg = '';
            this.moveAutoFillData.ProviderName = this.newProviderAddress.providerName;
            this.moveAutoFillData.FullAddress = this.newProviderAddress.address;
            this.moveAutoFillData.Phone = this.newProviderAddress.phone;
            this.newProviderInformationForm.reset();

          } else {
            this.isNewProviderWindowOpen = false;
            this.newProviderValidationMsg = '';
            this.newProviderChildTabAddress.name = this.newProviderAddress.providerName;
            this.newProviderChildTabAddress.address = this.newProvider.serviceAddress;
            this.newProviderChildTabAddress.city = this.newProvider.cityID.city;
            this.newProviderChildTabAddress.state = this.newProvider.stateID.state;
            this.newProviderChildTabAddress.zipcode = this.newProvider.zipcodeID.zipcode;
            this.newProviderInformationForm.reset();
          }
          this.newProvider.providerTypeID = !isNullOrUndefined(this.newProvider.providerTypeID) ? this.newProvider.providerTypeID.ProviderTypeID : null;
          this.newProvider.stateID = !isNullOrUndefined(this.newProvider.stateID) ? this.newProvider.stateID.stateID : null;
          this.newProvider.cityID = !isNullOrUndefined(this.newProvider.cityID) ? this.newProvider.cityID.cityID : null;
          this.newProvider.relativeTypeID = !isNullOrUndefined(this.newProvider.relativeTypeID) ? this.newProvider.relativeTypeID.relativeTypeID : null;
          this.newProvider.primaryRaceID = !isNullOrUndefined(this.newProvider.primaryRaceID) ? this.newProvider.primaryRaceID.raceID : null;
          this.newProvider.primaryGenderID = !isNullOrUndefined(this.newProvider.primaryGenderID) ? this.newProvider.primaryGenderID.genderID : null;
          this.newProvider.secondaryRaceID = !isNullOrUndefined(this.newProvider.secondaryRaceID) ? this.newProvider.secondaryRaceID.raceID : null;
          this.newProvider.secondaryGenderID = !isNullOrUndefined(this.newProvider.secondaryGenderID) ? this.newProvider.secondaryGenderID.genderID : null;
          this.newProvider.primaryDOB = !isNullOrUndefined(this.newProvider.primaryDOB) ? this._localvalues.stringFormatDatetime(this.newProvider.primaryDOB) : null;
          this.newProvider.secondaryDOB = !isNullOrUndefined(this.newProvider.secondaryDOB) ? this._localvalues.stringFormatDatetime(this.newProvider.secondaryDOB) : null;
          this.newProvider.zipcodeID = !isNullOrUndefined(this.newProvider.zipcodeID) ? this.newProvider.zipcodeID.zipcodeID : null;
          this.newProvider.otherProviderName = this.newProviderAddress.providerName;
          this.newProvider.phone = this.newProviderAddress.phone;
          this.newProvider.serviceAddress = this.newProviderAddress.address;
          this.newProvider.enteredBy = null;
          this.newProvider.changedBy = null;
          this._opencard.saveNewProvider(this.newProvider).then(data => {
            if (data.responseStatus) {
              swal('Success', 'Provider information saved', 'success');
              if (this.sIndex === 0) {
                this.pcSiteOtherProviderID_From = data.pCSiteOtherProviderID;
              } else {
                this.pcsiteOtherProviderID = data.pCSiteOtherProviderID;
              }
            }
          })
        } else {
          this.newProviderValidationMsg = 'Please fill the mandatory fields!';
        }
      }

    }
  }

  onSelectProviderType(event: any) {
    console.log('selected provider type', event);
    if (event.IsRequirePersonInfo_MoveForm) {
      this.isPrimaryProvider = true;
      this.isSecondaryProvider = true;
    } else {
      this.isPrimaryProvider = false;
      this.isSecondaryProvider = false;
    }
  }

  async getNewProviderTyes(event: any) {
    let newProviderMembers = await this._opencard.getNewProviderTypes()
    this.metaData = newProviderMembers.filter(item => {
      return item.ProviderType_MoveForm.toLowerCase().indexOf(event.query) !== -1;
    })
  }

  newProviderInfoFormValidation() {
    this.newProviderInformationForm = this._fb.group({
      providerName: [null, Validators.compose([Validators.required])],
      providerTypeID: [null, Validators.compose([Validators.required])],
      phone: [null],
      email: [null],
      address: [null, Validators.compose([Validators.required])],
      stateID: [null, Validators.compose([Validators.required])],
      cityID: [null, Validators.compose([Validators.required])],
      zipcodeID: [null, Validators.compose([Validators.required])],
      relativeTypeID: [null],
    })
  }

  newPrimaryProviderInfoValidation() {
    this.newPrimaryProviderForm = this._fb.group({
      primaryProviderName: [null, Validators.compose([Validators.required])],
      primaryDOB: [null, Validators.compose([Validators.required])],
      primaryRaceID: [null, Validators.compose([Validators.required])],
      primaryGenderID: [null, Validators.compose([Validators.required])],
      primarySSN: [null, Validators.compose([Validators.required])],
    })
  }

  newProviderKeymap() {

    return;
  }

  newProviderOutput(event: any) {
    console.log('From move form new provider output', event)
    this.isNewProviderWindowOpen = event.isPromptOpen;
    if (event.selectedTab === 0) {
      this.moveAutoFillData.ProviderName = event.providerName;
      this.moveAutoFillData.FullAddress = event.address;
      this.moveAutoFillData.Phone = event.phoneNumber;
      this.pcSiteOtherProviderID_From = event.pCSiteOtherProviderID;
    } else {
      this.newPlacementProviderInfo = {
        providerName: event.providerName,
        phone: event.phoneNumber,
        address: event.address + ',' + event.address2
      };
      this.newPlacementInfoProviderName = event.providerName;
      this.newPlacementInfoAddressLineOne = event.address;
      this.newPlacementInfoAddressLineTwo = event.address2;
      this.pcsiteOtherProviderID = event.pCSiteOtherProviderID;
    }
    console.log('move form new child info', this.childEnteredAutoFetchField);
    this.newProviderAutoFetchData = Object.assign({}, this.childEnteredAutoFetchField, event);
    this._opencard.storeMovePrintData(this.moveForm, this.moveAutoFillData, this.moveAutoFetch_sfcsOffice, this.newProviderAutoFetchData);
  };
  providerLists = [];
  getProviderDrop(event) {
    let request = {
      beginDate: this._localvalues.stringFormatDatetime(Date.now()),
      referralTypeID: parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey(),
      beginPagination: 1,
      endPagination: 100,
      value: event.query
    };
    this._opencard.placementProviders(request).then(res => {
      console.log("res>>>>", res);
      this.providerLists = res;
    })
  };
  toLocationID: any;
  movetoLocationID(event) {
    this.toLocationID = event.providerLocationID;
    console.log("event>>>>", event);
  };
  fromLocationID: any;
  fromLocatID(event) {
    this.fromLocationID = event.providerLocationID;
    console.log("event>>>>", event);
  }

  navigateTo() {
    // TODO
  }
}
