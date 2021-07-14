import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '../../../constants';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { PouchDbService } from '../../../providers/pouchdb.service';
import * as moment from 'moment';
import { PermanencyRelease } from './permanencyRelease';
import { MatDialog } from '@angular/material';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import _ from 'lodash';

@Component({
  selector: 'permanancy-release-or-changeof-visit-form',
  templateUrl: './permanancy-release-or-changeof-visit-form.component.html',
  styleUrls: ['./permanancy-release-or-changeof-visit-form.component.scss', './../forms-common.scss']
})
export class PermanancyReleaseOrChangeofVisitFormComponent implements OnInit {
  permanencyRelease: PermanencyRelease = new PermanencyRelease();
  @Input() model: any;
  date: string;
  docId: string;
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
    this.model.Facts.value = client.facts;
    this.model.referralId = client.referralid;
    if (client.facts === null || client.facts === undefined || client.facts === '') {
      this.model.Facts.value = 'NA'
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
          this.model.StaffName.value = this.staffName;
        } else {
          console.log('No User Information Found');
        }
      }).catch(error => {
        console.log('Error in retieving user information', error);
      });

      this.model.name = Constants.PROGRAMS.REINTEGRATION.FORMS.PERMANENCY_RELEASE_OR_CHANGE_OF_STATUS;
      this.model.program = Constants.PROGRAMS.REINTEGRATION.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      this.model.validationCheckboxFields = {
        'check1': ['REUNI', 'CustodialParent', 'NonCustodialParent', 'APASigned', 'Released', 'AdoptivePlacement', 'DirectPlacement', 'Relative', 'NonRelatives', 'AgedOut', 'ReturnedHome']
        ,
        'check2': ['custodial_Parent', 'nonCustodial_Parent', 'KDOC', 'Custodianship', 'ChildDeath', 'AfterCareLivingOutOfState', 'DCFRetraction', 'AfterCareCompleted'],

        'check3': ['InitiatedDCF', 'InitiatedSFCS', 'InitiatedCourt']
      };
      Object.assign(this.model, {
        'ClientName': {
          'value': ''
        },
        'Kaecses': {
          'value': ''
        },
        'CompletionDate': {
          'value': this.date
        },
        'Facts': {
          'value': ''
        },
        'DateOfRelease': {
          'value': ''
        },
        'PreviousPlacementName': {
          'value': ''
        },
        'PreviousPlacementAddress': {
          'value': ''
        },
        'PreviousPlacementSchool': {
          'value': ''
        },
        'PreviousPlacementLevelOfCare': {
          'value': ''
        },
        'PermanencyPlacementName': {
          'value': ''
        },
        'PermanencyPlacementAddress': {
          'value': ''
        },
        'PermanencyPlacementPhone': {
          'value': ''
        },
        'PermanencyPlacementSchool': {
          'value': ''
        },
        'HighestGradeCompleted': {
          'value': ''
        },
        'REUNI': {
          'fieldOptionIndex': ''
        },
        'Released': {
          'fieldOptionIndex': ''
        },
        'DirectPlacement': {
          'fieldOptionIndex': ''
        },
        'Relative': {
          'fieldOptionIndex': ''
        },
        'NonRelatives': {
          'fieldOptionIndex': ''
        },
        'ReturnedHome': {
          'fieldOptionIndex': ''
        },
        'CustodialParent': {
          'fieldOptionIndex': ''
        },
        'NonCustodialParent': {
          'fieldOptionIndex': ''
        },
        'APASigned': {
          'fieldOptionIndex': ''
        },
        'AdoptivePlacement': {
          'fieldOptionIndex': ''
        },
        'AgedOut': {
          'fieldOptionIndex': ''
        },
        'KDOC': {
          'fieldOptionIndex': ''
        },
        'ChildDeath': {
          'fieldOptionIndex': ''
        },
        'DCFRetraction': {
          'fieldOptionIndex': ''
        },
        'Custodianship': {
          'fieldOptionIndex': ''
        },
        'AfterCareLivingOutOfState': {
          'fieldOptionIndex': ''
        },
        'AfterCareCompleted': {
          'fieldOptionIndex': ''
        },
        'ChangeOfVenu': {
          'fieldOptionIndex': ''
        },
        'custodial_Parent': {
          'fieldOptionIndex': ''
        },
        'nonCustodial_Parent': {
          'fieldOptionIndex': ''
        },
        'Office': {
          'value': ''
        },
        'SocialWorker': {
          'value': ''
        },
        'email': {
          'value': ''
        },
        'ChangeOfVenueTo': {
          'value': ''
        },
        'DateCountAcceptedVenue': {
          'value': ''
        },
        'NewCourtCaseNo': {
          'value': ''
        },
        'NewDCFWorker': {
          'value': ''
        },
        'InitiatedCourt': {
          'fieldOptionIndex': ''
        },
        'InitiatedSFCS': {
          'fieldOptionIndex': ''
        },
        'InitiatedDCF': {
          'fieldOptionIndex': ''
        },
        'Judge': {
          'value': ''
        },
        'StaffName': {
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
    let check1 = this.model.validationCheckboxFields.check1.filter(data => {
      if ((this.model[data].fieldOptionIndex === true) || (this.model[data].fieldOptionIndex === 'true')) {
        return data;
      }
    });
    let check2 = this.model.validationCheckboxFields.check2.filter(data => {
      if ((this.model[data].fieldOptionIndex === true) || (this.model[data].fieldOptionIndex === 'true')) {
        return data;
      }
    });
    let check3 = this.model.validationCheckboxFields.check3.filter(data => {
      if ((this.model[data].fieldOptionIndex === true) || (this.model[data].fieldOptionIndex === 'true')) {
        return data;
      }
    });
    if (check1.length === 0) {
      value.push('Please check any one of Reason for Permanency, Release or Change of Status');
    }
    if (check2.length === 0) {
      value.push('Please check any one of under Highest Grade Completed');
    }
    if (check3.length === 0) {
      value.push('Please check any one of Who initiated the permanency or release')
    }
    this.permanencyRelease.valueArr.map((val) => {
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
      this.formEditor.finalize();
    }
  }
}
