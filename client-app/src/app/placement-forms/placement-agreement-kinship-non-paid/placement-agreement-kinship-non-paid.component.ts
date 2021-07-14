import { Component, OnInit } from '@angular/core';
import { PlacementService } from '../../placement/placement.service';
import { KinshipNp } from './kinship-np';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';



@Component({
  selector: 'app-placement-agreement-kinship-non-paid',
  templateUrl: './placement-agreement-kinship-non-paid.component.html',
  styleUrls: ['./placement-agreement-kinship-non-paid.component.scss']
})
export class PlacementAgreementKinshipNonPaidComponent implements OnInit {
  placementData: KinshipNp = new KinshipNp();
  placementAgreementText: any;
  currentPlacementID: number;
  currentPlaementDetailID: number;
  authFromDate: string;
  authToDate: string;
  placementDates: any;
  agreementDates: string;

  constructor(public _placement: PlacementService, public _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentPlacementID = parseInt(this._activatedRoute.snapshot.queryParamMap.get('p_id'));
    this.currentPlaementDetailID = parseInt(this._activatedRoute.snapshot.queryParamMap.get('pd_id'));
    this.getData();
  }

  getData() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const placementReq = { placementID: this._placement.getSavedPlacementId() || this.currentPlaementDetailID };

    if (this._placement.getSavedPlacementId() || this.currentPlaementDetailID) {

      this._placement.getPlacement(placementReq).then((data: any) => {
        loader.style.display = 'none';
        if (data.responseStatus) {

          !isNullOrUndefined(data.placement.providerID) ? this.placementData.providerName = data.placement.providerID.providerName : null;

          !isNullOrUndefined(data.placement.clientID) ? this.placementData.clientName = data.placement.clientID.clientNameLastFirst : null;

          !isNullOrUndefined(data.placement.clientID) ? this.placementData.clientDob = (new Date(data.placement.clientID.dob).getMonth() + 1) + '/' + new Date(data.placement.clientID.dob).getDate() + '/' + new Date(data.placement.clientID.dob).getFullYear() : null;

          this.placementAgreementText = `${this.placementData.providerName}  hereinafter referred to as the Placement
          Provider. SFM places ${this.placementData.clientName}, born on ${this.placementData.clientDob}, with the Placement Provider for the sum of $${!isNullOrUndefined(this.placementData.providerSum) ? this.placementData.providerSum : '0'}
          per day  under the following terms and conditions:`;

          this.placementDates = data.placement;

          this.getAuthData();
        }
      });
    }

  }

  getAuthData() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const placementReq = { placementDetailID: this._placement.getSavedPlacementDetailId() || this.currentPlaementDetailID };


    if (this._placement.getSavedPlacementId() || this.currentPlaementDetailID) {

      this._placement.getPlacementAuthorization(placementReq).then((data: any) => {

        const authInfo = data.placementAuthorization[data.placementAuthorization.length - 1];

        this.authFromDate = `${moment(authInfo.beginDate).format('Do')} day of ${moment(authInfo.beginDate).format('MMMM')}, ${moment(authInfo.beginDate).format('YYYY')}`;

        this.authToDate = `${moment(authInfo.endDate).format('Do')} day of ${moment(authInfo.endDate).format('MMMM')}, ${moment(authInfo.endDate).format('YYYY')}`;

        this.placementData.providerSum = ((data.placementAuthorization.length > 0) && authInfo.providerRate) ? authInfo.providerRate : '0';

        this.placementAgreementText = `${this.placementData.providerName}  hereinafter referred to as the Placement
        Provider. SFM places ${this.placementData.clientName}, born on ${this.placementData.clientDob}, with the Placement Provider for the sum of $${this.placementData.providerSum}
        per day  under the following terms and conditions:`;

        loader.style.display = 'none';

        if (authInfo.status === 'Active' && this.placementDates.beginDate && this.placementDates.endDate) {
          return this.agreementDates = `This agreement is entered into this ${this.authFromDate} to ${this.authToDate}`;
        } else if (authInfo.status === 'Active' && this.placementDates.beginDate) {
          return this.agreementDates = `This agreement is entered into this ${this.authFromDate} `;
        } else if (authInfo.status === 'Closed' && this.placementDates.beginDate) {
          return this.agreementDates = `This agreement is entered into this ${this.authFromDate} to ${this.authToDate}`;
        } else {
          return this.agreementDates = '';
        }
      });
    }
  }

}
