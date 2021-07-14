import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { StaffPositionForm } from './staff-position';
import { CaseTeamService } from '../case-team/case-team.service';
import swal from 'sweetalert2';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { PagesizeService } from '../pagesize/pagesize.service';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';


@Component({
  selector: 'app-staff-position',
  templateUrl: './staff-position.component.html',
  styleUrls: ['./staff-position.component.scss']
})
export class StaffPositionComponent implements OnInit {
  @Input() get_StaffID: any;
  staffPositionForm: StaffPositionForm = new StaffPositionForm();
  rowData: any;
  totalCount: any;
  initial = 1;
  end = 100;
  headers = [];
  isPlesWait = false;
  rawdata = [];
  columnDefs = [];
  @ViewChild('agGrid', { static: true }) agGrid: AgGridNg2;
  constructor(public _caseTeam: CaseTeamService, public _pageSize: PagesizeService, public _openCards: OpencardsService) { }
  @Output() closeModel = new EventEmitter<string>();
  isPopWindow = false;
  isPopListWindow = true;
  clientName: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  cities2 = [];
  defaultColDef: any;

  ngOnInit() {
    this.getAllListView(this.initial, this.end);
    this.getAllPositionTypes();
    this.clientName = localStorage.getItem("clientName");
    this.staffPositionForm.personTypeID = null;
  }
  formAction() {
    this.end = 100;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    console.log("this.staffPositionForm>>>>>>", this.staffPositionForm);

    console.log("this.staffPositionForm.personTypeID>>>>>>", this.staffPositionForm.personTypeID);
    if (this.staffPositionForm.beginDate === null || this.staffPositionForm.beginDate === "" || this.staffPositionForm.beginDate === undefined) {
      swal('Warning', 'Please select the Mandatory fields', 'warning');
    } else if (this.isEmpty(this.staffPositionForm.personTypeID)) {
      swal('Warning', 'Please select the Mandatory fields', 'warning');
    } else {
      this.staffPositionForm.staffID = this.get_StaffID;
      console.log('this.staffPositionForm>>>', this.staffPositionForm);
      !isNullOrUndefined(this.staffPositionForm.personTypeID) ? this.staffPositionForm.personTypeID = this.staffPositionForm.personTypeID.personTypeID : null;
      if (this.isUpdate) {
        this.staffPositionForm['staffPositionID'] = this.staffPositionID;
        this._caseTeam.updateStaffPosition(this.staffPositionForm).then((data: any) => {
          loader.style.display = 'none';
          if (data.responseStatus) {
            swal('Save', 'Successfully updated!', 'success');
            this.getAllListView(this.initial, this.end);
            this.isPopWindow = false;
          } else {
            return swal('Info', `${data.responseMessage}`, 'info');
          }
        }).catch(error => {
          loader.style.display = 'none';
        });
      } else {
        delete this.staffPositionForm['staffPositionID'];
        console.log('this.staffPositionForm>>>', this.staffPositionForm);
        this._caseTeam.saveStaffPosition(this.staffPositionForm).then((data: any) => {
          loader.style.display = 'none';
          if (data.responseStatus) {
            swal('Save', 'Successfully Saved!', 'success');
            this.getAllListView(this.initial, this.end);
            this.isPopWindow = false;
          } else {
            return swal('Info', `${data.responseMessage}`, 'info');
          }
        }).catch(error => {
          loader.style.display = 'none';
        });
      }
    }
  };

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  close() {
    var closeEV = "false";
    this.closeModel.emit(closeEV)
    console.log("closed>>>>");
  }

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
      .getStaffPositionList(me_Req)
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
    this.rowData = data.staffPositions;
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
    this.staffPositionForm.isMailSupervisor = false;
    this.staffPositionForm.psa = false;
    this.staffPositionForm.ps = false;
    this.staffPositionForm.ps_OK = false;
    this.staffPositionForm.ps_NE = false;
    this.staffPositionForm.noticeOfChildsLocation = false;
    this.staffPositionForm.rc = false;
    this.staffPositionForm.isLoopEmail = false;
    this.staffPositionForm.pr = false;
    this.staffPositionForm.ackFi = false;
    this.staffPositionForm.ackFc = false;
    this.staffPositionForm.beginDate = "";
    this.staffPositionForm.endDate = "";
    this.staffPositionForm.notes = "";
    this.staffPositionForm.personTypeID = {};
  };
  isUpdate_dis = false;
  isUpdate = false;
  staffPositionID: any;
  isEdit = false;
  module: any;
  onRowSelected(event) {
    this.isPopWindow = false;
    console.log(event);
    // this.staffPositionForm = event.data;
    this.isUpdate = true;
    this.isUpdate_dis = true;
    this.isEdit = true;
    this.staffPositionID = event.data.staffPositionID;
    this.isFormLog = true;
    this.formLogInfo.changedBy = !isNullOrUndefined(event.data.staffPositionID.changedBy) ? event.data.staffPositionID.changedBy : '------';
    this.formLogInfo.changedDate = !isNullOrUndefined(event.data.staffPositionID.changedDate) ? moment(event.data.staffPositionID.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
    this.formLogInfo.enteredBy = !isNullOrUndefined(event.data.staffPositionID.enteredBy) ? event.data.staffPositionID.enteredBy : '------';
    this.formLogInfo.enteredDate = !isNullOrUndefined(event.data.staffPositionID.enteredDate) ? moment(event.data.staffPositionID.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    this.module = {
      staffPositionID: this.staffPositionID
    };
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    this.treatGetByIds();
  };
  treatGetByIds() {
    this.isPlesWait = true;
    this.staffPositionForm.personTypeID = {};
    this.staffPositionForm.beginDate = "";
    this.staffPositionForm.endDate = "";
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      "staffPositionID": this.staffPositionID,
    };
    this._openCards
      .getPositionStafftById(me_Req)
      .then(data_res => {
        this.staffPositionForm = data_res['staffPosition'];
        this.staffPositionForm.ps_OK = data_res['staffPosition'].psOk;
        this.staffPositionForm.ps_NE = data_res['staffPosition'].psNe;
        this.isPopWindow = true;
        this.isPlesWait = false;
        loader.style.display = "none";
        this.staffPositionForm.beginDate = new Date(data_res['staffPosition'].beginDate);
        if (data_res['staffPosition'].endDate === null) {
          this.staffPositionForm.endDate = null;
        } else {
          this.staffPositionForm.endDate = new Date(data_res['staffPosition'].endDate);
        }

        this.staffPositionForm.personTypeID = data_res['staffPosition'].personTypeID;
        this.staffPositionForm.notes = data_res['staffPosition'].notes;
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
      req['staffPositionID'] = this.staffPositionID;
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
      this._openCards.savePositionDelete(deleteReq).then((data: any) => {
        this.isPopWindow = false;
        this.isDeleteConfirmation = false;
        resolve(data);
      })
    })
  };
  allPositionTypes = [];
  getAllPositionTypes() {
    this._openCards
      .getStaffPositionTypes().then(data => {
        this.allPositionTypes = data;
        console.log("<<<this.allPositionTypes>>>>>", this.allPositionTypes);
      });
  };
  results = [];
  getSelectPositionType(ev) {
    console.log("this.allPositionTypes>>>>>", this.allPositionTypes);
    let filtered: any[] = [];
    for (let i = 0; i < this.allPositionTypes.length; i++) {
      let country = this.allPositionTypes[i];
      if (country.personType.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.results = filtered;
  };
  // getGender(ev) {
  //   let filtered: any[] = [];
  //   for (let i = 0; i < this.genderData.length; i++) {
  //     let country = this.genderData[i];
  //     if (country.itemName.toLowerCase().indexOf(ev.query.toLowerCase()) == 0) {
  //       filtered.push(country);
  //     }
  //   }
  //   this.results = filtered;
  // }
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
