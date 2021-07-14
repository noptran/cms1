import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SfcsContract } from './sfcs-contract';
import { OpencardsService } from '../../../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ClildFormService } from '../../../child-forms/child-forms.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sfcs-contract',
  templateUrl: './sfcs-contract.component.html',
  styleUrls: ['./sfcs-contract.component.scss']
})
export class SfcsContractComponent implements OnInit {
  breadcrumbs = [];
  sfcsContractForm: FormGroup;
  sc: SfcsContract = new SfcsContract();
  metaData = [];
  discardTo = '/reports/provider-sponser/sfcs-contract/view';

  constructor(public _client: ClildFormService, public _router: Router, public _opencard: OpencardsService, public _fb: FormBuilder) { }

  ngOnInit() {
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Provider Sponser List', href: '/reports/provider-sponser/view', active: '' },
      { label: 'Provider Sponser', active: '', href: '/reports/provider-sponser/detail' },
      { label: 'SFCS Contract List', active: '', href: '/reports/provider-sponser/sfcs-contract/view' },
      { label: 'SFCS Contract', active: 'active' }
    )
    if (this._router.url.includes('/reports/provider-sponser/sfcs-contract/detail')) {
      this.getDetailsById();
    }
  }

  formValidation() {
    this.sfcsContractForm = this._fb.group({
      "sponsorID": [null],
      "sponsorContractTypeID": [null],
      "beginDate": [null],
      "endDate": [null],
      "enteredDate": [null],
      "changedDate": [null],
      "enteredBy": [null],
      "changedBy": [null],
      "notes": [null]
    })

  }

  getMetaData(event: any, label: any) {

    switch (label) {
      case 'contractType':
        this._opencard.getSponsorContractType().then((data: any) => {
          this.metaData = data.sponsorContractTypeList;
        });
        break;

    }


  }

  formAction(source) {
    let currentDate = new Date();
    const req = {
      'beginDate': (source.beginDate) ? Date.parse(source.beginDate) : null,
      'endDate': (source.endDate) ? Date.parse(source.endDate) : null,
      'notes': (source.notes) ? source.notes : null,
      'sponsorContractTypeID': (source.sponsorContractTypeID) ? source.sponsorContractTypeID.sponsorContractTypeID : null,
      'enteredDate': Date.parse(currentDate.toDateString()),
      'changedDate': Date.parse(currentDate.toDateString()),

      // ------------Only for testing purpose----to be removed once api is given------------
      'sponsorID': parseInt(localStorage.getItem('sponsorID')) -
        this._opencard.getHasKey(),
      "enteredBy": 'ADMIN',
      "changedBy": 'ADMIN',
      // -----------------------------------------------------------------------------------

    };

    (source.sponsorContractID) ? this.update(req) : this.save(req);

  }

  save(req) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.saveSfcsContract(req).then((data) => {
      swal('Success', 'Record has been saved!', 'success');
      loader.style.display = 'none';
      this._router.navigate(['/reports/provider-sponser/sfcs-contract/view']);
    });
  }

  update(req) {
    req['sponsorContractID'] = this.sc.sponsorContractID;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.updateSfcsContract(req).then((data) => {
      swal('Success', 'Record has been updated!', 'success');
      loader.style.display = 'none';
      this._router.navigate(['/reports/provider-sponser/sfcs-contract/view']);
    });
  }

  getDetailsById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let sponsorContractID = this._client.getId();
    let req = { sponsorContractID: sponsorContractID };
    this._opencard.getSponsorContractById(req).then((data) => {
      (data.sponsorContract.beginDate) ? data.sponsorContract.beginDate = moment((data.sponsorContract.beginDate)).format('MM/DD/YYYY HH:mm') : null;
      (data.sponsorContract.endDate) ? data.sponsorContract.endDate = moment((data.sponsorContract.endDate)).format('MM/DD/YYYY HH:mm') : null;

      this.sc['beginDate'] = data.sponsorContract.beginDate;
      this.sc['endDate'] = data.sponsorContract.endDate;
      this.sc['notes'] = data.sponsorContract.notes;
      this.sc['sponsorContractTypeID'] = (data.sponsorContract.sponsorContractTypeID) ? data.sponsorContract.sponsorContractTypeID : null;
      this.sc['sponsorContractID'] = data.sponsorContract.sponsorContractID;
      loader.style.display = 'none';
    })
  }

}
