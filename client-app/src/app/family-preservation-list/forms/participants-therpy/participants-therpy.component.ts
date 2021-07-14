import { Component, OnInit } from '@angular/core';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParticipantsTherpy } from './participants-therpy';
import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';
import { CaseTeamService } from '../../../case-team/case-team.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';
@Component({
  selector: 'app-participants-therpy',
  templateUrl: './participants-therpy.component.html',
  styleUrls: ['./participants-therpy.component.scss']
})
export class ParticipantsTherpyComponent implements OnInit {
  title: any = 'Participants in Therapy';
  clientId: any;
  referralId: any;
  participantsTherpyForm: FormGroup;
  partcipantsFormData: ParticipantsTherpy = new ParticipantsTherpy();
  personAssignmentTypeID: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  editControll: boolean;
  isAttachmentRequired = false;
  breadcrumbs = [];
  deleteReq = {};
  status: any;
  formStatus: any;
  subtitle: any;

  discardTo: any;

  constructor(public _participantsTherpy: FormBuilder, public _caseTeam: CaseTeamService, public _router: Router, public _opencards: OpencardsService) { }

  ngOnInit() {
    this.getClientDetails();
    this.getPersonAssignments();
    this.formValidation();
    this.editControll = false;
    if (this._router.url == '/reports/participants-therpy/detail') {
      this.getByParticipantsId();
      this.isAttachmentRequired = true;
    } else {
      delete this.partcipantsFormData.therapyParticipantID;
    };
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Family', href: "/reports/family/view", active: '' },
      { label: 'Participants in Therapy', href: "/reports/participants-therpy/view", active: '' },
      { label: 'Participants in Therapy Form', active: 'active' }
    );
  };
  formValidation() {
    this.participantsTherpyForm = this._participantsTherpy.group({
      'personAssignmentTypeID': [null, Validators.compose([Validators.required])],
      'beginDate': [null, Validators.compose([Validators.required])],
      'endDate': [null],
      'personID': [null, Validators.compose([Validators.required])],
      'notes': [null],
      'referralID': [null],
      'therapyParticipantID': [null]
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
    console.log("detail>>>", detail);
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
        // data.dropDown.map((item: any) => {
        //   item['fullName'] = item.clientName;
        // })

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
        // data.dropDown.map((item: any) => {
        //   item['fullName'] = item.name;
        // });
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
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.deleteReq = { TherapyParticipants: this.clientId }
    this._opencards.getByParticipants({ "therapyParticipantID": this.clientId }).then((data: any) => {
      loader.style.display = 'none';
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
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.therapyParticipant.changedBy) ? data.therapyParticipant.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.therapyParticipant.changedDate) ? moment(data.therapyParticipant.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.therapyParticipant.enteredBy) ? data.therapyParticipant.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.therapyParticipant.enteredDate) ? moment(data.therapyParticipant.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


    })
  }
  saveParticipantsForm(source) {
    if (this.participantsTherpyForm.valid) {
      this.partcipantsFormData.beginDate = Date.parse(source.beginDate);
      this.partcipantsFormData.endDate = Date.parse(source.endDate)
      this.partcipantsFormData.referralID = this.referralId;
      if (source.therapyParticipantsID) {
        this.partcipantsFormData.therapyParticipantID = source.therapyParticipantsID;
      }
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      if (this.personAssignmentTypeID == 1) {
        this.partcipantsFormData.personID = source.personID.clientID;
        this.partcipantsFormData.personAssignmentTypeID = 1;
      } else if (this.personAssignmentTypeID == 4) {
        this.partcipantsFormData.personID = source.personID.familyMemberID;
        this.partcipantsFormData.personAssignmentTypeID = 4;
      }
      this._opencards.saveParticipants(this.partcipantsFormData).then((data: any) => {
        loader.style.display = 'none';
        swal('Success', 'Record has been updated!', 'success');
        this._router.navigate(['/reports/participants-therpy/view']);
      })

    } else {
      swal('Warning', 'Please fill the mandatory fields', 'warning');
    }
  };

  editForm() {
    this.participantsTherpyForm.enable();
  }

  navigateTo() {
    console.log('navigateTo');
  }
}
