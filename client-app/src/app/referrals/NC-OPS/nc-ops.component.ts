import { OnInit, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NCOPS } from "./nc-ops";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { CaseTeamService } from "../../case-team/case-team.service";
import { isNullOrUndefined } from "util";
import swal from "sweetalert2";
import { ClildFormService } from "../../child-forms/child-forms.service";
import * as moment from "moment";

@Component({
  selector: "app-nc-ops-component",
  templateUrl: "./nc-ops.component.html",
  styleUrls: ["./nc-ops.component.scss"],
})
export class NCOPSComponent implements OnInit {
  procodesForReferral: any[];
  constructor(
    public _router: Router,
    public _fb: FormBuilder,
    public _openCard: OpencardsService,
    public _caseTeam: CaseTeamService,
    public _client: ClildFormService,
    public _activateRoute: ActivatedRoute
  ) {}

  mainTabs = [];
  sIndex: number = null;
  isAttachmentRequired = false;
  edit = false;
  discardTo = "/reports/opencards/list/client/case";
  breadcrumbs = [];
  viewMode = false;
  opsForm: FormGroup;
  ops: NCOPS = new NCOPS();
  listOfProcodes = [];
  listOfPayors = [];
  listOfServiceTypes = [];
  filteredServieTypes = [];
  metadata = [];
  displayCasePayor: any;
  displayServiceType: any;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  refcOpencards = [];
  iconurl =
    "https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/";

