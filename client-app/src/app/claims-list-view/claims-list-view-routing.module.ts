import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { AuthGuardVerificationService } from '../auth/auth-guard-verification.service';
import { ClaimsListViewComponent } from '../claims-list-view/claims-list-view.component';
import { OpecardsListViewComponent } from '../opecards-list-view/opecards-list-view.component';
import { ClaimsListDetailsComponent } from '../claims-list-details/claims-list-details.component';
import { AddClaimsComponent } from '../add-claims/add-claims.component';
import { DirectAuthorisationFormViewComponent } from '../direct-authorisation-form-view/direct-authorisation-form-view.component';

const routes: Routes = [{
  path: '',
  component: ClaimsListViewComponent,
  canActivate: [AuthGuard, AuthGuardVerificationService],
  children: [{
    path: 'list',
    children: [
      {
        path: 'view',
        component: OpecardsListViewComponent
      },
      {
        path: 'details',
        component: ClaimsListDetailsComponent
      },
      {
        path: 'authorizationSummary/details',
        component: ClaimsListDetailsComponent
      },
      {
        path: 'add',
        component: AddClaimsComponent
      },
      {
        path: 'cs-claim/add',
        component: AddClaimsComponent
      },
      {
        path: 'direct/auth/list',
        component: OpecardsListViewComponent
      },
      {
        path: 'other/service/list',
        component: OpecardsListViewComponent
      },
      {
        path: 'direct/form/view',
        component: DirectAuthorisationFormViewComponent
      },
      {
        path: 'payee/serviceClaim_otherService/directAuth/form/view',
        component: DirectAuthorisationFormViewComponent
      }, {
        path: 'cs-direct/form/view',
        component: DirectAuthorisationFormViewComponent
      },
      {
        path: 'provider/cs-claim_provider_view/directAuth',
        component: DirectAuthorisationFormViewComponent
      },
      {
        path: 'csClaimPayee-form/directAuth',
        component: DirectAuthorisationFormViewComponent
      },
      {
        path: 'hardgoods/list',
        component: OpecardsListViewComponent
      },
      {
        path: 'cs-claim-list',
        component: OpecardsListViewComponent
      },
      {
        path: 'dir_cs-payee/dir_csPayee-directAuth',
        component: DirectAuthorisationFormViewComponent
      }, {
        path: 'cs-payee/csPayee-directAuth/new',
        component: DirectAuthorisationFormViewComponent
      },
    ]
  },
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsListViewRoutingModule { }
