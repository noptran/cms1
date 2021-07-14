import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientReferralEventService } from '../client-referral-event-form/client-referral-event.service';
import { ReferralViewService } from '../referral-view/referral-view.service';

@Component({
  selector: 'app-client-referral-event',
  templateUrl: './client-referral-event.component.html',
  styleUrls: ['./client-referral-event.component.scss']
})
export class ClientReferralEventComponent implements OnInit {

  constructor(public _router: Router, public _referralEvent: ClientReferralEventService, public _refrralView: ReferralViewService) { }

  referralId: any;
  referralEventCards = [];
  paginator: any;
  title = 'Referral Event';

  ngOnInit() {
    this.createCards();
   }

  /**
   * @returns back to previous window
   */
  back() {
    return this._router.navigate(['/reports/client/test']);
  }

  /**
   * @returns navigate new form view.
   */
  addReferralEvents() {
    return this._router.navigate(['/reports/referral_event/new']);
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
 * @returns navigate to medication details form
 */
  componentNavigation(data) {
    this._referralEvent.setReferralEventId(data);
    return this._router.navigate(['/reports/referral_event/details']);
  }

  /**
   * Crate cards for view
  */
  createCards() {
    let req;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.referralId = this._refrralView.getReferralDetails()[0];
    req = { referralID: this.referralId };
      this._referralEvent.getListOfReferralEvents(req).then(event => {
        loader.style.display = 'none';
        this.referralEventCards = event.referralEvent;

    });
  }

}
