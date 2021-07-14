import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Constants } from '../../../constants';
import { PouchDbService } from '../../../providers/pouchdb.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { from } from "rxjs";
import { SearchAllclientComponent } from '../../search-allclient/search-allclient.component';
import { MatDialog, MatSnackBar } from "@angular/material";
import { DatePipe } from "@angular/common";
import { MultiClientComponent } from "../../multi-client/multi-client.component";
import { CaseActivity } from './caseActivity';
const TWO_SECONDS = 2000;
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import _ from 'lodash';

@Component({
  selector: 'case-activity',
  templateUrl: './case-activity.component.html',
  styleUrls: ['./case-activity.component.scss', './../forms-common.scss']
})
@Injectable()
export class CaseActivityComponent implements OnInit {
  caseActivity: CaseActivity = new CaseActivity();

  personType = new FormControl();
  contactTypeField = new FormControl();
  procodeTypeField = new FormControl();
  @Input() model: any;
  @Input() ispdfStarts: any;
  options: string[];
  contactTypeOptions: string[];
  procodeOptions: string[];
  filteredOptions: any[];
  contactFilteredOptions: Observable<string[]>;
  multiClientArr: any = [];
  clientname: string;
  staffName: string;
  date: string;
  docId: string;
  personTypeId: any;
  referralTypeID: any;
  procodeIdList = [];
  filteredProcodeList = [];
  referralKey = [];
  datePipe: DatePipe = new DatePipe('en-US');
  procodeArr = [];
  showMultiClient: boolean;
  showClient: boolean;
  multiClient: any = [];
  loading: boolean = false;
  search: string;
  facts: string;
  clientID: string;
  showProcode: boolean;
  contactType: any;
  personTypeProcodeArr = [];
  personArr = [];
  contactArr = [];
  leftSide; rightSide;
  constructor(private route: ActivatedRoute, private pouchDBService: PouchDbService,
    private snackBar: MatSnackBar, public dialog: MatDialog,
    private formEditor: FormEditorComponent) {
  }


  getProcodeByReferralTypeId() {
    switch (this.model.referralTypeID) {
      case 1 || 6 || 20:
        this.referralKey = ['isFCCaseActivity', 'isReintegration'];
        break;
      case 2:
        this.referralKey = ['isFamilyPres', 'isFPCaseActivity'];
        break;
      case 4:
        this.referralKey = ['isNCFCH'];
        break;
      case 5:
        this.referralKey = ['isNCFICaseActivity', 'isNCFI'];
        break;
      case 7:
        this.referralKey = ['isNCRFC', 'isNCRFCCaseActivity'];
        break;
      case 8:
        this.referralKey = ['isNCHS'];
        break;
      case 9:
        this.referralKey = ['isNCOPS'];
        break;
      case 10:
        this.referralKey = ['isNCFCHOK', 'isNCFCHOKCaseActivity'];
        break;
      case 11:
        this.referralKey = ['isNCMHR'];
        break;
      case 12:
        this.referralKey = ['isNCFCHNE', 'isNCFCHNECaseActivity'];
        break;
      case 13:
        this.referralKey = ['isNCKIPP'];
        break;
      case 15:
        this.referralKey = ['isBHOK', 'isBHOKCaseActivity'];
        break;
      case 16:
        this.referralKey = ['isNCBHOK', 'isNCBHOKCaseActivity'];
        break;
      default:
        console.log('default');
        break;
    }
  }
  allClient() {
    this.showClient = true;
  }
  client() {
    let clients;
    this.loading = true;
    if (this.model.multiClientValue === 'By Facts') {
      this.showClient = false;
      clients = from(this.pouchDBService.searchMultiClientsByFact(this.model.facts.value, this.model.clientId));
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
  setClient(client: any) {
    this.referralTypeID = client.referralTypeID;
    this.model.referralTypeID = this.referralTypeID;
    this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.clientId = client.clientID;
    this.model.Kaecses.value = client.kaecses;
    this.model.facts.value = client.facts;
    this.model.referralId = client.referralid;
    this.showMultiClient = true;
    this.model.showMultiClient = this.showMultiClient;

    if (client.facts === null || client.facts === undefined || client.facts === '') {
      this.model.facts.value = 'NA';
    }
  }
  displayClientName() {
    return this.model.ClientName.value;
  }
  getPersonType(data1) {
    this.filteredOptions = [];
    this.personArr.filter((data: any) => {
      if (data.personType.toLowerCase().indexOf(data1) !== -1) {
        this.filteredOptions.push(data.personType);
      }
    });
  }
  getPersonTypeID() {
    this.personArr.filter((data: any) => {
      if (data.personType.toLowerCase().indexOf(this.model.personTypeField.value) !== -1) {
        if (data.personType === this.model.personTypeField.value) {
          this.personTypeId = data.personTypeID;
        }
      }
    });
  }

  getContactType(data1) {
    this.contactTypeOptions = [];
    this.contactArr.filter((data: any) => {
      if (data.contactType.toLowerCase().indexOf(data1) !== -1) {
        this.contactTypeOptions.push(data.contactType);
      }
    });
  }

  getProcodeFinalValue() {
    let procodeID = [];
    this.getPersonTypeID();
    this.personTypeProcodeArr.filter((obj) => {
      if (obj.personTypeID === this.personTypeId) {
        procodeID.push(obj.procodeID);
      }
    });
    this.procodeIdList = procodeID;
    this.model.procodeIdList = this.procodeIdList;
  }

  getProcode() {
    this.procodeOptions = [];
    let loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.getProcodeFinalValue();
    this.getProcodeByReferralTypeId();
    this.model.procodeIdList.map((procodeList) => {
      this.procodeArr.filter((filteredData) => {
        if (this.referralKey.length === 1) {
          if ((filteredData.procodeID === procodeList) && (filteredData[this.referralKey[0]] === true)) {
            if ((filteredData.beginDate <= new Date(this.model.begindate.value)) && ((filteredData.endDate >= new Date(this.model.enddate.value)) || (filteredData.endDate === null))) {
              this.filteredProcodeList.push(filteredData);
            }
          }
        } else if (this.referralKey.length === 2) {
          if ((filteredData.procodeID === procodeList) && (filteredData[this.referralKey[0]] === true) && (filteredData[this.referralKey[1]] === true)) {
            if ((filteredData.beginDate <= new Date(this.model.begindate.value)) && ((filteredData.endDate >= new Date(this.model.enddate.value)) || (filteredData.endDate === null))) {
              this.filteredProcodeList.push(filteredData);
            }
          }
        }
      })
    })
    let procodeList = [];
    this.filteredProcodeList.map(data => {
      procodeList.push(data.procode + " - " + data.categoryOfService)
    })
    this.procodeOptions = procodeList;
    this.procodeOptions = this.procodeOptions.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });
    loader.style.display = 'none';
    this.model.contactType = this.model.contactTypeField.value;
    this.model.personType = this.model.personTypeField.value;
  }

