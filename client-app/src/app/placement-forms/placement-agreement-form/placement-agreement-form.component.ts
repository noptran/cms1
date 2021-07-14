import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PlacementService } from "../../placement/placement.service";
import { PlacementAgreement } from "./placement-agreement";
import { isNullOrUndefined } from "util";
import { ActivatedRoute, Router } from "@angular/router";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import * as moment from "moment";
import { LocalValues } from "../../local-values";
import { environment } from "../../../environments/environment";
import swal from "sweetalert2";
import { Location } from "@angular/common";
import {
  CLIENTID,
  PLACEMENT_AUTHORIZATION_ID,
  PLACEMENT_DETAIL_ID,
  PLACEMENT_ID,
  REFID,
  REFTYPEID,
} from "../../../constants/AppConstants";

@Component({
  selector: "app-placement-agreement-form",
  templateUrl: "./placement-agreement-form.component.html",
  styleUrls: ["./placement-agreement-form.component.scss"],
})
export class PlacementAgreementFormComponent implements OnInit {
  placementData: PlacementAgreement = new PlacementAgreement();
  placementAgreementText: any;
  currentPlacementID: number;
  currentPlaementDetailID: number;
  formData: any;
  authFromDate: string;
  authToDate: string;
  agreementDates: string;
  placementDates: any;
  isWatermarkerEnable = false;
  currentModule: string;
  currentFormMode: string;
  waterMarkContent: string;
  formType: any;
  formTitle = "PLACEMENT AGREEMENT";
  isFosterCareHomePlacementFooter = false;
  placementAgreementTextElecSign = "";
  placementAgreementSFAClause: any;
  placementAgreementProviderClause: any;
  public providerMemberName: string;
  public providerElecSignDate: string;
  public sfmAdmissionCCStaffName: string;
  public sfmAdmissionCCStaffDate: string;
  @Input() fchPrintID;
  @Input() fchPrintView = false;
  @Input() elecPrintView = false;
  @Input() elecSignData: any;
  @Input() remainElectPrintViewData: any;
  @Input() remainElectPrintView = false;
  @Input() isRemainderBox = false;
  @Output() onSigned = new EventEmitter<string>();
  @Output() closeAckWindow = new EventEmitter<string>();
  ElecSignPlacementAgreementID: any;
  isElecSign: string;
  FCH_data: any;
  placementAgreementStaticContentHTML: any;
  placementAgreementStaticContent: string;
  showExport = false;
  emailFoot = false;
  staffName: any;
  isShowEmailFooter: boolean;
  sendFooterReq: any;
  public CLIENT_ID = parseInt(
    this._activatedRoute.snapshot.queryParamMap.get(CLIENTID)
  );
  public REF_ID = parseInt(
    this._activatedRoute.snapshot.queryParamMap.get(REFID)
  );
  public REF_TYPE_ID = parseInt(
    this._activatedRoute.snapshot.queryParamMap.get(REFTYPEID)
  );
  public PLACEMENT_ID = parseInt(
    this._activatedRoute.snapshot.queryParamMap.get(PLACEMENT_ID)
  );
  public PLACEMENT_DETAIL_ID = parseInt(
    this._activatedRoute.snapshot.queryParamMap.get(PLACEMENT_DETAIL_ID)
  );
  public PLACEMENT_AUTH_ID = parseInt(
    this._activatedRoute.snapshot.queryParamMap.get(PLACEMENT_AUTHORIZATION_ID)
  );
  public CLIENT_NAME: String;

