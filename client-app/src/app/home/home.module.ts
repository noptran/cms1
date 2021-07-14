import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgGridModule } from "ag-grid-angular";
import { AngularDateTimePickerModule } from "angular2-datetimepicker";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/angular2-multiselect-dropdown";
import { MyDatePickerModule } from "mydatepicker";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
// import { AccordionModule } from "ngx-accordion";
import { PopoverModule } from "ngx-popover";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { CarouselModule } from "primeng/carousel";
import { CheckboxModule } from "primeng/checkbox";
import { ChipsModule } from "primeng/chips";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { EditorModule } from "primeng/editor";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
// import { PersonmasterListViewComponent } from '../person-master/personmaster-list-view/personmaster-list-view.component';
import { MenuModule } from "primeng/menu";
import { MessageModule } from "primeng/message";
import { PanelModule } from "primeng/panel";
import { RadioButtonModule } from "primeng/radiobutton";
import { SelectButtonModule } from "primeng/selectbutton";
import { SidebarModule } from "primeng/sidebar";
import { SpinnerModule } from "primeng/spinner";
import { SplitButtonModule } from "primeng/splitbutton";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import { SelectionComponent } from "../ag-ui/selection/selection.component";
import { AppNavBarModule } from "../app-navbar/app-nav-bar.module";
import { FileUploadModule } from "primeng/fileupload";

