import { OnInit, Component } from "@angular/core";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import {LocalValues} from "../../local-values";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NCHS } from "./nc-hs";
import { CaseTeamService } from "../../case-team/case-team.service";
import { isNullOrUndefined } from "util";
import swal from "sweetalert2";
import * as moment from 'moment';


@Component({
    selector: 'app-nc-hs',
    templateUrl: '../NC-HS/nc-hs.component.html',
    styleUrls: ['../NC-HS/nc-hs.component.scss'],
})

export class NCHSReferralComponent implements OnInit {
    constructor(public _opencard: OpencardsService, public _localValues: LocalValues,
        public _router: Router, public _fb: FormBuilder, public _caseTeam: CaseTeamService) { }
    breadcrumbs = [];
    discardTo = '/reports/opencards/list/client/case';
    nchsOpencards = [];
    iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';
    nchsForm: FormGroup;
    nchs: NCHS = new NCHS();
    metaData = [];
    procodes = [];
    isEditMode = false;
    isEditControll = false;
    isDownloadBtnDisable = false;
    isUploadModal = false;
    referralAttachmentList: any = [];
    sfcsNotes: string;
    formLogInfo = {
        enteredBy: "",
        changedBy: "",
        enteredDate: "",
        changedDate: "",
      };
      isFormLog = false;
    

