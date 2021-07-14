import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PlacementService } from "../../placement/placement.service";
import { PlacementPsa, PlacementPSAPrintPreview } from "./placement-psa";
import { isNullOrUndefined } from "util";
import html2pdf from "html2pdf.js";
import {LocalValues} from "../../local-values";
import { TeamFormService } from "../../team-form/team-form.service";
import { CaseTeamService } from "../../case-team/case-team.service";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import swal from "sweetalert2";
@Component({
  selector: "app-placement-psa",
  templateUrl: "./placement-psa.component.html",
  styleUrls: ["./placement-psa.component.scss"],
  inputs: ["currentFormMode"],
  outputs: ["formStatus", "closeAckWindow"],
})
export class PlacementPsaComponent implements OnInit {
  placementData: any = new PlacementPsa();
  currentDate = new Date();
  currentDateTime: any;
  staffName: string;
  currentPlacementID: number;
  currentPlacementDetailID: number;
  waterMarkContent: string;
  isWatermarkerEnable = false;
  currentModule: string;
  @Input() currentFormMode: string;
  @Output() formStatus = new EventEmitter();
  @Output() closeAckWindow = new EventEmitter();
  @Input() psaID;
  @Input() isPSA_View;
  isPlacementDelete: string;
  formData: any;
  savePSA_req: any;
  printPreviewData: PlacementPSAPrintPreview = new PlacementPSAPrintPreview();
  subModule: string;
  isShowEmailFooter: boolean;

  constructor(
    public _opencards: OpencardsService,
    public _CaseTeamService: CaseTeamService,
    public _team: TeamFormService,
    public _localValues: LocalValues,
    public _placement: PlacementService,
    public _activatedRoute: ActivatedRoute,
    public _router: Router
  ) {}

  ngOnInit() {
    console.log("psaID>>>", this.psaID, ">>>isPSA_View>>", this.isPSA_View);
    console.log("currentFormMode>>>>>>>>>", this.currentFormMode);
    if (this.isPSA_View) {
      this.getHistoryPrintPrev();
    } else {
      this.isShowEmailFooter = true;
      this.isPSA_View = false;
      this.getPrintPreviewValuesBasedOnAuthID();
      this.savePSA_req = {
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        clientID:
          parseInt(localStorage.getItem("clientId")) -
          this._opencards.getHasKey(),
        authorizationID:
          parseInt(localStorage.getItem("authorizationId")) -
          this._opencards.getHasKey(),
        IsEmail: false,
        IsExport: true,
        isVoid: true,
        viewOnly: 3,
        ReportType: "ProviderServiceAgreement",
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
      };
    }

    this.currentPlacementID = parseInt(
      this._activatedRoute.snapshot.queryParamMap.get("p_id")
    ); // Placement id
    this.currentPlacementDetailID = parseInt(
      this._activatedRoute.snapshot.queryParamMap.get("pd_id")
    ); // Placement Detail id
    this.currentModule = this._activatedRoute.snapshot.queryParamMap.get(
      "module"
    );
    this.currentFormMode = this._activatedRoute.snapshot.queryParamMap.get(
      "action"
    );
    this.subModule = this._activatedRoute.snapshot.queryParamMap.get("sub");
    this.getData();
    this.getAuthData();
    this.getCommonData();
    this.getCaseTeamData();
    this.getPSAFormData();
    this.currentDateTime = this._localValues.getDateandTimeWithExt(
      this.currentDate
    );
    this.waterMark();
    if (this._router.url.includes("placement-psa")) {
      this.isPlacementDelete = "false";
    } else {
      this.isPlacementDelete = "true";
    }
    if (
      this._router.url === "/reintegration/referral/service/hardgoods/detail" ||
      this._router.url ===
        "/reintegration/referral/service/other/service/detail"
    ) {
      this.isWatermarkerEnable = true;
      this.waterMarkContent = "void";
      console.log(">>>>>>this._router.url><<<<<", this._router.url);
    }
  }

  getCaseTeamData() {
    const req = {
      authorizationID:
        parseInt(localStorage.getItem("authorizationId")) -
        this._opencards.getHasKey(),
    };

    this._CaseTeamService.getCaseManagerList(req).then((data) => {
      const caseManagerInfo =
        data.caseManagerList[data.caseManagerList.length - 1];
      data.caseManagerList.length > 0
        ? (this.placementData.caseManager = caseManagerInfo.caseManagerName)
        : null;
      data.caseManagerList.length > 0
        ? (this.placementData.caseManagerPhone = caseManagerInfo.workPhone)
        : null;
    });
  }

