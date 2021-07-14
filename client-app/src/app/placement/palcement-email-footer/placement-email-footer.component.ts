import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import html2pdf from "html2pdf.js";
import { Router, ActivatedRoute } from "@angular/router";
import { PlacementService } from "../../placement/placement.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import swal from "sweetalert2";
import { PlacementPrintService } from "../../placement-forms/placement-print.service";
import * as moment from "moment";
import { environment } from "../../../environments/environment";
import { PrintService } from "../../print-layout/service/print.service";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { isNullOrUndefined } from "util";
import {LocalValues} from "../../local-values";

@Component({
  selector: "app-placement-email-footer",
  templateUrl: "./placement-email-footer.component.html",
  styleUrls: ["./placement-email-footer.component.scss"],
  inputs: [
    "currentForm",
    "fileStream",
    "isPlacementDelete",
    "deleteForm",
    "placementAckformData",
    "placementServiceAgreementFormData",
    "placementEventStatusFormData",
    "placementAgreementFormData",
    "placementFlowChartData",
    "placementFaxListAckData",
    "placementLivingArragmentFlowFlag",
    "saveAckPrintPlacementData",
    "savePSA_req",
    "isViewHistory",
    "viewHistoryData",
    "isMoveForm",
    "isNoData",
  ],
  outputs: ["isPlacementPsaPrompt", "formStatus", "closeAck_Window"],
})
export class PlacementEmailFooterComponent implements OnInit {
  isOther = false;
  mailContentMessage: any;
  otherMailAddress: any;
  returnMenuItems = [];
  env = environment;
  subModule: string;
  isDeleteAuth: string;
  module: string;
  currentFormMode: string;
  currentURL: string;
  isStaff = false;
  isCaseTeam = false;
  isDistrictCourt = false;
  isDCF = false;
  isAccountsReceivable = false;
  isCountyAttorney = false;
  isFCH = false;
  isAdoption = false;
  isOpsCo = false;
  pdfDocID: any;
  placementEmailCheckBoxes = {
    iskcsl: false,
    isfch: false,
    isstaff: false,
    iscaseteam: false,
    isdistrictCourt: false,
    isaccountReceivable: false,
    iscounty: false,
    isdcf: false,
    isops: false,
  };
  emailSubject: string;
  currentPlacementDetailId: number;

  @Input()
  currentForm: string;
  isMoveForm = false;
  fileStream: any;
  isPlacementDelete = "false";
  deleteForm: string;
  placementAckformData: any;
  placementServiceAgreementFormData: any;
  placementEventStatusFormData: any;
  placementAgreementFormData: any;
  placementFlowChartData: any;
  placementFaxListAckData: any;
  saveAckPrintPlacementData: any;
  savePSA_req: any;
  isViewHistory = false;
  viewHistoryData: any;
  public isAuthorization = true;
  currentRecordId: number;
  isNoData = false;

  @Output()
  isPlacementPsaPrompt = new EventEmitter();
  formStatus = new EventEmitter();
  closeAck_Window = new EventEmitter();
  continuumofCareFlowChartDocID: number;
  placementAgreementKinshipDocID: number;
  placementAgreementKinshipAndAgencyApprovedDocID: number;
  placementEventStatusDocID: number;
  providerServiceAgreementDocID: number;
  referralNotificationOfMovePlacementChangeDocID: number;
  referralNotificationOfMovePlacementChangeVoidDocID: number;
  loadProviderEnvelopeDocID: number;
  isPlacementAckWindow = false;
  placementAckModule: string;
  placementLivingArragmentFlowFlag: string; /** String indicates the respite and respite return in the placement ack form **/
  isAnIndividualForm = false;
  isPlacementEmailConfiguration = false;
  flowChartEmailRecipients: string;
  isHardGoods = false;
  hideFooter = false;
  printurl: any;
  public isSendEmail = true;
  constructor(
    public _opencards: OpencardsService,
    public _placementPrint: PlacementPrintService,
    public _router: Router,
    public _placement: PlacementService,
    public _activatedRoute: ActivatedRoute,
    public _local: LocalValues
  ) { }

