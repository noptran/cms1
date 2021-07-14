import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickMenuComponent } from './quick-menu.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    QuickMenuComponent
  ],
  imports: [
    CommonModule,
    TooltipModule
  ],
  exports:[QuickMenuComponent]

})
export class QuickMenuModule { }
