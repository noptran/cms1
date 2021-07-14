import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { isNullOrUndefined } from "util";
import { Router } from "@angular/router";

import { FpCasePlanGoals } from "./fp-case-plan-goals";

import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import { CaseTeamService } from "../../../case-team/case-team.service";
import { ClildFormService } from "../../../child-forms/child-forms.service";
import swal from "sweetalert2";
import * as moment from "moment";
import {LocalValues} from "../../../local-values";

@Component({
  selector: "app-case-plan-goals-fp-form",
  templateUrl: "./case-plan-goals-fp-form.component.html",
  styleUrls: ["./case-plan-goals-fp-form.component.scss"],
})
export class CasePlanGoalsFpFormComponent implements OnInit {
  title: any = "Case Plan Goals";
  status = "draft";
  formStatus?: any;
  quickMenu = "referrel";
  subtitle: any;
  formControl: any;
  editControll: boolean;
  breadcrumbs = [];
  casePlanForm: FormGroup;
  fpCasePlanGoals: FpCasePlanGoals = new FpCasePlanGoals();
  clientId: any;
  referralId: any;
  metaData: any;
  discardTo = "/reports/referral/family-preservation/case-plan-goals/view";
  url: any;
  isAttachmentRequired = false;
  req: any;
  @ViewChild("caseplanType", { static: true }) caseplanType: ElementRef;
  formLogInfo: any;
  isFormLog: any;

  constructor(
    public _fb: FormBuilder,
    public _opencards: OpencardsService,
    public _router: Router,
    public _caseTeam: CaseTeamService,
    public _client: ClildFormService,
    public _localValues: LocalValues
  ) {}

