import { Component, OnInit } from '@angular/core';
import { CaseTeamService } from './../case-team/case-team.service'
import { Router } from '@angular/router';
import { ReferralViewService } from './../referral-view/referral-view.service';

@Component({
  selector: 'app-home-county-list',
  templateUrl: './home-county-list.component.html',
  styleUrls: ['./home-county-list.component.scss']
})
export class HomeCountyListComponent implements OnInit {

  constructor(public _router: Router,
    public _referralViewService: ReferralViewService,
    public _CaseTeamService: CaseTeamService) { }

  homeCountyCards = [];
  emptyMessage:any;
  title = 'Home County'

  ngOnInit() { this.createCards(); }

  /**
 * @returns navigate to medication new form
 */
  addCountyDetails() {
    return this._router.navigate(['/reports/home_county/new']);
  }

  /**
   * 
   * @param data navigation details
   * @returns navigate to medication details form
   */
  componentNavigation(data) {
    this._CaseTeamService.storeId(data);
    return this._router.navigate(['//reports/home_county/details']);
  }

  /**
   * Crate cards for view
  */
  createCards() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = {
      entity: "homeCounty",
      referralID: this._referralViewService.getReferralDetails()[0]
    };
    this._CaseTeamService.getHomeCountyList(req).then(data => {
      loader.style.display = 'none';
      this.homeCountyCards = data.homeCounty
    })
  }

  /**
   * @returns back to previous window
   */
  back() {
    return window.history.back();
  }

  /**
   * @param label string
   * @return image path
   */
  generateIconURL(label: String) {
    return "/assets/letter_pic/" + label.charAt(0).toUpperCase() + ".svg";
  }

}









