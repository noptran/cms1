import { Component, Input } from "@angular/core";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalValues } from "../../local-values";
import * as moment from "moment";
import { ClildFormService } from "../../child-forms/child-forms.service";
import { CASEACTIVITYID, REFID } from "../../../constants/AppConstants";
// import { SrvRecord } from "dns";

@Component({
  selector: "send-email-auto-attachment",
  templateUrl: "./send-email-auto-attachment.component.html",
  styleUrls: ["./send-email-auto-attachment.component.scss"],
  inputs: ["primaryValue", "staffEmail", "emailSubjectContent"],
})
export class SendEmailAutoAttachmentComponent {
  @Input()
  primaryValue: any;
  staffEmail: string;
  emailSubjectContent: any;

  infoText: string;
  availableAttachments: any = [];
  isMailActionWindowOpen = false;
  selectedAttachments = [];
  to: string[] = [];
  cc: string[];
  bcc: string[];
  emailSubject: string;
  emailBody: string;
  sendBtnLabel = "Send";
  componentBtn = "Send Email";

  constructor(
    public _client: ClildFormService,
    public _openCards: OpencardsService,
    public _router: Router,
    public _localValues: LocalValues,
    public _activateRoute: ActivatedRoute
  ) {
    if (this._router.url.includes("/monthly-reports/detail")) {
      this.getMonthlyReportById();
    }
  }

  async onGetAttachments() {
    const req = {};
    if (this.staffEmail !== undefined) {
      this.to.push(this.staffEmail);
    }
    if (this.emailSubjectContent !== undefined) {
      this.emailSubject = this.emailSubjectContent.subject;
      this.emailBody = this.emailSubjectContent.content;
    }
    this.selectedAttachments = [];
    this.componentBtn = "Loading...";
    if (this.primaryValue === undefined) {
      this.masterNodes();
    } else {
      req["primaryKey"] = Object.keys(this.primaryValue)[0];
      req["primaryKeyValue"] = Object.values(this.primaryValue)[0];
      this.availableAttachments = await this.fetchAttachments(req);
      this.availableAttachments.map((itm) => {
        itm.isActive = true;
        this.selectedAttachments.push(itm.fileName);
      });
    }
    this.isMailActionWindowOpen = true;
    this.componentBtn = "Send Email";
  }

  fetchAttachments(req: any) {
    return new Promise((resolve) => {
      this._openCards.getAttachmentsByNode(req).then((data: any) => {
        this.infoText = `Listing ${data.files.length} attachments!`;
        resolve(data.files);
      });
    });
  }
  emailedNotes: any;
  staffName: any;
  getMonthlyReportById() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    var request = { monthlyReportID: this._client.getId() };
    this._openCards.getByIdMonthlyReports(request).then((data) => {
      this.emailedNotes = data.MonthlyReport.emailedNotes;
      if (data.MonthlyReport.staffID) {
        this.staffName =
          data.MonthlyReport.staffID.lastName +
          " " +
          data.MonthlyReport.staffID.firstName;
      } else {
        this.staffName = "";
      }

      loader.style.display = "none";
    });
  }
  update() {
    var req = {
      monthlyReportID: this._client.getId(),
      emailedNotes:
        "Email Sent:" +
        moment(new Date()).format("MM/DD/YYYY") +
        " to " +
        this.staffName +
        "; " +
        this.emailedNotes,
    };
    this._openCards.updateMonthlyReports(req).then((data) => {});
  }
  onChangeAttachmentSelection(event: any, record: string) {
    if (event) {
      this.selectedAttachments.push(record);
      this.infoText = `${this.selectedAttachments.length} attachment(s) has selected,out of ${this.availableAttachments.length}`;
    } else {
      // check selectedAttachments length
      if (this.selectedAttachments.length > 0) {
        this.selectedAttachments.splice(
          this.selectedAttachments.indexOf(record),
          1
        );
        this.infoText = `${this.selectedAttachments.length} attachment(s) has selected, out of ${this.availableAttachments.length}`;
      } else {
        this.infoText = "Please select any attachment(s)";
      }
    }
  }

  async onSendEmail() {
    const req = {},
      formatedAttachments: any = [];
    this.selectedAttachments.map((item: any) => {
      formatedAttachments.push({ fileName: item });
    });
    this.infoText = "Sending...";
    req["additionalFiles"] = formatedAttachments;
    req["content"] = this.emailBody;
    req["to"] = this.to;
    req["cc"] = this.cc;
    req["bcc"] = this.bcc;
    req["subject"] = this.emailSubject;
    const emailReq = Object.assign({}, req, this.primaryValue);
    // check attachment selection
    if (this.selectedAttachments.length === 0) {
      this.infoText = "Is that fine, For sending email without attachment ?";
      this.sendBtnLabel = "Yes,proceed!";
      await this.sendEmail(emailReq);
    } else {
      await this.sendEmail(emailReq);
    }
    console.log("Email has ready to send", emailReq);
  }

  sendEmail(req: any) {
    return new Promise((resolve) => {
      this._openCards.sendEmailWithAutoAttachment(req).then((data: any) => {
        if (this._router.url.includes("/monthly-reports/detail")) {
          this.update();
        }
        this.infoText = "The email has been sent!";
        this.sendBtnLabel = "Send";
        resolve(data);
      });
    });
  }

  async masterNodes() {
    const currentUrl = this._router.url,
      req = {};
    if (
      currentUrl.includes("/nc-hs/") ||
      currentUrl.includes("/bh-ok/detail") ||
      currentUrl === "/reports/referral/family-preservation/detail" ||
      currentUrl.includes("/nc-rfc") ||
      currentUrl.includes("/reintegration/referral/detail") ||
      currentUrl.includes("/nc-fch/detail") ||
      currentUrl.includes("/nc-ops/detail")
    ) {
      req["primaryKey"] = "referralID";
      req["primaryKeyValue"] = parseInt(
        this._activateRoute.snapshot.queryParamMap.get(REFID)
      );
    } else if (currentUrl.includes("/case-activity/detail")) {
      req["primaryKey"] = "caseActivityID";
      req["primaryKeyValue"] = parseInt(
        this._activateRoute.snapshot.queryParamMap.get(CASEACTIVITYID)
      );
    }
    if (currentUrl.includes("/provider")) {
      req["primaryKey"] = "providerID";
      req["primaryKeyValue"] =
        parseInt(localStorage.getItem("providerID")) -
        this._openCards.getHasKey();
    }
    this.availableAttachments = await this.fetchAttachments(req);
    return this.availableAttachments;
  }
}
