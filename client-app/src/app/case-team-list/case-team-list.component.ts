import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../metadata-configuration/meta-data/meta-data.service';
import { CaseTeamService } from './../case-team/case-team.service';
import { Router } from '@angular/router';
import { ReferralViewService } from '../referral-view/referral-view.service';

@Component({
  selector: 'app-case-team-list',
  templateUrl: './case-team-list.component.html',
  styleUrls: ['./case-team-list.component.scss', '../person-master/Client/client-form/client-form.component.scss']
})
export class CaseTeamListComponent implements OnInit {

  constructor(public _router: Router,
              public _CaseTeamService: CaseTeamService,
              public _referralView: ReferralViewService) { }

  referralID: any;
  caseTeamCards = [];

  ngOnInit() { this.createCards(); }


  /**
   * @returns navigate to medication new form
   */
  addCaseTeamDetails() {
    return this._router.navigate(['/reports/caseTeam/new']);
  }

  /**
   *
   * @param data navigation details
   * @returns navigate to medication details form
   */
  componentNavigation() {
    // this._medication.setMedicationId(data);
    return this._router.navigate(['/reports/caseTeam/details']);
  }

  /**
   * Crate cards for view
  */
  createCards() {
    let req;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.referralID = this._referralView.getReferralDetails()[0];
      req = { referralID: this.referralID };
      this._CaseTeamService.getCaseTeamList(req).then(data => {
        loader.style.display = 'none';
        this.caseTeamCards = data.caseTeam;
      });
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
    return '/assets/letter_pic/' + label.charAt(0).toUpperCase() + '.svg';
  }


}









