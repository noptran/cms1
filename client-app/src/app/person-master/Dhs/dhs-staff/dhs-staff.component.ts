import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TeamFormService } from '../../../team-form/team-form.service';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { DhsStaff } from './dhs-staff';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';

@Component({
  selector: 'app-dch-staff',
  templateUrl: './dhs-staff.component.html',
  styleUrls: ['./dhs-staff.component.scss']
})
export class DHSStaffComponent implements OnInit {
  orgForm: FormGroup;
  mainTabs = [];
  dhsStaff: DhsStaff = new DhsStaff();
  breadcrumbs = [];
  editForm = false;
  sIndex: number;
  req = {};
  metaData = [];
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  status: any;
  formStatus: any;
  subtitle: any;
  title: any;

  constructor(public formBuilder: FormBuilder,
    public _CaseTeamService: CaseTeamService,
    public clildFormService: ClildFormService,
    public router: Router,
    public _team: TeamFormService) {
  }

  ngOnInit() {
    this.setIndex(0);
    this.formValidation();
    this.defineMainTabs();
    if (this.router.url == '/reports/dhsStaff/details') {
      this.getDhsStaffDetails();
    }

    this.breadcrumbs.push(
      { label: 'List', href: "/reports/dhsStaff", active: '' },
      { label: 'Form', active: 'active' },
    )
  }

  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Section 1', href: '#nav-1' },
      { label: 'Section 2', href: '#nav-2' },
    ]
  }

  discardForm() {
    this.router.navigate(['reports/dhsStaff'])
  }

  getDhsStaffDetails() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { dhsStaffID: this.clildFormService.getId() }
    this.clildFormService.getDetailsById(this.req).then(data => {
      loader.style.display = 'none';
      this.dhsStaff = data.person;
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
      "dhsofficeID": '',
      // new FormControl('', Validators.compose([Validators.required]))
      "fax": '',
      "pager": '',
      "tribeID": '',
      "ethnicityID": '',
      "ext": '',
      "workPh": '',
      "acronym": '',
      "deceased": '',
      "contract_StateID": '',
      "unknownAddress": '',
      "address": '',
    })
  }

  setIndex(index: number) {
    this.sIndex = index;
  }


  edit() {
    this.orgForm.enable();
  }

  addPost() {
    if (this.orgForm.valid) {
      !isNullOrUndefined(this.dhsStaff.ethnicityID) ? this.dhsStaff.ethnicityID = this.dhsStaff.ethnicityID.ethnicityID : null;
      !isNullOrUndefined(this.dhsStaff.genderID) ? this.dhsStaff.genderID = this.dhsStaff.genderID.genderID : null;
      !isNullOrUndefined(this.dhsStaff.tribeID) ? this.dhsStaff.tribeID = this.dhsStaff.tribeID.tribeID : null;
      !isNullOrUndefined(this.dhsStaff.dhsofficeID) ? this.dhsStaff.dhsofficeID = this.dhsStaff.dhsofficeID.dhsofficeID : null;
      !isNullOrUndefined(this.dhsStaff.contract_StateID) ? this.dhsStaff.contract_StateID = this.dhsStaff.contract_StateID.sateID : null;
      if (this.dhsStaff.dhsStaffID) {
        this.updateClient(this.dhsStaff)
      } else {
        this.saveClient(this.dhsStaff);
      }
    } else { 
      swal('Warning', 'Fill the mandatory fields', 'warning')
    }
  }

  saveClient(post) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.clildFormService.saveClient(post).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        swal('Success', 'DHS Staff saved successfully', 'success')
        this.router.navigate(['/reports/dhsStaff']);
      } else {
        swal('Oops!', 'DHS Staff not saved', 'warning')
      }
    })
  }

  updateClient(post) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.clildFormService.updateClient(post).then(data => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        // this.dhsStaff = data.person;
        // this.dhsStaff.dhsofficeID = data.dhsofficeID;
        this.router.navigate(['/reports/dhsStaff']);
      } else {
        swal('Oops!', 'DHS Staff  not saved', 'warning')
      }
    })
  }

  formBack() {
    return this.router.navigate(['/reports/dhsStaff']);
  }

  getMetaData(label: string, event: any) {
    let req = {value:event.query}
    switch (label) {
      case 'contractState':
        req['Object']='contractState';
        break;
      case 'gender':
        req['Object']='gender';
        break;
      case 'ethnicity':
        req['Object']='ethnicity';
        break;
      case 'tribe':
        req['Object']='tribe';
        break;
      case 'dhsOffice':
        req['Object']='dhsOffice';
        break;
    }
    this._CaseTeamService.getSearchList(req).then(data => this.metaData = data.dropDown)
  }

  resetForm() {
    // resetForm
  }

}