import { AppNavbarComponent } from "../app-navbar/app-navbar.component";
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { BreadcrumbModule } from "../breadcrumb/breadcrumb.module";
import { CaseActivityComponent } from "../case-activity/case-activity.component";
import { CaseTeamListComponent } from "../case-team-list/case-team-list.component";
// import { PagesizeComponent } from '../pagesize/pagesize.component';
// import { CaseTeamComponent } from '../case-team/case-team.component';
import { ClientAllergiesFormComponent } from "../client-allergies-form/client-allergies-form.component";
import { ClientAllergiesComponent } from "../client-allergies/client-allergies.component";
import { ClientDocumentsComponent } from "../client-documents/client-documents.component";
import { ClientIncidentRmComponent } from "../client-incident-rm/client-incident-rm.component";
import { ClientIncidentComponent } from "../client-incident/client-incident.component";
import { ClientProfileFormComponent } from "../client-profile-form/client-profile-form.component";
import { ClientProfileComponent } from "../client-profile/client-profile.component";
import { ClientReferralEventFormComponent } from "../client-referral-event-form/client-referral-event-form.component";
import { ClientReferralEventComponent } from "../client-referral-event/client-referral-event.component";
import { ClientStrengthFormComponent } from "../client-strength-form/client-strength-form.component";
import { ClientStrengthComponent } from "../client-strength/client-strength.component";
import { CourtCaseListComponent } from "../court-case-list/court-case-list.component";
import { CourtCaseComponent } from "../court-case/court-case.component";
// import { CourtOrderComponent } from '../court-order/court-order.component';
import { CourtServiceOfficerFormComponent } from "../court-service-officer-form/court-service-officer-form.component";
import { CourtServiceOfficerListComponent } from "../court-service-officer-list/court-service-officer-list.component";
import { CourtServiceOfficerComponent } from "../court-service-officer/court-service-officer.component";
import { CrbOfficerFormComponent } from "../crb-officer-form/crb-officer-form.component";
import { CrdOfficerComponent } from "../crd-officer/crd-officer.component";
import { CustomerCareFormComponent } from "../customer-care-form/customer-care-form.component";
import { DcfFormComponent } from "../dcf-form/dcf-form.component";
import { DcfListComponent } from "../dcf-list/dcf-list.component";
import { DonationListComponent } from "../donation-master/donation-list/donation-list.component";
import { DonationComponent } from "../donation-master/donation/donation.component";
import { GlobalSearchComponent } from "../donation-master/global-search/global-search.component";
import { FamilMemberFormComponent } from "../famil-member-form/famil-member-form.component";
import { FamilyMemberComponent } from "../family-member/family-member.component";
import { CaseActivityFpFormComponent } from "../family-preservation-list/forms/case-activity-fp-form/case-activity-fp-form.component";
// tslint:disable-next-line:max-line-length
// import { CaseEvaluationsFpFormComponent } from '../family-preservation-list/forms/case-evaluations-fp-form/case-evaluations-fp-form.component';
import { CasePlanGoalsFpFormComponent } from "../family-preservation-list/forms/case-plan-goals-fp-form/case-plan-goals-fp-form.component";
import { CaseTeamFpFormComponent } from "../family-preservation-list/forms/case-team-fp-form/case-team-fp-form.component";
// import { ExtendedFamilyFpFormComponent } from '../family-preservation-list/forms/extended-family-fp-form/extended-family-fp-form.component';
import { FamilyFpFormComponent } from "../family-preservation-list/forms/family-fp-form/family-fp-form.component";
import { FisMembersFpFormComponent } from "../family-preservation-list/forms/fis-members-fp-form/fis-members-fp-form.component";
// tslint:disable-next-line:max-line-length
import { HeadOfHouseholdFpFormComponent } from "../family-preservation-list/forms/head-of-household-fp-form/head-of-household-fp-form.component";
import { HomeCountyFpFormComponent } from "../family-preservation-list/forms/home-county-fp-form/home-county-fp-form.component";
// tslint:disable-next-line:max-line-length
import { NonTherapyFaceToFaceFpFormComponent } from "../family-preservation-list/forms/non-therapy-face-to-face-fp-form/non-therapy-face-to-face-fp-form.component";
import { PhaseFpFormComponent } from "../family-preservation-list/forms/phase-fp-form/phase-fp-form.component";
// tslint:disable-next-line:max-line-length
import { ProgressNoteDiagnosisFpFormComponent } from "../family-preservation-list/forms/progress-note-diagnosis-fp-form/progress-note-diagnosis-fp-form.component";
import { ProgressNotesFpFormComponent } from "../family-preservation-list/forms/progress-notes-fp-form/progress-notes-fp-form.component";
import { ReferralEventsFpFormComponent } from "../family-preservation-list/forms/referral-events-fp-form/referral-events-fp-form.component";
import { SfcsOfficeFpFormComponent } from "../family-preservation-list/forms/sfcs-office-fp-form/sfcs-office-fp-form.component";
import { AdministrativeRequirementsComponent } from "../family-preservation/administrative-requirements/administrative-requirements.component";
import { AssessmentChecklistComponent } from "../family-preservation/assessment-checklist/assessment-checklist.component";
import { CaseTransferSummaryComponent } from "../family-preservation/case-transfer-summary/case-transfer-summary.component";
import { ChangeOfStatusFormComponent } from "../family-preservation/change-of-status-form/change-of-status-form.component";
import { ClientFaceToFaceContactFormComponent } from "../family-preservation/client-face-to-face-contact-form/client-face-to-face-contact-form.component";
import { ClientFaceToFaceComponent } from "../family-preservation/client-face-to-face/client-face-to-face.component";
import { CourtReportCorrespondenceComponent } from "../family-preservation/court-report-correspondence/court-report-correspondence.component";
import { CourtReportTemplateComponent } from "../family-preservation/court-report-template/court-report-template.component";
import { CustodyCasePlanningConferenceComponent } from "../family-preservation/custody-case-planning-conference/custody-case-planning-conference.component";
import { DomesticViolenceScreeningComponent } from "../family-preservation/domestic-violence-screening/domestic-violence-screening.component";
import { EPDSComponent } from "../family-preservation/epds/epds.component";
import { FamilyRelapsePreventionNonIntensiveComponent } from "../family-preservation/family-relapse-prevention-non-intensive/family-relapse-prevention-non-intensive.component";
import { FamilySafetyPlanComponent } from "../family-preservation/family-safety-plan/family-safety-plan.component";
import { FamilyServicePreservationPlanComponent } from "../family-preservation/family-service-preservation-plan/family-service-preservation-plan.component";
import { FinancialAssistanceRequestComponent } from "../family-preservation/financial-assistance-request/financial-assistance-request.component";
import { InitialFamilyAssessmentComponent } from "../family-preservation/initial-family-assessment/initial-family-assessment.component";
import { IntroAndParentsGuideComponent } from "../family-preservation/intro-and-parents-guide/intro-and-parents-guide.component";
import { LackOfContactNotificationComponent } from "../family-preservation/lack-of-contact-notification/lack-of-contact-notification.component";
import { MentalHealthAssessmentByTherapistAndFamilyComponent } from "../family-preservation/mental-health-assessment-by-therapist-and-family/mental-health-assessment-by-therapist-and-family.component";
import { MissingChildQuestionaireComponent } from "../family-preservation/missing-child-questionaire/missing-child-questionaire.component";
import { NonCustodialParentAssessmentComponent } from "../family-preservation/non-custodial-parent-assessment/non-custodial-parent-assessment.component";
import { NonCustodialParentIcedWorksheetComponent } from "../family-preservation/non-custodial-parent-iced-worksheet/non-custodial-parent-iced-worksheet.component";
import { NonIntensiveTransitionComponent } from "../family-preservation/non-intensive-transition/non-intensive-transition.component";
import { NonTherapyFaceToFaceLogComponent } from "../family-preservation/non-therapy-face-to-face-log/non-therapy-face-to-face-log.component";
import { PermanencyPlanChecklistComponent } from "../family-preservation/permanency-plan-checklist/permanency-plan-checklist.component";
import { PermanencyPlanReviewComponent } from "../family-preservation/permanency-plan-review/permanency-plan-review.component";
import { PlanOfSafeCareComponent } from "../family-preservation/plan-of-safe-care/plan-of-safe-care.component";
import { Pps3049AIntroAndParentsGuideComponent } from "../family-preservation/pps3049-a-intro-and-parents-guide/pps3049-a-intro-and-parents-guide.component";
import { Pps3051PermananencyPlanComponent } from "../family-preservation/pps3051-permananency-plan/pps3051-permananency-plan.component";
import { Pps5002Component } from "../family-preservation/pps5002/pps5002.component";
import { ProgressNoteComponent } from "../family-preservation/progress-note/progress-note.component";
import { ProgressReportComponent } from "../family-preservation/progress-report/progress-report.component";
import { ServiceAndServiceCodeComponent } from "../family-preservation/service-and-service-code/service-and-service-code.component";
import { SupervisoryStaffingComponent } from "../family-preservation/supervisory-staffing/supervisory-staffing.component";
import { TherapyDischargeComponent } from "../family-preservation/therapy-discharge/therapy-discharge.component";
import { TreatmentPlanUpdateComponent } from "../family-preservation/treatment-plan-update/treatment-plan-update.component";
import { VisitationScheduleComponent } from "../family-preservation/visitation-schedule/visitation-schedule.component";
import { FilterModule } from "../filter-component/filter.module";
import { FormFooterModule } from "../form-footer/form-footer.module";
import { FormHeaderModule } from "../form-header/form-header.module";
import { FormNavigatorComponent } from "../form-navigator/form-navigator.component";
import { GuardianAdlFromComponent } from "../guardian-adl-from/guardian-adl-from.component";
import { GuardianFormListComponent } from "../guardian-form-list/guardian-form-list.component";
import { HomeCountyListComponent } from "../home-county-list/home-county-list.component";
import { HomeCountyComponent } from "../home-county/home-county.component";
import { ListViewHeaderComponent } from "../list-view-header/list-view-header.component";
import { MedicationAllergiesFormComponent } from "../medication-allergies-form/medication-allergies-form.component";
import { MedicationAllergiesComponent } from "../medication-allergies/medication-allergies.component";
import { CityComponent } from "../metadata-configuration/meta-data/city/city.component";
import { CountyComponent } from "../metadata-configuration/meta-data/county/county.component";
import { CsoOfficeComponent } from "../metadata-configuration/meta-data/cso-office/cso-office.component";
import { DhhsOfficeComponent } from "../metadata-configuration/meta-data/dhhs-office/dhhs-office.component";
import { DhsOfficeComponent } from "../metadata-configuration/meta-data/dhs-office/dhs-office.component";
import { EducationLevelComponent } from "../metadata-configuration/meta-data/education-level/education-level.component";
import { EmploymentStatusComponent } from "../metadata-configuration/meta-data/employment-status/employment-status.component";
import { EthnicCityComponent } from "../metadata-configuration/meta-data/ethnic-city/ethnic-city.component";
import { InsuranceTypeComponent } from "../metadata-configuration/meta-data/insurance-type/insurance-type.component";
import { LanguageComponent } from "../metadata-configuration/meta-data/language/language.component";
import { PrimaryReferralReasonComponent } from "../metadata-configuration/meta-data/primary-referral-reason/primary-referral-reason.component";
import { RaceComponent } from "../metadata-configuration/meta-data/race/race.component";
import { ReligionComponent } from "../metadata-configuration/meta-data/religion/religion.component";
import { SeondaryReferralReasonComponent } from "../metadata-configuration/meta-data/seondary-referral-reason/seondary-referral-reason.component";
import { SfcsworkersComponent } from "../metadata-configuration/meta-data/sfcsworkers/sfcsworkers.component";
import { StateComponent } from "../metadata-configuration/meta-data/state/state.component";
import { TenureComponent } from "../metadata-configuration/meta-data/tenure/tenure.component";
import { TribeComponent } from "../metadata-configuration/meta-data/tribe/tribe.component";
import { ZipComponent } from "../metadata-configuration/meta-data/zip/zip.component";
import { MetadataConfigurationComponent } from "../metadata-configuration/metadata-configuration.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { NavbarModule } from "../navbar/navbar.module";
import { NonTherapyFaceToFaceComponent } from "../non-therapy-face-to-face/non-therapy-face-to-face.component";
import { NontherapyListComponent } from "../nontherapy-list/nontherapy-list.component";
import { OpencardListviewModule } from "../opecards-list-view/opencard-listview.module";
import { OpenCardsComponent } from "../open-cards/open-cards.component";
import { OtherAgencyStaffFormComponent } from "../other-agency-staff-form/other-agency-staff-form.component";
import { OtherAgencyStaffComponent } from "../other-agency-staff/other-agency-staff.component";
import { PageSizeModule } from "../pagesize/page-size.module";
import { CasaOfficerFormComponent } from "../person-master/Casa/casa-officer-form/casa-officer-form.component";
import { CasaofficerComponent } from "../person-master/Casa/casaofficer/casaofficer.component";
import { ClientFormListComponent } from "../person-master/Client/client-form-list/client-form-list.component";
import { ClientFormComponent } from "../person-master/Client/client-form/client-form.component";
import { CommunityMemberFormComponent } from "../person-master/Community-member/community-member-form/community-member-form.component";
import { CommunityMemberComponent } from "../person-master/Community-member/community-member/community-member.component";
// import { FilterComponentComponent } from '../filter-component/filter-component.component';
import { CsoStaffFormComponent } from "../person-master/Cso/cso-staff-form/cso-staff-form.component";
import { CsostaffComponent } from "../person-master/Cso/csostaff/csostaff.component";
import { DhhsFormListComponent } from "../person-master/Dhhs/dhhs-form-list/dhhs-form-list.component";
import { DhhsStaffComponent } from "../person-master/Dhhs/dhhs-staff/dhhs-staff.component";
import { DHSStaffComponent } from "../person-master/Dhs/dhs-staff/dhs-staff.component";
import { DhsFormListComponent } from "../person-master/Dhs/dhs-form-list/dhs-form-list.component";
import { JudgeFormComponent } from "../person-master/Judge/judge-form/judge-form.component";
import { JudgeComponent } from "../person-master/Judge/judge/judge.component";
import { PersonMasterListViewModule } from "../person-master/personmaster-list-view/person-master-list-view.module";
import { PhaseActivityListComponent } from "../phase-activity-list/phase-activity-list.component";
import { PhaseActivityComponent } from "../phase-activity/phase-activity.component";
import { PhaseListComponent } from "../phase-list/phase-list.component";
import { PhaseComponent } from "../phase/phase.component";
import { PreventativeMeasureComponent } from "../preventative-measure/preventative-measure.component";
import { PreventativeMeasurementsListComponent } from "../preventative-measurements-list/preventative-measurements-list.component";
import { PrioritizedReportsComponent } from "../prioritized-reports/prioritized-reports.component";
import { ReferralViewComponent } from "../referral-view/referral-view.component";
import { FamilyPreservationComponent } from "../referrals/family-preservation/family-preservation.component";
import { JjfcComponent } from "../referrals/jjfc/jjfc.component";
import { ReferralListViewComponent } from "../referrals/referral-list-view/referral-list-view.component";
import { ReferralsComponent } from "../referrals/referrals.component";
// import { AchievementPlanComponent } from '../reintegration-forms/achievement-plan/achievement-plan.component';
// import { CaregiverResponseToolComponent } from '../reintegration-forms/caregiver-response-tool/caregiver-response-tool.component';
// import { DepartureChecklistComponent } from '../reintegration-forms/departure-checklist/departure-checklist.component';
import { RolesComponent } from "../roles/roles.component";
// import { DndListModule } from 'ngx-drag-and-drop-lists';
// import { NgxUploaderModule } from 'ngx-uploader';
import { SfcsOfficerListComponent } from "../sfcs-officer-list/sfcs-officer-list.component";
import { SfcsOfficerComponent } from "../sfcs-officer/sfcs-officer.component";
import { StaffFormListComponent } from "../staff-form-list/staff-form-list.component";
import { StaffFormComponent } from "../staff-form/staff-form.component";
import { TeamDetailsFormComponent } from "../team-details-form/team-details-form.component";
import { TeamFormComponent } from "../team-form/team-form.component";
// import { AssessmentFpComponent } from '../family-preservation-list/assessment-fp/assessment-fp.component';
import { ThirdPartyLiabilityFormComponent } from "../third-party-liability-form/third-party-liability-form.component";
import { ThirdPartyLiabilityListComponent } from "../third-party-liability-list/third-party-liability-list.component";
import { TitleMenuComponent } from "../title-menu/title-menu.component";
import { UserFormComponent } from "../user-form/user-form.component";
import { UserRoleComponent } from "../user-role/user-role.component";
import { WorkerChildListComponent } from "../worker-child-list/worker-child-list.component";
import { WorkerChildVisitActivityNoteComponent } from "../worker-child-visit-activity-note/worker-child-visit-activity-note.component";
import { WorkerChildComponent } from "../worker-child/worker-child.component";
import { WorkerParentVisitActivityComponent } from "../worker-parent-visit-activity/worker-parent-visit-activity.component";
import { ParentChildVisitaionComponent } from "../parent-child-visitaion/parent-child-visitaion.component";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { CaseActivityReintComponent } from "../cis-forms/reintegration/case-activity-reint/case-activity-reint.component";
import { FosterCareComponent } from "../cis-forms/reintegration/foster-care/foster-care.component";

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

