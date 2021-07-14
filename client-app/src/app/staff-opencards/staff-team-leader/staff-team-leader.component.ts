import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalValues} from '../../local-values';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { TeamLeader } from './team-leader';
import swal from 'sweetalert2';
import { CaseTeamService } from '../../case-team/case-team.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { PagesizeService } from '../../pagesize/pagesize.service';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';


@Component({
  selector: 'app-staff-team-leader',
  templateUrl: './staff-team-leader.component.html',
  styleUrls: ['./staff-team-leader.component.scss']
})
export class StaffTeamLeaderComponent implements OnInit {
  breadcrumbs = [];
  teamLeaderForm: FormGroup;
  teamLeader: TeamLeader = new TeamLeader();
  editControll = false;
  isAttachmentRequired = false;
  req = {};
  metaData = [];
  discardTo = '/team-leader/view';
  isOpencards = false;
  teamLabel = 'Team Leader';

  isDeleteConfirmation = false;
  isDeleteEnabled = false;
  staffTeamLeaderID = null;
  getByIdData: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;


  isPopListWindow = true;
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
  isSubTeamMember = false;

  defaultColDef: any;


  constructor(public _pageSize: PagesizeService, public _caseTeam: CaseTeamService, public _local: LocalValues, public _router: Router, public _opencard: OpencardsService, public _client: ClildFormService, public _fb: FormBuilder) { }


