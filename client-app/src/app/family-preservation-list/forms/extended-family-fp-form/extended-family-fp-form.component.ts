import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

import { FpExtendedFamily } from './fp-extended-family';

import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { HomeService } from '../../../home/home.service';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../../../local-values';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-extended-family-fp-form',
  templateUrl: './extended-family-fp-form.component.html',
  styleUrls: ['./extended-family-fp-form.component.scss']
})
export class ExtendedFamilyFpFormComponent implements OnInit {
  title: any = 'Extended Family';
  status = 'draft';
  formStatus?: any;
  subtitle: any;
  breadcrumbs = [];
  extendedFamilyForm: FormGroup;
  formControl: any;
  editControll: boolean;
  fpExtendedFamily: FpExtendedFamily = new FpExtendedFamily();
  clientId: any;
  referralId: any;
  metaData: any;
  isPersonType = true;
  personTypes = [];
  filteredPersonTypes = [];
  discardTo = '/reports/extended-family/view';
  referralTypeId: any = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
  isShowRFCFields = false;
  url: any;
  isAttachmentRequired = false;
  req: any;

  isList = false;
  isForm = true;
  public extendedFamilyList: any[];
  isAppHeader = true;
  

  constructor(public _meassgae: MessageService, public _fb: FormBuilder, public _opencards: OpencardsService, public _home: HomeService,
    public _router: Router, public _caseTeam: CaseTeamService,
    public _client: ClildFormService, public _localValues: LocalValues) { }

