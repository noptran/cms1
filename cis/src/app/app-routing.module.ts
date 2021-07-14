import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AccesspinComponent } from './components/accesspin/accesspin.component';
import { OtpComponent } from './components/otp/otp.component';
import { SendOtpComponent } from './components/send-otp/send-otp.component';
import { ConfirmPassComponent } from './components/confirm-pass/confirm-pass.component';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: "../app/home/home.module#HomeModule",
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'accesspin',
        component: AccesspinComponent
    },
    {
        path: 'otp',
        component: OtpComponent
    },
    {
        path: 'send/otp',
        component: SendOtpComponent
    },
    {
        path: 'confirm/pass',
        component: ConfirmPassComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