import { PayorComponent } from "../payor/payor.component";
import { PayeeComponent } from "../payee/payee.component";
import { EncounterReportComponent } from "../encounter-report/encounter-report.component";
import { BatchProcessingComponent } from "../batch-processing/batch-processing.component";
import { KippPMTOComponent } from "../kipp-pmto/kipp-pmto.component";
import { UnusualIncidentComponent } from "../unusual-incident/unusual-incident.component";
import { ProviderSponserComponent } from "../provider-sponser/provider-sponser.component";

import { EducationEnrollmentComponent } from "../education-enrollment/education-enrollment.component";
import { BatchStatusComponent } from "../batch-processing/batch-status/batch-status.component";
import { ClientDashboardComponent } from "../client-dashboard/client-dashboard.component";
// import { SiblingsInoutHomeComponent } from '../siblings-inout-home/siblings-inout-home.component';
import { SupervisoryStaffingFormNodeComponent } from "../supervisory-staffing-form-node/supervisory-staffing-form-node.component";
import { SupervisoryStaffingFormForSupervisorsComponent } from "../supervisory-staffing-form-for-supervisors/supervisory-staffing-form-for-supervisors.component";
import { FamilySafetyComponent } from "../family-safety/family-safety.component";
import { FamilySafetyActivityComponent } from "../family-safety-activity/family-safety-activity.component";
import { CmsAttachmentFormComponent } from "../cms-attachment-form/cms-attachment-form.component";
import { AckOptionsComponent } from "../ack-options/ack-options.component";
import { MailFooterComponent } from "../mail-footer/mail-footer.component";
import { AckPdfComponent } from "../ack-pdf/ack-pdf.component";
import { QuickMenuModule } from "../quick-menu/quick-menu.module";
import { NewReferralComponent } from "../new-referral/new-referral.component";
import { NonContractComponent } from "../non-contract/non-contract.component";
import { FamilyPreservationProgressNoteComponent } from "../family-preservation-progress-note/family-preservation-progress-note.component";
import { FamilyPrevNonTherpyFaceToFaceContactComponent } from "../family-prev-non-therpy-face-to-face-contact/family-prev-non-therpy-face-to-face-contact.component";
import { AccessRightsComponentsComponent } from "../access-rights-components/access-rights-components.component";
import { AdminSettingComponentsComponent } from "../admin-setting-components/admin-setting-components.component";
import { AddCustomFieldComponentsComponent } from "../add-custom-field-components/add-custom-field-components.component";
import { ReintegFostCarePRTFscreenInfoComponent } from "../reinteg-fost-care-prtfscreen-info/reinteg-fost-care-prtfscreen-info.component";
import { NonTherpyFaceToFaceContactComponent } from "../non-therpy-face-to-face-contact/non-therpy-face-to-face-contact.component";
import { CaseActivityLogComponent } from "../case-activity-log/case-activity-log.component";
import { ReintegretionFosterCareAdoptionComponent } from "../reintegretion-foster-care-adoption/reintegretion-foster-care-adoption.component";
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
import { KansasFormUnusualIncidentComponent } from "../kansas-form-unusual-incident/kansas-form-unusual-incident.component";
import { NCOPSComponent } from "../referrals/NC-OPS/nc-ops.component";
import { ServiceAgreementComponent } from "../service-agreement/service-agreement.component";
import { NCFCHComponent } from "../referrals/NC-FCH/nc-fch.component";
import { PlacementEventStatusComponent } from "../placement-forms/placement-event-status/placement-event-status.component";
import { ParticipantsTherpyComponent } from "../family-preservation-list/forms/participants-therpy/participants-therpy.component";
import { AckModule } from "../ack-options/ack-options.module";
import { NFCRFCComponent } from "../referrals/NC-RFC/nc-rfc.component";
import { ViewHistoryComponent } from "../placement-forms/view-history/view-history.component";
import { MoveFormWithDisruptionComponent } from "../move-print-forms/move-form-with-disruption/move-form-with-disruption.component";
import { MoveFormComponent } from "../move-print-forms/move-form/move-form.component";
import { PlacementRefDraftComponent } from "../placement-referral-forms/placement-ref-draft/placement-ref-draft.component";
import { PlacementRefBlankComponent } from "../placement-referral-forms/placement-ref-blank/placement-ref-blank.component";
import { PlacementFaxListComponent } from "../placement-forms/placement-fax-list/placement-fax-list.component";

