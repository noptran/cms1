import { Injectable } from '@angular/core';
import { HomeService } from '../home/home.service';
import { environment } from '../../environments/environment';
import { OtpverficationService } from '../otpverfication/otpverfication.service';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ReferralViewService {

  viewFilter: any;
  clientName: any;
  endPoint = environment.localUrl + '/clientReferral/listById';
  referralDetailsAPI = environment.localUrl + '/referral/list/id';
  getReferralRecord = environment.localUrl + '/referral/getById';
  clientId: any;
  selectedReferralId;
  selectedReferralType;
  referralDeatails: any;
  referralData: any;
  constructor(public _openCard: OpencardsService, public _home: HomeService, public _http: HttpClient, public _otp: OtpverficationService) { }


  /**
   * get the general details about the client
   *
   * @param {any} clientID client id
   *
   *
   * @memberOf ReferralViewService
   */
  getClientReferralRelatedDetails(clientID, clientName) {
    console.log('In client ref', this.clientId, clientName);
    this.clientName = clientName;
    this.clientId = clientID;
    localStorage.setItem('CisCaseActivityId', this.clientId);
  }

  /**
   *
   *
   * @returns the clientname, filter, client id
   *
   * @memberOf ReferralViewService
   */
  clientDetails() {
    return Promise.all([{ filter: this.viewFilter, clientName: this.clientName, clientId: this.clientId }]);
  }

  /**
   *
   *
   * @returns client full referral
   *
   * @memberOf ReferralViewService
   */
  getClientReferralDetails() {
    const request = { clientId: this.clientId };
    return this._http.post(this.endPoint, JSON.stringify(request)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /**
   * set the referral ID
   *
   * @param {any} referralId selected referral Id
   * @returns
   *
   * @memberOf ReferralViewService
   */
  setReferralDetails(referralId, referralType) {
    this.selectedReferralType = referralType;
    return this.selectedReferralId = referralId;
  }

  /**
   *
   *
   * @returns the selected referral ID
   *
   * @memberOf ReferralViewService
   */
  getReferralDetails() {
    return [this.selectedReferralId, this.selectedReferralType];
  }

  /**
   * Get the referral type form respective master, For filter the referral card view
   * @param referralType referral or case type
   */
  setReferralType(referralType) {
    this.selectedReferralType = referralType;
  }

  /**
   * @returns the selected referral or case type
   */
  getReferralType() {
    return this.selectedReferralType;
  }

  /**
   *
   * @param referralID referral Id
   * @returns referralID details
   */
  getSelectedReferralDetails(referralID) {
    let req;
    req = { referralID: referralID };
    return this._http.post(this.referralDetailsAPI, JSON.stringify(req)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }


  /**
   *
   * @param req Referral ID
   */
  getReferralRecById(req) {
    const response = this._http.post(this.getReferralRecord, JSON.stringify(req)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
    this.referralData = response;
    let referralTypeId;
    this.referralData.then((data: any) => {
      referralTypeId = data.referral.referralTypeID.referralTypeID + this._openCard.getHasKey();
      localStorage.setItem('referralTypeId', referralTypeId);
    });

    return response;
    // return this._http.post(this.getReferralRecord, JSON.stringify(req)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getReferralData() {
    return this.referralData;
  }



}
