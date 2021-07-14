import { Component, OnInit } from '@angular/core';
import { Bis } from './BIS';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { CaseTeamService } from '../../../case-team/case-team.service';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { ProviderService } from '../../provider.service';
@Component({
  selector: 'app-provider-adoption-bis',
  templateUrl: './provider-adoption-bis.component.html',
  styleUrls: ['./provider-adoption-bis.component.scss']
})
export class ProviderAdoptionBISComponent implements OnInit {

  bis: Bis = new Bis();
  bestInterestStaffing: FormGroup;
  breadcrumbs = [];
  results = [];
  discardTo = '/provider/opencard/adoption/BIS/view';
  isEdit = false;
  url: any;
  isDisabled = true;
  isDisableSave = true;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(public _router: Router, public _caseTeam: CaseTeamService,
    public _opencard: OpencardsService, public _fb: FormBuilder,
    public _provider: ProviderService, ) { }

  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider List', href: '/reports/provider/view', active: '' },
      { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
      { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
      { label: 'Provider Adoption', active: '', href: '/provider/opencard/adoption/detail' },
      { label: 'Adoption SubNode', active: '', href: '/provider/dashboard/adoption/subnode' },
      { label: 'BIS List', active: '', href: '/provider/opencard/adoption/BIS/view' },
      { label: 'BIS', active: 'active' }
    );
    if (this._router.url === '/provider/opencard/adoption/BIS/detail') {
      this.getBIS();
    }
  }



  getBIS() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const id = parseInt(localStorage.getItem('BestInterestStaffingID')) - this._opencard.getHasKey();
    const req = { 'bestInterestStaffingID': id };
    this._provider.getProviderBIS(req).then((data: any) => {
      !isNullOrUndefined(data.adoption.Held) ? data.adoption.Held =
        moment.utc(data.adoption.Held).format('MM/DD/YYYY') : null;
      !isNullOrUndefined(data.adoption.DCFAuthorized) ? data.adoption.DCFAuthorized =
        moment.utc(data.adoption.DCFAuthorized).format('MM/DD/YYYY') : null;
      !isNullOrUndefined(data.adoption.FamilyNotified) ? data.adoption.FamilyNotified =
        moment.utc(data.adoption.FamilyNotified).format('MM/DD/YYYY') : null;
      !isNullOrUndefined(data.adoption.Requested) ? data.adoption.Requested =
        moment.utc(data.adoption.Requested).format('MM/DD/YYYY') : null;
      !isNullOrUndefined(data.adoption.DCFAuthRequested) ? data.adoption.DCFAuthRequested =
        moment.utc(data.adoption.DCFAuthRequested).format('MM/DD/YYYY') : null;
      this.bis = data.adoption;
      this.bestInterestStaffing.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.adoption.changedBy) ? data.adoption.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.adoption.changedDate) ? moment(data.adoption.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.adoption.enteredBy) ? data.adoption.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.adoption.enteredDate) ? moment(data.adoption.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

      loader.style.display = 'none';
    });
  }

  formValidation() {
    this.bestInterestStaffing = this._fb.group({
      FamilyNotified: [null],
      Selected: [null],
      Notes: [null],
      client: [null],
      requested: [null],
      DCFAuthRequested: [null],
      Held: [null],
      DCFAuthorized: [null],
      DCFNotApproved: [null],
      ICPC: [null],
      Appealed: [null],
      AppealResults: [null]
    });
  }

}
