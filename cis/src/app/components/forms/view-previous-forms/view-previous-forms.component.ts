
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { FormSelectorDialog } from './../form-selector-dialog/form-selector-dialog';
import { PouchDbService } from './../../../providers/pouchdb.service';
import { NetworkService } from './../../../providers/network.service';
import { ConfirmationDialog } from '../../confirmation-dialog/confirmation-dialog.component';
import { filter } from 'rxjs/operators';
import * as moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormService } from '../../../providers/form.service';
export interface FormsHistory {
  name: string;
  staff: string;
  created: string;
  completed: string;
  status: string;
}
const TWO_SECONDS = 2000;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-view-previous-forms',
  templateUrl: './view-previous-forms.component.html',
  styleUrls: ['./view-previous-forms.component.scss', '../forms-listing/forms-listing.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ViewPreviousFormsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  date = new FormControl(moment());

  displayedColumns: string[] = ['index', 'FormName', 'StaffName', 'clientName', 'EnteredDate'];
  dataSource: MatTableDataSource<any>;
  dateFormat: string = 'MMM dd yyy hh:mm aa';
  db: any;
  totalRecords: Number;
  isOnline = this.networkService.isOnline();
  docType: string;
  noRecordsFound = true;

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute,
    private pouchDbService: PouchDbService, private networkService: NetworkService, private snackBar: MatSnackBar,
    private formService: FormService) {

  }

  ngOnInit() {
    this.db = this.pouchDbService.getFormsDB();
    this.networkService.getStatus().subscribe(message => {
      this.isOnline = (message.status === 'online');
    });
    if (this.isOnline) {
      this.listFormData();
    }
    // refresh the data during a route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((e: RouterEvent) => {
      if (this.isOnline) {
        this.listFormData();
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
    let req = {
      staffID: undefined,
      beginDate: `${moment(this.date.value).format('MM')}/01/${moment(this.date.value).format('YYYY')}`
    }
    this.pouchDbService.getUser().then(data => {
      if (data) {
        req.staffID = data.userId;
      }
      this.formService.getEarlierForms(req)
        .subscribe((response: any) => {
          this.setDataInView(JSON.parse(response._body).formsList);
        });
    });




    // let handleError = (err) => {
    //   console.error('Error in retrieving docs from pouchdb', err);
    //   this.snackBar.open('Error retrieving documents from the database', 'OK');
    // }

    // let program: String;
    // if (this.docType !== ':all') {
    //   program = this.route.snapshot.paramMap.get('type').replace(':', '');
    //   this.pouchDbService.getFormsByProgram(program)
    //     .then((result) => {
    //       this.setDataInView(result);
    //     })
    //     .catch((err) => {
    //       handleError(err);
    //     })
    // } else {
    //   this.pouchDbService.getForms()
    //     .then((result) => {
    //       this.setDataInView(result);
    //     }).catch((err) => {
    //       handleError(err);
    //     });
    // }
  }


  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    if (this.isOnline) {
      this.listFormData();
    } else {
      this.noRecordsFound = true;
    }
  }
}
