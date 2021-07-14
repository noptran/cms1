import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '../../../constants';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { PouchDbService } from '../../../providers/pouchdb.service';
import * as moment from 'moment';
import { FosterCare } from './fosterCare';
import { AlertDialogComponent } from '../../forms/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
@Component({
  selector: 'foster-care-placement-support',
  templateUrl: './foster-care-placement-support.component.html',
  styleUrls: ['./foster-care-placement-support.component.scss', '../../forms/forms-common.scss']
})
export class FosterCarePlacementSupportComponent implements OnInit {
  fosterCare: FosterCare = new FosterCare();
  @Input() model: any;
  date: any;
  docId: string;
  ClientName: string;
  staffName: string;
  fromTime: string;
  isFinalize = false;
  constructor(private route: ActivatedRoute, private pouchDBService: PouchDbService,
    public dialog: MatDialog,
    private formEditor: FormEditorComponent) {

  }
  setClient(client: any) {
    this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.clientId = client.clientID;
    this.model.referralId = client.referralid;
  }
  displayClientName() {
    return this.model.ClientName.value;
  }
  ngOnInit() {
    let date = Date.now();
    this.date = new Date();
    this.docId = this.route.snapshot.paramMap.get('docId');

    let currentTime = new Date(),
      hours = (currentTime.getHours() < 10 ? '0' : '') + currentTime.getHours(),
      mins = (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();
    this.fromTime = hours + ':' + mins;
    // if its a new form
    if (!this.docId) {

      // staff detials
      this.pouchDBService.getUser().then(data => {
        if (data) {
          this.staffName = data.staffName + data.lastName;
          this.model.staffName = this.staffName;
          this.model.StaffName.value = this.staffName;
        } else {
          console.log('No User Information Found');
        }
      }).catch(error => {
        console.log('Error in retieving user information', error);
      });

      this.model.name = Constants.PROGRAMS.FOSTER_CARE_HOMES.FORMS.REINTEGRATION_FOSTER_CARE_PLACEMENT_SUPPORT_PLAN;
      this.model.program = Constants.PROGRAMS.FOSTER_CARE_HOMES.MENU_TITLE;
      this.model.clientId = '';
      this.model.formName = 'Placement Support Plan';
      this.model.personType = 'Placement Plan - Licensed';
      Object.assign(this.model, {
        'ClientName': {
          'value': ''
        },
        'DateOfPlacement': {
          'value': ''
        },
        'CompletionDate': {
          'value': this.date
        },
        'CaseManager': {
          'value': ''
        },
        'FromTime': {
          'value': this.fromTime
        },
        'ToTime': {
          'value': ''
        },
        'ProviderID': {
          'value': ''
        },
        'MedicationsNeedToBeFilled': {
          'value': ''
        },
        'KPHAppointmentsScheduled': {
          'value': ''
        },
        'SFCSAssistFirst7Days': {
          'value': ''
        },
        'DeescalationTatics': {
          'value': ''
        },
        'CommunityResources': {
          'value': ''
        },
        'FosterCareWorker': {
          'value': ''
        },
        'KinshipWorker': {
          'value': ''
        },
        'LicensedPermanencySpecialist': {
          'value': ''
        },
        'FamilySupportWorker': {
          'value': ''
        },
        'StaffName': {
          'value': ''
        },
        'AppointmentType1': {
          'value': ''
        },
        'AppointmentType2': {
          'value': ''
        },
        'AppointmentType3': {
          'value': ''
        },
        'AppointmentType4': {
          'value': ''
        },
        'AppointmentChild1': {
          'value': ''
        },
        'AppointmentChild2': {
          'value': ''
        },
        'AppointmentChild3': {
          'value': ''
        },
        'AppointmentChild4': {
          'value': ''
        },
        'AppointmentTime1': {
          'value': ''
        },
        'AppointmentTime2': {
          'value': ''
        },
        'AppointmentTime3': {
          'value': ''
        },
        'AppointmentTime4': {
          'value': ''
        },
        'AppointmentLocation1': {
          'value': ''
        },
        'AppointmentLocation2': {
          'value': ''
        },
        'AppointmentLocation3': {
          'value': ''
        },
        'AppointmentLocation4': {
          'value': ''
        },
        'PreferredCommunication': {
          'value': ''
        },
        'PhoneNumber': {
          'value': ''
        },
        'DayCareOutings': {
          'value': ''
        },
        'InServiceDays': {
          'value': ''
        },
        'presentAtVisit': {
          'value': ''
        },
        'personTypeField': {
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
    this.fosterCare.valueArr.map((val) => {
      if (this.model[`${Object.keys(val)[0]}`].value === '') {
        value.push(Object.values(val)[0]);
      }
    });
    if (value.length > 0) {
      this.dialog.open(AlertDialogComponent, {
        data: { labels: value }
      });
    } else {
      this.isFinalize = true;
      let date = moment(this.model.CompletionDate.value).format('YYYY-MM-DD');
      this.model.beginDate = date + " " + this.model.FromTime.value + ":00.000";
      this.model.endDate = date + " " + this.model.ToTime.value + ":00.000";
      this.formEditor.finalize();
    }
  }
}
