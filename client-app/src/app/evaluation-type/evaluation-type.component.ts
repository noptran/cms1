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
import { EvaluationType } from './evaluation-type';

@Component({
  selector: 'app-evaluation-type',
  templateUrl: './evaluation-type.component.html',
  styleUrls: ['./evaluation-type.component.scss']
})
export class EvaluationTypeComponent implements OnInit {
  evaluationType: EvaluationType = new EvaluationType();
  evaluationTypeForm: FormGroup;
  personName = 'Evaluation Type';
  tableArray = 'evaluationTypelist';
  navigateTo = '/reports/evaluation-type/detail';
  addLink = '/reports/evaluation-type/new';
  columnToSorted = 'evaluationTypeID';
  isEditForm = false;
  isEditMode = false;
  infoText: string;
  breadcrumbs = [];
  discardTo = '/reports/evaluation-type/view';
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  evaluationTypeList = [];
  metaData = [];
  results;
  req: any;

  status: any;
  formStatus: any;
  subtitle: any;
  title: any;
  changedBy: any;
  enteredBy: any;
  quickMenu: any;


  constructor(public _fb: FormBuilder, public _caseTeam: CaseTeamService, public _client: ClildFormService, public _opencard: OpencardsService, public _router: Router) { }


  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: "/reports/person/types", active: '' },
      { label: 'Evaluation Type List', href: "/reports/evaluation-type/view", active: '' },
      { label: 'Evaluation Type Form', href: "/reports/evaluation-type/detail", active:'' }
    )
    if (this._router.url == '/reports/evaluation-type/detail') { 
      this.isEditMode = true;
      this.getRecById();
     }
  }
  formActions(source: any) {
    if (this.evaluationTypeForm.valid) {
      source.evaluationTypeID = !isNullOrUndefined(source.evaluationTypeID) ? source.evaluationTypeID.evaluationTypeID : null;
      !isNullOrUndefined(source.evaluationTypeID) ? this.update(source) : this.save(source);
    } else {
      swal('Warning', 'Mandatory fields are missing', 'info');
    }
  }
  formValidation() {
    this.evaluationTypeForm = this._fb.group({
      evaluationTypeID: [null, Validators.compose([Validators.required])],
      evaluationType: [null],
      isOOH: [null],
      isInHome: [null],  
      isOOH_OK: [null],
      isProvider_OK: [null],
      isPRTF: [null],
      enteredDate: [null],  
      changedDate: [null],
      changedBy: [null],
    })
  }
  save(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveEvaluationType(source).then((data) => {
    loader.style.display = 'none';
    swal('Save', 'Evaluation Type created!', 'success');
    this._router.navigate(['/reports/evaluation-type/view'])
    })
  }

  update(source: any) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateEvaluationType(source).then((data) => {
      loader.style.display = 'none';
      swal('Update', 'Evaluation Type updated!', 'success');
      this.isEditForm = true;
      this.evaluationTypeForm.disable();
      this._router.navigate(['/reports/evaluation-type/view'])
    })
  }

  getRecById() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { evaluationTypeID: this._client.getId() }
   this._opencard.getEvaluationTypeByID(req).then((data) => {
      loader.style.display = 'none';
      this.evaluationType = data.evaluationType;
      this.isEditForm = true;
      this.evaluationTypeForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.EvaluationType.changedBy) ? data.EvaluationType.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.EvaluationType.changedDate) ? moment(data.EvaluationType.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.EvaluationType.enteredBy) ? data.EvaluationType.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.EvaluationType.enteredDate) ? moment(data.EvaluationType.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }
  
  editForm() {
    this.evaluationTypeForm.enable();
    this.isEditForm = false;
  }

  getMetaData(event, type) {
    // getMetaData
  }

  onDelete(event) {
    // onDelete
  }

}

