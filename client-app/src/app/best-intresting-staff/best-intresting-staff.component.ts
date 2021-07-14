import { Component, OnInit } from '@angular/core';
import { BestIntrestingStaff, BisResource } from './best-intresting-staff';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { CaseTeamService } from '../case-team/case-team.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../local-values';

@Component({
  selector: 'app-best-intresting-staff',
  templateUrl: './best-intresting-staff.component.html',
  styleUrls: ['./best-intresting-staff.component.scss']
})
export class BestIntrestingStaffComponent implements OnInit {

  bis: BestIntrestingStaff = new BestIntrestingStaff();
  bisResource: BisResource = new BisResource();
  isEdit = false;
  discardTo = '/reintegration/referral/opencard/bis/view';
  breadcurmbs = [];
  bisResourceList = [];
  metaData = [];
  btnLabel = 'Add';
  selectedIndex: any;
  bisForm: FormGroup;
  isbisResourceFormOpen = false;
  isbisResourceTableViewOnly = false;
  isAttachmentRequired = false;
  url: any;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _fb: FormBuilder, public _router: Router, public _opencard: OpencardsService,
    public _caseTeam: CaseTeamService, public _client: ClildFormService, public _localValues: LocalValues) { }

  ngOnInit() {
    if (this._router.url === '/reintegration/referral/opencard/bis/detail') {
      this.getRecById();
      this.isAttachmentRequired = true;
    }
    this.formValidation();
    this.breadcurmbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral/detail", active: '' },
      { label: 'Adoption Menu', href: '/reintegration/referral/opencard/adoption/dashboard', active: '' },
      { label: 'BIS List', active: '', href: '/reintegration/referral/opencard/bis/view' },
      { label: 'BIS', active: 'active' }
    )
  }

  formValidation() {
    this.bisForm = this._fb.group({
      requested: [null],
      completed: [null],
      notes: [null],
    })

  }

  formAction(source: any) {
    source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    source.requested = this._localValues.stringFormatDatetime(Date.parse(source.requested));
    source.completed = this._localValues.stringFormatDatetime(Date.parse(source.completed));
    this.bisResourceList.filter(data => {
      !isNullOrUndefined(data.appealResults_StatusTypeID) ? data.appealResults_StatusTypeID = data.appealResults_StatusTypeID.statusTypeID : null;
      !isNullOrUndefined(data.providerID) ? data.providerID = data.providerID.providerID : null;
      data.providerNotified = this._localValues.stringFormatDatetime(Date.parse(data.providerNotified));
      data.srsApproved = this._localValues.stringFormatDatetime(Date.parse(data.srsApproved));
      data.srsSent = this._localValues.stringFormatDatetime(Date.parse(data.srsSent));
      !isNullOrUndefined(data.bestInterestStaffingID) ? data.bestInterestStaffingID = data.bestInterestStaffingID.bestInterestStaffingID : null;
    })
    this.bis.bestInterestStaffingProviderID = this.bisResourceList;
    !isNullOrUndefined(source.bestInterestStaffingID) ? this.update(source) : this.save(source);
  }

  save(source: BestIntrestingStaff) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveBIS(source).then(data => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      return this._router.navigate(['/reintegration/referral/opencard/bis/view']);
    })
  }

  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateBIS(source).then(data => {
      loader.style.display = 'block';
      swal('Success', 'Record has been updated!', 'success');
      return this._router.navigate(['/reintegration/referral/opencard/bis/view']);
    })
  }

  getRecById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { bestInterestStaffingID: this._client.getId() }
    this._opencard.getByIdBIS(this.req).then(data => {
      loader.style.display = 'none';
      data.bestInterestStaffing.requested = new Date(data.bestInterestStaffing.requested);
      data.bestInterestStaffing.completed = new Date(data.bestInterestStaffing.completed);
      this.bis = data.bestInterestStaffing;
      data.bestInterestStaffingProviderID.map((item) => {
        item.providerID['fullName'] = item.providerID.providerName + ',' + item.providerID.providerTypeID.providerType;
        item.srsapproved = new Date(item.srsApproved);
        item.srssent = new Date(item.srsSent);
      })
      this.bisResourceList = data.bestInterestStaffingProviderID;
      this.bisForm.disable();
      this.isEdit = true;
      this.isbisResourceTableViewOnly = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.bestInterestStaffing.changedBy) ? data.bestInterestStaffing.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.bestInterestStaffing.changedDate) ? moment(data.bestInterestStaffing.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.bestInterestStaffing.enteredBy) ? data.bestInterestStaffing.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.bestInterestStaffing.enteredDate) ? moment(data.bestInterestStaffing.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }

  editForm() {
    this.bisForm.enable();
    this.isEdit = false;
    this.isbisResourceTableViewOnly = false;
  }

  addBisResource(source: any) {
    if (this.btnLabel !== 'Add') {
      this.bisResourceList.splice(this.selectedIndex, 1);
      this.bisResourceList.push(source);
      this.bisResource = new BisResource();
      this.btnLabel = 'Add';
    } else {
      this.bisResourceList.push(source);
      this.bisResource = new BisResource();
      this.btnLabel = 'Add';
    }
  }

  getBisResourceRowData(selectedItem: any, index: any) {
    this.selectedIndex = index;
    !isNullOrUndefined(selectedItem.srsApproved) ? selectedItem.srsApproved = new Date(selectedItem.srsApproved) : null;
    !isNullOrUndefined(selectedItem.srsSent) ? selectedItem.srsSent = new Date(selectedItem.srsSent) : null;
    !isNullOrUndefined(selectedItem.providerNotified) ? selectedItem.providerNotified = new Date(selectedItem.providerNotified) : null;
    this.bisResource = selectedItem;
    this.btnLabel = 'update';
    this.isbisResourceFormOpen = true;
  }

  removeBisResource(index: number) {
    this.bisResourceList.splice(index, 1);
    return this.bisResource = new BisResource();
  }

  getMetaData(event: any, label: any) {
    let obj: any, req: any;
    switch (label) {
      case 'provider':
        obj = 'provider';
        break;
    }
    req = { Object: obj, value: event.query }
    this._caseTeam.getSearchList(req).then((data: any) => {
      data.dropDown.map((item) => {
        item['fullName'] = item.providerName + ',' + item.providerTypeID.providerType;
      });
      this.metaData = data.dropDown;
    });
  }

  filterAppealResults(event: any) {
    let req = { value: event.query }
    this._opencard.listAppeal(req).then(data => {
      this.metaData = data.dropDown;
    })
  }

  bisResourceFormControl() {
    this.bisResource = new BisResource();
    return this.isbisResourceFormOpen = !this.isbisResourceFormOpen;
  }

  resetBisResourceForm() {
    this.bisResource = new BisResource();
    return this.isbisResourceFormOpen = false;
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reintegration/referral/opencard/bis/new' || currentURL == '/reintegration/referral/opencard/bis/detail') {
      this.url = '/reports/attachment-document/rfc/bis';
    }
    else {
      this.url = '/reports/attachment-document/bis';
    }
    return this._router.navigate([this.url])
  }

}
