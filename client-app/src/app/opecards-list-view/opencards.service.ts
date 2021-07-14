import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HomeService } from "../home/home.service";
import { ActivatedRoute, Router } from "@angular/router";
import swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import { Headers } from "@angular/http";
import { Http } from "@angular/http";
import { SharedClient } from "../Shared/Components/Client/shared-client";
@Injectable()
export class OpencardsService {
  endPoint = environment;
  public spName = new BehaviorSubject<string>("");
  currentspName = this.spName.asObservable();
  selectedRecId: any;
  ackData: any;
  refId: any;
  refIdData: any;
  hashKey = 665588201601783;
  metadata: any;
  formData: any;
  cisVersion = null;
  batchType: any;
  asqName = "";
  isAsqFormed = false;
  formName = "";
  cmsJson: any;
  cmsVersion: number;
  locCaseActiId: any;
  otherReferralData: any;
  caseTeamListResponse: any;
  digitalFormStream: any;
  movePrintData: any;
  isMovePrintSet = false;
  moveAutofetchData: any;
  moveOffice: any;
  placementRefInfo: any;
  placementPlanInfo: any;
  currentProviderName = "";
  schoolCatagoryName = "";
  moveFormProviderInfo: any;

  constructor(
    public _http: HttpClient,
    public _router: Router,
    public _home: HomeService,
    public _httpVerb: Http,
    public _activateRoute: ActivatedRoute
  ) {}

  getClientProfile = "/clientProfile/getById";
  getClientStrength = "/clientStrength/getById";
  getTPL = "/clientTpl/list";
  getAssessments = "/assessment/getAllAssessments";
  getassessmentType = "/assessment/getAssessmentType";
  assessmentSave = "/assessment/save";
  assessmentUpdate = "/assessment/update";
  assessmentGet = "/assessment/getById";
  caseactivityList = "/caseActivity/list";
  caseactivityAttachmentList = "/cms/attachDoc/list";
  getFISClient = "/clientReferral/fis/list";
  getCaseactivity = "/caseActivity/getById";
  fisMemberList = "/clientReferral/fis/list";

  fisMemberSave = "/clientReferral/save";
  fisMemberUpdate = "/clientReferral/update";
  fisMemberGetById = "/clientReferral/getById";

  casePlanGoalsUpdate = "/casePlan/update";
  casePlanGoalsSave = "/casePlan/save";

  extendedFamilyUpdate = "/familyMemberReferral/update";
  extendedFamilySave = "/familyMemberReferral/save";

  getHoHList = "/clientReferral/hoh/list";
  saveHoH = "/clientReferral/hoh/addClient";
  hohById = "/clientReferral/hoh/getById";
  homeCountyList = "/homeCounty/list";
  casePlanGoalsList = "/casePlan/list";
  casePlanGetRecId = "/casePlan/getById";
  extendedFamilyList = "/familyMemberReferral/list";
  extendedFamilyRecId = "/familyMemberReferral/getById";
  sfcsOfficeList = "/sfaOfficeActivity/list";
  pnDiagnosisList = "/progressNoteDiagnosis/list";
  pnDiagnosisSave = "/progressNoteDiagnosis/save";
  pnDiagnosisUpdate = "/progressNoteDiagnosis/update";
  pnDiagnosisGetByID = "/progressNoteDiagnosis/getById";
  caseTeamList = "/caseTeam/list";
  caseTeamById = "/caseTeam/list/id";
  caseTeamSave = "/caseTeam/save";
  caseTeamUpdate = "/caseTeam/update";
  personSubtype = "/dropDown/personAssignmentType";
  personTypeByReferral = "/dropDown/personType";
  phaseListAll = "/phase/list";
  phaseSave = "/phase/save";
  phaseUpdate = "/phase/update";
  phaseGetById = "/phase/getById";
  referralEventsSave = "/referralEvent/save";
  referralEventsUpdate = "/referralEvent/update";
  referrralEventsGetById = "/referralEvent/getById";
  referralEventsList = "/referralEvent/list";
  caseEvolutionList = "/evaluation/list";
  caseEvolutionSave = "/evaluation/save";
  caseEvolutionUpdate = "/evaluation/update";
  // caseEvolutionGetById = '';
  caseEvolutionType = "/evaluation/getEvaluationType";
  caseEvolutionVersion = "/evaluation/getAvailableEvaluation";
  caseEvolutionQuestions = "/evaluation/getQuestionByVersion";
  ntffList = "/nonTherapyFaceToFace/list";
  ntffSave = "/nonTherapyFaceToFace/save";
  // ntffUpdate = '/nonTherapyFaceToFace/update';
  ntffGetById = "/nonTherapyFaceToFace/getById";
  caseEvaluationVersion = "/evaluation/getAvailableEvaluation";
  caseEvaluationQuestionScale = "/evaluation/getQuestionByVersion";
  caseEvaluationType = "/evaluation/getEvaluationType";
  caseEvaluationSave = "/evaluation/save";
  caseEvaluationUpdate = "/evaluation/update";
  caseEvaluationGetById = "/evaluation/getById";
  phaseActivityList = "/phaseActivity/list";
  phaseActivitySave = "/phaseActivity/save";
  phaseActivityUpdate = "/phaseActivity/update";
  phaseActivityGetById = "/phaseActivity/getByPhaseActivity";
  fbSendMail = "sentManualEmail";
  courtOrderSave = "/courtOrder/save";
  courtOrderUpdate = "/courtOrder/update";
  courtOrderList = "/courtOrder/list";
  courtOrderGetById = "/courtOrder/getById";
  pmSave = "/clientPreventativeMeasure/save";
  pmUpdate = "/clientPreventativeMeasure/update";
  pmGetById = "/clientPreventativeMeasure/getById";
  caseActivityId = "cmsCisPdfDoc/form/id";

  // updateCisFormData = 'cisPdfJson/update';
  updateCisFormData = "cmsCisPdfDoc/update";
  payorSave = "/payor/save";
  payorUpdate = "/payor/update";
  payorList = "/payor/list";
  payorRecByID = "/payor/getById";
  claimList = "claim/list";
  directAuthList = "authorization/directAuthorization/list";
  getClaimById = "claim/getById";
  saveClaimList = "claim/save";
  payeeSave = "/payee/save";
  payeeUpdate = "/payee/update";
  payeeList = "/payee/list";
  payeeRecByID = "/payee/getById";
  appointmentsSave = "/appointment/save";
  appointmentsUpdate = "/appointment/update";
  appointmentsGetById = "/appointment/getById";
  appointmentsList = "/appointment/list";
  determinationSave = "/BHDetermination/save";
  determinationUpate = "/BHDetermination/update";
  determinationGetById = "/BHDetermination/getById";
  determinationList = "/BHDetermination/list";
  pmList = "/client/opencards/";
  schoolSave = "/clientSchool/save";
  schoolUpdate = "/clientSchool/update";
  schoolList = "/clientSchool/list";
  schoolGetById = "/clientSchool/getById";
  gradeLevelSave = "/clientGrade/save";
  gradeLevelUpdate = "/clientGrade/update";
  gradeLevelList = "/clientGrade/list";
  gradeLevelGetById = "/clientGrade/getById";
  homeSchoolSave = "/homeSchool/save";
  homeSchoolUpdate = "/homeSchool/update";
  homeSchoolList = "/homeSchool/list";
  homeSchoolGetById = "/homeSchool/getById";
  schoolReleaseSave = "/schoolRelease/save";
  schoolReleaseUpdate = "/schoolRelease/update";
  schoolReleaseGetById = "/schoolRelease/getById";
  schoolReleaseList = "/schoolRelease/list";
  healthRecordSave = "/healthExam/save";
  healthRecordUpdate = "/healthExam/update";
  healthRecordGetById = "/healthExam/getById";
  healthRecordList = "/healthExam/list";
  healthExamType = "/healthExam/getHealthExamType";
  adoptionEventSave = "/adoptionEvent/save";
  adoptionEventUpdate = "/adoptionEvent/update";
  adoptionEventGetById = "/adoptionEvent/getById";
  adoptionEventList = "/adoptionEvent/list";
  kanBeHealthySave = "/kanBeHealthy/save";
  kanBeHealthyUpdate = "/kanBeHealthy/update";
  kanBeHealthyGetById = "/kanBeHealthy/getById";
  kanBeHealthyList = "/kanBeHealthy/list";
  kanBeHealthyTypes = "/kanBeHealthy/getKanBeHealthyType";
  monthlyReportsSave = "/monthlyReport/save";
  monthlyReportsUpdate = "/monthlyReport/update";
  monthlyReportsGetById = "/monthlyReport/getById";
  monthlyReportsList = "/monthlyReport/list";
  progreesNoteSave = "/progressNote/save";
  progreesNoteUpdate = "/progressNote/update";
  progreesNoteGetById = "/progressNote/getById";
  progreesNoteList = "/progressNote/list";
  ssiSave = "/clientSSI/save";
  ssiUpdate = "/clientSSI/update";
  ssiGetById = "/clientSSI/getById";
  ssiList = "/clientSSI/list";
  listviewSearch = "/search";
  providerSave = "/provider/save";
  providerUpdate = "/provider/update";
  providerGetById = "/provider/getById";
  providerList = "/provider/form/list";
  caseFileActivitySave = "/caseFileActivity/save";
  caseFileActivityUpdate = "/caseFileActivity/update";
  caseFileActivityGetById = "/caseFileActivity/getById";
  caseFileActivityList = "/caseFileActivity/list";
  independentLivingSave = "/independentLiving/save";
  independentLivingUpdate = "/independentLiving/update";
  independentLivingGetById = "/independentLiving/getById";
  independentLivingList = "/independentLiving/list";
  immunizationSave = "/immunization/save";
  immunizationUpdate = "/immunization/update";
  immunizationList = "/immunization/list";
  immunizationGetById = "/immunization/getById";
  waiverSave = "/waiverActivity/save";
  waiverUpdate = "/waiverActivity/update";
  waiverGetById = "/waiverActivity/getById";
  waiverList = "/waiverActivity/list";
  kippPmtoSave = "/kipp/pmto/save";
  kippPmtoUpdate = "/kipp/pmto/update";
  kippPmtoGetById = "/kipp/pmto/getById";
  kippPmtoList = "/kipp/pmto/list";
  kippSave = "/kipp/save";
  kippUpdate = "/kipp/update";
  kippGetById = "/kipp/getById";
  kippList = "/kipp/list";
  sibilingsGetById = "/clientReferral/sibilingsInOutHome/ctpt";
  sibilingsList = "/clientReferral/sibilingsInOutHome/list";
  customerCareSave = "/custCareReport/save";
  customerCareUpdate = "/custCareReport/update";
  customerCareGetById = "/custCareReport/getById";
  customerCareList = "/custCareReport/list";
  incidentSave = "/unusualIncident/save";
  incidentUpdate = "/unusualIncident/update";
  incidentList = "client/opencards/";
  incidentGetById = "/unusualIncident/getById";
  courtCaseList = "client/opencards/";
  adoptionList = "/adoption/list";
  adoptionSave = "/adoption/save";
  adoptionUpdate = "/adoption/update";
  adoptionGetById = "/adoption/getById";
  generalEducationSave = "/generalEducation/save";
  generalEducationUpdate = "/generalEducation/update";
  generalEducationGetById = "/generalEducation/getById";
  generalEducationList = "/generalEducation/list";
  creditTrackingSave = "/creditTracking/save";
  creditTrackingUpdate = "/creditTracking/update";
  creditTrackingGetById = "/creditTracking/getById";
  creditTrackingList = "/creditTracking/list";
  specialEducationSave = "/specialEducation/save";
  specialEducationUpdate = "/specialEducation/update";
  specialEducationGetById = "/specialEducation/getById";
  specialEducationList = "/specialEducation/list";
  bisSave = "/bestInterestStaffing/save";
  bisUpdate = "/bestInterestStaffing/update";
  bisGetById = "/bestInterestStaffing/getById";
  bisList = "/bestInterestStaffing/list";
  bisAppealResults = "/bestInterestStaffing/appealResults";
  irList = "/adoption/identifiedResourceList";
  irGetById = "/adoption/identifiedResource";
  permanencyList = "/moveEvent/permanency/list";
  permanencyGetById = "/moveEvent/permanency/getById";
  moveFormList = "/moveEvent/list";
  moveFormGetById = "/moveEvent/getById";
  getProviderAddressUpdate = "/moveEvent/getProviderAddressUpdate";
  getProviderName = "/moveEvent/getProviderName";
  moveFormUpdate = "/moveEvent/update";
  eeispfGetByRefId = "/school/educationEntrollment";
  moveEventGetProviderName = "/moveEvent/getProviderName";
  moveEventAddressUpdate = "/moveEvent/getProviderAddressUpdate";
  eeispfDraftList = "/school/draft/list";
  eeispfDraftRead = "/school/draft/read";
  eeispfConfigMail = "/school/educationEntrollment/mailConfig/email";
  behavioralId = "/BADoc/getById";
  behavioralList = "/BADoc/list";
  behavioralCisJson = "/cmsCisPdfDoc/form/id";
  eeispfEmailNotifications = "/school/educationEntrollment/mailConfig/email";
  selectedSibilingName: any;
  getAllTableName = "/cardTableList";
  supervisoryStaffingListRfc = "/supervisoryStaffing/list";
  supervisoryStaffingList = "/caseActivity/supervisoryStaffing/list";
  supervisoryStaffingSave = "/supervisoryStaffing/save";
  supervisoryStaffingUpdate = "/supervisoryStaffing/update";
  supervisoryStaffingGetById = "/supervisoryStaffing/getById";
  listAll = "/cardSearch";
  logicalListForIncident = "/unusualIncident/incidentType";
  additonalClients = "/supervisoryStaffing/additionalClients";
  clientReferralList = "/client/referral/list";
  familySafetyList = "/familySafety/list";
  familySafetySave = "/familySafety/save";
  familySafetyUpdate = "/familySafety/update";
  familySafetyGetById = "/familySafety/getById";
  familySafetyActivityList = "/familySafetyActivity/list";
  familySafetyActivitySave = "familySafetyActivity/save";
  familySafetyActivityUpdate = "/familySafetyActivity/update";
  familySafetyActivityGetById = "/familySafetyActivity/getById";
  familySafetyActivityPersonAssignmentType =
    "/familySafetyActivity/personAssignmentType/dropDown";
  fpBillableCaseActivityList = "/caseActivity/billable/list";
  fpBillableCaseActivityUpdate = "/caseActivity/form/update";
  clientAndReferralDetails = "/clientReferral/getClientRef";
  listExistingRecInSupervisoryStaffForSuper =
    "/supervisoryStaffing/getSupervisoryStaffingHistory";
  unusalIncidenGetById = "/unusualIncident/getById";
  saveCmsAttachment = "/cms/uploadfile";
  lackOfContactList = "/caseActivity/lackOfContact/list";
  placementList = "/placement/list";
  placementSave = "/placement/save";
  caseActivityLogSearch = "/caseActivity/log/search";
  exportList = "/exportReport";
  livingArrangementList = "/livingArrangement/list";
  clientBasicInfo = "/client/profile";
  clientBulkUpdate = "/client/multiUpdate";
  ntffStatusType = "/nonTherapyFaceToFace/statusType";
  emailTemplate = "sendEmail";
  fileDelete = "/delete";
  eeispfSchoolEmail = "/clientSchool/getLastTwoAttentingSchool";
  nttfAloneTimeDelete = "/caseActivityFaceToFace/delete";
  unusualIncidentDelete = "/unusualIncident/IncidentType/delete";
  ncOpsReferralSave = "/NC_OPSReferral/save";
  ncOpsReferralGetById = "/NC_OPSReferral/getById";
  ncOPsReferralUpdate = "/NC_OPSReferral/update";
  serviceType = "/NC_OPSReferral/getServiceType ";
  serviceAgreementSave = "/referralEvent/save";
  serviceAgreementUpdate = "/referralEvent/update";
  serviceAgreementList = "/referralEvent/list";
  serviceAgreementGetById = "/referralEvent/getById";
  ncfchSave = "/NC_FCHReferral/save";
  ncfchUpdate = "/NC_FCHReferral/update";
  ncfchGetById = "/NC_FCHReferral/getById";
  procodeBasedOnReferralType = "/procode/getByReferralTypeId";
  placementReferralList = "/placementReferral/list";
  placementReferralGetById = "/placementReferral/getById";
  livingArrangmentsProcodes = "/livingArrangement/getProcode";
  livingArrangmentsSave = "/livingArrangement/save";
  ackCaseManagerList = "/printAck/caseManager";
  ackPlacementReferralCaseManager = "/placementReferral/print";
  placementReferralSendMail = "/placementReferral/sendMail";
  ackCaseManagerChangerReasonList = "/printAck/caseManager/changeReason";
  akcJudgeList = "/printAck/getJudge";
  ackOpenSchoolList = "/printAck/getSchool";
  ackHomeSchoolReasonList = "/printAck/getSchoolReason ";
  ackReasonLateList = "/printAck/getReasonLate";
  livingArrangementGetById = "/livingArrangement/getById";
  ncrfcSave = "/nc_RFCReferral/save";
  ncrfcUpdate = "/nc_RFCReferral/update";
  ncrfcGetById = "/nc_RFCReferral/getById";
  livingArrangementUpdate = "/livingArrangement/update";
  livingArrangementsAuthorizations = "/livingArrangement/getAuthorization";
  providerAuthorizationSummaryList = "/authorization/provider/list";
  providerLivingArrangementList = "/livingArrangement/provider/list";
  placementAuthorizationsSave = "/livingArrangement/authorization/save";
  placementAuthorizationsUpdate = "/livingArrangement/authorization/update";
  overridingExistingAuthorizationList =
    "/authorization/getExistingAuthorizations";
  deleteExistingAuthorizaionURI = "/authorization_Deleted/save";
  claimsByAuthorizations = "/authorization/claimByAuthorizationID";
  dayCareAuthorizationsSave = "/authorization/save";
  dayCareAuthorizationsUpdate = "/authorization/update";
  dayaCareAuthorizationsList = "/authorization/dayCareAuthorization/list";
  dayaCareAuthorizationsGetbyById = "/authorization/getById";
  placementEventList = "/placementDetail/list";

