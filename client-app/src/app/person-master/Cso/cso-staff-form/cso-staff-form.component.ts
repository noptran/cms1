import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TeamFormService } from '../../../team-form/team-form.service';
import { CaseTeamService } from './../../../case-team/case-team.service';
import { CsoStaff } from './cso-staff';
import { MessageService } from 'primeng/api';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';


@Component({
  selector: 'app-cso-staff-form',
  templateUrl: './cso-staff-form.component.html',
  styleUrls: ['./cso-staff-form.component.scss']
})
export class CsoStaffFormComponent implements OnInit {
  formStatus?: any;
  columnDefs = [];
  rowData = [];
  defaultColDef;
  orgForm: FormGroup;
  mainTabs = [];
  selectedCsoStaffId;
  CsoStaff: CsoStaff = new CsoStaff();
  status = 'draft';
  breadcrumbs = [];
  editForm;
  updateUser: boolean = false;
  searchResults = [];
  userDetails;
  sIndex;
  title = 'CSO Staff';
  section1 = ['firstName', 'lastName', "acronym", 'mi', 'suffix', 'dob', 'ssn', "conST", 'genderID', 'raceID', 'deceased', 'ethnicityID'];
  section2 = ['tribeID', 'email', 'homePh', 'workPh', 'cellPh', 'fax', 'pager', 'ext', 'address', 'cityID,stateID', 'unknown', "zipcodeID", "countyID"];
  invalid = [];
  subtitle: any;
  isCasesOpen = false;
  isCsoOfficeOpen = false;

  metaData =[];
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public formBuilder: FormBuilder,
    public _CaseTeamService: CaseTeamService,
    public clildFormService: ClildFormService,
    public router: Router,
    public _team: TeamFormService,
    public messageService: MessageService) {
  }

  ngOnInit() {
    this.setIndex(0);
    this.formValidation();
    this.defineMainTabs();
    if (this.router.url == '/reports/csoStaff/details') {
      this.getCsoStaffDetails();
    }
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/csoStaff", active: '' },
      { label: 'Form', active: 'active' },
    )

  }

  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Section 1', href: '#nav-1' },
      { label: 'Section 2', href: '#nav-2' }
    ]
  }

  discardForm() {
    this.router.navigate(['reports/csoStaff'])
  }

  getCsoStaffDetails() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.updateUser = true;
    this.orgForm.disable();
    this.selectedCsoStaffId = this.clildFormService.getId();
    const req = { CSOStaffID: this.selectedCsoStaffId }
    this.clildFormService.getDetailsById(req).then(data => {
      loader.style.display = 'none';
      this.CsoStaff = data.person;
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
      "csoofficeID": new FormControl('', Validators.compose([Validators.required])),
      "fax": '',
      "pager": '',
      "tribeID": '',
      "ethnicityID": '',
      "ext": '',
      "workPh": '',
      "acronym": '',
      "deceased": '',
      "contract_StateID": '',
    })
  }

  setIndex(index: number) {
    this.sIndex = index;
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
    this.orgForm.enable();
  }

  addPost(post) {
    !isNullOrUndefined(this.CsoStaff.ethnicityID) ? this.CsoStaff.ethnicityID = this.CsoStaff.ethnicityID.ethnicityID : null;
    !isNullOrUndefined(this.CsoStaff.genderID) ? this.CsoStaff.genderID = this.CsoStaff.genderID.genderID : null;
    !isNullOrUndefined(this.CsoStaff.tribeID) ? this.CsoStaff.tribeID = this.CsoStaff.tribeID.tribeID : null;
    !isNullOrUndefined(this.CsoStaff.csoofficeID) ? this.CsoStaff.csoofficeID = this.CsoStaff.csoofficeID.csoofficeID : null;
    !isNullOrUndefined(this.CsoStaff.contract_StateID) ? this.CsoStaff.contract_StateID = this.CsoStaff.contract_StateID.stateID : null;
    if (this.orgForm.invalid) {
      swal('Warning', 'Fill the mandatory fields', 'warning')
    } else {
      this.CsoStaff.entity = 'CSOStaff';
      if (this.updateUser) {
        this.updateClient(this.CsoStaff);
      } else {
        this.saveClient(this.CsoStaff);
      }
    }
  }


  saveClient(post) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.clildFormService.saveClient(post).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        swal('Success', 'CSO Staff saved successfully', 'success')
        this.router.navigate(['/reports/csoStaff']);
      } else {
        swal('Oops!', 'CSO Staff not saved', 'warning')
      }
    })
  }

  updateClient(post) {
    post.CSOStaffID = this.selectedCsoStaffId;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.clildFormService.updateClient(post).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        swal('Success', 'CSO Staff  saved successfully', 'success')
        this.router.navigate(['/reports/csoStaff']);
      } else {
        swal('Oops!', 'CSO Staff  not saved', 'warning')
      }
    })
  }

  getMetaData(label: string, event: any) {
    let req ={value:event.query}
    switch (label) {
      case 'contractState':
        req['Object']="contractState";
        break;
      case 'gender':
        req['Object']="gender";
        break;
      case 'ethnicity':
        req['Object']="ethnicity";
        break;
      case 'tribe':
        req['Object']="tribe";
        break;
      case 'csoOffice':
        req['Object']="csoOffice";
        break;
    }
    this._CaseTeamService.getSearchList(req).then(data => this.metaData = data.dropDown)
  }

  resetForm() {
    // resetForm
  }

}