  constructor(
    public _placement: PlacementService,
    public _activatedRoute: ActivatedRoute,
    public _localValues: LocalValues,
    public _opencard: OpencardsService,
    public _router: Router,
    public _location: Location
  ) {}
  isElectrilSign = false;
  ngOnInit() {
    this.getClientName();
    console.log(
      ">>>fchPrintID>>>",
      this.fchPrintID,
      ">>>>>fchPrintView>>",
      this.fchPrintView,
      ">>>>>"
    );
    if (this.fchPrintView) {
      this.formType = "true";
      this.isElecSign = "false";
      this.showExport = true;
      this.getFostercaredata();
    } else if (this.elecPrintView) {
      this.formType = "false";
      this.isElecSign = "true";
      this.showExport = true;
      this.getElecprint();
    } else if (this.remainElectPrintView) {
      this.formType = "false";
      this.isElecSign = "true";
      this.showExport = false;
      this.emailFoot = false;

      this.getRemaindElecprint();
    } else {
      this.currentModule =
        this._activatedRoute.snapshot.queryParamMap.get("module");
      this.currentFormMode =
        this._activatedRoute.snapshot.queryParamMap.get("action");

      /**
        If the key is "true" need to show the "Foster Care Home Placement form",
        If the key is "false" need to show the "Elec sign placement form"
      */
      this.formType = this._activatedRoute.snapshot.queryParamMap.get(
        "isFosterCareHomePlacement"
      );

      /**
       * If the key is "true", It represents the forms is elec sign
       * If the key is "false", It represents the forms is normal
       */
      this.isElecSign =
        this._activatedRoute.snapshot.queryParamMap.get("isElecSign");

      this.swtichingForms();
      this.getAutofetchData();
      this.getPrintAck();
      this.waterMark();
      // this.currentPlacementID = parseInt(
      //   this._activatedRoute.snapshot.queryParamMap.get("p_id")
      // );
      // this.currentPlaementDetailID = parseInt(
      //   this._activatedRoute.snapshot.queryParamMap.get("pd_id")
      // );
      // this.getData();
    }
  }

  getData() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    const placementReq = {
      placementID:
        this._placement.getSavedPlacementId() || this.currentPlacementID,
    };

