import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import {LocalValues} from '../../local-values';
import { PrintService } from '../service/print.service';
import * as moment from 'moment';

@Component({
  selector: 'app-placement-draft-print',
  templateUrl: './placement-draft-print.component.html',
  styleUrls: ['./placement-draft-print.component.scss']
})
export class PlacementDraftPrintComponent implements OnInit {
  currentReferralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
  currentClientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
  clientStrengthsList = [];

  autoFetch: any;
  clientsSiblingsOohPlacementList: any;
  clientsProfileList: any;
  preventativeMeasuresList: any;
  assessmentsList: any;
  medicationsList: any;
  appointmentsList: any;
  placementRef: any;
  sibilingsInOOHPlacement: any;

  constructor(public printService: PrintService, public _router: Router, public _opencard: OpencardsService, public _localValues: LocalValues) { }

  async ngOnInit() {
    await this.getAutoFectch();
    await this.getClientStrengthsList();
    await this.getFamilyMemberList();
    await this.getClientProfileList();
    await this.getPreventativeMeasuresList();
    await this.getAssessmentsList();
    await this.getMedicationsList();
    await this.getAppointmentsList();
    await this.getPlacementOOHList();
    this.placementRef = this._opencard.getPlacementReferralInfo().placementRef;
    (!this.placementRef.kinship) ? this.placementRef['kinship'] = '' : null;
    this.autoFetch = this._opencard.getPlacementReferralInfo().autofetch;
    this.heightImplementation();
    this.printService.onDataReady();
  }

  heightCalculationForDataFetch() {

    let heightInFeet = Math.floor(this.placementRef.height / 12);
    let heightInInches = this.placementRef.height % 12;
    if (heightInInches != 0) {
      this.placementRef.height = parseFloat(heightInFeet + "." + heightInInches).toFixed(1);
    }
    else {
      this.placementRef.height = heightInFeet
    }


  }



  heightImplementation() {

    if (Number.isInteger(this.placementRef.height)) {
      this.heightCalculationForDataFetch();
    }
    let arr = [];
    (this.placementRef.height) ? arr = this.placementRef.height : null;
    if (arr.includes('.')) {
      let heightInInchesFeet = this.placementRef.height.split(".");
      let heightInFeet = heightInInchesFeet[0];
      let heightInInches = heightInInchesFeet[1];

      this.placementRef.height = heightInFeet + " ft + " + heightInInches + ' in'
    }
    else {
      this.placementRef.height = this.placementRef.height
    }
    if (this.placementRef.weight) {
      this.placementRef.weight = this.placementRef.weight
    }


  }

  autofetchOptions(data, name, fieldName = '') {
    switch (name) {
      case 'kinship_options':
        return ((data === "true") ? "YES" : "NO")

      case 'date_conversion':
        return moment.utc(data).format('MM/DD/YYYY')

      case 'dropDown':
        return (data) ? data[fieldName] : null;

    }
  }

  async getAutoFectch() {
    let req = { referralID: this.currentReferralID }, autofetchData: any;
    await this._opencard.getAutoFecthInfoForPlacementRef(req)
      .then((data: any) => {
        autofetchData = data.autofetchDetails[0];
        autofetchData.sEDwithCBS = (autofetchData.sEDwithCBS) ? 'true' : 'false';
        autofetchData.diagnosedMRDD = (autofetchData.diagnosedMRDD) ? 'true' : 'false';
        this.autoFetch = autofetchData;
      })
  }

  async getClientStrengthsList() {
    const clientStrengthReq = { openCard: "ClientStrength", beginPagination: 1, endPagination: 100 }
    await this._opencard.listViewOfClientOpencards(this.currentClientID, clientStrengthReq)
      .then((data: any) => { this.clientStrengthsList = data.openCardList })
  }

  getSiblingsInOohList() { }

  async getFamilyMemberList() {
    const familyMemberReq = { referralID: this.currentReferralID, beginPagination: 1, endPagination: 100, sort: { "column": "familyMemberReferralID", "mode": "desc" } }
    await this._opencard.getExtendedFamilyList(familyMemberReq)
      .then((data: any) => { this.clientsSiblingsOohPlacementList = data.FamilyMemberReferral })
  }

  getPlacementHistoryList() { }

  async getClientProfileList() {
    const familyMemberReq = { openCard: "ClientProfile", beginPagination: 1, endPagination: 100 }
    await this._opencard.listViewOfClientOpencards(this.currentClientID, familyMemberReq)
      .then((data: any) => { this.clientsProfileList = data.openCardList })
  }

  async getPreventativeMeasuresList() {
    const preventativeMeasuresList = { openCard: "ClientPreventativeMeasure", beginPagination: 1, endPagination: 100, sort: { "column": "clientPreventativeMeasureID", "mode": "desc" } }
    await this._opencard.listViewOfClientOpencards(this.currentClientID, preventativeMeasuresList)
      .then((data: any) => { this.preventativeMeasuresList = data.openCardList })
  }

  async getAssessmentsList() {
    const assessmentsListReq =
      { referralID: this.currentReferralID, clientID: this.currentClientID, beginPagination: 1, endPagination: 100, sort: { "column": "assessmentID", "mode": "desc" } }
    await this._opencard.getAssessementsByClient(assessmentsListReq)
      .then((data: any) => { this.assessmentsList = data.assessment })
  }

  async getMedicationsList() {
    const medicationsList = { openCard: "ClientMedication", beginPagination: 1, endPagination: 100, sort: { "column": "ClientMedicationID", "mode": "desc" } }
    await this._opencard.listViewOfClientOpencards(this.currentClientID, medicationsList)
      .then((data: any) => { this.medicationsList = data.openCardList })
  }

  async getAppointmentsList() {
    const appointmentsReq =
      { referralID: this.currentReferralID, beginPagination: 1, endPagination: 100, sort: { "column": "appointmentID", "mode": "desc" } }
    await this._opencard.listAllAppointments(appointmentsReq)
      .then((data: any) => { this.appointmentsList = data.appointment })
  }

  async getPlacementOOHList() {
    const placementOOHList = { referralID: this.currentReferralID, clientID: this.currentClientID }
    await this._opencard.listAllSibilings(placementOOHList)
      .then((data: any) => { this.sibilingsInOOHPlacement = data.sibOOH })
  }

  showTime(timeStamp: number) { return this._localValues.getDateWithExt(timeStamp) }



}
