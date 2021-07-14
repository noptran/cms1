import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { AdopSiblingSplitReq } from './adop-sibling-split-req';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
@Component({
  selector: 'app-sibling-split-request',
  templateUrl: './sibling-split-request.component.html',
  styleUrls: ['./sibling-split-request.component.scss', '../../family-preservation/family-preservation.scss']
})
export class SiblingSplitRequestComponent implements OnInit {
  siblingSplitRequestForm: FormGroup;
  adopSiblingSplitRequest: AdopSiblingSplitReq = new AdopSiblingSplitReq();
  isEdit = false;

  @Output()
  ifaFormOut = new EventEmitter()
  constructor(public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/referral/adoption/sibling/split/request/plan/detail') { this.getDetails(); }

  }

  editForm() {
    this.isEdit = false;
    this.siblingSplitRequestForm.enable();
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.DateOfReview) ? source.DateOfReview = Date.parse(source.DateOfReview) : null;
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.ReferralDate) ? source.ReferralDate = Date.parse(source.ReferralDate) : null;
    !isNullOrUndefined(source.Dob1) ? source.Dob1 = Date.parse(source.Dob1) : null;
    !isNullOrUndefined(source.ReferralDate1) ? source.ReferralDate1 = Date.parse(source.ReferralDate1) : null;
    !isNullOrUndefined(source.Dob2) ? source.Dob2 = Date.parse(source.Dob2) : null;
    !isNullOrUndefined(source.ReferralDate2) ? source.ReferralDate2 = Date.parse(source.ReferralDate2) : null;
    !isNullOrUndefined(source.Dob3) ? source.Dob3 = Date.parse(source.Dob3) : null;
    !isNullOrUndefined(source.ReferralDate3) ? source.ReferralDate3 = Date.parse(source.ReferralDate3) : null;
    !isNullOrUndefined(source.Dob4) ? source.Dob4 = Date.parse(source.Dob4) : null;
    !isNullOrUndefined(source.ReferralDate4) ? source.ReferralDate4 = Date.parse(source.ReferralDate4) : null;
    !isNullOrUndefined(source.Dob5) ? source.Dob5 = Date.parse(source.Dob5) : null;
    !isNullOrUndefined(source.ReferralDate5) ? source.ReferralDate5 = Date.parse(source.ReferralDate5) : null;

    !isNullOrUndefined(source.DateOfPrt) ? source.DateOfPrt = Date.parse(source.DateOfPrt) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    !isNullOrUndefined(source.Date1) ? source.Date1 = Date.parse(source.Date1) : null;
    !isNullOrUndefined(source.Date2) ? source.Date2 = Date.parse(source.Date2) : null;
    !isNullOrUndefined(source.Date3) ? source.Date3 = Date.parse(source.Date3) : null;
    !isNullOrUndefined(source.Date4) ? source.Date4 = Date.parse(source.Date4) : null;
    !isNullOrUndefined(source.Date5) ? source.Date5 = Date.parse(source.Date5) : null;
    !isNullOrUndefined(source.Date6) ? source.Date6 = Date.parse(source.Date6) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.ifaFormOut.emit({ prForm: source })
  }


  formValidation() {
    this.siblingSplitRequestForm = this._fb.group({
      DateOfReview: [null],
      FactsCase: [null],
      AssignedDcfStaff: [null],

      Siblings: [null],
      Dob: [null],
      ReferralDate: [null],
      CurrentPlacement: [null],

      Siblings1: [null],
      Dob1: [null],
      ReferralDate1: [null],
      CurrentPlacement1: [null],

      Siblings2: [null],
      Dob2: [null],
      ReferralDate2: [null],
      CurrentPlacement2: [null],

      Siblings3: [null],
      Dob3: [null],
      ReferralDate3: [null],
      CurrentPlacement3: [null],

      Siblings4: [null],
      Dob4: [null],
      ReferralDate4: [null],
      CurrentPlacement4: [null],

      Siblings5: [null],
      Dob5: [null],
      ReferralDate5: [null],
      CurrentPlacement5: [null],

      ParentsNames: [null],
      DateOfPrt: [null],


      ReasonForRemoval: [null],
      PlacementHistory: [null],
      BestInterest: [null],
      Interventions: [null],
      ImpactOfSiblings: [null],
      TherapeuticInput: [null],
      RecruitmentEfforts: [null],
      ResourceForSibling: [null],
      PlansContinuedContact: [null],

      CaseManagerSignature: [null],
      Date: [null],

      CaseCaseTeamSupervisor: [null],
      Date5: [null],

      Recommendations: [null],

      Name: [null],
      Date6: [null],

      Name1: [null],
      Date1: [null],

      Name2: [null],
      Date2: [null],

      Name3: [null],
      Date3: [null],

      Name4: [null],
      Date4: [null],
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
      // !isNullOrUndefined(formData.TodayDate) ? formData.TodayDate = new Date(formData.TodayDate) : null;
      // !isNullOrUndefined(formData.DateForwarded) ? formData.DateForwarded = new Date(formData.DateForwarded) : null;
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      // !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      // !isNullOrUndefined(formData.DateOfReview) ? formData.DateOfReview = new Date(formData.DateOfReview) : null;
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      // !isNullOrUndefined(formData.ReferralDate) ? formData.ReferralDate = new Date(formData.ReferralDate) : null;
      // !isNullOrUndefined(formData.Dob1) ? formData.Dob1 = new Date(formData.Dob1) : null;
      // !isNullOrUndefined(formData.ReferralDate1) ? formData.ReferralDate1 = new Date(formData.ReferralDate1) : null;
      // !isNullOrUndefined(formData.Dob2) ? formData.Dob2 = new Date(formData.Dob2) : null;
      // !isNullOrUndefined(formData.ReferralDate2) ? formData.ReferralDate2 = new Date(formData.ReferralDate2) : null;
      // !isNullOrUndefined(formData.Dob3) ? formData.Dob3 = new Date(formData.Dob3) : null;
      // !isNullOrUndefined(formData.ReferralDate3) ? formData.ReferralDate3 = new Date(formData.ReferralDate3) : null;
      // !isNullOrUndefined(formData.Dob4) ? formData.Dob4 = new Date(formData.Dob4) : null;
      // !isNullOrUndefined(formData.ReferralDate4) ? formData.ReferralDate4 = new Date(formData.ReferralDate4) : null;
      // !isNullOrUndefined(formData.Dob5) ? formData.Dob5 = new Date(formData.Dob5) : null;
      // !isNullOrUndefined(formData.ReferralDate5) ? formData.ReferralDate5 = new Date(formData.ReferralDate5) : null;

      // !isNullOrUndefined(formData.DateOfPrt) ? formData.DateOfPrt = new Date(formData.DateOfPrt) : null;
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
      // !isNullOrUndefined(formData.Date1) ? formData.Date1 = new Date(formData.Date1) : null;
      // !isNullOrUndefined(formData.Date2) ? formData.Date2 = new Date(formData.Date2) : null;
      // !isNullOrUndefined(formData.Date3) ? formData.Date3 = new Date(formData.Date3) : null;
      // !isNullOrUndefined(formData.Date4) ? formData.Date4 = new Date(formData.Date4) : null;
      // !isNullOrUndefined(formData.Date5) ? formData.Date5 = new Date(formData.Date5) : null;
      // !isNullOrUndefined(formData.Date6) ? formData.Date6 = new Date(formData.Date6) : null;
      //  this.adopSiblingSplitRequest = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.siblingSplitRequestForm.disable();
      //     })
    }, 5000)
  }


}
