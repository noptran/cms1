import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { TabViewModule } from "primeng/tabview";
import { PlacementDateValidationRoutingModule } from "./placement-date-validation-routing.module";
import { PlacementDateValidationComponent } from "./placement-date-validation.component";

@NgModule({
  imports: [
    TabViewModule,
    DialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlacementDateValidationRoutingModule,
  ],
  declarations: [PlacementDateValidationComponent],
  exports: [PlacementDateValidationComponent],
})
export class PlacementDateValidationModule {}
