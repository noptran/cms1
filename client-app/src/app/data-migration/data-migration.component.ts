import { Component, OnInit } from '@angular/core';
import { TeamFormService } from '../team-form/team-form.service';
import swal from 'sweetalert2';
import {LocalValues} from '../local-values';

@Component({
  selector: 'app-data-migration',
  templateUrl: './data-migration.component.html',
  styleUrls: ['./data-migration.component.scss']
})
export class DataMigrationComponent implements OnInit {
  showMergeProvider = false;
  showMergeReferal = false;
  showMergeClient = false;
  showMergeSchool = false;
  showMergeStaff = false;
  showMergeDCFStaff = false;
  showMergeDHSStaff = false;
  showMergeDHSSStaff = false;
  showMergeFamilyMember = false;
  showMergePayee = false;
  showMergePayeeToProvider = false;
  showMovePlacement = false;
  showMovePlacementEvent = false;
  showMoveReferral = false;
  showMove_clientCase = false;
  providerTo: any;
  providerFrom: any;
  referralTo: any;
  referralFrom: any;
  clientTo: any;
  clientFrom: any;
  schoolFrom: any;
  schoolTo: any;
  staffFrom: any;
  staffTo: any;
  dcfStaffFrom: any;
  dcfStaffTo: any;
  dhsStaffFrom: any;
  dhsStaffTo: any;
  dhssStaffFrom: any;
  dhssStaffTo: any;
  familyMemberTo: any;
  familyMemberFrom: any;
  payeeFrom: any;
  payeeTo: any;
  placementFrom: any;
  placementTo: any;
  placementEventFrom: any;
  placementEventTo: any;

  constructor(public _team: TeamFormService, public _localValues: LocalValues, ) { }

