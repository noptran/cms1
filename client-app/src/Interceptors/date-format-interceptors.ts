import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class DateFormatInterceptors implements HttpInterceptor {

  constructor(public _router: Router, ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq = this.timeStampToLocalDateStringConversion(req.body);
    let reqBody = req.clone({ body: modifiedReq });
    return next.handle(reqBody);
  }

  localStringFormat(timeStamp: any) {
    return (timeStamp) ?
      `${new Date(timeStamp).getFullYear()}-${String(new Date(timeStamp).getMonth() + 1).padStart(2, '0')}-${String(new Date(timeStamp).getDate()).padStart(2, '0')} ${String(new Date(timeStamp).getHours()).padStart(2, '0')}:${String(new Date(timeStamp).getMinutes()).padStart(2, '0')}:${String(new Date(timeStamp).getSeconds()).padStart(2, '0')}.000` : null;
  }


  timeStampToLocalDateStringConversion(bodyOfReq: any) {
    // console.log("From Date format interceptors", typeof bodyOfReq, bodyOfReq)
    if (typeof bodyOfReq !== 'object') {
      let data = JSON.parse(bodyOfReq);
      // console.log("JSON Input", data);
      let dateModifiedReq = [], otherReq = []
      for (const property in data) {
        if ((property == 'visitationUpdate') || (property == 'courtUpdate')) {
          otherReq.push([property, data[property]]);
        }
        else {
          if (this._router.url.includes("auth-claim") || this._router.url.includes("otherService-direct/form") || this._router.url === "/payee/authClaim/details" ||
            this._router.url.includes("authClaim") || this._router.url === "/payee/serviceClaim_hardgoods/auth-claim/details" || this._router.url === "/payee/serviceClaim_otherService/auth-claim/details" || this._router.url === "/CSpayee/payeeform/authClaim/new" || this._router.url === "/CSpayee/payeeform/authClaim/details" ||
            this._router.url.includes("/provider/opencard/authorization-summary/detail") ||
            this._router.url.includes("/reintegration/referral/service/other/service/detail") ||
            this._router.url == "/reintegration/referral/service/other/service" ||
            this._router.url.includes("/reintegration/referral/service/hardgoods/detail") ||
            this._router.url == "/reintegration/referral/service/hardgoods" ||
            this._router.url == "/reintegration/referral/service/hardgoods/detail" ||
            this._router.url.includes("/reintegration/referral/service/authorization/summary/detail") ||
            this._router.url.includes("/provider/opencard/authorization-summary/detail")
          ) {
            if ((property == 'when')
              || (property == 'beginDate')
              || (property == 'endDate')
              || (property == 'enteredDate')
              || (property == 'permanencyStaffing')
              || (property == 'reunificationNoLogerViable_SFCSRecommended')
              || (property == 'reunificationNoLogerViable_CourtApproved')
              || (property == 'motionFiled')
              || (property == 'legallyAvailable')
              || (property == 'legalReview')
              || (property == 'transferToAdoption')
              || (property == 'inquiryForm')
              || (property == 'socialHistory')
              || (property == 'birthRecordsRequested')
              || (property == 'birthRecordsReceived')
              || (property == 'birthRecordsReceived')
              || (property == 'dateApplicationSubmitted')
              || (property == 'dateOfDetermination')
              || (property == 'dateOfNotification')
              || (property == 'nextExamDue')
              || (property == 'monthReported')
              || (property == 'requestSent')
              || (property == 'requestReceivedByCC')
              || (property == 'determinationReceivedByCC')
              || (property.includes('Date'))
            ) {
              if (this._router.url === '/grade-submission') {
                otherReq.push([property, data[property]]);
              } else {
                if (property == 'disruptionUpdate' || property == 'placementBehavioursUpdate'
                  || property == 'planEndDateReleaseOfCustodyUpdate' || property == 'placementMoveEventUpdate'
                  || property == 'identifiedResourceUpdate' || property == 'recidivistDateUpdate'
                  || property == 'referralUpdate' || property == 'placementUpdate' || property == 'dateValue'
                ) {
                  return;
                } else {
                  dateModifiedReq.push([property, this.localStringFormat(data[property])]);

                }
              }
            } else {
              otherReq.push([property, data[property]]);
            }

          } else {
            if ((property == 'when')
              || (property == 'beginDate')
              || (property == 'endDate')
              || (property == 'enteredDate')
              || (property == 'permanencyStaffing')
              || (property == 'reunificationNoLogerViable_SFCSRecommended')
              || (property == 'reunificationNoLogerViable_CourtApproved')
              || (property == 'motionFiled')
              || (property == 'legallyAvailable')
              || (property == 'legalReview')
              || (property == 'transferToAdoption')
              || (property == 'inquiryForm')
              || (property == 'socialHistory')
              || (property == 'birthRecordsRequested')
              || (property == 'birthRecordsReceived')
              || (property == 'birthRecordsReceived')
              || (property == 'dateApplicationSubmitted')
              || (property == 'dateOfDetermination')
              || (property == 'dateOfNotification')
              || (property == 'nextExamDue')
              || (property == 'monthReported')
              || (property == 'requestSent')
              || (property == 'requestReceivedByCC')
              || (property == 'determinationReceivedByCC')
              || (property.includes('date'))
              || (property.includes('Date'))
            ) {
              if (this._router.url === '/grade-submission') {
                otherReq.push([property, data[property]]);
              } else {
                if (property == 'disruptionUpdate' || property == 'placementBehavioursUpdate'
                  || property == 'planEndDateReleaseOfCustodyUpdate' || property == 'placementMoveEventUpdate'
                  || property == 'identifiedResourceUpdate' || property == 'recidivistDateUpdate'
                  || property == 'referralUpdate' || property == 'placementUpdate' || property == 'dateValue'
                ) {
                  return;
                } else {
                  dateModifiedReq.push([property, this.localStringFormat(data[property])]);

                }
              }
            } else {
              otherReq.push([property, data[property]]);
            }
          }

        }

      }
      let concatArr = dateModifiedReq.concat(otherReq);
      let out = Object.assign({}, ...Array.from(concatArr, ([k, v]) => ({ [k]: v })));
      return JSON.stringify(out);
    }
  }

}
