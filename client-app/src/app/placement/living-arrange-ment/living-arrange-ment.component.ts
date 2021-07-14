import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import LivingArrangment, { Authorization } from "./pl-living-arrangment";
import { CaseTeamService } from "../../case-team/case-team.service";
import { isNullOrUndefined } from "util";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { AuthorizationException } from "../placement";
import {LocalValues} from "../../local-values";
import swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { ClildFormService } from "../../child-forms/child-forms.service";
import * as moment from "moment";

@Component({
  selector: "app-living-arrange-ment",
  templateUrl: "./living-arrange-ment.component.html",
  styleUrls: ["./living-arrange-ment.component.scss"],
})
export class LivingArrangeMentComponent implements OnInit {
  mainTabs = [];
  sIndex = 0;
  breadcrumbs = [];
  isAuthExcepFormOpen: boolean;
  orgForm: FormGroup;
  livingArrangment: LivingArrangment = new LivingArrangment();
  authorization: Authorization = new Authorization();
  metaData = [];
  authExcep: AuthorizationException = new AuthorizationException();
  livingArrangementProcodes = [];
  filteredProcodes = [];
  discardTo =
    "/reintegration/referral/opencard/placement/living-arrangement/view";
  isAckOptions = false;
  printAckHeader = "Acknowledgement Options";
  moduleName = "livingArrangment";
  caseManagerList = [];
  caseManagerChangeReasonList = [];
  judgeList = [];
  schoolList = [];
  attendingHomeSchoolReasonList = [];
  reasonLateList = [];
  isEditMode = false;
  claimsList = [];
  selectedLivingArrangementId: number;
  isEdit = false;
  isAttachmentRequired = false;
  authorizationList = [];
  currentLivingArrangementID: number;
  newEndDate: Date;
  isOpenDeleteAuthListWindow = false;
  clientName: string;
  deletedAuthList = [];
  currentReferalID: number;
  isRespiteFactsDisabled = true;
  currentPlacementID: number;
  req: any;
  currentAuthorizationId: number;
  isPrintNavigation = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  isEndDateMandatory = false;

