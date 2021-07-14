import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OtpverficationService } from '../otpverfication/otpverfication.service';
import { HomeService } from '../home/home.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class PrioritizedReportsService {

  endPoint = environment;
  public spName = new BehaviorSubject<string>('');
  currentspName = this.spName.asObservable();
  constructor(public _http: HttpClient, public _otp: OtpverficationService, public _home: HomeService, public _router: Router, ) {

   }


  getData() {

    return this._http.get(this.endPoint.localUrl + '/prioritizedMainMenuSearch').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getAllFilters(reportsMenuId) {

    return this._http.post(this.endPoint.localUrl + '/getAllFilters', JSON.stringify(reportsMenuId)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getPrioritizedReports(menuType) {

    return this._http.post(this.endPoint.localUrl + '/prioritizedFilterSearch', JSON.stringify(menuType)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getViewReportSource(reports) {

    return this._http.post(this.endPoint.localUrl + '/reportsByName', JSON.stringify(reports)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getTableArray(elements) {

    return this._http.post(this.endPoint.localUrl + '/getTableArray', JSON.stringify(elements)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }


  getReportsByFilter(data: any) {

    return this._http.post(this.endPoint.localUrl + '/getReportsByFilter', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getReportsByDateFilter(data: any) {

    return this._http.post(this.endPoint.localUrl + '/filterByDate', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  getDashBoardLink(data: any) {

    return this._http.post(this.endPoint.localUrl + '/getDashboardLink', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  subFilterCategory(data: any) {

    return this._http.post(this.endPoint.localUrl + '/subFilterCategory', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }
  getLogo(data: any) {

    return this._http.post(this.endPoint.localUrl + '/subFilterCategory', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  saveFilter(data: any) {

    return this._http.post(this.endPoint.localUrl + '/predefinedReport/favoriteFilter/save', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  updateFilter(data: any) {

    return this._http.post(this.endPoint.localUrl + '/predefinedReport/favoriteFilter/updateByFavoriteFilterId', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }


  getFavourites(data) {

    return this._http.post(this.endPoint.localUrl + '/predefinedReport/favoriteFilter/getByUserId', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }


  deleteFavourites(data) {

    return this._http.post(this.endPoint.localUrl + '/predefinedReport/favoriteFilter/deleteByFavoriteFilterId', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
  }

  changeSpName(data: any) {
    console.log('changeSpName', data, typeof(data));
    this.spName.next(data);
  }


  getExportReportByUseId(data) {
    if (this._router.url === '/live-myExports') {
      console.log('current url>>>>>>', this._router.url);
      return this._http.post('https://preprod-cms.st-francis.org/tomcat/exportReportByUseId', JSON.stringify({ 'userId': 4620 })).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      return this._http.post(this.endPoint.localUrl + '/exportReportByUseId', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }

  exportReport(data) {
    if (this._router.url === '/reports/live-prioritized') {
      return this._http.post('https://preprod-cms.st-francis.org/tomcat/exportReport', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      return this._http.post(this.endPoint.localUrl + '/exportReport', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    }

  }

  clearExportsRecord(data) {
    if (this._router.url === '/live-myExports') {
      console.log('current url>>>>>>', this._router.url);
      return this._http.post('https://preprod-cms.st-francis.org/tomcat/clearAllExportByUseId', JSON.stringify({ userId: 4620 })).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      return this._http.post(this.endPoint.localUrl + '/clearAllExportByUseId', JSON.stringify(data)).toPromise()
    .then(this._home.extractedData).catch(this._home.errorHandler);
    }

  }

  getPreDefinedReport(data) {
    if (this._router.url === '/reports/live-prioritized') {
      console.log('current url>>>>>>', this._router.url);
      return this._http.post('https://preprod-cms.st-francis.org/tomcat/reports/predefinedReports/getReport', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      console.log('current url>>>>>>', this._router.url);
      return this._http.post(this.endPoint.localUrl + '/reports/predefinedReports/getReport', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }

  getReferralType(data) {
    if (this._router.url === '/reports/live-prioritized') {
      console.log('current url>>>>>>', this._router.url);
      return this._http.post('https://preprod-cms.st-francis.org/tomcat/reports/getReferralGroups', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      console.log('current url>>>>>>', this._router.url);
      return this._http.post(this.endPoint.localUrl + '/reports/getReferralGroups', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }

  getDHF_regions_Data() {
    if (this._router.url === '/reports/live-prioritized') {
      console.log('current url>>>>>>', this._router.url);
      return this._http.get('https://preprod-cms.st-francis.org/tomcat/reports/getDHSRegionGroups').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      console.log('current url>>>>>>', this._router.url);
      return this._http.get(this.endPoint.localUrl + '/reports/getDHSRegionGroups').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }

  getResourceWorker_Data() {
    if (this._router.url === '/reports/live-prioritized') {
      console.log('current url>>>>>>', this._router.url);
      return this._http.get('https://preprod-cms.st-francis.org/tomcat/reports/getResourceWorker').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      console.log('current url>>>>>>', this._router.url);
      return this._http.get(this.endPoint.localUrl + '/reports/getResourceWorker').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }
  getResourceSupervisor_Data() {
    if (this._router.url === '/reports/live-prioritized') {
      console.log('current url>>>>>>', this._router.url);
      return this._http.get('https://preprod-cms.st-francis.org/tomcat/reports/getResourceSupervisor').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      console.log('current url>>>>>>', this._router.url);
      return this._http.get(this.endPoint.localUrl + '/reports/getResourceSupervisor').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }
  getCatchmentArea_Data() {
    if (this._router.url === '/reports/live-prioritized') {
      console.log('current url>>>>>>', this._router.url);
      return this._http.get('https://preprod-cms.st-francis.org/tomcat/reports/getCatchmentArea').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      console.log('current url>>>>>>', this._router.url);
      return this._http.get(this.endPoint.localUrl + '/reports/getCatchmentArea').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }
  getSFA_office_Data() {
    if (this._router.url === '/reports/live-prioritized') {
        console.log('current url>>>>>>', this._router.url);
        return this._http.get('https://preprod-cms.st-francis.org/tomcat/sfaOffice/findAll').toPromise()
        .then(this._home.extractedData).catch(this._home.errorHandler);
      } else {
        console.log('current url>>>>>>', this._router.url);
        return this._http.get(this.endPoint.localUrl + '/sfaOffice/findAll').toPromise()
        .then(this._home.extractedData).catch(this._home.errorHandler);
      }
  }
  getFCHlevelOfCare_Data() {
    if (this._router.url === '/reports/live-prioritized') {
        console.log('current url>>>>>>', this._router.url);
        return this._http.get('https://preprod-cms.st-francis.org/tomcat/reports/getFCHLevelOfCare').toPromise()
        .then(this._home.extractedData).catch(this._home.errorHandler);
      } else {
        console.log('current url>>>>>>', this._router.url);
        return this._http.get(this.endPoint.localUrl + '/reports/getFCHLevelOfCare').toPromise()
        .then(this._home.extractedData).catch(this._home.errorHandler);
      }
  }
  getCounty_Data() {
    if (this._router.url === '/reports/live-prioritized') {
        console.log('current url>>>>>>', this._router.url);
        return this._http.get('https://preprod-cms.st-francis.org/tomcat/reports/getCounty').toPromise()
        .then(this._home.extractedData).catch(this._home.errorHandler);
      } else {
        console.log('current url>>>>>>', this._router.url);
        return this._http.get(this.endPoint.localUrl + '/reports/getCounty').toPromise()
        .then(this._home.extractedData).catch(this._home.errorHandler);
      }
  }

  getUserDetail(data) {
    if (this._router.url === '/reports/live-prioritized') {
      console.log('current url>>>>>>', this._router.url);
      return this._http.post('https://preprod-cms.st-francis.org/tomcat/getUserById', JSON.stringify({ staffID: 4620 })).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      console.log('current url>>>>>>', this._router.url);
      return this._http.post(this.endPoint.localUrl + '/getUserById', JSON.stringify(data)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }
  getRiskmangementReferrals(data) {
    if (this._router.url === '/reports/live-prioritized') {
      return this._http.post('https://preprod-cms.st-francis.org/tomcat/referralType/getRiskMgmtReferrals', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      return this._http.post(this.endPoint.localUrl + '/referralType/getRiskMgmtReferrals', JSON.stringify(data)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }
  getRegionReferalGroup(data) {
    if (this._router.url === '/reports/live-prioritized') {
      return this._http.post('https://preprod-cms.st-francis.org/tomcat/reports/getRiskMgmtDCFRegionGroup', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      return this._http.post(this.endPoint.localUrl + '/reports/getRiskMgmtDCFRegionGroup', JSON.stringify(data)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }
  getSponcers(data) {
    if (this._router.url === '/reports/live-prioritized') {
      return this._http.post('https://preprod-cms.st-francis.org/tomcat/sponsor/getUISponsorList', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      return this._http.post(this.endPoint.localUrl + '/sponsor/getUISponsorList', JSON.stringify(data)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }
  getProvider(data) {
    if (this._router.url === '/reports/live-prioritized') {
      return this._http.post('https://preprod-cms.st-francis.org/tomcat/provider/getUIProviderList', JSON.stringify(data)).toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      return this._http.post(this.endPoint.localUrl + '/provider/getUIProviderList', JSON.stringify(data)).toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }
  getProcodes() {
    if (this._router.url === '/reports/live-prioritized') {
      console.log('current url>>>>>>', this._router.url);
      return this._http.get('https://preprod-cms.st-francis.org/tomcat/reports/getDistinctProcode').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    } else {
      console.log('current url>>>>>>', this._router.url);
      return this._http.get(this.endPoint.localUrl + '/reports/getDistinctProcode').toPromise()
      .then(this._home.extractedData).catch(this._home.errorHandler);
    }
  }

}
