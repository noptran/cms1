import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { FormSelectorDialog } from './../form-selector-dialog/form-selector-dialog';
import { PouchDbService } from './../../../providers/pouchdb.service';
import { NetworkService } from './../../../providers/network.service';
import { ConfirmationDialog } from '../../confirmation-dialog/confirmation-dialog.component';
import { filter } from 'rxjs/operators';

export interface FormsHistory {
    name: string;
    staff: string;
    created: string;
    completed: string;
    status: string;
}
const TWO_SECONDS = 2000;
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'forms-listing',
    templateUrl: './forms-listing.component.html',
    styleUrls: ['forms-listing.component.scss']
})
export class FormsListingComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = ['index', 'name', 'staffName', 'ClientName', 'created', 'updated', 'completed', 'status', 'error', 'actions'];
    dataSource: MatTableDataSource<any>;
    dateFormat: string = 'MMM dd yyy hh:mm aa';
    db: any;
    totalRecords: Number;
    isOnline = this.networkService.isOnline();
    docType: string;
    noRecordsFound: boolean;
    forms: Object[] = [{
        'Reintegration': ['Adoptive Resource Inquiry',
            'Case Activity',
            'Court Appearance Log',
            'Initial Family-Team Meeting w Informed Consent',
            'Maternal and Paternal Relative Form',
            'Parent-Child Visitation Log Form',
            'Permanency Release or Change of Status',
            'Worker Child Visit Activity Note',
            'Worker Parent Visit Activity Log']
    }, {
        'Family Preservation': ['FP Supervisory Staffing']
    }, {
        'Foster Care Homes': ['Reintegration Foster Care Placement Support Plan']
    }, {
        'Oklahoma': ['Guide for Monthly Resource Home Contact']
    }, {
        'Behavioral Assessments': [
            'ASQ 2 Months',
            'ASQ 6 Months',
            'ASQ 12 Months',
            'ASQ 18 Months',
            'ASQ 24 Months',
            'ASQ 30 Months',
            'ASQ 36 Months',
            'ASQ 48 Months',
            'ASQ 60 Months',
            'CAFAS',
            'CROPS',
            'CSDC',
            'NCFAS',
            'PECFAS',
            'PSI']
    }];
    constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private pouchDbService: PouchDbService, private networkService: NetworkService, private snackBar: MatSnackBar) {

    }

    ngOnInit() {
        this.db = this.pouchDbService.getFormsDB();
        this.networkService.getStatus().subscribe(message => {
            this.isOnline = (message.status === 'online');
        });
        this.docType = this.route.snapshot.paramMap.get('type') || ':all';
        this.listFormData();

        // refresh the data during a route change
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((e: RouterEvent) => {
            this.docType = this.route.snapshot.paramMap.get('type') || ':all';
            this.listFormData();
        });
    }

    openFormsSelector(): void {
        const dialogRef = this.dialog.open(FormSelectorDialog, {
            data: {
                forms: this.forms,
                selectedNavbarValue: this.route.snapshot.paramMap.get('type')
            }
        });

        // On close, navigate to the forms page
        dialogRef.afterClosed().subscribe(selectedForm => {
            if (selectedForm) {
                this.router.navigate(['/home/form/' + selectedForm]);
            }
        });
    }

    setDataInView(docs) {
        docs.length < 1 ? this.noRecordsFound = true : this.noRecordsFound = false;
        this.totalRecords = docs.length;
        docs.sort(function (createdDateA, createdDateB) {
            createdDateA.created = new Date(createdDateA.created);
            createdDateB.created = new Date(createdDateB.created)
            return createdDateB.created - createdDateA.created;
        });
        this.dataSource = new MatTableDataSource(docs);
        this.dataSource.paginator = this.paginator;
    }

    filterForms(val) {
        val = val.trim();
        val = val.toLowerCase();
        this.dataSource.filter = val;
    }

    async listFormData() {
        let handleError = (err) => {
            console.error('Error in retrieving docs from pouchdb', err);
            this.snackBar.open('Error retrieving documents from the database', 'OK');
        }

        let program: String;
        if (this.docType !== ':all') {
            program = this.route.snapshot.paramMap.get('type').replace(':', '');
            this.pouchDbService.getFormsByProgram(program)
                .then((result) => {
                    this.setDataInView(result);
                })
                .catch((err) => {
                    handleError(err);
                })
        } else {
            this.pouchDbService.getForms()
                .then((result) => {
                    this.setDataInView(result);
                }).catch((err) => {
                    handleError(err);
                });
        }
    }

    deleteDoc(element) {
        const confirmationDialog = this.dialog.open(ConfirmationDialog);
        confirmationDialog.afterClosed().subscribe(async (result) => {
            if (result === true) {
                try {
                    let doc = await this.db.get(element._id);
                    await this.db.remove(doc);
                    this.snackBar.open('Document deleted', 'OK', { duration: TWO_SECONDS });
                    this.listFormData();
                } catch (ex) {
                    console.error('Error removing document from the database', ex);
                    this.snackBar.open('Error removing document from the database', 'OK');
                }
            }
        });
    }

    editDoc(element) {
        localStorage.setItem('selectedForm', element.name);    
        this.router.navigate(['/home/form/' + this.docType + '/edit/' + element._id]);
    }
}
