import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { PrioritizedReportsComponent } from "../prioritized-reports/prioritized-reports.component";
import { TeamFormComponent } from "../team-form/team-form.component";
import { UserFormComponent } from "../user-form/user-form.component";
import { ClientFormComponent } from "../person-master/Client/client-form/client-form.component";
import { RolesComponent } from "../roles/roles.component";
import { AuthGuardService as AuthGuard } from "../auth/auth-guard.service";
import { AuthGuardVerificationService } from "../auth/auth-guard-verification.service";
import { UserRoleComponent } from "../user-role/user-role.component";
import { TeamDetailsFormComponent } from "../team-details-form/team-details-form.component";
import { StaffFormComponent } from "../staff-form/staff-form.component";
import { DHSStaffComponent } from "../person-master/Dhs/dhs-staff/dhs-staff.component";
import { DhhsStaffComponent } from "../person-master/Dhhs/dhhs-staff/dhhs-staff.component";
import { DonationComponent } from "../donation-master/donation/donation.component";
import { DonationListComponent } from "../donation-master/donation-list/donation-list.component";
import { ReferralsComponent } from "../referrals/referrals.component";
import { CsostaffComponent } from "../person-master/Cso/csostaff/csostaff.component";
import { CasaofficerComponent } from "../person-master/Casa/casaofficer/casaofficer.component";
import { JudgeComponent } from "../person-master/Judge/judge/judge.component";
import { CommunityMemberComponent } from "../person-master/Community-member/community-member/community-member.component";
import { OtherAgencyStaffComponent } from "../other-agency-staff/other-agency-staff.component";
import { CrdOfficerComponent } from "../crd-officer/crd-officer.component";
import { MetadataConfigurationComponent } from "../metadata-configuration/metadata-configuration.component";
import { EthnicCityComponent } from "../metadata-configuration/meta-data/ethnic-city/ethnic-city.component";
import { TribeComponent } from "../metadata-configuration/meta-data/tribe/tribe.component";
import { InsuranceTypeComponent } from "../metadata-configuration/meta-data/insurance-type/insurance-type.component";
import { StateComponent } from "../metadata-configuration/meta-data/state/state.component";
import { CityComponent } from "../metadata-configuration/meta-data/city/city.component";
import { CountyComponent } from "../metadata-configuration/meta-data/county/county.component";
import { ZipComponent } from "../metadata-configuration/meta-data/zip/zip.component";
import { DhhsOfficeComponent } from "../metadata-configuration/meta-data/dhhs-office/dhhs-office.component";
import { CsoOfficeComponent } from "../metadata-configuration/meta-data/cso-office/cso-office.component";
import { DhsOfficeComponent } from "../metadata-configuration/meta-data/dhs-office/dhs-office.component";
import { TenureComponent } from "../metadata-configuration/meta-data/tenure/tenure.component";
import { ReligionComponent } from "../metadata-configuration/meta-data/religion/religion.component";
import { LanguageComponent } from "../metadata-configuration/meta-data/language/language.component";
import { EducationLevelComponent } from "../metadata-configuration/meta-data/education-level/education-level.component";
import { EmploymentStatusComponent } from "../metadata-configuration/meta-data/employment-status/employment-status.component";
import { ReferralViewComponent } from "../referral-view/referral-view.component";
import { FamilyMemberComponent } from "../family-member/family-member.component";
import { FamilyPreservationComponent } from "../referrals/family-preservation/family-preservation.component";
import { PrimaryReferralReasonComponent } from "../metadata-configuration/meta-data/primary-referral-reason/primary-referral-reason.component";
import { SeondaryReferralReasonComponent } from "../metadata-configuration/meta-data/seondary-referral-reason/seondary-referral-reason.component";
import { SfcsworkersComponent } from "../metadata-configuration/meta-data/sfcsworkers/sfcsworkers.component";
import { CaseTeamComponent } from "../case-team/case-team.component";
import { CaseTeamListComponent } from "../case-team-list/case-team-list.component";
import { HomeCountyComponent } from "../home-county/home-county.component";
import { HomeCountyListComponent } from "../home-county-list/home-county-list.component";
import { SfcsOfficerComponent } from "../sfcs-officer/sfcs-officer.component";
import { SfcsOfficerListComponent } from "../sfcs-officer-list/sfcs-officer-list.component";
import { PhaseComponent } from "../phase/phase.component";
import { PhaseActivityComponent } from "../phase-activity/phase-activity.component";
import { NonTherapyFaceToFaceComponent } from "../non-therapy-face-to-face/non-therapy-face-to-face.component";
import { PhaseListComponent } from "../phase-list/phase-list.component";
import { NontherapyListComponent } from "../nontherapy-list/nontherapy-list.component";
import { CourtCaseComponent } from "../court-case/court-case.component";
import { ClientProfileComponent } from "../client-profile/client-profile.component";
import { CourtCaseListComponent } from "../court-case-list/court-case-list.component";
import { ClientProfileFormComponent } from "../client-profile-form/client-profile-form.component";
import { WorkerChildComponent } from "../worker-child/worker-child.component";
import { WorkerChildListComponent } from "../worker-child-list/worker-child-list.component";
import { MedicationAllergiesFormComponent } from "../medication-allergies-form/medication-allergies-form.component";
import { MedicationAllergiesComponent } from "../medication-allergies/medication-allergies.component";
import { CaseActivityComponent } from "../case-activity/case-activity.component";
import { ClientStrengthComponent } from "../client-strength/client-strength.component";
import { ClientStrengthFormComponent } from "../client-strength-form/client-strength-form.component";
import { ClientAllergiesComponent } from "../client-allergies/client-allergies.component";
import { ClientAllergiesFormComponent } from "../client-allergies-form/client-allergies-form.component";
import { ClientReferralEventComponent } from "../client-referral-event/client-referral-event.component";
import { ClientReferralEventFormComponent } from "../client-referral-event-form/client-referral-event-form.component";
import { ClientFormListComponent } from "../person-master/Client/client-form-list/client-form-list.component";
import { StaffFormListComponent } from "../staff-form-list/staff-form-list.component";
import { DhsFormListComponent } from "../person-master/Dhs/dhs-form-list/dhs-form-list.component";
import { DhhsFormListComponent } from "../person-master/Dhhs/dhhs-form-list/dhhs-form-list.component";
import { TitleMenuComponent } from "../title-menu/title-menu.component";
import { GuardianFormListComponent } from "../guardian-form-list/guardian-form-list.component";
import { JjfcComponent } from "../referrals/jjfc/jjfc.component";
import { CsoStaffFormComponent } from "../person-master/Cso/cso-staff-form/cso-staff-form.component";
import { CasaOfficerFormComponent } from "../person-master/Casa/casa-officer-form/casa-officer-form.component";
import { JudgeFormComponent } from "../person-master/Judge/judge-form/judge-form.component";
import { GuardianAdlFromComponent } from "../guardian-adl-from/guardian-adl-from.component";
import { CustomerCareFormComponent } from "../customer-care-form/customer-care-form.component";
import { ProviderMemberFormComponent } from "../person-master/Provider-member/provider-member-form/provider-member-form.component";
import { FamilMemberFormComponent } from "../famil-member-form/famil-member-form.component";

import { CommunityMemberFormComponent } from "../person-master/Community-member/community-member-form/community-member-form.component";
import { OtherAgencyStaffFormComponent } from "../other-agency-staff-form/other-agency-staff-form.component";
import { CrbOfficerFormComponent } from "../crb-officer-form/crb-officer-form.component";
import { DcfListComponent } from "../dcf-list/dcf-list.component";
import { DcfFormComponent } from "../dcf-form/dcf-form.component";
import { CourtServiceOfficerFormComponent } from "../court-service-officer-form/court-service-officer-form.component";
import { CourtServiceOfficerListComponent } from "../court-service-officer-list/court-service-officer-list.component";
import { ThirdPartyLiabilityListComponent } from "../third-party-liability-list/third-party-liability-list.component";
import { PreventativeMeasurementsListComponent } from "../preventative-measurements-list/preventative-measurements-list.component";
import { ClientDocumentsComponent } from "../client-documents/client-documents.component";
import { ClientIncidentComponent } from "../client-incident/client-incident.component";
import { ClientIncidentRmComponent } from "../client-incident-rm/client-incident-rm.component";
import { OpecardsListViewComponent } from "../opecards-list-view/opecards-list-view.component";
import { ReferralListViewComponent } from "../referrals/referral-list-view/referral-list-view.component";
// import { AssessmentFpComponent } from '../family-preservation-list/assessment-fp/assessment-fp.component'
import { ThirdPartyLiabilityFormComponent } from "../third-party-liability-form/third-party-liability-form.component";
import { PreventativeMeasureComponent } from "../preventative-measure/preventative-measure.component";
import { ProgressReportComponent } from "../family-preservation/progress-report/progress-report.component";
import { LackOfContactNotificationComponent } from "../family-preservation/lack-of-contact-notification/lack-of-contact-notification.component";
import { MentalHealthAssessmentByTherapistAndFamilyComponent } from "../family-preservation/mental-health-assessment-by-therapist-and-family/mental-health-assessment-by-therapist-and-family.component";
import { FamilySafetyPlanComponent } from "../family-preservation/family-safety-plan/family-safety-plan.component";
import { AssessmentChecklistComponent } from "../family-preservation/assessment-checklist/assessment-checklist.component";
import { DomesticViolenceScreeningComponent } from "../family-preservation/domestic-violence-screening/domestic-violence-screening.component";
import { EPDSComponent } from "../family-preservation/epds/epds.component";
import { FamilyRelapsePreventionNonIntensiveComponent } from "../family-preservation/family-relapse-prevention-non-intensive/family-relapse-prevention-non-intensive.component";
import { CaseActivityFpFormComponent } from "../family-preservation-list/forms/case-activity-fp-form/case-activity-fp-form.component";
import { AssessmentFpFormComponent } from "../family-preservation-list/forms/assessment-fp-form/assessment-fp-form.component";
import { CasePlanGoalsFpFormComponent } from "../family-preservation-list/forms/case-plan-goals-fp-form/case-plan-goals-fp-form.component";
import { FisMembersFpFormComponent } from "../family-preservation-list/forms/fis-members-fp-form/fis-members-fp-form.component";
// tslint:disable-next-line:max-line-length
import { HeadOfHouseholdFpFormComponent } from "../family-preservation-list/forms/head-of-household-fp-form/head-of-household-fp-form.component";
import { ProgressNotesFpFormComponent } from "../family-preservation-list/forms/progress-notes-fp-form/progress-notes-fp-form.component";
// tslint:disable-next-line:max-line-length
import { CaseEvaluationsFpFormComponent } from "../family-preservation-list/forms/case-evaluations-fp-form/case-evaluations-fp-form.component";
// tslint:disable-next-line:max-line-length
import { ProgressNoteDiagnosisFpFormComponent } from "../family-preservation-list/forms/progress-note-diagnosis-fp-form/progress-note-diagnosis-fp-form.component";
import { ReferralEventsFpFormComponent } from "../family-preservation-list/forms/referral-events-fp-form/referral-events-fp-form.component";
import { ExtendedFamilyFpFormComponent } from "../family-preservation-list/forms/extended-family-fp-form/extended-family-fp-form.component";
// tslint:disable-next-line:max-line-length
import { NonTherapyFaceToFaceLogComponent } from "../family-preservation/non-therapy-face-to-face-log/non-therapy-face-to-face-log.component";
import { InitialFamilyAssessmentComponent } from "../family-preservation/initial-family-assessment/initial-family-assessment.component";
import { CustodyCasePlanningConferenceComponent } from "../family-preservation/custody-case-planning-conference/custody-case-planning-conference.component";
import { Pps3051PermananencyPlanComponent } from "../family-preservation/pps3051-permananency-plan/pps3051-permananency-plan.component";
import { SupervisoryStaffingComponent } from "../family-preservation/supervisory-staffing/supervisory-staffing.component";
import { ChangeOfStatusFormComponent } from "../family-preservation/change-of-status-form/change-of-status-form.component";
import { CourtReportCorrespondenceComponent } from "../family-preservation/court-report-correspondence/court-report-correspondence.component";
import { FinancialAssistanceRequestComponent } from "../family-preservation/financial-assistance-request/financial-assistance-request.component";
import { ClientFaceToFaceComponent } from "../family-preservation/client-face-to-face/client-face-to-face.component";
import { PermanencyPlanChecklistComponent } from "../family-preservation/permanency-plan-checklist/permanency-plan-checklist.component";
import { AdministrativeRequirementsComponent } from "../family-preservation/administrative-requirements/administrative-requirements.component";
import { ServiceAndServiceCodeComponent } from "../family-preservation/service-and-service-code/service-and-service-code.component";
import { VisitationScheduleComponent } from "../family-preservation/visitation-schedule/visitation-schedule.component";
import { PermanencyPlanReviewComponent } from "../family-preservation/permanency-plan-review/permanency-plan-review.component";
import { IntroAndParentsGuideComponent } from "../family-preservation/intro-and-parents-guide/intro-and-parents-guide.component";
import { NonCustodialParentAssessmentComponent } from "../family-preservation/non-custodial-parent-assessment/non-custodial-parent-assessment.component";
import { NonCustodialParentIcedWorksheetComponent } from "../family-preservation/non-custodial-parent-iced-worksheet/non-custodial-parent-iced-worksheet.component";
import { NonIntensiveTransitionComponent } from "../family-preservation/non-intensive-transition/non-intensive-transition.component";
import { Pps3049AIntroAndParentsGuideComponent } from "../family-preservation/pps3049-a-intro-and-parents-guide/pps3049-a-intro-and-parents-guide.component";
import { FamilyServicePreservationPlanComponent } from "../family-preservation/family-service-preservation-plan/family-service-preservation-plan.component";
import { TherapyDischargeComponent } from "../family-preservation/therapy-discharge/therapy-discharge.component";
import { TreatmentPlanUpdateComponent } from "../family-preservation/treatment-plan-update/treatment-plan-update.component";
import { PlanOfSafeCareComponent } from "../family-preservation/plan-of-safe-care/plan-of-safe-care.component";
import { CaseTransferSummaryComponent } from "../family-preservation/case-transfer-summary/case-transfer-summary.component";
import { ProgressNoteComponent } from "../family-preservation/progress-note/progress-note.component";
import { Pps5002Component } from "../family-preservation/pps5002/pps5002.component";
import { MissingChildQuestionaireComponent } from "../family-preservation/missing-child-questionaire/missing-child-questionaire.component";
import { CourtReportTemplateComponent } from "../family-preservation/court-report-template/court-report-template.component";
import { CourtOrderComponent } from "../court-order/court-order.component";
import { PayorComponent } from "../payor/payor.component";
import { PayeeComponent } from "../payee/payee.component";
// import { OpecardsListViewComponent } from '../opecards-list-view/opencard-listview.module';
import { ClaimsListViewComponent } from "../claims-list-view/claims-list-view.component";

