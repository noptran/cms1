import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FchLevelCare } from './fch-level-care';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { TeamFormService } from '../../../team-form/team-form.service';
import { FchDefaultValues } from './fch-level-care';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { ProviderService } from '../../provider.service';
import swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-fch-level-care',
  templateUrl: './fch-level-care.component.html',
  styleUrls: ['./fch-level-care.component.scss']
})
export class FchLevelCareComponent implements OnInit {
  fchLevelCare: FchLevelCare = new FchLevelCare();
  fchLevelCareForm: FormGroup;
  FCH: FchDefaultValues = new FchDefaultValues();
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  buttonLabel = {
    isLabel: true,
    label: 'Uncheck All'
  }
  constructor(public _provider: ProviderService, public _router: Router, public _team: TeamFormService, public _opencard: OpencardsService, public _fb: FormBuilder) { }

  ngOnInit() {
    this.formValidation();
    this.initializeDefaultValues();
    (this._router.url == '/provider/opencard/fch-level-care/detail') ? this.fetchFchLevelNodeInfo() : null;
  }

  initializeDefaultValues(): void {
    this.setBreadcrumValues();
    this.FCH.discardTo = '/provider/opencard/fch-level-care/view';
    this.FCH.isEdit = false;
    this.FCH.providerId = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
    this.FCH.staffName = !isNullOrUndefined(localStorage.getItem('UserId')) ? this.getStaffName() : "Admin";
    this.FCH.currentDate = new Date();
    this.getfCHLevelOfCareList();
    this.FCH.fchLevelListData = this._provider.getFchLevelListData();
  }

