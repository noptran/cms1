import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OtpverficationService } from "./otpverfication.service";
import { otpverfication } from "./otpverification";
import { LoginService } from "../login/login.service";
import swal from "sweetalert2";
import { OpencardsService } from "../opecards-list-view/opencards.service";

@Component({
  selector: "app-otpverfication",
  templateUrl: "./otpverfication.component.html",
  styleUrls: ["./otpverfication.component.scss"],
})
export class OtpverficationComponent implements OnInit {
  otpverfication: otpverfication = new otpverfication();
  showErrorMsg = false;
  showPasssMsg = false;
  ErrorMsg = "";
  showMsg = "";
  testVar: boolean;
  UserId: any;
  UserEmail: any;
  alertMsg: any;
  otpDisable = true;
  otpBtnTxt = "Click to verify";
  rememberMe: any;
  fingerprint: any;
  alertData: any;
  currentBrowser: any;

  constructor(
    public router: Router,
    public _login: OtpverficationService,
    public _delete_cookie: LoginService,
    public _openCard: OpencardsService
  ) {}

  save() {
    if (this.otpverfication.rememberMe) {
      if (this.otpverfication.rememberMe[0] == "checked") {
        (this.otpverfication.rememberMe = true),
          (this.otpverfication.browser = this.currentBrowser);
      }
    }
    if (this.otpverfication.otp) {
      const loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      this.otpDisable = false;
      this.otpBtnTxt = "Verifying...";
      this._openCard.otpCodeVerifcation(this.otpverfication).then((data) => {
        if (data.responseStatus) {
          // localStorage.setItem('userID', JSON.stringify(data.staffID));
          localStorage.setItem("allowToHome", "true");
          localStorage.setItem("verifiedOTP", "true");
          window.location.href = "/childwelfare";
        } else {
          loader.style.display = "none";
          swal(
            "Verfication Failed",
            "Your OTP verification is failed.",
            "info"
          );
          this.otpBtnTxt = "Click to verify";
        }
      });
    } else {
      swal("OTP Missing", "Please enter the OTP", "info");
    }
  }

  resendLink() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    const OTPResend = {
      userEmail: this.otpverfication.userEmail,
    };
    this._login
      .resendOTP(OTPResend)
      .then(() => {
        loader.style.display = "none";
        swal({
          title: "Success",
          text: "New OTP has been sent to your email id!",
          type: "success",
        });
        this.otpverfication = new otpverfication();
      })
      .catch((error) => {
        loader.style.display = "none";
        swal({ title: "Error", text: "Something went wrong!", type: "error" });
      });
  }

  // OTPExpire() {
  //   let saveBtn = document.getElementById('verify-btn') as HTMLInputElement
  //   let resendLink = document.getElementById('reset') as HTMLElement
  //   let returnHomeLink = document.getElementById('return-home') as HTMLElement
  //   saveBtn.style.background = 'red'
  //   saveBtn.style.color = 'white'
  //   saveBtn.disabled = true
  //   saveBtn.innerText = 'Page has Expired!'
  //   resendLink.style.display = 'none';
  //   returnHomeLink.style.display = 'inline-block'
  //   // resendMsg.style.display = 'inline-block'
  //   // resendMsg.style.textAlign = 'center'
  // }

  ngOnInit() {
    // this.alertMsg = 'alert-expire';
    this.fingerprint = (function (window, screen, navigator) {
      function checksum(str) {
        let hash = 5381,
          i = str.length;

        while (i--) {
          hash = (hash * 33) ^ str.charCodeAt(i);
        }

        return hash >>> 0;
      }

      function map(arr, fn) {
        let i = 0,
          len = arr.length,
          ret = [];
        while (i < len) {
          ret[i] = fn(arr[i++]);
        }
        return ret;
      }

      return checksum(
        [
          navigator.userAgent,
          [screen.height, screen.width, screen.colorDepth].join("x"),
          new Date().getTimezoneOffset(),
          ,
          map(navigator.plugins, function (plugin) {
            return [
              plugin.name,
              plugin.description,
              map(plugin, function (mime) {
                return [mime.type, mime.suffixes].join("~");
              }).join(","),
            ].join("::");
          }).join(";"),
        ].join("###")
      );
    })(this, screen, navigator);
    this.redirection();

    // setTimeout(() => {
    //   swal({ title: 'OTP Page has expired', text: 'OTP Page has expired!', type: 'info' }).then((data)=>{
    //     if(data){
    //       return window.location.reload();
    //     }
    //   })
    // }, 600000)
    const pair = document.cookie.match(new RegExp("userEmail" + "=([^;]+)"));
    const sessionObject = document.cookie.match(
      new RegExp("sessionObject" + "=([^;]+)")
    );
    this.otpverfication.userEmail = !!pair ? pair[1] : null;
    const sess = !!sessionObject ? sessionObject[1] : null;
    const ID = document.cookie.match(new RegExp("userId" + "=([^;]+)"));
    this.UserId = !!ID ? ID[1] : null;
    const email = document.cookie.match(new RegExp("userEmail" + "=([^;]+)"));
    this.UserEmail = !!email ? email[1] : null;
    localStorage.setItem("UserId", this.UserId);
    localStorage.setItem("UserEmail", this.UserEmail);

    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }

  otpHelp() {
    const source = document.getElementById("otp-help") as HTMLElement;
    const desc = document.getElementById("otp-help-desc") as HTMLElement;
    if (source.innerText === "Why I need OTP?") {
      source.innerText = "Close";
      desc.style.display = "inline-block";
    }
    if (source.innerText === "Close") {
      desc.style.display = "inline-block";
      source.innerText = "Why I need OTP?";
    }
  }
  close() {
    const info = document.getElementById("otp-help-desc") as HTMLElement;
    info.style.display = "none";
  }

  cookieRemoval() {
    this._delete_cookie.cookieRemoval("token=");
    this.router.navigateByUrl("/");
  }

  redirection() {
    const decissioKey = document.cookie
      .match(new RegExp("redirect" + "=([^;]+)"))
      .toString();
    if (decissioKey == "redirect=home,home") {
      return swal({
        title: "Verified!",
        text: "OTP is already verified",
        type: "info",
      }).then((data) => {
        if (data) {
          this.router
            .navigate(["/childwelfare"])
            .then((data) => {})
            .catch((err) => {});
        }
      });
    }
  }
}
