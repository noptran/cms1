import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import swal from "sweetalert2";
import { isNullOrUndefined } from "util";
import { LocalValues } from "../local-values";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { ClildFormService } from "../child-forms/child-forms.service";
import {
  CLIENTID,
  PLACEMENT_AUTHORIZATION_ID,
  PLACEMENT_DETAIL_ID,
  PLACEMENT_ID,
  REFID,
  REFTYPEID,
} from "../../constants/AppConstants";

@Component({
  selector: "app-ack-options",
  templateUrl: "./ack-options.component.html",
  styleUrls: [
    "./ack-options.component.scss",
    "../referrals/family-preservation/family-preservation.component.scss",
  ],
  inputs: [
    "caseTeamList",
    "moduleName",
    "caseManagerChangeReasnonList",
    "judgeList",
    "openSchoolList",
    "attendingHomeSchoolReasonList",
    "reasonLateList",
    "isIndividualPrintForms",
    "urlFromFormFooterComp",
    "paramsFromFormFooterComp",
    "blankFromFormFooterComp",
    "draftFromFormFooterComp",
  ],
  outputs: ["showAck", "disableAck"],
})
export class AckOptionsComponent implements OnInit, OnDestroy {
  @Input()
  caseTeamList: any;
  moduleName: any;
  caseManagerChangeReasnonList: any;
  judgeList: any;
  openSchoolList: any;
  attendingHomeSchoolReasonList: any;
  reasonLateList: any;
  isIndividualPrintForms = false;
  urlFromFormFooterComp: string;
  paramsFromFormFooterComp: any;
  blankFromFormFooterComp: boolean;
  draftFromFormFooterComp: boolean;

  @Output()
  showAck = new EventEmitter();
  disableAck = new EventEmitter();

  caseTeamData: any;
  metaData = [];
  correctedCopy: any;
  printAckHeader = "Acknowledgement Options";
  filteredCaseManagerReason: any[];
  attendingSameHomeSchoolChangeReason: any;
  caseMangerChangeReason: any;
  filteredAttendingSameHomeSchoolChangeReason: any[];
  filteredReasonLate: any[];
  reasonLate: any;
  isPPS5120Form = false;
  isPSAForm = false;
  currentReferralID: number;
  currentPlacementID: number;
  currentPlacementReferral: number;
  currentPlacementDetailID: number;
  selectedCaseManager: any;
  selectedJudge: any;
  selectedSchool: any;
  clientSchoolList = [];
  clientToSchool: any;
  currentReferralTypeID: number;
  subModule: string;
  defaultSchool: any;
  isSchoolInfo = false;
  public placementPrintFormsSelectedInfo = { formName: "", pdfDocID: null };
  public individualPrintFormURL: string;
  public individualPrintFormParams: any;
  deletedPlacementRecordsCount: any;
  isPlacementDleteCountPrompt = false;
  public referralTypeId: number;
  public formAction: string;
  public isOkayBtnDisable = false;
  public currentPlacementEventID: any;

