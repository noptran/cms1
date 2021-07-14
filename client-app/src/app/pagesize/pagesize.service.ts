import { Injectable } from '@angular/core';

@Injectable()
export class PagesizeService {

  beginValue: any;
  endValue: any;

  constructor() { }

  setPagesizeValues(begin, end) {
    this.beginValue = begin;
    this.endValue = end;
  }

  getPagesizeValues() {
    return [this.beginValue, this.endValue];
  }
}
