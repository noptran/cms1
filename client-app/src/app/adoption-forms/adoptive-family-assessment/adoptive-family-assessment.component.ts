import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { AdopFamilyAssemnt } from './adop-family-assemnt';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
@Component({
  selector: 'app-adoptive-family-assessment',
  templateUrl: './adoptive-family-assessment.component.html',
  styleUrls: ['./adoptive-family-assessment.component.scss', '../../family-preservation/family-preservation.scss']
})
export class AdoptiveFamilyAssessmentComponent implements OnInit {
  adoptiveFamilyAssessmentForm: FormGroup;
  adopFamilyAssessment: AdopFamilyAssemnt = new AdopFamilyAssemnt();
  isEdit = false;

  @Output()
  ifaFormOut = new EventEmitter()
  constructor(public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/referral/adoption/adoptive/family/assessment/detail') { this.getDetails(); }

  }

  editForm() {
    this.isEdit = false;
    this.adoptiveFamilyAssessmentForm.enable();
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;
    !isNullOrUndefined(source.Date2) ? source.Date2 = Date.parse(source.Date2) : null;
    !isNullOrUndefined(source.Date3) ? source.Date3 = Date.parse(source.Date3) : null;
    !isNullOrUndefined(source.DatesOfHomeVisits) ? source.DatesOfHomeVisits = Date.parse(source.DatesOfHomeVisits) : null;
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.Dob1) ? source.Dob1 = Date.parse(source.Dob1) : null;
    !isNullOrUndefined(source.Dob3) ? source.Dob3 = Date.parse(source.Dob3) : null;
    !isNullOrUndefined(source.Dob2) ? source.Dob2 = Date.parse(source.Dob2) : null;
    !isNullOrUndefined(source.Dob4) ? source.Dob4 = Date.parse(source.Dob4) : null;
    !isNullOrUndefined(source.Date4) ? source.Date4 = Date.parse(source.Date4) : null;
    !isNullOrUndefined(source.Date5) ? source.Date5 = Date.parse(source.Date5) : null;
    !isNullOrUndefined(source.Date6) ? source.Date6 = Date.parse(source.Date6) : null;
    !isNullOrUndefined(source.Date7) ? source.Date7 = Date.parse(source.Date7) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.ifaFormOut.emit({ prForm: source })
  }



  formValidation() {
    this.adoptiveFamilyAssessmentForm = this._fb.group({

      Agency: [null],
      Assessor: [null],
      Phone: [null],
      EmailAddress: [null],
      Date: [null],

      UpdatedBy: [null],
      Date1: [null],
      UpdatedBy1: [null],
      Date2: [null],
      UpdatedBy2: [null],
      Date3: [null],

      DatesOfHomeVisits: [null],

      NameOfParent1: [null],
      EmailAddress1: [null],
      CellPhone1: [null],

      NameOfParent2: [null],
      EmailAddress2: [null],
      CellPhone2: [null],

      StreetAddress: [null],
      City: [null],
      HomePhone: [null],
      Fax: [null],

      Language: [null],

      Name: [null],
      Relationship: [null],
      Dob: [null],
      Ssn: [null],
      Race: [null],
      FullPartTime: [null],

      Name1: [null],
      Relationship1: [null],
      Dob1: [null],
      Ssn1: [null],
      Race1: [null],
      FullPartTime1: [null],

      Name2: [null],
      Relationship2: [null],
      Dob2: [null],
      Ssn2: [null],
      Race2: [null],
      FullPartTime2: [null],

      Name3: [null],
      Relationship3: [null],
      Dob3: [null],
      Ssn3: [null],
      Race3: [null],
      FullPartTime3: [null],

      Name4: [null],
      Relationship4: [null],
      Dob4: [null],
      Ssn4: [null],
      Race4: [null],
      FullPartTime4: [null],
      /////////////////////////////////////////////////

      Comments: [null],

      ParentDeal1: [null],
      ParentDeal2: [null],

      CurrentRelationship: [null],
      ParentingStyles: [null],

      NonParentAdults: [null],

      ChildrenInformation: [null],
      ChildrenInformationPerspective: [null],

      CriminalHistory: [null],
      FamilyFinances: [null],
      FamilyEnvironment: [null],
      Yard: [null],
      Community: [null],
      FamilyInvolvement: [null],

      Transportation: [null],
      MilitaryHistory: [null],
      MotivationToAdopt: [null],

      OpenAdoption: [null],
      LargeFamilyAssessment: [null],
      Summary: [null],

      CaseManagerSignature: [null],
      Date4: [null],

      SupervisorSignature: [null],
      Date5: [null],

      ParentSignature1: [null],
      Date6: [null],

      ParentSignature2: [null],
      Date7: [null],
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

      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      // !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      // !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;
      // !isNullOrUndefined(formData.Date3) ? formData.Date3 = new Date(formData.Date3) : null;
      // !isNullOrUndefined(formData.DatesOfHomeVisits) ? formData.DatesOfHomeVisits = new Date(formData.DatesOfHomeVisits) : null;
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      // !isNullOrUndefined(formData.Dob1) ? formData.Dob1 = new Date(formData.Dob1) : null;
      // !isNullOrUndefined(formData.Dob3) ? formData.Dob3 = new Date(formData.Dob3) : null;
      // !isNullOrUndefined(formData.Dob2) ? formData.Dob2 = new Date(formData.Dob2) : null;
      // !isNullOrUndefined(formData.Dob4) ? formData.Dob4 = new Date(formData.Dob4) : null;
      // !isNullOrUndefined(formData.Date4) ? formData.Date4 = new Date(formData.Date4) : null;
      // !isNullOrUndefined(formData.Date5) ? formData.Date5 = new Date(formData.Date5) : null;
      // !isNullOrUndefined(formData.Date6) ? formData.Date6 = new Date(formData.Date6) : null;
      // !isNullOrUndefined(formData.Date7) ? formData.Date7 = new Date(formData.Date7) : null;
      //  this.adopFamilyAssessment = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.adoptiveFamilyAssessmentForm.disable();
      //     })
    }, 5000)
  }

}
