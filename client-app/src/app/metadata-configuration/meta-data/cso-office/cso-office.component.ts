import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../meta-data.service';
import { HomeService } from '../../../home/home.service';


@Component({
  selector: 'app-cso-office',
  templateUrl: './cso-office.component.html',
  styleUrls: ['./cso-office.component.scss']
})
export class CsoOfficeComponent implements OnInit {
  csoOfficeList = [];
  rowData = [];
  columnDef = [];
  defaultColDef:any;
  initial = 1;
  end = 100;
  totalCount;

  constructor(public _meta:MetaDataService,public _home:HomeService) { }

  ngOnInit() {this.getListofCsoOffices(); }
  
  /**
   * 
   * @returns the list view cso offices
   * 
   * @memberOf CsoOfficeComponent
   */
  getListofCsoOffices(){
    let req = {Object:'csoOffice',beginPagination:this.initial,endPagination:this.end}
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.csoOfficeList = []
    this._meta.getListofMetaData(req).then(data=>{
      loader.style.display = 'none';
      this.totalCount = data.totalCount;
      if(this.totalCount < 100){
        this.end = this.totalCount
      }
      if(data.dropDownObject.length > 0){
        this.csoOfficeList.push(data.dropDownObject)
      }
      return this._meta.generateMetaListView(this.csoOfficeList).then(data=>{
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
    console.log("Action",action)
    this._home.pagination(action,this.totalCount,this.initial,this.end).then((res=>{
      console.log("Result",res)
      this.initial = res[0];
      this.end = res[1];
      return this.getListofCsoOffices();
    }))
  }

  rowClick() { }

}
