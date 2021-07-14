import { Component, OnInit, ViewChild } from "@angular/core";
import { RfcReferral, RFCSpecialNeeds, Siblings } from "./rfc-referral";
import swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { OpencardsService } from "../../opecards-list-view/opencards.service";
import { isNullOrUndefined } from "util";
import { RfcReferralService } from "./rfc-referral.service";
import { CaseTeamService } from "../../case-team/case-team.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LocalValues } from "../../local-values";
import * as moment from "moment";
import { PersonMasterWizardsComponent } from "../../wizards/person-master/person-master-wizards.component";
import { DcfFormComponent } from "../../dcf-form/dcf-form.component";
import { PersonMasterWizards } from "../../wizards/person-master/person-master-wizards";
import { FamilMemberFormComponent } from "../../famil-member-form/famil-member-form.component";
import { StaffFormComponent } from "../../staff-form/staff-form.component";
import { Dcf } from "../../dcf-form/dcf";
import { FamilyMember } from "../../famil-member-form/family-member";
import { StaffForm } from "../../staff-form/staff-form";
import { ClildFormService } from "../../child-forms/child-forms.service";

declare var $: any;

@Component({
  selector: "app-rfc-referral",
  templateUrl: "./rfc-referral.component.html",
  styleUrls: ["./rfc-referral.component.scss"],
})
export class RfcReferralComponent implements OnInit {
  title = "Reintegration";
  quickMenu = "referrel";
  status = "draft";
  edit = false;
  formStatus = true;
  clientName: any;
  breadcrumbs = [];
  openCards = [];
  mainTabs = [];
  ri: RfcReferral = new RfcReferral();
  siblings: Siblings = new Siblings();
  listOfSiblings = [];
  metaData: any;
  sIndex = 0;
  ddOptions = [];
  filteredDDOptions = [];
  booleanYes = { view: 1, value: 1 };
  refcOpencards = [];
  iconurl =
    "https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/";
  opencardMasterLink = "reintegration/referral/opencard/";
  rfcForm: FormGroup;
  siblingsForm: FormGroup;
  kees: any;
  kaecses: any;
  discardTo = "/reports/opencards/list/client/case";
  riTemp: any;
  url: any;
  isFormView = false;
  isAttachmentRequired = false;
  @ViewChild(PersonMasterWizardsComponent, { static: false })
  personMasterWizardsComponent: PersonMasterWizardsComponent;
  public isDCFComponent = false;
  @ViewChild(DcfFormComponent, { static: false })
  dcfFormComponent: DcfFormComponent;
  @ViewChild(FamilMemberFormComponent, { static: false })
  familyMemberComponent: FamilMemberFormComponent;
  @ViewChild(StaffFormComponent, { static: false })
  staffFormComponent: StaffFormComponent;
  isFamilyMemberPromptEnabled = false;
  isFamilyMemberComponent = false;
  isStaffPromptEnabled = false;
  isStaffComponent = false;
  selectedDCFDropdownField: string;
  selectedFMDropdownField: string;

