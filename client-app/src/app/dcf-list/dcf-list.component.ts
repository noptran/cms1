import { Component, OnInit } from '@angular/core';
import { ClildFormService } from '../child-forms/child-forms.service';
import { PagesizeService } from '../pagesize/pagesize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dcf-list',
  templateUrl: './dcf-list.component.html',
  styleUrls: ['./dcf-list.component.scss']
})
export class DcfListComponent implements OnInit {

  personName = 'DCF';
  customizedArray = 'customReport' ;
  columnToSorted = 'srsstaffID';
  filter = 'dcfStaff';
  tableArray = 'SRSStaff';
  addLink = '/reports/dcf/new';
  navigateTo = '/reports/dcf/details';
  isSearchAny = true;
  columnDefs = [];
  rowData = [];
  defaultColDef;
  initial = 1;
  end = 100;
  hideLoader = true;
  headers = [];
  rawdata = [];
  totalCount: any;
  breadcrumbs = [
    { label: 'Person Types', href: '/reports/person/types', active: '' },
    { label: 'Client', href: '', active: 'active' },
  ];

  constructor(public _person: ClildFormService, public _pageSize: PagesizeService, public _router: Router) { }

  ngOnInit() {
    this.getPerson(1, 100);
  }

  getPerson(initial: any, end: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    let req;
    loader.style.display = 'block';
    const rowData = [];
    this.headers = [];
    this.rawdata = [];
    this.hideLoader = false;
    initial = initial;
    end = end;
    req = {
      'filter': 'dcfStaff',
      'group by': 'All',
      'beginPagination': initial,
      'endPagination': end,
      'action': 'NaN',
      'sort': { 'column': 'srsstaffID', 'mode': 'desc' }
    };
    this._person.getPerson(req).then(data => {
      loader.style.display = 'none';
      this.hideLoader = true;
      this.totalCount = data.totalCount;
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
      this.rowData = data['SRSStaff'];
      this.rowData.map(data => {
        data.dob = data.dob !== 0 ? new Date(data.dob).toLocaleDateString() : '';
        rowData.push(data);
      });
      this.headers.push(Object.keys(this.rowData[0]));
      const test = [];
      this.headers[0].forEach(function (result) {
        const data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result };
        test.push(data);
      });
      this.rawdata.push(test);
      this.columnDefs = this.rawdata[0];
    });
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

  add() {
    return this._router.navigate(['/reports/dcf/new']);
  }

  goToMenu() {
    return this._router.navigate(['/reports/person/types']);
  }

}
