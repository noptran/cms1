import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { OtpverficationService } from '../otpverfication/otpverfication.service';
import { HomeService } from '../home/home.service';
import { isNullOrUndefined } from 'util';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReferralsService {

  referralIdURL = environment.localUrl + '/referral/list/id';
  listOfReferral = environment.localUrl + '/referral/listAllReferralType';
  referralListview = environment.localUrl + '/referral/list';
  reintergationSave = environment.localUrl + '/referral/save';
  familyPreservationSave = environment.localUrl + '/familyPreservation/save';
  updateFamilyPreservation = environment.localUrl + '/familyPreservation/update';
  referralId: any

  constructor(public _http: HttpClient, public _otp: OtpverficationService, public _home: HomeService) { }


  getReferralListview(data) {
    return this._http.post(this.referralListview, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }
  getReferralById(data) {
    return this._http.post(this.referralIdURL, JSON.stringify(data)).toPromise().
      then(this._home.extractedData).catch(this._home.errorHandler)
  }

  getListOfReferrals() {
    return this._http.get(this.listOfReferral).toPromise().
      then(this._home.extractedData).catch(this._home.errorHandler)
  }

  /**
   * @return referral ID
   * @param data referral
   */
  setReferralDetails(data) {
    return this.referralId = data
  }

  getRefferalDetails() {
    return this.referralId;
  }

  saveReintegration(data) {
    return this._http.post(this.reintergationSave, JSON.stringify(data)).toPromise().
      then(this._home.extractedData).catch(this._home.errorHandler)
  }

  /***
   * param data   - family preservation object
   * return store the record
   */
  familyPreservationPost(data) {


    return this._http.post(this.familyPreservationSave, JSON.stringify(data)).toPromise().
      then(this._home.extractedData).catch(this._home.errorHandler)
  }

  /**
   *
   * @param source rowdata
   * @return convert timestamp value to localtime
   */
  timeStampToDateConversion(source) {
    return source.map(data => {
      !isNullOrUndefined(data.DOB) ? data.DOB = new Date(data.DOB).toLocaleDateString() : null;
      !isNullOrUndefined(data.Date) ? data.Date = new Date(data.Date).toLocaleDateString() : null;
      data.NotificationDate !== null && data.NotificationDate !== undefined ? data.NotificationDate = new Date(data.NotificationDate).toLocaleDateString() : null;
      data.BeginDate !== null && data.BeginDate !== undefined ? data.BeginDate = new Date(data.BeginDate).toLocaleDateString() : null;
      data.EndDate !== null && data.EndDate !== undefined ? data.EndDate = new Date(data.EndDate).toLocaleDateString() : null;
      data.DiscoveryDate !== null && data.DiscoveryDate !== undefined ? data.DiscoveryDate = new Date(data.DiscoveryDate).toLocaleDateString() : null;
      data.IncidentDate !== null && data.IncidentDate !== undefined ? data.IncidentDate = new Date(data.IncidentDate).toLocaleDateString() : null;
      data.FollowUpCompletedDate !== null && data.FollowUpCompletedDate !== undefined ? data.FollowUpCompletedDate = new Date(data.FollowUpCompletedDate).toLocaleDateString() : null;
      data.IncidentTime !== null && data.IncidentTime !== undefined ? data.IncidentTime = new Date(data.IncidentTime).toTimeString() : null;
      !isNullOrUndefined(data.completedDate) ? data.completedDate = new Date(data.completedDate).toLocaleDateString() : null;
      !isNullOrUndefined(data.dateSentToSRS) ? data.dateSentToSRS = new Date(data.dateSentToSRS).toLocaleDateString() : null;
      !isNullOrUndefined(data.dueDate) ? data.dueDate = new Date(data.dueDate).toLocaleDateString() : null;
      !isNullOrUndefined(data.beginDate) ? data.beginDate = new Date(data.beginDate).toLocaleDateString() : null;
      !isNullOrUndefined(data.endDate) ? data.endDate = new Date(data.endDate).toLocaleDateString() : null;
    })
  }

  familyPreservationUpdate(data) {
    return this._http.post(this.updateFamilyPreservation, JSON.stringify(data)).toPromise().
      then(this._home.extractedData).catch(this._home.errorHandler)
  }



}
