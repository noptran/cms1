import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../components/login/login.component';
import { FormsListingComponent } from '../components/forms/forms-listing/forms-listing.component';
import { FormEditorComponent } from '../components/form-editor/form-editor.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ViewPreviousFormsComponent } from '../components/forms/view-previous-forms/view-previous-forms.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'form',
        component: FormsListingComponent,
      },
      {
        path: 'form/:id',
        component: FormEditorComponent
      },
      {
        path: 'form/:id/edit/:docId',
        component: FormEditorComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'forms/list/:type',
        component: FormsListingComponent
      },
      {
        path: 'view/form',
        component: ViewPreviousFormsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