import { ProviderEnvelopeComponent } from "../placement-forms/provider-envelope/provider-envelope.component";
import { PlacementAgreementKinshipNonPaidComponent } from "../placement-forms/placement-agreement-kinship-non-paid/placement-agreement-kinship-non-paid.component";
import { PlacementAgreementKinshipAPComponent } from "../placement-forms/placement-agreement-kinship-ap/placement-agreement-kinship-ap.component";
import { PlacementFlowChartComponent } from "../placement-forms/placement-flow-chart/placement-flow-chart.component";
import { Pps0550Component } from "../print-forms/pps0550/pps0550.component";
import { ClientGradeSubmissionComponent } from "../client-grade-submission/client-grade-submission.component";
import { ModifyFactsComponent } from "../modify-facts/modify-facts.component";
import { PlacementPlanBlankComponent } from "../print-forms/placement-plan-blank/placement-plan-blank.component";
import { SfcsContractComponent } from "../provider-sponser/sfcs-contract/sfcs-contract/sfcs-contract.component";

import { DhsOfficePersontypeComponent } from "../dhs-office-persontype/dhs-office-persontype.component";
// Person Cards
import { SchoolModule } from "../person-master/school/modules/school/school.module";

import { PPS0550Module } from "../print-layout/pps0550/pps0550.module";
// import { PPS0550UpdatedComponent } from '../print-layout/pps0550/pps0550.component';
import { UserRightFormComponent } from "../user-right-form/user-right-form.component";
import { ProviderSponsorClaimsComponent } from "../provider-sponser/provider-sponsor-claims/provider-sponsor-claims.component";
import { MenuPermissionComponent } from "../menu-permission/menu-permission.component";
import { AccordionModule } from "primeng/accordion";
import { NCHSReferralComponent } from "../referrals/NC-HS/nc-hs.component";
import { BHOKComponent } from "../referrals/BH-OK/BH-OK.component";
import { CustomerCareListComponent } from "../customer-care-list/customer-care-list.component";

