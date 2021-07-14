import { Component, OnInit } from "@angular/core";
import { License } from "./license";
import { isNullOrUndefined } from "util";
import { Router } from "@angular/router";
import { CaseTeamService } from "../../../case-team/case-team.service";
import { ProviderService } from "../../provider.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import * as moment from "moment";

@Component({
  selector: "app-license",
  templateUrl: "./license.component.html",
  styleUrls: ["./license.component.scss"],
})
export class LicenseComponent implements OnInit {
  discardTo = "/provider/opencard/license/view";
  license: License = new License();
  providerLicense: FormGroup;
  breadcrumbs = [];
  metaData = [];
  isEdit = false;
  isAttachmentRequired = false;
  url: any;
  req: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;

  constructor(
    public _caseTeam: CaseTeamService,
    public _router: Router,
    public _provider: ProviderService,
    public _fb: FormBuilder,
    public _opencard: OpencardsService
  ) {}

  ngOnInit() {
    this.breadcrumbs.push(
      { label: "Person Types", href: "/reports/person/types", active: "" },
      { label: "Provider List", href: "/reports/provider/view", active: "" },
      { label: "Provider Form", href: "/reports/provider/detail", active: "" },
      { label: "Provider Opencards", active: "", href: "/provider/dashboard" },
      {
        label: "License and sponsorship ",
        active: "",
        href: "/provider/dashboard/license-sponsorship",
      },
      {
        label: "License List",
        active: "",
        href: "/provider/opencard/license/view",
      },
      { label: "License", active: "active" }
    );
    this.formValidation();
    if (this._router.url === "/provider/opencard/license/detail") {
      this.isAttachmentRequired = true;
      this.getProviderLicenseDetails();
    }
  }

