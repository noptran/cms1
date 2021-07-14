import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReferralViewService } from '../referral-view/referral-view.service';

@Component({
  selector: 'app-client-documents',
  templateUrl: './client-documents.component.html',
  styleUrls: ['./client-documents.component.scss']
})
export class ClientDocumentsComponent implements OnInit {

  documents = [];
  clientName: any;
  clientId: any;
  sortField: any;
  sortOrder: any;
  quickMenu = 'client';
  constructor(public _router: Router, public _client: ReferralViewService) { }

  ngOnInit() {
    this.createCards();
   }

  /**
   * Create the cards for client documents
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
   *@returns client client document new form
   */
   addClientStrengthDetails() {
     return this._router.navigate(['/reports/preventative/measurements/new']);
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
   * @returns navigate to client documents form
   */
  componentNavigation() {
    // this._clientStrenth.setClientStrengthId(data);
    return this._router.navigate(['/reports/preventative/measurements/details']);
  }

}
