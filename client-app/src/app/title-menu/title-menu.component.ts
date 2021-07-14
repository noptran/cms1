import { Component, OnInit, ViewChild } from "@angular/core";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { CaseTeamService } from "../case-team/case-team.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalValues } from "../local-values";
import { MedicalAssessmentFormComponent } from "../medical-assessment-form/medical-assessment-form.component";
import { ManualAttachmentDoc } from "../cms-attachment-form/manual-attachment-doc-types";
import { StaffFamilyChangeComponent } from "../Shared/Components/Family change/family-change.component";

@Component({
  selector: "app-title-menu",
  inputs: ["menuItems"],
  templateUrl: "./title-menu.component.html",
  styleUrls: ["./title-menu.component.scss"],
})
export class TitleMenuComponent implements OnInit {
  @ViewChild(MedicalAssessmentFormComponent, { static: false })
  medical_component: MedicalAssessmentFormComponent;
  personType = false;
  personTypeClient: string;
  batchProcess = false;
  opencards = false;
  referralFamily = false;
  isBreadcrumbs = false;
  serviceClaims = false;
  breadcrumbs = [];
  rfcFamily = false;
  personTypesMenuItems = [];
  batchProcessMenuItems = [];
  opencardsMenuItems = [];
  referralFamilyMenuItems = [];
  referralRFCMenuItems = [];
  serviceClaimMenuItems = [];
  rfcAdoption = false;
  rfcAdoptionMenuItems = [];
  rfcSchool = false;
  rfcSchoolMenuItems = [];
  providerMenu = false;
  providerMenuItems = [];
  inHomeFamilyMembersList = [];
  inHomeFamilyMembers = false;
  moveandpermenancyList = [];
  isMoveAndPermenancy = false;
  isRfcMedicalMenu = false;
  rfcMedicalItems = [];
  isCourtOrderAttachmentMenu = false;
  courtOrderAttachmentItems = [];
  isInfoBox = true;
  isProfileView = false;

  isProviderDemoGraphicsSupport = false;
  isLicenseSponsorShip = false;
  isTraining = false;
  isPlacementMatching = false;
  isPlacementsPayments = false;
  isCriticalIncidents = false;
  isFamilyPaperWorkOnPlacements = false;
  isAdoption = false;
  isRecruitment = false;
  providerDemoGraphicsSupport = [];
  licenseSponsorShip = [];
  providerTraining = [];
  placementMatching = [];
  placementsPayments = [];
  criticalIncidents = [];
  familyPaperWorkOnPlacements = [];
  adoption = [];
  recruitment = [];
  isadoptionSubnode = false;
  adoptionSubnode = [];
  referralTypeId: any;
  casaOfficerSubnode = [];
  casaOfficer = false;
  communityMemberSubnode = [];
  communityMember = false;
  dhsOffice = false;
  dhsOfficesSubnode = [];
  providerSponsorClaims = false;
  providerSponsorclaimsSubnode = [];
  personTypeFamilyMemberHousehold = false;
  personTypeFamilyMemberHouseholdSubnode = [];
  personTypeFamilyMemberExtended = false;
  personTypeFamilyMemberExtendedSubnode = [];
  bhokMedicalItems = [];
  isBhokMedicalItems = false;
  isJJFCMedicalItems = false;
  jjfcMedicalItems = [];
  isNCFCHMedicalItems = false;
  ncfchMedicalItems = [];
  referralPrtfFamily = false;
  prtf_referralFamilyMenuItems = [];
  prtfMedicalItems = [];
  isPrtfMedicalMenu = false;
  recruitmentTrainingItems = [];
  isRecruitmentTrainingMenu = false;
  currentPersonType: string;
  currentPrimaryValue: Number;

  isProviderAttachments = false;
  scannedDocumentList: any;
  uploadDocTypes = new ManualAttachmentDoc(
    this._openCards,
    this._localValues,
    this._router,
    this._activateRoute
  );
  isCreateAttachmentOpened = false;
  documentPrimaryValue: any;
  selectedAttachDocumetId: number;
  isDeleteProviderConfirmation = false;

  isComplianceMenu = false;
  complianceTechItems = [];
  isStaffSfmOfficeMenu = false;
  staffSfmOfficeItems = [];

  @ViewChild(StaffFamilyChangeComponent, { static: false })
  familyChangeComponent: StaffFamilyChangeComponent;

  isDeleteConfirmationDisable: any;

