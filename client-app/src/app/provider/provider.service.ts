import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OtpverficationService } from "../otpverfication/otpverfication.service";
import { HomeService } from "../home/home.service";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProviderService {
  providerSave = "/provider/save";
  providerUpdate = "/provider/update";
  providerGetById = "/provider/getById";
  endPoint = environment;
  petList = "/providerPet/list";
  petSave = "/providerPet/save";
  petUpdate = "/providerPet/update";
  petGetById = "/providerPet/getById";
  locationSave = "/providerLocation/save";
  locationUpdate = "/providerLocation/update";
  locationGetById = "/providerLocation/getById";
  locationList = "/providerLocation/list";
  officeList = "/sfaOfficeActivity/list/provider";
  officeSave = "/sfaOfficeActivity/save";
  officeGetById = "/sfaOfficeActivity/getById";
  officeUpdate = "/sfaOfficeActivity/update";
  staffList = "/providerSFAStaff/list";
  staffSave = "/providerSFAStaff/save";
  staffGetById = "/providerSFAStaff/getById";
  otherAgencyStaffList = "/providerOtherAgencyStaff/list";
  otherAgencyStaffSave = "/providerOtherAgencyStaff/save";
  otherAgencyStaffGetById = "/providerOtherAgencyStaff/getById";
  statusList = "/providerStatus/list";
  statusGetById = "/providerStatus/getById";
  statusSaveAndUpdate = "/providerStatus/save";
  financeReport = "/financeReports/";
  ssn_number = "/activityLog/save";
  ssn_number_accessList = "/activityLog/list/byEvent";
  ssn_number_roles_accessList = "/roles/getStaffById";
  auto_fetch_fields = "/unusualIncident/provider/getDropdownAutofetchFields";
  exportData: any;
  fchLevelList = "/providerFCHLevelOfCare/list/byProviderID";
  fchLevelOfCare = "/providerFCHLevelOfCare/getFchLevelOfCare";
  fchLevelOfCareSave = "/providerFCHLevelOfCare/save";
  fchLevelListData = [];
  fchLevelCareDelete = "/providerFCHLevelOfCare/delete";
  providerStrengthList = "/providerStrength/listByProviderId";
  providerStrengthListData = [];
  providerStrength = "/providerStrength/getStrengths";
  providerStrengthDelete = "//providerStrength/delete";
  fproviderStrengthSave = "/providerStrength/save";
  unacceptableConditionList = "/ProviderUnacceptableCondition/listByProviderId";
  unacceptableConditionListData = [];
  unacceptableConditionDelete = "/ProviderUnacceptableCondition/delete";
  unacceptableConditionSave = "/ProviderUnacceptableCondition/save";
  unacceptCondition = "ProviderUnacceptableCondition/getConditions";
  recruitmentInquirySave = "/recruitmentInquiry/save";
  recruitmentGetById = "/recruitmentInquiry/list/id";
  recruitmentInquiryUpdate = "/recruitmentInquiry/update";
  recruitmentStaffSave = "/recruitmentStaff/save";
  recruitmentStaffUpdate = "/recruitmentStaff/update";
  recruitmentStaffGetById = "/recruitmentStaff/list/id";
  providerContactPersonTypes = "/providerContact/getPersonType";
  proiderEmailForRecentChanges = "/provider/update/sendEmail";

  constructor(
    public _http: HttpClient,
    public _router: Router,
    public _otp: OtpverficationService,
    public _home: HomeService
  ) {}

  saveProvider(data: any) {
    return this._http
      .post(this.endPoint + this.providerSave, JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateProvider(data: any) {
    return this._http
      .post(this.endPoint + this.providerUpdate, JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderById(data: any) {
    return this._http
      .post(this.endPoint + this.providerGetById, JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPetsList(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.petList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  savePet(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.petSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updatePet(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.petUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getPetById(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.petGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getLocationList(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.locationList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveLocation(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.locationSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateLocation(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.locationUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getLocationById(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.locationGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getOfficeList(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.officeList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveOffice(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.officeSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateOffice(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.officeUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdOffice(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.officeGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listStaff(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.staffList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveStaff(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.staffSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdStaff(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.staffGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listOtherAgencyStaff(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.otherAgencyStaffList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveOtherAgencyStaff(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.otherAgencyStaffSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdOtherAgencyStaff(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.otherAgencyStaffGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listProviderStatus(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.statusList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveProviderStatus(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.statusSaveAndUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdProviderStatus(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.statusGetById, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateProviderStatus(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.statusSaveAndUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listFamilyContact(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerContact/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listProviderSchool(req: any) {
    return this._http
      .post(this.endPoint.localUrl + "providerSchool/list", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listProviderLicenseException(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerLicenseException/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listProviderLicense(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerLicense/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listProviderSponsor(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerSponsor/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderLocation(req: any) {
    return this._http
      .post(this.endPoint.localUrl + "provider/getById", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  providerLicenseSave(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerLicense/save",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  providerLicenseUpdate(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerLicense/update",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProviderLicense(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerLicense/getById",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getSFCSStatus(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/providerLicenseException/statusType",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProviderLicenseException(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerLicenseException/getById",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveProviderLicenseException(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerLicenseException/save",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveProviderSponsor(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerSponsor/save",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateProviderSponsor(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerSponsor/update",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProviderSponsor(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerSponsor/getById",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listProviderPreference(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerPreference/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  providerPreferenceGetById(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerPreference/getById",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveProviderPreference(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerPreference/save",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateProviderPreference(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerPreference/update",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listProviderTraining(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerTraining/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  providerTrainingSave(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerTraining/save",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  providerTrainingGetByID(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerTraining/getById",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  yesNoPending(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerLicenseException/yesNoPending",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  closureReason(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerSponsor/closure",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getsponsorName(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerSponsor/sponsor",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProviderTraining(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerTraining/getById",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProviderTrainingLicense(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerTraining/providerLicense",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listProviderAdoption(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerAdoption/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  providerAdoptionGetById(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerAdoption/getById",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  providerAdoptionSpecialistList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerAdoptionSpecialist/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveProviderAdoption(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerAdoption/save",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  updateProviderAdoption(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "providerAdoption/update",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPersonAssignmentType() {
    return this._http
      .get(this.endPoint.localUrl + "providerAdoption/getPersonAssignmentType")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listIdentifyResource(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "identifiedResource/list/Provider",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveProviderIR(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "identifiedResource/save/referralID",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProviderIR(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "identifiedResource/getById",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listBIS(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "bestInterestStaffing/provider/list",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProviderBIS(data) {
    return this._http
      .post(
        this.endPoint.localUrl + "bestInterestStaffing/provider/BISid",
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getFinanceReport(data, temp_table) {
    console.log("temp_table>>>", temp_table);
    if (this._router.url.includes("/live")) {
      return this._http
        .post(
          "https://preprod-cms.st-francis.org/tomcat/financeReports//" +
            temp_table,
          JSON.stringify(data)
        )
        .toPromise()
        .then(this._home.extractedData)
        .catch(this._home.errorHandler);
    } else {
      return this._http
        .post(
          this.endPoint.localUrl + "/financeReports/" + temp_table,
          JSON.stringify(data)
        )
        .toPromise()
        .then(this._home.extractedData)
        .catch(this._home.errorHandler);
    }
  }
  getPredefinedReports(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/reports/predefinedReports/getReport",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getAllProcedes() {
    if (this._router.url.includes("/live")) {
      return this._http
        .get(
          "https://preprod-cms.st-francis.org/tomcat/financeReports/getProcodes"
        )
        .toPromise()
        .then(this._home.extractedData)
        .catch(this._home.errorHandler);
    } else {
      return this._http
        .get(this.endPoint.localUrl + "/financeReports/getProcodes")
        .toPromise()
        .then(this._home.extractedData)
        .catch(this._home.errorHandler);
    }
  }

  save_ssn_number_activity_log(data) {
    return this._http
      .post(this.endPoint.localUrl + this.ssn_number, JSON.stringify(data))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  list_ssn_number_activity_log(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.ssn_number_accessList,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  ssn_number_access_log(data) {
    return this._http
      .post(
        this.endPoint.localUrl + this.ssn_number_roles_accessList,
        JSON.stringify(data)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  setExportDetail(referralType) {
    this.exportData = referralType;
  }
  // getFinanceRegion(data) {
  //   return this._http.post(this.endPoint.localUrl + '/financeReports/getRegionGroup', data).toPromise()
  //     .then(this._home.extractedData).catch(this._home.errorHandler);
  // }

  /**
   * @returns the selected referral or case type
   */
  getExportDetail() {
    return this.exportData;
  }
  getProviderAutoFetchFields(req: {}) {
    return this._http
      .post(this.endPoint.localUrl + this.auto_fetch_fields, req)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateOtherAgencyStaff(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.otherAgencyStaffSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listFchLevelCare(req: any) {
    return this._http
      .post(this.endPoint.localUrl + this.fchLevelList, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getFchLevelOfCare(): any {
    return this._http
      .get(this.endPoint.localUrl + this.fchLevelOfCare)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveFchLevelOfCare(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.fchLevelOfCareSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  storeFchLevelListData(data): any {
    console.log("data in storeLastFchLevelListData is", data);
    this.fchLevelListData = data;
    console.log(
      "this.fchLevelListData in storeLastFchLevelListData is",
      this.fchLevelListData
    );
  }

  getFchLevelListData() {
    return this.fchLevelListData;
  }

  deleteFchLevelOfCare(request: { providerFCHLevelOfCareID: any[] }): any {
    return this._http
      .post(
        this.endPoint.localUrl + this.fchLevelCareDelete,
        JSON.stringify(request)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listProviderStrength(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerStrengthList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  storeProviderStrengthListData(data): any {
    this.providerStrengthListData = data;
  }

  getProviderStrengthListData() {
    return this.providerStrengthListData;
  }

  getproviderStrengths(): any {
    return this._http
      .get(this.endPoint.localUrl + this.providerStrength)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  deleteProviderStrength(request: any): any {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerStrengthDelete,
        JSON.stringify(request)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveProviderStrength(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.fproviderStrengthSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  listUnacceptableCondition(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.unacceptableConditionList,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  storeUnacceptableConditionListData(data): any {
    this.unacceptableConditionListData = data;
  }

  getUnacceptableConditionListData() {
    return this.unacceptableConditionListData;
  }

  deleteUnacceptableCondition(request): any {
    return this._http
      .post(
        this.endPoint.localUrl + this.unacceptableConditionDelete,
        JSON.stringify(request)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveUnacceptableCondition(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.unacceptableConditionSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getFinanceRegion(data) {
    if (
      this._router.url.includes("/live") ||
      this._router.url === "/reports/live-prioritized"
    ) {
      return this._http
        .post(
          "https://preprod-cms.st-francis.org/tomcat/financeReports/getRegionGroup",
          JSON.stringify(data)
        )
        .toPromise()
        .then(this._home.extractedData)
        .catch(this._home.errorHandler);
    } else {
      return this._http
        .post(
          this.endPoint.localUrl + "/financeReports/getRegionGroup",
          JSON.stringify(data)
        )
        .toPromise()
        .then(this._home.extractedData)
        .catch(this._home.errorHandler);
    }
  }
  getFinanceYear(data) {
    if (
      this._router.url.includes("/live") ||
      this._router.url === "/reports/live-prioritized"
    ) {
      return this._http
        .post(
          "https://preprod-cms.st-francis.org/tomcat//reports/getFiscalYear",
          JSON.stringify(data)
        )
        .toPromise()
        .then(this._home.extractedData)
        .catch(this._home.errorHandler);
    } else {
      return this._http
        .post(
          this.endPoint.localUrl + "/reports/getFiscalYear",
          JSON.stringify(data)
        )
        .toPromise()
        .then(this._home.extractedData)
        .catch(this._home.errorHandler);
    }
  }
  saveSRSroster(data) {
    if (
      this._router.url.includes("/live") ||
      this._router.url === "/reports/live-prioritized"
    ) {
      return this._http
        .post(
          "https://preprod-cms.st-francis.org/tomcat/financeReports/saveReport",
          JSON.stringify(data)
        )
        .toPromise()
        .then(this._home.extractedData)
        .catch(this._home.errorHandler);
    } else {
      return this._http
        .post(
          this.endPoint.localUrl + "/financeReports/saveReport",
          JSON.stringify(data)
        )
        .toPromise()
        .then(this._home.extractedData)
        .catch(this._home.errorHandler);
    }
  }
  getUnAcceptCondition(): any {
    return this._http
      .get(this.endPoint.localUrl + this.unacceptCondition)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveRecruitmentInquiry(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.recruitmentInquirySave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdRecruitment(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.recruitmentGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateRecruitmentInquiry(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.recruitmentInquiryUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveRecruitmentStaff(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.recruitmentStaffSave,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateRecruitmentStaff(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.recruitmentStaffUpdate,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getByIdRecruitmentStaff(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.recruitmentStaffGetById,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getProviderContactPersonTypes(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.providerContactPersonTypes,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  providerEmailForChanges(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + this.proiderEmailForRecentChanges,
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  clientAliasSave(req: any) {
    return this._http
      .post(this.endPoint.localUrl + "/clientAlia/save", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  clientAlias_list(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/clientAlia/getByClientID",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  clientAlias_get_byID(req: any) {
    return this._http
      .post(this.endPoint.localUrl + "/clientAlia/getById", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  clientAliasUpdate(req: any) {
    return this._http
      .post(this.endPoint.localUrl + "/clientAlia/update", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProviderPayee(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/getProviderPayee",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getProviderByID(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/getClaimsByProviderPayeeID",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getAllClaims() {
    return this._http
      .get(this.endPoint.localUrl + "/claim/getClaimStatus")
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getPaymentType(req: any) {
    return this._http
      .post(this.endPoint.localUrl + "/dropDown/contains", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveProviderPayee(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/claim/multipleUpdate",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  getExicitingService(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/providerPayment/getExistingOtherServices",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  listOfBatchName(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/providerPayment/getbatchName",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  saveBatchName(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl + "/providerPayment/addOtherServiceClaim",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  BatchNameList(req: any) {
    return this._http
      .post(
        this.endPoint.localUrl +
          "/providerPayment/batchstatus/paymentBatchStatus",
        JSON.stringify(req)
      )
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  authClaimList(req: any) {
    return this._http
      .post(this.endPoint.localUrl + "/claim/list", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
}
