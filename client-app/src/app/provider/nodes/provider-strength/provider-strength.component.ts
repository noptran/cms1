import { Component, OnInit } from '@angular/core';
import { ProviderStrength } from './provider-strength';
import { DefaultValues } from './provider-strength';

import { isNullOrUndefined } from 'util';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderService } from '../../provider.service';
import { Router } from '@angular/router';
import { TeamFormService } from '../../../team-form/team-form.service';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-provider-strength',
  templateUrl: './provider-strength.component.html',
  styleUrls: ['./provider-strength.component.scss']
})
export class ProviderStrengthComponent implements OnInit {
  strength: ProviderStrength = new ProviderStrength();
  providerStrenfthForm: FormGroup;
  PS: DefaultValues = new DefaultValues();
  providerStrengthList = [];
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  isListDis=false
  constructor(public _provider: ProviderService, public _router: Router, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder) { }

  ngOnInit() {
    this.formValidation();
    this.initializeDefaultValues();
    this.getResourceFamilyStrengthList();
    (this._router.url == '/provider/opencard/provider-strength/detail') ? this.fetchPSNodeInfo() : null;
    if(this._router.url == '/provider/opencard/provider-strength/detail'){
      this.isListDis=true;
    }else{
      this.isListDis=false;
    }
  }

