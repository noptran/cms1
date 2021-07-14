import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";

import { OpencardsService } from "../../../opecards-list-view/opencards.service";

import { PRTFComponetClass } from "./prtf.class";
import {LocalValues} from "../../../local-values";

import { SharedFamilyMemberComponent } from "../Family members/shared-family-member.component";

import { SharedFamilyMember } from "../Family members/shared-family-member";

import { SharedCaseTeamComponent } from "../Case Team/shared-case-team.component";

import { SharedCaseTeam } from "../Case Team/shared-case-team";

import { SharedTreatmentDecisionComponent } from "../Treatment decisions/treatment.component";

import { SharedTreatment } from "../Treatment decisions/tratment";

import { SharedSchool } from "../School/shared-school";

import { SharedSchoolComponent } from "../School/shared-school.component";

import { sharedMedications } from "../Medications/shared-medications";

import { SharedMedicationsComponent } from "../Medications/shared-medications.component";

import { SharedAllergiesComponent } from "../Medications/Allergies/shared-allergies.component";

import { SharedAllergies } from "../Medications/Allergies/shared-allergies";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { MessageService, MenuItem } from "primeng/api";

import { ManualAttachmentDoc } from "../../../cms-attachment-form/manual-attachment-doc-types";

import { Router } from "@angular/router";

import { FormFooterComponent } from "../../../form-footer/form-footer.component";

import { CaseTeamComponent } from "../../../case-team/case-team.component";

import { CaseTeam } from "../../../case-team/case-team";

import { AssessmentFpFormComponent } from "../../../family-preservation-list/forms/assessment-fp-form/assessment-fp-form.component";

import { FpAssessments } from "../../../family-preservation-list/forms/assessment-fp-form/fp-assessments";

import { CaseFileActivityComponent } from "../../../case-file-activity/case-file-activity.component";

import { CaseFileActivity } from "../../../case-file-activity/case-file-activity";

import { AttendingSchoolComponent } from "../../../attending-school/attending-school.component";

import { AttendingSchool } from "../../../attending-school/attending-school";

import { HomeSchoolComponent } from "../../../home-school/home-school.component";

import { HomeSchool } from "../../../home-school/home-school";

import { AppointmentsComponent } from "../../../appointments/appointments.component";

import { Appointments } from "../../../appointments/appointments";

import { CourtOrderComponent } from "../../../court-order/court-order.component";

import { CourtOrder } from "../../../court-order/court-order";

import { ExtendedFamilyFpFormComponent } from "../../../family-preservation-list/forms/extended-family-fp-form/extended-family-fp-form.component";

import { FpExtendedFamily } from "../../../family-preservation-list/forms/extended-family-fp-form/fp-extended-family";

import { SiblingsInoutHomeComponent } from "../../../siblings-inout-home/siblings-inout-home.component";

import { Sioh } from "../../../siblings-inout-home/sioh";

import { isNullOrUndefined } from "util";

import { CaseEvaluationsFpFormComponent } from "../../../family-preservation-list/forms/case-evaluations-fp-form/case-evaluations-fp-form.component";

import {
  CaseEvaluations,
  EvalutionScore,
} from "../../../family-preservation-list/forms/case-evaluations-fp-form//case-evaluations";

@Component({
  selector: "app-prtf-referral",
  templateUrl: "./prtf.component.html",
  styleUrls: ["./prtf.component.scss"],
  inputs: ["isPopUpWindow"],
  outputs: ["save", "update"],
})
export class PRTFComponent implements OnInit {
  prtfDomain: PRTFComponetClass = new PRTFComponetClass();
  prtfClientInfo: any;
  clientID: number;
  referralID: number;
  currentDateandTimeString: string;
  clientInformation: any;
  isEditClient = false;
  metaData = [];
  youthInfo = this.prtfDomain.youthAdditionalInfo;
  listOfFamilyMembers = [];
  selectedFamilyMemberRowID: number;
  listOfCaseTeam = [];
  socialWorkerField: string;
  referralInfo = this.prtfDomain.referralInfo;
  listOfTreatmentDecisions = [];
  listOfSchools = [];
  public isEdit = false;
  listOfSiblingInOOH = [];
  listOfMedications = [];
  listOfAllergies = [];
  public prtfForm: FormGroup;
  public msgs: string;
  isMedications = false;
  isHealthExam: boolean;
  isProgressReport: boolean;

