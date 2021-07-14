import { Component, OnInit } from "@angular/core";
import { FpAssessments } from "./fp-assessments";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CaseTeamService } from "../../../case-team/case-team.service";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import { isNullOrUndefined } from "util";
import { ActivatedRoute, Router } from "@angular/router";
import { ClildFormService } from "../../../child-forms/child-forms.service";
import swal from "sweetalert2";
import * as moment from "moment";
import { LocalValues } from "../../../local-values";
import { MessageService } from "primeng/api";
import { CLIENTID, REFID, REFTYPEID } from "../../../../constants/AppConstants";
import { PlacementService } from "../../../placement/placement.service";

@Component({
  selector: "app-assessment-fp-form",
  templateUrl: "./assessment-fp-form.component.html",
  styleUrls: ["./assessment-fp-form.component.scss"],
})
export class AssessmentFpFormComponent implements OnInit {
  title: any = "Assessment";
  status = "draft";
  formStatus?: any;
  quickMenu = "referrel";
  subtitle: any;
  formControl: any;
  fpassess: FpAssessments = new FpAssessments();
  breadcrumbs = [];
  metaData = [];
  assessmentType = [];
  filteredAssessmentType = [];
  editControll = false;
  assessmentForm: FormGroup;
  selectedAssessmentGroups = [];
  isPdfFormData: any;
  pdfFormData: any;
  externalFormKey: any;
  display = false;
  isProgressReport = false;
  isIFA = false;
  isMentalHealth = false;
  prFormInput = false;
  referralTypeId: any;
  isViewAttachmentDisabled = true;
  url: any;
  isAttachmentRequired = false;
  dcfLabel = " DCF";
  req: any;
  // isView=false;
  discardTo = "/reports/referral/family-preservation/assessment/view";
  isForm = true;
  isList = false;
  isAppHeader = true;
  public assessmentList = [];