  getResourceFamilyStrengthList() {
    const familyStrengthReq = { providerID: parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey() }
    this._opencard.getProviderStrengthList(familyStrengthReq)
      .then((data: any) => {
        data.ProviderStrength.map(ele => {
          ele.current = ele.iscurrent;
          if(ele.strengthID==89){
            ele.strength="Flexible "
        }
        })
        this.providerStrengthList = data.ProviderStrength;
        this.providerStrengthList.map(element => {
          if (element.iscurrent) {
            this.setPSNodeInfo(element.strength);
          }
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.providerStrengthList.changedBy) ? data.providerStrengthList.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.providerStrengthList.changedDate) ? moment(data.providerStrengthList.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.providerStrengthList.enteredBy) ? data.providerStrengthList.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.providerStrengthList.enteredDate) ? moment(data.providerStrengthList.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

        });
      })
  }

  initializeDefaultValues(): void {
    this.setBreadcrumValues();
    this.PS.discardTo = '/provider/opencard/provider-strength/view';
    this.getfCHLevelOfCareList();
    this.PS.providerId = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
    this.PS.currentDate = new Date();
    this.PS.staffName = !isNullOrUndefined(localStorage.getItem('UserId')) ? this.getStaffName() : "Admin";
    this.PS.providerStrengthListData = this._provider.getProviderStrengthListData();
    this.PS.isEdit = false;
  }

  editForm(): void {
    this.PS.isEdit = true;
    this.providerStrenfthForm.enable();
    this.isListDis=false;
  }

  fetchPSNodeInfo(): void {
    this.detailPageActions();
    this.providerStrenfthForm.disable();
    this.PS.isEdit = true;

    // this.PS.providerStrengthListData.map(element => {
    //   this.setPSNodeInfo(element.strength);
    // });
  }

  detailPageActions() {
    this.getResourceFamilyStrengthList();
  }

  setBreadcrumValues(): void {
    this.PS.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider List', href: '/reports/provider/view', active: '' },
      { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Placement Matching', active: '', href: '/provider/dashboard/placement-matching' },
      { label: 'Provider Strength List', active: '', href: '/provider/opencard/provider-strength/view' },
      { label: 'Provider Strength', active: 'active' }
    );
  }


  formValidation(): void {
    this.providerStrenfthForm = this._fb.group({
      isPaperwork: [null],
      isProvidesThorough: [null],

      isStrenghtActiveAdoption: [null],
      isStrengthActiveReint: [null],
      isStrengthFlexible: [null],
      isStrengthPatience: [null],
      isStrengthSupport: [null],
      
      isProviderCultural: [null],
      isProviderEffective: [null],
      isProviderExperience1To5: [null],
      isProviderExperience10To20: [null],
      isProviderExperience5To10: [null],
      isProviderExtendedFamily: [null],
      isProviderFlexible: [null],
      isProviderOpenSuggestion: [null],
      isProviderConsistency: [null],
      isProviderStructure: [null],
      isProviderStrong: [null],
      isProviderWilling: [null],
      isProviderExperience: [null],
      isProviderExperience0To1: [null],
      isProviderExperienceOver20: [null],
      isProviderPartners: [null],
      isProviderUtilize: [null],
      isProviderCommunicates: [null],
      isExperiecneCultural: [null],
      isExperienceEffective: [null],
      isExperience1To5: [null],
      isExperience10To20: [null],
      isExperience5To10: [null],
      isExperienceExtended: [null],
      isExperienceFlexible: [null],
      isExperienceOpen: [null],
      isExperienceConsistency: [null],
      isExperienceStructure: [null],
      isExperienceStrong: [null],
      isExperienceUtilize: [null],
      isExperienceWilling: [null],
      isExperience: [null],
      isExperience0To1: [null],
      isExperienceOver20: [null],
      isExperiencePartners: [null],


      isExperienceWithADHD: [null],
      isExperienceWithAutism: [null],
      isExperienceWithDeaf_SignLanguage: [null],
      isExperienceWithIndependentLivingSkills: [null],
      isExperienceWithFireStarters: [null],
      isExperienceWithFAS_FAE: [null],
      isExperienceWithMedicalNeeds_Concerns: [null],
      isExperienceWithMR_DD: [null],
      isExperienceWithNon_EnglishSpeakingFamilies: [null],
      isExperienceWithPhysicalAggression: [null],
      isExperienceWithRAD: [null],
      isExperienceWithSexualOffenders: [null],
      isExperienceWithSpanishSpeakingFamilies: [null],
      isExperienceWithTeenParents: [null],
      isExperienceWithVerbalAggression: [null],
      isExperienceWithJuvenileOffenders: [null],
      isProviderWorksWelFamilies: [null],
    })
  }

  formAction(source): void {
    console.log("providerStrengthList>>>>>", this.providerStrengthList);
    // if ((this._router.url == '/provider/opencard/provider-strength/detail')) {
    //   //
    // }
    // else {

      let loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      // const providerStrength = this.generateRequest(source);
      let request = { ProviderStrength: this.providerStrengthList };
      // console.log("request is", request);
      // console.log("providerStrength is", providerStrength);
      // (this.PS.PSDeletableData.length > 0) ? this.deletePSData() : null;
      this._provider.saveProviderStrength(request).then(() => {
        loader.style.display = 'none';
        swal('Success', 'Record has been saved!', 'success');
        this._router.navigate(['/provider/opencard/provider-strength/view'])
      })
    // }

  }

  generateRequest(source) {
    let providerStrength = [];
    console.log("source>>>>>", source);
    Object.keys(source).map(key => {
      if (source[key] == true) {
        let strengthID = this.getStrengthID(key, 'SAVE');
        console.log("strengthID is", strengthID);

        let data = {
          "strengthID": strengthID,
          "providerID": this.PS.providerId,
          "enteredDate": Date.parse(this.PS.currentDate.toDateString()),
          "enteredBy": this.PS.staffName,
          "current": true,
          "explanation": "explanation",
          "changedBy": this.PS.staffName,
          "changedDate": Date.parse(this.PS.currentDate.toDateString()),
        }

        if (this._router.url == '/provider/opencard/provider-strength/new' || (this._router.url == '/provider/opencard/provider-strength/detail' && !this.isproviderStrengthIDExist(strengthID))) {
          providerStrength.push(data);
        }

      }
      else {
        let providerStrengthID = this.getStrengthID(key, 'DELETE');
        (providerStrengthID) ? this.PS.PSDeletableData.push(providerStrengthID) : null;
      }

    });
    return providerStrength

  }

  getStrengthID(key, API): any {
    let PSLabel: string;
    let returnValue: any;
    switch (key) {
      case 'isPaperwork':
        PSLabel = "Paperwork Completed Timely";
        break;

      case 'isProvidesThorough':
        PSLabel = "Provides Thorough Documentation";
        break;

      case 'isStrenghtActiveAdoption':
        PSLabel = "Actively Participates With/In Adoption Plans";
        break;

      case 'isStrengthActiveReint':
        PSLabel = "Actively Participates With/In Reintegration Plans";
        break;

      case 'isStrengthFlexible':
        PSLabel = "Flexible ";
        break;

      case 'isStrengthPatience':
        PSLabel = "Patience";
        break;

      case 'isStrengthSupport':
        PSLabel = "Support Children's Activities/Work";
        break;

      case 'isProviderCommunicates':
        PSLabel = "Communicates Effectively";
        break;

      case 'isProviderCultural':
        PSLabel = "Culturally Sensitive";
        break;

      case 'isProviderEffective':
        PSLabel = "Effectively Uses Positive Discipline Techniques";
        break;

      case 'isProviderExperience1To5':
        PSLabel = "Experience in Foster Care (1-5 yrs)";
        break;

      case 'isProviderExperience10To20':
        PSLabel = "Experience in Foster Care (10-20 yrs)";
        break;

      case 'isProviderExperience5To10':
        PSLabel = "Experience in Foster Care (5-10 yrs)";
        break;

      case 'isProviderExtendedFamily':
        PSLabel = "Extended Family Supports";
        break;

      case 'isProviderFlexible':
        PSLabel = "Flexible";
        break;


      case 'isProviderConsistency':
        PSLabel = "Provides Consistency For Children In Their Home";
        break;

      case 'isProviderStructure':
        PSLabel = "Provides Structure For Children In Their Home";
        break;

      case 'isProviderStrong':
        PSLabel = "Strong Advocate For Children Placed In Their Home";
        break;

      case 'isProviderWilling':
        PSLabel = "Willing To Take Teen Placements";
        break;

      case 'isProviderCommunicates':
        PSLabel = "Communicates Effectively";
        break;

      case 'isProviderExperience0To1':
        PSLabel = "Experience in Foster Care (0-1 yrs)";
        break;

      case 'isProviderExperienceOver20':
        PSLabel = "Experience in Foster Care (over 20 yrs)";
        break;

      case 'isProviderPartners':
        PSLabel = "Partners Well With Staff, Therapists, Schools, etc";
        break;

      case 'isProviderUtilize':
        PSLabel = "Utilizes Community Resources";
        break;

      case 'isProviderCommunicates':
        PSLabel = "Communicates Effectively";
        break;

      case 'isExperiecneCultural':
        PSLabel = "Culturally Sensitive";
        break;

      case 'isExperienceEffective':
        PSLabel = "Effectively Uses Positive Discipline Techniques";
        break;

      case 'isExperience1To5':
        PSLabel = "Experience in Foster Care (1-5 yrs)";
        break;

      case 'isExperience10To20':
        PSLabel = "Experience in Foster Care (10-20 yrs)";
        break;

      case 'isExperience5To10':
        PSLabel = "Experience in Foster Care (5-10 yrs)";
        break;

      case 'isExperienceExtended':
        PSLabel = "Extended Family Supports";
        break;

      case 'isExperienceFlexible':
        PSLabel = "Flexible";
        break;

      case 'isExperienceOpen':
        PSLabel = "Open To Suggestions";
        break;

      case 'isExperienceConsistency':
        PSLabel = "Provides Consistency For Children In Their Home";
        break;

      case 'isExperienceStructure':
        PSLabel = "Provides Structure For Children In Their Home";
        break;

      case 'isExperienceStrong':
        PSLabel = "Strong Advocate For Children Placed In Their Home";
        break;

      case 'isExperienceUtilize':
        PSLabel = "Utilizes Community Resources";
        break;

      case 'isExperienceWilling':
        PSLabel = "Willing To Take Teen Placements";
        break;

      case 'isExperience':
        PSLabel = "Experience in Foster Care (0-1 yrs)";
        break;


      case 'isExperience0To1':
        PSLabel = "Experience in Foster Care (0-1 yrs)";
        break;

      case 'isExperienceOver20':
        PSLabel = "Experience in Foster Care (over 20 yrs)";
        break;

      case 'isExperiencePartners':
        PSLabel = "Partners Well With Staff, Therapists, Schools, etc";
        break;





      case 'isExperienceWithADHD':
        PSLabel = "Experience with ADHD";
        break;

      case 'isExperienceWithAutism':
        PSLabel = "Experience with Autism";
        break;

      case 'isExperienceWithDeaf_SignLanguage':
        PSLabel = "Experience with Deaf/Sign Language";
        break;

      case 'isExperienceWithFAS_FAE':
        PSLabel = "Experience with FAS/FAE";
        break;

      case 'isExperienceWithFireStarters':
        PSLabel = "Experience with Fire Starters";
        break;

      case 'isExperienceWithIndependentLivingSkills':
        PSLabel = "Experience with Independent Living Skills";
        break;

      case 'isExperienceWithMedicalNeeds_Concerns':
        PSLabel = "Experience with Medical Needs/Concerns";
        break;

      case 'isExperienceWithMR_DD':
        PSLabel = "Experience with MR/DD";
        break;

      case 'isExperienceWithNon_EnglishSpeakingFamilies':
        PSLabel = "Experience with Non-English Speaking Families";
        break;

      case 'isExperienceWithPhysicalAggression':
        PSLabel = "Experience with Physical Aggression";
        break;
        case 'isExperienceWithJuvenileOffenders':
          PSLabel = "Experience with Juvenile Offenders";
          break;
      case 'isExperienceWithRAD':
        PSLabel = "Experience with RAD";
        break;

      case 'isExperienceWithSexualOffenders':
        PSLabel = "Experience with Sexual Offenders";
        break;

      case 'isExperienceWithSpanishSpeakingFamilies':
        PSLabel = "Experience with Spanish Speaking Families";
        break;

      case 'isExperienceWithTeenParents':
        PSLabel = "Experience with Teen Parents";
        break;

      case 'isExperienceWithVerbalAggression':
        PSLabel = "Experience with Verbal Aggression";
        break;
        case 'isProviderWorksWelFamilies':
          PSLabel = "Works Well With Birth/Adoptive Families";
          break;
          case 'isProviderOpenSuggestion':
            PSLabel = "Open To Suggestions";
            break;
      default:

    }

    if (API == 'SAVE') {
      returnValue = this.getProviderStrengthIdByLabel(PSLabel);

    }
    else if (API == 'DELETE') {
      returnValue = this.getproviderStrengthIDByLabel(PSLabel);
    }
    console.log("returnValue is---", returnValue);

    return returnValue;
  }

  getproviderStrengthIDByLabel(label: string): any {
    let returnValue: number;
    this.PS.providerStrengthIdList.forEach(data => {
      if (data.strength === label) {
        returnValue = data.providerStrengthID;
      }
    });
    return returnValue;
  }

  getProviderStrengthIdByLabel(label: string): any {
    let returnValue: number;
    this.PS.providerStrengthIdList.forEach(data => {
      if (data.strength === label) {
        returnValue = data.strengthID;
      }
    });
    console.log("returnValue in getProviderStrengthIdByLabel is", returnValue);

    return returnValue;
  }

  getfCHLevelOfCareList(): any {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.getproviderStrengths().then((data: any) => {
      data.strengths.map(ele=>{
        if(ele.strengthID==89){
            ele.strength="Flexible "
        }
      })
      this.PS.providerStrengthIdList = (data.responseStatus) ? data.strengths : null;
      loader.style.display = 'none';
    }, () => {
      this._opencard.errorHandlers();
    })
  }

  getStaffName(): any {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    const staffId = localStorage.getItem('UserId');
    this._team.getUserById({ staffID: parseInt(staffId) })
      .then(data => {
        const staffName = data.users.lastName + ' ' + data.users.firstName
        this.PS.staffName = staffName;
        loader.style.display = 'none';
        return staffName;
      }, () => {
        this._opencard.errorHandlers();
      });
  }

  isproviderStrengthIDExist(providerStrengthID: number): boolean {
    let returnValue = false;
    this.PS.providerStrengthListData.forEach((element) => {
      if (element.providerStrengthID === providerStrengthID) {
        returnValue = true;
      }
    })
    return returnValue
  }

  deletePSData(): void {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let request = { providerStrengthID: this.PS.PSDeletableData };
    this._provider.deleteProviderStrength(request).then(() => {
      loader.style.display = 'none';
    })
  }

  setPSNodeInfo(PS: any): void {
    switch (PS) {
      case 'Paperwork Completed Timely':
        this.strength.isPaperwork = true;
        break;

      case 'Provides Thorough Documentation':
        this.strength.isProvidesThorough = true;
        break;

      case 'Actively Participates With/In Adoption Plans':
        this.strength.isStrenghtActiveAdoption = true;
        break;

      case 'Actively Participates With/In Reintegration Plans':
        this.strength.isStrengthActiveReint = true;
        break;

      case 'Flexible ':
        this.strength.isStrengthFlexible = true;
        break;

      case 'Patience':
        this.strength.isStrengthPatience = true;
        break;

      case "Support Children's Activities/Work":
        this.strength.isStrengthSupport = true;
        break;

      case 'Communicates Effectively':
        this.strength.isProviderCommunicates = true;
        break;

      case 'Culturally Sensitive':
        this.strength.isProviderCultural = true;
        break;

      case 'Effectively Uses Positive Discipline Techniques':
        this.strength.isProviderEffective = true;
        break;

      case 'Experience in Foster Care (1-5 yrs)':
        this.strength.isProviderExperience1To5 = true;
        break;

      case 'Experience in Foster Care (10-20 yrs)':
        this.strength.isProviderExperience10To20 = true;
        break;

      case 'Experience in Foster Care (5-10 yrs)':
        this.strength.isProviderExperience5To10 = true;
        break;

      case 'Extended Family Supports':
        this.strength.isProviderExtendedFamily = true;
        break;

      case 'Flexible':
        this.strength.isProviderFlexible = true;
        break;

      case 'Provides Consistency For Children In Their Home':
        this.strength.isProviderConsistency = true;
        break;

      case 'Provides Structure For Children In Their Home':
        this.strength.isProviderStructure = true;
        break;

      case 'Strong Advocate For Children Placed In Their Home':
        this.strength.isProviderStrong = true;
        break;

      case 'Willing To Take Teen Placements':
        this.strength.isProviderWilling = true;
        break;

      case 'Communicates Effectively':
        this.strength.isProviderCommunicates = true;
        break;

      case 'Experience in Foster Care (0-1 yrs)':
        this.strength.isProviderExperience0To1 = true;
        break;

      case 'Experience in Foster Care (over 20 yrs)':
        this.strength.isProviderExperienceOver20 = true;
        break;

      case 'Partners Well With Staff, Therapists, Schools, etc':
        this.strength.isProviderPartners = true;
        break;

      case 'Utilizes Community Resources':
        this.strength.isProviderUtilize = true;
        break;
      // lllllllllllllllllllllllllllllllllllllllllllll
      case 'Communicates Effectively':
        this.strength.isProviderCommunicates = true;
        break;

      case 'Culturally Sensitive':
        this.strength.isExperiecneCultural = true;
        break;

      case 'Effectively Uses Positive Discipline Techniques':
        this.strength.isExperienceEffective = true;
        break;

      case 'Experience in Foster Care (1-5 yrs)':
        this.strength.isExperience1To5 = true;
        break;

      case 'Experience in Foster Care (10-20 yrs)':
        this.strength.isExperience10To20 = true;
        break;

      case 'Experience in Foster Care (5-10 yrs)':
        this.strength.isExperience5To10 = true;
        break;

      case 'Extended Family Supports':
        this.strength.isExperienceExtended = true;
        break;

      case 'Flexible':
        this.strength.isExperienceFlexible = true;
        break;

      case 'Open To Suggestions':
        this.strength.isExperienceOpen = true;
        break;

      case 'Provides Consistency For Children In Their Home':
        this.strength.isExperienceConsistency = true;
        break;

      case 'Provides Structure For Children In Their Home':
        this.strength.isExperienceStructure = true;
        break;

      case 'Strong Advocate For Children Placed In Their Home':
        this.strength.isExperienceStrong = true;
        break;

      case 'Utilizes Community Resources':
        this.strength.isExperienceUtilize = true;
        break;

      case 'Willing To Take Teen Placements':
        this.strength.isExperienceWilling = true;
        break;

      case 'Experience in Foster Care (0-1 yrs)':
        this.strength.isExperience0To1 = true;
        break;


      case 'Experience in Foster Care (0-1 yrs)':
        this.strength.isExperience0To1 = true;
        break;

      case 'Experience in Foster Care (over 20 yrs)':
        this.strength.isExperienceOver20 = true;
        break;

      case 'Partners Well With Staff, Therapists, Schools, etc':
        this.strength.isExperiencePartners = true;
        break;




      case 'Experience with ADHD':
        this.strength.isExperienceWithADHD = true;
        break;

      case 'Experience with Autism':
        this.strength.isExperienceWithAutism = true;
        break;

      case 'Experience with Deaf/Sign Language':
        this.strength.isExperienceWithDeaf_SignLanguage = true;
        break;

      case 'Experience with FAS/FAE':
        this.strength.isExperienceWithFAS_FAE = true;
        break;

      case 'Experience with Fire Starters':
        this.strength.isExperienceWithFireStarters = true;
        break;

      case 'Experience with Independent Living Skills':
        this.strength.isExperienceWithIndependentLivingSkills = true;
        break;

      case 'Experience with Medical Needs/Concerns':
        this.strength.isExperienceWithMedicalNeeds_Concerns = true;
        break;

      case 'Experience with MR/DD':
        this.strength.isExperienceWithMR_DD = true;
        break;

      case 'Experience with Non-English Speaking Families':
        this.strength.isExperienceWithNon_EnglishSpeakingFamilies = true;
        break;
        case 'Experience with Juvenile Offenders':
          this.strength.isExperienceWithJuvenileOffenders = true;
          break;
      case 'Experience with Physical Aggression':
        this.strength.isExperienceWithPhysicalAggression = true;
        break;

      case 'Experience with RAD':
        this.strength.isExperienceWithRAD = true;
        break;

      case 'Experience with Sexual Offenders':
        this.strength.isExperienceWithSexualOffenders = true;
        break;

      case 'Experience with Spanish Speaking Families':
        this.strength.isExperienceWithSpanishSpeakingFamilies = true;
        break;

      case 'Experience with Teen Parents':
        this.strength.isExperienceWithTeenParents = true;
        break;

      case 'Experience with Verbal Aggression':
        this.strength.isExperienceWithVerbalAggression = true;
        break;

        case 'Works Well With Birth/Adoptive Families':
          this.strength.isProviderWorksWelFamilies = true;
          break;

          case 'Open To Suggestions':
            this.strength.isProviderOpenSuggestion = true;
            break;
      default:
    }
  }
  setPSNodeInfoFalse(PS: any): void {
    switch (PS) {
      case 'Paperwork Completed Timely':
        this.strength.isPaperwork = false;
        break;

      case 'Provides Thorough Documentation':
        this.strength.isProvidesThorough = false;
        break;

      case 'Actively Participates With/In Adoption Plans':
        this.strength.isStrenghtActiveAdoption = false;
        break;

      case 'Actively Participates With/In Reintegration Plans':
        this.strength.isStrengthActiveReint = false;
        break;

      case 'Flexible ':
        this.strength.isStrengthFlexible = false;
        break;

      case 'Patience':
        this.strength.isStrengthPatience = false;
        break;

      case "Support Children's Activities/Work":
        this.strength.isStrengthSupport = false;
        break;

      case 'Communicates Effectively':
        this.strength.isProviderCommunicates = false;
        break;

      case 'Culturally Sensitive':
        this.strength.isProviderCultural = false;
        break;

      case 'Effectively Uses Positive Discipline Techniques':
        this.strength.isProviderEffective = false;
        break;

      case 'Experience in Foster Care (1-5 yrs)':
        this.strength.isProviderExperience1To5 = false;
        break;

      case 'Experience in Foster Care (10-20 yrs)':
        this.strength.isProviderExperience10To20 = false;
        break;

      case 'Experience in Foster Care (5-10 yrs)':
        this.strength.isProviderExperience5To10 = false;
        break;

      case 'Extended Family Supports':
        this.strength.isProviderExtendedFamily = false;
        break;

      case 'Flexible':
        this.strength.isProviderFlexible = false;
        break;

      case 'Provides Consistency For Children In Their Home':
        this.strength.isProviderConsistency = false;
        break;

      case 'Provides Structure For Children In Their Home':
        this.strength.isProviderStructure = false;
        break;

      case 'Strong Advocate For Children Placed In Their Home':
        this.strength.isProviderStrong = false;
        break;

      case 'Willing To Take Teen Placements':
        this.strength.isProviderWilling = false;
        break;

      case 'Communicates Effectively':
        this.strength.isProviderCommunicates = false;
        break;

      case 'Experience in Foster Care (0-1 yrs)':
        this.strength.isProviderExperience0To1 = false;
        break;

      case 'Experience in Foster Care (over 20 yrs)':
        this.strength.isProviderExperienceOver20 = false;
        break;

      case 'Partners Well With Staff, Therapists, Schools, etc':
        this.strength.isProviderPartners = false;
        break;

      case 'Utilizes Community Resources':
        this.strength.isProviderUtilize = false;
        break;
      // lllllllllllllllllllllllllllllllllllllllllllll
      case 'Communicates Effectively':
        this.strength.isProviderCommunicates = false;
        break;

      case 'Culturally Sensitive':
        this.strength.isExperiecneCultural = false;
        break;

      case 'Effectively Uses Positive Discipline Techniques':
        this.strength.isExperienceEffective = false;
        break;

      case 'Experience in Foster Care (1-5 yrs)':
        this.strength.isExperience1To5 = false;
        break;

      case 'Experience in Foster Care (10-20 yrs)':
        this.strength.isExperience10To20 = false;
        break;

      case 'Experience in Foster Care (5-10 yrs)':
        this.strength.isExperience5To10 = false;
        break;

      case 'Extended Family Supports':
        this.strength.isExperienceExtended = false;
        break;

      case 'Flexible':
        this.strength.isExperienceFlexible = false;
        break;

      case 'Open To Suggestions':
        this.strength.isExperienceOpen = false;
        break;

      case 'Provides Consistency For Children In Their Home':
        this.strength.isExperienceConsistency = false;
        break;

      case 'Provides Structure For Children In Their Home':
        this.strength.isExperienceStructure = false;
        break;

      case 'Strong Advocate For Children Placed In Their Home':
        this.strength.isExperienceStrong = false;
        break;

      case 'Utilizes Community Resources':
        this.strength.isExperienceUtilize = false;
        break;

      case 'Willing To Take Teen Placements':
        this.strength.isExperienceWilling = false;
        break;

      case 'Experience in Foster Care (0-1 yrs)':
        this.strength.isExperience0To1 = false;
        break;


      case 'Experience in Foster Care (0-1 yrs)':
        this.strength.isExperience0To1 = false;
        break;

      case 'Experience in Foster Care (over 20 yrs)':
        this.strength.isExperienceOver20 = false;
        break;

      case 'Partners Well With Staff, Therapists, Schools, etc':
        this.strength.isExperiencePartners = false;
        break;




      case 'Experience with ADHD':
        this.strength.isExperienceWithADHD = false;
        break;

      case 'Experience with Autism':
        this.strength.isExperienceWithAutism = false;
        break;

      case 'Experience with Deaf/Sign Language':
        this.strength.isExperienceWithDeaf_SignLanguage = false;
        break;

      case 'Experience with FAS/FAE':
        this.strength.isExperienceWithFAS_FAE = false;
        break;

      case 'Experience with Fire Starters':
        this.strength.isExperienceWithFireStarters = false;
        break;

      case 'Experience with Independent Living Skills':
        this.strength.isExperienceWithIndependentLivingSkills = false;
        break;

      case 'Experience with Medical Needs/Concerns':
        this.strength.isExperienceWithMedicalNeeds_Concerns = false;
        break;

      case 'Experience with MR/DD':
        this.strength.isExperienceWithMR_DD = false;
        break;

      case 'Experience with Non-English Speaking Families':
        this.strength.isExperienceWithNon_EnglishSpeakingFamilies = false;
        break;

      case 'Experience with Physical Aggression':
        this.strength.isExperienceWithPhysicalAggression = false;
        break;
        case 'Experience with Juvenile Offenders':
          this.strength.isExperienceWithJuvenileOffenders = false;
          break;
      case 'Experience with RAD':
        this.strength.isExperienceWithRAD = false;
        break;

      case 'Experience with Sexual Offenders':
        this.strength.isExperienceWithSexualOffenders = false;
        break;

      case 'Experience with Spanish Speaking Families':
        this.strength.isExperienceWithSpanishSpeakingFamilies = false;
        break;

      case 'Experience with Teen Parents':
        this.strength.isExperienceWithTeenParents = false;
        break;

      case 'Experience with Verbal Aggression':
        this.strength.isExperienceWithVerbalAggression = false;
        break;

        case 'Works Well With Birth/Adoptive Families':
          this.strength.isProviderWorksWelFamilies = false;
          break;
          case 'Open To Suggestions':
            this.strength.isProviderOpenSuggestion = false;
            break;
      default:
    }
  }
  // providerStrengthLists = []
  onCheckboxSelect(source, key) {
    var allIDS = [];
    let strengthData = this.getStrengthIDandName(key);
    if (source == true) {
      this.providerStrengthList.map(itm => {
        allIDS.push(itm.strengthID);
      })
      var alreadyData = allIDS.includes(strengthData.strengthID);
      if (alreadyData) {
        swal('Warning', 'Already Added', 'info');
      } else {
        this.providerStrengthList.push(strengthData);
      }
    } else {
      // var inde = this.providerStrengthList.map((o) => { return o.strengthID }).indexOf(strengthData.strengthID);
      // this.providerStrengthList.splice(inde, 1);
    }
    console.log("out>>", this.providerStrengthList);
  };
  deleteRec(data) {
    if (data.providerStrengthID) {
      let loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      let request = { providerStrengthID: [data.providerStrengthID] };
      this._provider.deleteProviderStrength(request).then(() => {
        this.getResourceFamilyStrengthList();
        this.setPSNodeInfoFalse(data.strength);
        loader.style.display = 'none';
      })
    } else {
      let loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'block';
      var inde = this.providerStrengthList.map((o) => { return o.strengthID }).indexOf(data.strengthID);
      this.providerStrengthList.splice(inde, 1);
      this.setPSNodeInfoFalse(data.strength);
      // this.providerStrengthList[inde].key_data = false;
      Object.keys(data).map(key => {
        console.log("this.strength[data.key_data]>>><<<<", this.strength[data.key_data]);
        console.log("key>>><<<<", key);
        this.strength[data.key_data] = false;
        loader.style.display = 'none';
      });
    }
  }
  getStrengthIDandName(key) {
    let key_data = key;
    let PSLabel: string;
    let returnValue: any;
    switch (key) {
      case 'isPaperwork':
        PSLabel = "Paperwork Completed Timely";
        break;

      case 'isProvidesThorough':
        PSLabel = "Provides Thorough Documentation";
        break;

      case 'isStrenghtActiveAdoption':
        PSLabel = "Actively Participates With/In Adoption Plans";
        break;

      case 'isStrengthActiveReint':
        PSLabel = "Actively Participates With/In Reintegration Plans";
        break;

      case 'isStrengthFlexible':
        PSLabel = "Flexible ";
        break;

      case 'isStrengthPatience':
        PSLabel = "Patience";
        break;

      case 'isStrengthSupport':
        PSLabel = "Support Children's Activities/Work";
        break;

      case 'isProviderCommunicates':
        PSLabel = "Communicates Effectively";
        break;

      case 'isProviderCultural':
        PSLabel = "Culturally Sensitive";
        break;

      case 'isProviderEffective':
        PSLabel = "Effectively Uses Positive Discipline Techniques";
        break;

      case 'isProviderExperience1To5':
        PSLabel = "Experience in Foster Care (1-5 yrs)";
        break;

      case 'isProviderExperience10To20':
        PSLabel = "Experience in Foster Care (10-20 yrs)";
        break;

      case 'isProviderExperience5To10':
        PSLabel = "Experience in Foster Care (5-10 yrs)";
        break;

      case 'isProviderExtendedFamily':
        PSLabel = "Extended Family Supports";
        break;

      case 'isProviderFlexible':
        PSLabel = "Flexible";
        break;

   

      case 'isProviderConsistency':
        PSLabel = "Provides Consistency For Children In Their Home";
        break;

      case 'isProviderStructure':
        PSLabel = "Provides Structure For Children In Their Home";
        break;

      case 'isProviderStrong':
        PSLabel = "Strong Advocate For Children Placed In Their Home";
        break;

      case 'isProviderWilling':
        PSLabel = "Willing To Take Teen Placements";
        break;

      case 'isProviderCommunicates':
        PSLabel = "Communicates Effectively";
        break;

      case 'isProviderExperience0To1':
        PSLabel = "Experience in Foster Care (0-1 yrs)";
        break;

      case 'isProviderExperienceOver20':
        PSLabel = "Experience in Foster Care (over 20 yrs)";
        break;

      case 'isProviderPartners':
        PSLabel = "Partners Well With Staff, Therapists, Schools, etc";
        break;

      case 'isProviderUtilize':
        PSLabel = "Utilizes Community Resources";
        break;

      case 'isProviderCommunicates':
        PSLabel = "Communicates Effectively";
        break;

      case 'isExperiecneCultural':
        PSLabel = "Culturally Sensitive";
        break;

      case 'isExperienceEffective':
        PSLabel = "Effectively Uses Positive Discipline Techniques";
        break;

      case 'isExperience1To5':
        PSLabel = "Experience in Foster Care (1-5 yrs)";
        break;

      case 'isExperience10To20':
        PSLabel = "Experience in Foster Care (10-20 yrs)";
        break;

      case 'isExperience5To10':
        PSLabel = "Experience in Foster Care (5-10 yrs)";
        break;

      case 'isExperienceExtended':
        PSLabel = "Extended Family Supports";
        break;

      case 'isExperienceFlexible':
        PSLabel = "Flexible";
        break;

      case 'isExperienceOpen':
        PSLabel = "Open To Suggestions";
        break;

      case 'isExperienceConsistency':
        PSLabel = "Provides Consistency For Children In Their Home";
        break;

      case 'isExperienceStructure':
        PSLabel = "Provides Structure For Children In Their Home";
        break;

      case 'isExperienceStrong':
        PSLabel = "Strong Advocate For Children Placed In Their Home";
        break;

      case 'isExperienceUtilize':
        PSLabel = "Utilizes Community Resources";
        break;

      case 'isExperienceWilling':
        PSLabel = "Willing To Take Teen Placements";
        break;

      case 'isExperience':
        PSLabel = "Experience in Foster Care (0-1 yrs)";
        break;


      case 'isExperience0To1':
        PSLabel = "Experience in Foster Care (0-1 yrs)";
        break;

      case 'isExperienceOver20':
        PSLabel = "Experience in Foster Care (over 20 yrs)";
        break;

      case 'isExperiencePartners':
        PSLabel = "Partners Well With Staff, Therapists, Schools, etc";
        break;

      case 'isExperienceWithADHD':
        PSLabel = "Experience with ADHD";
        break;

      case 'isExperienceWithAutism':
        PSLabel = "Experience with Autism";
        break;

      case 'isExperienceWithDeaf_SignLanguage':
        PSLabel = "Experience with Deaf/Sign Language";
        break;

      case 'isExperienceWithFAS_FAE':
        PSLabel = "Experience with FAS/FAE";
        break;

      case 'isExperienceWithFireStarters':
        PSLabel = "Experience with Fire Starters";
        break;

      case 'isExperienceWithIndependentLivingSkills':
        PSLabel = "Experience with Independent Living Skills";
        break;

      case 'isExperienceWithMedicalNeeds_Concerns':
        PSLabel = "Experience with Medical Needs/Concerns";
        break;

      case 'isExperienceWithMR_DD':
        PSLabel = "Experience with MR/DD";
        break;

      case 'isExperienceWithNon_EnglishSpeakingFamilies':
        PSLabel = "Experience with Non-English Speaking Families";
        break;
        case 'isExperienceWithJuvenileOffenders':
          PSLabel = "Experience with Juvenile Offenders";
          break;
      case 'isExperienceWithPhysicalAggression':
        PSLabel = "Experience with Physical Aggression";
        break;

      case 'isExperienceWithRAD':
        PSLabel = "Experience with RAD";
        break;

      case 'isExperienceWithSexualOffenders':
        PSLabel = "Experience with Sexual Offenders";
        break;

      case 'isExperienceWithSpanishSpeakingFamilies':
        PSLabel = "Experience with Spanish Speaking Families";
        break;

      case 'isExperienceWithTeenParents':
        PSLabel = "Experience with Teen Parents";
        break;

      case 'isExperienceWithVerbalAggression':
        PSLabel = "Experience with Verbal Aggression";
        break;
        case 'isProviderWorksWelFamilies':
          PSLabel = "Works Well With Birth/Adoptive Families";
          break;
          case 'isProviderOpenSuggestion':
            PSLabel = "Open To Suggestions";
            break;
      default:

    }
    returnValue = this.getProviderStrengthIdLabel(PSLabel, key_data);
    return returnValue;
  };
  getProviderStrengthIdLabel(label, key_data): any {
    let returnValue: number;
    this.PS.providerStrengthIdList.forEach(data => {
      data['key_data'] = key_data;
      data['providerID'] = this.PS.providerId;
      data['enteredDate'] = Date.parse(this.PS.currentDate.toDateString());
      data['enteredBy'] = this.PS.staffName;
      data['current'] = false;
      data['changedBy'] = this.PS.staffName;
      data['explanation'] = '';
      data['changedDate'] = Date.parse(this.PS.currentDate.toDateString());
      if (data.strength === label) {
        returnValue = data;
      }
    });
    console.log("returnValue in getProviderStrengthIdByLabel is", returnValue);

    return returnValue;
  }
  // resetAction(catagory, model) {
  //   this.strength = new ProviderStrength();
  //   this.strength[model] = true;

  // }
}
