import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../providers/login.service';
import { PouchDbService } from '../../providers/pouchdb.service';
import { FormService } from '../../providers/form.service';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-accesspin',
  templateUrl: './accesspin.component.html',
  styleUrls: ['./accesspin.component.scss']
})
export class AccesspinComponent implements OnInit {

  db;
  accessPin: any;
  confirmPin: any;
  user: any = { pin: '' };
  docType: string;
  constructor(private router: Router, private _login: LoginService, private pouchDBService: PouchDbService,
    private formService: FormService, private snackbar: MatSnackBar, private route: ActivatedRoute, private electronServiceInstance: ElectronService) {
    this.db = pouchDBService.getFormsDB();
  }

  ngOnInit() {
    this.pouchDBService.getUser().then(data => {
      console.log('data', data)
      if (data) {
        this.user = data;
        console.log('User found', this.user);
      } else {
        console.log('No User Information Found');
        this.router.navigate(['/']);
      }
    }).catch(error => {
      console.log('Error in retieving user information', error);
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((e: RouterEvent) => {
    });
    this.docType = this.router.url;
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  save() {

    // to check if user is loggedin or not in main.js
    if (this.electronServiceInstance && this.electronServiceInstance.ipcRenderer) {
      console.log('Set IS_LOGGEDIN as true on verify pin');
      this.electronServiceInstance.ipcRenderer.send('IS_LOGGEDIN', true);
    }

    if (!this.accessPin) {
      this.snackbar.open('Please enter your PIN', 'OK', { duration: 2000 });
      return;
    }

    if (this.user && this.user.pin) {
      this.verifyPin();
    } else {
      if (this.accessPin !== this.confirmPin) {
        this.snackbar.open('PIN number does not match. Please retry!', 'OK', { duration: 2000 });
        return;
      }
      if (this.accessPin.length < 4) {
        this.snackbar.open('Please enter four digit number', 'OK', { duration: 2000 });
        return;
      }
      this.savePin();
    }
  }


  savePin() {
    this.pouchDBService.updatePin(this.accessPin)
      .then(() => {
        this.snackbar.open('PIN saved successfully.', 'OK', { duration: 2000 });
        this.router.navigate(['/home/dashboard']);
      }).catch((err) => {
        this.snackbar.open('Error in saving PIN. Please contact support', 'OK', { duration: 2000 });
      });

  }

  verifyPin() {
    this.pouchDBService.getUser().then((user) => {
      if (user.pin === this.accessPin) {
        this.snackbar.open('PIN verification success.', 'OK', { duration: 2000 });
        this.router.navigate(['/home/dashboard']);
      } else {
        this.snackbar.open('Incorrect PIN. Please retry.', 'OK', { duration: 2000 });
      }
    }).catch((err) => {
      console.log('Unable to retrieve user information', err);
      this.snackbar.open('Unable to retrieve user information. Please logout and retry', 'OK', { duration: 2000 });
    });
  }

  logout() {
    this.pouchDBService.removeUser('USER_INFO')
      .then(() => {
        this.snackbar.open('Logged out successfully', 'OK', { duration: 2000 });
        this.router.navigate(['/']);
      }).catch((err) => {
        this.snackbar.open('Error logging out. Please contact support', 'OK', { duration: 2000 });
      })
  }
}
