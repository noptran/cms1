import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '../../../constants';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { PouchDbService } from '../../../providers/pouchdb.service';
import * as moment from 'moment';
@Component({
  selector: 'request-financial-form',
  templateUrl: './request-financial-form.component.html',
  styleUrls: ['./request-financial-form.component.scss', './../forms-common.scss']
})
export class RequestFinancialFormComponent implements OnInit {
  @Input() model: any;
  date: string;
  docId: string;
  staffName: string;
  clientDOB: string;
  constructor(private route: ActivatedRoute, private pouchDBService: PouchDbService) {

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

      // this.model.name = Constants.PROGRAMS.REINTEGRATION.FORMS.REQUEST_FOR_FINANCIAL_ASSISTANCE;
      this.model.program = Constants.PROGRAMS.REINTEGRATION.SHORT_NAME;
      this.model.clientId = '';
      this.model.formName = this.model.name;
      Object.assign(this.model, {
        'ClientName': {
          'value': ''
        },
        'facts': {
          'value': ''
        },
        'ReferralDate': {
          'value': ''
        },
        'FinancialMgmt': {
          'value': ''
        },
        'RequestDate': {
          'value': ''
        },
        'TO': {
         'value': ''
        },
        'FROM': {
          'value': ''
        },
        'child1': {
          'value': ''
        },
        'KAECSES1': {
          'value': ''
        },
        'DOB1': {
          'value': ''
        },
        'Amount1': {
          'value': ''
        },
        'KAECSES2': {
          'value': ''
        },
        'KAECSES3': {
          'value': ''
        },
        'KAECSES4': {
          'value': ''
        },
        'KAECSES5': {
          'value': ''
        },
        'KAECSES6': {
          'value': ''
        },
        'DOB2': {
          'value': ''
        }, 
        'DOB3': {
          'value': ''
        },
        'DOB4': {
          'value': ''
        },
        'DOB5': {
         'value': ''
        },
        'DOB6': {
          'value': ''
        },
        'Amount2': {
          'value': ''
        },
        'Amount3': {
          'value': ''
        },
        'Amount4': {
          'value': ''
        },
        'Amount5': {
          'value': ''
        },
        'Amount6': {
          'value': ''
        },
        'child2': {
          'value': ''
        },
        'child3': {
          'value': ''
        },
        'child4': {
          'value': ''
        },
        'child5': {
          'value': ''
        },
        'child6': {
          'value': ''
        },
        'PriorFinancial': {
          'value': ''
        },
        'Need': {
          'value': ''
        },
        'AmountNeeded': {
          'value': ''
        },
        'PayOrder': {
          'value': ''
        },
        'Address': {
          'value': ''
        }, 
        'communityresources': {
          'value': ''
        },
        'receivingAssistance': {
          'value': ''
        },
        'familyCaseplan': {
          'value': ''
        },
        'Date': {
          'value': ''
        },
        'StaffSignature': {
          'value': ''
        },
        'SupervisorSignature': {
          'value': ''
        }, 
        'SupervisorDate': {
          'value': ''
        },
        'receipts': {
          'fieldOptionIndex': ''
        },
      });
    }
  }
}
