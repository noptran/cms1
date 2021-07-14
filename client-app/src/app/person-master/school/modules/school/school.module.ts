import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { FormHeaderModule } from '../../../../form-header/form-header.module';
import { FormFooterModule } from '../../../../form-footer/form-footer.module';
import { DialogModule } from 'primeng/dialog';
import { OpencardListviewModule } from '../../../../opecards-list-view/opencard-listview.module';
@NgModule({
  declarations: [
    // SchoolListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    AutoCompleteModule,
    InputTextareaModule,
    InputTextModule,
    RadioButtonModule,
    CalendarModule,
    FormHeaderModule,
    FormFooterModule,
    DialogModule,
    OpencardListviewModule
  ],
  providers: [],
  exports: []
  // exports: [SchoolListComponent]
})
export class SchoolModule { }
