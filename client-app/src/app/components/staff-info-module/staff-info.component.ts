import { Component, Input, OnInit } from "@angular/core";
import { StaffInfoService } from "./staff-info.service";
import { isNullOrUndefined } from "util";
import * as moment from "moment";
import { environment } from "../../../environments/environment";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import {LocalValues} from "../../local-values";

@Component({
  selector: "staff-info",
  templateUrl: "./staff-info.component.html",
  styleUrls: ["./staff-info.component.scss"],
  inputs: ["staff_profileDatas", "staffName_profileDatas"],
})
export class StaffInfoComponent implements OnInit {
  @Input() staff_profileDatas: any;
  staffName_profileDatas: any;
  componentBtnLabel = "Show More";
  componentBtnDisable: boolean;
  isMoreDetails: boolean;
  constructor(
    public _service: StaffInfoService,
    public _opencards: OpencardsService
  ) {}
  staffID: number;
  ngOnInit() {
    this.staffID = parseInt(localStorage.getItem("staff_ID"));
    console.log("this.staffID>>>>>>", this.staffID);
    console.log("this.staff_profileDatas>>>>>>", this.staff_profileDatas);
    console.log(
      "this.staffName_profileDatas>>>>>",
      this.staffName_profileDatas
    );
  }

  async onShowMoreClick() {
    this.componentBtnLabel = "Loading...";
    this.componentBtnDisable = true;
    this.isMoreDetails = true;
    this.componentBtnDisable = false;
    this.componentBtnLabel = "Show More";
  }
}
