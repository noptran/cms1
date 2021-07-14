import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mail-footer',
  templateUrl: './mail-footer.component.html',
  styleUrls: ['./mail-footer.component.scss', '../referrals/family-preservation/family-preservation.component.scss'],
  outputs: ['sendMail', 'discard']
})
export class MailFooterComponent implements OnInit {
  @Output()
  sendMail = new EventEmitter();
  discard = new EventEmitter();

  other: any;
  otherMails: any;
  staff = true;
  dcf = true;
  constructor() { }

  sendMails() {
    this.sendMail.emit({ otherMails: this.otherMails, staff: this.staff, dcf: this.dcf });
  }
  cancel() {
    this.discard.emit('discarded');
  }
  ngOnInit() {
  }

}