import { DHSCountiesComponent } from "../person-master/Dhs/counties/counties.component";
// import { PPS0550UpdatedComponent } from '../print-layout/pps0550/pps0550.component';

import { PickListModule } from "primeng/picklist";
import { CISFormsHandlerComponent } from "../wizards/cis-forms-handler/cis-forms.handler.component";
import { ActionListzViewComponent } from "../wizards/action-list-view/action-list-view.component";
import { ListViewActionItemsComponent } from "../wizards/list-view-actions/list-view-actions.component";
import { SlideMenuModule } from "primeng/slidemenu";
import { CustomerCareComponent } from "../person-master/customer-care/customer-care.component";
import { KeysPipe } from "../wizards/action-list-view/keys.pipe";
import { NCMHRComponent } from "../referrals/NC-MHR/NC-MHR.component";
import { CMSSharedModule } from "../Shared/shared.module";
import { ApprovedClaimsComponent } from "../approved-claims/approved-claims.component";
import { AuthorizationClaimComponent } from "../authorization-claim/authorization-claim.component";
import { NewProviderComponent } from "../move-and-permanency/new-provider/new-provider.component";
import { AddOtherServiceBatchAccountPayableComponent } from "../add-other-service-batch-account-payable/add-other-service-batch-account-payable.component";
import { OtherServicePayBatchStatusComponent } from "../other-service-pay-batch-status/other-service-pay-batch-status.component";
import { AuthClaimInfoComponent } from "../auth-claim-info/auth-claim-info.component";
import { DateFormatPipe } from "../Shared/Cores/pipes/date-formate.pipe";
import { ProviderEmailModuleComponent } from "../provider-email-module/provider-email-module.component";
// import { MedicalAssessmentFormComponent } from '../medical-assessment-form/medical-assessment-form.component';
// import { MedTreatmentServiceComponent } from '../med-treatment-service/med-treatment-service.component';
// import { MedicalConditionComponent } from '../medical-condition/medical-condition.component';

