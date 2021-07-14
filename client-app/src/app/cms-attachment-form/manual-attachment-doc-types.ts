import { OpencardsService } from "../opecards-list-view/opencards.service";
import { LocalValues } from "../local-values";
import { environment } from "../../environments/environment";
import { ActivatedRoute, Router } from "@angular/router";
import { CASEACTIVITYID, CLIENTID, REFID } from "../../constants/AppConstants";

export class ManualAttachmentDoc {
  constructor(
    public _opencard: OpencardsService,
    public _localValues: LocalValues,
    public _router: Router,
    public _activateRoute: ActivatedRoute
  ) {}
  formName = undefined;
  description = undefined;
  cmsFormJson = { isUpload: true };
  documentType = undefined;
  fileExtension = undefined;
  currentNode: string;
  attachedDocumentAPIRequest: any;
  documentTypesForCurrrentNode: any = [];
  env = environment;
  isDownloadBtnDisable = false;
  fileStatusText = "";
  scannedDocReq = {};
  isDeleteBtnDisable = false;
  selectedScannedDocumentPrimaryKeyID: any;
  scanDocumentPrimaryKeyID: any;
  REF_ID = parseInt(this._activateRoute.snapshot.queryParamMap.get(REFID));
  CLIENT_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(CLIENTID)
  );
  CASE_ACTIVITY_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(CASEACTIVITYID)
  );

  getManualUploadDocTypes = function (
    selectedScannedDocumentPrimaryKeyID: any
  ) {
    this.scannedDocReq = {
      beginPagination: 1,
      endPagination: 500,
      contract_StateID: this._localValues.providerContractStateId || 34,
      sort: {
        column: "scanDocumentTypeID",
        mode: "asc",
      },
    };
    if (selectedScannedDocumentPrimaryKeyID) {
      this.scannedDocReq["scanDocumentPrimaryKeyID"] =
        selectedScannedDocumentPrimaryKeyID;
    } else {
      this.masterNodesScannedDocumentTypeID();
    }
    localStorage.setItem(
      "selectedScannedDocumentPrimaryKeyID",
      this.scannedDocReq["scanDocumentPrimaryKeyID"]
    );
    return new Promise((resolve) => {
      this._opencard
        .getScannerdDocumentTypes(this.scannedDocReq)
        .then((data: any) => {
          resolve(data.scanDocumentTypeList);
        });
    });
    console.log("test");
  };

  filteringUplodDocType = function (keyword: string) {
    const result = this.documentTypesForCurrrentNode.filter((item: any) => {
      if (item.documentType.toLowerCase().indexOf(keyword) !== -1) {
        return item;
      }
    });
    return result;
  };

  onSelectedDocType = function (selectedDocType: any) {
    this.formName = selectedDocType.documentType;
    this.description = selectedDocType.documentType;
    this.documentType = selectedDocType.documentType;
  };

  getAttachmentFileType = function (selectedFileType: string) {
    switch (selectedFileType) {
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        this.fileExtension = "xlsx";
        break;

      case "image/jpeg":
        this.fileExtension = "jpg";
        break;

      case "image/png":
        this.fileExtension = "png";
        break;

      case "application/pdf":
        this.fileExtension = "pdf";
        break;

      case "text/plain":
        this.fileExtension = "txt";
        break;

      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        this.fileExtension = "docx";
        break;

      case "application/vnd.ms-excel":
        this.fileExtension = "csv";
        break;

      case "image/svg+xml":
        this.fileExtension = "svg";
        break;

      case "application/vnd.oasis.opendocument.text":
        this.fileExtension = "odt";
        break;

      case "application/msword":
        this.fileExtension = "doc";
        break;

      default:
    }
  };

  downloadAttachedDocument = function (scannedDocumentID: number) {
    let filePath = environment.blob,
      fileDownloadHeaders = environment.SAS,
      downloadURL: string,
      timeStamp = new Date().getTime();
    this.isDownloadBtnDisable = true;
    this.fileStatusText = "Download initated!";
    // if (environment.name === 'live') { filePath = 'https://sfcsblobstorageeastus2.file.core.windows.net/scanneddocumentfs'; }
    // if (environment.name === 'prod') { filePath = 'https://sfcsblobstorageeastus2.file.core.windows.net/stg-scanneddocumentfs'; }
    // if (environment.name === 'dev') { filePath = 'https://sfcsblobstorageeastus2.file.core.windows.net/dev-scanneddocumentfs'; }
    // if (environment.name === 'pre-prod') { filePath = 'https://sfcsblobstorageeastus2.file.core.windows.net/preprd-scanneddocumentfs'; }
    // if (environment.name === 'betaware') { filePath = 'https://sfcsblobstorageeastus2.file.core.windows.net/bt-scanneddocumentfs'; }
    const req = { scannedDocumentId: scannedDocumentID };
    return new Promise((resolve) => {
      this._opencard.downloadAttachedDocument(req).then((data: any) => {
        downloadURL = `${filePath}${data.scannedDocument.fileName}${fileDownloadHeaders}&timestamp=${timeStamp}`;
        this.isDownloadBtnDisable = false;
        this.fileStatusText = "Download completed!";
        console.log("Download URL", downloadURL);
        resolve(window.open(downloadURL));
      });
    }).catch(() => (this.uploadDocTypes.fileStatusText = "Download failed!,"));
  };

  async onGetAttachmentList(currentNodePrimaryKey: any) {
    let attachDocReq = {
        beginPagination: 1,
        endPagination: 500,
        sort: { column: " ScannedDocumentID", mode: "desc" },
      },
      listviewReq: any;
    if (currentNodePrimaryKey) {
      const primaryKey = Object.keys(currentNodePrimaryKey);
      const selectedPrimayKeyID = this.getAttachedDocPrimaryKeyID(
        primaryKey[0]
      );
      listviewReq = Object.assign({}, attachDocReq, currentNodePrimaryKey);
      this.documentTypesForCurrrentNode = await this.getManualUploadDocTypes(
        selectedPrimayKeyID
      );
    } else {
      this.masterNodesScannedDocumentTypeID();
      switch (this.currentNode) {
        case "caseActivity":
          attachDocReq["caseActivityID"] = this.CASE_ACTIVITY_ID;
          break;
        case "referral":
          attachDocReq["referralID"] = this.REF_ID;
          break;
        case "provider":
          attachDocReq["providerID"] =
            parseInt(localStorage.getItem("providerID")) -
            this._opencard.getHasKey();
          break;
      }
      this.documentTypesForCurrrentNode = await this.getManualUploadDocTypes(
        null
      );
      listviewReq = attachDocReq;
    }
    return this.getAttachmentList(listviewReq);
  }

  getAttachmentList(listviewReq: any) {
    return new Promise((resolve) => {
      this._opencard.getAttachedDocsList(listviewReq).then((data: any) => {
        resolve(data.attachDocList);
      });
    });
  }

  getAttachedDocPrimaryKeyID(primaryKey: string) {
    const searchValue =
      primaryKey.charAt(0).toUpperCase() + primaryKey.substring(1);
    let scanDocumentPrimaryKeyID: Number;
    switch (searchValue) {
      case "ClientID":
        scanDocumentPrimaryKeyID = 1;
        break;
      case "ProviderID":
        scanDocumentPrimaryKeyID = 2;
        break;
      case "CaseActivityID":
        scanDocumentPrimaryKeyID = 3;
        break;
      case "PlacementID":
        scanDocumentPrimaryKeyID = 4;
        break;
      case "PlacementDetailID":
        scanDocumentPrimaryKeyID = 5;
        break;
      case "CourtOrderedID":
        scanDocumentPrimaryKeyID = 6;
        break;
      case "KanBeHealthyID":
        scanDocumentPrimaryKeyID = 7;
        break;
      case "AssessmentID":
        scanDocumentPrimaryKeyID = 8;
        break;
      case "CasePlanID":
        scanDocumentPrimaryKeyID = 9;
        break;
      case "BHDeterminationID":
        scanDocumentPrimaryKeyID = 10;
        break;
      case "AuthorizationID":
        scanDocumentPrimaryKeyID = 11;
        break;
      case "ClaimID":
        scanDocumentPrimaryKeyID = 12;
        break;
      case "ProviderLicenseID":
        scanDocumentPrimaryKeyID = 13;
        break;
      case "ReferralID":
        scanDocumentPrimaryKeyID = 14;
        break;
      case "AssessmentNCFCHOKID":
        scanDocumentPrimaryKeyID = 15;
        break;
      case "ReferralEventID":
        scanDocumentPrimaryKeyID = 16;
        break;
      case "MonthlyReportID":
        scanDocumentPrimaryKeyID = 17;
        break;
      case "ProviderContactID":
        scanDocumentPrimaryKeyID = 18;
        break;
      case "ProgressNoteID":
        scanDocumentPrimaryKeyID = 19;
        break;
      case "TherapyParticipantsID":
        scanDocumentPrimaryKeyID = 20;
        break;
      case "HealthExamID":
        scanDocumentPrimaryKeyID = 22;
        break;
      case "FamilySafetyID":
        scanDocumentPrimaryKeyID = 23;
        break;
      case "EvaluationID":
        scanDocumentPrimaryKeyID = 24;
        break;
      case "KippID":
        scanDocumentPrimaryKeyID = 25;
        break;
      case "UnusualIncidentID":
        scanDocumentPrimaryKeyID = 26;
        break;
      case "IndependentLivingID":
        scanDocumentPrimaryKeyID = 27;
        break;
      case "ClientGradeID":
        scanDocumentPrimaryKeyID = 28;
        break;
      case "CreditTrackingID":
        scanDocumentPrimaryKeyID = 29;
        break;
      case "SpecialEducationID":
        scanDocumentPrimaryKeyID = 30;
        break;
      case "SchoolReleaseID":
        scanDocumentPrimaryKeyID = 31;
        break;
      case "SponsorContractID":
        scanDocumentPrimaryKeyID = 32;
        break;
      case "ImmunizationID":
        scanDocumentPrimaryKeyID = 33;
        break;
      case "ProviderTrainingID":
        scanDocumentPrimaryKeyID = 34;
        break;
      case "ProviderStatusID":
        scanDocumentPrimaryKeyID = 35;
        break;
      case "FamilyMemberReferralID":
        scanDocumentPrimaryKeyID = 36;
        break;
      case "BADocID":
        scanDocumentPrimaryKeyID = 37;
        break;
      case "WaiverActivityID":
        scanDocumentPrimaryKeyID = 38;
        break;
      case "AdoptionID":
        scanDocumentPrimaryKeyID = 39;
        break;
      case "ProviderAdoptionID":
        scanDocumentPrimaryKeyID = 40;
        break;
      case "BestInterestStaffingID":
        scanDocumentPrimaryKeyID = 41;
        break;
      case "ClientSSIID":
        scanDocumentPrimaryKeyID = 42;
        break;
      case "LivingArrangementID":
        scanDocumentPrimaryKeyID = 43;
        break;
      case "ProgressNoteJJFCID":
        scanDocumentPrimaryKeyID = 44;
        break;
      case "StaffTrainingID":
        scanDocumentPrimaryKeyID = 45;
        break;
      case "GeneralEducationID":
        scanDocumentPrimaryKeyID = 46;
        break;
      case "ProviderLicenseExceptionID":
        scanDocumentPrimaryKeyID = 47;
        break;
      case "CustCareReportID":
        scanDocumentPrimaryKeyID = 48;
        break;
      case "ProviderSiteReviewID":
        scanDocumentPrimaryKeyID = 49;
        break;
    }
    return scanDocumentPrimaryKeyID;
  }

  masterNodesScannedDocumentTypeID() {
    const currentUrl = this._router.url;
    if (
      currentUrl.includes("/nc-hs/") ||
      currentUrl.includes("/bh-ok/detail") ||
      currentUrl === "/reports/referral/family-preservation/detail" ||
      currentUrl.includes("/nc-rfc") ||
      currentUrl.includes("/reintegration/referral/detail") ||
      currentUrl.includes("/nc-fch/detail") ||
      currentUrl.includes("/nc-ops/detail") ||
      currentUrl.includes("/jjfc/detail") ||
      currentUrl.includes("/nc-mhr/detail")
    ) {
      this.currentNode = "referral";
      return (this.scannedDocReq["scanDocumentPrimaryKeyID"] = 14);
    } else if (currentUrl.includes("/case-activity/detail")) {
      this.currentNode = "caseActivity";
      return (this.scannedDocReq["scanDocumentPrimaryKeyID"] = 3);
    }
    if (currentUrl.includes("/provider")) {
      this.currentNode = "provider";
      return (this.scannedDocReq["scanDocumentPrimaryKeyID"] = 2);
    }
  }

  getMasterNodesPrimaryKeyValue() {
    console.log("From manual attachment doc", this.currentNode);
  }

  async deleteAttachment(scannedDoumentID: number[]) {
    this.fileStatusText = "Deleting...";
    this.isDeleteBtnDisable = true;
    console.log("Delete initiated");
    const req = {
      module: "ScannedDocument",
      moduleID: scannedDoumentID,
      staffID: localStorage.getItem("UserId") || "4620",
    };
    await this._opencard.deleteAttachments(req);
    this.fileStatusText = "Deleted!";
    this.isDeleteBtnDisable = false;
    console.log("Delete completed");
  }
}
