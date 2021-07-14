import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../meta-data.service';
import { HomeService } from '../../../home/home.service';

@Component({
  selector: 'app-education-level',
  templateUrl: './education-level.component.html',
  styleUrls: ['./education-level.component.scss']
})
export class EducationLevelComponent implements OnInit {
  educationLevelList = [];
  rowData = [];
  columnDef = [];
  defaultColDef:any;
  initial = 1;
  end = 100;
  totalCount;

  constructor(public _meta:MetaDataService,public _home:HomeService) { }

  ngOnInit() { this.getListofEducationLevel();}

   /**
   * 
   * @returns the list view  Education Level
   * 
   * @memberOf CsoOfficeComponent
   */
  getListofEducationLevel(){
    let req = {Object:'educationLevel',beginPagination:this.initial,endPagination:this.end}
    let loader = document.getElementById('loading-overlay') as HTMLElement
    this.educationLevelList = []
    this._meta.getListofMetaData(req).then(data=>{
      loader.style.display = 'block';
      this.totalCount = data.totalCount;
      if(this.totalCount < 100){
        this.end = this.totalCount
      }
      if(data.dropDownObject.length > 0){
        this.educationLevelList.push(data.dropDownObject)
      }
      return this._meta.generateMetaListView(this.educationLevelList).then(data=>{
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
      return this.getListofEducationLevel();
    }))
  }

  rowClick() { }

}
