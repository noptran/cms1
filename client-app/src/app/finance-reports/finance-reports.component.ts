import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProviderService } from "./../provider/provider.service";
import { AgGridNg2 } from 'ag-grid-angular';
@Component({
  selector: 'app-finance-reports',
  templateUrl: './finance-reports.component.html',
  styleUrls: ['./finance-reports.component.scss']
})
export class FinanceReportsComponent implements OnInit {
  totalCount: any;
  selectedQuery: any;
  reportsViewList: any;
  numericColumns: any=[];
  rowData=[];
  tableArray: any;
  customizedArray: any;
  sortcolumnDropdownList=[];
  headers = [];
  rawdata = [];
  columnDropdownList = [];
  columnDefs = [];
  @ViewChild("agGrid", { static: false }) agGrid: AgGridNg2;
  end: any;
  constructor(public router:Router,public finance_report: ProviderService,) { }

  ngOnInit() {
  
  }
  gotoPrimaryReport(url){
    if(this.router.url==='/family/finance_report-live'){
      this.router.navigate(['live/'+url]);
    }else{
      this.router.navigate([url]);
    }
      
  };
 
}