  moveFormAutofetch = "/moveEvent/getAutofetchInfo";
  moveFormRelativeTypes = "/moveEvent/getPersonType";
  moveFormSave = "/moveEvent/save";
  moveGetAddressByProvider = "/moveEvent/getProviderAddress";
  placementCareList = "/placementReferral/getCareLevel";
  placementReferralCasePlanGoalsList = "/placementReferral/getCasePlanGoals";
  placementReferralDirectorList =
    "/placementReferral/directorAuthorization/staff";
  placementReferralDirectorLevelOfCare =
    "/placementReferral/levelOfCareAuthorized";
  placementReferralSave = "/placementReferral/save";
  placementRefAutoFetch = "/placementReferral/getAutoFetchInfo";
  placementRefGetById = "/placementReferral/getById";
  stateList = "/placementReferral/getState";
  cityListBasedOnState = "/placementReferral/getCity";
  placementEventAuthorizationList = "/placementDetail/authorization/list";
  placementEventAuthorizationsUpdateAPI = "/placementDetail/authorization/save";
  deletePlacementAuthorizationURI = "/authorization_Deleted/save";
  viewDeletedPlacementAuthListURI = "/authorization_Deleted/list";
  placementAuthLength = "/placementReferral/getAuthorizationLength";
  previousPlacementProviderName = "/placement/getPreviousPlacementProvider";
  placementPlanSave = "/placementPlan/save";
  moveGetNearBySchools = "/moveEvent/getNearBySchools";
  providerListWithSponsor = "/placement/getProviderDropDown";
  placementPlanList = "/placementPlan/list";
  placementPlanAutofetch = "/placementPlan/getAutoFetchInfo";
  placementPlanPhoneNumbers = "/placementPlan/getPhoneNumbers";
  placementPlanGetById = "/placementPlan/getById";
  providerRecruitmentList = "/recruitmentInquiry/list";
  providerRecruitmentInquiryList = "/recruitmentInquiry/InquiryEvent/list";
  providerRecruitmentStaffList = "/recruitmentStaff/list";
  casaCasesList = "/case/getCaseByCasaOfficer";
  commMemberCasesList = "/case/getCaseByCommunityMember";
  personTypesSchoolList = "/school/list";
  dropdownList = "/dropDown/list";
  dropdownZipcodeList = "/dropDown/zipcode";
  schoolPersonTypeSave = "/school/save";
  schoolPersonTypeUpdate = "/school/update";
  personTypeSchoolGetById = "/school/getById";
  personTypesAttendingSchoolList = "/school/attendingSchool/list";
  personTypesHomeSchoolList = "/school/homeSchool/list";
  exportListViewForPlacementRef = "/placementReferral/getExcelExports";
  exportListViewForPlacementPlan = "/placementPlan/getExcelExports";
  placementPlanPlanOfActionList = "/placementPlanPlanOfAction/list";
  placementPlanOtherParticipantsList =
    "/placementPlanOtherPlacementPlanParticipants/list";
  providerMembersProviderList = "/provider/getProviderByProviderMember";
  otherAgencyStaffsProvidersList = "/provider/getProviderByOtherAgencyStaff";
  payorCases = "/case/getCaseByPayor";
  payorPlacementAuth = "/payor/getPayorAuthorization";
  sponsorContractListApi = "/sponsorContract/list";
  providerSponsorCasesListApi = "/case/getByPerson";
  sfcsContractSave = "/sponsorContract/save";
  sfcsContractUpdate = "/sponsorContract/update";
  sfcsContractGetByIdApi = "/sponsorContract/getById";
  getSponsorContractTypeApi = "/sponsorContract/getSponsorContractType";
  sponsorPlaceAuthListApi = "/sponsor/getSponsorAuthorization";
  providerSponsorListApi = "/sponsor/list";
  providerSponsorSaveApi = "/sponsor/save";
  providerSponsorGetByIdApi = "/sponsor/getById";
  dhsOfficeListApi = "/dhsOffice/list";
  areaOfficeListApi = "/dhsOffice/getDHSAreaOffice";
  dhsOfficeSave = "/dhsOffice/save";
  dhsOfficeUpdate = "/dhsOffice/update";
  dhsOfficeGetById = "/dhsOffice/getById";
  dhsOfficeStaffListApi = "/dhsOffice/getDHSStaffByOfficeID";
  dhsOfficeCaseListApi = "/case/getCaseByDHSStaff";
  getPlacementProcodesApi = "/placement/getProcodes";
  getServiceSupportApi = "/placementPlan/getServiceAndSupport";
  getProviderStrengthListApi = "/providerStrength/listByProviderId";
  updatePlacementSchoolApi = "/placement/updateClientSchoolPlacement";
  dhsStaffCase = "/case/getCaseByDHSStaff";
  dhsStaffOffice = "/dhsStaff/getDHSOfficeByDHSStaffID";
  dhsStaffCounty = "/dhsStaffCounty/list";
  dhsOfficeDropdown = "/dropDown/list";
  judgeCaseApi = "/case/getCaseByJudge";
  galCaseApi = "/case/getCaseByGal";
  fmHouseholdCasesApi = "/case/getCaseByFamilyMember";
  fmExtendedFamilyCasesApi = "/case/getCaseByFamilyMember";
  crbCaseApi = "/case/getCaseByCRBCoordinator";
  bhokSave = "/BHOKReferral/save";
  bhokUpdate = "/BHOKReferral/update";
  BHOKsfcsOfficeDropdownApi = "/BHOKReferral/sfcsOffice";
  BHOKsfcsWorkerDropdownApi = "/BHOKReferral/sfcsStaff";
  BHOKdhsStaffDropdownApi = "/BHOKReferral/dHSStaff";
  BHOKotherAgencyStaffDropdownApi = "/BHOKReferral/otherAgencyStaff";
  BHOKreasonDeclineDropdownApi = "/BHOKReferral/reasonForDecline";
  BHOKhomeCountyDropdownApi = "/dhsStaffCounty/getCounty";
  bhokGetById = "/BHOKReferral/getById";
  bhokhealthList = "/healthExam/list";
  nCHSSave = "/NC_HSReferral/save";
  nCHSUpdate = "/NC_HSReferral/update";
  nCHSGetByID = "/NC_HSReferral/getById";
  placementgetSibsCountApi = "/placement/getSibsCount";
  getProviderSponsor = "/providerSponsor/sponsor";
  providerSponsorClosureReason = "/providerSponsor/closure";
  providerProfileInfo = "/provider/getProfile";
  dhsStaffCounties = "/dhsStaffCounty/getCounty";
  dhsStaffCountySave = "/dhsStaffCounty/save";
  dhsStaffCountyUpdate = "/dhsStaffCounty/update";
  custCarePersonListApi = "/person/getPersonByFilter";
  dcfStaffCaseApi = "/case/getCaseByDCFStaff";
  dcfStaffOfficeApi = "/srsstaff/getSRSOfficebySRSStaff";
  newProviderInfo: any;
  prtfPRList = "/progressReport/list";
  treatmentDecisionList = "/treatmentDecisions/list";
  treatmentDecisionSave = "/treatmentDecisions/save";
  treatmentDecisionUpdate = "/treatmentDecisions/update";
  treatmentDecisionGetById = "/treatmentDecisions/getById";
  moveFormAutofetchInformation = "/moveEvent/getAutofetchInfomations";

