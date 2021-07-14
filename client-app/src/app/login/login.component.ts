import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Login } from './login';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();
  errorAccess;
  showErrorMsg = false;
  env = environment;
  infoLabel = false;
  constructor(public router: Router, public _login: LoginService) { }

  save() {
    this._login.postData(this.login).then((data: any) => {
      if (data.responseStatus === true) {
        window.location.href = data.responseMessage;
        console.log(data);
      } else {
        console.log(data.responseMessage);
      }
    }).catch(error => {
      console.log('Error', error);
    });
  }
  redirectHome() {
    this.router.navigate(['home']);
  }
  ngOnInit() {
    if (document.cookie.length > 0) {
      const cookies = document.cookie.split(';');

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
      localStorage.clear();
    }
    const errorObject = document.cookie.match(new RegExp('error' + '=([^;]+)'));
    this.errorAccess = !!errorObject ? errorObject[1] : null;
    if (this.errorAccess != null) {
      this.showErrorMsg = true;
      this.errorAccess = 'Your access to Web Application is not granted. Please wait for Administrator to grant access';
    }
    console.log(this.errorAccess);

    const errorObject2 = document.cookie.match(new RegExp('userRegisterError' + '=([^;]+)'));
    this.errorAccess = !!errorObject2 ? errorObject2[1] : null;
    if (this.errorAccess != null) {
      this.showErrorMsg = true;
      this.errorAccess = 'Your account is not registered. Please wait for an access, your request has been sent to admin';
    }
    console.log(this.errorAccess);
    this.env.localUrl === 'https://child-welfare.st-francis.org/tomcat/' ? this.infoLabel = true : this.infoLabel = false;
  }

}


// let cookies = document.cookie.split(";");

// for (var i = 0; i < cookies.length; i++) {
//     var cookie = cookies[i];
//     var eqPos = cookie.indexOf("=");
//     var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
// }
// localStorage.clear();
