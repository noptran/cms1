import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { AgGridNg2 } from 'ag-grid-angular';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DhhsStaff } from './dhhs-staff';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { MessageService } from 'primeng/api';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';


@Component({
  selector: 'app-dhhs-staff',
  templateUrl: './dhhs-staff.component.html',
  styleUrls: ['./dhhs-staff.component.scss']
})

export class DhhsStaffComponent implements OnInit {

  breadcrumbs = [];
  mainTabs = [];
  selectedDhhsStaffId: any;
  dhhsForm: FormGroup;
  dhhs: DhhsStaff = new DhhsStaff();
  metaData = [];
  editBtnCntrl = false;
  sIndex: number;
  caseList = [];
  caseHeaders = [];
  dhhsOfficeList = [];
  dhhsOfficeHeaders = [];
  isCaseOpen = false;
  isOfficeOpen = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;


  constructor(public formBuilder: FormBuilder,
    public _person: ClildFormService,
    public _caseTeam: CaseTeamService,
    public _router: Router) { }


  ngOnInit() {
    this.setIndex(0);
    this.defineMainTabs();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/dhhsStaff/", active: '' },
      { label: 'Form', active: 'active' },
    )
    this.formValidation();
    if (this._router.url == '/reports/dhhsStaff/details') {
      this.getDhhsStaffDetails();
    }
  }

  /**
  * Main tabs
  */
  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Section 1', href: '#nav-1' },
      { label: 'Section 2', href: '#nav-2' },
    ]
  }

  /**
   * Get Record detail based on ID
   */
  getDhhsStaffDetails() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.selectedDhhsStaffId = parseInt(localStorage.getItem('DhhsStaffId'));
    const req = { dhhsstaffID: this.selectedDhhsStaffId }
    this._person.getDetailsById(req).then(data => {
      loader.style.display = 'none';
      this.editBtnCntrl = true;
      if (data.responseStatus) {
        this.dhhs = data.person;
        this.dhhsForm.disable();
        this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.person.changedBy) ? data.person.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.person.changedDate) ? moment(data.person.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.person.enteredBy) ? data.person.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.person.enteredDate) ? moment(data.person.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      }
    })

  }

  setIndex(index: number) {
    this.sIndex = index;
  }

  /** Post the staff details */

  save(data) {
    console.log("Before save", data)
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    data.dob ? data.dob = new Date(data.dob).getTime() : '';

    // data.genderID = data.genderID ? data.genderID.genderID: '';
    // data.ethnicityID = data.ethnicityID ? data.ethnicityID.ethnicityID: '';
    // data.tribeID = data.tribeID ? data.tribeID.tribeID: '';
    // data.dhhsofficeID = data.dhhsofficeID ? data.dhhsofficeID.dhhsofficeID: '';

    this.dhhs.entity = 'dhhsstaff';
    this.dhhs = data;

    this.dhhs.ethnicityID = data.ethnicityID ? data.ethnicityID.ethnicityID : null;
    this.dhhs.tribeID = data.tribeID ? data.tribeID.tribeID : null;
    this.dhhs.dhhsofficeID = data.dhhsofficeID ? data.dhhsofficeID.dhhsOfficeID : null;
    this.dhhs.genderID = data.genderID ? data.genderID.genderID : null;
    this.dhhs.ethnicityID = 33; //Contract state 33
    console.log("Dhhs staff class", this.dhhs)
    if (this.dhhsForm.valid) {
      if (this.dhhs.dhhsstaffID) {
        this._person.updateClient(this.dhhs).then(() => {
          loader.style.display = 'none';
          this.editBtnCntrl = true;
          this._router.navigate(['/reports/dhhsStaff/']);
        }).catch(() => {
          this.editBtnCntrl = false;
        })
      } else {
        this._person.saveClient(this.dhhs).then(() => {
          loader.style.display = 'none';
          this.editBtnCntrl = true;
          this._router.navigate(['/reports/dhhsStaff/']);
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

  /** Update the staff details */

  update() {
    this.editBtnCntrl = false;
    this.dhhsForm.enable();
  }

  /**
   * Form validation
   */

  formValidation() {
    this.dhhsForm = this.formBuilder.group({
      "cellPh": '',
      "email": new FormControl('', Validators.compose([Validators.required, Validators.maxLength(75)])),
      "firstName": new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
      "genderID": '',
      "homePh": '',
      "lastName": new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
      "mi": new FormControl('', Validators.compose([Validators.maxLength(2)])),
      "notes": new FormControl('', Validators.compose([Validators.maxLength(225)])),
      "dhhsofficeID": new FormControl('', Validators.compose([Validators.required])),
      "fax": '',
      "pager": '',
      "tribeID": '',
      "ethnicityID": '',
      "ext": '',
      "workPh": '',
      "acronym": '',
      "deceased": '',
      "contractState": new FormControl('OK'),
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
      case 'ethnicity':
        metaDataObj = "ethnicity";
        break;
      case 'dhhsOffice':
        metaDataObj = "dhhsOffice";
        break;
      case 'tribe':
        metaDataObj = 'tribe'
        break;
    }
    if (metaDataObj) {
      metaDataReq = { Object: metaDataObj, value: event.query }
      this._caseTeam.getSearchList(metaDataReq).then(data => {
        this.metaData = data.dropDown;
      })
    }

  }

  edit() {
    this.dhhsForm.enable();
    this.editBtnCntrl = false;
  }

  getCases() {
    /**Get the cases based on the dhhs staff ID */
    /**Assign to  caseList*/
  }

  getDHHSOffice() {
    /** Get the dhhs office list based on the dhhs staff ID */
    /**Assign to dhhsOfficeList */
  }

  resetForm() {
    // resetForm
  }

  discardForm() {
    // discardForm
  }

  formBack() {
    // formBack
  }

}

