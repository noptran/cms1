import { OnInit, Component } from "@angular/core";
import { NCFI } from "../referrals/family-preservation/NCFI";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CaseTeamService } from "../case-team/case-team.service";
import { isNullOrUndefined } from "util";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { ClildFormService } from "../child-forms/child-forms.service";
import * as moment from "moment";
import {LocalValues} from "../local-values";

@Component({
    templateUrl: './service-agreement.component.html',
    styleUrls: ['./service-agreement.component.scss'],
    selector: 'app-service-agreement'
})

export class ServiceAgreementComponent implements OnInit {
    procodesByRferral: any[];
    req: any;
    formLogInfo = {
        enteredBy: "",
        changedBy: "",
        enteredDate: "",
        changedDate: "",
      };
      isFormLog = false;
    

    constructor(public _fb: FormBuilder, public _caseTeam: CaseTeamService, public _openCard: OpencardsService,
        public _router: Router, public _client: ClildFormService, public _localValues: LocalValues) { }

    editControll = false;
    discardTo = '/reports/service-agreement/view';
    breadcrumbs = [];
    agreement: NCFI = new NCFI(); // Service agreement class
    serviceAgreementForm: FormGroup;
    metaData = [];

    ngOnInit() {
        this.formValidation();
        if (this._router.url === '/reports/service-agreement/detail') {
            this.getRecById();
        }
        this.breadcrumbs.push(
            { label: "List", href: "/reports/client", active: "" },
            { label: "Form", href: "/reports/client/details", active: "" },
            { label: "Case Form", href: "/reports/referral/family-preservation/detail", active: "" },
            { label: "Service Agreement List", href: "/reports/service-agreement/view", active: "" },
            { label: "Service Agreement", active: "active" },
        )
        let referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._openCard.getHasKey();
        if (referralTypeId === 7) {
            this.breadcrumbs = this._localValues.breadcrumbsChanges('homecounty-NCRFC', this.breadcrumbs)
        }
        if (referralTypeId === 8) {
            this.breadcrumbs = this._localValues.breadcrumbsChanges('serviceAgreement-NCHS', this.breadcrumbs)
        }
        if (referralTypeId === 9) {
            this.breadcrumbs = this._localValues.breadcrumbsChanges('serviceAgreeement-NCOPS', this.breadcrumbs)
        }
        this.getProcodes();
    }

    formAction() {
        if (this.serviceAgreementForm.valid) {
            !isNullOrUndefined(this.agreement.beginDate) ? this.agreement.beginDate = new Date(this.agreement.beginDate).getTime() : null;
            !isNullOrUndefined(this.agreement.endDate) ? this.agreement.endDate = new Date(this.agreement.endDate).getTime() : null;
            !isNullOrUndefined(this.agreement.eventClosureReasonID) ? this.agreement.eventClosureReasonID = this.agreement.eventClosureReasonID.eventClosureReasonID : null;
            !isNullOrUndefined(this.agreement.referralEventTypeID) ? this.agreement.referralEventTypeID = this.agreement.referralEventTypeID.referralEventTypeID : null;
            !isNullOrUndefined(this.agreement.payorID) ? this.agreement.payorID = this.agreement.payorID.payorID : null;
            !isNullOrUndefined(this.agreement.procodeID) ? this.agreement.procodeID = this.agreement.procodeID.ProcodeID : null;
            this.agreement.referralID = parseInt(localStorage.getItem('referralId')) - this._openCard.getHasKey();
            !isNullOrUndefined(this.agreement.referralEventID) ? this.udpate() : this.save();
        } else {
            swal('Mandatory fields missing!', 'Please fill the mandatory fields!', 'info');
        }

    }

    editForm() { this.editControll = false; this.serviceAgreementForm.enable(); }

    save() {
        let loader = document.getElementById("loading-overlay") as HTMLElement;
        loader.style.display = "block";
        this._openCard.saveServiceAgreement(this.agreement).then((data: any) => {
            loader.style.display = "none";
            if (data.responseStatus) {
                swal('Save!', 'Service agreement has been saved!', 'success');
                this._router.navigate(['/reports/service-agreement/view']);
            } else {
                swal('Something went wrong!', 'Please try again later!', 'error');
            }
        })
    }

