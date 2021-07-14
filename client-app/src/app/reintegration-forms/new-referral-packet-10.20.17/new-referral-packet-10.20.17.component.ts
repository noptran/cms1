import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-referral-packet-10.20.17',
  templateUrl: './new-referral-packet-10.20.17.component.html',
  styleUrls: ['./new-referral-packet-10.20.17.component.scss', '../../family-preservation/family-preservation.scss']
})
export class NewReferralPacket10Component implements OnInit {

  constructor(public _router: Router) { }

  ngOnInit() {
  }
  saveForm(source) {

    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }
}