  constructor(
    public _person: CaseTeamService,
    public _router: Router,
    public _openCards: OpencardsService,
    public _localValues: LocalValues,
    public _activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.assignPersonMasters();
    this.referralTypeId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._openCards.getHasKey();

    if (this._router.url === "/prtf/medical") {
      this.referralFamily = false;
      this.referralPrtfFamily = true;
      this.prtf_referralFamilyMenuItems = [
        { name: "Medical Assesment" },
        { name: "Treatment Services" },
        { name: "Medical Condetion" },
      ];
    }

    switch (this.referralTypeId) {
      case 2:
        this.referralFamilyMenuItems.push(
          {
            name: "Head-Of-Household",
            add: "/reports/referral/family-preservation/head-of-household/new",
            view: "/reports/referral/family-preservation/head-of-household/view",
          },
          {
            name: "Extended Family",
            add: "/reports/extended-family/new",
            view: "/reports/extended-family/view",
          },
          {
            name: "Family Safety",
            add: "",
            view: "/reports/family-safety/view",
          },
          {
            name: "FIS Members",
            add: "/reports/referral/family-preservation/fis-members/new",
            view: "/reports/referral/family-preservation/fis-members/view",
          }
        );
        break;
      case 4:
        if (this._router.url === "/prtf/medical") {
          this.referralFamily = false;
          this.referralPrtfFamily = true;
          this.prtf_referralFamilyMenuItems = [
            { name: "Medical Assesment" },
            { name: "Treatment Services" },
          ];
        } else {
          this.referralFamilyMenuItems.push(
            {
              name: "Extended Family",
              add: "/reports/extended-family/new",
              view: "/reports/extended-family/view",
            },
            {
              name: "Siblings In Out-Of-Home",
              add: "",
              view: "/reports/siblings-in-out-home/view",
            }
          );
          break;
        }

      case 9:
        this.referralFamilyMenuItems.push(
          {
            name: "Extended Family",
            add: "/reports/extended-family/new",
            view: "/reports/extended-family/view",
          },
          {
            name: "Siblings In Out-Of-Home",
            add: "",
            view: "/reports/siblings-in-out-home/view",
          },
          {
            name: "Participants in Therapy",
            add: "",
            view: "/reports/participants-therpy/view",
          }
        );
        break;
      case 1:
      case 4:
        if (this._router.url === "/prtf/medical") {
          this.referralFamily = false;
          this.referralPrtfFamily = true;
          this.prtf_referralFamilyMenuItems = [
            { name: "Medical Assesment" },
            { name: "Treatment Services" },
            { name: "Medical Condetion" },
          ];
        } else {
          this.referralFamilyMenuItems.push(
            {
              name: "Extended Family",
              add: "/reports/extended-family/new",
              view: "/reports/extended-family/view",
            },
            {
              name: "Siblings In Out-Of-Home",
              add: "",
              view: "/reports/siblings-in-out-home/view",
            }
          );
        }
        break;
      case 15:
        this.referralFamilyMenuItems.push(
          {
            name: "Head-Of-Household",
            add: "/reports/referral/family-preservation/head-of-household/new",
            view: "/reports/referral/family-preservation/head-of-household/view",
          },
          {
            name: "Extended Family",
            add: "/reports/extended-family/new",
            view: "/reports/extended-family/view",
          },
          {
            name: "Family Safety",
            add: "",
            view: "/reports/family-safety/view",
          },
          {
            name: "FIS Members",
            add: "/reports/referral/family-preservation/fis-members/new",
            view: "/reports/referral/family-preservation/fis-members/view",
          }
        );
        break;
      case 17:
        this.referralFamilyMenuItems.push({
          name: "Extended Family",
          add: "/reports/extended-family/new",
          view: "/reports/extended-family/view",
        });
        break;
      case 11:
      case 14:
        if (this._router.url === "/prtf/medical") {
          this.referralPrtfFamily = true;
          this.prtf_referralFamilyMenuItems = [
            { name: "Medical Assesment" },
            { name: "Treatment Services" },
            { name: "Medical Condetion" },
          ];
        } else {
          this.referralFamilyMenuItems.push(
            {
              name: "Extended Family",
              add: "/reports/extended-family/new",
              view: "/reports/extended-family/view",
            },
            {
              name: "Siblings In Out-Of-Home",
              add: "",
              view: "/reports/siblings-in-out-home/view",
            }
          );
        }
        break;
      case 5:
        this.referralFamilyMenuItems.push(
          {
            name: "Head-Of-Household",
            add: "/reports/referral/family-preservation/head-of-household/new",
            view: "/reports/referral/family-preservation/head-of-household/view",
          },
          {
            name: "Extended Family",
            add: "/reports/extended-family/new",
            view: "/reports/extended-family/view",
          },
          {
            name: "Siblings In Out-Of-Home",
            add: "",
            view: "/reports/siblings-in-out-home/view",
          },
          {
            name: "FIS Members",
            add: "/reports/referral/family-preservation/fis-members/new",
            view: "/reports/referral/family-preservation/fis-members/view",
          }
        );
        break;
    }

    console.log(
      "this.referralFamilyMenuItems is",
      this.referralFamilyMenuItems
    );

    let incomeData = [];
    this.personTypesMenuItems.push(
      { name: "Client", add: "/reports/client/new", view: "/reports/client" },
      { name: "Staff", add: "/reports/staff/new", view: "/reports/staff" },
      {
        name: "DHHS Staff",
        add: "/reports/dhhsStaff/new",
        view: "/reports/dhhsStaff",
      },
      {
        name: "DHS Staff",
        add: "/reports/dhsStaff/new",
        view: "/reports/dhsStaff",
      },
      {
        name: "CSO Staff",
        add: "/reports/csoStaff/new",
        view: "/reports/csoStaff",
      },
      {
        name: "CASA Officer",
        add: "/reports/casaOfficer/new",
        view: "/reports/casaOfficer",
      },
      { name: "Judge", add: "/reports/judge/new", view: "/reports/judge" },
      {
        name: "Provider Member",
        add: "/reports/providerMember/new",
        view: "/reports/providerMember",
      },
      {
        name: "Community Member",
        add: "/reports/communityMember/new",
        view: "/reports/communityMember",
      },
      {
        name: "Other Agency Staff",
        add: "/reports/otherAgencyStaff/new",
        view: "/reports/otherAgencyStaff",
      },
      {
        name: "CRB Co-ordinator",
        add: "/reports/crbOfficer/new",
        view: "/reports/crbOfficer",
      },
      {
        name: "Family Member",
        add: "/reports/familyMember/new",
        view: "/reports/familyMember",
      },
      {
        name: "Guardian Ad Litem",
        add: "/reports/guardianAdl/new",
        view: "/reports/guardianAdl",
      },
      {
        name: "Customer Care Person",
        add: "/reports/customerCare/new",
        view: "/reports/customerCare",
      },
      { name: "DCF Staff", add: "/reports/dcf/new", view: "/reports/dcf" },
      {
        name: "Court Service Officer",
        add: "/reports/court/service/officer/new",
        view: "/reports/court/service/officer",
      },
      //Need to discuss below menu
      { name: "Payor", add: "/reports/payor/new", view: "/reports/payor/view" },
      { name: "Payee", add: "/reports/payee/new", view: "/reports/payee/view" },
      { name: "Provider", add: "/provider", view: "/reports/provider/view" },
      {
        name: "Provider Sponsor",
        add: "/reports/provider-sponser/view",
        view: "/reports/provider-sponser/view",
      },
      {
        name: "School",
        add: "/reports/school/new",
        view: "/reports/school/view",
      },
      {
        name: "DHS Office",
        add: "/reports/dhsOffice/new",
        view: "/reports/dhsOffice/view",
      }
      // { name: 'A Recruitment Training', add: '/recruitment-training/view', view: '/recruitment-training/view' },
      // { name: 'A Licensing', add: '/licensing-recruitment/view', view: '/licensing-recruitment/view' },
    );
    this.personTypesMenuItems.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    this.batchProcessMenuItems.push(
      {
        name: "Foster Care – Kansas",
        status: "/batch-status/kansas",
        view: "/batch-process-form/FC-Kansas",
      },
      {
        name: "Foster Care – Nebraska",
        status: "/batch-status/nebraska",
        view: "/batch-process-form/FC-Nebraska",
      },
      {
        name: "Foster Care – Oklahoma",
        status: "/batch-status/oklahoma",
        view: "/batch-process-form/FC-Oklahoma",
      },
      {
        name: "Other Agency",
        status: "/batch-status/other-services",
        view: "/batch-process-form/FC-Other-Services",
      }
    );

    this.opencardsMenuItems.push(
      { name: "Allergies", add: "", view: "client/allergies" },
      { name: "Attached Documents", add: "", view: "client/documents" },
      { name: "Case", add: "", view: "client/case" },
      { name: "Customer Care", add: "", view: "client/customer-care" },
      // { name: 'Incident', add: '', view: 'client/critical-significant-unusual-incident' },
      // { name: 'Incident- RM Only', add: '', view: 'client/critical-significant-unusual-incident-RM' },
      { name: "Liability", add: "", view: "client/third-party-liabilites" },
      { name: "Medications", add: "", view: "client/medication" },
      { name: "Strengths", add: "", view: "client/strength" }
    );

    this.opencardsMenuItems.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    this.referralFamilyMenuItems.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    this.referralRFCMenuItems.push({
      name: "Extended Family",
      add: "/reintegration/referral/opencard/extended-family/new",
      view: "/reintegration/referral/opencard/extended-family/view",
    });
    this.referralRFCMenuItems.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    this.serviceClaimMenuItems.push(
      { name: "Direct Authorization", view: "/claims/list/direct/auth/list" },
      { name: "Other Services", view: "/claims/list/other/service/list" },
      { name: "Hard goods", view: "/claims/list/hardgoods/list" }
    );
    this.serviceClaimMenuItems.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    if (this.referralTypeId === 4) {
      this.rfcAdoptionMenuItems.push({
        name: "Identified Resource",
        view: "/reintegration/referral/opencard/identified-resource/view",
      });
    } else {
      this.rfcAdoptionMenuItems.push(
        {
          name: "Adoption Event",
          view: "/reintegration/referral/opencard/adoption-event/view",
        },
        {
          name: "Best Interest Staffing",
          view: "/reintegration/referral/opencard/bis/view",
        },
        {
          name: "Identified Resource",
          view: "/reintegration/referral/opencard/identified-resource/view",
        }
      );
    }

    this.rfcAdoptionMenuItems.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    if (this.referralTypeId === 17) {
      this.rfcSchoolMenuItems.push(
        {
          name: "Grade Level",
          view: "/reintegration/referral/opencard/grade-level/view",
        },
        {
          name: "School Release",
          view: "/reintegration/referral/opencard/school-release/view",
        }
      );
    } else if (this.referralTypeId === 11 || this.referralTypeId === 14) {
      this.rfcSchoolMenuItems.push(
        {
          name: "Attending School",
          view: "/reintegration/referral/opencard/attending-school/view",
        },
        {
          name: "Home School",
          view: "/reintegration/referral/opencard/home-school/view",
        }
      );
    } else {
      this.rfcSchoolMenuItems.push(
        {
          name: "Credit Tracking",
          view: "/reintegration/referral/opencard/school/credit-tracking/view",
        },
        {
          name: "Educational Enrollment",
          view: "/reintegration/referral/opencard/school/eeispf/view",
        },
        {
          name: "General Education",
          view: "/reintegration/referral/opencard/school/general-education/view",
        },
        {
          name: "Special Education",
          view: "/reintegration/referral/opencard/school/special-education/view",
        },
        {
          name: "Attending School",
          view: "/reintegration/referral/opencard/attending-school/view",
        },
        {
          name: "Grade Level",
          view: "/reintegration/referral/opencard/grade-level/view",
        },
        {
          name: "School Release",
          view: "/reintegration/referral/opencard/school-release/view",
        },
        {
          name: "Home School",
          view: "/reintegration/referral/opencard/home-school/view",
        },
        {
          name: "Education Information",
          view: "/schoolIEPLists",
        }
      );
    }
    this.rfcAdoptionMenuItems.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    this.providerMenuItems.push(
      {
        name: "Demographics and Support",
        view: "/provider/dashboard/demographics-support",
      },
      {
        name: "License and Sponsorship",
        view: "/provider/dashboard/license-sponsorship",
      },
      { name: "Training", view: "/provider/dashboard/training" },
      {
        name: "Placement Matching",
        view: "/provider/dashboard/placement-matching",
      },
      {
        name: "Placements and Payments",
        view: "/provider/dashboard/placements-payments",
      },
      {
        name: "Family Contacts",
        view: "/provider/opencard/family/contact/view",
      },
      // { name: 'Critical Incidents', view: '/provider/dashboard/critical-incidents' },
      {
        name: "Family Paperwork on Placements",
        view: "/provider/dashboard/family-paperwork-on-placements",
      },
      { name: "Adoption", view: "/provider/opencard/adoption/view" },
      { name: "Recruitment ", view: "/provider/opencard/recruitment/view" }
    );
    this.providerMenuItems.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    this.inHomeFamilyMembersList.push(
      {
        name: "Adults",
        view: "/provider/opencard/In-home-family-members/adults/view",
      },
      {
        name: "Children",
        view: "/provider/opencard/In-home-family-members/children/view",
      }
    );
    this.inHomeFamilyMembersList.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    this.moveandpermenancyList.push(
      {
        name: "Move Form",
        view: "/reintegration/referral/opencard/move-permanency/move-form/view",
      },
      {
        name: "Permanency Form",
        view: "/reintegration/referral/opencard/move-permanency/permanency-form/view",
      }
    );
    this.moveandpermenancyList.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    this.rfcMedicalItems.push(
      { name: "Waiver", view: "/reintegration/referral/opencard/waiver/view" },
      {
        name: "BH Determination",
        view: "/reintegration/referral/opencard/bh-determination/view",
      },
      {
        name: "Health Record",
        view: "/reintegration/referral/opencard/health-record/view",
      },
      {
        name: "Immunization",
        view: "/reintegration/referral/opencard/immunization/view",
      },
      {
        name: "Kan-Be-Healthy",
        view: "/reintegration/referral/opencard/kan-be-healthy/view",
      }
      // { name: 'BH Placement History', view: '' },
    );
    this.rfcMedicalItems.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    this.courtOrderAttachmentItems.push({
      name: "Court Appearance Log",
      view: "/reintegration/referral/opencard/court-order/attachment/court-appeance",
    });
    this.courtOrderAttachmentItems.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    this.providerDemoGraphicsSupport.push(
      {
        name: "In-home Family Members",
        view: "/provider/opencard/In-home-family-members/dashboard",
      },
      { name: "Location", view: "/provider/opencard/location/view" },
      {
        name: "Pets",
        view: "/provider/opencard/In-home-family-members/pets/view",
      },
      { name: "SFM Office", view: "/provider/opencard/office/view" },
      {
        name: "Other Agency Staff",
        view: "/provider/opencard/other-agency-staff/view",
      },
      { name: "SFM Staff", view: "/provider/opencard/staff/view" },
      { name: "Status", view: "/provider/opencard/status/view" }
    );
    this.licenseSponsorShip.push(
      { name: "License", view: "/provider/opencard/license/view" },
      {
        name: "License Exception",
        view: "/provider/opencard/license-exception/view",
      },
      { name: "Sponsor", view: "/provider/opencard/sponsor/view" }
    );
    this.providerTraining.push({
      name: "Training",
      view: "/provider/opencard/training/view",
    });
    this.placementMatching.push(
      {
        name: "FCH Level Care",
        view: "/provider/opencard/fch-level-care/view",
      },
      {
        name: "Preferences",
        view: "/provider/opencard/provider-preferences/view",
      },
      {
        name: "Provider Strengths",
        view: "/provider/opencard/provider-strength/view",
      },
      { name: "School", view: "/provider/opencard/school/view" },
      {
        name: "Unacceptable conditions",
        view: "/provider/opencard/unacceptable-conditions/view",
      }
    );
    this.placementsPayments.push(
      {
        name: "Placement History",
        view: "/provider/opencard/placement-history/view",
      },
      {
        name: "Living Arrangement History",
        view: "/provider/opencard/living-arrangement/view",
      },
      {
        name: "Authorization summary(view only)",
        view: "/provider/opencard/authorization-summary/view",
      }
    );

    this.criticalIncidents
      .push
      // { name: 'Critical/Significant/Unusual Incident – All involve', view: '/provider/opencard/critical-incidents-allinvolve/view' },
      // { name: 'Critical/Significant/Unusual  Incident', view: '/provider/opencard/critical-incidents/view' },
      // { name: 'Critical/Significant/Unusual  Incident – RM Only ', view: '/provider/opencard/critical-incidents-rm/view' },
      ();
    this.familyPaperWorkOnPlacements
      .push
      // { name: 'LODES', view: '' },
      // { name: 'Immediate Assessments', view: '' },
      // { name: 'Mileage Reimbursement', view: '' },
      // { name: 'Placement Agreements', view: '' },
      // { name: 'Placement Support Plan', view: '' },
      // { name: 'Day Care', view: '' },
      // { name: 'Attached Documents', view: '' },
      ();
    this.adoption.push({
      name: "Adoption",
      view: "/provider/opencard/adoption/new",
    });
    this.recruitment.push(
      { name: "Inquiry Date", view: "" },
      {
        name: "Inquiry Events",
        view: "/provider/opencard/recruitment/inquiry/event/new",
      },
      { name: "Referral", view: "" },
      {
        name: "Recruitment Staff",
        view: "/provider/opencard/recruitment/staff/new",
      },
      { name: "Recruitment Training", view: "" }
    );
    this.adoptionSubnode.push(
      {
        name: "Best Interest Staffing",
        view: "/provider/opencard/adoption/BIS/view",
      },
      {
        name: "Identified Resource",
        view: "/provider/opencard/adoption/identifierResource/view",
      }
    );

    this.casaOfficerSubnode.push({
      name: "Cases",
      view: "/reports/casaOfficer/list",
    });

    this.communityMemberSubnode.push({
      name: "Cases",
      view: "/reports/communityMember/list",
    });

    this.dhsOfficesSubnode.push({
      name: "Cases",
      view: "/reports/dhsOffice/dhs-staff/cases",
    });

    this.providerSponsorclaimsSubnode.push({
      name: "Cases",
      view: "/reports/provider-sponser/placement-authorization/claim/view",
    });

    this.personTypeFamilyMemberHouseholdSubnode.push({
      name: "Cases",
      view: "/reports/familyMember/household-member/cases",
    });

    this.personTypeFamilyMemberExtendedSubnode.push({
      name: "Cases",
      view: "/reports/familyMember/extended-family/cases",
    });

    this.bhokMedicalItems.push(
      {
        name: "Immunization",
        view: "/reintegration/referral/opencard/immunization/view",
      },
      {
        name: "Health",
        view: "/reintegration/referral/opencard/health/bhok/view",
      }
    );

    this.bhokMedicalItems.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    this.displaySelection();
    this.providerNodesDisplayControl();
    this.jjfcMedicalItems.push(
      {
        name: "Immunization",
        view: "/reintegration/referral/opencard/immunization/view",
      },
      {
        name: "Health Record",
        view: "/reintegration/referral/opencard/health-record/view",
      },
      {
        name: "Kan-be-healthy",
        view: "/reintegration/referral/opencard/kan-be-healthy/view",
      }
    );
    this.ncfchMedicalItems.push(
      {
        name: "BH Determination",
        view: "/reintegration/referral/opencard/bh-determination/view",
      },
      {
        name: "Health Record",
        view: "/reintegration/referral/opencard/health-record/view",
      },
      {
        name: "Kan-Be-Healthy",
        view: "/reintegration/referral/opencard/kan-be-healthy/view",
      },
      { name: "Waiver", view: "/reintegration/referral/opencard/waiver/view" }
    );

    this.prtfMedicalItems.push(
      // { name: 'Health Exam', view: '/reintegration/referral/opencard/health-record/view' },
      {
        name: "Health Exam",
        view: "/prtf/referral/opencard/medical/health-exam/view",
      }
    );
    this.prtfMedicalItems.sort((a, b) => {
      return a["name"].localeCompare(b["name"]);
    });

    this.recruitmentTrainingItems.push(
      { name: "Training", view: "/recruitment-training/view" },
      { name: "Licensing", view: "/licensing-recruitment/view" }
    );
    this.complianceTechItems.push(
      { name: "Compliance Tech Team Members", view: "/compliance-tech/view" },
      {
        name: "Assigned Compliance Tech",
        view: "/assigned-compliance-tech/view",
      }
    );
    this.staffSfmOfficeItems.push(
      {
        name: "Primary Office",
        view: "/staff-opencards/sfm-office/primary-office/view",
      },
      {
        name: "Secondary Office",
        view: "/staff-opencards/sfm-office/secondary-office/view",
      }
    );
  }

