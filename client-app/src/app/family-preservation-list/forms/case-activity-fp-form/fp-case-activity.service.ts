import { Injectable } from '@angular/core';
import { HomeService } from '../../../home/home.service';
import { environment } from '../../../../environments/environment';
import { OtpverficationService } from '../../../otpverfication/otpverfication.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class FpCaseActivityService {

  constructor(public _http: HttpClient, public _home: HomeService, public _otp: OtpverficationService) { }

  update = environment.localUrl + 'caseActivity/form/update';
  save = environment.localUrl + 'caseActivity/form/save';
  clientLists = environment.localUrl + 'client/getAdditionalClients';
  updatecaseActivity(data) {
    return this._http.post(this.update, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  savecaseActivity(data) {
    return this._http.post(this.save, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }
  getAdditionalClientList(data) {
    return this._http.post(this.clientLists, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

}
