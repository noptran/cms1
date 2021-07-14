import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { OtpverficationService } from "../otpverfication/otpverfication.service";
import { HomeService } from "../home/home.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CaseTeamService {
  endPoint = environment;
  id;
  clientId: any;
  phaseID: any;

  constructor(
    public _http: HttpClient,
    public _otp: OtpverficationService,
    public _home: HomeService
  ) {}

  /**
   * returns case team member list
   */

  getCaseTeamList(data) {
    return this._http
      .post(this.endPoint.localUrl + "/caseTeam/list", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getCaseTeamById(data) {
    return this._http
      .post(this.endPoint.localUrl + "/caseTeam/list/id", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  storeId(data) {
    this.id = data;
    console.log("this.id", this.id);
  }

  getId() {
    return this.id;
  }

  // searchList

  getSearchList(data) {
    return this._http
      .post(this.endPoint.localUrl + "/dropDown/contains", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProviderClient(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/getProviderClient",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPayeeClient(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/getPayeeClient",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProviderSponsor(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/provider/getProvidersponsor",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveOtherService(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/authorization/save",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateOtherService(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/authorization/update",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getClaimsByClient(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/getClaimsByClient",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  // Homecounty

  getHomeCountyList(data) {
    return this._http
      .post(this.endPoint.localUrl + "/homeCounty/list", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getHomeCountyById(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/homeCounty/getById",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveHomeCounty(data) {
    return this._http
      .post(this.endPoint.localUrl + "/homeCounty/save", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateHomeCounty(data) {
    return this._http
      .post(this.endPoint.localUrl + "/homeCounty/update", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  // SFCS Officer

  getSfcsOfficerList(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/sfaOfficeActivity/list",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getSfcsOfficerById(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/sfaOfficeActivity/getById",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveSfcsOfficer(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/sfaOfficeActivity/save",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateSfcsOfficer(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/sfaOfficeActivity/update",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  // Phase

  getPhaseList(data) {
    return this._http
      .post(this.endPoint.localUrl + "/phase/list", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPhaseById(data) {
    return this._http
      .post(this.endPoint.localUrl + "/phase/getByPhase", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  savePhase(data) {
    return this._http
      .post(this.endPoint.localUrl + "/phase/save", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updatePhase(data) {
    return this._http
      .post(this.endPoint.localUrl + "/phase/update", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   * set the selected phase id
   * @returns store the phase id
   * @param id phase id
   */
  setPhaseID(id) {
    return (this.phaseID = id);
  }

  /***
   * @returns selected phase id
   */
  getPhaseID() {
    return this.phaseID;
  }

  // Phase Activity

  getPhaseActivityList(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/phaseActivity/list",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPhaseActivityById(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/phaseActivity/getByPhaseActivity",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  savePhaseActivity(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/phaseActivity/save",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updatePhaseActivity(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/phaseActivity/update",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  // NonTherapyFaceToFace

  getNonTherapyFaceToFaceList(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/nonTherapyFaceToFace/list",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getNonTherapyFaceToFaceById(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/nonTherapyFaceToFace/getById",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  // Client Profile

  getClientProfileList(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/clientProfile/list",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getClientProfileById(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/clientProfile/getById",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveClientProfile(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/clientProfile/save",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateClientProfile(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/clientProfile/update",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  // Court Case

  getCourtCaseList(data) {
    return this._http
      .post(this.endPoint.localUrl + "/courtCase/list", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getCourtCaseById(data) {
    return this._http
      .post(this.endPoint.localUrl + "/courtCase/getById", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveCourtCase(data) {
    return this._http
      .post(this.endPoint.localUrl + "/courtCase/save", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateCourtCase(data) {
    return this._http
      .post(this.endPoint.localUrl + "/courtCase/update", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  setClientDeatail(clientId) {
    return (this.clientId = clientId);
  }

  getClientDetail() {
    return this.clientId;
  }

  getClientDetailsByClientId(data) {
    return this._http
      .post(environment.localUrl + "/clientProfile/list", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getTotalCouuntsOfMaster() {
    return this._http
      .get(environment.localUrl + "/person/count")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getTotalCountForOpencards(req) {
    return this._http
      .post(
        environment.localUrl + "/client/opencards/count",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getMetadata(req) {
    return this._http
      .post(
        environment.localUrl + "/client/opencards/count",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getReferralByCleintId(req) {
    return this._http
      .post(environment.localUrl + "/client/referral/list", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveTPL(req) {
    return this._http
      .post(environment.localUrl + "/clientTpl/save", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateTPL(req) {
    return this._http
      .post(environment.localUrl + "/clientTpl/update", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getTPLByRecID(req) {
    return this._http
      .post(environment.localUrl + "/clientTpl/getById", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getAuthorizationId(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/getAuthorization",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  // encounter report

  generateRunReport(data) {
    return this._http
      .post(this.endPoint.localUrl + "/claim/runReport", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getSubmissionList(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/submissionList",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getReloadSubmission(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/reloadSubmission",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPostCreateTxtFile(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/postCreateFile",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProcodeAuthorization(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/authorization/getProcodeAuthorization",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getCreateTxtFile(data) {
    return this._http
      .post(this.endPoint.localUrl + "/claim/createFile", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPersonSubType() {
    return this._http
      .get(this.endPoint.localUrl + "custCareReport/getPersonSubType")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getReportType() {
    return this._http
      .get(this.endPoint.localUrl + "custCareReport/getCustCareReportType")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getReportID(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "custCareReport/getCustCareReportID",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getAnonymityType(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "unusualIncident/incidentType",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getCaseManagerList(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "printAck/caseManager",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData);
  }
  getReasonLate() {
    return this._http
      .get(this.endPoint.localUrl + "printAck/getReasonLate")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getCmsUploadFile(data) {
    return this._http
      .post(this.endPoint.localUrl + "cms/uploadfile", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getRelationship(data) {
    return this._http
      .post(this.endPoint.localUrl + "personType/list", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderContactInfo(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerContact/getById",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  savefamilyContact(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerContact/save",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderSchoolDetails(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerSchool/getById",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveProviderSchool(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerSchool/save",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveAccessRights(data) {
    return this._http
      .post(this.endPoint.localUrl + "roles/save", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  accessGetById(data) {
    return this._http
      .post(this.endPoint.localUrl + "roles/getRoleById", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProcodeCA(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "procode/caseActivity",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getclientReferralUnsualIncident(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "clientReferral/UnusualIncident/getFISClient",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getUnusualReportID(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "unusualIncident/getUnusualIncidentReportID",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData);
  }

  getContractorReferralService(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "unusualIncident/getContractorReferralService",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPlacementResourceHome(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "unusualIncident/getPlacementResourceHome",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getClientProviderSfcsOffice(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "unusualIncident/getClientProviderSfcsOffice",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getReferralAuto(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "unusualIncident/getDropdownAutofetchFields",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getContactTypeByReferral(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "caseActivity/getContactTypeByReferralType",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPersonTypeByReferral(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "caseActivity/getPersonTypeByReferralType",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getClaimReferralByCleintId(req) {
    return this._http
      .post(environment.localUrl + "/claims/referral/list", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getStatusType(req) {
    return this._http
      .post(
        environment.localUrl + "progressNote/statusType",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getTherapyType(req) {
    return this._http
      .post(
        environment.localUrl + "progressNote/therapyType",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByClassficationId(req) {
    return this._http
      .post(
        environment.localUrl + "diagnosisCode/getByClassficationId",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getDiagnosisCodeSpecifierSeverity(req) {
    return this._http
      .post(
        environment.localUrl + "diagnosisCodeSpecifierSeverity/getById",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getCase_ManagerList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/personType/getCaseManager",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  get_SFCS_officeList(req) {
    if (req === null) {
      return this._http
        .get(this.endPoint.localUrl + "/sfaOffice/findAllOfficeName")
        .toPromise()
        .then(this._home.extractedData)
        .catch(this._home.errorHandler);
    } else {
      return this._http
        .post(
          this.endPoint.localUrl + "/sfaOfficeActivity/sfaOfficeByPersonTypeID",
          JSON.stringify(req)
        )
        .toPromise()
        .then(this._home.extractedData)
        .catch(this._home.errorHandler);
    }
  }

  getPersonByCaseManager(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/person/getPersonByCaseManager",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getCaseManagerByClient(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/caseTeam/getClientAndCaseManager",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveCaseClient(req) {
    return this._http
      .post(this.endPoint.localUrl + "/caseTeam/addClient", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveTransferClient(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/caseTeam/transferClient",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getMentalStatusByMentalStatusCategoryID(req) {
    return this._http
      .post(
        this.endPoint.localUrl +
          "progressNoteDiagnosis/getMentalStatusByMentalStatusCategoryID",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getClientModifyDrops(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/modifyFacts/getClientDropDown",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getClientdetail(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/modifyFacts/listByClientID",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  add_Mdify(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/modifyFacts/getClientDetails",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  save_Mdify(req) {
    return this._http
      .post(this.endPoint.localUrl + "/modifyFacts/save", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  delete_Mdify(req) {
    return this._http
      .post(this.endPoint.localUrl + "/modifyFacts/delete", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  all_reports_Mdify(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/modifyFacts/viewAllReports",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getExport(req) {
    return this._http
      .post(this.endPoint.localUrl + "/modifyFacts/export", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getAdditionalProviders(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/providerContact/getProviderContacts",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveMedicalAssessment(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/medicalAssessment/save",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveTreatmentService(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/treatmentServices/save",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveMedicalConditionService(req) {
    return this._http
      .post(
        this.endPoint.localUrl +
          "/PRTF_Referral/clientMedicalConditions/update",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateMedicalConditionService(req) {
    return this._http
      .post(
        this.endPoint.localUrl +
          "/PRTF_Referral/clientMedicalConditions/update",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getMedicalConditionService(req) {
    return this._http
      .post(
        this.endPoint.localUrl +
          "/PRTF_Referral/clientMedicalConditions/getByID",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateTreatmentService(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/treatmentServices/update",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateStaffPosition(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/staffPosition/update",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveStaffPosition(req) {
    return this._http
      .post(this.endPoint.localUrl + "/staffPosition/save", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveStaffNotificationTransfer(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/notificationTransfer/save",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  StaffUpdateNOtificationTranfer(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/notificationTransfer/update",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateMedicalAssessment(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/medicalAssessment/update",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getHomeCountiesList(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/homeCounty/getCounty",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getSFAOfficeDropDown() {
    return this._http
      .get(this.endPoint.localUrl + "getSFAOfficeDropDown")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveStaffSfcsOfficer(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/staffSFAOffice/save",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateStaffSfcsOfficer(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/staffSFAOffice/update",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getStaffSfcsOfficerById(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/staffSFAOffice/getById",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getFchWeeklyUpdateStatus() {
    return this._http
      .get(
        environment.localUrl + "/familyChangesApproval/fchWeeklyUpdateStatus"
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderStatusType() {
    return this._http
      .get(environment.localUrl + "/providerStatus/getProviderStatusType")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPersonTypeListCS(data) {
    return this._http
      .post(this.endPoint.localUrl + "/personType/list", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  deleteProviderMemberStatus(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/providerMemberProvider/delete",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  deleteProviderMemberStatusChildren(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/providerMemberChildren/delete",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getCourtOrderList(data) {
    return this._http
      .post(this.endPoint.localUrl + "/courtOrder/list", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getFamilyList(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/familyMemberReferral/list",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPersonTypesforStaff() {
    return this._http
      .get(environment.localUrl + "/personType/IsStaffPosition")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPRTFcaseTeamList(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/PRTF_Referral/getCaseTeamLinked",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getCaseEvaluationList(data) {
    return this._http
      .post(this.endPoint.localUrl + "/evaluation/list", JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getStaffFromLeader(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}getStaffDropdown`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getSFM_officeList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/transfer/getStaffsInSFAOffice",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getStaffByFromToList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/transfer/getStaffTeamMembers",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getStaffByFromToDragLists(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/transfer/staffTeamMembers/getDragDropInfo",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveTeammember(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/transfer/staffTeamLeader/save",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPayeeList(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/authorization/getPayeeDropDown",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProviderList(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/authorization/getProviderDropDown",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getLivingProviderList(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/livingArrangement/getProviderDropDown",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  esignatrue() {
    return this._http
      .get(this.endPoint.localUrl + "/esignature/getReminder?" + Date.now())
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getElectricalySign(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/esignature/getPlacementAgreement",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  dismissElectricalySign(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/esignature/dismiss",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  snoozeRemaider(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/esignature/snoozeAlerts",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getReferralBaseStaff(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/getStaffByReferralID",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
}
