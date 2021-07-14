import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TeamFormService } from '../../../team-form/team-form.service';
import { CaseTeamService } from './../../../case-team/case-team.service';
import { CasaOfficer } from './casa-officer';
import { MessageService } from 'primeng/api';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';
import {LocalValues} from '../../../local-values';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';


@Component({
  selector: 'app-casa-officer-form',
  templateUrl: './casa-officer-form.component.html',
  styleUrls: ['./casa-officer-form.component.scss']
})
export class CasaOfficerFormComponent implements OnInit {

  columnDefs = [];
  rowData = [];
  defaultColDef;
  orgForm: FormGroup;
  mainTabs = [];
  selectedCasaOfficerId;
  casaOfficer: CasaOfficer = new CasaOfficer();
  status = 'draft';
  breadcrumbs = [];
  editForm;
  updateUser: boolean = false;
  searchResults = [];
  userDetails;
  sIndex;
  title = 'CASA Officer';
  stateID: any;
  cityData = [];
  zipcodeData = [];
  countyData = [];
  results: any;
  // section3= ['address','cityID','stateID','zipcodeID','countyID',"notes","nonContractClient","medicalID",];
  section1 = ['firstName', 'lastName', "acronym", 'mi', 'suffix', 'ssn', "conST", 'genderID', 'deceased', 'ethnicityID', 'tribeID', 'email'];
  section2 = ['workPh', 'cellPh', 'fax', "pager", 'ext', 'address', 'cityID', 'stateID'];
  invalid = [];
  subtitle: any;
  refcOpencards = []
  iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';
  isCasesOpencardsVisible = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  caseTeamPersonJumptoTree = false;

  constructor(public formBuilder: FormBuilder,
    public _CaseTeamService: CaseTeamService,
    public clildFormService: ClildFormService,
    public router: Router,
    public _team: TeamFormService,
    public messageService: MessageService,
    public _localValues: LocalValues,
    public _openCards: OpencardsService) {
  }

  ngOnInit() {
    this.caseTeamPersonJumptoTree = this._localValues.caseTeamPersonJumptoTree;
    this.setIndex(0);
    this.formValidation();
    this.defineMainTabs();
    this.defineOpencards();
    this.getUserById();
    if (this.router.url == '/reports/casaOfficer/details') {
      this.isCasesOpencardsVisible = true;
      this.getDhsStaffDetails();
    } else {
      if (
        this._localValues.personInitialDetailsFromPersonMasterCreation !==
          null &&
        this._localValues.personInitialDetailsFromPersonMasterCreation !==
          undefined
      ) {
        this.casaOfficer.firstName = this._localValues.personInitialDetailsFromPersonMasterCreation.firstName;
        this.casaOfficer.lastName = this._localValues.personInitialDetailsFromPersonMasterCreation.lastName;
        this.casaOfficer.ssn = this._localValues.personInitialDetailsFromPersonMasterCreation.ssn;
      }
    }
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/casaOfficer", active: '' },
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
    this.router.navigate(['reports/casaOfficer'])
  }