  isFormLog = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isPopUp = false;
  public CLIENT_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(CLIENTID)
  );
  public REF_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(REFID)
  );
  public REF_TYPE_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(REFTYPEID)
  );

  // tslint:disable-next-line:max-line-length
  constructor(
    public _fb: FormBuilder,
    public _caseTeam: CaseTeamService,
    public _opencard: OpencardsService,
    public _router: Router,
    public _client: ClildFormService,
    public _localValues: LocalValues,
    public _message: MessageService,
    public _activateRoute: ActivatedRoute,
    public _placement: PlacementService
  ) {}

  ngOnInit() {
    this.referralTypeId = this.REF_TYPE_ID;
    this.formControl = false;
    this.editControll = false;
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case Form",
        href: "/reports/referral/family-preservation/detail",
        active: "",
      },
      {
        label: "Assessment List",
        href: "/reports/referral/family-preservation/assessment/view",
      },
      { label: "Assessment", active: "active" }
    );

    this.formValidation();
    if (this._router.url.includes("detail")) {
      this.getAssessmentDetails();
      this.isAttachmentRequired = true;
    }
    let referralTypeId = this.REF_TYPE_ID;
    this._opencard.breadcurmbsDetermination(
      "assessments",
      referralTypeId,
      this.breadcrumbs
    );
    if (referralTypeId == 4) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "assessment-NCFCH",
        this.breadcrumbs
      );
    }
    if (referralTypeId == 5) {
      this.dcfLabel = " SRS";
    }
    if (referralTypeId === 15) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseForm-BHOK",
        this.breadcrumbs
      );
    }
    if (referralTypeId === 14) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "assessments-PRTF",
        this.breadcrumbs
      );
    }
    this.getAssessmentList();
  }

  /**
   * Fomr vaidation
   */
  formValidation() {
    this.assessmentForm = this._fb.group({
      assessmentCategory: [null],
      assessmentTypeID: [null],
      dueDate: [null],
      completedDate: [null],
      dateSentToSRS: [null],
      assessmentValue: [null],
      isOnTime: [null],
      isAccurate: [null],
      isNA: [null],
      notes: [null],
    });
  }

  /**
   * @param event autocomplete event
   */
  generateAssessmentType(event) {
    let req;
    this.assessmentType = [];
    req = { assessmentGroupID: event.assessmentGroupID };
    this._opencard.getAssessmentType(req).then((data) => {
      this.assessmentType = data.assessmentTypeList;
    });
  }

  /**
   *
   * @param event keyboard event
   */
  searchAssessmentType(event) {
    this.filteredAssessmentType = [];
    this.assessmentType.filter((item) => {
      if (item.assessmentType.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredAssessmentType.push(item);
      }
    });
  }

  /***
   * @param event  -  autocomplete event
   */
  async dueDateCalculation(event) {
    let daysDueFromReferral: any, referralDate: any, dueDate: any;
    daysDueFromReferral = event.daysDueFromReferral;
    referralDate = await this.getBeginDateFromOpenReferral();
    dueDate =
      referralDate !== null
        ? referralDate + daysDueFromReferral * 86400000
        : null;
    this.fpassess.dueDate = new Date(dueDate);
    // this.display = true;
    this.formNavigation(event.assessmentTypeID);
  }

  formNavigation(assessmentTypeID) {
    this.editControll = false;
    switch (assessmentTypeID) {
      case 64:
      case 65:
      case 66:
      case 67:
        this.isProgressReport = true;
        // this.isView=true;
        break;
      case 10:
      case 11:
      case 13:
        // kinship
        break;
      case 125:
        this.isIFA = true;
        break;
      case 81:
        this.isMentalHealth = true;
        break;
    }
  }

  /***
   * @param event autocomplete event
   * @param label req object
   */
  getMetaData(event, label) {
    let reqObj: any, request: any;
    switch (label) {
      case "asssessCat":
        reqObj = "assessmentGroup";
        break;
      case "frequency_type":
        reqObj = "frequencyType";
        break;
      case "risk":
        reqObj = "risk";
        break;
    }
    request = { Object: reqObj, value: event.query };
    this._caseTeam.getSearchList(request).then((data) => {
      this.metaData = data.dropDown;
    });
  }

  /**
   *
   * @param source assessments object
   */
  saveForm(source) {
    let referralId, clientId, referralTypeId;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    referralId = this.REF_ID;
    clientId = this.CLIENT_ID;
    !isNullOrUndefined(source.assessmentTypeID)
      ? (source.assessmentTypeID = source.assessmentTypeID.assessmentTypeID)
      : null;
    source.completedDate = this._localValues.stringFormatDatetime(
      source.completedDate
    );
    source.dateSentToSRS = this._localValues.stringFormatDatetime(
      source.dateSentToSRS
    );
    source.dueDate = this._localValues.stringFormatDatetime(source.dueDate);
    source.clientID = clientId;
    source.referralID = referralId;
    if (source.assessmentID) {
      this._opencard.updateAssessments(source).then((data) => {
        loader.style.display = "none";
        this.assessmentForm.disable();
        this.editControll = true;
        data.assessment.completedDate = this._localValues.stringFormatDatetime(
          data.assessment.completedDate
        );
        data.assessment.dateSentToSRS = this._localValues.stringFormatDatetime(
          data.assessment.dateSentToSRS
        );
        data.assessment.dueDate = this._localValues.stringFormatDatetime(
          data.assessment.dueDate
        );
        this.fpassess = data.assessment;
        referralTypeId = this.REF_TYPE_ID;
        if (this.isAppHeader) {
          swal("Updated", "Assessment details updated!", "success");
          return this._router.navigate(
            ["/reintegration/referral/opencard/assessments/view"],
            { queryParamsHandling: "preserve" }
          );
        } else {
          this._message.add({
            severity: "success",
            summary: "Updated!",
            detail: "The record has been updated!",
          });
          this.isForm = false;
          this.getAssessmentList();
          this.isList = true;
        }
      });
    } else {
      this._opencard.saveAsssessments(source).then((data) => {
        loader.style.display = "none";
        this.assessmentForm.disable();
        this.editControll = true;
        data.assessment.completedDate = this._localValues.stringFormatDatetime(
          data.assessment.completedDate
        );
        data.assessment.dateSentToSRS = this._localValues.stringFormatDatetime(
          data.assessment.dateSentToSRS
        );
        data.assessment.dueDate = this._localValues.stringFormatDatetime(
          data.assessment.dueDate
        );
        this.fpassess = data.assessment;
        swal("Save", "Assessment details saved!", "success");
        if (this.isAppHeader) {
          swal("Saved", "Assessment details saved!", "success");
          return this._router.navigate(
            ["/reintegration/referral/opencard/assessments/view"],
            { queryParamsHandling: "preserve" }
          );
        } else {
          this._message.add({
            severity: "success",
            summary: "Saved!",
            detail: "The record has been saved!",
          });
          this.isForm = false;
          this.getAssessmentList();
          this.isList = true;
        }
      });
    }
  }
  /***
   * Edit the form
   */
  editForm() {
    this.assessmentForm.enable();
    this.editControll = false;
    this.isViewAttachmentDisabled = false;
  }

  resetForm() {}

  discardForm() {
    if (this.isAppHeader) {
      let navigateURL: any, referralTypeID: any;
      referralTypeID = this.REF_TYPE_ID;
      if (referralTypeID === 1) {
        navigateURL = "/reintegration/referral/opencard/assessments/view";
      } else if (referralTypeID === 4) {
        navigateURL = "/reports/referral/family-preservation/assessment/view";
      } else {
        navigateURL = "/reports/referral/family-preservation/assessment/view";
      }
      this._router.navigate([navigateURL], { queryParamsHandling: "preserve" });
    } else {
      this.isForm = false;
      this.getAssessmentList();
      this.isList = true;
      this.editControll = false;
    }
  }

  /**
   * Get the assessment record by id
   */
  getAssessmentDetails() {
    let assessmentId, assessmentGroup;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    assessmentId = this._client.getId();
    this.req = { assessmentID: assessmentId };
    if (assessmentId) {
      this._opencard.getAssessmentRec(this.req).then((data) => {
        this.isFormLog = true;
        this.formLogInfo.changedBy = !isNullOrUndefined(
          data.assessment.changedBy
        )
          ? data.assessment.changedBy
          : "------";
        this.formLogInfo.changedDate = !isNullOrUndefined(
          data.assessment.changedDate
        )
          ? moment(data.assessment.changedDate).format("MM/DD/YYYY hh:mm:ss A")
          : "--:--:-- --";
        this.formLogInfo.enteredBy = !isNullOrUndefined(
          data.assessment.enteredBy
        )
          ? data.assessment.enteredBy
          : "------";
        this.formLogInfo.enteredDate = !isNullOrUndefined(
          data.assessment.enteredDate
        )
          ? moment(data.assessment.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
          : "--:--:-- --";

        localStorage.setItem("asssessmentId", data.assessment.assessmentID);
        !isNullOrUndefined(data.assessment.completedDate)
          ? (data.assessment.completedDate = new Date(
              data.assessment.completedDate
            ))
          : null;
        !isNullOrUndefined(data.assessment.dateSentToSRS)
          ? (data.assessment.dateSentToSRS = new Date(
              data.assessment.dateSentToSRS
            ))
          : null;
        !isNullOrUndefined(data.assessment.dueDate)
          ? (data.assessment.dueDate = new Date(data.assessment.dueDate))
          : null;

        // this.fpassess.assessmentCat = data.assessment.assessmentTypeID.assessmentGroupID;
        !isNullOrUndefined(data.assessment.assessmentTypeID)
          ? (this.fpassess.assessmentCat = data.assessment.assessmentTypeID)
          : null;
        this.fpassess = data.assessment;
        assessmentGroup = this.fpassess.assessmentTypeID;
        // this.fpassess.assessmentCat = assessmentGroup.assessmentGroupID
        !isNullOrUndefined(assessmentGroup)
          ? (this.fpassess.assessmentCat = assessmentGroup.assessmentGroupID)
          : null;
        loader.style.display = "none";
        this.assessmentForm.disable();
        this.editControll = true;
        if (data.pdfForms) {
          this.isPdfFormData = true;
          this.pdfFormData = data.pdfForms;
        }
        // !isNullOrUndefined(data.assessment.completedDate) ? data.assessment.completedDate = moment.utc(data.assessment.completedDate).format('MM/DD/YYYY') : null;
        // !isNullOrUndefined(data.assessment.dateSentToSRS) ? data.assessment.dateSentToSRS = moment.utc(data.assessment.dateSentToSRS).format('MM/DD/YYYY') : null;
        // !isNullOrUndefined(data.assessment.dueDate) ? data.assessment.dueDate = moment.utc(data.assessment.dueDate).format('MM/DD/YYYY') : null;
      });
    }
  }

  viewAttachment() {
    let typeOfDoc: any;
    typeOfDoc = this.pdfFormData.pdfForms;
    this.editControll = false;
    this.assessmentForm.enable();
    switch (typeOfDoc.typeOfDod) {
      case "progressReport":
        this.isProgressReport = true;
        this.prFormInput = true;
        break;
      case "assessment":
        this.isIFA = true;
        break;
      case "mentalHealthAssessment":
        this.isMentalHealth = true;
        break;
    }
  }

  getFormValue(event) {
    this._router.navigate([this._router.url]);
    this.isProgressReport = false;
    // this.isView=true;
    this.isIFA = false;
    this.isMentalHealth = false;
    this.fpassess.pdfForms = event.prForm;
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (
      currentURL == "/reintegration/referral/opencard/assessments/new" ||
      currentURL == "/reintegration/referral/opencard/assessments/detail"
    ) {
      this.url = "/reports/attachment-document/rfc/assessment";
    } else {
      this.url = "/reports/attachment-document/assessment";
    }
    return this._router.navigate([this.url]);
  }

  async getAssessmentList() {
    let request = {
      referralID: this.REF_ID,
      clientID: this.CLIENT_ID,
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "assessmentID", mode: "desc" },
    };
    let response = await this._opencard.getAssessementsByClient(request);
    this.assessmentList = response.assessment;
    return;
  }

  onClickAddForm() {
    this.isForm = true;
    this.isList = false;
    this.editControll = false;
    this.formValidation();
  }

  onClickEditForm(event: any) {
    let req = { assessmentID: event.assessmentID };
    this.req = req;
    let assessmentGroup;
    this.formValidation();
    this._opencard.getAssessmentRec(req).then((data) => {
      !isNullOrUndefined(data.assessment.completedDate)
        ? (data.assessment.completedDate = new Date(
            data.assessment.completedDate
          ))
        : null;
      !isNullOrUndefined(data.assessment.dateSentToSRS)
        ? (data.assessment.dateSentToSRS = new Date(
            data.assessment.dateSentToSRS
          ))
        : null;
      !isNullOrUndefined(data.assessment.dueDate)
        ? (data.assessment.dueDate = new Date(data.assessment.dueDate))
        : null;
      !isNullOrUndefined(data.assessment.assessmentTypeID)
        ? (this.fpassess.assessmentCat = data.assessment.assessmentTypeID)
        : null;
      this.fpassess = data.assessment;
      assessmentGroup = this.fpassess.assessmentTypeID;
      !isNullOrUndefined(assessmentGroup)
        ? (this.fpassess.assessmentCat = assessmentGroup.assessmentGroupID)
        : null;
      this.assessmentForm.disable();
      this.editControll = true;
      this.isPopUp = true;
      if (data.pdfForms) {
        this.isPdfFormData = true;
        this.pdfFormData = data.pdfForms;
      }
      this.isList = false;
      this.isForm = true;
    });
  }

  async onDelete(event: any) {
    await event;
    this.isForm = false;
    this.getAssessmentList();
    this.isList = true;
  }

  public async getBeginDateFromOpenReferral(): Promise<number> {
    let referralDetailRequest = { referralID: this.REF_ID };

    if (this.REF_TYPE_ID === 1) {
      //RFC
      const RFC_RES = await this._placement.getByIdReferral(
        referralDetailRequest
      );
      return RFC_RES.responseStatus
        ? new Date(RFC_RES.referral.receivedDateTime).getTime()
        : null;
    } else if (this.REF_TYPE_ID === 9) {
      //NC-OPS
      const OPS_RES = await this._opencard.getByIdOPSReferral(
        referralDetailRequest
      );
      return OPS_RES.responseStatus
        ? new Date(OPS_RES.referralDetails.beginDate).getTime()
        : null;
    } else if (this.REF_TYPE_ID === 4) {
      //NC-FCH
      const NCFCH_RES = await this._opencard.getRecByIdNCFCH(
        referralDetailRequest
      );
      return null; //testing failed
    } else if (this.REF_TYPE_ID === 2) {
      //FI
      const FI_RES = await this._opencard.getReferralDetailById(
        referralDetailRequest
      );
      return FI_RES.responseStatus
        ? new Date(FI_RES.referral.receivedDateTime).getTime()
        : null;
    } else if (this.REF_TYPE_ID === 5) {
      //NC-FI
      const NC_FI = await this._opencard.getReferralDetailById(
        referralDetailRequest
      );
      return NC_FI.responseStatus
        ? new Date(NC_FI.referral.receivedDateTime).getTime()
        : null;
    } else if (this.REF_TYPE_ID === 7) {
      //NC-RFC
      const NC_RFC = await this._opencard.getByIDNCRFC(referralDetailRequest);
      return NC_RFC.responseStatus
        ? new Date(NC_RFC.referral[0].beginDate).getTime()
        : null;
    } else if (this.REF_TYPE_ID === 15) {
      //BH OK
      const BH_OK = await this._opencard.getByIdBHOKreferral(
        referralDetailRequest
      );
      return BH_OK.responseStatus
        ? new Date(BH_OK.referral[0].beginDate).getTime()
        : null;
    } else if (this.REF_TYPE_ID === 11) {
      //NC-MHR
      const NC_MHR_REQ = { referralID: this.REF_ID, clientID: this.CLIENT_ID };
      const NC_MHR_RES = await this._opencard.getNCMHRReferralByID(NC_MHR_REQ);
      return NC_MHR_RES.responseStatus
        ? new Date(NC_MHR_RES.referralDetails.beginDate).getTime()
        : null;
    } else if (this.REF_TYPE_ID === 8) {
      //NC-HS
      const NC_HS = await this._opencard.getNCHSReferralByID(
        referralDetailRequest
      );
      return NC_HS.responseStatus
        ? new Date(NC_HS.referralDetails.beginDate).getTime()
        : null;
    } else if (this.REF_TYPE_ID === 20) {
      //SUB-RFC
      const SUB_RFC = await this._opencard.getSubContractByID(
        referralDetailRequest
      );
      return SUB_RFC.responseStatus
        ? new Date(SUB_RFC.referral.receivedDateTime).getTime()
        : null;
    } else if (this.REF_TYPE_ID === 14) {
      //PRTF
      //Get by id function not developed
      return null;
    } else {
      return null;
    }
  }
}
