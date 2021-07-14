import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TeamFormService } from '../../../team-form/team-form.service';
import { CaseTeamService } from './../../../case-team/case-team.service';
import { CommunityMember } from './community-member';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';
import {LocalValues} from '../../../local-values';


@Component({
  selector: 'app-community-member-form',
  templateUrl: './community-member-form.component.html',
  styleUrls: ['./community-member-form.component.scss']
})
export class CommunityMemberFormComponent implements OnInit {

  columnDefs = [];
  rowData = [];
  defaultColDef;
  orgForm: FormGroup;
  mainTabs = [];
  selectedcommunityMemberID;
  communityMember: CommunityMember = new CommunityMember();
  status = 'draft';
  breadcrumbs = [];
  editForm;
  updateUser: boolean = false;
  searchResults = [];
  userDetails;
  sIndex;
  title = 'Community Member';
  cities = [];
  counties = [];
  zipcodes = [];
  filteredCities = [];
  filteredZipcodes = [];
  filteredCounties = [];
  selectedStateID = null;
  selectedCityID = null;
  metaData = [];
  // section3= ['address','cityID','stateID','zipcodeID','countyID',"notes","nonContractClient","medicalID",];
  section1 = ['firstName', 'lastName', "acronym", 'mi', 'suffix', 'dob', 'ssn', "conST", 'genderID', 'raceID', 'deceased', 'ethnicityID'];
  section2 = ['tribeID', 'email', 'homePh', 'workPh', 'cellPh', 'fax', 'pager', 'ext', 'address', 'cityID,stateID', 'unknown', "zipcodeID", "countyID"];
  invalid = [];
  subtitle: any;
  isCasesOpencardsVisible = false;
  refcOpencards = []
  iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public formBuilder: FormBuilder,
    public _caseTeam: CaseTeamService,
    public _person: ClildFormService,
    public router: Router,
    public _team: TeamFormService,
    public messageService: MessageService,
    public _localValues: LocalValues,) {
  }

  ngOnInit() {
    this.setIndex(0);
    this.formValidation();
    this.defineMainTabs();
    this.defineOpencards();
    if (this.router.url == '/reports/communityMember/details') {
      this.isCasesOpencardsVisible = true;
      this.getDhsStaffDetails();
    } else {
      if (
        this._localValues.personInitialDetailsFromPersonMasterCreation !==
          null &&
        this._localValues.personInitialDetailsFromPersonMasterCreation !==
          undefined
      ) {
        this.communityMember.firstName = this._localValues.personInitialDetailsFromPersonMasterCreation.firstName;
        this.communityMember.lastName = this._localValues.personInitialDetailsFromPersonMasterCreation.lastName;
        this.communityMember.ssn = this._localValues.personInitialDetailsFromPersonMasterCreation.ssn;
      }
    }
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/communityMember", active: '' },
      { label: 'Form', active: 'active' },
    )
  }

  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Section 1', href: '#nav-1' },
      { label: 'Section 2', href: '#nav-2' },
      { label: 'Section 3', href: '#nav-3' }
    ]
  }

  discardForm() {
    this.router.navigate(['reports/communityMember'])
  }

  getDhsStaffDetails() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.updateUser = true;
    this.orgForm.disable();
    this.selectedcommunityMemberID = this._person.getId();
    const req = { communityMemberID: this.selectedcommunityMemberID }
    this._person.getDetailsById(req).then(data => {
      loader.style.display = 'none';
      data.person.dob = data.person ? new Date(data.person.dob) : null;
      this.communityMember = data.person;
      this.subtitle = this.communityMember.firstName + ' ' + this.communityMember.lastName;
      this.orgForm.disable();
      this.editForm = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.person.changedBy) ? data.person.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.person.changedDate) ? moment(data.person.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.person.enteredBy) ? data.person.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.person.enteredDate) ? moment(data.person.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


    })
  }

  formValidation() {
    this.orgForm = this.formBuilder.group({
      "cellPh": '',
      "email": '',
      "firstName": new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
      "genderID": '',
      "homePh": '',
      "lastName": new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
      "mi": '',
      "notes": '',
      "fax": '',
      "pager": '',
      "tribeID": '',
      "contract_StateID": '',
      'raceID': '',
      "ext": '',
      "workPh": '',
      "acronym": '',
      "deceased": '',
      "suffix": '',
      "ssn": '',
      "address": '',
      "dob": '',
      "cityID": new FormControl('', Validators.compose([Validators.required])),
      "stateID": new FormControl('', Validators.compose([Validators.required])),
      "zipcodeID": new FormControl('', Validators.compose([Validators.required])),
      "countyID": new FormControl('', Validators.compose([Validators.required])),
      "unknownAddress": '',
      "ethnicityID": '',
    })
  }

  // getGender(event) {
  //   let req = {
  //     "Object": "gender",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getEthnicity(event) {
  //   let req = {
  //     "Object": "ethnicity",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getTribe(event) {
  //   let req = {
  //     "Object": "tribe",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getRace(event) {
  //   let req = {
  //     "Object": "race",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getReligion(event) {
  //   let req = {
  //     "Object": "religion",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getLanguage(event) {
  //   let req = {
  //     "Object": "language",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getStatus(event) {
  //   let req = {
  //     "Object": "employmentStatus",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getLevel(event) {
  //   let req = {
  //     "Object": "educationLevel",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

  // getState(event) {
  //   let req = {
  //     "Object": "state",
  //     "value": event.query
  //   }
  //   this._CaseTeamService.getSearchList(req).then(data => {
  //     this.searchResults = data.dropDown;
  //   })
  // }

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
    let controls = this.orgForm.controls;
    for (let name in controls) {
      if (section.indexOf(name) !== -1) {
        if (controls[name].invalid) {
          this.invalid.push(name);
        }
      }
    }
    return this.invalid;
  }

  getUserById() {
    //  let userId = '7';
    let userId = localStorage.getItem('UserId');
    this._team.getUserById({ staffID: parseInt(userId) }).then(data => {
      console.log("getUserById", data);
      this.userDetails = data.users;
    })
  }

  edit() {
    this.editForm = false;
    this.orgForm.enable();
  }

  addPost(post) {
    post.raceID = post.raceID ? post.raceID.raceID : null;
    post.stateID = post.stateID ? post.stateID.stateID : null;
    post.zipcodeID = post.zipcodeID ? post.zipcodeID.zipcodeID : null;
    post.tribeID = post.tribeID ? post.tribeID.tribeID : null;
    post.ethnicityID = post.ethnicityID ? post.ethnicityID.ethnicityID : null;
    post.countyID = post.countyID ? post.countyID.countyID : null;
    post.cityID = post.cityID ? post.cityID.cityID : null;
    post.contract_StateID = post.contract_StateID ? post.contract_StateID.contract_StateID : null;
    post.genderID = post.genderID ? post.genderID.genderID : null;

    if (this.orgForm.invalid) {
      swal('Warning', 'Fill the mandatory fields', 'warning')
    } else {
      post.entity = 'CommunityMember';
      post.dob ? post.dob = new Date(post.dob).getTime() : null;
      if (this.updateUser) {
        this.updateClient(post);
      } else {
        this.saveClient(post);
      }
    }
  }

  getTodayDate() {
    let todayDate;
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    if (date !== '' && date !== null && JSON.stringify(date).includes('-')) {
      let myDate2 = date.split("-");
      var newDate = myDate2[0] + "/" + myDate2[1] + "/" + myDate2[2];
      todayDate = new Date(newDate).getTime();
    }
    return todayDate;
  }

  saveClient(post) {
    // post.enteredBy = this.userDetails.firstName;
    // post.enteredDate = this.getTodayDate();
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._person.saveClient(post).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        swal('Success', 'Community Member saved successfully', 'success')
        this.router.navigate(['/reports/communityMember']);
      } else {
        swal('Oops!', 'Community Member not saved', 'warning')
      }
    })
  }

  updateClient(post) {
    // post.changedBy = this.userDetails.firstName;
    // post.changedDate = this.getTodayDate();
    post.communityMemberID = this.selectedcommunityMemberID;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._person.updateClient(post).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        swal('Success', 'Community Member saved successfully', 'success')
        this.router.navigate(['/reports/communityMember']);
      } else {
        swal('Oops!', 'Community Member not saved', 'warning')
      }
    })
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
      case 'race':
        metaDataObj = "race";
        break;
      case 'city':
        this.getCities(event);
        break;
      case 'state':
        this.orgForm.controls['cityID'].disable();
        this.orgForm.controls['countyID'].disable();
        this.orgForm.controls['zipcodeID'].disable();
        metaDataObj = 'state';
      case 'zipcode':
        this.filterZIPCode(event);
        break;
      case 'county':
        this.filterCounty(event);
        break;
      case 'tribe':
        metaDataObj = "tribe";
        break;
      case 'ethnicity':
        metaDataObj = "ethnicity";
        break;
    }
    if (metaDataObj) {
      metaDataReq = { Object: metaDataObj, value: event.query }
      this._caseTeam.getSearchList(metaDataReq).then(data => {
        this.searchResults = data.dropDown;
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
    this.orgForm.controls['cityID'].enable();
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
    this.orgForm.controls['zipcodeID'].enable();
    this.orgForm.controls['countyID'].enable();
    this.selectedCityID = event.cityID;
    this.getZIPCode();

  }

  defineOpencards() {

    this.refcOpencards = [
      { title: 'Cases', tip: 'Cases', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
    ];



  }

  navigateTo(label: any) {
    let url: any;
    switch (label) {
      case 'Cases':
        url = '/reports/communityMember/list';
        break;
    }
    return this.router.navigate([url])
  }



}
