import { Component, OnInit } from '@angular/core';
import { QuestionCreation } from "./question-creation";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import swal from "sweetalert2";
import { ClildFormService } from '../child-forms/child-forms.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { isNullOrUndefined } from "util";
import { OpencardsService } from '../opecards-list-view/opencards.service';
import {LocalValues} from '../local-values';
import * as moment from 'moment';

@Component({
  selector: 'app-question-creation',
  templateUrl: './question-creation.component.html',
  styleUrls: ['./question-creation.component.scss']
})
export class QuestionCreationComponent implements OnInit {
  questionCreationForm: FormGroup;
  questionCreation: QuestionCreation = new QuestionCreation();
  isEdit = false;
  breadcrumbs = [];
  discardTo = '/reports/question-creation/view';
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _router: Router, public _caseTeam: CaseTeamService, public _client: ClildFormService, public _opencard: OpencardsService, public _fb: FormBuilder, public _localValues: LocalValues) { }

  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Question Creation List', href: "/reports/question-creation/view", active: '' },
      { label: 'Question Creation', active: 'active' }
    )
    if (this._router.url == '/reports/question-creation/detail') { this.getRecById() }
  }
  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveQuestionCreation(source).then((data) => {
      loader.style.display = 'none';
      swal('Save', 'Payor created!', 'success');
      this._router.navigate(['/reports/question-creation/view'])
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateQuestionCreation(source).then((data) => {
      loader.style.display = 'none';
      swal('Save', 'Payor updated!', 'success');
      this._router.navigate(['/reports/question-creation/view'])
    })
  }
  formActions(source: any) {
    if (this.questionCreationForm.valid) {
      source.question = !isNullOrUndefined(source.question) ? source.question.question : null;
      !isNullOrUndefined(source.questionID) ? this.update(source) : this.save(source);
    } else {
      swal('Warning', 'Mandatory fields are missing', 'info');
    }
  }
  formValidation() {
    this.questionCreationForm = this._fb.group({
      questionID: [null],
    })
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { questionID: this._client.getId() }
    this._opencard.getQuestionCreationByID(req).then((data) => {
      loader.style.display = 'none';
      this.questionCreation = data.QuestionCreation;
      this.isEdit = true;
      this.questionCreationForm.disable();
    })
  }
  editForm() {
    this.questionCreationForm.enable();
    this.isEdit = false;
  }

}

  
