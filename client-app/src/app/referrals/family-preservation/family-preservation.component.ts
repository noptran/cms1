import { Component, OnInit } from '@angular/core';
import { ReferralsService } from '../referrals.service';
import { Router } from '@angular/router';
import { ReferralViewService } from '../../referral-view/referral-view.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FamilyPreservation, FISMember, Mail, AcknowledgmentForm } from './family-preservation';
import { CaseTeamService } from '../../case-team/case-team.service';
import swal from 'sweetalert2';
import { ClildFormService } from '../../child-forms/child-forms.service';
import { OpencardsService } from '../../opecards-list-view/opencards.service';
import { isNull, isUndefined, isNullOrUndefined } from 'util';
import { RefNodeList } from './ref-node-list';
import * as moment from 'moment';
import {LocalValues} from '../../local-values';
import { NCFI } from './NCFI';
import { TeamFormService } from '../../team-form/team-form.service';

@Component({
  selector: "app-family-preservation",
  templateUrl: "./family-preservation.component.html",
  styleUrls: ["./family-preservation.component.scss"]
})
export class FamilyPreservationComponent implements OnInit {
  display: boolean = false;
  value: Date;
  fpRef: FamilyPreservation = new FamilyPreservation();
  mail: Mail = new Mail();
  fpAckForm: AcknowledgmentForm = new AcknowledgmentForm();
  refNodes: RefNodeList = new RefNodeList();

  isFpDetailsEntered: boolean = false;
  quickMenu = "Referrels";
  fpAckFormData: any;
  fpAckFormDataAutoFill: any;

  fpFis: FISMember = new FISMember();
  hourswitch: any;
  refSwitch: any;
  refReason: any;
  primaryRef = [];
  cards = [];
  formController: any;
  referralId: any;
  referralName: any;
  caseTitle: any;
  sIndex: number = null;
  mainTabs = [];
  alterMainTabs = [];
  fprefrralform: FormGroup;
  title = "Family preservation";
  status = "draft";
  edit = false;
  formStatus = true;
  text: any;
  referralID: any;
  metaData = [];
  dateValue: any;
  property: any;
  test: any;
  text_1: any;
  text_2: any;
  text_3: any;
  text_4: any;
  text_8: any;
  checked: any;
  val: any;
  breadcrumbs = [];
  openCards: any;
  clientName: any;
  clientID: any;
  subtitle: any = "";

  columnDefs = [];
  fisColumndefs = [];
  fisRowData = [];
  rowData = [];
  defaultColDef;
  rawData = [];
  headers = [];

  preSelectedFISClients = [];
  selectedFISClients = [];
  finalSelected = [];
  isMail = false;
  mailTo = [];
  mailCc = [];
  mailBcc = [];
  ackForm: any;
  btnLabel = "Add";
  selectedIndex: number;
  showFISMemberForm = false;
  fisForm: FormGroup;
  discardTo = "/reports/opencards/list/client/case";
  fisData: any;
  fisTableData = [];
  isReadOnlyClient = false;
  isDropdown = true;
  tabNavigateTo: String;
  tabStatus_1: String = "";
  tabStatus_2: String = "";
  tabStatus_3: String = "";
  tabStatus_4: String = "";
  tabStatus_2_1: String = "";
  isFormEditMode = false;
  caseTeamList: any;
  isShowAck: any;
  caseTeamData: any;
  url: any;
  isNcopsReferral = false;
  currentReferral: string;
  isAttachmentRequired = false;
  showMore = [];
  showMoreFamily = [];
  oldIDX: any;
  age: any;
  clientdob: any;
  display_open: boolean;
  isNCFIModeEnable = false;
  ncFIFormGroup: FormGroup;
  ncfi: NCFI = new NCFI();
  isWizard2Enable = false;
  referralTypeName: any;
  ncfiOpencards = [];
  iconurl = 'https://sfcsblobstorage.blob.core.windows.net/sfcsclientappexport/';
  referralTypeId: number;
  prtfOpencards = [];

