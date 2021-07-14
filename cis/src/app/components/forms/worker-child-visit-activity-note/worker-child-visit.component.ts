import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Constants } from '../../../constants';
import { PouchDbService } from '../../../providers/pouchdb.service';
import * as moment from 'moment';
import { from } from "rxjs";
import { SearchAllclientComponent } from '../../search-allclient/search-allclient.component';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material";
import { DatePipe } from "@angular/common";
import { MultiClientComponent } from "../../multi-client/multi-client.component";
import { FormEditorComponent } from '../../form-editor/form-editor.component';
const TWO_SECONDS = 2000;
import { WorkerChild } from './workerChild';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import _ from 'lodash';

@Component({
    selector: 'worker-child-activity-visit-note-form',
    templateUrl: './worker-child-visit.component.html',
    styleUrls: ['./worker-child-visit.component.scss', './../forms-common.scss']
})
export class WorkerChildVisitFormComponent implements OnInit {
    workerChild: WorkerChild = new WorkerChild();
    @Input() model: any;
    docId: string;
    clientname: string;
    staffName: string;
    date: string;
    fromTime: string;
    proCode: string;
    disable: boolean;
    showTargetDate: boolean;
    showMultiClient: boolean;
    showClient: boolean;
    multiClient: any = [];
    loading: boolean = false;
    search: string;
    facts: string;
    datePipe: DatePipe = new DatePipe('en-US');
    isFinalize = false;

