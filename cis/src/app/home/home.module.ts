import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../../polyfills';
import { CommonModule } from '@angular/common';

// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatCheckboxModule, MatDatepicker, MatDatepickerModule, DateAdapter, MatAutocompleteModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material'
import { ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';
import { MatIconModule } from '@angular/material/icon';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardIcon } from '../components/dashboardIcon/dashboardIcon.component';
import { DeleteIcon } from '../components/deleteIcon/deleteIcon.Component';
import { DraftIcon } from '../components/draftIcon/draftIcon.component';
import { EditIcon } from '../components/editIcon/editIcon.component';
import { SyncIcon } from '../components/syncIcon/syncIcon.component';
import { SyncedIcon } from '../components/syncedIcon/syncedIcon.component';

import { WebviewDirective } from '../directives/webview.directive';
import { NavBarComponent } from '../components/navBar/navBar.component';
import { FormFooterComponent } from '../components/form-footer/form-footer.component';
import { FormsListingComponent } from '../components/forms/forms-listing/forms-listing.component';
import { SideNavComponent } from '../components/sideNav/sideNav.component';
import { WorkerChildVisitFormComponent } from '../components/forms/worker-child-visit-activity-note/worker-child-visit.component';
import { CaseActivityComponent } from '../components/forms/case-activity/case-activity.component';
// tslint:disable-next-line:max-line-length
import { AdoptiveResourceInquiryFormComponent } from '../components/forms/adoptive-resource-inquiry-form/adoptive-resource-inquiry-form.component';
import { ParentChildVisitationLogFormComponent } from '../components/forms/parent-child-visitation-log-form/parent-child-visitation-log-form.component';
import { WorkerParentVisitActivityFormComponent } from '../components/forms/worker-parent-visit-activity-form/worker-parent-visit-activity-form.component';
import { CourtApperanceLogFormComponent } from '../components/forms/court-apperance-log-form/court-apperance-log-form.component';
import { PermanancyReleaseOrChangeofVisitFormComponent } from '../components/forms/permanancy-release-or-changeof-visit-form/permanancy-release-or-changeof-visit-form.component';
import { MaternalPaternalRelativeFormComponent } from '../components/forms/maternal-paternal-relative-form/maternal-paternal-relative-form.component';
import { InitialFamilyTeamMeetingFormComponent } from '../components/forms/initial-family-team-meeting-form/initial-family-team-meeting-form.component';
import { GuideForMonthlyResourceHomeContactFormComponent } from '../components/Okhlahoma/guide-for-monthly-resource-home-contact-form/guide-for-monthly-resource-home-contact-form.component';
import { AsqTwoMoFormComponent } from '../components/Behavioral Assessment/asq-two-mo-form/asq-two-mo-form.component';

