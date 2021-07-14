import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClildFormService } from '../child-forms/child-forms.service';
import { ExportService } from '../prioritized-reports/export-service.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { PagesizeService } from '../pagesize/pagesize.service';

@Component({
  selector: 'app-guardian-form-list',
  templateUrl: './guardian-form-list.component.html',
  styleUrls: ['./guardian-form-list.component.scss']
})
export class GuardianFormListComponent implements OnInit {

  personName = 'Guardian AdL item';
  customizedArray = 'customReport';
  columnToSorted = 'galid';
  filter = 'GuardianAdLitem';
  tableArray = 'GuardianAdLitem';
  addLink = "/reports/guardianAdl/new";
  navigateTo = '/reports/guardianAdl/details';
  isSearchAny = true;
  columnDefs = [];
  rowData = [];
  defaultColDef;
  initial = 1;
  end = 100;
  breadcrumbs = [
    { label: 'Person Types', href: "/reports/person/types", active: '' },
    { label: 'Client', href: "", active: 'active' },
  ];

  @Input()
  Sidenav: boolean;
  orgForm: FormGroup;
  reportsViewList;
  Data;
  showForm: boolean = false;
  hideLoader: boolean = true;
  headers = [];
  rawdata = [];
  totalCount: any;
  updateUser: boolean = false;
  countyData = [];
  raceData = [];
  genderData = [
    { id: 0, itemName: 'Male' },
    { id: 1, itemName: 'Female' },
  ];
  clientId;
  Race = [];
  CountyName = [];
  Gender = [];
  viewOnly: boolean;
  addOption = null;
  userDetails;
  head = [];
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

  @ViewChild('agGrid', { static: false }) agGrid: AgGridNg2;

  constructor(public router: Router,
    public clildFormService: ClildFormService,
    public _pageSize: PagesizeService) {
    this.defaultColDef = {
      headerCheckboxSelection: this.isFirstColumn,
      checkboxSelection: this.isFirstColumn
    }
  }

  ngOnInit() {
    this.getPerson(this.initial, this.end);
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

  applyFilter(event) {
    this.personData = event;
    this.getPerson(1, 100);
  }

  reset(event) {
    this.personData = event;
    this.getPerson(1, 100);
  }

  add() {
    this.router.navigate(['/reports/guardianAdl/new']);
  }

  isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  onRowSelected(event) {
    // this.clildFormService.storeId(event.data.galid);
    this.clildFormService.storeId(event.data.galID);
    this.router.navigate(['/reports/guardianAdl/details'])
  }

  goToMenu() {
    this.router.navigate(['/reports/person/types']);
  }

  getPerson(initial: any, end: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.headers = [];
    this.rawdata = [];
    let rowData = [];
    this.hideLoader = false;
    initial = initial;
    end = end;
    this.personData['filter'] = 'GuardianAdLitem';
    this.personData['group by'] = 'All';
    this.personData['beginPagination'] = initial;
    this.personData['endPagination'] = end;
    this.personData['sort'] ? this.personData['sort'] : this.personData['sort'] = {
      "column": "galid",
      "mode": "desc"
    }
    // this.personData = {
    //   "filter": "GuardianAdLitem",
    //   "group by": "All",
    //   "beginPagination": initial,
    //   "endPagination": end,
    //   "action": "NaN",
    //   "sort":{"column":"galid","mode":"desc"}
    // };
    this.clildFormService.getPerson(this.personData).then(data => {
      loader.style.display = 'none';
      this.hideLoader = true;
      this.totalCount = data.totalCount;
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
      this.reportsViewList = data.CustomerCarePerson;
      this.rowData = data['CustomerCarePerson']
      this.rowData.map(data => {
        data.createdDate = data.createdDate !== null ? new Date(data.createdDate).toLocaleDateString() : '';
        data.changedDate = data.changedDate !== null ? new Date(data.changedDate).toLocaleDateString() : '';
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