  @Output() save = new EventEmitter();

  @Output() update = new EventEmitter();

  @ViewChild(SharedFamilyMemberComponent, { static: true })
  familyMemberComponet: SharedFamilyMemberComponent;

  @ViewChild(SharedCaseTeamComponent, { static: true })
  caseTeamComponent: SharedCaseTeamComponent;

  @ViewChild(SharedTreatmentDecisionComponent, { static: true })
  treatmentComponent: SharedTreatmentDecisionComponent;

  @ViewChild(SharedSchoolComponent, { static: true }) schoolComponent: SharedSchoolComponent;

  @ViewChild(SharedMedicationsComponent, { static: true })
  medicationComponent: SharedMedicationsComponent;

  @ViewChild(SharedAllergiesComponent, { static: true })
  allergiesComponent: SharedAllergiesComponent;

  @ViewChild(FormFooterComponent, { static: true }) formFooterComponent: FormFooterComponent;

  @ViewChild(CaseTeamComponent, { static: true }) coreCaseTeamComponent: CaseTeamComponent;

  @ViewChild(AssessmentFpFormComponent, { static: true })
  assessmentComponent: AssessmentFpFormComponent;

  @ViewChild(CaseFileActivityComponent, { static: true })
  caseFileActivityComponent: CaseFileActivityComponent;

  @ViewChild(AttendingSchoolComponent, { static: true })
  attendingSchoolComponent: AttendingSchoolComponent;

  @ViewChild(HomeSchoolComponent, { static: true }) homeSchoolComponent: HomeSchoolComponent;

  @ViewChild(AppointmentsComponent, { static: true })
  appointmentsComponent: AppointmentsComponent;

  @ViewChild(CourtOrderComponent, { static: true }) courtOrderComponent: CourtOrderComponent;

  @ViewChild(ExtendedFamilyFpFormComponent, { static: true })
  extendedFamilyComponent: ExtendedFamilyFpFormComponent;

  @ViewChild(SiblingsInoutHomeComponent, { static: true })
  siblingFamilyComponent: SiblingsInoutHomeComponent;

  @ViewChild(CaseEvaluationsFpFormComponent, { static: true })
  caseEvaluationComponent: CaseEvaluationsFpFormComponent;

  @Input() isPopUpWindow = false;

  deleteRequest: any;

  nodeSelected: string;
  public schoolMenuItems: MenuItem[];

  public isFamilyMemberForm = false;
  public isMedicationsForm = false;
  public isAllergiesForm = false;
  public isCaseTeamForm = false;
  public isTreatmentDecisionsForm = false;
  public isSchoolForm = false;
  public isPopUp = true;
  public isCoreCaseTeam = false;
  public isAssessments = false;
  public isCaseFileActivity = false;
  public isAttendingSchool = false;
  public isHomeSchool = false;
  public isAppointments = false;
  public isCourtOrder = false;
  public isExtendedFamily = false;
  public isSiblingInOutFamily = false;
  public isCaseEvaluation = false;

  constructor(
    public _openCard: OpencardsService,
    public _localValues: LocalValues,
    public _fb: FormBuilder,
    public _msg: MessageService,
    public _router: Router
  ) {}

  ngOnInit() {
    this.prtfFormValidation();

    this.setCurrentDateandTimeString();

    this.setClientlID();

    this.listSchoolMenuItems();
  }

  setCurrentDateandTimeString = () => {
    return (this.currentDateandTimeString = this._localValues.stringFormatDatetime(
      new Date().getTime()
    ));
  };

