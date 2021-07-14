import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../meta-data.service';

@Component({
  selector: 'app-primary-referral-reason',
  templateUrl: './primary-referral-reason.component.html',
  styleUrls: ['./primary-referral-reason.component.scss']
})
export class PrimaryReferralReasonComponent implements OnInit {
  primaryReasonList = [];
  rowData = [];
  columnDef = [];
  defaultColDef:any;
  initial = 1;
  end = 100;
  totalCount;

  constructor(public _meta:MetaDataService) { }

  ngOnInit() { this.getListofPrimaryReferrals();}

   /**
   * 
   * @returns the list view primary referrals
   * 
   * @memberOf CsoOfficeComponent
   */
  getListofPrimaryReferrals(){
    let req = {Object:'language',beginPagination:this.initial,endPagination:this.end}
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.primaryReasonList = [];
    this._meta.getListofMetaData(req).then(data=>{
      loader.style.display = 'none';
      this.totalCount = data.totalCount;
      if(this.totalCount < 100){
        this.end = this.totalCount
      }
      if(data.dropDownObject.length > 0){
        this.primaryReasonList.push(data.dropDownObject)
      }
      return this._meta.generateMetaListView(this.primaryReasonList).then(data=>{
        this.rowData = data[0];
        this.columnDef = data[1];
        this.defaultColDef = data[2];
      })
    })
    
  }

  navigation() { }

  rowClick() { }

}
