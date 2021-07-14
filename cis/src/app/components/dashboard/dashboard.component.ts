import { Component } from '@angular/core';
import { Constants } from './../../constants';
import { NetworkService } from '../../providers/network.service';
import { PouchDbService } from '../../providers/pouchdb.service';

const ONLINE = 'Online';
const OFFLINE = 'Offline';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    internetStatus: string;
    programs: string[];
    docCount: any = {
        STATUS: {
            DRAFT: 0,
            ERROR: 0,
            PENDING: 0,
            SYNCED: 0,
            TOTAL: 0
        }
    }
    showReintegration: Boolean = true;
    showBehavior: Boolean = true;
    showFamilyPreservation: Boolean = true;
    showFosterCare: Boolean = true;
    showOklahoma: Boolean = true;

    ReintegrationCount: Number = 0;
    BehaviorCount: Number = 0;
    FosterCareCount: Number = 0;
    FamilyPreservationCount: Number = 0;
    OklahomaCount: Number = 0;

    getDocCountByStatus() {
        this.pouchDBService.getForms().then((forms) => this.docCount.STATUS.TOTAL = forms.length)
            .catch((err) => console.log(err));
        this.pouchDBService.getFormsByStatus(Constants.FORM_STATUS.DRAFT).then((forms) => this.docCount.STATUS.DRAFT = forms.length)
            .catch((err) => console.log(err));
        this.pouchDBService.getFormsByStatus(Constants.FORM_STATUS.PENDING).then((forms) => this.docCount.STATUS.PENDING = forms.length)
            .catch((err) => console.log(err));
        this.pouchDBService.getFormsByStatus(Constants.FORM_STATUS.ERROR).then((forms) => this.docCount.STATUS.ERROR = forms.length)
            .catch((err) => console.log(err));
        this.pouchDBService.getFormsByStatus(Constants.FORM_STATUS.SYNCED).then((forms) => this.docCount.STATUS.SYNCED = forms.length)
            .catch((err) => console.log(err));
    }

    getDocCountByProgram() {
        this.pouchDBService.getFormsByProgram(Constants.PROGRAMS.REINTEGRATION.SHORT_NAME).then((forms) => this.docCount.REINTEGRATION = forms.length)
            .catch((err) => console.log(err));
        this.pouchDBService.getFormsByProgram(Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.SHORT_NAME).then((forms) => this.docCount.BEHAVIORAL_ASSESSMENTS = forms.length)
            .catch((err) => console.log(err));
        this.pouchDBService.getFormsByProgram('Family Preservation').then((forms) => this.docCount.FAMILY_PRESERVATION = forms.length)
            .catch((err) => console.log(err));
        this.pouchDBService.getFormsByProgram(Constants.PROGRAMS.OKLAHOMA_FOSTER_CARE_HOME.SHORT_NAME).then((forms) => this.docCount.OKLAHOMA_FOSTER_CARE_HOME = forms.length)
            .catch((err) => console.log(err));
        this.pouchDBService.getFormsByProgram('Foster Care').then((forms) => this.docCount.FOSTER_CARE_HOMES = forms.length)
            .catch((err) => console.log(err));
        console.log(this.docCount);
    }

    setInternetStatus() {
        this.internetStatus = this.networkService.isOnline() ? ONLINE : OFFLINE;
    }

    subscribeToNetworkChanges() {
        this.networkService.getStatus().subscribe(message => {
            this.internetStatus = ((message.status === 'online') === true ? ONLINE : OFFLINE);
        });
    }

    constructor(private networkService: NetworkService, private pouchDBService: PouchDbService) {
        this.setInternetStatus();
        this.getDocCountByStatus();
        this.getDocCountByProgram();
        this.programs = Object.keys(Constants.PROGRAMS).map((program) => Constants.PROGRAMS[program]);
    }


    ngOnInit() {
        this.userRightsForms();
    }


    userRightsForms() {
        this.pouchDBService.getUser().then(data => {
            let userRightsForm = data.UserRightsForm.map(data => {
                if (!(data.fosterCareUserRightsForm === undefined || data.fosterCareUserRightsForm === null)) {
                    this.FosterCareCount = Object.values(data.fosterCareUserRightsForm).length;
                }
                if (!(data.familyPreservationUserRightsForm === undefined || data.familyPreservationUserRightsForm === null)) {
                    this.FamilyPreservationCount = Object.values(data.familyPreservationUserRightsForm).length;
                }
                if (!(data.oklahomaUserRightsForm === undefined || data.oklahomaUserRightsForm === null)) {
                    this.OklahomaCount = Object.values(data.oklahomaUserRightsForm).length;
                }
                if (!(data.reintegrationUserRightsForm === undefined || data.reintegrationUserRightsForm === null)) {
                    this.ReintegrationCount = Object.values(data.reintegrationUserRightsForm).length;
                }
                if (!(data.behaviorUserRightsForm === undefined || data.behaviorUserRightsForm === null)) {
                    this.BehaviorCount = Object.values(data.behaviorUserRightsForm).length;
                }
            });
            this.userRightsReferral();
        }).catch(error => {
            console.log('Error in retrieving user rights forms', error);
        });
    }


    userRightsReferral() {
        if (this.ReintegrationCount === 0) {
            this.showReintegration = false;
        }
        if (this.BehaviorCount === 0) {
            this.showBehavior = false;
        }
        if (this.FosterCareCount === 0) {
            this.showFosterCare = false;
        }
        if (this.FamilyPreservationCount === 0) {
            this.showFamilyPreservation = false;
        }
        if (this.OklahomaCount === 0) {
            this.showOklahoma = false;
        }
    }
}