  async getAutofetchInformation() {
    let request = {
      clientID: this.clientID,
      referralID: this.referralID,
    };

    let response = await this._openCard.getPRTFAutoFetchInformation(request);
    this.clientInformation = this.prtfDomain.getClientInformation(
      response.clientInfo
    );

    this.deleteRequest = {
      referralID: this.referralID,
    };
    !isNullOrUndefined(response.referralInfo)
      ? (this.youthInfo = response.referralInfo)
      : null;
    !isNullOrUndefined(response.referralInfo.Height)
      ? (this.youthInfo.height = response.referralInfo.Height)
      : null;
    !isNullOrUndefined(response.referralInfo.Weight)
      ? (this.youthInfo.weight = response.referralInfo.Weight)
      : null;
    !isNullOrUndefined(response.clientMedicalConditionsList)
      ? (this.referralInfo.medicalConditions =
          response.clientMedicalConditionsList.medicalConditions)
      : null;
    !isNullOrUndefined(response.clientInfo.payorSource)
      ? (this.referralInfo.payorSource = response.clientInfo.payorSource)
      : null;
    !isNullOrUndefined(response.payorDetails)
      ? (this.referralInfo.payorID = response.payorDetails)
      : null;

    if (
      response.clientInfo.payorPersonAssignmentTypeID === 15 ||
      response.clientInfo.payorPersonAssignmentTypeID === 2
    ) {
      !isNullOrUndefined(response.clientInfo.payorPersonID)
        ? (this.referralInfo.payor_personID = response.clientInfo.payorPersonID)
        : null;
    }

    // !isNullOrUndefined(response.medicalAssessment.referralID.closureReasonID) ? this.youthInfo.dischargeReasonID = response.medicalAssessment.referralID.closureReasonID : null;
    !isNullOrUndefined(response.referralInfo.referralDate)
      ? (this.referralInfo.beginDate = new Date(
          response.referralInfo.referralDate
        ))
      : null;
    !isNullOrUndefined(response.referralInfo.dischargeDate)
      ? (this.youthInfo.dischargeDate = new Date(
          response.referralInfo.dischargeDate
        ))
      : null;
    !isNullOrUndefined(response.clientAllergies.allergies)
      ? (this.referralInfo.clientAllergiesID =
          response.clientAllergies.allergies)
      : null;
    return;
  }

  setClientlID = () => {
    return (this.clientID =
      parseInt(localStorage.getItem("clientId")) - this._openCard.getHasKey());
  };

  async initialTriggerForReferralCreation() {
    let request = {
      referralTypeID: 14,
      beginDate: this.currentDateandTimeString,
      openReferralID: null,
    };

    this.referralID = await this._openCard.initalPRTFReferralCreation(request);
    localStorage.setItem(
      "referralId",
      (this.referralID + this._openCard.getHasKey()).toString()
    );
    this.getAutofetchInformation();
    this.getListOfSiblingdInOOH();
    return;
  }

  onGetUpdateClientDetails(event: any) {
    this.clientInformation = this.prtfDomain.setClientInformation(
      event.clientDetails
    );
    this.isEditClient = event.isFormClose;
    return;
  }

  async onFilterDischargecode(event: any) {
    let request = {
      beginDate: this.currentDateandTimeString,
    };

    let response = await this._openCard.getPRTFDischargecode(request);

    this.metaData = response.filter((item: any) => {
      return item.closureReason.toLowerCase().indexOf(event.query) !== -1;
    });
    return;
  }

  getListOfFamilyMembers = (event: any) => {
    return (this.listOfFamilyMembers =
      event.list.length > 0 ? event.list : null);
  };

  listAdd(list: string) {
    if (list === "familyMember") {
      this.familyMemberComponet.familyMember = new SharedFamilyMember();
    } else if (list === "caseTeam") {
      this.caseTeamComponent.caseTeam = new SharedCaseTeam();
    } else if (list === "treatmentDecisons") {
      this.treatmentComponent.treatment = new SharedTreatment();
    } else if (list === "school") {
      this.schoolComponent.school = new SharedSchool();
    } else if (list === "medications") {
      this.medicationComponent.medications = new sharedMedications();
    } else if (list === "allergies") {
      this.allergiesComponent.allergies = new SharedAllergies();
    } else {
      return;
    }
  }