    udpate() {
        let loader = document.getElementById("loading-overlay") as HTMLElement;
        loader.style.display = "block";
        this._openCard.updateServiceAgreement(this.agreement).then((data: any) => {
            loader.style.display = "none";
            if (data.responseStatus) {
                swal('Update!', 'Service agreement has been updated!', 'success');
                this._router.navigate(['/reports/service-agreement/view']);
            } else {
                swal('Something went wrong!', 'Please try again later!', 'error');
            }
        })
    }

    formValidation() {
        this.serviceAgreementForm = this._fb.group({
            referralEventTypeID: [null, Validators.compose([Validators.required])],
            beginDate: [null, Validators.compose([Validators.required])],
            endDate: [null],
            eventClosureReasonID: [null],
            procodeID: [null],
            units: [null],
            unitRate: [null],
            payorID: [null],
            notes: [null],
            referralID: [null]
        })
    }

    getMetaData(label: string, event: any) {
        let req: any, reqObject: any;
        switch (label) {
            case 'procode':
                reqObject = 'procode';
                break;
            case 'referralEventType':
                reqObject = 'referralEventType';
                break;
            case 'eventClosure':
                reqObject = 'eventClosureReason';
                break;
            case 'payor':
                reqObject = 'payor';
                break;
        }
        req = { Object: reqObject, value: event.query }
        this._caseTeam.getSearchList(req).then((data: any) => {
            data.dropDown.map((item: any) => {
                if (label === 'payor') {
                    item['payorDisplay'] = `${item.payorName} - ${item.alias}`;
                }
            })
            this.metaData = data.dropDown;
        })

    }

    getRecById() {
        let loader = document.getElementById("loading-overlay") as HTMLElement;
        loader.style.display = "block";
        this.req = { referralEventID: this._client.getId() };
        this._openCard.getServiceAgreement(this.req).then((data: any) => {
            loader.style.display = "none";
            if (data.referralEvent.isActive) {
                !isNullOrUndefined(data.referralEvent.beginDate) ? data.referralEvent.beginDate = new Date(data.referralEvent.beginDate) : null;
                !isNullOrUndefined(data.referralEvent.endDate) ? data.referralEvent.endDate = new Date(data.referralEvent.endDate) : null;
            } else {
                !isNullOrUndefined(data.referralEvent.beginDate) ? data.referralEvent.beginDate = moment.utc(data.referralEvent.beginDate).format('MM/DD/YYYY HH:mm') : null;
                !isNullOrUndefined(data.referralEvent.endDate) ? data.referralEvent.endDate = moment.utc(data.referralEvent.endDate).format('MM/DD/YYYY HH:mm') : null;
            }
            data.referralEvent.payorID['payorDisplay'] = `${data.referralEvent.payorID.payorName} - ${data.referralEvent.payorID.alias}`;
            data.referralEvent.procodeID['ProcodeName'] = `${data.referralEvent.procodeID.procode} - ${data.referralEvent.procodeID.categoryOfService}`;
            this.serviceAgreementForm.disable();
            this.editControll = true;
            this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.referralEvent.changedBy) ? data.referralEvent.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.referralEvent.changedDate) ? moment(data.referralEvent.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.referralEvent.enteredBy) ? data.referralEvent.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.referralEvent.enteredDate) ? moment(data.referralEvent.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

            this.agreement = data.referralEvent;
        })
    }

    filteredProcodes(event: any) {
        this.metaData = [];
        this.procodesByRferral.filter((item: any) => {
            if (item.ProcodeName.toLowerCase().indexOf(event.query) !== -1) {
                this.metaData.push(item);
            }
        })
    }

    getProcodes() {
        let req = { referralTypeID: parseInt(localStorage.getItem('referralTypeId')) - this._openCard.getHasKey() }
        this._openCard.getProcodeBasedOnReferralType(req).then((data: any) => { this.procodesByRferral = data.procode })

    }


}