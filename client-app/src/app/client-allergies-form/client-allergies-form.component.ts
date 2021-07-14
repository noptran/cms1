import { Component, OnInit } from "@angular/core";
import { ClientAllergies } from "./client-allergies";
import { ClientAllergiesService } from "../client-allergies/client-allergies.service";
import { HomeService } from "../home/home.service";
import { ReferralViewService } from "../referral-view/referral-view.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import * as moment from "moment";
import { LocalValues } from "../local-values";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-client-allergies-form",
  templateUrl: "./client-allergies-form.component.html",
  styleUrls: ["./client-allergies-form.component.scss"],
})
export class ClientAllergiesFormComponent implements OnInit {
  title = "Allergies";
  quickMenu = "client";
  breadcrumbs = [];
  formstatus: any;
  formNavigation = false;
  formControl: boolean;
  allergies: ClientAllergies = new ClientAllergies();
  editControll: boolean;
  status = "draft";
  clientId: any;
  allergiesID: any;
  clientName: any;

  formStatus: any;
  allergiesForm: FormGroup;
  discardTo = "/reports/allergies/view";
  req: any;

  isFormLog = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };

  constructor(
    public _clientAllergies: ClientAllergiesService,
    public _home: HomeService,
    public _referralView: ReferralViewService,
    public _router: Router,
    public _fb: FormBuilder,
    public _openCards: OpencardsService,
    public _localValues: LocalValues,
    public _activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.formValidation();
    if (this._router.url.includes("/reports/allergies/details")) {
      this.getAllergiesDetails();
    }
    this.getClientDetails();
    this._referralView.clientDetails().then(() => {
      this.breadcrumbs.push(
        { label: "Person Types", href: "/reports/person/types", active: "" },
        { label: "Client", href: "/reports/client/details", active: "" },
        {
          label: "Medications List",
          active: "",
          href: "/reports/medication-allergies/view",
        },
        { label: "Medications", active: "" },
        {
          label: "Allergies List",
          active: "",
          href: "/reports/allergies/view",
        },
        { label: "Allergies", active: "active" }
      );
    });
  }

  getClientDetails() {
    let localID;
    localID = localStorage.getItem("allergiesId");
    this.clientId = localID - this._openCards.getHasKey();
  }

  /**
   *
   * @param event event
   * @param source allergies form details
   */
  saveForm(source) {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.allergies = source;
    this.allergies.client = parseInt(
      this._activateRoute.snapshot.queryParamMap.get("clientId")
    );
    this.allergies.notificationDate = this._localValues.stringFormatDatetime(
      source.notificationDate
    );
    if (source.clientAllergiesID) {
      this._clientAllergies.updateAllergy(this.allergies).then((data) => {
        loader.style.display = "none";
        this._home.sucessAlert(data);
        this.allergiesForm.disable();
        this._router.navigate(["/reports/allergies/view"], {
          queryParamsHandling: "preserve",
        });

        this.formControl = true;
      });
    } else {
      this._clientAllergies.saveAllergy(this.allergies).then((data) => {
        loader.style.display = "none";
        this._home.sucessAlert(data);
        this.allergiesForm.disable();
        if (this._localValues.isAllergiesPromptTrue) {
          this._localValues.isAllergiesPromptTrue = false;
          this._router.navigate(["/reports/medication-allergies/view"], {
            queryParamsHandling: "preserve",
          });
        } else {
          this._router.navigate(["/reports/allergies/view"], {
            queryParamsHandling: "preserve",
          });
        }
        this.formControl = true;
      });
    }
  }

  /**
   *
   * @param event event
   */
  editForm() {
    this.formControl = false;
    this.allergiesForm.enable();
  }

  /**
   *
   * @param clientAllergiesID medication id
   */
  getAllergiesDetails() {
    let source, localStorageId, recordId;
    localStorageId = localStorage.getItem("allergiesId");
    recordId =
      parseInt(localStorage.getItem("allergiesId")) -
      this._openCards.getHasKey();
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.req = { clientAllergiesID: recordId };
    if (recordId) {
      this.editControll = true;
      this.formControl = true;
      this._clientAllergies.getAllergyById(recordId).then((data) => {
        this.isFormLog = true;
        this.formLogInfo.changedBy = !isNullOrUndefined(
          data.clientAllergy.changedBy
        )
          ? data.clientAllergy.changedBy
          : "------";
        this.formLogInfo.changedDate = !isNullOrUndefined(
          data.clientAllergy.changedDate
        )
          ? moment(data.clientAllergy.changedDate).format(
              "MM/DD/YYYY hh:mm:ss A"
            )
          : "--:--:-- --";
        this.formLogInfo.enteredBy = !isNullOrUndefined(
          data.clientAllergy.enteredBy
        )
          ? data.clientAllergy.enteredBy
          : "------";
        this.formLogInfo.enteredDate = !isNullOrUndefined(
          data.clientAllergy.enteredDate
        )
          ? moment(data.clientAllergy.enteredDate).format(
              "MM/DD/YYYY hh:mm:ss A"
            )
          : "--:--:-- --";

        source = data.clientAllergy;
        loader.style.display = "none";
        source.notificationDate = new Date(source.notificationDate);
        this.allergies = source;
        this.allergiesForm.disable();
      });
    }
  }

  resetForm() {}

  discardForm() {}

  formValidation() {
    this.allergiesForm = this._fb.group({
      allergies: [null],
      notificationDate: [null],
    });
  }

  ngOnDestroy() {
    this._localValues.isAllergiesPromptTrue = false;
  }
}