//////////ReintegrationComponents////////////////
import { DepartureChecklistComponent } from "../reintegration-forms/departure-checklist/departure-checklist.component";
import { CaregiverResponseToolComponent } from "../reintegration-forms/caregiver-response-tool/caregiver-response-tool.component";
import { AchievementPlanComponent } from "../reintegration-forms/achievement-plan/achievement-plan.component";
import { ChildAndFamilyProfileComponent } from "../reintegration-forms/child-and-family-profile/child-and-family-profile.component";
import { DecisionMakingFunctionalAssessmentComponent } from "../reintegration-forms/decision-making-functional-assessment/decision-making-functional-assessment.component";
import { InitialPlacementScreeningToolComponent } from "../reintegration-forms/initial-placement-screening-tool/initial-placement-screening-tool.component";

import { InformalCareReferralComponent } from "../reintegration-forms/informal-care-referral/informal-care-referral.component";
import { InitialScreeningToolComponent } from "../reintegration-forms/initial-screening-tool/initial-screening-tool.component";
import { MaternalPaternalRelativeComponent } from "../reintegration-forms/maternal-paternal-relative/maternal-paternal-relative.component";
import { PermanencyPlanDeskReviewComponent } from "../reintegration-forms/permanency-plan-desk-review/permanency-plan-desk-review.component";
import { HumanTraffickingChildWelfareComponent } from "../reintegration-forms/human-trafficking-child-welfare/human-trafficking-child-welfare.component";
import { ICWAComponent } from "../reintegration-forms/icwa/icwa.component";
import { MedicalGeneticInfoComponent } from "../reintegration-forms/medical-genetic-info/medical-genetic-info.component";
import { MedicallyFragileScoringToolComponent } from "../reintegration-forms/medically-fragile-scoring-tool/medically-fragile-scoring-tool.component";
import { RehabilationServiceReferralComponent } from "../reintegration-forms/rehabilation-service-referral/rehabilation-service-referral.component";
import { FamilyPresServiceComponent } from "../reintegration-forms/family-pres-service/family-pres-service.component";
import { KinshipAssessmentServiceComponent } from "../reintegration-forms/kinship-assessment-service/kinship-assessment-service.component";

import { SiblingSeparationStaffingComponent } from "../reintegration-forms/sibling-separation-staffing/sibling-separation-staffing.component";
import { SocialHistoryComponent } from "../reintegration-forms/social-history/social-history.component";
import { SocialEmotionalScreeningToolComponent } from "../reintegration-forms/social-emotional-screening-tool/social-emotional-screening-tool.component";
import { MentalHealthComponent } from "../reintegration-forms/mental-health/mental-health.component";
import { SuicideRiskAssessmentComponent } from "../reintegration-forms/suicide-risk-assessment/suicide-risk-assessment.component";
import { WorkerChildQualityChecklistComponent } from "../reintegration-forms/worker-child-quality-checklist/worker-child-quality-checklist.component";
import { WorkerParentQualityChecklistComponent } from "../reintegration-forms/worker-parent-quality-checklist/worker-parent-quality-checklist.component";
import { XtremeKinshipRecruitmentComponent } from "../reintegration-forms/xtreme-kinship-recruitment/xtreme-kinship-recruitment.component";

import { NoticeChildCustodyCaseplanComponent } from "../reintegration-forms/notice-child-custody-caseplan/notice-child-custody-caseplan.component";
import { ParentChildInteractionComponent } from "../reintegration-forms/parent-child-interaction/parent-child-interaction.component";
import { KYACComponent } from "../reintegration-forms/kyac/kyac.component";

import { PermanencyPlanComponent } from "../reintegration-forms/permanency-plan/permanency-plan.component";
import { CaseplanNeedingScheduledComponent } from "../reintegration-forms/caseplan-needing-scheduled/caseplan-needing-scheduled.component";
import { VisitationPlanComponent } from "../reintegration-forms/visitation-plan/visitation-plan.component";
import { AddendumCourtReportComponent } from "../reintegration-forms/addendum-court-report/addendum-court-report.component";
import { DdContactSheetComponent } from "../reintegration-forms/dd-contact-sheet/dd-contact-sheet.component";
import { PointsOfServeranceComponent } from "../reintegration-forms/points-of-serverance/points-of-serverance.component";
import { CourtReportComponent } from "../reintegration-forms/court-report/court-report.component";
import { DdReportAllegedFatherComponent } from "../reintegration-forms/dd-report-alleged-father/dd-report-alleged-father.component";
import { DdReportFatherUnknownComponent } from "../reintegration-forms/dd-report-father-unknown/dd-report-father-unknown.component";
import { DdReportFatherComponent } from "../reintegration-forms/dd-report-father/dd-report-father.component";
import { DdReportMaternalGrandparentComponent } from "../reintegration-forms/dd-report-maternal-grandparent/dd-report-maternal-grandparent.component";
import { DdReportMotherComponent } from "../reintegration-forms/dd-report-mother/dd-report-mother.component";
import { DdReportPaternalGrandparentComponent } from "../reintegration-forms/dd-report-paternal-grandparent/dd-report-paternal-grandparent.component";
import { ReintegrationPlanComponent } from "../reintegration-forms/reintegration-plan/reintegration-plan.component";
import { RelinquishmentOfMinorChildAgencyComponent } from "../reintegration-forms/relinquishment-of-minor-child-agency/relinquishment-of-minor-child-agency.component";
import { ReviewHearingExhibitComponent } from "../reintegration-forms/review-hearing-exhibit/review-hearing-exhibit.component";
import { VisitationCourtReportComponent } from "../reintegration-forms/visitation-court-report/visitation-court-report.component";
import { SfcsEmployeeResourceComponent } from "../reintegration-forms/sfcs-employee-resource/sfcs-employee-resource.component";
import { RespiteRequestComponent } from "../reintegration-forms/respite-request/respite-request.component";
import { PlannedChangedPlacementNoticeComponent } from "../reintegration-forms/planned-changed-placement-notice/planned-changed-placement-notice.component";
import { PermanencyReleaseChangeStatusComponent } from "../reintegration-forms/permanency-release-change-status/permanency-release-change-status.component";
import { KinshipVisitationPlanComponent } from "../reintegration-forms/kinship-visitation-plan/kinship-visitation-plan.component";
import { FamilySafetyPlanReintegrationComponent } from "../reintegration-forms/family-safety-plan-reintegration/family-safety-plan-reintegration.component";
import { ChildMoveDisruptionComponent } from "../reintegration-forms/child-move-disruption/child-move-disruption.component";
import { CaseTransferSummaryReinteComponent } from "../reintegration-forms/case-transfer-summary-reinte/case-transfer-summary-reinte.component";
import { NewReferralPacket10Component } from "../reintegration-forms/new-referral-packet-10.20.17/new-referral-packet-10.20.17.component";
import { NewReferralChecklistComponent } from "../reintegration-forms/new-referral-checklist/new-referral-checklist.component";
import { Icpc100bPps9135Component } from "../reintegration-forms/icpc-100b-pps-9135/icpc-100b-pps-9135.component";
import { Appendix9hIcpcChecklistComponent } from "../reintegration-forms/appendix-9h-icpc-checklist/appendix-9h-icpc-checklist.component";
import { Pps91451RegComponent } from "../reintegration-forms/pps-91451-reg/pps-91451-reg.component";
import { NoticeOfPlannedMoveWaiverGuideComponent } from "../reintegration-forms/notice-of-planned-move-waiver-guide/notice-of-planned-move-waiver-guide.component";
import { DisabilityConsulatationReferralFormComponent } from "../reintegration-forms/disability-consulatation-referral-form/disability-consulatation-referral-form.component";

// kinship referral forms
import { KinshipCodeOfEthicsComponent } from "../kinship-forms/kinship-code-of-ethics/kinship-code-of-ethics.component";
import { ConfidentialityPolicyComponent } from "../kinship-forms/confidentiality-policy/confidentiality-policy.component";
import { DisciplinePolicyComponent } from "../kinship-forms/discipline-policy/discipline-policy.component";
import { DeclarationOfCriminalOffensesComponent } from "../kinship-forms/declaration-of-criminal-offenses/declaration-of-criminal-offenses.component";
import { EmailQuestionaireComponent } from "../kinship-forms/email-questionaire/email-questionaire.component";
import { PlacementSupportPlanComponent } from "../kinship-forms/placement-support-plan/placement-support-plan.component";

// aftercare referral forms
import { AfterCareMonthlyReportComponent } from "../aftercare-forms/after-care-monthly-report/after-care-monthly-report.component";
import { AfterCareContactAgreementComponent } from "../aftercare-forms/after-care-contact-agreement/after-care-contact-agreement.component";

//adoption referral forms
import { RequestForConsentToAdoptComponent } from "../adoption-forms/request-for-consent-to-adopt/request-for-consent-to-adopt.component";
import { NoticeBestInterestStaffingComponent } from "../adoption-forms/notice-best-interest-staffing/notice-best-interest-staffing.component";
import { RequestToScheduleBestInterestStaffingComponent } from "../adoption-forms/request-to-schedule-best-interest-staffing/request-to-schedule-best-interest-staffing.component";
import { IndividualRecruitmentPlanComponent } from "../adoption-forms/individual-recruitment-plan/individual-recruitment-plan.component";
import { AdoptionCourtReportTemplateComponent } from "../adoption-forms/adoption-court-report-template/adoption-court-report-template.component";
import { AdoptionExchangeChildStatusUpdateComponent } from "../adoption-forms/adoption-exchange-child-status-update/adoption-exchange-child-status-update.component";
import { SiblingSplitRequestComponent } from "../adoption-forms/sibling-split-request/sibling-split-request.component";
import { AdoptiveFamilyAssessmentComponent } from "../adoption-forms/adoptive-family-assessment/adoptive-family-assessment.component";

//independent living referral form
import { SelfSufficiencyMatrixComponent } from "../independent-living-forms/self-sufficiency-matrix/self-sufficiency-matrix.component";
import { SelfSufficiencyPlanComponent } from "../independent-living-forms/self-sufficiency-plan/self-sufficiency-plan.component";
import { CaseyAssessmentComponent } from "../independent-living-forms/casey-assessment/casey-assessment.component";
import { ProviderComponent } from "../provider/provider.component";
import { EncounterReportComponent } from "../encounter-report/encounter-report.component";
import { BatchProcessingComponent } from "../batch-processing/batch-processing.component";

//cis forms
// import { Asq2MoComponent } from '../cis-forms/asq-2-mo/asq-2-mo.component';
// import { Asq6MoComponent } from '../cis-forms/asq-6-mo/asq-6-mo.component';
// import { Asq12MoComponent } from '../cis-forms/asq-12-mo/asq-12-mo.component';
// import { Asq18MoComponent } from '../cis-forms/asq-18-mo/asq-18-mo.component';
// import { Asq24MoComponent } from '../cis-forms/asq-24-mo/asq-24-mo.component';
// import { Asq30MoComponent } from '../cis-forms/asq-30-mo/asq-30-mo.component';
// import { Asq36MoComponent } from '../cis-forms/asq-36-mo/asq-36-mo.component';
// import { Asq48MoComponent } from '../cis-forms/asq-48-mo/asq-48-mo.component';
// import { Asq60MoComponent } from '../cis-forms/asq-60-mo/asq-60-mo.component';
import { KippPMTOComponent } from "../kipp-pmto/kipp-pmto.component";
import { UnusualIncidentComponent } from "../unusual-incident/unusual-incident.component";
import { OpencardListviewModule } from "../opecards-list-view/opencard-listview.module";
import { ProviderSponserComponent } from "../provider-sponser/provider-sponser.component";

