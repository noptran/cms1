import { Component, OnInit } from "@angular/core";
import { Payee } from "./payee";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CaseTeamService } from "../case-team/case-team.service";
import { PayeeLocation } from "./payee-location";
import { ClildFormService } from "../child-forms/child-forms.service";
import { isNullOrUndefined } from "util";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import {LocalValues} from "../local-values";
import * as moment from "moment";

@Component({
  selector: "app-payee",
  templateUrl: "./payee.component.html",
  styleUrls: ["./payee.component.scss"],
})
export class PayeeComponent implements OnInit {
  payee: Payee = new Payee();
  location: PayeeLocation = new PayeeLocation();
  payeeForm: FormGroup;
  payeeLocaitonForm: FormGroup;
  metaData = [];
  cities = [];
  selectedStateID: any;
  payeeLocationList = [];
  locationBtnLabel = "Add Location";
  selectedLocationIndex: any;
  breadcrumbs = [];
  isEdit = false;
  opencards = [];
  serviceAubNodes = [];
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  iconurl =
    "https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/";

  isDeleteConfirmation = false;
  deleteConfirmationBtnLabel = "Confirm";
  isDeleteConfirmationDisable = false;
  infoText: string;
  isPayeeLocation = false;
  showAuthClaim = false;
  constructor(
    public _local: LocalValues,
    public _fb: FormBuilder,
    public _caseTeam: CaseTeamService,
    public _client: ClildFormService,
    public _opencard: OpencardsService,
    public _router: Router
  ) {}

  ngOnInit() {
    this.payeeFormValidation();
    this.payeeLocationFormValidation();
    if (
      this._router.url.includes("/reports/payee/detail") ||
      this._router.url.includes("/reports/payee-location/detail")
    ) {
      this.getRecById();
      this.opencards = [
        {
          title: "Authorizations Summary (View Only)",
          tip: "Authorizations Summary (View Only)",
          navigation: "/payee/auth_list",
          icon: this.iconurl + "assessment icon.svg",
        },
        {
          title: "Location",
          tip: "Location",
          navigation: "/reports/payee-location/view",
          icon: this.iconurl + "assessment icon.svg",
        },
        {
          title: "Service Claims",
          tip: "Service Claims",
          navigation: "",
          icon: this.iconurl + "assessment icon.svg",
        },
      ];
      this.serviceAubNodes = [
        {
          title: "Direct Authorizations",
          tip: "Direct Authorizations",
          navigation: "/payee/serviceClaim/directAuth",
          icon: this.iconurl + "assessment icon.svg",
        },
        {
          title: "Hard Goods",
          tip: "Hard Goods",
          navigation: "/payee/serviceClaim_hardgoods/auth_list",
          icon: this.iconurl + "assessment icon.svg",
        },
        {
          title: "Other Services",
          tip: "Other Services",
          navigation: "/payee/serviceClaim_otherService/auth_list",
          icon: this.iconurl + "assessment icon.svg",
        },
      ];
    } else {
      this.opencards = [];
    }

    this.breadcrumbs = [];
    if (this._router.url.includes("/reports/payee-location")) {
      this.isPayeeLocation = true;
      this.breadcrumbs.push(
        { label: "Person Types", href: "/reports/person/types", active: "" },
        { label: "Payee List", href: "/reports/payee/view", active: "" },
        { label: "Payor Form", href: "/reports/payee/detail", active: "" },
        {
          label: "Payor Location List",
          href: "/reports/payee-location/view",
          active: "",
        },
        { label: "Payor Location Form", href: "", active: "active" }
      );
    } else if (this._router.url.includes("/reports/payee")) {
      this.breadcrumbs.push(
        { label: "Person Types", href: "/reports/person/types", active: "" },
        { label: "Payee List", href: "/reports/payee/view", active: "" },
        { label: "Form", active: "active" }
      );
    } else if (this._router.url.includes("/csPayee/payeeform")) {
      this.getRecById();
      this.showAuthClaim = true;
      this.breadcrumbs = [
        { label: "Cards", href: "/reports/client-view/cards", active: "" },
        { label: "CS - Payee List", href: "/csPayee", active: "" },
        { label: "CS - Payee Form", active: "active" },
      ];
    }
  }

