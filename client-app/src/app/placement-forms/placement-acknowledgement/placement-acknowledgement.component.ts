import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
} from "@angular/core";
import { PPS5120Form } from "./placement-ack";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { LocalValues } from "../../local-values";
import { Router, ActivatedRoute } from "@angular/router";
import { isNullOrUndefined } from "util";
import { isEmpty } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import {
  CLIENTID,
  REFID,
  REFTYPEID,
  PLACEMENT_ID,
  PLACEMENT_DETAIL_ID,
  PLACEMENT_AUTHORIZATION_ID,
} from "../../../constants/AppConstants";

@Component({
  selector: "app-placement-acknowledgement",
  templateUrl: "./placement-acknowledgement.component.html",
  styleUrls: ["./placement-acknowledgement.component.scss"],
  outputs: ["formStatus", "closeAckWindow"],
})
export class PlacementAcknowledgementComponent implements OnInit {
  pps5120: PPS5120Form = new PPS5120Form();
  // pps5120: any;
  isFormLoaded = false;
  isPlacementDelete: string;
  subModule: string;
  formAction: string;
  isReturnTextEnable = false;
  formData: any;
  isDateOfCurrentPlacement = false;
  isDateOfService = false;
  module: string;
  schoolInfo: any;
  isClientSchoolLeaving = false;
  isClientSchoolEntering = false;
  hassiblingInOOHplacementandplaced = false;
  hassiblinginOOHplacementandnotplaced = false;
  siblingOOHsiblingReason: string;
  siblingOOHsibsAffectedByMove: string;
  icwaApply = false;
  returnedHomeWithCustody: any;
  releasedFromSRSCustodyOtherReasonDescription: any;
  childDeath: any;
  adoptivePlacementFinalized: any;
  transferTribalCourt: any;
  venueChange: any;
  section5ActionCodePlacementCheckbox: any = false;
  section5FactsServiceSourceCodeCheckbox: any = false;
  section6ReturnHomewithoutCustodyCheckbox: any = false;
  section6ReturnHomewithCustodyCheckbox: any = false;
  section6OtherReasonMustProviderReason: any = false;
  public selectedCaseManagerName: string;
  public selectedCaseManagerAddress: string;
  public selectedCaseManagerWorkPhone: string;
  section6OtherSpecifyCheckbox = false;
  transferJJACheckbox = false;
  public selectedReasonForSchoolLate: string;
  public attendingSchoolReason_1 = false;
  public attendingSchoolReason_2 = false;
  public attendingSchoolReason_3 = false;
  public attendingSchoolReason_4 = false;
  public attendingSchoolReason_5 = false;
  public selectedPlacementID: number;
  public selectedPlacementDetailID: number;
  public selectedPlacementAuthorizationID: number;
  public sameSchoolCheckBox = false;
  public sameSchoolAddress: string;
  public changeSchoolAddress: string;
  public section6DCFCustodyForOtherReasonCheckbox = false;
  public isSchoolChangeSectionVisibile = true;
  public isSchoolSameLineVisbile = true;
  isWatermarkerEnable = false;
  waterMarkContent = "";
  public isSection5EndDateShow = true;
  saveAckPrintPlacementData: any;
  isViewHistory = false;
  @Input() acknowledgementID;
  @Input() isAchHistoryView;
  @Input() historyData;
  @Output()
  formStatus = new EventEmitter();
  closeAckWindow = new EventEmitter();
  sendFooterReq: { saveReq: any; pdfReq: any };
  isShowEmailFooter: boolean;
  public CLIENT_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(CLIENTID)
  );
  public REF_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(REFID)
  );
  public REF_TYPE_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(REFTYPEID)
  );
  public PLACEMENT_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(PLACEMENT_ID)
  );
  public PLACEMENT_DETAIL_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(PLACEMENT_DETAIL_ID)
  );
  public PLACEMENT_AUTH_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(PLACEMENT_AUTHORIZATION_ID)
  );

  constructor(
    public _opencards: OpencardsService,
    public _router: Router,
    public _activateRoute: ActivatedRoute,
    public _local: LocalValues
  ) {}

  ngOnInit() {
    this.subModule = this._activateRoute.snapshot.queryParamMap.get("sub");
    this.formAction = this._activateRoute.snapshot.queryParamMap.get("action");
    this.module = this._activateRoute.snapshot.queryParamMap.get("module");
    this.schoolInfo = JSON.parse(localStorage.getItem("clientackSchool"));
    this.setPlacementAndPlacementDetailID();
    if (this.isAchHistoryView) {
      this.viewInAckHistory();
    } else {
      this.getPrintAckFormValues();
    }
    if (this._router.url.includes("placement-acknowledgment")) {
      this.isPlacementDelete = "false";
    } else {
      this.isPlacementDelete = "true";
    }
    this.waterMark();
    this.getDateOfCurrentServiceValues();
    this.resetAttendingSchoolReason();
    this.getValuesFromPlacementAckOptionForm();
  }

  async getPrintAckFormValues() {
    this.isShowEmailFooter = true;
    this.saveAckPrintPlacementData = {
      referralID: this.REF_ID,
      clientID: this.CLIENT_ID,
      authorizationID: this.selectedPlacementAuthorizationID,
      IsEmail: false,
      IsExport: true,
      isVoid: false,
      viewOnly: 3,
      ReportType: "Acknowledgement",
      staffID: parseInt(localStorage.getItem("UserId")) || 4620,
    };
    let request: any;
    request = {
      referralID: this.REF_ID,
      clientID: this.CLIENT_ID,
      authorizationID: this.selectedPlacementAuthorizationID,
      phaseID: 0,
      pwsClientID: 0,
      releasedFromSRSCustodyClientID: 0,
      placementID: this.selectedPlacementID,
      placementDetailID: this.selectedPlacementDetailID,
    };
    this.pps5120 = await this._opencards.getPPS5120PrintAckFormValues(request);

    console.log(
      "getPrintAckFormValues.pps5120>>>",
      JSON.stringify(this.pps5120)
    );
    this.hassiblingInOOHplacementandplaced = !isNullOrUndefined(this.pps5120)
      ? this.pps5120.section5.hassiblingInOOHplacementandplaced
      : null;
    this.hassiblinginOOHplacementandnotplaced = !isNullOrUndefined(this.pps5120)
      ? this.pps5120.section5.hassiblinginOOHplacementandnotplaced
      : null;
    this.icwaApply = !isNullOrUndefined(this.pps5120)
      ? this.pps5120.section5.icwaApply
      : null;
    this.returnedHomeWithCustody = !isNullOrUndefined(this.pps5120)
      ? this.pps5120.section6.returnedHomeWithCustody
      : null;
    this.releasedFromSRSCustodyOtherReasonDescription = !isNullOrUndefined(
      this.pps5120
    )
      ? this.pps5120.section6.custodianshipReleasedFromCustody
      : null;
    this.childDeath = !isNullOrUndefined(this.pps5120)
      ? this.pps5120.section6.childDeath
      : null;
    this.adoptivePlacementFinalized = !isNullOrUndefined(this.pps5120)
      ? this.pps5120.section6.adoptivePlacementFinalized
      : null;
    this.transferTribalCourt = !isNullOrUndefined(this.pps5120)
      ? this.pps5120.section6.transferTribalCourt
      : null;
    this.venueChange = !isNullOrUndefined(this.pps5120)
      ? this.pps5120.section6.venueChange
      : null;
    this.siblingOOHsiblingReason = !isNullOrUndefined(this.pps5120)
      ? this.pps5120.section5.siblingReason
      : null;
    // this.siblingOOHsibsAffectedByMove = !isNullOrUndefined(this.pps5120) ? this.pps5120.section5.sibsAffectedByMove_hassiblinginOOHplacementandnotplaced : null;
    this.section5ActionCodePlacementCheckbox =
      this.pps5120 !== null || this.pps5120 !== undefined
        ? this.pps5120.section5.factsServiceActionCodePlacement
        : false;
    this.section5FactsServiceSourceCodeCheckbox =
      this.pps5120 !== null || this.pps5120 !== undefined
        ? this.pps5120.section5.factsServiceSourceCode
        : false;
    this.section6ReturnHomewithoutCustodyCheckbox =
      this.pps5120 !== null || this.pps5120 !== undefined
        ? this.pps5120.section6.returnedHomeWithOutCustody
        : false;
    this.section6ReturnHomewithCustodyCheckbox =
      this.pps5120 !== null || this.pps5120 !== undefined
        ? this.pps5120.section6.returnedHomeWithCustody
        : false;
    this.section6DCFCustodyForOtherReasonCheckbox =
      this.pps5120 !== null || this.pps5120 !== undefined
        ? this.pps5120.section6.releasedFromSRSCustodyOtherReason
        : false;
    this.section6OtherReasonMustProviderReason =
      this.pps5120 !== null || this.pps5120 !== undefined
        ? this.pps5120.section6.releasedFromSRSCustodyOtherReason
        : false;
    this.transferJJACheckbox =
      this.pps5120 !== null || this.pps5120 !== undefined
        ? this.pps5120.section6.transferJJA
        : false;
    this.section6OtherSpecifyCheckbox =
      this.pps5120.section6.releasedFromSRSCustodyOtherReasonDescription !== ""
        ? true
        : false;
    this.formData = this.pps5120;
    this.livingArrangementsDefaultCheckBoxes();
    this.validateSection5EndDateBasedOnDCFNotficationType();
    this.getClientSchoolData();
    this.isFormLoaded = true;
  }

  getFormStatus = (event: any) => {
    this.formStatus.emit(event);
  };

  livingArrangementsDefaultCheckBoxes() {
    if (this.subModule == "livingArrangement") {
      this.pps5120.respite = true;
      this.pps5120.reinstatement = false;
      this.pps5120.initial = false;
      this.pps5120.change = false;
      this.pps5120.correctedCopy = false;
      this.pps5120.awol = false;
      this.pps5120.hospital = false;
      this.pps5120.trialHomePlacement = false;
      this.pps5120.plannedMove = false;
      this.pps5120.disruption = false;
      this.pps5120.changeOfVenue = false;
      if (this.isAchHistoryView) {
      } else {
        if (this._router.url.includes("placement-acknowledgment-return")) {
          this.isReturnTextEnable = true;
        } else {
          this.isReturnTextEnable = false;
        }
      }
    }
  }

  getDateOfCurrentServiceValues() {
    if (this.subModule == "livingArrangement") {
      this.isDateOfService = true;
    } else {
      this.isDateOfCurrentPlacement = true;
    }
  }

  getClientSchoolData() {
    if (this.schoolInfo) {
      if (Object.keys(this.schoolInfo.toSchool).length !== 0) {
        this.isClientSchoolLeaving = true;
        this.sameSchoolCheckBox = false;
        this.changeSchoolAddress = `${this.schoolInfo.fromSchool.completedAddress}`;
      } else {
        this.isClientSchoolLeaving = false;
        this.sameSchoolCheckBox = true;
        this.sameSchoolAddress = `${this.formData.section5.sameSchoolandAddress}`;
      }
      this.checkingSchoolSectionLogicToVisibleInPreview();
    }
  }

  getValuesFromPlacementAckOptionForm() {
    if (this._local.ackOptionsCaseManagerInfo) {
      this.selectedCaseManagerName =
        this._local.ackOptionsCaseManagerInfo.caseManagerName;
      this.selectedCaseManagerAddress = `${this._local.ackOptionsCaseManagerInfo.address}, ${this._local.ackOptionsCaseManagerInfo.city},${this._local.ackOptionsCaseManagerInfo.state},${this._local.ackOptionsCaseManagerInfo.zipcode} `;
      this.selectedCaseManagerWorkPhone =
        this._local.ackOptionsCaseManagerInfo.workPhone;
    }

    if (this._local.placementAckSchoolLateReason) {
      this.selectedReasonForSchoolLate =
        this._local.placementAckSchoolLateReason.attendingSameSchoolReasonID.toString();
      switch (this.selectedReasonForSchoolLate) {
        case "1":
          this.attendingSchoolReason_1 = true;
          break;
        case "2":
          this.attendingSchoolReason_2 = true;
          break;
        case "3":
          this.attendingSchoolReason_3 = true;
          break;
        case "4":
          this.attendingSchoolReason_4 = true;
          break;
        case "5":
          this.attendingSchoolReason_5 = true;
          break;
      }
    }
  }

  setPlacementAndPlacementDetailID() {
    if (
      this.subModule === "placementEvent" ||
      this.subModule === "PlacementEvent" ||
      this.subModule === "placement-event"
    ) {
      this.selectedPlacementID = this.PLACEMENT_ID;
      this.selectedPlacementDetailID = this.PLACEMENT_DETAIL_ID;
      this.selectedPlacementAuthorizationID = this.PLACEMENT_AUTH_ID;
    } else {
      this.selectedPlacementID = this.PLACEMENT_ID;
      this.selectedPlacementDetailID = this.PLACEMENT_DETAIL_ID;
      this.selectedPlacementAuthorizationID = this.PLACEMENT_AUTH_ID;
    }
  }

  /**
   * Show the school info in section 5 based on the logics
   */
  checkingSchoolSectionLogicToVisibleInPreview() {
    if (
      this._local.placementAttendingSchoolLogic.show === "none" &&
      this._local.placementAttendingSchoolLogic.hide === "all"
    ) {
      this.isSchoolSameLineVisbile = false;
      this.sameSchoolCheckBox = false;
      this.isClientSchoolLeaving = false;
      return (this.isSchoolChangeSectionVisibile = false);
    } else if (
      this._local.placementAttendingSchoolLogic.show ===
        "same_school_line_alone" &&
      this._local.placementAttendingSchoolLogic.hide === "all"
    ) {
      this.isSchoolSameLineVisbile = true;
      return (this.isSchoolChangeSectionVisibile = false);
    } else if (
      this._local.placementAttendingSchoolLogic.show ===
        "school_change_section" &&
      this._local.placementAttendingSchoolLogic.hide ===
        "same_school_line_alone"
    ) {
      this.isSchoolSameLineVisbile = false;
      return (this.isSchoolChangeSectionVisibile = true);
    } else if (
      this._local.placementAttendingSchoolLogic.show === "all" &&
      this._local.placementAttendingSchoolLogic.hide === "all"
    ) {
      this.sameSchoolAddress = `${this.formData.section5.sameSchoolandAddress}`;
      this.isSchoolSameLineVisbile = true;
      this.sameSchoolCheckBox = true;
      return (this.isSchoolChangeSectionVisibile = true);
    } else {
      return;
    }
  }

  resetAttendingSchoolReason() {
    this.attendingSchoolReason_1 = false;
    this.attendingSchoolReason_2 = false;
    this.attendingSchoolReason_3 = false;
    this.attendingSchoolReason_4 = false;
    this.attendingSchoolReason_5 = false;
  }
  nodataMessage: any;
  savePlacementHist: any;
  viewHistoryPrintReq: any;
  async viewInAckHistory() {
    var printArray: any = [];
    var request = { printAcknowledgementID: this.acknowledgementID };
    this.pps5120 = await this._opencards.ackPlacementDetail(request);
    console.log("this.pps5120>>>", this.pps5120);
    printArray = this.pps5120;
    this.savePlacementHist = {
      referralID: this.pps5120["referralID"],
      clientID: this.pps5120["clientID"],
      authorizationID: this.pps5120["authorizationID"],
      IsEmail: false,
      IsExport: true,
      isVoid: this.pps5120["void"],
      viewOnly: 3,
      ReportType: "Acknowledgement",
      staffID: parseInt(localStorage.getItem("UserId")) || 4620,
    };
    console.log("historyData>>>>>", this.historyData);
    if (this.historyData.reportType === "Acknowledgement (Return)") {
      this.isReturnTextEnable = true;
      this.viewHistoryPrintReq = {
        reportType: "Acknowledgement (Return)",
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
        printAcknowledgementID: this.acknowledgementID,
      };
      this.savePlacementHist.ReportType = "Acknowledgement (Return)";
    } else {
      this.isReturnTextEnable = false;
      this.viewHistoryPrintReq = {
        reportType: "Acknowledgement",
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
        printAcknowledgementID: this.acknowledgementID,
      };
      this.savePlacementHist.ReportType = "Acknowledgement";
    }

    this.sendFooterReq = {
      saveReq: this.savePlacementHist,
      pdfReq: this.viewHistoryPrintReq,
    };
    console.log("historyData>>>>>", this.historyData);
    if (this.historyData.reportType === "Acknowledgement (Return)") {
      this.isReturnTextEnable = true;
      this.viewHistoryPrintReq = {
        reportType: "Acknowledgement (Return)",
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
        printAcknowledgementID: this.acknowledgementID,
      };
      this.savePlacementHist.ReportType = "Acknowledgement (Return)";
    } else {
      this.isReturnTextEnable = false;
      this.viewHistoryPrintReq = {
        reportType: "Acknowledgement",
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
        printAcknowledgementID: this.acknowledgementID,
      };
      this.savePlacementHist.ReportType = "Acknowledgement";
    }

    this.sendFooterReq = {
      saveReq: this.savePlacementHist,
      pdfReq: this.viewHistoryPrintReq,
    };
    this.isShowEmailFooter = true;
    console.log("this.savePlacementHist>>>>", this.savePlacementHist);
    if (printArray.length === 0) {
      this.nodataMessage = "No Data found";
    } else {
      this.selectedCaseManagerName = !isNullOrUndefined(this.pps5120)
        ? this.pps5120.section3["caseManagerName"]
        : null;
      this.selectedCaseManagerAddress = !isNullOrUndefined(this.pps5120)
        ? this.pps5120.section3["caseManagerAddress"]
        : null;
      this.selectedCaseManagerWorkPhone = !isNullOrUndefined(this.pps5120)
        ? this.pps5120.section3["caseManagerWorkPhone"]
        : null;
      console.log(
        "viewInAckHistorythis.pps5120>>>",
        JSON.stringify(this.pps5120)
      );
      this.hassiblingInOOHplacementandplaced = !isNullOrUndefined(this.pps5120)
        ? this.pps5120.section5.hassiblingInOOHplacementandplaced
        : null;
      this.hassiblinginOOHplacementandnotplaced = !isNullOrUndefined(
        this.pps5120
      )
        ? this.pps5120.section5.hassiblinginOOHplacementandnotplaced
        : null;
      this.icwaApply = !isNullOrUndefined(this.pps5120)
        ? this.pps5120.section5.icwaApply
        : null;
      this.returnedHomeWithCustody = !isNullOrUndefined(this.pps5120)
        ? this.pps5120.section6.returnedHomeWithCustody
        : null;
      this.releasedFromSRSCustodyOtherReasonDescription = !isNullOrUndefined(
        this.pps5120
      )
        ? this.pps5120.section6.custodianshipReleasedFromCustody
        : null;
      this.childDeath = !isNullOrUndefined(this.pps5120)
        ? this.pps5120.section6.childDeath
        : null;
      this.adoptivePlacementFinalized = !isNullOrUndefined(this.pps5120)
        ? this.pps5120.section6.adoptivePlacementFinalized
        : null;
      this.transferTribalCourt = !isNullOrUndefined(this.pps5120)
        ? this.pps5120.section6.transferTribalCourt
        : null;
      this.venueChange = !isNullOrUndefined(this.pps5120)
        ? this.pps5120.section6.venueChange
        : null;
      this.siblingOOHsiblingReason = !isNullOrUndefined(this.pps5120)
        ? this.pps5120.section5.siblingReason
        : null;
      // this.siblingOOHsibsAffectedByMove = !isNullOrUndefined(this.pps5120) ? this.pps5120.section5.sibsAffectedByMove_hassiblinginOOHplacementandnotplaced : null;
      this.section5ActionCodePlacementCheckbox =
        this.pps5120 !== null || this.pps5120 !== undefined
          ? this.pps5120.section5.factsServiceActionCodePlacement
          : false;
      this.section5FactsServiceSourceCodeCheckbox =
        this.pps5120 !== null || this.pps5120 !== undefined
          ? this.pps5120.section5.factsServiceSourceCode
          : false;
      this.section6ReturnHomewithoutCustodyCheckbox =
        this.pps5120 !== null || this.pps5120 !== undefined
          ? this.pps5120.section6.returnedHomeWithOutCustody
          : false;
      this.section6ReturnHomewithCustodyCheckbox =
        this.pps5120 !== null || this.pps5120 !== undefined
          ? this.pps5120.section6.returnedHomeWithCustody
          : false;
      this.section6DCFCustodyForOtherReasonCheckbox =
        this.pps5120 !== null || this.pps5120 !== undefined
          ? this.pps5120.section6.releasedFromSRSCustodyOtherReason
          : false;
      this.section6OtherReasonMustProviderReason =
        this.pps5120 !== null || this.pps5120 !== undefined
          ? this.pps5120.section6.releasedFromSRSCustodyOtherReason
          : false;
      this.transferJJACheckbox =
        this.pps5120 !== null || this.pps5120 !== undefined
          ? this.pps5120.section6.transferJJA
          : false;
      this.section6OtherSpecifyCheckbox =
        this.pps5120.section6.releasedFromSRSCustodyOtherReasonDescription !==
        ""
          ? true
          : false;
      this.formData = this.pps5120;
      this.livingArrangementsDefaultCheckBoxes();
      this.getClientSchoolData();
      this.isFormLoaded = true;
    }
  }
  isLoad = false;
  printAck() {
    this.isLoad = true;
    this._opencards.savePrintHistory(this.savePlacementHist).then((data) => {
      var request = {
        reportType: "Acknowledgement",
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
        printAcknowledgementID: this.acknowledgementID,
      };
      this._opencards.printAckPDF(request).then((data) => {
        this.isLoad = false;
        window.open(
          `${environment.uri}:8081/loadDocument/${data.CMSPDFDoc.pdfDocId}`,
          "popup",
          "width=600,height=600,toolbar=no,titlebar=no"
        );
      });
    });
  }

  waterMark() {
    this.isWatermarkerEnable = true;
    if (this.module == "livingArrangment") {
      switch (this.formAction) {
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
      if (this.formAction === "delete") {
        this.waterMarkContent = "void";
      }
    }
  }

  /**
   * The plcement sub form is living arragement means
   * Have to hide the end column in section 5
   * If the nofitcation type checkbox (Above section 1)
   * It's true then we don't want to show the end date
   * It's false needs to show the end date.
   */
  public validateSection5EndDateBasedOnDCFNotficationType() {
    if (this.subModule === "livingArrangement") {
      if (this.formData.respite) {
        if (this.isReturnTextEnable) {
          return (this.isSection5EndDateShow = true);
        } else {
          return (this.isSection5EndDateShow = false);
        }
      } else {
        return;
      }
    }
  }
  closeAck_Window(event) {
    console.log("closeAck_Window>>>", event);
    this.closeAckWindow.emit(event);
  }
}