  save(source: License) {
    !isNullOrUndefined(source.beginDate)
      ? (source.beginDate = Date.parse(source.beginDate))
      : null;
    !isNullOrUndefined(source.endDate)
      ? (source.endDate = Date.parse(source.endDate))
      : null;
    if (this._router.url === "/provider/opencard/license/new") {
      let req = {
        beginDate: !isNullOrUndefined(source.beginDate)
          ? source.beginDate
          : null,
        endDate: !isNullOrUndefined(source.endDate) ? source.endDate : null,
        licenseNo: !isNullOrUndefined(source.licenseNo)
          ? source.licenseNo
          : null,
        licenseCapacity: !isNullOrUndefined(source.licenseCapacity)
          ? source.licenseCapacity
          : null,
        licenseStatusID: !isNullOrUndefined(source.licenseStatusID)
          ? source.licenseStatusID.licenseStatusID
          : null,
        licenseTypeID: !isNullOrUndefined(source.licenseTypeID)
          ? source.licenseTypeID.licenseTypeID
          : null,
        notes: !isNullOrUndefined(source.notes) ? source.notes : null,
        oldestLicensed: !isNullOrUndefined(source.oldestLicensed)
          ? source.oldestLicensed
          : null,
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencard.getHasKey(),
        providerLocationID: !isNullOrUndefined(source.providerLocationID)
          ? source.providerLocationID.providerLocationID
          : null,
        youngestLicensed: !isNullOrUndefined(source.youngestLicensed)
          ? source.youngestLicensed
          : null,
      };
      const loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      this._provider.providerLicenseSave(req).then((data) => {
        loader.style.display = "none";
        this._router.navigate(["/provider/opencard/license/view"]);
      });
    }
    if (this._router.url === "/provider/opencard/license/detail") {
      let req = {
        beginDate: !isNullOrUndefined(source.beginDate)
          ? source.beginDate
          : null,
        endDate: !isNullOrUndefined(source.endDate) ? source.endDate : null,
        licenseNo: !isNullOrUndefined(source.licenseNo)
          ? source.licenseNo
          : null,
        licenseCapacity: !isNullOrUndefined(source.licenseCapacity)
          ? source.licenseCapacity
          : null,
        licenseStatusID: !isNullOrUndefined(source.licenseStatusID)
          ? source.licenseStatusID.licenseStatusID
          : null,
        licenseTypeID: !isNullOrUndefined(source.licenseTypeID)
          ? source.licenseTypeID.licenseTypeID
          : null,
        notes: !isNullOrUndefined(source.notes) ? source.notes : null,
        oldestLicensed: !isNullOrUndefined(source.oldestLicensed)
          ? source.oldestLicensed
          : null,
        providerID:
          parseInt(localStorage.getItem("providerID")) -
          this._opencard.getHasKey(),
        providerLocationID: !isNullOrUndefined(source.providerLocationID)
          ? source.providerLocationID.providerLocationID
          : null,
        youngestLicensed: !isNullOrUndefined(source.youngestLicensed)
          ? source.youngestLicensed
          : null,
        providerLicenseID:
          parseInt(localStorage.getItem("providerLicenseID")) -
          this._opencard.getHasKey(),
      };
      const loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      this._provider.providerLicenseUpdate(req).then((data) => {
        loader.style.display = "none";
        this._router.navigate(["/provider/opencard/license/view"]);
      });
    }
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case "licenseType":
        obj = "licenseType";
        break;
      case "licenseStatus":
        obj = "licenseStatus";
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.metaData = data.dropDown;
    });
  }

  location(event) {
    const id =
      parseInt(localStorage.getItem("providerID")) - this._opencard.getHasKey();
    const req = { providerID: id };
    this._provider.getProviderLocation(req).then((data) => {
      data.providerLocationID.map((item: any) => {
        item["fullName"] = `${
          !isNullOrUndefined(item.address1) ? item.address1 : null
        }
        ${!isNullOrUndefined(item.cityID) ? item.cityID.city : null}
        ${!isNullOrUndefined(item.zipcodeID) ? item.zipcodeID.zipcode : null}
        ${
          !isNullOrUndefined(item.beginDate)
            ? moment(item.beginDate).format("MM-DD-YYYY")
            : null
        }`;
      });
      this.metaData = data.providerLocationID;
    });
  }

  formValidation() {
    this.providerLicense = this._fb.group({
      beginDate: [null],
      endDate: [null],
      licenseID: [null],
      providerLocationID: [null],
      licenseTypeID: [null],
      licenseStatusID: [null],
      licenseNo: [null],
      licenseCapacity: [null],
      youngestLicensed: [null],
      oldestLicensed: [null],
      notes: [null],
    });
  }
  editForm() {
    this.providerLicense.enable();
    this.isEdit = false;
  }
  getProviderLicenseDetails() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.req = {
      providerLicenseID:
        parseInt(localStorage.getItem("providerLicenseID")) -
        this._opencard.getHasKey(),
    };
    this._provider.getProviderLicense(this.req).then((data) => {
      !isNullOrUndefined(data.providerLicense.beginDate)
        ? (this.license.beginDate = new Date(data.providerLicense.beginDate))
        : null;
      !isNullOrUndefined(data.providerLicense.endDate)
        ? (this.license.endDate = new Date(data.providerLicense.endDate))
        : null;
      !isNullOrUndefined(data.providerLicense.providerLocationID)
        ? (this.license.providerLocationID = {
            fullName: `${
              !isNullOrUndefined(
                data.providerLicense.providerLocationID.address1
              )
                ? data.providerLicense.providerLocationID.address1
                : null
            }
      ${
        !isNullOrUndefined(data.providerLicense.providerLocationID.cityID)
          ? data.providerLicense.providerLocationID.cityID.city
          : null
      }
      ${
        !isNullOrUndefined(data.providerLicense.providerLocationID.zipcodeID)
          ? data.providerLicense.providerLocationID.zipcodeID.zipcode
          : null
      }
      ${
        !isNullOrUndefined(data.providerLicense.providerLocationID.beginDate)
          ? moment(data.providerLicense.providerLocationID.beginDate).format(
              "MM-DD-YYYY"
            )
          : null
      }`,
          })
        : null;

      !isNullOrUndefined(data.providerLicense.licenseCapacity)
        ? (this.license.licenseCapacity = data.providerLicense.licenseCapacity)
        : null;
      !isNullOrUndefined(data.providerLicense.licenseNo)
        ? (this.license.licenseNo = data.providerLicense.licenseNo)
        : null;
      !isNullOrUndefined(data.providerLicense.licenseStatusID)
        ? (this.license.licenseStatusID = data.providerLicense.licenseStatusID)
        : null;
      !isNullOrUndefined(data.providerLicense.licenseTypeID)
        ? (this.license.licenseTypeID = data.providerLicense.licenseTypeID)
        : null;
      !isNullOrUndefined(data.providerLicense.notes)
        ? (this.license.notes = data.providerLicense.notes)
        : null;
      !isNullOrUndefined(data.providerLicense.oldestLicensed)
        ? (this.license.oldestLicensed = data.providerLicense.oldestLicensed)
        : null;
      !isNullOrUndefined(data.providerLicense.providerID)
        ? (this.license.providerID = data.providerLicense.providerID.providerID)
        : null;
      !isNullOrUndefined(data.providerLicense.youngestLicensed)
        ? (this.license.youngestLicensed =
            data.providerLicense.youngestLicensed)
        : null;
      this.providerLicense.disable();
      this.isEdit = true;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.providerLicense.changedBy
      )
        ? data.providerLicense.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.providerLicense.changedDate
      )
        ? moment(data.providerLicense.changedDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.providerLicense.enteredBy
      )
        ? data.providerLicense.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.providerLicense.enteredDate
      )
        ? moment(data.providerLicense.enteredDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";

      loader.style.display = "none";
    });
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == "/provider/opencard/license/detail") {
      this.url = "/reports/attachment-document/providers/license";
    }
    return this._router.navigate([this.url]);
  }
}
