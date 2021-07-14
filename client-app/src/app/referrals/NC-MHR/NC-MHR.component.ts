import { OnInit, Component } from "@angular/core";
import { NCMHR } from "./NC-MHR.class";
import { Router } from "@angular/router";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import swal from "sweetalert2";
import { isNullOrUndefined } from "util";
import {LocalValues} from "../../local-values";
import * as moment from 'moment';


@Component({
    selector: 'referral-nc-mhr',
    templateUrl: './NC-MHR.component.html',
    styleUrls: ['./NC-MHR.component.scss']
})
export class NCMHRComponent implements OnInit {
    constructor(public _router: Router, public _openCard: OpencardsService, public _fb: FormBuilder, public _localValues: LocalValues) { }

    ncMHR: NCMHR = new NCMHR();
    ncMHRForm: FormGroup;
    metaData = [];
    request: {};
    isEdit = false;
    ncMHROpencards = [];
    discardTo = '/reports/opencards/list/client/case';
    breadcrumbs = [];
    formLogInfo = {
        enteredBy: "",
        changedBy: "",
        enteredDate: "",
        changedDate: "",
      };
      isFormLog = false;

    ngOnInit() {
        this.formValidation();
        this.getNCMHRByReferralID();
        this.opencards();
        this.autoFetch();
    }

    formValidation() {
        this.ncMHRForm = this._fb.group({
            payorID: [null, Validators.compose([Validators.required])],
            beginDate: null,
            endDate: null,
            facts: null,
            notes: null
        })
    }

    async getAndFilterCasePayor(event: any) {
        let req = { Object: "payor", value: event.query }, payorData = [];
        payorData = await this._openCard.getDropdownValues(req)
        this.metaData = payorData.filter(item => { return item.payorName.toLowerCase().indexOf(event.query) !== -1 })
    }

    async  formActions() {
        let APIData: any
        if (this.ncMHRForm.valid) {
            !isNullOrUndefined(this.ncMHR.payorID) ? this.ncMHR.payorID = this.ncMHR.payorID.payorID : null;
            !isNullOrUndefined(this.ncMHR.beginDate) ? this.ncMHR.beginDate = this._localValues.stringFormatDatetime(this.ncMHR.beginDate) : null;
            !isNullOrUndefined(this.ncMHR.endDate) ? this.ncMHR.endDate = this._localValues.stringFormatDatetime(this.ncMHR.endDate) : null;
            this.ncMHR.referralTypeID = 11;
            this.ncMHR.clientID = parseInt(localStorage.getItem('clientId')) - this._openCard.getHasKey();
            if (this.ncMHR.caseID) {
                APIData = await this._openCard.updateNCMHRReferral(this.ncMHR)
                console.log("Update Loader end", APIData);
                // await this.getNCMHRByReferralID({ referralID: APIData.referralID });
                swal('Update', 'Referral programs has been updated!', 'success');
                return this._router.navigate(['/reports/opencards/list/client/case']);
            } else {
                APIData = await this._openCard.saveNCHSReferral(this.ncMHR)
                console.log("Save Loader end", APIData);
                // await this.getNCMHRByReferralID({ referralID: APIData.referralID });
                swal('Create', 'Referral program has been created!', 'success');
                return this._router.navigate(['/reports/opencards/list/client/case']);
            }
        } else { return swal("Validation Error!", "Please fill all the mandatory fields.", "info") }
    }

    async getNCMHRByReferralID(req?: { referralID: number }) {
        let response: any;
        if (this._router.url === '/nc-mhr/detail') {
            this.request = {
                referralID: parseInt(localStorage.getItem('referralId')) - this._openCard.getHasKey(),
                clientID: parseInt(localStorage.getItem('clientId')) - this._openCard.getHasKey()
            }
            response = await this._openCard.getNCMHRReferralByID(this.request);
            delete response.referralDetails.payorId;
            response.referralDetails.beginDate = (response.referralDetails.beginDate) ? new Date(response.referralDetails.beginDate) : null;
            response.referralDetails.endDate = (response.referralDetails.endDate) ? new Date(response.referralDetails.endDate) : null;
            this.ncMHR = response.referralDetails;
            this.ncMHR.payorID = response.payorDetails;
            this.isEdit = true;
            this.ncMHRForm.disable()
            this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined( response.referralDetails.changedBy) ?  response.referralDetails.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined( response.referralDetails.changedDate) ? moment( response.referralDetails.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined( response.referralDetails.enteredBy) ?  response.referralDetails.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined( response.referralDetails.enteredDate) ? moment( response.referralDetails.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

        }
        // else {
        //     this.request = req;
        //     this.request['clientID'] = parseInt(localStorage.getItem('clientId')) - this._openCard.getHasKey();
        //     console.log("Request from parameter", this.request);
        // }
    }

    editForm() {
        this.isEdit = false;
        this.ncMHRForm.enable();
    }

    opencards() {
        this.ncMHROpencards.push(
            { title: 'Authorization Summary (View Only)', routerLink: '/reintegration/referral/service/authorization/summary' },
            { title: 'Case File Actitvity', routerLink: '/reintegration/referral/opencard/case-file-activity/view' },
            { title: 'Case Team', routerLink: '/reports/referral/family-preservation/case-team/view' },
            { title: 'Family', routerLink: '/reports/family/view' },
            { title: 'Home County', routerLink: '/reports/referral/family-preservation/home-county/view' },
            { title: 'Placements', routerLink: '/reintegration/referral/opencard/placement/view' },
            { title: 'Schools', routerLink: '/reintegration/referral/opencard/school/dashboard' },
            { title: 'SFM Office', routerLink: '/reports/referral/family-preservation/sfcs-office/view' },
        )
    }

    autoFetch() {
        this.breadcrumbs.push(
            { label: 'Person Types', href: '/reports/person/types', active: '' },
            { label: 'Client', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'NC-MHR', href: '', active: 'active' }
        )
        if (this._router.url === '/nc-mhr/new') {
            this.ncMHRForm.get('endDate').disable();
            this.ncMHR.beginDate = new Date();
        }
    }
}