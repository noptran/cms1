  import { Component, OnInit } from '@angular/core';
  import { MetaDataService } from '../metadata-configuration/meta-data/meta-data.service';
  import { CaseTeamService } from './../case-team/case-team.service'
  import { Router } from '@angular/router';
import { ReferralViewService } from '../referral-view/referral-view.service';
  
  @Component({
    selector: 'app-phase-activity-list',
    templateUrl: './phase-activity-list.component.html',
    styleUrls: ['./phase-activity-list.component.scss']
  })
  export class PhaseActivityListComponent implements OnInit {
  
    constructor(public _router: Router,
                public _CaseTeamService:CaseTeamService,
                public _referralView:ReferralViewService) { }

    referralID:any;
    listOfPahseactivites = [];
    phaseID:any
    listOfPahses:any;


  
    ngOnInit() { 
      this.createCards(); 
    } 
  
   /**
   * @returns navigate to medication new form
   */
  addPhaseActivityDetails() {
    return this._router.navigate(['/reports/phaseActivity/new']);
  }

  /**
   * 
   * @param data navigation details
   * @returns navigate to medication details form
   */
  componentNavigation() {
    // this._medication.setMedicationId(data);
    return this._router.navigate(['/reports/phaseActivity/details']);
  }

  /**
   * Crate cards for view
  */
  createCards() {
    let req;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.referralID = this._referralView.getReferralDetails()[0];
    this.phaseID = this._CaseTeamService.getPhaseID();
      req = { referralID: this.referralID, phaseID: this.phaseID}
      console.log("Phase activity payload",req)
      this._CaseTeamService.getPhaseActivityList(req).then(data => {
        loader.style.display = 'none';
        this.listOfPahseactivites = data.phaseActivity;
      })
  }

  /**
   * @returns back to previous window
   */
  back() {
    return this._router.navigate(['/reports/referral/reintegration/detail']);
  }

  /**
   * @param label string
   * @return image path
   */
  generateIconURL(label: String) {
    return "/assets/letter_pic/" + label.charAt(0).toUpperCase() + ".svg";
  }

  
  
  }
  
  
  
  
  
  
  
   
  
  
  