import { EducationEnrollmentComponent } from "../education-enrollment/education-enrollment.component";
import { BatchStatusComponent } from "../batch-processing/batch-status/batch-status.component";
import { ClientDashboardComponent } from "../client-dashboard/client-dashboard.component";
import { SiblingsInoutHomeComponent } from "../siblings-inout-home/siblings-inout-home.component";
import { SupervisoryStaffingFormNodeComponent } from "../supervisory-staffing-form-node/supervisory-staffing-form-node.component";
import { SupervisoryStaffingFormForSupervisorsComponent } from "../supervisory-staffing-form-for-supervisors/supervisory-staffing-form-for-supervisors.component";
import { FamilySafetyComponent } from "../family-safety/family-safety.component";
import { FamilySafetyActivityComponent } from "../family-safety-activity/family-safety-activity.component";
import { CmsAttachmentFormComponent } from "../cms-attachment-form/cms-attachment-form.component";
import { NewReferralComponent } from "../new-referral/new-referral.component";
import { NonContractComponent } from "../non-contract/non-contract.component";
import { PersonmasterListViewComponent } from "../person-master/personmaster-list-view/personmaster-list-view.component";
import { FamilyPreservationProgressNoteComponent } from "../family-preservation-progress-note/family-preservation-progress-note.component";
import { FamilyPrevNonTherpyFaceToFaceContactComponent } from "../family-prev-non-therpy-face-to-face-contact/family-prev-non-therpy-face-to-face-contact.component";
import { AccessRightsComponentsComponent } from "../access-rights-components/access-rights-components.component";
import { AdminSettingComponentsComponent } from "../admin-setting-components/admin-setting-components.component";
import { AddCustomFieldComponentsComponent } from "../add-custom-field-components/add-custom-field-components.component";
// import { ReintegFostCarePRTFscreenInfoComponent } from '../reinteg-fost-care-prtfscreen-info/reinteg-fost-care-prtfscreen-info.component';
// import { NonTherpyFaceToFaceContactComponent } from '../non-therpy-face-to-face-contact/non-therpy-face-to-face-contact.component';
import { CaseActivityLogComponent } from "../case-activity-log/case-activity-log.component";
// import { ReintegretionFosterCareAdoptionComponent } from '../reintegretion-foster-care-adoption/reintegretion-foster-care-adoption.component';
import { AdoptionAfterCareSummaryComponent } from "../adoption-after-care-summary/adoption-after-care-summary.component";
import { SocialHistoryForChildrenComponent } from "../social-history-for-children/social-history-for-children.component";
import { ReportsComponent } from "../reports/reports.component";
import { AdoptiveFamilyBudgetComponent } from "../adoptive-family-budget/adoptive-family-budget.component";
import { FinanceReportsComponent } from "../finance-reports/finance-reports.component";
import { ReportPrimaryFilterComponent } from "../report-primary-filter/report-primary-filter.component";
import { ReferralForAdoptionAssistanceComponent } from "../referral-for-adoption-assistance/referral-for-adoption-assistance.component";
import { UserManuelComponent } from "../user-manuel/user-manuel.component";
import { UserManuelDetailComponent } from "../user-manuel-detail/user-manuel-detail.component";
import { TransBTcaseTeamClientComponent } from "../trans-btcase-team-client/trans-btcase-team-client.component";
import { SsnActivityLogComponent } from "../ssn-activity-log/ssn-activity-log.component";
import { NCOPSComponent } from "../referrals/NC-OPS/nc-ops.component";
import { Component } from "ag-grid";
import { ServiceAgreementComponent } from "../service-agreement/service-agreement.component";
import { NCFCHComponent } from "../referrals/NC-FCH/nc-fch.component";
import { PlacementAgreementFormComponent } from "../placement-forms/placement-agreement-form/placement-agreement-form.component";
import { PlacementEventStatusComponent } from "../placement-forms/placement-event-status/placement-event-status.component";
import { ParticipantsTherpyComponent } from "../family-preservation-list/forms/participants-therpy/participants-therpy.component";
import { PlacementAcknowledgementComponent } from "../placement-forms/placement-acknowledgement/placement-acknowledgement.component";
import { PlacementPsaComponent } from "../placement-forms/placement-psa/placement-psa.component";
import { NFCRFCComponent } from "../referrals/NC-RFC/nc-rfc.component";
import { ProviderEnvelopeComponent } from "../placement-forms/provider-envelope/provider-envelope.component";
import { PlacementAgreementKinshipNonPaidComponent } from "../placement-forms/placement-agreement-kinship-non-paid/placement-agreement-kinship-non-paid.component";
import { PlacementAgreementKinshipAPComponent } from "../placement-forms/placement-agreement-kinship-ap/placement-agreement-kinship-ap.component";
import { PlacementFlowChartComponent } from "../placement-forms/placement-flow-chart/placement-flow-chart.component";
import { ViewHistoryComponent } from "../placement-forms/view-history/view-history.component";
import { MoveFormWithDisruptionComponent } from "../move-print-forms/move-form-with-disruption/move-form-with-disruption.component";
import { MoveFormComponent } from "../move-print-forms/move-form/move-form.component";
import { PlacementRefDraftComponent } from "../placement-referral-forms/placement-ref-draft/placement-ref-draft.component";
import { PlacementRefBlankComponent } from "../placement-referral-forms/placement-ref-blank/placement-ref-blank.component";
import { PlacementFaxListComponent } from "../placement-forms/placement-fax-list/placement-fax-list.component";
import { Pps0550Component } from "../print-forms/pps0550/pps0550.component";
import { ClientGradeSubmissionComponent } from "../client-grade-submission/client-grade-submission.component";
import { ModifyFactsComponent } from "../modify-facts/modify-facts.component";
import { PlacementPlanBlankComponent } from "../print-forms/placement-plan-blank/placement-plan-blank.component";
import { UserRightFormComponent } from "../user-right-form/user-right-form.component";
import { SfcsContractComponent } from "../provider-sponser/sfcs-contract/sfcs-contract/sfcs-contract.component";
import { DhsOfficePersontypeComponent } from "../dhs-office-persontype/dhs-office-persontype.component";

