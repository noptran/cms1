import { Component, OnInit } from '@angular/core';

import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';

@Component({
  selector: 'app-permanency-versioning',
  templateUrl: './permanency-versioning.component.html',
  styleUrls: ['./permanency-versioning.component.scss']
})
export class PermanencyVersioningComponent implements OnInit {
  isCisDataStored = false;
  formCisArrayValue: any;
  cisFormJson: any;
  breadcrumbs = [];
  dateFormat: string = 'MMM dd yyy hh:mm aa';
  isPermanency = false;

  constructor(public _opencard: OpencardsService, public _client: ClildFormService) { }

  ngOnInit() {
    this.getCisJson();
    this.breadcrumbs = [
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Permanency List', href: "/reintegration/referral/opencard/move-permanency/permanency-form/view", active: '' },
      { label: 'Permanency Form', href: "/reintegration/referral/opencard/move-permanency/permanency-form/detail", active: '' },
      { label: 'Permanency Version', active: 'active' }

    ]
 
  }

  getCisJson() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    
    const data = { 'permanencyEventId': this._client.getId() };
  

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
   
   
    this.isPermanency = true;

    



  }

  discardCourtAppearance() {
    
    this.isPermanency = false;
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
