import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Logout } from '../login/logout';
import { OtpverficationService } from '../otpverfication/otpverfication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @Input()
  Sidenav: boolean;


  UserEmail;
  logoutData: Logout = new Logout();
  adminTitleController = false;
  privilages = JSON.parse(localStorage.getItem('userPrivilage'));
  user_id;


  constructor(public router: Router, public _login: LoginService, public _otp: OtpverficationService) { }

  ngOnInit() {
    this.UserEmail = localStorage.getItem('UserEmail');
    this.adminTitleSwitch();

    // console.log("Admin settings",typeof this.privilages['adminSettings'],this.privilages['adminSettings'])
    // if(this.privilages['adminSettings'].length > 0){
    //   this.adminTitleController = true
    // }
    history.pushState(null, null, location.href);
    window.onpopstate = function () { history.go(1);
  };
}
  scroll(el) {
    el.scrollToBottom();
}

logOut() {
  this.logoutData.staffID = localStorage.getItem('UserId');
  // this.logoutData.staffID = '4621'
    this._login.logOut(this.logoutData).then((result: any) => {
      localStorage.clear();
      console.log('Logout result', result);
      if (result.redirect !== 'login') {
        this.router.navigateByUrl('/home');
      } else {
        this._login.cookieRemoval('token=');
        this.router.navigateByUrl('/');
      }
    });
  }
adminTitleSwitch() {
    // let loader = document.getElementById('loading-overlay') as HTMLElement;
    // loader.style.display = 'block';
  this.user_id = localStorage.getItem('UserId');
  // this.user_id = '7'
  if (this.user_id !== null) {
    const req = {staffID: parseInt(this.user_id) };
    this._otp.getUserDetail(req).then(result => {
        // loader.style.display = 'none';
        if (result.users.adminSettingsUserRights.length > 0) {
          return this.adminTitleController = true;
        }
    });
  }
}


}
