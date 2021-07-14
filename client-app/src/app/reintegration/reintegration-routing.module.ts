import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { AuthGuardVerificationService } from '../auth/auth-guard-verification.service';
import { ReintegrationComponent } from './reintegration.component';
import { RfcReferralComponent } from './rfc-referral/rfc-referral.component';
import { RfcReferralService } from './rfc-referral/rfc-referral.service';
import { OpecardsListViewComponent } from '../opecards-list-view/opecards-list-view.component';
import { CaseActivityFpFormComponent } from '../family-preservation-list/forms/case-activity-fp-form/case-activity-fp-form.component';
import { AssessmentFpFormComponent } from '../family-preservation-list/forms/assessment-fp-form/assessment-fp-form.component';
import { CasePlanGoalsFpFormComponent } from '../family-preservation-list/forms/case-plan-goals-fp-form/case-plan-goals-fp-form.component';
import { CaseEvaluationsFpFormComponent } from '../family-preservation-list/forms/case-evaluations-fp-form/case-evaluations-fp-form.component';
import { CourtOrderComponent } from '../court-order/court-order.component';
import { HomeCountyComponent } from '../home-county/home-county.component';
import { SfcsOfficerComponent } from '../sfcs-officer/sfcs-officer.component';
import { TitleMenuComponent } from '../title-menu/title-menu.component';
import { ExtendedFamilyFpFormComponent } from '../family-preservation-list/forms/extended-family-fp-form/extended-family-fp-form.component';
import { CaseTeamComponent } from '../case-team/case-team.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { BhDeterminationComponent } from '../bh-determination/bh-determination.component';
import { AttendingSchoolComponent } from '../attending-school/attending-school.component';
import { GradeLevelComponent } from '../grade-level/grade-level.component';
import { HomeSchoolComponent } from '../home-school/home-school.component';
import { SchoolReleaseComponent } from '../school-release/school-release.component';
import { HealthRecordComponent } from '../health-record/health-record.component';
import { AdoptionEventComponent } from '../adoption-event/adoption-event.component';
import { KanBeHealthyComponent } from '../kan-be-healthy/kan-be-healthy.component';
import { MonthlyReportsComponent } from '../monthly-reports/monthly-reports.component';
import { SocialSecurtiyIncomeComponent } from '../social-securtiy-income/social-securtiy-income.component';
import { CaseFileActivityComponent } from '../case-file-activity/case-file-activity.component';
import { IndependentLivingComponent } from '../independent-living/independent-living.component';
import { OtherServiceClaimComponent } from '../other-service-claim/other-service-claim.component';
import { ImmunizationComponent } from '../immunization/immunization.component';
import { WaiverComponent } from '../waiver/waiver.component';
import { KippPMTOComponent } from '../kipp-pmto/kipp-pmto.component';
import { KippComponent } from '../kipp/kipp.component';
import { SibilingInOutComponent } from '../sibiling-in-out/sibiling-in-out.component';
import { PlacementComponent } from '../placement/placement.component';
import { PlacementReferralComponent } from '../placement-referral/placement-referral.component';
import { PlacementEventAuthorizationComponent } from '../placement-event-authorization/placement-event-authorization.component';
import { MoveAndPermanencyComponent } from '../move-and-permanency/move-and-permanency.component';
import { AdoptionComponent } from '../adoption/adoption.component';
import { BestIntrestingStaffComponent } from '../best-intresting-staff/best-intresting-staff.component';
import { OpencardListviewModule } from '../opecards-list-view/opencard-listview.module';
import { GeneralEducationComponent } from './school/general-education/general-education.component';
import { CreditTrackingComponent } from './school/credit-tracking/credit-tracking.component';
import { SpecialEducationComponent } from './school/special-education/special-education.component';
import { IdentifyResourceComponent } from '../identify-resource/identify-resource.component';
import { PermanencyComponent } from '../permanency/permanency.component';
import { EducationEnrollmentComponent } from '../education-enrollment/education-enrollment.component';

