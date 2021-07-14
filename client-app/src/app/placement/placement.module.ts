import { NgModule } from "@angular/core";
import { PlacementComponent } from "./placement.component";
import { CommonModule } from "@angular/common";
import { AppNavBarModule } from "../app-navbar/app-nav-bar.module";
import { FormHeaderModule } from "../form-header/form-header.module";
import { FormFooterModule } from "../form-footer/form-footer.module";
import { QuickMenuModule } from "../quick-menu/quick-menu.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputSwitchModule } from "primeng/inputswitch";
import { MenuModule } from "primeng/menu";
import { TooltipModule } from "primeng/tooltip";
import { OpencardListviewModule } from "../opecards-list-view/opencard-listview.module";
import { PersonMasterListViewModule } from "../person-master/personmaster-list-view/person-master-list-view.module";
import { InputMaskModule } from "primeng/inputmask";
import { SpinnerModule } from "primeng/spinner";
import { DialogModule } from "primeng/dialog";
import { AccordionModule } from "primeng/accordion";
import { TriStateCheckboxModule } from "primeng/tristatecheckbox";
import { MessageModule } from "primeng/message";
import { ToastModule } from "primeng/toast";
import { FileUploadModule } from "primeng/fileupload";
import { SplitButtonModule } from "primeng/splitbutton";
import { AckModule } from "../ack-options/ack-options.module";
import { ListboxModule } from "primeng/listbox";
import { SchoolModule } from "../person-master/school/modules/school/school.module";
import { PlacementEventComponent } from "./placement-event/placement-event.component";
import { ProviderComponent } from "../provider/provider.component";
import { CMSSharedModule } from "../Shared/shared.module";
import { PlacementDateValidationComponent } from "../placement-date-validation/placement-date-validation.component";
import { TabViewModule } from "primeng/tabview";

import { DraggableDialogModule } from "../draggable-dialog/draggable-dialog.module";
import { PlacementDateValidationModule } from "../placement-date-validation/placement-date-validation.module";

@NgModule({
  declarations: [
    PlacementComponent,
    PlacementEventComponent,
    ProviderComponent,
  ],
  imports: [
    CommonModule,
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
    CMSSharedModule,
    TabViewModule,
    DraggableDialogModule,
    PlacementDateValidationModule,
  ],
  exports: [
    PlacementComponent,
    PlacementEventComponent,
    ProviderComponent,
    PlacementDateValidationComponent,
  ],
})
export class PlacementModule {}
