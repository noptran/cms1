import { OnInit, Component } from "@angular/core";
import { CustomerCare } from "./customer-care";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { CaseTeamService } from "../../case-team/case-team.service";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { isNullOrUndefined } from "util";
import { ClildFormService } from "../../child-forms/child-forms.service";
import { Router } from "@angular/router";
import * as moment from 'moment';


@Component({
    selector: 'person-customer-care',
    templateUrl: './customer-care.component.html',
    styleUrls: ['./customer-care.component.scss']
})
export class CustomerCareComponent implements OnInit { 
    constructor(public _fb:FormBuilder, public _caseTeam:CaseTeamService, public _opencard:OpencardsService, public _client:ClildFormService, public _router:Router) { }
    mainTabs = [];
    sIndex = 0;
    customerCare:CustomerCare = new CustomerCare();
    customerCareForm:FormGroup;
    metaData = [];
    cityFormState = [];
    zipcodeFromCity= [];
    countyFormCity = [];
    isEdit = false;
    loader = document.getElementById("loading-overlay") as HTMLElement;
    breadcrumbs = [];
    discardTo = '/reports/customer-care/view';
    isCustomerCareReports = false;
    isCustomerCareReportActivities = false;
    customerCareReportsListData = [];
    customerCareReportActivitiesData = [];
    req: any;
    formLogInfo = {
        enteredBy: "",
        changedBy: "",
        enteredDate: "",
        changedDate: "",
      };
      isFormLog = false;

    ngOnInit() { 
        this.defineMainTabs();
        this.formValidation();
        this.breadcrumbs.push(
            {label: 'List', href: '/reports/customer-care/view'},
            {label: 'Form',active: 'active'}
        )
        if(this._router.url.includes('/detail')) return this.getCustomerCareByID();
    }

    defineMainTabs() {
        return this.mainTabs = [
          { label: 'Section 1', href: '#nav-1' },
          { label: 'Section 2', href: '#nav-2' },
        ]
      }

    setIndex(index: number) {
        this.sIndex = index;
    }

    
  formValidation() {
    this.customerCareForm = this._fb.group({
      "cellPh": '',
      "email": new FormControl('', Validators.compose([Validators.required, Validators.maxLength(75)])),
      "firstName": new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
      "genderID": '',
      "homePh": '',
      "lastName": new FormControl('', Validators.compose([Validators.required, Validators.maxLength(25)])),
      "mi": new FormControl('', Validators.compose([Validators.maxLength(2)])),
      "notes": new FormControl('', Validators.compose([Validators.maxLength(225)])),
      "dhsofficeID": new FormControl('', Validators.compose([Validators.required])),
      "fax": '',
      "pager": '',
      "tribeID": '',
      "ethnicityID": '',
      "ext": '',
      "workPh": '',
      "acronym": '',
      "deceased": '',
      "contract_StateID": '',
      "unknownAddress": '',
      "address": '',
      "cityID":"",
      "countyID":"",
      "stateID":"",
      "zipCodeID":"",
      "raceID": "",
    })
  }

  getMetaData(label:string, value: any) {
    let req = {value:value.query} 
    switch(label) { 
        case 'state':
            req['Object'] = 'state';
        break;
        case 'gender':
            req['Object'] = 'gender';
        break;
        case 'ethnicity':
            req['Object'] = 'ethnicity';
        break;
        case 'tribe':
            req['Object'] = 'tribe';
        break;
        case 'race':
            req['Object'] = 'race';
        break;
        case 'contractState':
            req['Object'] = 'contractState';
        break;
    }
    this._caseTeam.getSearchList(req).then(data => this.metaData = data.dropDown)
  }

  onGetCityFromState(event: any) { 
      this._opencard.getCityFromState({stateID:event.stateID}).then(data => this.cityFormState = data.city);
  }

  onFilterCity(event: any) { 
       this.metaData =  this.cityFormState.filter(item => { return item.city.toLowerCase().indexOf(event.query) !== -1});
  }

