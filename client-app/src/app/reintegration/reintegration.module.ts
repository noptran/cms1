import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SpinnerModule } from 'primeng/spinner';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';

import { AdoptionEventComponent } from '../adoption-event/adoption-event.component';
import { AppNavBarModule } from '../app-navbar/app-nav-bar.module';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { BhDeterminationComponent } from '../bh-determination/bh-determination.component';
import { FormFooterModule } from '../form-footer/form-footer.module';
import { FormHeaderModule } from '../form-header/form-header.module';
import { GradeLevelComponent } from '../grade-level/grade-level.component';
import { HealthRecordComponent } from '../health-record/health-record.component';
import { HomeModule } from '../home/home.module';
import { KanBeHealthyComponent } from '../kan-be-healthy/kan-be-healthy.component';
import { OpencardListviewModule } from '../opecards-list-view/opencard-listview.module';
import { PersonMasterListViewModule } from '../person-master/personmaster-list-view/person-master-list-view.module';
import { SchoolReleaseComponent } from '../school-release/school-release.component';
import { ReintegrationRoutingModule } from './reintegration-routing.module';
import { ReintegrationComponent } from './reintegration.component';
import { RfcReferralComponent } from './rfc-referral/rfc-referral.component';
import { MonthlyReportsComponent } from '../monthly-reports/monthly-reports.component';
import { SocialSecurtiyIncomeComponent } from '../social-securtiy-income/social-securtiy-income.component';
import { IndependentLivingComponent } from '../independent-living/independent-living.component';
import { OtherServiceClaimComponent } from '../other-service-claim/other-service-claim.component';
import { ImmunizationComponent } from '../immunization/immunization.component';
import { WaiverComponent } from '../waiver/waiver.component';
import { KippComponent } from '../kipp/kipp.component';
import { SibilingInOutComponent } from '../sibiling-in-out/sibiling-in-out.component';
import { DialogModule } from 'primeng/dialog';
import { PlacementReferralComponent } from '../placement-referral/placement-referral.component';
import { AccordionModule } from 'primeng/accordion';
import { PlacementEventAuthorizationComponent } from '../placement-event-authorization/placement-event-authorization.component';
import { MoveAndPermanencyComponent } from '../move-and-permanency/move-and-permanency.component';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { AdoptionComponent } from '../adoption/adoption.component';
import { BestIntrestingStaffComponent } from '../best-intresting-staff/best-intresting-staff.component';
import { GeneralEducationComponent } from './school/general-education/general-education.component';
import { CreditTrackingComponent } from './school/credit-tracking/credit-tracking.component';
import { SpecialEducationComponent } from './school/special-education/special-education.component';
import { IdentifyResourceComponent } from '../identify-resource/identify-resource.component';
import { PermanencyComponent } from '../permanency/permanency.component';
import { BehaviorVersioningComponent } from '../behavior-versioning/behavior-versioning.component';
/////////ASQ Forms/////////
import { Asq2MoComponent } from '../cis-forms/asq-2-mo/asq-2-mo.component';
import { Asq6MoComponent } from '../cis-forms/asq-6-mo/asq-6-mo.component';
import { Asq12MoComponent } from '../cis-forms/asq-12-mo/asq-12-mo.component';
import { Asq18MoComponent } from '../cis-forms/asq-18-mo/asq-18-mo.component';
import { Asq24MoComponent } from '../cis-forms/asq-24-mo/asq-24-mo.component';
import { Asq30MoComponent } from '../cis-forms/asq-30-mo/asq-30-mo.component';
import { Asq36MoComponent } from '../cis-forms/asq-36-mo/asq-36-mo.component';
import { Asq48MoComponent } from '../cis-forms/asq-48-mo/asq-48-mo.component';
import { Asq60MoComponent } from '../cis-forms/asq-60-mo/asq-60-mo.component';

