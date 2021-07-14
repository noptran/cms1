import { Component, OnInit } from '@angular/core';
import { AccessRights } from './access-rights';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CaseTeamService } from '../case-team/case-team.service';
import { TeamFormService } from '../team-form/team-form.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';

@Component({
  selector: 'app-access-rights-components',
  templateUrl: './access-rights-components.component.html',
  styleUrls: ['./access-rights-components.component.scss']
})
export class AccessRightsComponentsComponent implements OnInit {
  access: AccessRights = new AccessRights();
  accessRights: FormGroup;
  discardTo = '/accessrights/view-role';
  metaData = [];
  staffValues = [];
  showStaffValues = false;
  cis; familyPres; oklahoma; behavior;
  cms; reintegration; fosterCare;
  clientCreate: boolean;
  viewSSN: boolean;
  isEdit = false;
  cms_view: boolean;
  constructor(public fb: FormBuilder, public _caseTeam: CaseTeamService,
    public teamFormService: TeamFormService, public router: Router, public _opencard: OpencardsService) { }

  ngOnInit() {
    this.formValidation();
    if (this.router.url === '/accessrights/details-role') {
      this.getRoleDetails();
    }
  }
  formValidation() {
    this.accessRights = this.fb.group({
      roleType: [null],
      description: [null],
      staff: [null],
      accessRights: [null],
      reintegration: [null],
      behavioralAssessment: [null],
      fosterCare: [null],
      familyPreservation: [null],
      oklahoma: [null],
      viewSSN: [null],
      clientCreate: [null],
    });
  }
  getRoleDetails() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const req = { 'roleID': parseInt(localStorage.getItem('roleID')) - this._opencard.getHasKey() };
    this._caseTeam.accessGetById(req).then(data => {
      data.roleDetails.staff.map((item) => {
        item['fullName'] = item.firstName + ' ' + item.lastName + ' ( ' + item.email + ' ) ';
      });
      JSON.parse(data.roleDetails.accessRights).accessRights.cisUserRights.map((item) => {
        this.cis = true;
        if (!isNullOrUndefined(item.reintegration)) {
          this.reintegration = true;
          data.roleDetails.reintegration = item.reintegration;
        }
        if (!isNullOrUndefined(item.behavioralAssessment)) {
          this.behavior = true;
          data.roleDetails.behavioralAssessment = item.behavioralAssessment;
        }
        if (!isNullOrUndefined(item.fosterCare)) {
          this.fosterCare = true;
          data.roleDetails.fosterCare = item.fosterCare;
        }
        if (!isNullOrUndefined(item.familyPreservation)) {
          this.familyPres = true;
          data.roleDetails.familyPreservation = item.familyPreservation;
        }
        if (!isNullOrUndefined(item.oklahoma)) {
          this.oklahoma = true;
          data.roleDetails.oklahoma = item.oklahoma;
        }
      });
      if (!isNullOrUndefined(JSON.parse(data.roleDetails.accessRights).accessRights.cmsUserRights)) {
        JSON.parse(data.roleDetails.accessRights).accessRights.cmsUserRights.map((item) => {
          if (!isNullOrUndefined(item.clientCreate)) {
            this.clientCreate = true;
            data.roleDetails.clientCreate = item.clientCreate;
          }
          if (!isNullOrUndefined(item.viewSSN)) {
            this.viewSSN = true;
            data.roleDetails.viewSSN = item.viewSSN;
          }
        });
      }
      this.access = data.roleDetails;

      this.accessRights.disable();
      this.isEdit = true;
      loader.style.display = 'none';
    });
  }
  getStaffDetails(event) {
    const req = { Object: 'staff', value: event.query };
    this._caseTeam.getSearchList(req).then(data => {
      data.dropDown.map((item) => {
        item['fullName'] = item.firstName + ' ' + item.lastName + ' ( ' + item.email + ' ) ';
      });
      this.metaData = data.dropDown;
    });
  }
  saveAccessRight(accessRights: AccessRights) {
    const staffArr = [];
    accessRights.staff.map((item) => {
      staffArr.push(item.staffID);
    });
    const req = {
      roleType: accessRights.roleType,
      description: accessRights.description,
      staff: staffArr,
      accessRights: {
        cisUserRights: [
          { reintegration: accessRights.reintegration },
          { behavioralAssessment: accessRights.behavioralAssessment },
          { fosterCare: accessRights.fosterCare },
          { familyPreservation: accessRights.familyPreservation },
          { oklahoma: accessRights.oklahoma }
        ],
        cmsUserRights: [
          { clientCreate: accessRights.clientCreate },
          { viewSSN: accessRights.viewSSN },
        ]
      }
    };
    if (!isNullOrUndefined(accessRights.roleID)) {
      req['roleID'] = accessRights.roleID;
    }
    this._caseTeam.saveAccessRights(req).then(data => {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      if (data.responseStatus === true) {
        swal('Success', 'Role has been created!', 'success');
        this.router.navigate(['/accessrights/view-role']);
      }
      loader.style.display = 'none';
    });
  }
  triggerStaffView(event) {
    this.staffValues.push(event.fullName);
    this.showStaffValues = true;
  }
  spliceStaffValue(event) {
  }
  editForm() {
    this.accessRights.enable();
    this.isEdit = false;
  };
  handleData(ev) {
    this.cms_view = ev;
  }
}
