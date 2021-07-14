import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProgressReport } from './progress-report';
import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';
import { CaseTeamService } from '../../case-team/case-team.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';

@Component({
  selector: 'app-progress-reports-prtf',
  templateUrl: './progress-reports-prtf.component.html',
  styleUrls: ['./progress-reports-prtf.component.scss'],
  inputs: ['isPopUpWindow'],
})
export class ProgressReportsPrtfComponent implements OnInit {
  title: any = 'Progress Report';
  clientId: any;
  referralId: any;
  participantsTherpyForm: FormGroup;
  partcipantsFormData: ProgressReport = new ProgressReport();
  personAssignmentTypeID: any;
  editControll: boolean;
  isAttachmentRequired = false;
  breadcrumbs = [];
  deleteReq = {}

  isLoading = false;
  isListView = false;
  isFormView = false;

  tableRows: any;
  tableHeaders: any;
  healthExamID: any;

  @Output() closeModel = new EventEmitter();
  @Input() isPopUpWindow = false;

  constructor(public progressReport: FormBuilder, public _caseTeam: CaseTeamService, public _router: Router, public _opencards: OpencardsService) { }

  ngOnInit() {
    this.fetchListViewInfo();
    this.getClientDetails();
    this.getPersonAssignments();
    this.formValidation();
    this.editControll = false;
    if (this._router.url == '/reports/progress-report/detail') {
      this.getByParticipantsId();
      this.isAttachmentRequired = true;
    } else {
      delete this.partcipantsFormData.therapyParticipantID;
    };
    // this.breadcrumbs.push(
    //   { label: 'List', href: "/reports/client", active: '' },
    //   { label: 'Form', href: "/reports/client/details", active: '' },
    //   { label: 'Progress Report', href: "/reports/progress-report/view", active: '' },
    //   { label: 'Progress Report Form', active: 'active' }
    // );
  }

  formValidation() {
    this.participantsTherpyForm = this.progressReport.group({
      'personAssignmentTypeID': [null, Validators.compose([Validators.required])],
      'beginDate': [null, Validators.compose([Validators.required])],
      'endDate': [null],
      'personID': [null, Validators.compose([Validators.required])],
      'notes': [null],
      'referralID': [null],
    });
  }
  getClientDetails() {
    const encryptClientID = localStorage.getItem('therapyParticipantsID');
    const encryptReferralID = localStorage.getItem('referralId');
    const hasKey = this._opencards.getHasKey();
    this.clientId = parseInt(encryptClientID) - hasKey;
    this.referralId = parseInt(encryptReferralID) - hasKey;
    this.partcipantsFormData.referralID = this.referralId;
  };
  personTypes = [];
  getPersonAssignments() {
    this._opencards.getPersonAssignments().then((data: any) => {
      this.personTypes = data.personAssignmentType;
    })
  };
  personLists: any;
  getPeresonDetails(detail) {
    this.personAssignmentTypeID = detail.personAssignmentTypeID;

  };
  getPeresonAllDetails(event) {
    var familyList = [];
    var clientList = [];
    var obj;
    if (this.personAssignmentTypeID == 1) {
      obj = 'client';
      var req = { Object: obj, value: event.query }
      this._caseTeam.getSearchList(req).then((data) => {

        data.dropDown.forEach(element => {
          var data1 = {
            fullName: element.clientName,
            clientID: element.clientID
          }
          clientList.push(data1);
        });
        this.personLists = clientList;
      })
    } else if (this.personAssignmentTypeID == 4) {
      obj = 'familymember';
      var req = { Object: obj, value: event.query }
      this._caseTeam.getSearchList(req).then((data) => {
        data.dropDown.forEach(element => {
          var data = {
            fullName: element.name,
            familyMemberID: element.familyMemberID
          }
          familyList.push(data);
        });
        this.personLists = familyList;
      })
    }
  };
  getByParticipantsId() {
    // const loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
    this.isListView = false;
    this.isLoading = true;
    this.deleteReq = { TherapyParticipants: this.healthExamID }
    this._opencards.getByParticipants({ "therapyParticipantID": this.healthExamID }).then((data: any) => {
      this.isLoading = false;
      this.isFormView = true;
      // loader.style.display = 'none';
      data.therapyParticipant.beginDate = !isNullOrUndefined(data.therapyParticipant.beginDate) ? new Date(data.therapyParticipant.beginDate) : null;
      data.therapyParticipant.endDate = !isNullOrUndefined(data.therapyParticipant.endDate) ? new Date(data.therapyParticipant.endDate) : null;
      if (data.therapyParticipant.personAssignmentTypeID.personAssignmentTypeID == 1) {
        this.personAssignmentTypeID = 1;
        data.therapyParticipant.personID = {
          fullName: data.therapyParticipant.personID.LastName + ',' + data.therapyParticipant.personID.FirstName,
          clientID: data.therapyParticipant.personID.ClientID
        }
      } else {
        this.personAssignmentTypeID = 4;
        data.therapyParticipant.personID = {
          fullName: data.therapyParticipant.personID.LastName + ',' + data.therapyParticipant.personID.FirstName,
          familyMemberID: data.therapyParticipant.personID.familyMemberID
        }
      }

      this.partcipantsFormData.therapyParticipantID = data.therapyParticipant.therapyParticipantsID;
      this.partcipantsFormData = data.therapyParticipant;
      this.participantsTherpyForm.disable();
      this.editControll = true;

    })
  }
  saveParticipantsForm(source) {
    if (true) {
      // if (this.participantsTherpyForm.valid) {
      this.partcipantsFormData.beginDate = Date.parse(source.beginDate);
      this.partcipantsFormData.endDate = Date.parse(source.endDate)
      this.partcipantsFormData.referralID = this.referralId;
      if (source.therapyParticipantsID) {
        this.partcipantsFormData.therapyParticipantID = source.therapyParticipantsID;
      }
      // const loader = document.getElementById('loading-overlay') as HTMLElement;
      // loader.style.display = 'block';
      if (this.personAssignmentTypeID == 1) {
        this.partcipantsFormData.personID = source.personID.clientID;
        this.partcipantsFormData.personAssignmentTypeID = 1;
      } else if (this.personAssignmentTypeID == 4) {
        this.partcipantsFormData.personID = source.personID.familyMemberID;
        this.partcipantsFormData.personAssignmentTypeID = 4;
      }
      this.isFormView = false;
      this.isLoading = true;
      this._opencards.saveParticipants(this.partcipantsFormData).then((data: any) => {
        // loader.style.display = 'none';
        this.isLoading = false;
        swal('Success', 'Record has been updated!', 'success');
        // this._router.navigate(['/reports/progress-report/view']);
        this.partcipantsFormData = new ProgressReport();
        this.editControll = false;
        this.participantsTherpyForm.enable();
        this.fetchListViewInfo();
      })

    } else {
      swal('Warning', 'Please fill the mandatory fields', 'warning');
    }
  };

