import { Component, OnInit } from "@angular/core";
import { PrintService } from "../service/print.service";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { isNullOrUndefined } from "util";
import * as moment from "moment";

@Component({
  selector: "app-move-form",
  templateUrl: "./move-form.component.html",
  styleUrls: ["./move-form.component.scss"],
})
export class MoveFormComponent implements OnInit {
  moveData: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(
    public _opencard: OpencardsService,
    public printService: PrintService
  ) {}

  ngOnInit() {
    // this.printService.onDataReady();
    this.moveData = this._opencard.getMovePrintData();
    this.isFormLog = true;
    this.formLogInfo.changedBy = !isNullOrUndefined(this.moveData.changedBy)
      ? this.moveData.changedBy
      : "------";
    this.formLogInfo.changedDate = !isNullOrUndefined(this.moveData.changedDate)
      ? moment(this.moveData.changedDate).format("MM/DD/YYYY hh:mm:ss A")
      : "--:--:-- --";
    this.formLogInfo.enteredBy = !isNullOrUndefined(this.moveData.enteredBy)
      ? this.moveData.enteredBy
      : "------";
    this.formLogInfo.enteredDate = !isNullOrUndefined(this.moveData.enteredDate)
      ? moment(this.moveData.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
      : "--:--:-- --";
  }
}
