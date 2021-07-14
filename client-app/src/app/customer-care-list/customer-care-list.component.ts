import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClildFormService } from '../child-forms/child-forms.service';
import { Router } from '@angular/router';
import { CaseTeamService } from '../case-team/case-team.service';
import { MessageService } from 'primeng/api';
import swal from 'sweetalert2';
import { Customer } from './customer';


@Component({
  selector: 'app-customer-care-list',
  templateUrl: './customer-care-list.component.html',
  styleUrls: ['./customer-care-list.component.scss']
})
export class CustomerCareListComponent implements OnInit {
  title = 'Customer Care Person'
  status = 'active';
  formStatus = 'draft';
  breadcrumbs = [];
  metaData = [];
  mainTabs = [];
  formDisableCntrl = false;
  sIndex: number = null;
  editBtnCntrl = false;
  dcfForm: FormGroup;
  dcf: Customer = new Customer();
  section1 = ['firstName', 'lastName', "acronym", 'mi', 'suffix', 'ssn', "conST", 'genderID', 'deceased', 'ethnicityID', 'tribeID', 'email'];
  section2 = ['workPh', 'cellPh', 'fax', "pager", 'ext', 'address', 'cityID', 'stateID'];
  invalid = [];
  selectedCustomerID: any;
  subtitle: any;
  opencards = [];
  iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';

  constructor(public messageService: MessageService, public _person: ClildFormService, public _router: Router, public _fb: FormBuilder, public _caseTeam: CaseTeamService) { }

  ngOnInit() {
    this.defineOpencards();
    this.formValidation();
    this.defineMainTabs();
    this.setIndex(0);
    if (this._router.url == '/reports/customer-care/person/detail') {
      this.getDCFDetails();
    }
    this.breadcrumbs = [
      { label: 'List', href: "/reports/customer-care/list", active: '' },
      { label: 'Form', active: 'active' },
    ]
  }

  formValidation() {
    this.dcfForm = this._fb.group({
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
      'ext': ''

    })
  }

  save(data) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';

    data.entity = 'CustomerCarePerson';
    data.genderID = data.genderID ? data.genderID.genderID : null;
    data.tribeID = data.tribeID ? data.tribeID.tribeID : null;
    data.ethnicityID = data.ethnicityID ? data.ethnicityID.ethnicityID : null;
    data.srsofficeID = data.srsofficeID ? data.srsofficeID.srsofficeID : null;

    if (this.dcf.custCarePersonID) {
      this._person.updateClient(this.dcf).then((data) => {
        loader.style.display = 'none';
        this.dcf = data.person;
        swal('Updated!', 'Details are updated', 'success');
        this._router.navigate(['/reports/customer-care/list']);
      }).catch(() => {
        this.editBtnCntrl = false;
      })
    } else {
      this._person.saveClient(this.dcf).then(() => {
        loader.style.display = 'none';
        this.editBtnCntrl = true;
        swal('Saved!', 'Details are updated', 'success');
        this._router.navigate(['/reports/customer-care/list']);
      }).catch(() => {
        this.editBtnCntrl = false;
      })
    }

  }

  update() {
    this.editBtnCntrl = false;
    this.dcfForm.enable();

  }

  discard() {
    return this._router.navigate(['/reports/customer-care/list'])
  }

  getMetaData(event, label) {
    let metaDataObj, metaDataReq
    switch (label) {
      case 'gender':
        metaDataObj = "gender";
        break;
      case 'race':
        metaDataObj = "race";
        break;
      case 'tribe':
        metaDataObj = "tribe";
        break;
      case 'ethnicity':
        metaDataObj = "ethnicity";
        break;
      case 'state':
        this.dcfForm.controls['cityID'].disable();
        this.dcfForm.controls['countyID'].disable();
        this.dcfForm.controls['zipcodeID'].disable();
        metaDataObj = 'state';
    }
    if (metaDataObj) {
      metaDataReq = { Object: metaDataObj, value: event.query }
      this._caseTeam.getSearchList(metaDataReq).then(data => {
        this.metaData = data.dropDown;
      })
    }
  }

  defineMainTabs() {
    return this.mainTabs = [
      { label: 'Section 1', href: '#nav-sec1' },
      { label: 'Section 2', href: '#nav-sec2' }]
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
    let controls = this.dcfForm.controls;
    for (let name in controls) {
      if (section.indexOf(name) !== -1) {
        if (controls[name].invalid) {
          this.invalid.push(name);
        }
      }
    }
    return this.invalid;
  }

  getDCFDetails() {
    this.editBtnCntrl = true;
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.selectedCustomerID = this._person.getId();
    const req = { custCarePersonID: this.selectedCustomerID }
    this._person.getDetailsById(req).then(data => {
      this.dcfForm.disable();
      loader.style.display = 'none';
      this.dcf = data.person;
      this.subtitle = this.dcf.firstName + ' ' + this.dcf.lastName;
    })
  }

  defineOpencards() {
    this.opencards = [
      { title: 'Customer Care Reports', tip: 'Customer Care Reports', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Customer Care Report Activities', tip: 'Customer Care Report Activities', navigation: '', icon: this.iconurl + 'assessment icon.svg' }
    ];
  }

  navigateTo(label: any) {
    let url: any;
    switch (label) {
      case 'Customer Care Reports':
        url = '/reports/customer-care/view';
        break;

    }
    this._router.navigate([url])

  }



}
