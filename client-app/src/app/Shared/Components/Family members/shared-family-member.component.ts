import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { CaseTeamService } from "../../../case-team/case-team.service";
import { FamilyMemberDomainClass } from "./shared-family-member-domain.class";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import { SharedFamilyMember } from "./shared-family-member";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-shared-family-member',
    templateUrl: './shared-family-member.component.html',
    styleUrls: ['./shared-family-member.component.scss'],
    inputs: ['isOpenForm'],
    outputs: ['listOfFamilymembers'],

})
export class SharedFamilyMemberComponent implements OnInit {

    metaData = [];
    familyMemberDomain: FamilyMemberDomainClass = new FamilyMemberDomainClass();
    familyMember = this.familyMemberDomain.familyMember;
    currentReferralId: number;
    isEdit = false;
    selectedFamilyMemberID: number;
    public sharedFamilyMemberForm: FormGroup;

    @Output()
    listOfFamilymembers = new EventEmitter();

    @Input()
    isOpenForm = false;

    constructor(public _caseTeam: CaseTeamService, public _openCard: OpencardsService, public _fb: FormBuilder, public _msg: MessageService) { }

    ngOnInit() {

        this.formValidation();

        this.setReferralId();
    }

    setReferralId = () => { return this.currentReferralId = parseInt(localStorage.getItem('referralId')) - this._openCard.getHasKey() }

    getMetaData(event: any, label: any) {
        let metaDataObj: any, metaDataReq: any;
        switch (label) {
            case 'familyMember':
                metaDataObj = "familyMember";
                break;
            case 'relationship':
                metaDataObj = "personType";
                break;
            case 'memberType':
                metaDataObj = "familyMemberType";
                break;
            case 'restrictionType':
                metaDataObj = "restrictionType";
                break;
            case 'frequency':
                metaDataObj = "frequencyType";
                break;
        }
        if (metaDataObj) {
            metaDataReq = { Object: metaDataObj, value: event.query }
            this._caseTeam.getSearchList(metaDataReq).then(data => {
                this.metaData = data.dropDown;
            })
        }
    }

    onFormActions() {
        if (this.sharedFamilyMemberForm.valid) {
            if (this.familyMember.familyMemberReferralID) {
                this.update();
            } else {
                this.save();
            }
        } else {
            return this._msg.add({ severity: 'info', summary: 'Invalid', detail: 'Please fill the mandatory fields!' });
        }
    }

    async save() {
        this.familyMember.referralID = this.currentReferralId
        let request = this.familyMemberDomain.saveFamilyMember(this.familyMember);
        await this._openCard.saveFamilyMemberReferral(request);
        this.familyMember = new SharedFamilyMember();
        this.list();
        this._msg.add({ severity: 'success', summary: 'Saved!', detail: 'The record has been saved!' });
        return;
    }

    async list() {
        let request = {
            beginPagination: 1,
            endPagination: 100,
            referralID: this.currentReferralId,
            sort: { column: "familyMemberReferralID", mode: "desc" }
        }
        let response = await this._openCard.listFamilyMemberReferral(request);
        this.listOfFamilymembers.emit({ list: response });
    }

    async getSelectedFamilyMemberDetails(selectedFamilyMemberID: number) {
        this.isOpenForm = true;
        this.selectedFamilyMemberID = selectedFamilyMemberID;
        let request = { familyMemberReferralID: selectedFamilyMemberID }
        let response = await this._openCard.getFamilyMemberReferralRecord(request)
        this.familyMember = this.familyMemberDomain.getFamilyMember(response);
        this.isEdit = true;
        return response;
    }

    onEditForm() {
        this.isEdit = false;
    }

    async update() {
        let request = this.familyMemberDomain.updateFamilyMember(this.familyMember);
        let response = await this._openCard.updateFamilyMemberReferralRecord(request);
        this.isEdit = true;
        this.getSelectedFamilyMemberDetails(this.selectedFamilyMemberID);
        this._msg.add({ severity: 'success', summary: 'Updated!', detail: 'The record has been updated!' });
        this.list();
        return;
    }

    async delete(selectedFamilyMemberID: number) {
        let request = {
            module: 'familyMember',
            moduleID: [selectedFamilyMemberID],
            staffID: localStorage.getItem('UserId')
        }
        await this._openCard.deleteNode(request);
        this.familyMember = this.familyMemberDomain.familyMember;
        this.list();

    }

    public formValidation() {
        return this.sharedFamilyMemberForm = this._fb.group({
            familyMemberID: [null, Validators.compose([Validators.required])],
            beginDate: [null, Validators.compose([Validators.required])],
            endDate: [null],
            personTypeID: [null, Validators.compose([Validators.required])],
            familyMemberTypeID: [null, Validators.compose([Validators.required])],
            restrictionTypeID: [null, Validators.compose([Validators.required])],
            IsCourtOrderedRestriction: [null],
            frequencyTypeID: [null, Validators.compose([Validators.required])],
            isCourtOrderedFrequency: [null],
            notes: [null],
            referralID: [null],
            annualHouseholdIncome: [null],
            numberLivingInHousehold: [null],
            isSingleParentHousehold: [null],
            familyRefused: [null],
            isRemovalParent: [null],
            custodialParent:[null],
            prt:[null],
            contactList:[null],
            emergencyContact:[null],
            treatmentplan:[null],
            treatmentDecisions:[null]
        })
    }

    async exportList() {
        let request = {
            referralID: this.currentReferralId,
            beginPagination: 1,
            endPagination: 100,
            isExport: true
        }
        let response = await this._openCard.exportFamilyMember(request);
        if (response.responseStatus) {
            window.open(response.filePath, '_blank');
            return this._msg.add({ severity: 'success', summary: 'Exported!', detail: 'The record has been exported!' });
        } else {
            return this._msg.add({ severity: 'success', summary: response.responseMessage, detail: response.messageDetails });
        }

    }

}