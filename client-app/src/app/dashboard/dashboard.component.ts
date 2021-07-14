import { Component, OnInit } from '@angular/core';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  clientDashboard: any;
  isTabCollapsed = true;
  isClientDashboard = false;
  isProviderDashboard = false;
  providerDashboard: any;
  placementClientProfile: any;
  commonNavigationProvider = [
    {
      name: 'License & sponsorship',
      view: '/provider/dashboard/license-sponsorship',
    },
    {
      name: 'Address',
      view: '/provider/opencard/location/view',
    },
    {
      name: 'Status',
      view: '/provider/opencard/status/view',
    },
    {
      name: 'Demo & Location',
      view: '/provider/opencard/location/view',
    },
    {
      name: 'Entire  Placement History of Provider',
      view: '/provider/opencard/placement-history/view',
    },
    {
      name: 'Current SFM Staff',
      view: '/provider/opencard/staff/view',
    },
  ];


  constructor(
    public _opencards: OpencardsService,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.mode === 'client') {
        this.getClientDashboardDetails();
      } else if (params.mode === 'provider') {
        this.getProviderDashboardDetails();
      }
    });
  }

  async getClientDashboardDetails() {
    console.log('getClientDashboardDetails ===>');
    this.isClientDashboard = true;
    const clientDashboardRequest = {
      clientID:
        parseInt(localStorage.getItem('clientId')) -
        this._opencards.getHasKey(),
    };
    this.clientDashboard = await this._opencards.getClientDashboardInfo(
      clientDashboardRequest
    );
  }

  async getProviderDashboardDetails() {
    console.log('getProviderDashboardDetails ===>');
    this.isProviderDashboard = true;
    const providerDashboardRequest = {
      providerID:
        parseInt(localStorage.getItem("providerID")) -
        this._opencards.getHasKey(),
    };
    this.providerDashboard = await this._opencards.getProviderDashboardInfo(
      providerDashboardRequest
    );
    const placementProfileReq = {
      activePlacementClientIDs: this.providerDashboard.activePlacementClientIDs,
    };
    this.placementClientProfile = await this._opencards.getPlacementClientProfile(
      placementProfileReq
    );
  }

  public openInNewBrowserWindow(path: any) {
    window.open(
      window.location.origin + path,
      '_blank',
      'toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500',
    );
  }

}
