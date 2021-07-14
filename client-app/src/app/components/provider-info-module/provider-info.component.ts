import { Component, Input, OnInit } from '@angular/core';
import { ProviderInfoService } from './provider-info.service';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { Router } from '@angular/router';


@Component({
  selector: 'provider-info',
  templateUrl: './provider-info.component.html',
  styleUrls: ['./provider-info.component.scss'],
  inputs: ['profileDatas']
})
export class ProviderInfoComponent implements OnInit {
  @Input() profileDatas: any;
  componentBtnLabel = 'Show More';
  componentBtnDisable: boolean;
  isMoreDetails: boolean;
  providerDashboard: any;
  placementClientProfile: any;
  isProviderDashboard = false;
  isTabCollapsed = true;
  isProviderInfoView: boolean;
  constructor(private _router: Router, private _service: ProviderInfoService, private _opencards: OpencardsService, ) { }
  providerID: number;
  ngOnInit() {
    if (this._router.url == "/provider_Authorization") {
      this.isProviderInfoView = false;
    } else {
      this.isProviderInfoView = true;
    }
    this.providerID = parseInt(localStorage.getItem('providerId')) - this._opencards.getHasKey();
    console.log('this.providerID>>>>>>', this.providerID);
    console.log('this.profileDatas>>>>>>', this.profileDatas);
  }


  async onShowMoreClick() {
    this.componentBtnLabel = 'Loading...';
    this.componentBtnDisable = true;
    this.isMoreDetails = true;
    this.componentBtnDisable = false;
    this.componentBtnLabel = 'Show More';
  }
  async onClickDashboard() {

    console.log('onClickDashboard Provider');
    // this.isProviderDashboard = true;
    // let providerDashboardRequest = {
    //   providerID:
    //     parseInt(localStorage.getItem("providerID")) -
    //     this._opencards.getHasKey(),
    // };
    // this.providerDashboard = await this._opencards.getProviderDashboardInfo(
    //   providerDashboardRequest
    // );
    // let placementProfileReq = {
    //   activePlacementClientIDs: this.providerDashboard.activePlacementClientIDs,
    // }
    // this.placementClientProfile = await this._opencards.getPlacementClientProfile(
    //   placementProfileReq
    // );

    window.open(
      window.location.origin + '/dashboard' + '?mode=provider',
      '_blank',
      'toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500'
    );
  }

}
