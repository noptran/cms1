import { Component, OnInit } from '@angular/core';
import { CaseTeamService } from './../case-team/case-team.service'
import { Router } from '@angular/router';
import { ReferralViewService } from './../referral-view/referral-view.service';


@Component({
  selector: 'app-sfcs-officer-list',
  templateUrl: './sfcs-officer-list.component.html',
  styleUrls: ['./sfcs-officer-list.component.scss']
})
export class SfcsOfficerListComponent implements OnInit {

  constructor(
    public _referralViewService: ReferralViewService,
    public _CaseTeamService: CaseTeamService,
    public _router:Router) { }

  officeCards = [];

  ngOnInit() { this. createCards(); }

 /**
   * @returns back to previous window
   */
  back() {
    return window.history.back();
  }

  /**
   * @returns navigate new form view.
   */
  addSfcsOfficeDetails() {
    return this._router.navigate(['/reports/sfcsOffice/new']);
  }

  sortField(){

  }

  sortOrder(){
    
  }

  /**
   * @param label string
   * @return image path
   */
  generateIconURL(label: String) {
    return "/assets/letter_pic/" + label.charAt(0).toUpperCase() + ".svg";
  }

  /**
 * 
 * @param data navigation details
 * @returns navigate to medication details form
 */
  componentNavigation(data) {
    this._CaseTeamService.storeId(data);
    return this._router.navigateByUrl('/reports/sfcsOffice/details');
  }

  /**
   * Crate cards for view
  */
  createCards() {
    let req;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    req = { referralID: this._referralViewService.getReferralDetails()[0] };
    this._CaseTeamService.getSfcsOfficerList(req).then(data => {
      loader.style.display = 'none';
      this.officeCards = data.sfcsOfficeActivity;
    })
  }



  
}











