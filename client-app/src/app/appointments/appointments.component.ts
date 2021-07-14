import { Component, OnInit } from "@angular/core";
import { Appointments } from "./appointments";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CaseTeamService } from "../case-team/case-team.service";
import { isNullOrUndefined } from "util";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { Router } from "@angular/router";
import { ClildFormService } from "../child-forms/child-forms.service";
import swal from "sweetalert2";
import * as moment from "moment";
import {LocalValues} from "../local-values";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.component.html",
  styleUrls: ["./appointments.component.scss"],
})
export class AppointmentsComponent implements OnInit {
  appointment: Appointments = new Appointments();
  appointmentForm: FormGroup;
  quickMenu = "referrel";
  metaData = [];
  breadcurmbs = [];
  isEdit = false;
  url: any;
  isAttachmentRequired = false;
  req: any;
  isAppHeader = true;
  isList = false;
  isForm = true;
  appointmentsList = [];

  isFormLog = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isPopup = false;
  selectedAppointementRecForPopList: any;
  constructor(
    public _fb: FormBuilder,
    public _caseTeam: CaseTeamService,
    public _opencard: OpencardsService,
    public _router: Router,
    public _client: ClildFormService,
    public _localValues: LocalValues,
    public _messgae: MessageService
  ) {}

  ngOnInit() {
    this.formValidation();
    this.breadcurmbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case Form",
        href: "/reintegration/referral/detail",
        active: "",
      },
      {
        label: "Appointments List",
        href: "/reintegration/referral/opencard/appointments/view",
        active: "",
      },
      { label: "Appointments", active: "active" }
    );
    let referralTypeId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._opencard.getHasKey();
    if (
      this._router.url == "/reintegration/referral/opencard/appointments/detail"
    ) {
      this.getRecById();
      this.isAttachmentRequired = true;
    }
    if (referralTypeId === 5) {
      this.breadcurmbs = this._localValues.breadcrumbsChanges(
        "appointments-NCFI",
        this.breadcurmbs
      );
    } else if (referralTypeId === 4) {
      this.breadcurmbs = this._localValues.breadcrumbsChanges(
        "appointments-NCFCH",
        this.breadcurmbs
      );
    } else if (referralTypeId === 7) {
      this.breadcurmbs = this._localValues.breadcrumbsChanges(
        "appointments-NCRFC",
        this.breadcurmbs
      );
    }
    if (referralTypeId === 15) {
      this.breadcurmbs = this._localValues.breadcrumbsChanges(
        "caseForm-BHOK",
        this.breadcurmbs
      );
    }
    if (referralTypeId === 14) {
      this.breadcurmbs = this._localValues.breadcrumbsChanges(
        "appointments-PRTF",
        this.breadcurmbs
      );
    }
    this.getAppointmentsList();
  }

  formValidation() {
    this.appointmentForm = this._fb.group({
      appointmentTypeID: [null, Validators.compose([Validators.required])],
      fromReferral: [null],
      notes: [null],
      when: [null, Validators.compose([Validators.required])],
      where: [null, Validators.compose([Validators.required])],
      withWhom: [null],
      yesNoPendingID: [null],
    });
  }

  appointmentFormAction(source) {
    if (this.appointmentForm.valid) {
      !isNullOrUndefined(source.when)
        ? (source.when = Date.parse(source.when))
        : null;
      !isNullOrUndefined(source.appointmentTypeID)
        ? (source.appointmentTypeID =
            source.appointmentTypeID.appointmentTypeID)
        : null;
      !isNullOrUndefined(source.yesNoPendingID)
        ? (source.yesNoPendingID = source.yesNoPendingID.yesNoPendingID)
        : null;
      source.referralID =
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey();
      if (source.appointmentID) {
        let loader = document.getElementById("loading-overlay") as HTMLElement;
        loader.style.display = "block";
        this._opencard.updateAppointments(source).then((data) => {
          loader.style.display = "none";
          if (this.isAppHeader) {
            this._router.navigate([
              "/reintegration/referral/opencard/appointments/view",
            ], { queryParamsHandling: "preserve" });
          } else {
            this.isForm = false;
            this.getAppointmentsList();
            this.isList = true;
            this._messgae.add({
              severity: "success",
              summary: "Updated!",
              detail: "The record has been updated!",
            });
          }
        });
      } else {
        let loader = document.getElementById("loading-overlay") as HTMLElement;
        loader.style.display = "block";
        this._opencard.saveAppointments(source).then((data) => {
          loader.style.display = "none";
          if (this.isAppHeader) {
            this._router.navigate([
              "/reintegration/referral/opencard/appointments/view",
            ], { queryParamsHandling: "preserve" });
          } else {
            this.isForm = false;
            this.getAppointmentsList();
            this.isList = true;
            this._messgae.add({
              severity: "success",
              summary: "Saved!",
              detail: "The record has been saved!",
            });
          }
        });
      }
    } else {
      swal("Warning", "Please fill the mandatoy fields", "info");
    }
  }

  getRecById(selectedAppointmentRecID?: any) {
    this.req = {
      appointmentID: !isNullOrUndefined(this._client.getId())
        ? this._client.getId()
        : selectedAppointmentRecID,
    };
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.getByIdAppointments(this.req).then((data) => {
      loader.style.display = "none";

      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.appointment.changedBy
      )
        ? data.appointment.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.appointment.changedDate
      )
        ? moment(data.appointment.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.appointment.enteredBy
      )
        ? data.appointment.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.appointment.enteredDate
      )
        ? moment(data.appointment.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";

      if (data.appointment.isActive) {
        !isNullOrUndefined(data.appointment.when)
          ? (data.appointment.when = moment(data.appointment.when).format(
              "MM/DD/YYYY HH:mm"
            ))
          : null;
      } else {
        !isNullOrUndefined(data.appointment.when)
          ? (data.appointment.when = moment
              .utc(data.appointment.when)
              .format("MM/DD/YYYY HH:mm"))
          : null;
      }

      this.appointment = data.appointment;
      this.isEdit = true;
      this.appointmentForm.disable();
    });
  }

  getMetaData(event, label) {
    let req: any, obj: any;
    switch (label) {
      case "appointmentType":
        obj = "appointmentType";
        break;
      case "yesNoPending":
        obj = "yesNoPending";
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data) => {
      if (label === "yesNoPending") {
        this.metaData = data.dropDown.filter((item: any) => {
          if (item.isAppointment) {
            return item;
          }
        });
      } else {
        this.metaData = data.dropDown;
      }
    });
  }

  editForm() {
    this.appointmentForm.enable();
    this.isEdit = false;
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (currentURL == "/reintegration/referral/opencard/appointments/detail") {
      this.url = "/reports/attachment-document/rfc/appointments";
    }

    return this._router.navigate([this.url]);
  }

  async getAppointmentsList() {
    let request = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
      endPagination: 100,
      beginPagination: 1,
      sort: { column: "appointmentID", mode: "desc" },
    };
    let response = await this._opencard.listAllAppointments(request);
    return (this.appointmentsList = response.appointment);
  }

  public onAddForm() {
    this.isList = false;
    this.formValidation();
    this.appointment = new Appointments();
    this.isForm = true;
    this.isEdit = false;
  }

  public onEditForm(appointment: any) {
    this.formValidation();
    let request = { appointmentID: appointment.appointmentID };
    this.selectedAppointementRecForPopList = appointment.appointmentID;
    this.req = request;
    this._opencard.getByIdAppointments(request).then((data) => {
      if (data.appointment.isActive) {
        !isNullOrUndefined(data.appointment.when)
          ? (data.appointment.when = moment(data.appointment.when).format(
              "MM/DD/YYYY HH:mm"
            ))
          : null;
      } else {
        !isNullOrUndefined(data.appointment.when)
          ? (data.appointment.when = moment
              .utc(data.appointment.when)
              .format("MM/DD/YYYY HH:mm"))
          : null;
      }
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.appointment.changedBy
      )
        ? data.appointment.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.appointment.changedDate
      )
        ? moment(data.appointment.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.appointment.enteredBy
      )
        ? data.appointment.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.appointment.enteredDate
      )
        ? moment(data.appointment.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.appointment = data.appointment;
      this.isEdit = true;
      this.appointmentForm.disable();
      this.isList = false;
      this.isForm = true;
    });
  }

  discard() {
    if (this.isAppHeader) {
      return this._router.navigate([
        "/reintegration/referral/opencard/appointments/view",
      ]);
    } else {
      this.isForm = false;
      this.getAppointmentsList();
      this.isList = true;
    }
  }

  async onDelete(event: any) {
    console.log("After appointments delete", event);
    await event;
    this.isForm = false;
    this.getAppointmentsList();
    this.isList = true;
  }
}
