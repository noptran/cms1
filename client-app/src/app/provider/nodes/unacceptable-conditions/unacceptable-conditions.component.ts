import { Component, OnInit } from '@angular/core';
import { DefaultValues } from './unacceptable-conditions';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { ProviderService } from '../../provider.service';
import swal from 'sweetalert2';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../../team-form/team-form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnacceptableConditions } from './unacceptable-conditions';
import * as moment from 'moment';


@Component({
  selector: 'app-unacceptable-conditions',
  templateUrl: './unacceptable-conditions.component.html',
  styleUrls: ['./unacceptable-conditions.component.scss']
})

export class UnacceptableConditionsComponent implements OnInit {
  UA: DefaultValues = new DefaultValues();
  unacceptConditions: UnacceptableConditions = new UnacceptableConditions;
  unacceptConditionForm: FormGroup;
  buttonLabel = {
    isLabel: true,
    label: 'Uncheck All'
  };
  isEditControll = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _provider: ProviderService, public _router: Router, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder) { }

  ngOnInit() {
    this.formValidation();
    this.initializeDefaultValues();
    (this._router.url == '/provider/opencard/unacceptable-conditions/detail') ? this.fetchUANodeInfo() : null;
  }

  formAction(source): void {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    const providerUnacceptableCondition = this.generateRequest(source);
    let request = { providerUnacceptableCondition: providerUnacceptableCondition };

    (this.UA.UADeletableData.length > 0) ? this.deleteUAData() : null;

    this._provider.saveUnacceptableCondition(request).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/provider/opencard/unacceptable-conditions/view'])
    })
  }

  fetchUANodeInfo(): void {
    this.isEditControll = true;
    this.unacceptConditionForm.disable();
    this.UA.unacceptConditionListData.map(element => {
      this.setUANodeInfo(element.conditionID);
    });
  }

  setUANodeInfo(conditionID: any): void {
    console.log("conditionID is", conditionID)

    switch (conditionID) {
      case 54:
        this.unacceptConditions.isAdd = true;
        break;

      case 55:
        this.unacceptConditions.isADHD = true;
        break;

      case 15:
        this.unacceptConditions.isAggressionPhy = true;
        break;

      case 14:
        this.unacceptConditions.isAggressionVerbal = true;
        break;

      case 34:
        this.unacceptConditions.isCriminalActivity = true;
        break;

      case 16:
        this.unacceptConditions.isCruelToAnimals = true;
        break;

      case 11:
        this.unacceptConditions.isDefiesAuthHome = true;
        break;

      case 12:
        this.unacceptConditions.isDefiesAuthSchool = true;
        break;

      case 18:
        this.unacceptConditions.isFireStarter = true;
        break;

      case 33:
        this.unacceptConditions.isGangInvolvement = true;
        break;

      case 84:
        this.unacceptConditions.isHygiene = true;
        break;

      case 56:
        this.unacceptConditions.isLies = true;
        break;

      case 57:
        this.unacceptConditions.isOppositional = true;
        break;

      case 37:
        this.unacceptConditions.isProfanity = true;
        break;

      case 7:
        this.unacceptConditions.isRunnerDoesntReturn = true;
        break;

      case 8:
        this.unacceptConditions.isRunsLeaves = true;
        break;

      case 58:
        this.unacceptConditions.isTemperTantrums = true;
        break;

      case 53:
        this.unacceptConditions.isTheft = true;
        break;

      case 59:
        this.unacceptConditions.isTruancy = true;
        break;

      case 17:
        this.unacceptConditions.isVandalism = true;
        break;

      case 80:
        this.unacceptConditions.isDiagnosis = true;
        break;

      case 60:
        this.unacceptConditions.isAspergers = true;
        break;

      case 61:
        this.unacceptConditions.isAutism = true;
        break;

      case 62:
        this.unacceptConditions.isDevelopmentalDelays = true;
        break;

      case 2:
        this.unacceptConditions.isMentalRetardation = true;
        break;

      case 43:
        this.unacceptConditions.isPhysicalDisabilityHearing = true;
        break;

      case 40:
        this.unacceptConditions.isPhysicalNonAmb = true;
        break;

      case 3:
        this.unacceptConditions.isPhysicalDisOther = true;
        break;

      case 44:
        this.unacceptConditions.iisPhysicalDisaSpeech = true;
        break;

      case 42:
        this.unacceptConditions.isPhysicalDisVisual = true;
        break;

      case 63:
        this.unacceptConditions.isAllergies = true;
        break;

      case 64:
        this.unacceptConditions.isAsthma = true;
        break;

      case 1:
        this.unacceptConditions.isBedWetting = true;
        break;

      case 65:
        this.unacceptConditions.isDiabetes = true;
        break;

      case 5:
        this.unacceptConditions.isEatingDisorder = true;
        break;

      case 66:
        this.unacceptConditions.isEncopresis = true;
        break;

      case 67:
        this.unacceptConditions.isEnuresis = true;
        break;

      case 68:
        this.unacceptConditions.isHeartDisease = true;
        break;

      case 36:
        this.unacceptConditions.isHIV = true;
        break;

      case 69:
        this.unacceptConditions.isInfantPreTeam = true;
        break;

      case 70:
        this.unacceptConditions.isInfantDependenance = true;
        break;

      case 72:
        this.unacceptConditions.isMedicalCondition = true;
        break;

      case 28:
        this.unacceptConditions.isPregant = true;
        break;

      case 71:
        this.unacceptConditions.isSeizures = true;
        break;

      case 35:
        this.unacceptConditions.isSexualTransmitted = true;
        break;

      case 78:
        this.unacceptConditions.isTraumaticBrainInjury = true;
        break;

      case 85:
        this.unacceptConditions.isAnxietyDisorder = true;
        break;

      case 73:
        this.unacceptConditions.isBiPolarDisorder = true;
        break;

      case 74:
        this.unacceptConditions.isDepression = true;
        break;

      case 75:
        this.unacceptConditions.isObsessive = true;
        break;

      case 76:
        this.unacceptConditions.isPostTraumaticStress = true;
        break;

      case 77:
        this.unacceptConditions.isPsychoticEpisodes = true;
        break;

      case 19:
        this.unacceptConditions.isSelfInjurioys = true;
        break;

      case 21:
        this.unacceptConditions.isSuicideAttempt = true;
        break;

      case 20:
        this.unacceptConditions.isSuicideIdeation = true;
        break;

      case 86:
        this.unacceptConditions.isSuspectedVictim = true;
        break;

      case 51:
        this.unacceptConditions.isVictimEmotional = true;
        break;

      case 87:
        this.unacceptConditions.isVictimHuman = true;
        break;

      case 52:
        this.unacceptConditions.isVictimPhysical = true;
        break;

      case 22:
        this.unacceptConditions.isVictimSexualAbuse = true;
        break;

      case 1:
        this.unacceptConditions.isBedWettingVictim = true;
        break;

      case 79:
        this.unacceptConditions.isBothAttraction = true;
        break;

      case 39:
        this.unacceptConditions.isMasturbation = true;
        break;

      case 32:
        this.unacceptConditions.isSameSex = true;
        break;

      case 26:
        this.unacceptConditions.isSexAdjudicated = true;
        break;

      case 25:
        this.unacceptConditions.isSexCharged = true;
        break;
      case 27:
        this.unacceptConditions.isSexCompletedTreatment = true;
        break;


      case 50:
        this.unacceptConditions.isSexRegistry = true;
        break;

      case 83:
        this.unacceptConditions.isSexComments = true;
        break;

      case 23:
        this.unacceptConditions.isSexuallyActive = true;
        break;

      case 24:
        this.unacceptConditions.isSexuallyActs = true;
        break;

      case 46:
        this.unacceptConditions.isAlcoholAbuse = true;
        break;

      case 48:
        this.unacceptConditions.isAlcoholDependence = true;
        break;

      case 45:
        this.unacceptConditions.isAlocoholExperimentation = true;
        break;

      case 38:
        this.unacceptConditions.isCigarateSmoking = true;
        break;

      case 10:
        this.unacceptConditions.isDrugAbuse = true;
        break;

      case 47:
        this.unacceptConditions.isDrugDependence = true;
        break;

      case 9:
        this.unacceptConditions.isDrugExperimentation = true;
        break;

      case 49:
        this.unacceptConditions.isHuffing = true;
        break;


      default:
    }
  }

  deleteUAData(): void {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let request = { providerUnacceptableConditionID: this.UA.UADeletableData };
    this._provider.deleteUnacceptableCondition(request).then(() => {
      loader.style.display = 'none';
    })
  }

  generateRequest(source) {
    let unacceptCondition = [];
    Object.keys(source).map(key => {
      if (source[key] == true) {
        let conditionID = this.getConditionID(key, 'SAVE');
        let data = {
          "conditionID": conditionID,
          "providerID": this.UA.providerId,
          "enteredDate": Date.parse(this.UA.currentDate.toDateString()),
          "enteredBy": this.UA.staffName
        }

        if (this._router.url == '/provider/opencard/unacceptable-conditions/new' || (this._router.url == '/provider/opencard/unacceptable-conditions/detail' && !this.isUAConditionIDExist(conditionID))) {
          unacceptCondition.push(data);
        }

      }
      else {
        let conditionID = this.getConditionID(key, 'DELETE');
        (conditionID) ? this.UA.UADeletableData.push(conditionID) : null;
      }

    });
    return unacceptCondition

  }

  isUAConditionIDExist(conditionID: number): boolean {
    let returnValue = false;
    this.UA.unacceptConditionListData.forEach((element) => {
      if (element.conditionID === conditionID) {
        returnValue = true;
      }
    })
    return returnValue
  }

  getConditionID(key, API): any {
    let conditionID: number;
    let returnValue: any;
    switch (key) {
      case 'isAdd':
        conditionID = 54
        break;

      case 'isADHD':
        conditionID = 55
        break;

      case 'isAggressionPhy':
        conditionID = 15
        break;

      case 'isAggressionVerbal':
        conditionID = 14;
        break;

      case 'isCriminalActivity':
        conditionID = 34;
        break;

      case 'isCruelToAnimals':
        conditionID = 16
        break;

      case 'isDefiesAuthHome':
        conditionID = 11
        break;

      case 'isDefiesAuthSchool':
        conditionID = 12
        break;

      case 'isFireStarter':
        conditionID = 18
        break;

      case 'isGangInvolvement':
        conditionID = 33
        break;

      case 'isHygiene':
        conditionID = 84
        break;

      case 'isLies':
        conditionID = 56
        break;

      case 'isOppositional':
        conditionID = 57
        break;

      case 'isProfanity':
        conditionID = 37
        break;

      case 'isRunnerDoesntReturn':
        conditionID = 7
        break;

      case 'isRunsLeaves':
        conditionID = 8
        break;

      case 'isTemperTantrums':
        conditionID = 58
        break;

      case 'isTheft':
        conditionID = 53
        break;

      case 'isTruancy':
        conditionID = 59
        break;

      case 'isVandalism':
        conditionID = 17
        break;

      case 'isDiagnosis':
        conditionID = 80
        break;

      case 'isAspergers':
        conditionID = 60
        break;

      case 'isAutism':
        conditionID = 61
        break;

      case 'isDevelopmentalDelays':
        conditionID = 62
        break;

      case 'isMentalRetardation':
        conditionID = 2
        break;

      case 'isPhysicalDisabilityHearing':
        conditionID = 43;
        break;

      case 'isPhysicalNonAmb':
        conditionID = 40
        break;

      case 'isPhysicalDisOther':
        conditionID = 3
        break;

      case 'iisPhysicalDisaSpeech':
        conditionID = 44
        break;

      case 'isPhysicalDisVisual':
        conditionID = 42
        break;

      case 'isAllergies':
        conditionID = 63
        break;
      case 'isAsthma':
        conditionID = 64
        break;

      case 'isBedWetting':
        conditionID = 1
        break;

      case 'isDiabetes':
        conditionID = 65
        break;

      case 'isEatingDisorder':
        conditionID = 5
        break;

      case 'isEncopresis':
        conditionID = 66
        break;

      case 'isEnuresis':
        conditionID = 67;
        break;

      case 'isHeartDisease':
        conditionID = 68
        break;

      case 'isHIV':
        conditionID = 36
        break;

      case 'isInfantPreTeam':
        conditionID = 69
        break;

      case 'isInfantDependenance':
        conditionID = 70
        break;

      case 'isMedicalCondition':
        conditionID = 72
        break;

      case 'isPregant':
        conditionID = 28
        break;
      case 'isSeizures':
        conditionID = 71
        break;


      case 'isSexualTransmitted':
        conditionID = 35
        break;

      case 'isTraumaticBrainInjury':
        conditionID = 78
        break;

      case 'isAnxietyDisorder':
        conditionID = 85
        break;

      case 'isBiPolarDisorder':
        conditionID = 73
        break;

      case 'isDepression':
        conditionID = 74
        break;

      case 'isObsessive':
        conditionID = 75
        break;

      case 'isPostTraumaticStress':
        conditionID = 76
        break;

      case 'isPsychoticEpisodes':
        conditionID = 77
        break;

      case 'isSelfInjurioys':
        conditionID = 19
        break;
      case 'isSuicideAttempt':
        conditionID = 21
        break;

      case 'isSuicideIdeation':
        conditionID = 20
        break;

      case 'isSuspectedVictim':
        conditionID = 86
        break;

      case 'isVictimEmotional':
        conditionID = 51
        break;

      case 'isVictimHuman':
        conditionID = 87;
        break;

      case 'isVictimPhysical':
        conditionID = 52
        break;

      case 'isVictimSexualAbuse':
        conditionID = 22
        break;

      case 'isBedWettingVictim':
        conditionID = 1
        break;

      case 'isBothAttraction':
        conditionID = 79
        break;

      case 'isMasturbation':
        conditionID = 39
        break;

      case 'isSameSex':
        conditionID = 32
        break;

      case 'isSexAdjudicated':
        conditionID = 26
        break;

      case 'isSexCharged':
        conditionID = 25
        break;

      case 'isSexCompletedTreatment':
        conditionID = 27
        break;

      case 'isSexRegistry':
        conditionID = 50
        break;

      case 'isSexComments':
        conditionID = 83
        break;

      case 'isSexuallyActive':
        conditionID = 23
        break;

      case 'isSexuallyActs':
        conditionID = 24
        break;

      case 'isAlcoholAbuse':
        conditionID = 46
        break;

      case 'isAlcoholDependence':
        conditionID = 48
        break;

      case 'isAlocoholExperimentation':
        conditionID = 45
        break;

      case 'isCigarateSmoking':
        conditionID = 38
        break;

      case 'isDrugAbuse':
        conditionID = 10
        break;

      case 'isDrugDependence':
        conditionID = 47
        break;

      case 'isDrugExperimentation':
        conditionID = 9
        break;

      case 'isHuffing':
        conditionID = 49
        break;


      default:

    }

    if (API == 'SAVE') {
      returnValue = this.getconditionIdByID(conditionID);

    }
    else if (API == 'DELETE') {
      returnValue = this.getproviderconditionIdByID(conditionID);
    }

    return returnValue;
  }

  getproviderconditionIdByID(id: number): any {
    let returnValue: number;
    this.UA.unacceptConditionListData.forEach(data => {
      if (data.conditionID === id) {
        returnValue = data.providerUnacceptableConditionID;
      }
     
    });
    return returnValue;
  }


  getconditionIdByID(id: number): any {
    let returnValue: number;
    console.log("this.UA.unacceptConditionIdList is", this.UA.unacceptConditionIdList);

    this.UA.unacceptConditionIdList.forEach(data => {
      if (data.conditionID === id) {
        returnValue = data.conditionID;
      }
    });
    return returnValue;
  }

  initializeDefaultValues(): void {
    this.setBreadcrumValues();
    this.UA.discardTo = '/provider/opencard/unacceptable-conditions/view';
    this.UA.providerId = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
    this.UA.currentDate = new Date();
    this.UA.staffName = !isNullOrUndefined(localStorage.getItem('UserId')) ? this.getStaffName() : "Admin";
    this.UA.unacceptConditionListData = this._provider.getUnacceptableConditionListData();
    this.getunacceptConditionList();
  }

  getunacceptConditionList(): any {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.getUnAcceptCondition().then((data: any) => {
      this.UA.unacceptConditionIdList = (data.responseStatus) ? data.condition : null;
      loader.style.display = 'none';
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.condition.changedBy) ? data.condition.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.condition.changedDate) ? moment(data.condition.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.condition.enteredBy) ? data.condition.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.condition.enteredDate) ? moment(data.condition.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    }, () => {
      this._opencard.errorHandlers();
      
    })
  }

  setBreadcrumValues(): void {
    this.UA.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider List', href: '/reports/provider/view', active: '' },
      { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Placement Matching', active: '', href: '/provider/dashboard/placement-matching' },
      { label: 'Unacceptable Condition List', active: '', href: '/provider/opencard/unacceptable-conditions/view' },
      { label: 'Unacceptable Condition', active: 'active' }
    );
  }

  editForm(): void {
    this.isEditControll = false;
    this.unacceptConditionForm.enable();
  }

  getStaffName(): any {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    const staffId = localStorage.getItem('UserId');
    this._team.getUserById({ staffID: parseInt(staffId) })
      .then(data => {
        const staffName = data.users.lastName + ' ' + data.users.firstName
        this.UA.staffName = staffName;
        loader.style.display = 'none';
        return staffName;
      }, () => {
        this._opencard.errorHandlers();
      });
  }

  formValidation(): void {
    this.unacceptConditionForm = this._fb.group({
      isAdd: [null],
      isADHD: [null],
      isAggressionPhy: [null],
      isAggressionVerbal: [null],
      isCriminalActivity: [null],
      isCruelToAnimals: [null],
      isDefiesAuthHome: [null],
      isDefiesAuthSchool: [null],
      isFireStarter: [null],
      isGangInvolvement: [null],
      isHygiene: [null],
      isLies: [null],
      isOppositional: [null],
      isProfanity: [null],
      isRunnerDoesntReturn: [null],
      isRunsLeaves: [null],
      isTemperTantrums: [null],
      isTheft: [null],
      isTruancy: [null],
      isVandalism: [null],
      isDiagnosis: [null],
      isAspergers: [null],
      isAutism: [null],
      isDevelopmentalDelays: [null],
      isMentalRetardation: [null],
      isPhysicalDisabilityHearing: [null],
      isPhysicalNonAmb: [null],
      isPhysicalDisOther: [null],
      iisPhysicalDisaSpeech: [null],
      isPhysicalDisVisual: [null],
      isAllergies: [null],
      isAsthma: [null],
      isBedWetting: [null],
      isDiabetes: [null],
      isEatingDisorder: [null],
      isEncopresis: [null],
      isEnuresis: [null],
      isHeartDisease: [null],
      isHIV: [null],
      isInfantPreTeam: [null],
      isInfantDependenance: [null],
      isMedicalCondition: [null],
      isPregant: [null],
      isSeizures: [null],
      isSexualTransmitted: [null],
      isTraumaticBrainInjury: [null],
      isAnxietyDisorder: [null],
      isBiPolarDisorder: [null],
      isDepression: [null],
      isObsessive: [null],
      isPostTraumaticStress: [null],
      isPsychoticEpisodes: [null],
      isSelfInjurioys: [null],
      isSuicideAttempt: [null],
      isSuicideIdeation: [null],
      isSuspectedVictim: [null],
      isVictimEmotional: [null],
      isVictimHuman: [null],
      isVictimPhysical: [null],
      isVictimSexualAbuse: [null],
      isBedWettingVictim: [null],
      isBothAttraction: [null],
      isMasturbation: [null],
      isSameSex: [null],
      isSexAdjudicated: [null],
      isSexCharged: [null],
      isSexCompletedTreatment: [null],
      isSexRegistry: [null],
      isSexComments: [null],
      isSexuallyActive: [null],
      isSexuallyActs: [null],
      isAlcoholAbuse: [null],
      isAlcoholDependence: [null],
      isAlocoholExperimentation: [null],
      isCigarateSmoking: [null],
      isDrugAbuse: [null],
      isDrugDependence: [null],
      isDrugExperimentation: [null],
      isHuffing: [null]
    })
  }

  uncheckAll() {
    this.unacceptConditions = new UnacceptableConditions();
  }

}
