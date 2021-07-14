import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss', '../login/login.component.scss']
})
export class OtpComponent implements OnInit {
  public otp: any = {
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
    sixth: ''
  };
  public otpFocus: any = {
    first: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false
  };
  public isInvalid = false;
  userEmail: any;
  finalOtp: any;
  constructor(private route: Router, private snackBar: MatSnackBar, ) { }
  ngOnInit() {
    this.userEmail = sessionStorage.getItem('userEmail');
    setInterval(() => {
      sessionStorage.removeItem('otp');
    }, 1000 * 60 * 5);
  }
  next(event: any, el, currentIndex) {
    if (event.target.value !== '') {
      el.focus();

      this.otpFocus[currentIndex] = true;
    }
  }

  delete(el, currentIndex, previousIndex) {
    if (this.otp[currentIndex] === '' && el && previousIndex) {
      this.otp[previousIndex] = '';
      el.focus();
    } else {
      this.otp[currentIndex] = '';
      this.isInvalid = false;
    }
    this.otpFocus[currentIndex] = false;
  }
  authenticate(event: any) {
    this.otpFocus.sixth = true;
    if (event.target.value !== '') {
      this.otp.sixth = event.target.value;
      const otpLength = Object.keys(this.otp).length;

      if (otpLength === 6) {
        const otpValue = Object.values(this.otp);
        this.finalOtp = otpValue.join('');
      }
    }
  }
  verify() {
    if (this.finalOtp === sessionStorage.getItem('otp')) {
      this.route.navigate(['confirm/pass']);
      clearInterval();
    } else if (isNullOrUndefined(sessionStorage.getItem('otp'))) {
      this.snackBar.open('OTP got expired', 'OK', { duration: 2000 });
      clearInterval();
    } else {
      this.snackBar.open('Please enter the OTP sent to your Email address', 'OK', { duration: 2000 })
    }
  }
  back() {
    clearInterval();
    this.route.navigate(['/send/otp']);
  }
}
