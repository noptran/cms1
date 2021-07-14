import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OpencardsService } from './opencards.service';
import { LocalValues } from '../local-values';

@Component({
  selector: 'app-opecards-list-view',
  templateUrl: './opecards-list-view.component.html',
  styleUrls: ['./opecards-list-view.component.scss']
})
export class OpecardsListViewComponent implements OnInit {

  personName: any;
  customizedArray = 'customReport';
  columnToSorted: any;
  filter: any;
  tableArray: any;
  addLink: any;
  navigateTo: any;
  requestObject: any
  master: any;
  columnDefs = [];
  rowData = [];
  defaultColDef;
  initial = 1;
  end = 100;
  breadcrumbs = [];
  asqName = '';
  isAsqFormed = false;
  referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();

  constructor(public _activatedRoute: ActivatedRoute, public _router: Router, public _opencard: OpencardsService, public _localValues: LocalValues) { }

  ngOnInit() {
    this.displayList()
    this.displayListForRFC();
    this.displayListForProvider();
    this.displayPersonMasters();
  }
  /***
   * personName     - Label name (define)
   * requestObject  - API key list(s)
   * master         - personmaster list view switch case name's
   * tableArray     - API key of list of view (data)
   * navigateTo     - Redirect to respective detail page
   * addLink        - Redirect to respective new page
   */
  displayList() {
    let currentURLCheck = this._router.url, currentURL: string;
    if (currentURLCheck.includes('?')) {
      currentURL = this._router.url.split('?')[0]
    } else {
      currentURL = this._router.url
    }
    switch (currentURL) {
      case '/reports/client':
        this.master = 'client';
        break;
      case '/reports/opencards/list/client/allergies':
        this.personName = 'Client Allergie';
        this.requestObject = 'ClientAllergies';
        this.master = 'opencardByClient';
        this.tableArray = 'openCardList';
        this.navigateTo = '/reports/opencards/list/client/allergies/details';
        this.addLink = '/reports/opencards/list/client/allergies/new';
        break;
      case '/reports/opencards/list/client/documents':
        this.personName = 'Attached Document';
        this.master = 'opencardByClient';

        this.requestObject = 'ScannedDocument';
        break;
      case '/reports/opencards/list/client/case':
        this.personName = 'Case';
        this.requestObject = 'cases';
        this.tableArray = 'openCardList';
        this.master = 'cases';
        this.navigateTo = '/reports/referral/family-preservation/detail';
        // this.addLink = '/reports/referral/family-preservation/new';
        this.columnToSorted = 'referralID';
        if (this._localValues.previousurl == '/reports/siblings-in-out-home/view') {
          this.breadcrumbs.push(
            { label: 'Sibling In Home', href: '/reports/siblings-in-out-home/view', active: '' },
          )
        } else {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: 'active' },
          )
        }

