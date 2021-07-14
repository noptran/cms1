import { Component, OnInit } from '@angular/core';

import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';

@Component({
  selector: 'app-adoptive-versioning',
  templateUrl: './adoptive-versioning.component.html',
  styleUrls: ['./adoptive-versioning.component.scss']
})
export class AdoptiveVersioningComponent implements OnInit {
  isCisDataStored = false;
  formCisArrayValue: any;
  cisFormJson: any;
  isAdoptionInquiry = false;
  breadcrumbs = [];
  dateFormat: string = 'MMM dd yyy hh:mm aa';

  constructor(public _opencard: OpencardsService, public _client: ClildFormService) { }

  ngOnInit() {
    this.getCisJson();

    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Adoption Menu', href: '/reintegration/referral/opencard/adoption/dashboard', active: '' },
      { label: 'Adoption List', active: '', href: '/reintegration/referral/opencard/adoption/view' },
      { label: 'Adoption', href: '/reintegration/referral/opencard/adoption/detail', active: '' },
      { label: 'Adoption Version', active: 'active' }
    );
  }

  getCisJson() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
   
    const data = { 'adoptionId': this._client.getId() };
   

    this._opencard.getBehavioralCisJson(data)
      .then(async (data) => {
       
        this.cisFormJson = data;
        this.formCisArrayValue = data.cmsCisPdfDoc;
        this.isCisDataStored = true;
        loader.style.display = 'none';
       
      })
   

  }

  cisVersionBasedView(version) {
    let loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';


    this._opencard.setCisJsonVersion(version);


    loader.style.display = 'none';
    this.isAdoptionInquiry = true;

  



  }

  discardCourtAppearance() {
    this.isAdoptionInquiry = false;
  }

  getFormData(event: any) {
  
    this.getCisJson();
  

  }

  generateVersion(versionStr) {
    let versionTemp=versionStr+10;
    let version = versionTemp.toString();
    return (version.charAt(0) + '.' + version.charAt(1));
  }

}