import { CourtAppearanceLogComponent } from '../cis-forms/reintegration/court-appearance-log/court-appearance-log.component';
import { CourtAppearanceVersioningComponent } from '../court-appearance-versioning/court-appearance-versioning.component';
import { CafasComponent } from '../cis-forms/cafas/cafas.component';
import { AdoptiveResourceInquiryComponent } from '../cis-forms/reintegration/adoptive-resource-inquiry/adoptive-resource-inquiry.component';
import { AdoptiveVersioningComponent } from '../adoptive-versioning/adoptive-versioning.component';
import { MaternalPaternalComponent } from '../cis-forms/reintegration/maternal-paternal/maternal-paternal.component';
import { PermanencyReleaseComponent } from '../cis-forms/reintegration/permanency-release/permanency-release.component';
import { InitialFamilyComponent } from '../cis-forms/reintegration/initial-family/initial-family.component';
import { PsiComponent } from '../cis-forms/psi/psi.component';
import { MaternalPaternalVersionComponent } from '../maternal-paternal-version/maternal-paternal-version.component';
import { CropsComponent } from '../cis-forms/crops/crops.component';
import { CsdcComponent } from '../cis-forms/csdc/csdc.component';
import { NcfasComponent } from '../cis-forms/ncfas/ncfas.component';
import { PecfasComponent } from '../cis-forms/pecfas/pecfas.component';
import { PermanencyVersioningComponent } from '../permanency-versioning/permanency-versioning.component';
import { QuickMenuModule } from '../quick-menu/quick-menu.module';
import { LivingArrangeMentComponent } from '../placement/living-arrange-ment/living-arrange-ment.component';
import { DaycareAuthorizationComponent } from '../placement/daycare-authorization/daycare-authorization.component';
import { PlacementPlanComponent } from '../placement/placement-plan/placement-plan.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AckModule } from '../ack-options/ack-options.module';
import { PlacementAuthTempleteComponent } from '../placement/placement-auth-template/placement-auth-template.component';
import { ListboxModule } from 'primeng/listbox';
import { SchoolModule } from '../person-master/school/modules/school/school.module';
import { HealthBhokComponent } from '../health-bhok/health-bhok.component';
import { PlacementModule } from '../placement/placement.module';

@NgModule({
  declarations: [
    ReintegrationComponent,
    RfcReferralComponent,
    BhDeterminationComponent,
    GradeLevelComponent,
    SchoolReleaseComponent,
    HealthRecordComponent,
    AdoptionEventComponent,
    KanBeHealthyComponent,
    MonthlyReportsComponent,
    SocialSecurtiyIncomeComponent,
    IndependentLivingComponent,
    OtherServiceClaimComponent,
    ImmunizationComponent,
    WaiverComponent,
    KippComponent,
    SibilingInOutComponent,
    PlacementReferralComponent,
    PlacementEventAuthorizationComponent,
    MoveAndPermanencyComponent,
    AdoptionComponent,
    BestIntrestingStaffComponent,
    GeneralEducationComponent,
    CreditTrackingComponent,
    SpecialEducationComponent,
    IdentifyResourceComponent,
    PermanencyComponent,
    BehaviorVersioningComponent,
    Asq2MoComponent,
    Asq6MoComponent,
    Asq12MoComponent,
    Asq18MoComponent,
    Asq24MoComponent,
    Asq30MoComponent,
    Asq36MoComponent,
    Asq48MoComponent,
    Asq60MoComponent,
    CourtAppearanceVersioningComponent,
    CourtAppearanceLogComponent,
    CafasComponent,
    AdoptiveResourceInquiryComponent,
    AdoptiveVersioningComponent,
    MaternalPaternalComponent,
    PermanencyReleaseComponent,
    InitialFamilyComponent,
    PsiComponent,
    MaternalPaternalVersionComponent,
    CropsComponent,
    CsdcComponent,
    NcfasComponent,
    PecfasComponent,
    PermanencyVersioningComponent,
    LivingArrangeMentComponent,
    DaycareAuthorizationComponent,
    PlacementPlanComponent,
    PlacementAuthTempleteComponent,
    HealthBhokComponent
  ],
  imports: [
    CommonModule,
    ReintegrationRoutingModule,
    HomeModule,
    AppNavBarModule,
    FormHeaderModule,
    FormFooterModule,
    QuickMenuModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    InputTextModule,
    RadioButtonModule,
    InputTextareaModule,
    InputSwitchModule,
    MenuModule,
    TooltipModule,
    OpencardListviewModule,
    PersonMasterListViewModule,
    InputMaskModule,
    SpinnerModule,
    DialogModule,
    AccordionModule,
    TriStateCheckboxModule,
    MessageModule,
    ToastModule,
    QuickMenuModule,
    FileUploadModule,
    SplitButtonModule,
    AckModule,
    ListboxModule,
    SchoolModule,
    PlacementModule,
  ],
  providers: [MessageService],
  // entryComponents:
})
export class ReintegrationModule { }
