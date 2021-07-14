import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { HomeModule } from '../home/home.module';
import { AppNavBarModule } from '../app-navbar/app-nav-bar.module';
import { FormHeaderModule } from '../form-header/form-header.module';
import { FormFooterModule } from '../form-footer/form-footer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { OpencardListviewModule } from '../opecards-list-view/opencard-listview.module';
import { PersonMasterListViewModule } from '../person-master/personmaster-list-view/person-master-list-view.module';
import { InputMaskModule } from 'primeng/inputmask';
import { SpinnerModule } from 'primeng/spinner';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { AgGridModule } from 'ag-grid-angular';

import { ProviderOpencardComponent } from './provider-opencard.component';
import { InHomeFamilyMembersComponent } from './nodes/in-home-family-members/in-home-family-members.component';
import { AdultsComponent } from './nodes/in-home-family-members/adults/adults.component';
import { ChildrenComponent } from './nodes/in-home-family-members/children/children.component';
import { PetsComponent } from './nodes/in-home-family-members/pets/pets.component';
import { LocationComponent } from './nodes/location/location.component';
import { ProviderAdoptionComponent } from './nodes/provider-adoption/provider-adoption.component';
import { CaseFileActivityComponent } from './nodes/case-file-activity/case-file-activity.component';
import { ProviderCaseFileActivityComponent } from './nodes/provider-case-file-activity/provider-case-file-activity.component';
import { ProviderPreferencesComponent } from './nodes/provider-preferences/provider-preferences.component';
import { SponsorComponent } from './nodes/sponsor/sponsor.component';
import { StatusComponent } from './nodes/status/status.component';
import { ProviderStaffComponent } from './nodes/provider-staff/provider-staff.component';
import { ProviderOfficeComponent } from './nodes/provider-office/provider-office.component';
import { ProviderSchoolComponent } from './nodes/provider-school/provider-school.component';
import { LicenseComponent } from './nodes/license/license.component';
import { LicenseExceptionComponent } from './nodes/license-exception/license-exception.component';
import { ProviderStrengthComponent } from './nodes/provider-strength/provider-strength.component';
import { RecuritmentComponent } from './nodes/recuritment/recuritment.component';
import { MembersComponent } from './nodes/members/members.component';
import { SiteReviewComponent } from './nodes/site-review/site-review.component';
import { TrainingComponent } from './nodes/training/training.component';
import { OtherAgencyStaffComponent } from './nodes/other-agency-staff/other-agency-staff.component';
import { FamilyChangeComponent } from './nodes/family-change/family-change.component';
import { FchLevelCareComponent } from './nodes/fch-level-care/fch-level-care.component';
import { ProviderService } from './provider.service';
import { FamilyContactComponent } from './nodes/family-contact/family-contact.component';
import { ProviderAdoptionBISComponent } from './nodes/provider-adoption-bis/provider-adoption-bis.component';
import { ProviderAdoptionIRComponent } from './nodes/provider-adoption-ir/provider-adoption-ir.component';
import { UnacceptableConditionsComponent } from './nodes/unacceptable-conditions/unacceptable-conditions.component';
import { ReintegrationModule } from '../reintegration/reintegration.module';
import { CMSSharedModule } from '../Shared/shared.module';
import { PlacementHistoryComponent } from './nodes/placement-history/placement-history.component';
@NgModule({
  declarations: [
    ProviderOpencardComponent,
    InHomeFamilyMembersComponent,
    AdultsComponent,
    ChildrenComponent,
    PetsComponent,
    LocationComponent,
    ProviderAdoptionComponent,
    CaseFileActivityComponent,
    ProviderCaseFileActivityComponent,
    ProviderPreferencesComponent,
    SponsorComponent,
    StatusComponent,
    ProviderStaffComponent,
    ProviderOfficeComponent,
    ProviderSchoolComponent,
    LicenseComponent,
    LicenseExceptionComponent,
    ProviderStrengthComponent,
    RecuritmentComponent,
    MembersComponent,
    SiteReviewComponent,
    TrainingComponent,
    OtherAgencyStaffComponent,
    FamilyChangeComponent,
    FchLevelCareComponent,
    FamilyContactComponent,
    ProviderAdoptionBISComponent,
    ProviderAdoptionIRComponent,
    UnacceptableConditionsComponent,
    PlacementHistoryComponent
  ],
  imports: [
    AgGridModule.withComponents([]),
    CommonModule,
    ProviderRoutingModule,
    HomeModule,
    AppNavBarModule,
    FormHeaderModule,
    FormFooterModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    InputTextModule,
    RadioButtonModule,
    InputTextareaModule,
    MenuModule,
    TooltipModule,
    OpencardListviewModule,
    PersonMasterListViewModule,
    InputMaskModule,
    DialogModule,
    SpinnerModule,
    TableModule,
    DropdownModule,
    ReintegrationModule,
    CMSSharedModule
  ],
  providers: [ProviderService]
})
export class ProviderModule { }
