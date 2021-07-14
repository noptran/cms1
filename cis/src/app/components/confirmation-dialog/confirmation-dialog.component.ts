import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material';
import { FormService } from '../../providers/form.service';
@Component({
    selector: 'confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialog {

    constructor(public dialogRef: MatDialogRef<ConfirmationDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private formService: FormService) {
    }

    close(response) {
        if (response) {
            this.formService.loaderStart();
        }
        this.dialogRef.close(response);
    }
}