  ngOnInit() {
    this.isSendEmail = true;
    if (
      this._router.url === "/reintegration/referral/service/hardgoods/detail" ||
      this._router.url ===
      "/reintegration/referral/service/other/service/detail"
    ) {
      this.isHardGoods = true;
      this.pdfDocID = parseInt(localStorage.getItem("hardGoods_pdfDocID"));
      // var req = {
      //   "staffID": parseInt(localStorage.getItem("UserId")) || 14802,
      //   "form": "ProviderServiceAgreementVoid",
      //   "authorizationID": parseInt(localStorage.getItem("authId")),
      // }
      // this._opencards.getPSDPDFKITVoidForm(req).then(data => {
      //   this.pdfDocID = data.ProviderServiceAgreementVoid['pdfDocID'];
      //   console.log("this.pdfDocID>>>", this.pdfDocID);
      // });
    }
    this.setEmailRecipientsCheck();
    this.currentRecordId = parseInt(
      this._activatedRoute.snapshot.queryParamMap.get("recId")
    );
    this.subModule = this._activatedRoute.snapshot.queryParamMap.get("sub");
    this.isDeleteAuth = this._activatedRoute.snapshot.queryParamMap.get(
      "isDeleteAuth"
    );
    this.module = this._activatedRoute.snapshot.queryParamMap.get("module");
    this.currentFormMode = this._activatedRoute.snapshot.queryParamMap.get(
      "action"
    );
    this.currentURL = this._router.url;
    this.currentPlacementDetailId = parseInt(
      this._activatedRoute.snapshot.queryParamMap.get("pd_id")
    );
    this.isAuthorization =
      this._activatedRoute.snapshot.queryParamMap.get("authorization") !==
        "false"
        ? true
        : false;
    (this.isAnIndividualForm =
      this._activatedRoute.snapshot.queryParamMap.get("isIndiviual") === "true")
      ? true
      : false;
    /**
     * Eg:
     * {label: 'Update', icon: 'pi pi-refresh', command: () => {this.update();}}
     * {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'}
     * {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
     *
     * */
    if (
      this.subModule === "livingArrangement" ||
      this.subModule === "livingArrangment"
    ) {
      this.returnMenuItems.push(
        {
          label: "Living Arrangement New",
          routerLink: [
            "/reintegration/referral/opencard/placement/living-arrangement/new",
          ],
        },
        {
          label: "Placement New",
          routerLink: ["/reintegration/referral/opencard/placement/new"],
        },
        {
          label: "Placement Acknowledgement",
          routerLink: ["/placement-acknowledgment"],
        },
        { label: "Placement PSA", routerLink: ["/placement-psa"] },
        {
          label: "Placement Event Status",
          routerLink: ["/placement-event-status"],
        },
        { label: "Placement Agreement", routerLink: ["/placement-agreement"] },
        // { label: 'Placement Agreement Kinship (AP)', routerLink: ['/placement-agreement-kinship-agency-approved'] },
        // { label: 'Placement Agreement Kinship (NP)', routerLink: ['/placement-agreement-kinship-non-paid'] },
        { label: "Flow Chart", routerLink: ["/flow-chart"] },
        // { label: 'Provider Envelope', routerLink: ['/provider-envelope'] },
        { label: "Fax List", routerLink: ["/fax-list"] },
        { label: "View History", routerLink: ["/view-history"] }
      );
      if (this.currentFormMode === "create") {
        this.emailSubject = "Living arrangement acknowledgement";
      } else {
        this.emailSubject = "Living arrangement return acknowledgement";
      }
    } else if (this.subModule === "dayCareAuthorization") {
      this.returnMenuItems.push(
        {
          label: "Daycare Authorization",
          command: () => {
            this.menuItemsNavigations(
              "/reintegration/referral/opencard/placement/daycare-authorization/new"
            );
          },
        },
        {
          label: "Placement List",
          command: () => {
            this.menuItemsNavigations(
              "/reintegration/referral/opencard/placement/view"
            );
          },
        }
      );
      if (this.currentFormMode === "create") {
        this.emailSubject = "Daycare authorization acknowledgement";
      } else {
        this.emailSubject = "Daycare authorization return acknowledgement";
      }
    } else if (this.subModule === "placementEvent") {
      /**Placement event */
      this.returnMenuItems.push(
        {
          label: "Placement New",
          routerLink: ["/reintegration/referral/opencard/placement/new"],
        },
        {
          label: "Placement Acknowledgement",
          routerLink: ["/placement-acknowledgment"],
        },
        { label: "Placement PSA", routerLink: ["/placement-psa"] },
        {
          label: "Placement Event Status",
          routerLink: ["/placement-event-status"],
        },
        { label: "Placement Agreement", routerLink: ["/placement-agreement"] },
        // { label: 'Placement Agreement Kinship (AP)' },
        // { label: 'Placement Agreement Kinship (NP)' },
        { label: "Flow Chart", routerLink: ["/flow-chart"] },
        // { label: 'Provider Envelope' },
        { label: "Fax List", routerLink: ["/fax-list"] },
        { label: "View History", routerLink: ["/view-history"] }
      );
      if (this.currentFormMode === "create") {
        this.emailSubject = "Placement event acknowledgement";
      } else {
        this.emailSubject = "Placement event return acknowledgement";
      }
    } else if (this.module === "move-form") {
      /**Move form */
      this.returnMenuItems.push(
        { label: "Move", routerLink: ["/move-form"] },
        {
          label: "Move With Disruption",
          routerLink: ["/move-form-with-disruption"],
        }
      );
      if (this.currentFormMode === "create") {
        this.emailSubject = "Move form acknowledgement";
      } else {
        this.emailSubject = "Move form return acknowledgement";
      }
    } else if (
      this.module === "livingArrangment" &&
      this.subModule === "authorization"
    ) {
      this.returnMenuItems.push(
        {
          label: "PROVIDER SERVICE AGREEMENT SFCS PAYMENT AUTHORIZATION",
          command: () => {
            this.menuItemsNavigations("/placement-psa");
          },
        }
        // { label: 'PROVIDER ENVELOPE', command: () => { this.menuItemsNavigations('/provider-envelope') } },
      );
    } else if (this.module === "placement") {
      this.returnMenuItems.push(
        {
          label: "Placement New",
          routerLink: ["/reintegration/referral/opencard/placement/new"],
          queryParams: { module: "placement" },
        },
        {
          label: "Placement Acknowledgement",
          routerLink: ["/placement-acknowledgment"],
          queryParams: { module: "placement" },
        },
        {
          label: "Placement PSA",
          routerLink: ["/placement-psa"],
          queryParams: { module: "placement" },
        },
        {
          label: "Placement Event Status",
          routerLink: ["/placement-event-status"],
          queryParams: { module: "placement" },
        },
        { label: "Placement Agreement", routerLink: ["/placement-agreement"] },
        // { label: 'Placement Agreement Kinship (AP)', routerLink: ['/placement-agreement-kinship-agency-approved'] },
        // { label: 'Placement Agreement Kinship (NP)', routerLink: ['/placement-agreement-kinship-non-paid'] },
        {
          label: "Flow Chart",
          routerLink: ["/flow-chart"],
          queryParams: { module: "placement" },
        },
        // { label: 'Provider Envelope', routerLink: ['/provider-envelope'] },
        {
          label: "Fax List",
          routerLink: ["/fax-list"],
          queryParams: { module: "placement" },
        },
        {
          label: "View History",
          routerLink: ["/view-history"],
          queryParams: { module: "placement" },
        }
      );
      if (this.currentFormMode === "create") {
        this.emailSubject = "Placement acknowledgement";
      } else {
        this.emailSubject = "Placement return acknowledgement";
      }
    } else {
      this.returnMenuItems.push(
        {
          label: "Living Arrangement New",
          command: () => {
            this.menuItemsNavigations(
              "/reintegration/referral/opencard/placement/living-arrangement/new"
            );
          },
        },
        {
          label: "Placement List",
          command: () => {
            this.menuItemsNavigations(
              "/reintegration/referral/opencard/placement/view"
            );
          },
        }
      );
    }
  }
  otherEmailsEnable(event) {
    return event ? (this.isOther = true) : (this.isOther = false);
  }

  async checkPlacementReferralPrint() {
    const currentURL = this._router.url.includes("?")
      ? this._router.url.split("?")[0]
      : this._router.url;

    switch (currentURL) {
      case "/placement-acknowledgment":
        this._opencards
          .savePrintHistory(this.saveAckPrintPlacementData)
          .then((data) => { });
        return window.open(
          `${environment.uri}:8081/loadDocument/${this._local.referralNotificationOfMovePlacementChangeDocID}`,
          "popup",
          "width=600,height=600,toolbar=no,titlebar=no"
        );
        break;
      case "/placement-acknowledgment-return":
        this.saveAckPrintPlacementData["ReportType"] =
          "Acknowledgement (Return)";
        this._opencards
          .savePrintHistory(this.saveAckPrintPlacementData)
          .then((data) => { });
        return window.open(
          `${environment.uri}:8081/loadDocument/${this._local.referralNotificationOfMovePlacementChangeDocIDReturn}`,
          "popup",
          "width=600,height=600,toolbar=no,titlebar=no"
        );
        break;
      case "/placement-psa":
        if (
          this.module === "authorization" &&
          this.subModule === "placement-event"
        ) {
          let docRequest = {
            staffID: parseInt(localStorage.getItem("UserId")) || 4620,
            form: "ProviderServiceAgreement",
            authorizationID:
              parseInt(localStorage.getItem("authorizationId")) -
              this._opencards.getHasKey(),
          };
          let docID = await this._opencards.getPSDPDFKITForm(docRequest);
          return window.open(
            `${environment.uri}:8081/loadDocument/${docID}`,
            "popup",
            "width=600,height=600,toolbar=no,titlebar=no"
          );
        } else {
          return window.open(
            `${environment.uri}:8081/loadDocument/${this._local.providerServiceAgreementDocID}`,
            "popup",
            "width=600,height=600,toolbar=no,titlebar=no"
          );
        }

        break;
      case "/placement-event-status":
        var req = {
          authorizationID:
            parseInt(localStorage.getItem("authorizationId")) -
            this._opencards.getHasKey(),
          IsEmail: false,
          IsExport: true,
          isVoid: false,
          viewOnly: 3,
          ReportType: "PlacementStatus",
          staffID: parseInt(localStorage.getItem("UserId")) || 4620,
        };

        this._opencards.savePrintHistory(req).then((data) => { });
        return window.open(
          `${environment.uri}:8081/loadDocument/${this._local.placementEventStatusDocID}`,
          "popup",
          "width=600,height=600,toolbar=no,titlebar=no"
        );
        break;

      case "/placement-agreement":
        var req = {
          authorizationID:
            parseInt(localStorage.getItem("authorizationId")) -
            this._opencards.getHasKey(),
          IsEmail: false,
          IsExport: true,
          isVoid: false,
          viewOnly: 3,
          ReportType: "FCHPlacementAgreement",
          staffID: parseInt(localStorage.getItem("UserId")) || 4620,
        };
        this._opencards.savePrintHistory(req).then((data) => { });

        return window.open(
          `${environment.uri}:8081/loadDocument/${this._local.PlacementAgreementID}`,
          "popup",
          "width=600,height=600,toolbar=no,titlebar=no"
        );
        break;

      case "/placement-agreement-kinship-agency-approved":
        return window.open(
          `${environment.uri}:8081/loadDocument/${this._local.placementAgreementKinshipAndAgencyApprovedDocID}`,
          "popup",
          "width=600,height=600,toolbar=no,titlebar=no"
        );
        break;

      case "/placement-agreement-kinship-non-paid":
        return window.open(
          `${environment.uri}:8081/loadDocument/${this._local.placementAgreementKinshipDocID}`,
          "popup",
          "width=600,height=600,toolbar=no,titlebar=no"
        );
        break;

      case "/flow-chart":
        return window.open(
          `${environment.uri}:8081/loadDocument/${this._local.continuumofCareFlowChartDocID}`,
          "popup",
          "width=600,height=600,toolbar=no,titlebar=no"
        );
        break;

      case "/fax-list":
        return window.open(
          `${environment.uri}:8081/loadDocument/${this._local.faxListDOCID}`,
          "popup",
          "width=600,height=600,toolbar=no,titlebar=no"
        );
        break;

      case "/placement-referral-blank(print:print/placement-referral-blank)":
        // return { isPrintable: false, form: "placement-plan-blank" }
        break;

      case "/move-form":
        const move_form_element_pro = document.getElementById(
          "pdf-content-print"
        );
        const move_form_opt_pro = {
          margin: 1,
          filename: "Reintegration_foster_care_child_move_form",
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 1 },
          jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
          pagebreak: { mode: "avoid-all", before: "#page2el" },
        };
        html2pdf().from(move_form_element_pro).set(move_form_opt_pro).save();
        break;

      case "/move-form-with-disruption":
        const move_form_with_disruption_element_pro = document.getElementById(
          "pdf-content-print"
        );
        const move_form_with_disruption_opt_pro = {
          margin: 1,
          filename:
            "Reintegration_foster_care_child_move_form_with_distruption",
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 1 },
          jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
          pagebreak: { mode: "avoid-all", before: "#page2el" },
        };
        html2pdf()
          .from(move_form_with_disruption_element_pro)
          .set(move_form_with_disruption_opt_pro)
          .save();
        break;

