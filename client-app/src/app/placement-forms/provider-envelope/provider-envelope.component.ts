import { Component, OnInit } from '@angular/core';
import { PlacementService } from '../../placement/placement.service';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';
import {LocalValues} from '../../local-values';

@Component({
  selector: 'app-provider-envelope',
  templateUrl: './provider-envelope.component.html',
  styleUrls: ['./provider-envelope.component.scss']
})
export class ProviderEnvelopeComponent implements OnInit {
  providerName: any;
  currentPlacementID: number;
  currentPlacementDetailID: number;

  providerAddress = {
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: ""
  }


  constructor(public _localValues: LocalValues, public _placement: PlacementService, public _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentPlacementID = parseInt(this._activatedRoute.snapshot.queryParamMap.get('p_id')) // Placement id
    this.currentPlacementDetailID = parseInt(this._activatedRoute.snapshot.queryParamMap.get('pd_id')) // Placement Detail id
    this.getPlacementDetailInfo();
    this.getData();
  }

  getData(): any {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    let placementReq = { placementID: this._placement.getSavedPlacementId() || this.currentPlacementID };

    if (this._placement.getSavedPlacementId() || this.currentPlacementID) {
      this._placement.getPlacement(placementReq).then((data: any) => {
        this._placement.storePlacementData(data);
        loader.style.display = 'none';
      })
    }
  }

  getPlacementDetailInfo(): any {
    const req = { placementDetailID: this._placement.getSavedPlacementDetailId() || this.currentPlacementDetailID }
    this._placement.getPlacementDetailInfo(req).then((data: any) => {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      !isNullOrUndefined(data.placementDetail.providerID) ? this.providerName = data.placementDetail.providerID.providerName : null;
      if (this._localValues.livingArrangementProviderName) {
        this.providerName = this._localValues.livingArrangementProviderName;
      }
      if (data.placementDetail.providerID) {
        if (data.placementDetail.providerID.providerID) {
          if (this._localValues.livingArrangementProviderId) {
            data.placementDetail.providerID.providerID = this._localValues.livingArrangementProviderId;
          }
          let providerLocationRequest = {
            providerID: data.placementDetail.providerID.providerID
          }
          this._placement.getProviderLocationInfo(providerLocationRequest).then((data: any) => {

            if (data.providerolcation.length > 0) {

              !isNullOrUndefined(data.providerolcation[0].address1) ? this.providerAddress.address = data.providerolcation[0].address1 : null;
              !isNullOrUndefined(data.providerolcation[0].phone) ? this.providerAddress.phone = data.providerolcation[0].phone : null;
              !isNullOrUndefined(data.providerolcation[0].city) ? this.providerAddress.city = data.providerolcation[0].city : null;
              !isNullOrUndefined(data.providerolcation[0].zipCode) ? this.providerAddress.zipCode = data.providerolcation[0].zipCode : null;

            }

          })
        }
      }
      loader.style.display = 'none';
    })
  }

  ngOnDestroy() {
    this._localValues.livingArrangementProviderId = null;
    this._localValues.livingArrangementProviderName = null;
  }

}
