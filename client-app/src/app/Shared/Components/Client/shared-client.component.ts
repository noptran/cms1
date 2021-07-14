import { OnInit, Component, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilityService } from "../../Services/utility.service";
import { ShareClientClass } from "./shared-client-domain.class";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import { SharedClient } from "./shared-client";
import { MessageService } from 'primeng/api';

@Component({
    selector: 'shared-client',
    templateUrl: './shared-client.component.html',
    styleUrls: ['./shared-client.component.scss'],
    inputs: ['clientId'],
    outputs: ['onGetClientDetails', 'onUpdateClientDetails']
})
export class SharedClientComponent implements OnInit {
    constructor(public _fb: FormBuilder, public _utility: UtilityService, public _opencard: OpencardsService, public _message: MessageService) { }

    clientForm: FormGroup;
    client: SharedClient = new SharedClient();
    clientDomain: ShareClientClass = new ShareClientClass();
    cityData = [];
    countyData = [];
    zipcodeData = [];
    isPopWindow = true;
    isEdit = false;
    @Input()
    clientId: number;

    @Output()
    onGetClientDetails = new EventEmitter();
    onUpdateClientDetails = new EventEmitter();

    metaData = [];
    isLoading = false;

    ngOnInit() {
        this.formValidations();

        this.getClientDetails();

    }

    async getMetaData(label: string, event: any) {
        let request = { Object: '', value: event.query }, response: any[];
        switch (label) {
            case 'conST':
                request.Object = 'contractState';
                break;
            case 'gender':
                request.Object = 'gender';
                break;
            case 'race':
                request.Object = 'race';
                break;
            case 'ethnicity':
                request.Object = 'ethnicity';
                break;
            case 'tribe':
                request.Object = 'tribe';
                break;
            case 'insuranceType':
                request.Object = 'insuranceType';
                break;
            case 'kancareMCO':
                request.Object = 'provider';
                break;
            case 'state':
                request.Object = 'state';
                break;

        }
        this.metaData = await this._utility.getDropdownValues(request);
        console.log("MetaData", this.metaData);
    }

    formValidations() {
        this.clientForm = this._fb.group({
            firstName: [null],
            lastName: [null],
            dob: [null],
            genderID: [null],
            raceID: [null],
            address: [null],
            cityID: [null],
            stateID: [null],
            zipcodeID: [null],
            countyID: [null],
            ssn: [null],
            ethnicityID: [null],
            homePh: [null],
            fax: [null],
            email: [null],
            workPh: [null],
            cellPh: [null],
            mi: [null],
            suffix: [null],
            tribeID: [null],
            insuranceTypeID: [null],
            medicaid: [null],
            isNotLiveBirth: [null],
            kaecses: [null],
            kees: [null],
            alternateID: [null],
            notes: [null],
            acronym: [null],
            nonContractClient: [null],
            conST: [null],
            medicalID: [null],
            kanCareMCO_ProviderID: [null],
            entity: [null],
            facts: [null],
            city: [null]
        })
    }

    async onSelectState(event: any) {
        this.cityData = await this._utility.getCityFromState({ stateID: event.stateID });
    }

    getAndFilterCity(event: any) {
        return this.metaData = this.cityData
            .filter((cityObj: any) => { return cityObj.city.toLowerCase().indexOf(event.query) !== -1 });
    }


    async onSelectCity(event: any) {
        let response: any;
        response = await this._utility
            .getZipCodeFromCity({ stateID: this.client.stateID.stateID, cityID: event.cityID });
        this.zipcodeData = response.zipcode;
        this.countyData = response.county;
    }

    getAndFilterZipcode(event: any) {
        return this.metaData = this.zipcodeData
            .filter((zipcodeObj: any) => { return zipcodeObj.zipcode.indexOf(event.query) !== -1 });
    }

    getAndFilterCounty(event: any) {
        return this.metaData = this.countyData
            .filter((countyObj: any) => { return countyObj.countyName.toLowerCase().indexOf(event.query) !== -1 });
    }

    async getClientDetails() {
        if (this.clientId) {
            let request = { clientID: this.clientId };
            this.isLoading = true;
            let response = await this._opencard.getClientDetailByClientID(request);
            this.isLoading = false;
            console.log("Client details shared client component", response)
            this.client = this.clientDomain.getClientDetails(response);
            this.clientForm.disable();
            this.isEdit = true;
            return;
        } else {
            return this.onGetClientDetails.emit({ responseMsg: 'Unable to process!', message: 'Client id is empty!' });
        }

    }

    async onclickUpdateClientDetails() {
        if (this.client) {
            this.client.entity = 'Client';
            this.client = this.clientDomain.updateClient(this.client);
            this.isLoading = true;
            let response = await this._opencard.updateClientDetails(this.client);
            this.isLoading = false;
            if (response.responseStatus) {
                this._message.add({ severity: 'success', summary: 'Updated!', detail: 'Client has been updated!' });
                console.log("Update client information from shared client", response.person);
                return this.onUpdateClientDetails.emit({ clientDetails: response.person, isFormClose: false });
            } else {
                return this._message.add({ severity: 'success', summary: 'Unable to process!', detail: 'Not able to update client details!' });
            }
        }

        else {
            return this._message.add({ severity: 'success', summary: 'Unable to process!', detail: 'Not able to update client details!' });
        }
    }

    onFormActions() {
        if (this.client.clientID) {
            return this.onclickUpdateClientDetails();
        } else {
            //client save
            return;
        }
    }

    onEditForm() {
        this.clientForm.enable();
        this.isEdit = false;
    }
}