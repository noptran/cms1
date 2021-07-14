import { Component, OnInit } from "@angular/core";
import { PrintService } from "../service/print.service";
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import {LocalValues} from '../../local-values';
import { PPS5120Form } from "../../placement-forms/placement-acknowledgement/placement-ack";


@Component({
    selector: 'app-referral-ack',
    templateUrl: './referral-ack.component.html',
    styleUrls: ['./referral-ack.component.scss'],
})
export class ReferralAcknowledgementComponent implements OnInit {
    pps5120: PPS5120Form = new PPS5120Form();

    constructor(public _print: PrintService, public _opencards: OpencardsService, public _localValues: LocalValues) { }

    ngOnInit() {
        this.getPrintAckFormValues();
    }

    async getPrintAckFormValues() {
        let request: any;
        request = {
            referralID: parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey(),
            clientID: parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey(),
            authorizationID: parseInt(localStorage.getItem('authorizationId')) - this._opencards.getHasKey(),
            phaseID: 0,
            pwsClientID: 0,
            releasedFromSRSCustodyClientID: 0
        };
        this.pps5120 = await this._opencards.getPPS5120PrintAckFormValues(request);
        this._print.isPrinting = true;
        this._print.onDataReady();
    }



}