import { Component, OnInit } from "@angular/core";
import { CaseFileActivity } from "./case-file-activity";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ClildFormService } from "../child-forms/child-forms.service";
import { CaseTeamService } from "../case-team/case-team.service";
import { Router } from "@angular/router";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import swal from "sweetalert2";
import { isNullOrUndefined } from "util";
import * as moment from "moment";
import {LocalValues} from "../local-values";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-case-file-activity",
  templateUrl: "./case-file-activity.component.html",
  styleUrls: ["./case-file-activity.component.scss"],
})
export class CaseFileActivityComponent implements OnInit {
  caseFile: CaseFileActivity = new CaseFileActivity();
  breadcrumbs = [];
  caseFileForm: FormGroup;
  quickMenu = "referrel";
  isEdit = false;
  metaData = [];
  url: any;
  isAttachmentRequired = false;
  req: any;
  isList = false;
  isForm = true;
  isAppHeader = true;
  caseFileActivityList = [];
  isFormLog = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isPopup = false;

  constructor(
    public _client: ClildFormService,
    public _caseTeam: CaseTeamService,
    public _router: Router,
    public _opencard: OpencardsService,
    public _fb: FormBuilder,
    public _localValues: LocalValues,
    public _message: MessageService
  ) {}

  ngOnInit() {
    this.formValidation();
    if (
      this._router.url.includes(
        "/reintegration/referral/opencard/case-file-activity/detail"
      )
    ) {
      this.getRecById();
      this.isAttachmentRequired = true;
    }
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case Form",
        href: "/reintegration/referral/detail",
        active: "",
      },
      {
        label: "Case File Activity List",
        active: "",
        href: "/reintegration/referral/opencard/case-file-activity/view",
      },
      { label: "Case File Activity", active: "active" }
    );
    let referralTypeId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._opencard.getHasKey();
    if (referralTypeId === 9) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseFileActivity-NCOPS",
        this.breadcrumbs
      );
    } else if (referralTypeId === 5) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseFileActivity-NCFI",
        this.breadcrumbs
      );
    } else if (referralTypeId === 4) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseFileActivity - NCFCH",
        this.breadcrumbs
      );
    } else if (referralTypeId === 7) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseFileActivity-NCRFC",
        this.breadcrumbs
      );
    } else if (referralTypeId === 8) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseFileActivity-NCHS",
        this.breadcrumbs
      );
    } else if (referralTypeId === 1) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseFileActivity-RFC",
        this.breadcrumbs
      );
    } else if (referralTypeId === 2) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseFileActivity-FP",
        this.breadcrumbs
      );
    } else if (referralTypeId === 15) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseForm-BHOK",
        this.breadcrumbs
      );
    }
    if (referralTypeId === 17) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseFileActivity-JJFC",
        this.breadcrumbs
      );
    }
    if (referralTypeId === 11) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseFileActivity-NCMHR",
        this.breadcrumbs
      );
    }
    if (referralTypeId === 14) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "caseFileActivity-PRTF",
        this.breadcrumbs
      );
    }
    this.getCaseFileActivityList();
  }

  formValidation() {
    this.caseFileForm = this._fb.group({
      beginDate: [null, Validators.compose([Validators.required])],
      staffID: [null],
      sfaofficeID: [null],
      thirdParty: [null],
      notes: [null],
    });
  }

  formActions(source: any) {
    if (this.caseFileForm.valid) {
      source.beginDate = this._localValues.stringFormatDatetime(
        Date.parse(source.beginDate)
      );
      !isNullOrUndefined(source.staffID)
        ? (source.staffID = source.staffID.staffID)
        : null;
      !isNullOrUndefined(source.sfaofficeID)
        ? (source.sfaofficeID = source.sfaofficeID.sfaofficeID)
        : null;
      source.referralID =
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey();
      !isNullOrUndefined(source.caseFileActivityID)
        ? this.update(source)
        : this.save(source);
    } else {
      swal("Warning", "Please fill the mandatory fields", "info");
    }
  }

  save(source: any) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.saveCaseFileActivity(source).then(() => {
      loader.style.display = "none";
      if (this.isAppHeader) {
        swal("Success", "Record has been saved!", "success");
        this._router.navigate([
          "/reintegration/referral/opencard/case-file-activity/view",
        ], { queryParamsHandling: "preserve" });
      } else {
        this._message.add({
          severity: "success",
          summary: "Saved!",
          detail: "The record has been saved!",
        });
        this.isForm = false;
        this.isList = true;
        this.getCaseFileActivityList();
      }
    });
  }

  update(source: any) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.updateCaseFileActivity(source).then(() => {
      loader.style.display = "none";
      if (this.isAppHeader) {
        swal("Success", "Record has been updated!", "success");
        this._router.navigate([
          "/reintegration/referral/opencard/case-file-activity/view",
        ], { queryParamsHandling: "preserve" });
      } else {
        this._message.add({
          severity: "success",
          summary: "Updated!",
          detail: "The record has been updated!",
        });
        this.isForm = false;
        this.isList = true;
        this.getCaseFileActivityList();
      }
    });
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case "staff":
        obj = "staff";
        break;
      case "sfaOffice":
        obj = "sfcsOffice";
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data) => {
      data.dropDown.map((item: any) => {
        item["fullName"] =
          item.firstName + " " + item.lastName + "( " + item.email + ")";
      });
      this.metaData = data.dropDown;
    });
  }

  getRecById() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.req = { caseFileActivityID: this._client.getId() };
    this._opencard.getByIdCaseFileActivity(this.req).then((data) => {
      loader.style.display = "none";
      if (data.CaseFileActivity.isActive) {
        !isNullOrUndefined(data.CaseFileActivity.beginDate)
          ? (data.CaseFileActivity.beginDate = moment(
              data.CaseFileActivity.beginDate
            ).format("MM/DD/YYYY HH:mm"))
          : null;
      } else {
        !isNullOrUndefined(data.CaseFileActivity.beginDate)
          ? (data.CaseFileActivity.beginDate = moment
              .utc(data.CaseFileActivity.beginDate)
              .format("MM/DD/YYYY HH:mm"))
          : null;
      }
      !isNullOrUndefined(data.CaseFileActivity.staffID)
        ? (data.CaseFileActivity.staffID["fullName"] =
            data.CaseFileActivity.staffID.lastName +
            " " +
            data.CaseFileActivity.staffID.firstName +
            " ( " +
            data.CaseFileActivity.staffID.email +
            " ) ")
        : null;
      this.caseFile = data.CaseFileActivity;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.CaseFileActivity.changedBy
      )
        ? data.CaseFileActivity.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.CaseFileActivity.changedDate
      )
        ? moment(data.CaseFileActivity.changedDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.CaseFileActivity.enteredBy
      )
        ? data.CaseFileActivity.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.CaseFileActivity.enteredDate
      )
        ? moment(data.CaseFileActivity.enteredDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      this.isEdit = true;
      this.caseFileForm.disable();
    });
  }

  editForm() {
    this.isEdit = false;
    this.caseFileForm.enable();
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (
      currentURL == "/reintegration/referral/opencard/case-file-activity/detail"
    ) {
      this.url = "/reports/attachment-document/rfc/case-file-activity";
    }

    return this._router.navigate([this.url]);
  }

  async getCaseFileActivityList() {
    let request = {
      beginPagination: 1,
      endPagination: 100,
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
    };
    let response = await this._opencard.listCaseFileActivity(request);
    this.caseFileActivityList = response.caseFileActivity;
    return;
  }

  public onAddForm() {
    this.isList = false;
    this.isForm = true;
    this.isEdit = false;
    return (this.caseFile = new CaseFileActivity());
  }

  public onEditForm(event: any) {
    this.formValidation();
    let request = { caseFileActivityID: event.caseFileActivityID };
    this.req = request;
    this._opencard.getByIdCaseFileActivity(request).then((data) => {
      if (data.CaseFileActivity.isActive) {
        !isNullOrUndefined(data.CaseFileActivity.beginDate)
          ? (data.CaseFileActivity.beginDate = new Date(
              data.CaseFileActivity.beginDate
            ))
          : null;
      } else {
        !isNullOrUndefined(data.CaseFileActivity.endDate)
          ? (data.CaseFileActivity.endDate = new Date(
              data.CaseFileActivity.endDate
            ))
          : null;
      }
      !isNullOrUndefined(data.CaseFileActivity.staffID)
        ? (data.CaseFileActivity.staffID["fullName"] =
            data.CaseFileActivity.staffID.lastName +
            " " +
            data.CaseFileActivity.staffID.firstName +
            " ( " +
            data.CaseFileActivity.staffID.email +
            " ) ")
        : null;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.CaseFileActivity.changedBy
      )
        ? data.CaseFileActivity.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.CaseFileActivity.changedDate
      )
        ? moment(data.CaseFileActivity.changedDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.CaseFileActivity.enteredBy
      )
        ? data.CaseFileActivity.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.CaseFileActivity.enteredDate
      )
        ? moment(data.CaseFileActivity.enteredDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      this.caseFile = data.CaseFileActivity;
      this.isEdit = true;
      this.caseFileForm.disable();
      this.isList = false;
      this.isForm = true;
      this.isPopup = true;
    });
  }

  public discardForm() {
    if (this.isAppHeader) {
      return this._router.navigate([
        "/reintegration/referral/opencard/case-file-activity/view",
      ]);
    } else {
      this.isForm = false;
      this.isList = true;
      this.isEdit = false;
      this.formValidation();
    }
  }

  async onDelete(event: any) {
    await event;
    this.isForm = false;
    this.getCaseFileActivityList();
    this.isList = true;
  }
}
