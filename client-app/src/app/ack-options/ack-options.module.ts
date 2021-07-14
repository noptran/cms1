import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { AckOptionsComponent } from './ack-options.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { PlacementAgreementFormComponent } from '../placement-forms/placement-agreement-form/placement-agreement-form.component';
import { PlacementAcknowledgementComponent } from '../placement-forms/placement-acknowledgement/placement-acknowledgement.component';
import { PlacementEmailFooterComponent } from '../placement/palcement-email-footer/placement-email-footer.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PlacementPsaComponent } from '../placement-forms/placement-psa/placement-psa.component';
import { PlacementAgreementKinshipNonPaidComponent } from '../placement-forms/placement-agreement-kinship-non-paid/placement-agreement-kinship-non-paid.component';
import { PlacementAgreementKinshipAPComponent } from '../placement-forms/placement-agreement-kinship-ap/placement-agreement-kinship-ap.component';

@NgModule({
    declarations: [
        AckOptionsComponent,
        PlacementAcknowledgementComponent,
        PlacementEmailFooterComponent,
        PlacementAgreementFormComponent,
        PlacementPsaComponent,
        PlacementAgreementKinshipNonPaidComponent,
        PlacementAgreementKinshipAPComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CheckboxModule,
        AutoCompleteModule,
        InputTextareaModule,
        InputTextModule,
        RadioButtonModule,
        DialogModule,
        SplitButtonModule
    ],
    providers: [],
    exports: [
        AckOptionsComponent,
        PlacementAcknowledgementComponent,
        PlacementAgreementFormComponent,
        PlacementEmailFooterComponent,
        PlacementAgreementFormComponent,
        PlacementPsaComponent,
        PlacementAgreementKinshipNonPaidComponent,
        PlacementAgreementKinshipAPComponent

    ]
})

export class AckModule { }
