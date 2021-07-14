import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from "@angular/core";
import { isNullOrUndefined } from "util";
import { Router, ActivatedRoute } from "@angular/router";
import { Mail } from "../referrals/family-preservation/family-preservation";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import swal from "sweetalert2";
import { CaseTeamService } from "../case-team/case-team.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { LocalValues } from "../local-values";
import { ManualAttachmentDoc } from "../cms-attachment-form/manual-attachment-doc-types";
import { PlacementHistoryComponent } from "../Shared/Components/Placement History/placement-history.component";
import { AckOptionsComponent } from "../ack-options/ack-options.component";
import { environment } from "../../environments/environment";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AppValuesService } from "../../constants/AppValues.service";
import { CASEACTIVITYID, CLIENTID, REFID } from "../../constants/AppConstants";
import * as moment from "moment";
import { ClildFormService } from '../child-forms/child-forms.service';

@Component({
  selector: "app-form-footer",
  inputs: [
    "editControll",
    "mailBtnControl",
    "isPrint",
    "isFinalize",
    "discardTo",
    "isValidate",
    "isSubmit",
    "isSave",
    "isRestart",
    "isReport",
    "isDisabled",
    "isSaveandCountinue",
    "subActions",
    "showEdit",
    "isSendMailDisabled",
    "isAttachmentDisabled",
    "attachmentControll",
    "fileUploadControl",
    "isEmail",
    "isUploadDisabled",
    "isPrintPreview",
    "isPrintNavigation",
    "isDelete",
    "isLabel",
    "isAttachmentsBtn",
    "attachedDocsCount",
    "currentNodeValue",
    "currentNode",
    "createAttachmentMode",
    "isPopUp",
    "formLogInfo",
    "isFormLog",
    "nodeStaffEmail",
    "emailSubjectContent",
  ],
  outputs: [
    "save",
    "reset",
    "discard",
    "edit",
    "delete",
    "back",
    "sendMail",
    "print",
    "finalize",
    "validate",
    "restart",
    "report",
    "submit",
    "saveandcountinue",
    "attachDoc",
    "uploadPdf",
    "email",
    "preview",
    "deleteRecord",
    "labelEmit",
    "attachments",
    "closeProviderDocument",
    "deleted",
    "caAttachmentData",
  ],
  templateUrl: "./form-footer.component.html",
  styleUrls: ["./form-footer.component.scss"],
})
export class FormFooterComponent implements OnInit {
  isAttachmentUrl = false;
  isBackButton = false;
  isCallOtherMethod = false;
  req: any;
  isBlank: boolean;
  isDraft: boolean;

  @Input()
  editControll: boolean;
  mailBtnControl = false;
  isPrint = false;
  isFinalize = false;
  isSubmit = false;
  isSave = true;
  isValidate = false;
  isRestart = false;
  isReport = false;
  discardTo: any;
  isDisabled = false;
  isSendMailDisabled = false;
  isSaveandCountinue = false;
  isCancelDisabled = false;
  subActions = [];
  showEdit = true;
  isAttachmentDisabled = false;
  attachmentControll = false;
  fileUploadControl = false;
  isUploadDisabled = false;
  isEmail = false;
  isPrintPreview = false;
  isPrintNavigation = false;
  isDelete = false;
  isLabel = {
    isLabel: false,
    label: "",
  };
  isAttachmentsBtn = false;
  attachedDocsCount = 0;
  module: string;
  currentNode: string;
  currentNodeValue: any;
  isDeleteBtn = false;
  isDeleteAllConfirmationDisable = false;
  isLoading = false;
  createAttachmentMode = false;
  isPopUp = false;
  formLogInfo = {
    enteredBy: "----------",
    changedBy: "----------",
    enteredDate: "--:--:-- --",
    changedDate: "--:--:-- --",
  };
  isFormLog = false;
  nodeStaffEmail: string;
  emailSubjectContent: any;

  @Output()
  save = new EventEmitter();
  reset = new EventEmitter();
  discard = new EventEmitter();
  edit = new EventEmitter();
  delete = new EventEmitter();
  back = new EventEmitter();
  sendMail = new EventEmitter();
  print = new EventEmitter();
  finalize = new EventEmitter();
  validate = new EventEmitter();
  restart = new EventEmitter();
  report = new EventEmitter();
  submit = new EventEmitter();
  saveandcountinue = new EventEmitter();
  attachDoc = new EventEmitter();
  uploadPdf = new EventEmitter();
  email = new EventEmitter();
  preview = new EventEmitter();
  deleteRecord = new EventEmitter();
  labelEmit = new EventEmitter();
  attachments = new EventEmitter();
  closeProviderDocument = new EventEmitter();
  deleted = new EventEmitter();
  caAttachmentData = new EventEmitter();

  mail: Mail = new Mail();
  openMailWindow = false;
  filteredStaffEmailIDS = [];

  sendMailAttachmentStream = new Array();

  isSendMailAttachmentSelected = false;
  sendMailAttachmentFileName: any;
  printFormList = [];
  subModule: string;
  listOfAttachDocs: any;
  attachedDocumentAPIRequest: any;
  isProviderUploadWindow = false;
  uploadDocTypes = new ManualAttachmentDoc(
    this._opencards,
    this._localValues,
    this._router,
    this._activatedRoute
  );
  scannedDocumentTypes = [];
  filteredDocumentTypes = [];
  scanDocumentPrimaryKeyID: any;
  fileStatusText = "";
  sfcsNotes: any;
  scannedDocumentList: any = [];
  docCategory: any;
  isDeleteAllConfirmation = false;
  totalScannedDocumentCounts: number;
  @ViewChild("uploadAction", { static: false }) uploadAction: any;
  @ViewChild(PlacementHistoryComponent, { static: false })
  @ViewChild("AckOptionsComponent", { static: false })
  AckOptionsComponent: AckOptionsComponent;
  isAckOptionFormOpen = false;
  placementHistoryComponent: PlacementHistoryComponent;
  isDeleteConfirmation = false;
  isDeleteConfirmationDisable = false;
  selectedAttachDocumetId: any;
  deleteConfirmationLabel = "Confirm";
  isFamilyProviderUploadWindow = false;
  isDeleteProviderConfirmation = false;
  isProviderDeleteAllConfirmation = false;
  monthlyYear: any;
  showPacementHistory: boolean;
  isAckOptionEnable = false;
  urlForAckComp: any;
  paramsForAckComp: any;
  blankForAckComp: any;
  draftForAckComp: any;
  iepSchoolForm = false;
  isCaseActivityCreation = false;
  isOpenCACAttachmentBox = false;
  caAttachmentForm: FormGroup;
  caAttachment: CaseActivityAttachment = new CaseActivityAttachment();
  caAttachDocTypes: any[];
  caFileObject: any;
  isCMSFileUploadBtnDisable = true;
  exportOption = false;
  constructor(
    public _router: Router,
    public _opencards: OpencardsService,
    public _caseTeam: CaseTeamService,
    public _activatedRoute: ActivatedRoute,
    public _localValues: LocalValues,
    public _fb: FormBuilder,
    public _appValues: AppValuesService,
    public _client: ClildFormService
  ) { }