  ngOnInit() {
  }
  dropReqObj: any;
  dropReqColName: any;
  isMerge = false;
  mergeClick(label) {
    this.placementEventList = [];
    this.showMovePlacement = false;
    this.showMovePlacementEvent = false;
    this.showMoveReferral = false;
    this.showMove_clientCase = false;
    this.isMove = false;
    this.isMerge = true;
    switch (label) {
      case 'mergeProvider':
        this.showMergeProvider = true;
        this.showMergeReferal = false;
        this.showMergeClient = false;
        this.showMergeSchool = false;
        this.showMergeStaff = false;
        this.showMergeDCFStaff = false;
        this.showMergeDHSStaff = false;
        this.showMergeDHSSStaff = false;
        this.showMergeFamilyMember = false;
        this.showMergePayee = false;
        this.showMergePayeeToProvider = false;
        this.dropReqObj = "provider";
        this.dropReqColName = "providerName";
        break;
      case 'mergeReferral':
        this.showMergeReferal = true;
        this.showMergeProvider = false;
        this.showMergeClient = false;
        this.showMergeSchool = false;
        this.showMergeStaff = false;
        this.showMergeDCFStaff = false;
        this.showMergeDHSStaff = false;
        this.showMergeDHSSStaff = false;
        this.showMergeFamilyMember = false;
        this.showMergePayee = false;
        this.showMergePayeeToProvider = false;
        this.dropReqObj = "referral";
        this.dropReqColName = "clientName";
        break;
      case 'mergeClient':
        this.showMergeReferal = false;
        this.showMergeProvider = false;
        this.showMergeClient = true;
        this.showMergeSchool = false;
        this.showMergeStaff = false;
        this.showMergeDCFStaff = false;
        this.showMergeDHSStaff = false;
        this.showMergeDHSSStaff = false;
        this.showMergeFamilyMember = false;
        this.showMergePayee = false;
        this.showMergePayeeToProvider = false;
        this.dropReqObj = "client";
        this.dropReqColName = "lastName";
        break;
      case 'mergeSchool':
        this.showMergeReferal = false;
        this.showMergeProvider = false;
        this.showMergeClient = false;
        this.showMergeSchool = true;
        this.showMergeStaff = false;
        this.showMergeDCFStaff = false;
        this.showMergeDHSStaff = false;
        this.showMergeDHSSStaff = false;
        this.showMergeFamilyMember = false;
        this.showMergePayee = false;
        this.showMergePayeeToProvider = false;
        this.dropReqObj = "school";
        this.dropReqColName = "schoolName";
        break;
      case 'mergeStaff':
        this.showMergeReferal = false;
        this.showMergeProvider = false;
        this.showMergeClient = false;
        this.showMergeSchool = false;
        this.showMergeStaff = true;
        this.showMergeDCFStaff = false;
        this.showMergeDHSStaff = false;
        this.showMergeDHSSStaff = false;
        this.showMergeFamilyMember = false;
        this.showMergePayee = false;
        this.showMergePayeeToProvider = false;
        this.dropReqObj = "staff";
        this.dropReqColName = "staffName";
        break;
      case 'mergeDCFStaff':
        this.showMergeReferal = false;
        this.showMergeProvider = false;
        this.showMergeClient = false;
        this.showMergeSchool = false;
        this.showMergeStaff = false;
        this.showMergeDCFStaff = true;
        this.showMergeDHSStaff = false;
        this.showMergeDHSSStaff = false;
        this.showMergeFamilyMember = false;
        this.showMergePayee = false;
        this.showMergePayeeToProvider = false;
        this.dropReqObj = "dcfStaff";
        this.dropReqColName = "lastName";
        break;
      case 'mergeDHSStaff':
        this.showMergeReferal = false;
        this.showMergeProvider = false;
        this.showMergeClient = false;
        this.showMergeSchool = false;
        this.showMergeStaff = false;
        this.showMergeDCFStaff = false;
        this.showMergeDHSStaff = true;
        this.showMergeDHSSStaff = false;
        this.showMergeFamilyMember = false;
        this.showMergePayee = false;
        this.showMergePayeeToProvider = false;
        this.dropReqObj = "dhsStaff";
        this.dropReqColName = "lastName";
        break;
      case 'mergeDHSSStaff':
        this.showMergeReferal = false;
        this.showMergeProvider = false;
        this.showMergeClient = false;
        this.showMergeSchool = false;
        this.showMergeStaff = false;
        this.showMergeDCFStaff = false;
        this.showMergeDHSStaff = false;
        this.showMergeDHSSStaff = true;
        this.showMergeFamilyMember = false;
        this.showMergePayee = false;
        this.showMergePayeeToProvider = false;
        this.dropReqObj = "dhhsStaff";
        this.dropReqColName = "lastName";
        break;
      case 'mergeDHSSStaff':
        this.showMergeReferal = false;
        this.showMergeProvider = false;
        this.showMergeClient = false;
        this.showMergeSchool = false;
        this.showMergeStaff = false;
        this.showMergeDCFStaff = false;
        this.showMergeDHSStaff = false;
        this.showMergeDHSSStaff = true;
        this.showMergeFamilyMember = false;
        this.showMergePayee = false;
        this.showMergePayeeToProvider = false;
        this.dropReqObj = "dhhsStaff";
        this.dropReqColName = "lastName";
        break;
      case 'mergeFamilymember':
        this.showMergeReferal = false;
        this.showMergeProvider = false;
        this.showMergeClient = false;
        this.showMergeSchool = false;
        this.showMergeStaff = false;
        this.showMergeDCFStaff = false;
        this.showMergeDHSStaff = false;
        this.showMergeDHSSStaff = false;
        this.showMergeFamilyMember = true;
        this.showMergePayee = false;
        this.showMergePayeeToProvider = false;
        this.dropReqObj = "familyMember";
        this.dropReqColName = "clientName";
        break;
      case 'mergePayee':
        this.showMergeReferal = false;
        this.showMergeProvider = false;
        this.showMergeClient = false;
        this.showMergeSchool = false;
        this.showMergeStaff = false;
        this.showMergeDCFStaff = false;
        this.showMergeDHSStaff = false;
        this.showMergeDHSSStaff = false;
        this.showMergeFamilyMember = false;
        this.showMergePayee = true;
        this.showMergePayeeToProvider = false;
        this.dropReqObj = "payee";
        this.dropReqColName = "payeeName";
        break;

      case 'mergePayeeToProvider':
        this.showMergeReferal = false;
        this.showMergeProvider = false;
        this.showMergeClient = false;
        this.showMergeSchool = false;
        this.showMergeStaff = false;
        this.showMergeDCFStaff = false;
        this.showMergeDHSStaff = false;
        this.showMergeDHSSStaff = false;
        this.showMergeFamilyMember = false;
        this.showMergePayee = false;
        this.showMergePayeeToProvider = true;
        this.dropReqObj = "payeeToProvider";
        break;
    }
  };
  isMove = false;
  moveClick(label) {
    this.isMove = true;
    this.isMerge = false;
    this.placementEventList = [];
    this.showMergeProvider = false;
    this.showMergeReferal = false;
    this.showMergeClient = false;
    this.showMergeSchool = false;
    this.showMergeStaff = false;
    this.showMergeDCFStaff = false;
    this.showMergeDHSStaff = false;
    this.showMergeDHSSStaff = false;
    this.showMergeFamilyMember = false;
    this.showMergePayee = false;
    this.showMergePayeeToProvider = false;
    switch (label) {
      case 'movePlacement':
        this.showMovePlacement = true;
        this.showMovePlacementEvent = false;
        this.showMoveReferral = false;
        this.showMove_clientCase = false;
        this.dropReqObj = "placement";
        this.dropReqColName = "clientName";
        break;
      case 'movePlacementEvent':
        this.showMovePlacement = false;
        this.showMovePlacementEvent = true;
        this.showMoveReferral = false;
        this.showMove_clientCase = false;
        this.dropReqObj = "placementDetail";
        this.dropReqColName = "clientName";
        break;
      case 'moveReferral':
        this.showMovePlacement = false;
        this.showMovePlacementEvent = false;
        this.showMoveReferral = true;
        this.showMove_clientCase = false;
        this.dropReqObj = "referral";
        this.dropReqColName = "clientName";
        break;
      case 'moveClientToCase':
        this.showMovePlacement = false;
        this.showMovePlacementEvent = false;
        this.showMoveReferral = false;
        this.showMove_clientCase = true;

        break;

    }
  }
  dropDownLists = [];
  getDataMaintanceDrop(event) {
    var REQ = {
      "object": this.dropReqObj,
      "value": event.query,
      "beginPagination": 1,
      "endPagination": 50,
      "sort": { "column": this.dropReqColName, "mode": "asc" }
    };
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._team.getDataMaintainenceDropDown(REQ).then(res => {
      if (this.dropReqObj === 'familyMember') {
        this.dropDownLists = res.dropDown;
      } else {
        this.dropDownLists = res.dropdown;
      }

      loader.style.display = 'none';
    }).catch(error => {
      loader.style.display = 'none';
    })
  };

