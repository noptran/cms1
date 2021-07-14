import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormHeaderComponent } from './form-header.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuModule } from 'primeng/menu';
import { PersonTypesProfileInfoModule } from '../components/person-types-profile-info-module/person-types-profile-info.module';
import { ProviderInfoModule } from '../components/provider-info-module/provider-info.module';
import { StaffInfoModule } from '../components/staff-info-module/staff-info.module';
import { SchoolInfoModule } from '../components/school-info/school-info.module';
@NgModule({
  imports: [
    CommonModule,
    BreadcrumbModule,
    TooltipModule,
    InputSwitchModule,
    MenuModule,
    PersonTypesProfileInfoModule,
    ProviderInfoModule,
    StaffInfoModule,
    SchoolInfoModule
  ],
  declarations: [
    FormHeaderComponent
  ],
  exports:[FormHeaderComponent]
})
export class FormHeaderModule { }
