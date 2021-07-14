import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CaseTeamService } from './../case-team/case-team.service'
import { Router } from '@angular/router';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { CaseTeam } from './case-team';
import { isNullOrUndefined } from 'util';
import { ClildFormService } from '../child-forms/child-forms.service';
import swal from 'sweetalert2';
import { BeginEndValidationService } from '../begin-end-date-validations/begin-end-validation.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import {LocalValues} from '../local-values';

@Component({
  selector: 'app-case-team',
  templateUrl: './case-team.component.html',
  styleUrls: ['./case-team.component.scss', '../person-master/Client/client-form/client-form.component.scss']
})
export class CaseTeamComponent implements OnInit {
  title: any = 'Case Team';
  status = 'draft';
  formStatus?: any;
  subtitle: any;
  formControl: any;
  editControll: boolean;
  Data;
  orgForm: FormGroup;
  personSubTypeData = [];
  breadcrumbs = [];
  personTypeData = [];
  contractStateData = [];
  nameData = [];
  PersonSubType = [];
  PersonType = [];
  ContractState = [];
  Name = [];
  showForm = false;
  caseTeamId;
  newForm = false;
  metadata: any

  caseTeam: CaseTeam = new CaseTeam();
  personSubtype = [];
  personTypes = [];
  filteredPersonSubtypes = [];
  filteredPersonTypes = [];
  isPersonType = true;
  isPersonSubType = true;
  referralTypeId: any;
  discardTo = '/reports/referral/family-preservation/case-team/view';
  caseTeamListResponse: any;
  quickMenu: any;
  url: any;
  isAttachmentRequired = false;
  expectedData = '';
  req: any;
  deleteReq = {};
  isList = false;
  isForm = true;
  public caseTeamist: any[];
  isAppHeader = true;

