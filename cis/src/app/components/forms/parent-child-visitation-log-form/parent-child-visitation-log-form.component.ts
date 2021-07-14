import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Constants } from '../../../constants';
import { PouchDbService } from '../../../providers/pouchdb.service';
import * as moment from 'moment';
import { from } from "rxjs";
import { DatePipe } from "@angular/common";
import { MatSnackBar } from "@angular/material";
import { MatDialog } from "@angular/material/dialog";
import { MultiClientComponent } from "../../multi-client/multi-client.component";
import { SearchAllclientComponent } from '../../search-allclient/search-allclient.component';
const TWO_SECONDS = 2000;
import { ParentChildVisitation } from './parentChildVisitation';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
@Component({
  selector: 'parent-child-visitation-log-form',
  templateUrl: './parent-child-visitation-log-form.component.html',
  styleUrls: ['./parent-child-visitation-log-form.component.scss', './../forms-common.scss']
})
export class ParentChildVisitationLogFormComponent implements OnInit {
  parentChild: ParentChildVisitation = new ParentChildVisitation();
  @Input() model: any;
  docId: string;
  clientname: string;
  staffName: string;
  date: any;
  fromTime: string;
  showMultiClient: boolean;
  datePipe: DatePipe = new DatePipe('en-US');
  facts: string;
  clientID: string;
  multiClient: any = [];
  loading: boolean = false;
  search: string;
  showClient: boolean;
  multiClientArr: any = [];
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

      this.model.name = Constants.PROGRAMS.REINTEGRATION.FORMS.PARENT_CHILD_VISITATION_LOG_FORM;
      this.model.program = Constants.PROGRAMS.REINTEGRATION.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = 'Parent/Child';
      this.model.contactType = 'Parent/Child';
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
        'ToTime': {
          'value': ''
        },
        'VisitType': {
          'fieldOptionIndex': ''
        },
        'Location': {
          'fieldOptionIndex': ''
        },
        'LocationVisit': {
          'value': ''
        },
        'MonitoredVisitation': {
          'value': ''
        },
        'ParentsHome': {
          'value': ''
        },
        'VisitTypePerson': {
          'value': ''
        },
        'ParentsEnvironment': {
          'value': ''
        },
        'AdultsVisit': {
          'value': ''
        },
        'SupervisedVisitation': {
          'value': ''
        },
        'AddressedVisit': {
          'value': ''
        },
        'SafetyConcerns': {
          'value': ''
        },
        'SafetyPlan': {
          'value': ''
        },
        'ServicePlanYesNo': {
          'fieldOptionIndex': ''
        },
        'SafetyPlans': {
          'value': ''
        },
        'reason': {
          'value': ''
        },
        'ListenedYesNo': {
          'fieldOptionIndex': ''
        },
        'HarshYesNo': {
          'fieldOptionIndex': ''
        },
        'SuppliesVisitYesNo': {
          'fieldOptionIndex': ''
        },
        'InterestYesNo': {
          'fieldOptionIndex': ''
        },
        'ChildAcceptedLimits': {
          'fieldOptionIndex': ''
        },
        'InteractionYesNo': {
          'fieldOptionIndex': ''
        },
        'FeelingsYesNo': {
          'fieldOptionIndex': ''
        },
        'RelationshipYesNo': {
          'fieldOptionIndex': ''
        },
        'SocialRewardsYesNo': {
          'fieldOptionIndex': ''
        },
        'PhysicalContactYesorNo': {
          'fieldOptionIndex': ''
        },
        'InteractionsYesNo': {
          'fieldOptionIndex': ''
        },
        'SupportChildYesNo': {
          'fieldOptionIndex': ''
        },
        'PositiveYesNo': {
          'fieldOptionIndex': ''
        },
        'WellbeingYesNo': {
          'fieldOptionIndex': ''
        },
        'AppropriateYesNo': {
          'fieldOptionIndex': ''
        },
        'ActivityYesNo': {
          'fieldOptionIndex': ''
        },
        'SafetyConcernsYesNo': {
          'fieldOptionIndex': ''
        },
        'safetyplan': {
          'fieldOptionIndex': ''
        },
        'serviceplan': {
          'fieldOptionIndex': ''
        },
        'summary1': {
          'value': ''
        },
        'Date': {
          'value': ''
        },
        'Signature': {
          'value': this.staffName
        },
        'adjustment': {
          'fieldOptionIndex': ''
        },
        'mitigate': {
          'value': ''
        },
        'ServiceCasePlan': {
          'value': ''
        },
        'FamilyMitigate': {
          'value': ''
        },
        'SafetyPlanYesNo': {
          'fieldOptionIndex': ''
        },
        'SafetyPlanVisitYesNo': {
          'fieldOptionIndex': ''
        },
        'SafetyPlanConcernsYesNo': {
          'fieldOptionIndex': ''
        },
        'SafetyPlanConcerns': {
          'value': ''
        },
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
    this.parentChild.valueArr.map((val) => {
      if (this.model[`${Object.keys(val)[0]}`].value === '') {
        value.push(Object.values(val)[0]);
      }
    });
    this.parentChild.optionIndex.map((val) => {
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

  getFormatedTime(time) {
    return moment(time, ["HH:mm"]).format("h:mm A");
  }
  // showTimeValidate = false;
  // timeValidate(event) {
  //   if (this.model.FromTime.value === event) {
  //     this.showTimeValidate = true;
  //     setTimeout(() => {
  //       this.showTimeValidate = false;
  //     }, 5000);
  //     setTimeout(() => {
  //       this.model.ToTime.value = "";
  //     }, 1000);
  //   } else {

  //   }
  // }
  showTimeValidate = false;
  showTimeValidate_greater: boolean;
  timeValidate(event) {
    var startTimeArray = this.model.FromTime.value.split(':');
    var endTimeArray = event.split(':');
    if (this.model.FromTime.value === event) {
      this.showTimeValidate = true;
      setTimeout(() => {
        this.showTimeValidate = false;
      }, 5000);
      setTimeout(() => {
        this.model.ToTime.value = "";
      }, 1000);
    } else if (startTimeArray[0] > endTimeArray[0]) {
      this.showTimeValidate_greater = true;
      setTimeout(() => {
        this.showTimeValidate_greater = false;
      }, 5000);
      setTimeout(() => {
        this.model.ToTime.value = "";
      }, 1000);
    } else {

    }
  }
}
