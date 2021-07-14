import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Constants } from '../../../constants';
import * as moment from 'moment';
import { PouchDbService } from '../../../providers/pouchdb.service';
import { AlertDialogComponent } from '../../forms/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { Pecfas } from './pecfas';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'pecfas-form',
  templateUrl: './pecfas-form.component.html',
  styleUrls: ['./pecfas-form.component.scss', '../../forms/forms-common.scss']
})
export class PECFASFormComponent implements OnInit {
  pecfas: Pecfas = new Pecfas();
  @Input() model: any;
  docId: string;
  date: any;
  staffName: string;
  clientDOB: string;
  isFinalize = false;
  constructor(private route: ActivatedRoute, private pouchDBService: PouchDbService,
    public dialog: MatDialog,
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
        'PEFASAdmin': {
          'fieldOptionIndex': ''
        },
        'PhoneContactParent': {
          'fieldOptionIndex': ''
        },
        'PhoneContactChild': {
          'fieldOptionIndex': ''
        },
        'PhoneContactFoster': {
          'fieldOptionIndex': ''
        },
        'PhoneContactJuvenile': {
          'fieldOptionIndex': ''
        },
        'PhoneContactSocial': {
          'fieldOptionIndex': ''
        },
        'PhoneContactMental': {
          'fieldOptionIndex': ''
        },
        'PhoneContactPublic': {
          'fieldOptionIndex': ''
        },
        'PhoneContactOther': {
          'fieldOptionIndex': ''
        },
        'PhoneContactSchoolDaycare': {
          'fieldOptionIndex': ''
        },
        'ReviewofDocumentationSchoolDaycare': {
          'fieldOptionIndex': ''
        },
        'ReviewofDocumentationJuvenile': {
          'fieldOptionIndex': ''
        },
        'ReviewofDocumentationSocial': {
          'fieldOptionIndex': ''
        },
        'ReviewofDocumentationMental': {
          'fieldOptionIndex': ''
        },
        'ReviewofDocumentationPublic': {
          'fieldOptionIndex': ''
        },
        'ReviewofDocumentationOther': {
          'fieldOptionIndex': ''
        },
        'ContactPersonParent': {
          'fieldOptionIndex': ''
        },
        'ContactPersonChild': {
          'fieldOptionIndex': ''
        },
        'ContactPersonSchoolDaycare': {
          'fieldOptionIndex': ''
        },
        'ContactPersonFoster': {
          'fieldOptionIndex': ''
        },
        'ContactPersonJuvenile': {
          'fieldOptionIndex': ''
        },
        'ContactPersonSocial': {
          'fieldOptionIndex': ''
        },
        'ContactPersonMental': {
          'fieldOptionIndex': ''
        },
        'ContactPersonPublic': {
          'fieldOptionIndex': ''
        },
        'ContactPersonOther': {
          'fieldOptionIndex': ''
        },
        'TextBox1': {
          'value': ''
        },
        'TextBox2': {
          'value': ''
        },
        'TextBox4': {
          'value': ''
        },
        'TextBox5': {
          'value': ''
        },
        'TextBox3': {
          'value': ''
        },
        'TextBox6': {
          'value': ''
        },
        'TextBox7': {
          'value': ''
        },
        'Rater': {
          'fieldOptionIndex': ''
        },
        'TimePeriod': {
          'fieldOptionIndex': ''
        },
        'LivingArrangement': {
          'fieldOptionIndex': ''
        },
        'OutOfHome': {
          'fieldOptionIndex': ''
        },
        'School': {
          'fieldOptionIndex': ''
        },
        'ReviewofDocumentation': {
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
        'School10': {
          'fieldOptionIndex': ''
        },
        'School11': {
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
        'School21': {
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
        'School27': {
          'fieldOptionIndex': ''
        },
        'School28': {
          'fieldOptionIndex': ''
        },
        'Home31': {
          'fieldOptionIndex': ''
        },
        'Home32': {
          'fieldOptionIndex': ''
        },
        'Home33': {
          'fieldOptionIndex': ''
        },
        'Home34': {
          'fieldOptionIndex': ''
        },
        'Home35': {
          'fieldOptionIndex': ''
        },
        'Home36': {
          'fieldOptionIndex': ''
        },
        'Home37': {
          'fieldOptionIndex': ''
        },
        'Home39': {
          'fieldOptionIndex': ''
        },
        'Home40': {
          'fieldOptionIndex': ''
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
        'Home50': {
          'fieldOptionIndex': ''
        },
        'Home51': {
          'fieldOptionIndex': ''
        },
        'Home52': {
          'fieldOptionIndex': ''
        },
        'Home54': {
          'fieldOptionIndex': ''
        },
        'Home55': {
          'fieldOptionIndex': ''
        },
        'Home56': {
          'fieldOptionIndex': ''
        },
        'Community59': {
          'fieldOptionIndex': ''
        },
        'Community60': {
          'fieldOptionIndex': ''
        },
        'Community61': {
          'fieldOptionIndex': ''
        },
        'Community62': {
          'fieldOptionIndex': ''
        },
        'Community63': {
          'fieldOptionIndex': ''
        },
        'Community64': {
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
        'Community72': {
          'fieldOptionIndex': ''
        },
        'Community73': {
          'fieldOptionIndex': ''
        },
        'Community74': {
          'fieldOptionIndex': ''
        },
        'Community76': {
          'fieldOptionIndex': ''
        },
        'Community77': {
          'fieldOptionIndex': ''
        },
        'Behavior80': {
          'fieldOptionIndex': ''
        },
        'Behavior81': {
          'fieldOptionIndex': ''
        },
        'Behavior82': {
          'fieldOptionIndex': ''
        },
        'Behavior83': {
          'fieldOptionIndex': ''
        },
        'Behavior84': {
          'fieldOptionIndex': ''
        },
        'Behavior86': {
          'fieldOptionIndex': ''
        },
        'Behavior87': {
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
        'Behavior92': {
          'fieldOptionIndex': ''
        },
        'Behavior93': {
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
        'Behavior102': {
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
        'Behavior109': {
          'fieldOptionIndex': ''
        },
        'Behavior110': {
          'fieldOptionIndex': ''
        },
        'Behavior111': {
          'fieldOptionIndex': ''
        },
        'Moods114': {
          'fieldOptionIndex': ''
        },
        'Moods115': {
          'fieldOptionIndex': ''
        },
        'Moods116': {
          'fieldOptionIndex': ''
        },
        'Moods117': {
          'fieldOptionIndex': ''
        },
        'Moods118': {
          'fieldOptionIndex': ''
        },
        'Moods119': {
          'fieldOptionIndex': ''
        },
        'Moods120': {
          'fieldOptionIndex': ''
        },
        'Moods121': {
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
        'Moods127': {
          'fieldOptionIndex': ''
        },
        'Moods128': {
          'fieldOptionIndex': ''
        },
        'Moods129': {
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
        'Moods135': {
          'fieldOptionIndex': ''
        },
        'Moods136': {
          'fieldOptionIndex': ''
        },
        'Moods137': {
          'fieldOptionIndex': ''
        },
        'Moods138': {
          'fieldOptionIndex': ''
        },
        'Moods139': {
          'fieldOptionIndex': ''
        },
        'Moods140': {
          'fieldOptionIndex': ''
        },
        'Moods142': {
          'fieldOptionIndex': ''
        },
        'Moods143': {
          'fieldOptionIndex': ''
        },
        'Moods144': {
          'fieldOptionIndex': ''
        },
        'Moods145': {
          'fieldOptionIndex': ''
        },
        'Moods146': {
          'fieldOptionIndex': ''
        },
        'Moods147': {
          'fieldOptionIndex': ''
        },
        'SelfHarm150': {
          'fieldOptionIndex': ''
        },
        'SelfHarm151': {
          'fieldOptionIndex': ''
        },
        'SelfHarm152': {
          'fieldOptionIndex': ''
        },
        'SelfHarm154': {
          'fieldOptionIndex': ''
        },
        'SelfHarm155': {
          'fieldOptionIndex': ''
        },
        'SelfHarm159': {
          'fieldOptionIndex': ''
        },
        'SelfHarm157': {
          'fieldOptionIndex': ''
        },
        'Thinking162': {
          'fieldOptionIndex': ''
        },
        'Thinking163': {
          'fieldOptionIndex': ''
        },
        'Thinking164': {
          'fieldOptionIndex': ''
        },
        'Thinking165': {
          'fieldOptionIndex': ''
        },
        'Thinking166': {
          'fieldOptionIndex': ''
        },
        'Thinking167': {
          'fieldOptionIndex': ''
        },
        'Thinking168': {
          'fieldOptionIndex': ''
        },
        'Thinking170': {
          'fieldOptionIndex': ''
        },
        'Thinking171': {
          'fieldOptionIndex': ''
        },
        'Thinking172': {
          'fieldOptionIndex': ''
        },
        'Thinking173': {
          'fieldOptionIndex': ''
        },
        'Thinking174': {
          'fieldOptionIndex': ''
        },
        'Thinking175': {
          'fieldOptionIndex': ''
        },
        'Thinking177': {
          'fieldOptionIndex': ''
        },
        'Thinking178': {
          'fieldOptionIndex': ''
        },
        'Thinking179': {
          'fieldOptionIndex': ''
        },
        'Thinking180': {
          'fieldOptionIndex': ''
        },
        'Thinking182': {
          'fieldOptionIndex': ''
        },
        'PEC_TOTAL': {
          'value': ''
        },
        'Comment1': {
          'value': ''
        },
        'PEC_SCHOOL': {
          'value': ''
        },
        'PEC_HOME': {
          'value': ''
        },
        'PEC_COMMUNITY': {
          'value': ''
        },
        'PEC_BEHAVIOR': {
          'value': ''
        },
        'PEC_MOODS': {
          'value': ''
        },
        'PEC_SELFHARM': {
          'value': ''
        },
        'PEC_COMMUNICATION': {
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

      } else {
        console.log('No User Information Found');
      }
    }).catch(error => {
      console.log('Error in retieving user information', error);
    });
    // if its a new form
    if (!this.docId) {
      this.model.name = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.PECFAS_SFCS3_8_17;
      this.model.program = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      this.model.validationFields = ['CompletionDate', 'staffName', 'ClientName', 'DateOfBirth',
        'AdmissionDate', 'Gender', 'Age', 'TimePeriod', 'Rater', 'PEFASAdmin', 'LivingArrangement',
        'PEC_SCHOOL', 'TextBox1', 'PEC_HOME', 'TextBox2', 'PEC_COMMUNITY', 'TextBox3',
        'OutOfHome', 'PEC_BEHAVIOR',
        'TextBox4', 'PEC_MOODS', 'TextBox5', 'PEC_SELFHARM', 'TextBox7', 'PEC_TOTAL',
        'TextBox6', 'PEC_COMMUNICATION', 'ContactPersonChild', 'ContactPersonParent', 'ContactPersonSchoolDaycare',
        'ContactPersonFoster', 'ContactPersonJuvenile', 'ContactPersonSocial', 'ContactPersonMental', 'ContactPersonPublic',
        'ContactPersonOther', 'PhoneContactSchoolDaycare', 'PhoneContactParent', 'PhoneContactChild', 'PhoneContactFoster',
        'PhoneContactJuvenile', 'PhoneContactSocial', 'PhoneContactMental', 'PhoneContactPublic', 'PhoneContactOther',
        'ReviewofDocumentationSchoolDaycare', 'ReviewofDocumentationJuvenile', 'ReviewofDocumentationSocial',
        'ReviewofDocumentationMental', 'ReviewofDocumentationPublic', 'ReviewofDocumentationOther'];
      this.model.disableValidationFields = ['ClientName', 'remarks']

      Object.assign(this.model, {
        'multiClient': [],
        'PEFASAdmin': {
          'fieldOptionIndex': ''
        },
        'ContactPersonOtherText': {
          'value': ''
        },
        'PhoneContactOtherText': {
          'value': ''
        },
        'ReviewofDocumentationOtherText': {
          'value': ''
        },
        'ContactPersonParent': {
          'fieldOptionIndex': ''
        },
        'ContactPersonChild': {
          'fieldOptionIndex': ''
        },
        'ContactPersonSchoolDaycare': {
          'fieldOptionIndex': ''
        },
        'ContactPersonFoster': {
          'fieldOptionIndex': ''
        },
        'ContactPersonJuvenile': {
          'fieldOptionIndex': ''
        },
        'ContactPersonSocial': {
          'fieldOptionIndex': ''
        },
        'ContactPersonMental': {
          'fieldOptionIndex': ''
        },
        'ContactPersonPublic': {
          'fieldOptionIndex': ''
        },
        'ContactPersonOther': {
          'fieldOptionIndex': ''
        },
        'PhoneContactParent': {
          'fieldOptionIndex': ''
        },
        'PhoneContactChild': {
          'fieldOptionIndex': ''
        },
        'PhoneContactFoster': {
          'fieldOptionIndex': ''
        },
        'PhoneContactJuvenile': {
          'fieldOptionIndex': ''
        },
        'PhoneContactSocial': {
          'fieldOptionIndex': ''
        },
        'PhoneContactMental': {
          'fieldOptionIndex': ''
        },
        'PhoneContactPublic': {
          'fieldOptionIndex': ''
        },
        'PhoneContactOther': {
          'fieldOptionIndex': ''
        },
        'PhoneContactSchoolDaycare': {
          'fieldOptionIndex': ''
        },
        'TextBox1': {
          'value': ''
        },
        'TextBox2': {
          'value': ''
        },
        'TextBox4': {
          'value': ''
        },
        'TextBox5': {
          'value': ''
        },
        'TextBox3': {
          'value': ''
        },
        'TextBox6': {
          'value': ''
        },
        'TextBox7': {
          'value': ''
        },
        'Rater': {
          'fieldOptionIndex': ''
        },
        'TimePeriod': {
          'fieldOptionIndex': ''
        },
        'LivingArrangement': {
          'fieldOptionIndex': ''
        },
        'OutOfHome': {
          'fieldOptionIndex': ''
        },
        'Gender': {
          'value': ''
        },
        'AdmissionDate': {
          'value': ''
        },
        'DateOfBirth': {
          'value': ''
        },
        'Age': {
          'value': ''
        },
        'School': {
          'fieldOptionIndex': ''
        },
        'ReviewofDocumentationSchoolDaycare': {
          'fieldOptionIndex': ''
        },
        'ReviewofDocumentationJuvenile': {
          'fieldOptionIndex': ''
        },
        'ReviewofDocumentationSocial': {
          'fieldOptionIndex': ''
        },
        'ReviewofDocumentationMental': {
          'fieldOptionIndex': ''
        },
        'ReviewofDocumentationPublic': {
          'fieldOptionIndex': ''
        },
        'ReviewofDocumentationOther': {
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
        'School10': {
          'fieldOptionIndex': ''
        },
        'School11': {
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
        'School21': {
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
        'School27': {
          'fieldOptionIndex': ''
        },
        'School28': {
          'fieldOptionIndex': ''
        },
        'Home31': {
          'fieldOptionIndex': ''
        },
        'Home32': {
          'fieldOptionIndex': ''
        },
        'Home33': {
          'fieldOptionIndex': ''
        },
        'Home34': {
          'fieldOptionIndex': ''
        },
        'Home35': {
          'fieldOptionIndex': ''
        },
        'Home36': {
          'fieldOptionIndex': ''
        },
        'Home37': {
          'fieldOptionIndex': ''
        },
        'Home39': {
          'fieldOptionIndex': ''
        },
        'Home40': {
          'fieldOptionIndex': ''
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
        'Home50': {
          'fieldOptionIndex': ''
        },
        'Home51': {
          'fieldOptionIndex': ''
        },
        'Home52': {
          'fieldOptionIndex': ''
        },
        'Home54': {
          'fieldOptionIndex': ''
        },
        'Home55': {
          'fieldOptionIndex': ''
        },
        'Home56': {
          'fieldOptionIndex': ''
        },
        'Community59': {
          'fieldOptionIndex': ''
        },
        'Community60': {
          'fieldOptionIndex': ''
        },
        'Community61': {
          'fieldOptionIndex': ''
        },
        'Community62': {
          'fieldOptionIndex': ''
        },
        'Community63': {
          'fieldOptionIndex': ''
        },
        'Community64': {
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
        'Community72': {
          'fieldOptionIndex': ''
        },
        'Community73': {
          'fieldOptionIndex': ''
        },
        'Community74': {
          'fieldOptionIndex': ''
        },
        'Community76': {
          'fieldOptionIndex': ''
        },
        'Community77': {
          'fieldOptionIndex': ''
        },
        'Behavior80': {
          'fieldOptionIndex': ''
        },
        'Behavior81': {
          'fieldOptionIndex': ''
        },
        'Behavior82': {
          'fieldOptionIndex': ''
        },
        'Behavior83': {
          'fieldOptionIndex': ''
        },
        'Behavior84': {
          'fieldOptionIndex': ''
        },
        'Behavior86': {
          'fieldOptionIndex': ''
        },
        'Behavior87': {
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
        'Behavior92': {
          'fieldOptionIndex': ''
        },
        'Behavior93': {
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
        'Behavior102': {
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
        'Behavior109': {
          'fieldOptionIndex': ''
        },
        'Behavior110': {
          'fieldOptionIndex': ''
        },
        'Behavior111': {
          'fieldOptionIndex': ''
        },
        'Moods114': {
          'fieldOptionIndex': ''
        },
        'Moods115': {
          'fieldOptionIndex': ''
        },
        'Moods116': {
          'fieldOptionIndex': ''
        },
        'Moods117': {
          'fieldOptionIndex': ''
        },
        'Moods118': {
          'fieldOptionIndex': ''
        },
        'Moods119': {
          'fieldOptionIndex': ''
        },
        'Moods120': {
          'fieldOptionIndex': ''
        },
        'Moods121': {
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
        'Moods127': {
          'fieldOptionIndex': ''
        },
        'Moods128': {
          'fieldOptionIndex': ''
        },
        'Moods129': {
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
        'Moods135': {
          'fieldOptionIndex': ''
        },
        'Moods136': {
          'fieldOptionIndex': ''
        },
        'Moods137': {
          'fieldOptionIndex': ''
        },
        'Moods138': {
          'fieldOptionIndex': ''
        },
        'Moods139': {
          'fieldOptionIndex': ''
        },
        'Moods140': {
          'fieldOptionIndex': ''
        },
        'Moods142': {
          'fieldOptionIndex': ''
        },
        'Moods143': {
          'fieldOptionIndex': ''
        },
        'Moods144': {
          'fieldOptionIndex': ''
        },
        'Moods145': {
          'fieldOptionIndex': ''
        },
        'Moods146': {
          'fieldOptionIndex': ''
        },
        'Moods147': {
          'fieldOptionIndex': ''
        },
        'SelfHarm150': {
          'fieldOptionIndex': ''
        },
        'SelfHarm151': {
          'fieldOptionIndex': ''
        },
        'SelfHarm152': {
          'fieldOptionIndex': ''
        },
        'SelfHarm154': {
          'fieldOptionIndex': ''
        },
        'SelfHarm155': {
          'fieldOptionIndex': ''
        },
        'SelfHarm159': {
          'fieldOptionIndex': ''
        },
        'SelfHarm157': {
          'fieldOptionIndex': ''
        },
        'Thinking162': {
          'fieldOptionIndex': ''
        },
        'Thinking163': {
          'fieldOptionIndex': ''
        },
        'Thinking164': {
          'fieldOptionIndex': ''
        },
        'Thinking165': {
          'fieldOptionIndex': ''
        },
        'Thinking166': {
          'fieldOptionIndex': ''
        },
        'Thinking167': {
          'fieldOptionIndex': ''
        },
        'Thinking168': {
          'fieldOptionIndex': ''
        },
        'Thinking170': {
          'fieldOptionIndex': ''
        },
        'Thinking171': {
          'fieldOptionIndex': ''
        },
        'Thinking172': {
          'fieldOptionIndex': ''
        },
        'Thinking173': {
          'fieldOptionIndex': ''
        },
        'Thinking174': {
          'fieldOptionIndex': ''
        },
        'Thinking175': {
          'fieldOptionIndex': ''
        },
        'Thinking177': {
          'fieldOptionIndex': ''
        },
        'Thinking178': {
          'fieldOptionIndex': ''
        },
        'Thinking179': {
          'fieldOptionIndex': ''
        },
        'Thinking180': {
          'fieldOptionIndex': ''
        },
        'Thinking182': {
          'fieldOptionIndex': ''
        },
        'PEC_TOTAL': {
          'value': ''
        },
        'CompletionDate': {
          'value': this.date
        },
        'StaffName': {
          'value': ''
        },
        'Comment1': {
          'value': ''
        },
        'PEC_SCHOOL': {
          'value': ''
        },
        'PEC_HOME': {
          'value': ''
        },
        'PEC_COMMUNITY': {
          'value': ''
        },
        'PEC_BEHAVIOR': {
          'value': ''
        },
        'PEC_MOODS': {
          'value': ''
        },
        'PEC_SELFHARM': {
          'value': ''
        },
        'PEC_COMMUNICATION': {
          'value': ''
        },
        'ClientName': {
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
      this.pecfas.valueArr.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].value === '') {
          value.push(Object.values(val)[0]);
        }
      });
      this.pecfas.optionIndex.map((val) => {
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
      this.requiredFields();
      this.isFinalize = true;
      this.formEditor.finalize();
    }
  }
  requiredFields() {
    if (this.model.disableValidate === false) {
      this.model.SectionScores = {
        Total: this.model.PEC_TOTAL.value,
        Behavior: this.model.PEC_BEHAVIOR.value,
        SelfHarm: this.model.PEC_SELFHARM.value,
        Moods: this.model.PEC_MOODS.value,
        School: this.model.PEC_SCHOOL.value,
        Home: this.model.PEC_HOME.value,
        Thinking: this.model.PEC_COMMUNICATION.value
      }
    }
  }
  otherSpecifyValidation() {
    if (!isNullOrUndefined(this.model.LivingArrangement.fieldOptionIndex)) {
      if (this.model.LivingArrangement.fieldOptionIndex === '3') {
        this.pecfas.optionIndex.map((val, index) => {
          if (Object.keys(val)[0] === 'OutOfHome') {
            this.pecfas.optionIndex.splice(index, 1);
          }
        });
        this.pecfas.optionIndex.push({ OutOfHome: 'Out of Home' });
      } else {
        this.pecfas.optionIndex.map((val, index) => {
          if (Object.keys(val)[0] === 'OutOfHome') {
            this.pecfas.optionIndex.splice(index, 1);
          }
        });
      }
    }
    if (!isNullOrUndefined(this.model.ContactPersonOther.fieldOptionIndex)) {
      if (this.model.ContactPersonOther.fieldOptionIndex === true) {
        this.pecfas.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'ContactPersonOtherText') {
            this.pecfas.valueArr.splice(index, 1);
          }
        });
        this.pecfas.valueArr.push({ ContactPersonOtherText: 'Contact Person Other Text' });
      } else {
        this.pecfas.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'ContactPersonOtherText') {
            this.pecfas.valueArr.splice(index, 1);
          }
        });
      }
    }
    if (!isNullOrUndefined(this.model.PhoneContactOther.fieldOptionIndex)) {
      if (this.model.PhoneContactOther.fieldOptionIndex === true) {
        this.pecfas.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'PhoneContactOtherText') {
            this.pecfas.valueArr.splice(index, 1);
          }
        });
        this.pecfas.valueArr.push({ PhoneContactOtherText: 'Phone Contact Other Text' });
      } else {
        this.pecfas.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'PhoneContactOtherText') {
            this.pecfas.valueArr.splice(index, 1);
          }
        });
      }
    }
    if (!isNullOrUndefined(this.model.ReviewofDocumentationOther.fieldOptionIndex)) {
      if (this.model.ReviewofDocumentationOther.fieldOptionIndex === true) {
        this.pecfas.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'ReviewofDocumentationOtherText') {
            this.pecfas.valueArr.splice(index, 1);
          }
        });
        this.pecfas.valueArr.push({ ReviewofDocumentationOtherText: 'Review of Documentation Other Text' });
      } else {
        this.pecfas.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'ReviewofDocumentationOtherText') {
            this.pecfas.valueArr.splice(index, 1);
          }
        });
      }
    }
  }
}
