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
import {Ncfas} from './ncfas';
import { AlertDialogComponent } from '../../forms/alert-dialog/alert-dialog.component';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
@Component({
  selector: 'ncfas-form',
  templateUrl: './ncfas-form.component.html',
  styleUrls: ['./ncfas-form.component.scss', '../../forms/forms-common.scss']
})
export class NCFASFormComponent implements OnInit {
  ncfas: Ncfas = new Ncfas();
  @Input() model: any;
  docId: string;
  date: string;
  staffName: string;
  staffId: string;
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
  constructor( public dialog: MatDialog,
    private formEditor: FormEditorComponent, private route: ActivatedRoute, 
    private pouchDBService: PouchDbService, private snackBar: MatSnackBar) {

  }
  input(n: number): any[] {
    return Array(n);
  }
  setClient(client: any) {
    this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.clientId = client.clientID;
    this.model.referralId = client.referralid;        
    this.model.Facts.value = client.facts;
    this.showMultiClient = true;
    this.model.showMultiClient = this.showMultiClient;
  }
  disableValidationProcess() {
    if (this.model.disableValidate === true) {
      Object.assign(this.model, {
        'multiClient': [],
        'ParentName': {
          'value': ''
        },
        'CompletionDate': {
          'value': ''
        },
        'StaffName': {
          'value': ''
        },
        'AssessmentReason': {
          'fieldOptionIndex': ''
        },
        'EnvironmentHousingStability': {
          'fieldOptionIndex': ''
        },
        'EnvironmentRisks': {
          'fieldOptionIndex': ''
        },
        'EnvironmentSafety': {
          'fieldOptionIndex': ''
        },
        'EnvironmentHabitability': {
          'fieldOptionIndex': ''
        },
        'EnvironmentHygiene': {
          'fieldOptionIndex': ''
        },
        'EnvironmentLearning': {
          'fieldOptionIndex': ''
        },
        'EnvironmentOverall': {
          'fieldOptionIndex': ''
        },
        'EnvironmentComment': {
          'value': ''
        },
        'ClientName2': {
          'value': ''
        },
        'ClientName3': {
          'value': ''
        },
        'ClientName4': {
          'value': ''
        },
        'ClientName5': {
          'value': ''
        },
        'ClientName6': {
          'value': ''
        },
        'ParentalCapabilitiesComment': {
          'value': ''
        },
        'FamilyInteractionsBonding': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsCommunication': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsExpectation': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsSupport': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsRelationshipCaregiver': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsRoutines': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsRecreation': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsOverall': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsComment': {
          'value': ''
        },
        'FamilySafetyDomesticViolence': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyConflict': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyAbuse': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyEmotionalAbuse': {
          'fieldOptionIndex': ''
        },
        'FamilySafetySexualAbuse': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyNeglect': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyWeapons': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyOverall': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyComment': {
          'value': ''
        },
        'ChildWellBeingBehavior': {
          'fieldOptionIndex': ''
        },
        'ChildWellBeingSchool': {
          'fieldOptionIndex': ''
        },
        'ChildWellBeingRelationshipParents': {
          'fieldOptionIndex': ''
        },
        'ChildWellBeingSiblings': {
          'fieldOptionIndex': ''
        },
        'ChildWellBeingPeers': {
          'fieldOptionIndex': ''
        },
        'ChildWellBeingMaintainFamily': {
          'fieldOptionIndex': ''
        },
        'ChildWellBeingOverall': {
          'fieldOptionIndex': ''
        },
        'ChildWell': {
          'value': ''
        },
        'SocialCommunityLifeSocial': {
          'fieldOptionIndex': ''
        },
        'SocialCommunityLifeExtracurricular': {
          'fieldOptionIndex': ''
        },
        'SocialCommunityLifeNeighborhood': {
          'fieldOptionIndex': ''
        },
        'SocialCommunityLifeSpirtual': {
          'fieldOptionIndex': ''
        },
        'SocialCommunityLifeHelp': {
          'fieldOptionIndex': ''
        },
        'SocialCommunityLifeOverall': {
          'fieldOptionIndex': ''
        },
        'SocialCommunityLifeComment': {
          'value': ''
        },
        'SelfSuffciencyEmployment': {
          'fieldOptionIndex': ''
        },
        'SelfSuffciencyIncome': {
          'fieldOptionIndex': ''
        },
        'SelfSuffciencyManagement': {
          'fieldOptionIndex': ''
        },
        'SelfSuffciencyFood': {
          'fieldOptionIndex': ''
        },
        'SelfSuffciencyTransportation': {
          'fieldOptionIndex': ''
        },
        'SelfSuffciencyOverall': {
          'fieldOptionIndex': ''
        },
        'Self': {
          'value': ''
        },
        'FamilyHealthParentsHealth': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthParentsDisabilaty': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthParentsMentalHealth': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthChildrensHealth': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthChildrensDisabilty': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthChildrensMentalHealth': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthAccessToMentalHealth': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthOverall': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthComment': {
          'value': ''
        },
        'CaregiverChildAmbivalenceParentAmbivalenceChild': {
          'fieldOptionIndex': ''
        },
        'CaregiverChildAmbivalenceChildAmbvialenceParent': {
          'fieldOptionIndex': ''
        },
        'CaregiverChildAmbivalenceSubCareProvider': {
          'fieldOptionIndex': ''
        },
        'CaregiverChildAmbivalenceDisruptedAttachment': {
          'fieldOptionIndex': ''
        },
        'CaregiverChildAmbivalencePreUnificationVisits': {
          'fieldOptionIndex': ''
        },
        'CaregiverChildAmbivalenceOverall': {
          'fieldOptionIndex': ''
        },
        'CaregiverChildAmbivalenceComment': {
          'value': ''
        },
        'ReadinessforReunificationCPS': {
          'fieldOptionIndex': ''
        },
        'ReadinessforReunificationCompletion': {
          'fieldOptionIndex': ''
        },
        'ReadinessforReunificationLegal': {
          'fieldOptionIndex': ''
        },
        'ReadinessforReunificationTreatmentNeeds': {
          'fieldOptionIndex': ''
        },
        'ReadinessforReunificationBackup': {
          'fieldOptionIndex': ''
        },
        'ReadinessforReunificationOverall': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesSupervision': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesDisciplinary': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesDevelopment': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesDrugs': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesEducation': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesMedia': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesLiteracy': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesOverall': {
          'fieldOptionIndex': ''
        },
        'TextField2': {
          'value': ''
        },
        'title': {
          'value': ''
        },
        'date': {
          'value': ''
        },
      });
    } else {
      Object.assign(this.model, {
        'remarks': {
          'value': ''
        }
      });
    }
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
      clients = from(this.pouchDBService.searchMultiClientsByFact(this.model.Facts.value, this.model.clientId));
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
          this.model.setFacts = localStorage.getItem('setFacts').split(',');
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
          this.model.setFacts = localStorage.getItem('setFacts').split(',');
          this.model.multiClientArr = JSON.parse(localStorage.getItem('dataListArr'));
          this.model.multiClientArr.push({ 'clientId': this.model.clientId, 'referralId': this.model.referralId })
          this.model.AdditionalRefClients = this.model.multiClientArr;
        })
      }
    });
  }
  environmentData: any = ['1. Housing Stability',
    '2. Safety in the Community',
    '3. Environmental Risks',
    '4. Habitability of Housing',
    '5. Personal Hygiene',
    '6. Learning Environment',
    '7. Overall Environment'];
  parentCapabilities: any = ['1. Supervision of Child(ren)',
    '2. Disciplinary Practices',
    '3. Provision of Developmental/Enrichment Opportunities',
    '4. Use of Drugs/Alcohol Interferes with Parenting',
    '5. Promotes Child(ren)’s Education',
    '6. Controls Access to Media/Reading Material',
    '7. Parent(s)/Caregiver(s)’s Literacy',
    '8. Overall Parental Capabilities'];
  familyInteraction: any = ['1. Bonding with Child(ren)',
    '2. Communication with Child(ren)',
    '3. Expectations of Child(ren)',
    '4. Mutual Support Within the Family',
    '5. Relationship Between Parents/Caregivers',
    '6. Family Routines/Rituals',
    '7. Family Recreation and Play Activities',
    '8. Overall Family Interactions'];
  violence: any = ['1. Absence/Presence of Domestic Violence Between Parents/Caregivers',
    '2. Absence/Presence of Other Family Conflict',
    '3. Absence/Presence of Physical Abuse of Child(ren)',
    '4. Absence/Presence of Emotional Abuse of Child(ren)',
    '5. Absence/Presence of Sexual Abuse of Child(ren)',
    '6. Absence/Presence of Neglect of Child(ren)',
    '7. Absence/Presence of Access to Weapons',
    '8. Overall Family Safety'];
  childWellBeing: any = [`1. Child(ren)'s Behavior`,
    '2. School Performance',
    `3. Child(ren)'s Relationship with Parent(s)/Caregiver(s)`,
    `4. Child(ren)'s Relationship with Sibling(s)`,
    `5. Child(ren)'s Relationship with Peers`,
    '6. Cooperation/Motivation to Maintain the Family',
    '7. Overall Child Well-Being'];
  relationships: any = ['1. Social relationships',
    '2. Relationships with Child Care, Schools, and Extracurricular Services',
    '3. Connection to Neighborhood, Cultural/Ethnic Community',
    '4. Connection to Spiritual/Religious Community',
    `5. Parent(s)/Caregiver(s)'s Initiative and Acceptance of Available Help/Support`,
    '6. Overall Child Well-Being'];
  selfSufficiency: any = ['1. Caregiver Employment',
    '2. Family Income',
    '3. Financial Management',
    '4. Food and Nutrition',
    '5. Transportation',
    '6. Overall Child Well-Being'];
  familyHealth: any = [`1. Parent(s)/Caregiver(s)'s Physical Health`,
    `2. Parent(s)/Caregiver(s)'s Disability`,
    `3. Parents(s)/Caregiver(s)'s Mental Health`,
    `4. Child(ren)'s Physical Health`,
    `5. Child(ren)'s Disability`,
    `6. Child(ren)'s Mental Health`,
    '7. Family Access to Health/Mental Health Care',
    '8. Overall Family Health'];
  careGiver: any = ['1. Parent/Caregiver Ambivalence Toward Child',
    '2. Child Ambivalence Towards Parent/Caregiver',
    '3. Ambivalence Exhibited By Substitute Care Provider',
    '4. Disrupted Attachment',
    '5. Pre-Reunification Home Visitations',
    '6. Overall Caregiver/Child Ambivalence'];
  reunification: any = ['1. Resolution of Significant CPS Risk Factors',
    '2. Completion of Case Service Plans',
    '3. Resolution of Legal Issues',
    '4. Parent/Caregiver Understanding of Child Treatment Needs',
    '5. Established Back-Up Supports and/or Service Plans',
    '6. Overall Readiness for Reunification'];

  ngOnInit() {
    localStorage.removeItem('dataList');
    localStorage.removeItem('setFacts');
    localStorage.removeItem('dataListClientId'); let date = Date.now();
    this.date = moment(date).format('YYYY-MM-DD');
    this.docId = this.route.snapshot.paramMap.get('docId');
    // staff detials
    this.pouchDBService.getUser().then(data => {
      if (data) {
        this.staffId = data.userId;
        this.staffName = data.staffName + data.lastName;
        this.model.staffName = this.staffName;
        this.model.Signature.value = this.staffName;
      } else {
        console.log('No User Information Found');
      }
    }).catch(error => {
      console.log('Error in retieving user information', error);
    });
    // if its a new form
    if (!this.docId) {
      this.model.name = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.NCFAS7_17_17;
      this.model.program = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      this.model.validationFields = [];
      this.model.disableValidationFields = ['ClientName', 'remarks']

      Object.assign(this.model, {
        'ClientName': {
          'value': ''
        },
        'ParentName': {
          'value': ''
        },
        'AssessmentReason': {
          'fieldOptionIndex': ''
        },
        'EnvironmentHousingStability': {
          'fieldOptionIndex': ''
        },
        'EnvironmentRisks': {
          'fieldOptionIndex': ''
        },
        'EnvironmentSafety': {
          'fieldOptionIndex': ''
        },
        'EnvironmentHabitability': {
          'fieldOptionIndex': ''
        },
        'EnvironmentHygiene': {
          'fieldOptionIndex': ''
        },
        'EnvironmentLearning': {
          'fieldOptionIndex': ''
        },
        'EnvironmentOverall': {
          'fieldOptionIndex': ''
        },
        'EnvironmentComment': {
          'value': ''
        },
        'DateOfIntake': {
          'value': ''
        },
        'DateOfCasePlan1': {
          'value': ''
        },
        'DateOfCasePlan2': {
          'value': ''
        },
        'DateOfReunification': {
          'value': ''
        },
        'DateOfClosure': {
          'value': ''
        },
        'Facts': {
          'value': ''
        },
        'ClientName2': {
          'value': ''
        },
        'ClientName3': {
          'value': ''
        },
        'ClientName4': {
          'value': ''
        },
        'ClientName5': {
          'value': ''
        },
        'ClientName6': {
          'value': ''
        },
        'CompletionDate': {
          'value': ''
        },
        'StaffName': {
          'value': ''
        },
        'ParentalCapabilitiesComment': {
          'value': ''
        },
        'FamilyInteractionsBonding': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsCommunication': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsExpectation': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsSupport': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsRelationshipCaregiver': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsRoutines': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsRecreation': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsOverall': {
          'fieldOptionIndex': ''
        },
        'FamilyInteractionsComment': {
          'value': ''
        },
        'FamilySafetyDomesticViolence': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyConflict': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyAbuse': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyEmotionalAbuse': {
          'fieldOptionIndex': ''
        },
        'FamilySafetySexualAbuse': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyNeglect': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyWeapons': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyOverall': {
          'fieldOptionIndex': ''
        },
        'FamilySafetyComment': {
          'value': ''
        },
        'ChildWellBeingBehavior': {
          'fieldOptionIndex': ''
        },
        'ChildWellBeingSchool': {
          'fieldOptionIndex': ''
        },
        'ChildWellBeingRelationshipParents': {
          'fieldOptionIndex': ''
        },
        'ChildWellBeingSiblings': {
          'fieldOptionIndex': ''
        },
        'ChildWellBeingPeers': {
          'fieldOptionIndex': ''
        },
        'ChildWellBeingMaintainFamily': {
          'fieldOptionIndex': ''
        },
        'ChildWellBeingOverall': {
          'fieldOptionIndex': ''
        },
        'ChildWell': {
          'value': ''
        },
        'SocialCommunityLifeSocial': {
          'fieldOptionIndex': ''
        },
        'SocialCommunityLifeExtracurricular': {
          'fieldOptionIndex': ''
        },
        'SocialCommunityLifeNeighborhood': {
          'fieldOptionIndex': ''
        },
        'SocialCommunityLifeSpirtual': {
          'fieldOptionIndex': ''
        },
        'SocialCommunityLifeHelp': {
          'fieldOptionIndex': ''
        },
        'SocialCommunityLifeOverall': {
          'fieldOptionIndex': ''
        },
        'SocialCommunityLifeComment': {
          'value': ''
        },
        'SelfSuffciencyEmployment': {
          'fieldOptionIndex': ''
        },
        'SelfSuffciencyIncome': {
          'fieldOptionIndex': ''
        },
        'SelfSuffciencyManagement': {
          'fieldOptionIndex': ''
        },
        'SelfSuffciencyFood': {
          'fieldOptionIndex': ''
        },
        'SelfSuffciencyTransportation': {
          'fieldOptionIndex': ''
        },
        'SelfSuffciencyOverall': {
          'fieldOptionIndex': ''
        },
        'Self': {
          'value': ''
        },
        'FamilyHealthParentsHealth': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthParentsDisabilaty': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthParentsMentalHealth': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthChildrensHealth': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthChildrensDisabilty': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthChildrensMentalHealth': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthAccessToMentalHealth': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthOverall': {
          'fieldOptionIndex': ''
        },
        'FamilyHealthComment': {
          'value': ''
        },
        'CaregiverChildAmbivalenceParentAmbivalenceChild': {
          'fieldOptionIndex': ''
        },
        'CaregiverChildAmbivalenceChildAmbvialenceParent': {
          'fieldOptionIndex': ''
        },
        'CaregiverChildAmbivalenceSubCareProvider': {
          'fieldOptionIndex': ''
        },
        'CaregiverChildAmbivalenceDisruptedAttachment': {
          'fieldOptionIndex': ''
        },
        'CaregiverChildAmbivalencePreUnificationVisits': {
          'fieldOptionIndex': ''
        },
        'CaregiverChildAmbivalenceOverall': {
          'fieldOptionIndex': ''
        },
        'CaregiverChildAmbivalenceComment': {
          'value': ''
        },
        'ReadinessforReunificationCPS': {
          'fieldOptionIndex': ''
        },
        'ReadinessforReunificationCompletion': {
          'fieldOptionIndex': ''
        },
        'ReadinessforReunificationLegal': {
          'fieldOptionIndex': ''
        },
        'ReadinessforReunificationTreatmentNeeds': {
          'fieldOptionIndex': ''
        },
        'ReadinessforReunificationBackup': {
          'fieldOptionIndex': ''
        },
        'ReadinessforReunificationOverall': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesSupervision': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesDisciplinary': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesDevelopment': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesDrugs': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesEducation': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesMedia': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesLiteracy': {
          'fieldOptionIndex': ''
        },
        'ParentalCapabilitiesOverall': {
          'fieldOptionIndex': ''
        },
        'TextField2': {
          'value': ''
        },
        'Signature': {
          'value': ''
        },
        'title': {
          'value': ''
        },
        'date': {
          'value': ''
        },
        'disableValidate': false,
        'remarks': {
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
    if (this.model.disableValidate === true) {
      this.model.disableValidationFields.filter(data => {
        if ((this.model[data].value === "") || (this.model[data].fieldOptionIndex === "")) {
          value.push(data);
        }
      });
    } else if (this.model.disableValidate === false) {
      this.ncfas.valueArr.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].value === '') {
          value.push(Object.values(val)[0]);
        }
      });
      this.ncfas.optionIndex.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '') {
          value.push(Object.values(val)[0]);
        }
      });
    }
    if (value.length > 0) {
      this.dialog.open(AlertDialogComponent, {
        data: { labels: value }
      });
    } else {
      this.isFinalize = true;
      this.formEditor.finalize();
    }
  }

  getFormatedDate(date) {
    return moment(date).format("MM/DD/YYY");
}
}