  public REF_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(REFID)
  );
  public CLINET_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(CLIENTID)
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
    public _localValues: LocalValues,
    public _router: Router,
    public _opencard: OpencardsService,
    public _activateRoute: ActivatedRoute,
    public _client: ClildFormService
  ) {}

  ngOnInit() {
    this._localValues.placementAckSchoolLateReason = "";
    this.clientSchoolList = [];
    this.selectedSchool = "";
    localStorage.removeItem("clientackSchool");
    this.getCaseManager();
    this.getCaseManagerChangeReason();
    this.getClientSchool();
    this.getSchoolChangeReason();
    this.getReasonOfLate();
    this.currentReferralID = parseInt(
      this._activateRoute.snapshot.queryParamMap.get("ref_id")
    );
    this.currentPlacementID = parseInt(
      this._activateRoute.snapshot.queryParamMap.get("p_id")
    );
    this.currentPlacementEventID = parseInt(
      this._activateRoute.snapshot.queryParamMap.get("pd_id")
    );
    this.currentPlacementReferral = parseInt(
      this._activateRoute.snapshot.queryParamMap.get("pl_ref_id")
    );
    this.currentPlacementDetailID = this.PLACEMENT_DETAIL_ID;
    this.currentReferralTypeID = this.REF_TYPE_ID;
    this.subModule = this._activateRoute.snapshot.queryParamMap.get("sub");
    this.formAction = this._activateRoute.snapshot.queryParamMap.get("action");
    this.getSelectedFormDetail();
    this.getPlacementReferralCaseManager();
  }

  getCaseTeamManager(event) {
    localStorage.setItem("caseTeamData", JSON.stringify(event));
    this.caseTeamData = event;
    this._localValues.ackOptionsCaseManagerInfo = event;
  }

  async ackOptions() {
    let returnValue = await this.onValidatePlacementSchool();
    if (returnValue.isCountinue) {
      this.schoolDisplayLogicInPrintPreviewForms();
      if (this.isIndividualPrintForms) {
        if (this.correctedCopy === true) {
          localStorage.setItem("correctedCopy", this.correctedCopy);
        } else {
          localStorage.setItem("correctedCopy", "false");
        }
        await this.UpdatePlacementPrintForms();
        return this.individualPrintFormNavigation();
      }
      if (
        (this.moduleName === "livingArrangment" ||
          this.subModule === "livingArrangement" ||
          this._router.url.includes("/other/service/detail") ||
          this._router.url.includes("living-arrangement")) &&
        this.moduleName !== "PlacementDelete"
      ) {
        if (this._router.url.includes("placement-ack")) {
          return this._router.navigate(["/placement-acknowledgment-return"], {
            queryParamsHandling: "preserve",
          });
        }
        await this.getPlacementLvingArrangementPrintForms();
        this._localValues.isLivingArrangment = true;
        this.attendingSameHomeSchoolChangeReason
          ? (this._localValues.livingArrangmentSchoolReason =
              this.attendingSameHomeSchoolChangeReason.attendingSameSchoolReason)
          : null;
        if (this._localValues.placementLivingArragmentFlowFlag === undefined) {
          this._localValues.placementLivingArragmentFlowFlag = "A";
        } else {
          this._localValues.placementLivingArragmentFlowFlag = "A1";
        }
        return this._router.navigate(["/placement-acknowledgment"], {
          queryParams: { sub: "livingArrangement" },
          queryParamsHandling: "merge",
        });
      } else {
        // if (this.caseTeamData === undefined) {
        //   swal('Warning', 'please select case manager', 'info');
        // }
        if (this.correctedCopy === true) {
          localStorage.setItem("correctedCopy", this.correctedCopy);
        } else {
          localStorage.setItem("correctedCopy", "false");
        }
        this.showAck.emit({
          status: true,
          caseTeam: this.caseTeamData,
          correctedCopy: this.correctedCopy,
        });
      }

      if (this.moduleName === "Placement") {
        await this.getPlacementPrintFormsDocId();
        if (!this._localValues.ackOptionsJudgeInfo) {
          if (this.judgeList) {
            this._localValues.ackOptionsJudgeInfo = this.judgeList[0];
          }
        }

        // if (this.caseTeamData === undefined) {
        //   swal('Warning', 'please select case manager', 'info');
        // }
        // else {
        // this._router.navigate(['/placement-acknowledgment'], { queryParams: { module: 'placement' }, queryParamsHandling: 'merge' });
        if (this._localValues.isPlacementNewValidationSet) {
          this._router.navigate(["/placement-event-status"], {
            queryParams: { module: "placement" },
            queryParamsHandling: "merge",
          });
        } else if (this.currentReferralTypeID === 11) {
          return this._router.navigate(["/placement-agreement"], {
            queryParams: { module: "placement" },
            queryParamsHandling: "merge",
          });
        } else if (this.currentReferralTypeID === 4) {
          return this._router.navigate(["/placement-event-status"], {
            queryParams: { module: "placement" },
            queryParamsHandling: "merge",
          });
        } else {
          this._router.navigate(["/placement-acknowledgment"], {
            queryParams: { module: "placement" },
            queryParamsHandling: "merge",
          });
        }
        // }
      }

      if (
        (this.moduleName === "PlacementEvent" ||
          this.moduleName === "placementEvent" ||
          this.subModule === "placement-event") &&
        this.moduleName !== "PlacementDelete"
      ) {
        await this.getPlacementEventPrintFormDocId();
        if (this.currentReferralTypeID === 4) {
          return this._router.navigate(["/placement-event-status"], {
            queryParams: { module: "placement" },
            queryParamsHandling: "merge",
          });
        }
        if (!this._localValues.ackOptionsJudgeInfo) {
          if (this.judgeList) {
            this._localValues.ackOptionsJudgeInfo = this.judgeList[0];
          }
        }

        // if (this.caseTeamData === undefined) {
        //   swal('Warning', 'please select case manager', 'info');
        // }
        // else {
        if (this._localValues.isPlacementNewValidationSet) {
          this._router.navigate(["/placement-event-status"], {
            queryParams: { module: "placement" },
            queryParamsHandling: "merge",
          });
        } else {
          this._router.navigate(["/placement-acknowledgment"], {
            queryParams: { module: "placement" },
            queryParamsHandling: "merge",
          });
        }

        // }
      }

      /*** Handle the navigation part for placement delete */

      if (this.moduleName === "PlacementDelete") {
        if (
          this.subModule === "livingArrangement" ||
          this._router.url.includes("placement/living-arrangement/")
        ) {
          return (this.isPlacementDleteCountPrompt = true);
        }
        this.isOkayBtnDisable = true;
        let count: any;
        const referralTypeId = this.REF_TYPE_ID;
        this.referralTypeId = referralTypeId;
        const req = {
          placementID: this.PLACEMENT_ID,
          referralID: this.REF_ID,
          clientID: this.CLINET_ID,
          placementDetailID: this.PLACEMENT_DETAIL_ID,
          staffID: parseInt(localStorage.getItem("UserId")) || 4620,
          caseManager: this.selectedCaseManager,
          changeReason: this.caseMangerChangeReason,
          judge: this.selectedJudge,
          school: this.selectedSchool,
          schoolReason: this.attendingSameHomeSchoolChangeReason,
          reasonLate: this.reasonLate,
        };

        const placementDeleteForms =
          await this._opencard.getAllPlacementDeletePrintForms(req);
        placementDeleteForms.ReferralNotificationOfMovePlacementChangeVoid !==
          null &&
        placementDeleteForms.ReferralNotificationOfMovePlacementChangeVoid !==
          undefined
          ? (this._localValues.referralNotificationOfMovePlacementChangeVoidDocID =
              placementDeleteForms.ReferralNotificationOfMovePlacementChangeVoid.pdfDocId)
          : null;

        placementDeleteForms.ProviderServiceAgreementVoid !== null &&
        placementDeleteForms.ProviderServiceAgreementVoid !== undefined
          ? (this._localValues.providerServiceAgreementDocID =
              placementDeleteForms.ProviderServiceAgreementVoid.pdfDocId)
          : null;

        if (placementDeleteForms.FCHElecSignPlacementAgreementVoid) {
          this._localValues.placementAgrementVoid =
            placementDeleteForms.FCHElecSignPlacementAgreementVoid.pdfDocId;
        } else if (placementDeleteForms.PlacementAgreementVoid) {
          this._localValues.placementAgrementVoid =
            placementDeleteForms.PlacementAgreementVoid.pdfDocId;
        } else if (placementDeleteForms.PlacementAgreement) {
          this._localValues.placementAgrementVoid =
            placementDeleteForms.PlacementAgreement.pdfDocId;
        } else {
          this._localValues.placementAgrementVoid = null;
        }
        this._localValues.placementEventStatusVoid = !isNullOrUndefined(
          placementDeleteForms.PlacementEventStatusVoid
        )
          ? placementDeleteForms.PlacementEventStatusVoid.pdfDocId
          : null;
        if (this.subModule === "placement-event") {
          let placementDetailReq = {
            placementDetailID: parseInt(
              localStorage.getItem("placementDetailId")
            ),
          };
          this.deletedPlacementRecordsCount =
            await this._opencard.placementEventDelete(placementDetailReq);
          this.isOkayBtnDisable = false;
        } else if (this.subModule === "") {
          if (this._activateRoute.snapshot.queryParamMap.get("sub") === "") {
            this.deletedPlacementRecordsCount =
              await this._opencard.deletePlacementRecord(req);
          }
        }
        localStorage.setItem("placementDeleteRecordsCount", count);
        if (referralTypeId === 4) {
          // NC-FCH(4) referral placement ack form flow

          return this._router.navigate(["/placement-event-status"], {
            queryParams: { action: "delete" },
            queryParamsHandling: "merge",
          });
        }
        this.isPlacementDleteCountPrompt = true;
      }
    } else {
      return swal("info", `${returnValue.message}`, "info");
    }
  }

  async cancel() {
    this.schoolDisplayLogicInPrintPreviewForms();
    // this.moduleName = this._activateRoute.snapshot.queryParamMap.get("sub");
    if (this.isIndividualPrintForms) {
      await this.UpdatePlacementPrintForms();
      return this.individualPrintFormNavigation();
    }
    if (
      this.moduleName === "livingArrangment" ||
      this.moduleName === "livingArrangement" ||
      this._router.url.includes(
        "/reintegration/referral/opencard/placement/living-arrangement"
      )
    ) {
      let currentURL = this._router.url.includes("?")
          ? this._router.url.split("?")[0]
          : this._router.url,
        navigateTo: any;
      // if (this.printAckHeader === 'Acknowledgement Options') {
      //   return this.printAckHeader = 'Acknowledgement (Return) Options';
      // } else {
      //   this._localValues.isLivingArrangment = true;
      //   return this._router.navigate(['/placement-acknowledgment'], { queryParams: { module: 'livingArrangement', action: null }, queryParamsHandling: 'merge' });
      // }
      switch (currentURL) {
        case "/reintegration/referral/opencard/placement/living-arrangement/new":
        case "/reintegration/referral/opencard/placement/living-arrangement/detail":
          this._router.navigate(["/placement-ack"], {
            queryParamsHandling: "preserve",
          });
          break;
        case "/placement-ack":
          this._router.navigate(["/placement-psa"], {
            queryParamsHandling: "preserve",
          });
          break;
      }
    } else if (
      this.moduleName === "Placement" ||
      this.moduleName === "placementEvent" ||
      this.moduleName === "placement-event"
    ) {
      await this.getPlacementPrintFormsDocId();

      // if (this.caseTeamData === undefined) {
      //   swal('Warning', 'please select case manager', 'info');
      // }
      // else {
      // this._router.navigate(['/placement-acknowledgment'], { queryParams: { module: 'placement' }, queryParamsHandling: 'merge' });
      if (this._localValues.isPlacementNewValidationSet) {
        this._router.navigate(["/placement-event-status"], {
          queryParams: { module: "placement" },
          queryParamsHandling: "merge",
        });
      } else if (this.currentReferralTypeID === 11) {
        return this._router.navigate(["/placement-agreement"], {
          queryParams: { module: "placement" },
          queryParamsHandling: "merge",
        });
      } else if (this.currentReferralTypeID === 4) {
        return this._router.navigate(["/placement-event-status"], {
          queryParams: { module: "placement" },
          queryParamsHandling: "merge",
        });
      } else {
        this._router.navigate(["/placement-acknowledgment"], {
          queryParams: { module: "placement" },
          queryParamsHandling: "merge",
        });
      }
      // }
    } else if (this.moduleName === "PlacementEvent") {
      await this.getPlacementPrintFormsDocId();
      if (!this._localValues.ackOptionsJudgeInfo) {
        if (this.judgeList) {
          this._localValues.ackOptionsJudgeInfo = this.judgeList[0];
        }
      }

      // if (this.caseTeamData === undefined) {
      //   swal('Warning', 'please select case manager', 'info');
      // }
      // else {
      if (this._localValues.isPlacementNewValidationSet) {
        this._router.navigate(["/placement-event-status"], {
          queryParams: { module: "placement" },
          queryParamsHandling: "merge",
        });
      } else if (this.currentReferralTypeID === 4) {
        return this._router.navigate(["/placement-event-status"], {
          queryParams: { module: "placement" },
          queryParamsHandling: "merge",
        });
      } else {
        this._router.navigate(["/placement-acknowledgment"], {
          queryParams: { module: "placement" },
          queryParamsHandling: "merge",
        });
      }

      // }
    } else {
      this.disableAck.emit("disable ack");
    }

    if (this.moduleName === "PlacementDelete") {
      this.isPlacementDleteCountPrompt = false;
      const req = {
        placementID: this.PLACEMENT_ID,
        referralID: this.REF_ID,
        clientID: this.CLINET_ID,
        placementDetailID: this.PLACEMENT_DETAIL_ID,
        staffID: parseInt(localStorage.getItem("UserId")) || 4620,
        caseManager: this.selectedCaseManager,
        changeReason: this.caseMangerChangeReason,
        judge: this.selectedJudge,
        school: this.selectedSchool,
        schoolReason: this.attendingSameHomeSchoolChangeReason,
        reasonLate: this.reasonLate,
      };
      const placementDeleteForms =
        await this._opencard.getAllPlacementDeletePrintForms(req);
      this._localValues.referralNotificationOfMovePlacementChangeVoidDocID =
        placementDeleteForms.ReferralNotificationOfMovePlacementChangeVoid.pdfDocId;
      this._localValues.providerServiceAgreementDocID =
        placementDeleteForms.ProviderServiceAgreementVoid.pdfDocId;
      if (placementDeleteForms.FCHElecSignPlacementAgreementVoid) {
        this._localValues.placementAgrementVoid =
          placementDeleteForms.FCHElecSignPlacementAgreementVoid.pdfDocId;
      } else if (placementDeleteForms.PlacementAgreementVoid) {
        this._localValues.placementAgrementVoid =
          placementDeleteForms.PlacementAgreementVoid.pdfDocId;
      } else if (placementDeleteForms.PlacementAgreement) {
        this._localValues.placementAgrementVoid =
          placementDeleteForms.PlacementAgreement.pdfDocId;
      } else {
        this._localValues.placementAgrementVoid = null;
      }
      this._localValues.placementEventStatusVoid = !isNullOrUndefined(
        placementDeleteForms.PlacementEventStatusVoid
      )
        ? placementDeleteForms.PlacementEventStatusVoid.pdfDocId
        : null;
      if (this.subModule === "placement-event") {
        let placementDetailReq = {
          placementDetailID: parseInt(
            localStorage.getItem("placementDetailId")
          ),
        };
        this.deletedPlacementRecordsCount =
          await this._opencard.placementEventDelete(placementDetailReq);
      } else {
        this.deletedPlacementRecordsCount =
          await this._opencard.deletePlacementRecord(req);
      }
      this.isPlacementDleteCountPrompt = true;
    }
  }

  getMetaData(label: string, event: any) {
    switch (label) {
      case "caseManagerChangeReason":
        this.caseManagerChangeReasonfilter(event);
        break;
      case "attendingSameHomeSchoolChangeReason":
        this.attendingSameHomeSchoolChangeReasonfilter(event);
        break;
      case "reasonLate":
        this.reasonLateFilter(event);
        break;
    }
  }

  caseManagerChangeReasonfilter(event: any) {
    this.filteredCaseManagerReason = [];
    this.caseManagerChangeReasnonList.filter((item: any) => {
      if (item.staffChangeReason.indexOf(event.query) !== -1) {
        this.filteredCaseManagerReason.push(item);
      }
    });
  }

  attendingSameHomeSchoolChangeReasonfilter(event: any) {
    this.filteredAttendingSameHomeSchoolChangeReason = [];
    this.attendingHomeSchoolReasonList.filter((item: any) => {
      if (
        item.attendingSameSchoolReason.toLowerCase().indexOf(event.query) !== -1
      ) {
        this.filteredAttendingSameHomeSchoolChangeReason.push(item);
      }
    });
  }

  reasonLateFilter(event: any) {
    this.filteredReasonLate = [];
    this.reasonLateList.filter((item: any) => {
      if (item.aCKReasonLate.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredReasonLate.push(item);
      }
    });
  }

  storeJudgeInfo(judgeInfo) {
    this._localValues.ackOptionsJudgeInfo = judgeInfo;
  }

  async getCaseManager() {
    // if (this._router.url.includes("/placement-ack") ) {
    const authReq = {
      authorizationID: this.PLACEMENT_AUTH_ID,
    };
    const response = await this._opencard.getCaseManagerList(authReq);
    this.caseTeamList = response.caseManagerList;
    // } else {
    //   await this.caseTeamList;
    // }
  }

  async getCaseManagerChangeReason() {
    return (this.caseManagerChangeReasnonList =
      await this._opencard.getCaseManagerChangeReason());
  }

  async getSchool() {
    return (this.openSchoolList = await this._opencard.getPlacemtnAckFormSchool(
      {
        referralID: this.REF_ID,
      }
    ));
  }

  async getSchoolChangeReason() {
    return (this.attendingHomeSchoolReasonList =
      await this._opencard.getPlacementAckSchoolChangeReason());
  }

  async getReasonOfLate() {
    return (this.reasonLateList =
      await this._opencard.getPlacementAckReasonOfLate());
  }

  async getPlacementCaseManager() {
    let authorizationID = null;
    if (
      this._router.url.includes("placementEvent") ||
      this.subModule === "placement-event"
    ) {
      authorizationID = this.PLACEMENT_AUTH_ID;
    }

    // else {
    //   authorizationID =
    //     parseInt(localStorage.getItem("authorizationId")) -
    //     this._opencard.getHasKey();
    // }
    const request = {
      authorizationID: authorizationID,
    };
    const response = await this._opencard.getCaseManagerList(request);
    return (this.caseTeamList = response.caseManagerList);
  }

  async getPlacementReferralCaseManager() {
    let isBlankExtComponent = this.blankFromFormFooterComp;
    let isDraftExtComponent = this.draftFromFormFooterComp;
    let request = {
      authorizationID: this.PLACEMENT_AUTH_ID,
      printPlacementReferralID: 0,
      isBlank: isBlankExtComponent,
      isDraft: isDraftExtComponent,
      isMedical: false,
      isMental: false,
      referralID: this.REF_ID,
      referralTypeID: this.REF_TYPE_ID,
      clientID: this.CLINET_ID,
      providerID: null,
      placementReferralID:
        this.currentPlacementReferral || this._client.getId(),
      placementDetailID: this.PLACEMENT_DETAIL_ID,
      isFlowChart: 0,
      elecSignPlacementAgreementID: null,
      printAcknowledgementID: null,
      printFCHFlowChartID: null,
      printFCHPlacementAgreementID: null,
      printProviderServiceAgreementID: null,
      releasedFromSRSCustodyClientID: null,
      emailed: false,
      exported: false,
      printed: false,
      isReturn: false,
      isVoid: false,
      history: "",
      pdf: "",
      reportType: "",
    };
    this._opencard
      .getPlacementReferralCaseManager(request)
      .then((data: any) => {
        this._localValues.printurl = data.document.url;
        return (this.caseTeamList = data.caseManagerList);
      });
  }
  async getPlacementPrintFormsDocId() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    const request = {
      placementID: this.PLACEMENT_ID,
      referralID: this.REF_ID,
      clientID: this.CLINET_ID,
      placementDetailID: this.PLACEMENT_DETAIL_ID,
      staffID: parseInt(localStorage.getItem("UserId")) || 4620,
      caseManager: this.selectedCaseManager,
      changeReason: this.caseMangerChangeReason,
      judge: this.selectedJudge,
      // school: this.selectedSchool,
      // schoolReason: this.attendingSameHomeSchoolChangeReason,
      fromClientSchoolID:
        this.selectedSchool.fromSchool !== null &&
        this.selectedSchool.fromSchool !== undefined
          ? this.selectedSchool.fromSchool.clientSchoolID
          : null,
      toClientSchoolID: !isNullOrUndefined(this.selectedSchool.toSchool)
        ? this.selectedSchool.toSchool.clientSchoolID
        : null,
      attendingSameSchoolReasonID: !isNullOrUndefined(
        this.attendingSameHomeSchoolChangeReason
      )
        ? this.attendingSameHomeSchoolChangeReason.attendingSameSchoolReasonID
        : null,
      reasonLate: this.reasonLate,
    };
    const response = await this._opencard.getAllPlacementPrintForms(request);

    if (response.ElecSignPlacementAgreement) {
      if (
        JSON.stringify(response.ElecSignPlacementAgreement) ==
        JSON.stringify({})
      ) {
        console.log("placementAgreement is empty!");
      } else {
        localStorage.setItem(
          "esignPdFDocID",
          response.ElecSignPlacementAgreement.pdfDocID
        );
      }
    } else if (response.PlacementAgreement) {
      if (JSON.stringify(response.PlacementAgreement) == JSON.stringify({})) {
        console.log("placementAgreement is empty!");
      } else {
        localStorage.setItem(
          "esignPdFDocID",
          response.PlacementAgreement.pdfDocID
        );
      }
    }

    this._localValues.placementAgreementKinshipDocID = !isNullOrUndefined(
      response.PlacementAgreementKinshipVoid
    )
      ? response.PlacementAgreementKinshipVoid.pdfDocId
      : null;
    this._localValues.providerServiceAgreementDocID = !isNullOrUndefined(
      response.ProviderServiceAgreementVoid
    )
      ? response.ProviderServiceAgreementVoid.pdfDocId
      : null;
    this._localValues.referralNotificationOfMovePlacementChangeVoidDocID =
      !isNullOrUndefined(response.ReferralNotificationOfMovePlacementChangeVoid)
        ? response.ReferralNotificationOfMovePlacementChangeVoid.pdfDocId
        : null;
    this._localValues.continuumofCareFlowChartDocID = !isNullOrUndefined(
      response.ContinuumofCareFlowChart
    )
      ? response.ContinuumofCareFlowChart.pdfDocId
      : null;
    this._localValues.placementAgreementKinshipDocID = !isNullOrUndefined(
      response.PlacementAgreementKinship
    )
      ? response.PlacementAgreementKinship.pdfDocId
      : null;
    this._localValues.placementAgreementKinshipAndAgencyApprovedDocID =
      !isNullOrUndefined(response.PlacementAgreementKinshipAndAgencyApproved)
        ? response.PlacementAgreementKinshipAndAgencyApproved.pdfDocId
        : null;
    this._localValues.placementEventStatusDocID = !isNullOrUndefined(
      response.PlacementEventStatus
    )
      ? response.PlacementEventStatus.pdfDocId
      : null;
    this._localValues.referralNotificationOfMovePlacementChangeDocID =
      !isNullOrUndefined(response.ReferralNotificationOfMovePlacementChange)
        ? response.ReferralNotificationOfMovePlacementChange.pdfDocId
        : null;
    this._localValues.referralNotificationOfMovePlacementChangeDocIDReturn =
      !isNullOrUndefined(
        response.ReferralNotificationOfMovePlacementChangeRespiteReturn
      )
        ? response.ReferralNotificationOfMovePlacementChangeRespiteReturn
            .pdfDocId
        : null;
    this._localValues.loadProviderEnvelopeDocID = !isNullOrUndefined(
      response.loadProviderEnvelope
    )
      ? response.loadProviderEnvelope.pdfDocId
      : null;
    this._localValues.providerServiceAgreementDocID = !isNullOrUndefined(
      response.ProviderServiceAgreement
    )
      ? response.ProviderServiceAgreement.pdfDocId
      : null;
    if (response.ElecSignPlacementAgreement) {
      this._localValues.PlacementAgreementID =
        response.ElecSignPlacementAgreement.pdfDocId;
    } else if (response.PlacementAgreement) {
      this._localValues.PlacementAgreementID =
        response.PlacementAgreement.pdfDocId;
    } else {
      this._localValues.PlacementAgreementID = null;
    }

    this._localValues.placementEventStatusVoid = !isNullOrUndefined(
      response.PlacementEventStatusVoid
    )
      ? response.PlacementEventStatusVoid.pdfDocId
      : null;

    if (response.FCHElecSignPlacementAgreementVoid) {
      this._localValues.placementAgrementVoid =
        response.FCHElecSignPlacementAgreementVoid.pdfDocId;
    } else if (response.PlacementAgreementVoid) {
      this._localValues.placementAgrementVoid =
        response.PlacementAgreementVoid.pdfDocId;
    } else {
      this._localValues.placementAgrementVoid = null;
    }

    loader.style.display = "none";
  }

  getSelectedCaseManager(item: any) {
    console.log("Selected case manager", item);
    const caseManager = {
      caseManagerName: item.caseManagerName,
      address: item.address,
      city: item.city,
      state: item.state,
      workPhone: item.workPhone,
      zipcode: item.zipcode,
    };
    console.log("Return case manager", caseManager);
    return (this.selectedCaseManager = caseManager);
  }

  onSelectedJudge(item: any) {
    console.log("Selected judge", item);
    const judge = {
      beginDate: item.beginDate,
      endDate: item.endDate,
      judgeName: item.judgeName,
      select: item.select,
    };
    console.log("Return judge", judge);
    return (this.selectedJudge = judge);
  }

  onSelectSchool(item: any) {
    console.log("Selected school", item);
  }

  // async getClientSchoolDropdown() {

  //   // let request = { referralID: 90 }

  //   this.clientSchoolList = response;
  // }

  async onFilteredClientSchool(event: any) {
    this.metaData = this.clientSchoolList.filter(
      (item) => item.clientSchoolName.toLowerCase().indexOf(event.query) !== -1
    );
  }

  async onSelectClientSchool(event: any) {
    this.selectedSchool = "";
    // if (this.clientSchoolList.length > 1) {
    //   const currentIndexValue: number[] = this.clientSchoolList
    //     .map((item, index) => {
    //       if (item.clientSchoolName == event.clientSchoolName) {
    //         return index;
    //       } else {
    //         return;
    //       }
    //     })
    //     .filter((item) => item !== undefined);
    //   this.clientToSchool =
    //     this.clientSchoolList[currentIndexValue[0] - 1].clientSchoolName !==
    //       null ||
    //     this.clientSchoolList[currentIndexValue[0] - 1].clientSchoolName !==
    //       undefined
    //       ? this.clientSchoolList[currentIndexValue[0] - 1]
    //       : "";
    // }
    let request = { clientSchoolID: event.clientSchoolID };
    let response = await this._opencard.getToSchoolBasedOnFromSchool(request);
    this.clientToSchool = response.ToSchool;
    this.selectedSchool = {
      fromSchool: {
        clientSchoolName: event.clientSchoolName,
        completedAddress: event.completedAddress,
        clientSchoolID: event.clientSchoolID,
      },
      toSchool: {
        clientSchoolName: !isNullOrUndefined(this.clientToSchool)
          ? this.clientToSchool.clientSchoolName
          : null,
        completedAddress: !isNullOrUndefined(this.clientToSchool)
          ? this.clientToSchool.completedAddress
          : null,
        clientSchoolID: !isNullOrUndefined(this.clientToSchool)
          ? this.clientToSchool.clientSchoolID
          : null,
      },
    };
    localStorage.removeItem("clientackSchool");
    localStorage.setItem(
      "clientackSchool",
      JSON.stringify(this.selectedSchool)
    );
  }

  async getPlacementLvingArrangementPrintForms() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    const request = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
      clientID:
        parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey(),
      staffID: parseInt(localStorage.getItem("UserId")) || 4620,
      enteredBy: !isNullOrUndefined(localStorage.getItem("UserEmail"))
        ? localStorage.getItem("UserEmail").split(".")[0]
        : "Test",
      livingArrangementID:
        parseInt(localStorage.getItem("livingArrangementID")) -
        this._opencard.getHasKey(),
      caseManager: this.selectedCaseManager,
      changeReason: this.caseMangerChangeReason,
      judge: this.selectedJudge,
      // school: this.selectedSchool,
      // schoolReason: this.attendingSameHomeSchoolChangeReason,
      fromClientSchoolID:
        this.selectedSchool.fromSchool !== null &&
        this.selectedSchool.fromSchool !== undefined
          ? this.selectedSchool.fromSchool.clientSchoolID
          : null,
      toClientSchoolID: !isNullOrUndefined(this.selectedSchool.toSchool)
        ? this.selectedSchool.toSchool.clientSchoolID
        : null,
      attendingSameSchoolReasonID: !isNullOrUndefined(
        this.attendingSameHomeSchoolChangeReason
      )
        ? this.attendingSameHomeSchoolChangeReason.attendingSameSchoolReasonID
        : null,
      reasonLate: this.reasonLate,
      schoolChange: this.isSchoolInfo ? true : false,
    };
    const response = await this._opencard.getLivingArrangementPrintForms(
      request
    );
    this._localValues.referralNotificationOfMovePlacementChangeDocID =
      !isNullOrUndefined(response.ReferralNotificationOfMovePlacementChange)
        ? response.ReferralNotificationOfMovePlacementChange.pdfDocId
        : null;
    this._localValues.referralNotificationOfMovePlacementChangeDocIDReturn =
      !isNullOrUndefined(
        response.ReferralNotificationOfMovePlacementChangeRespiteReturn
      )
        ? response.ReferralNotificationOfMovePlacementChangeRespiteReturn
            .pdfDocId
        : null;
    this._localValues.providerServiceAgreementDocID = !isNullOrUndefined(
      response.ProviderServiceAgreement
    )
      ? response.ProviderServiceAgreement.pdfDocId
      : null;
    this._localValues.faxListDOCID = !isNullOrUndefined(response.faxList)
      ? response.faxList.pdfDocId
      : null;
    if (response.ElecSignPlacementAgreement) {
      this._localValues.PlacementAgreementID =
        response.ElecSignPlacementAgreement.pdfDocId;
    } else if (response.PlacementAgreement) {
      this._localValues.PlacementAgreementID =
        response.PlacementAgreement.pdfDocId;
    } else {
      this._localValues.PlacementAgreementID = null;
    }
    loader.style.display = "none";
  }

  onSelectSchoolReasonForLate(event: any) {
    this._localValues.placementAckSchoolLateReason = event;
  }

  async getPlacementEventPrintFormDocId() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    const request = {
      placementID:
        parseInt(localStorage.getItem("placementEventID")) -
          this._opencard.getHasKey() || this.currentPlacementID,
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
      clientID:
        parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey(),
      placementDetailID:
        parseInt(localStorage.getItem("placementEventDetailID")) ||
        this.currentPlacementEventID,
      staffID: parseInt(localStorage.getItem("UserId")) || 4620,
      caseManager: this.selectedCaseManager,
      changeReason: this.caseMangerChangeReason,
      judge: this.selectedJudge,
      // school: this.selectedSchool,
      // schoolReason: this.attendingSameHomeSchoolChangeReason,
      reasonLate: this.reasonLate,
      fromClientSchoolID:
        this.selectedSchool.fromSchool !== null &&
        this.selectedSchool.fromSchool !== undefined
          ? this.selectedSchool.fromSchool.clientSchoolID
          : null,
      toClientSchoolID: !isNullOrUndefined(this.selectedSchool.toSchool)
        ? this.selectedSchool.toSchool.clientSchoolID
        : null,
      attendingSameSchoolReasonID: !isNullOrUndefined(
        this.attendingSameHomeSchoolChangeReason
      )
        ? this.attendingSameHomeSchoolChangeReason.attendingSameSchoolReasonID
        : null,
      schoolChange: this.isSchoolInfo ? true : false,
    };
    const response = await this._opencard.getAllPlacementPrintForms(request);

    if (response.ElecSignPlacementAgreement) {
      if (
        JSON.stringify(response.ElecSignPlacementAgreement) ==
        JSON.stringify({})
      ) {
        console.log("placementAgreement is empty!");
      } else {
        localStorage.setItem(
          "esignPdFDocID",
          response.ElecSignPlacementAgreement.pdfDocID
        );
      }
    } else if (response.PlacementAgreement) {
      if (JSON.stringify(response.PlacementAgreement) == JSON.stringify({})) {
        console.log("placementAgreement is empty!");
      } else {
        localStorage.setItem(
          "esignPdFDocID",
          response.PlacementAgreement.pdfDocID
        );
      }
    }

    this._localValues.placementAgreementKinshipDocID = !isNullOrUndefined(
      response.PlacementAgreementKinshipVoid
    )
      ? response.PlacementAgreementKinshipVoid.pdfDocId
      : null;
    this._localValues.providerServiceAgreementDocID = !isNullOrUndefined(
      response.ProviderServiceAgreementVoid
    )
      ? response.ProviderServiceAgreementVoid.pdfDocId
      : null;
    this._localValues.referralNotificationOfMovePlacementChangeVoidDocID =
      !isNullOrUndefined(response.ReferralNotificationOfMovePlacementChangeVoid)
        ? response.ReferralNotificationOfMovePlacementChangeVoid.pdfDocId
        : null;

    if (response.FCHElecSignPlacementAgreementVoid) {
      this._localValues.placementAgrementVoid =
        response.FCHElecSignPlacementAgreementVoid.pdfDocId;
    } else if (response.PlacementAgreementVoid) {
      this._localValues.placementAgrementVoid =
        response.PlacementAgreementVoid.pdfDocId;
    } else {
      this._localValues.placementAgrementVoid = null;
    }

    this._localValues.placementEventStatusVoid = !isNullOrUndefined(
      response.PlacementEventStatusVoid
    )
      ? response.PlacementEventStatusVoid.pdfDocId
      : null;

    this._localValues.continuumofCareFlowChartDocID = !isNullOrUndefined(
      response.ContinuumofCareFlowChart
    )
      ? response.ContinuumofCareFlowChart.pdfDocId
      : null;
    this._localValues.placementAgreementKinshipDocID = !isNullOrUndefined(
      response.PlacementAgreementKinship
    )
      ? response.PlacementAgreementKinship.pdfDocId
      : null;
    this._localValues.placementAgreementKinshipAndAgencyApprovedDocID =
      !isNullOrUndefined(response.PlacementAgreementKinshipAndAgencyApproved)
        ? response.PlacementAgreementKinshipAndAgencyApproved.pdfDocId
        : null;
    this._localValues.placementEventStatusDocID = !isNullOrUndefined(
      response.PlacementEventStatus
    )
      ? response.PlacementEventStatus.pdfDocId
      : null;
    this._localValues.referralNotificationOfMovePlacementChangeDocID =
      !isNullOrUndefined(response.ReferralNotificationOfMovePlacementChange)
        ? response.ReferralNotificationOfMovePlacementChange.pdfDocId
        : null;
    this._localValues.referralNotificationOfMovePlacementChangeDocIDReturn =
      !isNullOrUndefined(
        response.ReferralNotificationOfMovePlacementChangeRespiteReturn
      )
        ? response.ReferralNotificationOfMovePlacementChangeRespiteReturn
            .pdfDocId
        : null;
    this._localValues.loadProviderEnvelopeDocID = !isNullOrUndefined(
      response.loadProviderEnvelope
    )
      ? response.loadProviderEnvelope.pdfDocId
      : null;
    this._localValues.providerServiceAgreementDocID = !isNullOrUndefined(
      response.ProviderServiceAgreement.pdfDocId
    )
      ? response.ProviderServiceAgreement.pdfDocId
      : null;
    if (response.ElecSignPlacementAgreement) {
      this._localValues.PlacementAgreementID =
        response.ElecSignPlacementAgreement.pdfDocId;
    } else if (response.PlacementAgreement) {
      this._localValues.PlacementAgreementID =
        response.PlacementAgreement.pdfDocId;
    } else {
      this._localValues.PlacementAgreementID = null;
    }
    loader.style.display = "none";
  }

  async getClientSchool() {
    this.clientSchoolList = [];
    const request = {
      referralID: this.REF_ID,
    };
    this.clientSchoolList =
      await this._opencard.placementAckClientSchoolDropdown(request);
    this.metaData = this.clientSchoolList;
    this.defaultSchool = this.clientSchoolList[0];
    if (this.defaultSchool) {
      this.selectedSchool = {
        fromSchool: {
          clientSchoolName: this.defaultSchool.clientSchoolName,
          completedAddress: this.defaultSchool.completedAddress,
          clientSchoolID: this.defaultSchool.clientSchoolID,
        },
        toSchool: {},
      };
    }
    localStorage.removeItem("clientackSchool");
    localStorage.setItem(
      "clientackSchool",
      JSON.stringify(this.selectedSchool)
    );
  }

  ngOnDestroy() {
    this.getCaseManager();
    this.getCaseManagerChangeReason();
    this.getClientSchool();
    this.getSchoolChangeReason();
    this.getReasonOfLate();
  }

  async getLivingArrangmentDeletePDFFormValues() {
    const request = {
      staffID: parseInt(localStorage.getItem("UserId")) || 4620,
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
      clientID:
        parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey(),
      livingArrangementID:
        parseInt(localStorage.getItem("livingArrangementID")) -
        this._opencard.getHasKey(),
      caseManager: this.selectedCaseManager,
      changeReason: this.caseMangerChangeReason, // selected changes,
      school: this.selectedSchool,
      schoolReason: this.attendingSameHomeSchoolChangeReason, // selected school reason,
      reasonLate: this.reasonLate, // selected reason late
    };
    let response = await this._opencard.getLivingArrangementPrintForm(request);
    response.ProviderServiceAgreementVoid !== null &&
    response.ProviderServiceAgreementVoid !== undefined
      ? (this._localValues.providerServiceAgreementDocIDVoid =
          response.ProviderServiceAgreementVoid.pdfDocId)
      : null;

    response.ReferralNotificationOfMovePlacementChangeVoid !== null &&
    response.ReferralNotificationOfMovePlacementChangeVoid !== undefined
      ? (this._localValues.referralNotificationOfMovePlacementChangeVoidDocID =
          response.ReferralNotificationOfMovePlacementChangeVoid.pdfDocId)
      : null;

    response.ReferralNotificationOfMovePlacementChangeRespiteReturnVoid !==
      null &&
    response.ReferralNotificationOfMovePlacementChangeRespiteReturnVoid !==
      undefined
      ? (this._localValues.referralNotificationOfMovePlacementChangeDocIDReturn =
          response.ReferralNotificationOfMovePlacementChangeRespiteReturnVoid.pdfDocId)
      : null;

    // response.ReferralNotificationOfMovePlacementChangeVoid !== null &&
    // response.ReferralNotificationOfMovePlacementChangeVoid !== undefined
    //   ? (this._localValues.referralNotificationOfMovePlacementChangeVoidDocID =
    //       response.ReferralNotificationOfMovePlacementChangeVoid.pdfDocId)
    //   : null;

    response.ProviderServiceAgreementVoid !== null &&
    response.ProviderServiceAgreementVoid !== undefined
      ? (this._localValues.providerServiceAgreementDocID =
          response.ProviderServiceAgreementVoid.pdfDocId)
      : null;

    // if (response.FCHElecSignPlacementAgreementVoid) {
    //   this._localValues.placementAgrementVoid =
    //     response.FCHElecSignPlacementAgreementVoid.pdfDocId;
    // } else if (response.PlacementAgreementVoid) {
    //   this._localValues.placementAgrementVoid =
    //     response.PlacementAgreementVoid.pdfDocId;
    // } else if (response.PlacementAgreement) {
    //   this._localValues.placementAgrementVoid =
    //     response.PlacementAgreement.pdfDocId;
    // } else {
    //   this._localValues.placementAgrementVoid = null;
    // }
    // this._localValues.placementEventStatusVoid = !isNullOrUndefined(
    //   response.PlacementEventStatusVoid
    // )
    //   ? response.PlacementEventStatusVoid.pdfDocId
    //   : null;
  }

  /**
   * Logic for showing the section-5 school information
   */
  schoolDisplayLogicInPrintPreviewForms() {
    this._localValues.placementAttendingSchoolLogic = { show: "", hide: "" };
    /**
     * Case 1:  "School change" uncheck and "Attending Same Home School Reason" is empty - School related data should be empty in Section-6
     */
    if (
      this.isSchoolInfo === false &&
      this.attendingSameHomeSchoolChangeReason === undefined
    ) {
      return (this._localValues.placementAttendingSchoolLogic = {
        show: "none",
        hide: "all",
      });
    } else if (
      /**
       * Case 2: "School change" uncheck "Attending Same Home School Reason" value is there - "same" school line 1 alone + Selected attending school reason
       */
      this.isSchoolInfo === false &&
      this.attendingSameHomeSchoolChangeReason !== undefined
    ) {
      return (this._localValues.placementAttendingSchoolLogic = {
        show: "same_school_line_alone",
        hide: "all",
      });
    } else if (
      /**
       * Case 3: "School change" checked "Attending Same Home School Person" Value is not there - "School change value needs to be there" isssue - true value. Attending school reason not be default
       */
      this.isSchoolInfo !== false &&
      this.attendingSameHomeSchoolChangeReason === undefined
    ) {
      return (this._localValues.placementAttendingSchoolLogic = {
        show: "same_school_line_alone",
        hide: "school_change_section",
      });
    } else if (
      /**
       * Case 4: "School change" checked "Attending Same Home School Person" value is there - "Same school".
       */
      this.isSchoolInfo !== false &&
      this.attendingSameHomeSchoolChangeReason !== undefined
    ) {
      return (this._localValues.placementAttendingSchoolLogic = {
        show: "all",
        hide: "all",
      });
    } else {
      return;
    }
  }

  async updatePlacementPrinfFormInfo() {
    this.ngOnInit();
    await this.UpdatePlacementPrintForms();
  }

  getSelectedFormDetail() {
    let url = this.urlFromFormFooterComp;
    let params = this.paramsFromFormFooterComp;
    switch (url) {
      case "/placement-acknowledgment":
        this.placementPrintFormsSelectedInfo.formName =
          "ReferralNotificationOfMovePlacementChange";
        this.placementPrintFormsSelectedInfo.pdfDocID =
          this._localValues.referralNotificationOfMovePlacementChangeDocID;
        this.individualPrintFormURL = url;
        this.individualPrintFormParams = params;
        break;
      case "/placement-acknowledgment-return":
        this.placementPrintFormsSelectedInfo.formName =
          "ReferralNotificationOfMovePlacementChangeReturn";
        this.placementPrintFormsSelectedInfo.pdfDocID =
          this._localValues.referralNotificationOfMovePlacementChangeDocIDReturn;
        this.individualPrintFormURL = url;
        this.individualPrintFormParams = params;
        break;

      case "/placement-psa":
        this.placementPrintFormsSelectedInfo.formName =
          "ProviderServiceAgreement";
        this.placementPrintFormsSelectedInfo.pdfDocID =
          this._localValues.providerServiceAgreementDocID;
        this.individualPrintFormURL = url;
        this.individualPrintFormParams = params;
        break;
      case "/placement-event-status":
        this.placementPrintFormsSelectedInfo.formName = "PlacementEventStatus";
        this.placementPrintFormsSelectedInfo.pdfDocID =
          this._localValues.placementEventStatusDocID;
        this.individualPrintFormURL = url;
        this.individualPrintFormParams = params;
        break;
      case "/placement-agreement":
        this.placementPrintFormsSelectedInfo.formName = "PlacementAgreement";
        this.placementPrintFormsSelectedInfo.pdfDocID =
          this._localValues.PlacementAgreementID;
        this.individualPrintFormURL = url;
        this.individualPrintFormParams = params;
        break;
      default:
        this.placementPrintFormsSelectedInfo.formName = "";
        this.placementPrintFormsSelectedInfo.pdfDocID = null;
        this.individualPrintFormURL = url;
        this.individualPrintFormParams = params;
    }
    return this.placementPrintFormsSelectedInfo;
  }

  public async UpdatePlacementPrintForms() {
    let request = {
      pdfDocID: this.placementPrintFormsSelectedInfo.pdfDocID,
      formName: this.placementPrintFormsSelectedInfo.formName,
      changeReason: this.caseMangerChangeReason,
      schoolReason: this.attendingSameHomeSchoolChangeReason,
      reasonLate: this.reasonLate,
      caseManager: this.selectedCaseManager,
      judge: this.selectedJudge,
      fromClientSchoolID:
        this.selectedSchool.fromSchool !== null &&
        this.selectedSchool.fromSchool !== undefined
          ? this.selectedSchool.fromSchool.clientSchoolID
          : null,
      toClientSchoolID: !isNullOrUndefined(this.selectedSchool.toSchool)
        ? this.selectedSchool.toSchool.clientSchoolID
        : null,
      attendingSameSchoolReasonID: !isNullOrUndefined(
        this.attendingSameHomeSchoolChangeReason
      )
        ? this.attendingSameHomeSchoolChangeReason.attendingSameSchoolReasonID
        : null,
      schoolChange: this.isSchoolInfo ? true : false,
    };
    await this._opencard.placementFormsDetailUpdate(request);
  }

  public individualPrintFormNavigation() {
    return this._router.navigate([this.individualPrintFormURL], {
      queryParams: this.individualPrintFormParams,
      queryParamsHandling: "merge",
    });
  }

  public navigateToPlacementEventStatus() {
    return this._router.navigate(["/placement-event-status"], {
      queryParams: { action: "delete" },
      queryParamsHandling: "merge",
    });
  }

  public navigateToPlacementAgreement() {
    this._router.navigate([], {
      queryParams: { action: "delete" },
      queryParamsHandling: "merge",
    });
    this.isPPS5120Form = true;
    return this.disableAck.emit({ isPrompt: false, isPPS5120Form: true });
  }

  public onClickDeletedCountsPrompt() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.subModule = this._activateRoute.snapshot.queryParamMap.get("sub");
    this.isPlacementDleteCountPrompt = false;
    if (this.referralTypeId === 4) {
      loader.style.display = "none";
      return this.navigateToPlacementEventStatus();
    } else {
      if (this.subModule === "livingArrangement") {
        loader.style.display = "none";
        return this._router.navigate(["/placement-acknowledgment"], {
          queryParams: { action: "delete" },
          queryParamsHandling: "merge",
        });
      } else {
        loader.style.display = "none";
        return this.navigateToPlacementAgreement();
      }
    }
  }

  public async onValidatePlacementSchool() {
    let request = {
      referralID: this.REF_ID,
      fromClientSchoolID:
        this.selectedSchool.fromSchool !== null &&
        this.selectedSchool.fromSchool !== undefined
          ? this.selectedSchool.fromSchool.clientSchoolID
          : null,
      toClientSchoolID:
        this.selectedSchool.toSchool !== null &&
        this.selectedSchool.toSchool !== undefined
          ? this.selectedSchool.toSchool.clientSchoolID
          : null,
      attendingSameSchoolReasonID:
        this.attendingSameHomeSchoolChangeReason !== null &&
        this.attendingSameHomeSchoolChangeReason !== undefined
          ? this.attendingSameHomeSchoolChangeReason.attendingSameSchoolReasonID
          : null,
      placementID: this.PLACEMENT_ID,
    };
    let response = await this._opencard.validatingPlacementSchool(request);
    console.log("OnvalidationgPlacementSchool", response.responseStatus);
    if (!response.responseStatus) {
      return { isCountinue: false, message: `${response.responseMessage}` };
    } else {
      return { isCountinue: true, message: `${response.responseMessage}` };
    }
  }
}
