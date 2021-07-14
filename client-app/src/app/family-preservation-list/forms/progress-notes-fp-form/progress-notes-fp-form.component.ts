import { Component, OnInit, Input } from "@angular/core";
import {
  ProgressNotes,
  ProgressNotesPrint,
  medicalNecessary,
  mentalStatus,
  therapyTypes,
  encounter,
  ProgressNoteDiagnosis,
} from "./progress-notes";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClildFormService } from "../../../child-forms/child-forms.service";
import { CaseTeamService } from "../../../case-team/case-team.service";
import { Router } from "@angular/router";
import { OpencardsService } from "../../../opecards-list-view/opencards.service";
import { isNullOrUndefined } from "util";
import swal from "sweetalert2";
import { ReferralViewService } from "../../../referral-view/referral-view.service";
import { LocalValues } from "../../../local-values";
import * as moment from "moment";
import html2pdf from "html2pdf.js";
// import {PrintPdf} from "../../../print-pdf";
import { DatePipe } from "@angular/common";
import { environment } from "../../../../environments/environment";
import { clientID } from "../../../provider-sponser/provider-sponsor-claims/provider-sponsor-data";
import { PlacementService } from "../../../placement/placement.service";
@Component({
  selector: "app-progress-notes-fp-form",
  templateUrl: "./progress-notes-fp-form.component.html",
  styleUrls: ["./progress-notes-fp-form.component.scss"],
  inputs: ["progressNotessLogData"],
  providers: [DatePipe],
})
export class ProgressNotesFpFormComponent implements OnInit {
  // public _printPdf: PrintPdf,
  constructor(
    public datePipe: DatePipe,
    public _referral: ReferralViewService,
    public _fb: FormBuilder,
    public _client: ClildFormService,
    public _caseTeam: CaseTeamService,
    public _router: Router,
    public _opencard: OpencardsService,
    public _localValues: LocalValues,
    public _placement: PlacementService
  ) {}

  mainTabs = [];
  sIndex;
  medicalNecessityList = [];
  selectedMedicationId = [];
  progressNote: ProgressNotes = new ProgressNotes();
  progressNoteDiagnosis: ProgressNoteDiagnosis = new ProgressNoteDiagnosis();
  breadcrumbs = [];
  discardTo = "/reports/referral/family-preservation/progress-notes/view";
  metaData = [];
  progressNoteForm: FormGroup;
  isEdit = false;
  editControll: boolean;
  seleceSpec = [];
  url: any;
  isAttachmentRequired = false;
  quickMenu: any;
  isProgressNotesPrintable = false;
  isPrint = false;
  progressNotePrint: ProgressNotesPrint = new ProgressNotesPrint();
  progressNotePrintForm: FormGroup;
  encounterFormGroup: FormGroup;
  pnDiagnosisForm: FormGroup;
  encounterForm: encounter = new encounter();
  medicalNecessaryValues: medicalNecessary = new medicalNecessary();
  mentalStatusValues: mentalStatus = new mentalStatus();
  therapyTypeValues: therapyTypes = new therapyTypes();
  encounterArr: any;
  isInProgress = false;
  showDiagnosis = false;
  fisClientData = [];
  updatedVal = [];
  updatedVal_spec = [];
  alone_list = [];
  kancare_mco: any;
  alone_ntff: any = {
    clientID: "",
    isAloneTime: false,
    isAloneTimeException: false,
    aloneTimeExceptionID: "",
    aloneTimeLength: "",
    aloneTimeNotes: "",
  };
  aloneIndexId: any;
  isPrintScreen = false;
  aloneIndexStatus: boolean;
  isAloneTimeUpdate = false;
  aloneTimeException: any;
  filteredAloneTimeExceptions = [];
  FISMemberDetails = [];
  filteredFISMembers = [];
  mentalStatusAffectList = [];
  mentalStatusCurrentImpairmentList = [];
  mentalStatusMoodList = [];
  mentalStatusDangerList = [];
  mentalStatusCognitiveProcessesList = [];

  updatedMentalStatusAffectList = [];
  updatedMentalStatusCurrentImpairmentList = [];
  updatedMentalStatusMoodList = [];
  updatedMentalStatusDangerList = [];
  updatedMentalStatusCognitiveProcessesList = [];

  finalMentalStatusID = [];
  updateMentalStatusID = [];
  updatedProgressNoteDiagnosisSpecifier = [];
  columnNames = [];
  diagnosisList = [];
  duration: any;
  textAreaHeight: any = "20px";
  myDate = new Date();
  client_Name: any;
  isEmail = false;
  allPdFiles: any = [];

  isCaseActivityLogCreated = false;
  req: any;

