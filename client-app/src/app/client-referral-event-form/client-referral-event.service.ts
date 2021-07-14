import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HomeService } from '../home/home.service';
import { OtpverficationService } from '../otpverfication/otpverfication.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClientReferralEventService {

  constructor(public _http: HttpClient, public _home: HomeService, public _otp: OtpverficationService) { }

  list = environment.localUrl + '/referralEvent/list';
  save = environment.localUrl + '/referralEvent/save';
  update = environment.localUrl + '/referralEvent/update';
  record = environment.localUrl + '/referralEvent/getById';
  meta = environment.localUrl + '/dropDown/contains';
  referralEventID: any;

  /**
   *
   * @param data referral id
   * @returns list of allergies of the client
   */
  getListOfReferralEvents(data) {
    return this._http.post(this.list, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /***
   * @param data referral event form details
   * @returns stroe the data
   */
  saveReferralEvent(data) {
    return this._http.post(this.save, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /**
   *
   * @param data referral event form details
   * @returns update the data
   */
  updateReferralEvent(data) {
    return this._http.post(this.update, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /**
   *
   * @param id referral event id
   * @return store the referral event id
   */
  setReferralEventId(id) {
    return this.referralEventID = id;
  }

  /**
   * @return the referral event id
   */
  getReferralEventId() {
    return this.referralEventID;
  }

  /**
   *
   * @param data referral event id
   * @return referral event record
   */
  getReferraEventById(data) {
    let req;
    req = { referralEventID: data };
    return this._http.post(this.record, JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /**
   *
   * @param data meta data request
   */
  getReferralEventMetaData(data) {
    return this._http.post(this.meta, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }


}
