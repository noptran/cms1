import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { HomeService } from '../../home/home.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { CaseTeamService } from '../../case-team/case-team.service';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import * as moment from 'moment';
import {LocalValues} from '../../local-values';
import { MedicationAllergiesService } from '../../medication-allergies//medication-allergies.service';
import { MedicationAllergies } from './medication-allergies';

@Component({
  selector: 'app-medication-allergies-prtf',
  templateUrl: './medication-allergies-prtf.component.html',
  styleUrls: ['./medication-allergies-prtf.component.scss'],
  inputs: ['isPopUpWindow'],
})
export class MedicationAllergiesPrtfComponent implements OnInit {
  title: any = 'Medications';
  status = 'draft';
  breadcrumbs = [];
  formStatus?: any;
  editControll: boolean;
  medication: MedicationAllergies = new MedicationAllergies();
  metadata = []
  medicationID: any
  formControl: any
  formNavigation = false;
  clientName: any;
  openCards = [];
  quickMenu = "client";
  disabled: any;
  medicationForm: FormGroup;
  subtitle: any;
  clientID: any;
  allergiesCount = 0;
  discardTo = '/reports/medication-allergies/view';
  isAttachmentRequired = false;
  url: any;
  req = {};

  @Input() isPopUpWindow = false;
  @Output() closeModel = new EventEmitter();

  isLoading = false;
  isListView = false;
  isFormView = false;

  tableRows: any;
  tableHeaders: any;
  prtfMedicationID: any;

  constructor(public _medication: MedicationAllergiesService, public _referralView: ReferralViewService,
    public _client: ClildFormService, public _router: Router, public _fb: FormBuilder, public _caseTeam: CaseTeamService, public _opencard: OpencardsService,
    public _localValues: LocalValues) { }

  ngOnInit() {
    this.fetchListViewInfo();
    this.editControll = false;
    this.formControl = false;
    this.formValidation();
    if (this._router.url == '/reports/medication-allergies/details') {
      this.getMedicationDetails();
      this.medicationForm.disable();
      this.isAttachmentRequired = true;
    }

    this.openCards.push(
      { label: 'Allergies', icon: '', count: '' }
    )

  }


  saveForm(source: any) {
    if (this.medicationForm.valid) {
      this._referralView.clientDetails().then(() => {

        source.beginDate = source.beginDate ? Date.parse(source.beginDate) : null;
        source.endDate = source.endDate ? Date.parse(source.endDate) : null;
        source.dosageTypeID !== null && source.dosageTypeID !== undefined ? source.dosageTypeID = source.dosageTypeID.dosageTypeID : null;
        source.frequencyTypeID !== null && source.frequencyTypeID !== undefined ? source.frequencyTypeID = source.frequencyTypeID.frequencyTypeID : null;
        source.client = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
        source['referralID'] = parseInt(localStorage.getItem("referralId")) -
          this._opencard.getHasKey();
        if (source.clientMedicationID) {
          this.isFormView = false;
          this.isLoading = true;
          this._medication.updateMedication(source).then(data => {
            swal('Success', 'Record has been saved!', 'success');
            this.medicationForm.disable();
            this.medication = new MedicationAllergies();
            this.editControll = false;
            this.medicationForm.enable();
            this.fetchListViewInfo();
          });
        }
        else {
          this.isFormView = false;
          this.isLoading = true;
          this._medication.saveMedication(source).then(data => {
            this.isLoading = false;
            swal('Success', 'Record has been updated!', 'success');
            this.medication = new MedicationAllergies();
            this.editControll = false;
            this.medicationForm.enable();
            this.fetchListViewInfo();
          });
        }
      })
    } else {
      swal('Info', 'Please fill the mandatory fields', 'warning');
    }



  }

  editForm() {
    this.formControl = false;
    this.medicationForm.enable();
  }

