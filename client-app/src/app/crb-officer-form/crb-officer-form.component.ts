import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CrbOfficer } from './crb-officer';
import { ClildFormService } from '../child-forms/child-forms.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { CaseTeamService } from '../case-team/case-team.service';
import {MessageService} from 'primeng/api';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';


@Component({
  selector: 'app-crb-officer-form',
  templateUrl: './crb-officer-form.component.html',
  styleUrls: ['./crb-officer-form.component.scss']
})
export class CrbOfficerFormComponent implements OnInit {
  crbOfficerForm: FormGroup;
  crb: CrbOfficer = new CrbOfficer();
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
  title = 'CRB Co-ordinator';
  status = 'active';
  formStatus = 'draft';
  breadcrumbs = [];
  section1 = ['firstName', 'lastName', 'acronym', 'mi', 'suffix', 'ssn', 'conST', 'genderID', 'deceased', 'ethnicityID', 'tribeID', 'email'];
  section2 = ['workPh', 'cellPh', 'fax', 'pager', 'ext', 'address', 'cityID', 'stateID', 'zipcodeID', 'countyID', 'unknownAddress'];
  invalid = [];
  subtitle: any;
  opencards = [];
  iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: '',
  };
  isFormLog = false;


  constructor(public messageService: MessageService, public _fb: FormBuilder, public _person: ClildFormService, public _router: Router, public _caseTeam: CaseTeamService) { }

  ngOnInit() {
    this.setIndex(0);
    this.defineOpencards();
    this.formValidation();
    this.defineMainTabs();
    if (this._router.url == '/reports/crbOfficer/details') {
      this.getCustomercarePersonDetails();
    }
    this.breadcrumbs = [
      { label: 'List', href: '/reports/crbOfficer', active: '' },
      { label: 'Form', active: 'active' },
    ];
  }

  /**
  * Validating form
  */
  formValidation() {
    this.crbOfficerForm = this._fb.group({
      'lastName': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
      'firstName': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
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
      'tribeID': '',
      'ethnicityID': '',
    });
  }


  /**
   * Save the form details
   */
  save(data) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';

    data.cityID = data.cityID ? data.cityID.cityID : null;
    data.countyID = data.countyID ? data.countyID.countyID : null;
    data.genderID = data.genderID ? data.genderID.genderID : null;
    data.stateID = data.stateID ? data.stateID.stateID : null;
    data.zipcodeID = data.zipcodeID ? data.zipcodeID.zipcodeID : null;
    data.tribeID = data.tribeID ? data.tribeID.tribeID : null;
    data.ethnicityID = data.ethnicityID ? data.ethnicityID.ethnicityID : null;

    this.crb.entity = 'CRBCoordinator';
    this.crb = data;
    if (this.crbOfficerForm.valid) {
      if (this.crb.crbcoordinatorID) {
        this._person.updateClient(this.crb).then((data) => {
          loader.style.display = 'none';
          this.editBtnCntrl = true;
          this.crb = data.person;
          swal('Saved', 'Details are updated!', 'success');
          this._router.navigate(['/reports/crbOfficer/details']);
        }).catch(() => {
            this.editBtnCntrl = false;
          });
      } else {
        this._person.saveClient(this.crb).then(() => {
          loader.style.display = 'none';
          this.editBtnCntrl = true;
          swal('Saved', 'Details are saved!', 'success');
          this._router.navigate(['/reports/crbOfficer']);
        }).catch(() => {
            this.editBtnCntrl = false;
          });
      }
    } else {
      swal('Fill the required fields!', '', 'warning').then(data => {
        if (data) {
          loader.style.display = 'none';
        }
      });
    }
  }

  /***
   * Update the form details
   */
  update() {
    this.editBtnCntrl = false;
    this.crbOfficerForm.enable();

  }

  /**
   * discard form
   */
  discard() {
    return this._router.navigate(['/reports/crbOfficer']);
  }

  /**
   * Get the metadata for dropdowns
   */
  getMetaData(event, label) {
    let metaDataObj, metaDataReq;
    switch (label) {
      case 'ethnicity':
        metaDataObj = 'ethnicity';
        break;
      case 'gender':
        metaDataObj = 'gender';
        break;
      case 'race':
        metaDataObj = 'race';
        break;
      case 'tribe':
        metaDataObj = 'tribe';
        break;
      case 'city':
        this.getCities(event);
        break;
      case 'state':
        this.crbOfficerForm.controls['cityID'].disable();
        this.crbOfficerForm.controls['countyID'].disable();
        this.crbOfficerForm.controls['zipcodeID'].disable();
        metaDataObj = 'state';
      case 'zipcode':
        this.filterZIPCode(event);
        break;
      case 'county':
        this.filterCounty(event);
        break;
    }
    if (metaDataObj) {
      metaDataReq = { Object: metaDataObj, value: event.query };
      this._caseTeam.getSearchList(metaDataReq).then(data => {
        this.metaData = data.dropDown;
      });
    }

  }

  /**
   * Get the cities and counties based on selected state
   * @param event keyboard event
   */
  generateCityFromSelectedSatate(event) {
    let reqForCities;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.crbOfficerForm.controls['cityID'].enable();
    this.selectedStateID = event.stateID;
    reqForCities = { stateID: event.stateID };
    this._person.getCityFromState(reqForCities).then(data => {
      loader.style.display = 'none';
      this.cities = data.city;
      this.counties = data.county;
    });
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
    });
  }

  /**
   * Get the zipcode and counties based on selected state id and selected city id
   */
  getZIPCode() {
    let reqForZIPCode;
    this.zipcodes = [];
    this.counties = [];
    reqForZIPCode = { stateID: this.selectedStateID, cityID: this.selectedCityID };
    this._person.getZipcodeFromCityState(reqForZIPCode).then((data) => {
      this.zipcodes = data.zipcode;
      this.counties = data.county;
    });

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
    });
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
    });
  }



  /**
   * Get the selected city ID
   * @param event keyboard event
   */
  selectedCity(event) {
    this.crbOfficerForm.controls['zipcodeID'].enable();
    this.crbOfficerForm.controls['countyID'].enable();
    this.selectedCityID = event.cityID;
    this.getZIPCode();

  }

  /**
     * Get the record details based on ID
     */
  getCustomercarePersonDetails() {
    this.editBtnCntrl = true;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.selectedCustomerID = this._person.getId();
    console.log('CRB Officer ID', this._person.getId());
    const req = { crbcoordinatorID: this._person.getId() };
    this._person.getDetailsById(req).then(data => {
      this.crbOfficerForm.disable();
      loader.style.display = 'none';
      // data.person.dob = new Date(data.person.dob);
      this.crb = data.person;
      this.subtitle = this.crb.firstName + ' ' + this.crb.lastName;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.person.changedBy) ? data.person.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.person.changedDate) ? moment(data.person.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.person.enteredBy) ? data.person.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.person.enteredDate) ? moment(data.person.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    });
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

