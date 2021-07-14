import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-third-party-liability-list',
  templateUrl: './third-party-liability-list.component.html',
  styleUrls: ['./third-party-liability-list.component.scss']
})
export class ThirdPartyLiabilityListComponent implements OnInit {

  personName = 'Third Party Liabilites';
  customizedArray= 'customReport' ;
  columnToSorted= 'clientTPLID';
  filter:any;
  tableArray = 'ClientTPL';
  addLink = "/reports/thirdparty/liability/new";
  navigateTo = '/reports/thirdparty/liability/details';
  requestObject = 'ClientAllergies';
  columnDefs = [];
  rowData = [];
  master = 'TPL';
  clientId:any;
  addtionData:any;
  defaultColDef;
  initial = 1;
  end = 100;
  breadcrumbs = [];


  constructor() { }

  ngOnInit() {
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/person/types", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'TPL List',active:'active' },
    ) 
  }



}
