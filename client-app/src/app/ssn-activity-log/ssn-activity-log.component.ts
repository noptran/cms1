import { Component, OnInit, ViewChild } from '@angular/core';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';
import swal from 'sweetalert2';
import { AgGridNg2 } from 'ag-grid-angular';
import { CaseTeamService } from '../case-team/case-team.service';
import { ProviderService } from '../provider/provider.service';
import { PagesizeService } from '../pagesize/pagesize.service';
import {LocalValues} from '../local-values';

@Component({
  selector: 'app-ssn-activity-log',
  templateUrl: './ssn-activity-log.component.html',
  styleUrls: ['./ssn-activity-log.component.scss']
})
export class SsnActivityLogComponent implements OnInit {
  
  url: any;
  showReferralType: boolean;
  totalCount: any;
  selectedQuery: any;
  reportsViewList: any;
  initial = 1;
  end = 100;
  numericColumns: any = [];
  rowData = [];
  tableArray: any;
  customizedArray: any;
  sortcolumnDropdownList = [];
  headers = [];
  rawdata = [];
  columnDropdownList = [];
  columnDefs = [];
  @ViewChild("agGrid", { static: true }) agGrid: AgGridNg2;
  beginDate: any;
  endDate: any;
  showForm: boolean = false;
  report_name: string;
  fin_report_data: any;
  report_name_head: string;
  showRegion: boolean;
  isValidDate: boolean;
  metaData = [];
  referralType: any;
  region: any;
  getReportStatus: boolean;
  exportQuery: any;
  defaultColDef: any;

  constructor(public ssn_access_list: ProviderService, public _pageSize: PagesizeService, 
    public _localValues:LocalValues) {
    

  }

  ngOnInit() {
    this.getAllAccessRight(this.initial, this.end);
  }
  getAllAccessRight(init,end) {
    var data={
      "staffID": isNullOrUndefined(localStorage.getItem('UserId')) ? 5130 : localStorage.getItem('UserId'),
      "event":"Viewed SSN",
      "beginPagination" :init,
      "endPagination":end
      };
        let loader = document.getElementById("loading-overlay") as HTMLElement;
        loader.style.display = "block";
        this.ssn_access_list.list_ssn_number_activity_log(data).then((data: any) => {
          if (data.activityLogList.length != 0) {
            this.rowData = data.activityLogList.reverse();
            this.totalCount = data.totalCount;
            this.totalCount = data.totalCount;
            if (data.totalCount < 100) {
              this.end = this.totalCount;
            }
            this.rowData.map(data => {
              data;
              !isNullOrUndefined(data.eventDate) ? data.eventDate = this._localValues.stringFormatDatetime(data.eventDate) : null; 
            });
            let arrangments = [];
            let test = [];
            this.headers.push(Object.keys(this.rowData[0]));
            this.headers[0].forEach(function (ele) {
              let data = {
                headerName: ele
                  .replace(/\b\w/g, l => l.toUpperCase())
                  .replace(/([A-Z])/g, " $1")
                  .trim(),
                field: ele
              };
              test.push(data);
            });
            test.sort((a, b) => a['order'] - b['order']);
            test
            this.rawdata.push(test)
            this.columnDefs = test;
            loader.style.display = "none";
          } else {
            swal('Info', 'No Data Found.', 'warning');
            loader.style.display = "none";
          }
        });
  };
  
  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getAllAccessRight(this.initial, this.end);
    }
  };
  pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getAllAccessRight(this.initial, this.end);
    }
  }

 



  
 
}
