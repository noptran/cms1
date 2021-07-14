import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PouchDbService } from '../../../providers/pouchdb.service';
import { Constants } from '../../../constants';
import { isNullOrUndefined } from 'util';

export interface DialogData {
    forms: Object[],
    selectedNavbarValue: string
}

@Component({
    selector: 'form-selector-dialog',
    templateUrl: 'form-selector-dialog.html',
    styleUrls: ['form-selector-dialog.scss']
})
export class FormSelectorDialog {

    constructor(
        public dialogRef: MatDialogRef<FormSelectorDialog>, private pouchDBService: PouchDbService,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        console.log('dialog data', data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    ngOnInit() {

        this.pouchDBService.getUser().then(data => {
            if (data) {
                if (!isNullOrUndefined(data.UserRightsForm[2].fosterCareUserRightsForm[0])) {
                    let fosterCareUserRightsForm = data.UserRightsForm[2].fosterCareUserRightsForm.filter(this.onlyUnique).map(data => {
                        data = data.replace('Placement_Support_Plan', Constants.PROGRAMS.FOSTER_CARE_HOMES.FORMS.REINTEGRATION_FOSTER_CARE_PLACEMENT_SUPPORT_PLAN);
                        return [data];
                    })
                    this.data.forms[2]['Foster Care Homes'] = fosterCareUserRightsForm;
                }
                if (!isNullOrUndefined(data.UserRightsForm[0].reintegrationUserRightsForm[0])) {
                    let reintegrationUserRightsForm = data.UserRightsForm[0].reintegrationUserRightsForm.filter(this.onlyUnique).map(data => {
                        data = data.replace('Worker_Child_Visit_Activity_Note', Constants.PROGRAMS.REINTEGRATION.FORMS.WORKED_CHILD_VISIT_ACTIVITY_NOTE9_19_16);
                        data = data.replace('Worker_Parent_Visit_Activity_Log', Constants.PROGRAMS.REINTEGRATION.FORMS.WORKED_PARENT_VISIT_ACTIVITY_LOG_TYPE_UNLOCKED);
                        data = data.replace('Adoptive_Resource_Inquiry_Form', Constants.PROGRAMS.REINTEGRATION.FORMS.ADOPTIVE_RESOURCE_INQUIRY);
                        data = data.replace('Parent_Child_Visitation_Log', Constants.PROGRAMS.REINTEGRATION.FORMS.PARENT_CHILD_VISITATION_LOG_FORM);
                        data = data.replace('Case_Activity', Constants.PROGRAMS.REINTEGRATION.FORMS.CASE_ACTIVITY);
                        data = data.replace('Court_Appearance_Log', Constants.PROGRAMS.REINTEGRATION.FORMS.COURT_APPEARANCE_LOG6_23_16);
                        data = data.replace('Initial_Family_Team_Meeting_w_Informed_Consent', Constants.PROGRAMS.REINTEGRATION.FORMS.INITIAL_FAMILY_TEAM_MEETING_INFORMED_CONSENT);
                        data = data.replace('Maternal_and_Paternal_Relative_Form', Constants.PROGRAMS.REINTEGRATION.FORMS.MATERNAL_AND_PATERNAL_RELATIVE_FORM7_21_16);
                        data = data.replace('Permanency_Release_or_Change_of_Status', Constants.PROGRAMS.REINTEGRATION.FORMS.PERMANENCY_RELEASE_OR_CHANGE_OF_STATUS);
                        // data = data.replace('Request_for_Financial_Assistance', Constants.PROGRAMS.REINTEGRATION.FORMS.REQUEST_FOR_FINANCIAL_ASSISTANCE);

                        return [data];
                    });
                    this.data.forms[0]['Reintegration'] = reintegrationUserRightsForm;
                }
                if (!isNullOrUndefined(data.UserRightsForm[3].familyPreservationUserRightsForm[0])) {
                    let familyPreservationUserRightsForm = data.UserRightsForm[3].familyPreservationUserRightsForm.filter(this.onlyUnique).map(data => {
                        data = data.replace('Supervisory_Staffing_Form', Constants.PROGRAMS.FAMILY_PRESERVATION.FORMS.SUPERVISORY_STAFFING_FORM_11_20_17_002);
                        return [data];
                    });
                    this.data.forms[1]['Family Preservation'] = familyPreservationUserRightsForm;
                }
                if (!isNullOrUndefined(data.UserRightsForm[4].oklahomaUserRightsForm[0])) {
                    let oklahomaUserRightsForm = data.UserRightsForm[4].oklahomaUserRightsForm.filter(this.onlyUnique).map(data => {
                        data = data.replace('Guide_for_Monthly_Resource_Home_Contact', 'Guide for Monthly Resource Home Contact');
                        return [data];
                    });
                    this.data.forms[3]['Oklahoma Foster Care Home'] = oklahomaUserRightsForm;
                }
                if (!isNullOrUndefined(data.UserRightsForm[1].behaviorUserRightsForm[0])) {
                    let behaviorUserRightsForm = data.UserRightsForm[1].behaviorUserRightsForm.filter(this.onlyUnique).map(data => {
                        data = data.replace('ASQ12months', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_12mo);
                        data = data.replace('ASQ18months', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_18mo);
                        data = data.replace('ASQ24months', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_24MO);
                        data = data.replace('ASQ2months', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_2MO);
                        data = data.replace('ASQ30months', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_30MO);
                        data = data.replace('ASQ36months', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_36MO);
                        data = data.replace('ASQ48months', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_48MO);
                        data = data.replace('ASQ60months', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_60MO);
                        data = data.replace('ASQ6months', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_6MO);
                        data = data.replace('CAFAS', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.CAFAS_SFCS10_2_17);
                        data = data.replace('CSDC', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.CSDC);
                        data = data.replace('NCFAS', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.NCFAS7_17_17);
                        data = data.replace('PECFAS', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.PECFAS_SFCS3_8_17);
                        data = data.replace('PSI', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.PS17_17_17);
                        data = data.replace('CROPS', Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.CROPS);
                        return [data];
                    });
                    this.data.forms[4]['Behavioral Assessments'] = behaviorUserRightsForm;
                }
            } else {
                console.log('No User Information Found');
            }
        }).catch(error => {
            console.log('Error in retieving user information', error);
        });
    }
}