  listViewOfOpencards(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/client/opencards/list",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  claimListView(data) {
    return this._http
      .post(this.endPoint.localUrl + this.claimList, JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  directAuthListView(data) {
    return this._http
      .post(this.endPoint.localUrl + this.directAuthList, JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  payeeServiceDirectAuthListView(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/payee/directAuthorization/list",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getClaimIDDetails(claimId) {
    return this._http
      .post(this.endPoint.localUrl + this.getClaimById, JSON.stringify(claimId))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getAuthById(authId) {
    return this._http
      .post(
        this.endPoint.localUrl + "/authorization/getById",
        JSON.stringify(authId)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getClaimsAuthById(authId) {
    return this._http
      .post(
        this.endPoint.localUrl + "/authorization/claimByAuthorizationID",
        JSON.stringify(authId)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  /***
   * @param req - openCard:string, beginPagination:number, endPagination: number
   * @param clientId - Client ID for filtering the data
   * @returns list view of opencards based on client id
   */
  listViewOfOpencardsByClient(req, clientId) {
    // tslint:disable-next-line:max-line-length
    let clientID = this._activateRoute.snapshot.queryParamMap.get("clientId");
    return this._http
      .post(
        this.endPoint.localUrl + "/client/opencards/" + clientID + "/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /***
   *@param - getById
   *@returns record by id
   */
  getClientProfileById(req) {
    return this._http
      .post(this.endPoint.localUrl + this.getClientProfile, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveClaim(req) {
    return this._http
      .post(this.endPoint.localUrl + this.saveClaimList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  exportClaim(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/exportSmartSpreadsheet",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  exportNotificationTranfer(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/notificationTransfer/excelExport",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getSelectedRecordId(recId) {
    return (this.selectedRecId = recId);
  }

  setSelectedRecordId() {
    return this.selectedRecId;
  }

  /**
   * Encrypt and decrypt the details
   * @returns hashkey
   */
  getHasKey() {
    return this.hashKey;
  }

  /**
   *
   */
  getClientStrengthById(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.getClientStrength,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   */
  getClientTLPById(req) {
    return this._http
      .post(this.endPoint.localUrl + this.getTPL, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getAssessementsByClient(req) {
    return this._http
      .post(this.endPoint.localUrl + this.getAssessments, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req assessment category id
   */
  getAssessmentType(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.getassessmentType,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /***
   * @param req assessment object
   */
  saveAsssessments(req) {
    return this._http
      .post(this.endPoint.localUrl + this.assessmentSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /***
   * @param req assessmenr object
   */
  updateAssessments(req) {
    return this._http
      .post(this.endPoint.localUrl + this.assessmentUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /***
   * @param req  asesssment id
   */
  getAssessmentRec(req) {
    return this._http
      .post(this.endPoint.localUrl + this.assessmentGet, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /***
   * @param req caseactivity req
   */
  getCaseActivityList(req) {
    return this._http
      .post(this.endPoint.localUrl + this.caseactivityList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getlackOfContactList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.lackOfContactList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getCaseActivityAttachmentList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseactivityAttachmentList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /***
   * @param req referral Id
   */
  getFISClientByreferralId(req) {
    return this._http
      .post(this.endPoint.localUrl + this.getFISClient, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveFisMembers(req) {
    return this._http
      .post(this.endPoint.localUrl + this.fisMemberSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateFisMembers(req) {
    return this._http
      .post(this.endPoint.localUrl + this.fisMemberUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /***
   * @param req caseactivity Id
   */
  getCaseActivityById(req) {
    return this._http
      .post(this.endPoint.localUrl + this.getCaseactivity, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateCasePlanGoals(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.casePlanGoalsUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveCasePlanGoals(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.casePlanGoalsSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateExtendedFamily(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.extendedFamilyUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  /***
   * @param req fis list request
   */
  getFISMemberList(req) {
    return this._http
      .post(this.endPoint.localUrl + this.fisMemberList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /***
   * @param req fis rec id
   */
  getFISMemberRec(req) {
    return this._http
      .post(this.endPoint.localUrl + this.fisMemberGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveExtendedFamily(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.extendedFamilySave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   * @param req  HoH list record
   */
  getListOfHoH(req) {
    return this._http
      .post(this.endPoint.localUrl + this.getHoHList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req client id, referral id
   */
  hohSave(req) {
    return this._http
      .post(this.endPoint.localUrl + this.saveHoH, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req client id
   */
  getHoHByRecId(req) {
    return this._http
      .post(this.endPoint.localUrl + this.hohById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req referral id
   */
  getHomeCountyList(req) {
    return this._http
      .post(this.endPoint.localUrl + this.homeCountyList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /***
   * @param req list view req
   */
  getCasePlanGoalsList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.casePlanGoalsList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /***
   * @param req case plan rec id
   */
  getCasePlanGetById(req) {
    return this._http
      .post(this.endPoint.localUrl + this.casePlanGetRecId, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /***
   * @param req extended list view req
   */
  getExtendedFamilyList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.extendedFamilyList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPartcipantsList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + "/therapyParticipant/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  /**
   *
   * @param req extended family id
   */
  getExtendedFamilyById(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.extendedFamilyRecId,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req lsit view request
   */
  getSFCSOfficeList(req) {
    return this._http
      .post(this.endPoint.localUrl + this.sfcsOfficeList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  savePNDiagnosis(req) {
    return this._http
      .post(this.endPoint.localUrl + this.pnDiagnosisSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updatePNDiagnosis(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.pnDiagnosisUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listALLPNDiagnosis(req) {
    return this._http
      .post(this.endPoint.localUrl + this.pnDiagnosisList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdPNDiagnosis(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.pnDiagnosisGetByID,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveCaseTeam(req) {
    return this._http
      .post(this.endPoint.localUrl + this.caseTeamSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateCaseTeam(req) {
    return this._http
      .post(this.endPoint.localUrl + this.caseTeamUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listCaseTeam(req) {
    const response = this._http
      .post(this.endPoint.localUrl + this.caseTeamList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
    this.setCaseTeamListResponse(response);
    this.caseTeamListResponse = response;
    return response;
  }

  getByIdCaseTeam(req) {
    return this._http
      .post(this.endPoint.localUrl + this.caseTeamById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPersonSubtype(req) {
    return this._http
      .post(this.endPoint.localUrl + this.personSubtype, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPeronTypeByReferralTypeId(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.personTypeByReferral,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getAllPhaseList(req) {
    return this._http
      .post(this.endPoint.localUrl + this.phaseListAll, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  savePhase(req) {
    return this._http
      .post(this.endPoint.localUrl + this.phaseSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  async getCisFormJson(req) {
    return await this._http
      .post(this.endPoint.localUrl + this.caseActivityId, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  async updateCisForm(req) {
    return await this._http
      .post(
        this.endPoint.localUrl + this.updateCisFormData,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  isAckDataPresent() {
    if (this.ackData) {
      return true;
    } else {
      return false;
    }
  }

  getFormData(source) {
    this.formData = source;
  }

  retrunFormData() {
    return this.formData;
  }

  updatePhase(req) {
    return this._http
      .post(this.endPoint.localUrl + this.phaseUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdPhase(req) {
    return this._http
      .post(this.endPoint.localUrl + this.phaseGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveReferralEvents(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.referralEventsSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateReferralEvents(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.referralEventsUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listALLReferralEvents(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.referralEventsList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdReferralEvents(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.referrralEventsGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getcaseEvolutionList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseEvolutionList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveCaseEvolution(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseEvolutionSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateCaseEvolution(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseEvolutionUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  /***
   * @param req - referral type id
   */
  getcaseEvolutionType(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseEvolutionType,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  /***
   * @param req - referral type id
   */
  getCaseEvolutionVersion(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseEvolutionVersion,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getNTFFList(req) {
    return this._http
      .post(this.endPoint.localUrl + this.ntffList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getCaseEvaluationVersion(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseEvaluationVersion,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getCaseEvaluationScale(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseEvaluationQuestionScale,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getCaseEvaluationType(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseEvaluationType,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveCaseEvaluation(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseEvaluationSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateCaseEvaluation(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseEvaluationUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdCaseEvaluation(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseEvaluationGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveNtff(req) {
    return this._http
      .post(this.endPoint.localUrl + this.ntffSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateNtff(req) {
    return this._http
      .post(this.endPoint.localUrl + this.ntffSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdNtff(req) {
    return this._http
      .post(this.endPoint.localUrl + this.ntffGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPhaseActivityList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.phaseActivityList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  savePhaseActivity(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.phaseActivitySave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updatePhaseActivity(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.phaseActivityUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdPhaseActivity(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.phaseActivityGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  sendFbAckMail(req) {
    return this._http
      .post(this.endPoint.localUrl + this.fbSendMail, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveCourtOrder(req) {
    return this._http
      .post(this.endPoint.localUrl + this.courtOrderSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateCourtOrder(req) {
    return this._http
      .post(this.endPoint.localUrl + this.courtOrderUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllCourtOrder(req) {
    return this._http
      .post(this.endPoint.localUrl + this.courtOrderList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdCourtOrder(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.courtOrderGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  savePm(req) {
    return this._http
      .post(this.endPoint.localUrl + this.pmSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updatePm(req) {
    return this._http
      .post(this.endPoint.localUrl + this.pmUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdPm(req) {
    return this._http
      .post(this.endPoint.localUrl + this.pmGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  savePayor(req) {
    return this._http
      .post(this.endPoint.localUrl + this.payorSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updatePayor(req) {
    return this._http
      .post(this.endPoint.localUrl + this.payorUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByRecIdPayor(req) {
    return this._http
      .post(this.endPoint.localUrl + this.payorRecByID, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listPayor(req) {
    return this._http
      .post(this.endPoint.localUrl + this.payorList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  savePayee(req) {
    return this._http
      .post(this.endPoint.localUrl + this.payeeSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updatePayee(req) {
    return this._http
      .post(this.endPoint.localUrl + this.payeeUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listPayee(req) {
    return this._http
      .post(this.endPoint.localUrl + this.payeeList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByRecIdPayee(req) {
    return this._http
      .post(this.endPoint.localUrl + this.payeeRecByID, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveAppointments(req) {
    return this._http
      .post(this.endPoint.localUrl + this.appointmentsSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateAppointments(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.appointmentsUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllAppointments(req) {
    return this._http
      .post(this.endPoint.localUrl + this.appointmentsList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdAppointments(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.appointmentsGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveBhDetermination(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.determinationSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateBhDetermination(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.determinationUpate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdDetermination(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.determinationGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllBhDetermination(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.determinationList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllPreventaitveMeasurements(req, clientId) {
    return this._http
      .post(
        this.endPoint.localUrl + this.pmList + clientId + "/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveAttendingSchool(req) {
    return this._http
      .post(this.endPoint.localUrl + this.schoolSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateAttendingSchool(req) {
    return this._http
      .post(this.endPoint.localUrl + this.schoolUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByRecAttendingSchool(req) {
    return this._http
      .post(this.endPoint.localUrl + this.schoolGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllAttendingSchool(req) {
    return this._http
      .post(this.endPoint.localUrl + this.schoolList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveGradeLevel(req) {
    return this._http
      .post(this.endPoint.localUrl + this.gradeLevelSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateGradeLevel(req) {
    return this._http
      .post(this.endPoint.localUrl + this.gradeLevelUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllGradeLevel(req) {
    return this._http
      .post(this.endPoint.localUrl + this.gradeLevelList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdGradeLevel(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.gradeLevelGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveHomeschool(req) {
    return this._http
      .post(this.endPoint.localUrl + this.homeSchoolSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateHomeschool(req) {
    return this._http
      .post(this.endPoint.localUrl + this.homeSchoolUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllHomeschool(req) {
    return this._http
      .post(this.endPoint.localUrl + this.homeSchoolList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdHomeschool(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.homeSchoolGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveSchoolRelease(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.schoolReleaseSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateSchoolRelase(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.schoolReleaseUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllSchoolRelease(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.schoolReleaseList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdSchoolRelease(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.schoolReleaseGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveHealthRecord(req) {
    return this._http
      .post(this.endPoint.localUrl + this.healthRecordSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateHealthRecord(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.healthRecordUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllHealthRecord(req) {
    return this._http
      .post(this.endPoint.localUrl + this.healthRecordList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdHealthRecord(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.healthRecordGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getHealthRecordType(req) {
    return this._http
      .post(this.endPoint.localUrl + this.healthExamType, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveAdoptionEvent(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.adoptionEventSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateAdoptionEvent(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.adoptionEventUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllAdoptionEvent(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.adoptionEventList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdAdoptionEvent(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.adoptionEventGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveKanBeHealthy(req) {
    return this._http
      .post(this.endPoint.localUrl + this.kanBeHealthySave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateKanBeHealthy(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.kanBeHealthyUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllKanBeHealthy(req) {
    return this._http
      .post(this.endPoint.localUrl + this.kanBeHealthyList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdKanBeHealthy(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.kanBeHealthyGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getKanBeHealthyTypes() {
    return this._http
      .get(this.endPoint.localUrl + this.kanBeHealthyTypes)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveMonthlyReports(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.monthlyReportsSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateMonthlyReports(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.monthlyReportsUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllMonthlyReports(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.monthlyReportsList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdMonthlyReports(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.monthlyReportsGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveProgressNote(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.progreesNoteSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData);
  }
  updateProgressNote(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.progreesNoteUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllProgressNote(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.progreesNoteList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData);
  }
  getByIdProgressNote(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.progreesNoteGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData);
  }

  saveSSI(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.ssiSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateSSI(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.ssiUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllSSI(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.ssiList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdSSI(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.ssiGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listSearch(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.listviewSearch, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveProvider(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.providerSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateProvider(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.providerUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdProvider(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.providerGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listProvider(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.providerList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveCaseFileActivity(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseFileActivitySave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateCaseFileActivity(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseFileActivityUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdCaseFileActivity(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseFileActivityGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listCaseFileActivity(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseFileActivityList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveIndependentLiving(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.independentLivingSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateIndependentLiving(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.independentLivingUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdIndependentLiving(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.independentLivingGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listIndependentLiving(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.independentLivingList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveImmunization(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.immunizationSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateImmunization(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.immunizationUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdImmunization(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.immunizationGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listImmunization(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.immunizationList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveWaiver(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.waiverSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateWaiver(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.waiverUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdWaiver(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.waiverGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listWaiver(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.waiverList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveKippPmto(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.kippPmtoSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateKippPmto(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.kippPmtoUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdKippPmto(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.kippPmtoGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listKippPmto(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.kippPmtoList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveKipp(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.kippSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateKipp(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.kippUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdKipp(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.kippGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listKipp(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.kippList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAllSibilings(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.sibilingsList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdSibilings(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.sibilingsGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveCustomerCare(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.customerCareSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateCustomerCare(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.customerCareUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdCustomerCare(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.customerCareGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listCustomerCare(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/person/getPersonByFilter",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  otherServiceListView(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/authorization/list",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveIncident(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.incidentSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateIncident(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.incidentUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdIncident(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.incidentGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listIncident(req: any, clientId: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.incidentList + clientId + "/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listCourtCase(req: any, clientId: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.courtCaseList + clientId + "/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listSiblings(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.sibilingsList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveAdoption(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.adoptionSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateAdoption(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.adoptionUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdAdoption(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.adoptionGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAdoption(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.adoptionList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveGeneralEducation(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.generalEducationSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateGeneralEducationn(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.generalEducationUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdGeneralEducation(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.generalEducationGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listGeneralEducation(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.generalEducationList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveCreditTracking(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.creditTrackingSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateCreditTracking(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.creditTrackingUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdCreditTracking(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.creditTrackingGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listCreditTracking(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.creditTrackingList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveSpecialEducation(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.specialEducationSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateSpecialEducation(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.specialEducationUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdSpecialEducation(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.specialEducationGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listSpecialEducation(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.specialEducationList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveBIS(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.bisSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateBIS(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.bisUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdBIS(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.bisGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listBIS(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.bisList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listAppeal(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.bisAppealResults, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listIR(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.irList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdIR(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.irGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listPermanency(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.permanencyList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdPermanency(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.permanencyGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listMoveForm(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.moveFormList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdMoveForm(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.moveFormGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  providerAddressUpdateMoveForm(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.getProviderAddressUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  providerNameMoveForm(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.getProviderName, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateMoveForm(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.moveFormUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getEeispfByRefId(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.eeispfGetByRefId, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderNameMoveForm(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.moveEventGetProviderName,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateExisitingAddress(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.moveEventAddressUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listEducationEnrollment(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.eeispfDraftList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getEeispfByPdfDocId(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.eeispfDraftRead, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  configMailByRefID(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.eeispfConfigMail, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  emailNotifiersEsispf(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.eeispfEmailNotifications,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  setSiblingName(selectedName: any) {
    return (this.selectedSibilingName = selectedName);
  }

  getSiblingName() {
    return this.selectedSibilingName;
  }

  getListOfTable() {
    return this._http
      .get(this.endPoint.localUrl + this.getAllTableName)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getListAllSupervisoryStaffing(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.supervisoryStaffingList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  //
  getListAllSupervisoryStaffingRfc(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.supervisoryStaffingListRfc,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  //
  saveSupervisoryStaffing(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.supervisoryStaffingSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateSupervisoryStaffing(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.supervisoryStaffingUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByIdSupervisoryStaffing(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.supervisoryStaffingGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  cardsGlobalList(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.listAll, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getLogicalListForUnusualIncident(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.logicalListForIncident,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData);
  }

  /** Based on the referral and client id */
  getAdddtionalClients(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.additonalClients, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getUnusualAdddtionalClients(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "unusualIncident/additionalClients",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  referralListBasedOnClients(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.clientReferralList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listFamilySafety(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.familySafetyList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveFamilySafety(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.familySafetySave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateFamilySafety(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.familySafetyUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdFamilySafety(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.familySafetyGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listFamilySafetyActivity(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.familySafetyActivityList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveFamilySafetyActivity(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.familySafetyActivitySave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateFamilySafetyActivity(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.familySafetyActivityUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdFamilySafetyActivity(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.familySafetyActivityGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getAllegedTypes(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.familySafetyActivityPersonAssignmentType,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getListFPBillabelCaseActivity(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.fpBillableCaseActivityList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateFPBillableCaseActivity(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.fpBillableCaseActivityUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getClientAndReferralDetails(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.clientAndReferralDetails,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPersonList(req: any) {
    return this._http
      .post(this.endPoint.localUrl + "/personType/list", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getContactList() {
    return this._http
      .get(this.endPoint.localUrl + "/personType/contactType/list")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProcodeList() {
    return this._http
      .get(this.endPoint.localUrl + "/personType/procode/list")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPersonTypeProcodeList() {
    return this._http
      .get(this.endPoint.localUrl + "/personType/personTypeProcode/list")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  unusualIncidentSave(req) {
    return this._http
      .post(this.endPoint.localUrl + this.incidentSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  unusualIncidentUpdate(req) {
    return this._http
      .post(this.endPoint.localUrl + this.incidentUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getExistingListRecForSupervisor(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.listExistingRecInSupervisoryStaffForSuper,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getUnusulaRecById(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.unusalIncidenGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getcaseActivityLogSearch(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseActivityLogSearch,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getClientBasicInfo(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.clientBasicInfo, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  clientBulkRecUpdate(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.clientBulkUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listProviderIncident(req: any, providerId: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "provider/opencards/" + providerId + "/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  eeispfEmails(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.eeispfSchoolEmail,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  progressNoteDiagnosis(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "progressNoteDiagnosis/save",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProgressNoteDiagnosis(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "progressNoteDiagnosis/getById",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProgressNoteDiagnosisSummary(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "progressNoteDiagnosis/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProgressNoteDiagnosisGetById(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "progressNoteDiagnosis/getById",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getAckData(data, refId) {
    // this.refIdData=refId;
    // this.ackData.refId=data;
    this.ackData[refId.toString()] = data;
    // this.ackData={
    //   refId:data
    // }
    // this.refId = refId;
    return this.ackData;
  }

  setAckData(data) {
    // this.refId = data;
    return this.ackData.data;
  }

  rfcListViewNavigation(node) {
    let navigationUrl: any;
    switch (node) {
      case "assessments":
        navigationUrl = "/reintegration/referral/opencard/assessments/view";
        break;
      case "case-activity":
        navigationUrl = "/reintegration/referral/opencard/case-activity/view";
        break;
      case "case-plan-goals":
        navigationUrl = "/reintegration/referral/opencard/case-plan-goals/view";
        break;
      case "court-order":
        navigationUrl = "/reintegration/referral/opencard/court-order/view";
        break;
      case "court-evaluations":
        navigationUrl =
          "/reintegration/referral/opencard/case-evaluations/view";
        break;
      case "home-county":
        navigationUrl = "/reintegration/referral/opencard/home-county/view";
        break;
      case "sfcs-office":
        navigationUrl = "/reintegration/referral/opencard/sfcs-office/view";
        break;
      case "extended-family":
        navigationUrl = "/reintegration/referral/opencard/extended-family/view";
        break;
      case "case-team":
        navigationUrl = "/reintegration/referral/opencard/case-team/view";
        break;
      case "court-case":
        navigationUrl = "/reintegration/referral/opencard/court/case/view";
        break;
    }
    return this._router.navigate([navigationUrl]);
  }

  fpListViewNavigation(node) {
    let navigationUrl: any;
    switch (node) {
      case "assessments":
        navigationUrl = "/reports/referral/family-preservation/assessment/view";
        break;
      case "case-activity":
        navigationUrl =
          "/reports/referral/family-preservation/case-activity/view";
        break;
      case "case-plan-goals":
        navigationUrl =
          "/reports/referral/family-preservation/case-plan-goals/view";
        break;
      case "court-order":
        navigationUrl =
          "/reports/referral/family-preservation/court-order/view";
        break;
      case "court-evaluations":
        navigationUrl =
          "/reports/referral/family-preservation/case-evaluations/view";
        break;
      case "home-county":
        navigationUrl =
          "/reports/referral/family-preservation/home-county/view";
        break;
      case "sfcs-office":
        navigationUrl =
          "/reports/referral/family-preservation/sfcs-office/view";
        break;
      case "extended-family":
        navigationUrl =
          "/reports/referral/family-preservation/extended-family/view";
        break;
      case "case-team":
        navigationUrl = "/reports/referral/family-preservation/case-team/view";
        break;
      case "court-case":
        navigationUrl = "/reports/referral/family-preservation/court/case/view";
        break;
    }
    return this._router.navigate([navigationUrl]);
  }

  fpBreadcrumbs(node, breadcrumb) {
    let caseLabel, caseHref, listLabel, listHref;
    caseLabel = "Case Form";
    caseHref = "/reports/referral/family-preservation/detail";
    switch (node) {
      case "assessments":
        listLabel = "Assessment List";
        listHref = "/reports/referral/family-preservation/assessment/view";
        break;
      case "case-activity":
        listLabel = "Case Activity List";
        listHref = "/reports/referral/family-preservation/case-activity/view";
        break;
      case "case-plan-goals":
        listLabel = "Case Plan Goals List";
        listHref = "/reports/referral/family-preservation/case-plan-goals/view";
        break;
      case "case-evaluation":
        listLabel = "Case Evaluation";
        listHref =
          "/reports/referral/family-preservation/case-evaluations/view";
        break;
      case "case-team":
        listLabel = "Case Team";
        listHref = "/reports/referral/family-preservation/case-team/view";
        break;
      case "extended-family":
        listLabel = "Extended Family";
        listHref = "/reports/referral/family-preservation/extended-family/view";
        break;
      case "home-county":
        listLabel = "Home County";
        listHref = "/reports/referral/family-preservation/home-county/view";
        break;
      case "sfcs-office":
        listLabel = "SFCS Office";
        listHref = "/reports/referral/family-preservation/sfcs-office/view";
        break;
      case "court-order":
        listLabel = "Court Order List";
        listHref = "/reports/referral/family-preservation/court-order/view";
        break;
    }
    return breadcrumb.splice(
      2,
      2,
      { label: caseLabel, href: caseHref, active: "" },
      { label: listLabel, href: listHref, active: "" }
    );
  }
  rfcBreadcrumbs(node, breadcrumb) {
    let caseLabel, caseHref, listLabel, listHref;
    caseLabel = "Case Form";
    caseHref = "/reintegration/referral/detail";
    switch (node) {
      case "assessments":
        listLabel = "Assessment List";
        listHref = "/reintegration/referral/opencard/assessments/view";
        break;
      case "case-activity":
        listLabel = "Case Activity List";
        listHref = "/reintegration/referral/opencard/case-activity/view";
        break;
      case "case-plan-goals":
        listLabel = "Case Plan Goals List";
        listHref = "/reintegration/referral/opencard/case-plan-goals/view";
        break;
      case "case-evaluation":
        listLabel = "Case Evaluation";
        listHref = "/reintegration/referral/opencard/case-evaluations/view";
        break;
      case "case-team":
        listLabel = "Case Team";
        listHref = "/reintegration/referral/opencard/case-team/view";
        break;
      case "extended-family":
        listLabel = "Extended Family";
        listHref = "/reintegration/referral/opencard/extended-family/view";
        break;
      case "home-county":
        listLabel = "Home County";
        listHref = "/reports/referral/family-preservation/home-county/view";
        break;
      case "sfcs-office":
        listLabel = "SFCS Office";
        listHref = "/reports/referral/family-preservation/sfcs-office/view";
        break;
      case "court-order":
        listLabel = "Court Order List";
        listHref = "/reintegration/referral/opencard/court-order/view";
        break;
    }
    return breadcrumb.splice(
      2,
      2,
      { label: caseLabel, href: caseHref, active: "" },
      { label: listLabel, href: listHref, active: "" }
    );
  }

  navigateToListView(node, referralTypeId) {
    if (referralTypeId === 1) {
      this.rfcListViewNavigation(node);
    } else if (referralTypeId === 2) {
      this.fpListViewNavigation(node);
    } else if (
      (referralTypeId === 7 && node === "case-activity") ||
      (referralTypeId === 7 && node === "case-team") ||
      (referralTypeId === 7 && node === "court-order") ||
      (referralTypeId === 7 && node === "home-county") ||
      (referralTypeId === 7 && node === "sfcs-office")
    ) {
      this._router.navigate(["/reports/nc-rfc/list"]);
    }
    // referralTypeId == 1 ? this.rfcListViewNavigation(node) : this.fpListViewNavigation(node);
  }

  breadcurmbsDetermination(node, referralTypeId, breadcrumb) {
    return referralTypeId == 1
      ? this.rfcBreadcrumbs(node, breadcrumb)
      : this.fpBreadcrumbs(node, breadcrumb);
  }

  setCisJsonVersion(version) {
    this.cisVersion = version;
    return this.cisVersion;
  }

  getCisJsonVersion() {
    return this.cisVersion;
  }
  setBatchType(type) {
    this.batchType = type;
    return this.batchType;
  }

  getBatchType() {
    return this.batchType;
  }

  async getCisBaJson(req) {
    return await this._http
      .post(this.endPoint.localUrl + this.behavioralId, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  async getBehavioralList(req) {
    return await this._http
      .post(this.endPoint.localUrl + this.behavioralList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  async getBehavioralCisJson(req) {
    return await this._http
      .post(
        this.endPoint.localUrl + this.behavioralCisJson,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  setAsqData(asqName, isAsqFormed) {
    this.asqName = asqName;
    this.isAsqFormed = isAsqFormed;
  }

  setCaseActivityData(formName) {
    this.formName = formName;
    // this.isAsqFormed = isAsqFormed;
  }

  getCaseActivityData() {
    return this.formName;
  }

  getAsqData() {
    return {
      asqName: this.asqName,
      isAsqFormed: this.isAsqFormed,
    };
  }

  saveAttachment(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._httpVerb
        .post(this.endPoint.localUrl + this.saveCmsAttachment, req)
        .toPromise()
        .then((data: any) => resolve(data.json()));
    });
  }

  setCmsJson(jsonData, version) {
    this.cmsJson = jsonData;
    this.cmsVersion = version;
  }

  getCmsJson() {
    return {
      cmsJson: this.cmsJson,
      cmsVersion: this.cmsVersion,
    };
  }

  setLackOfContactCaseActivity(id) {
    console.log("id in setLackOfContactCaseActivity is", id);

    this.locCaseActiId = id;
  }

  getLackOfContCaseActId() {
    return this.locCaseActiId;
  }

  setOtherRefDetails(data) {
    this.otherReferralData = data;
  }

  getOtherRefDetails() {
    return this.otherReferralData;
  }

  getCaseTeamListResponse() {
    return this.caseTeamListResponse;
  }

  setCaseTeamListResponse(id) {
    this.caseTeamListResponse = id;
  }

  search_word(text, word) {
    let x = 0,
      y = 0;

    for (let i = 0; i < text.length; i++) {
      if (text[i] == word[0]) {
        for (let j = i; j < i + word.length; j++) {
          if (text[j] == word[j - i]) {
            y++;
          }
          if (y == word.length) {
            x++;
          }
        }
        y = 0;
      }
    }
    return x;
  }

  listOfPlacements(req) {
    return this._http
      .post(this.endPoint.localUrl + this.placementList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  export(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.exportList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getLivingArrangementList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.livingArrangementList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  setDigitalFormStream(stream) {
    this.digitalFormStream = stream;
  }

  getDigitalFormStream() {
    return this.digitalFormStream;
  }

  getNTFFStatusType(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.ntffStatusType, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  sendEmail(req: any) {
    console.log("req???", req);
    return this._http
      .post(this.endPoint.localUrl + this.emailTemplate, req)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  file_Delete(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.fileDelete, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  medicalAssementDdelete(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/medicalAssessment/delete",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  treatmentServiceDdelete(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/treatmentServices/delete",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  savePositionDelete(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/staffPosition/delete",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  staffTransferDelete(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/notificationTransfer/delete",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  medicalConditiondelete(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl +
          "/PRTF_Referral/clientMedicalConditions/delete",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  deleteNTFFAloneTime(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.nttfAloneTimeDelete,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  deleteUnusualIncident(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.unusualIncidentDelete,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveOPSReferral(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.ncOpsReferralSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdOPSReferral(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.ncOpsReferralGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateOPSReferral(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.ncOPsReferralUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getSerivceType() {
    return this._http
      .get(this.endPoint.localUrl + this.serviceType)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveServiceAgreement(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.serviceAgreementSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateServiceAgreement(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.serviceAgreementUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listServiceAgreement(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.serviceAgreementList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getServiceAgreement(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.serviceAgreementGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveNCFCH(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.ncfchSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateNCFCH(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.ncfchUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getRecByIdNCFCH(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.ncfchGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProcodeBasedOnReferralType(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.procodeBasedOnReferralType,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  deleteMentalStatus(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/progressNote/mentalStatus/delete",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  deleteMedicalNessicty(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/progressNote/medicalNecessity/delete",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  deleteSevirty(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl +
          "/progressNoteDiagnosis/progressNoteDiagnosisSpecifier/delete",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPersonAssignments() {
    return this._http
      .get(
        this.endPoint.localUrl + "/therapyParticipant/getPersonAssignmentType"
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPersonTypes(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl +
          "/therapyParticipant/getPersonsByPersonAssignmentType",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveParticipants(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/therapyParticipant/save",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getByParticipants(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/therapyParticipant/getById",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPlacementReferralList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementReferralList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPlacementReferralById(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementReferralGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getLivingArrangmentProcodes() {
    return this._http
      .get(this.endPoint.localUrl + this.livingArrangmentsProcodes)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveLivingArrangments(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.livingArrangmentsSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getCaseManagerList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.ackCaseManagerList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  sendMailPlacementReferral() {
    return this._http
      .get(this.endPoint.localUrl + this.placementReferralSendMail)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPlacementReferralCaseManager(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.ackPlacementReferralCaseManager,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getCaseManagerChangeReasonList() {
    return this._http
      .get(this.endPoint.localUrl + this.ackCaseManagerChangerReasonList)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getJudgeList(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.akcJudgeList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getOpenSchoolList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.ackOpenSchoolList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getAttendingSameSchoolReason() {
    return this._http
      .get(this.endPoint.localUrl + this.ackHomeSchoolReasonList)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getReasonLate() {
    return this._http
      .get(this.endPoint.localUrl + this.ackReasonLateList)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  errorHandlers() {
    swal("Warning", "Something went wrong. Please try again", "info");
    this._router.navigate(["/reports/person/types"]);
  }

  getLivingArrangementById(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.livingArrangementGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveNCRFC(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.ncrfcSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateNCRFC(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.ncrfcUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIDNCRFC(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.ncrfcGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateLivingArrangement(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.livingArrangementUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getLivingArrangementAuthorizations(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.livingArrangementsAuthorizations,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  providerAuthSummaryListView(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerAuthorizationSummaryList,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  providerLivArrangementListView(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerLivingArrangementList,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  placementAuthorizationSave(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementAuthorizationsSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  placementAuthorizationUpdate(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementAuthorizationsUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /** Request - {placementDetailID : current placement id} */
  getOverridingExistingAuthorizationList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.overridingExistingAuthorizationList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req {
   *  existing_authorizationID: selected authorization number,
   *  deletedBy: String,
   *  deletedDate: Current Date (timestamp)
   * }
   */
  deleteExistingAuthorizaion(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.deleteExistingAuthorizaionURI,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req
   * {
   * authorizationID: selected authorization number,
   * beginPagination: number,
   * endPagination: number
   * }
   */
  getCliamsByAuthorizationID(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.claimsByAuthorizations,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveDaycareAuthorizations(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.dayCareAuthorizationsSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getDayCareAuthorizationsGetbyById(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.dayaCareAuthorizationsGetbyById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req
   * {
   * placementID: current placementId
   * beginDate: number
   * endDate: number
   * }
   */
  listDayCareAuthorizations(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.dayaCareAuthorizationsList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateDaycareAuthorizations(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.dayCareAuthorizationsUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPlacementEventList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementEventList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  storeMovePrintData(
    move,
    autofetch,
    moveAutoFetch_sfcsOffice,
    newProviderInfo
  ) {
    this.movePrintData = move;
    this.moveAutofetchData = autofetch;
    this.isMovePrintSet = true;
    this.moveOffice = moveAutoFetch_sfcsOffice;
    this.newProviderInfo = newProviderInfo;
  }

  getMovePrintData() {
    const data = {
      isTrue: this.isMovePrintSet,
      move: this.movePrintData,
      autofetch: this.moveAutofetchData,
      moveOffice: this.moveOffice,
      newProviderInfo: this.newProviderInfo,
    };
    return data;
  }

  getAutofetchInfoMoveForm(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.moveFormAutofetch,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getMoveFormRelativeTypes(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.moveFormRelativeTypes,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveMoveForm(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.moveFormSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderAddressMoveForm(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.moveGetAddressByProvider,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPlacementLevel() {
    return this._http
      .get(this.endPoint.localUrl + this.placementCareList)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPlacementReferralCasePlanGoals() {
    return this._http
      .get(this.endPoint.localUrl + this.placementReferralCasePlanGoalsList)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPlacementReferralDirectors() {
    return this._http
      .get(this.endPoint.localUrl + this.placementReferralDirectorList)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPlacementReferralDirectorsLevelOfCare() {
    return this._http
      .get(this.endPoint.localUrl + this.placementReferralDirectorLevelOfCare)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param clientId current client id number
   * @param req
   * {
   *  openCard: string eg:"ClientStrength"
   *  beginPagination: number,
   *  endPagination:  number,
   * }
   */
  listViewOfClientOpencards(clientId: number, req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/client/opencards/" + clientId + "/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  savePlacementReferral(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementReferralSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getAutoFecthInfoForPlacementRef(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementRefAutoFetch,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdPlacementReferral(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementRefGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req  { value: string, beginPagination: number, endPagination: number}
   */
  getState(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.stateList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req  { stateID: number, value: string, beginPagination: number, endPagination: number}
   */
  getStateFromCity(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.cityListBasedOnState,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPlacementEventAuthorizationList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementEventAuthorizationList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  placementEventAuthorizationUpdate(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          this.endPoint.localUrl + this.placementEventAuthorizationsUpdateAPI,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  /**
   *
   * @param req { existing_authorizationID: number, deletedBy: string, deleteBy: number}
   */
  deletePlacementAuthorization(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.deletePlacementAuthorizationURI,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  viewDeletePlacementAuthorization(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.viewDeletedPlacementAuthListURI,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  storePlacementReferralInfo(placementRef, autofetch) {
    this.placementRefInfo = {
      placementRef: placementRef,
      autofetch: autofetch,
    };
  }

  getPlacementReferralInfo() {
    return this.placementRefInfo;
  }

  storePlacementPlanInfo(data, autofetch) {
    this.placementPlanInfo = {
      placementPlan: data,
      autofetch: autofetch,
    };
  }

  getPlacementPlanInfo() {
    return this.placementPlanInfo;
  }
  getPlacementReferralAuthLength() {
    return this._http
      .get(this.endPoint.localUrl + this.placementAuthLength)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  savePlacementPlan(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementPlanSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req
   * {referralID: number, placementID : number (default is 0)}
   */
  getPreviousPlacementProvider(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.previousPlacementProviderName,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req
   * {value: string, beginDate: number, referralTypeID: number, beginPagination: number, endPagination: number, sort: object}
   * {sort:{column:providerName, mode:desc}}
   */
  getProviderListWithSponsor(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerListWithSponsor,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getNearBySchools(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.moveGetNearBySchools,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPlacementPlanList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementPlanList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  autofetchPlacementPlanInfo(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementPlanAutofetch,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPlacementPlanPhoneNumbers(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementPlanPhoneNumbers,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdPlacementPlan(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementPlanGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPersonDublicates(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/person/getPersonValidation",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  providerRecruitmentListView(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerRecruitmentList,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  providerRecruitmentInquiryListView(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerRecruitmentInquiryList,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  providerRecruitmentStaffListView(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerRecruitmentStaffList,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  casaCasesListView(data) {
    return this._http
      .post(this.endPoint.localUrl + this.casaCasesList, JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  commMemberCasesListView(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.commMemberCasesList,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  personTypeCardSchoolListView(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.personTypesSchoolList,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  dropdownListView(data) {
    return this._http
      .post(this.endPoint.localUrl + this.dropdownList, JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  dropdownZipCode(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.dropdownZipcodeList,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveSchoolPersonType(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.schoolPersonTypeSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateSchoolPersonType(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.schoolPersonTypeUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdPersonTypeSchool(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.personTypeSchoolGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  personTypeCardAttendingSchoolListView(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.personTypesAttendingSchoolList,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  personTypeCardHomeSchoolListView(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.personTypesHomeSchoolList,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  setCurrentProviderName(providerName) {
    this.currentProviderName = providerName;
  }

  getCurrentProviderName() {
    return this.currentProviderName;
  }

  storeSchoolCatagory(name) {
    this.schoolCatagoryName = name;
  }

  getSchoolCatagory() {
    return this.schoolCatagoryName;
  }

  exportPlacementRefSubnodeListView(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.exportListViewForPlacementRef,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  exportPlacementPlanSubnodeListView(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.exportListViewForPlacementPlan,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listViewOfPlanOfAction(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementPlanPlanOfActionList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listViewOfOtherParticipants(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.placementPlanOtherParticipantsList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  /**
   *
   * @param req
   * {
   *  providerMemberID: Number,
   *  beginPagination: Number,
   *  endPagination: Number,
   *  sort: { column: 'beginDate' , mode: 'desc'}
   * }
   */
  getProviderMembersProviderList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerMembersProviderList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req
   * {
   * otherAgencyStaffID : Number,
   * beginPagination: Number,
   * endPagination: Number,
   * sort: { column: 'providerName',mode:'desc'}
   * }
   */
  getOtherAgencyStaffProviderList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.otherAgencyStaffsProvidersList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req
   * {
   * payorID: Number,
   * beginPagination: Number,
   * endPagination: Number
   * }
   */
  getPayorsCases(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.payorCases, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPayorsPlacementAuth(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.payorPlacementAuth,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  sponsorContractList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.sponsorContractListApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderSponsorCaseList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerSponsorCasesListApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderSponsorSfcsContractList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.sponsorContractListApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getSponsorContractType() {
    return this._http
      .get(this.endPoint.localUrl + this.getSponsorContractTypeApi)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveSfcsContract(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.sfcsContractSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateSfcsContract(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.sfcsContractUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getSponsorContractById(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.sfcsContractGetByIdApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderSponsorPlaAuthorizationList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.sponsorPlaceAuthListApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  providerSponsorList(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerSponsorListApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveProviderSponsor(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerSponsorSaveApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderSponsorById(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerSponsorGetByIdApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getDhsOfficeList(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.dhsOfficeListApi, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getAreaOfficeList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.areaOfficeListApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveDhsOffice(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.dhsOfficeSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateDhsOffice(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.dhsOfficeUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdDhsOffice(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.dhsOfficeGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getDhsOfficeStaffList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.dhsOfficeStaffListApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getDhsOfficeCasesList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.dhsOfficeCaseListApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getHOH_list(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/clientReferral/hoh/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPlacementProcodes(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.getPlacementProcodesApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getServiceAndSupport() {
    return this._http
      .get(this.endPoint.localUrl + this.getServiceSupportApi)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getAttachedDocsList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.caseactivityAttachmentList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderStrengthList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.getProviderStrengthListApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req
   * {
   * dhsStaffID: Number,
   * beginPagination: Number,
   * endPagination: Number,
   * sort: { column: 'beginDate', mode:'desc'}
   * }
   */
  getDHSStaffCase(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.dhsStaffCase, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req
   * {
   * dhsStaffID: Number,
   * beginPagination: Number,
   * endPagination: Number,
   * sort: { column: 'officeName', mode:'desc'}
   * }
   */
  getDHSStaffOffice(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.dhsStaffOffice, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req
   * {
   * dhsStaffID: Number,
   * beginPagination: Number,
   * endPagination: Number,
   * sort: { column: 'countyName', mode:'desc'}
   * }
   */
  getDHSStaffCounty(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.dhsStaffCounty, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  // }

  downloadAttachedDocument(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.behavioralCisJson,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  /**
   *
   * @param req
   * {
   * Object:"dhsOffice",
   * value: String,
   * beginPagination: Number,
   * endPagination: Number
   * }
   */
  getDHSOfficeDropDownList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.dhsOfficeDropdown,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updatePlacementSchool(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.updatePlacementSchoolApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getJudgeCases(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.judgeCaseApi, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getGalCases(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.galCaseApi, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getFmHouseholdCases(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.fmHouseholdCasesApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getFmExtendedFamilyCases(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.fmExtendedFamilyCasesApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getCrbCases(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.crbCaseApi, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveBhOkReferral(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.bhokSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateBhOkReferral(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.bhokUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getBHOKsfcsOfficeDropdown(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(this.endPoint.localUrl + "/BHOKReferral/sfcsOffice")
        .toPromise()
        .then((data: any) => resolve(data.sfcsOffice));
    });
  }

  getBHOKsfcsWorkerDropdown(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(this.endPoint.localUrl + "/BHOKReferral/sfcsStaff")
        .toPromise()
        .then((data: any) => resolve(data.sFCSStaff));
    });
  }
  getBHOKdhsStaffDropdown(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(this.endPoint.localUrl + "/BHOKReferral/dHSStaff")
        .toPromise()
        .then((data: any) => resolve(data.dHSStaffList));
    });
  }
  getBHOKotherAgencyStaffDropdown(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(this.endPoint.localUrl + "/BHOKReferral/otherAgencyStaff")
        .toPromise()
        .then((data: any) => resolve(data.otherAgencyStaffList));
    });
  }
  getBHOKreasonDeclineDropdown(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(this.endPoint.localUrl + "/BHOKReferral/reasonForDecline")
        .toPromise()
        .then((data: any) => resolve(data.declineList));
    });
  }
  getBHOKhomeCountyDropdown(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          this.endPoint.localUrl + "/dhsStaffCounty/getCounty",
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.countyList));
    });
  }
  getByIdBHOKreferral(req) {
    return this._http
      .post(this.endPoint.localUrl + this.bhokGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listBhokHealthList(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.bhokhealthList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveNCHSReferral(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.nCHSSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateNCHSReferral(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.ncfchUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getNCHSReferralByID(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.nCHSGetByID, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  // async getSibsCountPlacements(req) {
  //   return await this._http.post(this.endPoint.localUrl + this.placementgetSibsCountApi, JSON.stringify(req)).toPromise()
  //     .then(this._home.extractedData).catch(this._home.errorHandler);
  // }

  getProviderSponsorList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.getProviderSponsor,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderponsorClosureReason(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerSponsorClosureReason,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderProfileInfo(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerProfileInfo,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getStaffInfo(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/person/getProfileInfo",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getStaffNameInfo(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/transfer/getStaffTeamMembers",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getDhsStaffCounties(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.dhsStaffCounties,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveDhsStaffCounty(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.dhsStaffCountySave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateDhsStaffCounty(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.dhsStaffCountyUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  customerCarePersonList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.custCarePersonListApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getDcfStaffCases(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.dcfStaffCaseApi, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getDcfStaffOffices(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.dcfStaffOfficeApi,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getCISFormsList(req: any, URI: string) {
    return this._http
      .post(this.endPoint.localUrl + URI, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getCISForm(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/BADoc/getScanDocumentByBaDocID",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getScannerdDocumentTypes(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/scannedDocument/getDucmentTypes",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getCityFromState(req: { stateID: number }) {
    return this._http
      .post(this.endPoint.localUrl + "/dropDown/state", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getZipcodeFromCity(req: { stateID: number; cityID: number }) {
    return this._http
      .post(this.endPoint.localUrl + "/dropDown/zipcode", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  customerCarePersonSave(req: any) {
    return this._http
      .post(this.endPoint.localUrl + "/person/save", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  customerCarePersonUpdate(req: any) {
    return this._http
      .post(this.endPoint.localUrl + "/person/update", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  customerCarePersonGet(req: { custCarePersonID: number }) {
    return this._http
      .post(this.endPoint.localUrl + "/person/getByPerson", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getAttachmentsByNode(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/scannedDocument/getFileNameByPrimaryKey",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  sendEmailWithAutoAttachment(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/sendEmailWithAutoAttchment",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getJJFCRefReasonForDenial(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(this.endPoint.localUrl + "/JJ_FCReferral/reasonForDecline")
        .toPromise()
        .then((data: any) => resolve(data.DenialList))
        .catch(this._home.errorHandler);
    });
  }

  getJJFCRefAcceptedOrDeclinedReason(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(this.endPoint.localUrl + "/JJ_FCReferral/referralAccepted")
        .toPromise()
        .then((data: any) => resolve(data.referralAcceptedList))
        .catch(this._home.errorHandler);
    });
  }

  getJJFCPermanencyGoal(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(this.endPoint.localUrl + "/JJ_FCReferral/permanencyGoal")
        .toPromise()
        .then((data: any) => resolve(data.permanencyGoalList))
        .catch(this._home.errorHandler);
    });
  }

  getJJFCJudicialDistrict(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(this.endPoint.localUrl + "/JJ_FCReferral/judicialDistrict")
        .toPromise()
        .then((data: any) => resolve(data.judicialDistrictList))
        .catch(this._home.errorHandler);
    });
  }

  getJJFCCSOWorker(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(this.endPoint.localUrl + "/JJ_FCReferral/csoWorker")
        .toPromise()
        .then((data: any) => resolve(data.csoWorkerList))
        .catch(this._home.errorHandler);
    });
  }

  getJJFCSFMStaff(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(this.endPoint.localUrl + "/JJ_FCReferral/sfcsStaff")
        .toPromise()
        .then((data: any) => resolve(data.sFCSStaff))
        .catch(this._home.errorHandler);
    });
  }

  getJJFCSFMOffice(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(this.endPoint.localUrl + "/JJ_FCReferral/sfcsOffice")
        .toPromise()
        .then((data: any) => resolve(data.sfcsOffice))
        .catch(this._home.errorHandler);
    });
  }

  saveJJFCReferral(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          this.endPoint.localUrl + "/JJ_FCReferral/save",
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  updateJJFCReferral(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          this.endPoint.localUrl + "/JJ_FCReferral/update",
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getDropdownValues(req: { Object: string; value: string }): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          this.endPoint.localUrl + "/dropDown/contains",
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.dropDown))
        .catch(this._home.errorHandler);
    });
  }

  saveNCMHRReferral(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/NC_MHRReferral/save`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  updateNCMHRReferral(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/NC_MHRReferral/update`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getNCMHRReferralByID(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/NC_MHRReferral/getById`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getClientFullInfo(req: { clientID: number }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/person/getByPerson`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.person))
        .catch(this._home.errorHandler);
    });
  }
  groupList() {
    return this._http
      .get(this.endPoint.localUrl + "/group/list")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  all_menuLevel(req: any) {
    return this._http
      .post(this.endPoint.localUrl + "/menu/list", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  allUserLevel(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/user/getUserDropDown",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  referesh_findAllmenu(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/permissionAppMenu/findAllPermissions",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  deleteAttachments(req: {
    module: string;
    moduleID: number[];
    staffID: string;
  }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}/delete`, JSON.stringify(req))
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getJJFCById(req: { referralID: number; clientID: number }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/JJ_FCReferral/getById`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  progressNotePreviousGoalInformation(req: {
    referralID: number;
    clientID: number;
  }): Promise<string> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}progressNote/getPreviousGoals`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) =>
          resolve(data.progressNotepreviousGoal[0].ObjectiveAddressed)
        )
        .catch(this._home.errorHandler);
    });
  }

  otpCodeVerifcation(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}verifyOtp`, JSON.stringify(req))
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getProviderRelativeTypes(): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}/moveEvent/getRelativeTypes`)
        .toPromise()
        .then((data: any) => resolve(data.relativeType))
        .catch(this._home.errorHandler);
    });
  }

  getOtherProviders(): Promise<any[]> {
    const req = {
      value: "",
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "OtherProviderName", mode: "desc" },
    };
    console.log("Request", req);
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}moveEvent/getOtherProviderName`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.otherProviderNameList))
        .catch(this._home.errorHandler);
    });
  }

  getProviderAddress(req: { pcSiteOtherProviderID: number }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/moveEvent/getProviderAddress`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.providerInfo))
        .catch(this._home.errorHandler);
    });
  }

  getNewProviderTypes(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}/moveEvent/getProviderType`)
        .toPromise()
        .then((data: any) => resolve(data.providerTypes))
        .catch(this._home.errorHandler);
    });
  }

  saveNewProvider(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/moveEvent/PCSiteOtherProvider/save`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  updateNewProvider(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/moveEvent/PCSiteOtherProvider/update`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getClaimsStatus(): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}/claim/getClaimStatus`)
        .toPromise()
        .then((data: any) => resolve(data.claimStatusList))
        .catch(this._home.errorHandler);
    });
  }

  updateClaims(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}/claim/update`, JSON.stringify(req))
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  livingArrangementEmailNotification(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/sendEmailBasedOnStaff`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getListOfAuthorizations(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/authorization/getCSAuthorizationsList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getListOfAuthorizations_provider(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/authorization/getCSAuthorizationsProviderList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }
  getListOfAuthorizations_payee(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/authorization/getCSAuthorizationsPayeeList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getListOfAuthorizations_provider_claim(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/csPayee/getauthorizationClaimList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  saveMenuAccess(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/permissionAppMenu/save",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  checkPlacementSiblings(req: {
    referralID: number;
    clientID: number;
    beginDate: string;
  }): Promise<number> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/placement/getSibsCount`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.sibsCount.NUM_OOH))
        .catch(this._home.errorHandler);
    });
  }

  setMoveFormNewProviderInfo(moveFormNewProviderData: any) {
    return (this.moveFormProviderInfo = moveFormNewProviderData);
  }
  getMoveFormNewProviderInfo() {
    return this.moveFormProviderInfo;
  }

  getDefaultUnitsByProcode(req: { procodeID: number }): Promise<number> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}procode/getDefaultUnits`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.defaultUnit))
        .catch(this._home.errorHandler);
    });
  }

  getPPS5120PrintAckFormValues(req: {
    referralID: number;
    clientID: number;
    authorizationID: number;
    phaseID: number;
    pwsClientID: number;
    releasedFromSRSCustodyClientID: number;
  }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/getAcknowledgementOption`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deletePlacementAndPlacementEventRecords(req: {
    clientID: number;
    placementDetailID: number;
    placementID: number;
    referralID: number;
  }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/placementDelete`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getCaseManagerChangeReason(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}printAck/caseManager/changeReason`)
        .toPromise()
        .then((data: any) => resolve(data.changeReasonList));
    });
  }

  getPlacemtnAckFormSchool(req: { referralID: number }): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/getSchool`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.schoolList));
    });
  }

  getPlacementAckSchoolChangeReason(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}printAck/getSchoolReason`)
        .toPromise()
        .then((data: any) => resolve(data.schoolReasonList));
    });
  }

  getPlacementAckReasonOfLate(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}printAck/getReasonLate`)
        .toPromise()
        .then((data: any) => resolve(data.reasonLateList));
    });
  }

  getOtherAgencyStaffPersonType(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(
          `${this.endPoint.localUrl}providerOtherAgencyStaff/personTypeDropDown`
        )
        .toPromise()
        .then((data: any) => resolve(data.providerpersonTypeList));
    });
  }

  getOtherAgencyStaffStaff(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}providerOtherAgencyStaff/staffDropDown`)
        .toPromise()
        .then((data: any) => resolve(data.staffList));
    });
  }

  getSFAStaffPersonType(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}providerSFAStaff/getPersonTypes`)
        .toPromise()
        .then((data: any) => resolve(data.personTypeList));
    });
  }

  getSFAStaff(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}providerSFAStaff/getStaffDropDown`)
        .toPromise()
        .then((data: any) => resolve(data.staffList));
    });
  }

  getProviderAdultList(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerMember/adultList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getProviderChildList(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerMember/childList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getCaseByPerson(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}/case/getByPerson`, JSON.stringify(req))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getProviderByPerson(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/provider/getProviderByStaff`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getMedicalAssessment(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/medicalAssessment/list`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getPayeeAuthList(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/payee/getPayeeAuthorization`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getPayeeserviceHardAuthList(req: any) {
    return this._http.post<any>(
      `${this.endPoint.localUrl}/payee/getClaimsAuthorization`,
      JSON.stringify(req)
    );

    //  return this._http.post(`${this.endPoint.localUrl}/payee/getClaimsAuthorization`, JSON.stringify(req))
    //   .map((response: Response) =>{
    //     console.log (response.json());
    //     })
  }
  getTreatmentServices(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/treatmentServices/list`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getStaffPositionList(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/staffPosition/list`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getStaffNotificationTranferList(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/notificationTransfer/notificationTransferList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getCsClientDirectList(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/csClient/getdirectAuthorizationList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getCsClientAuthList(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/csClient/getauthorizationList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getReferralRec(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/referral/getRecentContract`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getCsClientClaimList(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/csClient/getauthorizationClaimList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getMedicalConditionServices(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/PRTF_Referral/clientMedicalConditions/list`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getTreatmentById(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/treatmentServices/getById`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getPositionStafftById(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/staffPosition/getById`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getNotificationTransStafftById(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/notificationTransfer/getnotificationTransfer`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getMedAssesmentById(req: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/medicalAssessment/getById`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getTreatmentAllTypes(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}treatmentServices/getTreatmentType`)
        .toPromise()
        .then((data: any) => resolve(data.treatmentTypeList));
    });
  }
  getStaffPositionTypes(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}personType/IsStaffPosition`)
        .toPromise()
        .then((data: any) => resolve(data.persontypes));
    });
  }
  getPlacementEmailOptions(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}provideremail/searchOption`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getProviderEmailModuleSearchResults(request: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}provideremail/searchEmails`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getProivderIRClientList(request: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}identifiedResource/clientDropDown`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.clientList));
    });
  }

  providerEmailModuleProviderResultExport(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}provideremail/exportProviderResult`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  providerEmailModuleSearchOptionExport(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}provideremail/exportSearchOption`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  clientIdentifyResourceUpdate(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}identifiedResource/save/referralID`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getIdentifyResourceClosureReason(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}identifiedResource/closeReasonDropDown`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.dropDown));
    });
  }

  getPRTFAutoFetchInformation(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}PRTF_Referral/getById`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  initalPRTFReferralCreation(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}PRTF_Referral/createBlank`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.referralID));
    });
  }

  getClientDetailByClientID(request: {
    clientID: number;
  }): Promise<SharedClient> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}person/getByPerson`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.person));
    });
  }

  updateClientDetails(request: SharedClient): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/update`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getPRTFDischargecode(request: { beginDate: string }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}PRTF_Referral/getDischargeCode`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.dischargeCode));
    });
  }

  listPrtfPR(req) {
    return this._http
      .post(this.endPoint.localUrl + this.prtfPRList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveFamilyMemberReferral(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyMemberReferral/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  listFamilyMemberReferral(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyMemberReferral/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.FamilyMemberReferral));
    });
  }

  getFamilyMemberReferralRecord(request: {
    familyMemberReferralID: number;
  }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyMemberReferral/getById`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.FamilyMemberReferral));
    });
  }

  updateFamilyMemberReferralRecord(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyMemberReferral/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.FamilyMemberReferral));
    });
  }

  deleteNode(req: {
    module: string;
    moduleID: number[];
    staffID: string;
  }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}/delete`, JSON.stringify(req))
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  insertRecuritmentReferral(request: { staffID: number }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/recruitmentInquiry/saveReferralRequest`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listOfCaseTeam(request: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}caseTeam/list`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data.casePlan))
        .catch(this._home.errorHandler);
    });
  }

  getCaseTeamRecord(request: { caseTeamId: number }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}caseTeam/list/id`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.caseTeam))
        .catch(this._home.errorHandler);
    });
  }

  getPersonTypesForReferralTypes(request: {
    beginDate: string;
    referralTypeID: number;
  }): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}dropDown/personType`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.dropDown))
        .catch(this._home.errorHandler);
    });
  }

  getPersonSubTypesForReferralTypes(request: {
    personTypeID: number;
  }): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}dropDown/personAssignmentType`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.dropDown))
        .catch(this._home.errorHandler);
    });
  }

  saveCaseTeamDetails(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}caseTeam/save`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data.caseTeam))
        .catch(this._home.errorHandler);
    });
  }

  updateCaseTeamDetails(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}caseTeam/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.caseTeam))
        .catch(this._home.errorHandler);
    });
  }

  getPRTFAgencyNames(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}payor/getDropdown`)
        .toPromise()
        .then((data: any) => resolve(data.payor))
        .catch(this._home.errorHandler);
    });
  }

  getPRTFCommunityMember(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}PRTF_Referral/getCommunityMember`)
        .toPromise()
        .then((data: any) => resolve(data.communityMember))
        .catch(this._home.errorHandler);
    });
  }

  getPRTFStaff(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}getStaffDropdown`)
        .toPromise()
        .then((data: any) => resolve(data.staff))
        .catch(this._home.errorHandler);
    });
  }

  getTreatmentDecisionsPersonTable(request: {
    referralTypeID: number;
  }): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}PRTF_Referral/getPersonAssignmentTypesByReferral`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.personAssignmentType))
        .catch(this._home.errorHandler);
    });
  }

  getTreatmentDecisionsPersonAssigmentTyes(request: {
    personAssignmentTypeID: number;
    referralID: number;
  }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}PRTF_Referral/getPersonByReferralIDAndAssignmentType`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.person))
        .catch(this._home.errorHandler);
    });
  }

  saveTreatmentDecsions(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}treatmentDecisions/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.person))
        .catch(this._home.errorHandler);
    });
  }

  listTreatmentDecsions(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}treatmentDecisions/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.treatmentDecisions))
        .catch(this._home.errorHandler);
    });
  }

  getTreatmentDecisionsById(request: {
    treatmentDecisionsID: number;
  }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}treatmentDecisions/getById`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.treatmentDecisions))
        .catch(this._home.errorHandler);
    });
  }

  updateTreatmentDecisions(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}treatmentDecisions/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.treatmentDecisions))
        .catch(this._home.errorHandler);
    });
  }

  saveAttendingSchoolDetails(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientSchool/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  updateAttendingSchoolDetails(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientSchool/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getByRecAttendingSchoolDetails(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/clientSchool/getById`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.clientSchool))
        .catch(this._home.errorHandler);
    });
  }

  listAllAttendingSchoolDetails(request: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/clientSchool/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.clientSchool))
        .catch(this._home.errorHandler);
    });
  }

  loginApp(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/loginInfo/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  prtfSave(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}PRTF_Referral/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.referral))
        .catch(this._home.errorHandler);
    });
  }

  prtfUpdate(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}PRTF_Referral/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listOfSiblingsInOutHomeOOH(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientReferral/sibilingsInOutHome/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.sibOOH))
        .catch(this._home.errorHandler);
    });
  }

  saveMedications(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientMedication/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listOfMedications(request: any, clientId: number): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}client/opencards/${clientId}/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.openCardList))
        .catch(this._home.errorHandler);
    });
  }

  getMedicationsRecord(request: { clientMedicationID: number }): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientMedication/getById`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.clientMedication))
        .catch(this._home.errorHandler);
    });
  }

  updateMedications(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/clientMedication/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.clientMedication))
        .catch(this._home.errorHandler);
    });
  }

  saveAllergies(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientAllergy/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listAllergies(request: any, clientID: number): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}client/opencards/${clientID}/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.openCardList))
        .catch(this._home.errorHandler);
    });
  }

  getAllergiesById(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientAllergy/getById`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.clientAllergy))
        .catch(this._home.errorHandler);
    });
  }

  updateAllergies(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientAllergy/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listOfRecuritmentReferrals(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}recruitmentReferral/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getRecuritmentReferralId(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}recruitmentReferral/loadExitingRefferralPDF`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  createNewRecuritmentReferral(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}recruitmentReferral/getNewReferralPDF`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listOfRecuritmentTraining(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}recruitmentTraining/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getByIdRecruitmentTraining(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}recruitmentTraining/getById`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  updateRecruitmentTraining(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}recruitmentTraining/update`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getRecruitmentLicensingType(): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .get(
          `${this.endPoint.localUrl}recruitmentTraining/getRecruitmentLicensingType`
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getRecruitmentTrainingType(): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .get(
          `${this.endPoint.localUrl}recruitmentTraining/getRecruitmentTrainingType`
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getReferralSourceCategory(): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .get(
          `${this.endPoint.localUrl}recruitmentTraining/getReferralSourceCategory`
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getReferralSourceType(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}recruitmentTraining/getReferralSourceType`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  exportFamilyMember(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}PRTF_Referral/getFamilyMemberReferral`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  exportSiblingInOOH(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}PRTF_Referral/getSibInOOH_Linked`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  exportMedication(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}PRTF_Referral/getClientMedication`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listOfRecuritmentLicensing(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}recruitmentLicensingEvent/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getByIdRecruitmentLicensing(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}recruitmentLicensingEvent/getById`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  updateRecruitmentLicensing(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}recruitmentLicensingEvent/update`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  placementProcode(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/getProcodes`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.procodeList))
        .catch(this._home.errorHandler);
    });
  }

  placementHasSiblinginOOHPlacement(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/getSibsCount`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.sibsCount))
        .catch(this._home.errorHandler);
    });
  }

  placementProviders(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/getProviderDropDown`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.providerList))
        .catch(this._home.errorHandler);
    });
  }

  getPlacementHistoy(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/placementEventHistory`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.placementEventHistoryList))
        .catch(this._home.errorHandler);
    });
  }
  getLiviningArrangeHistoy(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}livingArrangement/getPrintHistory`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.placementEventHistoryList))
        .catch(this._home.errorHandler);
    });
  }
  listTreatmentDecisions(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.treatmentDecisionList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  exportPRTFCaseTeam(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}PRTF_Referral/getCaseTeamLinked`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  exportPRTFTreatmentDecision(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}PRTF_Referral/getTreatMentDecisions`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  exportPRTFSchool(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}PRTF_Referral/getTreatMentDecisions`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  saveTreatmentDecision(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.treatmentDecisionSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getAllPlacementPrintForms(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementPrintForms/getAll`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  sendEmailPlacementPrintForms(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementPrintForms/sendEmail`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  updateTreatmentDecision(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.treatmentDecisionUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdTreatmentDecison(req) {
    return this._http
      .post(
        this.endPoint.localUrl + this.treatmentDecisionGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listOfStaffTeamLeader(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffTeamLeader/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  updateTeamLeader(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffTeamLeader/update`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  saveTeamLeader(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffTeamLeader/save`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getByIdStaffTeamLeader(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffTeamLeader/getById`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listOfStaffTeamMember(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffTeamMembers/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listOfStaffComplianceTech(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffComplianceTech/teamMember/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  updateComplianceTech(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffComplianceTech/teamMember/update`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  saveComplianceTech(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffComplianceTech/teamMember/save`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getByIdStaffComplianceTech(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffComplianceTech/getById`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listOfStaffAssignedComplianceTech(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffComplianceTech/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  updateAssignedComplianceTech(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffComplianceTech/update`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  saveAssignedComplianceTech(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffComplianceTech/save`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listOfStaffRecruitmentProvider(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}recruitmentStaff/getByStaff`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listOfStaffPrimaryOffice(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffSFAOffice/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteStaffComplianceTech(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffComplianceTech/delete`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteStaffTeamLeader(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffTeamLeader/delete`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getFamilyChangeResourceWorker(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/getResourceWorker`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.resourceWorkerList))
        .catch(this._home.errorHandler);
    });
  }

  getFamilyChangeWeeks(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/getWeeklyDateRange`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.weeklyDateRangeList))
        .catch(this._home.errorHandler);
    });
  }

  getFamilyChangeProviderGrid(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/getWeeklyProviderList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.WeeklyProviderList))
        .catch(this._home.errorHandler);
    });
  }

  getFamilyChangeProviderProfile(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}provider/getProfile`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.profile))
        .catch(this._home.errorHandler);
    });
  }

  getFamilyChangeProviderTypes(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/getProviderTypeList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.weeklyProviderTypeList))
        .catch(this._home.errorHandler);
    });
  }

  getProviderSFAStaff(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/getResourceWorker`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getStaffLists(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}dropDown/contains`, JSON.stringify(req))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getProviderTypes(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/getProviderType`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.providerTypeList))
        .catch(this._home.errorHandler);
    });
  }

  deleteBasedOnParam(req: any, apiUrl) {
    return this._http
      .post(this.endPoint.localUrl + apiUrl, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  familyChangeSave(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/save`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.providerType))
        .catch(this._home.errorHandler);
    });
  }

  familyChangeAuthStaffID(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/getstaffIDWhoShouldAuth`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) =>
          resolve(data.staffIDWhoShouldAuthlist[0].staffIDWhoShouldAuth)
        )
        .catch(this._home.errorHandler);
    });
  }

  listOfStaffFamilyChangeApproval(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChangesApproval/getfamilychangesApprovalList`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listOfStaffFamilyChangeApprovalWeekList(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChangesApproval/getApprovalWeekList`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  listOfStaffFCAWeeklyChangeAuthWorker(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChangesApproval/getFCHWeeklyChangeAuthWorker`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  familyChangeApprovalSave(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChangesApproval/save`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  familyChangeApprovalgetWeeklyDateRange(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/getWeeklyDateRange`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  familyChangeCompleteChanges(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/completeChange`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  familyChangeCurrentValues(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/getCurrentValues`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.currentValuesList[0]))
        .catch(this._home.errorHandler);
    });
  }

  familyChangeApprovalgetCurrentValues(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/getCurrentValues`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  familyChangeGetListOfPreferredCapacity(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/getPreferredCapacityList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.preferredCapacityList))
        .catch(this._home.errorHandler);
    });
  }

  getPreferredCapcityMetaData(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/getPreferredCapacity`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.preferredCapacityList))
        .catch(this._home.errorHandler);
    });
  }

  getPreferredGenderList(): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}familyChanges/getGenderAndIsFlexible`)
        .toPromise()
        .then((data: any) => resolve(data.genderList))
        .catch(this._home.errorHandler);
    });
  }

  familyChangeGetPreferredGenderList(request: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChanges/getWeeklyChangesGenderList`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.weeklyChangesGenderList))
        .catch(this._home.errorHandler);
    });
  }

  getAllPlacementDeletePrintForms(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementPrintForms/delete/getAll`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  staffCardGetMethodAPI(url) {
    return this._http
      .get(`${this.endPoint.localUrl}${url}`)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  staffCardPostMethodAPI(request: any, url): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}${url}`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteLivingArrangement(req: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}livingArrangement/livingArrangementDelete`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deletePayeeLocation(req: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}payee/location/delete`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getProviderServiceAgreementPrintAckData(req: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/getProviderServiceAgreement`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.serviceAgreementList[0]))
        .catch(this._home.errorHandler);
    });
  }

  listPayeeLocation(req) {
    return this._http
      .post(`${this.endPoint.localUrl}payee/location/list`, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProviderStatusPrintAckData(req: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/getPlacementEventStatus`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.eventStatusList[0]))
        .catch(this._home.errorHandler);
    });
  }

  getPlacementAgreementPrintAckData(req: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/getFCHPlacementAgreement`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.placementAgreementList[0]))
        .catch(this._home.errorHandler);
    });
  }

  getPlacementContinumOfCareFlowChart(req: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/getFCHFlowChart`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.fchFlowChartList[0]))
        .catch(this._home.errorHandler);
    });
  }

  getPlacementFaxListData(req: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/getFaxList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.faxList[0]))
        .catch(this._home.errorHandler);
    });
  }

  savePrintAckOptions(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/saveAcknowledgementOption`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  savePrintAckProviderServiceAgreement(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/saveProviderServiceAgreement`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  savePrintAckPlacementAgreement(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/saveFCHPlacementAgreement`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  savePrintHistory(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/printAck/savePrintHistory`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteProviderPet(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerPet/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteProviderLicenseExpection(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerLicenseException/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteProviderLicense(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerLicense/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteProviderLocation(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerLocation/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteProviderStatus(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerStatus/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteProviderSchool(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerSchool/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteRecuritmentStaff(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}recruitmentStaff/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteProviderSFAStaff(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerSFAStaff/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteSFAOfficeStaff(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}sfaOfficeActivity/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteIdentifiedResource(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}identifiedResource/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteProviderSponsor(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerSponsor/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  deleteProviderOtherAgencyStaff(request: any) {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerOtherAgencyStaff/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  postApi(req: any, url): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}${url}`, JSON.stringify(req))
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getAPI(url) {
    return this._http
      .get(`${this.endPoint.localUrl}${url}`)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  placementAckClientSchoolDropdown(request: any): Promise<any[]> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}dropDown/clientSchool`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.clientSchool))
        .catch(this._home.errorHandler);
    });
  }

  getfamilychangesList(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/familyChanges/getfamilychangesList`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getResourceHomeListByStaffID(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/familyChanges/getResourceHomeListByStaffID`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getFamilyChangeForWorker(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/familyChanges/getFamilyChangeForWorker`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getPlacementHistoryList(req: any) {
    return this._http
      .post(
        `${this.endPoint.localUrl}/providerPlacementHistory/list`,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getStaffType(req: any) {
    return this._http
      .post(`${this.endPoint.localUrl}/getStaffType`, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getFiscalYear(req) {
    return this._http
      .post(
        `${this.endPoint.localUrl}/clientGradeSubmission/getFiscalYear`,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getQuarterList() {
    return this._http
      .get(`${this.endPoint.localUrl}/clientGradeSubmission/getFiscalQuarter`)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getclintGradeList() {
    return this._http
      .get(
        `${this.endPoint.localUrl}/clientGradeSubmission/getClientGradeSubmissionBatch`
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getClientGradeProcess(req) {
    return this._http
      .post(
        `${this.endPoint.localUrl}/clientGradeSubmission/process`,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getClientGradeRelode(req) {
    return this._http
      .post(
        `${this.endPoint.localUrl}/clientGradeSubmission/reload`,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getClientGradeExport(req) {
    return this._http
      .post(
        `${this.endPoint.localUrl}/clientGradeSubmission/export`,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  clientGradeTextFile(req) {
    return this._http
      .post(
        `${this.endPoint.localUrl}/clientGradeSubmission/createTxt`,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  clientGradePostTextFile(req) {
    return this._http
      .post(
        `${this.endPoint.localUrl}/clientGradeSubmission/post`,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  savePlacementClientSchool(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/placement/clientSchoolPlacement/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.responseMessage))
        .catch(this._home.errorHandler);
    });
  }

  exportProviderTraining(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerTraining/export`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getKaeseDuplicationValidation(request): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}person/getPersonValidation`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  siblingInOutFamilyList(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/clientReferral/sibilingsInOutHome/list",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getDraftClaim(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/findAllUserDraft",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getRespectiveClaim(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/findDraftsByClaimBatchId",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getAuthValidate(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/validateClaim",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  providerServiceAgreementExport(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementPrintForms/getByFormName`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.ProviderServiceAgreement.pdfDocId));
    });
  }

  getClaimProcodeBasedOnReferralType(req: any) {
    return this._http
      .post(this.endPoint.localUrl + "/claim/getProcodes", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getKSCounties(): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}getKSCounties`)
        .toPromise()
        .then((data: any) => resolve(data.dropDown));
    });
  }

  deletePlacementRecord(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/placement/placementDelete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.deletedList[0].rowsAffected));
    });
  }

  getLivingArrangementPrintForms(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/livingArrangement/getPrintAckForms`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getReferralReasonSupervisor(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "supervisoryStaffing/getReferralReason",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getKScountiesCourtCase(req: any) {
    return this._http
      .post(this.endPoint.localUrl + "getKSCounties", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getAgencySFMOfficeList(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/sfaOffice/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.sFAOfficeList));
    });
  }

  getDCFAreaOffice(): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}/sfaOffice/getSRSAreaOffice`)
        .toPromise()
        .then((data: any) => resolve(data.sRSAreaOffice));
    });
  }

  getCatchmentArea(): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}sfaOffice/getCatchmentArea`)
        .toPromise()
        .then((data: any) => resolve(data.catchmentArea));
    });
  }

  getCareCenterStaff(): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}getCareCenterStaff`)
        .toPromise()
        .then((data: any) => resolve(data.staff));
    });
  }

  getStaffByStateID(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}getStaffByStateID`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.staffList));
    });
  }

  saveSFMOfficeForm(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}sfaOffice/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.responseStatus));
    });
  }

  getSFMoffice(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}sfaOffice/getById`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  updateSFMOfficeForm(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}sfaOffice/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.responseStatus));
    });
  }

  getListOfGLKeysBySFAOfficeID(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}sFAOfficeGLKey/findAll`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  saveGLKey(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}sFAOfficeGLKey/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getByIDGLKey(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}sFAOfficeGLKey/getById`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  updateGLKey(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}sFAOfficeGLKey/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  sfmOfficeAgencyDelete(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}sfaOffice/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  sfmOfficeAgencyGLkeyDelete(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}sFAOfficeGLKey/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getPlacementSiblings(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementSiblings/client/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.sibOOH));
    });
  }

  savePlacementSiblingsSave(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementSiblings/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getPlacementSiblingsList(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementSiblings/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  updatePlacementSiblings(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementSiblings/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  deletePlacementSiblings(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementSiblings/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getPayeeDirectAuthList(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/csPayee/getdirectAuthorizationList`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getPayee_AuthList(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/authorization/getCSPayeeAuthorizationList`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  /**
   *
   * @param request {authorizationID: currentPlacemenAuthorizationID}
   */
  getPSAPrintPreviewFormData(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/getPlacementEventStatus`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.eventStatusList[0]));
    });
  }
  getKansas(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}procode/findAllProcodesByStates`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getNebraska(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}procode/findAllProcodesByStates`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getOklahoma(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}procode/findAllProcodesByStates`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getAutofetchInformationMoveForm(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.moveFormAutofetchInformation,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getLivingArrangementPrintForm(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}livingArrangement/delete/getPrintAckForms`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  /**
   *
   * @param request {authorizationID: int}
   */
  getDeleteAuthorizationPDFForms(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}getSavedPrintForms`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  /**
   *
   * @param request {procodeID: int, referralID: int}
   */
  procodeValidation(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/procodeValidation`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  /**
   *
   * @param request {placementDetailID: int}
   */
  getPlacementEventSavedPDFForms(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}getSavedPrintForms`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  /**
   *
   * @param request {authorizationID: init, staffID: init}
   */
  getPlacementAgreementFormPreview(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/getPlacementAgreement`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  /**
   *
   * @param request {placementDetailID: init}
   */
  placementEventDelete(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementDetail/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.deletedList[0].rowsAffected));
    });
  }

  /**
   * update the print preview/export forms content
   */

  placementFormsDetailUpdate(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementPrintForms/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  ackPlacementDetail(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/printAcknowledgementOption`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => {
          if (data.printAcknowledgementList.length > 0) {
            resolve({
              awol: data.printAcknowledgementList[0].awol,
              change: data.printAcknowledgementList[0].change,
              referralID: data.printAcknowledgementList[0].referralID,
              clientID: data.printAcknowledgementList[0].clientID,
              authorizationID: data.printAcknowledgementList[0].authorizationID,
              changeOfVenue: data.printAcknowledgementList[0].changeOfVenue,
              clarification: data.printAcknowledgementList[0].clarification,
              correctedCopy: data.printAcknowledgementList[0].correctedCopy,
              countyOfRemoval: data.printAcknowledgementList[0].countyOfRemoval,
              dateTime: data.printAcknowledgementList[0].dateTime,
              viewOnly: data.printAcknowledgementList[0].viewOnly,
              void: data.printAcknowledgementList[0].void,
              disruption: data.printAcknowledgementList[0].disruption,
              hospital: data.printAcknowledgementList[0].hospital,
              initial: data.printAcknowledgementList[0].initial,
              isPermClosure: data.printAcknowledgementList[0].isPermClosure,
              isPermCode: data.printAcknowledgementList[0].isPermCode,
              livingArrangement:
                data.printAcknowledgementList[0].livingArrangement,
              plannedMove: data.printAcknowledgementList[0].plannedMove,
              prevPL_TrialHomePlacement:
                data.printAcknowledgementList[0].prevPL_TrialHomePlacement,
              referralTypeID: data.printAcknowledgementList[0].referralTypeID,
              reinstatement: data.printAcknowledgementList[0].reinstatement,
              respite: data.printAcknowledgementList[0].respite,
              responseStatus: data.printAcknowledgementList[0].responseStatus,
              section1: {
                courtCase: data.printAcknowledgementList[0].courtCases,
                dob: data.printAcknowledgementList[0].dob,
                facts: data.printAcknowledgementList[0].facts,
                kaecsesID: data.printAcknowledgementList[0].kaecsesID,
                keesClientid: data.printAcknowledgementList[0].kaecses,
                nameofChild:
                  data.printAcknowledgementList[0].subject_ClientName,
              },
              section2: {
                providerTookPhysicalCustodyofChild:
                  data.printAcknowledgementList[0].receivedDateTime,
                referralReceivedbyProvider:
                  data.printAcknowledgementList[0].dateTimeRetrieved,
              },
              section3: {
                caseManagerWorkPhone:
                  data.printAcknowledgementList[0].caseManagerWorkPhone,
                twentyfourHourAccessPhone:
                  data.printAcknowledgementList[0].twentyFourHourPhone,
                caseManagerName:
                  data.printAcknowledgementList[0].caseManagerName,
                caseManagerAddress:
                  data.printAcknowledgementList[0].caseManagerAddress,
              },
              section4: {
                fromDate:
                  data.printAcknowledgementList[0].prevPlacementBeginDate,
                previousPlacement:
                  data.printAcknowledgementList[0].prevProvider,
                reasonForMove: data.printAcknowledgementList[0].reasonForMove,
                toDate: data.printAcknowledgementList[0].prevPlacementEndDate,
              },
              section5: {
                claris: data.printAcknowledgementList[0].claris,
                dateofPlacement:
                  data.printAcknowledgementList[0].currentPlacementBeginDate,
                endDate: data.printAcknowledgementList[0].endDate,
                factsServiceActionCodePlacement:
                  data.printAcknowledgementList[0]
                    .factsServiceActionCodePlacement,
                factsServiceSourceCode:
                  data.printAcknowledgementList[0].factsServiceSourceCode,
                hassiblinginOOHplacementandnotplaced:
                  data.printAcknowledgementList[0]
                    .hassiblinginOOHplacementandnotplaced,
                hassiblingInOOHplacementandplaced:
                  data.printAcknowledgementList[0]
                    .hassiblingInOOHplacementandplaced,
                icwaApply: data.printAcknowledgementList[0].icwaApply,
                mailingAddress: data.printAcknowledgementList[0].mailingAddress,
                phone: data.printAcknowledgementList[0].phone,
                physicalAddress:
                  data.printAcknowledgementList[0].providerAddress,
                placementName: data.printAcknowledgementList[0].placementName,
                sameSchoolandAddress:
                  data.printAcknowledgementList[0].sameSchoolandAddress,
                siblingReason: data.printAcknowledgementList[0].siblingReason,
                sibsAffectedByMove_hassiblinginOOHplacementandnotplaced:
                  data.printAcknowledgementList[0]
                    .sibsAffectedByMove_hassiblinginOOHplacementandnotplaced,
                sibsAffectedByMove_hasSibsInOOH_PlacedTogether:
                  data.printAcknowledgementList[0]
                    .sibsAffectedByMove_hasSibsInOOH_PlacedTogether,
                startDate: data.printAcknowledgementList[0].startDate,
              },
              section6: {
                adoptivePlacementFinalized:
                  data.printAcknowledgementList[0].adoptivePlacementFinalized,
                adoptivePlacementFinalizedDate:
                  data.printAcknowledgementList[0]
                    .adoptivePlacementFinalizedDate,
                childDeath: data.printAcknowledgementList[0].childDeath,
                childDeathDate: data.printAcknowledgementList[0].childDeathDate,
                custodianshipNotReleasedFromCustody:
                  data.printAcknowledgementList[0]
                    .custodianshipNotReleasedFromCustody,
                custodianshipNotReleasedFromCustodyDate:
                  data.printAcknowledgementList[0]
                    .custodianshipNotReleasedFromCustodyDate,
                custodianshipReleasedFromCustody:
                  data.printAcknowledgementList[0]
                    .custodianshipReleasedFromCustody,
                custodianshipReleasedFromCustodyDate:
                  data.printAcknowledgementList[0]
                    .custodianshipReleasedFromCustodyDate,
                releasedFromSRSCustody:
                  data.printAcknowledgementList[0].releasedFromSRSCustody,
                releasedFromSRSCustodyDate:
                  data.printAcknowledgementList[0].releasedFromSRSCustodyDate,
                releasedFromSRSCustodyOtherReason:
                  data.printAcknowledgementList[0]
                    .releasedFromSRSCustodyOtherReason,
                releasedFromSRSCustodyOtherReasonDate:
                  data.printAcknowledgementList[0]
                    .releasedFromSRSCustodyOtherReasonDate,
                releasedFromSRSCustodyOtherReasonDescription:
                  data.printAcknowledgementList[0]
                    .releasedFromSRSCustodyOtherReasonDescription,
                returnedHomeWithCustody:
                  data.printAcknowledgementList[0].returnedHomeWithCustody,
                returnedHomeWithCustodyDate:
                  data.printAcknowledgementList[0].returnedHomeWithCustodyDate,
                returnedHomeWithOutCustody:
                  data.printAcknowledgementList[0].returnedHomeWithOutCustody,
                returnedHomeWithOutCustodyDate:
                  data.printAcknowledgementList[0]
                    .returnedHomeWithOutCustodyDate,
                transferJJA: data.printAcknowledgementList[0].transferJJA,
                transferJJADate:
                  data.printAcknowledgementList[0].transferJJADate,
                transferTribalCourt:
                  data.printAcknowledgementList[0].transferTribalCourt,
                transferTribalCourtDate:
                  data.printAcknowledgementList[0].transferTribalCourtDate,
                venueChange: data.printAcknowledgementList[0].venueChange,
                venueChangeDate:
                  data.printAcknowledgementList[0].venueChangeDate,
              },
              section7: {},
              section7_preview: [],
              srsWorker: data.printAcknowledgementList[0].srsWorker,
              subject_ClientName:
                data.printAcknowledgementList[0].subject_ClientName,
              subject_CountyCode:
                data.printAcknowledgementList[0].subject_CountyCode,
              trialHomePlacement:
                data.printAcknowledgementList[0].trialHomePlacement,
            });
          } else {
            resolve([]);
          }
        });
    });
  }
  printAckPDF(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementPrintForms/getByPrintHistory`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getPSAinHistory(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/printProviderServiceAgreement`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.printProviderServiceAgreementList));
    });
  }
  getFCHhistrys(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/printFCHPlacementAgreement`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getELEChistrys(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/getPlacementAgreement`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  /**
   * 
   * @param request {
    "referralID": init,
    "fromClientSchoolID":int,
    "toClientSchoolID": int,
    "attendingSameSchoolReasonID": init
    
    * Validating the attending school and home school selection in the ack option form.
    * Have to call this API Ack option print forms after clicking Okay or Cancel.
    * Call this API for both flow forms and individual forms.
}
   */
  validatingPlacementSchool(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}printAck/getFromToSchool`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getCasePlanEndDate(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}casePlan/getEndDate`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getContactTypeCaseActivity(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}caseActivity/getContactTypeByReferralType`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getSavedPrintFormsBasedOnAuthorizationIds(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}getSavedPrintForms`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getEmailRequest(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementPrintForms/getEmailRecipient`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCaseTeam(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}caseTeam/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteAppointment(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}appointment/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteAssessment(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}assessment/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCaseActivity(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}caseActivity/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCaseEvaluation(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluation/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCaseFileActivity(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}caseFileActivity/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCasePlan(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}casePlan/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCourtOrder(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}courtOrder/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteHomeCountry(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}homeCounty/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteIndependantLiving(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}independentLiving/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteKipp(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}kipp/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteMonthlyReport(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}monthlyReport/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deletePRTFScreening(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}prtfScreening/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteSFCSOffice(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}sfaOfficeActivity/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteSocialSecurityIncome(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientSSI/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteSupervisoryStaffing(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}supervisoryStaffing/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteBestInterestStaffing(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}bestInterestStaffing/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteExtendedFamily(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyMemberReferral/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteBHDetermination(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}BHDetermination/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteImmunization(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}immunization/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteKanBeHealthy(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}kanBeHealthy/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteHealthRecord(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}healthExam/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteWaiverActivity(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}waiverActivity/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteMoveForm(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}moveEvent/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCreditTracking(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}creditTracking/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteGeneralEducation(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}generalEducation/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteGradeLevel(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientGrade/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteHomeSchool(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}homeSchool/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteSchoolRelease(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}schoolRelease/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteSpecialEducation(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}specialEducation/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteProgressNote(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}progressNote/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteProgressNoteDiagnosis(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}progressNoteDiagnosis/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteServiceAgreement(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}referralEvent/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteParticipantsInTherapy(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}therapyParticipant/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deletePhase(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}phase/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteFamilySafety(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familySafety/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteFISMembers(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientReferral/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deletePhaseActivity(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}phaseActivity/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteFamilySafetyActivity(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familySafetyActivity/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteNonTherapyFaceToFace(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}nonTherapyFaceToFace/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deletePlacements(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/placementDelete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deletePlacementEvent(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementDetail/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteAuth(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}authorization/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteProgressReport(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}progressReport/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteAttendingSchool(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientSchool/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deletePayor(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}payor/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteSchool(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}school/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteSFMOffice(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staffSFAOffice/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteDHSStaff(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteDHHSStaff(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCSOStaff(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCASAOfficer(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteJudge(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCommunityMember(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteOtherAgencyStaff(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCRBCoordinator(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteFamilyMember(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCustomerCarePerson(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteGuardianAdLitem(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteDCFStaff(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteDHSOffice(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}dhsOffice/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCourtServiceOfficer(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}person/delete`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteStaff(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}staff/deleteStaffById`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteThirdPartyLibrary(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientTpl/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteCourtCase(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}courtCase/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteClientProfile(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientProfile/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deletePreventativeMeasures(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientPreventativeMeasure/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteClientStrength(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientStrength/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteClientMedication(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientMedication/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteClientAllergy(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientAllergy/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getEvaluationTypeList(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationType/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  saveEvaluationType(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationType/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  updateEvaluationType(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationType/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getEvaluationTypeByID(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationType/getByID`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getEvaluationScaleList(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationScale/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  saveEvaluationScale(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationScale/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  updateEvaluationScale(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationScale/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getEvaluationScaleByID(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationScale/getByID`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getQuestionCreationList(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}question/list`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  saveQuestionCreation(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}question/save`, JSON.stringify(request))
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  updateQuestionCreation(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}question/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getQuestionCreationByID(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}question/getByID`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getQuestionGroupCreationList(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}questionGroup/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  saveQuestionGroupCreation(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}questionGroup/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  updateQuestionGroupCreation(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}questionGroup/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getQuestionGroupCreationByID(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}questionGroup/getByID`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getVersionCreationList(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationVersion/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  saveVersionCreation(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationVersion/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  updateVersionCreation(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationVersion/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getEvaluationAllowedGroupByID(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationAllowedGroup/getByID`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getEvaluationAllowedGroupList(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationAllowedGroup/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  saveEvaluationAllowedGroup(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationAllowedGroup/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  updateEvaluationAllowedGroup(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationAllowedGroup/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getVersionCreationByID(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationVersion/getByID`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getEvaluationQuestionDropDown(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationQuestion/dropdown/evaluationVersion`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getEvaluationQuestionScaleList(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationQuestionScale/getByEvaluationQuestionID`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getEvaluationQuestionVersion(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationQuestion/scale/evaluationVersion`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getEvaluationQuestionByID(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationQuestion/getById`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  saveEvaluationQuestion(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationQuestion/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  updateEvaluationQuestion(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationQuestion/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteEvaluationType(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationQuestion/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteEvaluationCreation(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationQuestion/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteEvaluationVersion(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationVersion/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteEvaluationQuestionGroup(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}questionGroup/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  deleteEvaluationScale(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}evaluationScale/delete`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  disagreeAgreement(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}esignature/submitApprovalDisagree`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  e_sign_agreeAgreement(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}esignature/ccApprovalElecSign`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  downloadEsign(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}esignature/downloadESignature`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  e_sign_agreeAgreementAccept(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}esignature/PADataEntryReviewed`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  elecsignAcknowledge(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}esignature/submitAcknowledge`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getPlacementDetailCount(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/getCountOfPlacemmentDetail`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getCountOfPlacementDetail(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/getCountOfPlacemmentDetail`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.count));
    });
  }

  getToSchoolBasedOnFromSchool(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientSchool/getToSchool`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  eSignGetApprovalStatus(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementPrintForms/getElecSignPlacementAgreementStatus`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  eSignRestartApproval(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}esignature/eSignStatusRestartApproval`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getPayorForLivingArrangementByReferral(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}payor/getByReferralID`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.payor));
    });
  }

  getHoldBedPayorForLivingArrangementByPayor(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}payor/getHoldBedPayor`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data.payor));
    });
  }
  getSchoolLists(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientSchool/getClientSchoolBySchoolName`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getPreviousSchoolLists(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}school/previousEducationEntrollment`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  medicationList(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}clientMedication/getClientMedications`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getEduEnrollMail() {
    return this._http
      .get(this.endPoint.localUrl + "/school/getEducationEnrollmentMail")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  deleteExistingAuthorization(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${this.endPoint.localUrl}/authorization/delete`, req)
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  getPSDPDFKITVoidForm(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementPrintForms/getByFormName`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) =>
          resolve(data.ProviderServiceAgreementVoid.pdfDocID)
        );
    });
  }

  getPSDPDFKITForm(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placementPrintForms/getByFormName`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data.ProviderServiceAgreement.pdfDocID));
    });
  }

  providerFamilyContactPrint(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerContact/getPrint`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  providerFamilyContactExport(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}providerContact/list`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  getWeeklyChangeAuthList(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}familyChangesApproval/getFCHWeeklyChangeAuthAdmin`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  exportProgressNotePrintForm(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}progressNote/getProgressNoteReportPrint`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  exportEncounterPrintForm(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}progressNote/getProgressNoteEncounterReportPrint`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  progressNoteAndEncounterEmail(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}progressNote/sendEmailWithAttachments`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }

  validationPlacementDateCheck(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/validatePlacementDates`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getProgressNoteAutoFetchValues(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}progressNote/getNewProgressNoteInformations`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  getMoveformPrintData(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}moveEvent/getPlacementMoveFormWithDisruption`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getPaymentEndDate(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/getPaymentEndDate`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  validationPlacementEventCheck(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/validatePlacementDetailDates`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  getStaffAccess(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}roles/getStaffById`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  getSubContractByID(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}subcontractreintegrationFosterCare/getById`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  saveSubContract(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}subcontractreintegrationFosterCare/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  updateSubContract(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}subcontractreintegrationFosterCare/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  getEduCordLists() {
    return this._http
      .get(this.endPoint.localUrl + "/getEducationCoordinator?" + Date.now())
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  providerVenderValidate(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}provider/validateVenderID`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data));
    });
  }
  // saveFinalize(request: any): Promise<any> {
  //   return new Promise((resolve) => {
  //     this._http
  //       .post(
  //         `${this.endPoint.localUrl}school/finalSave`,
  //         request
  //       )
  //       .toPromise()
  //       .then((data: any) => resolve(data));
  //   });
  // }

  saveFinalize(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._httpVerb
        .post(this.endPoint.localUrl + "school/finalSave", req)
        .toPromise()
        .then((data: any) => resolve(data.json()));
    });
  }
  // saveFinalize(req) {
  //   return this._httpA.post(this.env + this.finalizeSave, req).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  // }
  placementValidationPlacementAuthDateCheck(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/validatePlacementAuthorizationDates`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  placementValidationPlacemntUnitsAuthCheck(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/validatePlacementAuthorizationUnitsAuth`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  getClientDashboardInfo(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}getClientDashBoardInfo`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  getProviderDashboardInfo(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}provider/getProviderDashBoardInfo`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  getPlacementClientProfile(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}provider/getPlacementClientsProfile`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  getPlacementEndDateHistory(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}referral/getPaymentEndDateHistory`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  placementClaimValidation(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}placement/getPlacementClaim`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  getSponsorProviders(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}provider/getSponsorProviders`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  getLabelNameForClaimProider(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}claim/getProviderDropdownLableName`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  getCSPayeeClaimList(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}authorization/getCSAuthorizationsPayeeList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  getCSProviderList(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}provider/form/list`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  getCSProviderAuthList(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}csProvider/getauthorizationList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  getCSProviderDirectAuthList(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}csProvider/getdirectAuthorizationList`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  saveRFCReferralSpecialNeeds(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/specialNeeds/save`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  getByIdRFCReferralSpecialNeeds(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/specialNeeds/findByReferralId`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  updateRFCReferrlSpecialNeeds(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/specialNeeds/update`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  getPlacementReferralPrint(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/placementReferral/getPlacementReferral`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  checkCaseActivityUnits(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/caseActivity/getUnits`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  caseActivitySaveWithAttachment(req: any): Promise<any> {
    let accessToken: string;
    let userId: string;
    // For local run
    accessToken =
      "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEQ29NcGpKWHJ4VHE5Vkc5dGUtN0ZYTjE0WEdscWNmV1B6UjJPSmJCc0RubGZCektTV05GallVSEFFTlR0UXhqR3U4TFNPQUVYXzFCMDI0SDI2eS1BZkxKOGRjQ291SU13d1hrU2NaRFRyb2lBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiSEJ4bDltQWU2Z3hhdkNrY29PVTJUSHNETmEwIiwia2lkIjoiSEJ4bDltQWU2Z3hhdkNrY29PVTJUSHNETmEwIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8yZmQwODA1Zi1mNjFmLTQ5NzgtODkzNi1hODlkMTc3MTczYmYvIiwiaWF0IjoxNTU4NjMyNzg5LCJuYmYiOjE1NTg2MzI3ODksImV4cCI6MTU1ODYzNjY4OSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyWmdZSGhpSTdERE5kdjFTRkxjVk9HRnIwdi9MWml4emxUcjhMZElRZjdjemlDeDBxMEEiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkFSLUNNUy1BUFAtUFJPRC0wMSIsImFwcGlkIjoiYjA1Nzg0NTctNTNjOS00N2IxLWIwNzItNWNkZTAzMWU3N2Q3IiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJBIiwiZ2l2ZW5fbmFtZSI6IlJhamVzaCIsImlwYWRkciI6IjY2LjYuMTEwLjE2MiIsIm5hbWUiOiJSYWplc2ggQSIsIm9pZCI6IjBkMTY4MTNiLWZhMTItNGRjYS1iMTBmLTIyOTM2NWMwMjM5MSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS04MTQ5MDA2NjItMTc0Njc5ODM5NC05NTIyOTg2LTMzMjMyIiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDM3RkZFQTc3NkRGN0EiLCJzY3AiOiJDYWxlbmRhcnMuUmVhZCBDb250YWN0cy5SZWFkIE1haWwuUmVhZCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsiaW5rbm93bm50d2siXSwic3ViIjoiY1FqX3RMeHlJQXQtbkEyMnZkRXduVmhGdmZaMEtvNVAtX1NlZTZGR2JCQSIsInRpZCI6IjJmZDA4MDVmLWY2MWYtNDk3OC04OTM2LWE4OWQxNzcxNzNiZiIsInVuaXF1ZV9uYW1lIjoiUmFqZXNoQUBzdC1mcmFuY2lzLm9yZyIsInVwbiI6IlJhamVzaEFAc3QtZnJhbmNpcy5vcmciLCJ1dGkiOiIxYjlMNklzcURrNkpNMlJDWHlrcEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyIxOTRhZTRjYi1iMTI2LTQwYjItYmQ1Yi02MDkxYjM4MDk3N2QiLCI1ZDZiNmJiNy1kZTcxLTQ2MjMtYjRhZi05NjM4MGEzNTI1MDkiLCI5Yjg5NWQ5Mi0yY2QzLTQ0YzctOWQwMi1hNmFjMmQ1ZWE1YzMiXSwieG1zX3N0Ijp7InN1YiI6InRKcThpckNuNnpoa0JrS0N1YXpaZTRKVlBOSmpNTzZzT21neXM2Nm9UbGMifSwieG1zX3RjZHQiOjE1MTUzNjUwODV9.XIFSX9AG7f6IUF3psbpwEEYUGEF3R5egTa1RuTDK5yZ8w77DMl4lUPEIivElkvTOMxM-xNF3MwrpaChX6FDn9LS7NYxmYQZlKtI-h-gPEOBPvzql8ERNJXcW-Pl5_6B6l-TnyJG3PtLDFQ-nZAozQ1WeMIV4Q7necPdZrgQ3KgMYoOKn8K1RXl7Df1TOMteWiy1lxcNEFbAyKfj9DL-FPLq4nQOeTLb2bnXF5AK5XyRbckfw9bwdeRgXtnoRGzbFajvv1AwzF-EssMnyo_oklcBOE5oCtqIPyE9TOI6kFDo17t-_Mp2qWlX7RnC2ap52RK2rxGWDWanDT-bHHhRLsw";
    userId = "4620";
    // For production
    // accessToken =
    //   document.cookie && document.cookie.match(new RegExp("token" + "=([^;]+)"))
    //     ? document.cookie.match(new RegExp("token" + "=([^;]+)"))[1]
    //     : "";
    // userId =
    //   document.cookie &&
    //   document.cookie.match(new RegExp("userId" + "=([^;]+)"))
    //     ? document.cookie.match(new RegExp("userId" + "=([^;]+)"))[1]
    //     : "";
    const headerDict = {
      Authorization: `${userId} ${accessToken}`,
    };

    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return new Promise((resolve) => {
      this._httpVerb
        .post(
          `${this.endPoint.localUrl}/caseActivity/saveWithAttachment`,
          req,
          requestOptions
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  getMentalAppointementDropdown(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/dropDown/contains`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  getProgresNoteReportPrint(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${environment.localUrl}/progressNote/getProgressNoteReportPrint`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  getEncounterReportPrint(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${environment.localUrl}/progressNote/getProgressNoteEncounterReportPrint`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }

  progressNoteAndEncounterEamil(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${environment.localUrl}/progressNote/sendEmailWithAttachments`,
          JSON.stringify(req)
        )
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  usdSave(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${environment.localUrl}/school/saveUSD`, JSON.stringify(req))
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  editSave(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${environment.localUrl}/school/updateUSD`, JSON.stringify(req))
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  usdGetByID(req: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(`${environment.localUrl}/school/findUsdByID`, JSON.stringify(req))
        .toPromise()
        .then((data) => resolve(data));
    });
  }
  getFamilyChangeWorkerFCHAdmin(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/familyChanges/getWorkerForAdmin`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }
  placementReferralDelete(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/placementReferral/deleteByID`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getReferralDetailById(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/referral/getById`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }
  iep_Lists(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/educationalInformation/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }
  iep_save(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/educationalInformation/save`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }
  iep_update(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/educationalInformation/update`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }
  iep_getBYid(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/educationalInformation/getById`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  runClientGradeProcess(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/clientGradeProcess/run`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  errorListClientGradeProcess(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/clientGradeProcess/error/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  dataListClientGradeProcess(request: any): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/clientGradeProcess/list`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  exportClientGradeProgressProcessedData(): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .get(
          `${this.endPoint.localUrl}/clientGradeProcess/processReport/export`
        )
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  exportClientGradeProgressErrorData(): Promise<any> {
    return new Promise((resolve) => {
      this._http
        .get(`${this.endPoint.localUrl}/clientGradeProcess/errorReport/export`)
        .toPromise()
        .then((data: any) => resolve(data))
        .catch(this._home.errorHandler);
    });
  }

  getClientName(request): Promise<String> {
    return new Promise((resolve) => {
      this._http
        .post(
          `${this.endPoint.localUrl}/client/profile`,
          JSON.stringify(request)
        )
        .toPromise()
        .then((data: any) =>
          resolve(
            `${data.clientProfile[0].LastName}, ${data.clientProfile[0].FirstName}`
          )
        )
        .catch(this._home.errorHandler);
    });
  }
}
