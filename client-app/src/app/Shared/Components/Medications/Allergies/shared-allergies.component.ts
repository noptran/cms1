import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { OpencardsService } from "../../../../opecards-list-view/opencards.service";
import { SharedAllergiesDomain } from "./shared-allergies-domain.class";
import { SharedAllergies } from "./shared-allergies";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-shared-allergies',
    templateUrl: './shared-allergies.component.html',
    styleUrls: ['./shared-allergies.component.scss'],
    outputs: ['listOfAllergies'],
    inputs: ['isOpenForm']
})
export class SharedAllergiesComponent implements OnInit {
    clientID: number;
    referralID: number;
    allergiesDomain: SharedAllergiesDomain = new SharedAllergiesDomain();
    allergies = this.allergiesDomain.allergies;
    public isEdit = false;
    public selectedAllergieRecord: number;
    public allergiesForm: FormGroup;

    @Input() public isOpenForm = false;

    @Output() listOfAllergies = new EventEmitter();

    constructor(public _opencard: OpencardsService, public _fb: FormBuilder, public _msg: MessageService) { }

    ngOnInit() {

        this.formValidation();

        this.setReferralandClientID()
    }

    public setReferralandClientID() {
        this.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
        this.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
        return;
    }

    public onFormAction() {
        if (this.allergiesForm.valid) {
            if (this.allergies.clientAllergiesID) {
                return this.onUpdate()
            } else {
                return this.onSave();
            }
        } else {
            return this._msg.add({ severity: 'info', summary: 'Invalid', detail: 'Please fill the mandatory fields!' });
        }
    }

    public async onSave() {
        this.allergies.client = this.clientID;
        let request = this.allergiesDomain.saveAllergies(this.allergies);
        await this._opencard.saveAllergies(request);
        this.allergies = new SharedAllergies();
        this._msg.add({ severity: 'success', summary: 'Saved!', detail: 'The record has been saved!' });
        return this.onList();
    }

    public async onList() {
        let request = {
            openCard: "ClientAllergies",
            beginPagination: 1, "endPagination": 100,
            sort: { "column": "clientAllergiesID", "mode": "desc" }
        }
        let response = await this._opencard.listAllergies(request, this.clientID);
        return this.listOfAllergies.emit({ list: response });
    }

    async getAllergiesRecordById(selectedAllergiesRecordId: number) {
        this.selectedAllergieRecord = selectedAllergiesRecordId;
        let request = { clientAllergiesID: selectedAllergiesRecordId }
        let response = await this._opencard.getAllergiesById(request);
        this.allergies = this.allergiesDomain.getAllergies(response);
        return this.isEdit = true;
    }

    editForm = () => { return this.isEdit = false; }

    public async onUpdate() {
        let request = this.allergiesDomain.updateAllergies(this.allergies);
        await this._opencard.updateAllergies(request);
        this.getAllergiesRecordById(this.selectedAllergieRecord);
        this._msg.add({ severity: 'success', summary: 'Updated!', detail: 'The record has been updated!' });
        return this.onList();
    }

    async onDelete(selectedAllergieRecord) {
        let request = { module: 'clientAllergies', moduleID: [selectedAllergieRecord], staffID: localStorage.getItem('UserId') }
        await this._opencard.deleteNode(request);
        this.allergies = new SharedAllergies();
        this._msg.add({ severity: 'success', summary: 'Deleted!', detail: 'The record has been deleted!' });
        return this.onList();
    }

    public formValidation() {
        return this.allergiesForm = this._fb.group({
            allergies: [null],
            enteredBy: [null],
            enteredDate: [null],
            legacy_ClientAllergiesID: [null],
            legacy_ClientID: [null],
            notificationDate: [null]
        })
    }
}