// Person Cards
import { SchoolListComponent } from "../person-master/school/school-list/school-list.component";
import { ProviderSponsorClaimsComponent } from "../provider-sponser/provider-sponsor-claims/provider-sponsor-claims.component";
import { MenuPermissionComponent } from "../menu-permission/menu-permission.component";
import { DHSCountiesComponent } from "../person-master/Dhs/counties/counties.component";
import { NCHSReferralComponent } from "../referrals/NC-HS/nc-hs.component";
import { BHOKComponent } from "../referrals/BH-OK/BH-OK.component";
import { CustomerCareListComponent } from "../customer-care-list/customer-care-list.component";
import { CISFormsHandlerComponent } from "../wizards/cis-forms-handler/cis-forms.handler.component";
import { CustomerCareComponent } from "../person-master/customer-care/customer-care.component";
import { NCMHRComponent } from "../referrals/NC-MHR/NC-MHR.component";
import { ApprovedClaimsComponent } from "../approved-claims/approved-claims.component";
import { AuthorizationClaimComponent } from "../authorization-claim/authorization-claim.component";
import { AddOtherServiceBatchAccountPayableComponent } from "../add-other-service-batch-account-payable/add-other-service-batch-account-payable.component";
import { OtherServicePayBatchStatusComponent } from "../other-service-pay-batch-status/other-service-pay-batch-status.component";
import { AuthClaimInfoComponent } from "../auth-claim-info/auth-claim-info.component";
import { ProviderEmailModuleComponent } from "../provider-email-module/provider-email-module.component";
import { MedicalAssessmentFormComponent } from "../medical-assessment-form/medical-assessment-form.component";
// import { HealthExamPrtfComponent } from '../prtf-referral/health-exam-prtf/health-exam-prtf.component';
import { ProgressReportsPrtfComponent } from "../prtf-referral/progress-reports-prtf/progress-reports-prtf.component";
import { RecruitmentTrainingComponent } from "../recruitment-training/recruitment-training.component";
import { LicensingRecruitmentComponent } from "../licensing-recruitment/licensing-recruitment.component";
import { StaffTeamLeaderComponent } from "../staff-opencards/staff-team-leader/staff-team-leader.component";
import { ComplianceTechComponent } from "../staff-opencards/compliance-tech/compliance-tech.component";
import { StaffPositionComponent } from "../staff-position/staff-position.component";
import { SfmOfficeComponent } from "../staff-opencards/sfm-office/sfm-office.component";
import { CsClientProfileComponent } from "../cs-client-profile/cs-client-profile.component";
import { AckOptionsComponent } from "../ack-options/ack-options.component";
import { TransBtTeamLeadMemberComponent } from "../trans-bt-team-lead-member/trans-bt-team-lead-member.component";
import { TransferCaseManagerCompTechComponent } from "../transfer-case-manager-comp-tech/transfer-case-manager-comp-tech.component";
import { EvaluationTypeComponent } from "../evaluation-type/evaluation-type.component";
import { EvaluationCreationComponent } from "../evaluation-creation/evaluation-creation.component";
import { VersionCreationComponent } from "../version-creation/version-creation.component";
import { EvaluationScaleComponent } from "../evaluation-scale/evaluation-scale.component";
import { QuestionCreationComponent } from "../question-creation/question-creation.component";
import { QuestionGroupCreationComponent } from "../question-group-creation/question-group-creation.component";
import { SetEvaluationAllowedGroupsComponent } from "../set-evaluation-allowed-group/set-evaluation-allowed-group.component";
import { DataMigrationComponent } from "../data-migration/data-migration.component";
import { SUBRFCComponent } from "../referrals/sub-rfc/sub-rfc.component";
import { SchoolIEPformComponent } from "../school-iepform/school-iepform.component";
import { ClientGradeProgressionComponent } from "../client-grade-progression/client-grade-progression.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    data: {
      Sidenav: true,
      breadcrumbs: true,
      text: "Home",
    },
    canActivate: [AuthGuard, AuthGuardVerificationService],
    children: [
      {
        path: "userRightForm",
        component: UserRightFormComponent,
      },
      {
        path: "menuRightForm",
        component: MenuPermissionComponent,
      },
      {
        path: "prtf/medical",
        component: TitleMenuComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "prtf/medical_assessment/new",
        component: MedicalAssessmentFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "prtf/medical_assessment/view",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "provider_Authorization",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csClaimProvider",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "payee_Authorization",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "provider_Authorization_claim",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "payee_Authorization_claim",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "cs_claim_payee",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "cs_claim_payeeClaim",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "cs_claim_payee/claimDetail",
        component: AuthClaimInfoComponent,
      },
      {
        path: "cs_claim_payee/auth/new",
        component: AuthorizationClaimComponent,
      },
      {
        path: "cs_claim_payee/auth/detail",
        component: AuthorizationClaimComponent,
      },
      {
        path: "payee/auth_list",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csClientList",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csProviderList",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csProvider/csProviderForm",
        component: CsClientProfileComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "transBtTeamLeadMember",
        component: TransBtTeamLeadMemberComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "payee/auth_list/claim-list",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "payee/authClaim/details",
        component: AuthorizationClaimComponent,
      },

      {
        path: "payee/serviceClaim_hardgoods/auth_list",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "payee/serviceClaim_hardgoods/auth_list/claim-list",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "payee/serviceClaim_hardgoods/auth-claim/details",
        component: AuthorizationClaimComponent,
      },

      {
        path: "payee/serviceClaim_otherService/auth_list",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "payee/serviceClaim_otherService/auth_list/claim-list",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "payee/serviceClaim_otherService/auth-claim/details",
        component: AuthorizationClaimComponent,
      },

      {
        path: "payee/serviceClaim/directAuth",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csClient/csClientProfile",
        component: CsClientProfileComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csPayee",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csPayee/payeeform/payee-DirectAuthList",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csPayee/payeeform/payee-AuthList",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csPayeeInfoClient",
        component: ClientFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csClaimInfo/PayeeForm",
        component: PayeeComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csClaimInfo/ProviderForm",
        component: ProviderComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csPayeeAuthInfoClient",
        component: ClientFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csPayee/payeeform",
        component: PayeeComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "CSpayee/payeeform/authClaim/new",
        component: AuthorizationClaimComponent,
      },
      {
        path: "CSpayee/payeeform/authClaim/details",
        component: AuthorizationClaimComponent,
      },
      {
        path: "data_m_igration",
        component: DataMigrationComponent,
      },
      {
        path: "school_IEP_mod/new",
        component: SchoolIEPformComponent,
      },
      {
        path: "school_IEP_mod/details",
        component: SchoolIEPformComponent,
      },
      {
        path: "schoolIEPLists",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },

      {
        path: "accessrights",
        children: [
          {
            path: "view-role",
            component: OpecardsListViewComponent,
            canActivate: [AuthGuard, AuthGuardVerificationService],
          },
          {
            path: "create-role",
            component: AccessRightsComponentsComponent,
            canActivate: [AuthGuard, AuthGuardVerificationService],
          },
          {
            path: "admin-setting",
            component: AdminSettingComponentsComponent,
            canActivate: [AuthGuard, AuthGuardVerificationService],
          },
          {
            path: "add-custom",
            component: AddCustomFieldComponentsComponent,
            canActivate: [AuthGuard, AuthGuardVerificationService],
          },
          {
            path: "details-role",
            component: AccessRightsComponentsComponent,
            canActivate: [AuthGuard, AuthGuardVerificationService],
          },
        ],
      },
      {
        path: "modifyFacts",
        component: ModifyFactsComponent,
      },
      {
        path: "approvedClaims",
        component: ApprovedClaimsComponent,
      },
      {
        path: "auth-claim",
        component: AuthorizationClaimComponent,
      },
      {
        path: "add-other-service-accout-payable",
        component: AddOtherServiceBatchAccountPayableComponent,
      },
      {
        path: "other-service-accout-payable-status",
        component: OtherServicePayBatchStatusComponent,
      },
      {
        path: "auth-claim/details",
        component: AuthorizationClaimComponent,
      },
      {
        path: "otherService-direct/form/view",
        component: AuthorizationClaimComponent,
      },
      {
        path: "otherService-direct/form/new",
        component: AuthorizationClaimComponent,
      },
      {
        path: "cs/auth-claim/details",
        component: AuthorizationClaimComponent,
      },
      {
        path: "cs/auth-claim/new",
        component: AuthorizationClaimComponent,
      },
      {
        path: "provider/auth-claim_new",
        component: AuthorizationClaimComponent,
      },
      {
        path: "provider/auth-claim_detail",
        component: AuthorizationClaimComponent,
      },
      {
        path: "provider/auth-claim/Claimdetail",
        component: AuthorizationClaimComponent,
      },
      {
        path: "authinfo/claimList",
        component: AuthClaimInfoComponent,
      },
      {
        path: "provider/claimProvider_claimList",
        component: AuthClaimInfoComponent,
      },
      {
        path: "provider/provider_AuthorizationClaim",
        component: AuthorizationClaimComponent,
      },
      {
        path: "provider/provider_AuthorizationClaimNew",
        component: AuthorizationClaimComponent,
      },
      {
        path: "payee/payee_AuthorizationClaim",
        component: AuthorizationClaimComponent,
      },
      {
        path: "payee/payee_AuthorizationClaimNew",
        component: AuthorizationClaimComponent,
      },
      {
        path: "csPayee/cs_claim_payeeClaim",
        component: AuthorizationClaimComponent,
      },
      {
        path: "csPayee/cs_claim_payeeClaimNew",
        component: AuthorizationClaimComponent,
      },
      {
        path: "cs_claim_payee/claimDetail",
        component: AuthorizationClaimComponent,
      },
      {
        path: "case-activity-log",
        component: CaseActivityLogComponent,
      },
      {
        path: "grade-submission",
        component: ClientGradeSubmissionComponent,
      },

      {
        path: "preventative-measurements",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
            canActivate: [AuthGuard, AuthGuardVerificationService],
          },
          {
            path: "new",
            component: PreventativeMeasureComponent,
            canActivate: [AuthGuard, AuthGuardVerificationService],
          },
          {
            path: "detail",
            component: PreventativeMeasureComponent,
            canActivate: [AuthGuard, AuthGuardVerificationService],
          },
        ],
      },
      {
        path: "live/family",
        children: [
          {
            path: "reports_primary/:reportData/:reportName/:referralID",
            component: ReportPrimaryFilterComponent,
          },
        ],
      },
      {
        path: "family",
        children: [
          {
            path: "family_progress",
            component: FamilyPreservationProgressNoteComponent,
          },
          {
            path: "family_preve_face_to_face",
            component: FamilyPrevNonTherpyFaceToFaceContactComponent,
          },
          // }, {
          //     path: 'reinegration_fost_care',
          //     component: ReintegFostCarePRTFscreenInfoComponent,
          // }, {
          //     path: 'non_therpy_face_face',
          //     component: NonTherpyFaceToFaceContactComponent,
          // }, {
          //     path: 'reintegration_foster_care_adoption',
          //     component: ReintegretionFosterCareAdoptionComponent,
          // },{
          {
            path: "adoption_after_care_summary",
            component: AdoptionAfterCareSummaryComponent,
          },
          {
            path: "social_history_for_children",
            component: SocialHistoryForChildrenComponent,
          },
          {
            path: "reports_ui",
            component: ReportsComponent,
          },
          {
            path: "adoptive_family_budget",
            component: AdoptiveFamilyBudgetComponent,
          },
          {
            path: "finance_report",
            component: FinanceReportsComponent,
          },
          {
            path: "finance_report-live",
            component: FinanceReportsComponent,
          },
          {
            path: "reports_primary/:reportData/:reportName/:referralID",
            component: ReportPrimaryFilterComponent,
          },
          {
            path: "referralAdoptionAssistance",
            component: ReferralForAdoptionAssistanceComponent,
          },
          {
            path: "user_manual",
            component: UserManuelComponent,
          },
          {
            path: "user_manual_detail",
            component: UserManuelDetailComponent,
          },
          {
            path: "trans_betwen_case_team",
            component: TransBTcaseTeamClientComponent,
          },
          {
            path: "ssn_activity_log",
            component: SsnActivityLogComponent,
          },
          {
            path: "trans_bt_case_manager_comp_tech",
            component: TransferCaseManagerCompTechComponent,
          },
        ],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "team",
        component: TeamFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
          breadcrumbs: true,
          text: "Team",
        },
      },
      {
        path: "team/:id",
        component: TeamDetailsFormComponent,
        data: { id: "some value" },
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "user",
        component: UserFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
          breadcrumbs: true,
          text: "User",
        },
      },
      {
        path: "caseTeam/details",
        component: CaseTeamComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "caseTeam/new",
        component: CaseTeamComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "caseTeam",
        component: CaseTeamListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "caseActivity/details",
        component: CaseActivityComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "workerChild/details",
        component: WorkerChildComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "workerChild",
        component: WorkerChildListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "court/case/details",
        component: CourtCaseComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "court/case/new",
        component: CourtCaseComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "court/case/view",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "court/case",
        component: CourtCaseListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "client/profile",
        component: ClientProfileComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "client/profile/details",
        component: ClientProfileFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "client/profile/new",
        component: ClientProfileFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      // {
      //     path: 'homeCounty/details',
      //     component: HomeCountyComponent,
      //     canActivate: [AuthGuard, AuthGuardVerificationService]
      // },
      {
        path: "homeCounty",
        component: HomeCountyListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "sfcsOffice",
        component: SfcsOfficerListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "sfcsOffice/details",
        component: SfcsOfficerComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "sfcsOffice/new",
        component: SfcsOfficerComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "phase",
        component: PhaseListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "phase/detail",
        component: PhaseComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "phase/new",
        component: PhaseComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },

      {
        path: "nonTherapyFaceToFace/details",
        component: NonTherapyFaceToFaceComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "nonTherapyFaceToFace/new",
        component: NonTherapyFaceToFaceComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "nonTherapyFaceToFace",
        component: NontherapyListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "client",
        component: ClientFormListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "school",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
            canActivate: [AuthGuard, AuthGuardVerificationService],
          },
          {
            path: "new",
            component: SchoolListComponent,
          },
          {
            path: "detail",
            component: SchoolListComponent,
          },
          {
            path: "attending-school",
            component: OpecardsListViewComponent,
          },
          {
            path: "home-school",
            component: OpecardsListViewComponent,
          },
        ],
      },
      {
        path: "guardianAdl",
        component: GuardianFormListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "guardianAdl/new",
        component: GuardianAdlFromComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "guardianAdl/details",
        component: GuardianAdlFromComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "guardianAdl/cases",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "customer-care",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: CustomerCareComponent,
          },
          {
            path: "detail",
            component: CustomerCareComponent,
          },
          {
            path: "list",
            component: OpecardsListViewComponent,
          },
          {
            path: "person/new",
            component: CustomerCareListComponent,
          },
          {
            path: "person/detail",
            component: CustomerCareListComponent,
          },
        ],
      },
      {
        path: "client/new",
        component: ClientFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "client/details",
        component: ClientFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "staff/client/details",
        component: ClientFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "crbOfficer",
        component: CrdOfficerComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "crbOfficer/new",
        component: CrbOfficerFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "crbOfficer/details",
        component: CrbOfficerFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "crbOfficer/cases",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },

      {
        path: "otherAgencyStaff",
        component: OtherAgencyStaffComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "otherAgencyStaff/new",
        component: OtherAgencyStaffFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "otherAgencyStaff/details",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        children: [
          {
            path: "",
            component: OtherAgencyStaffFormComponent,
          },
          {
            path: "providers",
            component: OpecardsListViewComponent,
          },
        ],
      },
      {
        path: "staff",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "staff/caseList",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "staff/staffProvider",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "staff/position",
        component: StaffPositionComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "staff/new",
        component: StaffFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "staff/details",
        component: StaffFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "judge",
        component: JudgeComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "judge/new",
        component: JudgeFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "judge/details",
        component: JudgeFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "judge/cases",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "providerMember",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "providerMember/new",
        component: ProviderMemberFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "providerMember/details",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        children: [
          {
            path: "",
            component: ProviderMemberFormComponent,
          },
          {
            path: "provider",
            component: OpecardsListViewComponent,
          },
        ],
      },

      {
        path: "communityMember",
        component: CommunityMemberComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "communityMember/new",
        component: CommunityMemberFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "communityMember/details",
        component: CommunityMemberFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "communityMember/list",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dhsStaff",
        component: DhsFormListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dhsStaff/new",
        component: DHSStaffComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dhsStaff/details",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        component: DHSStaffComponent,
      },
      {
        path: "dhsOffice/view",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dhsOffice/new",
        component: DhsOfficePersontypeComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dhsOffice/detail",
        component: DhsOfficePersontypeComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dhsOffice/dhs-staff",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },

      {
        path: "dhsOffice/dhs-staff/opencard",
        component: TitleMenuComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dhsOffice/dhs-staff/cases",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dhhsStaff",
        component: DhhsFormListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dhhsStaff/new",
        component: DhhsStaffComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dhhsStaff/details",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        children: [
          {
            path: "",
            component: DhhsStaffComponent,
          },
          {
            path: "cases",
            component: OpecardsListViewComponent,
          },
        ],
      },
      {
        path: "dhsOffice/view",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dhsOffice/new",
        component: DhsOfficePersontypeComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dhsOffice/detail",
        component: DhsOfficePersontypeComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },

      {
        path: "csoStaff",
        component: CsostaffComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csoStaff/new",
        component: CsoStaffFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "csoStaff/details",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        children: [
          {
            path: "",
            component: CsoStaffFormComponent,
          },
          {
            path: "cases",
            component: OpecardsListViewComponent,
          },
        ],
      },

      {
        path: "casaOfficer",
        component: CasaofficerComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "casaOfficer/new",
        component: CasaOfficerFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "casaOfficer/details",
        component: CasaOfficerFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "casaOfficer/list",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "casaOfficer/view",
        component: TitleMenuComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },

      {
        path: "familyMember",
        component: FamilyMemberComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "familyMember/new",
        component: FamilMemberFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "familyMember/details",
        component: FamilMemberFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "familyMember/household-member",
        component: TitleMenuComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "familyMember/household-member/cases",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },

      {
        path: "familyMember/extended-family",
        component: TitleMenuComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "familyMember/extended-family/cases",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },

      {
        path: "dcf",
        component: DcfListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dcf/new",
        component: DcfFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dcf/details",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        children: [
          {
            path: "",
            component: DcfFormComponent,
          },
          {
            path: "cases",
            component: OpecardsListViewComponent,
          },
          {
            path: "dhs-office",
            component: OpecardsListViewComponent,
          },
          {
            path: "counties",
            component: OpecardsListViewComponent,
          },
          {
            path: "counties/new",
            component: DHSCountiesComponent,
          },
          {
            path: "counties/detail",
            component: DHSCountiesComponent,
          },
        ],
      },
      {
        path: "dcf/cases",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "dcf/office",
        component: OpecardsListViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },

      {
        path: "roles",
        component: RolesComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "userRoles",
        component: UserRoleComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      // {
      //     path: 'dynamicReports', component: DynamicReportsComponent,
      //     canActivate: [AuthGuard, AuthGuardVerificationService],
      //     data: {
      //         breadcrumb: 'dynamicReports'
      //     }
      // },
      {
        path: "prioritized",
        component: PrioritizedReportsComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          breadcrumb: true,
          text: "Prioritized Reports",
        },
      },
      {
        path: "live-prioritized",
        component: PrioritizedReportsComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          breadcrumb: true,
          text: "Prioritized Reports",
        },
      },
      {
        path: "donation",
        component: DonationComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "donation_List",
        component: DonationListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      // {
      //     path: 'referrals',
      //     component: ReferralsComponent,
      //     canActivate: [AuthGuard,AuthGuardVerificationService],
      //     data: {
      //         Sidenav: true
      //     },
      // },
      {
        path: "configuration",
        component: MetadataConfigurationComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      // {
      //     path: 'meta/race',
      //     component: RaceComponent,
      //     canActivate: [AuthGuard,AuthGuardVerificationService],
      //     data: {
      //         Sidenav: true
      //     },
      // },
      {
        path: "meta/ethnic_city",
        component: EthnicCityComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/tribe",
        component: TribeComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/insurance_type",
        component: InsuranceTypeComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/state",
        component: StateComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/city",
        component: CityComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/city",
        component: CityComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/county",
        component: CountyComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/zip",
        component: ZipComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/dhhs_office",
        component: DhhsOfficeComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/cso_office",
        component: CsoOfficeComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/dhs_office",
        component: DhsOfficeComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/tenure",
        component: TenureComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/religion",
        component: ReligionComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/language",
        component: LanguageComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/education_level",
        component: EducationLevelComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/empolyment_status",
        component: EmploymentStatusComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/county",
        component: CountyComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/primary_referral",
        component: PrimaryReferralReasonComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/secondary_referral",
        component: SeondaryReferralReasonComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "meta/sfcs_workers",
        component: SfcsworkersComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "referral/view",
        component: ReferralViewComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },
      {
        path: "referral",
        children: [
          {
            path: "family-preservation-list",
            component: ReferralsComponent,
            canActivate: [AuthGuard, AuthGuardVerificationService],
            data: {
              Sidenav: true,
            },
          },
          {
            path: "re_integration",
            component: ReferralsComponent,
            canActivate: [AuthGuard, AuthGuardVerificationService],
            data: {
              Sidenav: true,
            },
          },
          {
            path: "family-preservation",
            canActivate: [AuthGuard, AuthGuardVerificationService],
            data: {
              Sidenav: true,
            },
            children: [
              {
                path: "new",
                component: FamilyPreservationComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "detail",
                component: FamilyPreservationComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "assessment/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "case-activity/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "case-team/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "family/view",
                component: TitleMenuComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "head-of-household/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "home-county/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "case-plan-goals/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "sfcs-office/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "non-therapy-face-to-face/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "phase",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              // {
              //     path: 'phase/nonintensive-view',
              //     component: OpecardsListViewComponent,
              //     data: {
              //         Sidenav: true
              //     }
              // },
              {
                path: "progress-notes/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "case-evaluations/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "progress-note-diagnosis/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "referral-events/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              // {
              //     path: 'extended-family/view',
              //     component: OpecardsListViewComponent,
              //     data: {
              //         Sidenav: true
              //     }
              // },
              {
                path: "assessment/new",
                component: AssessmentFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "assessment/detail",
                component: AssessmentFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "case-activity/new",
                component: CaseActivityFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "case-activity/detail",
                component: CaseActivityFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "case-team/new",
                component: CaseTeamComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "case-team/detail",
                component: CaseTeamComponent,
                data: {
                  Sidenav: true,
                },
              },

              {
                path: "fis-members/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "fis-members/new",
                component: FisMembersFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "fis-members/detail",
                component: FisMembersFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },

              {
                path: "fis-members/new",
                component: FisMembersFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "fis-members/detail",
                component: FisMembersFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "head-of-household/new",
                component: HeadOfHouseholdFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "home-county/new",
                component: HomeCountyComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "home-county/detail",
                component: HomeCountyComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "case-plan-goals/new",
                component: CasePlanGoalsFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "case-plan-goals/detail",
                component: CasePlanGoalsFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "sfcs-office/new",
                component: SfcsOfficerComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "sfcs-office/detail",
                component: SfcsOfficerComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "non-therapy-face-to-face/new",
                component: NonTherapyFaceToFaceComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "non-therapy-face-to-face/detail",
                component: NonTherapyFaceToFaceComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "phase/new",
                component: PhaseComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "phase/detail",
                component: PhaseComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "phase-activity/detail",
                component: PhaseActivityComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "phase-activity/new",
                component: PhaseActivityComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "phase-activity/view",
                component: OpecardsListViewComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "progress-notes/new",
                component: ProgressNotesFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "progress-notes/detail",
                component: ProgressNotesFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "case-evaluations/new",
                component: CaseEvaluationsFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "case-evaluations/detail",
                component: CaseEvaluationsFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "progress-note-diagnosis/new",
                component: ProgressNoteDiagnosisFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "progress-note-diagnosis/detail",
                component: ProgressNoteDiagnosisFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "referral-events/new",
                component: ReferralEventsFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "referral-events/detail",
                component: ReferralEventsFpFormComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "progress-report",
                component: ProgressReportComponent,
              },
              // {
              //     path: 'extended-family/new',
              //     component: ExtendedFamilyFpFormComponent,
              //     data: {
              //         Sidenav: true
              //     }
              // },
              // {
              //     path: 'extended-family/detail',
              //     component: ExtendedFamilyFpFormComponent,
              //     data: {
              //         Sidenav: true
              //     },
              // },
              {
                path: "progress/report",
                component: ProgressReportComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "nontherapy/face/to/face",
                component: NonTherapyFaceToFaceLogComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "lack/contact/notification",
                component: LackOfContactNotificationComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "initial/family/assessment",
                component: InitialFamilyAssessmentComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "mental/health/assessment/therapist",
                component: MentalHealthAssessmentByTherapistAndFamilyComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "family/safety/plan",
                component: FamilySafetyPlanComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessment/checklist",
                component: AssessmentChecklistComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "domestic/violence/screening",
                component: DomesticViolenceScreeningComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "epds",
                component: EPDSComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "family/relapse/prevention/non/intensive/plan",
                component: FamilyRelapsePreventionNonIntensiveComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "custody/caseplan/conference",
                component: CustodyCasePlanningConferenceComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "permananency/plan",
                component: Pps3051PermananencyPlanComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "supervisory/staffing",
                component: SupervisoryStaffingComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },

              {
                path: "change/of/status",
                component: ChangeOfStatusFormComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "court/report/correspondence",
                component: CourtReportCorrespondenceComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "financial/assistance/request",
                component: FinancialAssistanceRequestComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "client/face/to/face",
                component: ClientFaceToFaceComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "permanency/plan/checklist",
                component: PermanencyPlanChecklistComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "adminstrative/requirements",
                component: AdministrativeRequirementsComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "service/and/service/code",
                component: ServiceAndServiceCodeComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "visitation/schedule",
                component: VisitationScheduleComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "permanency/plan/review",
                component: PermanencyPlanReviewComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "intro/and/parents/guide",
                component: IntroAndParentsGuideComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "non/custodial/parent/assessment",
                component: NonCustodialParentAssessmentComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "non/custodial/parent/iced/worksheet",
                component: NonCustodialParentIcedWorksheetComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "non/intensive/transition",
                component: NonIntensiveTransitionComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "pps3049A/intro/and/parent/guide",
                component: Pps3049AIntroAndParentsGuideComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "family/service/preservation/plan",
                component: FamilyServicePreservationPlanComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "therapy/discharge",
                component: TherapyDischargeComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "treatment/plan/update",
                component: TreatmentPlanUpdateComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "plan/of/safe/care",
                component: PlanOfSafeCareComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "case/transfer/summary",
                component: CaseTransferSummaryComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "progress/note",
                component: ProgressNoteComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "pps5002",
                component: Pps5002Component,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "missing/child/questionaire",
                component: MissingChildQuestionaireComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "court/report/template",
                component: CourtReportTemplateComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "court-order",
                children: [
                  {
                    path: "view",
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: "new",
                    component: CourtOrderComponent,
                  },
                  {
                    path: "detail",
                    component: CourtOrderComponent,
                  },
                  // {
                  //     path: 'view-attachments',
                  //     component: TitleMenuComponent
                  // },
                  // {
                  //     path: 'attachment/court-appeance',
                  //     component: CourtAppearanceVersioningComponent
                  // }
                ],
              },
              {
                path: "kipp-pmto",
                children: [
                  {
                    path: "view",
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: "new",
                    component: KippPMTOComponent,
                  },
                  {
                    path: "detail",
                    component: KippPMTOComponent,
                  },
                ],
              },
              {
                path: "new/referral/bridge/homes",
                component: NewReferralComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "new/referral/nonContract",
                component: NonContractComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
            ],
          },
          {
            path: "reintegration",
            canActivate: [AuthGuard, AuthGuardVerificationService],
            data: {
              Sidenav: true,
            },
            children: [
              {
                path: "non-therapy-face-to-face/view",
                component: OpecardsListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "assessments/departure/checklist",
                component: DepartureChecklistComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "assessments/caregiver/response/tool",
                component: CaregiverResponseToolComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "achievement/plan",
                component: AchievementPlanComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "assessments/child/family/profile",
                component: ChildAndFamilyProfileComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/decision/making/functional/assessment",
                component: DecisionMakingFunctionalAssessmentComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/initial/placement/screening/tool",
                component: InitialPlacementScreeningToolComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/informal/care/referral",
                component: InformalCareReferralComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/initial/screening/tool",
                component: InitialScreeningToolComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/maternal/paternal",
                component: MaternalPaternalRelativeComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/permanency/plandesk/review",
                component: PermanencyPlanDeskReviewComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/human/trafficking",
                component: HumanTraffickingChildWelfareComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/icwa",
                component: ICWAComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/medical/genetic/info",
                component: MedicalGeneticInfoComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/medically/fragile/scoring/tool",
                component: MedicallyFragileScoringToolComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/rehabilation/service/referral",
                component: RehabilationServiceReferralComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/family/pres/service",
                component: FamilyPresServiceComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/kinship/assessment/service",
                component: KinshipAssessmentServiceComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/sibling/separation/staffing",
                component: SiblingSeparationStaffingComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/social/history",
                component: SocialHistoryComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/social/emotional/screening/tool",
                component: SocialEmotionalScreeningToolComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/mental/health",
                component: MentalHealthComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/suicide/risk/assessment",
                component: SuicideRiskAssessmentComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/worker/child/quality/checklist",
                component: WorkerChildQualityChecklistComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/worker/parent/quality/checklist",
                component: WorkerParentQualityChecklistComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "assessments/xtreme/kinship",
                component: XtremeKinshipRecruitmentComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "caseplangoals/notice/child/custody/caseplan",
                component: NoticeChildCustodyCaseplanComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "caseplangoals/parent/child/interaction",
                component: ParentChildInteractionComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "caseplangoals/kyac",
                component: KYACComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "caseplangoals/permanency/plan",
                component: PermanencyPlanComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "caseplangoals/caseplan/needing/scheduled",
                component: CaseplanNeedingScheduledComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "caseplangoals/visitation/plan",
                component: VisitationPlanComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/addendum/court/report",
                component: AddendumCourtReportComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/dd/contact/sheet",
                component: DdContactSheetComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/points/of/serverance",
                component: PointsOfServeranceComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/court/report/template",
                component: CourtReportComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/dd/report/alleged/father",
                component: DdReportAllegedFatherComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/dd/report/father/unknown",
                component: DdReportFatherUnknownComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/dd/report/father",
                component: DdReportFatherComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/dd/report/maternal/grandparent",
                component: DdReportMaternalGrandparentComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/dd/report/mother",
                component: DdReportMotherComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/dd/report/paternal/grandparent",
                component: DdReportPaternalGrandparentComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/reintegration/plan",
                component: ReintegrationPlanComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/relinquishment/minor/child/agency",
                component: RelinquishmentOfMinorChildAgencyComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/review/hearing/exhibit",
                component: ReviewHearingExhibitComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "courtorder/visitation/court/report",
                component: VisitationCourtReportComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "placements/sfcs/employee/resource",
                component: SfcsEmployeeResourceComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "moveandpermanency/sfcs/employee/resource",
                component: RespiteRequestComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "moveandpermanency/planned/change/placement",
                component: PlannedChangedPlacementNoticeComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "moveandpermanency/permanency/release/change/status",
                component: PermanencyReleaseChangeStatusComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "kinship/visitation/plan",
                component: KinshipVisitationPlanComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "family/safety/plan",
                component: FamilySafetyPlanReintegrationComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "child/move/form",
                component: ChildMoveDisruptionComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "supervisor-staffing/case/transfer/summary",
                component: CaseTransferSummaryReinteComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "new/referral/packet",
                component: NewReferralPacket10Component,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "new/referral/checklist",
                component: NewReferralChecklistComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "icpc/100b/pps9135",
                component: Icpc100bPps9135Component,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "appendix/9h/icpc/checklist",
                component: Appendix9hIcpcChecklistComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "pps/91451/reg",
                component: Pps91451RegComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "moveandpermanency/planned/move/waiver/guide",
                component: NoticeOfPlannedMoveWaiverGuideComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "disability/consultation/referral/form",
                component: DisabilityConsulatationReferralFormComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
            ],
          },
          {
            path: "kinship",
            canActivate: [AuthGuard, AuthGuardVerificationService],
            data: {
              Sidenav: true,
            },
            children: [
              {
                path: "kinship/code/of/ethics",
                component: KinshipCodeOfEthicsComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "confidentiality/policy",
                component: ConfidentialityPolicyComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "discipline/policy",
                component: DisciplinePolicyComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "declaration/of/criminal/offsenses",
                component: DeclarationOfCriminalOffensesComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "email/questionaire",
                component: EmailQuestionaireComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "placement/support/plan",
                component: PlacementSupportPlanComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
            ],
          },
          {
            path: "aftercare",
            canActivate: [AuthGuard, AuthGuardVerificationService],
            data: {
              Sidenav: true,
            },
            children: [
              {
                path: "aftercare/monthly/report",
                component: AfterCareMonthlyReportComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "aftercare/contact/agreement",
                component: AfterCareContactAgreementComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
            ],
          },
          {
            path: "adoption",
            canActivate: [AuthGuard, AuthGuardVerificationService],
            data: {
              Sidenav: true,
            },
            children: [
              {
                path: "request/for/consent/to/adopt",
                component: RequestForConsentToAdoptComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "notice/of/best/interest/staffing",
                component: NoticeBestInterestStaffingComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "request/to/schedule/best/interest/staffing",
                component: RequestToScheduleBestInterestStaffingComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "individual/recruitment/plan",
                component: IndividualRecruitmentPlanComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "adoption/court/report/template",
                component: AdoptionCourtReportTemplateComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "adoption/exchange/child/status/update",
                component: AdoptionExchangeChildStatusUpdateComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "sibling/split/request",
                component: SiblingSplitRequestComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "adoptive/family/assessment",
                component: AdoptiveFamilyAssessmentComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
            ],
          },
          {
            path: "independent-living",
            canActivate: [AuthGuard, AuthGuardVerificationService],
            data: {
              Sidenav: true,
            },
            children: [
              {
                path: "self/sufficiency/matrix",
                component: SelfSufficiencyMatrixComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "self/sufficiency/plan",
                component: SelfSufficiencyPlanComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
              {
                path: "casey/assessment",
                component: CaseyAssessmentComponent,
                canActivate: [AuthGuard, AuthGuardVerificationService],
              },
            ],
          },
          {
            path: "jjfc",
            canActivate: [AuthGuard, AuthGuardVerificationService],
            data: {
              Sidenav: true,
            },
            children: [
              {
                path: "new",
                component: JjfcComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "detail",
                component: JjfcComponent,
                data: {
                  Sidenav: true,
                },
              },
            ],
          },
          {
            path: "nc-ops",
            canActivate: [AuthGuard, AuthGuardVerificationService],
            data: {
              Sidenav: true,
            },
            children: [
              {
                path: "View",
                component: PersonmasterListViewComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "new",
                component: NCOPSComponent,
                data: {
                  Sidenav: true,
                },
              },
              {
                path: "detail",
                component: NCOPSComponent,
                data: {
                  Sidenav: true,
                },
              },
            ],
          },
        ],
      },
      {
        path: "medication-allergies",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
        children: [
          {
            path: "view",
            component: MedicationAllergiesComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "new",
            component: MedicationAllergiesFormComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "details",
            component: MedicationAllergiesFormComponent,
            data: {
              Sidenav: true,
            },
          },
        ],
      },
      {
        path: "medication_allergies",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
        children: [
          {
            path: "view",
            component: MedicationAllergiesComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "new",
            component: MedicationAllergiesFormComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "details",
            component: MedicationAllergiesFormComponent,
            data: {
              Sidenav: true,
            },
          },
        ],
      },
      {
        path: "client_strength",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
        children: [
          {
            path: "view",
            component: ClientStrengthComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "new",
            component: ClientStrengthFormComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "details",
            component: ClientStrengthFormComponent,
            data: {
              Sidenav: true,
            },
          },
        ],
      },
      {
        path: "allergies",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
        children: [
          {
            path: "view",
            component: ClientAllergiesComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "new",
            component: ClientAllergiesFormComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "details",
            component: ClientAllergiesFormComponent,
            data: {
              Sidenav: true,
            },
          },
        ],
      },
      {
        path: "referral_event",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
        children: [
          {
            path: "view",
            component: ClientReferralEventComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "new",
            component: ClientReferralEventFormComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "details",
            component: ClientReferralEventFormComponent,
            data: {
              Sidenav: true,
            },
          },
        ],
      },
      {
        path: "home_county",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
        children: [
          {
            path: "new",
            component: HomeCountyComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "details",
            component: HomeCountyComponent,
            data: {
              Sidenav: true,
            },
          },
        ],
      },

      {
        path: "person/types",
        component: TitleMenuComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
      },

      {
        path: "court/service/officer",
        component: CourtServiceOfficerListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "court/service/officer/new",
        component: CourtServiceOfficerFormComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
      },
      {
        path: "court/service/officer/details",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        children: [
          {
            path: "",
            component: CourtServiceOfficerFormComponent,
          },
          {
            path: "cases",
            component: OpecardsListViewComponent,
          },
        ],
      },

      {
        path: "thirdparty/liability",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
        children: [
          {
            path: "view",
            component: ThirdPartyLiabilityListComponent,
            data: {
              Sidenav: true,
            },
          },

          {
            path: "new",
            component: ThirdPartyLiabilityFormComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "details",
            component: ThirdPartyLiabilityFormComponent,
            data: {
              Sidenav: true,
            },
          },
        ],
      },

      {
        path: "preventative/measurements",
        component: PreventativeMeasurementsListComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
        children: [
          {
            path: "new",
            component: PreventativeMeasureComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "details",
            component: PreventativeMeasureComponent,
            data: {
              Sidenav: true,
            },
          },
        ],
      },
      {
        path: "client/documents/new",
        component: CmsAttachmentFormComponent,
      },
      {
        path: "client/documents/detail",
        component: CmsAttachmentFormComponent,
      },
      {
        path: "client/documents",
        component: OpecardsListViewComponent,
      },
      // {
      //     path: 'client/documents',
      //     component: ClientDocumentsComponent,
      //     canActivate: [AuthGuard, AuthGuardVerificationService],
      //     data: {
      //         Sidenav: true
      //     },
      //     children: [
      //         {
      //             path: 'new',
      //             component: HomeCountyComponent,
      //             data: {
      //                 Sidenav: true
      //             }
      //         },
      //         {
      //             path: 'details',
      //             component: HomeCountyComponent,
      //             data: {
      //                 Sidenav: true
      //             },
      //         }
      //     ]
      // },
      {
        path: "client/incident",
        component: ClientIncidentComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
        children: [
          {
            path: "new",
            component: HomeCountyComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "details",
            component: HomeCountyComponent,
            data: {
              Sidenav: true,
            },
          },
        ],
      },
      {
        path: "client/incident/rm",
        component: ClientIncidentRmComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
        children: [
          {
            path: "new",
            component: HomeCountyComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "details",
            component: HomeCountyComponent,
            data: {
              Sidenav: true,
            },
          },
        ],
      },

      {
        path: "client/case",
        component: ReferralListViewComponent,
        data: {
          Sidenav: true,
        },
      },
      {
        path: "opencards/list",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
        children: [
          {
            path: "",
            component: TitleMenuComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "client/case",
            component: OpecardsListViewComponent,
            data: {
              Sidenav: true,
            },
          },

          {
            path: "client/courtcase-number",
            component: OpecardsListViewComponent,
            data: {
              Sidenav: true,
            },
          },

          {
            path: "client/profile",
            component: OpecardsListViewComponent,
            data: {
              Sidenav: true,
            },
          },

          {
            path: "client/preventative-measures",
            component: OpecardsListViewComponent,
            data: {
              Sidenav: true,
            },
          },

          {
            path: "client/medication",
            component: OpecardsListViewComponent,
            data: {
              Sidenav: true,
            },
          },

          {
            path: "client/strength",
            component: OpecardsListViewComponent,
            data: {
              Sidenav: true,
            },
          },

          {
            path: "client/documents",
            component: OpecardsListViewComponent,
            data: {
              Sidenav: true,
            },
          },

          {
            path: "client/allergies",
            component: OpecardsListViewComponent,
            data: {
              Sidenav: true,
            },
          },

          {
            path: "client/third-party-liabilites",
            component: OpecardsListViewComponent,
            data: {
              Sidenav: true,
            },
          },

          {
            path: "client/critical-significant-unusual-incident",
            children: [
              {
                path: "view",
                component: OpecardsListViewComponent,
              },
              {
                path: "new",
                component: UnusualIncidentComponent,
              },
              {
                path: "detail",
                component: UnusualIncidentComponent,
              },
            ],
            data: {
              Sidenav: true,
            },
          },

          {
            path: "client/critical-significant-unusual-incident-RM",
            children: [
              {
                path: "view",
                component: OpecardsListViewComponent,
              },
              {
                path: "new",
                component: UnusualIncidentComponent,
              },
              {
                path: "detail",
                component: UnusualIncidentComponent,
              },
            ],
            data: {
              Sidenav: true,
            },
          },

          {
            path: "client/customer-care",
            component: OpecardsListViewComponent,
            data: {
              Sidenav: true,
            },
          },
        ],
      },
      {
        path: "client-strength",
        canActivate: [AuthGuard, AuthGuardVerificationService],
        data: {
          Sidenav: true,
        },
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
            data: {
              Sidenav: true,
            },
          },

          {
            path: "new",
            component: ClientStrengthFormComponent,
            data: {
              Sidenav: true,
            },
          },
          {
            path: "details",
            component: ClientStrengthFormComponent,
            data: {
              Sidenav: true,
            },
          },
        ],
      },
      {
        path: "payor",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: PayorComponent,
          },
          {
            path: "detail",
            children: [
              {
                path: "",
                component: PayorComponent,
              },
              {
                path: "cases",
                component: OpecardsListViewComponent,
              },
              {
                path: "placement-authorization",
                component: OpecardsListViewComponent,
              },
            ],
          },
        ],
      },
      {
        path: "provider",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: ProviderComponent,
          },
          {
            path: "detail",
            component: ProviderComponent,
          },
        ],
      },
      {
        path: "payee",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: PayeeComponent,
          },
          {
            path: "detail",
            component: PayeeComponent,
          },
        ],
      },
      {
        path: "payee-location",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: PayeeComponent,
          },
          {
            path: "detail",
            component: PayeeComponent,
          },
        ],
      },
      {
        path: "encounter",
        component: EncounterReportComponent,
      },
      {
        path: "batch-process",
        component: TitleMenuComponent,
      },
      {
        path: "batch-process-form",
        children: [
          {
            path: "FC-Kansas",
            component: BatchProcessingComponent,
          },
          {
            path: "FC-Nebraska",
            component: BatchProcessingComponent,
          },
          {
            path: "FC-Oklahoma",
            component: BatchProcessingComponent,
          },
          {
            path: "FC-Other-Services",
            component: BatchProcessingComponent,
          },
        ],
      },
      {
        path: "batch-status",
        children: [
          {
            path: "kansas",
            component: BatchStatusComponent,
          },
          {
            path: "nebraska",
            component: BatchStatusComponent,
          },
          {
            path: "oklahoma",
            component: BatchStatusComponent,
          },
          {
            path: "other-services",
            component: BatchStatusComponent,
          },
        ],
      },

      {
        path: "provider-sponser",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: ProviderSponserComponent,
          },
          {
            path: "detail",
            component: ProviderSponserComponent,
          },
          {
            path: "cases",
            component: OpecardsListViewComponent,
          },
          {
            path: "sfcs-contract",
            children: [
              {
                path: "view",
                component: OpecardsListViewComponent,
              },
              {
                path: "new",
                component: SfcsContractComponent,
              },
              {
                path: "detail",
                component: SfcsContractComponent,
              },
            ],
          },
          {
            path: "placement-authorization",
            children: [
              {
                path: "view",
                component: OpecardsListViewComponent,
              },
              {
                path: "claim/view",
                component: OpecardsListViewComponent,
              },
              {
                path: "claim/detail",
                component: ProviderSponsorClaimsComponent,
              },

              {
                path: "dashboard",
                component: TitleMenuComponent,
              },
            ],
          },
        ],
      },
      {
        path: "court/case",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: CourtCaseComponent,
          },
          {
            path: "detail",
            component: CourtCaseComponent,
          },
        ],
      },
      {
        path: "education/enrollment",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: EducationEnrollmentComponent,
          },
          {
            path: "detail",
            component: EducationEnrollmentComponent,
          },
        ],
      },
      {
        path: "client-view",
        children: [
          {
            path: "cards",
            component: ClientDashboardComponent,
          },
        ],
      },

      {
        path: "family",
        // component: TitleMenuComponent,
        // data: {
        //     Sidenav: true
        // },
        children: [
          {
            path: "view",
            component: TitleMenuComponent,
          },
        ],
      },

      {
        path: "siblings-in-out-home",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: SiblingsInoutHomeComponent,
          },
          {
            path: "detail",
            component: SiblingsInoutHomeComponent,
          },
        ],
      },
      {
        path: "extended-family",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: ExtendedFamilyFpFormComponent,
          },
          {
            path: "detail",
            component: ExtendedFamilyFpFormComponent,
          },
        ],
      },
      {
        path: "participants-therpy",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: ParticipantsTherpyComponent,
          },
          {
            path: "detail",
            component: ParticipantsTherpyComponent,
          },
        ],
      },
      {
        path: "all",
        children: [
          {
            path: "medication",
            component: OpecardsListViewComponent,
          },
          {
            path: "authorizations",
            component: OpecardsListViewComponent,
          },
          {
            path: "case",
            component: OpecardsListViewComponent,
          },
          {
            path: "client-profile",
            component: OpecardsListViewComponent,
          },
          {
            path: "client-strength",
            component: OpecardsListViewComponent,
          },
          {
            path: "court-case",
            component: OpecardsListViewComponent,
          },
          {
            path: "unusual-incident",
            component: OpecardsListViewComponent,
          },
          {
            path: "unusual-incident-rm-only",
            component: OpecardsListViewComponent,
          },
          {
            path: "preventative-measurements",
            component: OpecardsListViewComponent,
          },
          {
            path: "third-party-liability",
            component: OpecardsListViewComponent,
          },
          {
            path: "documents",
            component: OpecardsListViewComponent,
          },
          {
            path: "customer-care",
            component: OpecardsListViewComponent,
          },
          {
            path: "assessments",
            component: OpecardsListViewComponent,
          },
          {
            path: "case-activity",
            component: OpecardsListViewComponent,
          },
          {
            path: "case-activity",
            component: OpecardsListViewComponent,
          },
          {
            path: "case-evaluations",
            component: OpecardsListViewComponent,
          },
          {
            path: "case-team",
            component: OpecardsListViewComponent,
          },
          {
            path: "court-orders",
            component: OpecardsListViewComponent,
          },
          {
            path: "home-county",
            component: OpecardsListViewComponent,
          },
          {
            path: "intensive-phase",
            component: OpecardsListViewComponent,
          },
          {
            path: "kipp-pmto",
            component: OpecardsListViewComponent,
          },
          {
            path: "non-intensive-phase",
            component: OpecardsListViewComponent,
          },
          {
            path: "ntff",
            component: OpecardsListViewComponent,
          },
          {
            path: "progress-note",
            component: OpecardsListViewComponent,
          },
          {
            path: "progress-note-diagnosis",
            component: OpecardsListViewComponent,
          },
          {
            path: "referral-events",
            component: OpecardsListViewComponent,
          },
          {
            path: "sfcs-office",
            component: OpecardsListViewComponent,
          },
          {
            path: "behavior-assessments",
            component: CISFormsHandlerComponent,
          },
          {
            path: "case-plan-goals",
            component: OpecardsListViewComponent,
          },
          {
            path: "appointments",
            component: OpecardsListViewComponent,
          },
          {
            path: "monthly-reports",
            component: OpecardsListViewComponent,
          },
          {
            path: "supervisory-staffing",
            component: OpecardsListViewComponent,
          },
          {
            path: "supervisory-staffing-form",
            component: OpecardsListViewComponent,
          },
          {
            path: "placements",
            component: OpecardsListViewComponent,
          },
          {
            path: "attending-school",
            component: OpecardsListViewComponent,
          },
          {
            path: "grade-level",
            component: OpecardsListViewComponent,
          },
          {
            path: "home-school",
            component: OpecardsListViewComponent,
          },
          {
            path: "school-release",
            component: OpecardsListViewComponent,
          },
          {
            path: "independent-living",
            component: OpecardsListViewComponent,
          },
          {
            path: "social-securtiy-income",
            component: OpecardsListViewComponent,
          },
          {
            path: "case-file-activity",
            component: OpecardsListViewComponent,
          },
          {
            path: "kipp",
            component: OpecardsListViewComponent,
          },
          {
            path: "placement-referral",
            component: OpecardsListViewComponent,
          },
          {
            path: "authorization-summary",
            component: OpecardsListViewComponent,
          },
          {
            path: "waiver",
            component: OpecardsListViewComponent,
          },

          {
            path: "bh-determination",
            component: OpecardsListViewComponent,
          },
          {
            path: "health-record",
            component: OpecardsListViewComponent,
          },
          {
            path: "immunization",
            component: OpecardsListViewComponent,
          },

          {
            path: "kan-be-healthy",
            component: OpecardsListViewComponent,
          },
          {
            path: "bh-placement-history",
            component: OpecardsListViewComponent,
          },
          {
            path: "credit-tracking",
            component: OpecardsListViewComponent,
          },
          {
            path: "education-enrollment",
            component: OpecardsListViewComponent,
          },

          {
            path: "general-education",
            component: OpecardsListViewComponent,
          },

          {
            path: "special-education",
            component: OpecardsListViewComponent,
          },
          {
            path: "adoption-event",
            component: OpecardsListViewComponent,
          },
          {
            path: "best-interest-staffing",
            component: OpecardsListViewComponent,
          },
          {
            path: "identified-resource",
            component: OpecardsListViewComponent,
          },
          {
            path: "direct-authorization",
            component: OpecardsListViewComponent,
          },
          {
            path: "other-services",
            component: OpecardsListViewComponent,
          },
          {
            path: "hard-goods",
            component: OpecardsListViewComponent,
          },
          {
            path: "extended-family",
            component: OpecardsListViewComponent,
          },
          {
            path: "family-safety",
            component: OpecardsListViewComponent,
          },
          {
            path: "fis-members",
            component: OpecardsListViewComponent,
          },
          {
            path: "sibilings-in-out-home",
            component: OpecardsListViewComponent,
          },
        ],
      },
      {
        path: "supervisory-staffing-form",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: SupervisoryStaffingComponent,
          },
          {
            path: "detail",
            component: SupervisoryStaffingComponent,
          },
        ],
      },
      //
      {
        path: "rfc-supervisory-staffing-form",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: SupervisoryStaffingFormNodeComponent,
          },
          {
            path: "detail",
            component: SupervisoryStaffingFormNodeComponent,
          },
        ],
      },
      //
      {
        path: "supervisory-staffing-for-superviosrs",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: SupervisoryStaffingFormForSupervisorsComponent,
          },
          {
            path: "detail",
            component: SupervisoryStaffingFormForSupervisorsComponent,
          },
        ],
      },
      {
        path: "family-safety",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: FamilySafetyComponent,
          },
          {
            path: "detail",
            component: FamilySafetyComponent,
          },
          {
            path: "family-activity",
            children: [
              {
                path: "view",
                component: OpecardsListViewComponent,
              },
              {
                path: "new",
                component: FamilySafetyActivityComponent,
              },
              {
                path: "detail",
                component: FamilySafetyActivityComponent,
              },
            ],
          },
        ],
      },
      {
        path: "fp-billable-case-activity",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
        ],
      },
      {
        path: "lack-of-contact",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: LackOfContactNotificationComponent,
            // data: {
            //     Sidenav: true
            // }
          },
          {
            path: "detail",
            component: LackOfContactNotificationComponent,
          },
        ],
      },

      {
        path: "attachment-document",
        children: [
          // {
          //     path: 'case-plan-goals',
          //     component: CmsAttachmentFormComponent
          // },
          {
            path: "case-plan-goals/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "case-plan-goals/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "case-plan-goals",
            component: OpecardsListViewComponent,
          },
          // {
          //     path: 'assessment',
          //     component: CmsAttachmentFormComponent
          // },
          {
            path: "assessment/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "assessment/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "assessment",
            component: OpecardsListViewComponent,
          },

          // {
          //     path: 'phase',
          //     component: CmsAttachmentFormComponent
          // },
          {
            path: "phase/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "phase/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "phase",
            component: OpecardsListViewComponent,
          },
          {
            path: "case-activity/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "case-activity/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "case-activity",
            component: OpecardsListViewComponent,
          },

          // {
          //     path: 'court-orders',
          //     component: CmsAttachmentFormComponent
          // },
          {
            path: "court-orders/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "court-orders/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "court-orders",
            component: OpecardsListViewComponent,
          },

          // {
          //     path: 'supervisor-staffing',
          //     component: CmsAttachmentFormComponent
          // },
          {
            path: "supervisor-staffing/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "supervisor-staffing/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "supervisor-staffing",
            component: OpecardsListViewComponent,
          },

          // {
          //     path: 'progress-notes',
          //     component: CmsAttachmentFormComponent
          // },
          {
            path: "progress-notes/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "progress-notes/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "progress-notes",
            component: OpecardsListViewComponent,
          },
          // {
          //     path: 'family-safety',
          //     component: CmsAttachmentFormComponent
          // },
          {
            path: "family-safety/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "family-safety/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "family-safety",
            component: OpecardsListViewComponent,
          },
          // {
          //     path: 'service-hardgoods',
          //     component: CmsAttachmentFormComponent
          // },
          {
            path: "service-hardgoods/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "service-hardgoods/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "service-hardgoods",
            component: OpecardsListViewComponent,
          },
          // {
          //     path: 'referral-events',
          //     component: CmsAttachmentFormComponent
          // },
          {
            path: "referral-events/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "referral-events/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "referral-events",
            component: OpecardsListViewComponent,
          },
          // {
          //     path: 'fp-referral',
          //     component: CmsAttachmentFormComponent
          // },
          {
            path: "fp-referral/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "fp-referral/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "fp-referral",
            component: OpecardsListViewComponent,
          },
          {
            path: "case-team/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "case-team/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "case-team",
            component: OpecardsListViewComponent,
          },
          {
            path: "extended-family/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "extended-family/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "extended-family",
            component: OpecardsListViewComponent,
          },

          {
            path: "home-county/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "home-county/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "home-county",
            component: OpecardsListViewComponent,
          },
          {
            path: "sfcs-office/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "sfcs-office/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "sfcs-office",
            component: OpecardsListViewComponent,
          },
          {
            path: "non-therapy/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "non-therapy/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "non-therapy",
            component: OpecardsListViewComponent,
          },
          {
            path: "case-evaluation/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "case-evaluation/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "case-evaluation",
            component: OpecardsListViewComponent,
          },
          {
            path: "progress-notes-diagnosis/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "progress-notes-diagnosis/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "progress-notes-diagnosis",
            component: OpecardsListViewComponent,
          },

          {
            path: "kipp-pmto/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "kipp-pmto/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "kipp-pmto",
            component: OpecardsListViewComponent,
          },
          {
            path: "nc-ops",
            component: OpecardsListViewComponent,
          },
          {
            path: "nc-ops/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "nc-ops/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "nc-fch",
            component: OpecardsListViewComponent,
          },
          {
            path: "nc-fch/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "nc-fch/detail",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "claims",
            component: OpecardsListViewComponent,
          },
          {
            path: "claims/new",
            component: CmsAttachmentFormComponent,
          },
          {
            path: "claims/detail",
            component: CmsAttachmentFormComponent,
          },

          ///////RFC/////////
          {
            path: "rfc",
            children: [
              // {
              //     path: 'case-plan-goals',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "case-plan-goals/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "case-plan-goals/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "case-plan-goals",
                component: OpecardsListViewComponent,
              },
              // {
              //     path: 'court-orders',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "court-orders/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "court-orders/detail",
                component: CmsAttachmentFormComponent,
              },
              // {
              //     path: 'court-orders',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "court-orders",
                component: OpecardsListViewComponent,
              },

              // {
              //     path: 'assessment',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "assessment/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "assessment/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "assessment",
                component: OpecardsListViewComponent,
              },
              // {
              //     path: 'supervisor-staffing',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "supervisor-staffing/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "supervisor-staffing/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "supervisor-staffing",
                component: OpecardsListViewComponent,
              },
              // {
              //     path: 'independent-living',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "independent-living/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "independent-living/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "independent-living",
                component: OpecardsListViewComponent,
              },
              // {
              //     path: 'independent-living',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "adoption/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "adoption/detail",
                component: CmsAttachmentFormComponent,
              },

              {
                path: "adoption",
                component: OpecardsListViewComponent,
              },
              // {
              //     path: 'adoption',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "adoption-event/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "adoption-event/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "adoption-event",
                component: OpecardsListViewComponent,
              },
              // {
              //     path: 'placement',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "placement/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "placement/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "placement",
                component: OpecardsListViewComponent,
              },
              {
                path: "case-activity",
                component: OpecardsListViewComponent,
              },
              {
                path: "case-activity/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "case-activity/detail",
                component: CmsAttachmentFormComponent,
              },
              // {
              //     path: 'sfcs-office',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "sfcs-office/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "sfcs-office/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "sfcs-office",
                component: OpecardsListViewComponent,
              },
              // {
              //     path: 'permanency',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "permanency/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "permanency/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "permanency",
                component: OpecardsListViewComponent,
              },
              {
                path: "bis/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "bis/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "bis",
                component: OpecardsListViewComponent,
              },
              {
                path: "monthly-reports/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "monthly-reports/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "monthly-reports",
                component: OpecardsListViewComponent,
              },
              {
                path: "referral/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "referral/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "referral",
                component: OpecardsListViewComponent,
              },

              // {
              //     path: 'assessment',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "appointments/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "appointments/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "appointments",
                component: OpecardsListViewComponent,
              },

              {
                path: "case-evaluation/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "case-evaluation/detail",
                component: CmsAttachmentFormComponent,
              },
              // {
              //     path: 'supervisor-staffing',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "case-evaluation",
                component: OpecardsListViewComponent,
              },

              {
                path: "case-file-activity/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "case-file-activity/detail",
                component: CmsAttachmentFormComponent,
              },
              // {
              //     path: 'independent-living',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "case-file-activity",
                component: OpecardsListViewComponent,
              },

              {
                path: "case-team/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "case-team/detail",
                component: CmsAttachmentFormComponent,
              },
              // {
              //     path: 'independent-living',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "case-team",
                component: OpecardsListViewComponent,
              },
              {
                path: "home-county/new",
                component: CmsAttachmentFormComponent,
              },

              {
                path: "home-county/detail",
                component: CmsAttachmentFormComponent,
              },
              // {
              //     path: 'adoption',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "home-county",
                component: OpecardsListViewComponent,
              },
              {
                path: "kipp-pmto/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "kipp-pmto/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "kipp-pmto",
                component: OpecardsListViewComponent,
              },
              {
                path: "waiver/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "waiver/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "waiver",
                component: OpecardsListViewComponent,
              },
              {
                path: "social-security-income/new",
                component: CmsAttachmentFormComponent,
              },
              // {
              //     path: 'sfcs-office',
              //     component: CmsAttachmentFormComponent
              // },
              {
                path: "social-security-income/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "social-security-income",
                component: OpecardsListViewComponent,
              },
              {
                path: "sfcs-office",
                component: OpecardsListViewComponent,
              },
              {
                path: "sibilings-in-out-home/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "sibilings-in-out-home/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "sibilings-in-out-home",
                component: OpecardsListViewComponent,
              },

              {
                path: "bh-determination/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "bh-determination/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "bh-determination",
                component: OpecardsListViewComponent,
              },
              {
                path: "health-record/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "health-record/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "health-record",
                component: OpecardsListViewComponent,
              },
              {
                path: "immunization/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "immunization/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "immunization",
                component: OpecardsListViewComponent,
              },
              {
                path: "kan-be-healthy/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "kan-be-healthy/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "kan-be-healthy",
                component: OpecardsListViewComponent,
              },

              {
                path: "sibilings-in-out-home/new",
                component: CmsAttachmentFormComponent,
              },

              {
                path: "sibilings-in-out-home/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "sibilings-in-out-home",
                component: OpecardsListViewComponent,
              },

              {
                path: "bh-determination/new",
                component: CmsAttachmentFormComponent,
              },

              {
                path: "bh-determination/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "bh-determination",
                component: OpecardsListViewComponent,
              },
              {
                path: "credit-tracking/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "credit-tracking/detail",
                component: CmsAttachmentFormComponent,
              },

              {
                path: "credit-tracking",
                component: OpecardsListViewComponent,
              },

              {
                path: "general-education/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "general-education/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "general-education",
                component: OpecardsListViewComponent,
              },
              {
                path: "special-education/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "special-education/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "special-education",
                component: OpecardsListViewComponent,
              },
              {
                path: "attending-school/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "attending-school/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "attending-school",
                component: OpecardsListViewComponent,
              },
              {
                path: "grade-level/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "grade-level/detail",
                component: CmsAttachmentFormComponent,
              },

              {
                path: "grade-level",
                component: OpecardsListViewComponent,
              },

              {
                path: "school-release/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "school-release/detail",
                component: CmsAttachmentFormComponent,
              },

              {
                path: "school-release",
                component: OpecardsListViewComponent,
              },
              {
                path: "home-school/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "home-school",
                component: OpecardsListViewComponent,
              },

              {
                path: "placement-event",
                component: OpecardsListViewComponent,
              },
              {
                path: "placement-event/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "placement-event/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "placement-plan",
                component: OpecardsListViewComponent,
              },
              {
                path: "placement-plan/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "placement-plan/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "rfc-authorizations/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "rfc-authorizations/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "rfc-authorizations",
                component: OpecardsListViewComponent,
              },
              {
                path: "rfc-claims",
                component: OpecardsListViewComponent,
              },
              {
                path: "rfc-claims/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "rfc-claims/detail",
                component: CmsAttachmentFormComponent,
              },
            ],
          },
          //Client attachment Open Cards
          {
            path: "client",
            children: [
              {
                path: "home-school/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "home-school/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "home-school",
                component: OpecardsListViewComponent,
              },
            ],
          },
          //Client attachment Open Cards
          {
            path: "client",
            children: [
              {
                path: "medication/new",
                component: CmsAttachmentFormComponent,
              },

              {
                path: "medication/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "medication",
                component: OpecardsListViewComponent,
              },
              {
                path: "client-profiles/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "client-profiles/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "client-profiles",
                component: OpecardsListViewComponent,
              },

              {
                path: "court-case/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "court-case/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "court-case",
                component: OpecardsListViewComponent,
              },
              {
                path: "client-strength/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "client-strength/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "client-strength",
                component: OpecardsListViewComponent,
              },
              {
                path: "third-party-liability/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "third-party-liability/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "third-party-liability",
                component: OpecardsListViewComponent,
              },
              {
                path: "preventive-measurements/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "preventive-measurements/detail",
                component: CmsAttachmentFormComponent,
              },

              {
                path: "preventive-measurements",
                component: OpecardsListViewComponent,
              },

              {
                path: "unusual-incident/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "unusual-incident/detail",
                component: CmsAttachmentFormComponent,
              },

              {
                path: "unusual-incident",
                component: OpecardsListViewComponent,
              },
            ],
          },

          // Provider Attachments

          {
            path: "providers",
            children: [
              {
                path: "location/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "location/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "location",
                component: OpecardsListViewComponent,
              },
              {
                path: "pets/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "pets/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "pets",
                component: OpecardsListViewComponent,
              },
              {
                path: "license/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "license/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "license",
                component: OpecardsListViewComponent,
              },
              {
                path: "license-exception/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "license-exception/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "license-exception",
                component: OpecardsListViewComponent,
              },
              {
                path: "sponsor/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "sponsor/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "sponsor",
                component: OpecardsListViewComponent,
              },
              {
                path: "status/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "status/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "status",
                component: OpecardsListViewComponent,
              },
              {
                path: "office/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "office/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "office",
                component: OpecardsListViewComponent,
              },
              {
                path: "sfm-staff/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "sfm-staff/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "sfm-staff",
                component: OpecardsListViewComponent,
              },
              {
                path: "preference/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "preference/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "preference",
                component: OpecardsListViewComponent,
              },
              {
                path: "home-school",
                component: OpecardsListViewComponent,
              },
            ],
          },
          //Client attachment Open Cards
          {
            path: "client",
            children: [
              {
                path: "other-agency-staff/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "other-agency-staff/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "other-agency-staff",
                component: OpecardsListViewComponent,
              },
              {
                path: "client-profiles",
                component: OpecardsListViewComponent,
              },
              {
                path: "school/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "school/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "school",
                component: OpecardsListViewComponent,
              },

              {
                path: "unusual-incident/new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "unusual-incident/detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "unusual-incident",
                component: OpecardsListViewComponent,
              },
              {
                path: "other-agency-staff/new",
                component: CmsAttachmentFormComponent,
              },
            ],
          },

          {
            path: "nc-rfc-attachment",
            children: [
              {
                path: "new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "",
                component: OpecardsListViewComponent,
              },
            ],
          },

          {
            path: "living-arrangement-attachment",
            children: [
              {
                path: "new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "",
                component: OpecardsListViewComponent,
              },
            ],
          },

          {
            path: "placement-auth-attachment",
            children: [
              {
                path: "new",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "detail",
                component: CmsAttachmentFormComponent,
              },
              {
                path: "",
                component: OpecardsListViewComponent,
              },
            ],
          },
        ],
      },
      {
        path: "dashboard",
        children: [
          {
            path: "clinet-opencards",
            component: TitleMenuComponent,
          },
        ],
      },
      {
        path: "service-agreement",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: ServiceAgreementComponent,
          },
          {
            path: "detail",
            component: ServiceAgreementComponent,
          },
        ],
      },
      {
        path: "nc-fch",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: NCFCHComponent,
          },
          {
            path: "detail",
            component: NCFCHComponent,
          },
        ],
      },
      // Test purpose...to be removed
      {
        path: "placement-ack",
        component: AckOptionsComponent,
      },
      {
        path: "placement-agreement",
        component: PlacementAgreementFormComponent,
      },
      {
        path: "placement-event-status",
        component: PlacementEventStatusComponent,
      },
      {
        path: "placement-acknowledgment",
        component: PlacementAcknowledgementComponent,
      },
      {
        path: "placement-acknowledgment-return",
        component: PlacementAcknowledgementComponent,
      },
      {
        path: "placement-psa",
        component: PlacementPsaComponent,
      },

      //
      {
        path: "fax-list",
        component: PlacementFaxListComponent,
      },

      {
        path: "view-history",
        component: ViewHistoryComponent,
      },

      {
        path: "flow-chart",
        component: PlacementFlowChartComponent,
      },

      {
        path: "placement-agreement-kinship-agency-approved",
        component: PlacementAgreementKinshipAPComponent,
      },

      {
        path: "placement-agreement-kinship-non-paid",
        component: PlacementAgreementKinshipNonPaidComponent,
      },

      {
        path: "provider-envelope",
        component: ProviderEnvelopeComponent,
      },

      /**NCRFC Referral program routing path */
      {
        path: "nc-rfc",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: NFCRFCComponent,
          },
          {
            path: "detail",
            component: NFCRFCComponent,
          },
        ],
      },
      {
        path: "view-history",
        component: ViewHistoryComponent,
      },
      {
        path: "move-form-with-disruption",
        component: MoveFormWithDisruptionComponent,
      },
      {
        path: "move-form",
        component: MoveFormComponent,
      },

      {
        path: "placement-referral-draft",
        component: PlacementRefDraftComponent,
      },
      {
        path: "placement-referral-blank",
        component: PlacementRefBlankComponent,
      },
      {
        path: "fax-list",
        component: PlacementFaxListComponent,
      },
      {
        path: "pps-0550",
        component: Pps0550Component,
      },
      {
        path: "placement-plan-blank",
        component: PlacementPlanBlankComponent,
      },
      {
        path: "placement-plan-draft",
        component: PlacementPlanBlankComponent,
      },
      {
        path: "nc-hs",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: NCHSReferralComponent,
          },
          {
            path: "detail",
            component: NCHSReferralComponent,
          },
        ],
      },
      {
        path: "bh-ok",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: BHOKComponent,
          },
          {
            path: "detail",
            component: BHOKComponent,
          },
        ],
      },
      {
        path: "behavioral-assessment",
        component: CISFormsHandlerComponent,
      },
      {
        path: "jjfc",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: JjfcComponent,
          },
          {
            path: "detail",
            component: JjfcComponent,
          },
        ],
      },
      {
        path: "nc-mhr",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: NCMHRComponent,
          },
          {
            path: "detail",
            component: NCMHRComponent,
          },
        ],
      },
      {
        path: "provider-email-module",
        component: ProviderEmailModuleComponent,
      },
      {
        path: "prtf-opencards-medical",
        children: [
          {
            path: "progress-report",
            children: [
              {
                path: "view",
                component: OpecardsListViewComponent,
              },
              {
                path: "new",
                component: ProgressReportsPrtfComponent,
              },
              {
                path: "detail",
                component: ProgressReportsPrtfComponent,
              },
            ],
          },
        ],
      },
      {
        path: "recruitment-training",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: RecruitmentTrainingComponent,
          },
          {
            path: "detail",
            component: RecruitmentTrainingComponent,
          },

          {
            path: "dashboard",
            component: TitleMenuComponent,
          },
        ],
      },

      {
        path: "licensing-recruitment",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: LicensingRecruitmentComponent,
          },
          {
            path: "detail",
            component: LicensingRecruitmentComponent,
          },
        ],
      },
      {
        path: "team-leader",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: StaffTeamLeaderComponent,
          },
          {
            path: "detail",
            component: StaffTeamLeaderComponent,
          },
        ],
      },
      {
        path: "team-member",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: StaffTeamLeaderComponent,
          },
          {
            path: "detail",
            component: StaffTeamLeaderComponent,
          },
        ],
      },
      {
        path: "compliance-tech",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: ComplianceTechComponent,
          },
          {
            path: "detail",
            component: ComplianceTechComponent,
          },
          {
            path: "dashboard",
            component: TitleMenuComponent,
          },
        ],
      },

      {
        path: "assigned-compliance-tech",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: ComplianceTechComponent,
          },
          {
            path: "detail",
            component: ComplianceTechComponent,
          },
        ],
      },
      {
        path: "staff-opencards",
        children: [
          {
            path: "recruitment-provider",
            children: [
              {
                path: "view",
                component: OpecardsListViewComponent,
              },
            ],
          },
          {
            path: "sfm-office",
            children: [
              {
                path: "dashboard",
                component: TitleMenuComponent,
              },
              {
                path: "primary-office",
                children: [
                  {
                    path: "view",
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: "new",
                    component: SfmOfficeComponent,
                  },
                  {
                    path: "detail",
                    component: SfmOfficeComponent,
                  },
                ],
              },

              {
                path: "secondary-office",
                children: [
                  {
                    path: "view",
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: "new",
                    component: SfmOfficeComponent,
                  },
                  {
                    path: "detail",
                    component: SfmOfficeComponent,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "sub-team-member",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          // {
          //   path: 'new',
          //   component: StaffTeamLeaderComponent
          // },
          // {
          //   path: 'detail',
          //   component: StaffTeamLeaderComponent
          // }
        ],
      },
      {
        path: "kansas",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
        ],
      },
      {
        path: "nebraska",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
        ],
      },
      {
        path: "oklahoma",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
        ],
      },
      {
        path: "evaluation-type",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: EvaluationTypeComponent,
          },
          {
            path: "detail",
            component: EvaluationTypeComponent,
          },
        ],
      },
      {
        path: "evaluation-creation",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: EvaluationCreationComponent,
          },
          {
            path: "detail",
            component: EvaluationCreationComponent,
          },
        ],
      },
      {
        path: "version-creation",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: VersionCreationComponent,
          },
          {
            path: "detail",
            component: VersionCreationComponent,
          },
        ],
      },
      {
        path: "evaluation-scale",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: EvaluationScaleComponent,
          },
          {
            path: "detail",
            component: EvaluationScaleComponent,
          },
        ],
      },
      {
        path: "question-creation",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: QuestionCreationComponent,
          },
          {
            path: "detail",
            component: QuestionCreationComponent,
          },
        ],
      },
      {
        path: "question-group-creation",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: QuestionGroupCreationComponent,
          },
          {
            path: "detail",
            component: QuestionGroupCreationComponent,
          },
        ],
      },
      {
        path: "set-evaluation-allowed-group",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: SetEvaluationAllowedGroupsComponent,
          },
          {
            path: "detail",
            component: SetEvaluationAllowedGroupsComponent,
          },
        ],
      },
      {
        path: "sub-rfc",
        children: [
          {
            path: "view",
            component: OpecardsListViewComponent,
          },
          {
            path: "new",
            component: SUBRFCComponent,
          },
          {
            path: "detail",
            component: SUBRFCComponent,
          },
        ],
      },
      {
        path: "client-grade-progression",
        component: ClientGradeProgressionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
