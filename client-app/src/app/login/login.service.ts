import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class LoginService {
  postEnd = environment;
  constructor(public _http: HttpClient) {}
  postData(data: any) {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    return this._http
      .post(this.postEnd.localUrl + "/login", JSON.stringify(data), { headers: headers })
      .toPromise()
      .then(this.extractedData);
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

  public errorHandler(error: Error): Promise<any> {
    return Promise.reject(error.message || error);
  }

  public extractedData(res: any) {
    return res || {};
  }

  cookieRemoval(name) {
    document.cookie = "token=;expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
  }
}