  isFormLog = false;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: ''
  }

  constructor(public _team: TeamFormService, public _refferal: ReferralsService, public _CaseTeamService: CaseTeamService, public _router: Router, public _referralView: ReferralViewService, public _fb: FormBuilder,
    public _caseTeam: CaseTeamService, public _person: ClildFormService, public _opencards: OpencardsService, public _localValues: LocalValues) {
    this.cards = [
      { label: "card 1" },
      { label: "card 2" },
      { label: "card 3" },
      { label: "card 4" },
      { label: "card 5" },
      { label: "card 6" },
      { label: "card 7" },
      { label: "card 8" },
      { label: "card 9" },
      { label: "card 10" }
    ];
    this.defaultColDef = {
      width: 100,
      headerCheckboxSelection: this.isFirstColumn,
      checkboxSelection: this.isFirstColumn
    };
  }

  ngOnInit() {
    console.log("Selected referral type id is", parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey());
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencards.getHasKey()
    this.formValidation();
    this.clientDetails();
    if (this._router.url == "/reports/referral/family-preservation/detail") {
      this.verifyOtherReferrals();
      this.isFormEditMode = true;
      this.getReferralDetails();
      this.getCaseTeam();
      this.isAttachmentRequired = true;
    }

    if (this._router.url == "/reports/referral/family-preservation/new") {
      this.fpRef.referralDate = new Date(Date.now());
      this.fpRef.receivedDateTime = new Date(Date.now());
      this.ncfi.beginDate = new Date(Date.now());
    }

    this.breadcrumbs.push(
      { label: "List", href: "/reports/client", active: "" },
      { label: "Form", href: "/reports/client/details", active: "" },
      {
        label: "Case List",
        href: "/reports/opencards/list/client/case",
        active: ""
      },
      { label: "Case Form", active: "active" }
    );
    this.setIndex(0);
    this.referralTypeName = this._opencards.getOtherRefDetails().referralName;
    if (this.referralTypeName === 'FI') {
      this.isNCFIModeEnable = false;
    } else {
      this.isNCFIModeEnable = true;
      this.isWizard2Enable = true;
    }
    this.defineMainTabs();
    this.ncFIFormValidation();
    this.ncfiSubnodes();
    this.prtfOpencards.push(
      { title: 'Appointments', navigation: '/reintegration/referral/opencard/appointments/view', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Assessments', navigation: '/reports/referral/family-preservation/assessment/view', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Case Evaluation', navigation: '/reports/referral/family-preservation/case-evaluations/view', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Case File Activity', navigation: '/reintegration/referral/opencard/case-file-activity/view', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Case Team', navigation: '/reports/referral/family-preservation/case-team/view', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Court Orders', navigation: '/reports/referral/family-preservation/court-order/view', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Family', navigation: '/reports/family/view' },
      { title: 'School', navigation: '/reintegration/referral/opencard/school/dashboard' },
      { title: 'Medical', navigation: '/prtf/medical' }
    )
  }

  clientDetails() {
    const req = { clientID: parseInt(localStorage.getItem('clientId')) - this._opencards.getHasKey() };
    this._person.getDetailsById(req).then(data => {
      let diff = Date.now() - data.person.dob;
      let age = new Date(diff);
      this.selectedFISClients.push({
        clientID: {
          clientID:
            parseInt(localStorage.getItem("clientId")) -
            this._opencards.getHasKey(),
          clientName: localStorage.getItem("clientName"),
          dob: !isNullOrUndefined(data.person.dob) ? data.person.dob : null,
          age: !isNullOrUndefined(data.person.dob) ? Math.abs(age.getUTCFullYear() - 1970) : null,
        },
        isCaseHead: false,
        personTypeID: false,
        pws: false
      });
    })
  }
  isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  /**
   * Form  validation
   */
  formValidation() {
    this.fprefrralform = this._fb.group({
      // [null, Validators.compose([Validators.required])],
      // 'facts': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      facts: [null],
      primary_ref_reason: [null, Validators.compose([Validators.required])],
      county: [null, Validators.compose([Validators.required])],
      personID: [null, Validators.compose([Validators.required])],
      dcfPersonID: [null, Validators.compose([Validators.required])],
      personTypeID: [null, Validators.compose([Validators.required])],
      dateOfNotification: [null],
      referralDate: [null, Validators.compose([Validators.required])],
      onRadar: [null],
      mma: [null],
      numberLivingInHousehold: [null],
      secondary_ref_reason: [null],
      family_being_referred: [null],
      office_file: [null, Validators.compose([Validators.required])],
      "24_hours_date": [null],
      "48_hours_date": [null],
      file_issue_date: [null, Validators.compose([Validators.required])],
      file_staff: [null, Validators.compose([Validators.required])],
      "24_hours_staff": [null],
      "48_hour_staff": [null],
      annual_household_Income: [null],
      number_LivingIn_Household: [null],
      is_Single_ParentHousehold: [null],
      family_Refuse: [null],
      referral_closure_reason: [null],
      case_payor: [null],
      referral_closure_date: [null],
      withdraw_reason: [null],
      notes: [null],
      client_name: [null],
      client_hoh: [null],
      client_adult: [null],
      client_pws: [null],
      referral_withdrwal_date: [null],
      family_Refused: [null],

    });
    this.fisForm = this._fb.group({
      client_name: [null],
      client_hoh: [null],
      client_adult: [null],
      client_pws: [null]
    });
  }

  /**
   * @return to the referral main view
   */
  formBack() {
    return this._router.navigateByUrl("/reports/referral/view");
  }

  showDialog() {
    this.display = true;
    this.isFpDetailsEntered = true;
  }

  hourSwitch(event) {
    let hour_24_date,
      hour_24_staff,
      hour_48_date,
      hour_48_staff,
      hour_24_btn,
      hour_48_btn;
    hour_24_date = document.getElementById("24_hour_date") as HTMLInputElement;
    hour_48_date = document.getElementById("48_hour_date") as HTMLElement;
    hour_24_staff = document.getElementById("24_hour_staff") as HTMLElement;
    hour_48_staff = document.getElementById("48_hour_staff") as HTMLElement;
    hour_24_btn = document.getElementById("24_hour_btn") as HTMLElement;
    hour_48_btn = document.getElementById("48_hour_btn") as HTMLElement;
    this.hourswitch = event.target.innerText;
    if (this.hourswitch == "24 hour date") {
      hour_48_date.style.display = "none";
      hour_48_staff.style.display = "none";
      hour_24_date.style.display = "block";
      hour_24_staff.style.display = "block";
      hour_24_btn.style.background = "#dfe9f5";
      hour_48_btn.style.background = "none";
    } else {
      hour_24_date.style.display = "none";
      hour_24_staff.style.display = "none";
      hour_48_date.style.display = "block";
      hour_48_staff.style.display = "block";
      hour_48_btn.style.background = "#dfe9f5";
      hour_24_btn.style.background = "none";
    }
  }

  referralSwitch(event) {
    let ref_closure, ref_withdraw, ref_closure_btn, ref_withdraw_btn;
    ref_closure = document.getElementById("ref_closure") as HTMLElement;
    ref_withdraw = document.getElementById("ref_withdraw") as HTMLElement;
    ref_closure_btn = document.getElementById("ref_closure_btn") as HTMLElement;
    ref_withdraw_btn = document.getElementById(
      "ref_withdraw_btn"
    ) as HTMLElement;
    this.refSwitch = event.target.innerText;
    if (this.refSwitch == "Referral closure") {
      ref_closure.style.display = "block";
      ref_withdraw.style.display = "none";
      ref_closure_btn.style.background = "#dfe9f5";
      ref_withdraw_btn.style.background = "none";
    } else {
      ref_closure.style.display = "none";
      ref_withdraw.style.display = "block";
      ref_closure_btn.style.background = "none";
      ref_withdraw_btn.style.background = "#dfe9f5";
    }
  }

  refferalReasonSwitch(event) {
    let ref_reason, ref_reason_txt;
    ref_reason = document.getElementById("ref_reason") as HTMLElement;
    ref_reason_txt = document.getElementById("ref_reason_txt") as HTMLElement;

    this.refReason = event.target.innerText;
    if (this.refReason == "+ Add reason for family being referral") {
      ref_reason_txt.innerText = "- Add reason for family being referral";
      ref_reason.style.display = "block";
    } else {
      ref_reason_txt.innerText = "+ Add reason for family being referral";
      ref_reason.style.display = "none";
    }
  }

  familyIncomSwitch() {
    let single_parent, family_refuse;
    single_parent = document.getElementById("single_parent") as HTMLElement;
    family_refuse = document.getElementById("family_refuse") as HTMLElement;
  }

  referralInfoSwitch(event) {
    let notes_area, note_btn;
    notes_area = document.getElementById("notes_area") as HTMLElement;
    note_btn = document.getElementById("add_notes") as HTMLElement;
    if (event.target.innerText == "+ Add notes") {
      note_btn.innerText = "- Add notes";
      notes_area.style.display = "block";
    } else {
      note_btn.innerText = "+ Add notes";
      notes_area.style.display = "none";
    }
  }

  defineCaseTitle(referralType) {
    let title;
    switch (referralType) {
      case "FP":
        title = "Family Preservation";
        break;
      case "RFC":
        title = "Reintegration Foster Care";
        break;
      case "FC":
        title = "Reintegration Foster Care";
        break;
      case "JJFC":
        title = "Juvenile Justice Foster Care";
        break;
      case "FI":
        title = "Family Preservation (IN-Home)";
        break;
      case "FO":
        title = "Family Preservation (OUT-Home)";
        break;
    }
    return (this.caseTitle = title);
  }

  /**
   * Define main tabs
   */
  defineMainTabs() {
    console.log("this.isNCFIModeEnable is", this.isNCFIModeEnable);
    console.log("this.isWizard2Enable is", this.isWizard2Enable);
    if (!this.isNCFIModeEnable && !this.isWizard2Enable) {
      return (this.mainTabs = [
        { label: "Select FIS Member", href: "#nav-sec1" },
        { label: "Time of Referral", href: "#nav-sec2" },
        { label: "Initial Meeting", href: "#nav-sec3" }
        // { label: 'Section 3', href: '#nav-sec4' },
      ]);
    } else {
      return (this.mainTabs = [
        { label: "Select FIS Member", href: "#nav-sec1" },
        { label: "Wizard 2", href: "#nav-wiz3" },
        { label: "Time of Referral", href: "#nav-sec2" },
        { label: "Initial Meeting", href: "#nav-sec3" }
      ]);
    }
  }

  /**
   * Define main tabs
   */
  defineMainTabsAlter() {
    return (this.alterMainTabs = [
      { label: "Section 1", href: "#nav-sec2" },
      { label: "Section 2", href: "#nav-sec3" },
      { label: "Section 3", href: "#nav-sec4" }
    ]);
  }

  referralConditionCheckForIndex(index: any) {
    let condition_1: any, // Atleast one child in the list
      condition_2: any, // HoH must be adult
      condition_3: any, // PWS client shoulbe adult and HOH
      condition_4: any,
      condition_2_count = 0,
      condition_3_count = 0;
    if (index !== 0) {
      if (this.selectedFISClients.length === 1) {
        if (this.selectedFISClients[0].isPWSChild === true) {
          if (this.selectedFISClients[0].isCaseHead == true) {
            if (
              this.selectedFISClients[0].personTypeID === true ||
              this.selectedFISClients[0].personTypeID === "Adult"
            ) {
              condition_3_count++;
              condition_3 = true;
            }
          }
        }

        if (condition_3 !== true) {
          index = 0;
          swal(
            "Not allowed",
            "You must enter at least one child in the case!",
            "info"
          );
        }
        if (condition_3_count > 1) {
          index = 0;
          if (this.isNCFIModeEnable && this.isWizard2Enable) {
            swal("Not allowed", "Only one 'No Child In Home' is allowed!", "info");
          }
          swal("Not allowed", "Only one PWS is allowed!", "info");
        }
      } else if (this.selectedFISClients.length > 1) {
        this.selectedFISClients.filter((item: any) => {
          if (item.isCaseHead === true) {
            if (item.personTypeID === true || item.personTypeID === "Adult") {
              condition_2_count++;
              condition_2 = true;
            }
          }
          if (item.isCaseHead === true) {
            if (item.personTypeID === false) {
              condition_4 = false;
            }
          }
          if (item.personTypeID !== true || item.personTypeID === "Youth") {
            condition_1 = true;
          }
          if (item.isPWSChild === true) {
            condition_3_count++;
          }
        });
        if (condition_2 !== true || condition_4 === false) {
          index = 0;
          return swal(
            "Not allowed",
            "You must enter a HOH that is an adult!",
            "info"
          );
        }
        if (condition_2_count > 1) {
          index = 0;
          return swal("Not allowed", "Only one HOH is allowed!", "info");
        }
        if (condition_1 !== true) {
          index = 0;
          return swal(
            "Not allowed",
            "You must enter at least one child in the case!",
            "info"
          );
        }
        if (condition_3_count > 1) {
          index = 0;
          if (this.isNCFIModeEnable && this.isWizard2Enable) {
            return swal("Not allowed", "Only one 'No Child In Home' is allowed!", "info");
          }
          return swal("Not allowed", "Only one PWS is allowed!", "info");
        }
      } else {
      }
    }
    if (!this.isNCFIModeEnable && !this.isWizard2Enable) {
      switch (index) {
        case 0:
          this.tabStatus_1 = "active in";
          this.tabStatus_2 = "";
          this.tabStatus_3 = "";
          this.tabStatus_4 = "";
          this.tabNavigateTo = "#nav-sec1";
          break;
        case 1:
          this.tabStatus_2 = "active in";
          this.tabStatus_3 = "";
          this.tabStatus_1 = "";
          this.tabStatus_4 = "";
          this.tabNavigateTo = "#nav-sec2";
          break;
        case 2:
          this.tabStatus_3 = "active in";
          this.tabStatus_2 = "";
          this.tabStatus_1 = "";
          this.tabStatus_4 = "";
          this.tabNavigateTo = "#nav-sec3";
          break;
        case 3:
          this.tabStatus_4 = "active in";
          this.tabStatus_2 = "";
          this.tabStatus_1 = "";
          this.tabStatus_3 = "";
          this.tabNavigateTo = "#nav-sec4";
          break;
      }
    } else {
      switch (index) {
        case 0:
          this.tabStatus_1 = "active in";
          this.tabStatus_2 = "";
          this.tabStatus_2_1 = "";
          this.tabStatus_3 = "";
          this.tabStatus_4 = "";
          this.tabNavigateTo = "#nav-sec1";
          break;
        case 1:
          this.tabStatus_2_1 = "active in";
          this.tabStatus_2 = "";
          this.tabStatus_3 = "";
          this.tabStatus_1 = "";
          this.tabStatus_4 = "";
          this.tabNavigateTo = "#nav-wiz3";
          break;
        case 2:
          this.tabStatus_2 = "active in";
          this.tabStatus_2_1 = "";
          this.tabStatus_1 = "";
          this.tabStatus_4 = "";
          this.tabStatus_3 = "";
          this.tabNavigateTo = "#nav-sec3";
          break;
        case 3:
          this.tabStatus_3 = "active in";
          this.tabStatus_2 = "";
          this.tabStatus_2_1 = "";
          this.tabStatus_1 = "";
          this.tabStatus_4 = "";
          this.tabNavigateTo = "#nav-sec4";
          break;
      }
      if (index == 2) {
        if (!this.ncFIFormGroup.valid) {
          this.tabStatus_2_1 = "active in";
          this.tabStatus_2 = "";
          this.tabStatus_3 = "";
          this.tabStatus_1 = "";
          this.tabStatus_4 = "";
          this.tabNavigateTo = "#nav-wiz3";
          return swal('Info', 'Please fill the mandatory fields!', 'info');

        }
      }
    }

    this.sIndex = index;
  }

  referralConditionCheckForSave(): Promise<any> {
    let condition_1: any, // Atleast one child in the list
      condition_2: any, // HoH must be adult
      condition_3: any, // PWS client shoulbe adult and HOH
      condition_4: any,
      condition_2_count = 0,
      condition_3_count = 0;

    if (this.selectedFISClients.length === 1) {
      if (this.selectedFISClients[0].isPWSChild === true) {
        if (this.selectedFISClients[0].isCaseHead == true) {
          if (
            this.selectedFISClients[0].personTypeID === true ||
            this.selectedFISClients[0].personTypeID === "Adult"
          ) {
            condition_3_count++;
            condition_3 = true;
          }
        }
      }

      if (condition_3 !== true) {
        swal(
          "Not allowed",
          "You must enter at least one child in the case!",
          "info"
        );
      } else if (condition_3_count > 1) {
        swal("Not allowed", "Only one PWS is allowed!", "info");
      } else {
        return Promise.resolve({ data: "conditons are passed" });
      }
    } else if (this.selectedFISClients.length > 1) {
      this.selectedFISClients.filter((item: any) => {
        if (item.isCaseHead === true) {
          if (item.personTypeID === true || item.personTypeID === "Adult") {
            condition_2_count++;
            condition_2 = true;
          }
        }
        if (item.isCaseHead === true) {
          if (item.personTypeID === false) {
            condition_4 = false;
          }
        }
        if (item.personTypeID !== true || item.personTypeID === "Youth") {
          condition_1 = true;
        }
        if (item.isPWSChild === true) {
          condition_3_count++;
        }
      });
      if (condition_2 !== true || condition_4 === false) {
        return swal(
          "Not allowed",
          "You must enter a HOH that is an adult!",
          "info"
        );
      } else if (condition_2_count > 1) {
        return swal("Not allowed", "Only one HOH is allowed!", "info");
      } else if (condition_1 !== true) {
        return swal(
          "Not allowed",
          "You must enter at least one child in the case!",
          "info"
        );
      } else if (condition_3_count > 1) {
        return swal("Not allowed", "Only one PWS is allowed!", "info");
      } else {
        return Promise.resolve({ data: "condition are passed" });
      }
    } else {
    }
  }

  /**
   *
   * @param index index value of tab
   */
  setIndex(index: number) {
    /** Condition check : client length must be greater than zero excluding default clinet */
    this.referralConditionCheckForIndex(index);
  }

  /***
   * Metadata configuration
   */
  getMetaData(event, label) {
    let reqObject: any,
      req: any,
      nameFields = ["firstName", "lastName"],
      email: any;
    switch (label) {
      case "primary_ref_reason":
        reqObject = "referralReason";
        break;
      case "secondary_ref_reason":
        reqObject = "referralReason";
        break;
      case "county":
        reqObject = "county";
        break;
      case "sfcs_worker":
        reqObject = "staff";
        break;
      case "dcf_worker":
        reqObject = "srsStaff";
        break;
      case "case_manager_type":
        this.getCaseManagerType("personType", event);
        break;
      case "file_staff":
        reqObject = "staff";
        break;
      case "24_hour_staff":
        reqObject = "staff";
        break;
      case "48_hour_staff":
        reqObject = "staff";
        break;
      case "referral_closure_reason":
        reqObject = "closureReason";
        break;
      case "case_payor":
      case "payor":
        reqObject = "payor";
        break;
      case "client":
        reqObject = "client";
        break;
      case 'procode':
        reqObject = 'procode';
        break;
    }
    if (reqObject) {
      req = { Object: reqObject, value: event.query };
      this._caseTeam.getSearchList(req).then(data => {
        data.dropDown.map(item => {
          nameFields.map(check => {
            if (Object.keys(item).includes(check)) {
              email = !isNullOrUndefined(item.email)
                ? item.email
                : "Email not provided!";
              item["fullName"] =
                item.firstName + " " + item.lastName + " ( " + email + " ) ";
            }
          });
        });
        if (label == 'procode') {
          data.dropDown.map((item: any) => {
            item['display'] = `${item.srsprocode} - ${item.categoryOfService}`;
          })
        }
        if (label === 'payor') {
          data.dropDown.map((item: any) => {
            item['payorDisplay'] = `${item.payorName} - ${item.alias}`;
          })
        }
        this.metaData = data.dropDown;
      });
    }
  }

  getCaseManagerType(reqObject, event) {
    let req = { Object: reqObject, value: event.query };
    this._caseTeam.getSearchList(req).then(data => {
      this.metaData = data.dropDown.filter((item) => {
        return item.personType === 'Therapist - Case Manager' || item.personType === 'Family Support Worker' || item.personType === 'FP Case Manager' || item.personType === 'Masters Student'
      })
    })
  }
  /**
   * Get referrl details baed on referrl ID
   * @param refID referral ID
   */
  getReferralDetails() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    let clientDetails;
    let req, referralID, refferal;
    loader.style.display = "block";
    referralID =
      parseInt(localStorage.getItem("referralId")) -
      this._opencards.getHasKey();
    req = { referralID: referralID };
    this.fprefrralform.controls["referralDate"].disable();
    this._referralView.getReferralRecById(req).then(data => {

      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.referral.changedBy) ? data.referral.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.referral.changedDate) ? moment(data.referral.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.referral.enteredBy) ? data.referral.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.referral.enteredDate) ? moment(data.referral.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';


      this._localValues.caseID = !isNullOrUndefined(data.referral.caseID.caseID) ? data.caseID = data.referral.caseID.caseID : null;
      if (data.referral.closureDate) {
        this.isMail = true;
      } else {
        this.isMail = false;
      }
      this.isFpDetailsEntered = true;
      this.fpAckFormData = data;
      this.fisData = data.fis;
      this.fisData.map(data => {
        let diff = Date.now() - data.dob;
        let age = new Date(diff);

        if (data.clientID !== null && data.clientName !== null) {
          let fisObj = {
            clientID: {
              clientID: !isNullOrUndefined(data.clientID) ? data.clientID = data.clientID : null,
              clientName: !isNullOrUndefined(data.clientName) ? data.clientName = data.clientName : null,
              dob: !isNullOrUndefined(data.dob) ? data.dob = data.dob : null,
              age: !isNullOrUndefined(data.dob) ? Math.abs(age.getUTCFullYear() - 1970) : null,
            },
            isCaseHead: !isNullOrUndefined(data.isCaseHead)
              ? (data.isCaseHead = data.isCaseHead)
              : null,
            personTypeID: !isNullOrUndefined(data.personTypeID)
              ? (data.personTypeID = data.personTypeID)
              : null,
            isPWSChild: !isNullOrUndefined(data.isPWSChild)
              ? (data.isPWSChild = data.isPWSChild)
              : null
          };
          this.fisTableData.push(fisObj);
        }
      });
      this.selectedFISClients = this.fisTableData;
      if (data.referral.isActive) {
        !isNull(data.referral.receivedDateTime) &&
          !isUndefined(data.referral.receivedDateTime)
          ? data.referral.receivedDateTime = new Date(data.referral.receivedDateTime)
          : null;
        !isNull(data.referral.referralDate) &&
          !isUndefined(data.referral.referralDate)
          ? data.referral.referralDate = new Date(data.referral.referralDate)
          : null;
        !isNull(data.referral.fileIssueDate) &&
          !isUndefined(data.referral.fileIssueDate)
          ? data.referral.fileIssueDate = new Date(data.referral.fileIssueDate)
          : null;
        !isNull(data.referral.fp24HrContactDate) &&
          !isUndefined(data.referral.fp24HrContactDate)
          ? data.referral.fp24HrContactDate = new Date(data.referral.fp24HrContactDate)
          : null;
        !isNull(data.referral.fp48HrContactDate) &&
          !isUndefined(data.referral.fp48HrContactDate)
          ? data.referral.fp48HrContactDate = new Date(data.referral.fp48HrContactDate)
          : null;
        !isNull(data.referral.closureDate) &&
          !isUndefined(data.referral.closureDate)
          ? data.referral.closureDate = new Date(data.referral.closureDate)
          : null;
        !isNull(data.referral.withDrawDate) &&
          !isUndefined(data.referral.withDrawDate)
          ? data.referral.withDrawDate = new Date(data.referral.withDrawDate)
          : null;
      } else {
        !isNull(data.referral.receivedDateTime) &&
          !isUndefined(data.referral.receivedDateTime)
          ? data.referral.receivedDateTime = moment.utc(data.referral.receivedDateTime).format("MM/DD/YYYY")
          : null;
        !isNull(data.referral.referralDate) &&
          !isUndefined(data.referral.referralDate)
          ? data.referral.referralDate = moment.utc(data.referral.referralDate).format("MM/DD/YYYY HH:mm")
          : null;
        !isNull(data.referral.fileIssueDate) &&
          !isUndefined(data.referral.fileIssueDate)
          ? data.referral.fileIssueDate = moment.utc(data.referral.fileIssueDate).format("MM/DD/YYYY")
          : null;
        !isNull(data.referral.fp24HrContactDate) &&
          !isUndefined(data.referral.fp24HrContactDate)
          ? data.referral.fp24HrContactDate = moment.utc(data.referral.fp24HrContactDate).format("MM/DD/YYYY HH:mm")
          : null;
        !isNull(data.referral.fp48HrContactDate) &&
          !isUndefined(data.referral.fp48HrContactDate)
          ? data.referral.fp48HrContactDate = moment.utc(data.referral.fp48HrContactDate).format("MM/DD/YYYY HH:mm")
          : null;
        !isNull(data.referral.closureDate) &&
          !isUndefined(data.referral.closureDate)
          ? data.referral.closureDate = moment.utc(data.referral.closureDate).format("MM/DD/YYYY HH:mm")
          : null;
        !isNull(data.referral.withDrawDate) &&
          !isUndefined(data.referral.withDrawDate)
          ? data.referral.withDrawDate = moment.utc(data.referral.withDrawDate).format("MM/DD/YYYY HH:mm")
          : null;
        localStorage.setItem(
          "referralTypeId",
          data.referral.referralTypeID.referralTypeID +
          this._opencards.getHasKey()
        );
      }

      data.referral.facts = data.referral.caseID.facts;
      data.referral.countyID = data.referral.caseID.clientID.countyID;
      data.referral.payorID = data.referral.caseID.payorID;

      !isNullOrUndefined(data.referral.file_StaffID)
        ? (data.referral.file_StaffID["fullName"] =
          data.referral.file_StaffID.lastName +
          " " +
          data.referral.file_StaffID.firstName)
        : null;
      !isNullOrUndefined(data.referral.fp24Hr_StaffID)
        ? (data.referral.fp24Hr_StaffID["fullName"] =
          data.referral.fp24Hr_StaffID.lastName +
          " " +
          data.referral.fp24Hr_StaffID.firstName)
        : null;
      !isNullOrUndefined(data.referral.fp48Hr_StaffID)
        ? (data.referral.fp48Hr_StaffID["fullName"] =
          data.referral.fp48Hr_StaffID.lastName +
          " " +
          data.referral.fp48Hr_StaffID.firstName)
        : null;

      !isNullOrUndefined(data.dcfPersonID)
        ? (data.referral["dcfPersonID"] = data.dcfPersonID)
        : null;
      !isNullOrUndefined(data.referral.dcfPersonID)
        ? (data.referral.dcfPersonID["fullName"] =
          data.referral.dcfPersonID.lastName +
          " " +
          data.referral.dcfPersonID.firstName)
        : null;

      !isNullOrUndefined(data.personID)
        ? (data.referral["personID"] = data.personID)
        : null;
      !isNullOrUndefined(data.referral.personID)
        ? (data.referral.personID["fullName"] =
          data.referral.personID.lastName +
          " " +
          data.referral.personID.firstName)
        : null;

      !isNullOrUndefined(data.personTypeID)
        ? (data.referral["personTypeID"] = data.personTypeID)
        : null;
      !isNullOrUndefined(data.referral.personTypeID)
        ? (data.referral.personTypeID = data.referral.personTypeID)
        : null;

      data.countyID.length > 0
        ? (data.referral["countyID"] = data.countyID)
        : null;
      data.referral.countyID.length > 0
        ? (data.referral.countyID = data.referral.countyID[0].countyID)
        : null;

      loader.style.display = "none";
      this.edit = true;
      this.fprefrralform.disable();
      this.fpRef = data.referral;
      clientDetails = data.referral.caseID;
      let hoh,
        kaecses,
        dob,
        lastName,
        firstName,
        fullName,
        facts,
        pwsChild = [];
      data.fis.filter(item => {
        if (item.isCaseHead === true) {
          hoh = item.clientName;
          fullName = item.clientName.split(",");
          lastName = fullName[0];
          firstName = fullName[1];
          kaecses = item.kaecses;
          dob = item.dob;
          facts = item.facts;
        }
        if (item.isPWSChild === true) {
          pwsChild.push(item);
        }
      });

      this.ackForm = {
        clientId: clientDetails.clientID.clientID,
        clientName:
          clientDetails.clientID.lastName +
          " " +
          clientDetails.clientID.firstName,
        isNotLiveBrith: clientDetails.clientID.isNotLiveBirth,
        gender: clientDetails.clientID.genderID.gender,
        race: !isNullOrUndefined(clientDetails.clientID.raceID)
          ? clientDetails.clientID.raceID.race
          : null,
        ethinicity: !isNullOrUndefined(clientDetails.clientID.ethnicityID)
          ? clientDetails.clientID.ethnicityID.ethnicity
          : null,
        tribe: !isNullOrUndefined(clientDetails.clientID.tribeID)
          ? clientDetails.clientID.tribeID.tribe
          : null,
        caseHead: hoh,
        toPerson: data.dcfPersonID.lastName + " , " + data.dcfPersonID.firstName,
        factsCase: kaecses,
        facts: facts,
        hohDob: dob,
        referralDate: data.referral.referralDate,
        region: data.countyID[0].countyID.sfaofficeID.officeName,
        dcfMail: data.personID.email,
        fullName: lastName + "_" + firstName,
        countyName: !isNullOrUndefined(data.countyID[0].countyID)
          ? data.countyID[0].countyID.countyCode
          : null,
        sub: "ACK(CASE,CLOSE)",
        staffSub: `Closure of FP Referral Has Been Entered For Client ${firstName +
          "," +
          lastName}`,
        pwsChild: pwsChild,
        caseClosureSectionfive: !isNullOrUndefined(data.referral.closureReasonID) ? data.referral.closureReasonID.closureReason : null,
        closureDate: data.referral.closureDate,
        isCaseClosureSectionfive: true,
        message: `Closure of FP Referral for client ${lastName + "," +
          firstName} ( ${kaecses} ) has been entered on ${moment(Date.parse(data.referral.closureDate)).format('MM-DD-YYYY HH:mm')}
        by ${data.referral.enteredBy}.
        Closure Reason: Child(ren) Removed From Home`,
        enteredBy: data.referral.enteredBy
      };
      localStorage.setItem("ackform", JSON.stringify(this.ackForm));
      this.referralTypeName = this._opencards.getOtherRefDetails().referralName;
      this.isNCFIModeEnable = false;
      this.isWizard2Enable = false;
      this.defineMainTabs();
    });
  }

  /** Generating the client list */
  generateClientList() {
    let req,
      rowData = [],
      test = [];
    req = {
      filter: "client",
      "group by": "All",
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "ClientID", mode: "desc" }
    };
    this._person.getPerson(req).then(data => {
      this.rowData = data["childList"];
      this.rowData.map(data => {
        data.DOB !== null && data.DOB !== 0
          ? (data.DOB = new Date(data.DOB))
          : null;
        rowData.push(data);
      });
      this.headers.push(Object.keys(this.rowData[0]));
      this.headers[0].forEach(function (result) {
        let data = {
          headerName: result
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace(/([A-Z])/g, " $1")
            .trim(),
          field: result
        };
        test.push(data);
      });
      this.rawData.push(test);
      this.columnDefs = this.rawData[0];
    });
  }

  addFISMember() {
    this.generateClientList();
  }
  getCaseTeam() {
    let req = {
      authorizationID:
        parseInt(localStorage.getItem("authorizationId")) -
        this._opencards.getHasKey()
    };
    this._CaseTeamService.getCaseManagerList(req).then(data => {
      this.caseTeamList = data.caseManagerList.filter(item => {
        if (
          item.PersonType === "Therapist - Case Manager" ||
          item.PersonType === "Supervisor" ||
          item.PersonType === "FP Case Manager" ||
          item.PersonType === "Masters Student"
        ) {
          return item;
        }
      });
    });
  }
  onRowSelected(event) {
    this.preSelectedFISClients.push(event);
  }

  finaliseFISClientList() { }

  onRowFISSelected(event) {
    this.finalSelected.push(event);
  }

  /**
   *
   * @param event click event
   * @param source referral date
   */
  saveForm(source) {
    if (this.fprefrralform.valid) {
      let fisMembers = [];
      source.clientID =
        parseInt(localStorage.getItem("clientId")) -
        this._opencards.getHasKey();
      source.referralReasonID =
        source.referralReasonID !== null &&
          source.referralReasonID !== undefined
          ? source.referralReasonID.referralReasonID
          : null;
      source.countyID =
        source.countyID !== null && source.countyID !== undefined
          ? source.countyID.countyID
          : null;
      source.personID =
        source.personID !== null && source.personID !== undefined
          ? source.personID.staffID
          : null;
      source.fp24Hr_StaffID =
        source.fp24Hr_StaffID !== null && source.fp24Hr_StaffID !== undefined
          ? source.fp24Hr_StaffID.staffID
          : null;
      source.fp48Hr_StaffID =
        source.fp48Hr_StaffID !== null && source.fp48Hr_StaffID !== undefined
          ? source.fp48Hr_StaffID.staffID
          : null;
      source.closureReasonID =
        source.closureReasonID !== null && source.closureReasonID !== undefined
          ? source.closureReasonID.closureReasonID
          : null;
      source.payorID =
        source.payorID !== null && source.payorID !== undefined
          ? source.payorID.payorID
          : null;
      source.personTypeID =
        source.personTypeID !== null && source.personTypeID !== undefined
          ? source.personTypeID.personTypeID
          : null;
      source.file_StaffID =
        source.file_StaffID !== null && source.file_StaffID !== undefined
          ? source.file_StaffID.staffID
          : null;
      source.dcfPersonID =
        source.dcfPersonID !== null && source.dcfPersonID !== undefined
          ? source.dcfPersonID.srsstaffID
          : null;
      source.referralReasonID_Secondary =
        source.referralReasonID_Secondary !== null &&
          source.referralReasonID_Secondary !== undefined
          ? source.referralReasonID_Secondary.referralReasonID
          : null;

      source.receivedDateTime =
        source.receivedDateTime !== null &&
          source.receivedDateTime !== undefined
          ? new Date(source.receivedDateTime).getTime()
          : null;
      source.referralDate =
        source.referralDate !== null && source.referralDate !== undefined
          ? new Date(source.referralDate).getTime()
          : null;
      source.fileIssueDate =
        source.fileIssueDate !== null && source.fileIssueDate !== undefined
          ? new Date(source.fileIssueDate).getTime()
          : null;
      source.fp24HrContactDate =
        source.fp24HrContactDate !== null &&
          source.fp24HrContactDate !== undefined
          ? new Date(source.fp24HrContactDate).getTime()
          : null;
      source.fp48HrContactDate =
        source.fp48HrContactDate !== null &&
          source.fp48HrContactDate !== undefined
          ? new Date(source.fp48HrContactDate).getTime()
          : null;
      source.closureDate =
        source.closureDate !== null && source.closureDate !== undefined
          ? new Date(source.closureDate).getTime()
          : null;
      source.withDrawDate =
        source.withDrawDate !== null && source.withDrawDate !== undefined
          ? new Date(source.withDrawDate).getTime()
          : null;
      if (this.referralTypeName === 'NC-FI') {
        source.referralTypeID = 5
      } else {
        source.referralTypeID = 2
      }

      // let floatA = parseInt(source.mma).toFixed(2) ;
      // floatA.replace(/"(.+)"/g, '$1');
      // !isNullOrUndefined(source.mma) ? source.mma = floatA  : null;
      // !isNullOrUndefined(source.officeFile) ? source.officeFile = eval (parseInt(source.officeFile).toFixed(2)) : null;

      // this.selectedFISClients.filter((item: any) => {
      //   fisMembers.push(
      //     { clientID: item.clientID.clientID,
      //        isCaseHead: item.isCaseHead,
      //        personTypeID: item.personTypeID ? 'Adult' : null,
      //        pws: item.isPWSChild });
      // })

      this.selectedFISClients.filter((item: any) => {
        // if (item.clientID.clientName == localStorage.getItem('clientName')) {
        //   console.log("default client eliminated")
        //   console.log("item.clientID.clientName is", item.clientID.clientName)
        //   console.log("localStorage.getItem('clientName')", localStorage.getItem('clientName'))
        // }
        // else {
        fisMembers.push({
          clientID: item.clientID.clientID,
          isCaseHead: item.isCaseHead,
          personTypeID: item.personTypeID,
          isPWSChild: item.isPWSChild
        });
        // }
      });
      !isNullOrUndefined(source.caseID)
        ? (source.caseID = source.caseID.caseID)
        : null;
      source.fis = fisMembers;

      //
      const staffId = localStorage.getItem('UserId');
      if (localStorage.getItem('UserId')) {
        this._team.getUserById({ staffID: parseInt(staffId) }).then(data => {
          source.enteredBy = data.users.lastName + ' ' + data.users.firstName;

          this.referralConditionCheckForSave()
            .then(() => {
              source.referralID ? this.update(source) : this.save(source);
            })
            .catch(() => {
              console.log("Error log");
            });
        });
      }
      else {
        source.enteredBy = "Admin"
        this.referralConditionCheckForSave()
          .then(() => {
            source.referralID ? this.update(source) : this.save(source);
          })
          .catch(() => {
            console.log("Error log");
          });
      }

    } else {
      swal("Warning", "Please fill the mandatory fields", "warning");
    }
  }

  save(source: any) {

    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._refferal.familyPreservationPost(source).then(data => {
      this.isFpDetailsEntered = true;
      if (data.responseStatus) {
        loader.style.display = "none";
        if (this.referralTypeName !== 'NC-FI') {
          swal(
            "Success",
            "Family preservation referral has been saved!",
            "success"
          );
        }

        this.edit = true;
        this.fprefrralform.disable();
        this._router.navigate(["/reports/opencards/list/client/case"]);
      }
      if (this.isNCFIModeEnable) {


        this.ncfi.notes = data.referral.notes;
        this.ncfi.referralID = data.referral.referralID
        this.ncfi.referralEventTypeID = 4;
        this.ncfi.eventClosureReasonID = null;
        !isNullOrUndefined(this.ncfi.beginDate) ? this.ncfi.beginDate = new Date(this.ncfi.beginDate).getTime() : this.ncfi.beginDate = null;
        !isNullOrUndefined(this.ncfi.endDate) ? this.ncfi.endDate = new Date(this.ncfi.endDate).getTime() : this.ncfi.endDate = null;
        !isNullOrUndefined(this.ncfi.payorID) ? this.ncfi.payorID = this.ncfi.payorID.payorID : this.ncfi.payorID = null;
        !isNullOrUndefined(this.ncfi.procodeID) ? this.ncfi.procodeID = this.ncfi.procodeID.procodeID : this.ncfi.procodeID = null;
        this._opencards.saveServiceAgreement(this.ncfi).then((data: any) => {
          if (data.responseStatus) {
            swal('Save!', 'NCFI Referral Program Saved!', 'success');
          } else {
            swal('Something went wrong!', 'Please try again later', 'error');
          }
        })
      }
    });
  }

  update(source: any) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._refferal.familyPreservationUpdate(source).then(data => {
      this.isFpDetailsEntered = true;
      if (data.responseStatus) {
        loader.style.display = "none";
        swal(
          "Success",
          "Family preservation referral has been updated!",
          "success"
        );
        this.edit = true;
        this.fprefrralform.disable();
        this._router.navigate(["/reports/opencards/list/client/case"]);
      }
    });
  }

  /**
   *
   * @param event click event
   */
  editForm() {
    this.fprefrralform.enable();
    this.edit = false;
    this.fprefrralform.controls["personID"].disable();
    this.fprefrralform.controls["dcfPersonID"].disable();
    this.fprefrralform.controls["county"].disable();
    this.fprefrralform.controls["case_payor"].disable();
    this.fprefrralform.controls["personTypeID"].disable();
  }

  /**
   *
   * @param event click event
   */
  discardForm() { }

  /**
   * @param event click event
   */
  opencardsAction() { }

  getClientByName(event) {
    let req = { clientName: event.query };
    let nameFields = ["FirstName", "LastName"];
    this._person.getClientByName(req).then(data => {
      data.client.map(item => {
        nameFields.map(check => {
          if (Object.keys(item).includes(check)) {
            item["fullName"] = item.FirstName + " " + item.LastName;
          }
        });
      });
      this.metaData = data.client;
    });
  }



  FISMemberTableAction(rec: any, isreadOnly: boolean) {
    if (this.btnLabel === "Cancel") {
      this.btnLabel = "Add";
      this.fpFis = new FISMember();
    } else if (this.btnLabel === "Update") {
      this.selectedFISClients.splice(this.selectedIndex, 1);
      this.selectedFISClients.push(rec);
      swal("Success", "Client updated!", "success");
      this.btnLabel = "Add";
      this.fpFis = new FISMember();
    } else {
      if (rec.clientID) {
        this.selectedFISClients.filter((item: any, pos: any) => {
          if (item.clientID.clientID === rec.clientID.clientID) {
            swal("Warning", "Client Already Exists", "warning");
            this.selectedFISClients.splice(
              this.selectedFISClients.indexOf(rec.clientID.clientID),
              1
            );
          }
        });
        this.selectedFISClients.push(rec);
        this.fpFis = new FISMember();
      } else {
        swal("Warning", "Please select the client", "info");
      }
    }
    this.btnLabel = "Add";
    this.isReadOnlyClient = false;
    swal("Success", "Client added!", "success");
    this.selectedFISClients.sort((a, b) =>
      a.clientID["clientID"].localcompare(b.clientID["clientID"])
    );
    this.fpFis = new FISMember();
  }

  removeFISItem(data: FISMember, index: number) {
    if (
      data.clientID.clientID ===
      parseInt(localStorage.getItem("clientId")) - this._opencards.getHasKey()
    ) {
      swal("Warning", "Not allow to remove", "info");
    } else {
      this.selectedFISClients.splice(index, 1);
      this.fpFis = new FISMember();
      swal("Success", "Client removed!", "success");
      this.btnLabel = "Add";
    }
  }

  openSelectedFIS(source: FISMember, selectedIndex: number) {
    if (selectedIndex == 0) {
      this.isReadOnlyClient = true;
      this.isDropdown = false;
    } else {
      this.isReadOnlyClient = false;
      this.isDropdown = true;
    }
    // if (selectedIndex > 0) {
    this.showFISMemberForm = true;
    this.fpFis = new FISMember();
    this.fpFis = source;
    this.selectedIndex = selectedIndex;
    this.btnLabel = "Update";

    // }
  }

  FISMemberCancel() {
    this.fpFis = new FISMember();
    this.isReadOnlyClient = false;
    return (this.btnLabel = "Add");
  }

  navigateTo() {
    let currentURL = this._router.url;
    if (
      currentURL == "/reports/referral/family-preservation/detail" ||
      currentURL == "/reports/referral/family-preservation/new"
    ) {
      this.url = "/reports/attachment-document/fp-referral";
    } else {
      this.url = "/reports/attachment-document/rfc/fp-referral";
    }
    return this._router.navigate([this.url]);
  }

  showAck(event) {
    this.isFpDetailsEntered = false;
    this.isShowAck = true;
    this.caseTeamData = event.caseTeam;
  }
  disableAck() {
    this.isFpDetailsEntered = false;
  }
  hideAck() {
    this.isShowAck = false;
  }

  redirectToSubnodes() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._router.navigate(["/reintegration/referral/service"]).then(() => {
      loader.style.display = "none";
    });
  }

  verifyOtherReferrals() {
    this.currentReferral = this._opencards.getOtherRefDetails().referralName;
    console.log("currentReferral in verifyOtherReferrals is", this.currentReferral);
    switch (this.currentReferral) {

      case "FI":
        this.refNodes.isAssessments = true;
        this.refNodes.isBillCaseActivity = true;
        this.refNodes.isCaseActivity = true;
        this.refNodes.isCaseTeam = true;
        this.refNodes.isFamily = true;
        this.refNodes.isHomeCounty = true;
        this.refNodes.isCasePlanGoals = true;
        this.refNodes.isSfcsOffice = true;
        this.refNodes.isNtff = true;
        this.refNodes.isIntensivePhase = true;
        this.refNodes.isNonIntPhase = true;
        this.refNodes.isProgressNotes = true;
        this.refNodes.isCaseEvaluations = true;
        this.refNodes.isProgNoteDiag = true;
        this.refNodes.isRefEvents = true;
        this.refNodes.isCourtOrders = true;
        this.refNodes.isKippPmto = true;
        this.refNodes.isServiceClaims = true;
        this.refNodes.isAuthSummary = true;
        this.refNodes.isSupervisStaff = true;
        this.refNodes.isLackOfContact = true;
        this.refNodes.isCaseFileActivity = true;
        break;

      case "NC-OPS":
        this.refNodes.isCaseActivity = true;
        this.refNodes.isCaseFileActivity = true;
        this.refNodes.isCaseTeam = true;
        this.refNodes.isFamily = true;
        this.refNodes.isProgressNotes = true;
        this.refNodes.isProgNoteDiag = true;
        break;

      case "JJFC":
        this.refNodes.isAuthSummary = true;
        this.refNodes.isCaseFileActivity = true;
        this.refNodes.isCaseTeam = true;
        this.refNodes.isFamily = true;
        this.refNodes.isHomeCounty = true;
        this.refNodes.isProgressNotes = true;
        this.refNodes.isSfcsOffice = true;
        this.refNodes.isMedical = true;
        this.refNodes.isPlacements = true;
        this.refNodes.isSchool = true;
        break;

      case "NC-FI":
        this.refNodes.isAssessments = true;
        this.refNodes.isAuthSummary = true;
        this.refNodes.isBillCaseActivity = true;
        this.refNodes.isCaseActivity = true;
        this.refNodes.isCaseFileActivity = true;
        this.refNodes.isCasePlanGoals = true;
        this.refNodes.isCaseTeam = true;
        this.refNodes.isCourtOrders = true;
        this.refNodes.isHomeCounty = true;
        this.refNodes.isNtff = true;
        this.refNodes.isProgressNotes = true;
        this.refNodes.isProgNoteDiag = true;
        this.refNodes.isRefEvents = true;
        this.refNodes.isSfcsOffice = true;
        this.refNodes.isFamily = true;
        this.refNodes.isIntensivePhase = true;
        this.refNodes.isServiceClaims = true;
        this.refNodes.isAppointment = true;
        break;

      case "NC-RFC":
        this.refNodes.isBillCaseActivity = true;
        this.refNodes.isCaseActivity = true;
        this.refNodes.isCaseFileActivity = true;
        this.refNodes.isCaseTeam = true;
        this.refNodes.isCourtOrders = true;
        this.refNodes.isHomeCounty = true;
        this.refNodes.isServiceClaims = true;
        this.refNodes.isSfcsOffice = true;
        this.refNodes.isAppointment = true;
        this.refNodes.isSiblingInOut = true;
        break;

      case "NC-FCH":
        this.refNodes.isAssessments = true;
        this.refNodes.isAuthSummary = true;
        this.refNodes.isCaseFileActivity = true;
        this.refNodes.isCaseTeam = true;
        this.refNodes.isFamily = true;
        this.refNodes.isHomeCounty = true;
        this.refNodes.isServiceClaims = true;
        this.refNodes.isSfcsOffice = true;
        this.refNodes.isAdoption = true;
        this.refNodes.isAppointment = true;
        this.refNodes.isMonthlyReports = true;
        this.refNodes.isPlacements = true;
        this.refNodes.isSchool = true;
        break;

      case "PRTF":
        this.refNodes.isMedical = true;
        break;

      default:
        console.log("no referral passed: Error*****");

    }
  }

  getMore(idx) {
    var newIDX = idx;
    console.log("newIDX>>>>>", idx);
    this.showMore[idx] = !this.showMore[idx];
    this.oldIDX = idx;
    console.log("this.oldIDX>>>>>", this.oldIDX);
  };
  familyInfo(idx) {
    this.showMoreFamily[idx] = !this.showMoreFamily[idx];
  }
  goToClientDetail(id) {
    console.log(">>>>>>", id);
    this._person.storeClientId({ id: id.clientID, family_name: true });
    this._router.navigateByUrl("/reports/client/details");
  }
  goToFisForm(id) {
    // var referralID =
    //   parseInt(localStorage.getItem("referralId")) -
    //   this._opencards.getHasKey();

    let referralID: any, req: any;
    referralID =
      parseInt(localStorage.getItem("referralId")) -
      this._opencards.getHasKey();
    req = { referralID: referralID };

    this._referralView.getReferralRecById(req).then((data: any) => {
      console.log(data.fis);

      // var fisList = data.fis;

      var records = data.fis,
        clientID = [id.clientID],
        object = {},
        result;

      records.forEach(function (a) {
        object[a.clientID] = a;
      });

      result = clientID.map(function (a) {
        return object[a];
      });
      console.log(">>>><<<<,", JSON.stringify(result[0].clientReferralID));
      this._person.storeId(
        result[0].clientReferralID,
      );
      this._router.navigateByUrl(
        "/reports/referral/family-preservation/fis-members/detail"
      );
    });
  };
  client_data: any = {
    firstName: "",
    suffix: "",
    address: "",
    kaecses: ""
  }

  updateClient() {
    console.log(this.client_data.firstName);
    if (this.client_data.firstName == undefined || this.client_data.firstName == "") {
      swal('Warning', 'Required fields are missing!', 'info');
    } else {
      console.log(this.client_data);
    }
  };
  showOpenDialog() {
    this.display_open = true;
  };
  selectData: boolean;
  checkedList = [];
  handleData(event, data, val) {
    if (event) {
      this.checkedList.push(data);
    } else {
      for (var i = 0; i < this.selectedFISClients.length; i++) {
        console.log("tetdt>>", this.checkedList[i])
        if (this.checkedList[i] == data) {
          this.checkedList.splice(i, 1);
        }
      }
    }
    console.log(this.checkedList);
  }

  ncFIFormValidation() {
    this.ncFIFormGroup = this._fb.group({
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      procodeID: [null, Validators.compose([Validators.required])],
      units: [null, Validators.compose([Validators.required])],
      unitRate: [null, Validators.compose([Validators.required])],
      payorID: [null, Validators.compose([Validators.required])],
      notes: [null],
    })
  }
  ncfiSubnodes() {
    this.ncfiOpencards = [
      { title: 'Assessments', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Appointments', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Authorization Summary', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Billable Case Activity', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Case Activity', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Case File Activity', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Case Plan Goals', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Case Team', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Court Orders', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Family', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Home County', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Non Theraphy Face-to-Face', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Phase', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Progress Notes', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Progress Note Diagnosis', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Service Claims', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'SFCS Office', tip: 'Assessments', navigation: '', icon: this.iconurl + 'assessment icon.svg' },
      { title: 'Referral Events', tip: 'Referral Events', navigation: '', icon: this.iconurl + 'assessment icon.svg' },

    ]
  }
  ncfiSubnodeNavigation(subnode: string) {
    let url: string;
    switch (subnode) {
      case 'Assessments':
        url = '/reports/referral/family-preservation/assessment/view';
        break;
      case 'Appointments':
        url = '/reintegration/referral/opencard/appointments/view';
        break;
      case 'Authorization Summary':
        url = '/reintegration/referral/service/authorization/summary';
        break;
      case 'Billable Case Activity':
        url = '/reports/fp-billable-case-activity/view';
        break;
      case 'Case Activity':
        url = '/reports/referral/family-preservation/case-activity/view';
        break;
      case 'Case File Activity':
        url = '/reintegration/referral/opencard/case-file-activity/view';
        break;
      case 'Case Plan Goals':
        url = '/reports/referral/family-preservation/case-plan-goals/view';
        break;
      case 'Case Team':
        url = '/reports/referral/family-preservation/case-team/view';
        break;
      case 'Court Orders':
        url = '/reports/referral/family-preservation/court-order/view';
        break;
      case 'Family':
        url = '/reports/family/view';
        break;
      case 'Home County':
        url = '/reports/referral/family-preservation/home-county/view';
        break;
      case 'Non Theraphy Face-to-Face':
        url = '/reports/referral/family-preservation/non-therapy-face-to-face/view';
        break;
      case 'Phase':
        url = '/reports/referral/family-preservation/phase';
        break;
      case 'Progress Notes':
        url = '/reports/referral/family-preservation/progress-notes/view';
        break;
      case 'Progress Note Diagnosis':
        url = '/reports/referral/family-preservation/progress-note-diagnosis/view';
        break;
      case 'Service Claims':
        url = '/reintegration/referral/service';
        break;
      case 'SFCS Office':
        url = '/reports/referral/family-preservation/sfcs-office/view';
        break;
      case 'Referral Events':
        url = '/reports/referral/family-preservation/referral-events/view';
        break;

    }
    this._router.navigate([url]);
  }

  onAuthPayorSelection(event) {
    this.fpRef.payorID = this.ncfi.payorID;
  }

  onSelectBeginDate(){
    if (this.ncfi.beginDate
      && this.ncfi.beginDate.getHours() === 12
      && this.ncfi.beginDate.getMinutes() === 0
      && this.ncfi.beginDate.getSeconds() === 0) {
      this.ncfi.beginDate.setHours(0);
      this.ncfi.beginDate.setMinutes(0);
      this.ncfi.beginDate.setSeconds(0);
    }
  }
}
