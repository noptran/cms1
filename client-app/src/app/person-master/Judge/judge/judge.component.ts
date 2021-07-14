import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import { ExportService } from '../../../prioritized-reports/export-service.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { ReferralViewService } from '../../../referral-view/referral-view.service';
import { PagesizeService } from '../../../pagesize/pagesize.service';

  
  @Component({
    selector: 'app-judge',
    templateUrl: './judge.component.html',
    styleUrls: ['../../Client/client-form/client-form.component.scss']
  })

  export class JudgeComponent implements OnInit {
  
  personName = 'Judge';
  customizedArray= 'customReport' ;
  columnToSorted= 'judgeID';
  filter= 'Judge';
  tableArray='Judge';
  addLink = "/reports/judge/new";
  navigateTo = '/reports/judge/details';
  isSearchAny = true;
  breadcrumbs = [
    { label: 'Person Types', href: "/reports/person/types", active: '' },
    { label: 'Client', href: "", active: 'active' },
  ];
  columnDefs = [];
  rowData = [];
  defaultColDef;
  initial = 1;
  end = 100;
  fillField;
  columnDropdownList = [];
  sortcolumnDropdownList = [];

  @ViewChild('agGrid', { static: false }) agGrid: AgGridNg2;

  @Input()
  Sidenav: boolean;
  reportsViewList;
  button: {};
  showForm: boolean = false;
  hideLoader: boolean = true;
  headers = [];
  rawdata = [];
  totalCount: any;
  beginPagination: any = 1;
  endPagination: any = 100;
  loaderController: boolean = false;
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

  constructor(public clildFormService: ClildFormService,
    public router: Router,
    public exportService: ExportService,
    public _referralView: ReferralViewService,
    public _pageSize: PagesizeService) {
  }

  ngOnInit() {
    this.getPerson(this.initial, this.end);
  }

  isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  add() {
    this.router.navigate(['/reports/judge/new']);
  }

  goToMenu() {
    this.router.navigate(['/reports/person/types']);
  }

  getPerson(initial: any, end: any) {
    this.columnDropdownList = [];
    this.sortcolumnDropdownList = [];
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let rowData = []
    this.headers = [];
    this.rawdata = [];
    this.hideLoader = false;
    this.personData['filter'] = 'Judge';
    this.personData['group by'] = 'All';
    this.personData['beginPagination'] = initial;
    this.personData['endPagination'] = end;
    this.personData['sort']?this.personData['sort']:this.personData['sort'] = {
      "column": "judgeID",
      "mode": "desc"
    }
    this.clildFormService.getPerson(this.personData).then(data => {
      loader.style.display = 'none';
      this.hideLoader = true;
      this.totalCount = data.totalCount
      this.reportsViewList = data.Judge;
      this.numericColumns = data.dataTypes;
      this.rowData = data['Judge']?data['Judge']:data['customReport'];
      this.rowData.map(data => {
        data.changedDate = data.changedDate !== null ? new Date(data.changedDate).toLocaleDateString() : '';
        data.enteredDate = data.enteredDate !== null ? new Date(data.enteredDate).toLocaleDateString() : '';
        rowData.push(data);
      });
      this.headers.push(Object.keys(this.rowData[0]))
      this.headers[0].map(data => {
        this.sortcolumnDropdownList.push({ label: data, value: data })
        this.columnDropdownList.push({ label: data, value: data })
      })
      let test = []
      this.headers[0].forEach(function (result) {
        let data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result }
        test.push(data)
      })
      this.rawdata.push(test)
      this.columnDefs = this.rawdata[0]
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
    }) 
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

  onRowSelected(event) {
    this._referralView.getClientReferralRelatedDetails(event.data.judgeID, event.data.FirstName + ' ' + event.data.LastName)
    this.clildFormService.storeId(event.data.judgeID);
    this.router.navigate(['/reports/judge/details']);
  }

  exportToExcel() {
    this.exportService.exportAsExcelFile(this.reportsViewList, 'Judge');
  }

  exportAsCsv() {
    this.exportService.exportAsCSVFile(this.reportsViewList, 'Judge', true);
  }

  exportAll(ex: any) {
    this.loaderController = true
    let file;
    if (ex == 'excel') {
      file = 'Excel'
    } else {
      file = 'Csv'
    }
    let data =
    {
      "filter": "Judge",
      "group by": "All",
      "action": "exportAll",
      "file": file,
      "reportName": "Judge"
    }
    this.clildFormService.getPerson(data).then(result => {
      this.loaderController = false
      if (result.responseStatus === true) {
        window.location.href = result.filePath;
      }
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




