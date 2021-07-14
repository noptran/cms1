import { Component, OnInit } from '@angular/core';
import { PrintService } from '../../print-layout/service/print.service';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import * as moment from 'moment';

@Component({
  selector: 'app-move-form',
  templateUrl: './move-form.component.html',
  styleUrls: ['./move-form.component.scss', '../../family-preservation/family-preservation.scss']
})
export class MoveFormComponent implements OnInit {
  moveData: any;
  moveAutoFillData: any;
  moveForm: any;
  moveOffice: any;
  showData=false;
  childEnteredInfo: any;
  childEnteredInfoAddress: any;
  nameOfSchool: string;
  relativeType: string;
  facStaff: any;
  driveSig: any;
  res_famil_spon: any;
  childLefResFam: any;
  childTransfortSign: any;
  constructor(public _opencard: OpencardsService, public printService: PrintService) { }

  ngOnInit() {
    // this.pdfForm();
    // this.getDatas();
    // this.moveData = this._opencard.getMovePrintData();
    console.log("moveData is,", this.moveData, this._opencard.getMoveFormNewProviderInfo());
    console.log("this._opencard.getMoveFormNewProviderInfo()>>,", this._opencard.getMoveFormNewProviderInfo());

    // this.moveAutoFillData = this.moveData.autofetch;
    // this.moveForm = this.moveData.move;
    // this.moveOffice = this.moveData.moveOffice;
    // if (this._opencard.getMoveFormNewProviderInfo().newPlacementProviderInfo) {
    //   this.moveAutoFillData.FacilityName = this._opencard.getMoveFormNewProviderInfo().newPlacementProviderInfo.providerName;
    //   this.moveAutoFillData.facPhone = this._opencard.getMoveFormNewProviderInfo().newPlacementProviderInfo.phone;
    //   this.moveAutoFillData.facAddress = this._opencard.getMoveFormNewProviderInfo().newPlacementProviderInfo.address;
    // } else {

    // }
    this.getDatas();
    // if (this.moveData) {
    //   this.childEnteredInfo = this.moveData.newProviderInfo;
    //   if (this.childEnteredInfo) {
    //     this.childEnteredInfoAddress = `${this.childEnteredInfo.address},${this.childEnteredInfo.address2}`
    //   }
    //   this.nameOfSchool = this._opencard.getMoveFormNewProviderInfo().nameOfSchool;
    //   this.relativeType = this._opencard.getMoveFormNewProviderInfo().relativeType;

    // }
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
  printForm() {
    this.printService
      .printDocument('move-form', '');
  }

  timeStampConversion(data) {
    return (data) ? moment(data).format('MM/DD/YYYY') : "";
  }

  timeConversion(data) {
    return (data) ? moment(data).format('HH:mm') : "";
  }
  isPdf = false;
  pdfForm() {
    this.isPdf = true;
    // setTimeout(() => {
    //   this.isPdf = false;
    // }, 3000);
  }
}
