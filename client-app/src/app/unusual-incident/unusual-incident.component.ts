import { Component, OnInit } from '@angular/core';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { Router } from '@angular/router';
import { CaseTeamService } from '../case-team/case-team.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnusualIncident, printUnusualIncident, FormTrackerDetails } from './unusual-incident';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import { ReferralViewService } from '../referral-view/referral-view.service';
import html2pdf from 'html2pdf.js';
import { ProviderService } from '../provider/provider.service';
import {LocalValues} from '../local-values';
import {PrintPdf} from "../print-pdf";
import { PlacementService } from '../placement/placement.service';
import { TeamFormService } from '../team-form/team-form.service';
import { PrintService } from '../print-layout/service/print.service';
@Component({
  selector: 'app-unusual-incident',
  templateUrl: './unusual-incident.component.html',
  styleUrls: ['./unusual-incident.component.scss']
})
export class UnusualIncidentComponent implements OnInit {
  clientIncidentType = [];
  significantIncidentType = [];
  isEdit = false;
  breadcrumbs = [];
  metaData = [];

  incidentForm: FormGroup;
  printIncidentForm: FormGroup;
  incident: UnusualIncident = new UnusualIncident();
  printValue: printUnusualIncident = new printUnusualIncident();
  discardTo;
  rmOnly = false;
  critical_incident = [];
  significant_incident = [];
  unusual_incident = [];
  sfcsUse_incident = [];
  sfcs_office_checklist = [];
  additional_clients = [];
  referralClients = [];
  quickMenu = 'client';
  selectedReferralId: any;
  selectedReferralTypeId: any;
  additonalClients = [];
  optionsOfAdditonalClients = [];
  selected_critical_incident = [];
  selected_significant_incident = [];
  selected_unusual_incident = [];
  selected_sfcsUse_incident = [];
  nameObj: any;
  personName: any;
  personSubType: any;
  personInvolvedList = [];
  selectedIndex: any;
  personBtnLabel = 'Add';
  reportAnonymities: any;
  filteredReportAnonymities = [];
  criticalIncidentValue = [];
  SignificantIncidentValue = [];
  UnusualIncidentValue = [];
  showAdditionalClients = false;
  url: any;
  isAttachmentRequired = false;
  isPrint = false;
  isUnusualAttachmentOpen = false;

  clientLastName: any;
  clientFirstName: any;
  idNumber: any;
  dob: any;
  courtCase: any;

  providerName: any;
  isAdultDeath = false;
  isChildSevere = false;
  isClientNearDeath = false;
  isIncidentDrawPublic = false;

  isDeathOfParent = false;
  isRunAway = false;
  isArrestedJuvenile = false;
  isAllegedAbuseOrNeglect = false;
  isClientAllegedPerperator = false;
  isAttemptedSuicide = false;
  isSeriousPhysicalIllness = false;
  isUnanticipatedMedicalAttention = false;
  isPsychiatricEmergency = false;
  isPsychiatricChronic = false;
  isPregnancy = false;
  isBirth = false;
  isEmergencyChange = false;
  isUseOfIllegalDrugs = false;
  isAllegedVictimHuman = false;
  isAllegedAnimalAbuse = false;
  isWorkRelatedInjury = false;
  isProviderStaffIncidents = false;
  isSafetyOfEnvironment = false;
  isOtherListInDes = false;

  disDate: any;
  followUpDate: any;
  dobDate: any;
  significantIncidentOption = [];
  unusualIncidentOption = [];
  criticalIncidentOption = [];
  criticalRatingValue = [];
  date: any;
  contract_StateID: any;
  isKansasAttachmentOpen = false;
  kansasInfo: any;
  isKansasFormOpen = false;
  isDcfCourtTrue = "true";
  isProvider = false;
  isDisableSave = false;
  isAllinvolve = false;
  isDisableClientName = false;
  filteredReferrals = [];
  isViewMode = false;
  isDisableAdditionalClients = false;

  //
  isAggressive = false;
  isAnySexualContact = false;
  isBreach = false;
  isDischargeMedical = false;
  isLawEnforcement = false;
  isMedicationPharmacy = false;
  isMinorInjury = false;
  isPrnInjection = false;
  isRestrain = false;
  isSeclusion = false;
  isUnauthorizedTreatment = false;
  isUnprofessionalConduct = false;
  completedDate: any;

  clientInjury_none = false;
  clientInjury_low = false;
  clientInjury_moderate = false;
  clientInjury_severe = false;
  staffInjury_none = false;
  staffInjury_low = false;
  staffInjury_moderate = false;
  staffInjury_severe = false;
  incidentTime: any;
  discoveryTime: any;


  isPPSDataFetched = false;
  isFosterParentCriminal = false;
  isChildWithSevereInjuries = true;
  county: any;
  referralDate: string;
  ppsInfo: any;
  incidentDate: string;
  staffName: string;
  req: any;
  formTracker: FormTrackerDetails = new FormTrackerDetails();
  isUnusualIncidentOptionDisable = false;
  isMediaIncident = false;
  isPps0550MediaIncident = false;
  isFooterVisible = false;

  constructor(public _team: TeamFormService, public _placement: PlacementService, public _printPdf: PrintPdf, public _opencard: OpencardsService, public _router: Router, public _caseTeam: CaseTeamService,
    public _client: ClildFormService, public _fb: FormBuilder, public _provider: ProviderService, public _localValues: LocalValues, public _printService: PrintService) { }

  ngOnInit() {
    this.incident.unusualIncidentChildrenLivingInTheHomeID = [];
    this.date = new Date();
    this.clientIncidentType = [
      { id: 1, value: 'Adult (Client) Death (Mississippi Only)*' },
      { id: 2, value: 'Child in DCF Custody with Severe Injuries' },
      { id: 3, value: 'Child with Severe Bodily Injuries (Not in DCF Custody)' },
      { id: 4, value: 'Client death*' },
      { id: 5, value: 'Client near death*' },
      { id: 6, value: 'Foster Parent with Criminal Proceedings Related to Abuse' },
      { id: 6, value: 'Incident which may draw public, legislative, or media concern*' },
    ];
    if ((this._router.url === '/reports/opencards/list/client/critical-significant-unusual-incident/new' ||
      this._router.url === '/reports/opencards/list/client/critical-significant-unusual-incident/detail')) {
      this.breadcrumbs.push(
        { label: 'List', href: '/reports/client', active: '' },
        { label: 'Form', href: '/reports/client/details', active: '' },
        { label: 'Unusual Incident List', active: '', href: '/reports/opencards/list/client/critical-significant-unusual-incident/view' },
        { label: 'Unusual Incident Form', active: 'active' },
      );
      this.discardTo = '/reports/opencards/list/client/critical-significant-unusual-incident/view';
    }
    this.getIncidentTypes('sfcsUse_incident');

    if ((this._router.url === '/reports/opencards/list/client/critical-significant-unusual-incident/detail')
      || (this._router.url === '/reports/opencards/list/client/critical-significant-unusual-incident-RM/detail')
      || (this._router.url === '/provider/opencard/critical-incidents-allinvolve/detail')
      || (this._router.url === '/provider/opencard/critical-incidents-rm/detail')
      || (this._router.url === '/provider/opencard/critical-incidents/detail')) {
      this.isPrint = true;
      this.isAttachmentRequired = true;
      this.isViewMode = true;
      this.getIncidentTypes('significant_incident').then(() => { this.getById(); });
      this.setStaffInfoInRequest()
    }

    this.formValidation();
    if (this._router.url.includes('/reports/opencards/list/client/critical-significant-unusual-incident-RM/new')) {
      this.rmOnly = true;
      this.breadcrumbs.push(
        { label: 'List', href: '/reports/client', active: '' },
        { label: 'Form', href: '/reports/client/details', active: '' },
        {
          label: 'Unusual Incident-RM List', active: '',
          href: '/reports/opencards/list/client/critical-significant-unusual-incident-RM/view'
        },
        { label: 'Unusual Incident-RM Form', active: 'active' },
      );
      this.discardTo = '/reports/opencards/list/client/critical-significant-unusual-incident-RM/view';
    }
    if (this._router.url === '/reports/opencards/list/client/critical-significant-unusual-incident-RM/detail') {
      this.breadcrumbs.push(
        { label: 'List', href: '/reports/client', active: '' },
        { label: 'Form', href: '/reports/client/details', active: '' },
        {
          label: 'Unusual Incident-RM List', active: '',
          href: '/reports/opencards/list/client/critical-significant-unusual-incident-RM/view'
        },
        { label: 'Unusual Incident-RM Form', active: 'active' },
      );
      this.discardTo = '/reports/opencards/list/client/critical-significant-unusual-incident-RM/view';
      this.rmOnly = true;
    }
    this.getIncidentTypes('unusual_incident');
    this.getIncidentTypes('critical_incident');
    this.getIncidentTypes('significant_incident');

    this.optionsOfAdditonalClients.push(
      { view: 'Only Cients with Same Facts', value: 'onlyClientsWithSameFacts' },
      { view: 'Open Clients Only', value: 'openClientsOnly' },
      { view: 'Closed Clients Only', value: 'closedClientsOnly' },
      { view: 'All Clients', value: 'allClients' },
      { view: 'Clients w/o Cases', value: 'clientsw/oCases' },
    );
    this.getReportId();
    this.getAnonymityType();
    this.providerBreadCrumbs();
    if (this._router.url.includes('provider', 0)) {
      this.isProvider = true;
      this.isDisableAdditionalClients = true;
    }
    if ((this._router.url === '/provider/opencard/critical-incidents-allinvolve/new') ||
      (this._router.url === '/provider/opencard/critical-incidents-allinvolve/detail')) {
      this.isAllinvolve = true; this.isProvider = true;
    }
    this.getProviderIncidentAutofetchFields();
    this.getAvailableReferrals();

    if (this._router.url.includes('new')) {
      this.isFooterVisible = true;
    }
  }