/////////ASQ Forms/////////
import { Asq2MoComponent } from '../cis-forms/asq-2-mo/asq-2-mo.component';
import { Asq6MoComponent } from '../cis-forms/asq-6-mo/asq-6-mo.component';
import { Asq12MoComponent } from '../cis-forms/asq-12-mo/asq-12-mo.component';
import { Asq18MoComponent } from '../cis-forms/asq-18-mo/asq-18-mo.component';
import { Asq24MoComponent } from '../cis-forms/asq-24-mo/asq-24-mo.component';
import { Asq30MoComponent } from '../cis-forms/asq-30-mo/asq-30-mo.component';
import { Asq36MoComponent } from '../cis-forms/asq-36-mo/asq-36-mo.component';
import { Asq48MoComponent } from '../cis-forms/asq-48-mo/asq-48-mo.component';
import { Asq60MoComponent } from '../cis-forms/asq-60-mo/asq-60-mo.component';
import { BehaviorVersioningComponent } from '../behavior-versioning/behavior-versioning.component';
import { CourtAppearanceVersioningComponent } from '../court-appearance-versioning/court-appearance-versioning.component';
import { CafasComponent } from '../cis-forms/cafas/cafas.component';
import { AdoptiveVersioningComponent } from '../adoptive-versioning/adoptive-versioning.component';
import { PecfasComponent } from '../cis-forms/pecfas/pecfas.component';
import { PermanencyReleaseComponent } from '../cis-forms/reintegration/permanency-release/permanency-release.component';
import { InitialFamilyComponent } from '../cis-forms/reintegration/initial-family/initial-family.component';
import { PsiComponent } from '../cis-forms/psi/psi.component';
import { MaternalPaternalVersionComponent } from '../maternal-paternal-version/maternal-paternal-version.component';
import { CsdcComponent } from '../cis-forms/csdc/csdc.component';
import { PermanencyVersioningComponent } from '../permanency-versioning/permanency-versioning.component';
import { LivingArrangeMentComponent } from '../placement/living-arrange-ment/living-arrange-ment.component';
import { PlacementEventComponent } from '../placement/placement-event/placement-event.component';
import { DaycareAuthorizationComponent } from '../placement/daycare-authorization/daycare-authorization.component';
import { PlacementPlanComponent } from '../placement/placement-plan/placement-plan.component';
import { PlacementAuthTempleteComponent } from '../placement/placement-auth-template/placement-auth-template.component';
import { HealthBhokComponent } from '../health-bhok/health-bhok.component';

