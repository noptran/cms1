import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Constants } from '../../../constants';
import { PouchDbService } from '../../../providers/pouchdb.service';
import { DatePipe } from "@angular/common";
import { Csdc } from './csdc';
import { AlertDialogComponent } from '../../forms/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material';
import { FormEditorComponent } from '../../form-editor/form-editor.component';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'csdc-form',
  templateUrl: './csdc-form.component.html',
  styleUrls: ['./csdc-form.component.scss', '../../forms/forms-common.scss']
})
export class CsdcFormComponent implements OnInit {
  csdc: Csdc = new Csdc();
  @Input() model: any;
  docId: string;
  date: string;
  staffName: string;
  staffId: string;
  datePipe: DatePipe = new DatePipe('en-US');
  facts: string;
  clientID: string;
  loading: boolean = false;
  search: string;
  isFinalize = false;
  value = [];
  constructor(private route: ActivatedRoute,
    private pouchDBService: PouchDbService,
    public dialog: MatDialog,
    private formEditor: FormEditorComponent) {

  }

  setClient(client: any) {
    this.model.ClientName.value = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.clientId = client.clientID;
    this.model.referralId = client.referralid;
    this.model.facts = client.facts;
  }
  childTwo(client: any) {
    this.model.clientName2 = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.multiClientArr.push({ id: 2, clientId: client.clientID, referralId: client.referralid, clientName: client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname });
  }
  childThree(client: any) {
    this.model.clientName3 = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.multiClientArr.push({ id: 3, clientId: client.clientID, referralId: client.referralid, clientName: client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname });
  }
  childFour(client: any) {
    this.model.clientName4 = client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname;
    this.model.multiClientArr.push({ id: 4, clientId: client.clientID, referralId: client.referralid, clientName: client.lastname.charAt(0).toUpperCase() + client.lastname.slice(1) + ', ' + client.firstname });
  }
  disableValidationProcess() {
    if (this.model.disableValidate === true) {
      Object.assign(this.model, {
        'CompletionDate': {
          'value': ''
        },
        'CareGiverName': {
          'value': ''
        },
        'RelationToClientOther': {
          'value': ''
        },
        'CareGiverRelationToClient': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question1_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question1_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question1_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question1_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question2_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question2_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question2_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question2_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question3_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question3_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question3_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question3_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question4_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question4_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question4_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question4_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question5_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question5_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question5_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question5_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question6_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question6_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question6_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question6_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question7_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question7_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question7_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question7_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question8_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question8_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question8_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question8_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question9_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question9_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question9_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question9_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question10_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question10_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question10_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question10_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question11_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question11_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question11_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question11_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question12_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question12_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question12_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question12_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question13_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question13_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question13_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question13_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question14_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question14_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question14_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question14_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'StaffName': {
          'value': ''
        },
        'StaffID': {
          'value': ''
        },
        'CSDC_KS_ClientName1': {
          'value': ''
        },
        'CSDC_KS_ClientName2': {
          'value': ''
        },
        'CSDC_KS_ClientName3': {
          'value': ''
        },
        'CSDC_KS_ClientName4': {
          'value': ''
        },
        'CSDC_KS_PartC_Question1_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question1_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question1_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question1_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_NoneOfAbove_CheckBox': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question2_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question2_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question2_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question2_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question3_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question3_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question3_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question3_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question4_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question4_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question4_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question4_Client4': {
          'fieldOptionIndex': ''
        },
        'CTotal_Client1': {
          'value': ''
        },
        'CTotal_Client2': {
          'value': ''
        },
        'CTotal_Client3': {
          'value': ''
        },
        'CTotal_Client4': {
          'value': ''
        },
        'CSDC_KS_PartD_Question1_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question1_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question1_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question1_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question2_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question2_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question2_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question2_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question3_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question3_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question3_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question3_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question4_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question4_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question4_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question4_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question5_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question5_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question5_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question5_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question6_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question6_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question6_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question6_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question7_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question7_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question7_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question7_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question8_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question8_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question8_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question8_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question9_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question9_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question9_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question9_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question10_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question10_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question10_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question10_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question11_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question11_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question11_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question11_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question12_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question12_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question12_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question12_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question13_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question13_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question13_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question13_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question14_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question14_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question14_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question14_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question15_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question15_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question15_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question15_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question16_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question16_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question16_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question16_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question17_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question17_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question17_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question17_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question18_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question18_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question18_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question18_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question19_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question19_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question19_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question19_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question20_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question20_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question20_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question20_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question21_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question21_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question21_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question21_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question22_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question22_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question22_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question22_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question23_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question23_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question23_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question23_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question24_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question24_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question24_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question24_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question25_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question25_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question25_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question25_Client4': {
          'fieldOptionIndex': ''
        },
        'D2Total_Client4': {
          'value': ''
        },
        'D2Total_Client3': {
          'value': ''
        },
        'D2Total_Client2': {
          'value': ''
        },
        'D2Total_Client1': {
          'value': ''
        },
        'Sub_Total_Client4': {
          'value': ''
        },
        'Sub_Total_Client3': {
          'value': ''
        },
        'Sub_Total_Client2': {
          'value': ''
        },
        'Sub_Total_Client1': {
          'value': ''
        },
        'Total_Client4': {
          'value': ''
        },
        'Total_Client3': {
          'value': ''
        },
        'Total_Client2': {
          'value': ''
        },
        'Total_Client1': {
          'value': ''
        },
        'ClientID1': {
          'value': ''
        },
        'ClientID2': {
          'value': ''
        },
        'ClientID3': {
          'value': ''
        },
        'ClientID4': {
          'value': ''
        },
        'Client1ReferralID': {
          'value': ''
        },
        'Client2ReferralID': {
          'value': ''
        },
        'Client3ReferralID': {
          'value': ''
        },
        'Client4ReferralID': {
          'value': ''
        },
        'Age_Client1': {
          'value': ''
        },
        'Age_Client2': {
          'value': ''
        },
        'Age_Client3': {
          'value': ''
        },
        'Age_Client4': {
          'value': ''
        },
        'CSDC_KS_PartD_Question26_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question26_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question26_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question26_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question27_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question27_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question27_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question27_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question28_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question28_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question28_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question28_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question29_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question29_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question29_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question29_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question30_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question30_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question30_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question30_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question31_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question31_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question31_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question31_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question32_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question32_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question32_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question32_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question33_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question33_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question33_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question33_Client4': {
          'fieldOptionIndex': ''
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
  displayClientName() {
    return this.model.ClientName.value;
  }
  displayClientName1() {
    return this.model.clientName2;
  }
  displayClientName2() {
    return this.model.clientName3;
  }
  displayClientName3() {
    return this.model.clientName4;
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
      this.model.name = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.FORMS.CSDC;
      this.model.program = Constants.PROGRAMS.BEHAVIORAL_ASSESSMENTS.SHORT_NAME;
      this.model.clientId = '';
      this.model.multiClientArr = [];
      this.model.formName = this.model.name;
      this.model.validationFields = [];
      this.model.disableValidationFields = ['ClientName', 'remarks']

      Object.assign(this.model, {
        'ClientName': {
          'value': ''
        },
        'CompletionDate': {
          'value': ''
        },
        'CareGiverName': {
          'value': ''
        },
        'RelationToClientOther': {
          'value': ''
        },
        'CareGiverRelationToClient': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question1_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question1_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question1_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question1_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question2_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question2_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question2_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question2_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question3_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question3_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question3_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question3_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question4_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question4_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question4_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question4_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question5_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question5_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question5_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question5_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question6_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question6_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question6_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question6_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question7_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question7_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question7_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question7_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question8_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question8_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question8_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question8_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question9_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question9_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question9_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question9_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question10_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question10_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question10_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question10_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question11_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question11_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question11_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question11_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question12_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question12_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question12_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question12_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question13_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question13_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question13_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question13_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question14_CheckBox_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question14_CheckBox_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question14_CheckBox_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_Question14_CheckBox_Client4': {
          'fieldOptionIndex': ''
        },
        'StaffName': {
          'value': ''
        },
        'StaffID': {
          'value': ''
        },
        'CSDC_KS_ClientName1': {
          'value': ''
        },
        'CSDC_KS_ClientName2': {
          'value': ''
        },
        'CSDC_KS_ClientName3': {
          'value': ''
        },
        'CSDC_KS_ClientName4': {
          'value': ''
        },
        'CSDC_KS_PartC_Question1_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question1_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question1_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question1_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_NoneOfAbove_CheckBox': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question2_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question2_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question2_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question2_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question3_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question3_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question3_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question3_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question4_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question4_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question4_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartC_Question4_Client4': {
          'fieldOptionIndex': ''
        },
        'CTotal_Client1': {
          'value': ''
        },
        'CTotal_Client2': {
          'value': ''
        },
        'CTotal_Client3': {
          'value': ''
        },
        'CTotal_Client4': {
          'value': ''
        },
        'CSDC_KS_PartD_Question1_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question1_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question1_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question1_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question2_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question2_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question2_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question2_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question3_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question3_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question3_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question3_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question4_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question4_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question4_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question4_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question5_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question5_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question5_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question5_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question6_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question6_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question6_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question6_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question7_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question7_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question7_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question7_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question8_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question8_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question8_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question8_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question9_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question9_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question9_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question9_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question10_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question10_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question10_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question10_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question11_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question11_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question11_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question11_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question12_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question12_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question12_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question12_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question13_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question13_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question13_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question13_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question14_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question14_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question14_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question14_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question15_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question15_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question15_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question15_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question16_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question16_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question16_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question16_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question17_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question17_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question17_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question17_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question18_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question18_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question18_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question18_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question19_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question19_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question19_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question19_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question20_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question20_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question20_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question20_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question21_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question21_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question21_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question21_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question22_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question22_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question22_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question22_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question23_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question23_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question23_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question23_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question24_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question24_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question24_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question24_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question25_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question25_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question25_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question25_Client4': {
          'fieldOptionIndex': ''
        },
        'D2Total_Client4': {
          'value': ''
        },
        'D2Total_Client3': {
          'value': ''
        },
        'D2Total_Client2': {
          'value': ''
        },
        'D2Total_Client1': {
          'value': ''
        },
        'Sub_Total_Client4': {
          'value': ''
        },
        'Sub_Total_Client3': {
          'value': ''
        },
        'Sub_Total_Client2': {
          'value': ''
        },
        'Sub_Total_Client1': {
          'value': ''
        },
        'Total_Client4': {
          'value': ''
        },
        'Total_Client3': {
          'value': ''
        },
        'Total_Client2': {
          'value': ''
        },
        'Total_Client1': {
          'value': ''
        },
        'ClientID1': {
          'value': ''
        },
        'ClientID2': {
          'value': ''
        },
        'ClientID3': {
          'value': ''
        },
        'ClientID4': {
          'value': ''
        },
        'Client1ReferralID': {
          'value': ''
        },
        'Client2ReferralID': {
          'value': ''
        },
        'Client3ReferralID': {
          'value': ''
        },
        'Client4ReferralID': {
          'value': ''
        },
        'Age_Client1': {
          'value': ''
        },
        'Age_Client2': {
          'value': ''
        },
        'Age_Client3': {
          'value': ''
        },
        'Age_Client4': {
          'value': ''
        },
        'disableValidate': false,
        'remarks': {
          'value': ''
        },
        'CSDC_KS_PartD_Question26_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question26_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question26_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question26_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question27_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question27_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question27_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question27_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question28_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question28_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question28_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question28_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question29_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question29_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question29_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question29_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question30_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question30_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question30_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question30_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question31_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question31_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question31_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question31_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question32_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question32_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question32_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question32_Client4': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question33_Client1': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question33_Client2': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question33_Client3': {
          'fieldOptionIndex': ''
        },
        'CSDC_KS_PartD_Question33_Client4': {
          'fieldOptionIndex': ''
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
    this.value = [];
    if (this.model.disableValidate === true) {
      this.model.disableValidationFields.filter(data => {
        if ((this.model[data].value === "") || (this.model[data].fieldOptionIndex === "")) {
          this.value.push(data);
        }
      });
    } else if (this.model.disableValidate === false) {
      this.otherSpecifyValidation();
      // mandatory for all childs
      this.csdc.valueArr.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].value === '') {
          this.value.push(Object.values(val)[0]);
        }
      });
      this.csdc.optionIndex.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '') {
          this.value.push(Object.values(val)[0]);
        }
      });

      // mandatory for child 1
      this.childOneValidation();
      // mandatory for child 2
      this.childTwoValidation();
      //mandatory for child 3
      this.childThreeValidation();
      //mandatory for child 4
      this.childFourValidation();
    }
    if (this.value.length > 0) {
      this.dialog.open(AlertDialogComponent, {
        data: { labels: this.value }
      });
    } else {
      if (this.model.disableValidate === false) {
        this.practiceTips();
      }
      this.isFinalize = true;
      this.formEditor.finalize();
    }
  }
  childOneValidation() {
    if (!isNullOrUndefined(this.model.ClientName.value)) {
      this.csdc.child1ValueArr.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].value === '') {
          this.value.push(Object.values(val)[0]);
        }
      });
    }
    if (!isNullOrUndefined(this.model.ClientName.value)) {
      this.csdc.child1OptionIndex.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '') {
          this.value.push(Object.values(val)[0]);
        }
      });
    }
  }
  childTwoValidation() {
    if (!isNullOrUndefined(this.model.clientName2)) {
      this.csdc.child2ValueArr.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].value === '') {
          this.value.push(Object.values(val)[0]);
        }
      });
    }
    if (!isNullOrUndefined(this.model.clientName2)) {
      this.csdc.child2OptionIndex.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '') {
          this.value.push(Object.values(val)[0]);
        }
      });
    }
  }
  childThreeValidation() {
    if (!isNullOrUndefined(this.model.clientName3)) {
      this.csdc.child3ValueArr.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].value === '') {
          this.value.push(Object.values(val)[0]);
        }
      });
    }
    if (!isNullOrUndefined(this.model.clientName3)) {
      this.csdc.child3OptionIndex.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '') {
          this.value.push(Object.values(val)[0]);
        }
      });
    }
  }
  childFourValidation() {
    if (!isNullOrUndefined(this.model.clientName4)) {
      this.csdc.child4ValueArr.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].value === '') {
          this.value.push(Object.values(val)[0]);
        }
      });
    }
    if (!isNullOrUndefined(this.model.clientName4)) {
      this.csdc.child4OptionIndex.map((val) => {
        if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '') {
          this.value.push(Object.values(val)[0]);
        }
      });
    }
  }
  otherSpecifyValidation() {
    if (!isNullOrUndefined(this.model.CareGiverRelationToClient.fieldOptionIndex)) {
      if (this.model.CareGiverRelationToClient.fieldOptionIndex === '5') {
        this.csdc.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'RelationToClientOther') {
            this.csdc.valueArr.splice(index, 1);
          }
        });
        this.csdc.valueArr.push({ RelationToClientOther: 'Specify' });
      } else {
        this.csdc.valueArr.map((val, index) => {
          if (Object.keys(val)[0] === 'RelationToClientOther') {
            this.csdc.valueArr.splice(index, 1);
          }
        });
      }
    }
  }
  practiceTips() {
    this.model.MultiClientForPracticeTips = [];
    let client1, client2, client3, client4;
    this.csdc.optionIndex.map((val) => {
      if (Object.keys(val)[0].includes('Client1')) {
        if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '2') {
          client1 = true;
          return;
        }
      }
      if (Object.keys(val)[0].includes('Client2')) {
        if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '2') {
          client2 = true;
          return;
        }
      }
      if (Object.keys(val)[0].includes('Client3')) {
        if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '2') {
          client3 = true;
          return;
        }
      }
      if (Object.keys(val)[0].includes('Client4')) {
        if (this.model[`${Object.keys(val)[0]}`].fieldOptionIndex === '2') {
          client4 = true;
          return;
        }
      }
    });

    if (!isNullOrUndefined(this.model.clientId)) {
      this.model.MultiClientForPracticeTips.push({
        clientID: this.model.clientId,
        referralID: this.model.referralId,
        IsContains2: isNullOrUndefined(client1) ? false : true,
        Total: this.model.Total_Client1.value
      })
    }
    if (this.model.multiClientArr.length >= 1) {
      let child2 = this.model.multiClientArr.filter(item => item.id === 2);
      if (child2.length > 0) {
        this.model.MultiClientForPracticeTips.push({
          clientID: child2[0].clientId,
          referralID: child2[0].referralId,
          IsContains2: isNullOrUndefined(client2) ? false : true,
          Total: this.model.Total_Client2.value
        });
      }
      let child3 = this.model.multiClientArr.filter(item => item.id === 3);
      if (child3.length > 0) {
        this.model.MultiClientForPracticeTips.push({
          clientID: child3[0].clientId,
          referralID: child3[0].referralId,
          IsContains2: isNullOrUndefined(client3) ? false : true,
          Total: this.model.Total_Client3.value
        })
      }
      let child4 = this.model.multiClientArr.filter(item => item.id === 4);
      if (child4.length > 0) {
        this.model.MultiClientForPracticeTips.push({
          clientID: child4[0].clientId,
          referralID: child4[0].referralId,
          IsContains2: isNullOrUndefined(client4) ? false : true,
          Total: this.model.Total_Client4.value
        })
      }
    }
  }
}
