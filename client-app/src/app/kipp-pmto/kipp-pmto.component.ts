import { Component, OnInit } from '@angular/core';
import { KippPmto } from './kipp-pmto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CaseTeamService } from '../case-team/case-team.service';
import { Router } from '@angular/router';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-kipp-pmto',
  templateUrl: './kipp-pmto.component.html',
  styleUrls: ['./kipp-pmto.component.scss']
})
export class KippPMTOComponent implements OnInit {
  kPmto: KippPmto = new KippPmto();
  kPmtoForm: FormGroup;
  isEdit = false;
  discardTo = '/reports/referral/family-preservation/kipp-pmto/view';
  breadcrumbs = [];
  quickMenu: any;
  url: any;
  isAttachmentRequired = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;


  constructor(public _fb: FormBuilder, public _caseTeam: CaseTeamService, public _router: Router,
    public _opencard: OpencardsService, public _client: ClildFormService) { }

  ngOnInit() {
    if (this._router.url === '/reports/referral/family-preservation/kipp-pmto/detail') {
      this.getById();
      this.isAttachmentRequired = true;
    }
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'List', href: '/reports/client', active: '' },
      { label: 'Form', href: '/reports/client/details', active: '' },
      { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
      { label: 'KIPP/PMTO List', active: '', href: '/reports/referral/family-preservation/kipp-pmto/view' },
      { label: 'KIPP/PMTO', active: 'active' },
    )
  }

  formValidation() {
    this.kPmtoForm = this._fb.group({
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      notes: [null],
    })
  }
  formAction(source: any) {
    if (this.kPmtoForm.valid) {
      !isNullOrUndefined(source.beginDate) ? source.beginDate = Date.parse(source.beginDate) : null;
      !isNullOrUndefined(source.endDate) ? source.endDate = Date.parse(source.endDate) : null;
      source.referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
      !isNullOrUndefined(source.kippID) ? this.update(source) : this.save(source);
    } else {
      swal('Warning', 'Please fill the mandatory fields', 'warning');
    }

  }
  save(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.saveKippPmto(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this._router.navigate(['/reports/referral/family-preservation/kipp-pmto/view'])
    })
  }
  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this._opencard.updateKippPmto(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this._router.navigate(['/reports/referral/family-preservation/kipp-pmto/view'])
    })
  }
  getById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    const req = { kippID: this._client.getId() }
    this._opencard.getByIdKippPmto(req).then((data: any) => {
      loader.style.display = 'none';
      if (data.clientSchool.isActive) {
        !isNullOrUndefined(data.KIPP.beginDate) ? data.KIPP.beginDate = moment(data.KIPP.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.KIPP.endDate) ? data.KIPP.endDate = moment(data.KIPP.endDate).format('MM/DD/YYYY HH:mm') : null;
      } else {
        !isNullOrUndefined(data.KIPP.beginDate) ? data.KIPP.beginDate = moment.utc(data.KIPP.beginDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.KIPP.endDate) ? data.KIPP.endDate = moment.utc(data.KIPP.endDate).format('MM/DD/YYYY HH:mm') : null;
      }

      this.kPmto = data.KIPP;
      this.isEdit = true;
      this.kPmtoForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.KIPP.changedBy) ? data.KIPP.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.KIPP.changedDate) ? moment(data.KIPP.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.KIPP.enteredBy) ? data.KIPP.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.KIPP.enteredDate) ? moment(data.KIPP.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
  }
  editForm() {
    this.isEdit = false;
    this.kPmtoForm.enable();
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reports/referral/family-preservation/kipp-pmto/detail') {
      this.url = '/reports/attachment-document/kipp-pmto';
    }

    return this._router.navigate([this.url])
  }


}
