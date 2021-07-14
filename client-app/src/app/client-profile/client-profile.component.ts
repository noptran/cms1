import { Component, OnInit } from '@angular/core';
import { OpencardsService } from '../opecards-list-view/opencards.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {

  constructor(public _opencards: OpencardsService) { }

    personName = 'Client Profile';
    customizedArray = 'customReport' ;
    columnToSorted = 'clientProfileID';
    filter: any;
    tableArray = 'openCardList';
    addLink = '/reports/client/profile/new';
    navigateTo = '/reports/client/profile/details';
    requestObject = 'ClientProfile';
    columnDefs = [];
    rowData = [];
    master = 'opencardByClientProfile';
    clientId: any;
    addtionData: any;
    defaultColDef;
    initial = 1;
    end = 100;
    breadcrumbs = [];


  ngOnInit() {
    this.getClientDetails();
    this.breadcrumbs.push(
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Client Profile List', active: 'active' },
    );
  }


  /***
   * @returns Get the selected clientid
   */
  getClientDetails() {
    const encryptClientID = localStorage.getItem('clientId'), hasKey = this._opencards.getHasKey();
    this.addtionData =  parseInt(encryptClientID) - hasKey;
  }

}
