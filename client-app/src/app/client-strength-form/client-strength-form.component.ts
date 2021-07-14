import { Component, OnInit } from '@angular/core';
import { ClientStrength } from './client-strength';
import { ClientStrengthService } from '../client-strength/client-strength.service';
import { HomeService } from '../home/home.service';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ClildFormService } from '../child-forms/child-forms.service';
import * as moment from 'moment';


@Component({
  selector: 'app-client-strength-form',
  templateUrl: './client-strength-form.component.html',
  styleUrls: ['./client-strength-form.component.scss']
})
export class ClientStrengthFormComponent implements OnInit {
  formControl: any;
  strength: ClientStrength = new ClientStrength();
  title = 'Client Strength';
  status = 'draft';
  quickMenu = 'client';
  breadcrumbs = [];
  formstatus: any;
  formNavigation = false;
  editControll = false;
  metadata = [];
  clientName: any;
  clientId: any;
  formStatus: any;
  clientStrengthForm: FormGroup;
  discardTo = '/reports/client-strength/view';
  url: any;
  isAttachmentRequired = false;
  req = {};
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: '',
  };
  isFormLog = false;

  constructor(public _clientStrength: ClientStrengthService,
    public _fb: FormBuilder, public _home: HomeService, public _opencards: OpencardsService,
    public _router: Router, public _client: ClildFormService) { }

  ngOnInit() {

    this.getClientDetails();
    if (this._router.url == '/reports/client-strength/details') {
      this.getStrengthDetails();
      this.isAttachmentRequired = true;
    }
    this.formValidation();
    this.breadcrumbs.push(
      { label: 'Person Types', href: '/reports/person/types', active: '' },
      { label: 'Client', href: '/reports/client/details', active: '' },
      { label: 'Client Strength List', href: '/reports/client-strength/view', active: '' },
      { label: 'Client Strength', active: 'active' },
    );

  }

  formValidation() {
    this.clientStrengthForm = this._fb.group({
      'StrengthID': [null, Validators.compose([Validators.required])],
      'strengthInformationSourceID': [null, Validators.compose([Validators.required])],
      'current': [null],
      'explanation': [null, Validators.compose([Validators.required])]
    });
  }

  getClientDetails() {
    let localId;
    localId = localStorage.getItem('clientId');
    this.clientId = localId - this._opencards.getHasKey();
    console.log('Client id', this.clientId);
  }

  /**
   *
   * @param event
   * @param source
   */
  saveForm(source) {
    if (this.clientStrengthForm.valid) {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      source.clientID = parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey();
      source.strengthID !== undefined && source.strengthID !== null ? source.strengthID = source.strengthID.strengthID : null;
      source.strengthInformationSourceID !== undefined && source.strengthInformationSourceID !== null ? source.strengthInformationSourceID = source.strengthInformationSourceID.strengthInformationSourceID : null;
      if (source.strengthGroupID) {
        this._clientStrength.updateClientStrength(source).then(data => {
          loader.style.display = 'none';
          this._home.sucessAlert(data);
          this.editControll = true;
          this.clientStrengthForm.disable();
          this._router.navigate(['/reports/client-strength/view']);
        });
      } else {
        this._clientStrength.saveClientStrength(source).then(data => {
          loader.style.display = 'none';
          this._home.sucessAlert(data);
          this.editControll = true;
          this.clientStrengthForm.disable();
          this._router.navigate(['/reports/client-strength/view']);
        });
      }
    } else {
      swal('Warning', 'Please fill the mandatory fields', 'warning');
    }

  }

  /**
   * @returns
   */
  editForm() {
    this.clientStrengthForm.enable();
    this.formControl = false;
  }

  /**
   * @returns metadata
   * @param event metadata event
   * @param label type of metadata
   */
  getMetadata(event, label) {
    let object, req;
    switch (label) {
      case 'strength':
        object = 'strength';
        break;
      case 'source':
        object = 'strengthInformationSource';
        break;
    }
    req = { Object: object, value: event.query };
    return this._clientStrength.metadataOfClientStrength(req).then(data => {
      this.metadata = data.dropDown;
    });
  }

  /**
   * Get the client strenght details based on record id.
   */
  getStrengthDetails() {
    let localStrengthId, strengthId;
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    localStrengthId = localStorage.getItem('strengthId');
    if (localStrengthId > 0) {
      strengthId = localStrengthId - this._opencards.getHasKey();
    } else {
      strengthId = this._client.getId();
    }
    this.req = { clientStrengthID: strengthId };
    this._opencards.getClientStrengthById(this.req).then((data) => {
      loader.style.display = 'none';
      this.strength = data.clientStrength;
      this.editControll = true;
      this.clientStrengthForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = (data.clientStrength.changedBy) ? data.clientStrength.changedBy : '------';
      this.formLogInfo.changedDate = (data.clientStrength.changedDate) ? moment(data.clientStrength.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = (data.clientStrength.enteredBy) ? data.clientStrength.enteredBy : '------';
      this.formLogInfo.enteredDate = (data.clientStrength.enteredDate) ? moment(data.clientStrength.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    });


  }

  resetForm() { }

  discardForm() { }

  navigateTo() {
    const currentURL = this._router.url;
    if (currentURL == '/reports/client-strength/details') {
      this.url = '/reports/attachment-document/client/client-strength';
    } else {
      this.url = '/reports/attachment-document/client/client-strength';
    }
    return this._router.navigate([this.url]);
  }


}
