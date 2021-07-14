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
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { WorkerParent } from './workerParent';
const TWO_SECONDS = 2000;
@Component({
  selector: 'worker-parent-visit-activity-form',
  templateUrl: './worker-parent-visit-activity-form.component.html',
  styleUrls: ['./worker-parent-visit-activity-form.component.scss', './../forms-common.scss']
})
export class WorkerParentVisitActivityFormComponent implements OnInit {
  workerParent: WorkerParent = new WorkerParent();
  @Input() model: any;
  docId: string;
  staffName: string;
  date: string;
  fromTime: string;
  showMultiClient: boolean;
  datePipe: DatePipe = new DatePipe('en-US');
  facts: string;
  clientID: string;
  multiClient: any = [];
  loading: boolean = false;
  search: string;
  showClient: boolean;
  proCode: string;
  multiClientArr: any = [];
  isFinalize = false;
  procodeBasedContact: any = [];
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
    this.model.facts = client.facts;
    this.showMultiClient = true;
    this.model.showMultiClient = this.showMultiClient;
    this.model.referralId = client.referralid;
    this.model.fact.value = client.facts;
    if (client.facts === null || client.facts === undefined || client.facts === '') {
      this.model.facts.value = 'NA'
    }
  }
  getValue(event) {
    console.log('event', event.target.value);
    if (event.target.value === 'CF069.1' || event.target.value === 'CF069.2') {
      this.procodeBasedContact = ['Worker/Parent - Mom', 'Worker/Parent - Dad', 'Worker/Parent - Mom and Dad', 'Worker/Parent - Guardian']
    } else if (event.target.value === 'CF069.3') {
      this.procodeBasedContact = ['Worker/Parent Efforts']
    }
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

    let currentTime = new Date(),
      hours = (currentTime.getHours() < 10 ? '0' : '') + currentTime.getHours(),
      mins = (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();
    this.fromTime = hours + ':' + mins;    // if its a new form
    if (!this.docId) {
      // staff detials
      this.pouchDBService.getUser().then(data => {
        if (data) {
          this.staffName = data.staffName + data.lastName;
          this.model.staffName = this.staffName;
          this.model.Worker_Signature.value = this.staffName;
        } else {
          console.log('No User Information Found');
        }
      }).catch(error => {
        console.log('Error in retieving user information', error);
      });
      // this.model.contactType = 'Worker/Parent';
      this.model.name = Constants.PROGRAMS.REINTEGRATION.FORMS.WORKED_PARENT_VISIT_ACTIVITY_LOG_TYPE_UNLOCKED;
      this.model.program = Constants.PROGRAMS.REINTEGRATION.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      Object.assign(this.model, {
        'ClientName': {
          'value': ''
        },
        'CompletionDate': {
          'value': ''
        },
        'FromTime': {
          'value': this.fromTime
        },
        'ToTime': {
          'value': ''
        },
        'CasePlanGoals': {
          'fieldOptionIndex': ''
        },
        'ListThosePresentAtVisit': {
          'value': ''
        },
        'LocationOfVisit': {
          'value': ''
        },
        'OthersLivingInHome': {
          'value': ''
        },
        'ChildrenLivingInTheRemovalHome': {
          'value': ''
        },
        'WhatFamilyMembersKinHaveaConnectionToTheChildAndProvideSupportToTheFamily': {
          'value': ''
        },
        'WhatFamilyMembersKinHaveaConnectionToTheChildAndProvideSupportToTheFamily1': {
          'value': ''
        },
        'WhatFamilyMembersKinHaveaConnectionToTheChildAndProvideSupportToTheFamily2': {
          'value': ''
        },
        'WhatFamilyMembersKinHaveaConnectionOngoingContact': {
          'value': ''
        },
        'WhatFamilyMembersKinHaveaConnectionOngoingContact1': {
          'value': ''
        },
        'WhatFamilyMembersKinHaveaConnectionOngoingContact2': {
          'value': ''
        },
        'WereAnySafetyRiskConcernsObservedOrDiscussedDuringThisMeetingDescription': {
          'value': ''
        },
        'HowWereSafetyRiskConcernsAddressed': {
          'value': ''
        },
        'WereAnySafetyRiskConcernsObservedOrDiscussedDuringThisMeeting': {
          'fieldOptionIndex': ''
        },
        'NarrativeSummary': {
          'value': ''
        },
        'date1': {
          'value': ''
        },
        'date2': {
          'value': ''
        },
        'date3': {
          'value': ''
        },
        'date4': {
          'value': ''
        },
        'date5': {
          'value': ''
        },
        'date6': {
          'value': ''
        },
        'date7': {
          'value': ''
        },
        'date8': {
          'value': ''
        },
        'date9': {
          'value': ''
        },
        'Worker_Signature': {
          'value': ''
        },
        'parent_Signature1': {
          'value': ''
        },
        'parent_Signature2': {
          'value': ''
        },
        'TasksForSFCSBeforeNextVisit': {
          'value': ''
        },
        'CasePlanTasks': {
          'value': ''
        },
        'RiskAssesmentDate': {
          'value': ''
        },
        'service_mitigate_concern': {
          'value': ''
        },
        'service_plan_reviewed': {
          'fieldOptionIndex': ''
        },
        'family_mitigate_risk': {
          'value': ''
        },
        'risk_concern_identified': {
          'value': ''
        },
        'risk_concern': {
          'value': ''
        },
        'safety_concern': {
          'value': ''
        },
        'OtherAttemptDetails': {
          'value': ''
        },
        'additionalriskconcernidentified': {
          'fieldOptionIndex': ''
        },
        'safetyplandevelopedorreviewed': {
          'fieldOptionIndex': ''
        },
        'reviewprogressfollow': {
          'value': ''
        },
        'contributingfactors': {
          'value': ''
        },
        'duedate1': {
          'value': ''
        },
        'duedate2': {
          'value': ''
        },
        'Tasksworker': {
          'value': ''
        },
        'Tasksparentnextvisit': {
          'value': ''
        },
        'casePlanLimit': {
          'value': ''
        },
        'progress': {
          'value': ''
        },
        'fact': {
          'value': ''
        },
        'parentName': {
          'value': ''
        },
        'MotherMentalHealthService': {
          'fieldOptionIndex': ''
        },
        'FatherMentalHealthService': {
          'fieldOptionIndex': ''
        },
        'SignificantMentalHealthService': {
          'fieldOptionIndex': ''
        },
        'MotherSubstanceAbuse': {
          'fieldOptionIndex': ''
        },
        'FatherSubstanceAbuse': {
          'fieldOptionIndex': ''
        },
        'SignificantSubstanceAbuse': {
          'fieldOptionIndex': ''
        },
        'MotherFormalService': {
          'fieldOptionIndex': ''
        },
        'FatherFormalService': {
          'fieldOptionIndex': ''
        },
        'SignificantOtherFormalServices': {
          'fieldOptionIndex': ''
        },
        'AssessmentsCurrentPSI': {
          'fieldOptionIndex': ''
        },
        'AssessmentsCurrentNCFAS': {
          'fieldOptionIndex': ''
        },
        'MotherMentalHealthServiceExplanation': {
          'value': ''
        },
        'FatherMentalHealthServiceExplanation': {
          'value': ''
        },
        'SignificantMentalHealthServiceExplanation': {
          'value': ''
        },
        'MotherSubstanceAbuseExplanation': {
          'value': ''
        },
        'FatherSubstanceAbuseExplanation': {
          'value': ''
        },
        'SignificantSubstanceAbuseExplanation': {
          'value': ''
        },
        'MotherFormalServiceExplanation': {
          'value': ''
        },
        'SignificantOtherFormalServicesExplanation': {
          'value': ''
        },
        'PermanencyDue': {
          'value': ''
        },
        'CourtHearing': {
          'value': ''
        },
        'FatherFormalServiceExplanation': {
          'value': ''
        },
        'FamilyPossibleLocation': {
          'fieldOptionIndex': ''
        },
        'CertifiedLetter': {
          'fieldOptionIndex': ''
        },
        'SearchedOnlineParent': {
          'fieldOptionIndex': ''
        },
        'NotifiedCourt': {
          'fieldOptionIndex': ''
        },
        'ContactedChild': {
          'fieldOptionIndex': ''
        },
        'OtherAttempt': {
          'fieldOptionIndex': ''
        },
        'SafetyAssessmentsafety_concern': {
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
    this.workerParent.valueArr.map((val) => {
      if (this.model[`${Object.keys(val)[0]}`].value === '') {
        value.push(Object.values(val)[0]);
      }
    });
    this.workerParent.optionIndex.map((val) => {
      if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '') {
        value.push(Object.values(val)[0]);
      }
    });
    this.workerParent.singleArr.map((val) => {
      if (this.model[`${Object.keys(val)[0]}`] === '') {
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