    constructor(private route: ActivatedRoute, private pouchDBService: PouchDbService,
        private snackBar: MatSnackBar, public dialog: MatDialog,
        private formEditor: FormEditorComponent) {
    }
    onSearchChange(searchValue: string) {
        if (searchValue === 'NA' || searchValue === 'NIL' || searchValue === 'N.A' || searchValue === 'Not Available' || searchValue === 'N/A') {
            this.disable = true;
            this.model.TargetDate.value = null;
        }
        else {
            this.disable = false;
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
    onTargetDate(searchValue: string) {
        if (searchValue === 'NA' || searchValue === 'NIL' || searchValue === 'N.A' || searchValue === 'Not Available' || searchValue === 'N/A') {
            this.showTargetDate = true;
            this.model.TargetDate.value = null;
        }
        else {
            this.showTargetDate = false;
        }
    }
    setClient(client: any) {
        this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
        this.model.clientId = client.clientID;
        this.model.caseNo.value = client.kaecses;
        this.model.referralId = client.referralid;
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

    ngOnInit() {
        let date = Date.now();
        this.date = moment(date).format('YYYY-MM-DD');
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
            this.model.contactType = 'Worker/Child';
            this.model.name = Constants.PROGRAMS.REINTEGRATION.FORMS.WORKED_CHILD_VISIT_ACTIVITY_NOTE9_19_16;
            this.model.program = Constants.PROGRAMS.REINTEGRATION.SHORT_NAME;
            this.model.clientId = '';
            this.model.proCode = '';
            this.model.formName = Constants.PROGRAMS.REINTEGRATION.FORMS.WORKED_CHILD_VISIT_ACTIVITY_NOTE9_19_16;
            this.model.isPlacement = false;

            Object.assign(this.model, {
                'ClientName': {
                    'value': ''
                },
                'facts': {
                    'value': ''
                },
                'caseNo': {
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
                'Place': {
                    'value': ''
                },
                'presentAtVisit': {
                    'value': ''
                },
                'DidWorkerSpendTimeAloneWithChild': {
                    'fieldOptionIndex': ''
                },
                'PlacementSupportiveofMeeting': {
                    'fieldOptionIndex': ''
                },
                'DescriptionAndCommentsByChild': {
                    'value': ''
                },
                'casePlanGoal': {
                    'fieldOptionIndex': ''
                },
                'HomeIsFreeOfSafetyConcerns': {
                    'fieldOptionIndex': ''
                },
                'ChildsAppearanceIsHealthy': {
                    'fieldOptionIndex': ''
                },
                'HomeIsClean': {
                    'fieldOptionIndex': ''
                },
                'FreeFromUnusualMarksOrBruising': {
                    'fieldOptionIndex': ''
                },
                'homicidalThoughts': {
                    'fieldOptionIndex': ''
                },
                'suicidalThoughts': {
                    'fieldOptionIndex': ''
                },
                'caregiverProtectiveCapacity': {
                    'fieldOptionIndex': ''
                },
                'additionalSafetyConcerns': {
                    'fieldOptionIndex': ''
                },
                'placementEnvironment': {
                    'value': ''
                },
                'childAppearance': {
                    'value': ''
                },
                'interactionWithCaregiver': {
                    'value': ''
                },
                'safetyConcernsIndentified': {
                    'value': ''
                },
                'familySafetyMitigationStrengths': {
                    'value': ''
                },
                'safetyConcernsContributingFactors': {
                    'value': ''
                },
                'SafetyPlanReviewed': {
                    'fieldOptionIndex': ''
                },
                'Changeinplacementhousehold': {
                    'fieldOptionIndex': ''
                },
                'HeightandWeightappearnormal': {
                    'fieldOptionIndex': ''
                },
                'ChildHasAdequateSpace': {
                    'fieldOptionIndex': ''
                },
                'ChildisCleanNeatlyGroomed': {
                    'fieldOptionIndex': ''
                },
                'caregiverNaturalAndCommunitySupports': {
                    'fieldOptionIndex': ''
                },
                'ChildFeelsSafeAndTreatedWell': {
                    'fieldOptionIndex': ''
                },
                'caregiverDemonstratesAbilityToProvideCare': {
                    'fieldOptionIndex': ''
                },
                'displayedSelfHarmingBehavior': {
                    'fieldOptionIndex': ''
                },
                'displayedAgressiveBehavior': {
                    'fieldOptionIndex': ''
                },
                'additionalSafetyConcernsSinceLastVisit': {
                    'fieldOptionIndex': ''
                },
                'placementEnvironmentRiskSection': {
                    'value': ''
                },
                'childsAppearance': {
                    'value': ''
                },
                'interactionWithCaregiverRiskSection': {
                    'value': ''
                },
                'safetyConcernsSinceLastVisit': {
                    'value': ''
                },
                'serviceMitigateConcerns': {
                    'value': ''
                },
                'visitDetailsRiskSection': {
                    'value': ''
                },
                'HasInteractionsWithParents': {
                    'fieldOptionIndex': ''
                },
                'FeelsParentInteractionsAreGoingWell': {
                    'fieldOptionIndex': ''
                },
                'HasInteractionsWithSiblings': {
                    'fieldOptionIndex': ''
                },
                'FeelsSiblingInteractionsAreGoingWell': {
                    'fieldOptionIndex': ''
                },
                'MaintainingOtherImportantConnections': {
                    'fieldOptionIndex': ''
                },
                'AttendingSchoolRegularly': {
                    'fieldOptionIndex': ''
                },
                'AdjustingToSchoolSverageGrades': {
                    'fieldOptionIndex': ''
                },
                'AttendingMentalHealthAppointments': {
                    'fieldOptionIndex': ''
                },
                'TakingMedicationsAsPrescribed': {
                    'fieldOptionIndex': ''
                },
                'ReviewOfLifeSkillsTransitionPlan': {
                    'value': ''
                },
                'ReviewOfPermanencyPlanAfterCarePlanProgress': {
                    'value': ''
                },
                'LifeBookIsUpdated': {
                    'fieldOptionIndex': ''
                },
                'Participatesinextracurricular': {
                    'fieldOptionIndex': ''
                },
                'CaseTeamMember': {
                    'fieldOptionIndex': ''
                },
                'AdditionalRemarksPositivesOrConcerns': {
                    'value': ''
                },
                'Follow': {
                    'value': ''
                },
                'PersonResponsible': {
                    'value': ''
                },
                'TargetDate': {
                    'value': ''
                },
                'Medical': {
                    'fieldOptionIndex': ''
                },
                'Adequate': {
                    'fieldOptionIndex': ''
                },
                'medication': {
                    'value': ''
                },
                'appointments': {
                    'value': ''
                },
                'maintaining': {
                    'value': ''
                },
                'school': {
                    'value': ''
                },
                'information': {
                    'fieldOptionIndex': ''
                },
                'informationprovided': {
                    'fieldOptionIndex': ''
                },
                'Scheduled': {
                    'value': ''
                },
                'Signature': {
                    'value': this.staffName
                },
                'Provided': {
                    'fieldOptionIndex': ''
                },
                'extracurricular': {
                    'value': ''
                },
            });
        }
    }
    getValue() {
        this.model.Place.value = 'N/A';
        this.model.isPlacement = true;
    }
    enablePlacement() {
        this.model.Place.value = '';
        this.model.isPlacement = false;
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
        this.workerChild.valueArr.map((val) => {
            if (this.model[`${Object.keys(val)[0]}`].value === '') {
                value.push(Object.values(val)[0]);
            }
        });
        this.workerChild.optionIndex.map((val) => {
            if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '') {
                value.push(Object.values(val)[0]);
            }
        });
        this.workerChild.singleArr.map((val) => {
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