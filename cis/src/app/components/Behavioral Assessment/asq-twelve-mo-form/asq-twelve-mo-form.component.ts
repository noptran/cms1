import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Constants } from '../../../constants';
import * as moment from 'moment';
import { PouchDbService } from '../../../providers/pouchdb.service';
import { AsqTwelve } from './asqTwelve';
import { MatDialog } from '@angular/material';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { AlertDialogComponent } from '../../forms/alert-dialog/alert-dialog.component';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'asq-twelve-mo-form',
  templateUrl: './asq-twelve-mo-form.component.html',
  styleUrls: ['./asq-twelve-mo-form.component.scss', '../../forms/forms-common.scss', '../behavior.common.scss']
})
export class AsqTwelveMoFormComponent implements OnInit {
  asqTwelve: AsqTwelve = new AsqTwelve();
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
        'Relationship': {
          'fieldOptionIndex': ''
        },
        'CaregiverName': {
          'value': ''
        },
        'Question14Or': {
          'value': ''
        },
        'Question14Description': {
          'value': ''
        },
        'Question28Description': {
          'value': ''
        },
        'Question27Description': {
          'value': ''
        },
        'Question29Description': {
          'value': ''
        },
        'Question30Description': {
          'value': ''
        },
        'ConcernsSleep': {
          'fieldOptionIndex': ''
        },
        'Worry': {
          'fieldOptionIndex': ''
        },
        'Enjoy': {
          'fieldOptionIndex': ''
        },
        'Concerns1_16': {
          'fieldOptionIndex': ''
        },
        'HomeIsFreeOfSafetyConcerns': {
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
        'babyId': {
          'value': ''
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
    console.log('disableValidate', this.model.disableValidate);

    let date = Date.now();
    this.date = new Date();
    this.docId = this.route.snapshot.paramMap.get('docId');
    // if its a new form
    if (!this.docId) {

      // staff detials
      this.pouchDBService.getUser().then(data => {
        if (data) {
          this.staffName = data.staffName + data.lastName;
          this.model.staffName = this.staffName;
          this.model.enteredBy.value = this.staffName;

        } else {
          console.log('No User Information Found');
        }
      }).catch(error => {
        console.log('Error in retieving user information', error);
      });
      this.model.name = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.ASQ_12mo;
      this.model.program = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      this.model.totalQuestions = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.TOTAL_QUESTIONS_COUNT.ASQ_12mo;
      this.model.lowRiskValue = 40;
      this.model.monitorValue = 50;
      this.model.disableValidationFields = ['ClientName', 'remarks']

      this.model.validationFields = ['CompletionDate', 'staffName', 'ClientName', 'DateOfBirth',
        'Gender', 'CaregiverName', 'Relationship', 'Question14Or', 'Question14Description',
        'Question27Description', 'Question28Description', 'ConcernsSleep', 'Question29Description', 'Worry',
        'Question30Description', 'Enjoy', 'Concerns1_16', 'ConcernsComments',
 'Question1', 'Question5', 'Question9', 'Question13', 'Question17', 'Question21', 'Question25',
        'Question2', 'Question6', 'Question10', 'Question14', 'Question18', 'Question22', 'Question26',
        'Question3', 'Question7', 'Question11', 'Question15', 'Question19', 'Question23', 'Question27',
        'Question4', 'Question8', 'Question12', 'Question16', 'Question20', 'Question24'];
      Object.assign(this.model, {
        'enteredBy': {
          'value': this.staffName
        },
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
        'CompletionDate': {
          'value': this.date
        },
        'ClientName': {
          'value': ''
        },
        'DateOfBirth': {
          'value': ''
        },
        'Gender': {
          'fieldOptionIndex': ''
        },
        'Relationship': {
          'fieldOptionIndex': ''
        },
        'CaregiverName': {
          'value': ''
        },
        'Question14Or': {
          'value': ''
        },
        'Question14Description': {
          'value': ''
        },
        'Question28Description': {
          'value': ''
        },
        'Question27Description': {
          'value': ''
        },
        'Question29Description': {
          'value': ''
        },
        'Question30Description': {
          'value': ''
        },
        'ConcernsSleep': {
          'fieldOptionIndex': ''
        },
        'Worry': {
          'fieldOptionIndex': ''
        },
        'Enjoy': {
          'fieldOptionIndex': ''
        },
        'Concerns1_16': {
          'fieldOptionIndex': ''
        },
        'HomeIsFreeOfSafetyConcerns': {
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
        'babyId': {
          'value': ''
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
        'prematureWeeks': {
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
      this.asqTwelve.valueArr.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].value === '') {
          value.push(Object.values(val)[0]);
        }
      });
      this.asqTwelve.optionIndex.map((val) => {
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
        this.asqTwelve.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question28Description') {
            this.asqTwelve.valueArr.splice(index, 1);
          }
        });
        this.asqTwelve.valueArr.push({ Question28Description: 'Do you have concerns about your baby’s eating or sleeping behaviors? If yes please explain' });
      } else {
        this.asqTwelve.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question28Description') {
            this.asqTwelve.valueArr.splice(index, 1);
          }
        });
      }
    }
    if (!isNullOrUndefined(this.model.Worry.fieldOptionIndex)) {
      if (this.model.Worry.fieldOptionIndex === '0') {
        this.asqTwelve.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question29Description') {
            this.asqTwelve.valueArr.splice(index, 1);
          }
        });
        this.asqTwelve.valueArr.push({ Question29Description: 'Does anything about your baby worry you? If yes, please explain' });
      }  else {
        this.asqTwelve.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question29Description') {
            this.asqTwelve.valueArr.splice(index, 1);
          }
        });
      }
    }
    if (!isNullOrUndefined(this.model.Question14.fieldOptionIndex)) {
      if (this.model.Question14.fieldOptionIndex !== '0') {
        this.asqTwelve.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question14Or') {
            this.asqTwelve.valueArr.splice(index, 1);
          }
        });
        this.asqTwelve.valueArr.push({ Question14Or: 'Does your baby have any eating problems, such as gagging, vomiting, or comment' });
        this.asqTwelve.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question14Description') {
            this.asqTwelve.valueArr.splice(index, 1);
          }
        });
        this.asqTwelve.valueArr.push({ Question14Description: 'Does your baby have any eating problems, such as gagging, vomiting, or describe' });
      } else {
        this.asqTwelve.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question14Or') {
            this.asqTwelve.valueArr.splice(index, 1);
          }
        });
        this.asqTwelve.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question14Description') {
            this.asqTwelve.valueArr.splice(index, 1);
          }
        });
      }
    }
    if (!isNullOrUndefined(this.model.Question27.fieldOptionIndex)) {
      if (this.model.Question27.fieldOptionIndex !== '0') {
        this.asqTwelve.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question27Description') {
            this.asqTwelve.valueArr.splice(index, 1);
          }
        });
        this.asqTwelve.valueArr.push({ Question27Description: 'Has anyone shared concerns about your child’s behaviors? If “sometimes” or “often or always” please explain:' });
      } else {
        this.asqTwelve.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'Question27Description') {
            this.asqTwelve.valueArr.splice(index, 1);
          }
        });
      }
    }
    if (!isNullOrUndefined(this.model.Concerns1_16.fieldOptionIndex)) {
      if (this.model.Concerns1_16.fieldOptionIndex === '0') {
        this.asqTwelve.valueArr.map((val, index) => {
          if ((Object.keys(val)[0] === 'ConcernsComments')) {
            this.asqTwelve.valueArr.splice(index, 1);
          }
        });
        this.asqTwelve.valueArr.push({ ConcernsComments: 'Any concerns marked on scored items Comments' });
      } else {
        this.asqTwelve.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'ConcernsComments') {
            this.asqTwelve.valueArr.splice(index, 1);
          }
        });
      }
    }
  }
}
