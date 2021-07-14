import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PersonmasterListViewComponent } from "./personmaster-list-view.component";
import { FilterModule } from "../../filter-component/filter.module";
import { AutoCompleteModule } from "primeng/autocomplete";
import { BreadcrumbModule } from "../../breadcrumb/breadcrumb.module";
import { PageSizeModule } from "../../pagesize/page-size.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TooltipModule } from "primeng/tooltip";
import { AgGridModule } from "ag-grid-angular";
import { RouterModule } from "@angular/router";
import { DropdownModule } from "primeng/dropdown";
import { Checkbox, CheckboxModule } from "primeng/checkbox";
import { Calendar, CalendarModule } from "primeng/calendar";
import { QuickMenuModule } from "../../quick-menu/quick-menu.module";
import { DialogModule } from "primeng/dialog";
import { InputMaskModule } from "primeng/inputmask";
import { AccordionModule } from "primeng/accordion";
import { RadioButtonModule } from "primeng/radiobutton";
import { PersonMasterWizardsComponent } from "../../wizards/person-master/person-master-wizards.component";
import { PersonTypesProfileInfoModule } from "../../components/person-types-profile-info-module/person-types-profile-info.module";
import { ProviderInfoModule } from "../../components/provider-info-module/provider-info.module";
import { InputSwitchModule } from "primeng/inputswitch";
import { CMSSharedModule } from "../../Shared/shared.module";
import { SplitButtonModule } from "primeng/splitbutton";
import { AckModule } from "../../ack-options/ack-options.module";
import { StaffInfoModule } from "../../components/staff-info-module/staff-info.module";
import { PlacementDateValidationModule } from "../../placement-date-validation/placement-date-validation.module";
import { AppValuesService } from "../../../constants/AppValues.service";
import { SchoolInfoModule } from "../../components/school-info/school-info.module";
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FilterModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    PageSizeModule,
    AutoCompleteModule,
    TooltipModule,
    AgGridModule,
    RouterModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule,
    QuickMenuModule,
    DialogModule,
    InputMaskModule,
    AccordionModule,
    RadioButtonModule,
    PersonTypesProfileInfoModule,
    ProviderInfoModule,
    InputSwitchModule,
    CMSSharedModule,
    SplitButtonModule,
    AckModule,
    StaffInfoModule,
    PlacementDateValidationModule,
    SchoolInfoModule,
  ],
  providers: [AppValuesService],
  declarations: [PersonmasterListViewComponent, PersonMasterWizardsComponent],
  exports: [PersonmasterListViewComponent, PersonMasterWizardsComponent],
})
export class PersonMasterListViewModule {}
