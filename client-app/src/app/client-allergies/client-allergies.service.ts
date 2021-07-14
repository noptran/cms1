import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HomeService } from '../home/home.service';
import { OtpverficationService } from '../otpverfication/otpverfication.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClientAllergiesService {

  constructor(public _http: HttpClient, public _home: HomeService, public _otp: OtpverficationService) { }

  list = environment.localUrl + '/clientAllergy/list';
  save = environment.localUrl + '/clientAllergy/save';
  update = environment.localUrl + '/clientAllergy/update';
  record = environment.localUrl + '/clientAllergy/getById';
  allergiesId: any;


  /**
   *
   * @param data client id
   * @returns list of allergies of the client
   */
  getListOfAllergies(data) {
    return this._http.post(this.list, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /***
   * @param data allergies form details
   * @returns stroe the data
   */
  saveAllergy(data) {
    return this._http.post(this.save, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /**
   *
   * @param data allergies form details
   * @returns update the data
   */
  updateAllergy(data) {
    return this._http.post(this.update, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  /**
   *
   * @param id client allergy id
   * @return store the allergy id
   */
  setAllergyId(id) {
    return this.allergiesId = id;
  }

  /**
   * @return the client allergy id
   */
  getAllergyId() {
    return this.allergiesId;
  }

  /**
   *
   * @param data allergy id
   * @return allergy record
   */
  getAllergyById(data) {
    let req;
    req = { clientAllergiesID: data };
    return this._http.post(this.record, JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

}
