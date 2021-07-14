import { Component } from '@angular/core';
import { Constants } from './../../constants';
import { PouchDbService } from '../../providers/pouchdb.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { HelpDialogComponent } from '../../help-dialog/help-dialog.component';


@Component({
    selector: 'side-nav',
    templateUrl: './sideNav.component.html',
    styleUrls: ['./sideNav.component.scss']
})
export class SideNavComponent {
    formName: string;
    programs: string[];
    userRightsReferralForms: string[];

    ReintegrationCount: Number = 0;
    BehaviorCount: Number = 0;
    FosterCareCount: Number = 0;
    FamilyPreservationCount: Number = 0;
    OklahomaCount: Number = 0;

    constructor(private dialog: MatDialog, private pouchDBService: PouchDbService, private snackbar: MatSnackBar, private router: Router) {
        this.programs = Object.keys(Constants.PROGRAMS).map((program) => Constants.PROGRAMS[program]);
    }


    userRightsForms() {
        this.pouchDBService.getUser().then(data => {
            this.userRightsReferralForms = [];
            let userRightsForm = data.UserRightsForm.map(data => {
                if (!(data.fosterCareUserRightsForm === undefined || data.fosterCareUserRightsForm === null)) {
                    this.FosterCareCount = Object.values(data.fosterCareUserRightsForm).length;
                    if (this.FosterCareCount > 0) {
                        this.userRightsReferralForms.push('Foster Care');
                    }
                }
                if (!(data.familyPreservationUserRightsForm === undefined || data.familyPreservationUserRightsForm === null)) {
                    this.FamilyPreservationCount = Object.values(data.familyPreservationUserRightsForm).length;
                    if (this.FamilyPreservationCount > 0) {
                        this.userRightsReferralForms.push('Family Preservation');
                    }
                }
                if (!(data.oklahomaUserRightsForm === undefined || data.oklahomaUserRightsForm === null)) {
                    this.OklahomaCount = Object.values(data.oklahomaUserRightsForm).length;
                    if (this.OklahomaCount > 0) {
                        this.userRightsReferralForms.push('Oklahoma');
                    }
                }
                if (!(data.reintegrationUserRightsForm === undefined || data.reintegrationUserRightsForm === null)) {
                    this.ReintegrationCount = Object.values(data.reintegrationUserRightsForm).length;
                    if (this.ReintegrationCount > 0) {
                        this.userRightsReferralForms.push('reintegration');
                    }
                }
                if (!(data.behaviorUserRightsForm === undefined || data.behaviorUserRightsForm === null)) {
                    this.BehaviorCount = Object.values(data.behaviorUserRightsForm).length;
                    if (this.BehaviorCount > 0) {
                        this.userRightsReferralForms.push('behavior');
                    }
                }
            });
        }).catch(error => {
            console.log('Error in retrieving user rights forms', error);
        });

    }

    ngOnInit() {
        this.userRightsForms();
    }
    helpDoc() {
        this.dialog.open(HelpDialogComponent);
    }
    logout() {
        const confirmationDialog = this.dialog.open(ConfirmationDialog);
        confirmationDialog.afterClosed().subscribe(result => {
            if (result === true) {
                this.pouchDBService.removeUser('USER_INFO')
                    .then(() => {
                        this.snackbar.open('Logged out successfully', 'OK', { duration: 2000 });
                        this.router.navigate(['/']);
                    }).catch((err) => {
                        this.snackbar.open('Error logging out. Please contact support', 'OK', { duration: 2000 });
                    });
            }
        });
    }
}