      case "/placement-plan-blank":
      case "/placement-plan-draft":
        const placementPlanForm = document.getElementById("pdf-content-print");
        const placementPlanForm_opt_pro = {
          margin: 1,
          filename: "placement_form",
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 1 },
          jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
          pagebreak: { mode: "avoid-all", before: "#page2el" },
        };
        html2pdf()
          .from(placementPlanForm)
          .set(placementPlanForm_opt_pro)
          .save();
        break;

      case "/placement-referral-draft":
      case "/placement-referral-blank":
        this.ackFormStatus();
        break;

      default:
        return { isPrintable: true, form: "" };
    }
  }

  print() {
    setTimeout(() => {
      this.isSendEmail = false;
    }, 7000);
    if (this.isViewHistory) {
      this.printAck();
    } else if (this.isHardGoods) {
      window.open(
        `${environment.uri}:8081/loadDocument/${this.pdfDocID}`,
        "popup",
        "width=600,height=600,toolbar=no,titlebar=no"
      );
    } else {
      if (this.currentFormMode === "delete") {
        if (this.deleteForm === "placementAcknowledgement") {
          var req = {
            referralID:
              parseInt(localStorage.getItem("referralId")) -
              this._opencards.getHasKey(),
            authorizationID:
              parseInt(localStorage.getItem("authorizationId")) -
              this._opencards.getHasKey(),
            clientID:
              parseInt(localStorage.getItem("clientId")) -
              this._opencards.getHasKey(),
            IsEmail: false,
            IsExport: true,
            isVoid: false,
            viewOnly: 3,
            ReportType: "Acknowledgement (Void)",
            staffID: parseInt(localStorage.getItem("UserId")) || 4620,
          };

          // this._opencards.savePrintHistory(req).then((data) => { });
          if (this._router.url.includes("/placement-acknowledgment-return")) {
            return window.open(
              `${environment.uri}:8081/loadDocument/${this._local.referralNotificationOfMovePlacementChangeDocIDReturn}`,
              "popup",
              "width=600,height=600,toolbar=no,titlebar=no"
            );
          } else {
            return window.open(
              `${environment.uri}:8081/loadDocument/${this._local.referralNotificationOfMovePlacementChangeVoidDocID}`,
              "popup",
              "width=600,height=600,toolbar=no,titlebar=no"
            );
          }
        } else if (this.deleteForm === "placementPSA") {
          var reqPsa = {
            authorizationID:
              parseInt(localStorage.getItem("authorizationId")) -
              this._opencards.getHasKey(),
            IsEmail: false,
            IsExport: true,
            isVoid: false,
            viewOnly: 3,
            ReportType: "ProviderServiceAgreement (Void)",
            staffID: parseInt(localStorage.getItem("UserId")) || 4620,
          };

          // this._opencards.savePrintHistory(reqPsa).then((data) => { });
          return window.open(
            `${environment.uri}:8081/loadDocument/${this._local.providerServiceAgreementDocID}`,
            "popup",
            "width=600,height=600,toolbar=no,titlebar=no"
          );
        } else if (this.deleteForm === "placementEventStatus") {
          var reqPS = {
            authorizationID:
              parseInt(localStorage.getItem("authorizationId")) -
              this._opencards.getHasKey(),
            IsEmail: false,
            IsExport: true,
            isVoid: false,
            viewOnly: 3,
            ReportType: "PlacementStatus",
            staffID: parseInt(localStorage.getItem("UserId")) || 4620,
          };

          this._opencards.savePrintHistory(reqPS).then((data) => { });
          return window.open(
            `${environment.uri}:8081/loadDocument/${this._local.placementEventStatusVoid}`,
            "popup",
            "width=600,height=600,toolbar=no,titlebar=no"
          );
        } else if (this.deleteForm === "placementAgreement") {
          var reqPA = {
            authorizationID:
              parseInt(localStorage.getItem("authorizationId")) -
              this._opencards.getHasKey(),
            IsEmail: false,
            IsExport: true,
            isVoid: false,
            viewOnly: 3,
            ReportType: "FCHPlacementAgreement (Void)",
            staffID: parseInt(localStorage.getItem("UserId")) || 4620,
          };
          // this._opencards.savePrintHistory(reqPA).then((data) => { });
          return window.open(
            `${environment.uri}:8081/loadDocument/${this._local.placementAgrementVoid}`,
            "popup",
            "width=600,height=600,toolbar=no,titlebar=no"
          );
        }
      }
      if (
        this.module === "other-service-hard-goods" ||
        this.module === "other-service-claims"
      ) {
        this.getPSAAuthorizationDocID();
      } else {
        return this.checkPlacementReferralPrint();
      }
    }
  }

  async sendMail() {
    if (this.isViewHistory) {
      this.viewHistoryData.saveReq.IsEmail = true;
      this.viewHistoryData.saveReq.IsExport = false;
      this._opencards
        .savePrintHistory(this.viewHistoryData.saveReq)
        .then((data) => {
          this._opencards
            .printAckPDF(this.viewHistoryData.pdfReq)
            .then((dataPdf) => {
              var dataRE = {
                isStaff: this.placementEmailCheckBoxes.isstaff,
                isDCF: this.placementEmailCheckBoxes.isdcf,
                clientID:
                  parseInt(localStorage.getItem("clientId")) -
                  this._opencards.getHasKey(),
                staffID: parseInt(localStorage.getItem("UserId")) || 4620,
                Others: [this.otherMailAddress],
                pdfDocId: dataPdf.CMSPDFDoc.pdfDocID,
              };
              this._opencards
                .sendEmailPlacementPrintForms(dataRE)
                .then((dataEmail) => { });
            });
        });
    } else if (this.isHardGoods) {
      var req = {
        isStaff: this.placementEmailCheckBoxes.isstaff,
        isDCF: this.placementEmailCheckBoxes.isdcf,
        clientID:
          parseInt(localStorage.getItem("clientId")) -
          this._opencards.getHasKey(),
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
        Others: [this.otherMailAddress],
        pdfDocId: this.pdfDocID,
      };
      this._opencards.sendEmailPlacementPrintForms(req).then((dataEmail) => {
        swal("Sent", "The email has been sent", "info");
      });
    } else if (this._router.url.includes("/reintegration/referral/opencard/placement-referral/detail")) {
      var request = {
        documentID: "PlacementReferralBlank",
        referralID:
          parseInt(localStorage.getItem("referralId")) -
          this._opencards.getHasKey(),
        referralTypeID:
          parseInt(localStorage.getItem("referralTypeId")) -
          this._opencards.getHasKey(),
        isFlowChart: 0,
        placementDetailID: parseInt(localStorage.getItem("placementDetailId")),
        authorizationID:
          parseInt(localStorage.getItem("authorizationId")) -
          this._opencards.getHasKey(),
        isStaff: this.placementEmailCheckBoxes.isstaff,
        isDraft: false,
        isBlank: false,
      }
      this._opencards.sendMailPlacementReferral().then((dataEmail) => {
        swal("Sent", "The email has been sent", "info");
      });
    } else {
      this.emailPrintackForm();
      this.sendBlankFormsEmail();
    }
  }

  exitPage() {
    if (this.isHardGoods) {
      if (
        this._router.url === "/reintegration/referral/service/hardgoods/detail"
      ) {
        this._router.navigate(["/claims/list/hardgoods/list"]);
      } else {
        this._router.navigate(["/claims/list/other/service/list"]);
      }
    }
    if (this.isViewHistory) {
      this.closeAck_Window.emit(this.viewHistoryData.saveReq.ReportType);
    } else if (this.isMoveForm) {
      this._router.navigate([
        "/reintegration/referral/opencard/move-permanency/move-form/view",
      ]);
    } else {
      if (this.isPlacementDelete === "true") {
        if (this.deleteForm === "placementAcknowledgement") {
          return this.formStatus.emit({
            isPlacementAckForm: false,
            isPSAForm: true,
          });
        } else {
          return this.isPlacementPsaPrompt.emit({ formStauts: "close" });
        }
      } else if (this.isAnIndividualForm) {
        if ((this._router.url.includes("/placement-referral-draft")) || (this._router.url.includes("/placement-referral-blank"))) {
          this.navigateBasedOnUrls();
        } else {
        let redirectURL: string;
        switch (this.subModule) {
          case "placement-event":
            redirectURL =
              "/reintegration/referral/opencard/placement/placementEvent/detail";
            break;
          case "livingArrangement":
            redirectURL =
              "reintegration/referral/opencard/placement/living-arrangement/detail";
            break;
          case "hardgoods":
            redirectURL = "/claims/list/hardgoods/list";
            break;
          case "other-service":
            redirectURL = "/claims/list/other/service/list";
            break;
        }
        return this._router.navigate([redirectURL], {
          queryParams: { isIndiviual: false },
          queryParamsHandling: "merge",
        });
      }
      } else {
        this.navigateBasedOnUrls();
      }
    }
  }

  async navigateBasedOnUrls() {
    let navigateTo: any,
      currentURL: string,
      routerParams = {};
    console.log("Module", this.module, this.currentFormMode);
    const currentReferralTypeId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._opencards.getHasKey();
    /**Placement main node */
    if (this.module === "placement" || this.subModule === "placementEvent") {
      currentURL = this._router.url.includes("?")
        ? this._router.url.split("?")[0]
        : this._router.url;
      if (currentReferralTypeId !== 4) {
        switch (currentURL) {
          case "/placement-acknowledgment":
            navigateTo = "/placement-psa";
            break;
          case "/placement-psa":
            navigateTo = "/placement-event-status";
            break;
          case "/placement-event-status":
            // Checking the elec sign forms
            let response = await this.checkingPlacementAgreementPreviewForms();
            // For placement agreement forms
            if (response.isShowPlacementForms) {
              navigateTo = "/placement-agreement";
              routerParams = {
                isFosterCareHomePlacement: response.isFosterCareHomePlacement,
                isElecSign: response.isElecSign,
              };
            }
            // For foster care placement agreement forms
            else if (response.isFosterCareHomePlacement) {
              navigateTo = "/placement-agreement";
              routerParams = {
                isFosterCareHomePlacement: response.isFosterCareHomePlacement,
                isElecSign: response.isElecSign,
              };
            }
            // For no placement forms
            else {
              navigateTo = "/flow-chart";
            }
            break;
          case "/placement-agreement":
            navigateTo = "/flow-chart";
            break;
          case "/placement-agreement-kinship-agency-approved":
            navigateTo = "/placement-agreement-kinship-non-paid";
            break;
          case "/placement-agreement-kinship-non-paid":
            navigateTo = "/flow-chart";
            break;
          case "/flow-chart":
            navigateTo = "/fax-list";
            break;
          // case '/provider-envelope':
          //   navigateTo = '/fax-list';
          //   break;
          case "/fax-list":
            if (this.subModule === "placementEvent") {
              navigateTo =
                "/reintegration/referral/opencard/placement/placementEvent/view";
            } else {
              navigateTo = "/reintegration/referral/opencard/placement/view";
            }
            break;
        }
      } else {
        switch (currentURL) {
          case "/placement-event-status":
            // Checking the elec sign forms
            let response = await this.checkingPlacementAgreementPreviewForms();
            // For placement agreement forms
            if (response.isShowPlacementForms) {
              navigateTo = "/placement-agreement";
              routerParams = {
                isFosterCareHomePlacement: response.isFosterCareHomePlacement,
                isElecSign: response.isElecSign,
              };
            }
            // For foster care placement agreement forms
            else if (response.isFosterCareHomePlacement) {
              navigateTo = "/placement-agreement";
              routerParams = {
                isFosterCareHomePlacement: response.isFosterCareHomePlacement,
                isElecSign: response.isElecSign,
              };
            }
            // For no placement forms
            else {
              navigateTo = "/flow-chart";
            }
            break;
          case "/placement-agreement":
            if (this.subModule === "placementEvent") {
              navigateTo =
                "/reintegration/referral/opencard/placement/placementEvent/view";
            } else {
              navigateTo = "/reintegration/referral/opencard/placement/view";
            }
            break;
        }
      }
    }
    /**Living arrangements */
    if (
      this.module === "livingArrangement" ||
      this.module === "livingArrangment" ||
      this.subModule === "livingArrangement"
    ) {
      currentURL = this._router.url.includes("?")
        ? this._router.url.split("?")[0]
        : this._router.url;
      switch (currentURL) {
        case "/placement-acknowledgment":
          navigateTo = "/placement-ack";
          break;
        case "/placement-ack":
          navigateTo = "/placement-acknowledgment-return";
          break;
        case "/placement-acknowledgment-return":
          navigateTo = "/placement-psa";
          break;
        case "/placement-psa":
          // Checking the elec sign forms
          let response = await this.checkingPlacementAgreementPreviewForms();
          // For placement agreement forms
          if (response.isShowPlacementForms) {
            navigateTo = "/placement-agreement";
            routerParams = {
              isFosterCareHomePlacement: response.isFosterCareHomePlacement,
              isElecSign: response.isElecSign,
            };
          }
          // For foster care placement agreement forms
          else if (response.isFosterCareHomePlacement) {
            navigateTo = "/placement-agreement";
            routerParams = {
              isFosterCareHomePlacement: response.isFosterCareHomePlacement,
              isElecSign: response.isElecSign,
            };
          }
          // For no placement forms
          else {
            navigateTo =
              "/reintegration/referral/opencard/placement/living-arrangement/view";
          }
          break;
        case "/placement-agreement":
          return this._router.navigate(
            [
              "/reintegration/referral/opencard/placement/living-arrangement/view",
            ],
            { queryParamsHandling: "preserve" }
          );
          break;

        //     this.placementAckModule = 'livingArrangment';
        //     if (this._local.placementLivingArragmentFlowFlag === 'A') {
        //       this._local.placementLivingArragmentFlowFlag = 'A1';
        //       return this.isPlacementAckWindow = true;
        //     } else {
        //       this._local.placementLivingArragmentFlowFlag = undefined;
        //       this._local.referralNotificationOfMovePlacementChangeDocID = this._local.referralNotificationOfMovePlacementChangeDocIDReturn;
        //       return this._router.navigate(['/reintegration/referral/opencard/placement/living-arrangement/view'],
        //         { queryParamsHandling: 'preserve' });
        //     }
        //     break;
      }
      if (
        this.currentFormMode == "create" ||
        this.currentFormMode == "edit" ||
        this.currentFormMode == "delete"
      ) {
        currentURL = this._router.url.includes("?")
          ? this._router.url.split("?")[0]
          : this._router.url;
        switch (currentURL) {
          case "/placement-acknowledgment":
            navigateTo = "/placement-ack";
            break;
          case "/placement-ack":
            navigateTo = "/placement-acknowledgment-return";
            break;
          case "/placement-acknowledgment-return":
            navigateTo = "/placement-psa";
            break;
          case "/placement-psa":
            // Checking the elec sign forms
            let response = await this.checkingPlacementAgreementPreviewForms();
            // For placement agreement forms
            if (response.isShowPlacementForms) {
              navigateTo = "/placement-agreement";
              routerParams = {
                isFosterCareHomePlacement: response.isFosterCareHomePlacement,
                isElecSign: response.isElecSign,
              };
            }
            // For foster care placement agreement forms
            else if (response.isFosterCareHomePlacement) {
              navigateTo = "/placement-agreement";
              routerParams = {
                isFosterCareHomePlacement: response.isFosterCareHomePlacement,
                isElecSign: response.isElecSign,
              };
            }
            // For no placement forms
            else {
              navigateTo =
                "/reintegration/referral/opencard/placement/living-arrangement/view";
            }
            break;
          case "/placement-agreement":
            return this._router.navigate(
              [
                "/reintegration/referral/opencard/placement/living-arrangement/view",
              ],
              { queryParamsHandling: "preserve" }
            );
            break;
        }
      }
      // if (this.currentFormMode == "delete") {
      //   currentURL = this._router.url.includes("?")
      //     ? this._router.url.split("?")[0]
      //     : this._router.url;
      //   switch (currentURL) {
      //     case "/placement-acknowledgment":
      //       navigateTo = "/placement-psa";
      //       break;
      //     // case '/placement-psa':
      //     //   navigateTo = '/provider-envelope';
      //     //   break;
      //     case "/placement-psa":
      //       navigateTo =
      //         "/reintegration/referral/opencard/placement/living-arrangement/detail";
      //       swal("Info", "Number of records affected by delete: 1", "info");
      //       break;
      //   }
      // }

      /** Authorization */
      if (this.subModule == "authorization") {
        currentURL = this._router.url.includes("?")
          ? this._router.url.split("?")[0]
          : this._router.url;
        switch (currentURL) {
          case "/placement-psa":
            navigateTo =
              "/reintegration/referral/placement-authorizations/list";
            break;
          // case '/provider-envelope':
          //   navigateTo = '/reintegration/referral/placement-authorizations/list';
          //   break;
        }
      }
    }
    /**Daycare authorization */
    if (this.subModule === "dayCareAuthorization") {
      currentURL = this._router.url.includes("?")
        ? this._router.url.split("?")[0]
        : this._router.url;
      if (this.currentFormMode == "delete") {
        switch (currentURL) {
          case "/placement-psa":
            navigateTo =
              "/reintegration/referral/opencard/placement/living-arrangement/detail";
            swal("Info", "Number of records affected by delete: 1", "info");
            break;
          // case '/provider-envelope':
          //   navigateTo = '/reintegration/referral/opencard/placement/living-arrangement/detail';
          //   swal('Info', 'Number of records affected by delete: 1', 'info');
          //   break;
        }
      }

      if (this.currentFormMode == "create") {
        currentURL = this._router.url.includes("?")
          ? this._router.url.split("?")[0]
          : this._router.url;
        switch (currentURL) {
          case "/placement-psa":
            navigateTo = "/view-history";
            break;
          // case '/provider-envelope':
          //   navigateTo = '/view-history';
          //   break;
          default:
            navigateTo =
              "/reintegration/referral/opencard/placement/daycare-authorization/view";
        }
      }
    }

    if (this.module === "other-service-claims") {
      return this._router.navigate(["/claims/list/other/service/list"]);
    }

    if (this.module === "other-service-hard-goods") {
      return this._router.navigate(["/claims/list/hardgoods/list"]);
    }

    /**Move forms */

    if (this.module === "move-form") {
      currentURL = this._router.url.includes("?")
        ? this._router.url.split("?")[0]
        : this._router.url;
      if (
        this.currentFormMode === "create" ||
        this.currentFormMode === "edit"
      ) {
        switch (currentURL) {
          case "/move-form":
            navigateTo = "/move-form-with-disruption";
            break;
          case "/move-form-with-disruption":
            navigateTo =
              "/reintegration/referral/opencard/move-permanency/move-form/view";
            break;
          default:
            navigateTo =
              "/reintegration/referral/opencard/move-permanency/move-form/view";
        }
      }
    }

    /**Placement event */
    if (
      this.subModule === "placementEvent" ||
      this.subModule === "placement-event"
    ) {
      if (this.currentFormMode == "create" || this.currentFormMode == "edit") {
        currentURL = this._router.url.includes("?")
          ? this._router.url.split("?")[0]
          : this._router.url;
        switch (currentURL) {
          case "/reintegration/referral/opencard/placement/placementEvent/detail":
            navigateTo = "/placement-acknowledgment";
            break;
          case "/placement-acknowledgment":
            navigateTo = "/placement-psa";
            break;
          case "/placement-psa":
            navigateTo = "/placement-event-status";
            break;
          case "/placement-event-status":
            navigateTo = "/placement-agreement";
            break;
          case "/placement-agreement":
            navigateTo = "/flow-chart";
            break;
          case "/placement-agreement-kinship-agency-approved":
            navigateTo = "/placement-agreement-kinship-non-paid";
            break;
          case "/placement-agreement-kinship-non-paid":
            navigateTo = "/flow-chart";
            break;
          case "/flow-chart":
            navigateTo = "/fax-list";
            break;
          // case '/provider-envelope':
          //   navigateTo = '/fax-list';
          //   break;
          case "/fax-list":
            navigateTo =
              "/reintegration/referral/opencard/placement/placementEvent/view";
            break;
          case "/view-history":
            navigateTo =
              "/reintegration/referral/opencard/placement/placementEvent/view";
            break;
        }
        if (currentReferralTypeId !== 4) {
          switch (currentURL) {
            case "/placement-acknowledgment":
              navigateTo = "/placement-psa";
              break;
            case "/placement-psa":
              navigateTo = "/placement-event-status";
              break;
            case "/placement-event-status":
              // Checking the elec sign forms
              let response = await this.checkingPlacementAgreementPreviewForms();
              // For placement agreement forms
              if (response.isShowPlacementForms) {
                navigateTo = "/placement-agreement";
                routerParams = {
                  isFosterCareHomePlacement: response.isFosterCareHomePlacement,
                  isElecSign: response.isElecSign,
                };
              }
              // For foster care placement agreement forms
              else if (response.isFosterCareHomePlacement) {
                navigateTo = "/placement-agreement";
                routerParams = {
                  isFosterCareHomePlacement: response.isFosterCareHomePlacement,
                  isElecSign: response.isElecSign,
                };
              }
              // For no placement forms
              else {
                navigateTo = "/flow-chart";
              }
              break;
            case "/placement-agreement":
              navigateTo = "/flow-chart";
              break;
            case "/placement-agreement-kinship-agency-approved":
              navigateTo = "/placement-agreement-kinship-non-paid";
              break;
            case "/placement-agreement-kinship-non-paid":
              navigateTo = "/flow-chart";
              break;
            case "/flow-chart":
              navigateTo = "/fax-list";
              break;
            // case '/provider-envelope':
            //   navigateTo = '/fax-list';
            //   break;
            case "/fax-list":
              if (this.subModule === "placementEvent") {
                navigateTo =
                  "/reintegration/referral/opencard/placement/placementEvent/view";
              } else {
                navigateTo = "/reintegration/referral/opencard/placement/view";
              }
              break;
          }
        } else {
          switch (currentURL) {
            case "/placement-event-status":
              // Checking the elec sign forms
              let response = await this.checkingPlacementAgreementPreviewForms();
              // For placement agreement forms
              if (response.isShowPlacementForms) {
                navigateTo = "/placement-agreement";
                routerParams = {
                  isFosterCareHomePlacement: response.isFosterCareHomePlacement,
                  isElecSign: response.isElecSign,
                };
              }
              // For foster care placement agreement forms
              else if (response.isFosterCareHomePlacement) {
                navigateTo = "/placement-agreement";
                routerParams = {
                  isFosterCareHomePlacement: response.isFosterCareHomePlacement,
                  isElecSign: response.isElecSign,
                };
              }
              // For no placement forms
              else {
                navigateTo = "/flow-chart";
              }
              break;
            case "/placement-agreement":
              if (this.subModule === "placementEvent") {
                navigateTo =
                  "/reintegration/referral/opencard/placement/placementEvent/view";
              } else {
                navigateTo = "/reintegration/referral/opencard/placement/view";
              }
              break;
          }
        }
      }
      if (this.module === "authorization") {
        currentURL = this._router.url.includes("?")
          ? this._router.url.split("?")[0]
          : this._router.url;
        switch (currentURL) {
          case "/placement-psa":
            navigateTo =
              "/reintegration/referral/placement-event-authorizations/list";
            break;
          // case '/provider-envelope':
          //   navigateTo = '/reintegration/referral/placement-event-authorizations/list';
          //   break;
        }
      }
    }
    /**Placement plan */
    if (
      this.currentURL.includes("/placement-plan-blank") ||
      this.currentURL.includes("/placement-plan-draft")
    ) {
      navigateTo =
        "/reintegration/referral/opencard/placement/placementPlan/view";
    }

    /**Placement referral */
    if (
      this.currentURL.includes("/placement-referral-draft") ||
      this.currentURL.includes("/placement-referral-blank")
    ) {
      navigateTo = "/reintegration/referral/opencard/placement-referral/detail";
    }

    if (this.module === "authorization") {
      if (this.subModule === "placement-event") {
        navigateTo =
          "/reintegration/referral/placement-event-authorizations/list";
      }
    }
    if (this.currentURL === "/flow-chart") {
      return this._router.navigate(
        ["/reintegration/referral/opencard/placement/placementEvent/detail"],
        {
          queryParams: { isIndiviual: false },
          queryParamsHandling: "merge",
        }
      );
    } else {
      if (
        this._activatedRoute.snapshot.queryParamMap.get("origin") &&
        this._activatedRoute.snapshot.queryParamMap.get("origin") === "cards"
      ) {
        navigateTo = "reports/all/authorizations";
      }
      return this._router.navigate([navigateTo], {
        queryParams: routerParams,
        queryParamsHandling: "merge",
      });
    }
  }

  updateHistoryData(dataMode): any {
    switch (this.currentForm) {
      case "ACKNOWLEDGEMENT":
        dataMode === "mail"
          ? (this._placementPrint.printHistoryData.ACKNOWLEDGEMENT.isEmailed = true)
          : (this._placementPrint.printHistoryData.ACKNOWLEDGEMENT.isPrinted = true);
        dataMode === "mail"
          ? (this._placementPrint.printHistoryData.ACKNOWLEDGEMENT.emailedDate = moment
            .utc(new Date())
            .format("MM/DD/YYYY HH:mm"))
          : (this._placementPrint.printHistoryData.ACKNOWLEDGEMENT.printedDate = moment
            .utc(new Date())
            .format("MM/DD/YYYY HH:mm"));
        dataMode === "mail"
          ? (this._placementPrint.printHistoryData.ACKNOWLEDGEMENT.emailedAddress = this.otherMailAddress)
          : null;

        break;

      case "AGREEMENT":
        dataMode === "mail"
          ? (this._placementPrint.printHistoryData.AGREEMENT.isEmailed = true)
          : (this._placementPrint.printHistoryData.AGREEMENT.isPrinted = true);
        dataMode === "mail"
          ? (this._placementPrint.printHistoryData.AGREEMENT.emailedDate = moment
            .utc(new Date())
            .format("MM/DD/YYYY HH:mm"))
          : (this._placementPrint.printHistoryData.AGREEMENT.printedDate = moment
            .utc(new Date())
            .format("MM/DD/YYYY HH:mm"));
        dataMode === "mail"
          ? (this._placementPrint.printHistoryData.AGREEMENT.emailedAddress = this.otherMailAddress)
          : null;

        break;

      case "EVENT_STATUS":
        dataMode === "mail"
          ? (this._placementPrint.printHistoryData.PLACEMENT_STATUS.isEmailed = true)
          : (this._placementPrint.printHistoryData.PLACEMENT_STATUS.isPrinted = true);
        dataMode === "mail"
          ? (this._placementPrint.printHistoryData.PLACEMENT_STATUS.emailedDate = moment
            .utc(new Date())
            .format("MM/DD/YYYY HH:mm"))
          : (this._placementPrint.printHistoryData.PLACEMENT_STATUS.printedDate = moment
            .utc(new Date())
            .format("MM/DD/YYYY HH:mm"));
        dataMode === "mail"
          ? (this._placementPrint.printHistoryData.PLACEMENT_STATUS.emailedAddress = this.otherMailAddress)
          : null;

        break;

      case "PSA":
        dataMode === "mail"
          ? (this._placementPrint.printHistoryData.PROVIDER_SERVICE_AGREEMENT.isEmailed = true)
          : (this._placementPrint.printHistoryData.PROVIDER_SERVICE_AGREEMENT.isPrinted = true);
        dataMode === "mail"
          ? (this._placementPrint.printHistoryData.PROVIDER_SERVICE_AGREEMENT.emailedDate = moment
            .utc(new Date())
            .format("MM/DD/YYYY HH:mm"))
          : (this._placementPrint.printHistoryData.PROVIDER_SERVICE_AGREEMENT.printedDate = moment
            .utc(new Date())
            .format("MM/DD/YYYY HH:mm"));
        dataMode === "mail"
          ? (this._placementPrint.printHistoryData.PROVIDER_SERVICE_AGREEMENT.emailedAddress = this.otherMailAddress)
          : null;

        break;
    }
  }

  /** Navigation for return button menu items */
  menuItemsNavigations(url: string) {
    return this._router.navigate([url], { queryParamsHandling: "preserve" });
  }

  async savePrintackForm() {
    const currentURL = this._router.url.includes("?")
      ? this._router.url.split("?")[0]
      : this._router.url;
    if (currentURL == "/placement-acknowledgment") {
      this.savePlacementAcKOptions();
      const printId = await this.savePlacementAcKOptions();
      return this.savePrintAckPrintHistory("PRINTED", printId);
    } else if (currentURL == "/placement-psa") {
      const printId = await this.saveProviderServiceAgreement();
      return this.savePrintAckPrintHistory("PRINTED", printId);
    } else if (currentURL == "/placement-event-status") {
      this.savePlacementEventFormStatus();
      return this.savePrintAckPrintHistory("PRINTED");
    } else if (currentURL == "/placement-agreement") {
      this.savePlacementAgreement();
      return this.savePrintAckPrintHistory("PRINTED");
    } else if (currentURL == "/flow-chart") {
      this.savePlacementFlowChart();
      return this.savePrintAckPrintHistory("PRINTED");
    } else if (currentURL == "/fax-list") {
      this.savePlacementFaxListAck();
      return this.savePrintAckPrintHistory("PRINTED");
    } else {
      return;
    }
  }

  ackFormStatus() {
    this.printurl = this._local.printurl;
    setTimeout(() => {
      window.open(this.printurl);
    }, 2000);
  }

  async emailPrintackForm() {
    const currentURL = this._router.url.includes("?")
      ? this._router.url.split("?")[0]
      : this._router.url;
    this.isPlacementEmailConfiguration = false;
    this.isSendEmail = true;
    if (currentURL == "/placement-acknowledgment") {
      await this.psPDFKitFormsInEmail();
      return (this.isSendEmail = false);
    } else if (currentURL == "/placement-psa") {
      await this.psPDFKitFormsInEmail();
      return (this.isSendEmail = false);
    } else if (currentURL == "/placement-event-status") {
      await this.psPDFKitFormsInEmail();
      return (this.isSendEmail = false);
    } else if (currentURL == "/placement-agreement") {
      await this.psPDFKitFormsInEmail();
      return (this.isSendEmail = false);
    } else if (currentURL == "/flow-chart") {
      this.isPlacementEmailConfiguration = true;
      return (this.isSendEmail = false);
    } else if (currentURL == "/fax-list") {
      await this.psPDFKitFormsInEmail();
      return (this.isSendEmail = false);
    } else if (currentURL == "/placement-acknowledgment-return") {
      await this.psPDFKitFormsInEmail();
      return (this.isSendEmail = false);
    } else if (
      currentURL == "/reintegration/referral/opencard/placement/detail"
    ) {
      await this.psPDFKitFormsInEmail();
      return (this.isSendEmail = false);
    } else {
      return (this.isPlacementEmailConfiguration = false);
    }
  }

  async savePlacementAcKOptions() {
    const section_1 = this.placementAckformData.section1;
    const section_2 = this.placementAckformData.section2;
    const section_3 = this.placementAckformData.section3;
    const section_4 = this.placementAckformData.section4;
    const section_5 = this.placementAckformData.section5;
    const section_6 = this.placementAckformData.section6;
    delete this.placementAckformData.section1;
    delete this.placementAckformData.section2;
    delete this.placementAckformData.section3;
    delete this.placementAckformData.section4;
    delete this.placementAckformData.section5;
    delete this.placementAckformData.section6;
    delete this.placementAckformData.responseStatus;
    const request = Object.assign(
      {},
      this.placementAckformData,
      section_1,
      section_2,
      section_3,
      section_4,
      section_5,
      section_6
    );
    console.log("Placement save ack request", request);
    const response: any = await this._opencards.savePrintAckOptions(request);
    return response.printAckListList[0].PrintProviderServiceAgreementID;
  }

  async saveProviderServiceAgreement() {
    const request = this.placementServiceAgreementFormData;
    console.log("Placement service agreement ack request", request);
    const response: any = await this._opencards.savePrintAckProviderServiceAgreement(
      request
    );
    console.log("save provider service agreement", response);
    return response.providerServiceAgreementList[0]
      .PrintProviderServiceAgreementID;
  }

  async savePlacementEventFormStatus() {
    const request = this.placementEventStatusFormData;
    console.log("Placement event status ack request", request);
  }

  async savePlacementAgreement() {
    const request = this.placementAgreementFormData;
    console.log("Placement agreement ack request", request);
    const response = await this._opencards.savePrintAckPlacementAgreement(
      request
    );
    console.log("save placement agreement", response);
  }

  async savePlacementFlowChart() {
    const request = this.placementFlowChartData;
    console.log("Placement flowchart ack request", request);
  }

  async savePlacementFaxListAck() {
    const request = this.placementFaxListAckData;
    console.log("Placement faxlist ack request", request);
  }

  async savePrintAckPrintHistory(action: string, printId?: number) {
    const request = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencards.getHasKey(),
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencards.getHasKey(),
      clientID:
        parseInt(localStorage.getItem("clientId")) -
        this._opencards.getHasKey(),
      providerID:
        parseInt(localStorage.getItem("providerID")) -
        this._opencards.getHasKey(),
      authorizationID:
        parseInt(localStorage.getItem("authorizationId")) -
        this._opencards.getHasKey(),
      placementReferralID: null,
      placementPlanID: null,
      placementDetailID: this.currentPlacementDetailId,
      phaseID: null,
      pwsClientID: null,
      releasedFromSRSCustodyClientID: null,
      caseActivityID: null,
      providerContactID: null,
      printAcknowledgementID: !isNullOrUndefined(printId) ? printId : null,
      printProviderServiceAgreementID: null,
      printPlacementReferralID: null,
      printPlacementPlanID: null,
      printFCHPlacementAgreementID: null,
      printOOHReferralID: null,
      printFCHFlowChartID: null,
      printCaseActivityID: null,
      printProviderContactID: null,
      printNoticeOfChildsLocationID: null,
      elecSignPlacementAgreementID: null,
      reportType: "Acknowledgement",
      exported: 0,
      emailedSRS: null,
      emailedDHS: null,
      history: "",
      pdf: null,
      // enteredBy: string;
    };
    const loginStaff = !isNullOrUndefined(localStorage.getItem("UserEmail"))
      ? localStorage.getItem("UserEmail").split("@")[0].replace(".", " ")
      : null;
    const history = `${action} on ${moment().format(
      "MM/DD/YYYY hh:mm:ss A"
    )} by ${loginStaff} \n
    -----------------------------------------------------------------------------\n`;
    request.history = history;
    console.log("SAVE PRINT HISTORY", request);
    const response = await this._opencards.savePrintHistory(request);
    console.log("SAVE PRINT HISTORY RESPONSE", response);
  }

  async getPSAAuthorizationDocID() {
    const request = {
      form: "ProviderServiceAgreement",
      staffID: parseInt(localStorage.getItem("UserId")) || 4620,
      authorizationID:
        parseInt(localStorage.getItem("authorizationId")) -
        this._opencards.getHasKey(),
    };
    const response = await this._opencards.providerServiceAgreementExport(
      request
    );
    this._local.providerServiceAgreementDocID = response;
    return window.open(
      `${environment.uri}:8081/loadDocument/${this._local.providerServiceAgreementDocID}`,
      "popup",
      "width=600,height=600,toolbar=no,titlebar=no"
    );
  }

  async checkingPlacementAgreementPreviewForms() {
    let authorizationID = null;
    if (
      this._router.url.includes("placementEvent") ||
      this.subModule === "placement-event"
    ) {
      authorizationID =
        parseInt(localStorage.getItem("placementAuthorizationID")) -
        this._opencards.getHasKey();
    } else {
      authorizationID =
        parseInt(localStorage.getItem("authorizationId")) -
        this._opencards.getHasKey();
    }
    if (!this.isAuthorization) {
      // The placement/placement event does not have authorization
      return {
        isShowPlacementForms: false,
        isFosterCareHomePlacement: false,
        isElecSign: false,
      };
    } else {
      let request = {
        authorizationID: authorizationID,
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
      };
      //   let request = { authorizationID: 2001111, staffID: 14785 };
      let response = await this._opencards.getPlacementAgreementFormPreview(
        request
      );
      if (
        Object.keys(response.elecSignInfo).length !== 0 &&
        Object.keys(response.placementAgreementText).length !== 0
      ) {
        // checking the object empty or not
        if (response.elecSignInfo.ElecSign) {
          // checking the elecSingKey true or false {
          if (
            response.elecSignInfo.ReportName === "mrptPlacementAgreement.rdlc"
          ) {
            // Need to show the placement agreement form
            return {
              isShowPlacementForms: true,
              isFosterCareHomePlacement: false,
              isElecSign: true,
            };
          } else if (
            response.elecSignInfo.ReportName ===
            "mrptPlacementAgreement_20120901.rdlc"
          ) {
            // Need to show the foster care home placement agreement form
            return {
              isShowPlacementForms: false,
              isFosterCareHomePlacement: true,
              isElecSign: true,
            };
          } else {
            // Return if not in the case
            return;
          }
        } else {
          // if elecSignKey flase
          return {
            isShowPlacementForms: true,
            isFosterCareHomePlacement: false,
            isElecSign: false,
          };
        }
      } else {
        // if response.elecSinInfo is empty
        return {
          isShowPlacementForms: false,
          isFosterCareHomePlacement: false,
          isElecSign: false,
        };
      }
    }
  }

  async setEmailRecipientsCheck() {
    let isFlowChart = false;
    this.flowChartEmailRecipients = "";
    if (this._router.url.includes("flow-chart")) {
      isFlowChart = true;
    } else {
      isFlowChart = false;
    }
    let request = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencards.getHasKey(),
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencards.getHasKey(),
      placementDetailID:
        parseInt(localStorage.getItem("placementDetailId")) || null,
      isFlowChart: isFlowChart,
    };
    let response = await this._opencards.getEmailRequest(request);
    this.placementEmailCheckBoxes.isstaff = response.isstaff;
    this.placementEmailCheckBoxes.iscaseteam = response.iscaseteam;
    this.placementEmailCheckBoxes.isdcf = response.isstaff;
    this.flowChartEmailRecipients =
      response.fchEmailRecipient.length > 0
        ? response.fchEmailRecipient.join("")
        : "";
  }

  public async onClickFlowChartEmailConfirmation() {
    await this.psPDFKitFormsInEmail();
    this.isPlacementEmailConfiguration = false;
  }

  public sendBlankFormsEmail() {
    if (
      this._router.url.includes("placement-referral-blank") ||
      this._router.url.includes("placement-referral-draft") ||
      this._router.url.includes("placement-plan-blank") ||
      this._router.url.includes("placement-plan-draft") ||
      this._router.url.includes("move-form-with-disruption") ||
      this._router.url.includes("move-form")
    ) {
      const element_pro = document.getElementById("pdf-content-print");
      const opt_pro = {
        margin: 1,
        filename: "PlacementForm",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
        pagebreak: { mode: "avoid-all", before: "#page2el" },
      };
      const pdf = html2pdf().from(element_pro).set(opt_pro).output("blob");
      this.emailSubject = "Placement";

      return pdf.then((data: any) => {
        const mailFormData: FormData = new FormData();
        mailFormData.append("uploadfile", data);

        const emailKeys = {
          subject: this.emailSubject,
          content: this.mailContentMessage,
          staffID: parseInt(localStorage.getItem("UserId")) || 4620,
          clientID:
            parseInt(localStorage.getItem("clientId")) -
            this._opencards.getHasKey(),
          cc: "",
          bcc: "",
          fileName: `${this.emailSubject}.pdf`,
          otheremailaddress: this.otherMailAddress
            ? this.otherMailAddress
            : null,
        };
        const emailJson = Object.assign(
          {},
          emailKeys,
          this.placementEmailCheckBoxes
        );
        mailFormData.append("emailJson", JSON.stringify(emailJson));
        if (this.mailContentMessage) {
          return this._placement.sendEmail(mailFormData).then((data) => {
            Swal.fire("Sent!", "Your message has been sent.", "success");
          });
        } else {
          return swal("Mail Info!", "Kindly give the mail content", "info");
        }
      });
    }
  }

  public async psPDFKitFormsInEmail() {
    const request = {
      pdfDocId: null,
      isStaff: this.placementEmailCheckBoxes.isstaff,
      isDCF: this.placementEmailCheckBoxes.isdcf,
      clientID:
        parseInt(localStorage.getItem("clientId")) -
        this._opencards.getHasKey(),
      staffID: parseInt(localStorage.getItem("UserId")) || 4620,
      Others: !isNullOrUndefined(this.otherMailAddress)
        ? [this.otherMailAddress]
        : null,
    };
    if (this.deleteForm === "placementAcknowledgement") {
      request.pdfDocId = this._local.referralNotificationOfMovePlacementChangeVoidDocID;
    } else if (this.deleteForm === "placementPSA") {
      request.pdfDocId = this._local.providerServiceAgreementDocID;
    }
    const currentURL = this._router.url.includes("?")
      ? this._router.url.split("?")[0]
      : this._router.url;

    switch (currentURL) {
      case "/placement-acknowledgment":
        request.pdfDocId = this._local.referralNotificationOfMovePlacementChangeDocID;
        break;
      case "/placement-acknowledgment-return":
        request.pdfDocId = this._local.referralNotificationOfMovePlacementChangeDocIDReturn;
        break;
      case "/placement-psa":
        request.pdfDocId = this._local.providerServiceAgreementDocID;
        break;
      case "/placement-event-status":
        request.pdfDocId = this._local.placementEventStatusDocID;
        break;

      case "/placement-agreement":
        request.pdfDocId = this._local.PlacementAgreementID;
        break;

      case "/placement-agreement-kinship-agency-approved":
        request.pdfDocId = this._local.placementAgreementKinshipAndAgencyApprovedDocID;
        break;

      case "/placement-agreement-kinship-non-paid":
        request.pdfDocId = this._local.placementAgreementKinshipDocID;
        break;

      case "/flow-chart":
        request.pdfDocId = this._local.continuumofCareFlowChartDocID;
        break;

      case "/placement-referral-blank(print:print/placement-referral-blank)":
        // return { isPrintable: false, form: "placement-plan-blank" }
        break;

      case "/move-form":
        const move_form_element_pro = document.getElementById(
          "pdf-content-print"
        );
        const move_form_opt_pro = {
          margin: 1,
          filename: "Reintegration Foster Care Home Child Move Form",
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 1 },
          jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
          pagebreak: { mode: "avoid-all", before: "#page2el" },
        };
        const move_form_pdf = html2pdf()
          .from(move_form_element_pro)
          .set(move_form_opt_pro)
          .output("blob");
        return move_form_pdf.then((data: any) => {
          const mailFormData: FormData = new FormData();
          mailFormData.append("uploadfile", data);

          const emailKeys = {
            subject: this.emailSubject,
            content: this.mailContentMessage,
            staffID: parseInt(localStorage.getItem("UserId")),
            clientID:
              parseInt(localStorage.getItem("clientId")) -
              this._opencards.getHasKey(),
            cc: [],
            bcc: [],
            fileName: `${this.emailSubject}.pdf`,
            otheremailaddress: !isNullOrUndefined(this.otherMailAddress)
              ? this.otherMailAddress
              : null,
          };

          const move_form_emailJson = Object.assign(
            {},
            emailKeys,
            this.placementEmailCheckBoxes
          );
          mailFormData.append("emailJson", JSON.stringify(move_form_emailJson));
          if (this.mailContentMessage) {
            this._placement.sendEmail(mailFormData).then((data) => {
              Swal.fire("Sent!", "Your message has been sent.", "success");
            });
            this.navigateBasedOnUrls();
          } else {
            swal("Mail Info!", "Kindly give the mail content", "info");
          }
        });
        break;

      case "/move-form-with-disruption":
        const move_form_with_disruption_element_pro = document.getElementById(
          "pdf-content-print"
        );
        const move_form_with_disruption_opt_pro = {
          margin: 1,
          filename: "Child Move Form",
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 1 },
          jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
          pagebreak: { mode: "avoid-all", before: "#page2el" },
        };
        const move_form_with_disruption_pdf = html2pdf()
          .from(move_form_with_disruption_element_pro)
          .set(move_form_with_disruption_opt_pro)
          .output("blob");
        return move_form_with_disruption_pdf.then((data: any) => {
          const mailFormData: FormData = new FormData();
          mailFormData.append("uploadfile", data);

          const emailKeys = {
            subject: this.emailSubject,
            content: this.mailContentMessage,
            staffID: parseInt(localStorage.getItem("UserId")),
            clientID:
              parseInt(localStorage.getItem("clientId")) -
              this._opencards.getHasKey(),
            cc: [],
            bcc: [],
            fileName: `${this.emailSubject}.pdf`,
            otheremailaddress: !isNullOrUndefined(this.otherMailAddress)
              ? this.otherMailAddress
              : null,
          };

          const move_form_emailJson = Object.assign(
            {},
            emailKeys,
            this.placementEmailCheckBoxes
          );
          mailFormData.append("emailJson", JSON.stringify(move_form_emailJson));
          if (this.mailContentMessage) {
            this._placement.sendEmail(mailFormData).then((data) => {
              Swal.fire("Sent!", "Your message has been sent.", "success");
            });
            this.navigateBasedOnUrls();
          } else {
            swal("Mail Info!", "Kindly give the mail content", "info");
          }
        });
        break;
    }
    const response = await this._opencards.sendEmailPlacementPrintForms(
      request
    );
    return response.responseStatus
      ? swal("Sent", "The email has been sent", "info")
      : swal("Sending failed!", `${response.responseMessage}`, "warning");
  }
  printAck() {
    this.viewHistoryData.saveReq.IsEmail = false;
    this.viewHistoryData.saveReq.IsExport = true;
    this._opencards
      .savePrintHistory(this.viewHistoryData.saveReq)
      .then((data) => {
        this._opencards
          .printAckPDF(this.viewHistoryData.pdfReq)
          .then((dataPdf) => {
            window.open(
              `${environment.uri}:8081/loadDocument/${dataPdf.CMSPDFDoc.pdfDocID}`,
              "popup",
              "width=600,height=600,toolbar=no,titlebar=no"
            );
          });
      });
  }
}
