import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularDraggableModule } from 'angular2-draggable';
import { DraggableDialogComponent } from '../draggable-dialog/draggable-dialog.component';


@NgModule({
  declarations: [
    DraggableDialogComponent,
  ],
  imports: [
    CommonModule,
    AngularDraggableModule,
  ],
  exports: [
    DraggableDialogComponent,
  ],
})
export class DraggableDialogModule { }
