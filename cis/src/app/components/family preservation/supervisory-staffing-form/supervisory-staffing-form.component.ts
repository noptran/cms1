import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Constants } from '../../../constants';
import { PouchDbService } from '../../../providers/pouchdb.service';
import * as moment from 'moment';
import { Fp } from './fp';
import { MatDialog } from '@angular/material';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { AlertDialogComponent } from '../../forms/alert-dialog/alert-dialog.component';
@Component({
  selector: 'supervisory-staffing-form',
  templateUrl: './supervisory-staffing-form.component.html',
  styleUrls: ['./supervisory-staffing-form.component.scss', '../../forms/forms-common.scss']
})
export class SupervisoryStaffingFormComponent implements OnInit {
  fp: Fp = new Fp();
  @Input() model: any;
  docId: string;
  date: string;
  ClientName: string;
  staffName: string;
  isFinalize = false;
  constructor(private route: ActivatedRoute, private pouchDBService: PouchDbService,
    public dialog: MatDialog, private formEditor: FormEditorComponent) {

  }
  setClient(client: any) {
    this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.clientId = client.clientID;
    this.model.Kaecses.value = client.kaecses;
    this.model.referralId = client.referralid;
  }
  displayClientName() {
    return this.model.ClientName.value;
  }
  ngOnInit() {
    let date = Date.now();
    this.date = moment(date).format('YYYY-MM-DD');
    this.docId = this.route.snapshot.paramMap.get('docId');
    // if its a new form
    if (!this.docId) {
      // staff detials
      this.pouchDBService.getUser().then(data => {
        if (data) {
          this.staffName = data.staffName + data.lastName;
          this.model.staffName = this.staffName;
          this.model.StaffSignature.value = this.staffName;
          this.model.personType = 'Supervisor - FP';
        } else {
          console.log('No User Information Found');
        }
      }).catch(error => {
        console.log('Error in retieving user information', error);
      });

      this.model.name = Constants.PROGRAMS.FAMILY_PRESERVATION.FORMS.SUPERVISORY_STAFFING_FORM_11_20_17_002;
      this.model.program = Constants.PROGRAMS.FAMILY_PRESERVATION.MENU_TITLE
      this.model.clientId = '';
      this.model.formName = this.model.name;
      Object.assign(this.model, {
        'ClientName': {
          'value': ''
        },
        'CompletionDate': {
          'value': this.date
        },
        'ReferralDate': {
          'value': ''
        },
        'Kaecses': {
          'value': ''
        },
        'CaseActivityBeginDate': {
          'value': ''
        },
        'FISMembers': {
          'value': ''
        },
        'CasePlanDates': {
          'value': ''
        },
        'SafetyPlanDates': {
          'value': ''
        },
        'StaffingDates': {
          'value': ''
        },
        'ReasonForReferral': {
          'value': ''
        },
        'PreviousSupervisoryStaffing': {
          'value': ''
        },
        'Director': {
          'value': ''
        },
        'Supervisor': {
          'value': ''
        },
        'TherapistCaseManager': {
          'value': ''
        },
        'FPCaseManager': {
          'value': ''
        },
        'FamilySupportWorker': {
          'value': ''
        },
        'OtherParticipants': {
          'value': ''
        },
        'FamilysStrengthsAndNeeds': {
          'value': ''
        },
        'SafetyPlan': {
          'fieldOptionIndex': ''
        },
        'RiskConcerns': {
          'fieldOptionIndex': ''
        },
        'RiskActivities': {
          'fieldOptionIndex': ''
        },
        'BarriersAndProgressNotes': {
          'value': ''
        },
        'RiskActivitiesNotes': {
          'value': ''
        },
        'SafetyPlanNotes': {
          'value': ''
        },
        'NextSteps': {
          'value': ''
        },
        'StaffSignature': {
          'value': ''
        },
        'Participants': {
          'value': ''
        },
        'Other': {
          'value': ''
        },
        'Monthly_Supervisory_Staffing': {
          'fieldOptionIndex': ''
        },
        'Intensive_to_NonIntensive': {
          'fieldOptionIndex': ''
        },
        'New_Safety_Concern': {
          'fieldOptionIndex': ''
        },
        'Case_Closure': {
          'fieldOptionIndex': ''
        },
        'Other_ReasonForStaffing': {
          'fieldOptionIndex': ''
        },
        'SafetyConcerns': {
          'fieldOptionIndex': ''
        },
      });
    }
  }
  resetForm() {
    this.formEditor.resetForm();
  }
  calculateForm() {
    this.formEditor.calculateForm();
  }
  saveForm() {
    this.formEditor.saveForm();
  }
  finalize() {
    // let value = [];
    // this.fp.valueArr.map((val) => {
    //   if (this.model[`${Object.keys(val)[0]}`].value === '') {
    //     value.push(Object.values(val)[0]);
    //   }
    // });
    // this.fp.optionIndex.map((val) => {
    //   if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '') {
    //     value.push(Object.values(val)[0]);
    //   }
    // });
    // if (value.length > 0) {
    //   this.dialog.open(AlertDialogComponent, {
    //     data: { labels: value }
    //   });
    // } else {
    //   this.formEditor.finalize();
    // }
    this.isFinalize = true;
    this.formEditor.finalize();
  }
}
