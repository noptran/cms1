import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomepagecwfComponent } from "./homepagecwf/homepagecwf.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { OtpverficationComponent } from "./otpverfication/otpverfication.component";
import { AuthGuardService as AuthGuard } from "./auth/auth-guard.service";
import {
  AuthGuardVerificationService,
  AuthGuardVerificationHomeService,
} from "./auth/auth-guard-verification.service";
import { HelpComponent } from "./help/help.component";
import { MyExportsComponent } from "./my-exports/my-exports.component";

import { ErrorPagesComponent } from "./exception-pages/error-pages/error-pages.component";
import { RedirectComponent } from "./redirect/redirect.component";
// import { HomeModule } from './home/home.module';
// import { ReintegrationModule } from './reintegration/reintegration.module';
// import { ClaimsListViewModule } from './claims-list-view/claims-list-view.module';
// import { ProviderModule } from './provider/provider.module';
// import { HomeComponent } from './home/home.component';
/////////////////
// import { CourtReportComponent } from './reintegration-forms/court-report/court-report.component';

import { PrintLayoutComponent } from "./print-layout/print-layout/print-layout.component";
import { NtffPrintComponent } from "./print-layout/ntff-print/ntff-print.component";
import { WorkerChildComponent } from "./print-layout/worker-child/worker-child.component";
import { WorkerParentComponent } from "./print-layout/worker-parent/worker-parent.component";
import { ParentChhildComponent } from "./print-layout/parent-chhild/parent-chhild.component";
import { MoveFormComponent } from "./print-layout/move-form/move-form.component";
import { MoveFormDisruptionComponent } from "./print-layout/move-form-disruption/move-form-disruption.component";
// import { Pps0550Component } from './print-forms/pps0550/pps0550.component';
import { PlacementDraftPrintComponent } from "./print-layout/placement-draft-print/placement-draft-print.component";
import { PlacementBlankPrintComponent } from "./print-layout/placement-blank-print/placement-blank-print.component";
import { PlacementPlanBlankComponent } from "./print-layout/placement-plan-blank/placement-plan-blank.component";
import { CaseActivityComponent } from "./print-layout/case-activity/case-activity.component";
// import { PPS0550Module } from './print-layout/pps0550/pps0550.module';
import { PPS0550UpdatedComponent } from "./print-layout/pps0550/pps0550.component";
import { KansasPrintComponent } from "./print-layout/kansas-print/kansas-print.component";
import { ReferralAcknowledgementComponent } from "./print-layout/referral-ack/referral-ack.component";
// import { OpecardsListViewComponent } from './opecards-list-view/opecards-list-view.component';

// export function loadHomeModule() { return HomeModule; }
// export function loadReintegration() { return ReintegrationModule }
// export function loadClaims() { return ClaimsListViewModule }
// export function loadProviderModule() { return ProviderModule }
// export function loadPPS0550Module() { return PPS0550Module }
// import { FPModule } from './fp/fp.module'
// import { ReintegrationModule } from './reintegration/reintegration.module'
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ClientGradeProgressionComponent } from "./client-grade-progression/client-grade-progression.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "",
    component: LoginComponent,
    canActivate: [AuthGuardVerificationHomeService],
  },
  { path: "accessDenied", component: ErrorPagesComponent },
  {
    path: "home",
    // component: HomepageComponent,
    redirectTo: "/childwelfare",
    canActivate: [AuthGuard, AuthGuardVerificationService],
  },
  ///////////
  // { path: 'court-report', component: CourtReportComponent, canActivate: [AuthGuard, AuthGuardVerificationService] },
  ////////
  {
    path: "childwelfare",
    component: HomepagecwfComponent,
    canActivate: [AuthGuard, AuthGuardVerificationService],
  },
  {
    path: "reports",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  { path: "verification", component: OtpverficationComponent },
  { path: "registerRequest", component: OtpverficationComponent },
  {
    path: "help",
    component: HelpComponent,
    canActivate: [AuthGuard, AuthGuardVerificationService],
  },
  {
    path: "myExports",
    component: MyExportsComponent,
    canActivate: [AuthGuard, AuthGuardVerificationService],
  },
  {
    path: "live-myExports",
    component: MyExportsComponent,
    canActivate: [AuthGuard, AuthGuardVerificationService],
  },
  { path: "redirect", component: RedirectComponent },
  {
    path: "reintegration",
    loadChildren: () =>
      import("./reintegration/reintegration.module").then(
        (m) => m.ReintegrationModule
      ),
  },
  {
    path: "claims",
    loadChildren: () =>
      import("./claims-list-view/claims-list-view.module").then(
        (m) => m.ClaimsListViewModule
      ),
  },
  {
    path: "provider",
    loadChildren: () =>
      import("./provider/provider.module").then((m) => m.ProviderModule),
  },
  {
    path: "placement-date-validation",
    loadChildren: () =>
      import(
        "./placement-date-validation/placement-date-validation.module"
      ).then((m) => m.PlacementDateValidationModule),
  },

  {
    path: "print",
    outlet: "print",
    component: PrintLayoutComponent,
    children: [
      { path: "ntff", component: NtffPrintComponent },
      { path: "worker-parent", component: WorkerParentComponent },
      { path: "parent-child", component: ParentChhildComponent },
      { path: "move-form", component: MoveFormComponent },
      { path: "move-form-disruption", component: MoveFormDisruptionComponent },
      {
        path: "placement-referral-draft",
        component: PlacementDraftPrintComponent,
      },
      {
        path: "placement-referral-blank",
        component: PlacementBlankPrintComponent,
      },
      { path: "placement-plan-blank", component: PlacementPlanBlankComponent },
      { path: "case-activity", component: CaseActivityComponent },
      { path: "pps0550", component: PPS0550UpdatedComponent },
      { path: "kansas", component: KansasPrintComponent },
      { path: "referral-ack", component: ReferralAcknowledgementComponent },
    ],
  },
  {
    path: "print",
    outlet: "print",
    component: PrintLayoutComponent,
    children: [{ path: "worker-child", component: WorkerChildComponent }],
  },
  // {
  //   path: 'pps-0550',
  //   component: Pps0550Component
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing :true
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