  async listviewEdit(list: string, rowData: any) {
    if (list == "familyMember") {
      this.isFamilyMemberForm = true;
      this.familyMemberComponet.getSelectedFamilyMemberDetails(
        rowData.familyMemberReferralID
      );
    } else if (list == "caseTeam") {
      this.isCaseTeamForm = true;
      this.caseTeamComponent.getSelectedCaseTeamData(rowData.caseTeamID);
    } else if (list == "treatmentDecisons") {
      this.isTreatmentDecisionsForm = true;
      this.treatmentComponent.getTreatmentDecsionsRecordById(
        rowData.treatmentDecisionsID
      );
    } else if (list === "school") {
      this.isSchoolForm = true;
      this.schoolComponent.getSchoolRecordByID(rowData.clientSchoolID);
    } else if (list === "medications") {
      this.isMedicationsForm = true;
      this.medicationComponent.getMedicationsRecord(rowData.clientMedicationID);
    } else if (list === "allergies") {
      this.isAllergiesForm = true;
      this.allergiesComponent.getAllergiesRecordById(rowData.clientAllergiesID);
    } else {
      return;
    }
  }

  listviewDelete(list: string, rowData: any) {
    if (list == "familyMember") {
      this.familyMemberComponet.delete(rowData.familyMemberReferralID);
    } else if (list == "caseTeam") {
      this.caseTeamComponent.onDelete();
    } else if (list == "treatmentDecisons") {
      this.treatmentComponent.onDelete(rowData.treatmentDecisionsID);
    } else if (list == "school") {
      this.schoolComponent.onDelete(rowData.clientSchoolID);
    } else if (list == "medications") {
      this.medicationComponent.onDelete(rowData.clientMedicationID);
    } else if (list == "allergies") {
      this.allergiesComponent.onDelete(rowData.clientAllergiesID);
    } else {
      return;
    }
  }

  listExport(list: string) {
    if (list == "familyMember") {
      this.familyMemberComponet.exportList();
    } else if (list == "siblingsInOOH") {
      this.exportSiblingsInOOHExport();
    } else if (list == "medications") {
      this.medicationComponent.exportList();
    } else if (list == "caseTeam") {
      this.exportCaseTeamExport();
    } else if (list == "treatmentDecisons") {
      this.exportTreatmentDecisionsExport();
    } else if (list == "school") {
      this.exportSchoolsExport();
    } else {
      return;
    }
  }

  getListOfCaseTeam = (event: any) => {
    return (this.listOfCaseTeam = event.list.length > 0 ? event.list : []);
  };

  async onFilterdAgencyName(event: any) {
    let response = await this._openCard.getPRTFAgencyNames();

    return (this.metaData = response.filter((item: any) => {
      return item.payorName.toLowerCase().indexOf(event.query) !== -1;
    }));
  }

  async onFilteredSocialWorker(event: any) {
    let response: any;

    if (this.prtfDomain.isPayorSourceCommunitySource) {
      response = await this._openCard.getPRTFCommunityMember();
      this.socialWorkerField = "Name";

      return (this.metaData = response.filter((item: any) => {
        return item.Name.toLowerCase().indexOf(event.query) !== -1;
      }));
    } else {
      response = await this._openCard.getPRTFStaff();
      this.socialWorkerField = "StaffName";

      return (this.metaData = response.filter((item: any) => {
        return item.StaffName.toLowerCase().indexOf(event.query) !== -1;
      }));
    }
  }

  getListOfTreatmentDecisions = (event: any) => {
    return (this.listOfTreatmentDecisions = event.list);
  };

  getListOfSchool = (event: any) => {
    return (this.listOfSchools = event.list);
  };

  onFormAction() {
    if (this.prtfForm.valid) {
      if (this.youthInfo.caseID) {
        return this.onUpdate();
      } else {
        return this.onSave();
      }
    } else {
      return this._msg.add({
        severity: "info",
        summary: "Invalid",
        detail: "Please fill the mandatory fields!",
      });
    }
  }

