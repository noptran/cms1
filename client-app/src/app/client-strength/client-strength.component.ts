import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-client-strength',
  templateUrl: './client-strength.component.html',
  styleUrls: ['./client-strength.component.scss']
})
export class ClientStrengthComponent implements OnInit {


  personName = 'Client Strength';
  customizedArray = 'customReport' ;
  columnToSorted = 'clientStrengthID';
  filter = 'clientStrength';
  tableArray = 'openCardList';
  addLink = '/reports/client-strength/new';
  navigateTo = '/reports/client-strength/details';
  requestObject = 'ClientStrength';
  columnDefs = [];
  rowData = [];
  master = 'opencardByClientStrength';
  clientId: any;
  addtionData: any;
  defaultColDef;
  initial = 1;
  end = 100;
  breadcrumbs = [];




  constructor() { }

  ngOnInit() {
    this.breadcrumbs.push(
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Client Strength List', active: 'active' },
    );
  }





}
