import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Constants } from '../../../constants';
import * as moment from 'moment';
import { PouchDbService } from '../../../providers/pouchdb.service';
import { Crops } from './crops';
import { AlertDialogComponent } from '../../forms/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'crops-form',
  templateUrl: './crops-form.component.html',
  styleUrls: ['./crops-form.component.scss', '../../forms/forms-common.scss']
})
export class CropsFormComponent implements OnInit {
  crops: Crops = new Crops();
  @Input() model: any;
  docId: string;
  date: any;
  staffName: string;
  staffId: string;
  kaecses: string;
  isFinalize = false;
  constructor(private route: ActivatedRoute, private pouchDBService: PouchDbService,
    public dialog: MatDialog,
    private formEditor: FormEditorComponent) { }
  setClient(client: any) {
    this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.clientId = client.clientID;
    this.model.kaecses.value = client.kaecses;
    this.model.referralId = client.referralid;
    this.kaecses = client.kaecses;
    this.model.Age.value = client.age;
  }
  disableValidationProcess() {
    if (this.model.disableValidate === true) {
      Object.assign(this.model, {
        'CROPS_Question1': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question2': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question3': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question4': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question5': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question6': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question7': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question8': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question9': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question10': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question11': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question12': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question13': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question14': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question15': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question16': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question17': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question18': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question19': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question20': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question21': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question22': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question23': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question24': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question25': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question26': {
          'fieldOptionIndex': ''
        },
        'BTotal': {
          'value': ''
        },
        'CTotal': {
          'value': ''
        },
        'CROPS_Question27': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question28': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question29': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question30': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question31': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question32': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question33': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question34': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question35': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question36': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question37': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question38': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question39': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question40': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question42': {
          'value': ''
        },
        // 'CROPS_Question43': {
        //   'value': ''
        // }
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
    this.date = new Date();
    this.docId = this.route.snapshot.paramMap.get('docId');
    // staff detials
    this.pouchDBService.getUser().then(data => {
      if (data) {
        this.staffId = data.userId;
        this.staffName = data.staffName + data.lastName;
        this.model.staffName = this.staffName;
        this.model.StaffName.value = this.staffName;
      } else {
        console.log('No User Information Found');
      }
    }).catch(error => {
      console.log('Error in retieving user information', error);
    });
    // if its a new form
    if (!this.docId) {
      this.model.name = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.CROPS;
      this.model.program = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      this.model.disableValidationFields = ['ClientName', 'remarks']

      this.model.validationFields = ['CompletionDate', 'StaffName', 'ClientName', 'kaecses',
        'Age', 'CROPS_Question1', 'CROPS_Question5', 'CROPS_Question9', 'CROPS_Question13', 'CROPS_Question17', 'CROPS_Question21', 'CROPS_Question25',
        'CROPS_Question2', 'CROPS_Question6', 'CROPS_Question10', 'CROPS_Question14', 'CROPS_Question18', 'CROPS_Question22', 'CROPS_Question26',
        'CROPS_Question3', 'CROPS_Question7', 'CROPS_Question11', 'CROPS_Question15', 'CROPS_Question19', 'CROPS_Question23',
        'CROPS_Question4', 'CROPS_Question8', 'CROPS_Question12', 'CROPS_Question16', 'CROPS_Question20', 'CROPS_Question24', 'CROPS_Question27',
        'CROPS_Question28', 'CROPS_Question29', 'CROPS_Question30',
        'CROPS_Question31', 'CROPS_Question32', 'CROPS_Question33', 'CROPS_Question34', 'CROPS_Question35', 'CROPS_Question36',
        'CROPS_Question37', 'CROPS_Question38', 'CROPS_Question39', 'CROPS_Question42', 'CROPS_Question40', 'CTotal'];
      Object.assign(this.model, {
        'CompletionDate': {
          'value': this.date
        },
        'CROPS_Question1': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question2': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question3': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question4': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question5': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question6': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question7': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question8': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question9': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question10': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question11': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question12': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question13': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question14': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question15': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question16': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question17': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question18': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question19': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question20': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question21': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question22': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question23': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question24': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question25': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question26': {
          'fieldOptionIndex': ''
        },
        'kaecses': {
          'value': this.kaecses
        },
        'ClientName': {
          'value': ''
        },
        'Age': {
          'value': ''
        },
        'StaffName': {
          'value': ''
        },
        'StaffID': {
          'value': this.staffId
        },
        'BTotal': {
          'value': ''
        },
        'CTotal': {
          'value': ''
        },
        'CROPS_Question27': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question28': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question29': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question30': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question31': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question32': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question33': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question34': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question35': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question36': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question37': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question38': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question39': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question40': {
          'fieldOptionIndex': ''
        },
        'CROPS_Question42': {
          'value': ''
        },
        // 'CROPS_Question43': {
        //   'value': ''
        // },
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
      this.crops.valueArr.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].value === '') {
          value.push(Object.values(val)[0]);
        }
      });
      this.crops.optionIndex.map((val) => {
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
        this.getQuestionsId();
      }
      this.isFinalize = true;
      this.formEditor.finalize();
    }
  }
  getQuestionsId() {
    let arr = [];
    this.crops.quesId.map((val) => {
      if (this.model[`${val}`].fieldOptionIndex === '2') {
        arr.push({ QusID: val.replace(/[^0-9]+/ig, "") })
      }
    });
    this.model.questionID = arr;
    this.model.Total = this.model.BTotal.value;
  }

  otherSpecifyValidation() {
    if (!isNullOrUndefined(this.model.CROPS_Question40.fieldOptionIndex)) {
      if (this.model.CROPS_Question40.fieldOptionIndex === '0') {
        this.crops.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'CROPS_Question42') {
            this.crops.valueArr.splice(index, 1);
          }
        });
        this.crops.valueArr.push({ CROPS_Question42: 'Did I forget to ask you about anything that may have happened to you? (please specify)' });
      } else {
        this.crops.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'CROPS_Question42') {
            this.crops.valueArr.splice(index, 1);
          }
        });
      }
    }
  }
}