  onGetZipCodeFromCity(event: any) { 
      this._opencard.getZipcodeFromCity({stateID:this.customerCare.stateID.stateID,cityID:event.cityID}).then(data =>{ 
          this.zipcodeFromCity = data.zipcode;
          this.countyFormCity =  data.county;
        });
  }
  onFilterZipcode(event: any) { 
     this.metaData = this.zipcodeFromCity.filter(item => {return item.zipcode.indexOf(event.query) !== -1});
  }

  onFilterCounty(event: any) { 
      this.metaData = this.countyFormCity.filter(item => { return item.countyName.toLowerCase().indexOf(event.query) !== -1});
  }

  formActions() { 
    this.loader.style.display = "block";
    !isNullOrUndefined(this.customerCare.ethnicityID) ? this.customerCare.ethnicityID = this.customerCare.ethnicityID.ethnicityID : null;
    !isNullOrUndefined(this.customerCare.genderID) ? this.customerCare.genderID = this.customerCare.genderID.genderID: null;
    !isNullOrUndefined(this.customerCare.stateID) ? this.customerCare.stateID = this.customerCare.stateID.stateID: null;
    !isNullOrUndefined(this.customerCare.cityID) ? this.customerCare.cityID = this.customerCare.cityID.cityID : null;
    !isNullOrUndefined(this.customerCare.zipcodeID) ? this.customerCare.zipcodeID = this.customerCare.zipcodeID.zipcodeID : null;
    !isNullOrUndefined(this.customerCare.tribeID) ? this.customerCare.tribeID = this.customerCare.tribeID.tribeID : null;
    !isNullOrUndefined(this.customerCare.contract_StateID) ? this.customerCare.contract_StateID = this.customerCare.contract_StateID.stateID : null;
    !isNullOrUndefined(this.customerCare.raceID) ? this.customerCare.raceID = this.customerCare.raceID.raceID : null;
    !isNullOrUndefined(this.customerCare.countyID) ? this.customerCare.countyID = this.customerCare.countyID.countyID : null;
    this.customerCare.entity = 'CustomerCarePerson';
      if(this.customerCare.custCarePersonID) { 
        this._opencard.customerCarePersonUpdate(this.customerCare).then(()=>{
            this.loader.style.display = "none";
            return window.history.back();
        })
      } else { 
        this._opencard.customerCarePersonSave(this.customerCare).then(()  => {
            this.loader.style.display = "none";
            return window.history.back();
         })
      }
      
  }

  getCustomerCareByID() { 
      this.loader.style.display = "block";
      this.req = {custCarePersonID:this._client.getId()};
      this._opencard.customerCarePersonGet(this.req).then((data: any)=>{
          this.customerCare = data.person;
          this.isEdit = true;
          this.customerCareForm.disable();
          this.isFormLog = true;
          this.formLogInfo.changedBy = !isNullOrUndefined(data.person.changedBy) ? data.person.changedBy : '------';
          this.formLogInfo.changedDate = !isNullOrUndefined(data.person.changedDate) ? moment(data.person.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
          this.formLogInfo.enteredBy = !isNullOrUndefined(data.person.enteredBy) ? data.person.enteredBy : '------';
          this.formLogInfo.enteredDate = !isNullOrUndefined(data.person.enteredDate) ? moment(data.person.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
    
          return this.loader.style.display = "none";
         
      })
  }

  editForm() { 
      this.isEdit = false;
      this.customerCareForm.enable();
  }

  getCustomerCareReports() {
      /**
       * /custCareReport/list
       * {
            "CustCarePersonID":8,
            "beginPagination":1,
            "endPagination":10,
                "sort":{
                "column":"CP.CustCarePersonID",
                "mode":"asc"
            }
        }
       */
   }

  getCustomerCareReportsActivities() { 
      /**
       * /custCareReportActivity/list
        * {
            "custCarePersonID":4,
            "beginPagination":1,
            "endPagination":10,
            "sort":{
                "column":"reportId",
                "mode":"asc"
            }

        }
       */
  }

}