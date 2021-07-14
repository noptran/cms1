import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) { }

  UserId;
  UserEmail;
  Token;
  resToken = localStorage.getItem('Token');
  verifiedOTP = localStorage.getItem('verifiedOTP');
  canActivate(): boolean {
    console.log('@@@', this.verifiedOTP);
    if (document.cookie.indexOf('token=') == -1 && this.verifiedOTP == 'false') {
      this.router.navigate(['/']);
      console.log('service auth false');
      return false;
    } else {
      console.log('service auth true');
      // return true;
    }
   }
}