  getCommonData() {
    this.placementData.sponsor = "Saint Francis Community Services";
    const staffId = localStorage.getItem("UserId");
    if (localStorage.getItem("UserId")) {
      this._team.getUserById({ staffID: parseInt(staffId) }).then((data) => {
        this.staffName = data.users.lastName + " " + data.users.firstName;
      });
    }
  }

  getAuthData(): any {
    const placementReq = {
      placementDetailID:
        this._placement.getSavedPlacementDetailId() ||
        this.currentPlacementDetailID,
    };
    if (
      this._placement.getSavedPlacementId() ||
      this.currentPlacementDetailID
    ) {
      this._placement
        .getPlacementAuthorization(placementReq)
        .then((data: any) => {
          this.placementData.placementAuthorization =
            data.placementAuthorization;
          let authInfo: any;
          if (this._localValues.currentAuthorizationId) {
            if (data.placementAuthorization.length > 0) {
              authInfo = data.placementAuthorization.filter((item) => {
                return (
                  item.authorizationID ===
                  this._localValues.currentAuthorizationId
                );
              });
              authInfo.length > 0 ? (authInfo = authInfo[0]) : null;
            }
          } else {
            authInfo =
              data.placementAuthorization[
                data.placementAuthorization.length - 1
              ];
          }

          if (authInfo) {
            if (authInfo.beginDate) {
              data.placementAuthorization.length > 0
                ? (this.placementData.beginDate =
                    new Date(authInfo.beginDate).getMonth() +
                    1 +
                    "/" +
                    new Date(authInfo.beginDate).getDate() +
                    "/" +
                    new Date(authInfo.beginDate).getFullYear())
                : null;
            }
            if (authInfo.endDate) {
              data.placementAuthorization.length > 0
                ? (this.placementData.endDate =
                    new Date(authInfo.endDate).getMonth() +
                    1 +
                    "/" +
                    new Date(authInfo.endDate).getDate() +
                    "/" +
                    new Date(authInfo.endDate).getFullYear())
                : null;
            }
          }

          data.placementAuthorization.length > 0
            ? (this.placementData.unitsAuthorized = authInfo.unitsAuth)
            : null;
          data.placementAuthorization.length > 0
            ? (this.placementData.rate = authInfo.payorRate)
            : null;
          data.placementAuthorization.length > 0
            ? (this.placementData.provRate = authInfo.providerRate)
            : null;
          data.placementAuthorization.length > 0
            ? (this.placementData.preAuthNumber = authInfo.authorizationID)
            : null;
        });
    }
  }

  getData() {
    const placementReq = {
      placementID:
        this._placement.getSavedPlacementId() || this.currentPlacementID,
    };
    if (this._placement.getSavedPlacementId() || this.currentPlacementID) {
      this._placement.getPlacement(placementReq).then((data: any) => {
        !isNullOrUndefined(data.placement.clientID)
          ? (this.placementData.client =
              data.placement.clientID.clientNameLastFirst)
          : null;
        !isNullOrUndefined(data.placement.clientID)
          ? (this.placementData.dob =
              new Date(data.placement.clientID.dob).getMonth() +
              1 +
              "/" +
              new Date(data.placement.clientID.dob).getDate() +
              "/" +
              new Date(data.placement.clientID.dob).getFullYear())
          : null;
        !isNullOrUndefined(data.placement.referralID.caseID)
          ? (this.placementData.referralID =
              data.placement.referralID.caseID.facts)
          : null;
        !isNullOrUndefined(data.placement.clientID)
          ? (this.placementData.kaecses = data.placement.clientID.kaecses)
          : null;
        !isNullOrUndefined(data.placement.clientID)
          ? (this.placementData.ssn = data.placement.clientID.ssn)
          : null;
        // !isNullOrUndefined(data.placement.providerID) ? this.placementData.provider = data.placement.providerID.providerName : null;
        // if (this._localValues.livingArrangementProviderName) {
        //   this.placementData.provider = this._localValues.livingArrangementProviderName;
        // }
        !isNullOrUndefined(data.placement.providerID)
          ? (this.placementData.medicaidId =
              data.placement.providerID.medicaidNo)
          : null;
        // !isNullOrUndefined(data.placement.clientID) ? this.placementData.address = data.placement.clientID.address : null;
        !isNullOrUndefined(data.placement.clientID.countyID)
          ? (this.placementData.phone =
              data.placement.clientID.countyID.sfaofficeID.phone)
          : null;
        !isNullOrUndefined(data.placement.clientID.countyID)
          ? (this.placementData.fax =
              data.placement.clientID.countyID.sfaofficeID.fax)
          : null;
        !isNullOrUndefined(data.placement.providerID)
          ? (this.placementData.taxID = data.placement.providerID.fedTaxNo)
          : null;
        !isNullOrUndefined(data.placement.clientID.clientMedications)
          ? (this.placementData.billableUnit =
              data.placement.clientID.clientMedications[0].frequencyTypeID.frequencyType)
          : null;
        !isNullOrUndefined(data.placement.referralID)
          ? (this.placementData.payorName =
              data.placement.referralID.caseID.payorID.payorName)
          : null;
        this._placement.storePlacementData(data);
      });
    }
  }

