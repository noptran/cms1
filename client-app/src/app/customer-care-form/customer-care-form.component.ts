import { Component, OnInit } from '@angular/core';
import { ClildFormService } from '../child-forms/child-forms.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomrCare } from './customr-care';
import { CaseTeamService } from '../case-team/case-team.service';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';
import swal from 'sweetalert2';
@Component({
  selector: 'app-customer-care-form',
  templateUrl: './customer-care-form.component.html',
  styleUrls: ['./customer-care-form.component.scss']
})
export class CustomerCareFormComponent implements OnInit {
  breadcrumbs = [];
  isEdit = false;
  cc: CustomrCare = new CustomrCare();
  customerCareForm: FormGroup;
  metaData = [];
  mainTabs = [];
  sIndex = 0;
  clientInvolvedList = [];
  staffInvolvedList = [];
  notifyInvolvedList = [];
  selectedIndex: any;
  client: any;
  staff: any;
  personRelationship: any;
  personName: any;
  personSubType: any;
  customerCareStaff: any;
  programType: any;
  quickMenu = 'client';
  clientBtnLabel = 'Add';
  staffBtnLabel = 'Add';
  notifierBtnLabel = 'Add';
  discardTo = '/reports/customer-care/view';
  nameObj: any;
  staffId: any;
  constructor(public _router: Router, public _caseTeam: CaseTeamService, public _client: ClildFormService,
    public _fb: FormBuilder, public _opencard: OpencardsService) { }

  ngOnInit() {
    this.setIndex(0);
    if (this._router.url == '/reports/customer-care/detail') {
      this.getById();
    } else {
      this.getReportId();
    }

    this.formValidation();
    this.defineMainTabs();
    this.breadcrumbs = [
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Customer Care List', href: '/reports/customer-care/view', active: '' },
      { label: 'Customer Care', active: 'active' },
    ];
  }

  getReportId() {
    const date = Date.now();
    const req = {
      'currentDate': moment(date).format('YYYY-MM-DD'),
      'currentYY': moment(date).format('YY')
    };
    this._caseTeam.getReportID(req).then(data => {
      this.cc.reportID = data.reportID;
    });
  }
  getprogramTypeId(event) {
    this.cc.programTypeID = event.programTypeID;
  }
  /**
   * Validating form
   */
  formValidation() {
    this.customerCareForm = this._fb.group({
      custCareReportID: [null],
      reportID: [null],
      reportDate: [null, Validators.compose([Validators.required])],
      customerCareStaffID: [null],
      custCareNotificationTypeID: [null],
      custCareGeneralConcernID: [null],
      overview: [null],
      resolvedDate: [null, Validators.compose([Validators.required])],
      resolution: [null],
      personSubType: [null],
      personName: [null],
      personRelationship: [null],
      clientName: [null],
      staffName: [null],
      programTypeID: [null],
      custCareReportTypeID: [null, Validators.compose([Validators.required])],
      programType: [null]
    });
  }

  formAction(source: any) {
    !isNullOrUndefined(source.reportDate) ? source.reportDate = Date.parse(source.reportDate) : null;
    !isNullOrUndefined(source.resolvedDate) ? source.resolvedDate = Date.parse(source.resolvedDate) : null;
    !isNullOrUndefined(source.reportID) ? source.reportID = source.reportID : null;
    !isNullOrUndefined(source.custCareNotificationTypeID) ? source.custCareNotificationTypeID = source.custCareNotificationTypeID.custCareNotificationTypeID : null;
    !isNullOrUndefined(source.customerCareStaffID) ? source.customerCareStaffID = source.customerCareStaffID.staffID : null;
    !isNullOrUndefined(source.custCareGeneralConcernID) ? source.custCareGeneralConcernID = source.custCareGeneralConcernID.custCareGeneralConcernID : null;
    this.cc.custCareClientInvolvedID = this.clientInvolvedList.length > 0 ? this.clientInvolvedList.map((client: any) => client.clientID) : [];
    this.cc.custCareStaffInvolvedID = this.staffInvolvedList.length > 0 ? this.staffInvolvedList.map((staff: any) => staff.staffID) : [];
    this.cc.custCareParticipantID = this.notifyInvolvedList.length > 0 ? this.notifyInvolvedList.map((person: any) => {
      return { 'personAssignmentTypeID': person.personSubType.PersonAssignmentTypeID, 'personID': source.personId, 'personTypeID': person.relationship.personTypeID };
    }) : [];
    !isNullOrUndefined(source.resolution) ? source.resolution = source.resolution : null;
    !isNullOrUndefined(source.overview) ? source.overview = source.overview : null;
    !isNullOrUndefined(source.custCareReportTypeID) ? source.custCareReportTypeID = source.custCareReportTypeID.CustCareReportTypeID : null;
    !isNullOrUndefined(source.custCareReportID) ? this.update(source) : this.save(source);
  }

