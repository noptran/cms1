// Angular Utilities
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// Services
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { ClildFormService } from '../child-forms/child-forms.service';

// Other Utilities
import html2pdf from 'html2pdf.js';
import { isNullOrUndefined } from 'util';

// Class
import { kansasUnusual } from './kansas-info';
import { kansasSignificant } from './kansas-info';
import {LocalValues} from '../local-values';
import { UnusualIncident } from '../unusual-incident/unusual-incident';
import {PrintPdf} from "../print-pdf";
import { PrintService } from '../print-layout/service/print.service';

@Component({
  selector: 'app-kansas-form-unusual-incident',
  templateUrl: './kansas-form-unusual-incident.component.html',
  styleUrls: ['./kansas-form-unusual-incident.component.scss'],
  inputs: ['unusualIncidentInfo', 'isDcfCourtForm'],
  outputs: ['kansasOut', 'kansasDiscardOut']
})
export class KansasFormUnusualIncidentComponent implements OnInit {
  sfcsUse_incident = [];
  incident: UnusualIncident = new UnusualIncident;
  clientLastName: any;
  clientFirstName: any;
  idNumber: any;
  dob: any;
  courtCase: any;
  unusualDataCheckBoxValues: kansasUnusual = new kansasUnusual();
  significantDataCheckBoxValues: kansasSignificant = new kansasSignificant();
  isDisableUnusualSection: boolean;
  incidentTime: any;
  discoveryTime: any;
  clientInjury_none = false;
  clientInjury_low = false;
  clientInjury_moderate = false;
  clientInjury_severe = false;
  staffInjury_none = false;
  staffInjury_low = false;
  staffInjury_moderate = false;
  staffInjury_severe = false;
  incidentDate: any;
  discoveryDate: any;
  locationIncident: any;
  lawEnforcementDropdown = [
    { unusualIncidentTypeOption: "Other Called" },
    { unusualIncidentTypeOption: "Parent Called- Child’s Behavior" },
    { unusualIncidentTypeOption: "Placement Called- Child’s Behavior" },
    { unusualIncidentTypeOption: "Placement Called- Other Safety Concern" },
    { unusualIncidentTypeOption: "Placement Called- Report Missing" },
    { unusualIncidentTypeOption: "Police Initiated" },
    { unusualIncidentTypeOption: "Staff Called- Child’s Behaviors" },
    { unusualIncidentTypeOption: "Staff Called- Safety Concern" },
    { unusualIncidentTypeOption: "Staff Called- Report Missing" }
  ];
  acuteCareDropdown = [
    { unusualIncidentTypeOption: "Screened In/Approved" },
    { unusualIncidentTypeOption: "Did Not Screen In" }
  ];
  medicationConcernDropdown = [
    { unusualIncidentTypeOption: "Medication Missed" },
    { unusualIncidentTypeOption: "Medication Not Secured" },
    { unusualIncidentTypeOption: "Medication Omitted" },
    { unusualIncidentTypeOption: "Medication Refused" },
    { unusualIncidentTypeOption: "Pharmacy Error" },
    { unusualIncidentTypeOption: "Wrong Dose" },
    { unusualIncidentTypeOption: "Wrong Person" },
    { unusualIncidentTypeOption: "Wrong Route" },
    { unusualIncidentTypeOption: "Wrong Time" }
  ];

  @Input()
  unusualIncidentInfo: any;
  isDcfCourtForm: any;

  @Output()
  kansasOut = new EventEmitter();
  kansasDiscardOut = new EventEmitter();
  personReporting: any;
  lawEnforcement: string;
  medicationConcern: string;
  screenedAcute: string;

  constructor(public printService: PrintService, public _printPdf: PrintPdf, public _client: ClildFormService, public _opencard: OpencardsService, public _localValues: LocalValues) { }

  ngOnInit() {
    this.getDataInfo();
    this.kansasOut.emit("kansas form emitted from kansas component");
    this.incident = this.unusualIncidentInfo.incident;
    console.log("this.unusualIncidentInfo is", this.unusualIncidentInfo);
    console.log("this.isDcfCourtForm is", this.isDcfCourtForm);
    this.lawEnforcement = this.unusualIncidentInfo.unusualIncidentOption[4];
    this.medicationConcern = this.unusualIncidentInfo.unusualIncidentOption[5];
    this.screenedAcute = this.unusualIncidentInfo.significantIncidentOption[19];

    this.autoFetchData();
    this.dataAlignments();
    this.timeConvertion();
    this.dateValidation();
    this.checkisDcfCourtForm();
    this.setSfcsUseOnlyValues();
    this.checkNullUndefinedValues();
    this.gloabalValuesAutofetch();
    this.fetchUnusualValues(this.unusualIncidentInfo.unusual);
    this.fetchSignicantValues(this.unusualIncidentInfo.significant);
  }

