import { Component, OnInit } from '@angular/core';
import { MetadataConfig } from './metadata-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metadata-configuration',
  templateUrl: './metadata-configuration.component.html',
  styleUrls: ['./metadata-configuration.component.scss']
})
export class MetadataConfigurationComponent implements OnInit {
  configItems = [];
  meta:MetadataConfig = new MetadataConfig();
  sortField:any;
  sortOrder:any;

  constructor(public _router:Router) { 
    this.configItems = [
      {componentName:'Race',componentURL:'/reports/meta/race',componentDescription:'List of races'},
      {componentName:'Ethnic city',componentURL:'/reports/meta/ethnic_city',componentDescription:'List of Ethic cities'},
      {componentName:'Tribe',componentURL:'/reports/meta/tribe',componentDescription:'List of Ethic tribes'},
      {componentName:'Insurance type',componentURL:'/reports/meta/insurance_type',componentDescription:'List of insurance types'},
      {componentName:'State',componentURL:'/reports/meta/state',componentDescription:'List of states'},
      {componentName:'City',componentURL:'/reports/meta/city',componentDescription:'List of cities'},
      {componentName:'County',componentURL:'/reports/meta/county',componentDescription:'List of counties'},
      {componentName:'Zipcode',componentURL:'/reports/meta/zip',componentDescription:'List of zipcodes'},
      {componentName:'DHHS Office',componentURL:'/reports/meta/dhhs_office',componentDescription:'List of dhhs office'},
      {componentName:'CSO office',componentURL:'/reports/meta/cso_office',componentDescription:'List of cso office'},
      {componentName:'DHS Office',componentURL:'/reports/meta/dhs_office',componentDescription:'List of dhs office'},
      {componentName:'Tenure',componentURL:'/reports/meta/tenure',componentDescription:'List of tenures'},
      {componentName:'Religion',componentURL:'/reports/meta/religion',componentDescription:'List of religions'},
      {componentName:'Language',componentURL:'/reports/meta/language',componentDescription:'List of languages'},
      {componentName:'Education Level',componentURL:'/reports/meta/education_level',componentDescription:'List of education levels'},
      {componentName:'Employment Status',componentURL:'/reports/meta/empolyment_status',componentDescription:'List of employment status'},
      {componentName:'Primary Referral',componentURL:'/reports/meta/primary_referral',componentDescription:'List of primary referrals'},
      {componentName:'Secondary Referral',componentURL:'/reports/meta/secondary_referral',componentDescription:'List of secondary referrals'},
      {componentName:'SFCS Workers',componentURL:'/reports/meta/sfcs_workers',componentDescription:'List of sfcs workers'},


    ]
  }

  ngOnInit() {}

  /**
   * 
   * 
   * @param {any} meta meta class data
   * @returns store the data and close the modal
   * 
   * @memberOf MetadataConfigurationComponent
   */
  addComponent(meta){
    let closeBtn = document.getElementById('closeBtn') as HTMLElement
    console.log("Component data",meta)
    this.configItems.push(meta);
    return closeBtn.click();
  }

  /**
   * 
   * 
   * @param {any} url url for the component
   * @returns navigate to the respective component
   * 
   * @memberOf MetadataConfigurationComponent
   */
  componentNavigation(url){
    console.log("URL",url)
    return this._router.navigateByUrl(url);
  }

}
