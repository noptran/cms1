import { NgModule } from '@angular/core';
import { PPS0550UpdatedComponent } from './pps0550.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations:[
        PPS0550UpdatedComponent
    ],
    imports : [
        CommonModule,
        FormsModule
    ],
    exports : [ PPS0550UpdatedComponent ]
})

export class PPS0550Module { }