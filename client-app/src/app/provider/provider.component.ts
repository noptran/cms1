import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { OpencardsService } from "../opecards-list-view/opencards.service";
import { ClildFormService } from "../child-forms/child-forms.service";
import { CaseTeamService } from "../case-team/case-team.service";
import {
  ProviderMemberProviderID,
  Provider,
  ProviderPreferenceID,
  ProviderSponsorID,
  ProviderSFAStaffID,
  ProviderStatusID,
  SfaofficeActivityID,
  ProviderSchoolID,
  ProviderLocationID,
} from "./provider";
import { isNullOrUndefined, isObject } from "util";
import swal from "sweetalert2";
import * as moment from "moment";
import { ProviderService } from "./provider.service";
import {LocalValues} from "../local-values";
import { ProviderMemberFormComponent } from "../person-master/Provider-member/provider-member-form/provider-member-form.component";

@Component({
  selector: "app-provider",
  templateUrl: "./provider.component.html",
  styleUrls: ["./provider.component.scss"],
  inputs: ['isProviderFormComponent'],
  outputs: ['providerOut', 'isFomrOpen']
})
export class ProviderComponent implements OnInit {
  mainTabs = [];
  sIndex: any;
  providerMainForm: FormGroup;
  breadcrumbs = [];
  isNodeOpened = false;
  discardTo = "/reports/provider/view";
  providerMember: ProviderMemberProviderID = new ProviderMemberProviderID();
  provider: Provider = new Provider();
  isProvider = false;
  isSFCSEmployee = false;
  pref: ProviderPreferenceID = new ProviderPreferenceID();
  sponsor: ProviderSponsorID = new ProviderSponsorID();
  staff: ProviderSFAStaffID = new ProviderSFAStaffID();
  status: ProviderStatusID = new ProviderStatusID();
  sfaOffice: SfaofficeActivityID = new SfaofficeActivityID();
  school: ProviderSchoolID = new ProviderSchoolID();
  location: ProviderLocationID = new ProviderLocationID();
  metaData = [];
  selectedIndex: any;
  btnLabel = "Save";
  selectedState: any;
  cities = [];
  counties = [];
  zipcodes = [];
  isEdit = false;
  providerMembers = [];
  providerLocations = [];
  prefData: any;
  sponsorData: any;
  staffData: any;
  statusData: any;
  officeData: any;
  providerSchools = [];
  providerMemberButtonLabel = "Add";
  locationButtonLabel = "Add";
  schoolButtonLabel = "Add";
  isProviderMemberContainer = false;
  isProviderLocationContainer = false;
  isProviderSchoolContainer = false;
  isMandatory = false;
  isDescription = false;
  isFormView = false;
  isProvderMainRequired = true;
  isLocationRequired = false;
  isStatusRequired = false;
  isSponsorRequired = false;
  isProviderMemberRequired = false;
  isStaffRequired = false;
  isOfficeRequired = false;
  statusForm: FormGroup;
  locationForm: FormGroup;
  sponsorForm: FormGroup;
  staffForm: FormGroup;
  officeForm: FormGroup;
  isFedTaxRequired: boolean;
  isDaycareRequired: boolean;
  oklahomaProviderTypes = [
    "Alternate Care Giver - BH Oklahoma",
    "Client Provider/ILP - Oklahoma",
    "Bridge Home - Oklahoma",
    "Daycare Provider - BH Oklahoma",
    "Recruiting - BH Oklahoma",
    "Recruiting Therapeutic Foster Home - Oklahoma",
    "Reunification - Oklahoma",
    "Reunification - BH Oklahoma",
    "Therapeutic Foster Home - Oklahoma",
    "Therapeutic Leave - Oklahoma",
    "Discharge - Oklahoma",
    "Discharge - BH Oklahoma",
  ];
  nebraskaProviderTypes = [
    "Respite/ER Only - Nebraska",
    "Resource Home - Nebraska",
    "Recruitment - FCH Nebraska",
    "Probation Approved - Nebraska",
    "Mental Health - Nebraska",
    "Mental Health - Mississippi",
    "Mental Health",
    "Medical",
    "Managed Care Organization",
    "Kinship Relative - Nebraska",
    "Kinship Non-Relative - Nebraska",
  ];
  isOklahoma = false;
  isNebraska = false;
  isPersonMasterValidation = false;
  isProviderMemberCreation = false;
  selectedModule = { display: "Provider Member", value: "ProviderMember" };
  isNonContractVisible = false;
  isSSNVisbile = true;
  isKaecsesDisable = true;
  isKaecsesMandatory = false;
  isAppHeader = false;
  isComponent = true;
  isProviderComponent = true;
  isProviderMemberStatus = true;
  providerMemberPredefinedData: any;
  isPopupWindow = true;
  currentPlacementID = null;
  formLogInfo = {
    enteredBy: "",
    changedBy: "",
    enteredDate: "",
    changedDate: "",
  };
  isFormLog = false;
  isProviderDashboard = false;
  isProviderLocationUpdateBtnVisible = false;

  @ViewChild(ProviderMemberFormComponent, {static: false})
  providerMemberFormComponent: ProviderMemberFormComponent;

  @Input() isProviderFormComponent = false;

  @Output()
  providerOut = new EventEmitter();
  placementReq: { providerID: number };
  @Output() isFomrOpen = new EventEmitter();

  @Input() routerUrlFromSelector: string;

  providerDashboard: any;

  constructor(
    public _activateRoute: ActivatedRoute,
    public _fb: FormBuilder,
    public _router: Router,
    public _opencard: OpencardsService,
    public _client: ClildFormService,
    public _caseTeam: CaseTeamService,
    public _provider: ProviderService,
    public _localValues: LocalValues
  ) {}

  ngOnInit() {
    console.log('abc _router', this._router);
    this.currentPlacementID = parseInt(
      this._activateRoute.snapshot.queryParamMap.get("placementID")
    );
    console.log("this.currentPlacementID >>>is", this.currentPlacementID);
    this.formValidation();
    this.statusFormValidation();
    this.locationFormValidation();
    this.sponsorFormValidation();
    this.staffFormValidation();
    this.officeFormValidation();
    this.defineMainTabs();
    if (this._router.url.includes("/reports/provider/detail?placementID")) {
      this.isPopupWindow = false;
    }
    this.breadcrumbs.push(
      { label: "Person Types", active: "", href: "/reports/person/types" },
      { label: "Provider List", active: "", href: "/reports/provider/view" },
      { label: "Provider Form", active: "active" }
    );
    let hasValue = { target: { hash: "#nav-general" } };
    this.setIndex(0, hasValue);
    if (!this.isComponent) {
      this.providerMembers;
    }
    console.log('this.routerUrlFromSelector ==>', this.routerUrlFromSelector);
    // this is to check if the component rendered by selector or router
    if ((this._router && this._router.url && this._router.url.includes('/reports/provider/detail')) || this.routerUrlFromSelector == '/reports/provider/detail') {
      this.onBreadcrumbCheck();
      this.providerGetDetails();
    } else {
      this.providerMember.beginDate = new Date(
        this._localValues.stringFormatDatetime(Date.now())
      );
      this.providerMember.beginDate.setHours(0);
      this.providerMember.beginDate.setMinutes(0);
      this.providerMember.beginDate.setSeconds(0);

      this.provider.beginDate = new Date(
        this._localValues.stringFormatDatetime(Date.now())
      );
      this.provider.beginDate.setHours(0);
      this.provider.beginDate.setMinutes(0);
      this.provider.beginDate.setSeconds(0);

      this.location.beginDate = new Date(
        this._localValues.stringFormatDatetime(Date.now())
      );
      this.location.beginDate.setHours(0);
      this.location.beginDate.setMinutes(0);
      this.location.beginDate.setSeconds(0);

      this.sponsor.beginDate = new Date(
        this._localValues.stringFormatDatetime(Date.now())
      );
      this.sponsor.beginDate.setHours(0);
      this.sponsor.beginDate.setMinutes(0);
      this.sponsor.beginDate.setSeconds(0);

      this.staff.beginDate = new Date(
        this._localValues.stringFormatDatetime(Date.now())
      );
      this.staff.beginDate.setHours(0);
      this.staff.beginDate.setMinutes(0);
      this.staff.beginDate.setSeconds(0);

      this.status.beginDate = new Date(
        this._localValues.stringFormatDatetime(Date.now())
      );
      this.status.beginDate.setHours(0);
      this.status.beginDate.setMinutes(0);
      this.status.beginDate.setSeconds(0);

      this.sfaOffice.beginDate = new Date(
        this._localValues.stringFormatDatetime(Date.now())
      );
      this.sfaOffice.beginDate.setHours(0);
      this.sfaOffice.beginDate.setMinutes(0);
      this.sfaOffice.beginDate.setSeconds(0);

      this.school.beginDate = new Date(
        this._localValues.stringFormatDatetime(Date.now())
      );
      this.school.beginDate.setHours(0);
      this.school.beginDate.setMinutes(0);
      this.school.beginDate.setSeconds(0);
    }
  }

