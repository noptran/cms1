import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '../../../constants';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { PouchDbService } from '../../../providers/pouchdb.service';
import * as moment from 'moment';
import { MatDialog } from "@angular/material";
import { AlertDialogComponent } from '../../forms/alert-dialog/alert-dialog.component';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { Okhlahoma } from './okhlahoma';
@Component({
  selector: 'guide-for-monthly-resource-home-contact-form',
  templateUrl: './guide-for-monthly-resource-home-contact-form.component.html',
  styleUrls: ['./guide-for-monthly-resource-home-contact-form.component.scss', '../../forms/forms-common.scss']
})
export class GuideForMonthlyResourceHomeContactFormComponent implements OnInit {
  okhlahoma: Okhlahoma = new Okhlahoma();
  @Input() model: any;
  date: string;
  docId: string;
  ClientName: string;
  staffName: string;
  loading: boolean = false;
  constructor(private route: ActivatedRoute, private pouchDBService: PouchDbService,
    public dialog: MatDialog,
    private formEditor: FormEditorComponent) {


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
        } else {
          console.log('No User Information Found');
        }
      }).catch(error => {
        console.log('Error in retieving user information', error);
      });

      this.model.name = Constants.PROGRAMS.OKLAHOMA_FOSTER_CARE_HOME.FORMS.GUIDE_FOR_MONTHLY_RESOURCE_HOME_CONTACT;
      this.model.program = Constants.PROGRAMS.OKLAHOMA_FOSTER_CARE_HOME.MENU_TITLE;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      Object.assign(this.model, {
        'ClientName': {
          'value': ''
        },
        'CompletionDate': {
          'value': this.date
        },
        'FollowUpFromPreviousMonth': {
          'value': ''
        },
        'children_inhome': {
          'fieldOptionIndex': ''
        },
        'Resourcename': {
          'value': ''
        },
        'resourcenumber': {
          'value': ''
        },
        'contactType': {
          'fieldOptionIndex': ''
        },
        'approvedBeds': {
          'value': ''
        },
        'KidsPlaced': {
          'value': ''
        },
        'changes': {
          'value': ''
        },
        'contactInformation': {
          'value': ''
        },
        'adjusting': {
          'value': ''
        },
        'discipline': {
          'value': ''
        },
        'discussSupportPlan': {
          'value': ''
        },
        'discussWPC': {
          'value': ''
        },
        'training': {
          'value': ''
        },
        'MonthlyResourceReminder': {
          'value': ''
        },
        'questions': {
          'value': ''
        },
        'ObservationsFromWalkThrough': {
          'value': ''
        },
        'OvservationsFromInteraction': {
          'value': ''
        },
        'ChangesInIncome': {
          'value': ''
        },
        'supportPlan': {
          'value': ''
        },
        'Concerns': {
          'value': ''
        },
        'needs': {
          'value': ''
        },
        'WPC': {
          'value': ''
        },
        'SpecialistSignature': {
          'value': ''
        },
        'SpecialistSignatureDate': {
          'value': ''
        },
        'SupervisorSignature': {
          'value': ''
        },
        'SupervisorSignatureDate': {
          'value': ''
        },
        'services': {
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
    this.okhlahoma.valueArr.map((val) => {
      if (this.model[`${Object.keys(val)[0]}`].value === '') {
        value.push(Object.values(val)[0]);
      }
    });
    this.okhlahoma.optionIndex.map((val) => {
      if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '') {
        value.push(Object.values(val)[0]);
      }
    });
    if (value.length > 0) {
      this.dialog.open(AlertDialogComponent, {
        data: { labels: value }
      });
    } else {
      this.formEditor.finalize();
    }
  }
}
