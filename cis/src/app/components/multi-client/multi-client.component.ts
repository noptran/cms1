import { Component, OnInit, Inject, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import _ from 'lodash';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-multi-client',
  templateUrl: './multi-client.component.html',
  styleUrls: ['./multi-client.component.scss']
})

export class MultiClientComponent {
  @Output() setClientAction = new EventEmitter();

  dataList: any = [];
  setFacts: any = [];
  dataListClientId: any = [];
  dataListArr: any = [];
  clientList: MatTableDataSource<any>;
  displayedColumns: string[] = ['actions', 'firstname', 'lastname', 'dob', 'ssn', 'clientID', 'kaecses', 'facts', 'gender', 'referralType', 'referralid', 'beginDate', 'endDate', 'age', 'status'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<MultiClientComponent>, @Inject(MAT_DIALOG_DATA) public data: any, ) {
    this.data.multiClients.map((item) => {
      item.lastname = item.lastname.charAt(0).toUpperCase() + item.lastname.slice(1);

      if (item.endDate === null) {
        item.status = 'open';
      } else {
        item.status = 'close';
      }
      if (!isNullOrUndefined(item.dob)) {
        let diff = Date.now() - Date.parse(item.dob);
        let age = new Date(diff);
        item.age = Math.abs(age.getUTCFullYear() - 1970);
        // age in months
        let currentDate = new Date();
        let birthDate = new Date(item.dob);
        let ageInMonths = currentDate.getFullYear() - birthDate.getFullYear();
        let month = currentDate.getMonth() - birthDate.getMonth();
        ageInMonths = ageInMonths * 12 + month;
        item.ageInMonths = ageInMonths;
      }
      if (item.age === 0) {
        item.age = item.ageInMonths + ' ' + 'month';
      }
    })
    if (sessionStorage.getItem('selectedForm') === 'ASQ 2 Months' || sessionStorage.getItem('selectedForm') === 'ASQ 6 Months'
      || sessionStorage.getItem('selectedForm') === 'ASQ 12 Months' || sessionStorage.getItem('selectedForm') === 'ASQ 18 Months'
      || sessionStorage.getItem('selectedForm') === 'ASQ 24 Months' || sessionStorage.getItem('selectedForm') === 'ASQ 30 Months'
      || sessionStorage.getItem('selectedForm') === 'ASQ 36 Months' || sessionStorage.getItem('selectedForm') === 'ASQ 48 Months'
      || sessionStorage.getItem('selectedForm') === 'ASQ 60 Months') {
      this.data.clientList = this.data.clientList.filter((item) => {
        if (item.ageInMonths < 37) {
          return item;
        }
      });
    } else if (sessionStorage.getItem('selectedForm') === 'PECFAS') {
      this.data.clientList = this.data.clientList.filter((item) => {
        if ((item.ageInMonths >= 37) && (item.ageInMonths <= 72)) {
          return item;
        }
      });
    } else if ((sessionStorage.getItem('selectedForm') === 'CAFAS') || (sessionStorage.getItem('selectedForm') === 'CROPS')) {
      this.data.clientList = this.data.clientList.filter((item) => {
        if ((item.ageInMonths >= 73) && (item.ageInMonths <= 216)) {
          return item;
        }
      });
    }
    this.clientList = new MatTableDataSource(this.data.multiClients);
  }

  ngAfterViewInit() {
    this.clientList.paginator = this.paginator;
    this.clientList.sort = this.sort;
  }

  onFilterChange(val, element) {
    if (val.checked === true) {
      this.dataList.push(element.lastname + ' ' + element.firstname);
      this.setFacts.push(element.facts);
      this.dataListClientId.push(element.clientID);
      let arr = { 'clientId': element.clientID, 'referralId': element.referralid };
      this.dataListArr.push(arr);

    } else if (val.checked === false) {
      let index = this.dataList.indexOf(element.lastname + ' ' + element.firstname);
      let id = this.dataListClientId.indexOf(element.clientID);
      this.dataListArr.indexOf({ 'clientId': element.clientID, 'referralId': element.referralid });
      this.setFacts.indexOf(element.facts);
      if (index > -1) {
        this.dataList.splice(index, 1);
        this.dataListClientId.splice(index, 1);
        this.dataListArr.splice(index, 1);
        this.setFacts.splice(index, 1);
      }
    }
    localStorage.setItem('setFacts', this.setFacts);
    localStorage.setItem('dataList', this.dataList);
    localStorage.setItem('dataListClientId', this.dataListClientId);
    localStorage.setItem('dataListArr', JSON.stringify(this.dataListArr));
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
