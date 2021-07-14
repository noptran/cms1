import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { KinPlacementSupp } from './kin-placement-supp';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-placement-support-plan',
  templateUrl: './placement-support-plan.component.html',
  styleUrls: ['./placement-support-plan.component.scss', '../../family-preservation/family-preservation.scss']
})
export class PlacementSupportPlanComponent implements OnInit {
  placementSupportPlanForm: FormGroup;
  kinPlacementSupportPlan: KinPlacementSupp = new KinPlacementSupp();
  isEdit = false;
  isPrint = true;

  @Output()
  ifaFormOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf, public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/referral/kinship/placement/support/plan/detail') { this.getDetails(); }

  }

  editForm() {
    this.isEdit = false;
    this.placementSupportPlanForm.enable();
  }

  saveForm(source) {
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.DateOfPlacement) ? source.DateOfPlacement = Date.parse(source.DateOfPlacement) : null;

    !isNullOrUndefined(source.Day) ? source.Day = Date.parse(source.Day) : null;
    !isNullOrUndefined(source.Day1) ? source.Day1 = Date.parse(source.Day1) : null;
    !isNullOrUndefined(source.Day2) ? source.Day2 = Date.parse(source.Day2) : null;
    !isNullOrUndefined(source.Day3) ? source.Day3 = Date.parse(source.Day3) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.ifaFormOut.emit({ prForm: source })
  }

  formValidation() {
    this.placementSupportPlanForm = this._fb.group({
      ClientName: [null],
      Dob: [null],
      Facts: [null],
      DateOfPlacement: [null],
      KinshipFamily: [null],
      Phone: [null],
      KinshipWorker: [null],
      Phone1: [null],
      KinshipSupervisor: [null],
      Phone2: [null],
      PermanencyStaff: [null],
      Phone3: [null],
      FamilySupportWorker: [null],
      Phone4: [null],
      Supervisor: [null],
      Phone5: [null],

      Medications: [null],
      DailyRoutines: [null],
      Assist: [null],
      ImmediateAssessment: [null],
      IsSponsoringAgency: [null],
      PositiveReinforcers: [null],

      NaturalResources: [null],

      AppointmentType: [null],
      Child: [null],
      Day: [null],
      Location: [null],

      AppointmentType1: [null],
      Child1: [null],
      Day1: [null],
      Location1: [null],

      AppointmentType2: [null],
      Child2: [null],
      Day2: [null],
      Location2: [null],

      AppointmentType3: [null],
      Child3: [null],
      Day3: [null],
      Location3: [null],
      ////////////////////////////////////////////////////////

      ChildCarePlans: [null],
      DaycareOutings: [null],

      MethodOfCommunication: [null],
      ContactPhoneNumber: [null],
      RelevantInformation: [null],
    });
  }

  getDetails() {
    setTimeout(() => {
      let formData;
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      //     let assessmentId = localStorage.getItem('asssessmentId');
      //     let req = { assessmentID: assessmentId }
      //     this._opencard.getAssessmentRec(req).then((data) => {
      //       formData = data.pdfForms.pdfForms;
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      // !isNullOrUndefined(formData.DateOfPlacement) ? formData.DateOfPlacement = new Date(formData.DateOfPlacement) : null;

      // !isNullOrUndefined(formData.Day) ? formData.Day = new Date(formData.Day) : null;
      // !isNullOrUndefined(formData.Day1) ? formData.Day1 = new Date(formData.Day1) : null;
      // !isNullOrUndefined(formData.Day2) ? formData.Day2 = new Date(formData.Day2) : null;
      // !isNullOrUndefined(formData.Day3) ? formData.Day3 = new Date(formData.Day3) : null;
      //  this.kinPlacementSupportPlan = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.placementSupportPlanForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
