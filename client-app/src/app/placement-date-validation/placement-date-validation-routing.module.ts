import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlacementDateValidationComponent } from "./placement-date-validation.component";

const routes: Routes = [
  {
    path: "",
    component: PlacementDateValidationComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacementDateValidationRoutingModule {}
