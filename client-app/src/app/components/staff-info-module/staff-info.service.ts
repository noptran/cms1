import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OtpverficationService } from '../../otpverfication/otpverfication.service';
import { HomeService } from '../../home/home.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StaffInfoService {
    constructor(public _otp: OtpverficationService, public _home: HomeService, public _http: HttpClient) { }
    enviornment = environment;

    getStaffInfo(req: any) {
        return this._http.post(`${this.enviornment.localUrl}/person/getProfileInfo`, JSON.stringify(req)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
    }
    getStaffNameInfo(req: any) {
        return this._http.post(`${this.enviornment.localUrl}/transfer/getStaffTeamMembers`, JSON.stringify(req)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
    }
}