  vendorIDValidation(event) {
    if (this.payeeTo.venderID !== this.payeeFrom.venderID) {
      swal(
        "Warning",
        "Merge of Payee cannot be performed when the venderIDs are different",
        "warning"
      );
      } else {
        let REQ = {
          "object": "Payee",
          "fromPayeeID": this.payeeFrom.payeeID,
          "toPayeeID": this.payeeTo.payeeID,
          "fromName": this.payeeFrom.payeeName,
          "toName": this.payeeTo.payeeName,
        }
        let loader = document.getElementById('loading-overlay') as HTMLElement
        loader.style.display = 'block';
        this._team.saveDataMaintainenceMerge(REQ).then(res => {
        if (res.responseStatus) {
        swal('Success', res.responseMessage, 'success');
      } else {
        swal('Warning', res.responseMessage, 'info');
      }
      loader.style.display = 'none';
    }).catch(error => {
      loader.style.display = 'none';
    })
   }
 }

  getDataMaintanProviderDrop(obj, event) {
    var REQ = {
      "object": obj,
      "value": event.query,
      "beginPagination": 1,
      "endPagination": 50,
    };
    if (obj === 'payee') {
      REQ['beginDate'] = this._localValues.stringFormatDatetime(Date.now());
    }
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._team.getDataMaintainenceDropDown(REQ).then(res => {
      if (obj === 'payee') {
        this.dropDownLists = res.payeeList;
      } else {
        this.dropDownLists = res.dropdown;
      }

      loader.style.display = 'none';
    }).catch(error => {
      loader.style.display = 'none';
    })
  }
  dataMaintananceMerge() {
    console.log("providerTo>>", this.providerTo);
    console.log("providerFrom>>", this.providerFrom);
    let REQ;
    switch (this.dropReqObj) {
      case 'provider':
        REQ = {
          "object": "Provider",
          "fromProviderID": this.providerFrom.providerID,
          "toProviderID": this.providerTo.providerID,
          "fromName": this.providerFrom.providerName,
          "toName": this.providerTo.providerName,
        }
        break;

      case 'referral':
        REQ = {
          "object": "Referral",
          "clientID": this.referralFrom.clientID,
          "fromCaseID": this.referralFrom.caseID,
          "toCaseID": this.referralTo.caseID,
          "fromReferralID": this.referralFrom.referralID,
          "toReferralID": this.referralTo.referralID,
          "fromName": this.referralFrom.clientName,
          "toName": this.referralTo.clientName,
        }
        break;
      case 'client':
        REQ = {
          "object": "Client",
          "toClientID": this.clientTo.clientID,
          "fromClientID": this.clientFrom.clientID,
          "fromName": this.clientFrom.clientName,
          "toName": this.clientTo.clientName,
        }
        break;
      case 'school':
        REQ = {
          "object": "School",
          "fromSchoolID": this.schoolFrom.schoolID,
          "toSchoolID": this.schoolTo.schoolID,
          "fromName": this.schoolFrom.name,
          "toName": this.schoolTo.name,
        }
        break;
      case 'staff':
        REQ = {
          "object": "Staff",
          "fromStaffID": this.staffFrom.StaffID,
          "toStaffID": this.staffTo.StaffID,
          "fromName": this.staffFrom.staffName,
          "toName": this.staffTo.staffName,
        }
        break;
      case 'dcfStaff':
        REQ = {
          "object": "DCFStaff",
          "fromStaffID": this.dcfStaffFrom.dhsStaffID,
          "toStaffID": this.dcfStaffTo.dhsStaffID,
          "fromName": this.dcfStaffFrom.staffName,
          "toName": this.dcfStaffTo.staffName,
        }
        break;
      case 'dhsStaff':
        REQ = {
          "object": "DHSStaff",
          "fromStaffID": this.dhsStaffFrom.dhsStaffID,
          "toStaffID": this.dhsStaffTo.dhsStaffID,
          "fromName": this.dhsStaffFrom.staffName,
          "toName": this.dhsStaffTo.staffName,
        }
        break;
      case 'dhhsStaff':
        REQ = {
          "object": "DHHSStaff",
          "fromStaffID": this.dhssStaffFrom.dhhsStaffID,
          "toStaffID": this.dhssStaffTo.dhhsStaffID,
          "fromName": this.dhssStaffFrom.staffName,
          "toName": this.dhssStaffTo.staffName,
        }
        break;
      case 'familyMember':
        REQ = {
          "object": "Family Member",
          "fromFamilyMemberID": this.familyMemberFrom.familyMemberID,
          "toFamilyMemberID": this.familyMemberTo.familyMemberID,
          "fromName": this.familyMemberFrom.name,
          "toName": this.familyMemberTo.name,
        }
        break;
      case 'payee':
        REQ = {
          "object": "Payee",
          "fromPayeeID": this.payeeFrom.payeeID,
          "toPayeeID": this.payeeTo.payeeID,
          "fromName": this.payeeFrom.payeeName,
          "toName": this.payeeTo.payeeName,
        }
        break;
      case 'payeeToProvider':
        REQ = {
          "object": "Payee to Provider",
          "fromPayeeID": this.payeeFrom.payeeID,
          "toProviderID": this.providerTo.providerID,
          "fromName": this.payeeFrom.payeeName,
          "toName": this.providerTo.providerName
        }
    }
    if (this.dropReqObj == 'payee') {
      this.vendorIDValidation("event") 
    } else {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._team.saveDataMaintainenceMerge(REQ).then(res => {
      if (res.responseStatus) {
        swal('Success', res.responseMessage, 'success');
      } else {
        swal('Warning', res.responseMessage, 'info');
      }
      loader.style.display = 'none';
    }).catch(error => {
      loader.style.display = 'none';
    })
   }
  };
  placementEventList = [];
  getDetail(event) {
    console.log("event>>>>", event);
    var REQ = {
      "placementID": event.placementID,
      "beginPagination": 1,
      "endPagination": 100,
      "sort": { "column": "placementDetailID", "mode": "desc" }
    }
    this._team.getPlacementEventList(REQ).then(res => {
      this.placementEventList = res.placementDetailList;
    })
  };
  placementDetaliID: any;
  getPlacementID(itm) {
    this.placementDetaliID = itm.placementDetailID;
  };
  dataMaintananceMove() {
    let REQ;
    switch (this.dropReqObj) {
      case 'placement':
        REQ = {
          "object": "Placement Event To Placement",
          "fromPlacementID": this.placementFrom.placementID,
          "toPlacementID": this.placementTo.placementID,
          "placementDetailID": this.placementDetaliID,
          "deleteMoveFromPlacement": true,
          "fromName": this.placementFrom.clientName,
          "toName": this.placementTo.clientName
        }
        break;
      case 'placementDetail':
        REQ = {
          "object": "Authorization to Placement Event",
          "fromPlacementDetailID": this.placementEventFrom.placementDetailID,
          "toPlacementDetailID": this.placementEventTo.placementDetailID,
          "fromName": this.placementEventFrom.clientName,
          "toName": this.placementEventTo.clientName
        }
    };
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._team.saveDataMaintainenceMove(REQ).then(res => {
      if (res.responseStatus) {
        swal('Success', res.responseMessage, 'success');
      } else {
        swal('Warning', res.responseMessage, 'info');
      }
      loader.style.display = 'none';
    }).catch(error => {
      loader.style.display = 'none';
    })
  };
  getDataMaintanceMoveDrop(event) {

  }
}
