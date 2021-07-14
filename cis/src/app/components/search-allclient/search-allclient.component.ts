import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { PouchDbService } from "../../providers/pouchdb.service";
import { from } from "rxjs";
import { DatePipe } from "@angular/common";
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-search-allclient',
  templateUrl: './search-allclient.component.html',
  styleUrls: ['./search-allclient.component.scss']
})
export class SearchAllclientComponent {
  dataList: any = [];
  setFacts: any = [];
  dataListClientId: any = [];
  dataListArr: any = [];
  displayedColumns: string[] = ['actions', 'firstname', 'lastname', 'dob', 'ssn', 'clientID', 'kaecses', 'facts', 'gender', 'referralType', 'referralid', 'beginDate', 'endDate', 'age', 'status'];
  clientList: MatTableDataSource<any>;
  datePipe: DatePipe = new DatePipe('en_US');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<SearchAllclientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private pouchDbService: PouchDbService) {
    this.data.clientList.map((item) => {
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
    this.clientList = new MatTableDataSource(this.data.clientList);
  }

  ngAfterViewInit() {
    this.clientList.paginator = this.paginator;
    this.clientList.sort = this.sort;
  }

  onFilterChange(val, element) {
    if (val.checked === true) {
      this.dataListClientId.push(element.clientID);
      this.setFacts.push(element.facts);
      this.dataList.push(element.lastname + ' ' + element.firstname);
      let arr = { 'clientId': element.clientID, 'referralId': element.referralid };
      this.dataListArr.push(arr);
    } else if (val.checked === false) {
      let id = this.dataListClientId.indexOf(element.clientID);
      let index = this.dataList.indexOf(element.lastname + ' ' + element.firstname);
      this.dataListArr.indexOf({ 'clientId': element.clientID, 'referralId': element.referralid });
      this.setFacts.indexOf(element.facts);
      if (index > -1) {
        this.dataList.splice(index, 1);
        this.dataListClientId.splice(index, 1);
        this.dataListArr.splice(index, 1);
        this.setFacts.splice(index, 1);
      }
    }
    localStorage.setItem('dataList', this.dataList);
    localStorage.setItem('setFacts', this.setFacts);
    localStorage.setItem('dataListClientId', this.dataListClientId);
    localStorage.setItem('dataListArr', JSON.stringify(this.dataListArr));

  }

  filterClients(val) {
    val = val.trim();
    val = val.toLowerCase();
    this.clientList.filter = val;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
