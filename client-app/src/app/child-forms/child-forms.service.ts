import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OtpverficationService } from '../otpverfication/otpverfication.service';
import { HomeService } from '../home/home.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()

export class ClildFormService {
  constructor(public router: Router, public _http: HttpClient, public _otp: OtpverficationService, public _home: HomeService) { }

  id: any;
  endPoint = environment;
  public spName = new BehaviorSubject<string>('');
  currentspName = this.spName.asObservable();
  eeispfFormStatus: any;
  getByPersonData: any;
  familyDetail: any;

  getSavedUsers() {
    return this._http.get(this.endPoint.localUrl + '/users').toPromise()
      .then().catch(this._home.errorHandler);
  }
  saveOrg2(data) {

    return this._http.post(this.endPoint.localUrl + '/organization/save', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getPerson(data) {
    return this._http.post(this.endPoint.localUrl + '/person/getPersonByFilter', JSON.stringify(data)).toPromise()
    .then(this._home.extractedData).catch(this._home.errorHandler);
  }
  getPersonById(data) {

    return this._http.get(this.endPoint.localUrl + '/getChild/' + data).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getStaffById(data) {

    return this._http.post(this.endPoint.localUrl + '/staff/getStaffById', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  updateStaff(data) {

    return this._http.post(this.endPoint.localUrl + '/staff/update', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getOrganizationById(data) {

    return this._http.post(this.endPoint.localUrl + '/organization/getOrganizationById', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }
  getOrganisationList() {

    return this._http.get(this.endPoint.localUrl + '/organization/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);

  }

  getGroupFilters(data) {

    return this._http.post(this.endPoint.localUrl + '/subFilterCategory', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  saveClient(data) {

    return this._http.post(this.endPoint.localUrl + '/person/save', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getDhhsStaff() {

    return this._http.get(this.endPoint.localUrl + '/dhhsStaff/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getDhsStaff() {

    return this._http.get(this.endPoint.localUrl + '/dhsOffice/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  saveStaff(data) {

    return this._http.post(this.endPoint.localUrl + '/staff/save', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }


  getDetailsById(data) {
    return this._http.post(this.endPoint.localUrl + '/person/getByPerson', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }



  updateClient(data) {

    return this._http.post(this.endPoint.localUrl + '/person/update', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getRace() {

    return this._http.get(this.endPoint.localUrl + '/race/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getEthnicity() {

    return this._http.get(this.endPoint.localUrl + '/ethnicity/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getTribe() {

    return this._http.get(this.endPoint.localUrl + '/tribe/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getInsuranceType() {

    return this._http.get(this.endPoint.localUrl + '/insuranceType/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }


  getZipcode() {

    return this._http.get(this.endPoint.localUrl + '/zipcode/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getCity() {

    return this._http.get(this.endPoint.localUrl + '/city/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getCounty() {

    return this._http.get(this.endPoint.localUrl + '/county/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getState() {

    return this._http.get(this.endPoint.localUrl + '/state/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getTenure() {

    return this._http.get(this.endPoint.localUrl + '/tenure/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getReligion() {

    return this._http.get(this.endPoint.localUrl + '/religion/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getLanguage() {

    return this._http.get(this.endPoint.localUrl + '/language/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getEducationLevel() {

    return this._http.get(this.endPoint.localUrl + '/educationLevel/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getEmploymentStatus() {

    return this._http.get(this.endPoint.localUrl + '/employmentStatus/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getCsoStaff() {

    return this._http.get(this.endPoint.localUrl + '/csoStaff/list').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getDropdownValue(data) {

    return this._http.post(this.endPoint.localUrl + '/dropDown/contains', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  checkReintegration(data) {
    return this._http.post(this.endPoint.localUrl + '/clientReferral/check', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getCityFromState(data) {
    return this._http.post(this.endPoint.localUrl + '/dropDown/state', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getZipcodeFromCityState(data) {
    return this._http.post(this.endPoint.localUrl + '/dropDown/zipcode', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  storeId(data) {
    this.id = data;
    localStorage.setItem('clildFormId', JSON.stringify(data));
    console.log('this.id', this.id);
  }

  getId() {
    if (this.id) {
      return this.id;
    } else {
      return parseInt(localStorage.getItem('clildFormId'));
    }
  }
  storeClientId(data) {
    this.familyDetail = data;
  }

  getClientId() {
    return this.familyDetail;
  }

  setEsispfFormStatus(status: any) { this.eeispfFormStatus = status; }

  getEsipfFormStatus() { return this.eeispfFormStatus; }

  /**
   *
   * @param req clientName
   */
  getClientByName(req) {
    return this._http.post(this.endPoint.localUrl + '/searchByClientName', JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getEncounterReports(req: any) {
    return this._http.post(this.endPoint.localUrl + '/claim/encounterReport', JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getPersonData() {
    return this.getByPersonData;
  }

  getExportFile(req: any) {
  if (this.router.url.includes('/live')) {
      req.userId = 4620;
      return this._http.post('https://preprod-cms.st-francis.org/tomcat/exportReport' , JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      req.userId = parseInt(req.userId);
      return this._http.post(this.endPoint.localUrl + 'exportReport', JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }
  getRolesList(req: any) {
    return this._http.post(this.endPoint.localUrl + '/roles/list', JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getSearchTypes(data) {
    return this._http.post(this.endPoint.localUrl + '/getSearchType', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getPlacementExportFile(req: any) {
    return this._http.post(this.endPoint.localUrl + 'placement/export', JSON.stringify(req)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  checkReferralValidation(data) {
    return this._http.post(this.endPoint.localUrl + '/referral/findOpenCases', JSON.stringify(data)).toPromise()
    .then(this._home.extractedData).catch(this._home.errorHandler);
  }




}
