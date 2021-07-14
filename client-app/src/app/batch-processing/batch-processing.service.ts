import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home/home.service';
import { OtpverficationService } from '../otpverfication/otpverfication.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BatchProcessingService {
  endPoint = environment;
  paymentType = '/providerPayment/providerPaymentType';
  recreateBatchName = '/providerPayment/recreateBatchName';
  newClaimProcess = '/providerPayment/newClaimProcess';
  getbatchName = '/providerPayment/getbatchName';
  save = '/providerPayment/save';
  batchStatusLimitSelection = '/providerPayment/batchstatus/limitSelection';
  batchStatusIsotherAgency = '/providerPayment/batchstatus/paymentBatchStatus';

  constructor(public _http: HttpClient, public _router: Router, public _home: HomeService,
    public _otp: OtpverficationService) { }

  listOfPaymentTypes(req: any) {
    return this._http.post(this.endPoint.localUrl + this.paymentType, JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }

  listOfRecreateBatchName(req: any) {
    return this._http.post(this.endPoint.localUrl + this.recreateBatchName, JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }

  listOfBatchName(req: any) {
    return this._http.post(this.endPoint.localUrl + this.getbatchName, JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }

  savePayment(req: any) {
    return this._http.post(this.endPoint.localUrl + this.save, JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }

  paymentProcess(req: any) {
    return this._http.post(this.endPoint.localUrl + this.newClaimProcess, JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  paymentNewProcess(req: any) {
    return this._http.post(this.endPoint.localUrl + '/providerPayment/getNewClaims', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  paymentExitProcess(req: any) {
    return this._http.post(this.endPoint.localUrl + '/providerPayment/getExistingClaims', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  selectAllNewClaimList(req: any) {
    return this._http.post(this.endPoint.localUrl + '/providerPayment/update/createActions', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  limitSelectionBatchStatus() {
    return this._http.get(this.endPoint.localUrl + this.batchStatusLimitSelection)
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }

  paymentStatus(req: any) {
    return this._http.post(this.endPoint.localUrl + this.batchStatusIsotherAgency, JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  paymentBreakStatus(req: any) {
    return this._http.post(this.endPoint.localUrl + '/providerPayment/batchstatus/paymentBatchBreakdown', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  claimStatus() {
    return this._http.get(this.endPoint.localUrl + '/providerPayment/getClaimsStatus')
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  save_paymentBreakStatus(req: any) {
    return this._http.post(this.endPoint.localUrl + '/providerPayment/batchstatus/paymentBatchBreakdown/save', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  save_payment_claim_save(req: any) {
    return this._http.post(this.endPoint.localUrl + '/providerPayment/claims/save', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  save_payment_claim_update(req: any) {
    return this._http.post(this.endPoint.localUrl + '/providerPayment/claims/update', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  claimPaymentBatch(req: any) {
    return this._http.post(this.endPoint.localUrl + '/providerPayment/update/claimPaymentBatch', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  claimPaymentexport(req: any) {
    return this._http.post(this.endPoint.localUrl + '/providerPayment/export', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  updateClaimTemp(req: any) {
    return this._http.post(this.endPoint.localUrl + '/providerPayment/update/claimTemp', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  errorProviderExport(req: any) {
    return this._http.post(this.endPoint.localUrl + '/providerPayment/errors/export', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  allNeProcessExport(req: any) {
    return this._http.post(this.endPoint.localUrl + '/providerPayment/exportProcessData', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  all_Export(req: any) {
    return this._http.post(this.endPoint.localUrl + '/getResultSetToExcel', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  };
  editBatchProcess(req){
    return this._http.post(this.endPoint.localUrl + '/providerPayment/updateClaimTempById', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  exictingBatchProcessCheckBox(req){
    return this._http.post(this.endPoint.localUrl + '/providerPayment/existingClaims/addToBatch', JSON.stringify(req))
      .toPromise().then(this._home.extractedData).catch(this._home.errorHandler);
  }
  statusIDS = [];
  postBatchstatusID(ids) {
    this.statusIDS = ids;
  };
  getBatchstatusID() {
    return this.statusIDS
  }
}
