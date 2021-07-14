import { Component, Input, Output, EventEmitter } from "@angular/core";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { CaseTeamService } from "../../case-team/case-team.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {LocalValues} from "../../local-values";
import { NewProvider } from "../move-form";
import { isNullOrUndefined } from "util";

@Component({
    selector: 'app-new-provider',
    templateUrl: './new-provider.component.html',
    styleUrls: ['./new-provider.component.scss'],
    inputs: ['selectedTab'],
    outputs: ['newProviderOut']
})

export class NewProviderComponent {
    @Input() selectedTab: number;
    @Output() newProviderOut = new EventEmitter();
    metaData = [];
    cities = [];
    zipcodes = [];
    relativeTypes = [];
    newProvider: NewProvider = new NewProvider();
    providerInfoForm: FormGroup;
    primaryProviderForm: FormGroup;
    isProviderInfo = false;
    isProviderAdditionalInfo = false;
    componentInfoText: string;
    selectedProvider: any;
    isNewProviderEdit: any;
    isNewProviderNotList: any;


    constructor(public _opencard: OpencardsService, public _caseTeam: CaseTeamService, public _fb: FormBuilder, public _localValues: LocalValues) { }

    async onSelectNewProvider(event: any) {
        // this.newProviderAddress = await this._opencard.getProviderAddress({ pcSiteOtherProviderID: event.pCSiteOtherProviderID });
    }
    ngOnInit() {
        this.primaryProviderFormValidation();
        this.providerInformationValidation();
        this.newProvider = new NewProvider();
        this.getAllRelativeTypes();
    }

    async filteringProviderNames(event: any) {
        let providerNames = await this._opencard.getOtherProviders().then(data => { return data });
        this.metaData = providerNames.filter((item: any) => {
            return item.providerName.toLowerCase().indexOf(event.query) !== -1;
        })
    }

    async getNewProviderTyes(event: any) {
        let newProviderMembers = await this._opencard.getNewProviderTypes()
        this.metaData = newProviderMembers.filter(item => {
            return item.ProviderType_MoveForm.toLowerCase().indexOf(event.query) !== -1;
        })
    }

    onSelectProviderType(event: any) {
        (event.IsRequirePersonInfo_MoveForm) ? this.isProviderAdditionalInfo = true : this.isProviderAdditionalInfo = false;
    }

    getMetaData(event: any, label: any) {
        let req: any, obj: any;
        switch (label) {
            case 'state':
                obj = 'state';
                break;
            case 'staff':
                obj = 'staff';
                break;
            case 'school':
                obj = 'schoolName';
                break;
            case 'provider':
                obj = 'provider';
                break;
            case 'PlacementRequestReason':
                obj = 'PlacementRequestReason';
                break;
            case 'ClientLocation':
                obj = 'ClientLocation';
                break;
            case 'moveStatus':
                obj = 'zmoveStatus';
                break;
            case 'providerType':
                obj = 'providerType';
                break;
            case 'state':
                obj = 'state';
                break;
            case 'race':
                obj = 'race';
                break;
            case 'gender':
                obj = 'gender';
                break;
        }
        req = { Object: obj, value: event.query }
        this._caseTeam.getSearchList(req).then((data: any) => {
            data.dropDown.map((item: any) => {
                item['fullName'] = item.lastName + item.firstName + ' ( ' + item.email + ' ) ';
            })
            this.metaData = data.dropDown;
        })
    }

    onSelectState(event: any) {
        this._opencard.getCityFromState({ stateID: event.stateID })
            .then((data: any) => this.cities = data.city);
    }

    onSelectCity(event: any) {
        this._opencard.getZipcodeFromCity({
            stateID: this.newProvider.stateID.stateID,
            cityID: event.cityID
        })
            .then((data: any) => this.zipcodes = data.zipcode);
    }
    filtereingCity(event: any) {
        this.metaData = this.cities.filter((item: any) => {
            return item.city.toLowerCase().indexOf(event.query) !== -1;
        });
    }

    filtereingZipcode(event: any) {
        this.metaData = this.zipcodes.filter((item: any) => {
            return item.zipcode.toLowerCase().indexOf(event.query) !== -1;
        });
    }

    getAllRelativeTypes() {
        this._opencard.getProviderRelativeTypes().then(data => this.relativeTypes = data)
    }

    filtereingRelativeTypes(event: any) {
        this.metaData = this.relativeTypes.filter((item: any) => {
            return item.relativeType.toLowerCase().indexOf(event.query) !== -1;
        })
    }

    providerInformationValidation() {
        this.providerInfoForm = this._fb.group({
            providerName: [null, Validators.compose([Validators.required])],
            providerTypeID: [null, Validators.compose([Validators.required])],
            phone: [null],
            email: [null],
            address: [null, Validators.compose([Validators.required])],
            stateID: [null, Validators.compose([Validators.required])],
            cityID: [null, Validators.compose([Validators.required])],
            zipcodeID: [null, Validators.compose([Validators.required])],
            relativeTypeID: [null],
        })
    }

