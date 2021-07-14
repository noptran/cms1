import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { LoginService } from '../../providers/login.service';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.scss', '../login/login.component.scss']
})
export class SendOtpComponent {
  userName: any;

  constructor(private router: Router, private snackBar: MatSnackBar,
    private login: LoginService, ) { }

  sendOtp() {
    let req = { userEmail: this.userName };
    let loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    this.login.sendOTP(req).then((data) => {
      if (data.responseStatus === true) {
        sessionStorage.setItem('otp', data.otp);
        sessionStorage.setItem('userEmail', this.userName);
        this.router.navigate(['/otp']);
      } else {
        loader.style.display = 'none';
        this.snackBar.open(data.responseMessage, 'OK', { duration: 2000 });
      }
    })
      .catch(error => {
        loader.style.display = 'none';
        this.snackBar.open('Error while sending the OTP', 'OK', { duration: 2000 });
      });
  }
  back() {
    this.router.navigate(['']);
  }
}
