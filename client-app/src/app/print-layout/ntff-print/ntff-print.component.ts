import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from '../service/print.service';
import { isNullOrUndefined } from "util";
import { OpencardsService } from '../../opecards-list-view/opencards.service';

@Component({
  selector: 'app-ntff-print',
  templateUrl: './ntff-print.component.html',
  styleUrls: ['./ntff-print.component.scss', '../../non-therapy-face-to-face/non-therapy-face-to-face.component.scss']
})
export class NtffPrintComponent implements OnInit {
  ntffPrintJson: any;
  ntff: any;
  alone_list: any;
  nexAppointmentAlongWithDate: any;
  ntffDuration: any;

  constructor(public _opencard: OpencardsService, route: ActivatedRoute, public printService: PrintService) {

  }

  ngOnInit() {


    this.ntffPrintJson = this.printService.ntffData.ntffPrintJson
    this.ntff = this.printService.ntffData.ntff;
    this.alone_list = this.printService.ntffData.alone_list;
    this.nexAppointmentAlongWithDate = this.printService.ntffData.nexAppointmentAlongWithDate;

    this.printService.onDataReady();
  }

  rowMethod(event, label) {
    if (!isNullOrUndefined(event)) {
      let singleNewLineCount = this._opencard.search_word(event, "\n");
      let doubleNewLineCount = this._opencard.search_word(event, "\n\n");
      return Math.ceil((event.length / 130) + (singleNewLineCount - doubleNewLineCount));
    }
    else {
      return 3;
    }
  }

}
