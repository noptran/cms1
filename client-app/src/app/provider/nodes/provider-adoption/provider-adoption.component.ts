import { Component, OnInit } from '@angular/core';
import { ProviderAdoption, FamilyAssessmentAssigned } from './provider-adoption';
import { isNullOrUndefined } from 'util';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderService } from '../../provider.service';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { CaseTeamService } from '../../../case-team/case-team.service';
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ClildFormService } from '../../../child-forms/child-forms.service';
import swal from 'sweetalert2';
import {LocalValues} from '../../../local-values';

@Component({
  selector: 'app-provider-adoption',
  templateUrl: './provider-adoption.component.html',
  styleUrls: ['./provider-adoption.component.scss']
})
export class ProviderAdoptionComponent implements OnInit {
  adoption: ProviderAdoption = new ProviderAdoption();
  faAssigned: FamilyAssessmentAssigned = new FamilyAssessmentAssigned();
  providerAdoption: FormGroup;
  faaList = [];
  selectedIndex: number;
  breadcrumbs = [];
  isEdit = false;
  showStaff = true;
  discardTo = '/provider/opencard/adoption/view';
  metaData = [];
  showOpenCard = false;
  btnLabel = 'Add';
  adoptionSpecialistNotes; beginDate; endDate; personTable; adoptionSpecialist;
  isallowProviderAdoptionSpecialist: boolean;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  constructor(public _router: Router, public _fb: FormBuilder, public _provider: ProviderService,
    public _opencard: OpencardsService, public _caseTeam: CaseTeamService, public clildFormService: ClildFormService,
    public _localValues: LocalValues) { }

  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider List', href: '/reports/provider/view', active: '' },
      { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Adoption Opencard', active: '', href: '/provider/dashboard/adoption' },
      { label: 'Adoption List', active: '', href: '/provider/opencard/adoption/view' },
      { label: 'Adoption', active: 'active' }
    );
    if (this._router.url === '/provider/opencard/adoption/detail') {
      this.showOpenCard = true;
      this.getProviderAdoptionDetails();
    }
  }

  getListDetails(obj: any, label: any, i: any) {
    this.selectedIndex = i;
    switch (label) {
      case 'faaList':
        this.adoptionSpecialistNotes = obj.adoptionSpecialistNotes;
        this.beginDate = obj.beginDate;
        this.endDate = obj.endDate;
        this.personTable = obj.personTable;
        this.adoptionSpecialist = obj.adoptionSpecialist;
        this.btnLabel = 'update';
        break;
    }
  }
  addList(adoptionSpecialistNotes: any, beginDate: any, endDate: any,
    adoptionSpecialist: any, personTable: any, label: any) {
    let list = [], btnLabel: any;
    switch (label) {
      case 'faaList':
        list = this.faaList;
        this.beginDate = '';
        this.endDate = '';
        this.adoptionSpecialistNotes = '';
        this.personTable = '';
        this.adoptionSpecialist = '';
        btnLabel = this.btnLabel;
        break;
    }

    if (btnLabel === 'update') {
      list.splice(this.selectedIndex, 1);
      list.push({
        'adoptionSpecialistNotes': adoptionSpecialistNotes, 'beginDate': beginDate,
        'endDate': endDate, 'adoptionSpecialist': adoptionSpecialist, 'personTable': personTable
      });
    } else {
      list.push({
        'adoptionSpecialistNotes': adoptionSpecialistNotes, 'beginDate': beginDate,
        'endDate': endDate, 'adoptionSpecialist': adoptionSpecialist, 'personTable': personTable
      });
    }
    this.faaList.map((item, index) => {
      if (item.endDate === '' || isNullOrUndefined(item.endDate)) {
        if (this.faaList.length > index) {
          // if (isNullOrUndefined(this.faaList[index + 1].endDate)) {
          if (!isNullOrUndefined(this.faaList[index + 1].beginDate)) {
            item.endDate = moment(this.faaList[index + 1].beginDate).subtract(1, "days");
          }
          // }
        }
      }
    })
    switch (label) {
      case 'faaList':
        this.btnLabel = 'Add';
        break;
    }
  }
  editForm() {
    this.providerAdoption.enable();
    this.isEdit = false;
  }
  removeList(label: any) {
    switch (label) {
      case 'faaList':
        this.btnLabel = 'Add';
        break;
    }
  }
  formAction(source: any, faAssigned: any) {
    this.faaList.map((item) => {
      item.notes = !isNullOrUndefined(item.adoptionSpecialistNotes) ? item.adoptionSpecialistNotes : null;
      item.personAssignmentTypeID = !isNullOrUndefined(item.personTable) ? item.personTable.personAssignmentTypeID : null;
      item.personID = !isNullOrUndefined(item.adoptionSpecialist) ? isNullOrUndefined(item.adoptionSpecialist.staffID) ?
        item.adoptionSpecialist.communityMemberID : item.adoptionSpecialist.staffID : null;
      item.beginDate = !isNullOrUndefined(item.beginDate) ? this._localValues.stringFormatDatetime(item.beginDate) : null;
      item.endDate = !isNullOrUndefined(item.endDate) && (item.endDate !== '') ? this._localValues.stringFormatDatetime(item.endDate) : null;
    });

    // delete the unwanted keys in obj
    this.faaList.map((item) => {
      delete item.adoptionSpecialistNotes;
      delete item.personTable;
      delete item.adoptionSpecialist;
    });
    const req = {
      'providerAdoption': {
        'adoptionPacketCompleted': !isNullOrUndefined(source.adoptionPacketCompleted) ? this._localValues.stringFormatDatetime(source.adoptionPacketCompleted) : null,
        'adoptionPacketSent': !isNullOrUndefined(source.adoptionPacketSent) ? this._localValues.stringFormatDatetime(source.adoptionPacketSent) : null,
        'assessmentCompleted': !isNullOrUndefined(source.assessmentCompleted) ? this._localValues.stringFormatDatetime(source.assessmentCompleted) : null,
        'providerID': parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey(),
        'notes': !isNullOrUndefined(source.notes) ? source.notes : null
      },
      'providerAdoptionSpecialist': this.faaList
    };
    if ((req.providerAdoption.adoptionPacketCompleted === null) && (req.providerAdoption.notes === null)
      && (req.providerAdoption.adoptionPacketSent === null) && (req.providerAdoption.assessmentCompleted === null) &&
      (req.providerAdoptionSpecialist.length <= 0)) {
      Swal.fire({
        title: 'An adoption specialist is needed. Do you want to save without one?',
        type: 'Info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((res) => {
        if (res.value === true) {
          if (!isNullOrUndefined(source.providerAdoptionID)) {
            req.providerAdoption['providerAdoptionID'] = source.providerAdoptionID;
            this.save(req);
          } else {
            this.save(req);
          }
        }
      });
    } else {
      if (!isNullOrUndefined(source.providerAdoptionID)) {
        req.providerAdoption['providerAdoptionID'] = source.providerAdoptionID;
        this.save(req);
      } else {
        this.save(req);
      }
    }

  }
  save(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._provider.saveProviderAdoption(source).then((data) => {
      this._router.navigate(['/provider/opencard/adoption/view']);
    });
    loader.style.display = 'none';
  }
  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._provider.updateProviderAdoption(source).then((data) => {
      this._router.navigate(['/provider/opencard/adoption/view']);
    });
    loader.style.display = 'none';
  }

  formValidation() {
    this.providerAdoption = this._fb.group({
      providerAdoptionID: [null],
      adoptionPacketSent: [null],
      adoptionPacketCompleted: [null],
      assessmentCompleted: [null],
      notes: [null],
      personTable: [null],
      adoptionSpecialist: [null],
      beginDate: [null],
      endDate: [null],
      adoptionSpecialistNotes: [null],
    });
  }

  getProviderAdoptionDetails() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.getProviderAdoption()
      .then(() => {
        let item;
        this._provider.getPersonAssignmentType().then((data) => {
          item = data.personAssignmentType;
        })
          .then(() => {
            const req = {
              'providerAdoptionID': parseInt(localStorage.getItem('providerAdoptionID')) - this._opencard.getHasKey(),
              'beginPagination': 1,
              'endPagination': 100
            };
            return this._provider.providerAdoptionSpecialistList(req).then((data) => {
              data.providerAdoptionSpecialist.map((adopSpecialist) => {
                item.map((person) => {
                  if (adopSpecialist.personAssignmentTypeID === person.personAssignmentTypeID) {
                    adopSpecialist['personTable'] = { 'personAssignmentType': person.personAssignmentType };
                    adopSpecialist['adoptionSpecialistNotes'] = adopSpecialist.notes;
                    !isNullOrUndefined(adopSpecialist.beginDate) ? adopSpecialist.beginDate =
                      moment.utc(adopSpecialist.beginDate).format('MM/DD/YYYY') : null;
                    !isNullOrUndefined(adopSpecialist.endDate) ? adopSpecialist.endDate =
                      moment.utc(adopSpecialist.endDate).format('MM/DD/YYYY') : null;
                  }
                });
              });
              this.faaList = data.providerAdoptionSpecialist;
              this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.providerAdoption.changedBy) ? data.providerAdoption.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.providerAdoption.changedDate) ? moment(data.providerAdoption.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.providerAdoption.enteredBy) ? data.providerAdoption.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.providerAdoption.enteredDate) ? moment(data.providerAdoption.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


            }).then(() => {
              let request;
              this.faaList.map((faa) => {
                if (faa.personTable.personAssignmentType === 'Staff') {
                  request = { staffID: faa.personID };
                  this.clildFormService.getDetailsById(request).then(data => {
                    faa['adoptionSpecialist'] = { 'fullName': data.staff.lastName + ',' + data.staff.firstName };
                  });
                } else if (faa.personTable.personAssignmentType === 'Community Member') {
                  request = { communityMemberID: faa.personID };
                  this.clildFormService.getDetailsById(request).then(data => {
                    faa['adoptionSpecialist'] = { 'fullName': data.person.lastName + ',' + data.person.firstName };
                  });
                }
              });
            });
          });
        loader.style.display = 'none';
      }).then(() => {
        this.providerAdoption.disable();
        this.isEdit = true;
        
      });
  }

  getProviderAdoption() {
    this.req = { 'providerAdoptionID': parseInt(localStorage.getItem('providerAdoptionID')) - this._opencard.getHasKey() };
    return this._provider.providerAdoptionGetById(this.req).then((data) => {
      !isNullOrUndefined(data.providerAdoption.adoptionPacketCompleted) ? data.providerAdoption.adoptionPacketCompleted =
        moment.utc(data.providerAdoption.adoptionPacketCompleted).format('MM/DD/YYYY') : null;
      !isNullOrUndefined(data.providerAdoption.adoptionPacketSent) ? data.providerAdoption.adoptionPacketSent =
        moment.utc(data.providerAdoption.adoptionPacketSent).format('MM/DD/YYYY') : null;
      !isNullOrUndefined(data.providerAdoption.assessmentCompleted) ? data.providerAdoption.assessmentCompleted =
        moment.utc(data.providerAdoption.assessmentCompleted).format('MM/DD/YYYY') : null;
      this.adoption = data.providerAdoption;
    });
  }

  personTableDetails() {
    return this._provider.getPersonAssignmentType().then((data) => {
      this.metaData = data.personAssignmentType;
    });
  }
  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case 'staff':
        obj = 'staff';
        break;
      case 'communityMember':
        obj = 'communityMember';
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      data.dropDown.map((item) => {
        item['fullName'] = `${!isNullOrUndefined(item.lastName) ? item.lastName : null},${!isNullOrUndefined(item.firstName) ? item.firstName : null}`;
      });
      this.metaData = data.dropDown;
    });
  }

  getPersonID(event) {
    if (event.personAssignmentType === 'Staff') {
      this.showStaff = true;
    } else {
      this.showStaff = false;
    }
  }
}