  ngOnInit() {
    this.defineMainTabs();
    this.formValidation();
    if (this._router.url.includes("/reports/referral/nc-ops/detail")) {
      this.getById();
      this.isAttachmentRequired = true;
    }
    if (this._router.url.includes("/reports/referral/nc-ops/new")) {
      this.ops.beginDate = new Date(Date.now());
      this.ops.reBeginDate = new Date(Date.now());
    }

    this._openCard.getSerivceType().then((data: any) => {
      this.listOfServiceTypes = data.serviceTypeList;
    });
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case List",
        href: "/reports/opencards/list/client/case",
        active: "",
      },
      { label: "Case Form", active: "active" }
    );
    this.setIndex(0);
    this.refcOpencards = [
      {
        title: "Case File Activity",
        tip: "Family",
        navigation: "",
        icon: this.iconurl + "",
      },
      {
        title: "Case Team",
        tip: "Assessments",
        navigation: "",
        icon: "assets/Nodesicon/case team.svg",
      },
      {
        title: "Family",
        tip: "Family",
        navigation: "",
        icon: this.iconurl + "",
      },
      {
        title: "Case Activity",
        tip: "Family",
        navigation: "",
        icon: this.iconurl + "",
      },
      {
        title: "Progress Notes",
        tip: "Family",
        navigation: "",
        icon: this.iconurl + "",
      },
      {
        title: "Progress Note Diagnosis",
        tip: "Family",
        navigation: "",
        icon: this.iconurl + "",
      },
      {
        title: "Service Agreement",
        tip: "Family",
        navigation: "",
        icon: this.iconurl + "",
      },
    ];
    this.refcOpencards.sort((a, b) => {
      return a["title"].localeCompare(b["title"]);
    });
    this.getProcodes();
  }

  defineMainTabs() {
    return (this.mainTabs = [
      { label: "Wizard 1", href: "#nav-wizard_1" },
      { label: "Wizard 2", href: "#nav-wizard_2" },
    ]);
  }

  setIndex(index: number) {
    this.sIndex = index;
  }

  navigateTo() {
    let currentURL = this._router.url,
      url;
    if (currentURL == "/reports/referral/nc-ops/detail") {
      url = "/reports/attachment-document/nc-ops";
    }
    return this._router.navigate([url]);
  }

  formAction() {
    console.log("OPS Req", JSON.stringify(this.ops));

    !isNullOrUndefined(this.ops.beginDate)
      ? (this.ops.beginDate = new Date(this.ops.beginDate).getTime())
      : null;
    !isNullOrUndefined(this.ops.endDate)
      ? (this.ops.endDate = new Date(this.ops.endDate).getTime())
      : null;
    !isNullOrUndefined(this.ops.reBeginDate)
      ? (this.ops.reBeginDate = new Date(this.ops.reBeginDate).getTime())
      : null;
    !isNullOrUndefined(this.ops.reEndDate)
      ? (this.ops.reEndDate = new Date(this.ops.reEndDate).getTime())
      : null;
    !isNullOrUndefined(this.ops.rePayorID)
      ? (this.ops.rePayorID = this.ops.rePayorID.payorID)
      : null;
    !isNullOrUndefined(this.ops.payorID)
      ? (this.ops.payorID = this.ops.payorID.payorID)
      : null;
    !isNullOrUndefined(this.ops.procodeID)
      ? (this.ops.procodeID = this.ops.procodeID.ProcodeID)
      : null;
    !isNullOrUndefined(this.ops.serviceTypeID)
      ? (this.ops.serviceTypeID = this.ops.serviceTypeID.serviceTypeID)
      : null;
    this.ops.clientID = parseInt(
      this._activateRoute.snapshot.queryParamMap.get("clientId")
    );
    this.ops.referralEventTypeID = 4;
    this.ops.referralTypeID = 9;
    if (this._router.url.includes("/reports/referral/nc-ops/detail")) {
      let loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      let req = {
        beginDate: !isNullOrUndefined(this.ops.beginDate)
          ? (this.ops.beginDate = new Date(this.ops.beginDate).getTime())
          : null,
        endDate: !isNullOrUndefined(this.ops.endDate)
          ? (this.ops.endDate = new Date(this.ops.endDate).getTime())
          : null,
        officeFile: this.ops.officeFile,
        serviceTypeID: !isNullOrUndefined(this.displayServiceType)
          ? this.displayServiceType.serviceTypeID
          : null,
        notes: this.ops.notes,
        payorID: !isNullOrUndefined(this.displayCasePayor)
          ? this.displayCasePayor.payorID
          : null,
        caseID: this.ops.caseID,
        referralID: this.ops.referralID,
      };
      this._openCard.updateOPSReferral(req).then((data: any) => {
        loader.style.display = "none";
        if (data.responseStatus) {
          swal("Updated!", "The referral program has been updated!", "success");
          this._router.navigate(["/reports/opencards/list/client/case"]);
        } else {
          swal("Something went wrong!", "Please retry!", "error");
          this.ops = new NCOPS();
        }
      });
    } else {
      if (this.opsForm.valid) {
        let loader = document.getElementById("loading-overlay") as HTMLElement;
        loader.style.display = "block";
        this._openCard.saveOPSReferral(this.ops).then((data: any) => {
          loader.style.display = "none";
          if (data.responseStatus) {
            swal("Saved!", "The referral program has been saved!", "success");
            this._router.navigate(["/reports/opencards/list/client/case"]);
          } else {
            swal("Something went wrong!", "Please retry!", "error");
            this.ops = new NCOPS();
          }
        });
      } else {
        swal(
          "Mandatory fields are missing!",
          "Please fill the mandatory fields",
          "info"
        );
      }
    }
  }

  editForm() {
    this.opsForm.enable();
    this.edit = true;
  }

  formValidation() {
    this.opsForm = this._fb.group({
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      payorID: [null, Validators.compose([Validators.required])],
      officeFile: [null],
      notes: [null],
      referralEventTypeID: [null],
      reBeginDate: [null, Validators.compose([Validators.required])],
      reEndDate: [null],
      rePayorID: [null, Validators.compose([Validators.required])],
      units: [null, Validators.compose([Validators.required])],
      unitRate: [null, Validators.compose([Validators.required])],
      procodeID: [null, Validators.compose([Validators.required])],
      reNotes: [null],
      homeCountyID: [null],
      serviceTypeID: [null],
    });
  }

  getMasterValues() {
    let procodeReq = { Object: "procode", value: "" },
      payorReq = { Object: "payor", value: "" },
      serviceTypeReq = {};
    this._caseTeam.getSearchList(procodeReq).then((data: any) => {
      this.listOfProcodes = data.dropDown;
    });
    this._caseTeam.getSearchList(payorReq).then((data: any) => {
      this.listOfProcodes = data.dropDown;
    });
  }

  getMetaData(label: string, event: any) {
    let req: any, selectedObject: any;
    switch (label) {
      case "payor":
        selectedObject = "payor";
        break;
      case "serviceType":
        selectedObject = "kippServiceType";
        break;
    }
    req = { Object: selectedObject, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      if (label === "payor") {
        data.dropDown.map((item: any) => {
          item["payorDisplay"] = `${item.payorName} - ${item.alias}`;
        });
      }
      this.metadata = data.dropDown;
    });
  }

  dateOnClick(event: any) {
    this.ops.reBeginDate = this.ops.beginDate;
  }

  autoCompleteOnSelect(event: any) {
    this.ops.payorID = this.ops.rePayorID;
  }

  getById() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {
      referralID: parseInt(
        this._activateRoute.snapshot.queryParamMap.get("ref_id")
      ),
    };
    this._openCard.getByIdOPSReferral(req).then((data: any) => {
      !isNullOrUndefined(data.referralDetails.beginDate)
        ? (data.referralDetails.beginDate = new Date(
            data.referralDetails.beginDate
          ))
        : null;
      !isNullOrUndefined(data.referralDetails.endDate)
        ? (data.referralDetails.endDate = new Date(
            data.referralDetails.endDate
          ))
        : null;
      delete data.referralDetails.payorID;
      delete data.referralDetails.serviceTypeID;
      this.ops.payorID = data.payorID;
      this.displayCasePayor = {
        payorDisplay: `${data.payorID.payorName} - ${data.payorID.alias}`,
      };
      this.displayServiceType = data.serviceTypeID;
      localStorage.setItem(
        "referralTypeId",
        data.referralDetails.referralTypeID + this._openCard.getHasKey()
      );
      this.ops = data.referralDetails;
      this.viewMode = true;
      this.edit = true;
      this.opsForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.referralDetails.changedBy
      )
        ? data.referralDetails.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.referralDetails.changedDate
      )
        ? moment(data.referralDetails.changedDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.referralDetails.enteredBy
      )
        ? data.referralDetails.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.referralDetails.enteredDate
      )
        ? moment(data.referralDetails.enteredDate).format(
            "MM/DD/YYYY hh:mm:ss A"
          )
        : "--:--:-- --";

      loader.style.display = "none";
    });
  }

  filterServiceTypes(event: any) {
    this.filteredServieTypes = [];
    this.listOfServiceTypes.filter((item: any) => {
      if (item.serviceType.indexOf(event.query) !== -1) {
        this.filteredServieTypes.push(item);
      }
    });
  }

  nodeNavigateTo(label: any) {
    let url: any;
    switch (label) {
      case "Case Activity":
        url = "/reports/referral/family-preservation/case-activity/view";
        break;
      case "Case Team":
        url = "/reports/referral/family-preservation/case-team/view";
        break;
      case "Family":
        url = "/reports/family/view";
        break;
      case "Case File Activity":
        url = "/reintegration/referral/opencard/case-file-activity/view";
        break;
      case "Progress Notes":
        url = "/reports/referral/family-preservation/progress-notes/view";
        break;
      case "Progress Note Diagnosis":
        url =
          "/reports/referral/family-preservation/progress-note-diagnosis/view";
        break;
      case "Service Agreement":
        url = "/reports/service-agreement/view";
        break;
    }
    return this._router.navigate([url], { queryParamsHandling: "preserve" });
  }

  getProcodes() {
    let req = { referralTypeID: 9 };
    this._openCard.getProcodeBasedOnReferralType(req).then((data: any) => {
      this.procodesForReferral = data.procode;
    });
  }

  filteredProcode(event: any) {
    this.metadata = this.procodesForReferral.filter((item: any) => {
      return item.ProcodeName.toLowerCase().indexOf(event.query) !== -1;
    });
  }
}
