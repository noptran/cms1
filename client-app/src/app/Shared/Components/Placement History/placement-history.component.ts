import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlacementHistoryDomain } from './placement-history-domain.class';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-placement-history',
    templateUrl: './placement-history.component.html',
    styleUrls: ['./placement-history.component.scss'],
})
export class PlacementHistoryComponent implements OnInit {

    isPrompt: boolean;
    placementHistoryDomain: PlacementHistoryDomain = new PlacementHistoryDomain();
    public histories = [];
    public isLoading: boolean;
    isAchHistoryView: boolean;
    isPSA_View: boolean;
    psaID: any;
    isPSAPrompt: boolean = false;

    constructor(public _opencard: OpencardsService, public _router: Router, ) { }

    ngOnInit() {
        if (this._router.url.includes("reintegration/referral/opencard/placement/living-arrangement")) {
            this.getLivingArraingmentHistory();
        } else {
            this.getPlacementHistories();
        }
    }
    async getLivingArraingmentHistory() {
        this.isLoading = true;
        this.isPrompt = true;
        let Req = {
            "referralID": parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey(),
            "clientID": parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey(),
            "authorizationID": parseInt(localStorage.getItem('authorizationId')) - this._opencard.getHasKey(),
        }
        this.histories = await this._opencard.getLiviningArrangeHistoy(Req);
        return this.isLoading = false;
    }
    async getPlacementHistories() {
        this.isLoading = true;
        this.isPrompt = true;
        const request =
        {
            referralID: parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey(),
            placementID: parseInt(localStorage.getItem('placementID')) - this._opencard.getHasKey(),
            authorizationID: parseInt(localStorage.getItem('authorizationId')) - this._opencard.getHasKey(),
            clientID: parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey(),
            placementDetailID: parseInt(localStorage.getItem('placementDetailID'))
        };
        // {
        //     "referralID": 17011,
        //     "clientID": 28905,
        //     "authorizationID": 109394,
        //     "placementDetailID": 58987
        // }
        // let request = {
        //     "referralID": 12402,
        //     "placementID": 27246,
        //     "authorizationID": 65509,
        //     "clientID": 6879,
        //     "placementDetailID": 40918
        // }
        this.histories = await this._opencard.getPlacementHistoy(request);
        return this.isLoading = false;
    }
    acknowledgementID: any;
    isAckPrompt = false;
    fchPrintPrompt = false;
    fchPrintID: any;
    fchPrintView = false;
    elecPrintView = false;
    elecSignData: any;
    historyData: any;
    printForm(selectedRowItem: any) {
        if (selectedRowItem.reportType.includes('Acknowledgement')) {
            this.isAckPrompt = true;
            this.acknowledgementID = selectedRowItem.printAcknowledgementID;
            this.isAchHistoryView = true;
            this.historyData = selectedRowItem;
        } else if (selectedRowItem.reportType.includes('ProviderServiceAgreement') || selectedRowItem.reportType.includes('PSA')) {
            this.isPSAPrompt = true;
            this.psaID = selectedRowItem.printProviderServiceAgreementID;
            this.isPSA_View = true;
        } else if (selectedRowItem.reportType.includes('FCHPlacementAgreement')) {
            this.fchPrintPrompt = true;
            this.fchPrintID = selectedRowItem.printFCHPlacementAgreementID;
            this.fchPrintView = true;
            this.elecPrintView = false;
        } else if (selectedRowItem.reportType.includes('ElecSignPlacementAgreement')) {
            this.fchPrintPrompt = true;
            this.fchPrintID = selectedRowItem.printFCHPlacementAgreementID;
            this.elecPrintView = true;
            this.fchPrintView = false;
            this.elecSignData = {
                "authorizationID": selectedRowItem.authorizationID,
                "staffID": parseInt(localStorage.getItem('UserId')) || 4620,
                "elecSignPlacementAgreementID": selectedRowItem.elecSignPlacementAgreementID,
                "void": selectedRowItem.void,
                "restartProcess": 0
            }
        }
    }
    @Output() closeModel = new EventEmitter<string>();
    close() {
        var closeEV = "false";
        this.closeModel.emit(closeEV)
        console.log("closed>>>>");
    }
    ack_close() {
        this.isAchHistoryView = false;
    }
    psa_close() {
        this.isPSA_View = false;
    };
    fch_close() {
        this.fchPrintView = false;
        this.elecPrintView = false;
    }
    closeAckWindow(event) {
        console.log("event>>>", event);
        if (event.includes('Acknowledgement')) {
            this.isAckPrompt = false;
        } else if (event.includes('ProviderServiceAgreement') || event.includes('PSA')) {
            this.isPSAPrompt = false;
        } else if (event.includes('FCHPlacementAgreement')) {
            this.fchPrintPrompt = false;
        } else if (event.includes('ElecSignPlacementAgreement')) {
            this.fchPrintPrompt = false;
        }
    }
}
