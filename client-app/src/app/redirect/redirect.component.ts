import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
  currentBrowser: any;
  existingBrowser: any;
  userId: any;

  constructor(public _router: Router) {
  }

  ngOnInit() {
    this.setLocalStorageValues();
    this.redirect();
  }

  /** Get the existing device information */
  getExistingDeviceInfo() {
    console.log('Need to fetch the user infomration form user service');
  }

  /**
   * Get the currrent device information
   */
  setLocalStorageValues() {
    let userEmail, userId;
    userEmail = document.cookie.match(new RegExp('userEmail' + '=([^;]+)'));
    userId = document.cookie.match(new RegExp('userId' + '=([^;]+)'));
    localStorage.setItem('userId', !!userId ? userId[1] : null);
    localStorage.setItem('userEmail', !!userEmail ? userEmail[1] : null);
  }

  /**
   * Based on the current and exsiting information the redirection will happen
   * if both match redirect to the app console page
   * if not redirect to OTP page
   */
  redirect() {
    const browser: any = document.cookie.match(new RegExp('browser' + '=([^;]+)'));
    console.log('Broswer**', browser);
    if (browser) {
    if (browser[1] != this.currentBrowser) {
      localStorage.setItem('verifiedOTP', 'false');
      return this._router.navigate(['/verification']);
    } else {
      localStorage.setItem('verifiedOTP', 'true');
      return this._router.navigate(['/home']);
    }
  } else {
    localStorage.setItem('verifiedOTP', 'false');
    return this._router.navigate(['/verification']);
  }
}


}
