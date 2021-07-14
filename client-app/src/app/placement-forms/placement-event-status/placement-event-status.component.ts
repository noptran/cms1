import { Component, OnInit } from "@angular/core";
import { PlacementPSAPrintPreview } from "./placement-event-status";
import {LocalValues} from "../../local-values";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-placement-event-status",
  templateUrl: "./placement-event-status.component.html",
  styleUrls: ["./placement-event-status.component.scss"],
})
export class PlacementEventStatusComponent implements OnInit {
  currentDate = new Date();
  currentDateTime: any;
  printPreviewData: PlacementPSAPrintPreview = new PlacementPSAPrintPreview();
  currentModule: string;
  currentFormMode: string;
  isWatermarkerEnable = false;
  waterMarkContent: string;
  
  formData: any;

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _localValues: LocalValues
  ) {}

  ngOnInit() {
    this.currentDateTime = this._localValues.getDateandTimeWithExt(
      this.currentDate
    );
    this.currentModule = this._activatedRoute.snapshot.queryParamMap.get(
      "module"
    );
    this.currentFormMode = this._activatedRoute.snapshot.queryParamMap.get(
      "action"
    );
    this.waterMark();
    this.getPrintPreviewValuesBasedOnAuthID();
  }

  getPrintPreviewValuesBasedOnAuthID() {
    this.printPreviewData = this._localValues.placementEventStatusValue;
  }

  waterMark() {
    this.isWatermarkerEnable = true;
    if (this.currentModule == "placement") {
      switch (this.currentFormMode) {
        case "create":
          this.waterMarkContent = "";
          break;
        case "edit":
          this.waterMarkContent = "";
          break;
        case "delete":
          this.waterMarkContent = "void";
          break;
      }
    } else {
      if (this.currentFormMode === "delete") {
        this.waterMarkContent = "void";
      }
    }
  }
}
