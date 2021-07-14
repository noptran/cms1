import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpecardsListViewComponent } from '../opecards-list-view/opecards-list-view.component';
import { ProviderOpencardComponent } from './provider-opencard.component';
import { TitleMenuComponent } from '../title-menu/title-menu.component';
import { AdultsComponent } from './nodes/in-home-family-members/adults/adults.component';
import { ChildrenComponent } from './nodes/in-home-family-members/children/children.component';
import { PetsComponent } from './nodes/in-home-family-members/pets/pets.component';
import { LocationComponent } from './nodes/location/location.component';
import { AdoptionComponent } from '../adoption/adoption.component';
import { ProviderAdoptionComponent } from './nodes/provider-adoption/provider-adoption.component';
import { CaseFileActivityComponent } from '../case-file-activity/case-file-activity.component';
import { ProviderCaseFileActivity } from './nodes/provider-case-file-activity/provider-case-file-activity';
import { ProviderCaseFileActivityComponent } from './nodes/provider-case-file-activity/provider-case-file-activity.component';
import { ProviderPreferencesComponent } from './nodes/provider-preferences/provider-preferences.component';
import { SponsorComponent } from './nodes/sponsor/sponsor.component';
import { ProviderSchoolComponent } from './nodes/provider-school/provider-school.component';
import { ProviderOfficeComponent } from './nodes/provider-office/provider-office.component';
import { ProviderStaffComponent } from './nodes/provider-staff/provider-staff.component';
import { StatusComponent } from './nodes/status/status.component';
import { MembersComponent } from './nodes/members/members.component';
import { LicenseComponent } from './nodes/license/license.component';
import { LicenseExceptionComponent } from './nodes/license-exception/license-exception.component';
import { ProviderStrengthComponent } from './nodes/provider-strength/provider-strength.component';
import { RecuritmentComponent } from './nodes/recuritment/recuritment.component';
import { TrainingComponent } from './nodes/training/training.component';
import { SiteReviewComponent } from './nodes/site-review/site-review.component';
import { OtherAgencyStaffComponent } from './nodes/other-agency-staff/other-agency-staff.component';
import { FamilyChangeComponent } from './nodes/family-change/family-change.component';
import { FchLevelCareComponent } from './nodes/fch-level-care/fch-level-care.component';
import { FamilyContactComponent } from './nodes/family-contact/family-contact.component';
import { ProviderAdoptionBISComponent } from './nodes/provider-adoption-bis/provider-adoption-bis.component';
import { ProviderAdoptionIRComponent } from './nodes/provider-adoption-ir/provider-adoption-ir.component';
import { UnusualIncidentComponent } from '../unusual-incident/unusual-incident.component';
import { UnacceptableConditionsComponent } from './nodes/unacceptable-conditions/unacceptable-conditions.component';
import { OtherServiceClaimComponent } from '../other-service-claim/other-service-claim.component';
import { PlacementHistoryComponent } from './nodes/placement-history/placement-history.component';

