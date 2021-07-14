import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation-scale',
  templateUrl: './evaluation-scale.component.html',
  styleUrls: ['./evaluation-scale.component.scss']
})
export class EvaluationScaleComponent implements OnInit {

  breadcrumbs: any;
  versionCreationForm: any;
  evaluationScale: any;
  versionCreation: any;
  discardTo: any;
  formLogInfo: any;
  isFormLog: any;
  isEdit: any;

  constructor() { }

  ngOnInit() {
  }

  formActions(evaluationScale) {
    // formActions
  }

  editForm() {
    // editForm
  }

}
