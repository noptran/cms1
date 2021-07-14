import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../meta-data.service';
import { HomeService } from '../../../home/home.service';

@Component({
  selector: 'app-employment-status',
  templateUrl: './employment-status.component.html',
  styleUrls: ['./employment-status.component.scss']
})
export class EmploymentStatusComponent implements OnInit {
  empolymentStatusList = [];
  rowData = [];
  columnDef = [];
  defaultColDef:any;
  initial = 1;
  end = 100;
  totalCount;

  constructor(public _meta:MetaDataService,public _home:HomeService) { }

  ngOnInit() { this.getListofEmpolymentStatus();}

   /**
   * 
   * @returns the list view  employment status
   * 
   * @memberOf CsoOfficeComponent
   */
  getListofEmpolymentStatus(){
    let req = {Object:'employmentStatus',beginPagination:this.initial,endPagination:this.end}
    let loader = document.getElementById('loading-overlay') as HTMLElement
    this.empolymentStatusList = [];
    this._meta.getListofMetaData(req).then(data=>{
      loader.style.display = 'block';
      this.totalCount = data.totalCount;
      if(this.totalCount < 100){
        this.end = this.totalCount
      }
      if(data.dropDownObject.length > 0){
        this.empolymentStatusList.push(data.dropDownObject)
      }
      return this._meta.generateMetaListView(this.empolymentStatusList).then(data=>{
        loader.style.display = 'none';
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
      return this.getListofEmpolymentStatus();
    }))
  }

  rowClick() { }

}
