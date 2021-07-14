import { OnInit, Component } from "@angular/core";
import { ProviderEmailOptions } from "./provider-email-module";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-provider-email-module',
    templateUrl: './provider-email-module.component.html',
    styleUrls: ['./provider-email-module.component.scss']
})
export class ProviderEmailModuleComponent implements OnInit {

    emailOptions: ProviderEmailOptions = new ProviderEmailOptions();
    providerEmailOptionsValue = [
        { label: '*Only Open SFCS Sponsored Homes', value: 1 },
        { label: 'Client - Child Placements (4 - 12 years)', value: 2 },
        { label: 'Client - Infant Placements (< 12 months)', value: 3 },
        { label: 'Client - Teen Placements (> 13 years)', value: 4 },
        { label: 'Client - Toddler Placements (< 3 years)', value: 5 },
        { label: 'County', value: 6 },
        { label: 'FCH Office', value: 7 },
        { label: 'FCH Staff', value: 8 },
        { label: 'Open Beds - Actual vs License', value: 9 },
        { label: 'Open Beds - Actual vs Perference', value: 10 },
        { label: 'Placement Procode', value: 11 },
        { label: 'Provider Type', value: 12 },
        { label: 'Sponsor', value: 13 },
    ];
    searchOptionsResult = [];
    totalCount = 0;
    searchOptionsTableHeader = [];
    providerOptionsTableHeader = [];
    searchOptionsTableColumn = [];
    autoLayout = true;
    rowData = [];
    selectedProviderResults = [];
    tableLoader = false;
    furits = { apple: '10', mango: '20', orange: '30', graphes: '40' };
    selectedSearchOption = [];
    proivderResult = [];
    isSearchOptions = false;
    isProviderResult = false;
    emailRequestOptions: string;
    isSearchOptionExportBtnLabel = 'Export';
    isProviderResultExportBtnLabel = 'Export';
    providerResultRowData = [];
    searchOptionsRowData = [];


    constructor(public _opencard: OpencardsService, public _toast: MessageService) { }

    ngOnInit() { }


    onProviderEmailOptionsClick(event: any, value: number) {
        this.emailRequestOptions = '';
        switch (value) {
            case 1:
                (event) ? this.emailOptions.issfcsSponsored = true : this.emailOptions.issfcsSponsored = false;
                break;
            case 2:
                (event) ? this.emailOptions.isChildPlacements = true : this.emailOptions.isChildPlacements = false;
                break;
            case 3:
                (event) ? this.emailOptions.isInfantPlacements = true : this.emailOptions.isInfantPlacements = false;
                break;
            case 4:
                (event) ? this.emailOptions.isTeenPlacements = true : this.emailOptions.isTeenPlacements = false;
                break;
            case 5:
                (event) ? this.emailOptions.isToddlerPlacements = true : this.emailOptions.isToddlerPlacements = false;
                break;
            case 6:
                (event) ? this.emailOptions.isCounty = true : this.emailOptions.isCounty = false;
                this.emailRequestOptions = 'county';
                break;
            case 7:
                (event) ? this.emailOptions.isFCHOffice = true : this.emailOptions.isFCHOffice = false;
                this.emailRequestOptions = 'fchOffice';
                break;
            case 8:
                (event) ? this.emailOptions.isFCHStaff = true : this.emailOptions.isFCHStaff = false;
                this.emailRequestOptions = 'fchStaff';
                break;
            case 9:
                (event) ? this.emailOptions.isActualvsLicense = true : this.emailOptions.isActualvsLicense = false;
                break;
            case 10:
                (event) ? this.emailOptions.isActualvsPreference = true : this.emailOptions.isActualvsPreference = false;
                break;
            case 11:
                (event) ? this.emailOptions.isPlacementProcode = true : this.emailOptions.isPlacementProcode = false;
                this.emailRequestOptions = 'placementProcode';
                break;
            case 12:
                (event) ? this.emailOptions.isProviderType = true : this.emailOptions.isProviderType = false;
                this.emailRequestOptions = 'providerType';
                break;
            case 13:
                (event) ? this.emailOptions.isSponsor = true : this.emailOptions.isSponsor = false;
                this.emailRequestOptions = 'sponsor';
                break;
        }
    }

    async onSearchEmailOptions() {
        let result: any;
        this.totalCount = 0;
        this.searchOptionsResult = [];
        this.proivderResult = [];
        this.searchOptionsRowData = [];
        this.tableLoader = true;
        this.selectedSearchOption = [];
        this.selectedProviderResults = [];
        result = await this._opencard.getPlacementEmailOptions(this.emailOptions);
        this.totalCount = result.totalcount;
        this.providerResultRowData = [];
        this.tableLoader = false;
        if (result.searchOptionList.length > 0) {
            this.isSearchOptions = true;
            this.isProviderResult = true;
            result.searchOptionList.filter((item) => this.searchOptionsResult.push(item));
            this.formTable(this.searchOptionsResult, 'search');
            this.searchOptionsRowData = this.searchOptionsResult;
        } else {
            this.isProviderResult = true;
            this.isSearchOptions = true;
            result.providerResultList.filter((item) => this.proivderResult.push(item));
            this.formTable(this.proivderResult, 'provider');
            this.providerResultRowData = this.proivderResult;
        }
    }

    formTable(searchResult: any[], type?: string) {
        let headers = [];
        searchResult.filter((item) => {
            headers.push(Object.keys(item));
        })
        if (type === 'provider') {
            headers[0].splice(headers[0].indexOf('Limit To'), 1);
            return this.providerOptionsTableHeader = headers[0];
        } else {
            headers[0].splice(headers[0].indexOf('limitTo'), 1);
            return this.searchOptionsTableHeader = headers[0];
        }
    }