    primaryProviderFormValidation() {
        this.primaryProviderForm = this._fb.group({
            primaryProviderName: [null, Validators.compose([Validators.required])],
            primaryDOB: [null, Validators.compose([Validators.required])],
            primaryRaceID: [null, Validators.compose([Validators.required])],
            primaryGenderID: [null, Validators.compose([Validators.required])],
            primarySSN: [null, Validators.compose([Validators.required])],
        })
    }

    onEditProvider(selectedProvider: any) {
        this.isProviderInfo = !this.isProviderInfo;
        console.log("Selected provider", selectedProvider)
        this._opencard.getProviderAddress({ pcSiteOtherProviderID: selectedProvider.pCSiteOtherProviderID })
            .then((data) => {
                this.newProvider.otherProviderName = data.providerName;
                this.newProvider.phone = data.phone;
                this.newProvider.serviceAddress = data.address;
            })
    }

    onSubmit() {
        if (this.providerInfoForm.valid) {
            if (this.newProvider.providerTypeID.IsRequirePersonInfo_MoveForm) {
                console.log("Double form validation", this.providerInfoForm.valid, this.primaryProviderForm.valid);
                if (this.primaryProviderForm.valid) {
                    this.formAction();
                } else {
                    //mandatory exceptions
                    this.componentInfoText = 'Mandatory fields are missing in primary provider information!';
                }
            } else {
                console.log("Single form validation", this.providerInfoForm.valid);
                this.formAction();
            }
        } else {
            //mandatory exceptions
            this.componentInfoText = 'Mandatory fields are missing in provider information!';
        }
    }

    async formAction() {
        let address2 = `${this.newProvider.cityID.city}, ${this.newProvider.stateID.state}, ${this.newProvider.zipcodeID.zipcode}`
        this.newProvider.providerTypeID = !isNullOrUndefined(this.newProvider.providerTypeID) ? this.newProvider.providerTypeID.ProviderTypeID : null;
        this.newProvider.stateID = !isNullOrUndefined(this.newProvider.stateID) ? this.newProvider.stateID.stateID : null;
        this.newProvider.cityID = !isNullOrUndefined(this.newProvider.cityID) ? this.newProvider.cityID.cityID : null;
        this.newProvider.zipcodeID = !isNullOrUndefined(this.newProvider.zipcodeID) ? this.newProvider.zipcodeID.zipcodeID : null;
        this.newProvider.relativeTypeID = !isNullOrUndefined(this.newProvider.relativeTypeID) ? this.newProvider.relativeTypeID.relativeTypeID : null;
        this.newProvider.primaryDOB = !isNullOrUndefined(this.newProvider.primaryDOB) ? this._localValues.stringFormatDatetime(this.newProvider.primaryDOB) : null;
        this.newProvider.primaryRaceID = !isNullOrUndefined(this.newProvider.primaryRaceID) ? this.newProvider.primaryRaceID.raceID : null;
        this.newProvider.primaryGenderID = !isNullOrUndefined(this.newProvider.primaryGenderID) ? this.newProvider.primaryGenderID.genderID : null;
        this.newProvider.secondaryDOB = !isNullOrUndefined(this.newProvider.secondaryDOB) ? this._localValues.stringFormatDatetime(this.newProvider.secondaryDOB) : null;
        this.newProvider.secondaryRaceID = !isNullOrUndefined(this.newProvider.secondaryRaceID) ? this.newProvider.secondaryRaceID.raceID : null;
        this.newProvider.secondaryGenderID = !isNullOrUndefined(this.newProvider.secondaryGenderID) ? this.newProvider.secondaryGenderID.genderID : null;
        this.newProvider.primaryMemberName = !isNullOrUndefined(this.newProvider.primaryMemberName) ? this.newProvider.primaryMemberName : null;
        this.newProvider.primarySSN = !isNullOrUndefined(this.newProvider.primarySSN) ? this.newProvider.primarySSN : null;
        this.newProvider.secondaryMemberName = !isNullOrUndefined(this.newProvider.secondaryMemberName) ? this.newProvider.secondaryMemberName : null;
        this.newProvider.secondarySSN = !isNullOrUndefined(this.newProvider.secondarySSN) ? this.newProvider.secondarySSN : null;
        this.newProvider.email = !isNullOrUndefined(this.newProvider.email) ? this.newProvider.email : null;
        this.newProvider.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
        console.log("new provider information", this.newProvider);
        this.componentInfoText = 'Please wait...';
        let saveResponse = await this._opencard.saveNewProvider(this.newProvider);
        this.componentInfoText = '';
        console.log("Save Response", saveResponse);
        let response = { pCSiteOtherProviderID: saveResponse.pCSiteOtherProviderID, selectedTab: this.selectedTab, isPromptOpen: false };
        if (this.selectedTab === 0) {
            response['providerName'] = this.newProvider.otherProviderName,
                response['address'] = `${this.newProvider.serviceAddress},${address2}`,
                response['phoneNumber'] = this.newProvider.phone
        } else {
            response['providerName'] = this.newProvider.otherProviderName,
                response['address'] = this.newProvider.serviceAddress,
                response['phoneNumber'] = this.newProvider.phone
            response['address2'] = address2;
        }
        console.log("Output from the component", response);
        this.newProviderOut.emit(response);
        this.newProvider = new NewProvider();
    }

}