  async onProviderMainFormChangeDetection() {
    let recentChanges = [],
      emailReq = {};
    if (this.providerMainForm.dirty) {
      const dirtyFields = Object.entries(this.providerMainForm.controls).filter(
        (value) => value[1].dirty
      );
      dirtyFields.map((item) => {
        let newObj = {};
        newObj["field"] = item[0];
        if (item[0] && item[0].includes("Date")) {
          newObj["newValue"] = new Date(item[1].value).toLocaleString();
        } else {
          newObj["newValue"] = item[1].value;
        }
        recentChanges.push(newObj);
      });
      emailReq["changedValues"] = recentChanges;
      emailReq["changedBy"] = parseInt(localStorage.getItem("UserID")) || 4620;
      await this.sendMailForRecentChanges(emailReq);
    }
  }

  async sendMailForRecentChanges(req: any) {
    this._provider.providerEmailForChanges(req).then((data: any) => {
      return new Promise((resolve) => resolve(data));
    });
  }

  providerGetDetails() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {
      providerID:
        parseInt(localStorage.getItem("providerID")) -
        this._opencard.getHasKey(),
    };
    this.placementReq = req;
    this._opencard.getByIdProvider(req).then((data) => {
      if (data.Provider) {
        // if (data.Provider.providerTypeID && data.Provider.providerTypeID.contract_StateID) {
        //   this._localValues.contractStateId=data.Provider.providerTypeID.contract_StateID;
        // }
        // else{
        //   this._localValues.contractStateId=null;
        // }
        this._opencard.setCurrentProviderName(data.Provider.providerName);
        if (this.oklahomaProviderTypes &&
          this.oklahomaProviderTypes.includes(
            data.Provider.providerTypeID.providerType
          )
        ) {
          this.isOklahoma = true;
        } else {
          this.isOklahoma = false;
        }
        if (
          data.Provider.providerTypeID &&
          data.Provider.providerTypeID.contract_StateID &&
          data.Provider.providerTypeID.contract_StateID.stateID
        ) {
          this._localValues.providerContractStateId =
            data.Provider.providerTypeID.contract_StateID.stateID;
        } else {
          this._localValues.providerContractStateId = null;
        }
      }
      if (data.Provider.providerTypeID.providerTypeID === 18) {
        this.isFedTaxRequired = true;
        this.isDaycareRequired = true;
        this.providerMainForm.controls["fedTaxNo"].setValidators([
          Validators.required,
        ]);
        this.providerMainForm.controls["dayCareTypeID"].setValidators([
          Validators.required,
        ]);
      }
      this.isFormView = true;
      this.isEdit = true;
      this.providerMainForm.disable();

      !isNullOrUndefined(data.Provider.beginDate)
        ? (data.Provider.beginDate = new Date(data.Provider.beginDate))
        : null;
      !isNullOrUndefined(data.Provider.endDate)
        ? (data.Provider.endDate = new Date(data.Provider.endDate))
        : null;
      !isNullOrUndefined(data.Provider.fchwebTermSignDate)
        ? (data.Provider.fchWebTermSignDate = new Date(
            data.Provider.fchwebTermSignDate
          ))
        : null;
      !isNullOrUndefined(data.Provider.fchwebElectronicSignatureOptOutDate)
        ? (data.Provider.fchWebElectronicSignatureOptOutDate = new Date(
            data.Provider.fchwebElectronicSignatureOptOutDate
          ))
        : null;
      !isNullOrUndefined(data.Provider.staffID)
        ? (data.Provider.staffID.fullName =
            data.Provider.staffID.lastName +
            " " +
            data.Provider.staffID.firstName +
            " ( " +
            data.Provider.staffID.email +
            " ) ")
        : null;
      !isNullOrUndefined(data.Provider.employee2_StaffID)
        ? (data.Provider.employee2_StaffID.fullName =
            data.Provider.employee2_StaffID.lastName +
            " " +
            data.Provider.employee2_StaffID.firstName +
            " ( " +
            data.Provider.employee2_StaffID.email +
            " ) ")
        : null;
      if (
        !isNullOrUndefined(data.Provider.staffID) ||
        !isNullOrUndefined(data.Provider.employee2_StaffID)
      ) {
        data.Provider.isSFCSEmployee = true;
      } else {
        data.Provider.isSFCSEmployee = data.Provider.isEmployee;
      }
      this.provider = data.Provider;
      loader.style.display = "none";
    });
  }
  formValidation() {
    this.providerMainForm = this._fb.group({
      providerName: [null, Validators.compose([Validators.required])],
      acronym: [null],
      providerTypeID: [null, Validators.compose([Validators.required])],
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      email: [null],
      dayCareTypeID: [null],
      venderID: [null],
      fedTaxNo: [null],
      medicaidNo: [null],
      trainingCompleted_NCFCHOK: [null],
      dhsFamilyIntroID: [null],
      dhsPreResourceID: [null],
      dhsResourceID: [null],
      dhsRegionID_Override: [null],
      dtDate: [null],
      daycareHoursRequired: [null],
      fchWebTermSignDate: [null],
      fchWebElectronicSignatureOptOutDate: [null],
      paySponsor: [null],
      paySemiMonthly: [null],
      isSponsor: [null],
      claris: [null],
      employee2_StaffID: [null],
      referralSourceCategoryID: [null],
      referralSourceTypeID: [null],
      referralSourceComments: [null],
      notes: [null],
      bestTimeToContact: [null],
      maritalStatusID: [null],
      incomeRangeID: [null],
      isSFCSEmployee: [null],
      staffID: [null],
    });
  }

  getMetaData(event: any, label: any) {
    let req: any, obj: any;
    switch (label) {
      case "providerMember":
        obj = "providerMember";
        break;
      case "personType":
        obj = "personType";
        break;
      case "providerLocationType":
        obj = "providerLocationType";
        break;
      case "providerType":
        obj = "providerType";
        break;
      case "daycareType":
        obj = "daycareType";
        break;
      case "staff":
        obj = "staff";
        break;
      case "referralSourceCategory":
        obj = "referralSourceCategory";
        break;
      case "referralSourceType":
        obj = "referralSourceType";
        break;
      case "maritalStatus":
        obj = "maritalStatus";
        break;
      case "incomeRange":
        obj = "incomeRange";
        break;
      case "state":
        obj = "state";
        break;
      case "race":
        obj = "race";
        break;
      case "genderGroup":
        obj = "genderGroup";
        break;
      case "schoolName":
        obj = "schoolName";
        break;
      case "sfcsOffice":
        obj = "sfcsOffice";
        break;
      case "sponsorName":
        obj = "sponsorName";
        break;
      case "statusType":
        obj = "statusType";
        break;
      case "dhsFamilyIntro":
        obj = "dhsFamilyIntro";
        break;
    }
    req = { Object: obj, value: event.query };
    this._caseTeam.getSearchList(req).then((data: any) => {
      if (obj != "schoolName") {
        data.dropDown.filter((item: any) => {
          item["fullName"] =
            item.lastName + " " + item.firstName + " ( " + item.email + " )";
        });
      }

      this.metaData = data.dropDown;
    });
  }
  originalSource = null;
  formAction(
    source: any,
    sponsor: ProviderSponsorID,
    staff: ProviderSFAStaffID,
    status: ProviderStatusID,
    preference: ProviderPreferenceID,
    office: SfaofficeActivityID
  ) {
    this.originalSource = {
      provider: JSON.parse(JSON.stringify(source)),
      sponsor: JSON.parse(JSON.stringify(sponsor)),
      staff: JSON.parse(JSON.stringify(staff)),
      status: JSON.parse(JSON.stringify(status)),
      pref: JSON.parse(JSON.stringify(preference)),
      sfaOffice: JSON.parse(JSON.stringify(office)),
      providerMembers: JSON.parse(JSON.stringify(this.providerMembers)),
      providerLocations: JSON.parse(JSON.stringify(this.providerLocations)),
      providerSchools: JSON.parse(JSON.stringify(this.providerSchools)),
    };
    source["isEmployee"] = source.isSFCSEmployee;

    console.log('this.routerUrlFromSelector ==>', this.routerUrlFromSelector);
    // this is to check if the component rendered by selector or router
    if (this._router.url === '/reports/provider/detail' || this.routerUrlFromSelector == '/reports/provider/detail') {
      if (this.providerMainForm.valid) {
        this.onProviderMainFormChangeDetection();
        !isNullOrUndefined(source.beginDate)
          ? (source.beginDate = Date.parse(source.beginDate))
          : null;
        !isNullOrUndefined(source.endDate)
          ? (source.endDate = Date.parse(source.endDate))
          : null;
        !isNullOrUndefined(source.dtDate)
          ? (source.dtDate = Date.parse(source.dtDate))
          : null;
        !isNullOrUndefined(source.fchWebTermSignDate)
          ? (source.fchWebTermSignDate = Date.parse(source.fchWebTermSignDate))
          : null;
        !isNullOrUndefined(source.fchWebElectronicSignatureOptOutDate)
          ? (source.fchWebElectronicSignatureOptOutDate = Date.parse(
              source.fchWebElectronicSignatureOptOutDate
            ))
          : null;
        !isNullOrUndefined(source.providerTypeID)
          ? (source.providerTypeID = source.providerTypeID.providerTypeID)
          : null;
        !isNullOrUndefined(source.dayCareTypeID)
          ? (source.dayCareTypeID = source.dayCareTypeID.daycareTypeID)
          : null;
        !isNullOrUndefined(source.dhsFamilyIntroID)
          ? (source.dhsFamilyIntroID = source.dhsFamilyIntroID.dhsFamilyIntroID)
          : null;
        !isNullOrUndefined(source.dhsPreResourceID)
          ? (source.dhsPreResourceID = source.dhsPreResourceID.dhsPreResourceID)
          : null;
        !isNullOrUndefined(source.dhsResourceID)
          ? (source.dhsResourceID = source.dhsResourceID.dhsResourceID)
          : null;
        !isNullOrUndefined(source.employee2_StaffID)
          ? (source.employee2_StaffID = source.employee2_StaffID.staffID)
          : null;
        !isNullOrUndefined(source.referralSourceCategoryID)
          ? (source.referralSourceCategoryID =
              source.referralSourceCategoryID.referralSourceCategoryID)
          : null;
        !isNullOrUndefined(source.referralSourceTypeID)
          ? (source.referralSourceTypeID =
              source.referralSourceTypeID.referralSourceTypeID)
          : null;
        !isNullOrUndefined(source.maritalStatusID)
          ? (source.maritalStatusID = source.maritalStatusID.maritalStatusID)
          : null;
        !isNullOrUndefined(source.incomeRangeID)
          ? (source.incomeRangeID = source.incomeRangeID.incomeRangeID)
          : null;
        !isNullOrUndefined(source.staffID)
          ? (source.staffID = source.staffID.staffID)
          : null;
        !isNullOrUndefined(source.trainingCompleted_NCFCHOK)
          ? (source.trainingCompleted_NCFCHOK = Date.parse(
              source.trainingCompleted_NCFCHOK
            ))
          : null;
        !isNullOrUndefined(source.dhsRegionID_Override)
          ? (source.dhsRegionID_Override = Date.parse(
              source.dhsRegionID_Override
            ))
          : null;
        !isNullOrUndefined(source.providerID)
          ? this.updateForm(source)
          : this.saveForm(source);
      } else {
        swal("Info", "Please fill the mandatoy fields", "info");
      }
    } else {
      if (
        this.providerMainForm.valid &&
        this.providerSubnodeFormValidation(source.providerTypeID.providerType)
      ) {
        !isNullOrUndefined(source.beginDate)
          ? (source.beginDate = this._localValues.stringFormatDatetime(
              Date.parse(this.provider.beginDate)
            ))
          : null;
        !isNullOrUndefined(source.endDate)
          ? (source.endDate = Date.parse(source.endDate))
          : null;
        !isNullOrUndefined(source.dtDate)
          ? (source.dtDate = Date.parse(source.dtDate))
          : null;
        !isNullOrUndefined(source.fchWebTermSignDate)
          ? (source.fchWebTermSignDate = Date.parse(source.fchWebTermSignDate))
          : null;
        !isNullOrUndefined(source.fchWebElectronicSignatureOptOutDate)
          ? (source.fchWebElectronicSignatureOptOutDate = Date.parse(
              source.fchWebElectronicSignatureOptOutDate
            ))
          : null;
        !isNullOrUndefined(source.providerTypeID)
          ? (source.providerTypeID = source.providerTypeID.providerTypeID)
          : null;
        !isNullOrUndefined(source.dayCareTypeID)
          ? (source.dayCareTypeID = source.dayCareTypeID.daycareTypeID)
          : null;
        !isNullOrUndefined(source.dhsFamilyIntroID)
          ? (source.dhsFamilyIntroID = source.dhsFamilyIntroID.dhsFamilyIntroID)
          : null;
        // !isNullOrUndefined(source.dhsPreResourceID) ? source.dhsPreResourceID = source.dhsPreResourceID.dhsPreResourceID : null;
        // !isNullOrUndefined(source.dhsResourceID) ? source.dhsResourceID = source.dhsResourceID.dhsResourceID : null;
        !isNullOrUndefined(source.employee2_StaffID)
          ? (source.employee2_StaffID = source.employee2_StaffID.staffID)
          : null;
        !isNullOrUndefined(source.referralSourceCategoryID)
          ? (source.referralSourceCategoryID =
              source.referralSourceCategoryID.referralSourceCategoryID)
          : null;
        !isNullOrUndefined(source.referralSourceTypeID)
          ? (source.referralSourceTypeID =
              source.referralSourceTypeID.referralSourceTypeID)
          : null;
        !isNullOrUndefined(source.maritalStatusID)
          ? (source.maritalStatusID = source.maritalStatusID.maritalStatusID)
          : null;
        !isNullOrUndefined(source.incomeRangeID)
          ? (source.incomeRangeID = source.incomeRangeID.incomeRangeID)
          : null;
        !isNullOrUndefined(source.staffID)
          ? (source.staffID = source.staffID.staffID)
          : null;
        !isNullOrUndefined(source.trainingCompleted_NCFCHOK)
          ? (source.trainingCompleted_NCFCHOK = Date.parse(
              source.trainingCompleted_NCFCHOK
            ))
          : null;
        !isNullOrUndefined(source.dhsRegionID_Override)
          ? (source.dhsRegionID_Override = Date.parse(
              source.dhsRegionID_Override
            ))
          : null;

        this.providerMembers.map((item: any) => {
          !isNullOrUndefined(item.member)
            ? (item.member = item.member.providerMemberID)
            : null;
          !isNullOrUndefined(item.personType)
            ? (item.personType = item.personType.personTypeID)
            : null;
          !isNullOrUndefined(item.beginDate)
            ? (item.beginDate = this._localValues.stringFormatDatetime(
                item.beginDate
              ))
            : null;
          !isNullOrUndefined(item.endDate)
            ? (item.endDate = this._localValues.stringFormatDatetime(
                item.endDate
              ))
            : null;
        });

        this.provider.providerMemberProviderID = this.providerMembers;

        this.providerLocations.map((item: any) => {
          !isNullOrUndefined(item.providerLocationTypeID)
            ? (item.providerLocationTypeID =
                item.providerLocationTypeID.providerLocationTypeID)
            : null;
          !isNullOrUndefined(item.stateID)
            ? (item.stateID = item.stateID.stateID)
            : null;
          !isNullOrUndefined(item.cityID)
            ? (item.cityID = item.cityID.cityID)
            : null;
          !isNullOrUndefined(item.countyID)
            ? (item.countyID = item.countyID.countyID)
            : null;
          !isNullOrUndefined(item.zipcodeID)
            ? (item.zipcodeID = item.zipcodeID.zipcodeID)
            : null;
          !isNullOrUndefined(item.beginDate)
            ? (item.beginDate = this._localValues.stringFormatDatetime(
                item.beginDate
              ))
            : null;
          !isNullOrUndefined(item.endDate)
            ? (item.endDate = this._localValues.stringFormatDatetime(
                item.endDate
              ))
            : null;
        });

        this.provider.providerLocationID = this.providerLocations;

        this.providerSchools.map((item: any) => {
          !isNullOrUndefined(item.beginDate)
            ? (item.beginDate = this._localValues.stringFormatDatetime(
                item.beginDate
              ))
            : null;
          !isNullOrUndefined(item.endDate)
            ? (item.endDate = this._localValues.stringFormatDatetime(
                item.endDate
              ))
            : null;
          !isNullOrUndefined(item.schoolID)
            ? (item.schoolID = item.schoolID.schoolID)
            : null;
        });

        this.provider.providerSchoolID = this.providerSchools;

        this.provider.providerPreferenceID = this.prefereneAction(preference);
        this.provider.providerSponsorID = this.sponsorAction(sponsor);
        this.provider.providerSFAStaffID = this.staffAction(staff);
        this.provider.providerStatusID = this.statusAction(status);
        this.provider.sfaofficeActivityID = this.officeAction(office);

        this.provider = this.originalSource.provider;
        this.sponsor = this.originalSource.sponsor;
        this.staff = this.originalSource.staff;
        this.status = this.originalSource.status;
        this.pref = this.originalSource.pref;
        this.sfaOffice = this.originalSource.sfaOffice;
        this.providerMembers = this.originalSource.providerMembers;
        this.providerLocations = this.originalSource.providerLocations;
        this.providerSchools = this.originalSource.providerSchools;

        !isNullOrUndefined(source.providerID)
          ? this.updateForm(source)
          : this.saveForm(source);
      } else {
        swal("Info", "Please fill the mandatoy fields", "info");
      }
    }
  }

  saveForm(source: any) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {
      'providerID': null,
      'providerTypeID': source.providerTypeID,
      'venderID': !isNullOrUndefined(source.venderID) ? source.venderID : null,
    }
    if (req["venderID"] !== null) {
    this._opencard.providerVenderValidate(req).then((data: any) => {
      loader.style.display = "none";
      if (!data.responseStatus) {
          this.provider = this.originalSource.provider;
          this.sponsor = this.originalSource.sponsor;
          this.staff = this.originalSource.staff;
          this.status = this.originalSource.status;
          this.pref = this.originalSource.pref;
          this.sfaOffice = this.originalSource.sfaOffice;
          this.providerMembers = this.originalSource.providerMembers;
          this.providerLocations = this.originalSource.providerLocations;
          this.providerSchools = this.originalSource.providerSchools;
        swal(
          "Warning",
          "There is a Provider of this type or a Payee with this VenderID already. VenderID and Type must be unique",
          "warning"
        );
        } else {
          this.save(source);
        }
      });
    } else {
      this.save(source);
    }

  }

  save(source: any) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.saveProvider(source).then((data: any) => {
      loader.style.display = "none";
      if (this._router && this._router.url && this._router.url.includes("/reports/provider/new")) {
        this.isPopupWindow = false;
      }
      if (this.isPopupWindow || this.isProviderFormComponent) {
        this.isFomrOpen.emit({ isFormResponse: true, data: data });
        this.providerOut.emit({ providerId: data.providerID.ProviderID });
        swal("Success", "Provider has been created!", "success");
      } else {
        if (data.responseStatus) {
          swal("Success", "Provider has been created!", "success");
          return this._router.navigate(["/reports/provider/view"]);
        } else {
          Object.keys(this.originalSource).forEach((key) => {
            Object.keys(this.originalSource[key]).forEach((elementKey) => {
              if (elementKey && elementKey.includes("Date")) {
                this.originalSource[key][elementKey] = Date.parse(
                  this.originalSource[key][elementKey]
                );
              }
            });
          });
          this.provider = this.originalSource.provider;
          this.sponsor = this.originalSource.sponsor;
          this.staff = this.originalSource.staff;
          this.status = this.originalSource.status;
          this.pref = this.originalSource.pref;
          this.sfaOffice = this.originalSource.sfaOffice;
          this.providerMembers = this.originalSource.providerMembers;
          this.providerLocations = this.originalSource.providerLocations;
          this.providerSchools = this.originalSource.providerSchools;

          swal(
            "Warning",
            "There is a provider of this type with this name already. Provider Name and Type must be unique",
            "warning"
          );
        }
      }
    });
  }

  updateForm(source: any) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let req = {
      'providerID': parseInt(localStorage.getItem("providerID")) - this._opencard.getHasKey(),
      'providerTypeID': source.providerTypeID,
      'venderID': !isNullOrUndefined(source.venderID) ? source.venderID : null,
    }
    if (req["venderID"] !== null) {
    this._opencard.providerVenderValidate(req).then((data: any) => {
      loader.style.display = "none";
      if (!data.responseStatus) {
      this.provider = this.originalSource.provider;
      this.sponsor = this.originalSource.sponsor;
      this.staff = this.originalSource.staff;
      this.status = this.originalSource.status;
      this.pref = this.originalSource.pref;
      this.sfaOffice = this.originalSource.sfaOffice;
      this.providerMembers = this.originalSource.providerMembers;
      this.providerLocations = this.originalSource.providerLocations;
      this.providerSchools = this.originalSource.providerSchools;
        swal(
          "Warning",
          "There is a Provider of this type or a Payee with this VenderID already. VenderID and Type must be unique",
          "warning"
        );
        } else {
          this.update(source);
        }
      });
    } else {
      this.update(source);
    }

  }

  update(source: any) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this._opencard.updateProvider(source).then(() => {
      loader.style.display = "none";
      swal("Success", "Provider has been Updated!", "success");
      this._router.navigate(["/reports/provider/view"]);
    });
  }

  editForm() {
    this.providerMainForm.enable();
    this.isEdit = false;
  }

  generateCity(event: any) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    const req = { stateID: event.stateID };
    this.cities = [];
    this.selectedState = event.stateID;
    this.location.countyID = "";
    this.location.zipcodeID = "";
    this._client.getCityFromState(req).then((data: any) => {
      loader.style.display = "none";
      this.cities = data.city;
      this.counties = data.county;
    });
  }

  generateZipcodeAndCounty(event: any) {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.counties = [];
    this.zipcodes = [];
    const req = { stateID: this.selectedState, cityID: event.cityID };
    this._client.getZipcodeFromCityState(req).then((data: any) => {
      loader.style.display = "none";
      if (data.zipcode.length == 0) {
        this.location.zipcodeID = "No Zipcode found!";
      }
      if (data.county.length == 0) {
        this.location.countyID = "No County found!";
      }

      if (data.zipcode.length > 1) {
        this.zipcodes = data.zipcode;
      } else {
        this.location.zipcodeID = data.zipcode[0];
      }

      if (data.county.length > 1) {
        this.counties = data.county;
      } else {
        this.location.countyID = data.county[0];
      }
    });
  }

  filteringCities(event: any) {
    this.metaData = [];
    this.cities.filter((item: any) => {
      if (item.city.toLowerCase().indexOf(event.query) !== -1) {
        this.metaData.push(item);
      }
    });
  }

  filteringCounties(event: any) {
    this.metaData = [];
    this.counties.filter((item: any) => {
      if (item.countyName.toLowerCase().indexOf(event.query) !== -1) {
        this.metaData.push(item);
      }
    });
  }

  filteringZipcodes(event: any) {
    this.metaData = [];
    this.zipcodes.filter((item: any) => {
      if (item.zipcode.indexOf(event.query) !== -1) {
        this.metaData.push(item);
      }
    });
  }

  complexScenario() {
    let counter = 0,
      returnvalue = false;
    this.providerMembers.map((item) => {
      item.primaryContact ? counter++ : counter;
    });
    console.log("counter", counter);
    if (counter !== this.providerMembers.length) {
      this.providerMembers.length - counter;
      console.log(
        `There is ${
          this.providerMembers.length - counter
        } primary contact false in the array`
      );
      returnvalue = true;
    } else {
      console.log(
        `All ${counter} provider member entry primary contact is true`
      );
      returnvalue = false;
    }
    return returnvalue;
  }

  providerMemberAction(data?: any, selectedIndex?: any, rowClick?: any) {
    console.log("Enter data", data);
    let duplicateEntry = false;
    let consecutiveProviderName: string,
      consecutiveProviderMemberFirstNames = [];
    consecutiveProviderName = `${data.member.lastName}`;
    if (
      data.member !== undefined &&
      data.personType !== undefined &&
      data.beginDate !== undefined
    ) {
      if (this.providerMemberButtonLabel === "Add" && !rowClick) {
        if (this.providerMembers.length > 0) {
          this.providerMembers.filter((item: any) => {
            if (item.member.providerMemberID === data.member.providerMemberID) {
              duplicateEntry = true;
              swal(
                "Duplicate found!",
                "This provider memeber already in the list",
                "warning"
              );
              this.providerMember = new ProviderMemberProviderID();
            } else {
              duplicateEntry = false;
            }
          });
        }

        if (!duplicateEntry) {
          this.providerMembers.push(data);
          // this.providerMembers = this.providerMembers.sort((a, b) => a.member.fullName.localeCompare(b.member.fullName));
          let dupProviderName: string, dupIndex: number, dupBeginDate: any;
          this.providerMembers.map((item, index) => {
            if (item.primaryContact === true) {
              dupIndex = null;
              dupProviderName = "";
              dupIndex = index;
              dupProviderName = `${this.providerMembers[index].member.lastName},${this.providerMembers[index].member.firstName}`;
              dupBeginDate = this.providerMembers[index].beginDate;
              return;
            }
            return;
          });
          this.providerMembers.map((item, index) => {
            if (item.primaryContact === false) {
              consecutiveProviderMemberFirstNames.push(
                ` And ${this.providerMembers[index].member.firstName}`
              );
              dupBeginDate = this.providerMembers[index].beginDate;
            }
          });
          this.provider.providerName = !isNullOrUndefined(dupProviderName)
            ? `${dupProviderName}${consecutiveProviderMemberFirstNames.join(
                ""
              )}`
            : "";
          this.providerMember = new ProviderMemberProviderID();
          this.providerMember.beginDate = dupBeginDate;
          this.provider.beginDate = dupBeginDate;
          this.location.beginDate = dupBeginDate;
          this.sponsor.beginDate = dupBeginDate;
          this.staff.beginDate = dupBeginDate;
          this.status.beginDate = dupBeginDate;
          this.sfaOffice.beginDate = dupBeginDate;
          this.school.beginDate = dupBeginDate;
          dupIndex = null;
          dupProviderName = "";
        }
      }
    } else {
      swal("Info", "Please fill the mandatoy fields", "info");
    }

    if (rowClick) {
      this.providerMember = data;
      this.providerMemberButtonLabel = "Update";
      this.selectedIndex = selectedIndex;
    }

    if (this.providerMemberButtonLabel === "Update" && !rowClick) {
      this.providerMembers.splice(this.selectedIndex, 1, data);
      // this.providerMembers.push(data);
      let updateDpProviderName: string, updateDupIndex: number;
      this.providerMembers.map((item, index) => {
        if (item.primaryContact === true) {
          updateDupIndex = null;
          updateDpProviderName = "";
          updateDupIndex = index;
          updateDpProviderName = `${this.providerMembers[index].member.lastName},${this.providerMembers[index].member.firstName}`;
          return;
        }
        return;
      });
      this.providerMembers.map((item, index) => {
        if (item.primaryContact === false) {
          consecutiveProviderMemberFirstNames.push(
            ` And ${this.providerMembers[index].member.firstName}`
          );
        }
      });
      this.provider.providerName = !isNullOrUndefined(updateDpProviderName)
        ? `${updateDpProviderName}${consecutiveProviderMemberFirstNames.join(
            ""
          )}`
        : "";
      this.providerMember = new ProviderMemberProviderID();
      updateDupIndex = null;
      updateDpProviderName = "";
      this.providerMemberButtonLabel = "Add";
    }
    console.log("Provider members", this.providerMembers);
  }

  removeProviderMember(index: any) {
    this.providerMembers.splice(index, 1);
    return this.providerMembers.filter((item) => {
      return item.primaryContact
        ? (this.provider.providerName = `${item.member.lastName},${item.member.firstName}`)
        : "";
    });
  }

  providerLocationAction(data: any, selectedIndex: any, rowClick: any) {
    let duplicateEntry = false,
      duplicateCheck: any;
    if (
      data.providerLocationTypeID !== undefined &&
      data.address1 !== undefined &&
      data.address1 !== undefined &&
      data.stateID !== undefined &&
      data.cityID !== undefined &&
      data.countyID !== undefined &&
      data.zipcodeID !== undefined &&
      data.phone !== undefined &&
      data.beginDate !== undefined
    ) {
      if (this.locationButtonLabel === "Add" && !rowClick) {
        if (this.providerLocations.length > 0) {
          this.providerLocations.filter((item: any) => {
            if (item.endDate === null || item.endDate === undefined) {
              swal(
                "Open location found!",
                "Already one provider location open",
                "warning"
              );
              this.location = new ProviderLocationID();
              return (duplicateEntry = true);
            } else {
              return (duplicateEntry = false);
            }
          });
        }

        if (!duplicateEntry) {
          this.providerLocations.push(data);
          return (this.location = new ProviderLocationID());
        }
      }
    } else {
      swal("Info", "Please fill the mandatoy fields", "info");
    }

    if (rowClick) {
      this.location = data;
      this.locationButtonLabel = "Update";
      this.selectedIndex = selectedIndex;
    }

    if (this.locationButtonLabel === "Update" && !rowClick) {
      this.providerLocations.splice(this.selectedIndex, 1);
      if (
        data.providerLocationTypeID !== undefined &&
        data.providerLocationTypeID !== "" &&
        data.address1 !== undefined &&
        data.address1 !== "" &&
        data.stateID !== undefined &&
        data.cityID !== undefined &&
        data.countyID !== undefined &&
        data.zipcodeID !== undefined &&
        data.zipcodeID !== null &&
        data.phone !== undefined &&
        data.beginDate !== undefined
      ) {
      this.providerLocations.push(data);
      this.location = new ProviderLocationID();
      this.locationButtonLabel = "Add";
      } else {
      swal("Info", "Please fill the mandatoy fields", "info");
    }
    }
  }

  provideIndex: any;
  onProviderLocationEdit(index, selectedItem: any) {
    this.provideIndex = index;
    this.isProviderLocationUpdateBtnVisible = true;
    var data = {
      beginDate: selectedItem.beginDate
        ? new Date(selectedItem.beginDate)
        : null,
      endDate: selectedItem.endDate ? new Date(selectedItem.endDate) : null,
      address1: selectedItem.address1 ? selectedItem.address1 : null,
      address2: selectedItem.address2 ? selectedItem.address2 : null,
      phone: selectedItem.phone ? selectedItem.phone : null,
      fax: selectedItem.fax ? selectedItem.fax : null,
      locationHeader: selectedItem.locationHeader ? selectedItem.locationHeader : null,
      notes: selectedItem.notes ? selectedItem.notes : null,
      stateID: selectedItem.stateID ? selectedItem.stateID : null,
      providerLocationTypeID: selectedItem.providerLocationTypeID
        ? selectedItem.providerLocationTypeID
        : null,
      cityID: selectedItem.cityID
        ? selectedItem.cityID
        : null,
      countyID: selectedItem.countyID
        ? selectedItem.countyID
        : null,
      zipcodeID: selectedItem.zipcodeID
        ? selectedItem.zipcodeID
        : null,
      isServiceAdressForBillingAddress: selectedItem.isServiceAdressForBillingAddress
        ? selectedItem.isServiceAdressForBillingAddress
        : null,
    };
    this.location = data;
  }

  onProviderLocationUpdate(data: any) {
    if (
      this.location.providerLocationTypeID !== "" &&
      this.location.address1 !== "" &&
      this.location.address1 !== "" &&
      this.location.stateID !== "" &&
      this.location.cityID !== "" &&
      this.location.countyID !== "" &&
      this.location.zipcodeID !== "" &&
      this.location.phone !== "" &&
      this.location.beginDate !== ""
    ) {
      console.log("data1", this.location.stateID);
    this.providerLocations[
      this.provideIndex
    ] = this.location;
    this.location = new ProviderLocationID();
    return (this.isProviderLocationUpdateBtnVisible = false);
    } else {
      swal("Info", "Please fill the mandatoy fields", "info");
    }
  }

  onProviderLocationSave(data: any) {
    if (
      this.location.providerLocationTypeID !== "" &&
      this.location.address1 !== "" &&
      this.location.address1 !== "" &&
      this.location.stateID !== "" &&
      this.location.cityID !== "" &&
      this.location.countyID !== "" &&
      this.location.zipcodeID !== "" &&
      this.location.phone !== "" &&
      this.location.beginDate !== ""
    ) {
      this.providerLocations.push(this.location);
      return (this.location = new ProviderLocationID());
    } else {
      swal("Info", "Please fill the mandatoy fields", "info");
    }
  }


  removeProviderLocation(index: any) {
    return this.providerLocations.splice(index, 1);
  }

  providerSchoolAction(data: any, selectedIndex: any, rowClick: any) {
    let duplicateEntry = false;
    data.schoolID = this.selectedSchool;
    if (isNullOrUndefined(data.schoolID)) {
      return swal("Info", "Please select any school name!", "info");
    }
    if (this.schoolButtonLabel === "Add" && !rowClick) {
      if (this.providerSchools.length > 0) {
        this.providerSchools.filter((item: any) => {
          if (item.schoolID.schoolID === data.schoolID.schoolID) {
            duplicateEntry = true;
            swal(
              "Duplicate found!",
              "This school already in the list",
              "warning"
            );
            this.school = new ProviderSchoolID();
          } else {
            duplicateEntry = false;
          }
        });
      }

      if (!duplicateEntry) {
        this.providerSchools.push(data);
        return (this.school = new ProviderSchoolID());
      }
    }

    if (rowClick) {
      this.selectedIndex = "";
      this.school = data;
      this.schoolButtonLabel = "Update";
      this.selectedIndex = selectedIndex;
    }

    if (this.schoolButtonLabel === "Update" && !rowClick) {
      this.providerSchools.splice(this.selectedIndex, 1);
      this.providerSchools.push(data);
      this.school = new ProviderSchoolID();
      return (this.schoolButtonLabel = "Add");
    }
  }

  removeProviderSchool(index: any) {
    return this.providerSchools.splice(index, 1);
  }

  prefereneAction(data: any) {
    !isNullOrUndefined(data.genderGroupID)
      ? (data.genderGroupID = data.genderGroupID.genderGroupID)
      : null;
    !isNullOrUndefined(data.raceID) ? (data.raceID = data.raceID.raceID) : null;
    return (this.prefData = data);
  }

  sponsorAction(data: any) {
    !isNullOrUndefined(data.sponsorID)
      ? (data.sponsorID = data.sponsorID.sponsorID)
      : null;
    !isNullOrUndefined(data.beginDate)
      ? (data.beginDate = this._localValues.stringFormatDatetime(
          data.beginDate
        ))
      : null;
    !isNullOrUndefined(data.endDate)
      ? (data.endDate = this._localValues.stringFormatDatetime(data.endDate))
      : null;
    return (this.sponsorData = data);
  }

  staffAction(data: any) {
    !isNullOrUndefined(data.personTypeID)
      ? (data.personTypeID = data.personTypeID.personTypeID)
      : null;
    !isNullOrUndefined(data.staffID)
      ? (data.staffID = data.staffID.staffID)
      : null;
    !isNullOrUndefined(data.beginDate)
      ? (data.beginDate = this._localValues.stringFormatDatetime(
          data.beginDate
        ))
      : null;
    !isNullOrUndefined(data.endDate)
      ? (data.endDate = this._localValues.stringFormatDatetime(data.endDate))
      : null;
    return (this.staffData = data);
  }

  statusAction(data: any) {
    !isNullOrUndefined(data.providerStatusTypeID)
      ? (data.providerStatusTypeID =
          data.providerStatusTypeID.providerStatusTypeID)
      : null;
    !isNullOrUndefined(data.beginDate)
      ? (data.beginDate = this._localValues.stringFormatDatetime(
          data.beginDate
        ))
      : null;
    !isNullOrUndefined(data.endDate)
      ? (data.endDate = this._localValues.stringFormatDatetime(data.endDate))
      : null;
    return (this.statusData = data);
  }

  officeAction(data: any) {
    !isNullOrUndefined(data.sfaofficeID)
      ? (data.sfaofficeID = data.sfaofficeID.sfaofficeID)
      : null;
    !isNullOrUndefined(data.beginDate)
      ? (data.beginDate = this._localValues.stringFormatDatetime(
          data.beginDate
        ))
      : null;
    !isNullOrUndefined(data.endDate)
      ? (data.endDate = this._localValues.stringFormatDatetime(data.endDate))
      : null;
    return (this.officeData = data);
  }

  expandColpseAction(selectedModule: any) {
    switch (selectedModule) {
      case "providerMember":
        this.isProviderMemberContainer = !this.isProviderMemberContainer;
        break;
      case "providerLocation":
        this.isProviderLocationContainer = !this.isProviderLocationContainer;
        break;
      case "providerSchool":
        this.isProviderSchoolContainer = !this.isProviderSchoolContainer;
        break;
    }
  }

  /**
   * This is will enable and disable the mandatory fields based on the provider type
   * @param selectedProviderType providerName
   */
  basicNodeValidation(selectedEvent: any) {
    this.resetValues();
    if (this.oklahomaProviderTypes && this.oklahomaProviderTypes.includes(selectedEvent.providerType)) {
      this.isOklahoma = true;
    } else {
      this.isOklahoma = false;
    }
    if (this.nebraskaProviderTypes && this.nebraskaProviderTypes.includes(selectedEvent.providerType)) {
      this.isNebraska = true;
    } else {
      this.isNebraska = false;
    }
    switch (selectedEvent.providerType) {
      case "Resource Home":
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isProviderMemberRequired = true;
        this.isStatusRequired = true;
        break;
      case "Independent Living":
        this.isStatusRequired = true;
        this.isLocationRequired = true;
        break;
      case "MH Institution":
        this.isStatusRequired = true;
        this.isLocationRequired = true;
        break;
      case "Kinship Relative":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Mental Health":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Medical":
        this.isStatusRequired = true;
        break;
      case "Educational":
        this.isStatusRequired = true;
        break;
      case "Emergency Shelter":
        this.isStatusRequired = true;
        break;
      case "Drug and Alcohol":
        this.isStatusRequired = true;
        break;
      case "Reunification":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Reunification":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Removed From Custody":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Client Provider/ILP":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Secure Care":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Correctional Fac.":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Daycare Provider":
        this.providerMainForm.controls["fedTaxNo"].setValidators([
          Validators.required,
        ]);
        this.providerMainForm.controls["dayCareTypeID"].setValidators([
          Validators.required,
        ]);
        this.isFedTaxRequired = true;
        this.isDaycareRequired = true;
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "In Home Respite":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Unlicensed Foster Home (>=16)":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        this.isStaffRequired = true;
        break;
      case "Therapist":
        this.isStatusRequired = true;
        break;
      case "Adoptive Resource":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isOfficeRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        break;
      case "Therapeutic Foster Home":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Prospective Resource Home":
        this.isLocationRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Kinship Non-Relative":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Guardianship/Custodianship":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Professional Resource Home":
        this.isProviderMemberRequired = true;
        this.isSponsorRequired = true;
        this.isLocationRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "PRTF":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Residential Maternity":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Secure Transport":
        this.isStatusRequired = true;
        break;
      case "YRC I":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "YRC II":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Sponsor":
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStatusRequired = true;
        break;
      case "Licensed for Specific Child or Relative":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Foster/Adopt":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStatusRequired = true;
        this.isStaffRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Therapeutic Foster Home - Oklahoma":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Reunification - Oklahoma":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Client Provider/ILP - Oklahoma":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Discharge - Oklahoma":
        this.isStatusRequired = true;
        break;
      case "Therapeutic Leave - Oklahoma":
        this.isStatusRequired = true;
        break;
      case "Resource Home - Nebraska":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Mental Health - Mississippi":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Adopt/Foster":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Respite/ER Only":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Respite/ER Only - Nebraska":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStaffRequired = true;
        this.isOfficeRequired = true;
        this.isStatusRequired = true;
        break;
      case "Managed Care Organization":
        this.isStatusRequired = true;
        break;
      case "Mental Health - Nebraska":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Unlicensed Adoptive Resource":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Bridge Home - Oklahoma":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStatusRequired = true;
        break;
      case "Alternate Care Giver - BH Oklahoma":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Daycare Provider - BH Oklahoma":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Recruiting - BH Oklahoma":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Reunification - BH Oklahoma":
        this.isStatusRequired = true;
        break;
      case "Discharge - BH Oklahoma":
        this.isStatusRequired = true;
        break;
      case "Resource Home - JJFC":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Discharge - JJFC":
        this.isStatusRequired = true;
        break;
      case "Prospective Adopt Only Home":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;

        break;
      case "Unlicensed Foster Home (>=16) - JJFC":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Inquiry Home - Adoption":
        this.isStatusRequired = true;
        break;
      case "Inquiry Home - FCH Kansas":
        this.isStatusRequired = true;
        break;
      case "Inquiry Home - FCH Nebraska":
        this.isStatusRequired = true;
        break;
      case "Recruitment - Adoption":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Recruitment - FCH Kansas":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Recruitment - FCH Nebraska":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Recruiting Therapeutic Foster Home - Oklahoma":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Kinship Non-Relative - Nebraska":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Kinship Relative - Nebraska":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Probation Approved - Nebraska":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Licensed for Specific Child or Relative - JJFC":
        this.isProviderMemberRequired = true;
        this.isLocationRequired = true;
        this.isSponsorRequired = true;
        this.isStaffRequired = true;
        this.isStatusRequired = true;
        this.isOfficeRequired = true;
        break;
      case "Group Home":
        this.isLocationRequired = true;
        this.isStatusRequired = true;
        break;
      case "Runaway":
        this.isStatusRequired = true;
        break;
      case "Family Advocate":
        this.isStatusRequired = true;
        break;
      case "Area Manager":
        this.isStatusRequired = true;
        break;
      case "QRTP":
        this.isStatusRequired = true;
        this.isLocationRequired = true;
        break;
    }
  }

  /**
   * It will validate the subnode form and it will call inside the formvalidation function
   * @param slectedProviderType selected provider type
   */
  providerSubnodeFormValidation(slectedProviderType: string) {
    let isSubnodeValid = false;
    switch (slectedProviderType) {
      case "Resource Home":
        if (
          this.providerMembers.length > 0 &&
          this.statusForm.valid &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Independent Living":
        if (this.statusForm.valid && this.providerLocations.length > 0) {
          isSubnodeValid = true;
        }
        break;
      case "MH Institution":
        if (this.statusForm.valid && this.providerLocations.length > 0) {
          isSubnodeValid = true;
        }
        break;
      case "Kinship Relative":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.statusForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Mental Health":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;

      case "Medical":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;

      case "Educational":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Emergency Shelter":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Drug and Alcohol":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Reunification":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Removed From Custody":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Client Provider/ILP":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Secure Care":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Correctional Fac.":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Daycare Provider":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "In Home Respite":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Unlicensed Foster Home (>=16)":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.statusForm.valid &&
          this.officeForm.valid &&
          this.staffForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Therapist":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Adoptive Resource":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.officeForm.valid &&
          this.staffForm.valid &&
          this.statusForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Therapeutic Foster Home":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Prospective Resource Home":
        if (
          this.providerLocations.length > 0 &&
          this.staffForm.valid &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Kinship Non-Relative":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Guardianship/Custodianship":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.statusForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Professional Resource Home":
        if (
          this.providerLocations.length > 0 &&
          this.providerMembers.length > 0 &&
          this.staffForm.valid &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "PRTF":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Residential Maternity":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Secure Transport":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "YRC I":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "YRC II":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Sponsor":
        if (
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.statusForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Licensed for Specific Child or Relative":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.staffForm.valid &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Foster/Adopt":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.staffForm.valid &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Therapeutic Foster Home - Oklahoma":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.staffForm.valid &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Reunification - Oklahoma":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Client Provider/ILP - Oklahoma":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.statusForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Discharge - Oklahoma":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Therapeutic Leave - Oklahoma":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Resource Home - Nebraska":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.staffForm.valid &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Mental Health - Mississippi":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Adopt/Foster":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.staffForm.valid &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Respite/ER Only":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.staffForm.valid &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Respite/ER Only - Nebraska":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.staffForm.valid &&
          this.officeForm.valid &&
          this.statusForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Managed Care Organization":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Mental Health - Nebraska":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Unlicensed Adoptive Resource":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.staffForm.valid &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Bridge Home - Oklahoma":
        if (
          this.providerMembers.length > 0 &&
          this.locationForm.valid &&
          this.sponsorForm.valid &&
          this.statusForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Alternate Care Giver - BH Oklahoma":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.statusForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Daycare Provider - BH Oklahoma":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Recruiting - BH Oklahoma":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.staffForm.valid &&
          this.staffForm.valid &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Reunification - BH Oklahoma":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Discharge - BH Oklahoma":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Resource Home - JJFC":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.staffForm.valid &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Discharge - JJFC":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Prospective Adopt Only Home":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.staffForm.valid &&
          this.statusForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Unlicensed Foster Home (>=16) - JJFC":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.statusForm.valid &&
          this.staffForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Inquiry Home - Adoption":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Inquiry Home - FCH Kansas":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Inquiry Home - FCH Nebraska":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Recruitment - Adoption":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Recruitment - FCH Kansas":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Recruitment - FCH Nebraska":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Recruiting Therapeutic Foster Home - Oklahoma":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.staffForm.valid &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Kinship Non-Relative - Nebraska":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Kinship Relative - Nebraska":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Probation Approved - Nebraska":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Licensed for Specific Child or Relative - JJFC":
        if (
          this.providerMembers.length > 0 &&
          this.providerLocations.length > 0 &&
          this.sponsorForm.valid &&
          this.staffForm.valid &&
          this.statusForm.valid &&
          this.officeForm.valid
        ) {
          isSubnodeValid = true;
        }
        break;
      case "Group Home":
        if (this.providerLocations.length > 0 && this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;

      case "Runaway":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Family Advocate":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "Area Manager":
        if (this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
      case "QRTP":
        if (this.providerLocations.length > 0 &&
          this.statusForm.valid) {
          isSubnodeValid = true;
        }
        break;
    }

    return isSubnodeValid;
  }

  setIndex(index: number, event: any) {
    let hasValue = [];
    hasValue = event.target.hash;
    this.sIndex = index;
  }

  defineMainTabs() {
    console.log('this.routerUrlFromSelector ==>', this.routerUrlFromSelector);
    // this is to check if the component rendered by selector or router
    if ((this._router && this._router.url && this._router.url.includes('/reports/provider/detail')) || this.routerUrlFromSelector == '/reports/provider/detail') {
      this.mainTabs = [{ label: "General Information", href: "#nav-general" }];
    } else {
      this.mainTabs = [
        { label: "General Information", href: "#nav-general" },
        { label: "Locations", href: "#nav-locations" },
        { label: "Preferences", href: "#nav-pref" },
        { label: "Sponsor and Staff", href: "#nav-sponsor" },
        { label: "Status and SFM Office", href: "#nav-status" },
        { label: "School", href: "#nav-school" },
      ];
    }
  }

  /**
   * Subnode validations
   */

  statusFormValidation() {
    this.statusForm = this._fb.group({
      status: [null, Validators.compose([Validators.required])],
      beginDate: [null, Validators.compose([Validators.required])],
    });
  }

  locationFormValidation() {
    this.locationForm = this._fb.group({
      locationType: [null],
      address1: [null],
      state: [null],
      city: [null],
      county: [null],
      zipcode: [null],
      phone: [null],
      beginDate: [null],
      locationHeader: [null],
      endDate: [null],
      fax: [null],
      address2: [null],
      isBillingAddress: [null],
      notes: [null],
    });
  }

  sponsorFormValidation() {
    this.sponsorForm = this._fb.group({
      sponsorID: [null, Validators.compose([Validators.required])],
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      notes: [null],
    });
  }

  staffFormValidation() {
    this.staffForm = this._fb.group({
      personTypeID: [null, Validators.compose([Validators.required])],
      staffID: [null, Validators.compose([Validators.required])],
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
      notes: [null],
    });
  }

  officeFormValidation() {
    this.officeForm = this._fb.group({
      sfaofficeID: [null, Validators.compose([Validators.required])],
      beginDate: [null, Validators.compose([Validators.required])],
      endDate: [null],
    });
  }

  onChangeServiceAddress(event, currentLocation: any) {
    if (
      event &&
      currentLocation.providerLocationTypeID.providerLocationTypeID == 1
    ) {
      let sourceData = currentLocation;
      sourceData.providerLocationTypeID.providerLocationTypeID = 3;
      sourceData.providerLocationTypeID.providerLocationType =
        "Service Address";

        if (
          sourceData.providerLocationTypeID !== undefined &&
          sourceData.providerLocationTypeID !== "" &&
          sourceData.address1 !== undefined &&
          sourceData.address1 !== "" &&
          sourceData.stateID !== undefined &&
          sourceData.cityID !== undefined &&
          sourceData.countyID !== undefined &&
          sourceData.zipcodeID !== undefined &&
          sourceData.zipcodeID !== null &&
          sourceData.phone !== undefined &&
          sourceData.beginDate !== undefined
        ) {  
      this.providerLocations.push(sourceData);
      this.location = new ProviderLocationID();
      this.locationForm.reset();
      let newObj = {
        providerLocationTypeID: {
          providerLocationTypeID: 1,
          providerLocationType: "Billing Address",
        },
        address1: this.providerLocations[0].address1,
        address2: this.providerLocations[0].address2,
        stateID: this.providerLocations[0].stateID,
        countyID: this.providerLocations[0].countyID,
        zipcodeID: this.providerLocations[0].zipcodeID,
        phone: this.providerLocations[0].phone,
        fax: this.providerLocations[0].fax,
        beginDate: this.providerLocations[0].beginDate,
        endDate: this.providerLocations[0].endDate,
        locationHeader: this.providerLocations[0].locationHeader,
        notes: this.providerLocations[0].notes,
        cityID: this.providerLocations[0].cityID,
      };

      this.providerLocations.push(newObj);
    } else {
      swal("Info", "Please fill the mandatoy fields", "info");
    } 
  } else {
      swal(
        "Info",
        "Please select the location type as billing address",
        "info"
      );
    }
  }

  resetValues() {
    this.providerMainForm.controls["fedTaxNo"].clearValidators();
    this.providerMainForm.controls["dayCareTypeID"].clearValidators();
    this.isLocationRequired = false;
    this.isStatusRequired = false;
    this.isSponsorRequired = false;
    this.isProviderMemberRequired = false;
    this.isStaffRequired = false;
    this.isStaffRequired = false;
    this.isFedTaxRequired = false;
    this.isDaycareRequired = false;
  }

  onClickNewProviderMember() {
    console.log("New provider memeber clicked");
  }

  personMasterValidationWizardOut(event) {
    console.log("person master validation", event);
    this.providerMemberFormComponent.setAutoFetchValues(event);
    this.providerMemberPredefinedData = event.wizard;
    if (event.isSelection == "createNew") {
      this.isProviderMemberCreation = true;
      this.isPersonMasterValidation = false;
    } else if (event.isSelection == "continue") {
      this.isProviderMemberCreation = true;
      this.isPersonMasterValidation = false;
    } else {
      return;
    }
  }

  onProviderMemeberComSave(event: any) {
    if (!event.isProviderFormstatus) {
      this.isProviderMemberCreation = false;
    }
  }
  getStatusData(event: any, label: any) {
    switch (label) {
      case "status":
        this._caseTeam.getProviderStatusType().then((data: any) => {
          this.metaData = data.statusTypes;
        });
        break;
    }
  }

  onBreadcrumbCheck() {
    let previousURL = this._localValues.previousurl,
      currentURL: any,
      params: any;
    if (previousURL && previousURL.includes("?")) {
      currentURL = previousURL.split("?")[0];
    } else {
      currentURL = previousURL;
    }
    if (this._router && this._router.url && this._router.url.includes("/reports/provider/new")) {
      this.isPopupWindow = false;
    }
    if (currentURL === "/reintegration/referral/opencard/placement/detail") {
      this.breadcrumbs = [];
      this.breadcrumbs.push({
        label: "Placement",
        href: `/reintegration/referral/opencard/placement/detail`,
      });
      this.providerGetDetails();
    } else {
      this.isPopupWindow = false;
      this.breadcrumbs = [];
      this.breadcrumbs.push(
        { label: "Person Types", active: "", href: "/reports/person/types" },
        { label: "Provider List", active: "", href: "/reports/provider/view" },
        { label: "Provider Form", active: "active" }
      );
    }
  }

  onClickJumptoPlacement() {
    return this._router.navigate([
      "/reintegration/referral/opencard/placement/detail",
    ]);
  }

  selectedSchool = null;
  onSchoolSelect(event) {
    console.log("school event is", event);
    this.selectedSchool = event;
  }
  isProviderLocationPopUp = false;
  providerLocationMetadata = [];
  openLocationWindow() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    let providerLocationList = {
      providerID:
        parseInt(localStorage.getItem("providerID")) -
        this._opencard.getHasKey(),
      beginPagination: 1,
      endPagination: 100,
      sort: { column: "ProviderLocationID", mode: "desc" },
    };
    this._provider.getLocationList(providerLocationList).then((data: any) => {
      loader.style.display = "none";
      this.providerLocationMetadata = data.providerLocationList;

      this.isProviderLocationPopUp = true;
    });
  }

  public onSelectProviderBeginDate() {
    // this.provider.beginDate.setHours(0);
    // this.provider.beginDate.setMinutes(0);
    // this.provider.beginDate.setSeconds(0);
    if (
      this.provider.beginDate &&
      this.provider.beginDate.getHours() === 12 &&
      this.provider.beginDate.getMinutes() === 0 &&
      this.provider.beginDate.getSeconds() === 0
    ) {
      this.provider.beginDate.setHours(0);
      this.provider.beginDate.setMinutes(0);
      this.provider.beginDate.setSeconds(0);
    }
    this.location.beginDate = this.provider.beginDate;
    this.sponsor.beginDate = this.provider.beginDate;
    this.staff.beginDate = this.provider.beginDate;
    this.status.beginDate = this.provider.beginDate;
    this.sfaOffice.beginDate = this.provider.beginDate;
    this.school.beginDate = this.provider.beginDate;
  }
  public onSelectProviderMemeberBeginDate() {
    // this.providerMember.beginDate.setHours(0);
    // this.providerMember.beginDate.setMinutes(0);
    // this.providerMember.beginDate.setSeconds(0);
    if (
      this.providerMember.beginDate &&
      this.providerMember.beginDate.getHours() === 12 &&
      this.providerMember.beginDate.getMinutes() === 0 &&
      this.providerMember.beginDate.getSeconds() === 0
    ) {
      this.providerMember.beginDate.setHours(0);
      this.providerMember.beginDate.setMinutes(0);
      this.providerMember.beginDate.setSeconds(0);
    }
  }
  public onSelectLocationBeginDate() {
    this.location.beginDate.setHours(0);
    this.location.beginDate.setMinutes(0);
    this.location.beginDate.setSeconds(0);
  }
  public onSelectSponsorBeginDate() {
    this.sponsor.beginDate.setHours(0);
    this.sponsor.beginDate.setMinutes(0);
    this.sponsor.beginDate.setSeconds(0);
  }
  public onSelectStaffBeginDate() {
    this.staff.beginDate.setHours(0);
    this.staff.beginDate.setMinutes(0);
    this.staff.beginDate.setSeconds(0);
  }
  public onSelectStatusBeginDate() {
    this.status.beginDate.setHours(0);
    this.status.beginDate.setMinutes(0);
    this.status.beginDate.setSeconds(0);
  }
  public onSelectSFAOfficeBeginDate() {
    this.sfaOffice.beginDate.setHours(0);
    this.sfaOffice.beginDate.setMinutes(0);
    this.sfaOffice.beginDate.setSeconds(0);
  }
  public onSelectSchoolBeginDate() {
    this.school.beginDate.setHours(0);
    this.school.beginDate.setMinutes(0);
    this.school.beginDate.setSeconds(0);
  }

  openInNewBrowserWindow(path: any) {
    window.open(
      window.location.origin + path + window.location.search,
      "_blank",
      "toolbar=no,scrollbars=no,resizable=yes,bottom=0,right=0,width=1000,height=500"
    );
  }
}
