import { Component, OnInit } from '@angular/core';
import { CourtServiceOfficer } from '../court-service-officer-list/court-service-officer';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClildFormService } from '../child-forms/child-forms.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';


@Component({
  selector: 'app-court-service-officer-form',
  templateUrl: './court-service-officer-form.component.html',
  styleUrls: ['./court-service-officer-form.component.scss']
})
export class CourtServiceOfficerFormComponent implements OnInit {

  csOfficer: CourtServiceOfficer = new CourtServiceOfficer();
  csOfficerForm: FormGroup;
  title = 'Court Service Officer';
  status = 'active';
  formStatus = 'draft';
  breadcrumbs = [];
  metaData = [];
  mainTabs = [];
  sIndex: number = null;
  section1 = ['firstName', 'lastName', 'acronym', 'mi', 'suffix', 'ssn', 'conST', 'genderID', 'deceased', 'ethnicityID', 'tribeID', 'email'];
  section2 = ['workPh', 'cellPh', 'fax', 'pager', 'ext', 'address', 'cityID', 'stateID'];
  invalid = [];
  selectedCustomerID: any;
  selectedStateID: any;
  selectedCityID: any;
  editBtnCntrl = false;
  cities = [];
  counties = [];
  zipcodes = [];
  filteredZipcodes = [];
  filteredCounties = [];
  filteredCities = [];
  subtitle: any;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: '',
  };
  isFormLog = false;


  constructor(public _fb: FormBuilder, public _caseTeam: CaseTeamService, public messageService: MessageService, public _person: ClildFormService, public _router: Router) {
    this.formValidation();
   }

  ngOnInit() {
    this.defineMainTabs();
    this.setIndex(0);
    this.formValidation();
    if (this._router.url == '/reports/court/service/officer/details') {
      this.getCSOfficerDetails();
    }
    this.breadcrumbs.push(
      { label: 'List', href: '/reports/court/service/officer', active: '' },
      { label: 'Form', active: 'active' },
    );
  }

  formValidation() {
    this.csOfficerForm = this._fb.group({
      'lastName': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
      'firstName': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
      'cityID': new FormControl('', Validators.compose([Validators.required])),
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
      'mi': new FormControl('', Validators.maxLength(2)),
      'email': '',
      'countyID': '',
      'srsofficeID': '',
      'ethnicityID': '',
      'tribeID': '',
      'ext': '',
      'ssn': ''

    });
}

save(data) {
  const loader = document.getElementById('loading-overlay') as HTMLElement;
  loader.style.display = 'block';
  data.dob ? data.dob = new Date(data.dob).getTime() : '';
  data.genderID = data.genderID ? data.genderID.genderID : null;
  data.raceID = data.raceID ? data.raceID.raceID : null ;
  data.cityID = data.cityID ? data.cityID.cityID : null ;
  data.zipcodeID = data.zipcodeID ? data.zipcodeID.zipcodeID : null;
  data.stateID = data.stateID ? data.stateID.stateID : null;
  data.countyID = data.countyID ? data.countyID.countyID : null;
  data.ethnicityID = data.ethnicityID ? data.ethnicityID.ethnicityID : null;
  data.tribeID = data.tribeID ? data.tribeID.tribeID : null ;
  this.csOfficer.entity = 'courtServiceOfficer';
  this.csOfficer = data;
  if (this.csOfficerForm.valid) {
    if (this.csOfficer.csvid) {
      this._person.updateClient(this.csOfficer).then((data) => {
        loader.style.display = 'none';
        this.editBtnCntrl = true;
        swal('Updated', 'Details are updated!', 'success');
        this.csOfficer = data.person;
        this._router.navigate(['/reports/court/service/officer/details']);
      }).catch(() => {
          this.editBtnCntrl = false;
        });
    } else {
      this._person.saveClient(this.csOfficer).then(() => {
        loader.style.display = 'none';
        this.editBtnCntrl = true;
        swal('Saved', 'Details are Saved!', 'success');
        this._router.navigate(['/reports/court/service/officer/new']);
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
  this.csOfficerForm.enable();

}

/**
 * discard form
 */
discard() {
  return this._router.navigate(['/reports/customerCare']);
}

/**
   * Get the cities and counties based on selected state
   * @param event keyboard event
   */
  generateCityFromSelectedSatate(event) {
    let reqForCities;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.csOfficerForm.controls['cityID'].enable();
    this.selectedStateID = event.stateID;
    reqForCities = { stateID: event.stateID };
    this._person.getCityFromState(reqForCities).then(data => {
      loader.style.display = 'none';
      this.cities = data.city;
      this.counties = data.county;
    });
  }

   /**
   * Get the selected city ID
   * @param event keyboard event
   */
  selectedCity(event) {
    this.csOfficerForm.controls['zipcodeID'].enable();
    this.csOfficerForm.controls['countyID'].enable();
    this.selectedCityID = event.cityID;
    this.getZIPCode();

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
   * Get the metadata for dropdowns
   */
  getMetaData(event, label) {
    let metaDataObj, metaDataReq;
    switch (label) {
      case 'gender':
        metaDataObj = 'gender';
        break;
      case 'tribe':
        metaDataObj = 'tribe';
        break;
      case 'ethnicity':
        metaDataObj = 'ethnicity';
        break;
      case 'state':
        this.csOfficerForm.controls['cityID'].disable();
        this.csOfficerForm.controls['countyID'].disable();
        this.csOfficerForm.controls['zipcodeID'].disable();
        metaDataObj = 'state';
        break;
      case 'city':
        this.getCities(event);
        break;
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
   * Define main tabs in the form section
   */
  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Section 1', href: '#nav-sec1' },
      { label: 'Section 2', href: '#nav-sec2' }    ];
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
  const controls = this.csOfficerForm.controls;
  for (const name in controls) {
      if (section.indexOf(name) !== -1) {
          if (controls[name].invalid) {
                      this.invalid.push(name);
                  }
      }
    }
  return this.invalid;
}


/**
   * Get the record details based on ID
   */
  getCSOfficerDetails() {
    this.editBtnCntrl = true;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.selectedCustomerID = this._person.getId();
    const req = { csvid: this.selectedCustomerID };
    this._person.getDetailsById(req).then(data => {
      this.csOfficerForm.disable();
      loader.style.display = 'none';
      data.person.dob = new Date(data.person.dob);
      this.csOfficer = data.person;
      this.subtitle = this.csOfficer.firstName + ' ' + this.csOfficer.lastName;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.person.changedBy) ? data.person.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.person.changedDate) ? moment(data.person.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.person.enteredBy) ? data.person.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.person.enteredDate) ? moment(data.person.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    });
  }



}
