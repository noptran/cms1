import { Component, OnInit, ViewChild } from '@angular/core';
import { ProviderSponsorData, AuthData } from './provider-sponsor-data';
import * as moment from 'moment';

import { forkJoin } from "rxjs";
import { tap, catchError, map, flatMap } from "rxjs/operators";
import { HomeService } from '../../home/home.service';
import { environment } from '../../../environments/environment';
import { OtpverficationService } from '../../otpverfication/otpverfication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-provider-sponsor-claims',
  templateUrl: './provider-sponsor-claims.component.html',
  styleUrls: ['./provider-sponsor-claims.component.scss']
})
export class ProviderSponsorClaimsComponent implements OnInit {
  breadcrumbs = [];
  authDetail: AuthData = new AuthData();
  claimDetail: ProviderSponsorData = new ProviderSponsorData();
  endPoint = environment;

  isNotes: any;
  isExpactPaymentDate: any;
  isfchWeb: any;
  paymentNotes_dis: any;

  constructor(public _otp: OtpverficationService, public _home: HomeService, public _http: HttpClient) { }

  ngOnInit() {

    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider Sponser List', href: '/reports/provider-sponser/view', active: '' },
      { label: 'Provider Sponser', active: '', href: '/reports/provider-sponser/detail' },
      { label: 'Placement Authorization List', href: '/reports/provider-sponser/placement-authorization/view', active: '' },
      { label: 'Claims List', active: '', href: '/reports/provider-sponser/placement-authorization/dashboard' },
      { label: 'Claims Detail', active: 'active', href: '/reports/provider-sponser/placement-authorization/dashboard' }

    );
    this.fetchInfo();
  }

  fetchInfo() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    let authorizationApi = '/authorization/getById';
    let claimsApi = '/claim/getById';
    let authReq = {
      'authorizationID': parseInt(localStorage.getItem("authId"))
    };
    let claimReq = {
      'claimID': parseInt(localStorage.getItem("claimId"))
    }
    forkJoin([
      this._http.post(this.endPoint.localUrl + authorizationApi, JSON.stringify(authReq))
        .pipe(
          tap(res => {
            let respose = this._home.extractedData(res);
            this.fetchAuthInfo(respose);
          }),
        ),
      this._http.post(this.endPoint.localUrl + claimsApi, JSON.stringify(claimReq))
        .pipe(
          tap(res => {
            let respose = this._home.extractedData(res);
            this.fetchClaimsInfo(respose);
          }),
        )
    ])
      .subscribe(() => {
        loader.style.display = 'none';
      });

  }

  fetchAuthInfo(data) {
    if (data.authorization.isActive) {
      data.authorization.beginDate = moment(data.authorization.beginDate).format("MM/DD/YYYY");
      data.authorization.endDate = moment(data.authorization.endDate).format("MM/DD/YYYY");
    } else {
      data.authorization.beginDate = moment.utc(data.authorization.beginDate).format("MM/DD/YYYY");
      data.authorization.endDate = moment.utc(data.authorization.endDate).format("MM/DD/YYYY");
    }
    this.authDetail = data.authorization;
  }

  fetchClaimsInfo(data) {
    let claim_Detail = data.claim;

    if (claim_Detail.isActive) {
      claim_Detail.beginDate = moment(claim_Detail.beginDate).format("MM/DD/YYYY");
      claim_Detail.endDate = moment(claim_Detail.endDate).format("MM/DD/YYYY");
      claim_Detail.receivedDate = moment(claim_Detail.receivedDate).format("MM/DD/YYYY");
      claim_Detail.paymentDueDate = moment(claim_Detail.paymentDueDate).format("MM/DD/YYYY");
    } else {
      claim_Detail.beginDate = moment.utc(claim_Detail.beginDate).format("MM/DD/YYYY");
      claim_Detail.endDate = moment.utc(claim_Detail.endDate).format("MM/DD/YYYY");
      claim_Detail.receivedDate = moment.utc(claim_Detail.receivedDate).format("MM/DD/YYYY");
      claim_Detail.paymentDueDate = moment.utc(claim_Detail.paymentDueDate).format("MM/DD/YYYY");
    }
    this.claimDetail = claim_Detail;
  }

}
