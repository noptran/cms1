import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolInfoComponent } from './school-info.component';
import { SchoolInfoService } from './school-info.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputSwitchModule} from 'primeng/inputswitch';
import { AccordionModule } from "primeng/accordion";


@NgModule({
  imports: [
    DialogModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        InputSwitchModule,
        AccordionModule,
  ],
  declarations: [SchoolInfoComponent],
  exports: [SchoolInfoComponent],
  providers: [SchoolInfoService]
})
export class SchoolInfoModule { }
