import {
  Component,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { LocalValues } from "../../local-values";
import swal from "sweetalert2";
import { Location } from "@angular/common";
import "rxjs/add/operator/pairwise";
import "rxjs/add/operator/filter";
import { AckOptionsComponent } from "../../ack-options/ack-options.component";

@Component({
  selector: "general-records-delete",
  templateUrl: "./general-records-delete.component.html",
  styleUrls: ["./general-records-delete.component.scss"],
  inputs: ["module", "isCallOtherMethod", "isPopUp"],
  providers: [AckOptionsComponent],
})
export class GeneralRecordsDeleteComponent implements OnInit {
  constructor(
    public _opencard: OpencardsService,
    public _router: Router,
    public _localValues: LocalValues,
    public _activatedRoute: ActivatedRoute,
    public _location: Location,
    public _ackComponent: AckOptionsComponent
  ) { }
  @Input()
  module: any;
  isCallOtherMethod = false;
  isPopUp = false;

  @Output() deleted = new EventEmitter();

  isDeleteConfirmation = false;
  deleteConfirmationBtnLabel = "Confirm";
  isDeleteConfirmationDisable = false;
  infoText: string;
  isOpenAckForm = false;
  isPPS5120Form = false;
  isPSAForm = false;
  placementDeleteAffectedRows = 0;
  isPlacementDleteCountPrompt = false;
  previousURL: string;

  // @ViewChild(AckOptionsComponent) ackOptionsComponent: AckOptionsComponent;

  ngOnInit() {
    this._router.events
      .filter((e) => e instanceof NavigationEnd)
      .pairwise()
      .subscribe((e) => {
        this.navigationURL(e);
      });
    console.log("HardGoods>>>>", this._router.url);
    if (this._router.url === '/reports/school/detail') {
      this._localValues.previousurl = '/reports/school/view';
    }
    this.placementDeleteAffectedRows = this._ackComponent.deletedPlacementRecordsCount;
  }

  async onDelete() {
    // this._ackComponent.getPlacementPrintFormsDocId();
    const currentModule = Object.keys(this.module)[0].replace("ID", "");
    if (currentModule === "sfaOffice") {
      const req = { sfaOfficeID: Object.values(this.module)[0] };
      this.deleteConfirmationBtnLabel = "Deleting...";
      this.isDeleteConfirmationDisable = true;
      await this._opencard.sfmOfficeAgencyDelete(req);
      this.deleteConfirmationBtnLabel = "Confirm";
      this.isDeleteConfirmationDisable = false;
      this.isDeleteConfirmation = false;
      this.deleted.emit();
      return (this.infoText = "The record has been deleted successfully!");
    } else if (currentModule === "sFAOfficeGLKey") {
      const req = { sFAOfficeGLKeyID: Object.values(this.module)[0] };
      this.deleteConfirmationBtnLabel = "Deleting...";
      this.isDeleteConfirmationDisable = true;
      await this._opencard.sfmOfficeAgencyGLkeyDelete(req);
      this.deleteConfirmationBtnLabel = "Confirm";
      this.isDeleteConfirmationDisable = false;
      this.isDeleteConfirmation = false;
      this.deleted.emit();
      return (this.infoText = "The record has been deleted successfully!");
    } else if (this.isCallOtherMethod) {
      this.deleteBasedOnUrl();
    } else {
      this.deleteConfirmationBtnLabel = "Deleting...";
      this.isDeleteConfirmationDisable = true;
      if (this.module) {
        const req = {};
        req["module"] = Object.keys(this.module)[0].replace("ID", "");
        req["moduleID"] = [Object.values(this.module)[0]];
        req["staffID"] = parseInt(localStorage.getItem("UserId"));
        if (
          req["module"] === "placement" ||
          req["module"] === "placementDetail"
        ) {
          //   await this.deleteRecord(req);
          //   let tempReq = {
          //     module: 'authorization',
          //     moduleID: [parseInt(localStorage.getItem('authorizationId')) - this._opencard.getHasKey()],
          //     staffID: parseInt(localStorage.getItem('UserId'))
          //   }
          //   await this.deleteRecord(tempReq);
          return await this.deletePlacementAndPlacementEventRecords();
        }
        if (req["module"] === "livingArrangement") {
          // this._ackComponent.getPlacementCaseManager();
          // this._ackComponent.ngOnInit();
          this.isOpenAckForm = true;
          await this._ackComponent.getLivingArrangmentDeletePDFFormValues();
          this._router.navigate([], {
            queryParams: { action: "delete", sub: "livingArrangement" },
          });
          const req = { livingArrangementID: Object.values(this.module)[0] };
          return await this._opencard.deleteLivingArrangement(req);
        } else if (req["module"] === "providerPet") {
          const req = { providerPetID: Object.values(this.module)[0] };
          await this._opencard.deleteProviderPet(req);
        } else if (req["module"] === "providerLicenseException") {
          const req = {
            providerLicenseExceptionID: Object.values(this.module)[0],
          };
          await this._opencard.deleteProviderLicenseExpection(req);
        } else if (req["module"] === "providerLicense") {
          const req = { providerLicenseID: Object.values(this.module)[0] };
          await this._opencard.deleteProviderLicense(req);
        } else if (req["module"] === "providerLocation") {
          const req = { providerLocationID: Object.values(this.module)[0] };
          await this._opencard.deleteProviderLocation(req);
        } else if (req["module"] === "providerStatus") {
          const req = { providerStatusID: Object.values(this.module)[0] };
          await this._opencard.deleteProviderStatus(req);
        } else if (req["module"] === "providerSchool") {
          const req = { providerSchoolID: Object.values(this.module)[0] };
          await this._opencard.deleteProviderSchool(req);
        } else if (req["module"] === "recruitmentStaff") {
          const req = { recruitmentStaffID: Object.values(this.module)[0] };
          await this._opencard.deleteRecuritmentStaff(req);
        } else if (req["module"] === "providerSFAStaff") {
          const req = { providerSFAStaffID: Object.values(this.module)[0] };
          await this._opencard.deleteProviderSFAStaff(req);
        } else if (req["module"] === "sfaofficeActivity") {
          const req = { sfaofficeActivityID: Object.values(this.module)[0] };
          await this._opencard.deleteSFAOfficeStaff(req);
        } else if (req["module"] === "identifiedResource") {
          const req = { identifiedResourceID: Object.values(this.module)[0] };
          await this._opencard.deleteIdentifiedResource(req);
        } else if (req["module"] === "providerSponsor") {
          const req = { providerSponsorID: Object.values(this.module)[0] };
          await this._opencard.deleteProviderSponsor(req);
        } else if (req["module"] === "providerOtherAgencyStaff") {
          const req = {
            providerOtherAgencyStaffID: Object.values(this.module)[0],
          };
          await this._opencard.deleteProviderOtherAgencyStaff(req);
        } else if (req["module"] === "sfaOffice") {
          const req = { sfaOfficeID: Object.values(this.module)[0] };
          await this._opencard.sfmOfficeAgencyDelete(req);
        } else if (req["module"] === "sFAOfficeGLKey") {
          const req = { sFAOfficeGLKeyID: Object.values(this.module)[0] };
          await this._opencard.sfmOfficeAgencyGLkeyDelete(req);
        } else if (req["module"] === "caseTeamId") {
          const req = { caseTeamID: Object.values(this.module)[0] };
          await this._opencard.deleteCaseTeam(req);
        } else if (req["module"] === "appointment") {
          const req = { appointmentID: Object.values(this.module)[0] };
          await this._opencard.deleteAppointment(req);
        } else if (req["module"] === "assessment") {
          const req = { assessmentID: Object.values(this.module)[0] };
          await this._opencard.deleteAssessment(req);
        } else if (req["module"] === "caseActivity") {
          const req = { caseActivityID: Object.values(this.module)[0] };
          await this._opencard.deleteCaseActivity(req);
        } else if (req["module"] === "evaluation") {
          const req = { evaluationID: Object.values(this.module)[0] };
          await this._opencard.deleteCaseEvaluation(req);
        } else if (req["module"] === "caseFileActivity") {
          const req = { caseFileActivityID: Object.values(this.module)[0] };
          await this._opencard.deleteCaseFileActivity(req);
        } else if (req["module"] === "casePlan") {
          const req = { casePlanID: Object.values(this.module)[0] };
          await this._opencard.deleteCasePlan(req);
        } else if (req["module"] === "courtOrdered") {
          const req = { courtOrderedID: Object.values(this.module)[0] };
          await this._opencard.deleteCourtOrder(req);
        } else if (req["module"] === "homeCounty") {
          const req = { homeCountyID: Object.values(this.module)[0] };
          await this._opencard.deleteHomeCountry(req);
        } else if (req["module"] === "independentLiving") {
          const req = { independentLivingID: Object.values(this.module)[0] };
          await this._opencard.deleteIndependantLiving(req);
        } else if (req["module"] === "kipp") {
          const req = { kippID: Object.values(this.module)[0] };
          await this._opencard.deleteKipp(req);
        } else if (req["module"] === "monthlyReport") {
          const req = { monthlyReportID: Object.values(this.module)[0] };
          await this._opencard.deleteMonthlyReport(req);
        } else if (req["module"] === "sfcsOffice") {
          const req = { sfaOfficeActivityID: Object.values(this.module)[0] };
          await this._opencard.deleteSFCSOffice(req);
        } else if (req["module"] === "clientSSI") {
          const req = { clientSSIID: Object.values(this.module)[0] };
          await this._opencard.deleteSocialSecurityIncome(req);
        } else if (req["module"] === "bestInterestStaffing") {
          const req = { bestInterestStaffingID: Object.values(this.module)[0] };
          await this._opencard.deleteBestInterestStaffing(req);
        } else if (req["module"] === "familyMemberReferral") {
          const req = { familyMemberReferralID: Object.values(this.module)[0] };
          await this._opencard.deleteExtendedFamily(req);
        } else if (req["module"] === "BHDetermination") {
          const req = { BHDeterminationID: Object.values(this.module)[0] };
          await this._opencard.deleteBHDetermination(req);
        } else if (req["module"] === "immunization") {
          const req = { immunizationID: Object.values(this.module)[0] };
          await this._opencard.deleteImmunization(req);
        } else if (req["module"] === "kanBeHealthy") {
          const req = { kanBeHealthyID: Object.values(this.module)[0] };
          await this._opencard.deleteKanBeHealthy(req);
        } else if (req["module"] === "healthExam") {
          const req = { healthExamID: Object.values(this.module)[0] };
          await this._opencard.deleteHealthRecord(req);
        } else if (req["module"] === "waiverActivity") {
          const req = { waiverActivityID: Object.values(this.module)[0] };
          await this._opencard.deleteWaiverActivity(req);
        } else if (req["module"] === "moveEvent") {
          const req = { moveEventID: Object.values(this.module)[0] };
          await this._opencard.deleteMoveForm(req);
        } else if (req["module"] === "creditTracking") {
          const req = { creditTrackingID: Object.values(this.module)[0] };
          await this._opencard.deleteCreditTracking(req);
        } else if (req["module"] === "generalEducation") {
          const req = { generalEducationID: Object.values(this.module)[0] };
          await this._opencard.deleteGeneralEducation(req);
        } else if (req["module"] === "clientGrade") {
          const req = { clientGradeID: Object.values(this.module)[0] };
          await this._opencard.deleteGradeLevel(req);
        } else if (req["module"] === "homeSchool") {
          const req = { homeSchoolID: Object.values(this.module)[0] };
          await this._opencard.deleteHomeSchool(req);
        } else if (req["module"] === "schoolRelease") {
          const req = { schoolReleaseID: Object.values(this.module)[0] };
          await this._opencard.deleteSchoolRelease(req);
        } else if (req["module"] === "specialEducation") {
          const req = { specialEducationID: Object.values(this.module)[0] };
          await this._opencard.deleteSpecialEducation(req);
        } else if (req["module"] === "progressNote") {
          const req = { progressNoteID: Object.values(this.module)[0] };
          await this._opencard.deleteProgressNote(req);
        } else if (req["module"] === "ProgressNoteDiagnosis") {
          const req = {
            progressNoteDiagnosisID: Object.values(this.module)[0],
          };
          await this._opencard.deleteProgressNoteDiagnosis(req);
        } else if (req["module"] === "referralEvent") {
          const req = { referralEventID: Object.values(this.module)[0] };
          await this._opencard.deleteServiceAgreement(req);
        } else if (req["module"] === "therapyParticipantList") {
          const req = { therapyParticipantsID: Object.values(this.module)[0] };
          await this._opencard.deleteParticipantsInTherapy(req);
        } else if (req["module"] === "phase") {
          const req = { phaseID: Object.values(this.module)[0] };
          await this._opencard.deletePhase(req);
        } else if (req["module"] === "familySafetyActivity") {
          const req = { familySafetyActivityID: Object.values(this.module)[0] };
          await this._opencard.deleteFamilySafety(req);
        } else if (req["module"] === "ClientReferral") {
          const req = { clientReferralID: Object.values(this.module)[0] };
          await this._opencard.deleteFISMembers(req);
        } else if (req["module"] === "PhaseActivity") {
          const req = { PhaseActivityID: Object.values(this.module)[0] };
          await this._opencard.deletePhaseActivity(req);
        } else if (req["module"] === "familySafetyActivity") {
          const req = { familySafetyActivityID: Object.values(this.module)[0] };
          await this._opencard.deleteFamilySafetyActivity(req);
        } else if (req["module"] === "nonTherapyFaceToFace") {
          const req = { NonTherapyFaceToFaceID: Object.values(this.module)[0] };
          await this._opencard.deleteNonTherapyFaceToFace(req);
        } else if (req["module"] === "placement") {
          const req = { placementID: Object.values(this.module)[0] };
          await this._opencard.deletePlacements(req);
        } else if (req["module"] === "authorization") {
          // const req = { authorizationID: Object.values(this.module)[0] };
          // // await this._opencard.deleteAuth(req);
          // this._opencard.deleteAuth(req).then(data => {
          //   console.log("data>>>>>>", data);
          //   if (!data.responseStatus) {
          //     swal("Info", `${data.responseMessage}`, "info");
          //   }

          // });

          if (
            this._router.url ===
            "/reintegration/referral/service/hardgoods/detail" ||
            this._router.url ===
            "/reintegration/referral/service/other/service/detail"
          ) {
            this.isPSAForm = true;
          } else {
            const req = { authorizationID: Object.values(this.module)[0] };
            // await this._opencard.deleteAuth(req);
            this._opencard.deleteAuth(req).then((data) => {
              console.log("data>>>>>>", data);
              if (!data.responseStatus) {
                swal("Info", `${data.responseMessage}`, "info");
              }
            });
          }
        } else if (req["module"] === "progressReportsID") {
          const req = { healthExamID: Object.values(this.module)[0] };
          await this._opencard.deleteProgressReport(req);
        } else if (req["module"] === "clientSchool") {
          const req = { clientSchoolID: Object.values(this.module)[0] };
          await this._opencard.deleteAttendingSchool(req);
        } else if (req["module"] === "payor") {
          const req = { payorID: Object.values(this.module)[0] };
          await this._opencard.deletePayor(req);
        } else if (req["module"] === "school") {
          const req = { schoolID: Object.values(this.module)[0] };
          await this._opencard.deleteSchool(req);
        } else if (req["module"] === "staffSFAOffices") {
          const req = { SFAOfficeID: Object.values(this.module)[0] };
          await this._opencard.deleteSFMOffice(req);
        } else if (req["module"] === "dhsStaffList") {
          const req = { dhsStaffID: Object.values(this.module)[0] };
          await this._opencard.deleteDHSStaff(req);
        } else if (req["module"] === "dhhsStaffCases") {
          const req = { personID: Object.values(this.module)[0] };
          await this._opencard.deleteDHHSStaff(req);
        } else if (req["module"] === "csoStaffCases") {
          const req = { personID: Object.values(this.module)[0] };
          await this._opencard.deleteCSOStaff(req);
        } else if (req["module"] === "casaOfficerCases") {
          const req = { caseTeamID: Object.values(this.module)[0] };
          await this._opencard.deleteCASAOfficer(req);
        } else if (req["module"] === "judgeCases") {
          const req = { personID: Object.values(this.module)[0] };
          await this._opencard.deleteJudge(req);
        } else if (req["module"] === "communityMemberCases") {
          const req = { personID: Object.values(this.module)[0] };
          await this._opencard.deleteCommunityMember(req);
        } else if (req["module"] === "otherAgencyStaff") {
          const req = {
            providerOtherAgencyStaffID: Object.values(this.module)[0],
          };
          await this._opencard.deleteOtherAgencyStaff(req);
        } else if (req["module"] === "crbCases") {
          const req = { personID: Object.values(this.module)[0] };
          await this._opencard.deleteCRBCoordinator(req);
        } else if (req["module"] === "ProviderMember") {
          const req = { providerMemberID: Object.values(this.module)[0] };
          await this._opencard.deleteFamilyMember(req);
        } else if (req["module"] === "customerCare") {
          const req = { CustomerCarePersonID: Object.values(this.module)[0] };
          await this._opencard.deleteCustomerCarePerson(req);
        } else if (req["module"] === "galCases") {
          const req = { personID: Object.values(this.module)[0] };
          await this._opencard.deleteGuardianAdLitem(req);
        } else if (req["module"] === "srsstaff") {
          const req = { personID: Object.values(this.module)[0] };
          await this._opencard.deleteDCFStaff(req);
        } else if (req["module"] === "personTypeDhsOffice") {
          const req = { dhsOfficeID: Object.values(this.module)[0] };
          await this._opencard.deleteDHSOffice(req);
        } else if (req["module"] === "courtServiceOfficerCases") {
          const req = { personID: Object.values(this.module)[0] };
          await this._opencard.deleteCourtServiceOfficer(req);
        } else if (req["module"] === "providerStaff") {
          const req = { providerSFAStaffID: Object.values(this.module)[0] };
          await this._opencard.deleteStaff(req);
        } else if (req["module"] === "ClientTPL") {
          const req = { ClientTPLID: Object.values(this.module)[0] };
          await this._opencard.deleteThirdPartyLibrary(req);
        } else if (req["module"] === "CourtCase") {
          const req = { CourtCaseID: Object.values(this.module)[0] };
          await this._opencard.deleteCourtCase(req);
        } else if (req["module"] === "ClientProfile") {
          const req = { ClientProfileID: Object.values(this.module)[0] };
          await this._opencard.deleteClientProfile(req);
        } else if (req["module"] === "ClientPreventativeMeasure") {
          const req = {
            ClientPreventativeMeasureID: Object.values(this.module)[0],
          };
          await this._opencard.deletePreventativeMeasures(req);
        } else if (req["module"] === "clientStrength") {
          const req = { clientStrengthID: Object.values(this.module)[0] };
          await this._opencard.deleteClientStrength(req);
        } else if (req["module"] === "ClientMedication") {
          const req = { ClientMedicationID: Object.values(this.module)[0] };
          await this._opencard.deleteClientMedication(req);
        } else if (req["module"] === "ClientMedication") {
          const req = { ClientMedicationID: Object.values(this.module)[0] };
          await this._opencard.deleteClientAllergy(req);
        } else {
          await this.deleteRecord(req);
        }
      } else {
        this.deleteMasterRecords();
      }
      this.deleteConfirmationBtnLabel = "Confirm";
      this.isDeleteConfirmationDisable = false;
      console.log(
        "Navigation url from on delete",
        this._localValues.previousurl
      );
      this.infoText = "The record has been deleted successfully!";
      if (this.isPopUp) {
        this.isDeleteConfirmation = false;
        this.deleteConfirmationBtnLabel = "Confirm";
        this.isDeleteConfirmationDisable = false;
        console.log("PopUp");
        return this.deleted.emit({ isDeleted: true });
      } else {
        console.log("PopUp");
        if (
          this._router.url ===
          "/reintegration/referral/service/hardgoods/detail" ||
          this._router.url ===
          "/reintegration/referral/service/other/service/detail"
        ) {
          this.isPSAForm = true;
        } else {
          return this._router.navigate([this._localValues.previousurl], {
            queryParamsHandling: "preserve",
          });
        }
      }
    }
  }

  deleteRecord(deleteReq: any) {
    this.infoText = "";
    return new Promise((resolve) => {
      this._opencard.file_Delete(deleteReq).then((data: any) => {
        resolve(data);
      });
    });
  }

  async deleteMasterRecords() {
    const currentUrl = this._router.url,
      req = {};
    if (
      currentUrl.includes("/nc-hs/") ||
      currentUrl.includes("/bh-ok/detail") ||
      currentUrl === "/reports/referral/family-preservation/detail" ||
      currentUrl.includes("/nc-rfc") ||
      currentUrl.includes("/reintegration/referral/detail") ||
      currentUrl.includes("/nc-fch/detail") ||
      currentUrl.includes("/nc-ops/detail")
    ) {
      req["module"] = "referral";
      req["moduleID"] = [
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
      ];
      req["staffID"] =
        parseInt(localStorage.getItem("staffId")) -
        this._opencard.getHasKey() || 4620;
    } else if (currentUrl.includes("/case-activity/detail")) {
      req["module"] = "caseActivity";
      req["moduleID"] = [this._localValues.caseAcitivityID];
      req["staffID"] =
        parseInt(localStorage.getItem("staffId")) -
        this._opencard.getHasKey() || 4620;
    }
    if (currentUrl.includes("/provider")) {
      req["module"] = "provider";
      req["moduleID"] = [
        parseInt(localStorage.getItem("providerID")) -
        this._opencard.getHasKey(),
      ];
      req["staffID"] =
        parseInt(localStorage.getItem("staffId")) -
        this._opencard.getHasKey() || 4620;
    }
    return await this.deleteRecord(req);
  }

  async deletePlacementAndPlacementEventRecords() {
    this.deleteConfirmationBtnLabel = "Delete";
    this.isDeleteConfirmation = false;
    this.isDeleteConfirmationDisable = false;
    const req = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
      placementID:
        parseInt(localStorage.getItem("placementID")) -
        this._opencard.getHasKey(),
      clientID:
        parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey(),
      placementDetailID: parseInt(localStorage.getItem("placementDetailId")),
    };
    swal(
      "Delete Placement",
      `This will delete this placement,
            any Placement Events, Living Arrangements, and Authorizations attached to it.
            will be recouped.
            Are you sure you want to continue with the delete?`,
      "question"
    ).then(async (data) => {
      console.log("Prmopt value", data);
      if (data.value) {
        // Ack option form will open
        this._ackComponent.getPlacementCaseManager();
        this._ackComponent.ngOnInit();
        // this._ackComponent.ackOptions();
        // this._router.navigate([], { queryParams: { action: 'delete', queryParamsHandling: 'merge' } });
        this.isOpenAckForm = true;
      } else {
        return;
      }
    });
    // let response = await this._opencard.deletePlacementAndPlacementEventRecords(req);
    this.placementDeleteAffectedRows = this._ackComponent.deletedPlacementRecordsCount;
    // console.log("Placement delete response", response);
  }

  onAckOptionsForm = (event: any) => {
    this.isOpenAckForm = event.isPrompt;
    this.isPPS5120Form = event.isPPS5120Form;
    this.isPSAForm = event.isPSAForm;
  };

  getPSAFormStatus = (event: any) => {
    if (event === "close") {
      this.isPSAForm = false;
      return (this.isPlacementDleteCountPrompt = true);
    }
  };

  getPlacementAcknowledgmentFormStatus = (event: any) => {
    this.isPPS5120Form = event.isPlacementAckForm;
    this.isPSAForm = event.isPSAForm;
  };

  navigationURL(urlArray?: any) {
    console.log("urlArray>>>", urlArray);
    let previousURL: string;
    previousURL = urlArray[0].url;
    console.log("Previous URL", previousURL);
    if (previousURL.includes("?")) {
      previousURL = previousURL.split("?")[0];
    }
    this._localValues.previousurl = previousURL;
  }

  deleteBasedOnUrl() {
    this.deleteConfirmationBtnLabel = "Deleting...";
    this.isDeleteConfirmationDisable = true;
    let apiUrl, object;
    const req = {};
    switch (this._localValues.deleteRequestNode) {
      case "Team Member":
      case "Team Leader":
        apiUrl = "/staffTeamLeader/delete";
        object = "staffTeamLeaderID";
        break;
      case "Compliance Tech":
      case "Assigned Compliance Tech":
        apiUrl = "/staffComplianceTech/delete";
        object = "staffComplianceTechID";
        break;

      case "Primary Office":
      case "Secondary Office":
        apiUrl = "/staffSFAOffice/delete";
        object = "staffSFAOfficeID";
        break;

      case "TRANSPORTATION":
      case "TRANSPORTATION (SFM OFFICE)":
        apiUrl = "/staffTransportation/delete";
        object = "staffTransportationID";
        break;

      case "HEALTH EXAM":
        apiUrl = "/healthExam/delete";
        object = "healthExamID";
        break;

      case "TREATMENT DECISION":
        apiUrl = "/treatmentDecisions/delete";
        object = "treatmentDecisionsID";
        break;
    }

    req[object] = this._localValues.deleteRequestKey;
    if (apiUrl && object && this._localValues.deleteRequestKey) {
      this._opencard.deleteBasedOnParam(req, apiUrl).then((data: any) => {
        this.deleteConfirmationBtnLabel = "Confirm";
        this.isDeleteConfirmationDisable = false;
        this.isDeleteConfirmation = false;
        this.deleted.emit();
      });
    }
  }

  onClickDeletePlacementConfirmation = () => {
    return this._router.navigate([
      "/reintegration/referral/opencard/placement/view",
    ]);
  };
}