  async onSave() {
    let request = this.prtfDomain.prtfSave(this.youthInfo);
    request.referralInfo.clientID = this.clientID;
    request.referralInfo.referralID = this.referralID;
    await this._openCard.prtfSave(request);
    this.isPopUpWindow = false;

    this._msg.add({
      severity: "success",
      summary: "Saved!",
      detail: "The record has been saved!",
    });

    return this.save.emit({
      isSave: true,
    });
  }

  onGetReferralByID(selectedRowData: any) {
    this.isPopUpWindow = true;
    console.log("Get referral by id is triggered!", selectedRowData);

    if (selectedRowData.referralID) {
      this.referralID = selectedRowData.referralID;
      this.getAutofetchInformation();
      this.isEdit = true;
    }
  }

  editForm = () => {
    return (this.isEdit = false);
  };

  async onUpdate() {
    this.youthInfo["referralID"] = this.referralID;
    this.referralInfo["referralID"] = this.referralID;
    let request = this.prtfDomain.prtfUpdate(this.youthInfo, this.referralInfo);
    console.log(
      "The prtf update call triggered and request from comp!",
      request
    );
    await this._openCard.prtfUpdate(request);
    this.isPopUpWindow = false;

    this._msg.add({
      severity: "success",
      summary: "Updated!",
      detail: "The record has been updated!",
    });

    return this.update.emit({
      isUpdate: true,
    });
  }

  public async getListOfSiblingdInOOH() {
    let request = {
      clientID: this.clientID,
      referralID: this.referralID,
    };

    this.listOfSiblingInOOH = await this._openCard.listOfSiblingsInOutHomeOOH(
      request
    );
    return;
  }

  getListOfMedications = (event: any) => {
    return (this.listOfMedications = event.list.length > 0 ? event.list : null);
  };

  getListOfAllergies = (event: any) => {
    return (this.listOfAllergies = event.list.length > 0 ? event.list : null);
  };

  prtfFormValidation() {
    return (this.prtfForm = this._fb.group({
      beginDate: [null, Validators.compose([Validators.required])],
      dischargeReasonID: [null, Validators.compose([Validators.required])],
      medicalConditions: [null],
      dischargeDate: [null],
      dischargeTo: [null],
      height: [null],
      weight: [null],
      pRTF_HairColor: [null],
      pRTF_EyeColor: [null],
      pRTF_Complexion: [null],
      currentGrade: [null],
      pRTF_BirthPlace: [null],
      primaryLanguage: [null],
      pRTF_ChurchPreference: [null],
      isUSCitizen: [null],
      citizenship: [null],
      payorSource: [null],
      payorID: [null],
      payor_personID: [null],
      agencyName: [null],
      clientAllergiesID: [null],
    }));
  }

  async exportSiblingsInOOHExport() {
    let request = {
      clientID: this.clientID,
      referralID: this.referralID,
      beginPagination: 1,
      endPagination: 100,
      isExport: true,
    };

    let response = await this._openCard.exportSiblingInOOH(request);

    if (response.responseStatus) {
      window.open(response.filePath, "_blank");

      return this._msg.add({
        severity: "success",
        summary: "Exported!",
        detail: "The record has been exported!",
      });
    } else {
      return this._msg.add({
        severity: "success",
        summary: response.responseMessage,
        detail: response.messageDetails,
      });
    }
  }

  showMedicalAssessment = false;
  showMedicalTreatment = false;
  showMedicalCondition = false;
  showPrtfCard = false;
  cardName: any;

