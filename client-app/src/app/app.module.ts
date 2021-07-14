import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
// import {FormsModule} from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/angular2-multiselect-dropdown";
import { ExportService } from "./prioritized-reports/export-service.service";
import { PopoverModule } from "ngx-popover";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { MyDatePickerModule } from "mydatepicker";
import { LoginService } from "./login/login.service";

import { PrioritizedReportsService } from "./prioritized-reports/prioritized-reports.service";
import { HomepageComponent } from "./homepage/homepage.component";
import { HomepagecwfComponent } from "./homepagecwf/homepagecwf.component";
import { FooterComponent } from "./footer/footer.component";
// import { DndListModule } from 'ngx-drag-and-drop-lists';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TeamFormService } from "./team-form/team-form.service";
// import { NgUploaderModule } from 'ngx-uploader';
import { HomeService } from "./home/home.service";
import { AccordionModule } from "ngx-accordion";
import { OtpverficationComponent } from "./otpverfication/otpverfication.component";
import { OtpverficationService } from "./otpverfication/otpverfication.service";
import { AuthGuardService } from "./auth/auth-guard.service";
import {
  AuthGuardVerificationService,
  AuthGuardVerificationHomeService,
} from "./auth/auth-guard-verification.service";
import { HelpComponent } from "./help/help.component";
import { RoleService } from "./roles/roles.service";
import { UserService } from "./user-form/user.service";
import { DonationService } from "./donation-master/donation.service";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReferralsService } from "./referrals/referrals.service";
import { InputSwitchModule } from "primeng/inputswitch";
import { MetaDataService } from "./metadata-configuration/meta-data/meta-data.service";
import { ReferralViewService } from "./referral-view/referral-view.service";
import { MyExportsComponent } from "./my-exports/my-exports.component";
import { PagesizeService } from "./pagesize/pagesize.service";
import { CaseTeamService } from "./case-team/case-team.service";
import { MedicationAllergiesService } from "./medication-allergies/medication-allergies.service";
import { CaseActivityListComponent } from "./case-activity-list/case-activity-list.component";
import { ClientStrengthService } from "./client-strength/client-strength.service";
import { ClientAllergiesService } from "./client-allergies/client-allergies.service";
import { ClientReferralEventService } from "./client-referral-event-form/client-referral-event.service";
import { MessageService } from "primeng/api";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { ErrorPagesComponent } from "./exception-pages/error-pages/error-pages.component";
import { CheckboxModule } from "primeng/checkbox";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import { RedirectComponent } from "./redirect/redirect.component";
import { CarouselModule } from "primeng/carousel";
import { OpencardsService } from "./opecards-list-view/opencards.service";
// tslint:disable-next-line:max-line-length
import { FpCaseActivityService } from "./family-preservation-list/forms/case-activity-fp-form/fp-case-activity.service";
import { FpAckRefChangeFormComponent } from "./fp-ack-referral-form/fp-ack-ref-change-form/fp-ack-ref-change-form.component";
import { ClildFormService } from "./child-forms/child-forms.service";

import { FPComponent } from "./fp/fp.component";
import { HomeModule } from "./home/home.module";
import { AppNavBarModule } from "./app-navbar/app-nav-bar.module";
import { OpencardListviewModule } from "./opecards-list-view/opencard-listview.module";
import { FileUploadModule } from "primeng/fileupload";
import { PlacementService } from "./placement/placement.service";
import { PrintPdf } from "./print-pdf";
import { PlacementPrintService } from "./placement-forms/placement-print.service";
import { LocalValues } from "./local-values";
import { PrintLayoutComponent } from "./print-layout/print-layout/print-layout.component";
import { NtffPrintComponent } from "./print-layout/ntff-print/ntff-print.component";
import { WorkerChildComponent } from "./print-layout/worker-child/worker-child.component";
import { WorkerParentComponent } from "./print-layout/worker-parent/worker-parent.component";
import { PrintService } from "./print-layout/service/print.service";
import { ParentChhildComponent } from "./print-layout/parent-chhild/parent-chhild.component";
import { MoveFormComponent } from "./print-layout/move-form/move-form.component";
import { MoveFormDisruptionComponent } from "./print-layout/move-form-disruption/move-form-disruption.component";
import { PlacementDraftPrintComponent } from "./print-layout/placement-draft-print/placement-draft-print.component";
import { PlacementBlankPrintComponent } from "./print-layout/placement-blank-print/placement-blank-print.component";
import { PlacementPlanBlankComponent } from "./print-layout/placement-plan-blank/placement-plan-blank.component";
// import { Pps0550Component } from './print-forms/pps0550/pps0550.component';
// import { BeginEndDateValidationsComponent } from './begin-end-date-validations/begin-end-date-validations.component';
// import { ReintegrationComponent } from './reintegration/reintegration.component';
import { ListboxModule } from "primeng/listbox";
import { CaseActivityComponent } from "./print-layout/case-activity/case-activity.component";
import { PPS0550Module } from "./print-layout/pps0550/pps0550.module";
import { KansasPrintComponent } from "./print-layout/kansas-print/kansas-print.component";
import { interceptorProviders } from "../Interceptors";
import { ReferralAcknowledgementComponent } from "./print-layout/referral-ack/referral-ack.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { Hotkeys } from './add-claims/hotkeys.service'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    HomepagecwfComponent,
    FooterComponent,
    OtpverficationComponent,
    HelpComponent,
    MyExportsComponent,
    CaseActivityListComponent,
    ErrorPagesComponent,
    RedirectComponent,
    FpAckRefChangeFormComponent,
    FPComponent,
    PrintLayoutComponent,
    NtffPrintComponent,
    WorkerChildComponent,
    WorkerParentComponent,
    ParentChhildComponent,
    MoveFormComponent,
    MoveFormDisruptionComponent,
    PlacementDraftPrintComponent,
    PlacementBlankPrintComponent,
    PlacementPlanBlankComponent,
    CaseActivityComponent,
    KansasPrintComponent,
    ReferralAcknowledgementComponent,
    // PPS0550UpdatedComponent
    // Pps0550Component
    // BeginEndDateValidationsComponent,
    // ReintegrationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMultiSelectModule,
    FormsModule,
    MyDatePickerModule,
    NgbModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    PopoverModule,
    // DndListModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // NgUploaderModule,
    AccordionModule,
    HttpClientModule,
    HttpModule,
    InputSwitchModule,
    CheckboxModule,
    TooltipModule,
    CarouselModule,
    TableModule,
    HomeModule,
    AppNavBarModule,
    OpencardListviewModule,
    FileUploadModule,
    ListboxModule,
    PPS0550Module,
    DashboardModule,
  ],

  providers: [
    interceptorProviders,
    LoginService,
    PrioritizedReportsService,
    ExportService,
    TeamFormService,
    ClildFormService,
    HomeService,
    OtpverficationService,
    AuthGuardService,
    RoleService,
    AuthGuardVerificationService,
    AuthGuardVerificationHomeService,
    UserService,
    DonationService,
    HttpClient,
    ReferralsService,
    MetaDataService,
    ReferralViewService,
    PagesizeService,
    CaseTeamService,
    MedicationAllergiesService,
    ClientStrengthService,
    ClientAllergiesService,
    ClientReferralEventService,
    MessageService,
    OpencardsService,
    FpCaseActivityService,
    PlacementService,
    LocalValues,
    PrintPdf,
    PlacementPrintService,
    PrintService,
    interceptorProviders,
    Hotkeys
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