// import { HealthExamPrtfComponent } from '../prtf-referral/health-exam-prtf/health-exam-prtf.component';
// import { ProgressReportsPrtfComponent } from '../prtf-referral/progress-reports-prtf/progress-reports-prtf.component';
// import { MedicationAllergiesPrtfComponent } from '../prtf-referral/medication-allergies-prtf/medication-allergies-prtf.component';
import { RecruitmentTrainingComponent } from "../recruitment-training/recruitment-training.component";
import { LicensingRecruitmentComponent } from "../licensing-recruitment/licensing-recruitment.component";
// import { StaffOpencardsModule } from '../staff-opencards/staff-opencards.module';
// import { StaffTeamLeaderComponent } from '../staff-opencards/staff-team-leader/staff-team-leader.component';
// import { ComplianceTechComponent } from '../staff-opencards/compliance-tech/compliance-tech.component';
import { CMSStaffModule } from "../staff-form/staff.module";
import { CsClientProfileComponent } from "../cs-client-profile/cs-client-profile.component";
import { CsClientAuthorizationFormViewComponent } from "../cs-client-authorization-form-view/cs-client-authorization-form-view.component";
import { PlacementModule } from "../placement/placement.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { TransBtTeamLeadMemberComponent } from "../trans-bt-team-lead-member/trans-bt-team-lead-member.component";
//import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { SfmOfficeComponent } from '../staff-opencards/sfm-office/sfm-office.component';
// import { StaffFamilyChangeComponent } from '../Shared/Components/Family change/family-change.component';
import { TransferCaseManagerCompTechComponent } from "../transfer-case-manager-comp-tech/transfer-case-manager-comp-tech.component";
// import { SchoolListComponent } from '../person-master/school/school-list/school-list.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { EvaluationTypeComponent } from "../evaluation-type/evaluation-type.component";
import { EvaluationCreationComponent } from "../evaluation-creation/evaluation-creation.component";
import { VersionCreationComponent } from "../version-creation/version-creation.component";
import { EvaluationScaleComponent } from "../evaluation-scale/evaluation-scale.component";
import { QuestionCreationComponent } from "../question-creation/question-creation.component";
import { QuestionGroupCreationComponent } from "../question-group-creation/question-group-creation.component";
import { SetEvaluationAllowedGroupsComponent } from "../set-evaluation-allowed-group/set-evaluation-allowed-group.component";
import { DataMigrationComponent } from "../data-migration/data-migration.component";
import { SUBRFCComponent } from "../referrals/sub-rfc/sub-rfc.component";

import { ProviderMemberComponent } from "../person-master/Provider-member/provider-member/provider-member.component";
// import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { PersonTypesProfileInfoModule } from "../components/person-types-profile-info-module/person-types-profile-info.module";
import { AutosizeModule } from "ngx-autosize";
import { SchoolIEPformComponent } from "../school-iepform/school-iepform.component";
import { ClientGradeProgressionComponent } from "../client-grade-progression/client-grade-progression.component";

