import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CaseTeamService } from '../case-team/case-team.service';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { TeamFormService } from '../team-form/team-form.service';
import html2pdf from 'html2pdf.js';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
@Component({
  selector: 'app-ack-pdf',
  templateUrl: './ack-pdf.component.html',
  styleUrls: ['./ack-pdf.component.scss'],
  inputs: ['ackForm'],
  outputs: ['hideAck']
})
export class AckPdfComponent implements OnInit {
  @Input()
  ackForm: any;
  @Output()
  hideAck = new EventEmitter();
  enteredBy: any;
  date: any;
  positive: any;
  negative: any;
  notTested: any;
  constructor(public _CaseTeamService: CaseTeamService, public _opencards: OpencardsService,
    public _team: TeamFormService) { }

  ngOnInit() {
    this.date = new Date();
    this.getStaffDetails();
    const caseTeam = JSON.parse(localStorage.getItem('caseTeamData'));
    this.ackForm.providerStaff = caseTeam.CaseManagerName;
    this.ackForm.address = caseTeam.Address;
    this.ackForm.city = caseTeam.City;
    this.ackForm.state = caseTeam.State;
    this.ackForm.zip = caseTeam.Zipcode;
    this.ackForm.workPhone = caseTeam.WorkPhone;
    if (this.ackForm.drugTestResults === 'Positive') {
      this.positive = this.ackForm.drugTestResults;
    } else if (this.ackForm.drugTestResults === 'Negative') {
      this.negative = this.ackForm.drugTestResults;
    } else if (this.ackForm.drugTestResults === 'Not Tested') {
      this.notTested = this.ackForm.drugTestResults;
    }
    this.correctedCopyData();
    this.reopenData();
    console.log('this.ackForm', this.ackForm);
  }
  correctedCopyData() {
    if (!isNullOrUndefined(localStorage.getItem('correctedCopy'))) {
      if (localStorage.getItem('correctedCopy') === 'true') {
        this.ackForm.correctedCopy = true;
      } else if (localStorage.getItem('correctedCopy') === 'false') {
        this.ackForm.correctedCopy = false;
      }
    } else {
      this.ackForm.correctedCopy = false;
    }
  }
  reopenData() {
    if (!isNullOrUndefined(localStorage.getItem('reOpen'))) {
      if (localStorage.getItem('reOpen') === 'true') {
        this.ackForm.reOpen = true;
      } else if (localStorage.getItem('reOpen') === 'false') {
        this.ackForm.reOpen = false;
      }
    } else {
      this.ackForm.reOpen = false;
    }
  }

  getStaffDetails() {
    const staffId = localStorage.getItem('UserId');
    this._team.getUserById({ staffID: parseInt(staffId) }).then(data => {
      this.enteredBy = data.users.lastName + ' ' + data.users.firstName;
    });
  }
  discard() {
    this.hideAck.emit('hideAck');
  }
  sendMails(event) {
    const loader = document.getElementById('loading-overlay') as HTMLElement;
    loader.style.display = 'block';
    if (this.ackForm.isPhase === true && this.ackForm.correctedCopy === true) {
      this.ackForm.sub = 'ACK(PHASE,CORR)';
      this.ackForm.staffSub = `Closure of Initial Intensive Phase Has Been Corrected For Client ${this.ackForm.fullName}`;
      localStorage.setItem('reOpen', 'false');
    }
    const element = document.getElementById('attachForm');
    const opt = {
      margin: 1,
      filename: 'CMSForm.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' }
    };
    const pdf = html2pdf().from(element).set(opt).output('blob');
    return pdf.then((data: any) => {
      const req = {
        // staffID: 4620,
        // staffName: 'krishnakumar S',
        staffID: parseInt(localStorage.getItem('UserId')),
        clientID: this.ackForm.clientId,
        referralID: parseInt(localStorage.getItem('referralId')) - this._opencards.getHasKey(),
        formName: 'FCH Acknowledgement Form',
        staffName: this.enteredBy,
        'printAck': true,
        region: this.ackForm.region,
        subject: this.ackForm.countyName + '_' + this.ackForm.fullName + '_' + this.ackForm.sub,
        staffSubject: this.ackForm.staffSub,
        otherMail: event.otherMails,
        documentType: 'FCH Acknowledgement Form',
        staffEmail: event.staff,
        fileExtension: '.pdf',
        message: !isNullOrUndefined(this.ackForm.message) ? this.ackForm.message : null
      };
      if (event.dcf === true) {
        req['dcfWorkerMail'] = this.ackForm.dcfMail;
      }
      console.log('reqqq', req);
      const mailFormData: FormData = new FormData();
      mailFormData.append('uploadfile', data);
      mailFormData.append('pdfFormJson', JSON.stringify(req));
      this._CaseTeamService.getCmsUploadFile(mailFormData).then(data => {
        if (data.responseStatus) {
          loader.style.display = 'none';
          swal('success', data.responseMessage, 'success');
          this.discard();
        } else {
          loader.style.display = 'none';
          swal('success', data.responseMessage, 'success');
        }
      });
    });
  }
}