  isFormLog = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };

  @Input()
  progressNotessLogData: any;
  referralType: any;
  showOpsField: boolean;
  referralName;
  any;
  seviRemoVId = [];
  tomail: any;
  updateMedical_val = [];
  allMedIds = [];
  allMenIds = [];
  validatorMessage = "<p>Mandatory fields are missing </p>";
  public isLastAppointmentRequired = true;
  ngOnInit() {
    console.log(">>MULTYcli<<", this._localValues.multyClientIDS);
    this.referralType = this._opencard.getOtherRefDetails().referralName;
    if (this.referralType === "NC-OPS") {
      this.referralName = "PERMANENCY CLINIC PROGRESS NOTE";
      this.encounterArr = [
        {
          CPT: "96101.OPS",
          DESCRIPTION:
            "Psychological testing, interpretation and report by psychologist",
          procode: "96101.OPS",
          Charge: "$150.00",
          Time: "",
          UnitValue: "Per 15 MIN",
          Units: "",
        },
        {
          CPT: "96102.OPS",
          DESCRIPTION:
            "Psychological testing, interpretation and report by technician",
          procode: "96102.OPS",
          Charge: "$150.00",
          Time: "",
          UnitValue: "Per 15 MIN",
          Units: "",
        },
        {
          CPT: "96103.OPS",
          DESCRIPTION:
            "Psychological testing, interpretation and report by computer",
          procode: "96103.OPS",
          Charge: "$150.00",
          Time: "",
          UnitValue: "Per Session",
          Units: "",
        },
        {
          CPT: "90847.OPS",
          DESCRIPTION: "Family Psychotherapy with Patient Present",
          procode: "90847.OPS",
          Charge: "$150.00",
          Time: "",
          UnitValue: "Per Session",
          Units: "",
        },
        {
          CPT: "90853.OPS",
          DESCRIPTION: "Group Psychotherapy (other than a multi-family group)",
          procode: "90853.OPS",
          Charge: "$80.00",
          Time: "",
          UnitValue: "Per Session",
          Units: "",
        },
        {
          CPT: "99366.OPS",
          DESCRIPTION: "Case Conference, with family present",
          procode: "99366.OPS",
          Charge: "$20.00",
          Time: "",
          UnitValue: "Per 15 MIN",
          Units: "",
        },
        {
          CPT: "99367.OPS",
          DESCRIPTION: "Case Conference, with family absent",
          procode: "99367.OPS",
          Charge: "$20.00",
          Time: "",
          UnitValue: "Per 15 MIN",
          Units: "",
        },
        {
          CPT: "99368.OPS",
          DESCRIPTION: "Case Conference, with family absent",
          procode: "99368.OPS",
          Charge: "$20.00",
          Time: "",
          UnitValue: "Per 15 MIN",
          Units: "",
        },
        // {
        //   CPT: "90847.OPS-MS",
        //   DESCRIPTION: "Family Psychotherapy with Patient Present",
        //   procode: "90847.OPS-MS",
        //   Charge: "$150.00",
        //   Time: "",
        //   UnitValue: "Per Session",
        //   Units: ""
        // },
        // {
        //   CPT: "90853.OPS-MS",
        //   DESCRIPTION: "Group Psychotherapy (other than a multi-family group)",
        //   procode: "90853.OPS-MS",
        //   Charge: "$80.00",
        //   Time: "",
        //   UnitValue: "Per Session",
        //   Units: ""
        // },
        // {
        //   CPT: "96101.OPS-MS",
        //   DESCRIPTION: "Psychological testing, interpretation and report by psychologist",
        //   procode: "96101.OPS-MS",
        //   Charge: "$150.00",
        //   Time: "",
        //   UnitValue: "Per 15 MIN",
        //   Units: ""
        // },
        // {
        //   CPT: "96102.OPS-MS",
        //   DESCRIPTION: "Psychological testing, interpretation and report by technician",
        //   procode: "96102.OPS-MS",
        //   Charge: "$150.00",
        //   Time: "",
        //   UnitValue: "Per 15 MIN",
        //   Units: ""
        // },
        // {
        //   CPT: "96103.OPS-MS",
        //   DESCRIPTION: "Psychological testing, interpretation and report by computer",
        //   procode: "96103.OPS-MS",
        //   Charge: "$150.00",
        //   Time: "",
        //   UnitValue: "Per Session",
        //   Units: ""
        // },
        // {
        //   CPT: "99366.OPS-MS",
        //   DESCRIPTION: "Case Conference, with family present",
        //   procode: "99366.OPS-MS",
        //   Charge: "$20.00",
        //   Time: "",
        //   UnitValue: "Per 15 MIN",
        //   Units: ""
        // },
        // {
        //   CPT: "99367.OPS-MS",
        //   DESCRIPTION: "Case Conference, with family absent",
        //   procode: "99367.OPS-MS",
        //   Charge: "$20.00",
        //   Time: "",
        //   UnitValue: "Per 15 MIN",
        //   Units: ""
        // },
        // {
        //   CPT: "99368.OPS-MS",
        //   DESCRIPTION: "Case Conference, with family absent",
        //   procode: "99368.OPS-MS",
        //   Charge: "$20.00",
        //   Time: "",
        //   UnitValue: "Per 15 MIN",
        //   Units: ""
        // },
        {
          CPT: "90791.OPS",
          DESCRIPTION: "Initial Psychiatric Interview (no medical)",
          procode: "90791.OPS",
          Charge: "$175.00",
          Time: "",
          UnitValue: "Per EVAL",
          Units: "",
        },
        // {
        //   CPT: "90791.OPS-MS",
        //   DESCRIPTION: "Initial Psychiatric Interview (no medical)",
        //   procode: "90791.OPS-MS",
        //   Charge: "$150.00",
        //   Time: "",
        //   UnitValue: "Per EVAL",
        //   Units: ""
        // },
        {
          CPT: "90832.OPS",
          DESCRIPTION:
            "Psychotherapy with patient and/or family member: 16-37 Minutes",
          procode: "90832.OPS",
          Charge: "$75.00",
          Time: "",
          UnitValue: "16-37 MIN",
          Units: "",
        },
        // {
        //   CPT: "90832.OPS-MS",
        //   DESCRIPTION: "Psychotherapy with patient and/or family member: 16-37 Minutes",
        //   procode: "90832.OPS-MS",
        //   Charge: "$75.00",
        //   Time: "",
        //   UnitValue: "16-37 MIN",
        //   Units: ""
        // },
        {
          CPT: "90834.OPS",
          DESCRIPTION:
            "Psychotherapy with patient and/or family member: 38-52 Minutes",
          procode: "90834.OPS",
          Charge: "$150.00",
          Time: "",
          UnitValue: "38-52 MIN",
          Units: "",
        },
        // {
        //   CPT: "90834.OPS-MS",
        //   DESCRIPTION: "Psychotherapy with patient and/or family member: 38-52 Minutes",
        //   procode: "90834.OPS-MS",
        //   Charge: "$150.00",
        //   Time: "",
        //   UnitValue: "38-52 MIN",
        //   Units: ""
        // },
        {
          CPT: "90837.OPS",
          DESCRIPTION:
            "Psychotherapy with patient and/or family member: 53+ Minutes",
          procode: "90837.OPS",
          Charge: "$225.00",
          Time: "",
          UnitValue: "53+ MIN",
          Units: "",
        },
        // {
        //   CPT: "90837.OPS-MS",
        //   DESCRIPTION: "Psychotherapy with patient and/or family member: 53+ Minutes",
        //   procode: "90837.OPS-MS",
        //   Charge: "$225.00",
        //   Time: "",
        //   UnitValue: "53+ MIN",
        //   Units: ""
        // },
        {
          CPT: "90846.OPS",
          DESCRIPTION: "Family Therapy without patient present",
          procode: "90846.OPS",
          Charge: "$150.00",
          Time: "",
          UnitValue: "Per Session",
          Units: "",
        },
        // {
        //   CPT: "90846.OPS-MS",
        //   DESCRIPTION: "Family Therapy without patient present",
        //   procode: "90846.OPS-MS",
        //   Charge: "$150.00",
        //   Time: "",
        //   UnitValue: "Per Session",
        //   Units: ""
        // },
        {
          CPT: "90847-HK.OPS",
          DESCRIPTION:
            "Family Psychotherapy with Patient Present provided in the home or community",
          procode: "90847-HK.OPS",
          Charge: "$150.00",
          Time: "",
          UnitValue: "Per Session",
          Units: "",
        },
        // {
        //   CPT: "90847-HK.OPS-MS",
        //   DESCRIPTION: "Family Psychotherapy with Patient Present provided in the home or community",
        //   procode: "90847-HK.OPS-MS",
        //   Charge: "$150.00",
        //   Time: "",
        //   UnitValue: "Per Session",
        //   Units: ""
        // }
      ];
      this.showOpsField = true;
    } else {
      this.referralName = "FAMILY PRESERVATION PROGRESS NOTES";
      this.encounterArr = [
        {
          CPT: "90791*",
          procode: "90791",
          DESCRIPTION: "Initial Psychiatric Interview (no medical)",
          UnitValue: "Per Eval",
          Time: "",
          Units: "",
          Charge: "$175.00",
        },
        {
          CPT: "90832*",
          procode: "90832",
          DESCRIPTION: "Psychotherapy with patient and/or family member",
          UnitValue: "16-37 min",
          Time: "",
          Units: "",
          Charge: "$75.00",
        },
        {
          CPT: "90834*",
          procode: "90834",
          DESCRIPTION: "Psychotherapy with patient and/or family member",
          UnitValue: "38-52 min",
          Time: "",
          Units: "",
          Charge: "$150.00",
        },
        {
          CPT: "90837*",
          procode: "90837",
          DESCRIPTION: "Psychotherapy with patient and/or family member",
          UnitValue: "53+ min",
          Time: "",
          Units: "",
          Charge: "$225.00",
        },
        {
          CPT: "90846",
          procode: "90846",
          DESCRIPTION:
            "Family psychotherapy WITHOUT patient (only billable with 3rd party insurance)",
          UnitValue: "Per Session",
          Time: "",
          Units: "",
          Charge: "$150.00",
        },
        {
          CPT: "90847",
          procode: "90847",
          DESCRIPTION: "Family psychotherapy with patient present",
          UnitValue: "Per Session",
          Time: "",
          Units: "",
          Charge: "$150.00",
        },
        {
          CPT: "90847-HK",
          procode: "90847-HK",
          DESCRIPTION:
            "Family psychotherapy with patient present provided in the home or community",
          UnitValue: "Per Session",
          Time: "",
          Units: "",
          Charge: "$150.00",
        },
        {
          CPT: "90853*",
          procode: "90853",
          DESCRIPTION:
            "Group psychotherapy (other than of a multiple-family group)",
          UnitValue: "Per Session",
          Time: "",
          Units: "",
          Charge: "$150.00",
        },
        {
          CPT: "96101",
          procode: "96101",
          DESCRIPTION:
            "Psychological testing, interpretation and report by psychologist",
          UnitValue: "Per hour",
          Time: "",
          Units: "",
          Charge: "$150.00",
        },
        {
          CPT: "96102",
          procode: "96102",
          DESCRIPTION: "Psychological testing by technician",
          UnitValue: "Per hour",
          Time: "",
          Units: "",
          Charge: "$150.00",
        },
        {
          CPT: "96103",
          procode: "96103",
          DESCRIPTION: "Psychological testing by computer",
          UnitValue: "Per Session",
          Time: "",
          Units: "",
          Charge: "$150.00",
        },
        {
          CPT: "99366",
          procode: "99366",
          DESCRIPTION:
            "Medical team conference Face to Face with Patient/family with non-physician",
          UnitValue: "Per 15 min",
          Time: "",
          Units: "",
          Charge: "$20.00",
        },
        {
          CPT: "99367",
          procode: "99367",
          DESCRIPTION:
            "Medical team conference with Patient/family not present with physician",
          UnitValue: "Per 15 min",
          Time: "",
          Units: "",
          Charge: "$20.00",
        },
        {
          CPT: "99368",
          procode: "99368",
          DESCRIPTION:
            "Medical team conference with patient/family not present with non-physician",
          UnitValue: "Per 15 min",
          Time: "",
          Units: "",
          Charge: "$20.00",
        },
        {
          CPT: "",
          procode: "",
          DESCRIPTION: "Other:",
          UnitValue: "",
          Time: "",
          Units: "",
          Charge: "",
        },
      ];
      this.showOpsField = false;
    }
    this.progressNoteDiagnosis.isCode = "code";

    this.editControll = false;
    this.getMentalStatusValues();
    this.setInitialValuesForPrintForm();
    this.formValidation();
    this.generateFISClientData();
    this.setIndex(0);
    this.defineMainTabs();
    this.medicalNecessity();
    this.getAloneTimeExceptions();
    this.getFISMembers();
    this.progressNoteDiagnosisSummary();
    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case Form",
        href: "/reports/referral/family-preservation/detail",
        active: "",
      },
      {
        label: "Progress Note List",
        href: "reports/referral/family-preservation/progress-notes/view",
        active: "",
      },
      { label: "Progress Note", active: "active" }
    );

    if (
      this._router.url ==
      "/reports/referral/family-preservation/progress-notes/detail"
    ) {
      this.getById();
      // this.getprogressDiagnosis();
      this.editControll = true;
      this.isAttachmentRequired = true;
      this.isPrint = true;
      this.isEmail = true;
      this.autoFetchDetails();
    }
    if (
      this._router.url ==
        "/reports/referral/family-preservation/case-activity/detail" ||
      this._router.url ===
        "/reports/referral/family-preservation/case-activity/new"
    ) {
      this.getProgressNoteOnCASave();
      this.autoFecthTherapyTypeForNewForm();
    }

    if (
      this._router.url ==
        "/reports/referral/family-preservation/case-activity/new" ||
      this._router.url ==
        "/reports/referral/family-preservation/progress-notes/new"
    ) {
      this.fetchCurrentCaseActivityInfo();
      this.getPreviousGoalInformation();
      this.autoFecthTherapyTypeForNewForm();
    }
    const referralTypeId =
      parseInt(localStorage.getItem("referralTypeId")) -
      this._opencard.getHasKey();
    if (referralTypeId === 9) {
      this.breadcrumbs = this._localValues.breadcrumbsChanges(
        "progressNote-NCOPS",
        this.breadcrumbs
      );
    }

    if (this._router.url == "/reports/case-activity-log") {
      this.isCaseActivityLogCreated = true;
      this.getById();
      this.autoFetchDetails();
    }
  }
  getMentalStatusValues() {
    this.getCurrentImpairmentList();
    this.getMoodList();
    this.getCognitiveList();
    this.getAffectList();
    this.getDangerList();
  }
  getAloneTimeExceptions() {
    const req = { Object: "aloneTimeException", value: "" };
    this._caseTeam.getSearchList(req).then((data: any) => {
      this.aloneTimeException = data.dropDown;
    });
  }
  getFISMembers() {
    let currentReferralId: number,
      currentClientId: number,
      req = {};
    currentClientId =
      parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey();
    currentReferralId =
      parseInt(localStorage.getItem("referralId")) - this._opencard.getHasKey();
    req = {
      referralID: currentReferralId,
      clientID: currentClientId,
      beginPagination: 1,
      endPagination: 100,
    };
    this._opencard.getFISClientByreferralId(req).then((data: any) => {
      this.FISMemberDetails = data.ClientReferral;
    });
  }

  filteredFISMember(event: any) {
    this.filteredFISMembers = [];
    this.FISMemberDetails.filter((item: any) => {
      if (item.clientName.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredFISMembers.push(item);
      }
    });
  }
  generateFISClientData() {
    let req, referralId;
    referralId =
      parseInt(localStorage.getItem("referralId")) - this._opencard.getHasKey();
    req = { referralID: referralId, beginPagination: 1, endPagination: 10 };
    this._opencard.getFISClientByreferralId(req).then((data) => {
      this.fisClientData = data.ClientReferral;
    });
  }
  getProgressNoteOnCASave() {
    const req = {
      caseActivityID:
        parseInt(localStorage.getItem("caseActivityID")) -
        this._opencard.getHasKey(),
    };

    this._opencard.getCaseActivityById(req).then((data) => {
      !isNullOrUndefined(data.caseActivity.clientID)
        ? (this.encounterForm.caseName =
            data.caseActivity.clientID["clientNameLastFirst"])
        : null;
      // !isNullOrUndefined(data.caseActivity.clientID) ? this.encounterForm.contractClient = data.caseActivity.clientID['clientNameLastFirst'] : null;
      !isNullOrUndefined(data.caseActivity.clientID)
        ? (this.encounterForm.caseNumber =
            data.caseActivity.clientID["kaecses"])
        : null;
      !isNullOrUndefined(data.caseActivity.clientID)
        ? (this.encounterForm.dob =
            new Date(data.caseActivity.clientID["dob"]).getMonth() +
            1 +
            "/" +
            new Date(data.caseActivity.clientID["dob"]).getDate() +
            "/" +
            new Date(data.caseActivity.clientID["dob"]).getFullYear())
        : null;
      !isNullOrUndefined(data.caseActivity.procodeID)
        ? (this.encounterForm.procode = data.caseActivity.procodeID["procode"])
        : null;
      !isNullOrUndefined(data.caseActivity)
        ? (this.encounterForm.units = data.caseActivity.units)
        : null;
      if (
        !isNullOrUndefined(data.caseActivity.beginDate) &&
        !isNullOrUndefined(data.caseActivity.endDate)
      ) {
        !isNullOrUndefined(data.caseActivity)
          ? (this.encounterForm.time =
              Math.abs(
                data.caseActivity.beginDate - data.caseActivity.endDate
              ) / 36e5)
          : null;
        // !isNullOrUndefined(data.caseActivity) ? this.encounterForm.time = this.duration : null;
      }

      !isNullOrUndefined(data.caseActivity.referralID)
        ? (this.encounterForm.program =
            data.caseActivity.referralID.referralTypeID.description)
        : null;
      let amount = [];
      this.encounterArr.map((item) => {
        if (item.procode === this.encounterForm.procode) {
          // item.Time = Math.trunc(this.encounterForm.time);
          item.Time = this.duration;
          item.Units = this.encounterForm.units;
          amount = item.Charge.split("$");
          // this.encounterForm.chargeAmount = parseInt(amount[1]) * item.Units;
          this.encounterForm.chargeAmount =
            "$ " + (parseInt(amount[1]) * item.Units).toFixed(2);
        }
      });
      !isNullOrUndefined(data.caseActivity.clientID)
        ? (this.progressNote.clientID = {
            clientName: data.caseActivity.clientID.clientNameFirstLast,
          })
        : null;
      !isNullOrUndefined(data.caseActivity.staffID)
        ? (this.progressNote.therapist_StaffID = {
            fullName:
              data.caseActivity.staffID.lastName +
              " " +
              data.caseActivity.staffID.firstName,
          })
        : null;
      !isNullOrUndefined(data.caseActivity.beginDate)
        ? (this.progressNote.beginDate = new Date(data.caseActivity.beginDate))
        : null;
      !isNullOrUndefined(data.caseActivity.endDate)
        ? (this.progressNote.endDate = new Date(data.caseActivity.endDate))
        : null;
      !isNullOrUndefined(data.caseActivity.staffID)
        ? (this.encounterForm.therapist = this.progressNote.therapist_StaffID.fullName)
        : null;
    });
  }

  setIndex(index: number) {
    this.sIndex = index;
  }

  defineMainTabs() {
    return (this.mainTabs = [
      { label: "Section 1", href: "#nav-1" },
      { label: "Section 2", href: "#nav-2" },
      { label: "Section 3", href: "#nav-3" },
      { label: "Section 4", href: "#nav-4" },
    ]);
  }
  getStatusType(event) {
    const req = {
      Object: "statusType",
      value: event.query,
    };
    this._caseTeam.getStatusType(req).then((data) => {
      this.metaData = data.dropDown;
    });
  }
  getTherapyType(event) {
    const req = {
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencard.getHasKey(),
    };
    this._caseTeam.getTherapyType(req).then((data) => {
      data.therapyType.map((item: any) => {
        item["therapyType"] = item.TherapyType;
        item["therapyTypeID"] = item.TherapyTypeID;
      });
      this.metaData = data.therapyType;
    });
  }
  filteredFISClient(event: any) {
    this.metaData = [];
    this.fisClientData.filter((item) => {
      if (item.clientName.indexOf(event.query) !== -1) {
        this.metaData.push(item);
      }
    });
  }
  getByClassficationId(event) {
    const req = {
      classificationID: isNullOrUndefined(
        this.progressNoteDiagnosis.classificationID
      )
        ? null
        : this.progressNoteDiagnosis.classificationID.classificationID,
      beginDate: this._localValues.stringFormatDatetime(
        Date.parse(this.progressNoteDiagnosis.beginDate)
      ),
    };
    this._caseTeam.getByClassficationId(req).then((data) => {
      this.metaData = data.diagnosisCodeList;
    });
  }
  getDiagnosisMetaData(event, label) {
    let metaDataReqObj, metaDataReq;
    switch (label) {
      case "client":
        this.filteredFISClient(event);
        break;
      case "diagnosisCode":
        this.getByClassficationId(event);
        break;
      case "classification":
        metaDataReqObj = "classification";
        break;
    }
    if (metaDataReqObj) {
      metaDataReq = { Object: metaDataReqObj, value: event.query };
      this._caseTeam.getSearchList(metaDataReq).then((data) => {
        data.dropDown.push({ classificationID: "", classification: "All" });
        this.metaData = data.dropDown;
      });
    }
  }
  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case "client":
        obj = "client";
        break;
      case "prognosisType":
        obj = "prognosisType";
        break;
      case "therapist_StaffID":
        obj = "staff";
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data) => {
      data.dropDown.map((item: any) => {
        item["fullName"] =
          item.lastName + " " + item.firstName + " ( " + item.email + " ) ";
      });
      this.metaData = data.dropDown;
    });
  }

  medicalNecessity() {
    this.medicalNecessityList.push(
      {
        id: 1,
        label:
          "Treatment Needed to Monitor/Reduce Risk of Violence to Self or Others",
        formControl: "isTreatmentNeeded",
      },
      {
        id: 2,
        label: "Continued Impairment of Reality Testing",
        formControl: "isContinuedImpairment",
      },
      {
        id: 3,
        label: "Impairment in Social, Familial, Academic/Work Functioning",
        formControl: "isImpairmentInSocial",
      },
      {
        id: 4,
        label: "Services Necessary to Maintain GAF and Stabilize Gains",
        formControl: "isServicesNecessary",
      },
      { id: 5, label: "Mood Disorder", formControl: "isMoodDisordered" },
      {
        id: 6,
        label: "Interpersonal/Behavioral Difficulties",
        formControl: "isInterpersonalImpairment",
      },
      {
        id: 7,
        label: "Meets Continuing Care Criteria",
        formControl: "isMeetsContinue",
      },
      {
        id: 8,
        label: "Continued need to Monitor Medication",
        formControl: "isMonitorMedication",
      }
    );
  }

  formValidation() {
    this.progressNoteForm = this._fb.group({
      clientID: [null],
      beginDate: [null],
      endDate: [null],
      therapist_StaffID: [null],
      location: [null, Validators.compose([Validators.required])],
      therapyTypeID: [null, Validators.compose([Validators.required])],
      isFaceToFace: [null],
      isTelemedicine: [null],
      isInteractiveComplexity: [null],
      participants: [null, Validators.compose([Validators.required])],
      objectiveAddressed: [null, Validators.compose([Validators.required])],
      // topicsCovered: [null],
      changeTXPlan: [null, Validators.compose([Validators.required])],
      diagnosisChange: [null, Validators.compose([Validators.required])],
      prognosisTypeID: [null],
      gafValue: [null],
      homeSafetyConcerns_YesNoPendingID: [null],
      childAppearsHealthy_YesNoPendingID: [null],
      homeIsClean_YesNoPendingID: [null],
      heightWeight_YesNoPendingID: [null],
      childIsClean_YesNoPendingID: [null],
      unusualMarks_YesNoPendingID: [null],
      additionalComments: [null],
      nextAppointmentDate: [null, Validators.compose([Validators.required])],
      isLastAppointment: [null],
      planTillNextAppointment: [
        null,
        Validators.compose([Validators.required]),
      ],
      statusTypeID: [null],
      // medicalNecessityID: [null],
      mentalStatusID: [null],
      // communityResourceUpdate: [null],
      // newProblems:[null],
      // clientFunctionating: [null],
      topicsCovered: [null, Validators.compose([Validators.required])],
      isAgreementStatementChecked: [
        null,
        { disabled: this.isInProgress },
        Validators.compose([Validators.required]),
      ],

      isTreatmentNeeded: [null],
      isMoodDisordered: [null],
      isContinuedImpairment: [null],
      isInterpersonalImpairment: [null],
      isImpairmentInSocial: [null],
      isMeetsContinue: [null],
      isServicesNecessary: [null],
      isMonitorMedication: [null],

      mentalStatusOther: [null, { disabled: !this.mentalStatusValues.isOther }],
      remarks: [null],
      isSevere: [null],
      isModerate: [null],
      isMild: [null],
      isMinimal: [null],
      isNone: [null],
      isEuthymic: [null],
      isDepressed: [null],
      isIrritable: [null],
      isAnxious: [null],
      isEuphoric: [null],
      isOther: [null],
      isNoImpairment: [null],
      isDisorganized: [null],
      isPoorConcentration: [null],
      isImpairedAbstract: [null],
      isImpairedJudgement: [null],
      isBlunted: [null],
      isRestricted: [null],
      isIntense: [null],
      isAppropritate: [null],
      isFlat: [null],
      isDetached: [null],
      isDangeNone: [null],
      isIdeation: [null],
      isPlan: [null],
      isGestures: [null],
      isOngoingConcern: [null],

      suicidalThoughtsOrGestures_YesNoPendingID: [null],
      violentThoughtsOrGestures_YesNoPendingID: [null],
      weaponsObserved_YesNoPendingID: [null],
      caregiverforTheChild_YesNoPendingID: [null],
      caregiverInfluenceOfSubstances_YesNoPendingID: [null],
      newSafetyConcerns_YesNoPendingID: [null],
      developedORreviewed_YesNoPendingID: [null],
      familySafetyPlan: [null],
      safetyNeeds: [null],
      safetyComments: [null],
      householdMembers_YesNoPendingID: [null],
      naturalAndCommunitySupports_YesNoPendingID: [null],
      hygieneAndDress_YesNoPendingID: [null],
      caregiverDemonstrates_YesNoPendingID: [null],
      selfHarmingBehaviors_YesNoPendingID: [null],
      aggressiveBehaviors_YesNoPendingID: [null],
      adequateSpace_YesNoPendingID: [null],
      additionalRiskConcerns_YesNoPendingID: [null],
      casePlanOrNonIntensive_YesNoPendingID: [null],
      familyStrengthsAndResources: [null],
      riskComments: [null],
      originatingSite: [null],
      distantSite: [null],
      individualTherapy: [null],
      groupTherapy: [null],
      psychInterview: [null],
      caseConference: [null],
      therapyInHome: [null],
      therapyInClinic: [null],
    });
    this.encounterFormGroup = this._fb.group({
      caseName: [null],
      therapist: [null],
      caseNumber: [null],
      date: [null],
      dateOfReferral: [null],
      startTime: [null],
      endTime: [null],
      dob: [null],
      program: [null],
      contractClient: [null],
      location: [null],
      isFaceToFace: [null],
      isTelemedicine: [null],
      isInteractiveComplexity: [null],
      time: [null],
      units: [null],
      chargeAmount: [null],
      diagnosisCodeID: [null],
    });
    this.progressNotePrintForm = this._fb.group({
      planTillNextAppointment: [null],
      caseName: [null],
      caseNumber: [null],
      date: [null],
      dateOfReferral: [null],
      startTime: [null],
      endTime: [null],
      clientLocation: [null],
      officeLocation: [null],
      sessionParticipants: [null],
      goalsObjectives: [null],
      // clientFunctionating: [null],
      topicsCovered: [null],
      changeTXPlan: [null],
      gafValue: [null],
      homeSafetyConcerns: [null],
      nextAppointmentDate: [null],
      childAppearanceHealthy: [null],
      homeRelativelyClean: [null],
      heightWeightAppear: [null],
      isChildClean: [null],
      unusualMarks: [null],
      additionalComments: [null],
      diagnosisChange: [null],
      isTreatmentNeeded: [null],
      isMoodDisordered: [null],
      isContinuedImpairment: [null],
      isInterpersonalImpairment: [null],
      isImpairmentInSocial: [null],
      isMeetsContinue: [null],
      isServicesNecessary: [null],
      isMonitorMedication: [null],
      diagnosisCodeID: [null],
      isSevere: [null],
      isModerate: [null],
      isMild: [null],
      isMinimal: [null],
      isNone: [null],
      isEuthymic: [null],
      isDepressed: [null],
      isIrritable: [null],
      isAnxious: [null],
      isEuphoric: [null],
      isOther: [null],
      isNoImpairment: [null],
      isDisorganized: [null],
      isPoorConcentration: [null],
      isImpairedAbstract: [null],
      isImpairedJudgement: [null],
      isBlunted: [null],
      isRestricted: [null],
      isIntense: [null],
      isAppropritate: [null],
      isFlat: [null],
      isDetached: [null],
      isDangeNone: [null],
      isIdeation: [null],
      isPlan: [null],
      isGestures: [null],
      isOngoingConcern: [null],

      isInitialPsychInterview: [null],
      isIndividualTherapy: [null],
      isFamilyTherapyInHome: [null],
      isGroupTherapy: [null],
      isFamilyTherapyInClinic: [null],
      isCaseConferance: [null],
      isGood: [null],
      isFair: [null],
      isGuarded: [null],
      isPoor: [null],
      isAgreementStatementChecked: [null, { disabled: this.isInProgress }],

      suicidalThoughtsOrGestures_YesNoPendingID: [null],
      violentThoughtsOrGestures_YesNoPendingID: [null],
      weaponsObserved_YesNoPendingID: [null],
      caregiverforTheChild_YesNoPendingID: [null],
      caregiverInfluenceOfSubstances_YesNoPendingID: [null],
      newSafetyConcerns_YesNoPendingID: [null],
      developedORreviewed_YesNoPendingID: [null],
      familySafetyPlan: [null],
      safetyNeeds: [null],
      safetyComments: [null],
      householdMembers_YesNoPendingID: [null],
      naturalAndCommunitySupports_YesNoPendingID: [null],
      hygieneAndDress_YesNoPendingID: [null],
      caregiverDemonstrates_YesNoPendingID: [null],
      selfHarmingBehaviors_YesNoPendingID: [null],
      aggressiveBehaviors_YesNoPendingID: [null],
      adequateSpace_YesNoPendingID: [null],
      additionalRiskConcerns_YesNoPendingID: [null],
      casePlanOrNonIntensive_YesNoPendingID: [null],
      familyStrengthsAndResources: [null],
      riskComments: [null],
      homeSafetyConcerns_YesNoPendingID: [null],
      homeIsClean_YesNoPendingID: [null],
      childAppearsHealthy_YesNoPendingID: [null],
      unusualMarks_YesNoPendingID: [null],
      heightWeight_YesNoPendingID: [null],
      originatingSite: [null],
      distantSite: [null],
      individualTherapy: [null],
      groupTherapy: [null],
      psychInterview: [null],
      caseConference: [null],
      therapyInHome: [null],
      therapyInClinic: [null],
      newForms: [null],
    });
    this.pnDiagnosisForm = this._fb.group({
      clientID: [null, Validators.compose([Validators.required])],
      beginDate: [null],
      endDate: [null],
      principal: [null],
      classificationID: [null],
      isCode: [null],
      diagnosisCodeID: [null, Validators.compose([Validators.required])],
      clarification: [null, Validators.compose([Validators.required])],
    });
  }
  getSpecifiers(event) {
    let tempArr = [];
    this.updatedVal = [];
    this.seleceSpec = [];
    const req = { diagnosisCodeID: event.diagnosisCodeID };
    this._caseTeam.getDiagnosisCodeSpecifierSeverity(req).then((data) => {
      tempArr = data.diagnosisCodeSpecifierSeverity;
      const groupValues = tempArr.reduce((obj, item) => {
        obj[item.specifierID.specifier] = obj[item.specifierID.specifier] || [];
        obj[item.specifierID.specifier].push({
          severity: item.severityID.severity,
          severityID: item.severityID.severityID,
          specifierID: item.specifierID.specifierID,
          randomKey: shuffle(),
        });
        return obj;
      }, {});

      this.updatedVal = Object.keys(groupValues).map((key) => {
        return { specifier: key, severity: groupValues[key] };
      });
      this.updatedVal.map((ele, ky) => {
        this.updatedVal_spec.map((els) => {
          if (ele.specifier === els.specifier) {
            ele.severity.map((elsvi, key) => {
              els.severity.map((elsvid) => {
                if (elsvi.severityID === elsvid.severityID) {
                  elsvi["progressNoteDiagnosisSpecifierID"] =
                    elsvid.progressNoteDiagnosisSpecifierID;
                  this.seleceSpec[
                    elsvid.severityID +
                      elsvid.specifierID +
                      key +
                      ky +
                      elsvi.randomKey
                  ] = elsvid.severityID;
                }
              });
            });
          }
        });
      });
      console.log("this.updatedVal>>>>", JSON.stringify(this.updatedVal));
    });
  }
  getSeverityStatus(event, item, ind, maiInde) {
    console.log(this.seleceSpec);
    if (event) {
      this.seleceSpec[
        item.severityID + item.specifierID + ind + maiInde + item.randomKey
      ] = item.severityID;
      // this.updatedVal.map((ele) => {
      //   this.updatedVal_spec.map((els) => {
      //     if (ele.specifier === els.specifier) {
      //       ele.severity.map((elsvi,key) => {
      //         els.severity.map((elsvid) => {
      //           if (elsvi.severityID === elsvid.severityID) {
      //             this.seleceSpec[key] = elsvid.severityID;
      //           }
      //         })
      //       })
      //     }
      //   });
      // });
      this.updatedProgressNoteDiagnosisSpecifier.push({
        severityID: item.severityID,
        specifierID: item.specifierID,
      });
    } else {
      this.seviRemoVId.push(item.progressNoteDiagnosisSpecifierID);
      this.deleteWithCondition(
        this.updatedProgressNoteDiagnosisSpecifier,
        "severityID",
        "specifierID",
        item.severityID,
        item.specifierID
      );
    }
  }

  finalMentalStatus() {
    this.updatedMentalStatusAffectList.map((item) => {
      if (!isNullOrUndefined(item) && !isNullOrUndefined(item) !== false) {
        this.mentalStatusAffectList.map((affect) => {
          if (item === affect.MentalStatus) {
            this.finalMentalStatusID.push({
              mentalStatusID: affect.MentalStatusID,
            });
          }
        });
      }
    });
    this.updatedMentalStatusCurrentImpairmentList.map((item) => {
      if (!isNullOrUndefined(item) && !isNullOrUndefined(item) !== false) {
        this.mentalStatusCurrentImpairmentList.map((affect) => {
          if (item === affect.MentalStatus) {
            this.finalMentalStatusID.push({
              mentalStatusID: affect.MentalStatusID,
            });
          }
        });
      }
    });
    this.updatedMentalStatusCognitiveProcessesList.map((item) => {
      if (!isNullOrUndefined(item) && !isNullOrUndefined(item) !== false) {
        this.mentalStatusCognitiveProcessesList.map((affect) => {
          if (item === affect.MentalStatus) {
            this.finalMentalStatusID.push({
              mentalStatusID: affect.MentalStatusID,
            });
          }
        });
      }
    });
    this.updatedMentalStatusMoodList.map((item) => {
      if (!isNullOrUndefined(item) && !isNullOrUndefined(item) !== false) {
        this.mentalStatusMoodList.map((affect) => {
          if (item === affect.MentalStatus) {
            this.finalMentalStatusID.push({
              mentalStatusID: affect.MentalStatusID,
            });
          }
        });
      }
    });
    this.updatedMentalStatusDangerList.map((item) => {
      if (!isNullOrUndefined(item) && !isNullOrUndefined(item) !== false) {
        this.mentalStatusDangerList.map((affect) => {
          if (item === affect.MentalStatus) {
            this.finalMentalStatusID.push({
              mentalStatusID: affect.MentalStatusID,
            });
          }
        });
      }
    });
  }
  aloneList() {
    this.alone_list.map((item) => {
      !isNullOrUndefined(item.aloneTimeExceptionID)
        ? (item.aloneTimeExceptionID =
            item.aloneTimeExceptionID.aloneTimeExceptionID)
        : null;
      !isNullOrUndefined(item.clientID)
        ? (item.clientID = item.clientID.clientID)
        : null;
      !isNullOrUndefined(item.aloneTimeLength)
        ? (item.aloneTimeLength = parseInt(item.aloneTimeLength))
        : null;
      item.caseActivityID =
        parseInt(localStorage.getItem("caseActivityID")) -
        this._opencard.getHasKey();
      if (this.progressNote.isFaceToFace) {
        item.isFaceToFace = true;
      } else {
        item.isFaceToFace = true;
      }
    });
  }
  formAction(source: any) {
    if (this.progressNoteForm.valid && this.logicalValidator()) {
      const loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "block";
      this.progressNote.medicalNecessityID = this.selectedMedicationId;
      this.finalMentalStatus();
      this.aloneList();
      this.client_Name = source.clientID.clientName;
      this.progressNote.mentalStatusID = this.finalMentalStatusID;
      this.progressNote.caseActivityFaceToFace = this.alone_list;
      source.beginDate = this.progressNote.beginDate;
      source.endDate = this.progressNote.endDate;
      source.nextAppointmentDate = this._localValues.stringFormatDatetime(
        Date.parse(source.nextAppointmentDate)
      );
      !isNullOrUndefined(source.clientID)
        ? (source.clientID = source.clientID.clientID)
        : null;
      !isNullOrUndefined(source.therapist_StaffID)
        ? (source.therapist_StaffID = source.therapist_StaffID.staffID)
        : null;
      !isNullOrUndefined(source.therapyTypeID)
        ? (source.therapyTypeID = source.therapyTypeID.therapyTypeID)
        : null;
      !isNullOrUndefined(source.prognosisTypeID)
        ? (source.prognosisTypeID = source.prognosisTypeID.prognosisTypeID)
        : null;
      !isNullOrUndefined(source.statusTypeID)
        ? (source.statusTypeID = source.statusTypeID.statusTypeID)
        : null;
      if (!isNullOrUndefined(source.isFaceToFace)) {
        if (source.isFaceToFace === "false") {
          source.isTelemedicine = true;
          source.isFaceToFace = false;
        }
        if (source.isFaceToFace === "true") {
          source.isFaceToFace = true;
          source.isTelemedicine = false;
        }
      }

      !isNullOrUndefined(source.homeSafetyConcerns_YesNoPendingID)
        ? (source.homeSafetyConcerns_YesNoPendingID = parseInt(
            source.homeSafetyConcerns_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.suicidalThoughtsOrGestures_YesNoPendingID)
        ? (source.suicidalThoughtsOrGestures_YesNoPendingID = parseInt(
            source.suicidalThoughtsOrGestures_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.homeIsClean_YesNoPendingID)
        ? (source.homeIsClean_YesNoPendingID = parseInt(
            source.homeIsClean_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.violentThoughtsOrGestures_YesNoPendingID)
        ? (source.violentThoughtsOrGestures_YesNoPendingID = parseInt(
            source.violentThoughtsOrGestures_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.weaponsObserved_YesNoPendingID)
        ? (source.weaponsObserved_YesNoPendingID = parseInt(
            source.weaponsObserved_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.caregiverforTheChild_YesNoPendingID)
        ? (source.caregiverforTheChild_YesNoPendingID = parseInt(
            source.caregiverforTheChild_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.childAppearsHealthy_YesNoPendingID)
        ? (source.childAppearsHealthy_YesNoPendingID = parseInt(
            source.childAppearsHealthy_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.caregiverInfluenceOfSubstances_YesNoPendingID)
        ? (source.caregiverInfluenceOfSubstances_YesNoPendingID = parseInt(
            source.caregiverInfluenceOfSubstances_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.unusualMarks_YesNoPendingID)
        ? (source.unusualMarks_YesNoPendingID = parseInt(
            source.unusualMarks_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.newSafetyConcerns_YesNoPendingID)
        ? (source.newSafetyConcerns_YesNoPendingID = parseInt(
            source.newSafetyConcerns_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.developedORreviewed_YesNoPendingID)
        ? (source.developedORreviewed_YesNoPendingID = parseInt(
            source.developedORreviewed_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.householdMembers_YesNoPendingID)
        ? (source.householdMembers_YesNoPendingID = parseInt(
            source.householdMembers_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.heightWeight_YesNoPendingID)
        ? (source.heightWeight_YesNoPendingID = parseInt(
            source.heightWeight_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.naturalAndCommunitySupports_YesNoPendingID)
        ? (source.naturalAndCommunitySupports_YesNoPendingID = parseInt(
            source.naturalAndCommunitySupports_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.hygieneAndDress_YesNoPendingID)
        ? (source.hygieneAndDress_YesNoPendingID = parseInt(
            source.hygieneAndDress_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.caregiverDemonstrates_YesNoPendingID)
        ? (source.caregiverDemonstrates_YesNoPendingID = parseInt(
            source.caregiverDemonstrates_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.selfHarmingBehaviors_YesNoPendingID)
        ? (source.selfHarmingBehaviors_YesNoPendingID = parseInt(
            source.selfHarmingBehaviors_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.adequateSpace_YesNoPendingID)
        ? (source.adequateSpace_YesNoPendingID = parseInt(
            source.adequateSpace_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.aggressiveBehaviors_YesNoPendingID)
        ? (source.aggressiveBehaviors_YesNoPendingID = parseInt(
            source.aggressiveBehaviors_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.additionalRiskConcerns_YesNoPendingID)
        ? (source.additionalRiskConcerns_YesNoPendingID = parseInt(
            source.additionalRiskConcerns_YesNoPendingID
          ))
        : null;
      !isNullOrUndefined(source.casePlanOrNonIntensive_YesNoPendingID)
        ? (source.casePlanOrNonIntensive_YesNoPendingID = parseInt(
            source.casePlanOrNonIntensive_YesNoPendingID
          ))
        : null;

      source.referralID =
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey();
      if (
        this._router.url !=
        "/reports/referral/family-preservation/progress-notes/detail"
      ) {
        source.caseActivityID =
          parseInt(localStorage.getItem("caseActivityID")) -
          this._opencard.getHasKey();
      }
      if (!isNullOrUndefined(source.progressNoteID)) {
        source.mentalStatusID.map((item) => {
          this.updateMentalStatusID.map((res) => {
            if (item.mentalStatusID === res.mentalStatusID.mentalStatusID) {
              item.progressNoteMentalStatusID = res.progressNoteMentalStatusID;
            }
          });
        });
      }
      !isNullOrUndefined(source.progressNoteID)
        ? this.update(source)
        : this.save(source);
    } else {
      return swal("Invalid", `${this.validatorMessage}`, "info");
    }
  }

  async save(source: any) {
    console.log("New Source", source);
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    !isNullOrUndefined(source.beginDate)
      ? (this.encounterForm.startTime = moment(source.beginDate).format(
          "HH:mm"
        ))
      : null;
    !isNullOrUndefined(source.beginDate)
      ? (this.encounterForm.endTime = moment(source.endDate).format("HH:mm"))
      : null;
    !isNullOrUndefined(source.isFaceToFace)
      ? (this.encounterForm.isFaceToFace = source.isFaceToFace)
      : null;
    !isNullOrUndefined(source.isTelemedicine)
      ? (this.encounterForm.isTelemedicine = source.isTelemedicine)
      : null;
    !isNullOrUndefined(source.isInteractiveComplexity)
      ? (this.encounterForm.isInteractiveComplexity =
          source.isInteractiveComplexity)
      : null;
    !isNullOrUndefined(source.location)
      ? (this.encounterForm.location = source.location)
      : null;
    source.MultiClientArray = this._localValues.multyClientIDS;
    console.log(
      "Request",
      this.progressNote.beginDate,
      this.progressNote.endDate,
      this.progressNote.nextAppointmentDate
    );
    this._opencard.saveProgressNote(source).then(async (data) => {
      swal("Success", "Record has been saved!", "success");
      const progressNote_id = data.progressNote.find((ele) => {
        return (
          ele.caseActivityID ==
          parseInt(localStorage.getItem("caseActivityID")) -
            this._opencard.getHasKey()
        );
      });
      this._client.storeId(progressNote_id.progressNoteID);

      let progressNotePrintReq = {
        progressNoteID: progressNote_id.progressNoteID,
        referralTypeID:
          parseInt(localStorage.getItem("referralTypeId")) -
          this._opencard.getHasKey(),
      };

      if (source.statusTypeID === 4) {
        // this.isPrintScreen = true;
        // await this.onExportProgressNote(progressNote_id.progressNoteID);
        // await this.onExportEncounterForm(progressNote_id.progressNoteID);
        // this.onSendEmail(data.progressNote[0].progressNoteID);
        await this._opencard.getProgresNoteReportPrint(progressNotePrintReq);
        let encounterReportPrintReq = {
          progressNoteID: progressNote_id.progressNoteID,
          diagnosisSpecifierSeverity: true,
        };
        await this._opencard.getEncounterReportPrint(encounterReportPrintReq);
        let mailAPIReq = { progressNoteID: progressNote_id.progressNoteID };
        await this._opencard.progressNoteAndEncounterEamil(mailAPIReq);
        this.getById();
        loader.style.display = "none";
        return this._router.navigate([
          "/reports/referral/family-preservation/progress-notes/view",
        ]);
      } else {
        return this._router.navigate([
          "/reports/referral/family-preservation/progress-notes/view",
        ]);
      }
    });
  }

  update(source: any) {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.updateProgressNote(source).then(async (data) => {
      this._client.storeId(data.progressNote.progressNoteID);
      if (this.allMenIds.length > 0) {
        const ids = this.allMenIds.filter(function (el) {
          return el != null;
        });
        const req_Dara = {
          progressNoteMentalStatus: {
            progressNoteMentalStatusID: ids,
          },
        };
        this._opencard.deleteMentalStatus(req_Dara).then((data) => {
          console.log("Deleted");
        });
      }
      if (this.allMedIds.length > 0) {
        const med_ids = this.allMedIds.filter(function (el) {
          return el != null;
        });
        const req_Dara_med = {
          progressNoteMedicalNecessity: {
            progressNoteMedicalNecessityID: med_ids,
          },
        };
        this._opencard.deleteMedicalNessicty(req_Dara_med).then((data) => {
          console.log("Deleted");
        });
      }
      swal("Success", "Record has been updated!", "success");
      // if statusType is Completed
      if (source.statusTypeID === 4) {
        // this.isPrintScreen = true;
        this.getById();
        await this.onExportProgressNote(data.progressNote.progressNoteID);
        await this.onExportEncounterForm(data.progressNote.progressNoteID);
        this.onSendEmail(data.progressNote.progressNoteID);
        return this._router.navigate([
          "/reports/referral/family-preservation/progress-notes/view",
        ]);
      } else {
        return this._router.navigate([
          "/reports/referral/family-preservation/progress-notes/view",
        ]);
      }
      loader.style.display = "none";
    });
  }
  sendEncounterForm() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    const element = document.getElementById("pdf-content").innerHTML;
    const opt = {
      margin: 1,
      filename:
        "Encounter-" +
        this.client_Name +
        "-" +
        this.datePipe.transform(this.myDate, "dd-MM-yyyy"),
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 1 },
      pagebreak: { mode: "avoid-all", before: "#page2el" },
      jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
    const pdf = html2pdf().from(element).set(opt).output("blob");
    pdf.then((data: any) => {
      this.allPdFiles.push(data);
      this.sendMail();
    });
  }

  progPrinnt() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    const element_pro = document.getElementById("print-content-mail").innerHTML;
    const opt_pro = {
      margin: 1,
      filename: "ProgressNotes",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
      pagebreak: { mode: "avoid-all", before: "#page2el" },
    };
    html2pdf().from(element_pro).set(opt_pro).save();
    const pdf_pro = html2pdf().from(element_pro).set(opt_pro).output("blob");
    pdf_pro.then((data_pro: any) => {
      this.allPdFiles.push(data_pro);
      this.sendEncounterForm();
    });
  }
  sendMail() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let email = [];
    if (this.showOpsField) {
      if (
        environment.localUrl === "https://cms-betaware.st-francis.org/tomcat/"
      ) {
        // this.tomail = [
        //   "keshavaraj.shanmugam@st-francis.org",
        //   "santhosh.natarajan@st-francis.org",
        // ];
        email.push(
          "keshavaraj.shanmugam@st-francis.org",
          "Jennifer.Voth@st-francis.org",
          "Sarah.Sanders@saintfrancisministries.org",
          "Jennel.Rowe@saintfrancisministries.org"
        );
      } else if (
        environment.localUrl ===
        "https://cms.saintfrancisministries.org/tomcat/"
      ) {
        // this.tomail = [
        //   "zzAR2NonContract@st-francis.org",
        //   "Vickie.McArthur@st-francis.org",
        //   "Pamela.Cornwell@st-francis.org",
        // ];
        email.push(
          "zzAR2NonContract@st-francis.org",
          "Vickie.McArthur@st-francis.org",
          "Pamela.Cornwell@st-francis.org"
        );
      }
    } else {
      if (
        environment.localUrl === "https://cms-betaware.st-francis.org/tomcat/"
      ) {
        // this.tomail = [
        //   "keshavaraj.shanmugam@st-francis.org",
        //   "santhosh.natarajan@st-francis.org",
        // ];
        email.push(
          "keshavaraj.shanmugam@st-francis.org",
          "Jennifer.Voth@st-francis.org",
          "Sarah.Sanders@saintfrancisministries.org",
          "Jennel.Rowe@saintfrancisministries.org"
        );
      } else if (
        environment.localUrl ===
        "https://cms.saintfrancisministries.org/tomcat/"
      ) {
        this.tomail = ["zzAR2NonContract@st-francis.org"];
        email.push("zzAR2NonContract@st-francis.org");
      }
    }

    let mailDetail = {
      cc: [],
      bcc: [],
      subject:
        "Progress note and Encounter Form - " +
        this.client_Name +
        "-" +
        this.datePipe.transform(this.myDate, "dd-MM-yyyy"),
      content: "Kindly find the attachment document",
      fileName:
        "Encounter-" +
        this.client_Name +
        "-" +
        this.datePipe.transform(this.myDate, "dd-MM-yyyy") +
        ".pdf",
    };

    console.log("this.allPdFiles>>>>", this.allPdFiles);
    const pdfUpload: FormData = new FormData();
    pdfUpload.append(
      "uploadfile",
      this.allPdFiles[1],
      "Encounter-" +
        this.client_Name +
        "-" +
        this.datePipe.transform(this.myDate, "dd-MM-yyyy") +
        ".pdf"
    );
    mailDetail["to"] = email;
    pdfUpload.append("uploadfile", this.allPdFiles[0], "Progress-notes.pdf");
    pdfUpload.append("emailJson", JSON.stringify(mailDetail));
    this._router.navigate([
      "/reports/referral/family-preservation/progress-notes/view",
    ]);
    loader.style.display = "none";
    // this._placement.sendEmailMultiple(pdfUpload).then((dataEmail) => {});
  }

  deleteAloneTime(id: any, caseActivityID: any) {
    const req = {
      caseActivityFaceToFace: { caseActivityFaceToFaceID: [caseActivityID] },
    };
    if (caseActivityID !== undefined) {
      this._opencard.deleteNTFFAloneTime(req).then((data: any) => {
        if (data.responseStatus) {
          swal("Removed!", "The item has been removed!", "info");
        } else {
          swal(
            "Please try again later!",
            "Something went wrong, Please try again later!",
            "error"
          );
        }
        this.alone_list.splice(id, 1);
      });
    } else {
      this.alone_list.splice(id, 1);
    }
  }
  viewAloneTime(aloneData, id) {
    this.alone_ntff = aloneData;
    this.aloneIndexId = id;
    this.aloneIndexStatus = true;
    this.isAloneTimeUpdate = true;
  }
  clearAloneTime() {
    this.alone_ntff = "";
  }
  filterAloneTimeExceptions(event: any) {
    this.filteredAloneTimeExceptions = [];
    this.aloneTimeException.filter((item: any) => {
      if (item.aloneTimeException.toLowerCase().indexOf(event.query) !== -1) {
        this.filteredAloneTimeExceptions.push(item);
      }
    });
  }
  addAloneTime() {
    if (this.alone_ntff.clientID.clientName == undefined) {
      swal("No Client Found", "Please Select the Client", "info");
    } else {
      const aloneName = this.alone_ntff.clientID.clientName;
      if (this.aloneIndexStatus) {
        this.alone_list[this.aloneIndexId] = this.alone_ntff;
        this.alone_ntff = {
          clientID: "",
          isAloneTime: false,
          isAloneTimeException: false,
          aloneTimeExceptionID: "",
          aloneTimeLength: "",
          aloneTimeNotes: "",
          caseActivityID:
            parseInt(localStorage.getItem("caseActivityID")) -
            this._opencard.getHasKey(),
        };
        this.aloneIndexStatus = false;
        swal("Success", "Client has been Updated!", "success").then(() => {
          this.isAloneTimeUpdate = false;
        });
      } else {
        const array1 = this.alone_list;
        const found = array1.find(function (element) {
          return element.clientID.clientName == aloneName;
        });
        if (found == undefined) {
          this.alone_list.push(this.alone_ntff);
          swal("Success", "Client has been Saved!", "success");
          this.alone_ntff = {
            clientID: "",
            isAloneTime: false,
            isAloneTimeException: false,
            aloneTimeExceptionID: "",
            aloneTimeLength: "",
            aloneTimeNotes: "",
          };
        } else {
          swal("Duplicate", "The Client Already in the list", "info");
        }
      }
    }
    this.alone_list;
    return;
  }
  numericValidation(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  getCurrentImpairmentList() {
    const req = { mentalStatusCategoryID: 1 };
    this._caseTeam
      .getMentalStatusByMentalStatusCategoryID(req)
      .then((data: any) => {
        this.mentalStatusCurrentImpairmentList = data.mentalStatusList;
      });
  }
  getMoodList() {
    const req = { mentalStatusCategoryID: 2 };
    this._caseTeam
      .getMentalStatusByMentalStatusCategoryID(req)
      .then((data: any) => {
        this.mentalStatusMoodList = data.mentalStatusList;
      });
  }
  getCognitiveList() {
    const req = { mentalStatusCategoryID: 3 };
    this._caseTeam
      .getMentalStatusByMentalStatusCategoryID(req)
      .then((data: any) => {
        this.mentalStatusCognitiveProcessesList = data.mentalStatusList;
      });
  }
  getAffectList() {
    const req = { mentalStatusCategoryID: 4 };
    this._caseTeam
      .getMentalStatusByMentalStatusCategoryID(req)
      .then((data: any) => {
        this.mentalStatusAffectList = data.mentalStatusList;
      });
  }
  getDangerList() {
    const req = { mentalStatusCategoryID: 5 };
    this._caseTeam
      .getMentalStatusByMentalStatusCategoryID(req)
      .then((data: any) => {
        this.mentalStatusDangerList = data.mentalStatusList;
      });
  }
  updatedMedicalValues(data) {
    this.updateMedical_val = data;
    data.map((item) => {
      this.selectedMedicationId.push({
        medicalNecessityID: item.medicalNecessityID.medicalNecessityID,
        progressNoteMedicalNecessityID: item.progressNoteMedicalNecessityID,
      });
    });
  }
  updateMentalStatus(data) {
    this.updateMentalStatusID = data;
    data.map((item) => {
      if (
        item.mentalStatusID.mentalStatusCategoryID.mentalStatusCategoryID === 1
      ) {
        const currentImpairment = [];
        this.updatedMentalStatusCurrentImpairmentList.push(
          item.mentalStatusID.mentalStatus
        );
        this.mentalStatusCurrentImpairmentList.map((item1, index) => {
          this.updatedMentalStatusCurrentImpairmentList.forEach((res2) => {
            if (item1.MentalStatus === res2) {
              currentImpairment[index] = res2;
            }
          });
        });
        this.updatedMentalStatusCurrentImpairmentList = currentImpairment;
      } else if (
        item.mentalStatusID.mentalStatusCategoryID.mentalStatusCategoryID === 2
      ) {
        const mood = [];
        this.updatedMentalStatusMoodList.push(item.mentalStatusID.mentalStatus);
        this.mentalStatusMoodList.map((item1, index) => {
          this.updatedMentalStatusMoodList.forEach((res2) => {
            if (item1.MentalStatus === res2) {
              mood[index] = res2;
            }
          });
        });
        this.updatedMentalStatusMoodList = mood;
      } else if (
        item.mentalStatusID.mentalStatusCategoryID.mentalStatusCategoryID === 3
      ) {
        const cognitiveProcesses = [];
        this.updatedMentalStatusCognitiveProcessesList.push(
          item.mentalStatusID.mentalStatus
        );
        this.mentalStatusCognitiveProcessesList.map((item1, index) => {
          this.updatedMentalStatusCognitiveProcessesList.forEach((res2) => {
            if (item1.MentalStatus === res2) {
              cognitiveProcesses[index] = res2;
            }
          });
        });
        this.updatedMentalStatusCognitiveProcessesList = cognitiveProcesses;
      } else if (
        item.mentalStatusID.mentalStatusCategoryID.mentalStatusCategoryID === 4
      ) {
        const affect = [];
        this.updatedMentalStatusAffectList.push(
          item.mentalStatusID.mentalStatus
        );
        this.mentalStatusAffectList.map((item1, index) => {
          this.updatedMentalStatusAffectList.forEach((res2) => {
            if (item1.MentalStatus === res2) {
              affect[index] = res2;
            }
          });
        });
        this.updatedMentalStatusAffectList = affect;
      } else if (
        item.mentalStatusID.mentalStatusCategoryID.mentalStatusCategoryID === 5
      ) {
        const danger = [];
        this.updatedMentalStatusDangerList.push(
          item.mentalStatusID.mentalStatus
        );
        this.mentalStatusDangerList.map((item1, index) => {
          this.updatedMentalStatusDangerList.forEach((res2) => {
            if (item1.MentalStatus === res2) {
              danger[index] = res2;
            }
          });
        });
        this.updatedMentalStatusDangerList = danger;
      }
    });
  }
  getById() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    // To be removed
    if (this._router.url == "/reports/case-activity-log") {
      this.req = { progressNoteID: 100156 };
      // req = { progressNoteID: this.progressNotessLogData.progressNoteID }
    } else {
      this.req = { progressNoteID: this._client.getId() };
    }
    this._opencard.getByIdProgressNote(this.req).then(async (data) => {
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(
        data.progressNote.changedBy
      )
        ? data.progressNote.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.progressNote.changedDate
      )
        ? moment(data.progressNote.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(
        data.progressNote.enteredBy
      )
        ? data.progressNote.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.progressNote.enteredDate
      )
        ? moment(data.progressNote.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";

      this.autoFetchDetails();
      this.kancare_mco = !isNullOrUndefined(
        data.progressNote.clientID.kanCareMCO_ProviderID
      )
        ? data.progressNote.clientID.kanCareMCO_ProviderID.providerName
        : null;
      // this.kancare_mco = data.progressNote.clientID.kanCareMCO_ProviderID.providerName;
      if (!isNullOrUndefined(data.caseActivityFaceToFace)) {
        if (data.caseActivityFaceToFace.length > 0) {
          data.caseActivityFaceToFace.map((item: any) => {
            !isNullOrUndefined(item.clientID)
              ? (item.clientID[
                  "clientName"
                ] = `${item.clientID.lastName}, ${item.clientID.firstName}`)
              : null;
          });
          this.alone_list = data.caseActivityFaceToFace;
        }
      }
      this.updatedMedicalValues(data.progressNote.medicalNecessity);
      this.updateMentalStatus(data.progressNote.mentalStatus);
      loader.style.display = "none";
      if (!isNullOrUndefined(data.progressNote.statusTypeID)) {
        if (data.progressNote.statusTypeID.statusTypeID === 14) {
          this.isInProgress = true;
          this.progressNoteForm.get("isAgreementStatementChecked").disable();
        }
      }
      !isNullOrUndefined(data.progressNote.caseActivityID)
        ? !isNullOrUndefined(data.progressNote.caseActivityID.clientID)
          ? (data.progressNote.clientID = {
              clientName:
                data.progressNote.caseActivityID.clientID.clientNameFirstLast,
              clientID: data.progressNote.caseActivityID.clientID.clientID,
            })
          : null
        : null;
      !isNullOrUndefined(data.progressNote.caseActivityID)
        ? !isNullOrUndefined(data.progressNote.caseActivityID.staffID)
          ? (data.progressNote.therapist_StaffID = {
              fullName:
                data.progressNote.caseActivityID.staffID.lastName +
                " " +
                data.progressNote.caseActivityID.staffID.firstName,
            })
          : null
        : null;
      !isNullOrUndefined(data.progressNote.beginDate)
        ? (data.progressNote.beginDate = new Date(data.progressNote.beginDate))
        : null;
      !isNullOrUndefined(data.progressNote.endDate)
        ? (data.progressNote.endDate = new Date(data.progressNote.endDate))
        : null;
      !isNullOrUndefined(data.progressNote.nextAppointmentDate)
        ? (data.progressNote.nextAppointmentDate = new Date(
            data.progressNote.nextAppointmentDate
          ))
        : null;
      !isNullOrUndefined(data.progressNote.unusualMarks_YesNoPendingID)
        ? (data.progressNote.unusualMarks_YesNoPendingID =
            data.progressNote.unusualMarks_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.childAppearsHealthy_YesNoPendingID)
        ? (data.progressNote.childAppearsHealthy_YesNoPendingID =
            data.progressNote.childAppearsHealthy_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.childIsClean_YesNoPendingID)
        ? (data.progressNote.childIsClean_YesNoPendingID =
            data.progressNote.childIsClean_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.heightWeight_YesNoPendingID)
        ? (data.progressNote.heightWeight_YesNoPendingID =
            data.progressNote.heightWeight_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.homeIsClean_YesNoPendingID)
        ? (data.progressNote.homeIsClean_YesNoPendingID =
            data.progressNote.homeIsClean_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.homeSafetyConcerns_YesNoPendingID)
        ? (data.progressNote.homeSafetyConcerns_YesNoPendingID =
            data.progressNote.homeSafetyConcerns_YesNoPendingID.yesNoPendingID)
        : null;

      !isNullOrUndefined(
        data.progressNote.suicidalThoughtsOrGestures_YesNoPendingID
      )
        ? (data.progressNote.suicidalThoughtsOrGestures_YesNoPendingID =
            data.progressNote.suicidalThoughtsOrGestures_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(
        data.progressNote.violentThoughtsOrGestures_YesNoPendingID
      )
        ? (data.progressNote.violentThoughtsOrGestures_YesNoPendingID =
            data.progressNote.violentThoughtsOrGestures_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.weaponsObserved_YesNoPendingID)
        ? (data.progressNote.weaponsObserved_YesNoPendingID =
            data.progressNote.weaponsObserved_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.caregiverforTheChild_YesNoPendingID)
        ? (data.progressNote.caregiverforTheChild_YesNoPendingID =
            data.progressNote.caregiverforTheChild_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(
        data.progressNote.caregiverInfluenceOfSubstances_YesNoPendingID
      )
        ? (data.progressNote.caregiverInfluenceOfSubstances_YesNoPendingID =
            data.progressNote.caregiverInfluenceOfSubstances_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.newSafetyConcerns_YesNoPendingID)
        ? (data.progressNote.newSafetyConcerns_YesNoPendingID =
            data.progressNote.newSafetyConcerns_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.developedORreviewed_YesNoPendingID)
        ? (data.progressNote.developedORreviewed_YesNoPendingID =
            data.progressNote.developedORreviewed_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.householdMembers_YesNoPendingID)
        ? (data.progressNote.householdMembers_YesNoPendingID =
            data.progressNote.householdMembers_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(
        data.progressNote.naturalAndCommunitySupports_YesNoPendingID
      )
        ? (data.progressNote.naturalAndCommunitySupports_YesNoPendingID =
            data.progressNote.naturalAndCommunitySupports_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.hygieneAndDress_YesNoPendingID)
        ? (data.progressNote.hygieneAndDress_YesNoPendingID =
            data.progressNote.hygieneAndDress_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.caregiverDemonstrates_YesNoPendingID)
        ? (data.progressNote.caregiverDemonstrates_YesNoPendingID =
            data.progressNote.caregiverDemonstrates_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.selfHarmingBehaviors_YesNoPendingID)
        ? (data.progressNote.selfHarmingBehaviors_YesNoPendingID =
            data.progressNote.selfHarmingBehaviors_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.adequateSpace_YesNoPendingID)
        ? (data.progressNote.adequateSpace_YesNoPendingID =
            data.progressNote.adequateSpace_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.progressNote.aggressiveBehaviors_YesNoPendingID)
        ? (data.progressNote.aggressiveBehaviors_YesNoPendingID =
            data.progressNote.aggressiveBehaviors_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(
        data.progressNote.additionalRiskConcerns_YesNoPendingID
      )
        ? (data.progressNote.additionalRiskConcerns_YesNoPendingID =
            data.progressNote.additionalRiskConcerns_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(
        data.progressNote.casePlanOrNonIntensive_YesNoPendingID
      )
        ? (data.progressNote.casePlanOrNonIntensive_YesNoPendingID =
            data.progressNote.casePlanOrNonIntensive_YesNoPendingID.yesNoPendingID)
        : null;
      isNullOrUndefined(data.progressNote.caseActivityID)
        ? !isNullOrUndefined(data.progressNote.clientID)
          ? (data.progressNote.clientID["clientName"] =
              data.progressNote.clientID.firstName)
          : null
        : null;
      !isNullOrUndefined(data.progressNote.caseActivityID)
        ? !isNullOrUndefined(data.progressNote.caseActivityID.clientID)
          ? (this.encounterForm.contractClient =
              data.progressNote.caseActivityID.clientID["clientNameLastFirst"])
          : null
        : null;
      !isNullOrUndefined(data.progressNote.caseActivityID)
        ? !isNullOrUndefined(data.progressNote.caseActivityID.procodeID)
          ? (this.encounterForm.procode =
              data.progressNote.caseActivityID.procodeID["procode"])
          : null
        : null;
      !isNullOrUndefined(data.progressNote.caseActivityID)
        ? (this.encounterForm.units = data.progressNote.caseActivityID.units)
        : null;
      if (!isNullOrUndefined(data.progressNote.caseActivityID)) {
        if (
          !isNullOrUndefined(data.progressNote.caseActivityID.beginDate) &&
          !isNullOrUndefined(data.progressNote.caseActivityID.endDate)
        ) {
          !isNullOrUndefined(data.progressNote.caseActivityID)
            ? (this.encounterForm.time =
                Math.abs(
                  data.progressNote.caseActivityID.beginDate -
                    data.progressNote.caseActivityID.endDate
                ) / 36e5)
            : null;
        }
      }

      !isNullOrUndefined(data.progressNote.caseActivityID)
        ? (data.progressNote.caseActivityID =
            data.progressNote.caseActivityID.caseActivityID)
        : null;
      !isNullOrUndefined(data.progressNote.referralID)
        ? (this.encounterForm.program =
            data.progressNote.referralID.referralTypeID.description)
        : null;
      !isNullOrUndefined(data.progressNote.location)
        ? (this.encounterForm.location = data.progressNote.location)
        : null;

      !isNullOrUndefined(data.progressNote.isFaceToFace)
        ? (this.encounterForm.isFaceToFace = data.progressNote.isFaceToFace)
        : null;
      !isNullOrUndefined(data.progressNote.isTelemedicine)
        ? (this.encounterForm.isTelemedicine = data.progressNote.isTelemedicine)
        : null;
      !isNullOrUndefined(data.progressNote.isInteractiveComplexity)
        ? (this.encounterForm.isInteractiveComplexity =
            data.progressNote.isInteractiveComplexity)
        : null;
      !isNullOrUndefined(data.progressNote.gafvalue)
        ? (data.progressNote.gafValue = data.progressNote.gafvalue)
        : null;
      // this.encounterForm.diagnosisCodeID = data.progressNote.diagnosisCodeID.diagnosisCodeDescription;

      this.medicalNecessaryValuesFromGetById(data);
      if (!isNullOrUndefined(data.progressNote.therapyTypeID)) {
        this.setTherapyTypeValuesFromGetById(
          data.progressNote.therapyTypeID.therapyType
        );
      }

      if (!isNullOrUndefined(data.progressNote.isFaceToFace)) {
        if (data.progressNote.isFaceToFace === true) {
          data.progressNote.isFaceToFace = "true";
        } else if (!isNullOrUndefined(data.progressNote.isTelemedicine)) {
          if (data.progressNote.isTelemedicine === true) {
            data.progressNote.isFaceToFace = "false";
          }
        }
      }
      this.progressNote = data.progressNote;
      this.onChangeLastAppointmentCheckbox(this.progressNote.isLastAppointment);
      this.progressNoteForm.disable();
      this.isEdit = true;
      this.fetchDataFromProgressNotesNode(data.progressNote);
    });
  }

  editForm() {
    this.isEdit = false;
    this.progressNoteForm.enable();
    if (this.isInProgress === true) {
      this.progressNoteForm.get("isAgreementStatementChecked").disable();
    }
  }
  disableCheck(event) {
    if (event.statusTypeID === 14) {
      this.isInProgress = true;
      this.progressNoteForm.get("isAgreementStatementChecked").disable();
    } else {
      this.progressNoteForm.get("isAgreementStatementChecked").enable();
    }
  }
  navigateTo() {
    const currentURL = this._router.url;
    if (
      currentURL ==
      "/reports/referral/family-preservation/progress-notes/detail"
    ) {
      this.url = "/reports/attachment-document/progress-notes";
    } else {
      this.url = "/reports/attachment-document/rfc/progress-notes";
    }
    return this._router.navigate([this.url]);
  }

  async printPreview() {
    let request = {};
    let response = await this._opencard.exportProgressNotePrintForm(request);
  }

  closeModalBox() {
    this.isProgressNotesPrintable = false;
    this.showDiagnosis = false;
  }

  autoFetchDetails() {
    let req: any;
    if (this._router.url == "/reports/case-activity-log") {
      req = {
        clientID: this.progressNotessLogData.clientID,
      };
    } else {
      req = {
        clientID:
          parseInt(localStorage.getItem("clientId")) -
          this._opencard.getHasKey(),
      };
    }
    // let req = {
    //   clientID: parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey()
    // }
    this._client.getDetailsById(req).then((data) => {
      this.progressNotePrint.caseName =
        data.person.firstName + " " + data.person.lastName;
      this.encounterForm.caseName = this.progressNotePrint.caseName;
      this.encounterForm.caseNumber = data.person.kaecses;
      this.encounterForm.dob =
        new Date(data.person.dob).getMonth() +
        1 +
        "/" +
        new Date(data.person.dob).getDate() +
        "/" +
        new Date(data.person.dob).getFullYear();
      // if (!isNullOrUndefined(data.person.cityID)) {
      // }
      this.progressNotePrint.clientLocation = this.progressNote.location;
      if (!isNullOrUndefined(data.person.countyID.sfaofficeID)) {
        this.progressNotePrint.officeLocation =
          data.person.countyID.sfaofficeID.officeName;
      }
      this.progressNotePrint.caseNumber = data.person.kaecses;
    });

    // this._referral.getReferralData()
    //   .then((data) => {
    //     // this.progressNotePrint.dateOfReferral = (new Date(data.referral.referralDate).getMonth() + 1) + '/' + new Date(data.referral.referralDate).getDate() + '/' + new Date(data.referral.referralDate).getFullYear();
    //     // this.encounterForm.dateOfReferral = this.progressNotePrint.dateOfReferral;
    //   })
  }

  fetchDataFromProgressNotesNode(prog) {
    !isNullOrUndefined(this.progressNote.beginDate)
      ? (this.encounterForm.date = moment(this.progressNote.beginDate).format(
          "MM/DD/YYYY"
        ))
      : null;
    !isNullOrUndefined(this.progressNote.beginDate)
      ? (this.encounterForm.startTime = moment(
          this.progressNote.beginDate
        ).format("HH:mm"))
      : null;
    !isNullOrUndefined(this.progressNote.endDate)
      ? (this.encounterForm.endTime = moment(this.progressNote.endDate).format(
          "HH:mm"
        ))
      : null;
    !isNullOrUndefined(this.progressNote.beginDate)
      ? (this.progressNotePrint.startTime = new Date(
          this.progressNote.beginDate
        ).toLocaleTimeString())
      : null;
    !isNullOrUndefined(this.progressNote.endDate)
      ? (this.progressNotePrint.endTime = new Date(
          this.progressNote.endDate
        ).toLocaleTimeString())
      : null;
    this.duration = diff(
      this.encounterForm.startTime,
      this.encounterForm.endTime
    );
    let amount = [];
    this.encounterArr.map((item) => {
      if (item.procode === this.encounterForm.procode) {
        item.Time = this.duration;
        item.Units = this.encounterForm.units;
        amount = item.Charge.split("$");
        this.encounterForm.chargeAmount =
          "$ " + (parseInt(amount[1]) * item.Units).toFixed(2);
      }
    });
    this.progressNotePrint.date = moment(this.progressNote.beginDate).format(
      "MM/DD/YYYY"
    );
    this.progressNotePrint.sessionParticipants = this.progressNote.participants;
    this.progressNotePrint.goalsObjectives = this.progressNote.objectiveAddressed;
    this.progressNotePrint.gafValue = this.progressNote.gafValue;
    this.progressNotePrint.diagnosisChange = this.progressNote.diagnosisChange;
    this.progressNotePrint.changeTXPlan = this.progressNote.changeTXPlan;
    // this.progressNotePrint.clientFunctionating = this.progressNote.clientFunctionating;
    this.progressNotePrint.topicsCovered = this.progressNote.topicsCovered;
    this.progressNotePrint.homeSafetyConcerns_YesNoPendingID = this.progressNote.homeSafetyConcerns_YesNoPendingID;
    this.progressNotePrint.nextAppointmentDate = !isNullOrUndefined(
      this.progressNote.nextAppointmentDate
    )
      ? this.progressNote.nextAppointmentDate.getMonth() +
        1 +
        "/" +
        this.progressNote.nextAppointmentDate.getDate() +
        "/" +
        this.progressNote.nextAppointmentDate.getFullYear()
      : null;
    this.progressNotePrint.childAppearsHealthy_YesNoPendingID = this.progressNote.childAppearsHealthy_YesNoPendingID;
    this.progressNotePrint.homeIsClean_YesNoPendingID = this.progressNote.homeIsClean_YesNoPendingID;
    this.progressNotePrint.heightWeightAppear = this.progressNote.heightWeight_YesNoPendingID;
    this.progressNotePrint.isChildClean = this.progressNote.childIsClean_YesNoPendingID;
    this.progressNotePrint.additionalComments = this.progressNote.additionalComments;
    this.progressNotePrint.individualTherapy = this.progressNote.individualTherapy;
    this.progressNotePrint.groupTherapy = this.progressNote.groupTherapy;
    this.progressNotePrint.psychInterview = this.progressNote.psychInterview;
    // this.progressNotePrint.therapyType = this.progressNote.therapyTypeID.therapyType;
    this.progressNotePrint.therapyInHome = this.progressNote.therapyInHome;
    this.progressNotePrint.therapyInClinic = this.progressNote.therapyInClinic;

    this.progressNotePrint.weaponsObserved_YesNoPendingID = this.progressNote.weaponsObserved_YesNoPendingID;
    this.progressNotePrint.suicidalThoughtsOrGestures_YesNoPendingID = this.progressNote.suicidalThoughtsOrGestures_YesNoPendingID;
    this.progressNotePrint.violentThoughtsOrGestures_YesNoPendingID = this.progressNote.violentThoughtsOrGestures_YesNoPendingID;
    this.progressNotePrint.caregiverforTheChild_YesNoPendingID = this.progressNote.caregiverforTheChild_YesNoPendingID;
    this.progressNotePrint.caregiverInfluenceOfSubstances_YesNoPendingID = this.progressNote.caregiverInfluenceOfSubstances_YesNoPendingID;
    this.progressNotePrint.unusualMarks_YesNoPendingID = this.progressNote.unusualMarks_YesNoPendingID;
    this.progressNotePrint.newSafetyConcerns_YesNoPendingID = this.progressNote.newSafetyConcerns_YesNoPendingID;
    this.progressNotePrint.developedORreviewed_YesNoPendingID = this.progressNote.developedORreviewed_YesNoPendingID;
    this.progressNotePrint.familySafetyPlan = this.progressNote.familySafetyPlan;
    this.progressNotePrint.safetyNeeds = this.progressNote.safetyNeeds;
    this.progressNotePrint.safetyComments = this.progressNote.safetyComments;
    this.progressNotePrint.householdMembers_YesNoPendingID = this.progressNote.householdMembers_YesNoPendingID;
    this.progressNotePrint.distantSite = this.progressNote.distantSite;
    this.progressNotePrint.originatingSite = this.progressNote.originatingSite;
    this.encounterForm.therapist = this.progressNote.therapist_StaffID.fullName;
    this.progressNotePrint.isAgreementStatementChecked = this.progressNote.isAgreementStatementChecked;
    // this.progressNotePrint.dateOfReferral = this.progressNote.referralID.referralDate;
    this.progressNotePrint.heightWeight_YesNoPendingID = this.progressNote.heightWeight_YesNoPendingID;
    this.progressNotePrint.naturalAndCommunitySupports_YesNoPendingID = this.progressNote.naturalAndCommunitySupports_YesNoPendingID;
    this.progressNotePrint.hygieneAndDress_YesNoPendingID = this.progressNote.hygieneAndDress_YesNoPendingID;
    this.progressNotePrint.caregiverDemonstrates_YesNoPendingID = this.progressNote.caregiverDemonstrates_YesNoPendingID;
    this.progressNotePrint.selfHarmingBehaviors_YesNoPendingID = this.progressNote.selfHarmingBehaviors_YesNoPendingID;
    this.progressNotePrint.adequateSpace_YesNoPendingID = this.progressNote.adequateSpace_YesNoPendingID;
    // this.progressNotePrint.diagnosisCodeID = this.progressNoteDiagnosis.diagnosisCodeID.diagnosisCodeDescription;
    this.progressNotePrint.planTillNextAppointment = this.progressNote.planTillNextAppointment;
    if (this.progressNote.prognosisTypeID) {
      if (this.progressNote.prognosisTypeID["prognosisType"] === "Good") {
        this.progressNotePrint.isGood = true;
      }
      if (this.progressNote.prognosisTypeID["prognosisType"] === "Fair") {
        this.progressNotePrint.isFair = true;
      }
      if (this.progressNote.prognosisTypeID["prognosisType"] === "Guarded") {
        this.progressNotePrint.isGuarded = true;
      }
      if (this.progressNote.prognosisTypeID["prognosisType"] === "Poor") {
        this.progressNotePrint.isPoor = true;
      }
    }
    this.progressNotePrint.aggressiveBehaviors_YesNoPendingID = this.progressNote.aggressiveBehaviors_YesNoPendingID;
    this.progressNotePrint.additionalRiskConcerns_YesNoPendingID = this.progressNote.additionalRiskConcerns_YesNoPendingID;
    this.progressNotePrint.casePlanOrNonIntensive_YesNoPendingID = this.progressNote.casePlanOrNonIntensive_YesNoPendingID;
    this.progressNotePrint.familyStrengthsAndResources = this.progressNote.familyStrengthsAndResources;
    this.progressNotePrint.riskComments = this.progressNote.riskComments;
    this.progressNotePrint.isTreatmentNeeded = this.medicalNecessaryValues.isTreatmentNeeded;
    this.progressNotePrint.isMoodDisordered = this.medicalNecessaryValues.isMoodDisordered;
    this.progressNotePrint.isContinuedImpairment = this.medicalNecessaryValues.isContinuedImpairment;
    this.progressNotePrint.isInterpersonalImpairment = this.medicalNecessaryValues.isInterpersonalImpairment;
    this.progressNotePrint.isImpairmentInSocial = this.medicalNecessaryValues.isImpairmentInSocial;
    this.progressNotePrint.isMeetsContinue = this.medicalNecessaryValues.isMeetsContinue;
    this.progressNotePrint.isServicesNecessary = this.medicalNecessaryValues.isServicesNecessary;
    this.progressNotePrint.isMonitorMedication = this.medicalNecessaryValues.isMonitorMedication;

    this.progressNotePrint.isSevere = this.mentalStatusValues.isSevere;
    this.progressNotePrint.isModerate = this.mentalStatusValues.isModerate;
    this.progressNotePrint.isMild = this.mentalStatusValues.isMild;
    this.progressNotePrint.isMinimal = this.mentalStatusValues.isMinimal;
    this.progressNotePrint.isNone = this.mentalStatusValues.isNone;
    this.progressNotePrint.isEuthymic = this.mentalStatusValues.isEuthymic;
    this.progressNotePrint.isDepressed = this.mentalStatusValues.isDepressed;
    this.progressNotePrint.isIrritable = this.mentalStatusValues.isIrritable;
    this.progressNotePrint.isAnxious = this.mentalStatusValues.isAnxious;
    this.progressNotePrint.isEuphoric = this.mentalStatusValues.isEuphoric;
    this.progressNotePrint.isOther = this.mentalStatusValues.isOther;
    this.progressNotePrint.isNoImpairment = this.mentalStatusValues.isNoImpairment;
    this.progressNotePrint.isDisorganized = this.mentalStatusValues.isDisorganized;
    this.progressNotePrint.isPoorConcentration = this.mentalStatusValues.isPoorConcentration;
    this.progressNotePrint.isImpairedAbstract = this.mentalStatusValues.isImpairedAbstract;
    this.progressNotePrint.isImpairedJudgement = this.mentalStatusValues.isImpairedJudgement;
    this.progressNotePrint.isBlunted = this.mentalStatusValues.isBlunted;
    this.progressNotePrint.isRestricted = this.mentalStatusValues.isRestricted;
    this.progressNotePrint.isIntense = this.mentalStatusValues.isIntense;
    this.progressNotePrint.isAppropritate = this.mentalStatusValues.isAppropritate;
    this.progressNotePrint.isFlat = this.mentalStatusValues.isFlat;
    this.progressNotePrint.isDetached = this.mentalStatusValues.isDetached;
    this.progressNotePrint.isDangeNone = this.mentalStatusValues.isDangeNone;
    this.progressNotePrint.isIdeation = this.mentalStatusValues.isIdeation;
    this.progressNotePrint.isPlan = this.mentalStatusValues.isPlan;
    this.progressNotePrint.isGestures = this.mentalStatusValues.isGestures;
    this.progressNotePrint.isOngoingConcern = this.mentalStatusValues.isOngoingConcern;

    this.progressNotePrint.isInitialPsychInterview = this.therapyTypeValues.isInitialPsychInterview;
    this.progressNotePrint.isIndividualTherapy = this.therapyTypeValues.isIndividualTherapy;
    this.progressNotePrint.isFamilyTherapyInHome = this.therapyTypeValues.isFamilyTherapyInHome;
    this.progressNotePrint.isGroupTherapy = this.therapyTypeValues.isGroupTherapy;
    this.progressNotePrint.isFamilyTherapyInClinic = this.therapyTypeValues.isFamilyTherapyInClinic;
    this.progressNotePrint.isCaseConferance = this.therapyTypeValues.isCaseConferance;

    // this.kancare_mco = !isNullOrUndefined(data.progressNote.clientID.kanCareMCO_ProviderID) ? data.progressNote.clientID.kanCareMCO_ProviderID.providerName : null;
    this.progressNotePrint.dateOfReferral = !isNullOrUndefined(
      this.progressNote.referralID
    )
      ? new Date(this.progressNote.referralID["referralDate"]).getMonth() +
        1 +
        "/" +
        new Date(this.progressNote.referralID["referralDate"]).getDate() +
        "/" +
        new Date(this.progressNote.referralID["referralDate"]).getFullYear()
      : null;

    // this.progressNotePrint.dateOfReferral = (new Date(this.progressNote.referralID['referralDate']).getMonth() + 1) + '/' + new Date(this.progressNote.referralDate).getDate() + '/' + new Date(this.progressNote.referralDate).getFullYear();
    this.encounterForm.dateOfReferral = this.progressNotePrint.dateOfReferral;
    if (!isNullOrUndefined(prog.statusTypeID)) {
      if (prog.statusTypeID.statusTypeID === 4) {
        if (this.isPrintScreen) {
          setTimeout(() => {
            this.progPrinnt();
          }, 3000);
        }
      }
    }
  }

  setMedicalNecessaryValues() {
    this.medicalNecessaryValues.isTreatmentNeeded = false;
    this.medicalNecessaryValues.isContinuedImpairment = false;
    this.medicalNecessaryValues.isImpairmentInSocial = false;
    this.medicalNecessaryValues.isServicesNecessary = false;
    this.medicalNecessaryValues.isMoodDisordered = false;
    this.medicalNecessaryValues.isInterpersonalImpairment = false;
    this.medicalNecessaryValues.isMeetsContinue = false;
    this.medicalNecessaryValues.isMonitorMedication = false;
  }

  async medicalNecessaryValuesFromGetById(data) {
    const medicalNecesseryArray = await data.progressNote.medicalNecessity;
    medicalNecesseryArray.map((item: any) => {
      switch (item.medicalNecessityID.medicalNecessity) {
        case "Treatment Needed to Monitor/Reduce Risk of Violence to Self or Others":
          this.medicalNecessaryValues.isTreatmentNeeded = true;
          break;

        case "Continued Impairment of Reality Testing":
          this.medicalNecessaryValues.isContinuedImpairment = true;
          break;

        case "Impairment in Social, Familial, Academic/Work Functioning":
          this.medicalNecessaryValues.isImpairmentInSocial = true;
          break;

        case "Services Necessary to Maintain GAF and Stabilize Gains":
          this.medicalNecessaryValues.isServicesNecessary = true;
          break;

        case "Mood Disorder":
          this.medicalNecessaryValues.isMoodDisordered = true;
          break;

        case "Interpersonal/Behavioral Difficulties":
          this.medicalNecessaryValues.isInterpersonalImpairment = true;
          break;

        case "Meets Continuing Care Criteria":
          this.medicalNecessaryValues.isMeetsContinue = true;
          break;

        case "Continued need to Monitor Medication":
          this.medicalNecessaryValues.isMonitorMedication = true;
          break;
      }
    });
  }

  setMentalStatusValues() {
    this.mentalStatusValues.isSevere = false;
    this.mentalStatusValues.isModerate = false;
    this.mentalStatusValues.isMild = false;
    this.mentalStatusValues.isMinimal = false;
    this.mentalStatusValues.isNone = false;
    this.mentalStatusValues.isEuthymic = false;
    this.mentalStatusValues.isDepressed = false;
    this.mentalStatusValues.isIrritable = false;
    this.mentalStatusValues.isAnxious = false;
    this.mentalStatusValues.isEuphoric = false;
    this.mentalStatusValues.isOther = false;
    this.mentalStatusValues.isNoImpairment = false;
    this.mentalStatusValues.isDisorganized = false;
    this.mentalStatusValues.isPoorConcentration = false;
    this.mentalStatusValues.isImpairedAbstract = false;
    this.mentalStatusValues.isImpairedJudgement = false;
    this.mentalStatusValues.isBlunted = false;
    this.mentalStatusValues.isRestricted = false;
    this.mentalStatusValues.isIntense = false;
    this.mentalStatusValues.isAppropritate = false;
    this.mentalStatusValues.isFlat = false;
    this.mentalStatusValues.isDetached = false;
    this.mentalStatusValues.isDangeNone = false;
    this.mentalStatusValues.isIdeation = false;
    this.mentalStatusValues.isPlan = false;
    this.mentalStatusValues.isGestures = false;
    this.mentalStatusValues.isOngoingConcern = false;
  }
  delete(arr, attr, value) {
    let i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }
  deleteWithCondition(arr, attr1, attr2, value1, value2) {
    let i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr1) &&
        arr[i].hasOwnProperty(attr2) &&
        arguments.length > 2 &&
        arr[i][attr1] === value1 &&
        arr[i][attr2] === value2
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }
  getMedicalNecessity(event: any, item: any) {
    if (event) {
      this.selectedMedicationId.push({ medicalNecessityID: item });
    } else {
      const medi_necessity = this.updateMedical_val.find(function (element) {
        return element.medicalNecessityID.medicalNecessityID == item;
      });
      this.allMedIds.push(medi_necessity.progressNoteMedicalNecessityID);
      this.delete(this.selectedMedicationId, "medicalNecessityID", item);
    }
  }
  getMentalStatus(event, item: any, status: any, i) {
    switch (status) {
      case "Affect":
        if (event) {
          this.updatedMentalStatusAffectList[i] = item.MentalStatus;
        } else {
          const aff_specMentalID = this.updateMentalStatusID.find(function (
            element
          ) {
            return element.mentalStatusID.mentalStatusID == item.MentalStatusID;
          });
          this.allMenIds.push(aff_specMentalID.progressNoteMentalStatusID);
          this.updatedMentalStatusAffectList.filter(() => {
            const index = this.updatedMentalStatusAffectList.indexOf(
              item.MentalStatus
            );
            if (index > -1) {
              return this.updatedMentalStatusAffectList.splice(index, 1);
            }
          });
        }
        break;
      case "Cognitive Processes":
        if (event) {
          this.updatedMentalStatusCognitiveProcessesList[i] = item.MentalStatus;
        } else {
          const cog_specMentalID = this.updateMentalStatusID.find(function (
            element
          ) {
            return element.mentalStatusID.mentalStatusID == item.MentalStatusID;
          });
          this.allMenIds.push(cog_specMentalID.progressNoteMentalStatusID);
          this.updatedMentalStatusCognitiveProcessesList.filter(() => {
            const index = this.updatedMentalStatusCognitiveProcessesList.indexOf(
              item.MentalStatus
            );
            if (index > -1) {
              return this.updatedMentalStatusCognitiveProcessesList.splice(
                index,
                1
              );
            }
          });
        }
        break;
      case "Current Impairment":
        if (event) {
          this.updatedMentalStatusCurrentImpairmentList[i] = item.MentalStatus;
        } else {
          const cur_specMentalID = this.updateMentalStatusID.find(function (
            element
          ) {
            return element.mentalStatusID.mentalStatusID == item.MentalStatusID;
          });
          this.allMenIds.push(cur_specMentalID.progressNoteMentalStatusID);
          this.updatedMentalStatusCurrentImpairmentList.filter(() => {
            const index = this.updatedMentalStatusCurrentImpairmentList.indexOf(
              item.MentalStatus
            );
            if (index > -1) {
              return this.updatedMentalStatusCurrentImpairmentList.splice(
                index,
                1
              );
            }
          });
        }
        break;
      case "Danger":
        if (event) {
          this.updatedMentalStatusDangerList[i] = item.MentalStatus;
        } else {
          const dan_specMentalID = this.updateMentalStatusID.find(function (
            element
          ) {
            return element.mentalStatusID.mentalStatusID == item.MentalStatusID;
          });
          this.allMenIds.push(dan_specMentalID.progressNoteMentalStatusID);
          this.updatedMentalStatusDangerList.filter(() => {
            const index = this.updatedMentalStatusDangerList.indexOf(
              item.MentalStatus
            );
            if (index > -1) {
              return this.updatedMentalStatusDangerList.splice(index, 1);
            }
          });
        }
        break;
      case "Mood":
        if (event) {
          this.updatedMentalStatusMoodList[i] = item.MentalStatus;
        } else {
          const mood_specMentalID = this.updateMentalStatusID.find(function (
            element
          ) {
            return element.mentalStatusID.mentalStatusID == item.MentalStatusID;
          });
          this.allMenIds.push(mood_specMentalID.progressNoteMentalStatusID);
          this.updatedMentalStatusMoodList.filter(() => {
            const index = this.updatedMentalStatusMoodList.indexOf(
              item.MentalStatus
            );
            if (index > -1) {
              return this.updatedMentalStatusMoodList.splice(index, 1);
            }
          });
        }
        break;
    }
  }

  setTherapyTypes() {
    this.therapyTypeValues.isInitialPsychInterview = false;
    this.therapyTypeValues.isIndividualTherapy = false;
    this.therapyTypeValues.isFamilyTherapyInHome = false;
    this.therapyTypeValues.isGroupTherapy = false;
    this.therapyTypeValues.isFamilyTherapyInClinic = false;
    this.therapyTypeValues.isCaseConferance = false;
  }

  setTherapyTypeValuesFromGetById(therapyType) {
    this.progressNotePrint.therapyType = therapyType;
    switch (therapyType) {
      case "Individual Therapy":
        this.therapyTypeValues.isIndividualTherapy = true;
        break;

      case "Group Therapy":
        this.therapyTypeValues.isGroupTherapy = true;
        break;

      case "Case Conference (Medical Team Conference)":
        this.therapyTypeValues.isCaseConferance = true;
        break;

      case "Family Therapy in home":
        this.therapyTypeValues.isFamilyTherapyInHome = true;
        break;

      case "Family Therapy in clinic/community ":
        this.therapyTypeValues.isFamilyTherapyInClinic = true;
        break;

      case "Initial Psych Interview":
        this.therapyTypeValues.isInitialPsychInterview = true;
        break;
    }
  }

  setInitialValuesForPrintForm() {
    this.setMedicalNecessaryValues();
    this.setMentalStatusValues();
    this.setTherapyTypes();
  }

  fetchCurrentCaseActivityInfo() {
    let currentCaseActivityID = this._localValues.caseAcitivityID,
      caseActivityReq: any,
      parsedBeginDate: any,
      parsedEndDate: any,
      currentCaseActivityDetails: any;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    caseActivityReq = { caseActivityID: currentCaseActivityID };
    this._opencard.getCaseActivityById(caseActivityReq).then((data: any) => {
      loader.style.display = "none";
      currentCaseActivityDetails = data.caseActivity;
      currentCaseActivityDetails.clientID["clientName"] =
        currentCaseActivityDetails.clientID.clientNameLastFirst;
      currentCaseActivityDetails.staffID[
        "fullName"
      ] = `${currentCaseActivityDetails.staffID.lastName}, ${currentCaseActivityDetails.staffID.firstName}`;
      this.progressNote.clientID = currentCaseActivityDetails.clientID;
      this.progressNote.beginDate = new Date(data.caseActivityBeginDate);
      this.progressNote.endDate = new Date(data.caseActivityEndDate);
      this.progressNote.therapist_StaffID = currentCaseActivityDetails.staffID;
      // this.progressNote.location = currentCaseActivityDetails.clientID.cityID.city;
      this.fetchDataFromProgressNotesNode(this.progressNote);
    });
  }
  saveDiagnosisCode(source: any) {
    // if (this.validationSection2PrincipalDignosisBeginDate()) {
    this.showDiagnosis = false;
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    !isNullOrUndefined(source.clientID)
      ? (source.clientID = source.clientID.clientID)
      : null;
    !isNullOrUndefined(source.diagnosisCodeID)
      ? (source.diagnosisCodeID = source.diagnosisCodeID.diagnosisCodeID)
      : null;
    !isNullOrUndefined(source.classificationID)
      ? (source.classificationID = source.classificationID.classificationID)
      : null;
    source.beginDate = this._localValues.stringFormatDatetime(
      Date.parse(source.beginDate)
    );
    source.endDate = this._localValues.stringFormatDatetime(
      Date.parse(source.endDate)
    );
    source.referralID =
      parseInt(localStorage.getItem("referralId")) - this._opencard.getHasKey();
    if (!isNullOrUndefined(source.progressNoteDiagnosisID)) {
      source["progressNoteDiagnosisID"] = source.progressNoteDiagnosisID;
    }

    const req = {
      progressNoteDiagnosis: source,
      progressNoteDiagnosisSpecifier: this
        .updatedProgressNoteDiagnosisSpecifier,
    };
    this._opencard.progressNoteDiagnosis(req).then((data: any) => {
      swal("Success", "Record has been saved!", "success");
      loader.style.display = "none";
      this.deleteSevi();
      this.progressNoteDiagnosisSummary();
      // this.progressNoteDiagnosis.progressNoteDiagnosisID = '';
      // this.updatedProgressNoteDiagnosisSpecifier = [];
      // this.progressNoteDiagnosis.clientID = '';
      // this.progressNoteDiagnosis.beginDate = '';
      // this.progressNoteDiagnosis.endDate = '';
      // this.progressNoteDiagnosis.isPrimary = false;
      // this.progressNoteDiagnosis.diagnosisCodeID = '';
      // this.progressNoteDiagnosis.clarification = '';
      // this.progressNoteDiagnosis.classificationID = '';
      // this.progressNoteDiagnosis.progressNoteDiagnosisID = '';
      // this.updatedVal = [];
      // this.updatedProgressNoteDiagnosisSpecifier = [];
    });
    // }
  }
  deleteSevi() {
    const dataDeletIDS = getUnique(this.seviRemoVId);
    const ids = dataDeletIDS.filter(function (el) {
      return el != null;
    });
    const req_Dara = {
      progressNoteDiagnosisSpecifier: {
        progressNoteDiagnosisSpecifierID: ids,
      },
    };
    if (ids.length > 0) {
      this._opencard.deleteSevirty(req_Dara).then((data) => {
        console.log("Deleted");
      });
    }
  }
  getprogressDiagnosis() {
    const loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    const req = {
      progressNoteDiagnosisID: 100008,
    };
    this._opencard.getProgressNoteDiagnosis(req).then((data: any) => {
      !isNullOrUndefined(data.progressNoteDiagnosis.clientID)
        ? (data.progressNoteDiagnosis.clientID["clientName"] =
            data.progressNoteDiagnosis.clientID.clientNameLastFirst)
        : null;
      !isNullOrUndefined(data.progressNoteDiagnosis.diagnosisCodeID)
        ? (data.progressNoteDiagnosis.diagnosisCodeID = {
            diagnosisCodeDescription:
              data.progressNoteDiagnosis.diagnosisCodeID.diagnosisCode +
              "-" +
              data.progressNoteDiagnosis.diagnosisCodeID.description,
            description: data.progressNoteDiagnosis.diagnosisCodeID.description,
          })
        : null;
      !isNullOrUndefined(data.progressNoteDiagnosis.referralID)
        ? (data.progressNoteDiagnosis.referralID =
            data.progressNoteDiagnosis.referralID.referralID)
        : null;
      !isNullOrUndefined(data.progressNoteDiagnosis.beginDate)
        ? (data.progressNoteDiagnosis.beginDate = moment
            .utc(data.progressNoteDiagnosis.beginDate)
            .format("MM/DD/YYYY HH:mm"))
        : null;
      !isNullOrUndefined(data.progressNoteDiagnosis.endDate)
        ? (data.progressNoteDiagnosis.endDate = moment
            .utc(data.progressNoteDiagnosis.endDate)
            .format("MM/DD/YYYY HH:mm"))
        : null;
      this.progressNoteDiagnosis = data.progressNoteDiagnosis;
      this.progressNoteDiagnosis.isCode = "code";
      const loader = document.getElementById("loading-overlay") as HTMLElement;
      loader.style.display = "none";
    });
  }
  progressNoteDiagnosisSummary() {
    const req = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
      beginPagination: 1,
      endPagination: 100,
    };
    this._opencard.getProgressNoteDiagnosisSummary(req).then((data: any) => {
      this.columnNames = data.dataTypes;
      this.columnNames.push({
        COLUMN_NAME: "Action",
      });
      data.ProgressNoteDiagnosis.map((item) => {
        if (item.isActive) {
          !isNullOrUndefined(item.beginDate)
            ? (item.beginDate = moment(item.beginDate).format(
                "MM/DD/YYYY HH:mm"
              ))
            : null;
          !isNullOrUndefined(item.endDate)
            ? (item.endDate = moment(item.endDate).format("MM/DD/YYYY HH:mm"))
            : null;
          !isNullOrUndefined(item.dob)
            ? (item.dob = moment(item.dob).format("MM/DD/YYYY HH:mm"))
            : null;
        } else {
          !isNullOrUndefined(item.beginDate)
            ? (item.beginDate = moment
                .utc(item.beginDate)
                .format("MM/DD/YYYY HH:mm"))
            : null;
          !isNullOrUndefined(item.endDate)
            ? (item.endDate = moment
                .utc(item.endDate)
                .format("MM/DD/YYYY HH:mm"))
            : null;
          !isNullOrUndefined(item.dob)
            ? (item.dob = moment.utc(item.dob).format("MM/DD/YYYY HH:mm"))
            : null;
        }
      });

      this.diagnosisList = data.ProgressNoteDiagnosis;
    });
  }
  viewDiagnosis(data, i) {
    this.seleceSpec = [];
    this.updatedProgressNoteDiagnosisSpecifier = [];
    this.updatedVal = [];
    this.updatedVal_spec = [];
    this.seviRemoVId = [];
    const req = {
      progressNoteDiagnosisID: data.progressNoteDiagnosisID,
    };
    this._opencard.getProgressNoteDiagnosis(req).then((data: any) => {
      console.log(">>>>", data);
      // this.getSpecifiers(data.progressNoteDiagnosis.diagnosisCodeID);

      const req = {
        diagnosisCodeID:
          data.progressNoteDiagnosis.diagnosisCodeID.diagnosisCodeID,
      };
      this._caseTeam.getDiagnosisCodeSpecifierSeverity(req).then((data_res) => {
        const tempArr = data_res.diagnosisCodeSpecifierSeverity;
        const groupValues = tempArr.reduce((obj, item) => {
          obj[item.specifierID.specifier] =
            obj[item.specifierID.specifier] || [];
          obj[item.specifierID.specifier].push({
            severity: item.severityID.severity,
            severityID: item.severityID.severityID,
            specifierID: item.specifierID.specifierID,
            randomKey: shuffle(),
          });
          return obj;
        }, {});

        this.updatedVal = Object.keys(groupValues).map((key) => {
          return { specifier: key, severity: groupValues[key] };
        });

        console.log("this.updatedVal>>>>", JSON.stringify(this.updatedVal));

        //////
        !isNullOrUndefined(data.progressNoteDiagnosis.clientID)
          ? (data.progressNoteDiagnosis.clientID["clientName"] =
              data.progressNoteDiagnosis.clientID.clientNameLastFirst)
          : null;
        !isNullOrUndefined(data.progressNoteDiagnosis.diagnosisCodeID)
          ? (data.progressNoteDiagnosis.diagnosisCodeID = {
              diagnosisCodeDescription:
                data.progressNoteDiagnosis.diagnosisCodeID.diagnosisCode +
                "-" +
                data.progressNoteDiagnosis.diagnosisCodeID.description,
              description:
                data.progressNoteDiagnosis.diagnosisCodeID.description,
              classificationID:
                data.progressNoteDiagnosis.diagnosisCodeID.classificationID,
            })
          : null;
        if (data.progressNoteDiagnosis.isActive) {
          !isNullOrUndefined(data.progressNoteDiagnosis.beginDate)
            ? (data.progressNoteDiagnosis.beginDate = moment(
                data.progressNoteDiagnosis.beginDate
              ).format("MM/DD/YYYY HH:mm"))
            : null;
          !isNullOrUndefined(data.progressNoteDiagnosis.endDate)
            ? (data.progressNoteDiagnosis.endDate = moment(
                data.progressNoteDiagnosis.endDate
              ).format("MM/DD/YYYY HH:mm"))
            : null;
        } else {
          !isNullOrUndefined(data.progressNoteDiagnosis.beginDate)
            ? (data.progressNoteDiagnosis.beginDate = moment
                .utc(data.progressNoteDiagnosis.beginDate)
                .format("MM/DD/YYYY HH:mm"))
            : null;
          !isNullOrUndefined(data.progressNoteDiagnosis.endDate)
            ? (data.progressNoteDiagnosis.endDate = moment
                .utc(data.progressNoteDiagnosis.endDate)
                .format("MM/DD/YYYY HH:mm"))
            : null;
        }
        !isNullOrUndefined(data.progressNoteDiagnosis.referralID)
          ? (data.progressNoteDiagnosis.referralID =
              data.progressNoteDiagnosis.referralID.referralID)
          : null;
        // !isNullOrUndefined(data.progressNoteDiagnosis.diagnosisCodeID) ? data.progressNoteDiagnosis.classificationID = data.progressNoteDiagnosis.diagnosisCodeID.classificationID : null;
        !isNullOrUndefined(
          data.progressNoteDiagnosis.diagnosisCodeID.classificationID
        )
          ? (data.progressNoteDiagnosis.classificationID =
              data.progressNoteDiagnosis.diagnosisCodeID.classificationID)
          : null;
        this.progressNoteDiagnosis = data.progressNoteDiagnosis;
        this.progressNoteDiagnosis.isCode = "code";
        this.showDiagnosis = true;

        ////

        const tempArr_spec = data.progressNoteDiagnosisSpecifier;
        const groupValues_spec = tempArr_spec.reduce((obj, item) => {
          obj[item.specifierID.specifier] =
            obj[item.specifierID.specifier] || [];
          obj[item.specifierID.specifier].push({
            severity: item.severityID.severity,
            severityID: item.severityID.severityID,
            specifierID: item.specifierID.specifierID,
            randomKey: shuffle(),
            progressNoteDiagnosisSpecifierID:
              item.progressNoteDiagnosisSpecifierID,
          });
          return obj;
        }, {});

        this.updatedVal_spec = Object.keys(groupValues_spec).map((key) => {
          return { specifier: key, severity: groupValues_spec[key] };
        });
        this.updatedVal.map((ele, ky) => {
          this.updatedVal_spec.map((els) => {
            if (ele.specifier === els.specifier) {
              ele.severity.map((elsvi, key1) => {
                els.severity.map((elsvid) => {
                  if (elsvi.severityID === elsvid.severityID) {
                    elsvi["progressNoteDiagnosisSpecifierID"] =
                      elsvid.progressNoteDiagnosisSpecifierID;
                    this.seleceSpec[
                      elsvid.severityID +
                        elsvid.specifierID +
                        key1 +
                        ky +
                        elsvi.randomKey
                    ] = elsvid.severityID;
                  }
                });
              });
            }
          });
        });
      });
      console.log(
        "this.updatedVal_spec>>>>",
        JSON.stringify(this.updatedVal_spec)
      );
    });
  }
  showDiagnosisCode() {
    this.showDiagnosis = true;
    this.progressNoteDiagnosis.clientID = "";
    this.progressNoteDiagnosis.beginDate = "";
    this.progressNoteDiagnosis.endDate = "";
    this.progressNoteDiagnosis.isPrimary = false;
    this.progressNoteDiagnosis.diagnosisCodeID = "";
    this.progressNoteDiagnosis.clarification = "";
    this.progressNoteDiagnosis.classificationID = "";
    this.progressNoteDiagnosis.progressNoteDiagnosisID = null;
    delete this.progressNoteDiagnosis.progressNoteDiagnosisID;
    this.updatedVal = [];
    this.updatedVal_spec = [];
    this.updatedProgressNoteDiagnosisSpecifier = [];
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = e.target.scrollHeight + 25 + "px";
  }

  rowMethod(event) {
    if (!isNullOrUndefined(event)) {
      const singleNewLineCount = this._opencard.search_word(event, "\n");
      const doubleNewLineCount = this._opencard.search_word(event, "\n\n");
      return Math.ceil(
        event.length / 90 + (singleNewLineCount - doubleNewLineCount)
      );
    } else {
      return 3;
    }
  }

  async printForm() {
    const element = document.getElementById("print-content");
    const opt = {
      margin: 1,
      filename: "ProgressNotes",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
      pagebreak: { mode: "avoid-all", before: "#page2el" },
    };
    await html2pdf().from(element).set(opt).save();
    this.isProgressNotesPrintable = false;
  }

  async getPreviousGoalInformation() {
    const previousGoalInfoReq = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
      clientID:
        parseInt(localStorage.getItem("clientId")) - this._opencard.getHasKey(),
    };
    this.progressNote.objectiveAddressed = await this._opencard.progressNotePreviousGoalInformation(
      previousGoalInfoReq
    );
  }

  public logicalValidator() {
    if (
      this.validationSection1ProgressType() &&
      this.validationSection2DiagnosisList() &&
      this.validationSection2CheckForPrincipalDiagnosis() &&
      this.validationSection3MedicalNecessity() &&
      this.validationSection3MentalStatus() &&
      this.validationSection3DangerToSelfOthers()
    ) {
      return true;
    } else {
      return false;
    }
  }

  public validationSection1ProgressType(): boolean {
    if (this.progressNote.isFaceToFace !== false) {
      return true;
    } else {
      this.validatorMessage =
        "<p>Please select Face to Face or Telemedicine</p>";
      return false;
    }
  }

  public validationSection2DiagnosisList(): boolean {
    if (this.diagnosisList.length > 0) {
      return true;
    } else {
      this.validatorMessage = "<p>Dignosis code should not be empty!</p>";
      return false;
    }
  }

  public validationSection2CheckForPrincipalDiagnosis(): boolean {
    let valiadtionResult = false;
    if (this.validationSection2DiagnosisList()) {
      if (
        this.diagnosisList.filter((item) => item.IsPrimary === true).length > 0
      ) {
        valiadtionResult = true;
      } else {
        this.validatorMessage =
          "<p>You must enter atleast one principal diagnosis!</p>";
        valiadtionResult = false;
      }
      return valiadtionResult;
    }
  }

  //   public validationSection2PrincipalDignosisBeginDate(): boolean {
  //     if (
  //       new Date(this.progressNoteDiagnosis.beginDate).getTime() <=
  //       new Date(this.progressNote.beginDate).getTime()
  //     ) {
  //       return true;
  //     } else {
  //       swal(
  //         "Info",
  //         "You must enter a principal diagonsis code with a begin date <= begin date of the progress note!",
  //         "info"
  //       );
  //       return false;
  //     }
  //   }

  public validationSection3MedicalNecessity(): boolean {
    if (this.selectedMedicationId.length > 0) {
      return true;
    } else {
      this.validatorMessage =
        "<p>You must enter atleast one Meets medical necessity!</p>";
      return false;
    }
  }

  public validationSection3MentalStatus(): boolean {
    if (
      this.mentalStatusAffectList.length === 0 &&
      this.mentalStatusCognitiveProcessesList.length === 0 &&
      this.mentalStatusDangerList.length === 0 &&
      this.mentalStatusCurrentImpairmentList.length === 0 &&
      this.mentalStatusMoodList.length === 0
    ) {
      this.validatorMessage =
        "<p>You must enter atleast one Mental status!</p>";
      return false;
    } else {
      return true;
    }
  }

  public validationSection3DangerToSelfOthers(): boolean {
    if (this.mentalStatusDangerList.length > 0) {
      return true;
    } else {
      this.validatorMessage =
        "<p>You must enter atleast one Mental status in a Danger to self/others!</p>";
      return false;
    }
  }

  async onExportProgressNote(progressNoteId: any) {
    let request = {
      progressNoteID: progressNoteId,
      referralTypeID:
        parseInt(localStorage.getItem("referralTypeId")) -
        this._opencard.getHasKey(),
    };
    let response = await this._opencard.exportProgressNotePrintForm(request);
    if (response.responseStatus) {
      return window.open(
        `${environment.uri}:8081/loadDocument/${response.cMSPDFDocID}`,
        "_blank",
        "width=600,height=600,toolbar=no,titlebar=no"
      );
    } else {
      return swal("Info", response.responseMessage, "info");
    }
  }

  async onExportEncounterForm(progressNotedId: any) {
    let request = {
      progressNoteID: progressNotedId,
      diagnosisSpecifierSeverity: true,
    };
    let response = await this._opencard.exportEncounterPrintForm(request);
    if (response.responseStatus) {
      return window.open(
        `${environment.uri}:8081/loadDocument/${response.cMSPDFDocID}`,
        "_blank",
        "width=600,height=600,toolbar=no,titlebar=no"
      );
    } else {
      return swal("Info", response.responseMessage, "info");
    }
  }

  async onSendEmail(progressNotedId: any) {
    let request = {
      progressNoteID: progressNotedId,
    };
    let response = await this._opencard.progressNoteAndEncounterEmail(request);
    return swal("Info", response.responseMessage, "info");
  }

  async autoFecthTherapyTypeForNewForm() {
    let autoFetchRequest = {
      referralID:
        parseInt(localStorage.getItem("referralId")) -
        this._opencard.getHasKey(),
      therapist_StaffID: parseInt(localStorage.getItem("UseId")) || 1440,
      caseActivityID: parseInt(localStorage.getItem("CisCaseActivityId")),
      encounterFormTypeID: null,
    };
    let response = await this._opencard.getProgressNoteAutoFetchValues(
      autoFetchRequest
    );
    this.progressNote.therapyTypeID = {
      therapyType: response.therapyType.TherapyType,
      therapyTypeID: response.therapyType.TherapyTypeID,
    };
  }

  public onChangeLastAppointmentCheckbox(event: any) {
    if (event) {
      this.isLastAppointmentRequired = false;
      this.progressNoteForm.controls["nextAppointmentDate"].setValidators([
        Validators.required,
      ]);
      this.progressNoteForm.get("nextAppointmentDate").clearValidators();
      return this.progressNoteForm.controls[
        "nextAppointmentDate"
      ].updateValueAndValidity();
    } else {
      this.isLastAppointmentRequired = true;
      this.progressNoteForm.controls["nextAppointmentDate"].setValidators([
        Validators.required,
      ]);
      return this.progressNoteForm.controls[
        "nextAppointmentDate"
      ].updateValueAndValidity();
    }
  }
}
function diff(start, end) {
  start = start.split(":");
  end = end.split(":");
  const startDate = new Date(0, 0, 0, start[0], start[1], 0);
  const endDate = new Date(0, 0, 0, end[0], end[1], 0);
  let diff = endDate.getTime() - startDate.getTime();
  // var diff = startDate.getTime() - endDate.getTime();
  const hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / 1000 / 60);
  // return hours + ":" + minutes;

  return (
    (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes
  );
}
function getUnique(array) {
  const uniqueArray = [];
  let i;
  // Loop through array values
  for (i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
}

function shuffle() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x1000);
  }
  return s4() + s4();
}
