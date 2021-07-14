import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OtpverficationService } from '../../otpverfication/otpverfication.service';
import { HomeService } from '../../home/home.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolInfoService {

  constructor(public _otp: OtpverficationService, public _home: HomeService, public _http: HttpClient) { }
  enviornment = environment;

  getSchoolInfo(req: any) {
    return this._http.post(`${this.enviornment.localUrl}/school/getById`,JSON.stringify(req)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
}
