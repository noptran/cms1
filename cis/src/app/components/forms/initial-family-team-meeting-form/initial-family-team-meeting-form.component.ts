import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '../../../constants';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { PouchDbService } from '../../../providers/pouchdb.service';
import * as moment from 'moment';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { InitialFamily } from './initialFamily';
@Component({
  selector: 'initial-family-team-meeting-form',
  templateUrl: './initial-family-team-meeting-form.component.html',
  styleUrls: ['./initial-family-team-meeting-form.component.scss', './../forms-common.scss']
})
export class InitialFamilyTeamMeetingFormComponent implements OnInit {
  initialFamily: InitialFamily = new InitialFamily();
  @Input() model: any;
  date: string;
  docId: string;
  ClientName: string;
  staffName: string;
  isFinalize = false;
  constructor(private route: ActivatedRoute, private pouchDBService: PouchDbService,
    private formEditor: FormEditorComponent, public dialog: MatDialog
  ) {

  }
  setClient(client: any) {
    this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.clientId = client.clientID;
    this.model.facts.value = client.facts;
    this.model.referralId = client.referralid;
    if (client.facts === null || client.facts === undefined || client.facts === '') {
      this.model.facts.value = 'NA'
    }
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
          this.model.SFCSworker.value = this.staffName;
        } else {
          console.log('No User Information Found');
        }
      }).catch(error => {
        console.log('Error in retieving user information', error);
      });

      this.model.name = Constants.PROGRAMS.REINTEGRATION.FORMS.INITIAL_FAMILY_TEAM_MEETING_INFORMED_CONSENT;
      this.model.program = Constants.PROGRAMS.REINTEGRATION.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = 'Initial Family/Team Meeting';
      Object.assign(this.model, {
        'ClientName': {
          'value': ''
        },
        'facts': {
          'value': ''
        },
        'dateTime': {
          'value': ''
        },
        'SFCSworker': {
          'value': ''
        },
        'Location': {
          'value': ''
        },
        'safetyConcerns': {
          'value': ''
        },
        'Rolesresponsiblities': {
          'fieldOptionIndex': ''
        },
        'homeplacement': {
          'fieldOptionIndex': ''
        },
        'SafetyPlan': {
          'fieldOptionIndex': ''
        },
        'Riskconcerns': {
          'fieldOptionIndex': ''
        },
        'familyStrengths': {
          'value': ''
        },
        'ServicePlan': {
          'fieldOptionIndex': ''
        },
        'AnnualHousehold': {
          'fieldOptionIndex': ''
        },
        'SingleParent': {
          'fieldOptionIndex': ''
        },
        'Introduction': {
          'fieldOptionIndex': ''
        },
        'appointments': {
          'fieldOptionIndex': ''
        },
        'questionsComments': {
          'fieldOptionIndex': ''
        },
        'neededAssessments': {
          'fieldOptionIndex': ''
        },
        'releasesSigned': {
          'fieldOptionIndex': ''
        },
        'InitialCasePlanDate': {
          'value': ''
        },
        'InitialCasePlanTime': {
          'value': ''
        },
        'InitialCasePlanNotes': {
          'value': ''
        },
        'NextCourtHearingDate': {
          'value': ''
        },
        'NextCourtHearingTime': {
          'value': ''
        },
        'NextCourtHearingNotes': {
          'value': ''
        },
        'NextVisitDate': {
          'value': ''
        },
        'NextVisitTime': {
          'value': ''
        },
        'NextVisitNotes': {
          'value': ''
        },
        'ParentsCaregiversDate': {
          'value': ''
        },
        'ParentsCaregiversTime': {
          'value': ''
        },
        'ParentsCaregiversNotes': {
          'value': ''
        },
        'clientRightClient': {
          'value': ''
        },
        'clientRightGuardian': {
          'value': ''
        },
        'privacyClient': {
          'value': ''
        },
        'privacyGuardian': {
          'value': ''
        },
        'mandatedClient': {
          'value': ''
        },
        'mandatedGuardian': {
          'value': ''
        },
        'providerClient': {
          'value': ''
        },
        'providerGuardian': {
          'value': ''
        },
        'communicationClient': {
          'value': ''
        },
        'communicationGuardian': {
          'value': ''
        },
        'sensoryImpairment': {
          'fieldOptionIndex': ''
        },
        'communicationSensoryImpairment': {
          'value': ''
        },
        'Provision': {
          'value': ''
        },
        'proficiencyGuardian': {
          'value': ''
        },
        'proficiencyClient': {
          'value': ''
        },
        'clientSensoryImpairment': {
          'fieldOptionIndex': ''
        },
        'Communication': {
          'value': ''
        },
        'PreferredLanguage': {
          'value': ''
        },
        'photographsSFCSstaffClient': {
          'value': ''
        },
        'photographsSFCSstaffGuardian': {
          'value': ''
        },
        'photographsSFCSNonstaffClient': {
          'value': ''
        },
        'photographsSFCSNonstaffGuardian': {
          'value': ''
        },
        'emailConsentGuardian': {
          'value': ''
        },
        'emailConsentClient': {
          'value': ''
        },
        'grievanceGuardian': {
          'value': ''
        },
        'grievanceClient': {
          'value': ''
        },
        'customerCareGuardian': {
          'value': ''
        },
        'customerCareClient': {
          'value': ''
        },
        'authorized': {
          'fieldOptionIndex': ''
        },
        'notauthorized': {
          'fieldOptionIndex': ''
        },
        'careServiceClient': {
          'value': ''
        },
        'careServiceGuardian': {
          'value': ''
        },
        'immunizationClient': {
          'value': ''
        },
        'immunizationGuardian': {
          'value': ''
        },
        'ClientSignature': {
          'value': ''
        },
        'CaregiverSignature': {
          'value': ''
        },
        'CaregiverSignature1': {
          'value': ''
        },
        'CaregiverSignature2': {
          'value': ''
        },
        'CaregiverSignature3': {
          'value': ''
        },
        'Signature1': {
          'value': ''
        },
        'Signature2': {
          'value': ''
        },
        'Signature3': {
          'value': ''
        },
        'dcfSignature1': {
          'value': ''
        },
        'dcfSignature2': {
          'value': ''
        },
        'dcfSignature3': {
          'value': ''
        },
        'SFCSSignature1': {
          'value': ''
        },
        'SFCSSignature2': {
          'value': ''
        },
        'SFCSSignature3': {
          'value': ''
        },
        'RelativeKinship': {
          'fieldOptionIndex': ''
        },
        'AnnualHouseholdInput': {
          'value': ''
        },
        'NumberlivingHousehold': {
          'value': ''
        },
        'ParentquestionsComments': {
          'value': ''
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
    let value = [];
    this.initialFamily.valueArr.map((val) => {
      if (this.model[`${Object.keys(val)[0]}`].value === '') {
        value.push(Object.values(val)[0]);
      }
    });
    this.initialFamily.optionIndex.map((val) => {
      if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '') {
        value.push(Object.values(val)[0]);
      }
    });
    if (value.length > 0) {
      this.dialog.open(AlertDialogComponent, {
        data: { labels: value }
      });
    } else {
      this.isFinalize = true;
      this.formEditor.finalize();
    }
  }
}
