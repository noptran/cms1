import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormFooterComponent } from "./form-footer.component";
import { SplitButtonModule } from "primeng/splitbutton";
import { FileUploadModule } from "primeng/fileupload";
import { DialogModule } from "primeng/dialog";
import { ListboxModule } from "primeng/listbox";
import { AutoCompleteModule } from "primeng/autocomplete";
import { InputTextModule } from "primeng/inputtext";
import { EditorModule } from "primeng/editor";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AccordionModule } from "primeng/accordion";
import { TabViewModule } from "primeng/tabview";
import { GeneralRecordsDeleteComponent } from "../wizards/general-records-delete/general-records-delete.component";
import { SendEmailAutoAttachmentComponent } from "../wizards/send-email-auto-attachment/send-email-auto-attachment.component";
import { CheckboxModule } from "primeng/checkbox";
import { ChipsModule } from "primeng/chips";
import { AckModule } from "../ack-options/ack-options.module";
import { PlacementHistoryComponent } from "../Shared/Components/Placement History/placement-history.component";
import { AppValuesService } from "../../constants/AppValues.service";

@NgModule({
  imports: [
    CommonModule,
    SplitButtonModule,
    FileUploadModule,
    DialogModule,
    ListboxModule,
    AutoCompleteModule,
    InputTextModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    TabViewModule,
    CheckboxModule,
    ChipsModule,
    AckModule,
  ],
  declarations: [
    FormFooterComponent,
    GeneralRecordsDeleteComponent,
    SendEmailAutoAttachmentComponent,
    PlacementHistoryComponent,
  ],
  providers: [AppValuesService],
  exports: [FormFooterComponent],
})
export class FormFooterModule {}
