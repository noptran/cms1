import { Component, OnInit } from '@angular/core';
import { SiteReview } from './site-review';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-site-review',
  templateUrl: './site-review.component.html',
  styleUrls: ['./site-review.component.scss']
})
export class SiteReviewComponent implements OnInit {

  review:SiteReview = new SiteReview();

  
  constructor() { }

  ngOnInit() { }

  formAction(source: SiteReview) { 
    !isNullOrUndefined(source.siteReviewID) ? this.update(source) : this.save(source);
  }

  save(source: SiteReview) { }

  update(source: SiteReview) { }

}