    if (this._placement.getSavedPlacementId() || this.currentPlacementID) {
      this._placement.getPlacement(placementReq).then((data: any) => {
        !isNullOrUndefined(data.placement.providerID)
          ? (this.placementData.providerName =
              data.placement.providerID.providerName)
          : null;
        !isNullOrUndefined(data.placement.clientID)
          ? (this.placementData.clientName =
              data.placement.clientID.clientNameLastFirst)
          : null;
        !isNullOrUndefined(data.placement.clientID)
          ? (this.placementData.clientDob =
              new Date(data.placement.clientID.dob).getMonth() +
              1 +
              "/" +
              new Date(data.placement.clientID.dob).getDate() +
              "/" +
              new Date(data.placement.clientID.dob).getFullYear())
          : null;
        this.placementAgreementText = `${this.placementData.providerName}  hereinafter referred to as the Placement
        Provider. SFCS places ${this.placementData.clientName}, born on ${this.placementData.clientDob}, with the Placement Provider for the sum of $${this.placementData.providerSum}
        per day  under the following terms and conditions:`;
        this.placementDates = data.placement;
        loader.style.display = "none";
        this.getAuthData();
      });
    }
  }

  getAuthData() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    const placementReq = {
      placementDetailID:
        this._placement.getSavedPlacementDetailId() ||
        this.currentPlaementDetailID,
    };

    if (this._placement.getSavedPlacementId() || this.currentPlaementDetailID) {
      this._placement
        .getPlacementAuthorization(placementReq)
        .then((data: any) => {
          const authInfo =
            data.placementAuthorization[data.placementAuthorization.length - 1];
          this.placementData.providerSum =
            data.placementAuthorization.length > 0 && authInfo.providerRate
              ? authInfo.providerRate
              : "0";

          this.authFromDate = `${moment(authInfo.beginDate).format(
            "Do"
          )} day of ${moment(authInfo.beginDate).format("MMMM")}, ${moment(
            authInfo.beginDate
          ).format("YYYY")}`;

          this.authToDate = `${moment(authInfo.endDate).format(
            "Do"
          )} day of ${moment(authInfo.endDate).format("MMMM")}, ${moment(
            authInfo.endDate
          ).format("YYYY")}`;

          this.placementAgreementText = `${this.placementData.providerName}  hereinafter referred to as the Placement
        Provider. SFM places ${this.placementData.clientName}, born on ${this.placementData.clientDob}, with the Placement Provider for the sum of $${this.placementData.providerSum}
        per day  under the following terms and conditions:`;
          loader.style.display = "none";
          if (
            authInfo.status === "Active" &&
            this.placementDates.beginDate &&
            this.placementDates.endDate
          ) {
            return (this.agreementDates = `This agreement is entered into this ${this.authFromDate} to ${this.authToDate}`);
          } else if (
            authInfo.status === "Active" &&
            this.placementDates.beginDate
          ) {
            return (this.agreementDates = `This agreement is entered into this ${this.authFromDate} `);
          } else if (
            authInfo.status === "Closed" &&
            this.placementDates.beginDate
          ) {
            return (this.agreementDates = `This agreement is entered into this ${this.authFromDate} to ${this.authToDate}`);
          } else {
            return (this.agreementDates = "");
          }
        });
    }
  }

  async getPrintAck() {
    this.formData = this._localValues.placementAgreementValue;
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

  swtichingForms() {
    if (this.formType === "true") {
      if (this.isElecSign === "true") {
        this.formTitle = "PLACEMENT AGREEMENT";
        this.isFosterCareHomePlacementFooter = true;
      } else {
        this.formTitle = "PLACEMENT AGREEMENT";
        this.isFosterCareHomePlacementFooter = false;
      }
    } else {
      this.formTitle = "PLACEMENT AGREEMENT";
      this.isFosterCareHomePlacementFooter = false;
    }
  }
  showAccept = false;
  isApprovalProcess = false;
  showAcknowledge = false;
  electSignState: any;
  isData = false;

  async getAutofetchData() {
    let authorizationID = null;

    if (
      this._router.url.includes("placementEvent") ||
      this._router.url.includes("placement-event")
    ) {
      authorizationID = this.PLACEMENT_AUTH_ID;
    }
    // else {
    //   authorizationID =
    //     parseInt(localStorage.getItem("authorizationId")) -
    //     this._opencard.getHasKey();
    // }

    let request = {
      authorizationID: authorizationID,
      staffID: localStorage.getItem("UserId") || 4620,
    };
    // let request =         {"authorizationID": 2001111, "staffID": 14785}  ;
    let response = await this._opencard.getPlacementAgreementFormPreview(
      request
    );
    if (
      JSON.stringify(response.placementAgreementText) === JSON.stringify({})
    ) {
      this.isData = true;
    } else {
      this.isData = false;
    }
    if (response.elecSignInfo.ElecSign) {
      this.formType = "true";
      this.isElecSign = "true";
      this.isFosterCareHomePlacementFooter = true;
      this.emailFoot = false;
      this.ElecSignPlacementAgreementID =
        response.placementAgreementText.ElecSignPlacementAgreementID;
      if (response.elecSignInfo.ElecSignState === "NOTSTARTED") {
        this.showAccept = true;
      } else if (response.elecSignInfo.ElecSignState === "CC_APPROVAL") {
        console.log("response.elecSignInfo>>>>>", response.elecSignInfo);
        this.remainElectPrintViewData = response;
        console.log(
          "this.remainElectPrintViewData>>>>>",
          this.remainElectPrintViewData
        );
        this.isElectrilSign = true;
      } else if (response.elecSignInfo.ElecSignState === "RSW_ACKNOWLEDGE") {
        this.remainElectPrintViewData = response.elecSignInfo;
        this.showAcknowledge = true;
      } else {
        this.isApprovalProcess = true;
        this.getStatusForm();
      }

      this.electSignState = response.elecSignInfo.ElecSignState;
      this.ElecSignPlacementAgreementID =
        response.placementAgreementText.ElecSignPlacementAgreementID;
    }
    if (this.showAccept || this.isElectrilSign || this.isApprovalProcess) {
    } else {
      this.isShowEmailFooter = true;
    }
    if (this.showAccept || this.isElectrilSign || this.isApprovalProcess) {
    } else {
      this.isShowEmailFooter = true;
    }
    this.placementAgreementTextElecSign = "";

    if (this.formType === "true") {
      // isElecsign object not empty
      if (this.isElecSign === "true") {
        //  Foster Placement agreement form with elecsign in
        this.providerMemberName =
          response.placementAgreementText.ProviderMemberName;
        this.providerElecSignDate =
          response.placementAgreementText.Provider_ElecSignDate;
        this.sfmAdmissionCCStaffName =
          response.placementAgreementText.CC_StaffName;
        this.sfmAdmissionCCStaffDate =
          response.placementAgreementText.CC_ElecSignDate;
        this.placementAgreementTextElecSign =
          response.placementAgreementText.AgreementText;
        this.placementAgreementProviderClause = "";
        this.placementAgreementStaticContent = `<span></span>`;
        return (this.placementAgreementSFAClause = "");
      } else {
        // Placement agreement form with elec sign in
        this.providerMemberName =
          response.placementAgreementText.ProviderMemberName;
        this.providerElecSignDate =
          response.placementAgreementText.Provider_ElecSignDate;
        this.sfmAdmissionCCStaffName =
          response.placementAgreementText.CC_StaffName;
        this.sfmAdmissionCCStaffDate =
          response.placementAgreementText.CC_ElecSignDate;
        this.placementAgreementProviderClause =
          response.placementAgreementText.ProviderClause;
        this.placementAgreementSFAClause =
          response.placementAgreementText.SFAClause;
        this.placementAgreementStaticContent = `<span></span>`;
        return (this.placementAgreementTextElecSign = `<span></span>`);
      }
    } else {
      // Normal placementagreement form
      this.providerMemberName =
        response.placementAgreementText.ProviderMemberName;
      this.providerElecSignDate =
        response.placementAgreementText.Provider_ElecSignDate;
      this.sfmAdmissionCCStaffName =
        response.placementAgreementText.CC_StaffName;
      this.sfmAdmissionCCStaffDate =
        response.placementAgreementText.CC_ElecSignDate;
      this.placementAgreementProviderClause =
        response.placementAgreementText.ProviderClause;
      this.placementAgreementSFAClause =
        response.placementAgreementText.SFAClause;
      this.placementAgreementTextElecSign = `<span></span>`;
      return (this.placementAgreementStaticContent =
        this.placementAgreementStaticContentHTML);
    }
  }
  getFostercaredata() {
    var request = {
      printFCHPlacementAgreementID: this.fchPrintID,
    };
    this._opencard.getFCHhistrys(request).then((data) => {
      this.providerMemberName =
        data.printFCHPlacementAgreementList[0].ProviderMemberName;
      this.providerElecSignDate =
        data.printFCHPlacementAgreementList[0].Provider_ElecSignDate;
      this.sfmAdmissionCCStaffName =
        data.printFCHPlacementAgreementList[0].CC_StaffName;
      this.sfmAdmissionCCStaffDate =
        data.printFCHPlacementAgreementList[0].CC_ElecSignDate;
      this.placementAgreementProviderClause =
        data.printFCHPlacementAgreementList[0].ProviderClause;
      this.placementAgreementSFAClause =
        data.printFCHPlacementAgreementList[0].SFAClause;
      this.placementAgreementTextElecSign = `<span></span>`;
      this.placementAgreementStaticContent =
        this.placementAgreementStaticContentHTML;
      this.FCH_data = {
        authorizationID: data.printFCHPlacementAgreementList[0].AuthorizationID,
        IsEmail: false,
        IsExport: true,
        isVoid: data.printFCHPlacementAgreementList[0].Void,
        viewOnly: 3,
        ReportType: "FCHPlacementAgreement",
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
      };
      this.sendFooterReq = {
        saveReq: this.FCH_data,
        pdfReq: {
          reportType: "FCHPlacementAgreement",
          staffID: parseInt(localStorage.getItem("UserId")) || 2641,
          printFCHPlacementagreementID: this.fchPrintID,
        },
      };
      this.isShowEmailFooter = true;
    });
  }
  getElecprint() {
    this.isFosterCareHomePlacementFooter = true;
    this.sendFooterReq = {
      saveReq: {
        authorizationID: this.elecSignData["authorizationID"],
        IsEmail: false,
        IsExport: true,
        isVoid: true,
        viewOnly: 3,
        ReportType: "ElecSignPlacementAgreement",
        staffID: parseInt(localStorage.getItem("UserId")) || 2641,
        elecSignPlacementAgreementID:
          this.elecSignData["elecSignPlacementAgreementID"],
      },
      pdfReq: {
        reportType: "ElecSignPlacementAgreement",
        staffID: parseInt(localStorage.getItem("UserId")) || 2641,
        elecSignPlacementAgreementID:
          this.elecSignData["elecSignPlacementAgreementID"],
      },
    };
    this.isShowEmailFooter = true;

    this._opencard.getELEChistrys(this.elecSignData).then((response) => {
      if (!response.eSignAccess) {
        swal("Info!", "Please contact your admin!", "info");
      } else {
        this.providerMemberName =
          response.placementAgreementText.ProviderMemberName;
        this.providerElecSignDate =
          response.placementAgreementText.Provider_ElecSignDate;
        this.sfmAdmissionCCStaffName =
          response.placementAgreementText.CC_StaffName;
        this.sfmAdmissionCCStaffDate =
          response.placementAgreementText.CC_ElecSignDate;
        this.placementAgreementTextElecSign =
          response.placementAgreementText.AgreementText;
        this.placementAgreementProviderClause = "";
        this.placementAgreementStaticContent = `<span></span>`;
        this.placementAgreementSFAClause = "";
      }
    });
  }
  getRemaindElecprint() {
    console.log(
      "this.remainElectPrintViewData>>>>",
      this.remainElectPrintViewData
    );
    this.isFosterCareHomePlacementFooter = true;
    if (
      this.remainElectPrintViewData.elecSignInfo.ElecSignState === "NOTSTARTED"
    ) {
      this.showAccept = true;
    } else if (
      this.remainElectPrintViewData.elecSignInfo.ElecSignState === "CC_APPROVAL"
    ) {
      this.isElectrilSign = true;
    } else if (
      this.remainElectPrintViewData.elecSignInfo.ElecSignState ===
      "RSW_ACKNOWLEDGE"
    ) {
      this.showAcknowledge = true;
      this.ElecSignPlacementAgreementID =
        this.remainElectPrintViewData.placementAgreementText.ElecSignPlacementAgreementID;
    } else {
      this.isApprovalProcess = true;
      this.ElecSignPlacementAgreementID =
        this.remainElectPrintViewData.placementAgreementText.ElecSignPlacementAgreementID;
      this.getStatusForm();
    }
    if (this.showAccept || this.isElectrilSign || this.isApprovalProcess) {
    } else {
      this.isShowEmailFooter = true;
    }
    this.providerMemberName =
      this.remainElectPrintViewData.placementAgreementText.ProviderMemberName;
    this.providerElecSignDate =
      this.remainElectPrintViewData.placementAgreementText.Provider_ElecSignDate;
    this.sfmAdmissionCCStaffName =
      this.remainElectPrintViewData.placementAgreementText.CC_StaffName;
    this.sfmAdmissionCCStaffDate =
      this.remainElectPrintViewData.placementAgreementText.CC_ElecSignDate;
    this.placementAgreementTextElecSign =
      this.remainElectPrintViewData.placementAgreementText.AgreementText;
    this.placementAgreementProviderClause = "";
    this.placementAgreementStaticContent = `<span></span>`;
    this.placementAgreementSFAClause = "";
  }

  isLoad = false;
  printAck() {
    this.isLoad = true;
    var request;
    if (this.isElecSign === "true") {
      request = {
        reportType: "ElecSignPlacementAgreement",
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
        elecSignPlacementAgreementID:
          this.elecSignData["elecSignPlacementAgreementID"],
      };
      var elecSavePrintHis = {
        authorizationID: this.elecSignData["authorizationID"],
        IsEmail: false,
        IsExport: true,
        isVoid: true,
        viewOnly: 3,
        ReportType: "ElecSignPlacementAgreement",
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
        elecSignPlacementAgreementID:
          this.elecSignData["elecSignPlacementAgreementID"],
      };
      this._opencard.savePrintHistory(elecSavePrintHis).then((data) => {
        this._opencard.printAckPDF(request).then((data) => {
          this.isLoad = false;
          window.open(
            `${environment.uri}:8081/loadDocument/${data.CMSPDFDoc.pdfDocId}`,
            "popup",
            "width=600,height=600,toolbar=no,titlebar=no"
          );
        });
      });
    } else {
      request = {
        reportType: "FCHPlacementAgreement",
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
        printFCHPlacementagreementID: this.fchPrintID,
      };
      this._opencard.savePrintHistory(this.FCH_data).then((data) => {
        this.isLoad = false;
        this._opencard.printAckPDF(request).then((data) => {
          window.open(
            `${environment.uri}:8081/loadDocument/${data.CMSPDFDoc.pdfDocId}`,
            "popup",
            "width=600,height=600,toolbar=no,titlebar=no"
          );
        });
      });
    }
    // this._opencard.printAckPDF(request).then((data) => {
    //   window.open(
    //     `${environment.uri}:8081/loadDocument/${data.CMSPDFDoc.pdfDocId}`,
    //     "popup",
    //     "width=600,height=600,toolbar=no,titlebar=no"
    //   );
    // });
  }
  netPass: any;
  comments: any;
  clickDisAgree() {
    var comments;
    var netPass;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    var req;
    if (this.remainElectPrintView) {
      if (this.comments === "") {
        comments = null;
      } else {
        comments = this.comments;
      }
      if (this.netPass === "") {
        netPass = null;
      } else {
        netPass = this.netPass;
      }
      req = {
        approvalNotes: comments,
        approvalPassword: netPass,
        elecSignPlacementAgreementID:
          this.remainElectPrintViewData.placementAgreementText
            .ElecSignPlacementAgreementID,
        ClientName:
          this.remainElectPrintViewData.placementAgreementText.ClientName,
      };
      console.log("req>>", req);
      this._opencard.disagreeAgreement(req).then((data) => {
        loader.style.display = "none";
        if (data.responseStatus) {
          if (this.isRemainderBox) {
            this.onSigned.emit("true");
          } else {
            this._router.navigate(["/flow-chart"], {
              queryParamsHandling: "preserve",
            });
          }
          swal("Info!", "This placement Agreement has been Cancelled!", "info");
        } else {
          swal("Info!", data.responseMessage, "info");
        }
      });
    } else {
      if (this.comments === "") {
        comments = null;
      } else {
        comments = this.comments;
      }
      if (this.netPass === "") {
        netPass = null;
      } else {
        netPass = this.netPass;
      }
      req = {
        approvalNotes: comments,
        approvalPassword: netPass,
        elecSignPlacementAgreementID: this.ElecSignPlacementAgreementID,
        ClientName: this.CLIENT_NAME,
      };
      console.log("req>>", req);
      this._opencard.disagreeAgreement(req).then((data) => {
        loader.style.display = "none";
        if (data.responseStatus) {
          if (this.isRemainderBox) {
            this.onSigned.emit("true");
          } else {
            this._router.navigate(["/flow-chart"], {
              queryParamsHandling: "preserve",
            });
          }
          swal("Info!", "This placement Agreement has been Cancelled!", "info");
        } else {
          swal("Info!", data.responseMessage, "info");
        }
      });
    }
  }
  agree = false;

  EsignAgree() {
    var netPass;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    if (this.netPass === "") {
      netPass = null;
    } else {
      netPass = this.netPass;
    }
    console.log(
      "this.remainElectPrintViewData>>>>>",
      this.remainElectPrintViewData
    );
    var req = {
      elecSignState: this.remainElectPrintViewData.elecSignInfo.ElecSignState,
      authorizationID:
        this.remainElectPrintViewData.placementAgreementText.AuthorizationID,
      elecSignPlacementAgreementID:
        this.remainElectPrintViewData.placementAgreementText
          .ElecSignPlacementAgreementID,
      isApproved: this.agree,
      approvalPassword: netPass,
      ProviderID:
        this.remainElectPrintViewData.placementAgreementText.ProviderID,
      ClientName:
        this.remainElectPrintViewData.placementAgreementText.ClientName,
    };
    console.log("req>>", req);

    this._opencard.e_sign_agreeAgreement(req).then((data) => {
      loader.style.display = "none";
      if (data.responseStatus) {
        if (this.isRemainderBox) {
          this.onSigned.emit("true");
        } else {
          this._router.navigate(["/flow-chart"], {
            queryParamsHandling: "preserve",
          });
        }
        swal(
          "Success!",
          "This placement Agreement has been Approved!",
          "success"
        );

        let downReq = {
          elecSignPlacementAgreementID:
            this.remainElectPrintViewData.placementAgreementText.ElecSignPlacementAgreementID.toString(),
          authorizationID:
            this.remainElectPrintViewData.placementAgreementText
              .AuthorizationID,
          staffID: parseInt(localStorage.getItem("UserId")) || 5130,
        };
        this._opencard.downloadEsign(downReq).then((down_data) => {});
      } else {
        swal("Info!", data.responseMessage, "info");
      }
    });
  }
  elecsignAccept() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    var req = {
      elecSignState: this.electSignState,
      authorizationID: this.PLACEMENT_AUTH_ID,
      elecSignPlacementAgreementID: this.ElecSignPlacementAgreementID,
      ClientName: this.CLIENT_NAME,
    };
    console.log("req>>", req);
    this._opencard.e_sign_agreeAgreementAccept(req).then((data) => {
      loader.style.display = "none";
      let downReq = {
        elecSignPlacementAgreementID:
          this.remainElectPrintViewData.placementAgreementText.ElecSignPlacementAgreementID.toString(),

        authorizationID: this.PLACEMENT_AUTH_ID,
        staffID: parseInt(localStorage.getItem("UserId")) || 5130,
      };
      this._opencard.downloadEsign(downReq).then((down_data) => {});
      this._router.navigate(["/flow-chart"], {
        queryParamsHandling: "preserve",
      });
    });
  }
  careCenterStatus: any;
  providerStatus: any;
  staffStatus: any;
  currentStatus: any;

  getStatusForm() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {
      elecSignPlacementAgreementID: this.ElecSignPlacementAgreementID,
    };
    this._opencard.eSignGetApprovalStatus(req).then((data) => {
      loader.style.display = "none";
      console.log("data>>>>", data);
      console.log(
        "data.elecSignPlacementAgreement>>>>",
        data.elecSignPlacementAgreement
      );
      this.careCenterStatus = data.elecSignPlacementAgreement.CC_Status;
      this.providerStatus = data.elecSignPlacementAgreement.Provider_Status;
      this.staffStatus = data.elecSignPlacementAgreement.FCHStaff_Status;
      this.currentStatus = data.elecSignPlacementAgreement.CurrentState;
    });
  }
  restartApproval() {
    let req = {
      authorizationID: this.PLACEMENT_AUTH_ID,
      elecSignPlacementAgreementID: this.ElecSignPlacementAgreementID,
      restartProcess: true,
    };
    this._opencard.eSignRestartApproval(req).then((data: any) => {
      console.log("<<data>>>", data);
      this.remainElectPrintViewData = data;
      console.log("data>>>", data);
      console.log(
        "this.remainElectPrintViewData>>",
        this.remainElectPrintViewData
      );
      this.showPrompt = false;
      this.formType = "false";
      this.isElecSign = "true";
      this.showExport = false;
      this.emailFoot = false;
      this.isApprovalProcess = false;
      this.getRemaindElecprint();
      // this._router.navigate(["/reintegration/referral/opencard/placement/placementEvent/detail"], {
      //   queryParams: { isIndiviual: false },
      //   queryParamsHandling: "merge",
      // });
    });
  }

  closeAck_Window(event) {
    console.log("closeAck_Window>>>", event);
    this.closeAckWindow.emit(event);
  }

  elecsignAcknowledge() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    var req = {
      elecSignPlacementAgreementID: this.ElecSignPlacementAgreementID,
    };
    this._opencard.elecsignAcknowledge(req).then((data) => {
      loader.style.display = "none";
      let downReq = {
        elecSignPlacementAgreementID:
          this.remainElectPrintViewData.placementAgreementText.ElecSignPlacementAgreementID.toString(),

        authorizationID: this.PLACEMENT_AUTH_ID,
        staffID: parseInt(localStorage.getItem("UserId")) || 5130,
      };
      this._opencard.downloadEsign(downReq).then((down_data) => {});
      this._router.navigate(["/flow-chart"], {
        queryParamsHandling: "preserve",
      });
    });
  }

  exportEsign() {
    window.open(
      `${environment.uri}:8081/loadDocument/${parseInt(
        localStorage.getItem("esignPdFDocID")
      )}`,
      "popup",
      "width=600,height=600,toolbar=no,titlebar=no"
    );
  }

  esignExit() {
    if (this.isRemainderBox) {
      this.onSigned.emit("true");
    } else {
      if (this._router.url.includes("module=placement&action=create")) {
        this._router.navigate(["/flow-chart"], {
          queryParamsHandling: "preserve",
        });
      } else {
        this._router.navigate(
          ["/reintegration/referral/opencard/placement/placementEvent/detail"],
          { queryParamsHandling: "preserve" }
        );
      }
    }
  }
  showPrompt = false;
  confirmRestartApproval() {
    this.showPrompt = true;
  }
  promt_close() {
    this.showPrompt = false;
  }

  async getClientName() {
    let request = { clientID: this.CLIENT_ID };
    this.CLIENT_NAME = await this._opencard.getClientName(request);
    console.log("Placement agreement client name", this.CLIENT_NAME);
  }
}
