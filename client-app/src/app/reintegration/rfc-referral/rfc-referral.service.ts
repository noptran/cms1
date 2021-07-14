import { Injectable } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { environment } from '../../../environments/environment';
import { OtpverficationService } from '../../otpverfication/otpverfication.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class RfcReferralService {
  env = environment.localUrl;
  constructor(public _http: HttpClient, public _home: HomeService, public _otp: OtpverficationService) { }
  referralSave = 'reintegrationFosterCare/save';
  referralGetById = '/reintegrationFosterCare/getById';
  referralUpdate = '/reintegrationFosterCare/update';
  referralYesNoPending = 'reintegrationFosterCare/yesNoUnknown';

  saveReferral(req) {
    return this._http.post(this.env + this.referralSave, JSON.stringify(req)).toPromise().then(this._home.extractedData);
  }

  getByIdReferral(req) {
    return this._http.post(this.env + this.referralGetById, JSON.stringify(req)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }

  updateReferral(req) {
    return this._http.post(this.env + this.referralUpdate, JSON.stringify(req)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);

  }

  listYesNoPendingReferral(req) {
    return this._http.post(this.env + this.referralYesNoPending, JSON.stringify(req)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }



}