  displaySelection() {
    console.log(
      "current url in title menu is in display selection is",
      this._router.url
    );
    let currentURLCheck = this._router.url,
      currentURL: string;
    if (currentURLCheck.includes("?")) {
      currentURL = this._router.url.split("?")[0];
    } else {
      currentURL = this._router.url;
    }

    switch (currentURL) {
      case "/reports/person/types":
        this.personType = true;
        break;
      case "/reports/batch-process":
        this.batchProcess = true;
        this.isBreadcrumbs = true;
        break;
      case "/reports/opencards/list":
        this.opencards = true;
        break;
      case "/reintegration/referral/service":
        this.serviceClaims = true;
        this.isBreadcrumbs = true;
        this.breadcrumbs = [
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          {
            label: "Case",
            href: "/reports/opencards/list/client/case",
            active: "",
          },
          { label: "Service Claim", active: "active" },
        ];
        if (this.referralTypeId === 4) {
          this._localValues.breadcrumbsChanges(
            "serviceClaims-NCFCH",
            this.breadcrumbs
          );
        }
        if (this.referralTypeId === 7) {
          this._localValues.breadcrumbsChanges(
            "serviceClaims-NCRFC",
            this.breadcrumbs
          );
        }
        break;
      case "/reports/family/view":
        this.referralFamily = true;
        this.isBreadcrumbs = true;
        this.breadcrumbs = [
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          {
            label: "Case Form",
            href: "/reports/referral/family-preservation/detail",
            active: "",
          },
          { label: "Family", active: "active" },
        ];
        if (this.referralTypeId === 4) {
          this._localValues.breadcrumbsChanges(
            "extendedFamily-NCFCH",
            this.breadcrumbs
          );
        } else if (this.referralTypeId === 5) {
          this.breadcrumbs = [
            { label: "List", href: "/reports/client", active: "" },
            { label: "Form", href: "/reports/client/details", active: "" },
            {
              label: "Case Form",
              href: "/reports/referral/family-preservation/detail",
              active: "",
            },
            { label: "Family", active: "active" },
          ];
        } else if (this.referralTypeId === 9) {
          this.breadcrumbs = [
            { label: "List", href: "/reports/client", active: "" },
            { label: "Form", href: "/reports/client/details", active: "" },
            { label: "Case Form", href: "/referral/nc-ops/detail", active: "" },
            { label: "Family", active: "active" },
          ];
        } else if (this.referralTypeId === 15) {
          this.breadcrumbs = [
            { label: "List", href: "/reports/client", active: "" },
            { label: "Form", href: "/reports/client/details", active: "" },
            { label: "Case Form", href: "/bh-ok/detail", active: "" },
            { label: "Family", active: "active" },
          ];
        } else if (this.referralTypeId === 17) {
          this.breadcrumbs = [
            { label: "List", href: "/reports/client", active: "" },
            { label: "Form", href: "/reports/client/details", active: "" },
            { label: "Case Form", href: "/jjfc/detail", active: "" },
            { label: "Family", active: "active" },
          ];
        } else if (this.referralTypeId === 11) {
          this.breadcrumbs = [
            { label: "List", href: "/reports/client", active: "" },
            { label: "Form", href: "/reports/client/details", active: "" },
            { label: "Case Form", href: "/nc-mhr/detail", active: "" },
            { label: "Family", active: "active" },
          ];
        } else if (this.referralTypeId === 2 || this.referralTypeId === 14) {
          this.breadcrumbs = [
            { label: "List", href: "/reports/client", active: "" },
            { label: "Form", href: "/reports/client/details", active: "" },
            {
              label: "Case Form",
              href: "/reports/referral/family-preservation/detail",
              active: "",
            },
            { label: "Family", active: "active" },
          ];
        } else {
          this.breadcrumbs = [
            { label: "List", href: "/reports/client", active: "" },
            { label: "Form", href: "/reports/client/details", active: "" },
            {
              label: "Case Form",
              href: "/reintegration/referral/detail",
              active: "",
            },
            { label: "Family", active: "active" },
          ];
        }

        break;
      case "/reintegration/referral/opencard/adoption/dashboard":
        this.isBreadcrumbs = true;
        this.rfcAdoption = true;
        this.breadcrumbs = [
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          {
            label: "Case Form",
            href: "/reintegration/referral//detail",
            active: "",
          },
          { label: "Adoption", active: "active" },
        ];
        break;
      case "/reintegration/referral/opencard/school/dashboard":
        this.isBreadcrumbs = true;
        this.rfcSchool = true;
        this.breadcrumbs = [
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          {
            label: "Case Form",
            href: "/reintegration/referral//detail",
            active: "",
          },
          { label: "School", active: "active" },
        ];
        if (this.referralTypeId === 4) {
          this._localValues.breadcrumbsChanges(
            "schoolDashboard-NCFCH",
            this.breadcrumbs
          );
        }
        if (this.referralTypeId === 17) {
          this._localValues.breadcrumbsChanges(
            "schoolDashboard-JJFC",
            this.breadcrumbs
          );
        }
        if (this.referralTypeId === 11) {
          this._localValues.breadcrumbsChanges(
            "schoolDashboard-NCMHR",
            this.breadcrumbs
          );
        }
        if (this.referralTypeId === 14) {
          this._localValues.breadcrumbsChanges(
            "schoolDashboard-PRTF",
            this.breadcrumbs
          );
        }
        break;
      case "/provider/dashboard":
        this.isBreadcrumbs = true;
        this.providerMenu = true;
        this.breadcrumbs = [
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "Provider List",
            href: "/reports/provider/view",
            active: "",
          },
          {
            label: "Provider Form",
            href: "/reports/provider/detail",
            active: "",
          },
          { label: "Provider Opencards", active: "active" },
        ];
        break;
      case "/provider/opencard/In-home-family-members/dashboard":
        this.isBreadcrumbs = true;
        this.inHomeFamilyMembers = true;
        this.breadcrumbs = [
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "Provider List",
            href: "/reports/provider/view",
            active: "",
          },
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
          { label: "In-home Family Members", active: "active" },
        ];
        break;
      case "/reintegration/referral/opencard/move-permanency/dashboard":
        this.isBreadcrumbs = true;
        this.isMoveAndPermenancy = true;
        this.breadcrumbs = [
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          {
            label: "Case Form",
            href: "/reintegration/referral/detail",
            active: "",
          },
          { label: "Move and Permanency", active: "active" },
        ];
        break;

