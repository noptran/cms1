import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { CaseTeamService } from '../../case-team/case-team.service';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { TreatmentDecions } from './treatment-decisons';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../../local-values';
import * as _ from 'lodash';

@Component({
  selector: 'app-treatment-decisions',
  templateUrl: './treatment-decisions.component.html',
  styleUrls: ['./treatment-decisions.component.scss'],
  inputs: ['isPopUpWindow'],
})
export class TreatmentDecisionsComponent implements OnInit {
  @Input() isPopUpWindow = false;

  @Output() closeModel = new EventEmitter();

  treatmentDecision: TreatmentDecions = new TreatmentDecions();

  treatmentDecisionForm: FormGroup;

  isLoading = false;
  isListView = false;
  isFormView = false;

  tableRows: any;
  tableHeaders: any;
  treatmentDecisionsID: any;

  isEdit = false;
  isAttachmentRequired = false;
  metaData = [];
  personAssignmentTypeID: any;
  personLists: any;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;


  constructor(public _caseTeam: CaseTeamService, public _fb: FormBuilder, public _opencard: OpencardsService, public _local: LocalValues, public _client: ClildFormService, public _router: Router) { }


  ngOnInit() {
    this.fetchListViewInfo();
    this.formValidation();
  }

  formValidation() {
    this.treatmentDecisionForm = this._fb.group({
      "treatmentDecisionsID": [null],
      "beginDate": [null],
      "endDate": [null],
      "notes": [null],
      "referralID": [null],
      "personAssignmentTypeID": [null],
      "personID": [null],
    })
  }

  fetchListViewInfo() {
    this.isLoading = true;
    let HRreferralId =
      parseInt(localStorage.getItem("referralId")) -
      this._opencard.getHasKey();
    let requestObject = {

      referralID: 55819,
      endPagination: 100,
      beginPagination: 1,
      sort: { column: 'treatmentDecisionsID', mode: "desc" }
    };
    this._opencard.listTreatmentDecisions(requestObject).then(data => {
      this.isLoading = false;
      this.tableRows = data.treatmentDecisions;
      this.tableHeaders = [
        {
          label: "Person Assignment Type",
          key: "personAssignmentType"
        },
        {
          label: "Person Name",
          key: "personName"
        },
        {
          label: "Begin Date",
          key: "beginDate"
        },
        {
          label: "End Date",
          key: "endDate"
        }
      ];
      this.treatmentDecision = new TreatmentDecions();
      this.treatmentDecisionForm.enable();
      this.isEdit = false;
      this.isListView = true;

    });
  }

  createRecord() {
    this.treatmentDecision = new TreatmentDecions();
    this.isEdit = false;
    this.isFormView = true;
    this.isListView = false;
  }

  onRowSelected(rowData) {
    this.isAttachmentRequired = true;
    this.treatmentDecisionsID = rowData['rowData'].treatmentDecisionsID;
    this.getById();
  }

  formAction(source) {
    console.log('source in save is', source);
    if (this.treatmentDecisionForm.valid) {
      source.beginDate = this._local.stringFormatDatetime(Date.parse(source.beginDate));
      source.endDate = this._local.stringFormatDatetime(Date.parse(source.endDate));
      !isNullOrUndefined(source.personAssignmentTypeID) ? source.personAssignmentTypeID = source.personAssignmentTypeID.personAssignmentTypeID : null;
      if (this.personAssignmentTypeID == 2 && source.personID.caseTeamID) {
        !isNullOrUndefined(source.personID) ? source.personID = source.personID.caseTeamID : null;
      }
      else if (this.personAssignmentTypeID == 4 && source.personID.familyMemberID) {
        !isNullOrUndefined(source.personID) ? source.personID = source.personID.familyMemberID : null;
      }
      else {
        source.personID = null;
      }
      // source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
      source.referralID = 55819;
      !isNullOrUndefined(source.treatmentDecisionsID) ? this.update(source) : this.save(source);
      console.log('source in save is', source);
    }
    else {
      swal('Info', 'Please fill the mandatory fields', 'warning');
    }

  }

  save(source: any) {
    this.isFormView = false;
    this.isLoading = true;
    this._opencard.saveTreatmentDecision(source).then((data) => {
      this.isLoading = false;
      swal('Save', 'Record has been saved!', 'success');
      this.treatmentDecision = new TreatmentDecions();
      this.isEdit = false;
      this.treatmentDecisionForm.enable();
      this.fetchListViewInfo();
    })
  }

