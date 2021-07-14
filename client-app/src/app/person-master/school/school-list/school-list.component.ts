import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { School, USD_data } from './school'
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})

export class SchoolListComponent implements OnInit {
  breadcrumbs = [];
  refcOpencards = [];
  iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';
  discardTo = '/reports/school/view';
  mainTabs = [];
  sIndex = 0;
  schoolInfo: School = new School();
  usd_data: USD_data = new USD_data();
  schoolForm: FormGroup;
  metaData = [];
  zipcodeSuggestions = [];
  isEditControl: boolean;
  isOpenCardsVisible = false;
  isSchoolNode = true;
  isListViewVisible = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  req: { schoolID: any; };

  constructor(public _client: ClildFormService, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {
    this.formValidation();
    this.defineMainTabs();
    this.defineOpencards();
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'School List', href: "/reports/school/view", active: '' },
      { label: 'School Form', href: "/reports/school/view", active: 'active' }
    )
    let hasValue = { target: { hash: '#nav-school-info' } }
    this.setIndex(0, hasValue);
    if (this._router.url.includes('/reports/school/detail')) {
      this.isOpenCardsVisible = true;
      this.getRecById();
    }
    if (this._router.url.includes('/reintegration/referral/opencard/attending-school/detail')) {
      this.isSchoolNode = false;
      this.isOpenCardsVisible = true;
      this.discardTo = '/reintegration/referral/opencard/attending-school/detail';
      this.getRecById();
    }
    if (this._router.url.includes('/reintegration/referral/opencard/home-school/detail')) {
      this.isSchoolNode = false;
      this.isOpenCardsVisible = true;
      this.discardTo = '/reintegration/referral/opencard/home-school/detail';
      this.getRecById();
    }
  }

  navigateTo(label: any) {
    let url: any;
    switch (label) {
      case 'Attending School':
        url = '/reports/school/attending-school';
        break;

      case 'Home School':
        url = '/reports/school/home-school';
        break;
    }
    if (!this.isSchoolNode) {
      this.implementModelListView(label);
    }
    else {
      return this._router.navigate([url])
    }

  }

  implementModelListView(label) {
    this._opencard.storeSchoolCatagory(label);
    this.isListViewVisible = true;
  }

  ngOnDestroy() {
    let resetSchoolCatagory = ''
    this._opencard.storeSchoolCatagory(resetSchoolCatagory);
  }

  defineOpencards() {
    this.refcOpencards = [
      { title: 'Attending School', tip: 'Attending School', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Home School', tip: 'Home School', navigation: '', icon: this.iconurl + 'case activity.svg' }
    ];
  }

  defineMainTabs() {
    return this.mainTabs = [
      { label: 'School Information', href: '#nav-school-info' },
      { label: 'Other Information', href: '#nav-other-info' },
    ]
  }

  setIndex(index: number, event: any) {
    let hasValue = [];
    hasValue = event.target.hash;
    this.sIndex = index;
  }

  formValidation() {
    this.schoolForm = this._fb.group({
      address: [null],
      buildingNumber: [null],
      ESSAPointOfContact: [null],
      fax: [null],
      GPSAddress: [null],
      GPSCity: [null],
      GPSState: [null],
      GPSZipcode: [null],
      notes: [null],
      nurse_FirstName: [null],
      nurse_LastName: [null],
      nurse_MI: [null],
      phone: [null],
      principal_FirstName: [null],
      principal_LastName: [null],
      principal_MI: [null],
      registrarEmail: [null],
      schoolName: [null],
      usd: [null],
      vicePrincipal_FirstName: [null],
      vicePrincipal_LastName: [null],
      changedBy: [null],
      enteredBy: [null],
      vicePrincipal_MI: [null],
      beginDate: [null],
      changedDate: [null],
      endDate: [null],
      enteredDate: [null],
      cityID: [null],
      countyID: new FormControl({ value: null, disabled: true }),
      stateID: [null],
      zipcodeID: [null],
      isDoNotSendToPOC: [null],
      isMultiState: [null],
      isPrivate: [null]
    })
  }

  formAction(data) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    (data.beginDate) ? this.schoolInfo.beginDate = Date.parse(data.beginDate) : null;
    (data.endDate) ? this.schoolInfo.endDate = Date.parse(data.endDate) : null;
    (data.cityID) ? this.schoolInfo.cityID = data.cityID.cityID : null;
    (data.stateID) ? this.schoolInfo.stateID = data.stateID.stateID : null;
    (data.zipcodeID) ? this.schoolInfo.zipcodeID = data.zipcodeID.zipcodeID : null;
    (data.countyID) ? this.schoolInfo.countyID = data.countyID.countyID : null;
    (data.usd) ? this.schoolInfo.usd = data.usd.usd : null;
    if (this.schoolInfo.schoolID) {
      this._opencard.updateSchoolPersonType(this.schoolInfo).then((data: any) => {
        if (data.responseStatus) {
          swal('Update', 'School has been updated!', 'success');
          loader.style.display = 'none';
          if (this._router.url.includes('/reports/school/detail')) {
            this._router.navigate(['/reports/school/view']);
          }
        }
      })
    }
    else {
      this._opencard.saveSchoolPersonType(this.schoolInfo).then((data: any) => {
        if (data.responseStatus) {
          swal('Save', 'School has been saved!', 'success');
          loader.style.display = 'none';
          if (this._router.url.includes('/reports/school/detail')) {
            this._router.navigate(['/reports/school/view']);
          }

        }
      })
    }
  }

  getMetaData(event: any, label: string) {
    let req: any;
    switch (label) {
      case 'state':
        req = { beginPagination: 1, endPagination: 100, Object: "state" }
        this.getState(event);
        break;
      case 'city':
        this.getCity(event);
        break;
    }

  }

  getState(event: any) {
    let req = { beginPagination: 1, endPagination: 100, Object: "state" }
    this._opencard.dropdownListView(req)
      .then((data: any) => {
        this.metaData = [];
        this.metaData = data.dropDownObject;
      })
  }

  getCity(event: any) {
    let req = { beginPagination: 1, endPagination: 100, Object: "city" }
    this._opencard.dropdownListView(req)
      .then((data: any) => {
        this.metaData = [];
        this.metaData = data.dropDownObject;
      })
  }

  onZipcodeSelect(event) {
    if (this.schoolInfo.zipcodeID) {
      if (this.schoolInfo.zipcodeID.zipcodeID) {
        if (this.schoolInfo.zipcodeID.countyID) {
          this.schoolInfo.countyID = this.schoolInfo.zipcodeID.countyID;
        }
      }
    }
  }

  getZipcodes() {
    if (this.schoolInfo.stateID && this.schoolInfo.cityID) {
      let req = { cityID: this.schoolInfo.cityID.cityID, stateID: this.schoolInfo.stateID.stateID }
      this._opencard.dropdownZipCode(req).then((data: any) => {
        this.zipcodeSuggestions = [];
        this.zipcodeSuggestions = data.zipcode;
      })
    }
    else {
      this.zipcodeSuggestions = [];
    }
  }

  getRecById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { schoolID: this._client.getId() }
    this.req = { schoolID: this._client.getId() }
    this._opencard.getByIdPersonTypeSchool(req).then((data: any) => {
      (data.school.beginDate) ? data.school.beginDate = moment((data.school.beginDate)).format('MM/DD/YYYY HH:mm') : null;
      (data.school.endDate) ? data.school.endDate = moment((data.school.endDate)).format('MM/DD/YYYY HH:mm') : null;
      (data.school.essapointOfContact) ? data.school.ESSAPointOfContact = data.school.essapointOfContact : null;
      this.schoolInfo = data.school;
      loader.style.display = 'none';
      this.isEditControl = true;
      this.schoolForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.school.changedBy) ? data.school.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.school.changedDate) ? moment(data.school.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.school.enteredBy) ? data.school.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.school.enteredDate) ? moment(data.school.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '';
      this.PhoneOfEssa = !isNullOrUndefined(data.school.usd) ? (data.school.usd.phone) : '';
      this.emailOfEssa = !isNullOrUndefined(data.school.usd) ? (data.school.usd.contactEmail) : '';
      this.nameOfEssa = !isNullOrUndefined(data.school.usd) ? (data.school.usd.contactName) : '';
      this.usd_id = !isNullOrUndefined(data.school.usd) ? (data.school.usd.usdID) : '';
      this.usd_data.usdID = !isNullOrUndefined(data.school.usd) ? (data.school.usd.usdID) : '';
    })
  }

  editForm() {
    this.schoolForm.enable();
    this.isEditControl = false;
  }
  usdNames = [];
  getScholls_Name(event) {
    var req = {
      "Object": "usdName",
      "value": event.query,
    }
    this._opencard.getDropdownValues(req).then((data: any) => {
      console.log("event>>>", data);
      this.usdNames = data;
    })
  };
  nameOfEssa: any = "";
  emailOfEssa: any = "";
  PhoneOfEssa: any = "";
  usd_id: any;
  USD_id_Change(event) {
    console.log("event>>>", event);
    this.usd_data.usdID = event.usdID;
    this.PhoneOfEssa = event.phone;
    this.emailOfEssa = event.contactEmail;
    this.nameOfEssa = event.contactName;

  };
  isVisible = false;
  usdLabel: any;
  buttonLabel: any;
  addUSdTab(usdLable) {
    this.usdLabel = usdLable;
    if (usdLable === 'edit') {
      this.buttonLabel = "Update";
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      this._opencard.usdGetByID({ 'usdID': this.usd_data.usdID }).then((data: any) => {
        this.usd_data = data.dropDown;
        this.isVisible = true;
        loader.style.display = 'none';
      })
    } else {
      this.buttonLabel = "Add";
      this.isVisible = true;
    }

  }
  add_usd_data() {
    if (this.usdLabel === 'edit') {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      this._opencard.editSave(this.usd_data).then((data: any) => {
        if (data.responseStatus) {
          this.schoolInfo.usd = data.usd;
          this.usd_data.usdID = data.usd.usdID;
          this.PhoneOfEssa = data.usd.phone;
          this.emailOfEssa = data.usd.contactEmail;
          this.nameOfEssa = data.usd.contactName;
          this.isVisible = false;
          this.cancelUsd();
          loader.style.display = 'none';
          swal('Save', data.responseMessage, 'success');
        } else {
          if (data.responseMessage == "Mandatory fields should not be null or empty!") {
            loader.style.display = 'none';
            swal('Warning', data.responseMessage, 'info');
          } else {
            this.isVisible = false;
            this.cancelUsd();
            loader.style.display = 'none';
            swal('Warning', data.responseMessage, 'info');
          }

        }
      })
    } else {
      delete this.usd_data.usdID;
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      this._opencard.usdSave(this.usd_data).then((data: any) => {
        if (data.responseStatus) {
          this.schoolInfo.usd = data.usd;
          this.usd_data.usdID = data.usd.usdID;
          this.PhoneOfEssa = data.usd.phone;
          this.emailOfEssa = data.usd.contactEmail;
          this.nameOfEssa = data.usd.contactName;
          this.isVisible = false;
          this.cancelUsd();
          loader.style.display = 'none';
          swal('Save', data.responseMessage, 'success');
        } else {
          if (data.responseMessage == "Mandatory fields should not be null or empty!") {
            loader.style.display = 'none';
            swal('Warning', data.responseMessage, 'info');
          } else {
            this.isVisible = false;
            this.cancelUsd();
            loader.style.display = 'none';
            swal('Warning', data.responseMessage, 'info');
          }
        }
      })
    }
  }
  cancelUsd() {
    this.usd_data.usdName = "";
    this.usd_data.usd = "";
    this.usd_data.contactName = "";
    this.usd_data.contactEmail = "";
    this.usd_data.superintendent = "";
    this.usd_data.superintendentEmail = "";
    this.usd_data.phone = "";
    this.isVisible = false;
  }
}