  ngOnInit() {
    this.checkURLStatus();
    this.checkCurrentUrlForAttachments();
    this.isBackButtonNeeded();
    this.caAttachmentFormControls();
    this.module = this._activatedRoute.snapshot.queryParamMap.get("module");
    this.subModule = this._activatedRoute.snapshot.queryParamMap.get("sub");
    if (this._router.url.includes("/school_IEP_mod/details") || this._router.url.includes("/school_IEP_mod/new")) {
      this.iepSchoolForm = true;
    }
    this._router.url.includes(
      "/reintegration/referral/opencard/case-activity/new"
    )
      ? (this.isCaseActivityCreation = true)
      : (this.isCaseActivityCreation = false);
    if (this._router.url.includes("/reintegration/referral/opencard/case-evaluations/detail") || (this._router.url.includes("/reintegration/referral/opencard/case-evaluations/new"))) {
      this.exportOption = true;
    }
  }

  /**
   * Save the form
   */
  saveBtn() {
    // this.editControll = true;
    this.save.emit("save function triggered");
    // console.log('isFinalize', this.isFinalize)
  }

  finalizeBtn() {
    this.finalize.emit("finalize function triggered");
  }

  deleteRecordAction() {
    // console.log("deleteRecord called")
    this.deleteRecord.emit("DELETE TRIGGERED");
  }

  labelAction() {
    this.labelEmit.emit("LABEL TRIGGERED");
  }
  /**
   * Delete the form
   */
  deleteBtn() {
    this.delete.emit("delete function triggered");
  }

  /**
   * Discard the form
   */
  discardBtn() {
    this.discard.emit("discard function triggered");
    return !isNullOrUndefined(this.discardTo)
      ? this._router.navigate([this.discardTo], {
        queryParamsHandling: "preserve",
      })
      : null;
  }

  /**
   * Edit the form
   */
  editBtn() {
    this.edit.emit("edif function triggered");
    this.editControll = false;
  }

  /***
   * Backbtn
   */
  backBtn() {
    this.back.emit("Back btn triggered!");
  }

  mailBtn() {
    this.sendMail.emit("send mail triggered!");
  }
  attachBtn() {
    this.attachDoc.emit("attachment triggered!");
  }
  printBtn() {
    this.print.emit("print trigger");
  }

  validateBtn() {
    this.validate.emit("validate trigger");
  }
  restartBtn() {
    this.restart.emit("restart trigger");
  }
  reportBtn() {
    this.report.emit("report trigger");
  }
  submitBtn() {
    this.submit.emit("submit trigger");
  }
  saveAndContinue() {
    this.saveandcountinue.emit("save and continue trigger");
  }

  onBasicUpload(event) {
    this.uploadPdf.emit(event);
  }

  basicEmail() {
    this.email.emit();
    this.openMailWindow = true;
  }

  MailTrigger() {
    this.openMailWindow = false;
    // let loader = document.getElementById('loading-overlay') as HTMLElement
    // loader.style.display = 'block';
    this.isLoading = true;
    let to: any, cc: any, bcc: any;
    // console.log("this.mail.to !== undefined is", this.mail.to !== undefined);
    // console.log("this.mail is", this.mail);

    if (this.mail.to !== undefined) {
      to = this.mail.to.map((item: any) => {
        return item.email;
      });
    } else {
      Swal.fire("Error", "Please specify at least one recipient...", "info");
    }
    cc =
      this.mail.cc !== undefined
        ? this.mail.cc.map((item: any) => {
          return item.email;
        })
        : [];
    bcc =
      this.mail.bcc !== undefined
        ? this.mail.bcc.map((item: any) => {
          return item.email;
        })
        : [];
    this.mail.to = to;
    this.mail.cc = cc;
    this.mail.bcc = bcc;
    this.mail.attachment = "";
    if (this.mail.subject === "" || this.mail.subject === undefined) {
      Swal.fire(
        "Subject missing!",
        "This mail does not contain any subject",
        "warning"
      );
      // loader.style.display = 'none';
      this.isLoading = false;
    } else {
      const mailFormData: FormData = new FormData();

      if (this.isSendMailAttachmentSelected) {
        this.sendMailAttachmentStream.map((item, index) => {
          mailFormData.append(
            "uploadfile",
            this.sendMailAttachmentStream[index]
          );
        });
      }

      const emailJson = {
        to: this.mail.to,
        cc: this.mail.cc,
        bcc: this.mail.bcc,
        subject: this.mail.subject,
        content: this.mail.content,
        fileName: this.sendMailAttachmentFileName,
      };

      mailFormData.append("emailJson", JSON.stringify(emailJson));
      this._opencards.sendEmail(mailFormData).then((data) => {
        if (data.responseStatus) {
          // loader.style.display = 'none';
          this.isLoading = false;
          this.openMailWindow = false;
          Swal.fire("Sent!", "Your message has been sent.", "success");
          // loader.style.display = 'none';
          this.isLoading = false;
        } else {
          swal("Mail not sent!", "Please contact your admin!", "info");
          // loader.style.display = 'none';
          this.isLoading = false;
        }
      });
    }
  }

