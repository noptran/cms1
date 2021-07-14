import { Component, OnInit, ViewChild } from '@angular/core';
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import {LocalValues} from "../../local-values";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CaseTeamService } from "../../case-team/case-team.service";
import { PersonMasterWizards } from '../../wizards/person-master/person-master-wizards';
import { PersonMasterWizardsComponent } from '../../wizards/person-master/person-master-wizards.component';
import { FamilMemberFormComponent } from '../../famil-member-form/famil-member-form.component';
import { StaffFormComponent } from '../../staff-form/staff-form.component';
import { Dcf } from '../../dcf-form/dcf';
import { FamilyMember } from '../../famil-member-form/family-member';
import { StaffForm } from '../../staff-form/staff-form';
import { DcfFormComponent } from '../../dcf-form/dcf-form.component';
import { isNullOrUndefined } from "util";
import swal from "sweetalert2";
import * as moment from 'moment';
import { SUBRFC } from './sub-rfc';



@Component({
  selector: 'app-sub-rfc',
  templateUrl: './sub-rfc.component.html',
  styleUrls: ['./sub-rfc.component.scss']
})
export class SUBRFCComponent implements OnInit {
  constructor(public _openCard: OpencardsService, public __localVlaues: LocalValues,
    public _router: Router, public _fb: FormBuilder, public _caseTeam: CaseTeamService) { }
title = 'Sub Reintegration';
quickMenu = 'referrel';
status = 'draft';
edit = false;
formStatus = true;
clientName: any;    
breadcrumbs = [];
openCards = [];
discardTo = '/reports/opencards/list/client/case';
subrfcOpencards = [];
iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';
subrfcForm: FormGroup;
ri: SUBRFC = new SUBRFC();
metaData = [];
request: {};
isEditMode = false;
isEdit = false;
mainTabs = [];
sIndex = 0;
ddOptions = [];
filteredDDOptions = [];
booleanYes = { view: 1, value: 1 };
referralAttachmentList: any = [];
opencardMasterLink = 'sub-rfc/referral/opencard/';
sfcsNotes: string;
kees: any;
kaecses: any;
riTemp: any;
  url: any;
  isAttachmentRequired = false;
  @ViewChild(PersonMasterWizardsComponent, {static: false}) personMasterWizardsComponent: PersonMasterWizardsComponent;
  public isDCFComponent = false;
  @ViewChild(DcfFormComponent, {static: false}) dcfFormComponent: DcfFormComponent;
  @ViewChild(FamilMemberFormComponent, {static: false}) familyMemberComponent: FamilMemberFormComponent;
  @ViewChild(StaffFormComponent, {static: false}) staffFormComponent: StaffFormComponent;
  isFamilyMemberPromptEnabled = false;
  isFamilyMemberComponent = false;
  isStaffPromptEnabled = false;
  isStaffComponent = false;
  selectedDCFDropdownField: string;
  selectedFMDropdownField: string;
formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;


