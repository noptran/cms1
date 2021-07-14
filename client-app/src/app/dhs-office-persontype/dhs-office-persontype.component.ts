import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DhsOffice } from './dhs-office';
import { ClildFormService } from '../child-forms/child-forms.service';
import { CaseTeamService } from '../case-team/case-team.service';
import swal from 'sweetalert2';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dhs-office-persontype',
  templateUrl: './dhs-office-persontype.component.html',
  styleUrls: ['./dhs-office-persontype.component.scss']
})
export class DhsOfficePersontypeComponent implements OnInit {
  breadcrumbs = [];
  dhsOfficeForm: FormGroup;
  dhsOff: DhsOffice = new DhsOffice();
  metaData = [];
  cities = [];
  counties = [];
  zipcodes = [];
  selectedStateID: Number;
  discardTo = "/reports/dhsOffice/view"
  editControll = false;
  opencards = []
  iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';

  constructor(public _router: Router, public _opencard: OpencardsService, public _caseTeam: CaseTeamService, public _client: ClildFormService, public _fb: FormBuilder) { }

  ngOnInit() {
    this.formValidation();
    if (this._router.url.includes('/reports/dhsOffice/detail')) {
      this.getById()
    }
    this.defineOpencards();
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'DHS Office List', href: '/reports/dhsOffice/view', active: '' },
      { label: 'DHS Office', active: 'active' }
    )
  }

  formValidation() {
    this.dhsOfficeForm = this._fb.group({
      "cityID": [null],
      "dhsareaOfficeID": [null],
      "stateID": [null],
      "zipcodeID": [null],
      "address": [null],
      "changedBy": [null],
      "enteredBy": [null],
      "fax": [null],
      "notes": [null],
      "officeName": [null],
      "phone": [null],
      "tollFreeNumber": [null],
      "changedDate": [null],
      "enteredDate": [null],
      "regionalOffice": [null]
    })
    this.dhsOfficeForm.controls['cityID'].disable();
    this.dhsOfficeForm.controls['zipcodeID'].disable();
  }

  filterCities(event: any) {
    this.metaData = [];
    this.cities.filter((item: any) => {
      if (item.city.toLowerCase().indexOf(event.query) !== -1) {
        return this.metaData.push(item);
      }
    })

  }

  getZipcodeFormCity(event: any) {
    this.zipcodes = [];
    const req = { stateID: this.selectedStateID, cityID: event.cityID }
    this._client.getZipcodeFromCityState(req).then((data: any) => {
      if (data.zipcode.length <= 0) {
        this.dhsOff.zipcodeID = "No zipcode found!";
      } else if (data.zipcode.length === 1) {
        this.dhsOff.zipcodeID = data.zipcode[0];
      } else {
        this.zipcodes = data.zipcode;
        this.dhsOfficeForm.controls['zipcodeID'].enable();
      }
    })
  }

  getMetaData(event: any, label: any) {
    let obj: any, req: any;
    switch (label) {
      case 'state':
        obj = 'state';
        break;

    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.dhsOfficeForm.controls['cityID'].enable();
      this.metaData = data.dropDown;
    });
  }

  getAreaOffices(event: any) {
    let req: any;
    req = {
      "beginPagination": 1,
      "endPagination": 100
    }
    this._opencard.getAreaOfficeList(req).then((data: any) => {
      this.dhsOfficeForm.controls['cityID'].enable();
      this.metaData = data.dhsAreaOfficeList;
    });
  }

  getCityFormState(event: any) {
    this.cities = [];
    const req = { stateID: event.stateID }
    this.selectedStateID = event.stateID;
    this._client.getCityFromState(req).then((data: any) => {
      this.cities = data.city;
    })
  }

  filterZipcodes(event: any) {
    this.metaData = [];
    this.zipcodes.filter((item: any) => {
      if (item.zipcode.indexOf(event.query) !== -1) {
        return this.metaData.push(item);
      }
    })
  }

  formAction(source: any) {
    console.log("source is", source);

    (source.stateID) ? source.stateID = source.stateID.stateID : null;
    (source.cityID) ? source.cityID = source.cityID.cityID : null;
    (source.zipcodeID) ? source.zipcodeID = source.zipcodeID.zipcodeID : null;
    (source.dhsareaOfficeID) ? source.dhsareaOfficeID = source.dhsareaOfficeID.dhsAreaOfficeID : null;



    (source.dhsOfficeID) ? this.update(source) : this.save(source);
  }

  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveDhsOffice(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/reports/dhsOffice/view'])
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateDhsOffice(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this._router.navigate(['/reports/dhsOffice/view'])
    })
  }

  getById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { dhsOfficeID: parseInt(localStorage.getItem('personTypeDhsOfficeID')) - this._opencard.getHasKey() }
    let areaInfo, officeInfo;
    this._opencard.getByIdDhsOffice(req).then((data) => {
      loader.style.display = 'none';
      if (data.dHSOffice && data.dHSOffice.length > 0) {
        areaInfo = data.dHSOffice[0];
        officeInfo = data.dHSOffice[1];

        if (officeInfo.dhsOfficeID) {
          this.dhsOff = officeInfo;
          this.dhsOff.stateID = {
            stateID: officeInfo.stateID,
            state: officeInfo.state
          }
          this.dhsOff.cityID = {
            cityID: officeInfo.cityID,
            city: officeInfo.city
          }
          this.dhsOff.zipcodeID = {
            zipcodeID: officeInfo.zipcodeID,
            zipcode: officeInfo.zipcode
          }
        }
        if (areaInfo.dhsAreaOfficeID) {
          this.dhsOff.dhsareaOfficeID = areaInfo
        }
      }

      this.editControll = true;
      this.dhsOfficeForm.disable();
    })
  }

  editForm() {
    this.editControll = false;
    this.dhsOfficeForm.enable();
  }

  defineOpencards() {
    this.opencards = [
      { title: 'DHS Staff', tip: 'DHS Staff', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
    ];
  }

  navigateTo(label: any) {
    let url: any;
    switch (label) {
      case 'DHS Staff':
        url = '/reports/dhsOffice/dhs-staff';
        break;

    }
    this._router.navigate([url])

  }

}