  getDataInfo() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    const req = { clientID: parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey() };
    this._client.getDetailsById(req).then((data: any) => {

      loader.style.display = 'none';
    });

  }

  closeDialogBox() {
    this.kansasDiscardOut.emit();
  }

  async printForm() {

    const data = {
      unusualDataCheckBoxValues: this.unusualDataCheckBoxValues,
      significantDataCheckBoxValues: this.significantDataCheckBoxValues,
      locationIncident: this.locationIncident,
      incident: this.incident,
      discoveryDate: this.discoveryDate,
      incidentDate: this.incidentDate,
      clientLastName: this.clientLastName,
      idNumber: this.idNumber,
      clientInjury_none: this.clientInjury_none,
      clientInjury_low: this.clientInjury_low,
      clientInjury_moderate: this.clientInjury_moderate,
      clientInjury_severe: this.clientInjury_severe,
      staffInjury_none: this.staffInjury_none,
      staffInjury_low: this.staffInjury_low,
      staffInjury_moderate: this.staffInjury_moderate,
      staffInjury_severe: this.staffInjury_severe,
      personReporting: this.personReporting,
      unusualIncidentInfo: this.unusualIncidentInfo,
      dob: this.dob,
      courtCase: this.courtCase,
      isDisableUnusualSection: this.isDisableUnusualSection,

      lawEnforcement: this.lawEnforcement,
      medicationConcern: this.medicationConcern,
      screenedAcute: this.screenedAcute
    }

    this.printService.isPrinting = true;
    this.printService
      .printDocument('kansas', data);

    this.kansasDiscardOut.emit();
  }

  checkNullUndefinedValues() {
    isNullOrUndefined(this.incident.reportID) ? this.incident.reportID = "" : null;
    isNullOrUndefined(this.incident.incidentDate) ? this.incident.incidentDate = "" : null;
    isNullOrUndefined(this.incident.discoveryDate) ? this.incident.discoveryDate = "" : null;
    !isNullOrUndefined(this.incident.providerID) ? this.incident.providerID = this.incident.providerID.providerName : null;
    !isNullOrUndefined(this.incident.payorID) ? this.incident.payorID = this.incident.payorID.payorName : null;
    isNullOrUndefined(this.incident.incidentDescription) ? this.incident.incidentDescription = "" : null;
    isNullOrUndefined(this.incident.followUpNeeded) ? this.incident.followUpNeeded = false : null;
    isNullOrUndefined(this.incident.followUpCompletedDate) ? this.incident.followUpCompletedDate = "" : null;
    isNullOrUndefined(this.incident.recommendations) ? this.incident.recommendations = "" : null;

  }

  gloabalValuesAutofetch() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';

    const req = { clientID: parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey() };
    this._client.getDetailsById(req).then((data: any) => {
      this.clientLastName = data.person.lastName;
      this.clientFirstName = data.person.firstName;
      this.idNumber = data.person.clientID;
      // this.dob = new Date(data.person.dob);
      !isNullOrUndefined(data.person.dob) ? this.dob = (new Date(data.person.dob).getMonth() + 1) + '/' + new Date(data.person.dob).getDate() + '/' + new Date(data.person.dob).getFullYear() : null;
      this.courtCase = data.person.kaecses;

    });
    loader.style.display = 'none';
  }

  isFaxVerbalEmail(objValue) {
    let email = "";
    let fax = "";
    let verbal = "";

    if (objValue.byEmail) {
      email = "Email ";
    }
    if (objValue.byFax) {
      fax = "Fax ";
    }
    if (objValue.byVerbal) {
      verbal = "Verbal ";
    }

    return (email + fax + verbal)
  }


  fetchUnusualValues(data) {
    data.map((item) => {

      switch (item) {

        case 'Any sexual contact between youth':
          this.unusualDataCheckBoxValues.isSexualContact = true;

          break;

        case 'Breach of privacy or confidentiality':
          this.unusualDataCheckBoxValues.isPrivacyConfident = true;

          break;

        case 'Aggressive or Assaulting Behaviors':
          this.unusualDataCheckBoxValues.isAggressiveAssault = true;

          break;

        case 'Restraint':
          this.unusualDataCheckBoxValues.isRestraint = true;
          break;

        case 'Seclusion':
          this.unusualDataCheckBoxValues.isSeclusion = true;
          break;

        case 'Unprofessional conduct by staff or contract staff':
          this.unusualDataCheckBoxValues.isUnprofessionalConduct = true;
          break;

        case 'PRN Injection':
          this.unusualDataCheckBoxValues.isPrnInjection = true;
          break;

        case 'Minor injury of client':
          this.unusualDataCheckBoxValues.isMinorInjury = true;
          break;

        case 'Medication/Pharmacy error/concern':
          this.unusualDataCheckBoxValues.isMedicationPharmacy = true;
          break;

        case 'Law enforcement contact':
          this.unusualDataCheckBoxValues.isLawEnforcement = true;
          break;

      }
    });

  }

  fetchSignicantValues(data) {
    data.map((item) => {

      switch (item) {

        case 'Alleged abuse or neglect':
          this.significantDataCheckBoxValues.isAllegedAbuse = true;

          break;

        case 'Arrested for a juvenile offense':
          this.significantDataCheckBoxValues.isArrested = true;

          break;

        case 'Use of illegal drugs':
          this.significantDataCheckBoxValues.isUseDrugs = true;

          break;

        case 'Runaway or missing from placement':
          this.significantDataCheckBoxValues.isRunaway = true;

          break;

        case 'Alleged abuse or neglect current disclosure (Other)':
          this.significantDataCheckBoxValues.isOther = true;
          break;

        case 'Alleged abuse or neglect Past Disclosure (Prior to SFM services/care)':
          this.significantDataCheckBoxValues.isPastDisclosure = true;
          break;

        case 'Alleged abuse or neglect current disclosure (During SFM services/care)':
          this.significantDataCheckBoxValues.isCurrentDisclosure = true;
          break;

        case 'Alleged abuse or neglect current disclosure (Care Provider)*':
          this.significantDataCheckBoxValues.isCareProvider = true;
          break;

        case 'Alleged abuse or neglect current disclosure (Parent)':
          this.significantDataCheckBoxValues.isParent = true;
          break;

        case 'Alleged abuse or neglect current disclosure (Unknown)':
          this.significantDataCheckBoxValues.isUnknown = true;
          break;

        case 'Alleged abuse or neglect current disclosure (Staff)*':
          this.significantDataCheckBoxValues.isStaff = true;
          break;

        // case 'Psychiatric emergency/screened for acute care':
        //   this.significantDataCheckBoxValues.isAcuteCare = true;
        //   break;

      }
    });

  }

  setSfcsUseOnlyValues() {
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[0].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[0].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[0].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[0].staffFullName = "";
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[1].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[1].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[1].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[1].staffFullName = "";
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[2].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[2].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[2].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[2].staffFullName = "";
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[3].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[3].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[3].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[3].staffFullName = "";
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[4].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[4].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[4].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[4].staffFullName = "";
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[5].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[5].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[5].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[5].staffFullName = "";
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[6].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[6].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[6].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[6].staffFullName = "";
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[7].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[7].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[7].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[7].staffFullName = "";
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[8].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[8].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[8].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[8].staffFullName = "";
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[9].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[9].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[9].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[9].staffFullName = "";
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[10].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[10].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[10].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[10].staffFullName = "";
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[11].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[11].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[11].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[11].staffFullName = "";
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[12].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[12].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[12].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[12].staffFullName = "";
    !isNullOrUndefined(this.unusualIncidentInfo.sfcsUseOnly[13].staffFullName) ? this.unusualIncidentInfo.sfcsUseOnly[13].staffFullName = this.unusualIncidentInfo.sfcsUseOnly[13].staffFullName.staffFullName : this.unusualIncidentInfo.sfcsUseOnly[13].staffFullName = "";
  }

  checkisDcfCourtForm() {
    if (this.isDcfCourtForm === "true") {
      this.isDisableUnusualSection = true;
    }
    else if (this.isDcfCourtForm === "false") {
      this.isDisableUnusualSection = false;
    }
  }

  dateValidation() {
    this.is_date(this.incident.discoveryDate) ? this.discoveryDate = (this.incident.discoveryDate.getMonth() + 1) + '/' + this.incident.discoveryDate.getDate() + '/' + this.incident.discoveryDate.getFullYear() + " " + this.discoveryTime : null;
    this.is_date(this.incident.followUpCompletedDate) ? this.incident.followUpCompletedDate = (this.incident.followUpCompletedDate.getMonth() + 1) + '/' + this.incident.followUpCompletedDate.getDate() + '/' + this.incident.followUpCompletedDate.getFullYear() : null;
    this.is_date(this.incident.incidentDate) ? this.incidentDate = (this.incident.incidentDate.getMonth() + 1) + '/' + this.incident.incidentDate.getDate() + '/' + this.incident.incidentDate.getFullYear() + " " + this.incidentTime : null;
    this.is_date(this.incident.completedDate) ? this.incident.completedDate = (this.incident.completedDate.getMonth() + 1) + '/' + this.incident.completedDate.getDate() + '/' + this.incident.completedDate.getFullYear() : null;

  }

  timeConvertion() {
    this.incidentTime = this._localValues.getTimeAlongWithFormat(Date.parse(this.incident.incidentDate));
    this.discoveryTime = this._localValues.getTimeAlongWithFormat(Date.parse(this.incident.discoveryDate));
  }

  is_date(input) {
    if (Object.prototype.toString.call(input) === "[object Date]")
      return true;
    return false;
  };

  dataAlignments() {
    !isNullOrUndefined(this.incident.reporting_StaffID) ? this.personReporting = `${this.incident.reporting_StaffID.lastName},${this.incident.reporting_StaffID.firstName}` : null;
    if ((this.incident.client_InjuryTypeID !== null)) {
      switch (this.incident.client_InjuryTypeID.injuryTypeID) {
        case 1:
          this.clientInjury_none = true;
          break;
        case 2:
          this.clientInjury_low = true;
          break;
        case 3:
          this.clientInjury_moderate = true;
          break;
        case 4:
          this.clientInjury_severe = true;
          break;
      }
    }
    if ((this.incident.staff_InjuryTypeID !== null)) {
      switch (this.incident.staff_InjuryTypeID.injuryTypeID) {
        case 1:
          this.staffInjury_none = true;
          break;
        case 2:
          this.staffInjury_low = true;
          break;
        case 3:
          this.staffInjury_moderate = true;
          break;
        case 4:
          this.staffInjury_severe = true;
          break;
      }
    }

    return this.incident;
  }

  rowMethod(event) {
    if (!isNullOrUndefined(event)) {
      let singleNewLineCount = this._opencard.search_word(event, "\n");
      let doubleNewLineCount = this._opencard.search_word(event, "\n\n");
      return Math.ceil((event.length / 90) + (singleNewLineCount - doubleNewLineCount));

    }
    else {
      return 3;
    }
  }

  autoFetchData() {
    !isNullOrUndefined(this.unusualIncidentInfo.incident.client_SFAOfficeID) ? this.locationIncident = this.unusualIncidentInfo.incident.client_SFAOfficeID.officeName : this.locationIncident = '';
  }

  suggestionTrigger(event) {
    this.lawEnforcementDropdown = [
      { unusualIncidentTypeOption: "Other Called" },
      { unusualIncidentTypeOption: "Parent Called- Child’s Behavior" },
      { unusualIncidentTypeOption: "Placement Called- Child’s Behavior" },
      { unusualIncidentTypeOption: "Placement Called- Other Safety Concern" },
      { unusualIncidentTypeOption: "Placement Called- Report Missing" },
      { unusualIncidentTypeOption: "Police Initiated" },
      { unusualIncidentTypeOption: "Staff Called- Child’s Behaviors" },
      { unusualIncidentTypeOption: "Staff Called- Safety Concern" },
      { unusualIncidentTypeOption: "Staff Called- Report Missing" }
    ];
    this.acuteCareDropdown = [
      { unusualIncidentTypeOption: "Screened In/Approved" },
      { unusualIncidentTypeOption: "Did Not Screen In" }
    ];
    this.medicationConcernDropdown = [
      { unusualIncidentTypeOption: "Medication Missed" },
      { unusualIncidentTypeOption: "Medication Not Secured" },
      { unusualIncidentTypeOption: "Medication Omitted" },
      { unusualIncidentTypeOption: "Medication Refused" },
      { unusualIncidentTypeOption: "Pharmacy Error" },
      { unusualIncidentTypeOption: "Wrong Dose" },
      { unusualIncidentTypeOption: "Wrong Person" },
      { unusualIncidentTypeOption: "Wrong Route" },
      { unusualIncidentTypeOption: "Wrong Time" }
    ];
  }

}
