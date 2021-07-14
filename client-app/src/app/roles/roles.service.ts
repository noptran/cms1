import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OtpverficationService } from '../otpverfication/otpverfication.service';
import { HomeService } from '../home/home.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoleService {

  endPoint = environment;
  public spName = new BehaviorSubject<string>('');
  currentspName = this.spName.asObservable();
  constructor(public _http: HttpClient,public _otp:OtpverficationService, public _home:HomeService) { }

  getRoles(){
    return this._http.get(this.endPoint.localUrl + '/module/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  saveRoles(){
    return this._http.get(this.endPoint.localUrl + '/userRoles/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  saveUserRights(data){
    return this._http.post(this.endPoint.localUrl + '/module/save', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  saveModuleToUser(data){
    return this._http.post(this.endPoint.localUrl + '/userRoles/save', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }
  
   
  predefinedReportsList(){
    return this._http.get(this.endPoint.localUrl + '/subModule/predefinedReports/list ').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  customReportsList(){
    return this._http.get(this.endPoint.localUrl + '/subModule/customReports/list ').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  adminSettingsList(){
    return this._http.get(this.endPoint.localUrl + '/subModule/adminSettings/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }
  
}
