import { Component, OnInit } from '@angular/core';

import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';

@Component({
  selector: 'app-court-appearance-versioning',
  templateUrl: './court-appearance-versioning.component.html',
  styleUrls: ['./court-appearance-versioning.component.scss']
})
export class CourtAppearanceVersioningComponent implements OnInit {
  isCisDataStored = false;
  formCisArrayValue: any;
  cisFormJson: any;
  isCourtAppearanceLog = false;
  breadcrumbs=[];
  dateFormat: string = 'MMM dd yyy hh:mm aa';

  constructor(public _opencard: OpencardsService, public _client: ClildFormService) { }

  ngOnInit() {
    this.getCisJson();
    this.breadcrumbs = [
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reports/referral/family-preservation/detail", active: '' },
      { label: 'Court Order List', href: "/reports/referral/family-preservation/court-order/view", active: '' },
      { label: 'Court Order Form', href: "/reintegration/referral/opencard/court-order/detail", active: '' },
      { label: 'Court Order Version', active: 'active' }

    ]
  }

  getCisJson() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    console.log("this._client.getId() is", this._client.getId());
    const data = { 'courtId': this._client.getId() };
    this._opencard.getBehavioralCisJson(data)
      .then(async (data) => {
       
        this.cisFormJson = data;
        // this.formCisArrayValue = data.cisPdfJson;
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
    this.isCourtAppearanceLog = true;




  }

  discardCourtAppearance() {
    this.isCourtAppearanceLog = false;
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
