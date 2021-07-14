import { Injectable, NgZone } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { PouchDbService } from './pouchdb.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  postEnd: any = environment;
  headers: any;
  options: any;
  constructor(private _http: Http, private pouchDBService: PouchDbService, private snackbar: MatSnackBar, private router: Router, private electronServiceInstance: ElectronService, private ngZone: NgZone) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.options = new RequestOptions({ headers: this.headers });
  }

  login(data: any) {
    return this._http.post(this.postEnd.localUrl + '/loginWithMS', JSON.stringify(data), this.options).toPromise()
      .then(this.extractedData).catch(err => console.log(err));
  }
  logOut(data: any) {
    return this._http.post(this.postEnd.localUrl + '/logout', JSON.stringify(data), this.options).toPromise()
      .then(this.extractedData).catch(err => console.log(err));
  }
  getRolesByStaff(data: any) {
    return this._http.post(this.postEnd.localUrl + '/roles/getStaffById', JSON.stringify(data), this.options).toPromise()
      .then(this.extractedData).catch(err => console.log(err));
  }
  extractedData(res: Response) {
    const body = {};
    return res.json() || {};
  }

  cookieRemoval(name) {
    document.cookie = "token=;expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/"
  }

  sendOTP(userEmail) {
    return this._http.post(this.postEnd.localUrl + '/CIS/sendOtp', JSON.stringify(userEmail), this.options).toPromise()
    .then(this.extractedData).catch(err => console.log(err));
  }
  resetPassword(data) {
    return this._http.post(this.postEnd.localUrl + '/CIS/Staff/resetPassword', JSON.stringify(data), this.options).toPromise()
    .then(this.extractedData).catch(err => console.log(err));
  }

  // this is to logout form app when its inactivity
  inactivityAutoLogout() {
    let time;
    const resetTimer = () => {
      clearTimeout(time);
      time = setTimeout(() => {
        this.pouchDBService.getUser().then(data => {
          if (data && data.pin) {
            this.logoutUser();
          }
        }).catch(error => {
          console.log('Error', error);
        });
      }, 10800000); // 3 hours
    };
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
  }

  logoutUser() {
    this.pouchDBService.removeUser('USER_INFO')
      .then(() => {
          this.snackbar.open('Logged out successfully', 'OK', { duration: 2000 });
          this.ngZone.run(() => this.router.navigate(['/']));
      }).catch((err) => {
          this.snackbar.open('Error logging out. Please contact support', 'OK', { duration: 2000 });
      });
  }

  // logout on close of app
  logoutOnCloseApp() {
    this.electronServiceInstance.ipcRenderer.on('LOGOUT', (event) => {
      this.logoutUser();
    });
  }

}
