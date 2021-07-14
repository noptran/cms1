import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';
import { AuthGuardVerificationService } from '../auth/auth-guard-verification.service';
import { MissingChildQuestionaireComponent } from '../family-preservation/missing-child-questionaire/missing-child-questionaire.component';

const routes: Routes = [
  {
    path: 'family-preservation',
    canActivate: [AuthGuard, AuthGuardVerificationService],
    children: [
      {
        path: 'missing/child/questionaire',
        component: MissingChildQuestionaireComponent,
        canActivate: [AuthGuard, AuthGuardVerificationService]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FPRoutingModule { }
