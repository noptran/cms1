import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatInputModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule,
  MatIconModule
} from '@angular/material';

import { ElectronServiceFile } from './providers/electron.service';
import { PouchDbService } from './providers/pouchdb.service';
import { NetworkService } from './providers/network.service';
import { DataService } from './service/data.service';
import { AppComponent } from './app.component';
import { FormSelectorDialog } from './components/forms/form-selector-dialog/form-selector-dialog';
import { LoginComponent } from './components/login/login.component';
import { AccesspinComponent } from './components/accesspin/accesspin.component';
import { FormService } from './providers/form.service';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog.component';
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { OtpComponent } from './components/otp/otp.component';
import { SendOtpComponent } from './components/send-otp/send-otp.component';
import { ConfirmPassComponent } from './components/confirm-pass/confirm-pass.component';
import { CaseActivity } from './components/forms/case-activity/caseActivity';
import { AlertDialogComponent } from './components/forms/alert-dialog/alert-dialog.component';
import { ElectronService } from 'ngx-electron';
import { Psi } from './components/form-editor/psiCalculation';

export class MaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccesspinComponent,
    ConfirmationDialog,
    FormSelectorDialog,
    PdfViewComponent,
    HelpDialogComponent,
    OtpComponent,
    SendOtpComponent,
    ConfirmPassComponent,
    AlertDialogComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  entryComponents: [ConfirmationDialog, FormSelectorDialog, HelpDialogComponent, AlertDialogComponent],
  providers: [ElectronService, NetworkService, PouchDbService, FormService, DataService, CaseActivity, ElectronServiceFile, Psi],
  bootstrap: [AppComponent]
})
export class AppModule { }