sectionSelection() {
  switch (this.sIndex) {
      case 0:
        return this.section1;
      case 1:
        return this.section2;
  }
}

goNext() {
  const section = this.sectionSelection();
  const invalid = this.findInvalidControls(section);
  if (invalid.length > 0) {
    console.log('%%%%%', invalid);
      this.messageService.add({severity: 'info', summary: 'Invalid', detail: 'Invalid'});
  } else {
  const tabName = this.mainTabs[this.sIndex + 1].href.split('#')[1];
  const previoustabName = this.mainTabs[this.sIndex].href.split('#')[1];
  const nav1 = document.getElementById(tabName);
  const nav2 = document.getElementById(previoustabName);
  nav1.classList.add('active');
  nav1.classList.add('in');
  nav2.classList.remove('active');
  nav2.classList.remove('in');
  this.setIndex(this.sIndex + 1);
  }
}

goPrevious() {
  const tabName = this.mainTabs[this.sIndex - 1].href.split('#')[1];
  const previoustabName = this.mainTabs[this.sIndex].href.split('#')[1];
  const nav1 = document.getElementById(tabName);
  const nav2 = document.getElementById(previoustabName);
  nav1.classList.add('active');
  nav1.classList.add('in');
  nav2.classList.remove('active');
  nav2.classList.remove('in');
  this.setIndex(this.sIndex - 1);
}

findInvalidControls(section) {
  this.invalid = [];
  const controls = this.crbOfficerForm.controls;
  for (const name in controls) {
      if (section.indexOf(name) !== -1) {
          if (controls[name].invalid) {
                      this.invalid.push(name);
                  }
      }
    }
  return this.invalid;
}

defineOpencards() {
  this.opencards = [
    { title: 'Cases', tip: 'Cases', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
  ];
}

navigateTo(label: any) {
  let url: any;
  switch (label) {
    case 'Cases':
      url = '/reports/crbOfficer/cases';
      break;

  }
  this._router.navigate([url]);

}

}
