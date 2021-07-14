import { Component, OnInit, ViewChild } from '@angular/core';
import { ClildFormService } from '../child-forms/child-forms.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { PagesizeService } from '../pagesize/pagesize.service';

@Component({
  selector: 'app-other-agency-staff.component.html',
  templateUrl: './other-agency-staff.component.html',
  styleUrls: ['../person-master/Client/client-form/client-form.component.scss']
})

export class OtherAgencyStaffComponent implements OnInit {

  personName = 'Other Agency Staff';
  customizedArray= 'customReport' ;
  columnToSorted= 'OtherAgencyStaffID';
  filter= 'otherAgencyStaff';
  tableArray='OtherAgencyStaff';
  addLink = "/reports/otherAgencyStaff/new";
  navigateTo = '/reports/otherAgencyStaff/details';

  columnDefs = [];
  rowData = [];
  defaultColDef;
  initial = 1;
  end = 100;

  @ViewChild('agGrid', { static: false }) agGrid: AgGridNg2;

  headers = [];
  rawdata = [];
  totalCount: any;
  beginPagination: any = 1;
  endPagination: any = 100;
  hideLoader:boolean;
  personData = {};
  sortcolumnDropdownL = [];
  numericColumns = [];
  numericHeaders = [];
  sortColumn;
  sortOrder;
  sortList = [
    { name: 'asc' },
    { name: 'desc' },
    { name: 'no sort' }
  ];
  fillField;
  columnDropdownList = [];
  sortcolumnDropdownList = [];
  isSearchAny = true;
   breadcrumbs = [
    { label: 'Person Types', href: "/reports/person/types", active: '' },
    { label: 'Other Agency Staff', href: "", active: 'active' },
  ];
 

  constructor(
    public _person: ClildFormService,
    public _pageSize: PagesizeService,
    public _router: Router) {
  }

 

  ngOnInit() {
    this.getPerson(1, 100);
  }

  SortChanged() {
    if (this.sortColumn !== null && this.sortColumn !== undefined) {
      if (this.sortOrder.name !== 'no sort') {
        this.personData['sort'] = {
          "column": this.sortColumn,
          "mode": this.sortOrder.name
        }
        this.getPerson(this.initial, this.end);

      } else if (this.sortOrder.name == 'no sort') {
        delete this.personData['sort'];
        this.getPerson(this.initial, this.end);
      }
    }
  }

  applyFilter(event){
    this.personData = event;
    this.getPerson(1,100);
  }

  reset(event){
    this.personData = event;
    this.getPerson(1,100);
  }

  getPerson(initial: any, end: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.hideLoader = false;
    let rowData = [];
    this.headers = [];
    this.rawdata = [];
    initial = initial;
    end = end
    // req = {
    //   "filter": "otherAgencyStaff",
    //   "group by": "All",
    //   "beginPagination": initial,
    //   "endPagination": end,
    //   "action": "NaN",
    //   "sort":{"column":"otherAgencyStaffID","mode":"desc"}
    // };
    this.personData['filter'] = 'otherAgencyStaff';
    this.personData['group by'] = 'All';
    this.personData['beginPagination'] = initial;
    this.personData['endPagination'] = end;
    this.personData['sort']?this.personData['sort']:this.personData['sort'] = {
      "column": "otherAgencyStaffID",
      "mode": "desc"
    }
    this._person.getPerson(this.personData).then(data => {
      this.hideLoader = true;
      loader.style.display = 'none';
      console.log("Person data", data)
      this.totalCount = data.totalCount;  
      if (this.totalCount < 100) {
        this.end = this.totalCount
      }
      this.rowData = data['dHHSStaff']
      this.rowData.map(data => {
        data.changedDate = data.changedDate !== null ? new Date(data.changedDate).toLocaleDateString() : '';
        data.enteredDate = data.enteredDate !== null ? new Date(data.enteredDate).toLocaleDateString() : '';
        data.beginDate = data.beginDate !== null ? new Date(data.enteredDate).toLocaleDateString() : '';  
        rowData.push(data);
      });
      this.headers.push(Object.keys(this.rowData[0]))
      let test = []
      this.headers[0].forEach(function (result) {
        let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
        test.push(data)
      })
      this.headers[0].map(data => {
        this.sortcolumnDropdownList.push({ label: data, value: data })
        this.columnDropdownList.push({ label: data, value: data })
      })
      this.rawdata.push(test)
      this.columnDefs = this.rawdata[0]
    })
  }

  

  onRowSelected(event) {
    this._person.storeId(event.data.OtherAgencyStaffID);
    return this._router.navigate(['/reports/otherAgencyStaff/details'])
  }

  goToMenu() {
    return this._router.navigate(['/reports/person/types'])
   }

  add() { 
    return this._router.navigate(['/reports/otherAgencyStaff/new'])
  }


  /***
* Jumb to page, Enter the page value and navigate to the particular page
* @returns get list of person masters
* @event keyboard event
*/
  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getPerson(this.initial, this.end);
    }
  }

  /**
   * Navigation button actions
   * @param event mouseclick event
   * @returns respective page as per the naigation button actions
   */
  pagesize(event) {
    if (event.target.localName == 'img') {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getPerson(this.initial, this.end);

    }
  }
}

