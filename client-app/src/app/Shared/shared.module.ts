import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from "./Services/shared-client.service";
import { SharedClientComponent } from "./Components/Client/shared-client.component";
import { WidgetModule } from "../Widget/widget.module";
import { UtilityService } from "./Services/utility.service";
import { SharedCaseActivityComponent } from "./Components/Case Activity/shared-shared-case-activity.component";
import { DropdownModule } from "primeng/dropdown";
import { PageSizeModule } from "../pagesize/page-size.module";
import { AgGridModule } from "ag-grid-angular";
import { FormFooterModule } from "../form-footer/form-footer.module";
import { DialogModule } from "primeng/dialog";
import { ProviderMemberFormComponent } from "../person-master/Provider-member/provider-member-form/provider-member-form.component";
import { FormHeaderModule } from "../form-header/form-header.module";
import { PRTFComponent } from "./Components/PRTF/prtf.component";
import { TabViewModule } from 'primeng/tabview';
import { SharedFamilyMemberComponent } from "./Components/Family members/shared-family-member.component";
import { SharedCaseTeamComponent } from "./Components/Case Team/shared-case-team.component";
import { SharedTreatmentDecisionComponent } from "./Components/Treatment decisions/treatment.component";
import { SharedSchoolComponent } from "./Components/School/shared-school.component";
import { MedicationAllergiesPrtfComponent } from '../prtf-referral/medication-allergies-prtf/medication-allergies-prtf.component';
import { HealthExamPrtfComponent } from '../prtf-referral/health-exam-prtf/health-exam-prtf.component';
import { SharedMedicationsComponent } from "./Components/Medications/shared-medications.component";
import { SharedAllergiesComponent } from "./Components/Medications/Allergies/shared-allergies.component";
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressReportsPrtfComponent } from '../prtf-referral/progress-reports-prtf/progress-reports-prtf.component';
import { PrtfListViewComponent } from '../prtf-referral/prtf-list-view/prtf-list-view.component';
import { MedicalAssessmentFormComponent } from '../medical-assessment-form/medical-assessment-form.component';
import { MedTreatmentServiceComponent } from '../med-treatment-service/med-treatment-service.component';
import { MedicalConditionComponent } from '../medical-condition/medical-condition.component';
import { TreatmentDecisionsComponent } from '../prtf-referral/treatment-decisions/treatment-decisions.component';
import { CMSStaffModule } from "../staff-form/staff.module";
import { PrtfCardsComponent } from '../prtf-referral/prtf-cards/prtf-cards.component';
import { CaseTeamComponent } from "../case-team/case-team.component";
import { AssessmentFpFormComponent } from "../family-preservation-list/forms/assessment-fp-form/assessment-fp-form.component";
import { CaseFileActivityComponent } from "../case-file-activity/case-file-activity.component";
import { SplitButtonModule } from "primeng/splitbutton";
import { AttendingSchoolComponent } from "../attending-school/attending-school.component";
import { HomeSchoolComponent } from "../home-school/home-school.component";
import { AppointmentsComponent } from "../appointments/appointments.component";
import { CourtOrderComponent } from '../court-order/court-order.component';
import { ExtendedFamilyFpFormComponent } from '../family-preservation-list/forms/extended-family-fp-form/extended-family-fp-form.component';
import { SiblingsInoutHomeComponent } from '../siblings-inout-home/siblings-inout-home.component';
import { AppSharedSFMOfficeListComponent } from "./Components/SFM Office/List/SFM-office-list.component";
import { AppSharedSFMOfficeComponent } from "./Components/SFM Office/Form/SFM-office-form.component";
import { CaseEvaluationsFpFormComponent } from '../family-preservation-list/forms/case-evaluations-fp-form/case-evaluations-fp-form.component';
import { SchoolListComponent } from '../person-master/school/school-list/school-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetModule,
    DropdownModule,
    PageSizeModule,
    AgGridModule,
    FormFooterModule,
    DialogModule,
    FormHeaderModule,
    FormFooterModule,
    TabViewModule,
    MessageModule,
    MessagesModule,
    CMSStaffModule,
    SplitButtonModule,
  ],
  declarations: [
    SharedClientComponent,
    SharedCaseActivityComponent,
    ProviderMemberFormComponent,
    PRTFComponent,
    SharedFamilyMemberComponent,
    SharedCaseTeamComponent,
    SharedTreatmentDecisionComponent,
    SharedSchoolComponent,
    HealthExamPrtfComponent,
    PrtfListViewComponent,
    MedicationAllergiesPrtfComponent,
    SharedMedicationsComponent,
    SharedAllergiesComponent,
    ProgressReportsPrtfComponent,
    MedicalAssessmentFormComponent,
    MedTreatmentServiceComponent,
    MedicalConditionComponent,
    TreatmentDecisionsComponent,
    PrtfCardsComponent,
    CaseTeamComponent,
    AssessmentFpFormComponent,
    CaseFileActivityComponent,
    AttendingSchoolComponent,
    HomeSchoolComponent,
    AppointmentsComponent,
    CourtOrderComponent,
    ExtendedFamilyFpFormComponent,
    SiblingsInoutHomeComponent,
    AppSharedSFMOfficeListComponent,
    AppSharedSFMOfficeComponent,
    CaseEvaluationsFpFormComponent,
    SchoolListComponent
  ],
  providers: [ClientService, UtilityService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedClientComponent,
    WidgetModule,
    SharedCaseActivityComponent,
    ProviderMemberFormComponent,
    PRTFComponent,
    SharedFamilyMemberComponent,
    SharedCaseTeamComponent,
    SharedTreatmentDecisionComponent,
    SharedSchoolComponent,
    HealthExamPrtfComponent,
    PrtfListViewComponent,
    MedicationAllergiesPrtfComponent,
    SharedMedicationsComponent,
    SharedAllergiesComponent,
    ProgressReportsPrtfComponent,
    MedicalAssessmentFormComponent,
    MedTreatmentServiceComponent,
    MedicalConditionComponent,
    TreatmentDecisionsComponent,
    PrtfCardsComponent,
    HomeSchoolComponent,
    AppSharedSFMOfficeListComponent,
    AppSharedSFMOfficeComponent,
    SchoolListComponent
  ]
})

export class CMSSharedModule { }
