import { Injectable } from "@angular/core";
import { HomeService } from "../home/home.service";
import { environment } from "../../environments/environment";
import { OtpverficationService } from "../otpverfication/otpverfication.service";
import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";

@Injectable({
  providedIn: "root",
})
export class EducationEnrollmentService {
  env = environment.localUrl;

  constructor(
    private _http: HttpClient,
    private _httpA: Http,
    private _home: HomeService,
    private _otp: OtpverficationService
  ) { }

  draftSave = "school/saveDraft";
  draftUpdate = "school/saveDraftUpdate";
  finalizeSave = "school/finalSave";

  saveDraft(req) {
    return this._http
      .post(this.env + this.draftSave, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  saveFinalize(req) {
    return this._httpA
      .post(this.env + this.finalizeSave, req)
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  updateDraft(req) {
    return this._http
      .post(this.env + this.draftUpdate, JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }
  defaultUsdUsdName(req) {
    return this._http
      .post(this.env + "/dropDown/contains", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
    // return this._http.post(this.env + '/clientSchool/getUSDByUSDName', JSON.stringify(req)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  getUSD(req) {
    return this._http
      .post(this.env + "/school/getUSD", JSON.stringify(req))
      .toPromise()
      .then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  getHomeCareAndMedicare(req) {
    return this._http.post(this.env + '/school/getEEISPFAutoFetchValues', JSON.stringify(req)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler)
  }
}