  getMetadata(event, type: any) {
    let object, req;
    switch (type) {
      case 'dosage':
        object = "dosageType";
        break;
      case 'frequency':
        object = "frequencyType";
        break;
    }
    req = { Object: object, value: event.query };
    this._medication.getMetadata(req).then(data => {
      this.metadata = data.dropDown;
    });
  }

  getMedicationDetails() {
    this.isListView = false;
    this.isLoading = true;
    let medicationId = this.prtfMedicationID;
    let source;
    this.req = { clientMedicationID: medicationId }

    this.editControll = true;
    this.formControl = true;
    this._medication.getMedicationById(this.req).then(data => {
      this.isLoading = false;
      this.isFormView = true;
      source = data.clientMedication;
      this._localValues.medicationAllergiesDelelePRTF = true;
      source.beginDate = new Date(source.beginDate);
      source.endDate = new Date(source.endDate);
      console.log("Medication", source)
      this.medication = source;

      this.editControll = true;
      this.medicationForm.disable();
    })
  }

  resetForm() { }

  discardForm() {
    this.medication = new MedicationAllergies();
    this.editControll = false;
    this.medicationForm.enable();
    this.fetchListViewInfo();
    this.isFormView = false;
  }

  opencardNavigation(event) {
    let url;
    switch (event) {
      case 'Allergies':
        url = '/reports/allergies/view';
        break;
    }
    return this._router.navigate([url]);
  }

  formValidation() {
    this.medicationForm = this._fb.group({
      'medication': [null, Validators.compose([Validators.required])],
      'dosage': [null, Validators.compose([Validators.required])],
      'dosage_type': [null, Validators.compose([Validators.required])],
      'frequency': [null, Validators.compose([Validators.required])],
      'beignDate': [null, Validators.compose([Validators.required])],
      'endDate': [null],
      'prescribedFor': [null, Validators.compose([Validators.required])],
      'prescribed_by': [null, Validators.compose([Validators.required])],
      'source_info': [null],
      'frequencyNotes': [null]
    })
  }

  getOpencardsCount() {
    let req = { clientID: this.clientID }
    this._caseTeam.getTotalCountForOpencards(req).then((data) => {
      this.allergiesCount = data.ClientAllergies
    })
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == '/reports/medication-allergies/details') {
      this.url = '/reports/attachment-document/client/medication';
    }
    else {
      this.url = '/reports/attachment-document/client/medication';
    }
    return this._router.navigate([this.url])
  }

  createRecord() {
    this.medication = new MedicationAllergies();
    this.formControl = false;
    this.isFormView = true;
    this.isListView = false;
  }

  onRowSelected(rowData) {
    this.isAttachmentRequired = true;
    this.prtfMedicationID = rowData['rowData'].clientMedicationID;
    this.getMedicationDetails();
  }

  fetchListViewInfo() {
    this.isLoading = true;
    let clientID =
      parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();

    let globalListReq = {
      openCard: "ClientMedication",
      beginPagination: 1,
      endPagination: 100,
      sort: { column: 'clientMedicationID', mode: "desc" }
    };

    this._opencard.listViewOfClientOpencards(clientID, globalListReq).then((data: any) => {
      this.isLoading = false;
      this.tableRows = data.openCardList;
      this.tableHeaders = [
        {
          label: "Client Name",
          key: "ClientName"
        },
        {
          label: "Medication",
          key: "Medication"
        },
        {
          label: "Dosage",
          key: "Dosage"
        },
        {
          label: "Dosage Type",
          key: "DosageType"
        },
        {
          label: "Frequency Type",
          key: "FrequencyType"
        },
        {
          label: "Begin Date",
          key: "BeginDate"
        },
        {
          label: "End Date",
          key: "EndDate"
        }

      ];
      this.medication = new MedicationAllergies();
      this.medicationForm.enable();
      this.editControll = false;
      this.isListView = true;
    });
  }

  ngOnDestroy() {
    this._localValues.medicationAllergiesDelelePRTF = null;
  }

}
