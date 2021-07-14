import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReintDisabilityConsul } from './reint-disability-consul';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../team-form/team-form.service';
@Component({
  selector: 'app-disability-consulatation-referral-form',
  templateUrl: './disability-consulatation-referral-form.component.html',
  styleUrls: ['./disability-consulatation-referral-form.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['disablConsOut']
})
export class DisabilityConsulatationReferralFormComponent implements OnInit {
  DisabilityConsulatationForm: FormGroup;
  reintDisabilityConsulatation: ReintDisabilityConsul = new ReintDisabilityConsul();
  isEdit = false;
  editControll = true;
  @Output()
  disablConsOut = new EventEmitter()
  constructor(public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {
   
    this.formValidation();
    if (this._router.url == '/reports/referral/reintegration/disability/consultation/referral/form/detail') { this.getDetails(); }
    this.DisabilityConsulatationForm.disable();
  }

  editForm() {
    this.DisabilityConsulatationForm.enable();
    this.editControll = false;
  }

  saveForm(source) {
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;
    !isNullOrUndefined(source.DateReferredToKls) ? source.DateReferredToKls = Date.parse(source.DateReferredToKls) : null;
    !isNullOrUndefined(source.SsiApplicationDate) ? source.SsiApplicationDate = Date.parse(source.SsiApplicationDate) : null;
    !isNullOrUndefined(source.ReleaseInformationDate) ? source.ReleaseInformationDate = Date.parse(source.ReleaseInformationDate) : null;
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.disablConsOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.disablConsOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.DisabilityConsulatationForm = this._fb.group({

      IsAdult: [false],
      IsChild: [false],
      ChildName: [null],
      DcfCaseNumber: [null],
      Ssn: [null],
      StreetAddress: [null],
      CityState: [null],
      Zip: [null],
      Telephone: [null],
      Dob: [null],
      Gender: [null],
      CountyOfResidence: [null],
      Telephone2: [null],
      MailingAddress: [null],
      NameTitle: [null],
      Agency: [null],
      Telephone1: [null],
      EMailAddress: [null],
      DateReferredToKls: [null],
      IsMedicalAttachedYes: [false],
      IsMedicalAttachedNo: [false],
      /////////////////////////
      IsGa: [false],
      IsTanf: [false],
      IsCinc: [false],
      IsFamPres: [false],
      IsFamServ: [false],
      IsEmergShelter: [false],
      IsOther: [false],

      IsCommunicating: [false],
      IsFeeding: [false],
      IsPlaying: [false],
      IsWithTurning: [false],
      IsUnderstandingSpeech: [false],
      IsWalking: [false],
      IsWithHeadControl: [false],
      IsWashing: [false],
      IsSocializing: [false],
      IsUsingTheBathroom: [false],
      IsGoingToSchool: [false],
      IsWithSchoolPerformance: [false],
      IsSpeaking: [false],
      IsCrawling: [false],
      IsOther1: [false],
      IsSwallowing: [false],
      IsEating: [false],
      IsDressing: [false],
      IsPayingAttention: [false],

      ///////
      Explain: [null],
      ////////

      IsSpecialEducationYes: [false],
      IsSpecialEducationNo: [false],
      IsNeedsSchoolYes: [false],
      IsNeedsSchoolNo: [false],
      IsSsiApplicationYes: [false],
      IsSsiApplicationNo: [false],

      ////////
      SsiApplicationDate: [null],
      Results: [null],
      /////////////
      IsAreParentalRightsSeveredYes: [false],
      IsAreParentalRightsSeveredNo: [false],
      IsChildAbuseYes: [false],
      IsChildAbuseNo: [false],

      ReleaseInformationDate: [null],
      PersonName: [null],


      Signature: [null],
      Date: [null],


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
      // !isNullOrUndefined(formData.DateReferredToKls) ? formData.DateReferredToKls = new Date(formData.DateReferredToKls) : null;
      // !isNullOrUndefined(formData.SsiApplicationDate) ? formData.SsiApplicationDate = new Date(formData.SsiApplicationDate) : null;
      // !isNullOrUndefined(formData.ReleaseInformationDate) ? formData.ReleaseInformationDate = new Date(formData.ReleaseInformationDate) : null;
      // !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;

      //  this.reintDisabilityConsulatation = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.DisabilityConsulatationForm.disable();
      //     })
    }, 5000)
  }

}
