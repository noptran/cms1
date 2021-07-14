import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimsListViewComponent } from '../claims-list-view/claims-list-view.component';
import { ClaimsListViewRoutingModule } from './claims-list-view-routing.module';
import { OpencardListviewModule } from '../opecards-list-view/opencard-listview.module';
import { HomeModule } from '../home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClaimsListDetailsComponent } from '../claims-list-details/claims-list-details.component';
import { FormFooterModule } from '../form-footer/form-footer.module';
import { DirectAuthorisationFormViewComponent } from '../direct-authorisation-form-view/direct-authorisation-form-view.component';
import { FormHeaderModule } from '../form-header/form-header.module';

import { AddClaimsComponent } from '../add-claims/add-claims.component';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { DataTableModule } from 'primeng/datatable';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SpinnerModule } from 'primeng/spinner';
import { AgGridModule } from 'ag-grid-angular';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from "primeng/tooltip";
@NgModule({
  declarations: [
    ClaimsListViewComponent,
    ClaimsListDetailsComponent,
    AddClaimsComponent,
    DirectAuthorisationFormViewComponent
  ],
  imports: [
    CommonModule,
    ClaimsListViewRoutingModule,
    OpencardListviewModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    RadioButtonModule,
    InputTextareaModule,
    InputSwitchModule,
    CalendarModule,
    DialogModule,
    DataTableModule,
    AutoCompleteModule,
    SpinnerModule,
    AgGridModule.withComponents([]),
    FormFooterModule,
    MessageModule,
    FormHeaderModule,
    DropdownModule,
    TooltipModule
  ]
})
export class ClaimsListViewModule { }
