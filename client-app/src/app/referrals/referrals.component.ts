import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReferralsService } from '../referrals/referrals.service';
import { MetaDataService } from '../metadata-configuration/meta-data/meta-data.service';
import { PagesizeService } from '../pagesize/pagesize.service';


@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {

  ListData = [];
  rowData = [];
  columnDef = [];
  defaultColDef:any;
  initial:any;
  end:any;
  totalCount;
  listViewRequest:any;
  selectedMenu:any;
  title:any;
  referralId:any

  constructor(public _router:Router,
     public _referral:ReferralsService, public _meta:MetaDataService,
    public _pageSize:PagesizeService) { }

  ngOnInit() { 
      this.generateListView(); 
    }

  /**
   * Based on the router Url, the selected category will determine.
   * 
   * @returns selected Category
   * 
   * @memberOf ReferralsComponent
   */
  getSelection(){
    let request, routerURL, selectedCategory;
    routerURL = this._router.url.toString();
    request = routerURL.split('/');
    return selectedCategory = request[3]
  }

  /**
   * Create the view for list based on the user menu selection
   * 
   * 
   * @memberOf ReferralsComponent
   */
  generateListView(){
    this.selectedMenu = this.getSelection();
    switch(this.selectedMenu){
      case 'Family_preservation':
        this.title = 'Family preservation';
        this.referralId = 'FI';
        break;
      case 're_integration':
        this.title = 'ReIntegration';
        this.referralId = 1;
        break;
    }
    this.listViewRequest = {referralType:this.referralId,beginPagination:1,endPagination:100,sort:{column:"referralDate",mode:"desc"}}
    return this.listDataRequest(this.listViewRequest);      

  }



 /**
  * Referral list view 
  * @param req list view request
  */
  listDataRequest(req){
    let tempSource = [];
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._referral.getReferralListview(req).then(data=>{
      this.totalCount = data.totalCount;
      tempSource.push(data.referral);
      this._meta.generateMetaListView(tempSource).then(out=>{
        loader.style.display = 'none';
        this.rowData = out[0];
        this.columnDef = out[1];
        this.defaultColDef = out[2];
      })      
    })
  }


  /***
   * Navigation based on the input value
   */
  pagesizeNav(event) { 
    let begin, end, req;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      req = {referralTypeId:this.referralId,beginPagination:this.initial,endPagination:this.end}
      return this.listDataRequest(req);      
 
    }
  }

/**
 * 
 * @param event 
 */
  pagesize(event) {
    if (event.target.localName == 'img') {
      let begin, end,req;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      req = {referralTypeId:this.referralId,beginPagination:this.initial,endPagination:this.end} 
      console.log("Request",req)
      return this.listDataRequest(req);      

    }
  }



  

 

  

  

  
  



}