  ngOnInit() {
    localStorage.removeItem('dataList');
    localStorage.removeItem('setFacts');
    localStorage.removeItem('dataListClientId');
    this.procodeArr = JSON.parse(localStorage.getItem('procode')).procode;
    this.personArr = JSON.parse(localStorage.getItem('personType')).personType;
    this.contactArr = JSON.parse(localStorage.getItem('contactType')).contactType;
    this.personTypeProcodeArr = JSON.parse(localStorage.getItem('personTypeProcode')).personTypeProcode;
    let date = Date.now();
    this.date = moment(date).format('YYYY-MM-DD');
    this.docId = this.route.snapshot.paramMap.get('docId');
    // if its a new form
    if (!this.docId) {
      // staff detials
      this.pouchDBService.getUser().then(data => {
        if (data) {
          this.staffName = data.staffName + data.lastName;
          this.model.Signature.value = this.staffName;
          this.model.staffName = this.staffName;
        } else {
          console.log('No User Information Found');
        }
      }).catch(error => {
        console.log('Error in retieving user information', error);
      });

      this.model.name = Constants.PROGRAMS.REINTEGRATION.FORMS.CASE_ACTIVITY;
      this.model.program = Constants.PROGRAMS.REINTEGRATION.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      this.model.multiClientValue = '';
      this.model.multiClient = '';
      Object.assign(this.model, {
        'ClientName': {
          'value': ''
        },
        'facts': {
          'value': ''
        },
        'begindate': {
          'value': ''
        },
        'Kaecses': {
          'value': ''
        },
        'enddate': {
          'value': ''
        },
        'procodeTypeField': {
          'value': ''
        },
        'contactTypeField': {
          'value': ''
        },
        'Signature': {
          'value': ''
        },
        'staffNotes': {
          'value': ''
        },
        'personTypeField': {
          'value': ''
        },
        'personType': {
          'value': ''
        }

      });
    }
  }

  finalize() {
    let value = [];
    this.caseActivity.valueArr.map((val) => {
      if (this.model[`${val}`].value === '') {
        val = _.startCase(val);
        value.push(val);
      }
    })
    if (value.length > 0) {
      this.dialog.open(AlertDialogComponent, {
        data: { labels: value }
      });
    } else {
      this.validateBeforeFinalize();
      this.formEditor.finalize();
    }
  }

  validateBeforeFinalize() {
    let splitProcode = this.model.procodeTypeField.value.split(" -");
    this.model.proCode = splitProcode[0];
    let beginTimestamp = new Date(this.model.begindate.value);
    let endTimestamp = new Date(this.model.enddate.value);
    this.model.beginDate = moment(beginTimestamp).format('YYYY-MM-DD HH:mm:ss.SSS');
    this.model.endDate = moment(endTimestamp).format('YYYY-MM-DD HH:mm:ss.SSS');
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

  getFormatedDateTime(date) {
    return moment(date).format("MM/DD/YYYY h:mm A");
  }
  // showTimeValidate = false;
  // timeValidate(event) {
  //   console.log("this.model.FromTime>>>", this.model.begindate)
  //   console.log("event>>>", event)
  //   if (this.model.begindate.value === event) {
  //     this.showTimeValidate = true;
  //     setTimeout(() => {
  //       this.showTimeValidate = false;
  //     }, 5000);
  //     setTimeout(() => {
  //       this.model.enddate.value = "";
  //     }, 1000);
  //   } else {

  //   }
  // }
  showTimeValidate = false;
  showTimeValidate_greater: boolean;
  timeValidate(event) {
    // var startTimeArray = this.model.FromTime.value.split(':');
    // var endTimeArray = event.split(':');
    if (this.model.begindate.value === event) {
      this.showTimeValidate = true;
      setTimeout(() => {
        this.showTimeValidate = false;
      }, 5000);
      setTimeout(() => {
        this.model.enddate.value = "";
      }, 1000);
    } else if (this.model.begindate.value > event) {
      this.showTimeValidate_greater = true;
      setTimeout(() => {
        this.showTimeValidate_greater = false;
      }, 5000);
      setTimeout(() => {
        this.model.enddate.value = "";
      }, 1000);
    } else {

    }
  }
}