  constructor(
    public formBuilder: FormBuilder,
    public _caseTeam: CaseTeamService,
    public _opencard: OpencardsService,
    public _localValues: LocalValues,
    public _router: Router,
    public _client: ClildFormService,
    public _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentReferalID =
      parseInt(localStorage.getItem("referralId")) - this._opencard.getHasKey();
    this.currentLivingArrangementID =
      parseInt(this._activatedRoute.snapshot.queryParamMap.get("li_id")) ||
      parseInt(localStorage.getItem("livingArrangementID")) -
        this._opencard.getHasKey();
    this.currentPlacementID =
      parseInt(localStorage.getItem("placementID")) -
      this._opencard.getHasKey();
    this.clientName = localStorage.getItem("clientName");
    this.setIndex(0);
    this.formValidation();
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case Form",
        href: "/reintegration/referral/detail",
        active: "",
      },
      {
        label: "Placements List",
        active: "",
        href: "/reintegration/referral/opencard/placement/view",
      },
      {
        label: "Placements",
        active: "",
        href: "/reintegration/referral/opencard/placement/detail",
      },
      {
        label: "Living Arrangement List",
        active: "",
        href:
          "/reintegration/referral/opencard/placement/living-arrangement/view",
      },
      { label: "Living Arrangement", active: "active" }
    );
    if (this._localValues.placementProviderMode == "providers") {
      this.breadcrumbs = [];
      this.breadcrumbs.push(
        { label: "Person Types", href: "/reports/person/types", active: "" },
        { label: "Provider List", href: "/reports/provider/view", active: "" },
        {
          label: "Provider Form",
          href: "/reports/provider/detail",
          active: "",
        },
        {
          label: "Placement and Payments",
          active: "",
          href: "/provider/dashboard/placements-payments",
        },
        {
          label: "Provider Opencards",
          active: "",
          href: "/provider/dashboard",
        },
        {
          label: "Living Arrangement List",
          active: "",
          href: "/provider/opencard/living-arrangement/view",
        },
        { label: "Living Arrangement", active: "active" }
      );
    }

    /** Default auto fech config*/
    if (
      this._router.url.includes(
        "/reintegration/referral/opencard/placement/living-arrangement/new"
      )
    ) {
      this.autoFectchAuthorizationPayor();
      this.authorizationInformationAutoFill();
      let authorizationStatus = {
        authorizationStatus: "Active",
        authorizationStatusID: 3,
      };
      this.authorization.authorizationStatusID = authorizationStatus;
      this.livingArrangment.beginDate = new Date(
        new Date().setHours(0, 0, 0, 0)
      );
      this.livingArrangment.endDate = null;
      this.authorization.unitsAuth = parseInt("0").toFixed(2);
      this.findUnitsAuth = parseInt("0").toFixed(2);
      this.authorization.dateOverride = false;
      this.isEditMode = false;
    }

    if (
      this._router.url.includes(
        "/reintegration/referral/opencard/placement/living-arrangement/detail"
      )
    ) {
      this.getById();
      this.isEditMode = true;
      this.orgForm
        .get("unitsAuth")
        .clearValidators(); /**Clear validation for only on edit mode */
      this.isAttachmentRequired = true;
    }

    this.defineMainTabs();
    this.getLivingArrangementPrcodes();
  }

  setIndex(index: number) {
    this.sIndex = index;
  }

  defineMainTabs() {
    let tabs = [];

    if (this.isEditMode) {
      tabs = [{ label: "Living Arrangement", href: "#nav-sec1" }];
    } else {
      tabs = [
        { label: "Living Arrangement", href: "#nav-sec1" },
        { label: "Authorization Information", href: "#nav-sec2" },
      ];
    }
    return (this.mainTabs = tabs);
  }
  authException() {
    this.isAuthExcepFormOpen = true;
    this.authExcep.exceptionPayorRate = this.authorization.payorRate;
    this.authExcep.exceptionProviderRate = this.authorization.providerRate;
  }
  formValidation() {
    this.orgForm = this.formBuilder.group({
      // Living Arrangement Info
      beginDate: [null],
      endDate: [null],
      formReceivedDate: [null],
      providerID: [null, Validators.compose([Validators.required])],
      procodeID: [null, Validators.compose([Validators.required])],
      frequency: [null],
      payPlacement: [false],
      correctedCopy: [false],
      medicalCard: [false],
      inHome: [false],
      clarification: [null],
      addInfo: [null],
      sfaNotes: [null],
      placementID: [null],
      respitePlanned: [false],
      respiteUnplanned: [false],
      respiteTransitional: [false],
      respiteTypeID: [null],
      endAuthorizationEndDateDate: [null],

      // Authorization Info
      unitsAuth: [null, Validators.compose([Validators.required])],
      unitsPaidByPlacement: [null],
      dateOverride: [false],
      AuthorizationEndDate: [null],
      payorRate: [null],
      providerRate: [null],
      paySponsor: [false],
      payorID: [null],
      authorizationStatusID: [null],
      holdBedUnits: [null],
      holdBedPayorID: [null],
    });
  }

  formActions() {
    if (this.orgForm.valid) {
      const loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      this.livingArrangment.beginDate = !isNullOrUndefined(
        this.livingArrangment.beginDate
      )
        ? Date.parse(this.livingArrangment.beginDate)
        : null;
      this.livingArrangment.endDate = !isNullOrUndefined(
        this.livingArrangment.endDate
      )
        ? Date.parse(this.livingArrangment.endDate)
        : null;
      this.livingArrangment.formReceivedDate = !isNullOrUndefined(
        this.livingArrangment.formReceivedDate
      )
        ? Date.parse(this.livingArrangment.formReceivedDate)
        : null;
      this.livingArrangment.procodeID = !isNullOrUndefined(
        this.livingArrangment.procodeID
      )
        ? this.livingArrangment.procodeID.procodeID
        : null;
      this.authorization["unitsRemaining"] = this.authorization.unitsAuth;
      this.livingArrangment.providerID
        ? (this._localValues.livingArrangementProviderName = this.livingArrangment.providerID.providerName)
        : null;

      this.livingArrangment.providerID = !isNullOrUndefined(
        this.livingArrangment.providerID
      )
        ? this.livingArrangment.providerID.providerID
        : null;

      this.livingArrangment.respiteTypeID = !isNullOrUndefined(
        this.livingArrangment.respiteTypeID
      )
        ? this.livingArrangment.respiteTypeID.respiteTypeID
        : null;
      this.authorization.authorizationStatusID = !isNullOrUndefined(
        this.authorization.authorizationStatusID
      )
        ? this.authorization.authorizationStatusID.authorizationStatusID
        : null;
      this.authorization.payorID = !isNullOrUndefined(
        this.authorization.payorID
      )
        ? this.authorization.payorID.payorID
        : null;
      this.authorization.holdBedPayorID = !isNullOrUndefined(
        this.authorization.holdBedPayorID
      )
        ? this.authorization.holdBedPayorID.payorID
        : null;
      this.authorization.authorizationExceptionID = [this.authExcep];
      this.authorization.endDate = this._localValues.stringFormatDatetime(
        this.authorization.endDate
      );
      this.authorization.notes = null;
      this.authorization.beginDate = this._localValues.stringFormatDatetime(
        this.livingArrangment.beginDate
      );
      this.authorization.clientID =
        parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey();
      this.authorization.referralID =
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey();
      this.livingArrangment["sponsorID"] = !isNullOrUndefined(this.sponsorID)
        ? this.sponsorID
        : null;
      this.livingArrangment["clientID"] =
        parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey();
      this.livingArrangment["referralID"] =
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey();
      this.livingArrangment.authorization = this.authorization;
      this.livingArrangment.placementID = this.currentPlacementID;
      if (!this.authorization.dateOverride) {
        this.authorization.endDate = this._localValues.stringFormatDatetime(
          this.livingArrangment.endDate
        );
      }
      if (this.livingArrangment.livingArrangementID) {
        delete this.livingArrangment.authorization;
        console.log("Living arrangement edit req", this.livingArrangment);
        this._opencard
          .updateLivingArrangement(this.livingArrangment)
          .then((data: any) => {
            localStorage.setItem(
              "livingArrangementID",
              data.livingArrangementID + this._opencard.getHasKey()
            );
            this._localValues.livingArrangementProviderName = null;
            if (data.responseStatus) {
              swal(
                "Success",
                "Living arrangement has been updated!",
                "success"
              );
              loader.style.display = "none";
              return this._router.navigate([this._localValues.previousurl]);
              // this.getAcknowledgementDetails(this.currentAuthorizationId).then((data: any) => {
              //   this.isAckOptions = true;
              // })
            }
            loader.style.display = "none";
          });
      } else {
        this._opencard
          .saveLivingArrangments(this.livingArrangment)
          .then((data: any) => {
            this._localValues.livingArrangementProviderId = this.livingArrangment.providerID;
            localStorage.setItem(
              "livingArrangementID",
              data.livingArrangementID + this._opencard.getHasKey()
            );
            localStorage.setItem(
              "authorizationId",
              data.authorizationID + this._opencard.getHasKey()
            );
            loader.style.display = "none";
            if (data.responseStatus) {
              swal("Success", "Living arrangement has been saved!", "success");
            }
            this.getAcknowledgementDetails(data.authorizationID).then(
              (data: any) => {
                this.isAckOptions = true;
              }
            );
          });
      }
    } else {
      swal("Info", "Please fill the mandatory fields", "info");
    }
  }

  /**Drop down functions */
  getMetaData(label: string, event: any) {
    let req = {},
      object: any;
    switch (label) {
      case "provider":
        object = "provider";
        break;
      case "procode":
        object = "procode";
        break;
      case "staff":
        object = "staff";
        break;
      case "payor":
        object = "payor";
        break;
      case "authorizationStatus":
        object = "authorizationStatus";
        break;
      case "authorizationExceptionReason":
        object = "authorizationExceptionReason";
        break;
      case "respiteType":
        object = "respiteType";
        break;
    }

    req = { Object: object, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      if (object === "staff") {
        data.dropDown.map((item: any) => {
          item["fullName"] = `${item.lastName}, ${item.firstName}`;
        });
      }
      if (object === "procode") {
        data.dropDown.map((item: any) => {
          item["fullProcode"] = `${item.srsprocode}, ${item.categoryOfService}`;
        });
      }
      if (object === "payor") {
        data.dropDown.map((item: any) => {
          item["fullPayor"] = `${item.payorName} - ${item.alias}`;
        });
      }
      this.metaData = data.dropDown;
    });
  }

  getAuthExceptionValues() {
    this.authExcep.approvedBy_StaffID = !isNullOrUndefined(
      this.authExcep.approvedBy_StaffID
    )
      ? this.authExcep.approvedBy_StaffID.staffID
      : null;
    this.authExcep.authorizationExceptionReasonID = !isNullOrUndefined(
      this.authExcep.authorizationExceptionReasonID
    )
      ? this.authExcep.authorizationExceptionReasonID
          .authorizationExceptionReasonID
      : null;
    return (this.isAuthExcepFormOpen = false);
  }

  onChangeServiceProviderinHome(event: any) {
    if (event) {
      this.livingArrangment.clarification = "In-Home Respite";
    }
  }

  onChangeAuthoInfoUnits() {
    // if(!this.authorization.dateOverride) {
    this.newEndDate = new Date(
      Date.parse(this.livingArrangment.beginDate) +
        this.authorization.unitsAuth * this._localValues.timeStampValueForDay
    );
    this.authorization.endDate = this.newEndDate;
    // (this.authorization.dateOverride) ? this.livingArrangment.endDate = newEndDate : null;
    // }
    if (!this.authorization.dateOverride) {
      if (this.findUnitsAuth > this.authorization.unitsAuth) {
        // var d = new Date(this.livingArrangment.beginDate);
        // d.setDate(d.getDate() - this.authorization.unitsAuth);
        // this.livingArrangment.endDate = d;
        this.livingArrangment.endDate = new Date(
          Date.parse(this.livingArrangment.beginDate) +
            this.authorization.unitsAuth *
              this._localValues.timeStampValueForDay
        );
      } else if (this.findUnitsAuth < this.authorization.unitsAuth) {
        // var d = new Date(this.livingArrangment.beginDate);
        // d.setDate(d.getDate() + this.authorization.unitsAuth);
        // this.livingArrangment.endDate = d;
        this.livingArrangment.endDate = new Date(
          Date.parse(this.livingArrangment.beginDate) +
            this.authorization.unitsAuth *
              this._localValues.timeStampValueForDay
        );
      } else {
        this.authorization.unitsAuth = this.findUnitsAuth;
      }
    }
    this.authorization.unitsAuth = this.authorization.unitsAuth.toFixed(2);
    this.authorization.unitsPaidByPlacement = this.authorization.unitsAuth;
  }
  onChangeAuthoInfoPayor() {
    this.authorization.payorRate = this.authorization.payorRate.toFixed(2);
    this.authorization.providerRate = this.authorization.payorRate;
  }
  onChangeAuthoInfoProv() {
    this.authorization.providerRate = this.authorization.providerRate.toFixed(
      2
    );
  }
  onChangeOverRide(event: any) {
    if (event) {
      if (this.livingArrangment.endDate === null) {
        return (this.authorization.endDate = new Date());
      } else {
        return (this.authorization.endDate = new Date(
          this.livingArrangment.endDate
        ));
      }
    } else {
      // this.livingArrangment.endDate  = new Date(Date.parse(this.livingArrangment.beginDate) + (this.authorization.unitsAuth * this._localValues.timeStampValueForDay));
      if (this.findUnitsAuth > this.authorization.unitsAuth) {
        // var d = new Date(this.livingArrangment.beginDate);
        // d.setDate(d.getDate() - this.authorization.unitsAuth);
        // this.livingArrangment.endDate = d;
        this.livingArrangment.endDate = new Date(
          Date.parse(this.livingArrangment.beginDate) -
            this.authorization.unitsAuth *
              this._localValues.timeStampValueForDay
        );
      } else if (this.findUnitsAuth < this.authorization.unitsAuth) {
        // var d = new Date(this.livingArrangment.beginDate);
        // d.setDate(d.getDate() + this.authorization.unitsAuth);
        // this.livingArrangment.endDate = d;
        this.livingArrangment.endDate = new Date(
          Date.parse(this.livingArrangment.beginDate) +
            this.authorization.unitsAuth *
              this._localValues.timeStampValueForDay
        );
      } else {
        this.authorization.unitsAuth = this.findUnitsAuth;
      }
    }
  }

  getLivingArrangementPrcodes() {
    this._opencard.getLivingArrangmentProcodes().then((data: any) => {
      this.livingArrangementProcodes = data.procode;
    });
  }

  filteredLivingArrangmentProcodes(event: any) {
    this.filteredProcodes = [];
    this.livingArrangementProcodes.filter((item: any) => {
      if (item.procode.toLowerCase().indexOf(event.query) !== -1) {
        item["fullProcode"] = `${item.procode}, ${item.categoryOfService}`;
        this.filteredProcodes.push(item);
      }
    });
  }

  /**Acknowledgement print options */
  onClickAckPrintOptions(btnAction: string) {
    if (btnAction !== "ok") {
      if (this.printAckHeader === "Acknowledgement Options") {
        return (this.printAckHeader = "Acknowledgement (Return) Options");
      } else {
        this._localValues.isLivingArrangment = true;
        return this._router.navigate(["/placement-psa"], {
          queryParamsHandling: "preserve",
        });
      }
    } else {
      this._localValues.isLivingArrangment = false;
      return this._router.navigate(["/placement-acknowledgment"], {
        queryParamsHandling: "preserve",
      });
    }
  }

  /**Data for ackowledgement option window */
  async getAcknowledgementDetails(authID: any) {
    let referralBasedReq = {},
      authorizationReq = {},
      result: any;
    referralBasedReq = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
    };
    authorizationReq = { authorizationID: authID };
    this._opencard.getCaseManagerList(authorizationReq).then((data: any) => {
      this.caseManagerList = data.caseManagerList;
    });
    this._opencard.getCaseManagerChangeReasonList().then((data: any) => {
      this.caseManagerChangeReasonList = data.changeReasonList;
    });
    this._opencard.getJudgeList(authorizationReq).then((data: any) => {
      this.judgeList = data.judgeList;
    });
    this._opencard.getOpenSchoolList(referralBasedReq).then((data: any) => {
      this.schoolList = data.schoolList;
    });
    this._opencard.getAttendingSameSchoolReason().then((data: any) => {
      this.attendingHomeSchoolReasonList = data.schoolReasonList;
    });
    this._opencard.getReasonLate().then((data: any) => {
      this.reasonLateList = data.reasonLateList;
    });
  }

  getById() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.req = { livingArrangementID: this.currentLivingArrangementID };
    this.selectedLivingArrangementId =
      this._client.getId() ||
      parseInt(localStorage.getItem("livingArrangementID")) -
        this._opencard.getHasKey();
    this._opencard.getLivingArrangementById(this.req).then((data: any) => {
      this.isPrintNavigation = true;
      this.authorizationList = data.authorization;
      if (data.authorization.length > 0) {
        localStorage.setItem(
          "authorizationId",
          data.authorization[0].authorizationID + this._opencard.getHasKey()
        );
      }

      this.livingArrangment.providerID = data.providerList;
      this.livingArrangment.procodeID = {
        providerID: data.livingArrangement[0].procodeID,
        fullProcode: data.livingArrangement[0].procodeName,
      };
      data.livingArrangement[0].beginDate = !isNullOrUndefined(
        data.livingArrangement[0].beginDate
      )
        ? (this.livingArrangment.beginDate = new Date(
            data.livingArrangement[0].beginDate
          ))
        : null;
      data.livingArrangement[0].endDate = !isNullOrUndefined(
        data.livingArrangement[0].endDate
      )
        ? (this.livingArrangment.endDate = new Date(
            data.livingArrangement[0].endDate
          ))
        : null;
      data.livingArrangement[0].formReceivedDate = !isNullOrUndefined(
        data.livingArrangement[0].formReceivedDate
      )
        ? (this.livingArrangment.formReceivedDate = new Date(
            data.livingArrangement[0].formReceivedDate
          ))
        : null;
      this.livingArrangment.respiteTypeID = {
        respiteTypeID: data.livingArrangement[0].respiteTypeID,
        respiteType: data.livingArrangement[0].respiteType,
      };
      this.livingArrangment.frequency = data.livingArrangement[0].frequency;
      this.livingArrangment.payPlacement =
        data.livingArrangement[0].payPlacement;
      this.livingArrangment.correctedCopy =
        data.livingArrangement[0].correctedCopy;
      this.livingArrangment.medicalCard = data.livingArrangement[0].medicalCard;
      this.livingArrangment.inHome = data.livingArrangement[0].inHome;
      this.livingArrangment.clarification =
        data.livingArrangement[0].clarification;
      this.livingArrangment.addInfo = data.livingArrangement[0].addInfo;
      this.livingArrangment.sfaNotes = data.livingArrangement[0].sfaNotes;
      this.livingArrangment.livingArrangementID =
        data.livingArrangement[0].livingArrangementID;
      if (data.authorization.length > 0) {
        this.currentAuthorizationId = data.authorization[0].authorizationID;
      }

      this.claimsList = data.claimsList.claims;
      this.orgForm.disable();
      this.isEditMode = true;
      loader.style.display = "none";
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.livingArrangement[0].changedBy
      )
        ? data.livingArrangement[0].changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.livingArrangement[0].changedDate
      )
        ? moment(data.livingArrangement[0].changedDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.livingArrangement[0].enteredBy
      )
        ? data.livingArrangement[0].enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.livingArrangement[0].enteredDate
      )
        ? moment(data.livingArrangement[0].enteredDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
    });
  }

  onClickAuthEditView(auth: any) {
    return this._router.navigate(
      ["/reintegration/referral/placement-authorizations/detail"],
      {
        queryParams: {
          module: "livingArrangment",
          current_recId: auth.authorizationID,
          navigateFrom: "livingArragementDetail",
        },
        queryParamsHandling: "merge",
      }
    );
  }

  /** Navigate to the placement authorization new form */
  onClickAuthNewView() {
    return this._router.navigate(
      ["/reintegration/referral/placement-authorizations/new"],
      {
        queryParams: { module: "livingArrangement", action: "create" },
        queryParamsHandling: "merge",
      }
    );
  }

  getClaimsByAuthID(authID: any) {
    let req = {
      authorizationID: authID,
      beginPagination: 1,
      endPagination: 100,
    };
    this._opencard.getClaimsAuthById(req).then((data: any) => {
      this.claimsList = data.claim;
    });
  }

  /**Showing time based on local browser time */
  showTime(timeStamp: number) {
    return this._localValues.getDateandTimeWithExt(timeStamp);
  }

  onClickEditActions() {
    this.orgForm.enable();
    this.isRespiteFactsDisabled = false;
    this.isEdit = false;
  }

  /**For attachment documents */
  navigateTo() {
    let currentURL: string = this._router.url,
      navigateURL: string;
    if (
      currentURL.includes(
        "/reintegration/referral/opencard/placement/living-arrangement/detail"
      )
    ) {
      navigateURL =
        "/reports/attachment-document/living-arrangement-attachment";
    }
    return this._router.navigate([navigateURL], {
      queryParamsHandling: "preserve",
    });
  }

  openDeletedAuthorization() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = { referralID: this.currentReferalID };
    this._opencard.viewDeletePlacementAuthorization(req).then((data: any) => {
      if (data.responseStatus) {
        loader.style.display = "none";
        this.deletedAuthList = data.authorizationDeletedList;
        this.isOpenDeleteAuthListWindow = true;
      }
    });
  }
  sponsorID: any;
  onSelectProvider(event: any) {
    this.authorization.paySponsor = event.paySponsor;
    this.sponsorID = event.sponsorID;
  }

  onProcodeSelect(event: any) {
    if (event.categoryOfService.includes("Respite")) {
      this.isRespiteFactsDisabled = false;
    } else {
      this.isRespiteFactsDisabled = true;
    }
    if (event.procode.includes("CF015")) {
      this.isEndDateMandatory = true;
      this.orgForm.controls["endDate"].setValidators([
        Validators.compose([Validators.required]),
      ]);
      this.orgForm.controls["endDate"].updateValueAndValidity();
    } else {
      this.isEndDateMandatory = false;
      this.orgForm.controls["endDate"].clearValidators();
      this.orgForm.controls["endDate"].updateValueAndValidity();
    }
  }
  calcUnits: any;
  findUnitsAuth: any;
  calcBeginDate: any;
  unitCalculation() {
    if (
      this.livingArrangment.beginDate &&
      this.livingArrangment.endDate &&
      !this.authorization.dateOverride
    ) {
      var date1 = new Date(this.livingArrangment.beginDate);
      var date2 = new Date(this.livingArrangment.endDate);
      var Difference_In_Time = date2.getTime() - date1.getTime();
      var Difference_In_Days = (
        Difference_In_Time /
        (1000 * 3600 * 24)
      ).toString();
      this.calcUnits = Difference_In_Days.split(".");
      this.authorization.unitsAuth = parseInt(this.calcUnits[0]).toFixed(2);
      this.findUnitsAuth = this.authorization.unitsAuth;
      this.calcBeginDate = this.livingArrangment.beginDate;
      this.authorization.unitsPaidByPlacement = this.authorization.unitsAuth;
    }

    if (
      this.livingArrangment.beginDate &&
      this.livingArrangment.beginDate.getHours() === 12 &&
      this.livingArrangment.beginDate.getMinutes() === 0 &&
      this.livingArrangment.beginDate.getSeconds() === 0
    ) {
      this.livingArrangment.beginDate.setHours(0);
      this.livingArrangment.beginDate.setMinutes(0);
      this.livingArrangment.beginDate.setSeconds(0);
    }
  }
  isEndDate = false;
  showEndDate(event) {
    if (event) {
      this.isEndDate = false;
    } else {
      this.isEndDate = true;
    }
  }

  onClickJumptoClient() {
    let currentClientId = parseInt(this._localValues.currentClientID);
    let clientID = currentClientId + this._opencard.getHasKey();
    localStorage.setItem("clientId", clientID.toString());
    // localStorage.setItem('clientId', this._localValues.currentClientID);
    return this._router.navigate(["/reports/client/details"], {
      queryParams: {
        clientID: this._localValues.currentClientID,
        currentNode: "living_arrangement",
      },
    });
  }

  ngOnDestroy() {
    this._localValues.currentClientID = null;
  }
  getProviderList(event) {
    let req = {
      beginDate: this.livingArrangment.beginDate,
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencard.getHasKey(),
      value: event.query,
      beginPagination: 1,
      endPagination: 100,
    };
    this._caseTeam.getLivingProviderList(req).then((data: any) => {
      this.metaData = data.providerList;
    });
  }
  public authorizationInformationAutoFill() {
    this.authorization.payorRate = 0.0;
    this.authorization.providerRate = 0.0;
  }

  public async autoFectchAuthorizationPayor() {
    let request = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
    };
    let response = await this._opencard.getPayorForLivingArrangementByReferral(
      request
    );
    this.authorization.payorID = response;
    this.authorization.payorID[
      "fullPayor"
    ] = `${response.payorName} + ${response.alias}`;
    this.autoFetchHoldBedPayor();
  }

  public async autoFetchHoldBedPayor() {
    let request = {
      payorID: this.authorization.payorID.payorID,
      beginDate: this._localValues.stringFormatDatetime(
        new Date(this.livingArrangment.beginDate)
      ),
      placementID:
        parseInt(localStorage.getItem("placementID")) -
        this._opencard.getHasKey(),
    };
    let response = await this._opencard.getHoldBedPayorForLivingArrangementByPayor(
      request
    );
    this.authorization.holdBedPayorID = response;
    this.authorization.holdBedPayorID[
      "fullPayor"
    ] = `${response.payorName} + ${response.alias}`;
  }
}