  async showNode(nodeName: any) {
    if (nodeName === "Medical Assesment") {
      this.showMedicalAssessment = true;
    } else if (nodeName === "Treatment Services") {
      this.showMedicalTreatment = true;
    } else if (nodeName === "Medical Condetion") {
      this.showMedicalCondition = true;
    } else if (nodeName === "Treatment Decision") {
      this.showPrtfCard = true;
      this.cardName = "TREATMENT DECISION";
    } else if (nodeName === "Health Exam") {
      this.showPrtfCard = true;
      this.cardName = "HEALTH EXAM";
    } else if (nodeName === "caseTeam") {
      this.isCoreCaseTeam = true;
      this.coreCaseTeamComponent.formValidation();
      this.coreCaseTeamComponent.caseTeam = new CaseTeam();
      this.coreCaseTeamComponent.editControll = false;
      this.coreCaseTeamComponent.getCaseTeamList();
      this.coreCaseTeamComponent.isList = true;
      this.coreCaseTeamComponent.isForm = false;
      this.coreCaseTeamComponent.isAppHeader = false;
    } else if (nodeName === "assessment") {
      this.isAssessments = true;
      this.assessmentComponent.formValidation();
      this.assessmentComponent.isAppHeader = false;
      this.assessmentComponent.fpassess = new FpAssessments();
      this.assessmentComponent.getAssessmentList();
      this.assessmentComponent.isList = true;
      this.assessmentComponent.isForm = false;
      this.assessmentComponent.editControll = false;
    } else if (nodeName === "caseFileActivity") {
      this.isCaseFileActivity = true;
      this.caseFileActivityComponent.formValidation();
      this.caseFileActivityComponent.isAppHeader = false;
      this.caseFileActivityComponent.caseFile = new CaseFileActivity();
      this.caseFileActivityComponent.getCaseFileActivityList();
      this.caseFileActivityComponent.isList = true;
      this.caseFileActivityComponent.isForm = false;
      this.caseFileActivityComponent.isEdit = false;
    } else if (nodeName === "appointments") {
      this.isAppointments = true;
      this.appointmentsComponent.formValidation();
      this.appointmentsComponent.isAppHeader = false;
      this.appointmentsComponent.appointment = new Appointments();
      this.appointmentsComponent.getAppointmentsList();
      this.appointmentsComponent.isList = true;
      this.appointmentsComponent.isForm = false;
      this.appointmentsComponent.isEdit = false;
      this.appointmentsComponent.isPopup = true;
    } else if (nodeName === "courtOrder") {
      this.isCourtOrder = true;
      this.courtOrderComponent.formValidation();
      this.courtOrderComponent.courtOrder = new CourtOrder();
      this.courtOrderComponent.isEdit = false;
      this.courtOrderComponent.getCourtOrderList();
      this.courtOrderComponent.isList = true;
      this.courtOrderComponent.isForm = false;
      this.courtOrderComponent.isAppHeader = false;
      this.courtOrderComponent.isPopup = true;
    } else if (nodeName === "extendedFamily") {
      this.isExtendedFamily = true;
      this.extendedFamilyComponent.formValidation();
      this.extendedFamilyComponent.fpExtendedFamily = new FpExtendedFamily();
      this.extendedFamilyComponent.editControll = false;
      this.extendedFamilyComponent.getFamilyList();
      this.extendedFamilyComponent.isList = true;
      this.extendedFamilyComponent.isForm = false;
      this.extendedFamilyComponent.isAppHeader = false;
    } else if (nodeName === "siblingInFamily") {
      this.isSiblingInOutFamily = true;
      this.siblingFamilyComponent.formValiadtion();
      this.siblingFamilyComponent.sioh = new Sioh();
      this.siblingFamilyComponent.editControll = false;
      this.siblingFamilyComponent.isList = true;
      this.siblingFamilyComponent.isForm = false;
      this.siblingFamilyComponent.isAppHeader = false;
    } else if (nodeName === "caseEvaluation") {
      this.isCaseEvaluation = true;
      this.caseEvaluationComponent.formValidation();
      this.caseEvaluationComponent.caseEval = new CaseEvaluations();
      this.caseEvaluationComponent.evaluationScore = new EvalutionScore();
      this.caseEvaluationComponent.editControl = false;
      this.caseEvaluationComponent.isList = true;
      this.caseEvaluationComponent.isForm = false;
      this.caseEvaluationComponent.isAppHeader = false;
      this.caseEvaluationComponent.getEvaluationType();
      this.caseEvaluationComponent.getCaseEvaluationList();
      // this.caseEvaluationComponent.isList = true;
      // this.caseEvaluationComponent.isForm = false;
      // this.caseEvaluationComponent.isAppHeader = false;
    } else {
      return;
    }
  }

