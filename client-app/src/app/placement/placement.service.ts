import { Injectable } from "@angular/core";
import { HomeService } from "../home/home.service";
import { OtpverficationService } from "../otpverfication/otpverfication.service";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { OpencardsService } from "../opecards-list-view/opencards.service";

@Injectable({
  providedIn: "root",
})
export class PlacementService {
  constructor(
    public _http: HttpClient,
    public _home: HomeService,
    public _otp: OtpverficationService,
    public _opencards: OpencardsService
  ) {}

  localUrl = environment.localUrl;
  storedPlacementData: any;
  storedSavedPlacementId: any;
  storedSavedPlacementDetailId: any;
  placementInfo: any;

  placementReferral = "/placement/getPlacementReferral";
  moveEvent = "/placement/getMoveEvent";
  reasonForMove = "/placement/getReasonForMove";
  reasonForChange = "/placement/getReasonForChange";
  clientSibling = "/placement/getClientSibling";
  clientAttendingSchool = "/placement/getClientAttendingSchool";
  school = "/placement/getSchool";
  homeSchool = "/placement/getHomeSchool";
  previousPlacementProvider = "/placement/getPreviousPlacementProvider";
  disruptionType = "/placement/getDisruptionType";
  disruptionReason = "/placement/getDisruptionReason";
  releasedOfCustody = "/placement/getReleasedOfCustody";
  releasedOfCustodyOverride = "/placement/getReleasedOfCustodyOverride";
  planEndDateOverride = "/placement/getPlanEndDateOverride";
  remainder = "placement/getReminder";
  placementDetail = "/placement/getPlacementDetail";
  placementAuthorization = "/placement/getPlacementAuthorization";
  placementClaim = "/placement/getPlacementClaim";
  placement = "/placement/getPlacement";
  referralDates = "/placement/getReferralDates";
  respiteAuthorization = "/placement/getRespiteAuthorization";
  reasonForNotPlacedTogether = "/placement/getReasonNotPlacedTogether";
  clientSchoolPlacement = "/placement/getClientSchoolPlacement";
  placementSave = "placement/save";
  emailTemplate = "sendEmailWithFileStream";
  placementCaseTeamInfo = "/placement/getCaseTeamInfo";
  placementDetailInfo = "/placementDetail/getById";
  referralGetById = "reintegrationFosterCare/getById";
  placementEventSave = "placementDetail/save";
  placementEventUpdate = "/placementDetail/update";
  placementEventDelete = "/placementDetail/delete";
  resourceParentDropdown = "/placementPlan/getResourceParent";
  placementUpdateAPI = "/placement/update";
  parentGuardianDropdown = "/placementPlan/getFamilyMember";
  providerLocationInfo = "/moveEvent/getProviderLocation";

  referralTypeId: number;
  referralID: number;