  isFormLog = false;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };

  yesObj = {
    yesNoPendingID: 1,
    yesNoPending: "Yes",
  };
  noObj = {
    yesNoPendingID: 2,
    yesNoPending: "No",
  };
  UnableToDetermineObj = {
    yesNoPendingID: 4,
    yesNoPending: "Unknown",
  };

  isSiblingsUpdateBtnVisible: any;

  yesObject = {
    yesNoPendingID: 1,
    isSpecialEducation: true,
    yesNoPending: "Yes",
  };
  noObject = {
    yesNoPendingID: 2,
    yesNoPending: "No",
    isSpecialEducation: true,
  };
  unknownObject = {
    yesNoPendingID: 4,
    yesNoPending: "Unknown",
    isSpecialEducation: true,
  };
  splNeeds: RFCSpecialNeeds = new RFCSpecialNeeds();
  isEditPage = false;
  staffTabs = [];
  staffTabIndex = 0;
  staffForm: FormGroup;
  staff: StaffForm = new StaffForm();
  isStaffDialogBox = false;
  perosnWizardMode: string;
  isStaffEditBtnController = false;
  isDisablePopUp = "none";
  referralTypeId: number;

  constructor(
    public _opencard: OpencardsService,
    public _rfc: RfcReferralService,
    public _fb: FormBuilder,
    public _router: Router,
    public _caseTeam: CaseTeamService,
    public __localVlaues: LocalValues,
    public _activatedRoute: ActivatedRoute,
    public _cli: ClildFormService
  ) {}

  ngOnInit() {
    this.formValidation();
    this.SiblingsFormValidation();
    this.staffFormValidation();
    if (this._router.url.includes("/reintegration/referral/detail")) {
      this.getRecById();
      this.isAttachmentRequired = true;
    }
    this.defineMainTabs();
    this.defineOpencards();
    this.defineStaffTabs();
    this.breadcrumbs = [
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case List",
        href: "/reports/opencards/list/client/case",
        active: "",
      },
      { label: "RFC Form", active: "active" },
    ];
    this.ddOptions.push(
      { value: 1, view: "Yes" },
      { value: 2, view: "No" },
      { value: 3, view: "N/A" }
    );
    /**
     * To open section 1 tab by default,call the function
     * index must be 0 and value must be '#nav-general'
     */
    let hasValue = { target: { hash: "#nav-general" } };
    this.setIndex(0, hasValue);
    this.refcOpencards.sort((a, b) => {
      return a["title"].localeCompare(b["title"]);
    });
    this.familyMemberComponent.formValidation();
    this.setStaffIndex(0);
  }

  setIndex(index: number, event: any) {
    let hasValue = [];
    hasValue = event.target.hash;
    this.sIndex = index;
  }

  defineMainTabs() {
    return (this.mainTabs = [
      { label: "General Information", href: "#nav-general" },
      { label: "Specific Reason(s)", href: "#nav-specific" },
      { label: "School Information", href: "#nav-school" },
      { label: "Behavioral and Medical Needs", href: "#nav-special" },
      { label: "Important Connections", href: "#nav-important" },
      { label: "Other Information", href: "#nav-other" },
      { label: "Siblings", href: "#nav-sibiling" },
    ]);
  }

  addForm(source: any) {
    if (this.rfcForm.valid) {
      if (this.marked) {
        if (
          source.specialEDType === "" ||
          source.specialEDType === null ||
          source.specialEDType === undefined
        ) {
          swal("Warning", "Please fill the Special Education Type", "info");
        } else if (
          source.regPubSchool === 0 &&
          source.specialEDTypeUnknown === 0 &&
          source.specialED === 0
        ) {
          swal("Warning", "Please fill the mandatoy fields", "info");
        } else {
          let temp = [],
            rawData: any;
          source.clientID = parseInt(
            this._activatedRoute.snapshot.queryParamMap.get("clientId")
          );
          source.receivedDateTime = this.__localVlaues.stringFormatDatetime(
            Date.parse(source.receivedDateTime)
          );
          source.referralDate = this.__localVlaues.stringFormatDatetime(
            Date.parse(source.referralDate)
          );
          source.dateTimeRetrieved = this.__localVlaues.stringFormatDatetime(
            Date.parse(source.dateTimeRetrieved)
          );
          source["sfaOfficeID"] = source.countyID
            ? source.countyID.sfaofficeID
              ? source.countyID.sfaofficeID.sfaofficeID
              : null
            : null;
          !isNullOrUndefined(source.countyID)
            ? (source.countyID = source.countyID.countyID)
            : null;
          !isNullOrUndefined(source.srsStaffID)
            ? (source.srsStaffID = source.srsStaffID.srsstaffID)
            : null;
          !isNullOrUndefined(source.staffID)
            ? (source.staffID = source.staffID.staffID)
            : null;
          !isNullOrUndefined(source.tribeID)
            ? (source.tribeID = source.tribeID.tribeID)
            : null;
          !isNullOrUndefined(source.familyMemberID)
            ? (source.familyMemberID = source.familyMemberID.familyMemberID)
            : null;
          !isNullOrUndefined(source.fmRelationShipID)
            ? (source.fmRelationShipID = source.fmRelationShipID.personTypeID)
            : null;
          !isNullOrUndefined(source.motherName_FamilyMemberID)
            ? (source.motherName_FamilyMemberID =
                source.motherName_FamilyMemberID.familyMemberID)
            : null;
          !isNullOrUndefined(source.fatherName_FamilyMemberID)
            ? (source.fatherName_FamilyMemberID =
                source.fatherName_FamilyMemberID.familyMemberID)
            : null;
          !isNullOrUndefined(source.pickupLocationPersonTypeID)
            ? (source.pickupLocationPersonTypeID =
                source.pickupLocationPersonTypeID.personTypeID)
            : null;
          !isNullOrUndefined(source.galid)
            ? (source.galid = source.galid.galid)
            : null;
          !isNullOrUndefined(source.csvid)
            ? (source.csvid = source.csvid.csvid)
            : null;
          !isNullOrUndefined(source.casaOfficerID)
            ? (source.casaOfficerID = source.casaOfficerID.casaOfficerID)
            : null;
          !isNullOrUndefined(source.crbcoordinatorID)
            ? (source.crbcoordinatorID =
                source.crbcoordinatorID.crbcoordinatorID)
            : null;
          !isNullOrUndefined(source.judgeID)
            ? (source.judgeID = source.judgeID.judgeID)
            : null;
          !isNullOrUndefined(source.fswID)
            ? (source.fswID = source.fswID.staffID)
            : null;
          !isNullOrUndefined(source.communityMemberID)
            ? (source.communityMemberID =
                source.communityMemberID.communityMemberID)
            : null;
          !isNullOrUndefined(source.cmPersonTypeID)
            ? (source.cmPersonTypeID = source.cmPersonTypeID.personTypeID)
            : null;
          !isNullOrUndefined(source.payorID)
            ? (source.payorID = source.payorID.payorID)
            : null;
          !isNullOrUndefined(source.primary_ReasonForRemovalID)
            ? (source.primary_ReasonForRemovalID =
                source.primary_ReasonForRemovalID.reasonForRemovalID)
            : null;
          !isNullOrUndefined(source.secondary_ReasonForRemovalID)
            ? (source.secondary_ReasonForRemovalID =
                source.secondary_ReasonForRemovalID.reasonForRemovalID)
            : null;
          !isNullOrUndefined(source.schoolID)
            ? (source.schoolID = source.schoolID.schoolID)
            : null;
          !isNullOrUndefined(source.other1)
            ? (source.other1 = source.other1.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.medication)
            ? (source.medication = source.medication.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.pregnant)
            ? (source.pregnant = source.pregnant.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.drugsAlcohol)
            ? (source.drugsAlcohol = source.drugsAlcohol.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.sexualOffender)
            ? (source.sexualOffender = source.sexualOffender.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.sexualAbused)
            ? (source.sexualAbused = source.sexualAbused.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.physicalAggression)
            ? (source.physicalAggression =
                source.physicalAggression.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.verbalAggression)
            ? (source.verbalAggression = source.verbalAggression.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.runner)
            ? (source.runner = source.runner.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.disability)
            ? (source.disability = source.disability.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.suicidal)
            ? (source.suicidal = source.suicidal.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.allergies)
            ? (source.allergies = source.allergies.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.fireStarter)
            ? (source.fireStarter = source.fireStarter.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.vandalism)
            ? (source.vandalism = source.vandalism.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.handiCap)
            ? (source.handiCap = source.handiCap.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.srsLiasonID)
            ? (source.srsLiasonID = source.srsLiasonID.srsstaffID)
            : null;
          source.fatherDecesasedDate = this.__localVlaues.stringFormatDatetime(
            Date.parse(source.fatherDecesasedDate)
          );
          source.motherDeceasedDate = this.__localVlaues.stringFormatDatetime(
            Date.parse(source.motherDeceasedDate)
          );
          // source.sfaOfficeID = source.countyID;
          source.enteredBy = "";
          temp.push(source);
          temp.filter((item: any) => {
            if (Object.values(item)) {
              rawData = JSON.stringify(item).toString().replace(/true/g, "1");
              JSON.parse(rawData);
            }
          });
          source = rawData;
          source = JSON.parse(source);
          !isNullOrUndefined(this.ri.referralID)
            ? this.update(source)
            : this.save(source);
        }
      } else {
        if (
          source.regPubSchool === 0 &&
          source.specialEDTypeUnknown === 0 &&
          source.specialED === 0
        ) {
          swal("Warning", "Please fill the mandatoy fields", "info");
        } else {
          let temp = [],
            rawData: any;
          source.clientID = parseInt(
            this._activatedRoute.snapshot.queryParamMap.get("clientId")
          );
          source.receivedDateTime = this.__localVlaues.stringFormatDatetime(
            Date.parse(source.receivedDateTime)
          );
          source.referralDate = this.__localVlaues.stringFormatDatetime(
            Date.parse(source.referralDate)
          );
          source.dateTimeRetrieved = this.__localVlaues.stringFormatDatetime(
            Date.parse(source.dateTimeRetrieved)
          );
          source["sfaOfficeID"] = source.countyID
            ? source.countyID.sfaofficeID
              ? source.countyID.sfaofficeID.sfaofficeID
              : null
            : null;
          !isNullOrUndefined(source.countyID)
            ? (source.countyID = source.countyID.countyID)
            : null;
          !isNullOrUndefined(source.srsStaffID)
            ? (source.srsStaffID = source.srsStaffID.srsstaffID)
            : null;
          !isNullOrUndefined(source.staffID)
            ? (source.staffID = source.staffID.staffID)
            : null;
          !isNullOrUndefined(source.tribeID)
            ? (source.tribeID = source.tribeID.tribeID)
            : null;
          !isNullOrUndefined(source.familyMemberID)
            ? (source.familyMemberID = source.familyMemberID.familyMemberID)
            : null;
          !isNullOrUndefined(source.fmRelationShipID)
            ? (source.fmRelationShipID = source.fmRelationShipID.personTypeID)
            : null;
          !isNullOrUndefined(source.motherName_FamilyMemberID)
            ? (source.motherName_FamilyMemberID =
                source.motherName_FamilyMemberID.familyMemberID)
            : null;
          !isNullOrUndefined(source.fatherName_FamilyMemberID)
            ? (source.fatherName_FamilyMemberID =
                source.fatherName_FamilyMemberID.familyMemberID)
            : null;
          !isNullOrUndefined(source.pickupLocationPersonTypeID)
            ? (source.pickupLocationPersonTypeID =
                source.pickupLocationPersonTypeID.personTypeID)
            : null;
          !isNullOrUndefined(source.galid)
            ? (source.galid = source.galid.galid)
            : null;
          !isNullOrUndefined(source.csvid)
            ? (source.csvid = source.csvid.csvid)
            : null;
          !isNullOrUndefined(source.casaOfficerID)
            ? (source.casaOfficerID = source.casaOfficerID.casaOfficerID)
            : null;
          !isNullOrUndefined(source.crbcoordinatorID)
            ? (source.crbcoordinatorID =
                source.crbcoordinatorID.crbcoordinatorID)
            : null;
          !isNullOrUndefined(source.judgeID)
            ? (source.judgeID = source.judgeID.judgeID)
            : null;
          !isNullOrUndefined(source.fswID)
            ? (source.fswID = source.fswID.staffID)
            : null;
          !isNullOrUndefined(source.communityMemberID)
            ? (source.communityMemberID =
                source.communityMemberID.communityMemberID)
            : null;
          !isNullOrUndefined(source.cmPersonTypeID)
            ? (source.cmPersonTypeID = source.cmPersonTypeID.personTypeID)
            : null;
          !isNullOrUndefined(source.payorID)
            ? (source.payorID = source.payorID.payorID)
            : null;
          !isNullOrUndefined(source.primary_ReasonForRemovalID)
            ? (source.primary_ReasonForRemovalID =
                source.primary_ReasonForRemovalID.reasonForRemovalID)
            : null;
          !isNullOrUndefined(source.secondary_ReasonForRemovalID)
            ? (source.secondary_ReasonForRemovalID =
                source.secondary_ReasonForRemovalID.reasonForRemovalID)
            : null;
          !isNullOrUndefined(source.schoolID)
            ? (source.schoolID = source.schoolID.schoolID)
            : null;
          !isNullOrUndefined(source.other1)
            ? (source.other1 = source.other1.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.medication)
            ? (source.medication = source.medication.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.pregnant)
            ? (source.pregnant = source.pregnant.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.drugsAlcohol)
            ? (source.drugsAlcohol = source.drugsAlcohol.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.sexualOffender)
            ? (source.sexualOffender = source.sexualOffender.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.sexualAbused)
            ? (source.sexualAbused = source.sexualAbused.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.physicalAggression)
            ? (source.physicalAggression =
                source.physicalAggression.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.verbalAggression)
            ? (source.verbalAggression = source.verbalAggression.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.runner)
            ? (source.runner = source.runner.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.disability)
            ? (source.disability = source.disability.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.suicidal)
            ? (source.suicidal = source.suicidal.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.allergies)
            ? (source.allergies = source.allergies.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.fireStarter)
            ? (source.fireStarter = source.fireStarter.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.vandalism)
            ? (source.vandalism = source.vandalism.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.handiCap)
            ? (source.handiCap = source.handiCap.yesNoPendingID)
            : null;
          !isNullOrUndefined(source.srsLiasonID)
            ? (source.srsLiasonID = source.srsLiasonID.srsstaffID)
            : null;

          source.enteredBy = "";
          this.listOfSiblings.map((item: Siblings) => {
            item.name = item.name;
            item.dob = item.dob
              ? this.__localVlaues.stringFormatDatetime(item.dob)
              : null;
            item.clientID = item.clientID;
            item.location = item.location;
          });
          source["siblingPlacementFactors"] = this.listOfSiblings;
          temp.push(source);
          temp.filter((item: any) => {
            if (Object.values(item)) {
              rawData = JSON.stringify(item).toString().replace(/true/g, "1");
              JSON.parse(rawData);
            }
          });
          source = rawData;
          source = JSON.parse(source);
          !isNullOrUndefined(this.ri.referralID)
            ? this.update(source)
            : this.save(source);
        }
      }
    } else {
      swal("Warning", "Please fill the mandatoy fields", "info");
    }
  }

  save(source) {
    console.log("Save Req", source);
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    !isNullOrUndefined(source.motherMarried_YesNoPending)
      ? (source.motherMarried_YesNoPending =
          source.motherMarried_YesNoPending.yesNoPendingID)
      : null;
    !isNullOrUndefined(source.iCWAApply_YesNoPendingID)
      ? (source.iCWAApply_YesNoPendingID =
          source.iCWAApply_YesNoPendingID.yesNoPendingID)
      : null;
    !isNullOrUndefined(source.tribeNotified_YesNoPendingID)
      ? (source.tribeNotified_YesNoPendingID =
          source.tribeNotified_YesNoPendingID.yesNoPendingID)
      : null;
    !isNullOrUndefined(source.isMotherIncarcerated_YesNoPendingID)
      ? (source.isMotherIncarcerated_YesNoPendingID =
          source.isMotherIncarcerated_YesNoPendingID.yesNoPendingID)
      : null;
    !isNullOrUndefined(source.isFatherIncarcerated_YesNoPendingID)
      ? (source.isFatherIncarcerated_YesNoPendingID =
          source.isFatherIncarcerated_YesNoPendingID.yesNoPendingID)
      : null;
    this._rfc.saveReferral(source).then((data) => {
      loader.style.display = "none";
      if (data.responseStatus) {
        swal("Success", "Record has been saved!", "success");
        this.onClickSplNeedsSave(data);
        return this._router.navigate(["/reports/opencards/list/client/case"], {
          queryParamsHandling: "preserve",
        });
      }
    });
  }
  update(source) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    !isNullOrUndefined(source.caseID)
      ? (source.caseID = source.caseID.caseID)
      : null;
    delete source.courtCaseNo;
    !isNullOrUndefined(source.referralTypeID)
      ? (source.referralTypeID = source.referralTypeID.referralTypeID)
      : null;
    !isNullOrUndefined(source.motherMarried_YesNoPending)
      ? (source.motherMarried_YesNoPending =
          source.motherMarried_YesNoPending.yesNoPendingID ||
          source.motherMarried_YesNoPending)
      : null;
    !isNullOrUndefined(source.iCWAApply_YesNoPendingID)
      ? (source.iCWAApply_YesNoPendingID =
          source.iCWAApply_YesNoPendingID.yesNoPendingID ||
          source.iCWAApply_YesNoPendingID)
      : null;
    !isNullOrUndefined(source.tribeNotified_YesNoPendingID)
      ? (source.tribeNotified_YesNoPendingID =
          source.tribeNotified_YesNoPendingID.yesNoPendingID ||
          source.tribeNotified_YesNoPendingID)
      : null;
    !isNullOrUndefined(source.isMotherIncarcerated_YesNoPendingID)
      ? (source.isMotherIncarcerated_YesNoPendingID =
          source.isMotherIncarcerated_YesNoPendingID.yesNoPendingID ||
          source.isMotherIncarcerated_YesNoPendingID)
      : null;
    !isNullOrUndefined(source.isFatherIncarcerated_YesNoPendingID)
      ? (source.isFatherIncarcerated_YesNoPendingID =
          source.isFatherIncarcerated_YesNoPendingID.yesNoPendingID ||
          source.isFatherIncarcerated_YesNoPendingID)
      : null;
    this._rfc.updateReferral(source).then((data) => {
      loader.style.display = "none";
      swal("Success", "Record has been updated!", "success");
      this.updateRFCSpecialNeeds();
      return this._router.navigate(["/reports/opencards/list/client/case"], {
        queryParams: { ref_type: this.referralTypeId },
        queryParamsHandling: "merge",
      });
    });
  }

  resetForm() {}

  discardForm() {}

  editForm() {
    this.edit = false;
    this.rfcForm.enable();
    this.rfcForm.controls["payorID"].disable();
    this.rfcForm.controls["courtCaseNo"].disable();
    this.rfcForm.controls["srsStaffID"].disable();
    this.rfcForm.controls["srsLiasonID"].disable();
    this.rfcForm.controls["staffID"].disable();
    this.rfcForm.controls["tribeID"].disable();
    this.rfcForm.controls["familyMemberID"].disable();
    this.rfcForm.controls["fmRelationShipID"].disable();
    this.rfcForm.controls["motherName_FamilyMemberID"].disable();
    this.rfcForm.controls["fatherName_FamilyMemberID"].disable();
    this.rfcForm.controls["schoolID"].disable();
    this.rfcForm.controls["galid"].disable();
    this.rfcForm.controls["csvid"].disable();
    this.rfcForm.controls["casaOfficerID"].disable();
    this.rfcForm.controls["crbcoordinatorID"].disable();
    this.rfcForm.controls["judgeID"].disable();
    this.rfcForm.controls["fswID"].disable();
    this.rfcForm.controls["communityMemberID"].disable();
    this.rfcForm.controls["cmPersonTypeID"].disable();
    this.rfcForm.controls["countyID"].disable();
  }

  getMetaData(event: any, label: any) {
    let reqObj, metaDataReq, email: any;
    switch (label) {
      case "county":
        reqObj = "county";
        break;
      case "dcfSocial":
        reqObj = "srsStaff";
        break;
      case "dcfLiaison":
        reqObj = "srsStaff";
        break;
      case "sfcsWorker":
        reqObj = "staff";
        break;
      case "tribe":
        reqObj = "tribe";
        break;
      case "removal_parent":
        reqObj = "familyMember";
        break;
      case "relationship":
        reqObj = "personType";
        break;

      case "mother_name":
        reqObj = "familyMember";
        break;

      case "father_name":
        reqObj = "familyMember";
        break;

      case "primary_reason":
        reqObj = "reasonForRemoval";
        break;
      case "secondary_reason":
        reqObj = "reasonForRemoval";
        break;

      case "medication":
        reqObj = "yesNoPending";
        break;

      case "pregnant":
        reqObj = "yesNoPending";
        break;

      case "durgs_alcohol":
        reqObj = "yesNoPending";
        break;

      case "sexual_offender":
        reqObj = "yesNoPending";
        break;

      case "sexually_abused":
        reqObj = "yesNoPending";
        break;

      case "physical_aggression":
        reqObj = "yesNoPending";
        break;

      case "verbal_aggression":
        reqObj = "yesNoPending";
        break;

      case "runner":
        reqObj = "yesNoPending";
        break;

      case "disability":
        reqObj = "yesNoPending";
        break;

      case "suicidal":
        reqObj = "yesNoPending";
        break;

      case "allergies":
        reqObj = "yesNoPending";
        break;

      case "fire_starter":
        reqObj = "yesNoPending";
        break;

      case "vandalism":
        reqObj = "yesNoPending";
        break;

      case "other1":
        reqObj = "yesNoPending";
        break;

      case "guardian":
        reqObj = "guardianAdLitem";
        break;
      case "cso":
        reqObj = "CourtServiceOfficer";
        break;

      case "casa":
        reqObj = "casaOfficer";
        break;

      case "crbCoordinator":
        reqObj = "CRBCoordinator";
        break;

      case "judge":
        reqObj = "Judge";
        break;

      case "family_support_worker":
        reqObj = "staff";
        break;

      case "community_member":
        reqObj = "communityMember";
        break;

      case "person_type":
        reqObj = "personType";
        break;

      case "case_payor":
        reqObj = "payor";
        break;
      case "current_school":
        reqObj = "schoolName";
        break;

      case "handiCap":
        reqObj = "yesNoPending";
        break;
    }
    if (reqObj == "three_option") {
      this.dropdownOptions(event.query);
    } else if (reqObj == "yesNoPending") {
      metaDataReq = { value: event.query };
      this._rfc.listYesNoPendingReferral(metaDataReq).then((data) => {
        this.metaData = data.dropDown;
      });
    } else {
      metaDataReq = { Object: reqObj, value: event.query };
      this._caseTeam.getSearchList(metaDataReq).then((data) => {
        data.dropDown.map((item) => {
          email = !isNullOrUndefined(item.email)
            ? item.email
            : "Email not provided!";
          item["fullName"] =
            item.lastName + "," + item.firstName + " ( " + email + " ) ";
        });
        this.metaData = data.dropDown;
      });
    }
  }

  textAreaAdjust(idTag, element) {
    let textArea = document.getElementById(idTag);
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  dropdownOptions(query: any) {
    this.ddOptions.filter((item) => {
      item.view.indexOf(query) !== -1
        ? this.filteredDDOptions.push(item)
        : null;
    });
  }
  returnYes(source) {
    return source.value;
  }
  defineOpencards() {
    if (
      this._opencard.getOtherRefDetails() &&
      this._opencard.getOtherRefDetails().referralName === "NC-RFC"
    ) {
      this.refcOpencards = [
        {
          title: "Billable Case Activity",
          tip: "Billable Case Activity",
          navigation: "",
          icon: this.iconurl + "assessment icon.svg",
        },
        {
          title: "Case Activity",
          tip: "Case Activity",
          navigation: "reintegration/referral/opencard/case-activity/view",
          icon: this.iconurl + "case activity.svg",
        },
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
          title: "Court Orders",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "order.svg",
        },
        {
          title: "Home County",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "home.svg",
        },
        {
          title: "Service Claim",
          tip: "service claims",
          navigation: "",
          icon: "assets/Nodesicon/service claim.svg",
        },
        {
          title: "SFM Office",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Appointments",
          tip: "Assessments",
          navigation: "",
          icon: "assets/Nodesicon/appointment.svg",
        },
        {
          title: "Siblings In Out-Of-Home-Family",
          tip: "Siblings In Out-Of-Home-Family",
          navigation: "",
          icon: this.iconurl + "",
        },
      ];
    } else if (
      this._opencard.getOtherRefDetails() &&
      this._opencard.getOtherRefDetails().referralName === "NC-FCH"
    ) {
      this.refcOpencards = [
        {
          title: "Assessments",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "assessment icon.svg",
        },
        {
          title: "Authorization Summary",
          tip: "Authorization Summary",
          navigation: "",
          icon: this.iconurl + "",
        },
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
          title: "Home County",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "home.svg",
        },
        {
          title: "Service Claim",
          tip: "service claims",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "SFM Office",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Adoption",
          tip: "Adoption",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Appointments",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Medical",
          tip: "Medical",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Monthly Reports",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Placements",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "School",
          tip: "School",
          navigation: "",
          icon: this.iconurl + "",
        },
      ];
    } else {
      this.refcOpencards = [
        {
          title: "Assessments",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "assessment icon.svg",
        },
        {
          title: "Behavior Assessments",
          tip: "Behavior Assessments",
          navigation: "",
          count: "10",
          icon: this.iconurl + "",
        },
        {
          title: "Case Activity",
          tip: "Case Activity",
          navigation: "reintegration/referral/opencard/case-activity/view",
          count: "0",
          icon: this.iconurl + "case activity.svg",
        },
        {
          title: "Case Plan Goals",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "case goals.svg",
        },
        {
          title: "Court Orders",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "order.svg",
        },
        {
          title: "Appointments",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Case Evaluation",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Case Team",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Home County",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "home.svg",
        },
        {
          title: "SFM Office",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        // { title: 'BH Determination', tip: 'Assessments', navigation: '',  icon: this.iconurl + '' },
        // { title: 'Kan-Be-Healthy', tip: 'Assessments', navigation: '',  icon: this.iconurl + '' },
        {
          title: "Monthly Reports",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Supervisory Staffing Form",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Supervisory Staffing Form for Supervisor",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Placements",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Independent Living",
          tip: "Assessments",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Family",
          tip: "Family",
          navigation: "",
          icon: this.iconurl + "",
        },
        // { title: 'Health Record', tip: 'Family', navigation: '',  icon: this.iconurl + '' },
        {
          title: "Social Security Income",
          tip: "Family",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Case File Activity",
          tip: "Family",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Service Claim",
          tip: "service claims",
          navigation: "",
          icon: this.iconurl + "",
        },
        // { title: 'Immunization', tip: 'service claims', navigation: '',  icon: this.iconurl + '' },
        // { title: 'Waiver', tip: 'service claims', navigation: '',  icon: this.iconurl + '' },
        {
          title: "KIPP",
          tip: "service claims",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Placement Referral",
          tip: "service claims",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Move and Permanency",
          tip: "service claims",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Authorization Summary",
          tip: "Authorization Summary",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Adoption",
          tip: "Adoption",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "School",
          tip: "School",
          navigation: "",
          icon: this.iconurl + "",
        },
        {
          title: "Medical",
          tip: "Medical",
          navigation: "",
          icon: this.iconurl + "",
        },
      ];
    }
  }

  navigateTo(label: any) {
    let url: any;
    url = this.navigationURLGenerator(label);
    if (label === "Placements") {
      return this._router.navigate([url], { queryParamsHandling: "preserve" });
    } else {
      return this._router.navigate([url], { queryParamsHandling: "preserve" });
    }

    // window.open(
    //   window.location.origin + url + window.location.search,
    //   '_blank',
    //   'toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500'
    // );
  }
  closureDate: any;
  getRecById() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.isEditPage = true;
    let referralId = parseInt(
      this._activatedRoute.snapshot.queryParamMap.get("ref_id")
    );
    let req = { referralID: referralId };
    this._rfc.getByIdReferral(req).then((data) => {
      this.listOfSiblings = data.siblingPlacementFactorsDetails;
      this.listOfSiblings.map((itm) => {
        var data = {
          name: itm.name,
          dob: itm.dob,
          clientID: itm.clientID,
          location: itm.location,
        };
        itm.personTypeID = data;
      });
      this.__localVlaues.closureDate = data.referral.closureDate;
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.referral.changedBy)
        ? data.referral.changedBy
        : "------";
      this.formLogInfo.changedDate = !isNullOrUndefined(
        data.referral.changedDate
      )
        ? moment(data.referral.changedDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.referral.enteredBy)
        ? data.referral.enteredBy
        : "------";
      this.formLogInfo.enteredDate = !isNullOrUndefined(
        data.referral.enteredDate
      )
        ? moment(data.referral.enteredDate).format("MM/DD/YYYY hh:mm:ss A")
        : "--:--:-- --";

      if (data.referral.isActive) {
        !isNullOrUndefined(data.referral.receivedDateTime)
          ? (data.referral.receivedDateTime = moment(
              data.referral.receivedDateTime
            ).format("MM/DD/YYYY hh:mm:ss A"))
          : (data.referral.receivedDateTime = "");
        !isNullOrUndefined(data.referral.referralDate)
          ? (data.referral.referralDate = moment(
              data.referral.referralDate
            ).format("MM/DD/YYYY hh:mm:ss A"))
          : null;
        !isNullOrUndefined(data.referral.dateTimeRetrieved)
          ? (data.referral.dateTimeRetrieved = moment(
              data.referral.dateTimeRetrieved
            ).format("MM/DD/YYYY"))
          : null;
      } else {
        !isNullOrUndefined(data.referral.receivedDateTime)
          ? (data.referral.receivedDateTime = moment
              .utc(data.referral.receivedDateTime)
              .format("MM/DD/YYYY hh:mm:ss A"))
          : (data.referral.receivedDateTime = "");
        !isNullOrUndefined(data.referral.referralDate)
          ? (data.referral.referralDate = moment
              .utc(data.referral.referralDate)
              .format("MM/DD/YYYY hh:mm:ss A"))
          : null;
        !isNullOrUndefined(data.referral.dateTimeRetrieved)
          ? (data.referral.dateTimeRetrieved = moment
              .utc(data.referral.dateTimeRetrieved)
              .format("MM/DD/YYYY"))
          : null;
      }
      this.closureDate = this.__localVlaues.getDateandTimeWithExt(
        data.referral.closureDate
      );
      this.__localVlaues.caseID = !isNullOrUndefined(
        data.referral.caseID.caseID
      )
        ? (data.caseID = data.referral.caseID.caseID)
        : null;
      !isNullOrUndefined(data.referral)
        ? (data.referral.facts = data.referral.caseID.facts)
        : null;

      !isNullOrUndefined(data.referral.attendTeamMeetingOk_YesNoPendingID)
        ? (data.referral.attendTeamMeetingOk_YesNoPendingID =
            data.referral.attendTeamMeetingOk_YesNoPendingID.yesNoPendingID).toString()
        : null;

      !isNullOrUndefined(data.referral)
        ? (data.referral["payorID"] = data.referral.caseID.payorID)
        : null;
      !isNullOrUndefined(data.referral.motherMarried_YesNoPending)
        ? (data.referral.motherMarried_YesNoPending =
            data.referral.motherMarried_YesNoPending.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.referral.iCWAApply_YesNoPendingID)
        ? (data.referral.iCWAApply_YesNoPendingID =
            data.referral.iCWAApply_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.referral.tribeNotified_YesNoPendingID)
        ? (data.referral.tribeNotified_YesNoPendingID =
            data.referral.tribeNotified_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.referral.isFatherIncarcerated_YesNoPendingID)
        ? (data.referral.isFatherIncarcerated_YesNoPendingID =
            data.referral.isFatherIncarcerated_YesNoPendingID.yesNoPendingID)
        : null;
      !isNullOrUndefined(data.referral.isMotherIncarcerated_YesNoPendingID)
        ? (data.referral.isMotherIncarcerated_YesNoPendingID =
            data.referral.isMotherIncarcerated_YesNoPendingID.yesNoPendingID)
        : null;
      data.HomeCounty.length > 0
        ? (data.referral.countyID = data.HomeCounty[0].countyID)
        : null;

      !isNullOrUndefined(data.srsStaffID)
        ? (data.referral["srsStaffID"] = data.srsStaffID)
        : null;
      !isNullOrUndefined(data.srsStaffID)
        ? (data.referral.srsStaffID["fullName"] =
            data.srsStaffID.lastName +
            "," +
            data.srsStaffID.firstName +
            " ( " +
            data.srsStaffID.email +
            " ) ")
        : null;

      data.fatherName_FamilyMemberID.length > 0
        ? (this.ri.father_DeceasedDate =
            data.fatherName_FamilyMemberID[0].deceasedDate)
        : null;
      data.motherName_FamilyMemberID.length > 0
        ? (this.ri.mother_DeceasedDate =
            data.motherName_FamilyMemberID[0].deceasedDate)
        : null;
      data.fatherName_FamilyMemberID.length > 0
        ? (data.referral["fatherName_FamilyMemberID"] =
            data.fatherName_FamilyMemberID[0].familyMemberID)
        : null;
      data.fatherName_FamilyMemberID.length > 0
        ? (data.referral.fatherName_FamilyMemberID["name"] =
            data.fatherName_FamilyMemberID[0].familyMemberID.lastName +
            ", " +
            data.fatherName_FamilyMemberID[0].familyMemberID.firstName)
        : null;

      data.motherName_FamilyMemberID.length > 0
        ? (data.referral["motherName_FamilyMemberID"] =
            data.motherName_FamilyMemberID[0].familyMemberID)
        : null;
      data.motherName_FamilyMemberID.length > 0
        ? (data.referral.motherName_FamilyMemberID["name"] =
            data.motherName_FamilyMemberID[0].familyMemberID.lastName +
            ", " +
            data.motherName_FamilyMemberID[0].familyMemberID.firstName)
        : null;

      data.HomeSchool.length > 0
        ? (data.referral.schoolID = data.HomeSchool[0].schoolID)
        : null;

      !isNullOrUndefined(data.casaOfficerID)
        ? (data.referral["casaOfficerID"] = data.casaOfficerID)
        : null;
      !isNullOrUndefined(data.casaOfficerID)
        ? (data.referral.casaOfficerID["fullName"] =
            data.casaOfficerID.lastName +
            " " +
            data.casaOfficerID.firstName +
            " ( " +
            data.casaOfficerID.email +
            " ) ")
        : null;

      !isNullOrUndefined(data.crbcoordinatorID)
        ? (data.referral["crbcoordinatorID"] = data.crbcoordinatorID)
        : null;
      !isNullOrUndefined(data.crbcoordinatorID)
        ? (data.referral.crbcoordinatorID["fullName"] =
            data.crbcoordinatorID.lastName +
            " " +
            data.crbcoordinatorID.firstName +
            " ( " +
            data.casaOfficerID.email +
            " ) ")
        : null;

      !isNullOrUndefined(data.judgeID)
        ? (data.referral["judgeID"] = data.judgeID)
        : null;
      !isNullOrUndefined(data.judgeID)
        ? (data.referral.judgeID["fullName"] =
            data.judgeID.lastName +
            " " +
            data.judgeID.firstName +
            " ( " +
            data.judgeID.email +
            " ) ")
        : null;

      !isNullOrUndefined(data.galid)
        ? (data.referral["galid"] = data.galid)
        : null;
      !isNullOrUndefined(data.galid)
        ? (data.referral.galid["fullName"] =
            data.galid.lastName +
            " " +
            data.galid.firstName +
            " ( " +
            data.galid.email +
            " ) ")
        : null;

      data.CourtCase.length > 0
        ? (data.referral.courtCaseNo = data.CourtCase[0].courtCaseNo)
        : null;

      // !isNullOrUndefined(data.motherMarried_YesNoPending) ? data.motherMarried_YesNoPending = data.motherMarried_YesNoPending.yesNoPendingID : null;

      !isNullOrUndefined(data.srsLiasonID)
        ? (data.referral["srsLiasonID"] = data.srsLiasonID)
        : null;
      !isNullOrUndefined(data.srsLiasonID)
        ? (data.referral.srsLiasonID["fullName"] =
            data.srsLiasonID.lastName +
            "," +
            data.srsLiasonID.firstName +
            " ( " +
            data.srsLiasonID.email +
            " ) ")
        : null;

      /////Added Things////

      !isNullOrUndefined(data.staffID)
        ? (data.referral["staffID"] = data.staffID)
        : null;
      !isNullOrUndefined(data.staffID)
        ? (data.referral.staffID["fullName"] =
            data.staffID.lastName +
            "," +
            data.staffID.firstName +
            " ( " +
            data.staffID.email +
            " ) ")
        : null;

      // (data.familyMemberID.length > 0) ? data.referral['fmRelationShipID'] = data.familyMemberID[0].fmRelationShipID.personType : null;
      // !isNullOrUndefined(data.familyMemberID[0].fmRelationShipID) ? data.referral.fmRelationShipID['fullName'] = data.familyMemberID[0].fmRelationShipID.lastName + ' ' + data.familyMemberID[0].fmRelationShipID.firstName + ' ( ' + data.familyMemberID[0].fmRelationShipID.email + ' ) ' : null;

      data.familyMemberID.length > 0
        ? (data.referral["familyMemberID"] =
            data.familyMemberID[0].familyMemberID)
        : null;
      data.familyMemberID.length > 0
        ? (data.referral.familyMemberID["name"] =
            data.familyMemberID[0].familyMemberID.lastName +
            ", " +
            data.familyMemberID[0].familyMemberID.firstName)
        : null;

      data.familyMemberID.length > 0
        ? (data.referral["fmRelationShipID"] =
            data.familyMemberID[0].fmRelationShipID)
        : null;
      // (data.familyMemberID.length > 0) ? data.referral.fmRelationShipID['personType'] = data.familyMemberID[0].fmRelationShipID.personType : null;

      !isNullOrUndefined(data.cmPersonTypeID)
        ? (data.referral["cmPersonTypeID"] = data.cmPersonTypeID)
        : null;

      !isNullOrUndefined(data.csvid)
        ? (data.referral["csvid"] = data.csvid)
        : null;
      !isNullOrUndefined(data.csvid)
        ? (data.referral.csvid["fullName"] =
            data.csvid.lastName +
            " " +
            data.csvid.firstName +
            " ( " +
            data.csvid.email +
            " ) ")
        : null;

      !isNullOrUndefined(data.fswID)
        ? (data.referral["fswID"] = data.fswID)
        : null;
      !isNullOrUndefined(data.fswID)
        ? (data.referral.fswID["fullName"] =
            data.fswID.lastName +
            " " +
            data.fswID.firstName +
            " ( " +
            data.fswID.email +
            " ) ")
        : null;

      // !isNullOrUndefined(data.motherMarried_YesNoPending) ? data.motherMarried_YesNoPending = data.motherMarried_YesNoPending.yesNoPendingID : null;
      this.ri = data.referral;
      console.log("this.ri>>>>", JSON.stringify(this.ri));
      this.listOfSiblings = data.siblingPlacementFactorsDetails;
      loader.style.display = "none";
      this.isFormView = true;
      this.rfcForm.disable();
      this.isFormView = true;
      this.edit = true;
      localStorage.setItem(
        "referralTypeId",
        data.referral.referralTypeID.referralTypeID + this._opencard.getHasKey()
      );
      this.referralTypeId = data.referral.referralTypeID.referralTypeID;
      if (!isNullOrUndefined(data.referral.receivedDateTime)) {
        localStorage.setItem(
          "referralRFCBeginDate",
          data.referral.receivedDateTime
        );
        data.referral.receivedDateTime = new Date(
          data.referral.receivedDateTime
        );
      } else {
        data.referral.receivedDateTime = null;
      }
      !isNullOrUndefined(data.referral.referralDate)
        ? (data.referral.referralDate = new Date(data.referral.referralDate))
        : null;
      !isNullOrUndefined(data.referral.dateTimeRetrieved)
        ? (data.referral.dateTimeRetrieved = new Date(
            data.referral.dateTimeRetrieved
          ))
        : null;
      !isNullOrUndefined(data.fatherName_FamilyMemberID[0].deceasedDate)
        ? (this.ri.father_DeceasedDate = new Date(
            data.fatherName_FamilyMemberID[0].deceasedDate
          ))
        : null;
      !isNullOrUndefined(data.motherName_FamilyMemberID[0].deceasedDate)
        ? (this.ri.mother_DeceasedDate = new Date(
            data.motherName_FamilyMemberID[0].deceasedDate
          ))
        : null;
    });
    this.getRFCSpecialNeedsByReferralId();
  }

  formValidation() {
    this.rfcForm = this._fb.group({
      clientID: [null],
      abandonment: [null],
      abuse: [null],
      additionalInfo: [null],
      additionalInformationRemoval: [null],
      allergies: [null],
      annualHouseholdIncome: [null],
      attendTeamMeetingOk: [null],
      attendTeamMeetingReason: [null],
      birthCert: [null],
      birthRecords: [null],
      caseID: [null],
      cfs1000: [null],
      cfs4003: [null],
      changedBy: [null],
      changedDate: [null],
      childAlcoholAbuse: [null],
      childBehaviorProblem: [null],
      childCasePlan: [null],
      childDisability: [null],
      childDrugAbuse: [null],
      cincnan: [null],
      citizenship: [null],
      closureDate: [null],
      closureReasonID: [null],
      closureReasonNote: [null],
      courtDocs: [null],
      currentGrade: [null, Validators.compose([Validators.required])],
      dateTimeRetrieved: [null],
      deathParent: [null],
      deathParentRelinquishment: [null],
      disability: [null],
      dischargeDate: [null],
      dischargeTo: [null],
      drugsAlcohol: [null],
      dualAdj_BeginDate: [null],
      dualAdj_EndDate: [null],
      emotionalAbuse: [null],
      enteredBy: [null],
      enteredDate: [null],
      explanation: [null],
      failureToThrive: [null],
      familyCasePlan: [null],
      familyRefused: [null],
      fba: [null],
      file_StaffID: [null],
      fileIssueDate: [null],
      fireStarter: [null],
      handiCap: [null],
      immunizationRecs: [null],
      inadequateHousing: [null],
      initialReferralDate: [null],
      isAdoptionReferral: [null],
      isChangeOfVenue: [null],
      isFatherIncarcerated: [null],
      father_DeceasedDate: [null],
      mother_DeceasedDate: [null],
      isFormerFamilyPresCase: [null],
      isJJAReferral: [null],
      isMotherIncarcerated: [null],
      isOnRadar: [null],
      isSingleParentHousehold: [null],
      isTitleIVEEligible: [null],
      isUSCitizen: [null],
      judicialDistrictID: [null],
      ksde: [null],
      lackSupervision: [null],
      legacy_CaseID: [null],
      legacy_File_StaffID: [null],
      legacy_FP24HR_StaffID: [null],
      legacy_FP48Hr_StaffID: [null],
      legacy_IsKVCTransfer: [null],
      legacy_ReferralID: [null],
      legacy_TFI_CaseID: [null],
      legacy_TFI_ReferralID: [null],
      legacy_UMY_CaseID: [null],
      legacy_UMY_ReferralID: [null],
      medicalCard: [null],
      medicalConsent: [null],
      medicalNeglect: [null],
      medication: [null],
      medRecords: [null],
      minutesSpent: [null],
      mma: [null],
      motherMarried_YesNoPending: [null],
      motherMarriedNotes: [null],
      neglect: [null],
      notes: [null],
      numberLivingInHousehold: [null],
      officeFile: [null],
      other: [null],
      other1: [null],
      other1Desc: [null],
      other2: [null],
      other2Desc: [null],
      otherAttachDescription: [null],
      otherAttachments: [null],
      otherContactFName: [null],
      otherContactLName: [null],
      otherContactMI: [null],
      otherContactPhone: [null],
      otherContactRelationship: [null],
      otherReasonForPlacement: [null],
      outcomes_Adopt_ReleaseDate: [null],
      outcomes_Other_ReleaseDate: [null],
      outcomes_ReleaseDate: [null],
      outcomes_Reuni_ReleaseDate: [null],
      parentAlcoholAbuse: [null],
      parentDrugAbuse: [null],
      parentIllnessDisabilityInability: [null],
      parentIncarceration: [null],
      parentMethUse: [null],
      parentRelinquishment: [null],
      paymentBeginDate: [null],
      paymentEndDate: [null],
      permanencyGoalID: [null],
      physicalAbuse: [null],
      physicalAggression: [null],
      physicalNeglect: [null],
      pickupLocation: [null],
      pickupLocationName: [null],
      pickupLocationPersonTypeID: [null],
      pickupLocationPhone: [null],
      pickupLocationRelationshipID: [null],
      placementEstablishedDate: [null],
      placementNeededDate: [null],
      pregnant: [null],
      primary_ReasonForRemovalID: [
        null,
        Validators.compose([Validators.required]),
      ],
      primaryLanguage: [null],
      priorAdoptions: [null],
      psychiatricEval: [null],
      reasonForDecline: [null],
      reasonForDeclineID: [null],
      receivedDateTime: [null],
      recidivistDate: [null],
      recidivistDateOverride: [null],
      referralAcceptedID: [null],
      referralDate: [null, Validators.compose([Validators.required])],
      referralReasonID: [null],
      referralReasonID_Secondary: [null],
      referralTypeID: [null],
      regPubSchool: [null],
      releaseDate: [null],
      releaseOfInfo: [null],
      releaseReasonNote: [null],
      retractedDate: [null],
      retractedReasonNote: [null],
      runaway: [null],
      runner: [null],
      schoolRecs: [null],
      secondary_ReasonForRemovalID: [null],
      serviceTypeID: [null],
      sexualAbuse: [null],
      sexualAbused: [null],
      sexualOffender: [null],
      siblingplacementfactors: [null],
      socialHistory: [null],
      socialSecurityCard: [null],
      specialED: [null],
      specialEDType: [null],
      specialEDTypeUnknown: [null],
      specificCourtRecommend: [null],
      suicidal: [null],
      suspectedAbuse: [null],
      transitionDate: [null],
      tribeID: [null],
      tribeNotified: [null],
      truancy: [null],
      vandalism: [null],
      verbalAggression: [null],
      withDrawDate: [null],
      withDrawReasonNote: [null],
      createdDate: [null],
      updatedDate: [null],
      lastModifiedDate: [null],
      isActive: [null],
      isDeleted: [null],
      fp_TransitionDate: [null],
      dhsnotifiedDate: [null],
      fp48HrContactDate: [null],
      dcfplanEndDate: [null],
      fp24HrContactDate: [null],
      dhstrackingNumber: [null],
      csonotifiedDate: [null],
      prtf_BirthPlace: [null],
      prtf_Complexion: [null],
      rfc_TransitionDate: [null],
      srsareaOfficeID: [null],
      prtf_ChurchPreference: [null],
      prtf_HairColor: [null],
      fp48Hr_StaffID: [null],
      fp24Hr_StaffID: [null],
      dcfbeginDate: [null],
      dcfpriorMoves: [null],
      erbeginDate: [null],
      fi_CaseID: [null],
      erendDate: [null],
      icwaapply: [null],
      prtf_EyeColor: [null],
      facts: [null, Validators.compose([Validators.required])],
      courtCaseNo: [null, Validators.compose([Validators.required])],
      countyID: [null, Validators.compose([Validators.required])],
      srsStaffID: [null, Validators.compose([Validators.required])],
      srsLiasonID: [null, Validators.compose([Validators.required])],
      staffID: [null, Validators.compose([Validators.required])],
      familyMemberID: [null, Validators.compose([Validators.required])],
      fmRelationShipID: [null],
      motherName_FamilyMemberID: [null],
      fatherName_FamilyMemberID: [null],
      schoolID: [null],
      galid: [null],
      csvid: [null],
      casaOfficerID: [null],
      crbcoordinatorID: [null],
      judgeID: [null],
      fswID: [null],
      communityMemberID: [null],
      cmPersonTypeID: [null],
      payorID: [null],
      siblingPlacementFactors: [null],
    });
    this.ri.receivedDateTime = new Date(Date.now());
    this.ri.referralDate = new Date(Date.now());
    this.clientName = localStorage.getItem("clientName");
    this.kees = localStorage.getItem("kees");
    this.kaecses = localStorage.getItem("kaecses");
  }

  SiblingsFormValidation() {
    this.siblingsForm = this._fb.group({
      name: [null],
      dob: [null],
      clientID: [null],
      location: [null],
    });
  }

  removeSiblings(index: any) {
    return this.listOfSiblings.splice(index, 1);
  }

  navigateUpload() {
    let currentURL = this._router.url;
    if (currentURL == "/reintegration/referral/detail") {
      this.url = "/reports/attachment-document/rfc/referral";
    }

    return this._router.navigate([this.url]);
  }

  onQuickMenuNav(url: string) {
    // if (url === "/reintegration/referral/opencard/placement/view") {
    //   return this._router.navigate([url], { queryParamsHandling: "preserve" });
    // } else if (url === "/reintegration/referral/opencard/school/dashboard") {
    //   return this._router.navigate([url], { queryParamsHandling: "preserve" });
    // } else {
    //   return this._router.navigate([url], { queryParamsHandling: "preserve" });
    // }
    return this._router.navigate([url], { queryParamsHandling: "preserve" });
  }

  marked = false;
  showSplEduType(e) {
    this.marked = e;
    console.log(this.marked);
  }

  onClickDCF(selectedDCFField: string) {
    this.selectedDCFDropdownField = selectedDCFField;
    this.personMasterWizardsComponent.wizard = new PersonMasterWizards();
    this.personMasterWizardsComponent.selectedClient = "";
    this.personMasterWizardsComponent.selectedModule.display = "DCF Staff";
    this.personMasterWizardsComponent.selectedModule.value = "SRSStaff";
    this.personMasterWizardsComponent.isKaecsesMandatory = false;
    this.personMasterWizardsComponent.isKaecsesDisable = false;
    this.personMasterWizardsComponent.navigationSelect = false;
    this.isFamilyMemberPromptEnabled = false;
    this.isStaffPromptEnabled = false;
    return (this.personMasterWizardsComponent.isPersonMasterWizardsOpen = true);
  }

  onClickFamilyMember(field) {
    this.selectedFMDropdownField = field;
    this.isFamilyMemberPromptEnabled = true;
    this.personMasterWizardsComponent.wizard = new PersonMasterWizards();
    this.personMasterWizardsComponent.selectedClient = "";
    this.personMasterWizardsComponent.selectedModule.display = "Family Member";
    this.personMasterWizardsComponent.selectedModule.value = "FamilyMember";
    this.personMasterWizardsComponent.isKaecsesMandatory = false;
    this.personMasterWizardsComponent.isKaecsesDisable = false;
    this.personMasterWizardsComponent.isNonContractVisible = false;
    this.personMasterWizardsComponent.isSSNVisbile = true;
    this.personMasterWizardsComponent.navigationSelect = false;
    this.isDisablePopUp = "none";
    this.isStaffPromptEnabled = false;
    return (this.personMasterWizardsComponent.isPersonMasterWizardsOpen = true);
  }

  getPersonmasterWizardSelection(event: any) {
    console.log("RFC Referral DCF", event);
    this.isFamilyMemberComponent = false;
    if (this.isFamilyMemberPromptEnabled) {
      if (event.currentSelection === "createNew") {
        this.familyMemberComponent.familMember = new FamilyMember();
        this.familyMemberComponent.familMember.firstName =
          event.wizard.firstName;
        this.familyMemberComponent.familMember.lastName = event.wizard.lastName;
        this.familyMemberComponent.familMember.ssn = event.wizard.ssn;
        this.personMasterWizardsComponent.isPersonMasterwizardSecondOpen =
          false;
        this.familyMemberComponent.editBtnCntrl = false;
        this.familyMemberComponent.formLogInfo = {
          enteredBy: "",
          changedBy: "",
          enteredDate: "",
          changedDate: "",
        };
        this.familyMemberComponent.familMemberForm.enable();
        this.isDisablePopUp = "block";
        this.showModal();
        this.isStaffPromptEnabled = false;
        this.isFamilyMemberPromptEnabled = false;
      } else {
        this.familyMemberComponent.editBtnCntrl = true;
        this.familyMemberComponent.familMember = new FamilyMember();
        this.familyMemberComponent.getCustomercarePersonDetails(
          event.data.FamilyMemberID
        );
        this.personMasterWizardsComponent.isPersonMasterwizardSecondOpen =
          false;
        this.familyMemberComponent.metaData = [];
        this.isDisablePopUp = "block";
        this.showModal();
        this.isStaffPromptEnabled = false;
      }
    } else if (this.isStaffPromptEnabled) {
      this.personMasterWizardsComponent.isPersonMasterwizardSecondOpen = false;
      this.isStaffDialogBox = true;
      this.staffFormValidation();
      this.perosnWizardMode = event.currentSelection;
      if (event.currentSelection !== "createNew") {
        this.getStaffDetailById(event.data.staffID);
      } else {
        this.staff = new StaffForm();
        this.isStaffEditBtnController = false;
        this.staff = event.wizard;
      }
    } else {
      if (event.currentSelection == "createNew") {
        this.dcfFormComponent.dcf = new Dcf();
        this.dcfFormComponent.dcf.firstName = event.wizard.firstName;
        this.dcfFormComponent.dcf.lastName = event.wizard.lastName;
        this.dcfFormComponent.editBtnCntrl = false;
        this.personMasterWizardsComponent.isPersonMasterwizardSecondOpen =
          false;
        this.dcfFormComponent.req = null;
        this.isDCFComponent = true;
        this.isStaffPromptEnabled = false;
        this.isFamilyMemberPromptEnabled = false;
      } else {
        console.log("Comes in DCF Exist", this.isFamilyMemberComponent);
        this.isFamilyMemberComponent = false;
        // this.dcfFormComponent.dcf = event.data;
        this.dcfFormComponent.getDCFDetails(event.data.SRSStaffID);
        this.personMasterWizardsComponent.isPersonMasterwizardSecondOpen =
          false;
        this.isStaffPromptEnabled = false;
        this.isFamilyMemberPromptEnabled = false;
        this.isDCFComponent = true;
      }
    }
  }

  onSiblingsSave() {
    if (this.siblingsForm.valid) {
      this.listOfSiblings.push(this.siblings);
      return (this.siblings = new Siblings());
    }
  }

  onSiblingsClear() {
    this.siblings = new Siblings();
  }

  dcfFormStatus(event: any) {
    if (event.isFormResponse) {
      this.isDCFComponent = false;
      if (this.selectedDCFDropdownField === "dcfSocialWorker") {
        event.data.person[
          "fullName"
        ] = `${event.data.person.lastName}, ${event.data.person.firstName}`;
        this.ri.srsStaffID = event.data.person;
      } else {
        event.data.person[
          "fullName"
        ] = `${event.data.person.lastName}, ${event.data.person.firstName}`;
        this.ri.srsLiasonID = event.data.person;
      }
    }
  }

  familyMemberFormStatus(event: any) {
    console.log("FM Form Status", event, this.selectedFMDropdownField);
    if (event.isFormResponse) {
      this.hideModal();

      if (this.selectedFMDropdownField === "father") {
        //check data comes from save or update using the key changes in object
        if (event.data.hasOwnProperty("person")) {
          // Its from save
          event.data.person[
            "name"
          ] = `${event.data.person.lastName}, ${event.data.person.firstName}`;
          this.ri.fatherName_FamilyMemberID = event.data.person;
        } else {
          // Its from update
          event.data.staff[
            "name"
          ] = `${event.data.staff.lastName}, ${event.data.staff.firstName}`;
          this.ri.fatherName_FamilyMemberID = event.data.staff;
        }
      } else if (this.selectedFMDropdownField === "mother") {
        //check data comes from save or update using the key changes in object
        if (event.data.hasOwnProperty("person")) {
          // Its from save
          event.data.person[
            "name"
          ] = `${event.data.person.lastName}, ${event.data.person.firstName}`;
          this.ri.motherName_FamilyMemberID = event.data.person;
        } else {
          // Its from update
          event.data.staff[
            "name"
          ] = `${event.data.staff.lastName}, ${event.data.staff.firstName}`;
          this.ri.motherName_FamilyMemberID = event.data.staff;
        }
      } else if (this.selectedFMDropdownField === "removal parent") {
        //check data comes from save or update using the key changes in object
        if (event.data.hasOwnProperty("person")) {
          event.data.person[
            "name"
          ] = `${event.data.person.lastName}, ${event.data.person.firstName}`;
          this.ri.familyMemberID = event.data.person;
        } else {
          event.data.staff[
            "name"
          ] = `${event.data.staff.lastName}, ${event.data.staff.firstName}`;
          this.ri.familyMemberID = event.data.staff;
        }
      }
    }
  }
  onSiblingsDelete(index: number) {
    if (this.listOfSiblings.length > 0) {
      this.listOfSiblings.splice(index, 1);
    }
  }

  siblingIndex: any;
  onSiblingsEdit(index, selectedItem: any) {
    this.siblingIndex = index;
    this.isSiblingsUpdateBtnVisible = true;
    var data = {
      name: selectedItem.name ? selectedItem.name : null,
      dob: selectedItem.dob ? new Date(selectedItem.dob) : null,
      clientID: selectedItem.clientID ? selectedItem.clientID : null,
      location: selectedItem.location ? selectedItem.location : null,
    };
    this.siblings = data;
  }

  onSiblingsUpdate() {
    this.listOfSiblings[this.siblingIndex] = this.siblings;
    this.siblings = new Siblings();
    return (this.isSiblingsUpdateBtnVisible = false);
  }

  onClickStaff() {
    this.isStaffPromptEnabled = true;
    this.personMasterWizardsComponent.wizard = new PersonMasterWizards();
    this.personMasterWizardsComponent.selectedClient = "";
    this.personMasterWizardsComponent.selectedModule.display = "Staff";
    this.personMasterWizardsComponent.selectedModule.value = "Staff";
    this.personMasterWizardsComponent.isKaecsesMandatory = false;
    this.personMasterWizardsComponent.isKaecsesDisable = false;
    this.personMasterWizardsComponent.isNonContractVisible = false;
    this.personMasterWizardsComponent.isSSNVisbile = true;
    this.personMasterWizardsComponent.navigationSelect = false;
    return (this.personMasterWizardsComponent.isPersonMasterWizardsOpen = true);
  }

  async onClickSplNeedsSave(referralSaveResponse: any) {
    let req = Object.assign({}, this.splNeeds, {
      referralID: referralSaveResponse.referral.referralID,
    });
    let res = await this._opencard.saveRFCReferralSpecialNeeds(req);
    console.log("Spl res", res);
  }

  staffFormStatus(event: any) {
    // staffID
    if (event.isFormResponse) {
      this.isStaffComponent = false;
      this.isStaffPromptEnabled = false;
      event.data.staff[
        "fullName"
      ] = `${event.data.staff.lastName}, ${event.data.staff.firstName}`;
      this.ri.staffID = event.data.staff;
    }
  }
  countyData = [];
  results;
  getCounty(event) {
    let req = {
      contract_StateID: "34",
      value: event.query,
    };
    // this._CaseTeamService.getSearchList(req).then(data => {
    //   this.countyData = data.dropDown;
    //   this.results = data.dropDown;
    // })
    this._caseTeam.getHomeCountiesList(req).then((data) => {
      this.countyData = data.county;
      this.results = data.county;
    });
  }

  public openInNewBrowserWindow(label: any) {
    let path = this.navigationURLGenerator(label);
    window.open(
      window.location.origin + path + window.location.search,
      "_blank",
      "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
    );
  }

  public openInNewBrowserWindowForOpencards(path: any) {
    console.log("path", path);
    let params = window.location.search;
    // if (path == "/reintegration/referral/opencard/case-activity/view") {
    //   params = "";
    // }
    window.open(
      window.location.origin + path + params,
      "_blank",
      "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
    );
  }

  public navigationURLGenerator(label: string) {
    let url: string;
    switch (label) {
      case "Case Activity":
        url = "/reintegration/referral/opencard/case-activity/view";
        break;
      case "Assessments":
        url = "/reintegration/referral/opencard/assessments/view";
        break;
      case "Case Plan Goals":
        url = "/reintegration/referral/opencard/case-plan-goals/view";
        break;
      case "Case Evaluation":
        url = "/reintegration/referral/opencard/case-evaluations/view";
        break;
      case "Case Team":
        url = "/reintegration/referral/opencard/case-team/view";
        break;
      case "Home County":
        url = "/reintegration/referral/opencard/home-county/view";
        break;
      case "SFM Office":
        url = "/reintegration/referral/opencard/sfcs-office/view";
        break;
      case "Court Orders":
        url = "/reintegration/referral/opencard/court-order/view";
        break;
      case "Family":
        url = "/reports/family/view";
        break;
      case "Appointments":
        url = "/reintegration/referral/opencard/appointments/view";
        break;
      case "BH Determination":
        url = "/reintegration/referral/opencard/bh-determination/view";
        break;
      case "Attending school":
        url = "/reintegration/referral/opencard/attending-school/view";
        break;
      case "Grade Level":
        url = "/reintegration/referral/opencard/grade-level/view";
        break;
      case "Home School":
        url = "/reintegration/referral/opencard/home-school/view";
        break;
      case "School Release":
        url = "/reintegration/referral/opencard/school-release/view";
        break;
      case "Health Record":
        url = "/reintegration/referral/opencard/health-record/view";
        break;
      case "Adoption Event":
        url = "/reintegration/referral/opencard/adoption-event/view";
        break;
      case "Kan-Be-Healthy":
        url = "/reintegration/referral/opencard/kan-be-healthy/view";
        break;
      case "Monthly Reports":
        url = "/reintegration/referral/opencard/monthly-reports/view";
        break;
      case "Social Security Income":
        url = "/reintegration/referral/opencard/social-security-income/view";
        break;
      case "Case File Activity":
        url = "/reintegration/referral/opencard/case-file-activity/view";
        break;
      case "Independent Living":
        url = "/reintegration/referral/opencard/independent-living/view";
        break;
      case "Service Claim":
        url = "/reintegration/referral/service";
        break;
      case "Immunization":
        url = "/reintegration/referral/opencard/immunization/view";
        break;
      case "Waiver":
        url = "/reintegration/referral/opencard/waiver/view";
        break;
      case "KIPP/PMTO":
        url = "/reintegration/referral/opencard/kipp-pmto/view";
        break;
      case "KIPP":
        url = "/reintegration/referral/opencard/kipp/view";
        break;
      case "Siblings In Out-Of-Home-Family":
        url =
          "/reintegration/referral/opencard/sibilings-in-out-of-home-family/view";
        break;
      case "Placements":
        url = "/reintegration/referral/opencard/placement/view";
        break;
      case "Placement Referral":
        url = "/reintegration/referral/opencard/placement-referral/view";
        break;
      case "Authorization Summary":
        url = "/reintegration/referral/service/authorization/summary";
        break;
      case "Adoption":
        url = "/reintegration/referral/opencard/adoption/view";
        break;
      case "School":
        url = "/reintegration/referral/opencard/school/dashboard";
        break;
      case "Move and Permanency":
        url = "/reintegration/referral/opencard/move-permanency/dashboard";
        break;
      case "Behavior Assessments":
        url = "/reports/behavioral-assessment";
        break;
      case "Medical":
        url = "/reintegration/referral/opencard/medical/dashboard";
        break;
      case "Supervisory Staffing Form":
        url = "/reports/rfc-supervisory-staffing-form/view";
        break;
      case "Supervisory Staffing Form for Supervisor":
        url = "/reports/supervisory-staffing-for-superviosrs/view";
        break;
      case "Billable Case Activity":
        url = "/reports/fp-billable-case-activity/view";
        break;
    }
    return url;
  }

  async getRFCSpecialNeedsByReferralId() {
    let request = {
      referralID: parseInt(
        this._activatedRoute.snapshot.queryParamMap.get("ref_id")
      ),
    };
    let response = await this._opencard.getByIdRFCReferralSpecialNeeds(request);
    this.splNeeds = response.specialNeeds;
  }

  async updateRFCSpecialNeeds() {
    let request = Object.assign(
      {},
      {
        referralID: parseInt(
          this._activatedRoute.snapshot.queryParamMap.get("ref_id")
        ),
      },
      this.splNeeds
    );
    let response = await this._opencard.updateRFCReferrlSpecialNeeds(request);
    console.log("SPL needs update response", response);
  }

  public setStaffIndex(index) {
    this.staffTabIndex = index;
  }

  public defineStaffTabs() {
    return (this.staffTabs = [
      { label: "Section 1", href: "#nav-1" },
      { label: "Section 2", href: "#nav-2" },
      { label: "Section 3", href: "#nav-3" },
    ]);
  }

  public staffFormValidation() {
    this.staffForm = this._fb.group({
      cellPh: [null],
      cellPhoneOverOfficePhone: [null],
      email: [null, Validators.compose([Validators.required])],
      extension: [null],
      firstName: [null, Validators.compose([Validators.required])],
      genderID: [null, Validators.compose([Validators.required])],
      homePh: [null],
      lastName: [null, Validators.compose([Validators.required])],
      mi: [null],
      notes: [null],
      raceID: [null],
      separationDate: [null],
      suffix: [null],
      homeCounty_CountyID: [null, Validators.compose([Validators.required])],
      acronym: [null],
      credentials: [null],
      KHSProviderNum: [null],
      pager: [null],
      homeCountyOverOfficeCounty: [null],
      beginDateForAll: [null],
      sfcsOfficeID: [null, Validators.compose([Validators.required])],
      teamLeaderID: [null, Validators.compose([Validators.required])],
      staffHomePh: [null],
      personTypeID: [null, Validators.compose([Validators.required])],
      uITrainingCompletedDate: [null],
    });
  }

  public async onStaffFormSubmit() {
    if (this.staffForm.valid) {
      //Data conversion start
      this.staff.genderID =
        this.staff.genderID !== null && this.staff.genderID !== undefined
          ? this.staff.genderID.genderID
          : null;
      this.staff.personTypeID =
        this.staff.personTypeID !== null &&
        this.staff.personTypeID !== undefined
          ? this.staff.personTypeID.personTypeID
          : null;
      this.staff.race =
        this.staff.raceID !== null && this.staff.raceID !== undefined
          ? this.staff.raceID.raceID
          : null;
      this.staff.homeCountyOverOfficeCounty =
        this.staff.homeCountyOverOfficeCounty !== null &&
        this.staff.homeCountyOverOfficeCounty !== undefined
          ? this.staff.homeCountyOverOfficeCounty.countyID
          : null;
      this.staff.teamLeaderID =
        this.staff.teamLeaderID !== null &&
        this.staff.teamLeaderID !== undefined
          ? this.staff.teamLeaderID.staffID
          : null;
      this.staff.sfcsOfficeID =
        this.staff.sfcsOfficeID !== null &&
        this.staff.sfcsOfficeID !== undefined
          ? this.staff.sfcsOfficeID.sfaofficeID
          : null;
      this.staff.separationDate =
        this.staff.separationDate !== null &&
        this.staff.separationDate !== undefined
          ? this.__localVlaues.stringFormatDatetime(this.staff.separationDate)
          : null;
      this.staff.uITrainingCompletedDate =
        this.staff.uITrainingCompletedDate !== null &&
        this.staff.uITrainingCompletedDate !== undefined
          ? this.__localVlaues.stringFormatDatetime(
              this.staff.uITrainingCompletedDate
            )
          : null;
      this.staff.beginDateForAll =
        this.staff.beginDateForAll !== null &&
        this.staff.beginDateForAll !== undefined
          ? this.__localVlaues.stringFormatDatetime(this.staff.beginDateForAll)
          : null;
      this.staff["entity"] = "Staff";
      //Data conversion end
      if (this.perosnWizardMode === "createNew") {
        let staffSaveReq = this.staff;
        let staffSaveRes = await this._cli.saveClient(staffSaveReq);
        if (staffSaveRes.responseStatus) {
          this.publishSFCSWorkerValueOnDD(staffSaveRes);
          this.staff = new StaffForm();
          this.isStaffDialogBox = false;
        } else {
          return swal(
            "Failed to save!",
            "Please contact administrator",
            "error"
          );
        }
      } else {
        let staffUpdateReq = this.staff;
        let staffUpdateRes = await this._cli.updateClient(staffUpdateReq);
        if (staffUpdateRes.responseStatus) {
          this.publishSFCSWorkerValueOnDD(staffUpdateRes);
          this.staff = new StaffForm();
          this.isStaffDialogBox = false;
        } else {
          return swal(
            "Failed to update!",
            "Please contact administrator",
            "error"
          );
        }
      }
    } else {
      return swal("Info", "Mandatory field missing!", "info");
    }
  }

  public publishSFCSWorkerValueOnDD(sfcsWokerObject: any) {
    sfcsWokerObject.staff[
      "fullName"
    ] = `${sfcsWokerObject.staff.lastName}, ${sfcsWokerObject.staff.firstName}`;
    return (this.ri.staffID = sfcsWokerObject.staff);
  }

  public onStaffFormCancel() {
    this.staff = new StaffForm();
    this.isStaffDialogBox = false;
  }

  public async getStaffFormDropdownValues(
    metaDataName: string,
    searchObject: any
  ) {
    let request = { Object: metaDataName, value: searchObject.query };
    let response = await this._caseTeam.getSearchList(request);
    if (metaDataName === "staff") {
      this.metaData = response.dropDown.filter(
        (item) => (item["fullName"] = `${item.lastName},${item.firstName}`)
      );
    } else {
      this.metaData = response.dropDown;
    }
  }

  public async getStaffDetailById(staffId: number) {
    let staffDetailRequest = { staffID: staffId };
    let staffDetailResponse = await this._cli.getDetailsById(
      staffDetailRequest
    );
    if (staffDetailResponse.responseStatus) {
      //Date conversion start
      staffDetailResponse.staff.uITrainingCompletedDate =
        staffDetailResponse.staff.uITrainingCompletedDate !== null &&
        staffDetailResponse.staff.uITrainingCompletedDate !== undefined
          ? new Date(staffDetailResponse.staff.uITrainingCompletedDate)
          : null;
      staffDetailResponse.staff.separationDate =
        staffDetailResponse.staff.separationDate !== null &&
        staffDetailResponse.staff.separationDate !== undefined
          ? new Date(staffDetailResponse.staff.separationDate)
          : null;
      staffDetailResponse.staff.beginDateForAll =
        staffDetailResponse.staff.beginDateForAll !== null &&
        staffDetailResponse.staff.beginDateForAll !== undefined
          ? new Date(staffDetailResponse.staff.beginDateForAll)
          : null;
      //Date conversion end
      //Data conversion start
      staffDetailResponse.staff.teamLeaderID =
        staffDetailResponse.staff.teamLeaderID !== null &&
        staffDetailResponse.staff.teamLeaderID !== undefined
          ? (staffDetailResponse.staff.teamLeaderID = {
              fullName: `${staffDetailResponse.staff.teamLeaderID.lastName},${staffDetailResponse.staff.teamLeaderID.firstName}`,
              staffID: staffDetailResponse.staff.teamLeaderID.staffID,
            })
          : null;
      //Data conversion end
      this.staff = staffDetailResponse.staff;
      console.log("Staff Detail after edit", this.staff);
      this.staffForm.disable();
      this.isStaffEditBtnController = true;
      this.isStaffDialogBox = true;
    } else {
      return swal(
        "Unable to process!",
        "Kindly contact your administrator",
        "error"
      );
    }
  }

  public onStaffEdit() {
    this.staffForm.enable();
    this.isStaffEditBtnController = false;
  }

  public familyMemebrCompCancel(event: any) {
    console.log("Family member cancel", event);
    this.hideModal();
    this.familyMemberComponent.familMember = new FamilyMember();
    this.isFamilyMemberComponent = false;
  }

  showModal() {
    $("#myModal").modal("show");
  }

  sendModal(): void {
    //do something here
    this.hideModal();
  }

  hideModal(): void {
    document.getElementById("close-modal").click();
  }
}
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
