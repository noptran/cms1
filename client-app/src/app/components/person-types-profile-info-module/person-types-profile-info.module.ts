import { NgModule } from "@angular/core";
import { PersonTypesProfileInfoComponent } from "./person-types-profile-info.component";
import { PersonTypesProfileService } from "./person-types-profile.service";
import { DialogModule } from "primeng/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AccordionModule } from "primeng/accordion";

@NgModule({
  imports: [
    DialogModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AccordionModule,
  ],
  declarations: [PersonTypesProfileInfoComponent],
  exports: [PersonTypesProfileInfoComponent],
  providers: [PersonTypesProfileService],
})
export class PersonTypesProfileInfoModule {}
