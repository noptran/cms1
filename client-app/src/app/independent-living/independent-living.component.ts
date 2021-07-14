import { Component, OnInit } from "@angular/core";
import { IndependentLiving } from "./independent-living";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ClildFormService } from "../child-forms/child-forms.service";
import { Router } from "@angular/router";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { CaseTeamService } from "../case-team/case-team.service";
import { isNullOrUndefined } from "util";
import swal from "sweetalert2";
import * as moment from "moment";

@Component({
  selector: "app-independent-living",
  templateUrl: "./independent-living.component.html",
  styleUrls: ["./independent-living.component.scss"],
})
export class IndependentLivingComponent implements OnInit {
  independent: IndependentLiving = new IndependentLiving();
  independentForm: FormGroup;
  breadcrumbs = [];
  isEdit = false;
  metaData = [];
  discardTo = "/reintegration/referral/opencard/independent-living/view";
  url: any;
  isAttachmentRequired = false;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  constructor(
    public _router: Router,
    public _client: ClildFormService,
    public _fb: FormBuilder,
    public _opencard: OpencardsService,
    public _caseTeam: CaseTeamService
  ) {}

  ngOnInit() {
    this.formValidation();
    if (
      this._router.url.includes(
        "/reintegration/referral/opencard/independent-living/detail"
      )
    ) {
      this.getById();
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
        label: "Independent Living List",
        active: "",
        href: "/reintegration/referral/opencard/independent-living/view",
      },
      { label: "Independent Living", active: "active" }
    );
  }

  formValidation() {
    this.independentForm = this._fb.group({
      independentLivingTypeID: [
        null,
        Validators.compose([Validators.required]),
      ],
      completedDate: [null],
      dateSentToDCF: [null],
      notes: [null],
    });
    let currentTime = Date.now();
    this.independent.completedDate = new Date(currentTime);
    this.independent.dateSentToDCF = new Date(currentTime);
  }

  formAction(source: any) {
    if (this.independentForm.valid) {
      !isNullOrUndefined(source.independentLivingTypeID)
        ? (source.independentLivingTypeID =
            source.independentLivingTypeID.independentLivingTypeID)
        : null;
      !isNullOrUndefined(source.completedDate)
        ? (source.completedDate = Date.parse(source.completedDate))
        : null;
      !isNullOrUndefined(source.dateSentToDCF)
        ? (source.dateSentToDCF = Date.parse(source.dateSentToDCF))
        : null;
      source.referralID =
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey();
      !isNullOrUndefined(source.independentLivingID)
        ? this.update(source)
        : this.save(source);
    } else {
      swal("Warning", "Please fill the mandatory fields", "warning");
    }
  }

  save(source: any) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.saveIndependentLiving(source).then(() => {
      loader.style.display = "none";
      swal("Success", "Record has been saved!", "success");
      this._router.navigate([
        "/reintegration/referral/opencard/independent-living/view",
      ]);
    });
  }

  update(source: any) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.updateIndependentLiving(source).then(() => {
      loader.style.display = "none";
      swal("Success", "Record has been updated!", "success");
      this._router.navigate([
        "/reintegration/referral/opencard/independent-living/view",
      ]);
    });
  }

  getById() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.req = { independentLivingID: this._client.getId() };
    this._opencard.getByIdIndependentLiving(this.req).then((data: any) => {
      loader.style.display = "none";
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.IndependentLiving.changedBy
      )
        ? data.IndependentLiving.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.IndependentLiving.changedDate
      )
        ? moment(data.IndependentLiving.changedDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.IndependentLiving.enteredBy
      )
        ? data.IndependentLiving.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.IndependentLiving.enteredDate
      )
        ? moment(data.IndependentLiving.enteredDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      !isNullOrUndefined(data.IndependentLiving.beginDate)
        ? (data.IndependentLiving.beginDate = new Date(
            data.IndependentLiving.beginDate
          ))
        : null;
      !isNullOrUndefined(data.IndependentLiving.endDate)
        ? (data.IndependentLiving.endDate = new Date(
            data.IndependentLiving.endDate
          ))
        : null;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.IndependentLiving.changedBy
      )
        ? data.IndependentLiving.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.IndependentLiving.changedDate
      )
        ? moment(data.IndependentLiving.changedDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.IndependentLiving.enteredBy
      )
        ? data.IndependentLiving.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.IndependentLiving.enteredDate
      )
        ? moment(data.IndependentLiving.enteredDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      !isNullOrUndefined(data.IndependentLiving.completedDate)
        ? (data.IndependentLiving.completedDate = new Date(
            data.IndependentLiving.completedDate
          ))
        : null;
      !isNullOrUndefined(data.IndependentLiving.dateSentToDCF)
        ? (data.IndependentLiving.dateSentToDCF = new Date(
            data.IndependentLiving.dateSentToDCF
          ))
        : null;
      this.independent = data.IndependentLiving;
      this.independentForm.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.IndependentLiving.changedBy) ? data.IndependentLiving.changedBy : '------';
    this.formLogInfo.changedDate = !isNullOrUndefined(data.IndependentLiving.changedDate) ? moment(data.IndependentLiving.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
    this.formLogInfo.enteredBy = !isNullOrUndefined(data.IndependentLiving.enteredBy) ? data.IndependentLiving.enteredBy : '------';
    this.formLogInfo.enteredDate = !isNullOrUndefined(data.IndependentLiving.enteredDate) ? moment(data.IndependentLiving.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    });
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case "independentLivingType":
        obj = "independentLivingType";
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data) => {
      this.metaData = data.dropDown;
    });
  }

  editForm() {
    this.independentForm.enable();
    this.isEdit = false;
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (
      currentURL == "/reintegration/referral/opencard/independent-living/new" ||
      currentURL == "/reintegration/referral/opencard/independent-living/detail"
    ) {
      this.url = "/reports/attachment-document/rfc/independent-living";
    } else {
      this.url = "/reports/attachment-document/independent-living";
    }
    return this._router.navigate([this.url]);
  }
}
