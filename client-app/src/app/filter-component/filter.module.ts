import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponentComponent } from './filter-component.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/multiselect.component';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  imports: [
    CommonModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    SidebarModule,
    AngularMultiSelectModule,
    CalendarModule,
    InputSwitchModule,
    RadioButtonModule
  ],
  declarations: [
    FilterComponentComponent
  ],
  exports: [FilterComponentComponent]
})
export class FilterModule { }
