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
import { QuestionGroupCreation } from './question-group-creation';

@Component({
  selector: 'app-question-group-creation',
  templateUrl: './question-group-creation.component.html',
  styleUrls: ['./question-group-creation.component.scss']
})
export class QuestionGroupCreationComponent implements OnInit {
  quesgroupcreation: QuestionGroupCreation = new QuestionGroupCreation();
  quesgroupcreationForm: FormGroup;
  isEdit = false;
  breadcrumbs = [];
  discardTo = '/reports/question-group-creation/view';
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  enteredDate: any;


  constructor(public _fb: FormBuilder, public _caseTeam: CaseTeamService, public _client: ClildFormService, public _opencard: OpencardsService, public _router: Router) { }


  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Question Creation List', href: "/reports/question-creation/view", active: '' }
    )
    if (this._router.url == '/reports/question-creation/detail') { this.getRecById() }
  }
  formValidation() {
    this.quesgroupcreationForm = this._fb.group({
      group: [null, Validators.compose([Validators.required])],
      questionGroupID: [null],
      enteredDate: [null],
      changedDate: [null]
    })
  }

  formActions(source: any) {
    if (this.quesgroupcreationForm.valid) {
      source.scale = !isNullOrUndefined(source.scale) ? source.scale.scale : null;
      !isNullOrUndefined(source.QuestionGroupID) ? this.update(source) : this.save(source);
    } else {
      swal('Warning', 'Mandatory fields are missing', 'info');
    }
  }


  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveQuestionGroupCreation(source).then((data) => {
      loader.style.display = 'none';
      swal('Save', 'Question created!', 'success');
      this._router.navigate(['/reports/question-group-creation/view'])
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateQuestionGroupCreation(source).then((data) => {
      loader.style.display = 'none';
      swal('Update', 'Question Creation updated!', 'success');
      this._router.navigate(['/reports/question-group-creation/view'])
    })
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { questionID: this._client.getId() }
   this._opencard.getQuestionGroupCreationByID(req).then((data) => {
      loader.style.display = 'none';
      this.quesgroupcreation = data.QuestionGroupCreation;
      this.isEdit = true;
      this.quesgroupcreationForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.QuestionGroupCreation.changedBy) ? data.QuestionGroupCreation.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.QuestionGroupCreation.changedDate) ? moment(data.QuestionGroupCreation.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.QuestionGroupCreation.enteredBy) ? data.QuestionGroupCreation.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.QuestionGroupCreation.enteredDate) ? moment(data.QuestionGroupCreation.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.quesgroupcreationForm.enable();
    this.isEdit = false
  }


}

