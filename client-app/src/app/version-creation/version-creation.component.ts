import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaseTeamService } from '../case-team/case-team.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {LocalValues} from '../local-values';
import * as moment from 'moment';
import { VersionCreation } from './version-creation';

@Component({
  selector: 'app-version-creation',
  templateUrl: './version-creation.component.html',
  styleUrls: ['./version-creation.component.scss']
})
export class VersionCreationComponent implements OnInit {
  versionCreation: VersionCreation = new VersionCreation();
  versionCreationForm: FormGroup;
  isEdit = false;
  breadcrumbs = [];
  discardTo = '/reports/version-creation/view';
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  evaluationScale: any;


  constructor(public _fb: FormBuilder, public _caseTeam: CaseTeamService, public _client: ClildFormService, public _opencard: OpencardsService, public _router: Router) { }


  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Evaluation Scale List', href: "/reports/version-creation/view", active: '' }
    )
    if (this._router.url == '/reports/evaluation-scale/detail') { this.getRecById() }
  }
  formValidation() {
    this.versionCreationForm = this._fb.group({
      evaluationVersionID: [null, Validators.compose([Validators.required])],
      version: [null],
      beginDate: [null],
      endDate: [null],  
      minValue: [null],
      maxValue: [null],
      step: [null],
      isOOH: [null],
      isInHome: [null],  
      isOOH_OK: [null],
      isProvider_OK: [null],
      isPRTF: [null],
      directions: [null],
      enteredDate: [null],  
      changedDate: [null]
    })
  }

  formActions(source: any) {
    if (this.versionCreationForm.valid) {
      source.version = !isNullOrUndefined(source.version) ? source.version.version : null;
      !isNullOrUndefined(source.EvaluationVersionID) ? this.update(source) : this.save(source);
    } else {
      swal('Warning', 'Mandatory fields are missing', 'info');
    }
  }


  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveVersionCreation(source).then((data) => {
      loader.style.display = 'none';
      swal('Save', 'Version created!', 'success');
      this._router.navigate(['/reports/version-creation/view'])
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateVersionCreation(source).then((data) => {
      loader.style.display = 'none';
      swal('Update', 'Version Creation updated!', 'success');
      this._router.navigate(['/reports/version-creation/view'])
    })
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { evaluationVersionID: this._client.getId() }
   this._opencard.getVersionCreationByID(req).then((data) => {
      loader.style.display = 'none';
      this.versionCreation = data.VersionCreation;
      this.isEdit = true;
      this.versionCreationForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.VersionCreation.changedBy) ? data.VersionCreation.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.VersionCreation.changedDate) ? moment(data.VersionCreation.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.VersionCreation.enteredBy) ? data.VersionCreation.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.VersionCreation.enteredDate) ? moment(data.VersionCreation.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.versionCreationForm.enable();
    this.isEdit = false
  }


}

