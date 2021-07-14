import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Constants } from '../../../constants';
import { PouchDbService } from '../../../providers/pouchdb.service';
import * as moment from 'moment';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { AdoptiveInquiry } from './adoptiveInquiry';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'adoptive-resource-inquiry-form',
  templateUrl: './adoptive-resource-inquiry-form.component.html',
  styleUrls: ['./adoptive-resource-inquiry-form.component.scss', './../forms-common.scss']
})
export class AdoptiveResourceInquiryFormComponent implements OnInit {
  @Input() model: any;
  adoptiveInquiry: AdoptiveInquiry = new AdoptiveInquiry();
  clientname: string;
  staffName: string;
  date: any;
  docId: string;
  clientDOB: string;
  isFinalize = false;
  constructor(private route: ActivatedRoute, private pouchDBService: PouchDbService,
    private formEditor: FormEditorComponent, public dialog: MatDialog) {

  }
  setClient(client: any) {
    this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.clientId = client.clientID;
    this.model.Kaecses.value = client.kaecses;
    this.model.DateOfBirth.value = client.dob;
    this.model.referralId = client.referralid;
    this.clientDOB = client.dob;
  }
  displayClientName() {
    return this.model.ClientName.value;
  }
  ngOnInit() {
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
        } else {
          console.log('No User Information Found');
        }
      }).catch(error => {
        console.log('Error in retieving user information', error);
      });

      this.model.name = Constants.PROGRAMS.REINTEGRATION.FORMS.ADOPTIVE_RESOURCE_INQUIRY;
      this.model.program = Constants.PROGRAMS.REINTEGRATION.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      Object.assign(this.model, {
        'ClientName': {
          'value': ''
        },
        'CompletionDate': {
          'value': this.date
        },
        'DateOfBirth': {
          'value': ''
        },
        'Kaecses': {
          'value': ''
        },
        'ClientPhone1': {
          'value': ''
        },
        'ClientPhone2': {
          'value': ''
        },
        'FamilyName': {
          'value': ''
        },
        'FamilyAddress': {
          'value': ''
        },
        'FamilyPhone': {
          'value': ''
        },
        'FamilyEmail': {
          'value': ''
        },
        'ChildrenInTheHome1': {
          'value': ''
        },
        'ChildrenInTheHome2': {
          'value': ''
        },
        'ChildrenInTheHome3': {
          'value': ''
        },
        'ChildrenInTheHome4': {
          'value': ''
        },
        'ChildrenInTheHome5': {
          'value': ''
        },
        'ChildrenInTheHomeAge1': {
          'value': ''
        },
        'ChildrenInTheHomeAge2': {
          'value': ''
        },
        'ChildrenInTheHomeAGe3': {
          'value': ''
        },
        'ChildrenInTheHomeAge4': {
          'value': ''
        },
        'ChildrenInTheHomeAge5': {
          'value': ''
        },
        'OtherIndividualsAge1': {
          'value': ''
        },
        'OtherIndividuals1': {
          'value': ''
        },
        'OtherIndividualsAge2': {
          'value': ''
        },
        'OtherIndividuals2': {
          'value': ''
        },
        'OtherIndividualsAge3': {
          'value': ''
        },
        'OtherIndividuals3': {
          'value': ''
        },
        'OtherIndividualsAge4': {
          'value': ''
        },
        'OtherIndividuals4': {
          'value': ''
        },
        'OtherIndividualsAge5': {
          'value': ''
        },
        'OtherIndividuals5': {
          'value': ''
        },
        'ps': {
          'fieldOptionIndex': ''
        },
        'KinshipPlacement': {
          'fieldOptionIndex': ''
        },
        'AssessmentCompleted': {
          'fieldOptionIndex': ''
        },
        'AnotherState': {
          'fieldOptionIndex': ''
        },
        'licensed': {
          'fieldOptionIndex': ''
        },
        'Motivation': {
          'value': ''
        },
        'SponsoringAgency': {
          'value': ''
        },
        'PastState': {
          'value': ''
        },
        'Relationship': {
          'value': ''
        },
        'concerns': {
          'value': ''
        },
        'AwareOfChild': {
          'value': ''
        },
        'ResourceForSibling': {
          'value': ''
        },
        'ApprovedSplit': {
          'fieldOptionIndex': ''
        },
        'ResourceForSiblings': {
          'fieldOptionIndex': ''
        },
        'SiblingsOutOfHomeName2': {
          'value': ''
        },
        'SiblingsOutOfHomeName1': {
          'value': ''
        },
        'SiblingsOutOfHomeName3': {
          'value': ''
        },
        'SiblingsOutOfHomeName4': {
          'value': ''
        },
        'SiblingsOutOfHomeName5': {
          'value': ''
        },
        'SiblingsOutOfHomeName6': {
          'value': ''
        },
        'SiblingsOutOfHomeAge1': {
          'value': ''
        },
        'SiblingsOutOfHomeAge2': {
          'value': ''
        },
        'SiblingsOutOfHomeAge3': {
          'value': ''
        },
        'SiblingsOutOfHomeAge4': {
          'value': ''
        },
        'SiblingsOutOfHomeAge5': {
          'value': ''
        },
        'SiblingsOutOfHomeAge6': {
          'value': ''
        },
        'SiblingsOutOfHomeCaseplangoal1': {
          'value': ''
        },
        'SiblingsOutOfHomeCaseplangoal2': {
          'value': ''
        },
        'SiblingsOutOfHomeCaseplangoal3': {
          'value': ''
        },
        'SiblingsOutOfHomeCaseplangoal4': {
          'value': ''
        },
        'SiblingsOutOfHomeCaseplangoal5': {
          'value': ''
        },
        'SiblingsOutOfHomeCaseplangoal6': {
          'value': ''
        },
        'childWorker': {
          'value': ''
        },
        'Inquiry': {
          'fieldOptionIndex': ''
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
    this.adoptiveInquiry.valueArr.map((val) => {
      if (this.model[`${Object.keys(val)[0]}`].value === '') {
        value.push(Object.values(val)[0]);
      }
    });
    this.adoptiveInquiry.optionIndex.map((val) => {
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
