import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { CaseTeamService } from '../../case-team/case-team.service';
import swal from 'sweetalert2';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { PagesizeService } from '../../pagesize/pagesize.service';
import { isNullOrUndefined } from 'util';
import { TeamFormService } from '../../team-form/team-form.service';
import * as moment from 'moment';
@Component({
  selector: 'app-staff-notification-tranfer',
  templateUrl: './staff-notification-tranfer.component.html',
  styleUrls: ['./staff-notification-tranfer.component.scss']
})
export class StaffNotificationTranferComponent implements OnInit {
  isPopListWindow = true;
  rowData: any;
  totalCount: any;
  initial = 1;
  end = 100;
  headers = [];
  isPlesWait = false;
  rawdata = [];
  columnDefs = [];
  beginDate = null;
  endDate = null;
  notes = null;
  transferStaffID = null;
  current_Date = moment(Date.now()).format('MM-DD-YYYY');
  enteredBy: string;
  changedBy: string;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  defaultColDef: any;

  constructor(public _team: TeamFormService, public _caseTeam: CaseTeamService, public _pageSize: PagesizeService, public _openCards: OpencardsService) { }
  @Input() get_StaffID: any;
  @Output() closeModel = new EventEmitter<string>();
  ngOnInit() {
    this.getAllListView(this.initial, this.end);
    this.UserInfoValidation();
  }
  close() {
    var closeEV = "false";
    this.closeModel.emit(closeEV);
  };
  getAllListView(initial, end) {
    this.isPlesWait = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      "staffID": this.get_StaffID,
      "beginPagination": initial,
      "endPagination": end,
    };
    this._openCards
      .getStaffNotificationTranferList(me_Req)
      .then(data => {
        data['notificationTransferList'].map(itm => {
          delete itm.enteredBy;
          delete itm.enteredDate;
          delete itm.changedBy;
          delete itm.changedDate;
        })
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
    this.rowData = data.notificationTransferList;
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
  isPopWindow = false;
  isUpdate_dis = false;
  isUpdate = false;
  isEdit = false;
  showSaveModel() {
    this.isPopWindow = true;
    this.isUpdate_dis = false;
    this.isUpdate = false;
    this.isEdit = false;
    this.beginDate = "";
    this.endDate = "";
    this.notes = "";
    this.transferStaffID = {};
  };

  metaData = [];
  async filterStaff(event: any) {
    let req = {
      "Object": "staff",
      "value": event.query
    }
    let response = await this._openCards.getStaffLists(req);
    response.dropDown.map((item: any) => {
      item['StaffName'] = `${item.lastName} ${item.firstName}
      ( ${!isNullOrUndefined(item.email) ? item.email : 'Not provided!'})`;
    })
    this.metaData = response.dropDown;
  };

  formAction() {
    this.end = 100;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    if (this.beginDate === null || this.beginDate === "" || this.beginDate === undefined) {
      swal('Warning', 'Please select the Mandatory fields', 'warning');
    } else {
      !isNullOrUndefined(this.transferStaffID) ? this.transferStaffID = this.transferStaffID.staffID : null;
      if (this.isUpdate) {
        var req = {
          "notificationTransferID": this.notificationTransferID,
          "beginDate": this.beginDate,
          "endDate": this.endDate,
          "notes": this.notes,
          "transferStaffID": this.transferStaffID,
          "staffID": this.get_StaffID
        };

        this._caseTeam.StaffUpdateNOtificationTranfer(req).then((data: any) => {
          loader.style.display = 'none';
          this.isPopWindow = false;
          swal('Save', 'Successfully Saved!', 'success');
          this.getAllListView(this.initial, this.end);
        }).catch(error => {
          loader.style.display = 'none';
        });
      } else {
        var save_req = {
          "beginDate": this.beginDate,
          "endDate": this.endDate,
          "notes": this.notes,
          "transferStaffID": this.transferStaffID,
          "staffID": this.get_StaffID
        };
        this._caseTeam.saveStaffNotificationTransfer(save_req).then((data: any) => {
          loader.style.display = 'none';
          this.isPopWindow = false;
          swal('Save', 'Successfully Saved!', 'success');
          this.getAllListView(this.initial, this.end);
        }).catch(error => {
          loader.style.display = 'none';
        });
      };
    }
  };

  UserInfoValidation() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._team.getUserById({ staffID: parseInt(localStorage.getItem('UserId')) || 4620 })
      .then((data) => {
        if (this.isUpdate) {
          this.enteredBy = "";
          this.changedBy = `${data.users.firstName} ${data.users.lastName}` || null;
        } else {
          this.enteredBy = `${data.users.firstName} ${data.users.lastName}` || null;
          this.changedBy = "";
        }
        loader.style.display = 'none';
      });
  }
  staffPositionID: any;
  module: any;
  notificationTransferID: any;
  onRowSelected(event) {
    this.isPopWindow = false;
    console.log(event);
    this.isUpdate = true;
    this.isUpdate_dis = true;
    this.isEdit = true;
    this.notificationTransferID = event.data.notificationTransferID;
    this.isFormLog = true;
    this.formLogInfo.changedBy = !isNullOrUndefined(event.data.notificationTransferID.changedBy) ? event.data.notificationTransferID.changedBy : '------';
    this.formLogInfo.changedDate = !isNullOrUndefined(event.data.notificationTransferID.changedDate) ? moment(event.data.notificationTransferID.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
    this.formLogInfo.enteredBy = !isNullOrUndefined(event.data.notificationTransferID.enteredBy) ? event.data.notificationTransferID.enteredBy : '------';
    this.formLogInfo.enteredDate = !isNullOrUndefined(event.data.notificationTransferID.enteredDate) ? moment(event.data.notificationTransferID.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    this.treatGetByIds();
  };
  treatGetByIds() {
    this.isPlesWait = true;
    this.beginDate = "";
    this.endDate = "";
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      "notificationTransferID": this.notificationTransferID,
    };
    this._openCards
      .getNotificationTransStafftById(me_Req)
      .then(data_res => {
        this.isPopWindow = true;
        this.isPlesWait = false;
        loader.style.display = "none";
        this.beginDate = !isNullOrUndefined(data_res['notificationTransferDetails'].beginDate) ? this.beginDate = new Date(data_res['notificationTransferDetails'].beginDate) : null;
        this.endDate = !isNullOrUndefined(data_res['notificationTransferDetails'].endDate) ? this.endDate = new Date(data_res['notificationTransferDetails'].endDate) : null;
        this.notes = data_res['notificationTransferDetails'].notes;
        !isNullOrUndefined(data_res['notificationTransferDetails'].transferStaffID) ? this.transferStaffID = {
          staffID: data_res['notificationTransferDetails'].transferStaffID.StaffID,
          StaffName: `${data_res['notificationTransferDetails'].transferStaffID.lastName} ${data_res['notificationTransferDetails'].staffID.firstName}
     ( ${!isNullOrUndefined(data_res['notificationTransferDetails'].transferStaffID.email) ? data_res['notificationTransferDetails'].staffID.email : 'Not provided!'})`
        } : null;

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
  };

  isDeleteConfirmation = false;
  deleteConfirmationBtnLabel = 'Confirm';
  isDeleteConfirmationDisable = false;
  infoText: string;
  async onDelete() {
    this.deleteConfirmationBtnLabel = 'Deleting...';
    this.isDeleteConfirmationDisable = true;
    let req = {};
    req['notificationTransferID'] = this.notificationTransferID,
      await this.deleteRecord(req);
    this.deleteConfirmationBtnLabel = 'Confirm';
    this.isDeleteConfirmationDisable = false;
    this.infoText = 'The record has been deleted successfully!';
    swal('Save', 'The record has been deleted successfully!', 'success');
    this.getAllListView(this.initial, this.end);
  }

  deleteRecord(deleteReq: any) {
    this.infoText = '';
    return new Promise((resolve) => {
      this._openCards.staffTransferDelete(deleteReq).then((data: any) => {
        this.isPopWindow = false;
        this.isDeleteConfirmation = false;
        resolve(data);
      })
    })
  };
  exportAll() {
    var Req = {
      "staffID": this.get_StaffID,
      "fileName": "Notification Transfer " + this.current_Date
    };
    this._openCards.exportNotificationTranfer(Req).then((data) => {
      if (data.filePath) {
        window.location.href = data.filePath;
      };
    }).catch(err => {

    })
  }
}
