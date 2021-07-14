import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MultiClientComponent } from "../../multi-client/multi-client.component";
import { SearchAllclientComponent } from '../../search-allclient/search-allclient.component';
import { Constants } from '../../../constants';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { PouchDbService } from '../../../providers/pouchdb.service';
import * as moment from 'moment';
import { from } from "rxjs";
import { DatePipe } from "@angular/common";
import { MatSnackBar } from "@angular/material";
import { MatDialog } from "@angular/material/dialog";
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { CourtApperance } from './courtApperance';
const TWO_SECONDS = 2000;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'court-apperance-log-form',
  templateUrl: './court-apperance-log-form.component.html',
  styleUrls: ['./court-apperance-log-form.component.scss', './../forms-common.scss']
})

export class CourtApperanceLogFormComponent implements OnInit {
  courtApperance: CourtApperance = new CourtApperance();
  @Input() model: any;
  date: any;
  docId: string;
  ClientName: string;
  staffName: string;
  fromTime: string;
  showMultiClient: boolean;
  showAllClient: boolean;
  datePipe: DatePipe = new DatePipe('en-US');
  facts: string;
  clientID: string;
  multiClient: any = [];
  multiClientArr: any = [];
  loading: boolean = false;
  search: string;
  showClient: boolean;
  disable: boolean;
  disableAll: boolean;
  isFinalize = false;
  constructor(public dialog: MatDialog, private route: ActivatedRoute,
    private pouchDBService: PouchDbService, private snackBar: MatSnackBar,
    private formEditor: FormEditorComponent) {

  }
  setClient(client: any) {
    this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.clientId = client.clientID;
    this.model.Kaecses.value = client.kaecses;
    this.model.facts = client.facts;
    this.model.referralId = client.referralid;
    this.showMultiClient = true;
    this.model.showMultiClient = this.showMultiClient;
  }
  displayClientName() {
    return this.model.ClientName.value;
  }
  allClient() {
    this.showClient = true;
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
      console.log('clientsa', clients);

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
        console.log('entered', clients);
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

  getJudgeValue(event) {
    if (event === 'NA' || event === 'NIL' || event === 'Not Available') {
      this.model.disable = true;
      this.model.NextHearingDate.value = null;
      this.model.NextHearingTime.value = null;
      this.model.NextHearingLocation.value = null;
    }
    else {
      this.model.disable = false;
    }
  }
  getTypeValue(event) {
    if (event === 'NA' || event === 'NIL' || event === 'Not Available') {
      this.model.disableAll = true;
      this.model.NextHearingDate.value = null;
      this.model.NextHearingTime.value = null;
      this.model.NextHearingLocation.value = null;
    }
    else {
      this.model.disableAll = false;
    }
  }
  ngOnInit() {
    localStorage.removeItem('dataList');
    localStorage.removeItem('setFacts');
    localStorage.removeItem('dataListClientId'); let date = Date.now();
    this.date = new Date();
    this.docId = this.route.snapshot.paramMap.get('docId');

    let currentTime = new Date(),
      hours = (currentTime.getHours() < 10 ? '0' : '') + currentTime.getHours(),
      mins = (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();
    this.fromTime = hours + ':' + mins;

    // if its a new form
    if (!this.docId) {

      // staff detials
      this.pouchDBService.getUser().then(data => {
        if (data) {
          this.staffName = data.staffName + data.lastName;
          this.model.staffName = this.staffName;
          this.model.Signature.value = this.staffName;
        } else {
          console.log('No User Information Found');
        }
      }).catch(error => {
        console.log('Error in retieving user information', error);
      });

      this.model.name = Constants.PROGRAMS.REINTEGRATION.FORMS.COURT_APPEARANCE_LOG6_23_16;
      this.model.program = Constants.PROGRAMS.REINTEGRATION.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      this.model.multiClientValue = '';
      this.model.multiClient = '';
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
        'FromTime': {
          'value': this.fromTime
        },
        'courtLocation': {
          'value': ''
        },
        'length': {
          'value': ''
        },
        'hearing': {
          'value': ''
        },
        'RadioButtonList': {
          'fieldOptionIndex': ''
        },
        'Judge1': {
          'value': ''
        },
        'SFSCStaff': {
          'value': ''
        },
        'CountyAtty': {
          'value': ''
        },
        'GAL': {
          'value': ''
        },
        'CASA': {
          'value': ''
        },
        'CSO': {
          'value': ''
        },
        'DCF': {
          'value': ''
        },
        'Children': {
          'value': ''
        },
        'Others': {
          'value': ''
        },
        'placement': {
          'value': ''
        },
        'Mother': {
          'value': ''
        },
        'MothersAtty': {
          'value': ''
        },
        'Father': {
          'value': ''
        },
        'FatherAtty': {
          'value': ''
        },
        'Grandparents': {
          'value': ''
        },
        'NotesAndRecommendations': {
          'value': ''
        },
        'Custody': {
          'value': ''
        },
        'Placement': {
          'value': ''
        },
        'Visitation': {
          'value': ''
        },
        'OtherOrders': {
          'value': ''
        },
        'NextHearingJudge': {
          'value': ''
        },
        'NextHearingType': {
          'value': ''
        },
        'NextHearingDate': {
          'value': ''
        },
        'NextHearingTime': {
          'value': ''
        },
        'NextHearingLocation': {
          'value': ''
        },
        'Signature': {
          'value': this.staffName
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
    this.courtApperance.valueArr.map((val) => {
      if (this.model[`${Object.keys(val)[0]}`].value === '') {
        value.push(Object.values(val)[0]);
      }
    });
    this.courtApperance.optionIndex.map((val) => {
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
      let date = moment(this.model.CompletionDate.value).format('YYYY-MM-DD');
      this.model.beginDate = date + " " + this.model.FromTime.value + ":00.000";
      this.model.endDate = date + " " + this.model.length.value + ":00.000";
      this.formEditor.finalize();
    }
  }
}