import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaseTeamService } from '../case-team/case-team.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { isNullOrUndefined } from 'util';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { EvaluationAllowedGroups } from './set-evaluation-allowed-group';
@Component({
  selector: 'app-set-evaluation-allowed-group',
  templateUrl: './set-evaluation-allowed-group.component.html',
  styleUrls: ['./set-evaluation-allowed-group.component.scss']
})
export class SetEvaluationAllowedGroupsComponent implements OnInit {
  evaluationAllowedGroups: EvaluationAllowedGroups = new EvaluationAllowedGroups();
  evalAllowedGroupsForm: FormGroup;
  isEdit = false;
  breadcrumbs = [];
  discardTo = '/reports/set-evaluation-allowed-groups/view';
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  evaluationCreationForm: any;
  evaluationQuestion: any;
  evaluationType: any;


  constructor(public _fb: FormBuilder, public _caseTeam: CaseTeamService, public _client: ClildFormService, public _opencard: OpencardsService, public _router: Router) { }


  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Evaluation Allowed Groups List', href: "/reports/set-evaluation-allowed-groups/view", active: '' }
    )
    if (this._router.url == '/reports/set-evaluation-allowed-groups/detail') { this.getRecById() }
  }
  formValidation() {
    this.evalAllowedGroupsForm = this._fb.group({
      order: [null, Validators.compose([Validators.required])],
      evaluationType: [null],
      question: [null],
      beginDate: [null],  
      endDate: [null],
      clarification: [null],
      evaluationQuestionID: [null]
    })
  }

  formActions(source: any) {
    if (this.evalAllowedGroupsForm.valid) {
      source.evaluationAllowedGroup = !isNullOrUndefined(source.evaluationAllowedGroup) ? source.evaluationAllowedGroup.evaluationAllowedGroup : null;
      !isNullOrUndefined(source.evaluationAllowedGroupID) ? this.update(source) : this.save(source);
    } else {
      swal('Warning', 'Mandatory fields are missing', 'info');
    }
  }


  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveEvaluationType(source).then((data) => {
      loader.style.display = 'none';
      swal('Save', 'Evaluation Allowed Group created!', 'success');
      this._router.navigate(['/reports/set-evaluation-allowed-groups/view'])
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateEvaluationType(source).then((data) => {
      loader.style.display = 'none';
      swal('Update', 'Evaluation Allowed Group updated!', 'success');
      this._router.navigate(['/reports/set-evaluation-allowed-groups/view'])
    })
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { evaluationAllowedGroupID: this._client.getId() }
   this._opencard.getEvaluationTypeByID(req).then((data) => {
      loader.style.display = 'none';
      this.evaluationAllowedGroups = data.EvaluationAllowedGroups;
      this.isEdit = true;
      this.evalAllowedGroupsForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.EvaluationAllowedGroups.changedBy) ? data.EvaluationAllowedGroups.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.EvaluationAllowedGroups.changedDate) ? moment(data.EvaluationAllowedGroups.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.EvaluationAllowedGroups.enteredBy) ? data.EvaluationAllowedGroups.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.EvaluationAllowedGroups.enteredDate) ? moment(data.EvaluationAllowedGroups.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.evalAllowedGroupsForm.enable();
    this.isEdit = false
  }


}