  payeeFormValidation() {
    this.payeeForm = this._fb.group({
      payeeName: [null, Validators.compose([Validators.required])],
      acronym: [null],
      venderID: [null],
      fedTaxNo: [null],
      email: [null],
      notes: [null],
      locationHeader: [null],
      // locationHeader: [null, Validators.compose([Validators.required])],
      address1: [null],
      address2: [null],
      stateID: [null],
      cityID: [null],
      countyID: [null],
      zipcodeID: [null],
      phone: [null],
      fax: [null],
      beginDate: [null],
      endDate: [null],
      locationNotes: [null],
    });
    this.payeeForm.controls["cityID"].disable();
    this.payeeForm.controls["zipcodeID"].disable();
    this.payeeForm.controls["countyID"].disable();
  }

  payeeFormAction(source: any) {
    if (this.payeeForm.valid) {
      if (this.payeeLocationList.length > 0) {
        this.payeeLocationList.filter((item) => {
          return (
            (item.beginDate = !isNullOrUndefined(item.beginDate)
              ? this._local.stringFormatDatetime(Date.parse(item.beginDate))
              : null),
            (item.endDate = !isNullOrUndefined(item.endDate)
              ? this._local.stringFormatDatetime(Date.parse(item.endDate))
              : null),
            (item.cityID = !isNullOrUndefined(item.cityID)
              ? item.cityID.cityID
              : null),
            (item.stateID = !isNullOrUndefined(item.stateID)
              ? item.stateID.stateID
              : null),
            (item.countyID = !isNullOrUndefined(item.countyID)
              ? item.countyID.countyID
              : null),
            (item.zipcodeID = !isNullOrUndefined(item.zipcodeID)
              ? item.zipcodeID.zipcodeID
              : null)
          );
        });
        source.payeeLocation = this.payeeLocationList;
        if (source.venderID == "") {
          source.venderID = null;
        }
        if (source.payeeID) {
          let loader = document.getElementById(
            "loading-overlay"
          ) as HTMLElement;
          loader.style.display = "block";
          this._opencard.updatePayee(source).then((data) => {
            loader.style.display = "none";
            if (!data.responseStatus) {
              swal("Warning", `${data.responseMessage}`, "warning");
              this.getRecById();
            } else {
              if (this._router.url == "/reports/payee-location/detail") {
                return this._router.navigate(["/reports/payee-location/view"]);
              } else if (this._router.url == "/csPayee/payeeform") {
                return this._router.navigate(["/csPayee"]);
              } else {
                swal("Success", "Payee Updated Successfully", "success");
                loader.style.display = "none";
                let req = { payeeID: data.payee.payeeID };
                this._opencard.getByRecIdPayee(req).then((data) => {
                  loader.style.display = "none";
                  this.payeeForm.disable();
                  this.isEdit = true;
                  this.payee = data.payee;
                  data.payeeLocation.filter((item) => {
                    return (
                      (item.beginDate = !isNullOrUndefined(item.beginDate)
                        ? new Date(item.beginDate)
                        : null),
                      (item.endDate = !isNullOrUndefined(item.endDate)
                        ? new Date(item.endDate)
                        : null)
                    );
                  });
                  if (
                    data.payeeLocation.stateID &&
                    data.payeeLocation.stateID.state
                  ) {
                    data.payeeLocation.sort((a, b) => {
                      a["stateID"]["state"].localeCompare(
                        b["stateID"]["state"]
                      );
                    });
                  }
                  this.payeeLocationList = data.payeeLocation;
                });
              }
            }
          });
        } else {
          let loader = document.getElementById(
            "loading-overlay"
          ) as HTMLElement;
          loader.style.display = "block";
          this._opencard.savePayee(source).then((data) => {
            loader.style.display = "none";
            if (!data.responseStatus) {
              swal(
                "Warning",
                "The end Date must be greater than the begin Date in the previous record.",
                "warning"
              );
            } else {
              swal("Success", "Payee Saved Successfully", "success");
              loader.style.display = "block";
              let req = { payeeID: data.payee.payeeID };
              this._opencard.getByRecIdPayee(req).then((data) => {
                loader.style.display = "none";
                this.payeeForm.disable();
                this.isEdit = true;
                this.payee = data.payee;
                data.payeeLocation.filter((item) => {
                  return (
                    (item.beginDate = !isNullOrUndefined(item.beginDate)
                      ? new Date(item.beginDate)
                      : null),
                    (item.endDate = !isNullOrUndefined(item.endDate)
                      ? new Date(item.endDate)
                      : null)
                  );
                });
                if (
                  data.payeeLocation.stateID &&
                  data.payeeLocation.stateID.state
                ) {
                  data.payeeLocation.sort((a, b) => {
                    a["stateID"]["state"].localeCompare(b["stateID"]["state"]);
                  });
                }
                this.payeeLocationList = data.payeeLocation;
              });
            }
          });
        }
      } else {
        swal(
          "Warning",
          "You must add atleast one payee location record",
          "info"
        );
      }
    } else {
      swal(
        "Mandatory fields missing!",
        "Please fill the mandatory fields",
        "warning"
      );
    }
  }