  print() {
    const element_pro = document.getElementById("pdf-content-print");
    const opt_pro = {
      margin: 1,
      filename: "PlacementForm",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
      pagebreak: { mode: "avoid-all", before: "#page2el" },
    };
    html2pdf().from(element_pro).set(opt_pro).save();
  }

  getPlacementDetailInfo(): any {
    const req = {
      placementDetailID:
        this._placement.getSavedPlacementDetailId() ||
        this.currentPlacementDetailID,
    };
    this._placement.getPlacementDetailInfo(req).then((data: any) => {
      !isNullOrUndefined(data.placementDetail.providerLocationID)
        ? (this.placementData.address =
            data.placementDetail.providerLocationID.address1)
        : null;
      !isNullOrUndefined(data.placementDetail.procodeID)
        ? (this.placementData.service =
            data.placementDetail.procodeID.procode +
            " " +
            data.placementDetail.procodeID.categoryOfService)
        : null;

      if (data.placementDetail.providerID) {
        if (data.placementDetail.providerID.providerID) {
          !isNullOrUndefined(data.placementDetail.providerID)
            ? (this.placementData.provider =
                data.placementDetail.providerID.providerName)
            : null;
          if (this._localValues.livingArrangementProviderName) {
            this.placementData.provider = this._localValues.livingArrangementProviderName;
          }
          if (this._localValues.livingArrangementProviderId) {
            data.placementDetail.providerID.providerID = this._localValues.livingArrangementProviderId;
          }
          const providerLocationRequest = {
            providerID: data.placementDetail.providerID.providerID,
          };
          this._placement
            .getProviderLocationInfo(providerLocationRequest)
            .then((data: any) => {
              if (data.providerolcation.length > 0) {
                !isNullOrUndefined(data.providerolcation[0].address1)
                  ? (this.placementData.providerAddress =
                      data.providerolcation[0].address1)
                  : null;
                !isNullOrUndefined(data.providerolcation[0].phone)
                  ? (this.placementData.providerPhone =
                      data.providerolcation[0].phone)
                  : null;
                !isNullOrUndefined(data.providerolcation[0].city)
                  ? (this.placementData.providerCity =
                      data.providerolcation[0].city)
                  : null;
                !isNullOrUndefined(data.providerolcation[0].zipCode)
                  ? (this.placementData.providerZipCode =
                      data.providerolcation[0].zipCode)
                  : null;
                !isNullOrUndefined(data.providerolcation[0].abbreviation)
                  ? (this.placementData.providerState =
                      data.providerolcation[0].abbreviation)
                  : null;
                this.placementData.providerFullAddress =
                  this.placementData.providerAddress +
                  ", " +
                  this.placementData.providerCity;
              }
            });
        }
      }
    });
  }