  ngOnInit() {
    this.formValidation();
    this.getClientDetails();

    if (this._router.url.includes("/case-plan-goals/detail")) {
      this.isAttachmentRequired = true;
      this.getCaseplanRecId();
    }
    this.formControl = false;
    this.editControll = false;
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case Form",
        href: "/reports/referral/family-preservation/detail",
        active: "",
      },
      {
        label: "Case Plan Goals List",
        href: "/reports/referral/family-preservation/case-plan-goals/view",
        active: "",
      },
      { label: "Case Plan Goals Form", active: "active" }
    );
    let referralTypeId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._opencards.getHasKey();
    this._opencards.breadcurmbsDetermination(
      "case-plan-goals",
      referralTypeId,
      this.breadcrumbs
    );
    if (
      this._router.url.includes(
        "/reintegration/referral/opencard/case-plan-goals/new"
      )
    ) {
      let referralBeginDate = localStorage.getItem("referralbeginDate"),
        date1: any,
        date2: any;
      date1 = new Date(referralBeginDate).getTime() + 86400000 * 21;
      date2 = new Date(referralBeginDate).getTime() + 86400000 * 20;
      this.fpCasePlanGoals.dueToBeginDate = new Date(date2);
    }
  }

  editForm() {
    this.formControl = false;
    this.casePlanForm.enable();
  }

  formValidation() {
    this.casePlanForm = this._fb.group({
      casePlanTypeID: [null, Validators.compose([Validators.required])],
      casePlanGoalID: [null],
      secondary_CasePlanGoalID: [null],
      beginDate: [null],
      dateDueToSRS: [null],
      dateSentSRS: [null],
      endDate: [null],
      dateReceivedSRSApproval: [null],
      dueToBeginDate: [null],
      plannedPermDate: [null],
      sfaNotes: [null],
      srsNotes: [null],
      referralID: [null],
    });
  }

  getClientDetails() {
    const encryptClientID = localStorage.getItem("clientId");
    const encryptReferralID = localStorage.getItem("referralId");
    const hasKey = this._opencards.getHasKey();
    this.clientId = parseInt(encryptClientID) - hasKey;
    this.referralId = parseInt(encryptReferralID) - hasKey;
  }

  saveForm(source) {
    if (this.casePlanForm.valid) {
      let referralTypeId;
      const loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      !isNullOrUndefined(source.casePlanTypeID)
        ? (source.casePlanTypeID = source.casePlanTypeID.casePlanTypeID)
        : null;
      !isNullOrUndefined(source.beginDate)
        ? (source.beginDate = Date.parse(source.beginDate))
        : null;
      !isNullOrUndefined(source.dateDueToSRS)
        ? (source.dateDueToSRS = Date.parse(source.dateDueToSRS))
        : null;
      !isNullOrUndefined(source.dateSentSRS)
        ? (source.dateSentSRS = Date.parse(source.dateSentSRS))
        : null;
      !isNullOrUndefined(source.endDate)
        ? (source.endDate = Date.parse(source.endDate))
        : null;
      !isNullOrUndefined(source.dateReceivedSRSApproval)
        ? (source.dateReceivedSRSApproval = Date.parse(
            source.dateReceivedSRSApproval
          ))
        : null;
      !isNullOrUndefined(source.dueToBeginDate)
        ? (source.dueToBeginDate = Date.parse(source.dueToBeginDate))
        : null;
      !isNullOrUndefined(source.plannedPermDate)
        ? (source.plannedPermDate = Date.parse(source.plannedPermDate))
        : null;
      !isNullOrUndefined(source.casePlanGoalID)
        ? (source.casePlanGoalID = source.casePlanGoalID.casePlanGoalID)
        : null;
      !isNullOrUndefined(source.secondary_CasePlanGoalID)
        ? (source.secondary_CasePlanGoalID =
            source.secondary_CasePlanGoalID.casePlanGoalID)
        : null;
      source.clientID = this.clientId;
      source.referralID = this.referralId;
      referralTypeId =
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencards.getHasKey();

      if (source.casePlanID) {
        this._opencards.updateCasePlanGoals(source).then(() => {
          loader.style.display = "none";
          swal("Success", "Case plan goal updated!", "success");
          this.casePlanForm.disable();
          this._opencards.navigateToListView("case-plan-goals", referralTypeId);
        });
      } else {
        this._opencards.saveCasePlanGoals(source).then(() => {
          loader.style.display = "none";
          swal("Success", "Case plan goal created!", "success");
          this.casePlanForm.disable();
          this._opencards.navigateToListView("case-plan-goals", referralTypeId);
        });
      }
    } else {
      swal("Info", "Please fill the mandatoy fields", "info");
    }
  }

  /**
   * Get the metadata for dropdowns
   */
  getMetaData(event, label) {
    let metaDataObj, metaDataReq;
    switch (label) {
      case "casePlanType":
        metaDataObj = "casePlanType";
        break;
      case "goal":
        metaDataObj = "casePlanGoal";
        break;
      case "secondaryGoal":
        metaDataObj = "casePlanGoal";
        break;
      case "endDate":
        let req = {
          beginDate: moment
            .utc(this.fpCasePlanGoals.beginDate)
            .format("MM/DD/YYYY"),
          Object: "endDate",
        };
        this.getEndDate(event);
        break;
    }
    if (metaDataObj) {
      metaDataReq = { Object: metaDataObj, value: event.query };
      this._caseTeam.getSearchList(metaDataReq).then((data) => {
        this.metaData = data.dropDown;
      });
    }
  }
  getEndDate(event: any) {
    let req = {
      beginDate: this._localValues.stringFormatDatetime(
        Date.parse(this.fpCasePlanGoals.beginDate)
      ),
      Object: "endDate",
    };
    this._opencards.getCasePlanEndDate(req).then((data: any) => {
      this.metaData = [];
      this.metaData = data.Object;
      console.log(data);
      this.fpCasePlanGoals.endDate = new Date(data.endDate);
    });
  }

  getCaseplanRecId() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.req = { casePlanID: this._client.getId() };
    localStorage.setItem(
      "casePlanID",
      this._client.getId() + this._opencards.getHasKey()
    );
    this._opencards.getCasePlanGetById(this.req).then((data) => {
      !isNullOrUndefined(data.casePlan.beginDate)
        ? (data.casePlan.beginDate = moment(data.casePlan.beginDate).format(
            "MM/DD/YYYY HH:mm"
          ))
        : null;
      !isNullOrUndefined(data.casePlan.dateDueToSRS)
        ? (data.casePlan.dateDueToSRS = moment(
            data.casePlan.dateDueToSRS
          ).format("MM/DD/YYYY HH:mm"))
        : null;
      !isNullOrUndefined(data.casePlan.dateSentSRS)
        ? (data.casePlan.dateSentSRS = moment(data.casePlan.dateSentSRS).format(
            "MM/DD/YYYY HH:mm"
          ))
        : null;
      !isNullOrUndefined(data.casePlan.endDate)
        ? (data.casePlan.endDate = moment(data.casePlan.endDate).format(
            "MM/DD/YYYY HH:mm"
          ))
        : null;
      !isNullOrUndefined(data.casePlan.dateReceivedSRSApproval)
        ? (data.casePlan.dateReceivedSRSApproval = moment(
            data.casePlan.dateReceivedSRSApproval
          ).format("MM/DD/YYYY HH:mm"))
        : null;
      !isNullOrUndefined(data.casePlan.dueToBeginDate)
        ? (data.casePlan.dueToBeginDate = moment(
            data.casePlan.dueToBeginDate
          ).format("MM/DD/YYYY HH:mm"))
        : null;
      !isNullOrUndefined(data.casePlan.plannedPermDate)
        ? (data.casePlan.plannedPermDate = moment(
            data.casePlan.plannedPermDate
          ).format("MM/DD/YYYY HH:mm"))
        : null;
      this.fpCasePlanGoals = data.casePlan;
      if (data.casePlan.isActive) {
        !isNullOrUndefined(data.casePlan.beginDate)
          ? (data.casePlan.beginDate = moment(data.casePlan.beginDate).format(
              "MM/DD/YYYY HH:mm"
            ))
          : null;
        !isNullOrUndefined(data.casePlan.dateDueToSRS)
          ? (data.casePlan.dateDueToSRS = moment(
              data.casePlan.dateDueToSRS
            ).format("MM/DD/YYYY HH:mm"))
          : null;
        !isNullOrUndefined(data.casePlan.dateSentSRS)
          ? (data.casePlan.dateSentSRS = moment(
              data.casePlan.dateSentSRS
            ).format("MM/DD/YYYY HH:mm"))
          : null;
        !isNullOrUndefined(data.casePlan.endDate)
          ? (data.casePlan.endDate = moment(data.casePlan.endDate).format(
              "MM/DD/YYYY HH:mm"
            ))
          : null;
        !isNullOrUndefined(data.casePlan.dateReceivedSRSApproval)
          ? (data.casePlan.dateReceivedSRSApproval = moment(
              data.casePlan.dateReceivedSRSApproval
            ).format("MM/DD/YYYY HH:mm"))
          : null;
        !isNullOrUndefined(data.casePlan.dueToBeginDate)
          ? (data.casePlan.dueToBeginDate = moment(
              data.casePlan.dueToBeginDate
            ).format("MM/DD/YYYY HH:mm"))
          : null;
        !isNullOrUndefined(data.casePlan.plannedPermDate)
          ? (data.casePlan.plannedPermDate = moment(
              data.casePlan.plannedPermDate
            ).format("MM/DD/YYYY HH:mm"))
          : null;
      } else {
        !isNullOrUndefined(data.casePlan.beginDate)
          ? (data.casePlan.beginDate = moment
              .utc(data.casePlan.beginDate)
              .format("MM/DD/YYYY HH:mm"))
          : null;
        !isNullOrUndefined(data.casePlan.dateDueToSRS)
          ? (data.casePlan.dateDueToSRS = moment
              .utc(data.casePlan.dateDueToSRS)
              .format("MM/DD/YYYY HH:mm"))
          : null;
        !isNullOrUndefined(data.casePlan.dateSentSRS)
          ? (data.casePlan.dateSentSRS = moment
              .utc(data.casePlan.dateSentSRS)
              .format("MM/DD/YYYY HH:mm"))
          : null;
        !isNullOrUndefined(data.casePlan.endDate)
          ? (data.casePlan.endDate = moment
              .utc(data.casePlan.endDate)
              .format("MM/DD/YYYY HH:mm"))
          : null;
        !isNullOrUndefined(data.casePlan.dateReceivedSRSApproval)
          ? (data.casePlan.dateReceivedSRSApproval = moment
              .utc(data.casePlan.dateReceivedSRSApproval)
              .format("MM/DD/YYYY HH:mm"))
          : null;
        !isNullOrUndefined(data.casePlan.dueToBeginDate)
          ? (data.casePlan.dueToBeginDate = moment
              .utc(data.casePlan.dueToBeginDate)
              .format("MM/DD/YYYY HH:mm"))
          : null;
        !isNullOrUndefined(data.casePlan.plannedPermDate)
          ? (data.casePlan.plannedPermDate = moment
              .utc(data.casePlan.plannedPermDate)
              .format("MM/DD/YYYY HH:mm"))
          : null;
      }
      this.casePlanForm.disable();
      loader.style.display = "none";
      this.editControll = true;
    });
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (
      currentURL.includes(
        "/reintegration/referral/opencard/case-plan-goals/new"
      ) ||
      currentURL.includes(
        "/reintegration/referral/opencard/case-plan-goals/detail"
      )
    ) {
      this.url = "/reports/attachment-document/rfc/case-plan-goals";
    } else {
      this.url = "/reports/attachment-document/case-plan-goals";
    }

    return this._router.navigate([this.url]);
  }
}
