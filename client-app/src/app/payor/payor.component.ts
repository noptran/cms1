import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Payor } from './payor';
import { CaseTeamService } from '../case-team/case-team.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-payor',
  templateUrl: './payor.component.html',
  styleUrls: ['./payor.component.scss']
})
export class PayorComponent implements OnInit {
  payorForm: FormGroup;
  payor: Payor = new Payor();
  metaData = [];
  cities = [];
  zipcodes = [];
  selectedStateId: number;
  isEdit = false;
  breadcrumbs = [];
  discardTo = '/reports/payor/view';
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;


  constructor(public _fb: FormBuilder, public _caseTeam: CaseTeamService, public _client: ClildFormService, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Payor List', href: "/reports/payor/view", active: '' },
      { label: 'Payor', active: 'active' }
    )
    if (this._router.url == '/reports/payor/detail') { this.getRecById() }
  }

  formValidation() {
    this.payorForm = this._fb.group({
      payorName: [null, Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z \b]+$')])],
      acronym: [null],
      alias: [null, Validators.compose([Validators.required])],
      address1: [null, Validators.compose([Validators.required])],  
      address2: [null],
      cityID: [null, Validators.compose([Validators.required])],
      stateID: [null],
      zipcodeID: [null],
      contract_StateID: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      fax: [null],
      emergencyPhone: [null]
    })
    this.payorForm.controls['zipcodeID'].disable();
    this.payorForm.controls['cityID'].disable();
  }

  getMetaData(event: any, label: any) {
    let obj: any, req: any;
    switch (label) {
      case 'state':
        this.payor.cityID = ''
        this.payor.zipcodeID = '';
        obj = 'state';
        break;
      case 'cont_state':
        obj = 'contractState';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data) => {
      this.metaData = data.dropDown
    })
  }

  generateCity(event: any) {
    this.cities = [];
    this.selectedStateId = event.stateID;
    let req = { stateID: event.stateID }
    this._client.getCityFromState(req).then((data) => {
      this.cities = data.city;
      this.payorForm.controls['cityID'].enable();
    })
  }

  generateZipcode(event: any) {
    let req = { stateID: this.selectedStateId, cityID: event.cityID }
    this._client.getZipcodeFromCityState(req).then((data) => {
      if (data.zipcode.length == 0) { this.payor.zipcodeID = 'No zipcode found!' }
      if (data.zipcode.length !== 1) { this.metaData = data.zipcode; this.payorForm.controls['zipcodeID'].enable() }
      else { this.payor.zipcodeID = data.zipcode[0]; }
    })
  }

  filteredCity(event: any) {
    this.metaData = [];
    this.cities.filter((item) => {
      if (item.city.toLowerCase().indexOf(event.query) !== -1) {
        this.metaData.push(item)
      }
    })
  }

  formActions(source: any) {
    if (this.payorForm.valid) {
      source.cityID = !isNullOrUndefined(source.cityID) ? source.cityID.cityID : null;
      source.contract_StateID = !isNullOrUndefined(source.contract_StateID) ? source.contract_StateID.stateID : null;
      source.stateID = !isNullOrUndefined(source.stateID) ? source.stateID.stateID : null;
      source.zipcodeID = !isNullOrUndefined(source.zipcodeID) ? source.zipcodeID.zipcodeID : null;
      !isNullOrUndefined(source.payorID) ? this.update(source) : this.save(source);
    } else {
      swal('Warning', 'Mandatory fields are missing', 'info');
    }
  }


  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.savePayor(source).then((data) => {
      loader.style.display = 'none';
      swal('Save', 'Payor created!', 'success');
      this._router.navigate(['/reports/payor/view'])
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.savePayor(source).then((data) => {
      loader.style.display = 'none';
      swal('Save', 'Payor updated!', 'success');
      this._router.navigate(['/reports/payor/view'])
    })
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { payorID: this._client.getId() }
    this._opencard.getByRecIdPayor(req).then((data) => {
      loader.style.display = 'none';
      this.payor = data.Payor;
      this.isEdit = true;
      this.payorForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.Payor.changedBy) ? data.Payor.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.Payor.changedDate) ? moment(data.Payor.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.Payor.enteredBy) ? data.Payor.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.Payor.enteredDate) ? moment(data.Payor.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.payorForm.enable();
    this.isEdit = false
  }


}
