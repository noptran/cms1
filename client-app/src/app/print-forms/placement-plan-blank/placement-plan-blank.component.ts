import { Component, OnInit } from '@angular/core';
import { PrintService } from '../../print-layout/service/print.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import * as moment from 'moment';
import {LocalValues} from '../../local-values';
import { PlacementService } from '../../placement/placement.service';

@Component({
  selector: 'app-placement-plan-blank',
  templateUrl: './placement-plan-blank.component.html',
  styleUrls: ['./placement-plan-blank.component.scss']
})
export class PlacementPlanBlankComponent implements OnInit {
  placementPlanInfo: any;
  isEmailFooterRequired = true;
  plan: any;
  autofetchInfo: any;
  currentURL: string;
  isBlankForm = true;
  currentClientID: number;
  clientStrengthsList = [];
  medicationsList = [];
  clientsProfileList = [];
  preventativeMeasuresList = [];
  currentPlacementId: number;
  isRespiteAuthFetched = false;
  respiteAuthorization: any;

  constructor(public _placement: PlacementService, public _localValues: LocalValues, public printService: PrintService, public _router: Router, public _opencard: OpencardsService) { }

  ngOnInit() {
    this.currentPlacementId = (parseInt(localStorage.getItem('placementID')) - this._opencard.getHasKey());
    this.currentClientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
    this.currentURL = this._router.url.includes('?') ? this._router.url.split('?')[0] : this._router.url;
    this.plan = this._opencard.getPlacementPlanInfo().placementPlan;
    this.autofetchInfo = this._opencard.getPlacementPlanInfo().autofetch;
    this.getClientStrengthsList();
    this.getMedicationsList();
    this.getClientProfileList();
    this.getPreventativeMeasuresList();
    this.getRespiteAuthorization();

    if (this.currentURL == '/placement-plan-blank') {
      this.isBlankForm = true;
    }
    else if (this.currentURL == '/placement-plan-draft') {
      this.isBlankForm = false;
    }
  }

  autofetchOptions(data, name, fieldName = '') {
    switch (name) {
      case 'date_conversion':
        return (data) ? moment.utc(data).format('MM/DD/YYYY HH:mm') : 'Information not provided'

      case 'kinship_options':
        return ((data === "true") ? "YES" : "NO")

      case 'radio_button_options':
        return ((data === 1) ? "YES" : "NO")

      case 'dropDown':
        return (data) ? data[fieldName] : null;

      case 'approve_options':
        return this.approveOptions(data);


    }
  }

  approveOptions(contactType) {
    switch (contactType) {
      case '76':
        return 'In Person'

      case '2':
        return 'By Phone'

      case '77':
        return 'By Email'
    }
  }

  getClientStrengthsList() {
    const clientStrengthReq = { openCard: "ClientStrength", beginPagination: 1, endPagination: 100 }
    this._opencard.listViewOfClientOpencards(this.currentClientID, clientStrengthReq)
      .then((data: any) => { this.clientStrengthsList = data.openCardList })
  }

  getMedicationsList() {
    const medicationsList = { openCard: "ClientMedication", beginPagination: 1, endPagination: 100, sort: { "column": "ClientMedicationID", "mode": "desc" } }
    this._opencard.listViewOfClientOpencards(this.currentClientID, medicationsList)
      .then((data: any) => { this.medicationsList = data.openCardList })
  }

  getClientProfileList() {
    const familyMemberReq = { openCard: "ClientProfile", beginPagination: 1, endPagination: 100 }
    this._opencard.listViewOfClientOpencards(this.currentClientID, familyMemberReq)
      .then((data: any) => { this.clientsProfileList = data.openCardList })
  }

  getPreventativeMeasuresList() {
    const preventativeMeasuresList = { openCard: "ClientPreventativeMeasure", beginPagination: 1, endPagination: 100, sort: { "column": "clientPreventativeMeasureID", "mode": "desc" } }
    this._opencard.listViewOfClientOpencards(this.currentClientID, preventativeMeasuresList)
      .then((data: any) => { this.preventativeMeasuresList = data.openCardList })
  }

  showTime(timeStamp: number) { return this._localValues.getDateandTimeWithExt(timeStamp) }

  getRespiteAuthorization() {
    let placementReq = { placementID: this.currentPlacementId }
    this._placement.getRespiteAuthorization(placementReq).then((data: any) => {
      this.isRespiteAuthFetched = true;
      this.respiteAuthorization = data.respiteAuthorization;
    })
  }


}