    // onResetEmailOptions() {
    //     this.providerEmailOptionsValue = this.providerEmailOptionsValue;
    // }

    async onSubmitEamilOptions() {
        let request = {}, response: any;
        this.tableLoader = true;
        if (this.emailOptions.isCounty) {
            request['county'] = this.selectedSearchOption.map(item => { return item.countyID });
        } else if (this.emailOptions.isFCHOffice) {
            request['fchOffice'] = this.selectedSearchOption.map(item => { return item.sfaOfficeID });
        } else if (this.emailOptions.isFCHStaff) {
            request['fchStaff'] = this.selectedSearchOption.map(item => { return item.staffID });
        } else if (this.emailOptions.isPlacementProcode) {
            request['placementProcode'] = this.selectedSearchOption.map(item => { return item.procodeID });
        } else if (this.emailOptions.isProviderType) {
            request['providerType'] = this.selectedSearchOption.map(item => { return item.providerTypeID });
        } else if (this.emailOptions.isSponsor) {
            request['sponsor'] = this.selectedSearchOption.map(item => { return item.sponsorID });
        } else {
            return;
        }
        response = await this._opencard.getProviderEmailModuleSearchResults(request);
        this.isProviderResult = true;
        this.isSearchOptions = true;
        this.tableLoader = false;
        this.totalCount = response.totalcount;
        this.providerResultRowData = response.providerResultList;
        this.formTable(response.providerResultList, 'provider');
    }

    getEmailIds = () => { return Promise.all(this.selectedProviderResults.map((item: any) => { return item.Email })); }

    async onProviderResultEmail() {
        let selectedEmailIds = [], selectedEmailAdresses: any;
        selectedEmailIds = await this.getEmailIds();
        selectedEmailAdresses = selectedEmailIds.join(',');
        if (selectedEmailAdresses.length <= 2042) {
            console.log("Email url", `mailto:?subject=Provider BCC Email List&body=${selectedEmailIds}`);
            window.open(`mailto:?subject=Provider BCC Email List&body=${selectedEmailIds}`);
            window.open(`mailto:${selectedEmailIds}`);
            return;
        } else {
            return this._toast.add({ severity: 'Info', summary: 'Email body content exceeds!', detail: 'Kindly copy email address and then mail!' });
        }
    }

    async onCopyEmailAddress() {
        let selectedEmailIds = [];
        selectedEmailIds = this.selectedProviderResults.map((item: any) => { return item.Email });
        let selectedEmails = selectedEmailIds.join(',');
        await (navigator as NavigatorExtended).clipboard.writeText(selectedEmails);
        this._toast.add({ severity: 'Info', summary: 'Email address are copied!' });
        return;
    }

    onCheckAll() {
        this.selectedProviderResults = this.providerResultRowData.filter((item: any) => { return item.Email !== null });
        this._toast.add({ severity: 'Info', summary: 'Records has been checked!' });
    }

    onUncheckAll() {
        this.selectedProviderResults = [];
        this._toast.add({ severity: 'Info', summary: 'Records has been unchecked!' });
    }

    async onSearchOptionsExport() {
        let request = { fileName: 'SearchOptionResults' };
        if (this.selectedSearchOption.length > 0) {
            if (this.emailOptions.isCounty) {
                request['isCounty'] = true;
            } else if (this.emailOptions.isFCHOffice) {
                request['isFCHOffice'] = true;
            } else if (this.emailOptions.isFCHStaff) {
                request['isFCHStaff'] = true;
            } else if (this.emailOptions.isPlacementProcode) {
                request['isPlacementProcode'] = true;
            } else if (this.emailOptions.isProviderType) {
                request['isProviderType'] = true;
            } else if (this.emailOptions.isSponsor) {
                request['isSponsor'] = true;
            } else {
                return;
            }
            this.isSearchOptionExportBtnLabel = 'Exporting...';
            let response = await this._opencard.providerEmailModuleSearchOptionExport(request);
            this.isSearchOptionExportBtnLabel = 'Export';
            return window.open(response.filePath);
        } else {
            return this._toast.add({ severity: 'Info', summary: 'Kindly select the records!' });
        }
    }

    async onProviderResultsExport() {
        let request = { fileName: 'ProviderResults' }
        if (this.selectedSearchOption.length > 0) {
            if (this.emailOptions.isCounty) {
                request['county'] = this.selectedSearchOption.map(item => { return item.countyID });
            } else if (this.emailOptions.isFCHOffice) {
                request['fchOffice'] = this.selectedSearchOption.map(item => { return item.sfaOfficeID });
            } else if (this.emailOptions.isFCHStaff) {
                request['fchStaff'] = this.selectedSearchOption.map(item => { return item.staffID });
            } else if (this.emailOptions.isPlacementProcode) {
                request['placementProcode'] = this.selectedSearchOption.map(item => { return item.procodeID });
            } else if (this.emailOptions.isProviderType) {
                request['providerType'] = this.selectedSearchOption.map(item => { return item.providerTypeID });
            } else if (this.emailOptions.isSponsor) {
                request['sponsor'] = this.selectedSearchOption.map(item => { return item.sponsorID });
            } else {
                return;
            }
            this.isProviderResultExportBtnLabel = 'Exporting...';
            let response = await this._opencard.providerEmailModuleProviderResultExport(request);
            this.isProviderResultExportBtnLabel = 'Export';
            return window.open(response.filePath);
        } else {
            return this._toast.add({ severity: 'Info', summary: 'Kindly select the records!' });
        }
    }
}