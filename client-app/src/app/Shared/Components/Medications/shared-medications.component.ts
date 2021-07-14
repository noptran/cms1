import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { CaseTeamService } from "../../../case-team/case-team.service";
import { sharedMedications } from "./shared-medications";
import { SharedMedicationsDomain } from "./shared-medications-domain.class";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-shared-medications',
    templateUrl: './shared-medications.component.html',
    styleUrls: ['./shared-medications.component.scss'],
    inputs: ['isOpenForm'],
    outputs: ['listOfMedications']
})
export class SharedMedicationsComponent implements OnInit {
    public metadata = [];
    medications: sharedMedications = new sharedMedications();
    medicationsDomain: SharedMedicationsDomain = new SharedMedicationsDomain();
    referralID: number;
    clientID: number;
    public isEdit = false;
    public medicationsForm: FormGroup;

    @Output() listOfMedications = new EventEmitter();

    @Input() isOpenForm = false;

    constructor(public _caseTeam: CaseTeamService, public _opencard: OpencardsService, public _fb: FormBuilder, public _msg: MessageService) { }

    ngOnInit() {
        this.formValidation();

        this.setReferrandClientID();
    }

    public setReferrandClientID() {
        this.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
        this.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
    }

    getMetadata(event, type: any) {
        let object, req;
        switch (type) {
            case 'dosage':
                object = "dosageType";
                break;
            case 'frequency':
                object = "frequencyType";
                break;
        }
        req = { Object: object, value: event.query };
        this._caseTeam.getSearchList(req).then(data => {
            this.metadata = data.dropDown;
        });
    }

    public onFormAction() {
        if (this.medicationsForm.valid) {
            if (this.medications.clientMedicationID) {
                return this.onUpdate();
            } else {
                return this.onSave();
            }
        } else {
            return this._msg.add({ severity: 'info', summary: 'Invalid', detail: 'Please fill the mandatory fields!' });

        }
    }

    public async onSave() {
        this.medications.client = this.clientID
        let request = this.medicationsDomain.saveMedications(this.medications);
        await this._opencard.saveMedications(request);
        this.medications = new sharedMedications();
        this._msg.add({ severity: 'success', summary: 'Saved!', detail: 'The record has been saved!' });
        return this.list();
    }

    public async list() {
        let request = {
            openCard: "ClientMedication",
            beginPagination: 1,
            endPagination: 100,
            sort: { "column": "clientMedicationID", "mode": "desc" }
        }
        let response = await this._opencard.listOfMedications(request, this.clientID);
        return this.listOfMedications.emit({ list: response });
    }

    async getMedicationsRecord(selectedMedicationRecordID: number) {
        console.log("Selected medications id", selectedMedicationRecordID);
        this.isOpenForm  = true;
        let request = { clientMedicationID: selectedMedicationRecordID }
        let response = await this._opencard.getMedicationsRecord(request);
        this.medications = this.medicationsDomain.getMedicationsRecord(response);
        this.isEdit = true;
        return;
    }

    public editForm = () => { return this.isEdit = false; }

    async onUpdate() {
        let request = this.medicationsDomain.updateMedications(this.medications);
        await this._opencard.updateMedications(request);
        this.list();
        this.medications = new sharedMedications();
        this._msg.add({ severity: 'success', summary: 'Updated!', detail: 'The record has been updated!' });
        return this.isEdit = false;
    }

    async onDelete(selectedMedicationRecordID: number) {
        let request = { module: 'clientMedication', moduleID: [selectedMedicationRecordID], staffID: localStorage.getItem("UserId") }
        this._opencard.deleteNode(request)
        this.list();
        return this._msg.add({ severity: 'success', summary: 'Deleted!', detail: 'The record has been deleted!' });

    }

    public formValidation() {
        return this.medicationsForm = this._fb.group({
            medication: [null, Validators.compose([Validators.required])],
            dosage: [null, Validators.compose([Validators.required])],
            dosageTypeID: [null, Validators.compose([Validators.required])],
            frequencyTypeID: [null, Validators.compose([Validators.required])],
            beginDate: [null, Validators.compose([Validators.required])],
            endDate: [null],
            sourceOfInfo: [null],
            frequencyNotes: [null],
            prescribedBy: [null, Validators.compose([Validators.required])],
            prescribedFor: [null, Validators.compose([Validators.required])],
        })
    }

    async exportList() {
        let request = {
            referralID: this.referralID,
            clientID: this.clientID,
            beginPagination: 1,
            endPagination: 100,
            isExport: true
        }
        let response = await this._opencard.exportMedication(request);
        if (response.responseStatus) {
            window.open(response.filePath, '_blank');
            return this._msg.add({ severity: 'success', summary: 'Exported!', detail: 'The record has been exported!' });
        } else {
            return this._msg.add({ severity: 'success', summary: response.responseMessage, detail: response.messageDetails });
        }
    }

}