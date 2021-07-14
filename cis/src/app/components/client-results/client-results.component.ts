import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { PouchDbService } from "../../providers/pouchdb.service";
import { from } from "rxjs";
import { DatePipe } from "@angular/common";
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'client-results',
    templateUrl: './client-results.component.html',
    styleUrls: ['./client-results.component.scss']
})
export class ClientResultsComponent {
    displayedColumns: string[] = ['firstname', 'lastname', 'dob', 'ssn', 'clientID', 'kaecses', 'facts', 'gender', 'referralType', 'referralid', 'beginDate', 'endDate', 'age', 'status', 'actions'];
    clientList: MatTableDataSource<any>;
    datePipe: DatePipe = new DatePipe('en_US');
    selectedForm: string;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public dialogRef: MatDialogRef<ClientResultsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private pouchDbService: PouchDbService,
        private route: ActivatedRoute, ) {
        this.data.clientList.map((item) => {
            item.lastname = item.lastname.charAt(0).toUpperCase() + item.lastname.slice(1);

            if (isNullOrUndefined(item.endDate)) {
                item.status = 'open';
            } else {
                item.status = 'close'
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
        console.log('*****', sessionStorage.getItem('selectedForm'));
        console.log('this.data.clientList', this.data.clientList)
        this.clientList = new MatTableDataSource(this.data.clientList);
    }

    ngAfterViewInit() {
        this.clientList.paginator = this.paginator;
        this.clientList.sort = this.sort;
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