      case "/reintegration/referral/opencard/medical/dashboard":
        this.isBreadcrumbs = true;
        this.isRfcMedicalMenu = true;

        this.breadcrumbs = [
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          {
            label: "Case Form",
            href: "/reintegration/referral/detail",
            active: "",
          },
          { label: "Medical", active: "active" },
        ];
        if (this.referralTypeId === 4) {
          this.isRfcMedicalMenu = false;
          this.isNCFCHMedicalItems = true;
          this._localValues.breadcrumbsChanges(
            "medicalDashboard-NCFCH",
            this.breadcrumbs
          );
        }
        if (this.referralTypeId === 15) {
          this.isRfcMedicalMenu = false;
          this.isBhokMedicalItems = true;
          this._localValues.breadcrumbsChanges(
            "caseForm-BHOK",
            this.breadcrumbs
          );
        }
        if (this.referralTypeId === 17) {
          this.isRfcMedicalMenu = false;
          this.isJJFCMedicalItems = true;
          this._localValues.breadcrumbsChanges(
            "medicalDashboard-JJFC",
            this.breadcrumbs
          );
        }
        break;

      case "/reintegration/referral/opencard/court-order/view-attachments":
        this.isBreadcrumbs = true;
        this.isCourtOrderAttachmentMenu = true;
        this.breadcrumbs = [
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          {
            label: "Case Form",
            href: "/reports/referral/family-preservation/detail",
            active: "",
          },
          {
            label: "Court Order List",
            href: "/reports/referral/family-preservation/court-order/view",
            active: "",
          },
          {
            label: "Court Order Form",
            href: "/reintegration/referral/opencard/court-order/detail",
            active: "",
          },
          { label: "Court Order Attachment", active: "active" },
        ];
        break;
      case "/provider/dashboard/placement-matching":
        this.isBreadcrumbs = true;
        this.providerMenu = true;
        this.breadcrumbs = [
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "Provider List",
            href: "/reports/provider/view",
            active: "",
          },
          {
            label: "Provider Form",
            href: "/reports/provider/detail",
            active: "",
          },
          { label: "Provider Opencards", active: "active" },
        ];
        break;
      case "/provider/dashboard/training":
        this.isBreadcrumbs = true;
        this.providerMenu = true;
        this.breadcrumbs = [
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "Provider List",
            href: "/reports/provider/view",
            active: "",
          },
          {
            label: "Provider Form",
            href: "/reports/provider/detail",
            active: "",
          },
          {
            label: "Provider Opencards",
            active: "active",
            href: "/provider/dashboard",
          },
          // { label: 'Provider Training', active: 'active', href: '/provider/dashboard/training' },
          // { label: 'Training', active: 'active' }
        ];
        break;
      case "/provider/dashboard/adoption/subnode":
        this.isBreadcrumbs = true;
        this.providerMenu = true;
        this.breadcrumbs.push(
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "Provider List",
            href: "/reports/provider/view",
            active: "",
          },
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
            label: "Provider Adoption",
            active: "",
            href: "/provider/opencard/adoption/detail",
          },
          { label: "Adoption SubNode", active: "active" }
        );
        break;

      case "/reports/casaOfficer/view":
        this.isBreadcrumbs = true;
        this.casaOfficer = true;
        this.breadcrumbs.push(
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "CASA Officer List",
            href: "/reports/casaOfficer",
            active: "",
          },
          {
            label: "Cases Dashboard",
            href: "/reports/provider/detail",
            active: "active",
          }
        );
        break;

      case "/reports/communityMember/view":
        this.isBreadcrumbs = true;
        this.communityMember = true;
        this.breadcrumbs.push(
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "Community Member List",
            href: "/reports/communityMember",
            active: "",
          },
          {
            label: "Cases Dashboard",
            href: "/reports/provider/detail",
            active: "active",
          }
        );
        break;

      case "/reports/dhsOffice/dhs-staff/opencard":
        this.isBreadcrumbs = true;
        this.dhsOffice = true;
        this.breadcrumbs.push(
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "DHS Office List",
            href: "/reports/dhsOffice/view",
            active: "",
          },
          {
            label: "DHS Staff List",
            href: "/reports/dhsOffice/dhs-staff",
            active: "",
          },
          {
            label: "DHS Staff List",
            href: "/reports/dhsOffice/dhs-staff/opencard",
            active: "active",
          }
        );
        break;

      case "/reports/provider-sponser/placement-authorization/dashboard":
        this.isBreadcrumbs = true;
        this.providerSponsorClaims = true;
        this.breadcrumbs.push(
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "Provider Sponser List",
            href: "/reports/provider-sponser/view",
            active: "",
          },
          {
            label: "Provider Sponser",
            active: "",
            href: "/reports/provider-sponser/detail",
          },
          {
            label: "Placement Authorization List",
            href: "/reports/provider-sponser/placement-authorization/view",
            active: "",
          },
          { label: "Dashboard", active: "active" }
        );
        break;

      case "/reports/familyMember/household-member":
        this.isBreadcrumbs = true;
        this.personTypeFamilyMemberHousehold = true;
        this.breadcrumbs.push(
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "Family Member List",
            href: "/reports/familyMember",
            active: "",
          },
          {
            label: "Family Member Form",
            href: "/reports/familyMember/details",
            active: "",
          },
          {
            label: "Family Member Household Dashboard",
            href: "/reports/familyMember/details",
            active: "active",
          }
        );
        break;

      case "/reports/familyMember/extended-family":
        this.isBreadcrumbs = true;
        this.personTypeFamilyMemberExtended = true;
        this.breadcrumbs.push(
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "Family Member List",
            href: "/reports/familyMember",
            active: "",
          },
          {
            label: "Family Member Form",
            href: "/reports/familyMember/details",
            active: "",
          },
          {
            label: "Family Member Extended Dashboard",
            href: "/reports/familyMember/details",
            active: "active",
          }
        );
        break;

      case "/prtf/referral/opencard/medical/dashboard":
        this.isBreadcrumbs = true;
        this.isPrtfMedicalMenu = true;

        this.breadcrumbs = [
          { label: "List", href: "/reports/client", active: "" },
          { label: "Form", href: "/reports/client/details", active: "" },
          { label: "Case Form", href: "/prtf/new", active: "" },
          { label: "Medical", active: "active" },
        ];

        break;

      case "/recruitment-training/dashboard":
        this.isBreadcrumbs = true;
        this.isRecruitmentTrainingMenu = true;
        this.breadcrumbs.push(
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "Provider List",
            href: "/reports/provider/view",
            active: "",
          },
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
            label: "Recruitment List",
            active: "",
            href: "/provider/opencard/recruitment/view",
          },
          { label: "Recruitment Training Dashboard", active: "active" }
        );
        break;

      case "/compliance-tech/dashboard":
        this.isBreadcrumbs = true;
        this.isComplianceMenu = true;
        this.breadcrumbs.push(
          { label: "List", href: "/reports/staff", active: "" },
          { label: "Staff - Form", active: "", href: "/reports/staff/details" },
          { label: "Form", active: "active" }
        );
        break;

      case "/staff-opencards/sfm-office/dashboard":
        this.isBreadcrumbs = true;
        this.isStaffSfmOfficeMenu = true;
        this.breadcrumbs.push(
          { label: "List", href: "/reports/staff", active: "" },
          { label: "Staff - Form", active: "", href: "/reports/staff/details" },
          { label: "Form", active: "active" }
        );
        break;
    }
  }

  providerNodesDisplayControl() {
    let currentURL = this._router.url;
    switch (currentURL) {
      case "/provider/dashboard/demographics-support":
        this.isBreadcrumbs = true;
        this.isProviderDemoGraphicsSupport = true;
        this.breadcrumbs = [
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "Provider List",
            href: "/reports/provider/view",
            active: "",
          },
          {
            label: "Provider Form",
            href: "/reports/provider/detail",
            active: "",
          },
          { label: "Provider Opencards", active: "active" },
        ];
        break;
      case "/provider/dashboard/license-sponsorship":
        this.isLicenseSponsorShip = true;
        this.isBreadcrumbs = true;
        this.breadcrumbs = [
          { label: "Person Types", href: "/reports/person/types", active: "" },
          {
            label: "Provider List",
            href: "/reports/provider/view",
            active: "",
          },
          {
            label: "Provider Form",
            href: "/reports/provider/detail",
            active: "",
          },
          { label: "Provider Opencards", active: "active" },
        ];
        break;
      case "/provider/dashboard/training":
        this.providerMenu = false;
        this.isTraining = true;
        break;
      case "/provider/dashboard/placement-matching":
        this.providerMenu = false;
        this.isPlacementMatching = true;
        break;
      case "/provider/dashboard/placements-payments":
        this.providerMenu = false;
        this.isPlacementsPayments = true;
        break;
      case "/provider/dashboard/critical-incidents":
        this.providerMenu = false;
        this.isCriticalIncidents = true;
        break;
      case "/provider/dashboard/family-paperwork-on-placements":
        this.providerMenu = false;
        this.isFamilyPaperWorkOnPlacements = true;
        break;
      case "/provider/dashboard/adoption":
        this.providerMenu = false;
        this.isAdoption = true;
        break;
      case "/provider/dashboard/adoption/subnode":
        this.providerMenu = false;
        this.isadoptionSubnode = true;
        break;
    }
  }

  navigate(url) {
    this._router.navigateByUrl(url);
  }

  setBatchType(type) {
    this._openCards.setBatchType(type);
  }

  providerSubnodeNav(nav: any) {
    this.providerMenu = false;
    this._router.navigate([nav]).then(() => {
      this.providerNodesDisplayControl();
    });
  }
  showMedicalAssessment = false;
  showMedicalTreatment = false;
  showMedicalCondition = false;
  showNode(pram) {
    if (pram.name === "Medical Assesment") {
      this.showMedicalAssessment = true;
    } else if (pram.name === "Treatment Services") {
      this.showMedicalTreatment = true;
    } else if (pram.name === "Medical Condetion") {
      this.showMedicalCondition = true;
    }
  }
  closeModelComp(event, type) {
    console.log("event>>>>>>>", event);
    if (type === "Medical Assesment") {
      this.showMedicalAssessment = false;
    } else if (type === "Treatment Services") {
      this.showMedicalTreatment = false;
    } else if (type === "Medical Condetion") {
      this.showMedicalCondition = false;
    }
  }

  async openAttachedDocumentPrompt() {
    this.documentPrimaryValue = {
      providerID:
        parseInt(localStorage.getItem("providerID")) -
        this._openCards.getHasKey(),
    };
    this.scannedDocumentList = await this.uploadDocTypes.onGetAttachmentList({
      providerID:
        parseInt(localStorage.getItem("providerID")) -
        this._openCards.getHasKey(),
    });
    this.isProviderAttachments = true;
  }

  onProviderAttachDocDelete = (scannedDocumentID: number) => {
    this.selectedAttachDocumetId = scannedDocumentID;
    return (this.isDeleteProviderConfirmation = true);
  };

  async attachProviderDocDelete() {
    await this.uploadDocTypes.deleteAttachment([this.selectedAttachDocumetId]);
    this.openAttachedDocumentPrompt();
    this.isDeleteProviderConfirmation = false;
  }

  onFamilyChangeClick() {
    this.familyChangeComponent.toggle();
  }

  openInNewBrowserWindow(path: any) {
    window.open(
      window.location.origin + path + window.location.search,
      "_blank",
      "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
    );
  }
  goToRoute(urlData) {
    if (
      urlData.view === "/reintegration/referral/opencard/school/eeispf/view" ||
      urlData.view === "/schoolIEPLists"
    ) {
      return this._router.navigate([urlData.view], {
        queryParamsHandling: "preserve",
      });
    } else {
      return this._router.navigate([urlData.view]);
    }
  }
  assignPersonMasters() {
    const currentURL = this._router.url;
    if (
      currentURL.includes("/reintegration/referral/opencard/school/dashboard")
    ) {
      this.currentPersonType = "client";
      this.isProfileView = true;
      return (this.currentPrimaryValue =
        parseInt(localStorage.getItem("clientId")) -
        this._openCards.getHasKey());
    }
  }

  navigateTo(url: string): Promise<any> {
    return this._router.navigate([url], { queryParamsHandling: "preserve" });
  }
}
