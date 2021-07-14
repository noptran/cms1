import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OtpverficationService } from '../otpverfication/otpverfication.service';
import { HomeService } from '../home/home.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TeamFormService {

  endPoint = environment;
  public spName = new BehaviorSubject<string>('');
  currentspName = this.spName.asObservable();
  userName = '';

  constructor(public _http: HttpClient, public _otp: OtpverficationService, public _home: HomeService) { }
  loginData: any;



  getSavedUsers() {

    return this._http.get(this.endPoint.localUrl + '/users').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }
  getTeams() {

    return this._http.get(this.endPoint.localUrl + '/team/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }
  getUserById(data) {
    const response = this._http.post(this.endPoint.localUrl + '/getUserById', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData);
    response.then(data => {
      this.userName = data.users.firstName + ' ' + data.users.lastName;
    });
    this.loginData = response;
    return response;

  }

  getUserName() {
    return this.loginData ? this.loginData : null;
  }

  getTeamById(data) {

    return this._http.post(this.endPoint.localUrl + '/team/getTeamById', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  saveTeam(data) {

    return this._http.post(this.endPoint.localUrl + '/team/save', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  updateTeam(data) {

    return this._http.post(this.endPoint.localUrl + '/team/update', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);

  }
  // userList(data){

  //   return this._http.post(this.endPoint.localUrl+'/usersList',JSON.stringify(data),this.options).toPromise().then(this._home.extractedData)
  //   .catch(this._home.errorHandler)
  // }

  userList(data) {

    return this._http.post(this.endPoint.localUrl + '/person/getPersonByFilter', JSON.stringify(data)).toPromise().then(this._home.extractedData)
      .catch(this._home.errorHandler);
  }

  deleteTeamById(data) {

    return this._http.post(this.endPoint.localUrl + '/team/deleteTeamById', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getStaffName() {

    return this.userName;
  }
  getDataMaintainenceDropDown(req) {
    return this._http.post(this.endPoint.localUrl + '/dataMaintenance/dropdown', JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }
  saveDataMaintainenceMerge(req) {
    return this._http.post(this.endPoint.localUrl + '/dataMaintenance/merge', JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  };
  saveDataMaintainenceMove(req) {
    return this._http.post(this.endPoint.localUrl + '/dataMaintenance/move', JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  };
  getPlacementEventList(req) {
    return this._http.post(this.endPoint.localUrl + '/placementDetail/list', JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }
}
