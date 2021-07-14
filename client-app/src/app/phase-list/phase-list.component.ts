import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../metadata-configuration/meta-data/meta-data.service';
import { CaseTeamService } from './../case-team/case-team.service'
import { Router } from '@angular/router';
import { ReferralViewService } from '../referral-view/referral-view.service';

@Component({
  selector: 'app-phase-list',
  templateUrl: './phase-list.component.html',
  styleUrls: ['./phase-list.component.scss']
})
export class PhaseListComponent implements OnInit {

  constructor(public _router: Router,
              public _CaseTeamService:CaseTeamService,
              public _referralView:ReferralViewService) { }

  cityList = [];
  rowData = [];
  columnDef = [];
  defaultColDef:any;
  initial = 1;
  end = 100;
  totalCount;
  dataList=[];

  listOfPahses = [];
  referralID:any

  ngOnInit() { this.createCards(); } 

  
  /**
   * @returns navigate to medication new form
   */
  addPhaseDetails() {
    return this._router.navigate(['/reports/phase/new']);
  }

  /**
   * 
   * @param data navigation details
   * @returns navigate to medication details form
   */
  componentNavigation(data) {
    console.log("Navigation data",data)
    this._CaseTeamService.setPhaseID(data)
    return this._router.navigate(['/reports/phase/details']);
  }

  /**
   * Crate cards for view
  */
  createCards() {
    let req;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.referralID = this._referralView.getReferralDetails()[0];
      req = { referralId: this.referralID }
      this._CaseTeamService.getPhaseList(req).then(data => {
        loader.style.display = 'none';
        this.listOfPahses = data.phase;
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







 


