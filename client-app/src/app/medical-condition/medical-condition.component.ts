import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { CaseTeamService } from '../case-team/case-team.service';
import swal from 'sweetalert2';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { AgGridNg2 } from 'ag-grid-angular';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-medical-condition',
  templateUrl: './medical-condition.component.html',
  styleUrls: ['./medical-condition.component.scss']
})
export class MedicalConditionComponent implements OnInit {
  @Input() get_referralID:any;
  rowData: any;
  totalCount: any;
  medicalConditions:any;
  headers = [];
  initial = 1;
  isPlesWait=false;
  end = 100;
  rawdata = [];
  columnDefs = [];
  @ViewChild('agGrid', { static: true }) agGrid: AgGridNg2;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  defaultColDef: any;
  req: any;

  constructor(public _caseTeam: CaseTeamService, public _openCards: OpencardsService) { }
  @Output() closeModel = new EventEmitter<string>();
  isPopWindow = false;
  isPopListWindow = true;
  ngOnInit() {
    this.getAllListView(this.initial,this.end);
    this.getAllTreatmentTypes();
  }
  formAction() {
    this.end = 100;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.isPlesWait=true;
    var req={
      medicalConditions:this.medicalConditions,
      clientID:parseInt(localStorage.getItem("clientId")) - this._openCards.getHasKey()
    }
    if (this.isUpdate) {
      this.isPopWindow = false;
      req['clientMedicalConditionsID'] = this.clientMedicalConditionsID;
      this._caseTeam.saveMedicalConditionService(req).then((data: any) => {
        loader.style.display = 'none';
        this.isPlesWait=false;
        swal('Save', 'Successfully Saved!', 'success');
        this.getAllListView(this.initial,this.end);
      }).catch(error => {
        loader.style.display = 'none';
      });
    } else {
      this._caseTeam.saveMedicalConditionService(req).then((data: any) => {
        loader.style.display = 'none';
        this.isPopWindow = false;
        swal('Save', 'Successfully Saved!', 'success');
        this.getAllListView(this.initial,this.end);
      }).catch(error => {
        loader.style.display = 'none';
      });
    }
  };


  close() {
    var closeEV = "false";
    this.closeModel.emit(closeEV)
    console.log("closed>>>>");
  }

  getAllListView(intt,end) {
    this.isPlesWait=true;
    
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      "referralID": this.get_referralID,
      beginPagination: intt,
      endPagination: end,
    };
    this._openCards
      .getMedicalConditionServices(me_Req)
      .then(data => {
        this.isPlesWait=false;
        this.generateListView(data);
        loader.style.display = "none";
      });
  };
  generateListView(data) {
    console.log("data in generateListView is", data);
    let rowData = [];
    let test = [];
    this.totalCount = data.totalCount;
    this.rowData = data.treatmentDecisions;
    console.log("This row data", this.rowData);
    if (this.rowData.length > 0) {
      this.headers.push(Object.keys(this.rowData[0]));
      this.headers[0].map(function (result) {
        let data = {
          headerName: result
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace(/([A-Z])/g, " $1")
            .trim(),
          field: result,
        };
        test.push(data);
      });
      test.sort((a, b) => a['order'] - b['order']);
      this.rawdata.push(test);
      this.columnDefs = this.rawdata[0];
      if (this.totalCount < 100) {
        this.end = this.totalCount;
      }
    }
  };
  showSaveModel() {
    this.isPopWindow = true;
    this.isUpdate_dis = false;
    this.isUpdate = false;
    this.isEdit = false;
  };
  isUpdate_dis = false;
  isUpdate = false;
  clientMedicalConditionsID: any;
  isEdit = false;
  module: any;
  onRowSelected(event) {
    this.isPopWindow = true;
    console.log(event);
    // this.medTreatServiceForm = event.data;
    this.isUpdate = true;
    this.isUpdate_dis = true;
    this.isEdit = true;
    this.medicalConditions = "";
    this.clientMedicalConditionsID = event.data.clientMedicalConditionsID;
    this.isFormLog = true;
    this.formLogInfo.changedBy = !isNullOrUndefined(event.data.clientMedicalConditionsID.changedBy) ? event.data.clientMedicalConditionsID.changedBy : '------';
    this.formLogInfo.changedDate = !isNullOrUndefined(event.data.clientMedicalConditionsID.changedDate) ? moment(event.data.clientMedicalConditionsID.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
    this.formLogInfo.enteredBy = !isNullOrUndefined(event.data.clientMedicalConditionsID.enteredBy) ? event.data.clientMedicalConditionsID.enteredBy : '------';
    this.formLogInfo.enteredDate = !isNullOrUndefined(event.data.clientMedicalConditionsID.enteredDate) ? moment(event.data.clientMedicalConditionsID.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    this.treatGetByIds();
  };

  treatGetByIds() {
    this.isPlesWait=true;
    let me_Req = {
      "clientMedicalConditionsID": this.clientMedicalConditionsID
    };
    this._caseTeam
      .getMedicalConditionService(me_Req)
      .then(data_res => {
        this.isPlesWait=false;
        this.medicalConditions= data_res.treatmentDecisions[0].MedicalConditions;
      });
  }
  editForm() {
    this.isUpdate_dis = false;
    this.isEdit = false;
  }
  discard() {
    this.isPopWindow = false;
  };
  isDeleteConfirmation = false;
  deleteConfirmationBtnLabel = 'Confirm';
  isDeleteConfirmationDisable = false;
  infoText: string;
  async onDelete() {
    this.deleteConfirmationBtnLabel = 'Deleting...';
    this.isDeleteConfirmationDisable = true;
      let req = {};
      req['clientMedicalConditionsID'] = this.clientMedicalConditionsID;
      await this.deleteRecord(req);
    this.deleteConfirmationBtnLabel = 'Confirm';
    this.isDeleteConfirmationDisable = false;
    swal('Save', 'The record has been deleted successfully!', 'success');
    this.getAllListView(this.initial, this.end);
    this.isPopWindow = false;
    this.infoText = 'The record has been deleted successfully!';
  }

  deleteRecord(deleteReq: any) {
    this.infoText = '';
    return new Promise((resolve) => {
      this._openCards.medicalConditiondelete(deleteReq).then((data: any) => {
        this.isPopWindow = false;
        this.isDeleteConfirmation = false;
        resolve(data);
      })
    })
  };
  alltreatmentTypes = [];
  getAllTreatmentTypes() {
    this._openCards
      .getTreatmentAllTypes().then(data => {
        this.alltreatmentTypes = data;
      });
  }
}
