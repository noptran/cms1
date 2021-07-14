import { Component, OnInit } from '@angular/core';
import { OpencardsService } from '../opecards-list-view/opencards.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {
  personalCardsList = [];
  caseCardsList = [];
  otherCardsList = [];
  listAllTables = [];

  constructor(private _opencard: OpencardsService, ) { }

  ngOnInit() {
    this.listOfCardsForPersonal();
    this.listOfCardsForCase();
    this._opencard.setOtherRefDetails({
      referralName: "",
    });
  }

  listOfCardsForPersonal() {
    this.personalCardsList.push(
      { name: 'Medications and Allergies', count: '', view: '/reports/all/medication' },
      { name: 'Cases', count: '', view: '/reports/all/case' },
      { name: 'Client Profiles', count: '', view: '/reports/all/client-profile' },
      { name: 'Client Strengths', count: '', view: '/reports/all/client-strength' },
      { name: 'Third Party Liability', count: '', view: '/reports/all/third-party-liability' },
      { name: 'Court Case', count: '', view: '/reports/all/court-case' },
      { name: 'Preventative Measurements', count: '', view: '/reports/all/preventative-measurements' },
      // {name:'Documents',count:'',view:'/reports/all/documents'},
      { name: 'Critical/Significant/Unusual Incident', count: '', view: '/reports/all/unusual-incident' },
      { name: 'Critical/Significant/Unusual Incident - RM Only', count: '', view: '/reports/all/unusual-incident-rm-only' },
      { name: 'Customer Care', count: '', view: '/reports/all/customer-care' },
    );
    this.personalCardsList.sort((a, b) => { return a['name'].localeCompare(b['name']) })
  }
  listOfCardsForCase() {
    this.caseCardsList.push(
      { name: 'CS:Authorization - Client', view: '/reports/all/authorizations', count: '' },
      { name: 'CS:Authorization - Provider', view: '/provider_Authorization', count: '' },
      { name: 'CS:Claim - Provider', view: '/csClaimProvider', count: '' },
      { name: 'Assessments', view: '/reports/all/assessments', count: '' },
      { name: 'Case Activity', view: '/reports/all/case-activity', count: '' },
      { name: 'CS:Authorization - Payee', view: '/payee_Authorization', count: '' },
      { name: 'Case Team', view: '/reports/all/case-team', count: '' },
      { name: 'Home County', view: '/reports/all/home-county', count: '' },
      { name: 'SFCS Office', view: '/reports/all/sfcs-office', count: '' },
      { name: 'NTFF', view: '/reports/all/ntff', count: '' },
      { name: 'Intensive Phase', view: '/reports/all/intensive-phase', count: '' },
      { name: 'Non intentensive phase', view: '/reports/all/non-intensive-phase', count: '' },
      { name: 'Progress Note', view: '/reports/all/progress-note', count: '' },
      { name: 'Case Evaluations', view: '/reports/all/case-evaluations', count: '' },
      { name: 'Progress Note Diagnosis', view: '/reports/all/progress-note-diagnosis', count: '' },
      { name: 'Referral events', view: '/reports/all/referral-events', count: '' },
      { name: 'Court Orders', view: '/reports/all/court-orders', count: '' },
      { name: 'KIPP/PMTO', view: '/reports/all/kipp-pmto', count: '' },
      { name: 'CS - Payee', view: '/csPayee', count: '' },
      { name: 'CS:Claim - Payee', view: '/cs_claim_payee', count: '' },
      { name: 'CS:Claim - Client', view: '/claims/list/cs-claim-list', count: '' },
      { name: 'CS:Client', view: '/csClientList', count: '' },
      { name: 'CS:Provider', view: '/csProviderList', count: '' },
      { name: 'Behavior Assessments', view: '/reports/all/behavior-assessments', count: '' },
      { name: 'Case Plan Goals', view: '/reports/all/case-plan-goals', count: '' },
      { name: 'Appointments', view: '/reports/all/appointments', count: '' },
      { name: 'Monthly Reports', view: '/reports/all/monthly-reports', count: '' },
      { name: 'Supervisory Staffing Form', view: '/reports/all/supervisory-staffing', count: '' },
      { name: 'Supervisory Staffing Form for Supervisor', view: '/reports/all/supervisory-staffing-form', count: '' },
      { name: 'Placements', view: '/reports/all/placements', count: '' },
      { name: 'Attending School', view: '/reports/all/attending-school', count: '' },
      { name: 'Grade Level', view: '/reports/all/grade-level', count: '' },
      { name: 'Home School', view: '/reports/all/home-school', count: '' },
      { name: 'School Release', view: '/reports/all/school-release', count: '' },
      { name: 'Independent Living', view: '/reports/all/independent-living', count: '' },
      { name: 'Social Security Income', view: '/reports/all/social-securtiy-income', count: '' },
      { name: 'Case File Activity', view: '/reports/all/case-file-activity', count: '' },
      { name: 'KIPP', view: '/reports/all/kipp', count: '' },
      { name: 'Placement Referral', view: '/reports/all/placement-referral', count: '' },
      { name: 'Waiver', view: '/reports/all/waiver' },
      { name: 'BH Determination', view: '/reports/all/bh-determination' },
      { name: 'Health Record', view: '/reports/all/health-record' },
      { name: 'Immunization', view: '/reports/all/immunization' },
      { name: 'Kan-Be-Healthy', view: '/reports/all/kan-be-healthy' },
      { name: 'BH Placement History', view: '/reports/all/bh-placement-history' },
      { name: 'Credit Tracking', view: '/reports/all/credit-tracking' },
      { name: 'Education Enrollment - EEISPF', view: '/reports/all/education-enrollment' },
      { name: 'General Education', view: '/reports/all/general-education' },
      { name: 'Special Education', view: '/reports/all/special-education' },
      { name: 'Adoption Event', view: '/reports/all/adoption-event' },
      { name: 'Best Interest Staffing', view: '/reports/all/best-interest-staffing' },
      { name: 'Identified Resource', view: '/reports/all/identified-resource' },
      { name: 'Other Services', view: '/reports/all/other-services' },
      { name: 'Hard goods', view: '/reports/all/hard-goods' },
      { name: 'Extended Family', add: '/reports/extended-family/new', view: '/reports/all/extended-family' },
      { name: 'Family Safety', view: '/reports/all/family-safety' },
      { name: 'FIS Members', view: '/reports/referral/family-preservation/fis-members/view' },
      { name: 'Siblings In Out-Of-Home', add: '', view: '/reports/all/sibilings-in-out-home' },
    );
    this.caseCardsList.sort((a, b) => { return a['name'].localeCompare(b['name']) });
  }
  listOfCardsForOther() { }

}
