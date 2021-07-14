import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { OtpverficationService } from '../otpverfication/otpverfication.service';
import { HomeService } from '../home/home.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(public _http:HttpClient,public _otp:OtpverficationService, public _home:HomeService) { }
  selectedUserID:any
  reportNameUrl = environment.localUrl + '/usersRights/reportName/list'
  updateUrl = environment.localUrl+'/staff/update'
  userListUrl = environment.localUrl+'/usersList'
  userDetailsUrl = environment.localUrl+'/getUserById'
  

  getReportName(data:any){

    return this._http.post(this.reportNameUrl,JSON.stringify(data)).toPromise()
    .then(this._home.extractedData).catch(this._home.errorHandler)
  }
  updateUserRights(data:any){

    return this._http.post(this.updateUrl,JSON.stringify(data)).toPromise()
    .then(this._home.extractedData).catch(this._home.extractedData)
  }
  userList(data){
    return this._http.post(this.userListUrl,JSON.stringify(data)).toPromise()
    .then(this._home.extractedData).catch(this._home.extractedData)
  }
  setUserID(userID) { 
    this.selectedUserID = userID;
  }
  getUserID() {
    return this.selectedUserID;
   }
  
   getUserDetails(data){
    return this._http.post(this.userDetailsUrl,JSON.stringify(data)).toPromise()
    .then(this._home.extractedData).catch(this._home.extractedData)
   }
 
}
