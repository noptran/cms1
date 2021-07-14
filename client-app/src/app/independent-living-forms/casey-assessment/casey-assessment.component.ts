import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { IndeCaseyAssessment } from './inde-casey-assessment';
import { Router } from '@angular/router';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import html2pdf from 'html2pdf.js';
import { TeamFormService } from '../../team-form/team-form.service';
import {PrintPdf} from "../../print-pdf";
@Component({
  selector: 'app-casey-assessment',
  templateUrl: './casey-assessment.component.html',
  styleUrls: ['./casey-assessment.component.scss', '../../family-preservation/family-preservation.scss'],
  outputs: ['lifeSkillOut']
})
export class CaseyAssessmentComponent implements OnInit {
  caseyAssessmentForm: FormGroup;
  indCaseyAssessment: IndeCaseyAssessment = new IndeCaseyAssessment();
  isEdit = false;
  editControll = true;
  isPrint = true;

  @Output()
  lifeSkillOut = new EventEmitter()
  constructor(public _printPdf: PrintPdf,public _team: TeamFormService,public _fb: FormBuilder, public _opencard: OpencardsService, public _router: Router) { }

  ngOnInit() {

    this.formValidation();
    if (this._router.url == '/reports/attachment-document/rfc/independent-living/detail') {
      this.getCmsFormJson();
      this.caseyAssessmentForm.disable();
    }
    if (this._router.url == '/reports/attachment-document/rfc/independent-living/new') {
      this.editControll = false;
    }
    if (this._router.url == '/reports/referral/independent-living/casey/assessment/detail') { this.getDetails(); }
    
  }
  getCmsFormJson() {
    let data = this._opencard.getCmsJson().cmsJson[this._opencard.getCmsJson().cmsVersion];
    let json = JSON.parse(data.pdfJsonData);
    this.indCaseyAssessment = json.cmsFormJson
    let formData: any;
    formData = json.cmsFormJson;
    !isNullOrUndefined(formData.Date) ? formData.Date = new Date(formData.Date) : null;
    this.indCaseyAssessment = formData;
  }

  editForm() {
    this.caseyAssessmentForm.enable();
    this.editControll = false;
  }

