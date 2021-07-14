import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-allergies',
  templateUrl: './client-allergies.component.html',
  styleUrls: ['./client-allergies.component.scss']
})
export class ClientAllergiesComponent implements OnInit {

    personName = 'Client Allergies';
    customizedArray = 'customReport' ;
    columnToSorted = 'clientAllergiesID';
    filter: any;
    tableArray = 'openCardList';
    addLink = '/reports/allergies/new';
    navigateTo = '/reports/allergies/details';
    requestObject = 'ClientAllergies';
    columnDefs = [];
    rowData = [];
    master = 'opencardByClient';
    clientId: any;
    addtionData: any;
    defaultColDef;
    initial = 1;
    end = 100;
    breadcrumbs = [];

  constructor() { }

  ngOnInit() {
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Client', href: '/reports/client/details', active: '' },
      { label: 'Medications List', active: '', href: '/reports/medication-allergies/view' },
      { label: 'Medications', href: '/reports/medication-allergies/details', active: ''},
      { label: 'Allergies List', active: 'active'},
    );
   }

}