  isFormLog = false;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: ''
  }


  constructor(public _beginEndDates: BeginEndValidationService, public formBuilder: FormBuilder,
    public _router: Router,
    public _CaseTeamService: CaseTeamService,
    public _openCard: OpencardsService, public _client: ClildFormService,
    public _localValues: LocalValues, public _meassgae: MessageService) { }




  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reports/referral/family-preservation/detail", active: '' },
      { label: 'Case Team List', href: "/reports/referral/family-preservation/case-team/view", active: '' },
      { label: 'Case Team Form', active: 'active' }
    );
    if (this._router.url.includes('case-team/detail')) {
      this.getCaseTeamDetailById();
      this.isAttachmentRequired = true;
    }
    else {
      this._beginEndDates.validateBeginEndDates("Case Team")
      this.caseTeam.beginDate = new Date();
    }
    let referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._openCard.getHasKey();
    this._openCard.breadcurmbsDetermination('case-team', referralTypeId, this.breadcrumbs)
    if (this._router.url.includes('/case-team/new')) {
      this.caseTeam.beginDate = new Date(this._localValues.stringFormatDatetime(Date.now()));
      this.caseTeam.beginDate.setHours(0);
      this.caseTeam.beginDate.setMinutes(0);
      this.caseTeam.beginDate.setSeconds(0);
      this.generatePersonTypes(this.caseTeam.beginDate);
    }
    if (referralTypeId === 9) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-NCOPS', this.breadcrumbs)
    } else if (referralTypeId === 4) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-NCFCH', this.breadcrumbs)
    }
    else if (referralTypeId === 7) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-NCRFC', this.breadcrumbs)
    }
    else if (referralTypeId === 8) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-NCHS', this.breadcrumbs)
    }
    if (referralTypeId === 15) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
    }
    if (referralTypeId === 17) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-JJFC', this.breadcrumbs)
    }
    if (referralTypeId === 11) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-NCMHR', this.breadcrumbs)
    }
    if (referralTypeId === 14) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-PRTF', this.breadcrumbs)
    }
    this.getCaseTeamList();
  }

  formValidation() {
    this.orgForm = this.formBuilder.group({
      'beginDate': [null, Validators.compose([Validators.required])],
      'endDate': [null],
      'personType': [null, Validators.compose([Validators.required])],
      'personSubType': [null, Validators.compose([Validators.required])],
      'contractState': [null],
      'name': [null, Validators.compose([Validators.required])],
      'mentor': [false],
      'emailAck': [false],
      'faxAck': [false],
      'mailAck': [false]
    });
  }


  addPost(data) {
    let personType: string;
    if (this.orgForm.valid) {
      data.beginDate = this._localValues.stringFormatDatetime(new Date(data.beginDate));
      data.endDate = !isNullOrUndefined(data.endDate) ? this._localValues.stringFormatDatetime(new Date(data.endDate)) : null;
      !isNullOrUndefined(data.personAssignmentTypeID) ? data.personAssignmentTypeID = data.personAssignmentTypeID.personAssignmentTypeID : null;
      personType = this.definePersonType(data);
      !isNullOrUndefined(data.personID) ? data.personID = data.personID[personType] : null;
      !isNullOrUndefined(data.personTypeID) ? data.personTypeID = data.personTypeID.personTypeID : null;
      !isNullOrUndefined(data.contract_StateID) ? data.contract_StateID = data.contract_StateID.stateID : null;
      data.caseID = this._localValues.caseID;
      data.referralID = parseInt(localStorage.getItem('referralId')) - this._openCard.getHasKey();
      data.clientID = parseInt(localStorage.getItem('clientId')) - this._openCard.getHasKey();
      this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._openCard.getHasKey();
      console.log("Before update", data)
      if (!this.isAppHeader) {
        data['contactList'] = data.mentor;
        data['emergencyContact'] = data.emailAck;
        data['criticals'] = data.faxAck;
        data['treatmentPlan'] = data.mailAck;
        data.mentor = false;
        data.emailAck = false;
        data.faxAck = false;
        data.mailAck = false;
      }
      if (data.caseTeamID) {
        this.updateForm(data)
      } else {
        this.saveForm(data)
      }
    } else {
      swal('Warning', 'Please fill the mandatory fields', 'warning');
    }

  }

  saveForm(source) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._openCard.saveCaseTeam(source).then((data) => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        this.caseTeam = data.caseTeam;
        this.orgForm.disable();
        this.editControll = true;
        if (this.isAppHeader) {
          swal('Success', 'Record has been saved!', 'success');
          this._router.navigate(['/reintegration/referral/opencard/case-team/view'], { queryParamsHandling: "preserve" });
        } else {
          this._meassgae.add({ severity: 'success', summary: 'Saved!', detail: 'The record has been saved!' });
          this.isForm = false;
          this.getCaseTeamList();
          this.isList = true;
        }
      } else {
        swal('Info', `${data.responseMessage}`, 'info');
        this.caseTeam = new CaseTeam();
        this._beginEndDates.validateBeginEndDates("Case Team");
        this.caseTeam.beginDate = new Date();
      }
      return;
    })
  }

  updateForm(source) {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    source.caseID = !isNullOrUndefined(source.caseID) ? source.caseID = source.caseID.caseID : null;
    this._openCard.updateCaseTeam(source).then((data) => {
      loader.style.display = 'none';
      if (data.responseStatus) {
        this.caseTeam = data.caseTeam;
        this.orgForm.disable();
        this.editControll = true;
        if (this.isAppHeader) {
          swal('Success', 'Record has been updated!', 'success');
          this._router.navigate(['/reintegration/referral/opencard/case-team/view'], { queryParamsHandling: "preserve" });
        } else {
          this._meassgae.add({ severity: 'success', summary: 'Updated!', detail: 'The record has been updated!' });
          this.isForm = false;
          this.getCaseTeamList();
          this.isList = true;
        }
      } else {
        swal('Info', `${data.responseMessage}`, 'info');
        this.caseTeam = new CaseTeam();
        this._beginEndDates.validateBeginEndDates("Case Team");
        this.caseTeam.beginDate = new Date();
      }
      return;
    })
  }


  resetForm() { }

  discardForm() {
    if (this.isAppHeader) {
      return this._router.navigate(['/reports/referral/family-preservation/case-team/view']);
    } else {
      this.isForm = false;
      this.getCaseTeamList();
      this.editControll = false;
      return this.isList = true;
    }
  }

  editForm() {
    this.formControl = false;
    this.orgForm.enable();
    this.editControll = false;
  }

  getMetaData(event, label) {
    let metaDataReqObj, metaDataReq, email, personSubType: any;;
    switch (label) {
      case 'personType':
        metaDataReqObj = 'personType';
        break;
      case 'contractState':
        metaDataReqObj = 'contractState'
        break;
      case 'name':
        if (this.caseTeam.personAssignmentTypeID.personAssignmentTable === 'CSV') { personSubType = 'CourtServiceOfficer' }
        else if (this.caseTeam.personAssignmentTypeID.personAssignmentTable === 'GAL') { personSubType = 'guardianAdLitem' }
        else { personSubType = this.caseTeam.personAssignmentTypeID.personAssignmentTable }
        metaDataReqObj = personSubType;
        break;
      case 'personSubtype':
        this.filterPersonSubtype(event)
        break;
    }
    if (metaDataReqObj) {
      metaDataReq = { Object: metaDataReqObj, value: event.query }
      this._CaseTeamService.getSearchList(metaDataReq).then((data) => {
        data.dropDown.map((item) => {
          email = !isNullOrUndefined(item.email) ? item.email : 'Email not provided!'
          item['fullName'] = item.lastName !== undefined || item.firstName !== undefined ? item.lastName + ' ' + item.firstName + '(' + email + ')' : item.name + ' ' + '(' + email + ')';
        })
        this.metadata = data.dropDown;
      })
    }
  }
  getContractStateValue(contract_StateID) {
    let req = { Object: 'contractState', value: '' }
    this._CaseTeamService.getSearchList(req).then((data) => {
      data.dropDown.filter((item) => {
        if (item.stateID === contract_StateID) {
          this.caseTeam.contract_StateID = item;
        }
      })
    })
  }
  getCaseTeamDetailById() {
    let personDetail;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { caseTeamId: this._client.getId() }
    this.deleteReq = { caseTeam: this._client.getId() }
    this._openCard.getByIdCaseTeam(this.req).then((data) => {
      this.setPersonJumpToTree(data.caseTeam.personID);
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.caseTeam.changedBy) ? data.caseTeam.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.caseTeam.changedDate) ? moment(data.caseTeam.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.caseTeam.enteredBy) ? data.caseTeam.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.caseTeam.enteredDate) ? moment(data.caseTeam.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


      loader.style.display = 'none';
      personDetail = data.caseTeam;
      this.generatePersonTypes(data.caseTeam.beginDate);
      !isNullOrUndefined(data.caseTeam.personID) ? data.caseTeam.personID['fullName'] = data.caseTeam.personID.LastName + ' ' + data.caseTeam.personID.FirstName + ' ( ' + data.caseTeam.personID.Email + ' ) ' : null;
      !isNullOrUndefined(data.caseTeam.beginDate) ? data.caseTeam.beginDate = new Date(data.caseTeam.beginDate) : null;
      !isNullOrUndefined(data.caseTeam.endDate) ? data.caseTeam.endDate = new Date(data.caseTeam.endDate) : null;
      !isNullOrUndefined(data.caseTeam.contract_StateID) ? this.getContractStateValue(data.caseTeam.contract_StateID) : null;

      this.caseTeam = data.caseTeam;
      this.orgForm.disable();
      this.editControll = true;
      this.isPersonType = false;
    })
  }

  generatePersonSubtype(event) {
    this.personSubTypeData = [];
    this.caseTeam.personAssignmentTypeID = '';
    let req;
    req = { personTypeID: event.personTypeID }
    this._openCard.getPersonSubtype(req).then((data) => {
      this.personSubTypeData = data.dropDown;
      if (this.personSubTypeData.length == 1) {
        this.caseTeam.personAssignmentTypeID = data.dropDown[0];
      } else {
        this.isPersonSubType = false;
      }
    })
  }

  filterPersonSubtype(event) {
    this.filteredPersonSubtypes = []
    this.personSubTypeData.filter((data) => {
      if (data.personAssignmentTable) {
        if (data.personAssignmentTable.indexOf(event.query) !== -1) {
          this.filteredPersonSubtypes.push(data)
        }
      }
    })
  }

  generatePersonTypes(selectedDate) {
    let req, referralTypeId;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    selectedDate = Date.parse(selectedDate)
    referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._openCard.getHasKey();
    req = { referralTypeID: referralTypeId, beginDate: selectedDate }
    this._openCard.getPeronTypeByReferralTypeId(req).then((data) => {
      loader.style.display = 'none';
      this.personTypes = data.dropDown;
      this.isPersonType = false;
    })
  }

  filterPersonTypes(event) {
    this.filteredPersonTypes = [];
    this.personTypes.filter((data) => {
      if (data.personType) {
        if (data.personType.toLowerCase().indexOf(event.query) !== -1) {
          this.filteredPersonTypes.push(data)
        }
      }
    })
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reports/referral/family-preservation/case-team/detail') {
      this.url = '/reports/attachment-document/case-team';
    }
    else if (currentURL == '/reintegration/referral/opencard/case-team/detail') {
      this.url = '/reports/attachment-document/rfc/case-team';
    }
    return this._router.navigate([this.url])
  }

  definePersonType(data) {
    let personType: string;
    if (data.personAssignmentTypeID == 1) {
      personType = 'clientID';
    }
    else if (data.personAssignmentTypeID == 2) {
      personType = 'staffID';
    }
    else if (data.personAssignmentTypeID == 3) {
      personType = 'providerMemberID';
    }
    else if (data.personAssignmentTypeID == 4) {
      personType = 'familyMemberID';
    }
    else if (data.personAssignmentTypeID == 5) {
      personType = 'judgeID';
    }
    else if (data.personAssignmentTypeID == 6) {
      personType = 'srsstaffID';
    }
    else if (data.personAssignmentTypeID == 8) {
      personType = 'csvid';
    }
    else if (data.personAssignmentTypeID == 9) {
      personType = 'galid';
    }
    else if (data.personAssignmentTypeID == 10) {
      personType = 'casaOfficerID';
    }
    else if (data.personAssignmentTypeID == 11) {
      personType = 'crbcoordinatorID';
    }
    else if (data.personAssignmentTypeID == 15) {
      personType = 'communityMemberID';
    }
    else if (data.personAssignmentTypeID == 16) {
      personType = 'custCarePersonID';
    }
    else if (data.personAssignmentTypeID == 17) {
      personType = 'dhsStaffID';
    }
    else if (data.personAssignmentTypeID == 20) {
      personType = 'dhhsStaff';
    }
    else if (data.personAssignmentTypeID == 21) {
      personType = 'otherAgencyStaffID';
    }
    else if (data.personAssignmentTypeID == 22) {
      personType = 'CSOStaffID';
    }
    return personType;
  }

  async getCaseTeamList() {
    // let request = {
    //   referralID: parseInt(localStorage.getItem('referralId')) - this._openCard.getHasKey(),
    //   beginPagination: 1,
    //   endPagination: 100,
    //   sort: { "column": "caseTeamID", "mode": "desc" }
    // }
    // let response = await this._CaseTeamService.getCaseTeamList(request);
    // return this.caseTeamist = response.casePlan;

    let request = {
      referralID: parseInt(localStorage.getItem('referralId')) - this._openCard.getHasKey(),
      beginPagination: 1,
      endPagination: 100,
      isExport: false
    }
    let response = await this._CaseTeamService.getPRTFcaseTeamList(request);
    return this.caseTeamist = response.caseTeam;

  }

  public addForm() {
    this.caseTeam = new CaseTeam();
    this.formValidation();
    this.editControll = false;
    this.isForm = true;
    this.isList = false;
  }

  public onEdit(event: any) {
    this.isForm = true;
    this.isList = false;
    let req = { caseTeamId: event.caseTeamID };
    this.formValidation();
    this._openCard.getByIdCaseTeam(req).then((data) => {
      this.caseTeam = new CaseTeam();
      !isNullOrUndefined(data.caseTeam.personID) ? data.caseTeam.personID['fullName'] = data.caseTeam.personID.LastName + ' ' + data.caseTeam.personID.FirstName + ' ( ' + data.caseTeam.personID.Email + ' ) ' : null;
      !isNullOrUndefined(data.caseTeam.contract_StateID) ? this.getContractStateValue(data.caseTeam.contract_StateID) : null;
      !isNullOrUndefined(data.caseTeam.beginDate) ? data.caseTeam.beginDate = new Date(data.caseTeam.beginDate) : null;
      !isNullOrUndefined(data.caseTeam.endDate) ? data.caseTeam.endDate = new Date(data.caseTeam.endDate) : null;
      if (!this.isAppHeader) {
        data.caseTeam['mentor'] = data.caseTeam.contactList;
        data.caseTeam['emergencemailAckyContact'] = data.emergencyContact;
        data.caseTeam['faxAck'] = data.caseTeam.criticals;
        data.caseTeam['mailAck'] = data.caseTeam.treatmentPlan;
      }

      this.caseTeam = data.caseTeam;
      this.orgForm.disable();
      this.editControll = true;
    })
  }

  jumpToTreeMetaData: any = {}
  setPersonJumpToTree(personID) {
    let personType = '';
    if (personID.CasaOfficerID) {
      personType = 'CasaOfficerID'; //CASA Officer

    }
    else if (personID.SRSStaffID) {
      personType = 'SRSStaffID'; //DCF Staff
    }
    else if (personID.StaffID) {
      personType = 'StaffID'; //Family Advocate - Staff, Therapist Case Manager
    }
    else if (personID.JudgeID) {
      personType = 'JudgeID'; //Judge
    }

    this.jumpToTreeMetaData = {
      personType: personType,
      id: personID[personType]
    };

  }

  onClickJumptoPlacement() {
    let id = this.jumpToTreeMetaData.id;
    this._localValues.caseTeamPersonJumptoTree = true;
    this._localValues.caseTeamClientId = parseInt(localStorage.getItem('clientId')) - this._openCard.getHasKey();
    switch (this.jumpToTreeMetaData.personType) {
      case 'CasaOfficerID':
        this._client.storeId(id);
        return this._router.navigate(['/reports/casaOfficer/details']);
        // return window.open(
        //   window.location.origin + '/reports/casaOfficer/details' + window.location.search,
        //   '_blank',
        //   'toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500'
        // );

      case 'SRSStaffID':
        this._client.storeId(id);
        return this._router.navigate(['/reports/dcf/details']);
        // return window.open(
        //   window.location.origin + '/reports/dcf/details' + window.location.search,
        //   '_blank',
        //   'toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500'
        // );

      case 'StaffID':
        localStorage.setItem("staff_ID", id);
        return this._router.navigate(['/reports/staff/details']);
        // return window.open(
        //   window.location.origin + '/reports/staff/details' + window.location.search,
        //   '_blank',
        //   'toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500'
        // );

      case 'JudgeID':
        this._client.storeId(id);
        return this._router.navigate(['/reports/judge/details']);
        // return window.open(
        //   window.location.origin + '/reports/judge/details' + window.location.search,
        //   '_blank',
        //   'toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500'
        // );

    }

  }

}
