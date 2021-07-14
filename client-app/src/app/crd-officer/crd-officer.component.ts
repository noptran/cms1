import { Component, OnInit, ViewChild } from '@angular/core';
import { ClildFormService } from '../child-forms/child-forms.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { PagesizeService } from '../pagesize/pagesize.service';

@Component({
    selector: 'app-crd-officer',
    templateUrl: './crd-officer.component.html',
    styleUrls: ['../person-master/Client/client-form/client-form.component.scss']
})
export class CrdOfficerComponent implements OnInit {

    personName = 'CRB Coordinator';
    customizedArray = 'customReport' ;
    columnToSorted = 'CRBCoordinatorID';
    filter = 'CRBCoordinator';
    tableArray = 'CRBCoordinator';
    addLink = '/reports/crbOfficer/new';
    navigateTo = '/reports/crbOfficer/details';
    isSearchAny = true;
    columnDefs = [];
    rowData = [];
    defaultColDef;
    initial = 1;
    end = 100;
    fillField;
    columnDropdownList = [];
    sortcolumnDropdownList = [];

    breadcrumbs = [
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Client', href: '', active: 'active' },
    ];
    @ViewChild('agGrid', { static: false }) agGrid: AgGridNg2;

    groupedData = {};
    headers = [];
    rawdata = [];
    totalCount: any;
    beginPagination: any = 1;
    endPagination: any = 100;
    personData = {};
    sortcolumnDropdownL = [];
    hideLoader: boolean;
    numericColumns = [];
    numericHeaders = [];
    sortColumn;
    sortOrder;
    sortList = [
      { name: 'asc' },
      { name: 'desc' },
      { name: 'no sort' }
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
              'column': this.sortColumn,
              'mode': this.sortOrder.name
            };
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
        return this._router.navigate(['/reports/crbOfficer/new']);
    }

    goToMenu() {
        return this._router.navigate(['/reports/person/types']);
    }

    getPerson(initial: any, end: any) {
        const loader = document.getElementById('loading-overlay') as HTMLElement;
        loader.style.display = 'block';
        this.headers = [];
        this.rawdata = [];
        const rowData = [];
        initial = initial;
        this.hideLoader = false;
        end = end;
        this.personData['filter'] = 'CRBCoordinator';
        this.personData['group by'] = 'All';
        this.personData['beginPagination'] = initial;
        this.personData['endPagination'] = end;
        this.personData['sort'] ? this.personData['sort'] : this.personData['sort'] = {
          'column': 'crbcoordinatorID',
          'mode': 'desc'
        };

        // req = {
        //     "filter": "CRBCoordinator",
        //     "group by": "All",
        //     "beginPagination": initial,
        //     "endPagination": end,
        //     "action": "NaN",
        //     "sort": { "column": "crbcoordinatorID", "mode": "desc" }
        // };
        this._person.getPerson(this.personData).then(data => {
            loader.style.display = 'none';
            this.hideLoader = true;
            this.totalCount = data.totalCount;
            if (this.totalCount < 100) {
                this.end = this.totalCount;
            }
            this.rowData = data['CRBCoordinator'];
            this.rowData.map(data => {
                data.enteredDate = data.enteredDate !== null ? new Date(data.enteredDate).toLocaleDateString() : '';
                rowData.push(data);
              });
            this.headers.push(Object.keys(this.rowData[0]));
            const test = [];
            this.headers[0].forEach(function (result) {
                const data = { headerName: (result.replace(/\b\w/g, l => l.toUpperCase())).replace(/([A-Z])/g, ' $1').trim(), field: result };
                test.push(data);
            });
            this.headers[0].map(data => {
                this.sortcolumnDropdownList.push({ label: data, value: data });
                this.columnDropdownList.push({ label: data, value: data });
              });
            this.rawdata.push(test);
            this.columnDefs = this.rawdata[0];
        });
    }


    onRowSelected(event) {
        this._person.storeId(event.data.CRBCoordinatorID);
        return this._router.navigate(['/reports/crbOfficer/details']);
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