  filterStaffMultiple(event: any) {
    const req = { Object: "staff", value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.filteredStaffEmailIDS = data.dropDown;
    });
  }

  discardTrigger() {
    this.mail = new Mail();
    this.sendMailAttachmentStream = [];
    this.sendMailAttachmentStream = new Array();
  }

  /*** Click the '' button for uploading the attachdocuments
   * Based on the detail base url it will work
   */
  openUploadDocument() {
    let currentUrlCheck: string = this._router.url,
      currentUrl: any;
    if (currentUrlCheck.includes("?")) {
      currentUrl = this._router.url.split("?")[0];
    } else {
      currentUrl = this._router.url;
    }
    switch (currentUrl) {
      case "/reports/referral/family-preservation/assessment/detail":
        this._router.navigate(["/reports/attachment-document/assessment/new"], {
          queryParamsHandling: "preserve",
        });
        break;

      case "/reports/referral/family-preservation/case-plan-goals/detail":
        this._router.navigate(
          ["/reports/attachment-document/case-plan-goals/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/family-safety/detail":
        this._router.navigate(
          ["/reports/attachment-document/family-safety/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/referral/family-preservation/case-activity/detail":
        this._router.navigate(
          ["/reports/attachment-document/case-activity/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/referral/family-preservation/court-order/detail":
        this._router.navigate(
          ["/reports/attachment-document/court-orders/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/referral/family-preservation/referral-events/detail":
        this._router.navigate(
          ["/reports/attachment-document/referral-events/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/referral/family-preservation/detail":
        this._router.navigate(
          ["/reports/attachment-document/fp-referral/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/referral/family-preservation/case-team/detail":
        this._router.navigate(["/reports/attachment-document/case-team/new"], {
          queryParamsHandling: "preserve",
        });
        break;

      case "/reports/extended-family/detail":
        this._router.navigate(
          ["/reports/attachment-document/extended-family/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/referral/family-preservation/home-county/detail":
        this._router.navigate(
          ["/reports/attachment-document/home-county/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/referral/family-preservation/sfcs-office/detail":
        this._router.navigate(
          ["/reports/attachment-document/sfcs-office/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/referral/family-preservation/non-therapy-face-to-face/detail":
        this._router.navigate(
          ["/reports/attachment-document/non-therapy/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/referral/family-preservation/phase/detail":
        this._router.navigate(["/reports/attachment-document/phase/new"], {
          queryParamsHandling: "preserve",
        });
        break;

      case "/reports/referral/family-preservation/progress-notes/detail":
        this._router.navigate(
          ["/reports/attachment-document/progress-notes/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/referral/family-preservation/case-evaluations/detail":
        this._router.navigate(
          ["/reports/attachment-document/case-evaluation/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/referral/family-preservation/progress-note-diagnosis/detail":
        this._router.navigate(
          ["/reports/attachment-document/progress-notes-diagnosis/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/referral/family-preservation/kipp-pmto/detail":
        this._router.navigate(["/reports/attachment-document/kipp-pmto/new"], {
          queryParamsHandling: "preserve",
        });
        break;

      case "/reports/referral/family-preservation/fis-members/detail":
        this._router.navigate(
          ["/reports/attachment-document/fis-members/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/referral/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/case-plan-goals/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/case-plan-goals/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/court-order/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/court-orders/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/rfc-supervisory-staffing-form/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/supervisory-staffing/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/assessments/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/assessment/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/independent-living/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/independent-living/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/adoption-event/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/adoption-event/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/bis/detail":
        this._router.navigate(["/reports/attachment-document/rfc/bis/new"], {
          queryParamsHandling: "preserve",
        });
        break;

      case "/reintegration/referral/opencard/case-activity/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/case-activity/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/monthly-reports/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/monthly-reports/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/appointments/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/appointments/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/case-evaluations/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/case-evaluation/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/case-file-activity/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/case-file-activity/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/case-team/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/case-team/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/home-county/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/home-county/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/kipp/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/kipp-pmto/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/waiver/detail":
        this._router.navigate(["/reports/attachment-document/rfc/waiver/new"], {
          queryParamsHandling: "preserve",
        });
        break;

      case "/reintegration/referral/opencard/sfcs-office/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/sfcs-office/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/social-security-income/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/social-security-income/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/behavioral-assessment/dash-board":
        this._router.navigate(
          ["/reports/attachment-document/rfc/behavioral-assessment/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/school/credit-tracking/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/credit-tracking/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/school/general-education/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/general-education/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/school/special-education/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/special-education/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/attending-school/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/attending-school/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/grade-level/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/grade-level/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/school-release/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/school-release/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/home-school/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/home-school/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/medication-allergies/details":
        this._router.navigate(
          ["/reports/attachment-document/client/medication/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/client/profile/details":
        this._router.navigate(
          ["/reports/attachment-document/client/client-profiles/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/court/case/details":
        this._router.navigate(
          ["/reports/attachment-document/client/court-case/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/thirdparty/liability/details":
        this._router.navigate(
          ["/reports/attachment-document/client/third-party-liability/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/preventative-measurements/detail":
        this._router.navigate(
          ["/reports/attachment-document/client/preventive-measurements/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/opencards/list/client/critical-significant-unusual-incident/detail":
        this._router.navigate(
          ["/reports/attachment-document/client/unusual-incident/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/bh-determination/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/bh-determination/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/health-record/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/health-record/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/immunization/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/immunization/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/kan-be-healthy/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/kan-be-healthy/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/move-permanency/permanency-form/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/permanency/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reports/referral/nc-ops/detail":
        this._router.navigate(["/reports/attachment-document/nc-ops/new"], {
          queryParamsHandling: "preserve",
        });
        break;

      case "/provider/opencard/location/detail":
        this._router.navigate(
          ["/reports/attachment-document/providers/location/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/provider/opencard/In-home-family-members/pets/detail":
        this._router.navigate(
          ["/reports/attachment-document/providers/pets/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/provider/opencard/license/detail":
        this._router.navigate(
          ["/reports/attachment-document/providers/license/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/provider/opencard/license-exception/detail":
        this._router.navigate(
          ["/reports/attachment-document/providers/license-exception/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/provider/opencard/sponsor/detail":
        this._router.navigate(
          ["/reports/attachment-document/providers/sponsor/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/provider/opencard/status/detail":
        this._router.navigate(
          ["/reports/attachment-document/providers/status/new"],
          { queryParamsHandling: "preserve" }
        );
        break;
      case "/reports/nc-fch/detail":
        this._router.navigate(["/reports/attachment-document/nc-fch/new"], {
          queryParamsHandling: "preserve",
        });
        break;

      case "/provider/opencard/office/detail":
        this._router.navigate(
          ["/reports/attachment-document/providers/office/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/provider/opencard/staff/detail":
        this._router.navigate(
          ["/reports/attachment-document/providers/sfm-staff/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/provider/opencard/provider-preferences/detail":
        this._router.navigate(
          ["reports/attachment-document/providers/preference/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/provider/opencard/other-agency-staff/detail":
        this._router.navigate(
          ["reports/attachment-document/providers/other-agency-staff/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/provider/opencard/school/detail":
        this._router.navigate(
          ["reports/attachment-document/providers/school/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/provider/opencard/critical-incidents/detail":
        this._router.navigate(
          ["/reports/attachment-document/providers/unusual-incident/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/adoption/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/adoption-event/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/claims/list/details":
        this._router.navigate(["/reports/attachment-document/claims/new"], {
          queryParamsHandling: "preserve",
        });
        break;

      case "/reports/nc-rfc/detail":
        this._router.navigate(
          ["/reports/attachment-document/nc-rfc-attachment/new"],
          { queryParamsHandling: "preserve" }
        );
        break;
      case "/reintegration/referral/opencard/placement/living-arrangement/detail":
        this._router.navigate(
          ["/reports/attachment-document/living-arrangement-attachment/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/placement-event-authorizations/detail":
      case "/reintegration/referral/placement-authorizations/detail":
      case "/reintegration/referral/opencard/placement/daycare-authorization/detail":
        this._router.navigate(
          ["/reports/attachment-document/placement-auth-attachment/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/placement/placementEvent/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/placement-event/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/opencard/placement/placementPlan/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/placement-plan/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/reintegration/referral/service/hardgoods/detail":
      case "/reintegration/referral/service/other/service/detail":
        this._router.navigate(
          ["/reports/attachment-document/rfc/rfc-authorizations/new"],
          { queryParamsHandling: "preserve" }
        );
        break;

      case "/claims/list/direct/form/view":
        this._router.navigate(
          ["/reports/attachment-document/rfc/rfc-claims/new"],
          { queryParamsHandling: "preserve" }
        );
        break;
      default:
    }
  }

  checkCurrentUrlForAttachments() {
    const currentUrl = this._router.url;
    if (currentUrl.startsWith("/reports/attachment-document")) {
      this.isAttachmentUrl = true;
    }
  }

  isBackButtonNeeded() {
    const currentUrl = this._router.url;
    if (
      currentUrl ===
      "/reintegration/referral/opencard/move-permanency/permanency-form/detail"
    ) {
      this.isBackButton = true;
    }
  }

  printPreview() {
    this.preview.emit("printPreview");
  }

  storeSendMailAttachment(event, form) {
    event.files.map((item: any, index) => {
      this.sendMailAttachmentStream.push(event.files[index]);
    });
    this.isSendMailAttachmentSelected = true;
    this.sendMailAttachmentFileName = event.files[0].name;
    form.clear();
  }

  byteToKbConversion(bytes) {
    return Math.round(bytes / 1000);
  }

  onPrintDropdownNavigation(label: string) {
    if (label == "Draft") {
      this.isBlank = false;
      return (this.isDraft = true);
    } else if (label == "Blank") {
      this.isDraft = false;
      return (this.isBlank = true);
    } else {
      this.isDraft = false;
      this.isBlank = false;
    }
  }

  async onPrintNavigateSelect() {
    let currentUrlCheck: string = this._router.url,
      currentUrl: any;
    if (currentUrlCheck.includes("?")) {
      currentUrl = this._router.url.split("?")[0];
    } else {
      currentUrl = this._router.url;
    }

    switch (currentUrl) {
      case "/reintegration/referral/opencard/placement-referral/detail":
        this.printFormList = [
          {
            label: "Draft",
            command: () => {
              this.onPrintDropdownNavigation("Draft");
              this.printFormsNavigations("/placement-referral-draft");
            },
          },
          {
            label: "Blank",
            command: () => {
              this.onPrintDropdownNavigation("Blank");
              this.printFormsNavigations("/placement-referral-blank");
            },
          },
          {
            label: "PR",
            command: () => {
              this.onPrintDropdownNavigation("PR");
              this.printFormsNavigations("/placement-referral-draft");
            },
          },
        ];
        break;

      case "/reintegration/referral/opencard/placement/placementEvent/detail":
        await this.getPlacementEventRelatedAttachmentPDFForms();
        if (this._localValues.isPlacementNewValidationSet) {
          this.printFormList = [
            {
              label: "Placement Event Status",
              command: () => {
                this.printFormsNavigations("/placement-event-status");
              },
            },
            {
              label: "Placement Agreement",
              command: () => {
                this.printFormsNavigations("/placement-agreement");
              },
            },
            // { label: 'Placement Agreement Kinship (AP)', command: () => { this.printFormsNavigations('/placement-agreement-kinship-agency-approved') } },
            // { label: 'Placement Agreement Kinship (NP)', command: () => { this.printFormsNavigations('/placement-agreement-kinship-non-paid') } },
            {
              label: "Flow Chart",
              command: () => {
                this.printFormsNavigations("/flow-chart");
              },
            },
            {
              label: "Fax List",
              command: () => {
                this.printFormsNavigations("/fax-list");
              },
            },
            {
              label: "View History",
              command: () => {
                this.showPacementHistory = true;

                // this.placementHistoryComponent.isPrompt = true;
              },
            },
          ];
        } else {
          this.printFormList = [
            {
              label: "Placement Acknowledgement",
              command: () => {
                this.printFormsNavigations("/placement-acknowledgment");
              },
            },
            {
              label: "Placement PSA",
              command: () => {
                this.printFormsNavigations("/placement-psa");
              },
            },
            {
              label: "Placement Event Status",
              command: () => {
                this.printFormsNavigations("/placement-event-status");
              },
            },
            {
              label: "Placement Agreement",
              command: () => {
                this.printFormsNavigations("/placement-agreement");
              },
            },
            // { label: 'Placement Agreement Kinship (AP)', command: () => { this.printFormsNavigations('/placement-agreement-kinship-agency-approved') } },
            // { label: 'Placement Agreement Kinship (NP)', command: () => { this.printFormsNavigations('/placement-agreement-kinship-non-paid') } },
            {
              label: "Flow Chart",
              command: () => {
                this.printFormsNavigations("/flow-chart");
              },
            },
            {
              label: "Fax List",
              command: () => {
                this.printFormsNavigations("/fax-list");
              },
            },
            {
              label: "View History",
              command: () => {
                this.showPacementHistory = true;

                // this.placementHistoryComponent.isPrompt = true;
              },
            },
          ];
        }

        break;

      case "/reintegration/referral/opencard/placement-referral/new":
        this.printFormList = [
          {
            label: "Blank",
            command: () => {
              this.printFormsNavigations("/placement-referral-blank");
            },
          },
        ];
        break;

      case "/reintegration/referral/opencard/move-permanency/move-form/detail":
        this.printFormList = [
          {
            label: "Move",
            command: () => {
              this.printFormsNavigations("/move-form");
            },
          },
          {
            label: "Move With Disruption",
            command: () => {
              this.printFormsNavigations("/move-form-with-disruption");
            },
          },
        ];
        break;

      case "/reintegration/referral/opencard/placement/placementPlan/detail":
        this.printFormList = [
          {
            label: "Blank",
            command: () => {
              this.printFormsNavigations("/placement-plan-blank");
            },
          },
          {
            label: "Draft",
            command: () => {
              this.printFormsNavigations("/placement-plan-draft");
            },
          },
          {
            label: "Placement Plan",
            command: () => {
              this.printFormsNavigations("/placement-plan-draft");
            },
          },
        ];
        break;

      case "/reintegration/referral/opencard/placement/living-arrangement/detail":
        await this.getLivingArrangementRelatedAttachmentPDFForms();
        this.printFormList = [
          {
            label: "ACK - Acknowledgement",
            command: () => {
              this.printFormsNavigations("/placement-acknowledgment", {
                action: "create",
                sub: "livingArrangement",
              });
            },
            // routerLink: ["/placement-acknowledgment"],
          },
          {
            label: "ACK - Acknowledgement(Return)",
            command: () => {
              this.printFormsNavigations("/placement-acknowledgment-return", {
                sub: "livingArrangement",
              });
            },
            // routerLink: ["/placement-acknowledgment-return"],
          },
          {
            label: "PSA - Provider Service Agreement",
            command: () => {
              this.printFormsNavigations("/placement-psa", {
                sub: "livingArrangement",
              });
            },
            // routerLink: ["/placement-psa"],
          },
          {
            label: "Fax List",
            command: () => {
              this.printFormsNavigations("/fax-list", {
                sub: "livingArrangement",
              });
            },
            // routerLink: ["/fax-list"],
          },
          {
            label: "View History",
            command: () => {
              this.showPacementHistory = true;

              // this.placementHistoryComponent.isPrompt = true;
            },
          },
        ];
        break;
      case "/reintegration/referral/service/hardgoods/detail":
      case "/reintegration/referral/service/other/service/detail":
        await this.getHardsgoodsAndOtherServicePSAForm();
        let subModule: string;
        if (currentUrl === "/reintegration/referral/service/hardgoods/detail") {
          subModule = "hardgoods";
        } else {
          subModule = "other-service";
        }
        this.printFormList = [
          {
            label: "PSA - Provider Service Agreement",
            command: () => {
              this.printFormsNavigations("/placement-psa", {
                sub: subModule,
              });
            },
          },
        ];
        break;
      case "/reports/referral/family-preservation/progress-notes/detail":
        this.printFormList = [
          {
            label: "Progress Notes",
            command: () => {
              this.onExportProgressNote();
            },
          },
          {
            label: "Encounter Form",
            command: () => {
              this.onExportEncounterForm();
            },
          },
        ];
        break;
    }
  }
  printFormsNavigations(url: string, parameters?: any, label?: string) {
    let updatedParameter = Object.assign({}, parameters, { isIndiviual: true });
    console.log("Updated parameter", updatedParameter, url);
    if (url.includes("/move-form")) {
      this._router.navigate([url], { queryParamsHandling: "preserve" });
    } else {
      this.isAckOptionFormOpen = true;
      this.isAckOptionEnable = true;
    }
    this.urlForAckComp = url;
    this.paramsForAckComp = updatedParameter;
    this.blankForAckComp = this.isBlank;
    this.draftForAckComp = this.isDraft;

    // this.AckOptionsComponent.ngOnInit();
    // this.AckOptionsComponent.getCaseManager();
    // this.AckOptionsComponent.getCaseManagerChangeReason();
    // this.AckOptionsComponent.getReasonOfLate();
    // this.AckOptionsComponent.getSelectedFormDetail(url, updatedParameter);

    // if (
    //   this._router.url.includes(
    //     "/reintegration/referral/opencard/placement-referral/detail"
    //   )
    // ) {
    //   this.AckOptionsComponent.getPlacementReferralCaseManager(
    //     this.isBlank,
    //     this.isDraft
    //   );
    // } else {
    //   this.AckOptionsComponent.getPlacementCaseManager();
    // }

    // this.AckOptionsComponent.isIndividualPrintForms = true;
  }

  onClickAttachments() {
    this.attachments.emit();
    this.getScannedDocumentListView();
    return (this.isProviderUploadWindow = true);
  }

  async getScannedDocumentListView() {
    this.scannedDocumentList = await this.uploadDocTypes.onGetAttachmentList(
      this.currentNodeValue
    );
    this.totalScannedDocumentCounts = this.scannedDocumentList.length;
  }

  checkURLStatus() {
    // Check the URL status
    // If that URL related to  detail view
    // Enable the attached document button
    // check for attached documents not implemented nodes
    // let nodeValue = Object.keys(this.currentNodeValue);
    // console.log("Node value", this.currentNodeValue);
    if (
      this._router.url.includes("/reports/staff/details") ||
      this._localValues.sfmOfficeID ||
      this._localValues.deleteRequestKey
    ) {
      this.isDeleteBtn = true;
      this.isCallOtherMethod = true;
    } else {
      this.isCallOtherMethod = false;
    }
    if (this.isPopUp) {
      this.isDeleteBtn = true;
      return (this.isAttachmentsBtn = true);
    }
    if (
      this._router.url.includes("/detail") ||
      this._router.url.includes("/details")
    ) {
      this.isDeleteBtn = true;
    }
    if (this._localValues.medicationAllergiesDelelePRTF) {
      this.isDeleteBtn = true;
    }
    if (
      this._router.url.includes(
        "/provider/opencard/provider-strength/detail"
      ) ||
      this._router.url.includes("/reports/payee") ||
      this._router.url.includes("/provider/opencard/adoption/detail") ||
      this._router.url.includes("/reports/providerMember/details")
    ) {
      this.isDeleteBtn = false;
    }

    if (this.currentNodeValue) {
      if (
        this._router.url.includes("/reports/client/details") ||
        this._router.url.includes("/court-order/detail") ||
        this._router.url.includes("/kan-be-healthy/detail") ||
        this._router.url.includes("/assessments/detail") ||
        this._router.url.includes("/case-plan-goals/detail") ||
        this._router.url.includes("/monthly-reports/detail") ||
        this._router.url.includes("/progress-notes/detail") ||
        this._router.url.includes("/family-safety/detail") ||
        this._router.url.includes("/kipp/detail") ||
        this._router.url.includes("/independent-living/detail") ||
        this._router.url.includes("/credit-tracking/detail") ||
        this._router.url.includes("/special-education/detail") ||
        this._router.url.includes("/school-release/detail") ||
        this._router.url.includes("/immunization/detail") ||
        this._router.url.includes("/waiver/detail") ||
        this._router.url.includes("/adoption/detail") ||
        this._router.url.includes("/bis/detail") ||
        this._router.url.includes("/living-arrangement/detail") ||
        this._router.url.includes("/general-education/detail") ||
        this._router.url.includes(
          "/client/critical-significant-unusual-incident/detail"
        ) ||
        this._router.url.includes("/jjfc/detail") ||
        this._router.url.includes("/nc-mhr/detail") ||
        this._router.url.includes("/claims/list/details") ||
        this._router.url.includes("daycare-authorization/detail") ||
        this._router.url.includes("/claims/list/direct/form/view") ||
        this._router.url.includes("/hardgoods/detail") ||
        this._router.url.includes("/service/other/service/detail") ||
        this._router.url.includes("/license-exception/detail") ||
        this._router.url.includes(
          "/reintegration/referral/placement-event-authorizations/detail"
        ) ||
        this._router.url.includes("/provider/opencard/license/detail") ||
        this._router.url.includes("/provider/opencard/training/detail") ||
        this._router.url.includes("/auth-claim/details") ||
        this._router.url.includes("/provider/opencard/family/contact/detail") ||
        this._router.url.includes("/provider/opencard/adoption/IR/detail") ||
        this._router.url.includes(
          "/provider/opencard/other-agency-staff/detail"
        ) ||
        this._router.url.includes("/claims/list/cs-direct/form/view") ||
        this._router.url.includes(
          "/reintegration/referral/opencard/health-record/detail"
        ) ||
        this._router.url.includes(
          "/reports/opencards/list/client/critical-significant-unusual-incident/detail"
        ) ||
        this._router.url.includes(
          "/reports/opencards/list/client/critical-significant-unusual-incident-RM/detail"
        ) ||
        this._router.url.includes(
          "/reintegration/referral/opencard/bh-determination/detail"
        ) ||
        this._router.url.includes("/reports/service-agreement/detail") ||
        this._router.url.includes(
          "/reintegration/referral/opencard/grade-level/detail"
        ) ||
        this._router.url.includes(
          "/reintegration/referral/opencard/social-security-income/detail"
        ) ||
        this._router.url.includes("/reports/extended-family/detail") ||
        this._router.url.includes(
          "/reintegration/referral/opencard/placement/detail"
        ) ||
        this._router.url.includes(
          "/reintegration/referral/opencard/placement/placementEvent/detail"
        ) ||
        this._router.url.includes(
          "/reintegration/referral/opencard/placement/detail"
        ) ||
        this._router.url.includes(
          "/reintegration/referral/opencard/placement/daycare-authorization/detail"
        ) ||
        this._router.url.includes(
          "/reintegration/referral/placement-authorizations/detail"
        ) ||
        this._router.url.includes(
          "/provider/dashboard/family-paperwork-on-placements"
        ) ||
        this.isPopUp ||
        this._router.url.includes("/provider/opencard/status/detail") ||
        this._router.url.includes(
          "/reports/referral/family-preservation/assessment/detail"
        ) ||
        this._router.url.includes("/reports/opencards/list/client/case") ||
        this._router.url.includes("/otherService-direct/form/view") ||
        this._router.url.includes(
          "/reintegration/cs-payee/csPayeeAuthDetail"
        ) ||
        this._router.url.includes("/csPayee/payeeform") ||
        this._router.url.includes("/CSpayee/payeeform/authClaim/details") ||
        this._router.url.includes(
          "/claims/list/dir_cs-payee/dir_csPayee-directAuth"
        )
      ) {
        return (this.isAttachmentsBtn = true);
      }
    } else {
      return this.masterNodesForUpload();
    }
  }

  async onUpload(event: any) {
    let req: any, response: any;
    console.log("File upload", event);
    if (this.docCategory) {
      if (event.files.length > 0) {
        this.isCMSFileUploadBtnDisable = false;
        this.uploadDocTypes.fileStatusText = "Please wait uploading...";
        this.uploadDocTypes.getAttachmentFileType(event.files[0].type);
        let files = event.files;
        const formData: FormData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("uploadfile", files[i]);
        }
        req = this.generateDocumentUploadReq();
        formData.append("pdfFormJson", JSON.stringify(req));
        response = await this._opencards.saveAttachment(formData);
        if (response.responseStatus) {
          this.uploadDocTypes.fileStatusText = "File is uploaded successfully!";
          this.isCMSFileUploadBtnDisable = true;
          this.getScannedDocumentListView();
          this.sfcsNotes = "";
          this.uploadDocTypes.description = "";
          this.docCategory = "";
          this.uploadAction.clear();
        } else {
          this.uploadDocTypes.fileStatusText =
            "Can't reach the servers, Please try again later!";
          this.isCMSFileUploadBtnDisable = true;
        }
      } else {
        this.isCMSFileUploadBtnDisable = true;
        return swal(
          "Please select the file",
          "Please select atleast one file to complete the process",
          "info"
        );
      }
    } else {
      this.uploadDocTypes.fileStatusText =
        "Please select the document category";
    }
  }

  generateDocumentUploadReq() {
    let baseReq = {
      staffID: parseInt(localStorage.getItem("UserId")) || 4620,
      staffName: localStorage.getItem("UserEmail") || "Unknown user",
      sfcsNotes: this.sfcsNotes,
      formName: this.uploadDocTypes.formName,
      description: this.uploadDocTypes.description,
      cmsFormJson: this.uploadDocTypes.cmsFormJson,
      documentType: this.uploadDocTypes.documentType,
      fileExtension: "." + this.uploadDocTypes.fileExtension,
    },
      newReq: any;
    if (this._router.url.includes("/provider")) {
      // provider
      const providerReq = {
        clientID: null,
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencards.getHasKey(),
      };
      newReq = Object.assign({}, baseReq, providerReq, this.currentNodeValue);
      return newReq;
    } else {
      // non-providers
      const masterNodereq = {
        clientID: parseInt(
          this._activatedRoute.snapshot.queryParamMap.get(CLIENTID)
        ),
      };
      if (this.currentNodeValue === undefined) {
        // For master scanned document nodes
        // console.log("Current node value", this.uploadDocTypes.currentNode)
        switch (this.uploadDocTypes.currentNode) {
          case "caseActivity":
            masterNodereq["caseActivityID"] = parseInt(
              this._activatedRoute.snapshot.queryParamMap.get(CASEACTIVITYID)
            );
            break;
          case "referral":
            masterNodereq["referralID"] = parseInt(
              this._activatedRoute.snapshot.queryParamMap.get(REFID)
            );
            break;
        }
        newReq = Object.assign({}, baseReq, masterNodereq);
        // console.log("master node req", newReq)
        return newReq;
      } else {
        const nonProviderReq = Object.assign(
          {},
          {
            clientID: parseInt(
              this._activatedRoute.snapshot.queryParamMap.get(CLIENTID)
            ),
          },
          this.currentNodeValue
        );
        newReq = Object.assign({}, baseReq, nonProviderReq);
        return newReq;
      }
    }
  }

  masterNodesForUpload() {
    const currentUrl = this._router.url;
    if (
      currentUrl.includes("/nc-hs/detail") ||
      currentUrl.includes("/bh-ok/detail") ||
      currentUrl === "/reports/referral/family-preservation/detail" ||
      currentUrl.includes("/nc-rfc/detail") ||
      currentUrl.includes("/reintegration/referral/detail") ||
      currentUrl.includes("/nc-fch/detail") ||
      currentUrl.includes("/nc-ops/detail") ||
      currentUrl === "/jjfc/detail" ||
      currentUrl === "/nc-mhr/detail"
    ) {
      return (this.isAttachmentsBtn = true);
    } else if (currentUrl.includes("/case-activity/detail")) {
      return (this.isAttachmentsBtn = true);
    } else if (currentUrl.includes("/provider")) {
      if (currentUrl.includes("/detail")) {
        return (this.isAttachmentsBtn = true);
      }
    } else {
      return (this.isAttachmentsBtn = false);
    }
  }

  onAttachDocDelete = (scannedDocumentID: number) => {
    this.selectedAttachDocumetId = scannedDocumentID;
    return (this.isDeleteConfirmation = true);
  };
  async attachDocDelete() {
    this.isDeleteConfirmationDisable = true;
    this.deleteConfirmationLabel = "Deleting...";
    await this.uploadDocTypes.deleteAttachment([this.selectedAttachDocumetId]);
    this.isDeleteConfirmationDisable = false;
    this.isDeleteConfirmation = false;
    this.getScannedDocumentListView();
    this.deleteConfirmationLabel = "Confirm";
  }

  async onAttachmentDeleteAll() {
    const scannedDocumentsID = [];
    this.isDeleteAllConfirmationDisable = true;
    this.scannedDocumentList.filter((item) =>
      scannedDocumentsID.push(item.ScannedDocumentID)
    );
    await this.uploadDocTypes.deleteAttachment(scannedDocumentsID);
    this.getScannedDocumentListView();
    this.isDeleteAllConfirmationDisable = false;
    // console.log("Delete all feature initiated!", scannedDocumentsID);
  }

  onClickProviderAttachments() {
    this.attachments.emit();
    this.getScannedDocumentListView();
    return (this.isFamilyProviderUploadWindow = true);
  }

  async attachProviderDocDelete() {
    this.isDeleteConfirmationDisable = true;
    this.deleteConfirmationLabel = "Deleting...";
    await this.uploadDocTypes.deleteAttachment([this.selectedAttachDocumetId]);
    this.isDeleteConfirmationDisable = false;
    this.getScannedDocumentListView();
    this.deleteConfirmationLabel = "Confirm";
    this.isDeleteProviderConfirmation = false;
  }

  onCloseAttachedDocumentPrompt() {
    this.closeProviderDocument.emit("closeProviderDocument function triggered");
  }

  onProviderAttachDocDelete = (scannedDocumentID: number) => {
    this.selectedAttachDocumetId = scannedDocumentID;
    return (this.isDeleteProviderConfirmation = true);
  };

  onCardDelete() {
    this.deleted.emit();
  }

  /**
   * Get the placement event related PDF based on placement detail id
   */
  async getPlacementEventRelatedAttachmentPDFForms() {
    let request = {
      placementDetailID: parseInt(localStorage.getItem("placementDetailId")),
    };
    let response = await this._opencards.getPlacementEventSavedPDFForms(
      request
    );
    localStorage.setItem("esignPdFDocID", response.placementAgreement.pdfDocID);
    // this._localValues.placementAgreementKinshipAndAgencyApprovedDocID =
    //   response.placementAgreementKinshipAndAgencyApproved.pdfDocID;
    this._localValues.referralNotificationOfMovePlacementChangeDocID =
      response.referralNotificationOfMovePlacementChange.pdfDocID;
    this._localValues.PlacementAgreementID =
      response.placementAgreement.pdfDocID;
    this._localValues.placementEventStatusDocID =
      response.placementEventStatus.pdfDocID;
    return (this._localValues.providerServiceAgreementDocID =
      response.providerServiceAgreement.pdfDocID);
  }

  closeModelComp(event, type) {
    this.showPacementHistory = false;
  }

  /**
   * Get the living arrangement related PDF based on living arrangement detail id
   */
  async getLivingArrangementRelatedAttachmentPDFForms() {
    let request = {
      livingArrangementID:
        parseInt(localStorage.getItem("livingArrangementID")) -
        this._opencards.getHasKey(),
    };
    let response = await this._opencards.getPlacementEventSavedPDFForms(
      request
    );

    this._localValues.referralNotificationOfMovePlacementChangeDocID =
      !isNullOrUndefined(response.referralNotificationOfMovePlacementChange)
        ? response.referralNotificationOfMovePlacementChange.pdfDocID
        : null;

    this._localValues.PlacementAgreementID = !isNullOrUndefined(
      response.placementAgreement
    )
      ? response.placementAgreement.pdfDocID
      : null;

    this._localValues.placementEventStatusDocID = !isNullOrUndefined(
      response.placementEventStatus
    )
      ? response.placementEventStatus.pdfDocID
      : null;

    this._localValues.referralNotificationOfMovePlacementChangeDocIDReturn =
      !isNullOrUndefined(
        response.referralNotificationOfMovePlacementChangeReturn
      )
        ? response.referralNotificationOfMovePlacementChangeReturn.pdfDocID
        : null;

    this._localValues.providerServiceAgreementDocID = !isNullOrUndefined(
      response.providerServiceAgreement
    )
      ? response.providerServiceAgreement.pdfDocID
      : null;

    return;
  }

  async getHardsgoodsAndOtherServicePSAForm() {
    let request = { authorizationID: parseInt(localStorage.getItem("authId")) };
    let response =
      await this._opencards.getSavedPrintFormsBasedOnAuthorizationIds(request);
    return (this._localValues.providerServiceAgreementDocID =
      response.providerServiceAgreement !== null &&
        response.providerServiceAgreement !== undefined
        ? response.providerServiceAgreement.pdfDocID
        : null);
  }

  async onExportProgressNote() {
    let request = {
      progressNoteID:
        parseInt(localStorage.getItem("progressNoteID")) -
        this._opencards.getHasKey(),
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencards.getHasKey(),
    };
    let response = await this._opencards.exportProgressNotePrintForm(request);
    if (response.responseStatus) {
      return window.open(
        `${environment.uri}:8081/loadDocument/${response.cMSPDFDocID}`,
        "popup",
        "width=600,height=600,toolbar=no,titlebar=no"
      );
    } else {
      return swal("Info", response.responseMessage, "info");
    }
  }

  async onExportEncounterForm() {
    let request = {
      progressNoteID:
        parseInt(localStorage.getItem("progressNoteID")) -
        this._opencards.getHasKey(),
      diagnosisSpecifierSeverity: true,
    };
    let response = await this._opencards.exportEncounterPrintForm(request);
    if (response.responseStatus) {
      return window.open(
        `${environment.uri}:8081/loadDocument/${response.cMSPDFDocID}`,
        "popup",
        "width=600,height=600,toolbar=no,titlebar=no"
      );
    } else {
      return swal("Info", response.responseMessage, "info");
    }
  }

  caAttachmentFormControls() {
    this.caAttachmentForm = this._fb.group({
      documentType: [null],
      description: [null],
    });
  }

  onSelectCAAttachmentDocType(event: any) {
    return event;
  }

  async filterCAAttachDocTypes(event: any) {
    let request = {
      beginPagination: 1,
      contract_StateID: 34,
      endPagination: 500,
      scanDocumentPrimaryKeyID: 3,
      sort: { column: "scanDocumentTypeID", mode: "asc" },
    };
    let response = await this._opencards.getScannerdDocumentTypes(request);
    return (this.caAttachDocTypes = response.scanDocumentTypeList.filter(
      (item: any) => item.documentType.toLowerCase().indexOf(event.query) !== -1
    ));
  }

  onUploadCAFileHandler() {
    this.onClickCAFileuploadSave();
    return swal("Added!", "Your file got added in this record", "success");
  }

  onSelectUploadedCAFiles(event: any) {
    this.caFileObject = event.files[0];
    this.caAttachment.fileExtension = `.${event.files[0].type.split("/")[1]}`;
  }

  onClickCAFileuploadSave() {
    this.caAttachment.staffID =
      parseInt(localStorage.getItem("UserId")) || 4620;
    this.caAttachment.staffName = localStorage.getItem("UserEmail")
      ? localStorage.getItem("UserEmail").split("@")[0].replace(".", " ")
      : "Admin";
    this.caAttachment.documentType = this.caAttachment.formName =
      this.caAttachment.documentType.documentType;
    this.caAttachment.cmsFormJson = { isUpload: true };
    this.caAttachmentData.emit({
      caFileDetails: this.caAttachment,
      uploadedFiles: this.caFileObject,
    });
    this.isOpenCACAttachmentBox = false;
  }

  export() {
    if (this._router.url.includes("/reintegration/referral/opencard/case-evaluations/detail")) {
      let requestObject = {
        evaluationVersionID:
          parseInt(localStorage.getItem("evaluationVersionID")),
        evaluationID: this._client.getId(),
        isExport: true,
        fileName: "Case Evaluation - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getCaseEvaluationScale(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    }
    if (this._router.url.includes("/reintegration/referral/opencard/case-evaluations/new")) {
      let requestObject = {
        evaluationVersionID:
          parseInt(localStorage.getItem("evaluationVersionID")),
        evaluationID: 0,
        isExport: true,
        fileName: "Case Evaluation - " + moment(Date.now()).format("MM-DD-YYYY"),
      };
      this._opencards.getCaseEvaluationScale(requestObject).then((data) => {
        if (data["filePath"]) {
          window.location.href = data["filePath"];
        }
      });
    }
  }
}

export class CaseActivityAttachment {
  documentType: any;
  description: string;
  staffID: number;
  staffName: string;
  formName: string;
  fileExtension: string;
  cmsFormJson: any;
}
