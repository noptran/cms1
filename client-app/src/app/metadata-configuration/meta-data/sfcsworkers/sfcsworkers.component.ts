import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../meta-data.service';

@Component({
  selector: 'app-sfcsworkers',
  templateUrl: './sfcsworkers.component.html',
  styleUrls: ['./sfcsworkers.component.scss']
})
export class SfcsworkersComponent implements OnInit {
  sfcsWorkersList = [];
  rowData = [];
  columnDef = [];
  defaultColDef:any;
  initial = 1;
  end = 100;
  totalCount;

  constructor(public _meta:MetaDataService) { }

  ngOnInit() { }

  /**
   * 
   * @returns the list view secondary referrals
   * 
   * @memberOf CsoOfficeComponent
   */
  getListofPrimaryReferrals(){
    let req = {Object:'language',beginPagination:this.initial,endPagination:this.end}
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.sfcsWorkersList = [];
    this._meta.getListofMetaData(req).then(data=>{
      loader.style.display = 'none';
      this.totalCount = data.totalCount;
      if(this.totalCount < 100){
        this.end = this.totalCount
      }
      if(data.dropDownObject.length > 0){
        this.sfcsWorkersList.push(data.dropDownObject)
      }
      return this._meta.generateMetaListView(this.sfcsWorkersList).then(data=>{
        this.rowData = data[0];
        this.columnDef = data[1];
        this.defaultColDef = data[2];
      })
    })
    
  }

  navigation() { }

  rowClick() { }

}
