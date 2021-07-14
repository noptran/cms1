import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OtherAgencyStaff } from './other-agency-staff';
import { ClildFormService } from '../child-forms/child-forms.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { CaseTeamService } from '../case-team/case-team.service';
import { MessageService } from 'primeng/api';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';


@Component({
  selector: 'app-other-agency-staff-form',
  templateUrl: './other-agency-staff-form.component.html',
  styleUrls: ['./other-agency-staff-form.component.scss']
})
export class OtherAgencyStaffFormComponent implements OnInit {

  otherAgencyForm: FormGroup;
  otherAgency: OtherAgencyStaff = new OtherAgencyStaff();
  selectedCustomerID: any;
  metaData = [];
  mainTabs = [];
  formDisableCntrl = false;
  sIndex: number = null;
  editBtnCntrl = false;
  cities = [];
  counties = [];
  zipcodes = [];
  filteredCities = [];
  filteredZipcodes = [];
  filteredCounties = [];
  selectedStateID = null;
  selectedCityID = null;
  title = 'Other Agency Staff'
  status = 'active';
  formStatus = 'draft';
  breadcrumbs = [];
  section1 = ['firstName', 'lastName', "acronym", 'mi', 'suffix', "conST", 'genderID', 'raceID', 'deceased', 'ethnicityID', 'tribeID', 'email'];
  section2 = ['cellPh', "pager", 'homePh'];
  invalid = [];
  subtitle: any;
  discardTo = '/reports/otherAgencyStaff';
  req = {};
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public messageService: MessageService, public _fb: FormBuilder, public _person: ClildFormService, public _router: Router, public _caseTeam: CaseTeamService) { }

  ngOnInit() {
    this.setIndex(0);
    this.formValidation();
    this.defineMainTabs();
    if (this._router.url == '/reports/otherAgencyStaff/details') {
      this.getOtherAgencyDetails();
    }
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Other Agency Staff List', href: "/reports/otherAgencyStaff", active: '' },
      { label: 'Other Agency Staff', href: "", active: 'active' },
    )
  }

  /**
 * Validating form
 */
  formValidation() {
    this.otherAgencyForm = this._fb.group({
      'lastName': new FormControl('', Validators.compose([Validators.required])),
      'firstName': new FormControl('', Validators.compose([Validators.required])),
      'cityID': '',
      'address': '',
      'notes': '',
      'genderID': '',
      'raceID': '',
      'cellPh': '',
      'workPh': '',
      'suffix': '',
      'homePh': '',
      'zipcodeID': '',
      'pager': '',
      'dob': '',
      'stateID': '',
      'fax': '',
      'mi': '',
      'email': '',
      'countyID': '',
      'ssn': '',
      'ext': '',
      'acronym': '',
      'contract_StateID': '',
      'tribeID': '',
      'ethnicityID': ''
    })
  }


  /**
   * Save the form details
   */
  save(data) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    // data.cityID = data.cityID ? data.cityID.cityID : null;
    // data.countyID = data.countyID ? data.countyID.countyID : null;
    data.genderID = data.genderID ? data.genderID.genderID : null;
    // data.stateID = data.stateID ? data.stateID.stateID : null;
    data.raceID = data.raceID ? data.raceID.raceID : null;
    data.tribeID = data.tribeID ? data.tribeID.tribeID : null;
    data.ethnicityID = data.ethnicityID ? data.ethnicityID.ethnicityID : null;
    !isNullOrUndefined(data.contract_StateID) ? data.contract_StateID = data.contract_StateID.stateID : null;
    data.dob ? data.dob = new Date(data.dob).getTime() : '';
    this.otherAgency.entity = 'otherAgencyStaff';
    this.otherAgency = data;
    if (this.otherAgencyForm.valid) {
      if (this.otherAgency.otherAgencyStaffID) {
        this._person.updateClient(this.otherAgency).then(() => {
          loader.style.display = 'none';
          this.editBtnCntrl = true;
          swal('Saved', 'Details are updated!', 'success');
          this._router.navigate(['/reports/otherAgencyStaff']);
        }).catch(() => {
          this.editBtnCntrl = false;
        })
      } else {
        this._person.saveClient(this.otherAgency).then(() => {
          loader.style.display = 'none';
          this.editBtnCntrl = true;
          swal('Saved', 'Details are saved!', 'success');
          this._router.navigate(['/reports/otherAgencyStaff']);
        }).catch(() => {
          this.editBtnCntrl = false;
        })
      }
    } else {
      swal('Fill the required fields!', '', 'warning').then(data => {
        if (data) {
          loader.style.display = 'none';
        }
      })
    }
  }

  /***
   * Update the form details
   */
  update() {
    this.editBtnCntrl = false;
    this.otherAgencyForm.enable();

  }

  /**
   * Get the metadata for dropdowns
   */
  getMetaData(event, label) {
    let metaDataObj, metaDataReq
    switch (label) {
      case 'gender':
        metaDataObj = "gender";
        break;
      case 'tribe':
        metaDataObj = "tribe";
        break;
      case 'ethnicity':
        metaDataObj = "ethnicity";
        break;
      case 'race':
        metaDataObj = "race";
        break;
      case 'city':
        this.getCities(event);
        break;
      case 'state':
        this.otherAgencyForm.controls['cityID'].disable();
        this.otherAgencyForm.controls['countyID'].disable();
        this.otherAgencyForm.controls['zipcodeID'].disable();
        metaDataObj = 'state';
      case 'zipcode':
        this.filterZIPCode(event);
        break;
      case 'county':
        this.filterCounty(event);
        break;
      case 'contractState':
        metaDataObj = 'contractState';
        break;
    }
    if (metaDataObj) {
      metaDataReq = { Object: metaDataObj, value: event.query }
      this._caseTeam.getSearchList(metaDataReq).then(data => {
        this.metaData = data.dropDown;
      })
    }

  }

  /**
   * Get the cities and counties based on selected state
   * @param event keyboard event
   */
  generateCityFromSelectedSatate(event) {
    let reqForCities;
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.otherAgencyForm.controls['cityID'].enable();
    this.selectedStateID = event.stateID;
    reqForCities = { stateID: event.stateID }
    this._person.getCityFromState(reqForCities).then(data => {
      loader.style.display = 'none';
      this.cities = data.city;
      this.counties = data.county;
    })
  }

  /**
   * Get the filtered cities
   * @param event keyboard event
   */
  getCities(event) {
    this.filteredCities = [];
    this.cities.filter(data => {
      if (data.city.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredCities.push(data);
      }
    })
  }

  /**
   * Get the zipcode and counties based on selected state id and selected city id
   */
  getZIPCode() {
    let reqForZIPCode;
    this.zipcodes = [];
    this.counties = [];
    reqForZIPCode = { stateID: this.selectedStateID, cityID: this.selectedCityID }
    this._person.getZipcodeFromCityState(reqForZIPCode).then((data) => {
      this.zipcodes = data.zipcode;
      this.counties = data.county;
    })

  }

  /**
   * Get the filtered zipcodes
   * @param event keyboard event
   */
  filterZIPCode(event) {
    this.zipcodes.filter(data => {
      this.filteredZipcodes = [];
      if (data.zipcode.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredZipcodes.push(data);
      }
    })
  }

  /**
   * Get the filtered counties
   * @param event keyboard event
   */
  filterCounty(event) {
    this.counties.filter(data => {
      this.filteredCounties = [];
      if (data.countyName.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredCounties.push(data);
      }
    })
  }



  /**
   * Get the selected city ID
   * @param event keyboard event
   */
  selectedCity(event) {
    this.otherAgencyForm.controls['zipcodeID'].enable();
    this.otherAgencyForm.controls['countyID'].enable();
    this.selectedCityID = event.cityID;
    this.getZIPCode();

  }

  /**
   * Define main tabs in the form section
   */
  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Section 1', href: '#nav-sec1' },
      { label: 'Section 2', href: '#nav-sec2' },
      // { label: 'Section 3', href: '#nav-sec3' },
    ]
  }

  /**
   * Get the record details based on ID
   */
  getOtherAgencyDetails() {
    this.editBtnCntrl = true;
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.selectedCustomerID = this._person.getId();
    this.req = { otherAgencyStaffID: this.selectedCustomerID }
    this._person.getDetailsById(this.req).then(data => {
      this.otherAgencyForm.disable();
      loader.style.display = 'none';
      data.person.dob = new Date(data.person.dob);
      this.otherAgency = data.person;
      this.subtitle = this.otherAgency.firstName + ' ' + this.otherAgency.lastName;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.person.changedBy) ? data.person.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.person.changedDate) ? moment(data.person.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.person.enteredBy) ? data.person.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.person.enteredDate) ? moment(data.person.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  /**
 * 
 * @param index index value of tab
 */
  setIndex(index: number) {
    this.sIndex = index;
  }

  sectionSelection() {
    switch (this.sIndex) {
      case 0:
        return this.section1;
      case 1:
        return this.section2;
    }
  }

  goNext() {
    let section = this.sectionSelection();
    let invalid = this.findInvalidControls(section);
    if (invalid.length > 0) {
      console.log("%%%%%", invalid);
      this.messageService.add({ severity: 'info', summary: 'Invalid', detail: 'Invalid' });
    } else {
      let tabName = this.mainTabs[this.sIndex + 1].href.split('#')[1];
      let previoustabName = this.mainTabs[this.sIndex].href.split('#')[1];
      let nav1 = document.getElementById(tabName);
      let nav2 = document.getElementById(previoustabName);
      nav1.classList.add('active');
      nav1.classList.add('in');
      nav2.classList.remove('active');
      nav2.classList.remove('in');
      this.setIndex(this.sIndex + 1);
    }
  }

  goPrevious() {
    let tabName = this.mainTabs[this.sIndex - 1].href.split('#')[1];
    let previoustabName = this.mainTabs[this.sIndex].href.split('#')[1];
    let nav1 = document.getElementById(tabName);
    let nav2 = document.getElementById(previoustabName);
    nav1.classList.add('active');
    nav1.classList.add('in');
    nav2.classList.remove('active');
    nav2.classList.remove('in');
    this.setIndex(this.sIndex - 1);
  }

  findInvalidControls(section) {
    this.invalid = [];
    let controls = this.otherAgencyForm.controls;
    for (let name in controls) {
      if (section.indexOf(name) !== -1) {
        if (controls[name].invalid) {
          this.invalid.push(name);
        }
      }
    }
    return this.invalid;
  }

}