  getfCHLevelOfCareList(): any {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._provider.getFchLevelOfCare().then((data: any) => {
      this.FCH.fchLevelIdList = (data.responseStatus) ? data.fchLevelOfCareList : null;
      loader.style.display = 'none';
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.fchLevelOfCareList.changedBy) ? data.fchLevelOfCareList.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.fchLevelOfCareList.changedDate) ? moment(data.fchLevelOfCareList.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.fchLevelOfCareList.enteredBy) ? data.fchLevelOfCareList.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.fchLevelOfCareList.enteredDate) ? moment(data.fchLevelOfCareList.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    }, () => {
      this._opencard.errorHandlers();
    })
  }

  setBreadcrumValues(): void {
    this.FCH.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider List', href: '/reports/provider/view', active: '' },
      { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Placement Matching', active: '', href: '/provider/dashboard/placement-matching' },
      { label: 'FCH Level Care List', active: '', href: '/provider/opencard/fch-level-care/view' },
      { label: 'FCH Level Care', active: 'active' }
    );
  }

  getStaffName(): any {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    const staffId = localStorage.getItem('UserId');
    this._team.getUserById({ staffID: parseInt(staffId) })
      .then(data => {
        const staffName = data.users.lastName + ' ' + data.users.firstName
        this.FCH.staffName = staffName;
        
        loader.style.display = 'none';
        return staffName;
      }, () => {
        this._opencard.errorHandlers();
        
      });
      
  }

  editForm(): void {
    this.FCH.isEdit = true;
    this.fchLevelCareForm.enable();
  }

  formValidation(): void {
    this.fchLevelCareForm = this._fb.group({
      isBasic: [null],
      isIntensive: [null],
      isPreAdoptive: [null],
      isEmergency: [null],
      isIntensivePlus: [null],
      isRespite: [null],
      isHcbs: [null],
      isJJFC: [null],
      isRespiteWeekend: [null],
      isInformalCare: [null],
      isModerate: [null],
      isSC: [null]
    })
  }

  formAction(source): void {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    const providerFCHLevelOfCare = this.generateRequest(source);
    let request = { providerFCHLevelOfCare: providerFCHLevelOfCare };

    (this.FCH.fchLevelDeletableData.length > 0) ? this.deleteFchLevelData() : null;

    this._provider.saveFchLevelOfCare(request).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/provider/opencard/fch-level-care/view'])
    })
  }

  deleteFchLevelData(): void {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let request = { providerFCHLevelOfCareID: this.FCH.fchLevelDeletableData };
    this._provider.deleteFchLevelOfCare(request).then(() => {
      loader.style.display = 'none';
    })
  }

  generateRequest(source) {
    let fchLevelCare = [];
    Object.keys(source).map(key => {
      if (source[key] == true) {
        let fCHLevelOfCareID = this.getfCHLevelOfCareID(key, 'SAVE');
        let data = {
          "fCHLevelOfCareID": fCHLevelOfCareID,
          "providerID": this.FCH.providerId,
          "enteredDate": Date.parse(this.FCH.currentDate.toDateString()),
          "enteredBy": this.FCH.staffName
        }

        if (this._router.url == '/provider/opencard/fch-level-care/new' || (this._router.url == '/provider/opencard/fch-level-care/detail' && !this.isfCHLevelOfCareIDExist(fCHLevelOfCareID))) {
          fchLevelCare.push(data);
        }

      }
      else {
        let providerFCHLevelOfCareID = this.getfCHLevelOfCareID(key, 'DELETE');
        (providerFCHLevelOfCareID) ? this.FCH.fchLevelDeletableData.push(providerFCHLevelOfCareID) : null;
      }

    });
    return fchLevelCare

  }

  isfCHLevelOfCareIDExist(fCHLevelOfCareID: number): boolean {
    let returnValue = false;
    this.FCH.fchLevelListData.forEach((element) => {
      if (element.fCHLevelOfCareID === fCHLevelOfCareID) {
        returnValue = true;
      }
    })
    return returnValue
  }

  getfCHLevelOfCareID(key, API): any {
    let fchLabel: string;
    let returnValue: any;
    switch (key) {
      case 'isBasic':
        fchLabel = "Basic";
        break;

      case 'isEmergency':
        fchLabel = "Emergency";
        break;

      case 'isHcbs':
        fchLabel = "HCBS";
        break;

      case 'isInformalCare':
        fchLabel = "Informal Care";
        break;

      case 'isIntensive':
        fchLabel = "Intensive";
        break;

      case 'isIntensivePlus':
        fchLabel = "Intensive Plus";
        break;

      case 'isJJFC':
        fchLabel = "JJFC";
        break;

      case 'isModerate':
        fchLabel = "Moderate";
        break;

      case 'isPreAdoptive':
        fchLabel = "Pre-Adoptive";
        break;

      case 'isRespite':
        fchLabel = "Respite";
        break;

      case 'isRespiteWeekend':
        fchLabel = "Respite (Weekend only)";
        break;

      case 'isSC':
        fchLabel = "Specific Children";
        break;

      default:

    }

    if (API == 'SAVE') {
      returnValue = this.getFchLevelIdByLabel(fchLabel);

    }
    else if (API == 'DELETE') {
      returnValue = this.getproviderFCHLevelOfCareIDByLabel(fchLabel);
    }

    return returnValue;
  }

  getproviderFCHLevelOfCareIDByLabel(label: string): any {
    let returnValue: number;
    this.FCH.fchLevelListData.forEach(data => {
      if (data.fCHLevelOfCare === label) {
        returnValue = data.providerFCHLevelOfCareID;
      }
    });
    return returnValue;
  }


  getFchLevelIdByLabel(label: string): any {
    let returnValue: number;
    this.FCH.fchLevelIdList.forEach(data => {
      if (data.fCHLevelOfCare === label) {
        returnValue = data.fCHLevelOfCareID;
      }
    });
    return returnValue;
  }

  fetchFchLevelNodeInfo(): void {
    this.FCH.fchLevelListData.map(element => {
      this.setFchLevelNodeInfo(element.fCHLevelOfCare);
    });
  }

  setFchLevelNodeInfo(fCHLevelOfCare: any): void {
    switch (fCHLevelOfCare) {
      case 'Basic':
        this.fchLevelCare.isBasic = true;
        break;

      case 'Emergency':
        this.fchLevelCare.isEmergency = true;
        break;

      case 'HCBS':
        this.fchLevelCare.isHcbs = true;
        break;

      case 'Informal Care':
        this.fchLevelCare.isInformalCare = true;
        break;

      case 'Intensive':
        this.fchLevelCare.isIntensive = true;
        break;

      case 'Intensive Plus':
        this.fchLevelCare.isIntensivePlus = true;
        break;

      case 'JJFC':
        this.fchLevelCare.isJJFC = true;
        break;

      case 'Moderate':
        this.fchLevelCare.isModerate = true;
        break;

      case 'Pre-Adoptive':
        this.fchLevelCare.isPreAdoptive = true;
        break;

      case 'Respite':
        this.fchLevelCare.isRespite = true;
        break;

      case 'Respite (Weekend only)':
        this.fchLevelCare.isRespiteWeekend = true;
        break;

      case 'Specific Children':
        this.fchLevelCare.isSC = true;
        break;

      default:
    }
  }

  uncheckAll() {
    this.fchLevelCare = new FchLevelCare();
  }

}
