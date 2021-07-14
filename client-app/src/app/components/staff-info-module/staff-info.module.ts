import { NgModule } from '@angular/core';
import { StaffInfoComponent } from './staff-info.component';
import { StaffInfoService } from './staff-info.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {InputSwitchModule} from 'primeng/inputswitch';
@NgModule({
    imports: [
        DialogModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        InputSwitchModule
    ],
    declarations: [StaffInfoComponent, ],
    exports: [StaffInfoComponent],
    providers: [StaffInfoService]
})
export class StaffInfoModule { }
