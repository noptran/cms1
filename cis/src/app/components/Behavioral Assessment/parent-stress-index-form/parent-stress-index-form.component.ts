import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Constants } from '../../../constants';
import { PouchDbService } from '../../../providers/pouchdb.service';
import { DatePipe } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { Psi } from './psi';
import { AlertDialogComponent } from '../../forms/alert-dialog/alert-dialog.component';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import moment from 'moment';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'parent-stress-index-form',
  templateUrl: './parent-stress-index-form.component.html',
  styleUrls: ['./parent-stress-index-form.component.scss', '../../forms/forms-common.scss']
})
export class ParentStressIndexFormComponent implements OnInit {
  psi: Psi = new Psi();
  @Input() model: any;
  docId: string;
  staffName: string;
  staffId: string;
  clientDOB: string;
  datePipe: DatePipe = new DatePipe('en-US');
  facts: string;
  clientID: string;
  loading: boolean = false;
  search: string;
  showClient: boolean;
  isFinalize = false;
  constructor(public dialog: MatDialog,
    private formEditor: FormEditorComponent, private route: ActivatedRoute,
    private pouchDBService: PouchDbService) {

  }
  setClient(client: any) {
    this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.clientId = client.clientID;
    this.model.DateOfBirth.value = client.dob;
    this.clientDOB = client.dob;
    this.model.Gender.value = client.gender;
    this.model.facts = client.facts;
    this.model.referralId = client.referralid;
  }
  disableValidationProcess() {
    if (this.model.disableValidate === true) {
      Object.assign(this.model, {
        'Question1': {
          'fieldOptionIndex': ''
        },
        'Question2': {
          'fieldOptionIndex': ''
        },
        'Question3': {
          'fieldOptionIndex': ''
        },
        'Question4': {
          'fieldOptionIndex': ''
        },
        'Question5': {
          'fieldOptionIndex': ''
        },
        'Question6': {
          'fieldOptionIndex': ''
        },
        'Question7': {
          'fieldOptionIndex': ''
        },
        'Question8': {
          'fieldOptionIndex': ''
        },
        'Question9': {
          'fieldOptionIndex': ''
        },
        'Question10': {
          'fieldOptionIndex': ''
        },
        'Question11': {
          'fieldOptionIndex': ''
        },
        'Question12': {
          'fieldOptionIndex': ''
        },
        'Question13': {
          'fieldOptionIndex': ''
        },
        'Question14': {
          'fieldOptionIndex': ''
        },
        'Question15': {
          'fieldOptionIndex': ''
        },
        'Question16': {
          'fieldOptionIndex': ''
        },
        'Question17': {
          'fieldOptionIndex': ''
        },
        'Question18': {
          'fieldOptionIndex': ''
        },
        'Question19': {
          'fieldOptionIndex': ''
        },
        'Question20': {
          'fieldOptionIndex': ''
        },
        'Question21': {
          'fieldOptionIndex': ''
        },
        'Question22': {
          'fieldOptionIndex': ''
        },
        'Question23': {
          'fieldOptionIndex': ''
        },
        'Question24': {
          'fieldOptionIndex': ''
        },
        'Question25': {
          'fieldOptionIndex': ''
        },
        'Question26': {
          'fieldOptionIndex': ''
        },
        'Question27': {
          'fieldOptionIndex': ''
        },
        'Question28': {
          'fieldOptionIndex': ''
        },
        'Question29': {
          'fieldOptionIndex': ''
        },
        'Question30': {
          'fieldOptionIndex': ''
        },
        'Question31': {
          'fieldOptionIndex': ''
        },
        'Question32': {
          'fieldOptionIndex': ''
        },
        'Question34': {
          'fieldOptionIndex': ''
        },
        'Question35': {
          'fieldOptionIndex': ''
        },
        'Question36': {
          'fieldOptionIndex': ''
        },
        'Question33': {
          'fieldOptionIndex': ''
        },
        'ParentName': {
          'value': ''
        },
        'ParentGender': {
          'value': ''
        },
        'ParentDOB': {
          'value': ''
        },
        'ParentEthnicGroup': {
          'value': ''
        },
        'MaritalStatus': {
          'fieldOptionIndex': ''
        },
        'CareGiverRelationToClient': {
          'fieldOptionIndex': ''
        },
        'RelationToClientOther': {
          'value': ''
        },
        'date': {
          'value': ''
        },
        'DefensiveResponding': {
          'value': ''
        },
        'ParentDomain': {
          'value': ''
        },
        'ParentChild': {
          'value': ''
        },
        'DifficultChild': {
          'value': ''
        },
        'totalStress': {
          'value': ''
        }
      });
    } else {
      Object.assign(this.model, {
        'remarks': {
          'value': ''
        }
      });
    }
  }
  displayClientName() {
    return this.model.ClientName.value;
  }
  ngOnInit() {
    localStorage.removeItem('dataList');
    localStorage.removeItem('dataListClientId');
    localStorage.removeItem('setFacts');
    this.docId = this.route.snapshot.paramMap.get('docId');
    // staff detials
    this.pouchDBService.getUser().then(data => {
      if (data) {
        this.staffId = data.userId;
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
      this.model.name = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.PS17_17_17;
      this.model.program = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      this.model.disableValidationFields = ['ClientName', 'remarks']

      this.model.validationFields = ['ParentName', 'ParentGender', 'ClientName', 'ParentDOB',
        'ParentEthnicGroup', 'MaritalStatus', 'date', 'Gender', 'DateOfBirth', 'CareGiverRelationToClient', 'RelationToClientOther',
        'Question1', 'Question5', 'Question9', 'Question13', 'Question17', 'Question21', 'Question25',
        'Question2', 'Question6', 'Question10', 'Question14', 'Question18', 'Question22', 'Question26',
        'Question3', 'Question7', 'Question11', 'Question15', 'Question19', 'Question23', 'Question27',
        'Question4', 'Question8', 'Question12', 'Question16', 'Question20', 'Question24', 'Question28',
        'Question29', 'Question30', 'Question31', 'Question32', 'Question33', 'Question34',
        'Question35', 'Question36'];
      Object.assign(this.model, {
        'Question1': {
          'fieldOptionIndex': ''
        },
        'Question2': {
          'fieldOptionIndex': ''
        },
        'Question3': {
          'fieldOptionIndex': ''
        },
        'Question4': {
          'fieldOptionIndex': ''
        },
        'Question5': {
          'fieldOptionIndex': ''
        },
        'Question6': {
          'fieldOptionIndex': ''
        },
        'Question7': {
          'fieldOptionIndex': ''
        },
        'Question8': {
          'fieldOptionIndex': ''
        },
        'Question9': {
          'fieldOptionIndex': ''
        },
        'Question10': {
          'fieldOptionIndex': ''
        },
        'Question11': {
          'fieldOptionIndex': ''
        },
        'Question12': {
          'fieldOptionIndex': ''
        },
        'Question13': {
          'fieldOptionIndex': ''
        },
        'Question14': {
          'fieldOptionIndex': ''
        },
        'Question15': {
          'fieldOptionIndex': ''
        },
        'Question16': {
          'fieldOptionIndex': ''
        },
        'Question17': {
          'fieldOptionIndex': ''
        },
        'Question18': {
          'fieldOptionIndex': ''
        },
        'Question19': {
          'fieldOptionIndex': ''
        },
        'Question20': {
          'fieldOptionIndex': ''
        },
        'Question21': {
          'fieldOptionIndex': ''
        },
        'Question22': {
          'fieldOptionIndex': ''
        },
        'Question23': {
          'fieldOptionIndex': ''
        },
        'Question24': {
          'fieldOptionIndex': ''
        },
        'Question25': {
          'fieldOptionIndex': ''
        },
        'Question26': {
          'fieldOptionIndex': ''
        },
        'Question27': {
          'fieldOptionIndex': ''
        },
        'Question28': {
          'fieldOptionIndex': ''
        },
        'Question29': {
          'fieldOptionIndex': ''
        },
        'Question30': {
          'fieldOptionIndex': ''
        },
        'Question31': {
          'fieldOptionIndex': ''
        },
        'Question32': {
          'fieldOptionIndex': ''
        },
        'Question34': {
          'fieldOptionIndex': ''
        },
        'Question35': {
          'fieldOptionIndex': ''
        },
        'Question36': {
          'fieldOptionIndex': ''
        },
        'Question33': {
          'fieldOptionIndex': ''
        },
        'ParentName': {
          'value': ''
        },
        'ParentGender': {
          'value': ''
        },
        'ParentDOB': {
          'value': ''
        },
        'ParentEthnicGroup': {
          'value': ''
        },
        'MaritalStatus': {
          'fieldOptionIndex': ''
        },
        'Gender': {
          'value': ''
        },
        'DateOfBirth': {
          'value': ''
        },
        'CareGiverRelationToClient': {
          'fieldOptionIndex': ''
        },
        'RelationToClientOther': {
          'value': ''
        },
        'ClientName': {
          'value': ''
        },
        'date': {
          'value': ''
        },
        'DefensiveResponding': {
          'value': ''
        },
        'ParentDomain': {
          'value': ''
        },
        'ParentChild': {
          'value': ''
        },
        'DifficultChild': {
          'value': ''
        },
        'totalStress': {
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
      this.psi.valueArr.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].value === '') {
          value.push(Object.values(val)[0]);
        }
      });
      this.psi.optionIndex.map((val) => {
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
        Total: this.model.TS,
        Defensive: this.model.DefensiveResponding.value,
        DifficultChild: this.model.DC,
        ParentalDistress: this.model.parentalDistress,
        ParentChild: this.model.ParentChildDysfunction
      };
      this.model.CompletionDate = { value: moment(this.model.date.value).format('YYYY-MM-DD') }
    }
  }

  otherSpecifyValidation() {
    if (!isNullOrUndefined(this.model.CareGiverRelationToClient.fieldOptionIndex)) {
      if (this.model.CareGiverRelationToClient.fieldOptionIndex === '5') {
        this.psi.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'RelationToClientOther') {
            this.psi.valueArr.splice(index, 1);
          }
        });
        this.psi.valueArr.push({ RelationToClientOther: 'Other (specify)' });
      } else {
        this.psi.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'RelationToClientOther') {
            this.psi.valueArr.splice(index, 1);
          }
        });
      }
    }
  }
}