  saveForm(event, source) {
    !isNullOrUndefined(source.Date) ? source.Date = Date.parse(source.Date) : null;

    console.log('source is', source);
    //  source.typeOfDod = 'assessment';
    this.lifeSkillOut.emit({ cmsData: source });
    
  }
  discardForm() {
    this.lifeSkillOut.emit({ cmsData: {} });
  }
  formValidation() {
    this.caseyAssessmentForm = this._fb.group({

      Name: [null],
      Date: [null],

      isNoDailyLiving: [false],
      isMostlyNoDailyLiving: [false],
      isSomewhatDailyLiving: [false],
      isMostlyYesDailyLiving: [false],
      isYesDailyLiving: [false],

      isNoDailyLiving1: [false],
      isMostlyNoDailyLiving1: [false],
      isSomewhatDailyLiving1: [false],
      isMostlyYesDailyLiving1: [false],
      isYesDailyLiving1: [false],

      isNoDailyLiving2: [false],
      isMostlyNoDailyLiving2: [false],
      isSomewhatDailyLiving2: [false],
      isMostlyYesDailyLiving2: [false],
      isYesDailyLiving2: [false],

      isNoDailyLiving3: [false],
      isMostlyNoDailyLiving3: [false],
      isSomewhatDailyLiving3: [false],
      isMostlyYesDailyLiving3: [false],
      isYesDailyLiving3: [false],

      isNoDailyLiving4: [false],
      isMostlyNoDailyLiving4: [false],
      isSomewhatDailyLiving4: [false],
      isMostlyYesDailyLiving4: [false],
      isYesDailyLiving4: [false],

      isNoDailyLiving5: [false],
      isMostlyNoDailyLiving5: [false],
      isSomewhatDailyLiving5: [false],
      isMostlyYesDailyLiving5: [false],
      isYesDailyLiving5: [false],

      isNoDailyLiving6: [false],
      isMostlyNoDailyLiving6: [false],
      isSomewhatDailyLiving6: [false],
      isMostlyYesDailyLiving6: [false],
      isYesDailyLiving6: [false],

      isNoDailyLiving7: [false],
      isMostlyNoDailyLiving7: [false],
      isSomewhatDailyLiving7: [false],
      isMostlyYesDailyLiving7: [false],
      isYesDailyLiving7: [false],

      isNoDailyLiving8: [false],
      isMostlyNoDailyLiving8: [false],
      isSomewhatDailyLiving8: [false],
      isMostlyYesDailyLiving8: [false],
      isYesDailyLiving8: [false],

      isNoDailyLiving9: [false],
      isMostlyNoDailyLiving9: [false],
      isSomewhatDailyLiving9: [false],
      isMostlyYesDailyLiving9: [false],
      isYesDailyLiving9: [false],

      isNoDailyLiving10: [false],
      isMostlyNoDailyLiving10: [false],
      isSomewhatDailyLiving10: [false],
      isMostlyYesDailyLiving10: [false],
      isYesDailyLiving10: [false],

      isNoDailyLiving11: [false],
      isMostlyNoDailyLiving11: [false],
      isSomewhatDailyLiving11: [false],
      isMostlyYesDailyLiving11: [false],
      isYesDailyLiving11: [false],

      isNoDailyLiving12: [false],
      isMostlyNoDailyLiving12: [false],
      isSomewhatDailyLiving12: [false],
      isMostlyYesDailyLiving12: [false],
      isYesDailyLiving12: [false],

      isNoDailyLiving13: [false],
      isMostlyNoDailyLiving13: [false],
      isSomewhatDailyLiving13: [false],
      isMostlyYesDailyLiving13: [false],
      isYesDailyLiving13: [false],

      isNoDailyLiving14: [false],
      isMostlyNoDailyLiving14: [false],
      isSomewhatDailyLiving14: [false],
      isMostlyYesDailyLiving14: [false],
      isYesDailyLiving14: [false],

      isNoDailyLiving15: [false],
      isMostlyNoDailyLiving15: [false],
      isSomewhatDailyLiving15: [false],
      isMostlyYesDailyLiving15: [false],
      isYesDailyLiving15: [false],

      isNoDailyLiving16: [false],
      isMostlyNoDailyLiving16: [false],
      isSomewhatDailyLiving16: [false],
      isMostlyYesDailyLiving16: [false],
      isYesDailyLiving16: [false],

      isNoDailyLiving17: [false],
      isMostlyNoDailyLiving17: [false],
      isSomewhatDailyLiving17: [false],
      isMostlyYesDailyLiving17: [false],
      isYesDailyLiving17: [false],

      // isNoDailyLiving18: [false],
      // isMostlyNoDailyLiving18: [false],
      // isSomewhatDailyLiving18: [false],
      // isMostlyYesDailyLiving18: [false],
      // isYesDailyLiving18: [false],

      /////////////////////////
      isNoSelfCare: [false],
      isMostlyNoSelfCare: [false],
      isSomewhatSelfCare: [false],
      isMostlyYesSelfCare: [false],
      isYesSelfCare: [false],

      isNoSelfCare1: [false],
      isMostlyNoSelfCare1: [false],
      isSomewhatSelfCare1: [false],
      isMostlyYesSelfCare1: [false],
      isYesSelfCare1: [false],

      isNoSelfCare2: [false],
      isMostlyNoSelfCare2: [false],
      isSomewhatSelfCare2: [false],
      isMostlyYesSelfCare2: [false],
      isYesSelfCare2: [false],

      isNoSelfCare3: [false],
      isMostlyNoSelfCare3: [false],
      isSomewhatSelfCare3: [false],
      isMostlyYesSelfCare3: [false],
      isYesSelfCare3: [false],

      isNoSelfCare4: [false],
      isMostlyNoSelfCare4: [false],
      isSomewhatSelfCare4: [false],
      isMostlyYesSelfCare4: [false],
      isYesSelfCare4: [false],

      isNoSelfCare5: [false],
      isMostlyNoSelfCare5: [false],
      isSomewhatSelfCare5: [false],
      isMostlyYesSelfCare5: [false],
      isYesSelfCare5: [false],

      isNoSelfCare6: [false],
      isMostlyNoSelfCare6: [false],
      isSomewhatSelfCare6: [false],
      isMostlyYesSelfCare6: [false],
      isYesSelfCare6: [false],

      isNoSelfCare7: [false],
      isMostlyNoSelfCare7: [false],
      isSomewhatSelfCare7: [false],
      isMostlyYesSelfCare7: [false],
      isYesSelfCare7: [false],

      isNoSelfCare8: [false],
      isMostlyNoSelfCare8: [false],
      isSomewhatSelfCare8: [false],
      isMostlyYesSelfCare8: [false],
      isYesSelfCare8: [false],

      isNoSelfCare9: [false],
      isMostlyNoSelfCare9: [false],
      isSomewhatSelfCare9: [false],
      isMostlyYesSelfCare9: [false],
      isYesSelfCare9: [false],

      isNoSelfCare10: [false],
      isMostlyNoSelfCare10: [false],
      isSomewhatSelfCare10: [false],
      isMostlyYesSelfCare10: [false],
      isYesSelfCare10: [false],

      isNoSelfCare11: [false],
      isMostlyNoSelfCare11: [false],
      isSomewhatSelfCare11: [false],
      isMostlyYesSelfCare11: [false],
      isYesSelfCare11: [false],

      isNoSelfCare12: [false],
      isMostlyNoSelfCare12: [false],
      isSomewhatSelfCare12: [false],
      isMostlyYesSelfCare12: [false],
      isYesSelfCare12: [false],

      isNoSelfCare13: [false],
      isMostlyNoSelfCare13: [false],
      isSomewhatSelfCare13: [false],
      isMostlyYesSelfCare13: [false],
      isYesSelfCare13: [false],

      isNoSelfCare14: [false],
      isMostlyNoSelfCare14: [false],
      isSomewhatSelfCare14: [false],
      isMostlyYesSelfCare14: [false],
      isYesSelfCare14: [false],

      isNoSelfCare15: [false],
      isMostlyNoSelfCare15: [false],
      isSomewhatSelfCare15: [false],
      isMostlyYesSelfCare15: [false],
      isYesSelfCare15: [false],

      isNoSelfCare16: [false],
      isMostlyNoSelfCare16: [false],
      isSomewhatSelfCare16: [false],
      isMostlyYesSelfCare16: [false],
      isYesSelfCare16: [false],

      
      isNoSelfCare17: [false],
      isMostlyNoSelfCare17: [false],
      isSomewhatSelfCare17: [false],
      isMostlyYesSelfCare17: [false],
      isYesSelfCare17: [false],

      
      isNoSelfCare18: [false],
      isMostlyNoSelfCare18: [false],
      isSomewhatSelfCare18: [false],
      isMostlyYesSelfCare18: [false],
      isYesSelfCare18: [false],

      ////////////////////////

      isNoRelationCommunication: [false],
      isMostlyNoRelationCommunication: [false],
      isSomewhatRelationCommunication: [false],
      isMostlyYesRelationCommunication: [false],
      isYesRelationCommunication: [false],

      isNoRelationCommunication1: [false],
      isMostlyNoRelationCommunication1: [false],
      isSomewhatRelationCommunication1: [false],
      isMostlyYesRelationCommunication1: [false],
      isYesRelationCommunication1: [false],

      isNoRelationCommunication2: [false],
      isMostlyNoRelationCommunication2: [false],
      isSomewhatRelationCommunication2: [false],
      isMostlyYesRelationCommunication2: [false],
      isYesRelationCommunication2: [false],

      isNoRelationCommunication3: [false],
      isMostlyNoRelationCommunication3: [false],
      isSomewhatRelationCommunication3: [false],
      isMostlyYesRelationCommunication3: [false],
      isYesRelationCommunication3: [false],

      isNoRelationCommunication4: [false],
      isMostlyNoRelationCommunication4: [false],
      isSomewhatRelationCommunication4: [false],
      isMostlyYesRelationCommunication4: [false],
      isYesRelationCommunication4: [false],

      isNoRelationCommunication5: [false],
      isMostlyNoRelationCommunication5: [false],
      isSomewhatRelationCommunication5: [false],
      isMostlyYesRelationCommunication5: [false],
      isYesRelationCommunication5: [false],

      isNoRelationCommunication6: [false],
      isMostlyNoRelationCommunication6: [false],
      isSomewhatRelationCommunication6: [false],
      isMostlyYesRelationCommunication6: [false],
      isYesRelationCommunication6: [false],

      isNoRelationCommunication7: [false],
      isMostlyNoRelationCommunication7: [false],
      isSomewhatRelationCommunication7: [false],
      isMostlyYesRelationCommunication7: [false],
      isYesRelationCommunication7: [false],

      isNoRelationCommunication8: [false],
      isMostlyNoRelationCommunication8: [false],
      isSomewhatRelationCommunication8: [false],
      isMostlyYesRelationCommunication8: [false],
      isYesRelationCommunication8: [false],

      isNoRelationCommunication9: [false],
      isMostlyNoRelationCommunication9: [false],
      isSomewhatRelationCommunication9: [false],
      isMostlyYesRelationCommunication9: [false],
      isYesRelationCommunication9: [false],

      isNoRelationCommunication10: [false],
      isMostlyNoRelationCommunication10: [false],
      isSomewhatRelationCommunication10: [false],
      isMostlyYesRelationCommunication10: [false],
      isYesRelationCommunication10: [false],

      isNoRelationCommunication11: [false],
      isMostlyNoRelationCommunication11: [false],
      isSomewhatRelationCommunication11: [false],
      isMostlyYesRelationCommunication11: [false],
      isYesRelationCommunication11: [false],

      isNoRelationCommunication12: [false],
      isMostlyNoRelationCommunication12: [false],
      isSomewhatRelationCommunication12: [false],
      isMostlyYesRelationCommunication12: [false],
      isYesRelationCommunication12: [false],

      isNoRelationCommunication13: [false],
      isMostlyNoRelationCommunication13: [false],
      isSomewhatRelationCommunication13: [false],
      isMostlyYesRelationCommunication13: [false],
      isYesRelationCommunication13: [false],

      isNoRelationCommunication14: [false],
      isMostlyNoRelationCommunication14: [false],
      isSomewhatRelationCommunication14: [false],
      isMostlyYesRelationCommunication14: [false],
      isYesRelationCommunication14: [false],

      isNoRelationCommunication15: [false],
      isMostlyNoRelationCommunication15: [false],
      isSomewhatRelationCommunication15: [false],
      isMostlyYesRelationCommunication15: [false],
      isYesRelationCommunication15: [false],

      isNoRelationCommunication16: [false],
      isMostlyNoRelationCommunication16: [false],
      isSomewhatRelationCommunication16: [false],
      isMostlyYesRelationCommunication16: [false],
      isYesRelationCommunication16: [false],

      isNoRelationCommunication17: [false],
      isMostlyNoRelationCommunication17: [false],
      isSomewhatRelationCommunication17: [false],
      isMostlyYesRelationCommunication17: [false],
      isYesRelationCommunication17: [false],

      isNoRelationCommunication18: [false],
      isMostlyNoRelationCommunication18: [false],
      isSomewhatRelationCommunication18: [false],
      isMostlyYesRelationCommunication18: [false],
      isYesRelationCommunication18: [false],

      ////////////////////////////


      isNoHousingMoney: [false],
      isMostlyNoHousingMoney: [false],
      isSomewhatHousingMoney: [false],
      isMostlyYesHousingMoney: [false],
      isYesHousingMoney: [false],

      isNoHousingMoney1: [false],
      isMostlyNoHousingMoney1: [false],
      isSomewhatHousingMoney1: [false],
      isMostlyYesHousingMoney1: [false],
      isYesHousingMoney1: [false],

      isNoHousingMoney2: [false],
      isMostlyNoHousingMoney2: [false],
      isSomewhatHousingMoney2: [false],
      isMostlyYesHousingMoney2: [false],
      isYesHousingMoney2: [false],

      isNoHousingMoney3: [false],
      isMostlyNoHousingMoney3: [false],
      isSomewhatHousingMoney3: [false],
      isMostlyYesHousingMoney3: [false],
      isYesHousingMoney3: [false],

      isNoHousingMoney4: [false],
      isMostlyNoHousingMoney4: [false],
      isSomewhatHousingMoney4: [false],
      isMostlyYesHousingMoney4: [false],
      isYesHousingMoney4: [false],

      isNoHousingMoney5: [false],
      isMostlyNoHousingMoney5: [false],
      isSomewhatHousingMoney5: [false],
      isMostlyYesHousingMoney5: [false],
      isYesHousingMoney5: [false],

      isNoHousingMoney6: [false],
      isMostlyNoHousingMoney6: [false],
      isSomewhatHousingMoney6: [false],
      isMostlyYesHousingMoney6: [false],
      isYesHousingMoney6: [false],

      isNoHousingMoney7: [false],
      isMostlyNoHousingMoney7: [false],
      isSomewhatHousingMoney7: [false],
      isMostlyYesHousingMoney7: [false],
      isYesHousingMoney7: [false],

      isNoHousingMoney8: [false],
      isMostlyNoHousingMoney8: [false],
      isSomewhatHousingMoney8: [false],
      isMostlyYesHousingMoney8: [false],
      isYesHousingMoney8: [false],

      isNoHousingMoney9: [false],
      isMostlyNoHousingMoney9: [false],
      isSomewhatHousingMoney9: [false],
      isMostlyYesHousingMoney9: [false],
      isYesHousingMoney9: [false],

      isNoHousingMoney10: [false],
      isMostlyNoHousingMoney10: [false],
      isSomewhatHousingMoney10: [false],
      isMostlyYesHousingMoney10: [false],
      isYesHousingMoney10: [false],

      isNoHousingMoney11: [false],
      isMostlyNoHousingMoney11: [false],
      isSomewhatHousingMoney11: [false],
      isMostlyYesHousingMoney11: [false],
      isYesHousingMoney11: [false],

      isNoHousingMoney12: [false],
      isMostlyNoHousingMoney12: [false],
      isSomewhatHousingMoney12: [false],
      isMostlyYesHousingMoney12: [false],
      isYesHousingMoney12: [false],

      isNoHousingMoney13: [false],
      isMostlyNoHousingMoney13: [false],
      isSomewhatHousingMoney13: [false],
      isMostlyYesHousingMoney13: [false],
      isYesHousingMoney13: [false],

      isNoHousingMoney14: [false],
      isMostlyNoHousingMoney14: [false],
      isSomewhatHousingMoney14: [false],
      isMostlyYesHousingMoney14: [false],
      isYesHousingMoney14: [false],

      isNoHousingMoney15: [false],
      isMostlyNoHousingMoney15: [false],
      isSomewhatHousingMoney15: [false],
      isMostlyYesHousingMoney15: [false],
      isYesHousingMoney15: [false],

      isNoHousingMoney16: [false],
      isMostlyNoHousingMoney16: [false],
      isSomewhatHousingMoney16: [false],
      isMostlyYesHousingMoney16: [false],
      isYesHousingMoney16: [false],

      isNoHousingMoney17: [false],
      isMostlyNoHousingMoney17: [false],
      isSomewhatHousingMoney17: [false],
      isMostlyYesHousingMoney17: [false],
      isYesHousingMoney17: [false],

      isNoHousingMoney18: [false],
      isMostlyNoHousingMoney18: [false],
      isSomewhatHousingMoney18: [false],
      isMostlyYesHousingMoney18: [false],
      isYesHousingMoney18: [false],

      isNoHousingMoney19: [false],
      isMostlyNoHousingMoney19: [false],
      isSomewhatHousingMoney19: [false],
      isMostlyYesHousingMoney19: [false],
      isYesHousingMoney19: [false],

      isNoHousingMoney20: [false],
      isMostlyNoHousingMoney20: [false],
      isSomewhatHousingMoney20: [false],
      isMostlyYesHousingMoney20: [false],
      isYesHousingMoney20: [false],

      isNoHousingMoney21: [false],
      isMostlyNoHousingMoney21: [false],
      isSomewhatHousingMoney21: [false],
      isMostlyYesHousingMoney21: [false],
      isYesHousingMoney21: [false],

      isNoHousingMoney22: [false],
      isMostlyNoHousingMoney22: [false],
      isSomewhatHousingMoney22: [false],
      isMostlyYesHousingMoney22: [false],
      isYesHousingMoney22: [false],

      isNoHousingMoney23: [false],
      isMostlyNoHousingMoney23: [false],
      isSomewhatHousingMoney23: [false],
      isMostlyYesHousingMoney23: [false],
      isYesHousingMoney23: [false],

      //////////////////////////////

      isNoWorkStudy: [false],
      isMostlyNoWorkStudy: [false],
      isSomewhatWorkStudy: [false],
      isMostlyYesWorkStudy: [false],
      isYesWorkStudy: [false],

      isNoWorkStudy1: [false],
      isMostlyNoWorkStudy1: [false],
      isSomewhatWorkStudy1: [false],
      isMostlyYesWorkStudy1: [false],
      isYesWorkStudy1: [false],

      isNoWorkStudy2: [false],
      isMostlyNoWorkStudy2: [false],
      isSomewhatWorkStudy2: [false],
      isMostlyYesWorkStudy2: [false],
      isYesWorkStudy2: [false],

      isNoWorkStudy3: [false],
      isMostlyNoWorkStudy3: [false],
      isSomewhatWorkStudy3: [false],
      isMostlyYesWorkStudy3: [false],
      isYesWorkStudy3: [false],

      isNoWorkStudy4: [false],
      isMostlyNoWorkStudy4: [false],
      isSomewhatWorkStudy4: [false],
      isMostlyYesWorkStudy4: [false],
      isYesWorkStudy4: [false],

      isNoWorkStudy5: [false],
      isMostlyNoWorkStudy5: [false],
      isSomewhatWorkStudy5: [false],
      isMostlyYesWorkStudy5: [false],
      isYesWorkStudy5: [false],

      isNoWorkStudy6: [false],
      isMostlyNoWorkStudy6: [false],
      isSomewhatWorkStudy6: [false],
      isMostlyYesWorkStudy6: [false],
      isYesWorkStudy6: [false],

      isNoWorkStudy7: [false],
      isMostlyNoWorkStudy7: [false],
      isSomewhatWorkStudy7: [false],
      isMostlyYesWorkStudy7: [false],
      isYesWorkStudy7: [false],

      isNoWorkStudy8: [false],
      isMostlyNoWorkStudy8: [false],
      isSomewhatWorkStudy8: [false],
      isMostlyYesWorkStudy8: [false],
      isYesWorkStudy8: [false],

      isNoWorkStudy9: [false],
      isMostlyNoWorkStudy9: [false],
      isSomewhatWorkStudy9: [false],
      isMostlyYesWorkStudy9: [false],
      isYesWorkStudy9: [false],

      isNoWorkStudy10: [false],
      isMostlyNoWorkStudy10: [false],
      isSomewhatWorkStudy10: [false],
      isMostlyYesWorkStudy10: [false],
      isYesWorkStudy10: [false],

      isNoWorkStudy11: [false],
      isMostlyNoWorkStudy11: [false],
      isSomewhatWorkStudy11: [false],
      isMostlyYesWorkStudy11: [false],
      isYesWorkStudy11: [false],

      isNoWorkStudy12: [false],
      isMostlyNoWorkStudy12: [false],
      isSomewhatWorkStudy12: [false],
      isMostlyYesWorkStudy12: [false],
      isYesWorkStudy12: [false],

      isNoWorkStudy13: [false],
      isMostlyNoWorkStudy13: [false],
      isSomewhatWorkStudy13: [false],
      isMostlyYesWorkStudy13: [false],
      isYesWorkStudy13: [false],

      isNoWorkStudy14: [false],
      isMostlyNoWorkStudy14: [false],
      isSomewhatWorkStudy14: [false],
      isMostlyYesWorkStudy14: [false],
      isYesWorkStudy14: [false],

      isNoWorkStudy15: [false],
      isMostlyNoWorkStudy15: [false],
      isSomewhatWorkStudy15: [false],
      isMostlyYesWorkStudy15: [false],
      isYesWorkStudy15: [false],

      isNoWorkStudy16: [false],
      isMostlyNoWorkStudy16: [false],
      isSomewhatWorkStudy16: [false],
      isMostlyYesWorkStudy16: [false],
      isYesWorkStudy16: [false],

      isNoWorkStudy17: [false],
      isMostlyNoWorkStudy17: [false],
      isSomewhatWorkStudy17: [false],
      isMostlyYesWorkStudy17: [false],
      isYesWorkStudy17: [false],

      isNoWorkStudy18: [false],
      isMostlyNoWorkStudy18: [false],
      isSomewhatWorkStudy18: [false],
      isMostlyYesWorkStudy18: [false],
      isYesWorkStudy18: [false],

      isNoWorkStudy19: [false],
      isMostlyNoWorkStudy19: [false],
      isSomewhatWorkStudy19: [false],
      isMostlyYesWorkStudy19: [false],
      isYesWorkStudy19: [false],

      isNoWorkStudy20: [false],
      isMostlyNoWorkStudy20: [false],
      isSomewhatWorkStudy20: [false],
      isMostlyYesWorkStudy20: [false],
      isYesWorkStudy20: [false],
      ///////////////////

      isNoCareerEducation: [false],
      isMostlyNoCareerEducation: [false],
      isSomewhatCareerEducation: [false],
      isMostlyYesCareerEducation: [false],
      isYesCareerEducation: [false],

      isNoCareerEducation1: [false],
      isMostlyNoCareerEducation1: [false],
      isSomewhatCareerEducation1: [false],
      isMostlyYesCareerEducation1: [false],
      isYesCareerEducation1: [false],

      isNoCareerEducation2: [false],
      isMostlyNoCareerEducation2: [false],
      isSomewhatCareerEducation2: [false],
      isMostlyYesCareerEducation2: [false],
      isYesCareerEducation2: [false],

      isNoCareerEducation3: [false],
      isMostlyNoCareerEducation3: [false],
      isSomewhatCareerEducation3: [false],
      isMostlyYesCareerEducation3: [false],
      isYesCareerEducation3: [false],

      isNoCareerEducation4: [false],
      isMostlyNoCareerEducation4: [false],
      isSomewhatCareerEducation4: [false],
      isMostlyYesCareerEducation4: [false],
      isYesCareerEducation4: [false],

      isNoCareerEducation5: [false],
      isMostlyNoCareerEducation5: [false],
      isSomewhatCareerEducation5: [false],
      isMostlyYesCareerEducation5: [false],
      isYesCareerEducation5: [false],

      isNoCareerEducation6: [false],
      isMostlyNoCareerEducation6: [false],
      isSomewhatCareerEducation6: [false],
      isMostlyYesCareerEducation6: [false],
      isYesCareerEducation6: [false],

      isNoCareerEducation7: [false],
      isMostlyNoCareerEducation7: [false],
      isSomewhatCareerEducation7: [false],
      isMostlyYesCareerEducation7: [false],
      isYesCareerEducation7: [false],

      isNoCareerEducation8: [false],
      isMostlyNoCareerEducation8: [false],
      isSomewhatCareerEducation8: [false],
      isMostlyYesCareerEducation8: [false],
      isYesCareerEducation8: [false],

      //////////////////////

      isNoLookingForward: [false],
      isMostlyNoLookingForward: [false],
      isSomewhatLookingForward: [false],
      isMostlyYesLookingForward: [false],
      isYesLookingForward: [false],

      isNoLookingForward1: [false],
      isMostlyNoLookingForward1: [false],
      isSomewhatLookingForward1: [false],
      isMostlyYesLookingForward1: [false],
      isYesLookingForward1: [false],

      isNoLookingForward2: [false],
      isMostlyNoLookingForward2: [false],
      isSomewhatLookingForward2: [false],
      isMostlyYesLookingForward2: [false],
      isYesLookingForward2: [false],

      isNoLookingForward3: [false],
      isMostlyNoLookingForward3: [false],
      isSomewhatLookingForward3: [false],
      isMostlyYesLookingForward3: [false],
      isYesLookingForward3: [false],

      isNoLookingForward4: [false],
      isMostlyNoLookingForward4: [false],
      isSomewhatLookingForward4: [false],
      isMostlyYesLookingForward4: [false],
      isYesLookingForward4: [false],

      isNoLookingForward5: [false],
      isMostlyNoLookingForward5: [false],
      isSomewhatLookingForward5: [false],
      isMostlyYesLookingForward5: [false],
      isYesLookingForward5: [false],

      isNoLookingForward6: [false],
      isMostlyNoLookingForward6: [false],
      isSomewhatLookingForward6: [false],
      isMostlyYesLookingForward6: [false],
      isYesLookingForward6: [false],

      isNoLookingForward7: [false],
      isMostlyNoLookingForward7: [false],
      isSomewhatLookingForward7: [false],
      isMostlyYesLookingForward7: [false],
      isYesLookingForward7: [false],
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
      //  this.indCaseyAssessment = formData;
      //       loader.style.display = 'none';
      //       this.isEdit = true;
      //       // this.isPrint = true;
      //       this.caseyAssessmentForm.disable();
      //     })
    }, 5000)
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
  
}