  waterMark() {
    this.isWatermarkerEnable = true;
    if (
      this.currentModule == "livingArrangment" ||
      this.subModule === "livingArrangement"
    ) {
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
      } else {
        if (this.currentFormMode === "edit") {
          if (localStorage.getItem("correctedCopy") === "true") {
            this.waterMarkContent = "Corrected";
          }
        }
      }
    }
  }

  ngOnDestroy() {
    this._localValues.currentAuthorizationId = null;
  }

  getFormStatus = (event: any) => {
    console.log("In placement psa component form status", event);
    this.formStatus.emit(event.formStauts);
  };

  async getPrintAckData() {
    const request = {
      authorizationID:
        parseInt(localStorage.getItem("authorizationId")) -
        this._opencards.getHasKey(),
      isVoid: this.currentFormMode === "delete" ? 1 : 0,
      viewOnly: 3,
    };
    const response: any = await this._opencards.getProviderServiceAgreementPrintAckData(
      request
    );
    console.log("Placement PSA Form", response);
    this.formData = response;
    this.placementData = response;
    this.placementData.client = response.clientName;
    this.placementData.dob = response.dbo;
    this.placementData.provider = response.providerName;
    this.placementData.providerFullAddress = response.providerAddress;
    this.placementData.phone = response.providerPhone;
    this.placementData.fax = response.providerFax;
    this.placementData.provRate = !isNullOrUndefined(response.providerRate)
      ? response.providerRate
      : "";
    this.placementData.medicaidId = !isNullOrUndefined(response.medicaidNo)
      ? response.medicaidNo
      : "";
    this.placementData.ssn = response.ssn;
    this.placementData.provRate = response.providerRate;
    this.placementData.medicaidId = response.medicaidNo;
    this.placementData.taxID = response.fedTaxNo;
    this.placementData.sponsor = response.sponsorName;
    this.placementData.rate = response.providerRate;
    this.placementData.billableUnit = response.unitType;
    this.placementData.frequency = response.frequency;
  }

  getPSAFormData() {
    if (
      this.currentModule === "other-service-hard-goods" ||
      this.currentModule === "other-service-claims"
    ) {
      this.getPrintAckData();
    } else {
      this.getPlacementDetailInfo();
    }
  }

  async getPrintPreviewValuesBasedOnAuthID() {
    let authorizationID: number;
    // if (
    //   this._router.url.includes("hardgoods") ||
    //   this._router.url.includes("other-service")
    // ) {
    //   authorizationID = parseInt(localStorage.getItem("authId"));
    // } else {

    // }

    if (
      this._router.url === "/reintegration/referral/service/hardgoods/detail" ||
      this._router.url ===
        "/reintegration/referral/service/other/service/detail"
    ) {
      this.isWatermarkerEnable = true;
      this.waterMarkContent = "void";
      authorizationID = parseInt(localStorage.getItem("authId"));
    } else {
      authorizationID =
        parseInt(localStorage.getItem("authorizationId")) -
        this._opencards.getHasKey();
    }

    const request = { authorizationID: authorizationID };
    this.printPreviewData = await this._opencards.getPSAPrintPreviewFormData(
      request
    );

    if (this.printPreviewData) {
      this.isShowdata = true;
    } else {
      this.isShowdata = false;
    }
    console.log("PSA print preview data", this.printPreviewData);
    if (
      this._router.url === "/reintegration/referral/service/hardgoods/detail" ||
      this._router.url ===
        "/reintegration/referral/service/other/service/detail"
    ) {
      const req = { authorizationID: parseInt(localStorage.getItem("authId")) };
      // await this._opencard.deleteAuth(req);
      this._opencards.deleteAuth(req).then((data) => {
        console.log("data>>>>>>", data);
        if (!data.responseStatus) {
          swal("Info", `${data.responseMessage}`, "info");
        }
      });
    }
  }
  savePsaReq: any;
  isShowdata = false;
  sendFooterReq: any;
  async getHistoryPrintPrev() {
    var print_preview = [];
    const request = { printProviderServiceAgreementID: this.psaID };
    print_preview = await this._opencards.getPSAinHistory(request);
    if (print_preview.length === 0) {
      this.isShowdata = false;
    } else {
      this.isShowdata = true;
      this.printPreviewData = print_preview[0];
      console.log("this.printPreviewData>>", this.printPreviewData);
      console.log("this.printPreviewData[0]>>", this.printPreviewData[0]);
      this.savePsaReq = {
        referralID: this.printPreviewData["referralID"],
        clientID: this.printPreviewData["clientID"],
        authorizationID: this.printPreviewData.AuthorizationID,
        IsEmail: false,
        IsExport: true,
        isVoid: this.printPreviewData["Void"],
        viewOnly: 3,
        ReportType: "ProviderServiceAgreement",
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
      };

      this.sendFooterReq = {
        saveReq: this.savePsaReq,
        pdfReq: {
          reportType: "ProviderServiceAgreement",
          staffID: parseInt(localStorage.getItem("UserId")) || 4620,
          printProviderServiceAgreementID: this.psaID,
        },
      };
      this.isShowEmailFooter = true;
      this.currentDateTime = this.printPreviewData.DateTime;
      this.placementData.caseManager = this.printPreviewData["CaseManager"];
      console.log("PSA print preview data", this.printPreviewData);
    }
  }
  isLoad = false;
  printPSA() {
    this.isLoad = true;
    this._opencards.savePrintHistory(this.savePsaReq).then((data) => {
      var request = {
        reportType: "ProviderServiceAgreement",
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
        printProviderServiceAgreementID: this.psaID,
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
  closeAck_Window(event) {
    console.log("closeAck_Window>>>", event);
    this.closeAckWindow.emit(event);
  }
}
