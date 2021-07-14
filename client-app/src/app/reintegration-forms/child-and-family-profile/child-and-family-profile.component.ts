import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { ReChildFamily } from './re-child-family';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';

import { ClildFormService } from '../../child-forms/child-forms.service';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";

@Component({
  selector: 'app-child-and-family-profile',
  templateUrl: './child-and-family-profile.component.html',
  styleUrls: ['./child-and-family-profile.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['childFamProfOut']
})
export class ChildAndFamilyProfileComponent implements OnInit {
  childAndFamilyForm: FormGroup;
  reChildAndFamily: ReChildFamily = new ReChildFamily();
  editControll = true;
  isEdit = false;
  isPrint = true;

  printedBy: any;
  printedDate: any;
  @Output()
  childFamProfOut = new EventEmitter()

  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router, public _client: ClildFormService, public _referral: ReferralViewService) { }


  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/assessment/detail') {
      this.getCmsFormJson();
    }
    if (this._router.url == '/reports/referral/reintegration/assessments/child/family/profile/detail') { this.getDetails(); }
    this.autoFetchDetails();
    this.childAndFamilyForm.disable();
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.reChildAndFamily = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.DateOfReferral) ? formData.DateOfReferral = new Date(formData.DateOfReferral) : null;
    !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;

    !isNullOrUndefined(formData.CaregiverDob) ? formData.CaregiverDob = new Date(formData.CaregiverDob) : null;
    !isNullOrUndefined(formData.CaregiverDob1) ? formData.CaregiverDob1 = new Date(formData.CaregiverDob1) : null;
    !isNullOrUndefined(formData.CaregiverDob2) ? formData.CaregiverDob2 = new Date(formData.CaregiverDob2) : null;
    !isNullOrUndefined(formData.CaregiverDob3) ? formData.CaregiverDob3 = new Date(formData.CaregiverDob3) : null;

    !isNullOrUndefined(formData.AddDate) ? formData.AddDate = new Date(formData.AddDate) : null;
    !isNullOrUndefined(formData.AddDate1) ? formData.AddDate1 = new Date(formData.AddDate1) : null;
    !isNullOrUndefined(formData.AddDate2) ? formData.AddDate2 = new Date(formData.AddDate2) : null;
    !isNullOrUndefined(formData.AddDate3) ? formData.AddDate3 = new Date(formData.AddDate3) : null;

    !isNullOrUndefined(formData.ImpulsiveDate) ? formData.ImpulsiveDate = new Date(formData.ImpulsiveDate) : null;
    !isNullOrUndefined(formData.ImpulsiveDate1) ? formData.ImpulsiveDate1 = new Date(formData.ImpulsiveDate1) : null;
    !isNullOrUndefined(formData.ImpulsiveDate2) ? formData.ImpulsiveDate2 = new Date(formData.ImpulsiveDate2) : null;
    !isNullOrUndefined(formData.ImpulsiveDate3) ? formData.ImpulsiveDate3 = new Date(formData.ImpulsiveDate3) : null;

    !isNullOrUndefined(formData.PhysicalDate) ? formData.PhysicalDate = new Date(formData.PhysicalDate) : null;
    !isNullOrUndefined(formData.PhysicalDate1) ? formData.PhysicalDate1 = new Date(formData.PhysicalDate1) : null;
    !isNullOrUndefined(formData.PhysicalDate2) ? formData.PhysicalDate2 = new Date(formData.PhysicalDate2) : null;
    !isNullOrUndefined(formData.PhysicalDate3) ? formData.PhysicalDate3 = new Date(formData.PhysicalDate3) : null;

    !isNullOrUndefined(formData.VerbalDate) ? formData.VerbalDate = new Date(formData.VerbalDate) : null;
    !isNullOrUndefined(formData.VerbalDate1) ? formData.VerbalDate1 = new Date(formData.VerbalDate1) : null;
    !isNullOrUndefined(formData.VerbalDate2) ? formData.VerbalDate2 = new Date(formData.VerbalDate2) : null;
    !isNullOrUndefined(formData.VerbalDate3) ? formData.VerbalDate3 = new Date(formData.VerbalDate3) : null;

    !isNullOrUndefined(formData.CriminalDate) ? formData.CriminalDate = new Date(formData.CriminalDate) : null;
    !isNullOrUndefined(formData.CriminalDate1) ? formData.CriminalDate1 = new Date(formData.CriminalDate1) : null;
    !isNullOrUndefined(formData.CriminalDate2) ? formData.CriminalDate2 = new Date(formData.CriminalDate2) : null;
    !isNullOrUndefined(formData.CriminalDate3) ? formData.CriminalDate3 = new Date(formData.CriminalDate3) : null;

    !isNullOrUndefined(formData.AnimalsDate) ? formData.AnimalsDate = new Date(formData.AnimalsDate) : null;
    !isNullOrUndefined(formData.AnimalsDate1) ? formData.AnimalsDate1 = new Date(formData.AnimalsDate1) : null;
    !isNullOrUndefined(formData.AnimalsDate2) ? formData.AnimalsDate2 = new Date(formData.AnimalsDate2) : null;
    !isNullOrUndefined(formData.AnimalsDate3) ? formData.AnimalsDate3 = new Date(formData.AnimalsDate3) : null;

    !isNullOrUndefined(formData.HomeDate) ? formData.HomeDate = new Date(formData.HomeDate) : null;
    !isNullOrUndefined(formData.HomeDate1) ? formData.HomeDate1 = new Date(formData.HomeDate1) : null;
    !isNullOrUndefined(formData.HomeDate2) ? formData.HomeDate2 = new Date(formData.HomeDate2) : null;
    !isNullOrUndefined(formData.HomeDate3) ? formData.HomeDate3 = new Date(formData.HomeDate3) : null;

    !isNullOrUndefined(formData.SchoolDate) ? formData.SchoolDate = new Date(formData.SchoolDate) : null;
    !isNullOrUndefined(formData.SchoolDate1) ? formData.SchoolDate1 = new Date(formData.SchoolDate1) : null;
    !isNullOrUndefined(formData.SchoolDate2) ? formData.SchoolDate2 = new Date(formData.SchoolDate2) : null;
    !isNullOrUndefined(formData.SchoolDate3) ? formData.SchoolDate3 = new Date(formData.SchoolDate3) : null;

    !isNullOrUndefined(formData.FireDate) ? formData.FireDate = new Date(formData.FireDate) : null;
    !isNullOrUndefined(formData.FireDate1) ? formData.FireDate1 = new Date(formData.FireDate1) : null;
    !isNullOrUndefined(formData.FireDate2) ? formData.FireDate2 = new Date(formData.FireDate2) : null;
    !isNullOrUndefined(formData.FireDate3) ? formData.FireDate3 = new Date(formData.FireDate3) : null;

    !isNullOrUndefined(formData.GangDate) ? formData.GangDate = new Date(formData.GangDate) : null;
    !isNullOrUndefined(formData.GangDate1) ? formData.GangDate1 = new Date(formData.GangDate1) : null;
    !isNullOrUndefined(formData.GangDate2) ? formData.GangDate2 = new Date(formData.GangDate2) : null;
    !isNullOrUndefined(formData.GangDate3) ? formData.GangDate3 = new Date(formData.GangDate3) : null;

    !isNullOrUndefined(formData.HygieneDate) ? formData.HygieneDate = new Date(formData.HygieneDate) : null;
    !isNullOrUndefined(formData.HygieneDate1) ? formData.HygieneDate1 = new Date(formData.HygieneDate1) : null;
    !isNullOrUndefined(formData.HygieneDate2) ? formData.HygieneDate2 = new Date(formData.HygieneDate2) : null;
    !isNullOrUndefined(formData.HygieneDate3) ? formData.HygieneDate3 = new Date(formData.HygieneDate3) : null;

    !isNullOrUndefined(formData.DishonestDate) ? formData.DishonestDate = new Date(formData.DishonestDate) : null;
    !isNullOrUndefined(formData.DishonestDate1) ? formData.DishonestDate1 = new Date(formData.DishonestDate1) : null;
    !isNullOrUndefined(formData.DishonestDate2) ? formData.DishonestDate2 = new Date(formData.DishonestDate2) : null;
    !isNullOrUndefined(formData.DishonestDate3) ? formData.DishonestDate3 = new Date(formData.DishonestDate3) : null;

    !isNullOrUndefined(formData.OppositionalDate) ? formData.OppositionalDate = new Date(formData.OppositionalDate) : null;
    !isNullOrUndefined(formData.OppositionalDate1) ? formData.OppositionalDate1 = new Date(formData.OppositionalDate1) : null;
    !isNullOrUndefined(formData.OppositionalDate2) ? formData.OppositionalDate2 = new Date(formData.OppositionalDate2) : null;
    !isNullOrUndefined(formData.OppositionalDate3) ? formData.OppositionalDate3 = new Date(formData.OppositionalDate3) : null;

    !isNullOrUndefined(formData.ProfanityDate) ? formData.ProfanityDate = new Date(formData.ProfanityDate) : null;
    !isNullOrUndefined(formData.ProfanityDate1) ? formData.ProfanityDate1 = new Date(formData.ProfanityDate1) : null;
    !isNullOrUndefined(formData.ProfanityDate2) ? formData.ProfanityDate2 = new Date(formData.ProfanityDate2) : null;
    !isNullOrUndefined(formData.ProfanityDate3) ? formData.ProfanityDate3 = new Date(formData.ProfanityDate3) : null;

    !isNullOrUndefined(formData.RunnerDate) ? formData.RunnerDate = new Date(formData.RunnerDate) : null;
    !isNullOrUndefined(formData.RunnerDate1) ? formData.RunnerDate1 = new Date(formData.RunnerDate1) : null;
    !isNullOrUndefined(formData.RunnerDate2) ? formData.RunnerDate2 = new Date(formData.RunnerDate2) : null;
    !isNullOrUndefined(formData.RunnerDate3) ? formData.RunnerDate3 = new Date(formData.RunnerDate3) : null;

    !isNullOrUndefined(formData.RunsDate) ? formData.RunsDate = new Date(formData.RunsDate) : null;
    !isNullOrUndefined(formData.RunsDate1) ? formData.RunsDate1 = new Date(formData.RunsDate1) : null;
    !isNullOrUndefined(formData.RunsDate2) ? formData.RunsDate2 = new Date(formData.RunsDate2) : null;
    !isNullOrUndefined(formData.RunsDate3) ? formData.RunsDate3 = new Date(formData.RunsDate3) : null;

    !isNullOrUndefined(formData.TemperDate) ? formData.TemperDate = new Date(formData.TemperDate) : null;
    !isNullOrUndefined(formData.TemperDate1) ? formData.TemperDate1 = new Date(formData.TemperDate1) : null;
    !isNullOrUndefined(formData.TemperDate2) ? formData.TemperDate2 = new Date(formData.TemperDate2) : null;
    !isNullOrUndefined(formData.TemperDate3) ? formData.TemperDate3 = new Date(formData.TemperDate3) : null;

    !isNullOrUndefined(formData.TheftDate) ? formData.TheftDate = new Date(formData.TheftDate) : null;
    !isNullOrUndefined(formData.TheftDate1) ? formData.TheftDate1 = new Date(formData.TheftDate1) : null;
    !isNullOrUndefined(formData.TheftDate2) ? formData.TheftDate2 = new Date(formData.TheftDate2) : null;
    !isNullOrUndefined(formData.TheftDate3) ? formData.TheftDate3 = new Date(formData.TheftDate3) : null;

    !isNullOrUndefined(formData.TruancyDate) ? formData.TruancyDate = new Date(formData.TruancyDate) : null;
    !isNullOrUndefined(formData.TruancyDate1) ? formData.TruancyDate1 = new Date(formData.TruancyDate1) : null;
    !isNullOrUndefined(formData.TruancyDate2) ? formData.TruancyDate2 = new Date(formData.TruancyDate2) : null;
    !isNullOrUndefined(formData.TruancyDate3) ? formData.TruancyDate3 = new Date(formData.TruancyDate3) : null;

    !isNullOrUndefined(formData.VandalismDate) ? formData.VandalismDate = new Date(formData.VandalismDate) : null;
    !isNullOrUndefined(formData.VandalismDate1) ? formData.VandalismDate1 = new Date(formData.VandalismDate1) : null;
    !isNullOrUndefined(formData.VandalismDate2) ? formData.VandalismDate2 = new Date(formData.VandalismDate2) : null;
    !isNullOrUndefined(formData.VandalismDate3) ? formData.VandalismDate3 = new Date(formData.VandalismDate3) : null;

    !isNullOrUndefined(formData.DateOfLast) ? formData.DateOfLast = new Date(formData.DateOfLast) : null;
    !isNullOrUndefined(formData.SignatureDate) ? formData.SignatureDate = new Date(formData.SignatureDate) : null;
    !isNullOrUndefined(formData.SupervisorDate) ? formData.SupervisorDate = new Date(formData.SupervisorDate) : null;
    this.reChildAndFamily = formData;
  }
  autoFetchDetails() {
    this._client.getPersonData()
      .then((data) => {
        console.log("data in this._client.getByPersonData() is", data);
        this.reChildAndFamily.FirstName = data.person.firstName;
        this.reChildAndFamily.LastName = data.person.lastName;
        this.reChildAndFamily.Kaecses = data.person.kaecses;
        this.reChildAndFamily.Dob = new Date(data.person.dob);
        this.printedBy = localStorage.getItem('UserId') || "Administrator";
        this.printedDate = new Date();
      })

    this._referral.getReferralData()
      .then((data) => {
        console.log("data in  this._referral.getReferralData() in assessment checklist is", data);
        this.reChildAndFamily.DateOfReferral = new Date(data.referral.referralDate)
        this.reChildAndFamily.Facts = (data.referral.facts)
      })
      this._team.getUserName()
      .then((data) => {
        console.log("data in this._team.getUserName() is", data);
        this.printedBy = data.users.firstName + " " + data.users.lastName;

      })
  }

  editForm() {
    this.childAndFamilyForm.enable();
    this.editControll = false;
  }
  saveForm(event, source) {

    !isNullOrUndefined(source.DateOfReferral) ? source.DateOfReferral = Date.parse(source.DateOfReferral) : null;
    !isNullOrUndefined(source.Dob) ? source.Dob = Date.parse(source.Dob) : null;

    !isNullOrUndefined(source.CaregiverDob) ? source.CaregiverDob = Date.parse(source.CaregiverDob) : null;
    !isNullOrUndefined(source.CaregiverDob1) ? source.CaregiverDob1 = Date.parse(source.CaregiverDob1) : null;
    !isNullOrUndefined(source.CaregiverDob2) ? source.CaregiverDob2 = Date.parse(source.CaregiverDob2) : null;
    !isNullOrUndefined(source.CaregiverDob3) ? source.CaregiverDob3 = Date.parse(source.CaregiverDob3) : null;

    !isNullOrUndefined(source.AddDate) ? source.AddDate = Date.parse(source.AddDate) : null;
    !isNullOrUndefined(source.AddDate1) ? source.AddDate1 = Date.parse(source.AddDate1) : null;
    !isNullOrUndefined(source.AddDate2) ? source.AddDate2 = Date.parse(source.AddDate2) : null;
    !isNullOrUndefined(source.AddDate3) ? source.AddDate3 = Date.parse(source.AddDate3) : null;

    !isNullOrUndefined(source.ImpulsiveDate) ? source.ImpulsiveDate = Date.parse(source.ImpulsiveDate) : null;
    !isNullOrUndefined(source.ImpulsiveDate1) ? source.ImpulsiveDate1 = Date.parse(source.ImpulsiveDate1) : null;
    !isNullOrUndefined(source.ImpulsiveDate2) ? source.ImpulsiveDate2 = Date.parse(source.ImpulsiveDate2) : null;
    !isNullOrUndefined(source.ImpulsiveDate3) ? source.ImpulsiveDate3 = Date.parse(source.ImpulsiveDate3) : null;

    !isNullOrUndefined(source.PhysicalDate) ? source.PhysicalDate = Date.parse(source.PhysicalDate) : null;
    !isNullOrUndefined(source.PhysicalDate1) ? source.PhysicalDate1 = Date.parse(source.PhysicalDate1) : null;
    !isNullOrUndefined(source.PhysicalDate2) ? source.PhysicalDate2 = Date.parse(source.PhysicalDate2) : null;
    !isNullOrUndefined(source.PhysicalDate3) ? source.PhysicalDate3 = Date.parse(source.PhysicalDate3) : null;

    !isNullOrUndefined(source.VerbalDate) ? source.VerbalDate = Date.parse(source.VerbalDate) : null;
    !isNullOrUndefined(source.VerbalDate1) ? source.VerbalDate1 = Date.parse(source.VerbalDate1) : null;
    !isNullOrUndefined(source.VerbalDate2) ? source.VerbalDate2 = Date.parse(source.VerbalDate2) : null;
    !isNullOrUndefined(source.VerbalDate3) ? source.VerbalDate3 = Date.parse(source.VerbalDate3) : null;

    !isNullOrUndefined(source.CriminalDate) ? source.CriminalDate = Date.parse(source.CriminalDate) : null;
    !isNullOrUndefined(source.CriminalDate1) ? source.CriminalDate1 = Date.parse(source.CriminalDate1) : null;
    !isNullOrUndefined(source.CriminalDate2) ? source.CriminalDate2 = Date.parse(source.CriminalDate2) : null;
    !isNullOrUndefined(source.CriminalDate3) ? source.CriminalDate3 = Date.parse(source.CriminalDate3) : null;

    !isNullOrUndefined(source.AnimalsDate) ? source.AnimalsDate = Date.parse(source.AnimalsDate) : null;
    !isNullOrUndefined(source.AnimalsDate1) ? source.AnimalsDate1 = Date.parse(source.AnimalsDate1) : null;
    !isNullOrUndefined(source.AnimalsDate2) ? source.AnimalsDate2 = Date.parse(source.AnimalsDate2) : null;
    !isNullOrUndefined(source.AnimalsDate3) ? source.AnimalsDate3 = Date.parse(source.AnimalsDate3) : null;

    !isNullOrUndefined(source.HomeDate) ? source.HomeDate = Date.parse(source.HomeDate) : null;
    !isNullOrUndefined(source.HomeDate1) ? source.HomeDate1 = Date.parse(source.HomeDate1) : null;
    !isNullOrUndefined(source.HomeDate2) ? source.HomeDate2 = Date.parse(source.HomeDate2) : null;
    !isNullOrUndefined(source.HomeDate3) ? source.HomeDate3 = Date.parse(source.HomeDate3) : null;

    !isNullOrUndefined(source.SchoolDate) ? source.SchoolDate = Date.parse(source.SchoolDate) : null;
    !isNullOrUndefined(source.SchoolDate1) ? source.SchoolDate1 = Date.parse(source.SchoolDate1) : null;
    !isNullOrUndefined(source.SchoolDate2) ? source.SchoolDate2 = Date.parse(source.SchoolDate2) : null;
    !isNullOrUndefined(source.SchoolDate3) ? source.SchoolDate3 = Date.parse(source.SchoolDate3) : null;

    !isNullOrUndefined(source.FireDate) ? source.FireDate = Date.parse(source.FireDate) : null;
    !isNullOrUndefined(source.FireDate1) ? source.FireDate1 = Date.parse(source.FireDate1) : null;
    !isNullOrUndefined(source.FireDate2) ? source.FireDate2 = Date.parse(source.FireDate2) : null;
    !isNullOrUndefined(source.FireDate3) ? source.FireDate3 = Date.parse(source.FireDate3) : null;

    !isNullOrUndefined(source.GangDate) ? source.GangDate = Date.parse(source.GangDate) : null;
    !isNullOrUndefined(source.GangDate1) ? source.GangDate1 = Date.parse(source.GangDate1) : null;
    !isNullOrUndefined(source.GangDate2) ? source.GangDate2 = Date.parse(source.GangDate2) : null;
    !isNullOrUndefined(source.GangDate3) ? source.GangDate3 = Date.parse(source.GangDate3) : null;

    !isNullOrUndefined(source.HygieneDate) ? source.HygieneDate = Date.parse(source.HygieneDate) : null;
    !isNullOrUndefined(source.HygieneDate1) ? source.HygieneDate1 = Date.parse(source.HygieneDate1) : null;
    !isNullOrUndefined(source.HygieneDate2) ? source.HygieneDate2 = Date.parse(source.HygieneDate2) : null;
    !isNullOrUndefined(source.HygieneDate3) ? source.HygieneDate3 = Date.parse(source.HygieneDate3) : null;

    !isNullOrUndefined(source.DishonestDate) ? source.DishonestDate = Date.parse(source.DishonestDate) : null;
    !isNullOrUndefined(source.DishonestDate1) ? source.DishonestDate1 = Date.parse(source.DishonestDate1) : null;
    !isNullOrUndefined(source.DishonestDate2) ? source.DishonestDate2 = Date.parse(source.DishonestDate2) : null;
    !isNullOrUndefined(source.DishonestDate3) ? source.DishonestDate3 = Date.parse(source.DishonestDate3) : null;

    !isNullOrUndefined(source.OppositionalDate) ? source.OppositionalDate = Date.parse(source.OppositionalDate) : null;
    !isNullOrUndefined(source.OppositionalDate1) ? source.OppositionalDate1 = Date.parse(source.OppositionalDate1) : null;
    !isNullOrUndefined(source.OppositionalDate2) ? source.OppositionalDate2 = Date.parse(source.OppositionalDate2) : null;
    !isNullOrUndefined(source.OppositionalDate3) ? source.OppositionalDate3 = Date.parse(source.OppositionalDate3) : null;

    !isNullOrUndefined(source.ProfanityDate) ? source.ProfanityDate = Date.parse(source.ProfanityDate) : null;
    !isNullOrUndefined(source.ProfanityDate1) ? source.ProfanityDate1 = Date.parse(source.ProfanityDate1) : null;
    !isNullOrUndefined(source.ProfanityDate2) ? source.ProfanityDate2 = Date.parse(source.ProfanityDate2) : null;
    !isNullOrUndefined(source.ProfanityDate3) ? source.ProfanityDate3 = Date.parse(source.ProfanityDate3) : null;

    !isNullOrUndefined(source.RunnerDate) ? source.RunnerDate = Date.parse(source.RunnerDate) : null;
    !isNullOrUndefined(source.RunnerDate1) ? source.RunnerDate1 = Date.parse(source.RunnerDate1) : null;
    !isNullOrUndefined(source.RunnerDate2) ? source.RunnerDate2 = Date.parse(source.RunnerDate2) : null;
    !isNullOrUndefined(source.RunnerDate3) ? source.RunnerDate3 = Date.parse(source.RunnerDate3) : null;

    !isNullOrUndefined(source.RunsDate) ? source.RunsDate = Date.parse(source.RunsDate) : null;
    !isNullOrUndefined(source.RunsDate1) ? source.RunsDate1 = Date.parse(source.RunsDate1) : null;
    !isNullOrUndefined(source.RunsDate2) ? source.RunsDate2 = Date.parse(source.RunsDate2) : null;
    !isNullOrUndefined(source.RunsDate3) ? source.RunsDate3 = Date.parse(source.RunsDate3) : null;

    !isNullOrUndefined(source.TemperDate) ? source.TemperDate = Date.parse(source.TemperDate) : null;
    !isNullOrUndefined(source.TemperDate1) ? source.TemperDate1 = Date.parse(source.TemperDate1) : null;
    !isNullOrUndefined(source.TemperDate2) ? source.TemperDate2 = Date.parse(source.TemperDate2) : null;
    !isNullOrUndefined(source.TemperDate3) ? source.TemperDate3 = Date.parse(source.TemperDate3) : null;

    !isNullOrUndefined(source.TheftDate) ? source.TheftDate = Date.parse(source.TheftDate) : null;
    !isNullOrUndefined(source.TheftDate1) ? source.TheftDate1 = Date.parse(source.TheftDate1) : null;
    !isNullOrUndefined(source.TheftDate2) ? source.TheftDate2 = Date.parse(source.TheftDate2) : null;
    !isNullOrUndefined(source.TheftDate3) ? source.TheftDate3 = Date.parse(source.TheftDate3) : null;

    !isNullOrUndefined(source.TruancyDate) ? source.TruancyDate = Date.parse(source.TruancyDate) : null;
    !isNullOrUndefined(source.TruancyDate1) ? source.TruancyDate1 = Date.parse(source.TruancyDate1) : null;
    !isNullOrUndefined(source.TruancyDate2) ? source.TruancyDate2 = Date.parse(source.TruancyDate2) : null;
    !isNullOrUndefined(source.TruancyDate3) ? source.TruancyDate3 = Date.parse(source.TruancyDate3) : null;

    !isNullOrUndefined(source.VandalismDate) ? source.VandalismDate = Date.parse(source.VandalismDate) : null;
    !isNullOrUndefined(source.VandalismDate1) ? source.VandalismDate1 = Date.parse(source.VandalismDate1) : null;
    !isNullOrUndefined(source.VandalismDate2) ? source.VandalismDate2 = Date.parse(source.VandalismDate2) : null;
    !isNullOrUndefined(source.VandalismDate3) ? source.VandalismDate3 = Date.parse(source.VandalismDate3) : null;

    !isNullOrUndefined(source.DateOfLast) ? source.DateOfLast = Date.parse(source.DateOfLast) : null;
    !isNullOrUndefined(source.SignatureDate) ? source.SignatureDate = Date.parse(source.SignatureDate) : null;
    !isNullOrUndefined(source.SupervisorDate) ? source.SupervisorDate = Date.parse(source.SupervisorDate) : null;




    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.childFamProfOut.emit({ cmsData: source });
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
  discardForm() {
    this.childFamProfOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.childAndFamilyForm = this._fb.group({
      FirstName: [null],
      MiddleName: [null],
      LastName: [null],
      Nickname: [null],
      DateOfReferral: [null],
      Facts: [null],
      Kaecses: [null],
      Dob: [null],
      PrimaryLanguage: [null],
      EyeColor: [null],
      HairColor: [null],
      IdentifyingMarks: [null],
      IsAdoptedYes: [false],
      IsAdoptedNo: [false],
      isSedYes: [false],
      isSedNo: [false],
      CaregiverName: [null],
      CaregiverDob: [null],
      CaregiverPhone: [null],
      CaregiverRelationship: [null],
      CaregiverSsn: [null],
      CaregiverLicense: [null],
      CaregiverAddress: [null],
      CaregiverEthnicity: [null],
      IsCaregiverMale: [false],
      IsCaregiverFemale: [false],
      CaregiverReligious: [null],
      CaregiverMilitary: [null],
      CaregiverLanguage: [null],
      CaregiverKaecses: [null],
      CaregiverOccupation: [null],
      CaregiverEmployer: [null],
      CaregiverEmployerAddress: [null],
      CaregiverEmployerPhone: [null],
      CaregiverLimitations: [null],

      CaregiverName1: [null],
      CaregiverDob1: [null],
      CaregiverPhone1: [null],
      CaregiverRelationship1: [null],
      CaregiverSsn1: [null],
      CaregiverLicense1: [null],
      CaregiverAddress1: [null],
      CaregiverEthnicity1: [null],
      IsCaregiverMale1: [false],
      IsCaregiverFemale1: [false],
      CaregiverReligious1: [null],
      CaregiverMilitary1: [null],
      CaregiverLanguage1: [null],
      CaregiverKaecses1: [null],
      CaregiverOccupation1: [null],
      CaregiverEmployer1: [null],
      CaregiverEmployerAddress1: [null],
      CaregiverEmployerPhone1: [null],
      CaregiverLimitations1: [null],

      CaregiverName2: [null],
      CaregiverDob2: [null],
      CaregiverPhone2: [null],
      CaregiverRelationship2: [null],
      CaregiverSsn2: [null],
      CaregiverLicense2: [null],
      CaregiverAddress2: [null],
      CaregiverEthnicity2: [null],
      IsCaregiverMale2: [false],
      IsCaregiverFemale2: [false],
      CaregiverReligious2: [null],
      CaregiverMilitary2: [null],
      CaregiverLanguage2: [null],
      CaregiverKaecses2: [null],
      CaregiverOccupation2: [null],
      CaregiverEmployer2: [null],
      CaregiverEmployerAddress2: [null],
      CaregiverEmployerPhone2: [null],
      CaregiverLimitations2: [null],

      CaregiverName3: [null],
      CaregiverDob3: [null],
      CaregiverPhone3: [null],
      CaregiverRelationship3: [null],
      CaregiverSsn3: [null],
      CaregiverLicense3: [null],
      CaregiverAddress3: [null],
      CaregiverEthnicity3: [null],
      IsCaregiverMale3: [false],
      IsCaregiverFemale3: [false],
      CaregiverReligious3: [null],
      CaregiverMilitary3: [null],
      CaregiverLanguage3: [null],
      CaregiverKaecses3: [null],
      CaregiverOccupation3: [null],
      CaregiverEmployer3: [null],
      CaregiverEmployerAddress3: [null],
      CaregiverEmployerPhone3: [null],
      CaregiverLimitations3: [null],

      Siblings: [null],
      Sources: [null],
      PastInvolvements: [null],
      IsChildrenRemovedYes: [false],
      IsChildrenRemovedNo: [false],
      ReasonForReferral: [null],
      reasonChildRemoved: [null],
      ReferredFamilyView: [null],
      ProblemOnset: [null],

      Strengths: [null],
      Concerns: [null],

      Strengths1: [null],
      Concerns1: [null],

      Strengths2: [null],
      Concerns2: [null],

      Strengths3: [null],
      Concerns3: [null],

      Strengths4: [null],
      Concerns4: [null],

      Strengths5: [null],
      Concerns5: [null],

      Strengths6: [null],
      Concerns6: [null],


      //////////////
      EducationConcerns: [null],
      CaregiverLegalSituation: [null],
      CaregiverLegalSituation1: [null],
      OtherBirthParent: [null],
      OtherBirthParent1: [null],

      Spouse: [null],
      Spouse1: [null],
      Spouse2: [null],
      Spouse3: [null],

      DateOfMarriage: [null],
      DateOfMarriage1: [null],
      DateOfMarriage2: [null],
      DateOfMarriage3: [null],

      DateOfDivorce: [null],
      DateOfDivorce1: [null],
      DateOfDivorce2: [null],
      DateOfDivorce3: [null],

      DateOfDeath: [null],
      DateOfDeath1: [null],
      DateOfDeath2: [null],
      DateOfDeath3: [null],

      Notes: [null],
      Notes1: [null],
      Notes2: [null],
      Notes3: [null],

      CaregiverViewChildren: [null],
      CaregiverViewFamily: [null],


      PrematureLabor: [null],
      //////////////////////
      AddDate: [null],
      AddDate1: [null],
      AddDate2: [null],
      AddDate3: [null],
      AddFrequency: [null],

      ImpulsiveDate: [null],
      ImpulsiveDate1: [null],
      ImpulsiveDate2: [null],
      ImpulsiveDate3: [null],
      ImpulsiveFrequency: [null],

      PhysicalDate: [null],
      PhysicalDate1: [null],
      PhysicalDate2: [null],
      PhysicalDate3: [null],
      PhysicalFrequency: [null],

      VerbalDate: [null],
      VerbalDate1: [null],
      VerbalDate2: [null],
      VerbalDate3: [null],
      VerbalFrequency: [null],

      CriminalDate: [null],
      CriminalDate1: [null],
      CriminalDate2: [null],
      CriminalDate3: [null],
      CriminalFrequency: [null],

      AnimalsDate: [null],
      AnimalsDate1: [null],
      AnimalsDate2: [null],
      AnimalsDate3: [null],
      AnimalsFrequency: [null],

      HomeDate: [null],
      HomeDate1: [null],
      HomeDate2: [null],
      HomeDate3: [null],
      HomeFrequency: [null],

      SchoolDate: [null],
      SchoolDate1: [null],
      SchoolDate2: [null],
      SchoolDate3: [null],
      SchoolFrequency: [null],

      FireDate: [null],
      FireDate1: [null],
      FireDate2: [null],
      FireDate3: [null],
      FireFrequency: [null],

      GangDate: [null],
      GangDate1: [null],
      GangDate2: [null],
      GangDate3: [null],
      GangFrequency: [null],

      HygieneDate: [null],
      HygieneDate1: [null],
      HygieneDate2: [null],
      HygieneDate3: [null],
      HygieneFrequency: [null],

      DishonestDate: [null],
      DishonestDate1: [null],
      DishonestDate2: [null],
      DishonestDate3: [null],
      DishonestFrequency: [null],

      OppositionalDate: [null],
      OppositionalDate1: [null],
      OppositionalDate2: [null],
      OppositionalDate3: [null],
      OppositionalFrequency: [null],

      ProfanityDate: [null],
      ProfanityDate1: [null],
      ProfanityDate2: [null],
      ProfanityDate3: [null],
      ProfanityFrequency: [null],

      RunnerDate: [null],
      RunnerDate1: [null],
      RunnerDate2: [null],
      RunnerDate3: [null],
      RunnerFrequency: [null],

      RunsDate: [null],
      RunsDate1: [null],
      RunsDate2: [null],
      RunsDate3: [null],
      RunsFrequency: [null],

      TemperDate: [null],
      TemperDate1: [null],
      TemperDate2: [null],
      TemperDate3: [null],
      TemperFrequency: [null],

      TheftDate: [null],
      TheftDate1: [null],
      TheftDate2: [null],
      TheftDate3: [null],
      TheftFrequency: [null],

      TruancyDate: [null],
      TruancyDate1: [null],
      TruancyDate2: [null],
      TruancyDate3: [null],
      TruancyFrequency: [null],

      VandalismDate: [null],
      VandalismDate1: [null],
      VandalismDate2: [null],
      VandalismDate3: [null],
      VandalismFrequency: [null],

      /////////////
      Height: [null],
      Weight: [null],
      Doctor: [null],
      DoctorCity: [null],
      DoctorState: [null],

      Dentist: [null],
      DentistCity: [null],
      DentistState: [null],

      EyeDoctor: [null],
      EyeDoctorCity: [null],
      EyeDoctorState: [null],

      MedicalDiagnosis: [null],
      Allergies: [null],
      ReviewMedications: [null],





      Medication: [null],
      Dosage: [null],
      Frequency: [null],
      PrescribedFor: [null],
      PrescribedBy: [null],
      SourceInfo: [null],

      Medication1: [null],
      Dosage1: [null],
      Frequency1: [null],
      PrescribedFor1: [null],
      PrescribedBy1: [null],
      SourceInfo1: [null],

      Medication2: [null],
      Dosage2: [null],
      Frequency2: [null],
      PrescribedFor2: [null],
      PrescribedBy2: [null],
      SourceInfo2: [null],

      Medication3: [null],
      Dosage3: [null],
      Frequency3: [null],
      PrescribedFor3: [null],
      PrescribedBy3: [null],
      SourceInfo3: [null],

      ///////
      Psychiatrist: [null],
      PsychiatristCity: [null],
      PsychiatristState: [null],

      MentalHealthDiagnosis: [null],
      TherapistName: [null],
      TherapistAgency: [null],

      IsChildQualifyYes: [false],
      IsChildQualifyNo: [false],

      IsChildDiagnosedYes: [false],
      IsChildDiagnosedNo: [false],

      IsChildWaiverYes: [false],
      IsChildWaiverNo: [false],

      TierLevel: [null],
      isSocialFundingYes: [false],
      isSocialFundingNo: [false],
      CurrentSchool: [null],
      Grade: [null],

      SpecialEducationType: [null],
      DateOfLast: [null],
      BehaviorProblems: [null],

      IsGedYes: [false],
      IsGedNo: [false],
      ChildrenView: [null],

      /////////////////
      Environment: [null],
      Environment1: [null],
      Environment2: [null],
      Environment3: [null],
      Environment4: [null],

      ParentalCapabilities: [null],
      ParentalCapabilities1: [null],
      ParentalCapabilities2: [null],
      ParentalCapabilities3: [null],
      ParentalCapabilities4: [null],

      FamilyInteractions: [null],
      FamilyInteractions1: [null],
      FamilyInteractions2: [null],
      FamilyInteractions3: [null],
      FamilyInteractions4: [null],

      FamilySafety: [null],
      FamilySafety1: [null],
      FamilySafety2: [null],
      FamilySafety3: [null],
      FamilySafety4: [null],

      ChildWellBeing: [null],
      ChildWellBeing1: [null],
      ChildWellBeing2: [null],
      ChildWellBeing3: [null],
      ChildWellBeing4: [null],

      CommunityLife: [null],
      CommunityLife1: [null],
      CommunityLife2: [null],
      CommunityLife3: [null],
      CommunityLife4: [null],

      SelfSufficiency: [null],
      SelfSufficiency1: [null],
      SelfSufficiency2: [null],
      SelfSufficiency3: [null],
      SelfSufficiency4: [null],

      FamilyHealth: [null],
      FamilyHealth1: [null],
      FamilyHealth2: [null],
      FamilyHealth3: [null],
      FamilyHealth4: [null],

      ChildAmbivalence: [null],
      ChildAmbivalence1: [null],
      ChildAmbivalence2: [null],
      ChildAmbivalence3: [null],
      ChildAmbivalence4: [null],

      ReadinessReunification: [null],
      ReadinessReunification1: [null],
      ReadinessReunification2: [null],
      ReadinessReunification3: [null],
      ReadinessReunification4: [null],

      //////////////////
      Signature: [null],
      SignatureDate: [null],
      SupervisorSignature: [null],
      SupervisorDate: [null],
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
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;
      //       formData = data.pdfForms.pdfForms;


      // !isNullOrUndefined(formData.DateOfReferral) ? formData.DateOfReferral = new Date(formData.DateOfReferral) : null;
      // !isNullOrUndefined(formData.Dob) ? formData.Dob = new Date(formData.Dob) : null;

      // !isNullOrUndefined(formData.CaregiverDob) ? formData.CaregiverDob = new Date(formData.CaregiverDob) : null;
      // !isNullOrUndefined(formData.CaregiverDob1) ? formData.CaregiverDob1 = new Date(formData.CaregiverDob1) : null;
      // !isNullOrUndefined(formData.CaregiverDob2) ? formData.CaregiverDob2 = new Date(formData.CaregiverDob2) : null;
      // !isNullOrUndefined(formData.CaregiverDob3) ? formData.CaregiverDob3 = new Date(formData.CaregiverDob3) : null;

      // !isNullOrUndefined(formData.AddDate) ? formData.AddDate = new Date(formData.AddDate) : null;
      // !isNullOrUndefined(formData.AddDate1) ? formData.AddDate1 = new Date(formData.AddDate1) : null;
      // !isNullOrUndefined(formData.AddDate2) ? formData.AddDate2 = new Date(formData.AddDate2) : null;
      // !isNullOrUndefined(formData.AddDate3) ? formData.AddDate3 = new Date(formData.AddDate3) : null;

      // !isNullOrUndefined(formData.ImpulsiveDate) ? formData.ImpulsiveDate = new Date(formData.ImpulsiveDate) : null;
      // !isNullOrUndefined(formData.ImpulsiveDate1) ? formData.ImpulsiveDate1 = new Date(formData.ImpulsiveDate1) : null;
      // !isNullOrUndefined(formData.ImpulsiveDate2) ? formData.ImpulsiveDate2 = new Date(formData.ImpulsiveDate2) : null;
      // !isNullOrUndefined(formData.ImpulsiveDate3) ? formData.ImpulsiveDate3 = new Date(formData.ImpulsiveDate3) : null;

      // !isNullOrUndefined(formData.PhysicalDate) ? formData.PhysicalDate = new Date(formData.PhysicalDate) : null;
      // !isNullOrUndefined(formData.PhysicalDate1) ? formData.PhysicalDate1 = new Date(formData.PhysicalDate1) : null;
      // !isNullOrUndefined(formData.PhysicalDate2) ? formData.PhysicalDate2 = new Date(formData.PhysicalDate2) : null;
      // !isNullOrUndefined(formData.PhysicalDate3) ? formData.PhysicalDate3 = new Date(formData.PhysicalDate3) : null;

      // !isNullOrUndefined(formData.VerbalDate) ? formData.VerbalDate = new Date(formData.VerbalDate) : null;
      // !isNullOrUndefined(formData.VerbalDate1) ? formData.VerbalDate1 = new Date(formData.VerbalDate1) : null;
      // !isNullOrUndefined(formData.VerbalDate2) ? formData.VerbalDate2 = new Date(formData.VerbalDate2) : null;
      // !isNullOrUndefined(formData.VerbalDate3) ? formData.VerbalDate3 = new Date(formData.VerbalDate3) : null;

      // !isNullOrUndefined(formData.CriminalDate) ? formData.CriminalDate = new Date(formData.CriminalDate) : null;
      // !isNullOrUndefined(formData.CriminalDate1) ? formData.CriminalDate1 = new Date(formData.CriminalDate1) : null;
      // !isNullOrUndefined(formData.CriminalDate2) ? formData.CriminalDate2 = new Date(formData.CriminalDate2) : null;
      // !isNullOrUndefined(formData.CriminalDate3) ? formData.CriminalDate3 = new Date(formData.CriminalDate3) : null;

      // !isNullOrUndefined(formData.AnimalsDate) ? formData.AnimalsDate = new Date(formData.AnimalsDate) : null;
      // !isNullOrUndefined(formData.AnimalsDate1) ? formData.AnimalsDate1 = new Date(formData.AnimalsDate1) : null;
      // !isNullOrUndefined(formData.AnimalsDate2) ? formData.AnimalsDate2 = new Date(formData.AnimalsDate2) : null;
      // !isNullOrUndefined(formData.AnimalsDate3) ? formData.AnimalsDate3 = new Date(formData.AnimalsDate3) : null;

      // !isNullOrUndefined(formData.HomeDate) ? formData.HomeDate = new Date(formData.HomeDate) : null;
      // !isNullOrUndefined(formData.HomeDate1) ? formData.HomeDate1 = new Date(formData.HomeDate1) : null;
      // !isNullOrUndefined(formData.HomeDate2) ? formData.HomeDate2 = new Date(formData.HomeDate2) : null;
      // !isNullOrUndefined(formData.HomeDate3) ? formData.HomeDate3 = new Date(formData.HomeDate3) : null;

      // !isNullOrUndefined(formData.SchoolDate) ? formData.SchoolDate = new Date(formData.SchoolDate) : null;
      // !isNullOrUndefined(formData.SchoolDate1) ? formData.SchoolDate1 = new Date(formData.SchoolDate1) : null;
      // !isNullOrUndefined(formData.SchoolDate2) ? formData.SchoolDate2 = new Date(formData.SchoolDate2) : null;
      // !isNullOrUndefined(formData.SchoolDate3) ? formData.SchoolDate3 = new Date(formData.SchoolDate3) : null;

      // !isNullOrUndefined(formData.FireDate) ? formData.FireDate = new Date(formData.FireDate) : null;
      // !isNullOrUndefined(formData.FireDate1) ? formData.FireDate1 = new Date(formData.FireDate1) : null;
      // !isNullOrUndefined(formData.FireDate2) ? formData.FireDate2 = new Date(formData.FireDate2) : null;
      // !isNullOrUndefined(formData.FireDate3) ? formData.FireDate3 = new Date(formData.FireDate3) : null;

      // !isNullOrUndefined(formData.GangDate) ? formData.GangDate = new Date(formData.GangDate) : null;
      // !isNullOrUndefined(formData.GangDate1) ? formData.GangDate1 = new Date(formData.GangDate1) : null;
      // !isNullOrUndefined(formData.GangDate2) ? formData.GangDate2 = new Date(formData.GangDate2) : null;
      // !isNullOrUndefined(formData.GangDate3) ? formData.GangDate3 = new Date(formData.GangDate3) : null;

      // !isNullOrUndefined(formData.HygieneDate) ? formData.HygieneDate = new Date(formData.HygieneDate) : null;
      // !isNullOrUndefined(formData.HygieneDate1) ? formData.HygieneDate1 = new Date(formData.HygieneDate1) : null;
      // !isNullOrUndefined(formData.HygieneDate2) ? formData.HygieneDate2 = new Date(formData.HygieneDate2) : null;
      // !isNullOrUndefined(formData.HygieneDate3) ? formData.HygieneDate3 = new Date(formData.HygieneDate3) : null;

      // !isNullOrUndefined(formData.DishonestDate) ? formData.DishonestDate = new Date(formData.DishonestDate) : null;
      // !isNullOrUndefined(formData.DishonestDate1) ? formData.DishonestDate1 = new Date(formData.DishonestDate1) : null;
      // !isNullOrUndefined(formData.DishonestDate2) ? formData.DishonestDate2 = new Date(formData.DishonestDate2) : null;
      // !isNullOrUndefined(formData.DishonestDate3) ? formData.DishonestDate3 = new Date(formData.DishonestDate3) : null;

      // !isNullOrUndefined(formData.OppositionalDate) ? formData.OppositionalDate = new Date(formData.OppositionalDate) : null;
      // !isNullOrUndefined(formData.OppositionalDate1) ? formData.OppositionalDate1 = new Date(formData.OppositionalDate1) : null;
      // !isNullOrUndefined(formData.OppositionalDate2) ? formData.OppositionalDate2 = new Date(formData.OppositionalDate2) : null;
      // !isNullOrUndefined(formData.OppositionalDate3) ? formData.OppositionalDate3 = new Date(formData.OppositionalDate3) : null;

      // !isNullOrUndefined(formData.ProfanityDate) ? formData.ProfanityDate = new Date(formData.ProfanityDate) : null;
      // !isNullOrUndefined(formData.ProfanityDate1) ? formData.ProfanityDate1 = new Date(formData.ProfanityDate1) : null;
      // !isNullOrUndefined(formData.ProfanityDate2) ? formData.ProfanityDate2 = new Date(formData.ProfanityDate2) : null;
      // !isNullOrUndefined(formData.ProfanityDate3) ? formData.ProfanityDate3 = new Date(formData.ProfanityDate3) : null;

      // !isNullOrUndefined(formData.RunnerDate) ? formData.RunnerDate = new Date(formData.RunnerDate) : null;
      // !isNullOrUndefined(formData.RunnerDate1) ? formData.RunnerDate1 = new Date(formData.RunnerDate1) : null;
      // !isNullOrUndefined(formData.RunnerDate2) ? formData.RunnerDate2 = new Date(formData.RunnerDate2) : null;
      // !isNullOrUndefined(formData.RunnerDate3) ? formData.RunnerDate3 = new Date(formData.RunnerDate3) : null;

      // !isNullOrUndefined(formData.RunsDate) ? formData.RunsDate = new Date(formData.RunsDate) : null;
      // !isNullOrUndefined(formData.RunsDate1) ? formData.RunsDate1 = new Date(formData.RunsDate1) : null;
      // !isNullOrUndefined(formData.RunsDate2) ? formData.RunsDate2 = new Date(formData.RunsDate2) : null;
      // !isNullOrUndefined(formData.RunsDate3) ? formData.RunsDate3 = new Date(formData.RunsDate3) : null;

      // !isNullOrUndefined(formData.TemperDate) ? formData.TemperDate = new Date(formData.TemperDate) : null;
      // !isNullOrUndefined(formData.TemperDate1) ? formData.TemperDate1 = new Date(formData.TemperDate1) : null;
      // !isNullOrUndefined(formData.TemperDate2) ? formData.TemperDate2 = new Date(formData.TemperDate2) : null;
      // !isNullOrUndefined(formData.TemperDate3) ? formData.TemperDate3 = new Date(formData.TemperDate3) : null;

      // !isNullOrUndefined(formData.TheftDate) ? formData.TheftDate = new Date(formData.TheftDate) : null;
      // !isNullOrUndefined(formData.TheftDate1) ? formData.TheftDate1 = new Date(formData.TheftDate1) : null;
      // !isNullOrUndefined(formData.TheftDate2) ? formData.TheftDate2 = new Date(formData.TheftDate2) : null;
      // !isNullOrUndefined(formData.TheftDate3) ? formData.TheftDate3 = new Date(formData.TheftDate3) : null;

      // !isNullOrUndefined(formData.TruancyDate) ? formData.TruancyDate = new Date(formData.TruancyDate) : null;
      // !isNullOrUndefined(formData.TruancyDate1) ? formData.TruancyDate1 = new Date(formData.TruancyDate1) : null;
      // !isNullOrUndefined(formData.TruancyDate2) ? formData.TruancyDate2 = new Date(formData.TruancyDate2) : null;
      // !isNullOrUndefined(formData.TruancyDate3) ? formData.TruancyDate3 = new Date(formData.TruancyDate3) : null;

      // !isNullOrUndefined(formData.VandalismDate) ? formData.VandalismDate = new Date(formData.VandalismDate) : null;
      // !isNullOrUndefined(formData.VandalismDate1) ? formData.VandalismDate1 = new Date(formData.VandalismDate1) : null;
      // !isNullOrUndefined(formData.VandalismDate2) ? formData.VandalismDate2 = new Date(formData.VandalismDate2) : null;
      // !isNullOrUndefined(formData.VandalismDate3) ? formData.VandalismDate3 = new Date(formData.VandalismDate3) : null;

      // !isNullOrUndefined(formData.DateOfLast) ? formData.DateOfLast = new Date(formData.DateOfLast) : null;
      // !isNullOrUndefined(formData.SignatureDate) ? formData.SignatureDate = new Date(formData.SignatureDate) : null;
      // !isNullOrUndefined(formData.SupervisorDate) ? formData.SupervisorDate = new Date(formData.SupervisorDate) : null;

      //  this.reChildAndFamily = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.childAndFamilyForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.jsPdfOrientation = 'landscape';
    this._printPdf.printForm();
  }


}
