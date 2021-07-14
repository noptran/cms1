import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import {LocalValues} from '../../local-values';
import * as moment from 'moment';
import { ClildFormService } from '../../child-forms/child-forms.service';


@Component({
  selector: 'app-placement-ref-draft',
  templateUrl: './placement-ref-draft.component.html',
  styleUrls: ['./placement-ref-draft.component.scss'],
  inputs: [
    "blankFromFormFooterComp",
    "draftFromFormFooterComp",
  ],
})
export class PlacementRefDraftComponent implements OnInit {
  @Input()
  blankFromFormFooterComp: boolean;
  draftFromFormFooterComp: boolean;

  currentReferralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
  currentClientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
  clientStrengthsList = [];

  
  currentPlacementReferral: number;
  autoFetch: any;
  clientsSiblingsOohPlacementList: any;
  clientsProfileList: any;
  preventativeMeasuresList: any;
  assessmentsList: any;
  medicationsList: any;
  appointmentsList: any;
  visitationsList: any;
  placementRef: any;
  sibilingsInOOHPlacement: any;
  placementHistoriesList: any;
  mentalAppointmentsList: any;

  constructor(public _router: Router, public _opencard: OpencardsService, public _localValues: LocalValues, public _activateRoute: ActivatedRoute,public _client: ClildFormService) { }

  ngOnInit() {
    console.log("PR test");
    this.getAutoFectch();
    this.getClientStrengthsList();
    this.getFamilyMemberList();
    this.getClientProfileList();
    this.getPreventativeMeasuresList();
    this.getAssessmentsList();
    this.getMedicationsList();
    this.getAppointmentsList();
    this.getPlacementOOHList();
    this.getPlacementReferral();
    this.placementRef = this._opencard.getPlacementReferralInfo().placementRef;
    this.autoFetch = this._opencard.getPlacementReferralInfo().autofetch;
    this.heightImplementation();
    console.log("this.placementRef >>>>>>>>>>>>>>>>>>>>is", this.placementRef);
    console.log("this.autoFetch >>>>>>>>>>>>>>>>>>>>is", this.autoFetch);
    this.currentPlacementReferral = parseInt(
      this._activateRoute.snapshot.queryParamMap.get("pl_ref_id")
    );
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

    if (this.placementRef.height.includes('.')) {
      let heightInInchesFeet = this.placementRef.height.split(".");
      let heightInFeet = heightInInchesFeet[0];
      let heightInInches = heightInInchesFeet[1];

      this.placementRef.height = heightInFeet + " ft " + heightInInches + ' in'
    }
    else {
      this.placementRef.height = this.placementRef.height + " ft"
    }
    if (this.placementRef.weight) {
      this.placementRef.weight = this.placementRef.weight + ' lbs'
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

  getAutoFectch() {
    let req = { referralID: this.currentReferralID }, autofetchData: any;
    this._opencard.getAutoFecthInfoForPlacementRef(req)
      .then((data: any) => {
        autofetchData = data.autofetchDetails[0];
        autofetchData.sEDwithCBS = (autofetchData.sEDwithCBS) ? 'true' : 'false';
        autofetchData.diagnosedMRDD = (autofetchData.diagnosedMRDD) ? 'true' : 'false';
        this.autoFetch = autofetchData;
      })
  }

  getPlacementReferral () {
     let req = { 
       placementReferralID: this.currentPlacementReferral || this._client.getId(),
       clientID: parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey(),
       referralID: parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey(),
     }
       this._opencard.getPlacementReferralPrint(req)
      .then((data: any) => { 
        this.clientStrengthsList = data.clientStrengthList;
        this.visitationsList = data.visitationList;
        this.clientsProfileList = data.clientProfileList; 
        this.preventativeMeasuresList = data.clientPreventativeMeasureList; 
        this.assessmentsList = data.assessmentsList;
        this.medicationsList = data.clientMedicationList;
        this.appointmentsList = data.appointmentsMedicalList;
        this.sibilingsInOOHPlacement = data.sibsInOOHList;
        this.placementHistoriesList = data.placementHistoryList;
        this.mentalAppointmentsList = data.appointmentsMentalList;
        })
    }

  getClientStrengthsList() {
    const clientStrengthReq = { openCard: "ClientStrength", beginPagination: 1, endPagination: 100 }
    this._opencard.listViewOfClientOpencards(this.currentClientID, clientStrengthReq)
      .then((data: any) => { 
       // this.clientStrengthsList = data.openCardList
      })
  }

  getSiblingsInOohList() { }

  getFamilyMemberList() {
    const familyMemberReq = { referralID: this.currentReferralID, beginPagination: 1, endPagination: 100, sort: { "column": "familyMemberReferralID", "mode": "desc" } }
    this._opencard.getExtendedFamilyList(familyMemberReq)
      .then((data: any) => { 
       // this.clientsSiblingsOohPlacementList = data.FamilyMemberReferral 
      })
  }

  getPlacementHistoryList() { }

  getClientProfileList() {
    const familyMemberReq = { openCard: "ClientProfile", beginPagination: 1, endPagination: 100 }
    this._opencard.listViewOfClientOpencards(this.currentClientID, familyMemberReq)
      .then((data: any) => { 
       // this.clientsProfileList = data.openCardList 
      })
  }

  getPreventativeMeasuresList() {
    const preventativeMeasuresList = { openCard: "ClientPreventativeMeasure", beginPagination: 1, endPagination: 100, sort: { "column": "clientPreventativeMeasureID", "mode": "desc" } }
    this._opencard.listViewOfClientOpencards(this.currentClientID, preventativeMeasuresList)
      .then((data: any) => { 
      //  this.preventativeMeasuresList = data.openCardList 
    })
  }

  getAssessmentsList() {
    const assessmentsListReq =
      { referralID: this.currentReferralID, clientID: this.currentClientID, beginPagination: 1, endPagination: 100, sort: { "column": "assessmentID", "mode": "desc" } }
    this._opencard.getAssessementsByClient(assessmentsListReq)
      .then((data: any) => { 
      //  this.assessmentsList = data.assessment 
    })
  }

  getMedicationsList() {
    const medicationsList = { openCard: "ClientMedication", beginPagination: 1, endPagination: 100, sort: { "column": "ClientMedicationID", "mode": "desc" } }
    this._opencard.listViewOfClientOpencards(this.currentClientID, medicationsList)
      .then((data: any) => { 
      //  this.medicationsList = data.openCardList 
    })
  }

  getAppointmentsList() {
    const appointmentsReq =
      { referralID: this.currentReferralID, beginPagination: 1, endPagination: 100, sort: { "column": "appointmentID", "mode": "desc" } }
    this._opencard.listAllAppointments(appointmentsReq)
      .then((data: any) => { 
       // this.appointmentsList = data.appointment 
      })
  }

  getPlacementOOHList() {
    const placementOOHList = { referralID: this.currentReferralID, clientID: this.currentClientID }
    this._opencard.listAllSibilings(placementOOHList)
      .then((data: any) => {
        //this.sibilingsInOOHPlacement = data.sibOOH
        //loader.style.display = 'none';
      })
  }

  showTime(timeStamp: number) { return this._localValues.getDateWithExt(timeStamp) }


}