  closeModelComp(event, type) {
    console.log("event>>>>>>>", event);

    if (type === "Medical Assesment") {
      this.showMedicalAssessment = false;
    } else if (type === "Treatment Services") {
      this.showMedicalTreatment = false;
    } else if (type === "Medical Condetion") {
      this.showMedicalCondition = false;
    } else if (type === "PRTF Card") {
      this.showPrtfCard = false;
    }
  }

  async exportCaseTeamExport() {
    let request = {
      referralID: this.referralID,
      beginPagination: 1,
      endPagination: 100,
      isExport: true,
    };

    let response = await this._openCard.exportPRTFCaseTeam(request);

    if (response.responseStatus) {
      window.open(response.filePath, "_blank");

      return this._msg.add({
        severity: "success",
        summary: "Exported!",
        detail: "The record has been exported!",
      });
    } else {
      return this._msg.add({
        severity: "success",
        summary: response.responseMessage,
        detail: response.messageDetails,
      });
    }
  }

  async exportTreatmentDecisionsExport() {
    let request = {
      referralID: this.referralID,
      beginPagination: 1,
      endPagination: 100,
      isExport: true,
    };

    let response = await this._openCard.exportPRTFTreatmentDecision(request);

    if (response.responseStatus) {
      window.open(response.filePath, "_blank");

      return this._msg.add({
        severity: "success",
        summary: "Exported!",
        detail: "The record has been exported!",
      });
    } else {
      return this._msg.add({
        severity: "success",
        summary: response.responseMessage,
        detail: response.messageDetails,
      });
    }
  }

  async exportSchoolsExport() {
    let request = {
      referralID: this.referralID,
      beginPagination: 1,
      endPagination: 100,
      isExport: true,
    };

    let response = await this._openCard.exportPRTFTreatmentDecision(request);

    if (response.responseStatus) {
      window.open(response.filePath, "_blank");

      return this._msg.add({
        severity: "success",
        summary: "Exported!",
        detail: "The record has been exported!",
      });
    } else {
      return this._msg.add({
        severity: "success",
        summary: response.responseMessage,
        detail: response.messageDetails,
      });
    }
  }

  onCloseModel() {
    this.nodeSelected = "none";
  }

  onClickCancel() {
    this.isPopUpWindow = false;
    return (this.prtfDomain = new PRTFComponetClass());
  }

  listSchoolMenuItems() {
    this.schoolMenuItems = [
      {
        label: "Attending School",
        command: () => {
          this.attendingSchoolOpencards();
        },
      },

      {
        label: "Home School",
        command: () => {
          this.homeSchoolOpencards();
        },
      },
    ];
  }

  attendingSchoolOpencards() {
    this.isAttendingSchool = true;
    this.attendingSchoolComponent.formValidation();
    this.attendingSchoolComponent.isAppHeader = false;
    this.attendingSchoolComponent.getAttendingSchoolList();
    this.attendingSchoolComponent.isList = true;
    this.attendingSchoolComponent.isForm = false;
    this.attendingSchoolComponent.school = new AttendingSchool();
    this.attendingSchoolComponent.isEdit = false;
    return;
  }

  homeSchoolOpencards() {
    this.isHomeSchool = true;
    this.homeSchoolComponent.formValidation();
    this.homeSchoolComponent.isAppHeader = false;
    this.homeSchoolComponent.getHomeSchoolList();
    this.homeSchoolComponent.isList = true;
    this.homeSchoolComponent.isForm = false;
    this.homeSchoolComponent.homeSchool = new HomeSchool();
    this.homeSchoolComponent.isEdit = false;
    return;
  }

  closeCaseEvaluation() {
    this.isCaseEvaluation = false;
  }

  onReferralDelete(event) {
    console.log("event is indeleteis", event);
    this.isPopUpWindow = false;

    if (this.isMedications) {
      return (this.isMedications = false);
    }

    this.save.emit({
      isDeleted: true,
    });
  }
}