  ngOnInit() {
    this.getAllListView(this.initial, this.end);
    this.formValidation();
    this.editControll = false;
    if (this.teamType == 'Team Leader') {
      this.teamLabel = 'Team Leader';
    }
    else if (this.teamType == 'Team Member') {
      this.teamLabel = 'Staff';
    }
    if (this._router.url.includes('team-member')) {
      this.discardTo = '/team-member/view';
      this.teamLabel = 'Staff';
      this.breadcrumbs.push(
        { label: 'Person Types', href: "/reports/person/types", active: '' },
        { label: 'List', href: "/reports/staff", active: '' },
        { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
        { label: 'Team Member List', active: '', href: '/team-member/view' },
        { label: 'Team Member', active: '', href: 'active' },
      )
    }
    if (this._router.url.includes('team-leader')) {
      this.discardTo = '/team-leader/view';
      this.teamLabel = 'Team Leader';
      this.breadcrumbs.push(
        { label: 'Person Types', href: "/reports/person/types", active: '' },
        { label: 'List', href: "/reports/staff", active: '' },
        { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
        { label: 'Team Leader List', active: '', href: '/team-leader/view' },
        { label: 'Team Leader', active: '', href: 'active' },
      )
    }
    if (this._router.url.includes('team-leader/detail')) {
      this.editControll = true;
      this.isDeleteEnabled = true;
      this.teamLeaderForm.disable();
      this.getById();
    }
    if (this._router.url.includes('team-member/detail')) {
      this.isDeleteEnabled = true;
      this.editControll = true;
      this.isOpencards = true;
      this.teamLeaderForm.disable();
      this.getById();
    }


  }

  formValidation() {
    this.teamLeaderForm = this._fb.group({
      "staffID": [null,],
      "teamLeaderID": [null, Validators.compose([Validators.required])],
      "beginDate": [null, Validators.compose([Validators.required])],
      "endDate": [null]

    })
  }

  saveForm(source: any) {
    console.log('source is', source);
    if (this.teamLeaderForm.valid) {
      let loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      let saveRequest = {
        staffID: parseInt(localStorage.getItem('staffIdPerson')),
        teamLeaderID: (source.teamLeaderID) ? source.teamLeaderID.staffID : null,
        beginDate: source.beginDate ? this._local.stringFormatDatetime(Date.parse(source.beginDate)) : null,
        endDate: source.endDate ? this._local.stringFormatDatetime(Date.parse(source.endDate)) : null,
      }
      let updateRequest = {
        staffTeamLeaderID: source.staffTeamLeaderID,
        staffID: parseInt(localStorage.getItem('staffIdPerson')),
        teamLeaderID: (source.teamLeaderID) ? source.teamLeaderID.staffID : null,
        beginDate: source.beginDate ? this._local.stringFormatDatetime(Date.parse(source.beginDate)) : null,
        endDate: source.endDate ? this._local.stringFormatDatetime(Date.parse(source.endDate)) : null,
      }


      if (this.teamType == 'Team Member') {
        if (this.isSubTeamMember) {
          console.log('isSubTeamMember called SAVE---')
          saveRequest = {
            teamLeaderID: parseInt(localStorage.getItem('staffIdSubTeamMember')),
            staffID: (source.teamLeaderID) ? source.teamLeaderID.staffID : null,
            beginDate: source.beginDate ? this._local.stringFormatDatetime(Date.parse(source.beginDate)) : null,
            endDate: source.endDate ? this._local.stringFormatDatetime(Date.parse(source.endDate)) : null,
          }
          updateRequest = {
            staffTeamLeaderID: source.staffTeamLeaderID,
            teamLeaderID: parseInt(localStorage.getItem('staffIdSubTeamMember')),
            staffID: (source.teamLeaderID) ? source.teamLeaderID.staffID : null,
            beginDate: source.beginDate ? this._local.stringFormatDatetime(Date.parse(source.beginDate)) : null,
            endDate: source.endDate ? this._local.stringFormatDatetime(Date.parse(source.endDate)) : null,
          }
        }
        else {
          saveRequest = {
            teamLeaderID: parseInt(localStorage.getItem('staffIdPerson')),
            staffID: (source.teamLeaderID) ? source.teamLeaderID.staffID : null,
            beginDate: source.beginDate ? this._local.stringFormatDatetime(Date.parse(source.beginDate)) : null,
            endDate: source.endDate ? this._local.stringFormatDatetime(Date.parse(source.endDate)) : null,
          }
          updateRequest = {
            staffTeamLeaderID: source.staffTeamLeaderID,
            teamLeaderID: parseInt(localStorage.getItem('staffIdPerson')),
            staffID: (source.teamLeaderID) ? source.teamLeaderID.staffID : null,
            beginDate: source.beginDate ? this._local.stringFormatDatetime(Date.parse(source.beginDate)) : null,
            endDate: source.endDate ? this._local.stringFormatDatetime(Date.parse(source.endDate)) : null,
          }
        }

      }

      console.log('source is', source);
      console.log('saveRequest is', saveRequest);

      if (source.staffTeamLeaderID) {

        this._opencard.updateTeamLeader(updateRequest).then(data => {
          this.isPopWindow = false;
          loader.style.display = 'none';
          swal('Success', 'Record has been updated!', 'success');


          this.getAllListView(this.initial, this.end);
          this.initializeComponent();


          if (this._router.url.includes('team-member')) {
            this._router.navigate(['/team-member/view']);
          }
          if (this._router.url.includes('team-leader')) {
            this._router.navigate(['/team-leader/view']);
          }
        });
      }
      else {
        this._opencard.saveTeamLeader(saveRequest).then(data => {
          this.isPopWindow = false;
          loader.style.display = 'none';
          swal('Success', 'Record has been saved!', 'success');

          this.getAllListView(this.initial, this.end);
          this.initializeComponent();

          if (this._router.url.includes('team-member')) {
            this._router.navigate(['/team-member/view']);
          }
          if (this._router.url.includes('team-leader')) {
            this._router.navigate(['/team-leader/view']);
          }
        });
      }
    }
    else {
      swal('Warning', 'Please fill the mandatoy fields', 'info');
    }





  }
  initializeComponent() {
    this._local.deleteRequestKey = null;
    this._local.deleteRequestNode = null;
    this.ngOnInit();
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

  getById() {

    let staffTeamLeaderID = this.getByIdkey
    let source;
    this.req = { staffTeamLeaderID: staffTeamLeaderID }
    this.editControll = true;
    let loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.getByIdStaffTeamLeader(this.req).then(data => {
      this.isPopWindow = true;
      this._local.deleteRequestKey = data.staffTeamLeader.staffTeamLeaderID;
      this._local.deleteRequestNode = this.teamType;
      this.getByIdData = data.staffTeamLeader;
      source = data.staffTeamLeader;
      if (source.staffID) {
        localStorage.setItem("staffIdSubTeamMember", source.staffID.staffID);
      }
      this.staffTeamLeaderID = source.staffTeamLeaderID;
      localStorage.setItem("staffTeamLeaderID", source.staffTeamLeaderID);
      source.beginDate = (source.beginDate) ? new Date(source.beginDate) : null;
      source.endDate = (source.endDate) ? new Date(source.endDate) : null;
      let staffFullName: any;
      if (source.teamLeaderID) {
        let teamLeader = source.teamLeaderID;
        staffFullName = teamLeader.lastName + ' ' + teamLeader.firstName + ' ( ' + teamLeader.email + ' ) ';
        source.teamLeaderID['staffFullName'] = staffFullName;
      }
      if (source.staffID && this.teamLabel == 'Staff') {
        let staffID = source.staffID;
        staffFullName = staffID.lastName + ' ' + staffID.firstName + ' ( ' + staffID.email + ' ) ';
        source.teamLeaderID['staffFullName'] = staffFullName;
        source.teamLeaderID['staffID'] = staffID.staffID;
      }
      loader.style.display = 'none';
      this.teamLeader = source;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.staffTeamLeader.changedBy) ? data.staffTeamLeader.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.staffTeamLeader.changedDate) ? moment(data.staffTeamLeader.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.staffTeamLeader.enteredBy) ? data.staffTeamLeader.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.staffTeamLeader.enteredDate) ? moment(data.staffTeamLeader.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  navigateToTeamMember() {
    this.isSubTeamMember = true;
    this.isPopWindow = false;
    this.getAllListView(this.initial, this.end);

  }

  navigateTo() {
    if (this.getByIdData.staffID) {
      localStorage.setItem("staff_ID", this.getByIdData.staffID.staffID);
    }
    if (this.teamLabel == 'Team Leader' && this.getByIdData.teamLeaderID) {
      localStorage.setItem("staff_ID", this.getByIdData.teamLeaderID.staffID);
    }
    this.isPopWindow = false;
    this.isPopListWindow = false;
    this.jumpToTree.emit();

  }

  onDeleteSelect() {
    this.isDeleteConfirmation = true;
  }

  onDeleteRecord() {

    let req = { staffTeamLeaderID: this.staffTeamLeaderID }
    this._opencard.deleteStaffTeamLeader(req).then(data => {
      if (this._router.url.includes('/team-leader/detail')) {
        this._router.navigate(['/team-leader/view'])
      }
      else if (this._router.url.includes('/team-member/detail')) {
        this._router.navigate(['/team-member/view'])
      }

    })
  }

  editForm() {
    this.teamLeaderForm.enable();
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
    this.teamLeader = new TeamLeader();
    this.teamLeaderForm.enable();
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
    if (this.isSubTeamMember) {
      console.log('isSubTeamMember called---')
      me_Req = {
        "staffID": parseInt(localStorage.getItem('staffIdSubTeamMember')),
        "beginPagination": initial,
        "endPagination": 100,
      };
    }
    if (this.teamType == 'Team Leader') {
      this._opencard
        .listOfStaffTeamLeader(me_Req)
        .then(data => {
          this.isPlesWait = false;
          this.generateListView(data);
          loader.style.display = "none";
        });
    }
    else if (this.teamType == 'Team Member') {
      this._opencard
        .listOfStaffTeamMember(me_Req)
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
    if (this.teamType == 'Team Leader') {
      this.rowData = data.staffTeamleaders;
    }
    else if (this.teamType == 'Team Member') {
      this.rowData = data.staffTeamMembers;
    }
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

  onRowSelected(event) {
    this.isPopWindow = false;

    this.editControll = true;
    this.getByIdkey = event.data.staffTeamLeaderID;

    this.editControll = true;
    this.teamLeaderForm.disable();
    if (this.teamType == 'Team Member') {
      this.isOpencards = true;
    }
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

  resetForm() {
    // resetForm
  }


}