const routes: Routes = [
  {
    path: '',
    component: ReintegrationComponent,
    canActivate: [AuthGuard, AuthGuardVerificationService],
    children: [
      {
        path: 'payee/Auth-detail',
        component: PlacementAuthTempleteComponent
      }, {
        path: 'payee/serviceClaim_hardgoods/Auth-detail',
        component: PlacementAuthTempleteComponent
      }, {
        path: 'payee/serviceClaim_otherService/Auth-detail',
        component: PlacementAuthTempleteComponent
      }, {
        path: 'cs-payee/csPayeeAuthDetail',
        component: PlacementAuthTempleteComponent
      }, {
        path: 'provider_AuthDetail',
        component: PlacementAuthTempleteComponent
      }, {
        path: 'provider/providerAuthorization_detail',
        component: PlacementAuthTempleteComponent
      }, {
        path: 'payee/payeeAuthorization_detail',
        component: PlacementAuthTempleteComponent
      }, {
        path: 'referral',
        children: [
          {
            path: 'new',
            component: RfcReferralComponent
          },
          {
            path: 'detail',
            component: RfcReferralComponent
          },
          {
            path: 'service',
            children: [
              {
                path: '',
                component: TitleMenuComponent,
              },
              {
                path: 'other/service',
                component: OtherServiceClaimComponent
              },
              {
                path: 'other/service/detail',
                component: OtherServiceClaimComponent
              },
              {
                path: 'opencard/claim',
                component: OpecardsListViewComponent
              },
              {
                path: 'hardgoods/detail',
                component: OtherServiceClaimComponent
              },
              {
                path: 'hardgoods',
                component: OtherServiceClaimComponent
              },
              {
                path: 'authorization/summary',
                component: OpecardsListViewComponent
              },
              {
                path: 'authorization/summary/detail',
                component: OtherServiceClaimComponent
              },
              {
                path: 'opencard/claim/authorizationSummary',
                component: OpecardsListViewComponent
              },
            ]
          },
          {
            path: 'opencard',
            children: [
              {
                path: 'case-activity',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: CaseActivityFpFormComponent
                  },
                  {
                    path: 'detail',
                    component: CaseActivityFpFormComponent
                  },


                ]
              },
              {
                path: 'assessments',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: AssessmentFpFormComponent
                  },
                  {
                    path: 'detail',
                    component: AssessmentFpFormComponent
                  },
                  {
                    path: 'attachment',
                    component: MaternalPaternalVersionComponent
                  },
                ]
              },
              {
                path: 'case-plan-goals',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: CasePlanGoalsFpFormComponent
                  },
                  {
                    path: 'detail',
                    component: CasePlanGoalsFpFormComponent
                  }
                ]
              },
              {
                path: 'case-evaluations',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: CaseEvaluationsFpFormComponent
                  },
                  {
                    path: 'detail',
                    component: CaseEvaluationsFpFormComponent
                  }
                ]
              },
              {
                path: 'case-team',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: CaseTeamComponent
                  },
                  {
                    path: 'detail',
                    component: CaseTeamComponent
                  }
                ]
              },
              {
                path: 'home-county',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: HomeCountyComponent
                  },
                  {
                    path: 'detail',
                    component: HomeCountyComponent
                  }
                ]
              },
              {
                path: 'sfcs-office',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: SfcsOfficerComponent
                  },
                  {
                    path: 'detail',
                    component: SfcsOfficerComponent
                  }
                ]
              },
              {
                path: 'extended-family',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: ExtendedFamilyFpFormComponent
                  },
                  {
                    path: 'detail',
                    component: ExtendedFamilyFpFormComponent
                  }
                ]
              },
              {
                path: 'court-order',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: CourtOrderComponent
                  },
                  {
                    path: 'detail',
                    component: CourtOrderComponent
                  },
                  {
                    path: 'view-attachments',
                    component: TitleMenuComponent
                  },
                  {
                    path: 'attachment/court-appeance',
                    component: CourtAppearanceVersioningComponent
                  }
                ]
              },
              {
                path: 'appointments',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: AppointmentsComponent
                  },
                  {
                    path: 'detail',
                    component: AppointmentsComponent
                  }
                ]
              },
              {
                path: 'NC-FI-appointments',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: AppointmentsComponent
                  },
                  {
                    path: 'detail',
                    component: AppointmentsComponent
                  }
                ]
              },
              {
                path: 'bh-determination',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: BhDeterminationComponent
                  },
                  {
                    path: 'detail',
                    component: BhDeterminationComponent
                  }
                ]
              },
              {
                path: 'attending-school',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: AttendingSchoolComponent
                  },
                  {
                    path: 'detail',
                    component: AttendingSchoolComponent
                  }
                ]
              },
              {
                path: 'grade-level',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: GradeLevelComponent
                  },
                  {
                    path: 'detail',
                    component: GradeLevelComponent
                  }
                ]
              },
              {
                path: 'home-school',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: HomeSchoolComponent
                  },
                  {
                    path: 'detail',
                    component: HomeSchoolComponent
                  }
                ]
              },
              {
                path: 'school-release',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: SchoolReleaseComponent
                  },
                  {
                    path: 'detail',
                    component: SchoolReleaseComponent
                  }
                ]
              },
              {
                path: 'health-record',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: HealthRecordComponent
                  },
                  {
                    path: 'detail',
                    component: HealthRecordComponent
                  }
                ]
              },
              {
                path: 'adoption-event',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: AdoptionEventComponent
                  },
                  {
                    path: 'detail',
                    component: AdoptionEventComponent
                  }
                ]
              },
              {
                path: 'kan-be-healthy',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: KanBeHealthyComponent
                  },
                  {
                    path: 'detail',
                    component: KanBeHealthyComponent
                  }
                ]
              },
              {
                path: 'monthly-reports',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: MonthlyReportsComponent
                  },
                  {
                    path: 'detail',
                    component: MonthlyReportsComponent
                  }
                ]
              },
              {
                path: 'social-security-income',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: SocialSecurtiyIncomeComponent
                  },
                  {
                    path: 'detail',
                    component: SocialSecurtiyIncomeComponent
                  }
                ]
              },
              {
                path: 'case-file-activity',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: CaseFileActivityComponent
                  },
                  {
                    path: 'detail',
                    component: CaseFileActivityComponent
                  }
                ]
              },
              {
                path: 'independent-living',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: IndependentLivingComponent
                  },
                  {
                    path: 'detail',
                    component: IndependentLivingComponent
                  }
                ]
              },
              {
                path: 'immunization',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: 'new',
                    component: ImmunizationComponent,
                  },
                  {
                    path: 'detail',
                    component: ImmunizationComponent,
                  }
                ]
              },
              {
                path: 'health/bhok',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: 'new',
                    component: HealthBhokComponent,
                  },
                  {
                    path: 'detail',
                    component: HealthBhokComponent,
                  }
                ]
              },

              {
                path: 'waiver',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: 'new',
                    component: WaiverComponent,
                  },
                  {
                    path: 'detail',
                    component: WaiverComponent,
                  }
                ]
              },
              {
                path: 'kipp',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: 'new',
                    component: KippComponent,
                  },
                  {
                    path: 'detail',
                    component: KippComponent,
                  }
                ]
              },
              {
                path: 'sibilings-in-out-of-home-family',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: 'new',
                    component: SibilingInOutComponent,
                  },
                  {
                    path: 'detail',
                    component: SibilingInOutComponent,
                  }
                ]
              },
              {
                path: 'placement',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: 'new',
                    component: PlacementComponent,
                  },
                  {
                    path: 'detail',
                    component: PlacementComponent,
                  },
                  {
                    path: 'living-arrangement',

                    children: [
                      {
                        path: 'view',
                        component: OpecardsListViewComponent,
                      },
                      {
                        path: 'new',
                        component: LivingArrangeMentComponent,
                      },
                      {
                        path: 'detail',
                        component: LivingArrangeMentComponent,
                      }

                    ]
                  },
                  {
                    path: 'placementEvent',
                    children: [
                      {
                        path: 'view',
                        component: OpecardsListViewComponent,
                      },

                      {
                        path: 'new',
                        component: PlacementEventComponent,
                      },
                      {
                        path: 'detail',
                        component: PlacementEventComponent,
                      }
                    ],
                    // component: PlacementEventComponent,
                  },
                  {
                    path: 'daycare-authorization',
                    children: [
                      {
                        path: 'new',
                        component: DaycareAuthorizationComponent
                      },
                      {
                        path: 'detail',
                        component: DaycareAuthorizationComponent
                      },
                      {
                        path: 'view',
                        component: OpecardsListViewComponent
                      }
                    ]
                  },
                  {
                    path: 'placementPlan',
                    children: [
                      {
                        path: 'new',
                        component: PlacementPlanComponent
                      },
                      {
                        path: 'detail',
                        component: PlacementPlanComponent
                      },
                      {
                        path: 'view',
                        component: OpecardsListViewComponent
                      }
                    ]
                  },

                ]
              },
              {
                path: 'move-permanency',
                children: [
                  {
                    path: 'view',
                    component: MoveAndPermanencyComponent,
                  },
                  {
                    path: 'new',
                    component: MoveAndPermanencyComponent,
                  },
                  {
                    path: 'detail',
                    component: MoveAndPermanencyComponent,
                  }
                ]
              },


              {
                path: 'placement-referral',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: 'new',
                    component: PlacementReferralComponent,
                  },
                  {
                    path: 'detail',
                    component: PlacementReferralComponent
                  }
                ]
              },
              {
                path: 'placement-event-authorization',
                children: [
                  {
                    path: 'view',
                    component: PlacementEventAuthorizationComponent,
                  },
                  {
                    path: 'new',
                    component: PlacementEventAuthorizationComponent,
                  },
                  {
                    path: 'detail',
                    component: PlacementEventAuthorizationComponent,
                  }
                ]
              },
              {
                path: 'adoption',
                children: [
                  {
                    path: 'dashboard',
                    component: TitleMenuComponent
                  },
                  {
                    path: 'view',
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: 'new',
                    component: AdoptionComponent,
                  },
                  {
                    path: 'detail',
                    component: AdoptionComponent,
                  },
                  {
                    path: 'attachment',
                    component: AdoptiveVersioningComponent,
                  },

                ]
              },
              {
                path: 'bis',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: 'new',
                    component: BestIntrestingStaffComponent,
                  },
                  {
                    path: 'detail',
                    component: BestIntrestingStaffComponent,
                  }
                ]
              },
              {
                path: 'school',
                children: [
                  {
                    path: 'dashboard',
                    component: TitleMenuComponent,
                  },
                  {
                    path: 'general-education',
                    children: [
                      {
                        path: 'view',
                        component: OpecardsListViewComponent,
                      },
                      {
                        path: 'new',
                        component: GeneralEducationComponent
                      },
                      {
                        path: 'detail',
                        component: GeneralEducationComponent
                      },
                    ],
                  },
                  {
                    path: 'credit-tracking',
                    children: [
                      {
                        path: 'view',
                        component: OpecardsListViewComponent,
                      },
                      {
                        path: 'new',
                        component: CreditTrackingComponent
                      },
                      {
                        path: 'detail',
                        component: CreditTrackingComponent
                      },
                    ],
                  },
                  {
                    path: 'special-education',
                    children: [
                      {
                        path: 'view',
                        component: OpecardsListViewComponent,
                      },
                      {
                        path: 'new',
                        component: SpecialEducationComponent
                      },
                      {
                        path: 'detail',
                        component: SpecialEducationComponent
                      },
                    ],
                  },

                  {
                    path: 'eeispf',
                    children: [
                      {
                        path: 'view',
                        component: OpecardsListViewComponent,
                      },
                      {
                        path: 'new',
                        component: EducationEnrollmentComponent,
                      },
                      {
                        path: 'detail',
                        component: EducationEnrollmentComponent
                      },
                    ],
                  },
                  {
                    path: 'NC-FI-appointments',
                    children: [
                      {
                        path: 'view',
                        component: OpecardsListViewComponent
                      },
                      {
                        path: 'new',
                        component: AppointmentsComponent
                      },
                      {
                        path: 'detail',
                        component: AppointmentsComponent
                      }
                    ]
                  }


                ]
              },

              {
                path: 'behavioral-assessment',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: 'dash-board',
                    component: BehaviorVersioningComponent,
                  },
                  {
                    path: 'asq-two',
                    children: [

                      {
                        path: 'new',
                        component: Asq2MoComponent
                      },
                      {
                        path: 'detail',
                        component: Asq2MoComponent
                      },
                    ],
                  },
                  {
                    path: 'asq-six',
                    children: [

                      {
                        path: 'new',
                        component: Asq6MoComponent
                      },
                      {
                        path: 'detail',
                        component: Asq6MoComponent
                      },
                    ],
                  },
                  {
                    path: 'asq-twelve',
                    children: [

                      {
                        path: 'new',
                        component: Asq12MoComponent
                      },
                      {
                        path: 'detail',
                        component: Asq12MoComponent
                      },
                    ],
                  },
                  {
                    path: 'asq-eighteen',
                    children: [

                      {
                        path: 'new',
                        component: Asq18MoComponent
                      },
                      {
                        path: 'detail',
                        component: Asq18MoComponent
                      },
                    ],
                  },
                  {
                    path: 'asq-twentyFour',
                    children: [

                      {
                        path: 'new',
                        component: Asq24MoComponent
                      },
                      {
                        path: 'detail',
                        component: Asq24MoComponent
                      },
                    ],
                  },
                  {
                    path: 'asq-twirty',
                    children: [

                      {
                        path: 'new',
                        component: Asq30MoComponent
                      },
                      {
                        path: 'detail',
                        component: Asq30MoComponent
                      },
                    ],
                  },
                  {
                    path: 'asq-thirtySix',
                    children: [

                      {
                        path: 'new',
                        component: Asq36MoComponent
                      },
                      {
                        path: 'detail',
                        component: Asq36MoComponent
                      },
                    ],
                  },
                  {
                    path: 'asq-fourtyEight',
                    children: [

                      {
                        path: 'new',
                        component: Asq48MoComponent
                      },
                      {
                        path: 'detail',
                        component: Asq48MoComponent
                      },
                    ],
                  },
                  {
                    path: 'asq-sixty',
                    children: [

                      {
                        path: 'new',
                        component: Asq60MoComponent
                      },
                      {
                        path: 'detail',
                        component: Asq60MoComponent
                      },
                    ],
                  },
                  {
                    path: 'cafas',
                    children: [

                      {
                        path: 'new',
                        component: CafasComponent
                      },
                      {
                        path: 'detail',
                        component: CafasComponent
                      },
                    ],
                  },

                  // 
                  {
                    path: 'CAFAS',
                    children: [

                      {
                        path: 'new',
                        component: CafasComponent
                      },
                      {
                        path: 'detail',
                        component: CafasComponent
                      },
                    ],
                  },
                  {
                    path: 'PECFAS',
                    children: [

                      {
                        path: 'new',
                        component: PecfasComponent
                      },
                      {
                        path: 'detail',
                        component: PecfasComponent
                      },
                    ],
                  },
                  {
                    path: 'PSI',
                    children: [

                      {
                        path: 'new',
                        component: PsiComponent
                      },
                      {
                        path: 'detail',
                        component: PsiComponent
                      },
                    ],
                  },
                  {
                    path: 'CSDC',
                    children: [

                      {
                        path: 'new',
                        component: CsdcComponent
                      },
                      {
                        path: 'detail',
                        component: CsdcComponent
                      },
                    ],
                  },


                ]
              },


              {
                path: 'identified-resource',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent,
                  },
                  {
                    path: 'new',
                    component: IdentifyResourceComponent,
                  },
                  {
                    path: 'detail',
                    component: IdentifyResourceComponent
                  },
                ],
              },
              {
                path: 'move-permanency',
                children: [
                  {
                    path: 'dashboard',
                    component: TitleMenuComponent,
                  },
                  {
                    path: 'move-form',
                    children: [
                      {
                        path: 'view',
                        component: OpecardsListViewComponent
                      },
                      {
                        path: 'new',
                        component: MoveAndPermanencyComponent
                      },
                      {
                        path: 'detail',
                        component: MoveAndPermanencyComponent
                      },

                    ],
                  },
                  {
                    path: 'permanency-form',
                    children: [
                      {
                        path: 'view',
                        component: OpecardsListViewComponent
                      },
                      {
                        path: 'new',
                        component: PermanencyComponent
                      },
                      {
                        path: 'detail',
                        component: PermanencyComponent
                      },
                      {
                        path: 'attachment',
                        component: PermanencyVersioningComponent,
                      },

                    ],
                  },
                ],
              },
              {
                path: 'medical',
                children: [{
                  path: 'dashboard',
                  component: TitleMenuComponent
                }]
              },

              {
                path: 'family',

                children: [{
                  path: 'view',
                  component: TitleMenuComponent
                }]
              },
            ]
          },
          {
            path: 'adoptive',
            component: PecfasComponent
          },
          {
            path: 'placement-authorizations',
            children: [
              {
                path: 'list',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: PlacementAuthTempleteComponent
              },
              {
                path: 'detail',
                component: PlacementAuthTempleteComponent
              },
              {
                path: 'claims',
                component: OpecardsListViewComponent
              }
            ]
          },

          {
            path: 'placement-event-authorizations',
            children: [
              {
                path: 'list',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: PlacementAuthTempleteComponent
              },
              {
                path: 'detail',
                component: PlacementAuthTempleteComponent
              },
              {
                path: 'claims',
                component: OpecardsListViewComponent
              }
            ]
          }
        ]
      }]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RfcReferralService]
})
export class ReintegrationRoutingModule { }
