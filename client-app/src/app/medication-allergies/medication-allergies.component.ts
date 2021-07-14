import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medication-allergies',
  templateUrl: './medication-allergies.component.html',
  styleUrls: ['./medication-allergies.component.scss']
})
export class MedicationAllergiesComponent implements OnInit {

  personName = 'Client Medication';
  customizedArray= 'customReport' ;
  columnToSorted= 'clientMedicationID';
  filter:any;
  tableArray = 'openCardList';
  addLink = "/reports/medication-allergies/new";
  navigateTo = '/reports/medication-allergies/details';
  requestObject = 'ClientMedication';
  columnDefs = [];
  rowData = [];
  master = 'opencardByClientMedication';
  clientId:any;
  addtionData:any;
  defaultColDef;
  initial = 1;
  end = 100;
  breadcrumbs = [];


  constructor() { }

  ngOnInit() {
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Client Medication List', active:'active' },

    ) 
   }



}