  /**
   *
   * @param req {referral id}
   */
  getPlacementReferral(req: any) {
    return this._http
      .post(this.localUrl + this.placementReferral, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req { referral id, unassignedOnly }
   */
  getMoveEvent(req: any) {
    return this._http
      .post(this.localUrl + this.moveEvent, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   * @param req { beginDate }
   */
  getReasonForMove(req: any) {
    return this._http
      .post(this.localUrl + this.reasonForMove, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   * @param req { beginDate }
   */
  getReasonForChange(req: any) {
    return this._http
      .post(this.localUrl + this.reasonForChange, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   * @param req { referralID,clientID,sibClientID }
   */
  getClientSiblings(req: any) {
    return this._http
      .post(this.localUrl + this.clientSibling, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req { referralID }
   */
  getClientSchoolplacement(req: any) {
    return this._http
      .post(this.localUrl + this.clientSchoolPlacement, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getClientAttendingSchool() {
    return this._http
      .get(this.localUrl + this.clientAttendingSchool)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req {clientSchoolID}
   */
  getSchool(req: any) {
    return this._http
      .post(this.localUrl + this.school, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req {referralID}
   */
  getHomeSchool(req: any) {
    return this._http
      .post(this.localUrl + this.homeSchool, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req {referralID, placementID}
   */
  getPreviousPlacementProvider(req: any) {
    return this._http
      .post(this.localUrl + this.previousPlacementProvider, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getdisruptionTypes() {
    return this._http
      .get(this.localUrl + this.disruptionType)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getdisruptionReason() {
    return this._http
      .get(this.localUrl + this.disruptionReason)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getReleasedOfCustody() {
    return this._http
      .get(this.localUrl + this.releasedOfCustody)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getReleasedOfCustodyOverride() {
    return this._http
      .get(this.localUrl + this.releasedOfCustodyOverride)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPlanEndDateOverride() {
    return this._http
      .get(this.localUrl + this.planEndDateOverride)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   * @param req - {referralID}
   */
  getRemainder(req: any) {
    return this._http
      .post(this.localUrl + this.remainder, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req {placementID}
   */
  getPlacementDetail(req: any) {
    return this._http
      .post(this.localUrl + this.remainder, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req {placementDetailID}
   */
  getPlacementAuthorization(req: any) {
    return this._http
      .post(this.localUrl + this.placementAuthorization, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData);
  }

  /**
   *
   * @param req {authorizationID}
   */
  getPlacementClaim(req: any) {
    return this._http
      .post(this.localUrl + this.placementClaim, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   * @param req {placementID}
   */
  getPlacement(req: any) {
    return this._http
      .post(this.localUrl + this.placement, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData);
  }

  /**
   * @param req {referralID}
   */
  getReferralDates(req: any) {
    return this._http
      .post(this.localUrl + this.referralDates, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req {placementID}
   */
  getRespiteAuthorization(req: any) {
    return this._http
      .post(this.localUrl + this.respiteAuthorization, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getReasonForNotPlacedTogether() {
    return this._http
      .get(this.localUrl + this.reasonForNotPlacedTogether)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPlacementById(req: any) {
    return this._http
      .get(this.localUrl + this.reasonForNotPlacedTogether)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  savePlacement(req: any) {
    return this._http
      .post(this.localUrl + this.placementSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  storePlacementData(data) {
    this.storedPlacementData = data;
  }

  sendEmail(req: any) {
    return this._http
      .post(this.localUrl + this.emailTemplate, req)
      .toPromise()
      .then(this._home.extractedData);
  }

  sendEmailMultiple(req: any) {
    return this._http
      .post(this.localUrl + "sendEmail", req)
      .toPromise()
      .then(this._home.extractedData);
  }

  sendAnEmail(req: any) {
    return this._http
      .post(this.localUrl + "/sendEmail", req)
      .toPromise()
      .then(this._home.extractedData);
  }

  storeSavedPlacementID(data) {
    this.storedSavedPlacementId = data;
  }

  getSavedPlacementId() {
    if (this.storedSavedPlacementId) {
      return this.storedSavedPlacementId;
    } else {
      return null;
    }
  }

  getlacementData() {
    if (this.storedPlacementData) {
      return this.storedPlacementData;
    } else {
      return null;
    }
  }

  storeSavedPlacementDetailID(data) {
    this.storedSavedPlacementDetailId = data;
  }

  getSavedPlacementDetailId() {
    if (this.storedSavedPlacementDetailId) {
      return this.storedSavedPlacementDetailId;
    } else {
      return null;
    }
  }

  getPlacementCaseTeamInfo(req): any {
    return this._http
      .post(this.localUrl + this.placementCaseTeamInfo, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPlacementDetailInfo(req: any) {
    return this._http
      .post(this.localUrl + this.placementDetailInfo, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData);
  }

  getByIdReferral(req) {
    return this._http
      .post(this.localUrl + this.referralGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  savePlacementEvent(req: any) {
    return this._http
      .post(this.localUrl + this.placementEventSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updatePlacementEvent(req: any) {
    return this._http
      .post(this.localUrl + this.placementEventUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  deletePlacementEvent(req: any) {
    return this._http
      .post(this.localUrl + this.placementEventDelete, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getResourceParent(req: any) {
    return this._http
      .post(this.localUrl + this.resourceParentDropdown, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updatePlacement(req: any) {
    return this._http
      .post(this.localUrl + this.placementUpdateAPI, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  setPlacementInfo(data) {
    this.placementInfo = data;
  }

  getPlacementInfo() {
    return this.placementInfo;
  }

  getParentGuardian(req: any) {
    return this._http
      .post(this.localUrl + this.parentGuardianDropdown, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderLocationInfo(req: any) {
    return this._http
      .post(this.localUrl + this.providerLocationInfo, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData);
  }
}