const routes: Routes = [
  {
    path: '',
    component: ProviderOpencardComponent,
    children: [
      {
        path: 'dashboard',
        component: TitleMenuComponent,
        children: [
          {
            path: 'demographics-support',
            component: TitleMenuComponent
          },
          {
            path: 'license-sponsorship',
            component: TitleMenuComponent
          },
          {
            path: 'training',
            component: TitleMenuComponent
          },
          {
            path: 'placement-matching',
            component: TitleMenuComponent
          },
          {
            path: 'placements-payments',
            component: TitleMenuComponent
          },
          {
            path: 'family-contacts',
            component: TitleMenuComponent
          },
          {
            path: 'critical-incidents',
            component: TitleMenuComponent
          },
          {
            path: 'family-paperwork-on-placements',
            component: TitleMenuComponent
          },
          {
            path: 'adoption',
            component: TitleMenuComponent
          },
          {
            path: 'adoption/subnode',
            component: TitleMenuComponent
          }
        ]
      },
      {
        path: 'opencard',
        children: [
          {
            path: 'recuritment-referral',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              }
            ]
          },
          {
            path: 'In-home-family-members',
            children: [
              {
                path: 'dashboard',
                component: TitleMenuComponent,
              },
              {
                path: 'adults',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: AdultsComponent
                  },
                  {
                    path: 'detail',
                    component: AdultsComponent
                  },
                ]
              },
              {
                path: 'children',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: ChildrenComponent
                  },
                  {
                    path: 'detail',
                    component: ChildrenComponent
                  }
                ]
              },
              {
                path: 'pets',
                children: [
                  {
                    path: 'view',
                    component: OpecardsListViewComponent
                  },
                  {
                    path: 'new',
                    component: PetsComponent
                  },
                  {
                    path: 'detail',
                    component: PetsComponent
                  }
                ]
              }
            ]
          },
          {
            path: 'location',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: LocationComponent
              },
              {
                path: 'detail',
                component: LocationComponent
              }
            ]
          },
          {
            path: 'adoption',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent,
              },
              {
                path: 'new',
                component: ProviderAdoptionComponent,
              },
              {
                path: 'detail',
                component: ProviderAdoptionComponent,
              },
              {
                path: 'BIS/view',
                component: OpecardsListViewComponent,
              },
              {
                path: 'identifierResource/view',
                component: OpecardsListViewComponent,
              }
            ]
          },
          {
            path: 'case-file-activity',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent,
              },
              {
                path: 'new',
                component: ProviderCaseFileActivityComponent,
              },
              {
                path: 'detail',
                component: ProviderCaseFileActivityComponent,
              }
            ]
          },
          {
            path: 'provider-preferences',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent,
              },
              {
                path: 'new',
                component: ProviderPreferencesComponent,
              },
              {
                path: 'detail',
                component: ProviderPreferencesComponent,
              }
            ]
          },
          {
            path: 'sponsor',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: SponsorComponent,
              },
              {
                path: 'detail',
                component: SponsorComponent,
              }
            ]
          },
          {
            path: 'status',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent,
              },
              {
                path: 'new',
                component: StatusComponent,
              },
              {
                path: 'detail',
                component: StatusComponent,
              }
            ]
          },
          {
            path: 'staff',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: ProviderStaffComponent,
              },
              {
                path: 'detail',
                component: ProviderStaffComponent,
              }
            ]
          },
          {
            path: 'office',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: ProviderOfficeComponent,
              },
              {
                path: 'detail',
                component: ProviderOfficeComponent,
              }
            ]
          },
          {
            path: 'school',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: ProviderSchoolComponent,
              },
              {
                path: 'detail',
                component: ProviderSchoolComponent,
              }
            ]
          },
          {
            path: 'members',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: MembersComponent,
              },
              {
                path: 'detail',
                component: MembersComponent,
              }
            ]
          },
          {
            path: 'license',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: LicenseComponent,
              },
              {
                path: 'detail',
                component: LicenseComponent,
              }
            ]
          },
          {
            path: 'license-exception',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: LicenseExceptionComponent,
              },
              {
                path: 'detail',
                component: LicenseExceptionComponent,
              }
            ]
          },
          {
            path: 'provider-strength',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: ProviderStrengthComponent,
              },
              {
                path: 'detail',
                component: ProviderStrengthComponent,
              }
            ]
          },
          {
            path: 'recuritment',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: RecuritmentComponent,
              },
              {
                path: 'detail',
                component: RecuritmentComponent,
              }
            ]
          },

          {
            path: 'training',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: TrainingComponent,
              },
              {
                path: 'detail',
                component: TrainingComponent,
              }
            ]
          },

          {
            path: 'site-review',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: SiteReviewComponent,
              },
              {
                path: 'detail',
                component: SiteReviewComponent,
              }
            ]
          },

          {
            path: 'other-agency-staff',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: OtherAgencyStaffComponent,
              },
              {
                path: 'detail',
                component: OtherAgencyStaffComponent,
              }
            ]
          },

          {
            path: 'family-change',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: FamilyChangeComponent,
              },
              {
                path: 'detail',
                component: FamilyChangeComponent,
              }
            ]
          },

          {
            path: 'fch-level-care',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: FchLevelCareComponent,
              },
              {
                path: 'detail',
                component: FchLevelCareComponent,
              }
            ]
          },
          {
            path: 'recruitment/staff',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: ProviderStaffComponent,
              },
              {
                path: 'detail',
                component: ProviderStaffComponent,
              }
            ]
          },
          {
            path: 'recruitment/inquiry/event',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: RecuritmentComponent,
              },
              {
                path: 'detail',
                component: RecuritmentComponent,
              }
            ]
          },
          {
            path: 'recruitment/inquiry/date',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: RecuritmentComponent,
              },
              {
                path: 'detail',
                component: RecuritmentComponent,
              }
            ]
          },
          {
            path: 'recruitment',

            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: RecuritmentComponent,
              },
              {
                path: 'detail',
                component: RecuritmentComponent,
              }
            ]
          },
          {
            path: 'family/contact',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: FamilyContactComponent,
              },
              {
                path: 'detail',
                component: FamilyContactComponent,
              }
            ]
          },
          {
            path: 'adoption/IR',
            children: [
              {
                path: 'new',
                component: ProviderAdoptionIRComponent,
              },
              {
                path: 'detail',
                component: ProviderAdoptionIRComponent,
              }
            ]
          },
          {
            path: 'adoption/BIS',
            children: [
              {
                path: 'detail',
                component: ProviderAdoptionBISComponent,
              }
            ]
          },
          {
            path: 'critical-incidents',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent,
              },
              {
                path: 'new',
                component: UnusualIncidentComponent,
              },
              {
                path: 'detail',
                component: UnusualIncidentComponent,
              }
            ]
          },
          {
            path: 'critical-incidents-rm',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent,
              },
              {
                path: 'new',
                component: UnusualIncidentComponent,
              },
              {
                path: 'detail',
                component: UnusualIncidentComponent,
              }
            ]
          },
          {
            path: 'critical-incidents-allinvolve',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent,
              },
              {
                path: 'new',
                component: UnusualIncidentComponent,
              },
              {
                path: 'detail',
                component: UnusualIncidentComponent,
              }
            ]
          },

          {
            path: 'unacceptable-conditions',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: UnacceptableConditionsComponent,
              },
              {
                path: 'detail',
                component: UnacceptableConditionsComponent,
              }
            ]
          },

          {
            path: 'authorization-summary',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'detail',
                component: OtherServiceClaimComponent
              }
            ]
          },

          {
            path: 'living-arrangement',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
            ]
          },
          {
            path: 'placement-history',
            children: [
              {
                path: 'view',
                component: OpecardsListViewComponent
              },
              {
                path: 'new',
                component: PlacementHistoryComponent,
              },
              {
                path: 'detail',
                component: PlacementHistoryComponent,
              }
            ]
          },




        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
