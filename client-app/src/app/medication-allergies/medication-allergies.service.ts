import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HomeService } from '../home/home.service';
import { OtpverficationService } from '../otpverfication/otpverfication.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MedicationAllergiesService {

  constructor(public _http: HttpClient, public _home: HomeService, public _otp: OtpverficationService) { }
  list = environment.localUrl + '/clientMedication/list';
  save = environment.localUrl + '/clientMedication/save';
  update = environment.localUrl + '/clientMedication/update';
  meta = environment.localUrl + '/dropDown/contains';
  record = environment.localUrl + '/clientMedication/getById'
  medicationId: any;

  /**
   * 
   * @param data client id
   * @returns list of medication of the client
   */
  getListOfMedication(data) {
    return this._http.post(this.list, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler)
  }

  /***
   * @param data medication form details
   * @returns stroe the data
   */
  saveMedication(data) {
    return this._http.post(this.save, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler)
  }

  /**
   * 
   * @param data medication form details
   * @returns update the data
   */
  updateMedication(data) {
    return this._http.post(this.update, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler)
  }

  /****
   * @param data object type
   * @returns metadata
   */
  getMetadata(data) {
    return this._http.post(this.meta, JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler)
  }
  /**
   * 
   * @param id client medication id
   * @return store the medication id
   */
  setMedicationId(id) {
    return this.medicationId = id;
  }

  /**
   * @return the client medication id
   */
  getMedicationId() {
    return this.medicationId;
  }

  /**
   * 
   * @param req request
   * @return medication record
   */
  getMedicationById(req) {
    return this._http.post(this.record, JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler)
  }


}