  /**
   * Save the form details
   */
  save(source: any) {
    if (this.customerCareForm.valid) {
      if (source.custCareClientInvolvedID.length <= 0 || source.custCareParticipantID.length <= 0 || source.custCareStaffInvolvedID.length <= 0) {
        swal('Warning', 'please fill all the fields', 'info');
      } else {
        const loader = document.getElementById('loading-overlay') as HTMLElement;
        loader.style.display = 'block';
        this._opencard.saveCustomerCare(source).then(() => {
          loader.style.display = 'none';
          this._router.navigate(['/reports/customer-care/view']);
        });
      }
    } else {
      swal('Warning', 'please fill all the fields', 'info');
    }
  }

  /***
   * Update the form details
   */
  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.updateCustomerCare(source).then(() => {
      loader.style.display = 'none';
      this._router.navigate(['/reports/customer-care/view']);
    });
  }

  /**
   * Get the metadata for dropdowns
   */
  getMetaData(event: any, label: any) {
    let metaDataObj: any, metaDataReq: any;
    switch (label) {
      case 'customerCarePerson':
        metaDataObj = 'customerCarePerson';
        break;
      case 'custCareNotificationType':
        metaDataObj = 'custCareNotificationType';
        break;
      case 'custCareGeneralConcern':
        metaDataObj = 'custCareGeneralConcern';
        break;
      case 'personType':
        metaDataObj = 'personType';
        break;
      case 'client':
        metaDataObj = 'client';
        break;
      case 'staff':
        metaDataObj = 'staff';
        break;
      case 'personSubType':
        this.getPersonSubType(event.query);
        break;
      case 'programType':
        metaDataObj = 'programType';
        break;
      case 'relationship':
        this.getRelationship(event.query);
        break;
      case 'reportType':
        this.getReportType(event.query);
        break;
    }
    if (metaDataObj) {
      metaDataReq = { Object: metaDataObj, value: event.query };
      this._caseTeam.getSearchList(metaDataReq).then(data => {
        data.dropDown.map((item: any) => {
          item['clientFullName'] = item.clientID + ' ' + item.clientName;
          item['staffFullName'] = item.lastName + ' ' + item.firstName + ' ( ' + item.email + ' ) ';
          item['fullName'] = item.lastName + ' ' + item.firstName;
        });
        this.metaData = data.dropDown;
      });
    }
  }
  getReportType(event) {
    this._caseTeam.getReportType().then(data => {
      this.metaData = data.reportType;
    });
  }
  getRelationship(event: any) {
    const req = { 'isCustCareRelationshipType': true };
    this._caseTeam.getRelationship(req).then(item => {
      this.metaData = item.personType;
    });
  }

  getPersonSubType(event: any) {
    this._caseTeam.getPersonSubType().then(item => {
      item.personSubType.filter((data: any) => {
        data['personAssignmentType'] = data.PersonAssignmentType;
      });
      this.metaData = item.personSubType;
    });
  }
  getSubTypeName(event) {
    switch (event.PersonAssignmentType) {
      case 'CASA Officer':
        this.nameObj = 'casaOfficer';
        break;
      case 'Client':
        this.nameObj = 'client';
        break;
      case 'Community Member':
        this.nameObj = 'communityMember';
        break;
      case 'Court Service Officer':
        this.nameObj = 'CourtServiceOfficer';
        break;
      case 'CRB Coordinator':
        this.nameObj = 'CRBCoordinator';
        break;
      case 'CSO Staff':
        this.nameObj = 'csoStaff';
        break;
      case 'Customer Care Person':
        this.nameObj = 'customerCarePerson';
        break;
      case 'DCF Staff':
        this.nameObj = 'srsStaff';
        break;
      case 'DHHS Staff':
        this.nameObj = 'dhhsStaff';
        break;
      case 'DHS Staff':
        this.nameObj = 'dHSStaff';
        break;
      case 'Family Member':
        this.nameObj = 'familyMember';
        break;
      case 'Guardian Ad Litem':
        this.nameObj = 'guardianAdLitem';
        break;
      case 'Judge':
        this.nameObj = 'Judge';
        break;
      case 'Other Agency Staff':
        this.nameObj = 'otherAgencyStaff';
        break;
      case 'Provider Member':
        this.nameObj = 'providerMember';
        break;
      case 'Staff':
        this.nameObj = 'staff';
        break;
    }
  }
  getPersonSubTypeName(event) {
    const metaDataReq = { Object: this.nameObj, value: event.query };
    this._caseTeam.getSearchList(metaDataReq).then(data => {
      data.dropDown.map((item: any) => {
        !isNullOrUndefined(item.clientName) ? item['staffFullName'] = item.clientName : item['staffFullName'] = item.lastName + ' ' + item.firstName || item.name;
      });
      this.metaData = data.dropDown;
    });
  }
  getPersonId(event) {
    switch (this.nameObj) {
      case 'casaOfficer':
        this.cc.personId = event.casaOfficerID;
        break;
      case 'client':
        this.cc.personId = event.clientID;
        break;
      case 'communityMember':
        this.cc.personId = event.communityMemberID;
        break;
      case 'CourtServiceOfficer':
        this.cc.personId = event.csvid;
        break;
      case 'CRBCoordinator':
        this.cc.personId = event.crbcoordinatorID;
        break;
      case 'csoStaff':
        this.cc.personId = event.CSOStaffID;
        break;
      case 'customerCarePerson':
        this.cc.personId = event.custCarePersonID;
        break;
      case 'srsStaff':
        this.cc.personId = event.srsstaffID;
        break;
      case 'dhhsStaff':
        this.cc.personId = event.dhhsstaffID;
        break;
      case 'dHSStaff':
        this.cc.personId = event.dhsStaffID;
        break;
      case 'familyMember':
        this.cc.personId = event.familyMemberID;
        break;
      case 'guardianAdLitem':
        this.cc.personId = event.galid;
        break;
      case 'Judge':
        this.cc.personId = event.judgeID;
        break;
      case 'otherAgencyStaff':
        this.cc.personId = event.otherAgencyStaffID;
        break;
      case 'providerMember':
        this.cc.personId = event.providerMemberID;
        break;
      case 'staff':
        this.cc.personId = event.staffID;
        break;
    }
  }
  /**
   * Define main tabs in the form section
   */
  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Section 1', href: '#nav-sec1' },
      { label: 'Section 2', href: '#nav-sec2' },
    ];
  }

  /**
 *
 * @param index index value of tab
 */
  setIndex(index: number) {
    this.sIndex = index;
  }

  getById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const req = { custCareReportID: this._client.getId() };

    this._opencard.getByIdCustomerCare(req).then((data: any) => {
      console.log('data', data);
      if (data.custCareReport.isActive) {
        !isNullOrUndefined(data.custCareReport.reportDate) ? data.custCareReport.reportDate = moment(data.custCareReport.reportDate).format('MM/DD/YYYY') : null;
        !isNullOrUndefined(data.custCareReport.resolvedDate) ? data.custCareReport.resolvedDate = moment(data.custCareReport.resolvedDate).format('MM/DD/YYYY') : null;
      } else {
        !isNullOrUndefined(data.custCareReport.reportDate) ? data.custCareReport.reportDate = moment.utc(data.custCareReport.reportDate).format('MM/DD/YYYY') : null;
        !isNullOrUndefined(data.custCareReport.resolvedDate) ? data.custCareReport.resolvedDate = moment.utc(data.custCareReport.resolvedDate).format('MM/DD/YYYY') : null;
      }
      !isNullOrUndefined(data.custCareReport.reportID) ? data.custCareReport.reportID = data.custCareReport.reportID : null;
      !isNullOrUndefined(data.custCareReport.custCareReportTypeID) ? data.custCareReport.custCareReportTypeID.ReportType = data.custCareReport.custCareReportTypeID.reportType : null;
      !isNullOrUndefined(data.custCareReport.customerCareStaffID) ? data.custCareReport.customerCareStaffID['staffFullName'] = data.custCareReport.customerCareStaffID.lastName + ' ' + data.custCareReport.customerCareStaffID.firstName + '(' + data.custCareReport.customerCareStaffID.email + ')' : null;
      !isNullOrUndefined(data.custCareReport.programTypeID) ? this.programType = data.custCareReport.programTypeID : null;

      this.cc = data.custCareReport;
      data.custCareClientInvolvedID.map((item) => {
        this.clientInvolvedList.push({
          clientID: item.clientID.clientID, clientName: item.clientID.lastName + ',' + item.clientID.firstName, dob: item.clientID.dob,
          ssn: item.clientID.ssn, kees: item.clientID.kees, email: item.clientID.email, clientFullName: item.clientID.clientID + ' ' + item.clientID.lastName + ',' + item.clientID.firstName
        });
      });
      data.custCareStaffInvolvedID.map((item) => {
        item.staffID.staffFullName = item.staffID.lastName + ' ' + item.staffID.firstName + '(' + item.staffID.email + ')';
        this.staffInvolvedList.push(item.staffID);
      });
      data.custCareParticipantInvolvedID.map((item) => {

        this.getSubTypeName({ PersonAssignmentType: item.personAssignmentTypeID.personAssignmentType });

        this.getDetailsPersonName(item.personID);
        this.notifyInvolvedList.push({
          personSubType: item.personAssignmentTypeID,
          relationship: item.personTypeID
        });
      });
      console.log('this.notifyInvolvedList', this.notifyInvolvedList);
      loader.style.display = 'none';
      this.customerCareForm.disable();
      this.isEdit = true;
    });
  }

  getDetailsPersonName(personID) {
    let detailsPersonID;
    switch (this.nameObj) {
      case 'casaOfficer':
        detailsPersonID = 'casaOfficerID';
        break;
      case 'client':
        detailsPersonID = 'clientID';
        break;
      case 'communityMember':
        detailsPersonID = 'communityMemberID';
        break;
      case 'CourtServiceOfficer':
        detailsPersonID = 'csvid';
        break;
      case 'CRBCoordinator':
        detailsPersonID = 'crbcoordinatorID';
        break;
      case 'csoStaff':
        detailsPersonID = 'CSOStaffID';
        break;
      case 'customerCarePerson':
        detailsPersonID = 'custCarePersonID';
        break;
      case 'srsStaff':
        detailsPersonID = 'srsstaffID';
        break;
      case 'dhhsStaff':
        detailsPersonID = 'dhhsstaffID';
        break;
      case 'dHSStaff':
        detailsPersonID = 'dhsStaffID';
        break;
      case 'familyMember':
        detailsPersonID = 'familyMemberID';
        break;
      case 'guardianAdLitem':
        detailsPersonID = 'galid';
        break;
      case 'Judge':
        detailsPersonID = 'judgeID';
        break;
      case 'otherAgencyStaff':
        detailsPersonID = 'otherAgencyStaffID';
        break;
      case 'providerMember':
        detailsPersonID = 'providerMemberID';
        break;
      case 'staff':
        detailsPersonID = 'staffID';
        break;
    }
    const metaDataReq = { Object: this.nameObj, value: '' };
    this._caseTeam.getSearchList(metaDataReq).then(data => {
      this.metaData = data.dropDown.map((item: any) => {
        if (item[detailsPersonID] === personID) {
          return !isNullOrUndefined(item.clientName) ? item['staffFullName'] = item.clientName : item['staffFullName'] = item.lastName + ' ' + item.firstName || item.name;
        }
      });
    });
    console.log('  this.metaData', this.metaData);
  }

  editForm() {
    this.customerCareForm.enable();
    this.isEdit = false;
  }

  notifierAddList(personSubType, name, relationship, label) {
    if (personSubType === undefined && name === undefined && relationship === undefined) {
      swal('Warning', 'please fill all the fields', 'info');
    } else {
      let list = [], btnLabel: any;
      switch (label) {
        case 'notifier':
          list = this.notifyInvolvedList;
          this.personRelationship = '';
          this.personName = '';
          this.personSubType = '';
          btnLabel = this.notifierBtnLabel;
          break;
      }
      if (btnLabel == 'update') {
        list.splice(this.selectedIndex, 1);
        list.push({ 'personSubType': personSubType, 'name': name, 'relationship': relationship });
      } else {
        list.push({ 'personSubType': personSubType, 'name': name, 'relationship': relationship });
      }

      switch (label) {
        case 'notifier':
          this.notifierBtnLabel = 'Add';
          break;
      }
    }
  }

  addList(clientObj: any, label: any) {
    if (clientObj === undefined) {
      swal('Warning', 'please fill all the fields', 'info');
    } else {
      let list = [], btnLabel: any;
      switch (label) {
        case 'client':
          list = this.clientInvolvedList;
          this.client = '';
          btnLabel = this.clientBtnLabel;
          break;
        case 'staff':
          list = this.staffInvolvedList;
          this.staff = '';
          btnLabel = this.staffBtnLabel;
          break;
      }
      if (btnLabel == 'update') {
        list.splice(this.selectedIndex, 1);
        list.push(clientObj);
      } else {
        list.push(clientObj);
      }
      switch (label) {
        case 'client':
          this.clientBtnLabel = 'Add';
          break;
        case 'staff':
          this.staffBtnLabel = 'Add';
          break;
      }
    }
  }

  getListDetails(obj: any, label: any, i: any) {
    this.selectedIndex = i;
    switch (label) {
      case 'client':
        this.client = obj;
        this.clientBtnLabel = 'update';
        break;
      case 'staff':
        this.staff = obj;
        this.staffBtnLabel = 'update';
        break;
      case 'notifier':
        this.personRelationship = obj.relationship;
        this.personName = obj.name;
        this.personSubType = obj.personSubType;
        this.notifierBtnLabel = 'update';
        break;
    }
  }

  removeList(label: any) {
    switch (label) {
      case 'client':
        this.clientInvolvedList.splice(this.selectedIndex, 1);
        this.client = '';
        this.clientBtnLabel = 'Add';
        break;
      case 'staff':
        this.staffInvolvedList.splice(this.selectedIndex, 1);
        this.staff = '';
        this.staffBtnLabel = 'Add';
        break;
      case 'notifier':
        this.notifyInvolvedList.splice(this.selectedIndex, 1);
        this.personRelationship = '';
        this.personName = '';
        this.personSubType = '';
        this.notifierBtnLabel = 'Add';
        break;
    }
  }

  getCustomerCareStaffId(event) {
    this.staffId = event.staffID;
  }
}
