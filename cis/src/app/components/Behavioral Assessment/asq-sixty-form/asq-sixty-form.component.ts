import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Constants } from '../../../constants';
import * as moment from 'moment';
import { PouchDbService } from '../../../providers/pouchdb.service';
import { AsqSixty } from './asqSixty';
import { MatDialog } from '@angular/material';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { AlertDialogComponent } from '../../forms/alert-dialog/alert-dialog.component';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'asq-sixty-form',
  templateUrl: './asq-sixty-form.component.html',
  styleUrls: ['./asq-sixty-form.component.scss', '../../forms/forms-common.scss', '../behavior.common.scss']
})
export class AsqSixtyFormComponent implements OnInit {
  asqSixty: AsqSixty = new AsqSixty();
  @Input() model: any;
  docId: string;
  date: any;
  staffName: string;
  clientDOB: string;
  isFinalize = false;
  constructor(private route: ActivatedRoute, private pouchDBService: PouchDbService,
    public dialog: MatDialog,
    private formEditor: FormEditorComponent) { }
  disableValidationProcess() {
    if (this.model.disableValidate === true) {
      Object.assign(this.model, {
        'Question10': {
          'fieldOptionIndex': ''
        },
        'Question9': {
          'fieldOptionIndex': ''
        },
        'Question8': {
          'fieldOptionIndex': ''
        },
        'Question7': {
          'fieldOptionIndex': ''
        },
        'Question6': {
          'fieldOptionIndex': ''
        },
        'Question5': {
          'fieldOptionIndex': ''
        },
        'Question4': {
          'fieldOptionIndex': ''
        },
        'Question3': {
          'fieldOptionIndex': ''
        },
        'Question2': {
          'fieldOptionIndex': ''
        },
        'Question1': {
          'fieldOptionIndex': ''
        },
        'Question18': {
          'fieldOptionIndex': ''
        },
        'Question17': {
          'fieldOptionIndex': ''
        },
        'Question16': {
          'fieldOptionIndex': ''
        },
        'Question15': {
          'fieldOptionIndex': ''
        },
        'Question14': {
          'fieldOptionIndex': ''
        },
        'Question13': {
          'fieldOptionIndex': ''
        },
        'Question12': {
          'fieldOptionIndex': ''
        },
        'Question11': {
          'fieldOptionIndex': ''
        },
        'Question23': {
          'fieldOptionIndex': ''
        },
        'Question22': {
          'fieldOptionIndex': ''
        },
        'Question21': {
          'fieldOptionIndex': ''
        },
        'Question20': {
          'fieldOptionIndex': ''
        },
        'Question19': {
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
        'Question33': {
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
        'Question1Concern': {
          'fieldOptionIndex': ''
        },
        'Question2Concern': {
          'fieldOptionIndex': ''
        },
        'Question3Concern': {
          'fieldOptionIndex': ''
        },
        'Question4Concern': {
          'fieldOptionIndex': ''
        },
        'Question5Concern': {
          'fieldOptionIndex': ''
        },
        'Question6Concern': {
          'fieldOptionIndex': ''
        },
        'Question7Concern': {
          'fieldOptionIndex': ''
        },
        'Question8Concern': {
          'fieldOptionIndex': ''
        },
        'Question9Concern': {
          'fieldOptionIndex': ''
        },
        'Question10Concern': {
          'fieldOptionIndex': ''
        },
        'Question11Concern': {
          'fieldOptionIndex': ''
        },
        'Question12Concern': {
          'fieldOptionIndex': ''
        },
        'Question13Concern': {
          'fieldOptionIndex': ''
        },
        'Question14Concern': {
          'fieldOptionIndex': ''
        },
        'Question15Concern': {
          'fieldOptionIndex': ''
        },
        'Question16Concern': {
          'fieldOptionIndex': ''
        },
        'Question17Concern': {
          'fieldOptionIndex': ''
        },
        'Question18Concern': {
          'fieldOptionIndex': ''
        },
        'Question19Concern': {
          'fieldOptionIndex': ''
        },
        'Question20Concern': {
          'fieldOptionIndex': ''
        },
        'Question21Concern': {
          'fieldOptionIndex': ''
        },
        'Question22Concern': {
          'fieldOptionIndex': ''
        },
        'Question23Concern': {
          'fieldOptionIndex': ''
        },
        'Question24Concern': {
          'fieldOptionIndex': ''
        },
        'Question25Concern': {
          'fieldOptionIndex': ''
        },
        'Question26Concern': {
          'fieldOptionIndex': ''
        },
        'Question27Concern': {
          'fieldOptionIndex': ''
        },
        'Question28Concern': {
          'fieldOptionIndex': ''
        },
        'Question29Concern': {
          'fieldOptionIndex': ''
        },
        'Question30Concern': {
          'fieldOptionIndex': ''
        },
        'Question31Concern': {
          'fieldOptionIndex': ''
        },
        'Question32Concern': {
          'fieldOptionIndex': ''
        },
        'Question33Concern': {
          'fieldOptionIndex': ''
        },
        'Question34Concern': {
          'fieldOptionIndex': ''
        },
        'Question35Concern': {
          'fieldOptionIndex': ''
        },
        'Question36Concern': {
          'fieldOptionIndex': ''
        },
        'Relationship': {
          'fieldOptionIndex': ''
        },
        'CaregiverName': {
          'value': ''
        },
        'Question22Or': {
          'value': ''
        },
        'Question12Or': {
          'value': ''
        },
        'Question22Description': {
          'value': ''
        },
        'Question12Description': {
          'value': ''
        },
        'Question34Description': {
          'value': ''
        },
        'Enjoy': {
          'fieldOptionIndex': ''
        },
        'Worry': {
          'fieldOptionIndex': ''
        },
        'ConcernsSleep': {
          'fieldOptionIndex': ''
        },
        'Question37Description': {
          'value': ''
        },
        'Question38Description': {
          'value': ''
        },
        'Question36Description': {
          'value': ''
        },
        'Question39Description': {
          'value': ''
        },
        'Concerns1_16': {
          'fieldOptionIndex': ''
        },
        'TotalScore': {
          'value': ''
        },
        'ConcernsComments': {
          'value': ''
        },
        'babyTotalScore': {
          'fieldOptionIndex': ''
        },
        'Question1Sum': {
          'value': ''
        },
        'Question2Sum': {
          'value': ''
        },
        'Question3Sum': {
          'value': ''
        },
        'Question4Sum': {
          'value': ''
        },
        'Question5Sum': {
          'value': ''
        },
        'Question6Sum': {
          'value': ''
        },
        'Question7Sum': {
          'value': ''
        },
        'Question8Sum': {
          'value': ''
        },
        'Question9Sum': {
          'value': ''
        },
        'Question10Sum': {
          'value': ''
        },
        'Question11Sum': {
          'value': ''
        },
        'Question12Sum': {
          'value': ''
        },
        'Question13Sum': {
          'value': ''
        },
        'Question14Sum': {
          'value': ''
        },
        'Question15Sum': {
          'value': ''
        },
        'Question16Sum': {
          'value': ''
        },
        'Question17Sum': {
          'value': ''
        },
        'Question18Sum': {
          'value': ''
        },
        'Question19Sum': {
          'value': ''
        },
        'Question20Sum': {
          'value': ''
        },
        'Question21Sum': {
          'value': ''
        },
        'Question22Sum': {
          'value': ''
        },
        'Question23Sum': {
          'value': ''
        },
        'Question24Sum': {
          'value': ''
        },
        'Question26Sum': {
          'value': ''
        },
        'Question27Sum': {
          'value': ''
        },
        'Question25Sum': {
          'value': ''
        },
        'Question28Sum': {
          'value': ''
        },
        'Question29Sum': {
          'value': ''
        },
        'Question30Sum': {
          'value': ''
        },
        'Question31Sum': {
          'value': ''
        },
        'Question32Sum': {
          'value': ''
        },
        'Question33Sum': {
          'value': ''
        },
        'Question34Sum': {
          'value': ''
        },
        'Question35Sum': {
          'value': ''
        },
        'Question36Sum': {
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
  setClient(client: any) {
    this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.clientId = client.clientID;
    this.model.DateOfBirth.value = client.dob;
    this.clientDOB = client.dob;
    this.model.referralId = client.referralid;
    if (client.gender === "Male") {
      this.model.Gender.fieldOptionIndex = "1"
    } else if (client.gender === "Female") {
      this.model.Gender.fieldOptionIndex = "0"
    }
  }
  displayClientName() {
    return this.model.ClientName.value;
  }
  ngOnInit() {
    let date = Date.now();
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
      this.model.name = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_60MO;
      this.model.program = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      this.model.totalQuestions = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.TOTAL_QUESTIONS_COUNT.ASQ_60MO;
      this.model.lowRiskValue = 70;
      this.model.monitorValue = 85;
      this.model.disableValidationFields = ['ClientName', 'remarks']

      this.model.validationFields = ['CompletionDate', 'staffName',
        'ClientName', 'DateOfBirth',
        'Gender', 'CaregiverName', 'Relationship',
        'Question12Or', 'Question12Description', 'Question22Or', 'Question22Description',
        'Question34Description', 'Question36Description', 'ConcernsSleep', 'Question37Description', 'Worry',
        'Question38Description', 'Enjoy',
        'Question39Description', 'Concerns1_16', 'ConcernsComments','Question1', 'Question5', 'Question9',
         'Question13', 'Question17', 'Question21', 'Question25',
        'Question2', 'Question6', 'Question10', 'Question14', 'Question18', 'Question22', 'Question26',
        'Question3', 'Question7', 'Question11', 'Question15', 'Question19', 'Question23', 'Question27',
        'Question4', 'Question8', 'Question12', 'Question16', 'Question20', 'Question24', 'Question28',
        'Question29', 'Question30', 'Question31', 'Question32', 'Question33', 'Question34',
        'Question35', 'Question36'];
      Object.assign(this.model, {
        'Question10': {
          'fieldOptionIndex': ''
        },
        'Question9': {
          'fieldOptionIndex': ''
        },
        'Question8': {
          'fieldOptionIndex': ''
        },
        'Question7': {
          'fieldOptionIndex': ''
        },
        'Question6': {
          'fieldOptionIndex': ''
        },
        'Question5': {
          'fieldOptionIndex': ''
        },
        'Question4': {
          'fieldOptionIndex': ''
        },
        'Question3': {
          'fieldOptionIndex': ''
        },
        'Question2': {
          'fieldOptionIndex': ''
        },
        'Question1': {
          'fieldOptionIndex': ''
        },
        'Question18': {
          'fieldOptionIndex': ''
        },
        'Question17': {
          'fieldOptionIndex': ''
        },
        'Question16': {
          'fieldOptionIndex': ''
        },
        'Question15': {
          'fieldOptionIndex': ''
        },
        'Question14': {
          'fieldOptionIndex': ''
        },
        'Question13': {
          'fieldOptionIndex': ''
        },
        'Question12': {
          'fieldOptionIndex': ''
        },
        'Question11': {
          'fieldOptionIndex': ''
        },
        'Question23': {
          'fieldOptionIndex': ''
        },
        'Question22': {
          'fieldOptionIndex': ''
        },
        'Question21': {
          'fieldOptionIndex': ''
        },
        'Question20': {
          'fieldOptionIndex': ''
        },
        'Question19': {
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
        'Question33': {
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
        'Question1Concern': {
          'fieldOptionIndex': ''
        },
        'Question2Concern': {
          'fieldOptionIndex': ''
        },
        'Question3Concern': {
          'fieldOptionIndex': ''
        },
        'Question4Concern': {
          'fieldOptionIndex': ''
        },
        'Question5Concern': {
          'fieldOptionIndex': ''
        },
        'Question6Concern': {
          'fieldOptionIndex': ''
        },
        'Question7Concern': {
          'fieldOptionIndex': ''
        },
        'Question8Concern': {
          'fieldOptionIndex': ''
        },
        'Question9Concern': {
          'fieldOptionIndex': ''
        },
        'Question10Concern': {
          'fieldOptionIndex': ''
        },
        'Question11Concern': {
          'fieldOptionIndex': ''
        },
        'Question12Concern': {
          'fieldOptionIndex': ''
        },
        'Question13Concern': {
          'fieldOptionIndex': ''
        },
        'Question14Concern': {
          'fieldOptionIndex': ''
        },
        'Question15Concern': {
          'fieldOptionIndex': ''
        },
        'Question16Concern': {
          'fieldOptionIndex': ''
        },
        'Question17Concern': {
          'fieldOptionIndex': ''
        },
        'Question18Concern': {
          'fieldOptionIndex': ''
        },
        'Question19Concern': {
          'fieldOptionIndex': ''
        },
        'Question20Concern': {
          'fieldOptionIndex': ''
        },
        'Question21Concern': {
          'fieldOptionIndex': ''
        },
        'Question22Concern': {
          'fieldOptionIndex': ''
        },
        'Question23Concern': {
          'fieldOptionIndex': ''
        },
        'Question24Concern': {
          'fieldOptionIndex': ''
        },
        'Question25Concern': {
          'fieldOptionIndex': ''
        },
        'Question26Concern': {
          'fieldOptionIndex': ''
        },
        'Question27Concern': {
          'fieldOptionIndex': ''
        },
        'Question28Concern': {
          'fieldOptionIndex': ''
        },
        'Question29Concern': {
          'fieldOptionIndex': ''
        },
        'Question30Concern': {
          'fieldOptionIndex': ''
        },
        'Question31Concern': {
          'fieldOptionIndex': ''
        },
        'Question32Concern': {
          'fieldOptionIndex': ''
        },
        'Question33Concern': {
          'fieldOptionIndex': ''
        },
        'Question34Concern': {
          'fieldOptionIndex': ''
        },
        'Question35Concern': {
          'fieldOptionIndex': ''
        },
        'Question36Concern': {
          'fieldOptionIndex': ''
        },
        'Relationship': {
          'fieldOptionIndex': ''
        },
        'Gender': {
          'fieldOptionIndex': ''
        },
        'CompletionDate': {
          'value': this.date
        },
        'StaffName': {
          'value': ''
        },
        'ClientName': {
          'value': ''
        },
        'DateOfBirth': {
          'value': ''
        },
        'NumericField1': {
          'value': ''
        },
        'CaregiverName': {
          'value': ''
        },
        'Question22Or': {
          'value': ''
        },
        'Question12Or': {
          'value': ''
        },
        'Question22Description': {
          'value': ''
        },
        'Question12Description': {
          'value': ''
        },
        'Question34Description': {
          'value': ''
        },
        'Enjoy': {
          'fieldOptionIndex': ''
        },
        'Worry': {
          'fieldOptionIndex': ''
        },
        'ConcernsSleep': {
          'fieldOptionIndex': ''
        },
        'Question37Description': {
          'value': ''
        },
        'Question38Description': {
          'value': ''
        },
        'Question36Description': {
          'value': ''
        },
        'Question39Description': {
          'value': ''
        },
        'Concerns1_16': {
          'fieldOptionIndex': ''
        },
        'TotalScore': {
          'value': ''
        },
        'ConcernsComments': {
          'value': ''
        },
        'babyTotalScore': {
          'fieldOptionIndex': ''
        },
        'Question1Sum': {
          'value': ''
        },
        'Question2Sum': {
          'value': ''
        },
        'Question3Sum': {
          'value': ''
        },
        'Question4Sum': {
          'value': ''
        },
        'Question5Sum': {
          'value': ''
        },
        'Question6Sum': {
          'value': ''
        },
        'Question7Sum': {
          'value': ''
        },
        'Question8Sum': {
          'value': ''
        },
        'Question9Sum': {
          'value': ''
        },
        'Question10Sum': {
          'value': ''
        },
        'Question11Sum': {
          'value': ''
        },
        'Question12Sum': {
          'value': ''
        },
        'Question13Sum': {
          'value': ''
        },
        'Question14Sum': {
          'value': ''
        },
        'Question15Sum': {
          'value': ''
        },
        'Question16Sum': {
          'value': ''
        },
        'Question17Sum': {
          'value': ''
        },
        'Question18Sum': {
          'value': ''
        },
        'Question19Sum': {
          'value': ''
        },
        'Question20Sum': {
          'value': ''
        },
        'Question21Sum': {
          'value': ''
        },
        'Question22Sum': {
          'value': ''
        },
        'Question23Sum': {
          'value': ''
        },
        'Question24Sum': {
          'value': ''
        },
        'Question26Sum': {
          'value': ''
        },
        'Question27Sum': {
          'value': ''
        },
        'Question25Sum': {
          'value': ''
        },
        'Question28Sum': {
          'value': ''
        },
        'Question29Sum': {
          'value': ''
        },
        'Question30Sum': {
          'value': ''
        },
        'Question31Sum': {
          'value': ''
        },
        'Question32Sum': {
          'value': ''
        },
        'Question33Sum': {
          'value': ''
        },
        'Question34Sum': {
          'value': ''
        },
        'Question35Sum': {
          'value': ''
        },
        'Question36Sum': {
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
      this.asqSixty.valueArr.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].value === '') {
          value.push(Object.values(val)[0]);
        }
      });
      this.asqSixty.optionIndex.map((val) => {
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
      this.isFinalize = true;
      this.formEditor.finalize();
    }
  }
  otherSpecifyValidation() {
    if (!isNullOrUndefined(this.model.ConcernsSleep.fieldOptionIndex)) {
      if (this.model.ConcernsSleep.fieldOptionIndex === '0') {
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question37Description') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
        this.asqSixty.valueArr.push({ Question37Description: 'Do you have concerns about your baby’s eating or sleeping behaviors? If yes please explain' });
      }  else {
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question37Description') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
      }
    }

    if (!isNullOrUndefined(this.model.Worry.fieldOptionIndex)) {
      if (this.model.Worry.fieldOptionIndex === '0') {
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question38Description') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
        this.asqSixty.valueArr.push({ Question38Description: 'Does anything about your baby worry you? If yes, please explain' });
      }  else {
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question38Description') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
      }
    }

    if (!isNullOrUndefined(this.model.Question12.fieldOptionIndex)) {
      if (this.model.Question12.fieldOptionIndex !== '0') {
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question12Or') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
        this.asqSixty.valueArr.push({ Question12Or: 'Does your child have eating problems? For example, does he stuff food, vomit, eat things that are not food comment' });
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question12Description') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
        this.asqSixty.valueArr.push({ Question12Description: 'Does your child have eating problems? For example, does he stuff food, vomit, eat things that are not food describe' });
      } else {
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question12Or') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question12Description') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
      }
    }

    if (!isNullOrUndefined(this.model.Question22.fieldOptionIndex)) {
      if (this.model.Question22.fieldOptionIndex !== '0') {
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question22Or') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
        this.asqSixty.valueArr.push({ Question22Or: 'Does your child do things over and over and get upset when you try to stop him? For example, does he rock, flap his hands, spin, orcomment' });
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question22Description') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
        this.asqSixty.valueArr.push({ Question22Description: 'Does your child do things over and over and get upset when you try to stop him? For example, does he rock, flap his hands, spin describe' });
      } else {
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question22Or') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question22Description') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
      }
    }

    if (!isNullOrUndefined(this.model.Question34.fieldOptionIndex)) {
      if (this.model.Question34.fieldOptionIndex !== '0') {
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question34Description') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
        this.asqSixty.valueArr.push({ Question34Description: 'Is your child too worried or fearful? If “sometimes” or “often or always,” please explain' });
      } else {
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question34Description') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
      }
    }

    if (!isNullOrUndefined(this.model.Question36.fieldOptionIndex)) {
      if (this.model.Question36.fieldOptionIndex !== '0') {
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question36Description') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
        this.asqSixty.valueArr.push({ Question36Description: 'Has anyone shared concerns about your child’s behaviors? If “sometimes” or “often or always” please explain:' });
      } else {
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question36Description') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
      }
    }
    if (!isNullOrUndefined(this.model.Concerns1_16.fieldOptionIndex)) {
      if (this.model.Concerns1_16.fieldOptionIndex === '0') {
        this.asqSixty.valueArr.map((val, index) => {
          if ((Object.keys(val)[0] === 'ConcernsComments')) {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
        this.asqSixty.valueArr.push({ ConcernsComments: 'Any concerns marked on scored items Comments' });
      } else {
        this.asqSixty.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'ConcernsComments') {
            this.asqSixty.valueArr.splice(index, 1);
          }
        });
      }
    }
  }
}
