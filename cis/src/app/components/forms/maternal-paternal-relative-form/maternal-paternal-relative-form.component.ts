import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '../../../constants';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { PouchDbService } from '../../../providers/pouchdb.service';
import * as moment from 'moment';
import { MultiClientComponent } from "../../multi-client/multi-client.component";
import { SearchAllclientComponent } from '../../search-allclient/search-allclient.component';
import { from } from "rxjs";
import { DatePipe } from "@angular/common";
import { MatSnackBar } from "@angular/material";
import { MatDialog } from "@angular/material/dialog";
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import {MaternalPaternal} from './maternalPaternal';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
const TWO_SECONDS = 2000;

@Component({
  selector: 'maternal-paternal-relative-form',
  templateUrl: './maternal-paternal-relative-form.component.html',
  styleUrls: ['./maternal-paternal-relative-form.component.scss', './../forms-common.scss']
})
export class MaternalPaternalRelativeFormComponent implements OnInit {
  maternalpaternal: MaternalPaternal = new MaternalPaternal();
  @Input() model: any;
  date: string;
  docId: string;
  ClientName: string;
  staffName: string;
  clientDOB: string;
  multiClientArr: any = [];
  showMultiClient: boolean;
  datePipe: DatePipe = new DatePipe('en-US');
  facts: string;
  clientID: string;
  multiClient: any = [];
  loading: boolean = false;
  search: string;
  showClient: boolean;
  isFinalize = false;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, 
    private pouchDBService: PouchDbService, private snackBar: MatSnackBar,
    private formEditor: FormEditorComponent) {

  }
  allClient() {
    this.showClient = true;
  }
  setClient(client: any) {
    this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.clientId = client.clientID;
    this.model.Kaecses.value = client.kaecses;
    this.model.DateOfBirth.value = client.dob;
    this.clientDOB = client.dob;
    this.model.Facts.value = client.facts;
    this.model.facts = client.facts;
    this.model.referralId = client.referralid;
    this.showMultiClient = true;
    this.model.showMultiClient = this.showMultiClient;
  }
  client() {
    let clients;
    this.loading = true;
    if (this.model.multiClientValue === 'By Facts') {
      this.showClient = false;
      clients = from(this.pouchDBService.searchMultiClientsByFact(this.model.facts, this.model.clientId));
    } else if (this.model.multiClientValue === 'By All clients') {
      if (!this.search) {
        this.snackBar.open('Please enter a last name', 'OK', { duration: TWO_SECONDS });
        return;
      }
      this.search = this.search.toLowerCase();
      clients = from(this.pouchDBService.searchMultiClientsByAllClients(this.search));
    }
    let loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    clients.subscribe((clients: any) => {
      if (clients.length === 0) {
        loader.style.display = 'none';
        this.snackBar.open('There is no clients matching this fact number', 'OK', { duration: TWO_SECONDS });
        return;
      }
      clients = clients.map((client: any) => {
        client.dob ? client.dob = this.datePipe.transform(client.dob, 'mediumDate').toString() : '';
        client.beginDate ? client.beginDate = this.datePipe.transform(client.beginDate, 'mediumDate').toString() : '';
        client.endDate ? client.endDate = this.datePipe.transform(client.endDate, 'mediumDate').toString() : '';
        return client;
      });

      if (this.model.multiClientValue === 'By Facts') {
        loader.style.display = 'none';
        const searchResults = this.dialog.open(MultiClientComponent, {
          width: '1200px',
          data: { multiClients: clients }
        });
        searchResults.afterClosed().subscribe(result => {
          result = localStorage.getItem('dataList');
          this.model.AdditionalClients = localStorage.getItem('dataListClientId').split(',').map(Number);
          this.model.AdditionalClients.push(this.model.clientId);
          this.multiClient = result.split(',');
          this.model.multiClient = this.multiClient;
          this.model.multiClientArr = JSON.parse(localStorage.getItem('dataListArr'));
          this.model.multiClientArr.push({ 'clientId': this.model.clientId, 'referralId': this.model.referralId })
          this.model.AdditionalRefClients = this.model.multiClientArr;
        })
      } else if (this.model.multiClientValue === 'By All clients') {
        loader.style.display = 'none';
        const searchResults = this.dialog.open(SearchAllclientComponent, {
          width: '1200px',
          data: { clientList: clients }
        });
        searchResults.afterClosed().subscribe(result => {
          result = localStorage.getItem('dataList');
          this.model.AdditionalClients = localStorage.getItem('dataListClientId').split(',').map(Number);
          this.model.AdditionalClients.push(this.model.clientId);
          this.multiClient = this.multiClient.concat(result.split(','));
          this.model.multiClient = this.multiClient;
          this.model.multiClientArr = JSON.parse(localStorage.getItem('dataListArr'));
          this.model.multiClientArr.push({ 'clientId': this.model.clientId, 'referralId': this.model.referralId })
          this.model.AdditionalRefClients = this.model.multiClientArr;
        })
      }
    });
  }

  displayClientName() {
    return this.model.ClientName.value;
  }
  ngOnInit() {
    localStorage.removeItem('dataList');
    localStorage.removeItem('setFacts');
    localStorage.removeItem('dataListClientId'); let date = Date.now();
    this.date = moment(date).format('YYYY-MM-DD');
    this.docId = this.route.snapshot.paramMap.get('docId');

    // if its a new form
    if (!this.docId) {

      // staff detials
      this.pouchDBService.getUser().then(data => {
        if (data) {
          this.staffName = data.staffName + data.lastName;
          this.model.staffName = this.staffName;
          this.model.StaffName.value = this.staffName;
        } else {
          console.log('No User Information Found');
        }
      }).catch(error => {
        console.log('Error in retieving user information', error);
      });

      this.model.name = Constants.PROGRAMS.REINTEGRATION.FORMS.MATERNAL_AND_PATERNAL_RELATIVE_FORM7_21_16;
      this.model.program = Constants.PROGRAMS.REINTEGRATION.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = 'Maternal and Paternal Relative Form';
      Object.assign(this.model, {
        'ClientName': {
          'value': ''
        },
        'Kaecses': {
          'value': ''
        },
        'CompletionDate': {
          'value': this.date
        },
        'DateOfBirth': {
          'value': ''
        },
        // 'ClientName1': {
        //   'value': ''
        // },
        // 'ClientName2': {
        //   'value': ''
        // },
        // 'ClientName3': {
        //   'value': ''
        // },
        // 'ClientName4': {
        //   'value': ''
        // },
        // 'ClientName5': {
        //   'value': ''
        // },
        // 'ClientName6': {
        //   'value': ''
        // },
        // 'ClientName7': {
        //   'value': ''
        // },
        // 'ClientName8': {
        //   'value': ''
        // },
        'Facts': {
          'value': ''
        },
        'StaffName': {
          'value': ''
        },
        'ReviewDate': {
          'value': ''
        },
        'Relation1': {
          'value': ''
        },
        'Relation2': {
          'value': ''
        },
        'Relation3': {
          'value': ''
        },
        'Relation4': {
          'value': ''
        },
        'Relation5': {
          'value': ''
        },
        'Relation6': {
          'value': ''
        },
        'Relation7': {
          'value': ''
        },
        'Relation8': {
          'value': ''
        },
        'Relation9': {
          'value': ''
        },
        'Relation10': {
          'value': ''
        },
        'Relation11': {
          'value': ''
        },
        'MaternalPaternal1': {
          'fieldOptionIndex': ''
        },
        'MaternalPaternal2': {
          'fieldOptionIndex': ''
        },
        'MaternalPaternal3': {
          'fieldOptionIndex': ''
        },
        'MaternalPaternal4': {
          'fieldOptionIndex': ''
        },
        'MaternalPaternal5': {
          'fieldOptionIndex': ''
        },
        'MaternalPaternal6': {
          'fieldOptionIndex': ''
        },
        'MaternalPaternal7': {
          'fieldOptionIndex': ''
        },
        'MaternalPaternal8': {
          'fieldOptionIndex': ''
        },
        'MaternalPaternal9': {
          'fieldOptionIndex': ''
        },
        'MaternalPaternal10': {
          'fieldOptionIndex': ''
        },
        'MaternalPaternal11': {
          'fieldOptionIndex': ''
        },
        'Name1': {
          'value': ''
        },
        'Name2': {
          'value': ''
        },
        'Name3': {
          'value': ''
        },
        'Name4': {
          'value': ''
        },
        'Name5': {
          'value': ''
        },
        'Name6': {
          'value': ''
        },
        'Name7': {
          'value': ''
        },
        'Name8': {
          'value': ''
        },
        'Name9': {
          'value': ''
        },
        'Name10': {
          'value': ''
        },
        'Name11': {
          'value': ''
        },
        'Address1': {
          'value': ''
        },
        'Address2': {
          'value': ''
        },
        'Address3': {
          'value': ''
        },
        'Address4': {
          'value': ''
        },
        'Address5': {
          'value': ''
        },
        'Address6': {
          'value': ''
        },
        'Address7': {
          'value': ''
        },
        'Address8': {
          'value': ''
        },
        'Address9': {
          'value': ''
        },
        'Address10': {
          'value': ''
        },
        'Address11': {
          'value': ''
        },
        'phone1': {
          'value': ''
        },
        'phone2': {
          'value': ''
        },
        'phone3': {
          'value': ''
        },
        'phone4': {
          'value': ''
        },
        'phone5': {
          'value': ''
        },
        'phone6': {
          'value': ''
        },
        'phone7': {
          'value': ''
        },
        'phone8': {
          'value': ''
        },
        'phone9': {
          'value': ''
        },
        'phone10': {
          'value': ''
        },
        'phone11': {
          'value': ''
        },
        'LiveWithRelative1': {
          'fieldOptionIndex': ''
        },
        'LiveWithRelative2': {
          'fieldOptionIndex': ''
        },
        'LiveWithRelative3': {
          'fieldOptionIndex': ''
        },
        'LiveWithRelative4': {
          'fieldOptionIndex': ''
        },
        'LiveWithRelative5': {
          'fieldOptionIndex': ''
        },
        'LiveWithRelative6': {
          'fieldOptionIndex': ''
        },
        'LiveWithRelative7': {
          'fieldOptionIndex': ''
        },
        'LiveWithRelative8': {
          'fieldOptionIndex': ''
        },
        'LiveWithRelative9': {
          'fieldOptionIndex': ''
        },
        'LiveWithRelative10': {
          'fieldOptionIndex': ''
        },
        'LiveWithRelative11': {
          'fieldOptionIndex': ''
        },
        'Comment1': {
          'value': ''
        },
        'Comment2': {
          'value': ''
        },
        'Comment3': {
          'value': ''
        },
        'Comment4': {
          'value': ''
        },
        'Comment5': {
          'value': ''
        },
        'Comment6': {
          'value': ''
        },
        'Comment7': {
          'value': ''
        },
        'Comment8': {
          'value': ''
        },
        'Comment9': {
          'value': ''
        },
        'Comment10': {
          'value': ''
        },
        'Comment11': {
          'value': ''
        },
        'InitialAssessment': {
          'value': ''
        }
      });
    }
  }
  resetForm() {
    this.formEditor.resetForm();
  }
  calculateForm() {
    this.formEditor.calculateForm();
  }
  saveForm() {
    this.formEditor.saveForm();
  }
  finalize() {
    let value = [];
    this.maternalpaternal.valueArr.map((val) => {
      if (this.model[`${Object.keys(val)[0]}`].value === '') {
        value.push(Object.values(val)[0]);
      }
    });
    this.maternalpaternal.optionIndex.map((val) => {
      if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '') {
        value.push(Object.values(val)[0]);
      }
    });
    if (value.length > 0) {
      this.dialog.open(AlertDialogComponent, {
        data: { labels: value }
      });
    } else {
      this.isFinalize = true;
      this.formEditor.finalize();
    }
  }
}
