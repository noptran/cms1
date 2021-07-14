import { Component, OnInit } from '@angular/core';
import { ProviderSponser } from './provider-sponser';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import { CaseTeamService } from '../case-team/case-team.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-provider-sponser',
  templateUrl: './provider-sponser.component.html',
  styleUrls: ['./provider-sponser.component.scss']
})
export class ProviderSponserComponent implements OnInit {
  ps: ProviderSponser = new ProviderSponser();
  psForm: FormGroup;
  isEdit = false;
  breadcrumbs = [];
  metaData = [];
  cities = [];
  counties = [];
  zipcodes = [];
  selectedStateID: Number;
  isOpenCardsVisible = false;
  providerSponsorOpencards = [];
  iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';
  discardTo = '/reports/provider-sponser/view';
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _opencard: OpencardsService, public _router: Router, public _fb: FormBuilder,
    public _caseTeam: CaseTeamService, public _client: ClildFormService) { }

  ngOnInit() {
    this.formValidation();
    this.defineOpencards();
    if (this._router.url == '/reports/provider-sponser/detail') {
      this.isOpenCardsVisible = true;
      this.getById();
    }
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider Sponser List', href: '/reports/provider-sponser/view', active: '' },
      { label: 'Provider Sponser', active: 'active' }
    )
  }

  formValidation() {
    this.psForm = this._fb.group({
      sponsorName: [null],
      alias: [null],
      contract_StateID: [null],
      phone: [null],
      fax: [null],
      medicaidNo: [null],
      address1: [null],
      address2: [null],
      taxNo: [null],
      notes: [null],
      isSFCSSponsor: [null],
      cityID: [null],
      stateID: [null],
      zipcodeID: [null],
      isTheLoop: [null],
      sponsorID: [null]
    })
    this.psForm.controls['cityID'].disable();
    this.psForm.controls['zipcodeID'].disable();
  }

  formAction(source: any) {
    console.log("soucrce is", source);

    !isNullOrUndefined(source.stateID) ? source.stateID = source.stateID.stateID : null;
    !isNullOrUndefined(source.cityID) ? source.cityID = source.cityID.cityID : null;
    !isNullOrUndefined(source.zipcodeID) ? source.zipcodeID = source.zipcodeID.zipcodeID : null;
    !isNullOrUndefined(source.contract_StateID) ? source.contract_StateID = source.contract_StateID.stateID : null;
    !isNullOrUndefined(source.sponsorID) ? this.update(source) : this.save(source);
  }

  save(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.saveProviderSponsor(source).then((data) => {
      swal('Success', 'Record has been saved!', 'success');
      loader.style.display = 'none';
      this._router.navigate(['/reports/provider-sponser/view']);
    });
  }

  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.saveProviderSponsor(source).then((data) => {
      swal('Success', 'Record has been updated!', 'success');
      loader.style.display = 'none';
      this._router.navigate(['/reports/provider-sponser/view']);
    });
  }

  getById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let sponsorID = this._client.getId();
    let req = { sponsorID: sponsorID };
    this._opencard.getProviderSponsorById(req).then((data) => {

      this.ps['contract_StateID'] = data.sponsor.contract_StateID;
      this.ps['stateID'] = data.sponsor.stateID;
      this.ps['cityID'] = data.sponsor.cityID;
      this.ps['zipcodeID'] = data.sponsor.zipcodeID;
      this.ps['sponsorName'] = data.sponsor.sponsorName;

      this.ps['alias'] = data.sponsor.alias;
      this.ps['phone'] = data.sponsor.phone;
      this.ps['fax'] = data.sponsor.fax;
      this.ps['medicaidNo'] = data.sponsor.medicaidNo;
      this.ps['address1'] = data.sponsor.address1;

      this.ps['address2'] = data.sponsor.address2;
      this.ps['taxNo'] = data.sponsor.taxNo;
      this.ps['notes'] = data.sponsor.notes;
      this.ps['isSFCSSponsor'] = data.sponsor.isSFCSSponsor;
      this.ps['isTheLoop'] = data.sponsor.isTheLoop;
      this.ps['sponsorID'] = data.sponsor.sponsorID;

      loader.style.display = 'none';
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.sponsor.changedBy) ? data.sponsor.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.sponsor.changedDate) ? moment(data.sponsor.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.sponsor.enteredBy) ? data.sponsor.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.sponsor.enteredDate) ? moment(data.sponsor.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


    })
  }

  getMetaData(event: any, label: any) {
    let obj: any, req: any;
    switch (label) {
      case 'conST':
        obj = 'contractState';
        break;
      case 'state':
        obj = 'state';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.psForm.controls['cityID'].enable();
      this.metaData = data.dropDown;
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

  getZipcodeFormCity(event: any) {
    this.zipcodes = [];
    const req = { stateID: this.selectedStateID, cityID: event.cityID }
    this._client.getZipcodeFromCityState(req).then((data: any) => {
      if (data.zipcode.length <= 0) {
        this.ps.zipcodeID = "No zipcode found!";
      } else if (data.zipcode.length === 1) {
        this.ps.zipcodeID = data.zipcode[0];
      } else {
        this.zipcodes = data.zipcode;
        this.psForm.controls['zipcodeID'].enable();
      }
    })
  }

  filterCities(event: any) {
    this.metaData = [];
    this.cities.filter((item: any) => {
      if (item.city.toLowerCase().indexOf(event.query) !== -1) {
        return this.metaData.push(item);
      }
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

  editForm() {

  }

  defineOpencards() {
    this.providerSponsorOpencards = [
      { title: 'Cases', tip: 'Cases', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Placement Authorizations', tip: 'Placement Authorizations', navigation: '', icon: this.iconurl + 'case activity.svg' },
      { title: 'Service Claims', tip: 'Service Claims', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'SFCS Contract', tip: 'SFCS Contract', navigation: '', icon: this.iconurl + 'case activity.svg' }
    ];
  }

  navigateTo(label: any) {
    let url: any;
    switch (label) {
      case 'Cases':
        url = '/reports/provider-sponser/cases';
        break;

      case 'Placement Authorizations':
        url = '/reports/provider-sponser/placement-authorization/view';
        break;

      case 'Service Claims':
        url = '/reports/provider-sponser/service-claims';
        break;

      case 'SFCS Contract':
        url = '/reports/provider-sponser/sfcs-contract/view';
        break;
    }

    return this._router.navigate([url])


  }

}
