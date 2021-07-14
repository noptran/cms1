import { Component, OnInit, ViewChild } from '@angular/core';
import { OpencardsService } from '../../../../opecards-list-view/opencards.service';
import { AppSharedSFMOfficeComponent } from '../Form/SFM-office-form.component';
import { AgencySFMOffice } from '../sfm-office';

@Component({
    selector: 'app-shared-sfm-office-list',
    templateUrl: './SFM-office-list.component.html',
    styleUrls: ['./SFM-office-list.component.scss']
})
export class AppSharedSFMOfficeListComponent implements OnInit {

    public isPopupWindow = false;
    public dataList = [];
    public dataListHeaders = [
        { label: 'SFM Office', value: 'sfmOffice' }
    ];
    @ViewChild(AppSharedSFMOfficeComponent, { static: true }) appSharedSFMOfficeComponent: AppSharedSFMOfficeComponent;

    constructor(public _openCard: OpencardsService) { }

    ngOnInit() {
    }

    onClickListAddBtn() {
        // onClickListAddBtn
    }

}
