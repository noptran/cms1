import { Component, OnInit, ViewChild } from '@angular/core';
import { ProviderService } from "./../provider/provider.service";
import swal from 'sweetalert2';
import * as moment from 'moment';
import { PagesizeService } from '../pagesize/pagesize.service';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import { AgGridNg2 } from 'ag-grid-angular';
@Component({
  selector: 'app-auth-claim-info',
  templateUrl: './auth-claim-info.component.html',
  styleUrls: ['./auth-claim-info.component.scss']
})
export class AuthClaimInfoComponent implements OnInit {
  listTest: any[];
  listViewHeaders: any[];
  @ViewChild("agGrid", { static: true }) agGrid: AgGridNg2;
  constructor(public OpencardsService: OpencardsService, public _router: Router, public providerService: ProviderService, public _pageSize: PagesizeService, public _opencard: OpencardsService) { }
  breadcrumbs = [];
  showHeader = false;

  defaultColDef: any;

  ngOnInit() {
    this.getAuthClaimList();
    if (this._router.url === "/provider/claimProvider_claimList") {
      this.breadcrumbs = [
        { label: 'CS-Claim List', href: '/csClaimProvider', active: '' },
        { label: 'Claim Info', active: 'active' },
      ]
    } else {
      this.breadcrumbs = [
        { label: 'CS-Claim List', href: '/claims/list/cs-claim-list', active: '' },
        { label: 'Claim Info', active: 'active' },
      ]
    }

  };
  allClaimList = [];
  columnDefs = [];
  authInfo: any = [];
  getAuthClaimList() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    var req = {
      "claimID": parseInt(localStorage.getItem('auth_claimID')) - this._opencard.getHasKey(),
      "beginPagination": 1,
      "endPagination": 100
    }
    this.providerService.authClaimList(req).then((data: any) => {
      if (data.claim.length === 0) {
        // localStorage.setItem('claimID', localStorage.getItem('auth_claimID') + this.OpencardsService.getHasKey());

        if (this._router.url === "/provider/claimProvider_claimList") {
          this._router.navigate(['/claims/list/provider/cs-claim_provider_view/directAuth']);
        } else if (this._router.url === "/cs_claim_payee/claimDetail") {
          this._router.navigate(['/claims/list/csClaimPayee-form/directAuth']);
        } else {
          this._router.navigate(['/claims/list/cs-direct/form/view']);
        }
      } else {
        this.allClaimList = data.claim;
        this.authInfo = data.authorizationInformation;
        localStorage.setItem("clientId", this.authInfo[0].clientID + this._opencard.getHasKey());
        localStorage.setItem('authorizationId', this.authInfo[0].authorizationID + this._opencard.getHasKey());

        localStorage.setItem(
          "providerID",
          this.authInfo[0]["providerID"] + this._opencard.getHasKey()
        );

        let rawData = [];
        this.listTest = [];
        this.listViewHeaders = [];
        this.columnDefs = [];
        this.showHeader = true;
        if (this.allClaimList.length > 0) {
          this.listViewHeaders.push(Object.keys(this.allClaimList[0]))
          this.listViewHeaders[0].forEach((item: any) => {
            let data = { headerName: item, field: item }
            this.listTest.push(data);
          });
          rawData.push(this.listTest)

          this.columnDefs = rawData[0];
        }
      }
      loader.style.display = 'none';
    }).catch(error => {
      loader.style.display = 'none';
    })
  };
  onRowSelected(event) {
    localStorage.setItem('claimID', event.data.claimID + this.OpencardsService.getHasKey());

    if (this._router.url === "/provider/claimProvider_claimList") {
      this._router.navigate(['/provider/auth-claim_detail']);
    } else if (this._router.url.includes("/cs_claim_payee/claimDetail")) {
      this._router.navigate(['/cs_claim_payee/auth/detail']);
    } else {
      this._router.navigate(['/cs/auth-claim/details']);
    }
  };
  go_directAuth() {
    if (this._router.url === "/provider/claimProvider_claimList") {
      this._router.navigate(['/provider/auth-claim_new']);
    } else if (this._router.url === "/cs_claim_payee/claimDetail") {
      this._router.navigate(['/cs_claim_payee/auth/new']);
    } else {
      if (this.authInfo.length == 0) {
        this._router.navigate(['/claims/list/cs-claim/add']);
      } else if (this.authInfo.length != 0) {
        this._router.navigate(['/cs/auth-claim/new']);
      }
    }
  }
}
