import { Component, OnInit, EventEmitter, ViewChild, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalValues} from '../../local-values';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ComplianceTech } from './compliance-tech';
import swal from 'sweetalert2';
import { CaseTeamService } from '../../case-team/case-team.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { PagesizeService } from '../../pagesize/pagesize.service';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';


@Component({
  selector: 'app-compliance-tech',
  templateUrl: './compliance-tech.component.html',
  styleUrls: ['./compliance-tech.component.scss']
})
export class ComplianceTechComponent implements OnInit {
  breadcrumbs = [];
  complianceTechForm: FormGroup;
  complianceTech: ComplianceTech = new ComplianceTech();
  editControll = false;
  isAttachmentRequired = false;
  req = {};
  metaData = [];
  discardTo = '/compliance-tech/view';
  staffComplianceTechID = null;

  isDeleteConfirmation = false;
  isDeleteEnabled = false;
  complianceLabel = 'Staff';
  getByIdData: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;


  iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';
  techCards = [
    { title: 'Compliance Tech Team Members', tip: 'Compliance Tech', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
    { title: 'Assigned Compliance Tech', tip: 'Assigned Compliance Tech', navigation: '/reports/staff/caseList', icon: this.iconurl + 'assessment icon.svg' },
  ];
  isDashboardWindow = true;
  isPopListWindow = false;
  // isPopListWindow = true;
  isPopWindow = false;
  isPlesWait = false;
  rowData: any;
  totalCount: any;
  initial = 1;
  end = 100;
  headers = [];
  rawdata = [];
  columnDefs = [];
  @ViewChild('agGrid', { static: true }) agGrid: AgGridNg2;

  @Output() closeModel = new EventEmitter<string>();
  @Output() jumpToTree = new EventEmitter();
  @Input() teamType: any;
  getByIdkey: any;
  popupHeader = 'Compliance Tech';
  defaultColDef: any;

  constructor(public _pageSize: PagesizeService, public _caseTeam: CaseTeamService, public _local: LocalValues, public _router: Router, public _opencard: OpencardsService, public _client: ClildFormService, public _fb: FormBuilder) { }


  ngOnInit() {
    if (this.teamType == 'Compliance Tech') {
      this.complianceLabel = 'Staff';
      this.popupHeader = 'Compliance Tech Team Members';
    }
    else if (this.teamType == 'Assigned Compliance Tech') {
      this.complianceLabel = 'Compliance Tech';
      this.popupHeader = 'Assigned Compliance Tech';
    }

    this.getAllListView(this.initial, this.end);
    this.editControll = false;
    this.formValidation();



    if (this._router.url.includes('compliance-tech/detail')) {
      this.isDeleteEnabled = true;
      this.editControll = true;
      this.complianceTechForm.disable();
      this.getById();
    }
    if (this._router.url.includes('assigned-compliance-tech')) {
      this.discardTo = '/assigned-compliance-tech/view';
      this.breadcrumbs.push(
        { label: 'Person Types', href: "/reports/person/types", active: '' },
        { label: 'List', href: "/reports/staff", active: '' },
        { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
        { label: 'Assigned Compliance Tech List', active: '', href: '/assigned-compliance-tech/view' },
        { label: 'Assigned Compliance Tech', active: '', href: 'active' },
      )
      this.complianceLabel = 'Compliance Tech';
    }
    else {
      this.breadcrumbs.push(
        { label: 'Person Types', href: "/reports/person/types", active: '' },
        { label: 'List', href: "/reports/staff", active: '' },
        { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
        { label: 'Compliance Tech List', active: '', href: '/compliance-tech/view' },
        { label: 'Compliance Tech', active: '', href: 'active' },
      )
    }


  }

  saveForm(source: any) {
    console.log('source is', source);
    if (this.complianceTechForm.valid) {
      let loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      let saveRequest = {
        beginDate: source.beginDate ? this._local.stringFormatDatetime(Date.parse(source.beginDate)) : null,
        endDate: source.endDate ? this._local.stringFormatDatetime(Date.parse(source.endDate)) : null,
        complianceTechID: parseInt(localStorage.getItem('staffIdPerson')),
        staffID: (source.staffComplianceTechID) ? source.staffComplianceTechID.staffID : null,
      }
      let updateRequest = {
        beginDate: source.beginDate ? this._local.stringFormatDatetime(Date.parse(source.beginDate)) : null,
        endDate: source.endDate ? this._local.stringFormatDatetime(Date.parse(source.endDate)) : null,
        complianceTechID: parseInt(localStorage.getItem('staffIdPerson')),
        staffComplianceTechID: this.staffComplianceTechID,
        staffID: (source.staffComplianceTechID) ? source.staffComplianceTechID.staffID : null,
      }
      let saveAssignedRequest = {
        beginDate: source.beginDate ? this._local.stringFormatDatetime(Date.parse(source.beginDate)) : null,
        endDate: source.endDate ? this._local.stringFormatDatetime(Date.parse(source.endDate)) : null,
        staffID: parseInt(localStorage.getItem('staffIdPerson')),
        complianceTechID: (source.staffComplianceTechID) ? source.staffComplianceTechID.staffID : null,
      }
      let updateAssignedRequest = {
        beginDate: source.beginDate ? this._local.stringFormatDatetime(Date.parse(source.beginDate)) : null,
        endDate: source.endDate ? this._local.stringFormatDatetime(Date.parse(source.endDate)) : null,
        staffID: parseInt(localStorage.getItem('staffIdPerson')),
        staffComplianceTechID: this.staffComplianceTechID,
        complianceTechID: (source.staffComplianceTechID) ? source.staffComplianceTechID.staffID : null,
      }

      console.log('source is', source);
      console.log('saveRequest is', saveRequest);

      if (this.teamType == 'Assigned Compliance Tech') {
        if (source.complianceTechID) {
          this._opencard.updateAssignedComplianceTech(updateAssignedRequest).then(data => {
            loader.style.display = 'none';
            if (data.responseStatus) {
              this.isPopWindow = false;
              swal('Success', 'Record has been updated!', 'success');
              this.getAllListView(this.initial, this.end);
              this.initializeComponent();
            }
            else {
              swal('Info', `${data.responseMessage}`, 'success');
            }
          });
        }
        else {
          this._opencard.saveAssignedComplianceTech(saveAssignedRequest).then(data => {
            loader.style.display = 'none';
            if (data.responseStatus) {
              this.isPopWindow = false;
              swal('Success', 'Record has been saved!', 'success');
              this.getAllListView(this.initial, this.end);
              this.initializeComponent();
            } else {
              swal('Info', `${data.responseMessage}`, 'success');
            }
          });
        }
      }

      if (this.teamType == 'Compliance Tech') {
        if (source.complianceTechID) {
          this._opencard.updateComplianceTech(updateRequest).then(data => {
            loader.style.display = 'none';
            if (data.responseStatus) {
              this.isPopWindow = false;
              swal('Success', 'Record has been updated!', 'success');
              this.getAllListView(this.initial, this.end);
              this.initializeComponent();

            } else {
              swal('Info', `${data.responseMessage}`, 'success');
            }
          });
        }
        else {
          this._opencard.saveComplianceTech(saveRequest).then(data => {
            loader.style.display = 'none';
            if (data.responseStatus) {
              this.isPopWindow = false;
              swal('Success', 'Record has been saved!', 'success');
              this.getAllListView(this.initial, this.end);
              this.initializeComponent();
            } else {

            }
          });
        }
      }
    }
    else {
      swal('Warning', 'Please fill the mandatoy fields', 'info');
    }







  }

  getMetaData(event: any, label: any) {
    let metaDataObj: any, metaDataReq: any;
    switch (label) {
      case 'staff':
        metaDataObj = "staff";
        break;

    }
    if (metaDataObj) {
      metaDataReq = { Object: metaDataObj, value: event.query }
      this._caseTeam.getSearchList(metaDataReq).then(data => {
        data.dropDown.map((item: any) => {
          item['clientFullName'] = item.clientID + ' ' + item.clientName;
          item['staffFullName'] = item.lastName + ' ' + item.firstName + ' ( ' + item.email + ' ) ';
          item['fullName'] = item.lastName + ' ' + item.firstName;
        })
        this.metaData = data.dropDown;
      })
    }
  }

  formValidation() {
    this.complianceTechForm = this._fb.group({
      "staffComplianceTechID": [null, Validators.compose([Validators.required])],
      "beginDate": [null, Validators.compose([Validators.required])],
      "endDate": [null],
      "staffID": [null],
      "complianceTechID": [null],

    })
  }

  getById() {

    let staffComplianceTechID = this.getByIdkey;
    let source;
    this.req = { staffComplianceTechID: staffComplianceTechID }
    this.editControll = true;
    
    let loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';

    this._opencard.getByIdStaffComplianceTech(this.req).then(data => {
      this.isPopWindow = true;


      this._local.deleteRequestKey = data.staffComplianceTech.staffComplianceTechID;
      this._local.deleteRequestNode = this.teamType;
      this.getByIdData = data.staffComplianceTech;
      source = data.staffComplianceTech;
      this.staffComplianceTechID = source.staffComplianceTechID;
      source.beginDate = (source.beginDate) ? new Date(source.beginDate) : null;
      source.endDate = (source.endDate) ? new Date(source.endDate) : null;
      let staffFullName: any;

      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.staffComplianceTech.changedBy) ? data.staffComplianceTech.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.staffComplianceTech.changedDate) ? moment(data.staffComplianceTech.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.staffComplianceTech.enteredBy) ? data.staffComplianceTech.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.staffComplianceTech.enteredDate) ? moment(data.staffComplianceTech.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


      if (this.teamType == 'Assigned Compliance Tech') {
        if (source.complianceTechID) {
          let complianceTechID = source.complianceTechID;
          staffFullName = complianceTechID.lastName + ' ' + complianceTechID.firstName + ' ( ' + complianceTechID.email + ' ) ';
          source.staffComplianceTechID = {
            staffID: complianceTechID.staffID,
            staffFullName: staffFullName
          };

        }
      }

      else if (this.teamType == 'Compliance Tech') {
        if (source.staffID) {
          let staffID = source.staffID;
          staffFullName = staffID.lastName + ' ' + staffID.firstName + ' ( ' + staffID.email + ' ) ';
          source.staffComplianceTechID = {
            staffID: staffID.staffID,
            staffFullName: staffFullName
          };

        }
      }


      loader.style.display = 'none';
      this.complianceTech = source;
    })
  }



  navigateTo() {

    if (this.complianceLabel == 'Staff' && this.getByIdData.staffID) {
      localStorage.setItem("staff_ID", this.getByIdData.staffID.staffID);
    }

    if (this.complianceLabel == 'Compliance Tech' && this.getByIdData.complianceTechID) {
      localStorage.setItem("staff_ID", this.getByIdData.complianceTechID.staffID);
    }

    this.isPopWindow = false;
    this.isPopListWindow = false;
    this.jumpToTree.emit();

  }

  onDeleteSelect() {
    this.isDeleteConfirmation = true;
  }

  onDeleteRecord() {

    let req = { staffComplianceTechID: this.staffComplianceTechID }
    this._opencard.deleteStaffComplianceTech(req).then(data => {
      if (this._router.url.includes('/assigned-compliance-tech')) {
        this._router.navigate(['/assigned-compliance-tech/view'])
      }
      else if (this._router.url.includes('/compliance-tech')) {
        this._router.navigate(['/compliance-tech/view'])
      }

    })
  }

  editForm() {
    this.complianceTechForm.enable();
  }

  ngOnDestroy() {
    this._local.deleteRequestKey = null;
    this._local.deleteRequestNode = null;
  }

  close() {
    var closeEV = "false";
    this.closeModel.emit(closeEV)
    console.log("closed>>>>");
  }

  showSaveModel() {
    this.isPopWindow = true;
    this.editControll = false;
    this.complianceTechForm.enable();
    this.complianceTech = new ComplianceTech();

  };


  pagesizeNav(event) {
    let begin, end;
    if (event.keyCode == 13) {
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = end;

    }
  };
  pagesize(event) {
    if (event.target.localName == "img") {
      let begin, end;
      begin = this._pageSize.getPagesizeValues()[0];
      end = this._pageSize.getPagesizeValues()[1];
      this.initial = begin;
      this.end = 100;
      return this.getAllListView(this.initial, this.end);
    }
  }

  getAllListView(initial, end) {
    this.isPlesWait = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let me_Req = {
      "staffID": parseInt(localStorage.getItem('staffIdPerson')),
      "beginPagination": initial,
      "endPagination": 100,
    };
    if (this.teamType == 'Compliance Tech') {
      this._opencard
        .listOfStaffComplianceTech(me_Req)
        .then(data => {
          this.isPlesWait = false;
          this.generateListView(data);
          loader.style.display = "none";
        });
    }
    else if (this.teamType == 'Assigned Compliance Tech') {
      this._opencard
        .listOfStaffAssignedComplianceTech(me_Req)
        .then(data => {
          this.isPlesWait = false;
          this.generateListView(data);
          loader.style.display = "none";
        });
    }

  };

  generateListView(data) {
    console.log("data in generateListView is", data);
    let rowData = [];
    let test = [];
    this.totalCount = data.totalCount;
    if (this.teamType == 'Compliance Tech') {
      this.rowData = data.staffComplianceTechTeamMembers;
    }
    else if (this.teamType == 'Assigned Compliance Tech') {
      this.rowData = data.staffComplianceTech;
    }
    console.log("This row data", this.rowData);
    if (this.rowData && this.rowData.length > 0) {
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

  onRowSelected(event) {
    this.isPopWindow = false;

    this.editControll = true;

    this.getByIdkey = event.data.staffComplianceTechID;


    this.complianceTechForm.disable();

    this.getById();
  };

  discardForm() {
    this.isPopWindow = false;

  }

  afterDelete() {
    this.isPopWindow = false;
    this.getAllListView(this.initial, this.end);
    this.initializeComponent();
  }

  initializeComponent() {
    this._local.deleteRequestKey = null;
    this._local.deleteRequestNode = null;
    this.ngOnInit();
  }

  openPopUp(label: any) {

    switch (label.title) {
      case 'Compliance Tech Team Members':
        this.teamType = 'Compliance Tech';
        this.complianceLabel = 'Staff';
        this.popupHeader = 'Compliance Tech Team Members';
        this.isPopListWindow = true;
        break;

      case 'Assigned Compliance Tech':
        this.teamType = 'Assigned Compliance Tech';
        this.complianceLabel = 'Compliance Tech';
        this.popupHeader = 'Assigned Compliance Tech';
        this.isPopListWindow = true;
        break;

    }
    this.getAllListView(this.initial, this.end);
    this.editControll = false;
    // this.isDashboardWindow = false;
  }

  closeDashboard() {
    this.isDashboardWindow = false;
    this.ngOnInit();
    var closeEV = "false";
    this.closeModel.emit(closeEV)
    console.log("closed>>>>");
  }

  resetForm() {
    // resetForm
  }

}