        break;
      case '/reports/customer-care/view':
        this.personName = 'Customer Care';
        this.requestObject = 'CustomerCare';
        this.master = 'customerCare';
        this.tableArray = 'CustomerCarePerson';
        this.navigateTo = '/reports/customer-care/detail';
        this.addLink = '/reports/customer-care/new';
        this.columnToSorted = 'CustomerCarePersonID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Customer Care List', active: 'active' },
        )
        break;
      case '/reports/opencards/list/client/critical-significant-unusual-incident':
        this.personName = 'Incident';
        this.requestObject = 'UnusualIncident';
        this.master = 'opencardByClient';
        this.tableArray = 'openCardList';

        this.navigateTo = '/reports/opencards/list/client/critical-significant-unusual-incident/details';
        this.addLink = '/reports/opencards/list/client/critical-significant-unusual-incident/new';
        break;
      case '/reports/opencards/list/client/critical-significant-unusual-incident-RM':
        this.personName = 'Incident- RM Only';
        this.requestObject = 'UnusualIncident';
        this.tableArray = 'openCardList';
        this.master = 'opencardByClient';

        this.navigateTo = '/reports/opencards/list/client/critical-significant-unusual-incident-RM/details';
        this.addLink = '/reports/opencards/list/client/critical-significant-unusual-incident-RM/new';
        break;
      case '/reports/opencards/list/client/third-party-liabilites':
        this.personName = 'Liability';
        this.requestObject = 'UnusualIncident';
        this.master = 'opencardByClient';
        this.tableArray = 'openCardList';

        this.navigateTo = '/reports/opencards/list/client/third-party-liabilites/details';
        this.addLink = '/reports/opencards/list/client/third-party-liabilites/new';
        break;
      case '/reports/opencards/list/client/medication':
        this.personName = 'Medication';
        this.requestObject = 'ClientMedication';
        this.tableArray = 'openCardList';

        this.master = 'opencardByClientMedication';
        this.navigateTo = '/reports/opencards/list/client/medication/details';
        this.addLink = '/reports/opencards/list/client/medication/new';
        break;
      case '/reports/opencards/list/client/strength':
        this.personName = 'Strength';
        this.requestObject = 'ClientStrength';
        this.tableArray = 'openCardList';

        this.master = 'opencardByClient';
        this.navigateTo = '/reports/opencards/list/client/strength/details';
        this.addLink = '/reports/opencards/list/client/strength/new';
        break;
      case '/reports/opencards/list/client/courtcase-number':
        this.personName = 'Court Case Number';
        this.requestObject = 'CourtCase';
        this.tableArray = 'openCardList';
        this.master = 'opencardByClient';
        this.columnToSorted = ''
        this.navigateTo = '/reports/opencards/list/client/courtcase-number/details';
        this.addLink = '/reports/opencards/list/client/courtcase-number/new';
        break;
      case '/reports/referral/family-preservation/assessment/view':
        this.personName = 'Assessments';
        this.master = 'assessments';
        this.filter = 'assessment';
        this.tableArray = 'assessment';

        this.navigateTo = '/reports/referral/family-preservation/assessment/detail';
        this.addLink = '/reports/referral/family-preservation/assessment/new';
        this.columnToSorted = 'assessmentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Assessment List', href: 'reports/referral/family-preservation/assessment/view', active: 'active' },
        )
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('assessment-NCFCH', this.breadcrumbs)
        }
        if (this.referralTypeId === 14) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('assessments-PRTF', this.breadcrumbs)
        }
        break;

      case '/reports/lack-of-contact/view':
        this.personName = 'Lack of Contact';
        this.master = 'lackOfContact';
        this.tableArray = 'lackOfContactCaseActivity',
          this.navigateTo = '/reports/lack-of-contact/detail',
          this.addLink = '/reports/lack-of-contact/new',
          this.columnToSorted = 'ScannedDocumentID';

        break;

      /////////////////////////////
      case '/reports/attachment-document/case-activity':
        this.personName = 'Case Activity Attachment';
        this.master = 'caseActivityAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/case-activity/detail';
        this.addLink = '/reports/attachment-document/case-activity/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },
        )
        if (this.referralTypeId === 9) {
          this._localValues.breadcrumbsChanges('caseActivityAttachment-NCOPS', this.breadcrumbs)
        }
        if (this.referralTypeId === 8) {
          this._localValues.breadcrumbsChanges('caseActivityAttachment-NCHS', this.breadcrumbs)
        }
        break;

      case '/reports/attachment-document/rfc/case-activity':
        this.personName = 'Case Activity Attachment';
        this.master = 'caseActivityAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/case-activity/detail';
        this.addLink = '/reports/attachment-document/rfc/case-activity/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/rfc/case-activity', active: 'active' },
        )
        if (this.referralTypeId === 8) {
          this._localValues.breadcrumbsChanges('caseActivityAttachment-NCHS', this.breadcrumbs)
        }
        break;

      case '/reports/attachment-document/case-plan-goals':
        this.personName = 'Case Plan Goals Attachment';
        this.master = 'casePlanGoalsAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/case-plan-goals/detail';
        this.addLink = '/reports/attachment-document/case-plan-goals/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/case-plan-goals':
        this.personName = 'Case Plan Goals Attachment';
        this.master = 'casePlanGoalsAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/case-plan-goals/detail';
        this.addLink = '/reports/attachment-document/rfc/case-plan-goals/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/assessment':
        this.personName = 'Assessment Attachment';
        this.master = 'assessmentAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/assessment/detail';
        this.addLink = '/reports/attachment-document/assessment/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/assessment':
        this.personName = 'Assessment Attachment';
        this.master = 'assessmentAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/assessment/detail';
        this.addLink = '/reports/attachment-document/rfc/assessment/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;



      case '/reports/attachment-document/court-orders':
        this.personName = 'Court Orders Attachment';
        this.master = 'courtOrderAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/court-orders/detail';
        this.addLink = '/reports/attachment-document/court-orders/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/court-orders':
        this.personName = 'Court Orders Attachment';
        this.master = 'courtOrderAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/court-orders/detail';
        this.addLink = '/reports/attachment-document/rfc/court-orders/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/supervisor-staffing':
        this.personName = 'Supervisor Staffing Attachment';
        this.master = 'supervisorStaffingAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/supervisor-staffing/detail';
        this.addLink = '/reports/attachment-document/supervisor-staffing/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/supervisor-staffing':
        this.personName = 'Supervisor Staffing Attachment';
        this.master = 'supervisorStaffingAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/supervisor-staffing/detail';
        this.addLink = '/reports/attachment-document/rfc/supervisor-staffing/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/progress-notes':
        this.personName = 'Progress Notes Attachment';
        this.master = 'progressNotesAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/progress-notes/detail';
        this.addLink = '/reports/attachment-document/progress-notes/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/family-safety':
        this.personName = 'Family Safety Attachment';
        this.master = 'familySafetyAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/family-safety/detail';
        this.addLink = '/reports/attachment-document/family-safety/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/service-hardgoods':
        this.personName = 'Service Hardgoods Attachment';
        this.master = 'serviceHardgoodsAttachment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/service-hardgoods/detail';
        this.addLink = '/reports/attachment-document/service-hardgoods/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/rfc-authorizations':
        this.personName = 'Authorization Attachment';
        this.master = 'authAttachment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/rfc-authorizations/detail';
        this.addLink = '/reports/attachment-document/rfc/rfc-authorizations/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/rfc-claims':
        this.personName = 'Direct Authorization Attachment';
        this.master = 'claimsDAAttachment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/rfc-claims/detail';
        this.addLink = '/reports/attachment-document/rfc/rfc-claims/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;



      case '/reports/attachment-document/referral-events':
        this.personName = 'Referral Events Attachment';
        this.master = 'referralEventsAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/referral-events/detail';
        this.addLink = '/reports/attachment-document/referral-events/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/fp-referral':
        this.personName = 'Referral Attachment';
        this.master = 'referralAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/fp-referral/detail';
        this.addLink = '/reports/attachment-document/fp-referral/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/case-team':
        this.personName = 'Case Team Attachment';
        this.master = 'caseTeamAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/case-team/detail';
        this.addLink = '/reports/attachment-document/case-team/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/case-team', active: 'active' },
        )
        if (this.referralTypeId === 9) {
          this._localValues.breadcrumbsChanges('caseTeamAttachment-NCOPS', this.breadcrumbs)
        }
        break;

      case '/reports/attachment-document/extended-family':
        this.personName = 'Extended Family Attachment';
        this.master = 'extendedFamilyAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/extended-family/detail';
        this.addLink = '/reports/attachment-document/extended-family/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/extended-family', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/independent-living':
        this.personName = 'Independent Living Attachment';
        this.master = 'independentLivingAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/independent-living/detail';
        this.addLink = '/reports/attachment-document/rfc/independent-living/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/adoption-event':
        this.personName = 'Adoption Attachment';
        this.master = 'adoptionAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/rfc/adoption-event/detail';
        this.addLink = '/reports/attachment-document/rfc/adoption-event/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },
        )
        break;

      case '/reports/attachment-document/rfc/placement':
        this.personName = 'Placement Attachment';
        this.master = 'placementAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/placement/detail';
        this.addLink = '/reports/attachment-document/rfc/placement/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/sfcs-office':
        this.personName = 'SFCS Office Attachment';
        this.master = 'sfmAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/sfcs-office/detail';
        this.addLink = '/reports/attachment-document/rfc/sfcs-office/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/permanency':
        this.personName = 'Permanency Attachment';
        this.master = 'permanencyAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/permanency/detail';
        this.addLink = '/reports/attachment-document/rfc/permanency/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/bis':
        this.personName = 'Best Interesting Staff Attachment';
        this.master = 'bisAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/rfc/bis/detail';
        this.addLink = '/reports/attachment-document/rfc/bis/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/bis', active: 'active' },
        )
        break;

      case '/reports/attachment-document/rfc/monthly-reports':
        this.personName = 'Monthly Reports Attachment';
        this.master = 'monthlyReportsAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/rfc/monthly-reports/detail';
        this.addLink = '/reports/attachment-document/rfc/monthly-reports/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/case-activity', active: 'active' },
        )
        break;

      case '/reports/attachment-document/home-county':
        this.personName = 'Home County Attachment';
        this.master = 'homeCountyAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/home-county/detail';
        this.addLink = '/reports/attachment-document/home-county/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/home-county', active: 'active' },


        )
        break;

      case '/reports/attachment-document/sfcs-office':
        this.personName = 'SFM Attachment';
        this.master = 'sfmAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/sfcs-office/detail';
        this.addLink = '/reports/attachment-document/sfcs-office/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/sfcs-office', active: 'active' },


        )
        break;

      case '/reports/attachment-document/non-therapy':
        this.personName = 'Non-Therapy Face to Face Attachment';
        this.master = 'nonTherapyAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/non-therapy/detail';
        this.addLink = '/reports/attachment-document/non-therapy/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/non-therapy', active: 'active' },


        )
        break;

      case '/reports/attachment-document/phase':
        this.personName = 'Phase Attachment';
        this.master = 'phaseAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/phase/detail';
        this.addLink = '/reports/attachment-document/phase/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/phase', active: 'active' },


        )
        break;

      case '/reports/attachment-document/case-evaluation':
        this.personName = 'Case Evaluation Attachment';
        this.master = 'caseEvaluationAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/case-evaluation/detail';
        this.addLink = '/reports/attachment-document/case-evaluation/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/case-evaluation', active: 'active' },


        )
        break;

      case '/reports/attachment-document/progress-notes-diagnosis':
        this.personName = 'Progress Notes Diagnosis Attachment';
        this.master = 'progressNotesDiagnosisAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/progress-notes-diagnosis/detail';
        this.addLink = '/reports/attachment-document/progress-notes-diagnosis/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/progress-notes-diagnosis', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/referral':
        this.personName = 'RFC Referral Attachment';
        this.master = 'rfcReferralAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/referral/detail';
        this.addLink = '/reports/attachment-document/rfc/referral/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/referral', active: 'active' },


        )
        break;

      case '/reports/attachment-document/kipp-pmto':
        this.personName = 'Kipp PMTO Attachment';
        this.master = 'kippPmtoAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/kipp-pmto/detail';
        this.addLink = '/reports/attachment-document/kipp-pmto/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/kipp-pmto', active: 'active' },


        )
        break;
      case '/reports/attachment-document/rfc/appointments':
        this.personName = 'Appointment Attachment';
        this.master = 'appointmentAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/appointments/detail';
        this.addLink = '/reports/attachment-document/rfc/appointments/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/appointments', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/case-evaluation':
        this.personName = 'Case Evaluation Attachment';
        this.master = 'caseEvaluationAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/case-evaluation/detail';
        this.addLink = '/reports/attachment-document/rfc/case-evaluation/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/case-evaluation', active: 'active' },


        )
        break;

      case '/reports/attachment-document/rfc/case-file-activity':
        this.personName = 'Case File Activity Attachment';
        this.master = 'caseFileActivityAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/case-file-activity/detail';
        this.addLink = '/reports/attachment-document/rfc/case-file-activity/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/rfc/case-file-activity', active: 'active' },
        )
        if (this.referralTypeId === 9) {
          this._localValues.breadcrumbsChanges('caseFileActivityAttachment-NCOPS', this.breadcrumbs)
        }
        break;

      case '/reports/attachment-document/rfc/case-team':
        this.personName = 'Case Team Attachment';
        this.master = 'caseTeamAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/case-team/detail';
        this.addLink = '/reports/attachment-document/rfc/case-team/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/case-team', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/home-county':
        this.personName = 'Home County Attachment';
        this.master = 'homeCountyAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/home-county/detail';
        this.addLink = '/reports/attachment-document/rfc/home-county/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/home-county', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/kipp-pmto':
        this.personName = 'Kipp Attachment';
        this.master = 'kippAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/kipp-pmto/detail';
        this.addLink = '/reports/attachment-document/rfc/kipp-pmto/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/kipp-pmto', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/waiver':
        this.personName = 'Waiver Attachment';
        this.master = 'waiverAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/waiver/detail';
        this.addLink = '/reports/attachment-document/rfc/waiver/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/waiver', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/social-security-income':
        this.personName = 'Social Security Income Attachment';
        this.master = 'socialSecurityIncomeAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/social-security-income/detail';
        this.addLink = '/reports/attachment-document/rfc/social-security-income/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/social-security-income', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/behavioral-assessment':
        this.personName = 'Behavioral Assessment Attachment';
        this.master = 'behavioralAssessmentAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/behavioral-assessment/detail';
        this.addLink = '/reports/attachment-document/rfc/behavioral-assessment/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Dash Board', href: '/reintegration/referral/opencard/behavioral-assessment/dash-board', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/rfc/behavioral-assessment', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/authorization-summary':
        this.personName = 'Authorization Summary Attachment';
        this.master = 'authorizationSummaryAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/authorization-summary/detail';
        this.addLink = '/reports/attachment-document/rfc/authorization-summary/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/authorization-summary', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/credit-tracking':
        this.personName = 'Credit Tracking Attachment';
        this.master = 'creditTrackingAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/credit-tracking/detail';
        this.addLink = '/reports/attachment-document/rfc/credit-tracking/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/credit-tracking', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/education-enrollment':
        this.personName = 'Educational Enrollment Attachment';
        this.master = 'educationEnrollmentAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/education-enrollment/detail';
        this.addLink = '/reports/attachment-document/rfc/education-enrollment/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/education-enrollment', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/general-education':
        this.personName = 'General Education Attachment';
        this.master = 'generalEducationAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/general-education/detail';
        this.addLink = '/reports/attachment-document/rfc/general-education/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/general-education', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/special-education':
        this.personName = 'Special Education Attachment';
        this.master = 'specialEducationAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/special-education/detail';
        this.addLink = '/reports/attachment-document/rfc/special-education/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/special-education', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/attending-school':
        this.personName = 'Attending School Attachment';
        this.master = 'attendingSchoolAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/attending-school/detail';
        this.addLink = '/reports/attachment-document/rfc/attending-school/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/attending-school', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/grade-level':
        this.personName = 'Grade Level Attachment';
        this.master = 'gradeLevelAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/grade-level/detail';
        this.addLink = '/reports/attachment-document/rfc/grade-level/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/grade-level', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/school-release':
        this.personName = 'School Release Attachment';
        this.master = 'schoolReleaseAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/school-release/detail';
        this.addLink = '/reports/attachment-document/rfc/school-release/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/school-release', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/home-school':
        this.personName = 'Home School Attachment';
        this.master = 'homeSchoolAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/home-school/detail';
        this.addLink = '/reports/attachment-document/rfc/home-school/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/home-school', active: 'active' },


        );
        break;

      case '/reports/attachment-document/fis-members':
        this.personName = 'FIS Member Attachment';
        this.master = 'fisMembersAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/fis-members/detail';
        this.addLink = '/reports/attachment-document/fis-members/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/fis-members', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/placement-event':
        this.personName = 'Placement Event Attachment';
        this.master = 'placeentEventAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/rfc/placement-event/detail';
        this.addLink = '/reports/attachment-document/rfc/placement-event/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/rfc/placement-event', active: 'active' },
        )
        break;

      case '/reports/attachment-document/rfc/placement-plan':
        this.personName = 'Placement Plan Attachment';
        this.master = 'placeentPlanAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/rfc/placement-plan/detail';
        this.addLink = '/reports/attachment-document/rfc/placement-plan/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/rfc/placement-plan', active: 'active' },
        )
        break;


      ////Providers

      case '/reports/attachment-document/providers/location':
        this.personName = 'Location Attachment';
        this.master = 'locationAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/providers/location/detail';
        this.addLink = '/reports/attachment-document/providers/location/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Provider Dashboard', href: '/provider/dashboard', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/location', active: 'active' },
        );
        break;

      case '/reports/attachment-document/providers/pets':
        this.personName = 'Pets Attachment';
        this.master = 'petsAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/providers/pets/detail';
        this.addLink = '/reports/attachment-document/providers/pets/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Provider Dashboard', href: '/provider/dashboard', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/pets', active: 'active' },
        );
        break;

      case '/reports/attachment-document/providers/license':
        this.personName = 'License Attachment';
        this.master = 'licenseAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/providers/license/detail';
        this.addLink = '/reports/attachment-document/providers/license/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Provider Dashboard', href: '/provider/dashboard', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/license', active: 'active' },
        );
        break;

      case '/reports/attachment-document/providers/license-exception':
        this.personName = 'License Exception Attachment';
        this.master = 'licenseExceptionAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/providers/license-exception/detail';
        this.addLink = '/reports/attachment-document/providers/license-exception/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Provider Dashboard', href: '/provider/dashboard', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/license-exception', active: 'active' },

        );
        break;

      case '/reports/attachment-document/providers/sponsor':
        this.personName = 'Sponsor Attachment';
        this.master = 'sponsorAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/providers/sponsor/detail';
        this.addLink = '/reports/attachment-document/providers/sponsor/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Provider Dashboard', href: '/provider/dashboard', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/sponsor', active: 'active' },

        );
        break;

      case '/reports/attachment-document/providers/status':
        this.personName = 'Status Attachment';
        this.master = 'statusAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/providers/status/detail';
        this.addLink = '/reports/attachment-document/providers/status/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Provider Dashboard', href: '/provider/dashboard', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/status', active: 'active' },

        );
        break;

      case '/reports/attachment-document/providers/office':
        this.personName = 'SFM Office Attachment';
        this.master = 'sfmOfficeAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/providers/office/detail';
        this.addLink = '/reports/attachment-document/providers/office/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Provider Dashboard', href: '/provider/dashboard', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/office', active: 'active' },

        );
        break;

      case '/reports/attachment-document/providers/sfm-staff':
        this.personName = 'SFM Staff Attachment';
        this.master = 'sfmStaffAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/providers/sfm-staff/detail';
        this.addLink = '/reports/attachment-document/providers/sfm-staff/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Provider Dashboard', href: '/provider/dashboard', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/sfm-staff', active: 'active' },

        );
        break;

      case '/reports/attachment-document/providers/preference':
        this.personName = 'Preference Attachment';
        this.master = 'preferenceAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/providers/preference/detail';
        this.addLink = '/reports/attachment-document/providers/preference/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Provider Dashboard', href: '/provider/dashboard', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/preference', active: 'active' },

        );
        break;

      case '/reports/attachment-document/providers/other-agency-staff':
        this.personName = 'Other Agency Staff Attachment';
        this.master = 'otherAgencyStaffAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/providers/other-agency-staff/detail';
        this.addLink = '/reports/attachment-document/providers/other-agency-staff/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Provider Dashboard', href: '/provider/dashboard', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/other-agency-staff', active: 'active' },

        );
        break;

      case '/reports/attachment-document/providers/school':
        this.personName = 'School Attachment';
        this.master = 'schoolAttachment';
        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/providers/school/detail';
        this.addLink = '/reports/attachment-document/providers/school/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Provider Dashboard', href: '/provider/dashboard', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/school', active: 'active' },

        );
        break;

      // client attachments
      case '/reports/attachment-document/client/medication':
        this.personName = 'Medication Attachment';
        this.master = 'medicationsAttachment';
        this.addLink = '/reports/attachment-document/client/medication/new';

        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/client/medication/detail';
        this.addLink = '/reports/attachment-document/client/medication/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Client List', href: '/reports/medication-allergies/view', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/medication', active: 'active' },
        );
        break;


      case '/reports/attachment-document/client/client-profiles':
        this.personName = 'Client Profiles Attachment';
        this.master = 'clientProfilesAttachment';
        this.addLink = '/reports/attachment-document/client/client-profiles/new';

        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/client/client-profiles/detail';
        this.addLink = '/reports/attachment-document/client/client-profiles/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Client List', href: '/reports/client/profile', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/client/client-profiles', active: 'active' },
        );
        break;

      case '/reports/attachment-document/client/court-case':
        this.personName = 'Court Case Attachment';
        this.master = 'courtCaseAttachment';
        this.addLink = '/reports/attachment-document/client/court-case/new';

        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/client/court-case/detail';
        this.addLink = '/reports/attachment-document/client/court-case/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Court Case List', href: '/reports/court/case/view', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/client/client-profiles', active: 'active' },
        );
        break;

      case '/reports/attachment-document/client/client-strength':
        this.personName = 'Client Strength Attachment';
        this.master = 'clientStrengthAttachment';
        this.addLink = '/reports/attachment-document/client/client-strength/new';
        break;

      case '/reports/attachment-document/client/third-party-liability':
        this.personName = 'Third Party Liability Attachment';
        this.master = 'thirdPartyLiabilityAttachment';
        this.addLink = '/reports/attachment-document/client/third-party-liability/new';

        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/client/third-party-liability/detail';
        this.addLink = '/reports/attachment-document/client/third-party-liability/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Court Case List', href: '/reports/court/case/view', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/client/third-party-liability', active: 'active' },
        );
        break;

      case '/reports/attachment-document/client/preventive-measurements':
        this.personName = 'Preventive Measurements Attachment';
        this.master = 'preventiveMeasurementsAttachment';
        this.addLink = '/reports/attachment-document/client/preventive-measurements/new';

        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/client/preventive-measurements/detail';
        this.addLink = '/reports/attachment-document/client/preventive-measurements/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Preventive Measures List', href: '/reports/preventative-measurements/view', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/client/preventive-measurements', active: 'active' },
        );
        break;

      case '/reports/attachment-document/client/unusual-incident':
        this.personName = 'Unusual Incident Attachment';
        this.master = 'unusualIncidentAttachment';

        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/client/unusual-incident/detail';
        this.addLink = '/reports/attachment-document/client/unusual-incident/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Unusual Incident List', href: '/reports/opencards/list/client/critical-significant-unusual-incident/view', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/client/unusual-incident', active: 'active' },
        );
        break;

      case '/reports/client/documents':
        this.personName = 'Attachment Documents';
        this.master = 'documentAttachment';
        this.addLink = '/reports/client/documents/new';

        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/client/documents/detail';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Attachment List', href: '/reports/client/documents', active: 'active' },
        );
        break;

      case '/reports/attachment-document/rfc/sibilings-in-out-home':
        this.personName = 'Siblings In Out Home';
        this.master = 'siblingsInOutHome';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/sibilings-in-out-home/detail';
        this.addLink = '/reports/attachment-document/rfc/sibilings-in-out-home/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },

          { label: 'Attachment List', href: '/reports/attachment-document/rfc/sibilings-in-out-home', active: 'active' },


        );
        break;

      case '/reports/attachment-document/rfc/bh-determination':
        this.personName = 'BH Determination';
        this.master = 'bhDeterminationAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/bh-determination/detail';
        this.addLink = '/reports/attachment-document/rfc/bh-determination/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'BH Determination Form', href: '/reintegration/referral/opencard/bh-determination/detail' },
          { label: 'Attachment List', href: '/reports/attachment-document/rfc/sibilings-in-out-home', active: 'active' }
        );
        break;
      case '/reports/attachment-document/rfc/health-record':
        this.personName = 'Health Record';
        this.master = 'healthRecordAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/health-record/detail';
        this.addLink = '/reports/attachment-document/rfc/health-record/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Health Record Form', href: '/reintegration/referral/opencard/health-record/detail' },
          { label: 'Attachment List', active: 'active' }
        );
        break;
      case '/reports/attachment-document/rfc/immunization':
        this.personName = 'Immunization';
        this.master = 'immunizationAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/immunization/detail';
        this.addLink = '/reports/attachment-document/rfc/immunization/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Immunization Form', href: '/reintegration/referral/opencard/immunization/detail' },
          { label: 'Attachment List', active: 'active' }
        );
        break;
      case '/reports/attachment-document/rfc/immunization':
        this.personName = 'Immunization';
        this.master = 'immunizationAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/immunization/detail';
        this.addLink = '/reports/attachment-document/rfc/immunization/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Immunization Form', href: '/reintegration/referral/opencard/immunization/detail' },
          { label: 'Attachment List', active: 'active' }
        );
        break;
      case '/reports/attachment-document/rfc/kan-be-healthy':
        this.personName = 'Kan Be Healthy';
        this.master = 'kanbeHealthyAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/rfc/kan-be-healthy/detail';
        this.addLink = '/reports/attachment-document/rfc/kan-be-healthy/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Kan Be Healthy Form', href: '/reintegration/referral/opencard/kan-be-healthy/detail' },
          { label: 'Attachment List', active: 'active' }
        );
        break;

      case '/reports/attachment-document/nc-ops':
        this.personName = 'Referral Attachment';
        this.master = 'referralAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/nc-ops/detail';
        this.addLink = '/reports/attachment-document/nc-ops/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/nc-ops/detail', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/nc-ops', active: 'active' },
        )
        break;

      case '/reports/attachment-document/nc-fch':
        this.personName = 'Referral Attachment';
        this.master = 'referralAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/nc-fch/detail';
        this.addLink = '/reports/attachment-document/nc-fch/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/nc-fch/detail', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/nc-fch', active: 'active' },
        )
        break;

      case '/reports/attachment-document/providers/unusual-incident':
        this.personName = 'Unusual Incident Attachment';
        this.master = 'unusualIncidentAttachment';

        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/providers/unusual-incident/detail';
        this.addLink = '/reports/attachment-document/providers/unusual-incident/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Dashboard', href: '/provider/dashboard/critical-incidents', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/providers/unusual-incident', active: 'active' },
        );
        break;

      case '/reports/attachment-document/claims':
        this.personName = 'Claims Attachment';
        this.master = 'claimsAttachment';

        this.tableArray = 'attachDocList';
        this.navigateTo = '/reports/attachment-document/claims/detail';
        this.addLink = '/reports/attachment-document/claims/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'Claim List', href: '/claims/list/view', active: '' },
          { label: 'Claim Form', href: '/claims/list/details', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/providers/unusual-incident', active: 'active' },
        );
        break;

      case '/reports/attachment-document/nc-rfc-attachment':
        this.personName = 'Referral Attachment';
        this.master = 'referralAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/nc-rfc-attachment/detail';
        this.addLink = '/reports/attachment-document/nc-rfc-attachment/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/nc-rfc/detail', active: '' },
          { label: 'Attachment List', href: '/reports/attachment-document/nc-rfc', active: 'active' },
        )
        break;

      case '/reports/attachment-document/living-arrangement-attachment':
        this.personName = 'Living Arrangement Attachment';
        this.master = 'livingArrangementAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/living-arrangement-attachment/detail';
        this.addLink = '/reports/attachment-document/living-arrangement-attachment/new';
        this.columnToSorted = 'ScannedDocumentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
          { label: 'Placements', href: 'reintegration/referral/opencard/placement/detail', active: '' },
          { label: 'Living Arrangement List', active: '', href: '/reintegration/referral/opencard/placement/living-arrangement/view' },
          { label: 'Living Arrangement Form', active: '', href: '/reintegration/referral/opencard/placement/living-arrangement/detail' },
          { label: 'Attachement List', active: 'active' }
        );
        break;


      case '/reports/attachment-document/placement-auth-attachment':
        this.personName = 'Placement Authorizations Attachment';
        this.master = 'placementAuthorizationsAttachment';
        // this.filter = 'assessment';
        this.tableArray = 'attachDocList';

        this.navigateTo = '/reports/attachment-document/placement-auth-attachment/detail';
        this.addLink = '/reports/attachment-document/placement-auth-attachment/new';
        this.columnToSorted = 'ScannedDocumentID';
        if (this._activatedRoute.snapshot.queryParamMap.get('sub') == 'placement-event') {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
            { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
            { label: 'Placements', href: 'reintegration/referral/opencard/placement/detail', active: '' },
            { label: 'Placement Event List', active: '', href: '/reintegration/referral/opencard/placement/placementEvent/view' },
            { label: 'Placement Authorization Form', active: '', href: '/reintegration/referral/placement-event-authorizations/detail' }
          );
        }
        else {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
            { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
            { label: 'Placements', href: 'reintegration/referral/opencard/placement/detail', active: '' },
            { label: 'Living Arrangement List', active: '', href: '/reintegration/referral/opencard/placement/living-arrangement/view' },
            { label: 'Living Arrangement Form', active: '', href: '/reintegration/referral/opencard/placement/living-arrangement/detail' },
            { label: 'Placement Authorization Form', active: '', href: '/reintegration/referral/placement-authorizations/detail' },
          );
        }


        break;


      /////////////////////////////
      case '/reports/referral/family-preservation/case-activity/view':
        this.personName = 'Case Activity';
        this.master = 'caseactivity';
        this.filter = 'assessment';
        this.tableArray = 'CaseActivity';

        this.navigateTo = '/reports/referral/family-preservation/case-activity/detail';
        this.addLink = '/reports/referral/family-preservation/case-activity/new';
        this.columnToSorted = 'caseActivityID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Case Activity List', href: 'reports/referral/family-preservation/assessment/view', active: 'active' },
        );
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseActivity-NCFCH', this.breadcrumbs)
        }
        if (this.referralTypeId === 9) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('Caseactivity-NCOPS', this.breadcrumbs)
        }
        if (this.referralTypeId === 8) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseActivity-NCHS', this.breadcrumbs)
        }
        if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseActivity-NCRFC', this.breadcrumbs)
        }
        break;
      case '/reports/referral/family-preservation/fis-members/view':
        this.personName = 'FIS Member';
        this.master = 'FIS';
        this.filter = 'assessment';
        this.tableArray = 'ClientReferral';

        this.navigateTo = '/reports/referral/family-preservation/fis-members/detail';
        this.addLink = '/reports/referral/family-preservation/fis-members/new';
        this.columnToSorted = 'clientReferralID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Family', href: '/reports/family/view', active: '' },
          { label: 'FIS Member', href: '/reports/referral/family-preservation/fis-members/view', active: 'active' },
        );
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        break;
      case '/reports/referral/family-preservation/head-of-household/view':
        this.personName = 'Head-Of-Household';
        this.master = 'HoH';
        this.filter = 'assessment';
        this.tableArray = 'ClientReferral';

        this.navigateTo = '/reports/referral/family-preservation/head-of-household/detail';
        this.addLink = '/reports/referral/family-preservation/head-of-household/new';
        this.columnToSorted = 'clientID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Family', href: '/reports/family/view', active: '' },
          { label: 'HoH', href: '/reports/referral/family-preservation/head-of-household/view', active: 'active' },
        );
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        break;
      case '/reports/referral/family-preservation/home-county/view':
        this.personName = 'Home County';
        this.master = 'homeCounty';
        this.filter = 'assessment';
        this.tableArray = 'homeCounty';

        this.navigateTo = '/reports/referral/family-preservation/home-county/detail';
        this.addLink = '/reports/referral/family-preservation/home-county/new';
        this.columnToSorted = 'homeCountyID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Home County', href: '/reports/referral/family-preservation/home-county/view', active: 'active' },
        );
        if (this.referralTypeId === 9) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('homecounty-NCOPS', this.breadcrumbs)
        } else if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('homecounty-NCFCH', this.breadcrumbs)
        }
        else if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('homecounty-JJFC', this.breadcrumbs)
        }
        else if (this.referralTypeId === 11) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('homecounty-NCMHR', this.breadcrumbs)
        }
        else if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('homecounty-NCRFC', this.breadcrumbs)
        }
        break;
      case '/reports/referral/family-preservation/case-plan-goals/view':
        this.personName = 'Case Plan Goals';
        this.master = 'casePlanGoals';
        this.filter = 'assessment';
        this.tableArray = 'casePlan';

        this.navigateTo = '/reports/referral/family-preservation/case-plan-goals/detail';
        this.addLink = '/reports/referral/family-preservation/case-plan-goals/new';
        this.columnToSorted = 'casePlanID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Case Plan Goals List', href: '/reports/referral/family-preservation/case-plan-goals/view', active: 'active' },
        );
        break;

      case '/reports/referral/family-preservation/sfcs-office/view':
        this.personName = 'SFCS Office';
        this.master = 'sfcsOffice';
        this.filter = 'assessment';
        this.tableArray = 'SFAOfficeActivity';

        this.navigateTo = '/reports/referral/family-preservation/sfcs-office/detail';
        this.addLink = '/reports/referral/family-preservation/sfcs-office/new';
        this.columnToSorted = 'sfaOfficeActivityID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'SFM Office List', href: '/reports/referral/family-preservation/sfcs-office/view', active: 'active' },
        );
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('sfcsOffice-NCFCH', this.breadcrumbs)
        }
        if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('sfcsOffice-JJFC', this.breadcrumbs)
        }
        if (this.referralTypeId === 11) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('sfcsOffice-NCMHR', this.breadcrumbs)
        }
        if (this.referralTypeId === 8) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('sfcsOffice-NCHS', this.breadcrumbs)
        }
        if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('sfcsOffice-NCRFC', this.breadcrumbs)
        }
        break;

      case '/reports/extended-family/view':
        let referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
        this.personName = 'Extended Family';
        this.master = 'extendedFamily';
        this.filter = 'assessment';
        this.tableArray = 'FamilyMemberReferral';

        this.navigateTo = '/reports/extended-family/detail';
        this.addLink = '/reports/extended-family/new';
        this.columnToSorted = 'familyMemberReferralID';
        if ((referralTypeId === 2) || (referralTypeId === 14)) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
            { label: 'Family', href: '/reports/family/view', active: '' },
            { label: 'Extended Family', active: 'active' },
          );
        }
        else if (referralTypeId === 5) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
            { label: 'Family', href: '/reports/family/view', active: '' },
            { label: 'Extended Family', active: 'active' },
          );
        }
        else if (referralTypeId === 15) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/bh-ok/detail', active: '' },
            { label: 'Family', href: '/reports/family/view', active: '' },
            { label: 'Extended Family', active: 'active' },
          );
        }
        else if (referralTypeId === 17) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/jjfc/detail', active: '' },
            { label: 'Family', href: '/reports/family/view', active: '' },
            { label: 'Extended Family', active: 'active' },
          );
        }
        else if (referralTypeId === 11) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/nc-mhr/detail', active: '' },
            { label: 'Family', href: '/reports/family/view', active: '' },
            { label: 'Extended Family', active: 'active' },
          );
        }
        else if (referralTypeId === 4) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reports/nc-fch/detail', active: '' },
            { label: 'Family', href: '/reports/family/view', active: '' },
            { label: 'Extended Family', active: 'active' },
          );
        }
        else {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
            { label: 'Family', href: '/reports/family/view', active: '' },
            { label: 'Extended Family', active: 'active' },
          );
        }

        break;
      case '/reports/participants-therpy/view':
        let referralTypeId_participnts = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
        this.personName = 'Participants in Therapy';
        this.addLink = '/reports/participants-therpy/new';
        this.master = 'participantsTherpy';
        this.filter = 'assessment';
        this.tableArray = 'therapyParticipantList';
        this.navigateTo = '/reports/participants-therpy/detail';
        this.columnToSorted = 'therapyParticipantsID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Family', href: 'reports/family/view', active: '' },
          { label: 'Participants in Therapy', active: 'active' },
        );
        if (this.referralTypeId == 9) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('participantInTherophy-NCOPS', this.breadcrumbs)
        }
        break;
      case '/reports/referral/family-preservation/progress-note-diagnosis/view':
        this.personName = 'Progress Note Diagnosis Entry';
        this.master = 'pnDiagnosisEntry';
        this.filter = 'assessment';
        this.tableArray = 'ProgressNoteDiagnosis';

        this.navigateTo = '/reports/referral/family-preservation/progress-note-diagnosis/detail';
        this.addLink = '/reports/referral/family-preservation/progress-note-diagnosis/new';
        this.columnToSorted = 'progressNoteDiagnosisID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          {
            label: 'Progress Note Diagnosis',
            href: '/reports/referral/family-preservation/progress-note-diagnosis/view', active: 'active'
          },
        );
        if (this.referralTypeId === 9) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('progresssNoteDiagnosis-NCOPS', this.breadcrumbs)
        }
        break;

      // case '/reports/referral/family-preservation/phase/intensive-view':
      //   this.personName = 'Intensive Phase';
      //   this.master = 'intensivePhase';
      //   this.filter = 'assessment';
      //   this.tableArray = 'Phase';

      //   this.navigateTo = '/reports/referral/family-preservation/phase/detail';
      //   this.addLink = '/reports/referral/family-preservation/phase/new';
      //   this.columnToSorted = 'phaseID';
      //   this.breadcrumbs.push(
      //     { label: 'List', href: '/reports/client', active: '' },
      //     { label: 'Form', href: '/reports/client/details', active: '' },
      //     { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
      //     { label: 'Intensive Phase', href: '/reports/referral/family-preservation/phase/intensive-view', active: 'active' },
      //   )
      //   break;

      case '/reports/referral/family-preservation/phase':
        this.personName = 'Phase';
        this.master = 'phase';
        this.filter = 'assessment';
        this.tableArray = 'Phase';

        this.navigateTo = '/reports/referral/family-preservation/phase/detail';
        this.addLink = '/reports/referral/family-preservation/phase/new';
        this.columnToSorted = 'phaseID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Phase', href: '/reports/referral/family-preservation/phase', active: 'active' },
        );
        break;

      case '/reports/referral/family-preservation/referral-events/view':
        this.personName = 'Referral Events';
        this.master = 'referralEvents';
        this.filter = 'assessment';
        this.tableArray = 'referralEvent';

        this.navigateTo = '/reports/referral/family-preservation/referral-events/detail';
        this.addLink = '/reports/referral/family-preservation/referral-events/new';
        this.columnToSorted = 'referralEventID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Referral Events', href: '/reports/referral/family-preservation/referral-events/view', active: 'active' },
        );
        break;

      case '/reports/referral/family-preservation/case-team/view':
        this.personName = 'Case Team';
        this.master = 'caseTeam';
        this.filter = 'assessment';
        this.tableArray = 'casePlan';

        this.navigateTo = '/reports/referral/family-preservation/case-team/detail';
        this.addLink = '/reports/referral/family-preservation/case-team/new';
        this.columnToSorted = 'caseTeamID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Case Team', href: '/reports/referral/family-preservation/case-team/view', active: 'active' },
        );
        if (this.referralTypeId === 9) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-NCOPS', this.breadcrumbs)
        } else if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-NCFCH', this.breadcrumbs)
        }
        else if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-JJFC', this.breadcrumbs)
        }
        else if (this.referralTypeId === 11) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-NCMHR', this.breadcrumbs)
        }
        else if (this.referralTypeId === 8) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-NCHS', this.breadcrumbs)
        }
        else if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-NCRFC', this.breadcrumbs)
        }
        else if (this.referralTypeId === 14) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-PRTF', this.breadcrumbs)
        }
        break;

      case '/reports/referral/family-preservation/case-evaluations/view':
        this.personName = 'Case Evaluation';
        this.master = 'caseEval';
        this.filter = 'assessment';
        this.tableArray = 'evaluation';

        this.navigateTo = '/reports/referral/family-preservation/case-evaluations/detail';
        this.addLink = '/reports/referral/family-preservation/case-evaluations/new';
        this.columnToSorted = 'evaluationID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Case Evaluation', href: '/reports/referral/family-preservation/case-evaluations/view', active: 'active' },
        );
        if (this.referralTypeId === 14) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseEvaluation-PRTF', this.breadcrumbs)
        }
        break;

      case '/reports/referral/family-preservation/non-therapy-face-to-face/view':
        this.personName = 'Non-Therapy-Face-To-Face';
        this.master = 'ntff';
        this.filter = 'assessment';
        this.tableArray = 'nonTherapyFaceToFace';

        this.navigateTo = '/reports/referral/family-preservation/non-therapy-face-to-face/detail';
        this.addLink = '/reports/referral/family-preservation/non-therapy-face-to-face/new';
        this.columnToSorted = 'NonTherapyFaceToFaceID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'NTFF', href: '/reports/referral/family-preservation/non-therapy-face-to-face/view', active: 'active' },
        );
        break;


      case '/reports/referral/family-preservation/phase-activity/view':
        this.personName = 'Phase Activities';
        this.master = 'phaseActivity';
        this.filter = 'assessment';
        this.tableArray = 'PhaseActivity';

        this.navigateTo = '/reports/referral/family-preservation/phase-activity/detail';
        this.addLink = '/reports/referral/family-preservation/phase-activity/new';
        this.columnToSorted = 'PhaseActivityID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Phase', href: '/reports/referral/family-preservation/phase/detail', active: '' },
          { label: 'Phase Activities List', href: '/reports/referral/family-preservation/phase-activity/view', active: 'active' },
        );
        break;

      case '/reports/referral/family-preservation/court-order/view':
        this.personName = 'Court Orders';
        this.master = 'courtOrder';
        this.filter = 'assessment';
        this.tableArray = 'casePlan';

        this.navigateTo = '/reports/referral/family-preservation/court-order/detail';
        this.addLink = '/reports/referral/family-preservation/court-order/new';
        this.columnToSorted = 'courtOrderedID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Court Order List', href: '/reports/referral/family-preservation/court-order/view', active: 'active' },
        );
        if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('courtOrder-NCRFC', this.breadcrumbs)
        }
        if (this.referralTypeId === 14) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('courtOrders-PRTF', this.breadcrumbs)
        }
        break;


      case '/claims/list/view':
        this.personName = 'Claim List';
        this.master = 'claimList';
        this.tableArray = 'claim';
        this.navigateTo = '/claims/list/direct/form/view';
        this.addLink = '/claims/list/add';
        break;

      case '/claims/list/cs-claim-list':
        this.personName = 'Claim List';
        this.master = 'csClaimList';
        this.tableArray = 'claim';
        this.navigateTo = '';
        this.addLink = '';
        break;

      case '/reports/referral/family-preservation/progress-notes/view':
        this.personName = 'Progress Note';
        this.master = 'progressNote';
        this.filter = 'assessment';
        this.tableArray = 'progressNote';

        this.navigateTo = '/reports/referral/family-preservation/progress-notes/detail';
        this.addLink = '/reports/referral/family-preservation/progress-notes/new';
        this.columnToSorted = 'progressNoteID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Progress Note List', href: 'reports/referral/family-preservation/progress-notes/view', active: 'active' },
        );
        if (this.referralTypeId === 9) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('progressNote-NCOPS', this.breadcrumbs)
        }
        if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('progressNote-JJFC', this.breadcrumbs)
        }
        break;

      case '/claims/list/direct/auth/list':
        this.personName = 'Direct Authorizations';
        this.master = 'directAuthList';
        this.tableArray = 'directAuthorization';

        this.navigateTo = '/claims/list/direct/form/view';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case', href: '/reports/opencards/list/client/case', active: '' },
          { label: 'Service Claim', href: '/reintegration/referral/service', active: '' },
          { label: "Direct Authorization List", href: "/claims/list/direct/auth/list", active: '' },
        );
        break;

      case '/payee/serviceClaim/directAuth':
        this.personName = 'Payee (Service Claim) Direct Authorizations';
        this.master = 'payeeSeciceClaimDirectAuthList';
        this.tableArray = 'payeeList';
        this.navigateTo = '/claims/list/payee/serviceClaim_otherService/directAuth/form/view';
        this.breadcrumbs = [
          { label: "Payee List", href: "/reports/payee/view", active: "" },
          { label: "Payee Form", href: "/reports/payee/detail", active: "" },
          { label: "Payee (Service Claim) Direct Authorizations", href: "", active: "active" },
        ];
        break;
      case '/reports/referral/family-preservation/kipp-pmto/view':
        this.personName = 'KIPP/PMTO';
        this.master = 'KIPP/PMTO';
        this.filter = 'KIPP';
        this.tableArray = 'KIPP',

          this.navigateTo = '/reports/referral/family-preservation/kipp-pmto/detail',
          this.addLink = '/reports/referral/family-preservation/kipp-pmto/new',
          this.columnToSorted = 'kippID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'KIPP/PMTO', active: 'active', href: '/reports/referral/family-preservation/kipp-pmto/view' },
        );
        break;

      case '/claims/list/other/service/list':
        this.personName = 'Other Services';
        this.master = 'otherServices';
        this.tableArray = 'authorization';
        this.columnToSorted = 'AUTH.BeginDate';

        this.navigateTo = '/reintegration/referral/service/other/service/detail';
        this.addLink = '/reintegration/referral/service/other/service';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case', href: '/reports/opencards/list/client/case', active: '' },
          { label: 'Service Claim', href: '/reintegration/referral/service', active: '' },
          { label: "Other Services List", href: "/claims/list/other/service/list", active: '' },
        );
        break;

      case '/claims/list/hardgoods/list':
        this.personName = 'HardGoods';
        this.master = 'hardGoods';
        this.tableArray = 'authorization';
        this.navigateTo = '/reintegration/referral/service/hardgoods/detail';
        this.addLink = '/reintegration/referral/service/hardgoods';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case', href: '/reports/opencards/list/client/case', active: '' },
          { label: 'Service Claim', href: '/reintegration/referral/service', active: '' },
          { label: "Hard Goods List", href: "/claims/list/hardgoods/list", active: '' },
        );
        break;

      case '/reintegration/referral/service/opencard/claim':
        this.personName = 'Claims list';
        this.master = 'claimsList';
        this.tableArray = 'claim';
        this.navigateTo = '/otherService-direct/form/view';
        this.addLink = '/otherService-direct/form/new';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case', href: '/reports/opencards/list/client/case', active: '' },
          { label: 'Service Claims List', href: '/claims/list/other/service/list', active: '' },
          { label: 'Service Claims', href: '/reintegration/referral/service/other/service/detail', active: '' },
          { label: 'Claim List', active: 'active' }
        );
        break;

      case '/reports/court/case/view':
        this.personName = 'Court Case';
        this.addLink = '/reports/court/case/new';
        this.navigateTo = '/reports/court/case/details';
        this.tableArray = 'openCardList';
        this.columnToSorted = 'courtCaseID';
        this.requestObject = 'courtCase';
        this.master = 'courtCase';

        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Court Case List', active: 'active' },
        );
        break;

      case '/reintegration/referral/service/authorization/summary':
        this.personName = 'Authorization Summary';
        this.master = 'authorizationSummary';
        this.tableArray = 'authorization';
        this.columnToSorted = 'beginDate';
        this.navigateTo = '/reintegration/referral/service/authorization/summary/detail';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case', href: '/reports/opencards/list/client/case', active: '' },
          { label: 'Authorization Summary', href: '/reintegration/referral/service/authorization/summary', active: 'active' },
        );
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('authorization-summary', this.breadcrumbs)
        }
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('authorization-summary-viewonly', this.breadcrumbs)
        }
        if (this.referralTypeId === 11) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges(' ', this.breadcrumbs)
        }
        break;

      case '/reintegration/referral/opencard/school/general-education/view':
        this.personName = 'General School';
        this.master = 'generalSchool';
        this.tableArray = 'casePlan';
        this.addLink = '/reintegration/referral/opencard/school/general-education/new';
        this.navigateTo = '/reintegration/referral/opencard/school/general-education/detail';
        this.columnToSorted = 'generalEducationID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral//detail', active: '' },
          { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
          { label: 'General Education List', active: 'active' },
        );
        if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('generalEducation-JJFC', this.breadcrumbs)
        }
        break;

      case '/reintegration/referral/opencard/school/credit-tracking/view':
        this.personName = 'Credit Tracking';
        this.master = 'creditTracking';
        this.tableArray = 'casePlan';
        this.addLink = '/reintegration/referral/opencard/school/credit-tracking/new';
        this.navigateTo = '/reintegration/referral/opencard/school/credit-tracking/detail';
        this.columnToSorted = 'creditTrackingID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral//detail', active: '' },
          { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
          { label: 'Credit Tracking List', active: 'active' },
        );
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('creditTracking-JJFC', this.breadcrumbs)
        }
        break;

      case '/reintegration/referral/opencard/school/special-education/view':
        this.personName = 'Special Education';
        this.master = 'specialEducation';
        this.tableArray = 'casePlan';
        this.addLink = '/reintegration/referral/opencard/school/special-education/new';
        this.navigateTo = '/reintegration/referral/opencard/school/special-education/detail';
        this.columnToSorted = 'specialEducationID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral//detail', active: '' },
          { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
          { label: 'Special Education List', active: 'active' },
        );
        if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('specialEducation-JJFC', this.breadcrumbs)
        }
        break;

      case '/reintegration/referral/service/opencard/claim/authorizationSummary':
        this.personName = 'Claims list';
        this.master = 'claimsListSummary';
        this.tableArray = 'claim';
        this.navigateTo = '/provider/auth-claim/Claimdetail';
        this.breadcrumbs.push(
          { label: "Person Types", href: "/reports/person/types", active: "" },
          { label: "Provider List", href: "/reports/provider/view", active: "" },
          {
            label: "Provider Form",
            href: "/reports/provider/detail",
            active: "",
          },
          {
            label: "Provider Opencards",
            active: "",
            href: "/provider/dashboard",
          },
          {
            label: "Authorization Summary List",
            active: "",
            href: "/provider/opencard/authorization-summary/view",
          },
          {
            label: "Authorization Summary",
            active: "",
            href: "/provider/opencard/authorization-summary/detail",
          },
          {
            label: "Claim List",
            href:
              "/reintegration/referral/service/opencard/claim/authorizationSummary",
            active: "",
          },
        );
        break;
      case '/reports/family-safety/view':
        this.personName = 'Family Safety';
        this.master = 'familySafety';
        this.tableArray = 'familySafety';
        this.addLink = '/reports/family-safety/new';
        this.navigateTo = '/reports/family-safety/detail';
        this.columnToSorted = 'familySafetyID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Family', href: '/reports/family', active: '' },
          { label: 'Family Safety', active: 'active' },
        );
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        break;
      case '/reports/siblings-in-out-home/view':
        this.personName = 'Siblings In Out-Family	';
        this.master = 'siblings';
        this.tableArray = 'sibOOH';
        // this.navigateTo = '/reports/siblings-in-out-home/detail';
        this.addLink = '/reports/siblings-in-out-home/new';
        this.columnToSorted = 'ClientID';
        if (this.referralTypeId === 4) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'Case Form', href: '/reports/nc-fch/detail', active: '' },
            { label: 'Family', href: '/reports/family/view', active: '' },
            { label: 'Siblings In Out-Family List', active: 'active' },
          );
        }
        else if (this.referralTypeId === 7) {
          this._localValues.breadcrumbsChanges('siblingsInOutHome-NCRFC', this.breadcrumbs)
        }
        else if (this.referralTypeId === 11) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'Case Form', href: '/reports/nc-mhr/detail', active: '' },
            { label: 'Family', href: '/reports/family/view', active: '' },
            { label: 'Siblings In Out-Family List', active: 'active' },
          );
        }
        else if (this.referralTypeId === 9) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'Case Form', href: '/reports/referral/nc-ops/detail', active: '' },
            { label: 'Family', href: '/reports/family/view', active: '' },
            { label: 'Siblings In Out-Family List', active: 'active' },
          );
        }
        else if (this.referralTypeId === 14) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
            { label: 'Family', href: '/reports/family/view', active: '' },
            { label: 'Siblings In Out-Family List', active: 'active' },
          );
        }
        else {
          this.breadcrumbs.push(
            { label: 'Family Safety Form', active: '', href: '/reports/family-safety/detail' },
            { label: 'Family Safety Event List', active: '' },
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'Case Form', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'Family', href: '/reports/family/view', active: '' },
            { label: 'Siblings In Out-Family List', active: 'active' },
          );
        }
        break;
      case '/reports/family-safety/view':
        this.personName = 'Family Safety';
        this.master = 'familySafety';
        this.tableArray = 'familySafety';
        this.addLink = '/reports/family-safety/new';
        this.navigateTo = '/reports/family-safety/detail';
        this.columnToSorted = 'familySafetyID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Family', href: '/reports/family', active: '' },
          { label: 'Family Safety', active: 'active' },
        );
        break;

      case '/reports/family-safety/family-activity/view':
        this.personName = 'Family Safety Activity';
        this.master = 'familySafetyActivity';
        this.tableArray = 'familySafetyActivity';
        this.addLink = '/reports/family-safety/family-activity/new';
        this.navigateTo = '/reports/family-safety/family-activity/detail';
        this.columnToSorted = 'familySafetyActivityID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Family', href: '/reports/family', active: '' },
          { label: 'Family Safety List', active: '', href: '/reports/family-safety/view' },
          { label: 'Family Safety Form', active: '', href: '/reports/family-safety/detail' },
          { label: 'Family Safety Event List', active: 'active' },
        );
        break;

      case '/reports/family-safety/family-activity/view':
        this.personName = 'Family Safety Activity';
        this.master = 'familySafetyActivity';
        this.tableArray = 'familySafetyActivity';
        this.addLink = '/reports/family-safety/family-activity/new';
        this.navigateTo = '/reports/family-safety/family-activity/detail';
        this.columnToSorted = 'familySafetyActivityID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Family', href: '/reports/family', active: '' },
          { label: 'Family Safety List', active: '', href: '/reports/family-safety/view' },
          { label: 'Family Safety Form', active: '', href: '/reports/family-safety/detail' },
          { label: 'Family Safety Event List', active: 'active' },
        );
        break;

      case '/reports/fp-billable-case-activity/view':
        this.personName = 'FP Billabe Case Activity';
        this.master = 'fpBillableCaseActivity';
        this.tableArray = 'billableCaseActivity';
        this.columnToSorted = 'CaseActivityID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'FP Billable Case Activity', active: 'active' },
        );
        if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('billable-case-activity-NCRFC', this.breadcrumbs);
        }
        if (this.referralTypeId === 8) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('billable-case-activity-NCHS', this.breadcrumbs)
        }
        break;
      case '/reports/client-strength/view':
        this.personName = 'Client Strength';
        this.master = 'clientStrength';
        this.tableArray = 'openCardList';
        this.columnToSorted = 'clientStrengthID';
        this.addLink = '/reports/client-strength/new';
        this.navigateTo = '/reports/client-strength/details';
        this.requestObject = 'ClientStrength';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Client', href: '/reports/client/details', active: '' },
          { label: 'Client Strength List', active: 'active' },
        );
        break;

      case '/reports/service-agreement/view':
        this.personName = 'Service Agreement';
        this.master = 'serviceAgreemnt';
        this.tableArray = 'referralEvent';
        this.columnToSorted = 'referralEventID';
        this.addLink = '/reports/service-agreement/new';
        this.navigateTo = '/reports/service-agreement/detail';
        // this.requestObject = 'ClientStrength';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Service Agreement List', active: 'active', href: '/reports/service-agreement/view' },
        );
        if (this.referralTypeId === 5) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('serviceAgreement-NCFI', this.breadcrumbs)
        }
        if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('serviceAgreement-NCRFC', this.breadcrumbs)
        }
        if (this.referralTypeId === 8) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('serviceAgreement-NCHS', this.breadcrumbs)
        }
        if (this.referralTypeId === 9) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('serviceAgreeement-NCOPS', this.breadcrumbs)
        }
        break;

      case '/reports/provider-sponser/view':
        this.personName = 'Provider Sponsor';
        this.master = 'providerSponser';
        this.addLink = '/reports/provider-sponser/new';
        this.navigateTo = '/reports/provider-sponser/detail';
        this.tableArray = 'sponsorList';
        this.columnToSorted = 'sponsorID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider Sponsor', active: 'active' },
        );
        break;

      case '/reports/provider-sponser/cases':
        this.personName = 'Cases';
        this.master = 'providerSponserCases';
        this.addLink = '/reports/provider-sponser/cases';
        this.navigateTo = '/reports/provider-sponser/cases';
        this.tableArray = 'caseList';
        this.columnToSorted = 'sponsorID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider Sponser List', href: '/reports/provider-sponser/view', active: '' },
          { label: 'Provider Sponser', active: '', href: '/reports/provider-sponser/detail' },
          { label: 'Cases', active: 'active' }
        );

        break;

      case '/reports/provider-sponser/sfcs-contract/view':
        this.personName = 'SFCS Contract';
        this.master = 'providerSponserSfcsContract';
        this.addLink = '/reports/provider-sponser/sfcs-contract/new';
        this.navigateTo = '/reports/provider-sponser/sfcs-contract/detail';
        this.tableArray = 'sponsorContractList';
        this.columnToSorted = 'sponsorContractID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider Sponser List', href: '/reports/provider-sponser/view', active: '' },
          { label: 'Provider Sponser', active: '', href: '/reports/provider-sponser/detail' },
          { label: 'SFCS Contract List', active: 'active' }
        );

        break;

      case '/reports/provider-sponser/placement-authorization/view':
        this.personName = 'Placement Authorization';
        this.master = 'providerSponserPlacementAuthorization';
        this.addLink = '/reports/provider-sponser/placement-authorization/view';
        this.navigateTo = '/reports/provider-sponser/placement-authorization/dashboard';
        this.tableArray = 'authorizationList';
        this.columnToSorted = 'authorizationID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider Sponser List', href: '/reports/provider-sponser/view', active: '' },
          { label: 'Provider Sponser', active: '', href: '/reports/provider-sponser/detail' },
          { label: 'Placement Authorization List', active: 'active' }
        );

        break;

      case '/reports/provider-sponser/placement-authorization/claim/view':
        this.personName = 'Claims';
        this.master = 'providerSponserClaims';
        this.addLink = '/reports/provider-sponser/placement-authorization/claim/view';
        this.navigateTo = '/reports/provider-sponser/placement-authorization/claim/detail';
        this.tableArray = 'claim';
        this.columnToSorted = 'claimID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider Sponser List', href: '/reports/provider-sponser/view', active: '' },
          { label: 'Provider Sponser', active: '', href: '/reports/provider-sponser/detail' },
          { label: 'Placement Authorization List', href: '/reports/provider-sponser/placement-authorization/view', active: '' },
          { label: 'Claims List', active: 'active' }
        );

        break;



    }
  }

  displayListForRFC() {
    let currentURLCheck = this._router.url, currentURL: string;
    /**Check for url paramaters */
    if (currentURLCheck.includes('?')) {
      currentURL = this._router.url.split('?')[0]
    } else {
      currentURL = this._router.url;
    }
    console.log("Expected url", this._router.url.split('?'))
    switch (currentURL) {
      case '/reintegration/referral/opencard/case-activity/view':
        this.personName = 'Case Activity';
        this.master = 'caseactivity';
        this.filter = 'assessment';

        this.tableArray = 'CaseActivity';
        this.navigateTo = '/reintegration/referral/opencard/case-activity/detail';
        this.addLink = '/reintegration/referral/opencard/case-activity/new';
        this.columnToSorted = 'caseActivityID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Case Activity List', href: '/reintegration/referral/opencard/case-activity/view', active: 'active' },
        );
        if (this.referralTypeId === 9) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('Caseactivity-NCOPS', this.breadcrumbs)
        }
        if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseActivity-NCRFC', this.breadcrumbs)
        }
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        if (this.referralTypeId === 8) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseActivity-NCHS', this.breadcrumbs)
        }
        break;
      case '/reintegration/referral/opencard/assessments/view':
        this.personName = 'Assessments';
        this.master = 'assessments';
        this.filter = 'assessment';

        this.tableArray = 'assessment';
        this.navigateTo = '/reintegration/referral/opencard/assessments/detail';
        this.addLink = '/reintegration/referral/opencard/assessments/new';
        this.columnToSorted = 'assessmentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Assessment List', href: '/reintegration/referral/opencard/assessments/view', active: 'active' },
        );
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('assessment-NCFCH', this.breadcrumbs)
        }
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        break;
      case '/reintegration/referral/opencard/case-plan-goals/view':
        this.personName = 'Case Plan Goals';
        this.master = 'casePlanGoals';
        this.filter = 'assessment';
        this.tableArray = 'casePlan';

        this.navigateTo = '/reintegration/referral/opencard/case-plan-goals/detail';
        this.addLink = '/reintegration/referral/opencard/case-plan-goals/new';
        this.columnToSorted = 'casePlanID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Case Plan Goals List', href: '/reintegration/referral/opencard/case-plan-goals/view', active: 'active' },
        );
        break;
      case '/reintegration/referral/opencard/case-evaluations/view':
        this.personName = 'Case Evaluation';
        this.master = 'caseEval';
        this.filter = 'assessment';

        this.tableArray = 'evaluation';
        this.navigateTo = '/reintegration/referral/opencard/case-evaluations/detail';
        this.addLink = '/reintegration/referral/opencard/case-evaluations/new';
        this.columnToSorted = 'evaluationID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Case Evaluation', href: '/reintegration/referral/opencard/case-evaluations/view', active: 'active' },
        );
        break;
      case '/reintegration/referral/opencard/case-team/view':
        this.personName = 'Case Team';
        this.master = 'caseTeam';
        this.filter = 'assessment';

        this.tableArray = 'casePlan';
        this.navigateTo = '/reintegration/referral/opencard/case-team/detail';
        this.addLink = '/reintegration/referral/opencard/case-team/new';
        this.columnToSorted = 'caseTeamID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Case Team', href: '/reintegration/referral/opencard/case-team/view', active: 'active' },
        );
        if (this.referralTypeId === 9) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-NCOPS', this.breadcrumbs)
        } else if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-NCFCH', this.breadcrumbs)
        }
        else if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseTeam-NCRFC', this.breadcrumbs)
        }
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        break;
      case '/reintegration/referral/opencard/home-county/view':
        this.personName = 'Home County';
        this.master = 'homeCounty';
        this.filter = 'assessment';

        this.tableArray = 'homeCounty';
        this.navigateTo = '/reintegration/referral/opencard/home-county/detail';
        this.addLink = '/reintegration/referral/opencard/home-county/new';
        this.columnToSorted = 'homeCountyID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Home County', href: '/reintegration/referral/opencard/home-county/view', active: 'active' },
        );
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('homecounty-NCFCH', this.breadcrumbs)
        }
        if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('homecounty-NCRFC', this.breadcrumbs)
        }
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        break;
      case '/reintegration/referral/opencard/sfcs-office/view':
        this.personName = 'SFM Office';
        this.master = 'sfcsOffice';
        this.filter = 'assessment';

        this.tableArray = 'SFAOfficeActivity';
        this.navigateTo = '/reintegration/referral/opencard/sfcs-office/detail';
        this.addLink = '/reintegration/referral/opencard/sfcs-office/new';
        this.columnToSorted = 'sfaOfficeActivityID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'SFM Office List', href: '/reintegration/referral/opencard/sfcs-office/view', active: 'active' },
        );
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('sfcsOffice-NCFCH', this.breadcrumbs)
        }
        if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('sfcsOffice-NCRFC', this.breadcrumbs)
        }
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        break;
      case '/reintegration/referral/opencard/extended-family/view':
        this.personName = 'Extended Family';
        this.master = 'extendedFamily';
        this.filter = 'assessment';

        this.tableArray = 'FamilyMemberReferral';
        this.navigateTo = '/reintegration/referral/opencard/extended-family/detail';
        this.addLink = '/reintegration/referral/opencard/extended-family/new';
        this.columnToSorted = 'familyMemberReferralID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Family', href: '/reports/referral/family-preservation/family', active: '' },
          { label: 'Extended Family', href: '/reintegration/referral/opencard/extended-family/view', active: 'active' },
        );
        break;
      case '/reintegration/referral/opencard/court-order/view':
        this.personName = 'Court Orders';
        this.master = 'courtOrder';
        this.filter = 'assessment';

        this.tableArray = 'casePlan';
        this.navigateTo = '/reintegration/referral/opencard/court-order/detail';
        this.addLink = '/reintegration/referral/opencard/court-order/new';
        this.columnToSorted = 'courtOrderedID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Court Order List', href: '/reintegration/referral/opencard/court-order/view', active: 'active' },
        );
        if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('courtOrder-NCRFC', this.breadcrumbs)
        }
        break;
      case '/reports/payor/view':
        this.personName = 'Payor';
        this.master = 'payor';
        this.filter = 'assessment';

        this.tableArray = 'Payor';
        this.navigateTo = '/reports/payor/detail';
        this.addLink = '/reports/payor/new';
        this.columnToSorted = 'payorID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Payor List', href: '/reports/payor/view', active: 'active' }
        );
        break;
      case '/reports/payee/view':
        this.personName = 'Payee';
        this.master = 'payee';
        this.filter = 'assessment';

        this.tableArray = 'payee';
        this.navigateTo = '/reports/payee/detail';
        this.addLink = '/reports/payee/new';
        this.columnToSorted = 'payeeID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Payor List', href: '/reports/payee/view', active: 'active' }
        );
        break;

      case '/csPayee':
        this.personName = 'CS-Payee';
        this.master = 'payee';
        this.filter = 'assessment';

        this.tableArray = 'payee';
        this.navigateTo = '/csPayee/payeeform';
        // this.addLink = '/reports/payee/new';
        this.columnToSorted = 'payeeID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Payee List', active: 'active' },
        );
        break;
      case '/csPayee/payeeform/payee-DirectAuthList':
        this.personName = 'CS-Payee - Direct Authorization List';
        this.master = 'CS-PayeeDirectAuth';
        this.tableArray = 'authorizationList';
        this.navigateTo = '/claims/list/dir_cs-payee/dir_csPayee-directAuth';
        this.addLink = '/claims/list/cs-payee/csPayee-directAuth/new';
        this.columnToSorted = 'claimID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'CS - Payee List', href: "/csPayee", active: '' },
          { label: 'CS - Payee Form', href: "/csPayee/payeeform", active: '' },
          { label: 'Payee - Direct Authorization List', active: 'active' },
        );
        break;
      case '/csPayee/payeeform/payee-AuthList':
        this.personName = 'CS-Payee Authorization';
        this.master = 'CS-PayeeAuth';
        this.tableArray = 'authorization';
        this.navigateTo = '/reintegration/cs-payee/csPayeeAuthDetail';
        // this.addLink = '/reports/payee/new';
        this.columnToSorted = 'Procode';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'CS - Payee List', href: "/csPayee", active: '' },
          { label: 'CS - Payee Form', href: "/csPayee/payeeform", active: '' },
          { label: 'Payee - Authorization List', active: 'active' },
        );
        break;
      case '/reports/payee-location/view':
        this.personName = 'Payee Location';
        this.master = 'payeeLocation';
        this.filter = 'assessment';

        this.tableArray = 'payeeLocationList';
        this.navigateTo = '/reports/payee-location/detail';
        this.addLink = '/reports/payee-location/detail';
        this.columnToSorted = 'payeeLocationID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Payor List', href: '/reports/payee/view', active: '' },
          { label: 'Payor Form', href: '/reports/payee/detail', active: '' },
          { label: 'Payor Location List', href: '/reports/payee/view', active: 'active' }
        );
        break;
      case '/reports/preventative-measurements/view':
        this.personName = 'Preventative Measurements';
        this.master = 'preventativeMeasurements';
        this.filter = 'assessment';

        this.tableArray = 'openCardList',
          this.requestObject = 'ClientPreventativeMeasure';
        this.navigateTo = '/reports/preventative-measurements/detail',
          this.addLink = '/reports/preventative-measurements/new',
          this.columnToSorted = 'clientPreventativeMeasureID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/person/types', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Preventative Measures List', active: 'active' },
        );
        break;
      case '/reintegration/referral/opencard/appointments/view':
        this.personName = 'Appointments';
        this.master = 'appointments';
        this.filter = 'assessment';

        this.tableArray = 'appointment',
          this.navigateTo = '/reintegration/referral/opencard/appointments/detail',
          this.addLink = '/reintegration/referral/opencard/appointments/new',
          this.columnToSorted = 'appointmentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Appointments', active: 'active' },
        );
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('appointments-NCFCH', this.breadcrumbs)
        }
        if (this.referralTypeId === 5) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('appointments-NCFI', this.breadcrumbs)
        }
        if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('appointments-NCRFC', this.breadcrumbs)
        }
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        if (this.referralTypeId === 14) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('appointments-PRTF', this.breadcrumbs)
        }

        break;
      case '/reintegration/referral/opencard/bh-determination/view':
        this.personName = 'BH Determination';
        this.master = 'bhDetermination';
        this.filter = 'assessment';

        this.tableArray = 'BHDetermination',
          this.navigateTo = '/reintegration/referral/opencard/bh-determination/detail',
          this.addLink = '/reintegration/referral/opencard/bh-determination/new',
          this.columnToSorted = 'BHDeterminationID';
        if (this.referralTypeId === 4) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
            { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
            { label: 'BH Determination', active: 'active' },
          );
        } else {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reports/nc-fch/detail', active: '' },
            { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
            { label: 'BH Determination', active: 'active' },
          );
        }
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('bhDetermination-NCFCH', this.breadcrumbs)
        }

        break;
      case '/reintegration/referral/opencard/attending-school/view':
        this.personName = 'Attending School';
        this.master = 'attendingSchool';
        this.filter = 'assessment';

        this.tableArray = 'clientSchool',
          this.navigateTo = '/reintegration/referral/opencard/attending-school/detail',
          this.addLink = '/reintegration/referral/opencard/attending-school/new',
          this.columnToSorted = 'clientSchoolID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
          { label: 'Attending School', active: 'active' },
        );
        if (this.referralTypeId === 11) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('attendingSchool-NCMHR', this.breadcrumbs)
        }
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('attendingSchool-NCFCH', this.breadcrumbs)
        }
        if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('attendingSchool-JJFC', this.breadcrumbs)
        }
        if (this.referralTypeId === 14) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('attendingSchool-PRTF', this.breadcrumbs)
        }
        break;
      case '/reintegration/referral/opencard/grade-level/view':
        this.personName = 'Grade Level';
        this.master = 'gradeLevel';
        this.filter = 'assessment';

        this.tableArray = 'clientGrade',
          this.navigateTo = '/reintegration/referral/opencard/grade-level/detail',
          this.addLink = '/reintegration/referral/opencard/grade-level/new',
          this.columnToSorted = 'clientGradeID';
        if (this.referralTypeId === 17) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reports/nc-fch/detail', active: '' },
            { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
            { label: 'Grade Level', active: 'active' },
          );
        }
        else if (this.referralTypeId === 4) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/jjfc/detail', active: '' },
            { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
            { label: 'Grade Level', active: 'active' },
          );
        }

        else {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
            { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
            { label: 'Grade Level', active: 'active' },
          );
        }
        break;

      case '/reintegration/referral/opencard/home-school/view':
        this.personName = 'Home School';
        this.master = 'homeSchool';
        this.filter = 'assessment';

        this.tableArray = 'homeSchool',
          this.navigateTo = '/reintegration/referral/opencard/home-school/detail',
          this.addLink = '/reintegration/referral/opencard/home-school/new',
          this.columnToSorted = 'homeSchoolID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
          { label: 'Home School', active: 'active' },
        );
        if (this.referralTypeId === 11) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('homeSchool-NCMHR', this.breadcrumbs)
        }
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('homeSchool-NCFCH', this.breadcrumbs)
        }
        if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('homeSchool-JJFC', this.breadcrumbs)
        }
        if (this.referralTypeId === 14) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('homeSchool-PRTF', this.breadcrumbs)
        }
        break;

      case '/reintegration/referral/opencard/school-release/view':
        this.personName = 'School Release';
        this.master = 'schoolRelease';
        this.filter = 'assessment';

        this.tableArray = 'schoolRelease',
          this.navigateTo = '/reintegration/referral/opencard/school-release/detail',
          this.addLink = '/reintegration/referral/opencard/school-release/new',
          this.columnToSorted = 'schoolReleaseID';
        if (this.referralTypeId === 17) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/jjfc/detail', active: '' },
            { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
            { label: 'School Release', active: 'active' },
          );
        } else {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
            { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
            { label: 'School Release', active: 'active' },
          );
        }
        break;

      case '/reintegration/referral/opencard/health-record/view':
        this.personName = 'Health Record';
        this.master = 'healthRecord';

        this.filter = 'asschoolReleasesessment';
        this.tableArray = 'healthExam',
          this.navigateTo = '/reintegration/referral/opencard/health-record/detail',
          this.addLink = '/reintegration/referral/opencard/health-record/new',
          this.columnToSorted = 'healthExamID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
          { label: 'Health Record', active: 'active' },
        );
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('healthRecord-NCFCH', this.breadcrumbs)
        }
        break;

      case '/reintegration/referral/opencard/adoption-event/view':
        this.personName = 'Adoption Event';
        this.master = 'adoptionEvent';

        this.filter = 'asschoolReleasesessment';
        this.tableArray = 'adoption',
          this.navigateTo = '/reintegration/referral/opencard/adoption-event/detail',
          this.addLink = '/reintegration/referral/opencard/adoption-event/new',
          this.columnToSorted = 'adoptionEventID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Adoption Menu', href: '/reintegration/referral/opencard/adoption/dashboard', active: '' },
          { label: 'Adoption Event', active: 'active' },
        );
        break;
      case '/reintegration/referral/opencard/kan-be-healthy/view':
        this.personName = 'Kan-Be-Healthy';
        this.master = 'kan-be-healthy';

        this.filter = 'asschoolReleasesessment';
        this.tableArray = 'kanBeHealthy',
          this.navigateTo = '/reintegration/referral/opencard/kan-be-healthy/detail',
          this.addLink = '/reintegration/referral/opencard/kan-be-healthy/new',
          this.columnToSorted = 'kanBeHealthyID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
          { label: 'Kan-Be-Healthy', active: 'active', href: '/reintegration/referral/opencard/kan-be-healthy/view' },
        );
        if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('kanBeHealthy-JJFC', this.breadcrumbs)
        }
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('kanBeHealthy-NCFCH', this.breadcrumbs)
        }
        break;
      case '/reintegration/referral/opencard/monthly-reports/view':
        this.personName = 'Monthly Reports';
        this.master = 'monthlyReports';

        this.filter = 'asschoolReleasesessment';
        this.tableArray = 'monthlyReport',
          this.navigateTo = '/reintegration/referral/opencard/monthly-reports/detail',
          this.addLink = '/reintegration/referral/opencard/monthly-reports/new',
          this.columnToSorted = 'monthlyReportID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Monthly Reports', active: 'active', href: '/reintegration/referral/opencard/monthly-reports/view' },
        );
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('monthlyRepots-NCFCH', this.breadcrumbs)
        }
        if (this.referralTypeId === 8) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('monthlyRepots-NCHS', this.breadcrumbs)
        }
        break;
      case '/reintegration/referral/opencard/social-security-income/view':
        this.personName = 'Social Security Income';
        this.master = 'clientSSI';
        this.filter = 'asschoolReleasesessment';
        this.tableArray = 'clientSSI',

          this.navigateTo = '/reintegration/referral/opencard/social-security-income/detail',
          this.addLink = '/reintegration/referral/opencard/social-security-income/new',
          this.columnToSorted = 'clientSSIID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Social Security Income', active: 'active', href: '/reintegration/referral/opencard/social-security-income/view' },
        );
        break;
      case '/reports/provider/view':
        this.personName = 'Provider';
        this.master = 'provider';
        this.filter = 'provider';

        this.tableArray = 'provider',
          this.navigateTo = '/reports/provider/detail',
          this.addLink = '/reports/provider/new',
          this.columnToSorted = 'providerID';
        this.breadcrumbs.push(
          { label: 'Person Types', active: '', href: '/reports/person/types' },
          { label: 'Provider List', active: 'active' },
        );
        break;
      case '/reintegration/referral/opencard/case-file-activity/view':
        this.personName = 'Case File Activity';
        this.master = 'caseFileActivity';
        this.filter = 'caseFileActivity';
        this.tableArray = 'caseFileActivity',
          this.navigateTo = '/reintegration/referral/opencard/case-file-activity/detail',
          this.addLink = '/reintegration/referral/opencard/case-file-activity/new',
          this.columnToSorted = 'caseFileActivityID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Case File Activity List', active: 'active' },

        );
        console.log("this.referralTypeId is", this.referralTypeId)
        if (this.referralTypeId === 9) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseFileActivity-NCOPS', this.breadcrumbs)
        } else if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseFileActivity - NCFCH', this.breadcrumbs)
        }
        else if (this.referralTypeId === 5) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseFileActivity-NCFI', this.breadcrumbs)
        }
        else if (this.referralTypeId === 7) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseFileActivity-NCRFC', this.breadcrumbs)
        }
        else if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        else if (this.referralTypeId === 8) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseFileActivity-NCHS', this.breadcrumbs)
        }
        else if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseFileActivity-JJFC', this.breadcrumbs)
        }
        else if (this.referralTypeId === 11) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseFileActivity-NCMHR', this.breadcrumbs)
        }
        else if (this.referralTypeId === 14) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseFileActivity-PRTF', this.breadcrumbs)
        }
        break;
      case '/reintegration/referral/opencard/independent-living/view':
        this.personName = 'Independent Living';
        this.master = 'independentLiving';

        this.filter = 'independentLiving';
        this.tableArray = 'casePlan',
          this.navigateTo = '/reintegration/referral/opencard/independent-living/detail',
          this.addLink = '/reintegration/referral/opencard/independent-living/new',
          this.columnToSorted = 'independentLivingID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Independent Living List', active: 'active', href: '/reintegration/referral/opencard/independent-living/view' },
        );
        break;
      case '/reintegration/referral/opencard/immunization/view':
        this.personName = 'Immunization';
        this.master = 'immunization';

        this.filter = 'immunization';
        this.tableArray = 'immunization',
          this.navigateTo = '/reintegration/referral/opencard/immunization/detail',
          this.addLink = '/reintegration/referral/opencard/immunization/new',
          this.columnToSorted = 'immunizationID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
          { label: 'Immunization', active: 'active', href: '/reintegration/referral/opencard/immunization/view' },
        );
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('immunization-JJFC', this.breadcrumbs)
        }
        break;

      case '/reintegration/referral/opencard/health/bhok/view':
        this.personName = 'Health';
        this.master = 'bhokHealth';
        this.tableArray = 'healthExam',
          this.navigateTo = '/reintegration/referral/opencard/health/bhok/detail',
          this.addLink = '/reintegration/referral/opencard/health/bhok/new',
          this.columnToSorted = 'healthExamID';
        if (this.referralTypeId === 17) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/jjfc/detail', active: '' },
            { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
            { label: 'Health Record', active: 'active' },
          );

        } else {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/bh-ok/detail', active: '' },
            { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
            { label: 'Health Record', active: 'active' },
          );
        }
        break;
      case '/reintegration/referral/opencard/waiver/view':
        this.personName = 'waiver';
        this.master = 'waiver';

        this.filter = 'waiver';
        this.tableArray = 'waiverActivity',
          this.navigateTo = '/reintegration/referral/opencard/waiver/detail',
          this.addLink = '/reintegration/referral/opencard/waiver/new',
          this.columnToSorted = 'waiverActivityID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Medical Dashboard', href: '/reintegration/referral/opencard/medical/dashboard', active: '' },
          { label: 'Waiver', active: 'active', href: '/reintegration/referral/opencard/waiver/view' },
        );
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('waiver-NCFCH', this.breadcrumbs)
        }
        break;
      case '/reintegration/referral/opencard/kipp/view':
        this.personName = 'KIPP';
        this.master = 'kipp';
        this.filter = 'kipp';

        this.tableArray = 'KIPP',
          this.navigateTo = '/reintegration/referral/opencard/kipp/detail',
          this.addLink = '/reintegration/referral/opencard/kipp/new',
          this.columnToSorted = 'kippID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'KIPP', active: 'active', href: '/reintegration/referral/opencard/kipp/view' },
        );
        break;
      case '/reintegration/referral/opencard/placement/view':
        this.personName = 'Placements';
        this.master = 'placement';
        this.filter = 'kipp';

        this.tableArray = 'placementList',
          this.navigateTo = '/reintegration/referral/opencard/placement/detail',
          this.addLink = '/reintegration/referral/opencard/placement/new',
          this.columnToSorted = 'beginDate';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Placements', active: 'active', href: '/reintegration/referral/opencard/placement/view' },
        );
        if (this.referralTypeId === 9) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('placements-NCOPS', this.breadcrumbs)
        } else if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('placements-NCFCH', this.breadcrumbs)
        }
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('placements-JJFC', this.breadcrumbs)
        }
        if (this.referralTypeId === 11) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('placements-NCMHR', this.breadcrumbs)
        }
        break;
      case '/reintegration/referral/opencard/placement-referral/view':
        this.personName = 'Placement Referral';
        this.master = 'placement-referral';
        this.filter = 'kipp';

        this.tableArray = 'placementReferral',
          this.navigateTo = '/reintegration/referral/opencard/placement-referral/detail',
          this.addLink = '/reintegration/referral/opencard/placement-referral/new',
          this.columnToSorted = 'placementReferralID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Placements', active: 'active' },
        );
        break;
      case '/reports/opencards/list/client/critical-significant-unusual-incident/view':
        this.personName = 'Critical Significant Unusual Incident';
        this.master = 'ciritical-incident';
        this.filter = 'kipp';

        this.tableArray = 'openCardList',
          this.navigateTo = '/reports/opencards/list/client/critical-significant-unusual-incident/detail',
          this.addLink = '/reports/opencards/list/client/critical-significant-unusual-incident/new',
          this.columnToSorted = 'UnusualIncidentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          {
            label: 'Critical Significant Unusual Incident List', active: 'active',
            href: '/reports/opencards/list/client/critical-significant-unusual-incident/view'
          },
        );
        break;
      case '/reports/opencards/list/client/critical-significant-unusual-incident-RM/view':
        this.personName = 'Critical Significant Unusual Incident - RM Only';
        this.master = 'ciritical-incident';
        this.filter = 'kipp';

        this.tableArray = 'openCardList',
          this.navigateTo = '/reports/opencards/list/client/critical-significant-unusual-incident-RM/detail',
          this.addLink = '/reports/opencards/list/client/critical-significant-unusual-incident-RM/new',
          this.columnToSorted = 'UnusualIncidentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Critical Significant Unusual Incident List', active: 'active' },
        );
        break;
      case '/reintegration/referral/opencard/sibilings-in-out-of-home-family/view':
        this.personName = 'Sibilings In Out-of-home-family';
        this.master = 'sibiling in-out';
        this.filter = 'kipp';
        this.tableArray = 'sibOOH',
          this.navigateTo = '/reintegration/referral/opencard/sibilings-in-out-of-home-family/detail',
          this.addLink = '/reports/opencards/list/client/critical-significant-unusual-incident/new',
          this.columnToSorted = 'ClientSiblingID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          {
            label: 'Sibilings In Out-of-home-family List', active: 'active',
            href: '/reintegration/referral/opencard/sibilings-in-out-of-home-family/view'
          },
        );
        break;
      case '/reintegration/referral/opencard/adoption/view':
        this.personName = 'Adoption';
        this.master = 'adoption';
        this.filter = 'kipp';
        this.tableArray = 'adoption',
          this.navigateTo = '/reintegration/referral/opencard/adoption/detail',
          this.addLink = '/reintegration/referral/opencard/adoption/new',
          this.columnToSorted = 'adoptionID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Adoption List', active: 'active' }
        );
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('adoption-NCFCH', this.breadcrumbs)
        }
        break;
      case '/reintegration/referral/opencard/bis/view':
        this.personName = 'Best Interest Staffing';
        this.master = 'bis';
        this.filter = 'kipp';
        this.tableArray = 'adoption',
          this.navigateTo = '/reintegration/referral/opencard/bis/detail',
          this.addLink = '/reintegration/referral/opencard/bis/new',
          this.columnToSorted = 'bestInterestStaffingID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Adoption Menu', href: '/reintegration/referral/opencard/adoption/dashboard', active: '' },
          { label: 'BIS List', active: 'active' }
        );
        break;
      case '/reintegration/referral/opencard/identified-resource/view':
        this.personName = 'Identified Resource';
        this.master = 'ir';
        this.filter = 'kipp';
        this.tableArray = 'identifiedResource',
          this.navigateTo = '/reintegration/referral/opencard/identified-resource/detail',
          this.addLink = '/reintegration/referral/opencard/identified-resource/new',
          this.columnToSorted = 'identifiedResourceID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Adoption Menu', href: '/reintegration/referral/opencard/adoption/dashboard', active: '' },
          { label: 'Identified Resource List', active: 'active' }
        );
        break;

      case '/reintegration/referral/opencard/move-permanency/permanency-form/view':
        this.personName = 'Permanency Form';
        this.master = 'permanencyForm';
        this.filter = 'kipp';
        this.tableArray = 'permanancy',
          this.navigateTo = '/reintegration/referral/opencard/move-permanency/permanency-form/detail',
          this.addLink = '/reintegration/referral/opencard/move-permanency/permanency-form/new',
          this.columnToSorted = 'permanencyEventID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Move and Permanency Menu', href: '/reintegration/referral/opencard/move-permanency/dashboard', active: '' },
          { label: 'Permanency List', active: 'active' }
        );
        break;

      case '/reintegration/referral/opencard/move-permanency/move-form/view':
        this.personName = 'Move Form';
        this.master = 'moveForm';
        this.filter = 'kipp';
        this.tableArray = 'MoveEvent',
          this.navigateTo = '/reintegration/referral/opencard/move-permanency/move-form/detail',
          this.addLink = '/reintegration/referral/opencard/move-permanency/move-form/new',
          this.columnToSorted = 'moveEventID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Move and Permanency Menu', href: '/reintegration/referral/opencard/move-permanency/dashboard', active: '' },
          { label: 'Move List', active: 'active' }
        );
        break;

      case '/reintegration/referral/opencard/school/eeispf/view':
        this.personName = 'Educational Enrollment';
        this.master = 'educationEnrollment';
        this.tableArray = 'educationEntrollment',
          this.navigateTo = '/reintegration/referral/opencard/school/eeispf/detail',
          this.addLink = '/reintegration/referral/opencard/school/eeispf/new',
          this.columnToSorted = 'pdfdocID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'School', href: '/reintegration/referral/opencard/school/dashboard', active: '' },
          { label: 'Educational Enrollment List', active: 'active' }
        );
        if (this.referralTypeId === 15) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
        }
        if (this.referralTypeId === 17) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('eeispf-JJFC', this.breadcrumbs)
        }
        break;

        case '/schoolIEPLists':
          this.personName = 'Education Information';
          this.master = 'IEP';
          this.tableArray = 'educationalInformation',
            this.addLink = '/school_IEP_mod/new',
            this.columnToSorted = 'educationalInformationID';
          this.breadcrumbs=[
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
            { label: 'School', href: '/reintegration/referral/opencard/school/dashboard', active: '' },
            { label: 'Ed Info', active: 'active' }
          ];
          break;

      case '/reintegration/referral/opencard/behavioral-assessment/view':
        let behaviorForm = localStorage.getItem('behaviorFormName');
        this.setAsqName(behaviorForm);
        if (this.isAsqFormed) {
          this.navigateTo = '/reintegration/referral/opencard/behavioral-assessment/' + this.asqName + '/detail';

        }
        this.personName = 'Behavioral Assessment';
        this.master = 'behavioralAssessment';
        this.tableArray = 'baDocList',
          this.navigateTo = '/reintegration/referral/opencard/behavioral-assessment/' + this.asqName + '/detail',
          this.addLink = '/reintegration/referral/opencard/behavioral-assessment/' + this.asqName + '/new',
          this.columnToSorted = 'badocID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Behavioral Assessment List', active: 'active' }
        );
        break;
      case '/reports/supervisory-staffing-form/view':
        let referralTypeID = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
        this.personName = 'Supervisory Stafffing Form';
        this.master = 'supervisoryStaffingFormNode';
        this.tableArray = 'supervisoryStaffingCaseActivity',
          this.navigateTo = '/reports/supervisory-staffing-form/detail',
          this.addLink = '/reports/supervisory-staffing-form/new',
          this.columnToSorted = 'supervisoryStaffingID';
        // this.columnToSorted = 'pdfDocID';

        if (referralTypeID === 1) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
            { label: 'Supervisory Staffing List', active: 'active' }
          );
        } else {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
            { label: 'Supervisory Staffing List', active: 'active' }
          );
        }

        break;

      //
      case '/reports/rfc-supervisory-staffing-form/view':
        let rfcReferralTypeID = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
        this.personName = 'Supervisory Stafffing Form';
        this.master = 'supervisoryStaffingFormRfcNode';
        // this.tableArray = 'supervisoryStaffingCaseActivity',
        this.tableArray = 'supervisoryStaffingList',
          this.navigateTo = '/reports/rfc-supervisory-staffing-form/detail',
          this.addLink = '/reports/rfc-supervisory-staffing-form/new',
          // this.columnToSorted = 'ScannedDocumentID';
          // this.columnToSorted = 'caseActivityID';
          this.columnToSorted = 'supervisoryStaffingID';

        if (rfcReferralTypeID === 1) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
            { label: 'Supervisory Staffing List', active: 'active' }
          );
        } else {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
            { label: 'Supervisory Staffing List', active: 'active' }
          );
        }

        break;
      //

      case '/reports/supervisory-staffing-for-superviosrs/view':
        let SSreferralTypeID = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
        this.personName = 'Supervisory Stafffing Form';
        this.master = 'supervisoryStaffingFormNode';
        this.tableArray = 'supervisoryStaffingList',
          this.navigateTo = '/reports/supervisory-staffing-for-superviosrs/detail',
          this.addLink = '/reports/supervisory-staffing-for-superviosrs/new',
          // this.columnToSorted = 'CaseActivityID';
          this.columnToSorted = 'supervisoryStaffingID';
        if (SSreferralTypeID === 1) {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
            { label: 'Supervisory Staffing For Supervisor List', active: 'active' }
          );
        } else {
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case List', href: '/reports/opencards/list/client/case', active: '' },
            { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
            { label: 'Supervisory Staffing For Supervisor List', active: 'active' }
          );
        }

        break;

      case '/reports/all/client-profile':
        this.personName = 'Client Profile - ALL';
        this.master = 'globalList';
        this.tableArray = 'ClientProfile',
          this.navigateTo = '/reports/client/profile/details',
          this.addLink = '/reports/client/profile/new',
          this.columnToSorted = 'ClientProfileID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Client Profile', active: 'active' },
        );
        break;

      case '/reports/all/case':
        this.personName = 'Case - ALL';
        this.master = 'globalList';
        this.tableArray = 'Case',
          this.navigateTo = '/reports/referral/family-preservation/detail',
          this.columnToSorted = 'CaseID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Case', active: 'active' },
        );
        break;

      case '/reports/all/client-strength':
        this.personName = 'Client Strengths - ALL';
        this.master = 'globalList';
        this.tableArray = 'ClientStrength',
          this.navigateTo = '/reports/client-strength/details',
          this.addLink = '/reports/client-strength/new',
          this.columnToSorted = 'ClientStrengthID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Client Strength', active: 'active' },
        );
        break;
      case '/reports/all/court-case':
        this.personName = 'Client Court Case - ALL';
        this.master = 'globalList';
        this.tableArray = 'CourtCase',
          this.navigateTo = '/reports/court/case/details',
          this.addLink = '/reports/court/case/new',
          this.columnToSorted = 'CourtCaseID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Court Case', active: 'active' },
        );
        break;
      case '/reports/all/unusual-incident':
        this.personName = 'Client Unusual Incident - ALL';
        this.master = 'globalList';
        this.tableArray = 'UnusualIncident_IncidentType',
          // this.navigateTo = '/reports/opencards/list/client/courtcase-number/details',
          // this.addLink = '/reports/opencards/list/client/courtcase-number/new',
          this.columnToSorted = 'UnusualIncident_IncidentTypeID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Unusual Incident', active: 'active' },
        );
        break;
      case '/reports/all/unusual-incident-rm-only':
        this.personName = 'Client Unusual Incident - RM Only - ALL';
        this.master = 'globalList';
        this.tableArray = 'UnusualIncident_IncidentType',
          // this.navigateTo = '/reports/opencards/list/client/courtcase-number/details',
          // this.addLink = '/reports/opencards/list/client/courtcase-number/new',
          this.columnToSorted = 'UnusualIncident_IncidentTypeID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Unusual Incident RM', active: 'active' },
        );
        break;
      case '/reports/all/medication':
        this.personName = 'Client Medication - ALL';
        this.master = 'globalList';
        this.tableArray = 'ClientMedication',
          this.navigateTo = '/reports/medication-allergies/details',
          this.addLink = '/reports/medication-allergies/new',
          this.columnToSorted = 'ClientMedicationID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Client Medication', active: 'active' },
        );
        break;
      case '/reports/all/preventative-measurements':
        this.personName = 'Client Preventative Measurements - ALL';
        this.master = 'globalList';
        this.tableArray = 'ClientPreventativeMeasure',
          this.navigateTo = '/reports/preventative-measurements/detail',
          this.addLink = '/reports/preventative-measurements/new',
          this.columnToSorted = 'ClientPreventativeMeasureID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Client Preventative Measures', active: 'active' },
        );
        break;
      case '/reports/all/assessments':
        this.personName = 'Assessments - ALL';
        this.master = 'globalList';
        this.tableArray = 'Assessment',
          this.navigateTo = '/reports/referral/family-preservation/assessment/detail',
          this.addLink = '/reports/referral/family-preservation/assessment/new',
          this.columnToSorted = 'AssessmentID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Assessments', active: 'active' },
        );
        break;
      case '/reports/all/case-activity':
        this.personName = 'Case Activity - ALL';
        this.master = 'globalList';
        this.tableArray = 'CaseActivity',
          this.navigateTo = '/reports/referral/family-preservation/case-activity/detail',
          this.addLink = '/reports/referral/family-preservation/case-activity/new',
          this.columnToSorted = 'CaseActivityID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Case Activity', active: 'active' },
        );
        break;
      case '/reports/all/case-evaluations':
        this.personName = 'Case Evaluations - ALL';
        this.master = 'globalList';
        this.tableArray = 'Evaluation',
          this.navigateTo = '/reports/referral/family-preservation/case-evaluations/detail',
          this.addLink = '/reports/referral/family-preservation/case-evaluations/new',
          this.columnToSorted = 'EvaluationID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Case Evaluations', active: 'active' },
        );
        break;
      case '/reports/all/case-team':
        this.personName = 'Case Team - ALL';
        this.master = 'globalList';
        this.tableArray = 'CaseTeam',
          this.navigateTo = '/reintegration/referral/opencard/case-team/detail',
          this.addLink = '/reintegration/referral/opencard/case-team/new',
          this.columnToSorted = 'CaseTeamID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Case Team', active: 'active' },
        );
        break;
      case '/reports/all/court-orders':
        this.personName = 'Court Orders - ALL';
        this.master = 'globalList';
        this.tableArray = 'CourtOrdered',
          this.navigateTo = '/reintegration/referral/opencard/court-order/detail',
          this.addLink = '/reintegration/referral/opencard/court-order/new',
          this.columnToSorted = 'CourtOrderedID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Court Orders', active: 'active' },
        );
        break;
      case '/reports/all/home-county':
        this.personName = 'Home County - ALL';
        this.master = 'globalList';
        this.tableArray = 'HomeCounty',
          this.navigateTo = '/reintegration/referral/opencard/home-county/detail',
          this.addLink = '/reintegration/referral/opencard/home-county/new',
          this.columnToSorted = 'HomeCountyID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Home County', active: 'active' },
        );
        break;
      case '/reports/all/intensive-phase':
      case '/reports/all/non-intensive-phase':
        this.personName = 'Phase - ALL';
        this.master = 'globalList';
        this.tableArray = 'Phase',
          this.navigateTo = '/reports/referral/family-preservation/phase/detail',
          this.addLink = '/reports/referral/family-preservation/phase/new',
          this.columnToSorted = 'PhaseID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Phase', active: 'active' },
        );
        break;
      case '/reports/all/kipp-pmto':
        this.personName = 'KIPP PMTO - ALL';
        this.master = 'globalList';
        this.tableArray = 'KIPP',
          this.navigateTo = '/reports/referral/family-preservation/kipp-pmto/detail',
          this.addLink = '/reports/referral/family-preservation/kipp-pmto/new',
          this.columnToSorted = 'KIPPID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'KIPP PMTO', active: 'active' },
        );
        break;
      case '/reports/all/ntff':
        this.personName = 'Non Therapy Face To Face - ALL';
        this.master = 'globalList';
        this.tableArray = 'NonTherapyFaceToFace',
          this.navigateTo = '/reports/referral/family-preservation/non-therapy-face-to-face/detail',
          this.addLink = '/reports/referral/family-preservation/non-therapy-face-to-face/new',
          this.columnToSorted = 'NonTherapyFaceToFaceID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Non Therapy Face To Face', active: 'active' },
        );
        break;
      case '/reports/all/progress-note':
        this.personName = 'Progress Note - ALL';
        this.master = 'globalList';
        this.tableArray = 'ProgressNote',
          this.navigateTo = '/reports/referral/family-preservation/progress-notes/detail',
          this.addLink = '/reports/referral/family-preservation/progress-notes/new',
          this.columnToSorted = 'ProgressNoteID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Progress Note', active: 'active' },
        );
        break;
      case '/reports/all/progress-note-diagnosis':
        this.personName = 'Progress Note Diagnosis - ALL';
        this.master = 'globalList';
        this.tableArray = 'ProgressNoteDiagnosis',
          this.navigateTo = '/reports/referral/family-preservation/progress-note-diagnosis/detail',
          this.addLink = '/reports/referral/family-preservation/progress-note-diagnosis/new',
          this.columnToSorted = 'ProgressNoteDiagnosisID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Progress Note Diagnosis', active: 'active' },
        );
        break;
      case '/reports/all/referral-events':
        this.personName = 'Referral Events - ALL';
        this.master = 'globalList';
        this.tableArray = 'ReferralEvent',
          this.navigateTo = '/reports/referral/family-preservation/referral-events/detail',
          this.addLink = '/reports/referral/family-preservation/referral-events/new',
          this.columnToSorted = 'ReferralEventID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Referral Event', active: 'active' },
        );
        break;

      case '/reports/all/behavior-assessments':
        this.personName = 'Behavioral Assessments - ALL';
        this.master = 'globalList';
        this.tableArray = 'ReferralEvent',
          this.navigateTo = '/reintegration/referral/opencard/behavioral-assessment/detail',
          this.addLink = '/reintegration/referral/opencard/behavioral-assessment/new',
          this.columnToSorted = 'ReferralEventID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Behavioral Assessments', active: 'active' },
        );
        break;
      case '/reports/all/case-plan-goals':
        this.personName = 'Case Plan Goals - ALL';
        this.master = 'globalList';
        this.tableArray = 'CasePlan',
          this.navigateTo = '/reintegration/referral/opencard/case-plan-goals/detail',
          this.addLink = '/reintegration/referral/opencard/case-plan-goals/new',
          this.columnToSorted = 'CasePlanID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Case Plan Goals', active: 'active' },
        );
        break;
      case '/reports/all/appointments':
        this.personName = 'Appointments - ALL';
        this.master = 'globalList';
        this.tableArray = 'Appointment',
          this.navigateTo = '/reintegration/referral/opencard/appointments/detail',
          this.addLink = '/reintegration/referral/opencard/appointments/new',
          this.columnToSorted = 'AppointmentID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Appointments', active: 'active' },
        );
        break;
      case '/reports/all/monthly-reports':
        this.personName = 'Monthly Report - ALL';
        this.master = 'globalList';
        this.tableArray = 'MonthlyReport',
          this.navigateTo = '/reintegration/referral/opencard/monthly-reports/detail',
          this.addLink = '/reintegration/referral/opencard/monthly-reports/new',
          this.columnToSorted = 'MonthlyReportID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Monthly Report', active: 'active' },
        );
        break;
      case '/reports/all/supervisory-staffing':
        this.personName = 'Supervisory Staffing - ALL';
        this.master = 'globalList';
        this.tableArray = 'SupervisoryStaffing',
          this.navigateTo = '/reports/supervisory-staffing-form/detail',
          this.addLink = '/reports/supervisory-staffing-form/new',
          this.columnToSorted = 'SupervisoryStaffingID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Supervisory Staffing', active: 'active' },
        );
        break;
      case '/reports/all/supervisory-staffing-form':
        this.personName = 'Supervisory Staffing - ALL';
        this.master = 'globalList';
        this.tableArray = 'SupervisoryStaffing',
          this.navigateTo = '/reports/supervisory-staffing-form/detail',
          this.addLink = '/reports/referral/family-preservation/referral-events/new',
          this.columnToSorted = 'SupervisoryStaffingID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Supervisory Staffing', active: 'active' },
        );
        break;
      case 'crade-level':
        this.personName = 'Grade Level - ALL';
        this.master = 'globalList';
        this.tableArray = 'ClientGrade',
          this.navigateTo = '/reintegration/referral/opencard/grade-level/detail',
          this.addLink = '/reintegration/referral/opencard/grade-level/new',
          this.columnToSorted = 'ClientGradeID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Grade Level', active: 'active' },
        );
        break;
      case '/reports/all/home-school':
        this.personName = 'Home School - ALL';
        this.master = 'globalList';
        this.tableArray = 'HomeSchool',
          this.navigateTo = '/reintegration/referral/opencard/home-school/detail',
          this.addLink = '/reintegration/referral/opencard/home-school/new',
          this.columnToSorted = 'HomeSchoolID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Home School', active: 'active' },
        );
        break;
      case '/reports/all/school-release':
        this.personName = 'School Release - ALL';
        this.master = 'globalList';
        this.tableArray = 'SchoolRelease',
          this.navigateTo = '/reintegration/referral/opencard/school-release/detail',
          this.addLink = '/reintegration/referral/opencard/school-release/new',
          this.columnToSorted = 'SchoolReleaseID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'School Release', active: 'active' },
        );
        break;
      case '/reports/all/independent-living':
        this.personName = 'Independent Living - ALL';
        this.master = 'globalList';
        this.tableArray = 'IndependentLiving',
          this.navigateTo = '/reintegration/referral/opencard/independent-living/detail',
          this.addLink = '/reintegration/referral/opencard/independent-living/new',
          this.columnToSorted = 'IndependentLivingID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Independent Living', active: 'active' },
        );
        break;
      case '/reports/all/social-securtiy-income':
        this.personName = 'Social Security Income - ALL';
        this.master = 'globalList';
        this.tableArray = 'ReferralEvent',
          this.navigateTo = '/reintegration/referral/opencard/social-security-income/detail',
          this.addLink = '/reintegration/referral/opencard/social-security-income/new',
          this.columnToSorted = 'ReferralEventID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Social Security Income', active: 'active' },
        );
        break;
      case '/reports/all/case-file-activity':
        this.personName = 'Case File Activity - ALL';
        this.master = 'globalList';
        this.tableArray = 'CaseFileActivity',
          this.navigateTo = '/reintegration/referral/opencard/case-file-activity/detail',
          this.addLink = '/reintegration/referral/opencard/case-file-activity/new',
          this.columnToSorted = 'CaseFileActivityID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Case File Activity', active: 'active' },
        );
        break;
      case '/reports/all/kipp':
        this.personName = 'KIPP - ALL';
        this.master = 'globalList';
        this.tableArray = 'KIPP',
          this.navigateTo = '/reintegration/referral/opencard/kipp/detail',
          this.addLink = '/reintegration/referral/opencard/kipp/new',
          this.columnToSorted = 'KIPPID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'KIPP', active: 'active' },
        );
        break;
      case '/reports/all/placement-referral':
        this.personName = 'Placement Referral - ALL';
        this.master = 'globalList';
        this.tableArray = 'PlacementReferral',
          this.navigateTo = '/reintegration/referral/opencard/placement-referral/detail',
          this.addLink = '/reintegration/referral/opencard/placement-referral/new',
          this.columnToSorted = 'PlacementReferralID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Placement Referral', active: 'active' },
        );
        break;
      case '/reports/all/waiver':
        this.personName = 'Waiver - ALL';
        this.master = 'globalList';
        this.tableArray = 'WaiverActivity',
          this.navigateTo = '/reintegration/referral/opencard/waiver/detail',
          this.addLink = '/reintegration/referral/opencard/waiver/new',
          this.columnToSorted = 'WaiverActivityID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Waiver', active: 'active' },
        );
        break;
      case '/reports/all/bh-determination':
        this.personName = 'BH Determination - ALL';
        this.master = 'globalList';
        this.tableArray = 'BHDetermination',
          this.navigateTo = '/reintegration/referral/opencard/bh-determination/detail',
          this.addLink = '/reintegration/referral/opencard/bh-determination/new',
          this.columnToSorted = 'BHDeterminationID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'BH Determination', active: 'active' },
        );
        break;
      case '/reports/all/health-record':
        this.personName = 'Health Record - ALL';
        this.master = 'globalList';
        this.tableArray = 'HealthExam',
          this.navigateTo = '/reintegration/referral/opencard/health-record/detail',
          this.addLink = '/reintegration/referral/opencard/health-record/new',
          this.columnToSorted = 'HealthExamID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Health Record', active: 'active' },
        );
        break;
      case '/reports/all/immunization':
        this.personName = 'Immunization - ALL';
        this.master = 'globalList';
        this.tableArray = 'Immunization',
          this.navigateTo = '/reintegration/referral/opencard/immunization/detail',
          this.addLink = '/reintegration/referral/opencard/immunization/new',
          this.columnToSorted = 'ImmunizationID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Immunization', active: 'active' },
        );
        break;
      case '/reports/all/kan-be-healthy':
        this.personName = 'Kan Be Healthy - ALL';
        this.master = 'globalList';
        this.tableArray = 'KanBeHealthy',
          this.navigateTo = '/reintegration/referral/opencard/kan-be-healthy/detail',
          this.addLink = '/reintegration/referral/opencard/kan-be-healthy/new',
          this.columnToSorted = 'KanBeHealthyID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Kan Be Healthy', active: 'active' },
        );
        break;
      case '/reports/all/bh-placement-history':
        this.personName = 'BH Placement History - ALL';
        this.master = 'globalList';
        this.tableArray = 'ReferralEvent',
          this.navigateTo = '/reports/referral/family-preservation/referral-events/detail',
          this.addLink = '/reports/referral/family-preservation/referral-events/new',
          this.columnToSorted = 'ReferralEventID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'BH Placement History', active: 'active' },
        );
        break;
      case '/reports/all/credit-tracking':
        this.personName = 'Credit Tracking - ALL';
        this.master = 'globalList';
        this.tableArray = 'CreditTracking',
          this.navigateTo = '/reintegration/referral/opencard/school/credit-tracking/detail',
          this.addLink = '/reintegration/referral/opencard/school/credit-tracking/new',
          this.columnToSorted = 'CreditTrackingID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Credit Tracking', active: 'active' },
        );
        break;
      case '/reports/all/education-enrollment':
        this.personName = 'Educational Enrollment - ALL';
        this.master = 'globalList';
        this.tableArray = 'ReferralEvent',
          this.navigateTo = '/reports/referral/family-preservation/referral-events/detail',
          this.addLink = '/reports/referral/family-preservation/referral-events/new',
          this.columnToSorted = 'ReferralEventID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Educational Enrollment', active: 'active' },
        );
        break;
      case '/reports/all/special-education':
        this.personName = 'Special Education - ALL';
        this.master = 'globalList';
        this.tableArray = 'SpecialEducation',
          this.navigateTo = '/reintegration/referral/opencard/school/special-education/detail',
          this.addLink = '/reintegration/referral/opencard/school/special-education/new',
          this.columnToSorted = 'SpecialEducationID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Special Education', active: 'active' },
        );
        break;
      case '/reports/all/adoption-event':
        this.personName = 'Adoption Event - ALL';
        this.master = 'globalList';
        this.tableArray = 'AdoptionEvent',
          this.navigateTo = '/reintegration/referral/opencard/adoption-event/detail',
          this.addLink = '/reintegration/referral/opencard/adoption-event/new',
          this.columnToSorted = 'AdoptionEventID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Adoption Event', active: 'active' },
        );
        break;
      case '/reports/all/best-interest-staffing':
        this.personName = 'Best Interest Staffing - ALL';
        this.master = 'globalList';
        this.tableArray = 'BestInterestStaffing',
          this.navigateTo = '/reintegration/referral/opencard/bis/detail',
          this.addLink = '/reintegration/referral/opencard/bis/new',
          this.columnToSorted = 'BestInterestStaffingID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Best Interest Staff', active: 'active' },
        );
        break;
      case '/reports/all/identified-resource':
        this.personName = 'Identified Resource - ALL';
        this.master = 'globalList';
        this.tableArray = 'IdentifiedResource',
          this.navigateTo = '/reintegration/referral/opencard/identified-resource/detail',
          this.addLink = '/reintegration/referral/opencard/identified-resource/new',
          this.columnToSorted = 'IdentifiedResourceID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Identified Resource', active: 'active' },
        );
        break;
      case '/reports/all/hard-goods':
        this.personName = 'Hard Goods - ALL';
        this.master = 'globalList';
        this.tableArray = 'ReferralEvent',
          this.navigateTo = '/claims/list/direct/form/view',
          this.addLink = '/reintegration/referral/service/hardgoods/new',
          this.columnToSorted = 'ReferralEventID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Hard Goods', active: 'active' },
        );
        break;
      case '/reports/all/extended-family':
        this.personName = 'Extended Family - ALL';
        this.master = 'globalList';
        this.tableArray = 'ReferralEvent',
          this.navigateTo = '/reports/extended-family/detail',
          this.addLink = '/reports/extended-family/new',
          this.columnToSorted = 'ReferralEventID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Extended Family', active: 'active' },
        );
        break;
      case '/reports/all/family-safety':
        this.personName = 'Family Safety - ALL';
        this.master = 'globalList';
        this.tableArray = 'FamilySafety',
          this.navigateTo = '/reports/family-safety/detail',
          this.addLink = '/reports/referral/family-preservation/referral-events/new',
          this.columnToSorted = 'FamilySafetyID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Family Safety', active: 'active' },
        );
        break;
      case '/reports/all/sibilings-in-out-home':
        this.personName = 'Sibilings In Out Home - ALL';
        this.master = 'globalList';
        this.tableArray = 'ClientSibling',
          this.navigateTo = '/reports/siblings-in-out-home/detail',
          this.addLink = '/reports/siblings-in-out-home/new',
          this.columnToSorted = 'ClientSiblingID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Sibilings In Out Home', active: 'active' },
        );
        break;

      case '/reports/all/attending-school':
        this.personName = 'Attending School - ALL';
        this.master = 'globalList';
        this.tableArray = 'ClientSibling',
          this.navigateTo = '/reintegration/referral/opencard/attending-school/detail',
          this.addLink = '/reports/siblings-in-out-home/new',
          this.columnToSorted = 'ClientSiblingID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Client Siblings', active: 'active' },
        );
        break;

      case '/reports/all/third-party-liability':
        this.personName = 'Third Parties Liability - ALL';
        this.master = 'globalList';
        this.tableArray = 'ClientTPL',
          this.navigateTo = '/reports/thirdparty/liability/details',
          this.addLink = '/reports/siblings-in-out-home/new',
          this.columnToSorted = 'ClientTPLID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Third party Liabilities', active: 'active' },
        );
        break;

      case '/reports/all/third-party-liability':
        this.personName = 'Third Parties Liability - ALL';
        this.master = 'globalList';
        this.tableArray = 'GeneralEducation',
          this.navigateTo = '/reintegration/referral/opencard/school/general-education/detail',
          this.addLink = '/reports/siblings-in-out-home/new',
          this.columnToSorted = 'GeneralEducationID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'General Education', active: 'active' },
        );
        break;

      case '/reports/all/third-party-liability':
        this.personName = 'Third Parties Liability - ALL';
        this.master = 'globalList';
        this.tableArray = 'GeneralEducation',
          this.navigateTo = '/reintegration/referral/opencard/school/general-education/detail',
          this.addLink = '/reports/siblings-in-out-home/new',
          this.columnToSorted = 'GeneralEducationID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'General Education', active: 'active' },
        );
        break;

      case '/provider_Authorization_claim':
        this.personName = 'Provider Authorization Claim';
        this.master = 'provider_autho_claim';
        this.tableArray = 'authorizationClaimList',
          this.addLink = '/provider/provider_AuthorizationClaimNew',
          this.columnToSorted = 'claimID';
        this.breadcrumbs = [
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Provider Authorization', href: '/provider_Authorization', active: '' },
          { label: 'Authorization Information', href: '/reintegration/provider/providerAuthorization_detail', active: '' },
          { label: 'Claims List', active: 'active' }
        ]
        break;
      case '/payee_Authorization_claim':
        this.personName = 'Payee Authorization Claim';
        this.master = 'payee_autho_claim';
        this.tableArray = 'authorizationClaimList',
          this.addLink = '/payee/payee_AuthorizationClaimNew',
          this.columnToSorted = 'claimID';
        this.breadcrumbs = [
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'Payee Authorization', href: '/payee_Authorization', active: '' },
          { label: 'Authorization Information', href: '/reintegration/payee/payeeAuthorization_detail', active: '' },
          { label: 'Claims List', active: 'active' }
        ]
        break;

      case '/cs_claim_payeeClaim':
        this.personName = 'CS:Claim PayeeClaim';
        this.master = 'cs-payeeClaim';
        this.tableArray = 'authorizationClaimList',
          this.addLink = '/csPayee/cs_claim_payeeClaimNew',
          this.columnToSorted = 'claimID';
        this.breadcrumbs = [
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'CS:Claim Payee', href: '/cs_claim_payee', active: '' },
          { label: 'Claim Payee', href: "/cs_claim_payee/claimDetail", active: '' },
          { label: 'Claims List', active: 'active' }
        ]
      case '/cs_claim_payee':
        this.personName = 'CS:Claim Payee';
        this.master = 'csClaim-payee';
        this.tableArray = 'claim';
        this.navigateTo = '';
        this.addLink = '';
        this.columnToSorted = 'claimID';
        this.navigateTo = '/cs_claim_payee/claimDetail',
          this.breadcrumbs.push(
            { label: 'Cards', href: '/reports/client-view/cards', active: '' },
            { label: 'CS:Claim Payee', href: "/cs_claim_payee", active: 'active' }
          );
        break;

      case '/reports/all/sfcs-office':
        this.personName = 'Third Parties Liability - ALL';
        this.master = 'globalList';
        this.tableArray = 'StaffSFAOffice',
          this.navigateTo = '/reintegration/referral/opencard/sfcs-office/detail',
          this.addLink = '/reports/siblings-in-out-home/new',
          this.columnToSorted = 'StaffSFAOfficeID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'SFM Office', active: 'active' },
        );
        break;
      case '/reports/all/general-education':
        this.personName = 'General Education- ALL';
        this.master = 'globalList';
        this.tableArray = 'GeneralEducation',
          this.navigateTo = '/reintegration/referral/opencard/school/general-education/detail',
          this.addLink = '/reports/siblings-in-out-home/new',
          this.columnToSorted = 'StaffSFAOfficeID';
        this.breadcrumbs.push(
          { label: 'Cards', href: '/reports/client-view/cards', active: '' },
          { label: 'General Education', active: 'active' },
        );
        break;

      case '/reintegration/referral/opencard/placement/living-arrangement/view':
        this._localValues.placementProviderMode = 'placements';
        this.personName = 'Living Arrangement';
        this.master = 'livingArrangement';
        this.tableArray = 'livingArrangement',
          this.navigateTo = '/reintegration/referral/opencard/placement/living-arrangement/detail',
          this.addLink = '/reintegration/referral/opencard/placement/living-arrangement/new',
          this.columnToSorted = 'livingArrangementID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
          { label: 'Placements', href: '/reintegration/referral/opencard/placement/detail' },
          { label: 'Living Arrangement', active: 'active' },
        );
        break;

      case '/reintegration/referral/opencard/NC-FI-appointments/view':
        this.personName = 'Appointments';
        this.master = 'nc-fi-appointments';
        this.filter = 'assessment';

        this.tableArray = 'appointment',
          this.navigateTo = '/reintegration/referral/opencard/appointments/detail',
          this.addLink = '/reintegration/referral/opencard/appointments/new',
          this.columnToSorted = 'appointmentID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reports/referral/family-preservation/detail', active: '' },
          { label: 'Appointments', active: 'active' },
        );
        if (this.referralTypeId === 4) {
          this.breadcrumbs = this._localValues.breadcrumbsChanges('appointments-NCFCH', this.breadcrumbs)
        }
        break;
      case '/reintegration/referral/placement-authorizations/list':
        this.personName = 'Authorizations';
        this.master = 'AuthorizationTempList';
        this.tableArray = 'authorizationList';
        this.navigateTo = '/reintegration/referral/placement-authorizations/detail';
        this.addLink = '/reintegration/referral/placement-authorizations/new';
        this.columnToSorted = 'authorizationID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
          { label: 'Placements', active: '/reintegration/referral/opencard/placement/detail' },
          { label: 'Living Arrangement List', active: '', href: '/reintegration/referral/opencard/placement/living-arrangement/view' },
          { label: 'Living Arrangement Form', active: '', href: '/reintegration/referral/opencard/placement/living-arrangement/detail' },
          { label: 'Authorization List', active: 'active' },
        )
        break;
      case '/reintegration/referral/placement-authorizations/claims':
        this.personName = 'Authorizations Claims',
          this.master = 'AuthorizationTempClaimsList',
          this.tableArray = 'claim',
          this.columnToSorted = 'claimsID',
          this.addLink = '/auth-claim'
        if ((this._activatedRoute.snapshot.queryParamMap.get('module') == 'placementEvent') || (this._activatedRoute.snapshot.queryParamMap.get('sub') == 'placement-event')) {
          this.breadcrumbs.length = 0;
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
            { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
            { label: 'Placements', active: '/reintegration/referral/opencard/placement/detail' },
            { label: 'Placement Event List', active: '', href: '/reintegration/referral/opencard/placement/placementEvent/view' },
            { label: 'Placement Event Form', active: '', href: '/reintegration/referral/opencard/placement/placementEvent/detail' },
            { label: 'Authorization List', active: '', href: '/reintegration/referral/placement-authorizations/claims' },
            { label: 'Authorization Form', active: '', href: '/reintegration/referral/placement-event-authorizations/detail' }
          )
        } else if ((this._activatedRoute.snapshot.queryParamMap.get('module') == 'livingArrangment') || (this._activatedRoute.snapshot.queryParamMap.get('sub') == 'livingArrangment')) {
          this.breadcrumbs.length = 0;
          this.breadcrumbs.push(
            { label: 'List', href: '/reports/client', active: '' },
            { label: 'Form', href: '/reports/client/details', active: '' },
            { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
            { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
            { label: 'Placements', active: '/reintegration/referral/opencard/placement/detail' },
            { label: 'Living Arrangement List', active: '', href: '/reintegration/referral/opencard/placement/living-arrangement/view' },
            { label: 'Living Arrangement Form', active: '', href: '/reintegration/referral/opencard/placement/living-arrangement/detail' },
            { label: 'Authorization List', active: '', href: '/reintegration/referral/placement-authorizations/claims' },
            { label: 'Authorization Form', active: '', href: '/reintegration/referral/placement-event-authorizations/detail' }
          )
        } else if (this._activatedRoute.snapshot.queryParamMap.get('origin') == 'cards') {
          this.breadcrumbs.length = 0;
          this.breadcrumbs.push(
            { label: 'Cards', href: '/reports/client-view/cards', active: '' },
            { label: 'Authorizations', href: '/reports/all/authorizations', active: '' },
            { label: 'Authorization Form', href: '/reintegration/referral/placement-event-authorizations/detail', active: '' },
            { label: 'Claims List', active: 'active' },
          )
        } else {
          (this._router.url.includes('auth_id')) ?
            this.breadcrumbs.push(
              { label: 'List', href: '/reports/client', active: '' },
              { label: 'Form', href: '/reports/client/details', active: '' },
              { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
              { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
              { label: 'Placements', active: 'reintegration/referral/opencard/placement/detail' },
              { label: 'Daycare Authorization List', active: '', href: '/reintegration/referral/opencard/placement/daycare-authorization/view' },
              { label: 'Daycare Authorization Form', active: '', href: '/reintegration/referral/opencard/placement/daycare-authorization/detail' },
            )
            :
            this.breadcrumbs.push(
              { label: 'List', href: '/reports/client', active: '' },
              { label: 'Form', href: '/reports/client/details', active: '' },
              { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
              { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
              { label: 'Placements', active: 'reintegration/referral/opencard/placement/detail' },
              { label: 'Living Arrangement List', active: '', href: '/reintegration/referral/opencard/placement/living-arrangement/view' },
              { label: 'Living Arrangement Form', active: '', href: '/reintegration/referral/opencard/placement/living-arrangement/detail' },
              { label: 'Authorization List', active: '', href: '/reintegration/referral/placement-authorizations/list' },
              { label: 'Authorization Form', active: '', href: '/auth-claim/details' }
            )
        }

        break;

      //
      //
      case '/payee/auth_list/claim-list':
        this.personName = 'Payee Authorizations Claims',
          this.master = 'PayeeAuthorizationClaimsList',
          this.tableArray = 'claim',
          this.columnToSorted = 'claimsID',
          this.navigateTo = '/payee/authClaim/details';
        this.breadcrumbs = [
          { label: "Payee List", href: "/reports/payee/view", active: "" },
          { label: "Payee Form", href: "/reports/client/details", active: "" },
          { label: "Payee - Authorizations Summary", href: "/payee/auth_list", active: "" },
          { label: "Payee - Authorizations Summary Form", href: "/reintegration/payee/Auth-detail", active: "" },
          { label: "Payee - Claim List", href: "", active: "active" },
        ];
        break;
      case '/payee/serviceClaim_hardgoods/auth_list/claim-list':
        this.personName = 'Payee - Service Claim - Hard Goods(Claims)',
          this.master = 'PayeeServiceHardAuthorizationClaimsList',
          this.tableArray = 'claim',
          this.columnToSorted = 'claimsID',
          this.navigateTo = '/payee/serviceClaim_hardgoods/auth-claim/details';
        this.breadcrumbs = [
          { label: "Payee List", href: "/reports/payee/view", active: "" },
          { label: "Payee Form", href: "/reports/payee/detail", active: "" },
          { label: "Payee - Service Claim - Hard Goods", href: "/payee/serviceClaim_hardgoods/auth_list", active: "" },
          { label: "Payee - (Service Claim - Hard Goods) Authorizations Form", href: "/reintegration/payee/serviceClaim_hardgoods/Auth-detail", active: "" },
          { label: "Payee - Claim List", href: "", active: "active" },
        ];
        break;
      case '/payee/serviceClaim_otherService/auth_list/claim-list':
        this.personName = 'Payee - Service Claim - Other Services(Claims)',
          this.master = 'PayeeServiceOtherServiceAuthorizationClaimsList',
          this.tableArray = 'claim',
          this.columnToSorted = 'claimsID',
          this.navigateTo = '/payee/serviceClaim_otherService/auth-claim/details';
        this.breadcrumbs = [
          { label: "Payee List", href: "/reports/payee/view", active: "" },
          { label: "Payee Form", href: "/reports/payee/detail", active: "" },
          { label: "Payee - Service Claim - Other Services", href: "/payee/serviceClaim_otherService/auth_list", active: "" },
          { label: "Payee - (Service Claim - Other Services) Authorizations Form", href: "/reintegration/payee/serviceClaim_otherService/Auth-detail", active: "" },
          { label: "Payee - Claim List", href: "", active: "active" },
        ];
        break;
      //
      case '/reintegration/referral/placement-event-authorizations/list':
        this.personName = 'Authorizations',
          this.master = 'placementEventAuthorizationTempList';
        this.tableArray = 'authorizationlist',
          this.navigateTo = '/reintegration/referral/placement-event-authorizations/detail';
        this.addLink = '/reintegration/referral/placement-event-authorizations/new';
        this.columnToSorted = 'authorizationID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
          { label: 'Placements', active: '/reintegration/referral/opencard/placement/detail' },
          { label: 'Placement Event List', active: '', href: '/reintegration/referral/opencard/placement/placementEvent/view' },
          { label: 'Placement Event Form', active: '', href: '/reintegration/referral/opencard/placement/placementEvent/detail' },
          { label: 'Authorization List', active: 'active' },
        )
        break;
      //

      case '/reintegration/referral/opencard/placement/placementEvent/view':
        this.personName = 'Placement Event';
        this.master = 'placementEvent';
        this.tableArray = 'placementDetailList',
          this.navigateTo = '/reintegration/referral/opencard/placement/placementEvent/detail',
          this.addLink = '/reintegration/referral/opencard/placement/placementEvent/new',
          this.columnToSorted = 'beginDate';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
          { label: 'Placements', href: '/reintegration/referral/opencard/placement/detail' },
          { label: 'Placement Event', active: 'active' },
        );
        break;

      case '/reintegration/referral/opencard/placement/placementPlan/view':
        this.personName = 'Placement Plan';
        this.master = 'placementPlan';

        this.tableArray = 'placementPlan';
        this.navigateTo = '/reintegration/referral/opencard/placement/placementPlan/detail',
          this.addLink = '/reintegration/referral/opencard/placement/placementPlan/new',
          this.columnToSorted = 'PlacementPlanID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
          { label: 'Placements', href: '/reintegration/referral/opencard/placement/detail' },
          { label: 'Placement Plan', active: 'active' },
        );
        break;

      case '/provider/opencard/recruitment/view':
        this.personName = 'Recruitment';
        this.master = 'recruitment';
        this.tableArray = 'recruitmentInquiryList',
          this.navigateTo = '/provider/opencard/recruitment/detail',
          this.addLink = '/provider/opencard/recruitment/new',
          this.columnToSorted = 'recruitmentInquiryID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Recruitment List', active: 'active' }
        );

        break;

      case '/provider/opencard/recruitment/inquiry/event/view':
        this.personName = 'Recruitment Inquiry';
        this.master = 'recruitmentInquiry';
        this.tableArray = 'recruitmentInquiryEventList',
          this.navigateTo = '/provider/opencard/recruitment/inquiry/event/detail',
          this.addLink = '/provider/opencard/recruitment/inquiry/event/new',
          this.columnToSorted = 'recruitmentInquiryID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Recruitment', active: '', href: '/provider/opencard/recruitment/detail' },
          { label: 'Recruitment Inquiry List', active: 'active' }
        );

        break;

      case '/provider/opencard/recruitment/staff/view':
        this.personName = 'Recruitment Staff';
        this.master = 'recruitmentStaff';
        this.tableArray = 'recruitmentStaffList',
          this.navigateTo = '/provider/opencard/recruitment/staff/detail',
          this.addLink = '/provider/opencard/recruitment/staff/new',
          this.columnToSorted = 'recruitmentStaffID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Recruitment List', active: '', href: '/provider/opencard/recruitment/view' },
          { label: 'Recruitment', active: '', href: '/provider/opencard/recruitment/detail' },
          { label: 'Recruitment Staff List', active: 'active' }
        );

        break;

      case '/reports/casaOfficer/list':
        this.personName = 'Cases';
        this.master = 'casaOfficerCases';
        this.tableArray = 'caseList',
          this.navigateTo = '/reports/casaOfficer/test',
          this.addLink = '/reports/casaOfficer/test',
          this.columnToSorted = 'caseTeamID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'CASA Volunteer', href: "/reports/casaOfficer", active: '' },
          { label: 'Cases', href: "/reports/casaOfficer/view", active: 'active' },
        );

        break;

      case '/reports/communityMember/list':
        this.personName = 'Cases';
        this.master = 'communityMemberCases';
        this.tableArray = 'caseList',
          this.navigateTo = '/reports/communityMember/test',
          this.addLink = '/reports/communityMember/test',
          this.columnToSorted = 'personID';
        this.breadcrumbs.push(

          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'Community Member', href: "/reports/communityMember", active: '' },
          { label: 'Cases Dashboard', href: "/reports/communityMember/view", active: 'active' },
        );

        break;

      case '/reports/school/view':
        this.personName = 'School';
        this.master = 'personTypeCardSchool';
        this.tableArray = 'school',
          this.navigateTo = '/reports/school/detail',
          this.addLink = '/reports/school/new',
          this.columnToSorted = 'schoolID';
        this.breadcrumbs.push(

          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'School List', href: "/reports/school", active: 'active' }
        );
        break;

      case '/reports/school/attending-school':
        this.personName = 'Attending School';
        this.master = 'personTypeCardAttendingSchool';
        this.tableArray = 'attendingSchoolList',
          this.navigateTo = '/reports/school/attending-school',
          this.addLink = '/reports/school/attending-school',
          this.columnToSorted = 'beginDate';
        this.breadcrumbs.push(

          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'School List', href: "/reports/school/view", active: '' },
          { label: 'School Form', href: "/reports/school/detail", active: '' },
          { label: 'Attending School List', href: "/reports/school", active: 'active' }
        );
        break;

      case '/reports/school/home-school':
        this.personName = 'Home School';
        this.master = 'personTypeCardHomeSchool';
        this.tableArray = 'homeSchoolList',
          this.navigateTo = '/reports/school/home-school',
          this.addLink = '/reports/school/home-school',
          this.columnToSorted = 'beginDate';
        this.breadcrumbs.push(

          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'School List', href: "/reports/school/view", active: '' },
          { label: 'School Form', href: "/reports/school/detail", active: '' },
          { label: 'Home School List', href: "/reports/school", active: 'active' }


        );
        break;

      case '/reintegration/referral/opencard/attending-school/detail':
        let schoolCatagory = this._opencard.getSchoolCatagory();
        if (schoolCatagory == 'Attending School') {
          this.personName = 'Attending School';
          this.master = 'clientAttendingSchool';
          this.tableArray = 'attendingSchoolList',
            this.navigateTo = '/reintegration/referral/opencard/attending-school/detail',
            this.addLink = '/reintegration/referral/opencard/attending-school/detail',
            this.columnToSorted = 'clientSchoolID';
          this.breadcrumbs = [];
        }
        else if (schoolCatagory == 'Home School') {
          this.personName = 'Home School';
          this.master = 'clientHomeSchool';
          this.tableArray = 'homeSchoolList',
            this.navigateTo = '/reports/school/home-school',
            this.addLink = '/reports/school/home-school',
            this.columnToSorted = 'homeSchoolID';
          this.breadcrumbs = [];
        }


        break;

      case '/reports/judge/cases':
        this.personName = 'Cases';
        this.master = 'judgeCases';
        this.tableArray = 'caseList',
          this.navigateTo = '/reports/judge/cases',
          this.addLink = '/reports/judge/cases',
          this.columnToSorted = 'personID';
        this.breadcrumbs.push(
          { label: 'List', href: "/reports/judge", active: '' },
          { label: 'Judge Form', href: "/reports/judge/details", active: '' },
          { label: 'Cases', href: "/reports/judge/cases", active: 'active' }
        );

        break;

      case '/reports/guardianAdl/cases':
        this.personName = 'Cases';
        this.master = 'galCases';
        this.tableArray = 'caseList',
          this.navigateTo = '/reports/guardianAdl/cases',
          this.addLink = '/reports/guardianAdl/cases',
          this.columnToSorted = 'personID';
        this.breadcrumbs.push(
          { label: 'List', href: "/reports/guardianAdl", active: '' },
          { label: 'GAL Form', href: "/reports/guardianAdl/details", active: '' },
          { label: 'Cases', href: "/reports/guardianAdl/cases", active: 'active' }
        );

        break;

      case '/reports/familyMember/household-member/cases':
        this.personName = 'Cases';
        this.master = 'fmHouseholdCases';
        this.tableArray = 'caseList',
          this.navigateTo = '/reports/familyMember/household-member/cases',
          this.addLink = '/reports/familyMember/household-member/cases',
          this.columnToSorted = 'clientID';

        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'Family Member List', href: "/reports/familyMember", active: '' },
          { label: 'Family Member Form', href: "/reports/familyMember/details", active: '' },
          { label: 'Family Member Household Dashboard', href: "/reports/familyMember/household-member", active: '' },
          { label: 'Family Member Household Cases', href: "/reports/familyMember/details", active: 'active' },
        );

        break;

      case '/reports/familyMember/extended-family/cases':
        this.personName = 'Cases';
        this.master = 'fmExtendedFamilyCases';
        this.tableArray = 'caseList',
          this.navigateTo = '/reports/familyMember/extended-family/cases',
          this.addLink = '/reports/familyMember/extended-family/cases',
          this.columnToSorted = 'clientID';

        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'Family Member List', href: "/reports/familyMember", active: '' },
          { label: 'Family Member Form', href: "/reports/familyMember/details", active: '' },
          { label: 'Family Member Extended Family Dashboard', href: "/reports/familyMember/extended-family", active: '' },
          { label: 'Family Member Extended Family Cases', href: "/reports/familyMember/details", active: 'active' },
        );

        break;

      case '/reports/crbOfficer/cases':
        this.personName = 'Cases';
        this.master = 'crbCases';
        this.tableArray = 'caseList',
          this.navigateTo = '/reports/crbOfficer/cases',
          this.addLink = '/reports/crbOfficer/cases',
          this.columnToSorted = 'personID';
        this.breadcrumbs.push(
          { label: 'List', href: "/reports/crbOfficer/cases", active: '' },
          { label: 'CRB Form', href: "/reports/crbOfficer/details", active: '' },
          { label: 'Cases', href: "/reports/guardianAdl/cases", active: 'active' }
        );

        break;

      case '/reports/customer-care/list':
        this.personName = 'Customer Care Person';
        this.master = 'personTypeCustomerCarePerson';
        this.tableArray = 'CustomerCarePerson',
          this.navigateTo = '/reports/customer-care/person/detail',
          this.columnToSorted = 'custCarePersonID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'Customer Care List', href: "/reports/customer-care/list", active: 'active' }
        );
        break;

      case '/prtf/referral/opencard/medical/health-exam/view':
        this.personName = 'Health Exam';
        this.master = 'prtfHealthExam';

        this.filter = 'asschoolReleasesessment';
        this.tableArray = 'healthExam',
          this.navigateTo = '/prtf/referral/opencard/medical/health-exam/detail',
          this.addLink = '/prtf/referral/opencard/medical/health-exam//new',
          this.columnToSorted = 'healthExamID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/prtf/new', active: '' },
          { label: 'Medical Dashboard', href: '/prtf/referral/opencard/medical/dashboard', active: '' },
          { label: 'Health Exam', active: 'active' },
        );

        break;

      case '/prtf-opencards-medical/progress-report/view':
        this.personName = 'Progress Report';
        this.master = 'prtfProgressReport';

        this.tableArray = 'progressReportsID',
          this.navigateTo = '/prtf-opencards-medical/progress-report/detail',
          this.addLink = '/prtf-opencards-medical/progress-report/new',
          this.columnToSorted = 'healthExamID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/prtf/new', active: '' },
          { label: 'Progress Report', active: 'active' },
        );

        break;

      case '/recruitment-training/view':
        this.personName = 'Recruitment Training Form';
        this.master = 'providerRecruitmentTraining';
        this.tableArray = 'recruitmentTraninigList',
          this.navigateTo = '/recruitment-training/detail',
          this.addLink = '/recruitment-training/new',
          this.columnToSorted = 'recruitmentTrainingID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'Provider List', href: "/reports/provider/view", active: '' },
          { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Recruitment List', active: '', href: '/provider/opencard/recruitment/view' },
          { label: 'Recruitment Training List', active: '', href: 'active' },
        )

        break;

      case '/licensing-recruitment/view':
        this.personName = 'Licensing';
        this.master = 'providerRecruitmentLicensing';
        this.tableArray = 'recruitmentLicensingEvent',
          this.navigateTo = '/licensing-recruitment/detail',
          this.addLink = '/licensing-recruitment/new',
          this.columnToSorted = 'recruitmentLicensingEventID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'Provider List', href: "/reports/provider/view", active: '' },
          { label: 'Provider Form', href: "/reports/provider/detail", active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Recruitment List', active: '', href: '/provider/opencard/recruitment/view' },
          { label: 'Licensing List', active: '', href: 'active' },
        )

        break;

      case '/team-leader/view':
        this.personName = 'Team Leader';
        this.master = 'staffTeamLeader';
        this.tableArray = 'staffTeamleaders',
          this.navigateTo = '/team-leader/detail',
          this.addLink = '/team-leader/new',
          this.columnToSorted = 'staffTeamLeaderID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'List', href: "/reports/staff", active: '' },
          { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
          { label: 'Team Leader List', active: '', href: 'active' },
        )

        break;

      case '/team-member/view':
        this.personName = 'Team Member';
        this.master = 'staffTeamMember';
        this.tableArray = 'staffTeamMembers',
          this.navigateTo = '/team-member/detail',
          this.addLink = '/team-member/new',
          this.columnToSorted = 'staffTeamLeaderID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'List', href: "/reports/staff", active: '' },
          { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
          { label: 'Team Member List', active: '', href: 'active' },
        )

        break;

      case '/compliance-tech/view':
        this.personName = 'Compliance Tech';
        this.master = 'staffComplianceTech';
        this.tableArray = 'staffComplianceTechTeamMembers',
          // this.tableArray='staffComplianceTech',
          this.navigateTo = '/compliance-tech/detail',
          this.addLink = '/compliance-tech/new',
          this.columnToSorted = 'staffID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'List', href: "/reports/staff", active: '' },
          { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
          { label: 'Compliance Tech List', active: '', href: 'active' },
        )

        break;



      case '/assigned-compliance-tech/view':
        this.personName = 'Assigned Compliance Tech';
        this.master = 'staffAssignedComplianceTech';
        this.tableArray = 'staffComplianceTech',
          this.navigateTo = '/assigned-compliance-tech/detail',
          this.addLink = '/assigned-compliance-tech/new',
          this.columnToSorted = 'staffComplianceTechID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'List', href: "/reports/staff", active: '' },
          { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
          { label: 'Assigned Compliance Tech List', active: '', href: 'active' },
        )

        break;


      case '/staff-opencards/recruitment-provider/view':
        this.personName = 'Recruitment Provider';
        this.master = 'staffRecruitmentProvider';
        this.tableArray = 'recruitmentStaff',
          this.navigateTo = '/reports/provider/detail',
          this.columnToSorted = 'providerID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'List', href: "/reports/staff", active: '' },
          { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
          { label: 'Recruitment Provider List', active: '', href: 'active' },
        )

        break;

      case '/staff-opencards/sfm-office/primary-office/view':
        this.personName = 'Primary Office';
        this.master = 'staffPrimaryOffice';
        this.tableArray = 'staffSFAOffices',
          this.navigateTo = '/staff-opencards/sfm-office/primary-office/detail',
          this.addLink = '/staff-opencards/sfm-office/primary-office/new',
          this.columnToSorted = 'SFAOfficeID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'List', href: "/reports/staff", active: '' },
          { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
          { label: 'Primary Office List', active: '', href: 'active' },
        )

        break;

      case '/staff-opencards/sfm-office/secondary-office/view':
        this.personName = 'Secondary Office';
        this.master = 'staffSecondaryOffice';
        this.tableArray = 'staffSFAOffices',
          this.navigateTo = '/staff-opencards/sfm-office/secondary-office/detail',
          this.addLink = '/staff-opencards/sfm-office/secondary-office/new',
          this.columnToSorted = 'SFAOfficeID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'List', href: "/reports/staff", active: '' },
          { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
          { label: 'Secondary Office List', active: '', href: 'active' },
        )

        break;


      case '/sub-team-member/view':
        this.personName = 'Team Member';
        this.master = 'staffSubTeamMember';
        this.tableArray = 'staffTeamMembers',
          this.navigateTo = '/team-member/detail',
          this.addLink = '/team-member/new',
          this.columnToSorted = 'staffTeamLeaderID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'List', href: "/reports/staff", active: '' },
          { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
          { label: 'Team Member List', active: '', href: 'active' },
        )

        break;












    }
    if (this.referralTypeId === 15) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges('caseForm-BHOK', this.breadcrumbs)
    }
  }
  setAsqName(asqName) {
    switch (asqName) {

      case 'ASQ 2 Months':
        this.asqName = 'asq-two';
        this.isAsqFormed = true;
        break;
      case 'ASQ 6 Months':
        this.asqName = 'asq-six';
        this.isAsqFormed = true;
        break;
      case 'ASQ 12 Months':
        this.asqName = 'asq-twelve';
        this.isAsqFormed = true;
        break;
      case 'ASQ 18 Months':
        this.asqName = 'asq-eighteen';
        this.isAsqFormed = true;
        break;
      case 'ASQ 24 Months':
        this.asqName = 'asq-twentyFour';
        this.isAsqFormed = true;
        break;
      case 'ASQ 30 Months':
        this.asqName = 'asq-twirty';
        this.isAsqFormed = true;
        break;
      case 'ASQ 36 Months':
        this.asqName = 'asq-thirtySix';
        this.isAsqFormed = true;
        break;
      case 'ASQ 48 Months':
        this.asqName = 'asq-fourtyEight';
        this.isAsqFormed = true;
        break;
      case 'ASQ 60 Months':
        this.asqName = 'asq-sixty';
        this.isAsqFormed = true;
        break;

      case 'CAFAS':
        this.asqName = 'CAFAS';
        this.isAsqFormed = true;
        break;
      case 'PSI':
        this.asqName = 'PSI';
        this.isAsqFormed = true;
        break;

      default:
        this.isAsqFormed = false;

    }
  }

  displayListForProvider() {
    let currentURLCheck = this._router.url, currentURL: string;
    if (currentURLCheck.includes('?')) {
      currentURL = this._router.url.split('?')[0]
    } else {
      currentURL = this._router.url;
    }
    switch (currentURL) {
      case '/provider/opencard/In-home-family-members/pets/view':
        this.personName = 'Pets';
        this.master = 'providerPets';
        this.filter = 'providerPets';

        this.tableArray = 'providerLocationList';
        this.navigateTo = '/provider/opencard/In-home-family-members/pets/detail';
        this.addLink = '/provider/opencard/In-home-family-members/pets/new';
        this.columnToSorted = 'providerPetID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Demographics and supports', active: '', href: '/provider/dashboard/demographics-support' },
          { label: 'Pet List', active: 'active' }
        );
        break;
      case '/provider/opencard/location/view':
        this.personName = 'Locations';
        this.master = 'providerLocation';
        this.filter = 'providerLocation';

        this.tableArray = 'providerLocationList';
        this.navigateTo = '/provider/opencard/location/detail';
        this.addLink = '/provider/opencard/location/new';
        this.columnToSorted = 'ProviderLocationID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Demographics and supports', active: '', href: '/provider/dashboard/demographics-support' },
          { label: 'Location List', active: 'active' }
        );
        break;
      case '/provider/opencard/office/view':
        this.personName = 'Office';
        this.master = 'providerOffice';
        this.filter = 'providerOffice';

        this.tableArray = 'SFAOfficeActivity';
        this.navigateTo = '/provider/opencard/office/detail';
        this.addLink = '/provider/opencard/office/new';
        this.columnToSorted = 'sfaOfficeActivityID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Demographics and supports', active: '', href: '/provider/dashboard/demographics-support' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Office List', active: 'active' }
        );
        break;
      case '/provider/opencard/staff/view':
        this.personName = 'Staff';
        this.master = 'providerStaff';
        this.filter = 'providerStaff';

        this.tableArray = 'providerSFAStaffList';
        this.navigateTo = '/provider/opencard/staff/detail';
        this.addLink = '/provider/opencard/staff/new';
        this.columnToSorted = 'providerSFAStaffID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Demographics and supports', active: '', href: '/provider/dashboard/demographics-support' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Staff List', active: 'active' }
        );
        break;
      case '/provider/opencard/other-agency-staff/view':
        this.personName = 'Other Agency Staff';
        this.master = 'providerOtherAgencyStaff';
        this.filter = 'providerOtherAgencyStaff';

        this.tableArray = 'ProviderOtherAgencyStaffList';
        this.navigateTo = '/provider/opencard/other-agency-staff/detail';
        this.addLink = '/provider/opencard/other-agency-staff/new';
        this.columnToSorted = 'providerOtherAgencyStaffID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Demographics and supports', active: '', href: '/provider/dashboard/demographics-support' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Other Agency Staff List', active: 'active' }
        );
        break;

      case '/provider/opencard/license/view':
        this.personName = 'License';
        this.master = 'providerLicense';
        this.filter = 'providerLicense';

        this.tableArray = 'providerLicense';
        this.navigateTo = '/provider/opencard/license/detail';
        this.addLink = '/provider/opencard/license/new';
        this.columnToSorted = 'beginDate';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'License and sponsorship ', active: '', href: '/provider/dashboard/license-sponsorship' },
          { label: 'License List', active: 'active' }
        );
        break;

      case '/provider/opencard/license-exception/view':
        this.personName = 'License Exception';
        this.master = 'providerLicenseException';
        this.filter = 'providerLicenseException';

        this.tableArray = 'providerLicenseException';
        this.navigateTo = '/provider/opencard/license-exception/detail';
        this.addLink = '/provider/opencard/license-exception/new';
        this.columnToSorted = 'providerLicenseExceptionID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'License and sponsorship ', active: '', href: '/provider/dashboard/license-sponsorship' },
          { label: 'License Exception List', active: 'active' }
        );
        break;

      case '/provider/opencard/sponsor/view':
        this.personName = 'Sponsor';
        this.master = 'providerSponsor';
        this.filter = 'providerSponsor';

        this.tableArray = 'providerSponsor';
        this.navigateTo = '/provider/opencard/sponsor/detail';
        this.addLink = '/provider/opencard/sponsor/new';
        this.columnToSorted = 'providerSponsorID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'License and sponsorship ', active: '', href: '/provider/dashboard/license-sponsorship' },
          { label: 'Sponsor', active: 'active' }
        );
        break;
      case '/provider/opencard/family/contact/view':
        this.personName = 'Family Contact';
        this.master = 'familyContact';
        this.filter = 'familyContact';

        this.tableArray = 'providerContact';
        this.navigateTo = '/provider/opencard/family/contact/detail';
        this.addLink = '/provider/opencard/family/contact/new';
        this.columnToSorted = 'providerContactID';

        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Family Contact', active: 'active' }
        );
        break;

      case '/provider/opencard/status/view':
        this.personName = 'Provider Status';
        this.master = 'providerStatus';
        this.filter = 'providerStatus';
        this.tableArray = 'providerStatus';
        this.navigateTo = '/provider/opencard/status/detail';
        this.addLink = '/provider/opencard/status/new';
        this.columnToSorted = 'providerStatusID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Demographics and supports', active: '', href: '/provider/dashboard/demographics-support' },
          { label: 'Provider Status List', active: 'active' }
        );
        break;

      case '/provider/opencard/school/view':
        this.personName = 'Provider School';
        this.master = 'providerSchool';
        this.filter = 'providerSchool';

        this.tableArray = 'providerSchool';
        this.navigateTo = '/provider/opencard/school/detail';
        this.addLink = '/provider/opencard/school/new';
        this.columnToSorted = 'providerSchoolID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard/placement-matching' },
          { label: 'School List', active: 'active' }
        );
        break;

      case '/provider/opencard/provider-preferences/view':
        this.personName = 'Provider Preference';
        this.master = 'providerPreference';
        this.filter = 'providerPreference';

        this.tableArray = 'providerPreference';
        this.navigateTo = '/provider/opencard/provider-preferences/detail';
        this.addLink = '/provider/opencard/provider-preferences/new';
        this.columnToSorted = 'providerPreferenceID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard/placement-matching' },
          { label: 'Preference', active: 'active' }
        );
        break;
      case '/provider/opencard/training/view':
        this.personName = 'Provider Training';
        this.master = 'providerTraining';
        this.filter = 'providerTraining';

        this.tableArray = 'providerTraining';
        this.navigateTo = '/provider/opencard/training/detail';
        this.addLink = '/provider/opencard/training/new';
        this.columnToSorted = 'providerTrainingID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Training Dashboard', active: '', href: '/provider/dashboard/training' },
          { label: 'Training list', active: 'active' }
        );
        break;
      case '/accessrights/view-role':
        this.personName = 'Access Rights';
        this.master = 'rolesList';
        this.filter = 'rolesList';
        this.tableArray = 'rolesList';
        this.navigateTo = '/accessrights/details-role';
        this.addLink = '/accessrights/create-role';
        this.columnToSorted = 'roleID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case', href: '/reports/opencards/list/client/case', active: '' },
          { label: 'Service Claim', href: '/reintegration/referral/service', active: '' },
          { label: 'Form', active: 'active' },
        );
        break;
      case '/provider/opencard/adoption/view':
        this.personName = 'Provider Adoption';
        this.master = 'providerAdoption';
        this.filter = 'providerAdoption';

        this.tableArray = 'providerAdoption';
        this.navigateTo = '/provider/opencard/adoption/detail';
        this.addLink = '/provider/opencard/adoption/new';
        this.columnToSorted = 'providerAdoptionID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Provider Adoption', active: 'active' }
        );
        break;
      case '/provider/opencard/adoption/identifierResource/view':
        this.personName = 'Identified Resource';
        this.master = 'IdentifyResource';
        this.filter = 'IdentifyResource';
        this.tableArray = 'IdentifyResource',
          this.navigateTo = '/provider/opencard/adoption/IR/detail',
          this.addLink = '/provider/opencard/adoption/IR/new',
          this.columnToSorted = 'identifiedResourceID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Provider Adoption', active: '', href: '/provider/opencard/adoption/detail' },
          { label: 'Adoption SubNode', active: '', href: '/provider/dashboard/adoption/subnode' },
          { label: 'Identified Resource List', active: 'active' }
        );
        break;
      case '/provider/opencard/adoption/BIS/view':
        this.personName = 'BIS';
        this.master = 'BISByProvider';
        this.filter = 'BISByProvider';
        this.tableArray = 'BISByProvider',
          this.navigateTo = '/provider/opencard/adoption/BIS/detail',
          this.columnToSorted = 'BestInterestStaffingID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Provider Adoption', active: '', href: '/provider/opencard/adoption/detail' },
          { label: 'Adoption SubNode', active: '', href: '/provider/dashboard/adoption/subnode' },
          { label: 'BIS List', active: 'active' }
        );
        break;
      case '/provider/opencard/critical-incidents/view':
        this.personName = 'Critical Incident';
        this.master = 'ciritical-incident-provider';
        this.filter = 'kipp';

        this.tableArray = 'openCardList',
          this.navigateTo = '/provider/opencard/critical-incidents/detail',
          this.addLink = '/provider/opencard/critical-incidents/new',
          this.columnToSorted = 'UnusualIncidentID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'critical-incidents', active: '', href: '/provider/dashboard/critical-incidents' },
          {
            label: 'Critical Incident List', active: 'active',
            href: '/provider/opencard/critical-incidents/view'
          },
        );
        break;
      case '/provider/opencard/critical-incidents-rm/view':
        this.personName = 'Critical Significant RM';
        this.master = 'ciritical-incident-RM';
        this.filter = 'kipp';

        this.tableArray = 'openCardList',
          this.navigateTo = '/provider/opencard/critical-incidents-rm/detail',
          this.addLink = '/provider/opencard/critical-incidents-rm/new',
          this.columnToSorted = 'UnusualIncidentID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'critical-incidents', active: '', href: '/provider/dashboard/critical-incidents' },
          {
            label: 'Critical Significant RM', active: 'active',
            href: '/provider/opencard/critical-incidents-rm/view'
          },
        );
        break;
      case '/provider/opencard/critical-incidents-allinvolve/view':
        this.personName = 'Critical Significant All involve';
        this.master = 'ciritical-incident-allinvolve';
        this.filter = 'kipp';

        this.tableArray = 'openCardList',
          this.navigateTo = '/provider/opencard/critical-incidents-allinvolve/detail',
          this.addLink = '/provider/opencard/critical-incidents-allinvolve/new',
          this.columnToSorted = 'UnusualIncidentID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'critical-incidents', active: '', href: '/provider/dashboard/critical-incidents' },
          {
            label: 'Critical Significant All involved', active: 'active',
            href: '/provider/opencard/critical-incidents-allinvolve/view'
          },
        );
        break;

      case '/provider/opencard/fch-level-care/view':
        this.personName = 'FCH Level Care';
        this.master = 'providerFchLevel';

        this.tableArray = 'ProviderFCHLevelOfCareList';
        this.navigateTo = '/provider/opencard/fch-level-care/detail';
        this.addLink = '/provider/opencard/fch-level-care/detail';
        this.columnToSorted = 'providerFCHLevelOfCareID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Placement Matching', active: '', href: '/provider/dashboard/placement-matching' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'FCH Level Care List', active: 'active' }
        );
        break;

      case '/provider/opencard/provider-strength/view':
        this.personName = 'Provider Strengths';
        this.master = 'providerStrength';

        this.tableArray = 'ProviderStrength';
        this.navigateTo = '/provider/opencard/provider-strength/detail';
        this.addLink = '/provider/opencard/provider-strength/new';
        this.columnToSorted = 'providerStrengthID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Placement Matching', active: '', href: '/provider/dashboard/placement-matching' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Provider Strength List', active: 'active' }
        );
        break;

      case '/provider/opencard/unacceptable-conditions/view':
        this.personName = 'Unacceptable Conditions';
        this.master = 'providerUnacceptableConditions';

        this.tableArray = 'ProviderUnacceptableConditionList';
        this.navigateTo = '/provider/opencard/unacceptable-conditions/detail';
        this.addLink = '/provider/opencard/unacceptable-conditions/new';
        this.columnToSorted = 'providerUnacceptableConditionID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Placement Matching', active: '', href: '/provider/dashboard/placement-matching' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Unacceptable Conditions List', active: 'active' }
        );
        break;

      case '/provider/opencard/authorization-summary/view':
        this.personName = 'Authorization Summary';
        this.master = 'authorizationSummaryProvider';

        this.tableArray = 'authorization';
        this.navigateTo = '/provider/opencard/authorization-summary/detail';
        this.columnToSorted = 'beginDate';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Authorization Summary List', active: 'active' }
        );
        break;

      case '/provider/opencard/living-arrangement/view':
        this._localValues.placementProviderMode = 'providers';
        this.personName = 'Living Arrangement';
        this.master = 'livingArrangementProvider';

        this.tableArray = 'livingArrangementHistory';
        this.navigateTo = '/reintegration/referral/opencard/placement/living-arrangement/detail',
          this.columnToSorted = 'livingArrangementID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Placement and Payments', active: '', href: '/provider/dashboard/placements-payments' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'Living Arrangement List', active: 'active' }
        );
        break;
      case '/reintegration/referral/opencard/placement/daycare-authorization/view':
        this.personName = 'Daycare Authorizations';
        this.master = 'daycareAuthorizations';

        this.tableArray = 'dayCareAuthorization';
        this.navigateTo = '/reintegration/referral/opencard/placement/daycare-authorization/detail',
          this.addLink = '/reintegration/referral/opencard/placement/daycare-authorization/new',
          this.columnToSorted = 'authorizationID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/client', active: '' },
          { label: 'Form', href: '/reports/client/details', active: '' },
          { label: 'Case Form', href: '/reintegration/referral/detail', active: '' },
          { label: 'Placements List', active: '', href: '/reintegration/referral/opencard/placement/view' },
          { label: 'Placements', href: '/reintegration/referral/opencard/placement/detail' },
          { label: 'Daycare Authorizations List', active: 'active' }
        );
        break;




    }
  }

  displayPersonMasters() {
    let currentURLCheck = this._router.url, currentURL: string;
    if (currentURLCheck.includes('?')) {
      currentURL = this._router.url.split('?')[0]
    } else {
      currentURL = this._router.url;
    }
    switch (currentURL) {
      case '/reports/staff':
        this.personName = 'Staff';
        this.master = 'staff';
        this.filter = 'staff';
        this.tableArray = 'users';
        this.navigateTo = '/reports/staff/details';
        this.addLink = '/reports/staff/new';
        this.columnToSorted = 'StaffID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Staff', active: 'active' }
        );
        break;
      case '/reports/staff/caseList':
        this.personName = 'Staff-CaseList';
        this.master = 'staff-caseList';
        this.tableArray = 'caseList';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Staff', active: '', href: '/reports/staff' },
          { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
          { label: 'Staff - Cases', active: 'active' }
        );
        break;
      case '/reports/staff/staffProvider':
        this.personName = 'Staff-Provider';
        this.master = 'staff-provider';
        this.tableArray = 'providerList';
        this.navigateTo = '/reports/provider/detail';
        this.columnToSorted = 'providerID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Staff', active: '', href: '/reports/staff' },
          { label: 'Staff - Form', active: '', href: '/reports/staff/details' },
          { label: 'Staff - Provider', active: 'active' }
        );
        break;
      case '/reports/providerMember':
        this.personName = 'Provider Member';
        this.master = 'providerMember';
        this.filter = 'providerMember';
        this.tableArray = 'providerMember';
        this.navigateTo = '/reports/providerMember/details';
        // this.addLink = '/reports/providerMember/new';
        this.columnToSorted = 'providerMemberID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider Member', active: 'active' }
        );
        break;
      case '/reports/providerMember/details/provider':
        this.personName = 'Provider Members - Provider';
        this.master = 'providerMembersProviders';
        this.filter = 'providerMembersProviders';
        this.tableArray = 'providerList';
        this.navigateTo = '/reports/provider/detail';
        this.columnToSorted = 'ProviderID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'List', href: '/reports/providerMember', active: '' },
          { label: 'Form', href: '/reports/providerMember/details', active: '' },
          { label: 'Provider Members - Provider', active: 'active' }
        );
        break;

      case '/reports/otherAgencyStaff/details/providers':
        this.personName = 'Other agency staff - Providers';
        this.master = 'otherAgencyStaffproviders';
        this.filter = 'otherAgencyStaffproviders';
        this.tableArray = 'providerList';
        this.navigateTo = '/reports/provider/detail';
        this.columnToSorted = 'providerID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'List', href: '/reports/otherAgencyStaff', active: '' },
          { label: 'Form', href: '/reports/otherAgencyStaff/details', active: '' },
          { label: 'Other agency staff - Providers', active: 'active' }
        );
        break;

      case '/reports/payor/detail/cases':
        this.personName = 'Payor - Cases';
        this.master = 'payorCases';
        this.filter = 'payorCases';
        this.tableArray = 'caseList';
        this.columnToSorted = 'payorID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'List', href: '/reports/payor/view', active: '' },
          { label: 'Form', href: '/reports/payor/detail', active: '' },
          { label: 'Payor - Cases', active: 'active' }
        );
        break;

      case '/reports/payor/detail/placement-authorization':
        this.personName = 'Payor - Placement Authorizations';
        this.master = 'payorAuthorizations';
        this.filter = 'payorAuthorizations';
        this.tableArray = 'payorAuthorization';
        this.columnToSorted = 'authorizationID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'List', href: '/reports/payor/view', active: '' },
          { label: 'Form', href: '/reports/payor/detail', active: '' },
          { label: 'Payor - Placement Authorizations', active: 'active' }
        );
        break;

      case '/reports/dhsOffice/view':
        this.personName = 'DHS Office';
        this.master = 'personTypeDhsOffice';
        this.tableArray = 'dhsOfficeList',
          this.navigateTo = '/reports/dhsOffice/detail',
          this.addLink = '/reports/dhsOffice/new',
          this.columnToSorted = 'dhsOfficeID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'DHS Office List', href: "/reports/school", active: 'active' }
        );
        break;

      case '/reports/dhsOffice/dhs-staff':
        this.personName = 'DHS Staff';
        this.master = 'personTypeDhsOfficeStaff';
        this.tableArray = 'dhsStaffList',
          this.navigateTo = '/reports/dhsOffice/dhs-staff/opencard',
          this.addLink = '/reports/dhsOffice/dhs-staff',
          this.columnToSorted = 'dhsStaffID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'DHS Office List', href: "/reports/dhsOffice/view", active: '' },
          { label: 'DHS Staff List', href: "/reports/dhsOffice/view", active: 'active' },
        );
        break;

      case '/reports/dhsOffice/dhs-staff/cases':
        this.personName = 'Cases';
        this.master = 'personTypeDhsOfficeCases';
        this.tableArray = 'caseList',
          this.navigateTo = '/reports/dhsOffice/dhs-staff/cases',
          this.addLink = '/reports/dhsOffice/dhs-staff/cases',
          this.columnToSorted = 'clientID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: "/reports/person/types", active: '' },
          { label: 'DHS Office List', href: "/reports/dhsOffice/view", active: '' },
          { label: 'DHS Staff List', href: "/reports/dhsOffice/dhs-staff", active: '' },
          { label: 'Cases', href: "/reports/dhsOffice/view", active: 'active' },
        );
        break;

      case '/reports/dhsStaff/details/cases':
        this.personName = 'DHS Staff - Cases';
        this.master = 'dhsStaffCases';
        this.filter = 'dhsStaffCases';
        this.tableArray = 'caseList';
        this.columnToSorted = 'clientID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'List', href: '/reports/dhsStaff', active: '' },
          { label: 'Form', href: '/reports/dhsStaff/details', active: '' },
          { label: 'DHS Staff - Cases', active: 'active' }
        );
        break;
      case '/reports/dhsStaff/details/dhs-office':
        this.personName = 'DHS Staff - Office';
        this.master = 'dhsStaffOffice';
        this.filter = 'dhsStaffOffice';
        this.tableArray = 'dhsOfficeList';
        this.columnToSorted = 'dhsOfficeID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'List', href: '/reports/dhsStaff', active: '' },
          { label: 'Form', href: '/reports/dhsStaff/details', active: '' },
          { label: 'DHS Staff - Office', active: 'active' }
        );
        break;

      case '/reports/dcf/details/counties':
        this.personName = 'DHS Staff - Counties';
        this.master = 'dhsStaffCounties';
        this.filter = 'dhsStaffCounties';
        this.tableArray = 'dhsStaffCountyList';
        this.navigateTo = '/reports/dcf/details/counties/detail',
          this.addLink = '/reports/dcf/details/counties/new',
          this.columnToSorted = 'CountyID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'List', href: '/reports/dcf', active: '' },
          { label: 'Form', href: '/reports/dcf/details', active: '' },
          { label: 'DHS Staff - Counties', active: 'active' });
        break;


      case '/reports/dcf/cases':
        this.personName = 'DCF Staff - Cases';
        this.master = 'dcfStaffCases';
        this.tableArray = 'satffcaseList';
        this.columnToSorted = 'personID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'List', href: '/reports/dcf', active: '' },
          { label: 'Form', href: '/reports/dcf/details', active: '' },
          { label: 'DCF Staff - Cases', active: 'active' }
        );
        break;

      case '/reports/dcf/office':
        this.personName = 'DCF Staff - Office';
        this.master = 'dcfStaffOffice';
        this.tableArray = 'SRSOffice';
        this.columnToSorted = 'srsOfficeID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'List', href: '/reports/dcf', active: '' },
          { label: 'Form', href: '/reports/dcf/details', active: '' },
          { label: 'DCF Staff - Office', active: 'active' }
        );
        break;
      case '/reports/all/authorizations':
        this.personName = 'Authorizations-All';
        this.master = 'authorizations-all';
        this.tableArray = 'authorization';
        this.columnToSorted = 'authorizationID';
        this.navigateTo = '/reintegration/referral/placement-event-authorizations/detail',
          this.breadcrumbs.push(
            { label: 'Cards', href: '/reports/client-view/cards', active: '' },
            { label: 'Case', active: 'active' }
          );
        break;

      case '/provider_Authorization':
        this.personName = 'Provider Authorizations';
        this.master = 'provider-authorizations';
        this.tableArray = 'authorization';
        this.columnToSorted = 'authorizationID';
        this.navigateTo = '/reintegration/provider_AuthDetail',
          this.breadcrumbs.push(
            { label: 'Cards', href: '/reports/client-view/cards', active: '' },
            { label: 'Provider Authorization', active: 'active' }
          );
        break;
      case '/csClaimProvider':
        this.personName = 'Claim Provider';
        this.master = 'claim-provider';
        this.tableArray = 'claim';
        this.columnToSorted = 'authorizationID';
        this.navigateTo = '/provider/claimProvider_claimList',
          this.breadcrumbs.push(
            { label: 'Cards', href: '/reports/client-view/cards', active: '' },
            { label: 'Claim Provider', active: 'active' }
          );
        break;
      case '/payee_Authorization':
        this.personName = 'Payee Authorizations';
        this.master = 'payee-authorizations';
        this.tableArray = 'authorization';
        this.columnToSorted = 'authorizationID';
        this.navigateTo = '/reintegration/provider_AuthDetail',
          this.breadcrumbs.push(
            { label: 'Cards', href: '/reports/client-view/cards', active: '' },
            { label: 'Payee Authorization', active: 'active' }
          );
        break;

      case '/provider/opencard/In-home-family-members/adults/view':
        this.personName = 'Adults';
        this.master = 'provider-adults';
        this.tableArray = 'ProviderMember';
        this.columnToSorted = 'providerMemberID';
        // this.navigateTo = '/reports/providerMember/details',
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'In-home Family Members', active: '', href: '/provider/opencard/In-home-family-members/dashboard' },
          { label: 'Adults', active: 'active' }
        );
        break;

      case '/provider/opencard/In-home-family-members/children/view':
        this.personName = 'Children';
        this.master = 'provider-child';
        this.tableArray = 'ProviderMember';
        this.columnToSorted = 'providerMemberID';
        // this.navigateTo = '/reports/providerMember/details',
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Provider List', href: '/reports/provider/view', active: '' },
          { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
          { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
          { label: 'In-home Family Members', active: '', href: '/provider/opencard/In-home-family-members/dashboard' },
          { label: 'Children', active: 'active' }
        );
        break;
      case '/reports/court/service/officer/details/cases':
        this.personName = 'Cases';
        this.master = 'courtServiceOfficerCases';
        this.tableArray = 'caseList';
        this.columnToSorted = 'personID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/court/service/officer', active: '' },
          { label: 'Form', href: '/reports/court/service/officer/details', active: '' },
          { label: 'Cases', active: 'active' },

        );
        break;
      case '/reports/csoStaff/details/cases':
        this.personName = 'Cases';
        this.master = 'csoStaffCases';
        this.tableArray = 'caseList';
        this.columnToSorted = 'personID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/court/service/officer', active: '' },
          { label: 'Form', href: '/reports/csoStaff/details', active: '' },
          { label: 'Cases', active: 'active' }
        );
        break;
      case '/reports/dhhsStaff/details/cases':
        this.personName = 'Cases';
        this.master = 'dhhsStaffCases';
        this.tableArray = 'caseList';
        this.columnToSorted = 'personID';
        this.breadcrumbs.push(
          { label: 'List', href: '/reports/dhhsStaff', active: '' },
          { label: 'Form', href: '/reports/dhhsStaff/details', active: '' },
          { label: 'Cases', active: 'active' }
        );
        break;

      case '/prtf/medical_assessment/view':
        this.personName = 'Medical Assessment';
        this.master = 'medical_assesment';
        this.tableArray = 'medicalAssessment';
        this.columnToSorted = 'medicalAssessmentsID';
        this.addLink = '/prtf/medical_assessment/new';
        this.navigateTo = '/prtf/medical_assessment/formView',
          this.breadcrumbs.push(
            { label: "List", href: "/reports/client", active: "" },
            { label: "Form", href: "/reports/client/details", active: "" },
            {
              label: "Case List",
              href: "/reports/opencards/list/client/case",
              active: ""
            },
            { label: "Case Form", active: "", href: "/reports/referral/family-preservation/detail" },
            { label: "Medical Assessment", active: "active", }
          );;
        break;

      case '/payee/auth_list':
        this.personName = 'Payee - Authorizations Summary';
        this.master = 'PayeeAuthorizationsSummary';
        this.tableArray = 'payeeAuthorization';
        this.columnToSorted = 'authorizationID';
        // this.navigateTo = '/reintegration/referral/placement-event-authorizations/detail',
        this.navigateTo = '/reintegration/payee/Auth-detail'
        this.breadcrumbs.push(
          { label: "Payee List", href: "/reports/payee/view", active: "" },
          { label: "Payee Form", href: "/reports/payee/detail", active: "" },
          { label: "Payee - Authorizations Summary", href: "", active: "active" },
        );
        break;

      case '/payee/serviceClaim_hardgoods/auth_list':
        this.personName = 'Payee - Service Claim - Hard Goods(Authorizations)';
        this.master = 'PayeeServiceClaimHardGoods';
        this.tableArray = 'claimsAuthorization';
        this.columnToSorted = 'authorizationID';
        this.navigateTo = '/reintegration/payee/serviceClaim_hardgoods/Auth-detail';
        this.breadcrumbs.push(
          { label: "Payee List", href: "/reports/payee/view", active: "" },
          { label: "Payee Form", href: "/reports/payee/detail", active: "" },
          { label: "Payee - Service Claim - Hard Goods", href: "", active: "active" },
        );
        break;

      case '/payee/serviceClaim_otherService/auth_list':
        this.personName = 'Payee - Service Claim - Other Service(Authorizations)';
        this.master = 'PayeeServiceClaimOtherService';
        this.tableArray = 'claimsAuthorization';
        this.columnToSorted = 'authorizationID';
        this.navigateTo = '/reintegration/payee/serviceClaim_otherService/Auth-detail';
        this.breadcrumbs.push(
          { label: "Payee List", href: "/reports/payee/view", active: "" },
          { label: "Payee Form", href: "/reports/payee/detail", active: "" },
          { label: "Payee - Service Claim - Other Service", href: "", active: "active" },
        );
        break;

      case '/provider/opencard/recuritment-referral/view':
        this.personName = 'Recruitment-Referral',
          this.master = 'recruitment-referral',
          this.tableArray = 'recruitmentReferrals',
          this.navigateTo = '/provider/opencard/recruitment/detail',
          this.addLink = '/provider/opencard/recuritment-referral/view',
          this.columnToSorted = 'CMSPDFDocID',
          this.breadcrumbs.push(
            { label: 'Person Types', href: '/reports/person/types', active: '' },
            { label: 'Provider List', href: '/reports/provider/view', active: '' },
            { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
            { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
            { label: 'Recruitment', active: '', href: '/provider/opencard/recruitment/detail' },
            { label: 'Referral-List', active: 'active' },
          );
        break;

      case '/csClientList':
        this.personName = 'CS - Client';
        this.master = 'cs-client';
        this.tableArray = 'childList';
        this.navigateTo = '/csClient/csClientProfile';
        this.columnToSorted = 'ClientID';
        break;

      case '/csProviderList':
        this.personName = 'CS - Provider';
        this.master = 'cs-provider';
        this.tableArray = 'provider';
        this.navigateTo = '/csProvider/csProviderForm';
        this.columnToSorted = 'ProviderID';
        break;

      case '/provider/opencard/placement-history/view':
        this.personName = 'Placement History';
        this.master = 'placementHistory';
        this.tableArray = 'placementHistoryList';
        this.columnToSorted = 'placementDetailID';
        // this.addLink = '/prtf/medical_assessment/new';
        this.navigateTo = '/provider/opencard/placement-history/detail',
          this.breadcrumbs.push(
            { label: 'Person Types', href: '/reports/person/types', active: '' },
            { label: 'Provider List', href: '/reports/provider/view', active: '' },
            { label: 'Provider Form', href: '/reports/provider/detail', active: '' },
            { label: 'Provider Opencards', active: '', href: '/provider/dashboard' },
            { label: 'Placement Payments', active: '', href: '/provider/dashboard/placements-payments' },
            { label: 'List', active: 'active' }
          );
        break;
      case '/reports/kansas/view':
        this.personName = 'Kansas';
        this.master = 'kansas';
        this.tableArray = 'procodeList';
        this.columnToSorted = 'Procode';
        break;
      case '/reports/nebraska/view':
        this.personName = 'Nebraska';
        this.master = 'nebraska';
        this.tableArray = 'procodeList';
        this.columnToSorted = 'Procode';
        break;
      case '/reports/oklahoma/view':
        this.personName = 'Oklahoma';
        this.master = 'oklahoma';
        this.tableArray = 'procodeList';
        this.columnToSorted = 'Procode';
        break;
      case '/reports/evaluation-type/view':
        this.personName = 'Evaluation Type';
        this.master = 'evaluationType';
        this.tableArray = 'evaluationTypelist';
        this.navigateTo = '/reports/evaluation-type/detail';
        this.addLink = '/reports/evaluation-type/new';
        this.columnToSorted = 'evaluationTypeID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Evaluation Type List', href: '/reports/evaluation-type/view', active: 'active' }
        );
        break;
      case '/reports/evaluation-creation/view':
        this.personName = 'Evaluation Creation';
        this.master = 'evaluationCreation';
        this.tableArray = 'evaluationCreationlist';
        this.navigateTo = '/reports/evaluation-creation/detail';
        this.addLink = '/reports/evaluation-creation/new';
        this.columnToSorted = 'evaluationCreationID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Evaluation Creation List', href: '/reports/evaluation-Creation/view', active: 'active' }
        );
        break;
      case '/reports/evaluation-scale/view':
        this.personName = 'Evaluation Scale';
        this.master = 'evaluationScale';
        this.tableArray = 'scaleList';
        this.navigateTo = '/reports/evaluation-scale/detail';
        this.addLink = '/reports/evaluation-scale/new';
        this.columnToSorted = 'scaleID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Evaluation Scale List', href: '/reports/evaluation-scale/view', active: 'active' }
        );
        break;
      case '/reports/version-creation/view':
        this.personName = 'Version Creation';
        this.master = 'versionCreation';
        this.tableArray = 'evaluationVersionList';
        this.navigateTo = '/reports/version-creation/detail';
        this.addLink = '/reports/version-creation/new';
        this.columnToSorted = 'evaluationVersionID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Version Creation List', href: '/reports/version-creation/view', active: 'active' }
        );
        break;
      case '/reports/question-creation/view':
        this.personName = 'Question Creation';
        this.master = 'questionGroupCreation';
        this.tableArray = 'questionList';
        this.navigateTo = '/reports/question-creation/detail';
        this.addLink = '/reports/question-creation/new';
        this.columnToSorted = 'questionID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Question Creation List', href: '/reports/question-creation/view', active: 'active' }
        );
        break;
      case '/reports/question-group-creation/view':
        this.personName = 'Question Group Creation';
        this.master = 'questionGroupCreation';
        this.tableArray = 'questionList';
        this.navigateTo = '/reports/question-group-creation/detail';
        this.addLink = '/reports/question-group-creation/new';
        this.columnToSorted = 'questionID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Question Group Creation List', href: '/reports/question-group-creation/view', active: 'active' }
        );
        break;
      case '/reports/set-evaluation-allowed-group/view':
        this.personName = 'Evaluation Allowed Group';
        this.master = 'evaluationAllowedGroup';
        this.tableArray = 'evaluationAllowedGroupList';
        this.navigateTo = '/reports/set-evaluation-allowed-group/detail';
        this.addLink = '/reports/set-evaluation-allowed-group/new';
        this.columnToSorted = 'evaluationAllowedGroupID';
        this.breadcrumbs.push(
          { label: 'Person Types', href: '/reports/person/types', active: '' },
          { label: 'Set Evaluation Allowed Group List', href: '/reports/set-evaluation-allowed-group/view', active: 'active' }
        );
        break;
    }
  }
}
