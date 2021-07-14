  import { Component, OnInit } from '@angular/core';
  import { MetaDataService } from '../metadata-configuration/meta-data/meta-data.service';
  import { CaseTeamService } from './../case-team/case-team.service';
  import { Router } from '@angular/router';
import { ReferralViewService } from '../referral-view/referral-view.service';

  @Component({
    selector: 'app-court-case-list',
    templateUrl: './court-case-list.component.html',
    styleUrls: ['./court-case-list.component.scss']
  })
  export class CourtCaseListComponent implements OnInit {

    constructor(public router: Router,
                public _CaseTeamService: CaseTeamService,
                public _referralView: ReferralViewService) { }


    courtCards = [];
    clientId: any;
    clientName: any;
    paginator: any;

    medicalCards: any;

    ngOnInit() { this.createCards(); }


    /**
     * Add new court cases
     */
    addCases() {
      return this.router.navigate(['/reports/court/case/new']);
    }

    /**
     * back button action
     */
    back() {
      return this.router.navigate(['/reports/client/details']);
    }

    /**
     * Generate icon based on the field
     * @param label case type
     * @returns image path
     */
    generateIconURL(label: string) {
      return '/assets/letter_pic/' + label.charAt(0).toUpperCase() + '.svg';
     }


    /**
     * Action for the card and list
     */
    componentNavigation(courtCaseId: any) {
      console.log('Court case id', courtCaseId);
    }

    /**
     * Create a courtcase cards
     */
    createCards() {
      let req;
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      this._referralView.clientDetails().then(data => {
        this.clientId = data[0].clientId;
        this.clientName = data[0].clientName;
        req = { clientID: this.clientId };
        this._CaseTeamService.getCourtCaseList(req).then(data => {
          loader.style.display = 'none';
          this.courtCards = data.courtCase;
        });
      });
    }


  }











