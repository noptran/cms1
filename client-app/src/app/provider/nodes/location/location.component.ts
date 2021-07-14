import { Component, OnInit } from '@angular/core';
import { Location } from './location';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import 'rxjs/add/operator/pairwise';
import { ProviderService } from '../../provider.service';
import * as moment from 'moment';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  location: Location = new Location();
  isEdit = false;
  breadcrumbs = [];
  metaData = [];
  isNodeOpened = false;
  filteredCities = [];
  filterCounties = [];
  filteredZipCodes = [];
  selectedStateId: any;
  cities = [];
  counties = [];
  zipcodes = [];
  locationForm: FormGroup;
  redirectTo = '/provider/opencard/location/view';
  isAttachmentRequired = false;
  url: any;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _opencard: OpencardsService, public _client: ClildFormService, public _caseTeam: CaseTeamService,
    public _router: Router, public _fb: FormBuilder, public _provider: ProviderService) { }

  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Provider List', href: "/reports/provider/view", active: '' },
      { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Demographics and supports', active: '', href: '/provider/dashboard/demographics-support' },
      { label: 'Location List', active: '', href: '/provider/opencard/location/view' },
      { label: 'Location', active: 'active' }
    )

    if (this._router.url === '/provider/opencard/location/detail') {
      this.isAttachmentRequired = true;
      this.getRecById();
    }

  }

  formValidation() {
    this.locationForm = this._fb.group({
      locationType: [null, Validators.compose([Validators.required])],
      address1: [null, Validators.compose([Validators.required])],
      address2: [null],
      state: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      county: [null, Validators.compose([Validators.required])],
      zipcode: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      fax: [null],
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      locationHeader: [null],
      notes: [null]
    })
  }

  formAction(source: any) {
    if (this.locationForm.valid) {
      !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
      !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
      !isNullOrUndefined(source.cityID) ? source.cityID = source.cityID.cityID : null;
      !isNullOrUndefined(source.stateID) ? source.stateID = source.stateID.stateID : null;
      !isNullOrUndefined(source.countyID) ? source.countyID = source.countyID.countyID : null;
      !isNullOrUndefined(source.zipcodeID) ? source.zipcodeID = source.zipcodeID.zipcodeID : null;

      !isNullOrUndefined(source.providerLocationTypeID) ? source.providerLocationTypeID = source.providerLocationTypeID.providerLocationTypeID : null;
      source.providerID = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
      !isNullOrUndefined(source.providerLocationID) ? this.update(source) : this.save(source);


    } else {
      swal('Info', 'Please fill the mandatoy fields', 'info');
    }

  }

  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.saveLocation(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/provider/opencard/location/view']);
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.updateLocation(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this._router.navigate(['/provider/opencard/location/view']);
    })
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'state':
        obj = 'state';
        break;
      case 'locationType':
        obj = 'providerLocationType';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.metaData = data.dropDown;
    })
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { providerLocationID: this._client.getId() }
    this.req = req;
    this._provider.getLocationById(req).then((data: any) => {
      loader.style.display = 'none';
      !isNullOrUndefined(data.ProviderLocation.beginDate) ? this.location.beginDate = new Date(data.ProviderLocation.beginDate) : null;
      !isNullOrUndefined(data.ProviderLocation.endDate) ? this.location.endDate = new Date(data.ProviderLocation.endDate) : null;

      !isNullOrUndefined(data.ProviderLocation.address1) ? this.location.address1 = data.ProviderLocation.address1 : null;
      !isNullOrUndefined(data.ProviderLocation.address2) ? this.location.address2 = data.ProviderLocation.address2 : null;
      !isNullOrUndefined(data.ProviderLocation.cityID) ? this.location.cityID = data.ProviderLocation.cityID : null;
      !isNullOrUndefined(data.ProviderLocation.countyID) ? this.location.countyID = data.ProviderLocation.countyID : null;
      !isNullOrUndefined(data.ProviderLocation.fax) ? this.location.fax = data.ProviderLocation.fax : null;
      !isNullOrUndefined(data.ProviderLocation.locationHeader) ? this.location.locationHeader = data.ProviderLocation.locationHeader : null;
      !isNullOrUndefined(data.ProviderLocation.notes) ? this.location.notes = data.ProviderLocation.notes : null;
      !isNullOrUndefined(data.ProviderLocation.phone) ? this.location.phone = data.ProviderLocation.phone : null;
      !isNullOrUndefined(data.ProviderLocation.providerID) ? this.location.providerID = data.ProviderLocation.providerID.providerID : null;
      !isNullOrUndefined(data.ProviderLocation.providerLocationTypeID) ? this.location.providerLocationTypeID = data.ProviderLocation.providerLocationTypeID : null;
      !isNullOrUndefined(data.ProviderLocation.stateID) ? this.location.stateID = data.ProviderLocation.stateID : null;
      !isNullOrUndefined(data.ProviderLocation.zipcodeID) ? this.location.zipcodeID = data.ProviderLocation.zipcodeID : null;
      !isNullOrUndefined(data.ProviderLocation.providerLocationID) ? this.location.providerLocationID = data.ProviderLocation.providerLocationID : null;


      this.locationForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.ProviderLocation.changedBy) ? data.ProviderLocation.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.ProviderLocation.changedDate) ? moment(data.ProviderLocation.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.ProviderLocation.enteredBy) ? data.ProviderLocation.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.ProviderLocation.enteredDate) ? moment(data.ProviderLocation.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.isEdit = true;
    this.locationForm.enable();
  }

  getCityFormState(event: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { stateID: event.stateID }
    this.selectedStateId = event.stateID;
    this._client.getCityFromState(req).then((data: any) => {
      loader.style.display = 'none';
      this.cities = data.city;
    })
  }

  getZipcodeCountyFromCity(event: any) {
    let req = { stateID: this.selectedStateId, cityID: event.cityID }
    this._client.getZipcodeFromCityState(req).then((data: any) => {
      if (data.zipcode.length == 0) { this.location.zipcodeID = 'No Zipcode found!' }
      if (data.county.length == 0) { this.location.countyID = 'No County found!' }

      if (data.zipcode.length > 1) { this.zipcodes = data.zipcode }
      else { this.location.zipcodeID = data.zipcode[0] }

      if (data.county.length > 1) { this.counties = data.county }
      else { this.location.countyID = data.county[0] }
    })
  }

  filteringCitites(event: any) {
    this.filteredCities = [];
    this.cities.filter((item: any) => {
      if (item.city.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredCities.push(item);
      }
    })
  }

  filteringCounties(event: any) {
    this.filterCounties = [];
    this.counties.filter((item: any) => {
      if (item.countyName.toLowerCase().indexOf(event.query) !== -1) {
        this.filterCounties.push(item);
      }
    })
  }


  filteringZipcodes(event: any) {
    this.filteredZipCodes = [];
    this.zipcodes.filter((item: any) => {
      if (item.zipcode.indexOf(event.query) !== -1) {
        this.filteredZipCodes.push(item);
      }
    })
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/provider/opencard/location/detail') {
      this.url = '/reports/attachment-document/providers/location';
    }
    return this._router.navigate([this.url])
  }


}
