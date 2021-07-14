import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TeamFormService } from '../../../team-form/team-form.service';
import { CaseTeamService } from './../../../case-team/case-team.service';
import { Judge } from './judge';
import { MessageService } from 'primeng/api';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';
import {LocalValues} from '../../../local-values';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';


@Component({
  selector: 'app-judge-form',
  templateUrl: './judge-form.component.html',
  styleUrls: ['./judge-form.component.scss']
})
export class JudgeFormComponent implements OnInit {

  columnDefs = [];
  rowData = [];
  defaultColDef;
  orgForm: FormGroup;
  mainTabs = [];
  selectedjudgeID;
  judge: Judge = new Judge();
  status = 'draft';
  breadcrumbs = [];
  editForm;
  updateUser: boolean = false;
  searchResults = [];
  userDetails;
  sIndex;
  title = 'Judge';
  cities = [];
  counties = [];
  zipcodes = [];
  filteredCities = [];
  filteredZipcodes = [];
  filteredCounties = [];
  selectedStateID = null;
  selectedCityID = null;
  metaData = [];
  section1 = ['firstName', 'lastName', 'acronym', 'mi', 'conST', 'deceased', 'ethnicityID', 'email', 'suffix', 'cellPh', 'ssn', 'tribeID'];
  section2 = ['workPh', 'fax', 'pager', 'ext', 'cityID', 'stateID', 'zipcodeID', 'countyID', 'unknownAddress'];
  invalid = [];
  subtitle: any;
  opencards = [];
  iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';
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
    public _localVlaues: LocalValues,
    public _openCards: OpencardsService,) {
  }

  ngOnInit() {
    this.caseTeamPersonJumptoTree = this._localVlaues.caseTeamPersonJumptoTree;
    this.setIndex(0);
    this.formValidation();
    this.defineMainTabs();
    this.defineOpencards();
    if (this.router.url == '/reports/judge/details') {
      this.getDhsStaffDetails();
    }
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/judge", active: '' },
      { label: 'Form', active: 'active' },
    )
  }

  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Section 1', href: '#nav-general' },
      { label: 'Section 2', href: '#nav-contact' },
      { label: 'Section 3', href: '#nav-notes' }
    ]
  }

  discardForm() {
    this.router.navigate(['reports/judge'])
  }

  getDhsStaffDetails() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.updateUser = true;
    this.orgForm.disable();
    this.selectedjudgeID = this.clildFormService.getId();
    const req = { judgeID: this.selectedjudgeID }
    this.clildFormService.getDetailsById(req).then(data => {
      loader.style.display = 'none';
      this.judge = data.person;
      this.subtitle = this.judge.firstName + ' ' + this.judge.lastName;
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
      "unknownAddress": '',
      "cityID": '',
      "stateID": '',
      "zipcodeID": '',
      "countyID": '',
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
      case 'contractState':
        metaDataObj = 'contractState'
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
        metaDataObj = 'tribe';
        break;
      case 'ethnicity':
        metaDataObj = "ethnicity";
        break;
    }
    if (metaDataObj) {
      metaDataReq = { Object: metaDataObj, value: event.query }
      this._CaseTeamService.getSearchList(metaDataReq).then(data => {
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
    this.orgForm.controls['cityID'].enable();
    this.selectedStateID = event.stateID;
    reqForCities = { stateID: event.stateID }
    this.clildFormService.getCityFromState(reqForCities).then(data => {
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
    this.clildFormService.getZipcodeFromCityState(reqForZIPCode).then((data) => {
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
    post.cityID = post.cityID ? post.cityID.cityID : null;
    post.stateID = post.stateID ? post.stateID.stateID : null;
    post.contract_StateID = post.contract_StateID ? post.contract_StateID.stateID : null;
    post.zipcodeID = post.zipcodeID ? post.zipcodeID.zipcodeID : null;
    post.countyID = post.countyID ? post.countyID.countyID : null;
    post.tribeID = post.tribeID ? post.tribeID.tribeID : null;
    post.ethnicityID = post.ethnicityID ? post.ethnicityID.ethnicityID : null;
    post.genderID = post.genderID ? post.genderID.genderID : null;
    if (this.orgForm.invalid) {
      swal('Warning', 'Fill the mandatory fields', 'warning')
    } else {
      post.entity = 'Judge';
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



    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.clildFormService.saveClient(post).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        swal('Success', 'Judge saved successfully', 'success')
        this.router.navigate(['/reports/judge']);
      } else {
        swal('Oops!', 'Judge not saved', 'warning')
      }
    })
  }

  updateClient(post) {
    // post.changedBy = this.userDetails.firstName;
    post.judgeID = this.selectedjudgeID;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.clildFormService.updateClient(post).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        this.judge = data.person;
        swal('Success', 'Judge updated successfully', 'success')
        this.router.navigate(['/reports/judge']);
      } else {
        swal('Oops!', 'Judge not saved', 'warning')
      }
    })
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
        url = '/reports/judge/cases';
        break;

    }
    this.router.navigate([url])

  }

  ngOnDestroy() {
    this._localVlaues.caseTeamPersonJumptoTree = false;
  }

  onClickJumptoPlacement() {
    let currentClientId = parseInt(this._localVlaues.caseTeamClientId);
    let clientID = currentClientId + this._openCards.getHasKey();
    localStorage.setItem("clientId", clientID.toString());
    this.router.navigate(['/reports/client/details']);
  }

}

