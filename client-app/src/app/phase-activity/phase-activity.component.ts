import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PhaseActitvity } from './phase-actitvity';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { CaseTeamService } from '../case-team/case-team.service';

@Component({
  selector: 'app-phase-activity',
  templateUrl: './phase-activity.component.html',
  styleUrls: ['./phase-activity.component.scss', '../case-team/case-team.component.scss']
})
export class PhaseActivityComponent implements OnInit {
  activity: PhaseActitvity = new PhaseActitvity();
  activityForm: FormGroup;
  title = 'Phase Activities';
  breadcrumbs = [];
  editControll = false;
  discardTo = '/reports/referral/family-preservation/phase-activity/view';
  metaData = [];
  phaseTypeID: number;
  listIntensivePhaseActivities = [];
  listNonIntensivePhaseActivities = [];
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _fb: FormBuilder,
    public _router: Router,
    public _client: ClildFormService,
    public _opencard: OpencardsService,
    public _caseTeam: CaseTeamService) { }

  ngOnInit() {
    this.phaseTypeID = parseInt(localStorage.getItem('phaseTypeId')) - this._opencard.getHasKey();
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reports/referral/family-preservation/detail", active: '' },
      { label: 'Phase', href: "/reports/referral/family-preservation/phase/detail", active: '' },
      { label: 'Phase Activities List', href: "/reports/referral/family-preservation/phase-activity/view", active: '' },
      { label: 'Phase Activities', active: 'active' },
    )
    if (this._router.url == '/reports/referral/family-preservation/phase-activity/detail') {
      this.getById();
    }
    // this.getPhaseActivities();
  }

  addPost(source) {
    !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
    !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    source.phaseID = parseInt(localStorage.getItem('phaseId')) - this._opencard.getHasKey();
    !isNullOrUndefined(source.phaseActivityTypeID) ? source.phaseActivityTypeID = source.phaseActivityTypeID.phaseActivityTypeID : null;
    this.activity.phaseActivityID ? this.update(source) : this.save(source);
  }

  save(source) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.savePhaseActivity(source).then((data) => {
      this.activity = data.phaseActivity;
      loader.style.display = 'none';
      this.editControll = true;
      swal('Save', 'Phase activity created', 'success');
      this._router.navigate(['/reports/referral/family-preservation/phase-activity/view'])
    })
  }

  update(source) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updatePhaseActivity(source).then((data) => {
      this.activity = data.phaseActivity;
      loader.style.display = 'none';
      this.editControll = true;
      swal('Update', 'Phase activity updated', 'success');
      this._router.navigate(['/reports/referral/family-preservation/phase-activity/view'])
    })
  }

  getById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { phaseActivityID: this._client.getId() }
    this._opencard.getByIdPhaseActivity(req).then((data) => {
      loader.style.display = 'none';
      if (data.phaseActivity.isActive) {
        !isNullOrUndefined(data.phaseActivity.beginDate) ? data.phaseActivity.beginDate = new Date(data.phaseActivity.beginDate) : null;
        !isNullOrUndefined(data.phaseActivity.endDate) ? data.phaseActivity.endDate = new Date(data.phaseActivity.endDate) : null;
      } else {
        !isNullOrUndefined(data.phaseActivity.beginDate) ? data.phaseActivity.beginDate = moment.utc(data.phaseActivity.beginDate).format('MM/DD/YYYY') : null;
        !isNullOrUndefined(data.phaseActivity.endDate) ? data.phaseActivity.endDate = moment.utc(data.phaseActivity.endDate).format('MM/DD/YYYY') : null;
      }
      this.editControll = true;
      this.activityForm.disable();
      this.activity = data.phaseActivity;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.phaseActivity.changedBy) ? data.phaseActivity.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.phaseActivity.changedDate) ? moment(data.phaseActivity.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.phaseActivity.enteredBy) ? data.phaseActivity.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.phaseActivity.enteredDate) ? moment(data.phaseActivity.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  formValidation() {
    this.activityForm = this._fb.group({
      "beginDate": [null],
      "endDate": [null],
      "notes": [null],
      "phaseActivityType": [null]
    })
  }

  editForm() {
    this.editControll = false;
    this.activityForm.enable();
  }


  filterPhaseActivities(event) {
    let req = { Object: "phaseActivityType", value: event.query },
      intensiveList = [], nonIntensiveList = [], result = [];
    this._caseTeam.getSearchList(req)
      .then((data: any) => {
        data.dropDown.filter((item: any) => {
          if ((item.isIntensive)) {
            intensiveList.push(item);
          } else {
            nonIntensiveList.push(item);
          }
        })
        if (this.phaseTypeID === 1) {
          this.metaData = intensiveList;
        } else {
          this.metaData = nonIntensiveList;
        }
      })

  }
}