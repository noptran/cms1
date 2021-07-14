import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { LoginService } from '../../providers/login.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-confirm-pass',
  templateUrl: './confirm-pass.component.html',
  styleUrls: ['./confirm-pass.component.scss', '../login/login.component.scss']
})
export class ConfirmPassComponent {
  newPassword: any;
  confirmPassword: any;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(private route: Router,
    private snackBar: MatSnackBar, private login: LoginService, ) { }

  submit() {
    if (!isNullOrUndefined(this.newPassword) && !isNullOrUndefined(this.confirmPassword) && this.newPassword === this.confirmPassword) {
      let req = { userEmail: sessionStorage.getItem('userEmail'), password: this.confirmPassword };
      let loader = document.getElementById('loading-overlay') as HTMLElement;
      loader.style.display = 'block';
      this.login.resetPassword(req).then((data) => {
        if (data.responseStatus === true) {
          sessionStorage.setItem('otp', data.otp);
          this.snackBar.open('Your password has been reset successfully. Please login to continue', 'OK', { duration: 3000 });
          this.route.navigate(['']);
        } else {
          loader.style.display = 'none';
          this.snackBar.open(data.responseMessage, 'OK', { duration: 2000 });
        }
      })
        .catch(error => {
          loader.style.display = 'none';
          this.snackBar.open('Error while sending the OTP', 'OK', { duration: 2000 });
        });
    } else {
      this.snackBar.open('Both New and Confirm Password should be the same', 'OK', { duration: 2000 });
    }

  }
  back() {
    this.route.navigate(['/otp']);
  }
}