  update(source: any) {
    this.isFormView = false;
    this.isLoading = true;
    this._opencard.updateTreatmentDecision(source).then((data) => {
      this.isLoading = false;
      swal('Upadate', 'Record has been updated!', 'success');
      this.treatmentDecision = new TreatmentDecions();
      this.isEdit = false;
      this.treatmentDecisionForm.enable();
      this.fetchListViewInfo();
    })
  }

  getMetaData(event, label) {
    let metaDataObj, metaDataReq

    switch (label) {
      case 'person_table':
        let request = {
          "referralTypeID": 14
        }
        this._opencard.getTreatmentDecisionsPersonTable(request).then(data => {
          this.metaData = data;
        })
        break;
      case 'person_name':
        let req = {
          // Hardcoded to be removed/
          "personAssignmentTypeID": this.personAssignmentTypeID,
          "referralID": 90
        }
        this._opencard.getTreatmentDecisionsPersonAssigmentTyes(req).then(data => {
          let personList = [];
          data.forEach(element => {
            let item: any;
            if (this.personAssignmentTypeID == 2) {
              item = {
                fullName: element.caseTeamMember,
                caseTeamID: element.caseTeamID
              }
            }
            else if (this.personAssignmentTypeID == 4) {
              item = {
                fullName: element.name,
                familyMemberID: element.familyMemberID
              }
            }
            personList.push(item);
          });
          this.metaData = personList;
        })

        break;

    }



  }

  getPeresonDetails(detail) {
    this.personAssignmentTypeID = detail.personAssignmentTypeID;

  };

  getPeresonAllDetails(event) {
    let familyList = [];
    let clientList = [];
    let obj;
    if (this.personAssignmentTypeID == 2) {
      obj = 'client';
      let req = { Object: obj, value: event.query }
      this._caseTeam.getSearchList(req).then((data) => {
        data.dropDown.forEach(element => {
          let data1 = {
            fullName: element.clientName,
            clientID: element.clientID
          }
          clientList.push(data1);
        });
        this.personLists = clientList;
      })
    } else if (this.personAssignmentTypeID == 4) {
      obj = 'familymember';
      let req = { Object: obj, value: event.query }
      this._caseTeam.getSearchList(req).then((data) => {

        data.dropDown.forEach(element => {
          let data = {
            fullName: element.name,
            familyMemberID: element.familyMemberID
          }
          familyList.push(data);
        });
        this.personLists = familyList;
      })
    }
  };

  getById() {
    this.isListView = false;
    this.isLoading = true;
    // ---hardcoded to be removed
    // his.req = { treatmentDecisionsID: this.treatmentDecisionsID }
    this.req = { treatmentDecisionsID: 1 }
    this._opencard.getByIdTreatmentDecison(this.req).then((source) => {
      this.isLoading = false;
      this.isFormView = true;

      source.beginDate = new Date(source.beginDate);
      source.endDate = new Date(source.endDate);

      (source.treatmentDecisions.personAssignmentTypeID) ? this.personAssignmentTypeID = source.treatmentDecisions.personAssignmentTypeID.personAssignmentTypeID : null;

      !isNullOrUndefined(source.treatmentDecisions.personID) ? source.treatmentDecisions.personID = { personID: source.treatmentDecisions.personID.staffID, fullName: source.treatmentDecisions.personID.firstName } : null;


      this.treatmentDecision = source.treatmentDecisions;
      this.isEdit = true;
      this.treatmentDecisionForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(source.treatmentDecisions.changedBy) ? source.treatmentDecisions.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(source.treatmentDecisions.changedDate) ? moment(source.treatmentDecisions.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(source.treatmentDecisions.enteredBy) ? source.treatmentDecisions.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(source.treatmentDecisions.enteredDate) ? moment(source.treatmentDecisions.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';




    })
  }

  editForm() {
    this.isEdit = false;
    this.treatmentDecisionForm.enable();
  }

  discardForm() {
    this.treatmentDecision = new TreatmentDecions();
    this.isEdit = false;
    this.treatmentDecisionForm.enable();
    this.fetchListViewInfo();
    this.isFormView = false;
  }

}
