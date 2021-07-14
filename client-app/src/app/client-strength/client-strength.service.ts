import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HomeService } from '../home/home.service';
import { OtpverficationService } from '../otpverfication/otpverfication.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ClientStrengthService {

  constructor(public _http: HttpClient, public _home: HomeService, public _otp: OtpverficationService) { }
  clientStrengthId: any;

  list = environment.localUrl + '/clientStrength/list';
  record = environment.localUrl + '/clientStrength/getById ';
  save = environment.localUrl + '/clientStrength/save';
  update = environment.localUrl + '/clientStrength/update';
  meta = environment.localUrl + '/dropDown/contains';


  /**
   *
   * @param data client id
   * @returns list of client strengths
   */
  getListOfClientStrength(data) {
    return this._http.post(this.list, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /**
   *
   * @param data client strength record id
   * @returns record of client strength
   */
  getClientStrengthRecord(data) {
    let req;
    req = { clientStrengthID: data };
    return this._http.post(this.record, JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /**
   *
   * @param data client strength details
   * @returns store the client strength details
   */
  saveClientStrength(data) {
    return this._http.post(this.save, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /**
   *
   * @param data client strength details
   * @returns update the client strength details
   */
  updateClientStrength(data) {
    return this._http.post(this.update, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /**
   *
   * @param data meta data object type and value
   * @returns meta data
   */
  metadataOfClientStrength(data) {
    return this._http.post(this.meta, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /**
   *
   * @param data client strength id
   */
  setClientStrengthId(data) {
    return this.clientStrengthId = data;
  }

  /**
   * @returns client strenght id
   */
  getClientStrengthId() {
    return this.clientStrengthId;
  }





}
