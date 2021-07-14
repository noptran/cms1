import { Injectable } from '@angular/core';

// services
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class BeginEndValidationService {
  listApiResponse: any;
  nodeName: any;

  constructor(public _opencards: OpencardsService) { }

  validateBeginEndDates(nodeName: string) {
    this.nodeName = nodeName;
    switch (nodeName) {
      case 'Case Team':
        this._opencards.getCaseTeamListResponse()
          .then((data: any) => {
            this.listApiResponse = data;
            return this.listApiResponse.casePlan[0].endDate;
          })
        break;

      default:
        return this.listApiResponse.casePlan[0].endDate;
    }
  }

  getPreviousDate() {
    return !isNullOrUndefined(this.listApiResponse.casePlan[0].endDate) ? this.listApiResponse.casePlan[0].endDate : new Date(Date.now());
  }







}