  ngOnInit() {
    this.formValidation();
    if (this._router.url.includes('/sub-rfc/detail')) {
      this.getRecById();
      this.isAttachmentRequired = true;
    }
    this.defineMainTabs();
    this.defineOpencards();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case List', href: "/reports/opencards/list/client/case", active: '' },
      { label: 'sub-rfc', active: 'active' },
    )
    this.ddOptions.push({ value: 1, view: 'Yes' }, { value: 2, view: 'No' }, { value: 3, view: 'N/A' })
    /**
     * To open section 1 tab by default,call the function
     * index must be 0 and value must be '#nav-general'
     */
    let hasValue = { target: { hash: '#nav-general' } }
    this.setIndex(0, hasValue);
    this.subrfcOpencards.sort((a, b) => { return a['title'].localeCompare(b['title']) })
  }

  setIndex(index: number, event: any) {
    let hasValue = [];
    hasValue = event.target.hash;
    this.sIndex = index;
  }

  defineMainTabs() {
    return this.mainTabs = [
      { label: 'General Information', href: '#nav-general' },
      { label: 'Specific Reason(s)', href: '#nav-specific' },
      { label: 'Siblings', href: '#nav-sibiling' },
      { label: 'Important Connections', href: '#nav-important' },
      { label: 'School Information', href: '#nav-school' },
      { label: 'Other Information', href: '#nav-other' },
    ]
  }

  addForm(source: any) {
    if (this.subrfcForm.valid) {
      if (this.marked) {
        if (source.specialEDType === "" || source.specialEDType === null || source.specialEDType === undefined) {
          swal('Warning', 'Please fill the Special Education Type', 'info')
        } else if (source.regPubSchool === 0 && source.specialEDTypeUnknown === 0 && source.specialED === 0) {
          swal('Warning', 'Please fill the mandatoy fields', 'info')
        } else {
          let temp = [], rawData: any;
          source.clientID = parseInt(localStorage.getItem('clientId')) - this._openCard.getHasKey();
          source.receivedDateTime = this.__localVlaues.stringFormatDatetime(Date.parse(source.receivedDateTime));
          source.referralDate = this.__localVlaues.stringFormatDatetime(Date.parse(source.referralDate));
          source.dateTimeRetrieved = this.__localVlaues.stringFormatDatetime(Date.parse(source.dateTimeRetrieved));
          !isNullOrUndefined(source.countyID) ? source.countyID = source.countyID.countyID : null;
          !isNullOrUndefined(source.srsStaffID) ? source.srsStaffID = source.srsStaffID.srsstaffID : null;
          !isNullOrUndefined(source.staffID) ? source.staffID = source.staffID.staffID : null;
          !isNullOrUndefined(source.tribeID) ? source.tribeID = source.tribeID.tribeID : null;
          !isNullOrUndefined(source.familyMemberID) ? source.familyMemberID = source.familyMemberID.familyMemberID : null;
          !isNullOrUndefined(source.fmRelationShipID) ? source.fmRelationShipID = source.fmRelationShipID.personTypeID : null;
          !isNullOrUndefined(source.motherName_FamilyMemberID) ? source.motherName_FamilyMemberID = source.motherName_FamilyMemberID.familyMemberID : null;
          !isNullOrUndefined(source.fatherName_FamilyMemberID) ? source.fatherName_FamilyMemberID = source.fatherName_FamilyMemberID.familyMemberID : null;
          !isNullOrUndefined(source.pickupLocationPersonTypeID) ? source.pickupLocationPersonTypeID = source.pickupLocationPersonTypeID.personTypeID : null;
          !isNullOrUndefined(source.galid) ? source.galid = source.galid.galid : null;
          !isNullOrUndefined(source.csvid) ? source.csvid = source.csvid.csvid : null;
          !isNullOrUndefined(source.casaOfficerID) ? source.casaOfficerID = source.casaOfficerID.casaOfficerID : null;
          !isNullOrUndefined(source.crbcoordinatorID) ? source.crbcoordinatorID = source.crbcoordinatorID.crbcoordinatorID : null;
          !isNullOrUndefined(source.judgeID) ? source.judgeID = source.judgeID.judgeID : null;
          !isNullOrUndefined(source.fswID) ? source.fswID = source.fswID.staffID : null;
          !isNullOrUndefined(source.communityMemberID) ? source.communityMemberID = source.communityMemberID.communityMemberID : null;
          !isNullOrUndefined(source.cmPersonTypeID) ? source.cmPersonTypeID = source.cmPersonTypeID.personTypeID : null;
          !isNullOrUndefined(source.payorID) ? source.payorID = source.payorID.payorID : null;
          !isNullOrUndefined(source.primary_ReasonForRemovalID) ? source.primary_ReasonForRemovalID = source.primary_ReasonForRemovalID.reasonForRemovalID : null;
          !isNullOrUndefined(source.secondary_ReasonForRemovalID) ? source.secondary_ReasonForRemovalID = source.secondary_ReasonForRemovalID.reasonForRemovalID : null;
          !isNullOrUndefined(source.schoolID) ? source.schoolID = source.schoolID.schoolID : null;
          !isNullOrUndefined(source.other) ? source.other = source.other.yesNoPendingID : null;
          !isNullOrUndefined(source.medication) ? source.medication = source.medication.yesNoPendingID : null;
          !isNullOrUndefined(source.pregnant) ? source.pregnant = source.pregnant.yesNoPendingID : null;
          !isNullOrUndefined(source.drugsAlcohol) ? source.drugsAlcohol = source.drugsAlcohol.yesNoPendingID : null;
          !isNullOrUndefined(source.sexualOffender) ? source.sexualOffender = source.sexualOffender.yesNoPendingID : null;
          !isNullOrUndefined(source.sexualAbused) ? source.sexualAbused = source.sexualAbused.yesNoPendingID : null;
          !isNullOrUndefined(source.physicalAggression) ? source.physicalAggression = source.physicalAggression.yesNoPendingID : null;
          !isNullOrUndefined(source.verbalAggression) ? source.verbalAggression = source.verbalAggression.yesNoPendingID : null;
          !isNullOrUndefined(source.runner) ? source.runner = source.runner.yesNoPendingID : null;
          !isNullOrUndefined(source.disability) ? source.disability = source.disability.yesNoPendingID : null;
          !isNullOrUndefined(source.suicidal) ? source.suicidal = source.suicidal.yesNoPendingID : null;
          !isNullOrUndefined(source.allergies) ? source.allergies = source.allergies.yesNoPendingID : null;
          !isNullOrUndefined(source.fireStarter) ? source.fireStarter = source.fireStarter.yesNoPendingID : null;
          !isNullOrUndefined(source.vandalism) ? source.vandalism = source.vandalism.yesNoPendingID : null;
          !isNullOrUndefined(source.handiCap) ? source.handiCap = source.handiCap.yesNoPendingID : null;
          !isNullOrUndefined(source.srsLiasonID) ? source.srsLiasonID = source.srsLiasonID.srsstaffID : null;
          source.sfaOfficeID = source.countyID;
          source.enteredBy = '';
          temp.push(source)
          temp.filter((item: any) => {
            if (Object.values(item)) {
              rawData = JSON.stringify(item).toString().replace(/true/g, '1')
              JSON.parse(rawData)
            }
          })
          source = rawData;
          source = JSON.parse(source);
          !isNullOrUndefined(this.ri.referralID) ? this.update(source) : this.save(source)
        }
      } else {
        if (source.regPubSchool === 0 && source.specialEDTypeUnknown === 0 && source.specialED === 0) {
          swal('Warning', 'Please fill the mandatoy fields', 'info')
        } else {
          let temp = [], rawData: any;
          source.clientID = parseInt(localStorage.getItem('clientId')) - this._openCard.getHasKey();
          source.receivedDateTime = this.__localVlaues.stringFormatDatetime(Date.parse(source.receivedDateTime));
          source.referralDate = this.__localVlaues.stringFormatDatetime(Date.parse(source.referralDate));
          source.dateTimeRetrieved = this.__localVlaues.stringFormatDatetime(Date.parse(source.dateTimeRetrieved));
          !isNullOrUndefined(source.countyID) ? source.countyID = source.countyID.countyID : null;
          !isNullOrUndefined(source.srsStaffID) ? source.srsStaffID = source.srsStaffID.srsstaffID : null;
          !isNullOrUndefined(source.staffID) ? source.staffID = source.staffID.staffID : null;
          !isNullOrUndefined(source.tribeID) ? source.tribeID = source.tribeID.tribeID : null;
          !isNullOrUndefined(source.familyMemberID) ? source.familyMemberID = source.familyMemberID.familyMemberID : null;
          !isNullOrUndefined(source.fmRelationShipID) ? source.fmRelationShipID = source.fmRelationShipID.personTypeID : null;
          !isNullOrUndefined(source.motherName_FamilyMemberID) ? source.motherName_FamilyMemberID = source.motherName_FamilyMemberID.familyMemberID : null;
          !isNullOrUndefined(source.fatherName_FamilyMemberID) ? source.fatherName_FamilyMemberID = source.fatherName_FamilyMemberID.familyMemberID : null;
          !isNullOrUndefined(source.pickupLocationPersonTypeID) ? source.pickupLocationPersonTypeID = source.pickupLocationPersonTypeID.personTypeID : null;
          !isNullOrUndefined(source.galid) ? source.galid = source.galid.galid : null;
          !isNullOrUndefined(source.csvid) ? source.csvid = source.csvid.csvid : null;
          !isNullOrUndefined(source.casaOfficerID) ? source.casaOfficerID = source.casaOfficerID.casaOfficerID : null;
          !isNullOrUndefined(source.crbcoordinatorID) ? source.crbcoordinatorID = source.crbcoordinatorID.crbcoordinatorID : null;
          !isNullOrUndefined(source.judgeID) ? source.judgeID = source.judgeID.judgeID : null;
          !isNullOrUndefined(source.fswID) ? source.fswID = source.fswID.staffID : null;
          !isNullOrUndefined(source.communityMemberID) ? source.communityMemberID = source.communityMemberID.communityMemberID : null;
          !isNullOrUndefined(source.cmPersonTypeID) ? source.cmPersonTypeID = source.cmPersonTypeID.personTypeID : null;
          !isNullOrUndefined(source.payorID) ? source.payorID = source.payorID.payorID : null;
          !isNullOrUndefined(source.primary_ReasonForRemovalID) ? source.primary_ReasonForRemovalID = source.primary_ReasonForRemovalID.reasonForRemovalID : null;
          !isNullOrUndefined(source.secondary_ReasonForRemovalID) ? source.secondary_ReasonForRemovalID = source.secondary_ReasonForRemovalID.reasonForRemovalID : null;
          !isNullOrUndefined(source.schoolID) ? source.schoolID = source.schoolID.schoolID : null;
          !isNullOrUndefined(source.other) ? source.other = source.other.yesNoPendingID : null;
          !isNullOrUndefined(source.medication) ? source.medication = source.medication.yesNoPendingID : null;
          !isNullOrUndefined(source.pregnant) ? source.pregnant = source.pregnant.yesNoPendingID : null;
          !isNullOrUndefined(source.drugsAlcohol) ? source.drugsAlcohol = source.drugsAlcohol.yesNoPendingID : null;
          !isNullOrUndefined(source.sexualOffender) ? source.sexualOffender = source.sexualOffender.yesNoPendingID : null;
          !isNullOrUndefined(source.sexualAbused) ? source.sexualAbused = source.sexualAbused.yesNoPendingID : null;
          !isNullOrUndefined(source.physicalAggression) ? source.physicalAggression = source.physicalAggression.yesNoPendingID : null;
          !isNullOrUndefined(source.verbalAggression) ? source.verbalAggression = source.verbalAggression.yesNoPendingID : null;
          !isNullOrUndefined(source.runner) ? source.runner = source.runner.yesNoPendingID : null;
          !isNullOrUndefined(source.disability) ? source.disability = source.disability.yesNoPendingID : null;
          !isNullOrUndefined(source.suicidal) ? source.suicidal = source.suicidal.yesNoPendingID : null;
          !isNullOrUndefined(source.allergies) ? source.allergies = source.allergies.yesNoPendingID : null;
          !isNullOrUndefined(source.fireStarter) ? source.fireStarter = source.fireStarter.yesNoPendingID : null;
          !isNullOrUndefined(source.vandalism) ? source.vandalism = source.vandalism.yesNoPendingID : null;
          !isNullOrUndefined(source.handiCap) ? source.handiCap = source.handiCap.yesNoPendingID : null;
          !isNullOrUndefined(source.srsLiasonID) ? source.srsLiasonID = source.srsLiasonID.srsstaffID : null;
          source.sfaOfficeID = source.countyID;
          source.enteredBy = '';
          temp.push(source)
          temp.filter((item: any) => {
            if (Object.values(item)) {
              rawData = JSON.stringify(item).toString().replace(/true/g, '1')
              JSON.parse(rawData)
            }
          })
          source = rawData;
          source = JSON.parse(source);
          !isNullOrUndefined(this.ri.referralID) ? this.update(source) : this.save(source)
        }
      }
    }
    else {
      swal('Warning', 'Please fill the mandatoy fields', 'info')
    }
  }

  save(source) {
    console.log("Save Req", source);
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._openCard.saveSubContract(source).then((data) => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      return this._router.navigate(['/reports/opencards/list/client/case'])
    })
  }
  update(source) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    !isNullOrUndefined(source.caseID) ? source.caseID = source.caseID.caseID : null;
    delete source.courtCaseNo;
    !isNullOrUndefined(source.motherMarried_YesNoPending) ? source.motherMarried_YesNoPending = source.motherMarried_YesNoPending.yesNoPendingID : null;
    !isNullOrUndefined(source.referralTypeID) ? source.referralTypeID = source.referralTypeID.referralTypeID : null;
    this._openCard.updateSubContract(source).then((data) => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      return this._router.navigate(['/reports/opencards/list/client/case'])
    })
  }

  resetForm() {
  }

  discardForm() {
  }

  editForm() {
    this.edit = false;
    this.subrfcForm.enable();
    this.subrfcForm.controls['payorID'].disable();
    this.subrfcForm.controls['courtCaseNo'].disable();
    this.subrfcForm.controls['srsStaffID'].disable();
    this.subrfcForm.controls['srsLiasonID'].disable();
    this.subrfcForm.controls['staffID'].disable();
    this.subrfcForm.controls['tribeID'].disable();
    this.subrfcForm.controls['familyMemberID'].disable();
    this.subrfcForm.controls['fmRelationShipID'].disable();
    this.subrfcForm.controls['motherName_FamilyMemberID'].disable();
    this.subrfcForm.controls['fatherName_FamilyMemberID'].disable();
    this.subrfcForm.controls['schoolID'].disable();
    this.subrfcForm.controls['galid'].disable();
    this.subrfcForm.controls['csvid'].disable();
    this.subrfcForm.controls['casaOfficerID'].disable();
    this.subrfcForm.controls['crbcoordinatorID'].disable();
    this.subrfcForm.controls['judgeID'].disable();
    this.subrfcForm.controls['fswID'].disable();
    this.subrfcForm.controls['communityMemberID'].disable();
    this.subrfcForm.controls['cmPersonTypeID'].disable();
    this.subrfcForm.controls['countyID'].disable();
  }

  getMetaData(event: any, label: any) {
    let reqObj, metaDataReq, email: any;
    switch (label) {
      case 'county':
        reqObj = 'county';
        break;
      case 'dcfSocial':
        reqObj = 'srsStaff';
        break;
      case 'dcfLiaison':
        reqObj = 'srsStaff';
        break;
      case 'sfcsWorker':
        reqObj = 'staff';
        break;
      case 'tribe':
        reqObj = 'tribe';
        break;
      case 'removal_parent':
        reqObj = 'familyMember';
        break;
      case 'relationship':
        reqObj = 'personType';
        break;

      case 'mother_name':
        reqObj = 'familyMember';
        break;

      case 'father_name':
        reqObj = 'familyMember';
        break;

      case 'primary_reason':
        reqObj = 'reasonForRemoval';
        break;
      case 'secondary_reason':
        reqObj = 'reasonForRemoval';
        break;

      case 'medication':
        reqObj = 'yesNoPending';
        break;

      case 'pregnant':
        reqObj = 'yesNoPending';
        break;

      case 'durgs_alcohol':
        reqObj = 'yesNoPending';
        break;

      case 'sexual_offender':
        reqObj = 'yesNoPending';
        break;

      case 'sexually_abused':
        reqObj = 'yesNoPending';
        break;

      case 'physical_aggression':
        reqObj = 'yesNoPending';
        break;

      case 'verbal_aggression':
        reqObj = 'yesNoPending';
        break;

      case 'runner':
        reqObj = 'yesNoPending';
        break;

      case 'disability':
        reqObj = 'yesNoPending';
        break;

      case 'suicidal':
        reqObj = 'yesNoPending';
        break;

      case 'allergies':
        reqObj = 'yesNoPending';
        break;

      case 'fire_starter':
        reqObj = 'yesNoPending';
        break;

      case 'vandalism':
        reqObj = 'yesNoPending';
        break;

      case 'other':
        reqObj = 'yesNoPending';
        break;

      case 'guardian':
        reqObj = 'guardianAdLitem';
        break;
      case 'cso':
        reqObj = 'CourtServiceOfficer';
        break;

      case 'casa':
        reqObj = 'casaOfficer';
        break;

      case 'crbCoordinator':
        reqObj = 'CRBCoordinator';
        break;

      case 'judge':
        reqObj = 'Judge';
        break;

      case 'family_support_worker':
        reqObj = 'staff';
        break;

      case 'community_member':
        reqObj = 'communityMember';
        break;

      case 'person_type':
        reqObj = 'personType';
        break;

      case 'case_payor':
        reqObj = 'payor';
        break;
      case 'current_school':
        reqObj = 'schoolName';
        break;

      case 'handiCap':
        reqObj = 'yesNoPending';
        break;

    }
    if (reqObj == 'three_option') {
      this.dropdownOptions(event.query)
    }
    else {
      metaDataReq = { Object: reqObj, value: event.query }
      this._caseTeam.getSearchList(metaDataReq).then((data) => {
        data.dropDown.map((item) => {
          email = !isNullOrUndefined(item.email) ? item.email : 'Email not provided!'
          item['fullName'] = item.lastName + ',' + item.firstName + ' ( ' + email + ' ) ';
        })
        this.metaData = data.dropDown;
      })

    }
  }

  dropdownOptions(query: any) {
    this.ddOptions.filter((item) => { item.view.indexOf(query) !== -1 ? this.filteredDDOptions.push(item) : null })
  }
  returnYes(source) {
    return source.value;
  }
  defineOpencards() {
    if (this._openCard.getOtherRefDetails().referralName === "NC-RFC") {
      this.subrfcOpencards = [
        { title: 'Billable Case Activity', tip: 'Billable Case Activity', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
        { title: 'Case Activity', tip: 'Case Activity', navigation: 'sub-rfc/referral/opencard/case-activity/view', icon: this.iconurl + 'case activity.svg' },
        { title: 'Case File Activity', tip: 'Family', navigation: '', icon: this.iconurl + '' },
        { title: 'Case Team', tip: 'Assessments', navigation: '', icon: 'assets/Nodesicon/case team.svg' },
        { title: 'Court Orders', tip: 'Assessments', navigation: '', icon: this.iconurl + 'order.svg' },
        { title: 'Home County', tip: 'Assessments', navigation: '', icon: this.iconurl + 'home.svg' },
        { title: 'Service Claim', tip: 'service claims', navigation: '', icon: 'assets/Nodesicon/service claim.svg' },
        { title: 'SFM Office', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        { title: 'Appointments', tip: 'Assessments', navigation: '', icon: 'assets/Nodesicon/appointment.svg' },
        { title: 'Siblings In Out-Of-Home-Family', tip: 'Siblings In Out-Of-Home-Family', navigation: '', icon: this.iconurl + '' },
      ];
    }
    else if (this._openCard.getOtherRefDetails().referralName === "NC-FCH") {
      this.subrfcOpencards = [
        { title: 'Assessments', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
        { title: 'Authorization Summary', tip: 'Authorization Summary', navigation: '', icon: this.iconurl + '' },
        { title: 'Case File Activity', tip: 'Family', navigation: '', icon: this.iconurl + '' },
        { title: 'Case Team', tip: 'Assessments', navigation: '', icon: 'assets/Nodesicon/case team.svg' },
        { title: 'Family', tip: 'Family', navigation: '', icon: this.iconurl + '' },
        { title: 'Home County', tip: 'Assessments', navigation: '', icon: this.iconurl + 'home.svg' },
        { title: 'Service Claim', tip: 'service claims', navigation: '', icon: this.iconurl + '' },
        { title: 'SFM Office', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        { title: 'Adoption', tip: 'Adoption', navigation: '', icon: this.iconurl + '' },
        { title: 'Appointments', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        { title: 'Medical', tip: 'Medical', navigation: '', icon: this.iconurl + '' },
        { title: 'Monthly Reports', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        { title: 'Placements', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        { title: 'School', tip: 'School', navigation: '', icon: this.iconurl + '' }
      ];

    }

    else {
      this.subrfcOpencards = [
        { title: 'Assessments', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
        { title: 'Behavior Assessments', tip: 'Behavior Assessments', navigation: '', count: '10', icon: this.iconurl + '' },
        { title: 'Case Activity', tip: 'Case Activity', navigation: 'sub-rfc/referral/opencard/case-activity/view', count: '0', icon: this.iconurl + 'case activity.svg' },
        { title: 'Case Plan Goals', tip: 'Assessments', navigation: '', icon: this.iconurl + 'case goals.svg' },
        { title: 'Court Orders', tip: 'Assessments', navigation: '', icon: this.iconurl + 'order.svg' },
        { title: 'Appointments', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        { title: 'Case Evaluation', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        { title: 'Case Team', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        { title: 'Home County', tip: 'Assessments', navigation: '', icon: this.iconurl + 'home.svg' },
        { title: 'SFM Office', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        // { title: 'BH Determination', tip: 'Assessments', navigation: '',  icon: this.iconurl + '' },
        // { title: 'Kan-Be-Healthy', tip: 'Assessments', navigation: '',  icon: this.iconurl + '' },
        { title: 'Monthly Reports', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        { title: 'Supervisory Staffing Form', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        { title: 'Supervisory Staffing Form for Supervisor', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        { title: 'Placements', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        { title: 'Independent Living', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
        { title: 'Family', tip: 'Family', navigation: '', icon: this.iconurl + '' },
        // { title: 'Health Record', tip: 'Family', navigation: '',  icon: this.iconurl + '' },
        { title: 'Social Security Income', tip: 'Family', navigation: '', icon: this.iconurl + '' },
        { title: 'Case File Activity', tip: 'Family', navigation: '', icon: this.iconurl + '' },
        { title: 'Service Claim', tip: 'service claims', navigation: '', icon: this.iconurl + '' },
        // { title: 'Immunization', tip: 'service claims', navigation: '',  icon: this.iconurl + '' },
        // { title: 'Waiver', tip: 'service claims', navigation: '',  icon: this.iconurl + '' },
        { title: 'KIPP', tip: 'service claims', navigation: '', icon: this.iconurl + '' },
        { title: 'Placement Referral', tip: 'service claims', navigation: '', icon: this.iconurl + '' },
        { title: 'Move and Permanency', tip: 'service claims', navigation: '', icon: this.iconurl + '' },
        { title: 'Authorization Summary', tip: 'Authorization Summary', navigation: '', icon: this.iconurl + '' },
        { title: 'Adoption', tip: 'Adoption', navigation: '', icon: this.iconurl + '' },
        { title: 'School', tip: 'School', navigation: '', icon: this.iconurl + '' },
        { title: 'Medical', tip: 'Medical', navigation: '', icon: this.iconurl + '' },

      ];
    }

  }

  navigateTo(label: any) {
    let url: any;
    switch (label) {
      case 'Case Activity':
        url = '/reintegration/referral/opencard/case-activity/view';
        break;
      case 'Assessments':
        url = '/reintegration/referral/opencard/assessments/view';
        break;
      case 'Case Plan Goals':
        url = '/reintegration/referral/opencard/case-plan-goals/view';
        break;
      case 'Case Evaluation':
        url = '/reintegration/referral/opencard/case-evaluations/view';
        break;
      case 'Case Team':
        url = '/reintegration/referral/opencard/case-team/view';
        break;
      case 'Home County':
        url = '/reintegration/referral/opencard/home-county/view';
        break;
      case 'SFM Office':
        url = '/reintegration/referral/opencard/sfcs-office/view';
        break;
      case 'Court Orders':
        url = '/reintegration/referral/opencard/court-order/view';
        break;
      case 'Family':
        url = '/reports/family/view';
        break;
      case 'Appointments':
        url = '/reintegration/referral/opencard/appointments/view';
        break;
      case 'BH Determination':
        url = '/reintegration/referral/opencard/bh-determination/view';
        break;
      case 'Attending school':
        url = '/reintegration/referral/opencard/attending-school/view';
        break;
      case 'Grade Level':
        url = '/reintegration/referral/opencard/grade-level/view';
        break;
      case 'Home School':
        url = '/reintegration/referral/opencard/home-school/view';
        break;
      case 'School Release':
        url = '/reintegration/referral/opencard/school-release/view';
        break;
      case 'Health Record':
        url = '/reintegration/referral/opencard/health-record/view';
        break;
      case 'Adoption Event':
        url = '/reintegration/referral/opencard/adoption-event/view';
        break;
      case 'Kan-Be-Healthy':
        url = '/reintegration/referral/opencard/kan-be-healthy/view';
        break;
      case 'Monthly Reports':
        url = '/reintegration/referral/opencard/monthly-reports/view';
        break;
      case 'Social Security Income':
        url = '/reintegration/referral/opencard/social-security-income/view';
        break;
      case 'Case File Activity':
        url = '/reintegration/referral/opencard/case-file-activity/view';
        break;
      case 'Independent Living':
        url = '/reintegration/referral/opencard/independent-living/view';
        break;
      case 'Service Claim':
        url = '/reintegration/referral/service';
        break;
      case 'Immunization':
        url = '/reintegration/referral/opencard/immunization/view';
        break;
      case 'Waiver':
        url = '/reintegration/referral/opencard/waiver/view';
        break;
      case 'KIPP/PMTO':
        url = '/reintegration/referral/opencard/kipp-pmto/view';
        break;
      case 'KIPP':
        url = '/reintegration/referral/opencard/kipp/view';
        break;
      case 'Siblings In Out-Of-Home-Family':
        url = '/reintegration/referral/opencard/sibilings-in-out-of-home-family/view';
        break;
      case 'Placements':
        url = '/reintegration/referral/opencard/placement/view';
        break;
      case 'Placement Referral':
        url = '/reintegration/referral/opencard/placement-referral/view';
        break;
      case 'Authorization Summary':
        url = '/reintegration/referral/service/authorization/summary';
        break;
      case 'Adoption':
        url = '/reintegration/referral/opencard/adoption/view';
        break;
      case 'School':
        url = '/reintegration/referral/opencard/school/dashboard';
        break;
      case 'Move and Permanency':
        url = '/reintegration/referral/opencard/move-permanency/dashboard';
        break;
      case 'Behavior Assessments':
        url = '/reports/behavioral-assessment';
        break;
      case 'Medical':
        url = '/reintegration/referral/opencard/medical/dashboard';
        break;
      case 'Supervisory Staffing Form':
        url = '/reports/rfc-supervisory-staffing-form/view';
        break;
      case 'Supervisory Staffing Form for Supervisor':
        url = '/reports/supervisory-staffing-for-superviosrs/view';
        break;
      case 'Billable Case Activity':
        url = '/reports/fp-billable-case-activity/view';
        break;

    }
    if (label === 'Placements') {
      return this._router.navigate([url], { queryParamsHandling: 'preserve' })
    } else {
      return this._router.navigate([url], { queryParamsHandling: 'preserve' })
    }
  }
  closureDate: any;
  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let referralId = parseInt(localStorage.getItem('referralId')) - this._openCard.getHasKey();
    let req = { referralID: referralId }
    this._openCard.getSubContractByID(req).then((data) => {

      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.referral.changedBy) ? data.referral.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.referral.changedDate) ? moment(data.referral.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.referral.enteredBy) ? data.referral.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.referral.enteredDate) ? moment(data.referral.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


      if (data.referral.isActive) {
        !isNullOrUndefined(data.referral.receivedDateTime) ? data.referral.receivedDateTime = moment(data.referral.receivedDateTime).format("MM/DD/YYYY") : data.referral.receivedDateTime = '';
        !isNullOrUndefined(data.referral.referralDate) ? data.referral.referralDate = moment(data.referral.referralDate).format("MM/DD/YYYY") : null;
        !isNullOrUndefined(data.referral.dateTimeRetrieved) ? data.referral.dateTimeRetrieved = moment(data.referral.dateTimeRetrieved).format("MM/DD/YYYY") : null;

      } else {
        !isNullOrUndefined(data.referral.receivedDateTime) ? data.referral.receivedDateTime = moment.utc(data.referral.receivedDateTime).format("MM/DD/YYYY") : data.referral.receivedDateTime = '';
        !isNullOrUndefined(data.referral.referralDate) ? data.referral.referralDate = moment.utc(data.referral.referralDate).format("MM/DD/YYYY") : null;
        !isNullOrUndefined(data.referral.dateTimeRetrieved) ? data.referral.dateTimeRetrieved = moment.utc(data.referral.dateTimeRetrieved).format("MM/DD/YYYY") : null;

      }
      this.closureDate = this.__localVlaues.getDateandTimeWithExt(data.referral.closureDate);
      this.__localVlaues.caseID = !isNullOrUndefined(data.referral.caseID.caseID) ? data.caseID = data.referral.caseID.caseID : null;
      !isNullOrUndefined(data.referral) ? data.referral.facts = data.referral.caseID.facts : null;
      !isNullOrUndefined(data.referral) ? data.referral['payorID'] = data.referral.caseID.payorID : null;
      !isNullOrUndefined(data.referral.motherMarried_YesNoPending) ? data.referral.motherMarried_YesNoPending = data.referral.motherMarried_YesNoPending.yesNoPendingID : null;
      (data.HomeCounty.length > 0) ? data.referral.countyID = data.HomeCounty[0].countyID : null;

      !isNullOrUndefined(data.srsStaffID) ? data.referral['srsStaffID'] = data.srsStaffID : null;
      !isNullOrUndefined(data.srsStaffID) ? data.referral.srsStaffID['fullName'] = data.srsStaffID.lastName + ',' + data.srsStaffID.firstName + ' ( ' + data.srsStaffID.email + ' ) ' : null;

      (data.fatherName_FamilyMemberID.length > 0) ? data.referral['fatherName_FamilyMemberID'] = data.fatherName_FamilyMemberID[0].familyMemberID : null;
      (data.fatherName_FamilyMemberID.length > 0) ? data.referral.fatherName_FamilyMemberID['name'] = data.fatherName_FamilyMemberID[0].familyMemberID.lastName + ', ' + data.fatherName_FamilyMemberID[0].familyMemberID.firstName : null;

      (data.motherName_FamilyMemberID.length > 0) ? data.referral['motherName_FamilyMemberID'] = data.motherName_FamilyMemberID[0].familyMemberID : null;
      (data.motherName_FamilyMemberID.length > 0) ? data.referral.motherName_FamilyMemberID['name'] = data.motherName_FamilyMemberID[0].familyMemberID.lastName + ', ' + data.motherName_FamilyMemberID[0].familyMemberID.firstName : null;

      (data.HomeSchool.length > 0) ? data.referral.schoolID = data.HomeSchool[0].schoolID : null;

      !isNullOrUndefined(data.casaOfficerID) ? data.referral['casaOfficerID'] = data.casaOfficerID : null;
      !isNullOrUndefined(data.casaOfficerID) ? data.referral.casaOfficerID['fullName'] = data.casaOfficerID.lastName + ' ' + data.casaOfficerID.firstName + ' ( ' + data.casaOfficerID.email + ' ) ' : null;

      !isNullOrUndefined(data.crbcoordinatorID) ? data.referral['crbcoordinatorID'] = data.crbcoordinatorID : null;
      !isNullOrUndefined(data.crbcoordinatorID) ? data.referral.crbcoordinatorID['fullName'] = data.crbcoordinatorID.lastName + ' ' + data.crbcoordinatorID.firstName + ' ( ' + data.casaOfficerID.email + ' ) ' : null;

      !isNullOrUndefined(data.judgeID) ? data.referral['judgeID'] = data.judgeID : null;
      !isNullOrUndefined(data.judgeID) ? data.referral.judgeID['fullName'] = data.judgeID.lastName + ' ' + data.judgeID.firstName + ' ( ' + data.judgeID.email + ' ) ' : null;

      !isNullOrUndefined(data.galid) ? data.referral['galid'] = data.galid : null;
      !isNullOrUndefined(data.galid) ? data.referral.galid['fullName'] = data.galid.lastName + ' ' + data.galid.firstName + ' ( ' + data.galid.email + ' ) ' : null;

      (data.CourtCase.length > 0) ? data.referral.courtCaseNo = data.CourtCase[0].courtCaseNo : null;

      // !isNullOrUndefined(data.motherMarried_YesNoPending) ? data.motherMarried_YesNoPending = data.motherMarried_YesNoPending.yesNoPendingID : null;

      !isNullOrUndefined(data.srsLiasonID) ? data.referral['srsLiasonID'] = data.srsLiasonID : null;
      !isNullOrUndefined(data.srsLiasonID) ? data.referral.srsLiasonID['fullName'] = data.srsLiasonID.lastName + ',' + data.srsLiasonID.firstName + ' ( ' + data.srsLiasonID.email + ' ) ' : null;

      /////Added Things////

      !isNullOrUndefined(data.staffID) ? data.referral['staffID'] = data.staffID : null;
      !isNullOrUndefined(data.staffID) ? data.referral.staffID['fullName'] = data.staffID.lastName + ',' + data.staffID.firstName + ' ( ' + data.staffID.email + ' ) ' : null;

      // (data.familyMemberID.length > 0) ? data.referral['fmRelationShipID'] = data.familyMemberID[0].fmRelationShipID.personType : null;
      // !isNullOrUndefined(data.familyMemberID[0].fmRelationShipID) ? data.referral.fmRelationShipID['fullName'] = data.familyMemberID[0].fmRelationShipID.lastName + ' ' + data.familyMemberID[0].fmRelationShipID.firstName + ' ( ' + data.familyMemberID[0].fmRelationShipID.email + ' ) ' : null;

      (data.familyMemberID.length > 0) ? data.referral['familyMemberID'] = data.familyMemberID[0].familyMemberID : null;
      (data.familyMemberID.length > 0) ? data.referral.familyMemberID['name'] = data.familyMemberID[0].familyMemberID.lastName + ', ' + data.familyMemberID[0].familyMemberID.firstName : null;

      (data.familyMemberID.length > 0) ? data.referral['fmRelationShipID'] = data.familyMemberID[0].fmRelationShipID : null;
      // (data.familyMemberID.length > 0) ? data.referral.fmRelationShipID['personType'] = data.familyMemberID[0].fmRelationShipID.personType : null;


      !isNullOrUndefined(data.cmPersonTypeID) ? data.referral['cmPersonTypeID'] = data.cmPersonTypeID : null;

      !isNullOrUndefined(data.csvid) ? data.referral['csvid'] = data.csvid : null;
      !isNullOrUndefined(data.csvid) ? data.referral.csvid['fullName'] = data.csvid.lastName + ' ' + data.csvid.firstName + ' ( ' + data.csvid.email + ' ) ' : null;

      !isNullOrUndefined(data.fswID) ? data.referral['fswID'] = data.fswID : null;
      !isNullOrUndefined(data.fswID) ? data.referral.fswID['fullName'] = data.fswID.lastName + ' ' + data.fswID.firstName + ' ( ' + data.fswID.email + ' ) ' : null;


      // !isNullOrUndefined(data.motherMarried_YesNoPending) ? data.motherMarried_YesNoPending = data.motherMarried_YesNoPending.yesNoPendingID : null;
      this.ri = data.referral;
      loader.style.display = 'none';
      this.subrfcForm.disable();
      this.edit = true;
      localStorage.setItem('referralTypeId', data.referral.referralTypeID.referralTypeID + this._openCard.getHasKey());
      if (!isNullOrUndefined(data.referral.receivedDateTime)) {
        localStorage.setItem('referralRFCBeginDate', data.referral.receivedDateTime);
        data.referral.receivedDateTime = new Date(data.referral.receivedDateTime)
      } else { data.referral.receivedDateTime = null }
      !isNullOrUndefined(data.referral.referralDate) ? data.referral.referralDate = new Date(data.referral.referralDate) : null;
      !isNullOrUndefined(data.referral.dateTimeRetrieved) ? data.referral.dateTimeRetrieved = new Date(data.referral.dateTimeRetrieved) : null;
    })

  }
 

  formValidation() {
    this.subrfcForm = this._fb.group({
      clientID: [null],
      abandonment: [null],
      abuse: [null],
      additionalInfo: [null],
      additionalInformationRemoval: [null],
      allergies: [null],
      annualHouseholdIncome: [null],
      attendTeamMeetingOk: [null],
      attendTeamMeetingReason: [null],
      birthCert: [null],
      birthRecords: [null],
      caseID: [null],
      cfs1000: [null],
      cfs4003: [null],
      changedBy: [null],
      changedDate: [null],
      childAlcoholAbuse: [null],
      childBehaviorProblem: [null],
      childCasePlan: [null],
      childDisability: [null],
      childDrugAbuse: [null],
      cincnan: [null],
      citizenship: [null],
      closureDate: [null],
      closureReasonID: [null],
      closureReasonNote: [null],
      courtDocs: [null],
      currentGrade: [null, Validators.compose([Validators.required])],
      dateTimeRetrieved: [null],
      deathParent: [null],
      deathParentRelinquishment: [null],
      disability: [null],
      dischargeDate: [null],
      dischargeTo: [null],
      drugsAlcohol: [null],
      dualAdj_BeginDate: [null],
      dualAdj_EndDate: [null],
      emotionalAbuse: [null],
      enteredBy: [null],
      enteredDate: [null],
      explanation: [null],
      failureToThrive: [null],
      familyCasePlan: [null],
      familyRefused: [null],
      fba: [null],
      file_StaffID: [null],
      fileIssueDate: [null],
      fireStarter: [null],
      handiCap: [null],
      immunizationRecs: [null],
      inadequateHousing: [null],
      initialReferralDate: [null],
      isAdoptionReferral: [null],
      isChangeOfVenue: [null],
      isFatherIncarcerated: [null],
      isFormerFamilyPresCase: [null],
      isJJAReferral: [null],
      isMotherIncarcerated: [null],
      isOnRadar: [null],
      isSingleParentHousehold: [null],
      isTitleIVEEligible: [null],
      isUSCitizen: [null],
      judicialDistrictID: [null],
      ksde: [null],
      lackSupervision: [null],
      legacy_CaseID: [null],
      legacy_File_StaffID: [null],
      legacy_FP24HR_StaffID: [null],
      legacy_FP48Hr_StaffID: [null],
      legacy_IsKVCTransfer: [null],
      legacy_ReferralID: [null],
      legacy_TFI_CaseID: [null],
      legacy_TFI_ReferralID: [null],
      legacy_UMY_CaseID: [null],
      legacy_UMY_ReferralID: [null],
      medicalCard: [null],
      medicalConsent: [null],
      medicalNeglect: [null],
      medication: [null],
      medRecords: [null],
      minutesSpent: [null],
      mma: [null],
      motherMarried_YesNoPending: [null],
      motherMarriedNotes: [null],
      neglect: [null],
      notes: [null],
      numberLivingInHousehold: [null],
      officeFile: [null],
      other: [null],
      other1: [null],
      other1Desc: [null],
      other2: [null],
      other2Desc: [null],
      otherAttachDescription: [null],
      otherAttachments: [null],
      otherContactFName: [null],
      otherContactLName: [null],
      otherContactMI: [null],
      otherContactPhone: [null],
      otherContactRelationship: [null],
      otherReasonForPlacement: [null],
      outcomes_Adopt_ReleaseDate: [null],
      outcomes_Other_ReleaseDate: [null],
      outcomes_ReleaseDate: [null],
      outcomes_Reuni_ReleaseDate: [null],
      parentAlcoholAbuse: [null],
      parentDrugAbuse: [null],
      parentIllnessDisabilityInability: [null],
      parentIncarceration: [null],
      parentMethUse: [null],
      parentRelinquishment: [null],
      paymentBeginDate: [null],
      paymentEndDate: [null],
      permanencyGoalID: [null],
      physicalAbuse: [null],
      physicalAggression: [null],
      physicalNeglect: [null],
      pickupLocation: [null],
      pickupLocationName: [null],
      pickupLocationPersonTypeID: [null],
      pickupLocationPhone: [null],
      pickupLocationRelationshipID: [null],
      placementEstablishedDate: [null],
      placementNeededDate: [null],
      pregnant: [null],
      primary_ReasonForRemovalID: [null, Validators.compose([Validators.required])],
      primaryLanguage: [null],
      priorAdoptions: [null],
      psychiatricEval: [null],
      reasonForDecline: [null],
      reasonForDeclineID: [null],
      receivedDateTime: [null],
      recidivistDate: [null],
      recidivistDateOverride: [null],
      referralAcceptedID: [null],
      referralDate: [null, Validators.compose([Validators.required])],
      referralReasonID: [null],
      referralReasonID_Secondary: [null],
      referralTypeID: [null],
      regPubSchool: [null,],
      releaseDate: [null],
      releaseOfInfo: [null],
      releaseReasonNote: [null],
      retractedDate: [null],
      retractedReasonNote: [null],
      runaway: [null],
      runner: [null],
      schoolRecs: [null],
      secondary_ReasonForRemovalID: [null],
      serviceTypeID: [null],
      sexualAbuse: [null],
      sexualAbused: [null],
      sexualOffender: [null],
      siblingplacementfactors: [null],
      socialHistory: [null],
      socialSecurityCard: [null],
      specialED: [null,],
      specialEDType: [null],
      specialEDTypeUnknown: [null,],
      specificCourtRecommend: [null],
      suicidal: [null],
      suspectedAbuse: [null],
      transitionDate: [null],
      tribeID: [null],
      tribeNotified: [null],
      truancy: [null],
      vandalism: [null],
      verbalAggression: [null],
      withDrawDate: [null],
      withDrawReasonNote: [null],
      createdDate: [null],
      updatedDate: [null],
      lastModifiedDate: [null],
      isActive: [null],
      isDeleted: [null],
      fp_TransitionDate: [null],
      dhsnotifiedDate: [null],
      fp48HrContactDate: [null],
      dcfplanEndDate: [null],
      fp24HrContactDate: [null],
      dhstrackingNumber: [null],
      csonotifiedDate: [null],
      prtf_BirthPlace: [null],
      prtf_Complexion: [null],
      rfc_TransitionDate: [null],
      srsareaOfficeID: [null],
      prtf_ChurchPreference: [null],
      prtf_HairColor: [null],
      fp48Hr_StaffID: [null],
      fp24Hr_StaffID: [null],
      dcfbeginDate: [null],
      dcfpriorMoves: [null],
      erbeginDate: [null],
      fi_CaseID: [null],
      erendDate: [null],
      icwaapply: [null],
      prtf_EyeColor: [null],
      facts: [null, Validators.compose([Validators.required])],
      courtCaseNo: [null],
      countyID: [null, Validators.compose([Validators.required])],
      srsStaffID: [null, Validators.compose([Validators.required])],
      srsLiasonID: [null, Validators.compose([Validators.required])],
      staffID: [null, Validators.compose([Validators.required])],
      familyMemberID: [null, Validators.compose([Validators.required])],
      fmRelationShipID: [null],
      motherName_FamilyMemberID: [null],
      fatherName_FamilyMemberID: [null],
      schoolID: [null],
      galid: [null],
      csvid: [null],
      casaOfficerID: [null],
      crbcoordinatorID: [null],
      judgeID: [null],
      fswID: [null],
      communityMemberID: [null],
      cmPersonTypeID: [null],
      payorID: [null],
      siblingPlacementFactors: [null]
    })
    this.ri.receivedDateTime = new Date(Date.now())
    this.ri.referralDate = new Date(Date.now())
    this.clientName = localStorage.getItem('clientName')
    this.kees = localStorage.getItem('kees');
    this.kaecses = localStorage.getItem('kaecses');
  }

  navigateUpload() {
    let currentURL = this._router.url;
    if (currentURL == '/sub-rfc/detail') {
      this.url = '/reports/attachment-document/rfc/referral';
    }

    return this._router.navigate([this.url])
  }

  onQuickMenuNav(url: string) {
    if (url === '/sub-rfc/referral/opencard/placement/view') {
      return this._router.navigate([url], { queryParamsHandling: 'preserve' });
    } else {
      return this._router.navigate([url]);
    }
  }

  marked = false;
  showSplEduType(e) {
    this.marked = e;
    console.log(this.marked);
  }

  onClickDCF(selectedDCFField: string) {
    this.selectedDCFDropdownField = selectedDCFField;
    this.personMasterWizardsComponent.wizard = new PersonMasterWizards();
    this.personMasterWizardsComponent.selectedClient = '';
    this.personMasterWizardsComponent.selectedModule.display = 'DCF Staff';
    this.personMasterWizardsComponent.selectedModule.value = 'SRSStaff';
    this.personMasterWizardsComponent.isKaecsesMandatory = false;
    this.personMasterWizardsComponent.isKaecsesDisable = false;
    this.personMasterWizardsComponent.navigationSelect = false;
    return this.personMasterWizardsComponent.isPersonMasterWizardsOpen = true;
  }

  onClickFamilyMember(field) {
    this.selectedFMDropdownField = field;
    this.isFamilyMemberPromptEnabled = true;
    this.personMasterWizardsComponent.wizard = new PersonMasterWizards();
    this.personMasterWizardsComponent.selectedClient = '';
    this.personMasterWizardsComponent.selectedModule.display = 'Family Member';
    this.personMasterWizardsComponent.selectedModule.value = 'FamilyMember';
    this.personMasterWizardsComponent.isKaecsesMandatory = false;
    this.personMasterWizardsComponent.isKaecsesDisable = false;
    this.personMasterWizardsComponent.isNonContractVisible = false;
    this.personMasterWizardsComponent.isSSNVisbile = true;
    this.personMasterWizardsComponent.navigationSelect = false;
    return this.personMasterWizardsComponent.isPersonMasterWizardsOpen = true;
  }

  getPersonmasterWizardSelection(event: any) {
    console.log("RFC Referral DCF", event);
    if (this.isFamilyMemberPromptEnabled) {
      if (event.currentSelection === 'createNew') {
        this.familyMemberComponent.familMember = new FamilyMember();
        this.familyMemberComponent.familMember.firstName = event.wizard.firstName;
        this.familyMemberComponent.familMember.lastName = event.wizard.lastName;
        this.familyMemberComponent.familMember.ssn = (event.wizard.ssn);
        this.personMasterWizardsComponent.isPersonMasterwizardSecondOpen = false;

        this.familyMemberComponent.editBtnCntrl = false;
        this.isFamilyMemberComponent = true;
      } else {
        this.familyMemberComponent.getCustomercarePersonDetails(event.data.FamilyMemberID);
        this.personMasterWizardsComponent.isPersonMasterwizardSecondOpen = false;
        this.isFamilyMemberComponent = true;
      }
    }

    else if (this.isStaffPromptEnabled) {
      if (event.currentSelection === 'createNew') {
        this.personMasterWizardsComponent.isPersonMasterwizardSecondOpen = false;
        this.isStaffComponent = true;
        this.staffFormComponent.staff = new StaffForm();
        this.staffFormComponent.staff.firstName = event.wizard.firstName;
        this.staffFormComponent.staff.lastName = event.wizard.lastName;


        // this.personMasterWizardsComponent.isPersonMasterwizardSecondOpen = false;
        this.staffFormComponent.isEditForm = false;
        this.isStaffComponent = true;

        this.personMasterWizardsComponent.isPersonMasterwizardSecondOpen = false;

      }
      else {
        this.isStaffComponent = true;
        this.staffFormComponent.staff = new StaffForm();
        this.staffFormComponent.getStaffById(event.data.staffID);
        this.personMasterWizardsComponent.isPersonMasterwizardSecondOpen = false;
        this.isStaffComponent = true;
      }
    }
    else {
      if (event.currentSelection == 'createNew') {
        this.dcfFormComponent.dcf = new Dcf();
        this.dcfFormComponent.dcf.firstName = event.wizard.firstName;
        this.dcfFormComponent.dcf.lastName = event.wizard.lastName;
        this.dcfFormComponent.editBtnCntrl = false;
        this.personMasterWizardsComponent.isPersonMasterwizardSecondOpen = false;
        this.dcfFormComponent.req = null;
        this.isDCFComponent = true;
      } else {
        this.isDCFComponent = true;
        this.dcfFormComponent.getDCFDetails(event.data.SRSStaffID);
        this.personMasterWizardsComponent.isPersonMasterwizardSecondOpen = false;
        this.isDCFComponent = true;
      }
    }

  }

  dcfFormStatus(event: any) {
    if (event.isFormResponse) {
      this.isDCFComponent = false;
      if (this.selectedDCFDropdownField === 'dcfSocialWorker') {
        event.data.person['fullName'] = `${event.data.person.lastName}, ${event.data.person.firstName}`;
        this.ri.srsStaffID = event.data.person;
      } else {
        event.data.person['fullName'] = `${event.data.person.lastName}, ${event.data.person.firstName}`;
        this.ri.srsLiasonID = event.data.person;
      }
    }
  }

  familyMemberFormStatus(event: any) {
    if (event.isFormResponse) {
      this.isFamilyMemberComponent = false;
      this.isFamilyMemberPromptEnabled = false;

      if (this.selectedFMDropdownField === 'father') {
        event.data.person['name'] = `${event.data.person.lastName}, ${event.data.person.firstName}`;
        this.ri.fatherName_FamilyMemberID = event.data.person;
      } else if (this.selectedFMDropdownField === 'mother') {
        event.data.person['name'] = `${event.data.person.lastName}, ${event.data.person.firstName}`;
        this.ri.motherName_FamilyMemberID = event.data.person;
      } else if (this.selectedFMDropdownField === 'removal parent') {
        event.data.person['name'] = `${event.data.person.lastName}, ${event.data.person.firstName}`;
        this.ri.familyMemberID = event.data.person;
      }
    }
  }

  onClickStaff() {
    this.isStaffPromptEnabled = true;
    this.personMasterWizardsComponent.wizard = new PersonMasterWizards();
    this.personMasterWizardsComponent.selectedClient = '';
    this.personMasterWizardsComponent.selectedModule.display = 'Staff';
    this.personMasterWizardsComponent.selectedModule.value = 'Staff';
    this.personMasterWizardsComponent.isKaecsesMandatory = false;
    this.personMasterWizardsComponent.isKaecsesDisable = false;
    this.personMasterWizardsComponent.isNonContractVisible = false;
    this.personMasterWizardsComponent.isSSNVisbile = true;
    this.personMasterWizardsComponent.navigationSelect = false;
    return this.personMasterWizardsComponent.isPersonMasterWizardsOpen = true;
  }

  staffFormStatus(event: any) {
    // staffID
    if (event.isFormResponse) {
      this.isStaffComponent = false;
      this.isStaffPromptEnabled = false;
      event.data.staff['fullName'] = `${event.data.staff.lastName}, ${event.data.staff.firstName}`;
      this.ri.staffID = event.data.staff;
    }
  };
  countyData = [];
  results;
  getCounty(event) {
    let req = {
      "contract_StateID": "34",
      "value": event.query
    }
    // this._CaseTeamService.getSearchList(req).then(data => {
    //   this.countyData = data.dropDown;
    //   this.results = data.dropDown;
    // })
    this._caseTeam.getHomeCountiesList(req).then(data => {
      this.countyData = data.county;
      this.results = data.county;
    })

  }

}
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
