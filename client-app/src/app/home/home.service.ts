import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from "../../environments/environment";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { LoginService } from "../login/login.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable()
export class HomeService {
  message = new Subject<string>();
  postEnd = environment;
  public messageSource = new BehaviorSubject<string>("");
  public textSource = new BehaviorSubject<string>("true");
  currentMessage = this.messageSource.asObservable();
  Sidenav = this.textSource.asObservable();
  getUser = environment.localUrl + "/getUserById";
  local: any;

  constructor(
    public _router: Router,
    public _login: LoginService,
    public _http: HttpClient
  ) {}

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  sidenav(text: any) {
    this.textSource.next(text);
  }

  // getUserDetail(data){
  //   return this._http.post(this.getUser,JSON.stringify(data),this.options).toPromise().then(this.extractedData).catch(this.errorHandler)
  //  }

  //  getUserDetail(data){
  //    let headers = new HttpHeaders()
  //    headers.append('Content-Type', 'application/json')
  //    headers.append('Authorization','7'+' '+'138273827387')
  //  console.log("HttpHeaders **",headers)
  //    let options  = new RequestOptions({headers:headers})
  //     console.log("options",options)
  //    return this._http.post(this.getUser,JSON.stringify(data),options).toPromise().then(this.extractedData).catch(this.errorHandler)

  //  }

  userPrivilage() {
    const privilage = JSON.parse(localStorage.getItem("userPrivilage"));
    //   let res={
    //     "privilageName":"TeamCreated",
    //     "predefinedreports":null,
    //     "customReports":null,
    //     "adminSettings":[
    //        {
    //           "id":2,
    //           "adminSettings":"MyOrganization"
    //        }
    //     ]
    //  }
    // let privilage = {
    //   "privilageName": "TeamCreated",
    //   "predefinedreports": [
    //     {
    //       "id": 1,
    //       "predefinedReports": "PsychiatricResidentialTreatment"
    //     }
    //   ],
    //   "customReports": [
    //     {
    //       "id": 1,
    //       "customReport": "yourReports"
    //     }
    //   ],
    //   "adminSettings": [
    //     {
    //       "id": 2,
    //       "adminSettings": "MyOrganization"
    //     }
    //   ]
    // }
    return privilage;
  }
  errorHandler(error: any) {
    let responseMessage, statusCode;
    statusCode = error.status;
    console.log("Error", error);
    console.log("Http status code", statusCode);
    if (statusCode !== undefined) {
      switch (statusCode) {
        case 0:
          responseMessage = "Unable to connect the server!";
          break;
        case 400:
          responseMessage = "Bad Request!";
          break;
        case 403:
          responseMessage = "Cannot access the requested resource!";
          break;
        case 404:
          responseMessage = "Requested resource was not found!";
          break;
        case 405:
          responseMessage = "Method Not Allowed!";
          break;
        case 408:
          responseMessage = "Request Timeout!";
          break;
        case 500:
          responseMessage = "Internal Server Error!";
          break;
        case 502:
          responseMessage = "Bad Gateway!";
          break;
        case 504:
          responseMessage = "Gateway Timeout!";
          break;
      }
      if (statusCode === 401) {
        return swal({
          title: statusCode ? statusCode.toString() : "Error",
          text: "Your session has expired! Please login again",
          type: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Login",
        }).then((data) => {
          if (data) {
            if (document.cookie.length > 0) {
              const cookies = document.cookie.split(";");

              for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie =
                  name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
              }
              localStorage.clear();
            }
            window.location.replace("/");
          }
        });
      } else {
        return swal({
          title: statusCode ? statusCode.toString() : "Error",
          text: responseMessage,
          type: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Try again!",
        }).then((data) => {
          if (data) {
            // window.location.reload();
          }
        });
      }
    }
  }

  extractedData(res: any) {
    console.log("Extracted data ***", res);
    const result = res;
    console.log("TkStatus", result.tokenStatus);
    if (result.tokenStatus === false) {
      return swal({
        title: "warning!",
        text: result.tokenMessage,
        type: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Contact administrator!",
      });
    }
    return res || {};
  }

  /**
   *
   *
   * @param {any} action action of the pagination
   * @param {any} totalCount total number of records
   * @param {any} initialCount initial count of the pagination
   * @param {any} lastCount last count of the pagination
   * @returns processed initial count and last count
   *
   * @memberOf HomeService
   */
  pagination(action, totalCount, initialCount, lastCount) {
    switch (action) {
      case "next":
        if (totalCount > 100) {
          initialCount += 100;
          lastCount += 100;
        } else {
          initialCount = 1;
          lastCount = totalCount;
        }
        break;
      case "previous":
        if (initialCount > 1) {
          initialCount -= 100;
          lastCount -= 100;
        } else {
          initialCount = 1;
          lastCount = totalCount;
        }
        break;
      case "first":
        if (totalCount > 100) {
          initialCount = 1;
          lastCount = 100;
        } else {
          initialCount = 1;
          lastCount = totalCount;
        }
        break;
      case "last":
        if (totalCount > 100) {
          initialCount = totalCount - 100;
          lastCount = totalCount;
        } else {
          initialCount = totalCount;
          lastCount = totalCount;
        }
        break;
      default:
        initialCount = 1;
        lastCount = 100;
    }
    return Promise.all([initialCount, lastCount]);
  }

  /**
   * Controller for switch create form and edit form
   *
   * @returns
   *
   * @memberOf HomeService
   */
  formSwitch() {
    let currentURL, formController;
    currentURL = this._router.url;
    console.log("After split ***", currentURL.split("/"));
    formController = currentURL.split("/");
    return Promise.all(formController);
  }

  // public errorHandler(error: Error): Promise<any> {
  //   return Promise.reject(error.message || error);
  // }

  // public extractedData(res: Response) {
  //   const body = {};
  //   return res.json() || {};
  // }

  userId() {
    // let userId = '7';
    const userId = localStorage.getItem("UserId");
    console.log("userId", userId);
    return userId;
  }
  localMainMenu() {
    return (this.local = JSON.parse(localStorage.getItem("Reports")));
  }

  sucessAlert(result) {
    return swal({
      title: "Success!",
      text: result.responseMessage,
      type: "success",
    }).then((data) => {
      if (data) {
        // call the token regnerate API
      }
    });
  }

  triggerSfmTransportJPT(value) {
    this.message.next(value);
  }

  logOut(data: any) {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    return this._http
      .post(this.postEnd.localUrl + "/logout", JSON.stringify(data), { headers: headers })
      .toPromise()
      .then(this.extractedData);
  }
}
