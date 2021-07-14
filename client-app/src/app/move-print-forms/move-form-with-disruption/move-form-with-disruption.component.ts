import { Component, OnInit } from '@angular/core';
import { PrintService } from '../../print-layout/service/print.service';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import * as moment from 'moment';

@Component({
  selector: 'app-move-form-with-disruption',
  templateUrl: './move-form-with-disruption.component.html',
  styleUrls: ['./move-form-with-disruption.component.scss']
})
export class MoveFormWithDisruptionComponent implements OnInit {
  moveData: any;
  moveAutoFillData: any;
  moveForm: any;
  moveOffice: any;
  showData = false;
  childEnteredInfo = {
    providerName: '',
    phone: '',
    address: '',
    address2: '',
  };
  childEnteredInfoAddress: any;
  nameOfSchool: string;
  relativeType: string;
  childEnteredInfoProviderName: any;
  childEnteredInfoPhone: any;


  constructor(public _opencard: OpencardsService, public printService: PrintService) { }

  ngOnInit() {
    this.getDatas();
    // this.moveData = this._opencard.getMovePrintData();
    // console.log("moveData is,", this.moveData);
    // this.moveAutoFillData = this.moveData.autofetch;
    // this.moveForm = this.moveData.move;
    // this.moveData = this._opencard.getMovePrintData();
    // console.log('this._opencard.getMoveFormNewProviderInfo()>>>', this._opencard.getMoveFormNewProviderInfo());
    // if (this._opencard.getMoveFormNewProviderInfo().newPlacementProviderInfo) {
    //   this.childEnteredInfoProviderName = this._opencard.getMoveFormNewProviderInfo().newPlacementProviderInfo.providerName
    //   this.childEnteredInfoPhone = this._opencard.getMoveFormNewProviderInfo().newPlacementProviderInfo.phone;
    //   this.childEnteredInfoAddress = this._opencard.getMoveFormNewProviderInfo().newPlacementProviderInfo.address;

    // } else {

    // }
    // if (this.moveData) {
    //   this.childEnteredInfo = this.moveData.newProviderInfo;
    //   if (this.childEnteredInfo) {
    //     this.childEnteredInfoAddress = `${this.childEnteredInfo.address},${this.childEnteredInfo.address2}`
    //   }
    //   this.nameOfSchool = this._opencard.getMoveFormNewProviderInfo().nameOfSchool;
    //   this.relativeType = this._opencard.getMoveFormNewProviderInfo().relativeType;

    // }

  }

  printForm() {
    this.printService
      .printDocument('move-form-disruption', '');
  }

  timeStampConversion(data) {
    return (data) ? moment(data).format('MM/DD/YYYY') : "";
  }

  timeConversion(data) {
    return (data) ? moment(data).format('HH:mm') : "";
  }
  getDatas() {
    var req = {
      "moveEventID": parseInt(localStorage.getItem("moveEventID")),
      "clientID": parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey(),
      "referralID": parseInt(localStorage.getItem("referralId")) - this._opencard.getHasKey()
    }
    this._opencard.getMoveformPrintData(req).then(res => {
      this.moveAutoFillData = res.MoveEventAutoFill;
      this.moveForm = {
        departureDate: res.MoveEventAutoFill.DepartureDate,
        departureTime: res.MoveEventAutoFill.DepartureTime,
        reasonForMove_Notes: res.MoveEventAutoFill.ReasonNotes1,
        schoolAppointments_Notes: res.MoveEventAutoFill.ScheduledAppointment1,
        medications_Notes: res.MoveEventAutoFill.MedicationNotes1
      };
      this.moveOffice = res.MoveEventAutoFill.CaseMGMT_Office;
      this.showData = true;
    })
  }
}