  providerBreadCrumbs() {

    if ((this._router.url === '/provider/opencard/critical-incidents/detail') || (this._router.url === '/provider/opencard/critical-incidents/new')) {
      this.breadcrumbs.push(
        { label: 'Person Types', href: '/reports/person/types', active: '' },
        { label: 'Provider List', href: '/reports/provider/view', active: '' },
        { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
        { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
        { label: 'critical-incidents', active: '', href: '/provider/dashboard/critical-incidents' },
        { label: 'critical-incidents list', active: '', href: '/provider/opencard/critical-incidents/view' },
        {
          label: 'Critical Incident', active: 'active'
        },
      );
      this.discardTo = '/provider/opencard/critical-incidents/view';
    }

    if ((this._router.url === '/provider/opencard/critical-incidents-rm/detail') || (this._router.url === '/provider/opencard/critical-incidents-rm/new')) {
      this.breadcrumbs.push(
        { label: 'Person Types', href: '/reports/person/types', active: '' },
        { label: 'Provider List', href: '/reports/provider/view', active: '' },
        { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
        { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
        { label: 'critical-incidents', active: '', href: '/provider/dashboard/critical-incidents' },
        { label: 'critical-incidents-RM list', active: '', href: '/provider/opencard/critical-incidents-rm/view' },
        {
          label: 'Critical Incident RM', active: 'active'
        },
      );
      this.discardTo = '/provider/opencard/critical-incidents-rm/view';
      this.rmOnly = true;
    }

    if ((this._router.url === '/provider/opencard/critical-incidents-allinvolve/detail') || (this._router.url === '/provider/opencard/critical-incidents-allinvolve/new')) {
      this.breadcrumbs.push(
        { label: 'Person Types', href: '/reports/person/types', active: '' },
        { label: 'Provider List', href: '/reports/provider/view', active: '' },
        { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
        { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
        { label: 'critical-incidents', active: '', href: '/provider/dashboard/critical-incidents' },
        { label: 'critical-incidents-All involve list', active: '', href: '/provider/opencard/critical-incidents-allinvolve/view' },
        {
          label: 'Critical Incident-All involve', active: 'active'
        },
      );
      this.discardTo = '/provider/opencard/critical-incidents-allinvolve/view';
      this.isDisableSave = true;
      this.isEdit = false;
    }
  }

  getReportId() {
    const date = Date.now();
    const req = {
      'discoveryDate': moment(date).format('YYYY-MM-DD'),
    };
    this._caseTeam.getUnusualReportID(req).then(data => {
      this.incident.reportID = data.newReportID[0].reportID;
    });
  }
  getListDetails(obj: any, label: any, i: any) {
    this.selectedIndex = i;
    switch (label) {
      case 'person':
        this.personName = obj.personName;
        this.personSubType = obj.personAssignmentTypeID;
        this.personBtnLabel = 'update';
        break;
    }
  }

  formValidation() {
    this.incidentForm = this._fb.group({
      unusualIncidentID: [null],
      referralID: [null],
      reportID: [null],
      incidentDate: [null],
      discoveryDate: [null],
      payorID: [null],
      client_SFAOfficeID: [null],
      providerID: [null, { disabled: this.isProvider }],
      provider_SFAOfficeID: [null],
      sponsorID: [null],
      staff_InjuryTypeID: [null],
      client_InjuryTypeID: [null],
      incidentDescription: [null],
      followUpNeeded: [null],
      recommendations: [null],
      followUpCompletedDate: [null],
      reporting_StaffID: [null],
      completedDate: [null],
      unusualIncidentAnonymityTypeID: [null],
      client: [null],
      personSubType: [null],
      personName: [null],
      additonalClients: [null],
      allowStaffToEdit: [null],
      boardReviewDate: [null],
      fieldAvailableDate: [null],
      response: [null],
      rmFollowUpCompletedDate: [null],
      substantiatedAbuseNeglect: [null],
      unusualIncidentCriticalID: [null],

      providerName: [null],
      isAdultDeath: [null],
      isChildSevere: [null],
      isClientNearDeath: [null],
      isIncidentDrawPublic: [null],

      isDeathOfParent: [null],
      isRunAway: [null],
      isArrestedJuvenile: [null],
      isAllegedAbuseOrNeglect: [null],
      isClientAllegedPerperator: [null],
      isAttemptedSuicide: [null],
      isSeriousPhysicalIllness: [null],
      isUnanticipatedMedicalAttention: [null],
      isPsychiatricEmergency: [null],
      isPsychiatricChronic: [null],
      isPregnancy: [null],
      isBirth: [null],
      isEmergencyChange: [null],
      isUseOfIllegalDrugs: [null],
      isAllegedVictimHuman: [null],
      isAllegedAnimalAbuse: [null],
      isWorkRelatedInjury: [null],
      isProviderStaffIncidents: [null],
      isSafetyOfEnvironment: [null],
      isOtherListInDes: [null],

      dobDate: [null],
    });
    this.printIncidentForm = this._fb.group({
      incidentReport: [null],
      incidentDate: [null],
      ptintDOB: [null],
      printIsDCFCustody: [null],
      printTime: [null],
      disTime: [null],
      sfmCaseManagement: [null],
      isAdultDeath: [null],
      isclientDeath: [null],
      isChildSevere: [null],
      isClientNearDeath: [null],
      isPregnancy: [null],
      isRunAway: [null],
      isBirth: [null],
      isArrestedJuvenile: [null],
      isEmergencyChange: [null],
      isAllegedAbuseOrNeglect: [null],
      isUseOfIllegalDrugs: [null],
      isClientAllegedPerperator: [null],
      isDeathOfParent: [null],
      isAllegedVictimHuman: [null],
      isAttemptedSuicide: [null],
      isAllegedAnimalAbuse: [null],
      isSeriousPhysicalIllness: [null],
      isWorkRelatedInjury: [null],
      isUnanticipatedMedicalAttention: [null],
      isProviderStaffIncidents: [null],
      isPsychiatricEmergency: [null],
      isSafetyOfEnvironment: [null],
      isPsychiatricChronic: [null],
      isOtherListInDes: [null],
      isAnySexualContact: [null],
      isMedicationPharmacy: [null],
      isAggressive: [null],
      isBreach: [null],
      isRestrain: [null],
      isUnauthorizedTreatment: [null],
      isSeclusion: [null],
      isDischargeMedical: [null],
      isUnprofessionalConduct: [null],
      isPrnInjection: [null],
      isMinorInjury: [null],
      isLawEnforcement: [null],
      incidentDescription: [null],
      clientInjury_none: [null],
      clientInjury_severe: [null],
      clientInjury_moderate: [null],
      clientInjury_low: [null],
      staffInjury_none: [null],
      staffInjury_low: [null],
      staffInjury_moderate: [null],
      staffInjury_severe: [null],
      reporting_StaffID: [null],
      completedDate: [null],
      recommendations: [null],
      Printrecommendations: [null],
      followUpNeeded: [null],
      clientLastName: [null],
      clientFirstName: [null],
      idNumber: [null],
      dob: [null],
      courtCase: [null],
      disDate: [null],
      followUpDate: [null],
      providerID: [null],
      payorID: [null]
    })
    this.printIncidentForm.disable();
  }

  async formAction(source: UnusualIncident) {

    source.unusualIncidentCriticalID = this.selected_critical_incident;
    source.unusualIncidentIncidentTypeID = this.selected_unusual_incident;
    source.unusualIncidentSignificantID = this.selected_significant_incident;
    source.unusualIncidentNotificationID = this.sfcsUse_incident;
    if (source.unusualIncidentID) {
      source.unusualIncidentChildrenLivingInTheHomeID = [];
    } else {
      if (!isNullOrUndefined(source.unusualIncidentChildrenLivingInTheHomeID)) {
        source.unusualIncidentChildrenLivingInTheHomeID.map((item) => {
          item['enteredDate'] = this._localValues.stringFormatDatetime(new Date().getTime());
          delete item.dob;
          delete item.facts;
          delete item.firstName;
          delete item.kaecses;
          delete item.lastName;
          delete item.personTypeID;
        });
      }
    }
    !isNullOrUndefined(source.referralID) ? source.referralID = source.referralID.ReferralID : null;
    !isNullOrUndefined(source.incidentDate) ? source.incidentDate = Date.parse(source.incidentDate) : null;
    !isNullOrUndefined(source.discoveryDate) ? source.discoveryDate = Date.parse(source.discoveryDate) : null;
    !isNullOrUndefined(source.payorID) ? source.payorID = source.payorID.payorID : null;
    !isNullOrUndefined(source.client_SFAOfficeID) ? source.client_SFAOfficeID = source.client_SFAOfficeID.SFAOfficeID : null;
    !isNullOrUndefined(source.providerID) ? source.providerID = source.providerID.providerID : null;
    !isNullOrUndefined(source.provider_SFAOfficeID) ? source.provider_SFAOfficeID = source.provider_SFAOfficeID.sfaofficeID : null;
    !isNullOrUndefined(source.sponsorID) ? source.sponsorID = source.sponsorID.sponsorID : null;
    !isNullOrUndefined(source.staff_InjuryTypeID) ? source.staff_InjuryTypeID = source.staff_InjuryTypeID.injuryTypeID : null;
    !isNullOrUndefined(source.client_InjuryTypeID) ? source.client_InjuryTypeID = source.client_InjuryTypeID.injuryTypeID : null;
    source.followUpNeeded = (source.followUpNeeded === 'true') ? true : false;
    !isNullOrUndefined(source.followUpCompletedDate) ? source.followUpCompletedDate = Date.parse(source.followUpCompletedDate) : null;
    !isNullOrUndefined(source.reporting_StaffID) ? source.reporting_StaffID = source.reporting_StaffID.staffID : null;
    !isNullOrUndefined(source.completedDate) ? source.completedDate = Date.parse(source.completedDate) : null;
    !isNullOrUndefined(source.unusualIncidentAnonymityTypeID) ? source.unusualIncidentAnonymityTypeID = source.unusualIncidentAnonymityTypeID.unusualIncidentAnonymityTypeID : null;
    !isNullOrUndefined(source.boardReviewDate) ? source.boardReviewDate = Date.parse(source.boardReviewDate) : null;
    !isNullOrUndefined(source.fieldAvailableDate) ? source.fieldAvailableDate = Date.parse(source.fieldAvailableDate) : null;
    !isNullOrUndefined(source.rmFollowUpCompletedDate) ? source.rmFollowUpCompletedDate = Date.parse(source.rmFollowUpCompletedDate) : null;
    source.substantiatedAbuseNeglect = this._localValues.stringFormatDatetime(Date.parse(source.substantiatedAbuseNeglect));
    if (this._router.url.includes('client', 0)) { source.client = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey(); }
    source.unusualIncidentAdultInvolvedID = this.personInvolvedList.map((item) => {
      delete item.personName;
      item.personAssignmentTypeID = item.personAssignmentTypeID.PersonAssignmentTypeID;
      return item;
    });
    const notifyId = [];
    source.unusualIncidentNotificationID.map((item) => {
      !isNullOrUndefined(item.sentDate) ? item.sentDate = Date.parse(item.sentDate) : null;
      notifyId.push({
        'byEmail': !isNullOrUndefined(item.byEmail) ? item.byEmail : null,
        'byFax': !isNullOrUndefined(item.byFax) ? item.byFax : null,
        'byVerbal': !isNullOrUndefined(item.byVerbal) ? item.byVerbal : null,
        'isNA': !isNullOrUndefined(item.isNA) ? item.isNA : null,
        'contactName': !isNullOrUndefined(item.contactName) ? item.contactName : null,
        'receivedFrom': !isNullOrUndefined(item.receivedFrom) ? item.receivedFrom : null,
        'sentDate': !isNullOrUndefined(item.sentDate) ? this._localValues.stringFormatDatetime(item.sentDate) : null,
        'whoSent_StaffID': !isNullOrUndefined(item.staffFullName) ? item.staffFullName.staffID : null,
        'unusualIncidentContactID': !isNullOrUndefined(item.UnusualIncidentContactID) ? item.UnusualIncidentContactID : null
      });
    });
    source.unusualIncidentNotificationID = notifyId;
    source.unusualIncidentCriticalID = source.unusualIncidentCriticalID.filter((el) => {
      return el != null;
    });
    source.unusualIncidentIncidentTypeID = source.unusualIncidentIncidentTypeID.filter((el) => {
      return el != null;
    });
    source.unusualIncidentSignificantID = source.unusualIncidentSignificantID.filter((el) => {
      return el != null;
    });
    if ((this._router.url === '/provider/opencard/critical-incidents-allinvolve/new') ||
      (this._router.url === '/provider/opencard/critical-incidents-allinvolve/detail') ||
      (this._router.url === '/provider/opencard/critical-incidents/new') ||
      (this._router.url === '/provider/opencard/critical-incidents/detail') ||
      (this._router.url === '/provider/opencard/critical-incidents-rm/new') ||
      (this._router.url === '/provider/opencard/critical-incidents-rm/detail')) {
      source.providerID = parseInt(localStorage.getItem('providerID')) - this._opencard.getHasKey();
    }
    console.log("console in FORMACTION-----");

    console.log("this incident is", this.incident)
    console.log("source is", source)
    await this.setStaffInfoInRequest();
    source['enteredBy'] = this.staffName;
    source['staffID'] = parseInt(localStorage.getItem('UserId')) || 4620;
    this.ppsFormValidation(source.client_SFAOfficeID)
    return (source.unusualIncidentID) ? this.update(source) : this.save(source);
  }

  async setStaffInfoInRequest() {
    if (parseInt(localStorage.getItem('UserId'))) {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      await this._team.getUserById({ staffID: parseInt(localStorage.getItem('UserId')) })
        .then((data) => {

          this.staffName = `${data.users.firstName} ${data.users.lastName}`;
          loader.style.display = 'none';
        })
    }
  }



  save(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.unusualIncidentSave(source).then(() => {
      loader.style.display = 'none';
      swal('Success', 'Record has been saved!', 'success');
      this.formNavigation(source)
    });
  }

  update(source: any) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this._opencard.unusualIncidentUpdate(source).then(() => {

      loader.style.display = 'none';
      swal('Success', 'Record has been updated!', 'success');
      this.formNavigation(source);
    });
  }

  getMetaData(event: any, label: any, selectedItem = '') {
    console.log("selectedItem is", selectedItem)

    let req: any, obj: any;
    switch (label) {
      case 'referralID':
        obj = 'referral';
        break;
      case 'payorID':
        obj = 'payor';
        break;
      case 'client_SFAOfficeID':
        obj = 'sfcsOffice';
        break;
      case 'providerID':
        obj = 'provider';
        break;
      case 'provider_SFAOfficeID':
        obj = 'sfcsOffice';
        break;
      case 'sponsorID':
        obj = 'sponsorName';
        break;
      case 'staff_InjuryTypeID':
        obj = 'injuryType';
        break;
      case 'client_InjuryTypeID':
        obj = 'injuryType';
        break;
      case 'reporting_StaffID':
        obj = 'staff';
        break;
      case 'unusualIncidentAnonymityTypeID':
        this.filteredReportAnonmities(event);
        break;
      case 'personSubType':
        this.getPersonSubType(event.query);
        break;
      case 'unusualIncidentTypeOption':
        this.unusualIncidentTypeOption(event, selectedItem);
    }
    if (obj) {
      req = { Object: obj, value: event.query };
      this._caseTeam.getSearchList(req).then((data) => {
        data.dropDown.map((item: any) => {
          item['fullName'] = `${item.lastName} ${item.firstName} ( ${item.email} )`;
        });
        this.metaData = data.dropDown;
      });
    }
  }
  unusualIncidentTypeOption(event, selectedItem) {
    let req = { Object: 'unusualIncidentTypeOption', value: event.query };
    this._caseTeam.getSearchList(req).then((data) => {
      // this.metaData = data.dropDown;
      let dropDownData = data.dropDown;
      let validationArray = [];
      switch (selectedItem.incidentType) {
        case 'Psychiatric emergency/screened for acute care':
          validationArray = [18, 23];
          break;

        case 'Law enforcement contact':
          validationArray = [17, 13, 15, 16, 22, 11, 12, 24, 25];
          break;

        case 'Medication/Pharmacy error/concern':
          validationArray = [6, 8, 7, 1, 9, 3, 2, 4, 5];
          break;

      }
      if (validationArray.length != 0) {
        this.metaData = dropDownData.filter((item: any) => {
          return validationArray.includes(item.unusualIncidentTypeOptionID)
        });
      }
      else {
        this.metaData = data.dropDown;
      }

    });
  }
  removeList(label: any) {
    switch (label) {
      case 'person':
        this.personInvolvedList.splice(this.selectedIndex, 1);
        this.personName = '';
        this.personSubType = '';
        this.personBtnLabel = 'Add';
        break;
    }
  }
  notifierAddList(personSubType, name, label) {
    if (personSubType === undefined || personSubType === '' || name === undefined || name === '') {
      swal('Warning', 'please fill all the fields', 'info');
    } else {
      if (this.personBtnLabel === 'update') {
        this.personInvolvedList.splice(this.selectedIndex, 1);
        this.personInvolvedList.push({ 'personID': this.incident.personId, 'personAssignmentTypeID': personSubType, 'personName': name });
      } else {
        this.personInvolvedList.push({ 'personID': this.incident.personId, 'personAssignmentTypeID': personSubType, 'personName': name });
        this.personBtnLabel = 'Add';
        this.personName = '';
        this.personSubType = '';
      }
      this.personBtnLabel = 'Add';
    }
  }
  getAnonymityType() {
    this.reportAnonymities = [];
    const req = { 'incidentType': 'reportAnonymityType' };
    this._opencard.getLogicalListForUnusualIncident(req).then((data: any) => {
      this.reportAnonymities = data.reportAnonymityType;
    });
  }
  getPersonSubType(event: any) {
    this._caseTeam.getPersonSubType().then(item => {
      this.metaData = item.personSubType.filter((data: any) => {
        data.personAssignmentType = data.PersonAssignmentType;
        if (data.personAssignmentType.toLowerCase().indexOf(event.toLowerCase()) !== -1) {
          return data;
        }
      });
    });
  }
  getPersonSubTypeName(event: any) {
    let metaDataReq = { Object: this.nameObj, value: event.query };
    this._caseTeam.getSearchList(metaDataReq).then(data => {
      data.dropDown.map((item: any) => {
        !isNullOrUndefined(item.clientName) ? item['staffFullName'] = item.clientName : item['staffFullName'] = item.lastName + ' ' + item.firstName || item.name;
        !isNullOrUndefined(item.name) ? item['staffFullName'] = item.name : null;
      });
      this.metaData = data.dropDown;
    });
  }
  getStaff(event) {
    let metaDataReq = { Object: 'staff', value: event.query };
    this._caseTeam.getSearchList(metaDataReq).then(data => {
      data.dropDown.map((item: any) => {
        !isNullOrUndefined(item.clientName) ? item['staffFullName'] = item.clientName : item['staffFullName'] = item.lastName + ' ' + item.firstName || item.name;
      });
      this.metaData = data.dropDown;
    });
  }
  getPersonId(event) {
    switch (this.nameObj) {
      case 'casaOfficer':
        this.incident.personId = event.casaOfficerID;
        break;
      case 'client':
        this.incident.personId = event.clientID;
        break;
      case 'communityMember':
        this.incident.personId = event.communityMemberID;
        break;
      case 'CourtServiceOfficer':
        this.incident.personId = event.csvid;
        break;
      case 'CRBCoordinator':
        this.incident.personId = event.crbcoordinatorID;
        break;
      case 'csoStaff':
        this.incident.personId = event.CSOStaffID;
        break;
      case 'customerCarePerson':
        this.incident.personId = event.custCarePersonID;
        break;
      case 'srsStaff':
        this.incident.personId = event.srsstaffID;
        break;
      case 'dhhsStaff':
        this.incident.personId = event.dhhsstaffID;
        break;
      case 'dHSStaff':
        this.incident.personId = event.dhsStaffID;
        break;
      case 'familyMember':
        this.incident.personId = event.familyMemberID;
        break;
      case 'guardianAdLitem':
        this.incident.personId = event.galid;
        break;
      case 'Judge':
        this.incident.personId = event.judgeID;
        break;
      case 'otherAgencyStaff':
        this.incident.personId = event.otherAgencyStaffID;
        break;
      case 'providerMember':
        this.incident.personId = event.providerMemberID;
        break;
      case 'staff':
        this.incident.personId = event.staffID;
        break;
    }
  }
  getSubTypeName(event) {
    this.isDisableClientName = false;
    switch (event.PersonAssignmentType) {
      case 'CASA Officer':
        this.nameObj = 'casaOfficer';
        break;
      case 'Client':
        this.nameObj = 'client';
        break;
      case 'Community Member':
        this.nameObj = 'communityMember';
        break;
      case 'Court Service Officer':
        this.nameObj = 'CourtServiceOfficer';
        break;
      case 'CRB Coordinator':
        this.nameObj = 'CRBCoordinator';
        break;
      case 'CSO Staff':
        this.nameObj = 'csoStaff';
        break;
      case 'Customer Care Person':
        this.nameObj = 'customerCarePerson';
        break;
      case 'DCF Staff':
        this.nameObj = 'srsStaff';
        break;
      case 'DHHS Staff':
        this.isDisableClientName = true;
        swal('Info', 'No data available for this person type', 'info');
        this.nameObj = 'dhhsStaff';
        break;
      case 'DHS Staff':
        this.nameObj = 'dHSStaff';
        break;
      case 'Family Member':
        this.nameObj = 'familyMember';
        break;
      case 'Guardian Ad Litem':
        this.nameObj = 'guardianAdLitem';
        break;
      case 'Judge':
        this.nameObj = 'Judge';
        break;
      case 'Other Agency Staff':
        this.nameObj = 'otherAgencyStaff';
        break;
      case 'Provider Member':
        this.nameObj = 'providerMember';
        break;
      case 'Staff':
        this.nameObj = 'staff';
        break;
    }
    this.personName = '';
  }
  editForm() {
    this.incidentForm.enable();
    if (this._router.url.includes('provider', 0)) {
      this.isDisableAdditionalClients = true;
      this.isProvider = true;
    }
    if ((this._router.url === '/provider/opencard/critical-incidents-allinvolve/new') ||
      (this._router.url === '/provider/opencard/critical-incidents-allinvolve/detail')) {
      this.isAllinvolve = true; this.isProvider = true;
    }
    this.isEdit = false;
  }

  getById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.req = { unusualIncidentID: this._client.getId() }
    this.isFooterVisible = true;
    this._opencard.getUnusulaRecById(this.req).then((data: any) => {
      this.formTracker = data.unusualIncident;
      this.contract_StateID = data.unusualIncident.contract_StateID;
      if (data.unusualIncident.isActive) {
        !isNullOrUndefined(data.unusualIncident.completedDate) ? data.unusualIncident.completedDate =
          new Date(data.unusualIncident.completedDate) : null;
        !isNullOrUndefined(data.unusualIncident.discoveryDate) ? data.unusualIncident.discoveryDate =
          new Date(data.unusualIncident.discoveryDate) : null;
        !isNullOrUndefined(data.unusualIncident.fieldAvailableDate) ? data.unusualIncident.fieldAvailableDate =
          new Date(data.unusualIncident.fieldAvailableDate) : null;
        !isNullOrUndefined(data.unusualIncident.incidentDate) ? data.unusualIncident.incidentDate =
          new Date(data.unusualIncident.incidentDate) : null;
        !isNullOrUndefined(data.unusualIncident.boardReviewDate) ? data.unusualIncident.boardReviewDate =
          new Date(data.unusualIncident.boardReviewDate) : null;
        !isNullOrUndefined(data.unusualIncident.followUpCompletedDate) ? data.unusualIncident.followUpCompletedDate =
          new Date(data.unusualIncident.followUpCompletedDate) : null;
        !isNullOrUndefined(data.unusualIncident.rmFollowUpCompletedDate) ? data.unusualIncident.rmFollowUpCompletedDate =
          new Date(data.unusualIncident.rmFollowUpCompletedDate) : null;
        !isNullOrUndefined(data.unusualIncident.substantiatedAbuseNeglect) ? data.unusualIncident.substantiatedAbuseNeglect =
          new Date(data.unusualIncident.substantiatedAbuseNeglect) : null;
        !isNullOrUndefined(data.unusualIncident.referralID) ? data.unusualIncident.referralID['display'] =
          `${data.unusualIncident.referralID.referralTypeID.referralType} ( ${data.unusualIncident.referralID.referralID}  ) ${new Date(data.unusualIncident.referralID.caseID.beginDate)} TO
          ${data.unusualIncident.referralID.caseID.endDate !== null ? new Date(data.unusualIncident.referralID.caseID.endDate) : ''}` : '';
      } else {
        !isNullOrUndefined(data.unusualIncident.completedDate) ? data.unusualIncident.completedDate =
          moment.utc(data.unusualIncident.completedDate).format('MM/DD/YYYY') : null;
        !isNullOrUndefined(data.unusualIncident.discoveryDate) ? data.unusualIncident.discoveryDate =
          moment.utc(data.unusualIncident.discoveryDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.unusualIncident.fieldAvailableDate) ? data.unusualIncident.fieldAvailableDate =
          moment.utc(data.unusualIncident.fieldAvailableDate).format('MM/DD/YYYY') : null;
        !isNullOrUndefined(data.unusualIncident.incidentDate) ? data.unusualIncident.incidentDate =
          moment.utc(data.unusualIncident.incidentDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.unusualIncident.boardReviewDate) ? data.unusualIncident.boardReviewDate =
          moment.utc(data.unusualIncident.boardReviewDate).format('MM/DD/YYYY') : null;
        !isNullOrUndefined(data.unusualIncident.followUpCompletedDate) ? data.unusualIncident.followUpCompletedDate =
          moment.utc(data.unusualIncident.followUpCompletedDate).format('MM/DD/YYYY HH:mm') : null;
        !isNullOrUndefined(data.unusualIncident.rmFollowUpCompletedDate) ? data.unusualIncident.rmFollowUpCompletedDate =
          moment.utc(data.unusualIncident.rmFollowUpCompletedDate).format('MM/DD/YYYY') : null;
        !isNullOrUndefined(data.unusualIncident.substantiatedAbuseNeglect) ? data.unusualIncident.substantiatedAbuseNeglect =
          moment.utc(data.unusualIncident.substantiatedAbuseNeglect).format('MM/DD/YYYY') : null;
        !isNullOrUndefined(data.unusualIncident.referralID) ? data.unusualIncident.referralID['display'] =
          `${data.unusualIncident.referralID.referralTypeID.referralType} ( ${data.unusualIncident.referralID.referralID}  ) ${moment.utc(data.unusualIncident.referralID.caseID.beginDate).format('MM/DD/YYYY')} TO
          ${data.unusualIncident.referralID.caseID.endDate !== null ? moment.utc(data.unusualIncident.referralID.caseID.endDate).format('MM/DD/YYYY') : ''}` : '';
      }
      !isNullOrUndefined(data.unusualIncident.referralID) ? this.contract_StateID = data.unusualIncident.referralID.Contract_StateID : null;
      !isNullOrUndefined(data.unusualIncident.reporting_StaffID) ? data.unusualIncident.reporting_StaffID['fullName'] =
        `${data.unusualIncident.reporting_StaffID.lastName} ${data.unusualIncident.reporting_StaffID.firstName} ( ${data.unusualIncident.reporting_StaffID.email} )` : null;

      if (data.unusualIncident.followUpNeeded) {
        data.unusualIncident.followUpNeeded = 'true';
      } else {
        data.unusualIncident.followUpNeeded = 'false';
      }

      data.unusualIncidentCriticalID.map((result_1: any) => {
        this.critical_incident.map((result_2: any, index) => {
          if (result_2.unusualIncidentTypeID === result_1.unusualIncidentTypeID.unusualIncidentTypeID) {
            this.criticalIncidentValue[index] = (result_1.unusualIncidentTypeID.incidentType);
            this.selected_critical_incident[index] = (result_1.unusualIncidentTypeID);

            this.selected_critical_incident[index].rating = !isNullOrUndefined(result_1.unusualIncidentCriticalID.rating) ?
              result_1.unusualIncidentCriticalID.rating : null;

            this.criticalIncidentOption[index] = {
              rating: !isNullOrUndefined(result_1.unusualIncidentCriticalID.rating) ?
                result_1.unusualIncidentCriticalID.rating : null
            };
          }
        });
      });

      let sam = this.significant_incident;
      data.unusualIncidentSignificantID.map((result_1: any) => {
        sam.map((result_2: any, index) => {
          if (result_2.unusualIncidentTypeID === result_1.unusualIncidentTypeID.unusualIncidentTypeID) {
            this.SignificantIncidentValue[index] = (result_1.unusualIncidentTypeID.incidentType);
            this.selected_significant_incident[index] = result_1.unusualIncidentTypeID;

            this.selected_significant_incident[index].unusualIncidentTypeOptionID = !isNullOrUndefined(result_1.unusualIncidentSignificantID.unusualIncidentTypeOptionID) ? result_1.unusualIncidentSignificantID.
              unusualIncidentTypeOptionID.unusualIncidentTypeOptionID : null;

            this.selected_significant_incident[index].rating = !isNullOrUndefined(result_1.unusualIncidentSignificantID.rating) ?
              result_1.unusualIncidentSignificantID.rating : null;

            this.significantIncidentOption[index] = {
              unusualIncidentTypeOption: !isNullOrUndefined(result_1.unusualIncidentSignificantID.
                unusualIncidentTypeOptionID) ? result_1.unusualIncidentSignificantID.unusualIncidentTypeOptionID.
                  unusualIncidentTypeOption : null,
              unusualIncidentTypeOptionID: !isNullOrUndefined(result_1.unusualIncidentSignificantID.
                unusualIncidentTypeOptionID) ? result_1.unusualIncidentSignificantID.unusualIncidentTypeOptionID.
                  unusualIncidentTypeOptionID : null,
              rating: !isNullOrUndefined(result_1.unusualIncidentSignificantID.rating) ? result_1.unusualIncidentSignificantID.
                rating : null
            };
          }
        });
      });

      data.unusualIncidentIncidentTypeID.map((result_1: any) => {
        this.unusual_incident.map((result_2: any, index) => {
          if (result_2.unusualIncidentTypeID === result_1.unusualIncidentTypeID.unusualIncidentTypeID) {
            this.UnusualIncidentValue[index] = (result_1.unusualIncidentTypeID.incidentType);
            this.selected_unusual_incident[index] = result_1.unusualIncidentTypeID;
            this.selected_unusual_incident[index].unusualIncidentTypeOptionID =
              !isNullOrUndefined(result_1.unusualIncidentIncidentTypeID.
                unusualIncidentTypeOptionID) ? result_1.unusualIncidentIncidentTypeID.unusualIncidentTypeOptionID.
                  unusualIncidentTypeOptionID : null;
            this.selected_unusual_incident[index].rating = !isNullOrUndefined
              (result_1.unusualIncidentIncidentTypeID.rating) ? result_1.unusualIncidentIncidentTypeID.
                rating : null;

            this.unusualIncidentOption[index] = {
              unusualIncidentTypeOption: !isNullOrUndefined(result_1.unusualIncidentIncidentTypeID.
                unusualIncidentTypeOptionID) ? result_1.unusualIncidentIncidentTypeID.unusualIncidentTypeOptionID.
                  unusualIncidentTypeOption : null,
              unusualIncidentTypeOptionID: !isNullOrUndefined(result_1.unusualIncidentIncidentTypeID.
                unusualIncidentTypeOptionID) ? result_1.unusualIncidentIncidentTypeID.unusualIncidentTypeOptionID.
                  unusualIncidentTypeOptionID : null,
              rating: !isNullOrUndefined
                (result_1.unusualIncidentIncidentTypeID.rating) ? result_1.unusualIncidentIncidentTypeID.
                  rating : null
            };
          }
        });
      });
      data.unusualIncidentNotificationID.map((notificationItem) => {
        this.sfcsUse_incident.map((sfcsItem) => {
          if (notificationItem.unusualIncidentContactID === sfcsItem.UnusualIncidentContactID) {
            !isNullOrUndefined(sfcsItem.Fax) ? sfcsItem['byFax'] = notificationItem.byFax : false;
            !isNullOrUndefined(sfcsItem.NA) ? sfcsItem['isNA'] = notificationItem.isNA : false;
            !isNullOrUndefined(sfcsItem.Verbal) ? sfcsItem['byVerbal'] = notificationItem.byVerbal : false;
            !isNullOrUndefined(sfcsItem.Email) ? sfcsItem['byEmail'] = notificationItem.byEmail : false;
            sfcsItem['contactName'] = notificationItem.contactName;
            sfcsItem['sentDate'] = !isNullOrUndefined(notificationItem.sentDate) ?
              moment.utc(notificationItem.sentDate).format('MM/DD/YYYY') : null;
            sfcsItem['receivedFrom'] = notificationItem.receivedFrom;
            if (!isNullOrUndefined(notificationItem.whoSent_StaffID)) {
              sfcsItem['staffFullName'] = {
                'staffFullName': notificationItem.whoSent_StaffID.lastName + ' ' +
                  notificationItem.whoSent_StaffID.firstName
              };
            }
          }
        });
      });
      this.personInvolvedList = data.unusualIncidentAdultInvolvedID.map((item) => {
        item['personName'] = { 'staffFullName': item.personID.lastName + ' ' + item.personID.firstName };

        return item;
      });

      this.incident = data.unusualIncident;
      this.incident.unusualIncidentChildrenLivingInTheHomeID = data.unusualIncidentChildrenLivingInTheHomeID;
      !isNullOrUndefined(data.unusualIncident.referralID) ? delete data.unusualIncident.referralID : null;
      this.incident.referralID = data.referralID;
      this.incidentForm.disable();
      this.isEdit = true;
      if (this._router.url === '/provider/opencard/critical-incidents-allinvolve/detail') {
        this.isEdit = false;
      }

      loader.style.display = 'none';
    });
  }

  /**
   *
   *
   * @param type critical_incident/significant_incident/unusual_incident
   */
  async getIncidentTypes(type: any) {
    let request: any, selectedIncidentType: any, currentURL = this._router.url;
    switch (type) {
      case 'critical_incident':
        selectedIncidentType = 'isCriticalIncident';
        break;
      case 'significant_incident':
        selectedIncidentType = 'isSignificantIncident';
        break;
      case 'unusual_incident':
        selectedIncidentType = 'isUnusualIncident';
        break;
      case 'sfcsUse_incident':
        selectedIncidentType = 'forSfcsUse';
        break;
    }
    request = { incidentType: selectedIncidentType };
    let result = this._opencard.getLogicalListForUnusualIncident(request).then(async (data: any) => {
      if (selectedIncidentType === 'isCriticalIncident') {
        this.critical_incident = data.incidentType;
      } else if (selectedIncidentType === 'isSignificantIncident') {
        let significantItems = []
        // if(currentURL.includes('provider', 0)) {
        Promise.all(
          data.incidentType.filter(async (item: any) => {
            if (item.unusualIncidentTypeID !== 2 &&
              item.unusualIncidentTypeID !== 25 &&
              item.unusualIncidentTypeID !== 1 &&
              item.unusualIncidentTypeID !== 68 &&
              item.unusualIncidentTypeID !== 7 &&
              item.unusualIncidentTypeID !== 8 &&
              item.unusualIncidentTypeID !== 80 &&
              item.unusualIncidentTypeID !== 22 &&
              item.unusualIncidentTypeID !== 21 &&
              item.unusualIncidentTypeID !== 57 &&
              item.unusualIncidentTypeID !== 24) {
              significantItems.push(item);
            }
          })
        ).then(() => {
          this.significant_incident = significantItems;
        })
        //  } else {
        //     this.significant_incident = data.incidentType;
        //  }
      } else if (selectedIncidentType === 'forSfcsUse') {
        data.forSfcsUse.map((item) => {
          !isNullOrUndefined(item.Fax) ? item.byFax = item.Fax : null;
          !isNullOrUndefined(item.NA) ? item.isNA = item.NA : null;
          !isNullOrUndefined(item.Verbal) ? item.byVerbal = item.Verbal : null;
          !isNullOrUndefined(item.Email) ? item.byEmail = item.Email : null;
          isNullOrUndefined(item.ContactName) ? item['contactName'] = item.ContactName : null;
          isNullOrUndefined(item.ReceivedFrom) ? item['receivedFrom'] = item.ReceivedFrom : null;
          isNullOrUndefined(item.SentDate) ? item['sentDate'] = item.SentDate : null;
        });
        this.sfcsUse_incident = data.forSfcsUse;
      } else if (selectedIncidentType === 'isUnusualIncident') {
        let unusualIncidentItems = [];
        Promise.all(
          data.incidentType.filter((item: any) => {
            if (item.unusualIncidentTypeID !== 65) {
              unusualIncidentItems.push(item);
            }
          })
        ).then(() => {
          /**Psychiatric emergency/screened for acute care - unusualIncidentTypeID 27 */
          unusualIncidentItems.filter(item => {
            if (item.unusualIncidentTypeID === 27) {
              this.isUnusualIncidentOptionDisable = true;
            }
          })
          this.unusual_incident = unusualIncidentItems;
        })
      }
    });

    let returnValue = await result;

    return returnValue;
  }

  /**
   *
   * @param condition
   * Only Cients with Same Facts
   * Open Clients Only
   * Closed Clients Only
   * All Clients
   * Clients w/o Cases
   */
  getAdditonalClients(event: any) {
    let selectedClientID: any; let req: any, selectedReferralId: any, selectedReferralTypeId: any, selectedFacts: any,
      blnFaceToFaceTracking = false;
    selectedClientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
    selectedReferralId = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
    selectedReferralId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    selectedFacts = parseInt(localStorage.getItem('facts'));
    req = {};
    switch (event.view) {
      case 'Only Cients with Same Facts':
        req = {
          'condition': event.view,
          'clientID': selectedClientID,
          'referralID': selectedReferralId,
          'referralTypeID': selectedReferralTypeId,
          blnFaceToFaceTracking
        }
        break;
      default:
        req = {
          'condition': event.view,
          'clientID': selectedClientID,
          'beginPagination': 1,
          'endPagination': 100
        }

    }
    this._opencard.getUnusualAdddtionalClients(req).then((data: any) => {
      this.additional_clients = data.additionalClients;
      this.showAdditionalClients = true;
    });
  }

  getAvailableReferrals() {
    let req: any, selectedClientID: any;
    selectedClientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
    req = { clientID: selectedClientID, value: "" };
    this._opencard.referralListBasedOnClients(req).then((data: any) => {
      this.referralClients = data.dropDown;
    });
  }

  selectedReferrals(event: any) {
    const date = Date.now();
    event.ReferralType === 'FC' ? this.selectedReferralTypeId = 1 : 2;
    this.selectedReferralId = event.ReferralID;
    this.contract_StateID = event.Contract_StateID;
    this.incidentForm.controls['additonalClients'].enable();
    const req = {
      referralID: event.ReferralID,
      beginPagination: 1,
      endPagination: 100,
      sort: {
        column: "clientID",
        mode: "desc"
      }
    };
    this._caseTeam.getclientReferralUnsualIncident(req).then(data => {
      this.incident.unusualIncidentChildrenLivingInTheHomeID = data.clientFISList;
    });
    let autoReq = {
      referralID: event.ReferralID,
      incidentDate: moment(date).format('MM-DD-YYYY'),
    }
    this._caseTeam.getReferralAuto(autoReq).then(data => {
      this.incident.payorID = {
        'payorName': data.contractorReferralSource,
        'payorID': data.PayorID
      };
      this.incident.providerID = {
        'providerName': data.nameOfPlacementResourceHome,
        'providerID': data.ProviderID
      }
      this.incident.provider_SFAOfficeID = {
        'officeName': data.providerSFAOfficeName,
        'sfaofficeID': data.SFAOfficeID
      }
      this.incident.client_SFAOfficeID = {
        'officeName': data.clientSFAOfficeName,
        'sfaofficeID': data.SFAOfficeID
      }
    });
  }

  getContractorReferralService(event) {
    let req = {
      'contractStateID': this.contract_StateID || ""
    };
    this._caseTeam.getContractorReferralService(req).then(data => {
      data.contractorReferral.map((item) => {
        item['payorName'] = item.PayorName;
      });
      this.metaData = data.contractorReferral;
    });
  }

  getClientProviderSfcsOffice(event) {
    let req = {
      'contractStateID': this.contract_StateID
    };
    this._caseTeam.getClientProviderSfcsOffice(req).then(data => {
      data.clientProviderSfcsOffice.filter((item) => {
        item['officeName'] = item.OfficeName;
      });
      this.metaData = data.clientProviderSfcsOffice.filter((item: any) => {
        return item.OfficeName.toLowerCase().indexOf(event.query) !== -1
      });
    });
  }
  getPlacementResourceHome(event) {
    let req = {
      'contractStateID': this.contract_StateID
    };
    this._caseTeam.getPlacementResourceHome(req).then(data => {
      this.metaData = data.dropDown.filter((item: any) => {
        return item.providerName.toLowerCase().indexOf(event.query) !== -1
      });
    });
  }
  addtionalClientList(event: any) {
    this.additonalClients = [];
    this.optionsOfAdditonalClients.map((item: any) => {
      if (item.value.includes(event.query)) {
        this.additonalClients.push(item);
      }
    });
  }

  getIncidentTypeValues(event: any, item: any, category: any, index) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    switch (category) {
      case 'critial_incident':
        if (event) {
          if (item.unusualIncidentTypeID !== undefined && item.unusualIncidentTypeID !== null) {
            this.selected_critical_incident.push({ unusualIncidentTypeID: item.unusualIncidentTypeID });
          }
        } else {
          if (this._client.getId()) {
            loader.style.display = 'block';
            this._opencard.deleteUnusualIncident({ unusualIncidentTypeID: item.unusualIncidentTypeID, unusualIncidentID: this._client.getId() }).then((data: any) => {
              if (data) {
                loader.style.display = 'none';
                this.selected_critical_incident.splice(this.selected_critical_incident.indexOf(item.unusualIncidentTypeID), 1);
                swal('Removed!', 'The item has been removed!', 'info');
              } else {
                swal('Try again later!', 'Something went wrong, Please try again later!', 'error');
              }
            })
          }
          this.selected_critical_incident = this.selected_critical_incident.splice(this.selected_critical_incident.indexOf(item.unusualIncidentTypeID), 1);
        }

        break;
      case 'siginifact_incident':
        if (event) {
          if (item.unusualIncidentTypeID !== undefined && item.unusualIncidentTypeID !== null) {
            this.selected_significant_incident[index] = ({ unusualIncidentTypeID: item.unusualIncidentTypeID, incidentType: item.incidentType });
          }
        } else {
          if (this._client.getId()) {
            loader.style.display = 'block';
            this._opencard.deleteUnusualIncident({ unusualIncidentTypeID: item.unusualIncidentTypeID, unusualIncidentID: this._client.getId() }).then((data: any) => {
              if (data) {
                loader.style.display = 'none';
                this.selected_significant_incident.splice(this.selected_significant_incident.indexOf(item.unusualIncidentTypeID), 1);
                swal('Removed!', 'The item has been removed!', 'info');
              } else {
                swal('Try again later!', 'Something went wrong, Please try again later!', 'error');
              }
            })
          }
          this.selected_significant_incident = this.selected_significant_incident.splice(this.selected_significant_incident.indexOf(item.unusualIncidentTypeID), 1);
        }
        break;
      case 'unusual_incident':
        if (event) {
          if (item.unusualIncidentTypeID !== undefined && item.unusualIncidentTypeID !== null) {
            this.selected_unusual_incident[index] = ({ unusualIncidentTypeID: item.unusualIncidentTypeID });
          }
        } else {
          if (this._client.getId()) {
            loader.style.display = 'block';
            this._opencard.deleteUnusualIncident({ unusualIncidentTypeID: item.unusualIncidentTypeID, unusualIncidentID: this._client.getId() }).then((data: any) => {
              loader.style.display = 'none';
              if (data) {
                this.selected_unusual_incident.splice(this.selected_unusual_incident.indexOf(item.unusualIncidentTypeID), 1);
                swal('Removed!', 'The item has been removed!', 'info');
              } else {
                swal('Try again later!', 'Something went wrong, Please try again later!', 'error');
              }
            })
          }
          this.selected_unusual_incident = this.selected_unusual_incident.splice(this.selected_unusual_incident.indexOf(item.unusualIncidentTypeID), 1);
        }
        break;
    }
  }

  filteredReportAnonmities(event: any) {
    this.filteredReportAnonymities = [];
    this.reportAnonymities.map((item: any) => {
      if (item.anonymityType.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredReportAnonymities.push(item);
      }
    });
  }

  sfcsOfficeTableAction(event: any, selectedObject: any, selectedProp: any) {
    event;
    selectedObject;
    selectedProp;
    if (event) {
      this.sfcsUse_incident.filter((item: any) => {
        if (item === selectedObject) {
          item[selectedProp] = event;
        }
      });
    } else {
      this.sfcsUse_incident.filter((item: any) => {
        if (item === selectedObject) {
          item[selectedProp] = event;
        }
      });
    }
    this.sfcsUse_incident;
  }

  navigateTo() {
    const currentURL = this._router.url;
    if (currentURL == '/reports/opencards/list/client/critical-significant-unusual-incident/detail') {
      this.url = '/reports/attachment-document/client/unusual-incident';
    }
    else {
      this.url = '/reports/attachment-document/providers/unusual-incident';
    }
    return this._router.navigate([this.url]);
  }

  fetchCriticalIncidentData(data) {
    console.log("data in fetchCriticalIncidentData *****>>>> is", data)
    data.map((item) => {
      switch (item) {
        case `Any child in the custody of the secretary who spend the night in a Child Welfare Case Management Provider's (CWCMP) office (Complete sections I & II Only)`:
          this.isAdultDeath = true;
          break;
        case 'Child in the custody of the Secretary who attempted suicide':
          this.isChildSevere = true;
          break;
        case 'Child in the custody of the Secretary with severe injuries':
          this.isClientNearDeath = true;
          break;
        case 'Client death*':
          this.isIncidentDrawPublic = true;
          break;
        case 'Death of a parent/caregiver involving a child with any open service case or investigation':
          this.isFosterParentCriminal = true;
          break;
        case 'Foster Parent with Criminal Proceedings Related to Abuse or neglect':
          this.isChildWithSevereInjuries = true;
          break;
        case 'Client near death*':
          this.isClientNearDeath = true;
          break;
        case 'Media- incident which may draw public or legislative concern':
          this.isMediaIncident = true;
          break;
      }
    });
  }

  fetchsignificantIncidentData(data) {

    data.map((item) => {

      switch (item) {
        case 'Death of a parent/primary caregiver (provide date of death)':
          this.isDeathOfParent = true;

          break;

        case 'Runaway or missing from placement':
          this.isRunAway = true;

          break;

        case 'Arrested for a juvenile offense':
          this.isArrestedJuvenile = true;

          break;

        case 'Alleged abuse or neglect':
          this.isAllegedAbuseOrNeglect = true;

          break;

        case 'Client is an alleged perpetrator or victim of a criminal assault of any kind':
          this.isClientAllegedPerperator = true;

          break;

        case 'Attempted Suicide':
          this.isAttemptedSuicide = true;

          break;

        case 'Serious physical illness':
          this.isSeriousPhysicalIllness = true;

          break;

        case 'Unanticipated medical attention that requires treatment beyond first aid':
          this.isUnanticipatedMedicalAttention = true;

          break;

        case 'Psychiatric emergency/screened for acute care':
          this.isPsychiatricEmergency = true;

          break;

        case 'Psychiatric chronic/screened PRTF':
          this.isPsychiatricChronic = true;

          break;

        case 'Pregnancy':
          this.isPregnancy = true;

          break;

        case 'Birth':
          this.isBirth = true;

          break;

        case 'Emergency change in placement':
          this.isEmergencyChange = true;

          break;

        case 'Use of illegal drugs':
          this.isUseOfIllegalDrugs = true;

          break;

        case 'Alleged victim of human trafficking':
          this.isAllegedVictimHuman = true;

          break;

        case 'Alleged perpetrator of animal abuse':
          this.isAllegedAnimalAbuse = true;

          break;

        case 'Work related serious staff injury or death':
          this.isWorkRelatedInjury = true;

          break;

        case 'Provider staff or incidents in which staff safety was seriously compromised':
          this.isProviderStaffIncidents = true;

          break;

        case 'Safety of environment':
          this.isSafetyOfEnvironment = true;

          break;

        case 'Other (list in description)':
          this.isOtherListInDes = true;

          break;

      }
    });

  }

  formatDates() {

    if (this.incident.discoveryDate) {
      const sampleDate = new Date(this.incident.discoveryDate);
      this.disDate = (sampleDate.getMonth() + 1) + '/' + sampleDate.getDate() + '/' + sampleDate.getFullYear();
    }
    if (this.incident.followUpCompletedDate) {
      const followSampleDate = new Date(this.incident.followUpCompletedDate);
      this.followUpDate = (followSampleDate.getMonth() + 1) + '/' + followSampleDate.getDate() + '/' + followSampleDate.getFullYear();
    }

    if (this.incident.completedDate) {
      const sampleCompletedDate = new Date(this.incident.completedDate);
      this.completedDate = (sampleCompletedDate.getMonth() + 1) + '/' + sampleCompletedDate.getDate() + '/' + sampleCompletedDate.getFullYear();
    }


  }
  fetchPrintValues() {

    if (this.incident.incidentDate) {
      this.printValue.incidentDate = moment(this.incident.incidentDate).format('MM/DD/YYYY');
    }
    if (this.incident.recommendations) {

    }
    this.printValue.recommendations = this.incident.recommendations;
    this.printValue.followUpNeeded = this.incident.followUpNeeded;
    if (this.incident.providerID) {
      this.printValue.providerID = this.incident.providerID.providerName;
    }
    if (this.incident.payorID) {
      this.printValue.payorID = this.incident.payorID.payorName;
    }
    this.printValue.reportID = this.incident.reportID
    if (this.incident.reporting_StaffID) {
      this.printValue.reporting_StaffID = this.incident.reporting_StaffID.fullName;
    }
    this.printValue.incidentDescription = this.incident.incidentDescription;
    if (this.incident.incidentDate) {
      this.incidentTime = this._localValues.getTimeAlongWithFormat(Date.parse(this.incident.incidentDate));
    }
    if (this.incident.discoveryDate) {
      this.discoveryTime = this._localValues.getTimeAlongWithFormat(Date.parse(this.incident.discoveryDate));
    }


  }
  async printPreview() {
    this.formatDates();
    this.fetchCriticalIncidentData(this.criticalIncidentValue);
    this.fetchsignificantIncidentData(this.SignificantIncidentValue);
    this.fetchUnusualIncidentData(this.UnusualIncidentValue);
    this.fetchPrintValues();
    this.fetchClientInjuryTypes();
    this.fetchStaffInjuryTypes();

    this.kansasInfo = {
      incident: this.incident,
      significant: this.SignificantIncidentValue,
      unusual: this.UnusualIncidentValue,
      sfcsUseOnly: this.sfcsUse_incident,
      PersonInvolvedList: this.personInvolvedList,
      unusualIncidentOption: this.unusualIncidentOption,
      significantIncidentOption: this.significantIncidentOption
    }
    let kansasRegion = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      13,
      14,
      16,
      17,
      18,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      43,
      44,
      45,
      46,
      47,
      49,
      50
    ];
    if (this.incident.client_SFAOfficeID) {

      if (kansasRegion.includes(this.incident.client_SFAOfficeID.sfaofficeID)) {
        // if (this.incident.client_SFAOfficeID.officeName === "Kansas City" || this.incident.client_SFAOfficeID.officeName === "Home Ties - Kansas City") {
        this.isKansasAttachmentOpen = true;
      }
    }
    if (this.incident.provider_SFAOfficeID) {
      if (kansasRegion.includes(this.incident.provider_SFAOfficeID.sfaofficeID)) {

        // if (this.incident.provider_SFAOfficeID.officeName === "Kansas City" || this.incident.provider_SFAOfficeID.officeName === "Home Ties - Kansas City") {
        this.isKansasAttachmentOpen = true;
      }
    }


    if (this.isKansasAttachmentOpen === false) {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';

      // if (!this._router.url.includes('provider', 0)) {
      if (localStorage.getItem('clientId') || !this._router.url.includes('provider', 0)) {
        const req = { clientID: parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey() };
        this._client.getDetailsById(req).then((data: any) => {
          this.clientLastName = data.person.lastName;
          this.clientFirstName = data.person.firstName;
          this.idNumber = data.person.clientID;
          this.dob = data.person.dob;

          if (data.person.dob) {
            const dobSampleDate = new Date(data.person.dob);
            this.dobDate = (dobSampleDate.getMonth() + 1) + '/' + dobSampleDate.getDate() + '/' + dobSampleDate.getFullYear();
          }
          this.courtCase = data.person.kaecses;
          this.isUnusualAttachmentOpen = true;
        });
      } else {
        this.isUnusualAttachmentOpen = true;
      }
      loader.style.display = 'none';
    }
  }

  printForm() {
    // To be uncommented before the commit
    this._printPdf.fileName = 'unusualIncident';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.jsPdfOrientation = 'landscape';
    this._printPdf.printForm();
    this.isUnusualAttachmentOpen = false;



  }


  getOption(event, index, label) {
    switch (label) {
      case 'getSignificantIncidentOption':
        this.selected_significant_incident[index].unusualIncidentTypeOptionID = event.unusualIncidentTypeOptionID;
        break;
      case 'getUnusualIncidentOption':
        this.selected_unusual_incident[index].unusualIncidentTypeOptionID = event.unusualIncidentTypeOptionID;
        break;
    }
  }

  getRating(event, index, label) {
    switch (label) {
      case 'criticalIncidentValue':
        this.selected_critical_incident[index].rating = parseInt(event, 10);
        break;
      case 'SignificantIncidentValue':
        this.selected_significant_incident[index].rating = parseInt(event, 10);
        break;
      case 'unusualIncidentValue':
        this.selected_unusual_incident[index].rating = parseInt(event, 10);
        break;
    }
  }

  cloaseKansas() {
    this.isKansasFormOpen = false;
    this.isKansasAttachmentOpen = false;

  }

  printBtn() {
    this.isKansasFormOpen = true;
  }

  discardBtn() {
    this.isKansasAttachmentOpen = false;
  }

  getProviderIncidentAutofetchFields() {
    if (this._router.url.includes('provider')) {
      let req = { providerID: this._localValues.currentProviderID }
      this._provider.getProviderAutoFetchFields(req).then((data: any) => {
        !isNullOrUndefined(data.providerAutofetchFields.nameOfPlacementResourceHome) ?
          this.incident.providerID = { providerName: data.providerAutofetchFields.nameOfPlacementResourceHome } : null;
        !isNullOrUndefined(data.providerAutofetchFields.providerSFMOfficeName) ?
          this.incident.provider_SFAOfficeID = { officeName: data.providerAutofetchFields.providerSFMOfficeName } : null
      });
    }
  }

  filteredAvailableReferrals(event: any) {
    this.filteredReferrals = []
    this.referralClients.filter((item: any) => {
      if (item.Referral.toString().toLowerCase().indexOf(event.query) !== -1) {
        this.filteredReferrals.push(item);
      }
    })
  }

  checkBoxTest(event: any, item: any, category: any, index) {
    let isPush = false;
    event;
    switch (category) {
      case 'critial_incident':
        if (this.selected_critical_incident.indexOf(this.selected_critical_incident.indexOf(item.unusualIncidentTypeID)) !== -1) {
          this.selected_critical_incident.push({ unusualIncidentTypeID: item.unusualIncidentTypeID });
        } else {
          this.selected_critical_incident.splice(this.selected_critical_incident.indexOf(item.unusualIncidentTypeID), 1);
        }
        break;
      case 'siginifact_incident':
        if (event) {
          if (item.unusualIncidentTypeID !== undefined && item.unusualIncidentTypeID !== null) {
            this.selected_significant_incident[index] = ({ unusualIncidentTypeID: item.unusualIncidentTypeID, incidentType: item.incidentType });
          }
        } else {
          this.selected_significant_incident.splice(this.selected_significant_incident.indexOf(item.unusualIncidentTypeID), 1);
        }
        break;
      case 'unusual_incident':
        if (event) {
          if (item.unusualIncidentTypeID !== undefined && item.unusualIncidentTypeID !== null) {
            this.selected_unusual_incident[index] = ({ unusualIncidentTypeID: item.unusualIncidentTypeID });
          }
        } else {
          this.selected_unusual_incident.splice(this.selected_unusual_incident.indexOf(item.unusualIncidentTypeID), 1);
        }
        break;
    }
  }

  fetchUnusualIncidentData(data) {
    data.map((item) => {

      switch (item) {
        case 'Aggressive or Assaulting Behaviors':
          this.isAggressive = true;
          break;

        case 'Any sexual contact between youth':
          this.isAnySexualContact = true;
          break;

        case 'Breach of privacy or confidentiality':
          this.isBreach = true;
          break;

        case 'Discharge against medical advice':
          this.isDischargeMedical = true;
          break;

        case 'Law enforcement contact':
          this.isLawEnforcement = true;
          break;

        case 'Medication/Pharmacy error/concern':
          this.isMedicationPharmacy = true;
          break;

        case 'Minor injury of client':
          this.isMinorInjury = true;
          break;

        case 'PRN Injection':
          this.isPrnInjection = true;
          break;

        case 'Restraint':
          this.isRestrain = true;
          break;

        case 'Seclusion':
          this.isSeclusion = true;
          break;

        case 'Unauthorized treatment':
          this.isUnauthorizedTreatment = true;
          break;

        case 'Unprofessional conduct by staff or contract staff':
          this.isUnprofessionalConduct = true;
          break;
      }
    });

  }

  fetchClientInjuryTypes() {
    if ((this.incident.client_InjuryTypeID) ? (this.incident.client_InjuryTypeID.injuryTypeID) : false) {
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
  }

  fetchStaffInjuryTypes() {
    if ((this.incident.staff_InjuryTypeID) ? (this.incident.staff_InjuryTypeID.injuryTypeID) : false) {
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

  onModalClose() {
    this.isKansasAttachmentOpen = false;

    this.incident.providerID = { providerName: this.incident.providerID }
    this.incident.payorID = { payorName: this.incident.payorID }

    this.sfcsUse_incident.map((item) => {
      item.staffFullName = {
        'staffFullName': item.staffFullName
      };
    });
  }

  async PpsSendMail() {
    this.formatDates();
    this.fetchCriticalIncidentData(this.criticalIncidentValue);
    this.fetchsignificantIncidentData(this.SignificantIncidentValue);
    this.fetchUnusualIncidentData(this.UnusualIncidentValue);
    this.fetchPrintValues();
    this.fetchClientInjuryTypes();
    this.fetchStaffInjuryTypes();
    await this.getReferralInfo();
    let referralDate = this.incident.referralID.ReferralDate
    if (this.incident.referralID.ReferralDate) {
      this.referralDate = (new Date(referralDate).getMonth() + 1) + '/' + new Date(referralDate).getDate() + '/' + new Date(referralDate).getFullYear()
    }
    else {
      this.referralDate = ""
    }

    let completedData = this.incident.completedDate;
    this.completedDate = (new Date(completedData).getMonth() + 1) + '/' + new Date(completedData).getDate() + '/' + new Date(completedData).getFullYear()
    let incidentDate = this.incident.incidentDate;
    this.incidentDate = (new Date(incidentDate).getMonth() + 1) + '/' + new Date(incidentDate).getDate() + '/' + new Date(incidentDate).getFullYear()

    this.getClientInfo();

  }

  async getClientInfo() {
    if (localStorage.getItem('clientId') || !this._router.url.includes('provider', 0)) {
      const loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      const req = { clientID: parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey() };
      await this._client.getDetailsById(req).then((data: any) => {
        this.clientLastName = data.person.lastName;
        this.clientFirstName = data.person.firstName;
        this.idNumber = data.person.clientID;
        this.dob = data.person.dob;

        if (data.person.dob) {
          const dobSampleDate = new Date(data.person.dob);
          this.dobDate = (dobSampleDate.getMonth() + 1) + '/' + dobSampleDate.getDate() + '/' + dobSampleDate.getFullYear();
        }
        this.courtCase = data.person.kaecses;
        this.fetchPpsInfo();
      });
      this.isPPSDataFetched = true;
      // console.log("PPS Data",this.fetchPpsInfo())
      // this._printService.isPrinting = true;
      // this._printService.printDocument('pps0550', this.fetchPpsInfo());
    }
    else {
      this.fetchPpsInfo();
      this.isPPSDataFetched = true;
      // console.log("PPS Data",this.fetchPpsInfo())
      // this._printService.isPrinting = true;
      // this._printService.printDocument('pps0550', this.fetchPpsInfo());
    }
  }

  async getReferralInfo() {
    const req = { referralID: this.incident.referralID }
    await this._placement.getByIdReferral(req).then((data: any) => {
      data.HomeCounty ? this.county = data.HomeCounty[data.HomeCounty.length - 1].countyID.countyName : this.county = "";

    })
  }

  ppsForm() {
    this.PpsSendMail();
  }

  fetchPpsInfo() {
    this.ppsInfo = {
      incident: this.incident,
      significant: this.SignificantIncidentValue,
      unusual: this.UnusualIncidentValue,
      sfcsUseOnly: this.sfcsUse_incident,
      PersonInvolvedList: this.personInvolvedList,
      data: {
        isClientNearDeath: this.isClientNearDeath,
        isChildSevere: this.isChildSevere,
        isIncidentDrawPublic: this.isIncidentDrawPublic,
        isFosterParentCriminal: this.isFosterParentCriminal,
        isChildWithSevereInjuries: this.isChildWithSevereInjuries,
        parent: this.sfcsUse_incident[0].contactName || "",
        clientLastName: this.clientLastName,
        clientFirstName: this.clientFirstName,
        clientName: this.clientLastName + " " + this.clientFirstName,
        dobDate: this.dobDate,
        courtCase: this.courtCase,
        county: this.county,
        referralDate: this.referralDate,
        provider: this.incident.providerID.providerName || "",
        completedBy: this.completedDate,
        incidentDate: this.incidentDate
      }
    }
  }

  ppsFormValidation(officeId) {
    let ppsValiatedOfficeIds = [1, 28, 2, 29, 3, 4, 5, 6, 31, 7, 16, 8, 10, 38, 34, 46, 33, 13]
    if (ppsValiatedOfficeIds.includes(officeId)) {
      window.open('https://sfcsblobstorageeastus2.file.core.windows.net/dev-scanneddocumentfs/PPS0550-Aug-2019.pdf?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2022-12-31T15:43:42Z&st=2019-07-01T07:43:42Z&spr=https&sig=LYDTRWHSsbnUH4XfhjSHrQ1wzFa1iuFdFxDwRprZCyE%3D')
    }
    else {
      this.formNavigation()
    }

  }

  formNavigation(source?: any) {
    if ((this._router.url === '/reports/opencards/list/client/critical-significant-unusual-incident/detail') ||
      (this._router.url === '/reports/opencards/list/client/critical-significant-unusual-incident/new')) {
      if (source !== null && source !== undefined) {
        this.ppsFormValidation(source.client_SFAOfficeID);
      }
      this._router.navigate(['/reports/opencards/list/client/critical-significant-unusual-incident/view']);
    }
    else if ((this._router.url === '/reports/opencards/list/client/critical-significant-unusual-incident-RM/new') ||
      (this._router.url === '/reports/opencards/list/client/critical-significant-unusual-incident-RM/detail')) {
      this._router.navigate(['/reports/opencards/list/client/critical-significant-unusual-incident-RM/view']);
    }
    else if ((this._router.url === '/provider/opencard/critical-incidents-allinvolve/new') ||
      (this._router.url === '/provider/opencard/critical-incidents-allinvolve/detail')) {
      this._router.navigate(['/provider/opencard/critical-incidents-allinvolve/view']);
    }
    else if ((this._router.url === '/provider/opencard/critical-incidents/new') ||
      (this._router.url === '/provider/opencard/critical-incidents/detail')) {
      this._router.navigate(['/provider/opencard/critical-incidents/view']);
    }
    else if ((this._router.url === '/provider/opencard/critical-incidents-rm/new') ||
      (this._router.url === '/provider/opencard/critical-incidents-rm/detail')) {
      this._router.navigate(['/provider/opencard/critical-incidents-rm/view']);
    }
  }

  printDCFForm() {
    // printDCFForm
  }

}