  locationFormAction(source: any) {
    if (this.payeeLocaitonForm.valid) {
      if (this.locationBtnLabel !== "Update Location") {
        this.payeeLocationList.push(source);
      } else {
        this.payeeLocationList.splice(this.selectedLocationIndex, 1);
        this.payeeLocationList.push(source);
        this.locationBtnLabel = "Add Location";
      }
      this.location = new PayeeLocation();
    } else {
      swal("Warning", "Mandatory fields are missing!", "info");
    }
  }

  editPayeeForm() {
    this.isEdit = false;
    this.payeeForm.enable();
  }

  getMetaData(event: any, label: any) {
    let req, Obj;
    switch (label) {
      case "vendor":
        Obj = "vendor";
        break;
      case "state":
        this.location.zipcodeID = "";
        this.location.cityID = "";
        this.location.countyID = "";
        Obj = "state";
        break;
    }
    req = { Object: Obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data) => {
      this.metaData = data.dropDown;
    });
  }

  generateCity(event: any) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.cities = [];
    this.payeeForm.controls["cityID"].disable();
    let req = { stateID: event.stateID };
    this.selectedStateID = event.stateID;
    this._client.getCityFromState(req).then((data) => {
      loader.style.display = "none";
      this.cities = data.city;
      this.payeeForm.controls["cityID"].enable();
    });
  }
  zipcodes = [];
  Countys = [];
  allZipCodes = [];
  allCountys = [];
  generateZipcodeCounty(event: any) {
    this.metaData = [];
    this.zipcodes = [];
    this.Countys = [];
    this.allZipCodes = [];
    this.allCountys = [];
    let req = { stateID: this.selectedStateID, cityID: event.cityID };
    this._client.getZipcodeFromCityState(req).then((data) => {
      if (data.zipcode.length == 0) {
        this.location.zipcodeID = "No Zipcode found!";
      }
      if (data.county.length == 0) {
        this.location.countyID = "No County found!";
      }

      if (data.zipcode.length > 1) {
        this.payeeForm.controls["zipcodeID"].enable();
        this.metaData = data.zipcode;
        this.zipcodes = data.zipcode;
      } else {
        this.location.zipcodeID = data.zipcode[0];
        this.zipcodes = data.zipcode;
      }

      if (data.county.length > 1) {
        this.payeeForm.controls["countyID"].enable();
        this.metaData = data.county;
        this.Countys = data.county;
      } else {
        this.location.countyID = data.county[0];
        this.Countys = data.county;
      }
    });
  }

  filteredCity(event: any) {
    if (event.query) {
      event.query = event.query.charAt(0).toUpperCase() + event.query.slice(1);
    }
    this.metaData = [];
    this.cities.filter((item) => {
      if (item.city.indexOf(event.query) !== -1) {
        return this.metaData.push(item);
      }
    });
  }

  openLocationCard(item: any, i: any) {
    this.locationBtnLabel = "Update Location";
    this.selectedLocationIndex = i;
    this.location = item;

    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = { stateID: item.stateID.stateID };
    this.selectedStateID = item.stateID.stateID;
    this._client.getCityFromState(req).then((data) => {
      loader.style.display = "none";
      this.cities = data.city;
    });
  }

  getRecById() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = { payeeID: parseInt(localStorage.getItem("payeeID")) };
    this._opencard.getByRecIdPayee(req).then((data) => {
      loader.style.display = "none";
      this.payeeForm.disable();
      this.isEdit = true;
      this.payee = data.payee;
      data.payeeLocation.filter((item) => {
        return (
          (item.beginDate = !isNullOrUndefined(item.beginDate)
            ? new Date(item.beginDate)
            : null),
          (item.endDate = !isNullOrUndefined(item.endDate)
            ? new Date(item.endDate)
            : null)
        );
      });
      if (data.payeeLocation.stateID && data.payeeLocation.stateID.state) {
        data.payeeLocation.sort((a, b) => {
          a["stateID"]["state"].localeCompare(b["stateID"]["state"]);
        });
      }
      this.payeeLocationList = data.payeeLocation;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.payee.changedBy)
        ? data.payee.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(data.payee.changedDate)
        ? moment(data.payee.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.payee.enteredBy)
        ? data.payee.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.payee.enteredDate)
        ? moment(data.payee.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
    });
  }

  removeLocation() {
    this.payeeLocationList = this.payeeLocationList.splice(
      this.selectedLocationIndex,
      1
    );
    this.locationBtnLabel = "Add Location";
    this.location = new PayeeLocation();
  }
  servisSubNode = false;

  navigateTo(data) {
    if (data.title === "Service Claims") {
      this.servisSubNode = true;
    } else {
      this._router.navigate([data.navigation]);
    }
  }
  close() {
    this.servisSubNode = false;
  }

  async onDelete() {
    this.deleteConfirmationBtnLabel = "Deleting...";
    this.isDeleteConfirmationDisable = true;

    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    if (this.location.payeeLocationID) {
      let req = {
        payeeLocationID: this.location.payeeLocationID,
      };
      this._opencard.deletePayeeLocation(req).then((data) => {
        loader.style.display = "none";
        this.infoText = "The record has been deleted successfully!";
        this.deleteConfirmationBtnLabel = "Confirm";
        this.isDeleteConfirmationDisable = false;
        this.isDeleteConfirmation = false;
        this.location = new PayeeLocation();
        this.getRecById();
      });
    }
  }

  discardForm() {
    let url = "/reports/payee/view";
    if (this._router.url.includes("/reports/payee-location/detail")) {
      url = "/reports/payee-location/view";
    }
    this._router.navigate([url]);
  }

  filteredCounty(event) {
    this.allCountys = [];
    this.Countys.filter((item) => {
      if (item.countyName.indexOf(event.query) !== -1) {
        return this.allCountys.push(item);
      }
    });
  }
  filteredZipCode(event) {
    this.allZipCodes = [];
    this.zipcodes.filter((item) => {
      if (item.zipcode.indexOf(event.query) !== -1) {
        return this.allZipCodes.push(item);
      }
    });
  }
  showDirectAuthList(redirect) {
    if (redirect === "Direct Authorization") {
      this._router.navigate(["/csPayee/payeeform/payee-DirectAuthList"]);
    } else {
      this._router.navigate(["/csPayee/payeeform/payee-AuthList"]);
    }
  }

  public payeeLocationFormValidation() {
    return (this.payeeLocaitonForm = this._fb.group({
      locationHeader: [null],
      address1: [null],
      address2: [null],
      stateID: [null, Validators.compose([null, Validators.required])],
      cityID: [null, Validators.compose([null, Validators.required])],
      countyID: [null, Validators.compose([null, Validators.required])],
      zipcodeID: [null, Validators.compose([null, Validators.required])],
      phone: [null],
      fax: [null],
      beginDate: [null, Validators.compose([null, Validators.required])],
      endDate: [null],
      locationNotes: [null],
    }));
  }
}