  editForm() {
    this.participantsTherpyForm.enable();
  }

  fetchListViewInfo() {
    this.isLoading = true;
    let HRreferralId =
      parseInt(localStorage.getItem("referralId")) -
      this._opencards.getHasKey();
    let requestObject = {

      referralID: 55819,
      endPagination: 100,
      beginPagination: 1,

    };
    this._opencards.getPartcipantsList(requestObject).then(data => {
      this.isLoading = false;
      this.tableRows = data.therapyParticipantList;
      this.tableHeaders = [
        {
          label: "Person Type",
          key: "persontype"
        },
        {
          label: "Person Name",
          key: "personName"
        },
        {
          label: "End Date",
          key: "EndDate"
        },
        {
          label: "Begin Date",
          key: "BeginDate"
        },
        {
          label: "Id",
          key: "therapyParticipantsID"
        },
      ];
      this.partcipantsFormData = new ProgressReport();
      this.participantsTherpyForm.enable();
      this.editControll = false;
      this.isListView = true;
    });
    // this._opencards.listAllHealthRecord(requestObject).then(data => {
    //   this.isLoading = false;
    //   this.tableRows = data.healthExam;
    //   this.tableHeaders = [
    //     {
    //       label: "Health Exam Type",
    //       key: "healthExamType"
    //     },
    //     {
    //       label: "Exam Completed Date",
    //       key: "examDate"
    //     },
    //     {
    //       label: "Next Due Date",
    //       key: "nextExamDue"
    //     }
    //   ];
    //   this.partcipantsFormData = new ProgressReport();
    //   this.participantsTherpyForm.enable();
    //   this.editControll = false;
    //   this.isListView = true;

    // });
  }

  createRecord() {
    this.partcipantsFormData = new ProgressReport();
    this.editControll = false;
    this.isFormView = true;
    this.isListView = false;
  }

  onRowSelected(rowData) {
    this.isAttachmentRequired = true;
    this.healthExamID = rowData['rowData'].therapyParticipantsID;
    this.getByParticipantsId();
  }

  discard() {
    this.partcipantsFormData = new ProgressReport();
    this.editControll = false;
    this.participantsTherpyForm.enable();
    this.fetchListViewInfo();
    this.isFormView = false;
  }

}
