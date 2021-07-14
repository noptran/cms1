import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import { isNullOrUndefined } from "util";
import { CaseTeamService } from "../../../case-team/case-team.service";
import {LocalValues} from "../../../local-values";
import { SharedCaseTeamDomain } from "./shared-case-team-domain.class";
import { SharedCaseTeam } from "./shared-case-team";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-shared-case-team',
    templateUrl: './shared-case-team.component.html',
    styleUrls: ['./shared-case-team.component.scss'],
    inputs: ['isOpenForm'],
    outputs: ['listOfCaseTeam']
})

export class SharedCaseTeamComponent implements OnInit {
    metadata = [];
    caseTeamDomain: SharedCaseTeamDomain = new SharedCaseTeamDomain();
    currentDateandTimeString: string;
    selectedPersonType: number;
    selectedPersonSubType: string;
    caseTeam = this.caseTeamDomain.caseTeam;
    currentClientID: number;
    currentReferralID: number;
    selectedCaseTeamID: number;
    isEdit = false;
    public caseTeamForm: FormGroup;

    @Input() isOpenForm = false;

    @Output() listOfCaseTeam = new EventEmitter();

    constructor(public _openCard: OpencardsService, public _CaseTeamService: CaseTeamService, public _localValues: LocalValues, public _fb: FormBuilder, public _msg: MessageService) { }

    ngOnInit() {

        this.formValidation();

        this.setCurrentDateandTimeString();

        this.setClientIDandReferralID();
    }

    setCurrentDateandTimeString = () => { return this.currentDateandTimeString = this._localValues.stringFormatDatetime(new Date().getTime()) }

    setClientIDandReferralID() {
        this.currentClientID = parseInt(localStorage.getItem('clientId')) - this._openCard.getHasKey();
        this.currentReferralID = parseInt(localStorage.getItem('referralId')) - this._openCard.getHasKey();
        return;
    }

    getMetaData(event: any, label: string) {
        let metaDataReqObj: any, metaDataReq: any, email: string, personSubType: any;;
        switch (label) {
            case 'personType':
                metaDataReqObj = 'personType';
                break;
            case 'contractState':
                metaDataReqObj = 'contractState'
                break;
            case 'name':
                if (this.selectedPersonSubType === 'CSV') { personSubType = 'CourtServiceOfficer' }
                else if (this.selectedPersonSubType === 'GAL') { personSubType = 'guardianAdLitem' }
                else { personSubType = this.selectedPersonSubType }
                metaDataReqObj = personSubType;
                break;
        }
        if (metaDataReqObj) {
            metaDataReq = { Object: metaDataReqObj, value: event.query }
            this._CaseTeamService.getSearchList(metaDataReq).then((data) => {
                data.dropDown.map((item: any) => {
                    email = !isNullOrUndefined(item.email) ? item.email : 'Email not provided!'
                    item['fullName'] = item.lastName !== undefined || item.firstName !== undefined ? item.lastName + ' ' + item.firstName + '(' + email + ')' : item.name + ' ' + '(' + email + ')';
                })
                this.metadata = data.dropDown;
            })
        }
    }

    async onFilterPersonTypes(event: any) {
        let request = {
            beginDate: this.currentDateandTimeString,
            referralTypeID: 14
        }
        let response = await this._openCard.getPersonTypesForReferralTypes(request);
        this.metadata = response.filter((item: any) => { return item.personType.toLowerCase().indexOf(event.query) !== -1 });
    }

    async onFilterPersonSubType(event: any) {
        let request = { personTypeID: this.selectedPersonType }
        let response = await this._openCard.getPersonSubTypesForReferralTypes(request);
        this.metadata = response.filter((item: any) => { return item.personAssignmentTable.toLowerCase().indexOf(event.query) !== -1 });
        return;
    }

    onPersonTypeSelect = (event: any) => { return this.selectedPersonType = event.personTypeID; };

    onPersonSubTypeSelect = (event: any) => { return this.selectedPersonSubType = event.personAssignmentTable };

    onFormAction() {
        if (this.caseTeamForm.valid) {
            if (this.caseTeam.caseTeamID) {
                this.onUpdate();
            } else {
                this.onSave();
            }
        } else {
            return this._msg.add({ severity: 'info', summary: 'Invalid', detail: 'Please fill the mandatory fields!' });
        }
    }

    async onSave() {
        this.caseTeam.referralID = this.currentReferralID;
        this.caseTeam.clientID = this.currentClientID;
        let request = this.caseTeamDomain.caseTeamSave(this.caseTeam);
        await this._openCard.saveCaseTeamDetails(request);
        this.caseTeam = new SharedCaseTeam();
        this.list();
        this._msg.add({ severity: 'success', summary: 'Saved!', detail: 'The record has been saved!' });
        return;
    }

    async list() {
        let request = {
            referralID: this.currentReferralID,
            beginPagination: 1,
            endPagination: 100,
            sort: { "column": "caseTeamID", "mode": "desc" }
        }
        let response = await this._openCard.listOfCaseTeam(request);
        this.listOfCaseTeam.emit({ list: response });
        return;
    }

    async getSelectedCaseTeamData(selectedCaseTeamID: number) {
        this.isOpenForm = true;
        this.selectedCaseTeamID = selectedCaseTeamID;
        let request = { caseTeamId: this.selectedCaseTeamID }
        let response = await this._openCard.getCaseTeamRecord(request);
        this.caseTeam = this.caseTeamDomain.caseTeamGet(response)
        this.isEdit = true;
        return;
    }

    public edit = () => { return this.isEdit = false; }

    async onUpdate() {
        let request = this.caseTeamDomain.caseTeamUpdate(this.caseTeam);
        await this._openCard.updateCaseTeamDetails(request)
        this.getSelectedCaseTeamData(this.selectedCaseTeamID);
        this.list();
        this.isEdit = true;
        this._msg.add({ severity: 'success', summary: 'Updated!', detail: 'The record has been updated!' });
        return;
    }

    async onDelete() {
        let request = { module: 'caseTeam', moduleID: [this.selectedCaseTeamID], staffID: localStorage.getItem('referralId') };
        await this._openCard.deleteNode(request)
        this.list();
        this._msg.add({ severity: 'success', summary: 'Deleted!', detail: 'The record has been deleted!' });
        return;
    }

    public formValidation() {
        return this.caseTeamForm = this._fb.group({
            caseID: [null],
            beginDate: [null, Validators.compose([Validators.required])],
            endDate: [null],
            personAssignmentTypeID: [null, Validators.compose([Validators.required])],
            personID: [null, Validators.compose([Validators.required])],
            personTypeID: [null, Validators.compose([Validators.required])],
            emailAck: [null],
            faxAck: [null],
            mentor: [null],
            fromReferral: [null],
            emailNoticeOfChildsLocation: [null],
            mayHaveContact: [null],
            contract_StateID: [null],
            mailAck: [null],
            referralID: [null],
            clientID: [null],
            contactList: [null],
            criticals: [null],
            emergencyContact: [null],
            treatmentDecisions: [null],
            treatmentPlan: [null]
        })
    }



}