  getDhsStaffDetails() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.updateUser = true;
    this.orgForm.disable();
    this.selectedCasaOfficerId = this.clildFormService.getId();
    let req = { casaOfficerID: parseInt(localStorage.getItem("casaOfficerID")) - this._openCards.getHasKey() }
    this.clildFormService.getDetailsById(req).then(data => {
      loader.style.display = 'none';
      this.casaOfficer = data.person;
      this.subtitle = this.casaOfficer.firstName + ' ' + this.casaOfficer.lastName;
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
      "email": new FormControl('', Validators.compose([Validators.required, Validators.maxLength(75)])),
      "firstName": new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
      "genderID": '',
      "homePh": '',
      "lastName": new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
      "mi": new FormControl('', Validators.compose([Validators.maxLength(2)])),
      "notes": new FormControl('', Validators.compose([Validators.maxLength(225)])),
      "fax": '',
      "pager": '',
      "tribeID": '',
      "ethnicityID": '',
      "ext": '',
      "workPh": '',
      "acronym": '',
      "deceased": '',
      "contractState": '',
      "suffix": '',
      "ssn": '',
      "address": '',
      "Unknown": '',
      "cityID": new FormControl('', Validators.compose([Validators.required])),
      "stateID": new FormControl('', Validators.compose([Validators.required])),
      "zipcodeID": '',
      "countyID": '',
      "unknownAddress": ''
    })
  }

  getGender(event) {
    let req = {
      "Object": "gender",
      "value": event.query
    }
    this._CaseTeamService.getSearchList(req).then(data => {
      this.searchResults = data.dropDown;
    })
  }

  getEthnicity(event) {
    let req = {
      "Object": "ethnicity",
      "value": event.query
    }
    this._CaseTeamService.getSearchList(req).then(data => {
      this.searchResults = data.dropDown;
    })
  }

  /**  Based on selected state city data will filter */
  getSelectedState(ev) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.stateID = ev.stateID;
    let req = {
      "stateID": ev.stateID
    }
    this.clildFormService.getCityFromState(req).then(data => {
      // this.showCity = false;
      loader.style.display = 'none';
      this.orgForm.controls['cityID'].setValue(null);
      this.cityData = data.city;
      this.results = data.city
    })
  }

  /** City data complete method */
  filterCity(ev) {
    let filtered: any[] = [];
    for (let i = 0; i < this.cityData.length; i++) {
      let country = this.cityData[i];
      if (country.city.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.results = filtered;
  }

  /*** Based in selected city county and zip code data fetched */

  getSelectedCity(ev) {
    let req = {
      "stateID": this.stateID,
      "cityID": ev.cityID
    }
    this.clildFormService.getZipcodeFromCityState(req).then(data => {
      this.zipcodeData = data.zipcode;
      this.countyData = data.county;
      data.zipcode.length == 1 ? this.orgForm.controls['zipcodeID'].setValue(data.zipcode[0]) : null;
      data.county.length == 1 ? this.orgForm.controls['countyID'].setValue(data.county[0]) : null;
    })
  }


  /** County complete method */
  getCounty(ev) {
    let filtered: any[] = [];
    for (let i = 0; i < this.countyData.length; i++) {
      let country = this.countyData[i].countyName;
      if (country.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.results = filtered;
  }

  /** Zipcode complete method */

  getZipcode(ev) {

    let filtered: any[] = [];
    for (let i = 0; i < this.zipcodeData.length; i++) {
      let country = this.zipcodeData[i].zipcode;
      if (country.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.results = filtered;
  }


  onClearingState() { }

  onClearing() { }

  getTribe(event) {
    let req = {
      "Object": "tribe",
      "value": event.query
    }
    this._CaseTeamService.getSearchList(req).then(data => {
      this.searchResults = data.dropDown;
    })
  }


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
    let userId = localStorage.getItem('UserId') || "4620";
    this._team.getUserById({ staffID: parseInt(userId) }).then(data => {
      console.log("getUserById", data);
      this.userDetails = data.users;
    })
  }

  getState(event) {
    let req = {
      "Object": "state",
      "value": event.query
    }
    this._CaseTeamService.getSearchList(req).then(data => {
      this.results = data.dropDown;
    })
  }

  edit() {
    this.editForm = false;
    this.orgForm.enable();
  }

  addPost(post) {
    if (this.orgForm.valid) {
    post.cityID = post.cityID ? post.cityID.cityID : null;
    post.stateID = post.stateID ? post.stateID.stateID : null;
    post.zipcodeID = post.zipcodeID ? post.zipcodeID.zipcodeID : null;
    post.countyID = post.countyID ? post.countyID.countyID : null;
    post.tribeID = post.tribeID ? post.tribeID.tribeID : null;
    post.ethnicityID = post.ethnicityID ? post.ethnicityID.ethnicityID : null;
    post.genderID = post.genderID ? post.genderID.genderID : null;
    post.entity = 'CasaOfficer';
      if (this.updateUser) {
        this.updateClient(post);
      } else {
        this.saveClient(post);
      }
    } else {
      swal('Warning', 'Fill the mandatory fields', 'warning')
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
    post.enteredBy = this.userDetails.firstName;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.clildFormService.saveClient(post).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        // const req = { casaOfficerID: data.person.casaOfficerID }
        // this.clildFormService.getDetailsById(req).then(data => {
        //   loader.style.display = 'none';
        //   this.casaOfficer = data.person;

        // })
        this.router.navigate(['/reports/casaOfficer']);
        swal('Success', 'CASA Officer saved successfully', 'success');


      } else {
        swal('Oops!', 'CASA Officer not saved', 'warning')
      }
    })
  }

  updateClient(post) {
    post.changedBy = this.userDetails.firstName;
    post.casaOfficerID = this.selectedCasaOfficerId;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.clildFormService.updateClient(post).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        swal('Success', 'CASA Officer saved successfully', 'success');
        this.casaOfficer = data.person;
        this.router.navigate(['/reports/casaOfficer']);
      } else {
        swal('Oops!', 'CASA Officer not saved', 'warning')
      }
    })
  }

  navigateTo(label: any) {
    let url: any;
    switch (label) {
      case 'Cases':
        url = '/reports/casaOfficer/list';
        break;
    }
    return this.router.navigate([url])
  }

  defineOpencards() {

    this.refcOpencards = [
      { title: 'Cases', tip: 'Cases', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
    ];



  }

  ngOnDestroy() {
    this._localValues.caseTeamPersonJumptoTree = false;
  }

  onClickJumptoPlacement() {
    let currentClientId = parseInt(this._localValues.caseTeamClientId);
    let clientID = currentClientId + this._openCards.getHasKey();
    localStorage.setItem("clientId", clientID.toString());
    this.router.navigate(['/reports/client/details']);
  }

}