@NgModule({
  declarations: [
    PrioritizedReportsComponent,
    TeamFormComponent,
    UserFormComponent,
    ClientFormComponent,
    RolesComponent,
    UserRoleComponent,
    TeamDetailsFormComponent,
    DonationComponent,
    DonationListComponent,
    GlobalSearchComponent,
    ReferralsComponent,
    DHSStaffComponent,
    DhhsStaffComponent,
    CsostaffComponent,
    CasaofficerComponent,
    JudgeComponent,
    CommunityMemberComponent,
    OtherAgencyStaffComponent,
    CrdOfficerComponent,
    MetadataConfigurationComponent,
    RaceComponent,
    EthnicCityComponent,
    TribeComponent,
    InsuranceTypeComponent,
    StateComponent,
    CityComponent,
    CountyComponent,
    ZipComponent,
    DhhsOfficeComponent,
    CsoOfficeComponent,
    DhsOfficeComponent,
    TenureComponent,
    ReligionComponent,
    LanguageComponent,
    EducationLevelComponent,
    EmploymentStatusComponent,
    ReferralViewComponent,
    FamilyMemberComponent,
    FamilyPreservationComponent,
    PrimaryReferralReasonComponent,
    SeondaryReferralReasonComponent,
    SfcsworkersComponent,
    // CaseTeamComponent,
    CaseTeamListComponent,
    HomeCountyComponent,
    HomeCountyListComponent,
    SfcsOfficerComponent,
    SfcsOfficerListComponent,
    PhaseComponent,
    PhaseActivityComponent,
    NonTherapyFaceToFaceComponent,
    PhaseListComponent,
    PhaseActivityListComponent,
    NontherapyListComponent,
    CourtCaseComponent,
    FormNavigatorComponent,
    OpenCardsComponent,
    ClientProfileComponent,
    CourtCaseListComponent,
    ClientProfileFormComponent,
    MedicationAllergiesComponent,
    ClientProfileFormComponent,
    WorkerChildComponent,
    WorkerChildListComponent,
    MedicationAllergiesFormComponent,
    CaseActivityComponent,
    ClientStrengthComponent,
    ClientStrengthFormComponent,
    ClientAllergiesComponent,
    ClientAllergiesFormComponent,
    ClientReferralEventComponent,
    ClientReferralEventFormComponent,
    ClientFormListComponent,
    StaffFormListComponent,
    DhsFormListComponent,
    DhhsFormListComponent,
    GuardianFormListComponent,
    CustomerCareFormComponent,
    JjfcComponent,
    ListViewHeaderComponent,
    CourtServiceOfficerComponent,
    CsoStaffFormComponent,
    CasaOfficerFormComponent,
    JudgeFormComponent,
    GuardianAdlFromComponent,
    CustomerCareFormComponent,
    FamilMemberFormComponent,
    CommunityMemberFormComponent,
    OtherAgencyStaffFormComponent,
    CrbOfficerFormComponent,
    DcfFormComponent,
    DcfListComponent,
    // PersonmasterListViewComponent,
    CourtServiceOfficerFormComponent,
    CourtServiceOfficerListComponent,
    ThirdPartyLiabilityListComponent,
    PreventativeMeasurementsListComponent,
    ClientDocumentsComponent,
    ClientIncidentComponent,
    ClientIncidentRmComponent,
    SelectionComponent,
    ReferralListViewComponent,
    ThirdPartyLiabilityFormComponent,
    PreventativeMeasureComponent,

    CaseActivityFpFormComponent,
    CasePlanGoalsFpFormComponent,
    CaseTeamFpFormComponent,
    FamilyFpFormComponent,
    FisMembersFpFormComponent,
    HeadOfHouseholdFpFormComponent,
    HomeCountyFpFormComponent,
    NonTherapyFaceToFaceFpFormComponent,
    PhaseFpFormComponent,
    SfcsOfficeFpFormComponent,
    ProgressNotesFpFormComponent,
    // CaseEvaluationsFpFormComponent,
    ProgressNoteDiagnosisFpFormComponent,
    ReferralEventsFpFormComponent,
    ProgressReportComponent,
    // ExtendedFamilyFpFormComponent,
    SelectionComponent,
    ProgressReportComponent,
    NonTherapyFaceToFaceLogComponent,
    LackOfContactNotificationComponent,
    ClientFaceToFaceContactFormComponent,
    InitialFamilyAssessmentComponent,
    MentalHealthAssessmentByTherapistAndFamilyComponent,
    FamilySafetyPlanComponent,
    AssessmentChecklistComponent,
    DomesticViolenceScreeningComponent,
    EPDSComponent,
    FamilyRelapsePreventionNonIntensiveComponent,
    CustodyCasePlanningConferenceComponent,
    Pps3051PermananencyPlanComponent,
    SupervisoryStaffingComponent,
    ChangeOfStatusFormComponent,
    CourtReportCorrespondenceComponent,
    FinancialAssistanceRequestComponent,
    ClientFaceToFaceComponent,
    PermanencyPlanChecklistComponent,
    AdministrativeRequirementsComponent,
    ServiceAndServiceCodeComponent,
    VisitationScheduleComponent,
    PermanencyPlanReviewComponent,
    IntroAndParentsGuideComponent,
    NonCustodialParentAssessmentComponent,
    NonCustodialParentIcedWorksheetComponent,
    NonIntensiveTransitionComponent,
    Pps3049AIntroAndParentsGuideComponent,
    FamilyServicePreservationPlanComponent,
    TherapyDischargeComponent,
    TreatmentPlanUpdateComponent,
    PlanOfSafeCareComponent,
    CaseTransferSummaryComponent,
    ProgressNoteComponent,
    Pps5002Component,
    MissingChildQuestionaireComponent,
    CourtReportTemplateComponent,
    CaregiverResponseToolComponent,
    AchievementPlanComponent,
    HomeComponent,
    DepartureChecklistComponent,
    // CourtOrderComponent,
    WorkerChildVisitActivityNoteComponent,
    WorkerParentVisitActivityComponent,
    ParentChildVisitaionComponent,
    TitleMenuComponent,
    //////////////
    ChildAndFamilyProfileComponent,
    DecisionMakingFunctionalAssessmentComponent,
    InitialPlacementScreeningToolComponent,
    InformalCareReferralComponent,
    InitialScreeningToolComponent,
    MaternalPaternalRelativeComponent,
    PermanencyPlanDeskReviewComponent,
    HumanTraffickingChildWelfareComponent,
    ICWAComponent,
    MedicalGeneticInfoComponent,
    MedicallyFragileScoringToolComponent,
    RehabilationServiceReferralComponent,
    FamilyPresServiceComponent,
    KinshipAssessmentServiceComponent,
    SiblingSeparationStaffingComponent,
    SocialHistoryComponent,
    SocialEmotionalScreeningToolComponent,
    MentalHealthComponent,
    SuicideRiskAssessmentComponent,
    WorkerChildQualityChecklistComponent,
    WorkerParentQualityChecklistComponent,
    XtremeKinshipRecruitmentComponent,
    NoticeChildCustodyCaseplanComponent,
    ParentChildInteractionComponent,
    KYACComponent,
    PermanencyPlanComponent,
    CaseplanNeedingScheduledComponent,
    VisitationPlanComponent,
    AddendumCourtReportComponent,
    DdContactSheetComponent,
    PointsOfServeranceComponent,
    CourtReportComponent,
    DdReportAllegedFatherComponent,
    DdReportFatherUnknownComponent,
    DdReportFatherComponent,
    DdReportMaternalGrandparentComponent,
    DdReportMotherComponent,
    DdReportPaternalGrandparentComponent,
    ReintegrationPlanComponent,
    RelinquishmentOfMinorChildAgencyComponent,
    ReviewHearingExhibitComponent,
    VisitationCourtReportComponent,
    SfcsEmployeeResourceComponent,
    RespiteRequestComponent,
    PlannedChangedPlacementNoticeComponent,
    PermanencyReleaseChangeStatusComponent,
    KinshipVisitationPlanComponent,
    FamilySafetyPlanReintegrationComponent,
    ChildMoveDisruptionComponent,
    CaseTransferSummaryReinteComponent,
    KinshipCodeOfEthicsComponent,
    AfterCareMonthlyReportComponent,
    RequestForConsentToAdoptComponent,
    SelfSufficiencyMatrixComponent,
    ConfidentialityPolicyComponent,
    NoticeBestInterestStaffingComponent,
    AfterCareContactAgreementComponent,
    SelfSufficiencyPlanComponent,
    DisciplinePolicyComponent,
    DeclarationOfCriminalOffensesComponent,
    RequestToScheduleBestInterestStaffingComponent,
    CaseyAssessmentComponent,
    IndividualRecruitmentPlanComponent,
    EmailQuestionaireComponent,
    AdoptionCourtReportTemplateComponent,
    AdoptionExchangeChildStatusUpdateComponent,
    PlacementSupportPlanComponent,
    PayorComponent,
    PayeeComponent,
    SiblingSplitRequestComponent,
    AdoptiveFamilyAssessmentComponent,
    NewReferralPacket10Component,
    NewReferralChecklistComponent,
    Icpc100bPps9135Component,
    Appendix9hIcpcChecklistComponent,
    Pps91451RegComponent,
    NoticeOfPlannedMoveWaiverGuideComponent,
    DisabilityConsulatationReferralFormComponent,
    EncounterReportComponent,
    BatchProcessingComponent,
    KippPMTOComponent,
    UnusualIncidentComponent,
    ProviderSponserComponent,
    EducationEnrollmentComponent,
    BatchStatusComponent,
    ClientDashboardComponent,
    // SiblingsInoutHomeComponent,
    SupervisoryStaffingFormNodeComponent,
    CaseActivityReintComponent,
    SupervisoryStaffingFormForSupervisorsComponent,
    FamilySafetyComponent,
    FamilySafetyActivityComponent,
    FosterCareComponent,
    CmsAttachmentFormComponent,
    MailFooterComponent,
    AckPdfComponent,
    NewReferralComponent,
    NonContractComponent,
    FamilyPreservationProgressNoteComponent,
    FamilyPrevNonTherpyFaceToFaceContactComponent,
    AccessRightsComponentsComponent,
    AdminSettingComponentsComponent,
    AddCustomFieldComponentsComponent,
    ReintegFostCarePRTFscreenInfoComponent,
    NonTherpyFaceToFaceContactComponent,
    CaseActivityLogComponent,
    ReintegretionFosterCareAdoptionComponent,
    AdoptionAfterCareSummaryComponent,
    SocialHistoryForChildrenComponent,
    ReportsComponent,
    AdoptiveFamilyBudgetComponent,
    FinanceReportsComponent,
    ReportPrimaryFilterComponent,
    ReferralForAdoptionAssistanceComponent,
    UserManuelComponent,
    UserManuelDetailComponent,
    TransBTcaseTeamClientComponent,
    TransBtTeamLeadMemberComponent,
    SsnActivityLogComponent,
    KansasFormUnusualIncidentComponent,
    NCOPSComponent,
    ServiceAgreementComponent,
    NCFCHComponent,
    PlacementEventStatusComponent,
    ParticipantsTherpyComponent,
    NFCRFCComponent,
    ProviderEnvelopeComponent,
    PlacementFlowChartComponent,
    ViewHistoryComponent,
    MoveFormWithDisruptionComponent,
    MoveFormComponent,
    PlacementRefBlankComponent,
    PlacementRefDraftComponent,
    PlacementFaxListComponent,
    Pps0550Component,
    ClientGradeSubmissionComponent,
    PlacementPlanBlankComponent,
    ModifyFactsComponent,
    PlacementPlanBlankComponent,
    UserRightFormComponent,
    SfcsContractComponent,
    DhsOfficePersontypeComponent,
    // SchoolListComponent,
    ProviderSponsorClaimsComponent,
    MenuPermissionComponent,
    DHSCountiesComponent,
    NCHSReferralComponent,
    BHOKComponent,
    CustomerCareListComponent,
    CISFormsHandlerComponent,
    ActionListzViewComponent,
    ListViewActionItemsComponent,
    CustomerCareComponent,
    KeysPipe,
    NCMHRComponent,
    ApprovedClaimsComponent,
    AuthorizationClaimComponent,
    NewProviderComponent,
    AddOtherServiceBatchAccountPayableComponent,
    OtherServicePayBatchStatusComponent,
    AuthClaimInfoComponent,
    DateFormatPipe,
    ProviderEmailModuleComponent,
    RecruitmentTrainingComponent,
    LicensingRecruitmentComponent,
    CsClientProfileComponent,
    CsClientAuthorizationFormViewComponent,
    TransferCaseManagerCompTechComponent,
    EvaluationTypeComponent,
    EvaluationCreationComponent,
    VersionCreationComponent,
    EvaluationScaleComponent,
    QuestionCreationComponent,
    QuestionGroupCreationComponent,
    SetEvaluationAllowedGroupsComponent,
    DataMigrationComponent,
    SUBRFCComponent,
    ProviderMemberComponent,
    SchoolIEPformComponent,
    ClientGradeProgressionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MyDatePickerModule,
    AccordionModule,
    PopoverModule,
    NgbModule,
    AngularMultiSelectModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    // NgxUploaderModule,
    // DndListModule,
    AgGridModule.withComponents([]),
    InputSwitchModule,
    CalendarModule,
    DropdownModule,
    EditorModule,
    CarouselModule,
    SpinnerModule,
    DataViewModule,
    PanelModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SelectButtonModule,
    CheckboxModule,
    SidebarModule,
    InputMaskModule,
    AngularDateTimePickerModule,
    TabViewModule,
    TableModule,
    DialogModule,
    AutoCompleteModule,
    SplitButtonModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    MessageModule,
    TooltipModule,
    MenuModule,
    ToastModule,
    ChipsModule,
    AppNavBarModule,
    FormHeaderModule,
    FormFooterModule,
    BreadcrumbModule,
    NavbarModule,
    OpencardListviewModule,
    PersonMasterListViewModule,
    FilterModule,
    PageSizeModule,
    QuickMenuModule,
    FileUploadModule,
    AckModule,
    SchoolModule,
    PPS0550Module,
    PickListModule,
    SlideMenuModule,
    CMSSharedModule,
    CMSStaffModule,
    // StaffOpencardsModule,
    PlacementModule,
    InfiniteScrollModule,
    DragDropModule,
    AutosizeModule,
    PersonTypesProfileInfoModule,
  ],
  exports: [
    PageSizeModule,
    BreadcrumbComponent,
    FormNavigatorComponent,
    OpenCardsComponent,
    ListViewHeaderComponent,
    HomeComponent,
    NavbarComponent,
    AppNavbarComponent,
    NewProviderComponent,
    DcfFormComponent,
    FamilMemberFormComponent,
    CMSStaffModule,
    TitleMenuComponent,
  ],
  providers: [AppNavbarComponent],
  entryComponents: [SelectionComponent],
})
export class HomeModule {}
