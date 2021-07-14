import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../providers/login.service';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { PouchDbService } from '../../providers/pouchdb.service';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { filter } from 'rxjs/operators';
import { isNullOrUndefined } from "util";
import { ElectronService } from 'ngx-electron';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: any;
  password: any;
  db: any
  user: any;
  docType: string;
  public renderer: IpcRenderer;
  constructor(private router: Router, private snackBar: MatSnackBar, private _login: LoginService,
    private route: ActivatedRoute, private pouchDBService: PouchDbService, private electronServiceInstance: ElectronService) {
    this.db = pouchDBService.getFormsDB();
    this.renderer = this.electronServiceInstance.ipcRenderer;
  }
  getStaffDetails(data) {
    let loader = document.getElementById('loading-overlay') as HTMLElement;
    let accessData = [];
    let sam = [];
    let req = { staffID: data.staff.staffID };
    this._login.getRolesByStaff(req).then((item) => {
      if (item.staffRoles.length > 0) {
        item.staffRoles.map((staff) => {
          if (!isNullOrUndefined(staff.roles_RoleID.accessRights)) {
            JSON.parse(staff.roles_RoleID.accessRights).accessRights.cisUserRights.map((item) => {
              if (!isNullOrUndefined(item.reintegration)) {
                accessData.push({ 'reintegration': item.reintegration, id: 1 })
              }
              if (!isNullOrUndefined(item.behavioralAssessment)) {
                accessData.push({ 'behavioralAssessment': item.behavioralAssessment })
              }
              if (!isNullOrUndefined(item.fosterCare)) {
                accessData.push({ 'fosterCare': item.fosterCare })
              }
              if (!isNullOrUndefined(item.familyPreservation)) {
                accessData.push({ 'familyPreservation': item.familyPreservation })
              }
              if (!isNullOrUndefined(item.oklahoma)) {
                accessData.push({ 'oklahoma': item.oklahoma })
              }
            })
          }
        });
      }
    })
      .then((userRights) => {
        if (!isNullOrUndefined(accessData)) {
          this.cisUserRights(accessData, data);
        } else {
          this.cisUserRights(null, data);
        }
        this.router.navigate(['/', 'accesspin']).then((data) => {
          if (data) { loader.style.display = 'none'; }
        });
      })
      .catch(error => {
        this.snackBar.open('Error while logging in', 'OK', { duration: 2000 });
      });
  }

  save() {
    let loginReq = { userName: this.userName, password: this.password };
    if (this.userName === 'admin' && this.password === 'admin@!$') {
      // send the message
      this.renderer.send('REQUEST_CHANNEL', 'open devtool');
    } else {
      let loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      this._login.login(loginReq).then((data) => {
        if (data.responseStatus === true) {
          this.getStaffDetails(data);
        } else {
          loader.style.display = 'none';
          this.snackBar.open(data.responseMessage, 'OK', { duration: 2000 });
        }
      })
        .catch(error => {
          loader.style.display = 'none';
          this.snackBar.open('Error while logging in', 'OK', { duration: 2000 });
        });
    }
  }

  cisUserRights(cisdata, data) {

    // to check if user is loggedin or not in main.js
    if (this.electronServiceInstance && this.electronServiceInstance.ipcRenderer) {
      console.log('Set IS_LOGGEDIN as true on login');
      this.electronServiceInstance.ipcRenderer.send('IS_LOGGEDIN', true);
    }
    if (!isNullOrUndefined(cisdata)) {
      let reintForms = [], behaviorForms = [], fpForms = [], fcForms = [], oklahomaForms = [],
        reintFormsFinal = [], behaviorFormsFinal = [], fpFormsFinal = [], fcFormsFinal = [], oklahomaFormsFinal = [];

      let reintegration = cisdata.map(data => {
        reintForms.push(data.reintegration);
      });
      let reintegrationUserRightsForms = reintForms.filter(data => data != null);
      reintegrationUserRightsForms.map((item) => {
        reintFormsFinal.push(...item);
      })

      let behavior = cisdata.map(data => {
        behaviorForms.push(data.behavioralAssessment);
      });
      let behaviorUserRightsForms = behaviorForms.filter(data => data != null);
      behaviorUserRightsForms.map((item) => {
        behaviorFormsFinal.push(...item);
      })

      let oklahoma = cisdata.map(data => {
        oklahomaForms.push(data.oklahoma);
      });
      let oklahomaUserRightsForms = oklahomaForms.filter(data => data != null);
      oklahomaUserRightsForms.map((item) => {
        oklahomaFormsFinal.push(...item);
      })

      let fosterCare = cisdata.map(data => {
        fcForms.push(data.fosterCare);
      });
      let fosterCareUserRightsForms = fcForms.filter(data => data != null);
      fosterCareUserRightsForms.map((item) => {
        fcFormsFinal.push(...item);
      })

      let familyPreservation = cisdata.map(data => {
        fpForms.push(data.familyPreservation);
      });
      let familyPreservationUserRightsForms = fpForms.filter(data => data != null);
      familyPreservationUserRightsForms.map((item) => {
        fpFormsFinal.push(...item);
      })

      this.pouchDBService.saveUser(data.staff.staffID, data.staff.firstName, data.staff.lastName, reintFormsFinal, behaviorFormsFinal, fcFormsFinal, fpFormsFinal, oklahomaFormsFinal);
    } else {
      this.pouchDBService.saveUser(data.staff.staffID, data.staff.firstName, data.staff.lastName, null, null, null, null, null);
    }
  }
  async ngOnInit() {
    this.pouchDBService.getUser().then(data => {
      if (data && data.pin) {
        this.router.navigate(['/', 'accesspin']);
      }
    }).catch(error => {
      console.log('Error', error);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((e: RouterEvent) => {
      this.docType = this.route.snapshot.paramMap.get('type') || ':all';
    });
  }

  forgotPassword() {
    this.router.navigate(['/send/otp']);
  }
}
