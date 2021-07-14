import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavbarComponent } from './app-navbar.component';
import { HomeComponent } from '../home/home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppNavbarComponent
  ],
  exports: [AppNavbarComponent],
  providers: [HomeComponent]
})
export class AppNavBarModule { }
