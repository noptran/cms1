// Angular Utilities
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// Services
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { ClildFormService } from '../../child-forms/child-forms.service';

// Other Utilities
import html2pdf from 'html2pdf.js';
import { isNullOrUndefined } from 'util';

// Class
import { kansasUnusual } from './kansas';
import { kansasSignificant } from './kansas';
import {LocalValues} from '../../local-values';
import { UnusualIncident } from '../../unusual-incident/unusual-incident';
import {PrintPdf} from "../../print-pdf";
import { PrintService } from '../../print-layout/service/print.service';

@Component({
  selector: 'app-kansas-print',
  templateUrl: './kansas-print.component.html',
  styleUrls: ['./kansas-print.component.scss']
})
export class KansasPrintComponent implements OnInit {
  unusualDataCheckBoxValues: any;
  significantDataCheckBoxValues: any;
  locationIncident: any;
  incident: any;
  discoveryDate: any;
  incidentDate: any;
  clientLastName: any;
  idNumber: any;
  clientInjury_none: any;
  clientInjury_low: any;
  clientInjury_moderate: any;
  clientInjury_severe: any;
  staffInjury_none: any;
  staffInjury_low: any;
  staffInjury_moderate: any;
  staffInjury_severe: any;
  personReporting: any;
  unusualIncidentInfo: any;
  dob: any;
  courtCase: any;
  isDisableUnusualSection: boolean;
  lawEnforcement: any;
  medicationConcern: any;
  screenedAcute: any;

  clientFirstName: any;

  constructor(public _opencard: OpencardsService, public printService: PrintService) { }

  ngOnInit() {
    this.unusualDataCheckBoxValues = this.printService.kansasData.unusualDataCheckBoxValues;
    this.significantDataCheckBoxValues = this.printService.kansasData.significantDataCheckBoxValues;
    this.locationIncident = this.printService.kansasData.locationIncident;
    this.incident = this.printService.kansasData.incident;
    this.discoveryDate = this.printService.kansasData.discoveryDate;
    this.incidentDate = this.printService.kansasData.incidentDate;
    this.clientLastName = this.printService.kansasData.clientLastName;
    this.idNumber = this.printService.kansasData.idNumber;
    this.clientInjury_none = this.printService.kansasData.clientInjury_none;
    this.clientInjury_low = this.printService.kansasData.clientInjury_low;
    this.clientInjury_moderate = this.printService.kansasData.clientInjury_moderate;
    this.clientInjury_severe = this.printService.kansasData.clientInjury_severe;
    this.staffInjury_none = this.printService.kansasData.staffInjury_none;
    this.staffInjury_low = this.printService.kansasData.staffInjury_low;
    this.staffInjury_moderate = this.printService.kansasData.staffInjury_moderate;
    this.staffInjury_severe = this.printService.kansasData.staffInjury_severe;
    this.personReporting = this.printService.kansasData.personReporting;
    this.unusualIncidentInfo = this.printService.kansasData.unusualIncidentInfo;
    this.dob = this.printService.kansasData.dob;
    this.courtCase = this.printService.kansasData.courtCase;
    this.isDisableUnusualSection = this.printService.kansasData.isDisableUnusualSection;
    this.lawEnforcement = this.printService.kansasData.lawEnforcement;
    this.medicationConcern = this.printService.kansasData.medicationConcern;
    this.screenedAcute = this.printService.kansasData.screenedAcute;

    this.printService.isPrinting = true;
    this.printService.onDataReady();

  }


}
