import { NgModule } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CalendarModule } from "primeng/calendar";
import { AutoCompleteModule } from "primeng/autocomplete";
import { SpinnerModule } from "primeng/spinner";
import { RadioButtonModule } from "primeng/radiobutton";
import { CheckboxModule } from "primeng/checkbox";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        InputTextModule,
        InputTextareaModule,
        CalendarModule,
        AutoCompleteModule,
        SpinnerModule,
        RadioButtonModule,
        CheckboxModule,
        InputMaskModule,
        InputSwitchModule,
        ToastModule

    ],
    exports: [
        InputTextModule,
        InputTextareaModule,
        CalendarModule,
        AutoCompleteModule,
        SpinnerModule,
        RadioButtonModule,
        CheckboxModule,
        InputMaskModule,
        InputSwitchModule,
        ToastModule
    ]
})
export class WidgetModule { }