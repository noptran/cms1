import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpecardsListViewComponent } from './opecards-list-view.component';
import { PersonMasterListViewModule } from '../person-master/personmaster-list-view/person-master-list-view.module';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FormsModule } from '@angular/forms';
import { FilterModule } from '../filter-component/filter.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    PersonMasterListViewModule,
    BreadcrumbModule,
    FormsModule,
    FilterModule,
    AutoCompleteModule,
    DialogModule
  ],
  declarations: [
    OpecardsListViewComponent,
    
  ],
  exports:[OpecardsListViewComponent],
})
export class OpencardListviewModule { }
