import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { CaseTeamService } from "../../../case-team/case-team.service";
import { SharedSchoolDomain } from "./shared-school-domain.class";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import { SharedSchool } from "./shared-school";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-shared-school',
    templateUrl: './shared-school.component.html',
    styleUrls: ['./shared-school.component.scss'],
    inputs: ['isOpenForm'],
    outputs: ['listOfSchool']
})
export class SharedSchoolComponent implements OnInit {

    metaData = [];
    schoolDomain: SharedSchoolDomain = new SharedSchoolDomain();
    school = this.schoolDomain.school;
    clientID: number;
    referralID: number;
    @Input() isOpenForm = false;
    @Output() listOfSchool = new EventEmitter();
    isEdit = false;
    selectedSchoolRecordID: number;
    public sharedSchoolForm: FormGroup;

    constructor(public _caseTeam: CaseTeamService, public _openCard: OpencardsService, public _fb: FormBuilder, public _msg: MessageService) { }

    ngOnInit() {

        this.formValidation();

        this.setReferralAndClientID();

    }

    setReferralAndClientID = () => {
        this.clientID = parseInt(localStorage.getItem('clientId')) - this._openCard.getHasKey();
        return this.referralID = parseInt(localStorage.getItem('referralId')) - this._openCard.getHasKey();
    }

    getMetaData(event: any, label: any) {
        let req: any, obj: any;
        switch (label) {
            case 'school':
                obj = 'schoolName';
                break;
            case 'change_reason':
                obj = 'changeReason';
                break;
        }
        req = { Object: obj, value: event.query }
        this._caseTeam.getSearchList(req).then((data) => {
            this.metaData = data.dropDown;
        })
    }

    onFormActions() {
        if (this.sharedSchoolForm.valid) {
            if (this.school.clientSchoolID) {
                this.onUpdate();
            } else {
                this.onSave();
            }
        } else {
            return this._msg.add({ severity: 'info', summary: 'Invalid', detail: 'Please fill the mandatory fields!' });
        }

    }

    async onSave() {
        this.school.clientID = this.clientID;
        this.school.referralID = this.referralID;
        let request = this.schoolDomain.schoolSave(this.school);
        await this._openCard.saveAttendingSchoolDetails(request);
        this.school = new SharedSchool();
        this.list();
        return this._msg.add({ severity: 'success', summary: 'Saved!', detail: 'The record has been saved!' });
    }

    async list() {
        let request = {
            referralID: this.referralID,
            endPagination: 100,
            beginPagination: 1,
            sort: { column: "clientSchoolID", mode: "desc" }
        }
        let response = await this._openCard.listAllAttendingSchoolDetails(request);
        this.listOfSchool.emit({ list: response });
    }

    async getSchoolRecordByID(selectedSchoolRecordID: number) {
        this.isOpenForm = true;
        this.selectedSchoolRecordID = selectedSchoolRecordID;
        let request = { clientSchoolID: selectedSchoolRecordID }
        this.school = await this._openCard.getByRecAttendingSchoolDetails(request);
        this.school = this.schoolDomain.schoolGet(this.school);
        this.isEdit = true;
        return;
    }
    editForm() {
        this.isEdit = false;
    }

    async onUpdate() {
        let request = this.schoolDomain.schoolUpdate(this.school);
        await this._openCard.updateAttendingSchoolDetails(request);
        this.getSchoolRecordByID(this.selectedSchoolRecordID);
        this.list();
        this.isEdit = true;
        return this._msg.add({ severity: 'success', summary: 'Updated!', detail: 'The record has been updated!' });
    }

    async onDelete(selectedSchoolRecordID: number) {
        let request = {
            module: 'clientSchool',
            moduleID: [selectedSchoolRecordID],
            staffID: localStorage.getItem('UserId')
        }
        await this._openCard.deleteNode(request);
        this.list();
        return this._msg.add({ severity: 'success', summary: 'Deleted!', detail: 'The record has been deleted!' });
    }

    public formValidation() {
        this.sharedSchoolForm = this._fb.group({
            beginDate: [null],
            endDate: [null],
            schoolID: [null],
            enrolledBeginDate: [null],
            enrolledEndDate: [null],
            changeReasonID: [null],
            notes: [null]
        })
    }



}