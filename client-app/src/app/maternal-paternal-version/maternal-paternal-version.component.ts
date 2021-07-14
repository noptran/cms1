import { Component, OnInit } from '@angular/core';

import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';

@Component({
  selector: 'app-maternal-paternal-version',
  templateUrl: './maternal-paternal-version.component.html',
  styleUrls: ['./maternal-paternal-version.component.scss']
})
export class MaternalPaternalVersionComponent implements OnInit {
  isCisDataStored = false;
  formCisArrayValue: any;
  cisFormJson: any;
  isMatPaternal = false;
  breadcrumbs = [];
  dateFormat: string = 'MMM dd yyy hh:mm aa';
  isInitialFamily = false;
  assessmentTypeName = "";

  constructor(public _opencard: OpencardsService, public _client: ClildFormService) { }

  ngOnInit() {
    this.getCisJson();
    this.getAssessmentType();

    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reports/referral/family-preservation/detail", active: '' },
      { label: 'Assessment List', href: "/reintegration/referral/opencard/assessments/view" },
      { label: 'Assessment', href: '/reintegration/referral/opencard/assessments/detail', active: '' },
      { label: 'Initial Family', href: '/reintegration/referral/opencard/assessments/attachment', active: 'active' }


    );
  }

  getCisJson() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    
    const data = { 'assessmentId': this._client.getId() };
    

    this._opencard.getBehavioralCisJson(data)
      .then(async (data) => {
      
        this.cisFormJson = data;
        // this.formCisArrayValue = data.cisPdfJson;
        this.formCisArrayValue = data.cmsCisPdfDoc;
        this.isCisDataStored = true;
        this.getAssessmentType();
        loader.style.display = 'none';
     
      })
  

  }

  cisVersionBasedView(version) {
    let loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
  

    this._opencard.setCisJsonVersion(version);


    loader.style.display = 'none';
  

    switch (this.assessmentTypeName) {

      case 'Maternal & Paternal Relatives Initially Assessed':
        this.isMatPaternal = true;
        loader.style.display = 'none';
        break;

      case 'Initial Family/Team Meeting Held':
        this.isInitialFamily = true;
        loader.style.display = 'none';
        break;

      default:

        loader.style.display = 'none';
    }
 



  }

  discardCourtAppearance() {
    this.isMatPaternal = false;
    this.isInitialFamily = false;
  }

  getFormData(event: any) {
    
    this.getCisJson();
    

  }

  async getAssessmentType() {
    const data = { 'assessmentID': this._client.getId() };
    await this._opencard.getAssessmentRec(data)
      .then(async (data) => {
        
        this.assessmentTypeName = data.assessment.assessmentTypeID.assessmentType;
        
      })


  }

  generateVersion(versionStr) {
    let versionTemp=versionStr+10;
    let version = versionTemp.toString();
    return (version.charAt(0) + '.' + version.charAt(1));
  }

}
