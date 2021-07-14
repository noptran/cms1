import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-referral-list-view',
  templateUrl: './referral-list-view.component.html',
  styleUrls: ['./referral-list-view.component.scss']
})
export class ReferralListViewComponent implements OnInit {

    personName = 'Cases';
    customizedArray= 'customReport' ;
    columnToSorted= 'referralID';
    filter:any;
    tableArray = 'openCardList';
    addLink = "/reports/referral/family-preservation/new";
    navigateTo = '/reports/referral/family-preservation/detail';
    requestObject = 'Case';
    columnDefs = [];
    rowData = [];
    master = 'opencardByClient';
    clientId:any;
    addtionData:any;
    defaultColDef;
    initial = 1;
    end = 100;

  constructor() { }

  

  ngOnInit() { }

}
