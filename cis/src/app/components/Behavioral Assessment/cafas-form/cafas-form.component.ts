import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Constants } from '../../../constants';
import * as moment from 'moment';
import { PouchDbService } from '../../../providers/pouchdb.service';
import { AlertDialogComponent } from '../../forms/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { Cafas } from './cafas';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'cafas-form',
  templateUrl: './cafas-form.component.html',
  styleUrls: ['./cafas-form.component.scss', '../../forms/forms-common.scss']
})
export class CafasFormComponent implements OnInit {
  cafas: Cafas = new Cafas();
  @Input() model: any;
  docId: string;
  date: any;
  staffName: string;
  clientDOB: string;
  isFinalize = false;
  constructor(private route: ActivatedRoute, private pouchDBService: PouchDbService, public dialog: MatDialog,
    private formEditor: FormEditorComponent) { }
  setClient(client: any) {
    this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.clientId = client.clientID;
    this.model.DateOfBirth.value = client.dob;
    this.model.referralId = client.referralid;
    this.clientDOB = client.dob;
    this.model.Gender.value = client.gender;
    this.model.Age.value = client.age;

  }
  displayClientName() {
    return this.model.ClientName.value;
  }
  disableValidationProcess() {
    if (this.model.disableValidate === true) {
      Object.assign(this.model, {
        'multiClient': [],
        'TimePeriod': {
          'fieldOptionIndex': ''
        },
        'Placement': {
          'fieldOptionIndex': ''
        },
        'CAFASAdmin': {
          'fieldOptionIndex': ''
        },
        'School1': {
          'fieldOptionIndex': ''
        },
        'School2': {
          'fieldOptionIndex': ''
        },
        'School3': {
          'fieldOptionIndex': ''
        },
        'School4': {
          'fieldOptionIndex': ''
        },
        'School5': {
          'fieldOptionIndex': ''
        },
        'School6': {
          'fieldOptionIndex': ''
        },
        'School7': {
          'fieldOptionIndex': ''
        },
        'School8': {
          'fieldOptionIndex': ''
        },
        'School9': {
          'fieldOptionIndex': ''
        },
        'School10': {
          'fieldOptionIndex': ''
        },
        'School12': {
          'fieldOptionIndex': ''
        },
        'School13': {
          'fieldOptionIndex': ''
        },
        'School14': {
          'fieldOptionIndex': ''
        },
        'School15': {
          'fieldOptionIndex': ''
        },
        'School16': {
          'fieldOptionIndex': ''
        },
        'School17': {
          'fieldOptionIndex': ''
        },
        'School18': {
          'fieldOptionIndex': ''
        },
        'School19': {
          'fieldOptionIndex': ''
        },
        'School20': {
          'fieldOptionIndex': ''
        },
        'School22': {
          'fieldOptionIndex': ''
        },
        'School23': {
          'fieldOptionIndex': ''
        },
        'School24': {
          'fieldOptionIndex': ''
        },
        'School25': {
          'fieldOptionIndex': ''
        },
        'School26': {
          'fieldOptionIndex': ''
        },
        'School28': {
          'fieldOptionIndex': ''
        },
        'School29': {
          'fieldOptionIndex': ''
        },
        'School30': {
          'fieldOptionIndex': ''
        },
        'School31': {
          'fieldOptionIndex': ''
        },
        'School32': {
          'fieldOptionIndex': ''
        },
        'School33': {
          'fieldOptionIndex': ''
        },
        'School34': {
          'fieldOptionIndex': ''
        },
        'School35': {
          'fieldOptionIndex': ''
        },
        'School36': {
          'fieldOptionIndex': ''
        },
        'School37': {
          'fieldOptionIndex': ''
        },
        'School38': {
          'fieldOptionIndex': ''
        },
        'CAF_SCHOOL': {
          'value': ''
        },
        'OtherTimePeriodTextBox': {
          'value': ''
        },
        'StaffName': {
          'value': this.staffName
        },
        'OtherReasonTextBox': {
          'value': ''
        },
        'Home41': {
          'fieldOptionIndex': ''
        },
        'Home42': {
          'fieldOptionIndex': ''
        },
        'Home43': {
          'fieldOptionIndex': ''
        },
        'Home44': {
          'fieldOptionIndex': ''
        },
        'Home45': {
          'fieldOptionIndex': ''
        },
        'Home46': {
          'fieldOptionIndex': ''
        },
        'Home47': {
          'fieldOptionIndex': ''
        },
        'Home48': {
          'fieldOptionIndex': ''
        },
        'Home49': {
          'fieldOptionIndex': ''
        },
        'Home51': {
          'fieldOptionIndex': ''
        },
        'Home52': {
          'fieldOptionIndex': ''
        },
        'Home53': {
          'fieldOptionIndex': ''
        },
        'Home54': {
          'fieldOptionIndex': ''
        },
        'Home55': {
          'fieldOptionIndex': ''
        },
        'Home57': {
          'fieldOptionIndex': ''
        },
        'Home58': {
          'fieldOptionIndex': ''
        },
        'Home59': {
          'fieldOptionIndex': ''
        },
        'Home60': {
          'fieldOptionIndex': ''
        },
        'Home62': {
          'fieldOptionIndex': ''
        },
        'Home63': {
          'fieldOptionIndex': ''
        },
        'CAF_HOME': {
          'value': ''
        },
        'Comment1': {
          'value': ''
        },
        'Comment2': {
          'value': ''
        },
        'Comment3': {
          'value': ''
        },
        'CAF_COMMUNITY': {
          'value': ''
        },
        'Community66': {
          'fieldOptionIndex': ''
        },
        'Community67': {
          'fieldOptionIndex': ''
        },
        'Community68': {
          'fieldOptionIndex': ''
        },
        'Community69': {
          'fieldOptionIndex': ''
        },
        'Community70': {
          'fieldOptionIndex': ''
        },
        'Community71': {
          'fieldOptionIndex': ''
        },
        'Community73': {
          'fieldOptionIndex': ''
        },
        'Community74': {
          'fieldOptionIndex': ''
        },
        'Community75': {
          'fieldOptionIndex': ''
        },
        'Community76': {
          'fieldOptionIndex': ''
        },
        'Community77': {
          'fieldOptionIndex': ''
        },
        'Community78': {
          'fieldOptionIndex': ''
        },
        'Community80': {
          'fieldOptionIndex': ''
        },
        'Community81': {
          'fieldOptionIndex': ''
        },
        'Community82': {
          'fieldOptionIndex': ''
        },
        'Community84': {
          'fieldOptionIndex': ''
        },
        'Community85': {
          'fieldOptionIndex': ''
        },
        'Moods118': {
          'fieldOptionIndex': ''
        },
        'Moods116': {
          'fieldOptionIndex': ''
        },
        'Moods117': {
          'fieldOptionIndex': ''
        },
        'Moods119': {
          'fieldOptionIndex': ''
        },
        'Moods121': {
          'fieldOptionIndex': ''
        },
        'Moods122': {
          'fieldOptionIndex': ''
        },
        'Moods123': {
          'fieldOptionIndex': ''
        },
        'Moods124': {
          'fieldOptionIndex': ''
        },
        'Moods125': {
          'fieldOptionIndex': ''
        },
        'Moods126': {
          'fieldOptionIndex': ''
        },
        'Moods128': {
          'fieldOptionIndex': ''
        },
        'Moods129': {
          'fieldOptionIndex': ''
        },
        'Moods130': {
          'fieldOptionIndex': ''
        },
        'Moods131': {
          'fieldOptionIndex': ''
        },
        'Moods132': {
          'fieldOptionIndex': ''
        },
        'Moods133': {
          'fieldOptionIndex': ''
        },
        'Moods134': {
          'fieldOptionIndex': ''
        },
        'Moods139': {
          'fieldOptionIndex': ''
        },
        'Moods138': {
          'fieldOptionIndex': ''
        },
        'Moods137': {
          'fieldOptionIndex': ''
        },
        'Moods136': {
          'fieldOptionIndex': ''
        },
        'Behavior88': {
          'fieldOptionIndex': ''
        },
        'Behavior89': {
          'fieldOptionIndex': ''
        },
        'Behavior90': {
          'fieldOptionIndex': ''
        },
        'Behavior91': {
          'fieldOptionIndex': ''
        },
        'Behavior93': {
          'fieldOptionIndex': ''
        },
        'Behavior94': {
          'fieldOptionIndex': ''
        },
        'Behavior95': {
          'fieldOptionIndex': ''
        },
        'Behavior96': {
          'fieldOptionIndex': ''
        },
        'Behavior97': {
          'fieldOptionIndex': ''
        },
        'Behavior98': {
          'fieldOptionIndex': ''
        },
        'Behavior99': {
          'fieldOptionIndex': ''
        },
        'Behavior100': {
          'fieldOptionIndex': ''
        },
        'Behavior101': {
          'fieldOptionIndex': ''
        },
        'Behavior103': {
          'fieldOptionIndex': ''
        },
        'Behavior104': {
          'fieldOptionIndex': ''
        },
        'Behavior105': {
          'fieldOptionIndex': ''
        },
        'Behavior106': {
          'fieldOptionIndex': ''
        },
        'Behavior107': {
          'fieldOptionIndex': ''
        },
        'Behavior108': {
          'fieldOptionIndex': ''
        },
        'Behavior109': {
          'fieldOptionIndex': ''
        },
        'Behavior111': {
          'fieldOptionIndex': ''
        },
        'Behavior112': {
          'fieldOptionIndex': ''
        },
        'Behavior113': {
          'fieldOptionIndex': ''
        },
        'CAF_MOODS': {
          'value': ''
        },
        'CAF_BEHAVIOR': {
          'value': ''
        },
        'Comment4': {
          'value': ''
        },
        'Comment5': {
          'value': ''
        },
        'Substance154': {
          'fieldOptionIndex': ''
        },
        'Substance155': {
          'fieldOptionIndex': ''
        },
        'Substance156': {
          'fieldOptionIndex': ''
        },
        'Substance157': {
          'fieldOptionIndex': ''
        },
        'Substance158': {
          'fieldOptionIndex': ''
        },
        'Substance159': {
          'fieldOptionIndex': ''
        },
        'Substance160': {
          'fieldOptionIndex': ''
        },
        'Substance161': {
          'fieldOptionIndex': ''
        },
        'Substance165': {
          'fieldOptionIndex': ''
        },
        'Substance166': {
          'fieldOptionIndex': ''
        },
        'Substance167': {
          'fieldOptionIndex': ''
        },
        'Substance168': {
          'fieldOptionIndex': ''
        },
        'Substance169': {
          'fieldOptionIndex': ''
        },
        'Substance172': {
          'fieldOptionIndex': ''
        },
        'Substance173': {
          'fieldOptionIndex': ''
        },
        'Substance176': {
          'fieldOptionIndex': ''
        },
        'Substance177': {
          'fieldOptionIndex': ''
        },
        'Substance178': {
          'fieldOptionIndex': ''
        },
        'Substance179': {
          'fieldOptionIndex': ''
        },
        'SelfHarm142': {
          'fieldOptionIndex': ''
        },
        'SelfHarm143': {
          'fieldOptionIndex': ''
        },
        'SelfHarm144': {
          'fieldOptionIndex': ''
        },
        'SelfHarm146': {
          'fieldOptionIndex': ''
        },
        'SelfHarm147': {
          'fieldOptionIndex': ''
        },
        'SelfHarm149': {
          'fieldOptionIndex': ''
        },
        'SelfHarm151': {
          'fieldOptionIndex': ''
        },
        'CAF_SUBSTANCE_USE': {
          'value': ''
        },
        'CAF_SELFHARM': {
          'value': ''
        },
        'Comment6': {
          'value': ''
        },
        'Comment7': {
          'value': ''
        },
        'Substance162': {
          'fieldOptionIndex': ''
        },
        'CAF_COMMUNICATION': {
          'value': ''
        },
        'Thinking182': {
          'fieldOptionIndex': ''
        },
        'Thinking183': {
          'fieldOptionIndex': ''
        },
        'Thinking184': {
          'fieldOptionIndex': ''
        },
        'Thinking185': {
          'fieldOptionIndex': ''
        },
        'Thinking187': {
          'fieldOptionIndex': ''
        },
        'Thinking188': {
          'fieldOptionIndex': ''
        },
        'Thinking189': {
          'fieldOptionIndex': ''
        },
        'Thinking190': {
          'fieldOptionIndex': ''
        },
        'Thinking191': {
          'fieldOptionIndex': ''
        },
        'Thinking193': {
          'fieldOptionIndex': ''
        },
        'Thinking194': {
          'fieldOptionIndex': ''
        },
        'Thinking195': {
          'fieldOptionIndex': ''
        },
        'Thinking196': {
          'fieldOptionIndex': ''
        },
        'Thinking198': {
          'fieldOptionIndex': ''
        },
        'Comment8': {
          'value': ''
        },
        'CAF_TOTAL': {
          'value': ''
        },
      });
    } else {
      Object.assign(this.model, {
        'remarks': {
          'value': ''
        }
      });
    }
  }
  ngOnInit() {
    this.date = new Date();
    this.docId = this.route.snapshot.paramMap.get('docId');
    // staff detials
    this.pouchDBService.getUser().then(data => {
      if (data) {
        this.staffName = data.staffName + data.lastName;
        this.model.staffName = this.staffName;
        this.model.staffName.value = this.staffName;
      } else {
        console.log('No User Information Found');
      }
    }).catch(error => {
      console.log('Error in retieving user information', error);
    });
    // if its a new form
    if (!this.docId) {
      this.model.name = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.CAFAS_SFCS10_2_17;
      this.model.program = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      this.model.validationFields = ['CompletionDate', 'staffName', 'ClientName', 'DateOfBirth',
        'AdmissionDate', 'Gender', 'Age', 'TimePeriod',
        'Placement', 'CAFASAdmin', 'OtherReasonTextBox',
        'CAF_SCHOOL', 'Comment1', 'CAF_HOME', 'Comment2', 'CAF_COMMUNITY', 'Comment3',
        'Comment4', 'CAF_BEHAVIOR', 'CAF_MOODS', 'Comment5', 'CAF_SELFHARM',
        'Comment6', 'CAF_SUBSTANCE_USE', 'Comment7', 'CAF_COMMUNICATION',
        'Comment8', 'CAF_TOTAL'];
      this.model.disableValidationFields = ['ClientName', 'remarks']

      Object.assign(this.model, {
        'CompletionDate': {
          'value': this.date
        },
        'AdmissionDate': {
          'value': ''
        },
        'DateOfBirth': {
          'value': ''
        },
        'TimePeriod': {
          'fieldOptionIndex': ''
        },
        'Placement': {
          'fieldOptionIndex': ''
        },
        'CAFASAdmin': {
          'fieldOptionIndex': ''
        },
        'School1': {
          'fieldOptionIndex': ''
        },
        'School2': {
          'fieldOptionIndex': ''
        },
        'School3': {
          'fieldOptionIndex': ''
        },
        'School4': {
          'fieldOptionIndex': ''
        },
        'School5': {
          'fieldOptionIndex': ''
        },
        'School6': {
          'fieldOptionIndex': ''
        },
        'School7': {
          'fieldOptionIndex': ''
        },
        'School8': {
          'fieldOptionIndex': ''
        },
        'School9': {
          'fieldOptionIndex': ''
        },
        'School10': {
          'fieldOptionIndex': ''
        },
        'School12': {
          'fieldOptionIndex': ''
        },
        'School13': {
          'fieldOptionIndex': ''
        },
        'School14': {
          'fieldOptionIndex': ''
        },
        'School15': {
          'fieldOptionIndex': ''
        },
        'School16': {
          'fieldOptionIndex': ''
        },
        'School17': {
          'fieldOptionIndex': ''
        },
        'School18': {
          'fieldOptionIndex': ''
        },
        'School19': {
          'fieldOptionIndex': ''
        },
        'School20': {
          'fieldOptionIndex': ''
        },
        'School22': {
          'fieldOptionIndex': ''
        },
        'School23': {
          'fieldOptionIndex': ''
        },
        'School24': {
          'fieldOptionIndex': ''
        },
        'School25': {
          'fieldOptionIndex': ''
        },
        'School26': {
          'fieldOptionIndex': ''
        },
        'School28': {
          'fieldOptionIndex': ''
        },
        'School29': {
          'fieldOptionIndex': ''
        },
        'School30': {
          'fieldOptionIndex': ''
        },
        'School31': {
          'fieldOptionIndex': ''
        },
        'School32': {
          'fieldOptionIndex': ''
        },
        'School33': {
          'fieldOptionIndex': ''
        },
        'School34': {
          'fieldOptionIndex': ''
        },
        'School35': {
          'fieldOptionIndex': ''
        },
        'School36': {
          'fieldOptionIndex': ''
        },
        'School37': {
          'fieldOptionIndex': ''
        },
        'School38': {
          'fieldOptionIndex': ''
        },
        'ClientName': {
          'value': ''
        },
        'Age': {
          'value': ''
        },
        'Gender': {
          'value': ''
        },
        'CAF_SCHOOL': {
          'value': ''
        },
        'OtherTimePeriodTextBox': {
          'value': ''
        },
        'StaffName': {
          'value': this.staffName
        },
        'OtherReasonTextBox': {
          'value': ''
        },
        'Home41': {
          'fieldOptionIndex': ''
        },
        'Home42': {
          'fieldOptionIndex': ''
        },
        'Home43': {
          'fieldOptionIndex': ''
        },
        'Home44': {
          'fieldOptionIndex': ''
        },
        'Home45': {
          'fieldOptionIndex': ''
        },
        'Home46': {
          'fieldOptionIndex': ''
        },
        'Home47': {
          'fieldOptionIndex': ''
        },
        'Home48': {
          'fieldOptionIndex': ''
        },
        'Home49': {
          'fieldOptionIndex': ''
        },
        'Home51': {
          'fieldOptionIndex': ''
        },
        'Home52': {
          'fieldOptionIndex': ''
        },
        'Home53': {
          'fieldOptionIndex': ''
        },
        'Home54': {
          'fieldOptionIndex': ''
        },
        'Home55': {
          'fieldOptionIndex': ''
        },
        'Home57': {
          'fieldOptionIndex': ''
        },
        'Home58': {
          'fieldOptionIndex': ''
        },
        'Home59': {
          'fieldOptionIndex': ''
        },
        'Home60': {
          'fieldOptionIndex': ''
        },
        'Home62': {
          'fieldOptionIndex': ''
        },
        'Home63': {
          'fieldOptionIndex': ''
        },
        'CAF_HOME': {
          'value': ''
        },
        'Comment1': {
          'value': ''
        },
        'Comment2': {
          'value': ''
        },
        'Comment3': {
          'value': ''
        },
        'CAF_COMMUNITY': {
          'value': ''
        },
        'Community66': {
          'fieldOptionIndex': ''
        },
        'Community67': {
          'fieldOptionIndex': ''
        },
        'Community68': {
          'fieldOptionIndex': ''
        },
        'Community69': {
          'fieldOptionIndex': ''
        },
        'Community70': {
          'fieldOptionIndex': ''
        },
        'Community71': {
          'fieldOptionIndex': ''
        },
        'Community73': {
          'fieldOptionIndex': ''
        },
        'Community74': {
          'fieldOptionIndex': ''
        },
        'Community75': {
          'fieldOptionIndex': ''
        },
        'Community76': {
          'fieldOptionIndex': ''
        },
        'Community77': {
          'fieldOptionIndex': ''
        },
        'Community78': {
          'fieldOptionIndex': ''
        },
        'Community80': {
          'fieldOptionIndex': ''
        },
        'Community81': {
          'fieldOptionIndex': ''
        },
        'Community82': {
          'fieldOptionIndex': ''
        },
        'Community84': {
          'fieldOptionIndex': ''
        },
        'Community85': {
          'fieldOptionIndex': ''
        },
        'Moods118': {
          'fieldOptionIndex': ''
        },
        'Moods116': {
          'fieldOptionIndex': ''
        },
        'Moods117': {
          'fieldOptionIndex': ''
        },
        'Moods119': {
          'fieldOptionIndex': ''
        },
        'Moods121': {
          'fieldOptionIndex': ''
        },
        'Moods122': {
          'fieldOptionIndex': ''
        },
        'Moods123': {
          'fieldOptionIndex': ''
        },
        'Moods124': {
          'fieldOptionIndex': ''
        },
        'Moods125': {
          'fieldOptionIndex': ''
        },
        'Moods126': {
          'fieldOptionIndex': ''
        },
        'Moods128': {
          'fieldOptionIndex': ''
        },
        'Moods129': {
          'fieldOptionIndex': ''
        },
        'Moods130': {
          'fieldOptionIndex': ''
        },
        'Moods131': {
          'fieldOptionIndex': ''
        },
        'Moods132': {
          'fieldOptionIndex': ''
        },
        'Moods133': {
          'fieldOptionIndex': ''
        },
        'Moods134': {
          'fieldOptionIndex': ''
        },
        'Moods139': {
          'fieldOptionIndex': ''
        },
        'Moods138': {
          'fieldOptionIndex': ''
        },
        'Moods137': {
          'fieldOptionIndex': ''
        },
        'Moods136': {
          'fieldOptionIndex': ''
        },
        'Behavior88': {
          'fieldOptionIndex': ''
        },
        'Behavior89': {
          'fieldOptionIndex': ''
        },
        'Behavior90': {
          'fieldOptionIndex': ''
        },
        'Behavior91': {
          'fieldOptionIndex': ''
        },
        'Behavior93': {
          'fieldOptionIndex': ''
        },
        'Behavior94': {
          'fieldOptionIndex': ''
        },
        'Behavior95': {
          'fieldOptionIndex': ''
        },
        'Behavior96': {
          'fieldOptionIndex': ''
        },
        'Behavior97': {
          'fieldOptionIndex': ''
        },
        'Behavior98': {
          'fieldOptionIndex': ''
        },
        'Behavior99': {
          'fieldOptionIndex': ''
        },
        'Behavior100': {
          'fieldOptionIndex': ''
        },
        'Behavior101': {
          'fieldOptionIndex': ''
        },
        'Behavior103': {
          'fieldOptionIndex': ''
        },
        'Behavior104': {
          'fieldOptionIndex': ''
        },
        'Behavior105': {
          'fieldOptionIndex': ''
        },
        'Behavior106': {
          'fieldOptionIndex': ''
        },
        'Behavior107': {
          'fieldOptionIndex': ''
        },
        'Behavior108': {
          'fieldOptionIndex': ''
        },
        'Behavior109': {
          'fieldOptionIndex': ''
        },
        'Behavior111': {
          'fieldOptionIndex': ''
        },
        'Behavior112': {
          'fieldOptionIndex': ''
        },
        'Behavior113': {
          'fieldOptionIndex': ''
        },
        'CAF_MOODS': {
          'value': ''
        },
        'CAF_BEHAVIOR': {
          'value': ''
        },
        'Comment4': {
          'value': ''
        },
        'Comment5': {
          'value': ''
        },
        'Substance154': {
          'fieldOptionIndex': ''
        },
        'Substance155': {
          'fieldOptionIndex': ''
        },
        'Substance156': {
          'fieldOptionIndex': ''
        },
        'Substance157': {
          'fieldOptionIndex': ''
        },
        'Substance158': {
          'fieldOptionIndex': ''
        },
        'Substance159': {
          'fieldOptionIndex': ''
        },
        'Substance160': {
          'fieldOptionIndex': ''
        },
        'Substance161': {
          'fieldOptionIndex': ''
        },
        'Substance165': {
          'fieldOptionIndex': ''
        },
        'Substance166': {
          'fieldOptionIndex': ''
        },
        'Substance167': {
          'fieldOptionIndex': ''
        },
        'Substance168': {
          'fieldOptionIndex': ''
        },
        'Substance169': {
          'fieldOptionIndex': ''
        },
        'Substance172': {
          'fieldOptionIndex': ''
        },
        'Substance173': {
          'fieldOptionIndex': ''
        },
        'Substance176': {
          'fieldOptionIndex': ''
        },
        'Substance177': {
          'fieldOptionIndex': ''
        },
        'Substance178': {
          'fieldOptionIndex': ''
        },
        'Substance179': {
          'fieldOptionIndex': ''
        },
        'SelfHarm142': {
          'fieldOptionIndex': ''
        },
        'SelfHarm143': {
          'fieldOptionIndex': ''
        },
        'SelfHarm144': {
          'fieldOptionIndex': ''
        },
        'SelfHarm146': {
          'fieldOptionIndex': ''
        },
        'SelfHarm147': {
          'fieldOptionIndex': ''
        },
        'SelfHarm149': {
          'fieldOptionIndex': ''
        },
        'SelfHarm151': {
          'fieldOptionIndex': ''
        },
        'CAF_SUBSTANCE_USE': {
          'value': ''
        },
        'CAF_SELFHARM': {
          'value': ''
        },
        'Comment6': {
          'value': ''
        },
        'Comment7': {
          'value': ''
        },
        'Substance162': {
          'fieldOptionIndex': ''
        },
        'CAF_COMMUNICATION': {
          'value': ''
        },
        'Thinking182': {
          'fieldOptionIndex': ''
        },
        'Thinking183': {
          'fieldOptionIndex': ''
        },
        'Thinking184': {
          'fieldOptionIndex': ''
        },
        'Thinking185': {
          'fieldOptionIndex': ''
        },
        'Thinking187': {
          'fieldOptionIndex': ''
        },
        'Thinking188': {
          'fieldOptionIndex': ''
        },
        'Thinking189': {
          'fieldOptionIndex': ''
        },
        'Thinking190': {
          'fieldOptionIndex': ''
        },
        'Thinking191': {
          'fieldOptionIndex': ''
        },
        'Thinking193': {
          'fieldOptionIndex': ''
        },
        'Thinking194': {
          'fieldOptionIndex': ''
        },
        'Thinking195': {
          'fieldOptionIndex': ''
        },
        'Thinking196': {
          'fieldOptionIndex': ''
        },
        'Thinking198': {
          'fieldOptionIndex': ''
        },
        'Comment8': {
          'value': ''
        },
        'CAF_TOTAL': {
          'value': ''
        },
        'disableValidate': false,
        'remarks': {
          'value': ''
        }
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
    if (this.model.disableValidate === true) {
      this.model.disableValidationFields.filter(data => {
        if ((this.model[data].value === "") || (this.model[data].fieldOptionIndex === "")) {
          value.push(data);
        }
      });
    } else if (this.model.disableValidate === false) {
      this.otherSpecifyValidation();
      this.cafas.valueArr.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].value === '') {
          value.push(Object.values(val)[0]);
        }
      });
      this.cafas.optionIndex.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '') {
          value.push(Object.values(val)[0]);
        }
      });
    }
    if (value.length > 0) {
      this.dialog.open(AlertDialogComponent, {
        data: { labels: value }
      });
    } else {
      if (this.model.disableValidate === false) {
      this.requiredFields();
      }
      this.isFinalize = true;
      this.formEditor.finalize();
    }
  }
  requiredFields() {
    this.model.SectionScores = {
      Total: this.model.CAF_TOTAL.value,
      Substance: this.model.CAF_SUBSTANCE_USE.value,
      SelfHarm: this.model.CAF_SELFHARM.value,
      Moods: this.model.CAF_MOODS.value,
      Community: this.model.CAF_COMMUNITY.value,
      School: this.model.CAF_SCHOOL.value,
      Home: this.model.CAF_HOME.value,
      Thinking: this.model.CAF_COMMUNICATION.value
    }
  }

  otherSpecifyValidation() {
    if (!isNullOrUndefined(this.model.TimePeriod.fieldOptionIndex)) {
      if (this.model.TimePeriod.fieldOptionIndex === '2') {
        this.cafas.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'OtherTimePeriodTextBox') {
            this.cafas.valueArr.splice(index, 1);
          }
        });
        this.cafas.valueArr.push({ OtherTimePeriodTextBox: 'TIME PERIOD RATED FOR CAFAS (Other)' });
      } else {
        this.cafas.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'OtherTimePeriodTextBox') {
            this.cafas.valueArr.splice(index, 1);
          }
        });
      }
    }
    if (!isNullOrUndefined(this.model.CAFASAdmin.fieldOptionIndex)) {
      if (this.model.CAFASAdmin.fieldOptionIndex === '13') {
        this.cafas.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'OtherReasonTextBox') {
            this.cafas.valueArr.splice(index, 1);
          }
        });
        this.cafas.valueArr.push({ OtherReasonTextBox: 'CAFAS ADMINISTRATION Other' });
      } else {
        this.cafas.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'OtherReasonTextBox') {
            this.cafas.valueArr.splice(index, 1);
          }
        });
      }
    }

  }
}
