import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReferralViewService } from '../referral-view/referral-view.service';

@Component({
  selector: 'app-client-incident',
  templateUrl: './client-incident.component.html',
  styleUrls: ['./client-incident.component.scss']
})
export class ClientIncidentComponent implements OnInit {

  incidents = [];
  clientName: any;
  clientId: any;
  sortField: any;
  sortOrder: any;

  constructor(public _router: Router, public _client: ReferralViewService) { }

  ngOnInit() {
    this.createCards();
  }

  /**
   * Create the cards for incident
   */
  createCards() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._client.clientDetails().then(data => {
      this.clientId = data[0].clientId;
      this.clientName = data[0].clientName;
      // req = { clientID: this.clientId }
      // this._clientStrenth.getListOfClientStrength(req).then(strength => {
        loader.style.display = 'none';
      //   this.clientStrengths = strength.clientStrength;
      // })
    });
    }

  /**
   * @returns window history back
   */
   back() {
     return this._router.navigate(['/reports/client/details']);
   }

  /**
   *@returns client incident new form
   */
   addClientStrengthDetails() {
     return this._router.navigate(['/reports/client/incident/new']);
   }

 /**
   * @param label string
   * @return image path
   */
  generateIconURL(label: String) {
    return '/assets/letter_pic/' + label.charAt(0).toUpperCase() + '.svg';
  }

  /**
   *
   * @param data navigation details
   * @returns navigate to liability details form
   */
  componentNavigation() {
    // this._clientStrenth.setClientStrengthId(data);
    return this._router.navigate(['/reports/client/incident/details']);
  }








}
