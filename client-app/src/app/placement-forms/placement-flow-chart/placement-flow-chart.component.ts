import { Component, OnInit } from "@angular/core";
import { PlacementService } from "../../placement/placement.service";
import { FlowChart } from "./flow-chart";
import { isNullOrUndefined } from "util";
import { LocalValues } from "../../local-values";
import { TeamFormService } from "../../team-form/team-form.service";
import { CaseTeamService } from "../../case-team/case-team.service";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { ActivatedRoute } from "@angular/router";
import {
  CLIENTID,
  REFID,
  REFTYPEID,
  PLACEMENT_ID,
  PLACEMENT_DETAIL_ID,
  PLACEMENT_AUTHORIZATION_ID,
} from "../../../constants/AppConstants";
// import { RfcReferralService } from '../../reintegration/rfc-referral/rfc-referral.service';

@Component({
  selector: "app-placement-flow-chart",
  templateUrl: "./placement-flow-chart.component.html",
  styleUrls: ["./placement-flow-chart.component.scss"],
})
export class PlacementFlowChartComponent implements OnInit {
  placementData: FlowChart = new FlowChart();
  currentPlacementID: number;
  currentPlacementDetailID: number;
  formData: any;

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

  constructor(
    public _opencards: OpencardsService,
    public _CaseTeamService: CaseTeamService,
    public _team: TeamFormService,
    public _placement: PlacementService,
    public _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentPlacementID = this.PLACEMENT_ID;
    this.currentPlacementDetailID = this.PLACEMENT_DETAIL_ID; // Placement Detail id
    this.getData();
    this.getAuthData();
    this.getCommonData();
    this.getCaseTeamData();
    this.getReferralInfo();
    this.getPlacementDetailInfo();
    this.getPrintAck();
  }
  getPlacementDetailInfo(): any {
    const req = {
      placementDetailID:
        this._placement.getSavedPlacementDetailId() ||
        this.currentPlacementDetailID,
    };
    this._placement.getPlacementDetailInfo(req).then((data: any) => {
      !isNullOrUndefined(data.placementDetail.providerID)
        ? (this.placementData.providerName =
            data.placementDetail.providerID.providerName)
        : null;
      !isNullOrUndefined(data.placementDetail.providerLocationID)
        ? (this.placementData.providerAddress =
            data.placementDetail.providerLocationID.address1)
        : null;
      !isNullOrUndefined(data.placementDetail.providerLocationID)
        ? (this.placementData.providerPhone =
            data.placementDetail.providerLocationID.phone)
        : null;
      !isNullOrUndefined(data.placementDetail.providerLocationID)
        ? (this.placementData.providerCity =
            data.placementDetail.providerLocationID.cityID.city)
        : null;
      // !isNullOrUndefined(data.srsStaffID) ? this.placementData.srsPhone = data.srsStaffID.workPh : null;
      // !isNullOrUndefined(data.fswID) ? this.placementData.fswName = data.fswID.lastName + " " + data.fswID.firstName : null;
      // !isNullOrUndefined(data.fswID) ? this.placementData.fswPhone = data.fswID.cellPh : null;
      // !isNullOrUndefined(data.staffID) ? this.placementData.fcwName = data.staffID.lastName + " " + data.staffID.firstName : null;
      // !isNullOrUndefined(data.staffID) ? this.placementData.fcwPhone = data.staffID.cellPh : null;
    });
  }

  getReferralInfo(): any {
    const req = {
      referralID: this.REF_ID,
    };
    this._placement.getByIdReferral(req).then((data: any) => {
      !isNullOrUndefined(data.srsStaffID)
        ? (this.placementData.srsStaffName =
            data.srsStaffID.lastName + " " + data.srsStaffID.firstName)
        : null;
      !isNullOrUndefined(data.srsStaffID)
        ? (this.placementData.srsPhone = data.srsStaffID.workPh)
        : null;
      !isNullOrUndefined(data.fswID)
        ? (this.placementData.fswName =
            data.fswID.lastName + " " + data.fswID.firstName)
        : null;
      !isNullOrUndefined(data.fswID)
        ? (this.placementData.fswPhone = data.fswID.cellPh)
        : null;
      !isNullOrUndefined(data.staffID)
        ? (this.placementData.fcwName =
            data.staffID.lastName + " " + data.staffID.firstName)
        : null;
      !isNullOrUndefined(data.staffID)
        ? (this.placementData.fcwPhone = data.staffID.cellPh)
        : null;
    });
  }

  getCaseTeamData() {
    let req = {
      authorizationID: this.PLACEMENT_AUTH_ID,
    };

    this._CaseTeamService.getCaseManagerList(req).then((data) => {
      let caseManagerInfo =
        data.caseManagerList[data.caseManagerList.length - 1];
      data.caseManagerList.length > 0
        ? (this.placementData.caseManager = caseManagerInfo.CaseManagerName)
        : null;
      data.caseManagerList.length > 0
        ? (this.placementData.caseManagerPhone = caseManagerInfo.WorkPhone)
        : null;
    });
  }

  getCommonData() {
    const staffId = localStorage.getItem("UserId");

    if (localStorage.getItem("UserId")) {
      this._team.getUserById({ staffID: parseInt(staffId) }).then((data) => {});
    }
  }

  getAuthData(): any {
    let placementReq = {
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
          let authInfo =
            data.placementAuthorization[data.placementAuthorization.length - 1];
        });
    }
  }

  getData() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let placementReq = {
      placementID:
        this._placement.getSavedPlacementId() || this.currentPlacementID,
    };

    if (this._placement.getSavedPlacementId() || this.currentPlacementID) {
      this._placement.getPlacement(placementReq).then((data: any) => {
        !isNullOrUndefined(data.placement.clientID)
          ? (this.placementData.ssn = data.placement.clientID.ssn)
          : null;
        !isNullOrUndefined(data.placement.clientID)
          ? (this.placementData.client =
              data.placement.clientID.clientNameLastFirst)
          : null;
        !isNullOrUndefined(data.placement.clientID)
          ? (this.placementData.kaecses = data.placement.clientID.kaecses)
          : null;
        this._placement.storePlacementData(data);
        loader.style.display = "none";
      });
    }
  }

  async getPrintAck() {
    let request = {
      authorizationID: this.PLACEMENT_AUTH_ID,
      placementDetailID: this.PLACEMENT_DETAIL_ID,
      placementID: this.PLACEMENT_ID,
    };
    let response = await this._opencards.getPlacementContinumOfCareFlowChart(
      request
    );
    this.formData = response;
  }
}
