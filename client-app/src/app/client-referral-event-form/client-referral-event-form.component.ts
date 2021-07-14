import { Component, OnInit } from '@angular/core';
import { ClientReferralEvent } from './client-referral-event';
import { ReferralViewService } from '../referral-view/referral-view.service';
import { ClientReferralEventService } from './client-referral-event.service';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-referral-event-form',
  templateUrl: './client-referral-event-form.component.html',
  styleUrls: ['./client-referral-event-form.component.scss']
})
export class ClientReferralEventFormComponent implements OnInit {

  referralEvent: ClientReferralEvent = new ClientReferralEvent();
  referralId: any;
  formControl: any;
  title = 'Referral Event';
  breadcrumbs = [];
  formStatus: any;
  formNavigation = false;
  status = 'draft';
  metadata = [];
  editControll = false;
  clientName: any;

  constructor(public _referralView: ReferralViewService, public _referralEvent: ClientReferralEventService,
              public _home: HomeService, public _router: Router) { }

  ngOnInit() {
    this.referralId = this._referralEvent.getReferralEventId();
    if (this._router.url == '/reports/referral_event/details') {
      this.getReferralDetails(this.referralId);
    }
    this._referralView.clientDetails().then(data => {
      this.clientName = data[0].clientName !== undefined ? data[0].clientName : 'Client';
      this.breadcrumbs.push(
        { label: this.clientName, href: '/reports/client', active: '' },
        { label: 'Referral view', href: '/reports/referral/view', active: '' },
        { label: 'Referral', href: '/reports/referral/reintegration/detail', active: '' },
        { label: 'Referral event view', href: '/reports/referral_event/view', active: '' },
        { label: 'Referral event', href: '#', active: 'active' },
      );
    });
   }

  /**
   *
   * @param event event
   * @param source referralevent form details
   */
  saveForm(source) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.referralEvent = source;
    this.referralEvent.beginDate = new Date(source.beginDate).getTime();
    this.referralEvent.endDate = new Date(source.endDate).getTime();
    this.referralId = this._referralView.getReferralDetails()[0];
    this._referralView.getSelectedReferralDetails(this.referralId).then(data => {
      this.referralEvent.referralID = data.referral;
      if (source.referralEventID) {
        this._referralEvent.updateReferralEvent(this.referralEvent).then(data => {
          loader.style.display = 'none';
          this._home.sucessAlert(data);
          this.formControl = true;
        });
      } else {
        this.referralEvent.createdDate = new Date();
        this._referralEvent.saveReferralEvent(this.referralEvent).then(data => {
          loader.style.display = 'none';
          this._home.sucessAlert(data);
          this.formControl = true;
        });
      }
    });


  }

  /**
   *
   * @param event event
   */
  editForm() {
    this.formControl = false;
  }

  /**
   *
   * @param event event
   * @param label metadata name
   */
  getMetadata(event, label) {
    let req, object;
    switch (label) {
      case 'referral_event':
        object = 'referralEventType';
        break;
      case 'procode':
        object = 'procode';
        break;
      case 'closure_reason':
        object = 'eventClosureReason';
        break;
      case 'payor':
        object = 'payor';
        break;
    }
    req = {Object: object, value: event.query};
    this._referralEvent.getReferralEventMetaData(req).then((data) => {
      this.metadata = data.dropDown;
    });
  }

  /**
  *
  * @param referralEventID referral id
  */
 getReferralDetails(referralEventID) {
  let source;
  const loader = document.getElementById('loading-overlay') as HTMLElement;
  loader.style.display = 'block';
  if (referralEventID) {
    this.editControll = true;
    this.formControl = true;
    this._referralEvent.getReferraEventById(referralEventID).then(data => {
      source = data.referralEvent;
      loader.style.display = 'none';
      source.beginDate = new Date(source.beginDate);
      source.endDate = new Date(source.endDate);
      this.referralEvent = source;
    });
  }
}

resetForm() { }

discardForm() { }


}
