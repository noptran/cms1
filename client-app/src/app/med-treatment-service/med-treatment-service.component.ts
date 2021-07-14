import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { MedTreatServiceForm } from './med-treatment-form';
import { CaseTeamService } from '../case-team/case-team.service';
import swal from 'sweetalert2';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { PagesizeService } from '../pagesize/pagesize.service';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';


@Component({
  selector: 'app-med-treatment-service',
  templateUrl: './med-treatment-service.component.html',
  styleUrls: ['./med-treatment-service.component.scss']
})
export class MedTreatmentServiceComponent implements OnInit {
  @Input() get_referralID:any;
  medTreatServiceForm: MedTreatServiceForm = new MedTreatServiceForm();
  rowData: any;
  totalCount: any;
  initial = 1;
  end = 100;
  headers = [];
  isPlesWait=false;
  rawdata = [];
  columnDefs = [];
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  @ViewChild('agGrid', { static: true }) agGrid: AgGridNg2;
  constructor(public _caseTeam: CaseTeamService, public _pageSize: PagesizeService, public _openCards: OpencardsService) { }
  @Output() closeModel = new EventEmitter<string>();
  isPopWindow = false;
  isPopListWindow = true;
  clientName: any;
  cities2 = [];
  defaultColDef: any;
  req: any;

  ngOnInit() {
    this.getAllListView(this.initial, this.end);
    this.getAllTreatmentTypes();
    this.clientName = localStorage.getItem("clientName");
  }
  formAction() {
    this.end = 100;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.medTreatServiceForm.referralID = this.get_referralID;
    this.medTreatServiceForm.clientID = parseInt(localStorage.getItem("clientId")) - this._openCards.getHasKey();
    !isNullOrUndefined(this.medTreatServiceForm.treatmentServicesTypeID) ? this.medTreatServiceForm.treatmentServicesTypeID = this.medTreatServiceForm.treatmentServicesTypeID.treatmentServicesTypeID : null;
    // this.medTreatServiceForm.treatmentServicesTypeID = this.medTreatServiceForm.treatmentServicesTypeID.treatmentServicesTypeID;
    if (this.isUpdate) {
      this.medTreatServiceForm['treatmentServiceID'] = this.treatmentServicesID;
      this._caseTeam.updateTreatmentService(this.medTreatServiceForm).then((data: any) => {
        loader.style.display = 'none';
        this.isPopWindow = false;
        swal('Save', 'Successfully Saved!', 'success');
        this.getAllListView(this.initial, this.end);
      }).catch(error => {
        loader.style.display = 'none';
      });
    } else {
      delete this.medTreatServiceForm['treatmentServiceID'];
      this._caseTeam.saveTreatmentService(this.medTreatServiceForm).then((data: any) => {
        loader.style.display = 'none';
        this.isPopWindow = false;
        swal('Save', 'Successfully Saved!', 'success');
        this.getAllListView(this.initial, this.end);
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

  getAllListView(initial,end) {
    this.isPlesWait = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      "referralID": this.get_referralID,
      "beginPagination": initial,
      "endPagination": end,
    };
    this._openCards
      .getTreatmentServices(me_Req)
      .then(data => {
        this.isPlesWait = false;
        this.generateListView(data);
        loader.style.display = "none";
      });
  };
  generateListView(data) {
    console.log("data in generateListView is", data);
    let rowData = [];
    let test = [];
    this.totalCount = data.totalCount;
    this.rowData = data.treatmentServices;
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
    this.medTreatServiceForm.beginDate = new Date();
    this.medTreatServiceForm.endDate = new Date();
    this.medTreatServiceForm.notes = '';
  };
  isUpdate_dis = false;
  isUpdate = false;
  treatmentServicesID: any;
  isEdit = false;
  module: any;
  onRowSelected(event) {
    this.isPopWindow = false;
    console.log(event);
    // this.medTreatServiceForm = event.data;
    this.isUpdate = true;
    this.isUpdate_dis = true;
    this.isEdit = true;
    this.treatmentServicesID = event.data.treatmentServicesID;
    this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(event.data.treatmentServicesID.changedBy) ? event.data.treatmentServicesID.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(event.data.treatmentServicesID.changedDate) ? moment(event.data.treatmentServicesID.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(event.data.treatmentServicesID.enteredBy) ? event.data.treatmentServicesID.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(event.data.treatmentServicesID.enteredDate) ? moment(event.data.treatmentServicesID.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    this.module = {
      treatmentServicesID: this.treatmentServicesID
    };
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    this.treatGetByIds();
  };
  treatGetByIds() {
    this.isPlesWait = true;
    this.medTreatServiceForm.treatmentServicesTypeID = {};
    this.medTreatServiceForm.beginDate = "";
    this.medTreatServiceForm.endDate = "";
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      "treatmentServiceID": this.treatmentServicesID,
    };
    this._openCards
      .getTreatmentById(me_Req)
      .then(data_res => {
        this.isPopWindow = true;
        this.isPlesWait = false;
        loader.style.display = "none";
        this.medTreatServiceForm.beginDate = new Date(data_res['treatmentService'].beginDateTime);
        this.medTreatServiceForm.endDate = new Date(data_res['treatmentService'].endDateTime);
        this.medTreatServiceForm.treatmentServicesTypeID = data_res['treatmentService'].treatmentServicesTypeID;
        this.medTreatServiceForm.notes = data_res['treatmentService'].notes;
        this.isPopWindow = true;
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
    if (this.module) {
      let req = {};
      req['treatmentServicesID'] = this.treatmentServicesID;
      await this.deleteRecord(req);
    }
    this.deleteConfirmationBtnLabel = 'Confirm';
    this.isDeleteConfirmationDisable = false;
    this.infoText = 'The record has been deleted successfully!';
    swal('Save', 'The record has been deleted successfully!', 'success');
    this.getAllListView(this.initial, this.end);
  }

  deleteRecord(deleteReq: any) {
    this.infoText = '';
    return new Promise((resolve) => {
      this._openCards.treatmentServiceDdelete(deleteReq).then((data: any) => {
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
        // this.medTreatServiceForm.treatmentServicesTypeID = data[0];
      });
  }
  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      // return this.getPerson(this.initial, this.end);
    }
  };
  pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;
      return this.getAllListView(this.initial, this.end);
    }
  }
}
