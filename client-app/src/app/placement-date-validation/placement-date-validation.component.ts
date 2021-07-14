import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import {
  REFID,
  CLIENTID,
  PLACEMENT_ID,
  PLACEMENT_DETAIL_ID,
  REFTYPEID,
  PLACEMENT_AUTHORIZATION_ID,
} from "../../constants/AppConstants";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { PlacementDateLogger } from "./placement-date-log";

@Component({
  selector: "app-placement-date-validation",
  templateUrl: "./placement-date-validation.component.html",
  styleUrls: ["./placement-date-validation.component.scss"],
  outputs: ["overallValidationOut", "exitValidation"],
})
export class PlacementDateValidationComponent implements OnInit {
  index: number = 0;
  logger: PlacementDateLogger[] = [];
  parentInfo: string;
  errorPlacementList = [];
  errorPlacementDetailList = [];
  errorPlacementAuthList = [];
  public isExitValidation = false;
  @Output()
  exitValidation = new EventEmitter();
  overallValidationOut = new EventEmitter();
  public REF_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(REFID)
  );
  public CLI_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(CLIENTID)
  );
  public PLACEMENT_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(PLACEMENT_ID)
  );
  public PLACEMENT_DETAIL_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(PLACEMENT_DETAIL_ID)
  );
  public REF_TYPE_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(REFTYPEID)
  );
  public PLACEMENT_AUTHORIZATION_ID = parseInt(
    this._activateRoute.snapshot.queryParamMap.get(PLACEMENT_AUTHORIZATION_ID)
  );

  constructor(
    public _opencard: OpencardsService,
    public _router: Router,
    public _activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.overallValidation();
  }

  public openPrev() {
    this.index = this.index === 0 ? 3 : this.index - 1;
  }

  public openNext() {
    this.index = this.index === 3 ? 0 : this.index + 1;
  }

  public async overallValidation() {
    /**This overall validations based on the previous step returns true then only
     * it'll allow to further steps, So here nested loop is implemented.
     */
    let step1: any;
    let step2: any;
    let step3: any;
    let step4: any;
    if ((step1 = await this.checkStep1())) {
      if ((step2 = await this.checkStep2())) {
        if ((step3 = await this.checkStep3())) {
          step4 = await this.checkStep4();
        }
      }
    }
    this.overallValidationOut.emit({ step1, step2, step3, step4 });
  }

  public async checkStep1() {
    let loggerData = {
      dateTime: moment().format("L LTS"),
      activity: "Running step one. placement validation",
    };
    this.logger.push(loggerData);
    return await this.placementDateCheck();
  }
  public checkStep2() {
    this.index = this.index + 1;
    let loggerData = {
      dateTime: moment().format("L LTS"),
      activity: "Running step two. placement event validation",
    };
    this.logger.push(loggerData);
    return this.placementEventDateCheck();
  }
  public checkStep3() {
    this.index = this.index + 1;
    let loggerData = {
      dateTime: moment().format("L LTS"),
      activity: "Running step three, placement authorization validation",
    };
    this.logger.push(loggerData);
    return this.placementAuthorizaionCheck();
  }
  public checkStep4() {
    this.index = this.index + 1;
    let loggerData = {
      dateTime: moment().format("L LTS"),
      activity: "Running step four, placement authorization units validation",
    };
    this.logger.push(loggerData);
    return this.placementAuthUnitsCheck();
  }

  public async placementDateCheck() {
    let request = {
      referralID: this.REF_ID,
    };
    let response = await this._opencard.validationPlacementDateCheck(request);

    if (response.placementList.length !== 0) {
      this.parentInfo = response.parentInfo;
      this.errorPlacementList = response.placementList;
      let loggerDataStep1Error = {
        dateTime: moment().format("L LTS"),
        activity:
          "Placement validation completed, Error Found! See 'Results' below to fix.",
      };
      this.logger.push(loggerDataStep1Error);
      return false; // For test purpose changed as true from false
    } else {
      let loggerDataStep1 = {
        dateTime: moment().format("L LTS"),
        activity: "Placement validation completed, No data errors found.",
      };
      this.logger.push(loggerDataStep1);
      return true;
    }
  }

  public onSelectPlacementError(placementID: number) {
    localStorage.setItem(
      "placementID",
      (placementID + this._opencard.getHasKey()).toString()
    );
    const placementUrl = this._router.serializeUrl(
      this._router.createUrlTree(
        ["/reintegration/referral/opencard/placement/detail"],
        {
          queryParams: { p_id: placementID },
          queryParamsHandling: "merge",
        }
      )
    );
    window.open(
      placementUrl,
      "_blank",
      "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
    );
  }

  public async placementEventDateCheck() {
    let placementEventDateRequest = {
      referralID: this.REF_ID,
    };

    let placementEventDateResponse =
      await this._opencard.validationPlacementEventCheck(
        placementEventDateRequest
      );

    if (placementEventDateResponse.placementList.length !== 0) {
      this.parentInfo = placementEventDateResponse.placementList;
      this.errorPlacementDetailList =
        placementEventDateResponse.placementDetailList;
      let loggerDataStep2Error = {
        dateTime: moment().format("L LTS"),
        activity:
          "Placement event validation completed, Error Found! See 'Results' below to fix.",
      };
      this.logger.push(loggerDataStep2Error);
      return false; // For test purpose changed as true from false
    } else {
      let loggerDataStep2 = {
        dateTime: moment().format("L LTS"),
        activity: "Placement event validation completed, No data errors found.",
      };
      this.logger.push(loggerDataStep2);
      return true;
    }
  }

  public onSelectPlacementEventError(
    placementID: number,
    placementDetailId: number
  ) {
    localStorage.setItem(
      "placementID",
      (placementID + this._opencard.getHasKey()).toString()
    );
    localStorage.setItem("placementDetailId", placementDetailId.toString());
    const placementEventURL = this._router.serializeUrl(
      this._router.createUrlTree(
        ["reintegration/referral/opencard/placement/placementEvent/detail"],
        {
          queryParams: { p_id: placementID, pd_id: placementDetailId },
          queryParamsHandling: "merge",
        }
      )
    );

    window.open(
      placementEventURL,
      "_blank",
      "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
    );
  }

  public async placementAuthorizaionCheck() {
    let placementAuthReq = {
      referralID: this.REF_ID,
    };
    let placementAuthRes =
      await this._opencard.placementValidationPlacementAuthDateCheck(
        placementAuthReq
      );
    if (placementAuthRes.placementDetailList.length !== 0) {
      this.parentInfo = placementAuthRes.placementDetailList;
      this.errorPlacementAuthList = placementAuthRes.AuthorizationList;
      let loggerDataStep3Error = {
        dateTime: moment().format("L LTS"),
        activity:
          "Placement authorization validation completed, Error Found! See 'Results' below to fix.",
      };
      this.logger.push(loggerDataStep3Error);
      return false; // For test purpose changed as true from false
    } else {
      let loggerDataStep3 = {
        dateTime: moment().format("L LTS"),
        activity:
          "Placement authorization validation completed, No data errors found.",
      };
      this.logger.push(loggerDataStep3);
      return true;
    }
  }

  public onSelectPlacementAuthError(
    authorizationID: number,
    placementDetailID: number
  ) {
    localStorage.setItem(
      "authorizationId",
      (authorizationID + this._opencard.getHasKey()).toString()
    );
    const placementAuthURL = this._router.serializeUrl(
      this._router.createUrlTree(
        ["reintegration/referral/placement-event-authorizations/detail"],
        {
          queryParams: {
            action: "edit",
            module: "authorization",
            current_recId: authorizationID,
            pd_id: placementDetailID,
          },
          queryParamsHandling: "merge",
        }
      )
    );
    window.open(
      placementAuthURL,
      "_blank",
      "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
    );
  }

  public async placementAuthUnitsCheck() {
    let authUnitsReq = {
      referralID: this.REF_ID,
    };
    let authUnitsRes =
      await this._opencard.placementValidationPlacemntUnitsAuthCheck(
        authUnitsReq
      );
    if (authUnitsRes.responseStatus) {
      let loggerDataStep4 = {
        dateTime: moment().format("L LTS"),
        activity: "Placement authorization units validation completed",
      };
      this.logger.push(loggerDataStep4);
      return true;
    } else {
      let loggerDataStep4Error = {
        dateTime: moment().format("L LTS"),
        activity: "Placement authorization units validation incompleted",
      };
      this.logger.push(loggerDataStep4Error);
      return false;
    }
  }

  public onCancelClick = () => {
    return (this.isExitValidation = true);
  };

  public onClickYesInExitValidation() {
    this.exitValidation.emit({ resultOut: "Yes" });
    console.log("placement validation exit!!", this.exitValidation);
  }

  public onClickCancelnExitValidation = () => {
    return (this.isExitValidation = false);
  };
}