  ngOnInit() {
    this.formControl = false;
    this.editControll = false;
    this.formValidation();
    this.getClientDetails();

    if (this.referralTypeId == 5) {
      this.breadcrumbs.push(
        { label: 'List', href: "/reports/client", active: '' },
        { label: 'Form', href: "/reports/client/details", active: '' },
        { label: 'Case Form', href: "/reports/referral/family-preservation/detail", active: '' },
        { label: 'Family', href: "/reports/family/view", active: '' },
        { label: 'Extended Family', href: "/reports/extended-family/view", active: '' },
        { label: 'Extended Family Form', active: 'active' }
      );
    }
    else {
      this.breadcrumbs.push(
        { label: 'List', href: "/reports/client", active: '' },
        { label: 'Form', href: "/reports/client/details", active: '' },
        { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
        { label: 'Family', href: "/reports/family/view", active: '' },
        { label: 'Extended Family', href: "/reports/extended-family/view", active: '' },
        { label: 'Extended Family Form', active: 'active' }
      );
    }


    if (this.referralTypeId == 4) {
      this._localValues.breadcrumbsChanges('extendedFamily-NCFCH', this.breadcrumbs);
    }

    if (this.referralTypeId == 17) {
      this._localValues.breadcrumbsChanges('extendedFamily-JJFC', this.breadcrumbs);
    }

    if (this.referralTypeId == 11) {
      this._localValues.breadcrumbsChanges('extendedFamily-NCMHR', this.breadcrumbs);
    }
    if (this.referralTypeId == 14) {
      this._localValues.breadcrumbsChanges('extendedFamily-PRTF', this.breadcrumbs);
    }


    if (this._router.url == '/reports/extended-family/detail') {
      this.getExtendedFamilyRec();
      this.isAttachmentRequired = true;
    }
    // let referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
    // this._opencards.breadcurmbsDetermination('extended-family',referralTypeId,this.breadcrumbs)
    this.getFamilyList();
  }

  formValidation() {
    this.extendedFamilyForm = this._fb.group({
      'familyMemberID': [null, Validators.compose([Validators.required])],
      'beginDate': [null, Validators.compose([Validators.required])],
      'endDate': [null],
      'personTypeID': [null, Validators.compose([Validators.required])],
      'familyMemberTypeID': [null, Validators.compose([Validators.required])],
      'restrictionTypeID': [null, Validators.compose([Validators.required])],
      'IsCourtOrderedRestriction': [null],
      'frequencyTypeID': [null, Validators.compose([Validators.required])],
      'isCourtOrderedFrequency': [null],
      'notes': [null],
      'referralID': [null],
      'isRemovalParent': [null],
      'annualHouseholdIncome': [null],
      'numberLivingInHousehold': [null],
      'isSingleParentHousehold': [null],
      'familyRefused': [null],
    });
  }

  getClientDetails() {
    // const encryptClientID = localStorage.getItem('clientId');
    // const encryptReferralID = localStorage.getItem('referralId');
    // const hasKey = this._opencards.getHasKey();
    this.clientId = parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey();
    this.referralId = parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey();
  }

  resetForm() { }

  discardForm() {
    if (this.isAppHeader) {
      return window.history.back();
    } else {
      this.isForm = false;
      this.getFamilyList();
      this.editControll = false;
      return this.isList = true;
    }
  }

  editForm() {
    this.formControl = false;
    this.extendedFamilyForm.enable();
  }

  saveForm(source: any) {
    if (this.extendedFamilyForm.valid) {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
      !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
      !isNullOrUndefined(source.familyMemberID) ? source.familyMemberID = source.familyMemberID.familyMemberID : null;
      !isNullOrUndefined(source.personTypeID) ? source.personTypeID = source.personTypeID.personTypeID : null;
      !isNullOrUndefined(source.familyMemberTypeID) ? source.familyMemberTypeID = source.familyMemberTypeID.familyMemberTypeID : null;
      !isNullOrUndefined(source.restrictionTypeID) ? source.restrictionTypeID = source.restrictionTypeID.restrictionTypeID : null;
      !isNullOrUndefined(source.frequencyTypeID) ? source.frequencyTypeID = source.frequencyTypeID.frequencyTypeID : null;
      source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey();
      this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
      if (source.familyMemberReferralID) {
        this._opencards.updateExtendedFamily(source).then(data => {
          loader.style.display = 'none';

          this.extendedFamilyForm.disable();


          if (this.isAppHeader) {
            swal('Success', 'Record has been updated!', 'success');
            this._router.navigate(['/reports/extended-family/view']);
          }
          else {
            this._meassgae.add({ severity: 'success', summary: 'Saved!', detail: 'The record has been saved!' });
            this.isForm = false;
            this.getFamilyList();
            this.isList = true;
          }
        });
      } else {
        this._opencards.saveExtendedFamily(source).then(data => {
          loader.style.display = 'none';

          this.extendedFamilyForm.disable();


          if (this.isAppHeader) {
            swal('Success', 'Record has been saved!', 'success');
            this._router.navigate(['/reports/extended-family/view']);
          }
          else {
            this._meassgae.add({ severity: 'success', summary: 'Saved!', detail: 'The record has been saved!' });
            this.isForm = false;
            this.getFamilyList();
            this.isList = true;
          }
        });
      }
    }
    else {
      swal('Warning', 'Please fill the mandatory fields', 'warning');
    }

  }

  generatePersonTypes(selectedDate) {
    let req, referralTypeId;
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    selectedDate = Date.parse(selectedDate)
    referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey();
    req = { referralTypeID: referralTypeId, beginDate: selectedDate }
    this._opencards.getPeronTypeByReferralTypeId(req).then((data) => {
      loader.style.display = 'none';
      this.personTypes = data.dropDown;
      if (this._router.url == '/reports/extended-family/detail') {
        this.isPersonType = true;
      } else {
        this.isPersonType = false;
      }
    })
  }

  filterPersonTypes(event) {
    this.filteredPersonTypes = [];
    this.personTypes.filter((data) => {
      if (data.personType) {
        if (data.personType.indexOf(event.query) !== -1) {
          this.filteredPersonTypes.push(data)
        }
      }
    })
  }

  /**
   * Get the metadata for dropdowns
   */
  getMetaData(event, label) {
    let metaDataObj, metaDataReq
    switch (label) {
      case 'familyMember':
        metaDataObj = "familyMember";
        break;
      case 'relationship':
        metaDataObj = "personType";
        break;
      case 'memberType':
        metaDataObj = "familyMemberType";
        break;
      case 'restrictionType':
        metaDataObj = "restrictionType";
        break;
      case 'frequency':
        metaDataObj = "frequencyType";
        break;

    }
    if (metaDataObj) {
      metaDataReq = { Object: metaDataObj, value: event.query }
      this._caseTeam.getSearchList(metaDataReq).then(data => {
        this.metaData = data.dropDown;
      })
    }
  }

  /***
   * Get the record by id
   */
  getExtendedFamilyRec() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.req = { familyMemberReferralID: this._client.getId() }
    this._opencards.getExtendedFamilyById(this.req).then((data) => {
      if (data.FamilyMemberReferral.isActive) {
        !isNullOrUndefined(data.FamilyMemberReferral.beginDate) ? data.FamilyMemberReferral.beginDate = moment(data.FamilyMemberReferral.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.FamilyMemberReferral.endDate) ? data.FamilyMemberReferral.endDate = moment(data.FamilyMemberReferral.endDate).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.FamilyMemberReferral.beginDate) ? data.FamilyMemberReferral.beginDate = moment.utc(data.FamilyMemberReferral.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.FamilyMemberReferral.endDate) ? data.FamilyMemberReferral.endDate = moment.utc(data.FamilyMemberReferral.endDate).format('MM/DD/YYYY HH:mm') : null;
      }
      !isNullOrUndefined(data.FamilyMemberReferral.familyMemberID) ? data.FamilyMemberReferral.familyMemberID['name'] = data.FamilyMemberReferral.familyMemberID.lastName + ' , ' + data.FamilyMemberReferral.familyMemberID.firstName : null;
      this.generatePersonTypes(new Date(data.FamilyMemberReferral.beginDate));
      this.fpExtendedFamily = data.FamilyMemberReferral;
      this.extendedFamilyForm.disable();
      this.editControll = true;
      
      loader.style.display = 'none'
    })
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reports/extended-family/detail') {
      this.url = '/reports/attachment-document/extended-family';
    }
    else {
      this.url = '/reports/attachment-document/extended-family';
    }
    return this._router.navigate([this.url])
  }

  onNavigateToFamilyMember() {
    localStorage.setItem('familyMemberId', this.fpExtendedFamily.familyMemberID.familyMemberID)
    return this._router.navigate(['/reports/familyMember/details'])
  }

  async getFamilyList() {
    let request = {
      referralID: parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey(),
      beginPagination: 1,
      endPagination: 100,
      sort: { "column": "familyMemberReferralID", "mode": "desc" }
    }
    let response = await this._caseTeam.getFamilyList(request);
    return this.extendedFamilyList = response.FamilyMemberReferral;
  }

  public onEdit(event: any) {
    this.isForm = true;
    this.isList = false;
    let req = { familyMemberReferralID: event.familyMemberReferralID };
    this.formValidation();
    this._opencards.getExtendedFamilyById(req).then((data) => {
      this.fpExtendedFamily = new FpExtendedFamily();
      if (data.FamilyMemberReferral.isActive) {
        !isNullOrUndefined(data.FamilyMemberReferral.beginDate) ? data.FamilyMemberReferral.beginDate = moment(data.FamilyMemberReferral.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.FamilyMemberReferral.endDate) ? data.FamilyMemberReferral.endDate = moment(data.FamilyMemberReferral.endDate).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.FamilyMemberReferral.beginDate) ? data.FamilyMemberReferral.beginDate = moment.utc(data.FamilyMemberReferral.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.FamilyMemberReferral.endDate) ? data.FamilyMemberReferral.endDate = moment.utc(data.FamilyMemberReferral.endDate).format('MM/DD/YYYY HH:mm') : null;
      }
      !isNullOrUndefined(data.FamilyMemberReferral.familyMemberID) ? data.FamilyMemberReferral.familyMemberID['name'] = data.FamilyMemberReferral.familyMemberID.lastName + ' , ' + data.FamilyMemberReferral.familyMemberID.firstName : null;
      this.generatePersonTypes(new Date(data.FamilyMemberReferral.beginDate));
      this.fpExtendedFamily = data.FamilyMemberReferral;
      this.extendedFamilyForm.disable();
      this.editControll = true;
    })
  }

  public addForm() {
    this.fpExtendedFamily = new FpExtendedFamily();
    this.formValidation();
    this.editControll = false;
    this.isForm = true;
    this.isList = false;
  }

}
