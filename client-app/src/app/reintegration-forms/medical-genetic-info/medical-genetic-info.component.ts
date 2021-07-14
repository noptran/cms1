import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReMedGeneticInfo } from './re-med-genetic-info';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-medical-genetic-info',
  templateUrl: './medical-genetic-info.component.html',
  styleUrls: ['./medical-genetic-info.component.scss','../../family-preservation/family-preservation.scss'],
  outputs: ['medGenInfOut']
})
export class MedicalGeneticInfoComponent implements OnInit {

  medicalGeneticInfoForm: FormGroup;
  reMedicalGeneticInfo: ReMedGeneticInfo = new ReMedGeneticInfo();
  isEdit= false;
  editControll = true;
  isPrint = true;
  printedBy: any;
  printedDate: any;
  @Output()
  medGenInfOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }

  ngOnInit() {
   
    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/medical/genetic/info/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.medicalGeneticInfoForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reMedicalGeneticInfo = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DateOfBirth) ? formData.DateOfBirth = new Date(formData.DateOfBirth) : null;
    !isNullOrUndefined(formData.TimeOfBirth) ? formData.TimeOfBirth = new Date(formData.TimeOfBirth) : null;
    !isNullOrUndefined(formData.DateOfBirth1) ? formData.DateOfBirth1 = new Date(formData.DateOfBirth1) : null;
    !isNullOrUndefined(formData.InformationDate) ? formData.InformationDate = new Date(formData.InformationDate) : null;
    !isNullOrUndefined(formData.DateOfBirth21) ? formData.DateOfBirth21 = new Date(formData.DDateOfBirth21ob) : null;
    !isNullOrUndefined(formData.InformationDate2) ? formData.InformationDate2 = new Date(formData.InformationDate2) : null;
    !isNullOrUndefined(formData.DatesIllnesses) ? formData.DatesIllnesses = new Date(formData.DatesIllnesses) : null;
    this.reMedicalGeneticInfo = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reMedicalGeneticInfo.Name = data.person.firstName + " " + data.person.lastName;
        this.reMedicalGeneticInfo.DateOfBirth = new Date(data.person.dob);
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);

      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }


  editForm() {
    this.medicalGeneticInfoForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {
    !isNullOrUndefined(source.DateOfBirth) ? source.DateOfBirth = Date.parse(source.DateOfBirth) : null;
    !isNullOrUndefined(source.TimeOfBirth) ? source.TimeOfBirth = Date.parse(source.TimeOfBirth) : null;
    !isNullOrUndefined(source.DateOfBirth1) ? source.DateOfBirth1 = Date.parse(source.DateOfBirth1) : null;
    !isNullOrUndefined(source.InformationDate) ? source.InformationDate = Date.parse(source.InformationDate) : null;
    !isNullOrUndefined(source.DateOfBirth21) ? source.DateOfBirth21 = Date.parse(source.DDateOfBirth21ob) : null;
    !isNullOrUndefined(source.InformationDate2) ? source.InformationDate2 = Date.parse(source.InformationDate2) : null;
    !isNullOrUndefined(source.DatesIllnesses) ? source.DatesIllnesses = Date.parse(source.DatesIllnesses) : null;
    
    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.medGenInfOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.medGenInfOut.emit({ cmsData: {} });
  }
  
  formValidation() {
    this.medicalGeneticInfoForm = this._fb.group({
      Name:[null],
      DateOfBirth:[null],
      SocialSecurity:[null],
      Birthplace:[null],
      TimeOfBirth:[null],
      ApgarScore:[null],
      ApgarScore1:[null],
      Premature:[null],
      WeightAtBirth:[null],
      LengthAtBirth:[null],
      TypeOfDelivery:[null],
      DurationOfLabor:[null],
      BreastFed:[null],
      Formula:[null],
      NameAddress:[null],
      ComplicationsOfBirth:[null],
      MedicationsGiven:[null],
      BirthDefects:[null],
      ImmunizationHistory:[null],
      DatesIllnesses:[null],
      DevelopmentProblems:[null],
      ChronicHealth:[null],
      BehaviorProblems:[null],
      LearningDisabilities:[null],
      NativeAmericanTribe:[null],
      NameOfTribe:[null],
  
      isAllergies:[false],
      isDownSyndrome:[false],
      GrowthProblems:[null],
      isSickleCellAnemia:[false],
      isAnemia:[false],
      isDrugUsage:[false],
      isAids:[false],
      isSpinaBifida:[false],
      isBulimia:[false],
      isEpilepsy:[false],
      isKidneyCondition:[false],
      isVisionCondition:[false],
      isCancer:[false],
      isDeaf:[false],
      isMentalRetardation:[false],
      isMentalRetardationOther:[false],
      isCongenitalAbnormality:[false],
      isHeartCondition:[false],
      isMuscularCondition:[false],
      isMuscularConditionOther:[false],
      isDiabetes:[false],
      isHepatitis:[false],
      isOrthopedicCondition:[false],
      isOrthopedicConditionOther:[false],
  
      TurnedOverAge:[null],
      StoodAge:[null],
      ToiletTrainedAge:[null],
      SatAloneAge:[null],
      WalkedAge:[null],
      UsedWordsAge:[null],
      CrawledAge:[null],
      FedSelfAge:[null],
  
      Name1:[null],
      DateOfBirth1:[null],
      Birthplace1:[null],
      Address:[null],
      SocialSecurity1:[null],
      Medications:[null],
      Complications:[null],
      Height:[null],
      Weight:[null],
      EyeColor:[null],
      HairColor:[null],
      SkinColor:[null],
      Surgery:[null],
  
      IsMotherAlcoholism:[false],
      IsMotherfamAlcoholism:[false],
  
      IsMotherAids:[false],
      IsMotherfamAids:[false],
  
      IsMotherAsthma:[false],
      IsMotherfamAsthma:[false],
  
      IsMotherKidney:[false],
      IsMotherfamKidney:[false],
  
      IsMotherBipolar:[false],
      IsMotherfamBipolar:[false],
  
      IsMotherMental:[false],
      IsMotherfamMental:[false],
  
      IsMotherCancer:[false],
      IsMotherfamCancer:[false],
  
      IsMotherMuscular:[false],
      IsMotherfamMuscular:[false],
  
      IsMotherAbnormality:[false],
      IsMotherfamAbnormality:[false],
  
      IsMotherMentalIllness:[false],
      IsMotherfamMentalIllness:[false],
  
      IsMotherDiabetes:[false],
      IsMotherfamDiabetes:[false],
  
      IsMotherSchizophrenia:[false],
      IsMotherfamSchizophrenia:[false],
  
      IsMotherDownSyndrome:[false],
      IsMotherfamDownSyndrome:[false],
  
      IsMotherSickleAnemia:[false],
      IsMotherfamSickleAnemia:[false],
  
      IsMotherDrug:[false],
      IsMotherfamDrug:[false],
  
      IsMotherTransmittedDisease:[false],
      IsMotherfamTransmittedDisease:[false],
  
      IsMotherEpilepsy:[false],
      IsMotherfamEpilepsy:[false],
  
      IsMotherSpinaBifida:[false],
      IsMotherfamSpinaBifida:[false],
  
      IsMotherDeaf:[false],
      IsMotherfamDeaf:[false],
  
      IsMotherBlind:[false],
      IsMotherfamBlind:[false],
  
      IsMotherHeart:[false],
      IsMotherfamHeart:[false],
  
      IsMotherHeartOther:[false],
      IsMotherfamHeartOther:[false],
  
      IsMotherHepatitis:[false],
      IsMotherfamHepatitis:[false],
  
      IsMotherHepatitisOther:[false],
      IsMotherfamHepatitisOther:[false],
  
      Nationalit:[null],
      TribalAffiliation:[null],
      Religion:[null],
      EmploymentHistory:[null],
      InformationDate:[null],
      InformationSigned:[null],
      //////////////
      Name21:[null],
      DateOfBirth21:[null],
      Birthplace21:[null],
      Address2:[null],
      SocialSecurity21:[null],
      Medications2:[null],
      Complications2:[null],
      Height2:[null],
      Weight2:[null],
      EyeColor2:[null],
      HairColor2:[null],
      SkinColor2:[null],
      Surgery2:[null],
  
  
  
      IsFatherAids:[false],
      IsFatherfamAids:[false],
  
      IsFatherAsthma:[false],
      IsFatherfamAsthma:[false],
  
      IsFatherKidney:[false],
      IsFatherfamKidney:[false],
  
      IsFatherBipolar:[false],
      IsFatherfamBipolar:[false],
  
      IsFatherMental:[false],
      IsFatherfamMental:[false],
  
      IsFatherCancer:[false],
      IsFatherfamCancer:[false],
  
      IsFatherMuscular:[false],
      IsFatherfamMuscular:[false],
  
      IsFatherAbnormality:[false],
      IsFatherfamAbnormality:[false],
  
      IsFatherMentalIllness:[false],
      IsFatherfamMentalIllness:[false],
  
      IsFatherDiabetes:[false],
      IsFatherfamDiabetes:[false],
  
      IsFatherSchizophrenia:[false],
      IsFatherfamSchizophrenia:[false],
  
      IsFatherDownSyndrome:[false],
      IsFatherfamDownSyndrome:[false],
  
      IsFatherSickleAnemia:[false],
      IsFatherfamSickleAnemia:[false],
  
      IsFatherDrug:[false],
      IsFatherfamDrug:[false],
  
      IsFatherTransmittedDisease:[false],
      IsFatherfamTransmittedDisease:[false],
  
      IsFatherEpilepsy:[false],
      IsFatherfamEpilepsy:[false],
  
      IsFatherSpinaBifida:[false],
      IsFatherfamSpinaBifida:[false],
  
      IsFatherDeaf:[false],
      IsFatherfamDeaf:[false],
  
      IsFatherBlind:[false],
      IsFatherfamBlind:[false],
  
      IsFatherHeart:[false],
      IsFatherfamHeart:[false],
  
      IsFatherHeartOther:[false],
      IsFatherfamHeartOther:[false],
  
      IsFatherHepatitis:[false],
      IsFatherfamHepatitis:[false],
  
      IsFatherHepatitisOther:[false],
      IsFatherfamHepatitisOther:[false],
  
      Nationalit2:[null],
      TribalAffiliation2:[null],
      Religion2:[null],
      EmploymentHistory2:[null],
      InformationDate2:[null],
      InformationSigned2:[null],
      IsFatherAlcoholism:[false],
      IsFatherfamAlcoholism:[false],
      printedBy: [null],
      printedDate: [null],     

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
      
      //  !isNullOrUndefined(formData.DateOfBirth) ? formData.DateOfBirth = new Date(formData.DateOfBirth) : null;
      //  !isNullOrUndefined(formData.TimeOfBirth) ? formData.TimeOfBirth = new Date(formData.TimeOfBirth) : null;
      //  !isNullOrUndefined(formData.DateOfBirth1) ? formData.DateOfBirth1 = new Date(formData.DateOfBirth1) : null;
      //  !isNullOrUndefined(formData.InformationDate) ? formData.InformationDate = new Date(formData.InformationDate) : null;
      //  !isNullOrUndefined(formData.DateOfBirth21) ? formData.DateOfBirth21 = new Date(formData.DDateOfBirth21ob) : null;
      //  !isNullOrUndefined(formData.InformationDate2) ? formData.InformationDate2 = new Date(formData.InformationDate2) : null;
      //  !isNullOrUndefined(formData.DatesIllnesses) ? formData.DatesIllnesses = new Date(formData.DatesIllnesses) : null;
      
      //  this.reMedicalGeneticInfo = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.medicalGeneticInfoForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
  
}