    ngOnInit() {
        this.breadcrumbs.push(
            { label: 'Person Types', href: '/reports/person/types', active: '' },
            { label: 'Client', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'NC-HS Referral', href: '', active: 'active' }
        )
        this.nchsOpencards = [
            { title: 'Billable Case Activity', tip: 'Billable Case Activity', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
            { title: 'Case Activity', tip: 'Case Activity', navigation: 'reintegration/referral/opencard/case-activity/view', icon: this.iconurl + 'case activity.svg' },
            { title: 'Case File Activity', tip: 'Family', navigation: '', icon: this.iconurl + '' },
            { title: 'Case Team', tip: 'Assessments', navigation: '', icon: 'assets/Nodesicon/case team.svg' },
            { title: 'Service Agreement', tip: 'Family', navigation: '', icon: '' },
            { title: 'Monthly Reports', tip: 'Assessments', navigation: '', icon: this.iconurl + '' },
            { title: 'SFCS Office', tip: 'Assessments', navigation: '', icon: this.iconurl + '' }
        ];
        this.nchsOpencards.sort((a, b) => { return a['title'].localeCompare(b['title']) });
        this.formValidation();

        if (this._router.url === '/nc-hs/new') {
            this.nchs.beginDate = new Date(Date.now());
        }

        if (this._router.url === '/nc-hs/detail') {
            this.isEditMode = true;
            this.getRecById();
        }
        this.getProcodeByReferral();
    }

    navigateTo(label: any) {
        let url: any;
        switch (label) {
            case 'Case Activity':
                url = '/reports/referral/family-preservation/case-activity/view';
                break;
            case 'Case Team':
                url = '/reports/referral/family-preservation/case-team/view';
                break;
            case 'SFCS Office':
                url = '/reports/referral/family-preservation/sfcs-office/view';
                break;
            case 'Monthly Reports':
                url = '/reintegration/referral/opencard/monthly-reports/view';
                break;
            case 'Billable Case Activity':
                url = '/reports/fp-billable-case-activity/view';
                break;
            case 'Service Agreement':
                url = '/reports/service-agreement/view';
                break;
            case 'Case File Activity':
                url = '/reintegration/referral/opencard/case-file-activity/view';
                break;
        }
        return this._router.navigate([url]);
    }

    formValidation() {
        this.nchsForm = this._fb.group({
            clientID: [null],
            payorID: [null, Validators.compose([Validators.required])],
            referralTypeID: [null],
            beginDate: [null],
            endDate: [null],
            enterBy: [null],
            notes: [null],
            procodeID: [null, Validators.compose([Validators.required])],
            units: [null, Validators.compose([Validators.required])],
            unitRate: [null, Validators.compose([Validators.required])],
            facts: [null]
        })
    }

    formActions() {
        const loader = document.getElementById('loading-overlay') as HTMLElement;
        loader.style.display = 'block';
        if (this.nchsForm.valid) {
            !isNullOrUndefined(this.nchs.beginDate) ? this.nchs.beginDate = Date.parse(this.nchs.beginDate) : null;
            !isNullOrUndefined(this.nchs.endDate) ? this.nchs.endDate = Date.parse(this.nchs.endDate) : null;
            !isNullOrUndefined(this.nchs.payorID) ? this.nchs.payorID = this.nchs.payorID.payorID : null;
            !isNullOrUndefined(this.nchs.procodeID) ? this.nchs.procodeID = this.nchs.procodeID.ProcodeID : null;
            this.nchs.referralTypeID = 8;
            this.nchs.clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey() || 4620;
            this.nchs.enterBy = localStorage.getItem('UserEmail') || 'unknown user';
            console.log("Form Values", this.nchs);
            if (!this.nchs.referralID) {
                this._opencard.saveNCHSReferral(this.nchs).then((data: any) => {
                    loader.style.display = 'none';
                    swal('Created', 'NC-HS referral has been created!', 'success');
                    localStorage.setItem('referralId', (data.referralID) + this._opencard.getHasKey());
                    return this._router.navigate(['/nc-hs/detail']);
                })
            } else {
                this._opencard.updateNCHSReferral(this.nchs).then((data: any) => {
                    loader.style.display = 'none';
                    swal('Updated', 'NC-HS referral has been updated!', 'success');
                    this.getRecById();
                    return this._router.navigate(['/nc-hs/detail']);
                })
            }
        }
        else {
            loader.style.display = 'none';
            return swal('Mandatory fields missing!', 'Please fill the mandatory fields.', 'info');
        }
    }

    getMetaData(label: string, event: any) {
        let req = { value: event.query }
        switch (label) {
            case 'payor':
                req['Object'] = 'payor'
                break;
        }

        this._caseTeam.getSearchList(req).then((data: any) => {
            this.metaData = data.dropDown;
        })

    }

    getProcodeByReferral() {
        let req = { referralTypeID: 8 }
        this._opencard.getProcodeBasedOnReferralType(req).then((data: any) => {
            this.procodes = data.procode;
        })
    }

    filteredProcodeyReferral(event: any) {
        this.metaData = this.procodes.filter((item: any) => {
            return item.ProcodeName.indexOf(event.query) !== -1;
        })
    }

    getRecById() {
        const loader = document.getElementById('loading-overlay') as HTMLElement;
        loader.style.display = 'block';
        let req = { referralID: parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey() }
        this._opencard.getNCHSReferralByID(req).then((data: any) => {
            loader.style.display = 'none';
            delete data.referralDetails.payorId;
            !isNullOrUndefined(data.referralDetails.beginDate) ? data.referralDetails.beginDate = new Date(data.referralDetails.beginDate) : null;
            !isNullOrUndefined(data.referralDetails.endDate) ? data.referralDetails.endDate = new Date(data.referralDetails.endDate) : null;
            this.nchs = data.referralDetails;
            this.nchs.payorID = data.payorDetails;
            this.nchsForm.disable();
            this.nchsForm.get('payorID').clearValidators();
            this.nchsForm.get('units').clearValidators();
            this.nchsForm.get('unitRate').clearValidators();
            this.nchsForm.get('procodeID').clearValidators();
            this.isEditControll = true;
            this.isFormLog = true;
            this.formLogInfo.changedBy = !isNullOrUndefined(data.referralDetails.changedBy) ? data.referralDetails.changedBy : '------';
            this.formLogInfo.changedDate = !isNullOrUndefined(data.referralDetails.changedDate) ? moment(data.referralDetails.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
            this.formLogInfo.enteredBy = !isNullOrUndefined(data.referralDetails.enteredBy) ? data.referralDetails.enteredBy : '------';
            this.formLogInfo.enteredDate = !isNullOrUndefined(data.referralDetails.enteredDate) ? moment(data.referralDetails.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      

        })
    }

    editForm() {
        this.isEditControll = false;
        this.nchsForm.enable();
    }

}