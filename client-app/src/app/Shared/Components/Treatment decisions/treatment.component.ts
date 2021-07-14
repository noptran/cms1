import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import { TreatmentDecisionsDoamin } from "./treatment-domain.class";
import { SharedTreatment } from "./tratment";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-shared-treatment-decision',
    templateUrl: './treatment.component.html',
    styleUrls: ['./treatment.component.scss'],
    inputs: ['isOpenForm'],
    outputs: ['listOfTreatmentDecisions']

})
export class SharedTreatmentDecisionComponent implements OnInit {

    metaData = [];
    selectedPersonTableID: number;
    referralID: number;
    treatmentDoamin: TreatmentDecisionsDoamin = new TreatmentDecisionsDoamin();
    treatment = this.treatmentDoamin.treatmentDecision;
    selectedTreatmentDecsionRecordId: number;
    public isEdit = false;
    public personNameField: string;
    public treatmentForm: FormGroup;

    @Input() isOpenForm = false;

    @Output() listOfTreatmentDecisions = new EventEmitter();

    constructor(public _openCard: OpencardsService, public _fb: FormBuilder, public _msg: MessageService) { }

    ngOnInit() {
        this.formValidation();

        this.setReferralID();
    }

    setReferralID = () => { return this.referralID = parseInt(localStorage.getItem('referralId')) - this._openCard.getHasKey() }

    async onFilterPersonTable(event: any) {
        let request = { referralTypeID: 14 }
        let response = await this._openCard.getTreatmentDecisionsPersonTable(request);
        return this.metaData = response.filter((item: any) => { return item.personAssignmentType.toLowerCase().indexOf(event.query) !== -1 });
    }

    onSelectPersonTable = (event: any) => {
        this.personNameField = (event.personAssignmentTypeID === 4) ? 'name' : 'caseTeamMember';
        return this.selectedPersonTableID = event.personAssignmentTypeID;
    }

    async onFilterPersonName(event: any) {
        let request = { personAssignmentTypeID: this.selectedPersonTableID, referralID: 90 };
        let response = await this._openCard.getTreatmentDecisionsPersonAssigmentTyes(request);
        return this.metaData = response.filter((item: any) => { return item[this.personNameField].toLowerCase().indexOf(event.query) !== -1 });
    }

    onFormAction() {
        if (this.treatmentForm.valid) {
            if (this.treatment.treatmentDecisionsID) {
                this.onUpate();
            } else {
                this.onSave();
            }
        } else {
            return this._msg.add({ severity: 'info', summary: 'Invalid', detail: 'Please fill the mandatory fields!' });

        }
    }

    async onSave() {
        this.treatment.referralID = this.referralID;
        let request = this.treatmentDoamin.saveTreatmentDecision(this.treatment);
        await this._openCard.saveTreatmentDecsions(request);
        this.treatment = new SharedTreatment();
        this._msg.add({ severity: 'success', summary: 'Saved!', detail: 'The record has been saved!' });
        this.onList();
    }

    async onList() {
        let request = {
            referralID: this.referralID,
            beginPagination: 1,
            endPagination: 100
        }
        let response = await this._openCard.listTreatmentDecsions(request);
        this.listOfTreatmentDecisions.emit({ list: response });
        return;
    }

    async getTreatmentDecsionsRecordById(selectedTreatmentDecsionRecordId: number) {
        this.isOpenForm = true;
        this.selectedTreatmentDecsionRecordId = selectedTreatmentDecsionRecordId;
        let request = { treatmentDecisionsID: this.selectedTreatmentDecsionRecordId }
        let response = await this._openCard.getTreatmentDecisionsById(request);
        this.treatment = this.treatmentDoamin.getTreatmentDecisons(response);
        this.isEdit = true;
        return;
    }

    async onUpate() {
        let request = this.treatmentDoamin.updateTreatmentDecisons(this.treatment);
        await this._openCard.updateTreatmentDecisions(request);
        this.getTreatmentDecsionsRecordById(this.selectedTreatmentDecsionRecordId);
        this.onList();
        this.isEdit = true;
        this._msg.add({ severity: 'success', summary: 'Updated!', detail: 'The record has been updated!' });
        return;
    }

    public editForm = () => { return this.isEdit = false; }

    async onDelete(selectedRowIDForDelete: number) {
        let request = {
            module: 'treatmentDecisons',
            moduleID: [selectedRowIDForDelete],
            staffID: localStorage.getItem('UserId')
        }
        await this._openCard.deleteNode(request);
        this.onList();
        return this._msg.add({ severity: 'success', summary: 'Deleted!', detail: 'The record has been deleted!' });
    }

    public formValidation() {
        return this.treatmentForm = this._fb.group({
            beginDate: [null],
            endDate: [null],
            notes: [null],
            personAssignmentTypeID: [null],
            personID: [null],
        })
    }
}