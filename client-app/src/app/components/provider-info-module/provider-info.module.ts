import { NgModule } from '@angular/core';
import { ProviderInfoComponent } from './provider-info.component';
import { ProviderInfoService } from './provider-info.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
    declarations: [ProviderInfoComponent, ],
    exports: [ProviderInfoComponent],
    providers: [ProviderInfoService]
})
export class ProviderInfoModule { }
