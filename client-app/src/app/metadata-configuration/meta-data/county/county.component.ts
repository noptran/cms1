import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../meta-data.service';
import { HomeService } from '../../../home/home.service';

@Component({
  selector: 'app-county',
  templateUrl: './county.component.html',
  styleUrls: ['./county.component.scss']
})
export class CountyComponent implements OnInit {
  countyList = [];
  rowData = [];
  columnDef = [];
  defaultColDef:any;
  initial = 1;
  end = 100;
  totalCount;

  constructor(public _meta:MetaDataService, public _home:HomeService) { }

  ngOnInit() {this.getListofCounties();}

  /**
   * 
   * 
   * @returns the list view counties
   * 
   * @memberOf CountyComponent
   */
  getListofCounties(){
    let req = {Object:'county',beginPagination:this.initial,endPagination:this.end}
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.countyList = []
    this._meta.getListofMetaData(req).then(data=>{
      loader.style.display = 'none';
      this.totalCount = data.totalCount;
      if(this.totalCount < 100){
        this.end = this.totalCount
      }
      if(data.dropDownObject.length > 0){
       this.countyList.push(data.dropDownObject)
      }
      return this._meta.generateMetaListView(this.countyList).then(data=>{
        this.rowData = data[0];
        this.columnDef = data[1];
        this.defaultColDef = data[2];
      })
    })
    
  }

  /**
   * 
   * 
   * @param {any} action pagination action
   * 
   * @memberOf CountyComponent
   */
  navigation(action){
    this._home.pagination(action,this.totalCount,this.initial,this.end).then((res=>{
      this.initial = res[0];
      this.end = res[1];
      return this.getListofCounties();
    }))

  }

  rowClick() { }


}
