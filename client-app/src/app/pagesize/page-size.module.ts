import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { PagesizeComponent } from './pagesize.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  declarations: [PagesizeComponent],
  exports:[PagesizeComponent]
})
export class PageSizeModule { }
