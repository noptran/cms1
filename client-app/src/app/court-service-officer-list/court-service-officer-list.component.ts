import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-court-service-officer-list',
  templateUrl: './court-service-officer-list.component.html',
  styleUrls: ['./court-service-officer-list.component.scss']
})
export class CourtServiceOfficerListComponent implements OnInit {

  personName = 'Court Service Officer';
  customizedArray = 'customReport' ;
  columnToSorted = 'csvid';
  filter = 'courtServiceOfficer';
  tableArray = 'Csv';
  addLink = '/reports/court/service/officer/new';
  navigateTo = '/reports/court/service/officer/details';
  isSearchAny = true;
  breadcrumbs = [
    { label: 'Person Types', href: '/reports/person/types', active: '' },
    { label: 'Client', href: '', active: 'active' },
  ];

  constructor() { }

  ngOnInit() { }


}