import { RequestFinancialFormComponent } from '../components/forms/request-financial-form/request-financial-form.component';
import { AsqSixMoFormComponent } from '../components/Behavioral Assessment/asq-six-mo-form/asq-six-mo-form.component';
import { AsqTwelveMoFormComponent } from '../components/Behavioral Assessment/asq-twelve-mo-form/asq-twelve-mo-form.component';
import { AsqEighteenMoFormComponent } from '../components/Behavioral Assessment/asq-eighteen-mo-form/asq-eighteen-mo-form.component';
import { AsqTwentyfourMoFormComponent } from '../components/Behavioral Assessment/asq-twentyfour-mo-form/asq-twentyfour-mo-form.component';
import { AsqThirtyMoFormComponent } from '../components/Behavioral Assessment/asq-thirty-mo-form/asq-thirty-mo-form.component';
import { AsqThirtysixMoFormComponent } from '../components/Behavioral Assessment/asq-thirtysix-mo-form/asq-thirtysix-mo-form.component';
import { AsqFortyeightFormComponent } from '../components/Behavioral Assessment/asq-fortyeight-form/asq-fortyeight-form.component';
import { AsqSixtyFormComponent } from '../components/Behavioral Assessment/asq-sixty-form/asq-sixty-form.component';
import { CafasFormComponent } from '../components/Behavioral Assessment/cafas-form/cafas-form.component';
import { CropsFormComponent } from '../components/Behavioral Assessment/crops-form/crops-form.component';
import { NCFASFormComponent } from '../components/Behavioral Assessment/ncfas-form/ncfas-form.component';
import { PECFASFormComponent } from '../components/Behavioral Assessment/pecfas-form/pecfas-form.component';
import { ParentStressIndexFormComponent } from '../components/Behavioral Assessment/parent-stress-index-form/parent-stress-index-form.component';
import { CsdcFormComponent } from '../components/Behavioral Assessment/csdc-form/csdc-form.component';
import { FosterCarePlacementSupportComponent } from '../components/foster care/foster-care-placement-support/foster-care-placement-support.component';
import { SupervisoryStaffingFormComponent } from '../components/family preservation/supervisory-staffing-form/supervisory-staffing-form.component';
import { FormEditorComponent } from '../components/form-editor/form-editor.component';
import { ClientResultsComponent } from '../components/client-results/client-results.component';
import { ClientSearchComponent } from '../components/clientSearch/client-search.component';
import { LockIcon } from '../components/lockicon/lock-icon.component';
import { LogOutIcon } from '../components/logout-icon/logout-icon.component';
import { ProgramIcon } from '../components/program-icon/program-icon.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { BriefCaseIcon } from '../components/briefcase-icon/briefcase-icon.component';
import { MultiClientComponent } from '../components/multi-client/multi-client.component';
import { SearchAllclientComponent } from '../components/search-allclient/search-allclient.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FooterComponent } from '../footer/footer.component';
import { ViewPreviousFormsComponent } from '../components/forms/view-previous-forms/view-previous-forms.component';

@NgModule({
  exports: [

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AutosizeModule,
    PdfViewerModule,
    MatAutocompleteModule,
    MatIconModule
  ],
  declarations: [HomeComponent,
    BriefCaseIcon,
    ClientSearchComponent,
    ClientResultsComponent,
    MultiClientComponent,
    SearchAllclientComponent,
    DashboardComponent,
    FormEditorComponent,
    FormFooterComponent,
    FormsListingComponent,
    NavBarComponent,
    SideNavComponent,
    WorkerChildVisitFormComponent,
    DashboardIcon,
    DeleteIcon,
    DraftIcon,
    EditIcon,
    LockIcon,
    LogOutIcon,
    ProgramIcon,
    SyncIcon,
    SyncedIcon,
    WebviewDirective,
    CaseActivityComponent,
    AdoptiveResourceInquiryFormComponent,
    ParentChildVisitationLogFormComponent,
    WorkerParentVisitActivityFormComponent,
    CourtApperanceLogFormComponent,
    RequestFinancialFormComponent,
    PermanancyReleaseOrChangeofVisitFormComponent,
    MaternalPaternalRelativeFormComponent,
    InitialFamilyTeamMeetingFormComponent,
    GuideForMonthlyResourceHomeContactFormComponent,
    AsqTwoMoFormComponent,
    AsqSixMoFormComponent,
    AsqTwelveMoFormComponent,
    AsqEighteenMoFormComponent,
    AsqTwentyfourMoFormComponent,
    AsqThirtyMoFormComponent,
    AsqThirtysixMoFormComponent,
    AsqFortyeightFormComponent,
    AsqSixtyFormComponent,
    CafasFormComponent,
    CropsFormComponent,
    NCFASFormComponent,
    PECFASFormComponent,
    ParentStressIndexFormComponent,
    CsdcFormComponent,
    FosterCarePlacementSupportComponent,
    SupervisoryStaffingFormComponent, FooterComponent, ViewPreviousFormsComponent],
  entryComponents: [ClientResultsComponent, MultiClientComponent, SearchAllclientComponent
  ],
})
export class HomeModule { }
