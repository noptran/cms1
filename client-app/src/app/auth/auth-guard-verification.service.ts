import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuardVerificationService implements CanActivate {
  constructor(public router: Router) { }

  UserId;
  UserEmail;
  canActivate(): boolean {
if (localStorage.getItem('redirectToHome') == 'login') {
      this.router.navigate(['/']);
      console.log('allow to home false');
      return false;
    } else {
      console.log('allow to home true');
      return true;
    }
  }
}

  @Injectable()

  export class AuthGuardVerificationHomeService implements CanActivate {
  constructor(public router: Router) { }

  UserId;
  UserEmail;
  resToken = localStorage.getItem('Token');
  canActivate(): boolean {
    if (document.cookie.indexOf('token=') !== -1) {
      this.router.navigate(['/home']);
      console.log('homeAuth false');
      return false;
    } else {
      console.log('homeAuth true');
      return true;

  }
}
  }
